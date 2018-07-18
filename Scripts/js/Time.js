(function(T){
    T.stringClock='';
    T.stringCountDown='';
    T.stringTimer='';
    T.endTime=new Date().getTime()+1000*60;
    T.beginTime=new Date().getTime()-1000*60;
    T.initDate=function(){
        return new Date(1970,1,1,0,0,0);
    };
    T.getCurrentDate=function(){
        return new Date();
    };
    T.compareTime=function(End){
        if(typeof End === "number"&&End>this.initDate().getTime()){
            if(this.getCurrentDate().getTime()<End){
                return true;
            }else{
                return false;
            }
        }
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
    T.diffTime=function(){
        return parseInt((this.endTime-this.getCurrentDate().getTime())/1000);
    };
    T.countDownSeconds=function(){
        var oTime=this.diffTime();
        if(oTime%60<10){
            return '0'+parseInt(oTime%60);
        }else{
            return ''+parseInt(oTime%60);
        }
    };

    T.countDownMinutes=function(){
        var oTime=this.diffTime();
        if(parseInt(oTime/60)%60<10){
            return '0'+parseInt(oTime/60)%60;
        }else{
            return ''+parseInt(oTime/60)%60;
        }
    };

    T.countDownHours=function(){
        var oTime=this.diffTime();
        if(parseInt(oTime/60/60)%24<10){
            return '0'+parseInt(oTime/60/60)%24;
        }else{
            return ''+parseInt(oTime/60/60)%24;
        }
    };

    T.countDownDays=function(){
        var oTime=this.diffTime();
        if(parseInt(oTime/60/60/24)>0){
            if(parseInt(oTime/60/60/24)<10){
                return '0'+parseInt(oTime/60/60/24);
            }else{
                return ''+parseInt(oTime/60/60/24);
            }
        }else{
            return false;
        }
    };
    
    T.getCountDown=function(o){
        var _self=this;
        _self.endTime=o.End;

        if(_self.compareTime(o.End)){

            _self.stringCountDown=(_self.countDownDays()?_self.countDownDays()+'天':'')+_self.countDownHours()+'小时'+_self.countDownMinutes()+'分钟'+_self.countDownSeconds()+'秒';
            _self.fillCountDown(o.ID);

            return setTimeout(function(){
                _self.getCountDown(o);
            },1000);

        }else{
            return o.EndFunc(_self);
        }
    };

    T.timerSeconds=function(){
        var oTime=this.reduceTimer();
        if(oTime%60<10){
            return '0'+parseInt(oTime%60);
        }else{
            return ''+parseInt(oTime%60);
        }
    };

    T.timerMinutes=function(){
        var oTime=this.reduceTimer();
        if(parseInt(oTime/60)%60<10){
            return '0'+parseInt(oTime/60)%60;
        }else{
            return ''+parseInt(oTime/60)%60;
        }
    };

    T.timerHours=function(){
        var oTime=this.reduceTimer();
        if(parseInt(oTime/60/60)%24<10){
            return '0'+parseInt(oTime/60/60)%24;
        }else{
            return ''+parseInt(oTime/60/60)%24;
        }
    };

    T.timerDays=function(){
        var oTime=this.reduceTimer();
        if(parseInt(oTime/60/60/24)>0){
            if(parseInt(oTime/60/60/24)<10){
                return '0'+parseInt(oTime/60/60/24);
            }else{
                return ''+parseInt(oTime/60/60/24);
            }
            
        }else{
            return false;
        }
    };

    T.reduceTimer=function(){
        return parseInt((this.getCurrentDate().getTime()-this.beginTime)/1000);
    };

    T.getTimer=function(o){
        var _self=this;
        _self.beginTime=o.Begin;

        if(typeof o.Begin === "number"&&o.Begin>this.initDate().getTime()){
            if(_self.getCurrentDate().getTime()>o.Begin){

                _self.stringTimer=(_self.timerDays()?_self.timerDays()+':':'')+_self.timerHours()+':'+_self.timerMinutes()+':'+_self.timerSeconds();
                _self.fillTimer(o.ID);
    
                return setTimeout(function(){
                    _self.getTimer(o);
                },1000);
            }
        }
    };

    T.fillTimer=function(id){
        if(id.charAt(0)==='#'){
            id=id.substring(1);
        }
        document.getElementById(id).innerHTML=this.stringTimer;
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


