import React from "react";
import { Link } from "react-router-dom";

import ItemNew from "../items/ItemNew";
import ListState from "./ListState";

const ListShowHeader = (props) => {
	const { name, description, id } = props.list;

	return (
		<div className="padded-bottom">
			<div className="ui secondary menu scroll">
				<div className="item limited">
					<h3> {name}</h3>
				</div>
				<div className="item limited">
					<h4> {description}</h4>
				</div>
				<div className="item limited">
					<ListState list={props.list} />
				</div>
				<div className="right menu">
					<div className="item">
						<ItemNew listId={id} />
					</div>
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
						<p className="linked">Manage Category</p>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default ListShowHeader;
