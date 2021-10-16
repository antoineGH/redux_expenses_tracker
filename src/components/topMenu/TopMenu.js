import React from 'react'
import { Col, Statistic, Button, Input, Skeleton } from 'antd'
import { FilterOutlined } from '@ant-design/icons'
import TodoForm from '../todoForm/TodoForm'

export default function TopMenu(props) {
	const { todos, sort, setSort, handleAddTodo, isLoadingAddTodo } = props
	const { Search } = Input

	return (
		<>
			<Col span={3} className='col-stat'>
				{/* {todos ? ( */}
				<Statistic title='Current Todos' value={todos.length} />
				{/* ) : ( */}
				{/* <Skeleton.Input style={{ width: 121.38 }} active /> */}
				{/* )} */}
			</Col>
			<Col span={9} className='col-add'>
				{/* {todos ? ( */}
				<TodoForm
					handleAddTodo={handleAddTodo}
					isLoadingAdd={isLoadingAddTodo}
				/>
				{/* ) : ( */}
				{/* <Skeleton.Input style={{ width: 305 }} active /> */}
				{/* )} */}
			</Col>
			<Col span={1} className='col-filter'>
				{/* {todos ? ( */}
				<Button
					className='btn-filter'
					size='normal'
					icon={<FilterOutlined />}
					onClick={() => setSort(!sort)}></Button>
				{/* ) : ( */}
				{/* <Skeleton.Avatar active shape={'square'} /> */}
				{/* )} */}
			</Col>
			<Col span={6} className='col-search'>
				{' '}
				{/* {todos ? ( */}
				<Search
					placeholder='Search Todo'
					// onSearch={onSearch}
					enterButton
				/>
				{/* ) : ( */}
				{/* <Skeleton.Input style={{ width: 242 }} active /> */}
				{/* )} */}
			</Col>
		</>
	)
}
