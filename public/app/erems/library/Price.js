Ext.define('Erems.library.Price', {
    extend    : 'Erems.library.TypeRounding',
    total     : 0.0,
    hargaJual : 0.0, 
    fields    : { // TAMBAH FIELD JANGAN DISINI, ke controller Purchaseletter.js line 1311
        total                : "harga_total_jual",
        jual                 : "price_harga_jual",
        salesDiscountPercent : "persen_salesdisc",
        salesDiscountAmount  : "harga_salesdisc",
    },
    sales : {
        discount : 0.0,
        amount   : 0.0
    },
    biayaAdmin         : 0.0,
    hargaPembulatan    : 0.0,
    biayaPaketTambahan : 0.0,
    biayaAdminSubsidi  : 0.0,
    biayaAsuransi      : 0.0,
    form               : null,
    c                  : null, /*controller handler*/
    grid               : null,
    priceTypeId        : 0,
    plDate             : '02/26/2014',
    getTypeByPriceType : function() {
        var x = '';
        if (this.priceTypeId === 1)
            x = "SIP";
        else if (this.priceTypeId === 2)
            x = "KPR";
        else
            x = "INH";
        return x;
    },
    setForm: function(form) {
        this.form = form;
    },
    setC: function(controller) {
        this.c = controller;
    },
    numberValue: function(value) {
        if (typeof value === "string") {
            if (value.length > 0) {
                return toFloat(value);
            }
            return 0;
        }
        return 0;
    },
    init: function() {
        var me = this;
        var v  = me.form.getValues();
        var fi = me.fields;

        me.hargaJual = me.numberValue(v[fi.jual]);

        me.sales.discount = me.numberValue(v[fi.salesDiscountPercent]);
        me.sales.amount   = me.numberValue(v[fi.salesDiscountAmount]);
    },
    hitungTotal: function() {
        var me = this;
        me.init();
        
         var v = me.form.getValues();
       
        var fi = me.fields;
    
        var hargaJual = me.hargaJual;
        var salesDiscount = me.sales.discount;

        me.sales.amount = (salesDiscount / 100) * hargaJual;

        ///// add by erwin.st 16122021
        me.sales.amount       = me.rounding(me.typeCalculaterounding, me.sales.amount);
        me.biayaAdmin         = me.numberValue(v[fi.biayaAdmin]);
        me.biayaPaketTambahan = me.numberValue(v[fi.biayaPaketTambahan]);
        me.biayaAdminSubsidi  = me.numberValue(v[fi.biayaAdminSubsidi]);
        me.biayaAsuransi      = me.numberValue(v[fi.biayaAsuransi]);
        me.hargaPembulatan    = me.numberValue(v[fi.hargaPembulatan]);
        
        me.total = (hargaJual+me.biayaAdmin + me.biayaPaketTambahan + me.biayaAdminSubsidi + me.biayaAsuransi) - me.sales.amount;

        ///// add by erwin.st 16122021
        me.total = me.rounding(me.typeCalculaterounding, me.total);
        
        me.total = me.total + me.hargaPembulatan;
    },
    calculate: function() {
        var me = this;
        me.hitungTotal();
        me.fillForm();

    },
    formatValue: function(value) {
        // return value;
        return this.c.myConvert().fmb(value);
    },
    fillForm: function() {
        var me = this;
        var f  = me.form;
        var fi = me.fields;

        f.down("[name=" + fi.salesDiscountAmount + "]").setValue(me.formatValue(me.sales.amount));
        f.down("[name=" + fi.total + "]").setValue(me.formatValue(me.total));
    }
});

