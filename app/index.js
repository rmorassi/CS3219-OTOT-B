/* ----- IMPORTS ----- */

// Libraries
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose'; // for database handling

// Files
import apiRoutes from './api-routes.js';    // Used for API routing


/* ----- CONFIGURATIONS ----- */

const app = express();

// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// Connect to Mongoose
const uri = "mongodb+srv://admin:admin123@cs3219.qetensm.mongodb.net/taskB?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Select port
const port = 8080;

// API routings
app.get('/', (req, res) => res.send('Hello World with Express'));
app.use('/api', apiRoutes);


/* ----- RUN ----- */

// Check DB connection
if (!mongoose.connection) console.log("Error connecting database")
else console.log("Database connected successfully")
// Launch app
app.listen(port, function () { console.log("Running on port " + port); });


/* ----- TESTING -----*/

export default app; // to be used in testing