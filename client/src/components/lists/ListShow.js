import React from "react";
import { connect } from "react-redux";

import { fetchList } from "../../actions";

import ListShowSwitch from "./ListShowSwitch";
import Loading from "../Loading";

class ListShow extends React.Component {
	componentDidUpdate(prevProps) {
		// Once I change the signIn/signOut policy, this may not be needed.
		// I leave here for clearly and to preserve the
		// independence of the component
		//TO-DO take a look over here..
		if (this.props.list === undefined) {
			this.props.fetchList(this.props.match.params.id);
		}
	}

	render() {
		if (!this.props.list) {
			return <Loading />;
		}

		return <ListShowSwitch list={this.props.list} />;
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		list: state.lists[ownProps.match.params.id],
	};
};

export default connect(mapStateToProps, { fetchList })(ListShow);
