import React from "react";

const Welcome = () => {
	return (
		<div className="ui message">
			<div className="header">Welcome to List & Lists</div>
			<br></br>
			<ul className="list">
				<li>To start you can create new lists from the menu at the bottom</li>
				<li>Then you can add items to them</li>
				<li> The list of lists will appeard in the right</li>
				<li>
					{" "}
					To display the items click on "Show" or in the name of the list in the
					right panel
				</li>
				<li>
					{" "}
					You can Drag, Drop, and resize the Items giving them different
					importance
				</li>
				<li>
					{" "}
					You can set a list to be "active" or "inactive" by clicking in the
					buttone next to the name of the list.
				</li>
				<li>
					{" "}
					The list on the right can be filtered based on their state ( active /
					inactive )
				</li>
			</ul>

			<br></br>
			<br></br>
			<div className="header"> Tools:</div>
			<ul className="list">
				<li> React</li>
				<li> Redux </li>
				<li> Axios </li>
				<li> The backend was developed in Elixir/Phoenix</li>
				<li>
					{" "}
					The CSS is from <a href="https://semantic-ui.com/"> Semantic UI</a>
				</li>
				<li> Google OAuth</li>
			</ul>
			<br></br>
			<br></br>
			<div className="header"> Future development:</div>
			<ul className="list">
				<li>A lot of testing.</li>
				<li>Edit and delete a Category </li>
				<li>Improve the component ItemList.</li>
				<li>Manage errors of Axios and connection.</li>
				<li>Improve SignIn/SignOut policy, current is too restrictive</li>
				<li>Solve error with Redux Form and keyboard enter</li>
				<li>...</li>
			</ul>
			<br></br>
			<br></br>
			<div className="header"> Bugs:</div>
			<ul className="list">
				<li>
					{" "}
					After creating a new Item, when confirm with keyboard, if you go back
					to the input, an error on non-empty field signal is showed.
				</li>
				<li>Category Create on empty description.</li>
			</ul>
		</div>
	);
};

export default Welcome;
