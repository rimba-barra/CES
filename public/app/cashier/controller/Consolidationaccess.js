Ext.define('Cashier.controller.Consolidationaccess', {
    extend: 'Cashier.library.template.controller.Controllermodule',
    alias: 'controller.Consolidationaccess',
    requires: [
        'Ext.EventObject',
        'Cashier.template.ComboBoxFields',
        'Cashier.library.template.combobox.Usermodulecashierallcombobox',
        'Cashier.library.template.combobox.Consolidationv2combobox',
    ],
    views: [
        'consolidationaccess.Panel',
        'consolidationaccess.Grid',
        'consolidationaccess.FormSearch',
        'consolidationaccess.FormData',
    ],
    stores: [
        'Consolidationaccess',
        'Usermodulecashierall',
        'Consolidationv2',
    ],
    models: [
        'Consolidationaccess',
        'Usermodulecashierall',
        'Consolidationv2',
    ],
    refs: [
        {ref: 'grid', selector: 'consolidationaccessgrid'},
        {ref: 'formsearch', selector: 'consolidationaccessformsearch'},
        {ref: 'formdata', selector: 'consolidationaccessformdata'},
    ],
    urldata: 'cashier/consolidationaccess/',
    controllerName: 'consolidationaccess',
    fieldName: 'user_email',
    bindPrefixName: 'Consolidationaccess',
    rowproject: null, storept: null, state: null,
    init: function (application) {
        var me = this;
        this.control({
            'consolidationaccessgrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange
            },
            'consolidationaccesspanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender
            },
            'consolidationaccessgrid toolbar button[action=destroy]': {
                click: this.dataDestroy
            },
            'consolidationaccessgrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                click: this.gridActionColumnClick
            },
            'consolidationaccessformsearch button[action=search]': {
                click: this.dataSearch
            },
            'consolidationaccessformsearch button[action=reset]': {
                click: this.dataReset
            },
            'consolidationaccessformdata': {
                afterrender: function () {
                    this.formDataAfterRenderCustome();
                }
            },
            'consolidationaccessformsearch': {
                afterrender: function () {
                    this.formSearchAfterRenderCustome();
                }
            },
            'consolidationaccessformdata button[action=save]': {
                click: this.dataSaveCustome,
            },
        });
    },
    formDataAfterRenderCustome: function () {
        var me, storeuser, storeconsolidation, grid, store, record, counter;
        me = this;

        var form = me.getFormdata();
        var state_submit = form.up('window').state.toLowerCase();

        if ( state_submit == 'create' ) {
            storeuser = me.getStore('Usermodulecashierall');
            storeuser.load({
                params: {
                    "hideparam": 'usermodulecashierall',
                    "start": 0,
                    "limit": 1000000,
                    "project_id": apps.project,
                    "pt_id": apps.pt
                },
                callback: function (records, operation, success) {
                    
                }
            });
            
            storeconsolidation = me.getStore('Consolidationv2');
            storeconsolidation.load({
                params: {
                    "hideparam": 'consolidationv2',
                    "start": 0,
                    "limit": 1000000,
                    "project_id": apps.project,
                    "pt_id": apps.pt
                },
                callback: function (records, operation, success) {
                    
                }
            });
        } else {
            me.fdar().update();
            grid = me.getGrid();
            store = grid.getStore();
            record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));
            counter = store.getCount();
            if (record == null || record==false || record.length < 1){
                Ext.Msg.alert('Warning', 'Please select data.');
                return 0;
            }

            if (counter > 0) {
                row = record['data'];

                storeuser = me.getStore('Usermodulecashier');
                storeuser.load({
                    params: {
                        "hideparam": 'usermodulecashier',
                        "start": 0,
                        "limit": 1000000,
                        "project_id": apps.project,
                        "pt_id": apps.pt
                    },
                    callback: function (records, operation, success) {
                        storeuser.each(function(rec) {
                            if (rec.data.user_id == row.user_id) {
                                form.down("[name=user_user_id]").setValue(parseInt(rec.data.user_id));
                            }
                        });
                    }
                });
                
                storeconsolidation = me.getStore('Consolidationv2');
                storeconsolidation.load({
                    params: {
                        "hideparam": 'consolidationv2',
                        "start": 0,
                        "limit": 1000000,
                        "project_id": apps.project,
                        "pt_id": apps.pt
                    },
                    callback: function (records, operation, success) {

                    }
                });

            }
        }
    },
    formSearchAfterRenderCustome: function () {
        var me, storeuser, storeconsolidation, grid, store, record, counter;
        me = this;

        storeconsolidation = me.getStore('Consolidationv2');
        storeconsolidation.load({
            params: {
                "hideparam": 'consolidationv2',
                "start": 0,
                "limit": 1000000,
                "project_id": apps.project,
                "pt_id": apps.pt
            },
            callback: function (records, operation, success) {
                
            }
        });
    },
    dataSaveCustome: function() {
        var me = this;
        var f = me.getFormdata();
        f.down("[name=hideparam]").setValue('default');

        var form = f.getForm();

        //console.log(form.getValues());
        var addingRecord = false;
        if (!me.finalValidation()) {
            return false;
        }

        var vp = me.validationProcess();
        var vps = false; // validation prosess status
        if (typeof vp === 'object') {
            vps = vp.status;
            if (!vps) {

                Ext.MessageBox.alert('Alert', vp.msg, function () {
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


        if (form.isValid() && vps) {
            resetTimer();
            me.unformatCurrencyFormdata(me, f);
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
                    //console.log(store);
                } else {
                    store = me.storeProcess;
                }
            }

            var msg = function () {
                me.getFormdata().up('window').body.mask('Saving data, please wait ...');
            };
            var state_submit = me.getFormdata().up('window').state.toLowerCase();

            switch (state_submit) {
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

            Ext.Ajax.request({
                url: me.urldata + state_submit,
                method: 'POST',
                params: {
                    data: Ext.encode(fida),
                },
                success: function (response) {
                    var info = Ext.JSON.decode(response.responseText);
                    me.messagedata = info.msg;
                    if (info.success != 'false') {
                        me.alertFormdataSuccess();
                    } else {
                        me.alertFormdataFailed();
                    }
                }
            });

        }
    },
    alertFormdataSuccess: function() {
        var me, form, store;
        me = this;
        form = me.getFormdata();
        form.up('window').body.unmask();
        Ext.Msg.show({
            title: 'Success',
            msg: me.messagedata,
            icon: Ext.Msg.INFO,
            buttons: Ext.Msg.OK,
            fn: function() {
                me.getFormdata().up('window').close();
                me.getGrid().getStore().reload();
            }
        });
    },
    alertFormdataFailed: function() {
        var me, form, store;
        me = this;
        me.getGrid().getStore().reload();
        form = me.getFormdata();
        form.up('window').body.unmask();
        Ext.Msg.show({
            title: 'Failure',
            msg: 'Error: ' + me.messagedata,
            icon: Ext.Msg.ERROR,
            buttons: Ext.Msg.OK
        });
    },
    
});