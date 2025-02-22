/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import { useRef, useEffect, ReactSVGElement } from "react"
import { TeamsLocalLogos, TeamsLogos } from "@/app/constants/constants"
import React from "react"

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
		<div className="relative flex  ">
			<div className="relative flex justify-center flex-row gap-6 mx-auto" ref={slideRef}>
				{TeamsLocalLogos.map((logo) => (
					<div
						key={logo.id}
						className={`relative flex flex-col items-center justify-center text-[0.8em] basis-[8em] gap-[0.5em] font-medium min-w-[6.5em] py-[0.75em] transition-all duration-300 ease-in-out text-[var(--font-second-color)] rounded-[var(--borderRadius)]`} // Mantén cualquier otro estilo de los módulos CSS
					>
						{React.isValidElement(logo.logo) ? (
							React.cloneElement(logo.logo as ReactSVGElement, { className: 'w-[4em] h-[4em]' })
						) : (
							logo.logo
						)}
					</div>
				))}
			</div>
		</div>
	)
}
