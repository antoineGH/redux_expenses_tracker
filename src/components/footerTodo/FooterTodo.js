import React from 'react'
import { Layout, Typography } from 'antd'

export default function FooterTodo() {
	const { Text } = Typography
	const { Footer } = Layout
	return (
		<Footer>
			<Text type='secondary'>React Todo Project - Antoine RATAT</Text>
		</Footer>
	)
}
