import React from "react";
import { connect } from "react-redux";

import { showActiveList, showInactiveList, showAllList } from "../actions";

const FooterRight = (props) => {
	console.log(props);
	return (
		<div className="ui three item menu">
			<div
				className={
					props.show === "active" ? "item nice-back pointed" : "item pointed"
				}
				onClick={() => props.showActiveList()}
			>
				{" "}
				<p className="linked">Actives </p>
			</div>

			<div
				className={
					props.show === "inactive" ? "item nice-back pointed" : "item pointed"
				}
				onClick={() => props.showInactiveList()}
			>
				{" "}
				<p className="linked">Inactives</p>
			</div>
			<div
				className={
					props.show === "all" ? "item nice-back pointed" : "item pointed"
				}
				onClick={() => props.showAllList()}
			>
				{" "}
				<p className="linked">All</p>
			</div>
		</div>
	);
};

const maptStateToProps = (state) => {
	return {
		show: state.listShow,
	};
};

export default connect(maptStateToProps, {
	showActiveList,
	showInactiveList,
	showAllList,
})(FooterRight);
