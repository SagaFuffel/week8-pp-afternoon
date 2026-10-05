const Workout = require('../models/workoutModel');
const mongoose = require('mongoose');

// GET /api/workouts
const getAllWorkouts = async (req, res) => {

  try {
    const workouts = await Workout.find({}).sort({ createdAt: -1 });
    res.status(200).json(workouts);
  } catch (error) {
    res.status(500).json({ message: "Failed to get" })
  }
};

// POST /api/workouts
// POST /api/products
const createWorkout = async (req, res) => {
  try {
    const user_id = req.user._id;
    const newWorkout = new Workout({
      ...req.body,
      user_id,
    });
    await newWorkout.save();
    res.status(201).json(newWorkout);
  } catch (error) {
    console.error("Error creating workout:", error);
    res.status(500).json({ error: "Server Error" });
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
    return res.status(200).json(workout); //it's empty so no change, send old
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

