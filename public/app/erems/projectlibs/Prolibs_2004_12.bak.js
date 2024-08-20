function Prolibs_2004_12 () {
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
        return me.dataBillingRules.um - me.dataBillingRules.tj;
    }
    this.getUangMukaScheduleGrid = function(){
        var me = this;
        return me.dataScheduleGrid.um;
    }
    // mendapatkan total uang muka di schedule grid untuk di update ke billing rules
    this.getUangMukaSchGridToBilRules = function(totUm,totTj){
        return totUm;
    }
    this.getSisaBillingRules = function(totHj,totUm,totTj){
        return totHj - (totUm+totTj);
    }
}

var Prolibs_2004_12 = new Prolibs_2004_12();