import LoginService from '../services/login.service.js'

async function Login(req, res, next) {
	try {
		const { email, password } = req.body

		if (!email) {
			return res.status(400).json({ error: 'Email não informado!' })
		}

		if (!password) {
			return res.status(400).json({ error: 'Senha não informada!' })
		}

		res.send(await LoginService.Login(email, password))
		logger.info(`/login - ${JSON.stringify({ email, senha })}`)
	} catch (error) {
		next(error)
	}
}

export default {
	Login,
}
