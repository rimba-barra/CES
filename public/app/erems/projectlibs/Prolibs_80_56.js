var Prolibs_80_56 = Object.create(Prolibs);

Prolibs_80_56.getScheduleCountAwal = function () {
    return -1; // mulai dari -1
};

Prolibs_80_56.getBiayaBBNSertifikat = function (params) {
    var bbn = 0;
	bbn = 9500000;	
    return bbn;   
};

Prolibs_80_56.getBiayaBAJB = function (params) {		
    var hrgNetto = params.hrgNetto;
	bajb  = (hrgNetto * 0.005);    
    return bajb;
};


Prolibs_80_56.getBiayaBPHTB = function (params) {
    var hrgNetto = params.hrgNetto;
    var bphtb = 0;	 
    bphtb = (hrgNetto-60000000) * (5/100);
    return bphtb;
};