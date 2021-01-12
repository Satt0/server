
var express = require('express');
var router = express.Router();
const DomParser=require('dom-parser')
const axios = require('axios')
const helper=require('./helper')
const rateLimit = require("express-rate-limit"); 
/* GET home page. */
const limiter = rateLimit({
  windowMs: 5 * 1000, // 5 s
  max: 3 // limit each IP to 3 requests per windowMs
});

router.get('/',limiter, function(req, res, next) {
  const query=req.query;
  
  try{
    axios.get(`https://subnhanh.net/search?query=${query.search}`).then(resp => {

   const data=(resp.data);
   
   const parser = new DomParser();
   const dom = Array.from(parser.parseFromString(data).getElementsByClassName('item-block'));
   //list of movies
   let arr=[]
   dom.forEach((e)=>{
      const result=parser.parseFromString(e.innerHTML);
      const a=(result.getElementsByClassName('item-image-block')[0].outerHTML);
      const b=(helper.parseIt(a));
    arr.push(b);
      
      
   })
   res.render('search',{array:arr})
   
});
  }
  catch(err){
    next(err)
  }
});

module.exports = router;
