import styled from 'styled-components';
import {applyStyleModifiers} from 'styled-components-modifiers';
import {colorGrey, setFlex} from '../utils';
import {Title} from '../components/Title';
import {Button} from '../components/Button';
import {Span} from '../components/Span';
import {Link} from '../components/Link';


export const Form = styled.form`
	flex: 0 0 50%;
    display: flex;
    flex-direction: column;
.form {    


    &__group {
        display: flex;
        flex-direction: column;
        margin: 1rem 0;
        &--radio{
            flex-direction: row;
            align-items:center;
        }
    }


    &__subtitle{
        font-size: 2rem;
        font-weight: 300;
    }

    &__label {
        font-size: 1.6rem;
        font-weight: 300;
        margin-bottom: 1rem;

        &--footer {
            margin-bottom: 0;
            margin-right: 1rem;
        }
    }


    
}
`

export const FormGroup = styled.div`
    margin-bottom: 1rem;
    ${setFlex({direction: 'column'})}
`;
Form.Group = FormGroup;

export const Input = styled.input`
		padding: 1rem;
        font-size: 1.7rem;
        font-family: inherit;
`

export const Select = styled.select`
        padding: 1rem;
        font-size: 1.5rem;
        font-weight: 350;
        font-family: inherit;
        border: none;
        background: ${colorGrey.light2};
        &:focus{
            outline:none;
        }
`;



//Form Title
const FormTitle = styled(Title)`
	margin-bottom: .5rem;
	`;
Form.Title = FormTitle;

//Form Label
const FORMLABEL_MODIFIERS = {
    footer: () => `
      margin-bottom: 0;
      margin-right: 1rem;
    `
}
const FormLabel = styled.label`
	    font-size: 1.7rem;
        font-weight: 300;
        margin-bottom: 1rem;
        ${applyStyleModifiers(FORMLABEL_MODIFIERS)}
`
Form.Label = FormLabel;

//Form Input
const FORMINPUT_MODIFIERS = {
    radio: () =>`
    &:focus {
            outline: none;
        }
    `
}
const FormInput = styled(Input)`	    
        color: ${colorGrey.dark2};
        background: ${colorGrey.light2};
        border: ${colorGrey.dark2};
        margin-bottom: 1rem;
        &:focus {
            outline: solid .2rem ${colorGrey.light4};
        }
        ${applyStyleModifiers(FORMINPUT_MODIFIERS)}
`;
Form.Input = FormInput;

//Form Button
const FormButton = styled(Button)`
    
`;
Form.Button = FormButton;

//Form Footer
const FormFooter = styled.div`
    ${setFlex({y: 'center'})}
    margin-top: 1rem;
`
Form.Footer = FormFooter;

//Form Link
const FormLink = styled(Link)`
        font-size: 1.7rem;
        transition: text-decoration .25s;
        &:hover {
            text-decoration: underline;
        }
`
Form.Link = FormLink;

//Form Radio Group
const FormRadioGroup = styled.div`
    flex-direction: row;
    align-items:center;
`;
Form.RadioGroup = FormRadioGroup;