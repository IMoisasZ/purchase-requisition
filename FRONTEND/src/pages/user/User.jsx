import React from 'react'
import Container from '../../components/MyContainer'
import FormUser from './FormUser'

function User() {
	return (
		<>
			<Container minHeight='40em'>
				<h1 style={{ textAlign: 'center', margin: '0' }}>Usuário</h1>
				<FormUser />
			</Container>
		</>
	)
}

export default User
