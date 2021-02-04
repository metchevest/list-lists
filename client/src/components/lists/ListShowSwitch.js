import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";

import ItemList from "../items/ItemList";
import ItemEdit from "../items/ItemEdit";
import CategoryPicker from "../categories/CategoryPicker";
import ListShowHeader from "./ListShowHeader";
import ListCategories from "./ListCategories";

const ListShowSwitch = (props) => {
	let { path, url } = useRouteMatch();

	return (
		<>
			<ListShowHeader list={props.list} url={url} />
			<Switch>
				{/* <Route
				path={path}
				render={(routerProps) => (
					<ListShowHeader {...routerProps} list={props.list} url={url} />
				)}
			/> */}
				<Route
					path={`${path}/setCategory`}
					render={(routerProps) => (
						<CategoryPicker {...routerProps} list={props.list} />
					)}
				/>
				<Route exact path={path}>
					<ItemList items={props.list.items} listId={props.list.id} url={url} />
				</Route>

				<Route
					exact
					path={`${path}/listCategories`}
					render={(routerProps) => (
						<ListCategories {...routerProps} list={props.list} />
					)}
				/>
				<Route
					path={`${path}/edit/:itemId`}
					render={(routerProps) => (
						<ItemEdit {...routerProps} listId={props.list.id} />
					)}
				/>
			</Switch>
		</>
	);
};

export default ListShowSwitch;
