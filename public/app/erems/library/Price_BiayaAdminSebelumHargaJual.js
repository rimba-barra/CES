Ext.define('Erems.library.Price', {
    total: 0.0,
    hargaJual: 0.0,
    fields: {
        total: "harga_total_jual",
        jual: "price_harga_jual",
        salesDiscountPercent: "persen_salesdisc",
        salesDiscountAmount: "harga_salesdisc",
        biayaAdmin:"harga_administrasi",
        biayaPaketTambahan:"harga_paket_tambahan",
        biayaAdminSubsidi:"harga_admsubsidi"
    },
    sales: {
        discount: 0.0,
        amount: 0.0
    },
    form: null,
    c: null, /*controller handler*/
    grid: null,
    priceTypeId:0,
    plDate:'02/26/2014',
    getTypeByPriceType:function(){
        var x = '';
        if(this.priceTypeId===1)x="SIP";
        else if(this.priceTypeId===2)x="KPR";
        else x="INH";
        return x;
    },
    setForm: function(form) {
        this.form = form;
    },
    setC: function(controller) {
        this.c = controller;
    },
    numberValue:function(value){
        if(typeof value==="string"){
            if(value.length > 0){
                return toFloat(value);
            }
            return 0;
        }
        return 0;
    },
    init: function() {
        var me = this;
        var v = me.form.getValues();
        
        var fi = me.fields;
     
        me.hargaJual = me.numberValue(v[fi.jual]);
        
        me.sales.discount = me.numberValue(v[fi.salesDiscountPercent]);
        me.sales.amount = me.numberValue(v[fi.salesDiscountAmount]);
    },
    hitungTotal: function() {
        var me = this;
        me.init();
        var hargaJual = me.hargaJual;
        var salesDiscount = me.sales.discount;
        
        me.sales.amount = (salesDiscount / 100) * hargaJual;
        me.total = hargaJual - (me.sales.amount );
       
         me.total = Math.floor(me.total);
   
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
        var f = me.form;
        var fi = me.fields;
       
        f.down("[name=" + fi.salesDiscountAmount + "]").setValue(me.formatValue(me.sales.amount));
        f.down("[name=" + fi.total + "]").setValue(me.formatValue(me.total));
        
    }
});

