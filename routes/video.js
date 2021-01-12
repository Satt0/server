const { route } = require('.');

const router=require('express').Router();



router.get("/",(req,res,next)=>{
    // res.send(req.query)
    res.render('video',{url:req.query.film})
})


module.exports=router;