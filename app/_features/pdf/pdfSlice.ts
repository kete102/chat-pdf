import { createSlice, PayloadAction } from '@reduxjs/toolkit'

//TODO: Hacer que solo se maneje el estado del la subida. El archivo se maneja por separado

interface PdfFile {
	file: File
	status: 'UPLOADING' | 'COMPLETED' | 'FAILED'
}

interface PdfState {
	files: PdfFile[]
	error: string | null
}

const initialState: PdfState = {
	files: [],
	error: null,
}

const pdfSlice = createSlice({
	name: 'pdf',
	initialState,
	reducers: {
		addFile(state, action: PayloadAction<File>) {
			state.files.push({
				file: action.payload,
				status: 'UPLOADING',
			})
		},
		removeFile(state, action: PayloadAction<File>) {
			state.files = state.files.filter(
				(file) => file.file !== action.payload
			)
		},
		setError(state, action: PayloadAction<string | null>) {
			state.error = action.payload
		},
	},
})

export const { addFile, removeFile, setError } = pdfSlice.actions
export default pdfSlice.reducer
