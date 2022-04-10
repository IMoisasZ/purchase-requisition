import React from 'react'
import Container from '../../components/container/MyContainer'
import FormLogin from './FormLogin'

function Login() {
	return (
		<Container nameH1='Login' hideIcon={true}>
			<FormLogin />
		</Container>
	)
}

export default Login
