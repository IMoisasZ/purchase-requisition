const newDate = (date) => {
	let dt = new Date(date)
	let day =
		(dt.getDate() + 1).toString().length === 2
			? dt.getDate() + 1
			: 0 + '' + (dt.getDate() + 1)
	let month =
		(dt.getMonth() + 1).toString().length === 2
			? dt.getMonth() + 1
			: 0 + '' + (dt.getMonth() + 1)
	let year = dt.getFullYear()
	let newDt = `${day}/${month}/${year}`
	return newDt
}

export default newDate
