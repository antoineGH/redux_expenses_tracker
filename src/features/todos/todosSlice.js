import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { authFetch } from '../../auth/authHook'
import { openNotificationWithIcon } from '../../utils/notification'
import toTitle from '../../utils/toTitle'

// Slice Reducer
////////////////////////////////

const initialValue = {
	value: [],
	isLoading: false,
	hasError: false,
	isLoadingAddTodo: false,
	hasErrorAddTodo: false,
}

export const loadTodos = createAsyncThunk('todos/getAllTodos', async () => {
	const data = await authFetch(
		`https://flask-todoapp-api.herokuapp.com/api/todos`
	)
	const json = await data.json()
	return json
})

export const addTodo = createAsyncThunk('todos/addTodo', async (args) => {
	console.log(args)
	const { todo_description, isCompleted } = args
	const todo = { todo_description, completed: isCompleted }
	console.log(todo)
	const data = await authFetch(
		'https://flask-todoapp-api.herokuapp.com/api/todos',
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(todo),
		}
	)
	const json = await data.json()
	if (json.todo.hasOwnProperty('todo_id')) {
		openNotificationWithIcon(
			'success',
			'Todo Added',
			`Todo '${toTitle(
				json.todo.todo_description
			)}' has been added to your account.`
		)
	} else {
		openNotificationWithIcon(
			'error',
			'Todo Not Added',
			'Error Addind Todo to your account.'
		)
	}
	return json
})

export const todoSlice = createSlice({
	name: 'todos',
	initialState: initialValue,
	reducers: {
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
		[addTodo.pending]: (state) => {
			state.isLoadingAddTodo = true
			state.hasErrorAddTodo = false
		},
		[addTodo.fulfilled]: (state, action) => {
			state.value.push(action.payload.todo)
			state.isLoadingAddTodo = false
			state.hasErrorAddTodo = false
		},
		[addTodo.rejected]: (state) => {
			state.isLoadingAddTodo = false
			state.hasErrorAddTodo = true
		},
	},
})

export const { deleteTodo, toggleCheck } = todoSlice.actions

// Selectors
////////////////////////////////

export const selectTodos = (state) => state.todos.value
export const selectIsLoading = (state) => state.todos.isLoading
export const selectHasError = (state) => state.todos.hasError
export default todoSlice.reducer
