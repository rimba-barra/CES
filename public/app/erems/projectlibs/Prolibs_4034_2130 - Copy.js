var Prolibs_4034_2130 = Object.create(Prolibs);

Prolibs_4034_2130.getScheduleCountAwal = function () {
    return -1; // mulai dari -1
};

/*
Prolibs_108_2090.getUangMukaScheduleGrid = function () {
    var me = this;
    me.dataScheduleGrid.um = me.dataScheduleGrid.um;
    return me.dataScheduleGrid.um;
};
Prolibs_108_2090.getUangMukaSchGridToBilRules = function (totUm, totTj) {
    return totUm;
};
Prolibs_108_2090.getSisaBillingRules = function (totHj, totUm, totTj) {
    return totHj - (totUm +totTj);
};
*/
/*
Prolibs_4034_2130.getBiayaBBNSertifikat = function (params) {
    var bbn = 0;
    var totBiayaSurat = 0;
    var bphtb = 0;
    var hrgNetto = params.hrgNetto;
    // var landSize = params.landSize;
    // var landOverSize = params.landOverSize;
    // var peruntukanCode = params.peruntukanCode;
    // var totLand = accounting.unformat(landSize)+accounting.unformat(landOverSize);

	totBiayaSurat = hrgNetto * 0.06;
	bphtb = (hrgNetto - 60000000) * 0.05;
	bbn = (totBiayaSurat - bphtb) * 0.7;
	
    return bbn;
   
};


Prolibs_4034_2130.getBiayaBAJB = function (params) {		
    var hrgNetto = params.hrgNetto;
    var bajb = 0;	
    var totBiayaSurat = 0;
    var bphtb = 0;
	
	totBiayaSurat = hrgNetto * 0.06;
	bphtb = (hrgNetto - 60000000) * 0.05;
	bajb  = (totBiayaSurat - bphtb) * 0.3;
    
    return bajb;
};


Prolibs_4034_2130.getBiayaBPHTB = function (params) {
    var hrgNetto = params.hrgNetto;
    var bphtb = 0;
	 
    bphtb = (hrgNetto - 60000000) * 0.05;
		 
    return bphtb;
};
*/

Prolibs_4034_2130.getBiayaBBNSertifikat = function (params) {
    var bbn = 0;
    var hrgNetto = params.hrgNetto;
    // var landSize = params.landSize;
    // var landOverSize = params.landOverSize;
    // var peruntukanCode = params.peruntukanCode;
    // var totLand = accounting.unformat(landSize)+accounting.unformat(landOverSize);

	//totBiayaSurat = hrgNetto * 0.06;
	//bphtb = (hrgNetto - 60000000) * 0.05;
	bbn = hrgNetto * 0.015;
	
    return bbn;
   
};


Prolibs_4034_2130.getBiayaBAJB = function (params) {		
    var hrgNetto = params.hrgNetto;
    var bajb = 0;	
	
	//totBiayaSurat = hrgNetto * 0.06;
	//bphtb = (hrgNetto - 60000000) * 0.05;
	bajb  = hrgNetto * 0.005;
    
    return bajb;
};


Prolibs_4034_2130.getBiayaBPHTB = function (params) {
    var hrgNetto = params.hrgNetto;
    var bphtb = 0;
	 
    bphtb = hrgNetto  * 0.04;
		 
    return bphtb;
};