import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import WarehouseIcon from '@mui/icons-material/Warehouse'
import BalanceSharpIcon from '@mui/icons-material/BalanceSharp'
import Crop54Icon from '@mui/icons-material/Crop54'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import ViewInArSharpIcon from '@mui/icons-material/ViewInArSharp'
import AdjustSharpIcon from '@mui/icons-material/AdjustSharp'
import LocalPoliceSharpIcon from '@mui/icons-material/LocalPoliceSharp'
import PersonIcon from '@mui/icons-material/Person'
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered'
import Container from '../../components/container/MyContainer'
import style from '../menu/Menu.module.css'

function Menu() {
	const [hideLink, setHideLink] = useState(false)

	const user = JSON.parse(localStorage.getItem('user_log'))

	return (
		<Container minHeight='69vh' hideIcon={true} nameH1='Menu Principal'>
			{user.data.role_id === 1 && (
				<div className={style.container}>
					<section>
						<ul>
							<li>Cadastros</li>
							<ul>
								<Link
									to='/sector'
									style={{ textDecoration: 'none' }}
									hidden={hideLink}>
									<div className={style.menu}>
										<WarehouseIcon />
										<li>Setor</li>
									</div>
								</Link>
								<Link to='/unity'>
									<div className={style.menu}>
										<BalanceSharpIcon />
										<li>Unidade</li>
									</div>
								</Link>
								<Link to='/area'>
									<div className={style.menu}>
										<Crop54Icon />
										<li>Area</li>
									</div>
								</Link>
								<Link to='/role'>
									<div className={style.menu}>
										<AccountBoxIcon />
										<li>Perfil de Usuário</li>
									</div>
								</Link>
								<Link to='/user'>
									<div className={style.menu}>
										<PersonIcon />
										<li>Usuário</li>
									</div>
								</Link>
								<Link to='/product'>
									<div className={style.menu}>
										<ViewInArSharpIcon />
										<li>Produto</li>
									</div>
								</Link>
								<Link to='/cost-center'>
									<div className={style.menu}>
										<AdjustSharpIcon />
										<li>Centro de Custos</li>
									</div>
								</Link>
								<Link to='/responsable'>
									<div className={style.menu}>
										<LocalPoliceSharpIcon />
										<li>Responsáveis</li>
									</div>
								</Link>
							</ul>
						</ul>
					</section>
					<section>
						<ul>
							<li>Requisição</li>
							<ul>
								<Link to='/requisition'>
									<div className={style.menu}>
										<FormatListNumberedIcon />
										<li>Criar/Consultar Requisição</li>
									</div>
								</Link>
							</ul>
						</ul>
					</section>
				</div>
			)}
			{user.data.role_id === 2 && (
				<div className={style.container}>
					<section>
						<ul>
							<li>Cadastros</li>
							<ul>
								<Link to='/sector' style={{ textDecoration: 'none' }}>
									<div className={style.menu}>
										<WarehouseIcon />
										<li>Setor</li>
									</div>
								</Link>
								<Link to='/unity'>
									<div className={style.menu}>
										<BalanceSharpIcon />
										<li>Unidade</li>
									</div>
								</Link>
								<Link to='/area'>
									<div className={style.menu}>
										<Crop54Icon />
										<li>Area</li>
									</div>
								</Link>
								{/* <Link to='/role'>
									<div className={style.menu}>
										<AccountBoxIcon />
										<li>Perfil de Usuário</li>
									</div>
								</Link> */}
								<Link to='/user'>
									<div className={style.menu}>
										<PersonIcon />
										<li>Usuário</li>
									</div>
								</Link>
								<Link to='/product'>
									<div className={style.menu}>
										<ViewInArSharpIcon />
										<li>Produto</li>
									</div>
								</Link>
								<Link to='/cost-center'>
									<div className={style.menu}>
										<AdjustSharpIcon />
										<li>Centro de Custos</li>
									</div>
								</Link>
								<Link to='/responsable'>
									<div className={style.menu}>
										<LocalPoliceSharpIcon />
										<li>Responsáveis</li>
									</div>
								</Link>
							</ul>
						</ul>
					</section>
					<section>
						<ul>
							<li>Requisição</li>
							<ul>
								<Link to='/requisition'>
									<div className={style.menu}>
										<FormatListNumberedIcon />
										<li>Criar/Consultar Requisição</li>
									</div>
								</Link>
							</ul>
						</ul>
					</section>
				</div>
			)}
			{user.data.role_id === 3 && (
				<div className={style.container}>
					<section>
						<ul>
							<li>Cadastros</li>
							<ul>
								{/* <Link
									to='/sector'
									style={{ textDecoration: 'none' }}
									hidden={hideLink}>
									<div className={style.menu}>
										<WarehouseIcon />
										<li>Setor</li>
									</div>
								</Link> */}
								<Link to='/unity'>
									<div className={style.menu}>
										<BalanceSharpIcon />
										<li>Unidade</li>
									</div>
								</Link>
								{/* <Link to='/area'>
									<div className={style.menu}>
										<Crop54Icon />
										<li>Area</li>
									</div>
								</Link>
								<Link to='/role'>
									<div className={style.menu}>
										<AccountBoxIcon />
										<li>Perfil de Usuário</li>
									</div>
								</Link>
								<Link to='/user'>
									<div className={style.menu}>
										<PersonIcon />
										<li>Usuário</li>
									</div>
								</Link> */}
								<Link to='/product'>
									<div className={style.menu}>
										<ViewInArSharpIcon />
										<li>Produto</li>
									</div>
								</Link>
								{/* <Link to='/cost-center'>
									<div className={style.menu}>
										<AdjustSharpIcon />
										<li>Centro de Custos</li>
									</div>
								</Link>
								<Link to='/responsable'>
									<div className={style.menu}>
										<LocalPoliceSharpIcon />
										<li>Responsáveis</li>
									</div>
								</Link> */}
							</ul>
						</ul>
					</section>
					<section>
						<ul>
							<li>Requisição</li>
							<ul>
								<Link to='/requisition'>
									<div className={style.menu}>
										<FormatListNumberedIcon />
										<li>Criar/Consultar Requisição</li>
									</div>
								</Link>
							</ul>
						</ul>
					</section>
				</div>
			)}
		</Container>
	)
}

export default Menu
