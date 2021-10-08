import React from 'react'
import Todo from '../todo/Todo'
import './TodoList.css'

export default function TodoList(props) {
	const { todos, handleDeleteTodo, handleToggleTodo } = props
	return (
		<div className='container-todolist'>
			{todos.map((todo) => {
				return (
					<Todo
						key={todo.description}
						todo={todo}
						handleDeleteTodo={handleDeleteTodo}
						handleToggleTodo={handleToggleTodo}
					/>
				)
			})}
		</div>
	)
}
