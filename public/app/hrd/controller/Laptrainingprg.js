Ext.define('Hrd.controller.Laptrainingprg', {
    extend: 'Hrd.library.box.controller.ControllerReport',
    alias: 'controller.laptrainingprg',
    controllerName: 'laptrainingprg',
    bindPrefixName: 'Laptrainingprg',
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
        var groupTrainingId = reportData['params']['grouptraining_id'];
    //    reportData['params']['start_date'] = me.tools.dateFunc(reportData['params']['start_date']).toYMD('-');
       // reportData['params']['end_date'] = me.tools.dateFunc(reportData['params']['end_date']).toYMD('-');
     //   reportData['params']['start_date_text'] = me.tools.dateFunc(reportData['params']['start_date']).toDMY('/');
      //  reportData['params']['end_date_text'] = me.tools.dateFunc(reportData['params']['end_date']).toDMY('/');
        reportData['params']['grouptraining_id'] = groupTrainingId==="999"?"":groupTrainingId;
      
        switch (reportData['params']['report_type']) {
                 case 'program': reportData['file'] = 'HrdTrainingProgram';break;
        
     
        }

        console.log(reportData);

        return reportData;


    },
    
    zendInitLoaded: function(data) {
        var me = this;
        var f = me.getForm();
        
        console.log(data);
        if(data.grouptraining){
            me.tools.wesea(data.grouptraining, f.down("[name=grouptraining_id]")).comboBox(true);
        }
        
     //   me.tools.wesea(data.group, f.down("[name=group_id]")).comboBox(true);
        
        f.down("[name=grouptraining_id]").setValue('999');
       
        
        return;

        
      

    },
    
    getEmGrid: function() {
        return this.getForm().down("#employeeListGridID");
    },
    getReportTypeCombo: function() {
        return this.getForm().down("[name=report_type]");
    }
});