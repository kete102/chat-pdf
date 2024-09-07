import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type statusType = 'idle' | 'UPLOADING' | 'COMPLETED' | 'FAILED'

interface UploadState {
	status: statusType
	error: string | null
}

const initialState: UploadState = {
	status: 'idle',
	error: null,
}

const pdfSlice = createSlice({
	name: 'pdf',
	initialState,
	reducers: {
		setUploadStatus(state, action: PayloadAction<statusType>) {
			return {
				status: action.payload,
				error: null,
			}
		},
		setError(state, action: PayloadAction<string | null>) {
			state.error = action.payload
		},
	},
})

export const { setUploadStatus, setError } = pdfSlice.actions
export default pdfSlice.reducer
