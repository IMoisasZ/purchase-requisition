import UserService from '../services/user.service.js'

async function createUser(req, res, next) {
	try {
		const user = req.body

		if (!user.name)
			res.status(400).json({ error: 'O nome do usuário é obrigatório!' })
		if (!user.last_name)
			res.status(400).json({ error: 'O sobrenome do usuário é obrigatório!' })
		if (!user.email) res.status(400).json({ error: 'O email é obrigatório!' })
		if (!user.sector_id)
			res.status(400).json({ error: 'O setor é obrigatório!' })
		if (!user.role_id)
			res.status(400).json({ error: 'O perfil de usuário é obrigatório!' })
		if (!user.password)
			res.status(400).json({ error: 'A senha é obrigatória!' })
		if (!user.confirm_password)
			res.status(400).json({ error: 'Confirmaçao da senha não informada!' })

		res.send(await UserService.createUser(user))
		logger.info(`POST /user - ${JSON.stringify(user)}`)
	} catch (error) {
		next(error)
	}
}

async function updateUser(req, res, next) {
	try {
		const user = req.body

		if (!user.user_id)
			res.status(400).json({ error: 'O id do do usuário é obrigatório!' })
		if (!user.name)
			res.status(400).json({ error: 'O nome do usuário é obrigatório!' })
		if (!user.last_name)
			res.status(400).json({ error: 'O sobrenome do usuário é obrigatório!' })
		if (!user.sector_id)
			res.status(400).json({ error: 'O setor é obrigatório!' })
		if (!user.role_id)
			res.status(400).json({ error: 'O perfil de usuário é obrigatório!' })

		res.send(await UserService.updateUser(user))
		logger.info(`PATCH /user - ${JSON.stringify(user)}`)
	} catch (error) {
		next(error)
	}
}

async function updateUserEmail(req, res, next) {
	try {
		const user = req.body

		if (!user.user_id)
			res.status(400).json({ error: 'O id do do usuário é obrigatório!' })
		if (!user.email) res.status(400).json({ error: 'O email é obrigatório!' })
		if (!user.confirm_email)
			res.status(400).json({ error: 'Confirmação do email não informada!' })

		res.send(await UserService.updateUserEmail(user))
		logger.info(`PATCH /user - ${JSON.stringify(user)}`)
	} catch (error) {
		next(error)
	}
}

async function updateUserPassword(req, res, next) {
	try {
		const user = req.body

		if (!user.user_id)
			res.status(400).json({ error: 'O id do do usuário é obrigatório!' })
		if (!user.password)
			res.status(400).json({ error: 'A senha é obrigatória!' })
		if (!user.confirm_password)
			res.status(400).json({ error: 'Confirmaçao da senha não informada!' })

		res.send(await UserService.updateUserPassword(user))
		logger.info(`PATCH /user - ${JSON.stringify(user)}`)
	} catch (error) {
		next(error)
	}
}

async function getUsers(req, res, next) {
	try {
		res.send(await UserService.getUsers())
		logger.info(`GET /user - all users`)
	} catch (error) {
		next(error)
	}
}

async function getUser(req, res, next) {
	try {
		res.send(await UserService.getUser(req.params.user_id))
		logger.info(`GET /user/:${req.params.user_id}`)
	} catch (error) {
		next(error)
	}
}

export default {
	createUser,
	updateUser,
	updateUserEmail,
	updateUserPassword,
	getUsers,
	getUser,
}
