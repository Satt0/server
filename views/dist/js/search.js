
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
    const index=recent.findIndex(e=>e.title===title)
    if(!compare){

        recent.unshift({src:value.toString(),image:image.toString(),title:title.toString()})
    }
    else{
            const temp=recent[0];
            recent[0]=recent[index]
            recent[index]=temp;
    }
    window.localStorage.setItem('recent', JSON.stringify(recent));

    



}
