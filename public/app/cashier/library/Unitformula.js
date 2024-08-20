Ext.define('Cashier.library.Unitformula', {
    form: null,
    funcTotalJual:null,
    fields: {
        width: 'width',
        long: 'long',
        land_size:'land_size',
        kelebihan: 'kelebihan',
        _harga_tanah_a: '_harga_tanah_a',
        _harga_tanah_b: '_harga_tanah_b',
        _harga_kelebihan_a: '_harga_kelebihan_a',
        _harga_kelebihan_b: '_harga_kelebihan_b',
        _harga_bangunan: '_harga_bangunan',
        _harga_jual_dasar: '_harga_jual_dasar',
        _disc_harga_dasar:'_disc_harga_dasar',
        _tot_disc_harga_dasar:'_tot_disc_harga_dasar',
        _disc_harga_tanah:'_disc_harga_tanah',
        _tot_disc_harga_tanah:'_tot_disc_harga_tanah',
        _disc_harga_bangunan:'_disc_harga_bangunan',
        _tot_disc_harga_bangunan:'_tot_disc_harga_bangunan',
        _harga_netto:'_harga_netto',
        _ppn_tanah:'_ppn_tanah',
        _tot_ppn_tanah:'_tot_ppn_tanah',
        _ppn_bangunan:'_ppn_bangunan',
        _tot_ppn_bangunan:'_tot_ppn_bangunan',
        _harga_balik_nama:'_harga_balik_nama',
        _harga_bphtb:'_harga_bphtb',
        _harga_bajtb:'_harga_bajtb',
        _biaya_administrasi:'_biaya_administrasi',
        _biaya_administrasi_subsidi:'_biaya_administrasi_subsidi',
        _biaya_p_mutu:'_biaya_p_mutu',
        _biaya_paket_tambahan:'_biaya_paket_tambahan',
        _disc_sales:'_disc_sales',
        _tot_disc_sales:'_tot_disc_sales',
        _total:'_total',
        _total_jual:'_total_jual'
        

    },
    defaultFields: {
        width: 'width',
        long: 'long',
        land_size:'land_size',
        kelebihan: 'kelebihan',
        _harga_tanah_a: '_harga_tanah_a',
        _harga_tanah_b: '_harga_tanah_b',
        _harga_kelebihan_a: '_harga_kelebihan_a',
        _harga_kelebihan_b: '_harga_kelebihan_b',
        _harga_bangunan: '_harga_bangunan',
        _harga_jual_dasar: '_harga_jual_dasar',
        _disc_harga_dasar:'_disc_harga_dasar',
        _tot_disc_harga_dasar:'_tot_disc_harga_dasar',
        _disc_harga_tanah:'_disc_harga_tanah',
        _tot_disc_harga_tanah:'_tot_disc_harga_tanah',
        _disc_harga_bangunan:'_disc_harga_bangunan',
        _tot_disc_harga_bangunan:'_tot_disc_harga_bangunan',
        _harga_netto:'_harga_netto',
        _ppn_tanah:'_ppn_tanah',
        _tot_ppn_tanah:'_tot_ppn_tanah',
        _ppn_bangunan:'_ppn_bangunan',
        _tot_ppn_bangunan:'_tot_ppn_bangunan',
        _harga_balik_nama:'_harga_balik_nama',
        _harga_bphtb:'_harga_bphtb',
        _harga_bajtb:'_harga_bajtb',
        _biaya_administrasi:'_biaya_administrasi',
        _biaya_administrasi_subsidi:'_biaya_administrasi_subsidi',
        _biaya_p_mutu:'_biaya_p_mutu',
        _biaya_paket_tambahan:'_biaya_paket_tambahan',
        _disc_sales:'_disc_sales',
        _tot_disc_sales:'_tot_disc_sales',
        _total:'_total',
        _total_jual:'_total_jual'
        

    },
    setForm: function(form) {
        this.form = form;
    },
    getForm: function() {
        return this.form;
    },
    /* Menambahkan prefix ke semua field name formula**/
    addPrefixToAllFieldName:function(prefixStr){
        var fld = this.fields;
        for(var x in fld){
            this.fields[x] = prefixStr+''+this.defaultFields[x];
        }
    },
    setField:function(f){
        this.fields = f;
    },
    changeFieldName: function(fld, newFld) {
        this.fields[fld] = newFld;
    },
    changeHargaTanah: function(el) {
        var hasil = 0;
        var luasTanah = 0;

        // edited by tommy 22 Agustus 2013 2.03 PM
       // luasTanah = this.getForm().down('[name=' + this.fields.width + ']').getValue() * this.getForm().down('[name=' + this.fields.long + ']').getValue();
        
        luasTanah = this.getv(this.fields.land_size);
       // hasil = luasTanah * toFloat(el.getValue());
        hasil = luasTanah * this.getv(this.fields._harga_tanah_a);
        /// end edited
        
        this.getForm().down('[name=' + this.fields._harga_tanah_b + ']').setValue(this.fmb(hasil));
        this.changeHargaJualDasar();
        this.changeDiscTanah();
        this.changePPNTanah();
    },
    changeHargaBangunan: function(el) {
        this.changeHargaJualDasar();
        this.changeDiscBangunan();
        this.changePPNBangunan();
    },
    changeHargaKelebihan: function(el) {
        var hasil = 0;
        // edited by tommy 22 Agustus 2013 2.24 PM
        //hasil = this.getForm().down('[name=' + this.fields.kelebihan + ']').getValue() * toFloat(el.getValue());
        hasil = this.getForm().down('[name=' + this.fields.kelebihan + ']').getValue() * this.getv(this.fields._harga_kelebihan_a);
        // end edited
        this.getForm().down('[name=' + this.fields._harga_kelebihan_b + ']').setValue(this.fmb(hasil));
        this.changeHargaJualDasar();
        this.changePPNTanah();
        //   me.discountFormulaForPPNTanah(me.flagSection + '_ppn_tanah', me.flagSection + '_harga_tanah_b', me.flagSection + '_tot_ppn_tanah');
    },
    changeHargaJualDasar: function() {

        var me = this;
        var hargaBangunan = toFloat(this.getForm().down('[name=' + this.fields._harga_bangunan + ']').getValue());
        var hargaTanah = toFloat(this.getForm().down('[name=' + this.fields._harga_tanah_b + ']').getValue());
        var hargaKelebihan = toFloat(this.getForm().down('[name=' + this.fields._harga_kelebihan_b + ']').getValue());
        var hasil = hargaBangunan + hargaTanah + hargaKelebihan;
        this.getForm().down('[name=' + this.fields._harga_jual_dasar + ']').setValue(me.fmb(hasil));
        this.changeDiscHargaDasar();
    },
    changeDiscHargaDasar:function(){
        this.discountFormula(this.fields._disc_harga_dasar,this.fields._harga_jual_dasar,this.fields._tot_disc_harga_dasar);
        this.changeHargaNetto();
    },
    changeRevDiscHargaDasar:function(){
        this.reverseDiscountFormula(this.fields._disc_harga_dasar,this.fields._harga_jual_dasar,this.fields._tot_disc_harga_dasar);
        this.changeHargaNetto();
    },
    changeDiscTanah:function(){
        this.discountFormula(this.fields._disc_harga_tanah,this.fields._harga_tanah_b,this.fields._tot_disc_harga_tanah);
        this.changeHargaNetto();
    },
    changeRevDiscTanah:function(){
        this.reverseDiscountFormula(this.fields._disc_harga_tanah,this.fields._harga_tanah_b,this.fields._tot_disc_harga_tanah);
        this.changeHargaNetto();
    },
    changeDiscSales:function(){
        this.discountFormula(this.fields._disc_sales,this.fields._total,this.fields._tot_disc_sales);
        this.changeTotalJual();
    },
    changeRevDiscSales:function(){
        this.reverseDiscountFormula(this.fields._disc_sales,this.fields._total,this.fields._tot_disc_sales);
        this.changeTotalJual();
    },
    changeDiscBangunan:function(){
        this.discountFormula(this.fields._disc_harga_bangunan,this.fields._harga_bangunan,this.fields._tot_disc_harga_bangunan);
        this.changeHargaNetto();
    },
    changeRevDiscBangunan:function(){
        this.reverseDiscountFormula(this.fields._disc_harga_bangunan,this.fields._harga_bangunan,this.fields._tot_disc_harga_bangunan);
        this.changeHargaNetto();
    },
    changeHargaNetto:function(){
        var hasil = 0;
        hasil = this.getv(this.fields._harga_jual_dasar)-this.getv(this.fields._tot_disc_harga_dasar)-this.getv(this.fields._tot_disc_harga_tanah)-this.getv(this.fields._tot_disc_harga_bangunan);
        this.setv(this.fields._harga_netto,hasil);
        this.changeTotal();
    },
    changePPNBangunan:function(){
        this.discountFormula(this.fields._ppn_bangunan,this.fields._harga_bangunan,this.fields._tot_ppn_bangunan);
        this.changeTotal();
    },
    reversePPNBangunan:function(){
        this.reverseDiscountFormula(this.fields._ppn_bangunan,this.fields._harga_bangunan,this.fields._tot_ppn_bangunan);
        this.changeTotal();
    },        
    changePPNTanah:function(){
        
        var val = this.getv(this.fields._ppn_tanah);
        if (val > 100.00) {
            val = 100.00;
            this.setv(this.fields._ppn_tanah,val);
        }

        var total = (this.getv(this.fields._harga_tanah_b) + this.getv(this.fields._harga_kelebihan_b)) * (val / 100);
        this.setv(this.fields._tot_ppn_tanah,total);
        this.changeTotal();
    },
    reversePPNTanah:function(){
        var me = this;
        var total = (this.getv(this.fields._tot_ppn_tanah) * 100.00) / (this.getv(this.fields._harga_tanah_b) + this.getv(this.fields._harga_kelebihan_b));
        if (total > 100.00) {
            total = 100.00;
            var val = 0;
            val = (this.getv(this.fields._harga_tanah_b) + this.getv(this.fields._harga_kelebihan_b));
            this.setv(this.fields._tot_ppn_tanah,val);
        }
        this.setv(this.fields._ppn_tanah,total);
        this.changeTotal();
  
    },
    changeTotal:function(){
        var total = 0;
      
        var hn = this.getv(this.fields._harga_netto);
        
        var tpt = this.getv(this.fields._tot_ppn_tanah);
        var tpb = this.getv(this.fields._tot_ppn_bangunan);
        var bbn = this.getv(this.fields._harga_balik_nama);
        var bph = this.getv(this.fields._harga_bphtb);
        var bajb = this.getv(this.fields._harga_bajtb);
        var ba = this.getv(this.fields._biaya_administrasi);
        var bas = this.getv(this.fields._biaya_administrasi_subsidi);
        var bpm = this.getv(this.fields._biaya_p_mutu);
        var bpt = this.getv(this.fields._biaya_paket_tambahan);
        
        total = hn + tpt+tpb+bbn+bph+bajb+ba+bas+bpm+bpt;
        
        this.setv(this.fields._total,total);
        this.changeDiscSales();
    },
    changeTotalJual :function(){
        var total = 0;
        var tot = this.getv(this.fields._total);
        var tds = this.getv(this.fields._tot_disc_sales);
        
        total = tot - tds;
        this.setv(this.fields._total_jual,total);
        if(typeof this.funcTotalJual === 'function'){
            this.funcTotalJual();
        }
        
    },
    discountFormula: function(discEl, srcEl, totEl) {
        var val = this.getv(discEl);
        if (val > 100.00) {
            val = 100.00;
            this.setv(discEl, val);
        }
        var total = this.getv(srcEl) * (val / 100);
        this.setv(totEl, total);
    },
    reverseDiscountFormula: function(discEl, srcEl, totEl) {
        var me = this;
        var total = ((this.getv(totEl) * 100.00) / this.getv(srcEl));
        if (total > 100.00) {
            total = 100.00;
            var val = 0;
            val = this.getv(srcEl);
            this.setv(totEl,val);
        }
        this.setv(discEl,total);

    },
    getv: function(name) {
console.log(name);
console.log(this.getForm().down('[name=' + name + ']').getValue());
        return toFloat(this.getForm().down('[name=' + name + ']').getValue());
    },
    setv: function(name, hasil) {
        this.getForm().down('[name=' + name + ']').setValue(this.fmb(hasil));
    },
    fmb: function(val) {
        return this.fm(val, 2, ',', '.');
    },
    fm: function(n, decPlaces, thouSeparator, decSeparator) {
        var decPlaces = isNaN(decPlaces = Math.abs(decPlaces)) ? 2 : decPlaces,
                decSeparator = decSeparator == undefined ? "." : decSeparator,
                thouSeparator = thouSeparator == undefined ? "." : thouSeparator,
                sign = n < 0 ? "-" : "",
                i = parseInt(n = Math.abs(+n || 0).toFixed(decPlaces)) + "",
                j = (j = i.length) > 3 ? j % 3 : 0;
        return sign + (j ? i.substr(0, j) + thouSeparator : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thouSeparator) + (decPlaces ? decSeparator + Math.abs(n - i).toFixed(decPlaces).slice(2) : "");
    }
})

