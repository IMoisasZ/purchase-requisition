import nodemailer from 'nodemailer'
import SMTP_CONFIG from '../utils/config_smtp.util.js'

const smtp = SMTP_CONFIG()

const transport = nodemailer.createTransport({
	host: smtp.host,
	port: smtp.port,
	secure: false,
	auth: {
		user: smtp.user,
		pass: smtp.pass,
	},
	tls: {
		rejectUnauthorized: false,
	},
})

async function run() {
	const mailSend = await transport.sendMail({
		text: 'Testando',
		subject: 'Teste de emal',
		from: 'devimoisasz@gmail.com',
		to: 'devimoisasz@gmail.com',
		attachments: [
			{
				filename: 'requisição_6.xlsx',
				path: '../reports/excel/requisição_6.xlsx', // stream this file
			},
			{
				filename: 'requisicao_6.pdf',
				path: 'c://Users/Moisas/Downloads/requisicao_6.pdf', // stream this file
			},
		],
	})

	console.log(mailSend)
}

run()
