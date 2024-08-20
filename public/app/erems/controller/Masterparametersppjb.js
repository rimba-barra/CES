Ext.define('Erems.controller.Masterparametersppjb', {
    extend : 'Erems.library.template.controller.Controlleralt',
    alias  : 'controller.Masterparametersppjb',
    views  : ['masterparametersppjb.Panel', 'masterparametersppjb.Grid', 'masterparametersppjb.FormSearch', 'masterparametersppjb.FormData'],
    stores : ['Masterparametersppjb'],
    models : ['Masterparametersppjb'],
    refs   : [
        {
            ref      : 'grid',
            selector : 'masterparametersppjbgrid'
        },
        {
            ref      : 'formsearch',
            selector : 'masterparametersppjbformsearch'
        },
        {
            ref      : 'formdata',
            selector : 'masterparametersppjbformdata'
        }
    ],
    controllerName : 'masterparametersppjb',
    fieldName      : 'code',
    bindPrefixName :'Masterparametersppjb',
    formWidth      : 500,
    init           : function(application) {
        var me = this;
        this.control({
            'masterparametersppjbpanel': {
                beforerender : me.mainPanelBeforeRender,
                afterrender  : this.panelAfterRender
            },
            'masterparametersppjbgrid': {
                afterrender     : this.gridAfterRender,
                itemdblclick    : this.gridItemDblClick,
                itemcontextmenu : this.gridItemContextMenu,
                selectionchange : this.gridSelectionChange
            },
            'masterparametersppjbgrid toolbar button[action=create]': {
                click: function() {
                    this.formDataShow('create');
                }
            },
            'masterparametersppjbgrid toolbar button[action=update]': {
                click: function() {
                    this.formDataShow('update');
                }
            },
            'masterparametersppjbgrid toolbar button[action=destroy]': {
                click: this.dataDestroy
            },
            'masterparametersppjbgrid toolbar button[action=print]': {
                click: this.dataPrint
            },
            'masterparametersppjbgrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                click: this.gridActionColumnClick
            },
            'masterparametersppjbformsearch button[action=search]': {
                click: this.dataSearch
            },
            'masterparametersppjbformsearch button[action=reset]': {
                click: this.dataReset
            },
            'masterparametersppjbformdata': {
                afterrender: this.formDataAfterRender
            },
            'masterparametersppjbformdata button[action=save]': {
                click: this.dataSave
            },
            'masterparametersppjbformdata button[action=cancel]': {
                click: this.formDataClose
            },
			
			 /* BROWSE CONTROL */
            'masterparametersppjbbrowsepanel': {
                beforerender: me.browsepanelBeforeRender
            },
            'masterparametersppjbbrowsepanel button[action=select]':{
                click:me.browsegridSelection
            },
            'masterparametersppjbbrowsegrid':{
                afterrender:me.browsegridAfterRender
            },
			'masterparametersppjbbrowseformsearch button[action=search]': {
                click: me.browsedataSearch
            },
			'masterparametersppjbbrowseformsearch button[action=reset]': {
                click: me.browsedataReset
            }
            /* END BROWSE CONTROL */

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
                store = _myAppGlobal.getController(me.callerId).getInstanCreateStorex(me.controllerName);
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
                    var res = Ext.decode(s.operations[0].response.responseText).success;

                    if(res == 1){
                        me.getFormdata().up('window').body.unmask();
                        store.un('beforesync', msg);
                        store.reload();

                        if (typeof Ext.StoreManager.lookup(me.stores[0]) != 'undefined') {
                            Ext.StoreManager.lookup(me.stores[0]).load({params: {limit: 25}});
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
                    }else{
                        me.getFormdata().up('window').body.unmask();
                        store.un('beforesync', msg);
                        store.reload();

                        if (typeof Ext.StoreManager.lookup(me.stores[0]) != 'undefined') {
                            Ext.StoreManager.lookup(me.stores[0]).load({params: {limit: 25}});
                        }
                        Ext.Msg.show({
                            title: 'Failure',
                            msg: res[0].message,
                            icon: Ext.Msg.ERROR,
                            buttons: Ext.Msg.OK
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
        }else{
            Ext.Msg.show({
                title: 'Failure',
                msg: me.checkRequired(form)+' is required.',
                icon: Ext.Msg.ERROR,
                buttons: Ext.Msg.OK
            });
        }
    },
    // added by rico 21062021
    checkRequired: function(form){
        var me   = this;
        var items = form.getFields().items;
        var label = [];
        for(var i=0;i<items.length;i++){
            if(!items[i].allowBlank && (items[i].activeError != '' && typeof items[i].activeError !== 'undefined') && items[i].xtype != 'hiddenfield'){
                label.push(items[i].fieldLabel);
            }
        }
        return label.join();
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