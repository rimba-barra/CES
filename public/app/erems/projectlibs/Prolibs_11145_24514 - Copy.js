var Prolibs_11145_24514 = Object.create(Prolibs);

Prolibs_11145_24514.getScheduleCountAwal = function () {
    return -1; // mulai dari -1
};

Prolibs_11145_24514.getBiayaBBNSertifikat = function (params) {
    var bbn = 5500000;
    return bbn;
   
};


Prolibs_11145_24514.getBiayaBAJB = function (params) {		
    var hrgNetto = params.hrgNetto;
    var bajb = 2;
    bajb = (hrgNetto * 0.008);
    
    return bajb;
};


Prolibs_11145_24514.getBiayaBPHTB = function (params) {
    var hrgNetto = params.hrgNetto;
	var bphtb = 3;     
	bphtb = ((hrgNetto - 60000000) * 0.05);
    
    return bphtb;
};