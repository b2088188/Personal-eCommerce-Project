import React, { useState, useContext, useRef, createContext, cloneElement } from 'react';
import { MenuList, Grow, Paper, Popper, ClickAwayListener } from '@material-ui/core';

const MenuContext = createContext();

const Menu = ({ children }) => {
	const [isOpen, setIsOpen] = useState(false);
	const anchorRef = useRef(null);
	const value = { isOpen, setIsOpen, anchorRef };
	return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
};

const MenuOpenButton = ({ children: child }) => {
	const { setIsOpen, anchorRef } = useContext(MenuContext);
	return cloneElement(child, {
		onClick: callAll(() => setIsOpen(true), child.props.onClick),
		ref: anchorRef
	});
};

const MenuCloseButton = ({ children: child }) => {
	const { setIsOpen, anchorRef } = useContext(MenuContext);
	return cloneElement(child, {
		onClick: callAll(() => setIsOpen(false), child.props.onClick),
		ref: anchorRef
	});
};

const MenuContent = ({ children, className }) => {
	const { isOpen, setIsOpen, anchorRef } = useContext(MenuContext);

	const handleClose = (event) => {
		if (anchorRef.current && anchorRef.current.contains(event.target)) return;
		setIsOpen(false);
	};

	return (
		<Popper open={isOpen} anchorEl={anchorRef.current} transition>
			{({ TransitionProps, placement }) => (
				<Grow
					{...TransitionProps}
					style={{
						transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom'
					}}
				>
					<Paper>
						<ClickAwayListener onClickAway={handleClose}>
							<MenuList autoFocusItem={isOpen}>{children}</MenuList>
						</ClickAwayListener>
					</Paper>
				</Grow>
			)}
		</Popper>
	);
};

function callAll(...fns) {
	return function (...args) {
		fns.forEach((fn) => {
			fn && fn(...args);
		});
	};
}

export { Menu, MenuOpenButton, MenuCloseButton, MenuContent };
