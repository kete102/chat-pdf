/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

const acceptFilesType = {
	'application/pdf': [],
}

const maxFileSize = 5242880

const uploadPDF = async (formData: FormData) => {
	try {
		const result = await fetch('/api/upload', {
			method: 'POST',
			body: formData,
		})
		const data = await result.json()
		const { id, pages, url } = data
		console.log(id, pages, url)
	} catch (error) {
		console.log(error)
	}
}

export default function MyDropZone() {
	const handleFileSelected = useCallback((acceptedFiles: File[]) => {
		if (acceptedFiles.length > 0) {
			const formData = new FormData()
			formData.append('file', acceptedFiles[0])
			uploadPDF(formData)
			console.log(formData)
		}
	}, [])

	const {
		getRootProps,
		getInputProps,
		isDragActive,
		isDragReject,
		fileRejections,
	} = useDropzone({
		onDrop: handleFileSelected,
		accept: acceptFilesType,
		minSize: 0,
		maxSize: maxFileSize,
	})

	const isFileTooLarge =
		fileRejections.length > 0 && fileRejections[0].file.size > maxFileSize

	return (
		<div>
			<div
				{...getRootProps()}
				className={`p-6 border-2 border-dashed rounded-md ${isDragActive ? 'border-blue-500' : 'border-gray-300'}`}
			>
				<input {...getInputProps()} />
				{!isDragActive && (
					<p className="text-center text-lg font-bold text-gray-600">
						Clik here or drop a file to upload!
					</p>
				)}
				{!isDragReject && isDragActive && (
					<p className="text-center text-lg font-bold text-gray-600">
						Drop it here!
					</p>
				)}
				{isDragReject && (
					<p className="text-center text-xl font-bold  text-red-400">
						El tipo de archivo no es correcto!
					</p>
				)}
				{isFileTooLarge && (
					<p className="text-center text-xl font-bold text-red-400">
						File is too large.
					</p>
				)}
			</div>
		</div>
	)
}
