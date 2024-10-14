const express = require('express');
const mongoose = require('mongoose');
const tenderRoutes = require('./routes/tenderRoutes'); 
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(express.json());
app.use('/tenders', tenderRoutes);

// DB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('MongoDB connected');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
