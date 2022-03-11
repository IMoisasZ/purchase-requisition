import React from 'react'
import { Link } from 'react-router-dom'
import MenuBookSharpIcon from '@mui/icons-material/MenuBookSharp'
import FormSetor from './FormSetor'

function Setor() {
	return (
		<>
			<Link to='/menu'>
				<button width='1em' border='none' title='Voltar ao menu'>
					<MenuBookSharpIcon />
				</button>
			</Link>
			<h1 style={{ textAlign: 'center' }}>Setor</h1>
			<FormSetor />
		</>
	)
}

export default Setor
