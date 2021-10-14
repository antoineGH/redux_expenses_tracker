import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { authFetch } from '../../auth/authHook'

// Slice Reducer
////////////////////////////////

const initialValue = {
	value: {},
	isLoading: false,
	hasError: false,
}

export const loadUser = createAsyncThunk('user/getUser', async () => {
	const data = await authFetch(
		'https://flask-todoapp-api.herokuapp.com/api/user'
	)
	const json = await data.json()
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
	},
})

// Selectors
////////////////////////////////

export const selectUser = (state) => state.user.value.user
export const selectUserIsLoading = (state) => state.user.isLoading
export const selectUserHasError = (state) => state.user.hasError

export default userSlice.reducer
