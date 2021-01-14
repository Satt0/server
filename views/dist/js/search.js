
function addSearch(value,title) {
    
    const storage = window.localStorage;
    let recent;
    console.log(value,title);
   
    if (!storage.getItem('recent')) {
        window.localStorage.setItem('recent', JSON.stringify([]));
        recent=JSON.parse(storage.getItem('recent'));

    }
    else {
        recent = JSON.parse(storage.getItem('recent'));
        
    }
    recent.push({src:value.toString(),title:title})
    console.log(recent);
    window.localStorage.setItem('recent', JSON.stringify(recent));

    



}
