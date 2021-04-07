import React from "react";
import { Field, reduxForm } from "redux-form";

class ItemForm extends React.Component {
	renderError({ error, touched, active }) {
		if (touched && error && active) {
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

	renderCancelButton = () => {
		if (this.props.onCancelText !== "") {
			return (
				<button
					className="ui basic negative button"
					onClick={this.props.onCancel}
				>
					{this.props.onCancelText}
				</button>
			);
		}
	};

	render() {
		return (
			<div>
				<form
					className="ui form error"
					onSubmit={this.props.handleSubmit(this.onSubmit)}
				>
					<Field name="text" component={this.renderInput} />
					<div className="item__form_button">
						<button className="ui basic positive button">
							{this.props.buttonText}
						</button>
						{this.renderCancelButton()}
					</div>
				</form>
			</div>
		);
	}
}

const validate = (formValues) => {
	const errors = {};
	if (!formValues.text) {
		errors.text = "You must enter some texts";
	}

	return errors;
};

//In this case, I don't set the form name
//The form name comes in props and gave identification to proper load initialValues
export default reduxForm({
	validate,
	enableReinitialize: true,
})(ItemForm);
