import React, { useEffect } from 'react';
import { useUserProfile, useUpdateUserData } from 'utils/user';
import { useForm } from 'react-hook-form';
import { FormContainer, Form, Row, Col, Title, Button, Span } from 'design/components';
import { Spinner, Message } from 'design/elements';
import Sidebar from 'layout/Sidebar';

const UserSettings = () => {
	const { userProfile, isIdle, isLoading, isSuccess } = useUserProfile();
	const { updateUserData } = useUpdateUserData();
	const { register, handleSubmit, errors, setValue, reset } = useForm();

	useEffect(() => {
		if (userProfile && isSuccess) {
			setValue('name', userProfile.name);
			setValue('email', userProfile.email);
		}
	}, [userProfile, isSuccess, setValue]);

	function onSubmit(values) {
		reset();
		updateUserData(values);
	}

	if (isIdle || isLoading)
		return (
			<Row>
				<Spinner modifiers='dark' />
			</Row>
		);
	if (isSuccess)
		return (
			<Row direction={{ tabport: 'column' }}>
				<Col width='3'>
					<Sidebar />
				</Col>
				<Col width='9'>
					{/*isMutating ? <Spinner modifiers='dark' /> : null*/}
					{/*statusAuth === 'rejected' ? <Message text={errorAuth} severity='error' /> : null*/}
					<FormContainer width={{ desktop: '50', tabport: '90' }} my='2'>
						<Title modifiers={['big', 'light']}>User Profile</Title>
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
								{errors.name ? <Span modifiers='danger'>{errors.name.message}</Span> : null}
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
								{errors.email ? (
									<Span modifiers='danger'>{errors.email.message}</Span>
								) : null}
							</Form.Group>
							<Button>Save Changes</Button>
						</Form>
					</FormContainer>
				</Col>
			</Row>
		);
};

export default UserSettings;
