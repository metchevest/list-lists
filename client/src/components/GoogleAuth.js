import React from "react";
import { connect } from "react-redux";

import { startUser, signOut } from "../actions";

class GoogleAuth extends React.Component {
	componentDidMount() {
		//Load the Gapi
		window.gapi.load("client:auth2", () => {
			window.gapi.client
				.init({
					clientId:
						"394120649034-bktpmoft4grd8qcsl3bp60le96o07ij0.apps.googleusercontent.com",
					scope: "email",
				})
				.then(() => {
					//Set the state en the redux store when I get a response
					this.auth = window.gapi.auth2.getAuthInstance();
					this.onAuthChange(this.auth.isSignedIn.get());
					this.auth.isSignedIn.listen(this.onAuthChange);
				});
		});

		window.addEventListener("beforeunload", () => {
			// TOGGLE THIS LINE TO COMMENT TO MAKE EASY DEBUG.
			this.onSignOutClick();
		});
	}

	//The function setted as listen to the object of GAPI
	// receives a boolean indicating if the user is logged
	onAuthChange = (isSignedIn) => {
		if (isSignedIn) {
			let id = this.auth.currentUser.get().getId();
			this.props.startUser(id);
		} else {
			this.props.signOut();
		}
	};

	onSignInClick = () => {
		this.auth.signIn({
			ux_mode: "popup",
			prompt: "select_account",
		});
	};

	onSignOutClick = () => {
		this.auth.signOut();
	};

	renderAuthButton() {
		if (this.props.isSignedIn === null) {
			return null;
		} else if (this.props.isSignedIn) {
			return (
				<button className="ui red google button" onClick={this.onSignOutClick}>
					<i className="google icon" />
					Sign Out
				</button>
			);
		} else {
			return (
				<button className="ui red google button" onClick={this.onSignInClick}>
					<i className="google icon" />
					Sign in with Google
				</button>
			);
		}
	}

	render() {
		return <div>{this.renderAuthButton()}</div>;
	}
}

const mapStateToProps = (state) => {
	return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps, { startUser, signOut })(GoogleAuth);
