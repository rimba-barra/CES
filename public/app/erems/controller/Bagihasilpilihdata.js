Ext.define('Erems.controller.Bagihasilpilihdata', {
	extend: 'Erems.library.template.controller.Controllerpopup',
	alias: 'controller.Bagihasilpilihdata',
	views: ['bagihasilpilihdata.Panel', 'bagihasilpilihdata.Grid', 'bagihasilpilihdata.FormSearch', 'bagihasilpilihdata.FormData','bagihasilpilihdata.FormDataView'],
	requires: [
		'Erems.library.template.component.Clustercombobox',
		'Erems.library.template.component.Blockcombobox',
		'Erems.library.template.component.Typecombobox',
		'Erems.library.template.component.Projectptcombobox',
	],
	stores: ['Mastercluster', 'Masterblock', 'Bagihasilpilihdata', 'Masterlandrepayment','Mastertype'],
	models: ['Bagihasilpilihdata', 'Masterlandrepayment'],
	refs: [
		{
			ref: 'grid',
			selector: 'bagihasilpilihdatagrid'
		},
		{
			ref: 'formsearch',
			selector: 'bagihasilpilihdataformsearch'
		},
		{
			ref: 'formdata',
			selector: 'bagihasilpilihdataformdata'
		},
		{
			ref: 'formdataview',
			selector: 'bagihasilpilihdataformdataview'
		},
		{
			ref: 'detailgrid',
			selector: 'bagihasilpilihdatagriddetail'
		},
	],
	controllerName: 'bagihasilpilihdata',
	fieldName: 'unit_number',
	bindPrefixName: 'Bagihasilpilihdata',
	formWidth: 600,
	nomorValue: 1,
	lrpSH:0,
	init: function (application) {
		var me = this;

		this.control({
			'bagihasilpilihdatapanel': {
				beforerender: me.mainPanelBeforeRender,
				afterrender: this.panelAfterRender

			},
			'bagihasilpilihdatagrid': {
				afterrender: this.gridAfterRender,
				//itemdblclick: this.gridItemDblClick,
				itemcontextmenu: this.gridItemContextMenu,
				selectionchange: this.gridSelectionChange
			},
			'bagihasilpilihdatagrid toolbar button[action=create]': {
				click: function () {
					this.formDataShow('create');
				}
			},
			'bagihasilpilihdatagrid toolbar button[action=update]': {
				click: function () {
					this.formDataShow('update');
				}
			},
			'bagihasilpilihdatagrid toolbar button[action=viewLookup]': {
				click: function () {
					this.formDataShowView('view');
				}
			},
			'bagihasilpilihdatagrid toolbar button[action=destroy]': {
				click: this.dataDestroy
			},
			'bagihasilpilihdatagrid toolbar button[action=print]': {
				click: this.dataPrint
			},
			'bagihasilpilihdatagrid toolbar [action=action0]': {
				click: function () {
					me.dataSearchFilterby('');
				}
			},
			'bagihasilpilihdatagrid toolbar [action=action1]': {
				click: function () {
					me.dataSearchFilterby('1');
				}
			},

			'bagihasilpilihdatagrid toolbar [action=action2]': {
				click: function () {
					me.dataSearchFilterby('2');
				}
			},
			'bagihasilpilihdatagrid actioncolumn': {
				afterrender: this.gridActionColumnAfterRender,
				click: this.gridActionColumnClick
			},
			'bagihasilpilihdataformsearch': {
				afterrender: this.formSearchAfterRender
			},
			'bagihasilpilihdataformsearch button[action=search]': {
				click: this.dataSearch
			},
			'bagihasilpilihdataformsearch button[action=reset]': {
				click: this.dataReset
			},
			'bagihasilpilihdataformdata': {
				afterrender: this.formDataAfterRender
			},
			'bagihasilpilihdataformdataview': {
				afterrender: this.formDataViewAfterRender
			},
			'bagihasilpilihdataformdata button[action=save]': {
				click: this.dataSave
			},
			'bagihasilpilihdataformdata button[action=cancel]': {
				click: this.formDataClose
			}

		});
	},
	// added by rico 25112022
	panelAfterRender: function (configs) {
		var me 		= this;
		var grid 	= me.getGrid();
		var search 	= me.getFormsearch();

		Ext.Ajax.request({
			url: 'erems/bagihasilpilihdata/read',
			params: {read_type_mode: 'config'},
			success: function (response) {
				response = Ext.decode(response.responseText);

				var projectpt =  jQuery.grep(response.projectpt, function(value) {
					return value.project_id == apps.project;
				});

				if(response.lrpsh1 == 0){
					grid.down('#colms_pt_name').hide();
					search.down('[name=pt_id]').hide();
				}else{
					me.setCombobox(search.down('[name=pt_id]'), projectpt);

					grid.down('#colms_pt_name').show();
					search.down('[name=pt_id]').show();
				}
			},
		});
	},
	/////// add by erwin.st 30122021
	setCombobox: function (field, data) {
		var me = this;

		var store = Ext.create('Ext.data.Store', {
			fields : [field.valueField, field.displayField],
			data   : data ? data : new Array()
		});
		field.bindStore(store);

		if(Boolean(field.getValue())){
			field.setValue(field.getValue());
		}
	},
	formDataViewAfterRender: function (el) {
		var me = this;
		me.loadComboBoxStore(el);

		var btnSave = me.getFormdataview().down('[itemId=btnSave]');
		btnSave.setVisible(false);

		var grid = me.getGrid();
        var store = grid.getStore();

        var record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));

        me.getFormdataview().loadRecord(record);
	},
	dataSearchFilterby: function (val) {
		var me = this;

		var form = me.getFormsearch().getForm();
		var fields = me.getFormsearch().getValues();
		//var store = me.getGrid().getStore();
		//var grid = me.getGrid();
		// me.getGrid().doInit();
		var store = me.getGrid().getStore();
		for (var x in fields) {
			store.getProxy().setExtraParam(x, fields[x]);
		}
		store.getProxy().setExtraParam('set_lrp', val);

		me.loadPage(store);

	},
	dataDestroy: function () {
		var me = this;
		var rows = me.getGrid().getSelectionModel().getSelection();
		var store = me.getGrid().getStore();
		var selectitem = store.getAt(store.indexOf(me.getGrid().getSelectionModel().getSelection()[0]));
		var id_lrp = selectitem.get('landrepayment_id');
		if (id_lrp == 0){
			Ext.Msg.alert('Info', 'data ini belum set lrp !');
			return;
		}
		
		if (rows.length < 1) {
			Ext.Msg.alert('Info', 'No record selected !');
			return;
		} else {
			var confirmmsg, successmsg, failmsg;
			var recordcounttext = rows.length + ' record' + (rows.length > 1 ? 's' : '');
			if (rows.length == 1) {
				var selectedRecord = '[' + store.getAt(store.indexOf(rows[0])).get(me.fieldName) + ']';
				confirmmsg = 'Unset LRP ' + selectedRecord + ' ?';
				failmsg = 'Error: Unable to Unset LRP ' + selectedRecord + '.';
			} else {
				confirmmsg = 'This action will Unset LRP ' + recordcounttext + '.<br />Continue ?';
				failmsg = 'Error: Unable to Unset LRP.';
			}
			Ext.Msg.confirm('Unset LRP ', confirmmsg, function (btn) {
				if (btn == 'yes') {
					resetTimer();
					var msg = function () {
						me.getGrid().up('window').mask('Unset LRP, please wait ...');
					};
					for (var i = 0; i < rows.length; i++) {
						store.remove(rows[i]);
					}

					store.on('beforesync', msg);
					store.sync({
						success: function (s) {
							me.getGrid().up('window').unmask();
							var successmsg = 'Unset LRP successfully.';
							store.un('beforesync', msg);
							store.reload();
//							if (typeof Ext.StoreManager.lookup(me.stores[0]) != 'undefined') {
//								Ext.StoreManager.lookup(me.stores[0]).load({params: {limit: 0}});
//							}
							Ext.Msg.show({
								title: 'Success',
								msg: successmsg,
								icon: Ext.Msg.INFO,
								buttons: Ext.Msg.OK
							});
						},
						failure: function () {
							me.getGrid().up('window').unmask();
							store.un('beforesync', msg);
							store.reload();
							Ext.Msg.show({
								title: 'Failure',
								msg: failmsg + ' The data may have been used.',
								icon: Ext.Msg.ERROR,
								buttons: Ext.Msg.OK
							});
						}
					});
				}
			});
		}
	},
	formDataShowView: function (state) {
		var me = this;
		var formtitle = 'View';
		var formicon = 'icon-search';

		var winId = 'win-bagihasilpilihdataformdataview';
		var win = desktop.getWindow(winId);
		if (!win) {
			win = desktop.createWindow({
				id: winId,
				title: formtitle,
				iconCls: formicon,
				resizable: false,
				minimizable: false,
				maximizable: false,
				width: me.formWidth,
				renderTo: Ext.getBody(),
				constrain: true,
				constrainHeader: false,
				modal: true,
				layout: 'fit',
				shadow: 'frame',
				shadowOffset: 10,
				border: false,
				//items: Ext.create('Erems.view.' + me.controllerName + '.HgbajbFormData'),
				listeners: {
					boxready: function () {
						win.body.mask('Loading...');
						var tm = setTimeout(function () {
							win.add(Ext.create('Erems.view.' + me.controllerName + '.FormDataView'));
							win.center();
							win.body.unmask();
							clearTimeout(tm);
						}, 1000);
					},
				}
			});
		}
		win.show();
	}

});