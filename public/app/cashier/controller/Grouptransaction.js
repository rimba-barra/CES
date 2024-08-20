Ext.define('Cashier.controller.Grouptransaction', {
    extend: 'Cashier.library.template.controller.Controllermodule',
    requires: [
        'Cashier.template.ComboBoxFields',
        'Cashier.library.template.combobox.Statuscombobox',
        'Cashier.library.template.combobox.Projectcombobox',
        'Cashier.library.template.combobox.Projectptcombobox',
    ],
    alias: 'controller.Grouptransaction',
    views: [
        'grouptransaction.Panel',
        'grouptransaction.Grid',
        'grouptransaction.FormSearch',
        'grouptransaction.FormData',
    ],
    stores: [
        'Grouptransaction',      
        'Statuscombo',
    ],
    models: [
        'Grouptransaction',        
    ],
    refs: [
        {ref: 'grid', selector: 'grouptransactiongrid'},
        {ref: 'formsearch', selector: 'grouptransactionformsearch'},
        {ref: 'formdata', selector: 'grouptransactionformdata'},
        {ref: 'grouptransactionprojectcombo', selector: 'projectcombogrid'},
    ],
    controllerName: 'grouptransaction',
    fieldName: 'code',
    bindPrefixName: 'Grouptransaction',
    formWidth: 600,
    rowproject: null, rowpt: null, storept: null, state: null,
    init: function (application) {
        var me = this;
        this.control({
            'grouptransactionpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender

            },
            'grouptransactiongrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange
            },
            'grouptransactiongrid toolbar button[action=create]': {
                click: function () {
                    me.state = 'create';
                    this.formDataShow('create');
                }
            },
            'grouptransactiongrid toolbar button[action=update]': {
                click: function () {
                    me.state = 'create';
                    this.formDataShow('update');
                }
            },
            'grouptransactiongrid toolbar button[action=destroy]': {
                click: this.dataDestroy
            },
            'grouptransactiongrid toolbar button[action=print]': {
                click: this.dataPrint
            },
            'grouptransactiongrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                click: this.gridActionColumnClick
            },
            'grouptransactionformsearch': {
                click: this.formSearchAfterRender
            },
            'grouptransactionformsearch button[action=search]': {
                click: this.dataSearchcustome
            },
            'grouptransactionformsearch button[action=reset]': {
                click: this.dataReset
            },
            'grouptransactionformdata': {
                afterrender: this.formDataAfterRender
            },
            'grouptransactionformdata [name=project_id] ': {                
                'select': function () {
                    var me, id;
                    me = this;
                    id = me.getFormdata().down("[name=project_id]").getValue();
                    me.rowproject = {
                        "project_id": id
                    }
                    me.getPt();
                }
            },           
            'grouptransactionformdata button[action=save]': {
                click: this.dataSave
            },
            'grouptransactionformdata button[action=cancel]': {
                click: this.formDataClose
            },
            
        });
    },
   dataSearchcustome: function () {
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
});