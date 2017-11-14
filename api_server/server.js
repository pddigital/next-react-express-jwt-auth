const express = require('express')
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const port = 4500
const cors = require('cors')
const app = express()
const cookieParser = require('cookie-parser')
const masterRoutes = require('./routes/masterRoutes');


const corsOptions = {
    origin: ['http://localhost:4400'],
    default: 'http://localhost:4400',
    credentials: true
  }
  
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(cookieParser())

masterRoutes(app);

app.listen(port, "0.0.0.0", () => console.log(`API is listening on port ${port}`))