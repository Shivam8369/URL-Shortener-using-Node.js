const User = require("../models/user");
const {v4: uuidv4} = require('uuid');
const {setUser} = require('../utils/auth');
const {setToken} = require('../utils/tokenAuth');
const bcrypt = require('bcrypt');

async function handleSignUp(req,res) {
    const {name, email, password} = req.body;

    let hashedPassword = await bcrypt.hash(password, 10);

    const data = await User.create({
        name: name,
        email: email,
        password: hashedPassword,
    });
    // const sessionId = uuidv4();
    // setUser(sessionId, data);

    const token = setToken(data);
    res.cookie("uid", token);

    return res.redirect("/");
}

async function handleLogin(req,res) {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    // const data = await User.findOne({email,password});
    console.log(user);
    // COMPARING PASSWORD 
    if(await bcrypt.compare(password,user.password)){
        const token = setToken(user);
        res.cookie("uid", token);
        return res.redirect('/'); 
    }else{
        return res.render('login', {error : "Invalid email or Password"});
    }

    // const sessionId = uuidv4();
    // setUser(sessionId, data);
  
}

module.exports = {handleSignUp,handleLogin};