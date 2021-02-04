import React from "react";
import { Link } from "react-router-dom";

import GoogleAuth from "./GoogleAuth";

const Header = () => {
	return (
		<div className="ui pointing menu">
			<Link to="/" className="item">
				<h2>List & Lists</h2>
			</Link>
			<div className="right menu">
				<div className="item">
					<GoogleAuth />
				</div>
			</div>
		</div>
	);
};

export default Header;
