import React, { useEffect, useState } from 'react'
import Input from '../../components/input/MyInput'
import Select from '../../components/select/MySelect'
import CheckBox from '../../components/checkBox/MyCheckBox'
import Button from '../../components/button/MyButton'
import api from '../../api/api'

function FormArea() {
	const [id, setId] = useState('')
	const [area, setArea] = useState('')
	const [sector, setSector] = useState('')
	const [actived, setActived] = useState(true)
	const [listSector, setListSector] = useState([])

	useEffect(() => {
		const allSector = async () => {
			const result = await api.get('/sector')
			setListSector(result.data)
		}
		allSector()
	}, [])

	return (
		<div>
			<form>
				<Input
					label='ID'
					name='id'
					value={id}
					type='numeric'
					placeholder='ID'
					disable={true}
					handleChange={(e) => setId(e.target.value)}
				/>
				<Input
					label='Area'
					name='area'
					value={area}
					type='text'
					placeholder='Digite a area'
					disable={false}
					handleChange={(e) => setArea(e.target.value)}
				/>
				<Select
					text='Setor'
					name='sector'
					value={sector}
					handleChange={(e) => setSector(e.target.value)}
					initial_text='Escolha um setor...'>
					{listSector.map((sector) => {
						return (
							<option key={sector.sector_id} value={sector.sector_id}>
								{sector.sector}
							</option>
						)
					})}
				</Select>
				<CheckBox
					name='actived'
					label='Ativo'
					value={actived}
					checked={actived && true}
					togleChange={(e) => setActived(e.target.value)}
				/>
				<Button>Incluir</Button>
			</form>
		</div>
	)
}

export default FormArea
