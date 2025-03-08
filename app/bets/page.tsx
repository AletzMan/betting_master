import MainPage from "./components/MainPage";
import { Suspense } from 'react'

export default async function BetsPage() {
	return (
		<main className=''>
			<Suspense>
				<MainPage />
			</Suspense>
		</main>

	)
}
