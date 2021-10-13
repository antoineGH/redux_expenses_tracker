import React from 'react'
import { logout } from '../../auth/authHook'
import { useHistory } from 'react-router'
import { Layout } from 'antd'
import { Avatar, Typography, Menu, Dropdown } from 'antd'
import {
	UserOutlined,
	LogoutOutlined,
	HomeOutlined,
	LoginOutlined,
} from '@ant-design/icons'
import {} from 'antd'
import './Navbar.css'

export default function Navbar(props) {
	const { logged, payload } = props
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
								{logged
									? `${payload.first_name} ${payload.last_name}`
									: 'Not Connected'}
							</Text>
							<Avatar shape='square' icon={<UserOutlined />} />
						</span>
					</Dropdown>
				</>
			</Header>
		</>
	)
}
