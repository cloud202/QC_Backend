const express = require('express')
const jwt = require('jsonwebtoken');
const { authToken } = require('../controller/adminController/authToken');
const router = express.Router()

const users = [
    {
        username: 'ankit',
        id: 1,
    },
    {
        username: 'cloud202',
        id: 2,
    }
]

router.route('/login').post((req,res)=>
{
    //authenticate user
    const username = req.body.username;
    console.log(username);
    const user = {name: username}

    const accessToken = jwt.sign(user,process.env.ACCESS_TOKEN_SECRET);
    res.status(200).json({accessToken:accessToken})

}).get(authToken,(req,res)=>
{
    res.json(users.filter(user => user.username === req.user.name));
})

module.exports = router;