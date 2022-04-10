import React from 'react'
import Container from '../../components/container/MyContainer'
import FormUser from './FormUser'

function User() {
	return (
		<>
			<Container minHeight='40em' nameH1='Usuário'>
				<FormUser />
			</Container>
		</>
	)
}

export default User
