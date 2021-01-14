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
list.innerHTML=(recent.map(e=>(`
    <li>
    <a href=${e.src.toString()}>Xem > ${e.title}</p>
    </li>

`)))