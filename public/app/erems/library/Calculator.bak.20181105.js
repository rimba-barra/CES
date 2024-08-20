Ext.define('Erems.library.Calculator', {
    form: null,
    fields: null,
    scheduleProcess: null,
    element: null,
    isBasicDiscount: false,
    isEditNilaiPPNTanah: false,
    isEditNilaiPPNBangunan: false,
    prolibsFile: null,
    useRumusBiaya: false,
    discountVerified: false,
    constructor: function (configs) {
        this.fields = configs.fields;
        this.form = configs.form;
    },
    setSP: function (sp) {
        this.scheduleProcess = sp;
    },
    discountAwal: {
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

    },
    calculate: function (element) {
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
        //  this.form.down("[name="+me.fields._harga_tanah_b+"]").setValue(basicPrice.permeter.amount);
        me.sv(me.fields._harga_kelebihan_b, basicPrice.over.amount);
        me.sv(me.fields._harga_jual_dasar, basicPrice.total);



        discountCollection.basic.value = me.gv(me.fields._disc_harga_dasar);
        discountCollection.building.value = me.gv(me.fields._disc_harga_bangunan);
        discountCollection.land.value = me.gv(me.fields._disc_harga_tanah);

        discountCollection.basic.amount = me.gv(me.fields._tot_disc_harga_dasar);
        discountCollection.land.amount = me.gv(me.fields._tot_disc_harga_tanah);
        discountCollection.building.amount = me.gv(me.fields._tot_disc_harga_bangunan);




        // added 20 Mei 2015
        var elName = element.name;
        //   console.log(elName);



        // end 
        //console.log(me.discountAwal);
        // add on 11 Desember 2017 
        // hitung discount berdasrkan input approval verification

        // console.log(me.discountAwal);
        if (me.discountVerified === false) {
            if (me.discountAwal.basic.value > 0) {
                discountCollection.basic.amount = (discountCollection.basic.value / 100) * basicPrice.total;
            } else {
                discountCollection.basic.value = (discountCollection.basic.amount / basicPrice.total) * 100;
                discountCollection.basic.value = accounting.toFixed(discountCollection.basic.value, 2);
            }

            if (me.discountAwal.land.value > 0) {
                discountCollection.land.amount = (discountCollection.land.value / 100) * (basicPrice.permeter.amount + basicPrice.over.amount);
            } else {
                discountCollection.land.value = (discountCollection.land.amount / (basicPrice.permeter.amount + basicPrice.over.amount)) * 100;
                discountCollection.land.value = accounting.toFixed(discountCollection.land.value, 2);
            }

            if (me.discountAwal.building.value > 0) {
                discountCollection.building.amount = (discountCollection.building.value / 100) * basicPrice.building;
            } else {
                discountCollection.building.value = (discountCollection.building.amount / basicPrice.building) * 100;
                discountCollection.building.value = accounting.toFixed(discountCollection.building.value, 2);
            }
        }else{
			console.log(me.discountAwal);
			
            if (me.discountAwal.basic.value > 0) {
                discountCollection.basic.value = me.discountAwal.basic.value;
            } else {
                discountCollection.basic.value = (me.discountAwal.basic.amount / basicPrice.total) * 100;
                discountCollection.basic.value = accounting.toFixed(me.discountAwal.basic.value, 2);
            }
			//discountCollection.basic.amount = (discountCollection.basic.value / 100) * basicPrice.total;
			if(me.discountAwal.basic.amount > 0 ){
				discountCollection.basic.amount = me.discountAwal.basic.amount;
				discountCollection.basic.value = (discountCollection.basic.amount / basicPrice.total) * 100;
                discountCollection.basic.value = accounting.toFixed(discountCollection.basic.value, 2);
			}else{
				discountCollection.basic.amount = (discountCollection.basic.value / 100) * basicPrice.total;
			}
			
			
			

            if (me.discountAwal.land.value > 0) {
				discountCollection.land.value = me.discountAwal.land.value;
              //  
			} else {
                discountCollection.land.value = (me.discountAwal.land.amount / (basicPrice.permeter.amount + basicPrice.over.amount)) * 100;
                discountCollection.land.value = accounting.toFixed(me.discountAwal.land.value, 2);
            }
			if(me.discountAwal.land.amount > 0 ){
				discountCollection.land.amount = me.discountAwal.land.amount;
				discountCollection.land.value = (me.discountAwal.land.amount / (basicPrice.permeter.amount + basicPrice.over.amount)) * 100;
                discountCollection.land.value = accounting.toFixed(discountCollection.land.value, 2);
			}else{
				discountCollection.land.amount = (discountCollection.land.value / 100) * (basicPrice.permeter.amount + basicPrice.over.amount);
			
			}
			
			
			

            if (me.discountAwal.building.value > 0) {
                discountCollection.building.amount = (me.discountAwal.building.value / 100) * basicPrice.building;
            } else {
                discountCollection.building.value = (me.discountAwal.building.amount / basicPrice.building) * 100;
                discountCollection.building.value = accounting.toFixed(me.discountAwal.building.value, 2);
            }
			
			if(me.discountAwal.building.amount > 0 ){
				discountCollection.building.amount = me.discountAwal.building.amount;
				discountCollection.building.value = (me.discountAwal.building.amount / basicPrice.building) * 100;
                discountCollection.building.value = accounting.toFixed(discountCollection.building.value, 2);
			}else{
				discountCollection.building.amount = (discountCollection.building.value / 100) * basicPrice.building;
			}
			
			
			
        }


        //console.log(discountCollection);

        discountCollection.total = accounting.unformat(basicPrice.total) - ( accounting.unformat(discountCollection.basic.amount) + accounting.unformat(discountCollection.land.amount) + accounting.unformat(discountCollection.building.amount));

        me.sv(me.fields._tot_disc_harga_dasar, discountCollection.basic.amount);
        me.sv(me.fields._tot_disc_harga_tanah, discountCollection.land.amount);
        me.sv(me.fields._tot_disc_harga_bangunan, discountCollection.building.amount);
        me.sv(me.fields._harga_netto, discountCollection.total);

		console.log(discountCollection);



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

        };



        var fee = {
            balikNama: 0,
            perolehanHak: 0,
            aktaJualBeli: 0,
            administrasi: 0,
            administrasiSubsidi: 0,
            pMutu: 0,
            paketTambahan: 0,
            asuransi: 0,
            total: 0 /// harga jual
        };

        var discountSales = {
            value: 0,
            amount: 0,
            total: 0 // total harga jual
        };

        var discountCutterLand = me.isBasicDiscount === true ? discountCollection.basic.amount / 2 : discountCollection.land.amount;
        var discountCutterBuilding = me.isBasicDiscount === true ? discountCollection.basic.amount / 2 : discountCollection.building.amount;

        // console.log(me.prolibsFile);

        tax.land.value = me.gv(me.fields._ppn_tanah);
        tax.building.value = me.gv(me.fields._ppn_bangunan);
        tax.ppnbm.value = me.gv(me.fields._ppn_ppnbm);
        tax.pph22.value = me.gv(me.fields._ppn_pph22);



        /*
         
         if (me.useRumusBiaya) {
         fee.balikNama = window[me.prolibsFile].getBiayaBBNSertifikat({landSize:unitSize.land,landOverSize:unitSize.over,peruntukanCode:'00'});
         fee.perolehanHak = me.gv(me.fields._harga_bphtb);
         fee.aktaJualBeli = me.gv(me.fields._harga_bajtb);
         } else {
         fee.balikNama = me.gv(me.fields._harga_balik_nama);
         fee.perolehanHak = me.gv(me.fields._harga_bphtb);
         fee.aktaJualBeli = me.gv(me.fields._harga_bajtb);
         }
         */

        fee.balikNama = me.gv(me.fields._harga_balik_nama);
        fee.perolehanHak = me.gv(me.fields._harga_bphtb);
        fee.aktaJualBeli = me.gv(me.fields._harga_bajtb);



        fee.administrasi = me.gv(me.fields._biaya_administrasi);
        fee.administrasiSubsidi = me.gv(me.fields._biaya_administrasi_subsidi);
        fee.pMutu = me.gv(me.fields._biaya_p_mutu);
        fee.paketTambahan = me.gv(me.fields._biaya_paket_tambahan);
        fee.asuransi = me.gv(me.fields._biaya_asuransi);
        discountSales.value = me.gv(me.fields._disc_sales);
        tax.building.amount = me.gv(me.fields._tot_ppn_bangunan);
        tax.land.amount = me.gv(me.fields._tot_ppn_tanah);
		
		// temp 20180821
		console.log(fee.asuransi);

        if (this.isEditNilaiPPNBangunan === false) {
            tax.building.amount = (tax.building.value / 100) * (basicPrice.building - discountCutterBuilding);
        } else {
            tax.building.value = (tax.building.amount / (basicPrice.building - discountCutterBuilding)) * 100;
        }
        if (this.isEditNilaiPPNTanah === false) {
            tax.land.amount = (tax.land.value / 100) * (basicPrice.permeter.amount + basicPrice.over.amount - discountCutterLand);
        } else {
            tax.land.value = (tax.land.amount / (basicPrice.permeter.amount + basicPrice.over.amount - discountCutterLand)) * 100;
        }
        // tax.land.amount = (tax.land.value / 100) * (basicPrice.permeter.amount + basicPrice.over.amount - discountCutterLand);
        // tax.building.amount = (tax.building.value / 100) * (basicPrice.building - discountCutterBuilding);
        tax.ppnbm.amount = (tax.ppnbm.value / 100) * discountCollection.total;
        tax.pph22.amount = (tax.pph22.value / 100) * discountCollection.total;
		
		console.log(discountCollection.total);

        fee.total = discountCollection.total + tax.land.amount + tax.building.amount +
                fee.balikNama + tax.ppnbm.amount +
                fee.perolehanHak + fee.aktaJualBeli +
                fee.pMutu + tax.pph22.amount;

        /*
         fee.total = discountCollection.total + tax.land.amount + tax.building.amount +
         fee.balikNama + tax.ppnbm.amount +
         fee.perolehanHak + fee.aktaJualBeli + fee.administrasi + fee.administrasiSubsidi +
         fee.pMutu + fee.paketTambahan + tax.pph22.amount; 
         */

        discountSales.amount = (discountSales.value / 100) * fee.total;


        /// TOTAL di sini tidak dipakai
        /// TOTAL dipindahkan ke Erems.library.Price
        //discountSales.total = fee.total - discountSales.amount;
        discountSales.total = 0;
		
		console.log(fee.total);

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
        //added 20171010
        me.sv(me.fields._ppn_bangunan, tax.building.value);
        me.sv(me.fields._ppn_tanah, tax.land.value);
        //end

        /*
         if (me.useRumusBiaya) {
         me.sv(me.fields._harga_balik_nama, fee.balikNama);
         }
         */


        if (this.scheduleProcess) {

            this.scheduleProcess.calculate();
        }




    },
    getForm: function () {
        return this.form;
    },
    gv: function (name) {
        //  var v = toFloat(this.form.down("[name="+name+"]").getValue());
        // return isNaN(v)?0:v;
        if (typeof name === "undefined") {
            return 0;
        }
        var el = this.form.down("[name=" + name + "]");
        if (el) {



            return accounting.unformat(el.getValue());




        }
        return 0;

    },
    sv: function (name, value) {
        //  this.form.down("[name="+name+"]").setValue(value);
        if (typeof name === "undefined") {
            return 0;
        }
        var el = this.form.down("[name=" + name + "]");
        if (el) {

            if (name === "price_harga_dischargatanah" || name === "price_harga_dischargabangunan" || name === "price_harga_dischargadasar" || name === "pricenew_harga_dischargetanah" || name === "pricenew_harga_dischargebangunan" || name === "pricenew_harga_dischargedasar") {
                el.setValue(value);
            } else {
                el.setValue(accounting.formatMoney(value));
            }

            // el.setValue(accounting.formatMoney(value));

        }

    }
});