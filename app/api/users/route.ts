import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { ConflictError, DefaultError, ServerError, UnprocessableEntityError } from "../_services/errors";
import { SuccessCreate, SuccessResponse } from "../_services/successfulResponses";
import { UserSchema } from "@/validations/userSchema";
import { ZodError } from "zod";

export async function GET(request: NextRequest) {

    const response = await prisma?.user.findMany()

    return SuccessResponse(response);
}

export async function POST(request: NextRequest) {
    try {
        const data = await request.json()
        const newUser = await UserSchema.parseAsync(data)

        const response = await prisma?.user.create({
            data: {
                account: newUser.account,
                bets_won: newUser.bets_won,
                color: newUser.color,
                email: newUser.email,
                finals_won: newUser.finals_won,
                last_login: newUser.last_login,
                name: newUser.name,
                notifications: newUser.notifications,
                image: newUser.photo,
                total_bets: newUser.total_bets
            }
        })

        if (response) {
            return SuccessCreate(response);
        }
        return DefaultError("Error al crear el registro");

    } catch (error) {
        console.log(error);
        if (error instanceof PrismaClientKnownRequestError) {
            if (error.code === "P2002") {
                return ConflictError();
            }
        }
        if (error instanceof ZodError) {
            return UnprocessableEntityError(error.issues);
        }
        return ServerError();
    }
}
