Ext.define('Hrd.controller.Overtimereport', {
    extend: 'Hrd.library.box.controller.ControllerReport',
    alias: 'controller.overtimereport',
    controllerName: 'overtimereport',
    bindPrefixName: 'Overtimereport',
    otherParamsAT :{leave:0,sick:0,permission:0},
    init: function(application) {
        this.callParent(arguments);
        var newEvs = {};
        var me = this;
        newEvs['#employeeDatasFormID [name=based]'] = {
            select: function(el, val) {
                me.changeFilterFields(el, val);
            }
        };
        newEvs['#employeeDatasFormID #searchButtonID'] = {
            click: function(el, val) {
                me.searchEmpClick(el);
            }
        };
        //searchButtonID
        console.log(me.controllerName);

        this.control(newEvs);
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
        reportData['params']['start_date'] = me.tools.dateFunc(reportData['params']['start_date']).toYMD('-');
        reportData['params']['end_date'] = me.tools.dateFunc(reportData['params']['end_date']).toYMD('-');
        reportData['params']['start_date_text'] = me.tools.dateFunc(reportData['params']['start_date']).toDMY('/');
        reportData['params']['end_date_text'] = me.tools.dateFunc(reportData['params']['end_date']).toDMY('/');
        reportData['params']['department_id'] = departmentId==="999"?"":departmentId;
      
        switch (reportData['params']['report_type']) {
            case 'transaksi': reportData['file'] = 'HrdLemburTransaksi';break;
            case 'rekap_jam': reportData['file'] = 'HrdLemburRekap';break;
          //  case 'format_d': reportData['file'] = 'HrdAbsentFormatD';break;
         //   case 'terlambat': reportData['file'] = 'HrdAbsentTerlambat';break;
        }


        return reportData;


    },
    
    zendInitLoaded: function(data) {
        var me = this;
        var f = me.getForm();
        
        console.log(data);
        me.tools.wesea(data.department, f.down("[name=department_id]")).comboBox(true);
        me.tools.wesea(data.group, f.down("[name=group_id]")).comboBox(true);
        
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
    }
});