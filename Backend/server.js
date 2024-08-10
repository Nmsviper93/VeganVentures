require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require ('cors');
const connectDB = require('./db');
const authRoutes = require('./Routes/authRoutes');
const recipeRoutes = require('./Routes/recipeRoutes')
const favoritesRoutes = require('./Routes/favoritesRoutes');
const userRoutes = require('./Routes/userRoutes');
const dotenv = require('dotenv');

// load environment variables from .env file
dotenv.config();

// intialize Express application
const app = express();
const PORT = process.env.PORT || 5001;

const dbURI = 'mongodb://localhost:27017/Vegan-Ventures';

console.log('MongoDB URI:', process.env.MONGO_URI);
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit the process with an error code
  });

// middleware to parse JSON request bodies
app.use(express.json());
app.use(cors({
  origin: 'https://vegan-ventures.onrender.com/',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
  ));
app.use(bodyParser.json());

// define simple route to check if API is running
app.get('/', (req, res) => res.send('API is running'));

// use routes for requests
app.use('/api/auth', authRoutes);
app.use('/api/recipes', recipeRoutes);
app.use('/api/favorites', favoritesRoutes);
app.use('/api/users', userRoutes);

// routes
app.use('/api/users', require('./Routes/userRoutes'));
app.use('/api/recipes', require('./Routes/recipeRoutes'));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
