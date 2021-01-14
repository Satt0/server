const { route } = require('.');

const router=require('express').Router();
const axios=require('axios')
const DomParser=require('dom-parser')
const fullRouter=require('./full/full')


router.use('/full',fullRouter)

router.get("/",(req,res,next)=>{
    // res.send(req.query)
    res.send('ok')
})
module.exports=router;