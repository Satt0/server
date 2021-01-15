const { response } = require('express');

const router= require('express').Router()
const axios=require('axios');
const DomParser = require('dom-parser')
const helper=require('../helper')


router.get('/',(req,res,next)=>{
    const pagecCount=req.query.page
    axios.get('https://subnhanh.net/the-loai/phim-le?page='+pagecCount).then(response=>{
    const parser=new DomParser()
    const string=parser.parseFromString(response.data)
    const items=string.getElementsByClassName('item-image-block');
    const ok=items.map(e=>helper.parseIt(e.outerHTML))
    const page=string.getElementById('pagination').getElementsByClassName('page-item')
    const pagigation=page.map(({outerHTML},index)=>{
    
          const link=  outerHTML.substring(outerHTML.indexOf("page="),outerHTML.indexOf('data-page')).trim(' ').split(`"`)[0]
        const ans={
            link:link,
            bo:false,
            count:index===page.length-1?'>':index===0?'<':link.substring(5),
            current:pagecCount===link.substring(5)?'active-link':''
        }
        return ans
        }
    )
    
    
    res.render('search',{array:ok,page:pagigation})



})
.catch(e=>{
    next(e)
})
})

module.exports=router;