// import from packages
const express = require('express');
const mongoose = require('mongoose');

// import from other files
const authRouter = require('./routes/auth');

// init 
const PORT = 3000;
const app = express();
const DB = "mongodb+srv://lucas:eu123456@cluster0.dmdybu6.mongodb.net/?retryWrites=true&w=majority";


// middleware
app.use(authRouter);


// connections
mongoose
    .connect(DB)
    .then(() => {
        console.log('Connection Succesful')
    })
    .catch(e => {
        console.log(e);
});


app.listen(PORT, () => {
    console.log(`Connected at PORT ${PORT}`);
});