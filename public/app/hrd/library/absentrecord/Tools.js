Ext.define('Hrd.library.absentrecord.Tools', {
    requires:['Hrd.library.box.tools.Tools'],
    TIME_A:'7_14',
    TIME_B:'15_21',
    TIME_C:'22_6',
    constructor: function(options) {
        Ext.apply(this, options || {});
        var me = this;
        
        me.tools = new Hrd.library.box.tools.Tools();
    },
    
    getTimeZone:function(timeIn,isIn){
        var me = this;
        var isInx = typeof isIn==='undefined'?true:isIn;
        var zone = me.getZone(timeIn);
        var zoneText = false;
        if(zone){
            zoneText = isInx?'in_':'out_';
            zoneText = zoneText+''+zone;
        }
        return zoneText;
    },
    getZone:function(time){
        var me = this;
        
        
        var hasil = false;
       
       
        if(me.tools.inBetween(time,'07:00:00','14:59:59')){
            hasil =  me.TIME_A;
        }else if(me.tools.inBetween(time,'15:00:00','21:59:59')){
            hasil =  me.TIME_B;
        }else if(me.tools.inBetween(time,'22:00:00','06:59:59')){
            hasil =  me.TIME_C;
        }
        return hasil;
    }
    
    
});


