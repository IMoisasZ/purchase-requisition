import React from 'react'
import Container from '../../components/container/MyContainer'
import FormLogin from './FormLogin'
import api from '../../api/api'

function Login() {
	return (
		<Container nameH1='Login' hideIcon={true}>
			<FormLogin />
		</Container>
	)
}

export default Login
