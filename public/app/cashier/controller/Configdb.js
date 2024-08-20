Ext.define('Cashier.controller.Configdb', {
    extend: 'Cashier.library.template.controller.Controllermodule',
    alias: 'controller.Configdb',
    requires: [
        'Cashier.library.template.combobox.Basedbcombobox',
        'Cashier.library.template.combobox.Baseappscombobox',
    ],
    views: [
        'configdb.Panel',
        'configdb.Grid',
        'configdb.FormSearch',
        'configdb.FormData',
    ],
    stores: [
        'Configdb',
        'Fordb',
        'Forapps',
    ],
    models: [
        'Configdb',
    ],
    refs: [
        {ref: 'grid', selector: 'configdbgrid'},
        {ref: 'formsearch', selector: 'configdbformsearch'},
        {ref: 'formdata', selector: 'configdbformdata'},
    ],
    controllerName: 'configdb',
    fieldName: 'host',
    bindPrefixName: 'Configdb',
    rowproject: null, storept: null, state: null,
    init: function (application) {
        var me = this;
        this.control({
            'configdbpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender

            },
            'configdbgrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange
            },
            'configdbgrid toolbar button[action=create]': {
                click: function () {
                    me.state = 'create';
                    this.formDataShow('create');
                }
            },
            'configdbgrid toolbar button[action=update]': {
                click: function () {
                    me.state = 'create';
                    this.formDataShow('update');
                }
            },
            'configdbgrid toolbar button[action=destroy]': {
                click: this.dataDestroy
            },
            'configdbgrid toolbar button[action=print]': {
                click: this.dataPrint
            },
            'configdbgrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                click: this.gridActionColumnClick
            },
            'configdbformsearch button[action=search]': {
                click: this.dataSearch
            },
            'configdbformsearch button[action=reset]': {
                click: this.dataReset
            },
            'configdbformdata': {
                afterrender: this.formDataAfterRender
            },
            'configdbformdata [name=configdb] ': {
                'keyup': function () {
                    var me, value;
                    me = this;
                },
            },
            'configdbformdata [name=objectname] ': {
                'keyup': function () {
                    var me, value;
                    me = this;
                },
            },
            'configdbformdata button[action=save]': {
                click: function () {
                    var me, state, form;
                    me = this;
                    me.dataSave();
                }
            },
            'configdbformdata button[action=cancel]': {
                click: this.formDataClose
            },
        });
    },
    dataSave: function () {
        var me, formdata, form, values, store, state;
        me = this;
        formdata = me.getFormdata();
        form = formdata.getForm();
        if (form.isValid()) {
            state = formdata.up('window').state.toLowerCase();
            values = form.getValues();
            values['hideparam'] = state;
            formdata.up('window').body.mask('Saving data, please wait ...');
            Ext.Ajax.request({
                url: 'cashier/configdb/' + state,
                method: 'POST',
                timeout: 45000000,
                params: {
                    data: Ext.encode(values)
                },
                success: function (response) {
                    var data = Ext.JSON.decode(response.responseText);
                    formdata.up('window').body.unmask();
                    if (data.success == 'true') {
                        Ext.data.StoreManager.lookup(me.stores[0]).reload();
                        Ext.Msg.show({
                            title: 'Success',
                            msg: data.msg,
                            icon: Ext.Msg.INFO,
                            buttons: Ext.Msg.OK,
                            fn: function () {
                                formdata.up('window').close();
                            }
                        });
                    } else {
                        Ext.Msg.show({
                            title: 'Failure',
                            msg: 'Error: ' + data.msg,
                            icon: Ext.Msg.ERROR,
                            buttons: Ext.Msg.OK
                        });
                    }
                },
                failure: function (response) {
                    formdata.up('window').close();
                }
            });
        }
    },
});