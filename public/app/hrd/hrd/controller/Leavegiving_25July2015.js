Ext.define('Hrd.controller.Leavegiving', {
    extend: 'Hrd.library.box.controller.Controller',
    alias: 'controller.Leavegiving',
    requires: ['Hrd.library.box.tools.DefaultConfig', 'Hrd.library.box.tools.EventSelector',
        'Hrd.minic.lookup.Employee', 'Hrd.minic.leavegiving.GenerateYearly',
        'Hrd.library.box.tools.Tools'],
    views: [],
    comboBoxIdEl: [],
    controllerName: 'leavegiving',
    fieldName: 'leaveentitlements_id',
    formWidth: 500,
    refs: [
        {
            ref: 'gridemployee',
            selector: 'leavegivingemployeegrid'
        }
    ],
    //unitFormula: null,
    //storeProcess: 'Otherspaymentdatadetail',
    bindPrefixName: 'Leavegiving',
    browseHandler: null,
    comboLoader: null,
    globalParams:null,
    localStore: {
        selectedUnit: null
    },
    textCombos: [],
    tools: null,
    expireDuration:0,
    constructor: function(configs) {
        var me = this;
        var config = new Hrd.library.box.tools.DefaultConfig({
            moduleName: me.controllerName
        });
        config.run(this);
        me.registerMiniCtrlAlt('employee', new Hrd.minic.lookup.Employee({
            controllerName: 'Leavegiving'
        }));
        me.registerMiniCtrlAlt('generateyearly', new Hrd.minic.leavegiving.GenerateYearly({
            controllerName: 'Leavegiving'
        }));
        this.callParent(arguments);
        Ext.tip.QuickTipManager.init();


        //  me.reason = new Hrd.model.absentrecord.Reason();
    },
    init: function() {
        this.callParent(arguments);
        var me = this;
        me.tools = new Hrd.library.box.tools.Tools({config: me.myConfig});
        var events = new Hrd.library.box.tools.EventSelector();
        this.control(events.getEvents(me, me.controllerName));
        var newEvs = {};
        newEvs['leavegivingformdata button[action=lookup_employee]'] = {
            click: function() {
                me.lookupEmployee();
            }

        };
        newEvs['leavegivingformsearch [name=department_id]'] = {
            change: function(el, val) {
                me.tools.filterElement(val, me.getGridemployee().getStore(), 'department', 'department_id');
            }
        };
        newEvs['leavegivinggrid toolbar button[action=genyear]'] = {
            click: me.showFormYearGen
        };
        newEvs['leavegivingemployeegrid'] = {
            selectionchange: me.employeegridSelectionChange
        };
        newEvs['leavegivingformsearch [name=employee_status]'] = {
            change: function(el, val) {
                var v = me.getFormsearch().down("#EmployeeStatusFSId").getValue();

                me.tools.filterElement(v.employeestatus, me.getGridemployee().getStore(), 'employeestatus', 'employeestatus_id');
            }
        };
        newEvs['leavegivingformdata textfield[name=start_use]'] = {
            blur: function(el) {
                var year = me.tools.validDateInput(el.getValue(), me.config);
                el.setValue(year);
                var d = new Date(year, (12 - 1), 31);

                el.up("form").down("[name=expired_date]").setValue(d);
                el.up("form").down("[name=end_use]").setValue(year);
            }
        };
        newEvs['leavegivingformdata textfield[name=end_use]'] = {
            blur: function(el) {
                var year = me.tools.validDateInput(el.getValue(), me.config);
                var startYear = el.up("form").down("[name=start_use]").getValue();
                if (year >= startYear) {
                    el.setValue(year);
                    var d = new Date(year, (12 - 1), 31);

                    el.up("form").down("[name=expired_date]").setValue(d);
                } else {
                    el.setValue(startYear);
                }

            }
        };

        this.control(newEvs);

    },
    showFormYearGen: function() {
        var me = this;
        me.instantWindow("GenerateYearly", 600, "Generate Yearly Leave", "create", "generateyearly");
    },
    lookupEmployee: function() {
        var me = this;
        me.instantWindow("Panel", 600, "Employe List", "create", "employeewindow", "lookup.employee");

    },
    panelAfterRender: function(el) {
        var me = this;




        me.comboLoader = new Hrd.library.box.tools.ComboLoader({
            formSearch: me.getFormsearch(),
            mainPanel: el,
            callback: me.departmentDataLoaded
        });
        me.comboLoader.run(me.controllerName);

        me.tools.ajax({
            params:{},
            success: function(data, model) {
                me.globalParams = data['others'][0][0]['GLOBALPARAMSPARAMS'];
                me.expireDuration = data['others'][0][0]['EXPIRE_DURATION'];
                
            }
        }).read('detail');


    },
    departmentDataLoaded: function() {
        var me = _Apps.getController('Leavegiving');


        //// load data employee
        var g = me.getGridemployee();
        g.doInit();
        g.getStore().load({
            callback: function(rec, op) {
                g.attachModel(op);

                var fs = me.getFormsearch();
                var el = fs.down("[name=department_id]");
                var s = el.getStore();
                s.add({
                    department: 'ALL',
                    department_id: 999
                });

                el.setValue(999);




            }
        });




        /// load all employee
        //// load data employee




    },
    mainDataSave: function() {
        var me = this;

        var f = me.getFormdata();
        var g = me.getGrid();
        var s = g.getStore();


        /* rec.beginEdit();
         rec.set({
         in_7_14: me._convertTime().formToGrid("timein"),
         out_7_14: me._convertTime().formToGrid("timeout"),
         shifttype_code: selectedShift.get("code"),
         shifttype_shifttype_id: selectedShift.get("shifttype_id")
         });
         rec.endEdit();
         
         */

        me.insSave({
            form: me.getFormdata(),
            grid: me.getGrid(),
            // store: me.localStore["detail"].store,
            finalData: function(data) {

                data["unit_unit_id"] = data["unit_id"];
                data["is_leave_end"] = f.down("[name=is_leave_end]").checked ? 1 : 0;

                return data;
            },
            sync: true,
            callback: {
                create: function(store, form, grid) {

                }
            }
        });





    },
    fdar: function() {



        var me = this;
        var f = me.getFormdata();

        var g = me.getGrid();
        me.setActiveForm(f);





        var x = {
            init: function() {
            },
            create: function() {

                me.unMask(1);
                g = me.getGridemployee();
                var rec = g.getSelectedRecord();
                if (rec) {
                    f.myLoadRecord(rec, "employee");
                }

            },
            update: function() {
                f.down("[name=leavegroup]").setReadOnly(true);
                f.down("[name=end_use]").setReadOnly(true);
                f.down("[name=start_use]").setReadOnly(true);
                f.editedRow = g.getSelectedRow();
                var rec = g.getSelectedRecord();

                if (rec) {
                    f.loadRecord(rec);

                }

                //shifttype_shifttype_id

                me.unMask(1);

            }
        };
        return x;
    },
    employeegridSelectionChange: function() {
        var me = this;
        var s = me.getGrid().getStore();
        s.clearFilter(true);
        var rec = me.getGridemployee().getSelectedRecord();
        if (rec) {
            var idEmp = rec.get("employee_id");

            if (s.getCount() > 0 && idEmp) {

                s.filterBy(function(rec, id) {

                    if (rec.raw.employee.employee_id === idEmp) {
                        return true;
                    }
                    else {
                        return false;
                    }
                });
            }

        }


    },
});