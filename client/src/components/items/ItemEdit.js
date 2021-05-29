import React from "react";
import { connect } from "react-redux";

import { editItem, fetchList } from "../../actions";

import ItemForm from "./ItemForm";
import history from "../../history";

class ItemEdit extends React.Component {
	componentDidMount() {
		if (this.props.list === undefined) {
			this.props.fetchList(this.props.listId);
		}
	}

	// Arrow function for binding purporse
	onSubmit = (formValues) => {
		this.props.editItem(
			this.props.list.id,
			this.props.match.params.itemId,
			formValues
		);
	};

	renderForm() {
		const { itemId } = this.props.match.params;
		const item = this.props.list.items.filter(
			(item) => item.id === parseInt(itemId)
		)[0];

		return (
			<div>
				<ItemForm
					key="itemEdit"
					form={`ItemEdit${item.id}`}
					buttonText="Save"
					onSubmit={this.onSubmit}
					initialValues={{ text: item.text }}
					onCancelText="Cancel"
					onCancel={() => history.push(`/list/${this.props.list.id}`)}
				/>
			</div>
		);
	}

	render() {
		if (this.props.list !== undefined) {
			return this.renderForm();
		} else {
			return <p> Loading... </p>;
		}
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		list: state.lists[ownProps.listId],
	};
};

export default connect(mapStateToProps, { editItem, fetchList })(ItemEdit);
