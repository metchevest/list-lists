import {SIGN_IN, SIGN_OUT} from '../actions/types';


const INITIAL_STATE = {
    isSignedIn: null,
    google_user_id: null
};

const authReducer = (state = INITIAL_STATE, action ) => {

    switch (action.type) {
        case SIGN_IN:
            return {...state, isSignedIn: true, google_user_id: action.payload };
        case SIGN_OUT:
            return {...state, isSignedIn: false, google_user_id: null};
        default:
            return state;
        }
};

export default authReducer;