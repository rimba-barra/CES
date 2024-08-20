Ext.define('Hrd.controller.Masterdiscapproval', {
    extend: 'Hrd.library.template.controller.Controllermanual',
    alias: 'controller.Masterdiscapproval',
    requires: [
        'Hrd.template.combobox.Reporttocombobox',
    ],
    views: [
        'masterdiscapproval.Panel',
        'masterdiscapproval.FormData',
        'masterdiscapproval.FormSearch',
        'masterdiscapproval.Grid',
    ],
    stores: [
        'Reportto',
        'Masterdiscapproval'
    ],
    models: [
        'Masterdiscapproval',
    ],
    refs: [
        {ref: 'panel', selector: 'masterdiscapprovalpanel'},
        {ref: 'grid', selector: 'masterdiscapprovalgrid'},
        {ref: 'formsearch', selector: 'masterdiscapprovalformsearch'},
        {ref: 'formdata', selector: 'masterdiscapprovalformdata'},
    ],
    controllerName: 'masterdiscapproval',
    fieldName: 'disckaryawan_approval_id',
    bindPrefixName: 'Masterdiscapproval',
    state: null,
    typedata: 0,
    formWidth: 550,
    urlcommon: 'hrd/common/read',
    urlrequest: null, senddata: null, info: null,
    rowdata: null,
    init: function (application) {
        var me = this;

        this.control({
            'masterdiscapprovalpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender
            },
            'masterdiscapprovalgrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange
            },
            'masterdiscapprovalgrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                click: this.gridActionColumnClick
            },
            'masterdiscapprovalformsearch button[action=reset]': {
                click: this.dataReset
            },
            'masterdiscapprovalformdata': {
                afterrender: this.formDataAfterRender,
                boxready: function () {
                    var me;
                    me = this;
                    me.formDataBoxready();
                },
            },
            'masterdiscapprovalformdata button[action=save]': {
                click: this.dataSave

            },
            'masterdiscapprovalformdata button[action=cancel]': {
                click: this.formDataClose
            },
            'masterdiscapprovalformdata [name=min_masakerja]': {
                change: this.hitungMinDisc
            },
            'masterdiscapprovalformdata [name=persen_disc_pertahun]': {
                change: this.hitungMinDisc
            },
            'masterdiscapprovalformsearch': {
                afterrender: this.formSearchAfterRender,

            },
            'masterdiscapprovalformsearch button[action=search]': {
                click: function () {
                    var me;
                    me = this;
                    me.dataSearch();
                }
            },

        });        
    },
    hitungMinDisc: function() {
        var me = this;
        var vs = me.getFormdata().getValues();
		var min_masakerja = vs["min_masakerja"];
		var persen_disc_pertahun = vs["persen_disc_pertahun"];
		if(min_masakerja == undefined || isNaN(min_masakerja) ){
                    min_masakerja = 0;
		}
		if(persen_disc_pertahun == undefined || isNaN(persen_disc_pertahun)){
                    persen_disc_pertahun = 0;
		}
                var min_disc = parseFloat(min_masakerja) * parseFloat(persen_disc_pertahun);
                min_disc = isNaN(min_disc) ? 0 : min_disc;
                me.getFormdata().down("[name=min_disc]").setValue(min_disc);

    },
    formDataAfterRender: function () {
        var me, form;
        me = this;
        form = me.getFormdata();
    },
    formDataBoxready: function () {
        var me, form, statedata, grid, store, record, raw;
        me = this;
        form = me.getFormdata();
        statedata = form.up('window').state.toLowerCase();     
        me.setEmployee();
         
        if (statedata == 'update') {
            grid = me.getGrid();
            store = grid.getStore();
            record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));
            raw = record.raw;
            form.getForm().loadRecord(record);
            //form.down("[name=value]").setValue(record.get('value'));
        }
    },
    gridAfterRender: function () {
        var me = this;
        grid = me.getGrid();
        store = grid.getStore();
        store.removeAll();
        me.dataReset();
    },
    setEmployee: function () {
        var me, store, combodata, form, mode_read;
        me = this;
        form = me.getFormdata();
        store = form.down("[name='employee_id']").getStore();
        combodata = form.down("[name='employee_id']");
                
        store.load({
            url: me.urlcommon,
            params: {
                'mode_read': 'getdataemployeedatasubholdingwithexception_for_reportto',
                'project_id': apps.project,
                'pt_id': apps.pt
            },
            callback: function (records, operation, success) {
                var data = records;
                store.loadData(data);
            }
        });                        
    },

});