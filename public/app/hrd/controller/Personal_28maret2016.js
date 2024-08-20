Ext.define('Hrd.controller.Personal', {
    extend: 'Hrd.library.box.controller.Controllerfdv2',
    alias: 'controller.Personal',
    requires: ['Hrd.library.box.tools.StoreProcessor', 'Hrd.library.box.tools.EventSelector',
        'Hrd.library.box.tools.SimpleGridControl', 'Hrd.library.box.tools.Tools'],
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
            ref: 'gridemgcontact',
            selector: 'personalemegergencycontactgrid'
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
        },
        {
            ref: 'panel',
            selector: 'personalpanel'
        },
        {
            ref: 'gridlookupe',
            selector: 'lookupemployeegrid'
        },
    ],
    //unitFormula: null,
    //storeProcess: 'Otherspaymentdatadetail',
    bindPrefixName: 'Personal',
    browseHandler: null,
    localStore: {
        selectedUnit: null,
        customer: null,
        price: null,
        detail: null,
        newdetail: null
    },
    saveStore: 'newdetail',
    newButtonClicked: false,
    skillList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
    constructor: function(configs) {
        this.callParent(arguments);
    },
    init: function() {
        var me = this;
        var newEvs = {};
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
        var sgcEmgContact = new Hrd.library.box.tools.SimpleGridControl({
            _gridId: 'PrsEmegergencyContactGridID',
            _methodName: me.sgcPanel
        });
        this.control(sgcEmgContact.getEvents(me, 'personalemegergencycontactgrid'));
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


        newEvs['personalformdata button[action=lookupreportto]'] = {
            click: function(el, val) {
                me.showLookupReportToWindow();
            }
        };

        newEvs['#employeePSLookupRewindow lookupemployeegrid button[action=select]'] = {
            click: function() {
                me.selectEmployeeReportTo();
            }

        };
        
        newEvs['personalformdata [name=employeestatus_employeestatus_id]'] = {
            change: function() {
                me.employeeStatusOnChange();
            }

        };
        
        //
        if (typeof moment !== 'function') { 


            Ext.Loader.injectScriptElement(document.URL + 'app/hrd/library/moment.min.js', function() {
                /// loaded
                


            }, function() {
                /// error
            });
        }

        //
        this.control(newEvs);


    },
    employeeStatusOnChange:function(){
      var me = this;
      var f = me.getFormdata();
      var vs = f.getForm().getValues();
      var val = me.tools.intval(vs["employeestatus_employeestatus_id"]);
      if(val === 1){
          
         f.down("[name=statusinformation_hire_date]").setReadOnly(false);
          f.down("[name=statusinformation_assignation_date]").setReadOnly(false);
         
         f.down("[name=statusinformation_contract_ke]").setReadOnly(true);
          f.down("[name=statusinformation_contract_start]").setReadOnly(true);
          f.down("[name=statusinformation_contract_end]").setReadOnly(true);
          
          f.down("[name=statusinformation_temporary_ke]").setReadOnly(true);
          f.down("[name=statusinformation_temporary_start]").setReadOnly(true);
          f.down("[name=statusinformation_temporary_end]").setReadOnly(true);
          
          f.down("[name=statusinformation_contract_ke]").setValue("");
          f.down("[name=statusinformation_contract_start]").setValue("");
          f.down("[name=statusinformation_contract_end]").setValue("");
          
          f.down("[name=statusinformation_temporary_ke]").setValue("");
          f.down("[name=statusinformation_temporary_start]").setValue("");
          f.down("[name=statusinformation_temporary_end]").setValue("");
          
        
          
      }else if(val===2 || val===3){
          
          f.down("[name=statusinformation_hire_date]").setReadOnly(true);
          f.down("[name=statusinformation_assignation_date]").setReadOnly(true);
         
         f.down("[name=statusinformation_contract_ke]").setReadOnly(false);
          f.down("[name=statusinformation_contract_start]").setReadOnly(false);
          f.down("[name=statusinformation_contract_end]").setReadOnly(false);
          
          f.down("[name=statusinformation_temporary_ke]").setReadOnly(true);
          f.down("[name=statusinformation_temporary_start]").setReadOnly(true);
          f.down("[name=statusinformation_temporary_end]").setReadOnly(true);
          
          f.down("[name=statusinformation_hire_date]").setValue("");
          f.down("[name=statusinformation_assignation_date]").setValue("");
          
          f.down("[name=statusinformation_temporary_ke]").setValue("");
          f.down("[name=statusinformation_temporary_start]").setValue("");
          f.down("[name=statusinformation_temporary_end]").setValue("");
          
          
          
      
      }else{
          
          f.down("[name=statusinformation_hire_date]").setReadOnly(true);
          f.down("[name=statusinformation_assignation_date]").setReadOnly(true);
         
         f.down("[name=statusinformation_contract_ke]").setReadOnly(true);
          f.down("[name=statusinformation_contract_start]").setReadOnly(true);
          f.down("[name=statusinformation_contract_end]").setReadOnly(true);
          
          f.down("[name=statusinformation_temporary_ke]").setReadOnly(false);
          f.down("[name=statusinformation_temporary_start]").setReadOnly(false);
          f.down("[name=statusinformation_temporary_end]").setReadOnly(false);
          
     
          f.down("[name=statusinformation_contract_ke]").setValue("");
          f.down("[name=statusinformation_contract_start]").setValue("");
          f.down("[name=statusinformation_contract_end]").setValue("");
          
        //  f.down("[name=statusinformation_temporary_ke]").setValue("");
        //  f.down("[name=statusinformation_temporary_start]").setValue("");
        //  f.down("[name=statusinformation_temporary_end]").setValue("");
          
          f.down("[name=statusinformation_hire_date]").setValue("");
          f.down("[name=statusinformation_assignation_date]").setValue("");
          
      
      }
      //console.log("hello "+val);
    },
    selectEmployeeReportTo: function() {

        var me = this;
        var f = me.getFormdata();
        var g = me.getGridlookupe();
        var rec = g.getSelectedRecord();
        if (rec) {
            f.down("[name=reportto_reportto]").setValue(rec.get("employee_id"));
            f.down("[name=reportto_name]").setValue(rec.get("employee_name"));
            // f.down("[name=employee_employee_name]").setValue(rec.get("employee_name"));
            //  f.down("[name=employee_employee_id]").setValue(rec.get("employee_id"));
            g.up("window").close();
        }
    },
    showLookupReportToWindow: function() {
        var me = this;
        var window = me.instantWindow("Panel", 600, "Employe List", "create", "employeePSLookupRewindow", "lookup.employee", {
            itemId: me.controllerName + 'employee'
        });


        var g = window.down("grid");


        var p = window.down("panel");
        p.setLoading("Please wait...");
        me.tools.ajax({
            params: {},
            success: function(data, model) {
                me.tools.wesea({data: data, model: model}, g).grid();
                p.setLoading(false);
            }
        }).read('employeereporto');


    },
    mainDataSave: function() {
        var me = this;


        var f = me.getFormdata();



        me.insSave({
            form: f,
            grid: me.getGrid(),
            store: me.localStore.newdetail,
            rowStore: 0,
            finalData: function(data) {

                //// added 20 Agustus 2014
                /* set last education in child data*/
                var childJson = me.getGridchild().getJson();
                for (var i in childJson) {
                    childJson[i]["last_education"] = childJson[i]["education_education_id"];
                }

                // added 25 Agustus 2014
                var saudaraJson = me.getGridsaudara().getJson();
                for (var i in saudaraJson) {
                    saudaraJson[i]["last_education"] = saudaraJson[i]["education_education_id"];
                }

                data["unit_unit_id"] = data["unit_id"];
                data["educations"] = me.getGrideducation().getJson();
                data["saudaras"] = saudaraJson;
                data["childs"] = childJson;
                data["emgcontact"] = me.getGridemgcontact().getJson();
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
                    if (dd.PrsEmegergencyContactGridID) {
                        arData = dd.PrsEmegergencyContactGridID;
                        count = 0;
                        for (count in arData) {
                            data["emgcontact"].push({
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
            },
            successSaveFunc: function() {
                me.dataReset();
                me.myTabPanelDisabled(false);
                console.log("Jalann..");
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

        me.localStore.newdetail = me.instantStore({
            id: me.controllerName + 'DetailStore',
            extraParams: {
                mode_read: 'detail'
            },
            idProperty: 'employee_id'
        });



        var x = {
            init: function() {
                var cb = ["religion_religion_id", "education_education_id", "bloodgroup_bloodgroup_id",
                    "spouse_last_education", "department_department_id", "division_division_id", "group_group_id",
                    "groupposition_groupposition_id", "position_position_id"];
                for (var c in cb) {
                    f.down("[name=" + cb[c] + "]").bindPrefixName = me.controllerName;
                    f.down("[name=" + cb[c] + "]").doInit(true, function() {

                    });
                }





                //  var sp = new Hrd.library.box.tools.StoreProcessor();
                //  sp.init("newdetail", me.controllerName + "PRSLSTORE", "employee_id");
                // sp.create(me);
                //   me.localStore[sp.id] = sp;
                /* education */
                me.getGrideducation().doInit();
                /* saudara*/
                me.getGridsaudara().doInit();
                /* child*/
                me.getGridchild().doInit();
                /* emg contact*/
                me.getGridemgcontact().doInit();
                /* training*/
                me.getGridtraining().doInit();
                /* jobs*/
                me.getGridjobs().doInit();
                /* organization*/
                me.getGridorganization().doInit();

            },
            create: function() {

                me.localStore.newdetail.load({
                    params: {
                        employee_id: 0
                    },
                    callback: function(recs, op) {
                        me.attachModel(op, me.localStore.newdetail, true);
                        var rec = me.localStore.newdetail.getAt(0);
                        if (rec) {
                            f.loadRecord(rec);

                            f.down("button[action=save]").setDisabled(false);
                        }
                    }
                });

                //  me.localStore["newdetail"].loadModel(me);
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
                me._loadDataGrid(me.getGrideducation(), 0, true);
                /*saudara*/
                me._loadDataGrid(me.getGridsaudara(), 0, true);
                /*child*/
                me._loadDataGrid(me.getGridchild(), 0, true);
                /*emgcontact*/
                me._loadDataGrid(me.getGridemgcontact(), 0, true);
                /*training*/
                me._loadDataGrid(me.getGridtraining(), 0, true);
                /*jobs*/
                me._loadDataGrid(me.getGridjobs(), 0, true);
                /*organizations*/
                me._loadDataGrid(me.getGridorganization(), 0, true);



            },
            update: function() {
                f.editedRow = g.getSelectedRow();
                var eId = me.getGrid().getSelectedRecord().get("employee_id");
                /*  me.localStore["detail"].loadData(eId, me, function() {
                 var rec = me.localStore["detail"].store.getAt(0);
                 if (rec) {
                 f.down("[name=spouse_child]").setValue(rec.get("child_count"));
                 
                 }
                 });*/

                me.localStore.newdetail.load({
                    params: {
                        employee_id: eId
                    },
                    callback: function(recs, op) {
                        me.attachModel(op, me.localStore.newdetail, true);
                        var rec = me.localStore.newdetail.getAt(0);
                        if (rec) {
                            f.loadRecord(rec);



                            f.down("button[action=save]").setDisabled(false);
                        }
                    }
                });




                /* education history*/
                me._loadDataGrid(me.getGrideducation(), eId, false);
                /*saudara*/
                me._loadDataGrid(me.getGridsaudara(), eId, false);
                /*child*/
                me._loadDataGrid(me.getGridchild(), eId, false);
                /*emgcontact*/
                me._loadDataGrid(me.getGridemgcontact(), eId, false);
                /*training*/
                me._loadDataGrid(me.getGridtraining(), eId, false);
                /*jobs*/
                me._loadDataGrid(me.getGridjobs(), eId, false);
                /*organizations*/
                me._loadDataGrid(me.getGridorganization(), eId, false);
                me.loadPotencies(eId);

            },
            other: function(state) {

                me.getFormdata().up('window').getEl().unmask();
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
            afterEdit: function(f, rec) {

                var v = f.getValues();
                var educationStore = f.down("[name=education_education_id]").getStore();
                var index = educationStore.findExact('education_id', v["education_education_id"]);

                rec.beginEdit();
                rec.set({
                    education_education: educationStore.getAt(index).get("education")
                });
                rec.endEdit();



            }
        },
        PrsEmegergencyContactGridID: {
            afterDelete: function(ctrl, row) {
                var f = ctrl.getFormdata();
                if (!f.deletedData.PrsEmegergencyContactGridID) {
                    f.deletedData.PrsEmegergencyContactGridID = [];
                }
                f.deletedData.PrsEmegergencyContactGridID.push(row.internalId);
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
            afterEdit: function(f, rec) {

                var v = f.getValues();
                var educationStore = f.down("[name=education_education_id]").getStore();
                var index = educationStore.findExact('education_id', v["education_education_id"]);

                rec.beginEdit();
                rec.set({
                    education_education: educationStore.getAt(index).get("education")
                });
                rec.endEdit();



            }

        },
        PrsCourseGridID: {
            afterDelete: function(ctrl, row) {
                var f = ctrl.getFormdata();
                if (!f.deletedData.PrsCourseGridID) {
                    f.deletedData.PrsCourseGridID = [];
                }
                f.deletedData.PrsCourseGridID.push(row.internalId);
            }
        },
        PrsCompanyGridID: {
            afterDelete: function(ctrl, row) {
                var f = ctrl.getFormdata();
                if (!f.deletedData.PrsCompanyGridID) {
                    f.deletedData.PrsCompanyGridID = [];
                }
                f.deletedData.PrsCompanyGridID.push(row.internalId);
            }
        },
        PrsOrganizationGridID: {
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
    _loadDataGrid: function(grid, employeeId, isCreate) {
        var me = this;
        var tempId = 0;
        tempId = !isCreate ? employeeId : 0;
        grid.getStore().getProxy().extraParams.employee_id = tempId;

        me.addProgress();
        grid.getStore().load({
            callback: function(rec, op) {
                grid.attachModel(op);
                me.unMask(1);

            }
        });
    },
    loadPotencies: function(employeeId) {
        var me = this;
        //do ajax
        me.addProgress();
        var f = me.getFormdata();
        /* uncheck checkbox*/
        for (var x = 1; x <= 16; x++) {
            var uel = f.down("[name=skills_" + x + "]");
            if (uel) {
                if (uel.getXType() === "checkboxfield") {
                    uel.setValue(0);
                }

            }
        }
        
        /* set radio to pasif */
        f.down("[name=skills_7_active]").setValue(0);
         f.down("[name=skills_8_active]").setValue(0);
          f.down("[name=skills_9_active]").setValue(0);

        me.tools.ajax({
            params: {
                employee_id: employeeId
            },
            success: function(recs, model) {
                var el = null, el;
                var r = null;
                var id = null;




                for (var i in recs) {

                    r = recs[i]['potencytran'];
                    id = r['potency_id'];
                    el = f.down("[name=skills_" + id + "]");

                    if (el) {
                        if (r['value']) {
                            el.setValue(r['value']);
                        }

                    }

                    /// check if list exist
                    if (r['list']) {
                        el = f.down("[name=skills_" + id + "_list]");
                        if (el) {
                            el.setValue(r['list']);
                        }
                    }

                    /// check if active taken
                    if (r['is_active']) {
                        el = f.down("[name=skills_" + id + "_active]");
                        if (el) {
                            el.setValue(r['is_active']);
                        }
                    }


                }
                me.unMask(1);
            }
        }).read('potency');
    },
    getSelectedStatusDate: function(selectedStatus, isSet, data) {
        var me = this;
        var f = me.getFormdata();
        var statusGroup = {
            1: [1],
            2: [2, 3],
            3: [4, 5, 6]
        };
        var textField = {
            1: "permanent_",
            2: "contract_",
            3: "daily_"
        };
        var startDate = null;
        var endDate = null;
        var selectedGroup = 1;
        for (var x in statusGroup) {
            for (var y in statusGroup[x]) {
                if (statusGroup[x][y] == selectedStatus) {
                    selectedGroup = x;
                }
            }
        }
        var startEl = f.down("[name=" + textField[selectedGroup] + "start_date]");
        var endEl = f.down("[name=" + textField[selectedGroup] + "end_date]");
        if (isSet) {

            startEl.setValue(data[0]);
            if (selectedGroup === 1) {
                endEl.setValue(data[1]);
            } else {
                endEl.setValue(data[2]);
            }
        }
        startDate = startEl.getValue();
        endDate = endEl.getValue();
        return [selectedGroup, startDate, endDate];


    },
    processSkills: function() {
        var me = this;
        var f = me.getFormdata();
        var skills = [];

        var values = f.getForm().getValues();
        var cs = null;
        var l = null;
        var v = null;
        var a = null;
        var id = null;
        for (var i in me.skillList) {
            cs = me.skillList[i];
            id = values['skills_' + cs + '_id'];
            v = values['skills_' + cs];
            l = values['skills_' + cs + '_list'];
            a = values['skills_' + cs + '_active'];
            skills.push({
                employeepotency_id: id,
                potency_id: cs,
                is_active: a ? a : 0,
                list: l ? l : '',
                value: v ? 1 : 0
                        // list:currentSkillElList?currentSkillElList.getValue():'',
                        //value:currentSkillEl?currentSkillEl.getValue():0
            });
        }
        return skills;
    },
    gridAfterRender: function() {
        var me = this;

        me.dataReset();
        var g = me.getGrid();
        g.getSelectionModel().setSelectionMode('SINGLE');

        Ext.util.CSS.swapStyleSheet("theme", "ext/resources/css/xtheme-gray.css");

    },
    afterDetailRequested: function(data, motherFunc) {
        // data from mode_read : 'detail'
        // motherFunc : fungsi yang dilewatkan dari method gridSelectionChange di Controllerfdv

        var me = this;
        var f = me.getFormdata();
        var g = me.getGrid();
        f.editedRow = g.getSelectedRow();
        
        f.down("[name=employee_nik]").setReadOnly(false);

        me.myTabPanelDisabled(false);


        /// load parameter


        me.tools.ajax({
            params: {
            },
            success: function(data, model) {

                me.tools.wesea(data.alokasibiaya, f.down("[name=alokasibiaya_alokasibiaya_id]")).comboBox();
            }
        }).read('parameter');

        
        me.disableEmployeeStatusFields(f.editedRow>-1?true:false);
        


        if (!g.getSelectedRecord()) {
            motherFunc();
            return;
        }



        var eId = g.getSelectedRecord().get("employee_id");



        me.localStore.newdetail.load({
            params: {
                employee_id: eId
            },
            callback: function(recs, op) {
                me.attachModel(op, me.localStore.newdetail, true);
                var rec = me.localStore.newdetail.getAt(0);
                if (rec) {




                    f.loadRecord(rec);



                    f.down("button[action=save]").setDisabled(false);

                    console.log(rec);

                    /* education history*/
                    me._loadDataGrid(me.getGrideducation(), eId, false);
                    /*saudara*/
                    me._loadDataGrid(me.getGridsaudara(), eId, false);
                    /*child*/
                    me._loadDataGrid(me.getGridchild(), eId, false);
                    /*emgcontact*/
                    me._loadDataGrid(me.getGridemgcontact(), eId, false);
                    /*training*/
                    me._loadDataGrid(me.getGridtraining(), eId, false);
                    /*jobs*/
                    me._loadDataGrid(me.getGridjobs(), eId, false);
                    /*organizations*/
                    me._loadDataGrid(me.getGridorganization(), eId, false);

                    me.loadPotencies(eId);


                    f.down("[name=spouse_child]").setValue(f.down("[name=child_count]").getValue());

                    motherFunc();


                }
            }
        });


        return false;

    },
    disableEmployeeStatusFields:function(mode){
        var me = this;
        var f = me.getFormdata();
        for(var i=1;i<=6;i++){
            f.down("#esID"+i).setReadOnly(mode);
        }
        
        f.down("[name=statusinformation_hire_date]").setReadOnly(mode);
        f.down("[name=statusinformation_assignation_date]").setReadOnly(mode);
        f.down("[name=statusinformation_contract_ke]").setReadOnly(mode);
        f.down("[name=statusinformation_contract_start]").setReadOnly(mode);
        f.down("[name=statusinformation_contract_end]").setReadOnly(mode);
        f.down("[name=statusinformation_temporary_ke]").setReadOnly(mode);
        f.down("[name=statusinformation_temporary_start]").setReadOnly(mode);
        f.down("[name=statusinformation_temporary_end]").setReadOnly(mode);
    },
    afterCallNew: function() {
        var me = this;
        var icr = me.isCreateRequirementsExist();
        if (!icr.status) {
            me.tools.alert.warning(icr.msg);
            return;
        }

        var f = me.getFormdata();
        f.editedRow = -1;
        
        

        me.getGrid().getSelectionModel().deselectAll();

        /* education history*/
        me._loadDataGrid(me.getGrideducation(), 0, true);
        /*saudara*/
        me._loadDataGrid(me.getGridsaudara(), 0, true);
        /*child*/
        me._loadDataGrid(me.getGridchild(), 0, true);
        /*emgcontact*/
        me._loadDataGrid(me.getGridemgcontact(), 0, true);
        /*training*/
        me._loadDataGrid(me.getGridtraining(), 0, true);
        /*jobs*/
        me._loadDataGrid(me.getGridjobs(), 0, true);
        /*organizations*/
        me._loadDataGrid(me.getGridorganization(), 0, true);

        me.myTabPanelDisabled(true);
        me.newButtonClicked = true;

        /// set default value for birthdate
        var bdate = new Date();
        var bel = f.down("[name=birth_date]");
        bdate.setFullYear(bdate.getFullYear() - 17);
        bdate.setMonth(0);
        bdate.setDate(1);
        bel.setValue(bdate);

        f.down("[action=save]").setDisabled(false);
        
        
        f.down("[name=employee_nik]").setReadOnly(true);
        

    },
    isCreateRequirementsExist: function() {
        var hasil = {status: false, msg: "Checking..."};
        var me = this;
        var f = me.getFormdata();
        var status = false;
        var msg = '';
        if (f.down("[name=religion_religion_id]").getStore().getCount() === 0) {
            msg = 'Data agama tidak ada';
        } else if (f.down("[name=department_department_id]").getStore().getCount() === 0) {
            msg = 'Data departemen tidak ada';
        } else if (f.down("[name=group_group_id]").getStore().getCount() === 0) {
            msg = 'Data golongan tidak ada';
        } else if (f.down("[name=position_position_id]").getStore().getCount() === 0) {
            msg = 'Data jabatan tidak ada';
        } else {
            status = true;
        }
        hasil.status = status;
        hasil.msg = msg;
        return hasil;
    },
    myTabPanelDisabled: function(isDisabled) {
        var me = this;
        var f = me.getFormdata();
        /// disable semua tab panel kecuali personal dan status / posisi
        f.down('#pFamilyTabID').setDisabled(isDisabled);
        f.down('#pEducationTabID').setDisabled(isDisabled);
        f.down('#pPotencyTabID').setDisabled(isDisabled);
        f.down('#pJobsTabID').setDisabled(isDisabled);
        f.down('personalemegergencycontactgrid').setDisabled(isDisabled);

    },
    unMask: function(progress) {
        var me = this;
        me.loadProgressCount = me.loadProgressCount - progress;
        if (me.loadProgressCount <= 0) {
            me.getFormdata().up('window').getEl().unmask();

            if (me.newButtonClicked) {
                me.myTabPanelDisabled(true);
                me.newButtonClicked = false;
            }


        }

    },
});