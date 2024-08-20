Ext.define('Erems.library.CalculatorDiscount', {
	extend   : 'Erems.library.TypeRounding',
	fields   : {},
	form     : null,
	discount : {
		basic    : { value : 0, amount : 0, jenis : 1 },
		land     : { value : 0, amount : 0, jenis : 1 },
		building : { value : 0, amount : 0, jenis : 1 }
	},
	calculate : function(){
		var me = this;

		var harga_tanah          = parseFloat(me.gv(me.fields.amount_harga_tanah));
		var harga_kelebihantanah = parseFloat(me.gv(me.fields.amount_harga_kelebihan_tanah));

		var tot_harga_tanah      = me.rounding(me.typeCalculaterounding, (harga_tanah + harga_kelebihantanah));
		var tot_harga_bangunan   = parseFloat(me.gv(me.fields.amount_harga_bangunan));
		var tot_harga_jual_dasar = parseFloat(me.gv(me.fields.amount_harga_jual_dasar));

		//////////// diskon dasar
		if(me.discount.basic.jenis == 1){ /// tipe persen
			var disc_amount_harga_dasar = me.rounding(me.typeCalculaterounding, ((me.discount.basic.value / 100) * tot_harga_jual_dasar));
			var disc_persen_harga_dasar = accounting.toFixed(me.discount.basic.value, 2);
		}
		else{
			var disc_amount_harga_dasar = me.rounding(me.typeCalculaterounding, me.discount.basic.amount);
			var disc_persen_harga_dasar = accounting.toFixed((me.discount.basic.amount / tot_harga_jual_dasar) * 100, 2);
		}

		//////////// diskon tanah
		if(me.discount.land.jenis == 1){ /// tipe persen
			var disc_amount_harga_tanah = me.rounding(me.typeCalculaterounding, ((me.discount.land.value / 100) * parseFloat(tot_harga_tanah)));
			var disc_persen_harga_tanah = accounting.toFixed(me.discount.land.value, 2);	
		}
		else{
			var disc_amount_harga_tanah = me.rounding(me.typeCalculaterounding, me.discount.land.amount);
			var disc_persen_harga_tanah = accounting.toFixed((me.discount.land.amount / parseFloat(tot_harga_tanah)) * 100, 2);	
		}

		//////////// diskon bangunan
		if(me.discount.building.jenis == 1){ /// tipe persen
			var disc_amount_harga_bangunan = me.rounding(me.typeCalculaterounding, ((me.discount.building.value / 100) * tot_harga_bangunan));
			var disc_persen_harga_bangunan = accounting.toFixed(me.discount.building.value, 2);	
		}
		else{
			var disc_amount_harga_bangunan = me.rounding(me.typeCalculaterounding, me.discount.building.amount);
			var disc_persen_harga_bangunan = accounting.toFixed((me.discount.building.amount / tot_harga_bangunan) * 100, 2);
		}
  
		me.sv(me.fields.amount_disc_harga_dasar, accounting.formatMoney(disc_amount_harga_dasar));
		me.sv(me.fields.persen_disc_harga_dasar, accounting.formatMoney(disc_persen_harga_dasar));
		me.sv(me.fields.amount_disc_harga_tanah, accounting.formatMoney(disc_amount_harga_tanah));
		me.sv(me.fields.persen_disc_harga_tanah, accounting.formatMoney(disc_persen_harga_tanah));
		me.sv(me.fields.amount_disc_harga_bangunan, accounting.formatMoney(disc_amount_harga_bangunan));
		me.sv(me.fields.persen_disc_harga_bangunan, accounting.formatMoney(disc_persen_harga_bangunan));

		// //////////////////////////////////////////////////////

		var harga_ppn_tanah = (parseFloat(accounting.toFixed(me.gv(me.fields.persen_ppn_tanah), 2)) / 100) * (parseFloat(tot_harga_tanah) - parseFloat(disc_amount_harga_tanah));
		me.sv(me.fields.amount_ppn_tanah, me.rounding(me.typeCalculaterounding, harga_ppn_tanah));

		var harga_ppn_bangunan = (parseFloat(accounting.toFixed(me.gv(me.fields.persen_ppn_bangunan), 2)) / 100) * (parseFloat(tot_harga_bangunan) - parseFloat(disc_amount_harga_bangunan));
		me.sv(me.fields.amount_ppn_bangunan, me.rounding(me.typeCalculaterounding, harga_ppn_bangunan));

		var netto = parseFloat(tot_harga_jual_dasar) - parseFloat(disc_amount_harga_dasar) - parseFloat(disc_amount_harga_tanah) - parseFloat(disc_amount_harga_bangunan);

		var harga_ppnbm = (me.gv(me.fields.persen_ppnbm) / 100) * parseFloat(netto);
		me.sv(me.fields.amount_ppnbm, me.rounding(me.typeCalculaterounding, harga_ppnbm));

		var harga_pph22 = (me.gv(me.fields.persen_pph22) / 100) * parseFloat(netto);
		me.sv(me.fields.amount_pph22, me.rounding(me.typeCalculaterounding, harga_pph22));
	},
	gv: function (name) {
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
		if (typeof name === "undefined") {
			return 0;
		}

		var el = this.form.down("[name=" + name + "]");
		if (el) {
			if (
				name.includes('harga_dischargatanah') || 
				name.includes('harga_dischargabangunan') || 
				name.includes('harga_dischargadasar') || 
				name.includes('harga_dischargetanah') || 
				name.includes('harga_dischargebangunan') || 
				name.includes('harga_dischargedasar')
			) {
				el.setValue(value);
			} 
			else {
				el.setValue(accounting.formatMoney(value, { precision : el.getDecPrecision() }));
			}
		}	
	}
});