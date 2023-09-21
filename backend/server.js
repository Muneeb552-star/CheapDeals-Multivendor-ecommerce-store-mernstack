require('dotenv').config()
const express = require('express')
const cookieParser = require('cookie-parser')
const { dbConnect } = require('./utils/db')
const cors = require('cors');
const app = express()

//.env variables
const port = process.env.PORT || 3000

//Calling the DbConnect Function to start connection
dbConnect()

// Enable CORS middleware
app.use(cors({
    origin: ['http://localhost:3000'], // Allow requests from this specific origin
    credentials: true
}))

// Middleware function parse incoming requests 
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

// Client Route handlers
app.use('/api/home', require('./routes/home/homeRoutes'))
app.use('/api/customer', require('./routes/home/customerAuthRoutes'))
app.use('/api/home', require('./routes/home/cartRoutes'))
// Client/order Route handlers
app.use('/api/home', require('./routes/order/orderRoutes'))
// Dashborad Route handlers
app.use('/api', require('./routes/authRoutes'))
app.use('/api', require('./routes/dashboard/sellerRoutes'))
app.use('/api', require('./routes/dashboard/categoryRoutes'))
app.use('/api', require('./routes/dashboard/productRoutes'))
app.get('/', (req, res) => res.send('Hello World!'))

// Start the server http://localhost:
app.listen(port, () => console.log(`Server started on port http://localhost:${port}`))



