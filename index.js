const express = require('express')
const dotenv = require('dotenv')
const {dbConnection} = require('./config/db.js')
const materialRoutes = require('./routes/materialRoutes')
const productRoutes = require('./routes/productRoutes')
const partRoutes = require('./routes/partRoutes')
const calculateMaterialsRoutes = require('./routes/calculateMaterialsRoutes')
const cors = require('cors')
const session = require('express-session')
const authRoutes = require('./routes/authRoutes')
const authMiddleware = require('./middlewares/authMiddleware')

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000
dbConnection() 

app.use(express.json())

app.use(cors({
  origin: 'https://almacenesca.netlify.app',
  credentials: true
}))

app.use(session({
  secret: 'tu_clave_secreta_segura',
  resave: false,
  saveUninitialized: false
}))

app.use(express.urlencoded({ extended: true }))
app.use('/api', authRoutes)
app.use('/admin', authMiddleware, express.static('admin'))

app.use('/api/materials', materialRoutes)
app.use('/api/products', productRoutes)
app.use('/api/parts', partRoutes)
app.use('/api', calculateMaterialsRoutes)

app.get('/', (req, res) => {
  res.send('API working correctly')
})

app.use((req, res) => {
  res.status(404).send('Page not found')
})

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`)
})