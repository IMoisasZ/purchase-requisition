import SkipPreviousIcon from '@mui/icons-material/SkipPrevious'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import SkipNextIcon from '@mui/icons-material/SkipNext'

import style from './ButtonPagination.module.css'
function ButtonPagination({
	pages,
	currentPage,
	handleCurrentPage,
	handleOnFirstPage,
	handleOnPrevPage,
	handleOnNextPage,
	handleOnLastPage,
}) {
	return (
		<div className={style.container}>
			<button onClick={handleOnFirstPage}>
				<SkipPreviousIcon />
			</button>
			<button onClick={handleOnPrevPage}>
				<KeyboardArrowLeftIcon />
			</button>
			{Array.from(Array(pages), (item, index) => {
				return (
					<button
						key={index}
						value={index}
						onClick={handleCurrentPage}
						style={
							currentPage === index
								? {
										backgroundColor: '#4682b4',
										borderRadius: '1em',
										color: 'white',
								  }
								: null
						}>
						{index + 1}
					</button>
				)
			})}
			<button onClick={handleOnNextPage}>
				<NavigateNextIcon />
			</button>
			<button onClick={handleOnLastPage}>
				<SkipNextIcon />
			</button>
		</div>
	)
}

export default ButtonPagination
