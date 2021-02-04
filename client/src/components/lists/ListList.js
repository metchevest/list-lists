import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class ListOfLists extends React.Component {
	renderList() {
		return this.props.lists.map((aList) => {
			return (
				<div key={aList.id}>
					<Link to={`/list/${aList.id}`}> {aList.name}</Link> <br></br>
					{aList.description}a
					<Link to={`/list/edit/${aList.id}`} className="ui button primary">
						{" "}
						Editar{" "}
					</Link>
					<Link to={`/list/delete/${aList.id}`} className="ui button primary">
						{" "}
						Eliminar{" "}
					</Link>
				</div>
			);
		});
	}

	render() {
		return (
			<div>
				<div>
					<div className="big green label"> Your lists:</div>
				</div>
				<div className="ui celled list"> {this.renderList()} </div>
				<div>
					<Link to="/list/new" className="ui button primary">
						{" "}
						Nueva Lista{" "}
					</Link>
				</div>
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

export default connect(mapStateToProps, {})(ListOfLists);
