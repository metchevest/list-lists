import React from "react";
import { Link } from "react-router-dom";

class ItemPagination extends React.Component {
	constructor(props) {
		super(props);
		// this.state = { fromState: 0 };
		console.log("paso por aca");
	}

	// componentDidMount(){

	// }

	componentDidMount() {
		console.log("here");
	}

	render() {
		console.log(this.props);
		let f = this.props.from;
		let end = f + 6;

		/* I need to investigate which are the bests breakpoints */
		if (this.props.screen > 1170) {
			end = f + 12;
		} else if (this.props.screen > 963) {
			end = f + 9;
		}

		console.log("en render items");
		console.log(end);
		console.log(this.props);

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
