import { format, addDays } from 'date-fns'

const newDate = (date) => {
	const newdt = addDays(new Date(date), 1)
	date = format(new Date(newdt), 'dd-MM-yyyy')

	return date.toString()
}
export default newDate

// const today = () => {
// 	const newToday = new Date()
// 	const formatToday = format(newToday, 'dd-MM-yyyy')
// 	return formatToday.toString()
// }

// export default {
// 	newDate,
// 	today,
// }
