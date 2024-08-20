Ext.define('Hrd.controller.Trainingbudgetprogram', {
    extend: 'Hrd.template.ControllerForMaster',
    alias: 'controller.Trainingbudgetprogram',
    controllerName: 'trainingbudgetprogram',
    fieldName: 'periode',
    bindPrefixName: 'Trainingbudgetprogram',
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

        newEvs['trainingbudgetprogramformdata [name=periode]'] = {
            change: function () {
                me.CheckPeriodeBudget();
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
                var year = new Date().getFullYear();
                f.down("[name=periode]").setValue(year);
            }
        }).read('detail');
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
                        var year = new Date().getFullYear();
                        f.down("[name=periode]").setValue(year);
                        me.CheckPeriodeBudget();
                    }
                }).read('detail');
            },
            update: function() {

                me.tools.ajax({
                    params: {
                    },
                    success: function(data, model) {
                        me.tools.wesea(data.trainingcaption, f.down("[name=trainingcaption_id]")).comboBox();
                        var rec = g.getSelectedRecord();
                        f.editedRow = g.getSelectedRow();
                        f.getForm().loadRecord(rec);

                        f.down('[name=periode]').setReadOnly(true);
                        f.down('[name=trainingcaption_id]').setReadOnly(true);

                        var trainingbudgetprogram_id = rec.data.trainingbudgetprogram_id;
                            me.tools.ajax({
                                params: {trainingbudgetprogram_id:trainingbudgetprogram_id},
                                success: function (data, model) {
                                    var ada_record = data.others[0][0].ada_record;

                                    if(ada_record){
                                        me.tools.alert.warning("Maaf Budget Program sudah digunakan pada Training Budget");
                                        f.down('[name=periode]').setReadOnly(true);
                                        f.down('[name=trainingcaption_id]').setReadOnly(true);
                                        f.down('[name=budget]').setReadOnly(true);
                                        f.down('[name=budget]').setDisabled(true);
                                        f.down("[action=save]").hide();
                                    }

                                }
                            }).read('getcheck');

                            //cek ada adjustment gak
                            me.tools.ajax({
                                params: {trainingbudgetprogram_id:trainingbudgetprogram_id},
                                success: function (data, model) {
                                    var ada_record = data.others[0][0].ada_record;

                                    if(ada_record){
                                        me.tools.alert.warning("Maaf Budget Program ada Adjustment");
                                        f.down('[name=periode]').setReadOnly(true);
                                        f.down('[name=trainingcaption_id]').setReadOnly(true);
                                        f.down('[name=budget]').setReadOnly(true);
                                        f.down('[name=budget]').setDisabled(true);
                                        f.down("[action=save]").hide();
                                    }

                                }
                            }).read('getcheckadj');
                    }
                }).read('detail');


                me.unMask(1);

            }
        };
        return x;
    },
    CheckPeriodeBudget: function () {
        var me, grid, store;
        me = this;
        var f = me.getFormdata();
        var g = me.getGrid();
        var periode = f.down('[name=periode]').getValue();
        var trainingcaption_id = f.down('[name=trainingcaption_id]').getValue();

        var trainingbudgetprogram_id = f.down('[name=trainingbudgetprogram_id]').getValue();

        if(trainingbudgetprogram_id === ""){
            me.tools.ajax({
                params: {periode:periode,trainingcaption_id:trainingcaption_id},
                success: function (data, model) {
                    // f.down('[name=trainingcaption_id]').setValue('');
                    me.tools.wesea(data.trainingcaption, f.down("[name=trainingcaption_id]")).comboBox();
                    me.CheckPeriodeBudgetDisabled();
                }
            }).read('checkperiodebudget');
        }
    },
    CheckPeriodeBudgetDisabled: function () {
        var me, grid, store;
        me = this;
        var f = me.getFormdata();
        var periode = f.down('[name=periode]').getValue();
        var trainingcaption_id = f.down('[name=trainingcaption_id]').getValue();

        me.tools.ajax({
            params: {periode:periode,trainingcaption_id:trainingcaption_id},
            success: function (data, model) {
                var flag_zero = data.others[0][0].flag_zero;

                if(flag_zero){
                    me.tools.alert.warning("Maaf Periode ini semua budget sudah di set");
                    f.down('[name=trainingcaption_id]').setReadOnly(true);
                    f.down('[name=trainingcaption_id]').setDisabled(true);
                    f.down('[name=budget]').setReadOnly(true);
                    f.down('[name=budget]').setDisabled(true);
                    f.down('[name=trainingcaption_id]').setValue('');
                    f.down('[name=budget]').setValue('');
                }else{
                    f.down('[name=trainingcaption_id]').setReadOnly(false);
                    f.down('[name=trainingcaption_id]').setDisabled(false);
                    f.down('[name=budget]').setReadOnly(false);
                    f.down('[name=budget]').setDisabled(false);
                }
            }
        }).read('checkperiodebudgetdisabled');
    },

});