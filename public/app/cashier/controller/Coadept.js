Ext.define('Cashier.controller.Coadept', {
    extend: 'Cashier.library.template.controller.Controllermodule',
    requires: [
        'Cashier.template.ComboBoxFields',
        'Cashier.library.template.combobox.Departmentcombobox',
        'Cashier.library.template.combobox.Projectcombobox',
        'Cashier.library.template.combobox.Projectptcombobox',
    ],
    alias: 'controller.Coadept',
    views: [
        'coadept.Panel',
        'coadept.Grid',
        'coadept.Gridcoa',
        'coadept.FormSearch',
        'coadept.FormData',
    ],
    stores: [
        'Coadept',
        'Department',
        'Coa',
    ],
    models: [
        'Coadept',
        'Coa',
    ],
    refs: [
        {ref: 'grid', selector: 'coadeptgrid'},
        {ref: 'gridcoa', selector: 'coadeptgridcoa'},
        {ref: 'formsearch', selector: 'coadeptformsearch'},
        {ref: 'formdata', selector: 'coadeptformdata'},
    ],
    controllerName: 'coadept',
    fieldName: 'coa',
    bindPrefixName: 'Coadept',
    formWidth: 1000,
    rowproject: null, rowpt: null, storept: null, state: null,
    urlcommon: 'cashier/common/create',
    urlrequest: 'cashier/coadept/create',
    senddata: null, 
    info: null,
    arraycoa: null, countercoa: 0, pt_id: 0,
    init: function (application) {
        var me = this;
        this.control({
            'coadeptpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender

            },
            'coadeptgrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange
            },
            'coadeptgrid toolbar button[action=create]': {
                click: function () {
                    me.state = 'create';
                    this.formDataShow('create');
                }
            },
            'coadeptgrid toolbar button[action=update]': {
                click: function () {
                    me.state = 'create';
                    this.formDataShow('update');
                }
            },
            'coadeptgrid toolbar button[action=destroy]': {
                click: this.dataDestroy
            },
            'coadeptgrid toolbar button[action=print]': {
                click: this.dataPrint
            },
            'coadeptgrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                click: this.gridActionColumnClick
            },
            'coadeptformsearch': {
                click: function () {
                    me.formSearchAfterRender();
                },
                afterrender: function () {
                    me.getStore('Project').load();
                    me.getStore('Projectpt').load();
                    me.getStore('Department').load();
                }
            },
            'coadeptformsearch button[action=search]': {
                click: this.dataSearchCustome
            },
            'coadeptformsearch button[action=reset]': {
                click: this.dataReset
            },
            'coadeptformdata': {
                afterrender: this.formDataAfterRender,
                boxready: function () {
                    me.setupCoa();
                }
            },
            'coadeptformsearch [name=project_id] ': {
                'select': function () {
                    var me, id;
                    me = this;
                    id = me.getFormsearch().down("[name=project_id]").getValue();
                    me.rowproject = {
                        "project_id": id
                    }
                    me.getPtsearch();
                }
            },
            'coadeptformsearch [name=pt_id] ': {
                'select': function () {
                    var me, id;
                    me = this;
                    id = me.getFormsearch().down("[name=pt_id]").getValue();
                    me.pt_id = id;
                }
            },
            'coadeptformdata [name=project_id] ': {
                'select': function () {
                    var me, id;
                    me = this;
                    id = me.getFormdata().down("[name=project_id]").getValue();
                    me.rowproject = {
                        "project_id": id
                    }
                    me.getPt();
                    me.removeCoa();
                }
            },
            'coadeptformdata [name=pt_id] ': {
                'select': function () {
                    var me, id;
                    me = this;
                    id = me.getFormdata().down("[name=pt_id]").getValue();
                    me.rowpt = {
                        "pt_id": id
                    }
                    me.getCoa();
                }
            },
            'coadeptformdata button[action=save]': {
                click: function () {
                    me.Savecoadept();
                }
            },
            'coadeptformdata button[action=cancel]': {
                click: this.formDataClose
            },
        });
    },
    dataSearchCustome: function () {
        resetTimer();
        var me = this;
        var form = me.getFormsearch().getForm();
        var store = me.getGrid().getStore();

        me.getFormsearch().down("[name=hideparam]").setValue('search');
        var fields = me.getFormsearch().getValues();
        fields['pt_id'] = me.pt_id;
        for (var x in fields)
        {
            store.getProxy().setExtraParam(x, fields[x]);
        }
        me.loadPage(store);
    },
    Savecoadept: function () {
        var me, form, value;
        me = this;
        me.SetArraycoa();
        form = me.getFormdata();

        if (form.getForm().isValid()) {
            me.getFormdata().up('window').body.mask('Saving data, please wait ...');
            value = form.getForm().getValues();
            value['hideparam'] = 'importdata';
            value['projectname'] = form.down("[name=project_id]").getRawValue();
            value['ptname'] = form.down("[name=pt_id]").getRawValue();
            value['department'] = form.down("[name=department_id]").getRawValue();
            value['coa_id'] = me.arraycoa;
            if (me.countercoa > 0) {
                me.senddata = value;
                me.AjaxRequest();
                me.getStore('Coadept').reload();
                Ext.getBody().unmask();
            }
            me.getFormdata().up('window').body.unmask();
        }

    },
    SetArraycoa: function () {
        var me, rows, recordcounttext, store, record;
        me = this;
        rows = me.getGridcoa().getSelectionModel().getSelection();
        if (rows.length < 1) {
            Ext.Msg.alert('Info', 'No record selected !');
            return;
        } else {
            recordcounttext = rows.length + ' record' + (rows.length > 1 ? 's' : '');
            store = me.getGridcoa().getStore();
            resetTimer();
            me.arraycoa = [];
            for (var i = 0; i < rows.length; i++) {
                me.arraycoa.push(rows[i]['data'].coa_id);
            }
            me.countercoa = 1;
        }
    },
    setupCoa: function () {
        var me, store, form;
        me = this;
        store = me.getStore('Coa');
        store.load({
            params: {
                "hideparam": 'getcoabyprojectpt',
                "project_id": 0,
                "pt_id": 0,
                "start": 0,
                "limit": 1000,
            },
        });

    },
    removeCoa: function () {
        var me, store, form;
        me = this;
        store = me.getStore('Coa');
        store.removeAll();
    },
    getPt: function () {
        var me, store, form;
        me = this;
        store = me.getStore('Projectpt');
        form = me.getFormdata();
        store.reload({
            params: {
                "hideparam": 'projectpt',
                "project_id": me.rowproject.project_id,
                "start": 0,
                "limit": 1000,
            },
            callback: function (records, operation, success) {
                me.setValueCombobox(me, "pt_id", null, null);
                me.storept = me.store;
                if (store.getCount() > 0) {
                    form.down("[name=pt_id]").setDisabled(false);
                } else {
                    form.down("[name=pt_id]").setDisabled(true);
                }
            }
        });


    },
    getPtsearch: function () {
        var me, store, form;
        me = this;
        store = me.getStore('Projectpt');
        form = me.getFormsearch();
        store.reload({
            params: {
                "hideparam": 'projectpt',
                "project_id": me.rowproject.project_id,
                "start": 0,
                "limit": 1000,
            },
            callback: function (records, operation, success) {
                form.down("[name=pt_id]").setValue(null);
                form.down("[name=pt_id]").setRawValue(null);
                me.storept = me.store;
                if (store.getCount() > 0) {
                    form.down("[name=pt_id]").setDisabled(false);
                } else {
                    form.down("[name=pt_id]").setDisabled(true);
                }
            }
        });


    },
    getCoa: function () {
        var me, store, form;
        me = this;
        store = me.getStore('Coa');
        form = me.getFormdata();
        store.reload({
            params: {
                "hideparam": 'getcoabyprojectpt',
                "project_id": form.down("[name=project_id]").getValue(),
                "pt_id": form.down("[name=pt_id]").getValue(),
                "start": 0,
                "limit": 1000,
            },
            callback: function (records, operation, success) {
                if (store.getCount() > 0) {
                    form.down("[name=coadeptgridcoa]").setDisabled(false);
                } else {
                    form.down("[name=coadeptgridcoa]").setDisabled(true);
                }
            }
        });
    },
    AjaxRequest: function () {
        var me;
        me = this;
        Ext.Ajax.request({
            url: me.urlrequest,
            method: 'POST',
            timeout: 45000000,
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
                break;
            case 'importdata':
                me.getFormdata().up('window').close();
                break;
        }
    },
    gridSelectionChange: function () {
        var me = this;
        var grid = me.getGrid(),
                row = grid.getSelectionModel().getSelection();
        grid.down('#btnDelete').setDisabled(row.length < 1);
    },
});