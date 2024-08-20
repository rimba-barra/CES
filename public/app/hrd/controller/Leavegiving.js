Ext.define('Hrd.controller.Leavegiving', {
    extend: 'Hrd.library.box.controller.ControllerByEmployee2',
    alias: 'controller.Leavegiving',
    requires: ['Hrd.minic.leavegiving.GenerateYearly', 'Hrd.minic.lookup.Employee'],
    views: [],
    comboBoxIdEl: [],
    controllerName: 'leavegiving',
    fieldName: 'leaveentitlements_id',
    formWidth: 500,
    refs: [
        {
            ref: 'gridleave',
            selector: 'leavegivingleavegrid'
        },
        {
            ref: 'formprocess',
            selector: 'leavegivingprosesformdata'
        },
        
        //added by anas 08122021
        {
            ref: 'gridkompensasiextraleave',
            selector: 'leavegivingkompensasiextraleavegrid'
        },

        //added by michael 20220614 | untuk keperluan Cuti Hotel
        {
            ref: 'gridbanding',
            selector: 'leavegivingbandinggrid'
        },
        {
            ref: 'gridbandingcontract',
            selector: 'leavegivingbandingcontractgrid'
        },
        {
            ref: 'formparameter',
            selector: 'leavegivingformparam'
        },
        
        {
            ref: 'gridbandingeo',
            selector: 'leavegivingbandingeogrid'
        },
        {
            ref: 'gridbandingcontracteo',
            selector: 'leavegivingbandingcontracteogrid'
        },
        {
            ref: 'formparametereo',
            selector: 'leavegivingformparameo'
        },

        {
            ref: 'gridbandingph',
            selector: 'leavegivingbandingphgrid'
        },
        {
            ref: 'gridbandingcontractph',
            selector: 'leavegivingbandingcontractphgrid'
        },
        {
            ref: 'formparameterph',
            selector: 'leavegivingformparamph'
        },
        {
            ref: 'gridholiday',
            selector: 'leavegivingholidaygrid'
        },
        {
            ref: 'gridbandingphspecial',
            selector: 'leavegivingbandingphspecialgrid'
        },
        {
            ref: 'gridbandingcontractphspecial',
            selector: 'leavegivingbandingcontractphspecialgrid'
        },
        //end added by michael 20220614 | untuk keperluan Cuti Hotel
    ],
    //unitFormula: null,
    //storeProcess: 'Otherspaymentdatadetail',
    bindPrefixName: 'Leavegiving',
    browseHandler: null,
    comboLoader: null,
    globalParams: null,
    localStore: {
        selectedUnit: null
    },
    tempSelectedEmployee: 0,
    textCombos: [],
    tools: null,
    expireDuration: 0,
    constructor: function(configs) {
        var me = this;
        var config = new Hrd.library.box.tools.DefaultConfig({
            moduleName: me.controllerName
        });
        config.run(this);
        
        me.registerMiniCtrlAlt('employee', new Hrd.minic.lookup.Employee({
            controllerName: 'Leavegiving'
        }));
        me.registerMiniCtrlAlt('generateyearly', new Hrd.minic.leavegiving.GenerateYearly({
            controllerName: 'Leavegiving'
        }));
        this.callParent(arguments);
        Ext.tip.QuickTipManager.init();


        //  me.reason = new Hrd.model.absentrecord.Reason();
    },
    init: function() {
        var me = this;
        this.callParent(arguments);
        var newEvs = {};
        newEvs['leavegivingleavegrid'] = {
            selectionchange: me.mainGridSelectionChange
        };
        newEvs['leavegivingformdata [name=start_use]'] = {
            blur: function() {
                me.startUseKeyUp();
            }
        };
        newEvs['leavegivingformdata [name=leavegroup]'] = {
            blur: function() {
                me.leaveGroupOnBlur();
            }
        };
        newEvs['leavegivingpanel toolbar [action=generate]'] = {
            blur: function() {
                me.showFormYearGen();
            }
        };
        newEvs['leavegivingpanel toolbar [action=habis]'] = {
            blur: function() {
                me.habisCuti();
            }
        };
        newEvs['leavegivingpanel toolbar [action=proses]'] = {
            blur: function() {
                me.showFormProcess();
            }
        };
        newEvs['leavegivingpanel toolbar [action=refresh]'] = {
            blur: function() {
                me.refreshDataHakCuti();
            }
        };
        newEvs['leavegivingprosesformdata [action=process]'] = {
            click: function() {
                me.proses();
            }
        };
        //added by michael 20220614 | untuk keperluan Cuti Hotel
        newEvs['leavegivingpanel toolbar [action=param]'] = {
            blur: function() {
                me.showFormParam();
            }
        };
        newEvs['leavegivingpanel toolbar button[action=param]'] = {
            click: function () {
                var me;
                me = this;
                me.showFormParam();
            }
        };
        newEvs['leavegivingformparam'] = {
            afterrender: function () {
                var me;
                me = this;
                me.FromParamAfterrender();
            },
            boxready: function () {
                var me;
                me = this;
                me.getDataBanding();
            }
        };
        newEvs['leavegivingformparam button[action=save]'] = {
            click: function () {
                var me;
                me = this;
                me.saveParam();
            }
        };
        newEvs['leavegivingformparam [name=opsiparam]'] = {
            change: function () {
                me.disabledParam();
            },
        };

        //---

        newEvs['leavegivingpanel toolbar [action=parameo]'] = {
            blur: function() {
                me.showFormParamEo();
            }
        };
        newEvs['leavegivingpanel toolbar button[action=parameo]'] = {
            click: function () {
                var me;
                me = this;
                me.showFormParamEo();
            }
        };
        newEvs['leavegivingformparameo'] = {
            afterrender: function () {
                var me;
                me = this;
                me.FromParamEoAfterrender();
            },
            boxready: function () {
                var me;
                me = this;
                // me.getDataBandingEo();
            }
        };
        newEvs['leavegivingformparameo button[action=save]'] = {
            click: function () {
                var me;
                me = this;
                me.saveParamEo();
            }
        };
        newEvs['leavegivingformparameo [name=opsiparameo]'] = {
            change: function () {
                me.disabledParamEo();
            },
        };

        //---

        newEvs['leavegivingpanel toolbar [action=paramph]'] = {
            blur: function() {
                me.showFormParamPh();
            }
        };
        newEvs['leavegivingpanel toolbar button[action=paramph]'] = {
            click: function () {
                var me;
                me = this;
                me.showFormParamPh();
            }
        };
        newEvs['leavegivingformparamph'] = {
            afterrender: function () {
                var me;
                me = this;
                me.FromParamPhAfterrender();
            },
            boxready: function () {
                var me;
                me = this;
                me.getDataBandingPh();
                me.getDataHoliday();
                me.getDataBandingPhSpecial();
            }
        };
        newEvs['leavegivingformparamph button[action=save]'] = {
            click: function () {
                var me;
                me = this;
                me.saveParamPh();
            }
        };
        newEvs['leavegivingformparamph [name=opsiparamph]'] = {
            change: function () {
                me.disabledParamPh();
            },
        };
        //end added by michael 20220614 | untuk keperluan Cuti Hotel
        //added by anas 08122021
        newEvs['leavegivingpanel toolbar [action=kompensasiextraleave]'] = {
            blur: function() {
                me.kompensasiExtraLeave();
            }
        };
        //
        this.control(newEvs);

    },
    refreshDataHakCuti: function() {
        var me = this;
        var p = me.getPanel();
        var gl = me.getGridleave();

        var selectedRow = me.getGrid().getSelectedRow();
  

        p.setLoading("Loading...");
        gl.getStore().load({
            params: {
                limit: 9999
            },
            callback: function(rec, op) {
                
                if(me.tools.intval(selectedRow) >= 0){
                  
                    me.getGrid().getSelectionModel().select(selectedRow);
                }

               // me.getGrid().getSelectionModel().select(0);
                var rec = me.getGrid().getSelectedRecord();
                me.doGridLeaveFilter(rec.get("employee_id"));
                p.setLoading(false);
            }
        });
    },
    proses: function() {
        var me = this;
        var p = me.getPanel();
        var f = me.getFormprocess();
        f.setLoading("Recalculating...");
        me.tools.ajax({
            params: f.getForm().getValues(),
            fail: function(msg, data) {

                f.setLoading(false);
            },
            success: function(data) {
                f.setLoading(false);
                f.up("window").close();
                me.tools.alert.info("Success!");
            }
        }).process('proses');
    },
    showFormProcess: function() {
        var me = this;
        me.instantWindow("FormProses", 600, "Recalculate Process", "create", "recalculate");
        var rec = me.getGrid().getSelectedRecord();
        var fp = me.getFormprocess();
        if (rec) {
            fp.down("[name=employee_name]").setValue(rec.get("employee_name"));
            fp.down("[name=employee_id]").setValue(rec.get("employee_id"));
        }

    },
    habisCuti: function() {
        var me = this;
        me.prosesPanggilAjax('habiscuti');
    },
    prosesPanggilAjax: function(modeRead) {
        var me = this;
        var p = me.getPanel();
        p.setLoading("Processing...");
        me.tools.ajax({
            params: {},
            success: function(data, model) {
                console.log(data['others']);
                if (data['others'][0][0]['HASIL']) {
                    me.tools.alert.info('Success');
                    me.loadGridLeave(false);
                } else {
                    me.tools.alert.warning(data['others'][0][0]['MSG']);
                }
                p.setLoading(false);
            }
        }).read(modeRead);
    },
    leaveGroupOnBlur: function() {
        var me = this;
        var f = me.getFormdata();
        var g = me.tools.intval(f.down("[name=leavegroup]").getGroupValue());
        var jatahCuti = g == 1 ? me.globalParams.P_nleave_quota : me.globalParams.P_bleave_quota;
        f.down("[name=amount]").setValue(jatahCuti);
        f.down("[name=rest]").setValue(jatahCuti);

    },
    startUseKeyUp: function() {

        var me = this;
        var f = me.getFormdata();
        var y = me.tools.intval(f.down("[name=start_use]").getValue());
        var ed = new Date(); // expire date
        ed.setFullYear(y + 1);
        ed.setMonth(11);
        ed.setDate(31);
        f.down("[name=end_use]").setValue(y);
        f.down("[name=expired_date]").setValue(ed);
        f.down("[name=extension_date]").setValue(ed);
    },
    getMainGrid: function() {
        var me = this;
        return me.getGridleave();
    },
    showFormYearGen: function() {
        var me = this;
        me.instantWindow("GenerateYearly", 600, "Generate Cuti", "create", "generateyearly");
    },
    //added by michael 20220614 | untuk keperluan Cuti Hotel
    showFormParam: function() {
        var me = this;
        me.instantWindow("FormParam", 600, "Parameter Cuti", "create", "formparam");
    },
    FromParamAfterrender: function () {
        var me, form;
        me = this;
        form = me.getFormparameter();

        me.setReadonlydata(form);

        me.tools.ajax({
            params: {
            },
            success: function (data, model) {
                me.tools.wesea(data.paramcuti, form.down("[name=parametercuti_terbit_id]")).comboBox();
            }
        }).read('detailParameterTerbit');

        me.tools.ajax({
            params: {
            },
            success: function (data, model) {
                me.tools.wesea(data.paramcutiexpired, form.down("[name=parametercuti_expired_id]")).comboBox();
            }
        }).read('detailParameterExpired');

        //get data
        me.tools.ajax({
            params: {
            },
            success: function (data, model) {
                setTimeout(function() {
                form.down("[name=opsiparam]").setValue(data.paramcutidetail.data[0].opsiparam);
                form.down("[name=parametercuti_id]").setValue(data.paramcutidetail.data[0].parametercuti_id);
                form.down("[name=expired_sampai]").setValue(data.paramcutidetail.data[0].expired_sampai);
                form.down("[name=parametercuti_terbit_id]").setValue(data.paramcutidetail.data[0].parametercuti_terbit_id);
                form.down("[name=parametercuti_expired_id]").setValue(data.paramcutidetail.data[0].parametercuti_expired_id);
                form.down("[name=is_sama]").setValue(data.paramcutidetail.data[0].is_sama);
                me.getDataBanding();
                }, 500);
            }
        }).read('getParam');

    },
    getDataBanding: function (flag) {
        var me, form, formvalue, grid, store, gridabsent, storeabsent, record, row;
        me = this;
        form = me.getFormparameter();
        formvalue = form.getForm().getValues();
        grid = me.getGridbanding();

        parametercuti_id = form.down('[name=parametercuti_id]').getValue();

        grid.doInit();
        me.tools.ajax({
                params: {
                    parametercuti_id: parametercuti_id
                },
                success: function(data, model) {
                    me.tools.wesea({data: data, model: model}, grid).grid();
                    grid.setLoading(false);
                }
            }).read('detailbanding');

        //contract
        gridcontract = me.getGridbandingcontract();

        gridcontract.doInit();
        me.tools.ajax({
                params: {
                    parametercuti_id: parametercuti_id
                },
                success: function(data, model) {
                    me.tools.wesea({data: data, model: model}, gridcontract).grid();
                    gridcontract.setLoading(false);
                }
            }).read('detailbandingcontract');
    },
    saveParam: function () {
        var me, form;
        me = this;
        form = me.getFormparameter();

        opsiparam = form.down('[name=opsiparam]').getGroupValue();

        if(opsiparam == 2){

            if(form.down('[name=parametercuti_terbit_id]').getValue() == '' || form.down('[name=parametercuti_terbit_id]').getValue() == null){
                me.tools.alert.warning("Terbit berdasarkan masih kosong");
                return false;
            } else {
                parametercuti_terbit_id = form.down('[name=parametercuti_terbit_id]').getValue();
            }

            if(form.down('[name=parametercuti_expired_id]').getValue() == '' || form.down('[name=parametercuti_expired_id]').getValue() == null){
                me.tools.alert.warning("Expired berdasarkan masih kosong");
                return false;
            } else {
                parametercuti_expired_id = form.down('[name=parametercuti_expired_id]').getValue();
            }

            if(form.down('[name=expired_sampai]').getValue() == '' || form.down('[name=expired_sampai]').getValue() == null){
                me.tools.alert.warning("Expired sampai masih kosong");
                return false;
            } else {
                expired_sampai = form.down('[name=expired_sampai]').getValue();
            }

            is_sama = form.down('[name=is_sama]').getValue();

        }else{
            parametercuti_terbit_id = '';
            parametercuti_expired_id = '';
            expired_sampai = '';
            is_sama = '';
        }

        parametercuti_id = form.down('[name=parametercuti_id]').getValue();
        

        var gbanding = me.getGridbanding();
        var sgbanding = gbanding.getStore();
        var data_banding = sgbanding.data.items;

        var gbandingContract = me.getGridbandingcontract();
        var sgbandingContract = gbandingContract.getStore();
        var data_bandingContract = sgbandingContract.data.items;
        
        var ids_bandingId = '';
        var ids_bandingLeave = '';
        var ids_bandingIdContract = '';
        var ids_bandingLeaveContract = '';

        $.each(data_banding, function (key, value) {
            var data_cell_current = value.data;
            // var jsonString_cell = JSON.stringify(data_cell_current);

            if (data_cell_current.banding_id != null) {
                ids_bandingId += data_cell_current.banding_id + "~";
                ids_bandingLeave += data_cell_current.leaveentitlements_rest + "~";
            }

        });

        $.each(data_bandingContract, function (key, value) {
            var data_cell_current = value.data;
            // var jsonString_cell = JSON.stringify(data_cell_current);

            if (data_cell_current.banding_id != null) {
                ids_bandingIdContract += data_cell_current.banding_id + "~";
                ids_bandingLeaveContract += data_cell_current.leaveentitlements_rest + "~";
            }

        });

        Ext.Msg.confirm('Confirm', "Apakah anda sudah yakin dengan Parameter Cuti yang ada setting?", function (btn) {
            if (btn == 'yes') {
                form.setLoading('Please wait...');
                me.tools.ajax({
                    params: {
                        opsiparam : opsiparam,
                        parametercuti_terbit_id: parametercuti_terbit_id,
                        parametercuti_expired_id: parametercuti_expired_id,
                        expired_sampai: expired_sampai,
                        is_sama: is_sama,
                        ids_bandingId: ids_bandingId,
                        ids_bandingLeave: ids_bandingLeave,
                        ids_bandingIdContract: ids_bandingIdContract,
                        ids_bandingLeaveContract: ids_bandingLeaveContract,
                        parametercuti_id: parametercuti_id
                        // data_banding: JSON.stringify(data_banding),
                        // data_bandingContract: JSON.stringify(data_bandingContract)
                    },
                    success: function (data, model) {
                        // me.tools.wesea(data.paramcuti, form.down("[name=parametercuti_terbit_id]")).comboBox();
                        form.setLoading(false);
                        form.up("window").close();
                        me.tools.alert.info("Success! Silahkan buka kembali Parameter Cuti untuk memastikan data sudah terupdate");
                    }
                }).read('saveParam');

            }
        });

    },
    disabledParam: function () {
        var me, form;
        me = this;
        form = me.getFormparameter();

        opsiparam = form.down('[name=opsiparam]').getGroupValue();
        if(opsiparam == '1'){
            me.setReadonlydata(form);
        }else{
            me.unsetReadonlydata(form);
        }
        // alert(opsiparam);
    },
    setReadonlydata: function (form) {
        form.down('[name=parametercuti_terbit_id]').setDisabled(true);
        form.down('[name=parametercuti_expired_id]').setDisabled(true);
        form.down('[name=expired_sampai]').setDisabled(true);
        form.down('[name=is_sama]').setDisabled(true);
    },
    unsetReadonlydata: function (form) {
        form.down('[name=parametercuti_terbit_id]').setDisabled(false);
        form.down('[name=parametercuti_expired_id]').setDisabled(false);
        form.down('[name=expired_sampai]').setDisabled(false);
        form.down('[name=is_sama]').setDisabled(false);
    },

    //---
    showFormParamPh: function() {
        var me = this;
        me.instantWindow("FormParamPh", 600, "Parameter Cuti Public Holiday", "create", "formparamph");
    },
    FromParamPhAfterrender: function () {
        var me, form;
        me = this;
        form = me.getFormparameterph();

        me.setReadonlydataPh(form);
        
        me.tools.ajax({
            params: {
            },
            success: function (data, model) {
                me.tools.wesea(data.paramcutiph, form.down("[name=parametercutiph_terbit_id]")).comboBox();
            }
        }).read('detailParameterPhTerbit');

        me.tools.ajax({
            params: {
            },
            success: function (data, model) {
                me.tools.wesea(data.paramcutiphexpired, form.down("[name=parametercutiph_expired_id]")).comboBox();
            }
        }).read('detailParameterPhExpired');

        //get data
        me.tools.ajax({
            params: {
            },
            success: function (data, model) {
                setTimeout(function() {
                form.down("[name=opsiparamph]").setValue(data.paramcutiphdetail.data[0].opsiparamph);
                form.down("[name=parametercutiph_id]").setValue(data.paramcutiphdetail.data[0].parametercutiph_id);
                form.down("[name=expired_sampai_ph]").setValue(data.paramcutiphdetail.data[0].expired_sampai_ph);
                form.down("[name=parametercutiph_terbit_id]").setValue(data.paramcutiphdetail.data[0].parametercutiph_terbit_id);
                form.down("[name=parametercutiph_expired_id]").setValue(data.paramcutiphdetail.data[0].parametercutiph_expired_id);
                form.down("[name=is_sama_ph]").setValue(data.paramcutiphdetail.data[0].is_sama_ph);
                me.getDataBandingPh();
                me.getDataHoliday();
                me.getDataBandingPhSpecial();
                }, 500);
            }
        }).read('getParamPh');

    },
    getDataBandingPh: function (flag) {
        var me, form, formvalue, grid, store, gridabsent, storeabsent, record, row;
        me = this;
        form = me.getFormparameterph();
        formvalue = form.getForm().getValues();
        grid = me.getGridbandingph();

        parametercutiph_id = form.down('[name=parametercutiph_id]').getValue();

        grid.doInit();
        me.tools.ajax({
                params: {
                    parametercutiph_id: parametercutiph_id
                },
                success: function(data, model) {
                    me.tools.wesea({data: data, model: model}, grid).grid();
                    grid.setLoading(false);
                }
            }).read('detailbandingph');

        //contract
        gridcontract = me.getGridbandingcontractph();

        gridcontract.doInit();
        me.tools.ajax({
                params: {
                    parametercutiph_id: parametercutiph_id
                },
                success: function(data, model) {
                    me.tools.wesea({data: data, model: model}, gridcontract).grid();
                    gridcontract.setLoading(false);
                }
            }).read('detailbandingcontractph');
    },
    getDataBandingPhSpecial: function (flag) {
        var me, form, formvalue, grid, store, gridabsent, storeabsent, record, row;
        me = this;
        form = me.getFormparameterph();
        formvalue = form.getForm().getValues();
        gridspecial = me.getGridbandingphspecial();

        parametercutiph_id = form.down('[name=parametercutiph_id]').getValue();

        gridspecial.doInit();
        me.tools.ajax({
                params: {
                    parametercutiph_id: parametercutiph_id
                },
                success: function(data, model) {
                    me.tools.wesea({data: data, model: model}, gridspecial).grid();
                    gridspecial.setLoading(false);
                }
            }).read('detailbandingphspecial');

        //contract
        gridcontractspecial = me.getGridbandingcontractphspecial();

        gridcontractspecial.doInit();
        me.tools.ajax({
                params: {
                    parametercutiph_id: parametercutiph_id
                },
                success: function(data, model) {
                    me.tools.wesea({data: data, model: model}, gridcontractspecial).grid();
                    gridcontractspecial.setLoading(false);
                }
            }).read('detailbandingcontractphspecial');
    },
    getDataHoliday: function (flag) {
        var me, form, formvalue, grid, store, gridabsent, storeabsent, record, row;
        me = this;
        form = me.getFormparameterph();
        formvalue = form.getForm().getValues();
        grid = me.getGridholiday();

        parametercutiph_id = form.down('[name=parametercutiph_id]').getValue();

        grid.doInit();
        me.tools.ajax({
                params: {
                    parametercutiph_id: parametercutiph_id
                },
                success: function(data, model) {
                    me.tools.wesea({data: data, model: model}, grid).grid();
                    grid.setLoading(false);
                }
            }).read('detailholiday');

    },
    saveParamPh: function () {
        var me, form;
        me = this;
        form = me.getFormparameterph();

        opsiparamph = form.down('[name=opsiparamph]').getGroupValue();

        if(opsiparamph == 2){

            if(form.down('[name=parametercutiph_terbit_id]').getValue() == '' || form.down('[name=parametercutiph_terbit_id]').getValue() == null){
                me.tools.alert.warning("Terbit berdasarkan masih kosong");
                return false;
            } else {
                parametercutiph_terbit_id = form.down('[name=parametercutiph_terbit_id]').getValue();
            }

            if(form.down('[name=parametercutiph_expired_id]').getValue() == '' || form.down('[name=parametercutiph_expired_id]').getValue() == null){
                me.tools.alert.warning("Expired berdasarkan masih kosong");
                return false;
            } else {
                parametercutiph_expired_id = form.down('[name=parametercutiph_expired_id]').getValue();
            }

            if(form.down('[name=expired_sampai_ph]').getValue() == '' || form.down('[name=expired_sampai_ph]').getValue() == null){
                me.tools.alert.warning("Expired sampai masih kosong");
                return false;
            } else {
                expired_sampai_ph = form.down('[name=expired_sampai_ph]').getValue();
            }

            is_sama_ph = form.down('[name=is_sama_ph]').getValue();

        }else{
            parametercutiph_terbit_id = '';
            parametercutiph_expired_id = '';
            expired_sampai_ph = '';
            is_sama_ph = '';
        }

        parametercutiph_id = form.down('[name=parametercutiph_id]').getValue();
        

        var gbanding = me.getGridbandingph();
        var sgbanding = gbanding.getStore();
        var data_banding = sgbanding.data.items;

        var gbandingContract = me.getGridbandingcontractph();
        var sgbandingContract = gbandingContract.getStore();
        var data_bandingContract = sgbandingContract.data.items;

        var gholidayname = me.getGridholiday();
        var sgholidayname = gholidayname.getStore();
        var data_holidayname = sgholidayname.data.items;

        var gbandingspecial = me.getGridbandingphspecial();
        var sgbandingspecial = gbandingspecial.getStore();
        var data_bandingspecial = sgbandingspecial.data.items;

        var gbandingContractspecial = me.getGridbandingcontractphspecial();
        var sgbandingContractspecial = gbandingContractspecial.getStore();
        var data_bandingContractspecial = sgbandingContractspecial.data.items;
        
        var ids_bandingId = '';
        var ids_bandingLeave = '';
        var ids_bandingIdContract = '';
        var ids_bandingLeaveContract = '';
        var ids_holidayId = '';
        var ids_holiday = '';
        var ids_bandingspecialId = '';
        var ids_holidayspecialId = '';
        var ids_bandingspecialLeave = '';
        var ids_bandingspecialIdContract = '';
        var ids_holidayspecialIdContract = '';
        var ids_bandingspecialLeaveContract = '';

        $.each(data_banding, function (key, value) {
            var data_cell_current = value.data;
            // var jsonString_cell = JSON.stringify(data_cell_current);

            if (data_cell_current.banding_id != null) {
                ids_bandingId += data_cell_current.banding_id + "~";
                ids_bandingLeave += data_cell_current.leaveentitlements_rest + "~";
            }

        });

        $.each(data_bandingContract, function (key, value) {
            var data_cell_current = value.data;
            // var jsonString_cell = JSON.stringify(data_cell_current);

            if (data_cell_current.banding_id != null) {
                ids_bandingIdContract += data_cell_current.banding_id + "~";
                ids_bandingLeaveContract += data_cell_current.leaveentitlements_rest + "~";
            }

        });

        $.each(data_holidayname, function (key, value) {
            var data_cell_current = value.data;
            // var jsonString_cell = JSON.stringify(data_cell_current);

            if (data_cell_current.holiday_name_id != null) {
                ids_holidayId += data_cell_current.holiday_name_id + "~";
                ids_holiday += data_cell_current.is_cuti_ph + "~";
            }

        });

        $.each(data_bandingspecial, function (key, value) {
            var data_cell_current = value.data;
            // var jsonString_cell = JSON.stringify(data_cell_current);

            if (data_cell_current.banding_id != null) {
                ids_bandingspecialId += data_cell_current.banding_id + "~";
                ids_holidayspecialId += data_cell_current.holiday_name_id + "~";
                ids_bandingspecialLeave += data_cell_current.leaveentitlements_rest + "~";
            }

        });

        $.each(data_bandingContractspecial, function (key, value) {
            var data_cell_current = value.data;
            // var jsonString_cell = JSON.stringify(data_cell_current);

            if (data_cell_current.banding_id != null) {
                ids_bandingspecialIdContract += data_cell_current.banding_id + "~";
                ids_holidayspecialIdContract += data_cell_current.holiday_name_id + "~";
                ids_bandingspecialLeaveContract += data_cell_current.leaveentitlements_rest + "~";
            }

        });

        Ext.Msg.confirm('Confirm', "Apakah anda sudah yakin dengan Parameter Cuti Public Holiday yang ada setting?", function (btn) {
            if (btn == 'yes') {
                form.setLoading('Please wait...');
                me.tools.ajax({
                    params: {
                        opsiparamph :opsiparamph,
                        parametercutiph_terbit_id: parametercutiph_terbit_id,
                        parametercutiph_expired_id: parametercutiph_expired_id,
                        expired_sampai_ph: expired_sampai_ph,
                        is_sama_ph: is_sama_ph,
                        ids_bandingId: ids_bandingId,
                        ids_bandingLeave: ids_bandingLeave,
                        ids_bandingIdContract: ids_bandingIdContract,
                        ids_bandingLeaveContract: ids_bandingLeaveContract,
                        ids_holidayId: ids_holidayId,
                        ids_holiday: ids_holiday,
                        ids_bandingspecialId: ids_bandingspecialId,
                        ids_holidayspecialId: ids_holidayspecialId,
                        ids_bandingspecialLeave: ids_bandingspecialLeave,
                        ids_bandingspecialIdContract: ids_bandingspecialIdContract,
                        ids_holidayspecialIdContract: ids_holidayspecialIdContract,
                        ids_bandingspecialLeaveContract: ids_bandingspecialLeaveContract,
                        parametercutiph_id: parametercutiph_id
                        // data_banding: JSON.stringify(data_banding),
                        // data_bandingContract: JSON.stringify(data_bandingContract)
                    },
                    success: function (data, model) {
                        // me.tools.wesea(data.paramcuti, form.down("[name=parametercuti_terbit_id]")).comboBox();
                        form.setLoading(false);
                        form.up("window").close();
                        me.tools.alert.info("Success! Silahkan buka kembali Parameter Cuti Public Holiday untuk memastikan data sudah terupdate");
                    }
                }).read('saveParamPh');

            }
        });

    },
    disabledParamPh: function () {
        var me, form;
        me = this;
        form = me.getFormparameterph();

        opsiparamph = form.down('[name=opsiparamph]').getGroupValue();
        if(opsiparamph == '1'){
            me.setReadonlydataPh(form);
        }else{
            me.unsetReadonlydataPh(form);
        }
        // alert(opsiparam);
    },
    setReadonlydataPh: function (form) {
        form.down('[name=parametercutiph_terbit_id]').setDisabled(true);
        form.down('[name=parametercutiph_expired_id]').setDisabled(true);
        form.down('[name=expired_sampai_ph]').setDisabled(true);
        form.down('[name=is_sama_ph]').setDisabled(true);
    },
    unsetReadonlydataPh: function (form) {
        form.down('[name=parametercutiph_terbit_id]').setDisabled(false);
        form.down('[name=parametercutiph_expired_id]').setDisabled(false);
        form.down('[name=expired_sampai_ph]').setDisabled(false);
        form.down('[name=is_sama_ph]').setDisabled(false);
    },
    //---
    showFormParamEo: function() {
        var me = this;
        me.instantWindow("FormParamEo", 600, "Parameter Cuti Extra Off/Extra Leave", "create", "formparameo");
    },
    FromParamEoAfterrender: function () {
        var me, form;
        me = this;
        form = me.getFormparametereo();

    },
    //end added by michael 20220614 | untuk keperluan Cuti Hotel
    lookupEmployee: function() {
        var me = this;
        me.instantWindow("Panel", 600, "Employe List", "create", "employeewindow", "lookup.employee");

    },
    loadGridLeave: function(isInit) {
        var me = this;
        var gl = me.getGridleave();
        gl.getStore().load({
            params: {
                limit: 9999
            },
            callback: function(rec, op) {
                if (isInit) {
                    gl.attachModel(op);
                }
                
                var rec = me.getGrid().getSelectedRecord();
                
                // edit by wulan sari 20190503, kalau kosong maka filter me.doGridLeaveFilter(1), supaya tabel detail tetap kosong
                rec != undefined ? me.doGridLeaveFilter(rec.get("employee_id")) : me.doGridLeaveFilter(1); 
            }
        });
    },
    panelAfterRender: function(el) {
        var me = this;


        var me = this;
        var p = me.getPanel();
        p.setLoading('Please wait...');
        me.tools.ajax({
            params: {},
            success: function(data, model) {


                // me.tools.wesea(data.absenttype, me.getFormdata().down("[name=absenttype_absenttype_id]")).comboBox();

                me.tools.wesea(data.department, me.getPanel().down("leavegivingformsearch").down("[name=department_department_id]")).comboBox(true);


                //leave grid load
                var gl = me.getGridleave();
                gl.getSelectionModel().setSelectionMode('SINGLE');
                gl.doInit();
                //gl.getStore().getProxy().extraParams.limit = 9999;
                me.loadGridLeave(true);

                me.globalParams = data['others'][0][0]['GLOBALPARAMSPARAMS'];
                me.expireDuration = data['others'][0][0]['EXPIRE_DURATION'];



                p.setLoading(false);
            }
        }).read('detail');
        me.callParent(arguments);





    },
    finalData: function(data) {
        var me = this;
         var f = me.getFormdata();
          data["is_leave_end"] = f.down("[name=is_leave_end]").checked ? 1 : 0;
      
        return data;
    },
    mainDataSave: function() {
        var me = this;

        var f = me.getFormdata();
        var g = me.getGrid();
        var s = g.getStore();


        /* rec.beginEdit();
         rec.set({
         in_7_14: me._convertTime().formToGrid("timein"),
         out_7_14: me._convertTime().formToGrid("timeout"),
         shifttype_code: selectedShift.get("code"),
         shifttype_shifttype_id: selectedShift.get("shifttype_id")
         });
         rec.endEdit();
         
         */

        me.insSave({
            form: me.getFormdata(),
            grid: me.getGrid(),
            store: me.getGridleave().getStore(),
            finalData: function(data) {

                data["unit_unit_id"] = data["unit_id"];
                data["is_leave_end"] = f.down("[name=is_leave_end]").checked ? 1 : 0;

                return data;
            },
            sync: true,
            callback: {
                create: function(store, form, grid) {

                }
            }
        });





    },
    storeLoadedAfterSaveUpdate: function() {
        var me = this;
        var rec = me.getGrid().getSelectedRecord();
        me.doGridLeaveFilter(rec.get("employee_id"));
        me.mainGridCheckRecord();
    },
    afterClick: function() {
        var me = this;
        var x = {
            cancel: function() {
                me.mainGridCheckRecord();
            },
            save: function() {

            },
            edit: function() {

            },
            delete: function() {

            },
            new : function() {
                var f = me.getFormdata();
                var d = new Date();

                f.down("[name=start_use]").setValue(d.getFullYear());

                me.leaveGroupOnBlur();
                me.startUseKeyUp();

            }
        }
        return x;
    },

    //added by anas 08122021
    kompensasiExtraLeave: function() {
        var me = this;
        me.instantWindow("GridKompensasiextraleave", 650, "Kompensasi Extra Leave", "create");
        me.kompensasiExtraLeaveData();
    },

    //added by anas 08122021
    kompensasiExtraLeaveData: function(){
        var me = this;
        var rec = me.getGrid().getSelectedRecord();

        var grid = me.getGridkompensasiextraleave();
        if(rec)
        {
            grid.setLoading("Please wait...");

            me.tools.ajax({
                params: {
                    'employee_id':rec.get("employee_id"),
                },
                success: function(data, model) {
                    me.tools.wesea({data: data, model: model}, grid).grid();
                    grid.setLoading(false);
                }
            }).read('kompensasiExtraLeave');
        }
    },
});