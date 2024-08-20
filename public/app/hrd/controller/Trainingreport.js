Ext.define('Hrd.controller.Trainingreport', {
    extend: 'Hrd.library.box.controller.ControllerReport',
    alias: 'controller.trainingreport',
    controllerName: 'trainingreport',
    bindPrefixName: 'Trainingreport',
    dateNow: new Date(),
    ParamRender:null,
    otherParamsAT :{leave:0,sick:0,permission:0},
    init: function(application) {
        this.callParent(arguments);
        var newEvs = {};
        var me = this;
        var config = new Hrd.library.box.tools.DefaultConfig({
            moduleName: me.controllerName
        });
        newEvs['#TrainingReportPanel #btnExport'] = {
            click: function(el, val) {
                this.exportData();       
            }
        };
        //searchButtonID
        console.log(me.controllerName);

        this.control(newEvs);
    },
    /* must override */
    processParams: function(reportData) {
        var me = this;

      
        
       
        var sd = new Date(reportData['params']['start_date']);
        // var projectptId = reportData['params']['projectpt_id'];
        var departmentId = reportData['params']['department_id'];
        var employeeId = reportData['params']['employee_id'];
        reportData['params']['start_date'] = me.tools.dateFunc(reportData['params']['start_date']).toYMD('-');
        reportData['params']['end_date'] = me.tools.dateFunc(reportData['params']['end_date']).toYMD('-');
        reportData['params']['start_date_text'] = me.tools.dateFunc(reportData['params']['start_date']).toDMY('-');
        reportData['params']['end_date_text'] = me.tools.dateFunc(reportData['params']['end_date']).toDMY('-');
        // reportData['params']['projectpt_id'] = projectptId==="999"?"0":projectptId;
        reportData['params']['department_id'] = departmentId==="999"?"0":departmentId;
        reportData['params']['employee_id'] = employeeId==="999"?"0":employeeId;
        

        var per_type = me.getForm().down("[name=per_type]").getValue();
        switch (reportData['params']['report_type']) {
            case 'training':
                reportData['file'] = 'Training';
                break;
            // added by Michael 2021.06.25 
            case 'survey':
                reportData['file'] = 'TrainingSurvey';
                break;
        }

        return reportData;


    },
    
    zendInitLoaded: function(data) {
        var me = this;
        var f = me.getForm();
        
        // console.log(data);
        // me.tools.wesea(data.projectpt, f.down("[name=projectpt_id]")).comboBox(true);
        me.tools.wesea(data.department, f.down("[name=department_id]")).comboBox(true);
        me.tools.wesea(data.employeeb, f.down("[name=employee_id]")).comboBox(true);
        // f.down("[name=projectpt_id]").setValue('999');
        f.down("[name=department_id]").setValue('999');
        f.down("[name=employee_id]").setValue('999');
       
        
        return;

        
      

    },
    
    getEmGrid: function() {
        return this.getForm().down("#employeeListGridID");
    },
    getReportTypeCombo: function() {
        return this.getForm().down("[name=report_type]");
    },
    cleannullinCombo: function (form, value) {
        // if (typeof (form.down("[name=projectpt_id]").getValue()) !== 'number') {
        //     value['projectpt_id'] = '0';
        // }
        if (typeof (form.down("[name=department_id]").getValue()) !== 'number') {
            value['department_id'] = '0';
        }
        if (typeof (form.down("[name=employee_id]").getValue()) !== 'number') {
            value['employee_id'] = '0';
        }
        if (!form.down("[name=start_date]").getValue()) {
            value['start_date'] = '1900-01-01';
        }
        if (!form.down("[name=end_date]").getValue()) {
            value['end_date'] = '3000-12-31';
        }
        return value;
    },
    exportData:function(){
        var me, url, formvalue, form;
        me = this;
        form = me.getForm();
        formvalue = me.getForm().getValues();
        formvalue = me.cleannullinCombo(form, formvalue);
        
        //added by anas 22062022 | CEK PERBEDAAN HARI UNTUK REPORT SURVEY KARENA MAX 31 HARI
        var diff = me.tools.diffDays(formvalue.start_date, formvalue.end_date);

        if(formvalue.report_type == "survey" && diff > 31)
        {
            me.tools.alert.info("Max export 31 days");
        }
        else
        {
            var p = me.getPanel();
            p.setLoading("Please wait");
            me.tools.ajax({
                params: {},
                params: {
                    data: Ext.encode(formvalue)
                },
                success: function (data, model) {
                    p.setLoading(false);
                    url = data['others'][1]['directdata'];
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
                }
            }).read('exportdata');     
        }   
     }
});