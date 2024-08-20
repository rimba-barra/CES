Ext.define('Hrd.controller.Trainingbudgetadjustment', {
    extend: 'Hrd.template.ControllerForMaster',
    alias: 'controller.Trainingbudgetadjustment',
    controllerName: 'trainingbudgetadjustment',
    fieldName: 'periode',
    bindPrefixName: 'Trainingbudgetadjustment',
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
    init: function() {
        var me = this;
        
        me.tools = new Hrd.library.box.tools.Tools({config: me.myConfig});
        
        var events = new Hrd.library.box.tools.EventSelector();
        this.control(events.getEvents(me, me.controllerName));
        
        var newEvs = {};

        newEvs['trainingbudgetadjustmentgrid button[action=apply_adj]'] = {
            click: function () {
                me.formApplyBudget();
            },
        };

        newEvs['trainingbudgetadjustmentformdata [name=apply_adjustment_to]'] = {
            change: function () {
                me.ChangeAdjustmentTo();
            },
        };

        newEvs['trainingbudgetadjustmentformdata [name=periode]'] = {
            change: function () {
                me.ChangePeriode();
            },
        };

        this.control(newEvs);
    },
    panelAfterRender: function (el) {
        var me = this;
        var f = me.getFormsearch();
        me.tools.ajax({
            params: {},
            success: function (data, model) {
                me.tools.wesea(data.trainingcaption, f.down("[name=trainingcaption_id]")).comboBox();
                me.tools.wesea(data.employeeb, f.down("[name=employee_id]")).comboBox();
                var year = new Date().getFullYear();
                f.down("[name=periode]").setValue(year);
            }
        }).read('detail');
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
            grid.down('#btnApplyAdj').setDisabled(row.length < 1);
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
                        // me.tools.wesea(data.trainingcaption, f.down("[name=trainingcaption_id]")).comboBox();
                        me.tools.wesea(data.trainingbudgetprogram, f.down("[name=trainingbudgetprogram_id]")).comboBox();
                        me.tools.wesea(data.employeeb, f.down("[name=employee_id]")).comboBox();
                        var year = new Date().getFullYear();
                        f.down("[name=periode]").setValue(year);
                        f.down('[name=trainingbudgetprogram_id]').setReadOnly(true);
                        f.down('[name=employee_id]').setReadOnly(true);
                    }
                }).read('detail');
            },
            update: function() {

                me.tools.ajax({
                    params: {
                    },
                    success: function(data, model) {
                        // me.tools.wesea(data.trainingcaption, f.down("[name=trainingcaption_id]")).comboBox();
                        me.tools.wesea(data.employeeb, f.down("[name=employee_id]")).comboBox();
                        me.tools.wesea(data.trainingbudgetprogram, f.down("[name=trainingbudgetprogram_id]")).comboBox();
                        var rec = g.getSelectedRecord();
                        f.editedRow = g.getSelectedRow();
                        f.getForm().loadRecord(rec);
                        if(rec.data.apply_check){
                            f.down('[name=periode]').setReadOnly(true);
                            // f.down('[name=trainingcaption_id]').setReadOnly(true);
                            f.down('[name=employee_id]').setReadOnly(true);
                            f.down('[name=apply_adjustment_to]').setReadOnly(true);
                            
                            if(rec.data.apply_adjustment_to == 1){
                                f.down('[name=trainingbudgetprogram_id]').setReadOnly(true);
                                f.down('[name=adjustment]').setReadOnly(true);
                                f.down('[name=notes]').setReadOnly(true);
                                f.down('[name=minus]').setDisabled(true);
                                f.down("[action=save]").hide();
                                me.tools.alert.warning("Maaf data tersebut sudah di apply, tidak bisa di edit kembali");
                            }else{
                                me.tools.alert.warning("Jika anda merubah data, silahkan apply ulang data tersebut");

                            }

                        }

                    }
                }).read('detail');


                me.unMask(1);

            }
        };
        return x;
    },
    formApplyBudget: function () {
        var me, grid, store;
        me = this;

        var g = me.getGrid();
        var rec = g.getSelectedRecord();
        var id = rec.get("trainingbudgetadjustment_id");
        var rows = g.getSelectionModel().getSelection();
        var trainingbudgetadjustment_id = "";
        if (rows.length > 0) {
            for (var i in rows) {
                trainingbudgetadjustment_id += rows[i]['data']["trainingbudgetadjustment_id"] + "~";
            }
        }

        Ext.Msg.confirm('Confirm', "Are you sure to apply this data?", function (btn) {
                if (btn == 'yes') {
                    me.tools.ajax({
                        params: {
                            'trainingbudgetadjustment_id': trainingbudgetadjustment_id
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
                    }).read('processapplyadjustment');


                }
        });

        

    },

    ChangePeriode: function () {
        var me, grid, store;
        me = this;

        var f = me.getFormdata();
        var g = me.getGrid();
        var rec = g.getSelectedRecord();
        var periode = f.down('[name=periode]').getValue();
        var apply_adjustment_to = f.down('[name=apply_adjustment_to]').getValue();

        var trainingbudgetadjustment_id = f.down('[name=trainingbudgetadjustment_id]').getValue();

        if(apply_adjustment_to == 1){
            if(rec){
                if(!rec.data.apply_check){
                    me.tools.ajax({
                        params: {
                            'periode': periode
                        },
                        success: function (data, model) {

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
                        
                        // if(rec.data.periode != periode){
                                f.down('[name=trainingbudgetprogram_id]').setValue('');
                            // }

                       
                        me.tools.wesea(data.trainingbudgetprogram, f.down("[name=trainingbudgetprogram_id]")).comboBox();
                        me.CheckPeriodeBudgetDisabled();
                    }
                }).read('changeperiode');
            }
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
                    f.down('[name=adjustment]').setReadOnly(true);
                    f.down('[name=adjustment]').setDisabled(true);
                    f.down('[name=minus]').setDisabled(true);
                    f.down('[name=notes]').setReadOnly(true);
                    f.down('[name=notes]').setDisabled(true);

                    f.down('[name=trainingbudgetprogram_id]').setValue('');
                    f.down('[name=adjustment]').setValue('');
                }else{
                    f.down('[name=trainingbudgetprogram_id]').setReadOnly(false);
                    f.down('[name=trainingbudgetprogram_id]').setDisabled(false);
                    f.down('[name=adjustment]').setReadOnly(false);
                    f.down('[name=adjustment]').setDisabled(false);
                    f.down('[name=minus]').setDisabled(false);
                    f.down('[name=notes]').setReadOnly(false);
                    f.down('[name=notes]').setDisabled(false);
                }
            }
        }).read('checkperiodebudgetdisabled');
    },

    ChangeAdjustmentTo: function () {
        var me, grid, store;
        me = this;

        var f = me.getFormdata();
        var apply_adjustment_to = f.down('[name=apply_adjustment_to]').getValue();

        var trainingbudgetadjustment_id = f.down('[name=trainingbudgetadjustment_id]').getValue();

        if(trainingbudgetadjustment_id === ""){
            f.down('[name=trainingbudgetprogram_id]').setValue('');
            f.down('[name=employee_id]').setValue('');
        }
            if(apply_adjustment_to == 1){
                f.down('[name=employee_id]').setValue('');
                f.down('[name=trainingbudgetprogram_id]').setReadOnly(false);
                f.down('[name=employee_id]').setReadOnly(true);

                me.ChangePeriode();
            }else{
                f.down('[name=trainingbudgetprogram_id]').setValue('');
                f.down('[name=employee_id]').setReadOnly(false);
                f.down('[name=trainingbudgetprogram_id]').setReadOnly(true);
                f.down('[name=trainingbudgetprogram_id]').setDisabled(false);
                f.down('[name=adjustment]').setReadOnly(false);
                f.down('[name=adjustment]').setDisabled(false);
                f.down('[name=minus]').setDisabled(false);
                f.down('[name=notes]').setReadOnly(false);
                f.down('[name=notes]').setDisabled(false);
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