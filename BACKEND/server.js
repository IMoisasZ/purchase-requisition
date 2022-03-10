import app from './app.js'
import dbConnection from './src/connections/db.connection.js'

const PORT = 3001

app.listen(PORT, () => console.log(`SERVER RUN AT PORT ${PORT}`))
try {
	await dbConnection.authenticate()
	console.log('Connection has been established successfully.')
} catch (error) {
	console.error('Unable to connect to the database:', error)
}
