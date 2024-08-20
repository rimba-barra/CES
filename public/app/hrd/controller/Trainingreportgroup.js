Ext.define('Hrd.controller.Trainingreportgroup', {
    extend: 'Hrd.library.box.controller.ControllerReport',
    alias: 'controller.trainingreportgroup',
    controllerName: 'trainingreportgroup',
    bindPrefixName: 'Trainingreportgroup',
    dateNow: new Date(),
    ParamRender:null,
    otherParamsAT :{leave:0,sick:0,permission:0},
    init: function(application) {
        this.callParent(arguments);
        var newEvs = {};
        var me = this;
        newEvs['#TrainingReportGroupPanel #btnExport'] = {
            click: function(el, val) {
                this.exportData();       
            }
        };
        newEvs['#TrainingReportGroupPanel #fd_subholding'] = {
            change: this.getAllProject
        };
        newEvs['#TrainingReportGroupPanel #fd_project'] = {
            change: this.getAllPT
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
        var shId = reportData['params']['subholding_id'];
        // var departmentId = reportData['params']['department_id'];
        // var employeeId = reportData['params']['employee_id'];
        reportData['params']['start_date'] = me.tools.dateFunc(reportData['params']['start_date']).toYMD('-');
        reportData['params']['end_date'] = me.tools.dateFunc(reportData['params']['end_date']).toYMD('-');
        reportData['params']['start_date_text'] = me.tools.dateFunc(reportData['params']['start_date']).toDMY('-');
        reportData['params']['end_date_text'] = me.tools.dateFunc(reportData['params']['end_date']).toDMY('-');
        // reportData['params']['projectpt_id'] = projectptId==="999"?"0":projectptId;
        reportData['params']['subholding_id'] = shId==="999"?"0":shId;
        // reportData['params']['department_id'] = departmentId==="999"?"0":departmentId;
        // reportData['params']['employee_id'] = employeeId==="999"?"0":employeeId;
        

        return reportData;


    },
    
    zendInitLoaded: function(data) {
        var me = this;
        var f = me.getForm();
        
        // console.log(data);
        // me.tools.wesea(data.projectpt, f.down("[name=projectpt_id]")).comboBox(true);
        // me.tools.wesea(data.department, f.down("[name=department_id]")).comboBox(true);
        // me.tools.wesea(data.employeeb, f.down("[name=employee_id]")).comboBox(true);
        // f.down("[name=projectpt_id]").setValue('999');
        // f.down("[name=department_id]").setValue('999');
        // f.down("[name=employee_id]").setValue('999');


        // me.tools.wesea(data.trainingallsubholding, f.down("[name=subholding_id]")).comboBox(true);
        // f.down("[name=subholding_id]").setValue('999');
       
        
        var events = new Hrd.library.box.tools.EventSelector();
        me.tools = new Hrd.library.box.tools.Tools({config: me.myConfig});
        me.util = new Hrd.library.box.tools.Util();
        
        me.tools.ajax({
            params: {
                
            },
            success: function (data, model) {
                
                var subhData = [];
                for (var v in data) {
                    subhData.push(data[v].trainingallsubholding);
                }
                var subhStore = Ext.create('Ext.data.Store', {
                    fields: ['subholding_id', 'name'],
                    data: subhData
                });
                f.down("[name=subholding_id]").bindStore(subhStore);
            }
        }).read('getAllSubholding');

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
        // if (typeof (form.down("[name=subholding_id]").getValue()) !== 'number') {
        //     value['subholding_id'] = '0';
        // }
        // if (typeof (form.down("[name=department_id]").getValue()) !== 'number') {
        //     value['department_id'] = '0';
        // }
        // if (typeof (form.down("[name=employee_id]").getValue()) !== 'number') {
        //     value['employee_id'] = '0';
        // }
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

        var data = {
            subholding_id : formvalue['subholding_id'].join(),
            project_id : formvalue['project_id'].join(),
            pt_id : formvalue['pt_id'].join(),
            start_date : formvalue['start_date'],
            end_date : formvalue['end_date'],
            close : formvalue['close']
        };

        var p = me.getPanel();
        p.setLoading("Please wait");
        me.tools.ajax({
            params: {},
            params: {
                data: Ext.encode(data)
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
     },

     getAllProject: function (el) {

        var me = this;
        var events = new Hrd.library.box.tools.EventSelector();
        me.tools = new Hrd.library.box.tools.Tools({config: me.myConfig});
        me.util = new Hrd.library.box.tools.Util();
        var fs = me.getForm();
        fs.down("[name=project_id]").setValue("");
        fs.down("[name=pt_id]").setValue("");
        me.tools.ajax({
            params: {
                'subholding_id':fs.getValues().subholding_id.join()
            },
            success: function (data, model) {

                var newData = [];
                for (var v in data) {
                    newData.push(data[v].project);
                }
                var newStore = Ext.create('Ext.data.Store', {
                    fields: ['code', 'name'],
                    data: newData
                });
                fs.down("[name=project_id]").bindStore(newStore);                 
            }
        }).read('getAllProject');     
    },

    getAllPT: function (el) {

        var me = this;
        var events = new Hrd.library.box.tools.EventSelector();
        me.tools = new Hrd.library.box.tools.Tools({config: me.myConfig});
        me.util = new Hrd.library.box.tools.Util();
        var fs = me.getForm();
        fs.down("[name=pt_id]").setValue("");

        me.tools.ajax({
            params: {
                'subholding_id':fs.getValues().subholding_id.join(),                
                'project_id':fs.getValues().project_id.join()
            },
            success: function (data, model) {

                var newData = [];
                for (var v in data) {
                    newData.push(data[v].pt);
                }
                var newStore = Ext.create('Ext.data.Store', {
                    fields: ['code', 'name'],
                    data: newData
                });
                fs.down("[name=pt_id]").bindStore(newStore);
            }
        }).read('getAllPT');        
    },
});