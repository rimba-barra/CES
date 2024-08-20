Ext.define('Hrd.controller.Lapuangkehadiran', {
    extend: 'Hrd.library.box.controller.ControllerReport',
    alias: 'controller.lapuangkehadiran',
    controllerName: 'lapuangkehadiran',
    bindPrefixName: 'Lapuangkehadiran',
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
        newEvs['#employeeDatasFormID #btnExport'] = {
            click: function(el, val) {
                this.exportData();       
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
        var alokasibiayaId = reportData['params']['alokasibiaya_id'];
        var departmentId = reportData['params']['department_id'];
        reportData['params']['start_date'] = me.tools.dateFunc(reportData['params']['start_date']).toYMD('-');
        reportData['params']['end_date'] = me.tools.dateFunc(reportData['params']['end_date']).toYMD('-');
        reportData['params']['start_date_text'] = me.tools.dateFunc(reportData['params']['start_date']).toDMY('/');
        reportData['params']['end_date_text'] = me.tools.dateFunc(reportData['params']['end_date']).toDMY('/');
     //   reportData['params']['start_date_text'] = me.tools.dateFunc(reportData['params']['start_date']).toDMY('/');
      //  reportData['params']['end_date_text'] = me.tools.dateFunc(reportData['params']['end_date']).toDMY('/');
         reportData['params']['department_id'] = departmentId==="999"?"0":departmentId;
         reportData['params']['alokasibiaya_id'] = alokasibiayaId==="999"?"0":alokasibiayaId;
         reportData['params']['per_type'] = alokasibiayaId==="999"?"0":alokasibiayaId;
        
       
       
        var per_type = me.getForm().down("[name=per_type]").getValue();
        switch (reportData['params']['report_type']) {
                 case 'daftar': 
                     if(per_type == true){
                        reportData['file'] = 'HrdUangKehadiran';
                     } else {
                        reportData['file'] = 'HrdUangKehadiranpt';                         
                     }
                     break;
             
     
        }

        //console.log(reportData);

        return reportData;


    },
    
    zendInitLoaded: function(data) {
        var me = this;
        var f = me.getForm();
        
        console.log(data);
        me.tools.wesea(data.alokasibiaya, f.down("[name=alokasibiaya_id]")).comboBox(true);
        me.tools.wesea(data.department, f.down("[name=department_id]")).comboBox(true);
       /* if(data.grouptraining){
            me.tools.wesea(data.grouptraining, f.down("[name=department_id]")).comboBox(true);
        }*/
        
     //   me.tools.wesea(data.group, f.down("[name=group_id]")).comboBox(true);
        
        f.down("[name=alokasibiaya_id]").setValue('999');
        f.down("[name=department_id]").setValue('999');
       
        
        return;

        
      

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
        if (typeof (form.down("[name=alokasibiaya_id]").getValue()) !== 'number') {
            value['alokasibiaya_id'] = '0';
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
        }).read('exportdata');        
     }
});