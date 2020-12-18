import {
    LOADING_PRODUCTS,
    PRODUCTS_SUCCESS,
    PRODUCTS_FAIL
} from '../types';

function productReducer(currentState, action) {
    switch (action.type) {
        case LOADING_PRODUCTS:
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
        case PRODUCTS_FAIL:
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