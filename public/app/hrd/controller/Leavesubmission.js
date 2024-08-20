Ext.define('Hrd.controller.Leavesubmission', {
    extend: 'Hrd.library.box.controller.ControllerByEmployee',
    alias: 'controller.Leavesubmission',
    controllerName: 'leavesubmission',
    fieldName: 'leave_id',
    bindPrefixName: 'Leavesubmission',
    formWidth: 500,
    listYears: null,
    refs: [
        {
            ref: 'gridleave',
            selector: 'leavesubmissiongridleave'
        }
    ],
    localStore: {
        plafon: null
    },
    constructor: function(configs) {
        var me = this;
        var config = new Hrd.library.box.tools.DefaultConfig({
            moduleName: me.controllerName
        });
        config.run(this);

        this.callParent(arguments);

    },
    init: function(config) {
        var me = this;
        this.callParent(arguments);
        var newEvs = {};
        newEvs['leavesubmissiongridleave'] = {
            selectionchange: me.gridLeaveSelectionChange
        };
        newEvs['leavesubmissionformdata textfield[name=end_date]'] = {
            change: me.endDateOnChange
        };
        newEvs['leavesubmissionformdata textfield[name=start_date]'] = {
            change: me.startDateOnChange
        };
        newEvs['leavesubmissionformdata checkbox[name=is_halfday]'] = {
            change: me.isHalfDayChange
        };
        //added by anas 08122021
        newEvs['leavesubmissionformdata combobox[name=absenttype_absenttype_id]'] = {
            select: function() {
                me.validateCutiExtra();
            }
        };

        var me = this;
        //
        this.control(newEvs);

    },
    isHalfDayChange: function() {
        var me = this;
        me.hitungDuration();
    },
    startDateOnChange: function() {
        var me = this;
        me.hitungDuration();

    },
    endDateOnChange: function() {
        var me = this;
        me.hitungDuration();
    },
    hitungDuration: function() {
        var me = this;
        var f = me.getFormdata();

        if (f.down("[name=start_date]").getValue() > f.down("[name=end_date]").getValue()) {
            f.down("[name=end_date]").setValue(f.down("[name=start_date]").getValue());
        }
        if (f.down("[name=is_halfday]").checked) {
            f.down("[name=end_date]").setValue(f.down("[name=start_date]").getValue());
        }
        var days = me.tools.intval(me.tools.diffDays(f.down("[name=start_date]").getValue(), f.down("[name=end_date]").getValue()));
        f.down("[name=duration]").setValue(days + 1);
    },
    gridLeaveSelectionChange: function() {
        var me = this;
        var gl = me.getGridleave();
        var rec = gl.getSelectedRecord();
        if (rec) {
           
            me.getFormdata().loadRecord(rec);

            //added by anas 08122021
            var g = me.getGrid();
            g.down("toolbar button[action=edit]").setDisabled(false);
            if(rec.data.absenttype_absenttype == "CUTI EXTRA")
            {                
                g.down("toolbar button[action=edit]").setDisabled(true);
            }
        }
    },
    afterSC:function(rec){
        var me = this;
        me.loadDataCutiPerKaryawan(me.tools.intval(rec.get("employee_id")));
    },
    loadDataCutiPerKaryawan:function(employeeId){
        var me = this;
        var p = me.getPanel();
        var gl = me.getGridleave();
        gl.getStore().getProxy().setExtraParam('employee_employee_id',employeeId);
       
        gl.getStore().load({
            callback: function() {
        
            }
        });
    },
    panelAfterRender: function(el) {
        var me = this;
        var p = me.getPanel();
        p.setLoading('Please wait...');
        me.tools.ajax({
            params: {},
            success: function(data, model) {

                me.tools.wesea(data.absenttype, me.getFormdata().down("[name=absenttype_absenttype_id]")).comboBox();
     
                me.tools.wesea(data.department, me.getPanel().down("leavesubmissionformsearch").down("[name=department_department_id]")).comboBox(true);
     
                var idGroupLeave = me.tools.intval(data.others[0][0]['ABSENTTYPEGROUP_LEAVE']);
                var s = me.getFormdata().down("[name=absenttype_absenttype_id]").getStore();
                // filter untuk tipe cuti saja
                
                if (s.getCount() > 0 && idGroupLeave > 0) {

                    s.filterBy(function(rec, id) {
                     
                        if (rec.raw.absenttypegroup_absenttypegroup_id === idGroupLeave) {
                            return true;
                        }
                        else {
                            return false;
                        }
                    });
                }
                
                
                
                //leave grid load
               // me.getGrid().getSelectionModel().select(0);
                
                var gl = me.getGridleave();
                gl.getSelectionModel().setSelectionMode('SINGLE');
                gl.doInit();
                gl.getStore().load({
                    params:{
                        employee_employee_id:me.getGrid().getStore().getAt(0).get("employee_id")
                    },
                    callback: function(rec, op) {
                        gl.attachModel(op);
                        var rec = me.getGrid().getSelectedRecord();
                        if (rec) {
                            me.doGridLeaveFilter(rec.get("employee_id"));
                        }

                    }
                });
                

                p.setLoading(false);
            }
        }).read('detail');
        me.callParent(arguments);

    },
    storeLoadedAfterSaveUpdate: function() {
        var me = this;
        var rec = me.getGrid().getSelectedRecord();
        me.doGridLeaveFilter(rec.get("employee_id"));
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
                var f = me.getFormdata();
                f.down("[name=start_date]").setValue(new Date());
                f.down("[name=end_date]").setValue(new Date());
                f.down("[name=absenttype_absenttype_id]").setValue('');
            }
        }
        return x;
    },

    //added by aans 08122021
    validateCutiExtra: function() {
        var me = this;
        var fs = me.getFormdata();
        var g = me.getGrid();
        g.down("toolbar button[action=save]").setDisabled(false);

        var cutitype = fs.down("[name=absenttype_absenttype_id]").getRawValue();
        if(cutitype == "CUTI EXTRA")
        {
            g.down("toolbar button[action=save]").setDisabled(true);
        }
    },

    saveOnClick: function() {
        var me = this;

        var f = me.getFormdata();
        var g = me.getMainGrid();
        
        //added by aans 08122021
        var cutitype = f.down("[name=absenttype_absenttype_id]").getRawValue();
        if(cutitype == "CUTI EXTRA")
        {
            me.tools.alert.warning("Cannot save data CUTI EXTRA");
        }
        else
        {
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
        }
    },


});