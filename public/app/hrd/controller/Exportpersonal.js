Ext.define('Hrd.controller.Exportpersonal', {
    extend: 'Hrd.library.box.controller.ControllerReport',
    alias: 'controller.exportpersonal',
    controllerName: 'exportpersonal',
    bindPrefixName: 'Exportpersonal',
    otherParamsAT :{leave:0,sick:0,permission:0},
    init: function(application) {
        this.callParent(arguments);
        var newEvs = {};
        var me = this;
        newEvs['#ExportpersonalFormID [name=based]'] = {
            select: function(el, val) {
                me.changeFilterFields(el, val);
            }
        };
        newEvs['#ExportpersonalFormID #searchButtonID'] = {
            click: function(el, val) {
                me.searchEmpClick();
            }
        };
        
        newEvs['#ExportpersonalFormID [name=department_id]'] = {
            select: function(el, val) {
                me.filterEmployeey();
            }
        };
        
        newEvs['#ExportpersonalFormID [name=group_id]'] = {
            select: function(el, val) {
                me.filterEmployeey();
            }
        };        
        
        newEvs['#ExportpersonalFormID button[action=export]'] = {
            click: function (el, val) {
                this.exportData();                
                
            }
        };
        //searchButtonID
      

        this.control(newEvs);
    },
    filterEmployeey:function(){
        
       var me = this;
       var f = me.getForm();
       var dv = me.tools.intval(f.down("[name=department_id]").getValue());
       var gv = me.tools.intval(f.down("[name=group_id]").getValue());
       var es = f.down("[name=employee_id]").getStore();
       if(es.getCount() == 0){
           es.reload();
       }
       dv = dv===999?0:dv;
       gv = gv===999?0:gv;
       
       console.log(gv + ' dv ' + dv);
             
        // kadang filter ga applied, jadi pakai ini
        f.down("[name=employee_id]").onTriggerClick();
        f.down("[name=employee_id]").collapse();

       es.clearFilter();

        
        /// filter hanya per department saja
        if (es.getCount() > 0 && dv > 0 && gv===0) {           
            es.filterBy(function(rec, id) {
                return parseInt(rec.raw.department_department_id) === parseInt(dv);
            });
        }
        
        /// filter untuk department dan golongan         
        if (es.getCount() > 0 && dv > 0 && gv > 0) {
            es.filterBy(function(rec, id) {                
                   return parseInt(rec.raw.department_department_id) === parseInt(dv) && parseInt(rec.raw.group_group_id) === parseInt(gv);
            });
        }
        
        /// filter untuk golongan saja        
        if (es.getCount() > 0 && dv===0 && gv > 0) {
            es.filterBy(function(rec, id) {                
                return parseInt(rec.raw.group_group_id) === parseInt(gv);
            });
        }        
    },
    groupOnSelect:function(){
       var me = this;
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
        var me =this;
        container.down("[name=employee_name]").show();
        me.getEmGrid().show();
        container.down("#searchButtonID").show();
    },
    /* must override */
    processParams: function(reportData) {
        var me = this;


       
        var sd = new Date(reportData['params']['start_date']);
        var departmentId = reportData['params']['department_id'];
        var groupId = reportData['params']['group_id'];
        reportData['params']['start_date'] = me.tools.dateFunc(reportData['params']['start_date']).toYMD('-');
        reportData['params']['end_date'] = me.tools.dateFunc(reportData['params']['end_date']).toYMD('-');
        reportData['params']['start_date_text'] = me.tools.dateFunc(reportData['params']['start_date']).toDMY('/');
        reportData['params']['end_date_text'] = me.tools.dateFunc(reportData['params']['end_date']).toDMY('/');
        reportData['params']['department_id'] = departmentId==="999"?"":departmentId;
        reportData['params']['group_id'] = groupId==="999"?"":groupId;
    
        switch (reportData['params']['report_type']) {
            case 'personal': reportData['file'] = 'Personal';break;
        }

     
        return reportData;


    },
    
    zendInitLoaded: function(data) { // pertama load ini di jalankan
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
    
    getEmGrid: function() {
        return this.getForm().down("#employeeListGridID");
    },
    getReportTypeCombo: function() {
        return this.getForm().down("[name=report_type]");
    },
    cleannullinCombo: function (form, value) {
        if (typeof (form.down("[name=department_id]").getValue()) !== 'number') {
            value['department_id'] = '0';
        }
        if (typeof (form.down("[name=group_id]").getValue()) !== 'number') {
            value['group_id'] = '0';
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
        }).read('exportpersonal');        
     }
});