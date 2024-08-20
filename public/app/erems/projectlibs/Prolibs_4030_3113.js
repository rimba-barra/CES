var Prolibs_4030_3113 = Object.create(Prolibs);

Prolibs_4030_3113.getScheduleCountAwal = function () {
    return -1; // mulai dari -1
};



Prolibs_4030_3113.getBiayaBBNSertifikat = function (params) {
    var bbn = 0;
    var landSize = params.landSize;
    var landOverSize = params.landOverSize;
    var peruntukanCode = params.peruntukanCode;
    
    var totLand = accounting.unformat(landSize)+accounting.unformat(landOverSize);
    if(totLand <= 200){
        bbn = 2750000;
    }else if(totLand <= 300){
        bbn = 3250000;
    }else if(totLand <= 400){
        bbn = 3500000;
    }else if(totLand <= 500){
        bbn = 3750000;
    }
    
   
    
    if(peruntukanCode==='00'){
        bbn = 450000000;
    }

    
    return bbn;
   
};


Prolibs_4030_3113.getBiayaBAJB = function (params) {
    var hrgNetto = params.hrgNetto;
    
    var bajb = 0;
    if(hrgNetto <= 500000000){
        bajb = hrgNetto*0.0075;
    }else if(hrgNetto <= 1000000000){
         bajb = hrgNetto*0.0065;
    }else if(hrgNetto <= 1500000000){
         bajb = hrgNetto*0.0060;
    }else if(hrgNetto <= 2000000000){
         bajb = hrgNetto*0.0055;
    }else if(hrgNetto > 2000000000){
         bajb = hrgNetto*0.0050;
    }
    
    bajb = (bajb*1.1) + 25000;
    
    /*
     IF HrgNetto <= 500000000 then result := HrgNetto * 0.0075
    else IF HrgNetto <= 1000000000 then result := HrgNetto * 0.0065
    else IF HrgNetto <= 1500000000 then result := HrgNetto * 0.0060
    else IF HrgNetto <= 2000000000 then result := HrgNetto * 0.0055
    else IF HrgNetto > 2000000000 then result := HrgNetto * 0.0050;
    result := (result * 1.1) + 25000;
     */
    
    return bajb;
};


Prolibs_4030_3113.getBiayaBPHTB = function (params) {
     var hrgNetto = params.hrgNetto;
     
     var bphtb = 0;
     
     if(hrgNetto > 60000000){
         bphtb = (hrgNetto - 60000000)*0.05;
     }
    /*
     if HrgNetto > 60000000 then Result := (HrgNetto - 60000000) * 0.05
  else Result := 0;
     */
    return bphtb;
};