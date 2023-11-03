const mongoose = require('mongoose')
const mongooseURI = 'mongodb+srv://rohitrajvns2020:rohit230301raj@todolist.8rjv21r.mongodb.net/?retryWrites=true&w=majority'

async function connectToMongo() {
    try {
        await mongoose.connect(mongooseURI)
        console.log("Connected to Mongo successfully")
    } catch (error) {
        console.log(error)
    }
}

module.exports = connectToMongo;

// const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost/cloudNotebook');

// const db = mongoose.connection;

// db.on('error', console.error.bind(console, "Error connecting to MongoDB"));


// db.once('open', function(){
//     console.log('Connected to Database :: MongoDB');
// });


// module.exports = db;
