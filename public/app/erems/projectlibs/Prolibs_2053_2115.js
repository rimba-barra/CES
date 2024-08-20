var Prolibs_2053_2115 = Object.create(Prolibs);

Prolibs_2053_2115.getScheduleCountAwal = function () {
    return -1; // mulai dari -1
};

Prolibs_2053_2115.getBiayaBBNSertifikat = function (params) {
    var bbn = 4000000;
	
    return bbn;
   
};


Prolibs_2053_2115.getBiayaBAJB = function (params) {
	console.log('params ajb',params);		
    var hrgNetto = params.hrgNetto;
    var TypeCode = params.TypeCode;
    var bajb = 0;	
	
	TypeCode = TypeCode.trim();
	console.log('TypeCode',TypeCode);
	if(hrgNetto<500000000 && (TypeCode =='LIL' || TypeCode =='ARC')){
		bajb  = (hrgNetto * 0.01);
	}else{
		bajb  = (hrgNetto * 0.006);
	
	}	
    
    return bajb;
};


Prolibs_2053_2115.getBiayaBPHTB = function (params) {	
	// console.log('params bphtb',params);
    var hrgNetto = params.hrgNetto;
    var bphtb = 0;
	 
    bphtb = (hrgNetto-60000000) * (5/100);
		 
    return bphtb;
};