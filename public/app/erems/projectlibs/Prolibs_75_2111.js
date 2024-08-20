var Prolibs_75_2111 = Object.create(Prolibs);

Prolibs_75_2111.getScheduleCountAwal = function () {
    return -1; // mulai dari -1
};

Prolibs_75_2111.getBiayaBBNSertifikat = function (params) {
    var bbn = 0;
	bbn = 4000000;	
    return bbn;   
};

Prolibs_75_2111.getBiayaBAJB = function (params) {		
    var hrgNetto = params.hrgNetto;
	bajb  = (hrgNetto * 0.006);    
    return bajb;
};


Prolibs_75_2111.getBiayaBPHTB = function (params) {
    var hrgNetto = params.hrgNetto;
    var bphtb = 0;	 
    bphtb = (hrgNetto-60000000) * (5/100);
    return bphtb;
};