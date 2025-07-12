const express = require('express')
const dotenv = require('dotenv')
const {dbConnection} = require('./config/db.js')

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000
dbConnection()

app.use(express.json())

app.get('/', (req, res) => {
  res.send('API funcionando correctamente')
})

app.use((req, res) => {
  res.status(404).send('Página no encontrada')
})

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`)
})