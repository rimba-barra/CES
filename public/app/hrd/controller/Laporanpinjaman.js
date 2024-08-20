Ext.define('Hrd.controller.Laporanpinjaman', {
    extend: 'Hrd.library.box.controller.ControllerReport',
    alias: 'controller.laporanpinjaman',
    controllerName: 'laporanpinjaman',
    bindPrefixName: 'Laporanpinjaman',
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

        var year = 0;
        var month = 0;
        var date = reportData['params']['date'];
        if(date){
            date = date.split("/");
            year = me.tools.intval(date[1]);
            month = me.tools.intval(date[0]);
        }
     
        
        
       
        var sd = new Date(reportData['params']['start_date']);
        var departmentId = reportData['params']['department_id'];
      //  reportData['params']['start_date'] = me.tools.dateFunc(reportData['params']['start_date']).toYMD('-');
       // reportData['params']['end_date'] = me.tools.dateFunc(reportData['params']['end_date']).toYMD('-');
     //   reportData['params']['start_date_text'] = me.tools.dateFunc(reportData['params']['start_date']).toDMY('/');
      //  reportData['params']['end_date_text'] = me.tools.dateFunc(reportData['params']['end_date']).toDMY('/');
        reportData['params']['department_id'] = departmentId==="999"?"0":departmentId;
        reportData['params']['year'] = year;
        reportData['params']['month'] = month;
        
       
       
       console.log(reportData);
        switch (reportData['params']['report_type']) {
                 case 'histori': reportData['file'] = 'HrdPinjamanHistori';break;
                     case 'daftar': reportData['file'] = 'HrdPinjamanDaftar';break;
             
     
        }

        console.log(reportData);

        return reportData;


    },
    
    zendInitLoaded: function(data) {
        var me = this;
        var f = me.getForm();
        
        console.log(data);
      //  me.tools.wesea(data.department, f.down("[name=department_id]")).comboBox(true);
       /* if(data.grouptraining){
            me.tools.wesea(data.grouptraining, f.down("[name=department_id]")).comboBox(true);
        }*/
        
     //   me.tools.wesea(data.group, f.down("[name=group_id]")).comboBox(true);
        
        var date = new Date();
        
        f.down("[name=date]").setValue((date.getMonth()+1)+'/'+date.getFullYear());
       
        
        return;

        
      

    },
    
    getEmGrid: function() {
        return this.getForm().down("#employeeListGridID");
    },
    getReportTypeCombo: function() {
        return this.getForm().down("[name=report_type]");
    }
});