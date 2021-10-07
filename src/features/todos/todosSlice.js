import { createSlice } from '@reduxjs/toolkit'

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
		toggleCheck: (state, action) => {
			const indexObject = state.value.findIndex(
				(todo) => todo.description === action.payload
			)
			state.value[indexObject].completed =
				!state.value[indexObject].completed
		},
	},
})

export const { addTodo, deleteTodo, toggleCheck } = todoSlice.actions

// Selectors
////////////////////////////////

export const selectTodos = (state) => state.todos.value

export default todoSlice.reducer
