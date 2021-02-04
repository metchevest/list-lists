import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import ListState from "./ListState";
import FooterRight from "../FooterRight";

class ListCardList extends React.Component {
	constructor(props) {
		super(props);
		this.myRef = React.createRef(); // Create a ref object
	}

	renderListFiltered(lists) {
		return lists.map((aList, index) => {
			return (
				<div className="card margin-auto" key={index}>
					<div className="content">
						<ListState list={aList} />
						<div className="header">
							<Link to={`/list/${aList.id}`}>
								{aList.name.substring(0, 27)}
							</Link>
						</div>
						<div className="meta">{aList.active}</div>
						<div className="description">
							{aList.description.substring(0, 34)}
						</div>
					</div>
					<div className="extra content">
						<div className="ui two buttons">
							<Link to={`/list/${aList.id}`} className="ui basic green button">
								{" "}
								Show{" "}
							</Link>

							<Link
								to={`/list/delete/${aList.id}`}
								className="ui basic red button"
							>
								{" "}
								Delete{" "}
							</Link>
						</div>
					</div>
				</div>
			);
		});
	}

	renderList() {
		if (this.props.listShow === "active") {
			return this.renderListFiltered(
				this.props.lists.filter((list) => list.active === true)
			);
		} else if (this.props.listShow === "inactive") {
			return this.renderListFiltered(
				this.props.lists.filter((list) => list.active === false)
			);
		} else {
			return this.renderListFiltered(this.props.lists);
		}
	}

	componentDidUpdate() {
		this.myRef.current.scrollTo(0, 0);
	}

	render() {
		return (
			<div>
				<div className="ui segment main-panel ">
					<div ref={this.myRef} className="right-panel scroll">
						<div className="ui cards div-card">{this.renderList()}</div>
					</div>
				</div>
				<div>
					<FooterRight />
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		//Transform the object into a List to use map.
		lists: Object.values(state.lists),
		listShow: state.listShow,
	};
};

export default connect(mapStateToProps, {})(ListCardList);
