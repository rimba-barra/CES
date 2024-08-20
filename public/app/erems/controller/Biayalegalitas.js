Ext.define("Erems.controller.Biayalegalitas", {
	// extend: 'Erems.library.template.controller.Controlleralt',
	extend   : "Erems.library.template.controller.Controller",
	requires : ["Erems.library.DetailtoolAll",'Erems.library.template.component.Clustercombobox','Erems.library.template.component.Blockcombobox', 'Erems.library.TypeRounding'],
	alias    : "controller.Biayalegalitas",
	views    : [
		"biayalegalitas.Panel",
		"biayalegalitas.Grid",
		"biayalegalitas.FormSearch",
		"biayalegalitas.FormData",
		"biayalegalitas.GridDetail",
	],
	stores: [
		"Biayalegalitas",
		"Biayalegalitasdetail",
		"Purchaseletterbl",
		"Purchaseletterdetail",
		"Masterparameterglobal", 
		'Mastercluster', 
		'Masterblock'
	],
	models      : ["Biayalegalitas", "Purchaseletter", 'Mastercluster', 'Masterblock'],
	detailTool  : null,
	detailTool2 : null,
	refs        : [
		{
			ref      : "panel",
			selector : "biayalegalitaspanel",
		},
		{
			ref      : "grid",
			selector : "biayalegalitasgrid",
		},
		{
			ref      : "formsearch",
			selector : "biayalegalitasformsearch",
		},
		{
			ref      : "formdata",
			selector : "biayalegalitasformdata",
		},
		{
			ref      : "detailgrid",
			selector : "biayalegalitasgriddetail",
		},
	],
	controllerName              : "biayalegalitas",
	fieldName                   : "unit_number",
	bindPrefixName              : "Biayalegalitas",
	formWidth                   : 800,
	ctrler                      : "", //for get controller on browse item
	spcreq                      : "", //for get param_spcreq on browse item
	mnuname                     : "",
	sprIndex                    : 0,
	storeOld                    : null,
	vabca_active                : 0,
	vabca_digit_payment         : '',
	vabca_start_index_digit     : 5,
	vamandiri_active            : 0,
	vamandiri_digit_payment     : '',
	vamandiri_start_index_digit : 5,
	round                       : 1,
	prolibfile                  : null,
	roundlib                    : null,
	typeCalculaterounding       : 0,

	constructor : function (configs) {
		this.callParent(arguments);
		var me = this;
		me.roundlib = new Erems.library.TypeRounding();
	},
	init : function (application) {
		var me = this;
		this.control({
			biayalegalitaspanel: {
				beforerender: me.mainPanelBeforeRender,
				afterrender: this.panelAfterRender,
			},
			biayalegalitasgrid: {
				afterrender: this.gridAfterRender,
				itemdblclick: this.gridItemDblClick,
				itemcontextmenu: this.gridItemContextMenu,
				selectionchange: this.gridSelectionChange,
			},
			"biayalegalitasgrid toolbar button[action=create]": {
				click: function () {
					this.formDataShow("create");
				},
			},
			"biayalegalitasgrid toolbar button[action=update]": {
				click: function () {
					this.formDataShow("update");
				},
			},
			"biayalegalitasgrid toolbar button[action=destroy]": {
				click: this.dataDestroy,
			},
			// 'biayalegalitasgrid toolbar button[action=print]': {
			// 	click: this.dataPrint
			// },
			// 'biayalegalitasgrid toolbar button[action=generate_spr]': {
			// 	click: this.formDataSpr
			// },
			"biayalegalitasgrid actioncolumn": {
				afterrender: this.gridActionColumnAfterRender,
				click: this.gridActionColumnClick,
			},
			'biayalegalitasgrid button[action=printout]': {
				click: this.dataPrint
			},
			// 'biayalegalitasgrid toolbar button[action=cetak_surat_berkas]': {
			// 	click: this.docPrint
			// },
			biayalegalitasformsearch: {
				afterrender: this.formSearchAfterRender,
			},
			"biayalegalitasformsearch button[action=search]": {
				click: this.dataSearch,
			},
			"biayalegalitasformsearch button[action=reset]": {
				click: this.dataReset,
			},
			biayalegalitasformdata: {
				afterrender: this.formDataAfterRender,
			},
			"biayalegalitasformdata button[action=save]": {
				click: this.dataSave,
			},
			"biayalegalitasformdata button[action=cancel]": {
				click: this.formDataClose,
			},
			"biayalegalitasformdata button[action=browse_unit]": {
				click: me.selectUnitGridShow,
			},
			"biayalegalitasformdata [name=biayalegalitas_time]": {
				keyup: me.calculatetermin,
			},
			"biayalegalitasformdata [name=persentase]": {
				keyup: me.calculatebiaya,
			},
			"biayalegalitasformdata [name=biayalegalitas_total]": {
				keyup: me.calculatetermin,
			},
			/// add by erwin 08102020
			"biayalegalitasformdata [fieldCls=jenis_biaya]": {
				change : function (cb) {
					if(cb.hasFocus == true){
						me.totalBiayaLegalitas();
					}
				}
			},
			"biayalegalitasformdata [fieldCls=is_use_biaya]": {
				change : function (cb) {
					if(cb.hasFocus == true){
						me.totalBiayaLegalitas();
					}
				},
			},
			"biayalegalitasformdata [fieldCls=biaya]": {
				keyup : function (cb) {
					if(cb.hasFocus == true){
						me.totalBiayaLegalitas();
					}
				},
			},
			"biayalegalitasformdata button[action=generate]": {
				click: function () {
					me.generate();
				},
			},
			biayalegalitasgriddetail: {
				afterrender : me.gridDetailAfterRender,
				cellclick   : function (el, td, cellIndex, record, tr, rowIndex, e, eOpts) {
					if(record.data.amount == record.data.remaining_balance){
						return true;
					}	
					else{
						Ext.Msg.alert('Info', 'Tidak bisa edit, karena nilai Remaining Balance tidak sama dengan nilai Amount.');
						return false;
					}
				},
			},
			/* BROWSE CONTROL */
			biayalegalitasbrowsepanel: {
				beforerender: me.browsepanelBeforeRender,
			},
			"biayalegalitasbrowsepanel button[action=select]": {
				click: me.browsegridSelection,
			},
			biayalegalitasbrowsegrid: {
				afterrender: me.browsegridAfterRender,
			},
			biayalegalitasbrowseformsearch: {
				afterrender: me.browseformSearchAfterRender,
			},
			"biayalegalitasbrowseformsearch button[action=search]": {
				click: me.browsedataSearch,
			},
			"biayalegalitasbrowseformsearch button[action=reset]": {
				click: me.browsedataReset,
			},
			/* END BROWSE CONTROL */
		});
	},
	gridDetailAfterRender : function () {
		var me = this;
		me.getDetailgrid().getStore().removeAll();

		/// add by erwin.st 09/09/2021
		me.getDetailgrid().on('edit', function (editor, e) {
			// commit the changes right after editing finished
			var rec = e.record;

			if(editor.context.field == 'amount'){
				// rec.beginEdit();
				rec.set("remaining_balance", rec.get('amount'));
				// rec.endEdit();
				// rec.commit();

				var total_biaya = accounting.unformat(me.getFormdata().down("[name=biayalegalitas_total]").getValue());
				var total_amount = 0;
				me.getDetailgrid().getStore().each(function (r, i) {
					total_amount += parseFloat(r.get('amount'));
				});

				if(parseFloat(total_biaya) != parseFloat(total_amount)){
					var last_row_index = me.getDetailgrid().getStore().getCount() - 1;
					var selisih        = parseFloat(total_biaya) - parseFloat(total_amount);

					me.getDetailgrid().getStore().each(function (rc, idx) {
						if(last_row_index == idx){
							var sisa = selisih + rc.get('amount');
							rc.set('amount', sisa);
							rc.set('remaining_balance', sisa);
						}
					});
				}
			}
		});
	},
	calculatetermin : function () {
		var me       = this;
		var formdata = me.getFormdata();

		var biaya_legalitas = accounting.unformat(formdata.down("[name=biayalegalitas_total]").getValue());
		var termin          = accounting.unformat(formdata.down("[name=biayalegalitas_time]").getValue());
		var total           = me.amountSchedule({ amount : biaya_legalitas, termin : termin, round : me.round });

		formdata.down("[name=biayalegalitas_value]").setValue(accounting.formatMoney(total));
	},
	calculatebiaya : function () {
		var me = this;
		var formdata = me.getFormdata();

		var persentase = accounting.unformat(formdata.down("[name=persentase]").getValue());
		var harga_netto = accounting.unformat(formdata.down("[name=harga_netto]").getValue());

		var legalitas = (persentase / 100) * harga_netto;

		formdata.down("[name=biayalegalitas_total]").setValue(accounting.formatMoney(legalitas));
		me.calculatetermin();
	},
	getFinalData : function (formGetValues) {
		var finalData = formGetValues;
		return finalData;
	},
	validationProcess: function () {
		return true;
	},
	dataSave: function () {
		var me           = this;
		var form         = me.getFormdata().getForm();
		var addingRecord = false;

		if(!me.finalValidation()) {
			return false;
		}
		else if(form.isValid()) {
			var formdata    = this.getFormdata();
			var unit_id     = formdata.down("[name=unit_id]").getValue();
			var countdetail = me.getDetailgrid().getStore().getCount();

			if (unit_id == "") {
				Ext.Msg.show({
					title   : "Failure",
					msg     : "Error: Unit belum dipilih.",
					icon    : Ext.Msg.WARNING,
					buttons : Ext.Msg.OK,
				});
			} 
			else if (countdetail <= 0) {
				Ext.Msg.show({
					title   : "Failure",
					msg     : "Error: Harap Generate.",
					icon    : Ext.Msg.WARNING,
					buttons : Ext.Msg.OK,
				});
			} 
			else {
				resetTimer();
				//var store = me.getGrid().getStore();
				var store = null;
				if (me.instantCreateMode) {
					store = _Apps
						.getController(me.callerId)
						.getInstanCreateStorex(me.controllerName);
				} 
				else {
					store = me.getGrid().getStore();
				}
				var fida = me.getFinalData(form.getValues());

				//detail   Biayalegalitasdetail
				var detailgridStore = me.getDetailgrid().getStore();
				detailgridStore.clearFilter(true);
				var data_detail = [];
				var total_amount_grid = 0;
				var bool_amount_minus = false;
				for (var i = 0; i < detailgridStore.getCount(); i++) {
					detailgridStore.each(function (record, idx) {
						if (i == idx) {
							data_detail[i] = record.data;

							//addby anas 09022021 - untuk sum total amount di grid
							total_amount_grid += record.data.amount;

							if(record.data.amount <= 0){ //// Add by erwin.st 10092021
								bool_amount_minus = true;
							}
						}
					});
				}

				fida["details_data"] = data_detail;

				var msg = function () {
					me.getFormdata().up("window").body.mask("Saving data, please wait ...");
				};
				// console.log(me.getFormdata().up("window").state.toLowerCase());
		
				//add by anas 09022021
				//untuk cek total biaya dana total amount yang ada di grid
				if(total_amount_grid != accounting.unformat(formdata.down("[name=biayalegalitas_total]").getValue())){
					Ext.Msg.show({
						title   : "Failure",
						msg     : "Error: Total Biaya berbeda dengan Total Amount Schedule.",
						icon    : Ext.Msg.WARNING,
						buttons : Ext.Msg.OK,
					});
				}
				else if(bool_amount_minus){
					Ext.Msg.show({
						title   : "Failure",
						msg     : "Error: Amount schedule tidak boleh kurang dari sama dengan 0.",
						icon    : Ext.Msg.WARNING,
						buttons : Ext.Msg.OK,
					});
				}
				else{
					switch (me.getFormdata().up("window").state.toLowerCase()) {
						case "create":
							store.add(fida);
							addingRecord = true;
							break;
						case "update":
							var idProperty = store.getProxy().getReader().getIdProperty();
							var rec = store.getById(parseInt(form.findField(idProperty).getValue(), 10));
							rec.beginEdit();
							rec.set(fida);
							rec.endEdit();
							break;
						default:
							return;
					}

					store.on("beforesync", msg);
					store.sync({
						success : function () {
							me.getFormdata().up("window").body.unmask();
							store.un("beforesync", msg);
							store.reload();

							if (typeof Ext.StoreManager.lookup(me.stores[0]) != "undefined") {
								Ext.StoreManager.lookup(me.stores[0]).load({
									params: { limit: 0 },
								});
							}
							Ext.Msg.show({
								title   : "Success",
								msg     : "Data saved successfully.",
								icon    : Ext.Msg.INFO,
								buttons : Ext.Msg.OK,
								fn      : function () {
									me.formDataClose();
								},
							});
						},
						failure: function () {
							me.getFormdata().up("window").body.unmask();
							store.un("beforesync", msg);
							if (store.getCount() > 0 && addingRecord) {
								store.removeAt(store.getCount() - 1);
							}
							store.reload();
							Ext.Msg.show({
								title   : "Failure",
								msg     : "Error: Unable to save data.",
								icon    : Ext.Msg.ERROR,
								buttons : Ext.Msg.OK,
							});
						},
					});
				}
			}
		}
	},
	generate: function () {
		var me       = this;
		var gd       = me.getDetailgrid();
		var p        = me.getPanel();
		var s        = gd.getStore();
		var formdata = me.getFormdata();

		// var biaya_value = formdata.down("[name=biayalegalitas_value]").getValue();
		var my_date     = new Date();

		var termin = formdata.down("[name=biayalegalitas_time]").getValue();
		termin     = termin ? accounting.unformat(termin) : 0;

		var biayalegalitas_total = formdata.down("[name=biayalegalitas_total]").getValue();
		biayalegalitas_total     = biayalegalitas_total ? accounting.unformat(biayalegalitas_total) : 0;

		//updated by anas 05112021
		// var selisih = ((termin * accounting.unformat(biaya_value)) - biayalegalitas_total).toFixed(2);
		// var lastrecord_value =  (accounting.unformat(biaya_value) - selisih);

		var biaya_value      = me.amountSchedule({ amount : biayalegalitas_total, termin : termin, round : me.round });
		var lastrecord_value = biayalegalitas_total-((biaya_value)*termin)+biaya_value;

		if(biayalegalitas_total <= 0){
			Ext.Msg.alert("Info", "Total biaya tidak boleh kosong dan harus lebih dari 0.");
			return;
		}
		else if(termin <= 0){
			Ext.Msg.alert("Info", "Termin tidak boleh kosong dan harus lebih dari 0.");
			return;	
		}
		else{
			gd.setLoading("Please wait...");
			switch (formdata.up("window").state.toLowerCase()) {
				case "create":
					s.loadData([], false);
					for (var i = 0; i < termin; i++) {
						var last_date = new Date(my_date.getFullYear(), my_date.getMonth() + 1, 0);
						s.add({
							due_date          : last_date,
							termin            : (i + 1),
							scheduletype      : 'BLG',
							amount            : ((i + 1) == termin ? lastrecord_value : biaya_value),
							remaining_balance : ((i + 1) == termin ? lastrecord_value : biaya_value),
						});
						my_date = new Date(moment(last_date).add(1, 'days').format('YYYY-MM-DD'));
					}
				break;
				case "update":
					var remainingBalance = 0;
					var amount           = 0;
					var terminPaid       = [];
					var nilaiSisa        = 0;
					var amountUnPaid     = 0;

					for(var i = 0;i < me.storeOld.length;i++){
						var record       = me.storeOld[i].data;
						remainingBalance = parseFloat(record.remaining_balance);
						amount           = parseFloat(record.amount);

						if(amount !== remainingBalance){
							nilaiSisa    += parseFloat(amount-remainingBalance);
							amountUnPaid += parseFloat(amount);

							terminPaid[record.termin] = record;
						}
					}

					let terminPaidLength = terminPaid.reduce((acc,cv)=>(cv)?acc+1:acc,0);
					formdata.down("[name=nilai_sisa]").setValue(accounting.formatMoney(nilaiSisa));

					if(biayalegalitas_total <= nilaiSisa){
						Ext.Msg.show({
							title   : "Failure",
							msg     : "Gagal generate new schedule, Biaya legalitas harus lebih besar dari nilai terbayar",
							icon    : Ext.Msg.ERROR,
							buttons : Ext.Msg.OK,
						});
						formdata.down("[name=nilai_sisa]").show();
					}
					else if(termin < terminPaid.length-1){
						Ext.Msg.show({
							title   : "Failure",
							msg     : "Gagal generate new schedule, Termin Amount yang terbayar lebih dari termin yang diminta",
							icon    : Ext.Msg.ERROR,
							buttons : Ext.Msg.OK,
						});
						formdata.down("[name=nilai_sisa]").show();
					}
					else if(nilaiSisa > 0){
						var amount,remaining_balance,last_date,record,terminUnPaid = 0;
						terminUnPaid         = termin-terminPaidLength;
						biayalegalitas_total = biayalegalitas_total-amountUnPaid;
						biaya_value          = parseFloat(biayalegalitas_total/terminUnPaid);

						s.loadData([], false);
						for (var i = 0; i < termin; i++) {
							amount            = biaya_value;
							remaining_balance = biaya_value;
							last_date         = new Date(my_date.getFullYear(), my_date.getMonth() + 1, 0);
							if(terminPaid.hasOwnProperty(i+1)){
								record            = terminPaid[i+1];
								amount            = record.amount;
								remaining_balance = record.remaining_balance;
								last_date         = record.due_date;
							}
							s.add({
								due_date          : last_date,
								termin            : (i + 1),
								scheduletype      : 'BLG',
								amount            : amount,
								remaining_balance : remaining_balance,
							});
							last_date = new Date(my_date.getFullYear(), my_date.getMonth() + 1, 0);
							my_date   = new Date(moment(last_date).add(1, 'days').format('YYYY-MM-DD'));
						}
						formdata.down("[name=nilai_sisa]").show();
					}
					else{
						s.loadData([], false);
						for (var i = 0; i < termin; i++) {
							var last_date = new Date(my_date.getFullYear(), my_date.getMonth() + 1, 0);
							s.add({
								due_date          : last_date,
								termin            : (i + 1),
								scheduletype      : 'BLG',
								amount            : ((i + 1) == termin ? lastrecord_value : biaya_value),
								remaining_balance : ((i + 1) == termin ? lastrecord_value : biaya_value),
							});
							my_date = new Date(moment(last_date).add(1, 'days').format('YYYY-MM-DD'));
						}
					}
				break;
				default:
				break;
			}
			gd.setLoading(false);
		}
	},
	gridSelectionChange: function () {
		var me   = this;
		var grid = me.getGrid(),
		
		row = grid.getSelectionModel().getSelection();

		grid.down("#btnEdit").setDisabled(row.length != 1);
		grid.down("#btnDelete").setDisabled(row.length < 1);
		grid.down("#btnPrintout").setDisabled(row.length != 1);
		// grid.down("#btnCetaksuratberkas").setDisabled(row.length < 1);
		// grid.down("#btnGeneratespr").setDisabled(row.length < 1);
	},
	/// add by erwin.st 08/09/2021
	panelAfterRender : function () {
		var me = this;

		$.ajax({
			method : "POST",
			url    : "erems/biayalegalitas/read/",
			data   : { mode_read: "config" }
		}).done(function (msg) {
			me.vabca_active                = msg.vabca_active;
			me.vabca_digit_payment         = msg.vabca_digit_payment;
			me.vabca_start_index_digit     = msg.vabca_start_index_digit;
			me.vamandiri_active            = msg.vamandiri_active;
			me.vamandiri_digit_payment     = msg.vamandiri_digit_payment;
			me.vamandiri_start_index_digit = msg.vamandiri_start_index_digit;
			me.round                       = msg.round;
			me.prolibfile                  = msg.prolibfile;
			me.typeCalculaterounding       = msg.typeCalculaterounding;

			me.checkProlibs(me.prolibfile);
		});
	},
	fdar : function () {
		var me = this;
		var x  = {
			init: function () {

			},
			create: function () {
				// me.getFormdata().down("[name=persentase]").setValue(6);
				var me = this;
				// me.getDetailgrid().getStore().removeAll();
			},
			update: function () {
				var grid = me.getGrid();
				var store = grid.getStore();

				var record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));

				me.getFormdata().loadRecord(record);
				me.getFormdata().down("#fd_browse_unit_btn").setDisabled(true);

				var plDetailStore = me.getPurchaseletterdetailStore();
				plDetailStore.load({
					params: {
						mode_read         : "detail",
						purchaseletter_id : record.data.purchaseletter_id,
					},
					callback: function (rec) {
						me.getFormdata()
						  .down("[name=purchaseletter_id]")
						  .setValue(rec[0].get("purchaseletter_id"));
						me.getFormdata()
						  .down("[name=purchaseletter_no]")
						  .setValue(rec[0].get("purchaseletter_no"));
						me.getFormdata()
						  .down("[name=purchase_date]")
						  .setValue(rec[0].get("purchase_date"));
						me.getFormdata()
						  .down("[name=unit_id]")
						  .setValue(rec[0].get("unit_id"));
						me.getFormdata()
						  .down("[name=salesman_name]")
						  .setValue(rec[0].get("salesman_name"));
						me.getFormdata()
						  .down("[name=harga_total_jual]")
						  .setValue(rec[0].get("harga_total_jual"));
						me.getFormdata()
						  .down("[name=akad_date]")
						  .setValue(rec[0].get("akad_realisasiondate"));
						me.getFormdata()
						  .down("[name=pricetype]")
						  .setValue(rec[0].get("pricetype"));

						me.fillUnitDataToForm(rec[0]);
						me.fillMasterCustomerData(rec[0], "customer");
					},
				});

				var p = me.getPanel();
				p.setLoading("Please wait...");
				var gd = me.getDetailgrid();
				var s = gd.getStore();

				var termin = me.getFormdata().down("[name=biayalegalitas_time]").getValue();
				var biaya_value = me.getFormdata().down("[name=biayalegalitas_value]").getValue();
				var my_date = new Date();

				gd.getStore().load({
					params: {
						mode_read         : "detail_biayalegalitas",
						biayalegalitas_id : record.data.biayalegalitas_id,
					},
					callback: function (rec, op) {
						/// Add by Erwin 09102020
						var info      = Ext.JSON.decode(op.response.responseText);
						var main_data = info.main_data[0];

						var termin      = main_data.biayalegalitas_time;
						var biaya_value = main_data.biayalegalitas_value;
						var biaya_total = main_data.biayalegalitas_total;

						me.getFormdata().down("[name=va_no]").setValue(main_data.va_no);
						me.getFormdata().down("[name=va_no_bca]").setValue(main_data.va_no_bca);
						me.getFormdata().down("[name=persentase]").setValue(accounting.formatMoney(main_data.persentase));

						me.getFormdata().down("[name=biayalegalitas_total]").setValue(accounting.formatMoney(biaya_total));
						me.getFormdata().down("[name=biayalegalitas_time]").setValue(termin);
						me.getFormdata().down("[name=biayalegalitas_value]").setValue(accounting.formatMoney(biaya_value));
						me.getFormdata().down("[itemId=notes]").setValue(main_data.notes);
						
						me.getFormdata().down("[itemId=jenis_biaya_1]").setValue(main_data.jenis_biaya_1 == 1 ? true : false);
						me.getFormdata().down("[itemId=jenis_biaya_2]").setValue(main_data.jenis_biaya_2 == 1 ? true : false);
						me.getFormdata().down("[itemId=jenis_biaya_3]").setValue(main_data.jenis_biaya_3 == 1 ? true : false);
						me.getFormdata().down("[itemId=jenis_biaya_4]").setValue(main_data.jenis_biaya_4 == 1 ? true : false);
						me.getFormdata().down("[itemId=jenis_biaya_5]").setValue(main_data.jenis_biaya_5 == 1 ? true : false);

						me.getFormdata().down("[name=biaya_ajb]").setValue(accounting.formatMoney(main_data.biaya_ajb));
						me.getFormdata().down("[name=biaya_bphtb]").setValue(accounting.formatMoney(main_data.biaya_bphtb));
						me.getFormdata().down("[name=biaya_bbn]").setValue(accounting.formatMoney(main_data.biaya_bbn));

						me.getFormdata().down("[name=is_use_biaya_ajb]").setValue(main_data.is_use_biaya_ajb == 1 ? true : false);
						me.getFormdata().down("[name=is_use_biaya_bphtb]").setValue(main_data.is_use_biaya_bphtb == 1 ? true : false);
						me.getFormdata().down("[name=is_use_biaya_bbn]").setValue(main_data.is_use_biaya_bbn == 1 ? true : false);

						if(main_data.jenis_biaya_1 == 1){
							me.getFormdata().down("[name=biayalegalitas_total]").setReadOnly(true);
						}

						if(main_data.jenis_biaya_2 == 1 || main_data.jenis_biaya_3 == 1 || main_data.jenis_biaya_4 == 1 || main_data.jenis_biaya_5 == 1){
							me.getFormdata().down("[name=persentase]").setReadOnly(true);
						}

						s.loadData([], false);

						for (var i = 0; i < rec.length; i++) {
						  var data = rec[i].data;
						  s.add({
							due_date          : data.due_date,
							termin            : data.termin,
							scheduletype      : 'BLG',
							amount            : data.amount,
							remaining_balance : data.remaining_balance,
						  });
						}
						me.storeOld = rec;
						p.setLoading(false);
					},
				});
			},
		};
		return x;
	},
	selectUnitGridShow: function () {
		var me    = this;
		me.ctrler = "Sppjb";
		me.instantWindow(
			"browse.Panel",
			800,
			"Browse Item",
			"read",
			"myBrowseItemPanel"
		);
	},
	//================= BROWSE PANEL ================================
	instantWindow: function (panel, width, title, state, id) {
		var me = this;
		var formtitle, formicon;

		title = typeof title == "undefined" ? "My Window" : title;
		id    = typeof id == "undefined" ? "myInstantWindow" : id;
		state = typeof state == "undefined" ? "create" : state;
		panel = typeof panel == "undefined" ? "Panel" : panel;
		width = typeof width == "undefined" ? 600 : width;

		formtitle = title;
		formicon  = "icon-form-add";
		var winId = id;

		var win = desktop.getWindow(winId);
		if (!win) {
			win = desktop.createWindow({
				id              : winId,
				title           : formtitle,
				iconCls         : formicon,
				resizable       : false,
				minimizable     : false,
				maximizable     : false,
				width           : width,
				renderTo        : Ext.getBody(),
				constrain       : true,
				constrainHeader : false,
				modal           : true,
				layout          : "fit",
				shadow          : "frame",
				shadowOffset    : 10,
				border          : false,
				items           : Ext.create("Erems.view." + me.controllerName + "." + panel),
				state           : state,
			});
		}
		win.show();
	},
	browsepanelBeforeRender: function (el, a, b) {
		var me = this;

		var gridView = Ext.create("Erems.view.biayalegalitas.browse.Grid", {
			region : "center",
		});
		var searchView = Ext.create("Erems.view.biayalegalitas.browse.FormSearch", {
			region      : "west",
			split       : true,
			maxWidth    : 500,
			minWidth    : 300,
			width       : 300,
			collapsed   : true,
			collapsible : true,
			iconCls     : "icon-search",
			title       : "Search",
		});
		el.removeAll();
		el.add(gridView);
		el.add(searchView);
	},
	browsegridSelection: function (el) {
		var me        = this;
		var unitGrid  = el.up("grid");
		var unitStore = el.up("grid").getStore();
		var rows      = unitGrid.getSelectionModel().getSelection();
		if (rows.length == 1) {
			el.up("window").destroy();
			me.processRowFromItemSelection(rows, "purchaseletter");
		} else {
			Ext.Msg.alert("Info", "Require 1 unit!");
			return;
		}
	},
	browsegridAfterRender : function (el, a, b) {
		var me = this;

		me.browsedataReset(
			el.up("panel").up("panel").down("button[action=search]")
		);

		resetTimer();
		var store = el.getStore();
		store.removeAll();
		store.loadPage(1);
	},
	browseformSearchAfterRender : function (el) {
		var me = this;

		var ftStore = null;
		ftStore = el.form._fields.items[2].getStore();
		ftStore.load({ params: { start: 0, limit: 0 } });
	},
	browsedataSearch: function (el) {
		resetTimer();
		var me = this;

		var form = el.up("form");
		var store = el.up("panel").up("panel").down("grid").getStore();

		var srcform = form.getForm();
		srcform._fields.items[1].setValue(me.spcreq); //('[name=param_spcreq]')

		var fields = form.getValues();
		for (var x in fields) {
		  store.getProxy().setExtraParam(x, fields[x]);
		}
		//        store.getProxy().setExtraParam('berkas_group', me.mnuname);
		store.loadPage(1);
	},
	browsedataReset: function (el) {
		var me = this;
		var form = el.up("form");
		form.getForm().reset();

		var srcform = form.getForm();
		srcform._fields.items[1].setValue(me.spcreq); //('[name=param_spcreq]')

		me.browsedataSearch(
		  el.up("panel").up("panel").down("button[action=search]")
		);
	},
	//===================== END BROWSE PANEL ===============================

	processRowFromItemSelection: function (rows, modul) {
		var me = this;
		me.fillPurchaseletter(rows);
	},
	fillPurchaseletter: function (rows) {
		var me = this;

		var plDetailStore = me.getPurchaseletterdetailStore();
		//me.getFormdata().up('window').body.mask('Loading data...');
		plDetailStore.load({
			params: {
				mode_read: "detail",
				purchaseletter_id: rows[0].get("purchaseletter_id"),
			},
			callback: function (rec) {
				me.getFormdata()
				  .down("[name=purchaseletter_id]")
				  .setValue(rec[0].get("purchaseletter_id"));
				me.getFormdata()
				  .down("[name=purchaseletter_no]")
				  .setValue(rec[0].get("purchaseletter_no"));
				me.getFormdata()
				  .down("[name=purchase_date]")
				  .setValue(rec[0].get("purchase_date"));

				me.getFormdata().down("[name=unit_id]").setValue(rec[0].get("unit_id"));
				me.getFormdata()
				  .down("[name=salesman_name]")
				  .setValue(rec[0].get("salesman_name"));
				me.getFormdata()
				  .down("[name=harga_total_jual]")
				  .setValue(accounting.formatMoney(rec[0].get("harga_total_jual")));
				me.getFormdata()
				  .down("[name=harga_netto]")
				  .setValue(accounting.formatMoney(rec[0].get("harga_netto")));
				me.getFormdata()
				  .down("[name=akad_date]")
				  .setValue(rec[0].get("akad_realisasiondate"));
				me.getFormdata()
				  .down("[name=pricetype]")
				  .setValue(rec[0].get("pricetype"));

				// fill biaya legal
				// me.getFormdata().down("[itemId=jenis_biaya_1]").setValue(true);
				me.getFormdata().down("[name=persentase]").setValue(6);
				me.getFormdata()
				  .down("[name=biayalegalitas_total]")
				  .setValue(
					accounting.formatMoney((6 / 100) * rec[0].get("harga_netto"))
				  );
				// end

				me.fillUnitDataToForm(rec[0]);
				me.fillMasterCustomerData(rec[0], "customer");

				//// add by erwin.st 08092021
				if(me.getFormdata().up('window').state == 'create'){
					/// Replace VA BCA
					me.getFormdata().down("[name=va_no_bca]").setValue('');
					if(me.vabca_active == 1 && me.vabca_digit_payment != '' && rec[0].get('va_no_bca') != ''){
						var start_index  = me.vabca_start_index_digit;
						var replace_data = me.vabca_digit_payment;
						var va_no_bca    = me.strSplice(rec[0].get('va_no_bca'), start_index, (start_index + (replace_data.length-1)), replace_data);

						me.getFormdata().down("[name=va_no_bca]").setValue(va_no_bca);
					}

					/// Replace VA MANDIRI
					me.getFormdata().down("[name=va_no]").setValue('');
					if(me.vamandiri_active == 1 && me.vamandiri_digit_payment != '' && rec[0].get('va_no_mandiri') != ''){
						var start_index   = me.vamandiri_start_index_digit;
						var replace_data  = me.vamandiri_digit_payment;
						var va_no_mandiri = me.strSplice(rec[0].get('va_no_mandiri'), start_index, (start_index + (replace_data.length-1)), replace_data);

						me.getFormdata().down("[name=va_no]").setValue(va_no_mandiri);
					}
				}

				me.totalBiayaLegalitas();

				////// BBN, BAJB, BPHTB
				var objLib = {
					hrgNetto       : rec[0].get("harga_netto"),
					landSize       : rec[0].get("unit_land_size"),
					landOverSize   : rec[0].get("unit_kelebihan"),
					peruntukanCode : rec[0].get("purpose_code")
				};

				var biaya_ajb   = 0;
				var biaya_bphtb = 0;
				var biaya_bbn   = 0;
				if(objLib.hrgNetto){
					biaya_ajb = window[me.prolibfile].getBiayaBAJB(objLib);
					biaya_ajb = me.roundlib.rounding(me.typeCalculaterounding, biaya_ajb);

					biaya_bphtb = window[me.prolibfile].getBiayaBPHTB(objLib);
					biaya_bphtb = me.roundlib.rounding(me.typeCalculaterounding, biaya_bphtb);

					biaya_bbn = window[me.prolibfile].getBiayaBBNSertifikat(objLib);
					biaya_bbn = me.roundlib.rounding(me.typeCalculaterounding, biaya_bbn);
				}

				me.getFormdata().down('[name=biaya_ajb]').setValue(accounting.formatMoney(biaya_ajb));
				me.getFormdata().down('[name=biaya_bphtb]').setValue(accounting.formatMoney(biaya_bphtb));
				me.getFormdata().down('[name=biaya_bbn]').setValue(accounting.formatMoney(biaya_bbn));
			},
		});
	},
	fillUnitDataToForm: function (data) {
		var me = this;
		var filledFields = [
			"productcategory",
			"type_name",
			"land_size",
			"long",
			"building_size",
			"width",
			"kelebihan",
			"floor",
			"block_id",
			"cluster_id",
			"unit_number",
			"pt_name",
		];

		for (var x in filledFields) {
			if (me.getFormdata().down("[name=unit_" + filledFields[x] + "]") != null) {
				me.getFormdata()
					.down("[name =unit_" + filledFields[x] + "]")
					.setValue(data.data["unit_" + filledFields[x]]);
			}
		}

		me.getFormdata().down("[name=code]").setValue(data.data["cluster_code"]);
		me.getFormdata()
			.down("[name =block_code]")
			.setValue(data.data["block_code"]);
	},
	fillMasterCustomerData: function (records, prefix) {
		var pr = typeof prefix === "undefined" ? "customer" : prefix;
		var me = this;
		var filledFields = [
			"name",
			"ktp",
			"npwp",
			"mobilephone",
			"email",
			"homephone",
			"address",
			"officephone",
			"city",
		];

		for (var x in filledFields) {
			if (me.getFormdata().down("[name=" + pr + "_" + filledFields[x] + "]") != null) {
				me.getFormdata()
					.down("[name =" + pr + "_" + filledFields[x] + "]")
					.setValue(records.data[pr + "_" + filledFields[x]]);
			}
		}
	},
	totalAddBiayaLegalitas : function(){
		var me       = this;
		var formdata = me.getFormdata();

		var total = 0;
		if(formdata.down("[name=is_use_biaya_ajb]").getValue()){
			total = total + accounting.unformat(formdata.down("[name=biaya_ajb]").getValue());
		}
		if(formdata.down("[name=is_use_biaya_bphtb]").getValue()){
			total = total + accounting.unformat(formdata.down("[name=biaya_bphtb]").getValue());
		}
		if(formdata.down("[name=is_use_biaya_bbn]").getValue()){
			total = total + accounting.unformat(formdata.down("[name=biaya_bbn]").getValue());
		}
		return total;
	},
	/// add by erwin 08102020
	totalBiayaLegalitas : function(){
		var me = this;
		var formdata    = me.getFormdata();
		var persentase  = 0;
		var total_biaya = 0;
		var notes       = new Array();

		formdata.down("[name=persentase]").setReadOnly(false);
		formdata.down("[name=biayalegalitas_total]").setReadOnly(false);

		inputElements = formdata.down('#jenisBiaya').items.items;
		for(var i=0; inputElements[i]; ++i){
			if(inputElements[i].checked){
				notes.push(inputElements[i].boxLabel);
				if(typeof inputElements[i].persentase != 'undefined'){
					persentase  = inputElements[i].persentase;
					total_biaya = (persentase/100) * accounting.unformat(formdata.down("[name=harga_netto]").getValue());
					formdata.down("[name=biayalegalitas_total]").setReadOnly(true);
				}
				else if(typeof inputElements[i].amount != 'undefined'){
					total_biaya = total_biaya + inputElements[i].amount;
					formdata.down("[name=persentase]").setReadOnly(true);
				}
				else if(typeof inputElements[i].amount == 'undefined' && typeof inputElements[i].persentase == 'undefined'){
					formdata.down("[name=persentase]").setReadOnly(true);
				}
			}
		}

		total_biaya = total_biaya + me.totalAddBiayaLegalitas();

		// if(formdata.down("[itemId=jenis_biaya_1]").getValue()){
		// 	var harga_netto = accounting.unformat(formdata.down("[name=harga_netto]").getValue());
		// 	persentase = 6;
		// 	total_biaya = (persentase/100) * harga_netto;
		// 	notes.push(formdata.down("[itemId=jenis_biaya_1]").boxLabel);
		// }

		// if(formdata.down("[itemId=jenis_biaya_2]").getValue()){
		// 	total_biaya = total_biaya + 2000000;
		// 	notes.push(formdata.down("[itemId=jenis_biaya_2]").boxLabel);
		// }

		// if(formdata.down("[itemId=jenis_biaya_3]").getValue()){
		// 	total_biaya = total_biaya + 2500000;
		// 	notes.push(formdata.down("[itemId=jenis_biaya_3]").boxLabel);
		// }

		// if(formdata.down("[itemId=jenis_biaya_4]").getValue()){
		// 	total_biaya = total_biaya + 3000000;
		// 	notes.push(formdata.down("[itemId=jenis_biaya_4]").boxLabel);
		// }

		notes = notes.join(', ');

		formdata.down("[name=persentase]").setValue(persentase);
		formdata.down("[name=biayalegalitas_total]").setValue(accounting.formatMoney(total_biaya));
		formdata.down("[itemId=notes]").setValue(notes);

		me.calculatetermin();
	},
	//add by anas 09022021
	getRemainingBalance:function(){
		var me = this;
		var formdata    = me.getFormdata();
		//get amount total biaya
		var total_biaya = accounting.unformat(formdata.down("[name=biayalegalitas_total]").getValue());

		var detailgridStore = me.getDetailgrid().getStore();
		detailgridStore.clearFilter(true);

		var data_detail = [];
		var total_amount = 0;
		var total_row =1;

		if(detailgridStore.getCount() > 1)
			total_row = detailgridStore.getCount() - 1;

		for (var i = 0; i < total_row; i++) {
		  detailgridStore.each(function (record, idx) {
			if (i == idx) {
			  //sum total amount in grid without last row amount
			  total_amount = total_amount + record.data.amount;
			}
		  });
		}

		var remaining = parseFloat(total_biaya)-parseFloat(total_amount);
		if(remaining < 0)
			remaining = 0;

		return remaining+"|"+detailgridStore.getCount();
	},
	dataPrint : function () {
		var me = this;
		var grid = me.getGrid().getSelectionModel().getSelection();
		var biayalegalitas_id = grid[0].data.biayalegalitas_id;

		me.printOut(me, biayalegalitas_id, 'PRINTOUT_BIAYA_LEGALITAS_DOC', 'erems/biayalegalitas/printout');
	},
	printOut: function (me, id, parametername, urlAdd) {
		//var me = this;
		var id = id;

		var globalparameterStore = me.getMasterparameterglobalStore();
		globalparameterStore.removeAll();
		globalparameterStore.load({ params: { parametername: parametername } });

		var combo = Ext.create('Ext.form.field.ComboBox', {
			editable     : false,
			queryMode    : 'local',
			valueField   : 'value',
			displayField : 'value',
			width        : '100%',
			store        : globalparameterStore
		});

		Ext.create('Ext.window.Window', {
			title   : 'Select Printout Document',
			height  : 100,
			width   : 400,
			layout  : 'hbox',
			padding : '10px 10px 10px 10px',
			modal   : true,
			items   : {  // Let's put an empty grid in just to illustrate fit layout
				xtype : combo,
				name  : 'printout_cb'
			},
			dockedItems: [
				{
					xtype  : 'toolbar',
					dock   : 'bottom',
					ui     : 'footer',
					layout : { type : 'hbox' },
					items  : [
						{
							xtype   : 'button',
							action  : 'processprintout',
							padding : 5,
							width   : 75,
							iconCls : 'icon-save',
							text    : 'Process',
							handler : function () {
								var win = this.up('window');

								var printout_cb = this.up('window').items.items[0].value;
								if (!printout_cb) {
									Ext.Msg.show({
										title   : 'Alert',
										msg     : 'Please Select Printout Document First',
										icon    : Ext.Msg.WARNING,
										buttons : Ext.Msg.OK
									});
									return false;
								}

								win.body.mask('Creating Document, Please Wait...');

								Ext.Ajax.request({
									url    : urlAdd,
									params : {
										id            : id,
										document_name : printout_cb
									},
									success: function (response) {
										try {
											var resp = response.responseText;
											if (resp) {
												var info = Ext.JSON.decode(resp);

												if (info.success == true) {
													var url = info.url;
													var plwa = '';
													if (me.getPurcheletterSendWaActive == 1) {
														plwa = '<br><br><br><a href="https://api.whatsapp.com/send?phone=' + me.getPurcheletterSendWaPhone + '&text=' + me.getPurcheletterSendWaText + ' ' + window.location.href + url + '" target="blank">Send To WA</a>';
													}
													//end added by anas 08092021

													win.body.unmask();
													Ext.Msg.show({
														title      : 'Info',
														msg        : '<a href="' + info.url + '" target="blank">Click Here For Download Document</a>' + plwa,
														icon       : Ext.Msg.INFO,
														buttons    : Ext.Msg.CANCEL,
														buttonText : { cancel : 'Close' }
													});
												} else {
													win.body.unmask();
													Ext.Msg.show({
														title   : 'Failure',
														msg     : 'Error: Create Document Failed.',
														icon    : Ext.Msg.ERROR,
														buttons : Ext.Msg.OK
													});
												}
											}
										} catch (e) {
											win.body.unmask();
											Ext.Msg.show({
												title   : 'Failure',
												msg     : 'Error: Create Document Failed.',
												icon    : Ext.Msg.ERROR,
												buttons : Ext.Msg.OK
											});
										}
									},
									failure: function (e) {
										win.body.unmask();
										Ext.Msg.show({
											title   : 'Failure',
											msg     : 'Error: Create Document Failed.',
											icon    : Ext.Msg.ERROR,
											buttons : Ext.Msg.OK
										});
									}
								});
							}
						},
						{
							xtype   : 'button',
							action  : 'cancel',
							itemId  : 'btnCancel',
							padding : 5,
							width   : 75,
							iconCls : 'icon-cancel',
							text    : 'Cancel',
							handler : function () {
								this.up('window').close();
							}
						}
					]
				}
			]
		}).show();
	},
});