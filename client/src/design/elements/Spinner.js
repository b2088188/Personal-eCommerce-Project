import React from 'react';
import styled from 'styled-components';
import CircularProgress from '@material-ui/core/CircularProgress';
import { applyStyleModifiers } from 'styled-components-modifiers';
import { colorNormal, colorGrey } from '../utils';

const Spinner = ({ className }) => {
   return <CircularProgress className={className} />;
};

const SPINNER_MODIFIERS = {
   white: () => `
    color: ${colorNormal.white};
  `,
   dark: () => `
  color: ${colorGrey.dark2};
  `
};

export default styled(Spinner)`
   margin-left: 50%;
   margin-top: 5rem;
   margin-bottom: 5rem;
   ${(props) => (props.color ? `color: ${props.color};` : null)}
   ${applyStyleModifiers(SPINNER_MODIFIERS)}
`;
