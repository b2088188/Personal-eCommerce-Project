import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { CenterWrapper, ListGroup, Icon, Link as SLink } from '../design/components';
import { Done } from '@material-ui/icons';
const NavSteps = ({ step1, step2, step3, className }) => {
	const location = useLocation();
	return (
		<CenterWrapper width='70' className={className}>
			<ListGroup flexy='center' flexx='center'>
				<ListGroup.Item width='20' spacing='2.5' className='navsteps__item'>
					{step1 ? <Icon as={Done} /> : null}
					<SLink
						as={Link}
						to={step1 ? '/shipping' : location.pathname}
						modifiers={!step1 ? 'disabled' : null}
					>
						Shipping
					</SLink>
				</ListGroup.Item>
				<ListGroup.Item width='20' spacing='2.5' className='navsteps__item'>
					{step2 ? <Icon as={Done} /> : null}
					<SLink
						as={Link}
						to={step2 ? '/payment' : location.pathname}
						modifiers={!step2 ? 'disabled' : null}
					>
						Payment
					</SLink>
				</ListGroup.Item>
				<ListGroup.Item width='20' spacing='2.5' className='navsteps__item'>
					{step3 ? <Icon as={Done} /> : null}
					<SLink
						as={Link}
						to={step3 ? '/placeorder' : location.pathname}
						modifiers={!step3 ? 'disabled' : null}
					>
						Place Order
					</SLink>
				</ListGroup.Item>
			</ListGroup>
		</CenterWrapper>
	);
};

export default styled(NavSteps)`
	margin-bottom: 2rem;
	.navsteps {
		&__item {
			display: flex;
			align-items: center;
		}
	}
`;
