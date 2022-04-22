import { format, addDays } from 'date-fns'

const newDate = (date) => {
	const newdt = addDays(new Date(date), 1)
	date = format(new Date(newdt), 'dd-MM-yyyy')

	return date
}

export default newDate
