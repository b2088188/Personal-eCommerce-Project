import {
    LOADING_PROFILE,
    PROFILE_SUCCESS,
    PROFILE_FAIL,
    LOADING_USERORDERS,
    USERORDERS_SUCCESS,
    USERORDERS_FAIL
} from '../types';

function userReducer(currentState, action) {
    switch (action.type) {
        case LOADING_PROFILE:
        case LOADING_USERORDERS:
            return {
                ...currentState,
                loading: true
            }
        case PROFILE_SUCCESS:
            return {
                ...currentState,
                user: action.payload.user,
                loading: false
            }
        case USERORDERS_SUCCESS:
          return {
            ...currentState,
            orders: action.payload.orders,
            loading: false
          }
        case PROFILE_FAIL:
        case USERORDERS_FAIL:
            return {
                ...currentState,
                error: action.payload.error,
                loading: false
            }
        default:
            return currentState;
    }
}

export default userReducer;