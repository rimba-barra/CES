Ext.define('Erems.controller.Scheduletype', {
    extend: 'Erems.library.template.controller.Controller',
    alias: 'controller.Scheduletype',
    views: ['scheduletype.Panel', 'scheduletype.Grid', 'scheduletype.FormSearch', 'scheduletype.FormData'],
    stores: ['Scheduletype'],
    models: ['Scheduletype'],
    refs: [
        {
            ref: 'grid',
            selector: 'scheduletypegrid'
        },
        {
            ref: 'formsearch',
            selector: 'scheduletypeformsearch'
        },
        {
            ref: 'formdata',
            selector: 'scheduletypeformdata'
        }
    ],
    controllerName: 'scheduletype',
    fieldName: 'scheduletype',
    bindPrefixName:'Scheduletype',
    init: function(application) {
        var me = this;
        this.control({
            'scheduletypepanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender
             
            },
            'scheduletypegrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange
            },
            'scheduletypegrid toolbar button[action=create]': {
                click: function() {
                  //  alert('Hello');
                  //  this.formDataShow('create');
                }
            },
            'scheduletypegrid toolbar button[action=update]': {
                click: function() {
                    this.formDataShow('update');
                }
            },
            'scheduletypegrid toolbar button[action=destroy]': {
                click: this.dataDestroy
            },
            'scheduletypegrid toolbar button[action=print]': {
                click: this.dataPrint
            },
            'scheduletypegrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                click: this.gridActionColumnClick
            },
            'scheduletypeformsearch button[action=search]': {
                click: this.dataSearch
            },
            'scheduletypeformsearch button[action=reset]': {
                click: this.dataReset
            },
            'scheduletypeformdata': {
                afterrender: this.formDataAfterRender
            },
            'scheduletypeformdata button[action=save]': {
                click: this.dataSave
            },
            'scheduletypeformdata button[action=cancel]': {
                click: this.formDataClose
            }

        });
    },
    // added 17 maret 2021
    dataSave: function() {
        var me = this;
        var form = me.getFormdata().getForm();
        var addingRecord = false;
        if (!me.finalValidation()) {
            return false;
        }
       
        // added 31 maret 2021
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

        if(form.getValues().scheduletype == ''){
            Ext.Msg.show({
                title: 'Warning',
                msg: 'Schedule Type is empty.',
                icon: Ext.Msg.ERROR,
                buttons: Ext.Msg.OK
            });
        }else{
            if (form.isValid() && vps) {
                resetTimer();
                var store = null;
                var fida = me.getFinalData(form.getValues());
                if (me.instantCreateMode) {
                    store = _Apps.getController(me.callerId).getInstanCreateStorex(me.controllerName);
                } else {
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
                    success: function(s){
                        var res = Ext.decode(s.operations[0].response.responseText);

                        if(res == 1){
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
                        }else{
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
                                // if (typeof Ext.StoreManager.lookup(me.stores[0]) != 'undefined') {
                                //     Ext.StoreManager.lookup(me.stores[0]).load({params: {limit: 0}});
                                // }
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