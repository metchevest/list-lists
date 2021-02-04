import {
	SELECTED_CATEGORY,
	CLEAN_SELECTION,
	ADD_CATEGORIES,
} from "../actions/types";

var _ = require("lodash");

const seletedCategoryReducer = (state = [], action) => {
	switch (action.type) {
		case SELECTED_CATEGORY:
			console.log("en seleted CategoryReducer");
			console.log(action.payload);
			console.log(state);
			if (state.includes(action.payload)) {
				return _.remove(state, (value) => {
					return value !== action.payload;
				});
			} else {
				return [...state, ...[action.payload]];
			}
		case ADD_CATEGORIES:
			return [...state, ...action.payload];

		case CLEAN_SELECTION:
			return [];

		default:
			return state;
	}
};

export default seletedCategoryReducer;
