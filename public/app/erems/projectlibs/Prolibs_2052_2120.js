var Prolibs_2052_2120 = Object.create(Prolibs);

Prolibs_2052_2120.getScheduleCountAwal = function () {
    return -1; // mulai dari -1
};

Prolibs_2052_2120.getBiayaBBNSertifikat = function (params) {
    var bbn = 0;
    // var landSize = params.landSize;
    // var landOverSize = params.landOverSize;
    var peruntukanCode = params.peruntukanCode;
    
    // var totLand = accounting.unformat(landSize)+accounting.unformat(landOverSize);
    // if(totLand <= 200){
    //     bbn = 2750000;
    // }else if(totLand <= 300){
    //     bbn = 3250000;
    // }else if(totLand <= 400){
    //     bbn = 3500000;
    // }else if(totLand <= 500){
    //     bbn = 3750000;
    // }
    if(peruntukanCode==='00'){
        bbn = 22000000;
    }else {
        bbn = 4500000;

    }

    
    return bbn;  
};

Prolibs_2052_2120.getBiayaBAJB = function (params) {		
    var hrgNetto = params.hrgNetto;
    var peruntukanCode = params.peruntukanCode;

    if(peruntukanCode==='00'){
        bajb  = (hrgNetto * 0.01);
    }else {
        bajb  = (hrgNetto * 0.005);

    }
	    
    return bajb;
};


Prolibs_2052_2120.getBiayaBPHTB = function (params) {
    var hrgNetto = params.hrgNetto;
    var bphtb = 0;	 
    bphtb = (hrgNetto-60000000) * (5/100);
    return bphtb;
};