import React, { useState, useContext, createContext, Children, cloneElement } from 'react';
import { Menu as MaterialMenu, MenuItem } from '@material-ui/core';

const MenuContext = createContext();

const Menu = ({ children }) => {
	const [anchorEl, setAnchorEl] = useState(null);

	function getMenuOpenProps({ onClick } = {}) {
		return {
			onClick: callAll((e) => setAnchorEl(e.currentTarget), onClick),
			'aria-controls': 'simple-menu',
			'aria-haspopup': 'true'
		};
	}

	function getMenuProps() {
		return {
			id: 'simple-menu',
			anchorEl,
			keepMounted: null,
			open: Boolean(anchorEl),
			onClose: () => setAnchorEl(null)
		};
	}
	const value = { anchorEl, setAnchorEl, getMenuProps, getMenuOpenProps };
	return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
};

const MenuOpenButton = ({ children: child }) => {
	const { getMenuOpenProps } = useContext(MenuContext);
	return cloneElement(child, getMenuOpenProps({ onClick: child.props.onClick }));
};

const MenuContent = ({ children, onClick }) => {
	const { getMenuProps, setAnchorEl } = useContext(MenuContext);

	return (
		<MaterialMenu {...getMenuProps()}>
			{Children.map(children, (child) => {
				return cloneElement(child, {
					onClick: callAll(() => setAnchorEl(null), child.props.onClick)
				});
			})}
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

export { Menu, MenuItem, MenuOpenButton, MenuContent };
