const router = require('express').Router({ mergeParams: true })
const axios = require('axios')
const DomParser = require('dom-parser')
const fetch = require('node-fetch')


router.param('tap',(req,res,next,id)=>{
    req.playing=id;
    axios.get(`https://subnhanh.net/xem-phim/${req.name}-${id}`).then(response => {
        const parser = new DomParser();
        const id = parser.parseFromString(response.data);
        const list = id.getElementById('ploption').childNodes || [];
        const as=id.getElementsByClassName("collection-list w-dyn-items")[0] ||[];
      const temp=as.getElementsByTagName('a').map((e=>({
        src:e.outerHTML.substring(e.outerHTML.indexOf('href')+7,e.outerHTML.indexOf('aria-current')-2)
      })))
        const arr = list.map(e => {
            const src = e.outerHTML.split(`'`);
            return {
                src: `epId=${src[1]}&type=${src[3]}`,
                player: src[3]

            }
        })
        req.arr = arr;
        req.list=temp;
        next()


    }).catch(e => {
        next(e)

    })
})

router.param('name',(req,res,next,id)=>{
   
    req.name=id;
    next()

})

router.param('player',(req,res,next,id)=>{
  
    req.found = req.arr.find((e) => e.player === id) || req.arr[0]
    
    next()
})

router.get('/:name/:tap/:player',(req,res,next)=>{
    
    
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
      },
      "referrer": "https://subnhanh.net/xem-phim/tenet-full",
      "referrerPolicy": "strict-origin-when-cross-origin",
      "body": req.found.src,
      "method": "POST",
      "mode": "cors"
    }).then(resp => resp.text()).then(resp => {
        
       res.render('ok',{ok:resp,player:req.arr,playing:req.playing,eps:req.list.map(e=>({episode:e.src.substring(e.src.indexOf('tap'))}))})

    }).catch(err => {
        next(err);
    });
})




module.exports= router;