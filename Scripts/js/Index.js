//视频面试截止时间
var oEnd=new Date(2018, 6, 20, 18, 40, 59);

$(function(){
    //启动时钟
    Time.getCurrentClock("#clock");
    //启动倒计时
    Time.getCountDown({
        End:oEnd,
        ID:"#countdown"
    });
    //美化滚动条
    $('#video-box').niceScroll({
        cursorcolor: "#000",
        cursoropacitymax: 0.4, 
        touchbehavior:false, 
        cursorwidth: "5px", 
        cursorborder: "0", 
        cursorborderradius: "5px",
        autohidemode: true,
    });
});

