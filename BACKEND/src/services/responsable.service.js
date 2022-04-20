import ResponsableRepository from '../repositories/responsable.repository.js'
import UserRepository from '../repositories/user.repository.js'

async function createResponsable(responsable) {
	return await ResponsableRepository.createResponsable(responsable)
}

async function getResponsables() {
	try {
		const allResponsables = await ResponsableRepository.getResponsables()

		let completedResponsable = []

		for (let i in allResponsables) {
			const userResponsable = await UserRepository.getUser(
				allResponsables[i].user_id
			)
			completedResponsable.push({
				responsable_id: allResponsables[i].responsable_id,
				user_id: allResponsables[i].user_id,
				name: userResponsable.name,
				actived: allResponsables[i].actived,
				createdAt: allResponsables[i].createdAt,
				updatedAt: allResponsables[i].updatedAt,
			})
		}

		return completedResponsable
	} catch (error) {
		throw error
	}
}

async function getResponsable(responsable_id) {
	try {
		const result = await ResponsableRepository.getResponsable(responsable_id)

		if (result === null) {
			throw new Error('Responsável inexistente!')
		}

		const responsable = await UserRepository.getUser(responsable_id)

		let completedResponsable = []

		completedResponsable.push({
			responsable_id: result.responsable_id,
			user_id: result.user_id,
			name: responsable.name,
			actived: result.actived,
			createdAt: result.createdAt,
			updatedAt: result.updatedAt,
		})

		return completedResponsable
	} catch (error) {
		throw error
	}
}

async function disableEnable(responsable) {
	try {
		const result = await ResponsableRepository.getResponsable(
			responsable.responsable_id
		)

		if (result === null) {
			throw new Error('Responsável inexistente!')
		}

		await ResponsableRepository.disableEnable(responsable)

		return getResponsable(responsable.responsable_id)
	} catch (error) {
		throw error
	}
}

export default {
	createResponsable,
	getResponsables,
	getResponsable,
	disableEnable,
}
