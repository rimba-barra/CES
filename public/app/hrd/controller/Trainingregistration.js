Ext.define('Hrd.controller.Trainingregistration', {
    extend: 'Hrd.template.ControllerForMaster',
    alias: 'controller.Trainingregistration',
    controllerName: 'trainingregistration',
    fieldName: 'name',
    bindPrefixName: 'Trainingregistration',
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
            selector: 'gridbrowseintranettrainingregistration'
        },
        {
            ref: 'formintranet',
            selector: 'trainingregistrationbrowseintranet'
        },
        {
            ref: 'gridregistration',
            selector: 'gridbrowseintranettrainingregistration'
        },
        {
            ref: 'formprocessintranet',
            selector: 'formtrainingregistrationprocessintranet'
        },
        {
            ref: 'formrejectintranet',
            selector: 'formtrainingregistrationreject'
        },
        {
            ref: 'gridformcompetency',
            selector: 'trainingregistrationcompetencygrid'
        },
        {
            ref: 'formrejectdetail',
            selector: 'formtrainingregistrationrejectdetail'
        },
    
    ],
    init: function() {
        var me = this;
        
        me.tools = new Hrd.library.box.tools.Tools({config: me.myConfig});
        
        var events = new Hrd.library.box.tools.EventSelector();
        this.control(events.getEvents(me, me.controllerName));
        
        var newEvs = {};

        newEvs['trainingregistrationformdata [name=trainingschedule_id]'] = {
            select: function() {
               me.getValueTrainingSchedule();
               me.getTrainingEmployeeList();
               me.getAllBudgetType();
            }
        };

        newEvs['[name=periode_budget]'] = {
            select: function() {
                
               me.selectPeriodeBudget().select;
            }
        };

        newEvs['trainingregistrationformdata [name=trainingcaption_id]'] = {
            select: function() {
               me.getAllBudgetTypeSelection();
            }
        };
        

        newEvs['[action=calculate_trainingcost]'] = {
            click: function() {
               me.totalTrainingCost();
            }
        };

        newEvs['[action=save_once]'] = {
            click: function() {
               me.saveOnce();
            }
        };

        newEvs['employeetraininggriddetail'] = {
            afterrender: me.emGridTraReg().fdar,
            itemdblclick: me.emGridTraReg().select,
            selectionchange: me.emGridTraReg().select
        };

        newEvs['[action=browse_intranet_training]'] = {
            click: function() {
               me.browseIntranetTraining();
            }
        };

        newEvs['trainingregistrationbrowseintranet'] = {
            afterrender: function () {
                me.browseIntranetTrainingAfterrender();
            }
        };

        newEvs['[action=processintranet]'] = {
            click: function() {
               me.processIntranetTraining();
            }
        };
        newEvs['formtrainingregistrationprocessintranet'] = {
            afterrender: function(){
                me.processIntranetTrainingAfterrender();
                me.getCompetencyExist();
            }
        };
        newEvs['[action=processapprove]'] = {
            click: function() {
               me.processApproveTraining();
            }
        };
        newEvs['[action=processreject]'] = {
            click: function() {
               me.processRejectTraining();
            }
        };
        newEvs['[action=submitreject]'] = {
            click: function() {
               me.submitRejectTraining();
            }
        };
        newEvs['[action=search_trainingregistration]'] = {
            click: function() {
               me.searchIntranetTraining();
            }
        };

        newEvs['[action=rejectDetail]'] = {
            click: function() {
               me.processRejectTrainingDetail();
            }
        };
        newEvs['[action=submitrejectdetail]'] = {
            click: function() {
               me.submitRejectTrainingDetail();
            }
        };
        
        
        this.control(newEvs);
    },
    emGridTraReg: function () {
        var me = this;
        var x = {
            fdar: function () {

            },
            select: function () {
                var g = me.getGridemployee();
                var rec = g.getSelectedRecord();
               
                // if(rec){
                //     me.getFormdata().down("[name=enddate]").setValue(rec.i.data.employee_name);
                // }
                if(rec){
                var e_id = rec.get("employee_id");
                    me.tools.ajax({
                    params: {employee_id: e_id},
                    success: function (data, model) {
                        console.log(data);
                        // console.log(model);
                        // me.tools.wesea({data: data, model: model}, g).grid();

                        // console.log(data.others[1][0][0].periode);
                        var departement = data.others[1][1][0].department_code;
                        var employee_name = data.others[1][1][0].employee_name;
                        var reportto = data.others[1][1][0].reportto_name;
                        me.getFormdata().down("[name=departement]").setValue(departement);
                        me.getFormdata().down("[name=employee_name]").setValue(employee_name);
                        me.getFormdata().down("[name=reportto]").setValue(reportto);

                        me.getFormdata().down('[name=periode_budget]').setReadOnly(true);

                        var f = me.getFormdata();
                        var year = new Date().getFullYear();
                        f.down("[name=periode_budget]").setValue(year);
                        var choose_periode = f.down("[name=periode_budget]").getValue();
                        f.down("[name=balance_budget_employee]").setValue('');
                        me.tools.ajax({
                            params: {employee_id: e_id, choose_periode: choose_periode},
                            success: function (data, model) {
                                var budget_rp = data.others[1][0][0].budget;
                                me.getFormdata().down("[name=balance_budget_employee]").setValue(budget_rp);
                                me.totalExtraBudget();
                                me.getAllBudgetType();
                                }
                            }).read('getED_budget');
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
                    console.log(data);
                    var budget_rp = data.others[1][0][0].budget;
                    me.getFormdata().down("[name=balance_budget_employee]").setValue(budget_rp);
                    me.totalExtraBudget();
                    }
                }).read('getED_budget');

        me.getAllBudgetType();
        
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
                        var year = new Date().getFullYear();
                        f.down("[name=periode_budget]").setValue(year);
                        me.getAllBudgetType();
                        me.gettotalTrainingCost_exist();
                        console.log(rec.get('private'));
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
                console.log(data);
                console.log(model);
                me.tools.wesea({data: data, model: model}, g).grid();
                s.reload();
            }
        }).read('getEmpExist');
    },

    getCompetencyExist: function (el) {
        var me = this;
        gfc = me.getGridformcompetency();
        sgfc = gfc.getStore();
        g = me.getGridintranet();
        f = me.getFormprocessintranet();
        var rec = g.getSelectedRecord();
        var id = rec.get("trainingregister_id");
        sgfc.reload();

        me.tools.ajax({
            params: {
                'trainingregister_id': id,
            },
            success: function(data, model) {
                me.tools.wesea({data: data, model: model}, gfc).grid();
            }
        }).read('getcompetencyexist');
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
                console.log(data.others[1][0][0].periode);
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
        var sch_id = f.down("[name=trainingschedule_id]").getValue();

        me.getFormdata().down("[name=totalcost]").setValue(totaltrainingcost);
        me.totalExtraBudget();
        me.tools.ajax({
            params: {   trainingschedule_id: sch_id, 
                        training_cost:trainingcost, 
                        accomodation:accomodation, 
                        transport:transport,
                        total_cost:totaltrainingcost},
            success: function (data, model) {
                console.log(data);
            }
        }).read('savecost');
        
    },
    gettotalTrainingCost_exist: function () {
        var me = this;
        f = me.getFormdata()
        var sch_id = f.down("[name=trainingschedule_id]").getValue();
        
        me.tools.ajax({
            params: {   trainingschedule_id: sch_id},
            success: function (data, model) {
                if(data.others[0][0].HASIL[0][0])
                {
                    f.down("[name=trainingcost]").setValue(data.others[0][0].HASIL[0][0].training_cost);
                    f.down("[name=accomodation]").setValue(data.others[0][0].HASIL[0][0].accomodation);
                    f.down("[name=transport]").setValue(data.others[0][0].HASIL[0][0].transport);
                    f.down("[name=totalcost]").setValue(data.others[0][0].HASIL[0][0].total_cost);
                }
                
            }
        }).read('getcost_exist');
        
    },
    totalExtraBudget: function () {
        var me = this;
        f = me.getFormdata();
        var budgetemp = f.down("[name=balance_budget_employee]").getValue();
        var totalcost = f.down("[name=totalcost]").getValue();
        f.down("[name=extra_budget]").setValue('');
        f.down("[name=hc_approve_reject]").setValue(false);
        f.down('[name=hc_approve_extra]').setReadOnly(true);
        var totalextra = parseFloat(budgetemp.replace(/,/g, '')||0) - parseFloat(totalcost.replace(/,/g, '')||0);
        
        if(totalextra < 0){
            totalextra = Math.abs(totalextra);
            me.getFormdata().down("[name=extra_budget]").setValue(totalextra);
            me.getFormdata().down("[name=hc_approve_reject]").setValue(true);
            me.getFormdata().down('[name=hc_approve_extra]').setReadOnly(false);
        }
        // alert(parseFloat(trainingcost.replace(/,/g, '')));
        // Coor.split(",").join(".")
        // parseFloat(yournumber.replace(/,/g, ''));
        // f.down('[name=totalcost]').setReadOnly(true);
        // me.getFormdata().down("[name=totalcost]").setValue(totaltrainingcost);
        
    },
    totalExtraBudgetLockBudget: function () {
        var me = this;
        f = me.getFormdata();
        var budgetemp = f.down("[name=balance_budget]").getValue();
        var totalcost = f.down("[name=totalcost]").getValue();
        f.down("[name=extra_budget]").setValue('');
        f.down("[name=hc_approve_reject]").setValue(false);
        f.down('[name=hc_approve_extra]').setReadOnly(true);
        var totalextra = parseFloat(budgetemp.replace(/,/g, '')||0) - parseFloat(totalcost.replace(/,/g, '')||0);
        
        if(totalextra < 0){
            totalextra = Math.abs(totalextra);
            me.getFormdata().down("[name=extra_budget]").setValue(totalextra);
            me.getFormdata().down("[name=hc_approve_reject]").setValue(true);
            me.getFormdata().down('[name=hc_approve_extra]').setReadOnly(false);
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
                console.log(data);
                console.log(model);
                me.tools.wesea({data: data, model: model}, g).grid();
            }
        }).read('getTEL');
        
    },
    getAllBudgetType: function () {
        var me = this;
        f = me.getFormdata();

        var sch_id = f.down("[name=trainingschedule_id]").getValue();
        var periode_budget = f.down("[name=periode_budget]").getValue();
        f.down("[name=balance_budget]").setValue('');
        me.tools.ajax({
            params: {trainingschedule_id: sch_id, periode:periode_budget},
            success: function (data, model) {
                console.log("getAllBudgetType");
                console.log(data.others[1][0][0].trainingcaption_id);
                me.tools.wesea(data.trainingcaption, f.down("[name=trainingcaption_id]")).comboBox();

                me.getFormdata().down("[name=trainingcaption_id]").select(data.others[1][0][0].trainingcaption_id);
                //me.getFormdata().down("[name=balance_budget]").setValue(data.others[1][0][0].budget);

                if(data.others[1][0][0].lockbudget == '0'){
                    f.down("[name=balance_budget]").setValue('');
                    me.totalExtraBudget();
                }

                if(data.others[1][0][0].lockbudget == '1'){
                    f.down("[name=balance_budget_employee]").setValue('');
                    me.getFormdata().down("[name=balance_budget]").setValue(data.others[2][0][0].budget);
                    me.totalExtraBudgetLockBudget();
                }
            }
        }).read('getATC');
        
    },
    getAllBudgetTypeSelection: function () {
        var me = this;
        f = me.getFormdata();

        var cap_id = f.down("trainingregistrationformdata [name=trainingcaption_id]").getValue();
        var periode_budget = f.down("[name=periode_budget]").getValue();
        
        f.down("[name=balance_budget]").setValue('');
        me.tools.ajax({
            params: {trainingcaption_id: cap_id, periode_budget: periode_budget},
            success: function (data, model) {
                console.log(data);

                me.getFormdata().down("[name=trainingcaption_id]").select(data.trainingbudgetprogram.data[0].trainingcaption_id);
                me.getFormdata().down("[name=balance_budget]").setValue(data.trainingbudgetprogram.data[0].budget);

            }
        }).read('getATCS');
        
    },
    saveOnce: function () {
        var me = this;
        f = me.getFormdata();
        g = me.getGridemployee();
        rec = g.getSelectedRecord();
        trainingschedule_id = f.down("[name=trainingschedule_id]").getValue();
        employee_id = rec.get("employee_id");
        trainingcost = f.down("[name=trainingcost]").getValue();
        accomodation = f.down("[name=accomodation]").getValue();
        transport = f.down("[name=transport]").getValue();
        totalcost = f.down("[name=totalcost]").getValue();
        periode_budget = f.down("[name=periode_budget]").getValue();
        balance_budget_employee = f.down("[name=balance_budget_employee]").getValue();
        extra_budget = f.down("[name=extra_budget]").getValue();
        hc_approve_reject = f.down("[name=hc_approve_reject]").getValue();
        hc_approve_extra = f.down("[name=hc_approve_extra]").getValue();

        me.tools.ajax({
            params: {
                'trainingschedule_id': trainingschedule_id,
                'employee_id': employee_id,
                'trainingcost': trainingcost,
                'accomodation': accomodation,
                'transport': transport,
                'totalcost': totalcost,
                'periode_budget': periode_budget,
                'balance_budget_employee': balance_budget_employee,
                'extra_budget': extra_budget,
                'hc_approve_reject': hc_approve_reject,
                'hc_approve_extra': hc_approve_extra
            },
            success: function (data, model) {            
                s = g.getStore();
                s.reload();
                me.empExist();
                s.reload();                
                
                Ext.Msg.alert('Info', 'Success');

                f.down("[name=employee_name]").setValue('');
                f.down("[name=departement]").setValue('');
                f.down("[name=reportto]").setValue('');
                f.down("[name=balance_budget]").setValue('');
                f.down("[name=balance_budget_employee]").setValue('');
                f.down("[name=extra_budget]").setValue('');                
                f.down("[name=hc_approve_reject]").setValue(false);     
                f.down("[name=hc_approve_extra]").setValue(false);
            },
            failure: function() {
                Ext.Msg.alert('Error', 'Error'); 
            }
        }).read('saveOnce');
    },
    searchIntranetTraining: function () {
        var me = this;
        f = me.getFormintranet();
        g = me.getGridintranet();
       
        trainingperiodeapply_id = f.down("[name=trainingperiodeapply_id]").getValue();
        employee_id = f.down("[name=employee_id]").getValue();
        hc_approve_reject = f.down("[name=hc_approve_reject]").getValue();
        tidak_sesuai_budget = f.down("[name=tidak_sesuai_budget]").getValue();
        me.tools.ajax({
            params: {
                'trainingperiodeapply_id': trainingperiodeapply_id,
                'employee_id': employee_id,
                'hc_approve_reject': hc_approve_reject,
                'tidak_sesuai_budget': tidak_sesuai_budget
            },
            success: function (data, model) {
                me.tools.wesea({data: data, model: model}, g).grid();
                
            }
        }).read('searchdataintranet');
    },
    browseIntranetTraining: function () {
        var me = this;
        me.instantWindow("TrainingRegistrationBrowseIntranet", 450, "Browse from Intranet", "browse", "trainingregistrationbrowseintranet");
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
                console.log(data);
                console.log(model);
                me.tools.wesea({data: data, model: model}, g).grid();
            }
        }).read('getdataintranet');
    },
    processIntranetTraining: function(){
        var me = this;
        g = me.getGridintranet();
        var rec = g.getSelectedRecord();
        var id = rec.get("trainingregister_id");
        me.instantWindow("FormTrainingRegistrationProcessIntranet", 500, "Browse from Intranet", "browse", "formtrainingregistrationprocessintranet");
    },
    processIntranetTrainingAfterrender: function(){
        var me = this;
        g = me.getGridintranet();
        f = me.getFormprocessintranet();
        var rec = g.getSelectedRecord();
        var id = rec.get("trainingregister_id");

        f.down("[name=periode]").setValue('');
        f.down("[name=trainingname]").setValue('');
        f.down("[name=batch]").setValue('');
        // f.down("[name=competency_name]").setValue('');
        f.down("[name=vendor]").setValue('');
        f.down("[name=skill_trainingname]").select('');
        f.down("[name=type_trainingname]").select('');
        f.down("[name=certificate_trainingname]").select('');
        f.down("[name=startdate]").setValue('');
        f.down("[name=enddate]").setValue('');
        f.down("[name=timestart]").setValue('');
        f.down("[name=timeend]").setValue('');
        f.down("[name=employee_name]").setValue('');
        f.down("[name=department]").setValue('');
        f.down("[name=employee_reportto]").setValue('');
        f.down("[name=is_ess_approve_reject_date]").setValue('');

        //updated by anas 06042022
        // f.down("[name=training_cost]").setValue('');
        // f.down("[name=accomodation]").setValue('');
        // f.down("[name=transport]").setValue('');
        // f.down("[name=total_cost]").setValue('');
        // f.down("[name=trainingcaption_id]").setValue('');
        // f.down("[name=balance_budget]").setValue('');
        // f.down("[name=balance_budget_employee]").setValue('');
        // f.down("[name=extra_budget]").setValue('');
        //end updated by anas 06042022

        me.tools.ajax({
            params: {trainingregister_id: id},
            success: function (data, model) {
                f.down("[name=periode]").setValue(data[0].trainingregistrationprocess.periode);
                f.down("[name=trainingname]").setValue(data[0].trainingregistrationprocess.trainingname);
                f.down("[name=batch]").setValue(data[0].trainingregistrationprocess.batch);
                // f.down("[name=competency_name]").setValue(data[0].trainingregistrationprocess.competency_name);
                f.down("[name=vendor]").setValue(data[0].trainingregistrationprocess.vendor);
                f.down("[name=skill_trainingname]").select(data[0].trainingregistrationprocess.skill_trainingname);
                f.down("[name=type_trainingname]").select(data[0].trainingregistrationprocess.type_trainingname);
                f.down("[name=certificate_trainingname]").select(data[0].trainingregistrationprocess.certificate_trainingname);
                f.down("[name=startdate]").setValue(data[0].trainingregistrationprocess.startdate);
                f.down("[name=enddate]").setValue(data[0].trainingregistrationprocess.enddate);
                f.down("[name=timestart]").setValue(data[0].trainingregistrationprocess.timestart);
                f.down("[name=timeend]").setValue(data[0].trainingregistrationprocess.timeend);
                f.down("[name=employee_name]").setValue(data[0].trainingregistrationprocess.employee_name);
                f.down("[name=department]").setValue(data[0].trainingregistrationprocess.department);
                f.down("[name=employee_reportto]").setValue(data[0].trainingregistrationprocess.employee_reportto);
                f.down("[name=is_ess_approve_reject_date]").setValue(data[0].trainingregistrationprocess.is_ess_approve_reject_date);
                f.down("[name=trainingschedule_id]").setValue(data[0].trainingregistrationprocess.trainingschedule_id);

                //updated by anas 06042022
                // f.down("[name=training_cost]").setValue(data[0].trainingregistrationprocess.training_cost_schedule);
                // f.down("[name=accomodation]").setValue(data[0].trainingregistrationprocess.accomodation_schedule);
                // f.down("[name=transport]").setValue(data[0].trainingregistrationprocess.transport_schedule);
                // f.down("[name=total_cost]").setValue(data[0].trainingregistrationprocess.total_cost_schedule);
                //end updated by anas

                // f.down("[name=caption]").setValue(data[0].trainingregistrationprocess.caption);
                // f.down("[name=budget_caption]").setValue(data[0].trainingregistrationprocess.budget_caption);
                // f.down("[name=balance_budget_employee]").setValue(data[0].trainingregistrationprocess.balance_budget_employee);
                // f.down("[name=extra_budget]").setValue(data[0].trainingregistrationprocess.extra_budget);

                // var year = new Date().getFullYear();
                // f.down("[name=periode_budget]").setValue(year);

                // me.getAllBudgetTypeProcessIntranet(data[0].trainingregistrationprocess.employee_id, data[0].trainingregistrationprocess.trainingschedule_id);
            }
        }).read('getdetailintranet');
        
    },
    getAllBudgetTypeProcessIntranet: function (employee_id, sch_id) {
        var me = this;
        f = me.getFormprocessintranet();

        var periode_budget = f.down("[name=periode_budget]").getValue();
        f.down("[name=balance_budget]").setValue('');
        
        me.tools.ajax({
            params: {trainingschedule_id: sch_id, periode:periode_budget},
            success: function (data, model) {
                console.log(data);
                console.log(data.trainingcaption);
                me.tools.wesea(data.trainingcaption, f.down("[name=trainingcaption_id]")).comboBox();
                
                me.getFormprocessintranet().down("[name=trainingcaption_id]").select(data.others[1][0][0].trainingcaption_id);
                //me.getFormdata().down("[name=balance_budget]").setValue(data.others[1][0][0].budget);

                if(data.others[1][0][0].lockbudget == '0'){
                    f.down("[name=balance_budget]").setValue('');
                    var e_id = employee_id;
                    if(e_id){
                        me.tools.ajax({
                        params: {employee_id: e_id},
                        success: function (data, model) {
                            console.log(data);
                            
                            var choose_periode = f.down("[name=periode_budget]").getValue();
                            f.down("[name=balance_budget_employee]").setValue('');
                            me.tools.ajax({
                                params: {employee_id: e_id, choose_periode: choose_periode},
                                success: function (data, model) {
                                    var budget_rp = data.others[1][0][0].budget;
                                    me.getFormprocessintranet().down("[name=balance_budget_employee]").setValue(budget_rp);
                                    me.totalExtraBudgetProcessIntranet();
                                    }
                                }).read('getED_budget');
                            }
                        }).read('getED');
                    }

                }

                if(data.others[1][0][0].lockbudget == '1'){
                    f.down("[name=balance_budget_employee]").setValue('');
                    me.getFormprocessintranet().down("[name=balance_budget]").setValue(data.others[2][0][0].budget);
                    me.totalExtraBudgetLockBudgetProcessIntranet();
                }
            }
        }).read('getATC');
        
    },
    totalExtraBudgetProcessIntranet: function () {
        var me = this;
        f = me.getFormprocessintranet()
        var budgetemp = f.down("[name=balance_budget_employee]").getValue();
        var totalcost = f.down("[name=total_cost]").getValue();
        f.down("[name=extra_budget]").setValue('');
        f.down("[name=hc_approve_reject]").setValue(false);
        f.down('[name=hc_approve_extra]').setReadOnly(true);
        var totalextra = parseFloat(budgetemp.replace(/,/g, '')||0) - parseFloat(totalcost.replace(/,/g, '')||0);
        
        if(totalextra < 0){
            totalextra = Math.abs(totalextra);
            me.getFormprocessintranet().down("[name=extra_budget]").setValue(totalextra);
            me.getFormprocessintranet().down("[name=hc_approve_reject]").setValue(true);
            me.getFormprocessintranet().down('[name=hc_approve_extra]').setReadOnly(false);
        }
        
    },
    totalExtraBudgetLockBudgetProcessIntranet: function () {
        var me = this;
        f = me.getFormprocessintranet()
        var budgetemp = f.down("[name=balance_budget]").getValue();
        var totalcost = f.down("[name=total_cost]").getValue();
        f.down("[name=extra_budget]").setValue('');
        f.down("[name=hc_approve_reject]").setValue(false);
        f.down('[name=hc_approve_extra]').setReadOnly(true);
        var totalextra = parseFloat(budgetemp.replace(/,/g, '')||0) - parseFloat(totalcost.replace(/,/g, '')||0);
        
        if(totalextra < 0){
            totalextra = Math.abs(totalextra);
            me.getFormprocessintranet().down("[name=extra_budget]").setValue(totalextra);
            me.getFormprocessintranet().down("[name=hc_approve_reject]").setValue(true);
            me.getFormprocessintranet().down('[name=hc_approve_extra]').setReadOnly(false);
        }
        
    },
    processApproveTraining: function(){
        var me = this;
        g = me.getGridintranet();
        s = g.getStore();
        f = me.getFormprocessintranet();
        var rec = g.getSelectedRecord();
        var id = rec.get("trainingregister_id");
        var sch_id = rec.get("trainingschedule_id");

        //added by anas 18052022
        var rows = g.getSelectionModel().getSelection();
        var index = s.indexOf(rows[0]);
        // hc_approve_reject = f.down("[name=hc_approve_reject]").getValue();
        // hc_approve_extra = f.down("[name=hc_approve_extra]").getValue();

        me.tools.ajax({
            params: {
                'trainingregister_id': id,
                // 'hc_approve_reject': hc_approve_reject,
                // 'hc_approve_extra': hc_approve_extra
                
                //added by anas 17052022
                'trainingschedule_id': sch_id
            },
            success: function (data, model) {
                f.up("window").close();
                // s.reload();

                //added by anas 18052022
                Ext.Msg.show({
                    title: 'Success',
                    msg: "Success",
                    icon: Ext.Msg.INFO,
                    buttons: Ext.Msg.OK
                });
                s.removeAt(index);
            },            
            //added by anas 18052022
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
    processRejectTraining: function(){
        var me = this;
        g = me.getGridintranet();
        var rec = g.getSelectedRecord();
        var id = rec.get("trainingregister_id");
        me.instantWindow("FormTrainingRegistrationReject", 450, "Training Employee [Reject]", "reject", "formtrainingregistrationreject");
    },
    submitRejectTraining: function(){
        var me = this;
        g = me.getGridintranet();
        f = me.getFormrejectintranet();
        var rec = g.getSelectedRecord();
        var id = rec.get("trainingregister_id");
        hc_reject_comment = f.down("[name=hc_reject_comment]").getValue();
        
        me.tools.ajax({
            params: {
                'trainingregister_id': id,
                'hc_reject_comment': hc_reject_comment
            },
            success: function (data, model) {
                f.up("window").close();
                s.reload();

                //added by anas 18052022
                Ext.Msg.show({
                    title: 'Success',
                    msg: "Success",
                    icon: Ext.Msg.INFO,
                    buttons: Ext.Msg.OK
                });
                s.removeAt(index);
                
            },            
            //added by anas 18052022
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
        }).read('rejectIntranet');
    },
    processRejectTrainingDetail: function(){
        var me = this;
        g = me.getGridemployee();
        var rec = g.getSelectedRecord();
        var id = rec.get("trainingregister_id");
        me.instantWindow("FormTrainingRegistrationRejectDetail", 450, "Training Employee [Reject]", "reject", "formtrainingregistrationrejectdetail");
    },
    submitRejectTrainingDetail: function(){
        var me = this;
        g = me.getGridemployee();
        f = me.getFormrejectdetail();
        var rec = g.getSelectedRecord();
        var id = rec.get("trainingregister_id");
        hc_reject_comment = f.down("[name=hc_reject_comment]").getValue();
        
        me.tools.ajax({
            params: {
                'trainingregister_id': id,
                'hc_reject_comment': hc_reject_comment
            },
            success: function (data, model) {
                f.up("window").close();
                s.reload();
                
            }
        }).read('rejectIntranet');
    },
});