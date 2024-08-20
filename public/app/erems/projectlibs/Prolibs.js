var Prolibs = {
    dataBillingRules:null,
    dataScheduleGrid:null,
    setDataBillingRules : function(dataBillingRules){
        this.dataBillingRules = dataBillingRules;
    },
    setDataScheduleGrid : function(dataScheduleGrid){
        this.dataScheduleGrid = dataScheduleGrid;
    },
    
    getUangMukaBillingRules : function(){
        var me = this;
        return me.dataBillingRules.um;
    },
    getUangMukaScheduleGrid : function(){
        var me = this;
        me.dataScheduleGrid.um = me.dataScheduleGrid.um - me.dataScheduleGrid.tj;
        return me.dataScheduleGrid.um;
    },
    // mendapatkan total uang muka di schedule grid untuk di update ke billing rules
    getUangMukaSchGridToBilRules:function(totUm,totTj){
        return totUm+totTj;
    },
    getSisaBillingRules:function(totHj,totUm,totTj){
        return totHj - totUm;
    },
    getScheduleCountAwal : function(){
        return 0; // mulai dari nol
    },
    getBiayaBBNSertifikat:function(params){
        return 0;
    },
    getBiayaBAJB:function(params){
        return 0;
    },
    getBiayaBPHTB:function(params){
        return 0;
    }
}
