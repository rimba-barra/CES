Ext.define('Cashier.controller.Ptforcashbon', {
    extend: 'Cashier.library.template.controller.Controllermodule',
    alias: 'controller.Ptforcashbon',
    requires: [
        'Cashier.library.template.combobox.Projectcombobox',
        'Cashier.library.template.combobox.Ptusercombobox',
        'Cashier.library.template.combobox.Ptcombobox',
        'Cashier.view.ptforcashbon.Gridbrowsept',
    ],
    views: [
        'ptforcashbon.Panel',
        'ptforcashbon.Grid',
        'ptforcashbon.FormSearch',
        'ptforcashbon.FormData',
        'ptforcashbon.Gridbrowsept',
    ],
    stores: [
        'Ptforcashbon',
        'Project',
        'Pt',
    ],
    models: [
        'Ptforcashbon',
        'Project',
        'Pt',
    ],
    refs: [
        {ref: 'grid', selector: 'ptforcashbongrid'},
        {ref: 'gridcompany', selector: 'ptforcashbonbrowseptgrid'},
        {ref: 'formsearch', selector: 'ptforcashbonformsearch'},
        {ref: 'formdata', selector: 'ptforcashbonformdata'},
    ],
    controllerName: 'ptforcashbon',
    fieldName: 'ptname',
    bindPrefixName: 'Ptforcashbon',
    formWidth: 800,
    rowproject: null, storept: null, state: null,
    senddata: null, info: null,
    urlrequest: 'cashier/ptforcashbon/create',
    init: function (application) {
        var me = this;
        this.control({
            'ptforcashbonpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender

            },
            'ptforcashbongrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange
            },
            'ptforcashbongrid toolbar button[action=create]': {
                click: function () {
                    me.state = 'create';
                    this.formDataShow('create');
                }
            },
            'ptforcashbongrid toolbar button[action=update]': {
                click: function () {
                    me.state = 'create';
                    this.formDataShow('update');
                }
            },
            'ptforcashbongrid toolbar button[action=destroy]': {
                click: this.dataDestroy
            },
            'ptforcashbongrid toolbar button[action=print]': {
                click: this.dataPrint
            },
            'ptforcashbongrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                click: this.gridActionColumnClick
            },
            'ptforcashbonformsearch': {
                afterrender: function () {
                    var me = this;
                    me.setStoreFormsearch();
                },
            },
            'ptforcashbonformsearch button[action=search]': {
                click: this.dataSearch
            },
            'ptforcashbonformsearch button[action=reset]': {
                click: this.dataReset
            },
            'ptforcashbonformdata': {
                afterrender: this.formDataAfterRender,
                boxready: this.cleandataCompany
            },
            'ptforcashbonformdata [name=ptforcashbon] ': {
                'keyup': function () {
                    var me, value;
                    me = this;
                },
            },
            'ptforcashbonformdata [name=objectname] ': {
                'keyup': function () {
                    var me, value;
                    me = this;
                },
            },
            'ptforcashbonformdata button[action=save]': {
                click: this.Processdata
            },
            'ptforcashbonformdata button[action=getdata]': {
                click: this.getDataCompany
            },
            'ptforcashbonformdata button[action=cancel]': {
                click: this.formDataClose
            },
        });
    },
    dataSearch: function () {
        var me, form, store, fields;
        resetTimer();
        me = this;
        form = me.getFormsearch().getForm();
        store = me.getGrid().getStore();
        me.getFormsearch().down("[name=hideparam]").setValue('search');  // added on april 2016, ahmad riadi    
        fields = me.getFormsearch().getValues();
        for (var x in fields)
        {
            store.getProxy().setExtraParam(x, fields[x]);
        }
        me.loadPage(store);
    },
    cleandataCompany: function () {
        var me, grid, store;
        me = this;
        grid = me.getGridcompany();
        store = grid.getStore();
        store.removeAll();
    },
    getDataCompany: function () {
        var me, form, formvalue, grid, store;
        me = this;
        grid = me.getGridcompany();
        store = grid.getStore();
        form = me.getFormdata();
        formvalue = form.getForm().getValues();
        if (form.getForm().isValid()) {
            formvalue['hideparam'] = 'getptbyproject';
            store.load({
                params: formvalue
            });

        }
    },
    Processdata: function () {
        var me, grid, pt_id_owner, store, counter, rows, recordcounttext, record, rowdata, datasave, form;
        me = this;
        grid = me.getGridcompany();
        form = me.getFormdata();
        store = grid.getStore();
        counter = store.getCount();
        if (form.getForm().isValid()) {
            if (counter > 0) {
                form.up('window').body.mask('Saving, please wait ...');
                rows = grid.getSelectionModel().getSelection();
                recordcounttext = rows.length + ' record' + (rows.length > 1 ? 's' : '');
                pt_id_owner = form.down("[name=pt_id_owner]").getValue();
                datasave = [];
                for (var i = 0; i < rows.length; i++) {
                    record = rows[i];
                    rowdata = record.raw;
                    rowdata['pt_id_owner'] = pt_id_owner;
                    delete rowdata["code"];
                    delete rowdata["projectcode"];
                    delete rowdata["projectname"];
                    delete rowdata["ptname"];
                    datasave[i] = rowdata;
                }

                if (datasave.length > 0) {
                    me.senddata = {'hideparam': 'createdata', 'data': datasave};
                    me.AjaxRequest();
                } else {
                    me.buildWarningAlert("Process failed,no data selected");
                    form.up('window').body.unmask();
                }
            } else {
                me.buildWarningAlert("Process failed,no data in this grid");
            }
        }
    },
    AjaxRequest: function () {
        var me;
        me = this;
        Ext.Ajax.request({
            url: me.urlrequest,
            timeout: 45000000,
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
    setSuccessEvent: function () {
        var me = this;
        var data = me.info.data;
        switch (me.info.parameter) {
            case 'createdata':
                var form = me.getFormdata();
                form.up('window').body.unmask();
                form.up('window').close();
                me.getGrid().getStore().reload();
                me.buildSuccessAlert(me.info.msg);
                break;

        }
    },
});