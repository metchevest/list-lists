import {
	CREATE_LIST,
	DELETE_LIST,
	EDIT_LIST,
	FETCH_LIST,
	FETCH_LISTS,
	TOGGLE_LIST,
	ADD_ITEM,
	DELETE_ITEM,
	EDIT_ITEM,
	UPDATE_CATEGORIES,
} from "../actions/types";

var _ = require("lodash");

const listReducer = (state = {}, action) => {
	switch (action.type) {
		case EDIT_LIST:
			return { ...state, [action.payload.id]: action.payload };
		case CREATE_LIST:
			return { ...state, [action.payload.id]: action.payload };
		case FETCH_LIST:
			return { ...state, [action.payload.id]: action.payload };
		case FETCH_LISTS:
			return { ...state, ..._.mapKeys(action.payload, "id") };
		case DELETE_LIST:
			return _.omit(state, action.payload);
		case TOGGLE_LIST:
			const { id } = action.payload;
			return {
				...state,
				[id]: {
					...state[id],
					active: action.payload.active,
				},
			};

		case ADD_ITEM:
			return {
				...state,
				[action.payload.listId]: {
					...state[action.payload.listId],
					items: [...state[action.payload.listId].items, action.payload.item],
				},
			};
		case DELETE_ITEM:
			return {
				...state,
				[action.payload.listId]: {
					...state[action.payload.listId],
					items: state[action.payload.listId].items.filter((item) => {
						return item.id !== parseInt(action.payload.itemId);
					}),
				},
			};

		case EDIT_ITEM:
			return {
				...state,
				[action.payload.listId]: {
					...state[action.payload.listId],
					items: state[action.payload.listId].items.map((item) => {
						if (item.id === parseInt(action.payload.item.id)) {
							return action.payload.item;
						} else {
							return item;
						}
					}),
				},
			};
		case UPDATE_CATEGORIES:
			return {
				...state,
				[action.payload.id]: {
					...state[action.payload.id],
					categories: action.payload.categories,
				},
			};
		default:
			return state;
	}
};

export default listReducer;
