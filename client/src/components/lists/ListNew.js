import React from "react";
import { connect } from "react-redux";

import { createList } from "../../actions";
import ListForm from "./ListForm";
import Headline from "../Headline";

import history from "../../history";

class NewList extends React.Component {
	onSubmit = (formValues) => {
		this.props.createList(formValues);
	};

	render() {
		return (
			<div>
				<Headline text="Create a new List" />
				<ListForm
					buttonText="Create"
					onCancelText="Cancel"
					onCancel={() => history.push("/")}
					onSubmit={this.onSubmit}
				/>
			</div>
		);
	}
}

export default connect(null, { createList })(NewList);
