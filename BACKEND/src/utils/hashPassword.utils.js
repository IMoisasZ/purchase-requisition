import bcrypt from 'bcrypt'

function hashPassword(password) {
	const hash = bcrypt.hashSync(password, 12)
	return hash
}

export default hashPassword
