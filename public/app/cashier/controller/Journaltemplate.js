Ext.define('Cashier.controller.Journaltemplate', {
    extend: 'Cashier.library.template.controller.Controllermodule',
    requires: [
        'Cashier.template.ComboBoxFields',
        'Cashier.library.template.combobox.Projectcombobox',
        'Cashier.library.template.combobox.Projectptcombobox',
        'Cashier.library.template.combobox.Deptprefixcombobox',
        'Cashier.library.template.combobox.Coadeptvouchercombobox',
    ],
    alias: 'controller.Journaltemplate',
    views: [
        'journaltemplate.Panel',
        'journaltemplate.Grid',
        'journaltemplate.FormSearch',
        'journaltemplate.FormData',
    ],
    stores: [
        'Journaltemplate',
        'Project',
        'Projectpt',
        'Deptprefixcombo',
        'Coadeptcombo',
    ],
    models: [
        'Journaltemplate',
        'Coa',
    ],
    refs: [
        {ref: 'grid', selector: 'journaltemplategrid'},
        {ref: 'formsearch', selector: 'journaltemplateformsearch'},
        {ref: 'formdata', selector: 'journaltemplateformdata'},
    ],
    controllerName: 'journaltemplate',
    fieldName: 'coa',
    bindPrefixName: 'Journaltemplate',
    formWidth: 800,
    storept: null, state: null,
    urlcommon: 'cashier/common/create',
    urlrequest: 'cashier/journaltemplate/create', senddata: null, info: null,
    arraycoa: null, countercoa: 0, pt_id: 0,
    init: function (application) {
        var me = this;
        this.control({
            'journaltemplatepanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender

            },
            'journaltemplategrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange
            },
            'journaltemplategrid toolbar button[action=create]': {
                click: function () {
                    me.state = 'create';
                    this.formDataShow('create');
                }
            },
            'journaltemplategrid toolbar button[action=update]': {
                click: function () {
                    me.state = 'create';
                    this.formDataShow('update');
                }
            },
            'journaltemplategrid toolbar button[action=destroy]': {
                click: this.dataDestroy
            },
            'journaltemplategrid toolbar button[action=print]': {
                click: this.dataPrint
            },
            'journaltemplategrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                click: this.gridActionColumnClick
            },
            'journaltemplateformsearch': {
                click: function () {
                    me.formSearchAfterRender();
                },
                afterrender: function () {
                    me.getStore('Project').load();
                    me.getStore('Projectpt').load();
                    me.getStore('Department').load();
                }
            },
            'journaltemplateformsearch button[action=search]': {
                click: this.dataSearchCustome
            },
            'journaltemplateformsearch button[action=reset]': {
                click: this.dataReset
            },
            'journaltemplateformdata': {
                afterrender: this.formDataAfterRender,
                boxready: function () {
                    var me, form, state;
                    me = this;
                    form = me.getFormdata();
                    me.setupCoa();
                    state = form.up('window').state;
                    if (state == 'update') {
                        me.setReadonly(form, 'project_id', true);
                        me.setReadonly(form, 'pt_id', true);
                        me.setReadonly(form, 'department_id', true);
                        me.setReadonly(form, 'coa_id', true);
                    }

                }
            },
            'journaltemplateformsearch [name=project_id] ': {
                'select': function () {
                    var me, id;
                    me = this;
                    me.getPtsearch();
                }
            },
            'journaltemplateformsearch [name=pt_id] ': {
                'select': function () {
                    var me, id;
                    me = this;
                    id = me.getFormsearch().down("[name=pt_id]").getValue();
                    me.pt_id = id;
                }
            },
            'journaltemplateformdata [name=project_id] ': {
                'select': function () {
                    var me, id;
                    me = this;
                    me.getPt();
                    me.removeCoa();
                }
            },
            'journaltemplateformdata [name=pt_id] ': {
                'select': function () {
                    var me, id;
                    me = this;
                    me.getDepartment();

                }
            },
            'journaltemplateformdata [name=department_id] ': {
                'select': function () {
                    var me, id;
                    me = this;
                    me.getCoa();
                },
                'change': function (that, newValue, oldValue, eOpts) {
                    var me, form, rowdata;
                    me = this;
                    form = me.getFormdata();
                    //rowdata = form.down('[name=department_id]').valueModels[0]['raw'];
                    me.getCoa();
                }
            },
            'journaltemplateformdata [name=coa_id] ': {
                'select': function (g, record, item, index, e, eOpts) {
                    var me, rowdata, form;
                    me = this;
                    form = me.getFormdata();
                    rowdata = record[0]['data'];
                    form.down("[name=coaname]").setValue(rowdata.coaname);
                },
            },
            'journaltemplateformdata button[action=save]': {
                click: this.dataSave
            },
            'journaltemplateformdata button[action=cancel]': {
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
    setupCoa: function () {
        var me, store, form;
        me = this;
        store = me.getStore('Coa');
        store.load({
            params: {
                "hideparam": 'getcoabyprojectpt',
                "project_id": apps.project,
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
                "project_id": form.down("[name=project_id]").getValue(),
                "start": 0,
                "limit": 1000,
            },
            callback: function (records, operation, success) {
                me.setValueCombobox(me, "pt_id", null, null);
                me.setValueCombobox(me, "department_id", null, null);
                me.setValueCombobox(me, "coa_id", null, null);
                me.storept = me.store;
                if (store.getCount() > 0) {
                    form.down("[name=pt_id]").setDisabled(false);
                    form.down("[name=department_id]").setDisabled(false);
                    form.down("[name=coa_id]").setDisabled(false);
                    me.disableBtn(form, "save", false);
                } else {
                    form.down("[name=pt_id]").setDisabled(true);
                    form.down("[name=department_id]").setDisabled(true);
                    form.down("[name=coa_id]").setDisabled(true);
                    me.disableBtn(form, "save", true);
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
                "project_id": form.down("[name=project_id]").getValue(),
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
    getDepartment: function () {
        var me, store, form, counter;
        me = this;
        form = me.getFormdata();
        store = me.getStore("Deptprefixcombo");
        store.load({
            params: {
                "hideparam": 'getdepartmentprefix',
                "project_id": form.down("[name=project_id]").getValue(),
                "pt_id": form.down("[name=pt_id]").getValue(),
                "start": 0,
                "limit": 1000,
            },
            callback: function (records, operation, success) {
                counter = store.getCount();
                if (counter > 0) {
                    form.down("[name=coa_id]").setDisabled(false);
                    me.disableBtn(form, "save", false);
                } else {
                    form.down("[name=coa_id]").setDisabled(true);
                    me.disableBtn(form, "save", true);
                }
            }
        });
    },
    getCoa: function () {
        var me, store, form, counter;
        me = this;
        store = me.getStore('Coadeptcombo');
        form = me.getFormdata();
        store.load({
            params: {
                "hideparam": 'getcoabyprojectptdept',
                "project_id": form.down("[name=project_id]").getValue(),
                "pt_id": form.down("[name=pt_id]").getValue(),
                "department_id": form.down("[name=department_id]").getValue(),
                "start": 0,
                "limit": 1000,
            },
            callback: function (records, operation, success) {
                counter = store.getCount();
                if (counter > 0) {
                    me.disableBtn(form, "save", false);
                } else {
                    me.disableBtn(form, "save", true);
                }
            }
        });

    },
});