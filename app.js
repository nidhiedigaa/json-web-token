require('dotenv').config()
const express=require('express')
const verification=require('./controllers/verification')
const jwt=require('jsonwebtoken')


const app=express()
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.post('/login',(req,res)=>
{
    const{email,password}=req.body;
    if(email && password)
    {
         if(email==='user@gmail.com' && password==='user')
         {
             const token=jwt.sign({email,password},process.env.SECRET_KEY,{expiresIn:'20m'})
             return res.status(200).json({message:'login succesful',token})
         }
         else
         {
             return res.status(400).json({error:'incorrect email or password'})
         }
    }
    else
    {
     return res.status(400).json({error:'need email and password to login'})
    }
})

app.get('/profile',verification,(req,res)=>
{
    const {email,password}=req.user
    return res.status(200).json({userDetails:email})
})

const PORT=process.env.PORT || 1111
app.listen(PORT,()=>console.log(`server is running on ${PORT}`))