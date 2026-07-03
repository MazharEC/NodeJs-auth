const express = require('express')
const app = express()
app.use(express.json())
const dotenv = require('dotenv')
const authRoutes = require('./routes/auth_routes')
const connectDb = require('./config/db')
dotenv.config()

app.use('/auth', authRoutes)

app.listen(process.env.PORT, () => {
    console.log('Server is running at', process.env.BASE_URL)
    connectDb()
})