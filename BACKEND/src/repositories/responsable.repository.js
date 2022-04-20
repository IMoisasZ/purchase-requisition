import ResponsableModel from '../models/responsable.model.js'

async function createResponsable(responsable) {
	try {
		const newResponsable = await ResponsableModel.create(responsable)
		return await getResponsable(newResponsable.responsable_id)
	} catch (error) {
		throw error
	}
}

async function getResponsables() {
	try {
		return await ResponsableModel.findAll()
	} catch (error) {
		throw error
	}
}

async function getResponsable(responsable_id) {
	try {
		return await ResponsableModel.findByPk(responsable_id)
	} catch (error) {
		throw error
	}
}

async function disableEnable(responsable) {
	try {
		await ResponsableModel.update(
			{
				responsable_id: responsable.responsable_id,
				actived: responsable.actived,
			},
			{
				where: {
					responsable_id: responsable.responsable_id,
				},
			}
		)
		return await getResponsable(responsable.responsable_id)
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
