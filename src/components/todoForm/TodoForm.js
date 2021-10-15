import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Spin, Form, Input, Button, Typography, Switch } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import './TodoForm.css'

export default function TodoForm(props) {
	const { isLoadingAdd, handleAddTodo } = props
	const { Text } = Typography
	const antIcon = <LoadingOutlined style={{ fontSize: 16 }} spin />

	const validationSchema = Yup.object({
		todo_description: Yup.string().min(3, 'Too Short').max(200, 'Too Long'),
		completed: Yup.boolean(),
	})

	const [isCompleted, setIsCompleted] = useState(false)

	const { handleSubmit, handleChange, handleBlur, values, touched, errors } =
		useFormik({
			initialValues: {
				todo_description: '',
			},
			validationSchema,
			onSubmit(values) {
				const { todo_description } = values
				handleAddTodo(todo_description, isCompleted)
				values.todo_description = ''
				setIsCompleted(false)
			},
		})

	return (
		<>
			<div className='container-todoform'>
				<Form onSubmit={handleSubmit} layout='inline'>
					<Form.Item label='Todo Description'>
						<Input
							id='todo_description'
							name='todo_description'
							type='text'
							placeholder='Todo Description'
							className={
								errors.todo_description &&
								touched.todo_description &&
								'error_field'
							}
							onBlur={handleBlur}
							value={values.todo_description}
							onChange={handleChange}
						/>
					</Form.Item>
					<Form.Item>
						<Switch
							id='completed'
							name='completed'
							type='text'
							onChange={() => setIsCompleted(!isCompleted)}
							checked={isCompleted}
							loading={isLoadingAdd}
						/>
					</Form.Item>
					<Form.Item>
						<Button
							type='primary'
							onClick={() => handleSubmit()}
							disabled={isLoadingAdd}>
							Add{' '}
							{isLoadingAdd && (
								<Spin size='small' indicator={antIcon} />
							)}
						</Button>
					</Form.Item>
				</Form>
			</div>
			<div className='errors'>
				{errors.todo_description && touched.todo_description && (
					<Text type='danger'>{errors.todo_description}</Text>
				)}
			</div>
		</>
	)
}
