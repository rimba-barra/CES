Ext.define('Cashier.controller.Generatefile', {
    extend: 'Cashier.library.template.controller.Controllermodule',
    alias: 'controller.Generatefile',
    requires: [
        'Cashier.template.ComboBoxFields',
        'Cashier.library.template.combobox.Appscombobox',
        'Cashier.library.template.combobox.Appscontrollercombobox',
        'Cashier.library.template.combobox.Tablecombobox',
        'Cashier.library.template.combobox.Databasecombobox',
    ],
    views: [
        'generatefile.Panel',
        'generatefile.Grid',
        'generatefile.FormSearch',
        'generatefile.FormData',
    ],
    stores: [
        'Generatefile',
        'Apps',
        'Appscontroller',
        'Database',
        'Table',
    ],
    models: [
        'Generatefile',
    ],
    refs: [
        {ref: 'grid', selector: 'generatefilegrid'},
        {ref: 'formsearch', selector: 'generatefileformsearch'},
        {ref: 'formdata', selector: 'generatefileformdata'},
    ],
    controllerName: 'generatefile',
    fieldName: 'generatefile',
    bindPrefixName: 'Generatefile',
    rowproject: null, storept: null, state: null,
    senddata: null, info: null, dateNow: new Date(),
    init: function (application) {
        var me = this;
        this.control({
            'generatefilepanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender

            },
            'generatefilegrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange
            },
            'generatefilegrid toolbar button[action=create]': {
                click: function () {
                    me.state = 'create';
                    this.formDataShow('create');
                }
            },
            'generatefilegrid toolbar button[action=update]': {
                click: function () {
                    me.state = 'create';
                    this.formDataShow('update');
                }
            },
            'generatefilegrid toolbar button[action=destroy]': {
                click: this.dataDestroy
            },
            'generatefilegrid toolbar button[action=print]': {
                click: this.dataPrint
            },
            'generatefilegrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                click: this.gridActionColumnClick
            },
            'generatefileformsearch button[action=search]': {
                click: this.dataSearch
            },
            'generatefileformsearch button[action=reset]': {
                click: this.dataReset
            },
            'generatefileformdata': {
                afterrender: function () {
                    var me = this;
                    var storeapps = me.getStore('Apps');
                    var storedb = me.getStore('Database');
                    var storetable = me.getStore('Table');
                    var storecontroller = me.getStore('Appscontroller');

                    storeapps.load();
                    storedb.load();
                    storetable.load();
                    storecontroller.load();
                }
            },
            'generatefileformdata [name=apps_id] ': {
                'select': function (g, record, item, index, e, eOpts) {
                    me.getController();
                },
            },
            'generatefileformdata [name=dabatabase] ': {
                'select': function (g, record, item, index, e, eOpts) {
                    me.getTable();
                },
            },
            'generatefileformdata button[action=save]': {
                click: function () {
                    me.saveData();
                }
            },
            'generatefileformdata button[action=cancel]': {
                click: this.formDataClose
            },
        });
    },
    getController: function () {
        var me, store;
        me = this;
        store = me.getStore('Appscontroller');
        store.reload({
            params: {
                "hideparam": 'getcontroller',
                "apps_basename": me.getFormdata().down("[name=apps_id]").getValue(),
                "start": 0,
                "limit": 1000,
            },
            callback: function (records, operation, success) {

            }
        });

    },
    getTable: function () {
        var me, store;
        me = this;
        store = me.getStore('Table');
        store.reload({
            params: {
                "hideparam": 'gettable',
                "dbname": me.getFormdata().down("[name=dabatabase]").getRawValue(),
                "start": 0,
                "limit": 1000,
            },
            callback: function (records, operation, success) {

            }
        });
    },
    saveData: function () {
        var me, form, value;
        me = this;
        form = me.getFormdata();
        if (form.getForm().isValid()) {
            value = form.getValues();
            me.urlrequest = 'cashier/generatefile/'+me.state;
            me.senddata = value;
            me.AjaxRequest();
        }
    },
    AjaxRequest: function () {
        var me;
        me = this;
        Ext.Ajax.request({
            url: me.urlrequest,
            method: 'POST',
             timeout:45000000,
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
        var form = me.getFormdata();
        switch (me.info.parameter) {
            case 'default':
                break;

        }
    },
});