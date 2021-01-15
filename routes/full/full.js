const router = require('express').Router({ mergeParams: true })
const axios = require('axios')
const DomParser = require('dom-parser')
const fetch = require('node-fetch')
const monk = require('../../db')
const db=monk.get('full')

router.param('name', (req, res, next, id) => {
    req.dbName=id;
   db.find({name:id}).then(resp=>{
       console.log(resp.length);
      if(resp.length>0)
      {
            req.arr=resp[0].player;
            next()
            
      
      }
     else{
           axios.get(`https://subnhanh.net/phim/${id}`).then(response => {
        const parser = new DomParser();
        const id = parser.parseFromString(response.data);
        const button = id.getElementsByClassName('button_xemphim')[0].outerHTML || ""
        const a = (button.substring(button.indexOf('href'), button.indexOf('title')).split(`"`)[1]) || ""
        axios.get(`https://subnhanh.net${a}`).then(response => {

            const parser = new DomParser();
            const id = parser.parseFromString(response.data);
            const list = id.getElementById('ploption').childNodes || [];
            const arr = list.map(e => {
                const src = e.outerHTML.split(`'`);
                return {
                    src: `epId=${src[1]}&type=${src[3]}`,
                    player: src[3]

                }
            })
            req.arr = arr;
            db.insert({name:req.dbName,player:arr}).then(ok=>{
                next()
            })


        }).catch(e => {
            next(e)

        })
    }).catch(e => {
        next(e)

    })
     }
   })
})
router.param('player', (req, res, next, id) => {

    req.found = req.arr.find((e) => e.player === id) || req.arr[0]
    next()
})

router.get('/:name/:player', (req, res, next) => {
    data = req.found

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
        "body": data.src,
        "method": "POST",
        "mode": "cors"
    }).then(resp => resp.text()).then(resp => {
        const response={ ok: resp, player: req.arr, eps: [] }
       
            res.render('ok',response )
       
        
    }).catch(err => {
        next(err);
    });

})




module.exports = router;









