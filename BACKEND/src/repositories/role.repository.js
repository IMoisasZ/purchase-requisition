import RoleModel from '../models/role.model.js'

async function createRole(role) {
	try {
		const newRole = await RoleModel.create(role)
		return await getRole(newRole.role_id)
	} catch (error) {
		throw error
	}
}

async function updateRole(role) {
	try {
		await RoleModel.update(role, {
			where: {
				role_id: role.role_id,
			},
		})
		return await getRole(role.role_id)
	} catch (error) {
		throw error
	}
}

async function getRoles() {
	try {
		return await RoleModel.findAll()
	} catch (error) {
		throw error
	}
}

async function getRole(role_id) {
	try {
		return await RoleModel.findByPk(role_id)
	} catch (error) {
		throw error
	}
}

async function getRoleByRole(role) {
	try {
		return await RoleModel.findOne({
			where: {
				role,
			},
		})
	} catch (error) {
		throw error
	}
}

async function disableEnable(role) {
	try {
		await RoleModel.update(
			{
				role_id: role.role_id,
				actived: role.actived,
			},
			{
				where: {
					role_id: role.role_id,
				},
			},
		)
		return await getRole(role.role_id)
	} catch (error) {
		throw error
	}
}

export default {
	createRole,
	updateRole,
	getRoles,
	getRole,
	getRoleByRole,
	disableEnable,
}
