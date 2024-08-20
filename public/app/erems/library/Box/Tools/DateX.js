Ext.define('Erems.library.box.tools.DateX', {
    date:null,
    date_old:null,
    lebih:null,
    constructor: function(options) {
        Ext.apply(this, options || {});
    },
    
    addMonth:function(jumlah){
        var me = this;
        var date = new Date(me.date);
        var month = date.getMonth();
        var year = date.getFullYear();
        month = month+jumlah;
        if(month > 11){
            month = jumlah-3;
            year = year+1;
        }
        date.setFullYear(year);
        date.setMonth(month);
        return date;
    }
    
    
});

   



