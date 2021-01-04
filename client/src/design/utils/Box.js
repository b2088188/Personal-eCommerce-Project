import {css} from 'styled-components';
import {colorGrey} from '../utils';

export const setShadow = {
    light: '0 2rem 5rem rgba(0, 0, 0, .06)',
    lightshallow: '0 1rem 2rem rgba(0, 0, 0, .06)',
    dark: '0 2rem 5rem rgba(0, 0, 0, .3)',
    darkshallow: '0 1rem 2rem rgba(0, 0, 0, .3)'
}    

export const setBorder = ({
  position = 'border',
  style = 'solid',
  color = colorGrey.light4,
  value = '.1rem'
} = {}) => {
    return css`
        ${position}: ${style} ${value} ${color}; 
    `
}

export const setFlexWidth = ({
    width = '45',
    mx,
    my
    } = {}) => {
    return css`
        flex: 0 0 ${width}%;
        margin: ${my} ${mx};
    `
}

export const setMargin = ({
    mx,
    my
}) => {
    return css`
     margin: ${my} ${mx};
    `
}