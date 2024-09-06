'use client'
import { AlertCircle } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import MyDropZone from './MyDropZone'
import { useSelector } from 'react-redux'
import { RootState } from '../store'

export default function App() {
	const { error } = useSelector((state: RootState) => state.pdf)

	return (
		<section className="container w-[1000px] max-w-xl h-64">
			{error && (
				<Alert variant="destructive" className="mb-5 bg-red-100">
					<AlertCircle className="h-5 w-5" />
					<AlertTitle className="font-bold text-lg">Error</AlertTitle>
					<AlertDescription className="text-md">
						{error}
					</AlertDescription>
				</Alert>
			)}
			<MyDropZone />
		</section>
	)
}
