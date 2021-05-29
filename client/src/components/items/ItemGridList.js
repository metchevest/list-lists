import React, { useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";

import ItemsPagination from "./ItemsPagination";

const ItemGridList = (props) => {
	let { url } = useRouteMatch();

	const nextPage = () => {
		if (from + 6 < props.items.length && screenWidth < 1170) {
			setFrom(from + 9);
		} else if (from + 9 < props.items.length && screenWidth >= 1170) {
			setFrom(from + 12);
		}
	};

	const previousPage = () => {
		if (from > 9 && screenWidth < 1170) {
			setFrom(from - 9);
		}

		if (from > 12 && screenWidth >= 1170) {
			setFrom(from - 12);
		}
	};

	const renderScroll = () => {
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
					url={url}
				/>
			</div>
			<>{renderScroll()}</>
		</>
	);
};

export default ItemGridList;
