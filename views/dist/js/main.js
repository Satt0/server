
const list = document.getElementById('recent-list')
const storage = window.localStorage;
let recent;

function addSearch(value, title, image) {
    const storage = window.localStorage;
    let recent;

    if (!storage.getItem('recent')) {
        window.localStorage.setItem('recent', JSON.stringify([]));
        recent = JSON.parse(storage.getItem('recent'));

    }
    else {
        recent = JSON.parse(storage.getItem('recent'));


    }
    const compare = recent.some(e => e.title === title)
    const index = recent.findIndex(e => e.title === title)
    if (!compare) {

        recent.unshift({ src: value.toString(), image: image.toString(), title: title.toString() })
    }
    else {
        const temp = recent[0];
        recent[0] = recent[index]
        recent[index] = temp;
    }
    window.localStorage.setItem('recent', JSON.stringify(recent));

    const c=document.getElementsByClassName('wrapper');

    
        Array.from(c).forEach(e=>{
            
            e.style.opacity='.6'
          })
   



}

const mouseOver=(value)=>{
   
  const a=document.getElementById('wallpaper-blur')
  a.style.backgroundImage=`url('${"https://subnhanh.net"+value}')`

 const b=Array.from( document.getElementsByClassName('color-text'))


}
function mouseOut(){

   
  

  
}
if (!storage.getItem('recent')) {
    window.localStorage.setItem('recent', JSON.stringify([]));

}
else {
    recent = JSON.parse(storage.getItem('recent'));
}
;

   if(list)
   {
    list.innerHTML = (recent.splice(0, 10).map(e => (`
    <a class="wrapper" href='${e.src}'  onclick="addSearch('${e.src}','${e.title}','${e.image}');" onmouseout="mouseOut();" onmouseover="mouseOver('${e.image}');">
    <div class="container-fluid justify-content-center">
    <div class="img-ctn" style="background-image:url('https://subnhanh.net${e.image.toString()}');"></div>
    <div class="text-floating">
    <p>${e.title}</p>
    </div>
    </div>
    </a>`))).join('')

   }


    
if(document.getElementById('trending'))
{
    
    fetch('/phimbo/trend').then(res=>res.json()).then((resp)=>{
   
    const trend = document.getElementById('trending')
    
    trend.innerHTML = (resp.array.map(e => (`
    <a class="wrapper" href='${e.href}'  onclick="addSearch('${e.href}','${e.title}','${e.image}');" onmouseover="mouseOver('${e.image}');">
    <div class="container-fluid justify-content-center">

    <div class="img-ctn" style="background-image:url('https://subnhanh.net${e.image.toString()}');"></div>
    
   <div class="text-floating">
   <p>${e.title}</p>
   </div>
    </div>
    </a>`))).join('')
})
}




