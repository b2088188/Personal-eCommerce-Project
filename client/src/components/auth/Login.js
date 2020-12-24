import React, {useEffect, useContext, useRef} from 'react';
import {Link} from 'react-router-dom';
import AuthContext from '../../stores/auth/authContext';
import { useForm } from 'react-hook-form';
import FormGroup from '../../utils/form/FormGroup';
import FormError from '../../utils/form/FormError';
import Message from '../../utils/Message';
import Spinner from '../../utils/Spinner';

const Login = ({
    location,
    history
}) => {
    const { register, handleSubmit, watch, errors } = useForm();
    const {authHandle, isAuth, loading, error} = useContext(AuthContext);
   useEffect(() => {
      if(isAuth)
        history.push(location.state?.from || '/');
   }, [isAuth, history, location.state])

   function onSubmit(values) {
   	authHandle('login')(values);
   }

    if(error)
        return <Message alert = {error} severity = 'error' />

    return (
        <div className = "form-container">
      	<div className = "form__formbox">
      		<h1 className = "form__title">Login</h1>
            {loading && <Spinner />}
            <FormError errors = {errors} />
      		<form className = "form__body" onSubmit = {handleSubmit(onSubmit)}>
      			<FormGroup name = 'email' type = 'text' register = {register({
      				required: 'Please enter your email',
	               pattern: {
	                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
	                        message: 'Invalid email address'
	               }
      			})} />
      			<FormGroup name = 'password' type = 'password' register = {register({
      				required: 'Please enter your password'
      			})} />
      			<button className = "btn--default form__submit">
      				Login
      			</button>
      		</form>
            <div className = "form__footer">
                <span className = "form__label form__label--footer">New Customer?</span>
                <Link to = '/signup' className = "form__link">Register</Link>
            </div>
      	</div>
      </div>
    )
}

export default Login;

// {{pathname: '/signup', state: { prevPath: location.pathname }}}