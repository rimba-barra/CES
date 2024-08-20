Ext.define('Gl.controller.Postingstepdua', {
    extend: 'Gl.library.template.controller.Controllergl',
    alias: 'controller.Postingstepdua',
    requires: [
         'Gl.template.ComboBoxFields',
         'Gl.library.template.combobox.Ptusercombobox',
         'Gl.library.template.combobox.Voucherprefixcombobox',
         'Gl.library.template.checkbox.CheckColumnpostingtogl',
    ],
    views: [
        'postingstepdua.Panel',
        'postingstepdua.Grid',
        'postingstepdua.FormSearch',
        'postingstepdua.FormData',
    ],
    stores: [
        'Postingstepdua',
        'Ptbyuser',
        'Voucherprefixsetupcombo',
    ],
    models: [
        'Postingstepdua',
    ],
    refs: [
        {ref: 'grid', selector: 'postingstepduagrid'},
        {ref: 'formsearch', selector: 'postingstepduaformsearch'},
        {ref: 'formdata', selector: 'postingstepduaformdata'},
        {ref: 'checkpostingtogl', selector: 'checkcolumnpostingtogl'},
    ],
    controllerName: 'postingstepdua',
    fieldName: 'postingstepdua',
    bindPrefixName: 'Postingstepdua',
    state: null,
    urlcommon: 'cashier/common/create',
    urlrequest: 'gl/postingstepdua/create', senddata: null, info: null, message: null,
    init: function (application) {
        var me = this;
        this.control({
            'postingstepduapanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender

            },
            'postingstepduagrid': {
                afterrender: this.gridAfterRender,
            },
            'postingstepduagrid toolbar button[action=postingtogl]': {
                click: function () {
                    var me, grid, store, counter, row, i;
                    me = this;
                    grid = me.getGrid();
                    store = grid.getStore();
                    counter = store.getCount();
                    if (counter > 0) {
                        i = 0;
                        store.each(function (record) {
                            if (record['data'].is_postingstep2 !== 1) {
                                i++;
                            }
                        });
                        if (i == counter) {
                            me.buildWarningAlert(" Please checked posting to gl first, before your posting the data to gl ");
                        } else {
                            Ext.getBody().mask("Posting step 2 data...");
                            me.Processpostingtogl();
                        }
                    }
                }
            },
            'postingstepduagrid toolbar button[action=unposting]': {
                click: function () {
                    var me, grid, store, counter, row, i;
                    me = this;
                    grid = me.getGrid();
                    store = grid.getStore();
                    counter = store.getCount();
                    if (counter > 0) {
                        i = 0;
                        store.each(function (record) {
                            if (record['data'].is_postingstep2 !== 1) {
                                i++;
                            }
                        });
                        if (i == counter) {
                            me.buildWarningAlert(" No data selected!");
                        } else {
                            Ext.getBody().mask("Unposting step 2 data...");
                            me.Processunposting();
                        }
                    }
                }
            },
            'postingstepduagrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                click: this.gridActionColumnClick
            },
            'postingstepduagrid toolbar [name=checkallposting]': {
                change: function (that, newValue, oldValue, eOpt) {
                    var me, grid, store, counter;
                    me = this;
                    grid = me.getGrid();
                    store = grid.getStore();
                    counter = store.getCount();
                    if (newValue == true) {
                        if (counter > 0) {
                            store.each(function (record) {
                                record['data'].is_postingstep2 = 1;
                            });
                            grid.getView().refresh();
                        }
                    } else {
                        if (counter > 0) {
                            store.each(function (record) {
                                record['data'].is_postingstep2 = 0;
                            });
                            grid.getView().refresh();
                        }
                    }
                }
            },
            'checkcolumnpostingtogl': {
                'checkchange': function (column, recordIndex, checked) {
                    var me, grid, store, record, row, counter;
                    me = this;
                    grid = me.getGrid();
                    store = grid.getStore();
                    counter = store.getCount();
                    if (counter > 0) {
                        record = store.getAt(recordIndex);
                        record['data'].is_postingstep2 = (checked === true) ? 1 : 0;
                    }
                }
            },
            'postingstepduaformsearch': {
                afterrender: function () {
                    var me, store, arrayData;
                    me = this;
                    me.setStoreFormsearch();
                },
                boxready: function () {
                    var me;
                    me = this;
                    me.setStorePrefix();
                },
            },
            'postingstepduaformsearch [name=voucherprefix_id]': {
                'select': function (g, record, item, index, e, eOpts) {
                    var me, rowdata, form;
                    me = this;
                    form = me.getFormsearch();
                    rowdata = record[0]['data'];
                    me.setVal(form, 'prefix_id', rowdata.prefix_id);
                },
            },
            'postingstepduaformsearch button[action=search]': {
                click: this.dataSearch
            },
            'postingstepduaformsearch button[action=reset]': {
                click: this.dataReset
            },
            'postingstepduaformdata': {
                afterrender: this.formDataAfterRender
            },
            'postingstepduaformdata [name=postingstepdua] ': {
                'keyup': function () {
                    var me, value;
                    me = this;
                },
            },
            'postingstepduaformdata [name=objectname] ': {
                'keyup': function () {
                    var me, value;
                    me = this;
                },
            },
            'postingstepduaformdata button[action=save]': {
                click: this.dataSave
            },
            'postingstepduaformdata button[action=cancel]': {
                click: this.formDataClose
            },
        });
    },
    setStorePrefix: function () {
        var me, store;
        me = this;
        store = me.getStore("Voucherprefixsetupcombo");
        store.reload({
            params: {
                "hideparam": 'getvoucherprefixsetup',
                "start": 0,
                "limit": 1000,
            },
            callback: function (records, operation, success) {
                var counter = store.getCount();
                if (counter > 0) {
                    store.filter('is_posting', true);
                    var duplicatedata = {}; // using a map of already used finddata
                    store.filterBy(function (record) {
                        var finddata = record.get('prefix_id');
                        if (duplicatedata[finddata]) {
                            return false;
                        } else {
                            duplicatedata[finddata] = true;
                            return true;
                        }
                    });
                    // delete the filtered out records
                    delete store.snapshot;
                }
            }
        });
    },
    Processpostingtogl: function () {
        var me, store, grid, row, sort;
        me = this;
        grid = me.getGrid();
        store = grid.getStore();
        sort = 0;
        store.each(function (record) {
            row = record['data'];
            if (row.is_postingstep2 == 1) {
                sort++;
                row['hideparam'] = 'default';
                row['seq'] = sort;
                me.senddata = row;
                me.AjaxRequest();
            }
        });
    },
    Processunposting: function () {
        var me, store, grid, row, sort;
        me = this;
        grid = me.getGrid();
        store = grid.getStore();
        sort = 0;
        store.each(function (record) {
            row = record['data'];
            if (row.is_postingstep2 == 1) {
                sort++;
                row['hideparam'] = 'unposting';
                row['seq'] = sort;
                me.senddata = row;
                me.AjaxRequest();
            }
        });
    },
    AjaxRequest: function () {
        var me;
        me = this;
        Ext.Ajax.request({
            url: me.urlrequest,
            method: 'POST',
            timeout:100000000,
            params: {
                data: Ext.encode(me.senddata)
            },
            success: function (response) {
                me.info = Ext.JSON.decode(response.responseText);
                me.setSuccessEvent();
            },
            failure: function (response) {
                me.getFormdata().up('window').close();
            }
        });
    },
    setSuccessEvent: function () {
        var me = this;
        var data = me.info.data;
        switch (me.info.parameter) {
            case 'default':
                me.getGrid().getStore().reload();
                Ext.getBody().unmask();
                break;
            case 'unposting':
                me.getGrid().getStore().reload();
                Ext.getBody().unmask();
                break;
        }
    },
    alertFormdatadetailSuccess: function () {
        var me, store;
        me = this;
        me.getGrid().getStore().reload();
        Ext.Msg.show({
            title: 'Success',
            msg: me.message,
            icon: Ext.Msg.INFO,
            buttons: Ext.Msg.OK,
            fn: function () {

            }
        });
    },
    alertFormdatadetailFailed: function () {
        var me, store;
        me = this;
        me.getGrid().getStore().reload();
        Ext.Msg.show({
            title: 'Failure',
            msg: 'Error: ' + me.message,
            icon: Ext.Msg.ERROR,
            buttons: Ext.Msg.OK
        });
    },
});