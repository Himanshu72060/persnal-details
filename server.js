const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const studentRoutes = require('./routes/student');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads')); // Serve static files
app.use('/api/students', studentRoutes);

// Connect MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT, () =>
        console.log(`Server running on port ${process.env.PORT}`)
    );
}).catch(err => console.error(err));
