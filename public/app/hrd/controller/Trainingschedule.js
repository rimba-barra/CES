Ext.define('Hrd.controller.Trainingschedule', {
    extend: 'Hrd.template.ControllerForMaster',
    alias: 'controller.Trainingschedule',
    controllerName: 'trainingschedule',
    fieldName: 'name',
    bindPrefixName: 'Trainingschedule',
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
    refs: [
        {
            ref: 'griddetail',
            selector: 'trainingschedulegriddetail'
        },
        {
            ref: 'gridlookupe',
            selector: 'lookupemployeetraininggrid'
        },
        {
            ref: 'formsearchlookupe',
            selector: 'lookupemployeetrainingformsearch'
        },
        {
            ref: 'formcopy',
            selector: 'trainingscheduleformcopy'
        },
        {
            ref: 'griddate',
            selector: 'trainingscheduleddgrid'
        },
        {
            ref: 'formdata',
            selector: 'trainingscheduleformdata'
        },
        {
            ref: 'gridemp',
            selector: 'employeetraininggriddetail'
        },
        {
            ref: 'gridformbanding',
            selector: 'trainingscheduleformbandinggrid'
        },
        {
            ref: 'gridbanding',
            selector: 'trainingschedulebandinggrid'
        },
        {
            ref: 'formbanding',
            selector: 'trainingscheduleformbanding'
        },
        {
            ref: 'gridsharepp',
            selector: 'trainingscheduleshareppgrid'
        },
        {
            ref: 'gridsharetn',
            selector: 'trainingschedulesharetngrid'
        },
        {
            ref: 'formshare',
            selector: 'trainingscheduleformshare'
        },

    ],
    init: function() {
        var me = this;
        
        me.tools = new Hrd.library.box.tools.Tools({config: me.myConfig});
        
        var events = new Hrd.library.box.tools.EventSelector();
        this.control(events.getEvents(me, me.controllerName));
        
        var newEvs = {};
        var hourObjects = ['timestart', 'timeend'];
        for (var x in hourObjects) {
            this.control(events.timeInput('trainingscheduleformdata', me.tools.inputHoursObjects(hourObjects[x])));

        }

        newEvs['employeetraininggriddetail button[action=addDetail]'] = {
            click: function () {
                me.addDetail('create');
            }
        };

        newEvs['lookupemployeetrainingformsearch'] = {
            afterrender: function () {
                var me,form;
                me = this;
                f = me.getFormsearchlookupe();
                // me.tools.ajax({
                //     params: {
                //     },
                //     success: function(data, model) {
                //         // me.tools.wesea(data.banding, f.down("[name=banding_id]")).comboBox();
                //         // me.tools.wesea(data.projectsh, f.down("[name=project_id]")).comboBox();
                //         // me.tools.wesea(data.pt, f.down("[name=pt_id]")).comboBox();
                        
                //         // f.down("[name=project_id]").setValue(parseInt(apps.project));
                //         // f.down("[name=pt_id]").setValue(parseInt(apps.pt));                     
                //     }
                // }).read('parameter');    
            },
           
        };
        
        newEvs['lookupemployeetrainingformsearch button[action=search]'] = {
            click: function () {
                this.lookupEmployee();              
            }
        };

        newEvs['lookupemployeetrainingformsearch button[action=reset]'] = {
            click: function () {
               form = me.getFormsearchlookupe().getForm().reset();
               this.lookupEmployee();
            }
        };

        newEvs['#employeetrainingLookup lookupemployeetraininggrid button[action=select]'] = {
            click: function () {
                me.selectEmployee();
            }
        };

        newEvs['button[action=deleteDetail]'] = {
            click: function () {
                me.delEmp();           
            }
        }; 

        newEvs['button[action=invitedDetail]'] = {
            click: function () {
                me.invitedEmp();           
            }
        }; 

        //date
        newEvs['button[action=generatedate]'] = {
            click: function () {
                me.generateDate();           
            }
        };
        newEvs['button[action=deletedate]'] = {
            click: function () {
                me.delDate();           
            }
        };

        //Banding
        newEvs['button[action=choose_formbanding]'] = {
            click: function () {
                me.formBandingTrainingSchedule();
            },
        };

        newEvs['button[action=delete_formbanding]'] = {
            click: function () {
                me.formDeleteBandingTrainingSchedule();
            },
        };

        newEvs['trainingscheduleformbanding'] = {
            afterrender: function () {
                me.formBandingTrainingScheduleAfterRender();
            }
        };

        newEvs['button[action=save_trainingbanding]'] = {
            click: function () {
                me.processBandingTrainingSchedule();
            },
        };

        //GENERATE DATE TANPE CLICK BUTTON
        newEvs['trainingscheduleformdata [name=enddate]'] = {
            //updated by anas 04082022 | focus to change
            change: function () {
                me.generateDateLangsung();
            }
        };

        newEvs['trainingscheduleformdata [name=timestart]'] = {
            focus: function () {
                me.generateDateLangsung();
            }
        };

        //SHARE PROJECT PT
        newEvs['button[action=share_trainingschedule]'] = {
            click: function () {
                me.formShareTrainingSchedule();
            },
        };

        newEvs['trainingscheduleformshare'] = {
            afterrender: function () {
                me.formShareTrainingScheduleAfterRender();
            }
        };

        newEvs['button[action=processshare_trainingschedule]'] = {
            click: function () {
                me.processShareTrainingSchedule();
            },
        };

        //PERIODE
        newEvs['trainingscheduleformdata [name=periode]'] = {
            change: function () {
                me.ChangePeriode();
            },
        };

        //added by anas 04042022
        newEvs['trainingscheduleformdata [name=trainingbudgetprogram_id]'] = {
            change: function () {
                me.ChangeTrainingBudgetProgram();
            },
        };
        
        this.control(newEvs);
    },
    mainDataSave: function(){
        var me, grid, rows, data, row, counter, countarray, act_name, fields, accesslevel_id;
        me = this;
        
        var f = me.getFormdata();
        var g = me.getGrid();
        var s = g.getStore();
        
        if(f.down('[name=trainingschedule_id]').getValue() == '' || f.down('[name=trainingschedule_id]').getValue() == null){
           trainingschedule_id = 0;
        } else {
           trainingschedule_id = f.down('[name=trainingschedule_id]').getValue();
        }
        if(f.down('[name=trainingname_id]').getValue() == '' || f.down('[name=trainingname_id]').getValue() == null){
            me.tools.alert.warning("Choose your training");
            return false;
        } else {
           trainingname_id = f.down('[name=trainingname_id]').getValue();
        }
        if(f.down('[name=periode]').getValue() == '' || f.down('[name=periode]').getValue() == null){
            me.tools.alert.warning("Periode is required");
            return false;
        } else {
           periode = f.down('[name=periode]').getValue();
        }
        if(f.down('[name=batch]').getValue() == '' || f.down('[name=batch]').getValue() == null){
           me.tools.alert.warning("Batch is required");
            return false;
        } else {
           batch = f.down('[name=batch]').getValue();
        }
        if(f.down('[name=timestart]').getValue() == '00:00:00' || f.down('[name=timestart]').getValue() == null){
           me.tools.alert.warning("Time Start is required");
            return false;
        } else {
           timestart = f.down('[name=timestart]').getValue();
        }
        if(f.down('[name=timeend]').getValue() == '00:00:00' || f.down('[name=timeend]').getValue() == null){
           me.tools.alert.warning("Time End is required");
            return false;
        } else {
           timeend = f.down('[name=timeend]').getValue();
        }
        
        if(f.down('[name=peserta]').getValue() == '' || f.down('[name=peserta]').getValue() == null){
           me.tools.alert.warning("Peserta is required");
            return false;
        } else {
            peserta = f.down('[name=peserta]').getValue();
        }
        if(f.down('[name=quota]').getValue() == '' || f.down('[name=quota]').getValue() == null){
           me.tools.alert.warning("Quota is required");
            return false;
        } else {
           quota = f.down('[name=quota]').getValue();
        }
        
        if(f.down('[name=venue]').getValue() == '' || f.down('[name=venue]').getValue() == null){
           me.tools.alert.warning("Venue is required");
            return false;
        } else {
           venue = f.down('[name=venue]').getValue();
        }

        

           publish = f.down('[name=publish]').getValue();
        
           description = f.down('[name=description]').getValue();

           estimated = f.down('[name=estimated]').getValue();


        // TRAINING BUDGETPROGRAM ID --------------------------------------------------------------------------------------------
        if(f.down('[name=trainingbudgetprogram_id]').getValue() == '' || f.down('[name=trainingbudgetprogram_id]').getValue() == null){
            flag_ok = 0;
            me.tools.alert.warning("Budget Program is required");
            return false;
        } else {
            flag_ok = 1;
            trainingbudgetprogram_id = f.down('[name=trainingbudgetprogram_id]').getValue();
        }


        // if(f.down('[name=startdate]').getValue() == '' || f.down('[name=startdate]').getValue() == null){
        //    startdate = 0;
        // } else {
        //    startdate = f.down('[name=startdate]').getValue();
        // }
        // if(f.down('[name=enddate]').getValue() == '' || f.down('[name=enddate]').getValue() == null){
        //    enddate = 0;
        // } else {
        //    enddate = f.down('[name=enddate]').getValue();
        // }

        //added by anas 27052022
        startdate = '';
        enddate = '';

        if(f.down('[name=startdate]').getValue() == '' || f.down('[name=startdate]').getValue() == null){
            me.tools.alert.warning("Start Date is required");
            return false;
        } else {
            startdate = f.down('[name=startdate]').getValue();
        }
        if(f.down('[name=enddate]').getValue() == '' || f.down('[name=enddate]').getValue() == null){
            me.tools.alert.warning("End Date is required");
            return false;
        } else {
            enddate = f.down('[name=enddate]').getValue();
        }
        //CEK DATE TIDAK BOLEH LEBIH BESAR DARI STARTNYA
        if(startdate && enddate){
            if(Date.parse(startdate) > Date.parse(enddate)){
               me.tools.alert.warning("End Date harus lebih besar dari Star Date");
                startdate = '';
                enddate = '';

               return false;
            }
            else{
               startdate = startdate;
               enddate = enddate;
               //updated by anas 04082022
               if(me.getGriddate().getStore().data.length <= 0)
               {
                   me.generateDateLangsung();
               }
            }
        }

        timestart = '';
        timeend = '';
        if(f.down('[name=timestart]').getValue() == '00:00:00' || f.down('[name=timestart]').getValue() == null){
            me.tools.alert.warning("Start Time is required");
            return false;
        } else {
            timestart = f.down('[name=timestart]').getValue();
        }
        if(f.down('[name=timeend]').getValue() == '00:00:00' || f.down('[name=timeend]').getValue() == null){
            me.tools.alert.warning("Start End is required");
            return false;
        } else {
            timeend = f.down('[name=timeend]').getValue();
        }
        //CEK WAKTU TIDAK BOLEH LEBIH BESAR DARI STARTNYA
        if(timestart && timeend){
            if(Date.parse("01/01/2000 "+timestart) > Date.parse("01/01/2000 "+timeend)){
                me.tools.alert.warning("End Time harus lebih besar dari Start Time");
                timestart = '';
                timeend = '';
                return false;
            }
            else{
               timestart = timestart;
               timeend = timeend;

               //updated by anas 04082022
               if(me.getGriddate().getStore().data.length <= 0)
               {
                   me.generateDateLangsung();
               }
            }
        }
        //end added by anas

        gfc = me.getGridformbanding();
        sgfc = gfc.getStore();

        ge = me.getGridemp();
        sge = ge.getStore();

        if(f.down('[name=peserta]').getValue() == 2 && sgfc.totalCount == 0)
        {
            me.tools.alert.warning("Please Insert Banding List");
            return false;
        }
        if(f.down('[name=peserta]').getValue() == 3 && sge.totalCount == 0)
        {
            me.tools.alert.warning("Please Insert Employee List");
            return false;
        }

        //added by anas 17062022
        duration = f.down('[name=duration]').getValue();

        me.tools.ajax({
            params: {
                'trainingschedule_id': trainingschedule_id,
                'trainingname_id': trainingname_id,
                'trainingbudgetprogram_id': trainingbudgetprogram_id,
                'periode': periode,
                'batch': batch,
                'timestart': timestart,
                'timeend': timeend,
                'peserta': peserta,
                'venue': venue,
                'description': description,
                'estimated': estimated,
                'startdate': startdate,
                'enddate': enddate,
                'quota': quota,
                'publish': publish
                //added by anas 17062022
                , 'duration' : duration
            },
            success: function (data, model) {
                f.up("window").close();
                s.reload();
                
            }
        }).read('saveheader');
    },

    lookupEmployee: function(){
        var me, form, pt_id, project_id, department_id, grid;
        me = this;
        form = me.getFormsearchlookupe();
        
        if(form.down('[name=pt_id]').getValue() == '' || form.down('[name=pt_id]').getValue() == null){
           pt_id = 0;
        } else {
           pt_id = form.down('[name=pt_id]').getValue();
        }
        
        if(form.down('[name=project_id]').getValue()==null){
           project_id = 0;
        }else{
           project_id = form.down('[name=project_id]').getValue();
        }
                
        if(form.down('[name=banding_id]').getValue()==null){
           banding_id = 0;
        }else{
           banding_id = form.down('[name=banding_id]').getValue();
        }
        
        if(form.down('[name=employee_nik]').getValue() == null){
           employee_nik = 0;
        } else {
           employee_nik = form.down('[name=employee_nik]').getValue();
        }
        
        if(form.down('[name=employee_name]').getValue()==null){
           employee_name = 0;
        }else{
           employee_name = form.down('[name=employee_name]').getValue();
        }
        
        grid = me.getGridlookupe();             
        grid.setLoading("Please wait...");              
        var accesslevel_id = me.getFormdata().down("[name=accesslevel_id]").getValue();     
        me.tools.ajax({
            params: {
                'accesslevel_id':accesslevel_id,
                'employee_nik': employee_nik,
                'employee_name': employee_name,
                'banding_id': banding_id,
                'project_id': project_id,
                'pt_id': pt_id
            },
            success: function(data, model) {
                me.tools.wesea({data: data, model: model}, grid).grid();                
                grid.setLoading(false);
            }
        }).read('employeelist');
    },
    // selectEmployee: function () {
    //     var me, grid, rows, data, row, counter, countarray, act_name, fields, accesslevel_id;
    //     me = this;
    //     grid = me.getGridlookupe();
    //     rows = grid.getSelectionModel().getSelection();
    //     if (rows.length < 1) {
    //         Ext.Msg.alert('Info', 'No record selected..!');
    //         return;
    //     } else {
            
    //         var p = grid.up("window").down("panel");
    //         p.setLoading("Please wait...");
            
    //         countarray  = rows.length;
    //         counter     = 0;
    //         // accesslevel_id = me.getFormdata().down("[name=accesslevel_id]").getValue();
            
    //         for (var i = 0; i < rows.length; i++) {
                
    //             //data["details"] = me.getGriddetail().getJson();
    //             me.tools.ajax({
    //                 params: {
    //                     // 'accesslevel_id': accesslevel_id,
    //                     'employee_id'   : rows[i]['data'].employee_id,
                        
    //                 },
    //                 success: function (data, model) {
    //                     counter++;
    //                     if (countarray == counter) {
                            
    //                         var detailGrid = me.getGriddetail();
    //                         detailGrid.doInit();
    //                         detailGrid.getStore().load({
    //                             params: {
    //                                 // 'accesslevel_id': accesslevel_id,
    //                             },                              
    //                             callback: function (recs, op) {
    //                                 detailGrid.attachModel(op);                                 
    //                                 grid.up("window").close();
    //                                 p.setLoading(false);
                                    
    //                             }
    //                         });                         
    //                     }
    //                 }
    //             }).read('selectemployee');
                
    //         }
            
    //     }
    // },
    validasiform : function(halforfull){
        var me = this;
        var f = me.getFormdata();
        var flag_ok = 0;

        // TRAINING SCHEDULE ID --------------------------------------------------------------------------------------------
        if(f.down('[name=trainingschedule_id]').getValue() == '' || f.down('[name=trainingschedule_id]').getValue() == null){
           trainingschedule_id = 0;
        } else {
           trainingschedule_id = f.down('[name=trainingschedule_id]').getValue();
        }


        // TRAINING NAME ID --------------------------------------------------------------------------------------------
        if(f.down('[name=trainingname_id]').getValue() == '' || f.down('[name=trainingname_id]').getValue() == null){
            flag_ok = 0;
            me.tools.alert.warning("Choose your training");
            return false;
        } else {
            flag_ok = 1;
            trainingname_id = f.down('[name=trainingname_id]').getValue();
        }

        // PERIODE --------------------------------------------------------------------------------------------
        if(f.down('[name=periode]').getValue() == '' || f.down('[name=periode]').getValue() == null){
            flag_ok = 0;
            me.tools.alert.warning("Periode is required");
            return false;
        } else {
            flag_ok = 1;
            periode = f.down('[name=periode]').getValue();
        }

        // BATCH --------------------------------------------------------------------------------------------
        if(f.down('[name=batch]').getValue() == '' || f.down('[name=batch]').getValue() == null){
            flag_ok = 0;
            me.tools.alert.warning("Batch is required");
            return false;
        } else {
            flag_ok = 1;
            batch = f.down('[name=batch]').getValue();
        }
        
        // TRAINING BUDGETPROGRAM ID --------------------------------------------------------------------------------------------
        if(f.down('[name=trainingbudgetprogram_id]').getValue() == '' || f.down('[name=trainingbudgetprogram_id]').getValue() == null){
            flag_ok = 0;
            // me.tools.alert.warning("Budget Program is required");
            return false;
        } else {
            flag_ok = 1;
            trainingbudgetprogram_id = f.down('[name=trainingbudgetprogram_id]').getValue();
        }

        // DATE --------------------------------------------------------------------------------------------
        // if(f.down('[name=startdate]').getValue() == '' || f.down('[name=startdate]').getValue() == null){
        //     flag_ok = 0;
        //     startdate = 0;
        //     me.tools.alert.warning("Start Date is required");
        //     return false;
        // } else {
        //     flag_ok = 1;
        //     startdate = f.down('[name=startdate]').getValue();
        // }
        // if(f.down('[name=enddate]').getValue() == '' || f.down('[name=enddate]').getValue() == null){
        //     flag_ok = 0;
        //     enddate = 0;
        //     me.tools.alert.warning("End Date is required");
        //     return false;
        // } else {
        //     flag_ok = 1;
        //     enddate = f.down('[name=enddate]').getValue();
        // }
        // //CEK DATE TIDAK BOLEH LEBIH BESAR DARI STARTNYA
        // if(startdate && enddate){
        //     if(Date.parse(startdate) > Date.parse(enddate)){
        //        me.tools.alert.warning("Silahkan cek kembali Start Date dan End Date yang dipilih");
        //        startdate = 0;
        //        enddate = 0;
        //        var today = new Date();
        //        f.down('[name=startdate]').setValue(today);
        //        f.down('[name=enddate]').setValue(today);
        //        flag_ok = 0;
        //        return false;
        //     }
        //     else{
        //        startdate = startdate;
        //        enddate = enddate;
        //        flag_ok = 1;
        //     }
        // }

        if(halforfull == 'full'){

            // TIME --------------------------------------------------------------------------------------------
            if(f.down('[name=timestart]').getValue() == '00:00:00' || f.down('[name=timestart]').getValue() == null){
                flag_ok = 0;
                timestart = 0;
                me.tools.alert.warning("Start Time is required");
                return false;
            } else {
                flag_ok = 1;
                timestart = f.down('[name=timestart]').getValue();
            }
            if(f.down('[name=timeend]').getValue() == '00:00:00' || f.down('[name=timeend]').getValue() == null){
                flag_ok = 0;
                timeend = 0;
                me.tools.alert.warning("Start End is required");
                return false;
            } else {
                flag_ok = 1;
                timeend = f.down('[name=timeend]').getValue();
            }
            //CEK WAKTU TIDAK BOLEH LEBIH BESAR DARI STARTNYA
            if(timestart && timeend){   
                var fromTokens = timestart.split(":");
                var toTokens = timeend.split(":");

                if(fromTokens[0] < toTokens[0] || 
                    (fromTokens[0] == toTokens[0] && fromTokens[1] < toTokens[1]) || 
                    (fromTokens[0] == toTokens[0] && fromTokens[1] == toTokens[1] && fromTokens[2] < toTokens[2])){
                    timestart = timestart;
                    timeend = timeend;
                    flag_ok = 1;
                }else{
                    me.tools.alert.warning("Silahkan cek kembali Start Time dan End Time yang dipilih");
                    timestart = 0;
                    timeend = 0;
                    var timezero = '00:00:00';
                    f.down('[name=timestart]').setValue(timezero);
                    f.down('[name=timeend]').setValue(timezero);
                    flag_ok = 0;
                    return false;
                }

            }

            // PESERTA --------------------------------------------------------------------------------------------
            if(f.down('[name=peserta]').getValue() == '' || f.down('[name=peserta]').getValue() == null){
                peserta = 0;
                flag_ok = 0;
                me.tools.alert.warning("Peserta is required");
                return false;
            } else {
                flag_ok = 1;
                peserta = f.down('[name=peserta]').getValue();
            }
            
            // QUOTA --------------------------------------------------------------------------------------------
            if(f.down('[name=quota]').getValue() == '' || f.down('[name=quota]').getValue() == null){
                quota = 0;
                flag_ok = 0;
                me.tools.alert.warning("Quota is required");
                return false;
            } else {
                flag_ok = 1;
                quota = f.down('[name=quota]').getValue();
            }

            // VENUE --------------------------------------------------------------------------------------------
            if(f.down('[name=venue]').getValue() == '' || f.down('[name=venue]').getValue() == null){
                venue = 0;
                flag_ok = 0;
                me.tools.alert.warning("Venue is required");
                return false;
            } else {
                flag_ok = 1;
                venue = f.down('[name=venue]').getValue();
            }

        }

        return flag_ok;
        // publish = f.down('[name=publish]').getValue();
        // description = f.down('[name=description]').getValue();
        // estimated = f.down('[name=estimated]').getValue();
    },
    fieldform: function(){
        var me = this;
        var f = me.getFormdata();
        
        var fieldform = new Object();

        fieldform['trainingschedule_id']            = f.down('[name=trainingschedule_id]').getValue();
        fieldform['trainingname_id']                = f.down('[name=trainingname_id]').getValue();
        fieldform['periode']                        = f.down('[name=periode]').getValue();
        fieldform['batch']                          = f.down('[name=batch]').getValue();
        fieldform['trainingbudgetprogram_id']       = f.down('[name=trainingbudgetprogram_id]').getValue();

        fieldform['startdate']                      = f.down('[name=startdate]').getValue();
        fieldform['enddate']                        = f.down('[name=enddate]').getValue();
        fieldform['timestart']                      = f.down('[name=timestart]').getValue();
        fieldform['timeend']                        = f.down('[name=timeend]').getValue();
        fieldform['peserta']                        = f.down('[name=peserta]').getValue();

        fieldform['quota']                          = f.down('[name=quota]').getValue();
        fieldform['venue']                          = f.down('[name=venue]').getValue();
        fieldform['publish']                        = f.down('[name=publish]').getValue();
        fieldform['description']                    = f.down('[name=description]').getValue();
        fieldform['estimated']                      = '';

        return fieldform;
    },
    generateDateLangsung: function (el) {
        var me = this;
        var f = me.getFormdata();
        var g = me.getGrid();
        var s = g.getStore();
        // var p = me.getPanel();

        var validasi = me.validasiform('half');
        var field = me.fieldform();

        if(validasi){

            me.tools.ajax({
                params: {
                    'trainingschedule_id': field.trainingschedule_id,
                    'trainingname_id': field.trainingname_id,
                    'periode': field.periode,
                    'trainingbudgetprogram_id':field.trainingbudgetprogram_id,
                    'batch': field.batch,
                    'timestart': field.timestart,
                    'timeend': field.timeend,
                    'peserta': field.peserta,
                    'venue': field.venue,
                    'description': field.description,
                    'estimated': field.estimated,
                    'startdate': field.startdate,
                    'enddate': field.enddate,
                    'quota': field.quota,
                    'publish': field.publish

                    //added by anas 17062022
                    , 'duration': field.duration
                },
                success: function (data, model) {
                    var hasil = data.others[0][0]['HASIL'];
                    // var date = data.others[0][0]['DATE'][1];
                    if(hasil >= 1){
                        me.getFormdata().down("[name=trainingschedule_id]").setValue(hasil);
                        s.reload();
                        var gd = me.getGriddate();
                        // me.tools.wesea({data: date, model: model}, gd).grid();
                        var sgd = gd.getStore();
                        sgd.reload();

                        me.tools.ajax({
                            params: {
                                'trainingschedule_id': hasil,
                                'trainingname_id': field.trainingname_id,
                                'periode': field.periode,
                                'trainingbudgetprogram_id':field.trainingbudgetprogram_id,
                                'batch': field.batch,
                                'timestart': field.timestart,
                                'timeend': field.timeend,
                                'peserta': field.peserta,
                                'venue': field.venue,
                                'description': field.description,
                                'estimated': field.estimated,
                                'startdate': field.startdate,
                                'enddate': field.enddate,
                                'quota': field.quota,
                                'publish': field.publish

                                //added by anas 17062022
                                , 'duration': field.duration
                            },
                            success: function(data, model) {
                                me.tools.wesea({data: data, model: model}, gd).grid();
                            }
                        }).read('trainingdate');
                    }
                }
            }).read('saveheader');

        }
    },
    generateDate: function (el) {
        var me = this;
        var f = me.getFormdata();
        var g = me.getGrid();
        var s = g.getStore();
        // var p = me.getPanel();

        var validasi = me.validasiform('full');
        var field = me.fieldform();

        if(validasi){
            
            me.tools.ajax({
                params: {
                    'trainingschedule_id': field.trainingschedule_id,
                    'trainingname_id': field.trainingname_id,
                    'periode': field.periode,
                    'trainingbudgetprogram_id':field.trainingbudgetprogram_id,
                    'batch': field.batch,
                    'timestart': timestart,
                    'timeend': field.timeend,
                    'peserta': field.peserta,
                    'venue': field.venue,
                    'description': field.description,
                    'estimated': field.estimated,
                    'startdate': field.startdate,
                    'enddate': field.enddate,
                    'quota': field.quota,
                    'publish': field.publish
                    //added by anas 17062022
                    , 'duration': field.duration
                },
                success: function (data, model) {
                    var hasil = data.others[0][0]['HASIL'];
                    // var date = data.others[0][0]['DATE'][1];
                    if(hasil >= 1){
                        me.getFormdata().down("[name=trainingschedule_id]").setValue(hasil);
                        s.reload();
                        var gd = me.getGriddate();
                        // me.tools.wesea({data: date, model: model}, gd).grid();
                        var sgd = gd.getStore();
                        sgd.reload();

                        me.tools.ajax({
                            params: {
                                'trainingschedule_id': hasil,
                                'trainingname_id': field.trainingname_id,
                                'periode': field.periode,
                                'trainingbudgetprogram_id':field.trainingbudgetprogram_id,
                                'batch': field.batch,
                                'timestart': field.timestart,
                                'timeend': field.timeend,
                                'peserta': field.peserta,
                                'venue': field.venue,
                                'description': field.description,
                                'estimated': field.estimated,
                                'startdate': field.startdate,
                                'enddate': field.enddate,
                                'quota': field.quota,
                                'publish': field.publish
                                //added by anas 17062022
                                , 'duration': field.duration
                            },
                            success: function(data, model) {
                                me.tools.wesea({data: data, model: model}, gd).grid();
                            }
                        }).read('trainingdate');
                    }
                }
            }).read('saveheader');

        }
    },
    delDate: function() {
        var me = this;
        var g = me.getGriddate();
        var selected = g.getSelectionModel().getSelection();
        var ids = "";
        var sgd = g.getStore();
        var f = me.getFormdata();
        // var p = me.getPanel();

        // console.log(selected);
        if (selected.length > 0) {
            for (var i in selected) {
                console.log(selected[i]);
                ids += selected[i]['data']["trainingscheduledate_id"] + "~";
            }
            // console.log(ids);

            var validasi = me.validasiform('full');
            var field = me.fieldform();

            if(validasi){
                me.tools.ajax({
                    params: {
                        'ids': ids,
                        'trainingschedule_id': field.trainingschedule_id,
                        'trainingname_id': field.trainingname_id,
                        'periode': field.periode,
                        'trainingbudgetprogram_id':field.trainingbudgetprogram_id,
                        'batch': field.batch,
                        'timestart': field.timestart,
                        'timeend': field.timeend,
                        'peserta': field.peserta,
                        'venue': field.venue,
                        'description': field.description,
                        'estimated': field.estimated,
                        'startdate': field.startdate,
                        'enddate': field.enddate,
                        'quota' : field.quota,
                        'publish' : field.publish
                    },
                    success: function(data, model) {
                        sgd.reload();
                        me.tools.wesea({data: data, model: model}, g).grid();
                        sgd.reload();
                    }
                }).read('deldate');

            }

        }

    },
    getAllDate: function (el) {
        var me = this;
        var f = me.getFormdata();
        var g = me.getGrid();
        var s = g.getStore();
        // var p = me.getPanel();
        var trainingschedule_id = f.down('[name=trainingschedule_id]').getValue();

        var gd = me.getGriddate();
                    var sgd = gd.getStore();
                    sgd.reload();

                    me.tools.ajax({
                        params: {
                            'trainingschedule_id': trainingschedule_id,
                        },
                        success: function(data, model) {
                            me.tools.wesea({data: data, model: model}, gd).grid();
                        }
                    }).read('trainingdate_exist');
    },

    getAllEmp: function (el) {
        var me = this;
        var f = me.getFormdata();
        var g = me.getGrid();
        var s = g.getStore();
        // var p = me.getPanel();
        var trainingschedule_id = f.down('[name=trainingschedule_id]').getValue();

        var gd = me.getGridemp();
                    var sgd = gd.getStore();
                    sgd.reload();

                    me.tools.ajax({
                        params: {
                            'trainingschedule_id': trainingschedule_id,
                        },
                        success: function(data, model) {
                            me.tools.wesea({data: data, model: model}, gd).grid();
                        }
                    }).read('trainingemp_exist');
    },

    panelAfterRender: function (el) {
        var me = this;
        var f = me.getFormsearch();
        me.tools.ajax({
            params: {},
            success: function (data, model) {
                me.tools.wesea(data.trainingname, f.down("[name=trainingname_id]")).comboBox();
                // me.getAllDate();
            }
        }).read('detail');
    },
    fdar: function() {
        var me = this;
        var f = me.getFormdata();
        var g = me.getGrid();
        var gd = me.getGriddate();
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
                        me.tools.wesea(data.trainingname, f.down("[name=trainingname_id]")).comboBox();
                        // me.getAllDate();
                        // me.getAllEmp();
                        var year = new Date().getFullYear();
                        f.down("[name=periode]").setValue(year);
                    }
                }).read('detail');
            },
            update: function() {

                me.tools.ajax({
                    params: {
                    },
                    success: function(data, model) {
                        me.tools.wesea(data.trainingname, f.down("[name=trainingname_id]")).comboBox();
                        me.tools.wesea(data.trainingbudgetprogram, f.down("[name=trainingbudgetprogram_id]")).comboBox();
                        var rec = g.getSelectedRecord();
                        f.editedRow = g.getSelectedRow();
                        f.getForm().loadRecord(rec);
                        
                        if(rec.data.closed == 1){
                            // f.down('[name=trainingbudgetprogram_id]').setReadOnly(true);
                            // f.down('[name=apply_budget]').setReadOnly(true);
                            // f.down('[name=department_id]').setReadOnly(true);
                            // f.down('[name=banding_id]').setReadOnly(true);
                            // f.down('[name=employeestatus_id]').setReadOnly(true);
                            // f.down('[name=budget]').setReadOnly(true);
                            f.down("[action=save]").hide();
                            me.tools.alert.warning("Maaf data tersebut sudah closed, tidak bisa di edit kembali");
                        }

                        me.getAllDate();
                        me.getAllEmp();
                        me.getBandingExist();
                        // console.log(rec.get('private'));


                    }
                }).read('detail');


                me.unMask(1);

            }
        };
        return x;
    },
    addDetail: function (state) {
        var me = this;      
        
        var window = me.instantWindow("Panel", 500, "Employee", "create", "employeetrainingLookup", "lookup.employeetraining", {
            itemId: me.controllerName + 'employee'
        });
        
        f = me.getFormsearchlookupe();
        // f.down("[name=project_id]").setValue(parseInt(apps.project));
        // f.down("[name=pt_id]").setValue(parseInt(apps.pt)); 
        this.lookupEmployee();
    },
    lookupEmployee: function(){
        var me, form, pt_id, project_id, department_id, grid;
        me = this;
        form = me.getFormsearchlookupe();
        
        // if(form.down('[name=pt_id]').getValue() == '' || form.down('[name=pt_id]').getValue() == null){
        //    pt_id = 0;
        // } else {
        //    pt_id = form.down('[name=pt_id]').getValue();
        // }
        
        // if(form.down('[name=project_id]').getValue()==null){
        //    project_id = 0;
        // }else{
        //    project_id = form.down('[name=project_id]').getValue();
        // }
                
        // if(form.down('[name=banding_id]').getValue()==null){
        //    banding_id = 0;
        // }else{
        //    banding_id = form.down('[name=banding_id]').getValue();
        // }
        
        if(form.down('[name=employee_nik]').getValue() == null){
           employee_nik = 0;
        } else {
           employee_nik = form.down('[name=employee_nik]').getValue();
        }
        
        if(form.down('[name=employee_name]').getValue()==null){
           employee_name = 0;
        }else{
           employee_name = form.down('[name=employee_name]').getValue();
        }
        
        grid = me.getGridlookupe();             
        grid.setLoading("Please wait...");              
        // var accesslevel_id = me.getFormdata().down("[name=accesslevel_id]").getValue();     
        me.tools.ajax({
            params: {
                // 'accesslevel_id':accesslevel_id,
                'employee_nik': employee_nik,
                'employee_name': employee_name,
                'banding_id': 0,
                // 'project_id': project_id,
                // 'pt_id': pt_id

                'project_id': parseInt(apps.project),
                'pt_id': parseInt(apps.pt)
            },
            success: function(data, model) {
                me.tools.wesea({data: data, model: model}, grid).grid();                
                grid.setLoading(false);
            }
        }).read('employeelist');
    },
    selectEmployee: function () {
        var me, grid, rows, data, row, counter, countarray, act_name, fields, accesslevel_id;
        me = this;
        grid = me.getGridlookupe();
        rows = grid.getSelectionModel().getSelection();
        var ids = "";
        var f = me.getFormdata();
        var g = me.getGrid();
        var s = g.getStore();

        var ge = me.getGridemp();
        var sge = ge.getStore();
        // var p = me.getPanel();
        
        if(f.down('[name=trainingschedule_id]').getValue() == '' || f.down('[name=trainingschedule_id]').getValue() == null){
           trainingschedule_id = 0;
        } else {
           trainingschedule_id = f.down('[name=trainingschedule_id]').getValue();
        }
        if(f.down('[name=trainingname_id]').getValue() == '' || f.down('[name=trainingname_id]').getValue() == null){
            me.tools.alert.warning("Choose your training");
            return false;
        } else {
           trainingname_id = f.down('[name=trainingname_id]').getValue();
        }
        if(f.down('[name=periode]').getValue() == '' || f.down('[name=periode]').getValue() == null){
            me.tools.alert.warning("Periode is required");
            return false;
        } else {
           periode = f.down('[name=periode]').getValue();
        }
        if(f.down('[name=batch]').getValue() == '' || f.down('[name=batch]').getValue() == null){
           me.tools.alert.warning("Batch is required");
            return false;
        } else {
           batch = f.down('[name=batch]').getValue();
        }
        if(f.down('[name=timestart]').getValue() == '00:00:00' || f.down('[name=timestart]').getValue() == null){
           me.tools.alert.warning("Time Start is required");
            return false;
        } else {
           timestart = f.down('[name=timestart]').getValue();
        }
        if(f.down('[name=timeend]').getValue() == '00:00:00' || f.down('[name=timeend]').getValue() == null){
           me.tools.alert.warning("Time End is required");
            return false;
        } else {
           timeend = f.down('[name=timeend]').getValue();
        }
        
            peserta = f.down('[name=peserta]').getValue();
        
        if(f.down('[name=venue]').getValue() == '' || f.down('[name=venue]').getValue() == null){
           me.tools.alert.warning("Venue is required");
            return false;
        } else {
           venue = f.down('[name=venue]').getValue();
        }

        if(f.down('[name=quota]').getValue() == '' || f.down('[name=quota]').getValue() == null){
           me.tools.alert.warning("Quota is required");
            return false;
        } else {
           quota = f.down('[name=quota]').getValue();
        }

           publish = f.down('[name=publish]').getValue();
        
           description = f.down('[name=description]').getValue();

           estimated = f.down('[name=estimated]').getValue();
        

        // TRAINING BUDGETPROGRAM ID --------------------------------------------------------------------------------------------
        if(f.down('[name=trainingbudgetprogram_id]').getValue() == '' || f.down('[name=trainingbudgetprogram_id]').getValue() == null){
            flag_ok = 0;
            me.tools.alert.warning("Budget Program is required");
            return false;
        } else {
            flag_ok = 1;
            trainingbudgetprogram_id = f.down('[name=trainingbudgetprogram_id]').getValue();
        }

        if(f.down('[name=startdate]').getValue() == '' || f.down('[name=startdate]').getValue() == null){
           startdate = 0;
        } else {
           startdate = f.down('[name=startdate]').getValue();
        }
        if(f.down('[name=enddate]').getValue() == '' || f.down('[name=enddate]').getValue() == null){
           enddate = 0;
        } else {
           enddate = f.down('[name=enddate]').getValue();
        }
        
        if (rows.length > 0) {
            for (var i in rows) {
                // console.log(rows[i]);
                ids += rows[i]['data']["employee_id"] + "~";
            }
        }
        // console.log(ids);

        me.tools.ajax({
            params: {
                'trainingschedule_id': trainingschedule_id,
                'trainingname_id': trainingname_id,
                'trainingbudgetprogram_id': trainingbudgetprogram_id,
                'periode': periode,
                'batch': batch,
                'timestart': timestart,
                'timeend': timeend,
                'peserta': peserta,
                'venue': venue,
                'description': description,
                'estimated': estimated,
                'startdate': startdate,
                'enddate': enddate,
                'quota': quota,
                'publish': publish,

                //added by anas 17062022
                'duration': f.duration
            },
            success: function (data, model) {
                var hasil = data.others[0][0]['HASIL'];
                if(hasil >= 1){
                    me.getFormdata().down("[name=trainingschedule_id]").setValue(hasil);
                    // s.reload();

                    if (rows.length < 1) {
                        Ext.Msg.alert('Info', 'No record selected..!');
                        return;
                    } else {
                        me.tools.ajax({
                            params: {
                                ids: ids,
                                trainingschedule_id:me.getFormdata().down("[name=trainingschedule_id]").getValue()
                                
                            },
                            success: function(data, model) {
                                me.tools.wesea({data: data, model: model}, ge).grid();
                                grid.up("window").close();
                                // sge.reload();
                            }
                        }).read('selectemployee');
                        
                    }
                }
            }
        }).read('saveheader');
    },
    delEmp: function() {
        var me = this;
        var g = me.getGridemp();
        var selected = g.getSelectionModel().getSelection();
        var ids = "";
        var sgd = g.getStore();
        var f = me.getFormdata();

        // console.log(selected);
        if (selected.length > 0) {
            for (var i in selected) {
                // console.log(selected[i]);
                ids += selected[i]['data']["trainingscheduleemployee_id"] + "~";
            }
            // console.log(ids);

        if(f.down('[name=trainingschedule_id]').getValue() == '' || f.down('[name=trainingschedule_id]').getValue() == null){
           trainingschedule_id = 0;
        } else {
           trainingschedule_id = f.down('[name=trainingschedule_id]').getValue();
        }
        if(f.down('[name=trainingname_id]').getValue() == '' || f.down('[name=trainingname_id]').getValue() == null){
            me.tools.alert.warning("Choose your training");
            return false;
        } else {
           trainingname_id = f.down('[name=trainingname_id]').getValue();
        }
        if(f.down('[name=periode]').getValue() == '' || f.down('[name=periode]').getValue() == null){
            me.tools.alert.warning("Periode is required");
            return false;
        } else {
           periode = f.down('[name=periode]').getValue();
        }
        if(f.down('[name=batch]').getValue() == '' || f.down('[name=batch]').getValue() == null){
           me.tools.alert.warning("Batch is required");
            return false;
        } else {
           batch = f.down('[name=batch]').getValue();
        }
        if(f.down('[name=timestart]').getValue() == '00:00:00' || f.down('[name=timestart]').getValue() == null){
           me.tools.alert.warning("Time Start is required");
            return false;
        } else {
           timestart = f.down('[name=timestart]').getValue();
        }
        if(f.down('[name=timeend]').getValue() == '00:00:00' || f.down('[name=timeend]').getValue() == null){
           me.tools.alert.warning("Time End is required");
            return false;
        } else {
           timeend = f.down('[name=timeend]').getValue();
        }
        
            peserta = f.down('[name=peserta]').getValue();
        
        if(f.down('[name=venue]').getValue() == '' || f.down('[name=venue]').getValue() == null){
           me.tools.alert.warning("Venue is required");
            return false;
        } else {
           venue = f.down('[name=venue]').getValue();
        }

        if(f.down('[name=quota]').getValue() == '' || f.down('[name=quota]').getValue() == null){
           me.tools.alert.warning("Quota is required");
            return false;
        } else {
           quota = f.down('[name=quota]').getValue();
        }

           publish = f.down('[name=publish]').getValue();
        
           description = f.down('[name=description]').getValue();
        
           estimated = f.down('[name=estimated]').getValue();

        if(f.down('[name=startdate]').getValue() == '' || f.down('[name=startdate]').getValue() == null){
           startdate = 0;
        } else {
           startdate = f.down('[name=startdate]').getValue();
        }
        if(f.down('[name=enddate]').getValue() == '' || f.down('[name=enddate]').getValue() == null){
           enddate = 0;
        } else {
           enddate = f.down('[name=enddate]').getValue();
        }

            me.tools.ajax({
                params: {
                    ids: ids,
                    trainingschedule_id:me.getFormdata().down("[name=trainingschedule_id]").getValue(),
                    'trainingname_id': trainingname_id,
                    'periode': periode,
                    'batch': batch,
                    'timestart': timestart,
                    'timeend': timeend,
                    'peserta': peserta,
                    'venue': venue,
                    'description': description,
                    'estimated':estimated,
                    'startdate': startdate,
                    'enddate': enddate,
                    'quota': quota,
                    'publish': publish
                },
                success: function(data, model) {
                    
                    sgd.reload();
                    me.tools.wesea({data: data, model: model}, g).grid();
                    // me.getAllEmp();
                    sgd.reload();
                }
            }).read('delemp');
        }
    },
    invitedEmp: function(){
        var rows;
        me = this;
        var g = me.getGridemp();
        rows = g.getSelectionModel().getSelection();
        var f = me.getFormdata();
        periode = f.down('[name=periode]').getValue();
        if (rows.length < 1) {
            Ext.Msg.alert('Info', 'No record selected !');
            return;
        } else {
            Ext.Msg.confirm('Invite', 'Invite Employee(s) with Send Email', function (btn) {
                if (btn == 'yes') {
                    var selected = g.getSelectionModel().getSelection();
                    var ids = "";
                    var e_id = "";
                    var e_name = "";
                    var e_email = "";
                    var sgd = g.getStore();
                    var f = me.getFormdata();

                    // console.log(selected);
                    if (selected.length > 0) {
                        for (var i in selected) {
                            // console.log(selected[i]);
                            ids += selected[i]['data']["trainingscheduleemployee_id"] + "~";
                            e_id += selected[i]['data']["employee_id"] + "~";
                            e_name += selected[i]['data']["employee_name"] + "~";
                            e_email += selected[i]['data']["email_ciputra"] + "~";
                        }
                        // console.log(ids);

                        me.tools.ajax({
                            params: {
                                ids: ids,
                                e_id: e_id,
                                e_name: e_name,
                                e_email: e_email,
                                trainingschedule_id:me.getFormdata().down("[name=trainingschedule_id]").getValue(),
                                periode: periode
                            },
                            success: function(data, model) {
                                sgd.reload();
                                me.getAllEmp();
                            }
                        }).read('invitedemp');
                    }
                }
            });
        }
    },

    //BANDING
    formBandingTrainingSchedule: function () {
        var me, grid, store;
        me = this;
        me.instantWindow("FormBanding", 500, "Banding", "banding", "trainingscheduleformbanding");
    },
    formBandingTrainingScheduleAfterRender: function () {
        var me, grid, store;
        me = this;
        var g = me.getGridbanding();
        var sg = g.getStore();
        me.tools.ajax({
            params: {},
            success: function (data, model) {
                me.tools.wesea({data: data, model: model}, g).grid();
                // console.log(data);
                // console.log(g);
                sg.reload();
            }
        }).read('getbanding');
    },
    getBandingExist: function (el) {
        var me = this;
        var f = me.getFormdata();
        var g = me.getGrid();
        var s = g.getStore();
        gfc = me.getGridformbanding();
        sgfc = gfc.getStore();
        sgfc.reload();
        var trainingschedule_id = f.down('[name=trainingschedule_id]').getValue();
        me.tools.ajax({
            params: {
                'trainingschedule_id': trainingschedule_id,
            },
            success: function(data, model) {
                me.tools.wesea({data: data, model: model}, gfc).grid();
            }
        }).read('getbandingexist');
    },
    processBandingTrainingSchedule: function(){
        var me = this;
        var f = me.getFormdata();
        g = me.getGrid();
        sg = g.getStore();
        fc = me.getFormbanding();
        gfc = me.getGridformbanding();
        sgfc = gfc.getStore();
        gc = me.getGridbanding();
        sgc = gc.getStore();
        rec = gc.getSelectedRecord();
        id = rec.get("banding_id");
        rows = gc.getSelectionModel().getSelection();
        var banding_id = "";
        if (rows.length > 0) {
            for (var i in rows) {
                banding_id += rows[i]['data']["banding_id"] + "~";
            }
        }
        
        if(f.down('[name=trainingschedule_id]').getValue() == '' || f.down('[name=trainingschedule_id]').getValue() == null){
           trainingschedule_id = 0;
        } else {
           trainingschedule_id = f.down('[name=trainingschedule_id]').getValue();
        }
        if(f.down('[name=trainingname_id]').getValue() == '' || f.down('[name=trainingname_id]').getValue() == null){
            me.tools.alert.warning("Choose your training");
            return false;
        } else {
           trainingname_id = f.down('[name=trainingname_id]').getValue();
        }
        if(f.down('[name=periode]').getValue() == '' || f.down('[name=periode]').getValue() == null){
            me.tools.alert.warning("Periode is required");
            return false;
        } else {
           periode = f.down('[name=periode]').getValue();
        }
        if(f.down('[name=batch]').getValue() == '' || f.down('[name=batch]').getValue() == null){
           me.tools.alert.warning("Batch is required");
            return false;
        } else {
           batch = f.down('[name=batch]').getValue();
        }
        if(f.down('[name=timestart]').getValue() == '00:00:00' || f.down('[name=timestart]').getValue() == null){
           me.tools.alert.warning("Time Start is required");
            return false;
        } else {
           timestart = f.down('[name=timestart]').getValue();
        }
        if(f.down('[name=timeend]').getValue() == '00:00:00' || f.down('[name=timeend]').getValue() == null){
           me.tools.alert.warning("Time End is required");
            return false;
        } else {
           timeend = f.down('[name=timeend]').getValue();
        }
        if(f.down('[name=startdate]').getValue() == '' || f.down('[name=startdate]').getValue() == null){
           startdate = 0;
        } else {
           startdate = f.down('[name=startdate]').getValue();
        }
        if(f.down('[name=enddate]').getValue() == '' || f.down('[name=enddate]').getValue() == null){
           enddate = 0;
        } else {
           enddate = f.down('[name=enddate]').getValue();
        }
        peserta = f.down('[name=peserta]').getValue();

        if(f.down('[name=venue]').getValue() == '' || f.down('[name=venue]').getValue() == null){
           me.tools.alert.warning("Venue is required");
            return false;
        } else {
           venue = f.down('[name=venue]').getValue();
        }

        if(f.down('[name=quota]').getValue() == '' || f.down('[name=quota]').getValue() == null){
           me.tools.alert.warning("Quota is required");
            return false;
        } else {
           quota = f.down('[name=quota]').getValue();
        }

        publish = f.down('[name=publish]').getValue();
        
        description = f.down('[name=description]').getValue();
        estimated = f.down('[name=estimated]').getValue();

        me.tools.ajax({
            params: {
                trainingschedule_id: trainingschedule_id,
                trainingname_id: trainingname_id,
                periode: periode,
                batch: batch,
                timestart: timestart,
                timeend: timeend,
                peserta: peserta,
                startdate: startdate,
                enddate: enddate,
                venue: venue,
                description: description,
                estimated:estimated,
                banding_id: banding_id,
                quota:quota,
                publish: publish
            },
            success: function (data, model) {
                f.down('[name=trainingschedule_id]').setValue(data.others[0][0].ID);
                fc.up('window').close();
                sg.reload();
                me.getBandingExist();
                sgfc.reload();
            }
        }).read('processbandingtrainingschedule');

    },
    formDeleteBandingTrainingSchedule: function(){
        var me = this;
        var f = me.getFormdata();
        g = me.getGrid();
        sg = g.getStore();
        fc = me.getFormbanding();
        gfc = me.getGridformbanding();
        sgfc = gfc.getStore();
        rec = gfc.getSelectedRecord();
        id = rec.get("banding_id");
        rows = gfc.getSelectionModel().getSelection();
        var banding_id = "";
        if (rows.length > 0) {
            for (var i in rows) {
                banding_id += rows[i]['data']["banding_id"] + "~";
            }
        }

        trainingschedule_id = f.down('[name=trainingschedule_id]').getValue();

        me.tools.ajax({
            params: {
                trainingschedule_id:trainingschedule_id,
                banding_id:banding_id
            },
            success: function (data, model) {
                me.getBandingExist();
                sgfc.reload();
            }
        }).read('processdeletebandingtrainingschedule');

    },

    //SHARE PROJECT PT
    formShareTrainingSchedule: function () {
        var me, grid, store;
        me = this;
        me.instantWindow("FormShare", 400, "Share", "share", "trainingscheduleformshare");
    },
    formShareTrainingScheduleAfterRender: function () {
        var me, grid, store;
        me = this;
        var g = me.getGridsharetn();
        var sg = g.getStore();
        me.tools.ajax({
            params: {},
            success: function (data, model) {
                me.tools.wesea({data: data, model: model}, g).grid();
                sg.reload();
            }
        }).read('gettrainingschedule');

        var gpp = me.getGridsharepp();
        var sgpp = gpp.getStore();
        me.tools.ajax({
            params: {},
            success: function (data, model) {
                me.tools.wesea({data: data, model: model}, gpp).grid();
                sgpp.reload();
            }
        }).read('getprojectptaccess');
    },
    processShareTrainingSchedule: function(){
        var me = this;

        gtn = me.getGridsharetn();
        rec_tn = gtn.getSelectedRecord();
        id_tn = rec_tn.get("trainingschedule_id");
        rows_tn = gtn.getSelectionModel().getSelection();
        var trainingschedule_id = "";
        var trainingname_id = "";
        if (rows_tn.length > 0) {
            for (var i in rows_tn) {
                trainingschedule_id += rows_tn[i]['data']["trainingschedule_id"] + "~";
                trainingname_id += rows_tn[i]['data']["trainingname_id"] + "~";
            }
        }

        gpp = me.getGridsharepp();
        rec_pp = gpp.getSelectedRecord();
        id_pp = rec_pp.get("projectpt_id");
        rows_pp = gpp.getSelectionModel().getSelection();
        var projectpt_id = "";
        var project_id = "";
        var pt_id = "";
        if (rows_pp.length > 0) {
            for (var i in rows_pp) {
                projectpt_id += rows_pp[i]['data']["projectpt_id"] + "~";
                project_id += rows_pp[i]['data']["project_id"] + "~";
                pt_id += rows_pp[i]['data']["pt_id"] + "~";
            }
        }

        // console.log(trainingschedule_id);
        // console.log(projectpt_id);
        // console.log(project_id);
        // console.log(pt_id);

        me.tools.ajax({
            params: {
                trainingname_id:trainingname_id,
                trainingschedule_id:trainingschedule_id,
                projectpt_id:projectpt_id,
                project_id:project_id,
                pt_id:pt_id
            },
            success: function (data, model) {
                me.getFormshare().up('window').close();
                
            }
        }).read('sharetrainingschedule');

    },

    ChangePeriode: function () {
        var me, grid, store;
        me = this;

        var f = me.getFormdata();
        var g = me.getGrid();
        var rec = g.getSelectedRecord();
        var periode = f.down('[name=periode]').getValue();

        var trainingbudgetadjustment_id = f.down('[name=trainingschedule_id]').getValue();
            if(rec){
                if(!rec.data.apply_check){
                    me.tools.ajax({
                        params: {
                            'periode': periode
                        },
                        success: function (data, model) {
                            // console.log(data);
                            if(rec.data.periode != periode){
                                    f.down('[name=trainingbudgetprogram_id]').setValue('');
                                }

                           
                            me.tools.wesea(data.trainingbudgetprogram, f.down("[name=trainingbudgetprogram_id]")).comboBox();
                            me.CheckPeriodeBudgetDisabled();
                        }
                    }).read('changeperiode');

                }

            }else{
                me.tools.ajax({
                    params: {
                        'periode': periode
                    },
                    success: function (data, model) {
                        // console.log(data);
                        // if(rec.data.periode != periode){
                                f.down('[name=trainingbudgetprogram_id]').setValue('');
                            // }

                       
                        me.tools.wesea(data.trainingbudgetprogram, f.down("[name=trainingbudgetprogram_id]")).comboBox();
                        me.CheckPeriodeBudgetDisabled();
                    }
                }).read('changeperiode');
            }
    },

    CheckPeriodeBudgetDisabled: function () {
        var me, grid, store;
        me = this;
        var f = me.getFormdata();
        var periode = f.down('[name=periode]').getValue();

        me.tools.ajax({
            params: {periode:periode},
            success: function (data, model) {
                var flag_zero = data.others[0][0].flag_zero;

                if(flag_zero){
                    me.tools.alert.warning("Maaf Periode Budget Program belum di set");
                    f.down('[name=trainingbudgetprogram_id]').setReadOnly(true);
                    f.down('[name=trainingbudgetprogram_id]').setDisabled(true);


                    f.down('[name=trainingbudgetprogram_id]').setValue('');
                }else{
                    f.down('[name=trainingbudgetprogram_id]').setReadOnly(false);
                    f.down('[name=trainingbudgetprogram_id]').setDisabled(false);
                    
                }
            }
        }).read('checkperiodebudgetdisabled');
    },


    //added by anas 04042022
    //untuk update nilai saldo awal dan sisa saldo ketika pilih budget program
    ChangeTrainingBudgetProgram: function () {
        var me, grid, store;
        me = this;
        var f = me.getFormdata();
        var trainingbudgetprogram_id = f.down('[name=trainingbudgetprogram_id]').getValue();
        // console.log(trainingbudgetprogram_id);
        if(trainingbudgetprogram_id != '')
        {
            me.tools.ajax({
                params: {trainingbudgetprogram_id:trainingbudgetprogram_id},
                success: function (data, model) {
                    var data_getlist = data.others[0][0].data_getlist;
                    var grand_total_all_budget = data.others[0][0].grand_total_all_budget;
                    var alert_minus = data.others[0][0].alert_minus;
                    f.down("[name=budget_trainingbudgetprogram]").setValue(data_getlist['budget']);
                    f.down("[name=periode]").setValue(data_getlist['periode']);
                    f.down("[name=sisabudget_trainingbudgetprogram]").setValue(grand_total_all_budget);

                    if(alert_minus == 1){
                        me.tools.alert.warning("Maaf Budget Tidak Cukup");
                        f.down("[action=save]").hide();
                    }
                }
            }).read('getsaldo');
        }
    },

    dataDestroy: function() {
        var me = this;
        var rows = me.getGrid().getSelectionModel().getSelection();
        if (rows.length < 1) {
            Ext.Msg.alert('Info', 'No record selected !');
            return;
        } else {
            var confirmmsg, successmsg, failmsg;
            var recordcounttext = rows.length + ' record' + (rows.length > 1 ? 's' : '');
            var store = me.getGrid().getStore();

            if (rows.length == 1) {
                var selectedRecord = '[' + store.getAt(store.indexOf(rows[0])).data.trainingname + ']';
                confirmmsg = 'Delete ' + selectedRecord + ' ?';
                failmsg = 'Error: Unable to delete ' + selectedRecord + '.';
            } else {
                confirmmsg = 'This action will delete ' + recordcounttext + '.<br />Continue ?';
                failmsg = 'Error: Unable to delete data.';
            }

            var countClosed = 0;
            for (var i = 0; i < rows.length; i++) {
                if(rows[i].data.closed == 1)
                {
                    countClosed++;
                }
            }
            
            if(countClosed > 0)
            {
                Ext.Msg.alert('Info', 'Ada '+countClosed+' data yang tidak dapat dihapus karena sudah Closed');
                return;
            }
            else
            {
                Ext.Msg.confirm('Delete Data', confirmmsg, function(btn) {
                    if (btn == 'yes') {
                        resetTimer();
                        var msg = function() {
                            me.getGrid().up('window').mask('Deleting data, please wait ...');
                        };
                        for (var i = 0; i < rows.length; i++) {
                            store.remove(rows[i]);
                        }

                        store.on('beforesync', msg);
                        store.sync({
                            success: function(s) {
                                me.getGrid().up('window').unmask();
                                var successcount = parseInt(Ext.decode(s.operations[0].response.responseText).total, 10);
                                var successmsg = (rows.length == 1 ? selectedRecord : (successcount != rows.length ? successcount + ' of ' : '') + recordcounttext) + ' deleted successfully.';
                                store.un('beforesync', msg);
                                store.reload();
                                if (typeof Ext.StoreManager.lookup(me.stores[0]) != 'undefined') {
                                    Ext.StoreManager.lookup(me.stores[0]).load({params: {limit: 0}});
                                }
                                Ext.Msg.show({
                                    title: 'Success',
                                    msg: successmsg,
                                    icon: Ext.Msg.INFO,
                                    buttons: Ext.Msg.OK
                                });
                            },
                            failure: function() {
                                me.getGrid().up('window').unmask();
                                store.un('beforesync', msg);
                                store.reload();
                                Ext.Msg.show({
                                    title: 'Failure',
                                    msg: failmsg + ' The data may have been used.',
                                    icon: Ext.Msg.ERROR,
                                    buttons: Ext.Msg.OK
                                });
                            }
                        });
                    }
                });
            }
        }
    },
});