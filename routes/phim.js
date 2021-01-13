const router=require('express').Router()
const fetch=require('node-fetch')
const axios=require('axios')
const DomParser = require('dom-parser')



router.param('name',(req,res,next,id)=>{
    // res.redirect("https://subnhanh.net/xem-phim/"+id+'-tap-1')
    try{
            axios.get(`https://subnhanh.net/xem-phim/${id}-tap-1`).then(response=>{
                const parser = new DomParser();
                const id=parser.parseFromString(response.data);
                const list=id.getElementById('ploption').childNodes || [];
               a=(list[0].outerHTML);
               let b=(a.substring(a.indexOf("ajaxPlayer"),a.indexOf('$(this)')).split(`'`));
               
              if(b.length>0)
              {
                const body=`epId=${b[1]}&type=${b[3]}`;
                req.body=body;
                next()
              }
              else{
                  
              }
            })
    }   
    catch(err){
        next(err)
    }

})

router.get('/:name',(req,res,next)=>{
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
      "body": req.body,
      "method": "POST",
      "mode": "cors"
    }).then(res=>res.text()).then(resp=>{
      res.render('ok',{ok:resp})
    });
    
  })


module.exports=router;