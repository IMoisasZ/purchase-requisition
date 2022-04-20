import UserModel from '../models/user.model.js'
import SectorModel from '../models/sector.model.js'
import RoleModel from '../models/role.model.js'

async function createUser(user) {
	try {
		const newUser = await UserModel.create(user)
		return await getUser(newUser.user_id)
	} catch (error) {
		throw error
	}
}

async function updateUser(user) {
	try {
		await UserModel.update(user, {
			where: {
				user_id: user.user_id,
			},
		})
		return await getUser(user.user_id)
	} catch (error) {
		throw error
	}
}

async function getUsers() {
	try {
		return await UserModel.findAll({
			include: [
				{
					model: SectorModel,
				},
				{
					model: RoleModel,
				},
			],
		})
	} catch (error) {
		throw error
	}
}

async function getUser(user_id) {
	try {
		return await UserModel.findByPk(user_id, {
			include: [
				{
					model: SectorModel,
				},
				{
					model: RoleModel,
				},
			],
		})
	} catch (error) {
		throw error
	}
}

async function getUserByEmail(email) {
	try {
		return await UserModel.findOne({
			where: {
				email,
			},
		})
	} catch (error) {
		throw error
	}
}

async function disableEnable(user) {
	try {
		await UserModel.update(
			{
				user_id: user.user_id,
				actived: user.actived,
			},
			{
				where: {
					user_id: user.user_id,
				},
			},
		)
		return await getUser(user.user_id)
	} catch (error) {
		throw error
	}
}

export default {
	createUser,
	updateUser,
	getUsers,
	getUser,
	getUserByEmail,
	disableEnable,
}
