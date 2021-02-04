import React from "react";
import { connect } from "react-redux";

import { clearError } from "../actions";

const Errors = (props) => {
	if (props.errors.raised_error) {
		return (
			<div className="item">
				<div>
					<div
						onClick={() => {
							props.clearError();
						}}
						className="ui negative message"
					>
						<i className="clos icon"></i>
						<div className="header">{props.errors.message}</div>
					</div>
				</div>
			</div>
		);
	} else {
		return <div></div>;
	}
};

const maptStateToprops = (state) => {
	return {
		errors: state.errors,
	};
};

export default connect(maptStateToprops, { clearError })(Errors);
