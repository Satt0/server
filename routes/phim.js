const router=require('express').Router()
const fetch=require('node-fetch')
const axios=require('axios')
const DomParser = require('dom-parser')

const fullRouter=require('./full/full')
const srRouter=require('./series/series')

router.param('name',(req,res,next,id)=>{


  axios.get(`https://subnhanh.net/phim/${id}`).then(response=>{
   
    const parser=new DomParser()
    const dom=parser.parseFromString(response.data);
    const target=dom.getElementsByClassName('button_xemphim')[0].outerHTML;
  
    const e=target.substring(target.indexOf('href'),target.indexOf('title')).trim()
    if(e.indexOf('full') > 0)
    {
      res.redirect(`/phim/full/${id}/hls`)
    }
    else{
      res.redirect(`/phim/series/${id}/tap-1/hls`)
    }
  }).catch(e=>{
    next(e)
  })





  
})


router.use('/full',fullRouter)
router.use('/series',srRouter)
router.get('/:name',(req,res,next)=>{
  res.send('ok')
})


module.exports=router;