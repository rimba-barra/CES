Ext.define('Master.library.box.tools.Date', {
    date:null,
    date_old:null,
    lebih:null,
    constructor: function(options) {
        Ext.apply(this, options || {});
    },
    
    /*
     * @params jumlah int 
     */
  
    addMonth:function(jumlah){
        var me = this;
        var date = new Date(me.date);
            var date_old = new Date(me.dateold);
            var today_old = date_old.getDate();
            var today = date.getDate(); 
        var month = date.getMonth();
        var year = date.getFullYear();
        month = month+jumlah;
            var lebih = Master.library.box.tools.Date.lebih;
            function kabisatGa(tahun) 
                {
                    var tahun;
                    if(tahun % 4 == 0)
                    {
                        if(tahun % 100 == 0) {
                            if(tahun % 400 == 0) {
                              return true
                            }
                            else {
                                return false
                            }
                        }
                        else {
                            return true
                        }  
                    }
                    else {
                    return false
                    }
                }
            if(Master.library.box.tools.Date.lebih) {
                var me = this;
                var date = new Date(me.date);
                var today = date.getDate(); 
                var month = date.getMonth();
                var year = date.getFullYear();
                var lebihhari = today + Master.library.box.tools.Date.lebih;
                //console.log(date.setFullYear(year,month,lebihhari));
                    if(lebihhari == 31) {
                        date.setFullYear(year,month+2,0);
                        console.log(lebihhari);
                        console.log(month);
                    }
                    else if(lebihhari == 29 || lebihhari == 30) { 
                        date.setFullYear(year,month+1,lebihhari);
                        console.log(lebihhari);
                    }
                    else {
                        date.setFullYear(year,month,lebihhari);
                        console.log(lebihhari);
                    }
               
                Master.library.box.tools.Date.lebih = null;
            }
            else {
            
                if(today == 29 || today == 30) {
                    if(month == 01 || month == 1) {
                        if (kabisatGa(year) == true) {
                            var lebih;
                            var harikabisat = 29;   
                            date.setFullYear(year,01,harikabisat);
                            var lebih = today - harikabisat;
                            Master.library.box.tools.Date.lebih =  today - harikabisat;
                        }
                        else {
                            var lebih;
                            var harikabisat = 28;
                            date.setFullYear(year,01,harikabisat);
                            var lebih = today - harikabisat;
                            Master.library.box.tools.Date.lebih =  today - harikabisat;
                        }
                    } 
                    else {
        if(month > 11){
            month = jumlah-1;
            year = year+1;
        }
        date.setFullYear(year);
        date.setMonth(month);
                    }
                }
                else  if(today == 31) {   
                    if(month == 01 || month == 1) {
                        if (kabisatGa(year) == true) {
                            var lebih;
                            var harikabisat = 29;   
                            date.setFullYear(year,01,harikabisat);
                            var lebih = today - harikabisat;
                            Master.library.box.tools.Date.lebih =  today - harikabisat;
                        }
                        else {
                            var lebih;
                            var harikabisat = 28;
                            date.setFullYear(year,01,harikabisat);
                            var lebih = today - harikabisat;
                            Master.library.box.tools.Date.lebih =  today - harikabisat;
                        }
                    } 
                    else {
                        if(month > 11){
                            date.setFullYear(year,month+1, 0);
                            var newdate = new Date(year,month+1, 0);
                            var today_newdate = newdate.getDate();
                            Master.library.box.tools.Date.lebih =  31 - today_newdate;
                        }
                        else {
                            date.setFullYear(year,month+1, 0);
                            var newdate = new Date(year,month+1, 0);
                            var today_newdate = newdate.getDate();
                            var lebih;
                            var lebih = today - harikabisat;
                            Master.library.box.tools.Date.lebih =  31 - today_newdate;
                        }                 
                    }
                }
                else
                {
                    if(month > 11){
                        month = jumlah-1;
                        year = year+1;
                    }
                    date.setFullYear(year);
                    date.setMonth(month);
                }
            }
            
        return date;
    },
    
     addMonthOld:function(jumlah){
        var me = this;
        var date = new Date(me.date);
        var month = date.getMonth();
        var year = date.getFullYear();
        month = month+jumlah;
        if(month > 11){
            month = jumlah-4;
            year = year+1;
        }
        date.setFullYear(year);
        date.setMonth(month);
        return date;
    }
    
    
});

   



