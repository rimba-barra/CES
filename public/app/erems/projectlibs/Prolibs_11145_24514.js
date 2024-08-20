var Prolibs_11145_24514 = Object.create(Prolibs);

Prolibs_11145_24514.getScheduleCountAwal = function () {
    return -1; // mulai dari -1
};

Prolibs_11145_24514.getBiayaBBNSertifikat = function (params) {
	console.log('params bbn',params);
    var bbn = 0;
    var totBiayaSurat = 0;
    var bphtb = 0;
    var hrgNetto = params.hrgNetto;

	totBiayaSurat = hrgNetto * 0.06;
	bphtb = (hrgNetto - 60000000) * 0.05;
	bbn = (totBiayaSurat - bphtb) * 0.7;
	
    return bbn;
   
};


Prolibs_11145_24514.getBiayaBAJB = function (params) {
	console.log('params ajb',params);		
    var hrgNetto = params.hrgNetto;
    var bajb = 0;	
    var totBiayaSurat = 0;
    var bphtb = 0;
	
	totBiayaSurat = hrgNetto * 0.06;
	bphtb = (hrgNetto - 60000000) * 0.05;
	bajb  = (totBiayaSurat - bphtb) * 0.3;
    
    return bajb;
};


Prolibs_11145_24514.getBiayaBPHTB = function (params) {	
	console.log('params bphtb',params);
    var hrgNetto = params.hrgNetto;
    var bphtb = 0;
	 
    bphtb = (hrgNetto - 60000000) * 0.05;
		 
    return bphtb;
};