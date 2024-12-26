const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const blogRoutes = require('./routes/blogRoutes');

dotenv.config();
const allowedOrigins = [
  'http://localhost:3000', // For local development
  'https://your-frontend-app.vercel.app', // Deployed frontend URL
];

const app = express();
app.use(cors({
  origin: '*', // Allow requests from any origin
  credentials: true, // If using cookies for authentication
}));
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use('/api/users', userRoutes);
app.use('/api/blogs', blogRoutes);

app.listen(5000, () => console.log('Server running on port 5000'));

module.exports = app;
