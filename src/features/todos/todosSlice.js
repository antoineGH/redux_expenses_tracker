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
	},
})

export const { addTodo } = todoSlice.actions

// Selectors
////////////////////////////////

export const selectTodos = (state) => state.todos.value

export default todoSlice.reducer
