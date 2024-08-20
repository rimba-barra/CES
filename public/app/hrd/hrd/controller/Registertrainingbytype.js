Ext.define('Hrd.controller.Registertrainingbytype', {
    extend: 'Hrd.library.box.controller.Controller2',
    alias: 'controller.Registertrainingbytype',
    controllerName: 'registertrainingbytype',
    fieldName: 'registertrainingbytype_id',
    bindPrefixName: 'Registertrainingbytype',
    formWidth: 500,
    localStore: {
        selectedSchedule: null,
        selectedEmployee: null,
    },
    refs: [
        {
            ref: 'gridemployee',
            selector: 'registertrainingbytypeemgrid'
        }
    ],
    isEditing:false,
    toggledButtons: ['browse'],
    init: function(config) {
        this.callParent(arguments);
        var newEvs = {};
        var me = this;
        //
        newEvs['registertrainingbytypeformdata button[action=browse]'] = {
            click: me.browseSchedule

        };
        newEvs['registertrainingbytypeschedulegrid button[action=select]'] = {
            click: me.selectSchedule
        };
        newEvs['registertrainingbytypeformdata button[action=browseemployee]'] = {
            click: me.browseEmployee

        };
        newEvs['registertrainingbytypeemployeegrid button[action=select]'] = {
            click: me.selectEmployee
        };
        newEvs['registertrainingbytypeemgrid'] = {
            selectionchange: me.geSelectionChange
        };
        newEvs['registertrainingbytypeemgrid toolbar button[action=saveem]'] = {
            click: function() {
                me.geActionColumnClick(1, "save");
            }
        };
        newEvs['registertrainingbytypeemgrid toolbar button[action=create]'] = {
            click: me.browseEmployee
        };
        this.control(newEvs);

    },
    geSelectionChange: function() {
        var me = this;
        var recs = me.getGridemployee().getSelectionModel().getSelection();
        if (recs.length > 0) {
            var rec = recs[0];
            me.tools.formHelper(me.getFormdata()).fillByRaw(rec);
            var ar = ["certificate", "training_status", "duration", "point", "grade"];
            me.getFormdata().loadRecord(rec);
            if(me.isEditing){
                me.getGridemployee().down("toolbar button[action=saveem]").setDisabled(false);
            }
            
          
        }


    },
    panelAfterRender: function(el) {
        var me = this;
        me.callParent(arguments);
        var p = me.getPanel();

        /// load model for grid employee
        var ge = me.getGridemployee();

        p.setLoading("Loading components...");
        // set functionto to action column
        ge.acdo = function(rowIndex, action) {
            me.geActionColumnClick(rowIndex, action);
        }
        ge.loadModel(function(recs) {
            p.setLoading(false);
        });
        
        me.disableButtonsInDetailGrid(ge,true);
        

    },
    disableButtonsInDetailGrid:function(grid,isDisabled){
        var btns = grid.getDockedItems('toolbar[dock="top"]');
        if(btns){
            var items = btns[0].items.items;
          
            for(var i in items){
                items[i].setDisabled(isDisabled);
            }
        }
    },
    geActionColumnClick: function(rowIndex, action) {
        var me = this;
        var ge = me.getGridemployee();
        var f = me.getFormdata();
        if (action === "edit") {
            if(!me.isEditing){
                return;
            }
            ge.down("toolbar button[action=saveem]").setDisabled(false);
            var ar = ["certificate", "training_status", "duration", "point", "grade"];
            for (var i in ar) {
                var el = f.down("[name=" + ar[i] + "]");
                el.setReadOnly(false);
            }
        } else if (action === "delete") {
            if(!me.isEditing){
                return;
            }
            var s = ge.getStore();
            
            var id = me.tools.intval(s.getAt(rowIndex).get("trainingdetail_id"));
            if (id > 0) {
                me.tools.gridHelper(me.getGrid()).maindetailUpdateDeletedRows(f, id);
            }
            s.removeAt(rowIndex);

        } else if (action === "save") {
            var rec = ge.getSelectedRecord();
            if(!rec){
                rec = ge.getStore().getAt(ge.getSelectedRow());
            }
            if (rec) {
                var data = rec.data;
                rec.beginEdit();
               
                rec.set(f.getForm().getValues());
                rec.endEdit();
            }
        }
    },
    browseSchedule: function(el) {
        var me = this;
        var browse = new Hrd.library.Box.Tools.Browse();
        browse.init({
            controller: me,
            view: 'ScheduleGrid',
            el: el,
            direct: true,
            localStore: "selectedSchedule",
            mode_read: "schedule"
        });
        browse.showWindow();
    },
    selectSchedule: function() {
        var me = this;
        var f = me.getFormdata();
        if (me.browseHandler) {
            me.browseHandler.selectItem(function(rec) {

                if (rec) {
                    me.tools.formHelper(f).fillByRaw(rec);

                    f.down("[name=effective_date]").setValue(rec.get("start_date"));

                }


            });
        }
    },
    browseEmployee: function(el) {
        var me = this;
        var browse = new Hrd.library.Box.Tools.Browse();
        browse.init({
            controller: me,
            view: 'EmployeeGrid',
            el: el,
            direct: true,
            localStore: "selectedEmployee",
            mode_read: "employee"
        });
        browse.showWindow();
    },
    afterClick:function(){
        var me = this;
        var x = {
            cancel:function(){
                me.disableButtonsInDetailGrid(me.getGridemployee(),true);
                me.getGridemployee().getStore().loadData([],false);
            },
            save:function(){
        
            },
            edit:function(){
                me.getGridemployee().down("toolbar button[action=create]").setDisabled(false);
            },
            delete:function(){
                
            },
            new:function(){
                me.getGridemployee().down("toolbar button[action=create]").setDisabled(false);
            }
        }
        return x;
    },
    selectEmployee: function() {
        var me = this;
        var f = me.getFormdata();
        if (me.browseHandler) {
            me.browseHandler.selectItem(function(rec) {
                if (rec) {
                    
                    
                    var ge = me.getGridemployee();
                    
                    /// cek jika sudah ada employee 
                    var index = ge.getStore().findExact('employee_employee_id',rec.get("employee_id"));
                    
                    if(index > -1){
                        me.tools.alert.warning("Employee already in list");
                        return;
                    }
                    
                    ge.getStore().add({
                        employee_employee_id: rec.get("employee_id"),
                        employee_employee_nik: rec.get("employee_nik"),
                        employee_employee_name: rec.get("employee_name"),
                        department_code: rec.get("department_code")
                    });
                    me.tools.formHelper(f).fillByRaw(rec);

                }


            });
        }
    },
    addNewRecord: function() {
        var me = this;
        var ge = me.getGridemployee();
        ge.getStore().loadData([], false);
        return true;
    },
    afterSC: function(rec) {
        var me = this;
        var p = me.getPanel();
        var ge = me.getGridemployee();
        var se = ge.getStore();
        p.setLoading("Please wait");

        se.loadData([], false);
        //store.getProxy().setExtraParam(x, fields[x]);
        se.loadPage(1, {
            params: {
                trainingtran_training_id: rec.get("training_id")
            },
            callback: function(recs, op) {
                p.setLoading(false);

                /// select one employee
                if (se.getCount() > 0) {
                    ge.getSelectionModel().select(0);
                }

            }
        });
    },
    finalData: function(data) {
        var me = this;
        data["detail"] = me.getGridemployee().getJson();
        return data;
    },
});