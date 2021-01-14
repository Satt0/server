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
    const page=string.getElementById('pagination').getElementsByClassName('page-item')
    const pagigation=page.map(({outerHTML})=>{
    
          const link=  outerHTML.substring(outerHTML.indexOf("page="),outerHTML.indexOf('data-page')).trim(' ').split(`"`)[0]
        const ans={
            link:link,
            count:link.substring(5)
        }
        return ans
        }
    )
    
    
    res.render('search',{array:ok,page:pagigation})



})
})


module.exports=router;