import React from "react";
import { connect } from "react-redux";

import { fetchList, editList } from "../../actions";
import ListForm from "./ListForm";
import Headline from "../Headline";
import history from "../../history";

class ListsEdit extends React.Component {
	componentDidMount() {
		if (this.props.list === undefined) {
			this.props.fetchList(this.props.match.params.id);
		}
	}

	onSubmit = (formValues) => {
		this.props.editList(this.props.match.params.id, formValues);
	};

	render() {
		if (!this.props.list) {
			return <div> Loading...</div>;
		}

		return (
			<div>
				<Headline text="Edit the list." />
				<ListForm
					initialValues={{
						name: this.props.list.name,
						description: this.props.list.description,
					}}
					buttonText="Save"
					onSubmit={this.onSubmit}
					onCancelText="Cancel"
					onCancel={() => history.push(`/list/${this.props.list.id}`)}
				/>
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		list: state.lists[ownProps.match.params.id],
	};
};

export default connect(mapStateToProps, { fetchList, editList })(ListsEdit);
