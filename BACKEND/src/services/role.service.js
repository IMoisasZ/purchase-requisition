import RoleRepository from '../repositories/role.repository.js'

async function createRole(role) {
	try {
		role.role = role.role.toUpperCase()

		return await RoleRepository.createRole(role)
	} catch (error) {
		throw error
	}
}

async function updateRole(role) {
	try {
		role.role = role.role.toUpperCase()

		return await RoleRepository.updateRole(role)
	} catch (error) {
		throw error
	}
}

async function getRoles() {
	return await RoleRepository.getRoles()
}

async function getRole(role_id) {
	try {
		const result = await RoleRepository.getRole(role_id)

		if (result === null) {
			throw new Error('Perfl de usuário inexistente!')
		}

		return result
	} catch (error) {
		throw error
	}
}

async function disableEnable(role) {
	try {
		const result = await RoleRepository.getRole(role.role_id)

		if (!result) {
			throw new Error('Perfil inexistente!')
		}
		return await RoleRepository.disableEnable(role)
	} catch (error) {
		throw error
	}
}

export default {
	createRole,
	updateRole,
	getRoles,
	getRole,
	disableEnable,
}
