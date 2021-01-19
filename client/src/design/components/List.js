import styled from 'styled-components';
import {
   colorGrey,
   colorNormal,
   setBorder,
   setMargin,
   setFlex,
   setFlexWidth,
   media
} from '../utils';
import { applyStyleModifiers } from 'styled-components-modifiers';

const LIST_MODIFIERS = {};
export const List = styled.ul`
   font-size: 1.4rem;
   list-style: none;
   // flex & flex-direction
   ${({ direction }) =>
      direction && typeof direction === 'string' ? setFlex({ direction }) : null}
   ${({ direction }) =>
      direction && direction.desktop ? setFlex({ direction: direction.desktop }) : null}
   ${({ direction }) =>
      direction && direction.tabland
         ? media.tabland(setFlex({ direction: direction.tabland }))
         : null}
   ${({ direction }) =>
      direction && direction.tabport
         ? media.tabport(setFlex({ direction: direction.tabport }))
         : null}
   ${({ direction }) =>
      direction && direction.phone ? media.phone(setFlex({ direction: direction.phone })) : null}
   // flex & align-items
    ${({ flexy }) => (flexy && typeof flexy === 'string' ? setFlex({ y: flexy }) : null)}
   ${({ flexy }) => (flexy && flexy.desktop ? setFlex({ y: flexy.desktop }) : null)}
   ${({ flexy }) => (flexy && flexy.tabland ? media.tabland(setFlex({ y: flexy.tabland })) : null)}
   ${({ flexy }) => (flexy && flexy.tabport ? media.tabport(setFlex({ y: flexy.tabport })) : null)}
   ${({ flexy }) => (flexy && flexy.phone ? media.phone(setFlex({ y: flexy.phone })) : null)}
   // flex & flex-basis
    ${({ flexx }) => (flexx && typeof flexx === 'string' ? setFlex({ x: flexx }) : null)}
   ${({ flexx }) => (flexx && flexx.desktop ? setFlex({ x: flexx.desktop }) : null)}
   ${({ flexx }) => (flexx && flexx.tabland ? media.tabland(setFlex({ x: flexx.tabland })) : null)}
   ${({ flexx }) => (flexx && flexx.tabport ? media.tabport(setFlex({ x: flexx.tabport })) : null)}
   ${({ flexx }) => (flexx && flexx.phone ? media.phone(setFlex({ x: flexx.phone })) : null)}
  ${applyStyleModifiers(LIST_MODIFIERS)}
`;

const LISTITEM_MODIFIERS = {};
const ListItem = styled.li`
   ${applyStyleModifiers(LISTITEM_MODIFIERS)}
`;
List.Item = ListItem;
// ${({ pd }) => (pd && typeof pd === 'object' ? setPadding({ x: pd.x, y: pd.y }) : null)}
//    ${({ pd }) => (pd && pd[0] ? setPadding({ x: pd[0].x, y: pd[0].y }) : null)}
//    ${({ pd }) => (pd && pd[1] ? media.tabland(setPadding({ x: pd[1].x, y: pd[1].y })) : null)}
//    ${({ pd }) => (pd && pd[2] ? media.tabport(setPadding({ x: pd[2].x, y: pd[2].y })) : null)}
//    ${({ pd }) => (pd && pd[3] ? media.phone(setPadding({ x: pd[3].x, y: pd[3].y })) : null)}
