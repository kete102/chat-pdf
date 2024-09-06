import { useCallback } from 'react'
import { DropEvent, FileRejection, useDropzone } from 'react-dropzone'

interface FileType extends File {}
export default function MyDropZone() {
	const onDrop = useCallback(
		(acceptedFile: FileType[], fileRejections: FileRejection[]) => {
			const reader = new FileReader()

			reader.onabort = () => console.log('file reading was aborted')
			reader.onerror = () => console.log('file reading has failed')
			reader.onload = () => {
				const binaryStr = reader.result
				console.log(binaryStr)
			}

			reader.readAsArrayBuffer(acceptedFile)
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
