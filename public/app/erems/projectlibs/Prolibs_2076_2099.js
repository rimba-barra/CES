var Prolibs_2076_2099 = Object.create(Prolibs);

Prolibs_2076_2099.getScheduleCountAwal=function(){
        return -1; // mulai dari -1
};

Prolibs_2076_2099.getBiayaBPHTB = function (params) {
	
     var hrgNetto = params.hrgNetto;
     
     var bphtb = 0;
     
     if(hrgNetto > 60000000){
         bphtb = (hrgNetto - 60000000)*0.05;
     }

    return bphtb;
};