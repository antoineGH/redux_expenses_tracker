import React, { useState } from 'react'
import { useHistory } from 'react-router'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import requestLogin from '../../utils/requestLogin'
import { login } from '../../auth/authHook'
import { Form, Input, Button, Typography } from 'antd'
import './LoginForm.css'

export default function LoginForm() {
	const { Text } = Typography
	const [isDisabled, setIsDisabled] = useState(false)
	const history = useHistory()

	const regexPassword = /^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,24}$/
	const validationSchema = Yup.object({
		email: Yup.string()
			.min(6, 'Too Short')
			.max(40, 'Too Long')
			.email('Invalid Email')
			.required('Required'),
		password: Yup.string()
			.min(6, 'Too Short')
			.max(12, 'Too Long')
			.matches(
				regexPassword,
				'Password should be a mix of 6 characters and numbers'
			)
			.required('Required'),
	})

	const { handleSubmit, handleChange, handleBlur, values, touched, errors } =
		useFormik({
			initialValues: {
				email: '',
				password: '',
			},
			validationSchema,
			onSubmit(values) {
				handleLogin(values)
			},
		})

	const handleLogin = (values) => {
		setIsDisabled(true)
		const email = values.email
		const password = values.password
		requestLogin(email, password)
			.then((response) => {
				login(response)
				setIsDisabled(false)
			})
			.catch((error) => {
				console.log(error)
				alert('Wrong UserName/Password')
				setIsDisabled(false)
			})
	}

	return (
		<>
			<h1>Login</h1>
			<div className='container-form'>
				<Form onSubmit={handleSubmit} layout='vertical'>
					<Form.Item label='Email'>
						<Input
							id='email'
							name='email'
							type='text'
							placeholder='Email'
							className={
								errors.email && touched.email && 'error_field'
							}
							onBlur={handleBlur}
							value={values.email}
							onChange={handleChange}
						/>
						{errors.email && touched.email && (
							<div className='error_text'>{errors.email}</div>
						)}
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
						{errors.password && touched.password && (
							<div className='error_text'>{errors.password}</div>
						)}
					</Form.Item>
					<Form.Item>
						<Button
							onClick={() => handleSubmit()}
							type='primary'
							disabled={isDisabled}>
							Submit
						</Button>
					</Form.Item>
				</Form>
			</div>

			<div className='container-register'>
				<Text type='secondary'>Don't have an account yet ?</Text>
				<Button
					type='link'
					disabled={isDisabled}
					onClick={() => history.push('/register')}>
					Register
				</Button>
			</div>
		</>
	)
}
