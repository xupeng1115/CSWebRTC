(function(T){
    T.stringClick='',
    T.stringCountDown='',
    T.getCurrentDate=function(){
        return new Date();
    },
    T.getCurrentTime=function(){
        return this.getCurrentDate().formatHours()+':'+this.getCurrentDate().formatMinutes()+':'+this.getCurrentDate().formatSeconds();
    },
    T.getCurrentClick=function(id){
        var _self=this;
        //初始化时钟
        _self.stringClick=_self.getCurrentTime();
        _self.fillClick(id);
        
        //第一种：
        // setInterval(function(){
        //     _self.stringClick=_self.getCurrentTime();
        //     _self.fillClick(id);
        // },1000);

        // 第二种：
        return setTimeout(function(){
            _self.getCurrentClick(id);
        },1000);
    },
    T.fillClick=function(id){
        if(id.charAt(0)==='#'){
            id=id.substring(1);
        }
        document.getElementById(id).innerHTML=this.stringClick;
    },
    T.fillCountDown=function(id){
        if(id.charAt(0)==='#'){
            id=id.substring(1);
        }
        document.getElementById(id).innerHTML=this.stringCountDown;
    },
    T.getCountDown=function(o){
        var _self=this;
        var oNum=o.End.getTime()-this.getCurrentDate().getTime();
        var oHours,
            oMinutes,
            oSeconds,
            oTime=parseInt(oNum/1000);

        if(oNum>0){
            if(oTime/60/60<10){
                if(oTime/60/60<1){
                    oHours='00';
                }else{
                    oHours='0'+parseInt(oTime/60/60);
                }
            }else{
                oHours=''+parseInt(oTime/60/60);
            }
            
            if(oTime/60<10){
                if(oTime/60<1){
                    oMinutes='00';
                }else{
                    oMinutes='0'+parseInt(oTime/60);
                }
            }else{
                oMinutes=''+parseInt(oTime/60);
            }
    
            if(oTime%60<10){
                oSeconds='0'+parseInt(oTime%60);
            }else{
                oSeconds=''+parseInt(oTime%60);
            }
        }else{

        }

        _self.stringCountDown=oHours+'小时'+oMinutes+'分钟'+oSeconds+'秒';
        _self.fillCountDown(o.ID);

        return setTimeout(function(){
            _self.getCountDown(o);
        },1000);
        
    }
}(window.Time={}));

Date.prototype.formatTime=function(time){
    if(time<10){
        return '0'+time;
    }else{
        return ''+time;
    }
};

Date.prototype.formatHours=function(){
    return this.formatTime(this.getHours());
};

Date.prototype.formatMinutes=function(){
    return this.formatTime(this.getMinutes());
};

Date.prototype.formatSeconds=function(){
    return this.formatTime(this.getSeconds());
};

var oEnd=new Date(2018, 6, 6, 18, 59, 59);

$(function(){
    //启动时钟
    Time.getCurrentClick("#clock");
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

