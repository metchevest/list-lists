import { RAISE_ERROR, CLEAR_ERROR } from "../actions/types";

const errorsReducer = (
	state = { raised_error: false, message: "" },
	action
) => {
	switch (action.type) {
		case RAISE_ERROR: {
			return {
				raised_error: true,
				message: action.payload,
			};
		}
		case CLEAR_ERROR:
			return {
				raised_error: false,
				message: "",
			};
		default:
			return state;
	}
};

export default errorsReducer;
