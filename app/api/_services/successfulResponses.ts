import { NextResponse } from "next/server"

export const PaginationResponse = (
	results: unknown,
	totalResults: number,
	totalPages: number,
	currentPage: number
) => {
	return NextResponse.json(
		{
			error: false,
			response: {
				results,
				totalResults,
				totalPages,
				currentPage,
			},
		},
		{ status: 200 }
	)
}

export const SuccessUpdate = (data: unknown) => {
	return NextResponse.json(
		{
			error: false,
			message: "Updated successfully",
			data: data,
		},
		{ status: 200 }
	)
}

export const SuccessDelete = (data: unknown) => {
	return NextResponse.json(
		{
			error: false,
			message: "Deleted successfully",
			data: data
		},
		{ status: 200 }
	)
}

export const SuccessCreate = (data: unknown) => {
	return NextResponse.json(
		{
			error: false,
			message: "Created successfully",
			data: data,
		},
		{ status: 201 }
	)
}

export const SuccessResponse = (data: unknown) => {
	return NextResponse.json(
		{
			error: false,
			response: data,
		},
		{ status: 200 }
	)
}
