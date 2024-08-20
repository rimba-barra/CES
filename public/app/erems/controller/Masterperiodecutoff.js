Ext.define('Erems.controller.Masterperiodecutoff', {
    extend : 'Erems.library.template.controller.Controlleralt',
    alias  : 'controller.Masterperiodecutoff',
    views  : ['masterperiodecutoff.Panel', 'masterperiodecutoff.Grid', 'masterperiodecutoff.FormSearch', 'masterperiodecutoff.FormData'],
    stores : ['Masterperiodecutoff', 'Masterparameterglobal'],
    models : ['Masterperiodecutoff', 'Masterparameterglobal'],
    refs   : [
        {
            ref      : 'grid',
            selector : 'masterperiodecutoffgrid'
        },
        {
            ref      : 'formsearch',
            selector : 'masterperiodecutoffformsearch'
        },
        {
            ref      : 'formdata',
            selector : 'masterperiodecutoffformdata'
        },
    ],
    controllerName     : 'masterperiodecutoff',
    fieldName          : 'periode',
    bindPrefixName     : 'Masterperiodecutoff',
    nomorValue         : 1,
    formWidth          : 800,
    enableSelectKPR    : 0,
    discount_rate_year : 12,
    isSafetyFactor     : false,
    safetyfactor       : false,
    constructor        : function (configs) {
        this.callParent(arguments);
        var me = this;
        this.myConfig = new Erems.library.box.Config({
            _controllerName: me.controllerName
        });

        me.cbf = new Erems.template.ComboBoxFields();
    },
    init : function (application) {
        var me = this;
        me.tools = new Erems.library.box.tools.Tools({ config: me.myConfig });
        this.control({
            'masterperiodecutoffpanel': {
                beforerender : me.mainPanelBeforeRender,
                afterrender  : this.panelAfterRender
            },
            'masterperiodecutoffgrid': {
                afterrender     : this.gridAfterRender,
                itemdblclick    : this.gridItemDblClick,
                itemcontextmenu : this.gridItemContextMenu,
                selectionchange : this.gridSelectionChange
            },
            'masterperiodecutoffgrid toolbar button[action=create]': {
                click: function () {
                    this.formDataShow('create');
                }
            },
            'masterperiodecutoffgrid toolbar button[action=update]': {
                click: function () {
                    this.formDataShow('update');
                }
            },
            'masterperiodecutoffgrid toolbar button[action=destroy]': {
                click: me.dataDestroy
            },
            'masterperiodecutoffformsearch': {
                afterrender: this.formSearchAfterRender
            },
            'masterperiodecutoffformsearch button[action=search]': {
                click: this.dataSearch
            },
            'masterperiodecutoffformsearch button[action=reset]': {
                click: this.dataReset
            },
            'masterperiodecutoffformdata': {
                beforerender : this.formDataBeforeRender,
                afterrender  : this.formDataAfterRender
            },
            'masterperiodecutoffformdata button[action=save]': {
                click: this.dataSave
            },
            'masterperiodecutoffformdata button[action=cancel]': {
                click: this.formDataClose
            },
        });
    },
    panelAfterRender: function (el) {
    },
    dataDestroy: function () {
        var me = this;
        var rows = me.getGrid().getSelectionModel().getSelection();
        if (rows.length < 1) {
            Ext.Msg.alert('Info', 'No record selected !');
            return;
        } 
        else {
            var confirmmsg, 
                successmsg, 
                selectedRecord, 
                store = me.getGrid().getStore();

            selectedRecord = '[' + store.getAt(store.indexOf(rows[0])).get('periode') + ']';
            confirmmsg = 'Delete ' + selectedRecord + ' ?';

            Ext.Msg.confirm('Delete Data', confirmmsg, function (btn) {
                if (btn == 'yes') {
                    resetTimer();
                    var msg = function () {
                        me.getGrid().up('window').mask('Deleting data, please wait ...');
                    };

                    for (var i = 0; i < rows.length; i++) {
                        store.remove(rows[i]);
                    }

                    store.on('beforesync', msg);
                    store.sync({
                        success: function (s) {
                            me.getGrid().up('window').unmask();
                            store.un('beforesync', msg);
                            store.reload();
                            if (typeof Ext.StoreManager.lookup(me.stores[0]) != 'undefined') {
                                Ext.StoreManager.lookup(me.stores[0]).load({ params: { limit: 0 } });
                            }
                            Ext.Msg.show({
                                title   : 'Success',
                                msg     : 'Data deleted successfully.',
                                icon    : Ext.Msg.INFO,
                                buttons : Ext.Msg.OK
                            });
                        },
                        failure: function () {
                            me.getGrid().up('window').unmask();
                            store.un('beforesync', msg);
                            store.reload();
                            Ext.Msg.show({
                                title   : 'Failure',
                                msg     : 'Error : Unable to delete data.',
                                icon    : Ext.Msg.ERROR,
                                buttons : Ext.Msg.OK
                            });
                        }
                    });
                }
            });
        }
    },
    getActiveForm: function () {
        return this.activeForm;
    },
    formDataBeforeRender: function (el) {
        var me = this;
    },
    getFinalData: function (formGetValues) {
        var finalData = formGetValues;
        return finalData;
    },
    dataSave: function () {
        var me = this;
        var form = me.getFormdata().getForm();

        if (form.isValid()) {
            resetTimer();
            var store = null;
            var fida = form.getValues();

            if (me.instantCreateMode) {
                store = _Apps.getController(me.callerId).getInstanCreateStorex(me.controllerName);
            } else {
                if (!me.storeProcess) {
                    store = me.getGrid().getStore();
                } else {
                    store = me.storeProcess;
                }
            }

            var msg = function () {
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
                success: function () {
                    me.getFormdata().up('window').body.unmask();
                    store.un('beforesync', msg);
                    store.reload();

                    if (typeof Ext.StoreManager.lookup(me.stores[0]) != 'undefined') {
                        Ext.StoreManager.lookup(me.stores[0]).load({ params: { limit: 0 } });
                    }
                    Ext.Msg.show({
                        title   : 'Success',
                        msg     : 'Data saved successfully.',
                        icon    : Ext.Msg.INFO,
                        buttons : Ext.Msg.OK,
                        fn      : function () {
                            me.formDataClose();
                        }
                    });
                },
                failure: function (batch, op) {
                    var jsD = batch.proxy.getReader().jsonData;
                    var erMsg = "Unable to process data.";
                    if (typeof jsD.msg !== "undefined") {
                        erMsg = jsD.msg;
                    }

                    me.getFormdata().up('window').body.unmask();
                    store.un('beforesync', msg);
                    if (store.getCount() > 0 && addingRecord) {
                        store.removeAt(store.getCount() - 1);
                    }
                    store.reload();

                    var msgJson = jsD.msg;
                    if (!msgJson) {
                        Ext.Msg.show({
                            title   : 'Failure',
                            msg     : 'Message : ' + erMsg,
                            icon    : Ext.Msg.ERROR,
                            buttons : Ext.Msg.OK
                        });
                    } else {
                        Ext.Msg.show({
                            title   : 'Warning',
                            msg     : 'Message : ' + erMsg,
                            icon    : Ext.Msg.WARNING,
                            buttons : Ext.Msg.OK
                        });
                    }
                }
            });
        }
    },
    fdar: function () {
        var me = this;
        var f = me.getFormdata();
        var x = {
            init: function () {
            },
            create: function () {
            },
            update: function () {
                var grid   = me.getGrid();
                var store  = grid.getStore();
                var record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));
                me.getFormdata().loadRecord(record);
            }
        };
        return x;
    },
});