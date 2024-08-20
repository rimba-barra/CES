Ext.define('Hrd.controller.Ubahstatus', {
    extend: 'Hrd.library.box.controller.Controller2B',
    alias: 'controller.Ubahstatus',
    controllerName: 'ubahstatus',
    fieldName: 'ubahstatus_id',
    bindPrefixName: 'Ubahstatus',
    formWidth: 500,
    //edited by ahmad riadi 25-07-2017
    employeedata:null,	
    constructor: function(configs) {
        var me = this;
        var config = new Hrd.library.box.tools.DefaultConfig({
            moduleName: me.controllerName
        });
        config.run(this);        
        this.callParent(arguments);
    },
    refs: [
        {
            ref: 'gridstatus',
            selector: 'ubahstatusinfogrid'
        },
        {
            ref: 'grid',
            selector: 'ubahstatusgrid'
        }
    ],
    localStore: {
        newdetail: null
    },
    init: function(config) {
        this.callParent(arguments);
        var newEvs = {};
        var me = this;
        newEvs['ubahstatusinfogrid'] = {
            selectionchange: me.statusGridOnSelect
        };

        newEvs['ubahstatusformdata [name=is_kompensasi]'] = {
            change: function() {
                me.kompensasiChange();
            }
        };

        newEvs['ubahstatusformdata #formNewStatusID [name=employeestatus_employeestatus_id]'] = {
            change: function() {
                me.employeeStatusChange();
            }
        };

        newEvs['ubahstatusgrid'] = {
            selectionchange: me.GridOnSelect
        };
        this.control(newEvs);

    },
    getProcessingEl: function() {
        var me = this;
        var x = {
            getForm: function() {
                return me.getFormNew();
            },
            getGrid: function() {
                /// used for on Delete Button in main grid
                return me.getGridstatus();
            }
        }
        return x;
    },
    statusGridOnSelect: function(view, rec) {

        var me = this;
        var gs = me.getGridstatus();
        var fn = me.getFormNew();
        me.getGrid().down("toolbar button[action=edit]").setDisabled(false);
        me.getGrid().down("toolbar button[action=delete]").setDisabled(false);
        fn.getForm().reset();
        var mainRec = me.getGrid().getSelectedRecord();
        
        if (rec.length === 0) {
            return;
        }
        fn.loadRecord(rec[0]);
        fn.down("[name=employee_employee_id]").setValue(mainRec.get("employee_id"));
        fn.down("[name=employeestatus_employeestatus_id]").setValue(rec[0].raw.employeestatus.employeestatus_id);
        var st = rec[0].raw.newstatusinformation;
        for (var i in st) {
            var el = fn.down("[name=statusinformation_" + i + "]");
            if (el) {
                el.setValue(st[i]);
            }
        }

    },
    GridOnSelect: function(view, rec) {
        var me = this;
        var mainRec = me.getGrid().getSelectedRecord();
        var emp_id = mainRec.get("employee_id");
        var form = me.getProcessingEl().getForm(); 
        me.tools.ajax({
            params: {
                employee_id: emp_id
            },
            success: function(data, model) {
                if(data.others[1].employeestatus_id == 1){
                    form.down("[name=usia_kerja_start_date]").setValue(data.others[1].usia_kerja_start_date);
                    form.down("[name=masa_kerja_start_date]").setValue(data.others[1].masa_kerja_start_date);
                    form.down("[name=is_kompensasi]").setValue(data.others[1].is_kompensasi);
                }
                if(data.others[1].employeestatus_id == 2){
                    form.down("[name=usia_kerja_start_date]").setValue(data.others[1].usia_kerja_start_date);
                }
                
            }
        }).read('detail_emp');
        
    },
    panelAfterRender: function(config) {
        this.callParent(arguments);
        var me = this;
        var gs = me.getGridstatus();
        gs.getSelectionModel().setSelectionMode('SINGLE');
        gs.doInit();
        
        me.tools.ajax({
            params: {},
            success: function(data, model) {

                me.tools.wesea(data.department, me.getPanel().down("ubahstatusformsearch").down("[name=department_department_id]")).comboBox(true);
            }
        }).read('detail');

    },
    afterSelectionChange: function(rec) {
        var me = this;
        var gs = me.getGridstatus();
        me.getFormNew().getForm().reset();
        var emId = rec.get("employee_id");

        //edited by ahmad riadi 25-07-2017
        me.employeedata = rec;
        
        gs.getStore().loadData([], false);
        gs.getStore().loadPage(1, {
            params: {
                employee_employee_id: emId
            },
            callback: function(recs, op) {
                gs.attachModel(op);

            }
        });
    },
    addNewRecord: function() {
        var me = this;
        var fo = me.getFormOld();
        var fn = me.getFormNew();
        var rec = me.getGrid().getSelectedRecord();
        if (rec) {
            fo.loadRecord(rec);
            fn.down("[name=employee_employee_id]").setValue(rec.get("employee_id"));
            fn.down("[name=statusinformation_hire_date]").setValue(rec.get("hire_date"));
            me.tools.formHelper(fo).readOnly(true);
            me.tools.formHelper(fn).readOnly(false);

            fn.down("[name=usia_kerja_start_date]").setReadOnly(true);
            fn.down("[name=masa_kerja_start_date]").setReadOnly(true);

            return true;

        }
        return false;
    },
    editRecord: function(selectedRec) {
        var me = this;
        var fo = me.getFormOld();
        var fn = me.getFormNew();
        me.tools.formHelper(fo).readOnly(true);
        me.tools.formHelper(fn).readOnly(false);

        fn.down("[name=usia_kerja_start_date]").setReadOnly(true);
        fn.down("[name=masa_kerja_start_date]").setReadOnly(true);
        /* tetap bisa ubah karena ke Cherry akan sync update (bukan insert)
        var dataForm = fn.getForm().getValues();
        var is_applied = dataForm["is_applied"];
        if(is_applied){   
            me.tools.alert.info('Karena sudah Applied, maka hanya dapat mengubah Notes');
        }*/
    },
    getFinalData: function(data) {
        //edited by ahmad riadi 25-07-2017
        var me,empdata; 
        me=this; 
	

        for (var i in data) {

            if (i.indexOf("statusinformation") > -1) {
                data['new' + i] = data[i];
            }
        }
        data["newemployeestatus_employeestatus_id"] = data["employeestatus_employeestatus_id"];

       //edited by ahmad riadi 25-07-2017
       empdata = me.employeedata.raw.employeeb;
       data["employee_employee_id"] =empdata.employee_id;
       if(data.newemployeestatus_employeestatus_id==1){ //jika permanent
           data["newstatusinformation_hire_date"] =empdata.hire_date;
       }  

        return data;
    },
    cancelOnClick: function() {
        var me = this;
        // me.getFormdata().getForm().reset();
        var fn = me.getFormNew();
        
        me.disableTBButtonsOnGrid(false);
        me.tools.formHelper(me.getFormNew()).readOnly(true);
    },
    getFormOld: function() {
        return this.getFormdata().down("#formOldStatusID");
    },
    getFormNew: function() {
        return this.getFormdata().down("#formNewStatusID");
    },
    // added by wulan sari 20200708
    saveOnClick: function() {
        var me = this;
                
        var f = me.getProcessingEl().getForm();        
        var g = me.getProcessingEl().getGrid();
                
        var form = f;
        var dataForm = form.getForm().getValues();
        var status = dataForm["employeestatus_employeestatus_id"]; 

        var f_old = me.getFormOld();
        var dataForm_old = f_old.getForm().getValues();
        var is_kompensasi = dataForm["is_kompensasi"]; 
        var usia_kerja_start_date = dataForm["usia_kerja_start_date"]; 
        var masa_kerja_start_date = dataForm["masa_kerja_start_date"];
        var hire_date = dataForm_old["hire_date"];
        var statusinformation_assignation_date = dataForm["statusinformation_assignation_date"]; 
        var kompensasi_text = "TIDAK mendapatkan kompensasi";     
        
        // if(status == 2){
        //     var contract_ke = dataForm["statusinformation_contract_ke"];
        //     if(contract_ke == ''){
        //         Ext.Msg.show({
        //             title: 'Info',
        //             msg: '"kontrak ke" wajib diisi',
        //             buttons: Ext.Msg.OK
        //         });
        //         return false;
        //     }
        //     Ext.Msg.show({
        //         title: 'Confirm',
        //         msg: 'Anda yakin melakukan save periode kontrak? Bila ya, ini adalah kontrak ke-' + contract_ke,
        //         buttons: Ext.Msg.YESNO,
        //         icon: Ext.Msg.QUESTION,
        //         fn: function (clicked) {
                    
        //             if (clicked === "yes") {
                        
                        
        //                 // added by wulan sari 20201208
        //                 //var is_applied = dataForm["is_applied"];
        //                 //if(is_applied){   
        //                 //    alert('Karena sudah Applied, maka hanya dapat mengubah Notes');
        //                 //}
        //                 // end added by wulan sari 20201208
                        

        //                 me.insSave({
        //                     form: f,
        //                     grid: g,
        //                     // store: me.localStore["detail"].store,
        //                     store: g.getStore(),
        //                     finalData: function(data) {
        //                          return me.getFinalData(data);

        //                     },
        //                     sync: true,
        //                     callback: function (records, operation, success) {
        //                     }
        //                 });
        //             }

        //         }
        //     });
        // }
        if(status == 2 || status == 7){
            if(status == 2){
                var contract_ke = dataForm["statusinformation_contract_ke"];
                if(contract_ke == ''){
                    Ext.Msg.show({
                        title: 'Info',
                        msg: '"kontrak ke" wajib diisi',
                        buttons: Ext.Msg.OK
                    });
                    return false;
                }

                var contract_start = dataForm["statusinformation_contract_start"];
                var contract_end = dataForm["statusinformation_contract_end"];
                if(contract_end <= contract_start){
                    Ext.Msg.show({
                        title: 'Info',
                        msg: 'Periode akhir kontrak tidak boleh lebih kecil daripada periode awal',
                        buttons: Ext.Msg.OK
                    });
                    return false;
                }

                Ext.Msg.show({
                    title: 'Confirm',
                    msg: 'Anda yakin melakukan save periode kontrak? Bila ya, ini adalah kontrak ke-' + contract_ke,
                    buttons: Ext.Msg.YESNO,
                    icon: Ext.Msg.QUESTION,
                    fn: function (clicked) {
                        
                        if (clicked === "yes") {
                            
                            
                            // added by wulan sari 20201208
                            //var is_applied = dataForm["is_applied"];
                            //if(is_applied){   
                            //    alert('Karena sudah Applied, maka hanya dapat mengubah Notes');
                            //}
                            // end added by wulan sari 20201208
                            

                            me.insSave({
                                form: f,
                                grid: g,
                                // store: me.localStore["detail"].store,
                                store: g.getStore(),
                                finalData: function(data) {
                                     return me.getFinalData(data);

                                },
                                sync: true,
                                callback: function (records, operation, success) {
                                }
                            });
                        }

                    }
                });
            }
            if(status == 7){
                var consultant_ke = dataForm["statusinformation_consultant_ke"];
                if(consultant_ke == ''){
                    Ext.Msg.show({
                        title: 'Info',
                        msg: '"consultant ke" wajib diisi',
                        buttons: Ext.Msg.OK
                    });
                    return false;
                }

                var consultant_start = dataForm["statusinformation_consultant_start"];
                var consultant_end = dataForm["statusinformation_consultant_end"];
                if(consultant_end <= consultant_start){
                    Ext.Msg.show({
                        title: 'Info',
                        msg: 'Periode akhir masa konsultan tidak boleh lebih kecil daripada periode awal',
                        buttons: Ext.Msg.OK
                    });
                    return false;
                }

                Ext.Msg.show({
                    title: 'Confirm',
                    msg: 'Anda yakin melakukan save periode consultant? Bila ya, ini adalah consultant ke-' + consultant_ke,
                    buttons: Ext.Msg.YESNO,
                    icon: Ext.Msg.QUESTION,
                    fn: function (clicked) {
                        
                        if (clicked === "yes") {
                            
                            
                            // added by wulan sari 20201208
                            //var is_applied = dataForm["is_applied"];
                            //if(is_applied){   
                            //    alert('Karena sudah Applied, maka hanya dapat mengubah Notes');
                            //}
                            // end added by wulan sari 20201208
                            

                            me.insSave({
                                form: f,
                                grid: g,
                                // store: me.localStore["detail"].store,
                                store: g.getStore(),
                                finalData: function(data) {
                                     return me.getFinalData(data);

                                },
                                sync: true,
                                callback: function (records, operation, success) {
                                }
                            });
                        }

                    }
                });
            }
        } else {        
            
            /*
            // added by wulan sari 20201208
            var is_applied = dataForm["is_applied"];
            if(is_applied){   
                alert('Karena sudah Applied, maka hanya dapat mengubah Notes');
            }
            // end added by wulan sari 20201208
            */

            //comment by michael 2023-03-28 | perlu konfirmasi dulu usia & masa kerjanya
            // me.insSave({
            //     form: f,
            //     grid: g,
            //     // store: me.localStore["detail"].store,
            //     store: g.getStore(),
            //     finalData: function(data) {
            //          return me.getFinalData(data);

            //     },
            //     sync: true,
            //     callback: function (records, operation, success) {
            //     }
            // });

            if(statusinformation_assignation_date < hire_date){
                Ext.Msg.show({
                        title: 'Info',
                        msg: 'Assignation date tidak boleh lebih kecil daripada Hire date',
                        buttons: Ext.Msg.OK
                    });
                    return false;
            }

            if(statusinformation_assignation_date == ''){
                    form.down("[name=is_kompensasi]").setValue('');
                    Ext.Msg.show({
                        title: 'Info',
                        msg: 'Assignation Date wajib diisi',
                        buttons: Ext.Msg.OK
                    });
                    return false;
            }

            usia_kerja_start_date = hire_date;
            masa_kerja_start_date = hire_date;


            if(is_kompensasi == '1'){
                usia_kerja_start_date = hire_date;
                masa_kerja_start_date = statusinformation_assignation_date;
                kompensasi_text = "ADA mendapatkan kompensasi";
            }

            form.down("[name=usia_kerja_start_date]").setValue(usia_kerja_start_date);
            form.down("[name=masa_kerja_start_date]").setValue(masa_kerja_start_date);

            Ext.Msg.show({
                    title: 'Confirm',
                    msg: 'Anda yakin karyawan tersebut '+kompensasi_text+'? Bila ya, Usia Kerja = ' + usia_kerja_start_date + ' & Masa Kerja = '+masa_kerja_start_date,
                    buttons: Ext.Msg.YESNO,
                    icon: Ext.Msg.QUESTION,
                    fn: function (clicked) {
                        
                        if (clicked === "yes") {
                        
                            me.insSave({
                                form: f,
                                grid: g,
                                // store: me.localStore["detail"].store,
                                store: g.getStore(),
                                finalData: function(data) {
                                     return me.getFinalData(data);

                                },
                                sync: true,
                                callback: function (records, operation, success) {
                                }
                            });
                        }

                    }
                });
           
            
        }

        
    },
    deleteOnClick: function() {
        var me = this;

        var f = me.getProcessingEl().getForm();  
        var dataForm = f.getForm().getValues();
        var is_applied = dataForm["is_applied"];
        if(is_applied){   
            me.tools.alert.info('Karena sudah Applied, maka data tidak dapat dihapus');
        } else {
            var g = me.getProcessingEl().getGrid();
            var rec = g.getSelectedRecord();
            if (rec) {
                Ext.Msg.show({
                    title: 'Confirm Delete',
                    msg: 'Are you sure you want to delete this record?',
                    buttons: Ext.Msg.YESNO,
                    icon: Ext.Msg.QUESTION,
                    fn: function(clicked) {
                        if (clicked === "yes") {

                            me.confirmDeleteOnClick(g.getStore(), rec, me.getPanel().up("window"));
                        }
                    }
                });
            }
        }

    },
    confirmDeleteOnClick: function(store, rec, window) {
        var me = this;

        window.setLoading("Deleting record...");


        me.tools.ajax({
            params: {
                id: rec.get(store.getProxy().getReader().getIdProperty())
            },
            success: function(data, model) {

                var suc = data['others'][0][0]['SUCCESS'];
                if (suc) {
                    me.tools.alert.info('Data has been deleted');
                    store.reload();
                } else {
                    me.tools.alert.warning('Failed');
                }
                window.setLoading(false);
            }
        }).read('delete');
    },

    kompensasiChange: function() {
        var me = this;

        var f = me.getProcessingEl().getForm();        
        var g = me.getProcessingEl().getGrid();
                
        var form = f;
        var dataForm = form.getForm().getValues();
        var status = dataForm["employeestatus_employeestatus_id"]; 

        var f_old = me.getFormOld();
        var dataForm_old = f_old.getForm().getValues();
        
        if(status == 1){

            var is_kompensasi = dataForm["is_kompensasi"]; 
            var usia_kerja_start_date = dataForm["usia_kerja_start_date"]; 
            var masa_kerja_start_date = dataForm["masa_kerja_start_date"];
            var hire_date = dataForm_old["hire_date"];
            var statusinformation_assignation_date = dataForm["statusinformation_assignation_date"];

            if(statusinformation_assignation_date == ''){

                    form.down("[name=usia_kerja_start_date]").setValue('');
                    form.down("[name=masa_kerja_start_date]").setValue('');

                    Ext.Msg.show({
                        title: 'Info',
                        msg: 'Assignation Date wajib diisi',
                        buttons: Ext.Msg.OK
                    });
                    return false;
            }

            usia_kerja_start_date = hire_date;
            masa_kerja_start_date = hire_date;


            if(is_kompensasi == '1'){
                usia_kerja_start_date = hire_date;
                masa_kerja_start_date = statusinformation_assignation_date;
            }

            form.down("[name=usia_kerja_start_date]").setValue(usia_kerja_start_date);
            form.down("[name=masa_kerja_start_date]").setValue(masa_kerja_start_date);
        }

    },

    employeeStatusChange: function() {
        var me = this;
        var f = me.getProcessingEl().getForm(); 
        var vs = f.getForm().getValues();
        var val = me.tools.intval(vs["employeestatus_employeestatus_id"]);

        if (val === 1) {

            f.down("[name=is_kompensasi]").setDisabled(false);

        } else if (val === 2 || val === 3 || val === 7) {

            f.down("[name=is_kompensasi]").setDisabled(true);
            f.down("[name=masa_kerja_start_date]").setValue("");
            // f.down("[name=usia_kerja_start_date]").setValue("");
            f.down("[name=is_kompensasi]").setValue("");


        } else {

            f.down("[name=is_kompensasi]").setDisabled(true);
            f.down("[name=masa_kerja_start_date]").setValue("");
            f.down("[name=usia_kerja_start_date]").setValue("");
            f.down("[name=is_kompensasi]").setValue("");

        }
    },
});