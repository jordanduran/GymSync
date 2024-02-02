require('dotenv').config();

const express = require('express');
const workoutRoutes = require('./routes/workouts');
// express app
const app = express();

// middleware
app.use(express.json());
/* express.json() is a built-in middleware function in Express. It parses incoming requests with JSON payloads and is based on body-parser. Returns middleware that only parses JSON and only looks at requests where the Content-Type header matches the type option. */

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use('/api/workouts', workoutRoutes);

// listen for requests
app.listen(process.env.PORT, () => {
  console.log('Listening on port 4000');
});
