import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { authFetch } from '../../auth/authHook'
import { logout } from '../../auth/authHook'
import { openNotificationWithIcon } from '../../utils/notification'
import toTitle from '../../utils/toTitle'

// Slice Reducer
////////////////////////////////

const initialValue = {
	value: {},
	isLoading: false,
	hasError: false,
	isLoadingUpdateUser: false,
	hasErrorUpdateUser: false,
	isLoadingDeleteUser: false,
	hasErrorDeleteUser: false,
}

export const loadUser = createAsyncThunk('user/getUser', async () => {
	const data = await authFetch(
		'https://flask-todoapp-api.herokuapp.com/api/user'
	)
	const json = await data.json()
	return json
})

export const updateUser = createAsyncThunk(
	'user/updateUser',
	async (updateElem) => {
		const { firstName, lastName, password } = updateElem
		const user = {
			first_name: firstName,
			last_name: lastName,
			password: password,
		}
		const data = await authFetch(
			'https://flask-todoapp-api.herokuapp.com/api/user',
			{
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(user),
			}
		)
		const json = await data.json()
		if (json.user.hasOwnProperty('user_id')) {
			openNotificationWithIcon(
				'success',
				'Account Updated',
				`${toTitle(json.user.first_name)} ${toTitle(
					json.user.last_name
				)}, Your account has been updated.`
			)
		}
		return json
	}
)

export const deleteUser = createAsyncThunk('user/deleteUser', async () => {
	const data = await authFetch(
		'https://flask-todoapp-api.herokuapp.com/api/user',
		{
			method: 'DELETE',
		}
	)
	const json = await data.json()
	if (json) {
		logout()
	} else {
		openNotificationWithIcon(
			'error',
			'Error',
			'Account has not been deleted'
		)
	}
	return json
})

export const userSlice = createSlice({
	name: 'user',
	initialState: initialValue,
	reducers: {},
	extraReducers: {
		[loadUser.pending]: (state) => {
			state.isLoading = true
			state.hasError = false
		},
		[loadUser.fulfilled]: (state, action) => {
			state.value = action.payload
			state.isLoading = false
			state.hasError = false
		},
		[loadUser.rejected]: (state) => {
			state.isLoading = false
			state.hasError = true
		},
		[updateUser.pending]: (state) => {
			state.isLoadingUpdateUser = true
			state.hasErrorUpdateUser = false
		},
		[updateUser.fulfilled]: (state, action) => {
			state.value = action.payload
			state.isLoadingUpdateUser = false
			state.hasErrorUpdateUser = false
		},
		[updateUser.rejected]: (state) => {
			state.isLoadingUpdateUser = false
			state.hasErrorUpdateUser = true
		},
		[deleteUser.pending]: (state) => {
			state.isLoadingDeleteUser = true
			state.hasErrorDeleteUser = false
		},
		[deleteUser.fulfilled]: (state) => {
			state.value = {}
			state.isLoadingDeleteUser = false
			state.hasErrorDeleteUser = false
		},
		[deleteUser.rejected]: (state) => {
			state.isLoadingDeleteUser = false
			state.hasErrorDeleteUser = true
		},
	},
})

// Selectors
////////////////////////////////

export const selectUser = (state) => state.user.value.user
export const selectUserIsLoading = (state) => state.user.isLoading
export const selectUserHasError = (state) => state.user.hasError
export const selectUpdateUserIsLoading = (state) =>
	state.user.isLoadingUpdateUser
export const selectUpdateUserHasError = (state) => state.user.hasErrorUpdateUser
export const selectDeleteUserIsLoading = (state) =>
	state.user.isLoadingDeleteUser
export const selectDeleteUserHasError = (state) => state.user.hasErrorDeleteUser

export default userSlice.reducer
