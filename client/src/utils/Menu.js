import React, { useState, useRef } from 'react';
import { Redirect } from 'react-router-dom';
import { Button, Span, Icon } from '../design/components';
import { Person } from '@material-ui/icons';
import MenuList from '@material-ui/core/MenuList';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

const Menu = ({ username, children, className }) => {
   const [open, setOpen] = useState(false);
   const anchorRef = useRef(null);

   const handleToggle = () => {
      setOpen((prevOpen) => !prevOpen);
   };

   const handleClose = (event) => {
      if (anchorRef.current && anchorRef.current.contains(event.target)) return;
      setOpen(false);
   };

   return (
      <>
         <Button ref={anchorRef} onClick={handleToggle} modifiers='transparent'>
            <Icon as={Person} />
            <Span>{username}</Span>
         </Button>
         <Popper open={open} anchorEl={anchorRef.current} transition>
            {({ TransitionProps, placement }) => (
               <Grow
                  {...TransitionProps}
                  style={{
                     transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom'
                  }}
               >
                  <Paper>
                     <ClickAwayListener onClickAway={handleClose}>
                        <MenuList autoFocusItem={open}>{children}</MenuList>
                     </ClickAwayListener>
                  </Paper>
               </Grow>
            )}
         </Popper>
      </>
   );
};

export default Menu;
