import React from "react";
import { connect } from "react-redux";

import Loading from "../Loading";
import {
	fetchCategories,
	selectedCategory,
	cleanSelection,
	updateCategories,
	fetchList,
	addCategories,
} from "../../actions";

import history from "../../history";

class CategoryPicker extends React.Component {
	componentDidMount() {
		//Fetch all the categories that the user have.
		this.props.fetchCategories();

		if (!this.props.list) {
			this.props.fetchList(this.props.match.params.listId);
		}

		if (this.props.categories) {
			//Add the categories of the list to the list of categories selected.
			let actualCategories = this.props.list.categories.map((aCategory) => {
				return aCategory.id;
			});

			this.props.addCategories(actualCategories);
		}
	}

	componentWillUnmount() {
		this.props.cleanSelection();
	}
	clickedOn(aCategoryId) {
		// console.log("en clickedOn");
		// console.log(this.props.selectedCategories);
		// console.log(aCategoryId);
		this.props.selectedCategory(aCategoryId);
	}

	renderCategories() {
		return this.props.categories.map((aCategory) => {
			let className =
				"four wide column ui positive basic label scroll nice-cell pointed margin-extra ";

			if (this.props.selectedCategories.includes(aCategory.id)) {
				className = className.concat("selected-cell");
			} else {
				className = className.concat("unselected-cell");
			}
			console.log("renderCategories.map");
			console.log(aCategory.id);
			return (
				<div
					key={aCategory.id}
					className={className}
					onClick={() => {
						this.clickedOn(aCategory.id);
					}}
				>
					{aCategory.name}
				</div>
			);
		});
	}

	renderGrid() {
		return <div className="ui grid padded-top">{this.renderCategories()}</div>;
	}

	updateCategories() {
		let listId = this.props.list.id;
		this.props.updateCategories(this.props.selectedCategories, listId);
		history.push(`/list/${listId}`);
	}

	renderBottomPanel() {
		return (
			<div>
				<div
					className="ui two button mini menu"
					onClick={() => this.updateCategories()}
				>
					<label className="ui basic positive button right menu">Save</label>
				</div>
				<div
					className="ui two button mini menu"
					onClick={() => history.push(`/list/${this.props.list.id}`)}
				>
					<label className="ui basic negative button right menu">Cancel</label>
				</div>
			</div>
		);
	}

	render() {
		console.log("CategoryPicker.render");
		console.log(this.props.selectedCategories);
		if (!this.props.categories) {
			return <Loading />;
		}
		if (!this.props.list) {
			return <Loading />;
		}
		if (this.props.categories.length === 0) {
			return (
				<div className="ui floating message">
					<p>There are no categories</p>
				</div>
			);
		} else {
			return (
				<div>
					<div>{this.renderGrid()}</div>
					<div>{this.renderBottomPanel()}</div>
				</div>
			);
		}
	}
}

const mapStateToProps = (state) => {
	return {
		categories: Object.values(state.categories),
		selectedCategories: state.selectedCategories,
	};
};

export default connect(mapStateToProps, {
	fetchCategories,
	selectedCategory,
	updateCategories,
	fetchList,
	cleanSelection,
	addCategories,
})(CategoryPicker);
