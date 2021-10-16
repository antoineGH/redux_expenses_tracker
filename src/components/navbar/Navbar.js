import React from 'react'
import { logout } from '../../auth/authHook'
import { useHistory } from 'react-router'
import { Layout } from 'antd'
import { Avatar, Typography, Menu, Dropdown, Skeleton } from 'antd'
import {
	UserOutlined,
	LogoutOutlined,
	HomeOutlined,
	LoginOutlined,
} from '@ant-design/icons'
import {} from 'antd'
import './Navbar.css'

export default function Navbar(props) {
	const { logged, user } = props

	const history = useHistory()
	const { Header } = Layout
	const { Text } = Typography

	const menu_auth = (
		<Menu className='menu-navbar'>
			<Menu.Item
				onClick={() => history.push('/')}
				className='submenu-navbar'
				key='1'
				icon={<HomeOutlined />}>
				Home
			</Menu.Item>
			<Menu.Item
				onClick={() => history.push('/user')}
				className='submenu-navbar'
				key='2'
				icon={<UserOutlined />}>
				Edit User
			</Menu.Item>
			<Menu.Divider />
			<Menu.Item
				onClick={logout}
				className='submenu-navbar'
				key='3'
				icon={<LogoutOutlined />}>
				Logout
			</Menu.Item>
		</Menu>
	)

	const menu_unauth = (
		<Menu className='menu-navbar'>
			<Menu.Item
				onClick={() => history.push('/login')}
				className='submenu-navbar'
				key='1'
				icon={<LoginOutlined />}>
				Login
			</Menu.Item>
			<Menu.Divider />
			<Menu.Item
				onClick={() => history.push('/register')}
				className='submenu-navbar'
				key='2'
				icon={<UserOutlined />}>
				Register
			</Menu.Item>
		</Menu>
	)

	return (
		<>
			<Header>
				<>
					<Dropdown overlay={logged ? menu_auth : menu_unauth}>
						<span className='container-avatar'>
							<Text className='avatar-username' strong>
								{logged ? (
									user ? (
										`${user['first_name']} ${user['last_name']}`
									) : (
										<Skeleton.Input
											style={{
												width: 120,
												height: 20,
												marginTop: 22,
											}}
											active
											size={'default'}
										/>
									)
								) : (
									'Not Connected'
								)}
							</Text>
							{logged ? (
								user ? (
									<Avatar
										shape='square'
										icon={<UserOutlined />}
									/>
								) : (
									<Skeleton.Input
										style={{
											width: 32,
											height: 32,
											marginTop: 16,
											marginRight: 24,
										}}
										active
										size={'default'}
									/>
								)
							) : (
								<Avatar
									shape='square'
									icon={<UserOutlined />}
								/>
							)}
						</span>
					</Dropdown>
				</>
			</Header>
		</>
	)
}
