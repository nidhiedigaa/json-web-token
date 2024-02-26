const jwt=require('jsonwebtoken')


function verification(req,res,next)
{
    let token=req.headers['authorization']
    token=token.replace('BEARER ','')
    jwt.verify(token,process.env.SECRET_KEY,(err,decoded)=>
    {
        if(err)
        {
            return res.status(400).json({message:'you need to log in first'})
        }
        req.user=decoded
        return next()
    })
}

module.exports=verification