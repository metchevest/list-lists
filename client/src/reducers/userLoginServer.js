import { USER_EXIST } from '../actions/types';


const INITIAL_STATE = {
    signedServer: false
};

const userLoginServer = (state = INITIAL_STATE, action ) => {

    switch (action.type) {
        case USER_EXIST:
            return {...state, signedServer: true };
        default:
            return state;
        }
};

export default userLoginServer;