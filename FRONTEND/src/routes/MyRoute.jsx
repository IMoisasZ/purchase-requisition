import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import NavBar from '../components/navbar/MyNavBar'
import Footer from '../components/footer/Footer'
import Home from '../pages/home/Home'
import Login from '../pages/login/Login'
import Menu from '../pages/menu/Menu'
import Sector from '../pages/sector/Sector'
import Unity from '../pages/unity/Unity'
import Area from '../pages/area/Area'
import Role from '../pages/role/Role'
import Product from '../pages/product/Product'
import CostCenter from '../pages/cost_center/CostCenter'
import User from '../pages/user/User'
import Responsable from '../pages/responsable/Responsable'
import Requisition from '../pages/requisition/Requisition'
import ConsultRequisition from '../pages/requisition/ConsultRequisition'

function KfpRoutes({ children }) {
	return (
		<>
			<Router>
				<NavBar /> {children}
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/login' element={<Login />} />
					<Route path='/menu' element={<Menu />} />
					<Route path='/sector' element={<Sector />} />
					<Route path='/unity' element={<Unity />} />
					<Route path='/area' element={<Area />} />
					<Route path='/role' element={<Role />} />
					<Route path='/product' element={<Product />} />
					<Route path='/cost-center' element={<CostCenter />} />
					<Route path='/user' element={<User />} />
					<Route path='/responsable' element={<Responsable />} />
					<Route path='/requisition' element={<Requisition />} />
					<Route path='/requisition/consult' element={<ConsultRequisition />} />
				</Routes>
				<Footer />
			</Router>
		</>
	)
}

export default KfpRoutes
