import React from "react";

import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { fetchCategories } from "../../actions";
import Loading from "../Loading";
import Headline from "../Headline";

class CategoryList extends React.Component {
	componentDidMount() {
		this.props.fetchCategories();
	}

	renderActions(aCategory) {
		return (
			<>
				<div>
					<Link to={`/category/${aCategory.id}/lists`}> View Lists</Link>
				</div>
				<div>
					<Link to={`/category/delete/${aCategory.id}`}> Delete </Link>
				</div>
				<div>
					<Link to={`/category/edit/${aCategory.id}`}> Edit</Link>
				</div>
			</>
		);
	}

	renderRow() {
		return this.props.categories.map((aCategory) => {
			return (
				<tr key={aCategory.id}>
					<td>
						<h4 className="ui image header">
							<div className="content">
								<Link to={`/category/${aCategory.id}/lists`}>
									{" "}
									{aCategory.name}
								</Link>
								<div className="sub header">{aCategory.description}</div>
							</div>
						</h4>
					</td>
					<td>{this.renderActions(aCategory)}</td>
				</tr>
			);
		});
	}

	render() {
		if (!this.props.categories) {
			return (
				<div>
					{" "}
					<Loading />
				</div>
			);
		}
		if (this.props.categories === []) {
			return (
				<div className="ui floating message">
					<p>There are no categories</p>
				</div>
			);
		} else {
			return (
				<div className="category__list">
					<Headline text="All your Categories:" />
					<table className="ui celled padded table">
						<thead>
							<tr>
								<th> Category</th>
								<th></th>
							</tr>
						</thead>

						<tbody>{this.renderRow()}</tbody>
					</table>
				</div>
			);
		}
	}
}

const mapStateToProps = (state) => {
	return {
		categories: Object.values(state.categories),
	};
};
export default connect(mapStateToProps, { fetchCategories })(CategoryList);
