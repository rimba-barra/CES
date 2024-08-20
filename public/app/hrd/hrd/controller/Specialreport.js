Ext.define('Hrd.controller.Specialreport', {
    extend: 'Hrd.library.box.controller.ControllerReport',
    alias: 'controller.specialreport',
    controllerName: 'specialreport',
    bindPrefixName: 'Specialreport',
    otherParamsAT: {leave: 0, sick: 0, permission: 0, 
        employeeStatus: {
            nonDaily:null,
            daily:null
        }},
    init: function(application) {
        this.callParent(arguments);
        var newEvs = {};
        var me = this;
        newEvs['#specialReportFormID [name=report_type]'] = {
            select: function(el, val) {
                me.changeFilterFields(el, val);
            }
        };
        newEvs['#specialReportFormID #searchButtonID'] = {
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
        me.hideAllFilters();

        // container.down("#dateContainer").show();

        switch (id) {
            case 1: /// department


                container.down("[name=department_id]").show();
                break;
             case 2: /// grade


                container.down("[name=grade_id]").show();
                break;
            case 3: /// position

                container.down("[name=position_id]").show();

                break;
            case 5: /// religion
                container.down("[name=religion_id]").show();
                break;
            case 6: /// 

                container.down("[name=bloodgroup_id]").show();

                break;
            case 9: /// 

                container.down("#maritalStatusID").show();

                break;
           case 10: /// 

                container.down("#ageID").show();

                break;
            case 11: /// 

                container.down("[name=month]").show();

                break;
            case 12: /// 

                container.down("#expDateID").show();

                break;
           //
        }
        
        /// fwdr 
        for(var i in me.fwDetailRekap){
            if(id === me.fwDetailRekap[i]['filterId']){
                container.down("[name="+me.fwDetailRekap[i]['field']+"]").show();
            }
        }
        
        

    },
    fwDetailRekap:[
        {
            name:'education',
            varName:'Education',
            varNameR:'Education',
            field:'education_id',
            dynamicStore:true,
            filterId:7
            
        },
        {
            name:'gender',
            varName:'Gender',
            varNameR:'Gender',
            field:'gender_id',
            dynamicStore:false,
            filterId:8
            
        }
    ],
    showEmployeeFilter: function(container) {
        var me = this;
        container.down("[name=employee_name]").show();
        me.getEmGrid().show();
        container.down("#searchButtonID").show();
    },
    /* must override */
    processParams: function(reportData) {
        var me = this;



        var selectedReportType = me.getReportTypeCombo().getValue();
        reportData['params']['employeeStatus'] = reportData['params']["status"]==="P"?me.otherParamsAT.employeeStatus.nonDaily:me.otherParamsAT.employeeStatus.daily;
        
        switch (selectedReportType) {
            case 1: /// department
                reportData = me.pfDepartment(reportData);
                break;
            case 2: /// grade
                reportData = me.pfGrade(reportData);
                break;
             case 3: /// grade
                reportData = me.pfPosition(reportData);
                break;
            case 5: 
                reportData = me.pfReligion(reportData);
                break;
            case 6: 
                reportData = me.pfBloodGroup(reportData);
                break;
            case 9: 
                reportData = me.pfMaritalStatus(reportData);
                break;
            case 10: 
                reportData = me.pfAge(reportData);
                break;
            case 11: 
                reportData = me.pfBirthDate(reportData);
                break;
            case 12: 
                reportData = me.pfExp(reportData);
                break;
        }
        
        /// fwdr 
        for(var i in me.fwDetailRekap){
            if(selectedReportType === me.fwDetailRekap[i]['filterId']){
                reportData = me.pfInstant(reportData,me.fwDetailRekap[i]['varNameR'],this.comboBoxFields[me.fwDetailRekap[i]['name']]);
            }
        }
        


        return reportData;


    },
    pfExp:function(reportData){
        var me = this;
        var f = me.getForm();
      
        var vs = f.getForm().getValues();
        var fr = vs.format;
        var d = new Date(f.down("[name=start_date]").getValue());
        var d2 = new Date(f.down("[name=end_date]").getValue());
        //var store = el.getStore();
        reportData['file'] = fr==="R"?"HrdEmployeeRekapByExperience":"HrdEmployeeListByExperience";
        if(fr != "R"){
           // reportData['params']["MonthName"] = store.getAt(store.findExact('number',el.getValue())).get("name");
            reportData['params']["start_date"] = vs.start_date;
            reportData['params']["end_date"] = vs.end_date;
        }
        console.log(vs);
        return reportData;
    },
    pfBirthDate:function(reportData){
        var me = this;
        var f = me.getForm();
      
        var vs = f.getForm().getValues();
        var fr = vs.format;
        var el = f.down("[name=month]");
        var store = el.getStore();
        reportData['file'] = fr==="R"?"HrdEmployeeRekapByBirthdate":"HrdEmployeeListByBirthdate";
        if(fr != "R"){
            reportData['params']["MonthName"] = store.getAt(store.findExact('number',el.getValue())).get("name");
            
        }
        return reportData;
    },
    pfMaritalStatus: function(reportData) {
        var me = this;
        var f = me.getForm();
      
        var vs = f.getForm().getValues();
        var fr = vs.format;
       
        reportData['file'] = fr==="R"?"HrdEmployeeRekapByMarriageStatus":"HrdEmployeeListByMarriageStatus";
        if(fr != "R"){
            var items = f.down("#maritalStatusID").items.items;
            for(var i in items){
                if(items[i].inputValue==vs.marriagestatus_id){
                  
                    reportData['params']["MaritalStatusName"] = items[i].boxLabel;
                }
            }
       
        }
        return reportData;
    },
    pfAge: function(reportData) {
        var me = this;
        var f = me.getForm();
      
        var vs = f.getForm().getValues();
        var fr = vs.format;
       
        reportData['file'] = fr==="R"?"HrdEmployeeRekapByAge":"HrdEmployeeListByAge";
        if(fr != "R"){
        
            
       
        }
     
        return reportData;
    },
            //
    pfInstant:function(reportData,title,cbf){
         var me = this;
        var f = me.getForm();
      
        var vs = f.getForm().getValues();
        var fr = vs.format;
       
        reportData['file'] = fr==="R"?"HrdEmployeeRekapBy"+title:"HrdEmployeeListBy"+title;
        if(fr != "R"){
           reportData['params'][title+'Name'] = me.tools.comboHelper(f.down("[name="+cbf.v+"]")).getText(cbf);
           if(parseInt(reportData['params'][cbf.v])===999){
               reportData['params'][cbf.v] = '';
           }
        
        }
       
        return reportData;
    },
    pfBloodGroup: function(reportData) {
        return this.pfInstant(reportData,'BloodGroup',this.comboBoxFields.bloodGroup);
    },
    pfPosition: function(reportData) {
        var me = this;
        var f = me.getForm();
      
        var vs = f.getForm().getValues();
        var fr = vs.format;
       
        reportData['file'] = fr==="R"?"HrdEmployeeRekapByPosition":"HrdEmployeeListByPosition";
        if(fr != "R"){
           reportData['params']['PositionName'] = me.tools.comboHelper(f.down("[name=position_id]")).getText(me.comboBoxFields.position);
           if(parseInt(reportData['params']['position_id'])===999){
               reportData['params']['position_id'] = '';
           }
        
        }
       
        return reportData;
    },  
    pfGrade: function(reportData) {
        var me = this;
        var f = me.getForm();
      
        var vs = f.getForm().getValues();
        var fr = vs.format;
       
        reportData['file'] = fr==="R"?"HrdEmployeeRekapByGrade":"HrdEmployeeListByGrade";
        if(fr != "R"){
           reportData['params']['GradeName'] = me.tools.comboHelper(f.down("[name=grade_id]")).getText(me.comboBoxFields.category);
           if(parseInt(reportData['params']['grade_id'])===999){
               reportData['params']['grade_id'] = '';
           }
        
        }
       
        return reportData;
    },        
    
    pfDepartment: function(reportData) {
        var me = this;
        var f = me.getForm();
      
        var vs = f.getForm().getValues();
        var fr = vs.format;
       
        reportData['file'] = fr==="R"?"HrdEmployeeRekapByDepartment":"HrdEmployeeListByDepartment";
        if(fr != "R"){
           reportData['params']['DepartmentName'] = me.tools.comboHelper(f.down("[name=department_id]")).getText(me.comboBoxFields.department);
            
  
        }
       
        return reportData;
    },
    pfReligion: function(reportData) {
        var me = this;
        var f = me.getForm();
      
        var vs = f.getForm().getValues();
        var fr = vs.format;
        reportData['file'] = fr==="R"?"HrdEmployeeRekapByReligion":"HrdEmployeeListByReligion";
        if(fr != "R"){
           reportData['params']['ReligionName'] = me.tools.comboHelper(f.down("[name=religion_id]")).getText(me.comboBoxFields.religion);
           
        }
       
        return reportData;
    },
    zendInitLoaded: function(data) {
        var me = this;
        var f = me.getForm();



        //  f.down("[name=department_id]").refreshMyStore(data.department);
       // me.tools.wesea(data.department, f.down("#departmentCheckBoxID")).checkBox();
        // me.tools.wesea(data.group, f.down("#categoryCheckBoxID")).checkBox();

        me.tools.wesea(data.division, f.down("[name=division_id]")).comboBox();
        me.tools.wesea(data.department, f.down("[name=department_id]")).comboBox();
        me.tools.wesea(data.religion, f.down("[name=religion_id]")).comboBox();
        
         me.tools.wesea(data.position, f.down("[name=position_id]")).comboBox();
          me.tools.wesea(data.bloodgroup, f.down("[name=bloodgroup_id]")).comboBox();
        f.down("[name=division_id]").setValue('999');
        
        
        /// fwdr 
        for(var i in me.fwDetailRekap){
            if(me.fwDetailRekap[i]['dynamicStore']===true){
                      me.tools.wesea(data[me.fwDetailRekap[i]['name']], f.down("[name="+me.fwDetailRekap[i]['field']+"]")).comboBox();          
                  }
        }

        var othersAT = data.others[0][0];

        me.otherParamsAT.sick = othersAT["AT_SICK"];
        me.otherParamsAT.leave = othersAT["AT_LEAVE"];
        me.otherParamsAT.permission = othersAT["AT_PERMISSION"];
        me.otherParamsAT.employeeStatus.daily = othersAT["DAILY_STATUS"]["key"];
        me.otherParamsAT.employeeStatus.nonDaily = othersAT["NONDAILY_STATUS"]["key"];
       
        var esEl = f.down("[name=grade_id]");
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