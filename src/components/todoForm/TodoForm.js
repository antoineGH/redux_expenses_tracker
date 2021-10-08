import React, { useState } from 'react'

export default function TodoForm(props) {
	const { handleAddTodo } = props
	const [addTodoValue, setAddTodoValue] = useState('')

	const handleClick = () => {
		if (!addTodoValue) return
		handleAddTodo(addTodoValue)
		setAddTodoValue('')
	}

	return (
		<div>
			<input
				className='input-todo'
				aria-label='New Todo'
				placeholder='New Todo'
				value={addTodoValue}
				onChange={(e) => setAddTodoValue(e.target.value)}
			/>
			<button className='btn-addtodo' onClick={handleClick}>
				Add Todo
			</button>
		</div>
	)
}
