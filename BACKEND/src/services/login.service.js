import UserRepository from '../repositories/user.repository.js'
import decriptedPassword from '../utils/decriptedPassword.js'
import hashPassword from '../utils/hashPassword.utils.js'

async function Login(email, password) {
	try {
		const user = await UserRepository.getUserByEmail(email)
		if (!user) {
			throw new Error('Email e ou senha não conferem!')
		}

		if (!decriptedPassword(password, user.password)) {
			throw new Error('Email e ou senha não conferem!')
		}

		user.password = undefined

		return user
	} catch (error) {
		throw error
	}
}

export default {
	Login,
}
