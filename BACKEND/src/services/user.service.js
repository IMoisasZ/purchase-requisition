import UserRepository from '../repositories/user.repository.js'
import RoleRepository from '../repositories/role.repository.js'
import SectorRepository from '../repositories/sector.repository.js'
import hashPassword from '../utils/hashPassword.utils.js'
import ResponsableRepository from '../repositories/responsable.repository.js'

async function createUser(user) {
	try {
		if (Number(user.role_id) === 3 && user.responsable_id === '') {
			throw new Error('O responsável deve ser preenchido!')
		}

		const foundRole = await RoleRepository.getRole(user.role_id)
		const foundSector = await SectorRepository.getSector(user.sector_id)

		if (foundRole === null) {
			throw new Error('Perfil de usuário inexistente!')
		}

		if (foundSector === null) {
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
	console.log(user.responsable_id)
	try {
		if (user.role_id === 3 && user.responsable_id === undefined) {
			throw new Error('O responsável deve ser preenchido!')
		}
		const foundRole = await RoleRepository.getRole(user.role_id)
		const foundSector = await SectorRepository.getSector(user.sector_id)

		if (foundRole === null) {
			throw new Error('Perfil de usuário inexistente!')
		}

		if (foundSector === null) {
			throw new Error('Setor inexistente!')
		}

		if (user.password !== user.confirm_password) {
			throw new Error('As senhas não conferem!')
		}
		const passwordHash = hashPassword(user.password)

		user.password = passwordHash

		user.name = user.name.toUpperCase()
		user.last_name = user.last_name.toUpperCase()

		return await UserRepository.updateUser(user)
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

async function disableEnable(user) {
	try {
		const result = await UserRepository.getUser(user.user_id)

		if (result === null) {
			throw new Error('Usuário inexistente!')
		}

		return await UserRepository.disableEnable(user)
	} catch (error) {
		throw error
	}
}

export default {
	createUser,
	updateUser,
	getUsers,
	getUser,
	disableEnable,
}
