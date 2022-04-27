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

async function run(
	requisition_id,
	user = 'devimoisasz@gmail.com',
	compras = 'pacheco@destaq.com.br',
) {
	const mailSend = await transport.sendMail({
		text: `Segue a requisição numero ${requisition_id}`,
		subject: `requisição_${requisition_id}`,
		from: user,
		to: compras,
		attachments: [
			{
				filename: `requisicao_${requisition_id}.xlsx`,
				path: `c://Users/Moisas/Downloads/requisicao_${requisition_id}.xlsx`,
			},
			{
				filename: `requisicao_${requisition_id}.pdf`,
				path: `c://Users/Moisas/Downloads/requisicao_${requisition_id}.pdf`,
			},
		],
	})
	console.log(mailSend)
}

export default run
