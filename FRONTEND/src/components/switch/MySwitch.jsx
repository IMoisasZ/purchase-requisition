import * as React from 'react'
import Switch from '@mui/material/Switch'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'

export default function MySwitch({ toogleOnOf, labelSwitch }) {
	const newLabel = labelSwitch ? 'Mostrar Filtros' : 'Esconder Filtros'
	return (
		<FormControl component='fieldset'>
			<FormGroup aria-label='position' row>
				<FormControlLabel
					value='start'
					control={<Switch color='primary' />}
					label={newLabel}
					labelPlacement='start'
					onClick={toogleOnOf}
				/>
			</FormGroup>
		</FormControl>
	)
}
