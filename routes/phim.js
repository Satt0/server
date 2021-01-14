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
    console.log(e.indexOf('tap-1'));
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


  // res.send('wait')
  // axios.get(`https://subnhanh.net/xem-phim/${id}-tap-1`).then(response=>{
  //     const parser = new DomParser();
  //     const id=parser.parseFromString(response.data);
  //     const as=id.getElementsByClassName("collection-list w-dyn-items")[0] ||[];
  //     const arr=as.getElementsByTagName('a').map((e=>({
  //       src:e.outerHTML.substring(e.outerHTML.indexOf('href')+7,e.outerHTML.indexOf('aria-current')-2)
  //     })))
      
  //     req.urlList=arr;
  //     next();
   
  // }).catch(e=>{
  //  next(e)
 
  // })


  
})
// router.param('tap',(req,res,next,id)=>{
//   req.tap=id;
//   next()
// })

router.use('/full',fullRouter)
router.use('/series',srRouter)
router.get('/:name',(req,res,next)=>{
  res.send('ok')
})


// const hostRouter=require('express').Router({mergeParams:true})
// router.use('/:name/:tap/',hostRouter)


// hostRouter.param('host',(req,res,next,id)=>{
//   req.player=id;
//   next()
// })

// hostRouter.get('/:host',(req,res,next)=>{
// const a=req.urlList.filter((e)=>e.src.substring(e.src.length-req.tap.length)===req.tap);

// const eps=req.urlList.map(e=>({episode:e.src.substring(e.src.indexOf('tap'))}))
// axios.get(`https://subnhanh.net/${a[0].src}`).then(response=>{
//   const parser = new DomParser();
//   const id=parser.parseFromString(response.data);
//   const list=id.getElementById('ploption').childNodes || [];
//   const arr=list.map(e=>{
//     const src=e.outerHTML.split(`'`);
//     return {
//       src:`epId=${src[1]}&type=${src[3]}`,
//       player:src[3]
     
//     }
//   })
//   const data=arr.find(e=>e.player===req.player)|| arr[0];
//   // res.send(data)

//   fetch("https://subnhanh.net/frontend/default/ajax-player", {
//   "headers": {
//     "accept": "text/html, */*; q=0.01",
//     "accept-language": "en-US,en;q=0.9,vi;q=0.8",
//     "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
//     "sec-ch-ua": "\"Google Chrome\";v=\"87\", \" Not;A Brand\";v=\"99\", \"Chromium\";v=\"87\"",
//     "sec-ch-ua-mobile": "?0",
//     "sec-fetch-dest": "empty",
//     "sec-fetch-mode": "cors",
//     "sec-fetch-site": "same-origin",
//     "x-requested-with": "XMLHttpRequest",
//     "cookie": "_ga=GA1.1.309398949.1610527051; _ga_ZCETLF54NS=GS1.1.1610545371.3.1.1610551859.59; _csrf=1a5fc6115b4ad586d75efb133b2da931716341145d243b65bb2a68324ebd0cd9a%3A2%3A%7Bi%3A0%3Bs%3A5%3A%22_csrf%22%3Bi%3A1%3Bs%3A32%3A%22hNN1buxmaUjWsdiFOo9-mEh-UK7Rd9ob%22%3B%7D"
//   },
//   "referrer": "https://subnhanh.net/xem-phim/cong-chua-kho-gan-tap-1",
//   "referrerPolicy": "strict-origin-when-cross-origin",
//   "body": data.src,
//   "method": "POST",
//   "mode": "cors"
// }).then(resp=>resp.text()).then(resp=>{
//     res.render('ok',{ok:resp,player:arr,eps:eps})

// }).catch(err=>{
//   next(err);
// });





//   // res.send(arr)
// }).catch(err=>{
//   next(err)
// })
// })

module.exports=router;