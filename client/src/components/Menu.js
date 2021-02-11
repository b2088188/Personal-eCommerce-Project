import React, { useState, useContext, createContext, cloneElement } from 'react';
import { Menu as MaterialMenu, MenuItem } from '@material-ui/core';

const MenuContext = createContext();

const Menu = ({ children }) => {
	const [anchorEl, setAnchorEl] = useState(null);

	const value = { anchorEl, setAnchorEl };
	return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
};

const MenuOpenButton = ({ children: child }) => {
	const { setAnchorEl } = useContext(MenuContext);
	return cloneElement(child, {
		onClick: callAll((e) => setAnchorEl(e.currentTarget), child.props.onClick)
	});
};

const MenuCloseButton = ({ children: child }) => {
	const { setAnchorEl } = useContext(MenuContext);
	return cloneElement(child, {
		onClick: callAll(() => setAnchorEl(null), child.props.onClick)
	});
};

const MenuContent = ({ children }) => {
	const { anchorEl, setAnchorEl } = useContext(MenuContext);

	return (
		<MaterialMenu
			id='simple-menu'
			anchorEl={anchorEl}
			keepMounted
			open={Boolean(anchorEl)}
			onClose={() => setAnchorEl(null)}
		>
			{children}
		</MaterialMenu>
	);
};

function callAll(...fns) {
	return function (...args) {
		fns.forEach((fn) => {
			fn && fn(...args);
		});
	};
}

export { Menu, MenuItem, MenuOpenButton, MenuCloseButton, MenuContent };
