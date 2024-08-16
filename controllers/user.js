const User = require("../models/user");
const {v4: uuidv4} = require('uuid');
const {setUser} = require('../utils/auth');

async function handleSignUp(req,res) {
    console.log(req.body);
    const {name, email, password} = req.body;

    const data = await User.create({
        name: name,
        email: email,
        password: password,
    });

    const sessionId = uuidv4();
    setUser(sessionId, data);
    res.cookie("uid", sessionId);

    return res.redirect("/");
}

async function handleLogin(req,res) {
    const {email, password} = req.body;

    const data = await User.findOne({email,password});
    console.log(data);
    if(!data) return res.render('login', {error : "Invalid email or Password"});

    const sessionId = uuidv4();
    setUser(sessionId, data);
    res.cookie("uid", sessionId);
    return res.redirect('/'); 
}

module.exports = {handleSignUp,handleLogin};