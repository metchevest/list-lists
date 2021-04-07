import React from "react";
import { Link } from "react-router-dom";

import GoogleAuth from "./GoogleAuth";

const Header = () => {
	return (
		<div className="menu__header">
			<div>
				<Link to="/" className="menu__item">
					<h2>List & Lists</h2>
				</Link>
			</div>
			<div>
				<GoogleAuth />
			</div>
		</div>
	);
};

export default Header;
