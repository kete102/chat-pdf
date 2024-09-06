'use client'
import { Provider } from 'react-redux'
import App from './_components/App'
import { store } from './store'

export default function Home() {
	return (
		<Provider store={store}>
			<div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
				<div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]"></div>
			</div>
			<main className="grid place-content-center min-h-screen w-screen">
				<h1 className="text-6xl opacity-70 font-bold text-center pb-10">
					Chat with your PDF
				</h1>
				<App />
			</main>
		</Provider>
	)
}
