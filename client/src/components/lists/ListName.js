import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class ListName extends React.Component {
	renderItem(id) {
		if (id === 4) {
			return "link item active";
		} else {
			return "link item";
		}
	}

	renderList() {
		return this.props.lists.map((aList) => {
			return (
				<Link to={`/list/${aList.id}`}>
					<div key={aList.id} className={this.renderItem(aList.id)}>
						{aList.name}
					</div>
				</Link>
			);
		});
	}

	render() {
		return (
			<div className="ui vertical fluid right tabular menu ">
				<div className="item">
					<h4 className="ui center aligned icon header">
						<i className=" circular list icon"></i>
						Your list's:
					</h4>
				</div>
				<div> {this.renderList()} </div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		//Transform the object into a List to use map.
		lists: Object.values(state.lists),
	};
};

export default connect(mapStateToProps, {})(ListName);
