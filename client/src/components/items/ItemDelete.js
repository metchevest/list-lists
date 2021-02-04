import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Modal from "../Modal";
import history from "../../history";

import { fetchList, deleteItem } from "../../actions";

class ItemDelete extends React.Component {
	deleteAction() {
		const { listId, itemId } = this.props.match.params;

		this.props.deleteItem(listId, itemId);
	}

	renderActions() {
		return (
			<React.Fragment>
				<button
					onClick={() => this.deleteAction()}
					className="ui primary button"
				>
					Eliminar
				</button>
				<Link
					to={`/list/${this.props.match.params.list_id}`}
					className="ui button"
				>
					Cancelar
				</Link>
			</React.Fragment>
		);
	}

	renderContact() {
		return `Desea eliminar el item ?`;
	}

	render() {
		return (
			<Modal
				title="Delete Item"
				content={this.renderContact()}
				onDismiss={() =>
					history.push(`/list/${this.props.match.params.list_id}`)
				}
				actions={this.renderActions()}
			/>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		list: state.lists[ownProps.match.params.id],
	};
};

export default connect(mapStateToProps, { fetchList, deleteItem })(ItemDelete);
