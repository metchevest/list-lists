import React from "react";
import { connect } from "react-redux";

import { addItem } from "../../actions";
import ItemForm from "./ItemForm";

class ItemNew extends React.Component {
	onSubmit = (formValues) => {
		const formName = `ItemEdit${this.props.listId}`;
		this.props.addItem(this.props.listId, formValues, formName);
	};

	render() {
		const formName = `ItemEdit${this.props.listId}`;
		return (
			<div className="item__form">
				<ItemForm
					form={formName}
					key="itenNewKey"
					formKey="itemNew"
					buttonText="Add Item"
					onSubmit={this.onSubmit}
					onCancelText=""
				/>
			</div>
		);
	}
}

export default connect(null, { addItem })(ItemNew);
