import React from "react";
import { Route, Switch } from "react-router-dom";

import ListNew from "./lists/ListNew";
import ListEdit from "./lists/ListEdit";
import ListShow from "./lists/ListShow";
import ListDelete from "./lists/ListDelete";

import Welcome from "./Welcome";

import Footer from "./Footer";
import ItemDelete from "./items/ItemDelete";

import Errors from "./Errors";
import CategoryList from "./categories/CategoryList";
import CategoryNew from "./categories/CategoryNew";
import ListsInCategory from "./lists/ListsInCategory";

const CentralPanel = () => {
	return (
		<>
			<>
				<Switch>
					<Route path="/" exact component={Welcome} />
					<Route
						path="/list/:listId/item/delete/:itemId"
						component={ItemDelete}
					/>
					<Route path="/list/new" component={ListNew} />
					<Route path="/list/edit/:id" component={ListEdit} />
					<Route path="/list/delete/:id" component={ListDelete} />
					<Route
						path="/list/:id"
						render={(routerProps) => <ListShow {...routerProps} />}
					/>
					<Route path="/list/edit/:id" component={ListEdit} />
					{/* TO-DO check this if is ok, the path is to not to crash
						with the router inside. eg the user goes direct to this path and
						the list is not loaded.... */}
					<Route path="/list/:id/:id2" component={Errors} />
					<Route path="/categories" component={CategoryList} />
					<Route path="/category/new" component={CategoryNew} />
					<Route path="/category/:id/lists" component={ListsInCategory} />
				</Switch>
				<Errors />
			</>
			<>
				<Footer />
			</>
		</>
	);
};

export default CentralPanel;
