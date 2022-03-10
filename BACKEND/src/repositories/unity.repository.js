import UnityModel from '../models/unity.model.js'

async function createUnity(unity) {
	try {
		const newUnity = await UnityModel.create(unity)
		return await getUnity(newUnity.unity_id)
	} catch (error) {
		throw error
	}
}

async function updateUnity(unity) {
	try {
		await UnityModel.update(unity, {
			where: {
				unity_id: unity.unity_id,
			},
		})
		return await getUnity(unity.unity_id)
	} catch (error) {
		throw error
	}
}

async function getUnits() {
	try {
		return await UnityModel.findAll()
	} catch (error) {
		throw error
	}
}

async function getUnity(unity_id) {
	try {
		return await UnityModel.findByPk(unity_id)
	} catch (error) {
		throw error
	}
}

async function getUnityByDescription(unity) {
	try {
		return await UnityModel.findOne({
			where: {
				description: unity,
			},
		})
	} catch (error) {
		throw error
	}
}

async function getUnityByTag(unity) {
	try {
		return await UnityModel.findOne({
			where: {
				unity_tag: unity,
			},
		})
	} catch (error) {
		throw error
	}
}

export default {
	createUnity,
	updateUnity,
	getUnits,
	getUnity,
	getUnityByDescription,
	getUnityByTag,
}
