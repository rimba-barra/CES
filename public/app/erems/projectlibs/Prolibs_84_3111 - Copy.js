var Prolibs_84_3111 = Object.create(Prolibs);

Prolibs_84_3111.getScheduleCountAwal=function(){
        return -1; // mulai dari -1
};


Prolibs_84_3111.getBiayaBBNSertifikat = function (params) {
    var bbn = 0;
    var landSize = params.landSize;
    var landOverSize = params.landOverSize;
    var peruntukanCode = params.peruntukanCode;
    
    var totLand = accounting.unformat(landSize)+accounting.unformat(landOverSize);
	
    if(totLand <= 90){
        bbn = 3500000;
    }else if(totLand <= 150){
        bbn = 3650000;
    }else if(totLand <= 200){
        bbn = 3750000;
    }else if(totLand <= 250){
        bbn = 3850000;
    }else if(totLand <= 300){
        bbn = 4000000;
    }else if(totLand <= 400){
        bbn = 4250000;
    }else{
        bbn = 4500000;
    }
        
    return bbn;
   
};

Prolibs_84_3111.getBiayaBAJB = function (params) {		
		
    var hrgNetto = params.hrgNetto;
    
    var bajb = 0;	
	
    if(hrgNetto <= 500000000){
        bajb = (hrgNetto * 0.0075);
	}else  if(hrgNetto <= 1000000000){
        bajb = (hrgNetto * 0.0065);
    }else  if(hrgNetto <= 1500000000){
        bajb = (hrgNetto * 0.0060);
    }else  if(hrgNetto <= 2000000000){
        bajb = (hrgNetto * 0.0055);
    }else  if(hrgNetto > 2000000000){
        bajb = (hrgNetto * 0.0050);
    }
	bajb = (bajb * 1.1) + 25000;
    
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

