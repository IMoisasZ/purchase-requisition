import * as React from 'react'
import Table from '@mui/material/Table'
import TableContainer from '@mui/material/TableContainer'
import Paper from '@mui/material/Paper'
import style from './MyTable.module.css'

export default function MyTable({ children, height = '30%' }) {
	return (
		<TableContainer
			component={Paper}
			className={style.container}
			style={{ height }}>
			<Table sx={{ minWidth: 650 }} size='small' aria-label='a dense table'>
				{children}
			</Table>
		</TableContainer>
	)
}
