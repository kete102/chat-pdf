'use client'
import { AlertCircle } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { useState } from 'react'
import MyDropZone from './MyDropZone'

export default function App() {
	const [error] = useState()

	return (
		<section className="container w-[1000px] max-w-xl h-64">
			{error && (
				<Alert variant="destructive" className="bg-red-100">
					<AlertCircle className="h-5 w-5" />
					<AlertTitle className="font-bold text-lg">Error</AlertTitle>
					<AlertDescription className="text-md">
						Your session has expired. Please log in again.
					</AlertDescription>
				</Alert>
			)}
			<MyDropZone />
		</section>
	)
}
