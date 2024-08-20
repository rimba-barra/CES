Ext.define('Hrd.controller.Personal', {
    extend: 'Hrd.library.box.controller.Controller',
    alias: 'controller.Personal',
    requires: ['Hrd.library.box.tools.StoreProcessor', 'Hrd.library.box.tools.EventSelector',
        'Hrd.library.box.tools.SimpleGridControl','Hrd.library.box.tools.Tools'],
    views: ['personal.Panel', 'personal.Grid', 'personal.FormSearch', 'personal.FormData'],
    comboBoxIdEl: [],
    controllerName: 'personal',
    fieldName: 'employee_id',
    fillForm: null,
    formWidth: 800,
    refs: [
        {
            ref: 'grid',
            selector: 'personalgrid'
        },
        {
            ref: 'formsearch',
            selector: 'personalformsearch'
        },
        {
            ref: 'formdata',
            selector: 'personalformdata'
        },
        {
            ref: 'grideducation',
            selector: 'personaleducationgrid'
        },
        {
            ref: 'gridsaudara',
            selector: 'personalsaudaragrid'
        },
        {
            ref: 'gridchild',
            selector: 'personalchildgrid'
        },
        {
            ref: 'gridtraining',
            selector: 'personalcoursegrid'
        },
        {
            ref: 'gridjobs',
            selector: 'personalcompanygrid'
        },
        {
            ref: 'gridorganization',
            selector: 'personalorganizationgrid'
        }
    ],
    //unitFormula: null,
    //storeProcess: 'Otherspaymentdatadetail',
    bindPrefixName: 'Personal',
    browseHandler: null,
    localStore: {
        selectedUnit: null,
        customer: null,
        price: null,
        detail: null
    },
    skillList:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16],
    constructor: function(configs) {
        this.callParent(arguments);
    },
    init: function() {
        var me = this;
        var events = new Hrd.library.box.tools.EventSelector();
        this.control(events.getEvents(me, me.controllerName));
        
        // added 26 Agustus 2014
        me.tools = new Hrd.library.box.tools.Tools({config: me.myConfig});
        
        var sgc = new Hrd.library.box.tools.SimpleGridControl({
            _gridId: 'PrsEducationGridID',
            _methodName: me.sgcPanel
        });
        this.control(sgc.getEvents(me, 'personaleducationgrid'));
        var sgcSaudara = new Hrd.library.box.tools.SimpleGridControl({
            _gridId: 'PrsSaudaraGridID',
            _methodName: me.sgcPanel
        });
        this.control(sgcSaudara.getEvents(me, 'personalsaudaragrid'));
        var sgcChild = new Hrd.library.box.tools.SimpleGridControl({
            _gridId: 'PrsChildGridID',
            _methodName: me.sgcPanel
        });
        this.control(sgcChild.getEvents(me, 'personalchildgrid'));
        var sgcCourse = new Hrd.library.box.tools.SimpleGridControl({
            _gridId: 'PrsCourseGridID',
            _methodName: me.sgcPanel
        });
        this.control(sgcCourse.getEvents(me, 'personalcoursegrid'));
        
        var sgcCompany = new Hrd.library.box.tools.SimpleGridControl({
            _gridId: 'PrsCompanyGridID',
             _methodName: me.sgcPanel
        });
        this.control(sgcCompany.getEvents(me, 'personalcompanygrid'));
        var sgcOrg = new Hrd.library.box.tools.SimpleGridControl({
            _gridId: 'PrsOrganizationGridID',
            _methodName: me.sgcPanel
        });
        this.control(sgcOrg.getEvents(me, 'personalorganizationgrid'));
    },
    mainDataSave: function() {
        var me = this;
        
        
        var f= me.getFormdata();
        
        

        me.insSave({
            form: f,
            grid: me.getGrid(),
            store: me.localStore["detail"].store,
            finalData: function(data) {
                
                //// added 20 Agustus 2014
                /* set last education in child data*/
                var childJson = me.getGridchild().getJson();
                for(var i in childJson){
                    childJson[i]["last_education"] = childJson[i]["education_education_id"];
                }
                
                // added 25 Agustus 2014
                var saudaraJson = me.getGridsaudara().getJson();
                for(var i in saudaraJson){
                    saudaraJson[i]["last_education"] = saudaraJson[i]["education_education_id"];
                }

                data["unit_unit_id"] = data["unit_id"];
                data["educations"] = me.getGrideducation().getJson();
                data["saudaras"] = saudaraJson;
                data["childs"] = childJson;
                data["trainings"] = me.getGridtraining().getJson();
                data["jobhistories"] = me.getGridjobs().getJson();
                data["organizations"] = me.getGridorganization().getJson();
                
                /// added 25 Agustus
                /* add skill information */
            
                
                data["skills"] = me.processSkills();
                
                /* check deleted data*/
                var dd = me.getFormdata().deletedData;
                var count = 0;
                var arData = [];
                if (dd) {
                    if (dd.PrsChildGridID) {
                        arData = dd.PrsChildGridID;
                        count = 0;
                        for (count in arData) {
                            data["childs"].push({
                                relation_id: arData[count],
                                deleted: 1
                            });
                        }
                    }
                    if (dd.PrsEducationGridID) {
                        arData = dd.PrsEducationGridID;
                        count = 0;
                        for (count in arData) {
                            data["educations"].push({
                                educationhistory_id: arData[count],
                                deleted: 1
                            });
                        }
                    }
                    if (dd.PrsSaudaraGridID) {
                        arData = dd.PrsSaudaraGridID;
                        count = 0;
                        for (count in arData) {
                            data["saudaras"].push({
                                relation_id: arData[count],
                                deleted: 1
                            });
                        }
                    }
                    if (dd.PrsCourseGridID) {
                        arData = dd.PrsCourseGridID;
                        count = 0;
                        for (count in arData) {
                            data["trainings"].push({
                                traininghistory_id: arData[count],
                                deleted: 1
                            });
                        }
                    }
                    if (dd.PrsCompanyGridID) {
                        arData = dd.PrsCompanyGridID;
                        count = 0;
                        for (count in arData) {
                            data["jobhistories"].push({
                                jobhistory_id: arData[count],
                                deleted: 1
                            });
                        }
                    }
                    if (dd.PrsOrganizationGridID) {
                        arData = dd.PrsOrganizationGridID;
                        count = 0;
                        for (count in arData) {
                            data["organizations"].push({
                                organization_id: arData[count],
                                deleted: 1
                            });
                        }
                    }
                }


                /* data["educations"].push({
                 educationhistory_id: 9,
                 deleted: 1
                 });*/
                return data;
            },
            sync: true,
            callback: {
                create: function(store, form, grid) {

                }
            }
        });
    },
    fdar: function() {

        

        var me = this;
        var f = me.getFormdata();
        var g = me.getGrid();
        me.setActiveForm(f);
     //   var sp = new Hrd.library.box.tools.StoreProcessor();
      //  sp.init("detail", me.controllerName + "PRSLSTORE", "employee_id");

        

        var x = {
            init: function() {
                var cb = ["religion_religion_id", "education_education_id", "bloodgroup_bloodgroup_id",
                    "spouse_last_education","department_department_id","division_division_id","group_group_id",
                    "groupposition_groupposition_id","position_position_id"];
                for (var c in cb) {
                    f.down("[name=" + cb[c] + "]").bindPrefixName = me.controllerName;
                    f.down("[name=" + cb[c] + "]").doInit(true, function() {
                        
                    });
                }
                var sp = new Hrd.library.box.tools.StoreProcessor();
                sp.init("detail", me.controllerName + "PRSLSTORE", "employee_id");
                sp.create(me);
                me.localStore[sp.id] = sp;
                /* education */
                me.getGrideducation().doInit();
                /* saudara*/
                me.getGridsaudara().doInit();
                /* child*/
                me.getGridchild().doInit();
                /* training*/
                me.getGridtraining().doInit();
                /* jobs*/
                me.getGridjobs().doInit();
                /* organization*/
                me.getGridorganization().doInit();

            },
            create: function() {

                me.localStore["detail"].loadModel(me);
                /* education */
                me.getGrideducation().getStore().load({
                    params: {
                        //  state:"load_default_attribute"
                    },
                    callback: function(rec, op) {
                        me.getGrideducation().attachModel(op);
                    }
                });
                /* education history*/
                me._loadDataGrid(me.getGrideducation(),0,true);
                /*saudara*/
                me._loadDataGrid(me.getGridsaudara(),0,true);
                /*child*/
                me._loadDataGrid(me.getGridchild(),0,true);
                /*training*/
                me._loadDataGrid(me.getGridtraining(),0,true);
                /*jobs*/
                me._loadDataGrid(me.getGridjobs(),0,true);
                /*organizations*/
                me._loadDataGrid(me.getGridorganization(),0,true);
            },
            update: function() {
                f.editedRow = g.getSelectedRow();
                var eId = me.getGrid().getSelectedRecord().get("employee_id");
                me.localStore["detail"].loadData(eId, me,function(){
                    var rec = me.localStore["detail"].store.getAt(0);
                    if(rec){
                             f.down("[name=spouse_child]").setValue(rec.get("child_count"));
              
                    }
                 });
                
                
                
                
                /* education history*/
                me._loadDataGrid(me.getGrideducation(),eId,false);
                /*saudara*/
                me._loadDataGrid(me.getGridsaudara(),eId,false);
                /*child*/
                me._loadDataGrid(me.getGridchild(),eId,false);
                /*training*/
                me._loadDataGrid(me.getGridtraining(),eId,false);
                /*jobs*/
                me._loadDataGrid(me.getGridjobs(),eId,false);
                /*organizations*/
                me._loadDataGrid(me.getGridorganization(),eId,false);
                me.loadPotencies(eId);
                
            }
        };
        return x;
    },
    /* simple grid control main control*/
    sgcPanel: {
        PrsEducationGridID: {
            afterDelete: function(ctrl, row) {
                var f = ctrl.getFormdata();
                if (!f.deletedData.PrsEducationGridID) {
                    f.deletedData.PrsEducationGridID = [];
                }
                f.deletedData.PrsEducationGridID.push(row.internalId);
            }
        },
        PrsChildGridID: {
            afterDelete: function(ctrl, row) {
                var f = ctrl.getFormdata();
                if (!f.deletedData.PrsChildGridID) {
                    f.deletedData.PrsChildGridID = [];
                }
                f.deletedData.PrsChildGridID.push(row.internalId);
            },
            afterEdit:function(f,rec){
                    
                    var v = f.getValues();
                    var educationStore = f.down("[name=education_education_id]").getStore();
                    var index = educationStore.findExact('education_id',v["education_education_id"]);
                    
                    rec.beginEdit();
                    rec.set({
                        education_education:educationStore.getAt(index).get("education")
                    });
                    rec.endEdit();
                    
                    
                   
            }
        },
        PrsSaudaraGridID: {
            afterDelete: function(ctrl, row) {
                var f = ctrl.getFormdata();
                if (!f.deletedData.PrsSaudaraGridID) {
                    f.deletedData.PrsSaudaraGridID = [];
                }
                f.deletedData.PrsSaudaraGridID.push(row.internalId);
            },
            afterEdit:function(f,rec){
                    
                    var v = f.getValues();
                    var educationStore = f.down("[name=education_education_id]").getStore();
                    var index = educationStore.findExact('education_id',v["education_education_id"]);
                    
                    rec.beginEdit();
                    rec.set({
                        education_education:educationStore.getAt(index).get("education")
                    });
                    rec.endEdit();
                    
                    
                   
            }        
                    
        },
        PrsCourseGridID:{
            afterDelete: function(ctrl, row) {
                var f = ctrl.getFormdata();
                if (!f.deletedData.PrsCourseGridID) {
                    f.deletedData.PrsCourseGridID = [];
                }
                f.deletedData.PrsCourseGridID.push(row.internalId);
            }
        },
        PrsCompanyGridID:{
            afterDelete: function(ctrl, row) {
                var f = ctrl.getFormdata();
                if (!f.deletedData.PrsCompanyGridID) {
                    f.deletedData.PrsCompanyGridID = [];
                }
                f.deletedData.PrsCompanyGridID.push(row.internalId);
            }
        },
        PrsOrganizationGridID:{
            afterDelete: function(ctrl, row) {
                var f = ctrl.getFormdata();
                if (!f.deletedData.PrsOrganizationGridID) {
                    f.deletedData.PrsOrganizationGridID = [];
                }
                f.deletedData.PrsOrganizationGridID.push(row.internalId);
            }
        }
        
    },
    sgcHelper: {
        genderRadioButton: function(cols) {
            var x = {
                xtype: 'radiogroup',
                fieldLabel: cols.text,
                layout: 'hbox',
                defaults: {
                    margin: '0 7 0 0'
                },
                items: [
                    {boxLabel: 'Male', name: cols.dataIndex, inputValue: "M", checked: true},
                    {boxLabel: 'Female', name: cols.dataIndex, inputValue: "F"},
                ]
            };
            return x;
        }
    },
    _loadDataGrid: function(grid,employeeId,isCreate) {
        var me = this;
        if(!isCreate){ /// jika melakukan update data
            grid.getStore().getProxy().extraParams.employee_id = employeeId;
        }
        me.addProgress();
        grid.getStore().load({
            callback: function(rec, op) {
                grid.attachModel(op);
                me.unMask(1);
            }
        });
    },
    loadPotencies:function(employeeId){
        var me = this;
        //do ajax
        me.addProgress();
        var f = me.getFormdata();
        me.tools.ajax({
            params: {
                employee_id:employeeId
            },
            success: function(recs, model) {
                var el = null,el;
                var r = null;
                var id = null;
                for(var i in recs){
                    r = recs[i]['potencytran'];
                    id = r['potency_id'];
                    el = f.down("[name=skills_"+id+"]");
                    
                    if(el){
                        if(r['value']){
                            el.setValue(r['value']);
                        }
                        
                    }
                    
                    /// check if list exist
                    if(r['list']){
                        el = f.down("[name=skills_"+id+"_list]");
                        if(el){
                            el.setValue(r['list']);
                        }
                    }
                    
                    /// check if active taken
                    if(r['is_active']){
                        el = f.down("[name=skills_"+id+"_active]");
                        if(el){
                            el.setValue(r['is_active']);
                        }
                    }
                    
                }
                me.unMask(1);
            }
        }).read('potency');
    },
    getSelectedStatusDate:function(selectedStatus,isSet,data){
        var me = this;
        var f=  me.getFormdata();
        var statusGroup = {
            1:[1],
            2:[2,3],
            3:[4,5,6]
        };
        var textField = {
            1:"permanent_",
            2:"contract_",
            3:"daily_"
        };
        var startDate = null; 
        var endDate = null;
        var selectedGroup = 1;
        for(var x in statusGroup){
            for(var y in statusGroup[x]){
                if(statusGroup[x][y]==selectedStatus){
                    selectedGroup = x;
                }
            }
        }
        var startEl = f.down("[name="+textField[selectedGroup]+"start_date]");
        var endEl = f.down("[name="+textField[selectedGroup]+"end_date]");
        if(isSet){
            
            startEl.setValue(data[0]);
            if(selectedGroup===1){
              endEl.setValue(data[1]);  
            }else{
                endEl.setValue(data[2]);
            }
        }
        startDate = startEl.getValue();
        endDate = endEl.getValue();
        return [selectedGroup,startDate,endDate];
        
        
    },
    
    processSkills:function(){
        var me = this;
        var f = me.getFormdata();
        var skills = [];
        
        var values = f.getForm().getValues();
        var cs = null;
        var l = null;
        var v = null;
        var a = null;
        var id = null;
                for(var i in me.skillList){
                    cs = me.skillList[i];
                    id = values['skills_'+cs+'_id'];
                    v = values['skills_'+cs];
                    l = values['skills_'+cs+'_list'];
                    a = values['skills_'+cs+'_active'];
                    skills.push({
                        employeepotency_id:id,
                        potency_id:cs,
                        is_active:a?a:0,
                        list:l?l:'',
                        value:v?1:0
                       // list:currentSkillElList?currentSkillElList.getValue():'',
                        //value:currentSkillEl?currentSkillEl.getValue():0
                    });
                }
        return skills;
    }
    



});