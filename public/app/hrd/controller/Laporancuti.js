Ext.define('Hrd.controller.Laporancuti', {
    extend: 'Hrd.library.box.controller.ControllerReport',
    alias: 'controller.laporancuti',
    controllerName: 'laporancuti',
    bindPrefixName: 'Laporancuti',
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
        
        //update by anas 06112023 | employeeDatasFormID jadi laporancutipanel biar ke filter employeenya
        newEvs['#laporancutipanel [name=department_id]'] = {
            select: function(el, val) {
                me.filterEmployeey(el);
            }
        };
        
        newEvs['#employeeDatasFormID [name=group_id]'] = {
            select: function(el, val) {
                me.filterEmployeey(el);
            }
        };
        //searchButtonID


        //added by anas 06112023 | untuk menampilkan dropdown department / kelompokabsensi
        newEvs['laporancutipanel [name=pilihan_filter]'] = {
            change: function (el) {        
                var fs = me.getForm();        
                var vs = fs.getValues();   
                var pilihan_filter = vs["pilihan_filter"];
                if(pilihan_filter == 'Department'){
                    
                    fs.down("[name=department_id]").show();     
                    fs.down("[name=department_id]").setValue('999');   
                    
                    fs.down("[name=kelompokabsensi_id]").hide(); 
                    fs.down("[name=kelompokabsensi_id]").setValue();  
                } else {
                    fs.down("[name=kelompokabsensi_id]").show();   
                    fs.down("[name=kelompokabsensi_id]").setValue('999'); 

                    fs.down("[name=department_id]").hide(); 
                    fs.down("[name=department_id]").setValue(); 
                }
            }
        };
        //end added by anas
      

        this.control(newEvs);
    },
    filterEmployeey:function(){
       var me = this;
       var f = me.getForm();
       var dv = me.tools.intval(f.down("[name=department_id]").getValue());
       var gv = me.tools.intval(f.down("[name=group_id]").getValue());
       var es = f.down("[name=employee_id]").getStore();
       dv = dv===999?0:dv;
       gv = gv===999?0:gv;
       
       console.log(gv);
       
     
       
       es.clearFilter();

        
        /// filter hanya per department saja
        if (es.getCount() > 0 && dv > 0 && gv===0) {

            //f.down("[name=absenttype_absenttype_id]").setValue(false);
            es.filterBy(function(rec, id) {
                
                if (rec.raw.department_department_id === dv) {
                    return true;
                }
                else {
                    return false;
                }
            });
        }
        
        /// filter untuk department dan golongan 
        
        if (es.getCount() > 0 && dv > 0 && gv > 0) {

            //f.down("[name=absenttype_absenttype_id]").setValue(false);
            es.filterBy(function(rec, id) {
                
                if (rec.raw.department_department_id === dv
                        && rec.raw.group_group_id === gv) {
                    return true;
                }
                else {
                    return false;
                }
            });
        }
        
        /// filter untuk golongan saja
        
        if (es.getCount() > 0 && dv===0 && gv > 0) {

            //f.down("[name=absenttype_absenttype_id]").setValue(false);
            es.filterBy(function(rec, id) {
                
                if (rec.raw.group_group_id === gv) {
                    return true;
                }
                else {
                    return false;
                }
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
        
        //added by anas 06112023
        var kelompokabsensi_id = reportData['params']['kelompokabsensi_id'];
        reportData['params']['kelompokabsensi_id'] = kelompokabsensi_id==="999"?"":kelompokabsensi_id;
        //end added by anas


        switch (reportData['params']['report_type']) {
            case 'hak': reportData['file'] = 'HrdCutiHak';break;
            case 'transaksi': reportData['file'] = 'HrdCutiTransaksi';break;
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
        me.tools.wesea(data.employeeb, f.down("[name=employee_id]")).comboBox();
        f.down("[name=department_id]").setValue('999');
        f.down("[name=group_id]").setValue('999');
        
        //added by anas 02112023
        me.tools.wesea(data.kelompokabsensi, f.down("[name=kelompokabsensi_id]")).comboBox(true);
        f.down("[name=kelompokabsensi_id]").setValue('999');
        //end added by anas


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