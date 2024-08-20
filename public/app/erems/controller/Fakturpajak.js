Ext.define('Erems.controller.Fakturpajak', {
	extend: 'Erems.library.template.controller.Controller',
	requires: ['Erems.library.Browse', 
	'Erems.library.box.Config',
	'Erems.library.box.tools.Tools', 
	'Erems.template.ComboBoxFields',
	'Erems.library.box.tools.EventSelector',
	'Erems.library.ModuleTools'],
	alias: 'controller.Fakturpajak',
	views: ['fakturpajak.Panel', 'fakturpajak.Grid', 'fakturpajak.FormSearch', 'fakturpajak.FormData'],
	stores: ['Fakturpajak','Masterparameterglobal','Masterfakturpajakcounter','Masterpaymentflag','Mastercluster','Masterblock','Masterdata.store.Projectpt'],
	models: ['Fakturpajak','Masterparameterglobal','Masterfakturpajakcounter','Masterpaymentflag','Mastercluster','Masterblock','Masterdata.model.Projectpt'],
	refs: [
	{
		ref: 'grid',
		selector: 'fakturpajakgrid'
	},
	{
		ref: 'formsearch',
		selector: 'fakturpajakformsearch'
	},
	{
		ref: 'formdata',
		selector: 'fakturpajakformdata'
	}
	],
	controllerName: 'fakturpajak',
	fieldName: 'fakturpajak_no',
	bindPrefixName: 'Fakturpajak',
	formWidth: 800,
	countLoadProcess: 0,
	myConfig:null,
	constructor: function(configs) {
		this.callParent(arguments);
		var me = this;
		this.myConfig = new Erems.library.box.Config({
			_controllerName: me.controllerName
		});
	},
	init: function(application) {
		var me = this;
		me.tools = new Erems.library.box.tools.Tools({config: me.myConfig});
		this.control({
			test: me.eventMonthField,
			'fakturpajakpanel': {
				beforerender: me.mainPanelBeforeRender,
				afterrender: this.panelAfterRender

			},
			'fakturpajakgrid': {
				afterrender: this.gridAfterRender,
				itemdblclick: this.gridItemDblClick,
				itemcontextmenu: this.gridItemContextMenu,
				selectionchange: this.gridSelectionChange
			},
            /*'fakturpajakgrid toolbar button[action=create]': {
                click: function() {
                    this.formDataShow('create');
                }
            },
            'fakturpajakgrid toolbar button[action=update]': {
                click: function() {
                    this.formDataShow('update');
                }
            },
			'fakturpajakgrid toolbar button[action=destroy]': {
                click: this.dataDestroy
            },
            'fakturpajakgrid toolbar button[action=print]': {
                click: this.dataPrint
            },*/
			//=== click Generate dan Export Faktur Pajak ====
			'fakturpajakgrid button[action=generateFP]': {
				click: function() {
					this.formDataShow('update');
				}
			},
			'fakturpajakgrid button[action=exportFP]': {
				click: this.dataPrint
			},
			'fakturpajakgrid button[action=exportCSV]': {
				click: function(){
					me.saveCsv();
				},
			},
			//=== end click Generate dan Export Faktur Pajak ====
			'fakturpajakgrid actioncolumn': {
				afterrender: this.gridActionColumnAfterRender,
				click: this.gridActionColumnClick
			},
			'fakturpajakformsearch': {
				afterrender: this.formSearchAfterRender
			},
			'fakturpajakformsearch button[action=search]': {
				click: this.dataSearch
			},
			'fakturpajakformsearch button[action=reset]': {
				click: this.dataReset
			},
			'fakturpajakformdata': {
				afterrender: this.formDataAfterRender
			},
			'fakturpajakformdata button[action=save]': {
				click: this.dataSave
			},
			'fakturpajakformdata button[action=cancel]': {
				click: this.formDataClose
			},
			
			/* formdata keyup function */
			'fakturpajakformdata [name=ppn_persen]': {
				keyup: me.tcb
			},
			'fakturpajakformdata [name=ppnbm_persen]': {
				keyup: me.tcb
			},
			/*'fakturpajakformdata [name=pph22_persen]': {
                keyup: me.tcb
            },*/
            'fakturpajakformdata [name=pt_id]': {
            	change: me.getPTDetail
            },
            'fakturpajakformdata [name=fakturpajak_date]': {
            	select: me.tcbNoFaktur
            },
            'fakturpajakformdata button[action=print]': {
            	click: function() {
            		me.processReport();
            	}
            },
        });
	},
	
	gridSelectionChange: function() {
		var me = this;
		var grid = me.getGrid(), row = grid.getSelectionModel().getSelection();
		grid.down('#btnGenerateFP').setDisabled(row.length != 1);
		grid.down('#btnEdit').setDisabled(row.length != 1);
		grid.down('#btnDelete').setDisabled(row.length < 1);
	},
	
	getPTDetail:function(){
		var me = this;
		var form = me.getFormdata();
		
		Ext.Ajax.request({
			url: 'erems/fakturpajak/ptdetail',
			params: {
				"pt_id" : form.down('[name=pt_id]').getValue(),
				"pt_name" : '',
				"start" : 0,
				"limit" : 0,
			},
			success: function(response) {
				var info = Ext.JSON.decode(response.responseText);
				form.down('[name=pt_address]').setValue(info.data[0].address);
				form.down('[name=pt_npwp]').setValue(info.data[0].npwp);
			}
		});
	},
	
	setNoFakturPajak:function(){
		var me = this;
		var form = me.getFormdata();
		
		var globalparameterStore = me.getMasterparameterglobalStore();
		globalparameterStore.removeAll();
		globalparameterStore.load({params: {parametername: 'NO_FAKTURPAJAK'}, 
			callback:function(rec){
				var fakturpajak_date = form.down('[name=fakturpajak_date]').getValue();
				var fakturpajak_year = fakturpajak_date.getFullYear();
				var fakturpajak_year_2_digit = fakturpajak_year.toString().substr(2,2);
				
				var global = rec[0].get('value');
				
				var fakturpajak_no = global+'.'+fakturpajak_year_2_digit;
				form.down('[name=fakturpajak_no]').setValue(fakturpajak_no);
			}
		});
	},
	
	setCounterNoFakturPajak:function(){
		var me = this;
		var form = me.getFormdata();
		
		var fakturpajak_date = form.down('[name=fakturpajak_date]').getValue();
		var fakturpajak_year = fakturpajak_date.getFullYear();
		
		var fakturpajakcounterStore = me.getMasterfakturpajakcounterStore();
		fakturpajakcounterStore.removeAll();
		fakturpajakcounterStore.load({params: {year: fakturpajak_year}, 
			callback:function(rec2){
				if(fakturpajakcounterStore.count() > 0){
					var counter_default = rec2[0].get('counter');
				} else {
					var counter_default = 0;
				}
				var number = '00000000';
				var counter = (counter_default+1).toString();
				counter_rs = me.replaceAt(number, number.length-counter.length, number.length, counter);
				
				var counter = counter_rs;
				form.down('[name=counter]').setValue(counter);
			}
		});
	},
	
	tcbNoFaktur:function(){
		var me = this;
		var form = me.getFormdata();
		var fakturpajak_id = form.down('[name=fakturpajak_id]').getValue();
		if(fakturpajak_id == 0){
			me.setNoFakturPajak();
			me.setCounterNoFakturPajak();
		}
	},

	tcb:function(){
		var me = this;
		me.dppAmount();
		me.ppnAmount();
		me.ppnbmAmount();
		//me.pph22Amount();
	},

	dppAmount: function(){
		var me 		 = this;
		var form 	 = me.getFormdata();
		var pl_ppn 	 = parseFloat(form.down('[name=ppn_persen]').getValue());
		var pl_ppnbm = parseFloat(form.down('[name=ppnbm_persen]').getValue());
		var payment  = toFloat(form.down('[name=payment]').getValue());
		var jumlah   = 100+pl_ppn+pl_ppnbm;
		var dpp 	 = payment * (100/jumlah);
		//var jumlah = 100+pl_ppn+pl_ppnbm+pl_pph22;
		//var pl_pph22 = parseFloat(form.down('[name=pph22_persen]').getValue());
		
		form.down('[name=dpp]').setValue(me.fmb(dpp));
	},
	
	ppnAmount: function(){
		var me 		= this;
		var form 	= me.getFormdata();
		var pl_ppn 	= parseFloat(form.down('[name=ppn_persen]').getValue());
		var dpp 	= toFloat(form.down('[name=dpp]').getValue());
		var ppn_amount = (pl_ppn/100) * dpp;
		
		form.down('[name=ppn_amount]').setValue(me.fmb(ppn_amount));
	},
	ppnbmAmount: function(){
		var me 			 = this;
		var form 		 = me.getFormdata();
		var pl_ppnbm 	 = parseFloat(form.down('[name=ppnbm_persen]').getValue());
		var dpp 		 = toFloat(form.down('[name=dpp]').getValue());
		var ppnbm_amount = (pl_ppnbm/100) * dpp;
		
		form.down('[name=ppnbm_amount]').setValue(me.fmb(ppnbm_amount));
	},
	/*pph22Amount: function(){
		var me = this;
		var form = me.getFormdata();
		
		var pl_pph22 = parseFloat(form.down('[name=pph22_persen]').getValue());
		
		var dpp = toFloat(form.down('[name=dpp]').getValue());
		
		var pph22_amount = (pl_pph22/100) * dpp;
		
		form.down('[name=pph22_amount]').setValue(me.fmb(pph22_amount));
	},*/
	
	formDataAfterRender: function(el) {
		var me = this;
		me.loadComboBoxStore(el);
		var state = el.up('window').state;
		//city combobox
		var ftStore = null;
		ftStore = el.down('#fd_pt').getStore();
		ftStore.load({params:{start:0,limit:0}});
		
		if (state == 'create') {
            // el.down('#active').setValue(1);
            //me.getFormdata().down('#btnSave').setDisabled(false);
        } else {
        	me.countLoadProcess = 0;
        	me.getFormdata().up('window').body.mask('Loading data, please wait ...');

        	var grid = me.getGrid();
        	var store = grid.getStore();
        	var form = me.getFormdata();

        	var record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));
        	el.loadRecord(record);

        	form.down('[name=payment]').setValue(me.fmb(record.data.payment));
        	form.down('[name=dpp]').setValue(me.fmb(record.data.dpp));
        	form.down('[name=ppn_amount]').setValue(me.fmb(record.data.ppn_amount));
        	form.down('[name=ppnbm_amount]').setValue(me.fmb(record.data.ppnbm_amount));
			//form.down('[name=pph22_amount]').setValue(me.fmb(record.data.pph22_amount));
			
			if(record.data.fakturpajak_id == 0){
				form.down('[name=pt_id]').setValue(parseInt(apps.pt));
				form.down('[name=fakturpajak_date]').setValue(new Date());
				form.down('[name=customer_name]').setValue(record.data.customer_name_default);
				form.down('[name=customer_address]').setValue(record.data.customer_address_default);
				form.down('[name=customer_npwp]').setValue(record.data.customer_npwp_default);
				form.down('[name=notes]').setValue(record.data.payment_note);
				
				var ppn_persen = 0;
				if(record.data.persen_ppntanah_pl > record.data.persen_ppnbangunan_pl){
					ppn_persen = record.data.persen_ppntanah_pl
				} else if(record.data.persen_ppntanah_pl < record.data.persen_ppnbangunan_pl){
					ppn_persen = record.data.persen_ppnbangunan_pl
				} else if(record.data.persen_ppntanah_pl == record.data.persen_ppnbangunan_pl){
					ppn_persen = record.data.persen_ppntanah_pl
				}
				form.down('[name=ppn_persen]').setValue(ppn_persen);
				
				form.down('[name=ppnbm_persen]').setValue(record.data.persen_ppnbm_pl);
				
				me.getPTDetail();
				
				me.tcbNoFaktur();
				
				me.tcb();
				
				/*var globalparameterStore = me.getMasterparameterglobalStore();
				globalparameterStore.removeAll();
				globalparameterStore.load({params: {parametername: 'GLOBAL_PPN_PL'}, 
					callback:function(rec){
						form.down('[name=ppn_persen]').setValue(rec[0].get('value'));
						me.tcb();
					}
				});
				
				globalparameterStore.removeAll();
				globalparameterStore.load({params: {parametername: 'GLOBAL_PPNBM'}, 
					callback:function(rec){
						form.down('[name=ppnbm_persen]').setValue(rec[0].get('value'));
						me.tcb();
					}
				});*/
				
				/*globalparameterStore.removeAll();
				globalparameterStore.load({params: {parametername: 'GLOBAL_PPH22'}, 
					callback:function(rec){
						form.down('[name=pph22_persen]').setValue(rec[0].get('value'));
						me.tcb();
					}
				});*/
			} else {
				form.down('[name=fakturpajak_date]').setReadOnly(true);
				form.down('[name=fakturpajak_no]').setReadOnly(true);
				form.down('[name=counter]').setReadOnly(true);
				me.getFormdata().down('#btnPrint').setDisabled(false);
			}
			
			var globalparameterStore = me.getMasterparameterglobalStore();
			globalparameterStore.removeAll();
			globalparameterStore.load({params: {parametername: 'FAKTURPAJAKNOTE_EDIT'}, 
				callback:function(rec){
					if(rec[0].get('value') == '1'){
						form.down('[name=notes]').setReadOnly(false);
					}
				}
			});
		}
	},
	
	processReport: function() {
		var me = this;
		var winId = 'myReportWindow';
		me.instantWindowReport('Panel', 800, 'Result ', 'state-report', winId, 'masterreport');
		var win = desktop.getWindow(winId);

		if (win) {
			var params = {};
			var reportFile = "Fakturpajak";
			
			var grid = me.getGrid();
			var store = grid.getStore();
			
			var record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));
			// console.log(record.data);
			
			for (var x in record.data) {
				params[x] = record.data[x];
			}
			
			var fakturpajak_date = record.data.fakturpajak_date;
			var fakturpajak_date_display = new Date(fakturpajak_date);
			params["fakturpajak_date"] = ("0"+fakturpajak_date_display.getDate()).slice(-2)+"-"+(("0"+(fakturpajak_date_display.getMonth()+1)).slice(-2))+"-"+fakturpajak_date_display.getFullYear();
			
			//global parameter tanda tangan faktur pajak
			var globalparameterStore = me.getMasterparameterglobalStore();
			globalparameterStore.removeAll();
			globalparameterStore.load({params: {parametername: 'FAKTURPAJAK_SIGNNAME'}, 
				callback:function(rec){
					params["fakturpajak_sign_name"] = rec[0].get('value');
					
					var html = me.generateFakeForm(params, reportFile);
					win.down("#MyReportPanel").body.setHTML(html);
					$("#fakeReportFormID").submit();
				}
			});
		}
	},
	replaceAt: function (str, start, end, what) {
		return str.substring(0, start) + what + str.substring(end);
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
	},
	
	/* report needed */
	panelAfterRender: function(el) {	
		var me = this;
		var grid = me.getGrid();
		var row = grid.getSelectionModel().getSelection();
		Ext.Ajax.request({
			url: 'erems/fakturpajak/read',
			success: function(response) {
			},
		});
        //   me.loadReport(el, 'erems/cashierreport/all');
    },

	// generateFakeForm:function(paramList,reportFile){		
        // var form = '<form id="fakeReportFormID" action=resources/stimulsoft/index.php?stimulsoft_client_key=ViewerFx&stimulsoft_report_key='+reportFile+'.mrt" target="my-iframe" method="post" style="visibility:hidden;height:0;width:0">';
        // for(var x in paramList){
            // if(paramList[x]===null){
                // paramList[x]='';
            // }
            // form +='<input type="hidden" name="'+x+'" value="'+paramList[x]+'">';
        // }
        // form +='<input type="submit" value="post"></form>';
        // form +='<iframe name="my-iframe" style="height:100%;width:100%;"></iframe>';
        // return form;
    // },
    generateFakeForm: function(paramList, reportFile) {
    	var form, x;
    	var form = '<form id="fakeReportFormID" action=' + document.URL + 'resources/stimulsoftjsv3/viewer.php?reportfilelocation=' + reportFile + '.mrt target="my-iframe" method="post" style="visibility:hidden;height:0;width:0">';
    	for (x in paramList) {
    		if (paramList[x] === null) {
    			paramList[x] = '';
    		}
    		form += '<input type="hidden" name="' + x + '" value="' + paramList[x] + '">';
    	}
    	form += '<input type="submit" value="post"></form>';
    	form += '<iframe name="my-iframe" style="height:100%;width:100%;"></iframe>';
    	return form;
    },

    instantWindowReport: function(panel, width, title, state, id, controller) {
    	var me = this;
    	var formtitle, formicon;

    	title = typeof title == 'undefined' ? 'My Window' : title;
    	id = typeof id == 'undefined' ? 'myInstantWindow' : id;
    	state = typeof state == 'undefined' ? 'create' : state;
    	panel = typeof panel == 'undefined' ? 'Panel' : panel;
    	width = typeof width == 'undefined' ? 600 : width;
    	var controllerFolder = typeof controller === 'undefined' ? me.controllerName : controller;
    	formtitle = title;
    	formicon = 'icon-form-add';
    	var winId = id;

    	var win = desktop.getWindow(winId);
    	if (!win) {
    		win = desktop.createWindow({
    			id: winId,
    			title: formtitle,
    			iconCls: formicon,
    			resizable: true,
    			minimizable: false,
    			maximizable: true,
    			width: width,
    			renderTo: Ext.getBody(),
    			constrain: true,
    			constrainHeader: false,
    			modal: true,
    			layout: 'fit',
    			shadow: 'frame',
    			shadowOffset: 10,
    			border: false,
    			items: Ext.create('Erems.view.' + controllerFolder + '.' + panel),
    			state: state
    		});
    	}
    	win.show();
    },
    /* end report needed */

    dataSave: function() { 
    	var me = this;
    	var form = me.getFormdata().getForm();
    	var addingRecord = false;
    	if (!me.finalValidation()) {
    		return false;
    	}

        // added 12 Nov 2013 
        var vp = me.validationProcess();
        var vps = false; // validation prosess status
        if (typeof vp === 'object') {
        	vps = vp.status;
        	if (!vps) {

        		Ext.MessageBox.alert('Alert', vp.msg, function() {
        			var x = me.getFormdata().down('[name=' + vp.field + ']');
        			if (x !== null) {
        				x.markInvalid(vp.msg);
        				x.focus();
        			}

        		});
        	}
        } else if (typeof vp === 'boolean') {
        	vps = vp;
        }
        // end added 12 Nov 2013

        if (form.isValid() && vps) {

        	resetTimer();
            //var store = me.getGrid().getStore();
            var store = null;

            var fida = me.getFinalData(form.getValues());

            if (me.instantCreateMode) {
            	store = _Apps.getController(me.callerId).getInstanCreateStorex(me.controllerName);
            } else {
                /* Mendefinisikan store sendiri pada saat proses simpan/edit 
                 * yang ada di me.storeProcess
                 * */
                 if (!me.storeProcess) {
                 	store = me.getGrid().getStore();
                 	console.log(store);
                 } else {
                 	store = me.storeProcess;
                 }
             }

             var msg = function() {
             	me.getFormdata().up('window').body.mask('Saving data, please wait ...');
             };
             switch (me.getFormdata().up('window').state.toLowerCase()) {
             	case 'create':

             	store.add(fida);
             	addingRecord = true;
             	break;
             	case 'update':

             	var idProperty = store.getProxy().getReader().getIdProperty();
             	var rec = store.getById(parseInt(form.findField(idProperty).getValue(), 10));
             	rec.beginEdit();
             	rec.set(fida);
             	rec.endEdit();
             	break;
             	default:
             	return;
             }

             store.on('beforesync', msg);
             store.sync({
             	success: function() {
             		me.getFormdata().up('window').body.unmask();
             		store.un('beforesync', msg);
             		store.reload();

             		if (typeof Ext.StoreManager.lookup(me.stores[0]) != 'undefined') {
             			Ext.StoreManager.lookup(me.stores[0]).load(/*{params: {limit: 0}}*/);
             		}
             		Ext.Msg.show({
             			title: 'Success',
             			msg: 'Data saved successfully.',
             			icon: Ext.Msg.INFO,
             			buttons: Ext.Msg.OK,
             			fn: function() {
             				me.formDataClose();
             			}
             		});
             	},
             	failure: function() {
             		me.getFormdata().up('window').body.unmask();
             		store.un('beforesync', msg);
             		if (store.getCount() > 0 && addingRecord) {
             			store.removeAt(store.getCount() - 1);
             		}
             		store.reload();
             		Ext.Msg.show({
             			title: 'Failure',
             			msg: 'Error: This Payment already had Faktur Pajak, someone already created it.',
             			icon: Ext.Msg.ERROR,
             			buttons: Ext.Msg.OK,
             			fn: function() {
             				me.formDataClose();
             			}
             		});
             	}
             });
         }
     },

     dataPrint: function(el) {
     	var me = this;
		//me.loadReportt(el, 'erems/fakturpajak/print');
		me.loadReportt();
	},
	
	loadReportt:function(){
		var me = this;
		// exec sp_fakturpajakreport_read '{project}','{pt}','{payment_startdate}','{payment_enddate}','{paymentflag_id}','{cluster_id}','{block_id}','{unit_number}','0','0'
		// var winId = 'myReportWindow';
		// me.instantWindow('Panel', 800, 'Result ', 'state-report', winId, 'masterreport');
		// var win = desktop.getWindow(winId);
		
		var winId = 'myReportWindow';
		me.instantWindowReport('Panel', 800, 'Result ', 'state-report', winId, 'masterreport');
		var win = desktop.getWindow(winId);

		if (win) {
			var params = me.getFormsearch().getForm().getFieldValues();
			if (typeof params["cluster_id"] == 'undefined') {
				params["cluster_id"] = 0;
			} else {
				params["cluster_id"] = me.getFormsearch().down("[name=cluster_id]").getValue();
			}
			if (typeof params["paymentflag_id"] == 'undefined') {
				params["paymentflag_id"] = 0;
			} else {
				params["paymentflag_id"] = me.getFormsearch().down("[name=paymentflag_id]").getValue();
			}
			if (typeof params["block_id"] == 'undefined') {
				params["block_id"] = 0;
			} else {
				params["block_id"] = me.getFormsearch().down("[name=block_id]").getValue();
			}
			params["payment_startdate"] = me.formatDate(params["payment_startdate"]);
			params["payment_enddate"] 	= me.formatDate(params["payment_enddate"]);
			params["project"] = apps.project;
			params["pt"] = apps.pt;

			reportFile = 'Fakturpajakexport';
			var html = me.generateFakeForm3(params, reportFile);
			win.down("#MyReportPanel").body.setHTML(html);
			$("#fakeReportFormID").submit();
		}
	},
	formatDate: function(date) {
	    var d = new Date(date),
	        month = '' + (d.getMonth() + 1),
	        day = '' + d.getDate(),
	        year = d.getFullYear();

	    if (month.length < 2) 
	        month = '0' + month;
	    if (day.length < 2) 
	        day = '0' + day;

	    return [year, month, day].join('-');
	},
	
	generateFakeForm3: function (paramList, reportFile) {
		// var form = '<form id="fakeReportFormID" action=resources/stimulsoftjs/viewer.php?reportfilelocation='+reportFile+'.mrt target="my-iframe" method="post" style="visibility:hidden;height:0;width:0">';
		var form = '<form id="fakeReportFormID" action=resources/stimulsoftjsv3/viewer.php?reportfilelocation=' + reportFile + '.mrt target="my-iframe" method="post" style="visibility:hidden;height:0;width:0">';
		for (var x in paramList) {
			if (paramList[x] === null) {
				paramList[x] = '';
			}
			form += '<input type="hidden" name="' + x + '" value="' + paramList[x] + '">';
		}
		form += '<input type="submit" value="post"></form>';
		form += '<iframe name="my-iframe" style="height:100%;width:100%;"></iframe>';
		return form;
	},
	
	loadReporttOld: function (sender, url, param, onclose) {					
		var winId = 'win-print';
		var win = desktop.getWindow(winId);	
		console.log(url);	
		if(!win){
			win = desktop.createWindow({
				id: winId,
				title: 'Print',
				iconCls: 'icon-print',
				width: '75%',
				height: '70%',
				minWidth: 600,
				minHeight: 400,
				animCollapse: false,
				constrain: true,
				constrainHeader: false,
				taskbarButton: false,
				renderTo: Ext.getBody(),
				modal: true,
				layout: 'fit',
				shadow: 'frame',
				shadowOffset: 10,
				listeners: {
					boxready: function(){															
						win.body.mask('Loading...');									
						var loadtm = setTimeout(function(){
							Ext.fly('front-content').load({
								url: url,
								autoAbort: true,
								scripts: true,
								autoLoad: true,
								success: function(request, response){ 								
									if (typeof response.responseText == 'undefined'){ return; }		
									// console.log(request);									
									// console.log(response.responseText);			
									var report_name = response.responseText;
									var printpage;																						
									if (report_name!='ERROR') {
										console.log(apps);
										if(param)
										{
											printpage = '<iframe id="frameprint" src="resources/stimulsoftjsv3/viewer.php?reportfilelocation='+report_name+param+'&projectpt='+apps.projectpt+'&project='+apps.project+'&pt='+apps.pt+'&uid='+apps.uid+'" frameborder=0 style="height:100%;width:100%;"></iframe>';									
										}
										else{
											var param_store;
											if (Ext.isObject(sender.up('gridpanel'))) {
												param_store = sender.up('gridpanel').getStore().proxy.extraParams;
											} else {
												param_store = sender.up('form').getForm().getValues();
											}
											var param_string = '';
											//console.log(param_store);
											for (var key in param_store) {
												if (param_store.hasOwnProperty(key)) {
													if(param_store[key] == undefined || param_store[key] == null) { param_store[key] = ''; }	
													//if (param_store[key].indexOf('{')!=-1) {
														//param_string += '&'+Ext.Object.toQueryString(Ext.decode(param_store[key], true));
													//} else {
														param_string += '&'+key+'='+param_store[key];
													//}												
													
												}										
											}											
											console.log(param_string);
											printpage = '<iframe id="frameprint" src="resources/stimulsoftjsv3/viewer.php?reportfilelocation='+report_name+param_string+'&projectpt='+apps.projectpt+'&project='+apps.project+'&pt='+apps.pt+'&uid='+apps.uid+'" frameborder=0 style="height:100%;width:100%;"></iframe>';										
										}											
										win.setBorder(false);
									} else {
										printpage = '<div style="padding:10px;color:#ff0000;font-weight:bold;">ERROR: Report file not found !</div>';
									}
									win.body.setHTML(printpage);								
									Ext.fly('front-content').update();								
								},
								failure: function(request, response){}
							});	clearTimeout(loadtm); win.body.unmask(); 
						},750);
					}
				},
				close: function() {
					if (Ext.isFunction(onclose)) onclose(sender);					
					this.doClose();
				}
			});
		}	
		win.show();	
	},

	saveCsv: function() {
		var me = this;
		var form = me.getFormdata();
		var grid = me.getGrid();
		if(grid.getStore().getTotalCount()>0){

			grid.setLoading("Please wait...");
			Ext.Ajax.request({
				url: 'erems/fakturpajak/saveexcelall',
				params: {
					"payment_startdate" : me.getFormsearch().down("[name=payment_startdate]").getValue(),
					"payment_enddate" : me.getFormsearch().down("[name=payment_enddate]").getValue(),
					"start" : 0,
					"limit" : 0,       
					"page" : me.getGrid().getStore().currentPage,
				},
				success: function(data,model) {
					grid.setLoading(false);
					//var url = data[0]['URL'];
					var obj = Ext.decode(data.responseText);
					var url = obj['URL'];
					if (url) {
						Ext.Msg.show({
							title: 'Info',
							msg: '<a href="'+url+'" target="blank">Download file</a>',
							closable: true,
							icon: Ext.Msg.INFO,
							buttons: Ext.Msg.OK      
						});
					}
				}
			});
		} else {
			Ext.Msg.show({
				title: 'Info',
				msg: 'Data is unavailable.',
				icon: Ext.Msg.INFO,
				buttons: Ext.Msg.OK
			});
		}
	}
});