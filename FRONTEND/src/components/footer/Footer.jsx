import React from 'react'
import style from '../footer/Footer.module.css'

function Footer() {
	return (
		<footer className={style.container}>
			<div className={style.div_injetaq}>
				<p>
					Injetaq Idústria e Comércio Ltda <span>&copy; 2022</span>
				</p>
			</div>
		</footer>
	)
}

export default Footer
