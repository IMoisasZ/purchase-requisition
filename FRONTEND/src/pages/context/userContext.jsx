import { createContext, useState } from 'react'

const User = createContext()

function UserContext({ children }) {
	const [userLogado, setUserLogado] = useState('')

	const handleUserLogado = () => {
		const user = JSON.parse(localStorage.getItem('user_log'))
		setUserLogado(user)
	}

	return (
		<User.Provider value={{ userLogado, handleUserLogado }}>
			{children}
		</User.Provider>
	)
}

export { UserContext, User }
