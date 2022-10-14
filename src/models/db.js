// const MongoClient = require("mongodb").MongoClient;
// const objectID = require('mongodb').objectID;
// const dbName = "online_auction";
// const url = "mongodb+srv://m001-student:m001-mongodb-basics@sandbox.znq905e.mongodb.net/?retryWrites=true&w=majority";
// const mongoOptions = {useNewUrlParser: true};

// const state = {
//     db: null
// };

// const connect = (cb) => {
//     if (state.db) {
//         cb();
//     } else {
//         MongoClient.connect(url, mongoOptions, (err, client) => {
//             if (err) {
//                 cb(err);
//             } else {
//                 state.db = client.db(dbName);
//                 cb();
//             }
//         });
//     }
// }

// const primarykey = (_id) => {
//     return objectID(_id);
// }

// const getdb = () => {
//     return state.db;
// }

// module.exports = {connect, primarykey, getdb};
// const mongoose = require('mongoose');


// const connect = 