(function(T){
    T.stringClock='';
    T.stringCountDown='';
    T.getCurrentDate=function(){
        return new Date();
    };
    T.getCurrentTime=function(){
        return this.getCurrentDate().formatHours()+':'+this.getCurrentDate().formatMinutes()+':'+this.getCurrentDate().formatSeconds();
    };
    T.getCurrentClock=function(id){
        var _self=this;
        //初始化时钟
        _self.stringClock=_self.getCurrentTime();
        _self.fillClock(id);
        
        //第一种：
        // setInterval(function(){
        //     _self.stringClock=_self.getCurrentTime();
        //     _self.fillClock(id);
        // },1000);

        // 第二种：
        return setTimeout(function(){
            _self.getCurrentClock(id);
        },1000);
    };
    T.fillClock=function(id){
        if(id.charAt(0)==='#'){
            id=id.substring(1);
        }
        document.getElementById(id).innerHTML=this.stringClock;
    };
    T.fillCountDown=function(id){
        if(id.charAt(0)==='#'){
            id=id.substring(1);
        }
        document.getElementById(id).innerHTML=this.stringCountDown;
    };
    T.getCountDown=function(o){
        var _self=this;
        var oNum=o.End.getTime()-this.getCurrentDate().getTime();
        var oDays='',
            oHours,
            oMinutes,
            oSeconds,
            oTime=parseInt(oNum/1000);

        if(oNum>0){

            if(oTime/60/60/24<30){
                if(oTime/60/60/24<1){
                    oDays='';
                }else{
                    if(oTime/60/60/24<10){
                        oDays='0'+parseInt(oTime/60/60/24)+'天';
                    }else{
                        oDays=''+parseInt(oTime/60/60/24)+'天';
                    }
                }
            }else{
                oDays='';
            }

            if(oTime/60/60<10){
                if(oTime/60/60<1){
                    oHours='00';
                }else{
                    oHours='0'+parseInt(oTime/60/60);
                }
            }else{
                if(oTime/60/60<60){
                    oHours=''+parseInt(oTime%(60*60));
                }else{
                    if(parseInt(oTime/60/60)%60<10){
                        oHours='0'+parseInt(oTime/60/60)%60;
                    }else{
                        oHours=''+parseInt(oTime/60/60)%60;
                    }
                }
                
            }
            
            if(oTime/60<10){
                if(oTime/60<1){
                    oMinutes='00';
                }else{
                    oMinutes='0'+parseInt(oTime/60);
                }
            }else{
                if(oTime/60<60){
                    oMinutes=''+parseInt(oTime%60);
                }else{
                    if(parseInt(oTime/60)%60<10){
                        oMinutes='0'+parseInt(oTime/60)%60;
                    }else{
                        oMinutes=''+parseInt(oTime/60)%60;
                    }
                    
                }
            }
    
            if(oTime%60<10){
                oSeconds='0'+parseInt(oTime%60);
            }else{
                oSeconds=''+parseInt(oTime%60);
            }

            _self.stringCountDown=oDays+oHours+'小时'+oMinutes+'分钟'+oSeconds+'秒';
            _self.fillCountDown(o.ID);

            return setTimeout(function(){
                _self.getCountDown(o);
            },1000);

        }else{

        }

    };

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

}(window.Time={}));


