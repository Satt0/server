
function goto(value){
    a=(window.location.href.split('/'));

    a[a.length-1]=value;
    window.location.href=a.join('/')
}