const express = require('express');
const mongoose = require('mongoose');
const medicineRouter = require('./routes/medicineRoutes');

const app = express();

// Middleware
app.use(express.json());

// Database connection
mongoose.connect('mongodb://localhost:27017/pharmacy', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB', err));

// Routes
app.use(medicineRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});