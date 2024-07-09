const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require("./routes/user");
const workoutRoutes = require('./routes/workout');

const app = express();
const port = 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb+srv://admin:admin1234@cluster0.otywiso.mongodb.net/Fitness_Tracker?retryWrites=true&w=majority&appName=Cluster0');

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => console.log(`We're now connected to MongoDb Atlas`));

app.use("/users", userRoutes);
app.use('/workouts', workoutRoutes);

// [SECTION] Server Gateway Response
if(require.main === module) {
	app.listen(process.env.PORT || port, () => console.log(`API is now online on port ${process.env.PORT || port}`))
}

module.exports = {app, mongoose}