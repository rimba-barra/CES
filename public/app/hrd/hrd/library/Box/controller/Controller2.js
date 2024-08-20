// 
/* 5 Desember 2014
 * 
 * Really looks like desktop version and more optimizing..
 * 
 */
Ext.define('Hrd.library.box.controller.Controller2', {
    extend: 'Hrd.library.box.controller.Controller',
    saveStore: null, /// store untuk proses save record | type data string
    requires: ['Hrd.library.box.tools.StoreProcessor', 'Hrd.library.box.tools.DefaultConfigfdv', 'Hrd.library.box.tools.StoreProcessor', 'Hrd.library.box.tools.EventSelector2',
        'Hrd.library.box.tools.SimpleGridControl', 'Hrd.library.box.tools.Tools', 'Hrd.template.ComboBoxFields'],
    isMaximize: true,
    browseHandler: null,
    // added 11/12/2014 
    // tambahkan list action button yang ingin kena event crud button di grid
    toggledButtons: [],
    comboBoxFields: null,
    isEditing: false,
    runFuncBeforeLoadGridData: false,
    // added 5/12/2014
    constructor: function(configs) {
        var me = this;
        var config = new Hrd.library.box.tools.DefaultConfigfdv({
            moduleName: me.controllerName
        });
        config.run(this);
        this.callParent(arguments);
        me.comboBoxFields = new Hrd.template.ComboBoxFields();
    },
    // added 5/12/2014
    init: function() {
        var me = this;
        var events = new Hrd.library.box.tools.EventSelector2();
        this.control(events.getEvents(me, me.controllerName));


        me.tools = new Hrd.library.box.tools.Tools({config: me.myConfig});


    },
    disableForm: function(disable) {
        var me = this;
        var status = typeof disable === 'undefined' ? true : disable;
        var f = me.getFormdata();
        var vs = f.getForm().getValues();
        for (var i in vs) {

            var el = f.down("[name=" + i + "]");
            if (el) {
                if (el.keepRO) {
                    el.setReadOnly(true);
                } else {
                    el.setReadOnly(status);
                }

            }

        }
    },
    afterCallNew: function() {

        var me = this;
        me.disableForm(false);
        var g = me.getGrid();
        me.getFormdata().editedRow = -1;
        me.disableTBButtonsOnGrid(true);
        me.getFormsearch().collapse();
        g.getSelectionModel().deselectAll();
        var x = me.addNewRecord();
        me.afterClick().new ();
        if (!x) {
            me.disableTBButtonsOnGrid(false);
        }
    },
    /// overrider this method for after new button clicked
    addNewRecord: function() {
        return false;
    },
    afterClick: function() {
        var x = {
            cancel: function() {

            },
            save: function() {

            },
            edit: function() {

            },
            delete: function() {

            },
            new : function() {

            }
        }
        return x;
    },
    cancelOnClick: function() {
        var me = this;
        var f = me.getFormdata();
        // reset jika dipanggil dari form baru
        if (f.editedRow < 0) {
            f.getForm().reset();
            me.getGrid().getView().getSelectionModel().deselectAll();
        }
        me.disableTBButtonsOnGrid(false);
        me.disableForm(true);
        me.getFormsearch().collapse('bottom');
        me.isEditing = true;
        me.afterClick().cancel();
    },
    getMainGrid:function(){
        var me = this;
        return me.getGrid();
    },
    saveOnClick: function() {
        var me = this;

        var f = me.getFormdata();

        var g = me.getMainGrid();
        
       
    
        me.insSave({
            form: f,
            grid: g,
            // store: me.localStore["detail"].store,
            store: g.getStore(),
            finalData: function(data) {
                return me.finalData(data);
            },
            sync: true,
            callback: {
                create: function(store, form, grid) {
                    me.isEditing = true;
                },
                update: function(store, form, grid) {
                    me.isEditing = true;
                }
            }
        });
    },
    finalData: function(data) {
        return data;
    },
    editOnClick: function() {
        var me = this;

        me.disableForm(false); // add 11/12
        // me.tools.formHelper(me.getFormdata()).readOnly(false); // mark 11/12
        me.disableTBButtonsOnGrid(true);
        me.isEditing = true;
        me.afterClick().edit();

    },
    disableTBButtonsOnGrid: function(isCreate) {
        var me = this;
        var g = me.getGrid();
        g.down("toolbar button[action=save]").setDisabled(!isCreate);
        g.down("toolbar button[action=cancel]").setDisabled(!isCreate);
        g.down("toolbar button[action=create]").setDisabled(isCreate);
        g.down("toolbar button[action=edit]").setDisabled(isCreate);
        if (me.toggledButtons.length > 0) {
            var f = me.getFormdata();
            for (var i in me.toggledButtons) {
                f.down("button[action=" + me.toggledButtons[i] + "]").setDisabled(!isCreate);
            }
        }
    },
    panelAfterRender: function(el) {
        var me = this;
        me.callParent(arguments);
        if (me.isMaximize) {
            el.up("window").maximize();
        }
        me.getGrid().getSelectionModel().setSelectionMode('SINGLE');
        me.getPanel().setLoading(false);
        // maximize panel window

    },
    formSearchAfterRender: function(el) {
        var me = this;
        me.loadComboBoxStore(el);

    },
    formDataAfterRender: function(el) {
        return false;
    },
    fdar: function() {
        var me = this;
        var x = {};
        return x;
    },
    gridSelectionChange: function() {
        var me = this;
        me.callParent(arguments);
        var g = me.getGrid();
        var f = me.getFormdata();
        var rec = g.getSelectedRecord();
        if (rec) {
            f.editedRow = g.getSelectedRow();
            f.loadRecord(rec);
            me.afterSC(rec);
        }





    },
    afterSC: function(rec) {

    },
    gridItemDblClick: function(el) {
        console.log("jalan");
        return false;
    },
    deleteOnClick: function() {
        var me = this;

        var g = me.getMainGrid();
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


        /* store.sync({
         success: function(s) {
         window.setLoading(false);
         store.reload();
         
         Ext.Msg.show({
         title: 'Success',
         msg: "Record deleted",
         icon: Ext.Msg.INFO,
         buttons: Ext.Msg.OK
         });
         },
         failure: function() {
         window.setLoading(false);
         store.reload();
         Ext.Msg.show({
         title: 'Failure',
         msg: 'Error',
         icon: Ext.Msg.ERROR,
         buttons: Ext.Msg.OK
         });
         
         }
         });*/
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
        } else {
            me.afterCallNew();
        }
    },
    insSave: function(data) {
        var me = this;
        var f = typeof data.form === 'undefined' ? me.getFormdata() : data.form;
        var s = data.store;
        if (!s) {
            console.log("SAVE ERR : [No store]");
            return;
        }
        if (typeof data.finalData !== "function") {
            console.log("SAVE ERR : [You must define getFinalData is a function]");
            return;
        }



        var finalData = data.finalData(f.getForm().getValues());
        var isCreate = false;
        // check if update or create new one
        if (f.editedRow > -1) { // update
            var rec = s.getAt(f.editedRow);
            console.log(f.editedRow);
            rec.beginEdit();
            rec.set(finalData);
            rec.endEdit();
        } else { // crete new one
            isCreate = true;
            s.add(finalData);
        }

        var msg = function() {
            f.up('window').body.mask('Saving data, please wait ...');
        };

        s.on('beforesync', msg);

        s.sync({
            success: function() {

                f.up('window').body.unmask();

                s.reload({
                    callback: function(rec, operation, success) {
                        me.storeLoadedAfterSaveUpdate(rec,operation,success);

                    }
                });
                me.successSaveUpdate(isCreate);
                me.tools.alert.info("Data saved successfully.");
                me.isEditing = false;

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
    storeLoadedAfterSaveUpdate:function(rec,operation,success){
        return true;
    },
    successSaveUpdate: function(isCreate) {
        var me = this;
        me.disableTBButtonsOnGrid(false);
        me.getFormdata().getForm().reset();

        me.disableForm(true);
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
    // @override 06 Jan 2015 
    loadPage: function(store) {
        var me = this;
        if (me.runFuncBeforeLoadGridData) {
            me.runFuncBLGD(function() {
                store.loadPage(1, {
                    callback: function(rec, operation, success) {
                        if (!me.getGrid().getStore().modelExist) {

                            me.getGrid().attachModel(operation);

                            me.afterMainGridLoaded();

                        }

                    }
                });
            });
        } else {
            store.loadPage(1, {
                callback: function(rec, operation, success) {
                    if (!me.getGrid().getStore().modelExist) {

                        me.getGrid().attachModel(operation);

                        me.afterMainGridLoaded();

                    }

                }
            });
        }



    },
    runFuncBLGD: function() {

    },
    afterMainGridLoaded: function() {
        /// select one record

        var me = this;
        var g = me.getGrid();
        if (g) {
            if (g.getStore().getCount() > 0) {
                var index = 0;
                g.getSelectionModel().select(index);
                var rec = g.getStore().getAt(index);
                if (rec) {
                    me.afterMainGridLoadedFunc(rec);
                }

            }
        }

    },
    afterMainGridLoadedFunc: function(rec) {

    }
});