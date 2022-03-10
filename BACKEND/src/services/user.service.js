import UserRepository from '../repositories/user.repository.js'
import RoleRepository from '../repositories/role.repository.js'
import SectorRepository from '../repositories/sector.repository.js'
import hashPassword from '../utils/hashPassword.utils.js'

async function createUser(user) {
	try {
		if (user.role_id === 3 && user.responsable_id === '') {
			throw new Error('O responsável deve ser preenchido!')
		}
		const foundEmail = await UserRepository.getUserByEmail(user.email)
		const foundRole = await RoleRepository.getRole(user.role_id)
		const foundSector = await SectorRepository.getSector(user.sector_id)

		if (foundEmail) {
			throw new Error('Email já cadastrado!')
		}

		if (!foundRole) {
			throw new Error('Perfil de usuário inexistente!')
		}

		if (!foundSector) {
			throw new Error('Setor inexistente!')
		}

		if (user.password !== user.confirm_password) {
			throw new Error('As senhas não conferem!')
		}

		const passwordHash = hashPassword(user.password)

		user.password = passwordHash

		user.name = user.name.toUpperCase()
		user.last_name = user.last_name.toUpperCase()

		return await UserRepository.createUser(user)
	} catch (error) {
		throw error
	}
}

async function updateUser(user) {
	try {
		if (user.role_id === 3 && user.responsable_id === null) {
			throw new Error('O responsável deve ser preenchido!')
		}
		const foundRole = await RoleRepository.getRole(user.role_id)
		const foundSector = await SectorRepository.getSector(user.sector_id)

		if (!foundRole) {
			throw new Error('Perfil de usuário inexistente!')
		}

		if (!foundSector) {
			throw new Error('Setor inexistente!')
		}

		user.name = user.name.toUpperCase()
		user.last_name = user.last_name.toUpperCase()

		return await UserRepository.updateUser(user)
	} catch (error) {
		throw error
	}
}

async function updateUserEmail(user) {
	try {
		const foundEmail = await UserRepository.getUserByEmail(user.email)

		if (foundEmail) {
			throw new Error('Email já cadastrado!')
		}

		if (user.email !== user.confirm_email) {
			throw new Error("Email's não conferem!")
		}

		return await UserRepository.updateUserEmail(user)
	} catch (error) {
		throw error
	}
}

async function updateUserPassword(user) {
	try {
		if (user.password !== user.confirm_password) {
			throw new Error('As senhas não conferem!')
		}

		const passwordHash = hashPassword(user.password)

		user.password = passwordHash

		return await UserRepository.updateUserPassword(user)
	} catch (error) {
		throw error
	}
}

async function getUsers() {
	return await UserRepository.getUsers()
}

async function getUser(user_id) {
	try {
		const result = await UserRepository.getUser(user_id)

		if (result === null) {
			throw new Error('Usuário inexistente!')
		}

		return result
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
}
