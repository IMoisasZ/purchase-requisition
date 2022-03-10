import style from '../pagination/SelectPagination.module.css'
function SelectPagination({ handleOnChange }) {
	return (
		<div className={style.container}>
			<label htmlFor='number_pages'>Itens por página</label>
			<select
				onChange={handleOnChange}
				name='number_pages'
				id='number_pages'
				defaultValue={2}>
				<option value={2}>2</option>
				<option value={5}>5</option>
				<option value={8}>8</option>
			</select>
		</div>
	)
}

export default SelectPagination
