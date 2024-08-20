Ext.define('Erems.library.Calculator', {
	extend                       : 'Erems.library.TypeRounding',
	form                         : null,
	fields                       : null,
	scheduleProcess              : null,
	element                      : null,
	isBasicDiscount              : false,
	isEditTanahpermeter          : false,
	isEditTotaltanah             : false,
	isEditKelebihantanahpermeter : false,
	isEditTotalkelebihantanah    : false,
	isEditBangunanpermeter       : false,
	isEditTotalbangunan          : false,
	isEditPersenPPNTanah         : false,
	isEditAmountPPNTanah         : false,
	isEditPersenPPNBangunan      : false,
	isEditAmountPPNBangunan      : false,
	isEditPersenPPNSubsididp     : false,
	isEditAmountPPNSubsididp     : false,
	isEditPersenPPNInterior      : false,
	isEditAmountPPNInterior      : false,
	isEditPersenPPNBM            : false,
	isEditAmountPPNBM            : false,
	isEditPersenPPH22            : false,
	isEditAmountPPH22            : false,
	isEditAmountBBNSertifikat    : false,
	isEditAmountBPHTB            : false,
	isEditAmountBAJB             : false,
	prolibsFile                  : null,
	useRumusBiaya                : false,
	discountVerified             : false,
	editedFields                 : {}, /// list field yang di edit di form data
	isGenerateValue              : false,
	tools                        : null,
	constructor                  : function (configs) {
		this.fields = configs.fields;
		this.form   = configs.form;
	},
	setSP : function (sp) {
		this.scheduleProcess = sp;
	},
	discount : {
		basic    : { value : 0, amount : 0, jenis : 1 },
		land     : { value : 0, amount : 0, jenis : 1 },
		building : { value : 0, amount : 0, jenis : 1 },
	},
	calculate : function (element) {
		/* binding */
		var me = this;

		// console.log(me.paramPricelist)
		/////// me.typeCalculaterounding Variable pembulatan
		/////// 1 = pembulatan normal(round), 2 = pembulatan kebawah(floor), 3 = pembulatan keatas(ceil), 4 = tidak dibulatkan(2 angka dibelakang koma)

		var unitSize   = { land : 0, over : 0 };
		var basicPrice = {
			permeter       : { value : 0, amount : 0 },
			over           : { value : 0, amount : 0 },
			building       : { value : 0, amount : 0},
			subsidi_dp     : 0,
			harga_interior : 0,
			total          : 0 // total dasar
		}

		var discountCollection = {
			basic    : { value : 0, amount : 0, jenis : 0 },
			land     : { value : 0, amount : 0, jenis : 0 },
			building : { value : 0, amount : 0, jenis : 0 },
			total    : 0 /// netto
		}

		var precisionHargatanah     = this.form.down("[name=" + me.fields._harga_tanah_a + "]").getDecPrecision();
		var precisionHargakelebihan = this.form.down("[name=" + me.fields._harga_kelebihan_a + "]").getDecPrecision();

		unitSize.land              = accounting.toFixed(me.gv(me.fields.land_size), 2);
		basicPrice.permeter.value  = accounting.toFixed(me.gv(me.fields._harga_tanah_a), precisionHargatanah);
		basicPrice.permeter.amount = accounting.toFixed(me.gv(me.fields._harga_tanah_b), 2);

		if(element.name.includes('harga_tanah')){
			me.isEditTotaltanah    = true;
			me.isEditTanahpermeter = false;

			basicPrice.permeter.value  = unitSize.land == 0 ? 0 : accounting.toFixed((basicPrice.permeter.amount / unitSize.land), precisionHargatanah);
			basicPrice.permeter.amount = unitSize.land == 0 ? 0 : basicPrice.permeter.amount;
		}

		if(element.name.includes('tanahpermeter')){
			me.isEditTotaltanah    = false;
			me.isEditTanahpermeter = true;

			basicPrice.permeter.value  = unitSize.land == 0 ? 0 : basicPrice.permeter.value;
			basicPrice.permeter.amount = me.rounding(me.typeCalculaterounding, (basicPrice.permeter.value * unitSize.land));
		}

		//// pengecekan khusus kelebihan tanah
		var arrKelebihantanahpermeter      = ['price_kelebihantanah', 'pricenew_kelebihantanah'];
		var arrTotalkelebihantanahpermeter = ['price_harga_kelebihantanah', 'pricenew_harga_kelebihantanah'];

		unitSize.over          = accounting.toFixed(me.gv(me.fields.kelebihan), 2);
		basicPrice.over.value  = accounting.toFixed(me.gv(me.fields._harga_kelebihan_a), precisionHargakelebihan);
		basicPrice.over.amount = accounting.toFixed(me.gv(me.fields._harga_kelebihan_b), 2);

		if(arrKelebihantanahpermeter.includes(element.name)){
			me.isEditKelebihantanahpermeter = true;
			me.isEditTotalkelebihantanah    = false;

			basicPrice.over.amount = me.rounding(me.typeCalculaterounding, (basicPrice.over.value * unitSize.over));
		}

		if(arrTotalkelebihantanahpermeter.includes(element.name)){
			me.isEditKelebihantanahpermeter = false;
			me.isEditTotalkelebihantanah    = true;

			basicPrice.over.value = unitSize.over == 0 ? 0 : accounting.toFixed((basicPrice.over.amount / unitSize.over), precisionHargakelebihan);
		}

		if(me.isEditTanahpermeter){
			me.sv(me.fields._harga_tanah_b, basicPrice.permeter.amount);
		}

		if(me.isEditTotaltanah){
			me.sv(me.fields._harga_tanah_a, basicPrice.permeter.value);
		}

		if(me.isEditKelebihantanahpermeter){
			me.sv(me.fields._harga_kelebihan_b, basicPrice.over.amount);
			if(unitSize.over == 0){
				basicPrice.over.value = 0;
				me.sv(me.fields._harga_kelebihan_a, basicPrice.over.value);
			}
		}

		if(me.isEditTotalkelebihantanah){
			me.sv(me.fields._harga_kelebihan_a, basicPrice.over.value);
			if(unitSize.over == 0){
				basicPrice.over.amount = 0;
				me.sv(me.fields._harga_kelebihan_b, basicPrice.over.amount);
			}
		}

		/////////////////// HITUNG BANGUNGAN /////////////
		var buildingSize = me.gv(me.fields.building_size);

		basicPrice.building.value  = accounting.toFixed(me.gv(me.fields._harga_bangunan_a), 2);
		basicPrice.building.amount = accounting.toFixed(me.gv(me.fields._harga_bangunan), 2);

		// console.log(buildingSize, element.name, element.name.includes('harga_bangunan'));
		if(element.name.includes('harga_bangunan')){
			me.isEditTotalbangunan    = true;
			me.isEditBangunanpermeter = false;

			basicPrice.building.value  = buildingSize == 0 ? 0 : accounting.toFixed((basicPrice.building.amount / buildingSize), 2);
			basicPrice.building.amount = buildingSize == 0 ? 0 : basicPrice.building.amount;
		}

		if(element.name.includes('bangunanpermeter')){
			me.isEditTotalbangunan    = false;
			me.isEditBangunanpermeter = true;

			basicPrice.building.value  = buildingSize == 0 ? 0 : basicPrice.building.value;
			basicPrice.building.amount = me.rounding(me.typeCalculaterounding, (basicPrice.building.value * buildingSize));
		}

		// console.log(basicPrice.building, me.isEditTotalbangunan, me.isEditBangunanpermeter);

		if(me.isEditBangunanpermeter){
			me.sv(me.fields._harga_bangunan, basicPrice.building.amount);
		}

		if(me.isEditTotalbangunan){
			me.sv(me.fields._harga_bangunan_a, basicPrice.building.value);
		}

		basicPrice.subsidi_dp     = accounting.toFixed(me.gv(me.fields._subsidi_dp), 2);
		basicPrice.harga_interior = accounting.toFixed(me.gv(me.fields._harga_interior), 2);

		basicPrice.total = parseFloat(basicPrice.permeter.amount) + parseFloat(basicPrice.over.amount) + parseFloat(basicPrice.building.amount) + parseFloat(basicPrice.subsidi_dp) + parseFloat(basicPrice.harga_interior);
		basicPrice.total = me.rounding(me.typeCalculaterounding, basicPrice.total);

		me.sv(me.fields._harga_jual_dasar, basicPrice.total);

		discountCollection.basic.value    = me.gv(me.fields._disc_harga_dasar);
		discountCollection.building.value = me.gv(me.fields._disc_harga_bangunan);
		discountCollection.land.value     = me.gv(me.fields._disc_harga_tanah);

		discountCollection.basic.amount    = me.gv(me.fields._tot_disc_harga_dasar);
		discountCollection.land.amount     = me.gv(me.fields._tot_disc_harga_tanah);
		discountCollection.building.amount = me.gv(me.fields._tot_disc_harga_bangunan);

		if(me.isEditTotaltanah || me.isEditTanahpermeter || me.isEditKelebihantanahpermeter || me.isEditTotalkelebihantanah || element.name.includes('harga_bangunan')){
			if(me.discount.basic.jenis == 1){
				discountCollection.basic.amount = (discountCollection.basic.value / 100) * parseFloat(basicPrice.total);
				discountCollection.basic.amount = me.rounding(me.typeCalculaterounding, discountCollection.basic.amount);
			}
			else{
				discountCollection.basic.value = accounting.toFixed((discountCollection.basic.amount / parseFloat(basicPrice.total)) * 100, 2);
			}

			if(me.discount.land.jenis == 1){
				discountCollection.land.amount = (discountCollection.land.value / 100) * (parseFloat(basicPrice.permeter.amount) + parseFloat(basicPrice.over.amount));
				discountCollection.land.amount = me.rounding(me.typeCalculaterounding, discountCollection.land.amount);
			}
			else{
				discountCollection.land.value = accounting.toFixed((discountCollection.land.amount / (parseFloat(basicPrice.permeter.amount) + parseFloat(basicPrice.over.amount))) * 100, 2);
			}

			if(me.discount.building.jenis == 1){
				discountCollection.building.amount = (discountCollection.building.value / 100) * parseFloat(basicPrice.building.amount);
				discountCollection.building.amount = me.rounding(me.typeCalculaterounding, discountCollection.building.amount);
			}
			else{
				discountCollection.building.value = accounting.toFixed((discountCollection.building.amount / parseFloat(basicPrice.building.amount)) * 100, 2);
			}
		}

		me.sv(me.fields._tot_disc_harga_dasar, accounting.formatMoney(discountCollection.basic.amount));
		me.sv(me.fields._disc_harga_dasar, accounting.formatMoney(discountCollection.basic.value));
		me.sv(me.fields._tot_disc_harga_tanah, accounting.formatMoney(discountCollection.land.amount));
		me.sv(me.fields._disc_harga_tanah, accounting.formatMoney(discountCollection.land.value));
		me.sv(me.fields._tot_disc_harga_bangunan, accounting.formatMoney(discountCollection.building.amount));
		me.sv(me.fields._disc_harga_bangunan, accounting.formatMoney(discountCollection.building.value));

		////// Netto /////
		discountCollection.total = accounting.unformat(basicPrice.total) - (accounting.unformat(discountCollection.basic.amount) + accounting.unformat(discountCollection.land.amount) + accounting.unformat(discountCollection.building.amount));
		discountCollection.total = me.rounding(me.typeCalculaterounding, discountCollection.total);
		me.sv(me.fields._harga_netto, discountCollection.total);
		/////  end discount /////

		var discountCutterLand     = me.isBasicDiscount === true ? discountCollection.basic.amount / 2 : discountCollection.land.amount;
		var discountCutterBuilding = me.isBasicDiscount === true ? discountCollection.basic.amount / 2 : discountCollection.building.amount;


		////////////////////////////// PPN ///////////////////////////////////
		var tax = {
			land : {
				value  : me.gv(me.fields._ppn_tanah),
				amount : me.gv(me.fields._tot_ppn_tanah)
			},
			building : {
				value  : me.gv(me.fields._ppn_bangunan),
				amount : me.gv(me.fields._tot_ppn_bangunan)
			},
			subsidi_dp : {
				value  : me.gv(me.fields._ppn_subsidi_dp),
				amount : me.gv(me.fields._tot_ppn_subsidi_dp)
			},
			interior : {
				value  : me.gv(me.fields._ppn_interior),
				amount : me.gv(me.fields._tot_ppn_interior)
			},
			ppnbm : {
				value  : me.gv(me.fields._ppn_ppnbm),
				amount : me.gv(me.fields._tot_ppn_ppnbm)
			},
			pph22 : {
				value  : me.gv(me.fields._ppn_pph22),
				amount : me.gv(me.fields._tot_ppn_pph22)
			}
		};

		///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
			if(element.name.includes('persen_ppntanah')){
				me.isEditPersenPPNTanah = true;
				me.isEditAmountPPNTanah = false;

				tax.land.amount = (parseFloat(tax.land.value) / 100) * (parseFloat(basicPrice.permeter.amount) + parseFloat(basicPrice.over.amount) - parseFloat(discountCutterLand));
			}
			else if(me.isEditPersenPPNTanah == false && (me.isEditTotaltanah || me.isEditTanahpermeter || me.isEditKelebihantanahpermeter || me.isEditTotalkelebihantanah)){
				tax.land.value = (parseFloat(tax.land.amount) / (parseFloat(basicPrice.permeter.amount) + parseFloat(basicPrice.over.amount) - parseFloat(discountCutterLand))) * 100;
			}

			if(element.name.includes('harga_ppntanah')){
				me.isEditPersenPPNTanah = false;
				me.isEditAmountPPNTanah = true;

				tax.land.value = (parseFloat(tax.land.amount) / (parseFloat(basicPrice.permeter.amount) + parseFloat(basicPrice.over.amount) - parseFloat(discountCutterLand))) * 100;
			}
			else if(me.isEditAmountPPNTanah == false && (me.isEditTotaltanah || me.isEditTanahpermeter || me.isEditKelebihantanahpermeter || me.isEditTotalkelebihantanah)){
				tax.land.amount = (parseFloat(me.gv(me.fields._ppn_tanah)) / 100) * (parseFloat(basicPrice.permeter.amount) + parseFloat(basicPrice.over.amount) - parseFloat(discountCutterLand));
			}

			tax.land.amount = me.rounding(me.typeCalculaterounding, tax.land.amount);
			tax.land.value  = accounting.toFixed(tax.land.value, 2);

			if(me.isEditPersenPPNTanah || (element.name.includes('tanahpermeter') || element.name.includes('harga_tanah') || arrKelebihantanahpermeter.includes(element.name) || arrTotalkelebihantanahpermeter.includes(element.name))){
				me.sv(me.fields._tot_ppn_tanah, tax.land.amount);
			}

			if(me.isEditAmountPPNTanah){
				me.sv(me.fields._ppn_tanah, tax.land.value);
			}

		///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
			if(element.name.includes('persen_ppnbangunan')){
				me.isEditPersenPPNBangunan = true;
				me.isEditAmountPPNBangunan = false;

				tax.building.amount = (parseFloat(tax.building.value) / 100) * (parseFloat(basicPrice.building.amount) - parseFloat(discountCutterBuilding));
			}
			else if(me.isEditPersenPPNBangunan == false && element.name.includes('harga_bangunan')){
				tax.building.value = (parseFloat(tax.building.amount) / (parseFloat(basicPrice.building.amount) - parseFloat(discountCutterBuilding))) * 100;
			}


			if(element.name.includes('harga_ppnbangunan')){
				me.isEditPersenPPNBangunan = false;
				me.isEditAmountPPNBangunan = true;

				tax.building.value = (parseFloat(tax.building.amount) / (parseFloat(basicPrice.building.amount) - parseFloat(discountCutterBuilding))) * 100;
			}
			else if(me.isEditAmountPPNBangunan == false && element.name.includes('harga_bangunan')){
				tax.building.amount = (parseFloat(me.gv(me.fields._ppn_bangunan)) / 100) * (parseFloat(basicPrice.building.amount) - parseFloat(discountCutterBuilding));
			}

			// isEditTotalbangunan

			tax.building.amount = me.rounding(me.typeCalculaterounding, tax.building.amount);
			tax.building.value  = accounting.toFixed(tax.building.value, 2);

			if(me.isEditPersenPPNBangunan || element.name.includes('harga_bangunan')){
				me.sv(me.fields._tot_ppn_bangunan, tax.building.amount);
			}

			if(me.isEditAmountPPNBangunan){
				me.sv(me.fields._ppn_bangunan, tax.building.value);
			}

		///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
			if(element.name.includes('persen_ppnsubsidi_dp')){
				me.isEditPersenPPNSubsididp = true;
				me.isEditAmountPPNSubsididp = false;

				tax.subsidi_dp.amount = (parseFloat(tax.subsidi_dp.value) / 100) * parseFloat(basicPrice.subsidi_dp);
			}
			else if(me.isEditPersenPPNSubsididp == false && element.name.includes('subsidi_dp')){
				tax.subsidi_dp.value = (parseFloat(tax.subsidi_dp.amount) / parseFloat(basicPrice.subsidi_dp)) * 100;
			}

			if(element.name.includes('harga_ppnsubsidi_dp')){
				me.isEditPersenPPNSubsididp = false;
				me.isEditAmountPPNSubsididp = true;

				tax.subsidi_dp.value = (parseFloat(tax.subsidi_dp.amount) / parseFloat(basicPrice.subsidi_dp)) * 100;
			}
			else if(me.isEditAmountPPNSubsididp == false && element.name.includes('subsidi_dp')){
				tax.subsidi_dp.amount = (parseFloat(me.gv(me.fields._ppn_subsidi_dp)) / 100) * parseFloat(basicPrice.subsidi_dp);
			}

			tax.subsidi_dp.amount = me.rounding(me.typeCalculaterounding, tax.subsidi_dp.amount);
			tax.subsidi_dp.value  = accounting.toFixed(tax.subsidi_dp.value, 2);

			if(me.isEditPersenPPNSubsididp){
				me.sv(me.fields._tot_ppn_subsidi_dp, tax.subsidi_dp.amount);
			}

			if(me.isEditAmountPPNSubsididp){
				me.sv(me.fields._ppn_subsidi_dp, tax.subsidi_dp.value);
			}


		///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
			if(element.name.includes('persen_ppninterior')){
				me.isEditPersenPPNInterior = true;
				me.isEditAmountPPNInterior = false;

				tax.interior.amount = (parseFloat(tax.interior.value) / 100) * parseFloat(basicPrice.harga_interior);
			}
			else if(me.isEditPersenPPNInterior == false && element.name.includes('interior')){
				tax.interior.value = (parseFloat(tax.interior.amount) / parseFloat(basicPrice.harga_interior)) * 100;
			}

			if(element.name.includes('harga_ppninterior')){
				me.isEditPersenPPNInterior = false;
				me.isEditAmountPPNInterior = true;

				tax.interior.value = (parseFloat(tax.interior.amount) / parseFloat(basicPrice.harga_interior)) * 100;
			}
			else if(me.isEditAmountPPNInterior == false && element.name.includes('interior')){
				tax.interior.amount = (parseFloat(me.gv(me.fields._ppn_interior)) / 100) * parseFloat(basicPrice.harga_interior);
			}

			tax.interior.amount = me.rounding(me.typeCalculaterounding, tax.interior.amount);
			tax.interior.value  = accounting.toFixed(tax.interior.value, 2);

			if(me.isEditPersenPPNInterior){
				me.sv(me.fields._tot_ppn_interior, tax.interior.amount);
			}

			if(me.isEditAmountPPNInterior){
				me.sv(me.fields._ppn_interior, tax.interior.value);
			}

		///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
			if(element.name.includes('persen_ppnbm')){
				me.isEditPersenPPNBM = true;
				me.isEditAmountPPNBM = false;

				tax.ppnbm.amount = (parseFloat(tax.ppnbm.value) / 100) * parseFloat(discountCollection.total);
			}
			else if(me.isEditPersenPPNBM == false && (me.isEditTotaltanah || me.isEditTanahpermeter || me.isEditKelebihantanahpermeter || me.isEditTotalkelebihantanah || element.name.includes('harga_bangunan'))){
				tax.ppnbm.value  = (parseFloat(tax.ppnbm.amount) / parseFloat(discountCollection.total))  * 100;
			}

			if(element.name.includes('harga_ppnbm')){
				me.isEditPersenPPNBM = false;
				me.isEditAmountPPNBM = true;

				tax.ppnbm.value  = (parseFloat(tax.ppnbm.amount) / parseFloat(discountCollection.total))  * 100;
			}
			else if(me.isEditAmountPPNBM == false && (me.isEditTotaltanah || me.isEditTanahpermeter || me.isEditKelebihantanahpermeter || me.isEditTotalkelebihantanah || element.name.includes('harga_bangunan'))){
				tax.ppnbm.amount = (parseFloat(me.gv(me.fields._ppn_ppnbm)) / 100) * parseFloat(discountCollection.total);
			}

			tax.ppnbm.amount = me.rounding(me.typeCalculaterounding, tax.ppnbm.amount);
			tax.ppnbm.value  = accounting.toFixed(tax.ppnbm.value, 2);

			if(me.isEditPersenPPNBM || (element.name.includes('tanahpermeter') || element.name.includes('harga_tanah') || arrKelebihantanahpermeter.includes(element.name) || arrTotalkelebihantanahpermeter.includes(element.name) || element.name.includes('harga_bangunan'))){
				me.sv(me.fields._tot_ppn_ppnbm, tax.ppnbm.amount);
			}

			if(me.isEditAmountPPNBM){
				me.sv(me.fields._ppn_ppnbm, tax.ppnbm.value);
			}

		///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
			if(element.name.includes('persen_pph22')){
				me.isEditPersenPPH22 = true;
				me.isEditAmountPPH22 = false;

				tax.pph22.amount = (parseFloat(tax.pph22.value) / 100) * parseFloat(discountCollection.total);
			}
			else if(me.isEditPersenPPH22 == false && (me.isEditTotaltanah || me.isEditTanahpermeter || me.isEditKelebihantanahpermeter || me.isEditTotalkelebihantanah || element.name.includes('harga_bangunan'))){
				tax.pph22.value = (parseFloat(tax.pph22.amount) / parseFloat(discountCollection.total)) * 100;
			}

			if(element.name.includes('harga_pph22')){
				me.isEditPersenPPH22 = false;
				me.isEditAmountPPH22 = true;

				tax.pph22.value = (parseFloat(tax.pph22.amount) / parseFloat(discountCollection.total)) * 100;
			}
			else if(me.isEditAmountPPH22 == false && (me.isEditTotaltanah || me.isEditTanahpermeter || me.isEditKelebihantanahpermeter || me.isEditTotalkelebihantanah || element.name.includes('harga_bangunan'))){
				tax.pph22.amount = (parseFloat(me.gv(me.fields._ppn_pph22)) / 100) * parseFloat(discountCollection.total);
			}

			tax.pph22.amount = me.rounding(me.typeCalculaterounding, tax.pph22.amount);
			tax.pph22.value  = accounting.toFixed(tax.pph22.value, 2);

			if(me.isEditPersenPPH22 || (element.name.includes('tanahpermeter') || element.name.includes('harga_tanah') || arrKelebihantanahpermeter.includes(element.name) || arrTotalkelebihantanahpermeter.includes(element.name) || element.name.includes('harga_bangunan'))){
				me.sv(me.fields._tot_ppn_pph22, tax.pph22.amount);
			}

			if(me.isEditAmountPPH22){
				me.sv(me.fields._ppn_pph22, tax.pph22.value);
			}

		///------------------------------------------------------------////
		var fee = {
			balikNama           : 0,
			perolehanHak        : 0,
			aktaJualBeli        : 0,
			pMutu               : 0,
			paketTambahan       : 0,
			asuransi            : 0,
			administrasi        : 0,
			administrasiSubsidi : 0,
			total               : 0 /// harga jual
		};

		var genValFields = [me.fields._harga_balik_nama, me.fields._harga_bphtb, me.fields._harga_bajtb];
		for (i = 0; i < genValFields.length; i++) {
			if (genValFields[i] == me.fields._harga_balik_nama) { fee.balikNama = me.gv(genValFields[i]); }
			if (genValFields[i] == me.fields._harga_bphtb) { fee.perolehanHak = me.gv(genValFields[i]); }
			if (genValFields[i] == me.fields._harga_bajtb) { fee.aktaJualBeli = me.gv(genValFields[i]); }

			if (me.editedFields[genValFields[i]] != 1) {
				if (me.isGenerateValue) {
					if (genValFields[i] == me.fields._harga_balik_nama) {
						fee.balikNama = window[me.prolibsFile].getBiayaBBNSertifikat({
							hrgNetto       : discountCollection.total,
							landSize       : unitSize.land,
							landOverSize   : unitSize.over,
							peruntukanCode : me.tools.comboHelper(this.form.down("[name=purposebuy_purposebuy_id]")).getField('purposebuy_id', 'code')
						});

					}

					if (genValFields[i] == me.fields._harga_bphtb) {
						fee.perolehanHak = window[me.prolibsFile].getBiayaBPHTB({ hrgNetto : discountCollection.total });
					}

					if (genValFields[i] == me.fields._harga_bajtb) {
						fee.aktaJualBeli =  window[me.prolibsFile].getBiayaBAJB({ hrgNetto : discountCollection.total });
					}
				}
				else if (typeof me.priceSourceid != 'undefined' && me.priceSourceid == 2 && typeof me.paramPricelist != 'undefined'){
					if (genValFields[i] == me.fields._harga_balik_nama && typeof me.paramPricelist.bbn_nominal_persen != 'undefined' && typeof me.paramPricelist.biaya_bbn != 'undefined') {
						fee.balikNama = me.paramPricelist.bbn_nominal_persen == 1 ? me.paramPricelist.biaya_bbn : (discountCollection.total * (me.paramPricelist.biaya_bbn/100));
					}

					if (genValFields[i] == me.fields._harga_bphtb && typeof me.paramPricelist.bphtb_nominal_persen != 'undefined' && typeof me.paramPricelist.biaya_bphtb != 'undefined') {
						fee.perolehanHak = me.paramPricelist.bphtb_nominal_persen == 1 ? me.paramPricelist.biaya_bphtb : (discountCollection.total * (me.paramPricelist.biaya_bphtb/100));
					}

					if (genValFields[i] == me.fields._harga_bajtb && typeof me.paramPricelist.ajb_nominal_persen != 'undefined' && typeof me.paramPricelist.biaya_ajb != 'undefined') {
						fee.aktaJualBeli = me.paramPricelist.ajb_nominal_persen == 1 ? me.paramPricelist.biaya_ajb : (discountCollection.total * (me.paramPricelist.biaya_ajb/100));
					}
				}
			}
		}

		if(!element.name.includes('harga_bbnsertifikat')){
			me.sv(me.fields._harga_balik_nama, fee.balikNama);
		}

		if(!element.name.includes('harga_bphtb')){
			me.sv(me.fields._harga_bphtb, fee.perolehanHak);
		}

		if(!element.name.includes('harga_bajb')){
			me.sv(me.fields._harga_bajtb, fee.aktaJualBeli);
		}

		fee.pMutu = me.gv(me.fields._biaya_p_mutu);

		fee.total = accounting.unformat(discountCollection.total) + accounting.unformat(tax.land.amount) + accounting.unformat(tax.building.amount) + accounting.unformat(tax.subsidi_dp.amount) + accounting.unformat(tax.interior.amount) + accounting.unformat(tax.ppnbm.amount) + accounting.unformat(tax.pph22.amount) + accounting.unformat(fee.balikNama) + accounting.unformat(fee.perolehanHak) + accounting.unformat(fee.aktaJualBeli) + accounting.unformat(fee.pMutu);
		fee.total = me.rounding(me.typeCalculaterounding, fee.total);
		me.sv(me.fields._total, fee.total);

		fee.paketTambahan = me.gv(me.fields._biaya_paket_tambahan);

		if (typeof me.priceSourceid != 'undefined' && me.priceSourceid == 2 && typeof me.paramPricelist != 'undefined'){
			if (me.editedFields[me.fields._biaya_administrasi] != 1 && typeof me.paramPricelist.administrasi_nominal_persen != 'undefined' && typeof me.paramPricelist.biaya_administrasi != 'undefined') {
				fee.administrasi = me.paramPricelist.administrasi_nominal_persen == 1 ? me.paramPricelist.biaya_administrasi : (fee.total * (me.paramPricelist.biaya_administrasi/100));
				fee.administrasi = me.rounding(me.typeCalculaterounding, fee.administrasi);
				me.sv(me.fields._biaya_administrasi, fee.administrasi);
			}
			if (me.editedFields[me.fields._biaya_administrasi_subsidi] != 1 && typeof me.paramPricelist.admsubsidi_nominal_persen != 'undefined' && typeof me.paramPricelist.biaya_admsubsidi != 'undefined') {
				fee.administrasiSubsidi = me.paramPricelist.admsubsidi_nominal_persen == 1 ? me.paramPricelist.biaya_admsubsidi : (fee.total * (me.paramPricelist.biaya_admsubsidi/100));
				fee.administrasiSubsidi = me.rounding(me.typeCalculaterounding, fee.administrasiSubsidi);
				me.sv(me.fields._biaya_administrasi_subsidi, fee.administrasiSubsidi);
			}
			if (me.editedFields[me.fields._biaya_asuransi] != 1 && typeof me.paramPricelist.asuransi_nominal_persen != 'undefined' && typeof me.paramPricelist.biaya_asuransi != 'undefined') {
				fee.asuransi = me.paramPricelist.asuransi_nominal_persen == 1 ? me.paramPricelist.biaya_asuransi : (fee.total * (me.paramPricelist.biaya_asuransi/100));
				fee.asuransi = me.rounding(me.typeCalculaterounding, fee.asuransi);
				me.sv(me.fields._biaya_asuransi, fee.asuransi);
			}
		}

		fee.administrasi        = me.gv(me.fields._biaya_administrasi);
		fee.administrasiSubsidi = me.gv(me.fields._biaya_administrasi_subsidi);
		fee.asuransi            = me.gv(me.fields._biaya_asuransi);

		var discountSales = { value : 0, amount : 0, total : 0 };

		discountSales.value  = me.gv(me.fields._disc_sales);
		discountSales.amount = (discountSales.value / 100) * fee.total;
		discountSales.amount = me.rounding(me.typeCalculaterounding, discountSales.amount);

		me.sv(me.fields._tot_disc_sales, discountSales.amount);
		me.sv(me.fields._total_jual, discountSales.total);

		if (this.scheduleProcess) {
			this.scheduleProcess.calculate();
		}
	},
	getForm: function () {
		return this.form;
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
