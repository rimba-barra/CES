Ext.define('Hrd.controller.Leavegiving', {
    extend: 'Hrd.library.box.controller.Controllerfdv',
    alias: 'controller.Leavegiving',
    requires: ['Hrd.library.box.tools.DefaultConfigfdv', 'Hrd.library.box.tools.DefaultConfig', 'Hrd.library.box.tools.EventSelector',
        'Hrd.minic.lookup.Employee', 'Hrd.minic.leavegiving.GenerateYearly',
        'Hrd.library.box.tools.Tools'],
    views: ['leavegiving.Panel', 'leavegiving.Grid', 'leavegiving.FormSearch', 'leavegiving.FormData'],
    comboBoxIdEl: [],
    controllerName: 'leavegiving',
    fieldName: 'leaveentitlements_id',
    formWidth: 500,
    refs: [
        {
            ref: 'gridleave',
            selector: 'leavegivingleavegrid'
        }
    ],
    //unitFormula: null,
    //storeProcess: 'Otherspaymentdatadetail',
    bindPrefixName: 'Leavegiving',
    browseHandler: null,
    comboLoader: null,
    globalParams: null,
    localStore: {
        selectedUnit: null
    },
    textCombos: [],
    tools: null,
    expireDuration: 0,
    isMaximize: true,
    constructor: function(configs) {
        var me = this;
        var config = new Hrd.library.box.tools.DefaultConfigfdv({
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
        newEvs['leavegivinggrid toolbar button[action=cancel]'] = {
            click: function(fld, a) {
                me.cancelOnClick();
            }

        };
        newEvs['leavegivinggrid toolbar button[action=save]'] = {
            click: function(fld, a) {
                me.saveOnClick();
            }

        };
        newEvs['leavegivinggrid toolbar button[action=edit]'] = {
            click: function(fld, a) {
                me.editOnClick();
            }

        };
        newEvs['leavegivinggrid toolbar button[action=delete]'] = {
            click: function(fld, a) {
                me.deleteOnClick();
            }

        };
        newEvs['leavegivingleavegrid'] = {
            selectionchange: function() {
                me.leaveGridSelect();
            }
        };
        this.control(newEvs);

    },
    leaveGridSelect: function() {
        var me = this;
        var g = me.getGridleave();
        var rec = g.getSelectedRecord();
        if (rec) {
            me.getFormdata().loadRecord(rec);
            me.getGrid().down("toolbar button[action=edit]").setDisabled(false);
        }

    },
    resetForm: function() {
        var me = this;
        var f = me.getFormdata();

        me.tools.formHelper(f).readOnly(true);

        f.getForm().reset();
        return false;
    },
    afterDetailRequested: function(data, motherFunc) {
        // data from mode_read : 'detail'
        // motherFunc : fungsi yang dilewatkan dari method gridSelectionChange di Controllerfdv
        var me = this;
        var f = me.getFormdata();


        var g = me.getGrid();
        g.down("toolbar button[action=edit]").setDisabled(true);
        me.resetForm();
        // f.editedRow = g.getSelectedRow();
        var rec = g.getSelectedRecord();
        if (!rec) {
            motherFunc();
            return;
        }
        f.loadRecord(rec);

        var gl = me.getGridleave();

        gl.getStore().loadData([], false);
        gl.getStore().loadPage(1, {
            params: {
                employee_employee_id: rec.get("employee_id")
            },
            callback: function(recs, op) {


                gl.attachModel(op);

                motherFunc();
            }
        });

        return false;
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

        this.callParent(arguments);
        var me = this;
        var p = me.getPanel();
        var g = me.getGrid();
        me.getGridleave().doInit();
        g.getSelectionModel().setSelectionMode('SINGLE');
        me.getGridleave().getSelectionModel().setSelectionMode('SINGLE');
        //  me.getGridframe().getSelectionModel().setSelectionMode('SINGLE');
        p.setLoading("Loading components...");
        me.tools.ajax({
            params: {},
            success: function(data, model) {
                me.globalParams = data['others'][0][0]['GLOBALPARAMSPARAMS'];
                me.expireDuration = data['others'][0][0]['EXPIRE_DURATION'];

                p.setLoading(false);
            }
        }).read('detail');


        /*
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
         
         */
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

            },
            other: function(state) {

                me.getFormdata().up('window').getEl().unmask();
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
    afterCallNew: function() {
        var me = this;
        me.disableForm(false);
        var g = me.getGrid();
        me.getFormdata().editedRow = -1;
        me.disableTBButtonsOnGrid(true);
        me.newClaim();

    },
    newClaim: function() {
        var me = this;
        var f = me.getFormdata();

        var g = me.getGrid();
        var rec = g.getSelectedRecord();
        f.down("[name=employee_name]").setReadOnly(true);
        f.down("[name=employee_nik]").setReadOnly(true);
        f.down("[name=hire_date]").setReadOnly(true);
        if (rec) {
            f.loadRecord(rec);
            // f.down("[name=tanggal_klaim]").setValue(new Date());
        } else {
            me.tools.alert.warning("Please select employee first");
            me.disableTBButtonsOnGrid(false);
        }

    },
    cancelOnClick: function() {
        var me = this;
        me.disableTBButtonsOnGrid(false);
    },
    disableTBButtonsOnGrid: function(isCreate) {
        var me = this;
        var g = me.getGrid();
        g.down("toolbar button[action=save]").setDisabled(!isCreate);
        g.down("toolbar button[action=cancel]").setDisabled(!isCreate);
        g.down("toolbar button[action=create]").setDisabled(isCreate);
        g.down("toolbar button[action=edit]").setDisabled(isCreate);
    },
    disableForm: function(disable) {
        var me = this;
        var status = typeof disable === 'undefined' ? true : disable;
        var f = me.getFormdata();
        var vs = f.getForm().getValues();
        for (var i in vs) {

            var el = f.down("[name=" + i + "]");
            if (el) {
                el.setReadOnly(status);
            }

        }
    },
    deleteOnClick: function() {
        var me = this;
        var at = me.getFormdata();
        if (at) {
            var g = at.down("grid");
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
        }


    },
    confirmDeleteOnClick: function(store, rec, window) {
        var msg = function() {
            window.mask('Deleting data, please wait ...');
        };
        store.removeAt(rec.index);
        store.on('beforesync', msg);
        store.sync({
            success: function(s) {
                window.unmask();
                store.un('beforesync', msg);
                store.reload();

                Ext.Msg.show({
                    title: 'Success',
                    msg: "Record deleted",
                    icon: Ext.Msg.INFO,
                    buttons: Ext.Msg.OK
                });
            },
            failure: function() {
                window.unmask();
                store.un('beforesync', msg);
                store.reload();
                Ext.Msg.show({
                    title: 'Failure',
                    msg: 'Error',
                    icon: Ext.Msg.ERROR,
                    buttons: Ext.Msg.OK
                });
            }
        });
    },
    saveOnClick: function() {
        var me = this;
        var f = null;
        var fm = me.getFormdata();

        f = fm;
        var g = f.down("grid");




        me.insSave({
            form: f,
            grid: g,
            // store: me.localStore["detail"].store,
            store: g.getStore(),
            finalData: function(data) {
                data["unit_unit_id"] = data["unit_id"];
                data["is_leave_end"] = f.down("[name=is_leave_end]").checked ? 1 : 0;
                data["employee_employee_id"] = data["employee_id"];
                return data;
            },
            sync: true,
            callback: {
                create: function(store, form, grid) {

                }
            }
        });
    },
    editOnClick: function() {
        var me = this;

        var f = me.getFormdata();
        me.tools.formHelper(f).readOnly(false);
        me.disableTBButtonsOnGrid(true);





    }
});