import axios from 'axios';

const authRequest = axios.create({
	baseURL: `${process.env.REACT_APP_BACKEND_URL}/api/v1/users`,
	withCredentials: true
});

const productRequest = axios.create({
	baseURL: `${process.env.REACT_APP_BACKEND_URL}/api/v1/products`,
	withCredentials: true
});

const reviewRequest = (productId) =>
	axios.create({
		baseURL: `${process.env.REACT_APP_BACKEND_URL}/api/v1/products/${productId}/reviews`,
		withCredentials: true
	});

const orderRequest = axios.create({
	baseURL: `${process.env.REACT_APP_BACKEND_URL}/api/v1/orders`,
	withCredentials: true
});

export { authRequest, productRequest, reviewRequest, orderRequest };
