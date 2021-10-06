import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectTodos } from './todosSlice'
import './Todos.css'
import TodoForm from '../../components/todoForm/TodoForm'
import TodoList from '../../components/todoList/TodoList'

export default function Todos() {
	const todos = useSelector(selectTodos)
	const dispatch = useDispatch()

	return (
		<>
			<TodoForm />
			<TodoList todos={todos} />
		</>
	)
}
