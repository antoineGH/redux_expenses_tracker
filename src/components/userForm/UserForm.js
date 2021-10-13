import React, { useState } from 'react'
import { Avatar } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { Card, Typography } from 'antd'
import './UserForm.css'

export default function UserForm() {
	const [firstName, setFirstName] = useState('Antoine')
	const [lastName, setLastName] = useState('Ratat')
	const [email, setEmail] = useState('antoine.ratat@gmail.com')
	const { Paragraph, Title, Text } = Typography
	return (
		<>
			<Card
				hoverable
				className='profile-picture-card'
				style={{ width: 300 }}
				cover={
					<Avatar shape='square' size={86} icon={<UserOutlined />} />
				}>
				<hr />
				<Title level={5} style={{ marginBottom: '1rem' }}>
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
							autoSize: { maxRows: 1, minRows: 1 },
						}}>
						{email}
					</Paragraph>
				</div>
			</Card>
		</>
	)
}
