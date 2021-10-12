import React, { useState } from 'react'
import { useHistory } from 'react-router'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import requestLogin from '../../utils/requestLogin'
import { login } from '../../auth/authHook'

export default function LoginForm() {
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
			<div>
				<h1>Login</h1>
				<form onSubmit={handleSubmit}>
					<input
						id='email'
						name='email'
						type='text'
						placeholder='Email'
						onBlur={handleBlur}
						value={values.email}
						onChange={handleChange}
						disabled={isDisabled}
					/>
					{errors.email && touched.email && (
						<div className='error_field'>{errors.email}</div>
					)}
					<input
						id='password'
						name='password'
						type='password'
						placeholder='Password'
						onBlur={handleBlur}
						value={values.password}
						onChange={handleChange}
					/>
					{errors.password && touched.password && (
						<div className='error_field'>{errors.password}</div>
					)}
					<button type='submit'>Login</button>
				</form>
			</div>
			<div>
				<button onClick={() => history.push('/register')}>
					Register
				</button>
			</div>
		</>
	)
}
