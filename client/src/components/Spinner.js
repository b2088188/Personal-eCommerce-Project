import React from 'react';
import styled from 'styled-components';
import CircularProgress from '@material-ui/core/CircularProgress';
import { applyStyleModifiers } from 'styled-components-modifiers';
import { colorNormal, colorGrey } from 'design/utils';

const SPINNER_MODIFIERS = {
   white: () => `
    color: ${colorNormal.white};
  `,
   dark: () => `
  color: ${colorGrey.dark2};
  `
};

const Spinner = ({ className }) => {
   return <CircularProgress className={className} />;
};

export default styled(Spinner)`
   margin: 5rem auto;
   ${(props) => (props.color ? `color: ${props.color};` : null)}
   ${applyStyleModifiers(SPINNER_MODIFIERS)}
`;
