const Workout = require('../models/workoutModel');
const mongoose = require('mongoose');

const getAllWorkouts = async (req, res) => {
  const workouts = await Workout.find({});
  res.status(200).json(workouts);
};

const createWorkout = async (req, res) => {
  const workout = await Workout.create(req.body);
  res.status(201).json(workout);
};

const getWorkoutById = async (req, res) => {
  const { workoutId } = req.params;

  if (!mongoose.isValidObjectId(workoutId)) {
    return res.status(400).json({ error: "Invalid workout ID" });
  }

  const workout = await Workout.findById(workoutId);
  if (!workout) {
    return res.status(404).json({ error: "Workout not found" });
  }
  res.status(200).json(workout);
};

const updateWorkout = async (req, res) => {
  const { workoutId } = req.params;

  if (!mongoose.isValidObjectId(workoutId)) {
    return res.status(400).json({ error: "Invalid workout ID" });
  }

  const workout = await Workout.findOneAndUpdate(
    { _id: workoutId },
    { ...req.body },
    { returnDocument: "after", runValidators: true }
  );
  if (!workout) {
    return res.status(404).json({ error: "Workout not found" });
  }
  res.status(200).json(workout);
};

const deleteWorkout = async (req, res) => {
  const { workoutId } = req.params;

  if (!mongoose.isValidObjectId(workoutId)) {
    return res.status(400).json({ error: "Invalid workout ID" });
  }

  const workout = await Workout.findOneAndDelete({ _id: workoutId });
  if (!workout) {
    return res.status(404).json({ error: "Workout not found" });
  }
  res.status(204).end();
};

module.exports = {
  getAllWorkouts,
  createWorkout,
  getWorkoutById,
  updateWorkout,
  deleteWorkout,
};