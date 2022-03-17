import React from 'react'
import { Link } from 'react-router-dom'
import Container from '../../components/MyContainer'
import style from '../menu/Menu.module.css'

function Menu() {
	return (
		<Container>
			<h1 style={{ textAlign: 'center' }}>Menu Principal</h1>
			<div className={style.container}>
				<section>
					<ul>
						<li>Cadastros</li>
						<ul>
							<Link to='/sector'>
								<li>Setor</li>
							</Link>
							<Link to='/unity'>
								<li>Unidade</li>
							</Link>
							<Link to='/area'>
								<li>Area</li>
							</Link>
							<Link to='perfil_usuario'>
								<li>Perfil de Usuário</li>
							</Link>
							<Link to='usuario'>
								<li>Usuário</li>
							</Link>
							<Link to='produto'>
								<li>Produto</li>
							</Link>
						</ul>
					</ul>
				</section>
				<section>
					<ul>
						<li>Requisição</li>
						<ul>
							<Link to='requisicao'>
								<li>Criar Requisição</li>
							</Link>
						</ul>
					</ul>
				</section>
				<section>
					<ul>
						<li>Relatórios/Conusltas</li>
						<ul>
							<Link to='/consultar_requisicao'>
								<li>Requisição</li>
							</Link>
						</ul>
					</ul>
				</section>
			</div>
		</Container>
	)
}

export default Menu
