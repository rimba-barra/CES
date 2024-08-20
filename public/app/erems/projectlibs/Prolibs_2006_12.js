var Prolibs_2006_12 = Object.create(Prolibs);

Prolibs_2006_12.getUangMukaBillingRules = function() {
    var me = this;
    return me.dataBillingRules.um - me.dataBillingRules.tj;
};
Prolibs_2006_12.getUangMukaScheduleGrid = function() {
    var me = this;
    return me.dataScheduleGrid.um;
};
// mendapatkan total uang muka di schedule grid untuk di update ke billing rules
Prolibs_2006_12.getUangMukaSchGridToBilRules = function(totUm, totTj) {
    return totUm;
};
Prolibs_2006_12.getSisaBillingRules = function(totHj, totUm, totTj) {
    return totHj - (totUm + totTj);
};