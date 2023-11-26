const asyncHandler = require('express-async-handler')
const User = require('../model/User')
const bcrypt = require('bcryptjs')

const signUp = asyncHandler(async (req, res) => {
    const {email,mobile,password}= req.body
    if (!mobile || !email || !password) return res.status(500).json('all fields required')
    const userexist = await User.findOne({email})
    if (userexist) return res.status(500).json('user with email exist')
    const hashedPassword = await bcrypt.hash(password,10)
    const createUser = await User.create({
        email,
        mobile,
        password:hashedPassword
    })
    if (!createUser) return res.json('cannot register please try again')
    res.status(200).json('User registered successfull')
})


const login = asyncHandler(async (req, res) => {
    const {mobile,password}= req.body
    if (!mobile || !password) return res.status(500).json('all fields required')
    const userexist = await User.findOne({mobile})
    if (!userexist) return res.status(500).json('user  not registered')
    const comparePassword = await bcrypt.compare(password,userexist.password)
    if (!comparePassword) return res.status(500).json('password doesnt match')
    req.session.user = userexist
    console.log(req.session);
    res.status(200).json(userexist)
})


const logout = asyncHandler(async (req, res) => {
    
    req.session.destroy(function (err) {
        if(err) res.status(500).json(' cant logout session')
       
        res.status(200).json('logout session')

    })
})

const googleLogin = asyncHandler(async (req, res,next) => {
    
    const { userInfo } = req.body
    const { email } = userInfo?.data
    console.log(req.body);
    const userexist = await User.findOne({email})
    console.log(userexist);
    if (!userexist) return res.status(500).json('user  not registered')
    req.session.user = userexist
    res.status(200).json(userexist)

    
})



module.exports = {
    signUp,
    login,
    logout,
    googleLogin
 
}