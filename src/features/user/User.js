import React, { useEffect } from 'react'
import {
	loadUser,
	selectUser,
	selectUserIsLoading,
	selectUserHasError,
} from './userSlice'
import { useSelector, useDispatch } from 'react-redux'
import UserForm from '../../components/userForm/UserForm'
import { Spin, Card, Typography, Button, Avatar, Skeleton } from 'antd'
import { LoadingOutlined, UserOutlined } from '@ant-design/icons'

export default function User() {
	const dispatch = useDispatch()
	const isLoading = useSelector(selectUserIsLoading)
	const hasError = useSelector(selectUserHasError)
	const user = useSelector(selectUser)

	const { Paragraph, Title, Text } = Typography

	useEffect(() => {
		dispatch(loadUser())
	}, [dispatch])

	return (
		<>
			{hasError && (
				<>
					<p>Error Fetching the API.</p>
				</>
			)}
			{isLoading && (
				<Card
					className='profile-picture-card'
					style={{ width: 350 }}
					cover={
						<Avatar
							shape='square'
							size={86}
							icon={<UserOutlined />}
						/>
					}>
					<hr />
					<Skeleton loading={isLoading} active></Skeleton>
				</Card>
			)}
			{!isLoading && user !== undefined && (
				<UserForm isLoading={isLoading} user={user} />
			)}
		</>
	)
}
