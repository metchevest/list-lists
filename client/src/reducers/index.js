import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import listReducer from "./listReducer";
import authReducer from "./authReducer";
import selectListReducer from "./selectListReducer";
import userLoginServer from "./userLoginServer";
import errorsReducer from "./errorsReducer";
import listShowReducer from "./listShowReducer";
import categoriesReducer from "./categoriesReducer";
import selectedCategoryReducer from "./selectedCategoryReducer";

export default combineReducers({
	selectedList: selectListReducer,
	auth: authReducer,
	lists: listReducer,
	form: formReducer,
	userLoginServer: userLoginServer,
	errors: errorsReducer,
	listShow: listShowReducer,
	categories: categoriesReducer,
	selectedCategories: selectedCategoryReducer,
});
