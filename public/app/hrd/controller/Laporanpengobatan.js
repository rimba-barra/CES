Ext.define('Hrd.controller.Laporanpengobatan', {
    extend: 'Hrd.library.box.controller.ControllerReport',
    alias: 'controller.laporanpengobatan',
    controllerName: 'laporanpengobatan',
    bindPrefixName: 'Laporanpengobatan',
    otherParamsAT: {leave: 0, sick: 0, permission: 0},
    refs: [
        {
            ref: 'gridem',
            selector: 'laporanpengobatanemployeegrid'
        }
    ],
    init: function(application) {
        this.callParent(arguments);
        var newEvs = {};
        var me = this;
        newEvs['#laporanPengobatansFormID [name=based]'] = {
            select: function(el, val) {
                me.changeFilterFields(el, val);
            }
        };
        newEvs['#laporanPengobatansFormID #searchButtonID'] = {
            click: function(el, val) {
                me.searchEmpClick(el);
            }
        };

        newEvs['#laporanPengobatansFormID [name=department_id]'] = {
            select: function(el, val) {
                me.filterEmCombo();
            }
        };

        //searchButtonID
        console.log(me.controllerName);

        this.control(newEvs);
    },
    filterEmCombo: function() {
        var me = this;
        var f = me.getForm();
        var depId = me.tools.intval(f.down("[name=department_id]").getValue());
        var s = f.down("[name=employee_id]").getStore();
        s.clearFilter(true);
        if(depId !== 999){
            s.filter('department_department_id', new RegExp("^"+depId+"$"));
        }
        f.down("[name=employee_id]").setValue("");
            
        
        /*
        
        f.down("[name=employee_id]").setValue("");
        if (depId) {
            
            s.filterBy(function(rec, id) {
                
                if (rec.raw.department_department_id === depId) {
                    return true;
                }
                else {
                    return false;
                }
            });
            
            f.down("[name=employee_id]").setValue("");
        }
        */
       

    },
    searchEmpClick: function() {
        var me = this;
        var emName = me.getForm().down("[name=employee_name]").getValue();
        if (emName.length > 0) {
            me.tools.ajax({
                params: {
                    employee_name: me.getForm().down("[name=employee_name]").getValue()
                },
                success: function(data, model) {
                    me.tools.wesea({data: data, model: model}, me.getEmGrid()).grid();
                }
            }).read('lookemployee');
        } else {
            me.tools.alert.error("Mininum 1 character");
        }

    },
    changeFilterFields: function(el, val) {
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
    showEmployeeFilter: function(container) {
        var me = this;
        container.down("[name=employee_name]").show();
        me.getEmGrid().show();
        container.down("#searchButtonID").show();
    },
    /* must override */
    processParams: function(reportData) {
        var me = this;


        var sd = new Date(reportData['params']['start_date']);
        var departmentId = reportData['params']['department_id'];
        var status = reportData['params']['status'];
            reportData['params']['start_date'] = me.tools.dateFunc(reportData['params']['start_date']).toYMD('-');
         reportData['params']['end_date'] = me.tools.dateFunc(reportData['params']['end_date']).toYMD('-');
           reportData['params']['start_date_text'] = me.tools.dateFunc(reportData['params']['start_date']).toDMY('/');
          reportData['params']['end_date_text'] = me.tools.dateFunc(reportData['params']['end_date']).toDMY('/');
        reportData['params']['department_id'] = departmentId === "999" ? "0" : departmentId;
        reportData['params']['employeestatus_id'] = status === "999" ? "0" : status;
        reportData['params']['is_active'] = reportData['params']['is_active'] === "999" ? "-1" : reportData['params']['is_active'];
        reportData['params']['employee_id'] = reportData['params']['employee_id'] === "999" ? "0" : reportData['params']['employee_id'];
		
		// console.log(reportData);

        switch (reportData['params']['report_type']) {
            case '1':
                reportData['file'] = 'HrdLaporanpengobatan';
                break;

        }

        console.log(reportData);

        return reportData;



    },
     processReport: function () {
        var me = this;

        var f = me.getForm();
        var vs = f.getValues();
        var p = me.getPanel();
        p.setLoading("Please wait...");       
        
        if (vs["report_type"] == "1") {
            me.ConfirmPrintReport(p, '1', vs);
            return false;
        }
        if (vs["report_type"] == "2") {
            me.ConfirmPrintReport(p, '2', vs);
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
            //var html = me.generateFakeForm(reportData.params, reportData.file);
            var html = me.generateFakeForm_v3(reportData.params, reportData.file); // edit by Wulan 20201126
            win.down("#MyReportPanel").body.setHTML(html);
            $("#fakeReportFormID").submit();            
        }
    },
    ConfirmPrintReport: function (form, actiondialog, value) {
        var me, params;
        me = this;
        params = me.getPanel().down("form").getForm().getFieldValues();
        value['department']=me.getPanel().down("form").down('[name=department_id]').getRawValue();
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
                        case '1':
                            me.tools.alert.warning('Mohon maaf untuk sekarang belum tersedia dalam bentuk EXCEL');       
                            break;
                        case '2':
                            me.SettoAjax(value, 'excelformatrj');
                            break;
                    }
                } else {
                    /*
                    switch (actiondialog) {
                        case 'reportformat_e':                            
                            me.SettoAjax(value, 'createTmpforviewer');                            
                            break;
                        case 'reportharian':
                            me.CreateReportSTI(params, 'HrdAbsentHarian');
                            break;
                    }*/
                    
                    if(actiondialog == '1'){
                        // edit by wulan 1 12 2020
                        var winId = 'myReportWindow';
                        me.instantWindow('Panel', 800, 'Result ', 'state-report', winId, 'masterreport');
                        var win = desktop.getWindow(winId);           

                        if (win) {
                            var f = me.getPanel().down("form");
                            var params = f.getForm().getFieldValues();  
                            var reportData = me.processParams({params: params, file: 'blank'});
                            var reportFile = reportData.file;
                            
                            //added by anas 21122021
                            if(reportFile == "HrdAbsentHarianMhl" && reportData.params["format_laporan"] == "R")
                            {
                                reportFile = "HrdAbsentHarianMhlRekap";
                                reportData.file = "HrdAbsentHarianMhlRekap"
                            }
                            //end added by anas

                            var html = me.generateFakeForm_v3(reportData.params, reportData.file);
                            win.down("#MyReportPanel").body.setHTML(html);
                            $("#fakeReportFormID").submit(); 
                        }
                    }else{
                        me.tools.alert.warning('Mohon maaf untuk sekarang belum tersedia dalam bentuk STIMULSOFT'); 
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
                    case 'excelformatrj':
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

                    
                }
            }
        }).read(param);
    },  
    zendInitLoaded: function(data) {
        var me = this;
        var f = me.getForm();

        console.log(data);
        if (data.department) {
            me.tools.wesea(data.department, f.down("[name=department_id]")).comboBox(true);
        }

        me.tools.wesea(data.employeeb, f.down("[name=employee_id]")).comboBox(true);
        me.tools.wesea(data.alokasibiaya, f.down("[name=alokasibiaya_id]")).comboBox(true);
        me.tools.wesea(data.jenispengobatan, f.down("[name=jenispengobatan_id]")).comboBox(true);

        /*
         var ge = f.down("laporanpengobatanemployeegrid");
         ge.getSelectionModel().setSelectionMode('SINGLE');
         ge.doInit();
         ge.getStore().load({
         callback: function(rec, op) {
         ge.attachModel(op);
         }
         });
         */


        //   me.tools.wesea(data.group, f.down("[name=group_id]")).comboBox(true);

        f.down("[name=department_id]").setValue('999');
        f.down("[name=employee_id]").setValue('999');
        f.down("[name=alokasibiaya_id]").setValue('999');
        f.down("[name=jenispengobatan_id]").setValue('999');
       // f.down("[name=employee_id]").setValue('999');


        return;




    },
    getEmGrid: function() {
        return this.getForm().down("#employeeListGridID");
    },
    getReportTypeCombo: function() {
        return this.getForm().down("[name=report_type]");
    }
});