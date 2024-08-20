function Prolibs_5_38 () {
    this.dataBillingRules = null;
    this.dataScheduleGrid = null;
    this.setDataBillingRules = function(dataBillingRules){
        this.dataBillingRules = dataBillingRules;
    }
    this.setDataScheduleGrid = function(dataScheduleGrid){
        this.dataScheduleGrid = dataScheduleGrid;
    }
    
    this.getUangMukaBillingRules = function(){
        var me = this;
        return me.dataBillingRules.um;
    }
    this.getUangMukaScheduleGrid = function(){
        var me = this;
        me.dataScheduleGrid.um = me.dataScheduleGrid.um - me.dataScheduleGrid.tj;
        return me.dataScheduleGrid.um;
    }
    // mendapatkan total uang muka di schedule grid untuk di update ke billing rules
    this.getUangMukaSchGridToBilRules = function(totUm,totTj){
        return totUm+totTj;
    }
    this.getSisaBillingRules = function(totHj,totUm,totTj){
        return totHj - totUm;
    }
}

var Prolibs_5_38 = new Prolibs_5_38();