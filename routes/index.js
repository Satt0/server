
var express = require('express');
var router = express.Router();
const DomParser = require('dom-parser')
const axios = require('axios')
const helper = require('./helper')
const fetch=require('node-fetch')
const rateLimit = require("express-rate-limit");
const FormData=require('form-data')
/* GET home page. */
const limiter = rateLimit({
  windowMs: 5 * 1000, // 5 s
  max: 3 // limit each IP to 3 requests per windowMs
});

router.get('/', limiter, function (req, res, next) {
  const query = req.query;
const search=req.query.search.trim(' ').split(' ').join('+');
  


axios.get('https://www.googleapis.com/customsearch/v1?key=AIzaSyCWeB0YVRL_T0p2RwPYjnDX91q4wo61CyY&cx=8b94e7e591eeb0941&q=subnhanh.net:+'+search)
.then(resp=>{
 
 if(resp.data.items)
 {
    const arr=resp.data.items.filter(e=>e.link.match(/^https:\/\/subnhanh.net\/phim\/.*/)).map(e=>({
      title:e.title,
      href:e.link.substring(20),
      image:e.pagemap.movie[0].image
    }))
  res.render('search',{array:arr})
 }
 else{
   res.send([{title:'no results',title:`Search: ${arr.length} ${arr.length>1?'results':'result'}`}])
 }

}).catch(e=>{
  console.log('gg api err');
  try {
    
    axios.get(`https://subnhanh.net/search?query=${search}`).then(resp => {

      const data = (resp.data);

      const parser = new DomParser();
      const dom = Array.from(parser.parseFromString(data).getElementsByClassName('item-block'));
      //list of movies
      let arr = []
      dom.forEach((e) => {
        const result = parser.parseFromString(e.innerHTML);
        const a = (result.getElementsByClassName('item-image-block')[0].outerHTML);
        const b = (helper.parseIt(a));
        arr.push(b);


      })
      res.render('search', { array: arr ,title:`Search: ${arr.length} ${arr.length>1?'results':'result'}`})
      // res.send(arr)

    });
  }
  catch (err) {
    next(err)
  }


})

});






module.exports = router;