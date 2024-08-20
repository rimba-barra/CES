var Prolibs_11136 _4216 = Object.create(Prolibs);

Prolibs_11136 _4216.getScheduleCountAwal=function(){
        return -1; // mulai dari -1
};

Prolibs_11136 _4216.getBiayaBPHTB = function (params) {
	
     var hrgNetto = params.hrgNetto;
     
     var bphtb = 0;
     
     if(hrgNetto > 60000000){
         bphtb = (hrgNetto - 60000000)*0.05;
     }

    return bphtb;
};