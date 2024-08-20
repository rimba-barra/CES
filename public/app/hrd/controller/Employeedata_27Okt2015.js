Ext.define('Hrd.controller.Employeedata', {
    extend: 'Hrd.library.box.controller.ControllerReport',
    alias: 'controller.employeedata',
    controllerName: 'employeedata',
    bindPrefixName: 'Employeedata',
    otherParams: {spouse: 0, child: 0, saudara: 0, friend: 0, father: 0, mother: 0},
 
    init: function(application) {
        this.callParent(arguments);
        var newEvs = {};
        var me = this;
        newEvs['#employeeDataFormID [name=report_type]'] = {
            select: function(el, val) {
                me.changeFilterFields(el, val);
            }
        };
        newEvs['#employeeDataFormID #searchButtonID'] = {
            click: function(el, val) {
                me.searchEmpClick(el);
            }
        };
        //searchButtonID


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
        var items = container.items.items;
        for (var i in items) {
            items[i].hide();
        }
        switch (id) {
            case 1: /// daftar
                container.down("#departmentCheckBoxID").show();
                container.down("#filterActiveID").show();
                container.down("[name=employeestatus_id]").show();
                break;

            case 2: /// data pribadi
                me.showEmployeeFilter(container);
                break;
            case 3: /// data keluarga
                me.showEmployeeFilter(container);
                break;
            case 4: /// data potency
                me.showEmployeeFilter(container);
                break;
            case 7: /// data pribadi
                container.down("[name=department_id2]").show();
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



        var selectedReportType = me.getReportTypeCombo().getValue();

        switch (selectedReportType) {
            case 1: /// all employee
                reportData = me.pfAllEmployee(reportData);
                break;
            case 2:
                reportData = me.pfPersonalData(reportData);
                break;
            case 3:
                reportData = me.pfFamilyData(reportData);
                break;
            case 4:
                reportData = me.pfPotencyData(reportData);
                break;
            case 7:
                reportData = me.pfListByDepartment(reportData);
                break;
        }


        return reportData;


    },
    pfPotencyData: function(reportData) {
        var me = this;
        reportData['file'] = "HrdPotency";
        /// selected in grid
        var row = me.getEmGrid().getSelectionModel().getSelection()[0];
        if (row) {
            console.log(row.data);
            reportData['params']['EmployeeNik'] = row.data.employee_nik;
            reportData['params']['EmployeeName'] = row.data.employee_name;
            reportData['params']['EmployeeId'] = row.data.employee_id;
            reportData['params']['RelationTypeSpouse'] = me.otherParams.spouse;
            //RelationTypeSpouse
        }


        return reportData;
    },
    pfPersonalData: function(reportData) {
        var me = this;
        reportData['file'] = "HrdPersonalList";
        /// selected in grid
        var row = me.getEmGrid().getSelectionModel().getSelection()[0];
        if (row) {
            reportData['params']['EmployeeId'] = row.data.employee_id;
            reportData['params']['RelationTypeSpouse'] = me.otherParams.spouse;
            //RelationTypeSpouse
        }


        return reportData;
    },
    pfFamilyData: function(reportData) {
        var me = this;
        reportData['file'] = "HrdFamilyList";
        /// selected in grid
        var row = me.getEmGrid().getSelectionModel().getSelection()[0];
        if (row) {
            reportData['params']['EmployeeId'] = row.data.employee_id;
            reportData['params']['RelationTypeSaudara'] = me.otherParams.saudara;
            reportData['params']['RelationTypeSpouse'] = me.otherParams.spouse;
            reportData['params']['RelationTypeChild'] = me.otherParams.child;
            reportData['params']['RelationTypeMother'] = me.otherParams.mother;
            reportData['params']['RelationTypeFather'] = me.otherParams.father;
            //RelationTypeSpouse
        }


        return reportData;
    },
    pfListByDepartment: function(reportData) {
        var me = this;
        reportData['file'] = "HrdListByDepartment";

        var f = me.getForm();
        /// create department string 
        var vs = f.getForm().getValues();
        var n = "department_id2";
        var dele = f.down("[name=" + n + "]");
        var delStore = dele.getStore();
        var str = '';
        var cf = me.comboBoxFields;
        var departmentId = vs[n];
        if (departmentId) {
            reportData['params']['DepartmentName'] = delStore.getAt(delStore.findExact(cf.department.v, departmentId)).get(cf.department.d);
            reportData['params']['DepartmentId'] = departmentId;

        }




        return reportData;
    },
    pfAllEmployee: function(reportData) {
        var me = this;
        var reportType = '';
        var fn = "EmployeeList";




        var f = me.getForm();

        /// create department string 
        var vs = f.getForm().getValues();
        var str = '';
        if (vs.department_id) {
            if (typeof vs.department_id === 'number') {
                str = vs.department_id;
            } else {
                for (var d in vs.department_id) {
                    str += vs.department_id[d] + '~';
                }
            }

        }


        /// check employee status text
        var esel = f.down("[name=employeestatus_id]");
        var indexEsel = esel.getStore().findExact(esel.valueField, esel.getValue());
        var esName = esel.getStore().getAt(indexEsel).get(esel.displayField);

        if (reportData['params']['employeestatus_id'] === '999') {
            reportData['params']['employeestatus_id'] = '';
        }

        reportData['params']['EmployeeStatus'] = esName;
        reportData['params']['department_id'] = str;
        reportData['file'] = fn;
        return reportData;
    },
    zendInitLoaded: function(data) {
        var me = this;
        var f = me.getForm();

        //  f.down("[name=department_id]").refreshMyStore(data.department);
        me.tools.wesea(data.department, f.down("#departmentCheckBoxID")).checkBox();
        var others = data.others[0][0];
        
        me.otherParams.spouse = others["RT_SPOUSE"];
        me.otherParams.child = others["RT_CHILD"];
        me.otherParams.father = others["RT_FATHER"];
        me.otherParams.mother = others["RT_MOTHER"];
        me.otherParams.saudara = others["RT_SAUDARA"];
        me.otherParams.friend = others["RT_FRIEND"];
        
      
        
        var esEl = f.down("[name=employeestatus_id]");
        me.tools.wesea(data.employeestatus, esEl).comboBox();
        me.tools.wesea(data.department, f.down("[name=department_id2]")).comboBox();
        esEl.setValue('999');
        // f.down("[name=employeestatus_id]").refreshMyStore(data.employeestatus);
        me.hideAllFilters();
    },
  
    getEmGrid: function() {
        return this.getForm().down("#employeeListGridID");
    },
    getReportTypeCombo: function() {
        return this.getForm().down("[name=report_type]");
    }
});