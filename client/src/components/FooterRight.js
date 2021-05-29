import React from "react";
import { connect } from "react-redux";

import { showActiveList, showInactiveList, showAllList } from "../actions";

const FooterRight = (props) => {
	return (
		<div className="right__panel_footer">
			<div className="ui three item menu">
				<div
					className={props.show === "active" ? "active item" : "item pointed"}
					onClick={() => props.showActiveList()}
				>
					{" "}
					<p>Actives </p>
				</div>

				<div
					className={props.show === "inactive" ? "active item" : "item"}
					onClick={() => props.showInactiveList()}
				>
					<p>Inactives</p>
				</div>
				<div
					className={props.show === "all" ? "active item" : "item"}
					onClick={() => props.showAllList()}
				>
					{" "}
					<p>All</p>
				</div>
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
