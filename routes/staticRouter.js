const express = require('express');
const {isAdmin} = require('../middlewares/auth');
const {restrictToLoggedInUserOnly} = require('../middlewares/auth');

const router = express.Router();

const {getAllData} = require('../controllers/url');

router.get('/',(req,res)=>{
    return res.render('home');
})

router.get('/analytics',restrictToLoggedInUserOnly, isAdmin, getAllData)

router.get('/signup',(req,res)=>{
    res.render('signup');
})

router.get('/login',(req,res)=>{
    res.render('login');
})

module.exports = router;