import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
	return (
		<div className="ui three item menu">
			<Link to="/list/new" className="item">
				{" "}
				<p className="linked">New List </p>
			</Link>

			<Link to="/categories" className="item">
				{" "}
				<p className="linked">Categories </p>
			</Link>
			<Link to="/category/new" className="item">
				{" "}
				<p className="linked">New Category </p>
			</Link>
		</div>
	);
};

export default Footer;
