Ext.define('Erems.controller.Mastercac', {
	extend: 'Erems.library.template.controller.Controller2',
	requires: ['Erems.library.Browse',
		'Erems.library.box.Config',
		'Erems.library.box.tools.Tools',
		'Erems.template.ComboBoxFields',
		'Erems.library.box.tools.EventSelector',
		'Erems.library.ModuleTools'],
	alias: 'controller.Mastercac',
	views: ['mastercac.Panel', 'mastercac.Grid', 'mastercac.FormSearch', 'mastercac.FormData'],
	refs: [
		{
			ref: 'grid',
			selector: 'mastercacgrid'
		},
		{
			ref: 'formsearch',
			selector: 'mastercacformsearch'
		},
		{
			ref: 'formdata',
			selector: 'mastercacformdata'
		}
	],
	controllerName: 'mastercac',
	fieldName: 'cac_code',
	bindPrefixName: 'Mastercac',
	localStore: {
		detail: null,
		selectedUnit: null,
		customer: null
	},
	browseHandler: null,
	cbf: null,
	mt: null,
	formxWinId: 'win-posisiwinId',
	constructor: function (configs) {
		this.callParent(arguments);
		var me = this;
		this.myConfig = new Erems.library.box.Config({
			_controllerName: me.controllerName
		});

		me.cbf = new Erems.template.ComboBoxFields();
	},
	init: function (application) {
		var me = this;

		me.tools = new Erems.library.box.tools.Tools({config: me.myConfig});
		var events = new Erems.library.box.tools.EventSelector();

		this.control({
			'mastercacpanel': {
				afterrender: this.panelAfterRender,
				beforerender: me.mainPanelBeforeRender

			},
			'mastercacgrid': {
				afterrender: this.gridAfterRender,
				itemdblclick: this.gridItemDblClick,
				itemcontextmenu: this.gridItemContextMenu,
				selectionchange: this.gridSelectionChange
			},
			'mastercacgrid toolbar button[action=create]': {
				click: function () {
					this.formDataShow('create');
				}
			},
			'mastercacgrid toolbar button[action=update]': {
				click: function () {
					this.formDataShow('update');
				}
			},
			'mastercacgrid toolbar button[action=destroy]': {
				click: this.dataDestroy
			},
			'mastercacgrid toolbar button[action=print]': {
				click: this.dataPrint
			},
			'mastercacgrid actioncolumn': {
				afterrender: this.gridActionColumnAfterRender,
				click: this.gridActionColumnClick
			},
			'mastercacformsearch button[action=search]': {
				click: this.dataSearch
			},
			'mastercacformsearch button[action=reset]': {
				click: this.dataReset
			},
			'mastercacformdata': {
				afterrender: this.formDataAfterRender
			},
			'mastercacformdata button[action=save]': {
				click: this.mainDataSave
			},
			'mastercacformdata button[action=cancel]': {
				click: this.formDataClose
			}

		});
	},
	fdar: function () {
		var me = this;
		return me.altFdar(me);

	},
	mainDataSave: function () {
		var me = this;

		me.tools.iNeedYou(me).save();
	},
	altFdar: function (controller) {
		var me = this;
		var f = controller.getFormdata();



		//
		var x = {
			init: function () {

				controller.setActiveForm(f);




			},
			create: function () {
				var that = this;
				f.editedRow = -1;
				f.setLoading("Loading components...");
				me.tools.ajax({
					params: {},
					success: function (data, model) {


						f.setLoading(false);
						me.tools.wesea(data.employee, f.down("[name=upline_id]")).comboBox();
						me.tools.wesea(data.bank, f.down("[name=bank_bank_id]")).comboBox();

					}
				}).read('detail');

			},
			update: function () {
				var that = this;
				f.editedRow = controller.getGrid().getSelectedRow();
				var rec = controller.getGrid().getSelectedRecord();




				f.setLoading("Loading...");
				me.tools.ajax({
					params: {},
					success: function (data, model) {

						me.tools.wesea(data.employee, f.down("[name=upline_id]")).comboBox();
						me.tools.wesea(data.bank, f.down("[name=bank_bank_id]")).comboBox();
						f.loadRecord(rec);
						f.setLoading(false);


					}
				}).read('detail');
			}

		};
		return x;
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
                            var res = Ext.decode(s.operations[0].response.responseText).total == undefined ? 1 : 0;
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