//const path = require('path')
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

const corsOptions = {
    origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

// const publicDirectoryPath   =  path.join(__dirname,'/public')
// const viewsPath             =  path.join(__dirname,'/public/views')

// app.set('view engine','hbs')
// app.set('views',viewsPath)

//Set up Static Views Location
//app.use(express.static(publicDirectoryPath))


const db = require("./src/models");
// db.sequelize.sync();

//  db.sequelize.sync({ force: true }).then(() => {
//    console.log("Drop and re-sync db.");
//  });

// route

const login = require('./src/routes/login.routes');
const register = require('./src/routes/registration.routes');
const customer = require("./src/routes/customer.routes");
const contacts = require("./src/routes/contacts.routes");
const states = require("./src/routes/statemaster.routes");

app.use('/api', login);
app.use('/api', register);
app.use('/api', customer);
app.use('/api', contacts);
app.use('/api', states);

// set port, listen for requests
require('dotenv').config();
const PORT = process.env.EXPRESS_SERVER_PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});