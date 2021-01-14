const { response } = require('express');

const router= require('express').Router()
const axios=require('axios');
const DomParser = require('dom-parser')
const helper=require('../helper')


router.get('/',(req,res,next)=>{
    const page=req.query.page
    axios.get('https://subnhanh.net/the-loai/phim-le?page='+page).then(response=>{
    const parser=new DomParser()
    const string=parser.parseFromString(response.data)
    const items=string.getElementsByClassName('item-image-block');
    const ok=items.map(e=>helper.parseIt(e.outerHTML))
    
    res.render('search',{array:ok})



})
})


module.exports=router;