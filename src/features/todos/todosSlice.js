import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { authFetch } from '../../auth/authHook'

// Slice Reducer
////////////////////////////////

const initialValue = {
	value: [],
	isLoading: false,
	hasError: false,
}

export const loadTodos = createAsyncThunk('todos/getAllTodos', async () => {
	const data = await authFetch(
		`https://flask-todoapp-api.herokuapp.com/api/todos`
	)
	const json = await data.json()
	return json
})

export const todoSlice = createSlice({
	name: 'todos',
	initialState: initialValue,
	reducers: {
		addTodo: (state, action) => {
			state.value.push({
				todo_id: 5, //To Change with MiddleWare to return newly create todoID in payload
				todo_description: action.payload,
				completed: false,
			})
		},
		deleteTodo: (state, action) => {
			state.value = state.value.filter(
				(todo) => todo.todo_id !== action.payload
			)
		},
		toggleCheck: (state, action) => {
			const indexObject = state.value.findIndex(
				(todo) => todo.todo_id === action.payload
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
			state.value = action.payload.todos
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
