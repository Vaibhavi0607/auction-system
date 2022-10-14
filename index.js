const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// const cors = require('cors');
const app = express();
require('dotenv/config');

const userRoutes = require('./src/routes/usersRoutes.js');
const productRoutes = require('./src/routes/productRoutes.js');
const mongoOptions = {useNewUrlParser: true};

app.use(bodyParser.json());
app.use('/users', userRoutes);
app.use('/products', productRoutes);
// app.use(express.static('public'));
// app.use(express.static('files'))
// app.use(bodyParser.urlencoded({ extended:true }));

// const db = require('./models/db');
// var collection = null;

//app.use(cors);

// db.connect((err) => {
//     if (err) {
//         console.log('Unable to connect database');
//         process.exit(1);   //why 1?
//     } else {
//         yourdb = db.getdb();
//         collection = yourdb.collection()
//         console.log(collection)
//         app.listen(3000, () => {
//             console.log('Connected to database, listening to port 3000...');
//         });
//     }
// });

app.get('/', (req, res) => {
    return res.send('Hello');
});

mongoose.connect(process.env.MONGOURL, mongoOptions, () => {
    console.log('Connected to db')
});
app.listen(3000, () => {
    console.log('Listening on port 3000')
})
