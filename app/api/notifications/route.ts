import { SendMailNotification } from "@/app/services/mailer/mailer"
import { notificationsMailSchema } from "@/app/validations/notificationsMailSchema"
import axios from "axios"
import { NextRequest, NextResponse } from "next/server"


export async function POST(request: NextRequest, context: any) {
    const data = await request.json()
    const { emails, day } = data
    try {
        const result = await notificationsMailSchema.parseAsync(data)
        const responseSendMail = await SendMailNotification(
            emails,
            day
        )
        if (responseSendMail) {
            return NextResponse.json({ data: "Email emviado correctamente" }, { status: 200 })
        } else {
            return NextResponse.json({ data: responseSendMail }, { status: 400 })
        }

    } catch (error) {
        console.log(error)
        return NextResponse.json({ error }, { status: 500 })

    }

}
