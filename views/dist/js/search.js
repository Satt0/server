
function addSearch(value,title,image) {
    
    const storage = window.localStorage;
    let recent;
   
    if (!storage.getItem('recent')) {
        window.localStorage.setItem('recent', JSON.stringify([]));
        recent=JSON.parse(storage.getItem('recent'));

    }
    else {
        recent = JSON.parse(storage.getItem('recent'));
        
    }
    const compare = recent.some(e=>e.title===title)
    if(!compare){

        recent.push({src:value.toString(),image:image.toString(),title:title.toString()})
    }
    window.localStorage.setItem('recent', JSON.stringify(recent));

    



}
