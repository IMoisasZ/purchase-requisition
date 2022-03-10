import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import NavBar from '../components/navbar/MyNavBar'
import Footer from '../components/footer/Footer'
import Home from '../pages/home/Home'
import Login from '../pages/login/Login'
import Menu from '../pages/menu/Menu'
import Setor from '../pages/setor/Setor'
import Unity from '../pages/unity/Unity'

function KfpRoutes({ children }) {
	return (
		<>
			<Router>
				<NavBar /> {children}
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/login' element={<Login />} />
					<Route path='/menu' element={<Menu />} />
					<Route path='/setor' element={<Setor />} />
					<Route path='/unity' element={<Unity />} />
				</Routes>
				<Footer />
			</Router>
		</>
	)
}

export default KfpRoutes
