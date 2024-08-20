var Prolibs_4031_3114 = Object.create(Prolibs);

Prolibs_4031_3114.getScheduleCountAwal = function () {
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


Prolibs_4031_3114.getBiayaBBNSertifikat = function (params) {
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
    }
    
   
	
	/*
	 lt := LandSz + LandOverSz;
  if lt <= 90 then Result := 3500000
  else if lt <= 150 then Result := 3650000
  else if lt <= 200 then Result := 3750000
  else if lt <= 250 then Result := 3850000
  else if lt <= 300 then Result := 4000000
  else if lt <= 400 then Result := 4250000
  else Result := 4500000;
	*/

    
    return bbn;
   
};


Prolibs_4031_3114.getBiayaBAJB = function (params) {
    var hrgNetto = params.hrgNetto;
    
    var bajb = 0;
    if(hrgNetto <= 500000000){
        
		bajb = ((hrgNetto*0.75/100)+(hrgNetto*0.75/100)*0.1)+25000;
    }else if(hrgNetto <= 1000000000){
         bajb = ((hrgNetto*0.65/100)+(hrgNetto*0.65/100)*0.1)+25000;
    }else if(hrgNetto <= 1500000000){
         bajb = ((hrgNetto*0.60/100)+(hrgNetto*0.60/100)*0.1)+25000;
    }else if(hrgNetto <= 2000000000){
         bajb = ((hrgNetto*0.55/100)+(hrgNetto*0.55/100)*0.1)+25000;
    }else if(hrgNetto > 2000000000){
         bajb = ((hrgNetto*0.50/100)+(hrgNetto*0.50/100)*0.1)+25000;
    }
    
   
    
    /*
    function HitungBAJBCGH_SAMARINDA(const HrgNetto: Double): Double;
begin
    if HrgNetto <= 500000000 then Result := ((HrgNetto*0.75/100)+(HrgNetto*0.75/100)*0.1)+25000
    else if HrgNetto <= 1000000000 then Result := ((HrgNetto*0.65/100)+(HrgNetto*0.65/100)*0.1)+25000
    else if HrgNetto <= 1500000000 then Result := ((HrgNetto*0.60/100)+(HrgNetto*0.60/100)*0.1)+25000
    else if HrgNetto <= 2000000000 then Result := ((HrgNetto*0.55/100)+(HrgNetto*0.55/100)*0.1)+25000
    else Result := ((HrgNetto*0.50/100)+(HrgNetto*0.50/100)*0.1)+25000;
end;

     */
    
    return bajb;
};


Prolibs_4031_3114.getBiayaBPHTB = function (params) {
     var hrgNetto = params.hrgNetto;
     
     var bphtb = 0;
     
   
       bphtb = (hrgNetto - 60000000) * (5/100);
     
    /*
    function HitungBPHTBCGH_SAMARINDA(const HrgNetto: Double): Double;
begin
    Result := (HrgNetto - 60000000) * (5/100) ;
end;
     */
    return bphtb;
};
