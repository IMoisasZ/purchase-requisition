export function SectorDefault() {
	return {
		sector: 'ADMINISTRACAO',
		actived: true,
	}
}

export function roleDefault() {
	return [
		{
			role: 'MASTER',
			actived: true,
		},
		{
			role: 'ADMIN',
			actived: true,
		},
		{
			role: 'USER',
			actived: true,
		},
	]
}

export function userDefault() {
	return {
		name: 'MOISES',
		last_name: 'SANTOS',
		sector_id: 1,
		role_id: 1,
		responsable_id: null,
		email: 'devimoisasz@gmail.com',
		password: '123456',
		confirm_password: '123456',
		actived: true,
	}
}
