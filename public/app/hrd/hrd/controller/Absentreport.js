Ext.define('Hrd.controller.Absentreport', {
    extend: 'Hrd.library.box.controller.ControllerReport',
    alias: 'controller.absentreport',
    controllerName: 'absentreport',
    bindPrefixName: 'Absentreport',
    otherParamsAT: {leave: 0, sick: 0, permission: 0},
    init: function (application) {
        this.callParent(arguments);
        var newEvs = {};
        var me = this;
        newEvs['absentreportpanel #employeeAbsentDatasFormID [name=based]'] = {
            select: function (el, val) {
                me.changeFilterFields(el, val);
            }
        };
        newEvs['absentreportpanel #employeeAbsentDatasFormID #searchButtonID'] = {
            click: function (el, val) {
                me.searchEmpClick(el);
            }
        };
        newEvs['absentreportpanel #employeeAbsentDatasFormID [name=department_id]'] = {
            select: function (el, val) {
                me.filterEmployeex();
            }
        };
        newEvs['absentreportpanel #employeeAbsentDatasFormID [name=group_id]'] = {
            select: function (el, val) {
                me.filterEmployeex();
            }
        };

        //searchButtonID
        console.log(me.controllerName);

        this.control(newEvs);
    },
    filterEmployeex: function () {
        var me = this;
        var f = me.getForm();
        var dv = me.tools.intval(f.down("[name=department_id]").getValue());
        var gv = me.tools.intval(f.down("[name=group_id]").getValue());
        var es = f.down("[name=employee_id]").getStore();
        dv = dv === 999 ? 0 : dv;
        gv = gv === 999 ? 0 : gv;





        es.clearFilter();


        /// filter hanya per department saja
        if (es.getCount() > 0 && dv > 0 && gv === 0) {

            //f.down("[name=absenttype_absenttype_id]").setValue(false);
            es.filterBy(function (rec, id) {

                if (rec.raw.department_department_id === dv) {
                    return true;
                } else {
                    return false;
                }
            });
        }

        /// filter untuk department dan golongan 

        if (es.getCount() > 0 && dv > 0 && gv > 0) {

            //f.down("[name=absenttype_absenttype_id]").setValue(false);
            es.filterBy(function (rec, id) {

                if (rec.raw.department_department_id === dv
                        && rec.raw.group_group_id === gv) {
                    return true;
                } else {
                    return false;
                }
            });
        }

        /// filter untuk golongan saja

        if (es.getCount() > 0 && dv === 0 && gv > 0) {

            //f.down("[name=absenttype_absenttype_id]").setValue(false);
            es.filterBy(function (rec, id) {

                if (rec.raw.group_group_id === gv) {
                    return true;
                } else {
                    return false;
                }
            });
        }


    },
    searchEmpClick: function () {
        var me = this;
        var emName = me.getForm().down("[name=employee_name]").getValue();
        if (emName.length > 0) {
            me.tools.ajax({
                params: {
                    employee_name: me.getForm().down("[name=employee_name]").getValue()
                },
                success: function (data, model) {
                    me.tools.wesea({data: data, model: model}, me.getEmGrid()).grid();
                }
            }).read('lookemployee');
        } else {
            me.tools.alert.error("Mininum 1 character");
        }

    },
    changeFilterFields: function (el, val) {
        var me = this;
        var id = el.getValue();
        var container = me.getForm().down("#filterContainerID");
        me.hideAllFilters();

        container.down("#dateContainer").show();
        switch (id) {
            case 1: /// division
                container.down("[name=division_id]").show();
                break;
            case 2: /// category


                container.down("[name=group_id]").show();
                break;
            case 3: /// category

                container.down("#employeeListGridID").show();//
                container.down("#searchButtonID").show();
                container.down("[name=employee_name]").show();

                break;
        }

    },
    showEmployeeFilter: function (container) {
        var me = this;
        container.down("[name=employee_name]").show();
        me.getEmGrid().show();
        container.down("#searchButtonID").show();
    },
    /* must override */
    processParams: function (reportData) {
        var me = this;
        var sd = new Date(reportData['params']['start_date']);
        var departmentId = reportData['params']['department_id'];
        var groupId = reportData['params']['group_id'];

        reportData['params']['start_date'] = me.tools.dateFunc(reportData['params']['start_date']).toYMD('-');
        reportData['params']['end_date'] = me.tools.dateFunc(reportData['params']['end_date']).toYMD('-');
        reportData['params']['start_date_text'] = me.tools.dateFunc(reportData['params']['start_date']).toDMY('/');
        reportData['params']['end_date_text'] = me.tools.dateFunc(reportData['params']['end_date']).toDMY('/');
        reportData['params']['department_id'] = departmentId === "999" ? "" : departmentId;
        reportData['params']['group_id'] = groupId === "999" ? "" : groupId;

        switch (reportData['params']['report_type']) {
            case 'harian':
                reportData['file'] = 'HrdAbsentHarian';
                break;
            case 'format_d':
                reportData['file'] = 'HrdAbsentFormatD';
                break;
            case 'terlambat':
                reportData['file'] = 'HrdAbsentTerlambat';
                break;
            case 'terlambat':
                reportData['file'] = 'HrdAbsentTerlambat';
                break;
            case 'datakonsultan':
                reportData['file'] = 'HrdAbsentDatakonsultan';
                break;
        }

   
        return reportData;


    },
    zendInitLoaded: function (data) {
        var me = this;
        var f = me.getForm();

        me.tools.wesea(data.department, f.down("[name=department_id]")).comboBox(true);
        me.tools.wesea(data.group, f.down("[name=group_id]")).comboBox(true);
        me.tools.wesea(data.employeeb, f.down("[name=employee_id]")).comboBox();

        f.down("[name=department_id]").setValue('999');
        f.down("[name=group_id]").setValue('999');



        return;

        //   me.tools.wesea(data.department, f.down("#departmentCheckBoxID")).checkBox();



        f.down("[name=division_id]").setValue('999');

        var othersAT = data.others[0][0];

        me.otherParamsAT.sick = othersAT["AT_SICK"];
        me.otherParamsAT.leave = othersAT["AT_LEAVE"];
        me.otherParamsAT.permission = othersAT["AT_PERMISSION"];

        var esEl = f.down("[name=group_id]");
        me.tools.wesea(data.group, esEl).comboBox();
        esEl.setValue('999');
        me.hideAllFilters();



    },
    getEmGrid: function () {
        return this.getForm().down("#employeeListGridID");
    },
    getReportTypeCombo: function () {
        return this.getForm().down("[name=report_type]");
    },
    processReport: function () {
        var me = this;

        var f = me.getForm();
        var vs = f.getValues();
        var p = me.getPanel();
        p.setLoading("Please wait...");       
        
        if (vs["report_type"] == "format_e") {
            me.ConfirmPrintReport(p, 'reportformat_e', vs);
            return false;
        }
        if (vs["report_type"] == "harian") {
            me.ConfirmPrintReport(p, 'reportharian', vs);
            return false;
        }
        p.setLoading(false);

        var winId = 'myReportWindow';
        me.instantWindow('Panel', 800, 'Result ', 'state-report', winId, 'masterreport');
        var win = desktop.getWindow(winId);
        
        
        
        if (win) {
            var f = me.getPanel().down("form");
            var params = f.getForm().getFieldValues();
           
            
            var reportData = me.processParams({params: params, file: 'blank'});
            var reportFile = reportData.file;
            var html = me.generateFakeForm(reportData.params, reportData.file);
            win.down("#MyReportPanel").body.setHTML(html);
            $("#fakeReportFormID").submit();
        }
    },
    ConfirmPrintReport: function (form, actiondialog, value) {
        var me, params;
        me = this;
        params = me.getPanel().down("form").getForm().getFieldValues();
        value['department']=me.getPanel().down("form").down('[name=department_id]').getRawValue();
        console.log(value);
        form.setLoading(false);
        Ext.Msg.show({
            title: 'Confirm Result Print Data',
            msg: 'Please choose your type report',
            width: 300,
            closable: false,
            buttons: Ext.Msg.YESNO,
            buttonText:
                    {
                        yes: 'EXCEL FILE',
                        no: 'STIMULSOFT'
                    },
            multiline: false,
            fn: function (buttonValue, inputText, showConfig) {
                if (buttonValue == 'yes') {
                    switch (actiondialog) {
                        case 'reportformat_e':
                            me.SettoAjax(value, 'excelformate');
                            break;
                        case 'reportharian':
                            me.SettoAjax(value, 'excelreportharian');
                            break;


                    }
                } else {
                    switch (actiondialog) {
                        case 'reportformat_e':
                            me.SettoAjax(value, 'createTmpforviewer');
                            break;
                        case 'reportharian':
                            me.CreateReportSTI(params, 'HrdAbsentHarian');
                            break;
                    }
                }

            },
            icon: Ext.Msg.QUESTION
        });
    },
    SettoAjax: function (value, param) {
        var me, url, dataparam;
        me = this;
        me.getPanel().setLoading('Please wait...');
        me.tools.ajax({
            params: value,
            success: function (data, model) {
                me.getPanel().setLoading(false);
                switch (param) {
                    case 'excelformate':
                    case 'excelreportharian':
                        url = data['others'][0][0]['URL'];
                        if (url) {
                            Ext.Msg.show({
                                title: 'Info',
                                msg: '<a href="' + url + '" target="blank">Download file</a>',
                                icon: Ext.Msg.INFO,
                                buttons: Ext.Msg.OK,
                                fn: function () {
                                }
                            });
                        }
                        break;
                    case 'createTmpforviewer':
                        dataparam = data['others'][0][0]['MSG'];
                        me.CreateReportSTI(dataparam, 'Absentreportformate');
                        break;
                }
            }
        }).read(param);
    },
    CreateReportSTI: function (dataparam, filereport) {
        var me, winId, win, panel, params, reportData, reportFile, html;
        me = this;
        winId = 'myReportWindow';
        me.instantWindow('Panel', 800, 'Result ', 'state-report', winId, 'masterreport');
        win = desktop.getWindow(winId);
        if (win) {
            panel = me.getPanel().down("form");
            params = panel.getForm().getFieldValues();
            params = dataparam;
            reportData = me.processParams({params: params, file: 'blank'});
            html = me.generateFakeForm(reportData.params, filereport);
            win.down("#MyReportPanel").body.setHTML(html);
            $("#fakeReportFormID").submit();
        }
    }
});