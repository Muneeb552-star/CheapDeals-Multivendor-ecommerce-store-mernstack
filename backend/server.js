require('dotenv').config()
const express = require('express')
const cookieParser = require('cookie-parser')
const { dbConnect } = require('./utils/db')
const socket = require('socket.io')
const cors = require('cors')
const http = require('http')
const app = express()

const server = http.createServer(app)

//.env variables
const port = process.env.PORT || 3000

//Calling the DbConnect Function to start connection
dbConnect()

// Enable CORS middleware
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:3001'], // Allow requests from this specific origin
    credentials: true
}))

const io = socket(server, {
    cors: {
        origin: '*',
        credentials: true
    }
})


var allCustomer = []

const addUser = (customerId, socketId, userInfo) => {
    const checkUser = allCustomer.some(u => u.customerId === customerId)
    if (!checkUser) {
        allCustomer.push({
            customerId,
            socketId,
            userInfo
        })
    }
}

io.on('connection', (soc) => {
    console.log('Socket Server is connected....')

    soc.on('add_user', (customerId, userInfo) => {
        addUser(customerId, soc.id, userInfo)
        // console.log(userInfo)
    })
})


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
app.use('/api', require('./routes/chatRoutes'))
// Dashborad Route handlers
app.use('/api', require('./routes/authRoutes'))
app.use('/api', require('./routes/dashboard/sellerRoutes'))
app.use('/api', require('./routes/dashboard/categoryRoutes'))
app.use('/api', require('./routes/dashboard/productRoutes'))
app.get('/', (req, res) => res.send('Hello World!'))

// Start the server http://localhost:
server.listen(port, () => console.log(`Server started on port http://localhost:${port}`))



