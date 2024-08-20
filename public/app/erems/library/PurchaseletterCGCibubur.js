Ext.define('Erems.library.PurchaseletterCGCibubur', {
    extend: 'Erems.library.Price',
    prolibsFile:null,
    fields: {
        total: "harga_total_jual",
        jual: "price_harga_jual",
        salesDiscountPercent: "persen_salesdisc",
        salesDiscountAmount: "harga_salesdisc",
        sisaAmount: "billingrules_angsuran",
        sisaTimes: "billingrules_term_angsuran",
        tandaJadiAmount: "billingrules_tandajadi",
        tandaJadiTimes: "billingrules_term_tandajadi",
        uangMukaAmount: "billingrules_uangmuka",
        uangMukaTimes: "billingrules_term_uangmuka"
    },
    sourceMoney: {
        name: '',
        id: 0
    },
    tandaJadi: {
        times: 0,
        amount: 0.0
    },
    uangMuka: {
        times: 0,
        amount: 0.0
    },
    sisa: {
        times: 1,
        amount: 0.0
    },
    /* override on 2017-03-02*/
    /*
    hitungTotal: function() {
        var me = this;
        me.init();
        
         var v = me.form.getValues();
       
         
        var fi = me.fields;
    
        var hargaJual = me.hargaJual;
        var salesDiscount = me.sales.discount;

        me.sales.amount = (salesDiscount / 100) * hargaJual;
        
         me.biayaAdmin = me.numberValue(v[fi.biayaAdmin]);
     
       //   me.biayaAdmin = 100000;
        me.biayaPaketTambahan = me.numberValue(v[fi.biayaPaketTambahan]);
        me.biayaAdminSubsidi = me.numberValue(v[fi.biayaAdminSubsidi]);
        
       // me.total = hargaJual - (me.sales.amount + me.biayaAdmin + me.biayaPaketTambahan + me.biayaAdminSubsidi);
        me.total = (hargaJual + me.biayaAdmin + me.biayaPaketTambahan)  - (me.sales.amount +  me.biayaAdminSubsidi);
      
    },
    */
   hitungTotal: function() {
        var me = this;
        me.init();
        
         var v = me.form.getValues();
       
         
        var fi = me.fields;
    
        var hargaJual = me.hargaJual;
        var salesDiscount = me.sales.discount;

        me.sales.amount = (salesDiscount / 100) * hargaJual;
        
         me.biayaAdmin = me.numberValue(v[fi.biayaAdmin]);
     
       //   me.biayaAdmin = 100000;
        me.biayaPaketTambahan = me.numberValue(v[fi.biayaPaketTambahan]);
        me.biayaAdminSubsidi = me.numberValue(v[fi.biayaAdminSubsidi]);
        me.biayaAsuransi = me.numberValue(v[fi.biayaAsuransi]);
        
       // me.total = hargaJual - (me.sales.amount + me.biayaAdmin + me.biayaPaketTambahan + me.biayaAdminSubsidi);
        me.total = (hargaJual + me.biayaAdmin + me.biayaPaketTambahan + + me.biayaAsuransi)  - (me.sales.amount +  me.biayaAdminSubsidi);
      
       // me.total = Math.floor(me.total);
        
        var totalBulat = Math.floor(me.total);
        var desimalVal = me.total - totalBulat;
        if(desimalVal > 0.50){
            me.total = Math.ceil(me.total);
        }else{
            me.total = Math.floor(me.total);
        }
        
        //console.log(Math.floor(me.total));
    },
    getTypeByPriceType: function() {
        var x = '';
        if (this.priceTypeId === 1)
            x = "SIP";
        else if (this.priceTypeId === 2)
            x = "KPR";
        else
            x = "INH";
        return x;
    },
    setScheduleGrid: function(grid) {
        this.grid = grid;
    },
    init: function() {
        var me = this;

        var v = me.form.getValues();
        var fi = me.fields;
        me.hargaJual = me.numberValue(v[fi.jual]);
        me.sales.discount = me.numberValue(v[fi.salesDiscountPercent]);
        me.sales.amount = me.numberValue(v[fi.salesDiscountAmount]);
        me.tandaJadi.amount = me.numberValue(v[fi.tandaJadiAmount]);
        me.uangMuka.amount = me.numberValue(v[fi.uangMukaAmount]);
        me.uangMuka.times = me.numberValue(v[fi.uangMukaTimes]);
        me.tandaJadi.times = me.numberValue(v[fi.tandaJadiTimes]);
        me.sisa.times = me.numberValue(v[fi.sisaTimes]);
    },
    calculate: function() {
        var me = this;

        me.hitungTotal();
        me.hitungBilling();
        me.fillForm();

    },
    generateSchedule: function() {
        var me = this;
        me.calculate();
        me.buildSchedule();
    },
    fillForm: function() {
        var me = this;
        var f = me.form;
        var fi = me.fields;
        f.down("[name=" + fi.salesDiscountAmount + "]").setValue(me.formatValue(me.sales.amount));
        f.down("[name=" + fi.total + "]").setValue(me.formatValue(me.total));
        f.down("[name=" + fi.sisaAmount + "]").setValue(me.formatValue(me.sisa.amount));
        f.down("[name=" + fi.sisaTimes + "]").setValue(me.sisa.times);
        f.down("[name=" + fi.tandaJadiTimes + "]").setValue(me.tandaJadi.times);
        f.down("[name=" + fi.uangMukaTimes + "]").setValue(me.uangMuka.times);

    },
    hitungBilling: function() {
        var me = this;

        // hitung SISA
        if(!window[me.prolibsFile]){
            console.log("[HITUNGBILLING] Tidak ada prolibs");
           return;
        }
        
		//addon 20171026
		if (me.uangMuka.times === 0) {

            me.sisa.amount = me.total - me.tandaJadi.amount;
        } else {
            me.sisa.amount = window[me.prolibsFile].getSisaBillingRules(me.total, me.uangMuka.amount, me.tandaJadi.amount);

        }
      
        //me.sisa.amount = window[me.prolibsFile].getSisaBillingRules(me.total,me.uangMuka.amount,me.tandaJadi.amount);
      
  
        
        me.processComponentBilling();

    },
    processComponentBilling: function() {
        var me = this;
        if (me.uangMuka.amount === 0) {
            me.uangMuka.times = 0;
        } else {
            if (me.uangMuka.times === 0) {
                me.uangMuka.times = 1;
            }
        }
        if (me.tandaJadi.amount === 0) {
            me.tandaJadi.times = 0;
        } else {
            if (me.tandaJadi.times === 0) {
                me.tandaJadi.times = 1;
            }
        }
        if (me.sisa.amount <= 0) {
            me.sisa.times = 0;
        } else {
            if (me.sisa.times === 0) {
                me.sisa.times = 1;
            }
        }
    },
    generateDueDate: function(count) {
        var date = this.plDate;

        var d = new Date(date);
        var m = d.getMonth();
        var y = d.getFullYear();
        var tempM = 0;
        tempM = m + count;


        m = (tempM % 12) === 0 ? 12 : (tempM % 12);
        y = y + Math.floor(tempM / 12);

        d.setMonth(m);
        d.setFullYear(y);
        return d;
    },
    buildSchedule: function() {
        var me = this;
        if (me.sisa.amount <= 0) {
            return;
        }

        var g = me.grid;
        var s = g.getStore();
        s.loadData([], false);
       
        if(!window[me.prolibsFile]){
            console.log("[PURCHLIBERROR] Tidak ada prolibs");
           return;
        }
        
        window[me.prolibsFile].setDataScheduleGrid({
            tj: me.tandaJadi.amount,
            um : me.uangMuka.amount,
            s : me.sisa.amount
            
        });
        

        var tSisa = 0;

        var amount = 0;
        var count = window[me.prolibsFile].getScheduleCountAwal();
        tSisa = 0;
        for (var i = 0; i < me.tandaJadi.times; i++) {

            if (i !== me.tandaJadi.times - 1) {
                amount = me.fixedPrecision(me.tandaJadi.amount / me.tandaJadi.times);
                tSisa += amount;
            } else { // untuk tagihan terakhir
                amount = me.tandaJadi.amount - tSisa;
            }
            count++;
            s.add({
                amount: amount,
                termin: (i + 1),
                scheduletype_scheduletype: 'TJ',
                sourcemoney_sourcemoney: me.sourceMoney.name,
                sourcemoney_sourcemoney_id: me.sourceMoney.id,
                remaining_balance: amount,
                duedate: me.generateDueDate(count)
            });
        }
        tSisa = 0;
        
        
           // _um = (me.uangMuka.amount - me.tandaJadi.amount);
           _um = window[me.prolibsFile].getUangMukaScheduleGrid();
        
        
        
        for (var i = 0; i < me.uangMuka.times; i++) {

            if (i !== me.uangMuka.times - 1) {
                amount = me.fixedPrecision(_um/me.uangMuka.times);
                tSisa += amount;
            } else { // untuk tagihan terakhir
                amount = _um - tSisa;
            }

   
            if(i===0 && me.uangMuka.times===1){ // untuk tagihan yang pertama dan cuma satu - satunya
                 amount = _um;         
            }
           

            count++;
            s.add({
                amount: amount,
                termin: (i + 1),
                scheduletype_scheduletype: 'UM',
                sourcemoney_sourcemoney: me.sourceMoney.name,
                sourcemoney_sourcemoney_id: me.sourceMoney.id,
                remaining_balance: amount,
                duedate: me.generateDueDate(count)
            });
        }
        tSisa = 0;
        for (var i = 0; i < me.sisa.times; i++) {
            if (i !== me.sisa.times - 1) {
                amount = me.fixedPrecision(me.sisa.amount / me.sisa.times);
                tSisa += amount;
            } else { // untuk tagihan terakhir
                amount = me.sisa.amount - tSisa;
            }


            count++;
            s.add({
                amount: amount,
                termin: (i + 1),
                scheduletype_scheduletype: me.getTypeByPriceType(),
                sourcemoney_sourcemoney: me.sourceMoney.name,
                sourcemoney_sourcemoney_id: me.sourceMoney.id,
                remaining_balance: amount,
                duedate: me.generateDueDate(count)
            });
        }

    },
    fixedPrecision: function(value) {
        var x = isNaN(value) ? 0 : value;
        x = parseFloat(x.toFixed(EREMS_GLOBAL_PRECISION));
        return x;
    }
});

