var Prolibs_4034_2130 = Object.create(Prolibs);

Prolibs_4034_2130.getScheduleCountAwal = function () {
    return -1; // mulai dari -1
};

Prolibs_4034_2130.getBiayaBBNSertifikat = function (params) {
    console.log(params);
    var bbn = 0;
    var bphtb = 0;
    var peruntukanCode = params.peruntukanCode;
    var ptId = params.ptId;
    var salesGroup = params.salesGroup;
    var PriceType = params.PriceType;
    var hrgNetto = params.hrgNetto;
    
    var rs = 0.115; //11.5%
    var re = 0.08; //8%
    var ruko = 0.065; //6.5%
    var SKMHT = 0;
    if(PriceType == 'k'){ //KPR        
        var SKMHT = 3250000;
    }

    if(ptId == 2130){
        bphtb = hrgNetto  * 0.05; //5%
        if(peruntukanCode == '01'){
            bbn = ((ruko * hrgNetto) - SKMHT - bphtb) / 2;
        }else{
			if(salesGroup == 'RS'){
				bbn = ((rs * hrgNetto) - SKMHT - bphtb) / 2;
			}else if(salesGroup == 'RE'){
				bbn = ((re * hrgNetto) - SKMHT - bphtb) / 2;
			}	
		} 
    }else{
        bbn = hrgNetto * 0.015;
    }
	
    return bbn;
   
};


Prolibs_4034_2130.getBiayaBAJB = function (params) {	
    var bajb = 0;
    var peruntukanCode = params.peruntukanCode;
    var ptId = params.ptId;
    var salesGroup = params.salesGroup;	
    var PriceType = params.PriceType;
    var hrgNetto = params.hrgNetto;
    
    var rs = 0.115; //11.5%
    var re = 0.08; //8%
    var ruko = 0.065; //6.5%
    var SKMHT = 0;
    if(PriceType == 'k'){ //KPR        
        var SKMHT = 3250000;
    }

    if(ptId == 2130){
        bphtb = hrgNetto  * 0.05; //5%
		if(peruntukanCode == '01'){
            bajb = ((ruko * hrgNetto) - SKMHT - bphtb) / 2;
        }else{
			if(salesGroup == 'RS'){
				bajb = ((rs * hrgNetto) - SKMHT - bphtb) / 2;
			}else if(salesGroup == 'RE'){
				bajb = ((re * hrgNetto) - SKMHT - bphtb) / 2;
			}
		}
    }else{
        bajb  = hrgNetto * 0.005;
    }
    
    return bajb;
};


Prolibs_4034_2130.getBiayaBPHTB = function (params) {
    var bphtb = 0;
    var peruntukanCode = params.peruntukanCode;
    var ptId = params.ptId;
    var salesGroup = params.salesGroup;
    var PriceType = params.PriceType;
    var hrgNetto = params.hrgNetto;

    if(ptId == 2130){
        bphtb = hrgNetto  * 0.05; //5%
    }else{
        bphtb = hrgNetto  * 0.04;
    }
	 
		 
    return bphtb;
};