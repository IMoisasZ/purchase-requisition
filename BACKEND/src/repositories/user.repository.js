import UserModel from '../models/user.model.js'
import SectorModel from '../models/sector.model.js'
import RoleModel from '../models/role.model.js'
import Sequelize from 'sequelize'

const OP = Sequelize.Op

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
		await UserModel.update(
			{
				name: user.name,
				last_name: user.last_name,
				sector_id: user.sector_id,
				role_id: user.role_id,
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

async function updateUserEmail(user) {
	try {
		await UserModel.update(
			{
				email: user.email,
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

async function updateUserPassword(user) {
	try {
		await UserModel.update(
			{
				password: user.password,
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

export default {
	createUser,
	updateUser,
	updateUserEmail,
	updateUserPassword,
	getUsers,
	getUser,
	getUserByEmail,
}
