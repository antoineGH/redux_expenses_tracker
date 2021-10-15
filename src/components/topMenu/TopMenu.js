import React from 'react'
import { Col, Statistic, Button, Input } from 'antd'
import { FilterOutlined } from '@ant-design/icons'
import TodoForm from '../todoForm/TodoForm'

export default function TopMenu(props) {
	const { todos, handleAddTodo, isLoadingAddTodo } = props
	const { Search } = Input
	return (
		<>
			<Col span={3} className='col-stat'>
				<Statistic title='Current Todos' value={todos.length} />
			</Col>
			<Col span={8} className='col-add'>
				<TodoForm
					handleAddTodo={handleAddTodo}
					isLoadingAdd={isLoadingAddTodo}
				/>
			</Col>
			<Col span={1} className='col-filter'>
				<Button
					className='btn-filter'
					size='normal'
					icon={<FilterOutlined />}></Button>
			</Col>
			<Col span={6} className='col-search'>
				{' '}
				<Search
					placeholder='Search Todo'
					// onSearch={onSearch}
					enterButton
				/>
			</Col>
		</>
	)
}
