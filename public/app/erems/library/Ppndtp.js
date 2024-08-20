Ext.define('Erems.library.Ppndtp', {
    init      : function() {},
    calculate : function(netto, amountppn){
        var amountPPNDTP = 0;
        if (parseFloat(netto) <= 2000000000) {
            amountPPNDTP = parseFloat(amountppn);
        } 
        else if (parseFloat(netto) > 2000000000 && parseFloat(netto) <= 5000000000) {
            // amountPPNDTP = parseFloat(amountppn)-(2000000000*0.11);
            amountPPNDTP = parseFloat(2000000000*0.11);
        }
        return parseFloat(amountPPNDTP);
	}
});