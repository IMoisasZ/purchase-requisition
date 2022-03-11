import React from 'react'
import { Link } from 'react-router-dom'
import Button from '../../components/button/MyButton'
import MenuBookSharpIcon from '@mui/icons-material/MenuBookSharp'
import FormUnity from './FormUnity'

function Unity() {
	return (
		<>
			<div>
				<Link to='/menu'>
					<button width='1em' border='none' title='Voltar ao menu'>
						<MenuBookSharpIcon />
					</button>
				</Link>
			</div>
			<h1 style={{ textAlign: 'center' }}>Unidade</h1>
			<FormUnity />
		</>
	)
}

export default Unity
