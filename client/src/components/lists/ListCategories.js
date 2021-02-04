import React from "react";

import CategoryGrid from "../categories/CategoryGrid";

class ListCategories extends React.Component {
	render() {
		if (this.props.list.categories.length > 0) {
			return (
				<div>
					<CategoryGrid categories={this.props.list.categories} />
				</div>
			);
		} else {
			return (
				<div className="ui floating message">
					{" "}
					<p>The List doesn't have categories associated.</p>
				</div>
			);
		}
	}
}

export default ListCategories;
