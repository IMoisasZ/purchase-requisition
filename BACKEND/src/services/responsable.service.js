import ResponsableRepository from '../repositories/responsable.repository.js'

async function createResponsable(responsable) {
	return await ResponsableRepository.createResponsable(responsable)
}

async function getResponsables() {
	return await ResponsableRepository.getResponsables()
}

async function getResponsable(responsable_id) {
	try {
		const result = await ResponsableRepository.getResponsable(responsable_id)

		if (result === null) {
			throw new Error('Responsável inexistente!')
		}

		return result
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

		return await ResponsableRepository.disableEnable(responsable)
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
