import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Spin, Card, Typography, Button, Avatar, Input, Form } from 'antd'
import { LoadingOutlined, UserOutlined } from '@ant-design/icons'
import './UserForm.css'

export default function UserForm(props) {
	const { user, handleUpdateAccount, handleDeleteAccount, isDisabled } = props

	const { Title, Text } = Typography
	const antIcon = <LoadingOutlined style={{ fontSize: 16 }} spin />

	const regexPassword = /^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,24}$/
	const regexNoSpecial = /^[a-zA-Z. ]*$/
	const validationSchema = Yup.object({
		first_name: Yup.string()
			.min(2, 'Too Short')
			.max(12, 'Too Long')
			.matches(regexNoSpecial, 'No Special Character'),
		last_name: Yup.string()
			.min(2, 'Too Short')
			.max(12, 'Too Long')
			.matches(regexNoSpecial, 'No Special Character'),
		password: Yup.string()
			.min(6, 'Too Short')
			.max(12, 'Too Long')
			.matches(
				regexPassword,
				'Password should be a mix of 6 characters and numbers'
			),
		confirm_password: Yup.string()
			.min(6, 'Too Short')
			.max(12, 'Too Long')
			.oneOf([Yup.ref('password'), null], 'Password must match'),
	})

	const { handleSubmit, handleChange, handleBlur, values, touched, errors } =
		useFormik({
			initialValues: {
				first_name: user['first_name'],
				last_name: user['last_name'],
				password: '',
				confirm_password: '',
			},
			validationSchema,
			onSubmit(values) {
				const { first_name, last_name, password } = values
				handleUpdateAccount(first_name, last_name, password)
			},
		})

	return (
		<>
			<Card
				className='profile-picture-card'
				style={{ width: 350 }}
				cover={
					<Avatar shape='square' size={86} icon={<UserOutlined />} />
				}>
				<div>
					<Title level={5} className='username-title'>
						{user['first_name']} {user['last_name']}
					</Title>
				</div>
				<div className='username-email'>
					<Text strong>{user['email']}</Text>
				</div>
				<hr />
				<Title level={5} className='detail-title'>
					Update Details
				</Title>
				<div className='container-form'>
					<Form onSubmit={handleSubmit} layout='vertical'>
						<Form.Item label='First Name'>
							<Input
								id='first_name'
								name='first_name'
								type='text'
								placeholder='First Name'
								className={
									errors.first_name &&
									touched.first_name &&
									'error_field'
								}
								onBlur={handleBlur}
								value={values.first_name}
								onChange={handleChange}
							/>
							<div className='errors'>
								{errors.first_name && touched.first_name && (
									<Text type='danger'>
										{errors.first_name}
									</Text>
								)}
							</div>
						</Form.Item>
						<Form.Item label='Last Name'>
							<Input
								id='last_name'
								name='last_name'
								type='text'
								placeholder='Last Name'
								className={
									errors.last_name &&
									touched.last_name &&
									'error_field'
								}
								onBlur={handleBlur}
								value={values.last_name}
								onChange={handleChange}
							/>
							<div className='errors'>
								{errors.last_name && touched.last_name && (
									<Text type='danger'>
										{errors.last_name}
									</Text>
								)}
							</div>
						</Form.Item>
						<Form.Item label='Password'>
							<Input
								id='password'
								name='password'
								type='password'
								placeholder='Password'
								className={
									errors.password &&
									touched.password &&
									'error_field'
								}
								onBlur={handleBlur}
								value={values.password}
								onChange={handleChange}
							/>
							<div className='errors'>
								{errors.password && touched.password && (
									<Text type='danger'>{errors.password}</Text>
								)}
							</div>
						</Form.Item>
						<Form.Item label='Confirm Password'>
							<Input
								id='confirm_password'
								name='confirm_password'
								type='password'
								placeholder='Confirm Password'
								className={
									errors.confirm_password &&
									touched.confirm_password &&
									'error_field'
								}
								onBlur={handleBlur}
								value={values.confirm_password}
								onChange={handleChange}
							/>
							<div className='errors'>
								{errors.confirm_password &&
									touched.confirm_password && (
										<Text type='danger'>
											{errors.confirm_password}
										</Text>
									)}
							</div>
						</Form.Item>
						<Form.Item>
							<Button
								type='primary'
								onClick={() => handleSubmit()}
								style={{ marginTop: '1rem' }}
								disabled={isDisabled}>
								Update{' '}
								{isDisabled && (
									<Spin size='small' indicator={antIcon} />
								)}
							</Button>
						</Form.Item>
					</Form>
				</div>

				<div className='delete-account'>
					<Button type='link' onClick={handleDeleteAccount}>
						{' '}
						<Text type='secondary'>Delete my account</Text>
					</Button>
				</div>
			</Card>
		</>
	)
}
