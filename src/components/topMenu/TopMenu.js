import React from 'react'
import TodoForm from '../todoForm/TodoForm'
import { Col, Statistic, Button, Input, Menu, Dropdown, Row } from 'antd'
import {
	FilterOutlined,
	CaretUpOutlined,
	CaretDownOutlined,
} from '@ant-design/icons'
import './TopMenu.css'

export default function TopMenu(props) {
	const {
		todos,
		sortBy,
		setSortBy,
		sort,
		setSort,
		handleAddTodo,
		isLoadingAddTodo,
	} = props
	const { Search } = Input

	const menu = (
		<Menu>
			<Menu.Item key='1' onClick={() => setSortBy('Date')}>
				Date
			</Menu.Item>
			<Menu.Item key='2' onClick={() => setSortBy('Status')}>
				Status
			</Menu.Item>
		</Menu>
	)

	const sortStatus = () => {
		if (sort && sortBy === 'Status') return 'Completed'
		if (!sort && sortBy === 'Status') return 'Not Completed'
		if (sort && sortBy === 'Date') return 'Newest'
		return 'Oldest'
	}

	return (
		<>
			<Col span={3} className='col-stat'>
				<Statistic title='Current Todos' value={todos.length} />
			</Col>
			{/* <Col span={9} className='col-add'>
				<TodoForm
					handleAddTodo={handleAddTodo}
					isLoadingAdd={isLoadingAddTodo}
				/>
			</Col> */}
			<Row>
				<Col>
					<Dropdown overlay={menu} placement='bottomCenter' arrow>
						<Button>
							<FilterOutlined />
							Sort By {sortBy}
						</Button>
					</Dropdown>
				</Col>
				<Col>
					<Button onClick={() => setSort(!sort)}>
						{sort ? (
							<>
								{sortStatus()} <CaretDownOutlined />
							</>
						) : (
							<>
								{sortStatus()}
								<CaretUpOutlined />
							</>
						)}
					</Button>
				</Col>
			</Row>
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
