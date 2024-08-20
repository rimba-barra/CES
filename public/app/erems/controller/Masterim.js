Ext.define('Erems.controller.Masterim', {
//	extend: 'Erems.library.template.controller.Controller',
	extend: 'Erems.library.template.controller.Controlleralt',
	requires: ['Erems.library.template.component.Distchannelcombobox'],
	alias: 'controller.Masterim',
	requires:[],
	views: ['masterim.Panel', 'masterim.Grid', 'masterim.GridDetail', 'masterim.FormSearch', 'masterim.FormData', 'masterim.FormDataDetail'],
	stores: ['Masterim', 'Masterimdetail', 'Masterparameterglobal','Masterreward'],
	models: ['Masterim', 'Masterimdetail', 'Masterparameterglobal','Masterreward'],
	refs: [
		{
			ref: 'grid',
			selector: 'masterimgrid'
		},
		{
			ref: 'formsearch',
			selector: 'masterimformsearch'
		},
		{
			ref: 'formdata',
			selector: 'masterimformdata'
		},
		{
			ref: 'formdatadetail',
			selector: 'masterimformdatadetail'
		},
		{
			ref: 'griddetail',
			selector: 'masterimgriddetail'
		}
	],
	controllerName: 'masterim',
	fieldName: 'nomor_im',
	bindPrefixName: 'Masterim',
	formWidth: 700,
    setVar         : {
        masterreward    : null,
        editingIndexRow : 0,
    },
	init: function (application) {
		var me = this;
		this.control({
			'masterimpanel': {
				beforerender: me.mainPanelBeforeRender,
				afterrender: this.panelAfterRender

			},
			'masterimgrid': {
				afterrender: this.gridAfterRender,
				itemdblclick: this.gridItemDblClick,
				itemcontextmenu: this.gridItemContextMenu,
				selectionchange: this.gridSelectionChange
			},
			'masterimgrid toolbar button[action=create]': {
				click: function () {
					this.formDataShow('create');
				}
			},
			'masterimgrid toolbar button[action=update]': {
				click: function () {
					this.formDataShow('update');
				}
			},
			'masterimgrid toolbar button[action=destroy]': {
				click: this.dataDestroy
			},
			'masterimgrid toolbar button[action=print]': {
				click: this.dataPrint
			},
			'masterimgrid actioncolumn': {
				afterrender: this.gridActionColumnAfterRender,
				click: this.gridActionColumnClick
			},
			'masterimformsearch': {
				afterrender: this.formSearchAfterRender
			},
			'masterimformsearch button[action=search]': {
				click: this.dataSearch
			},
			'masterimformsearch button[action=reset]': {
				click: this.dataReset
			},
			'masterimformdata': {
//				beforerender: this.formDataBeforeRender,
				afterrender: this.formDataAfterRender
			},
			'masterimformdata button[action=save]': {
				click: me.dataSave
			},
			'masterimformdata button[action=cancel]': {
				click: this.formDataClose
			},
			'masterimgriddetail': {
//				afterrender: this.gridAfterRender,
//				itemdblclick: this.gridItemDblClick,
//				itemcontextmenu: this.gridItemContextMenu,
				selectionchange: this.gridDetailSelectionChange
			},
			'masterimgriddetail toolbar button[action=create]': {
				click: function () {
					me.formDataIMDetailShow('create');
				}
			},
			'masterimgriddetail toolbar button[action=update]': {
				click: function () {
					me.formDataIMDetailShow('update');
				}
			},
			'masterimgriddetail toolbar button[action=destroy]': {
				click: this.dataDetailDestroy
			},
			'masterimformdatadetail': {
//				beforerender: this.formDataBeforeRender,
				afterrender: this.formDataDetailAfterRender
			},
			'masterimformdatadetail button[action=save]': {
				click: me.detailData.save_data
			},
            'masterimformdatadetail [name=group_id]': {
                select : function () {
                    if(typeof me.getFormdata() != 'undefined'){
                        me.changeGroup();
                    }
                }
            },
            'masterimformdatadetail gridcolumn': {
                click: function () {
                    if(typeof me.getFormdata() != 'undefined'){
                        me.setVariableeditrow(me.getDetailgrid().getSelectedRow());
                    }
                }
            },
		});
	},
	fdar: function () {
		var me = this;
		var x = {
			init: function () {
				/// init here
			},
			create: function () {
				me.getGriddetail().getStore().removeAll();
			},
			update: function () {
				var grid = me.getGrid();
				var store = grid.getStore();

				var record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));
				me.getFormdata().loadRecord(record);
				me.getGriddetail().getStore().getProxy().setExtraParam('internalmemo_id', record.get('internalmemo_id'));
				me.getGriddetail().getStore().load();
				/// update here
			}
		};
		return x;
	},
	formDataDetailAfterRender: function (el) {
		var me = this;
		me.storeProcess = me.createSpProcessObj(me.storeProcess);
		me.fdar().init();

		var state = el.up('window').state;

		if (state == 'create') {
		} else if (state == 'update') {
			var griddetail = me.getGriddetail();
			var store = griddetail.getStore();

			var record = store.getAt(store.indexOf(griddetail.getSelectionModel().getSelection()[0]));
			me.getFormdatadetail().loadRecord(record);

            var selectorReward = me.getFormdatadetail().down("[name=reward_id]");
            var groupId = record.get('group_id') == 0 ? 1 : record.get('group_id');

            fType = new Array();
            fType.push(selectorReward.valueField);
            fType.push(selectorReward.displayField);

            if(!Boolean(me.setVar.masterreward)){
                me.setVar.masterreward = me.getDatamasterreward();
            }

            var optionsx = [];
            me.setVar.masterreward.forEach(function(v, i, arr){
                if(v.group_id == record.get('group_id')){
                    v.name = v.name.trim();
                    optionsx.push(v);
                }
            });

            var newStore = Ext.create('Ext.data.Store', {
                fields : fType,
                data   : optionsx
            });
			

            selectorReward.bindStore(newStore);

            me.getFormdatadetail().getForm().setValues({
                internalmemo_detail_id : record.get('internalmemo_detail_id'),
                internalmemo_id : record.get('internalmemo_id'),
                group_id        : groupId,
                reward_id       : record.get('reward_id'),
                amount          : accounting.formatMoney(record.get('amount')),
                notes           : record.get('notes')
            });
		}
	},
	formDataIMDetailShow: function (state) {
		var me = this;
		//var state = 'create';//action == me.bindPrefixName + 'Create' ? 'create' : 'update';
		switch (state) {
			case 'create':
				formtitle = 'Create Detail Master IM';
				formicon = 'icon-form-add';
				break;
			case 'update':
				formtitle = 'Edit Detail Master IM';
				formicon = 'icon-form-edit';
				break;
//			case 'view':
//				formtitle = 'View Progress Air dan Listrik';
//				formicon = 'icon-form-edit';
//				break;
		}
		var winId = 'win-masterimformdata';
		var win = desktop.getWindow(winId);
		if (!win) {
			win = desktop.createWindow({
				id: winId,
				title: formtitle,
				iconCls: formicon,
				resizable: false,
				minimizable: false,
				maximizable: false,
				width: 600,
				renderTo: Ext.getBody(),
				constrain: true,
				constrainHeader: false,
				modal: true,
				layout: 'fit',
				shadow: 'frame',
				shadowOffset: 10,
				border: false,
				state: state,
				//items: Ext.create('Erems.view.' + me.controllerName + '.HgbajbFormData'),
				listeners: {
					boxready: function () {
						win.body.mask('Loading...');
						var tm = setTimeout(function () {
							win.add(Ext.create('Erems.view.' + me.controllerName + '.FormDataDetail'));
							win.center();
							win.body.unmask();
							clearTimeout(tm);
						}, 1000);
					},
				}
			});
		}
		win.show();
	},
	detailData: {
		save_data: function () {
			var me 		= this;
			var state 	= me.getFormdatadetail().up('window').state.toLowerCase();
			var form 	= this.getFormdatadetail().getForm();
			var fields  = me.getFormdatadetail().getValues();
			var myStore = me.getGriddetail().getStore();

			if (form.isValid()) {
				var internalmemo_id = fields.internalmemo_id;
				var internalmemo_detail_id = fields.internalmemo_detail_id;
				var group_id =  fields.group_id == 1 ? 0 : fields.group_id;
				var reward_id = fields.reward_id;
				var amount = accounting.unformat(fields.amount);
				var notes = fields.notes;
				var group_name = me.getFormdatadetail().down('[name=group_id]').getRawValue();
				var reward = me.getFormdatadetail().down('[name=reward_id]').getRawValue();

				if (state == "update") {
					storeGrid = me.getGriddetail().getStore().getAt(me.getGriddetail().getSelectedRow());
					storeGrid.set('internalmemo_detail_id', internalmemo_detail_id);
					storeGrid.set('internalmemo_id', internalmemo_id);
					storeGrid.set('group_id', group_id);
					storeGrid.set('group_name', group_name);
					storeGrid.set('reward_id', reward_id);
					storeGrid.set('amount', amount);
					storeGrid.set('notes', notes);
					storeGrid.set('reward', reward);
				} else {
					myStore.add({
						internalmemo_detail_id: internalmemo_detail_id,
						internalmemo_id: internalmemo_id,
						group_id: group_id,
						group_name: group_name,
						reward_id: reward_id,
						reward: reward,
						amount: amount,
						notes: notes,
						deleted: 0
					});
				}
				me.getFormdatadetail().up('window').close();
			}
		}
	},
	dataSave: function () {
		var me = this;

		var form = me.getFormdata().getForm();
		if (form.isValid()) {
			var store = me.getGriddetail().getStore();
			me.dataSaveConfirm(store);
		}
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
    },
	dataSaveConfirm: function (store) {
		var me = this;

		store.clearFilter(true);
		var data = [];

		for (var i = 0; i < store.getCount(); i++){
			store.each(function (record, idx) {
				if (i == idx) {
					data[i] = record.data;
				}
			});
		}

		var fields = me.getFormdata().getValues();

		var myObj = {
			internalmemo_detail_id: fields.internalmemo_detail_id,
			internalmemo_id: fields.internalmemo_id,
			nomor_im: fields.nomor_im,
			tanggal_im: fields.tanggal_im,
			periode_start: fields.periode_start,
			periode_end: fields.periode_end,
			description: fields.description,
			data_detail: data
		}

		resetTimer();
		me.getFormdata().up('window').body.mask('Saving, please wait ...');
		Ext.Ajax.request({
			url: 'erems/masterim/create',
			params: {
				data: Ext.encode(myObj)
			},
			success: function (response) {
				me.getFormdata().up('window').body.unmask();
				if (Ext.decode(response.responseText).success == true){
					Ext.Msg.show({
						title: 'Success',
						msg: 'Data saved successfully.',
						icon: Ext.Msg.INFO,
						buttons: Ext.Msg.OK,
						fn: function () {
							me.getFormdata().up('window').close();
							var gridDepan = me.getGrid();
							var storeDepan = gridDepan.getStore();
							storeDepan.reload();
						}
					});
				} else {
					Ext.Msg.show({
						title: 'Failure',
//						msg: 'Error: Unable to save data.',
						msg: Ext.decode(response.responseText).message,
						icon: Ext.Msg.ERROR,
						buttons: Ext.Msg.OK
					});
				}
			},
		});
	},
	dataDetailDestroy: function () {
		var me = this;
		var rows = me.getGriddetail().getSelectionModel().getSelection();

		if (rows.length < 1) {
			Ext.Msg.alert('Info', 'No record selected !');
			return;
		} else {
			var confirmmsg, successmsg, failmsg;
			var recordcounttext = rows.length + ' record' + (rows.length > 1 ? 's' : '');
			var store = me.getGriddetail().getStore();
			if (rows.length == 1) {
				var selectedRecord = '[' + store.getAt(store.indexOf(rows[0])).get('group_name') + ' - ' + store.getAt(store.indexOf(rows[0])).get('reward') + ']';
				confirmmsg = 'Delete ' + selectedRecord + ' ?';
				failmsg = 'Error: Unable to delete ' + selectedRecord + '.';
			} else {
				confirmmsg = 'This action will delete ' + recordcounttext + '.<br />Continue ?';
				failmsg = 'Error: Unable to delete data.';
			}
			Ext.Msg.confirm('Delete Data', confirmmsg, function (btn) {
				if (btn == 'yes') {
					resetTimer();
					var msg = function () {
						me.getGriddetail().up('window').mask('Deleting data, please wait ...');
					};
					for (var i = 0; i < rows.length; i++) {
						if (rows[i].get('internalmemo_detail_id') == 0) {
							store.remove(rows[i]);
						} else {
							rows[i].set("deleted", 1);
						}
					}

                    store.on('beforesync', msg);
                    store.sync({
                        success: function(s) {
                            var res = Ext.decode(s.operations[0].response.responseText).total[0] == undefined ? 1 : 0;
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
                            me.getGriddetail().up('window').unmask();
                        },
                        failure: function() {
                            store.un('beforesync', msg);
                            store.reload();
                            Ext.Msg.show({
                                title: 'Failure',
                                msg: failmsg + ' <br/>The data may have been used.',
                                icon: Ext.Msg.ERROR,
                                buttons: Ext.Msg.OK
                            });
                            me.getGriddetail().up('window').unmask();
                        }
                    });
					me.getGriddetail().getStore().filterBy(function (recod) {
						return recod.data.deleted == 0;
					});
				}
			});
		}
	},
	gridDetailSelectionChange: function () {
		var me = this;
		var grid = me.getGriddetail(), row = grid.getSelectionModel().getSelection();
		var edit = grid.down('#btnEdit');
		var deleteb = grid.down('#btnDelete');
		if (edit !== null) {
			edit.setDisabled(row.length != 1);
		}
		if (deleteb !== null) {
			deleteb.setDisabled(row.length < 1);
		}
	},
    changeGroup : function(){
        var me             = this;
        var val            = me.getFormdatadetail().down("[name=group_id]").getValue();
        var groupId        = val == 1 ? 0 : val;
        var selectorReward = me.getFormdatadetail().down("[name=reward_id]");

        selectorReward.setValue('');
        selectorReward.setReadOnly(false);

        fType = new Array();
        fType.push(selectorReward.valueField);
        fType.push(selectorReward.displayField);

        if(!Boolean(me.setVar.masterreward)){
            me.setVar.masterreward = me.getDatamasterreward();
        }

        var optionsx = [];
        me.setVar.masterreward.forEach(function(v, i, arr){
            if(v.group_id == groupId){
                v.name = v.name.trim();
                optionsx.push(v);
            }
        });

        var newStore = Ext.create('Ext.data.Store', {
            fields : fType,
            data   : optionsx
        });
        selectorReward.bindStore(newStore);
    },
    setVariableeditrow : function(row){
        var me = this;
        me.setVar.editingIndexRow = row;
    },
    getDatamasterreward : function(){
        var result = Ext.JSON.decode(
            Ext.Ajax.request({
                url     : 'erems/purchaseletterreward/read',
                method  : 'POST',
                timeout : 45000000,
                async   : false,
                params  : {mode_read : 'masterreward', page : 1, start : 0, limit : 25, group_id : -1}
            }).responseText
        );

        var data = [];
        if(result.success){
            data = result.data;
        }
        return data;
    },
});