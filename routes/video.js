const { route } = require('.');

const router=require('express').Router();
const axios=require('axios')
const DomParser=require('dom-parser')


router.get("/",(req,res,next)=>{
    // res.send(req.query)
    res.render('video',{url:req.query.film})
})
// router.get("/sample",(req,res,next)=>{
//     axios.get("http://www.phimhans.net/cong-chua-kho-gan/tap-10.html").then(resq=>{
//         const parser=new DomParser()
//         console.log(resq.getElementById(''));
//         const a=parser.parseFromString(res.data)
//         res.send(resq.data.toString());
//     })
// })

module.exports=router;