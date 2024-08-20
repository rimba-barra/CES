Ext.define("Erems.controller.Schedulebiayalainlain", {
	extend   : "Erems.library.template.controller.Controller",
	requires : [
		'Erems.library.DetailtoolAll', 
		'Erems.library.ModuleTools',
		'Erems.library.template.component.Paymenttypeallcombobox',
		'Erems.library.template.component.Clustercombobox',
		'Erems.library.template.component.Blockcombobox',
		'Erems.library.template.component.Paymentflagcombobox',
		'Erems.view.schedulebiayalainlain.GridDetail'
	],
	alias    : "controller.Schedulebiayalainlain",
	views    : [
		"schedulebiayalainlain.Panel",
		"schedulebiayalainlain.Grid",
		"schedulebiayalainlain.FormSearch",
		"schedulebiayalainlain.FormData",
		"schedulebiayalainlain.GridDetail",
	],
	stores : [
		"Schedulebiayalainlain",
		"Masterparameterglobal",
		"Unitschedulebll",
		"Customerschedulebll",
		"Schedulebiayalainlaindetail",
		"Paymenttypeall",
		'Mastercluster', 
		'Masterblock',
		'Masterpaymentflag'
	],
	models      : ["Schedulebiayalainlain", "Purchaseletter", 'Masterblock'],
	detailTool  : null,
	detailTool2 : null,
	refs        : [
		{
			ref      : "panel",
			selector : "schedulebiayalainlainpanel",
		},
		{
			ref      : "grid",
			selector : "schedulebiayalainlaingrid",
		},
		{
			ref      : "formsearch",
			selector : "schedulebiayalainlainformsearch",
		},
		{
			ref      : "formdata",
			selector : "schedulebiayalainlainformdata",
		},
		{
			ref      : "detailgrid",
			selector : "schedulebiayalainlaingriddetail",
		},
	],
	controllerName                         : "schedulebiayalainlain",
	bindPrefixName                         : "Schedulebiayalainlain",
	formWidth                              : 800,
	ctrler                                 : "", //for get controller on browse item
	spcreq                                 : "", //for get param_spcreq on browse item
	mnuname                                : "",
	sprIndex                               : 0,
	storeOld                               : null,
	vabca_active                           : 0,
	vabca_digit_payment                    : '05',
	vabca_start_index_digit_payment        : 5,
	vabca_start_index_digit_payment_id     : 7,
	vamandiri_active                       : 0,
	vamandiri_digit_payment                : '05',
	vamandiri_start_index_digit_payment    : 5,
	vamandiri_start_index_digit_payment_id : 7,
	max_digit_paymentid                    : 3,
	round                                  : 1,
	init                                   : function (application) {
		var me = this;
        me.tools = new Erems.library.box.tools.Tools({config: me.myConfig});
		this.control({
			"schedulebiayalainlainpanel": {
				beforerender : me.mainPanelBeforeRender,
				afterrender  : this.panelAfterRender,
			},
			"schedulebiayalainlaingrid": {
				afterrender     : this.gridAfterRender,
				itemdblclick    : this.gridItemDblClick,
				itemcontextmenu : this.gridItemContextMenu,
				selectionchange : this.gridSelectionChange,
			},
			"schedulebiayalainlaingrid toolbar button[action=create]": {
				click : function () {
					this.formDataShow("create");
				},
			},
			"schedulebiayalainlaingrid toolbar button[action=update]": {
				click : function () {
					this.formDataShow("update");
				},
			},
			"schedulebiayalainlaingrid toolbar button[action=destroy]": {
				click : this.dataDestroy,
			},
			"schedulebiayalainlaingrid actioncolumn": {
				afterrender : this.gridActionColumnAfterRender,
				click       : this.gridActionColumnClick,
			},
			"schedulebiayalainlainformsearch": {
				afterrender : this.formSearchAfterRender,
			},
			"schedulebiayalainlainformsearch button[action=search]": {
				click : this.dataSearch,
			},
			"schedulebiayalainlainformsearch button[action=reset]": {
				click : this.dataReset,
			},
			"schedulebiayalainlainformdata": {
				afterrender : this.formDataAfterRender,
			},
			"schedulebiayalainlainformdata button[action=save]": {
				click : this.dataSave,
			},
			"schedulebiayalainlainformdata button[action=cancel]": {
				click : this.formDataClose,
			},
			"schedulebiayalainlainformdata [name=biayalainlain_time]": {
				keyup : me.calculatetermin,
			},
			"schedulebiayalainlainformdata [name=biayalainlain_total]": {
				keyup : me.calculatetermin,
			},
			"schedulebiayalainlainformdata button[action=generate]": {
				click : function () {
					me.generate();
				},
			},
			"schedulebiayalainlainformdata button[action=regenerate_va]": {
				click : function () {
					me.regenerate_va();
				},
			},
			"schedulebiayalainlainformdata button[action=create_new_customer]": {
				click : function () {
					me.addCustomer();
				},
			},
			"schedulebiayalainlaingriddetail": {
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
			'schedulebiayalainlainformdata [name=paymentflag_id]': {
				select : function(el, val) {
					me.paymentflagOnSelect(el, val);
				}
			},
			'schedulebiayalainlainformdata [name=paymenttype_paymenttype_id]': { ///// add by erwin.st 16112021
				select : function(el, val) {
					me.generateVapaymenttype();
				}
			},
			/* BROWSE UNIT CONTROL */			
			"schedulebiayalainlainformdata button[action=browse_unit]": {
				click : me.selectUnitGridShow,
			},
			"schedulebiayalainlainbrowsepanel": {
				beforerender : me.browsepanelBeforeRender,
			},
			"schedulebiayalainlainbrowsepanel button[action=select]": {
				click : me.browsegridSelection,
			},
			"schedulebiayalainlainbrowsegrid": {
				afterrender : me.browsegridAfterRender,
			},
			"schedulebiayalainlainbrowseformsearch": {
				afterrender : me.browseformSearchAfterRender,
			},
			"schedulebiayalainlainbrowseformsearch button[action=search]": {
				click : me.browsedataSearch,
			},
			"schedulebiayalainlainbrowseformsearch button[action=reset]": {
				click : me.browsedataReset,
			},
			/* END BROWSE CONTROL */
			/* BROWSE CUSTOMER CONTROL */
			"schedulebiayalainlainformdata button[action=browse_customer]": {
				click : me.selectCustomerGridShow,
			},
			"schedulebiayalainlainbrowsecustomerpanel": {
				beforerender : me.browsecustomerpanelBeforeRender,
			},
			"schedulebiayalainlainbrowsecustomerpanel button[action=select]": {
				click : me.browsecustomergridSelection,
			},
			"schedulebiayalainlainbrowsecustomergrid": {
				afterrender : me.browsecustomergridAfterRender,
			},
			"schedulebiayalainlainbrowsecustomerformsearch": {
				afterrender : me.browsecustomerformSearchAfterRender,
			},
			"schedulebiayalainlainbrowsecustomerformsearch button[action=search]": {
				click : me.browsecustomerdataSearch,
			},
			"schedulebiayalainlainbrowsecustomerformsearch button[action=reset]": {
				click : me.browsecustomerdataReset,
			},
			/* END BROWSE CONTROL */			
		});
	},
	gridDetailAfterRender : function () {
		var me = this;
		me.getDetailgrid().getStore().removeAll();

		me.getDetailgrid().on('edit', function (editor, e) {
			// commit the changes right after editing finished
			var rec = e.record;

			if(editor.context.field == 'amount'){
				rec.set("remaining_balance", rec.get('amount'));

				var total_biaya = accounting.unformat(me.getFormdata().down("[name=biayalainlain_total]").getValue());
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

		var bll_total = accounting.unformat(formdata.down("[name=biayalainlain_total]").getValue());
		var termin    = accounting.unformat(formdata.down("[name=biayalainlain_time]").getValue());
		var total     = me.amountSchedule({ amount : bll_total, termin : termin, round : me.round });

		formdata.down("[name=biayalainlain_value]").setValue(accounting.formatMoney(total));
	},
	getFinalData : function (formGetValues) {
		var finalData = formGetValues;
		return finalData;
	},
	dataSave : function () {
		var me           = this;
		var form         = me.getFormdata().getForm();
		var addingRecord = false;

		if(!me.finalValidation()) {
			return false;
		}
		else if(form.isValid()) {
			var formdata    = this.getFormdata();
			var paymentflag_id       = formdata.down("[name=paymentflag_id]").getValue();			
			var customer_customer_id = formdata.down("[name=customer_customer_id]").getValue();
			var unit_id              = formdata.down("[name=unit_unit_id]").getValue();
			var countdetail          = me.getDetailgrid().getStore().getCount();

			if (paymentflag_id == 2 && unit_id == "") {
				Ext.Msg.show({
					title   : "Failure",
					msg     : "Error: Unit belum dipilih.",
					icon    : Ext.Msg.WARNING,
					buttons : Ext.Msg.OK,
				});
			} 
			else if (paymentflag_id == 3 && customer_customer_id == "") {
				Ext.Msg.show({
					title   : "Failure",
					msg     : "Error: Customer belum dipilih.",
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

				//detail   Biayalainlaindetail
				var detailgridStore = me.getDetailgrid().getStore();
				detailgridStore.clearFilter(true);
				var data_detail = [];
				var total_amount_grid = 0;
				var bool_amount_minus = false;
				for (var i = 0; i < detailgridStore.getCount(); i++) {
					detailgridStore.each(function (record, idx) {
						if (i == idx) {
							data_detail[i] = record.data;
							total_amount_grid += record.data.amount;
							if(record.data.amount <= 0){ 
								bool_amount_minus = true;
							}
						}
					});
				}
				fida["details_data"] = data_detail;

				var msg = function () {
					me.getFormdata().up("window").body.mask("Saving data, please wait ...");
				};

				console.log(accounting.formatMoney(total_amount_grid))
				console.log(formdata.down("[name=biayalainlain_total]").getValue())
		
				// if(total_amount_grid != accounting.unformat(formdata.down("[name=biayalainlain_total]").getValue())){
				//updated by anas 05112021
				if(accounting.formatMoney(total_amount_grid) != formdata.down("[name=biayalainlain_total]").getValue()){
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
	dataDestroy: function() {
		var me   = this;
		var rows = me.getGrid().getSelectionModel().getSelection();
		if (rows.length < 1) {
			Ext.Msg.alert('Info', 'No record selected !');
			return;
		} 
		else {
			var confirmmsg, successmsg, failmsg;
			var recordcounttext = rows.length + ' record' + (rows.length > 1 ? 's' : '');
			var store = me.getGrid().getStore();

			var deleteName = rows[0].get('unit_number') == "" ? 
				"customer [ " + rows[0].get('customer_name') + " ] " : "unit [ " +rows[0].get('unit_number') + " ] ";

			if (rows.length == 1) {
				// var selectedRecord = '[' + store.getAt(store.indexOf(rows[0])).get(me.fieldName) + ']';
				var selectedRecord = deleteName;
				confirmmsg = 'Delete ' + selectedRecord + ' ?';
				failmsg = 'Error: Unable to delete ' + selectedRecord + '.';
			} 
			else {
				confirmmsg = 'This action will delete ' + recordcounttext + '.<br />Continue ?';
				failmsg = 'Error: Unable to delete data.';
			}

			Ext.Msg.confirm('Delete Data', confirmmsg, function(btn) {
				if (btn == 'yes') {
					resetTimer();
					var msg = function() {
						me.getGrid().up('window').mask('Deleting data, please wait ...');
					};
					for (var i = 0; i < rows.length; i++) {

						store.remove(rows[i]);
					}

					store.on('beforesync', msg);
					store.sync({
						success: function(s) {
							me.getGrid().up('window').unmask();

							var successcount = parseInt(Ext.decode(s.operations[0].response.responseText).total, 10);
							var successmsg   = (rows.length == 1 ? selectedRecord : (successcount != rows.length ? successcount + ' of ' : '') + recordcounttext) + ' deleted successfully.';
							
							store.un('beforesync', msg);
							store.reload();
							if (typeof Ext.StoreManager.lookup(me.stores[0]) != 'undefined') {
								Ext.StoreManager.lookup(me.stores[0]).load({params: {limit: 0}});
							}
							Ext.Msg.show({
								title   : 'Success',
								msg     : successmsg,
								icon    : Ext.Msg.INFO,
								buttons : Ext.Msg.OK
							});
						},
						failure: function() {
							me.getGrid().up('window').unmask();
							store.un('beforesync', msg);
							store.reload();
							Ext.Msg.show({
								title   : 'Failure',
								msg     : failmsg + ' The data may have been used.',
								icon    : Ext.Msg.ERROR,
								buttons : Ext.Msg.OK
							});
						}
					});
				}
			});
		}
	},
	generate: function () {
		var me       = this;
		var gd       = me.getDetailgrid();
		var p        = me.getPanel();
		var s        = gd.getStore();
		var formdata = me.getFormdata();

		var my_date = new Date();

		var termin = formdata.down("[name=biayalainlain_time]").getValue();
		termin     = termin ? accounting.unformat(termin) : 0;
		
		var biayalainlain_total = formdata.down("[name=biayalainlain_total]").getValue();
		biayalainlain_total     = biayalainlain_total ? accounting.unformat(biayalainlain_total) : 0;

		var biaya_value      = me.amountSchedule({ amount : biayalainlain_total, termin : termin, round : me.round });
		var lastrecord_value = biayalainlain_total-((biaya_value)*termin)+biaya_value;


		if(biayalainlain_total <= 0){
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
							scheduletype      : "BLL",
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

					if(biayalainlain_total <= nilaiSisa){
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
						terminUnPaid        = termin-terminPaidLength;
						biayalainlain_total = biayalainlain_total-amountUnPaid;
						biaya_value         = parseFloat(biayalainlain_total/terminUnPaid);


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
								scheduletype      : "BLL",
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
								scheduletype      : "BLL",
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
	},
	panelAfterRender : function () {
		var me = this;

		$.ajax({
			method : "POST",
			url    : "erems/schedulebiayalainlain/read/",
			data   : { mode_read: "config" }
		}).done(function (msg) {
			me.vabca_active                           = msg.vabca_active;
			me.vabca_digit_payment                    = msg.vabca_digit_payment;
			me.vabca_start_index_digit_payment        = msg.vabca_start_index_digit_payment;
			me.vabca_start_index_digit_payment_id     = msg.vabca_start_index_digit_payment_id;
			me.vamandiri_active                       = msg.vamandiri_active;
			me.vamandiri_digit_payment                = msg.vamandiri_digit_payment;
			me.vamandiri_start_index_digit_payment    = msg.vamandiri_start_index_digit_payment;
			me.vamandiri_start_index_digit_payment_id = msg.vamandiri_start_index_digit_payment_id;
			me.round                                  = msg.round;
		});
	},
	formSearchAfterRender : function(el){
		var me = this;
		console.log('load combobox');
        try {
            var itemForms = el.getForm().getFields().items;
            for (var x in itemForms) {
                /// make sure this component is combobox
                if (itemForms[x].getXTypes().indexOf("combobox") > -1) {
            		var store = itemForms[x].getStore();
                    if (store.storeId != "ext-empty-store") {
                		store.proxy.extraParams = { start:0, limit:0};

                    	if(itemForms[x].name == 'paymentflag_id'){
                    		store.load({
					            callback: function (records, operation, success) {
					            	me.setComboboxpaymentflag(records, me.getFormsearch());
					            }
						    });
                    	}
                    	else{
                        	store.load();
                    	}
                    }
                }

            }
        } catch (err) {
            console.log(err);
        }
	},
	setComboboxpaymentflag : function(rec, form){
		var me        = this;
		var dataStore = rec;
		var storeTemp = [];

        for(var i in dataStore){
        	if(dataStore[i].get('paymentflag_id') == 2 || dataStore[i].get('paymentflag_id') == 3){
        		storeTemp.push(dataStore[i].data);
        	}
        }
        var newStore = Ext.create('Ext.data.Store', {
            fields : ['paymentflag_id', 'paymentflag'],
            data   : storeTemp
        });
        form.down('[name=paymentflag_id]').bindStore(newStore);
	},
	fdar : function () {
		var me = this;
		var x  = {
			init: function () {
				var storePaymentflag = me.getFormsearch().down('[name=paymentflag_id]').getStore();
				var recPaymentflag = storePaymentflag.data.items;
				me.setComboboxpaymentflag(recPaymentflag, me.getFormdata());
			},
			create: function () {
				me.paymentflagOnSelect(null, null);
			},
			update: function () {
				var grid   = me.getGrid();
				var store  = grid.getStore();
				var record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));

				me.getFormdata().loadRecord(record);
				me.getFormdata().down("#cb_paymentflag_id").setDisabled(true);
				me.getFormdata().down("#fd_browse_unit_btn").setDisabled(true);
				me.getFormdata().down("#fd_browse_customer_btn").setDisabled(true);			

				///// add by erwin.st 16112021
				/// jika ada va yg kosong tombol regenerate di tampilkan
				if(me.getFormdata().down("[name=va_no]").getValue() == '' || me.getFormdata().down("[name=va_no_bca]").getValue() == ''){ 
					me.getFormdata().down("[action=regenerate_va]").setVisible(true);
				}	

				var p  = me.getPanel();
				var gd = me.getDetailgrid();
				var s  = gd.getStore();

				var termin      = me.getFormdata().down("[name=biayalainlain_time]").getValue();
				var biaya_value = me.getFormdata().down("[name=biayalainlain_value]").getValue();

				gd.getStore().load({
					params: {
						mode_read         : "detail_biayalainlain",
						biayalainlain_id : record.data.biayalainlain_id,
					},
					callback: function (rec, op) {

						var info      = Ext.JSON.decode(op.response.responseText);
						var main_data = info.main_data[0];

						me.paymentflagOnSelect(null, null);

						if(main_data.unit_id > 0){
							var unitSchStore = me.getUnitschedulebllStore();
							unitSchStore.load({
								params : {
									mode_read   : "unit_bll",
									unit_id     : main_data.unit_id,
									unit_number : main_data.unit_number,				
									page        : 1
								},
								callback: function (rec) {
									me.fillUnitDataToForm(rec[0]);									
								},
							});
						}
						else{
							var custSchStore = me.getCustomerschedulebllStore();
							custSchStore.load({
								params : {
									mode_read   : "customer_bll",
									customer_id : main_data.customer_id,				
									page        : 1
								},
								callback: function (rec) {
									me.fillMasterCustomerData(rec[0], "customer");									
								},
							});
						}

						var termin      = main_data.biayalainlain_time;
						var biaya_value = main_data.biayalainlain_value;
						var biaya_total = main_data.biayalainlain_total;

						me.getFormdata().down("[name=paymentflag_id]").setValue(main_data.paymentflag_id);
						me.getFormdata().down("[name=paymenttype_paymenttype_id]").setValue(main_data.paymenttype_id);
						me.getFormdata().down("[name=va_no]").setValue(main_data.va_no);
						me.getFormdata().down("[name=va_no_bca]").setValue(main_data.va_no_bca);

						me.getFormdata().down("[name=biayalainlain_total]").setValue(accounting.formatMoney(biaya_total));
						me.getFormdata().down("[name=biayalainlain_time]").setValue(termin);
						me.getFormdata().down("[name=biayalainlain_value]").setValue(accounting.formatMoney(biaya_value));
						me.getFormdata().down("[name=notes]").setValue(main_data.notes);

						s.loadData([], false);

						var amount_terbayar = 0;

						for (var i = 0; i < rec.length; i++) {
							var data = rec[i].data;
							s.add({
								due_date          : data.due_date,
								termin            : data.termin,
								scheduletype      : "BLL",
								amount            : data.amount,
								remaining_balance : data.remaining_balance,
							});

							if(data.amount != data.remaining_balance){
								amount_terbayar += data.amount-data.remaining_balance;
							}
						}
						me.storeOld = rec;

						//// add by erwin.st 22112021
						//// Jika sudah ada amount yg terbayar
						if(amount_terbayar > 0){
							me.getFormdata().down("[name=paymenttype_paymenttype_id]").setReadOnly(true);
							if(main_data.va_no != ''){
								me.getFormdata().down("[name=va_no]").setReadOnly(true);
							}
							if(main_data.va_no_bca != ''){
								me.getFormdata().down("[name=va_no_bca]").setReadOnly(true);
							}
						}
					},
				});
			},
		};
		return x;
	},
	//================= BROWSE UNIT & CUSTOMER PANEL ================================
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
	//================= BROWSE UNIT PANEL ================================
	selectUnitGridShow: function () {
		var me    = this;
		me.ctrler = "schedulebiayalainlain";
		me.instantWindow(
			"browse.Panel",
			700,
			"Browse Item",
			"read",
			"myBrowseItemPanel"
		);
	},
	browsepanelBeforeRender: function (el, a, b) {
		var me = this;

		var gridView = Ext.create("Erems.view.schedulebiayalainlain.browse.Grid", {
			region : "center",
		});
		var searchView = Ext.create("Erems.view.schedulebiayalainlain.browse.FormSearch", {
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
	browsegridSelection : function (el) {
		var me        = this;
		var unitGrid  = el.up("grid");
		var unitStore = el.up("grid").getStore();
		var rows      = unitGrid.getSelectionModel().getSelection();
		if (rows.length == 1) {
			el.up("window").destroy();
			me.processRowFromItemSelection(rows, "unit");
		} else {
			Ext.Msg.alert("Info", "Require 1 unit!");
			return;
		}
	},
	browseformSearchAfterRender : function (el) {
		var me = this;
	},
	browsedataSearch : function (el) {
		resetTimer();
		var me = this;

		var form  = el.up("form");
		var store = el.up("panel").up("panel").down("grid").getStore();

		var fields = form.getValues();
		for (var x in fields) {
		  store.getProxy().setExtraParam(x, fields[x]);
		}
		store.loadPage(1);
	},
	browsedataReset : function (el) {
		var me   = this;
		var form = el.up("form");
		form.getForm().reset();

		me.browsedataSearch(
		  el.up("panel").up("panel").down("button[action=search]")
		);
	},
	//===================== END BROWSE UNIT PANEL ===============================
	//================= BROWSE CUSTOMER PANEL ================================
	selectCustomerGridShow: function () {
		var me    = this;
		me.ctrler = "schedulebiayalainlain";
		me.instantWindow(
			"browsecustomer.Panel",
			800,
			"Browse Customer",
			"read",
			"myBrowseCustomerPanel"
		);
	},
	browsecustomerpanelBeforeRender: function (el, a, b) {
		var me = this;

		var gridView = Ext.create("Erems.view.schedulebiayalainlain.browsecustomer.Grid", {
			region : "center",
		});
		var searchView = Ext.create("Erems.view.schedulebiayalainlain.browsecustomer.FormSearch", {
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
	browsecustomergridSelection: function (el) {
		var me        = this;
		var custGrid  = el.up("grid");
		var custStore = el.up("grid").getStore();
		var rows      = custGrid.getSelectionModel().getSelection();

		if (rows.length == 1) {
			el.up("window").destroy();
			me.processRowFromItemSelection(rows, "customer");
		} else {
			Ext.Msg.alert("Info", "Require 1 customer!");
			return;
		}
	},
	browsecustomergridAfterRender : function (el, a, b) {
		var me = this;

		me.browsecustomerdataReset(
			el.up("panel").up("panel").down("button[action=search]")
		);

		resetTimer();
		var store = el.getStore();
		store.removeAll();
		store.loadPage(1);
	},
	browsecustomerformSearchAfterRender : function (el) {
		var me = this;
	},
	browsecustomerdataSearch: function (el) {
		resetTimer();
		var me = this;

		var form  = el.up("form");
		var store = el.up("panel").up("panel").down("grid").getStore();

		var fields = form.getValues();
		for (var x in fields) {
		  store.getProxy().setExtraParam(x, fields[x]);
		}

		store.loadPage(1);
	},
	browsecustomerdataReset: function (el) {
		var me   = this;
		var form = el.up("form");
		form.getForm().reset();

		me.browsecustomerdataSearch(
		  el.up("panel").up("panel").down("button[action=search]")
		);
	},
	//===================== END BROWSE CUSTOMER PANEL ===============================
	processRowFromItemSelection: function (rows, modul) {
		var me = this;

		if(modul == "unit"){
			me.fillUnit(rows);
		}
		else if(modul == "customer"){
			me.fillCustomer(rows);
		}
	},
	fillUnit : function (rows) {
		var me = this;
		var plDetailStore = me.getUnitschedulebllStore();
		plDetailStore.load({
			params : {
				mode_read   : "unit_bll",
				unit_id     : rows[0].get("unit_id"),
				unit_number : rows[0].get("unit_number"),				
				page        : 1
			},
			callback: function (rec) {
				me.fillUnitDataToForm(rec[0]);
			},
		});
	},
	fillUnitDataToForm : function (data) {
		var me = this;		
		for (var x in data.data) {
			var field = me.getFormdata().down("[name=unit_" + x + "]");
			if (field) {
				field.setValue(data.data[x]);
			}
		}

		//// add by erwin.st 16112021
		if(
			me.getFormdata().up('window').state == 'create' && 
			(me.vabca_active == 1 || me.vamandiri_active == 1)
		){
			me.getFormdata().down("[name=va_no_bca]").setValue(data.get('va_no_bca_custom'));
			me.getFormdata().down("[name=va_no]").setValue(data.get('va_no_mandiri_custom'));


			if(me.getFormdata().down("[name=paymenttype_paymenttype_id]").getValue()){
				me.generateVapaymenttype();
			}
			else{
				me.generateVaunit();
			}
		}
	},
	fillCustomer : function (rows) {
		var me = this;

		var plDetailStore = me.getCustomerschedulebllStore();
		plDetailStore.load({
			params : {
				mode_read   : "customer_bll",
				customer_id : rows[0].get("customer_id"),
				page        :1
			},
			callback : function (rec) {
				me.fillMasterCustomerData(rec[0], "customer");
			},
		});
	},
	fillMasterCustomerData : function (records, prefix) {
		var pr = typeof prefix === "undefined" ? "customer" : prefix;
		var me = this;

		for (var x in records.data) {
			var field = me.getFormdata().down("[name=customer_" + x + "]");
			if (field) {
				field.setValue(records.data[x]);
			}
		}
	},
	paymentflagOnSelect: function(el, val) {
		var me  = this;
		var f   = me.getFormdata();
		var luc = f.down("#listUnitContainer");
		var lcc = f.down("#listCustomerContainer");
		var lbc = f.down("#listBiayaContainer");

		var paymenttypeStore = me.getPaymenttypeallStore();
		paymenttypeStore.load({
			params: { mode_read: "paymenttypeall_combo" },
		});

		if (f.down("[name=paymentflag_id]").getValue() == "2") {
			luc.show();
			lcc.hide();
			lbc.show();
		} 
		else if (f.down("[name=paymentflag_id]").getValue() == "3") {            
			lcc.show();
			luc.hide();
			lbc.show();
		}
		else{
			luc.hide();
			lcc.hide();  
			lbc.hide();      	
		}
	},
	///// add by erwin.st 16112021
	generateVaunit : function(){
		var me = this;
		me.generateVa({ start_index_digit : me.vabca_start_index_digit_payment, digit : me.vabca_digit_payment, name_selector : 'va_no_bca' });
		me.generateVa({ start_index_digit : me.vamandiri_start_index_digit_payment, digit : me.vamandiri_digit_payment, name_selector : 'va_no' });
	},
	generateVapaymenttype : function(){
		var me = this;

		if(
			(me.getFormdata().up('window').state == 'create' || me.getFormdata().up('window').state == 'update') && 
			(me.vabca_active == 1 || me.vamandiri_active == 1)
		){
			var id_paymenttype = me.getFormdata().down("[name=paymenttype_paymenttype_id]").getValue();
			if(id_paymenttype.length > me.max_digit_paymentid){
				Ext.Msg.show({
					title   : "Failure",
					msg     : "Error: Tidak dapat mereplace No VA, karena ID payment type lebih dari " + me.max_digit_paymentid + " digit.",
					icon    : Ext.Msg.WARNING,
					buttons : Ext.Msg.OK,
				});
			}
			else{
				me.generateVaunit();

				var num_digit = me.padLeft(id_paymenttype, me.max_digit_paymentid);

				me.generateVa({ start_index_digit : me.vabca_start_index_digit_payment_id, digit : num_digit, name_selector : 'va_no_bca' });
				me.generateVa({ start_index_digit : me.vamandiri_start_index_digit_payment_id, digit : num_digit, name_selector : 'va_no' });
			}
		}
	},
	generateVa : function(obj){
		var me        = this;
		var no        = me.getFormdata().down("[name=" + obj.name_selector + "]").getValue();
		var va_active = obj.name_selector == "va_no_bca" ? me.vabca_active : me.vamandiri_active;

		/// Replace VA
		if(va_active == 1 && obj.digit != '' && no != ''){
			var start_index  = obj.start_index_digit;
			var replace_data = obj.digit;
			var va           = me.strSplice(no, start_index, (start_index + (replace_data.length-1)), replace_data);

			me.getFormdata().down("[name=" + obj.name_selector + "]").setValue(va);
		}
	},
	regenerate_va : function(){
		var me = this;

		var plDetailStore = me.getUnitschedulebllStore();
		plDetailStore.load({
			params : {
				mode_read : "unit_bll",
				unit_id   : me.getFormdata().down('[name=unit_unit_id]').getValue(),
				page      : 1
			},
			callback: function (rec) {
				var id_paymenttype = me.getFormdata().down("[name=paymenttype_paymenttype_id]").getValue();
				var num_digit      = me.padLeft(id_paymenttype, me.max_digit_paymentid);

				if(me.getFormdata().down("[name=va_no_bca]").getValue() == ''){
					me.getFormdata().down("[name=va_no_bca]").setValue(rec[0].get('va_no_bca_custom'));
					me.generateVa({ start_index_digit : me.vabca_start_index_digit_payment, digit : me.vabca_digit_payment, name_selector : 'va_no_bca' });
					me.generateVa({ start_index_digit : me.vabca_start_index_digit_payment_id, digit : num_digit, name_selector : 'va_no_bca' });
				}

				if(me.getFormdata().down("[name=va_no]").getValue() == ''){
					me.getFormdata().down("[name=va_no]").setValue(rec[0].get('va_no_mandiri_custom'));
					me.generateVa({ start_index_digit : me.vamandiri_start_index_digit_payment, digit : me.vamandiri_digit_payment, name_selector : 'va_no' });
					me.generateVa({ start_index_digit : me.vamandiri_start_index_digit_payment_id, digit : num_digit, name_selector : 'va_no' });
				}
			},
		});
	},
	addCustomer : function () {
		var me = this;
        Ext.create('Ext.window.Window', {
          
            title 		: 'New Customer',
			itemId      : 'listNewCustomerContainer',
            width 		: '50%',
            
            padding: '10px 10px 10px 10px',
            modal: true,
                items: [
						{
							padding   : '10px 0 0 0',
							layout    : 'hbox',
							items     : [
								{
									xtype      : 'textfield',
									fieldLabel : 'Customer Name',
									anchor     : '-5',
									name       : 'new_customer_name',
									flex       : 1,
									allowBlank: false,
								},
							],
            				bodyStyle: 'background-color:#dfe9f6;border:0;'
						},
						{
							padding   : '10px 0 0 0',
							layout    : 'hbox',
							items     : [
								{
									xtype      : 'textfield',
									fieldLabel : 'KTP Number',
									anchor     : '-5',
									name       : 'new_customer_KTP_number',
									flex       : 1,
									allowBlank: false,
								}
							],
            				bodyStyle: 'background-color:#dfe9f6;border:0;'
						},
						{
							padding   : '10px 0 0 0',
							layout    : 'hbox',
							items     : [
								{
									xtype      : 'textfield',
									mask       : '##.###.###.#-###.###',
									fieldLabel : 'NPWP',
									anchor     : '-5',
									name       : 'new_customer_NPWP',
									flex       : 1,
								}
							],
            				bodyStyle: 'background-color:#dfe9f6;border:0;'
						},
						{
							padding   : '10px 0 0 0',
							layout    : 'hbox',
							items     : [
								{
									xtype      : 'textareafield',
									fieldLabel : 'Address',
									anchor     : '-5',
									name       : 'new_customer_address',
									flex       : 1,
									allowBlank: false,
								}
							],
            				bodyStyle: 'background-color:#dfe9f6;border:0;'
						},
						{
							padding   : '10px 0 0 0',
							layout    : 'hbox',
							items     : [
								{
									xtype      : 'textfield',
									fieldLabel : 'City',
									anchor     : '-5',
									name       : 'new_customer_city_city_name',
									flex       : 1,
								},
								{ 
									xtype : 'splitter', 
									width : 20 
								},
								{
									xtype      : 'textfield',
									fieldLabel : 'Phone',
									anchor     : '-5',
									name       : 'new_customer_home_phone',
									flex       : 1,
                					maskRe:/[0-9.]/
								}
							],
            				bodyStyle: 'background-color:#dfe9f6;border:0;'
						},

						{
							padding   : '10px 0 0 0',
							layout    : 'hbox',
							items     : [
								{
									xtype      : 'textfield',
									fieldLabel : 'Email',
									anchor     : '-5',
									name       : 'new_customer_email',
									flex       : 1,
								},
								{ 
									xtype : 'splitter', 
									width : 20 
								},
								{
									xtype      : 'textfield',
									fieldLabel : 'Mobile Phone',
									anchor     : '-5',
									allowBlank: false,
									name       : 'new_customer_mobile_phone',
									flex       : 1,
                					maskRe:/[0-9.]/
								}
							],
            				bodyStyle: 'background-color:#dfe9f6;border:0;'
						},
						{
							padding   : '10px 0 0 0',
							layout    : 'hbox',
							items     : [
								{
									xtype      : 'textfield',
									fieldLabel : 'Office Phone',
									anchor     : '-5',
									name       : 'new_customer_office_phone',
									flex       : 1,
                					maskRe:/[0-9.]/
								},
								{ 
									xtype : 'splitter', 
									width : 20 
								},
								{
									xtype      : 'label',
									fieldLabel : '',
									anchor     : '-5',
									flex       : 1,
								}
							],
            				bodyStyle: 'background-color:#dfe9f6;border:0;'
						},	
                ],
                dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    ui: 'footer',
                    layout: {
                        padding: 6,
                        type: 'hbox'
                    },
                    items: [
                    {
                        xtype: 'button',
                        action: 'save_customer',
                        padding: 5,
                        width: 75,
                        iconCls: 'icon-save',
                        text: 'Process',
                        handler: function() {
                        	var win = this.up('window');
                        	var item = win.items;

                        	var customer_name 	= item.items[0].items.items[0].value;
                        	var ktp_number 		= item.items[1].items.items[0].value;
                        	var npwp 			= item.items[2].items.items[0].value;
                        	var alamat 			= item.items[3].items.items[0].value;
                        	var city_name 		= item.items[4].items.items[0].value;
                        	var email 			= item.items[5].items.items[0].value;
                        	var office_phone 	= item.items[6].items.items[0].value;
                        	var phone 			= item.items[4].items.items[2].value;
                        	var mobile_phone 	= item.items[5].items.items[2].value;

                        	if(customer_name == '' || customer_name == 'undefined' || customer_name == null){
								Ext.Msg.show({
									title   : "Failure",
									msg     : "Error: Customer name harus diisi.",
									icon    : Ext.Msg.WARNING,
									buttons : Ext.Msg.OK,
								});
                        	}else if(ktp_number == '' || ktp_number == 'undefined' || ktp_number == null){
								Ext.Msg.show({
									title   : "Failure",
									msg     : "Error: KTP harus diisi.",
									icon    : Ext.Msg.WARNING,
									buttons : Ext.Msg.OK,
								});
                        	}else if(alamat == '' || alamat == 'undefined' || alamat == null){
								Ext.Msg.show({
									title   : "Failure",
									msg     : "Error: Alamat harus diisi.",
									icon    : Ext.Msg.WARNING,
									buttons : Ext.Msg.OK,
								});
                        	}else if(mobile_phone == '' || mobile_phone == 'undefined' || mobile_phone == null){
								Ext.Msg.show({
									title   : "Failure",
									msg     : "Error: Mobile Phone harus diisi.",
									icon    : Ext.Msg.WARNING,
									buttons : Ext.Msg.OK,
								});
                        	}else{
	                        	var data = {
	                        		"customer_name" : customer_name,
	                        		"ktp_number" 	: ktp_number,
	                        		"npwp" 			: npwp,
	                        		"alamat" 		: alamat,
	                        		"city_name" 	: city_name,
	                        		"email" 		: email,
	                        		"office_phone" 	: office_phone,
	                        		"phone" 		: phone,
	                        		"mobile_phone" 	: mobile_phone
	                        	};

	                            win.body.mask('Processing, Please Wait...');

	                            $.post("erems/schedulebiayalainlain/read/", {data : data, mode_read: 'save_customer'}, function(data) {
									win.body.unmask();

									if(data.success){
										Ext.Msg.show({
											title   : "Success",
											msg     : "Success",
											icon    : Ext.Msg.INFO,
											buttons : Ext.Msg.OK,
											fn: function(){
												win.close();
											}
										});
									}else{
										Ext.Msg.show({
											title   : "Failure",
											msg     : "Error",
											icon    : Ext.Msg.WARNING,
											buttons : Ext.Msg.OK,
										});
									}
								});
                        	}
                       }
                    },
                    {
                        xtype: 'button',
                        action: 'cancel',
                        itemId: 'btnCancel',
                        padding: 5,
                        width: 75,
                        iconCls: 'icon-cancel',
                        text: 'Cancel',
                        handler: function() {
                            this.up('window').close();
                        }
                    }
                ]
            }
            ]
        }).show();
	},
});