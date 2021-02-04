import { SHOW_ACTIVE, SHOW_INACTIVE, SHOW_ALL } from "../actions/types";

const listShowReducer = (state = "active", action) => {
	switch (action.type) {
		case SHOW_ACTIVE:
			return "active";
		case SHOW_INACTIVE:
			return "inactive";
		case SHOW_ALL:
			return "all";

		default:
			return state;
	}
};

export default listShowReducer;
