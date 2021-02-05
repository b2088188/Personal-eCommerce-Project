import React, { useState, createContext, useContext, Children, cloneElement } from 'react';
import { NativeSelect } from '@material-ui/core';

const SelectContext = createContext();

const Select = ({ children, name, value, changeValue }) => {
   return (
      <NativeSelect
         value={value}
         onChange={(e) => changeValue(e.target.value)}
         name={name}
         inputProps={{ 'aria-label': 'age' }}
      >
         {children}
      </NativeSelect>
   );
};

const Option = ({ children }) => {
   return <option value={children === 'All' ? '' : children}>{children}</option>;
};

export { Select, Option };

const RegularSelect = ({ count, value = 1, onChange }) => {
   function renderOptions(count) {
      return [...Array(count).keys()].map((el) => (
         <option key={el} value={el + 1}>
            {el + 1}
         </option>
      ));
   }

   return (
      <select value={value} onChange={onChange} className='select'>
         {renderOptions(count)}
      </select>
   );
};

export default RegularSelect;
