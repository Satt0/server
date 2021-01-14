
function goto(value){
    a=(window.location.href.split('/'));
        console.log(a);
    a[a.length-2]=value;
    window.location.href=a.join('/')
}

function goto1(value){
    a=(window.location.href.split('/'));
        console.log(a);
    a[a.length-1]=value;
    window.location.href=a.join('/')
}
