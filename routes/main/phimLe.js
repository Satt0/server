const { response } = require('express');

const router= require('express').Router()
const axios=require('axios');
const DomParser = require('dom-parser')
const helper=require('../helper')
const fetch=require('node-fetch')

router.get('/',(req,res,next)=>{
    const pagecCount=req.query.page || 1


    fetch(`https://subnhanh.net/the-loai/phim-le?page=${pagecCount}&_pjax=%23p0&_pjax=%23p0`, {
  "headers": {
    "accept": "text/html, */*; q=0.01",
    "accept-language": "en-US,en;q=0.9,vi;q=0.8",
    "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
    "sec-ch-ua": "\"Google Chrome\";v=\"87\", \" Not;A Brand\";v=\"99\", \"Chromium\";v=\"87\"",
    "sec-ch-ua-mobile": "?0",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "x-csrf-token": "gwfrJ9VPLwdQh7xE--2hTwzUTjCJ50BwfWbk1jVg-8XnQsYTtAhpMyDByTC0jvYBfo55ZMOCbTsyMouVbFiXpg==",
    "x-pjax": "true",
    "x-pjax-container": "#p0",
    "x-requested-with": "XMLHttpRequest",
    "cookie": "_csrf=4b86d7e98baeea3eb1e8ed250336ab21df0bf887f2e480aa4c90ee3b122d63dfa%3A2%3A%7Bi%3A0%3Bs%3A5%3A%22_csrf%22%3Bi%3A1%3Bs%3A32%3A%22dE-4aGF4pFutOcWNrZ7TJe-KOToCY8lc%22%3B%7D"
  },
  "referrer": "https://subnhanh.net",
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
                bo:false,
                count:index===page.length-1?'>':index===0?'<':link.substring(5,6),
                current:pagecCount===link.substring(5,6)?'active-link':''
            }
            return ans
            }
        )
        
        
        res.render('search',{array:ok,page:pagigation})
    
    
    




});



















//     axios.get('https://subnhanh.net/the-loai/phim-le?page='+pagecCount).then(response=>{
//     const parser=new DomParser()
//     const string=parser.parseFromString(response.data)
//     const items=string.getElementsByClassName('item-image-block');
//     const ok=items.map(e=>helper.parseIt(e.outerHTML))
//     const page=string.getElementById('pagination').getElementsByClassName('page-item')
//     const pagigation=page.map(({outerHTML},index)=>{
    
//           const link=  outerHTML.substring(outerHTML.indexOf("page="),outerHTML.indexOf('data-page')).trim(' ').split(`"`)[0]
//         const ans={
//             link:link,
//             bo:false,
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