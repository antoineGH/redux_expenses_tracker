import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectTodos, addTodo } from './todosSlice'
import './Todos.css'
import TodoForm from '../../components/todoForm/TodoForm'
import TodoList from '../../components/todoList/TodoList'

export default function Todos() {
	const todos = useSelector(selectTodos)
	const dispatch = useDispatch()

	const handleAddTodo = (addTodoValue) => {
		if (todos.some((todo) => todo.description === addTodoValue)) return
		dispatch(addTodo(addTodoValue))
	}

	return (
		<>
			<TodoForm handleAddTodo={handleAddTodo} />
			<TodoList todos={todos} />
		</>
	)
}
