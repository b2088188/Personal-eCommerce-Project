import styled  from 'styled-components';	
import {Link} from '../components/Link';
import {Span} from '../components';
import {Title} from '../components/Title';
import {applyStyleModifiers} from 'styled-components-modifiers';



const CARDLINK_MODIFIERS = {
	image: () => `
	width: 100%;
	height: 20rem;
	border: solid .1rem var(--color-grey-light-4);
	`,
	name: () => `
      color: var(--color-grey-dark-1);
      font-size: 1.5rem;
	`
}

export const Card = styled.div`
		flex: 0 0 20%;
		margin: 1rem 2.5%;
		padding: 1rem;
		display: flex;
		flex-direction: column;
		border: solid .1rem var(--color-grey-dark-3);

	.details{
		padding: 1.25rem;
	}
	.rating{
		margin-top: 1rem;
		display: flex;
		align-items: center;
	}

`;

const CardLink = styled(Link)`	
	  ${applyStyleModifiers(CARDLINK_MODIFIERS)}
`;
Card.Link = CardLink;

const CardSpan = styled(Span)`
	margin-left: .5rem;
	font-size: 1.4rem;	
`
Card.Span = CardSpan;


const CardTitle = styled(Title)`
	padding: 1rem 0;
`
Card.Title = CardTitle;