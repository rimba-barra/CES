var Prolibs_4036_3149 = Object.create(Prolibs);

Prolibs_4036_3149.getScheduleCountAwal = function () {
    return -1; // mulai dari -1
};

/*
Prolibs_108_2090.getUangMukaScheduleGrid = function () {
    var me = this;
    me.dataScheduleGrid.um = me.dataScheduleGrid.um;
    return me.dataScheduleGrid.um;
};
Prolibs_108_2090.getUangMukaSchGridToBilRules = function (totUm, totTj) {
    return totUm;
};
Prolibs_108_2090.getSisaBillingRules = function (totHj, totUm, totTj) {
    return totHj - (totUm +totTj);
};
*/

Prolibs_4036_3149.getBiayaBBNSertifikat = function (params) {
    var bbn = 0;
    var landSize = params.landSize;
    var landOverSize = params.landOverSize;
    var peruntukanCode = params.peruntukanCode;
    
    var totLand = accounting.unformat(landSize)+accounting.unformat(landOverSize);
	
    if(totLand <= 90){
        bbn = 3000000;
    }else if(totLand <= 120){
        bbn = 3100000;
    }else if(totLand <= 200){
        bbn = 3200000;
    }else if(totLand <= 250){
        bbn = 3300000;
    }else if(totLand <= 300){
        bbn = 3400000;
    }else if(totLand <= 350){
        bbn = 3500000;
    }else if(totLand <= 400){
        bbn = 3600000;
    }else if(totLand > 400){
        bbn = 3700000;
    }
        
    // if(peruntukanCode==='00'){
        // bbn = 450000000;
    // }

    
    return bbn;
   
};


Prolibs_4036_3149.getBiayaBAJB = function (params) {		
		
    var hrgNetto = params.hrgNetto;
    
    var bajb = 0;	
	
    if(hrgNetto > 80000000){
        bajb = (hrgNetto * 0.005) + (hrgNetto * 0.005 * 0.1) + 100.000;
		if(bajb > 5000000){
			bajb = 5000000;
		}
    }else if(hrgNetto <= 80000000){
         bajb = (hrgNetto * 0.005) + (hrgNetto * 0.005 * 0.1) + 100000;
		 if(bajb < 550000){
			bajb = 550000;
		 }
    }
    
    // bajb = (bajb*1.1) + 25000;
    
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


Prolibs_4036_3149.getBiayaBPHTB = function (params) {
	
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