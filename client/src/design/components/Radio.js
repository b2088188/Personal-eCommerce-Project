import styled from 'styled-components';
import { Radio as MaterialRadio, FormControlLabel } from '@material-ui/core';

export const Radio = styled(MaterialRadio)``;

export const RadioLabel = styled(FormControlLabel)`
	font-family: inherit;
`;
Radio.Label = RadioLabel;
