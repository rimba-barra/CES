Ext.define('Erems.library.Calculator', {
    form: null,
    fields: null,
    scheduleProcess: null,
    element: null,
    isBasicDiscount:false,
    constructor: function(configs) {
        this.fields = configs.fields;
        this.form = configs.form;
    },
    setSP: function(sp) {
        this.scheduleProcess = sp;
    },
    calculate: function(element) {
        // total harga tanah

        var unitSize = {
            land: 0,
            over: 0,
        }
        var basicPrice = {
            permeter: {
                value: 0,
                amount: 0
            },
            over: {
                value: 0,
                amount: 0
            },
            building: 0,
            total: 0 // total dasar
        }







        var discountCollection = {
            basic: {
                value: 0,
                amount: 0
            },
            land: {
                value: 0,
                amount: 0
            },
            building: {
                value: 0,
                amount: 0
            },
            total: 0 /// netto

        }


        /* binding */

        var me = this;
        unitSize.land = me.gv(me.fields.land_size);
        unitSize.over = me.gv(me.fields.kelebihan);
        basicPrice.permeter.value = me.gv(me.fields._harga_tanah_a);
        basicPrice.over.value = me.gv(me.fields._harga_kelebihan_a);
        basicPrice.building = me.gv(me.fields._harga_bangunan);
        /* end binding */

        basicPrice.permeter.amount = basicPrice.permeter.value * unitSize.land;
        basicPrice.over.amount = basicPrice.over.value * unitSize.over;
        basicPrice.total = basicPrice.permeter.amount + basicPrice.over.amount + basicPrice.building;


        me.sv(me.fields._harga_tanah_b, basicPrice.permeter.amount);
        me.sv(me.fields._harga_kelebihan_b, basicPrice.over.amount);
        me.sv(me.fields._harga_jual_dasar, basicPrice.total);



        discountCollection.basic.value = me.gv(me.fields._disc_harga_dasar);
        discountCollection.building.value = me.gv(me.fields._disc_harga_bangunan);
        discountCollection.land.value = me.gv(me.fields._disc_harga_tanah);


        // added 20 Mei 2015
        var elName = element.name;
        if (elName) {

            if (elName === me.fields._disc_harga_dasar && discountCollection.basic.value > 0) {
                discountCollection.building.value = 0;
                discountCollection.land.value = 0;
                me.isBasicDiscount = true;
            } else if ((elName === me.fields._disc_harga_bangunan && discountCollection.building.value > 0 )  ||
                        (elName === me.fields._disc_harga_tanah && discountCollection.land.value > 0 )) {
                discountCollection.basic.value = 0;
                me.isBasicDiscount = false;
            }
        }
        
       

        // end 

        discountCollection.basic.amount = (discountCollection.basic.value / 100) * basicPrice.total;
        discountCollection.land.amount = (discountCollection.land.value / 100) * (basicPrice.permeter.amount + basicPrice.over.amount);
        discountCollection.building.amount = (discountCollection.building.value / 100) * basicPrice.building;
        discountCollection.total = basicPrice.total - (discountCollection.basic.amount + discountCollection.land.amount + discountCollection.building.amount);

        me.sv(me.fields._tot_disc_harga_dasar, discountCollection.basic.amount);
        me.sv(me.fields._tot_disc_harga_tanah, discountCollection.land.amount);
        me.sv(me.fields._tot_disc_harga_bangunan, discountCollection.building.amount);
        me.sv(me.fields._harga_netto, discountCollection.total);





        var tax = {
            land: {
                value: 0,
                amount: 0
            },
            building: {
                value: 0,
                amount: 0
            },
            ppnbm: {
                value: 0,
                amount: 0
            },
            pph22: {
                value: 0,
                amount: 0
            }

        }



        var fee = {
            balikNama: 0,
            perolehanHak: 0,
            aktaJualBeli: 0,
            administrasi: 0,
            administrasiSubsidi: 0,
            pMutu: 0,
            paketTambahan: 0,
            total: 0 /// harga jual
        }

        var discountSales = {
            value: 0,
            amount: 0,
            total: 0 // total harga jual
        }
        
        var discountCutterLand = me.isBasicDiscount===true?discountCollection.basic.amount/2: discountCollection.land.amount;
        var discountCutterBuilding = me.isBasicDiscount===true?discountCollection.basic.amount/2:discountCollection.building.amount;

        tax.land.value = me.gv(me.fields._ppn_tanah);
        tax.building.value = me.gv(me.fields._ppn_bangunan);
        tax.ppnbm.value = me.gv(me.fields._ppn_ppnbm);
        tax.pph22.value = me.gv(me.fields._ppn_pph22);
        fee.balikNama = me.gv(me.fields._harga_balik_nama);
        fee.perolehanHak = me.gv(me.fields._harga_bphtb);
        fee.aktaJualBeli = me.gv(me.fields._harga_bajtb);
        fee.administrasi = me.gv(me.fields._biaya_administrasi);
        fee.administrasiSubsidi = me.gv(me.fields._biaya_administrasi_subsidi);
        fee.pMutu = me.gv(me.fields._biaya_p_mutu);
        fee.paketTambahan = me.gv(me.fields._biaya_paket_tambahan);
        discountSales.value = me.gv(me.fields._disc_sales);

        
        tax.land.amount = (tax.land.value / 100) * (basicPrice.permeter.amount + basicPrice.over.amount - discountCutterLand);
        tax.building.amount = (tax.building.value / 100) * (basicPrice.building - discountCutterBuilding);
        tax.ppnbm.amount = (tax.ppnbm.value / 100) * discountCollection.total;
        tax.pph22.amount = (tax.pph22.value / 100) * discountCollection.total;
        fee.total = discountCollection.total + tax.land.amount + tax.building.amount +
                fee.balikNama + tax.ppnbm.amount +
                fee.perolehanHak + fee.aktaJualBeli + fee.administrasi + fee.administrasiSubsidi +
                fee.pMutu + fee.paketTambahan;

        discountSales.amount = (discountSales.value / 100) * fee.total;

        discountSales.total = fee.total - discountSales.amount;

        me.sv(me.fields._tot_ppn_tanah, tax.land.amount);
        me.sv(me.fields._tot_ppn_bangunan, tax.building.amount);
        me.sv(me.fields._tot_ppn_ppnbm, tax.ppnbm.amount);
        me.sv(me.fields._tot_ppn_pph22, tax.pph22.amount);
        me.sv(me.fields._total, fee.total);
        me.sv(me.fields._tot_disc_sales, discountSales.amount);
        me.sv(me.fields._total_jual, discountSales.total);

        // added 20 Mei 2015
        me.sv(me.fields._disc_harga_dasar, discountCollection.basic.value);
        me.sv(me.fields._disc_harga_bangunan, discountCollection.building.value);
        me.sv(me.fields._disc_harga_tanah, discountCollection.land.value);
        // end

        if (this.scheduleProcess) {

            this.scheduleProcess.calculate();
        }




    },
    getForm: function() {
        return this.form;
    },
    gv: function(name) {
        //  var v = toFloat(this.form.down("[name="+name+"]").getValue());
        // return isNaN(v)?0:v;
        var el = this.form.down("[name=" + name + "]");
        if(el){
             
             
                return accounting.unformat(el.getValue());
            
          
                
            
        }
        return 0;
        
    },
    sv: function(name, value) {
        //  this.form.down("[name="+name+"]").setValue(value);
        var el = this.form.down("[name=" + name + "]");
        if(el){
            
            el.setValue(accounting.formatMoney(value));
        }
        
    }
});