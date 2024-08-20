// 
/* 6 Desember 2014
 * 
 * Extending from Controller 2 special for module that use employee grid for resource
 * 
 */
Ext.define('Gl.library.box.controller.ControllerByData', {
    extend: 'Gl.library.box.controller.Controller2',
    requires: ['Gl.library.box.tools.EventSelector2b'],
    readOnlyFields: [],
    init: function() {
        var me = this;
        var events = new Gl.library.box.tools.EventSelector2b();
        this.control(events.getEvents(me, me.controllerName));


        me.tools = new Gl.library.box.tools.Tools({config: me.myConfig});


    },
    afterClick: function() {
        var me = this;
        var x = {
            cancel: function() {
                //  me.mainGridCheckRecord();
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
    disableTBButtonsOnGrid: function(isCreate) {
        var me = this;
        var p = me.getPanel();
        p.down("toolbar button[action=save]").setDisabled(!isCreate);
        p.down("toolbar button[action=cancel]").setDisabled(!isCreate);
        p.down("toolbar button[action=create]").setDisabled(isCreate);
        p.down("toolbar button[action=edit]").setDisabled(isCreate);
        if (me.toggledButtons.length > 0) {
            var f = me.getFormdata();
            for (var i in me.toggledButtons) {
                f.down("button[action=" + me.toggledButtons[i] + "]").setDisabled(!isCreate);
            }
        }
    },
    addNewRecord: function() {
        return true;
    },
    afterCallNew: function() {

        var me = this;
        me.disableForm(false);
        var g = me.getGrid();
        me.getFormdata().editedRow = -1;
        me.disableTBButtonsOnGrid(true);
        // g.getSelectionModel().deselectAll();  
        var x = me.addNewRecord();
        me.afterClick().new ();
        if (!x) {
            me.disableTBButtonsOnGrid(false);
        }
        me.getFormdata().down("[name=" + me.fieldName + "]").setValue(0);

    },
    newRecord: function() {

        var me = this;
        var f = me.getFormdata();
        // f.getForm().reset();
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

                    var s = new Gl.library.box.tools.StoreProcessor();
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
    cancelOnClick: function() {
        var me = this;
        var f = me.getFormdata();


        me.disableTBButtonsOnGrid(false);
        me.disableForm(true);
        me.getFormsearch().collapse('bottom');
        me.isEditing = true;
        me.afterClick().cancel();
    },
    gridSelectionChange: function() {
        var me = this;
        me.callParent(arguments);
        var g = me.getGrid();
        var f = me.getFormdata();
        var rec = g.getSelectedRecord();
        f.getForm().reset();
        me.cancelOnClick();
        if (rec) {
            f.editedRow = g.getSelectedRow();
            f.loadRecord(rec);

            me.getPanel().down("toolbar button[action=delete]").setDisabled(false);

           

        }
        me.afterSC(rec);

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
    validateData:function(){
        var data = {"status":false,"msg":"Sedang diproses..."};
        return data;
    },
    saveOnClick: function() {
        var me = this;

        var f = me.getFormdata();

        var g = me.getMainGrid();

        var v = me.validateData();
        
      
        
        if (v.status) {
           
            me.insSave({
                form: f,
                grid: g,
                // store: me.localStore["detail"].store,
                store: me.saveStoreB?me.localStore[me.saveStoreB]:g.getStore(),
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
        }else{
            me.tools.alert.warning(v.msg);
        }

    }
});