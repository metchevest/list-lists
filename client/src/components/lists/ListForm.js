import React from "react";
import { Field, reduxForm } from "redux-form";

class ListForm extends React.Component {
	renderError({ error, touched }) {
		if (touched && error) {
			return (
				<div className="ui error message">
					<div className="header">{error}</div>
				</div>
			);
		}
	}

	renderInput = ({ input, label, meta }) => {
		return (
			<div className="field">
				<label>{label}</label>
				<input {...input} autoComplete="off" />
				{this.renderError(meta)}
			</div>
		);
	};

	onSubmit = (formValues) => {
		this.props.onSubmit(formValues);
	};

	render() {
		return (
			<div>
				<form
					className="ui form error"
					onSubmit={this.props.handleSubmit(this.onSubmit)}
				>
					<Field name="name" component={this.renderInput} label="Name" />
					<Field
						name="description"
						component={this.renderInput}
						label="Description"
					/>
					<button className="ui basic positive button">
						{this.props.buttonText}
					</button>
					<button
						className="ui basic negative button"
						onClick={this.props.onCancel}
					>
						{this.props.onCancelText}
					</button>
				</form>
			</div>
		);
	}
}

const validate = (formValues) => {
	const errors = {};
	if (!formValues.name) {
		errors.name = "You must enter a Name";
	}

	return errors;
};

export default reduxForm({
	form: "listForm",
	validate,
})(ListForm);
