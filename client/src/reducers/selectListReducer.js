import { LIST_SELECTED } from '../actions/types';

const selectedListReducer = (selectedList = null, action) => {
    if (action.type === LIST_SELECTED) {
        return action.payload;
    }

    return selectedList;
};

export default selectedListReducer;