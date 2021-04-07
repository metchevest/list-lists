import React, { useEffect, useState } from "react";

import ItemsPagination from "./ItemsPagination";

const ItemGridList = (props) => {
	const nextPage = () => {
		console.log("en nextPage");
		console.log(props);

		if (from + 7 < props.items.length) {
			setFrom(from + 7);
		}

		console.log(from);
	};

	const previousPage = () => {
		console.log("en previousPage");
		console.log(props);
		console.log(from);
		if (from > 6) {
			setFrom(from - 7);
		}
		console.log(from);
	};

	const renderScroll = () => {
		console.log(props);

		if (screenWidth >= 768) {
			return (
				<div className="ui two item menu item__grid_menu">
					<div className="item" onClick={() => previousPage()}>
						<p> {"<-- Back"} </p>
					</div>
					<div className="item" onClick={() => nextPage()}>
						<p> {"Next -->"} </p>
					</div>
				</div>
			);
		}
	};

	const [from, setFrom] = useState(0);
	const [screenWidth, setScreenWidth] = useState(window.innerWidth);

	useEffect(() => {
		setScreenWidth(window.innerWidth);
	}, []);

	return (
		<>
			<div className="item__grid_list">
				<ItemsPagination from={from} screen={screenWidth} items={props.items} />
			</div>
			<>{renderScroll()}</>
		</>
	);
};

export default ItemGridList;
