import React, {useEffect, useRef} from 'react';
import {Link} from 'react-router-dom';
import {useUserState} from '../../stores/user/userStateContext';
import {useUserActions} from '../../stores/user/userActionContext';
import { useForm } from 'react-hook-form';
import {Container, FormContainer, Form, Row, Col} from '../../design/components';
import Sidebar from '../../layout/Sidebar';
import FormGroup from '../../utils/form/FormGroup';
import FormError from '../../utils/form/FormError';
import Message from '../../utils/Message';
import Spinner from '../../utils/Spinner';
 import axios from 'axios';


const UserSettings = () => {
	const {user, statusUser, errorUser} = useUserState();
	const {userHandle} = useUserActions();
	const { register, handleSubmit, errors, setValue, reset } = useForm();
    useEffect(() => {
      userHandle(axios.get('/api/v1/users/profile'))
    }, [userHandle])
    useEffect(() => {    	
    if (user) {
      setValue('name', user.name)
      setValue('email', user.email)
    }
  }, [user]);

   function onSubmit(values) {
   	reset();
   	userHandle(axios.patch('/api/v1/users/profile', values))
   }

    if(statusUser === 'idle' || statusUser === 'pending')
    	return <Spinner />
    if(statusUser === 'rejected' && errorUser)
    	return <Message alert = {errorUser} severity = 'error' />
    if(statusUser === 'resolved')
	return (
		<Container>			
		<Row>
		<Col col_3>
			<Sidebar />
		</Col>
		<Col col_9>			
     <FormContainer>
      		<Form.Title modifiers = {['big', 'light']}>User Profile</Form.Title>
      		 <FormError errors = {errors} />
      		<Form onSubmit = {handleSubmit(onSubmit)}>
      		<Form.Group>
      			<Form.Label>Name</Form.Label>
      			<Form.Input name = 'name' type = 'text' ref = {register({
	      				required: 'You must specify a name'
	      			})} />
      		</Form.Group>
      		<Form.Group>
      			<Form.Label>Email</Form.Label>
      			<Form.Input name = 'email' type = 'text' ref = {register({
      				required: 'You must specify an email',
	               pattern: {
	                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
	                        message: 'Invalid email address'
	               }
      			})}  />
      		</Form.Group>
      			<Form.Button>
      				Save Changes
      			</Form.Button>
      		</Form>      		
      </FormContainer>
		</Col>			
	</Row>
		</Container>
		)
}




export default UserSettings;