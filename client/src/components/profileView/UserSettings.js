import './profileview.scss';
import React, {useEffect, useContext, useRef} from 'react';
import {Link} from 'react-router-dom';
import UserContext from '../../stores/user/userContext';
import { useForm } from 'react-hook-form';
import Sidebar from '../../layout/Sidebar';
import FormGroup from '../../utils/form/FormGroup';
import FormError from '../../utils/form/FormError';
import Message from '../../utils/Message';
import Spinner from '../../utils/Spinner';
 

const UserSettings = () => {
	const {user, loading, error, getUserProfile, updateUserProfile} = useContext(UserContext);
	const { register, handleSubmit, errors, setValue } = useForm();
    
    useEffect(() => {
      getUserProfile();
    }, [getUserProfile])

   

   function onSubmit(values) {
   	updateUserProfile(values);
   }

    if(loading)
    	return <Spinner />
    if(error)
    	return <Message />

	return (
		<div className="container">			
		<div className = 'profile-view'>
		<div className = 'profile-view__nav'>
			<Sidebar />
		</div>
		<div className = 'profile-view__container'>			
     <div className = "form-container profile-view__form">
      	<div className = "form__formbox">
      		<h1 className = "form__title">User Profile</h1>
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
      			<button className = "btn--default form__submit">
      				Save Changes
      			</button>
      		</form>
      	</div>
      </div>
		</div>			
	</div>
		</div>
		)
}

export default UserSettings;