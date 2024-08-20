Ext.define('Hrd.controller.Roleapproval', {
    extend: 'Hrd.library.template.controller.Controllermanual',
    alias: 'controller.Roleapproval',
    requires: [
        'Hrd.template.combobox.Functionapprovalcombobox',
        'Hrd.template.combobox.Projectcombobox',
        'Hrd.template.combobox.Ptcombobox',
        'Hrd.library.template.combobox.Employeecombobox',
    ],
    views: [
        'roleapproval.Panel',
        'roleapproval.FormData',
        'roleapproval.FormSearch',
        'roleapproval.Grid',
    ],
    stores: [
        'Roleapproval',
        'Functionapproval',
        'Project',
        'Pt',
        'Employee',
    ],
    models: [
        'Generalparameter',
    ],
    refs: [
        {ref: 'panel', selector: 'roleapprovalpanel'},
        {ref: 'grid', selector: 'roleapprovalgrid'},
        {ref: 'formsearch', selector: 'roleapprovalformsearch'},
        {ref: 'formdata', selector: 'roleapprovalformdata'},
    ],
    controllerName: 'roleapproval',
    fieldName: 'employee_name',
    bindPrefixName: 'Roleapproval',
    rowproject: null, storept: null, state: null,
    typedata: 0,
    formWidth: 400,
    urlcommon: 'hrd/common/read',
    urlrequest: null, senddata: null, info: null,
    rowdata: null,
    init: function (application) {
        var me = this;

        this.control({
            'roleapprovalpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender
            },
            'roleapprovalgrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange
            },
            'roleapprovalgrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                click: this.gridActionColumnClick
            },
            'roleapprovalformsearch button[action=reset]': {
                click: this.dataReset
            },
            'roleapprovalformdata': {
                afterrender: this.formDataAfterRender,
                boxready: function () {
                    var me;
                    me = this;
                    me.formDataBoxready();
                },
            },
            'roleapprovalformdata button[action=save]': {
                click: this.dataSave

            },
            'roleapprovalformdata button[action=cancel]': {
                click: this.formDataClose
            },
            'roleapprovalformsearch': {
                afterrender: this.formSearchAfterRender,

            },
            'roleapprovalformsearch button[action=search]': {
                click: function () {
                    var me;
                    me = this;
                    me.dataSearch();
                }
            },

        });
    },
    formDataAfterRender: function () {
        var me, form;
        me = this;
        form = me.getFormdata();
        me.getEmployeebyparam(form, 'value', apps.project, apps.pt);
    },
    formDataBoxready: function () {
        var me, form, statedata, grid, store, record, raw;
        me = this;
        form = me.getFormdata();
        statedata = form.up('window').state.toLowerCase();       
         
        if (statedata == 'update') {
            grid = me.getGrid();
            store = grid.getStore();
            record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));
            raw = record.raw;
            form.getForm().loadRecord(record);
            form.down("[name=value]").setValue(record.get('value'));
        }
    },
    getEmployeebyparam: function (form, prefix_id, project_id, pt_id) {
        var me, store, combodata, prefix, statedata;
        me = this;
        store = form.down("[name=" + prefix_id + "]").getStore();
        combodata = form.down("[name=" + prefix_id + "]");
        statedata = form.up('window').state.toLowerCase();
        store.load({
            url: me.urlcommon,
            params: {
                //"mode_read": 'getdataemployee',
		"mode_read": 'getdataemployeewithexection_for_employee_transfer',
                "project_id": project_id,
                "pt_id": pt_id,
            },
            callback: function (records, operation, success) {
                var data = records;
                store.loadData(data);
                
                statedata = form.up('window').state.toLowerCase();
                if (statedata == 'update') {
                    grid = me.getGrid();
                    store = grid.getStore();
                    record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));
                    prefix = record.get('value');
                } else {
                    prefix = combodata.getValue();                    
                }
                
                if (prefix !== null) {
                    combodata.setValue(parseInt(prefix));
                }
            }
        });
    },
    gridAfterRender: function () {
        var me = this;
        grid = me.getGrid();
        store = grid.getStore();
        store.removeAll();
        me.dataReset();
    },

});