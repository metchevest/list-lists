import React from "react";

const Headline = (props) => {
	return (
		<div className="padded-text">
			<h2> {props.text}</h2>
		</div>
	);
};

export default Headline;
