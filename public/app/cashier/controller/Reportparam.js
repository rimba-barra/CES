Ext.define('Cashier.controller.Reportparam', {
    extend: 'Cashier.library.template.controller.Controllermodule',
    requires: [
        'Cashier.template.ComboBoxFields',
        'Cashier.library.template.combobox.Projectcombobox',
        'Cashier.library.template.combobox.Projectptcombobox',
//        'Cashier.library.template.comboboxgrid.Projectcombogrid',
//        'Cashier.library.template.comboboxgrid.Projectptcombogrid',
        'Cashier.library.template.comboboxgrid.Codecombogrid',
    ],
    alias: 'controller.Reportparam',
    views: [
        'reportparam.Panel',
        'reportparam.Grid',
        'reportparam.FormSearch',
        'reportparam.FormData',
    ],
    stores: [
        'Reportparam',
        'Project',
        'Projectpt',
        'Codecombo',
    ],
    models: [
        'Reportparam',
        'Project',
        'Projectpt',
        'Code',
    ],
    refs: [
        {ref: 'grid', selector: 'reportparamgrid'},
        {ref: 'formsearch', selector: 'reportparamformsearch'},
        {ref: 'formdata', selector: 'reportparamformdata'},
    ],
    controllerName: 'reportparam',
    fieldName: 'code',
    bindPrefixName: 'Reportparam',
    formWidth: 600,
    rowproject: null, rowpt: null, storept: null, state: null,
    init: function (application) {
        var me = this;
        this.control({
            'reportparampanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender

            },
            'reportparamgrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange
            },
            'reportparamgrid toolbar button[action=create]': {
                click: function () {
                    me.state = 'create';
                    this.formDataShow('create');
                }
            },
            'reportparamgrid toolbar button[action=update]': {
                click: function () {
                    me.state = 'create';
                    this.formDataShow('update');
                }
            },
            'reportparamgrid toolbar button[action=destroy]': {
                click: this.dataDestroy
            },
            'reportparamgrid toolbar button[action=print]': {
                click: this.dataPrint
            },
            'reportparamgrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                click: this.gridActionColumnClick
            },
            'reportparamformsearch': {
                boxready: this.formSearchReady
            },
            'reportparamformsearch button[action=search]': {
                click: this.dataSearch
            },
            'reportparamformsearch button[action=reset]': {
                click: this.dataReset
            },
            'reportparamformdata': {
                afterrender: this.formDataAfterRender
            },
            'reportparamformdata [name=project_id] ': {
                'keyup': function () {
                    var me, value;
                    me = this;
                    value = me.getFormdata().down("[name=project_id]").getRawValue();
                    me.autocompletecombo('Project', value, 'name');
                },
                'select': function () {
                    var me, id;
                    me = this;
                    id = me.getFormdata().down("[name=project_id]").getValue();
                    me.rowproject = {
                        "project_id": id,
                        "form": 'fromdata',
                    }
                    me.getPt();

                }
            },
            'reportparamformsearch [name=project_id] ': {
                'keyup': function () {
                    var me, value;
                    me = this;
                    value = me.getFormsearch().down("[name=project_id]").getRawValue();
                    me.autocompletecombo('Project', value, 'name');
                },
                'select': function () {
                    var me, id;
                    me = this;
                    id = me.getFormsearch().down("[name=project_id]").getValue();
                    me.rowproject = {
                        "project_id": id,
                        "form": 'formsearch',
                    }
                    me.getPt();
                }
            },
            'reportparamformdata button[action=save]': {
                click: function () {
                    var me, idproject, idpt;
                    me = this;
                    idproject = me.getFormdata().down("[name=project_id]").getValue();
                    idpt = me.getFormdata().down("[name=pt_id]").getValue();
                    me.getFormdata().down("[name=project_id]").setValue(idproject);
                    me.getFormdata().down("[name=pt_id]").setValue(idpt);
                    me.dataSave();
                }
            },
            'reportparamformdata button[action=cancel]': {
                click: this.formDataClose
            },
        });
    },
    setData: function () {
        var me, store;
        me = this;
        //console.log(me.getFormdata().getForm().getValues());
    },
    autocompletecombo: function (pstore, value, filter) {
        var me, store;
        me = this;
        store = me.getStore(pstore);
        store.clearFilter();
        store.filter(filter, value);
    },
    getPt: function () {
        var me, store, form;
        me = this;
        store = me.getStore('Projectpt');
        if (me.rowproject.form == 'fromdata') {
            form = me.getFormdata();
        } else {
            form = me.getFormsearch();
        }
        store.reload({
            params: {
                "hideparam": 'projectpt',
                "project_id": me.rowproject.project_id,
                "start": 0,
                "limit": 1000,
            },
            callback: function (records, operation, success) {
                me.setValueComboboxflag(me, "pt_id", null, null, me.rowproject.form);
                me.storept = me.store;
                if (store.getCount() > 0) {
                    form.down("[name=pt_id]").setDisabled(false);
                } else {
                    form.down("[name=pt_id]").setDisabled(true);
                }
            }
        });

    },
});