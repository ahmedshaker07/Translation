const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

const uri= process.env.ATLAS_URI;
mongoose.connect(uri,{useUnifiedTopology: true,useNewUrlParser: true});

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const userRouter = require('./routes/users');
const requestRouter = require('./routes/requests');
app.use('/users',userRouter);
app.use('/requests',requestRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});