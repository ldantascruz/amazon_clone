const express = require('express');
const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authRouter = express.Router();


// SIGN UP
authRouter.post("/api/signup", async (req, res) => {
    try{
        const {name, email, password} = req.body;

        const existingUser = await User.findOne({ email });
        if(existingUser){
            return res
                .status(400)
                .json({ msg: "User with same email already exists!" });
        };

        const hashedPassword = await bcryptjs.hash(password, 8);
    
        let user = new User({
            email,
            password: hashedPassword,
            name,
        });
    
        user = await user.save();
        res.json(user);
    } catch(e){
        res.status(500).json({ error: e.message });
    }

});


// SIGN IN

authRouter.post('/api/signin', async (req, res) => {
    try{
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if(!user){
            return res
                .status(400)
                .json({ msg: 'User with this email does not exist!' });
        }

        const isMatch = await bcryptjs.compare(password, user.password);
        if(!isMatch){
            return res
                .status(400)
                .json({ msg: 'Incorrect Password!' });s
        }

        const token = jwt.sign({ id: user._id }, 'passwordKey');
        res.json({ token, ...user._doc });

    } catch (e) {
        res.status(500).json({ error: e.message })
    }
});

// TOKEN VALIDATOR

authRouter.post('/tokenIsValid', async (req, res) => {
    try{      
        const token = req.header('x-auth-token');
        if(!token) return res.json(false);

        const verified = jwt.verify(token, 'passworj');
        if(!verified) return res.json(false);

        const user = await User.findById(verified.id);
        if(!user) return res.json(false);

        res.json(true);
    } catch (e) {
        res.status(500).json({ error: e.message })
    }
});

// GET USER DATA
authRouter.get('/', authRouter)


module.exports = authRouter;