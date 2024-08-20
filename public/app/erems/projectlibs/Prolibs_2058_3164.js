var Prolibs_2058_3164 = Object.create(Prolibs);

Prolibs_2058_3164.getScheduleCountAwal = function () {
    return -1; // mulai dari -1
};

Prolibs_2058_3164.getBiayaBBNSertifikat = function (params) {
    var bbn = 4000000;
    
    return bbn;
   
};


Prolibs_2058_3164.getBiayaBAJB = function (params) {      
    var hrgNetto = params.hrgNetto;
    bajb  = (hrgNetto * 0.01);    
    return bajb;
};

Prolibs_2058_3164.getBiayaBPHTB = function (params) {
    var hrgNetto = params.hrgNetto;
    var bphtb = 0;   
    bphtb = (hrgNetto-60000000) * (5/100);
    return bphtb;
};