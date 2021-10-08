import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectTodos, addTodo, deleteTodo, toggleCheck } from './todosSlice'
import './Todos.css'
import TodoForm from '../../components/todoForm/TodoForm'
import TodoList from '../../components/todoList/TodoList'

export default function Todos() {
	const todos = useSelector(selectTodos)
	const dispatch = useDispatch()

	const handleAddTodo = (addTodoDesc) => {
		if (todos.some((todo) => todo.description === addTodoDesc)) return
		dispatch(addTodo(addTodoDesc))
	}

	const handleDeleteTodo = (deleteTodoDesc) => {
		dispatch(deleteTodo(deleteTodoDesc))
	}

	const handleToggleTodo = (toggleTodoDesc) => {
		dispatch(toggleCheck(toggleTodoDesc))
	}

	return (
		<>
			<TodoForm handleAddTodo={handleAddTodo} />
			<TodoList
				todos={todos}
				handleDeleteTodo={handleDeleteTodo}
				handleToggleTodo={handleToggleTodo}
			/>
		</>
	)
}
