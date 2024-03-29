const Workout = require('../models/workoutModel');
const mongoose = require('mongoose');

// GET all workouts
const getAllWorkouts = async (req, res) => {
  const workouts = await Workout.find({}).sort({ createdAt: -1 });
  res.status(200).json(workouts);
};

// GET a single workout
const getWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'Workout does not exist' });
  }

  const workout = await Workout.findById(id);
  if (!workout) {
    return res.status(404).json({ error: 'Workout does not exist' });
  }

  res.status(200).json(workout);
};

// CREATE new workout
const createWorkout = async (req, res) => {
  const { title, load, reps } = req.body;

  let emptyFields = [];

  if (!title) {
    emptyFields.push('title');
  }
  if (!load) {
    emptyFields.push('load');
  }
  if (!reps) {
    emptyFields.push('reps');
  }

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: 'Please fill in all fields', emptyFields });
  }

  // Add doc to DB
  try {
    const workout = await Workout.create({ title, load, reps });
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE a workout
const deleteWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'Workout does not exist' });
  }

  const workout = await Workout.findOneAndDelete({ _id: id });
  if (!workout) {
    return res.status(404).json({ error: 'Workout does not exist' });
  }

  res.status(200).json(workout);
};

// UPDATE a workout
const updateWorkout = async (req, res) => {
  const { id } = req.params;

  const { newTitle, newLoad, newReps } = req.body;

  let emptyFields = [];

  if (!newTitle) {
    emptyFields.push('title');
  }
  if (!newLoad) {
    emptyFields.push('load');
  }
  if (!newReps) {
    emptyFields.push('reps');
  }

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: 'Please fill in all fields', emptyFields });
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'Workout does not exist' });
  }

  const workout = await Workout.findOneAndUpdate(
    { _id: id },
    {
      title: newTitle,
      load: newLoad,
      reps: newReps,
    }
  );

  if (!workout) {
    return res.status(404).json({ error: 'Workout does not exist' });
  }

  res.status(200).json(workout);
};

module.exports = {
  getAllWorkouts,
  getWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout,
};
