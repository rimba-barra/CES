Ext.define('Hrd.controller.Ubahstatus', {
    extend: 'Hrd.library.box.controller.Controller2B',
    alias: 'controller.Ubahstatus',
    controllerName: 'ubahstatus',
    fieldName: 'ubahstatus_id',
    bindPrefixName: 'Ubahstatus',
    formWidth: 500,
    refs: [
        {
            ref: 'gridstatus',
            selector: 'ubahstatusinfogrid'
        }
    ],
    localStore: {
        newdetail: null
    },
    init: function(config) {
        this.callParent(arguments);
        var newEvs = {};
        var me = this;
        newEvs['ubahstatusinfogrid'] = {
            selectionchange: me.statusGridOnSelect
        };
        this.control(newEvs);

    },
    getProcessingEl: function() {
        var me = this;
        var x = {
            getForm: function() {
                return me.getFormNew();
            },
            getGrid: function() {
                /// used for on Delete Button in main grid
                return me.getGridstatus();
            }
        }
        return x;
    },
    statusGridOnSelect: function(view, rec) {

        var me = this;
        var gs = me.getGridstatus();
        var fn = me.getFormNew();
        me.getGrid().down("toolbar button[action=edit]").setDisabled(false);
        me.getGrid().down("toolbar button[action=delete]").setDisabled(false);
        fn.getForm().reset();
        var mainRec = me.getGrid().getSelectedRecord();
        
        if (rec.length === 0) {
            return;
        }
        fn.loadRecord(rec[0]);
        fn.down("[name=employee_employee_id]").setValue(mainRec.get("employee_id"));
        fn.down("[name=employeestatus_employeestatus_id]").setValue(rec[0].raw.employeestatus.employeestatus_id);
        var st = rec[0].raw.newstatusinformation;
        for (var i in st) {
            var el = fn.down("[name=statusinformation_" + i + "]");
            if (el) {
                el.setValue(st[i]);
            }
        }

    },
    panelAfterRender: function(config) {
        this.callParent(arguments);
        var me = this;
        var gs = me.getGridstatus();
        gs.getSelectionModel().setSelectionMode('SINGLE');
        gs.doInit();
    },
    afterSelectionChange: function(rec) {
        var me = this;
        var gs = me.getGridstatus();
        me.getFormNew().getForm().reset();
        var emId = rec.get("employee_id");
        
        gs.getStore().loadData([], false);
        gs.getStore().loadPage(1, {
            params: {
                employee_employee_id: emId
            },
            callback: function(recs, op) {
                gs.attachModel(op);

            }
        });
    },
    addNewRecord: function() {
        var me = this;
        var fo = me.getFormOld();
        var fn = me.getFormNew();
        var rec = me.getGrid().getSelectedRecord();
        if (rec) {
            fo.loadRecord(rec);
            fn.down("[name=employee_employee_id]").setValue(rec.get("employee_id"));
            me.tools.formHelper(fo).readOnly(true);
            me.tools.formHelper(fn).readOnly(false);
            return true;

        }
        return false;
    },
    editRecord: function(selectedRec) {
        var me = this;
        
    },
    getFinalData: function(data) {
        for (var i in data) {

            if (i.indexOf("statusinformation") > -1) {
                data['new' + i] = data[i];
            }
        }
        data["newemployeestatus_employeestatus_id"] = data["employeestatus_employeestatus_id"];
        return data;
    },
    cancelOnClick: function() {
        var me = this;
        // me.getFormdata().getForm().reset();
        var fn = me.getFormNew();
        
        me.disableTBButtonsOnGrid(false);
        me.tools.formHelper(me.getFormNew()).readOnly(true);
    },
    getFormOld: function() {
        console.log("formOldStatusID");
        return this.getFormdata().down("#formOldStatusID");
    },
    getFormNew: function() {
        console.log("formNewStatusID");
        return this.getFormdata().down("#formNewStatusID");
    }



});