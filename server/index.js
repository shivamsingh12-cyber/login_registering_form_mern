const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const model = require('./model.js')
const bcrypt = require('bcrypt')
const dotenv = require('dotenv')


const app = express();
app.use(express.json());
app.use(cors())

mongoose.connect(process.env.MONGO_URI).catch(err => console.error('MongoDB connection error:', err));

app.post('/register',async(req,res)=>{
    const {regEmail,regPass} = req.body;
        try {
            const emailCheck = await model.findOne({regEmail});
            if (emailCheck) 
                return res.status(400).send('This Email Already Exist')
            else
            {
                const hash_pass = await bcrypt.hash(regPass,10)
                await model.create({regEmail,regPass:hash_pass})
                return res.status(200).send('user created successfully')

            }
            
        } catch (error) {
            res.status(500).send(error)
        }
})

app.post('/login',async (req,res)=>
{
    const {logEmail,logPass}= req.body;
    try {
        const user=await model.findOne({regEmail:logEmail});
        if(!user) return res.status(404).send('Email Not Found')
            const isMatch = await bcrypt.compare(logPass,user.regPass);
        if(!isMatch) return res.status(404).send('Password is not Correct!')
           return res.status(200).send('Login Successful')
    } catch (err) {
        res.status(500).send(err)
    }
})

app.listen(8000,()=>{
    console.log(`Your server is running on port 8000`)
})