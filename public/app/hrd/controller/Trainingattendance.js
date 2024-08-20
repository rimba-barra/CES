Ext.define('Hrd.controller.Trainingattendance', {
    extend: 'Hrd.template.ControllerForMaster',
    alias: 'controller.Trainingattendance',
    controllerName: 'trainingattendance',
    fieldName: 'name',
    bindPrefixName: 'Trainingattendance',
    uploadFotoKlik:0,
    requires: [
        'Hrd.library.box.tools.Tools',
        'Hrd.library.box.tools.DefaultConfig',
        'Hrd.library.box.tools.EventSelector',
        'Hrd.library.Box.Tools.Browse',
        'Hrd.library.box.tools.Dynamicrequest',
    ],
    stores: [
        'Trainingperiode'
    ],
    refs:[
        {
            ref: 'gridemployee',
            selector: 'employeetraininggriddetail'
        },
        {
            ref: 'gridintranet',
            selector: 'gridbrowseintranettrainingattendance'
        },
        {
            ref: 'formintranet',
            selector: 'trainingattendancebrowseintranet'
        },
        {
            ref: 'gridattendance',
            selector: 'gridbrowseintranettrainingattendance'
        },
        {
            ref: 'formprocessintranet',
            selector: 'formtrainingattendanceprocessintranet'
        },
        {
            ref: 'formrejectintranet',
            selector: 'formtrainingattendancereject'
        },
        {
            ref: 'griddate',
            selector: 'trainingattendanceddgrid'
        },
        {
            ref: 'gridfile',
            selector: 'trainingattendancefilegrid'
        },
        {
            ref: 'griddateschedule',
            selector: 'trainingattendanceddfgrid'
        },
        {
            ref: 'gridfileemp',
            selector: 'trainingattendancedetailfilegrid'
        },
        {
            ref: 'gridfileschedule',
            selector: 'trainingattendancedetailfileschedulegrid'
        },
        {
            ref: 'formfileattach',
            selector: 'formtrainingattendanceattach'
        },
        {
            ref: 'formfileattachschedule',
            selector: 'formtrainingattendanceattach_schedule'
        },
        {
            ref: 'gridclosetrainingname',
            selector: 'trainingattendanceclosetrainingnamegrid'
        },
        {
            ref: 'gridclosebudget',
            selector: 'trainingattendanceclosebudgetgrid'
        },
        {
            ref: 'gridclosestar',
            selector: 'trainingattendanceclosestargrid'
        },
        {
            ref: 'formclose',
            selector: 'formtrainingattendanceclose'
        },
        //added by anas 20062022
        {
            ref: 'gridsurvey',
            selector: 'trainingattendancedsgrid'
        },
    ],
    urldata: 'hrd/training/',
    //LOCAL
    urlIntranet: 'https://localhost:81/',
    //DEV
    // urlIntranet: 'https://intranet-test.ciputragroup.com/'
    //LIVE
    // urlIntranet : 'https://intranet.ciputragroup.com/'


    init: function() {
        var me = this;
        
        me.tools = new Hrd.library.box.tools.Tools({config: me.myConfig});
        
        var events = new Hrd.library.box.tools.EventSelector();
        this.control(events.getEvents(me, me.controllerName));
        
        var newEvs = {};

        newEvs['trainingattendanceformdata [name=trainingschedule_id]'] = {
            select: function() {
               me.getValueTrainingSchedule();
               me.getTrainingEmployeeList();
               // me.getAllBudgetType();
               me.getAllCost();
               me.getAllDatefromSchedule();
            }
        };

        newEvs['[name=periode_budget]'] = {
            select: function() {
                
               me.selectPeriodeBudget().select;
            }
        };

        newEvs['[name=trainingcaption_id]'] = {
            select: function() {
               me.getAllBudgetTypeSelection();
            }
        };
        

        newEvs['[action=calculate_trainingcost]'] = {
            click: function() {
               me.totalTrainingCost();
            }
        };

        newEvs['[action=save_once_trainingattendance]'] = {
            click: function() {
               me.saveOnceAttendance();
            }
        };

        newEvs['trainingattendanceformdata employeetraininggriddetail'] = {
            afterrender: me.emGridAtt().fdar,
            itemdblclick: me.emGridAtt().select,
            selectionchange: me.emGridAtt().select
        };

        newEvs['[action=browse_intranet_training_attendance]'] = {
            click: function() {
               me.browseIntranetTraining();
            }
        };

        newEvs['trainingattendancebrowseintranet'] = {
            afterrender: function () {
                me.browseIntranetTrainingAfterrender();
            }
        };

        newEvs['[action=processintranet_trainingattendance]'] = {
            click: function() {
               me.processIntranetTraining();
            }
        };
        newEvs['formtrainingattendanceprocessintranet'] = {
            afterrender: function(){
                me.processIntranetTrainingAttendanceAfterrender();
                me.getAllDate();
                me.getAllFile();
                me.getAllSurvey();
            }
        };
        newEvs['[action=processapproveattendance]'] = {
            click: function() {
               me.processApproveTrainingAttendance();
            }
        };
        newEvs['[action=processrejectattendance]'] = {
            click: function() {
               me.processRejectTrainingAttendance();
            }
        };
        newEvs['[action=submitrejectattendance]'] = {
            click: function() {
               me.submitRejectTrainingAttendance();
            }
        };
        newEvs['[action=search_trainingattendance]'] = {
            click: function() {
               me.searchIntranetTraining();
            }
        };
        newEvs['[action=viewdata_trainingattendance_intranet]'] = {
            click: this.gridActionColumnClickdocument
        };
        newEvs['[action=viewdata_trainingattendance]'] = {
            click: this.gridActionColumnClickdocumentForm
        };
        newEvs['[action=viewdata_trainingattendance_schedule]'] = {
            click: this.gridActionColumnClickdocumentFormSchedule
        };
        newEvs['[action=attenddate]'] = {
            click: function() {
               me.attenddateAttendance();
            }
        };
        newEvs['[action=notattenddate]'] = {
            click: function() {
               me.notattenddateAttendance();
            }
        };

        newEvs['[action=addattach]'] = {
            click: function() {
               me.fileAttach();
            }
        };

        newEvs['[action=removeattach]'] = {
            click: function() {
               me.removeAttach();
            }
        };

        newEvs['formtrainingattendanceattach'] = {
            afterrender: function () {
                me.fileAttachAfterrender();
            }
        };

        newEvs['[action=submitfileattach]'] = {
            click: function() {
               me.UploadSubmit();
            }
        };

        newEvs['[action=addattach_schedule]'] = {
            click: function() {
               me.fileAttachSchedule();
            }
        };

        newEvs['formtrainingattendanceattach_schedule'] = {
            afterrender: function () {
                me.fileAttachScheduleAfterrender();
            }
        };

        newEvs['[action=submitfileattach_schedule]'] = {
            click: function() {
               me.UploadSubmitSchedule();
            }
        };

        newEvs['[action=close_training_attendance]'] = {
            click: function() {
               me.closeTraining();
            }
        };

        newEvs['formtrainingattendanceclose'] = {
            afterrender: function () {
                me.closeTrainingAfterrender();
            }
        };

        newEvs['trainingattendanceclosetrainingnamegrid'] = {
            afterrender: me.tnGrid().fdar,
            itemdblclick: me.tnGrid().select,
            selectionchange: me.tnGrid().select
        };

     

        newEvs['[action=processclosetraining]'] = {
            click: function() {
               me.processcloseTraining();
            }
        };

        
        
        this.control(newEvs);
    },
    emGridAtt: function () {
        var me = this;
        var x = {
            fdar: function () {

            },
            select: function () {
                var g = me.getGridemployee();
                var rec = g.getSelectedRecord();
                var gdate = me.getGriddateschedule();
                var gfile = me.getGridfileemp();
                var gsurvey = me.getGridsurvey();
                var f = me.getFormdata();
                
                if(rec){
                var e_id = rec.get("employee_id");
                var trainingattendance_id = rec.get("trainingattendance_id");
                var trainingschedule_id = f.down("[name=trainingschedule_id]").getValue();
                    me.tools.ajax({
                    params: {employee_id: e_id},
                    success: function (data, model) {

                        var departement = data.others[1][1][0].department_code;
                        var employee_name = data.others[1][1][0].employee_name;
                        var reportto = data.others[1][1][0].reportto_name;
                        me.getFormdata().down("[name=departement]").setValue(departement);
                        me.getFormdata().down("[name=employee_name]").setValue(employee_name);
                        me.getFormdata().down("[name=reportto]").setValue(reportto);
                        
                        me.getFormdata().down("[name=testimonial]").setValue('');
                        me.getFormdata().down("[name=suggestion]").setValue('');
                        me.getFormdata().down("[name=desc_imp]").setValue('');
                        me.getFormdata().down("[name=time_plan]").setValue('');
                        me.getFormdata().down("[name=imp_plan]").setValue('');
                        me.getFormdata().down("[name=nilai]").setValue('');
                        me.getFormdata().down("[name=nilai_post]").setValue('');
                        
                        if(trainingattendance_id){
                            me.tools.ajax({
                                params: {employee_id: e_id, trainingattendance_id: trainingattendance_id},
                                success: function (data, model) {
                                    var testimonial = data[0].trainingattendanceprocess.testimonial;
                                    var suggestion = data[0].trainingattendanceprocess.suggestion;
                                    var desc_imp = data[0].trainingattendanceprocess.desc_plan;
                                    var time_plan = data[0].trainingattendanceprocess.time_plan;
                                    var imp_plan = data[0].trainingattendanceprocess.imp_plan;
                                    var nilai = data[0].trainingattendanceprocess.nilai;
                                    var nilai_post = data[0].trainingattendanceprocess.nilai_post;
                                    me.getFormdata().down("[name=testimonial]").setValue(testimonial);
                                    me.getFormdata().down("[name=suggestion]").setValue(suggestion);
                                    me.getFormdata().down("[name=desc_imp]").setValue(desc_imp);
                                    me.getFormdata().down("[name=time_plan]").setValue(time_plan);
                                    me.getFormdata().down("[name=imp_plan]").setValue(imp_plan);
                                    me.getFormdata().down("[name=nilai]").setValue(nilai);
                                    me.getFormdata().down("[name=nilai_post]").setValue(nilai_post);
                                    }
                                }).read('getED_attribut');

                            me.tools.ajax({
                                params: {employee_id: e_id, trainingattendance_id: trainingattendance_id},
                                success: function (data, model) {
                                    me.tools.wesea({data: data, model: model}, gdate).grid();
                                    }
                                }).read('getED_date');
                            }
                            me.tools.ajax({
                                params: {employee_id: e_id, trainingattendance_id: trainingattendance_id},
                                success: function (data, model) {
                                    me.tools.wesea({data: data, model: model}, gfile).grid();
                                    }
                                }).read('getED_attach');

                            //added by anas 20062022
                            me.tools.ajax({
                                params: {trainingattendance_id: trainingattendance_id},
                                success: function (data, model) {
                                    me.tools.wesea({data: data, model: model}, gsurvey).grid();
                                    }
                                }).read('trainingsurvey_exist');
                            //end added by anas

                            if(trainingattendance_id == ''){
                                me.tools.ajax({
                                params: {trainingschedule_id: trainingschedule_id},
                                success: function (data, model) {

                                    me.tools.wesea({data: data, model: model}, gdate).grid();
                                    }
                                }).read('getED_dateschedule');
                            }
                        }
                    }).read('getED');
                }
                
            }
        };
        return x
    },
    selectPeriodeBudget: function () {
        var me = this;
        var g = me.getGridemployee();
                var rec = g.getSelectedRecord();
                var e_id = rec.get("employee_id");
                var f = me.getFormdata();
                var choose_periode = f.down("[name=periode_budget]").getValue();
                f.down("[name=balance_budget_employee]").setValue('');

                        me.tools.ajax({
                            params: {employee_id: e_id, choose_periode: choose_periode},
                            success: function (data, model) {

                                var budget_rp = data.others[1][0][0].budget;
                                me.getFormdata().down("[name=balance_budget_employee]").setValue(budget_rp);
                                me.totalExtraBudget();
                                }
                            }).read('getED_budget');
        
    },
    panelAfterRender: function (el) {
        var me = this;
        var f = me.getFormsearch();
        me.tools.ajax({
            params: {},
            success: function (data, model) {
                // me.tools.wesea(data.trainingcaption, f.down("[name=trainingschedule_id]")).comboBox();
                // me.tools.wesea(data.competencynames, f.down("[name=competency_name_id]")).comboBox();
                me.tools.wesea(data.trainingname, f.down("[name=trainingname_id]")).comboBox();
            }
        }).read('getSchedule');
    },
    fdar: function() {
        var me = this;
        var f = me.getFormdata();
        var g = me.getGrid();
        me.setActiveForm(f);

        var x = {
            init: function() {
                me.fdarInit();
            },
            create: function() {
                me.unMask(1);
                me.tools.ajax({
                    params: {
                    },
                    success: function(data, model) {
                        me.tools.wesea(data.trainingcaption, f.down("[name=trainingschedule_id]")).comboBox(); 
                        var year = new Date().getFullYear();
                        f.down("[name=periode_budget]").setValue(year);
                    }
                }).read('getSchedule');
            },
            update: function() {

                me.tools.ajax({
                    params: {
                    },
                    success: function(data, model) {
                        me.tools.wesea(data.trainingcaption, f.down("[name=trainingschedule_id]")).comboBox();
                        // me.tools.wesea(data.competencynames, f.down("[name=competency_name_id]")).comboBox();
                        var rec = g.getSelectedRecord();
                        f.editedRow = g.getSelectedRow();
                        f.getForm().loadRecord(rec);
                        me.empExist();
                        // me.ScheduleAttachExist(); //comment karena grid schedule di comment


                        f.down("[action=save]").hide();

                        if(rec.data.closed == 1){
                            f.down('[name=trainingschedule_id]').setReadOnly(true);
                            f.down('[name=nilai]').setReadOnly(true);
                            f.down('[name=nilai_post]').setReadOnly(true);
                            // me.getGridemployee().setDisabled(true);
                            me.getGridfileemp().down('#btnAttach').setDisabled(true);
                            me.getGridfileemp().down('#btnRemove').setDisabled(true);
                            me.getGriddateschedule().down('#btnAttend').setDisabled(true);
                            me.getGriddateschedule().down('#btnNotAttend').setDisabled(true);
                            f.down("[action=save_once_trainingattendance]").hide();
                            me.tools.alert.warning("Maaf data tersebut sudah di closed, tidak bisa di edit kembali");
                            
                        }
                    }
                }).read('getSchedule');


                me.unMask(1);

            }
        };
        return x;
    },
    empExist: function() {
        var me = this;
        var f = me.getFormdata();
        var g = me.getGridemployee();
        var s = g.getStore();
        var trainingschedule_id = f.down('[name=trainingschedule_id]').getValue();

        me.tools.ajax({
            params: {trainingschedule_id: trainingschedule_id},
            success: function (data, model) {

                me.tools.wesea({data: data, model: model}, g).grid();
            }
        }).read('getEmpExist');
    },
    ScheduleAttachExist: function() {
        var me = this;
        var f = me.getFormdata();
        var gfs = me.getGridfileschedule();
        var trainingschedule_id = f.down('[name=trainingschedule_id]').getValue();

        me.tools.ajax({
            params: {trainingschedule_id: trainingschedule_id},
            success: function (data, model) {
                
                me.tools.wesea({data: data, model: model}, gfs).grid();
            }
        }).read('getScheduleAttachExist');
    },
    getValueTrainingSchedule: function () {
        var me = this;
        f = me.getFormdata();
        var sch_id = f.down("[name=trainingschedule_id]").getValue();
        // alert(sch_id);
        me.getFormdata().down("[name=periode]").setValue('');
        me.getFormdata().down("[name=batch]").setValue('');
        me.getFormdata().down("[name=startdate]").setValue('');
        me.getFormdata().down("[name=enddate]").setValue('');
        me.tools.ajax({
            params: {trainingschedule_id: sch_id},
            success: function (data, model) {

                var periode = data.others[1][0][0].periode;
                var batch = data.others[1][0][0].batch;
                var startdate = data.others[1][0][0].startdate;
                var enddate = data.others[1][0][0].enddate;
                me.getFormdata().down("[name=periode]").setValue(periode);
                me.getFormdata().down("[name=batch]").setValue(batch);
                me.getFormdata().down("[name=startdate]").setValue(startdate);
                me.getFormdata().down("[name=enddate]").setValue(enddate);
                //me.tools.wesea(data.trainingcaption, f.down("[name=trainingschedule_id]")).comboBox();
                // me.tools.wesea(data.competencynames, f.down("[name=competency_name_id]")).comboBox();
            }
        }).read('getVTS');
    },
    totalTrainingCost: function () {
        var me = this;
        f = me.getFormdata();
        var trainingcost = f.down("[name=trainingcost]").getValue();
        var accomodation = f.down("[name=accomodation]").getValue();
        var transport = f.down("[name=transport]").getValue();
        
        var totaltrainingcost = parseFloat(trainingcost.replace(/,/g, '')||0) + parseFloat(accomodation.replace(/,/g, '')||0) + parseFloat(transport.replace(/,/g, '')||0);
        
        f.down('[name=totalcost]').setReadOnly(true);
        me.getFormdata().down("[name=totalcost]").setValue(totaltrainingcost);
        me.totalExtraBudget();
        
    },
    totalExtraBudget: function () {
        var me = this;
        f = me.getFormdata();
        var budgetemp = f.down("[name=balance_budget_employee]").getValue();
        var totalcost = f.down("[name=totalcost]").getValue();
        f.down("[name=extra_budget]").setValue('');
        var totalextra = parseFloat(budgetemp.replace(/,/g, '')||0) - parseFloat(totalcost.replace(/,/g, '')||0);
        
        if(totalextra < 0){
            totalextra = Math.abs(totalextra);
            me.getFormdata().down("[name=extra_budget]").setValue(totalextra);
        }
        // alert(parseFloat(trainingcost.replace(/,/g, '')));
        // Coor.split(",").join(".")
        // parseFloat(yournumber.replace(/,/g, ''));
        // f.down('[name=totalcost]').setReadOnly(true);
        // me.getFormdata().down("[name=totalcost]").setValue(totaltrainingcost);
        
    },
    getTrainingEmployeeList: function () {
        var me = this;
        f = me.getFormdata();
        me.getGrid().getStore().loadData([], false);
        var g = me.getGridemployee();
        
        var sch_id = f.down("[name=trainingschedule_id]").getValue();
        
        me.tools.ajax({
            params: {trainingschedule_id: sch_id},
            success: function (data, model) {

                me.tools.wesea({data: data, model: model}, g).grid();
            }
        }).read('getTEL');
        
    },
    // getAllBudgetType: function () {
    //     var me = this;
    //     f = me.getFormdata();

    //     var sch_id = f.down("[name=trainingschedule_id]").getValue();
    //     f.down("[name=balance_budget]").setValue('');
    //     me.tools.ajax({
    //         params: {trainingschedule_id: sch_id},
    //         success: function (data, model) {
    //             console.log(data);
    //             me.tools.wesea(data.trainingcaption, f.down("[name=trainingcaption_id]")).comboBox();

    //             me.getFormdata().down("[name=trainingcaption_id]").select(data.others[1][0][0].trainingcaption_id);
    //             me.getFormdata().down("[name=balance_budget]").setValue(data.others[1][0][0].budget);

    //         }
    //     }).read('getATC');
        
    // },
    getAllBudgetTypeSelection: function () {
        // var me = this;
        // f = me.getFormdata();

        // var cap_id = f.down("trainingattendanceformdata [name=trainingcaption_id]").getValue();
        // var periode_budget = f.down("[name=periode_budget]").getValue();
        
        // f.down("[name=balance_budget]").setValue('');
        // me.tools.ajax({
        //     params: {trainingcaption_id: cap_id, periode_budget: periode_budget},
        //     success: function (data, model) {
        //         console.log(data);

        //         me.getFormdata().down("[name=trainingcaption_id]").select(data.trainingbudgetprogram.data[0].trainingcaption_id);
        //         me.getFormdata().down("[name=balance_budget]").setValue(data.trainingbudgetprogram.data[0].budget);

        //     }
        // }).read('getATCS');
        
    },
    saveOnceAttendance: function () {
        var me = this;
        f = me.getFormdata();
        g = me.getGridemployee();
        rec = g.getSelectedRecord();
        trainingschedule_id = f.down("[name=trainingschedule_id]").getValue();
        employee_id = rec.get("employee_id");
        trainingregister_id = rec.get("trainingregister_id");
        nilai = f.down("[name=nilai]").getValue();
        nilai_post = f.down("[name=nilai_post]").getValue();
        testimonial = f.down("[name=testimonial]").getValue();

        me.tools.ajax({
            params: {
                'trainingschedule_id': trainingschedule_id,
                'trainingregister_id': trainingregister_id,
                'employee_id': employee_id,
                'nilai': nilai,
                'nilai_post': nilai_post,
                'testimonial': testimonial
            },
            success: function (data, model) {
                me.emptyfield();
            }
        }).read('saveOnceAttendance');
    },
    emptyfield : function(){
        var me = this;
        me.empExist();
                me.getFormdata().down("[name=departement]").setValue('');
                me.getFormdata().down("[name=employee_name]").setValue('');
                me.getFormdata().down("[name=reportto]").setValue('');
                        
                me.getFormdata().down("[name=testimonial]").setValue('');
                me.getFormdata().down("[name=nilai]").setValue('');
                me.getFormdata().down("[name=nilai_post]").setValue('');
                var gdate = me.getGriddateschedule();
                var gfile = me.getGridfileemp();
                me.tools.ajax({
                    params: {employee_id: 0, trainingattendance_id: 0},
                    success: function (data, model) {
                        me.tools.wesea({data: data, model: model}, gdate).grid();
                        }
                    }).read('getED_date');
                            
                me.tools.ajax({
                    params: {employee_id: 0, trainingattendance_id: 0},
                    success: function (data, model) {
                        me.tools.wesea({data: data, model: model}, gfile).grid();
                        }
                    }).read('getED_attach');
    },
    searchIntranetTraining: function () {
        var me = this;
        f = me.getFormintranet();
        g = me.getGridintranet();
       
        trainingperiodeapply_id = f.down("[name=trainingperiodeapply_id]").getValue();
        employee_id = f.down("[name=employee_id]").getValue();
        hc_approve_reject = f.down("[name=hc_approve_reject]").getValue();
        me.tools.ajax({
            params: {
                'trainingperiodeapply_id': trainingperiodeapply_id,
                'employee_id': employee_id,
                'hc_approve_reject': hc_approve_reject
            },
            success: function (data, model) {
                me.tools.wesea({data: data, model: model}, g).grid();
                
            }
        }).read('searchdataintranet');
    },
    browseIntranetTraining: function () {
        var me = this;
        me.instantWindow("TrainingAttendanceBrowseIntranet", 450, "Browse from Intranet", "browse", "trainingattendancebrowseintranet");
        
    },
    browseIntranetTrainingAfterrender: function () {
        var me = this;
        f = me.getFormintranet();
        g = me.getGridintranet();

        me.tools.ajax({
            params: {},
            success: function (data, model) {
                me.tools.wesea(data.employeeb, f.down("[name=employee_id]")).comboBox();
            }
        }).read('getEmp');

        me.tools.ajax({
            params: {
                
            },
            success: function (data, model) {

                me.tools.wesea({data: data, model: model}, g).grid();
            }
        }).read('getdataintranet');
    },
    processIntranetTraining: function(){
        var me = this;
        g = me.getGridintranet();
        var rec = g.getSelectedRecord();
        var id = rec.get("trainingregister_id");
        me.instantWindow("FormTrainingAttendanceProcessIntranet", 450, "Browse from Intranet", "browse", "formtrainingattendanceprocessintranet");
    },
    processIntranetTrainingAttendanceAfterrender: function(){
        var me = this;
        g = me.getGridattendance();
        f = me.getFormprocessintranet();
        var rec = g.getSelectedRecord();
        var id = rec.get("trainingattendance_id");

        f.down("[name=periode]").setValue('');
        f.down("[name=trainingname]").setValue('');
        f.down("[name=batch]").setValue('');
        f.down("[name=startdate]").setValue('');
        f.down("[name=enddate]").setValue('');
        f.down("[name=timestart]").setValue('');
        f.down("[name=timeend]").setValue('');
        f.down("[name=employee_name]").setValue('');
        f.down("[name=department]").setValue('');
        f.down("[name=employee_reportto]").setValue('');
        f.down("[name=is_ess_approve_reject_date]").setValue('');
        f.down("[name=testimonial]").setValue('');
        f.down("[name=suggestion]").setValue('');
        f.down("[name=desc_imp]").setValue('');
        f.down("[name=time_plan]").setValue('');
        f.down("[name=imp_plan]").setValue('');
        // f.down("[name=nilai]").setValue('');
        me.tools.ajax({
            params: {trainingattendance_id: id},
            success: function (data, model) {
                
                f.down("[name=periode]").setValue(data[0].trainingattendanceprocess.periode);
                f.down("[name=trainingname]").setValue(data[0].trainingattendanceprocess.trainingname);
                f.down("[name=batch]").setValue(data[0].trainingattendanceprocess.batch);
                f.down("[name=startdate]").setValue(data[0].trainingattendanceprocess.startdate);
                f.down("[name=enddate]").setValue(data[0].trainingattendanceprocess.enddate);
                f.down("[name=timestart]").setValue(data[0].trainingattendanceprocess.timestart);
                f.down("[name=timeend]").setValue(data[0].trainingattendanceprocess.timeend);
                f.down("[name=employee_name]").setValue(data[0].trainingattendanceprocess.employee_name);
                f.down("[name=department]").setValue(data[0].trainingattendanceprocess.department);
                f.down("[name=employee_reportto]").setValue(data[0].trainingattendanceprocess.employee_reportto);
                f.down("[name=is_ess_approve_reject_date]").setValue(data[0].trainingattendanceprocess.is_ess_approve_reject_date);
                f.down("[name=testimonial]").setValue(data[0].trainingattendanceprocess.testimonial);
                f.down("[name=suggestion]").setValue(data[0].trainingattendanceprocess.suggestion);
                f.down("[name=desc_imp]").setValue(data[0].trainingattendanceprocess.desc_plan);
                f.down("[name=time_plan]").setValue(data[0].trainingattendanceprocess.time_plan);
                f.down("[name=imp_plan]").setValue(data[0].trainingattendanceprocess.imp_plan);
                // f.down("[name=nilai]").setValue(data[0].trainingattendanceprocess.nilai);
            }
        }).read('getdetailintranet_attendance');
        
    },
    processApproveTrainingAttendance: function(){
        var me = this;
        g = me.getGridintranet();
        f = me.getFormprocessintranet();
        var rec = g.getSelectedRecord();
        var id = rec.get("trainingattendance_id");
        // nilai = f.down("[name=nilai]").getValue();
        // nilai_post = f.down("[name=nilai_post]").getValue();
        nilai = 0;
        nilai_post = 0;

        //added by anas 11042022
        var s = g.getStore();
        var rows = g.getSelectionModel().getSelection();
        var index = s.indexOf(rows[0]);

        me.tools.ajax({
            params: {
                'trainingattendance_id': id,
                'nilai': nilai,
                'nilai_post': nilai_post,
            },
            success: function (data, model) {
                f.up("window").close();
                s.reload();

                //added by anas 11042022
                Ext.Msg.show({
                    title: 'Success',
                    msg: "Success",
                    icon: Ext.Msg.INFO,
                    buttons: Ext.Msg.OK
                });
                s.removeAt(index);                
            },
            //added by anas 11042022
            failure: function() {
                f.up("window").close();
                s.reload();
                Ext.Msg.show({
                    title: 'Failure',
                    msg: ' Failed to approve.',
                    icon: Ext.Msg.ERROR,
                    buttons: Ext.Msg.OK
                });
            }
        }).read('approveIntranet');

    },
    processRejectTrainingAttendance: function(){
        var me = this;
        g = me.getGridintranet();
        var rec = g.getSelectedRecord();
        var id = rec.get("trainingattendance_id");
        me.instantWindow("FormTrainingAttendanceReject", 450, "Training Employee [Reject]", "reject", "formtrainingattendancereject");
    },
    submitRejectTrainingAttendance: function(){
        var me = this;
        g = me.getGridintranet();
        f = me.getFormrejectintranet();
        var rec = g.getSelectedRecord();
        var id = rec.get("trainingattendance_id");
        hc_reject_comment = f.down("[name=hc_reject_comment]").getValue();
        
        me.tools.ajax({
            params: {
                'trainingattendance_id': id,
                'hc_reject_comment': hc_reject_comment
            },
            success: function (data, model) {
                f.up("window").close();
                s.reload();
                
            }
        }).read('rejectIntranet');
    },
    getAllDate: function (el) {

        var me = this;
        g = me.getGridattendance();
        var rec = g.getSelectedRecord();
        var id = rec.get("trainingattendance_id");

        var gd = me.getGriddate();

        me.tools.ajax({
            params: {
                'trainingattendance_id': id,
            },
            success: function(data, model) {

                console.log(data);
                 me.tools.wesea({data: data, model: model}, gd).grid();
            }
        }).read('trainingdate_exist');
    },
    getAllFile: function (el) {

        var me = this;
        g = me.getGridattendance();
        var rec = g.getSelectedRecord();
        var id = rec.get("trainingattendance_id");

        var gd = me.getGridfile();

        me.tools.ajax({
            params: {
                'trainingattendance_id': id,
            },
            success: function(data, model) {
                 me.tools.wesea({data: data, model: model}, gd).grid();
            }
        }).read('trainingfile_exist');
    },
    gridActionColumnClickdocument: function (view, cell, row, col, e) {
        var me = this;
        var record = me.getGridfile().getStore().getAt(row);
        var m = e.getTarget().className.match(/\bact-(\w+)\b/);
        me.getGridfile().getSelectionModel().select(row);
        me.viewdocFiledetail(record['data']);     
    },
    gridActionColumnClickdocumentForm: function (view, cell, row, col, e) {
        var me = this;
        var record = me.getGridfileemp().getStore().getAt(row);
        var m = e.getTarget().className.match(/\bact-(\w+)\b/);
        me.getGridfileemp().getSelectionModel().select(row);
        me.viewdocFiledetailForm(record['data']);     
    },
    gridActionColumnClickdocumentFormSchedule: function (view, cell, row, col, e) {
        var me = this;
        var record = me.getGridfileschedule().getStore().getAt(row);
        var m = e.getTarget().className.match(/\bact-(\w+)\b/);
        me.getGridfileschedule().getSelectionModel().select(row);
        me.viewdocFiledetailFormSchedule(record['data']);     
    },        

    viewdocFiledetail: function (raw) {
        var me, sk_file_upload_path, grid, store, count, url, row, employee_id;
        me = this;
        locationpath = raw.locationpath;

        // window.open('http://localhost:81/syshrdv2/upload/training/'+raw['file_name']);

        //updated by anas 24052022
        window.open(document.URL+"app/hrd/uploads/training/"+raw['file_name']);

        //localhost
        // window.open(window.location.protocol+"//"+window.location.host+'/webapps/public/app/hrd/uploads/training/'+raw['file_name']);
        
        //server test
        // window.open(window.location.protocol+"//"+window.location.host+'/../public/app/hrd/uploads/training/'+raw['file_name']);
        
        //server live
        // window.open(window.location.protocol+"//"+window.location.host+'/../webapps/Ciputra/public/app/hrd/uploads/training/'+raw['file_name']);

    },
    viewdocFiledetailForm: function (raw) {
        var me, sk_file_upload_path, grid, store, count, url, row, employee_id;
        me = this;
        locationpath = raw.locationpath;

        // window.open('http://localhost:81/webapps/public/app/hrd/uploads/training/'+raw['file_name']);

        //updated by anas 24052022
        window.open(document.URL+"app/hrd/uploads/training/"+raw['file_name']);
        
        //localhost
        // window.open(window.location.protocol+"//"+window.location.host+'/webapps/public/app/hrd/uploads/training/'+raw['file_name']);
        
        //server test
        // window.open(window.location.protocol+"//"+window.location.host+'/../public/app/hrd/uploads/training/'+raw['file_name']);
        
        //server live
        // window.open(window.location.protocol+"//"+window.location.host+'/../webapps/Ciputra/public/app/hrd/uploads/training/'+raw['file_name']);

    },
    viewdocFiledetailFormSchedule: function (raw) {
        var me, sk_file_upload_path, grid, store, count, url, row, employee_id;
        me = this;
        locationpath = raw.locationpath;

        // window.open('http://localhost:81/webapps/public/app/hrd/uploads/training/schedule/'+raw['file_name']);

        //updated by anas 24052022
        window.open(document.URL+"app/hrd/uploads/training/"+raw['file_name']);
        
        //localhost
        // window.open(window.location.protocol+"//"+window.location.host+'/webapps/public/app/hrd/uploads/training/'+raw['file_name']);
        
        //server test
        // window.open(window.location.protocol+"//"+window.location.host+'/../public/app/hrd/uploads/training/'+raw['file_name']);
        
        //server live
        // window.open(window.location.protocol+"//"+window.location.host+'/../webapps/Ciputra/public/app/hrd/uploads/training/'+raw['file_name']);

    },
    getAllCost: function (el) {

        var me = this;
        f = me.getFormdata();

        var sch_id = f.down("[name=trainingschedule_id]").getValue();

        f.down("[name=trainingcost]").setValue('');
        f.down("[name=accomodation]").setValue('');
        f.down("[name=transport]").setValue('');
        f.down("[name=totalcost]").setValue('');

        me.tools.ajax({
            params: {trainingschedule_id: sch_id},
            success: function (data, model) {

                me.getFormdata().down("[name=trainingcost]").setValue(data[0].trainingschedulecost.training_cost);
                me.getFormdata().down("[name=accomodation]").setValue(data[0].trainingschedulecost.accomodation);
                me.getFormdata().down("[name=transport]").setValue(data[0].trainingschedulecost.transport);
                me.getFormdata().down("[name=totalcost]").setValue(data[0].trainingschedulecost.total_cost);

            }
        }).read('getAllCost');
    },
    getAllDatefromSchedule: function (el) {

        var me = this;
        f = me.getFormdata();
        var sch_id = f.down("[name=trainingschedule_id]").getValue();
        // alert(sch_id);
        var gds = me.getGriddateschedule();
        me.tools.ajax({
            params: {trainingschedule_id: sch_id},
            success: function (data, model) {
                me.tools.wesea({data: data, model: model}, gds).grid();
            }
        }).read('getAllDatefromSchedule');
    },
    attenddateAttendance: function (el) {
        var me = this;
        f = me.getFormdata();
        gds = me.getGriddateschedule();
        rec = gds.getSelectedRecord();
        id = rec.get("trainingscheduledate_id");
        rows = gds.getSelectionModel().getSelection();
        var ids = "";
        if (rows.length > 0) {
            for (var i in rows) {
                ids += rows[i]['data']["trainingscheduledate_id"] + "~";
            }
        }

        ge = me.getGridemployee();
        rec_ge = ge.getSelectedRecord();
        emp_id = rec_ge.get("employee_id");
        regis_id = rec_ge.get("trainingregister_id");

        nilai = f.down("[name=nilai]").getValue();
        nilai_post = f.down("[name=nilai_post]").getValue();
        testimonial = f.down("[name=testimonial]").getValue();

        me.tools.ajax({
            params: {trainingscheduledate_id: id,
                     ids: ids,
                     employee_id: emp_id,
                     trainingregister_id: regis_id,
                     nilai: nilai,
                     nilai_post: nilai_post,
                     testimonial: testimonial,
                    attendance: 1},
            success: function (data, model) {
                var sgds = gds.getStore();
                me.tools.wesea({data: data, model: model}, gds).grid();
                sgds.reload();
                
                Ext.Msg.show({
                    title: 'Success',
                    msg: 'Success',
                    icon: Ext.Msg.INFO,
                    buttons: Ext.Msg.OK
                });
            }
        }).read('inputAttendanceDateForm');

        

    },
    notattenddateAttendance: function (el) {
        var me = this;
        f = me.getFormdata();
        gds = me.getGriddateschedule();
        rec = gds.getSelectedRecord();
        id = rec.get("trainingscheduledate_id");
        rows = gds.getSelectionModel().getSelection();
        var ids = "";
        if (rows.length > 0) {
            for (var i in rows) {
                ids += rows[i]['data']["trainingscheduledate_id"] + "~";
            }
        }

        ge = me.getGridemployee();
        rec_ge = ge.getSelectedRecord();
        emp_id = rec_ge.get("employee_id");
        regis_id = rec_ge.get("trainingregister_id");

        nilai = f.down("[name=nilai]").getValue();
        nilai_post = f.down("[name=nilai_post]").getValue();
        testimonial = f.down("[name=testimonial]").getValue();

        me.tools.ajax({
            params: {trainingscheduledate_id: id,
                     ids: ids,
                     employee_id: emp_id,
                     trainingregister_id: regis_id,
                     nilai: nilai,
                     nilai_post: nilai_post,
                     testimonial: testimonial,
                    attendance: 0},
            success: function (data, model) {
                var sgds = gds.getStore();
                me.tools.wesea({data: data, model: model}, gds).grid();
                sgds.reload();

                Ext.Msg.show({
                    title: 'Success',
                    msg: 'Success',
                    icon: Ext.Msg.INFO,
                    buttons: Ext.Msg.OK
                });                
            }
        }).read('inputAttendanceDateForm');
    },

    fileAttach: function(){
        var me = this;
        g = me.getGridemployee();
        f = me.getFormfileattach();
        var rec = g.getSelectedRecord();
        var id = rec.get("employee_id");
        me.instantWindow("FormTrainingAttendanceAttach", 450, "File Attach", "attach", "formtrainingattendanceattach");
    },
    fileAttachAfterrender: function(){
        var me = this;
        g = me.getGridemployee();
        f = me.getFormfileattach();
        var rec = g.getSelectedRecord();
        var id = rec.get("employee_id");
    },
    UploadSubmit: function () {
        var me, form, info, paramdata;
        me = this;
        form = me.getFormfileattach().getForm();

        var me = this;
        f = me.getFormdata();
        ge = me.getGridemployee();
        rec_ge = ge.getSelectedRecord();
        emp_id = rec_ge.get("employee_id");
        regis_id = rec_ge.get("trainingregister_id");

        nilai = f.down("[name=nilai]").getValue();
        nilai_post = f.down("[name=nilai_post]").getValue();
        testimonial = f.down("[name=testimonial]").getValue();

        me.uploadFile({
                form: form,
                showalert: false,
                params: {
                    "type": 'dokumen',
                    "initial": 'employee'
                  //  "nik": me.getFormdata().down("[name=employee_nik]").getValue(),
                   // "employee_id":me.getFormdata().down("[name=employee_id]").getValue()
                },
                callback: {
                    success: function(fn) {

                        me.uploadFotoKlik = 0;                        
                        me.getFormfileattach().up('window').close();
                        me.tools.ajax({
                            params: {employee_id: emp_id,
                                     trainingregister_id: regis_id,
                                     nilai: nilai,
                                     nilai_post: nilai_post,
                                     testimonial: testimonial,
                                     file_name: fn},
                            success: function (data, model) {
                                var gf = me.getGridfileemp();
                                var sgf = gf.getStore();
                                me.tools.wesea({data: data, model: model}, gf).grid();
                                sgf.reload();
                                
                            }
                        }).read('inputAttendanceFileForm');

                    },
                    failure: function() {
                        me.uploadFotoKlik = 0;
                        p.setLoading(false);
                    }
                }
            });

    },

    fileAttachSchedule: function(){
        var me = this;
        f = me.getFormdata();
        var trainingschedule_id = f.down('[name=trainingschedule_id]').getValue();
        me.instantWindow("FormTrainingAttendanceAttachSchedule", 450, "File Attach Schedule", "attach", "formtrainingattendanceattach_schedule");
    },
    fileAttachScheduleAfterrender: function(){
        var me = this;
        f = me.getFormdata();
        var trainingschedule_id = f.down('[name=trainingschedule_id]').getValue();
    },
    UploadSubmitSchedule: function () {
        var me, form, info, paramdata;
        me = this;
        form = me.getFormfileattachschedule().getForm();

        var me = this;
        f = me.getFormdata();
        var trainingschedule_id = f.down('[name=trainingschedule_id]').getValue();

        me.uploadFile({
                form: form,
                showalert: false,
                params: {
                    "type": 'dokumen',
                    "initial": 'schedule'
                  //  "nik": me.getFormdata().down("[name=employee_nik]").getValue(),
                   // "employee_id":me.getFormdata().down("[name=employee_id]").getValue()
                },
                callback: {
                    success: function(fn) {

                        me.uploadFotoKlik = 0;
                        
                        me.getFormfileattachschedule().up('window').close();

                        me.tools.ajax({
                            params: {trainingschedule_id: trainingschedule_id,
                                     file_name: fn},
                            success: function (data, model) {
                                var gf = me.getGridfileschedule();
                                var sgf = gf.getStore();
                                me.tools.wesea({data: data, model: model}, gf).grid();
                                sgf.reload();
                            }
                        }).read('inputAttendanceFileFormSchedule');

                    },
                    failure: function() {
                        me.uploadFotoKlik = 0;
                        p.setLoading(false);
                    }
                }
            });

    },
    closeTraining: function () {
        var me = this;
        me.instantWindow("FormClose", 450, "Close Training", "browse", "formtrainingattendanceclose");
        
    },
    closeTrainingAfterrender: function () {
        var me = this;
        fc = me.getFormclose();
        gcs = me.getGridclosestar();
        gcb = me.getGridclosebudget();
        gct = me.getGridclosetrainingname();
        sgct = gct.getStore();


        me.tools.ajax({
            params: {},
            success: function (data, model) {
                me.tools.wesea({data: data, model: model}, gct).grid();
                sgct.reload();
            }
        }).read('gettrainingname');

        // me.tools.ajax({
        //     params: {
                
        //     },
        //     success: function (data, model) {
        //         console.log(data);
        //         console.log(model);
        //         me.tools.wesea({data: data, model: model}, g).grid();
        //     }
        // }).read('getdataintranet');
    },
    tnGrid: function () {
        var me = this;
        var x = {
            fdar: function () {

            },
            select: function () {
                var g = me.getGridclosetrainingname();
                var rec = g.getSelectedRecord();
                var sch_id = rec.get("trainingschedule_id");

                var gcb = me.getGridclosebudget();
                var gcs = me.getGridclosestar();
                sgcb = gcb.getStore();
                sgcs = gcs.getStore();
                
                if(sch_id){
                    me.tools.ajax({
                        params: {trainingschedule_id: sch_id},
                        success: function (data, model) {
                            me.tools.wesea({data: data, model: model}, gcb).grid();
                            me.tools.wesea({data: data, model: model}, gcs).grid();
                            sgct.reload();
                            sgct.reload();
                        }
                    }).read('getEmployeeforClose');
                }
                
            }
        };
        return x
    },

    processcloseTraining: function () {
        var rows;
        me = this;
        var g = me.getGridclosebudget();
        rows = g.getSelectionModel().getSelection();
        
        var count_false = 0;
        $.each( rows, function( key, value ) {
            if(value.data.hc_checked == ''){
                count_false = count_false + 1;
            }else{
                count_false = count_false + 0;
            }

            if(value.data.hc_checked_att == ''){
                count_false = count_false + 1;
            }else{
                count_false = count_false + 0;
            }
        });

        var g_star = me.getGridclosestar();
        rows_star = g_star.getSelectionModel().getSelection();
        
        var count_false_star = 0;
        $.each( rows_star, function( key, value ) {
            if(value.data.hc_checked == ''){
                count_false_star = count_false_star + 1;
            }else{
                count_false_star = count_false_star + 0;
            }

            if(value.data.hc_checked_att == ''){
                count_false_star = count_false_star + 1;
            }else{
                count_false_star = count_false_star + 0;
            }
        });
          
        var total_false = count_false + count_false_star;
        if (total_false > 0) {
            Ext.Msg.alert('Info', 'Karyawan yang anda pilih ada yang belum anda cek (Registration/Attendance), Silahkan periksa kembali.');
            return;
        } else {
            Ext.Msg.confirm('Close Training', 'Training ini akan di close dan tidak bisa di edit kembali, Pemotongan Budget dan Pemberian Competency akan dilakukan sesuai karyawan yang anda pilih jika anda setuju', function (btn) {
                if (btn == 'yes') {
                    // var me = this;
                    var fc = me.getFormclose();
                        gcs = me.getGridclosestar();
                        gcb = me.getGridclosebudget();
                        gct = me.getGridclosetrainingname();
                        sgct = gct.getStore();
                        sgcb = gcb.getStore();
                        sgcs = gcs.getStore();

                        ids_gcb = "";

                        var selected_gcb = gcb.getSelectionModel().getSelection();
                        if (selected_gcb.length > 0) {
                            for (var i in selected_gcb) {
                                ids_gcb += selected_gcb[i]['data']["employee_id"] + "~";
                            }
                        }

                        ids_gcs = "";

                        var selected_gcs = gcs.getSelectionModel().getSelection();
                        if (selected_gcs.length > 0) {
                            for (var i in selected_gcs) {
                                ids_gcs += selected_gcs[i]['data']["employee_id"] + "~";
                            }
                        }

                        var rec_gct = gct.getSelectedRecord();
                        var id_gct = rec_gct.get("trainingschedule_id");
                        var periode = rec_gct.get("periode");

                        me.tools.ajax({
                            params: {
                                ids_gcb: ids_gcb,
                                ids_gcs: ids_gcs,
                                id_gct : id_gct,
                                periode: periode
                            },
                            success: function (data, model) {
                                fc.up("window").close();
                            }
                        }).read('closetrainingname');
                }
            });
        }
        
    },

    //added by anas 28042022
    removeAttach: function() {
        var me = this;
        var rows = me.getGridfileemp().getSelectionModel().getSelection();
        if (rows.length < 1) {
            Ext.Msg.alert('Info', 'No record selected !');
            return;
        } else {

            gds = me.getGridfileemp();
            rec = gds.getSelectedRecord();
            id = rec.get("trainingattendanceattach_id");
            rows = gds.getSelectionModel().getSelection();
            var ids = "";
            if (rows.length > 0) {
                for (var i in rows) {
                    ids += rows[i]['data']["trainingattendanceattach_id"] + "~";
                }
            }
            
            Ext.Msg.confirm('Delete Data', "Are you sure want to delete ? ", function(btn) {
                if (btn == 'yes') {
                    resetTimer();
                    var msg = function() {
                        me.getGridfileemp().up('window').mask('Deleting data, please wait ...');
                    };
                    me.tools.ajax({
                        params: {
                                 ids: ids,
                                 },
                        success: function (data, model) {
                            var sgds = gds.getStore();
                            sgds.reload();

                            Ext.Msg.show({
                                title: 'Success',
                                msg: 'Success',
                                icon: Ext.Msg.INFO,
                                buttons: Ext.Msg.OK
                            });                
                        }
                    }).read('deleteAttendanceFile');
                }
            });
            
        }
    },

    getAllSurvey: function (el) {

        var me = this;
        g = me.getGridattendance();
        var rec = g.getSelectedRecord();
        var id = rec.get("trainingattendance_id");

        var gs = me.getGridsurvey();

        me.tools.ajax({
            params: {
                'trainingattendance_id': id,
            },
            success: function(data, model) {
                console.log(data);
                 me.tools.wesea({data: data, model: model}, gs).grid();
            }
        }).read('trainingsurvey_exist');
    }

});