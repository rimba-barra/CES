Ext.define('Hrd.library.box.controller.template.Masterdata', {
    extend: 'Hrd.library.box.controller.Controller',
    alias: 'controller.tmasterdata',
    requires: ['Hrd.library.box.tools.DefaultConfig', 'Hrd.library.box.tools.EventSelector',
        'Hrd.library.box.tools.Tools', 'Hrd.library.box.Config', 'Hrd.minic.lookup.Employee',
        'Hrd.library.box.tools.CRUDButtonHandlerFmd'],
    views: [],
    tools: null,
    myConfig: null,
    crudh: null, // crud toolbox handler
    sizew: {w: 100, h: 100},
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
                            me.crudh.run('LOCK');
                            
                            me.getGrid().getStore().loadPage(1,{
                                callback:function(){
                                    me.selectFirstRecord();
                                }
                            });
                            
                        } else {
                            me.tools.alert.warning(data.msg);
                        }
                        form.setLoading(false);


                    }
                }).save();
            },
            add: function() {
                me.getFormdata().getForm().reset();
                me.getGrid().getSelectionModel().deselectAll();
            },
            cancel: function() {
                me.selectFirstRecord();
            },
            destroy: function() {
                var g = me.getGrid();
                var rec = g.getSelectedRecord();
                if (rec) {
                    Ext.Msg.show({
                        title: 'Confirm',
                        msg: 'Do you want delete this data?',
                        buttons: Ext.Msg.YESNO,
                        icon: Ext.Msg.QUESTION,
                        fn: function(clicked) {
                            if (clicked === "yes") {
                                g.getStore().remove(rec);
                                var p = me.getPanel();
                                p.setLoading("Deleting your data...");
                                g.getStore().sync({
                                    success: function(batch, op) {
                                        me.tools.alert.info("Deleted.");
                                        p.setLoading(false);
                                     
                                        me.selectFirstRecord(rec);
                                        


                                    },
                                    failure: function(batch, op) {
                                        var erMsg = "Unable to process data.";
                                        var jsD = batch.proxy.getReader().jsonData;
                                        var isError = batch.operations[0].error;
                                        if (!isError) {
                                            if (typeof jsD.msg !== "undefined") {
                                                erMsg = jsD.msg;
                                            }
                                            me.tools.alert.warning(erMsg);
                                        } else {
                                            me.tools.alert.error(erMsg);
                                        }



                                        p.setLoading(false);

                                        // s.getAt(s.getCount() - 1).commit();
                                    }

                                });
                            }
                        }
                    });
                }
            }
        };
        return x;
    },
    selectFirstRecord: function() {
        var me = this;
        var g = me.getGrid();
        var count = g.getStore().getCount();
        if (count > 0) {
            g.getSelectionModel().select(0);
        }
    },
    panelAfterRender: function(el) {

        var me = this;
        me.crudh = new Hrd.library.box.tools.CRUDButtonHandlerFmd({
            formId: 'form' + me.bindPrefixName + 'ID',
            toolboxId: 'toolbar' + me.bindPrefixName + 'ID',
            cName: me.bindPrefixName
        });
        me.crudh.init();

        /// resize window

        //p.up("window").setSize(me.sizew.w, me.sizew.w);
        me.getGrid().getSelectionModel().setSelectionMode('SINGLE');
        me.pafCallback();






    },
    gridLoad: function() {
        var me = this;
        var p = me.getPanel();
        p.setLoading("Loading...");
        var g = me.getGrid();
        g.doInit();
        g.getStore().load({
            callback: function(rec, op) {
                g.attachModel(op);
                me.selectFirstRecord();
                me.crudh.run('LOCK');
                p.setLoading(false);

            }
        });
    },
    pafCallback: function(recs, form) {
        return true;
    },
    formDataAfterRender: function() {

        return false;
    },
    dataReset: function() {

        return false;
    },
    gridSelectionChange: function() {
        var me = this;
        var g = me.getGrid();
        var rec = g.getSelectedRecord();
        if (rec) {
            me.getFormdata().loadRecord(rec);
        }
    }




});