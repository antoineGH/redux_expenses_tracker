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
	isLoadingToggleTodo: false,
	hasErrorToggleTodo: false,
	isLoadingDeleteTodo: false,
	hasErrorDeleteTodo: false,
}

export const loadTodos = createAsyncThunk('todos/getAllTodos', async () => {
	const data = await authFetch(
		`https://flask-todoapp-api.herokuapp.com/api/todos`
	)
	const json = await data.json()
	if (json.hasOwnProperty('message')) {
		if (json['message'] === 'Todos not found') {
			return { todos: [] }
		}
	}
	return json
})

export const addTodo = createAsyncThunk('todos/addTodo', async (args) => {
	const { todo_description, isCompleted } = args
	const todo = { todo_description, completed: isCompleted }
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
			'Error Adding Todo to your account.'
		)
	}
	return json
})

export const deleteTodo = createAsyncThunk(
	'todos/deleteTodo',
	async (todo_id) => {
		const data = await authFetch(
			`https://flask-todoapp-api.herokuapp.com/api/todo/${todo_id}`,
			{
				method: 'DELETE',
			}
		)
		const json = await data.json()
		if (json) {
			openNotificationWithIcon(
				'success',
				'Todo Deleted',
				'Todo has been deleted'
			)
		} else {
			openNotificationWithIcon(
				'error',
				'Error',
				'Todo has not been deleted'
			)
		}
		console.log(json)
		return { json, todo_id }
	}
)

export const toggleCheck = createAsyncThunk(
	'todos/toggleCheck',
	async (args) => {
		const { todo_id, completed } = args
		const todo = { completed }
		const data = await authFetch(
			`https://flask-todoapp-api.herokuapp.com/api/todo/${todo_id}`,
			{
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(todo),
			}
		)
		const json = await data.json()
		return json
	}
)

export const todoSlice = createSlice({
	name: 'todos',
	initialState: initialValue,
	reducers: {},
	extraReducers: {
		[loadTodos.pending]: (state) => {
			state.isLoading = true
			state.hasError = false
		},
		[loadTodos.fulfilled]: (state, action) => {
			if (action.payload.todos.length <= 1) {
				state.value = []
			} else {
				state.value = action.payload.todos
			}
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
		[toggleCheck.pending]: (state) => {
			state.isLoadingToggleTodo = true
			state.hasErrorToggleTodo = false
		},
		[toggleCheck.fulfilled]: (state, action) => {
			const indexObject = state.value.findIndex(
				(todo) => todo.todo_id === action.payload.todo.todo_id
			)
			state.value[indexObject].completed =
				!state.value[indexObject].completed
			state.isLoadingToggleTodo = false
			state.hasErrorToggleTodo = false
		},
		[toggleCheck.rejected]: (state) => {
			state.isLoadingToggleTodo = false
			state.hasErrorToggleTodo = true
		},
		[deleteTodo.pending]: (state) => {
			state.isLoadingDeleteTodo = true
			state.hasErrorDeleteTodo = false
		},
		[deleteTodo.fulfilled]: (state, action) => {
			const { todo_id } = action.payload
			state.value = state.value.filter((todo) => todo.todo_id !== todo_id)
			state.isLoadingDeleteTodo = false
			state.hasErrorDeleteTodo = false
		},
		[deleteTodo.rejected]: (state) => {
			state.isLoadingDeleteTodo = false
			state.hasErrorDeleteTodo = true
		},
	},
})

// Selectors
////////////////////////////////

export const selectTodos = (state) => state.todos.value
export const selectIsLoading = (state) => state.todos.isLoading
export const selectHasError = (state) => state.todos.hasError
export const selectIsLoadingAddTodo = (state) => state.todos.isLoadingAddTodo
export const selecthasErrorAddTodo = (state) => state.todos.hasErrorAddTodo
export const selectIsLoadingDeleteTodo = (state) =>
	state.todos.isLoadingDeleteTodo
export const selectIsLoadingToggleTodo = (state) =>
	state.todos.isLoadingToggleTodo
export default todoSlice.reducer
