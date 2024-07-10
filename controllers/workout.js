const Workout = require("../models/Workout");


module.exports.addWorkout = (req,res) => {

	let newWorkout = new Workout({
        userId: req.user.id,
		name : req.body.name,
		duration : req.body.duration
	});

	newWorkout.save()
	.then(savedWorkout => res.status(201).send(savedWorkout))
	.catch(saveErr => {

		console.error("Error in saving the workout: ", saveErr)
		return res.status(500).send({ error: 'Failed to save the workout' });
	})

};

module.exports.getAllWorkouts = (req, res) => {
    const userId = req.user.id;

    Workout.find({ userId })
        .then(workouts => {
            if (workouts.length > 0) {
                return res.status(200).send({ workouts });
            } else {
                return res.status(200).send({ message: 'No workouts found for this user.' });
            }
        })
        .catch(err => {
            console.error('Error finding workouts:', err);
            return res.status(500).send({ error: 'Error finding workouts.' });
        });
};

module.exports.updateWorkout = (req, res) => {

	let workoutUpdates = {
        name: req.body.name,
        duration: req.body.duration
    }

    return Workout.findByIdAndUpdate(req.params.id, workoutUpdates, { new: true })
    .then(updatedWorkout => {

        if (!updatedWorkout) {
            return res.status(404).send({ error: 'Workout not found' });
        }

        return res.status(200).send({ 
        	message: 'Workout updated successfully', 
        	updatedWorkout: updatedWorkout 
        });

    })
    .catch(err => {
		console.error("Error in updating an Workout : ", err)
		return res.status(500).send({ error: 'Error in updating an Workout.' });
	});
};

module.exports.deleteWorkout = (req, res) => {

    return Workout.deleteOne({ _id: req.params.id})
    .then(deletedResult => {

        if (deletedResult < 1) {

            return res.status(400).send({ error: 'No Workout deleted' });

        }

        return res.status(200).send({ 
        	message: 'Workout deleted successfully'
        });

    })
    .catch(err => {
		console.error("Error in deleting an Workout : ", err)
		return res.status(500).send({ error: 'Error in deleting an Workout.' });
	});
};

module.exports.completeWorkoutStatus = (req, res) => {
    let updatedWorkout = {
        status: 'completed'
    };

    return Workout.findByIdAndUpdate(req.params.id, updatedWorkout, { new: true })
        .then((workout) => {
            if (!workout) {
                return res.status(404).send({ error: "Workout not found" });
            }
            res.status(200).send({ 
                message: 'Workout updated successfully', 
                updatedWorkout: workout
            });
        })
        .catch(err => res.status(500).send({ error: "Error in updating", details: err }));
};
