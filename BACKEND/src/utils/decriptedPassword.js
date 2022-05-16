import { compareSync } from 'bcrypt'

function decriptedPassword(password, hashPassword) {
	return compareSync(password, hashPassword)
}

export default decriptedPassword
