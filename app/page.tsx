
import { News } from "./components/News/News"
import styles from "./page.module.css"

export default function Home() {
	return (
		<main className="flex pt-15 pb-4  ">
			<News />
		</main>
	)
}
