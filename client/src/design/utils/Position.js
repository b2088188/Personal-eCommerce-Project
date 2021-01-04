import {css} from 'styled-components';

export const setFlex = (
	{direction = 'row', x, y, wrap} = {}
	) => {
	return css`
	  display: flex;
	  flex-direction: ${direction};
	  justify-content: ${x};
	  align-items: ${y};
	  flex-wrap: ${wrap};
	`
}