//视频面试截止时间
var oEnd=new Date(2018, 6, 16, 4, 4, 30).getTime();
// Vue绑定
var app=new Vue({
    el:"#app",
    data:{
        timeKey:Time.compareTime(oEnd),     //面试没开始：true,面试已开始：false
        videoKey:false,                     //进入面试：true,   没有进入面试：false
        exitTime:'',                        //面试结束时间戳
        exitKey:false,                      //是否退出面试  true：退出，false:不退出
        fullKey:false,                   //true:提示人满了，false:隐藏显示框
        endVideoKey:false,                  //true:显示结束面试框，false:隐藏
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
        },
        beginTimer:function(){

        },
        cancelEndVideo:function(){
            this.endVideoKey=false;
        },
        confrimEndVideo:function(){

        },
        EndVideo:function(){
            this.endVideoKey=true;
        }
    }
});


$(function(){

    //启动计时
    Time.getTimer({
        Begin:oEnd,
        ID:"#timer",
        EndFunc:function(self){
            
        }
    });
    //启动时钟
    // Time.getCurrentClock("#clock");
    //启动倒计时
    Time.getCountDown({
        End:oEnd,
        ID:"#countdown",
        EndFunc:function(self){
            app.timeKey=self.compareTime(oEnd);
        }
    });

    //切换菜单项
    $("body").on("click",".more",function(){
        var oList=$(this).parents(".video-item").siblings();
        var oEle=$(this).parent().children(".func-box")
        var oKey=oEle.hasClass("func-show");

        if(oKey){
            oEle.removeClass("func-show");
        }else{
            for(var i=0;i<oList.length;i++){
                if(oList.eq(i).children(".menu-box").children(".func-box").hasClass("func-show")){
                    oList.eq(i).children(".menu-box").children(".func-box").removeClass("func-show");
                    break;
                }
            }
            oEle.addClass("func-show");
        }
    })
});

