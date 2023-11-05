"use client"

import { useState, MouseEvent, Dispatch, SetStateAction, useRef } from "react"
import styles from "./combobox.module.scss"
import { ArrowUpIcon, CheckTwoIcon, LoadingIcon } from "@/app/svg"

interface props {
	options: {
		id: string
		name: string
	}[]
	name?: string
	error?: boolean
	selectOption: {
		id: string
		name: string
	}
	setSelectOption: Dispatch<
		SetStateAction<{
			id: string
			name: string
		}>
	>
	loading?: boolean
	plaaceholder?: string
	onChange?: () => void
}

export function ComboBox(props: props) {
	const { options, name, error, selectOption, setSelectOption, loading, plaaceholder } = props
	const [viewOptions, setViewOptions] = useState(false)
	const inputRef = useRef<HTMLInputElement>(null)

	const HandleChangeCheckbox = (e: MouseEvent<HTMLButtonElement>) => {
		setViewOptions((prev) => !prev)
	}

	const HandleClickOption = (e: MouseEvent<HTMLButtonElement>, id: string) => {
		setSelectOption({ id, name: e.currentTarget.value })
		setTimeout(() => {
			setViewOptions(false)
		}, 150)
	}

	const HandleOnBlur = () => {
		setTimeout(() => {
			setViewOptions(false)
		}, 150)
	}

	const calculateDropdownClass = () => {
		const dropdownPosition = viewOptions ? styles.combobox__optionsActive : ""

		// Calculate the position based on the available screen space
		if (viewOptions) {
			const inputElement = inputRef.current
			if (inputElement) {
				const inputRect = inputElement.getBoundingClientRect()
				const spaceBelow = window.innerHeight - (inputRect.top + 300)
				const height = 29.585 * options.length + 33.4
				if (spaceBelow < 0) {
					if (options.length < 5) {
						inputElement.style.cssText = `--height-combo: -${height}px;`
					} else {
						inputElement.style.cssText = `--height-combo: -11.15em;`
					}

					return `${styles.combobox__optionsAbove}`
				}
			}
		}

		return dropdownPosition
	}

	return (
		<div className={`${styles.combobox} ${!options && styles.comboboxDisabled} ${viewOptions && styles.combobox_active}`} onBlur={HandleOnBlur}>
			<input
				type="text"
				className={`${styles.combobox__input} ${error && styles.combobox__inputError} `}
				name={name}
				placeholder={plaaceholder}
				value={selectOption?.name}
				onChange={(e) => setSelectOption(selectOption)}
				onFocus={() => setViewOptions(true)}
			/>
			<div className={styles.combobox__arrow}>
				<button
					className={`${styles.combobox__arrowCheckbox} ${viewOptions && styles.combobox__arrowCheckboxView}`}
					onClick={(e) => HandleChangeCheckbox(e)}
				/>
				<ArrowUpIcon className="" />
			</div>
			{
				<div className={`${styles.combobox__loading} ${!loading && styles.combobox__loadingInactive}`}>
					<LoadingIcon className="" />
				</div>
			}
			<div className={`${styles.combobox__options} ${viewOptions && calculateDropdownClass()} scrollbar`} ref={inputRef}>
				<div className={`${styles.combobox_container} ${viewOptions && styles.combobox__containerActive}`}>
					{options?.map((option) => (
						<button
							key={option.id}
							className={`${styles.combobox__optionsOption} ${selectOption?.name === option.name && styles.combobox__optionsOptionSelect}`}
							onClick={(e) => HandleClickOption(e, option.id)}
							value={option.name}
						>
							{option.name}
							{selectOption?.name === option.name && <CheckTwoIcon className={styles.combobox__optionsOptionIcon} />}
						</button>
					))}
				</div>
			</div>
		</div>
	)
}
