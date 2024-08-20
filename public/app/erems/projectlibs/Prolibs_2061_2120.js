var Prolibs_2052_2120 = Object.create(Prolibs);

Prolibs_2052_2120.getScheduleCountAwal = function () {
    return -1; // mulai dari -1
};

Prolibs_2052_2120.getBiayaBBNSertifikat = function (params) {
    var bbn = 0;
	bbn = 4250000;	
    return bbn;   
};

Prolibs_2052_2120.getBiayaBAJB = function (params) {		
    var hrgNetto = params.hrgNetto;
	bajb  = (hrgNetto * 0.005);    
    return bajb;
};


Prolibs_2052_2120.getBiayaBPHTB = function (params) {
    var hrgNetto = params.hrgNetto;
    var bphtb = 0;	 
    bphtb = (hrgNetto-60000000) * (5/100);
    return bphtb;
};