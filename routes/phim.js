const router=require('express').Router({mergeParams:true})
const fetch=require('node-fetch')
const axios=require('axios')
const DomParser = require('dom-parser')



router.param('name',(req,res,next,id)=>{
    try{
            axios.get(`https://subnhanh.net/xem-phim/${id}-tap-1`).then(response=>{
                const parser = new DomParser();
                const id=parser.parseFromString(response.data);
                const list=id.getElementById('ploption').childNodes || [];
                const as=id.getElementsByClassName("collection-list w-dyn-items")[0] ||[];
                const arr=as.getElementsByTagName('a').map((e=>({
                  src:e.outerHTML.substring(e.outerHTML.indexOf('href')+7,e.outerHTML.indexOf('aria-current')-2)
                })))
                
                req.urlList=arr;
                next();
             
            }).catch(e=>{
              next(e)
            })
    }   
    catch(err){
        next(err)
    }

})

router.param('phim',(req,res,next,id)=>{
  try{
    axios.get(`https://subnhanh.net/xem-phim/${id}`).then(response=>{
        const parser = new DomParser();
        const id=parser.parseFromString(response.data);
        const list=id.getElementById('ploption').childNodes || [];
        const arr=list.map(e=>{
          const src=e.outerHTML.split(`'`);
          return {
            src:`epId=${src[1]}&type=${src[3]}`,
            player:src[3]
           
          }
        })
        req.phim=arr
        next()
        
     
    }).catch(e=>{
      next(e)
    })
}   
catch(err){
next(err)
}
})

router.get('/:name',(req,res,next)=>{
    console.log(req.urlList);
    res.render('choose',{list:req.urlList})
  })

const hostRouter=require('express').Router({mergeParams:true})
router.use('/:name/xem-phim/:phim',hostRouter)


hostRouter.param('host',(req,res,next,id)=>{
  req.player=id;
  next()
})

hostRouter.get('/player/:host',(req,res,next)=>{

  console.log(req.urlList);
    const body=req.phim
    const data=body.find(e=>e.player===(req.player))
    fetch("https://subnhanh.net/frontend/default/ajax-player", {
        "headers": {
          "accept": "text/html, */*; q=0.01",
          "accept-language": "en-US,en;q=0.9,vi;q=0.8",
          "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
          "sec-ch-ua": "\"Google Chrome\";v=\"87\", \" Not;A Brand\";v=\"99\", \"Chromium\";v=\"87\"",
          "sec-ch-ua-mobile": "?0",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
          "x-requested-with": "XMLHttpRequest",
          "cookie": "_ga=GA1.1.309398949.1610527051; _csrf=5fc6d998c98126e3e8307a8d1a35cc6e65005a1e32601e645972984aedebbaa3a%3A2%3A%7Bi%3A0%3Bs%3A5%3A%22_csrf%22%3Bi%3A1%3Bs%3A32%3A%22g1X7AEjvj0TirApBu2bMtFbkVQTVEKfe%22%3B%7D; _ga_ZCETLF54NS=GS1.1.1610539144.2.1.1610541583.20"
        },
        "referrer": "https://subnhanh.net/xem-phim/cong-chua-kho-gan-tap-1",
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": data.src,
        "method": "POST",
        "mode": "cors"
      }).then(res=>res.text()).then(resp=>{
        res.render('ok',{ok:resp,player:req.phim})
      });
    
  
  

})


module.exports=router;