import React from "react";

import Welcome from "./Welcome";

const NotLogged = () => {
	return (
		<div className="ui grid segment set-size">
			<div className="sixteen wide stretched column">
				<div className="ui massive compact floating blue message">
					Please sing in to start..
				</div>
				<div>
					<Welcome />
				</div>
			</div>
		</div>
	);
};

export default NotLogged;
