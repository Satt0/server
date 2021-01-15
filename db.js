
const monk=require('monk')(process.env.URI)
monk.then(()=>{
 console.log('success');
}).catch(e=>{
  console.log('no internet');
  
})
module.exports=monk;