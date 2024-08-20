Ext.define('Hrd.controller.Setuppayroll', {
    extend: 'Hrd.library.box.controller.template.Parametersb',
    alias: 'controller.Setuppayroll',
    views: [],
    controllerName: 'setuppayroll',
    formWidth: 400,
    refs: [
        {
            ref: 'panel',
            selector: 'setuppayrollpanel'
        },
        {
            ref: 'grid',
            selector: 'setuppayrollgrid'
        }
    ],
    bindPrefixName: 'Setuppayroll',
    sizew: {w: 500, h: 500},
    paramList: null,
    tempDeletedId: {},
    isLoaded: {
        cBA: false, CBB: false,
        GA: false, GB: false
    },
    init: function() {
        this.callParent(arguments);
        var me = this;
        var newEvents = {};
        newEvents['#formSetuppayrollID [name=status]'] = {
            change: function(el, newVal) {
                me.statusOnChange(el);
            }
        };
        newEvents['#formSetuppayrollID [name=grouppayroll_grouppayroll_id]'] = {
            select: function() {
                me.groupPayOnSelect();
            }
        };
        newEvents['setuppayrollgrid'] = {
            selectionchange: function() {
                me.gridOnSC();
            }
        };
        newEvents['setuppayrollpanel toolbar button[action=delete]'] = {
            click: function() {
                me.deleteOnClick();
            }
        };

        this.control(newEvents);

        //selectionchange: me.gridSelectionChange


    },
    gridOnSC:function(){
        var me = this;
        var p = me.getPanel();
        var f = p.down("form");
        var g = me.getGrid();
        var rec = g.getSelectedRecord();
        if(rec){
            f.getForm().reset();
            f.loadRecord(rec);
            me.tools.formHelper(f).fixMoneyFormat(rec);
        }
    },
    groupPayOnSelect: function() {
        var me = this;
        var p = me.getPanel();
        var f = p.down("form");
        var g = me.getGrid();
        var gval = me.tools.intval(f.down("[name=grouppayroll_grouppayroll_id]").getValue());
        if (gval > 0) {
            g.getStore().getProxy().setExtraParam("grouppayroll_grouppayroll_id", gval);
            g.doLoad();

        }

    },
    saveCallback: function(data) {
        var me = this;
        var x = {
            success: function() {

                me.groupPayOnSelect();
            }
        };
        return x;
    },
    finalData: function(values) {
        var me = this;
        var p = me.getPanel();
        var f = p.down("form");
        values = me.tools.formHelper(f).fixMoneyUnformat();


        return values;
    },
    pafCallback: function(recs, form) {
        var me = this;
        var vs = form.getValues();
        var p = me.getPanel();
        var f = p.down("form");
        p.up("window").maximize();
        var g = me.getGrid();
        g.doInit();
        g.getSelectionModel().setSelectionMode('SINGLE');

        return;



    },
    pafCallbackParam: function(recs, model, form) {
        var me = this;
        var p = me.getPanel();
        var f = p.down("form");
        me.tools.wesea(recs.grouppayroll, f.down("[name=grouppayroll_grouppayroll_id]")).comboBox();
        me.tools.wesea(recs.komponengaji, f.down("[name=komponengaji_komponengaji_id]")).comboBox();
        return true;
    },
    refreshData: function() {
        var me = this;
        var p = me.getPanel();

    },
    validateData: function() {
        var me = this;

        var p = me.getPanel();
        var f = p.down("form");
        var data = {"status": false, "msg": "Sedang diproses..."};
        var val = me.tools.intval(f.down("[name=grouppayroll_grouppayroll_id]").getValue());
        if (val > 0) {
            data.status = true;

        } else {
            data.msg = "Group payroll tidak valid";
        }

        return data;
    },
    addClick:function(){
        var me = this;
        var p = me.getPanel();
        var f = p.down("form");
        f.getForm().reset();
    },
    cancelClick:function(){
        var me = this;
        var p = me.getPanel();
        var f = p.down("form");
        f.down("[name=grouppayroll_grouppayroll_id]").setReadOnly(false);
    }
});