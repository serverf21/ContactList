const express = require('express');
const path = require('path');
//server
const port = 8000;

//add to mongoDB
const db = require('./config/mongoose');
const Contact = require('./models/contact');

//fire up express
const app = express();

//Step - 1: install ejs
//Step - 2: setting up ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
//using body parser - it is a MIDDLEWARE
app.use(express.urlencoded());

app.use(express.static('assets'));
//it will find out a folder called assets and load all the styling and decoration


// //middleware to print something on the console
// app.use(function (req, res, next) {
//     req.myName = "Sarvagya";
//     // console.log('Printing middleware called');
//     next();
// });

// //middleware 2
// app.use(function (req, res, next) {
//     console.log("My name: ", req.myName);
//     console.log("Dusra Middleware called");
//     next();
// });

var contactList = [
    {
        name: "Arpan",
        phone: 123456789
    },
    {
        name: "Tony Stark",
        phone: "1919191919"
    },
    {
        name: "Lucifer",
        phone: 007007007007
    }
]

app.get('/', function (req, res) {
    // console.log(req.myName);
    //collect all contacts stored in db and display them here

    // Contact.find({}, function (err, contacts) {
    //     if (err) {
    //         console.log("Error in fetching from DB");
    //         return;
    //     }
    //     return res.render('home', {
    //         title: "Sarvagya's contacts",
    //         contact_list: contactList
    //     });
    // });

    //New Method since the mongoose function doesn't accept callbacks
    Contact.find({}).then((contacts) => {
        console.log("Procuring from DB");
        return res.render('home', {
            title: "Sarvagya's contacts",
            contact_list: contacts
        });
    }).catch(() => {
        console.log("Error in fetching from DB");
    })
});

app.get('/practice', function (req, res) {
    return res.render('practice', {
        title: "Play With Me!"
    });
});

app.post('/create-contact', function (req, res) {
    // console.log(req.body);
    // contactList.push({
    //     name: req.body.name,
    //     phone: req.body.phone
    // });
    // Contact.create({
    //     name: req.body.name,
    //     phone: req.body.phone
    // }, function (err, newContact) {
    //     if (err) {
    //         console.log('error in creating a contact');
    //         return;
    //     }
    //     console.log('******', newContact);
    //     return res.redirect('back');
    // }
    // );

    //Improvised method since Mongoose doesn't accept callbacks
    let cont = new Contact({
        name: req.body.name,
        phone: req.body.phone
    });
    cont.save().then(() => {
        console.log(cont);
        // res.send("This item has been saved to Mongo database");
        res.status(200).redirect('/');
        // alert('Data has been saved')
    }).catch(() => {
        res.status(400).send("Item couldn't be saved to the database");
    })

    //or return res.redirect('./');
    // return res.redirect('/practice');
});

//for deleting a contact
app.get('/delete-contact/', function (req, res) {
    //use either query param or string param
    //get the id made by mongodb from query in url
    let id = req.query.id;
    //find contact in the database having that id
    //and delete it and render back
    Contact.findByIdAndDelete(id).then(() => {
        console.log("deleted", id);
        // res.send("This item has been saved to Mongo database");
        res.status(200).redirect('/');
        // alert('Data has been saved')
    }).catch(() => {
        res.status(400).send("Item couldn't be saved to the database");
    })
});

app.listen(port, function (err) {
    if (err) { console.log("Error", err); }
    console.log("Yup! My express server is running on port: ", port);
});