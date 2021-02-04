import React from "react";
import { connect } from "react-redux";
import { Router } from "react-router-dom";

import history from "../history";
import { fetchLists } from "../actions";

import "../style/style.css";

import Header from "./Header";
import CentralPanel from "./CentralPanel";
import NotLogged from "./NotLogged";
import ListCardList from "./lists/ListCardList";

class App extends React.Component {
	renderMainPanel() {
		if (this.props.isSignedIn === null || this.props.isSignedIn === false) {
			return <NotLogged />;
		} else {
			return (
				<div className="ui grid segment">
					<div className="ten wide stretched column ">
						<CentralPanel />
					</div>
					<div className="six wide column">
						<ListCardList />
					</div>
				</div>
			);
		}
	}

	render() {
		return (
			<div className="container">
				<Router history={history}>
					<Header />
					{this.renderMainPanel()}
				</Router>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		lists: state.lists,
		isSignedIn: state.auth.isSignedIn,
	};
};

export default connect(mapStateToProps, { fetchLists })(App);
