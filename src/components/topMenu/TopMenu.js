import React from 'react'
import { Col, Statistic, Button, Input, Skeleton } from 'antd'
import { FilterOutlined } from '@ant-design/icons'
import TodoForm from '../todoForm/TodoForm'

export default function TopMenu(props) {
	const { todos, handleAddTodo, isLoadingAddTodo } = props
	const { Search } = Input

	return (
		<>
			<Col span={3} className='col-stat'>
				{todos.length >= 1 ? (
					<Statistic title='Current Todos' value={todos.length} />
				) : (
					<Skeleton.Input style={{ width: 121.38 }} active />
				)}
			</Col>
			<Col span={9} className='col-add'>
				{todos.length >= 1 ? (
					<TodoForm
						handleAddTodo={handleAddTodo}
						isLoadingAdd={isLoadingAddTodo}
					/>
				) : (
					<Skeleton.Input style={{ width: 305 }} active />
				)}
			</Col>
			<Col span={1} className='col-filter'>
				{todos.length >= 1 ? (
					<Button
						className='btn-filter'
						size='normal'
						icon={<FilterOutlined />}></Button>
				) : (
					<Skeleton.Avatar active shape={'square'} />
				)}
			</Col>
			<Col span={6} className='col-search'>
				{' '}
				{todos.length >= 1 ? (
					<Search
						placeholder='Search Todo'
						// onSearch={onSearch}
						enterButton
					/>
				) : (
					<Skeleton.Input style={{ width: 242 }} active />
				)}
			</Col>
		</>
	)
}
