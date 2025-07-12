const express = require('express')
const dotenv = require('dotenv')
const {dbConnection} = require('./config/db.js')
const materialRoutes = require('./routes/materialRoutes')

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000
dbConnection()

app.use(express.json())

app.use('/api/materials', materialRoutes)

app.get('/', (req, res) => {
  res.send('API working correctly')
})

app.use((req, res) => {
  res.status(404).send('Page not found')
})

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`)
})