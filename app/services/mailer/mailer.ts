import nodemailer from "nodemailer"
import fs from "fs/promises"
import path from "path"
import Handlebars from "handlebars"
import SMTPTransport from "nodemailer/lib/smtp-transport"

const PASSWORD = process.env.PASSWORD_GOOGLE_APP
const KEY_SECRET = process.env.KEY_SECRET_LOGIN as string

export const transporter = nodemailer.createTransport({
	host: "smtp.gmail.com",
	port: 465,
	secure: true,
	auth: {
		// TODO: replace `user` and `pass` values from <https://forwardemail.net>
		user: "alejo2986@gmail.com",
		pass: PASSWORD,
	},
})

transporter.verify().then(() => {
})

export async function SendMailNotification(emails: string[], day: string) {
	// send mail with defined transport object
	let info: SMTPTransport.SentMessageInfo = {} as SMTPTransport.SentMessageInfo
	try {
		const HTML = await HTML_PasswordReset()
		const HTML_TEMPLETE = Handlebars.compile(HTML)
		const data = { user: "", day: day }
		const HTML_SEND = HTML_TEMPLETE(data)
		info = await transporter.sendMail({
			from: '¡Nueva Quiniela!" <notifications@bettinggame.com>', // sender address
			to: emails, // list of receivers
			subject: "Quiniela disponible: ¡Haz tus predicciones!", // Subject line
			//text: "Hello world?", // plain text body
			html: HTML_SEND, // html body
		})
		return info
	} catch (error) {
		console.error(error)
		return null
	}
}

export async function SendMailNewUser(email: string, user: string) {
	// send mail with defined transport object
	let info: SMTPTransport.SentMessageInfo = {} as SMTPTransport.SentMessageInfo
	try {
		const HTML = await HTML_UserRegister()
		const HTML_TEMPLETE = Handlebars.compile(HTML)
		const data = { user: user }
		const HTML_SEND = HTML_TEMPLETE(data)
		info = await transporter.sendMail({
			from: 'Technolife Succesful registration" <promo@technolife.com>', // sender address
			to: email, // list of receivers
			subject: "Welcome to Technolife", // Subject line
			//text: "Hello world?", // plain text body
			html: HTML_SEND, // html body
		})
		return info.accepted
	} catch (error) {
		console.error(error)
		return info.response
	}
}


export const HTML_SubscribeNewsLetter = async () => {
	const pathSRC = path.join(process.cwd(), "app/services/mailer")
	const result = await fs.readFile(pathSRC + "/LayoutNewsletter.html", "utf8")
	return result
}

export const HTML_UserRegister = async () => {
	const pathSRC = path.join(process.cwd(), "app/services/mailer")
	const result = await fs.readFile(pathSRC + "/LayoutUserRegister.html", "utf8")
	return result
}
export const HTML_PasswordReset = async () => {
	const pathSRC = path.join(process.cwd(), "app/services/mailer")
	const result = await fs.readFile(pathSRC + "/LayoutPasswordReset.html", "utf8")
	return result
}
