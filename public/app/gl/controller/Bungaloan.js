Ext.define('Gl.controller.Bungaloan', {
    extend: 'Gl.library.template.controller.Controllergl',
    alias: 'controller.Bungaloan',
    requires: [
        'Gl.library.tools.Mytools',
    ],
    views: [
        'bungaloan.Panel',
        'bungaloan.Grid',
        'bungaloan.FormSearch',
    ],
    stores: [
        'Bungaloan',
    ],
    models: [
        'Bungaloan',
    ],
    refs: [
        {
            ref: 'grid',
            selector: 'bungaloangrid'
        },
        {
            ref: 'formsearch',
            selector: 'bungaloanformsearch'
        },
    ],
    controllerName: 'bungaloan',
    fieldName: 'bunga',
    bindPrefixName: 'Bungaloan',
    urlrequest: null, senddata: null, info: null,
    init: function (application) {
        var me = this;
        this.control({
            'bungaloanpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender

            },
            'bungaloangrid': {
                afterrender: this.gridAfterRender,
                edit: this.editdata
            },
            'bungaloangrid toolbar button[action=create]': {
                click: function () {
                    this.formDataShow('create');
                }
            },
            'bungaloangrid toolbar button[action=generate]': {
                click: function () {
                    var countdata = 0;
                    var grid, actionColItems = '';
                    countdata = this.checkStoreExist('Bungaloan');
                    if (countdata > 0) {
                        this.buildWarningAlert('Sorry button generate not function <br/> data already exists');
                        grid = this.getGrid();
                        grid.down('#btnGenerate').setDisabled(true);
                    } else {
                        me.generateData();
                    }
                }
            },
            'bungaloangrid toolbar button[action=update]': {
                click: function () {
                    this.formDataShow('update');
                }
            },
            'bungaloangrid toolbar button[action=destroy]': {
                click: this.dataDestroy
            },
            'bungaloangrid toolbar button[action=print]': {
                click: this.dataPrint
            },
            'bungaloangrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                click: this.gridActionColumnClick
            },
            'bungaloanformsearch button[action=search]': {
                click: this.dataSearch
            },
            'bungaloanformsearch button[action=reset]': {
                click: this.dataReset
            },
        });
    },
    generateData: function () {
        var me;
        me = this;
        Ext.getBody().mask();
        me.senddata = {
            hideparam: 'generate',
        }
        me.urlrequest = 'gl/bungaloan/create';
        me.AjaxRequest();
    },
    setSuccessEvent: function () {
        var me = this;
        if (me.info.parameter == 'default') {
            if (me.info.counter < 1) {
                Ext.getBody().unmask();
                me.buildWarningAlert(me.info.message);
            } else {
                Ext.getBody().unmask();
            }
        } else if (me.info.parameter == 'generate') {
            if (me.info.counter < 1) {
                Ext.getBody().unmask();
                me.buildWarningAlert(me.info.message);
            } else {
                Ext.getBody().unmask();
                me.reloadstore();
            }

        }
    },
    editdata: function () {
        var me, store, grid, object, row;
        me = this;
        store = me.getGrid().getStore();
        grid = me.getGrid();
        object = grid.getSelectionModel().getSelection();
        row = object[0].data;
        me.senddata = {
            hideparam:'updatedata',
            data: row
        }
        me.urlrequest = 'gl/bungaloan/create';
        me.AjaxRequest();
        store.commitChanges();  
        me.reloadstore();
    },
    reloadstore: function () {
        var me = this;
        var store = me.getStore('Bungaloan');
        store.reload();
    },
    AjaxRequest: function () {
        var me;
        me = this;
        Ext.Ajax.request({
            url: me.urlrequest,
            method: 'POST',
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
    formImportAfterRender: function (contoller) {
        var me = '';
        me = this;


    },
});