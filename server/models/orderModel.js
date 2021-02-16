import mongoose from 'mongoose';
import validator from 'validator';

const orderSchema = new mongoose.Schema({
   user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'An order must belong to a user']
   },
   orderItems: [
      {
         product: {
            type: mongoose.Schema.ObjectId,
            required: [true, 'An item must have a product ID'],
            ref: 'Product'
         },
         name: {
            type: String,
            required: [true, 'An item must have a name']
         },
         image: {
            type: String,
            required: [true, 'An item must have an image']
         },
         price: {
            type: Number,
            required: [true, 'An item must have a price']
         },
         quantity: {
            type: Number,
            required: [true, 'An item must have a at least one quantity']
         }
      }
   ],
   itemsPrice: {
      type: Number,
      required: [true, 'An order must have an itemsPrice']
   },
   shippingPrice: {
      type: Number,
      required: [true, 'An order must have a shippingPrice']
   },
   totalPrice: {
      type: Number,
      required: [true, 'An order must have a totalPrice']
   },
   shippingAddress: {
      address: {
         type: String,
         required: [true, 'Please provide an address for shipping']
      },
      city: {
         type: String,
         required: [true, 'Please provide a city name for shipping']
      },
      postalCode: {
         type: String,
         required: [true, 'Please provide a postalCode for shipping']
      },
      country: {
         type: String,
         required: [true, 'Please provide a country for shipping']
      }
   },
   paymentMethod: {
      type: String,
      required: [true, 'Please provide a paymentMethod']
   },
   paymentResult: {
      id: String,
      status: String
   },
   isPaid: {
      type: Boolean,
      default: false
   },
   paidAt: {
      type: Date
   },
   isDelivered: {
      type: Boolean,
      default: false
   },
   deliveredAt: {
      type: Date
   },
   createdAt: {
      type: Date,
      default: Date.now
   }
});

orderSchema.methods.processOrder = function (body) {
   this.isPaid = true;
   this.paidAt = Date.now();
   this.paymentResult = body.paymentResult;
};
const Order = mongoose.model('Order', orderSchema);
export default Order;
