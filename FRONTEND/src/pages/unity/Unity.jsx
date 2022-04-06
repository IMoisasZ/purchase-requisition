import React from 'react'
import Container from '../../components/MyContainer'
import FormUnity from './FormUnity'

function Unity() {
	return (
		<Container minHeight='72vh' maxWidth='100%'>
			<h1 style={{ textAlign: 'center' }}>Unidade</h1>
			<FormUnity />
		</Container>
	)
}

export default Unity
