import { reset } from "redux-form";

import listsServer from "../apis/listsServer";
import history from "../history";

import {
	SIGN_IN,
	SIGN_OUT,
	CREATE_LIST,
	FETCH_LISTS,
	FETCH_LIST,
	DELETE_LIST,
	EDIT_LIST,
	LIST_SELECTED,
	USER_EXIST,
	DELETE_ITEM,
	ADD_ITEM,
	RAISE_ERROR,
	CLEAR_ERROR,
	TOGGLE_LIST,
	SHOW_ACTIVE,
	SHOW_INACTIVE,
	SHOW_ALL,
	EDIT_ITEM,
	FETCH_CATEGORIES,
	CREATE_CATEGORY,
	FETCH_CATEGORY,
	DELETE_CATEGORY,
	EDIT_CATEGORY,
	SELECTED_CATEGORY,
	UPDATE_CATEGORIES,
	CLEAN_SELECTION,
	ADD_CATEGORIES,
} from "./types";

export const selectList = (list) => {
	return {
		type: LIST_SELECTED,
		payload: list,
	};
};

export const signIn = (userId) => {
	return {
		type: SIGN_IN,
		payload: userId,
	};
};

export const signOut = () => {
	return {
		type: SIGN_OUT,
	};
};

export const raiseError = (message) => {
	return {
		type: RAISE_ERROR,
		payload: message,
	};
};

export const clearError = () => {
	return {
		type: CLEAR_ERROR,
	};
};

export const showActiveList = () => {
	return {
		type: SHOW_ACTIVE,
	};
};

export const showInactiveList = () => {
	return {
		type: SHOW_INACTIVE,
	};
};

export const showAllList = () => {
	return {
		type: SHOW_ALL,
	};
};

export const startUser = (google_user_id) => async (dispatch) => {
	const response = await listsServer.get(`/user/${google_user_id}`);

	dispatch({
		type: USER_EXIST,
		payload: response.data,
	});

	dispatch(signIn(google_user_id));
	dispatch(fetchLists(google_user_id));
};

export const fetchCategories = () => async (dispatch, getState) => {
	const { google_user_id } = getState().auth;

	const response = await listsServer.get(`/user/${google_user_id}/categories`);

	dispatch({ type: FETCH_CATEGORIES, payload: response.data });
};

export const fetchCategory = (categoryId) => async (dispatch, getState) => {
	const { google_user_id } = getState().auth;

	const response = await listsServer.get(
		`/user/${google_user_id}/category/${categoryId}`
	);

	dispatch({ type: FETCH_CATEGORY, payload: response.data });
};

export const createCategory = (formValues) => async (dispatch, getState) => {
	const { google_user_id } = getState().auth;

	const response = await listsServer.post(
		`/user/${google_user_id}/category`,
		formValues
	);

	dispatch({ type: CREATE_CATEGORY, payload: response.data });

	history.push(`/categories`);
};

export const deleteCategory = (categoryId) => async (dispatch, getState) => {
	const { google_user_id } = getState().auth;

	const response = await listsServer.delete(
		`/user/${google_user_id}/category/${categoryId}`
	);

	dispatch({ type: DELETE_CATEGORY, payload: response.data.id });

	history.pues("/categories");
};

export const editCategory =
	(categoryId, formValues) => async (dispatch, getState) => {
		const { google_user_id } = getState().auth;

		// TODO: INSPECT FORMVALUES TO SEE IF THE ID OF THE CATEGORY COMES WITH IT
		const response = await listsServer.patch(
			`/user/${google_user_id}/category/${categoryId}`,
			formValues
		);

		dispatch({ type: EDIT_CATEGORY, payload: response.data });

		history.push(`/category/${categoryId}`);
	};

export const selectedCategory = (categoryId) => {
	return {
		type: SELECTED_CATEGORY,
		payload: categoryId,
	};
};

