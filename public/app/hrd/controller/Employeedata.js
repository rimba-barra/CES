Ext.define('Hrd.controller.Employeedata', {
    extend: 'Hrd.library.box.controller.ControllerReport',
    alias: 'controller.employeedata',
    controllerName: 'employeedata',
    bindPrefixName: 'Employeedata',
    otherParamsAT: {leave: 0, sick: 0, permission: 0},
    refs: [
        {
            ref: 'gridem',
            selector: 'employeedataemployeegrid'
        }
    ],
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

        newEvs['#employeeDatasFormID [name=department_id]'] = {
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
        //    reportData['params']['start_date'] = me.tools.dateFunc(reportData['params']['start_date']).toYMD('-');
        // reportData['params']['end_date'] = me.tools.dateFunc(reportData['params']['end_date']).toYMD('-');
        //   reportData['params']['start_date_text'] = me.tools.dateFunc(reportData['params']['start_date']).toDMY('/');
        //  reportData['params']['end_date_text'] = me.tools.dateFunc(reportData['params']['end_date']).toDMY('/');
        reportData['params']['department_id'] = departmentId === "999" ? "" : departmentId;
        reportData['params']['employeestatus_id'] = status === "999" ? "" : status;
        reportData['params']['employee_id'] = reportData['params']['employee_id'] === "999" ? "" : reportData['params']['employee_id'];



        switch (reportData['params']['report_type']) {
            case '1':
                reportData['file'] = 'EmployeeList';
                break;
            case '2':
                reportData['file'] = 'HrdPersonalList';
                break;
            case '3':
                reportData['file'] = 'HrdFamilyList';
                break;
            case '4':
                reportData['file'] = 'HrdPotency';
                break;
            case '5':
                reportData['file'] = 'HrdDaftarKaryawanRiwayatKerja';
                break;
            case '6':
                reportData['file'] = 'HrdDaftarKaryawanRiwayatKursus';
                break;
            case '7':
                reportData['file'] = 'HrdTrainingProgram';
                break;
            case '8':
                reportData['file'] = 'HrdTrainingProgram';
                break;
            case '9':
                reportData['file'] = 'HrdTrainingProgram';
                break;
            case '10':
                reportData['file'] = 'HrdTrainingProgram';
                break;
            case '11':
                reportData['file'] = 'HrdTrainingProgram';
                break;
            case '12':
                reportData['file'] = 'HrdTrainingProgram';
                break;
            case '13':
                reportData['file'] = 'HrdTrainingProgram';
                break;
            case '14':
                reportData['file'] = 'HrdTrainingProgram';
                break;
            case '15':
                reportData['file'] = 'HrdTrainingProgram';
                break;


        }

        console.log(reportData);

        return reportData;


    },
    zendInitLoaded: function(data) {
        var me = this;
        var f = me.getForm();

        console.log(data);
        if (data.department) {
            me.tools.wesea(data.department, f.down("[name=department_id]")).comboBox(true);
        }

        me.tools.wesea(data.employeeb, f.down("[name=employee_id]")).comboBox(true);


        /*
         var ge = f.down("employeedataemployeegrid");
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