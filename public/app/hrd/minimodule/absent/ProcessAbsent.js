Ext.define('Hrd.minimodule.absent.ProcessAbsent', {
    extend: 'Hrd.library.box.tools.MiniModule',
    requires: ['Hrd.library.box.tools.Tools'],
    fpnbl:null,
    getEvents: function() {
        var me = this;
        var newEvs = {};
        newEvs['absentrecordgrid toolbar button[action=processabsent]'] = {
            click: function() {
                me.askFingerPrint();
            }
        };
        newEvs['absentrecordformtoolprocessabsent button[action=process]'] = {
            click: function(el) {
                me.process();
            }
        };
        return newEvs;
    },
    askFingerPrint: function(buttonForm) {
        var that = this;
        Ext.Msg.show({
            title: 'Confirm',
            msg: 'Generate from finger print?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            fn: function(clicked) {
                that.confirmClicked(clicked);
                // buttonForm.up("window").destroy();
            }
        });
    },
    form: function() {

        this.getController().instantWindow("FormToolProcessAbsent", 400, "Process Absent", "process", "toolprocessAbsentWinId");

    },
    loopAjax: function (form,current,all) {
        var me  = this;
        var c = me.getController();
        form.setLoading("Progress : "+current+" of "+all);
        c.tools.ajax({
            params: {data: Ext.encode(me.fpnbl[current-1]),
                    projectptid_opsi: c.getSelectedProjectPt()},
            autoAbort: true,
            success: function (data, model) {

                if (data['others'][0][0]['STATUS']) {
                   
                        if(current < all){
                            me.loopAjax(form,current+1,all);
                        }else{
                            me.updateBatch(form);
                            form.setLoading(false);
                        }
                        
                    
                } else {
                    c.tools.alert.warning("Error");
                    form.setLoading(false);

                }

              
            },
            failure: function () {
                c.tools.alert.warning("Error");                    
            }

        }).read('attachsave');
    },
    updateBatch: function (form) {
        
        var me = this;
        var c = me.getController();
        
        form.setLoading("Please wait..");
        c.tools.ajax({
            params: {
                m: c.getSelectedMonth(),
                y: c.getSelectedYear()
            },
            autoAbort: true,
            success: function (data, model) {

                    form.setLoading(false);
              
            },
            failure: function () {
                c.tools.alert.warning("Error");                    
            }
        }).read('batch_update');
    },
    confirmClicked: function(clicked) {
        var me = this;
        var that = this;
        var c = me.getController();
        var f = c.getPanel();

        if (clicked === "yes") {
            // process from finger print
                // f.setLoading("Request data...");
                // c.tools.ajax({
                //     params: {
                //         month: c.getSelectedMonth(),
                //         year: c.getSelectedYear(),
                //         projectptid_opsi: c.getSelectedProjectPt(),
                //     },
                //     success: function(data, model) {


                //       //  
                //         if (data['others'][0][0]['STATUS']) {
                //            // c.tools.alert.info("Success");
                //            me.fpnbl = data['others'][0][0]['DATAS'];//FPNUMBERLIST
                                
                               
                //            me.loopAjax(f,1,me.fpnbl.length);

                //         } else {
                //             c.tools.alert.warning(data['others'][0][0]['MSG']);
                //             f.setLoading(false);
                //         }
                //     }
                // }).read('attachfingerprintinfo');
            //added by michael 22/04/2022
            if(c.getSelectedProjectPt() == '1'){
                // process from finger print
                f.setLoading("Request data...");
                c.tools.ajax({
                    params: {
                        month: c.getSelectedMonth(),
                        year: c.getSelectedYear(),
                        projectptid_opsi: c.getSelectedProjectPt(),
                    },
                    success: function(data, model) {
                        f.setLoading(false);
                    }
                }).read('attachfingerprintinfokp');

                setTimeout(function() { 
                    c.tools.ajax({
                        params: {
                            month: c.getSelectedMonth(),
                            year: c.getSelectedYear(),
                            projectptid_opsi: c.getSelectedProjectPt(),
                        },
                        success: function(data, model) {


                          //  
                            if (data['others'][0][0]['STATUS']) {
                               // c.tools.alert.info("Success");
                               me.fpnbl = data['others'][0][0]['DATAS'];//FPNUMBERLIST
                                    
                                   
                               me.loopAjax(f,1,me.fpnbl.length);

                            } else {
                                c.tools.alert.warning(data['others'][0][0]['MSG']);
                                f.setLoading(false);
                            }
                        }
                    }).read('attachfingerprintinfo');
                }, 8000);
            }else{
                // process from finger print
                f.setLoading("Request data...");
                c.tools.ajax({
                    params: {
                        month: c.getSelectedMonth(),
                        year: c.getSelectedYear(),
                        projectptid_opsi: c.getSelectedProjectPt(),
                    },
                    success: function(data, model) {


                      //  
                        if (data['others'][0][0]['STATUS']) {
                           // c.tools.alert.info("Success");
                           me.fpnbl = data['others'][0][0]['DATAS'];//FPNUMBERLIST
                                
                               
                           me.loopAjax(f,1,me.fpnbl.length);

                        } else {
                            c.tools.alert.warning(data['others'][0][0]['MSG']);
                            f.setLoading(false);
                        }
                    }
                }).read('attachfingerprintinfo');

            }
            //end added by michael 22/04/2022
        } else if (clicked === "no") {
            that.form();
        }
    },
    process: function() {
        var me = this;
        var tools = new Hrd.library.box.tools.Tools();
        var c = me.getController();
        var f = c.getFormprocessabsent();

        var vs = f.getValues();
        var opt = vs["option"];
        var sd = tools.intval(vs["startdays"]);
        var ed = tools.intval(vs["enddays"]);

        if (sd == 0 || ed == 0) {
            tools.alert.warning("Invalid date");
        } else {
            switch (opt) {

                case "employee":
                    var employee = c.getGridemployee().getSelectedRecord();

                    if (employee) {
                        f.setLoading("Processing...");

                        c.tools.ajax({
                            params: {
                                start_date: sd,
                                end_date: ed,
                                month: c.getSelectedMonth(),
                                year: c.getSelectedYear(),
                                process: 'employee',
                                employee_id: employee.get("employee_employee_id")
                            },
                            success: function(data, model) {
                                me.successCallBack(data, model, f, c);
                            }
                        }).read('processabsent');
                    } else {
                        tools.alert.warning("Select employee first");
                    }



                    break;
                case "division":
                    var d = c.getSelectedDepartment();
                    if (d == 999) {
                        c.tools.alert.warning("Please select department first");
                    } else {
                        f.setLoading("Processing...");
                        c.tools.ajax({
                            params: {
                                start_date: sd,
                                end_date: ed,
                                month: c.getSelectedMonth(),
                                year: c.getSelectedYear(),
                                process: 'department',
                                department_id: d
                            },
                            success: function(data, model) {
                                me.successCallBack(data, model, f, c);

                            }
                        }).read('processabsent');
                    }
                    break;
                case "all":

                    f.setLoading("Processing...");
                    c.tools.ajax({
                        params: {
                            start_date: sd,
                            end_date: ed,
                            month: c.getSelectedMonth(),
                            year: c.getSelectedYear(),
                            process: 'all'
                        },
                        success: function(data, model) {
                            /* var status = data["others"][0][0]["STATUS"];
                             if (!status) {
                             c.tools.alert.warning(data["others"][0][0]["MSG"]);
                             } else {
                             c.tools.alert.info("Success");
                             }
                             f.setLoading(false);
                             */
                            me.successCallBack(data, model, f, c);

                        }
                    }).read('processabsent');

                    break;
            }
        }

    },
    successCallBack: function(data, model, form, controller) {
        var status = data["others"][0][0]["STATUS"];
        if (!status) {
            controller.tools.alert.warning(data["others"][0][0]["MSG"]);
        } else {
            controller.tools.alert.info("Success");
            controller.emGrid().select();
        }
        form.setLoading(false);
    }

});

