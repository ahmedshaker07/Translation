const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT;

//mongo connection
const uri= process.env.ATLAS_URI;
mongoose.connect(uri,{useUnifiedTopology: true,useNewUrlParser: true,useFindAndModify: false,useCreateIndex: true});
const connection = mongoose.connection;
connection.once('open', () => {console.log("MongoDB database connection established successfully");})

// Express body parsers
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false
  })
);

// Passport middleware
app.use(cors());
app.use("/api", require("./logger"));

//routes
const userRouter = require('./routes/users');
const requestRouter = require('./routes/requests');
const loginRouter = require('./routes/login');

app.use('/api/users',userRouter);
app.use('/api/requests',requestRouter);
app.use('/api/login',loginRouter);

// Wrong path
app.use((req, res) =>
  res.status(404).send(`<h1>Can not find what you're looking for</h1>`)
);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});   