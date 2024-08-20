Ext.define('Cashier.controller.MasterGroupType', {
    extend: 'Cashier.template.ControllerForMaster',
    alias: 'controller.MasterGroupType',
    refs: [
        {
            ref: 'panel',
            selector: 'mastergrouptypepanel'
        },
        {
            ref: 'grid',
            selector: 'mastergrouptypegrid'
        },
        {
            ref: 'formdata',
            selector: 'mastergrouptypeformdata'
        },
        {
            ref: 'formsearch',
            selector: 'mastergrouptypeformsearch'
        },
    ],
    controllerName: 'mastergrouptype',
    fieldName: 'user_user_fullname',
    bindPrefixName: 'MasterGroupType',
    formxWinId: 'win-mastergrouptypewinId',
    init: function () {
        var me = this;
        var events = new Cashier.library.box.tools.EventSelector();
        this.control(events.getEvents(me, me.controllerName));
        me.tools = new Cashier.library.box.tools.Tools({config: me.myConfig});
        this.control({
            'mastergrouptypeformsearch [name=pt_pt_id]': {
                change: function (el) {
                    var value = el.value;
                    me.ptChange(value);
                }
            },
        });
    },
    fdar: function (el) {
        var me = this;
        var f = me.getFormdata();
        var g = me.getGrid();
        me.setActiveForm(f);
        var x = {
            init: function () {
                me.fdarInit();
            },
            create: function () {
                me.unMask(1);
                me.getCustomRequestCombobox('user', '', 'user_user_id', 'user', '', f, '');
                me.getCustomRequestCombobox('project', '', 'project_project_id', 'project', '', f, '');
            },
            update: function () {
                me.getCustomRequestCombobox('user', '', 'user_user_id', 'user', '', f, 'update');
                me.getCustomRequestCombobox('project', '', 'project_project_id', 'project', '', f, 'update');
            }
        };
        return x;
    },
    ptChange: function (val) {
        var me = this;
        var f = me.getFormsearch();
        f.down("[name=pt_id]").setValue(val);
    },
    mainDataSave: function (mode) {
        var me = this;
        var m = typeof mode !== "undefined" ? mode : "";
        var fa = me.getFormdata();
        me.tools.iNeedYou(me).save(false, function (data)
        {
            data.deletedRows = fa.deletedRows;
            return data;
        }
        );
    },
    afterDataDetailInit: function (param, f) { //after
        var me = this;
        var fid = f.ownerCt.id;
        var g = me.getGrid();
            if (param == "update") {
                var rec = g.getSelectedRecord();
                f.editedRow = g.getSelectedRow();
                f.getForm().loadRecord(rec);
        }
    }
});
