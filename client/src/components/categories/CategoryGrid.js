import React from "react";
import { Link } from "react-router-dom";

const CategoryGrid = (props) => {
	const renderRow = () => {
		return props.categories.map((aCategory) => {
			return (
				<tr key={aCategory.id}>
					<td className="margin-auto">
						<h4 className="ui image header">
							<div className="content">
								<Link to={`/category/${aCategory.id}/lists`}>
									{" "}
									{aCategory.name}
								</Link>
							</div>
						</h4>
					</td>
					<td>
						<div className="sub header">{aCategory.description}</div>
					</td>
				</tr>
			);
		});
	};

	return (
		<div>
			<table className="ui celled padded table">
				<thead>
					<tr>
						<th> Category</th>
						<th> Description </th>
					</tr>
				</thead>

				<tbody>{renderRow()}</tbody>
			</table>
		</div>
	);
};

export default CategoryGrid;
