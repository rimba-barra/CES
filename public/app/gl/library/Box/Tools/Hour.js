Ext.define('Gl.library.box.tools.Hour', {
    hourString:'',
    hour:0,
    minute:0,
    second:0,
    type:'24', /// type 24 hours / 12 hours
    constructor: function(hourString) {
        if(hourString.length >= 8){
       
            var numbers = hourString.split(":");
            if(numbers){
                if(numbers[0]){
                    this.hour = isNaN(numbers[0])?0:numbers[0];
                    if(this.hour >= this.type){
                        this.hour = this.type - 1;
                    }
                }
                if(numbers[1]){
                    this.minute = isNaN(numbers[1])?0:numbers[1];
                }
                if(numbers[2]){
                    this.second = isNaN(numbers[2])?0:numbers[2];
                }
            }
        }
    },
    
    print:function(){
        console.log('hour : '+this.hourString);
    },
    setType:function(type){
        this.type = type;
    },
    getHour:function(){
      return this.hour;  
    },
    getMinute:function(){
       return this.minute;
    },
    getSecond:function(){
        return this.second;
    }
});


