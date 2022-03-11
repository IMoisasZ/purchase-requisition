import UnityRepository from '../repositories/unity.repository.js'

async function createUnity(unity) {
	try {
		unity.unity_tag = unity.unity_tag.toUpperCase()
		unity.description = unity.description.toUpperCase()

		return await UnityRepository.createUnity(unity)
	} catch (error) {
		throw error
	}
}

async function updateUnity(unity) {
	try {
		unity.unity_tag = unity.unity_tag.toUpperCase()
		unity.description = unity.description.toUpperCase()

		return await UnityRepository.updateUnity(unity)
	} catch (error) {
		throw error
	}
}

async function getUnits() {
	return await UnityRepository.getUnits()
}

async function getUnity(unity_id) {
	try {
		const result = await UnityRepository.getUnity(unity_id)

		if (result === null) {
			throw new Error('A unidade não existe!')
		}

		return result
	} catch (error) {}
}

export default {
	createUnity,
	updateUnity,
	getUnits,
	getUnity,
}
