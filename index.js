const express = require('express');
const mongoose = require('mongoose');
const tenderRoutes = require('./routes/tenderRoutes'); 
const dotenv = require('dotenv');
const vendorRouter = require("./routes/vendorRoutes.js");
const clientRouter= require("./routes/clientRoutes.js")
const cors = require("cors");

dotenv.config();

const app = express();
app.use(
  cors({
    origin: "*",
    optionsSuccessStatus: 200, // Allow all origins (for development purposes; adjust for production)
  })
);
app.use(express.json());
app.use('/tenders', tenderRoutes);
app.use("/vendor", vendorRouter);
app.use("/client",clientRouter);

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
