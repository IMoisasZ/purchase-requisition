import React from 'react'
import Container from '../../components/MyContainer'
import FormUser from './FormUser'

function User() {
	return (
		<>
			<Container>
				<h1 style={{ textAlign: 'center' }}>Usuário</h1>
				<FormUser />
			</Container>
		</>
	)
}

export default User
