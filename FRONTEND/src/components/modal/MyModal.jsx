import * as React from 'react'
import ButtonModal from '@mui/material/Button'
import Button from '../button/MyButton'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Slide from '@mui/material/Slide'

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction='up' ref={ref} {...props} />
})

export default function MyModal({ requisition, hideButton, type, message }) {
	const [open, setOpen] = React.useState(false)

	const handleClickOpen = () => {
		setOpen(true)
	}

	const handleClose = () => {
		setOpen(false)
	}

	const handleSave = () => {
		requisition()
		handleClose()
		type('success')
		message('Requisição incluída com sucesso!')
		setTimeout(() => {
			type(undefined)
			message(undefined)
		}, 2000)
	}

	return (
		<div>
			<Button
				width='9em'
				height='1.5em'
				marginBottom='0'
				marginTop='0.7em'
				type='button'
				handleClick={handleClickOpen}
				hide={hideButton}>
				Salvar Requisição
			</Button>
			<Dialog
				open={open}
				TransitionComponent={Transition}
				keepMounted
				onClose={handleClose}
				aria-describedby='alert-dialog-slide-description'>
				<DialogTitle>{'Requisição de copras!'}</DialogTitle>
				<DialogContent>
					<DialogContentText id='alert-dialog-slide-description'>
						Deseja salvar a requisição?
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<ButtonModal onClick={handleClose}>Cancelar</ButtonModal>
					<ButtonModal onClick={handleSave}>Salvar</ButtonModal>
				</DialogActions>
			</Dialog>
		</div>
	)
}
