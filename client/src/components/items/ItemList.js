import React from "react";
import { Responsive, WidthProvider } from "react-grid-layout";

import { Link } from "react-router-dom";

require("react-grid-layout/css/styles.css");
require("react-resizable/css/styles.css");

const ResponsiveGridLayout = WidthProvider(Responsive);

const ListItem = (props) => {
	const change = (layout) => {
		// todo
	};

	const render = () => {
		let pos = -1;
		const layoutPosition = [
			{ x: 0, w: 2.2 },
			{ x: 2.2, w: 3 },
			{ x: 4.4, w: 2.2 },
			{ x: 6.7, w: 2.2 },
			{ x: 8.8, w: 3 },
			{ x: 11, w: 2.2 },
		];

		return (
			<div className="center-panel">
				<ResponsiveGridLayout
					className="layout"
					cols={{ lg: 10, md: 8, sm: 6, xs: 4, xxs: 2 }}
					rowHeight={30}
					width={1000}
					onLayoutChange={(layout) => change(layout)}
					containerPadding={[1, 1]}
					verticalCompact="true"
					compactType="vertical"
				>
					{props.items.map((item, index) => {
						if (pos === 3) {
							pos = 0;
						} else {
							pos += 1;
						}

						return (
							<div
								className="ui positive basic label scroll nice-back"
								key={index}
								data-grid={{
									x: layoutPosition[pos].x,
									y: 1,
									w: 2.2,
									h: 3.2,
									minW: 2.2,
									maxW: 10,
									minH: 3.2,
									maxH: 10,
								}}
							>
								<div className="item-pretty">{item.text}</div>
								<div className="ui bottom attached positve basic label nice-back">
									<div className="ui two buttons">
										<Link
											to={`${props.url}/edit/${item.id}`}
											className="ui basic green button"
										>
											Edit
										</Link>
										<Link
											to={`/list/${props.listId}/item/delete/${item.id}`}
											className="ui basic red button"
										>
											Delete
										</Link>
									</div>
								</div>
							</div>
						);
					})}
				</ResponsiveGridLayout>
			</div>
		);
	};

	return render();
};

export default ListItem;
