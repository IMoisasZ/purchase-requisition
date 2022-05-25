import { compareAsc, format } from 'date-fns'

function compare(deadLine) {
	const today = format(new Date(), 'yyyy-MM-dd')
	const result = compareAsc(new Date(deadLine), new Date(today))
	console.log(result)
	return result
}

export default compare
