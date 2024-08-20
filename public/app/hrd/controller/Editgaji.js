Ext.define('Hrd.controller.Editgaji', {
    extend: 'Hrd.library.box.controller.template.Parameters',
    alias: 'controller.Editgaji',
    views: [],
    controllerName: 'editgaji',
    formWidth: 400,
    refs: [
        {
            ref: 'panel',
            selector: 'editgajipanel'
        },
        {
            ref: 'grid',
            selector: 'editgajigrid'
        }
    ],
    bindPrefixName: 'Editgaji',
    sizew: {w: 500, h: 500},
    paramList: null,
    init: function() {
        this.callParent(arguments);
        var me = this;
        var newEvents = {};
        newEvents['editgajigrid'] = {
            selectionchange: function() {
                me.selectionChange();
            }
        };
        newEvents['#toolbarEditgajiID [action=proses]'] = {
            click: function() {
                me.proses();
            }
        };
        //proses
        this.control(newEvents);


    },
    proses: function() {
        var me = this;
        Ext.Msg.show({
            title: 'Confirm',
            msg: 'Proses edit gaji?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            fn: function(clicked) {
                if (clicked === "yes") {
                    var p = me.getPanel();
                    p.setLoading("Proses...");
                    me.tools.ajax({
                        params: {
                        },
                        success: function(data, model) {

                            p.setLoading(false);
                        }
                    }).read('proses');

                }
            }
        });
    },
    selectionChange: function() {
        var me = this;
        var p = me.getPanel();
        var f = p.down("form");
        var g = me.getGrid();
        var rec = g.getSelectedRecord();
        if (rec) {
            f.loadRecord(rec);
            me.tools.formHelper(f).fixMoneyFormat(rec);


        }
    },
    panelAfterRender: function(el) {

        var me = this;
        me.crudh = new Hrd.library.box.tools.CRUDButtonHandler({
            formId: 'form' + me.bindPrefixName + 'ID',
            toolboxId: 'toolbar' + me.bindPrefixName + 'ID',
            cName: me.bindPrefixName
        });
        me.crudh.init();

        /// resize window

        var p = me.getPanel();
        //p.up("window").setSize(me.sizew.w, me.sizew.w);
        var f = p.down("form");
        var g = me.getGrid();
        g.getSelectionModel().setSelectionMode('SINGLE');
        g.doInit();

        //p.setLoading("Loading...");
        g.doLoad();




    },
    saveCallback: function(data) {
        var me = this;
        var p = me.getPanel();
        var f = p.down("form");
        var g = me.getGrid();
        var x = {
            success: function() {
                g.getStore().loadPage(1);

            }
        };
        return x;
    },
    finalData: function(values) {
        var me = this;
        values = me.tools.formHelper(me.getPanel().down("form")).fixMoneyUnformat();
        return values;
    },
});