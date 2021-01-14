const list=document.getElementById('recent-list')
const storage=window.localStorage;
let recent;
if(!storage.getItem('recent'))
{
    window.localStorage.setItem('recent', JSON.stringify([]));

}
else{
    recent=JSON.parse(storage.getItem('recent'));
}
;
list.innerHTML=(recent.reverse().splice(0,10).map(e=>(`<a class="wrapper" href=${e.src.toString()}>
    <img src="https://subnhanh.net${e.image.toString()}"/>
    <p>${e.title}</p>
    </a>`))).join('')