import React, { useState, createContext, useContext, Children, cloneElement } from 'react';
import { NativeSelect, FormHelperText } from '@material-ui/core';

const SelectContext = createContext();

const Select = ({ children, value, setValue, label, name }) => {
   return (
      <>
         <NativeSelect
            value={value}
            onChange={(e) => setValue(e.target.value)}
            name={name}
            inputProps={{ 'aria-label': 'age' }}
         >
            {children}
         </NativeSelect>
         <FormHelperText>{label}</FormHelperText>
      </>
   );
};
const Option = ({ children }) => {
   return <option value={children === 'All' ? '' : children}>{children}</option>;
};

export { Select, Option };
