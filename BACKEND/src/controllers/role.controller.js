import RoleService from '../services/role.service.js'

async function createRole(req, res, next) {
	try {
		const role = req.body

		if (!role.role) {
			res
				.status(400)
				.json({ error: 'O perfil do usuário deve ser preenchido!' })
		}

		res.send(await RoleService.createRole(role))
		logger.info(`POST /role - ${JSON.stringify(role)}`)
	} catch (error) {
		next(error)
	}
}

async function updateRole(req, res, next) {
	try {
		const role = req.body

		if (!role.role) {
			res
				.status(400)
				.json({ error: 'O perfil do usuário deve ser preenchido!' })
		}

		res.send(await RoleService.updateRole(role))
		logger.info(`PATCH /role - ${JSON.stringify(role)}`)
	} catch (error) {
		next(error)
	}
}

async function getRoles(req, res, next) {
	try {
		res.send(await RoleService.getRoles())
		logger.info(`GET /role - all roles`)
	} catch (error) {
		next(error)
	}
}

async function getRole(req, res, next) {
	try {
		res.send(await RoleService.getRole(req.params.role_id))
		logger.info(`GET /role/:${req.params.role_id}`)
	} catch (error) {
		next(error)
	}
}

async function disableEnable(req, res, next) {
	try {
		const role = req.body
		res.send(await RoleService.disableEnable(role))
		logger.info(`PUT - /role - ${JSON.stringify(role)}`)
	} catch (error) {
		next(error)
	}
}

export default {
	createRole,
	updateRole,
	getRoles,
	getRole,
	disableEnable,
}
