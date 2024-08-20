var Prolibs_84_3111 = Object.create(Prolibs);

Prolibs_84_3111.getScheduleCountAwal=function(){
        return -1; // mulai dari -1
};


Prolibs_84_3111.getBiayaBBNSertifikat = function (params) {
    var bbn = 0;
	
    var hrgNetto = params.hrgNetto;
    var landSize = params.landSize;
    var landOverSize = params.landOverSize;
    var peruntukanCode = params.peruntukanCode;
    
    var totLand = accounting.unformat(landSize)+accounting.unformat(landOverSize);
	
    if(hrgNetto <= 300000000){
        bbn = 3000000;
    }else if(hrgNetto <= 750000000){
        bbn = 4000000;
    }else if(hrgNetto <= 1000000000){
        bbn = 4500000;
    }else {
        bbn = 5500000;
    }
        
    return bbn;
   
};

Prolibs_84_3111.getBiayaBAJB = function (params) {	
    var hrgNetto = params.hrgNetto;
    
    var bajb = 0;	
	
	bajb = hrgNetto * 0.005;
    
    return bajb;
};


Prolibs_84_3111.getBiayaBPHTB = function (params) {

	
     var hrgNetto = params.hrgNetto;
     
     var bphtb = 0;
     
     if(hrgNetto > 60000000){
         bphtb = (hrgNetto - 60000000)*0.05;
     }
	 
    return bphtb;
};