export const addCategories = (categories) => {
	return {
		type: ADD_CATEGORIES,
		payload: categories,
	};
};
export const cleanSelection = () => {
	return {
		type: CLEAN_SELECTION,
	};
};

export const updateCategories =
	(categories, listId) => async (dispatch, getState) => {
		const { google_user_id } = getState().auth;

		const response = await listsServer.post(
			`/user/${google_user_id}/list/${listId}/category`,
			{ categories }
		);

		dispatch({ type: UPDATE_CATEGORIES, payload: response.data });

		history.push(`/list/${listId}`);
	};

export const fetchLists = () => async (dispatch, getState) => {
	const { google_user_id } = getState().auth;

	const response = await listsServer.get(`/user/${google_user_id}/lists`);

	dispatch({ type: FETCH_LISTS, payload: response.data });
};

export const createList = (formValues) => async (dispatch, getState) => {
	const { google_user_id } = getState().auth;

	const response = await listsServer.post(
		`/user/${google_user_id}/list`,
		formValues
	);

	dispatch({ type: CREATE_LIST, payload: response.data });

	history.push(`/list/${response.data.id}`);
};

export const fetchList = (listId) => async (dispatch, getState) => {
	// I need to sincronize the request to be done after the sucess of the auth
	const { google_user_id } = getState().auth;

	const response = await listsServer.get(
		`/user/${google_user_id}/list/${listId}`
	);

	if (response.data.error) {
		dispatch({
			type: RAISE_ERROR,
			payload: `List with the id ${listId} not found`,
		});
		//Clear the notification after a time.
		setTimeout(() => {
			dispatch({ type: "CLEAR_ERROR" });
		}, 8000);
		history.push("/list/new");
	} else {
		dispatch({ type: FETCH_LIST, payload: response.data });
	}
};

export const editList = (listId, formValues) => async (dispatch, getState) => {
	const { google_user_id } = getState().auth;

	const response = await listsServer.patch(
		`/user/${google_user_id}/list/${listId}`,
		formValues
	);

	dispatch({ type: EDIT_LIST, payload: response.data });

	history.push(`/list/${listId}`);
};

export const toggleList = (listId) => async (dispatch, getState) => {
	const { google_user_id } = getState().auth;

	const response = await listsServer.patch(
		`/user/${google_user_id}/list/${listId}`
	);

	dispatch({ type: TOGGLE_LIST, payload: response.data });

	dispatch(showAllList());
	history.push(`/list/${listId}`);
};

export const deleteList = (listId) => async (dispatch, getState) => {
	const { google_user_id } = getState().auth;
	await listsServer.delete(`/user/${google_user_id}/list/${listId}`);

	dispatch({ type: DELETE_LIST, payload: listId });
	history.push("/");
};

export const addItem =
	(listId, formValues, formName) => async (dispatch, getState) => {
		const { google_user_id } = getState().auth;

		const response = await listsServer.post(
			`/user/${google_user_id}/list/${listId}/item`,
			formValues
		);

		dispatch({
			type: ADD_ITEM,
			payload: { listId: listId, item: response.data },
		});

		//Reset the form. It's only required in this case.
		dispatch(reset(formName));

		history.push(`/list/${listId}`);
	};

export const deleteItem = (listId, itemId) => async (dispatch, getState) => {
	const { google_user_id } = getState().auth;

	await listsServer.delete(
		`/user/${google_user_id}/list/${listId}/item/${itemId}`
	);

	dispatch({ type: DELETE_ITEM, payload: { listId: listId, itemId: itemId } });

	history.push(`/list/${listId}`);
};

export const editItem =
	(listId, itemId, formValues) => async (dispatch, getState) => {
		const { google_user_id } = getState().auth;

		const response = await listsServer.patch(
			`user/${google_user_id}/list/${listId}/item/${itemId}`,
			formValues
		);

		dispatch({
			type: EDIT_ITEM,
			payload: { listId: listId, item: response.data },
		});

		history.push(`/list/${listId}`);
	};
