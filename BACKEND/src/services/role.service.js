import RoleRepositry from '../repositories/role.repository.js'

async function createRole(role) {
	try {
		role.role = role.role.toUpperCase()

		return await RoleRepositry.createRole(role)
	} catch (error) {
		throw error
	}
}

async function updateRole(role) {
	try {
		role.role = role.role.toUpperCase()

		return await RoleRepositry.updateRole(role)
	} catch (error) {
		throw error
	}
}

async function getRoles() {
	return await RoleRepositry.getRoles()
}

async function getRole(role_id) {
	try {
		const result = await RoleRepositry.getRole(role_id)

		if (result === null) {
			throw new Error('Perfl de usuário inexistente!')
		}

		return result
	} catch (error) {
		throw error
	}
}

async function disableEnable(role) {
	return await RoleRepositry.disableEnable(role)
}

export default {
	createRole,
	updateRole,
	getRoles,
	getRole,
	disableEnable,
}
