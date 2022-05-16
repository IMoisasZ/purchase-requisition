import React from 'react'
import MyRoute from './routes/MyRoute'
import { UserContext } from './context/userContext'

function App() {
	const theme = 'dark'
	return (
		<UserContext value={theme}>
			<div
				style={{
					fontFamily: `Segoe UI, Tahoma, Geneva, Verdana, sans - serif`,
				}}>
				<MyRoute></MyRoute>
			</div>
		</UserContext>
	)
}

export default App
