import React from 'react';
import {Button} from '../design/components';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

const Menu = ({
  history
}) => {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) 
      return;    
    setOpen(false);
  };

	return (
		<>
		 <Button
          ref={anchorRef}
          onClick={handleToggle}      
          className = "menu__btn"        
          modifiers = 'transparent'
          >
          ShunzeLin
        </Button>
        <Popper open={open} anchorEl={anchorRef.current}  transition >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList autoFocusItem={open}>
                    <MenuItem onClick={() => history.push('/profile/settings')}>Profile</MenuItem>                    
                    <MenuItem onClick={handleClose}>Logout</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
		</>        
		)
}

export default Menu;