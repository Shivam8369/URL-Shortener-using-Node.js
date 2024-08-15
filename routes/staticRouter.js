const express = require('express');

const router = express.Router();

const {getAllData} = require('../controllers/url');

router.get('/',(req,res)=>{
    return res.render('home');
})

router.get('/analytics',getAllData)


module.exports = router;