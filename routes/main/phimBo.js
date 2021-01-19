const { response } = require('express');

const router= require('express').Router()
const axios=require('axios');
const DomParser = require('dom-parser')
const helper=require('../helper')
const fetch=require('node-fetch')
router.get('/trend',(req,res,next)=>{
    
    axios.get('https://subnhanh.net/the-loai/phim-bo?page=1').then(response=>{
    const parser=new DomParser()
    const string=parser.parseFromString(response.data)
    const items=string.getElementsByClassName('item-image-block');
    const ok=items.map(e=>helper.parseIt(e.outerHTML))
 
    
    res.json({array:ok.slice(0,10)})

})

})

router.get('/',(req,res,next)=>{
    const pagecCount=req.query.page



    fetch(`https://subnhanh.net/the-loai/phim-bo?page=${pagecCount}&_pjax=%23p0`, {
  "headers": {
    "accept": "text/html, */*; q=0.01",
    "accept-language": "en-US,en;q=0.9,vi;q=0.8",
    "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
    "sec-ch-ua": "\"Google Chrome\";v=\"87\", \" Not;A Brand\";v=\"99\", \"Chromium\";v=\"87\"",
    "sec-ch-ua-mobile": "?0",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "x-csrf-token": "UnSc3qOthUINjikfPdKKR2OTCK8dpNo74hgk9H-ljhshAN-Zl-Xockj9WUp-598eC8A-5irC6WHbYmK8TJTLQQ==",
    "x-pjax": "true",
    "x-pjax-container": "#p0",
    "x-requested-with": "XMLHttpRequest",
  },
  "referrer": "https://subnhanh.net/the-loai/phim-bo",
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": null,
  "method": "GET",
  "mode": "cors"
}).then(resp=>resp.text()).then(resp=>{

    const parser=new DomParser()
    const string=parser.parseFromString(resp)
    const items=string.getElementsByClassName('item-image-block');
    const ok=items.map(e=>helper.parseIt(e.outerHTML))
    const page=string.getElementById('pagination').getElementsByClassName('page-item')
    const pagigation=page.map(({outerHTML},index)=>{
    
          const link=  outerHTML.substring(outerHTML.indexOf("page="),outerHTML.indexOf('data-page')).trim(' ').split(`"`)[0]
        const ans={
            link:link,
            bo:true,
            count:index===page.length-1?'>':index===0?'<':link.substring(5,6),
            current:pagecCount===link.substring(5,6)?'active-link':''
        }
        return ans
        }
    )
    
    
    res.render('search',{array:ok,page:pagigation})


});
















//     axios.get('https://subnhanh.net/the-loai/phim-bo?page='+pagecCount).then(response=>{
//     const parser=new DomParser()
//     const string=parser.parseFromString(response.data)
//     const items=string.getElementsByClassName('item-image-block');
//     const ok=items.map(e=>helper.parseIt(e.outerHTML))
//     const page=string.getElementById('pagination').getElementsByClassName('page-item')
//     const pagigation=page.map(({outerHTML},index)=>{
    
//           const link=  outerHTML.substring(outerHTML.indexOf("page="),outerHTML.indexOf('data-page')).trim(' ').split(`"`)[0]
//         const ans={
//             link:link,
//             bo:true,
//             count:index===page.length-1?'>':index===0?'<':link.substring(5),
//             current:pagecCount===link.substring(5)?'active-link':''
//         }
//         return ans
//         }
//     )
    
//     res.render('search',{array:ok,page:pagigation})



// })
// .catch(e=>{
//     next(e)
// })

})


module.exports=router;