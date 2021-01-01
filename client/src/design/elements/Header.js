import styled from 'styled-components';
import {colorGrey} from '../utils';
import {Link} from '../components';

const Header = styled.header`
	background: ${colorGrey.greydark1};
    height: 7rem;

    .container {
        width: 70%;
        height: 100%;
        margin: auto;
        display: flex;
        align-items: center;
        font-size: 1.7rem;
    }


    &__linkhome {
        color: #fff;
        margin-right: auto;
        font-weight: 300;
    }

    &__linkcart {
        color: var(--color-grey-light-4);

        &:hover {
            color: #fff;
        }
    }

    &__signin {
        margin-left: 1rem;
        color: var(--color-grey-light-4);

        &:hover {
            color: #fff;
        }
    }

    &__text {
        margin-left: .5rem;
    }
`

export default Header;