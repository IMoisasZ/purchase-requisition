import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import Stack from '@mui/material/Stack'
import { deepOrange, deepPurple } from '@mui/material/colors'

export default function MyAvatar({ children, title }) {
	console.log(children)
	return (
		<Stack direction='row' spacing={2} title={title}>
			<Avatar sx={{ bgcolor: deepOrange[500] }}>{children}</Avatar>
		</Stack>
	)
}
