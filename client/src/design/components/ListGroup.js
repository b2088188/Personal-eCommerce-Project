import styled from 'styled-components';
import { applyStyleModifiers } from 'styled-components-modifiers';
import { Title } from '../components/Title';
import { Paragraph } from '../components/Paragraph';
import { Span } from '../components/Span';
import { Button } from '../components/Button';
import { setFlex, setBorder, setFlexWidth, setMargin, media } from '../utils';

export const ListGroup = styled.div`
   padding: 0.75rem 1.25rem;
   ${({ wrap }) => (wrap ? setFlex({ wrap: 'wrap' }) : null)}
   // flex & align-items
   ${({ flexy }) => (flexy && typeof flexy === 'string' ? setFlex({ y: flexy }) : null)}
   ${({ flexy }) => (flexy && flexy.desktop ? setFlex({ y: flexy.desktop }) : null)}
   ${({ flexy }) => (flexy && flexy.tabland ? media.tabland(setFlex({ y: flexy.tabland })) : null)}
   ${({ flexy }) => (flexy && flexy.tabport ? media.tabport(setFlex({ y: flexy.tabport })) : null)}
   ${({ flexy }) => (flexy && flexy.phone ? media.phone(setFlex({ y: flexy.phone })) : null)}
    //Position
    ${(props) => props.xcenter && setFlex({ x: 'center' })}
    ${(props) => props.ycenter && setFlex({ y: 'center' })}
    ${(props) => props.center && setFlex({ x: 'center', y: 'center' })}
    ${(props) => props.ystart && setFlex({ y: 'flex-start' })}
    ${(props) => props.bdbottom && setBorder({ position: 'border-bottom' })}
    ${(props) => props.bdtop && setBorder({ position: 'border-top' })}
`;

const ITEM_MODIFIERS = {};

const ListGroupItem = styled.div`
   // flex-basis
   ${({ width }) => (width && typeof width === 'string' ? setFlexWidth({ width: width }) : null)}
   ${({ width }) => (width && width.desktop ? setFlexWidth({ width: width.desktop }) : null)}
   ${({ width }) =>
      width && width.tabland ? media.tabland(setFlexWidth({ width: width.tabland })) : null}
   ${({ width }) =>
      width && width.tabport ? media.tabport(setFlexWidth({ width: width.tabport })) : null}
   ${({ width }) =>
      width && width.phone ? media.phone(setFlexWidth({ width: width.phone })) : null}   
  // margin horizontal
    ${({ spacing }) =>
      spacing && typeof spacing === 'string' ? setMargin({ x: `${spacing}%`, y: 0 }) : null}
 ${({ spacing }) =>
      spacing && spacing.desktop ? setMargin({ x: `${spacing.desktop}%`, y: 0 }) : null}
   ${({ spacing }) =>
      spacing && spacing.tabland
         ? media.tabland(setMargin({ x: `${spacing.tabland}%`, y: 0 }))
         : null}
   ${({ spacing }) =>
      spacing && spacing.tabport
         ? media.tabport(setMargin({ x: `${spacing.tabport}%`, y: 0 }))
         : null}
   ${({ spacing }) =>
      spacing && spacing.phone ? media.phone(setMargin({ x: `${spacing.phone}%`, y: 0 })) : null}
   // Width
   ${(props) => props.full && setFlexWidth({ width: '95', mx: '2.5%' })}
   ${(props) => props.p60 && setFlexWidth({ width: '60', mx: '2.5%' })}
    ${(props) => props.half && setFlexWidth({ mx: '2.5%' })}
    ${(props) => props.p40 && setFlexWidth({ width: '40', mx: '2.5%' })}
    ${(props) => props.p35 && setFlexWidth({ width: '35', mx: '2.5%' })}
    ${(props) => props.p30 && setFlexWidth({ width: '30', mx: '2.5%' })}
    ${(props) => props.p25 && setFlexWidth({ width: '25', mx: '2.5%' })}
    ${(props) => props.p20 && setFlexWidth({ width: '20', mx: '2.5%' })}
    ${(props) => props.p15 && setFlexWidth({ width: '15', mx: '2.5%' })}
    //Border
    ${(props) => props.bd && setBorder()}
    ${(props) => props.bdtop && setBorder({ position: 'border-top' })}
    &__col--20 {
      flex: 0 0 20%;
      margin: 0 1.5%;
   }

   &__col--40 {
      flex: 0 0 40%;
      margin: 0 1.5%;
   }
`;
ListGroup.Item = ListGroupItem;

const ListGroupTitle = styled(Title)`
   font-weight: 400;
`;
ListGroup.Title = ListGroupTitle;

//Paragraph
const ListGroupParagraph = styled(Paragraph)``;
ListGroup.Paragraph = ListGroupParagraph;

//Span
const ListGroupSpan = styled(Span)``;
ListGroup.Span = ListGroupSpan;

//Button
const ListGroupButton = styled(Button)``;
ListGroup.Button = ListGroupButton;
