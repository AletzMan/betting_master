"use client"
import { useRef, useEffect } from "react"

import styles from "./slides.module.scss"
import { TeamsLogos } from "@/app/constants/constants"

export function TeamsSlides() {
	const slideRef = useRef<HTMLDivElement | null>(null)
	const slideDuration = 1500 // Duración de cada desplazamiento
	const slideDistance = -6.6 // Desplazamiento en 'em'

	useEffect(() => {
		let startTime: number | null = null

		function animate(time: number) {
			if (!startTime) {
				startTime = time
			}

			const progress = (time - startTime) / slideDuration
			const newPosition = slideDistance * progress

			if (slideRef.current) {
				slideRef.current.style.transform = `translateX(${newPosition}em)`
			}

			if (progress < 1) {
				requestAnimationFrame(animate)
			} else {
				if (slideRef.current) {
					slideRef.current.style.transition = "none"
					slideRef.current.style.transform = "translateX(0)"
					const firstChild = slideRef.current.children[0]
					slideRef.current.appendChild(firstChild.cloneNode(true))
					slideRef.current?.removeChild(firstChild)
				}
				startTime = null
				requestAnimationFrame(animate) // Continuar con el siguiente desplazamiento
			}
		}

		const animationId = requestAnimationFrame(animate)

		return () => {
			cancelAnimationFrame(animationId)
		}
	}, [])

	return (
		<div className={styles.container}>
			<div className={styles.container__slide} ref={slideRef}>
				{TeamsLogos.map((logo) => (
					<div
						key={logo.id}
						className={styles.container__logo}
						style={{ backgroundColor: `${logo.color_one}50`, border: `2px solid${logo.color_three}65` }}
					>
						{logo.logo}
					</div>
				))}
			</div>
		</div>
	)
}
