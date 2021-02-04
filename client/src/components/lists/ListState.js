import React from "react";
import { connect } from "react-redux";

import { toggleList } from "../../actions";

class ListState extends React.Component {
	renderButton(active) {
		if (active) {
			return <p className="ui right floated basic green button">Active</p>;
		} else {
			return <p className="ui right floated basic red button">Inactive</p>;
		}
	}

	render() {
		return (
			<div onClick={() => this.props.toggleList(this.props.list.id)}>
				{this.renderButton(this.props.list.active)}
			</div>
		);
	}
}

export default connect(null, { toggleList })(ListState);
