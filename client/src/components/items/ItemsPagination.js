import React from "react";
import { Link } from "react-router-dom";

class ItemPagination extends React.Component {
	render() {
		let f = this.props.from;
		let end = f + 9;

		// TO-DO improve this.
		if (this.props.screen > 1170) {
			end = f + 12;
		}

		return this.props.items.slice(f, end).map((item, index) => {
			return (
				<div className="list__grid_item" key={index}>
					<div className="list__grid_top">{item.text}</div>
					<div className="list__grid_buttons">
						<Link
							to={`${this.props.url}/edit/${item.id}`}
							className="ui basic green button list__grid_button"
						>
							Edit
						</Link>
						<Link
							to={`/list/${this.props.listId}/item/delete/${item.id}`}
							className="ui basic red button list__grid_button"
						>
							Delete
						</Link>
					</div>
				</div>
			);
		});
	}
}

export default ItemPagination;
