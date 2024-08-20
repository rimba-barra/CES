Ext.define('Hrd.controller.Trainingbudget', {
    extend: 'Hrd.template.ControllerForMaster',
    alias: 'controller.Trainingbudget',
    controllerName: 'trainingbudget',
    fieldName: 'periode',
    bindPrefixName: 'Trainingbudget',
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
            ref: 'formapply',
            selector: 'trainingbudgetformtoolapply'
        },
    ],
    init: function() {
        var me = this;
        
        me.tools = new Hrd.library.box.tools.Tools({config: me.myConfig});
        
        var events = new Hrd.library.box.tools.EventSelector();
        this.control(events.getEvents(me, me.controllerName));
        
        var newEvs = {};

        newEvs['trainingbudgetgrid button[action=copy]'] = {
            click: function () {
                me.parambrowse.stateform = 'read';
                me.dynamicrequest.GenerateFormdata(me.parambrowse);
            },
        };

        newEvs['trainingbudgetgrid button[action=apply]'] = {
            click: function () {
                me.formApplyBudget();
            },
        };
        
        newEvs['trainingbudgetformtoolapply'] = {
            afterrender: function () {
                me.formApplyBudgetRender();
            }
        };

        newEvs['trainingbudgetformbrowse'] = {
            boxready: function () {
                me.formBrowseReady();
            },
        };

        newEvs['trainingbudgetformbrowse button[action=process]'] = {
            click: function () {
                me.Processdata();
            },
        };

        newEvs['trainingbudgetformtoolapply button[action=processapply]'] = {
            click: function () {
                me.formProcessApplyBudget();
            },
        };


        newEvs['trainingbudgetformdata [name=apply_budget]'] = {
            change: function () {
                me.ChangeApplyBudget();
            },
        };

        newEvs['trainingbudgetformdata [name=trainingbudgetprogram_id]'] = {
            change: function () {
                me.ChangeTrainingBudgetProgram();
            },
        };
        
        this.control(newEvs);
    },

    ChangeApplyBudget: function () {
        var me, grid, store;
        me = this;
        var f = me.getFormdata();

        if(f.down('[name=apply_budget]').getValue() == 1){

            f.down('[name=department_id]').setReadOnly(true);
            f.down('[name=banding_id]').setReadOnly(false);

            f.down('[name=department_id]').setValue('');

           if(f.down('[name=banding_id]').getValue() == '' || f.down('[name=banding_id]').getValue() == null){
               me.tools.alert.warning("Banding is required");
                return false;
            }
        }
        if(f.down('[name=apply_budget]').getValue() == 2){

            f.down('[name=department_id]').setReadOnly(false);
            f.down('[name=banding_id]').setReadOnly(true);

            f.down('[name=banding_id]').setValue('');

           if(f.down('[name=department_id]').getValue() == '' || f.down('[name=department_id]').getValue() == null){
               me.tools.alert.warning("Department is required");
               return false;
            }
        }
        if(f.down('[name=apply_budget]').getValue() == 3){

            f.down('[name=department_id]').setReadOnly(false);
            f.down('[name=banding_id]').setReadOnly(false);

           if(f.down('[name=department_id]').getValue() == '' || f.down('[name=department_id]').getValue() == null || 
            f.down('[name=banding_id]').getValue() == '' || f.down('[name=banding_id]').getValue() == null){
               me.tools.alert.warning("Banding & Department is required");
               return false;
            }
            // if(f.down('[name=banding_id]').getValue() == '' || f.down('[name=banding_id]').getValue() == null){
            //    me.tools.alert.warning("Banding is required");
            //     return false;
            // }


        }

        //added by anas 28042022
        if(f.down('[name=apply_budget]').getValue() == 99){

            f.down('[name=department_id]').setReadOnly(true);
            f.down('[name=banding_id]').setReadOnly(true);

            f.down('[name=banding_id]').setValue('');
            f.down('[name=department_id]').setValue('');
        }
        //end added by anas

        // if(f.down('[name=apply_budget]').getValue() == '' || f.down('[name=apply_budget]').getValue() == null){
        //    me.tools.alert.warning("Venue is required");
        //     return false;
        // } else {
        //    venue = f.down('[name=venue]').getValue();
        // }
    },
    
    panelAfterRender: function (el) {
        var me = this;
        var f = me.getFormsearch();
        me.tools.ajax({
            params: {},
            success: function (data, model) {
                me.tools.wesea(data.banding, f.down("[name=banding_id]")).comboBox();
                me.tools.wesea(data.department, f.down("[name=department_id]")).comboBox();
                // me.tools.wesea(data.trainingbudgetprogram, f.down("[name=trainingbudgetprogram_id]")).comboBox();
                // me.tools.wesea(data.trainingperiode, f.down("[name=trainingperiode_id]")).comboBox();
                var year = new Date().getFullYear();
                f.down("[name=periode]").setValue(year);
            }
        }).read('listcat');
    },
    gridSelectionChange: function () {
        var me = this;
        var grid = me.getGrid(), 
        row = grid.getSelectionModel().getSelection();
        grid.down('#btnEdit').setDisabled(row.length != 1);
        grid.down('#btnDelete').setDisabled(row.length < 1);

        //added by anas 24052022
        var countApply = 0;
        for (var i = 0; i < row.length; i++) {
            if(row[i].data.apply_check == 1)
            {
                countApply++;
            }
        }
        
        if(countApply == 0)
        {
            grid.down('#btnApply').setDisabled(row.length < 1);
        }
        // end added by anas
        
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
                        me.tools.wesea(data.banding, f.down("[name=banding_id]")).comboBox();
                        me.tools.wesea(data.department, f.down("[name=department_id]")).comboBox();
                        me.tools.wesea(data.trainingbudgetprogram, f.down("[name=trainingbudgetprogram_id]")).comboBox();
                        // me.tools.wesea(data.trainingperiode, f.down("[name=trainingperiode_id]")).comboBox();
                        var year = new Date().getFullYear();
                        f.down("[name=periode]").setValue(year);
                    }
                }).read('listcat');
            },
            update  : function() {
               me.unMask(1);

               me.tools.ajax ({
                    params  : {},
                    success : function(data, model) {
                    /* panggil wesea untuk proses hasil master table */
                        me.tools.wesea(data.banding, f.down("[name=banding_id]")).comboBox();
                        me.tools.wesea(data.department, f.down("[name=department_id]")).comboBox();
                        me.tools.wesea(data.trainingbudgetprogram, f.down("[name=trainingbudgetprogram_id]")).comboBox();
                        // me.tools.wesea(data.trainingperiode, f.down("[name=trainingperiode_id]")).comboBox();
                        var g   = me.getGrid();
                        var rec = g.getSelectedRecord();
                        if (rec) {
                            f.editedRow = g.getSelectedRow();
                            f.loadRecord(rec);
                            // me.tools.alert.warning("Jika anda merubah data, silahkan apply ulang data tersebut");
                            
                            if(rec.data.apply_check == 1){
                                f.down('[name=trainingbudgetprogram_id]').setReadOnly(true);
                                f.down('[name=apply_budget]').setReadOnly(true);
                                f.down('[name=department_id]').setReadOnly(true);
                                f.down('[name=banding_id]').setReadOnly(true);
                                f.down('[name=employeestatus_id]').setReadOnly(true);
                                f.down('[name=budget]').setReadOnly(true);
                                f.down("[action=save]").hide();
                                me.tools.alert.warning("Maaf data tersebut sudah di apply, tidak bisa di edit kembali");
                            }
                        }
                    }
                }).read('listcat');
            }
        };
        return x;
    },
    parambrowse: {
        //start formgeneate
        fromlocation: 'Hrd.view.mastersk.FormBrowse',
        formtitle: 'Form Browse Document HC Filing (HO)', formicon: 'icon-form-add',
        formid: 'win-masterskgridbrowse', formlayout: 'fit',
        formshadow: 'frame', formmask: 'Loading...',
        formwidth: 600, formtimeout: 0,
        stateform: null, formaction: null, formproperties: null, formwindows: null,
        //end formgeneate
    },
    formBrowseReady: function () {
        var me, grid, store;
        me = this;
        grid = me.getGridbrowse();
        grid.doInit();
        store = grid.getStore().load({
            params: {
                mode_read: 'getmasterskkantorpusat',
                project_id: 1,
                pt_id: 1,
            },
            callback: function (data, model) {
                grid.attachModel(model);
                grid.store.sort({property: 'index_no', direction: 'ASC'});
            }
        });
    },
    formApplyBudget: function () {
        var me, grid, store;
        me = this;

        var g = me.getGrid();
        var rows = g.getSelectionModel().getSelection();
        if (rows.length < 1) {
            Ext.Msg.alert('Info', 'No record selected !');
            return;
        }
        var rec = g.getSelectedRecord();
        var id = rec.get("trainingbudget_id");

        var trainingbudget_id = "";
        if (rows.length > 0) {
            for (var i in rows) {
                trainingbudget_id += rows[i]['data']["trainingbudget_id"] + "~";
            }
        }

        Ext.Msg.confirm('Confirm', "Are you sure to apply this data?", function (btn) {
                if (btn == 'yes') {
                    me.tools.ajax({
                        params: {
                            'trainingbudget_id': trainingbudget_id
                        },
                        success: function (data, model) {
                            var g = me.getGrid();
                            var sg = g.getStore();
                            sg.reload();

                            //added by anas 28042022
                            var title, icon, msg;
                            if(data.others[0][0].HASIL["return"])
                            {
                                title = 'Success';
                                icon = Ext.Msg.INFO;
                            }
                            else
                            {
                                title = 'Failure';
                                icon = Ext.Msg.ERROR;
                            }

                            //updated by anas 28042022 (biar bisa menampilkan pesan error)   
                            Ext.Msg.show({
                                title: title,
                                msg: data.others[0][0].HASIL["errorMsg"],
                                icon: icon,
                                buttons: Ext.Msg.OK
                            });
                        }
                    }).read('processapplybudgetv2');


                }
        });

    },
    // formApplyBudget: function () {
    //     var me, grid, store;
    //     me = this;

    //     me.instantWindow("FormToolApply", 350, "Apply to Employee", "apply", "trainingbudgetformtoolapply");

    // },
    formApplyBudgetRender: function () {
        var me, grid, store;
        me = this;
        var f = me.getFormapply();
        var year = new Date().getFullYear();
        f.down("[name=trainingperiodeapply_id]").setValue(year);

        f.down("[name=employeestatusapply_id]").setValue(99);

    },
    formProcessApplyBudget: function(){
        var me = this;
        f = me.getFormapply();
        choose_periode = f.down("[name=trainingperiodeapply_id]").getValue();
        employeestatusapply_id = f.down("[name=employeestatusapply_id]").getValue();
        
        me.tools.ajax({
            params: {
                'choose_periode': choose_periode,
                'employeestatusapply_id': employeestatusapply_id
            },
            success: function (data, model) {
                
                var g = me.getGrid();
                var sg = g.getStore();
                sg.reload();
                f.up('window').close();
            }
        }).read('processapplybudget');
    },

    ChangeTrainingBudgetProgram: function () {
        var me, grid, store;
        me = this;
        var f = me.getFormdata();
        var trainingbudgetprogram_id = f.down('[name=trainingbudgetprogram_id]').getValue()

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
                var selectedRecord = '[' + store.getAt(store.indexOf(rows[0])).get(me.fieldName) + ']';
                confirmmsg = 'Delete ' + selectedRecord + ' ?';
                failmsg = 'Error: Unable to delete ' + selectedRecord + '.';
            } else {
                confirmmsg = 'This action will delete ' + recordcounttext + '.<br />Continue ?';
                failmsg = 'Error: Unable to delete data.';
            }

            var countApply = 0;
            for (var i = 0; i < rows.length; i++) {
                if(rows[i].data.apply_check == 1)
                {
                    countApply++;
                }
            }
            
            if(countApply > 0)
            {
                Ext.Msg.alert('Info', 'Ada '+countApply+' data yang tidak dapat dihapus karena sudah terapply');
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