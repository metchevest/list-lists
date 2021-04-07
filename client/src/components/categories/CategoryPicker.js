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
		this.props.selectedCategory(aCategoryId);
	}

	renderGrid() {
		return this.props.categories.map((aCategory) => {
			let className = "category__picker-item ";

			if (this.props.selectedCategories.includes(aCategory.id)) {
				className = className.concat("category__selected-cell");
			}
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

	updateCategories() {
		let listId = this.props.list.id;
		this.props.updateCategories(this.props.selectedCategories, listId);
		history.push(`/list/${listId}`);
	}

	renderBottomPanel() {
		return (
			<div>
				<div
					className="ui basic green button category__picker-button"
					onClick={() => this.updateCategories()}
				>
					<label>Save</label>
				</div>
				<div
					className="ui basic red button category__picker-button"
					onClick={() => history.push(`/list/${this.props.list.id}`)}
				>
					<label>Cancel</label>
				</div>
				<div className="categorypicker__text">
					<p> Highlighted Categories are the list's current categories </p>
					<p> Click on a highlighted Category to delete from the list</p>
					<p> Click on any other Category to add the category to the list</p>
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
				<div className="category__picker">
					<div className="category__picker-grid">{this.renderGrid()}</div>
					<div className="category__picker-footer">
						{this.renderBottomPanel()}
					</div>
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
