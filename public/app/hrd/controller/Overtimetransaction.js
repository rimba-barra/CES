Ext.define('Hrd.controller.Overtimetransaction', {
    extend: 'Hrd.library.box.controller.ControllerByData',
    alias: 'controller.Overtimetransaction',
    requires: ['Hrd.library.box.tools.DefaultConfig', 'Hrd.library.box.tools.EventSelector',
        'Hrd.library.box.tools.ComboLoader', 'Hrd.library.box.tools.InstaView',
        'Hrd.minic.lookup.Employee', 
        'Hrd.library.box.tools.Hour',
        'Hrd.template.combobox.Statusovertimecombobox', //edited by ahmad riadi
        'Hrd.template.combobox.Overtimetiypeintranetcombobox', //edited by ahmad riadi
        'Hrd.library.box.tools.Dynamicrequest',
    ],        
    views: [],
    comboBoxIdEl: [],
    controllerName: 'overtimetransaction',
    formWidth: 600,
    dynamicrequest: null,
    refs: [
        {
            ref: 'formoptionsovertime',
            selector: 'overtimetransactionformoptionsovertime'
        },
        {
            ref: 'gridovertime',
            selector: 'overtimetransactionGridbrowseintranetovertime'
        },
        {
            ref: 'formdataovertime',
            selector: 'overtimeformdataintranetovertime'
        },
        
        // 
        {
            ref: 'formoptionsovertimeapi',
            selector: 'overtimetransactionformoptionsovertimeapi'
        },
        {
            ref: 'gridovertimeapi',
            selector: 'overtimetransactionGridbrowseapiovertime'
        },
        {
            ref: 'formdataovertimeapi',
            selector: 'overtimeformdataapiovertime'
        },
        
        /* added by Wulan Sari 2018.05.28 */
        {
            ref: 'gridlookupemployee',
            selector: 'lookupemployeegrid'
        },
        {
            ref: 'formsearhemployee',
            selector: 'lookupemployeeformsearch'
        },
        {
            ref: 'panellookupemployee',
            selector: 'lookupemployeepanel'
        },
        /* end added by Wulan Sari 2018.05.28 */
        
        // edit by wulan sari 20190903
        {
            ref: 'gridovertimedetail',
            selector: 'overtimetransactionGriddetail'
        },
        {
            ref: 'gridovertimedetailpopup',
            selector: 'overtimetransactionGriddetailpopup'
        },
        // end edit by wulan sari 20190903
    ],
    //unitFormula: null,
    //storeProcess: 'Otherspaymentdatadetail',
    bindPrefixName: 'Overtimetransaction',
    browseHandler: null,
    localStore: {
        selectedUnit: null,
        indexLembur: null
    },
    textCombos: [],
    comboLoader: null,
    fieldName: 'overtime_id',
    overtimeParameters: null,
    myParams: null,
    shiftInfo: null,
    validShift: false,
    currentStatusLembur: 0,
    validLembur: false,
    overtimeValue: 0,
    tempMatchIndeksLembur: null,
    tempHasilHitungIstirahat: null,
    configintranet: null,
    rowintranetovertime: null,
    intranet_jam_lembur_approve_before: '',
    intranet_jam_lembur_approve_after: '',
    constructor: function (configs) {
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
    },
    init: function () {
        
        if (typeof moment !== 'function') {
            Ext.Loader.injectScriptElement(document.URL + 'app/hrd/library/moment.min.js', function() {
                /// loaded
            }, function() {
                /// error
            });
        }
        
        var me = this;
        this.callParent(arguments);
        var newEvs = {};
        var events = new Hrd.library.box.tools.EventSelector();
        var hourObjects = ['plan_before_start', 'plan_before_end', 'plan_after_start',
            'plan_after_end', 'exec_time_out_start', 'exec_time_out_end',
            'exec_time_in_start', 'exec_time_in_end'];
        for (var x in hourObjects) {
            this.control(events.timeInput('overtimetransactionformdata', me.tools.inputHoursObjects(hourObjects[x])));

        }

        //lookup_employee
        newEvs['overtimetransactionformdata button[action=lookup_employee]'] = {
            click: function () {
                me.lookupEmployee();
            }

        };
        newEvs['overtimetransactionformdata button[action=process]'] = {
            click: function () {
                me.processData();
            }

        };
        
        // added by wulan sari 20180208
        newEvs['overtimetransactionformdata button[action=send_email_to_employee]'] = {
            click: function () {
                me.sendemailData();
            }
        };
        newEvs['overtimetransactionformdata button[action=send_email_to_approver]'] = {
            click: function () {
                me.sendemailjamData();
            }
        };
        // end added by wulan sari
        
        newEvs['overtimetransactionformdata [name=exec_time_in_start]'] = {
            blur: function () {
                // me.timeOnBlur();
            }

        };
        newEvs['overtimetransactionformdata [name=exec_time_in_end]'] = {
            blur: function () {
                //   me.timeOnBlur();
            }

        };
        newEvs['overtimetransactionformdata [name=exec_time_out_start]'] = {
            blur: function () {
                //   me.timeOnBlur();
            }

        };
        newEvs['overtimetransactionformdata [name=exec_time_out_end]'] = {
            blur: function () {
                //  me.timeOnBlur();
            }

        };
        newEvs['overtimetransactionformdata [name=date]'] = {
            select: function () {
                me.dateOnChange();
            }

        };
        newEvs['overtimetransactionformdata [name=status]'] = {
            select: function () {
                me.statusOnSelect();
            }

        };
        /* start added by ahmad riadi 14022018 */
        newEvs['overtimetransactionpanel button[action=browseintranet]'] = {
            click: function () {
                me.instantWindow("Formoptionsovertime", 920, "Browse Overtime", "options", "overtimetransactionformoptionsovertime");                
            }
        };
        newEvs['overtimetransactionformoptionsovertime'] = {
            afterrender: function () {
                me.formOptionsOvertimeAfterrender();
            }
        };
        newEvs['overtimetransactionGridbrowseintranetovertime actioncolumn'] = {
            click: this.gridIntranetOvertimeActionColumnClick
        }
        newEvs['overtimetransactionformoptionsovertime button[action=getdata]'] = {
            click: function () {
                var me;
                me = this;
                me.getFilterovertimeintranet();
            }

        };
        newEvs['overtimetransactionformoptionsovertime button[action=cleardata]'] = {
            click: function () {
                var me;
                me = this;
                me.getFormoptionsovertime().getForm().reset();
                me.getDataovertimeintranet();
            }

        };
        newEvs['overtimetransactionformoptionsovertime button[action=process]'] = {
            click: function () {
                var me;
                me = this;
                me.Processovertimeintranet();
            }

        };
        newEvs['overtimetransactionformoptionsovertime button[action=delete]'] = {
            click: function () {
                var me;
                me = this;
                me.Deleteovertimeintranet();
            }

        };
        newEvs['overtimeformdataintranetovertime'] = {
            afterrender: function () {
                var me, form;
                me = this;
                me.formDataOvertimeAfterrender();
            },
        };
        /* end added by ahmad riadi 14022018 */
        
        /*
         * added by Wulan Sari 2018.03.18
        */        
        newEvs['overtimetransactionpanel button[action=browseapi]'] = {
            click: function () {
                me.instantWindow("Formoptionsovertimeapi", 920, "Browse Overtime from Api", "options", "overtimetransactionformoptionsovertimeapi");                
            }
        };
        newEvs['overtimetransactionformoptionsovertimeapi'] = {
            afterrender: function () {
               me.formOptionsOvertimeAfterrenderApi();
            }
        };
        newEvs['overtimetransactionGridbrowseapiovertime actioncolumn'] = {
            click: this.gridApiOvertimeActionColumnClick
        }
        newEvs['overtimetransactionformoptionsovertimeapi button[action=getdata]'] = {
            click: function () {
                var me;
                me = this;
                me.getFilterovertimeapi();
            }
        };
        newEvs['overtimetransactionformoptionsovertimeapi button[action=cleardata]'] = {
            click: function () {
                var me;
                me = this;
                me.getFormoptionsovertimeapi().getForm().reset();
                me.getDataovertimeapi();
            }

        };
        newEvs['overtimetransactionformoptionsovertimeapi button[action=process]'] = {
            click: function () {
                var me;
                me = this;
                me.Processovertimeapi();
            }

        };
        newEvs['overtimetransactionformoptionsovertimeapi button[action=delete]'] = {
            click: function () {
                var me;
                me = this;
                me.Deleteovertimeapi();
            }

        };
        newEvs['overtimeformdataapiovertime'] = {
            afterrender: function () {
                var me, form;
                me = this;
                me.formDataOvertimeapiAfterrender();
            },
        };
        /*
         * end added by Wulan Sari 2018.03.18
        */  
        

        /* added by Wulan Sari 2018.05.28 */
        newEvs['#employeeOvertimetransactionwindow lookupemployeegrid button[action=select]'] = {
            click: function () {
                me.selectEmployee();
            }
        };
        newEvs['#employeeOvertimetransactionwindow lookupemployeegrid'] = {
            afterrender: function () {
                var me, grid;
                me = this;
                grid = me.getGridlookupemployee();
                grid.down("toolbar [action=select]").setText('Select Employee');
                                
                me.tools.ajax({
                    params: {},
                    success: function (data, model) {
                        panel = me.getPanellookupemployee();
                        me.tools.wesea(data.department, panel.down("[name=department_department_id]")).comboBox(true);                
                    }
                }).read('parameter');       

            }
        };
        newEvs['#employeeOvertimetransactionwindow lookupemployeeformsearch button[action=search]'] = {
            click: function () {
                me.searchOnClick();                
            }

        };
        newEvs['#employeeOvertimetransactionwindow lookupemployeeformsearch button[action=reset]'] = {
            click: function () {
                me.resetOnClick();                
            }

        };
        
        /* end added by Wulan Sari 2018.05.28 */
        
        me.dynamicrequest = new Hrd.library.box.tools.Dynamicrequest();
        this.control(newEvs);

    },
    // edit by wulan sari 20190309
    gridSelectionChange: function() {
        var me = this;
        me.callParent(arguments);
        var g = me.getGrid();
        var f = me.getFormdata();
        var vs = f.getForm().getValues();
        var rec = g.getSelectedRecord();
        f.getForm().reset();
        me.cancelOnClick();
        if (rec) {
            f.editedRow = g.getSelectedRow();
            f.loadRecord(rec);

            me.getPanel().down("toolbar button[action=delete]").setDisabled(false);
            
            var grid = me.getGridovertimedetail();
            grid.doInit();
            grid.getStore().removeAll();
            var ref_lembur_id = rec.get('ref_lembur_id');
            //console.log('ref_lembur_id ' + ref_lembur_id);
            var store = grid.getStore();
            if(ref_lembur_id != '' && ref_lembur_id != undefined){                
                store.getProxy().extraParams = {
                    mode_read: 'getdataovertimeintranetgetdetail',
                    ref_lembur_id: ref_lembur_id
                };
                store = store.load({
                    callback: function (data, model) {
                        grid.attachModel(model);
                        grid.store.sort({property: 'lembur_dari', direction: 'ASC'});
                        me.tools.ajax({
                            params: vs,
                            success: function (data, model) {

                                var hasil = me.tools.shortHasilArray(data);
                                if (hasil.length > 0) {

                                    hasil = hasil[0];
                                    me.shiftInfo = hasil;
                                    // console.log(me.shiftInfo);
                                    f.down("[name=shifttype_code]").setValue(hasil["shifttype"]);
                                    f.down("[name=in_time]").setValue(hasil["in_time"]);
                                    f.down("[name=out_time]").setValue(hasil["out_time"]);
                                    f.down("[name=day_name]").setValue(me.tools.dateFunc(vs['date']).getDayWeekName());

                                    f.down("[name=absen_in_time]").setValue(hasil["time_in"]);
                                    f.down("[name=absen_out_time]").setValue(hasil["time_out"]);

                                    if (hasil["in_time"] !== null && hasil["out_time"]) {
                                        var diffTime = me.tools.diffTime(hasil["in_time"], hasil["out_time"]);
                                        f.down("[name=work_hour_text]").setValue(me.tools.timeToDecimal(diffTime));
                                    }

                                    me.validShift = true;

                                } else {
                                    me.tools.alert.warning("Tida ada Informasi Shift");
                                }
                            }
                        }).read('shiftinfo');
                    }
                });                
            }

        }
        me.afterSC(rec);

    },
    // end edit by wulan sari 20190309    
    processData: function () {
        var me = this;
        me.resetSummary();
        me.timeOnBlur();
    },
    statusOnSelect: function () {
        var me = this;
        var f = me.getFormdata();
        var si = me.shiftInfo;
        var status = f.down("[name=status]").getValue();

        if (!si) {
            console.log("Tidak ada informasi shift");
            return false;
        }

        me.currentStatusLembur = status;
        me.resetSummary();
        me.resetTime();


        if (status === 1) {
            f.down("[name=plan_before_start]").setValue(si["time_in"]);
            f.down("[name=plan_before_end]").setValue(si["in_time"]);

            f.down("[name=exec_time_in_end]").setValue(si["in_time"]);
            f.down("[name=exec_time_in_start]").setValue(f.down("[name=plan_before_start]").getValue());
            //f.down("[name=exec_time_in_end]").setReadOnly(true);
        } else if (status === 2) {
            f.down("[name=plan_after_start]").setValue(si["out_time"]);
            f.down("[name=plan_after_end]").setValue(si["time_out"]);
            f.down("[name=exec_time_out_start]").setValue(si["out_time"]);
            f.down("[name=exec_time_out_end]").setValue(f.down("[name=plan_after_end]").getValue());
            // f.down("[name=exec_time_out_start]").setReadOnly(true);
        } else if (status === 3) {
            f.down("[name=plan_before_start]").setValue(si["time_in"]);
            f.down("[name=plan_before_end]").setValue(si["in_time"]);
            f.down("[name=plan_after_start]").setValue(si["out_time"]);
            f.down("[name=plan_after_end]").setValue(si["time_out"]);
            f.down("[name=exec_time_in_end]").setValue(si["in_time"]);
            f.down("[name=exec_time_out_start]").setValue(si["out_time"]);
            f.down("[name=exec_time_in_start]").setValue(f.down("[name=plan_before_start]").getValue());
            f.down("[name=exec_time_out_end]").setValue(f.down("[name=plan_after_end]").getValue());
        } else if (status === 4 || status === 5 || status === 6) { // hari libur /off
            f.down("[name=plan_after_start]").setValue(si["time_in"]);
            f.down("[name=plan_after_end]").setValue(si["time_out"]);
            f.down("[name=exec_time_out_start]").setValue(si["time_in"]);
            f.down("[name=exec_time_out_end]").setValue(si["time_out"]);
        }
        me.timeOnBlur();
    },
    resetShiftInfo: function () {
        var me = this;
        var f = me.getFormdata();
        f.down("[name=shifttype_code]").setValue("");
        f.down("[name=in_time]").setValue("");
        f.down("[name=out_time]").setValue("");
        f.down("[name=work_hour_text]").setValue("");
        f.down("[name=day_name]").setValue("");

        f.down("[name=absen_in_time]").setValue("");
        f.down("[name=absen_out_time]").setValue("");
    },
    resetTime: function () {
        var me = this;
        var f = me.getFormdata();
        var zero = "";
        f.down("[name=exec_time_in_start]").setValue(zero);
        f.down("[name=exec_time_in_end]").setValue(zero);
        f.down("[name=exec_time_out_start]").setValue(zero);
        f.down("[name=exec_time_out_end]").setValue(zero);
        f.down("[name=plan_before_start]").setValue(zero);
        f.down("[name=plan_before_end]").setValue(zero);
        f.down("[name=plan_after_start]").setValue(zero);
        f.down("[name=plan_after_end]").setValue(zero);

    },
    dateOnChange: function () {
        var me = this;
        var p = me.getPanel();
        var f = me.getFormdata();
        me.validShift = false;
        p.setLoading("Cek informasi shift...");
        f.down("[name=shifttype_code]").setValue("");
        var vs = f.getForm().getValues();
        me.resetShiftInfo();
        me.resetSummary();
        me.tools.ajax({
            params: vs,
            success: function (data, model) {
                console.log(data);

                var hasil = me.tools.shortHasilArray(data);
                if (hasil.length > 0) {

                    hasil = hasil[0];
                    me.shiftInfo = hasil;
                    // console.log(me.shiftInfo);






                    f.down("[name=shifttype_code]").setValue(hasil["shifttype"]);
                    f.down("[name=in_time]").setValue(hasil["in_time"]);
                    f.down("[name=out_time]").setValue(hasil["out_time"]);
                    f.down("[name=day_name]").setValue(me.tools.dateFunc(vs['date']).getDayWeekName());

                    f.down("[name=absen_in_time]").setValue(hasil["time_in"]);
                    f.down("[name=absen_out_time]").setValue(hasil["time_out"]);

                    if (hasil["in_time"] !== null && hasil["out_time"]) {
                        var diffTime = me.tools.diffTime(hasil["in_time"], hasil["out_time"]);
                        f.down("[name=work_hour_text]").setValue(me.tools.timeToDecimal(diffTime));
                    }


                    /*
                     if(me.tools.timeToDecimal(hasil["time_in"]) > 0 && me.tools.timeToDecimal(hasil["time_out"]) > 0){
                     f.down("[name=plan_before_start]").setValue(hasil["time_in"]);
                     f.down("[name=plan_before_end]").setValue(hasil["in_time"]);
                     f.down("[name=plan_after_start]").setValue(hasil["out_time"]);
                     f.down("[name=plan_after_end]").setValue(hasil["time_out"]);
                     }
                     */



                    me.validShift = true;



                } else {
                    me.tools.alert.warning("Tida ada Informasi Shift");
                }

                me.resetFieldsPelaksanaanLembur(1);
                me.resetFieldsPelaksanaanLembur(0);

                //me.timeOnBlur();
                p.setLoading(false);
            }
        }).read('shiftinfo');


    },
    dateOnChangeForUpdate: function () {
        var me = this;
        var p = me.getPanel();
        var f = me.getFormdata();
        me.validShift = false;
        p.setLoading("Cek informasi shift...");
        f.down("[name=shifttype_code]").setValue("");
        var vs = f.getForm().getValues();
        me.resetShiftInfo();
        me.resetSummary();
        me.tools.ajax({
            params: vs,
            success: function (data, model) {
                console.log(data);

                var hasil = me.tools.shortHasilArray(data);
                if (hasil.length > 0) {

                    hasil = hasil[0];
                    me.shiftInfo = hasil;
                    // console.log(me.shiftInfo);






                    f.down("[name=shifttype_code]").setValue(hasil["shifttype"]);
                    f.down("[name=in_time]").setValue(hasil["in_time"]);
                    f.down("[name=out_time]").setValue(hasil["out_time"]);
                    f.down("[name=day_name]").setValue(me.tools.dateFunc(vs['date']).getDayWeekName());

                    f.down("[name=absen_in_time]").setValue(hasil["time_in"]);
                    f.down("[name=absen_out_time]").setValue(hasil["time_out"]);

                    if (hasil["in_time"] !== null && hasil["out_time"]) {
                        var diffTime = me.tools.diffTime(hasil["in_time"], hasil["out_time"]);
                        f.down("[name=work_hour_text]").setValue(me.tools.timeToDecimal(diffTime));
                    }


                    /*
                     if(me.tools.timeToDecimal(hasil["time_in"]) > 0 && me.tools.timeToDecimal(hasil["time_out"]) > 0){
                     f.down("[name=plan_before_start]").setValue(hasil["time_in"]);
                     f.down("[name=plan_before_end]").setValue(hasil["in_time"]);
                     f.down("[name=plan_after_start]").setValue(hasil["out_time"]);
                     f.down("[name=plan_after_end]").setValue(hasil["time_out"]);
                     }
                     */



                    me.validShift = true;





                } else {
                    me.tools.alert.warning("Tida ada Informasi Shift");
                }

                me.resetFieldsPelaksanaanLembur(1);
                me.resetFieldsPelaksanaanLembur(0);

                var rec = me.getGrid().getSelectedRecord();
                if (rec) {
                    f.loadRecord(rec);
                }

                me.timeOnBlur();
                p.setLoading(false);
            }
        }).read('shiftinfo');


    },
    /* isLeft = 1 => kiri, 0 = kanan */
    getProcessField: function (isLeft) {
        var me = this;
        var sl = isLeft;
        var fields = {
            params: {
                start: sl === 1 ? 'exec_time_in_start' : 'exec_time_out_start',
                end: sl === 1 ? 'exec_time_in_end' : 'exec_time_out_end'
            },
            totalHour: {
                duration: sl === 1 ? 'before_duration_text' : 'after_duration_text',
                net: sl === 1 ? 'before_net_hours' : 'after_net_hours',
                total: sl === 1 ? 'before_total_hours' : 'after_total_hours',
                break: sl === 1 ? 'before_break_duration' : 'after_break_duration'
            },
            faktor: {
                satup: sl === 1 ? 'before_factor_factor1' : 'after_factor_factor1',
                satuv: sl === 1 ? 'before_factor_value1' : 'after_factor_value1',
                satuh: sl === 1 ? 'before_factor_result1' : 'after_factor_result1',
                duap: sl === 1 ? 'before_factor_factor2' : 'after_factor_factor2',
                duav: sl === 1 ? 'before_factor_value2' : 'after_factor_value2',
                duah: sl === 1 ? 'before_factor_result2' : 'after_factor_result2',
                tigap: sl === 1 ? 'before_factor_factor3' : 'after_factor_factor3',
                tigav: sl === 1 ? 'before_factor_value3' : 'after_factor_value3',
                tigah: sl === 1 ? 'before_factor_result3' : 'after_factor_result3'

            }
        };
        return fields;
    },
    resetFieldsPelaksanaanLembur: function (isLeft) {
        var me = this;
        var f = me.getFormdata();
        var pf = me.getProcessField(isLeft);
        for (var i in pf) {
            for (var k in pf[i]) {
                var el = f.down("[name=" + pf[i][k] + "]");

                if (el) {
                    el.setValue("");
                }
            }
        }

    },
    timeOnBlur: function () {
        var me = this;

        var f = me.getFormdata();
        var status = f.down("[name=status]").getValue();
        if (!status) {
            console.log("Status lembur tidak valid");
            return false;
        }



        if (status === 1) { // sebelum jam masuk
            var pf = me.getProcessField(1);
            var tempStart = f.down("[name=" + pf.params.start + "]").getValue();
            var tempEnd = f.down("[name=" + pf.params.end + "]").getValue();
            me.resetFieldsPelaksanaanLembur(1);
            me.resetFieldsPelaksanaanLembur(0);
            f.down("[name=" + pf.params.start + "]").setValue(tempStart);
            f.down("[name=" + pf.params.end + "]").setValue(tempEnd);
            me.processLembur(1, 1, 1);
            
        } else if (status == 2) { // setelah jam pulang
            var pf = me.getProcessField(0);
            var tempStart = f.down("[name=" + pf.params.start + "]").getValue();
            var tempEnd = f.down("[name=" + pf.params.end + "]").getValue();
            me.resetFieldsPelaksanaanLembur(1);
            me.resetFieldsPelaksanaanLembur(0);
            f.down("[name=" + pf.params.start + "]").setValue(tempStart);
            f.down("[name=" + pf.params.end + "]").setValue(tempEnd);
            me.processLembur(0, 1, 1);


        } else if (status === 4 || status === 5 || status === 6) { // hari libur
            /*
             var pf = me.getProcessField(0);
             var tempStart = f.down("[name=" + pf.params.start + "]").getValue();
             var tempEnd = f.down("[name=" + pf.params.end + "]").getValue();
             me.resetFieldsPelaksanaanLembur(1);
             me.resetFieldsPelaksanaanLembur(0);
             f.down("[name=" + pf.params.start + "]").setValue(tempStart);
             f.down("[name=" + pf.params.end + "]").setValue(tempEnd);
             
             me.processLembur(0, 0, 0);
             */
            var pf1 = me.getProcessField(1);
            var pf2 = me.getProcessField(0);
            var tempStart = f.down("[name=" + pf1.params.start + "]").getValue();
            var tempEnd = f.down("[name=" + pf1.params.end + "]").getValue();
            var tempStart2 = f.down("[name=" + pf2.params.start + "]").getValue();
            var tempEnd2 = f.down("[name=" + pf2.params.end + "]").getValue();
            me.resetFieldsPelaksanaanLembur(1);
            me.resetFieldsPelaksanaanLembur(0);
            f.down("[name=" + pf1.params.start + "]").setValue(tempStart);
            f.down("[name=" + pf1.params.end + "]").setValue(tempEnd);
            f.down("[name=" + pf2.params.start + "]").setValue(tempStart2);
            f.down("[name=" + pf2.params.end + "]").setValue(tempEnd2);

            var hpl = me.processLembur(1, 1, 1, function (totalHour) {
                // return totalHour+hpl['totalHour'];
                return {
                    "min_hour": 0
                };
            });
            var total2 = me.processLembur(0, 1, 1, function (totalHour) {
                // return totalHour+hpl['totalHour'];
                return {
                    't': totalHour + hpl['totalHour'],
                    'b': hpl['breakTime'],
                    "status": "keduanya"
                };
            });


            // hapus info pelaksanaan lembur di sebelah kiri
            f.down("[name=" + pf1.totalHour.total + "]").setValue("");
            f.down("[name=" + pf1.totalHour.break + "]").setValue("");


console.log('ini nih '+total2['totalHour']);
            me.hitungFaktor(total2['totalHour'], 0, 0);

            /// reset fiel faktor di kiri

            f.down("[name=before_factor_value1]").setValue();
            f.down("[name=before_factor_factor1]").setValue();
            f.down("[name=before_factor_result1]").setValue();



            f.down("[name=before_factor_value2]").setValue();
            f.down("[name=before_factor_factor2]").setValue();
            f.down("[name=before_factor_result2]").setValue();



            //
            
        } else if (status === 3) { // keduanya (sebelum jam masuk dan setelah jam pulang)
            var pf1 = me.getProcessField(1);
            var pf2 = me.getProcessField(0);
            var tempStart = f.down("[name=" + pf1.params.start + "]").getValue();
            var tempEnd = f.down("[name=" + pf1.params.end + "]").getValue();
            var tempStart2 = f.down("[name=" + pf2.params.start + "]").getValue();
            var tempEnd2 = f.down("[name=" + pf2.params.end + "]").getValue();
            me.resetFieldsPelaksanaanLembur(1);
            me.resetFieldsPelaksanaanLembur(0);
            f.down("[name=" + pf1.params.start + "]").setValue(tempStart);
            f.down("[name=" + pf1.params.end + "]").setValue(tempEnd);
            f.down("[name=" + pf2.params.start + "]").setValue(tempStart2);
            f.down("[name=" + pf2.params.end + "]").setValue(tempEnd2);
            
            var hpl = me.processLembur(1, 1, 1, function (totalHour) {
                // return totalHour+hpl['totalHour'];
                return {
                    "min_hour": 0
                };
            });
            console.log('debug 1')
            var total2 = me.processLembur(0, 1, 1, function (totalHour) {
                // return totalHour+hpl['totalHour'];
                return {
                    't': totalHour + hpl['totalHour'],
                    'b': hpl['breakTime'],
                    "status": "keduanya"
                };
            });


            // hapus info pelaksanaan lembur di sebelah kiri
            f.down("[name=" + pf1.totalHour.total + "]").setValue("");
            f.down("[name=" + pf1.totalHour.break + "]").setValue("");



            me.hitungFaktor(total2['totalHour'], 1, 1);

        }
        
        me.hitungSummary();        
    },
    /* return total hour */
    processLembur: function (isLeft, isLeftFaktor, tipeLembur, callbackFunc) {
        var me = this;
        var totalHour = 0;
        if (!me.validShift) {
            console.log("Shift tidak valid");
            return false;
        }
        if (!me.myParams) {
            me.tools.alert.warning("Tidak ada parameter");
            return false;
        }
        console.log(' tipeLembur ' + tipeLembur);
        var statusLembur = false;
        var lebih24 = false;

        //var pf = me.getProcessField(1); // zona fields yang digunakan
        var pf = me.getProcessField(isLeft); // zona fields yang digunakan

        var f = me.getFormdata();

        var start = f.down("[name=" + pf.params.start + "]").getValue();
        var end = f.down("[name=" + pf.params.end + "]").getValue();
        
        console.log(' pf.params.start ' + pf.params.start);
        console.log(' pf.params.end ' + pf.params.end);
        console.log(' start ' + start);
        console.log(' end ' + end);
        
        console.log("START END");
        
        var startMo = moment(start, "HH:mm:ss");
        var endMo = moment(end, "HH:mm:ss");
        console.log(startMo.isValid());
        console.log(endMo.isValid());
        if (!startMo.isValid() || !endMo.isValid()) {
            return false;
        }

        /*
         if (!me.tools.timeLessThan(start, end)) {
         
         return false;
         }
         */


        var menitMin = me.myParams['minutes_limit_minimum'];
        var menitMax = me.myParams['minutes_limit_maximum'];




        /// cek jam lebih dari 24 jam 
        var lebihKecil = me.tools.timeLessThan(start, end);

        var statusLembur = f.down("[name=status]").getValue();
        var diffTime24 = false;
        var dd = false;
        
        var calculate_from_intranet = f.down("[name=calculate_from_intranet]").getValue(); 
        //console.log('calculate_from_intranet ' + calculate_from_intranet);

        if (statusLembur == 1) { // sebelum jam masuk

            if (!lebihKecil) {
                diffTime24 = me.tools.diffTime(start, '24:00:00');
                start = '00:00:00';
                lebih24 = true;

                end = me.tools.addTime(end, diffTime24);
            }
            dd = me.tools.diffTime(start, end);
            
            if(calculate_from_intranet){
                dd = me.intranet_jam_lembur_approve_before;
            }
            
        } else if (statusLembur == 2 || statusLembur == 4 || statusLembur == 5 || statusLembur == 6) { // sesudah jam pulang
            if (!lebihKecil) {

                //start = '00:00:00';
                var tempEnd = end;
                end = '24:00:00';

                lebih24 = true;

                // end = me.tools.addTime(end,diffTime24);
                dd = me.tools.diffTime(start, end);
                dd = me.tools.addTime(dd, tempEnd);
            } else {
                dd = me.tools.diffTime(start, end);
            }
            
            if(calculate_from_intranet){
                dd = me.intranet_jam_lembur_approve_after;
            }
            
            
        } else {
            console.log('aaaa ' + start);
            console.log('aaaa ' + end);
            dd = me.tools.diffTime(start, end);
            
            if(calculate_from_intranet){
                dd = me.intranet_jam_lembur_approve_before;
            }
            
        }




        /// set total jam decimal
        var his = dd.split(":");
        var h = his[0];
        var i = his[1];
        var s = his[2];

        //var netHour = me.tools.timeToDecimal(dd);
        var tempMenit = me.tools.intval(i);
        if (tempMenit >= menitMin && tempMenit <= menitMax) {
            tempMenit = 0.5;
        } else if (tempMenit > menitMax) {
            tempMenit = 1;
        } else {
            tempMenit = 0;
        }
        
        var netHour = me.tools.intval(h) + tempMenit;
        var netHourMeal = me.tools.intval(h);
                
        /// hitung istirahat
        var breakTime = 0;


        /// cek indeks lembur
        me.tempMatchIndeksLembur = null;
        var ils = me.localStore.indexLembur;
        ils.clearFilter(true);
        var statusLembur = f.down("[name=status]").getValue();
        var tipeLembur = 1;
        if (statusLembur === 4) {
            tipeLembur = 2;
        } else if (statusLembur === 5) {
            tipeLembur = 4;
        } else if (statusLembur === 6) {
            tipeLembur = 5;
        }
        ils.filterBy(function (rec, id) {
            // filter berdasarkan tipe hari lembur off / hari biasa
            
            if (rec.raw.overtimetype === tipeLembur) {
                return true;
            } else {
                return false;
            }
        });
        console.log('netHourMeal ' + netHourMeal);

        var hi = me.hitungIstirahat(ils, netHour, netHourMeal);
        me.tempHasilHitungIstirahat = null;
        me.tempHasilHitungIstirahat = hi;
        breakTime = hi['b'];
        me.tempMatchIndeksLembur = hi['t'];

        /*
         var foundIndex = ils.findExact('hour',Math.floor(netHour));
         
         if (foundIndex > -1) {
         breakTime = me.tools.floatval(ils.getAt(foundIndex).get("cut_break"));
         me.tempMatchIndeksLembur = ils.getAt(foundIndex);
         }
         */




        var total = netHour - breakTime;


        //breaktime_cut_after


        var minHourGD = me.tools.timeToDecimal(me.myParams['general_day_after']);
        var minHourHD = me.tools.timeToDecimal(me.myParams['normal_holiday_after']);
        var minHour = me.shiftInfo['holyday'] > 0 ? minHourHD : minHourGD;


        minHour = minHourGD;


        // cek jika pake minimal hour
        if (typeof callbackFunc === 'function') {
            var params = callbackFunc(netHour);
            if (typeof params["min_hour"] !== "undefined") {
                minHour = params["min_hour"];
            }
        }

        /*
         if (tipeLembur === 1) { // hari biasa
         minHour = minHourGD;
         } else { // lainnya hari libur
         minHour = minHourHD;
         }
         */

        // khusus perhitungan untuk status keduanya
        var tnh = 0;
        if (typeof callbackFunc === 'function') {
            var tempHasil = 0;
            tempHasil = callbackFunc(netHour);
            //var hi2 = me.hitungIstirahat(ils, tempHasil['t']);
            //breakTime = hi2['b'];
            //breakTime = me.tools.floatval(breakTime) - me.tools.floatval(tempHasil['b']);
            //  total = tempHasil['t'] - breakTime;

            var status = tempHasil["status"];
            if (status === "keduanya") {
                                
                var totalNetHour = me.tools.floatval(f.down("[name=before_net_hours]").getValue()) + netHour;
                tnh = totalNetHour;
                
                // ambil jam dari zona kiri

                if (f.down("[name=before_duration_text]").getValue() != "") {
                    var hisb = f.down("[name=before_duration_text]").getValue().split(":");
                    var hb = hisb[0];

                    netHourMeal = me.tools.intval(hb) + netHourMeal;
                }

                // /ambil jam dari zona kiri
                                

                var bt = me.hitungIstirahat(ils, totalNetHour, netHourMeal);
                me.tempHasilHitungIstirahat = null;
                me.tempHasilHitungIstirahat = bt;

                breakTime = me.tools.floatval(bt["b"]);
                statusLembur = "keduanya";
                total = totalNetHour - breakTime;
            }

        }



        if (statusLembur === "keduanya") {
            /* cek jumlah jam minimum lembur */
            if (tnh >= minHour) {
                me.hitungFaktor(total, isLeft, isLeftFaktor);
                f.down("[name=" + pf.totalHour.duration + "]").setValue(dd);
                f.down("[name=" + pf.totalHour.net + "]").setValue(netHour);
                f.down("[name=" + pf.totalHour.total + "]").setValue(total);
                f.down("[name=" + pf.totalHour.break + "]").setValue(breakTime);
            } else {

                f.down("[name=" + pf.totalHour.duration + "]").setValue("");
                f.down("[name=" + pf.totalHour.net + "]").setValue("");
                f.down("[name=" + pf.totalHour.total + "]").setValue("");
                f.down("[name=" + pf.totalHour.break + "]").setValue("");

                me.tools.alert.warning("Jam lembur kurang dari " + minHour + " jam");
            }
        } else {
            /* cek jumlah jam minimum lembur */
            if (netHour >= minHour) {
                me.hitungFaktor(total, isLeft, isLeftFaktor);
                f.down("[name=" + pf.totalHour.duration + "]").setValue(dd);
                f.down("[name=" + pf.totalHour.net + "]").setValue(netHour);
                f.down("[name=" + pf.totalHour.total + "]").setValue(total);
                f.down("[name=" + pf.totalHour.break + "]").setValue(breakTime);
            } else {

                f.down("[name=" + pf.totalHour.duration + "]").setValue("");
                f.down("[name=" + pf.totalHour.net + "]").setValue("");
                f.down("[name=" + pf.totalHour.total + "]").setValue("");
                f.down("[name=" + pf.totalHour.break + "]").setValue("");

                me.tools.alert.warning("Jam lembur kurang dari " + minHour + " jam");
            }
        }








        totalHour = total;
        var hasil = {
            'totalHour': totalHour,
            'breakTime': breakTime
        };


        return hasil;



    },
    hitungIstirahat: function (ils, netHour, netHourMeal) {
        var me = this;
        var hasil = {
            "t": null,
            "b": 0
        };
        //var foundIndex = ils.findExact('hour', Math.floor(netHour));
        //var foundIndexMeal = ils.findExact('hour', Math.floor(netHourMeal));
        var foundIndex = ils.findExact('hour', netHour);
        var foundIndexMeal = ils.findExact('hour', netHourMeal);

        if (foundIndex > -1) {
            hasil['b'] = me.tools.floatval(ils.getAt(foundIndex).get("cut_break"));
            hasil['t'] = ils.getAt(foundIndex);
            hasil['tm'] = ils.getAt(foundIndexMeal); // hour untuk meal

            if (me.tools.floatval(hasil['b']) == 0 && netHour == 4.5) {
                hasil['b'] = 0.5;
            }
        }

        //console.log('mulai store index parameter');
        //console.log(Math.floor(netHour));
        //console.log(Math.floor(netHourMeal));
        //console.log(foundIndex);
        //console.log(foundIndexMeal);
        //console.log(ils);
        //console.log(hasil['b']);//jam istirahat
        //console.log('selesai store index parameter');
        return hasil;

    },
    prosesFaktor: function (value, param, maxValue) {
        var me = this;
        var hasil = {
            "nilai": 0,
            "param": 0,
            "hasil": 0,
            "sisa": 0
        };
        if (maxValue > 0) {
            hasil["nilai"] = value >= maxValue ? maxValue : value;
        } else {
            hasil["nilai"] = value;
        }
        //   f1 = me.tools.floatval(me.myParams["normal_holiday_after"]);
        hasil["param"] = me.tools.floatval(param);
        hasil["hasil"] = hasil["nilai"] * hasil["param"];
        hasil["sisa"] = value - hasil["nilai"];
        return hasil;

    },
    hitungFaktor: function (totalHour, isLeft, isLeftFaktor) {
        var me = this;



        var f = me.getFormdata();

        var pf = me.getProcessField(isLeftFaktor); // zona fields yang digunakan

        var f1 = 0, f1p = 0, f1r = 0, f2 = 0, f2p = 0, f2r = 0, f3 = 0, f3p = 0, f3r = 0;

        var sisa = 0, hasil1 = false, hasil2 = false, hasil3 = false;

        sisa = totalHour;

        console.log(me.myParams);

        if (isLeftFaktor == 1) {


            hasil1 = me.prosesFaktor(sisa, me.myParams["general_day_factor_1"], 1);

            if (hasil1["sisa"] > 0) {
                hasil2 = me.prosesFaktor(hasil1["sisa"], me.myParams["general_day_factor_2"], 0);

            }

            /*
             f1 = 1;
             f1p = me.tools.floatval(me.myParams["general_day_factor_1"]);
             f1r = f1 * f1p;
             
             f2 = totalHour - f1;
             f2p = me.tools.floatval(me.myParams["general_day_factor_2"]);
             f2r = f2 * f2p;
             me.overtimeValue = f1r + f2r;
             */


        } else {

            var status = f.down("[name=status]").getValue();
            var maxF1 = status === 4 ? me.tools.timeToDecimal(me.myParams["normal_holiday_after"]) : me.tools.timeToDecimal(me.myParams["short_holiday_after"]);

            maxF1 = status === 6 ? me.tools.timeToDecimal(me.myParams["short_holiday_nasional_after"]) : maxF1;

            console.log('maxF1 ' + maxF1);
            console.log('status ' + status);
            hasil1 = me.prosesFaktor(sisa, me.myParams["holiday_factor_1"], maxF1);

            if (hasil1["sisa"] > 0) {
                hasil2 = me.prosesFaktor(hasil1["sisa"], me.myParams["holiday_factor_2"], 1);
                if (hasil2["sisa"] > 0) {
                    hasil3 = me.prosesFaktor(hasil2["sisa"], me.myParams["holiday_factor_3"], 0);
                }
            }




        }

        me.overtimeValue = 0;

        if (hasil1) {
            f.down("[name=" + pf.faktor.satup + "]").setValue(hasil1["nilai"]);
            f.down("[name=" + pf.faktor.satuv + "]").setValue(hasil1["param"]);
            f.down("[name=" + pf.faktor.satuh + "]").setValue(hasil1["hasil"]);
            me.overtimeValue = hasil1["hasil"];
        }

        if (hasil2) {
            f.down("[name=" + pf.faktor.duap + "]").setValue(hasil2["nilai"]);
            f.down("[name=" + pf.faktor.duav + "]").setValue(hasil2["param"]);
            f.down("[name=" + pf.faktor.duah + "]").setValue(hasil2["hasil"]);
            me.overtimeValue = me.overtimeValue + hasil2["hasil"];
        }

        if (hasil3) {
            f.down("[name=" + pf.faktor.tigap + "]").setValue(hasil3["nilai"]);
            f.down("[name=" + pf.faktor.tigav + "]").setValue(hasil3["param"]);
            f.down("[name=" + pf.faktor.tigah + "]").setValue(hasil3["hasil"]);
            me.overtimeValue = me.overtimeValue + hasil3["hasil"];
        }







    },
    hitungSummary: function () {
        var me = this;
        var f = me.getFormdata();
        var extraMeal = 0;
        
        if (me.tempHasilHitungIstirahat && me.tempHasilHitungIstirahat["tm"]) {
            extraMeal = me.tempHasilHitungIstirahat["tm"].get("meal");
        }
        f.down("[name=jam_kerja]").setValue(me.tools.diffTime(f.down("[name=in_time]").getValue(), f.down("[name=out_time]").getValue()));
        f.down("[name=nilai_lembur]").setValue(me.overtimeValue);
        f.down("[name=makan_extra]").setValue(extraMeal);
        
        //edit by wulan 20191002
        //makan extra hanya jika jam lembur berurutan, jadi kalau keduanya cari extra di sebelum , dan cari extra di sesudah
        var status = f.down("[name=status]").getValue();
        if (status === 3) {
            
            var pf1 = me.getProcessField(1);
            var pf2 = me.getProcessField(0);
            var tempStart = f.down("[name=" + pf1.params.start + "]").getValue();
            var tempEnd = f.down("[name=" + pf1.params.end + "]").getValue();
            var tempStart2 = f.down("[name=" + pf2.params.start + "]").getValue();
            var tempEnd2 = f.down("[name=" + pf2.params.end + "]").getValue();
            
            
            var lebih24 = false;
            var diffTime24 = false;
            var dd = false;

            var calculate_from_intranet = f.down("[name=calculate_from_intranet]").getValue();
            
            // sebelum jam masuk            
            var start = tempStart;
            var end = tempEnd;            
            var lebihKecil = me.tools.timeLessThan(start, end); /// cek jam lebih dari 24 jam 
            if (!lebihKecil) {
                diffTime24 = me.tools.diffTime(start, '24:00:00');
                start = '00:00:00';
                lebih24 = true;

                end = me.tools.addTime(end, diffTime24);
            }
            dd = me.tools.diffTime(start, end);
            var his = dd.split(":");
            var h = his[0];
            var netHourMeal = me.tools.intval(h);
            
            // sesudah jam pulang           
            var start = tempStart2;
            var end = tempEnd2;             
            if (!lebihKecil) {

                //start = '00:00:00';
                var tempEnd = end;
                end = '24:00:00';

                lebih24 = true;

                // end = me.tools.addTime(end,diffTime24);
                dd = me.tools.diffTime(start, end);
                dd = me.tools.addTime(dd, tempEnd);
            } else {
                dd = me.tools.diffTime(start, end);
            }
            var his2 = dd.split(":");
            var h2 = his2[0];
            var netHourMeal2 = me.tools.intval(h2);
            
            if(netHourMeal >= 3 || netHourMeal2 >= 3){
                f.down("[name=makan_extra]").setValue(1);                
            }

        }
    },
    resetSummary: function () {
        var me = this;
        var f = me.getFormdata();

        f.down("[name=jam_kerja]").setValue("");
        f.down("[name=nilai_lembur]").setValue("");
        f.down("[name=makan_extra]").setValue("");
    },
    lookupEmployee: function () {
        var me, window, grid, panel, paging;
        me = this;
        
        /* comment by Wulan Sari 2018.05.28
        window = me.instantWindow("Panel", 600, "Employe List", "create", "employeewindow", "lookup.employee", {
            itemId: me.controllerName + 'employee'
        });*/
                
        
        /* added by Wulan Sari 2018.05.28 */
        window = me.instantWindow("Panel", 600, "Employe List", "create", "employeeOvertimetransactionwindow", "lookup.employee", {
            itemId: me.controllerName + 'employee'
        });
                
        grid = window.down("grid");
        panel = window.down("panel");
        grid.bindPrefixName = me.controllerName;
        grid.doInit();
        grid.doLoad({}, function () {
            paging = grid.down("pagingtoolbar");
            if (paging) {
                if(paging.getStore().getCount() == 0){
                    paging.getStore().loadPage(1);
                }
            }
        });         
        /* end added by Wulan Sari 2018.05.28 */
        
        

    },
    /* comment by Wulan Sari 2018.05.28
    minicProc: function () {
        var me = this;
        var x = {
            lookupEmployee: {
                selectOnClick: function (rec) {
                    var f = me.getFormdata();
                    console.log(rec);

                    f.loadRecord(rec);
                    f.down("[name=employee_employee_nik]").setValue(rec.get("employee_nik"));
                    f.down("[name=employee_employee_name]").setValue(rec.get("employee_name"));
                    f.down("[name=employee_employee_id]").setValue(rec.get("employee_id"));
                    me.dateOnChange();
                    me.timeOnBlur();

                }
            }
        };
        return x;

    },*/
    panelAfterRender: function (el) {
        var me = this;

        if (me.isMaximize) {
            el.up("window").maximize();
        }
        me.getGrid().getSelectionModel().setSelectionMode('SINGLE');


        me.tools.ajax({
            params: {},
            success: function (data, model) {
                //console.log(data);
                me.myParams = data['others'][1][0];

                //create index lembur store
                me.localStore.indexLembur = me.instantStore({
                    id: me.controllerName + 'IndexLemburStore',
                    idProperty: 'overtimeindex_id'
                });


                me.tools.wesea(data.department, me.getPanel().down("overtimetransactionformsearch").down("[name=department_department_id]")).comboBox(true);                
                me.tools.wesea(data['overtimeindex'], me.localStore.indexLembur).instantStore();

                //console.log(me.localStore.indexLembur.getAt(0));
            }
        }).read('parameter');
        
        me.getPanel().setLoading(false);
        
    },
    validateData: function () {
        var me = this;
        var data = {"status": false, "msg": "Sedang diproses..."};
        if (me.validShift) {
            data.status = true;
        } else {
            data.msg = "Informasi shift tidak valid";
        }
        return data;
    },
    afterClick: function () {
        var me = this;
        var f = me.getFormdata();
        var x = {
            cancel: function () {               
                //  me.mainGridCheckRecord();
                var rec = me.getGrid().getSelectedRecord();
                if (rec) {
                    f.loadRecord(rec);
                }
                f.down("[action=lookup_employee]").setDisabled(true);
                

            },
            save: function () {

            },
            edit: function () {                
                f.down("[action=lookup_employee]").setDisabled(false);
                me.dateOnChangeForUpdate();
            },
            delete: function () {

            },
            new : function () {

                // edit by wulan sari 20190904
                var grid = me.getGridovertimedetail();
                grid.getStore().removeAll();
                // end edit by wulan sari 20190904
                
                me.validShift = false;
                f.getForm().reset();
                f.down("[name=date]").setValue(new Date());
                f.down("[action=lookup_employee]").setDisabled(false);
                
            }
        }
        return x;
    },
    /* start added by ahmad riadi 14022018 */
    /* start added by ahmad riadi 04-01-2018 */
    formOptionsOvertimeAfterrender: function () {
        var me, form, curdate, record;
        me = this;
        curdate = new Date();
        form = me.getFormoptionsovertime();
        form.down("[name=hrd_checked]").setValue('NO');

        me.tools.ajax({
            params: {},
            success: function (data, model) {
                if (data.others[1] == undefined) {
                    Ext.Msg.show({
                        title: 'WARNING',
                        msg: "Data master project tidak ada",
                        buttons: Ext.Msg.OK,
                        icon: Ext.Msg.WARNING
                    });
                } else {
                    record = data.others[1];
                    if (record.dbintranet_name == undefined && record.dbintranet_name !== null) {
                        Ext.Msg.show({
                            title: 'WARNING',
                            msg: "Field config di master project belum ada...!",
                            buttons: Ext.Msg.OK,
                            icon: Ext.Msg.WARNING
                        });
                    } else {
                        if (record.dbintranet_name == null || record.dbintranet_name == '') {
                            Ext.Msg.show({
                                title: 'WARNING',
                                msg: "Config di master project belum diisi...!",
                                buttons: Ext.Msg.OK,
                                icon: Ext.Msg.WARNING
                            });
                        } else {
                            me.configintranet = record.dbintranet_name;
                            me.tools.ajax({
                                params: {},
                                success: function (data, model) {
                                    me.tools.wesea(data.employeeb, form.down("[name=employee_id]")).comboBox();
                                }
                            }).read('employeeprojectpt');

                            me.tools.ajax({
                                params: {},
                                success: function (data, model) {
                                    me.tools.wesea(data.department, form.down("[name=department_id]")).comboBox();
                                }
                            }).read('invalidabsentinit');
                            
                            // edit by wulan sari 20181216
                            me.getGridovertime().getSelectionModel().setSelectionMode('SINGLE');
                            //me.getDataovertimeintranet();
                            me.getFilterovertimeintranet();
                            me.setCleardataOvertimebyIntranet();

                        }

                    }

                }
            }
        }).read('checkconfigintranet');

    },

    formOptionsOvertimeAfterrenderApi: function () {
        var me, form, curdate, record;
        me = this;
        curdate = new Date();
        form = me.getFormoptionsovertimeapi();
        form.down("[name=hrd_checked]").setValue('NO');
        me.getGridovertimeapi().getSelectionModel().setSelectionMode('SINGLE');
        //me.getDataovertimeintranet();
        me.getFilterovertimeapi();
        me.setCleardataOvertimebyIntranet();

    },

    getDataovertimeintranet: function (flag) {
        var me, form, formvalue, grid, store;
        me = this;
        form = me.getFormoptionsovertime();
        formvalue = form.getForm().getValues();
        
        grid = me.getGridovertime();
        grid.doInit();
        
        var store = grid.getStore();
        store.getProxy().extraParams = {
            mode_read: 'getdataovertimeintranet',
            configintranet: me.configintranet,
        };
        
        store = store.load({
            callback: function (data, model) {
                grid.attachModel(model);
                grid.store.sort({property: 'lembur_dari', direction: 'ASC'});
                //supaya paging langsung aktif tanpa user refresh secara manual dan set pageSize jadi 25
                Ext.apply(store, {pageSize: 25});
            }
        });        
    },
    gridIntranetOvertimeActionColumnClick: function (view, cell, row, col, e) {
        var me, grid, record, row, action;
        me = this;
        grid = me.getGridovertime();
        record = grid.getStore().getAt(row);
        action = e.getTarget().className.match(/\bact-(\w+)\b/);
        grid.getSelectionModel().select(row);
        if (action) {
            switch (action[1]) {
                case 'update':
                    me.rowintranetovertime = record;
                    me.instantWindow("FormDataIntranetOvertime", 1000, "FORM DATA OVERTIME", "options", "overtimeformdataintranetovertime");
                    break;
            }
        }
    },
    formDataOvertimeAfterrender: function () {
        var me, form, griddetail, storedetail;
        me = this;
        form = me.getFormdataovertime();
        var rowdata = me.rowintranetovertime.data;
        form.down("[name=name]").setValue(rowdata.name);
        form.down("[name=lembur_dari]").setValue(rowdata.lembur_dari);
        form.down("[name=lembur_sampai]").setValue(rowdata.lembur_sampai);
        form.down("[name=department]").setValue(rowdata.department);
        form.down("[name=approve_by]").setValue(rowdata.approve_by);
        form.down("[name=hire_date]").setValue(rowdata.hire_date);
        form.down("[name=description]").setValue(rowdata.description);
        form.down("[name=statusovertime]").setValue(rowdata.status);
        form.down("[name=position]").setValue(rowdata.position);
        form.down("[name=overtimetype]").setValue(rowdata.lemburtype);
        form.down("[name=employee_id_ces]").setValue(rowdata.employee_id_ces);
        form.down("[name=user_id_ces]").setValue(rowdata.user_id_ces);
        form.down("[name=project_id_ces]").setValue(rowdata.project_id_ces);
        form.down("[name=pt_id_ces]").setValue(rowdata.pt_id_ces);
        form.down("[name=lembur_id]").setValue(rowdata.lembur_id);

        var grid = me.getGridovertimedetailpopup();
        grid.doInit();
        grid.getStore().removeAll();
        var ref_lembur_id = rowdata.lembur_id;
        //console.log('ref_lembur_id ' + ref_lembur_id);
        var store = grid.getStore();
        if(ref_lembur_id != '' && ref_lembur_id != undefined){                
            store.getProxy().extraParams = {
                mode_read: 'getdataovertimeintranetgetdetail',
                ref_lembur_id: ref_lembur_id
            };
            store = store.load({
                callback: function (data, model) {
                    grid.attachModel(model);
                    grid.store.sort({property: 'lembur_dari', direction: 'ASC'});
                }
            });                
        }

    },

    getFilterovertimeintranet: function () {
        var me, form, formvalue, grid, store, rawdept, rawemployee, rawcuti;
        me = this;
        form = me.getFormoptionsovertime();
        formvalue = form.getForm().getValues();
        grid = me.getGridovertime();
        grid.doInit();
                
        /*
        store = grid.getStore().load({
            params: {
                mode_read: 'getdatafilterovertimeintranet',
                configintranet: me.configintranet,
                paramdata: Ext.JSON.encode(formvalue),
            },
            callback: function (data, model) {
                grid.attachModel(model);
                grid.store.sort({property: 'lembur_dari', direction: 'ASC'});
            }
        });*/       
       
        // edited by wulan sari 20181215
        var store = grid.getStore();
        store.getProxy().extraParams = {
            mode_read: 'getdatafilterovertimeintranet',
            configintranet: me.configintranet,
            paramdata: Ext.JSON.encode(formvalue)
        };
        
        store = store.load({
            callback: function (data, model) {
                grid.attachModel(model);
                grid.store.sort({property: 'lembur_dari', direction: 'ASC'});
                Ext.apply(store, {pageSize: 25});
            }
        });
        store.loadPage(1); 
        // edited by wulan sari 20181215
                
    },
    
    getFilterovertimeapi: function () {
        var me, form, formvalue, grid, store, rawdept, rawemployee, rawcuti;
        me = this;
        form = me.getFormoptionsovertimeapi();
        formvalue = form.getForm().getValues();
        grid = me.getGridovertimeapi();
        grid.doInit();
              
        // edited by wulan sari 20180320
        var store = grid.getStore();
        store.getProxy().extraParams = {
            mode_read: 'getdatafilterovertimeapi',
            paramdata: Ext.JSON.encode(formvalue),
        };
        
        store = store.load({
            callback: function (data, model) {
                grid.attachModel(model);
                grid.store.sort({property: 'lembur_dari', direction: 'ASC'});
                Ext.apply(store, {pageSize: 25});
            }
        });
        // edited by wulan sari 20180320                
    },
    modifyDatainCurrentdate: function (store, param) {
        var me, record, row, employee_id, overtimedate, overtimetype, different_day, shifttype_id, returndata;
        me = this;
        employee_id = param.employee_id_ces;
        overtimedate = param.overtimedate;
        overtimetype = param.lemburtype;
        shifttype_id = param.shifttype_id;
        different_day = param.different_day;
        store.clearFilter(true);

        returndata = [];
        returndata['counter'] = 0;
        returndata['data'] = null;
        returndata['sortby'] = null;

        if (different_day == '' || different_day == false || different_day == undefined) {//jika lembur dihari yang sama dengan shift yang sama
            store.filterBy(function (record) {
                if (record.data.employee_id_ces === employee_id
                        && record.data.overtimedate == overtimedate
                        && record.data.shifttype_id == shifttype_id
                        && record.data.lemburtype !== overtimetype) {
                    returndata['counter'] = 1;
                    returndata['data'] = record.data;
                    returndata['overtimedate'] = overtimedate;
                    returndata['sortby'] = overtimetype;
                    return true;
                } else {
                    return false;
                }
            });
        } else { //jika terjadi lembur beda hari di shift yang sama
            var today = new Date(overtimedate);
            var tomorrow = new Date(today);

            if (overtimetype == 'sebelum') {
                tomorrow.setDate(today.getDate() + 1);
            } else if (overtimetype == 'sesudah') {
                tomorrow.setDate(today.getDate() - 1);
            }

            tomorrow = me.formatDate(tomorrow);

            store.filterBy(function (record) {
                if (record.data.employee_id_ces === employee_id
                        && record.data.overtimedate == tomorrow
                        && record.data.shifttype_id == shifttype_id
                        && record.data.lemburtype !== overtimetype
                        ) {
                    returndata['counter'] = 1;
                    returndata['data'] = record.data;
                    returndata['data'] = record.data;
                    returndata['overtimedate'] = tomorrow;
                    returndata['sortby'] = overtimetype;
                    return true;
                } else {
                    return false;
                }
            });

        }



        return returndata;


    },
    Processovertimeintranet: function () {
        
        var me, form, grid, store, rows, arraydata, status, msg, indexdata, dataarray,arraylembur_id, formdata, overtimeothertime;
        me = this;
        
        var grid = me.getGridovertimedetail();
        grid.getStore().removeAll();
        
        
        grid = me.getGridovertime();
        rows = grid.getSelectionModel().getSelection();
        form = me.getFormoptionsovertime();
        formdata = me.getFormdata();
        
        //formdata.down("[name=calculate_from_intranet]").setValue(true); 
        
        if (rows.length < 1) {
            Ext.Msg.alert('Info', 'No record selected..!');
            return;
        } else {
            
            if(rows[0]['data'].status != 'CLOSED'){
                Ext.Msg.alert('Error', 'Failed. Only CLOSED status can be processed.');
                return;            
            }
        
            arraydata = [];
            for (var i = 0; i < rows.length; i++) {
                if (rows[i]['data'].hrd_check == 'NO') {
                    arraydata.push(rows[i]['data']);
                }
            }

            arraylembur_id =[];
            if (arraydata.length) {
                me.setReadonlyOvertimebyIntranet();
                form.el.mask('Please wait', 'x-mask-loading');
                indexdata;
                dataarray = null;
                for (indexdata = 0; indexdata < arraydata.length; ++indexdata) {
                    dataarray = arraydata[indexdata];
                    arraylembur_id.push(dataarray.lembur_id);
                    
                    dataarray['basedata'] = 'intranet';
                    dataarray['transaction'] = 'overtimeintranet';

                    dataarray['rencana_sblm_in_mulai'] = '';
                    dataarray['rencana_sblm_in_selesai'] = '';
                    dataarray['rencana_stlh_out_mulai'] = '';
                    dataarray['rencana_stlh_out_selesai'] = '';
                    dataarray['pelaksanaan_sblm_in_mulai'] = '';
                    dataarray['pelaksanaan_sblm_in_selesai'] = '';
                    dataarray['pelaksanaan_stlh_out_mulai'] = '';
                    dataarray['pelaksanaan_stlh_out_selesai'] = '';
                    //console.log('data array');
                    //console.log(dataarray);
                    
                    dataarray['scheduleshift_from'] = dataarray.overtimedate + ' ' + dataarray.in_time;
                    dataarray['scheduleshift_until'] = dataarray.overtimedate + ' ' + dataarray.out_time;
                    overtimeothertime = me.modifyDatainCurrentdate(grid.getStore(), dataarray);
                    //console.log(' dataarray.jam_lembur_approve ' + dataarray.jam_lembur_approve);
                    
                    /*
                     * 
                    /* comment by Wulan sari 2021 05 18, permintaan dari HC MCS (bu Nining), lembur "keduanya" from intranet dipisah menjadi 2 transaksi
                    if (overtimeothertime.counter > 0) {
                        arraylembur_id.push(overtimeothertime.data.lembur_id);
                        dataarray['lemburtype'] = 'keduanya';
                        if (overtimeothertime.sortby == 'sebelum') {
                            dataarray['rencana_sblm_in_mulai'] = dataarray.time_in_plan; //time_in;
                            dataarray['rencana_sblm_in_selesai'] = dataarray.time_out_plan; //in_time;
                            dataarray['rencana_stlh_out_mulai'] = overtimeothertime.data.time_in_plan; //out_time;
                            dataarray['rencana_stlh_out_selesai'] = overtimeothertime.data.time_out_plan; //time_out;
                            dataarray['pelaksanaan_sblm_in_mulai'] = dataarray.time_in;
                            dataarray['pelaksanaan_sblm_in_selesai'] = dataarray.time_out;
                            dataarray['pelaksanaan_stlh_out_mulai'] = overtimeothertime.data.time_in;
                            dataarray['pelaksanaan_stlh_out_selesai'] = overtimeothertime.data.time_out;
                            dataarray['scheduleshift_from'] = dataarray.overtimedate + " " + dataarray.in_time;
                            dataarray['scheduleshift_until'] = overtimeothertime.overtimedate + " " + dataarray.out_time;
                            me.intranet_jam_lembur_approve_before = dataarray.jam_lembur_approve;
                        } else if (overtimeothertime.sortby == 'sesudah') {
                            dataarray['rencana_sblm_in_mulai'] = overtimeothertime.data.time_in_plan; //time_in;
                            dataarray['rencana_sblm_in_selesai'] = overtimeothertime.data.time_out_plan; //in_time;
                            dataarray['rencana_stlh_out_mulai'] = dataarray.time_in_plan; //out_time;
                            dataarray['rencana_stlh_out_selesai'] = dataarray.time_out_plan; //time_out;
                            dataarray['pelaksanaan_sblm_in_mulai'] = overtimeothertime.data.time_in;
                            dataarray['pelaksanaan_sblm_in_selesai'] = overtimeothertime.data.time_out;
                            dataarray['pelaksanaan_stlh_out_mulai'] = dataarray.time_in;
                            dataarray['pelaksanaan_stlh_out_selesai'] = dataarray.time_out;
                            dataarray['scheduleshift_from'] = overtimeothertime.overtimedate + " " + dataarray.in_time;
                            dataarray['scheduleshift_until'] = dataarray.overtimedate + " " + dataarray.out_time;
                            me.intranet_jam_lembur_approve_after = dataarray.jam_lembur_approve;        
                        }
                        //console.log('intranet_jam_lembur_approve_before ' + me.intranet_jam_lembur_approve_before);
                        //console.log('intranet_jam_lembur_approve_after ' + me.intranet_jam_lembur_approve_after);
                        dataarray['sortby'] = overtimeothertime.sortby;
                    } else {                        
                        dataarray['rencana_mulai'] = dataarray.time_in_plan; //time_in;
                        dataarray['rencana_selesai'] = dataarray.time_out_plan; //in_time;
                        
                        if (dataarray['lemburtype'] == 'sebelum') {
                            me.intranet_jam_lembur_approve_before = dataarray.jam_lembur_approve;
                        } else if (dataarray['lemburtype'] == 'sesudah') {
                            me.intranet_jam_lembur_approve_after = dataarray.jam_lembur_approve;
                        } else if (dataarray['lemburtype'] == 'liburpanjang' || dataarray['lemburtype'] == 'libur') {
                            me.intranet_jam_lembur_approve_after = dataarray.jam_lembur_approve;
                        } else if (dataarray['lemburtype'] == 'liburpendek') {
                            me.intranet_jam_lembur_approve_after = dataarray.jam_lembur_approve;
                        }
                    }
                    */
                    dataarray['rencana_mulai'] = dataarray.time_in_plan; //time_in;
                    dataarray['rencana_selesai'] = dataarray.time_out_plan; //in_time;

                    if (dataarray['lemburtype'] == 'sebelum') {
                        me.intranet_jam_lembur_approve_before = dataarray.jam_lembur_approve;
                    } else if (dataarray['lemburtype'] == 'sesudah') {
                        me.intranet_jam_lembur_approve_after = dataarray.jam_lembur_approve;
                    } else if (dataarray['lemburtype'] == 'liburpanjang' || dataarray['lemburtype'] == 'libur') {
                        me.intranet_jam_lembur_approve_after = dataarray.jam_lembur_approve;
                    } else if (dataarray['lemburtype'] == 'liburpendek') {
                        me.intranet_jam_lembur_approve_after = dataarray.jam_lembur_approve;
                    } else if (dataarray['lemburtype'] == 'liburnasionalpendek') {
                        me.intranet_jam_lembur_approve_after = dataarray.jam_lembur_approve;
                    }

                    //alert(dataarray['lemburtype']);
                    formdata.down("[name=overtime_id]").setValue(0);
                    formdata.down("[name=lembur_id]").setValue(arraylembur_id);
                    formdata.down("[name=basedata]").setValue('intranet');
                    formdata.down("[name=transaction]").setValue('overtimeintranet');
                    formdata.down("[name=employee_employee_id]").setValue(dataarray.employee_id_ces);
                    formdata.down("[name=employee_employee_nik]").setValue(dataarray.employee_nik);
                    formdata.down("[name=employee_employee_name]").setValue(dataarray.employee_name);
                    formdata.down("[name=department_code]").setValue(dataarray.deptcode);
                    formdata.down("[name=department_department]").setValue(dataarray.department);
                    formdata.down("[name=date]").setValue(dataarray.overtimedate);
                    me.dateOnChangeforIntranet(dataarray);
                    formdata.down("[name=day_name]").setValue(dataarray.days);
                    formdata.down("[name=shifttype_code]").setValue(dataarray.shifttype);
                    formdata.down("[name=in_time]").setValue(dataarray.in_time);
                    formdata.down("[name=out_time]").setValue(dataarray.out_time);
                    formdata.down("[name=reason]").setValue(dataarray.description);
                    formdata.down("[name=configintranet]").setValue(dataarray.configintranet);
                    formdata.down("[name=status]").setValue(me.changeStatusovertimefromintranet(dataarray.lemburtype));
                    formdata.down("[name=intranet_reportto_id]").setValue(dataarray.employee_id_intranet);

                    formdata.down("[name=absen_in_time]").setValue(dataarray.time_in);
                    formdata.down("[name=absen_out_time]").setValue(dataarray.time_out);
                    
        
                }
                //console.log('intranet_jam_lembur_approve_before ' + me.intranet_jam_lembur_approve_before);
                //console.log('intranet_jam_lembur_approve_after ' + me.intranet_jam_lembur_approve_after);
                form.el.unmask();
                Ext.Msg.alert('Info', 'Calculate data from intranet finish');
                
                form.up('window').close();
                //form.up('window').hide();
            } else {
                Ext.Msg.alert('Info', 'Only HRD Check is No will be processed..!');
            }
        }

    },
    Deleteovertimeintranet: function () {
        var me, form, grid, store;
        me = this;
        
        grid = me.getGridovertime();
        rows = grid.getSelectionModel().getSelection();
        Ext.Msg.confirm('Delete Data', 'Are you sure want to delete?', function (btn) {
            if (btn == 'yes') {
                msg = function () {
                    grid.up('window').mask('Deleting data, please wait ...');
                };
                
                arraydata = [];
                for (var i = 0; i < rows.length; i++) {
                    if (rows[i]['data'].hrd_check == 'NO') {
                        arraydata.push(rows[i]['data']);
                    }
                }
                
                var dataarray = arraydata[0];
                var lembur_id = dataarray.lembur_id;
                var configintranet = dataarray.configintranet;
                
                //console.log(lembur_id + ' ' + configintranet);
                me.tools.ajax({
                    params: {
                        lembur_id       : lembur_id,
                        configintranet  : configintranet,
                    },
                    success: function (data, model) {
                        var hasil = data['others'][0][0]['HASIL'];
                        if(hasil == 1){
                            store = grid.getStore().remove(rows);
                        }
                    }
                }).read('deleteovertimeintranet');
                
            }
        });
    },
    setCleardataOvertimebyIntranet: function () {
        var me, form, grid, panel;
        me = this;
        form = me.getFormdata();
        grid = me.getGrid();
        panel = me.getPanel();
        me.validShift = false;
        form.getForm().reset();
        form.down("[action=lookup_employee]").setDisabled(true);
        panel.down("toolbar button[action=create]").setDisabled(true);
        panel.down("toolbar button[action=edit]").setDisabled(true);
        panel.down("toolbar button[action=delete]").setDisabled(true);
        panel.down("toolbar button[action=save]").setDisabled(false);
        panel.down("toolbar button[action=cancel]").setDisabled(false);
        //panel.down("toolbar button[action=print]").setDisabled(true);


    },
    setReadonlyOvertimebyIntranet: function () {
        var me, form;
        me = this;
        form = me.getFormdata();
        form.down("[name=date]").setReadOnly(true);
        form.down("[name=plan_before_start]").setReadOnly(true);
        form.down("[name=plan_before_end]").setReadOnly(true);
        form.down("[name=plan_after_start]").setReadOnly(true);
        form.down("[name=plan_after_end]").setReadOnly(true);
    },
    changeStatusovertimefromintranet: function (lemburtype) {
        var status_id = 0;
        if (lemburtype == 'sebelum') {
            status_id = 1;//Sebelum Jam Masuk
        } else if (lemburtype == 'sesudah') {
            status_id = 2;//Sesudah Jam Pulang
        } else if (lemburtype == 'keduanya') {
            status_id = 3;//Kalkulasi jika di hari yang sama terdapat 2 lembur untuk si karyawan di shift yang sama     
        } else if (lemburtype == 'liburpanjang' || lemburtype == 'libur') {
            status_id = 4;//Hari Libur Panjang // untuk yang libur sabtu dan minggu
        } else if (lemburtype == 'liburpendek') {
            status_id = 5;//Hari Libur Pendek // untuk yang libur hanya 1 hari dalam 1 minggu kerja
        } else if (lemburtype == 'liburnasionalpendek') {
            status_id = 6;
        }
        return status_id;

    },
    dateOnChangeforIntranet: function (dataarray) {
        var me = this;
        var p = me.getPanel();
        var f = me.getFormdata();
        me.validShift = false;
        p.setLoading("Cek informasi shift...");
        f.down("[name=shifttype_code]").setValue("");
        var vs = f.getForm().getValues();
        me.resetShiftInfo();
        me.resetSummary();
        me.tools.ajax({
            params: vs,
            success: function (data, model) {
                //console.log(data);

                var hasil = me.tools.shortHasilArray(data);
                if (hasil.length > 0) {
                    hasil = hasil[0];
                    me.shiftInfo = dataarray;
                    
                    f.down("[name=shifttype_code]").setValue(hasil["shifttype"]);
                    f.down("[name=in_time]").setValue(hasil["in_time"]);
                    f.down("[name=out_time]").setValue(hasil["out_time"]);
                    f.down("[name=day_name]").setValue(me.tools.dateFunc(vs['date']).getDayWeekName());

                    f.down("[name=absen_in_time]").setValue(hasil["time_in"]);
                    f.down("[name=absen_out_time]").setValue(hasil["time_out"]);
                    
                    if (hasil["in_time"] !== null && hasil["out_time"]) {
                        if (dataarray['lemburtype'] == 'keduanya') {
                            var totalhour = me.getTotalHour(dataarray['scheduleshift_from'], dataarray['scheduleshift_until']);
                            f.down("[name=work_hour_text]").setValue(totalhour);
                        } else {
                            var diffTime = me.tools.diffTime(hasil["in_time"], hasil["out_time"]);
                            f.down("[name=work_hour_text]").setValue(me.tools.timeToDecimal(diffTime));
                        }
                    }
                    me.validShift = true;
                } else {
                    me.tools.alert.warning("Tidak ada Informasi Shift");
                }

                me.resetFieldsPelaksanaanLembur(1);
                me.resetFieldsPelaksanaanLembur(0);
                ///me.timeOnBlur(); wulan edit 20191028 :  di eksekusi di statusOnSelectForIntranet( karena field harus terisi dulu
                p.setLoading(false);
                me.statusOnSelectForIntranet(dataarray);
            }
        }).read('shiftinfo');

    },
    statusOnSelectForIntranet: function (dataarray) {
        var me = this;
        var f = me.getFormdata();
        var si = me.shiftInfo;
        var status = f.down("[name=status]").getValue();

        if (!si) {
            console.log("Tidak ada informasi shift");
            return false;
        }

        me.currentStatusLembur = status;
        me.resetSummary();
        me.resetTime();

        if (status === 1) { //lembur sebelum jam kerja
            //Rencana Lembur
            //f.down("[name=plan_before_start]").setValue(si["time_in"]); 
            //f.down("[name=plan_before_end]").setValue(si["in_time"]);
            
            //wulan edit 20190207
            f.down("[name=plan_before_start]").setValue(dataarray.rencana_mulai); 
            f.down("[name=plan_before_end]").setValue(dataarray.rencana_selesai);
            

            //Pelaksanaan Lembur  

            //sebelum jam kerja     
            f.down("[name=exec_time_in_start]").setValue(dataarray.time_in);
            f.down("[name=exec_time_in_end]").setValue(dataarray.time_out);
        } else if (status === 2) { //lembur setelah jam pulang            
            //Rencana Lembur
            //f.down("[name=plan_after_start]").setValue(si["out_time"]);
            //f.down("[name=plan_after_end]").setValue(si["time_out"]);

            //wulan edit 20190207
            f.down("[name=plan_after_start]").setValue(dataarray.rencana_mulai); 
            f.down("[name=plan_after_end]").setValue(dataarray.rencana_selesai);
            
            //Pelaksanaan Lembur

            //setelah jam kerja 
            f.down("[name=exec_time_out_start]").setValue(dataarray.time_in);
            f.down("[name=exec_time_out_end]").setValue(dataarray.time_out);
        } else if (status === 3) { //lembur keduanya
            //Rencana Lembur       
            //f.down("[name=plan_before_start]").setValue(dataarray.rencana_sblm_in_mulai);
            //f.down("[name=plan_before_end]").setValue(dataarray.rencana_sblm_in_selesai);

            //f.down("[name=plan_after_start]").setValue(dataarray.rencana_stlh_out_mulai);
            //f.down("[name=plan_after_end]").setValue(dataarray.rencana_stlh_out_selesai);

            //wulan edit 20190207
            f.down("[name=plan_before_start]").setValue(dataarray.rencana_sblm_in_mulai);
            f.down("[name=plan_before_end]").setValue(dataarray.rencana_sblm_in_selesai);

            f.down("[name=plan_after_start]").setValue(dataarray.rencana_stlh_out_mulai);
            f.down("[name=plan_after_end]").setValue(dataarray.rencana_stlh_out_selesai);
            
            //Pelaksanaan Lembur
            //
            //sebelum jam kerja            
            f.down("[name=exec_time_in_start]").setValue(dataarray.pelaksanaan_sblm_in_mulai);
            f.down("[name=exec_time_in_end]").setValue(dataarray.pelaksanaan_sblm_in_selesai);

            //setelah jam kerja 
            f.down("[name=exec_time_out_start]").setValue(dataarray.pelaksanaan_stlh_out_mulai);
            f.down("[name=exec_time_out_end]").setValue(dataarray.pelaksanaan_stlh_out_selesai);





        } else if (status === 4 || status === 5 || status === 6) { // hari libur /off
            //status=4, lembur hari libur panjang
            //status=5, lemburh hari libur pendek

            //Rencana Lembur
            //f.down("[name=plan_after_start]").setValue(si["time_in"]);
            //f.down("[name=plan_after_end]").setValue(si["time_out"]);
            
            //wulan edit 20190207
            f.down("[name=plan_after_start]").setValue(dataarray.rencana_mulai); 
            f.down("[name=plan_after_end]").setValue(dataarray.rencana_selesai);
            

            //Pelaksanaan Lembur

            //setelah jam kerja 
            f.down("[name=exec_time_out_start]").setValue(dataarray.time_in);
            f.down("[name=exec_time_out_end]").setValue(dataarray.time_out);
        }
        me.timeOnBlur();
    },
    formatDate: function (param) {
        param = new Date(param);
        var monthval = [
            "01", "02", "03",
            "04", "05", "06", "07",
            "08", "09", "10",
            "11", "12"
        ];

        var date = param.getFullYear() + "-" + monthval[param.getMonth()] + "-" + param.getDate();
        return date;
    },
    getTotalHour: function (fromdatetime, untildatetime) {
        var diff, datetime1, datetime2;
        datetime1 = new Date(fromdatetime);
        datetime2 = new Date(untildatetime);

        diff = (datetime2.getTime() - datetime1.getTime()) / 1000;
        diff /= (60 * 60);
        return Math.abs(Math.round(diff));
    },

    /* end added by ahmad riadi 04-01-2018 */


    /* added by Wulan Sari 2018.05.28 */
    selectEmployee: function () {
        var me, form, grid, record;
        me = this;
        form = me.getFormdata();
        grid = me.getGridlookupemployee();
        record = grid.getSelectedRecord();
        if (record) {
            me.tools.fillEmployeeInfo(record, form);
            grid.up("window").close();
        }
    },
    searchOnClick:function(){
        var me = this;
        var s = me.getGridlookupemployee().getStore();
        var fields = me.getFormsearhemployee().getValues();
        for (var x in fields)
        {
            s.getProxy().setExtraParam(x, fields[x]);
        }
        s.loadPage(1);
        
    },
    resetOnClick:function(){
        var me = this;
        me.getFormsearhemployee().getForm().reset(true);
        me.searchOnClick();
    },
    /* end added by Wulan Sari 2018.05.28 */

    // edit by wulan sari 20190208
    sendemailData: function () {  
        var me = this;
        var f = me.getFormdata();
        var overtime_id = f.down("[name=overtime_id]").getValue();
        var intranet_reportto_id = f.down("[name=intranet_reportto_id]").getValue();
        var intranet_hrd_comment = f.down("[name=intranet_hrd_comment]").getValue();
        var employee_id = f.down("[name=employee_employee_id]").getValue();
        
        if(intranet_hrd_comment == '' ){
            Ext.Msg.alert('Warning', 'Message is required');
            return false;
        }
        
        if(intranet_reportto_id == '' ){
            Ext.Msg.alert('Warning', 'Approver not found');
            return false;
        }
        
        if(employee_id == '' ){
            Ext.Msg.alert('Warning', 'Employee not found');
            return false;
        }
        
        f.el.mask('Please wait', 'x-mask-loading');
        
        me.tools.ajax({
            params: {
                overtime_id : overtime_id,
                intranet_reportto_id : intranet_reportto_id,
                employee_id : employee_id,
                intranet_hrd_comment : intranet_hrd_comment
            },
            success: function (data, model) {
                f.el.unmask();
                var status = data.others[0][0]['SUCCESS'];
                if(status){
                    me.dynamicrequest.buildSuccessAlert('Email sent ');
                } else {
                    me.dynamicrequest.buildSuccessAlert('Problem when sending Email');                    
                }
            }
        }).read('sendemail');

    },
    sendemailjamData: function () {  
        var me = this;
        var f = me.getFormdata();
        var overtime_id = f.down("[name=overtime_id]").getValue();
        var intranet_reportto_id = f.down("[name=intranet_reportto_id]").getValue();
        var intranet_hrd_comment = f.down("[name=intranet_hrd_comment_jam]").getValue();
        
        if(intranet_hrd_comment == '' ){
            Ext.Msg.alert('Warning', 'Message is required');
            return false;
        }
        
        if(intranet_reportto_id == '' ){
            Ext.Msg.alert('Warning', 'Approver not found');
            return false;
        }
        
        f.el.mask('Please wait', 'x-mask-loading');
        
        me.tools.ajax({
            params: {
                overtime_id : overtime_id,
                intranet_reportto_id : intranet_reportto_id,
                employee_id : 0, // hanya ke approver
                intranet_hrd_comment : intranet_hrd_comment
            },
            success: function (data, model) {
                f.el.unmask();
                var status = data.others[0][0]['SUCCESS'];
                if(status){
                    me.dynamicrequest.buildSuccessAlert('Email sent ');
                } else {
                    me.dynamicrequest.buildSuccessAlert('Problem when sending Email');                    
                }
            }
        }).read('sendemail');

    },
    
    // added by wulan sari 20180318
    getDataovertimeapi: function (flag) {
        var me, form, formvalue, grid, store;
        me = this;
        form = me.getFormoptionsovertimeapi();
        formvalue = form.getForm().getValues();
        
        grid = me.getGridovertimeapi();
        grid.doInit();
        
        var store = grid.getStore();
        store.getProxy().extraParams = {
            mode_read: 'getdataovertimeapi'
        };
        
        store = store.load({
            callback: function (data, model) {
                grid.attachModel(model);
                grid.store.sort({property: 'lembur_dari', direction: 'ASC'});
                //supaya paging langsung aktif tanpa user refresh secara manual dan set pageSize jadi 25
                Ext.apply(store, {pageSize: 25});
            }
        });        
    },
    getFilterovertimeapi: function () {
        var me, form, formvalue, grid, store, rawdept, rawemployee, rawcuti;
        me = this;
        form = me.getFormoptionsovertimeapi();
        formvalue = form.getForm().getValues();
        grid = me.getGridovertimeapi();
        grid.doInit();
        
        var store = grid.getStore();
        store.getProxy().extraParams = {
            mode_read: 'getdatafilterovertimeapi',
            paramdata: Ext.JSON.encode(formvalue),
        };
        
        store = store.load({
            callback: function (data, model) {
                grid.attachModel(model);
                grid.store.sort({property: 'lembur_dari', direction: 'ASC'});
                Ext.apply(store, {pageSize: 25});
            }
        });                
    },    
    Processovertimeapi: function () {
        var me, form, grid, store, rows, arraydata, status, msg, indexdata, dataarray, arraylembur_id, formdata, overtimeothertime;
        me = this;
        grid = me.getGridovertimeapi();
        rows = grid.getSelectionModel().getSelection();
        form = me.getFormoptionsovertimeapi();
        formdata = me.getFormdata();
        if (rows.length < 1) {
            Ext.Msg.alert('Info', 'No record selected..!');
            return;
        } else {
            arraydata = [];
            for (var i = 0; i < rows.length; i++) {
                if (rows[i]['data'].hrd_check == 'NO') {
                    arraydata.push(rows[i]['data']);
                }
            }
            arraylembur_id =[];
            if (arraydata.length) {
                me.setReadonlyOvertimebyIntranet();
                form.el.mask('Please wait', 'x-mask-loading');
                indexdata;
                dataarray = null;
                for (indexdata = 0; indexdata < arraydata.length; ++indexdata) {
                    dataarray = arraydata[indexdata];
                    arraylembur_id.push(dataarray.lembur_id);
                    
                    dataarray['basedata'] = 'api';
                    dataarray['transaction'] = 'overtimeapi';

                    dataarray['rencana_sblm_in_mulai'] = '';
                    dataarray['rencana_sblm_in_selesai'] = '';
                    dataarray['rencana_stlh_out_mulai'] = '';
                    dataarray['rencana_stlh_out_selesai'] = '';
                    dataarray['pelaksanaan_sblm_in_mulai'] = '';
                    dataarray['pelaksanaan_sblm_in_selesai'] = '';
                    dataarray['pelaksanaan_stlh_out_mulai'] = '';
                    dataarray['pelaksanaan_stlh_out_selesai'] = '';

                    dataarray['scheduleshift_from'] = dataarray.overtimedate + ' ' + dataarray.in_time;
                    dataarray['scheduleshift_until'] = dataarray.overtimedate + ' ' + dataarray.out_time;
                    
                    /* comment by Wulan sari 2021 05 18, permintaan dari HC MCS (bu Nining), lembur "keduanya" from intranet dipisah menjadi 2 transaksi
                    overtimeothertime = me.modifyDatainCurrentdate(grid.getStore(), dataarray);
                    if (overtimeothertime.counter > 0) {
                        arraylembur_id.push(overtimeothertime.data.lembur_id);
                        dataarray['lemburtype'] = 'keduanya';
                        if (overtimeothertime.sortby == 'sebelum') {
                            dataarray['rencana_sblm_in_mulai'] = dataarray.time_in_plan; //time_in;
                            dataarray['rencana_sblm_in_selesai'] = dataarray.time_out_plan; //in_time;
                            dataarray['rencana_stlh_out_mulai'] = overtimeothertime.data.time_in_plan; //out_time;
                            dataarray['rencana_stlh_out_selesai'] = overtimeothertime.data.time_out_plan; //time_out;
                            dataarray['pelaksanaan_sblm_in_mulai'] = dataarray.time_in;
                            dataarray['pelaksanaan_sblm_in_selesai'] = dataarray.time_out;
                            dataarray['pelaksanaan_stlh_out_mulai'] = overtimeothertime.data.time_in;
                            dataarray['pelaksanaan_stlh_out_selesai'] = overtimeothertime.data.time_out;
                            dataarray['scheduleshift_from'] = dataarray.overtimedate + " " + dataarray.in_time;
                            dataarray['scheduleshift_until'] = overtimeothertime.overtimedate + " " + dataarray.out_time;
                        } else if (overtimeothertime.sortby == 'sesudah') {
                            dataarray['rencana_sblm_in_mulai'] = overtimeothertime.data.time_in_plan; //time_in;
                            dataarray['rencana_sblm_in_selesai'] = overtimeothertime.data.time_out_plan; //in_time;
                            dataarray['rencana_stlh_out_mulai'] = dataarray.time_in_plan; //out_time;
                            dataarray['rencana_stlh_out_selesai'] = dataarray.time_out_plan; //time_out;
                            dataarray['pelaksanaan_sblm_in_mulai'] = overtimeothertime.data.time_in;
                            dataarray['pelaksanaan_sblm_in_selesai'] = overtimeothertime.data.time_out;
                            dataarray['pelaksanaan_stlh_out_mulai'] = dataarray.time_in;
                            dataarray['pelaksanaan_stlh_out_selesai'] = dataarray.time_out;
                            dataarray['scheduleshift_from'] = overtimeothertime.overtimedate + " " + dataarray.in_time;
                            dataarray['scheduleshift_until'] = dataarray.overtimedate + " " + dataarray.out_time;
                        }
                        dataarray['sortby'] = overtimeothertime.sortby;
                    } else {                        
                        dataarray['rencana_mulai'] = dataarray.time_in_plan; //time_in;
                        dataarray['rencana_selesai'] = dataarray.time_out_plan; //in_time;
                    }
                    */
                    
                    dataarray['rencana_mulai'] = dataarray.time_in_plan; //time_in;
                    dataarray['rencana_selesai'] = dataarray.time_out_plan; //in_time;
                    
                    formdata.down("[name=overtime_id]").setValue(0);
                    formdata.down("[name=lembur_id]").setValue(arraylembur_id);
                    formdata.down("[name=basedata]").setValue('api');
                    formdata.down("[name=transaction]").setValue('overtimeintranet');
                    formdata.down("[name=employee_employee_id]").setValue(dataarray.employee_id_ces);
                    formdata.down("[name=employee_employee_nik]").setValue(dataarray.employee_nik);
                    formdata.down("[name=employee_employee_name]").setValue(dataarray.employee_name);
                    formdata.down("[name=department_code]").setValue(dataarray.deptcode);
                    formdata.down("[name=department_department]").setValue(dataarray.department);
                    formdata.down("[name=date]").setValue(dataarray.overtimedate);
                    me.dateOnChangeforIntranet(dataarray);
                    formdata.down("[name=day_name]").setValue(dataarray.days);
                    formdata.down("[name=shifttype_code]").setValue(dataarray.shifttype);
                    formdata.down("[name=in_time]").setValue(dataarray.in_time);
                    formdata.down("[name=out_time]").setValue(dataarray.out_time);
                    formdata.down("[name=reason]").setValue(dataarray.description);
                    formdata.down("[name=configintranet]").setValue(dataarray.configintranet);
                    formdata.down("[name=status]").setValue(me.changeStatusovertimefromintranet(dataarray.lemburtype));
                    formdata.down("[name=intranet_reportto_id]").setValue(dataarray.employee_id_intranet);

                    formdata.down("[name=absen_in_time]").setValue(dataarray.time_in);
                    formdata.down("[name=absen_out_time]").setValue(dataarray.time_out);


                }
                form.el.unmask();
                Ext.Msg.alert('Info', 'Calculate data from Api finish');
                
                form.up('window').close();
                //form.up('window').hide();
            } else {
                Ext.Msg.alert('Info', 'Only HRD Check is No will be processed..!');
            }
        }

    },
    Deleteovertimeapi: function () {
        var me, form, grid, store;
        me = this;
        
        grid = me.getGridovertimeapi();
        rows = grid.getSelectionModel().getSelection();
        Ext.Msg.confirm('Delete Data', 'Are you sure want to delete?', function (btn) {
            if (btn == 'yes') {
                msg = function () {
                    grid.up('window').mask('Deleting data, please wait ...');
                };
                
                arraydata = [];
                for (var i = 0; i < rows.length; i++) {
                    if (rows[i]['data'].hrd_check == 'NO') {
                        arraydata.push(rows[i]['data']);
                    }
                }
                
                var dataarray = arraydata[0];
                var lembur_id = dataarray.lembur_id;
                
                //console.log(lembur_id);
                me.tools.ajax({
                    params: {
                        lembur_id       : lembur_id
                    },
                    success: function (data, model) {
                        var hasil = data['others'][0][0]['HASIL'];
                        if(hasil == 1){
                            store = grid.getStore().remove(rows);
                        }
                    }
                }).read('deleteovertimeapi');
                
            }
        });
    },
    // end added by wulan sari 20180318
    
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
                      //console.log("CREATE CALL");
                      
                    },
                    update: function(store, form, grid) {
                        me.isEditing = true;
                      //  console.log("UPDATE CALL");
                      
                    }
                }
            });
            
        }else{
            me.tools.alert.warning(v.msg);
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
            //console.log(f.editedRow);
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
                
            me.afterCallNew();
            
                // edit by wulan sari 20190904
                var grid = me.getGridovertimedetail();
                grid.getStore().removeAll();
                // end edit by wulan sari 20190904
                

            },
            failure: function(batch, op) {
                var erMsg = "Something error when processing your request.";
                var jsD = batch.proxy.getReader().jsonData;
                var str = '';
                var strs = '';
                if (typeof jsD.msg !== "undefined") {
                    str = jsD.msg;
                }
                s.rejectChanges();
                f.up('window').body.unmask();
                
                strs = str.split("|");
                erMsg = strs[0];                
                //alert(erMsg);
                if(erMsg == 'overtime_in_lebih_kecil_dari_absent' || erMsg == 'overtime_out_lebih_besar_dari_absent'){

                    var confirm_text = strs[1];
                    /*
                    if(erMsg == 'overtime_in_lebih_kecil_dari_absent'){
                        confirm_text = 'Jam datang lembur lebih kecil dari jam datang absent, yakin akan lanjutkan?';
                    } else if(erMsg == 'overtime_out_lebih_besar_dari_absent'){
                        confirm_text = 'Jam pulang lembur lebih besar dari jam pulang absent, yakin akan lanjutkan?';
                    }
                    */
                    Ext.Msg.confirm('Confirm', confirm_text, function (btn) {
                        if (btn == 'yes') {
                            
                            var f = me.getFormdata();
                            f.down("[name=confirm_alert_time]").setValue(1);
                            me.saveOnClick();
                        }
                    });
                } else {
                    me.tools.alert.warning(erMsg);
                }

            }
        }
        );
    },
    
});