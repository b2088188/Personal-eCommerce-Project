import {
    LOADING_PRODUCTS,
    PRODUCTS_SUCCESS,
    PRODUCTS_FAIL,
    LOADING_PRODUCT,
    PRODUCT_SUCCESS,
    PRODUCT_FAIL
} from '../types';

function productReducer(currentState, action) {
    switch (action.type) {
        case LOADING_PRODUCTS:
        case LOADING_PRODUCT:
            return {
                ...currentState,
                loading: true
            }
        case PRODUCTS_SUCCESS:
            return {
                ...currentState,
                products: action.payload.products,
                loading: false
            }
        case PRODUCT_SUCCESS:
          return {
            ...currentState,
            product: action.payload.product,
            loading: false
          }
        case PRODUCTS_FAIL:
        case PRODUCT_FAIL:
            return {
                ...currentState,
                error: action.payload.error,
                loading: false
            }
        default:
            return currentState;
    }
}

export default productReducer;