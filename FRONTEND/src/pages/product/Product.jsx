import React from 'react'
import Container from '../../components/MyContainer'
import FormProduct from './FormProduct'

function Product() {
	return (
		<>
			<Container>
				<h1 style={{ textAlign: 'center' }}>Produto</h1>
				<FormProduct />
			</Container>
		</>
	)
}

export default Product
