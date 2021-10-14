import React, { useState, useEffect } from 'react'
import {
	loadUser,
	selectUser,
	selectUserIsLoading,
	selectUserHasError,
} from '../../features/user/userSlice'
import { useSelector, useDispatch } from 'react-redux'
import { Spin, Card, Typography, Button, Avatar } from 'antd'
import { LoadingOutlined, UserOutlined } from '@ant-design/icons'
import { Skeleton, Switch } from 'antd'
import {
	EditOutlined,
	EllipsisOutlined,
	SettingOutlined,
} from '@ant-design/icons'
import './UserForm.css'

export default function UserForm() {
	const [firstName, setFirstName] = useState('Antoine')
	const [lastName, setLastName] = useState('Ratat')
	const [email, setEmail] = useState('antoine.ratat@gmail.com')

	const dispatch = useDispatch()
	const isLoading = useSelector(selectUserIsLoading)
	// const isLoading = true
	const hasError = useSelector(selectUserHasError)

	const [isDisabled, setIsDisabled] = useState(false)
	const { Paragraph, Title, Text } = Typography
	const antIcon = <LoadingOutlined style={{ fontSize: 16 }} spin />
	const { Meta } = Card

	useEffect(() => {
		dispatch(loadUser())
	}, [dispatch])

	console.log(useSelector(selectUser))

	return (
		<>
			{hasError && (
				<>
					<p>Error Fetching the API.</p>
				</>
			)}

			<Card
				className='profile-picture-card'
				style={{ width: 350 }}
				cover={
					<Avatar shape='square' size={86} icon={<UserOutlined />} />
				}>
				<hr />
				<Skeleton loading={isLoading} active>
					<Title level={5} className='detail-title'>
						Details
					</Title>
					<div className='input-div'>
						<Text type='secondary'>First Name:</Text>
						<Paragraph
							editable={{
								onChange: setFirstName,
								maxLength: 50,
								autoSize: { maxRows: 1, minRows: 1 },
							}}>
							{firstName}
						</Paragraph>
					</div>
					<div className='input-div'>
						<Text type='secondary'>Last Name:</Text>
						<Paragraph
							editable={{
								onChange: setLastName,
								maxLength: 50,
								autoSize: { maxRows: 1, minRows: 1 },
							}}>
							{lastName}
						</Paragraph>
					</div>
					<div className='input-div'>
						<Text type='secondary'>Email:</Text>
						<Paragraph
							editable={{
								onChange: setEmail,
								maxLength: 50,
								autoSize: { maxRows: 2, minRows: 1 },
							}}>
							{email}
						</Paragraph>
					</div>
					<div>
						<Button
							type='primary'
							style={{ marginTop: '1rem' }}
							disabled={isDisabled}>
							Update{' '}
							{isDisabled && (
								<Spin size='small' indicator={antIcon} />
							)}
						</Button>
					</div>
				</Skeleton>
			</Card>
		</>
	)
}
