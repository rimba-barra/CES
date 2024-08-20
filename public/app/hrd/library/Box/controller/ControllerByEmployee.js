// 
/* 29 April 2015
 * 
 * Extending from Controller 2 special for module that use employee grid for resource
 * and their Transaction
 * 
 */
Ext.define('Hrd.library.box.controller.ControllerByEmployee', {
    extend: 'Hrd.library.box.controller.Controller2',
    readOnlyFields:[],
    addNewRecord: function() {
        return true;
    },
    afterCallNew: function() {

        var me = this;
        me.disableForm(false);
        var g = me.getMainGrid();
        me.getFormdata().editedRow = -1;
        me.disableTBButtonsOnGrid(true);
        me.getFormsearch().collapse();
        g.getSelectionModel().deselectAll();  
        var x = me.addNewRecord();
        me.afterClick().new ();
        if (!x) {
            me.disableTBButtonsOnGrid(false);
        }
        me.getFormdata().down("[name="+me.fieldName+"]").setValue(0);
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
    cancelOnClick: function() {
        var me = this;
        var f = me.getFormdata();
       
       
        me.disableTBButtonsOnGrid(false);
        me.disableForm(true);
        me.getFormsearch().collapse('bottom');
        me.isEditing = true;
        me.afterClick().cancel();
    },
    getMainGrid:function(){
        var me = this;
        return me.getGridleave();
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
                    store.loadPage(1,{
                        callback:function(){
                            var rec = me.getGrid().getSelectedRecord();
                            if(rec){
                                me.doGridLeaveFilter(rec.get("employee_id"));
                            }
                            
                        }
                    });
                } else {
                    me.tools.alert.warning('Failed');
                }
                window.setLoading(false);
            }
        }).read('delete');


    },
    doGridLeaveFilter: function(emId) {
        var me = this;
        var s = me.getMainGrid().getStore();
        s.clearFilter(true);
        var employeeId = me.tools.intval(emId);
        if (s.getCount() > 0 && employeeId > 0) {

            s.filterBy(function(rec, id) {

                if (rec.raw.employee.employee_id === employeeId) {
                    return true;
                }
                else {
                    return false;
                }
            });
        }
    },
    mainGridCheckRecord: function() {
        var me = this;
        var gl = me.getMainGrid();
        var adaRecord = false;
        if (gl.getStore().getCount() > 0) {
            gl.getSelectionModel().select(0);
            adaRecord = true;
        } else {
            adaRecord = false;
        }
        me.getGrid().down("toolbar button[action=edit]").setDisabled(!adaRecord);
    },
    afterClick: function() {
        var me = this;
        var x = {
            cancel: function() {
                me.mainGridCheckRecord();
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
            f.down("[name=employee_employee_id]").setValue(rec.get("employee_id"));
            
            me.doGridLeaveFilter(rec.get("employee_id"));
            me.mainGridCheckRecord();
            me.afterSC(rec);

        }

    }
});