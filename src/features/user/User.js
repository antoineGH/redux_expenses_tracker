import React, { useState, useEffect } from 'react'
import {
	loadUser,
	selectUser,
	selectUserIsLoading,
	selectUserHasError,
} from './userSlice'
import { useSelector, useDispatch } from 'react-redux'
import UserForm from '../../components/userForm/UserForm'
import { Card, Skeleton, Avatar } from 'antd'
import { UserOutlined } from '@ant-design/icons'

export default function User() {
	const dispatch = useDispatch()
	const isLoading = useSelector(selectUserIsLoading)
	const hasError = useSelector(selectUserHasError)
	const user = useSelector(selectUser)

	const [isDisabled, setIsDisabled] = useState(false)

	useEffect(() => {
		dispatch(loadUser())
	}, [dispatch])

	const handleUpdateAccount = (firstName, lastName, password) => {
		console.log('Update Account')
		firstName = firstName.toLowerCase()
		lastName = lastName.toLowerCase()

		// setIsDisabled(true)
		// dispatch middleware async request
		// update store
		// update API
		// success setIsDisabled(false)
		// error setIsDisabled(false)
	}

	const handleDeleteAccount = () => {
		setIsDisabled(true)
		setIsDisabled(false)
		console.log('Delete Account')
	}

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
				<UserForm
					user={user}
					handleUpdateAccount={handleUpdateAccount}
					handleDeleteAccount={handleDeleteAccount}
					isDisabled={isDisabled}
				/>
			)}
		</>
	)
}
