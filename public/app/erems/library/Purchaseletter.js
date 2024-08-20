Ext.define('Erems.library.Purchaseletter', {
	extend            : 'Erems.library.Price',
	prolibsFile       : null,
	removeOldSchedule : true,
	dateTJ            :'',
	dateJeda          :'',
	dateLastum        :'',
	fields            : {
		total                : "harga_total_jual",
		jual                 : "price_harga_jual",
		salesDiscountPercent : "persen_salesdisc",
		salesDiscountAmount  : "harga_salesdisc",
		sisaAmount           : "billingrules_angsuran",
		sisaTimes            : "billingrules_term_angsuran",
		tandaJadiAmount      : "billingrules_tandajadi",
		tandaJadiTimes       : "billingrules_term_tandajadi",
		uangMukaAmount       : "billingrules_uangmuka",
		uangMukaTimes        : "billingrules_term_uangmuka"
	},
	sourceMoney: {
		name : '',
		id   : 0
	},
	tandaJadi: {
		times  : 0,
		amount : 0.0
	},
	uangMuka: {
		times  : 0,
		amount : 0.0
	},
	sisa: {
		times  : 1,
		amount : 0.0
	},
	getTypeByPriceType: function () {
		var x = '';
		if (this.priceTypeId === 1)
			x = "SIP";
		else if (this.priceTypeId === 2)
			x = "KPR";
		else
			x = "INH";
		return x;
	},
	setScheduleGrid: function (grid) {
		this.grid = grid;
	},
	setKomisiGrid: function (grid) {
		this.grid = grid;
	},
	init: function () {
		var me = this;
		var v  = me.form.getValues();
		var fi = me.fields;

		me.hargaJual        = me.numberValue(v[fi.jual]);
		me.sales.discount   = me.numberValue(v[fi.salesDiscountPercent]);
		me.sales.amount     = me.numberValue(v[fi.salesDiscountAmount]);
		me.tandaJadi.amount = me.numberValue(v[fi.tandaJadiAmount]);
		me.uangMuka.amount  = me.numberValue(v[fi.uangMukaAmount]);
		me.uangMuka.times   = me.numberValue(v[fi.uangMukaTimes]);
		me.tandaJadi.times  = me.numberValue(v[fi.tandaJadiTimes]);
		me.sisa.times       = me.numberValue(v[fi.sisaTimes]);
	},
	calculate: function () {
		var me = this;

		me.hitungTotal();
		me.hitungBilling();
		me.fillForm();
	},
	generateSchedule: function () {
		var me = this;
		me.calculate();
		me.buildSchedule();
	},
	fillForm: function () {
		var me = this;
		var f  = me.form;
		var fi = me.fields;

		f.down("[name=" + fi.salesDiscountAmount + "]").setValue(me.formatValue(me.sales.amount));
		f.down("[name=" + fi.total + "]").setValue(me.formatValue(me.total));

		// f.down("[name=" + fi.sisaAmount + "]").setValue(me.formatValue(me.sisa.amount));
		// f.down("[name=" + fi.sisaTimes + "]").setValue(me.sisa.times);
		// f.down("[name=" + fi.tandaJadiTimes + "]").setValue(me.tandaJadi.times);
		// f.down("[name=" + fi.uangMukaTimes + "]").setValue(me.uangMuka.times);

		///// Edit by Erwin.St 28/07/2021
		var amountSisa = me.sisa.amount,
			termSisa       = me.sisa.times,
			termTandajadi  = me.tandaJadi.times,
			termUangmuka   = me.uangMuka.times;
		if(typeof me.priceSourceid != 'undefined' && me.priceSourceid == 2){
			amountSisa    = 0;
			termSisa      = 0;
			termTandajadi = 0;
			termUangmuka  = 0;
		}

		f.down("[name=" + fi.sisaAmount + "]").setValue(me.formatValue(amountSisa));
		f.down("[name=" + fi.sisaTimes + "]").setValue(termSisa);
		f.down("[name=" + fi.tandaJadiTimes + "]").setValue(termTandajadi);
		f.down("[name=" + fi.uangMukaTimes + "]").setValue(termUangmuka);

	},
	hitungBilling: function () {
		var me = this;

		// hitung SISA
		if (!window[me.prolibsFile]) {
//            console.log("[HITUNGBILLING] Tidak ada prolibs");
			return;
		}

		/// jika tanpa uang muka

		if (me.uangMuka.times === 0) {

			me.sisa.amount = me.total - me.tandaJadi.amount;
		} else {
			me.sisa.amount = window[me.prolibsFile].getSisaBillingRules(me.total, me.uangMuka.amount, me.tandaJadi.amount);

		}

		/// jika uang muka lebih kecil dari tanda jadi
		if (me.tandaJadi.amount > me.uangMuka.amount && me.uangMuka.amount > 0) {
			me.sisa.amount = me.total - me.tandaJadi.amount;
		}

		// me.sisa.amount = me.total - ( me.uangMuka.amount);


		me.processComponentBilling();

	},
	processComponentBilling: function () {
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

	generateDueDate: function (count) {

		var date = this.plDate;

		var d = new Date(date);
		var m = d.getMonth();
		var y = d.getFullYear();
		//semy
		var today = new Date(date);
		var n = today.getDate();
		function kabisatGa(tahun)
		{
			var tahun;
			if (tahun % 4 == 0) {
				if (tahun % 100 == 0) {
					if (tahun % 400 == 0) {
						return true
					} else {
						return false
					}
				} else {
					return true
				}
			} else {
				return false
			}
		}

		if (n == 29 || n == 30) {
			var tempM = 0;
			tempM = m + count;
			m = (tempM % 12) === 0 ? 12 : (tempM % 12);
			y = y + Math.floor(tempM / 12);

			if (m == 01 || m == 1) {
				if (kabisatGa(y) == true) {
					var harikabisat = 29;
					d.setFullYear(y, 01, harikabisat);
				} else {
					var harikabisat = 28;
					d.setFullYear(y, 01, harikabisat);
				}
			} else {
				d.setMonth(m);
				d.setFullYear(y);
			}
			return d;
		} else if (n == 31) {
			var tempM = 0;
			tempM = m + count;
			m = (tempM % 12) === 0 ? 12 : (tempM % 12);
			y = y + Math.floor(tempM / 12);
			if (m == 2) {
				if (kabisatGa(y) == true) {
					var harikabisat = 29;
					d.setFullYear(y, 01, harikabisat);
				} else {
					var harikabisat = 28;
					d.setFullYear(y, 01, harikabisat);
				}
			} else {
				if (m == 1) {
					d.setFullYear(y, 1, 0);
				} else if (m == 12) {
					d.setFullYear(y - 1, 12, 0);
				} else {
					d.setMonth(m);
					d.setFullYear(y, m, 0);
				}
			}
			return d;
		} else {
			var tempM = 0;
			tempM = m + count;
			m = (tempM % 12) === 0 ? 12 : (tempM % 12);
			y = y + Math.floor(tempM / 12);

			d.setMonth(m);
			d.setFullYear(y);
			return d;
		}
	},
	getJeda: function() {
		var periode_jeda = this.periode_jeda;
		var type_periode_jeda = this.type_periode_jeda;
//        var type_jeda = '';
//        var jeda = 0;
		var data = [];
		if(type_periode_jeda == 1) {
			data['type_jeda'] = 'days';
			data['jeda'] = periode_jeda;
		}else if(type_periode_jeda == 2){
			data['type_jeda'] = 'days';
			data['jeda'] = periode_jeda * 7;
		}else{
			data['type_jeda'] = 'months';
			data['jeda'] = periode_jeda;
		}

		return data
	},
	generateDueDate2: function (count, scheduleType, termin, useUM) {
		var date = new Date(this.plDate);
		var is_jeda = this.is_jeda;
		getJeda = this.getJeda()
		var duedate = '';
		if(is_jeda > 0) {
			if (scheduleType == 'TJ') {
				duedate = new Date(moment(date).add(count, 'months').format('YYYY-MM-DD'));
				this.dateTJ = duedate
				return duedate;
			} else if(scheduleType == 'UM' && termin == 1){
				duedate = new Date(moment(this.dateTJ).add(getJeda['jeda'], getJeda['type_jeda']).format('YYYY-MM-DD'));
				this.dateJeda = duedate;
				return duedate;
			} else if((scheduleType != 'UM' || scheduleType != 'TJ') && useUM == 0 && termin == 1 ){
				duedate = new Date(moment(this.dateTJ).add(getJeda['jeda'], getJeda['type_jeda']).format('YYYY-MM-DD'));
				this.dateJeda = duedate;
				return duedate;
			} else {
				return new Date(moment(this.dateJeda).add(count-1, 'months').format('YYYY-MM-DD'));
			}
		} else {
			return new Date(moment(date).add(count, 'months').format('YYYY-MM-DD'));
		}

		//   var d = new Date(date);
	},
	buildSchedule: function () {
		var me = this;
		if (me.sisa.amount <= 0) {
			return;
		}

		var g = me.grid,
			s = g.getStore();

		if (me.removeOldSchedule) {
			s.loadData([], false);
		}

		if (!window[me.prolibsFile]) {
//            console.log("[PURCHLIBERROR] Tidak ada prolibs");
			return;
		}

		window[me.prolibsFile].setDataScheduleGrid({
			tj : me.tandaJadi.amount,
			um : me.uangMuka.amount,
			s  : me.sisa.amount
		});

		var amountPPNDTPN = 0;
		var pembulatan    = me.schedulePembulatan;
		var is_balloon    = me.is_balloon;
		var is_ppndtp     = me.is_ppndtp;
		var totalPPN      = me.totalPPN;
		var rencanaStDate = me.rencanaStDate;

		if(is_balloon === 1){
			var billing_id  = me.billingrules_id;
			var ball        = me.detailBalloon;
			var listBalloon = [];
			var counter     = 0;
			var vUM         = false;
			var vIH         = false;
			for(var i = 0; i < ball.length; i++){
				if(ball[i]['billingrules_id'] === billing_id){
					listBalloon[counter] = ball[i];
					counter++;
					if(ball[i]['schedule_type_balloon'] === 5){
						vUM = true;
					}
					if(ball[i]['schedule_type_balloon'] === 3){
						vIH = true;
					}
				}
			}

			var pembulatan_um   = (~~((me.uangMuka.amount-me.tandaJadi.amount) / me.uangMuka.times / pembulatan))*pembulatan;
			var pembulatan_sisa = (~~(me.sisa.amount / me.sisa.times / pembulatan))*pembulatan;

			var tSisa         = 0;
			var tSumRoundDown = 0.0;
			var amount        = 0;
			var count         = window[me.prolibsFile].getScheduleCountAwal();

			for (var i = 0; i < me.tandaJadi.times; i++) {
				if (i !== me.tandaJadi.times - 1) {
					amount = me.fixedPrecision(me.tandaJadi.amount / me.tandaJadi.times);
					tSisa += amount;
				}
				else { // untuk tagihan terakhir
					amount = me.tandaJadi.amount - tSisa;
				}
				count++;

				var floorVal = Math.floor(amount);

				if (i === me.tandaJadi.times - 1) { // tagihan UM Akhir
					floorVal = me.tandaJadi.amount - tSumRoundDown;
				}

				tSumRoundDown += floorVal;

				s.add({
					amount                     : floorVal,
					termin                     : (i + 1),
					scheduletype_scheduletype  : 'TJ',
					sourcemoney_sourcemoney    : me.sourceMoney.name,
					sourcemoney_sourcemoney_id : me.sourceMoney.id,
					remaining_balance          : floorVal,
					duedate                    : me.generateDueDate2(count,'TJ')
				});
			}
			tSisa         = 0;
			tSumRoundDown = 0;

			_um = window[me.prolibsFile].getUangMukaScheduleGrid();

			var useUM = 0;
			if (me.uangMuka.amount > me.tandaJadi.amount) {
				useUM = 1;
				if(vUM === true){
					var amountUM  = [];
					var totalUM   = 0;
					var counterUM = 1;
					var awalUM    = me.uangMuka.amount-me.tandaJadi.amount;
					for (var i = 0; i < listBalloon.length; i++) {
						if(listBalloon[i]['schedule_type_balloon'] === 5){
							var terminUM = listBalloon[i]['term_angsuran'];

							amountUM[i] = awalUM * listBalloon[i]['persen'] / 100;

							for (var j = 0; j < terminUM; j++) {
								var tagihanUM = Math.floor(amountUM[i]/terminUM);

								totalUM += tagihanUM;

								if(me.uangMuka.times === counterUM){ //tagihan terakhir
									tagihanUM = awalUM - totalUM + tagihanUM;
								}

								s.add({
									amount                     : tagihanUM,
									termin                     : counterUM,
									scheduletype_scheduletype  : 'UM',
									sourcemoney_sourcemoney    : me.sourceMoney.name,
									sourcemoney_sourcemoney_id : me.sourceMoney.id,
									remaining_balance          : tagihanUM,
									duedate                    : me.generateDueDate2(count,'UM', counterUM, useUM)
								});

								counterUM+=1;
								count++;
							}
						}
					}
				}
				else{
					for (var i = 0; i < me.uangMuka.times; i++) {
						if (i !== me.uangMuka.times - 1) {
							amount = me.fixedPrecision(_um / me.uangMuka.times);
							tSisa += amount;
						}
						else { // untuk tagihan terakhir
							amount = _um - tSisa;
						}

						if (i === 0 && me.uangMuka.times === 1) { // untuk tagihan yang pertama dan cuma satu - satunya
							amount = _um;
						}

						var floorVal = Math.floor(amount);

						if (i === me.uangMuka.times - 1) { // tagihan UM Akhir
							 pembulatan_um = pembulatan_um + ((me.uangMuka.amount-me.tandaJadi.amount)-(pembulatan_um*me.uangMuka.times));
						}

						tSumRoundDown += floorVal;

						count++;
						s.add({
							amount                     : pembulatan_um,
							termin                     : (i + 1),
							scheduletype_scheduletype  : 'UM',
							sourcemoney_sourcemoney    : me.sourceMoney.name,
							sourcemoney_sourcemoney_id : me.sourceMoney.id,
							remaining_balance          : pembulatan_um,
							duedate                    : me.generateDueDate2(count,'UM', (i + 1), useUM)
						});
					}
					tSisa = 0;
					tSumRoundDown = 0;
				}
			}

			if(vIH === true){
				var amountIH  = [];
				var tagihanIH;
				var totalIH   = 0;
				var counterIH = 1;
				for (var p = 0; p < listBalloon.length; p++) {
					if(listBalloon[p]['schedule_type_balloon'] === 3){
						var terminIH = listBalloon[p]['term_angsuran'];

						amountIH[p] = me.sisa.amount*listBalloon[p]['persen']/100;

						for (var j = 0; j < terminIH; j++) {
							var tagihanIH = Math.floor(amountIH[p]/terminIH);

							totalIH += tagihanIH;
							if(me.sisa.times === counterIH){ //tagihan terakhir
								tagihanIH = me.sisa.amount - totalIH + tagihanIH;
							}

							s.add({
								termin                     : counterIH,
								amount                     : tagihanIH,
								scheduletype_scheduletype  : me.getTypeByPriceType(),
								sourcemoney_sourcemoney    : me.sourceMoney.name,
								sourcemoney_sourcemoney_id : me.sourceMoney.id,
								remaining_balance          : tagihanIH,
								duedate                    : me.generateDueDate2(count, me.getTypeByPriceType(), counterIH, useUM)
							});

							counterIH+=1;
							count++;
						}
					}
				}
			}
			else{
				for (var i = 0; i < me.sisa.times; i++) {
					if (i !== me.sisa.times - 1) {
						amount = me.sisa.amount / me.sisa.times;
						amount = me.fixedPrecision(amount);
						tSisa += amount;
					}

					var floorVal = Math.floor(amount);

					if (i === me.sisa.times - 1) {
						pembulatan_sisa = pembulatan_sisa + (me.sisa.amount-(pembulatan_sisa*me.sisa.times));
					}

					tSumRoundDown += floorVal;

					count++;
					s.add({
						amount                     : pembulatan_sisa,
						termin                     : (i + 1),
						scheduletype_scheduletype  : me.getTypeByPriceType(),
						sourcemoney_sourcemoney    : me.sourceMoney.name,
						sourcemoney_sourcemoney_id : me.sourceMoney.id,
						remaining_balance          : pembulatan_sisa,
						duedate                    : me.generateDueDate2(count, me.getTypeByPriceType(), (i + 1), useUM)
					});
				}
			}
		}
		else{

			var endDt  = new Date("2024-12-31");

			// var vFirstpldate     = new Date(me.firstplDate);
			// var vRencanaStDate   = new Date(rencanaStDate);
			// var vRencanaStDate50 = new Date("2024-06-30");

			// var nppndtp = 1;
			// if (vRencanaStDate > vRencanaStDate50){
			//    nppndtp  = 2;
			// }

			var nppndtp = me.persentasePpndtp({pldate : new Date(me.firstplDate), rencanastdate : new Date(me.rencanaStDate)});

			var ppndtp = 0;
			var pembulatan_sisa = 0;
			var pembulatan_um = (~~((me.uangMuka.amount-me.tandaJadi.amount) / me.uangMuka.times / pembulatan))*pembulatan;
			if(is_ppndtp == 1){
				pembulatan_sisa = pembulatan_sisa = (~~((me.sisa.amount) / me.sisa.times / pembulatan))*pembulatan;
			}
			else{
				pembulatan_sisa = (~~(me.sisa.amount / me.sisa.times / pembulatan))*pembulatan;
			}

			var tSisa = 0;
			var tSumRoundDown = 0.0;
			var amount = 0;
			var count = window[me.prolibsFile].getScheduleCountAwal();
			tSisa = 0;

			for (var i = 0; i < me.tandaJadi.times; i++) {
				if (i !== me.tandaJadi.times - 1) {
					amount = me.fixedPrecision(me.tandaJadi.amount / me.tandaJadi.times);
					tSisa += amount;
				}
				else { // untuk tagihan terakhir
					amount = me.tandaJadi.amount - tSisa;
				}
				count++;

				var floorVal = Math.floor(amount);

				if (i === me.tandaJadi.times - 1) { // tagihan UM Akhir
					floorVal = me.tandaJadi.amount - tSumRoundDown;
				}
				tSumRoundDown += floorVal;

				s.add({
					amount                     : floorVal,
					termin                     : (i + 1),
					scheduletype_scheduletype  : 'TJ',
					sourcemoney_sourcemoney    : me.sourceMoney.name,
					sourcemoney_sourcemoney_id : me.sourceMoney.id,
					remaining_balance          : floorVal,
					duedate                    : me.generateDueDate2(count,'TJ')
				});

				//ppndtp 2023
				// var strtDt  = new Date(me.generateDueDate2(count,'TJ'));
				// if (strtDt <= endDt){
				   // ppndtp += (floorVal*0.11)
				// }
			}
			tSisa         = 0;
			tSumRoundDown = 0;

			_um = window[me.prolibsFile].getUangMukaScheduleGrid();

			var useUM = 0;
			if (me.uangMuka.amount > me.tandaJadi.amount) {
				useUM = 1;
				for (var i = 0; i < me.uangMuka.times; i++) {

					if (i !== me.uangMuka.times - 1) {
						amount = me.fixedPrecision(_um / me.uangMuka.times);
						tSisa += amount;
					}
					else { // untuk tagihan terakhir
						amount = _um - tSisa;
					}

					if (i === 0 && me.uangMuka.times === 1) { // untuk tagihan yang pertama dan cuma satu - satunya
						amount = _um;
					}

					var floorVal = Math.floor(amount);

					if (i === me.uangMuka.times - 1) { // tagihan UM Akhir
						pembulatan_um = pembulatan_um + ((me.uangMuka.amount-me.tandaJadi.amount)-(pembulatan_um*me.uangMuka.times));
					}

					tSumRoundDown += floorVal;

					count++;
					s.add({
						amount                     : pembulatan_um,
						termin                     : (i + 1),
						scheduletype_scheduletype  : 'UM',
						sourcemoney_sourcemoney    : me.sourceMoney.name,
						sourcemoney_sourcemoney_id : me.sourceMoney.id,
						remaining_balance          : pembulatan_um,
						duedate                    : me.generateDueDate2(count, 'UM', (i + 1), useUM)
					});

					//ppndtp 2023
					// var strtDt  = new Date(me.generateDueDate2(count, 'UM', (i + 1), useUM));
					// if (strtDt <= endDt){
					   // ppndtp += (pembulatan_um*0.11)
					// }
				}
				tSisa         = 0;
				tSumRoundDown = 0;
			}

			for (var i = 0; i < me.sisa.times; i++) {
				if (i !== me.sisa.times - 1) {
					amount = me.sisa.amount / me.sisa.times;
					amount = me.fixedPrecision(amount);
					tSisa += amount;
				}

				var floorVal = Math.floor(amount);

				if (i === me.sisa.times - 1) {
					if(is_ppndtp == 1){
						pembulatan_sisa = pembulatan_sisa + ((me.sisa.amount)-(pembulatan_sisa*me.sisa.times));
						// pembulatan_sisa = pembulatan_sisa + ((me.sisa.amount-totalPPN)-(pembulatan_sisa*me.sisa.times));
					}
					else{
						pembulatan_sisa = pembulatan_sisa + (me.sisa.amount-(pembulatan_sisa*me.sisa.times));
					}
				}

				tSumRoundDown += floorVal;

				count++;
				//ppndtp 2023
				// var strtDt  = new Date(me.generateDueDate2(count, me.getTypeByPriceType(), (i + 1), useUM));
				// if (strtDt <= endDt){
					// console.log('ppndtp1',ppndtp);
				   // ppndtp += (pembulatan_sisa*0.11);
					// console.log('ppndtp2',ppndtp);

					// if(ppndtp>=220000000){
						// ppndtp = 220000000;
					// }
				// }

					console.log('pembulatan_sisa',pembulatan_sisa);
				if(is_ppndtp == 1 && (i === me.sisa.times - 1)){
					if(nppndtp > 0){
						amountPPNDTPN = Math.ceil((totalPPN/nppndtp));
					}

					pembulatan_sisa = pembulatan_sisa - amountPPNDTPN;
				}
					console.log('pembulatan_sisa2',pembulatan_sisa);
				s.add({
					amount                     : pembulatan_sisa,
					termin                     : (i + 1),
					scheduletype_scheduletype  : me.getTypeByPriceType(),
					sourcemoney_sourcemoney    : me.sourceMoney.name,
					sourcemoney_sourcemoney_id : me.sourceMoney.id,
					remaining_balance          : pembulatan_sisa,
					duedate                    : me.generateDueDate2(count, me.getTypeByPriceType(), (i + 1), useUM)
				});
			}
		}

		if(is_ppndtp == 1){
			s.add({
				 amount                     : amountPPNDTPN,
				 // amount                     : Math.ceil((totalPPN/nppndtp)),
				 // amount                     : ppndtp,
				 termin                     : 1,
				 scheduletype_scheduletype  : 'PPNDTP',
				 sourcemoney_sourcemoney    : me.sourceMoney.name,
				 sourcemoney_sourcemoney_id : me.sourceMoney.id,
				 remaining_balance          : 0,
				 duedate                    : me.generateDueDate(count+1)
			});
		}
	},
	fixedPrecision: function (value) {
		var x = isNaN(value) ? 0 : value;
		x     = parseFloat(x.toFixed(EREMS_GLOBAL_PRECISION));
		return x;
	},
	persentasePpndtp : function(param={}){
		// console.log(param)
		var vPldate          = param.pldate;
		var vRencanaStDate   = param.rencanastdate;
		// vRencanaStDate50 = new Date("2024-06-30");

		var nppndtp = 1;
		// if (vRencanaStDate > vRencanaStDate50){
		//    nppndtp  = 2;
		// }

		if(
			(vPldate >= new Date("2023-10-01") && vPldate <= new Date("2024-06-30")) &&
			(vRencanaStDate >= new Date("2024-01-01") && vRencanaStDate <= new Date("2024-06-30"))
		){
			nppndtp = 1;
		}
		else if(
			(vPldate >= new Date("2023-10-01") && vPldate <= new Date("2024-12-31")) &&
			(vRencanaStDate >= new Date("2024-07-01") && vRencanaStDate <= new Date("2024-12-31"))
		){
			nppndtp = 2;
		}
		else if(
			(vPldate >= new Date("2024-07-01") && vPldate <= new Date("2024-12-31")) &&
			(vRencanaStDate > new Date("2024-12-31"))
		){
			nppndtp = 0;
		}

		// if(
		// 	(vPldate >= new Date("2023-10-01") && vPldate <= new Date("2024-12-31")) &&
		// 	(vRencanaStDate >= new Date("2024-07-01") && vRencanaStDate <= new Date("2024-12-31"))
		// ){
		// 	nppndtp = 2;
		// }
		// else if(
		// 	(vPldate >= new Date("2024-07-01") && vPldate <= new Date("2024-12-31")) &&
		// 	(vRencanaStDate > new Date("2024-12-31"))
		// ){
		// 	nppndtp = 0;
		// }
		return nppndtp;
	}
});
