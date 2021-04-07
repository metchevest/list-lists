import React from "react";
import { Link } from "react-router-dom";

import ItemNew from "../items/ItemNew";
import ListState from "./ListState";

const ListShowHeader = (props) => {
	const { name, description, id } = props.list;

	return (
		<div className="list__show">
			<div className="list__show_header">
				<div>
					<h3> {name}</h3>
				</div>
				<div>
					<h4> {description}</h4>
				</div>
				<div className="list__show_state">
					<ListState list={props.list} />
				</div>
				<div>
					<ItemNew listId={id} />
				</div>
			</div>
			<div>
				<div className="ui three item menu">
					<Link to={`/list/edit/${id}`} className="item">
						{" "}
						<p className="linked">Edit List</p>
					</Link>
					<Link to={`${props.url}/listCategories`} className="item">
						<p className="linked">List's categories</p>
					</Link>
					<Link to={`${props.url}/setCategory`} className="item">
						{" "}
						<p className="linked">Admin List's Categories</p>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default ListShowHeader;
