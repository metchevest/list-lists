import React, { useEffect, useState } from "react";
// import ItemPagination from "./ItemPagination";

import ItemsPagination from "./ItemsPagination";

const ItemGridList = (props) => {
	const nextPage = () => {
		console.log("en nextPage");
		console.log(props);

		if (from + 6 < props.items.length && screenWidth < 1170) {
			setFrom(from + 9);
		} else if (from + 9 < props.items.length && screenWidth >= 1170) {
			setFrom(from + 12);
		}
		console.log(from);
	};

	const previousPage = () => {
		console.log("en previousPage");
		console.log(props);
		console.log(from);

		if (from > 9 && screenWidth < 1170) {
			setFrom(from - 9);
		}

		if (from > 12 && screenWidth >= 1170) {
			setFrom(from - 12);
		}
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

	/*Hooks*/
	const [from, setFrom] = useState(props.fromIndex);
	const [screenWidth, setScreenWidth] = useState(window.innerWidth);

	/* Test if is needed to have this hook, or it's just setted at the begining */
	useEffect(() => {
		setScreenWidth(window.innerWidth);
	}, []);

	return (
		<>
			<div className="item__grid_list">
				<ItemsPagination
					from={from}
					screen={screenWidth}
					items={props.items}
					// to={props.listId}
					listId={props.listId}
				/>
				{/* <ItemPagination
					itemsperpage={9}
					nocolumns={3}
					items={props.items}
					pagesspan={4}
				/> */}
			</div>
			<>{renderScroll()}</>
		</>
	);
};

export default ItemGridList;
