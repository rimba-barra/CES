Ext.define('Hrd.controller.Overtimetransaction', {
    extend: 'Hrd.library.box.controller.Controller',
    alias: 'controller.Overtimetransaction',
    requires: ['Hrd.library.box.tools.DefaultConfig', 'Hrd.library.box.tools.EventSelector',
        'Hrd.minic.lookup.Employee', 'Hrd.library.box.tools.ComboLoader', 'Hrd.library.box.tools.InstaView',
        'Hrd.library.box.tools.Hour'],
    views: [],
    comboBoxIdEl: [],
    controllerName: 'overtimetransaction',
    formWidth: 600,
    refs: [],
    //unitFormula: null,
    //storeProcess: 'Otherspaymentdatadetail',
    bindPrefixName: 'Overtimetransaction',
    browseHandler: null,
    localStore: {
        selectedUnit: null
    },
    textCombos: [],
    comboLoader: null,
    fieldName: 'overtimeheader_id',
    overtimeParameters: null,
    constructor: function(configs) {
        var me = this;
        var config = new Hrd.library.box.tools.DefaultConfig({
            moduleName: me.controllerName
        });
        config.run(this);


        me.registerMiniCtrlAlt('employeeovertimetran', new Hrd.minic.lookup.Employee({
            controllerName: me.bindPrefixName,
            panelId: me.controllerName + 'employee' // make sure this value same as params that passed when calling instantwindow
        }));

        this.callParent(arguments);
        Ext.tip.QuickTipManager.init();


        //  me.reason = new Hrd.model.absentrecord.Reason();
    },
    init: function() {
        this.callParent(arguments);
        var me = this;
        var events = new Hrd.library.box.tools.EventSelector();
        me.tools = new Hrd.library.box.tools.Tools({config: me.myConfig});
        this.control(events.getEvents(me, me.controllerName));
        var newEvs = {};

        var hourObjects = ['plan_before_start', 'plan_before_end', 'plan_after_start',
            'plan_after_end', 'exec_time_out_start', 'exec_time_out_end',
            'exec_time_in_start', 'exec_time_in_end'];
        for (var x in hourObjects) {
            this.control(events.timeInput('overtimetransactionformdata', me.tools.inputHoursObjects(hourObjects[x])));

        }

        //lookup_employee
        newEvs['overtimetransactionformdata button[action=lookup_employee]'] = {
            click: function() {
                me.lookupEmployee();
            }

        };
        newEvs['overtimetransactionformdata button[action=process]'] = {
            click: function() {
                me.processData();
            }

        };


        this.control(newEvs);

    },
    processData: function() {
        var me = this;
        //collect form data params
        var f = me.getFormdata();
        f.setLoading("Processing...");

        var proc = me.processTime();


        //do ajax
        me.tools.ajax({
            params: {
                start_time: proc.st,
                end_time: proc.et,
                start_time_after: proc.st_a,
                end_time_after: proc.et_a

            },
            success: function(recs, model) {
                var overtimeBefore = recs[0]['overtime'];
                var overtimeAfter = recs[1]['overtime'];


                me.fillImplementation(model, overtimeBefore, overtimeAfter);
                f.setLoading(false);
            }
        }).read('calculate');



    },
    fillImplementation: function(model, overtimeBefore, overtimeAfter) {
        var me = this;
        var f = me.getFormdata();
        if (model) {
            for (var x in model) {
                var elBefore = f.down("[name=before_" + model[x]['name'] + "]");
                var elAfter = f.down("[name=after_" + model[x]['name'] + "]");
                if (model[x]['name'] != 'overtime_id') { // kecuali field id
                    if (elBefore) {
                        elBefore.setValue("");
                    }
                    if (elAfter) {
                        elAfter.setValue("");
                    }
                }

            }
        }

        /// end reset

        if (overtimeBefore) {
            for (var x in overtimeBefore) {

                var el = f.down("[name=before_" + x + "]");
                if (el) {

                    el.setValue(overtimeBefore[x]);
                }

            }

        }
        if (overtimeAfter) {
            for (var x in overtimeAfter) {

                var el = f.down("[name=after_" + x + "]");
                if (el) {

                    el.setValue(overtimeAfter[x]);
                }

            }

        }

    },
    processTime: function() {
        var me = this;
        var f = me.getFormdata();

        var hourStart = new Hrd.library.box.tools.Hour(f.down("[name=exec_time_in_start]").getValue());
        var hourEnd = new Hrd.library.box.tools.Hour(f.down("[name=exec_time_in_end]").getValue());
        var hourStartAfter = new Hrd.library.box.tools.Hour(f.down("[name=exec_time_out_start]").getValue());
        var hourEndAfter = new Hrd.library.box.tools.Hour(f.down("[name=exec_time_out_end]").getValue());
        var result = {
            st: new Date(2000, 1, 1, hourStart.getHour(), hourStart.getMinute(), 0, 0),
            et: new Date(2000, 1, 1, hourEnd.getHour(), hourEnd.getMinute(), 0, 0),
            st_a: new Date(2000, 1, 1, hourStartAfter.getHour(), hourStartAfter.getMinute(), 0, 0),
            et_a: new Date(2000, 1, 1, hourEndAfter.getHour(), hourEndAfter.getMinute(), 0, 0),
        };

        return result;
    },
    getEmployeeControl: function() {
        return this.miniControllers['employee'];
    },
    leaveTestShow: function() {
        alert("hello");
    },
    lookupEmployee: function() {
        var me = this;

        me.instantWindow("Panel", 600, "Employe List", "create", "employeewindow", "lookup.employee", {
            itemId: me.controllerName + 'employee'
        });



    },
    panelAfterRender: function(el) {
        var me = this;



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

        me.tools.insSave({
            form: me.getFormdata(),
            modeCreate: 'mainalt',
            mainGrid: me.getGrid(),
            finalData: function(data) {
                var proc = me.processTime();
                data["overtimes"] = [
                    {"start_time": proc.st, "end_time": proc.et, "takentime": "BEFORE", "overtime_id": f.down("[name=before_overtime_id]").getValue()},
                    {"start_time": proc.st_a, "end_time": proc.et_a, "takentime": "AFTER", "overtime_id": f.down("[name=after_overtime_id]").getValue()}
                ];
                return data;
            },
            success: function() {
                me.getGrid().getStore().loadPage(1);
                f.up("window").close();
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

                /*  me.comboLoader = new Hrd.library.box.tools.ComboLoader({
                 formData: me.getFormdata(),
                 mainPanel: me.getFormdata()
                 });
                 me.comboLoader.run(me.controllerName);
                 */
            },
            create: function() {
                /*  Ext.Ajax.request({
                 url: 'hrd/overtimetransaction/read',
                 params: {
                 mode_read: 'parameters'
                 },
                 success: function(response) {
                 var info = Ext.JSON.decode(response.responseText);
                 me.overtimeParameters = info.data[0]['overtimeparameter'];
                 
                 me.unMask(1);
                 }
                 
                 
                 });*/

                me.unMask(1);

            },
            update: function() {
                f.editedRow = g.getSelectedRow();
                var rec = g.getSelectedRecord();
                if (rec) {


                    // ajax
                    me.tools.ajax({
                        params: {
                            overtimeheader_id: rec.get("overtimeheader_id")
                        },
                        success: function(recs, model) {
                            var overtimeBefore = null;
                            var overtimeAfter = null;
                            if (recs) {
                                for (var i in recs) {
                                    var overtime = recs[i]['overtime'];
                                    if (overtime['takentime'] == 'BEFORE') {
                                        overtimeBefore = overtime;
                                    }
                                    if (overtime['takentime'] == 'AFTER') {
                                        overtimeAfter = overtime;
                                    }

                                }
                            }
                            me.fillImplementation(model, overtimeBefore, overtimeAfter);

                            // fill time duration
                            if (overtimeBefore) {
                                f.down("[name=exec_time_in_start]").setValue(overtimeBefore.start_time.slice(0, 8));
                                f.down("[name=exec_time_in_end]").setValue(overtimeBefore.end_time.slice(0, 8));
                            }

                            if (overtimeAfter) {
                                f.down("[name=exec_time_out_start]").setValue(overtimeAfter.start_time.slice(0, 8));
                                f.down("[name=exec_time_out_end]").setValue(overtimeAfter.end_time.slice(0, 8));

                            }





                            me.unMask(1);
                        }
                    }).read('detail');


                    f.loadRecord(rec);

                    var ar = ['plan_before_start', 'plan_before_end', 'plan_after_start',
                        'plan_after_end'];
                    for (var x in ar) {
                        var time = rec.get(ar[x]).split(" ");
                        time = time[1];
                        f.down("[name=" + ar[x] + "]").setValue(time);
                    }

                }



                // 

            }
        };
        return x;
    },
    minicProc: function() {
        var me = this;
        var x = {
            lookupEmployee: {
                selectOnClick: function(rec) {
                    var f = me.getFormdata();

                    f.myLoadRecord(rec, "employee");
                }
            }
        };
        return x;

    }


});