import { hashSync } from 'bcrypt'

function hashPassword(password) {
	const hash = hashSync(password, 12)
	return hash
}

export default hashPassword
