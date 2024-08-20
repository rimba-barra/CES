var Prolibs_83_2116 = Object.create(Prolibs);

Prolibs_83_2116.getScheduleCountAwal = function () {
    return -1; // mulai dari -1
};

Prolibs_83_2116.getBiayaBBNSertifikat = function (params) {
    var bbn = 0;
	bbn = 5500000;	
    return bbn;   
};

Prolibs_83_2116.getBiayaBAJB = function (params) {		
    var hrgNetto = params.hrgNetto;
	bajb  = (hrgNetto * 0.008);    
    return bajb;
};


Prolibs_83_2116.getBiayaBPHTB = function (params) {
    var hrgNetto = params.hrgNetto;
    var bphtb = 0;	 
    bphtb = (hrgNetto-60000000) * (5/100);
    return bphtb;
};