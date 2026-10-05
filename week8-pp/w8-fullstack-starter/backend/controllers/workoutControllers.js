const Workout = require('../models/workoutModel');
const mongoose = require('mongoose');

// GET /api/workouts
const getAllWorkouts = async (req, res) => {
  //res.send("getAllWorkouts");
  try {
    const workouts = await Workout.find({}).sort({ createdAt: -1 });
    res.status(200).json(workouts);
  } catch (error) {
    res.status(500).json({ message: "Failed to get" })
  }
};

// POST /api/workouts
const createWorkout = async (req, res) => {
  //res.send("createWorkout");
  try {
    const newWorkout = await Workout.create({ ...req.body });
    res.status(201).json(newWorkout);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Failed to create a new workout", error: error.message })
  }
};

// GET /api/workouts/:workoutId
const getWorkoutById = async (req, res) => {
  const { workoutId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(workoutId)) {
    return res.status(400).json({ message: "invalid id" })
  }
  try {
    const workouts = await Workout.findById(workoutId);
    if (workouts) {
      res.status(200).json(workouts);
    } else {
      res.status(404).json({ message: "not found" })
    }
  } catch (error) {
    res.status(500).json({ message: "failed to retrieve workout" })
  }
};

// PUT /api/workouts/:workoutId 
const updateWorkout = async (req, res) => {
  const { workoutId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(workoutId)) {
    return res.status(400).json({ message: "invalid id" })
  }

  if (req.body.title !== undefined && req.body.title.trim() === "" ) { //is there title? is title empty?
    const workout = await Workout.findById(workoutId); //find old workout
    if (!workout) {
      return res.status(404).json({message: "not found"}); //exists?
    }
    return res.status(400).json({message:"cannot be empty"});
    //return res.status(200).json(workout); //it's empty so no change, send old
  }

  try {
    const updatedWorkout = await Workout.findOneAndUpdate(
      { _id: workoutId },
      { ...req.body },
      { returnDocument: "after" }
    );

    if (updatedWorkout) {
      res.status(200).json(updatedWorkout);
    } else {
      res.status(404).json({ message: "not found" })
    }
  } catch (error) {
    res.status(500).json({ message: "failed to update workout" })
  }

};


// DELETE /api/workouts/:workoutId
const deleteWorkout = async (req, res) => {
  const { workoutId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(workoutId)) {
    return res.status(400).json({ message: "invalid id" })
  }

  try {
    const deletedWorkouts = await Workout.findOneAndDelete({ _id: workoutId });
    if (deletedWorkouts) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "not found" })
    }
  } catch (error) {
    res.status(500).json({ message: "failed to delete workout" })
  }
};

module.exports = {
  getAllWorkouts,
  createWorkout,
  getWorkoutById,
  updateWorkout,
  deleteWorkout,
};

