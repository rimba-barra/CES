Ext.define('Hrd.library.system.Tools', {
    /// untuk klaim yang resetnya lebih dari 1 tahun
    hitungPlafonBig:function(params){
         var klaimPengobatanId = params.klaimPengobatanId;
        var jenisPengobatanCode = params.jenisPengobatanCode;
        var nilaiKlaim = params.nilaiKlaim;
        var plafon = params.plafon;
        var klaimLama = params.klaimLama;
        var percentPengganti = params.percentPengganti;
        var resetYear = params.resetYear;
        var year = params.year;
        var idKlaim = klaimPengobatanId;
        var v = nilaiKlaim;
        var saldoAwal = params.saldoAwal;
        var totalKlaimBefore = 0;
        var saldo = 0;
        // var s = me.getGridclaim().getStore();
        var percent = percentPengganti;
        var klaimAfterPercent = 0;
        var fixKlaim = 0;
        var totalKlaimLama = 0;
        
        var per = params.per;
        var tahunReset = 0;
        
        
        
       // saldoAwal = plafon;
       
       if(year >= resetYear+per){
           saldoAwal = plafon;
           tahunReset = year;
       }

        if (percent > 0) {
            klaimAfterPercent = v - ((percent / 100) * v);
        } else {
            klaimAfterPercent = v;
        }





        if (klaimAfterPercent > saldoAwal) {
            fixKlaim = saldoAwal;
        } else {
            fixKlaim = klaimAfterPercent;
        }
        saldo = saldoAwal - fixKlaim;



        return {
            claimValue: fixKlaim,
            amountPengganti: klaimAfterPercent,
            saldo: saldo,
            totalKlaim: (saldoAwal - saldo) + totalKlaimLama,
            tahunReset:tahunReset
        };
    },
    hitungPlafon: function(params) {
        var klaimPengobatanId = params.klaimPengobatanId;
        var jenisPengobatanCode = params.jenisPengobatanCode;
        var nilaiKlaim = params.nilaiKlaim;
        var plafon = params.plafon;
        var klaimLama = params.klaimLama;
        var percentPengganti = params.percentPengganti;
        var resetYear = params.resetYear;
        var year = params.year;
       // var minYear = resetYear;
       // var maxYear = year;


        var idKlaim = klaimPengobatanId;



        var v = nilaiKlaim;



        var saldoAwal = 0;
        var totalKlaimBefore = 0;
        var saldo = 0;
        // var s = me.getGridclaim().getStore();
        var percent = percentPengganti;
        var klaimAfterPercent = 0;
        var fixKlaim = 0;
        var totalKlaimLama = 0;
        saldoAwal = plafon;
        var tahunAkhirKlaim = 0;
        var totalKlaimTahunAkhir = 0;
        
        
        if (klaimLama.length > 0) {
     
            /// cari tahun terakhir klaim
            for(var i in klaimLama){
                var tempTahun = parseInt(klaimLama[i].year);
                    tempTahun = isNaN(tempTahun)?0:tempTahun;
                
                
                if(tahunAkhirKlaim==0){
                    tahunAkhirKlaim = tempTahun;
                }else{
                    if(tempTahun > tahunAkhirKlaim){
                        tahunAkhirKlaim = tempTahun;
                    }
                }
            }
            
            
           
            
            
            
            
  

            for (var i in klaimLama) {
                
             
                if (klaimLama[i].jenisPengobatanCode === jenisPengobatanCode
                        && klaimLama[i].year === year
                        ) {
                    var val = parseFloat(klaimLama[i].klaimValue);
                    val = isNaN(val) ? 0 : val;
                    totalKlaimLama += val;
               
                }
            }


        }
        
        
        

     


        saldoAwal = plafon - totalKlaimLama;



        if (percent > 0) {
            klaimAfterPercent = v - ((percent / 100) * v);
        } else {
            klaimAfterPercent = v;
        }





        if (klaimAfterPercent > saldoAwal) {
            fixKlaim = saldoAwal;
        } else {
            fixKlaim = klaimAfterPercent;
        }
        saldo = saldoAwal - fixKlaim;



        return {
            claimValue: fixKlaim,
            amountPengganti: klaimAfterPercent,
            saldo: saldo,
            totalKlaim: (saldoAwal - saldo) + totalKlaimLama
        };
    },
    resetTahunPlafon: function(params) {
        var hireDate = params.hireDate;
        var per = params.per;
        var tahunKlaim = params.tahunKlaim;
        var tahunReset = 0;
        if (per > 1) {
            var thd = hireDate.getFullYear();
            var range = tahunKlaim - thd;
            var temp = 0;
            for (var i = 0; i <= range; i++) {
           
                if ( i % per == 0) {
                    temp = (thd+i);
                    
                    if (temp <= tahunKlaim) {
                        tahunReset = temp;
                    }
                }

            }

        } else {
            tahunReset = tahunKlaim;
        }
        return tahunReset;
    }
    
    /*
     hitungPlafon: function(params) {
        var klaimPengobatanId = params.klaimPengobatanId;
        var jenisPengobatanCode = params.jenisPengobatanCode;
        var nilaiKlaim = params.nilaiKlaim;
        var plafon = params.plafon;
        var klaimLama = params.klaimLama;
        var percentPengganti = params.percentPengganti;
        //var resetYear = params.resetYear;
        var year = params.year;
        //var minYear = resetYear;
        //var maxYear = year;


        var idKlaim = klaimPengobatanId;



        var v = nilaiKlaim;



        var saldoAwal = 0;
        var totalKlaimBefore = 0;
        var saldo = 0;
        // var s = me.getGridclaim().getStore();
        var percent = percentPengganti;
        var klaimAfterPercent = 0;
        var fixKlaim = 0;
        var totalKlaimLama = 0;
        saldoAwal = plafon;
        // looping klaim lama

        if (klaimLama.length > 0) {
            
  

            for (var i in klaimLama) {
                
             
                if (klaimLama[i].jenisPengobatanCode === jenisPengobatanCode
                        && klaimLama[i].year === year
                        ) {
                    var val = parseFloat(klaimLama[i].klaimValue);
                    val = isNaN(val) ? 0 : val;
                    totalKlaimLama += val;
               
                }
            }


        }
        
        
        

        console.log(totalKlaimLama);


        saldoAwal = plafon - totalKlaimLama;



        if (percent > 0) {
            klaimAfterPercent = v - ((percent / 100) * v);
        } else {
            klaimAfterPercent = v;
        }





        if (klaimAfterPercent > saldoAwal) {
            fixKlaim = saldoAwal;
        } else {
            fixKlaim = klaimAfterPercent;
        }
        saldo = saldoAwal - fixKlaim;



        return {
            claimValue: fixKlaim,
            amountPengganti: klaimAfterPercent,
            saldo: saldo,
            totalKlaim: (saldoAwal - saldo) + totalKlaimLama
        };
    },
     */

});
