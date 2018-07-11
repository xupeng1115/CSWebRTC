//视频面试截止时间
var oEnd=new Date(2018, 6, 10, 17, 4, 30).getTime();

// Vue绑定
var app=new Vue({
    el:"#app",
    data:{
        timeKey:Time.compareTime(oEnd),     //面试没开始：true,面试已开始：false
        videoKey:false,                     //进入面试：true,   没有进入面试：false
        exitTime:'',                        //面试结束时间戳
        exitKey:false,                      //是否退出面试  true：退出，false:不退出
        fullKey:false,                      //true:提示人满了，false:隐藏显示框
    },
    computed:{
        
    },
    watch:{
        
    },
    methods:{
        beginInterview:function(){

            //判断是否结束

            //判断是否人满
            // this.fullKey=true;

            //开始进入，显示房间
            this.videoKey=true;

            //视频显示部分

        },
        exitInterview:function(){
            app.exitTime=new Date().getTime()+30*60*1000;
            setTimeout(function(){
                app.exitKey=true;
            },30*60*1000)
        },
        closeWarn:function(){
            this.fullKey=false;
        }
    }
});


$(function(){
    //启动时钟
    Time.getCurrentClock("#clock");
    //启动倒计时
    Time.getCountDown({
        End:oEnd,
        ID:"#countdown",
        EndFunc:function(self){
            app.timeKey=self.compareTime(oEnd);
        }
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

