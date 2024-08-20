Ext.define('Hrd.controller.Specialreport', {
    extend: 'Hrd.library.box.controller.ControllerReport',
    alias: 'controller.specialreport',
    controllerName: 'specialreport',
    bindPrefixName: 'Specialreport',
    otherParamsAT: {leave: 0, sick: 0, permission: 0,
        employeeStatus: {
            nonDaily: null,
            daily: null
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
        newEvs['#specialReportFormID #departmentContID button[action=all]'] = {
            click: function(el, val) { me.selectAllNONECBG(el, 1);}
        };
        newEvs['#specialReportFormID #departmentContID button[action=none]'] = {
            click: function(el, val) { me.selectAllNONECBG(el, 0);}
        };
        newEvs['#specialReportFormID #groupContID button[action=all]'] = {
            click: function(el, val) { me.selectAllNONECBG(el, 1);}
        };
        newEvs['#specialReportFormID #groupContID button[action=none]'] = {
            click: function(el, val) { me.selectAllNONECBG(el, 0);}
        };
        newEvs['#specialReportFormID #positionContID button[action=all]'] = {
            click: function(el, val) { me.selectAllNONECBG(el, 1);}
        };
        newEvs['#specialReportFormID #positionContID button[action=none]'] = {
            click: function(el, val) { me.selectAllNONECBG(el, 0);}
        };
        newEvs['#specialReportFormID #grouppositionContID button[action=all]'] = {
            click: function(el, val) { me.selectAllNONECBG(el, 1);}
        };
        newEvs['#specialReportFormID #grouppositionContID button[action=none]'] = {
            click: function(el, val) { me.selectAllNONECBG(el, 0);}
        };
        newEvs['#specialReportFormID #religionContID button[action=all]'] = {
            click: function(el, val) { me.selectAllNONECBG(el, 1);}
        };
        newEvs['#specialReportFormID #religionContID button[action=none]'] = {
            click: function(el, val) { me.selectAllNONECBG(el, 0);}
        };
        newEvs['#specialReportFormID #bloodgroupContID button[action=all]'] = {
            click: function(el, val) { me.selectAllNONECBG(el, 1);}
        };
        newEvs['#specialReportFormID #bloodgroupContID button[action=none]'] = {
            click: function(el, val) { me.selectAllNONECBG(el, 0);}
        };
        newEvs['#specialReportFormID #monthContID button[action=all]'] = {
            click: function(el, val) { me.selectAllNONECBG(el, 1);}
        };
        newEvs['#specialReportFormID #monthContID button[action=none]'] = {
            click: function(el, val) { me.selectAllNONECBG(el, 0);}
        };
        newEvs['#specialReportFormID #educationContID button[action=all]'] = {
            click: function(el, val) { me.selectAllNONECBG(el, 1);}
        };
        newEvs['#specialReportFormID #educationContID button[action=none]'] = {
            click: function(el, val) { me.selectAllNONECBG(el, 0);}
        };
        newEvs['#specialReportFormID #genderContID button[action=all]'] = {
            click: function(el, val) { me.selectAllNONECBG(el, 1);}
        };
        newEvs['#specialReportFormID #genderContID button[action=none]'] = {
            click: function(el, val) { me.selectAllNONECBG(el, 0);}
        };


        this.control(newEvs);
    },
    selectAllNONECBG: function(el, checked) {
        var group = el.up('container').up('container').down("checkboxgroup");
        console.log(group);
        for(var i in group.items.items){
            group.items.items[i].setValue(checked);
        }
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
        me.getForm().down("[name=active]").setValue("1");
        

        switch (id) {
            case 1: /// department


               // container.down("[name=department_id]").show();
                container.down("#departmentContID").show();
                break;
            case 2: /// grade


                //container.down("[name=grade_id]").show();
                container.down("#groupContID").show();
                break;
            case 3: /// position

                container.down("#positionContID").show();

                break;
            case 4:
                container.down("#grouppositionContID").show();

                break;
            case 5: /// religion
                //container.down("[name=religion_id]").show();
                container.down("#religionContID").show();
                break;
            case 6: /// 

                //container.down("[name=bloodgroup_id]").show();
                container.down("#bloodgroupContID").show();
                break;
            case 7: /// 

                container.down("#educationContID").show();

                break;
            case 8: /// 

                container.down("#genderContID").show();

                break;
            case 9: /// 

                container.down("#maritalStatusID").show();

                break;
            case 10: /// 

                container.down("#ageID").show();

                break;
            case 11: /// 

                //container.down("[name=month]").show();
                container.down("#monthContID").show();

                break;
            case 12:
                container.down("#expDateID").show();
                break;
            case 13:
                container.down("#expDateID").show();
                break;
            case 14:
                container.down("#expDateID").show();
                me.getForm().down("[name=active]").setValue("0");
                break;
            case 15:
                container.down("#expDateID").show();
                break;
        }

        /// fwdr 
        for (var i in me.fwDetailRekap) {
            if (id === me.fwDetailRekap[i]['filterId']) {
                container.down("[name=" + me.fwDetailRekap[i]['field'] + "]").show();
            }
        }



    },
    fwDetailRekap: [
       
      /*  {
            name: 'gender',
            varName: 'Gender',
            varNameR: 'Gender',
            field: 'gender_id',
            dynamicStore: false,
            filterId: 8

        }
                                                */
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
        reportData['params']['employeeStatus'] = reportData['params']["status"] === "P" ? me.otherParamsAT.employeeStatus.nonDaily : me.otherParamsAT.employeeStatus.daily;

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
            case 4: 
                reportData = me.pfGroupPosition(reportData);
                break;
            case 5:
                reportData = me.pfReligion(reportData);
                break;
            case 6:
                reportData = me.pfBloodGroup(reportData);
                break;
            case 7:
                reportData = me.pfEducation(reportData);
                break;
            case 8:
                reportData = me.pfGender(reportData);
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
            case 13:
                reportData = me.pfHire(reportData);
                break;
            case 14:
                reportData = me.pfResign(reportData);
                break;
            case 15:
                reportData = me.pfPassaway(reportData);
                break;
            
        }

        /// fwdr 
        for (var i in me.fwDetailRekap) {
            if (selectedReportType === me.fwDetailRekap[i]['filterId']) {
                reportData = me.pfInstant(reportData, me.fwDetailRekap[i]['varNameR'], this.comboBoxFields[me.fwDetailRekap[i]['name']]);
            }
        }



        return reportData;


    },
    pfExp: function(reportData) {
        var me = this;
        var f = me.getForm();

        var vs = f.getForm().getValues();
        var fr = vs.format;
        var d = new Date(f.down("[name=start_date]").getValue());
        var d2 = new Date(f.down("[name=end_date]").getValue());
        
         reportData['params']['alokasibiaya_id'] =  me.tools.intval(reportData['params']['alokasibiaya_id'])==999?0:reportData['params']['alokasibiaya_id'];
       

        
        //var store = el.getStore();
        reportData['file'] = fr === "R" ? "HrdEmployeeRekapByExperience" : "HrdEmployeeListByExperience";
        if (fr != "R") {
            // reportData['params']["MonthName"] = store.getAt(store.findExact('number',el.getValue())).get("name");
            reportData['params']["start_date"] = vs.start_date;
            reportData['params']["end_date"] = vs.end_date;
        }
        console.log(vs);
        return reportData;
    },
    pfHire: function(reportData) {
        var me = this;
        var f = me.getForm();

        var vs = f.getForm().getValues();
        var fr = vs.format;
        var d = new Date(f.down("[name=start_date]").getValue());
        var d2 = new Date(f.down("[name=end_date]").getValue());
        
        reportData['params']['alokasibiaya_id'] =  me.tools.intval(reportData['params']['alokasibiaya_id'])==999?0:reportData['params']['alokasibiaya_id'];
       
        //var store = el.getStore();
        reportData['file'] = fr === "R" ? "HrdEmployeeRekapByHire" : "HrdEmployeeListByHire";
        if (fr != "R") {
            // reportData['params']["MonthName"] = store.getAt(store.findExact('number',el.getValue())).get("name");
            reportData['params']["start_date"] = vs.start_date;
            reportData['params']["end_date"] = vs.end_date;
        }
        console.log(vs);
        return reportData;
    },
    pfResign: function(reportData) {
        var me = this;
        var f = me.getForm();

        var vs = f.getForm().getValues();
        var fr = vs.format;
        var d = new Date(f.down("[name=start_date]").getValue());
        var d2 = new Date(f.down("[name=end_date]").getValue());
        //var store = el.getStore();
         reportData['params']['alokasibiaya_id'] =  me.tools.intval(reportData['params']['alokasibiaya_id'])==999?0:reportData['params']['alokasibiaya_id'];
       
        reportData['file'] = fr === "R" ? "HrdEmployeeRekapByResign" : "HrdEmployeeListByResign";
        if (fr != "R") {
            // reportData['params']["MonthName"] = store.getAt(store.findExact('number',el.getValue())).get("name");
            reportData['params']["start_date"] = vs.start_date;
            reportData['params']["end_date"] = vs.end_date;
        }
        console.log(vs);
        return reportData;
    },
    pfPassaway: function(reportData) {
        var me = this;
        var f = me.getForm();

        var vs = f.getForm().getValues();
        var fr = vs.format;
        var d = new Date(f.down("[name=start_date]").getValue());
        var d2 = new Date(f.down("[name=end_date]").getValue());
        //var store = el.getStore();
        reportData['file'] = fr === "R" ? "HrdEmployeeRekapByPassaway" : "HrdEmployeeListByPassaway";
        if (fr != "R") {
            // reportData['params']["MonthName"] = store.getAt(store.findExact('number',el.getValue())).get("name");
            reportData['params']["start_date"] = vs.start_date;
            reportData['params']["end_date"] = vs.end_date;
        }
        console.log(vs);
        return reportData;
    },
    pfBirthDate: function(reportData) {
        var me = this;
        var f = me.getForm();

        var vs = f.getForm().getValues();
        var fr = vs.format;
        var el = f.down("[name=month]");
        var store = el.getStore();
        reportData['params']['month'] =  me.generateIDs(f.down("#monthCbgID"));
           reportData['params']['alokasibiaya_id'] =  me.tools.intval(reportData['params']['alokasibiaya_id'])==999?0:reportData['params']['alokasibiaya_id'];
       

        reportData['file'] = fr === "R" ? "HrdEmployeeRekapByBirthdate" : "HrdEmployeeListByBirthdate";
        if (fr != "R") {
           // reportData['params']["MonthName"] = store.getAt(store.findExact('number', el.getValue())).get("name");

        }
        return reportData;
    },
    pfMaritalStatus: function(reportData) {
        var me = this;
        var f = me.getForm();

        var vs = f.getForm().getValues();
        var fr = vs.format;
         reportData['params']['alokasibiaya_id'] =  me.tools.intval(reportData['params']['alokasibiaya_id'])==999?0:reportData['params']['alokasibiaya_id'];
       
        reportData['file'] = fr === "R" ? "HrdEmployeeRekapByMarriageStatus" : "HrdEmployeeListByMarriageStatus";
        if (fr != "R") {
            var items = f.down("#maritalStatusID").items.items;
            for (var i in items) {
                if (items[i].inputValue == vs.marriagestatus_id) {

                    reportData['params']["MaritalStatusName"] = items[i].boxLabel;
                }
            }

        }
        
        console.log(reportData);
        return reportData;
    },
    pfAge: function(reportData) {
        var me = this;
        var f = me.getForm();

        var vs = f.getForm().getValues();
        var fr = vs.format;

         reportData['params']['alokasibiaya_id'] =  me.tools.intval(reportData['params']['alokasibiaya_id'])==999?0:reportData['params']['alokasibiaya_id'];
       

        reportData['file'] = fr === "R" ? "HrdEmployeeRekapByAge" : "HrdEmployeeListByAge";
        
        if (fr != "R") {



        }

        return reportData;
    },
    //
    pfInstant: function(reportData, title, cbf) {
        var me = this;
        var f = me.getForm();

        var vs = f.getForm().getValues();
        var fr = vs.format;
  

        reportData['file'] = fr === "R" ? "HrdEmployeeRekapBy" + title : "HrdEmployeeListBy" + title;
        if (fr != "R") {
            /*
            reportData['params'][title + 'Name'] = me.tools.comboHelper(f.down("[name=" + cbf.v + "]")).getText(cbf);
            if (parseInt(reportData['params'][cbf.v]) === 999) {
                reportData['params'][cbf.v] = '';
            }
            */

        }
        
        console.log(reportData);

        return reportData;
    },
    pfBloodGroup: function(reportData) {
        var me = this;
        var f = me.getForm();
        reportData['params']['bloodgroup_id'] =  me.generateIDs(f.down("#bloodgroupCbgID"));
        reportData['params']['alokasibiaya_id'] =  me.tools.intval(reportData['params']['alokasibiaya_id'])==999?0:reportData['params']['alokasibiaya_id'];
       
        
        return this.pfInstant(reportData, 'BloodGroup', this.comboBoxFields.bloodGroup);
    },
    pfPosition: function(reportData) {
        var me = this;
        var f = me.getForm();

        var vs = f.getForm().getValues();
        var fr = vs.format;
        
        reportData['params']['position_id'] =  me.generateIDs(f.down("#positionCbgID"));
        reportData['params']['alokasibiaya_id'] =  me.tools.intval(reportData['params']['alokasibiaya_id'])==999?0:reportData['params']['alokasibiaya_id'];
       

        reportData['file'] = fr === "R" ? "HrdEmployeeRekapByPosition" : "HrdEmployeeListByPosition";
        if (fr != "R") {

        }
        
        console.log(reportData);

        return reportData;
    },
    
    pfGroupPosition: function(reportData) {
        var me = this;
        var f = me.getForm();

        var vs = f.getForm().getValues();
        var fr = vs.format;
        
        reportData['params']['groupposition_id'] =  me.generateIDs(f.down("#grouppositionCbgID"));
        reportData['params']['alokasibiaya_id'] =  me.tools.intval(reportData['params']['alokasibiaya_id'])==999?0:reportData['params']['alokasibiaya_id'];
       
        reportData['file'] = fr === "R" ? "HrdEmployeeRekapByGroupPosition" : "HrdEmployeeListByGroupPosition";
        if (fr != "R") {
            

        }
        
        console.log(reportData);

        return reportData;
    },
    pfEducation: function(reportData) {
        var me = this;
        var f = me.getForm();

        var vs = f.getForm().getValues();
        var fr = vs.format;
        
        reportData['params']['education_id'] =  me.generateIDs(f.down("#educationCbgID"));
         reportData['params']['alokasibiaya_id'] =  me.tools.intval(reportData['params']['alokasibiaya_id'])==999?0:reportData['params']['alokasibiaya_id'];
       

        reportData['file'] = fr === "R" ? "HrdEmployeeRekapByEducation" : "HrdEmployeeListByEducation";
        if (fr != "R") {

        }
        
        console.log(reportData);
        
       

        return reportData;
    },
    pfGender: function(reportData) {
        var me = this;
        var f = me.getForm();

        var vs = f.getForm().getValues();
        var fr = vs.format;
        
        reportData['params']['gender_id'] =  me.generateIDsForNonNumber(f.down("#genderCbgID"));
         reportData['params']['alokasibiaya_id'] =  me.tools.intval(reportData['params']['alokasibiaya_id'])==999?0:reportData['params']['alokasibiaya_id'];
       
        reportData['file'] = fr === "R" ? "HrdEmployeeRekapByGender" : "HrdEmployeeListByGender";
        if (fr != "R") {
            /*
            reportData['params']['PositionName'] = me.tools.comboHelper(f.down("[name=position_id]")).getText(me.comboBoxFields.position);
            if (parseInt(reportData['params']['position_id']) === 999) {
                reportData['params']['position_id'] = '';
            }
            */

        }
        
        console.log(reportData);

        return reportData;
    },
    pfGrade: function(reportData) {
        var me = this;
        var f = me.getForm();

        var vs = f.getForm().getValues();
        var fr = vs.format;
        
        reportData['params']['grade_id'] =  me.generateIDs(f.down("#groupCbgID"));
         reportData['params']['alokasibiaya_id'] =  me.tools.intval(reportData['params']['alokasibiaya_id'])==999?0:reportData['params']['alokasibiaya_id'];
       

        reportData['file'] = fr === "R" ? "HrdEmployeeRekapByGrade" : "HrdEmployeeListByGrade";
        /*
        if (fr != "R") {
            reportData['params']['GradeName'] = me.tools.comboHelper(f.down("[name=grade_id]")).getText(me.comboBoxFields.category);
            if (parseInt(reportData['params']['grade_id']) === 999) {
                reportData['params']['grade_id'] = '';
            }

        }
        */


        return reportData;
    },
    pfDepartment: function(reportData) {
        var me = this;
        var f = me.getForm();

        var vs = f.getForm().getValues();
        
        reportData['params']['department_id'] =  me.generateIDs(f.down("#departmentCbgID"));
        reportData['params']['alokasibiaya_id'] =  me.tools.intval(reportData['params']['alokasibiaya_id'])==999?0:reportData['params']['alokasibiaya_id'];
       
        var fr = vs.format;

        reportData['file'] = fr === "R" ? "HrdEmployeeRekapByDepartment" : "HrdEmployeeListByDepartment";
        if (fr != "R") {
            //reportData['params']['DepartmentName'] = me.tools.comboHelper(f.down("[name=department_id]")).getText(me.comboBoxFields.department);


        }
        
        console.log(reportData);


        return reportData;
    },
    pfReligion: function(reportData) {
        var me = this;
        var f = me.getForm();

        var vs = f.getForm().getValues();
        var fr = vs.format;
        
        reportData['params']['religion_id'] =  me.generateIDs(f.down("#religionCbgID"));
        reportData['params']['alokasibiaya_id'] =  me.tools.intval(reportData['params']['alokasibiaya_id'])==999?0:reportData['params']['alokasibiaya_id'];
       
        
        reportData['file'] = fr === "R" ? "HrdEmployeeRekapByReligion" : "HrdEmployeeListByReligion";
        if (fr != "R") {
            //reportData['params']['ReligionName'] = me.tools.comboHelper(f.down("[name=religion_id]")).getText(me.comboBoxFields.religion);

        }
        
        console.log(reportData);

        return reportData;
    },
    generateIDs:function(el){
        var me = this;
        var cbgi = el.items.items;
        var strCb = "";
        for(var i in cbgi){
            if(cbgi[i].getValue()){
                var val = me.tools.intval(cbgi[i].my_special_param);
                if(val > 0){
                    strCb += me.tools.intval(cbgi[i].my_special_param)+"~";
                }
                
            }
        } 
        // menghapus delimiter terakhir
        if(strCb.length >= 2){
          strCb =  strCb.slice(0, -1); 
        }
  
        return strCb;
    },
    generateIDsForNonNumber:function(el){
        var me = this;
        var cbgi = el.items.items;
        var strCb = "";
        for(var i in cbgi){
            if(cbgi[i].getValue()){
               // var val = me.tools.intval(cbgi[i].my_special_param);
               // if(val > 0){
                if(cbgi[i].my_special_param){
                    strCb += cbgi[i].my_special_param+"~";
                }
                    
               // }
                
            }
        } 
        // menghapus delimiter terakhir
        if(strCb.length >= 2){
          strCb =  strCb.slice(0, -1); 
        }
  
        return strCb;
    },
    
    addCheckBoxToCBG:function(el,data,fieldLabel,fieldValue){
        var me = this;
      
      
        for (var i in data.data) {
            el.items.add(new Ext.form.Checkbox({
               // style:'background-color:white;',
                boxLabel: data.data[i][fieldLabel],
                name: 'dep_'+data.data[i][fieldValue],
                my_special_param:data.data[i][fieldValue]
            }));
      
        }
        

        el.doLayout();

    },
    zendInitLoaded: function(data) {
        var me = this;
        var f = me.getForm();
        var p = me.getPanel();
        var fs = p.down("#specialReportFormID");



        //  f.down("[name=department_id]").refreshMyStore(data.department);
        // me.tools.wesea(data.department, f.down("#departmentCheckBoxID")).checkBox();
        // me.tools.wesea(data.group, f.down("#categoryCheckBoxID")).checkBox();

        me.tools.wesea(data.division, f.down("[name=division_id]")).comboBox();


        me.tools.wesea(data.department, f.down("[name=department_id]")).comboBox();
        /// checkbox fill
        
        console.log(data);
        
        me.addCheckBoxToCBG(f.down("#departmentCbgID"),data.department,'code','department_id');
        me.addCheckBoxToCBG(f.down("#groupCbgID"),data.group,'code','group_id');
        me.addCheckBoxToCBG(f.down("#positionCbgID"),data.position,'position','position_id');
        me.addCheckBoxToCBG(f.down("#grouppositionCbgID"),data.groupposition,'groupposition','groupposition_id');
        me.addCheckBoxToCBG(f.down("#religionCbgID"),data.religion,'religion','religion_id');
        me.addCheckBoxToCBG(f.down("#bloodgroupCbgID"),data.bloodgroup,'bloodgroup','bloodgroup_id');
        me.addCheckBoxToCBG(f.down("#educationCbgID"),data.education,'education','education_id');
        me.addCheckBoxToCBG(f.down("#monthCbgID"),me.getmonthList(),'name','number');
        me.addCheckBoxToCBG(f.down("#genderCbgID"),me.getgenderList(),'name','number');
        me.tools.wesea(data.religion, f.down("[name=religion_id]")).comboBox();

        me.tools.wesea(data.position, f.down("[name=position_id]")).comboBox();
        me.tools.wesea(data.bloodgroup, f.down("[name=bloodgroup_id]")).comboBox();
        me.tools.wesea(data.alokasibiaya, fs.down("[name=alokasibiaya_id]")).comboBox(true);
        fs.down("[name=alokasibiaya_id]").setValue('999');


        /// fwdr 
        for (var i in me.fwDetailRekap) {
            if (me.fwDetailRekap[i]['dynamicStore'] === true) {
                me.tools.wesea(data[me.fwDetailRekap[i]['name']], f.down("[name=" + me.fwDetailRekap[i]['field'] + "]")).comboBox();
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
    },
    getgenderList:function(){
        var genderList = [{
                number: "M",
                name: 'Laki - laki'
            }, {
                number: "F",
                name: 'Perempuan'
            }];
        
        var data = {
            data:genderList
        };
        return data;
    },
    getmonthList:function(){
        var monthList = [{
                number: 1,
                name: 'January'
            }, {
                number: 2,
                name: 'February'
            }, {
                number: 3,
                name: 'March'
            }, {
                number: 4,
                name: 'April'
            }, {
                number: 5,
                name: 'May'
            }, {
                number: 6,
                name: 'June'
            }, {
                number: 7,
                name: 'July'
            }, {
                number: 8,
                name: 'August'
            }, {
                number: 9,
                name: 'September'
            }, {
                number: 10,
                name: 'October'
            }, {
                number: 11,
                name: 'November'
            }, {
                number: 12,
                name: 'December'
            }];
        
        var data = {
            data:monthList
        };
        return data;
    }
});