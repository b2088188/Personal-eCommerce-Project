import React, {useEffect, useContext, useRef} from 'react';
import { useForm } from 'react-hook-form';
import AuthContext from '../../stores/auth/authContext';
import FormGroup from '../../utils/form/FormGroup';
import FormError from '../../utils/form/FormError';


// {{pathname: '/signup', state: { prevPath: location.pathname }}}
const Signup = ({
	history,
	location
}) => {
	const {isAuth, authHandle} = useContext(AuthContext);
    const { register, handleSubmit, watch, errors } = useForm();
    const password = useRef({});
    password.current = watch('password', '');
    
    useEffect(() => {
      if(isAuth)
        history.push(location.state?.from || '/');
   }, [isAuth, history, location.state])

   function onSubmit(values) {
   	authHandle('signup')(values);
   }

    return (
        <div className = "form-container">
      	<div className = "form__formbox">
      		<h1 className = "form__title">Sign Up</h1>
      		<FormError errors = {errors} />
      		<form className = "form__body" onSubmit = {handleSubmit(onSubmit)}>
      			<FormGroup name = 'name' type = 'text' register = {register({
      				required: 'You must specify a name'
      			})} />
      			<FormGroup name = 'email' type = 'text' register = {register({
      				required: 'You must specify an email',
	               pattern: {
	                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
	                        message: 'Invalid email address'
	               }
      			})} />
      			<FormGroup name = 'password' type = 'password' register = {register({
      				required: 'You must specify a password',
	                minLength: [8, 'Password must have at least 8 characters']
      			})} />
      			<FormGroup name = 'passwordConfirm' type = 'password' register = {register({
      				required: 'You must confirm your password',
	               	validate: value => value === password.current || 'The passwords do no match, please try again'
      			})} />
      			<button className = "btn--default form__submit">
      				Sign Up
      			</button>
      		</form>
      	</div>
      </div>
    )
}

export default Signup;