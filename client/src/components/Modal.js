import React, { useState, useContext, createContext, cloneElement } from 'react';
import { Modal as MaterialModel, Backdrop, Fade, makeStyles } from '@material-ui/core';

const ModalContext = createContext();

const useStyles = makeStyles((theme) => ({
   modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
   },
   paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3)
   }
}));

const Modal = ({ children }) => {
   const [isOpen, setIsOpen] = useState(false);
   const value = { isOpen, setIsOpen };
   return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>;
};

const ModalOpenButton = ({ children: child }) => {
   const { setIsOpen } = useContext(ModalContext);

   return cloneElement(child, {
      onClick: callAll(() => setIsOpen(true), child.props.onClick)
   });
};

const ModalCloseButton = ({ children: child }) => {
   const { setIsOpen } = useContext(ModalContext);

   return cloneElement(child, {
      onClick: callAll(() => setIsOpen(false), child.props.onClick)
   });
};

const ModalContent = ({ children }) => {
   const { isOpen, setIsOpen } = useContext(ModalContext);
   const classes = useStyles();
   return (
      <MaterialModel
         aria-labelledby='transition-modal-title'
         aria-describedby='transition-modal-description'
         className={classes.modal}
         open={isOpen}
         onClose={() => setIsOpen(false)}
         closeAfterTransition
         BackdropComponent={Backdrop}
         BackdropProps={{
            timeout: 500
         }}
      >
         <Fade in={isOpen}>
            <div className={classes.paper}>{children}</div>
         </Fade>
      </MaterialModel>
   );
};

function callAll(...fns) {
   return function (...args) {
      fns.forEach((fn) => {
         fn && fn(...args);
      });
   };
}

export { Modal, ModalOpenButton, ModalCloseButton, ModalContent };
