var Prolibs_3_30 = Object.create(Prolibs);

Prolibs_3_30.getScheduleCountAwal = function () {
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

Prolibs_3_30.getBiayaBBNSertifikat = function (params) {
    var bbn = 0;
    var landSize = params.landSize;
    var landOverSize = params.landOverSize;
    var peruntukanCode = params.peruntukanCode;
    
    var totLand = accounting.unformat(landSize)+accounting.unformat(landOverSize);
	
    if(totLand <= 90){
        bbn = 1660000;
    }else if(totLand <= 120){
        bbn = 1700000;
    }else if(totLand <= 200){
        bbn = 1820000;
    }else if(totLand <= 250){
        bbn = 1890000;
    }else if(totLand <= 300){
        bbn = 1960000;
    }else if(totLand <= 350){
        bbn = 2030000;
    }else if(totLand <= 400){
        bbn = 2100000;
    }else if(totLand > 400){
        bbn = 2250000;
    }
	
	/* var bbn = 0;
    var totBiayaSurat = 0;
    var bphtb = 0;
    var hrgNetto = params.hrgNetto;
    // var landSize = params.landSize;
    // var landOverSize = params.landOverSize;
    // var peruntukanCode = params.peruntukanCode;
    // var totLand = accounting.unformat(landSize)+accounting.unformat(landOverSize);

	totBiayaSurat = hrgNetto * 0.06;
	bphtb = (hrgNetto - 60000000) * 0.05;
	bbn = (totBiayaSurat - bphtb) * 0.7; */
	
    return bbn;
   
};


Prolibs_3_30.getBiayaBAJB = function (params) {		
    /* var hrgNetto = params.hrgNetto;
    var bajb = 0;	
    var totBiayaSurat = 0;
    var bphtb = 0;
	
	totBiayaSurat = hrgNetto * 0.06;
	bphtb = (hrgNetto - 60000000) * 0.05;
	bajb  = (totBiayaSurat - bphtb) * 0.3;
    
    return bajb; */
	var hrgNetto = params.hrgNetto;
    var bajb = 0;	
	
	//totBiayaSurat = hrgNetto * 0.06;
	//bphtb = (hrgNetto - 60000000) * 0.05;
	if(hrgNetto > 40000000){
         bajb = (hrgNetto * 0.005)+(hrgNetto*0.005*0.1)+100000;
     } 
	//bajb  = hrgNetto * 0.005;
    
    return bajb;
};


Prolibs_3_30.getBiayaBPHTB = function (params) {
    var hrgNetto = params.hrgNetto;
    var BBNSertifikat = 0;
	var landSize = params.landSize;
    var landOverSize = params.landOverSize;
    var peruntukanCode = params.peruntukanCode;
    var totLand = accounting.unformat(landSize)+accounting.unformat(landOverSize);
	var bajb = 0;
    var bphtb = 0;
	
	if(totLand <= 90){
        BBNSertifikat = 1660000;
    }else if(totLand <= 120){
        BBNSertifikat = 1700000;
    }else if(totLand <= 200){
        BBNSertifikat = 1820000;
    }else if(totLand <= 250){
        BBNSertifikat = 1890000;
    }else if(totLand <= 300){
        BBNSertifikat = 1960000;
    }else if(totLand <= 350){
        BBNSertifikat = 2030000;
    }else if(totLand <= 400){
        BBNSertifikat = 2100000;
    }else if(totLand > 400){
        BBNSertifikat = 2250000;
    }
	
	if(hrgNetto > 40000000){
         bajb = (hrgNetto * 0.005)+(hrgNetto*0.005*0.1)+100000;
     } 
	
	bphtb = (hrgNetto * 0.06) - BBNSertifikat-bajb;
    
    return bphtb;
};