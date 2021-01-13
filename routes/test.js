const a=`<a href="javascript:;" onclick="ajaxPlayer('9002', 'hls', $(this))" class="button-2 w-button btn-hls">VIP 1</a>`
let b=(a.substring(a.indexOf("ajaxPlayer"),a.indexOf('$(this)')).split(`'`));
console.log(b[1],b[3]);