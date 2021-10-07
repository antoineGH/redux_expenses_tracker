import { createSlice } from '@reduxjs/toolkit'
import { act } from 'react-dom/test-utils'

// Slice Reducer
////////////////////////////////

const initialValue = {
	value: [
		{ description: 'Clean', completed: true },
		{ description: 'Tidy', completed: false },
	],
}

export const todoSlice = createSlice({
	name: 'todos',
	initialState: initialValue,
	reducers: {
		addTodo: (state, action) => {
			state.value.push({ description: action.payload, completed: false })
		},
		deleteTodo: (state, action) => {
			state.value = state.value.filter(
				(todo) => todo.description !== action.payload
			)
		},
	},
})

export const { addTodo, deleteTodo } = todoSlice.actions

// Selectors
////////////////////////////////

export const selectTodos = (state) => state.todos.value

export default todoSlice.reducer
