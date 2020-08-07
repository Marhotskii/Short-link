const {Router} = require('express')
const bcrypt = require('bcryptjs')
const config = require('config')
const {check, validationResult} = require('express-validator')
const User = require('../models/User')
const { check, validationResult } = require('express-validator')
const router = Router()
const jwt = require('jsonwebtoken')

// /api/auth/register
router.post(
    '/register',
    [
        check('email', 'Incorrect email').isEmail(),
        check('password', 'Your password must be at least6 sumbols').isLength({min: 6})
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()){
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Incorrect data during registration'
                })
            }

            const {email, password} = req.body

            const candidate = await User.findOne({ email: email})

            if (candidate){
                return res.status(400).json({message: "User with this email is already exist"})
            }

            const hashedPassword = await bcrypt.hash(password, 12)
            const user = new User({email: email, password: hashedPassword})

            await user.save()

            res.status(201).json({message: "User created"})

        } catch (e) {
            res.status(500).json({message: "Smth going wrong, try again"})
          }
    }
)

// /api/auth/login
router.post(
    '/login', 
    [
        check('email', 'Input correct email').normalizeEmail().isEmail(),
        check('password', 'Input password').exists()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()){
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Invalid login data'
                })
            }

            const {email, password} = req.body

            const user = await User.findOne({email})
            if (!user){
                return res.status(400).json({ message: 'There is no such user' })
            }

            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch){
                return res.status(400).json({ message: 'Incorrect password' })
            }

            const token = jwt.sign(
                { userId: user.id },
                config.get('jwtSecret'),
                { expiresIn: '1h' }
            )

            res.json({ token, userId: user.id})

            
        } catch (e) {
            res.status(500).json({message: "Smth going wrong, try again"})
          }
    }
)

module.exports = router
