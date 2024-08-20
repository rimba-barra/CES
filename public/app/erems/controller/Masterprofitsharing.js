Ext.define('Erems.controller.Masterprofitsharing', {
	extend: 'Erems.library.template.controller.Controlleralt',
	alias: 'controller.Masterprofitsharing',
	views: ['masterprofitsharing.Panel', 'masterprofitsharing.Grid', 'masterprofitsharing.FormSearch', 'masterprofitsharing.FormData'],
	stores: ['Masterprofitsharing','Masterparameterglobal'],
	models: ['Masterprofitsharing','Masterparameterglobal'],
	refs: [
		{
			ref: 'grid',
			selector: 'masterprofitsharinggrid'
		},
		{
			ref: 'formsearch',
			selector: 'masterprofitsharingformsearch'
		},
		{
			ref: 'formdata',
			selector: 'masterprofitsharingformdata'
		},
	],
	controllerName: 'masterprofitsharing',
	fieldName: 'code',
	bindPrefixName:'Masterprofitsharing',
	formWidth: 550,
	nomorValue: 1,
	checkedStatus: 0,
	init: function(application) {
		var me = this;
		this.control({
			'masterprofitsharingpanel': {
				beforerender: me.mainPanelBeforeRender,
				afterrender: this.panelAfterRender

			},
			'masterprofitsharinggrid': {
				afterrender: this.gridAfterRender,
				itemdblclick: this.gridItemDblClick,
				itemcontextmenu: this.gridItemContextMenu,
				selectionchange: this.gridSelectionChange
			},
			'masterprofitsharinggrid toolbar button[action=create]': {
				click: function() {
					this.formDataShow('create');
				}
			},
			'masterprofitsharinggrid toolbar button[action=update]': {
				click: function() {
					this.formDataShow('update');
				}
			},
			'masterprofitsharinggrid toolbar button[action=destroy]': {
				click: this.dataDestroy
			},
			'masterprofitsharinggrid toolbar button[action=print]': {
				click: this.dataPrint
			},
			'masterprofitsharinggrid actioncolumn': {
				afterrender: this.gridActionColumnAfterRender,
				click: this.gridActionColumnClick
			},
			'masterprofitsharingformsearch': {
				afterrender: this.formSearchAfterRender
			},
			'masterprofitsharingformsearch button[action=search]': {
				click: this.dataSearch
			},
			'masterprofitsharingformsearch button[action=reset]': {
				click: this.dataReset
			},
			'masterprofitsharingformdata': {
				afterrender: this.formDataAfterRender
			},
			'masterprofitsharingformdata button[action=save]': {
				click: me.dataSave
			},
			'masterprofitsharingformdata button[action=cancel]': {
				click: this.formDataClose
			},
		});
	},
	checkDate:function(){
		var me 		= this;
		var form 	= me.getFormdata();
		var formVal = me.getFormdata().getForm().getValues();
		var today 	= new Date();
		if(formVal.periode_awal > formVal.periode_akhir){
			me.getFormdata().down('[name=periode_awal]').setValue(today);
			me.getFormdata().down('[name=periode_akhir]').setValue(today);
			Ext.Msg.show({
				title: 'Warning', 
				msg: 'Periode Akhir harus lebih besar daripada periode awal',
				icon: Ext.Msg.WARNING,
				buttons: Ext.Msg.OK
			});	
		}
	},
	formDataAfterRender: function(el) {
		var me = this;
		
		var state = el.up('window').state;
		
		if (state == 'create') {
			
		} else if (state == 'update') {
			var grid = me.getGrid();
			var store = grid.getStore();
			var form = me.getFormdata();

			var record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));
			el.loadRecord(record);
		}
	},
	
	panelAfterRender: function(){
		var me = this;
		
		var globalparameterStore = me.getMasterparameterglobalStore();
		globalparameterStore.removeAll();
		globalparameterStore.load({params: {parametername: 'LRP_PROJECT_SETTING'}, 
			callback:function(rec){
				if(rec.length > 0){
					me.checkedStatus = rec[0].get('value');
				} else {
					me.checkedStatus = 0;
				}
			}
		});
	},
	dataDestroy: function() {
		var me = this;
		var rows = me.getGrid().getSelectionModel().getSelection();
		if (rows.length < 1) {
			Ext.Msg.alert('Info', 'No record selected !');
			return;
		} else {
			var confirmmsg, successmsg, failmsg;
			var recordcounttext = rows.length + ' record' + (rows.length > 1 ? 's' : '');
			var store = me.getGrid().getStore();
			if (rows.length == 1) {
				var selectedRecord = '[' + store.getAt(store.indexOf(rows[0])).get(me.fieldName) + ']';
				confirmmsg = 'Delete ' + selectedRecord + ' ?';
				failmsg = 'Error: Unable to delete ' + selectedRecord + '.';
			} else {
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
							var res = Ext.decode(s.operations[0].response.responseText).total[0] == undefined ? 1 : 0;
							if(res == 0){
								me.getGrid().up('window').unmask();
								store.un('beforesync', msg);
								store.reload();
								Ext.Msg.show({
									title: 'Failure',
									msg: failmsg + ' <br/>The data may have been used.',
									icon: Ext.Msg.ERROR,
									buttons: Ext.Msg.OK
								});
							}else{
								me.getGrid().up('window').unmask();
								var successcount = parseInt(Ext.decode(s.operations[0].response.responseText).total, 10);
								var successmsg = (rows.length == 1 ? selectedRecord : (successcount != rows.length ? successcount + ' of ' : '') + recordcounttext) + ' deleted successfully.';
								store.un('beforesync', msg);
								store.reload();

								Ext.Msg.show({
									title: 'Success',
									msg: successmsg,
									icon: Ext.Msg.INFO,
									buttons: Ext.Msg.OK
								});
							}
						},
						failure: function() {
							me.getGrid().up('window').unmask();
							store.un('beforesync', msg);
							store.reload();
							Ext.Msg.show({
								title: 'Failure',
								msg: failmsg + ' <br/>The data may have been used.',
								icon: Ext.Msg.ERROR,
								buttons: Ext.Msg.OK
							});
						}
					});
				}
			});
		}
	}	
});