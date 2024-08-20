/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/* added 2 Des 2015 */
Ext.define('Gl.library.box.controller.template.Parametersb', {
    extend: 'Gl.library.box.controller.template.Parameters',
    requires:['Gl.library.box.tools.CRUDButtonHandlerFmd','Gl.library.box.tools.EventSelector2'],
    init: function() {
        this.callParent(arguments);
        var me = this;

        me.tools = new Gl.library.box.tools.Tools({config: me.myConfig});
        var events = new Gl.library.box.tools.EventSelector();
        this.control(events.getEvents(me, me.controllerName));


    },
    panelAfterRender: function(el) {

        var me = this;
        me.crudh = new Gl.library.box.tools.CRUDButtonHandler({
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

                // p.setLoading(false);
                me.pafCallbackParam(recs,model,f);

                me.tools.ajax({
                    params: {},
                    success: function(recso, model) {
                        me.pafCallback(recso, f);
                        p.setLoading(false);



                    }
                }).read('all');

            }
        }).read('parameter');



    },
    pafCallbackParam: function(recs, model,form) {
        return true;
    },
    deleteOnClick: function(grid) {
        var me = this;

        var g = typeof grid==="undefined"?me.getGrid():grid;
        var rec = g.getSelectedRecord();
        if (rec) {
            Ext.Msg.show({
                title: 'Confirm Delete',
                msg: 'Are you sure you want to delete this record?',
                buttons: Ext.Msg.YESNO,
                icon: Ext.Msg.QUESTION,
                fn: function(clicked) {
                    if (clicked === "yes") {

                        me.confirmDeleteOnClick(g.getStore(), rec, me.getPanel().up("window"));
                    }
                }
            });
        }else{
            console.log("[DELETE] Tidak ada record");
        }



    },
    confirmDeleteOnClick: function(store, rec, window) {
        var me = this;

        window.setLoading("Deleting record...");


        me.tools.ajax({
            params: {
                id: rec.get(store.getProxy().getReader().getIdProperty())
            },
            success: function(data, model) {

                var suc = data['others'][0][0]['SUCCESS'];
                if (suc) {
                    me.tools.alert.info('Data has been deleted');
                    store.loadPage(1);
                } else {
                    me.tools.alert.warning('Failed');
                }
                window.setLoading(false);
            }
        }).read('delete');


    },
    crudbrFunc: function() {
        var me = this;
        var x = {
            save: function(form) {

                var validate = me.validateData();
                if (validate.status) {
                    form.setLoading("Please wait...");

                    me.tools.ajax({
                        params: me.finalData(form.getForm().getValues()),
                        success: function(data) {
                            if (data.success) {
                                me.tools.alert.info("Saved");
                                me.saveCallback(data).success();

                            } else {
                                me.tools.alert.warning(data.msg);
                            }
                            form.setLoading(false);


                        }
                    }).save();
                }else{
                    me.tools.alert.warning(validate.msg);
                }


            },
            add:function(){
                me.addClick();
            },
            cancel:function(){
                me.cancelClick();
            }
        };
        return x;
    },
    addClick:function(){
        var me = this;
    },
    cancelClick:function(){
        var me = this;
    }
    
});


