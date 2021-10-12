import React, { useState } from 'react'
import { useHistory } from 'react-router'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import createUser from '../../utils/createUser'

export default function RegisterForm() {
	const [isDisabled, setIsDisabled] = useState(false)
	const history = useHistory()

	const regexPassword = /^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,24}$/
	const regexNoSpecial = /^[a-zA-Z. ]*$/
	const validationSchema = Yup.object({
		first_name: Yup.string()
			.min(2, 'Too Short')
			.max(12, 'Too Long')
			.matches(regexNoSpecial, 'No Special Character')
			.required('Required'),
		last_name: Yup.string()
			.min(2, 'Too Short')
			.max(12, 'Too Long')
			.matches(regexNoSpecial, 'No Special Character')
			.required('Required'),
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
		confirm_password: Yup.string()
			.min(6, 'Too Short')
			.max(12, 'Too Long')
			.oneOf([Yup.ref('password'), null], 'Password must match')
			.required('Required'),
	})

	const { handleSubmit, handleChange, handleBlur, values, touched, errors } =
		useFormik({
			initialValues: {
				first_name: '',
				last_name: '',
				email: '',
				password: '',
				confirm_password: '',
			},
			validationSchema,
			onSubmit(values) {
				handleRegister(values)
			},
		})

	const handleRegister = (values) => {
		setIsDisabled(true)
		const email = values.email.toLowerCase()
		const password = values.password
		const first_name = values.first_name.toLowerCase()
		const last_name = values.last_name.toLowerCase()
		createUser(email, password, first_name, last_name)
			.then((response) => {
				console.log(response)
				history.push('/login')
				setIsDisabled(false)
			})
			.catch((error) => {
				console.log(error)
				setIsDisabled(false)
			})
	}

	return (
		<>
			<div>
				<h1>Register</h1>
				<form onSubmit={handleSubmit}>
					<input
						id='email'
						name='email'
						type='text'
						placeholder='Email'
						onBlur={handleBlur}
						value={values.email}
						onChange={handleChange}
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
					<input
						id='confirm_password'
						name='confirm_password'
						type='password'
						placeholder='Confirm Password'
						onBlur={handleBlur}
						value={values.confirm_password}
						onChange={handleChange}
					/>
					<input
						id='first_name'
						name='first_name'
						type='text'
						placeholder='First Name'
						onBlur={handleBlur}
						value={values.first_name}
						onChange={handleChange}
					/>
					{errors.first_name && touched.first_name && (
						<div className='error_field'>{errors.first_name}</div>
					)}
					<input
						id='last_name'
						name='last_name'
						type='text'
						placeholder='Last Name'
						onBlur={handleBlur}
						value={values.last_name}
						onChange={handleChange}
					/>
					{errors.last_name && touched.last_name && (
						<div className='error_field'>{errors.last_name}</div>
					)}
					<button type='submit' disabled={isDisabled}>
						Register
					</button>
				</form>
				<button onClick={() => history.push('/login')}>Login</button>
			</div>
		</>
	)
}
