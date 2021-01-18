import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useUserState } from '../../stores/user/userStateContext';
import { useUserActions } from '../../stores/user/userActionContext';
import { useAuthState } from '../../stores/auth/authStateContext';
import { useAuthActions } from '../../stores/auth/authActionContext';
import { useForm } from 'react-hook-form';
import { FormContainer, Form, Row, Col } from '../../design/components';
import Sidebar from '../../layout/Sidebar';
import FormGroup from '../../utils/form/FormGroup';
import FormError from '../../utils/form/FormError';
import Message from '../../utils/Message';
import Spinner from '../../utils/Spinner';
import useFetch from '../../customhooks/useFetch';

const UserSettings = () => {
	const { userProfile, statusUserProfile, errorUserProfile } = useUserState();
	const { getUserProfile } = useUserActions();
	const { statusAuth, errorAuth } = useAuthState();
	const { updateUserData } = useAuthActions();
	const { register, handleSubmit, errors, setValue, reset } = useForm();
	useEffect(() => {
		getUserProfile();
	}, [getUserProfile]);
	useEffect(() => {
		if (userProfile && statusUserProfile === 'resolved') {
			setValue('name', userProfile.name);
			setValue('email', userProfile.email);
		}
	}, [userProfile, statusUserProfile, setValue]);

	function onSubmit(values) {
		reset();
		updateUserData(values);
	}
	if (statusUserProfile === 'idle' || statusUserProfile === 'pending')
		return <Spinner modifiers='dark' />;
	if (statusUserProfile === 'rejected' && errorUserProfile)
		return <Message text={errorUserProfile} severity='error' />;
	if (statusUserProfile === 'resolved')
		return (
			<>
				<Col width='3'>
					<Sidebar />
				</Col>
				<Col width='9'>
					{statusAuth === 'pending' ? <Spinner modifiers='dark' /> : null}
					{statusAuth === 'rejected' ? <Message text={errorAuth} severity='error' /> : null}
					<FormContainer>
						<Form.Title modifiers={['big', 'light']}>User Profile</Form.Title>
						<FormError errors={errors} />
						<Form onSubmit={handleSubmit(onSubmit)}>
							<Form.Group>
								<Form.Label>Name</Form.Label>
								<Form.Input
									name='name'
									type='text'
									ref={register({
										required: 'You must specify a name'
									})}
								/>
							</Form.Group>
							<Form.Group>
								<Form.Label>Email</Form.Label>
								<Form.Input
									name='email'
									type='text'
									ref={register({
										required: 'You must specify an email',
										pattern: {
											value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
											message: 'Invalid email address'
										}
									})}
								/>
							</Form.Group>
							<Form.Button>Save Changes</Form.Button>
						</Form>
					</FormContainer>
				</Col>
			</>
		);
};

export default UserSettings;
