import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

// Slice Reducer
////////////////////////////////

const initialValue = {
	value: [],
	isLoading: false,
	hasError: false,
}

export const loadTodos = createAsyncThunk(
	'todos/getAllTodos',
	async (number = 10) => {
		const data = await fetch(`http://127.0.0.1:5000/api/todos/${number}`)
		const json = await data.json()
		return json
	}
)

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
	extraReducers: {
		[loadTodos.pending]: (state) => {
			state.isLoading = true
			state.hasError = false
		},
		[loadTodos.fulfilled]: (state, action) => {
			state.value = action.payload
			state.isLoading = false
			state.hasError = false
		},
		[loadTodos.rejected]: (state) => {
			state.isLoading = false
			state.hasError = true
		},
	},
})

export const { addTodo, deleteTodo, toggleCheck } = todoSlice.actions

// Selectors
////////////////////////////////

export const selectTodos = (state) => state.todos.value
export const selectIsLoading = (state) => state.todos.isLoading
export const selectHasError = (state) => state.todos.hasError
export default todoSlice.reducer
