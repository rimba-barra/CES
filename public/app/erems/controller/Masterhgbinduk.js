Ext.define('Erems.controller.Masterhgbinduk', {
    extend: 'Erems.library.template.controller.Controlleralt',
    alias: 'controller.Masterhgbinduk',
    views: ['masterhgbinduk.Panel', 'masterhgbinduk.Grid', 'masterhgbinduk.FormSearch', 'masterhgbinduk.FormData'],
    stores: ['Masterhgbinduk','Masterdata.store.Projectpt'],
    models: ['Masterhgbinduk','Masterdata.model.Projectpt'],
    refs: [
        {
            ref: 'grid',
            selector: 'masterhgbindukgrid'
        },
        {
            ref: 'formsearch',
            selector: 'masterhgbindukformsearch'
        },
        {
            ref: 'formdata',
            selector: 'masterhgbindukformdata'
        },
    ],
    controllerName: 'masterhgbinduk',
    fieldName: 'code',
    bindPrefixName:'Masterhgbinduk',
	formWidth: 600,
    init: function(application) {
        var me = this;
        this.control({
            'masterhgbindukpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender
             
            },
            'masterhgbindukgrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange
            },
            'masterhgbindukgrid toolbar button[action=create]': {
                click: function() {
                    this.formDataShow('create');
                }
            },
            'masterhgbindukgrid toolbar button[action=update]': {
                click: function() {
                    this.formDataShow('update');
                }
            },
            'masterhgbindukgrid toolbar button[action=destroy]': {
                click: this.dataDestroy
            },
            'masterhgbindukgrid toolbar button[action=print]': {
                click: this.dataPrint
            },
            'masterhgbindukgrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                click: this.gridActionColumnClick
            },
            'masterhgbindukformsearch button[action=search]': {
                click: this.dataSearch
            },
            'masterhgbindukformsearch button[action=reset]': {
                click: this.dataReset
            },
            'masterhgbindukformdata': {
                afterrender: this.formDataAfterRender
            },
            'masterhgbindukformdata button[action=save]': {
                click: this.dataSave
            },
            'masterhgbindukformdata button[action=cancel]': {
                click: this.formDataClose
            },
			'masterhgbindukformdata #project_id_owner': {
                change: this.projectChange,
                select: this.projectSelect
            },
			
			 /* BROWSE CONTROL */
            'masterhgbindukbrowsepanel': {
                beforerender: me.browsepanelBeforeRender
            },
            'masterhgbindukbrowsepanel button[action=select]':{
                click:me.browsegridSelection
            },
            'masterhgbindukbrowsegrid':{
                afterrender:me.browsegridAfterRender
            },
			'masterhgbindukbrowseformsearch button[action=search]': {
                click: me.browsedataSearch
            },
			'masterhgbindukbrowseformsearch button[action=reset]': {
                click: me.browsedataReset
            },
            // start Addby Fatkur Addon 6/8/19
            'masterhgbindukgrid toolbar button[action=export_excel]': {
                click: function(el) {
                    this.dataExport(el);
                }
            }
            // end
            /* END BROWSE CONTROL */

        });
    },
    
	formDataAfterRender: function(el) {
		var me = this;

        me.storeProcess = me.createSpProcessObj(me.storeProcess);
        me.fdar().init();

        me.loadComboBoxStore(el);
        var state = el.up('window').state;

        if (state == 'create') {
            me.fdar().create();
        } else if (state == 'update') {
            me.fdar().update();
        }
		
		var ppStore = Ext.StoreManager.lookup('Masterdata.store.Projectpt');
			ppStore.removeAll();
			ppStore.load({params: {start:0,limit:0}, 
				callback: function(rec) {
					var store2,
						store3;
					
					store2=Ext.create('Ext.data.Store', {
						fields:['project_id','project_name']
					});
					store3=Ext.create('Ext.data.Store', {
						model:store2.model,recordType:store2.recordType
					});
					var projectrecords=[],ptrecords=[];
					
					Ext.each(ppStore.collect('project_id'),function(x){
						ppStore.each(function(r){
							//console.log(r);
							
							if(x==r.get('project_id')){
								projectrecords[x]={
									'project_id':x,'project_name':r.get('project_name')
								}
							}
						});
					});
					
					Ext.each(projectrecords,function(x){
						if(Ext.isObject(x)){
							store2.add(x)
						}
					});
					ppStore.each(function(r){
						store3.add(r)
					});
					
					el.down('#project_id_owner').bindStore(store2);
					el.down('#pt_id_owner').bindStore(store3);
					
					if (state == 'update') {
						var grid = me.getGrid();
						var store = grid.getStore();
					
						var record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));
						me.getFormdata().down('#project_id_owner').setValue(record.data.project_id_owner);
						me.getFormdata().down('#pt_id_owner').setValue(record.data.pt_id_owner);
						me.getFormdata().down('#pt_id_owner').getStore().filter('project_id', record.data.project_id_owner);
						me.getFormdata().down('#pt_id_owner').setReadOnly(false);
					}
				}
			});
			
	},
	
	projectChange: function(el) {
		var me = this;
        me.getFormdata().down('#pt_id_owner').getStore().clearFilter();
		me.getFormdata().down('#pt_id_owner').setValue('');
		me.getFormdata().down('#pt_id_owner').setReadOnly(true);
    },
	
	projectSelect: function(el) {
		var me = this;
        me.getFormdata().down('#pt_id_owner').getStore().filter('project_id', me.getFormdata().down('#project_id_owner').getValue());
		me.getFormdata().down('#pt_id_owner').setReadOnly(false);
    },
    dataExport: function(el) {
		var me = this;
		var export_type = 'excelmasterhgbinduk';
		el.up('window').body.mask('Creating Excel File, Please Wait...');
		
		Ext.Ajax.timeout = 60000*30;
		
		Ext.Ajax.request({
			url: 'erems/masterhgbinduk/read/?action=schema',
			params: {
					popup_type: export_type,
					export_excel: 1
				},
			success: function(response) {
				try{
					var resp = response.responseText;
					
					if(resp) {
						var info = Ext.JSON.decode(resp);
						
						if(info.success == true){
							el.up('window').body.unmask();
							Ext.Msg.show({
								title: 'Info',
								msg: '<a href="' + info.url + '" target="blank">Click Here For Download Excel File</a>',
								icon: Ext.Msg.INFO,
								//buttons: [], //jika ingin tidak ada buttons
								buttons: Ext.Msg.CANCEL,
								buttonText : 
								{
									cancel : 'Close',
								}
							});
						} else {
							el.up('window').body.unmask();
							Ext.Msg.show({
								title: 'Failure',
								msg: 'Error: Export to Excel Failed.',
								icon: Ext.Msg.ERROR,
								buttons: Ext.Msg.OK
							});
						}
					}
				}catch(e){
					//console.error(e);
					el.up('window').body.unmask();
					Ext.Msg.show({
                        title: 'Failure',
                        msg: 'Error: Export to Excel Failed.',
                        icon: Ext.Msg.ERROR,
                        buttons: Ext.Msg.OK
                    });
			  	}
			},
			failure: function(e){
				//console.error(e);
				el.up('window').body.unmask();
				Ext.Msg.show({
					title: 'Failure',
					msg: 'Error: Export to Excel Failed.',
					icon: Ext.Msg.ERROR,
					buttons: Ext.Msg.OK
				});
			}
		});
    },
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
                success: function(s) {
                    var res = Ext.decode(s.operations[0].response.responseText);
                    
                    console.log(res);

                    if(res != 1){
                        me.getFormdata().up('window').body.unmask();
                        store.un('beforesync', msg);
                        store.reload();

                        if (typeof Ext.StoreManager.lookup(me.stores[0]) != 'undefined') {
                            Ext.StoreManager.lookup(me.stores[0]).load({params: {limit: 0}});
                        }
                        Ext.Msg.show({
                            title: 'Failure',
                            msg: res[0].message,
                            icon: Ext.Msg.ERROR,
                            buttons: Ext.Msg.OK
                        });
                    }else{
                        me.getFormdata().up('window').body.unmask();
                        store.un('beforesync', msg);
                        store.reload();

                        if (typeof Ext.StoreManager.lookup(me.stores[0]) != 'undefined') {
                            Ext.StoreManager.lookup(me.stores[0]).load({params: {limit: 0}});
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
                    }
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
                        msg: 'Error: Unable to save data.',
                        icon: Ext.Msg.ERROR,
                        buttons: Ext.Msg.OK
                    });
                }
            });
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
                                title   : 'Failure',
                                msg     : failmsg + ' <br/>The data may have been used.',
                                icon    : Ext.Msg.ERROR,
                                buttons : Ext.Msg.OK
                            });
                        }
                    });
                }
            });
        }
    }
});