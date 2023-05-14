//Import library
const mongoose = require('mongoose');
//Connect to db
mongoose.connect('mongodb://localhost/contacts_list_db');

//Acquire the connection to check if the connection is established
const db = mongoose.connection;

//error handling
db.on('error', console.error.bind(console, 'error connecting to db!'));

//if up-and-running, print the message
db.once('open', function () {
    console.log('Successfully connected to db!');
});
