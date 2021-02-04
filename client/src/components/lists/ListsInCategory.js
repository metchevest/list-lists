import React from "react";

import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { fetchLists } from "../../actions";
import Headline from "../Headline";

class ListsInCategory extends React.Component {
	componentDidMount() {
		if (!this.props.lists) {
			this.props.fetchLists();
		}
	}

	getLists() {
		return this.props.lists.filter((aList) => {
			return aList.categories.some(
				(category) => category.id === parseInt(this.props.match.params.id)
			);
		});
	}

	renderRow(listsInCategory) {
		return listsInCategory.map((aList) => {
			return (
				<tr key={aList.id}>
					<td className="margin-auto">
						<h4 className="ui image header">
							<div className="content">
								<Link to={`/list/${aList.id}`}> {aList.name}</Link>
							</div>
						</h4>
					</td>
					<td>
						<div className="sub header">{aList.description}</div>
					</td>
				</tr>
			);
		});
	}

	render() {
		console.log("ListsInCategory.render");
		console.log(this.props);
		let listsInCategory = this.getLists();

		if (listsInCategory.length > 0) {
			return (
				<div>
					<Headline text="Lists in the Category" />
					<table className="ui celled padded table">
						<thead>
							<tr>
								<th> List Name</th>
								<th> Description </th>
							</tr>
						</thead>

						<tbody>{this.renderRow(listsInCategory)}</tbody>
					</table>
				</div>
			);
		} else {
			return (
				<div className="ui floating message">
					<p>There are no Lists in the category</p>
				</div>
			);
		}
	}
}

const mapStateToProps = (state) => {
	return {
		lists: Object.values(state.lists),
	};
};

export default connect(mapStateToProps, { fetchLists })(ListsInCategory);
