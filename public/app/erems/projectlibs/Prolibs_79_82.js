var Prolibs_79_82 = Object.create(Prolibs);

Prolibs_79_82.getScheduleCountAwal = function () {
    return -1; // mulai dari -1
};


Prolibs_79_82.getBiayaBBNSertifikat = function (params) {
    var bbn = 2000000;	
    return bbn;
   
};


Prolibs_79_82.getBiayaBAJB = function (params) {		
    var hrgNetto = params.hrgNetto;
    var bajb = 0;
	bajb  = (hrgNetto * 0.006);    
    return bajb;
};


Prolibs_79_82.getBiayaBPHTB = function (params) {
    var hrgNetto = params.hrgNetto;
    var bphtb = 0;
	 
    bphtb = (hrgNetto-60000000) * (5/100);
		 
    return bphtb;
};