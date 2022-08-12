const express = require('express');

const authRouter = express.Router();

authRouter.post('/api/signup', (req, res) => {
    const {name, email, password} = req.body;

    // get the data from client
    // post that data in database
    // return that data to the user
});




module.exports = authRouter;