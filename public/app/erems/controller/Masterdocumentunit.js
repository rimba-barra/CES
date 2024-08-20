Ext.define('Erems.controller.Masterdocumentunit', {
	extend   : 'Erems.library.template.controller.Controllerwb',
	alias    : 'controller.Masterdocumentunit',
	views    : ['masterdocumentunit.Panel', 'masterdocumentunit.Grid', 'masterdocumentunit.FormSearch', 'masterdocumentunit.FormData', 'masterdocumentunit.GridDocumentHistory'],
	requires : ['Erems.library.ComboLoader', 'Erems.library.ModuleTools','Erems.library.Browse'],
	stores   : ['Allpurchaseletter'],
	refs     : [

		{
			ref: 'panel',
			selector: 'masterdocumentunitpanel'
		},
		{
			ref: 'grid',
			selector: 'masterdocumentunitgrid'
		},
		{
			ref: 'formsearch',
			selector: 'masterdocumentunitformsearch'
		},
		{
			ref: 'formdata',
			selector: 'masterdocumentunitformdata'
		},
		{
			ref: 'griddocument',
			selector: 'masterdocumentunitgriddocument'
		},
		{
			ref: 'formdatadocument',
			selector: 'masterdocumentunitformdatadocument'
		},
		{
			ref: 'unitgrid',
			selector: 'masterdocumentunitunitgrid'
		},
		{
			ref: 'griddocumenthistory',
			selector: 'masterdocumentunitgriddocumenthistory'
		},
	],
	controllerName : 'masterdocumentunit',
	formWidth      : 750,
	fieldName      : 'name',
	bindPrefixName : 'Masterdocumentunit',
	imageFolder    : 'app/erems/uploads/unitdocuments/',
	localStore     : { detail : null },
	comboLoader    : null,
	cbf            : null,
	mt             : null,
	formxWinId     : 'win-customerwinId',
	constructor    : function(configs) {
		this.callParent(arguments);
		var me = this;
		this.myConfig = new Erems.library.box.Config({
			_controllerName: me.controllerName
		});
	},
	daftarDocumentType : null,
	init               : function(application) {
		var me = this;
		me.tools = new Erems.library.box.tools.Tools({config: me.myConfig});
		if (typeof ApliJs === "undefined") {
			Ext.Loader.injectScriptElement(document.URL + 'app/erems/js/ApliJs.js?_=' + new Date().getTime(), function () {

				console.log("[INFO] ApliJs loaded.");

			}, function () {
				// error load file
			});
		}
		this.control({
			'masterdocumentunitpanel': {
				beforerender: me.mainPanelBeforeRender,
				afterrender: this.panelAfterRender
			},
			'masterdocumentunitgrid': {
				afterrender     : this.gridAfterRender,
				itemdblclick    : this.gridItemDblClick,
				itemcontextmenu : this.gridItemContextMenu,
				selectionchange : function(el) {
					this.gridSelectionChange();
				}
			},

			'masterdocumentunit toolbar button[action=create]': {
				click: function(el) {
					//   this.formDataShow(el,'create','create');
				}
			},
			'masterdocumentunit toolbar button[action=update]': {
				click: function(el) {
					//  this.formDataShow(el,'update','update');
				}
			},
			'masterdocumentunitformsearch button[action=search]': {
				click: this.dataSearch
			},
			'masterdocumentunitformsearch button[action=reset]': {
				click: this.dataReset
			},
			'masterdocumentunitformdata': {
				afterrender: this.formDataAfterRender
			},
			'masterdocumentunitformdata button[action=save]': {
				click: this.mainDataSave
			},
			'masterdocumentunitformdata button[action=cancel]': {
				click: this.formDataClose
			},

			'masterdocumentunitbrowsepanel': {
				beforerender: me.browsepanelBeforeRender
			},
			'masterdocumentunitbrowsepanel button[action=select]': {
				click: me.browsegridSelection
			},
			'masterdocumentunitbrowsegrid': {
				afterrender: me.browsegridAfterRender
			},
			'masterdocumentunitgriddocument button[action=create]': {
				click: function() {
					me.griddocumentButtonClick('create');
				}
			},
			'masterdocumentunitgriddocument button[action=update]': {
				click: function() {
					me.griddocumentButtonClick('update');
				}
			},
			'masterdocumentunitgriddocument button[action=destroy]': {
				click: function() {
					me.griddocumentButtonClick('destroy');
				}
			},
			'masterdocumentunitgriddocument button[action=searchdocument]': {
				click: function() {
					me.loadListdoc();
				}
			},
			'masterdocumentunitgriddocument actioncolumn': {
				downloadaction: me.actionColumnDownload
			},
			'masterdocumentunitgriddocument [name=search]': {
				keypress : function(el, cp) {
					if (cp.getCharCode() === 13) {
						me.loadListdoc();
					}
				},
			},
			'masterdocumentunitformdatadocument #fd_file': {
				change: function(fld, a) {
					me.formDataUploadFileDoc(fld, a, 'mode');
				}
			},
			'masterdocumentunitformdatadocument button[action=save]': {
				click: function(fld, a) {
					me.saveDocument();
				}
			},

			'masterdocumentunitformdata button[action=browse_unit]': {
				click: this.browseUnit
			},
			'masterdocumentunitunitgrid button[action=select]': {
				click: this.unitSelect
			},

		});
	},
	panelAfterRender: function (configs) {
		this.callParent(arguments);
		var me = this;

		ApliJs.applicationName = "erems";
		
		var p = me.getPanel();
		p.setLoading("Please wait");
		me.tools.ajax({
			params: {},
			success: function (data, model) {
				me.fillFormSearchComponents(data, me.getFormsearch());
				p.setLoading(false);
			}
		}).read('detail');
	},
	fillFormSearchComponents: function (data, f) {
		var me = this;
		me.tools.wesea(data.unitstatus, f.down("[name=unitstatus_unitstatus_id]")).comboBox(true);
		me.tools.wesea(data.cluster, f.down("[name=cluster_cluster_id]")).comboBox(true);
		me.tools.wesea(data.block, f.down("[name=block_block_id]")).comboBox(true);
	},
	fdar: function() {
		var me = this;
		var f = me.getFormdata();
		me.mt = new Erems.library.ModuleTools();

		var x = {
			init: function() {
				me.setActiveForm(f);
				me.localStore.detail = me.instantStore({
					id          : me.controllerName + 'PLDetailStore',
					extraParams : {mode_read : 'maindetail'},
					idProperty  : 'unit_id'
				});
			},
			create: function() {
				/* request model from zend */
				me.tools.ajax({
					params: {},
					success: function(data, model) {
						// added by rico 12112021
						data.documenttype.data = jQuery.grep(data.documenttype.data, function(value) {
							return value.documentcategory_id == 2;
						});

						me.daftarDocumentType = data.documenttype;
						me.localStore.detail.load({
							callback: function(rec, op) {
								me.attachModel(op, me.localStore.detail);
							}
						});
						f.setLoading(false);
					}
				}).read('detail');
			},
			update: function() {
				var rec = me.getGrid().getSelectedRecord();
				var idUnit = typeof rec === "undefined" ? 0 : rec.get("unit_id");
				f.down("button[action=browse_unit]").setDisabled(true);
				
				me.tools.ajax({
					params  : {},
					success : function(data, model) {
						// added by rico 12112021
						data.documenttype.data = jQuery.grep(data.documenttype.data, function(value) {
							return value.documentcategory_id == 2;
						});

						me.daftarDocumentType = data.documenttype;
						me.localStore.detail.load({
							params: {
								unit_id: idUnit
							},
							callback: function(rec, op) {

								me.attachModel(op, me.localStore.detail);
								var rec = me.localStore.detail.getAt(0);

								me.getFormdata().loadRecord(rec);
								me.getFormdata().editedRow = me.getGrid().getSelectedRow();
							}
						});

						//get data for grid document unit
						var g = me.getGriddocument();
						g.doInit();
						g.getSelectionModel().setSelectionMode('SINGLE');
						g.getStore().getProxy().setExtraParam("unit_id", rec.get("unit_id"));
						g.getStore().getProxy().setExtraParam("temp_id", '');
						g.getStore().load({
							callback: function(rec, op) {
								g.attachModel(op);
							}
						});

						f.setLoading(false);
					}
				}).read('detail');

				//get data for grid document customer
				var gh = me.getGriddocumenthistory();
				gh.doInit();
				gh.getSelectionModel().setSelectionMode('SINGLE');
				gh.getStore().getProxy().setExtraParam("unit_id", rec.get("unit_id"));
				gh.getStore().load({
					callback: function(rec, op) {
						gh.attachModel(op);
					}
				});
			}
		};
		return x;
	},
	browseUnit: function (el) {
		var me = this, browse = new Erems.library.Browse();

		browse.init({
			controller       : me,
			view             : 'UnitGrid',
			el               : el,
			localStore       : "unit",
			mode_read        : "selectedunit",
			loadRecordPrefix : "unit",
			browseId         : 'unitpl'
		});
		browse.showWindow();

		for (var i=0;i<browse.textfield.length;i++) {
			browse.textfield[i].on('keypress', function(e, el){
				if (el.getCharCode() === 13) {
					me.browsedataSearch(e);
				}
			});
		}
	},
	unitSelect: function (el) {
		var me = this;
		var plRec = me.getUnitgrid().getSelectedRecord();
		var row = me.getUnitgrid().getSelectionModel().getSelection();
		var win = desktop.getWindow('browseDataWindow');
		
		if (me.browseHandler) {
			me.browseHandler.selectItem(function (rec) {
				me.attachUnitInfo(rec);
			});
		}
	},
	attachUnitInfo: function (rec) {
		var me = this;

		for (var x in rec.data) {
			var field = me.getFormdata().down("[name=" + x + "]");
			if (field) {
				field.setValue(rec.data[x]);
			}
		}

		var g = me.getGriddocument();
		g.doInit();
		g.getSelectionModel().setSelectionMode('SINGLE');
		g.getStore().getProxy().setExtraParam("unit_id", rec.get("unit_id"));
		g.getStore().getProxy().setExtraParam("temp_id", '');
		g.getStore().load({
			callback: function(rec, op) {
				g.attachModel(op);
			}
		});
	},
	mainDataSave: function() {
		var me = this, g = me.getGrid();

		Ext.Msg.show({
			title   : 'Success',
			msg     : 'Data saved successfully.',
			icon    : Ext.Msg.INFO,
			buttons : Ext.Msg.OK
		});

		me.getFormdata().up('window').close();
		g.getStore().loadPage(1);
	},
	griddocumentButtonClick: function(action) {
		var me = this;
		var g = me.getGriddocument();
		var fm = me.getFormdata();
		if(typeof fm == 'undefined'){
			var fm = me.getFormdatarevision();
		}
		var cId = fm.down("[name=unit_id]").getValue();

		if (action === "create") {
			var w = me.instantWindow('FormDataDocument', 400, 'Documents', 'documents', 'myUnitDocumentFormWindow');
			var f = me.getFormdatadocument();
			f.editedRow = -1;
			me.tools.wesea(me.daftarDocumentType, f.down("[name=documenttype_documenttype_id]")).comboBox();
			f.down("[name=unit_unit_id]").setValue(cId);

			me.generateDropdownpurchaseletter(cId);
		} 
		else if (action === "update") {
			var row = g.getSelectedRow();
			if (row >= 0) {
				var rec = g.getStore().getAt(row);
				var w = me.instantWindow('FormDataDocument', 400, 'Documents', 'documents', 'myUnitDocumentFormWindow');

				var f = me.getFormdatadocument();

				me.generateDropdownpurchaseletter(cId);      

				f.editedRow = row;
				me.tools.wesea(me.daftarDocumentType, f.down("[name=documenttype_documenttype_id]")).comboBox();

				f.loadRecord(rec);
				me.refreshDocumentImageInfo(rec.get('filename'));

				var tm = setTimeout(function () {
					var dataPL = f.down('[name=purchaseletter_id_cb]').store.data.items;
					for(x=0; x<dataPL.length; x++) {
						if(dataPL[x].get('purchaseletter_id') == rec.get('purchaseletter_id')){
							f.down('[name=purchaseletter_id_cb]').setValue(dataPL[x].get('purchaseletter_id'));
						}
					} 
					clearTimeout(tm);
				}, 100);
			} 
			else {
				me.tools.alert.warning("Tidak ada dokumen yang terpilih.");
			}
		} 
		else if (action === "destroy") {
			var row = g.getSelectedRow();
			if (row >= 0) {

				Ext.Msg.show({
					title   : 'Konfirmasi',
					msg     : 'Are you sure to delete this document?',
					buttons : Ext.Msg.YESNO,
					icon    : Ext.Msg.QUESTION,
					fn      : function(clicked) {
						if (clicked === "yes") {
							g.up("window").setLoading("Sedang menghapus...");
							me.tools.ajax({
								params: {
									unitdocument_id: g.getStore().getAt(row).get("unitdocument_id")
								},
								success: function(data, model) {

									g.up("window").setLoading(false);
									if (!data.others[0][0]['HASIL']) {
										me.tools.alert.warning(data.others[0][0]['MSG']);
										return;
									}
									g.getStore().loadPage(1);
								}
							}).read('deletedocument');
						}
					}
				});
			} else {
				me.tools.alert.warning("Tidak ada dokumen yang terpilih.");
			}
		}
	},
	generateDropdownpurchaseletter : function(unit_id=0){
		var me         = this,
			f          = me.getFormdatadocument(),
			param_data = ['all_purchaseletter'];

		Ext.Ajax.request({
			url    : 'erems/bypass/general',
			async  : true,
			params : {
				mode_read  : 'get_store_data',
				param_data : JSON.stringify(param_data),
				unit_id    : unit_id
			},
			success: function (response) {
				var resp = Ext.JSON.decode(response.responseText);
				var data = [];
				if(resp.all_purchaseletter.success){
					data = resp.all_purchaseletter.data;
				}
				f.down("[name=purchaseletter_id_cb]").getStore().loadData(data);                    
			},
			failure: function (conn, response, options, eOpts) {
				Ext.Msg.show({
					title   : 'Failure',
					msg     : 'Error while accessing the server database',
					icon    : Ext.Msg.ERROR,
					buttons : Ext.Msg.OK
				});
			}
		});
	},
	formDataUploadFileDoc: function(fld, a, mode) {
		var me = this;
		var form = fld.up("form");

		me.uploadFile({
			form: form,
			params: {tipe: 'document'},
			callback: {
				success: function(imageName) {
				   
					me.refreshDocumentImageInfo(imageName);
				},
				failure: function() {

				}
			}
		});
	},
	refreshDocumentImageInfo: function(imageName) {
		var me = this;
		var form = me.getFormdatadocument();
		form.down("[name=filename]").setValue(imageName);
		me.mt.customerPhoto(form.down("#file_image"), imageName, 'app/erems/uploads/unitdocuments/','360px 170px');
	},
	saveDocument: function() {
		var me = this;
		var f  = me.getFormdatadocument();
		var g  = me.getGriddocument();
		var vs = f.getValues();

		var hasil = vs;
		if (!hasil.documenttype_documenttype_id) {
			me.tools.alert.warning("Tipe dokumen tidak valid.");
			return;
		}

		if (!hasil.filename) {
			me.tools.alert.warning("Pilih file terlebih dahulu.");
			return;
		}

		if(f.down("[name=purchaseletter_id_cb]").getValue()){
			var st = f.down("[name=purchaseletter_id_cb]").getStore();
			hasil.purchaseletter_id = st.data.items[0].get('purchaseletter_id');
			hasil.purchaseletter_no = st.data.items[0].get('purchaseletter_no');
			hasil.customer_name     = st.data.items[0].get('customer_name');
		}

		// if (f.editedRow >= 0) { // update
		//     var rec = g.getStore().getAt(f.editedRow);
		//     rec.beginEdit();
		//     rec.set(hasil);
		//     rec.endEdit();
		// } 
		// else { // create
		//     g.getStore().add(hasil);
		// }

		f.setLoading("Sedang menyimpan...");
		me.tools.ajax({
			params: {
				data: Ext.encode(hasil)
			},
			success: function(data, model) {
				f.setLoading(false);
				if (!data.others[0][0]['HASIL']) {
					me.tools.alert.warning(data.others[0][0]['MSG']);
					return;
				}
				// g.getStore().loadPage(1);
				f.up("window").close();

				g.down('[name=search]').setValue('');
				me.loadListdoc();
			}
		}).read('savedocument');
	},
	actionColumnDownload: function (view, rowIndex, colIndex, item, e, record, row)  {
		var me   = this;
		var url  = document.URL + me.imageFolder + view[5].data.filename;

		Ext.create('Ext.window.Window', {
			title   : 'Download',
			height  : 210,
			width   : 380,
			padding : '10px 10px 10px 10px',
			modal   : true,
			items   : 
				[
					{
						xtype            : 'textareafield',
						height           : 60,
						itemId           : 'alasan',
						name             : 'alasan',
						fieldLabel       : 'Alasan',
						padding          : '10px 0 0 10px',
						enforceMaxLength : true,
						maskRe           : /[^\`\"\']/,
						maxLength        : 255
					}
				],
			dockedItems : [
				{
					xtype  : 'toolbar',
					dock   : 'bottom',
					ui     : 'footer',
					layout : {
						padding : 6,
						type    : 'hbox'
					},
					items : [
						{
							xtype   : 'button',
							action  : 'saveReason',
							padding : 5,
							width   : 75,
							iconCls : 'icon-save',
							text    : 'Process',
							handler : function() {
								var reason = this.up('window').items.items[0].value;
								if(!reason){
									Ext.Msg.show({
										title   : 'Alert',
										msg     : 'Please Fill the alasan',
										icon    : Ext.Msg.WARNING,
										buttons : Ext.Msg.OK
									});
									return false;
								}
								this.up('window').body.mask('Processing, Please Wait...');

								var data = [
									view[5].data.filename, 
									view[5].data.documenttype_documenttype, 
									view[5].data.description, 
									view[5].data.unitdocument_id, 
									view[5].data.unit_unit_id, 
									view[5].data.folder, // added by rico 20032023                            
									view[5].data.documenttype_documenttype_id, // added by rico 20032023                            
								];

								me.saveReason(data, reason, this.up('window'));
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
							handler : function() {
								this.up('window').close();
							}
						}
					]
				}
			]
		}).show();
	},
	// saveReason: function(filename, type, desc, document_id, unit_id, folder, reason, win){
	saveReason: function(data, reason, win){
		var me          = this;
		var imgFolder   = (data[5]) ? (data[6] == 22) ? data[5]: 'unitdocuments': 'unitdocuments'; // added by rico 20032023
		var url         = document.URL + 'app/erems/uploads/' + imgFolder + '/' + data[0]; // added by rico 20032023

		// var url = document.URL + me.imageFolder + filename; 

		var d = [data[0], data[1], data[2], data[3], data[4], reason];

		me.tools.ajax({
			params: {
				data : Ext.encode(d)
			},
			success: function(data, model) {
				win.body.unmask();

				var a = document.createElement('A');
				a.href = url;
				a.download = url.substr(url.lastIndexOf('/') + 1);
				document.body.appendChild(a);
				a.click();
				document.body.removeChild(a);

				//get data for grid document customer
				var gh = me.getGriddocumenthistory();
				gh.doInit();
				gh.getStore().getProxy().setExtraParam("unit_id", data.others[0][0].HASIL.unit_unit_id);
				gh.getStore().load({
					callback: function(rec, op) {
						gh.attachModel(op);
					}
				});  

				Ext.Msg.show({
					title: 'Success', 
					msg: 'Download successfully.',
					icon: Ext.Msg.INFO,
					buttons: Ext.Msg.OK,
					fn: function(){ 
						win.close();
					}
				});  

			}
		}).read('saveDownload');
	},
	uploadFile: function(params) {
		var me = this;
		var form = params.form;
		var callback = params.callback;

		var filesize = 0;
		var filedoc = document.getElementsByName("file_browse")[0];
		if(filedoc != null){
			filesize = filedoc.files[0].size;
		}

		if(filesize > 0 && filesize <= 5242880){ //filesize max 5MB 
			form.submit({
				clientValidation: false,
				url: 'erems/' + me.controllerName + '/upload',
				params:params.params,
				waitMsg: 'Uploading file...',
				success: function(f, a) {

					var icon = Ext.Msg.INFO;
					var msg = 'File Uploaded';

					if (!a.result.success) {
						icon = Ext.Msg.ERROR;
						msg = a.result.msg;
					} else {
						callback.success(a.result.msg);
					}

					Ext.Msg.show({
						title: 'Info',
						msg: msg,
						icon: icon,
						buttons: Ext.Msg.OK
					});
				},
				failure: function(f, a) {
					callback.failure();
					var msg = "...";
					if(typeof a.result !=="undefined"){
						msg= a.result.msg;
					}else{
						msg = "Please complete all the required field";
					}
					Ext.Msg.show({
						title: 'Fail',
						msg: msg,
						icon: Ext.Msg.ERROR,
						buttons: Ext.Msg.OK
					});
				}
			});
		} else {
			var msg = "File upload maximum 5 MB";
			Ext.Msg.show({
				title: 'Fail',
				msg: msg,
				icon: Ext.Msg.ERROR,
				buttons: Ext.Msg.OK
			});
		}
	},
	loadListdoc : function(){
		var me = this, searchText = me.getGriddocument().down('[name=search]').getValue();
		me.getGriddocument().getStore().getProxy().setExtraParam("search_text", searchText);
		me.getGriddocument().getStore().loadPage(1);
	}
});