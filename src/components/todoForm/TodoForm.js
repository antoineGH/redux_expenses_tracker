import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Spin, Form, Input, Button, Typography, Switch } from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'

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
			<Form onSubmit={handleSubmit} layout='inline'>
				<Form.Item className='form-item'>
					<Input
						id='todo_description'
						name='todo_description'
						type='text'
						placeholder='Add Todo'
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
				<Form.Item className='form-item'>
					<Switch
						id='completed'
						name='completed'
						type='text'
						onChange={() => setIsCompleted(!isCompleted)}
						checked={isCompleted}
						loading={isLoadingAdd}
					/>
				</Form.Item>
				<Form.Item className='form-item'>
					<Button
						type='primary'
						onClick={() => handleSubmit()}
						icon={<PlusOutlined style={{ fontSize: '.8rem' }} />}
						disabled={isLoadingAdd}>
						Add
						{isLoadingAdd && (
							<Spin size='small' indicator={antIcon} />
						)}
					</Button>
				</Form.Item>
			</Form>

			<div className='add-errors'>
				{errors.todo_description && touched.todo_description && (
					<Text type='danger'>{errors.todo_description}</Text>
				)}
			</div>
		</>
	)
}
