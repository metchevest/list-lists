import React from "react";
import { connect } from "react-redux";

import { createCategory } from "../../actions";
import CategoryForm from "./CategoryForm";
import Headline from "../Headline";

import history from "../../history";

class CategoryNew extends React.Component {
	onSubmit = (formValues) => {
		this.props.createCategory(formValues);
	};

	render() {
		return (
			<div>
				<Headline text="Create a new category" />
				<CategoryForm
					buttonText="Create"
					onCancelText="Cancel"
					onCancel={() => history.push("/categories")}
					onSubmit={this.onSubmit}
				/>
			</div>
		);
	}
}

export default connect(null, { createCategory })(CategoryNew);
