import React from 'react'
import Container from '../../components/MyContainer'
import TableResponsable from './TableResponsable'

function Responsable() {
	return (
		<>
			<Container>
				<h1 style={{ textAlign: 'center' }}>Responsáveis</h1>
				<TableResponsable />
			</Container>
		</>
	)
}

export default Responsable
