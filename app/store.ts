'use client'
import { configureStore } from '@reduxjs/toolkit'
import pdfReducer from './_features/pdf/pdfSlice'

export const store = configureStore({
	reducer: {
		pdf: pdfReducer,
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
