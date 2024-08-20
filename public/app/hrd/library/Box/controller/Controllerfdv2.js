/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Hrd.library.box.controller.Controllerfdv2', {
    extend: 'Hrd.library.box.controller.Controllerfdv',
    execAction: function(el, action, me) {
        if (!action) {
            action = '';
        }
        if (!me) {
            me = this;
        }

        switch (action) {
            case me.bindPrefixName + 'Create':
                //   me.newRecord();
                break;
            case me.bindPrefixName + 'Delete':
                me.dataDestroy(el);
                break;
            case me.bindPrefixName + 'Print':
                loadReport(el, 'tms/building/print');
                break;
        }
    },
    newRecord: function() {
        var me = this;
        var f = me.getFormdata();
        f.getForm().reset();
        var g = me.getGrid();
        //g.getSelectionModel().deselectAll();
        var sButton = f.down("button[action=save]");
        if (sButton) {
            f.setDisabled(false);
        }

        /// check jika ada save store maka load model terlebih dahulu



        if (me.saveStore) {
            f.setLoading("Please wait...");
            me.localStore[me.saveStore] = me.instantStore({
                id: me.controllerName +''+me.saveStore+'Store',
                extraParams: {
                    mode_read: 'maindetail'
                },
               // idProperty: 'klaimpengobatan_id'
            });
    
            me.localStore[me.saveStore].loadPage(1, {
                callback: function(recs, op) {
                    me.attachModel(op, me.localStore[me.saveStore], true);
                    f.setLoading(false);

                    me.afterCallNew();

                }
            });
            /*
             me.tools.ajax({
             params: {},
             success: function(data, model) {
             
             Ext.define('Tempdetail' + me.controllerName + '' + me.saveStore, {
             extend: 'Ext.data.Model',
             fields: model
             });
             
             var s = new Hrd.library.box.tools.StoreProcessor();
             s.init(me.saveStore, me.controllerName + "PRSLSTORE", "employee_id");
             s.create(me);
             me.localStore[me.saveStore] = s;
             me.afterCallNew();
             f.setLoading(false);
             }
             }).read('maindetail');
             */

        } else {

            me.afterCallNew();

        }


    }
    
})
