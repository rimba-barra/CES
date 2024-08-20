// fdv  = follow desktop version
/*
 * 
 * fdv = follow desktop version
 * 
 */
Ext.define('Hrd.library.box.controller.Controllerfdv', {
    extend: 'Hrd.library.box.controller.Controller',
    saveStore: null, /// store untuk proses save record | type data string
    requires:['Hrd.library.box.tools.StoreProcessor'],
    isMaximize:true,
    panelAfterRender: function(el) {
        var me = this;
        me.callParent(arguments);
        if(me.isMaximize){
             el.up("window").maximize();
        }
        me.getPanel().setLoading(false);
        // maximize panel window

    },
    formSearchAfterRender: function(el) {
        var me = this;
        me.loadComboBoxStore(el);

    },
    formDataAfterRender: function(el) {

        var me = this;
        me.fdar().init();

        var state = el.up('window').state;

        /*added 30 april 2014*/
        el.up('window').getEl().mask("Loading...");

        if (state == 'create') {
            me.fdar().create();
        } else if (state == 'update') {
            me.fdar().update();


        } else {
            me.fdar().other(state);

            console.log("[Error Form After Render]Invalid state of the Form");

        }
    },
    fdar: function() {
        var me = this;
        var x = {
            init: function() {
                /// init here
            },
            create: function() {
                /// create here  

            },
            update: function() {
                var grid = me.getGrid();
                var store = grid.getStore();

                var record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));
                me.getFormdata().loadRecord(record);
                /// update here
            }
        };
        return x;
    },
    gridSelectionChange: function() {
        var me = this;
        me.callParent(arguments);
        var g = me.getGrid();
        var f = me.getFormdata();

        // mask panel
        var btnSave = f.down("button[action=save]");
        if (btnSave) {
            btnSave.setDisabled(true);
        }

        var p = me.getPanel();
        p.setLoading("Please wait");
        var selectedRecord = null;

        me.tools.ajax({
            params: {},
            success: function(data, model) {
                me.afterDetailRequested(data, function() {
                    p.setLoading(false);
                });

            }
        }).read('detail');


    },
    gridItemDblClick: function(el) {
        console.log("jalan");
        return false;
    },
    afterDetailRequested: function(data, motherFunc) {
        // data from mode_read : 'detail'
        // motherFunc : fungsi yang dilewatkan dari method gridSelectionChange di Controllerfdv
        return false;
    },
    afterCallNew:function(){
        // panggil fungsi ini setelah add new command dipanggil controller ini
    },
    newRecord: function() {
        var me = this;
        var f = me.getFormdata();
        f.getForm().reset();
        var g = me.getGrid();
        //g.getSelectionModel().deselectAll();
        var sButton = f.down("button[action=save]");
        if(sButton){
            f.setDisabled(false);
        }
        
        /// check jika ada save store maka load model terlebih dahulu
        if (me.saveStore && !me.localStore[me.saveStore]) {
            f.setLoading("Please wait...");
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
        }else{
            me.afterCallNew();
        }
    },
    insSave: function(data) {
        var me = this;
        var f = typeof data.form === 'undefined' ? me.getFormdata() : data.form;
        var s = data.store;
        var storeRow = typeof data.rowStore !== "undefined"?data.rowStore:-1;
        if (!s) {
            console.log("SAVE ERR : [No store]");
            return;
        }
        if (typeof data.finalData !== "function") {
            console.log("SAVE ERR : [You must define getFinalData is a function]");
            return;
        }
        
        

        var finalData = data.finalData(f.getForm().getValues());

        // check if update or create new one
        if (f.editedRow > -1) { // update
            var rec = s.getAt(f.editedRow);
            if(storeRow > -1){ // jika force menggunakan setingan row store
                rec = s.getAt(storeRow);
            }
            rec.beginEdit();
            rec.set(finalData);
            rec.endEdit();
        } else { // crete new one
            console.log(s);
            s.add(finalData);
        }

        var msg = function() {
            f.up('window').body.mask('Saving data, please wait ...');
        };

        s.on('beforesync', msg);
       
        s.sync({
           
            success: function() {

                f.up('window').body.unmask();
              
                s.reload();
                me.tools.alert.info("Data saved successfully.");
                if(typeof data.successSaveFunc === 'function'){
                    data.successSaveFunc();
                }

            },
            failure: function(batch, op) {
                var erMsg = "Something error when processing your request.";
                var jsD = batch.proxy.getReader().jsonData;
                if (typeof jsD.msg !== "undefined") {
                    erMsg = jsD.msg;
                }
                s.rejectChanges();
                f.up('window').body.unmask();
                
                me.tools.alert.warning(erMsg);
            }
        }
        );
    },
    execAction: function(el, action, me) {
        if (!action) {
            action = '';
        }
        if (!me) {
            me = this;
        }

        switch (action) {
            case me.bindPrefixName + 'Create':
                me.newRecord();
                break;
            case me.bindPrefixName + 'Delete':
                me.dataDestroy(el);
                break;
            case me.bindPrefixName + 'Print':
                loadReport(el, 'tms/building/print');
                break;
        }
    },
    formDataShow: function(el, act, action) {
        var me = this;

        if (action === 'create') {
            me.newRecord();
        }
        return false;

    },
    loadPage: function(store) {
        store.loadPage(1, {
            callback: function(rec, operation, success) {
                var g = me.getGrid();
                if (!g.getStore().modelExist) {

                    g.attachModel(operation);
                }
                
          
                if (g.getStore().getCount() > 0) { // select first record
                    g.getSelectionModel().select(0);
                }

            }
        });
        var me = this;
        // me.getGrid().xLoad();
    },


});