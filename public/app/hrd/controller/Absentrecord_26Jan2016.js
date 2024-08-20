Ext.define('Hrd.controller.Absentrecord', {
    extend: 'Hrd.library.box.controller.Controller',
    alias: 'controller.Absentrecord',
    requires: ['Hrd.library.box.tools.DefaultConfig', 'Hrd.library.box.tools.EventSelector',
        'Hrd.minic.absentrecord.Reason', 'Hrd.minic.absentrecord.Onduty',
        'Hrd.library.box.tools.Util',
        'Hrd.minimodule.absent.ProcessAbsent', 'Hrd.library.absentrecord.Tools'],
    views: [],
    comboBoxIdEl: [],
    controllerName: 'absentrecord',
    formWidth: 800,
    refs: [
        {
            ref: 'formshift',
            selector: 'absentrecordformsetupshift'
        },
        {
            ref: 'gridemployee',
            selector: 'absentrecordemployeegrid'
        },
        {
            ref: 'form',
            selector: 'absentrecordformdata'
        },
        {
            ref: 'formonduty',
            selector: 'absentrecordformdataonduty'
        },
        {
            ref: 'formgen',
            selector: 'absentrecordformgeneratesheet'
        },
        {
            ref: 'panel',
            selector: 'absentrecordpanel'
        },
        {
            ref: 'formprocessabsent',
            selector: 'absentrecordformtoolprocessabsent'
        },
        {
            ref: 'formgenholiday',
            selector: 'absentrecordformemployeeoption'
        },
        {
            ref: 'formtransfer',
            selector: 'absentrecordformtooltransfer'
        },
        {
            ref: 'formlate',
            selector: 'absentrecordformtoolprocesslate'
        },
        {
            ref: 'formhal',
            selector: 'absentrecordformtoolprocesshourandlost'
        },
        {
            ref: 'formexcel',
            selector: 'absentrecordformtoolfileinput'
        },
        {
            ref: 'formreason',
            selector: 'absentrecordformreason'
        },
        {
            ref: 'formtlk',
            selector: 'absentrecordformtlk'
        },
        {
            ref: 'formtime',
            selector: 'absentrecordformtime'
        },
        {
            ref: 'formcutiber',
            selector: 'absentrecordformcutibersama'
        },
        {
            ref: 'gridcutibersama',
            selector: 'absentrecordemployeecutibersamagrid'
        }


    ],
    //unitFormula: null,
    //storeProcess: 'Otherspaymentdatadetail',
    bindPrefixName: 'Absentrecord',
    browseHandler: null,
    util: null,
    filterLoaded: {
        department: false,
        employeeList: false
    },
    localStore: {
        selectedUnit: null
    },
    globalParams: {},
    fpnl: null, // buat nampung jumlah finger print absent sementara
    textCombos: [
        {
            textfieldName: 'absenttype_code',
            comboboxName: 'absenttype_id',
            formRef: 'absentrecordformdatareason',
            displayField: 'code'
        },
        {
            textfieldName: 'parametertlk_code',
            comboboxName: 'parametertlk_parametertlk_id',
            formRef: 'absentrecordformdataonduty',
            displayField: 'code'
        }
    ],
    //
    constructor: function(configs) {
        var me = this;
        var config = new Hrd.library.box.tools.DefaultConfig({
            moduleName: me.controllerName
        });
        config.run(this);
        me.registerMiniCtrl('reason', new Hrd.minic.absentrecord.Reason({
            controllerName: 'Absentrecord'
        }));
        me.registerMiniCtrl('onduty', new Hrd.minic.absentrecord.Onduty({
            controllerName: 'Absentrecord'
        }));
        this.callParent(arguments);
        Ext.tip.QuickTipManager.init();

        // event untuk single klik di grid
        if (typeof gbAbsentRecord === 'undefined') {
            gbAbsentRecord = {
                reasonClick: function(index) {

                    me.gridReasonItemClick(index);
                },
                tlkClick: function(index) {
                    me.gridTlkItemClick(index);
                },
                timeClick: function(index) {
                    me.gridTimeItemClick(index);
                }
            };
        }


        //  me.reason = new Hrd.model.absentrecord.Reason();
    },
    init: function() {
        this.callParent(arguments);
        var me = this;
        var events = new Hrd.library.box.tools.EventSelector();
        me.tools = new Hrd.library.box.tools.Tools({config: me.myConfig});
        me.util = new Hrd.library.box.tools.Util();
        var processAbsent = new Hrd.minimodule.absent.ProcessAbsent({
            controllerName: me.bindPrefixName
        });



        this.control(events.getEvents(me, me.controllerName));


        var hourObjects = ['time_in', 'time_out'];
        for (var x in hourObjects) {
            this.control(events.timeInput('absentrecordformtime', me.tools.inputHoursObjects(hourObjects[x])));

        }



        /* added 27 Agustus */
        var hourObjects = ['timein', 'timeout'];
        for (var x in hourObjects) {
            this.control(events.timeInput('absentrecordformdata', me.tools.inputHoursObjects(hourObjects[x])));

        }

        var newEvs = {};
        newEvs['absentrecordgrid toolbar button[action=generate]'] = {
            click: me.generateSheet
        };
        newEvs['absentrecordformsetupshift'] = {
            afterrender: me.shift().fdar
        };
        newEvs['absentrecordgrid toolbar button[action=setupshift]'] = {
            click: me.shift().winShow
        };
        // tool delete
        newEvs['absentrecordgrid toolbar button[action=delete]'] = {
            click: function() {
                me.toolDelete().form();
            }
        };
        newEvs['absentrecordformtooldelete button[action=delete]'] = {
            click: function(el) {
                me.toolDelete().confirm(el);
            }
        };
        //


        // setup shift
        newEvs['absentrecordformsetupshift button[action=save]'] = {
            click: me.shift().insertToSheet
        };
        newEvs['absentrecordformsetupshift [name=shifttype_id]'] = {
            change: me.shift().comboOnChange
        };
        newEvs['absentrecordformsetupshift button[action=genholiday]'] = {
            click: me.shift().genHoliday
        };

        newEvs['absentrecordgrid button[action=processlate]'] = {
            click: function(el) {
                me.toolProcessLate().form();
            }
        };



        newEvs['absentrecordgrid toolbar button[action=transfer]'] = {
            click: function(el) {
                me.toolTransfer().form();
            }
        };

        newEvs['absentrecordgrid toolbar button[action=processjklt]'] = {
            click: function(el) {
                me.toolTotalHourandLost().form();
            }
        };


        newEvs['absentrecordgrid toolbar button[action=processday]'] = {
            click: function(el) {
                me.toolProcessDay().process();
            }
        };

        newEvs['absentrecordgrid toolbar button[action=importexcel]'] = {
            click: function(el) {
                me.toolExcel().form();
            }
        };

        newEvs['absentrecordformemployeeoption button[action=process]'] = {
            click: me.shift().genHolidayProcess
        };
        newEvs['absentrecordemployeegrid'] = {
            afterrender: me.emGrid().fdar,
            itemdblclick: me.emGrid().select,
            selectionchange: me.emGrid().select
        };
        newEvs['absentrecordformdata button[action=reason]'] = {
            click: me.showFormReason
        };
        newEvs['absentrecordformdata button[action=onduty]'] = {
            click: me.showFormOnduty
        };
        newEvs['absentrecordformsearch [name=search_department_id]'] = {
            select: me.filterEmployeeList
        };

        newEvs['absentrecordformsearch [name=year_pick]'] = {
            //change: me.resetGrid
            select: me.yearPickOnChange
        };
        newEvs['absentrecordformsearch [name=month_pick]'] = {
            //change: me.resetGrid
            select: me.monthPickOnChange
        };
        newEvs['absentrecordformgeneratesheet button[action=continue]'] = {
            //change: me.resetGrid
            click: me.continueOnClick
        };
        newEvs['absentrecordformtooltransfer button[action=process]'] = {
            //change: me.resetGrid
            click: function(el) {
                me.toolTransfer().processOnClick();
            }

        };

        newEvs['absentrecordformtoolprocesslate button[action=process]'] = {
            click: function(el) {
                me.toolProcessLate().processOnClick();
            }

        };

        newEvs['absentrecordformtoolprocesshourandlost button[action=process]'] = {
            click: function(el) {
                me.toolTotalHourandLost().processOnClick();
            }

        };

        newEvs['absentrecordformtoolfileinput #fd_file'] = {
            change: function(fld, a) {
                me.toolExcel().fileOnChange();
            }

        };
        newEvs['absentrecordformreason checkbox[name=is_cuti]'] = {
            change: me.isCutiChange
        };

        newEvs['absentrecordformreason button[action=process]'] = {
            click: function() {
                me.reasonProcessOnClick();
            }
        };

        newEvs['absentrecordformtlk button[action=process]'] = {
            click: function() {
                me.tlkProcessOnClick();
            }
        };

        newEvs['absentrecordformtime button[action=process]'] = {
            click: function() {
                me.timeProcessOnClick();
            }
        };

        newEvs['absentrecordgrid toolbar button[action=fixdate]'] = {
            click: function(el) {
                me.fixDate();
            }
        };
        newEvs['absentrecordformsetupshift button[action=shiftexcel]'] = {
            click: function() {
                me.showShifExcelForm();
            }
        };

        newEvs['absentrecordformshiftexcel #file_shiftexcel'] = {
            change: function(fld, a) {
                me.formShiftExcelUpload(fld, a, 'mode');
            }
        };

        newEvs['absentrecordformtooltransfer #file_csvabsent'] = {
            change: function(fld, a) {
                me.formAbsentCsvUpload(fld, a, 'mode');
            }
        };

        newEvs['absentrecordformtooltransfer #modeTransferID'] = {
            change: function(fld, a) {
                me.modeTransferOnSelect();
            }
        };


        newEvs['absentrecordgrid toolbar button[action=cutibersama]'] = {
            click: function(el) {
                me.toolCutiBersama().showForm();
            }
        };
        newEvs['absentrecordformcutibersama [action=process]'] = {
            click: function(el) {
                me.toolCutiBersama().proses();
            }
        };
        newEvs['absentrecordemployeecutibersamagrid toolbar [action=destroy]'] = {
            click: function(el) {
                me.toolCutiBersama().removeEmployee();
            }
        };




        this.control(newEvs);
        this.control(processAbsent.getEvents());

    },
    toolCutiBersama: function() {
        var me = this;
        var x = {
            showForm: function() {

                var w = me.instantWindow("FormCutiBersama", 600, "Cuti Bersama", "create", "cutiberwindow");
                var f = me.getFormcutiber();
                var g = w.down("grid");
                var that = this;
                g.doInit();
                g.doLoad({}, function(rec, operation, success) {
                    that.updateJumlah();
                });
                // var g = f.down("grid");
                // g.doInit();

                /*
                 
                 */


            },
            proses: function() {
                var f = me.getFormcutiber();
                var vs = f.getForm().getValues();

                var ids = "";

                me.getGridcutibersama().getStore().each(function(rec) {

                    if (rec != null) {
                        ids += rec.get("employee_id") + "~";
                    }

                });

                vs["ids"] = ids;
                me.tools.ajax({
                    params: vs,
                    fail: function(msg, data) {

                        f.setLoading(false);
                    },
                    success: function(data) {
                        f.setLoading(false);
                        f.up("window").close();
                        me.tools.alert.info("Success!");
                    }
                }).process('cutibersama');
            },
            removeEmployee: function() {

                var g = me.getGridcutibersama();
                var recs = g.getSelectionModel().getSelection();
                var s = g.getStore();
                var selectedCount = 0;
                var cTotal = s.getCount();
                if (recs.length > 0) {
                    // var ids = "";
                    for (var i in recs) {
                        selectedCount++;
                        s.remove(recs[i]);
                        // ids +=recs[i].get("employee_id")+"~";
                    }



                    this.updateJumlah();

                } else {
                    me.tools.alert.warning("Tidak ada karyawan terpilih");
                }

                // console.log(recs);
            },
            updateJumlah: function() {

                me.getGridcutibersama().up("form").down("#labelJumlah").setText("Jumlah karyawan terpilih: " + me.getGridcutibersama().getStore().getCount());
            }
        };
        return x;
    },
    modeTransferOnSelect: function() {
        var me = this;
        var f = me.getFormtransfer();
        var vs = f.getForm().getValues();
        var m = vs['mode_transfer'];
        console.log(vs['mode_transfer']);
        f.down("#file_csvabsent").hide();
        f.down("#transferDateID").hide();
        f.down("[name=delete]").hide();
        f.down("[action=process]").hide();
        if (m === "C") {
            f.down("#file_csvabsent").show();
        } else if (m === "D") {
            //  f.down("#file_csvabsent").show();
            f.down("#transferDateID").show();
            f.down("[name=delete]").show();
            f.down("[action=process]").show();
        }
    },
    formAbsentCsvUpload: function(fld, a, mode) {
        var me = this;


        var me = this;
        var form = fld.up("form");
        var p = me.getPanel();
        me.uploadFile({
            form: form,
            showalert: false,
            params: {'type': 'csv'},
            callback: {
                success: function(fn) {

                    //form.up("window").close();


                    form.setLoading("Transfering absent from csv...");

                    me.tools.ajax({
                        params: {
                            file_name: fn,
                            start_day: 0,
                            end_day: 0,
                            is_delete: 0
                        },
                        autoAbort: true,
                        success: function(data, model) {

                            if (data['others'][0][0]['STATUS']) {
                                // me.tools.alert.info("Success transfer");
                                me.fpnl = data['others'][0][0]['FPNUMBERLIST'];//FPNUMBERLIST
                                p.setLoading(false);

                                me.transferAjax(form, 1, me.fpnl.length);

                            } else {
                                me.tools.alert.warning(data['others'][0][0]['ERRORMSG']);
                                form.setLoading(false);

                            }

                            //  f.setLoading(false);
                            //f.up("window").close();
                        }

                    }).read('transferinfocsv');


                },
                failure: function() {
                    p.setLoading(false);
                }
            }
        });
    },
    showShifExcelForm: function() {
        var me = this;
        var w = me.instantWindow("FormShiftExcel", 400, "Shift from Excel", "processexcel", "toolShiftExcelWinId");
        var f = w.down("form");

    },
    formShiftExcelUpload: function(fld, a, mode) {
        var me = this;

        /*  me.tools.ajax({
         params: {
         },
         success: function(data, model) {
         
         
         }
         }).read('testexcel');
         
         
         return;
         */
        var me = this;
        var form = fld.up("form");
        var p = me.getPanel();
        me.uploadImage({
            form: form,
            showalert: false,
            callback: {
                success: function(fn) {
                    //  me.refreshPhotoInfo(imageName);
                    form.up("window").close();
                    me.getFormshift().up("window").close();
                    p.setLoading("Update tipe shift...");
                    me.tools.ajax({
                        params: {
                            file_name: fn,
                            month: me.getSelectedMonth(),
                            year: me.getSelectedYear()
                        },
                        success: function(data, model) {
                            p.setLoading(false);
                            if (data['others'][0][0]['HASIL']) {
                                me.tools.alert.info("Success");
                            } else {
                                me.tools.alert.warning(data['others'][0][0]['MSG']);
                            }


                        }
                    }).read('shifttypeexcel');
                },
                failure: function() {
                    p.setLoading(false);
                }
            }
        });


    },
    fixDate: function() {
        var me = this;
        var p = me.getPanel();
        p.setLoading(true);
        me.tools.ajax({
            params: {
                month: me.getSelectedMonth(),
                year: me.getSelectedYear()
            },
            success: function(data, model) {
                if (data['others'][0][0]['HASIL']) {
                    me.tools.alert.info("Success");
                } else {
                    me.tools.alert.error("Error.");
                }
                p.setLoading(false);
            }
        }).read('fixdate');
    },
    timeProcessOnClick: function() {
        var me = this;
        var tools = new Hrd.library.absentrecord.Tools();
        var f = me.getFormtime();

        var rec = me.getGrid().getSelectedRecord();
        var data = {};
        var timeIn = f.down("[name=time_in]").getValue();
        var timeOut = f.down("[name=time_out]").getValue();
        var zoneIn = tools.getTimeZone(timeIn, true);
        var zoneOut = tools.getTimeZone(timeOut, false);
        if (zoneIn) {
            data[zoneIn] = f.down("[name=time_in]").getValue();
        } else {
            console.log("Tidak ada data in");
        }
        if (zoneOut) {
            data[zoneOut] = f.down("[name=time_out]").getValue();
        } else {
            console.log("gak ada data out");
        }

        if (rec) {
            //updatetime
            f.setLoading("Updating...");
            data = f.getForm().getValues();
            data["employee_id"] = me.getSelectedEmployee().get("employee_employee_id");
            data["month"] = me.getSelectedMonth();
            data["year"] = me.getSelectedYear();
            data["day"] = rec.get("day");

            data['time_in'] = timeIn;
            data['time_out'] = timeOut;
            data['shifttype_shifttype_id'] = rec.get("shifttype_shifttype_id");

            me.tools.ajax({
                params: data,
                success: function(data, model) {

                    if (data['others'][0][0]['HASIL']) {
                        me.tools.alert.info("Success");
                    } else {
                        me.tools.alert.warning(data['others'][0][0]['MSG']);
                    }
                    f.setLoading(false);
                    f.up("window").close();
                    me.emGrid().select();

                }
            }).read('updatetime');
        } else {
            console.log("gak ada data");
        }

    },
    tlkProcessOnClick: function() {
        var me = this;
        var f = me.getFormtlk();
        var g = f.down("grid");
        var rec = g.getSelectedRecord();
        if (!rec) {
            return;
        }
        var data = f.getForm().getValues();
        data['parametertlk_id'] = rec.get('parametertlk_id');

        me.tools.hermes(f).save(data, 'createtlk');

    },
    reasonProcessOnClick: function() {
        var me = this;
        var f = me.getFormreason();
        f.setLoading("Saving your data");
        var data = f.getForm().getValues();
        var at = f.down("[name=absenttype_absenttype_id]");
        var sat = at.getStore();

        if (at.getValue() > 0) {
            var atg = sat.getAt(sat.findExact('absenttype_id', at.getValue())).get('absenttypegroup_absenttypegroup_id');
            console.log(atg);
            console.log(at.getValue());
            data["absenttypegroup_absenttypegroup_id"] = atg;
        }

        me.tools.ajax({
            params: data,
            success: function(data, model) {
                console.log(data);
                if (data['others'][0][0]['HASIL']) {
                    me.tools.alert.info("Success");
                } else {
                    me.tools.alert.warning(data['others'][0][0]['MSG']);
                }
                f.setLoading(false);
            }
        }).read('createreason');

    },
    isCutiChange: function() {
        var me = this;
        var f = me.getFormreason();
        var s = f.down("[name=absenttype_absenttype_id]").getStore();
        // filter untuk tipe cuti saja

        var idGroupLeave = me.globalParams['ABSENTTYPEGROUP_LEAVE'];
        var v = f.down("[name=is_cuti]").getValue();
        s.clearFilter();

        if (v === false)
            return false;

        if (s.getCount() > 0 && idGroupLeave > 0) {

            f.down("[name=absenttype_absenttype_id]").setValue(false);
            s.filterBy(function(rec, id) {

                if (rec.raw.absenttypegroup_absenttypegroup_id === idGroupLeave) {
                    return true;
                }
                else {
                    return false;
                }
            });
        }
    },
    gridTimeItemClick: function(index) {
        var me = this;
        var rec = me.getGrid().getStore().getAt(index);


        me.instantWindow("FormTime", 600, "Time", "processtime", "toolProcessTimeWinId");


        var f = me.getFormtime();

        console.log(rec);
        if (!rec) {
            console.log("Tidak ada absent sheet yang terpilih");
            return;
        }
        f.down("[name=absentdetail_id]").setValue(rec.get("absentdetail_id"));

        // set default time in dan time out

        var timeIn = {}, timeOut = {};
        timeIn['A'] = me.tools.dateFunc(rec.get('in_7_14')).toHIS();
        timeIn['B'] = me.tools.dateFunc(rec.get('in_15_21')).toHIS();
        timeIn['C'] = me.tools.dateFunc(rec.get('in_22_6')).toHIS();
        timeOut['A'] = me.tools.dateFunc(rec.get('out_7_14')).toHIS();
        timeOut['B'] = me.tools.dateFunc(rec.get('out_15_21')).toHIS();
        timeOut['C'] = me.tools.dateFunc(rec.get('out_22_6')).toHIS();

        /// check yang ada datannya
        var fixTimeIn = false;
        var fixTimeOut = false;


        for (var i in timeIn) {
            if (!fixTimeIn) {
                if (me.tools.timeToDecimal(timeIn[i]) > 0) {
                    fixTimeIn = timeIn[i];
                }
            }

        }

        for (var i in timeOut) {
            if (!fixTimeOut) {
                if (me.tools.timeToDecimal(timeOut[i]) > 0) {
                    fixTimeOut = timeOut[i];
                }
            }

        }

        if (fixTimeIn) {
            f.down("[name=time_in]").setValue(fixTimeIn);
        }

        if (fixTimeOut) {
            f.down("[name=time_out]").setValue(fixTimeOut);
        }





    },
    gridTlkItemClick: function(index) {
        var me = this;

        var rec = me.getGrid().getStore().getAt(index);

        me.instantWindow("FormTlk", 600, "TLK", "processtlk", "toolProcessTlkWinId");

        var f = me.getFormtlk();
        var sg = f.down("grid");
        var w = f.up("window");
        f.setLoading("Please wait..");
        me.tools.ajax({
            params: {},
            success: function(data, model) {


                me.tools.wesea({
                    data: data,
                    model: model
                }, sg).grid();


                var recE = me.getSelectedEmployee();

                if (recE) {
                    f.down("[name=employee_employee_id]").setValue(recE.get("employee_employee_id"));
                }


                /// set default date
                if (rec) {
                    var date = new Date();
                    date.setFullYear(me.getSelectedYear());
                    date.setMonth(me.getSelectedMonth() - 1);
                    date.setDate(rec.get('day'));
                    f.down("[name=start_date]").setValue(date);
                    f.down("[name=end_date]").setValue(date);


                    /// jika sudah ada onduty
                    var onDutyId = rec.get('parametertlk_parametertlk_id');
                    var index = sg.getStore().findExact('parametertlk_id', onDutyId);
                    if (index >= 0) {
                        sg.getSelectionModel().select(index);
                    }
                }


                f.setLoading(false);
            }
        }).read('tlklist');
    },
    gridReasonItemClick: function(index) {
        var me = this;
        //  console.log(me.getGrid().getColumnModel());
        var rec = me.getGrid().getStore().getAt(index);
        //Hrd.view.absentrecord.FormReason
        me.instantWindow("FormReason", 400, "Alasan Tidak Hadir", "processreason", "toolProcessReasonWinId");
        console.log(rec);
        var f = me.getFormreason();
        var w = f.up("window");
        f.setLoading("Please wait..");
        me.tools.ajax({
            params: {},
            success: function(data, model) {
                me.tools.wesea(data.absenttype, f.down("[name=absenttype_absenttype_id]")).comboBox();

                me.globalParams['ABSENTTYPEGROUP_LEAVE'] = me.tools.intval(data.others[0][0]['ABSENTTYPEGROUP_LEAVE']);

                /// set default date
                if (rec) {
                    var date = new Date();
                    date.setFullYear(me.getSelectedYear());
                    date.setMonth(me.getSelectedMonth() - 1);
                    date.setDate(rec.get('day'));
                    f.down("[name=start_date]").setValue(date);
                    f.down("[name=end_date]").setValue(date);
                }

                var recE = me.getSelectedEmployee();
                console.log(recE);
                if (recE) {
                    f.down("[name=employee_employee_id]").setValue(recE.get("employee_employee_id"));
                }


                f.setLoading(false);
            }
        }).read('detailreason');

    },
    mainPanelBeforeRender: function(configs) {
        this.callParent(arguments);
        this.addCSSRule(document.styleSheets[0], "weekend-row", "background-color:red !important:");
    },
    addCSSRule: function(sheet, selector, rules, index) {
        if ("insertRule" in sheet) {
            sheet.insertRule(selector + "{" + rules + "}", index);
        }
        else if ("addRule" in sheet) {
            sheet.addRule(selector, rules, index);
        }
    },
    toolExcel: function() {
        var me = this;

        var x = {
            form: function() {

                me.instantWindow("FormToolFileInput", 400, "Import from Excel", "processexcel", "toolProcessExcelWinId");

            },
            fileOnChange: function() {
                var that = this;
                var f = me.getFormexcel();
                var vs = f.getValues();

                that.uploadImage({
                    form: f,
                    callback: {
                        success: function(imageName) {
                            console.log(imageName);
                        },
                        failure: function() {

                        }
                    }
                });

            },
            uploadImage: function(params) {

                var form = params.form;
                var callback = params.callback;

                form.submit({
                    url: 'hrd/' + me.controllerName + '/read',
                    params: {
                        mode_read: 'uploadexcel'
                    },
                    waitMsg: 'Uploading file...',
                    success: function(f, a) {
                        var respon = a.result.data.others[0][0];
                        if (respon) {
                            me.tools.alert.info(respon.MSG);
                        }
                    },
                    failure: function(f, a) {
                        //  me.dataSave(me,dataForm);

                        callback.failure();
                        var msg = "...";
                        var respon = a.result.data.others[0][0];

                        if (respon) {
                            me.tools.alert.warning(respon.MSG);
                        }

                    }
                });
            }
        };
        return x;
    },
    toolTotalHourandLost: function() {
        var me = this;

        var x = {
            form: function() {

                me.instantWindow("FormToolProcessHourandLost", 400, "Process Hour and Lost Time", "processhal", "toolProcessHaLWinId");

            },
            processOnClick: function() {
                var f = me.getFormhal();
                var vs = f.getValues();
                var opt = vs["option"];
                var ajaxParams = {};
                var isValid = false;
                switch (opt) {
                    case "employee":
                        var emId = me.getSelectedEmployee();
                        if (emId) {
                            isValid = true;
                            ajaxParams = {
                                month: me.getSelectedMonth(),
                                year: me.getSelectedYear(),
                                process: 'employee',
                                employee_id: emId.get("employee_employee_id")
                            };
                        } else {
                            me.tools.alert.warning("Please select employee first");
                        }

                        break;
                    case "division":
                        var divId = me.getSelectedDepartment();
                        if (divId === 0 || divId === 999) {
                            me.tools.alert.warning("Please select department first");

                        } else {
                            isValid = true;
                            ajaxParams = {
                                month: me.getSelectedMonth(),
                                year: me.getSelectedYear(),
                                process: 'department',
                                department_id: divId
                            };
                        }
                        break;
                    case "all":
                        isValid = true;
                        ajaxParams = {
                            month: me.getSelectedMonth(),
                            year: me.getSelectedYear(),
                            process: 'all'
                        };
                        break;
                }
                if (isValid) {
                    f.setLoading("Processing...");
                    me.tools.ajax({
                        params: ajaxParams,
                        success: function(data, model) {

                            if (data['others'][0][0]['STATUS']) {
                                me.tools.alert.info("Success");

                            } else {
                                me.tools.alert.error("Something error when processing your request");
                            }
                            f.setLoading(false);
                        }
                    }).read('processhal');
                }


            }


        };
        return x;
    },
    toolProcessDay: function() {
        var me = this;

        var x = {
            process: function() {
                var p = me.getPanel();
                p.setLoading("Processing Day..");
                me.tools.ajax({
                    params: {
                        month: me.getSelectedMonth(),
                        year: me.getSelectedYear()
                    },
                    success: function(data, model) {

                        if (data['others'][0][0]['STATUS']) {
                            me.tools.alert.info("Success");

                        } else {
                            me.tools.alert.error("Something error when processing your request");
                        }
                        p.setLoading(false);
                    }
                }).read('processday');
            }
        };
        return x;
    },
    toolProcessLate: function() {
        var me = this;

        var x = {
            form: function() {

                me.instantWindow("FormToolProcessLate", 400, "Process Late", "processlate", "toolProcessLateWinId");

            },
            processOnClick: function() {
                var f = me.getFormlate();
                var vs = f.getValues();
                var opt = vs["option"];
                var ajaxParams = {};
                var isValid = false;
                switch (opt) {
                    case "employee":
                        var emId = me.getSelectedEmployee();
                        if (emId) {
                            isValid = true;
                            ajaxParams = {
                                month: me.getSelectedMonth(),
                                year: me.getSelectedYear(),
                                process: 'employee',
                                employee_id: emId.get("employee_employee_id")
                            };
                        } else {
                            me.tools.alert.warning("Please select employee first");
                        }

                        break;
                    case "division":
                        var divId = me.getSelectedDepartment();
                        if (divId === 0 || divId === 999) {
                            me.tools.alert.warning("Please select department first");

                        } else {
                            isValid = true;
                            ajaxParams = {
                                month: me.getSelectedMonth(),
                                year: me.getSelectedYear(),
                                process: 'department',
                                department_id: divId
                            };
                        }
                        break;
                    case "all":
                        isValid = true;
                        ajaxParams = {
                            month: me.getSelectedMonth(),
                            year: me.getSelectedYear(),
                            process: 'all'
                        };
                        break;
                }
                if (isValid) {
                    f.setLoading("Processing...");
                    me.tools.ajax({
                        params: ajaxParams,
                        success: function(data, model) {

                            if (data['others'][0][0]['STATUS']) {
                                me.tools.alert.info("Success");

                            } else {
                                me.tools.alert.error("Something error when processing your request");
                            }
                            f.setLoading(false);
                        }
                    }).read('processlate');
                }


            }


        };
        return x;
    },
    transferAjax: function(form, current, all) {
        var me = this;
        form.setLoading("Progress : " + current + " of " + all);
        me.tools.ajax({
            params: {data: Ext.encode(me.fpnl[current - 1])},
            autoAbort: true,
            success: function(data, model) {

                if (data['others'][0][0]['STATUS']) {

                    if (current < all) {
                        me.transferAjax(form, current + 1, all);
                    } else {
                        form.setLoading(false);
                    }


                } else {
                    me.tools.alert.warning("Error");
                    form.setLoading(false);

                }


            }

        }).read('transfersave');
    },
    toolTransfer: function() {
        var me = this;

        var x = {
            form: function() {

                me.instantWindow("FormToolTransfer", 400, "Transfer", "transfer", "tooltransferWinId");
                var date = new Date();
                date.setFullYear(me.getSelectedYear());
                date.setMonth(me.getSelectedMonth() - 1);
                me.getFormtransfer().down("[name=start_day]").setValue(date);
                me.getFormtransfer().down("[name=end_day]").setValue(date);

            },
            processOnClick: function() {
                var f = me.getFormtransfer();
                var vs = f.getValues();
                f.setLoading("Request transfer...");



                var fromDate = new Date(f.down("[name=start_day]").getValue());
                var endDate = new Date(f.down("[name=end_day]").getValue());
                var startDay = fromDate.getDate();

                var endDay = endDate.getDate();






                me.tools.ajax({
                    params: {
                        month: me.tools.intval(fromDate.getMonth()) + 1,
                        year: fromDate.getFullYear(),
                        start_day: startDay,
                        end_day: endDay,
                        is_delete: vs['delete']
                    },
                    autoAbort: true,
                    success: function(data, model) {

                        if (data['others'][0][0]['STATUS']) {
                            // me.tools.alert.info("Success transfer");
                            me.fpnl = data['others'][0][0]['FPNUMBERLIST'];//FPNUMBERLIST


                            me.transferAjax(f, 1, me.fpnl.length);

                        } else {
                            me.tools.alert.warning(data['others'][0][0]['ERRORMSG']);

                        }

                        //  f.setLoading(false);
                        //f.up("window").close();
                    }

                }).read('transferinfo');

            }



        };
        return x;
    },
    toolDelete: function() {
        var me = this;

        var x = {
            form: function() {

                me.instantWindow("FormToolDelete", 400, "Delete Data", "delete", "tooldeleteWinId");

            },
            confirm: function(buttonForm) {
                var that = this;
                Ext.Msg.show({
                    title: 'Confirm',
                    msg: 'Do you want delete this data?',
                    buttons: Ext.Msg.YESNO,
                    icon: Ext.Msg.QUESTION,
                    fn: function(clicked) {
                        that.confirmClicked(clicked, buttonForm.up("form"));
                        buttonForm.up("window").destroy();
                    }
                });
            },
            confirmClicked: function(clicked, form) {
                var vs = form.getValues();
                if (clicked === "yes") {

                    var eg = me.getGridemployee();
                    var g = me.getGrid();
                    var receg = eg.getSelectedRecord();
                    var rec = g.getSelectedRecord();


                    if (vs["option"] === "employee") {
                        if (receg) {
                            var p = me.getPanel();
                            p.setLoading("Please wait, deleting absent...");
                            me.tools.ajax({
                                params: {
                                    absent_id: receg.get("absent_id")
                                },
                                success: function(data, model) {

                                    if (data['others'][0][0]['STATUSDELETE']) {
                                        me.tools.alert.info("Absent successful deleted");
                                        me.emGrid().select();
                                    } else {
                                        me.tools.alert.error("Something error when processing your request");
                                    }
                                    p.setLoading(false);
                                }
                            }).read('deletemainabsent');
                        }
                    } else if (vs["option"] === "date") {
                        if (rec) { // selected absent ?
                            var p = me.getPanel();
                            p.setLoading("Please wait, deleting absent record...");
                            me.tools.ajax({
                                params: {
                                    absentdetail_id: rec.get("absentdetail_id")
                                },
                                success: function(data, model) {

                                    if (data['others'][0][0]['STATUSDELETE']) {
                                        me.tools.alert.info("Absent date successful deleted");
                                        me.emGrid().select();
                                    } else {
                                        me.tools.alert.error("Something error when processing your request");
                                    }
                                    p.setLoading(false);
                                }
                            }).read('deleteabsentdate');
                        }
                    }
                }
            }

        };
        return x;
    },
    continueOnClick: function(el) {
        var me = this;
        var f = me.getFormgen();
        var d = f.down("[name=date]").getValue();
        var valid = me.tools.inputMonthYear(d);
        if (valid.valid) {
            var validDate = valid.date;
            var g = me.getGridemployee();
            f.setLoading("Please wait...");
            var s = g.getStore();



            s.load({
                params: {
                    mode_read: 'new',
                    month_pick: validDate.getMonth() + 1,
                    year_pick: validDate.getFullYear()
                },
                callback: function() {
                    f.setLoading(false);

                    me.tools.alert.info("Updated", function() {
                        f.up("window").close();
                    });

                    me.panelAfterRender(me.getPanel());


                }
            });
        } else {
            me.tools.alert.warning(valid.msg);
        }

    },
    monthPickOnChange: function(el) {
        var me = this;
        var f = me.getFormsearch();
        me.myFilters().department(f.down("[name=year_pick]").getValue(), el.getValue());

        me.myFilters().employee(f.down("[name=year_pick]").getValue(), f.down('[name=month_pick]').getValue(), f.down('[name=search_department_id]').getValue());
    },
    filterEmployeeList: function() {
        var me = this;
        var f = me.getFormsearch();
        me.myFilters().employee(f.down("[name=year_pick]").getValue(), f.down('[name=month_pick]').getValue(), f.down('[name=search_department_id]').getValue());



    },
    yearPickOnChange: function(el) {
        var me = this;
        var f = me.getFormsearch();
        me.myFilters().month(el.getValue());
        me.myFilters().department(el.getValue(), me.getFormsearch().down("[name=month_pick]").getValue());
        me.myFilters().employee(f.down("[name=year_pick]").getValue(), f.down('[name=month_pick]').getValue(), f.down('[name=search_department_id]').getValue());
        /*var me = this;
         var v = el.getValue();
         var ms = me.getFormsearch().down("[name=month_pick]").getStore();
         
         ms.clearFilter(true);
         ms.filterBy(function(rec, id) {
         
         if (rec.raw.year === v) {
         return true;
         }
         else {
         return false;
         }
         });
         me.getFormsearch().down("[name=month_pick]").setValue("");
         */

    },
    resetGrid: function() {
        var me = this;
        var grid = me.getFormsearch().down("absentrecordemployeegrid");
        if (grid) {
            me.getFormsearch().down('absentrecordemployeegrid').getStore().loadData([], false);

        }
        me.getGrid().getStore().loadData([], false);

    },
    filterDepartment: function(el, val) {
        var me = this;
        var fs = me.getFormsearch();
        var grid = fs.down("absentrecordemployeegrid");

        if (grid) {
            var s = fs.down("absentrecordemployeegrid").getStore();
            s.clearFilter(true);
            if (s.getCount() > 0 && val) {

                s.filterBy(function(rec, id) {

                    if (rec.raw.department.department_id === val) {
                        return true;
                    }
                    else {
                        return false;
                    }
                });
            }
        }

    },
    showFormReason: function() {
        var me = this;
        me.instantWindow("FormDataReason", 600, "Reason", "create", "reasonwindow");

    },
    showFormOnduty: function() {
        var me = this;
        me.instantWindow("FormDataOnduty", 400, "On Duty Outside", "create", "ondutywindow");
    },
    /* employee Grid */
    emGrid: function() {
        var me = this;
        var x = {
            fdar: function() {

            },
            select: function() {
                var g = me.getGridemployee();
                var rec = g.getSelectedRecord();
                if (rec) {
                    var emId = rec.get("employee_employee_id");
                    var gm = me.getGrid();
                    var s = gm.getStore();
                    s.getProxy().extraParams.month = me._getDate().getMonth();
                    s.getProxy().extraParams.year = me._getDate().getYear();
                    s.getProxy().extraParams.employee_id = emId;
                    g.setLoading("Please wait...");
                    s.load({
                        callback: function() {
                            g.setLoading(false);
                        }
                    });
                }
            }
        };
        return x
    },
    shift: function() {
        var me = this;
        var x = {
            insertToSheet: function() {
                var g = me.getGrid();
                var f = me.getFormshift();
                var s = g.getStore();
                var selectedShift = f.down("[name=shifttype_id]").getSelectedRec();
                if (selectedShift) {
                    var pos = 0;
                    var cbVal = false;
                    var updatedDate = [];

                    /// get selected day in form
                    var vs = f.getValues();
                    var currentDay = 0;
                    var selectedDays = [];
                    var dayDeli = "";
                    for (var i = 1; i < 32; i++) {
                        currentDay = vs['day_' + i];
                        if (currentDay) {
                            selectedDays.push(i);
                            dayDeli += i + "~";
                        }
                    }


                    if (selectedDays.length > 0) {
                        var curIndex = -1;
                        var curRec = null;
                        for (var i = 0; i < selectedDays.length; i++) {
                            curIndex = s.findExact('day', selectedDays[i]);
                            if (curIndex > -1) {
                                curRec = s.getAt(curIndex);
                                if (curRec) {
                                    updatedDate.push({
                                        absentdetail_id: curRec.get("absentdetail_id"),
                                        shifttype_shifttype_id: f.down("[name=shifttype_id]").getValue()
                                    });
                                    curRec.beginEdit();
                                    curRec.set({
                                        shifttype_code: selectedShift.get("code")
                                    });
                                    curRec.endEdit();
                                }

                            }
                        }

                        /*
                         s.each(function(rec) {
                         cbVal = f.down("[name=day_" + selectedDays[pos] + "]").getValue();
                         
                         if (rec != null && cbVal) {
                         console.log(rec.get("day"));
                         updatedDate.push({
                         absentdetail_id: rec.get("absentdetail_id"),
                         shifttype_shifttype_id: f.down("[name=shifttype_id]").getValue()
                         });
                         rec.beginEdit();
                         rec.set({
                         shifttype_code: selectedShift.get("code")
                         });
                         rec.endEdit();
                         }
                         pos++;
                         });
                         */
                    } else {
                        me.tools.alert.warning("No day selected");
                    }





                    var params = {
                        mode_create: "setupsheet",
                        data: {
                            month: me._getDate().getMonth(),
                            detail: updatedDate,
                        }
                    };

                    /*
                     console.log(vs);
                     console.log(selectedDays);
                     return;
                     */


                    if (vs["pilihan_target"] === "employee") {
                        Ext.Ajax.request({
                            url: 'hrd/absentrecord/create',
                            success: function(response) {
                                var info = Ext.JSON.decode(response.responseText);
                                Ext.Msg.alert('Status', info.msg);
                                if (info.msg === "SUCCESS") {
                                    f.up("window").close();
                                }

                            },
                            params: {data: Ext.encode(params)}

                        });
                    } else if (vs["pilihan_target"] === "division" || vs["pilihan_target"] === "all") {
                        me.tools.ajax({
                            params: {
                                department_id: me.getSelectedDepartment(),
                                shifttype_id: vs["shifttype_id"],
                                days: dayDeli,
                                month: me.getSelectedMonth(),
                                year: me.getSelectedYear(),
                                update_type: vs["pilihan_target"]
                            },
                            success: function(data, model) {
                                var status = data["others"][0][0]["STATUS"];
                                if (!status) {
                                    me.tools.alert.warning(data["others"][0][0]["MSG"]);
                                } else {
                                    me.tools.alert.info("Success");
                                }
                                f.setLoading(false);

                            }
                        }).read('setupshift');
                    }



                } else {
                    me.tools.alert.warning("Mohon cek pilihan tipe shift");
                }

            },
            fdar: function(el) {
                var cb = ["shifttype_id"];
                var f = me.getFormshift();
                for (var c in cb) {
                    var cmp = f.down("[name=" + cb[c] + "]");
                    if (cmp) {
                        f.down("[name=" + cb[c] + "]").bindPrefixName = me.controllerName;
                        f.down("[name=" + cb[c] + "]").doInit(true, function() {
                            f.setLoading(false);
                        });
                    }

                }
                /// check for selected day
                var g = me.getGrid();
                var recs = g.getSelectionModel().selected.items;
                if (recs.length > 0) {
                    for (var i in recs) {
                        f.down("[name=day_" + recs[i].get("day") + "]").setValue(1);
                    }

                }

            },
            winShow: function() {
                /// check sheet
                var c = me.getGrid().getStore().getCount();

                if (c > 0) {
                    me.instantWindow("FormSetupShift", 700, "Setup Shift", "create", "setupshiftwindow");
                } else {
                    Ext.Msg.alert('Alert', 'Please generate next periode first');
                }

            },
            comboOnChange: function(el) {
                var f = me.getFormshift();
                f.loadRecord(el.getSelectedRec());

            },
            genHoliday: function(el) {
                var f = me.getFormshift();
                me.instantWindow("FormEmployeeOption", 400, "Generate From Holiday", "generate", "GenerateHolWinID");

            },
            genHolidayProcess: function(el) {
                var f = me.getFormgenholiday();
                var vs = f.getValues();
                console.log(vs);
                switch (vs["option"]) {
                    case "employee":
                        var emp = me.getGridemployee().getSelectedRecord();
                        if (emp) {
                            f.setLoading("Generate shift from holiday...");
                            me.tools.ajax({
                                params: {
                                    month: me.getSelectedMonth(),
                                    year: me.getSelectedYear(),
                                    process_type: "employee",
                                    employee_id: emp.get("employee_employee_id")
                                },
                                success: function(data, model) {
                                    var status = data["others"][0][0]["STATUS"];
                                    if (!status) {
                                        me.tools.alert.warning(data["others"][0][0]["MSG"]);
                                    } else {
                                        me.tools.alert.info("Success");
                                    }
                                    f.setLoading(false);

                                }
                            }).read('genholiday');
                        } else {
                            me.tools.alert.warning("Please select employee first");
                        }
                        break;
                    case "division":
                        var d = me.getSelectedDepartment();
                        if (d == 999) {
                            me.tools.alert.warning("Please select department first");
                        } else {
                            f.setLoading("Generating from holiday...");
                            me.tools.ajax({
                                params: {
                                    process_type: "department",
                                    month: me.getSelectedMonth(),
                                    year: me.getSelectedYear(),
                                    department_id: me.getSelectedDepartment()
                                },
                                success: function(data, model) {
                                    var status = data["others"][0][0]["STATUS"];
                                    if (!status) {
                                        me.tools.alert.warning(data["others"][0][0]["MSG"]);
                                    } else {
                                        me.tools.alert.info("Success");
                                    }
                                    f.setLoading(false);

                                }
                            }).read('genholiday');
                        }

                        break;
                    case "all":
                        f.setLoading("Generating from holiday...");
                        me.tools.ajax({
                            params: {
                                process_type: "all",
                                month: me.getSelectedMonth(),
                                year: me.getSelectedYear()
                            },
                            success: function(data, model) {
                                var status = data["others"][0][0]["STATUS"];
                                if (!status) {
                                    me.tools.alert.warning(data["others"][0][0]["MSG"]);
                                } else {
                                    me.tools.alert.info("Success");
                                }
                                f.setLoading(false);

                            }
                        }).read('genholiday');
                        break;
                }

            }
        };
        return x;
    },
    _getDate: function() {
        var me = this;
        var fs = me.getFormsearch();

        var x = {
            getMonth: function() {
                var m = parseInt(fs.down("[name=month_pick]").getValue());
                m = isNaN(m) ? 0 : m;
                return m;
            },
            getYear: function() {
                var y = parseInt(fs.down("[name=year_pick]").getValue());
                y = isNaN(y) ? 0 : y;
                return y;
            }
        };
        return x;
    },
    generateSheet: function() {
        var me = this;
        me.instantWindow("FormGenerateSheet", 400, "Generate New Period", "create", "generatesheetwindow");
        var monthPickStore = me.getFormsearch().down("[name=month_pick]").getStore();


        me.tools.ajax({
            params: {
            },
            success: function(data, model) {
                var f = me.getFormgen();

                f.down("[name=date]").setValue(data["others"][0][0]["DATA"]);
                //  p.setLoading(false);

            }
        }).read('periodeterakhir');

        /*
         // get max value
         var maxId = 0;
         if (monthPickStore.getCount() > 0)
         {
         maxId = monthPickStore.getAt(0).get('number'); // initialise to the first record's id value.
         monthPickStore.each(function(rec) // go through all the records
         {
         maxId = Math.max(maxId, rec.get('number'));
         });
         }
         
         // set default value
         var f = me.getFormgen();
         var d = new Date();
         var m = maxId + 1;
         m = m < 10 ? '0' + m : m;
         var y = d.getFullYear();
         */







    },
    panelAfterRender: function(el) {
        var me = this;
        var f = me.getFormsearch();
        el.up("window").maximize();
        me.tools.ajax({
            params: {},
            success: function(data, model) {

                var years = data['others'][0][0];
                var highYear = 0;
                var highMonth = 0;
                var highDepartment = 0;
                if (years) {
                    var ys = f.down("[name=year_pick]").getStore();
                    ys.loadData([], false); // added 26/01/2016
                    for (var i in years) {
                        ys.add({
                            number: years[i]['year'],
                            name: years[i]['year']
                        });
                    }
                    if (ys.getCount() > 0) {
                        highYear = ys.getAt(ys.getCount() - 1).get('number');
                        f.down("[name=year_pick]").setValue(highYear);
                    }

                }

                var months = data['others'][1][0];



                if (months) {
                    var ms = f.down("[name=month_pick]").getStore();
                    ms.loadData([], false); // added 26/01/2016
                    for (var i in months) {
                        ms.add({
                            number: months[i]['month'],
                            name: months[i]['month'],
                            year: months[i]['year']
                        });
                    }

                    ms.filter([
                        {filterFn: function(item) {
                                return item.get("year") == highYear;
                            }}
                    ]);
                    if (ms.getCount() > 0) {
                        highMonth = ms.getAt(ms.getCount() - 1).get('number');
                        f.down("[name=month_pick]").setValue(highMonth);

                    }

                }

                var departments = data['others'][2][0];

                if (departments) {
                    var ds = f.down("[name=search_department_id]").getStore();
                     ds.loadData([], false); // added 26/01/2016
                   // ds.data.clear();
                  //  ds.sync();
                    for (var i in departments) {
                        ds.add({
                            department_id: departments[i]['department_id'],
                            department: departments[i]['department'],
                            year: departments[i]['year'],
                            month: departments[i]['month']
                        });
                    }



                    if (ds.getCount() > 0) {
                        console.log("[TEST1] " + (highYear) + "." + highMonth);

                        ds.each(function(rec) {

                            if (rec != null) {
                                console.log(rec);
                            }

                        });

                        ds.filter([
                            {filterFn: function(item) {
                                    return item.get("year") == highYear && item.get("month") == highMonth;
                                }}
                        ]);
                        console.log("[TEST2] " + (ds.getCount() - 1));
                        var tempRec = ds.getAt(ds.getCount() - 1);
                        if (tempRec) {
                            highDepartment = tempRec.get('department_id');
                            f.down("[name=search_department_id]").setValue(highDepartment);
                            alert("Sukses");
                        } else {
                            console.log("[ABSENT E003] Tidak data record top");
                        }

                    } else {
                        console.log("[ABSENT E002] Tidak ada data store departemen");
                    }


                } else {
                    console.log("[ABSENT E001] Tidak ada departemen");
                }

                var g = me.getGridemployee();
                g.doInit();
                g.getStore().load({
                    callback: function(rec, op) {
                        g.attachModel(op);



                        me.myFilters().employee(highYear, highMonth, highDepartment);



                    }
                });

            }
        }).read('filters');

    },
    myFilters: function() {
        var me = this;
        var x = {
            month: function(year) {
                var el = me.getFormsearch().down("[name=month_pick]");
                var ms = el.getStore();
                ms.clearFilter(true);
                ms.filter([
                    {filterFn: function(item) {
                            return item.get("year") == year;
                        }}
                ]);
                if (ms.getCount() > 0) {
                    var highMonth = ms.getAt(ms.getCount() - 1).get('number');
                    el.setValue(highMonth);
                    return highMonth;
                }
                return 0;

            },
            department: function(year, month) {
                var el = me.getFormsearch().down("[name=search_department_id]");
                var ds = el.getStore();


                ds.clearFilter(true);

                ds.filter([
                    {filterFn: function(item) {
                            return item.get("year") == year && item.get("month") == month;
                        }}
                ]);
                if (ds.getCount() > 0) {
                    var highDepartment = ds.getAt(ds.getCount() - 1).get('department_id');
                    el.setValue(highDepartment);
                    return highDepartment;
                }

                return 0;

            },
            employee: function(year, month, department) {
                var g = me.getGridemployee();
                var es = g.getStore();
                es.clearFilter(true);
                es.filter([
                    {filterFn: function(item) {
                            return item.get("year") == year && item.get("month") == month && item.get("department_department_id") == department;
                        }}
                ]);
                var f = me.getFormsearch();
                var s = f.down('absentrecordemployeegrid').getStore();
                if (s.getCount() > 0) {
                    f.down('absentrecordemployeegrid').getSelectionModel().select(0);
                }
            }
        };
        return x;
    },
    viewOneEmployeAbsent: function() {
        var me = this;
        var g = me.getGridemployee();
        var f = me.getFormsearch();
        // jika filter department datanya telah keload..
        if (me.filterLoaded.department && me.filterLoaded.employeeList) {
            g.getStore().clearFilter();

            // pilih salah satu department dari karyawan
            if (g.getStore().getCount() > 0) {
                var selectedEmp = g.getStore().getAt(0);
                var idDept = selectedEmp.get("department_department_id");
                f.down("[name=search_department_id]").setValue(idDept);
            }
        }
    },
    refreshFormFilter: function() {
        var me = this;
        var f = me.getFormsearch();
        var g = me.getGridemployee();
        g.doInit();
        g.getStore().load({
            callback: function(rec, op) {
                g.attachModel(op);

            }
        });
    },
    mainDataSave: function() {
        var me = this;

        var f = me.getFormdata();
        var g = me.getGrid();
        var s = g.getStore();
        var row = f.editedRow;
        var selectedShift = f.down("[name=shifttype_shifttype_id]").getSelectedRec();
        if (row < 0) {
            return;
        }
        if (!selectedShift) {
            Ext.Msg.alert('Alert', 'Please select shift type first.');
            return;
        }

        var rec = s.getAt(row);

        rec.beginEdit();
        rec.set({
            in_7_14: me._convertTime().formToGrid("timein"), // temporary store time in in timeA
            out_7_14: me._convertTime().formToGrid("timeout"), /// temporary store time out in timeA
            shifttype_code: selectedShift.get("code"),
            shifttype_shifttype_id: selectedShift.get("shifttype_id")
        });
        rec.endEdit();


        me.insSave({
            form: me.getFormdata(),
            grid: me.getGrid(),
            // store: me.localStore["detail"].store,
            finalData: function(data) {

                data["unit_unit_id"] = data["unit_id"];

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

        var cb = ["shifttype_shifttype_id"];
        var f = me.getFormdata();
        for (var c in cb) {
            var cmp = f.down("[name=" + cb[c] + "]");
            if (cmp) {
                f.down("[name=" + cb[c] + "]").bindPrefixName = me.controllerName;
                f.down("[name=" + cb[c] + "]").doInit(true, function() {
                    f.setLoading(false);
                });
            }

        }



        var x = {
            init: function() {




            },
            create: function() {

                me.unMask(1);
            },
            update: function() {
                f.editedRow = g.getSelectedRow();
                var rec = g.getSelectedRecord();

                if (rec) {
                    f.loadRecord(rec);
                    me.getTimeAByShiftType(rec);
                    me._convertTime().gridToForm("timein", rec.get("in_7_14"));
                    me._convertTime().gridToForm("timeout", rec.get("out_7_14"));
                }

                //shifttype_shifttype_id

                me.unMask(1);

            }
        };
        return x;
    },
    insACC: function(view, action, row) {
        var me = this;
        var grid = view.up("grid");
        switch (grid.itemId) {
            case "AbsentrecordGridStore":
                if (action == "destroy") {
                    // me.deleteUnitFromGrid(row);
                } else if (action == "update") {
                    // me.editUnitFromGrid(row);
                }
                break;
        }
    },
    _convertTime: function() {
        var me = this;
        var f = me.getFormdata();
        var x = {
            formToGrid: function(prefixField) {
                var hourObj = new Hrd.library.box.tools.Hour(f.down("[name=" + prefixField + "]").getValue());



                var time = new Date();

                time.setHours(hourObj.getHour());
                time.setMinutes(hourObj.getMinute());
                return time;
            },
            gridToForm: function(prefixField, date) {

                date = new Date(date);
                var h = me.util.number(date.getHours()).addZero(2) + ":" + me.util.number(date.getMinutes()).addZero(2) + ":00";
                f.down("[name=" + prefixField + "]").setValue(h);

            }
        };
        return x;
    },
    getDefaultDate: function() {
        var me = this;
        var selectedDay = me.getGrid().getSelectedRecord();
        selectedDay = selectedDay.get("day");
        var sd = new Date(); // start date
        var ed = new Date(); // end date
        sd.setDate(selectedDay);
        ed.setDate(selectedDay);
        sd.setFullYear(me._getDate().getYear());
        ed.setFullYear(me._getDate().getYear());

        sd.setMonth(me._getDate().getMonth() - 1);
        ed.setMonth(me._getDate().getMonth() - 1);
        return {
            sd: sd,
            ed: ed
        };
    },
    getTimeAByShiftType: function(rec) {
        console.log(rec);
    },
    /* selected filter di form search*/
    getSelectedEmployee: function() {
        return this.getGridemployee().getSelectedRecord();
    },
    getSelectedDepartment: function() {

        return this.getFormsearch().down("[name=search_department_id]").getValue();
    },
    getSelectedMonth: function() {
        return this.getFormsearch().down("[name=month_pick]").getValue();
    },
    getSelectedYear: function() {
        return this.getFormsearch().down("[name=year_pick]").getValue();
    }






});