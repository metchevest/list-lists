import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
	return (
		<div className="left__panel_footer">
			<div className="ui three item menu">
				<Link to="/list/new" className="item">
					<p>New List </p>
				</Link>

				<Link to="/categories" className="item">
					<p>Categories </p>
				</Link>

				<Link to="/category/new" className="item">
					<p>New Category </p>
				</Link>
			</div>
		</div>
	);
};

export default Footer;
