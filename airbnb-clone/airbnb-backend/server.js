const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors({origin: 'http://localhost:5173'}));
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'))

// Mongoose connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.listen(process.env.PORT || 5000, () => {
    console.log(`Server running on port ${process.env.PORT || 5000} at http://localhost:${process.env.PORT || 5000}`);
});