Ext.define('Hrd.library.box.controller.template.Parameters', {
    extend: 'Hrd.library.box.controller.Controller',
    alias: 'controller.tparameters',
    requires: ['Hrd.library.box.tools.DefaultConfig', 'Hrd.library.box.tools.EventSelector',
        'Hrd.library.box.tools.Tools', 'Hrd.library.box.Config', 'Hrd.minic.lookup.Employee',
        'Hrd.library.box.tools.CRUDButtonHandler'],
    views: [],
    tools: null,
    myConfig: null,
    crudh: null, // crud toolbox handler
    sizew:{w:100,h:100},
    constructor: function(configs) {
        var me = this;
        var config = new Hrd.library.box.tools.DefaultConfig({
            moduleName: me.controllerName
        });
        config.run(this);
        this.callParent(arguments);
        Ext.tip.QuickTipManager.init();
    },
    init: function() {
        this.callParent(arguments);
        var me = this;

        me.tools = new Hrd.library.box.tools.Tools({config: me.myConfig});
        var events = new Hrd.library.box.tools.EventSelector();
        this.control(events.getEvents(me, me.controllerName));


    },
    crudbrFunc: function() {
        var me = this;
        var x = {
            save: function(form) {
                form.setLoading("Please wait...");
                me.tools.ajax({
                    params: form.getForm().getValues(),
                    success: function(data) {
                        if (data.success) {
                            me.tools.alert.info("Saved");
                        } else {
                            me.tools.alert.warning(data.msg);
                        }
                        form.setLoading(false);


                    }
                }).save();
            }
        };
        return x;
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
        p.setLoading("Loading...");
        me.tools.ajax({
            params: {},
            success: function(recs, model) {
                me.pafCallback(recs,f);
                p.setLoading(false);

            }
        }).read('all');



    },
    pafCallback: function(recs,form) {
        return true;
    }



});