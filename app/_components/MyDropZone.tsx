/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useCallback } from 'react'
import { FileRejection, useDropzone } from 'react-dropzone'
import { useDispatch } from 'react-redux'
import type { AppDispatch } from '../store'
import { setError, setUploadStatus } from '../_features/pdf/pdfSlice'

interface FileType extends File {}

export default function MyDropZone() {
	const dispatch = useDispatch<AppDispatch>()

	const onDrop = useCallback(
		(acceptedFile: FileType[], fileRejections: FileRejection[]) => {
			if (fileRejections.length > 0) {
				dispatch(
					setError(
						'No se ha podido subir el archivo seleccionado. Elija un PDF válido por favor.'
					)
				)
			}
			dispatch(setError(null))
			// Si el archivo es correcto se sube a Cloudinary
			dispatch(setUploadStatus('UPLOADING'))
		},
		[]
	)

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accept: {
			'application/pdf': ['.pdf'],
		},
		maxFiles: 1,
		maxSize: 5242880, // 5 MB = 5 * 1024 * 1024 bytes
	})

	return (
		<div
			{...getRootProps()}
			className={`p-6 border-2 border-dashed rounded-md ${isDragActive ? 'border-blue-500' : 'border-gray-300'}`}
		>
			<input {...getInputProps()} />
			{isDragActive ? (
				<p className="text-blue-500">Drop the PDF here...</p>
			) : (
				<p>
					Drag and drop a PDF file here, or click to select a file
					(Max size: 10MB)
				</p>
			)}
		</div>
	)
}
