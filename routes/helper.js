const helper={
    parseIt(str){
        const href=str.substring(str.indexOf('href'),str.indexOf('title'));
        const title=str.substring(str.indexOf('title'),str.indexOf('class="item-image-block'));
        const image=str.substring(str.indexOf('style="background-image:url'),str.indexOf('href'));
        
        return {
            href:'/phim'+href.trim().split('"')[1].substring(5),
            title:title.trim().split('"')[1],
            image:image.split(`'`)[1]
        };
    }
}
const a=`<a style="background-image:url('/images/anh-hung-phuong-bac_1.jpg')" href="/phim/anh-hung-phuong-bac" title="Anh Hùng Phương Bắc|2020" class="item-image-block poster-format mobile-larger w-inline-block" data-pjax="0"></a>`
helper.parseIt(a)
module.exports=helper