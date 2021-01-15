
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





}

const mouseOver=(value)=>{
   
  const a=document.getElementById('wallpaper-blur')
  a.style.backgroundImage=`url('${"https://subnhanh.net"+value}')`
 const b=Array.from( document.getElementsByClassName('color-text'))

 b.forEach(element => {
      element.style.color="white"
      element.style.textShadow="1px 1px black"
      
  });
}
if (!storage.getItem('recent')) {
    window.localStorage.setItem('recent', JSON.stringify([]));

}
else {
    recent = JSON.parse(storage.getItem('recent'));
}
;

    list.innerHTML = (recent.splice(0, 10).map(e => (`
    <a class="wrapper" href='${e.src}'  onclick="addSearch('${e.src}','${e.title}','${e.image}');" onmouseover="mouseOver('${e.image}');">

    <div class="img-ctn" style="background-image:url('https://subnhanh.net${e.image.toString()}');"></div>
    <p>${e.title}</p>
    </a>`))).join('')



    


fetch('/phimbo/trend').then(res=>res.json()).then((resp)=>{
    console.log(resp);
    const trend = document.getElementById('trending')
    
    trend.innerHTML = (resp.array.map(e => (`
    <a class="wrapper" href='${e.href}'  onclick="addSearch('${e.href}','${e.title}','${e.image}');" onmouseover="mouseOver('${e.image}');">
    <div class="img-ctn" style="background-image:url('https://subnhanh.net${e.image.toString()}');"></div>
    <p>${e.title}</p>
    </a>`))).join('')
})


