//获取操作系统名称
function getOS() {
    //定义结果变量
    var name = 'Other';
    var version = '';
    //获取userAgent
    var ua = navigator.userAgent;
    //移动平台iOS探测
    var reg = /like Mac OS X|Android|Windows Phone|Symbian/ig;
    var regResult = reg.exec(ua);
    if(!regResult){
        reg = /Mac OS X|Windows NT|Linux/ig;
        regResult = reg.exec(ua);
    }
    if(!regResult){
        //返回UNKNOWN
        return name;
    }else{
        //操作系统检测
        switch(regResult[0]){
            case 'like Mac OS X':
                name = 'iPhone';
                reg = /(iPhone|iPod|iPad).*?OS\s*(\d*[\_|\.\d]*)/ig;
                break;
            case 'Android':
                name = 'Android';
                reg = /(Android)\s*(\d*[\.\d]*)/ig;
                break;
            case 'Windows Phone':
                name = 'Windows Phone';
                reg = /(Windows Phone)\s*[OS]*\s*(\d*[\.\d]*)/ig;
                break;
            case 'Symbian':
                name = 'Symbian';
                reg = /(Symbian)\s*[OS]*\/*\s*(\d[\.\d]*)/ig;
                break;
            case 'Mac OS X':
                name = 'OS X';
                reg = /(Mac OS X)\s*(\d*[\_|\.\d]*)/ig;
                break;
            case 'Windows NT':
                name = 'Windows NT';
                reg = /(Windows NT)\s*(\d*[\_|\.\d]*)/ig;
                break;
            case 'Linux':
                name = 'Linux';
                reg = /(Linux)\s*(i*\d*)/ig;
                break
        }
        //获取版本号
        regResult = reg.exec(ua);
        if(regResult && regResult.length >= 3){
            version = regResult[2].replace(/\_+/ig, '.');
            reg = /^\d+\.*\d*/ig;
            regResult = reg.exec(version);
            if(regResult){
                version = regResult[0];
            }
        }
    };

    //返回操作系统名称+版本号
    //return [name, version].join(' ');
    return name.toLocaleLowerCase();
};

// alert(getOS());

//视频面试截止时间
var oEnd=new Date(2018, 6, 16, 15, 38, 30).getTime()-5*60*1000;

// Vue绑定
var app=new Vue({
    el:"#app",
    data:{
        timeKey:Time.compareTime(oEnd),     //面试没开始：true,面试已开始：false
        videoKey:false,                     //进入面试：true,   没有进入面试：false
        exitTime:'',                        //面试结束时间戳
        exitKey:false,                      //是否退出面试  true：退出，false:不退出
        fullKey:false,                      //true:提示人满了，false:隐藏显示框
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
            this.endVideoKey=false;
        },
        EndVideo:function(){
            this.endVideoKey=true;
        }

    }
});

$(function(){

    //启动计时
    // Time.getTimer({
    //     Begin:oEnd,
    //     ID:"#timer",
    //     EndFunc:function(self){
            
    //     }
    // })

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

    function setEle(){
        var RATIO1=480/1296;
        var oCWidth=$(".video-container").width();
        var oCHeight=$("body").height();
        var oVHeight=oCWidth*RATIO1;
        var oLeft=oCWidth/2;
        var oTop=(oCHeight-oVHeight)/2-25;

        $(".video-container").css({
            "height":oCWidth*RATIO1+"px",
            "top":oTop+"px",
            "marginLeft":-oLeft+"px",
        });
    }

    //关闭dialog
    $("body").on("click",".btn-dialog-close",function(){
        $(".dialog-container").hide();
    });

});


