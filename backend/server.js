
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const userRoute=require("./routes/userRoute")
dotenv.config();

const app = express();


app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
    res.send('Hello Blog');
  });
  
  app.use("/api/auth",userRoute)

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection failed:', err.message);
  });
