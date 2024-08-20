Ext.define('Erems.controller.Masterkoefisien', {
    extend: 'Erems.library.template.controller.Controlleralt',
    alias: 'controller.Masterkoefisien',
    views: ['masterkoefisien.Panel', 'masterkoefisien.Grid', 'masterkoefisien.FormSearch', 'masterkoefisien.FormData', 'masterkoefisien.FormDataDetail'],
    stores: ['Masterkoefisien', 'Masterparameterglobal', 'Masterkoefisienformdatadetail'],
    models: ['Masterkoefisien', 'Masterparameterglobal', 'Masterkoefisienformdatadetail'],
    refs: [
        {
            ref: 'grid',
            selector: 'masterkoefisiengrid'
        },
        {
            ref: 'formsearch',
            selector: 'masterkoefisienformsearch'
        },
        {
            ref: 'formdata',
            selector: 'masterkoefisienformdata'
        },
        {
            ref: 'formdatadetail',
            selector: 'masterkoefisienformdatadetail'
        },
        {
            ref: 'formdatadetailcellediting',
            selector: 'masterkoefisienformdatadetailcellediting'
        }
    ],
    controllerName: 'masterkoefisien',
    fieldName: 'pricetype',
    bindPrefixName: 'Masterkoefisien',
    nomorValue: 1,
    formWidth: 800,
    enableSelectKPR: 0,
    discount_rate_year: 12,
    isSafetyFactor: false,
    safetyfactor: false,
    collectionFeeNPV: false,
    koefisienAllowEdit: false, // added by rico 10052023
    constructor: function (configs) {
        this.callParent(arguments);
        var me = this;
        this.myConfig = new Erems.library.box.Config({
            _controllerName: me.controllerName
        });

        me.cbf = new Erems.template.ComboBoxFields();


    },
    init: function (application) {
        var me = this;
        me.tools = new Erems.library.box.tools.Tools({ config: me.myConfig });
        this.control({
            'masterkoefisienpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender
            },
            'masterkoefisiengrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange
            },
            'masterkoefisiengrid toolbar button[action=create]': {
                click: function () {
                    this.formDataShow('create');
                }
            },
            'masterkoefisiengrid toolbar button[action=update]': {
                click: function () {
                    this.formDataShow('update');
                }
            },
            'masterkoefisiengrid toolbar button[action=destroy]': {
                click: me.dataDestroy
            },
            'masterkoefisiengrid toolbar button[action=print]': {
                click: this.dataPrint
            },
            'masterkoefisiengrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                click: this.gridActionColumnClick
            },
            'masterkoefisienformsearch': {
                afterrender: this.formSearchAfterRender
            },
            'masterkoefisienformsearch button[action=search]': {
                click: this.dataSearch
            },
            'masterkoefisienformsearch button[action=reset]': {
                click: this.dataReset
            },
            'masterkoefisienformdata': {
                beforerender: this.formDataBeforeRender,
                afterrender: this.formDataAfterRender
            },
            'masterkoefisienformdata button[action=save]': {
                click: this.dataSave
            },
            'masterkoefisienformdata button[action=cancel]': {
                click: this.formDataClose
            },
            'masterkoefisienformdata button[action=generate_schedule]': {
                click: this.genSchedule
            },
            'masterkoefisienformdata textfield[name=pricetype_id]': {
                select: this.priceTypeOnSelect
            },
            'masterkoefisienformdata textfield': {
                blur: function (eL) {
                    var me = this;
                    if (eL.itemId != 'um_inh_termin') {
                        me.changeValue(eL);
                    }
                    if (eL.itemId == 'persentase_dp' || eL.itemId == 'um_inh_termin') {
                        me.fillUpPersentase();
                    }
                    // this.changeValue;
                },
                // focus: this.focusValue
                focus: function (eL) {
                    var me = this;
                    if (eL.itemId != 'um_inh_termin') {
                        me.focusValue(eL);
                    }
                    if (eL.itemId == 'persentase_dp' || eL.itemId == 'um_inh_termin') {
                        me.fillUpPersentase();
                    }
                    // this.changeValue;
                },
            },
            'masterkoefisienformdata checkboxfield': {
                blur: function (eL) {
                    var me = this;
                    if (eL.itemId == 'is_dp_awal') {
                        me.fillUpPersentase();
                    }
                },
                focus: function (eL) {
                    var me = this;
                    if (eL.itemId == 'is_dp_awal') {
                        me.fillUpPersentase();
                    }
                },
            },

            // 'masterkoefisienformdatadetailcellediting':{
            //     change: function(){
            //         console.log('masuk change datadetail');
            //     },
            //     gridcellchanging: function() {
            //         console.log('After edit. in controller ');
            //     }
            // }
        });
    },
    panelAfterRender: function (el) {
        var me = this;
        me.tools.ajax({
            params: {
            },
            success: function (data) {
                // var f = me.getFormdata();
                // console.log(data)
                me.discount_rate_year = data.discountRateYear;
                me.isSafetyFactor = data.isSafetyFactor;
                me.safetyfactor = data.safetyfactor;
                me.collectionFeeNPV = data.collectionFeeNPV; // added by rico 08022023
                me.koefisienAllowEdit = data.koefisienAllowEdit; // added by rico 10052023

                // var textDRY = 'Discount Rate Year : '+data.discountRateYear;
                // f.down("[itemId=discountRateYear]").setFieldLabel(textDRY);
                // f.down("[itemId=discountRateYear]").setText(textDRY, true);
                // $("#discountRateYear").val(data.discountRateYear);
                // Ext.getCmp('discountRateYear').setText('Hello');
            }
        }).read('detailGenco');
    },
    dataDestroy: function () {
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
                var selectedRecord = '[' + store.getAt(store.indexOf(rows[0])).get('pricelist') + ']';
                confirmmsg = 'Delete ' + selectedRecord + ' ?';
                failmsg = 'Error: Unable to delete ' + selectedRecord + '.';
            } else {
                confirmmsg = 'This action will delete ' + recordcounttext + '.<br />Continue ?';
                failmsg = 'Error: Unable to delete data.';
            }
            Ext.Msg.confirm('Delete Data', confirmmsg, function (btn) {
                if (btn == 'yes') {
                    resetTimer();
                    var msg = function () {
                        me.getGrid().up('window').mask('Deleting data, please wait ...');
                    };
                    for (var i = 0; i < rows.length; i++) {

                        store.remove(rows[i]);
                    }

                    store.on('beforesync', msg);
                    store.sync({
                        success: function (s) {
                            me.getGrid().up('window').unmask();
                            var successcount = parseInt(Ext.decode(s.operations[0].response.responseText).total, 10);
                            var successmsg = (rows.length == 1 ? selectedRecord : (successcount != rows.length ? successcount + ' of ' : '') + recordcounttext) + ' deleted successfully.';
                            store.un('beforesync', msg);
                            store.reload();
                            if (typeof Ext.StoreManager.lookup(me.stores[0]) != 'undefined') {
                                Ext.StoreManager.lookup(me.stores[0]).load({ params: { limit: 0 } });
                            }
                            Ext.Msg.show({
                                title: 'Success',
                                msg: successmsg,
                                icon: Ext.Msg.INFO,
                                buttons: Ext.Msg.OK
                            });
                        },
                        failure: function () {
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
    },
    getActiveForm: function () {
        return this.activeForm;
    },
    dataSave: function () {
        var me = this;
        var form = me.getFormdata().getForm();
        var storeDetail = me.getFormdatadetail().getStore();
        var dataDetail = [];

        var checkTerminDouble = [];
        var checkPersentase = 0;
        var checkData = '';
        var checkPass = false;
        storeDetail.each(function (record, idx) {
            checkData = record.data;
            var floatum_inh_persen = parseFloat(checkData.um_inh_persen);
            checkPersentase = parseFloat(checkPersentase);

            // totalPersentase = totalPersentase+parseFloat(um_inh_persen_arr[i-1]);
            checkPersentase = + checkPersentase.toFixed(2) + +floatum_inh_persen.toFixed(2);
            // checkPersentase = parseFloat(checkPersentase)+floatum_inh_persen.toFixed(2);
            // checkPersentase += floatum_inh_persen.toFixed(2);
            if (!checkTerminDouble.includes(checkData.termin)) {
                checkTerminDouble.push(checkData.termin);
                dataDetail.push(record.data);
                checkPass = true;
            }
            else {
                checkPass = false;
                return false;
            }
        });
        checkPersentase = parseFloat(checkPersentase);
        if (dataDetail.length < 1 || checkPersentase.toFixed(2) != 100.00 || !checkPass) {
            Ext.Msg.show({
                title: 'Failure',
                msg: 'Check data kembali',
                icon: Ext.Msg.ERROR,
                buttons: Ext.Msg.OK
            });
            return false;
        }

        var addingRecord = false;
        if (!me.finalValidation()) {
            return false;
        }
        // added 12 Nov 2013 
        var vp = me.validationProcess();
        var vps = false; // validation prosess status
        if (typeof vp === 'object') {
            vps = vp.status;
            if (!vps) {
                Ext.MessageBox.alert('Alert', vp.msg, function () {
                    var x = me.getFormdata().down('[name=' + vp.field + ']');
                    if (x !== null) {
                        x.markInvalid(vp.msg);
                        x.focus();
                    }
                });
            }
        } else if (typeof vp === 'boolean') {
            vps = vp;
        }
        // end added 12 Nov 2013
        if (form.isValid() && vps) {
            resetTimer();
            var store = null;
            var fida = me.getFinalData(form.getValues());
            fida["detail"] = dataDetail;

            if (me.instantCreateMode) {
                store = _myAppGlobal.getController(me.callerId).getInstanCreateStorex(me.controllerName);
            } else {
                if (!me.storeProcess) {
                    store = me.getGrid().getStore();
                } else {
                    store = me.storeProcess;
                }
            }
            var msg = function () {
                me.getFormdata().up('window').body.mask('Saving data, please wait ...');
            };
            switch (me.getFormdata().up('window').state.toLowerCase()) {
                case 'create':

                    store.add(fida);
                    addingRecord = true;
                    break;
                case 'update':

                    var idProperty = store.getProxy().getReader().getIdProperty();
                    var rec = store.getById(parseInt(form.findField(idProperty).getValue(), 10));
                    rec.beginEdit();
                    rec.set(fida);
                    rec.endEdit();
                    break;
                default:
                    return;
            }
            store.on('beforesync', msg);
            store.sync({
                success: function () {
                    me.getFormdata().up('window').body.unmask();
                    store.un('beforesync', msg);
                    store.reload();

                    if (typeof Ext.StoreManager.lookup(me.stores[0]) != 'undefined') {
                        Ext.StoreManager.lookup(me.stores[0]).load({ params: { limit: 0 } });
                    }
                    Ext.Msg.show({
                        title: 'Success',
                        msg: 'Data saved successfully.',
                        icon: Ext.Msg.INFO,
                        buttons: Ext.Msg.OK,
                        fn: function () {
                            me.formDataClose();
                        }
                    });
                },
                failure: function (batch, op) {
                    var jsD = batch.proxy.getReader().jsonData;
                    var erMsg = "Unable to process data.";
                    if (typeof jsD.msg !== "undefined") {
                        erMsg = jsD.msg;
                    }

                    me.getFormdata().up('window').body.unmask();
                    store.un('beforesync', msg);
                    if (store.getCount() > 0 && addingRecord) {
                        store.removeAt(store.getCount() - 1);
                    }
                    store.reload();

                    var msgJson = jsD.msg;
                    if (!msgJson) {
                        Ext.Msg.show({
                            title: 'Failure',
                            msg: 'Message : ' + erMsg,
                            icon: Ext.Msg.ERROR,
                            buttons: Ext.Msg.OK
                        });
                    } else {
                        Ext.Msg.show({
                            title: 'Warning',
                            msg: 'Message : ' + erMsg,
                            icon: Ext.Msg.WARNING,
                            buttons: Ext.Msg.OK
                        });
                    }
                }
            });
        }
    },
    genSchedule: function () {
        var me = this;

        me.getFormdata().setLoading('Sedang memproses schedule');

        // var win = me.getFormdata().up('window');
        var dStore = null;
        var formVal = me.getFormdata().getForm().getValues();
        dStore = me.getFormdatadetail().getStore();
        dStore.removeAll();
        var is_dp_awal = parseInt(formVal.is_dp_awal);
        var um_inh_persen = toFloat($("input[name='um_inh_persen']").val());
        var um_inh_termin = toFloat($("input[name='um_inh_termin']").val());
        var discount_rate_month = (me.discount_rate_year / 12) / 100;

        if (um_inh_persen == 0 || um_inh_termin == 0 || um_inh_persen == null || um_inh_termin == null) {
            me.getFormdata().setLoading(false);
            Ext.Msg.alert('Info', 'persentase dan / atau total termin tidak boleh kosong');
            return;
        }
        else {
            var type_name = "", scheduletype_id = 0, final_scheduletype_id = 1, final_type_name = "SIP";
            switch (parseInt(formVal.um_inh_scheduletype)) {
                case 1:
                    type_name = 'UM';
                    scheduletype_id = 5;
                    break;
                case 2:
                    type_name = 'INH';
                    scheduletype_id = 3;
                    break;
                default:
                    break;
            }
            var i = 1, totalPersentase = 0;
            var k = 1;
            var totalNPV = 0;

            if (is_dp_awal) {
                var persentase_dp = parseFloat($("input[name='persentase_dp']").val());
                var prosesNpv = me.calculateNPV(discount_rate_month, i, persentase_dp);
                var val = {
                    scheduletype_id: scheduletype_id,
                    type_name: type_name,
                    termin: i,
                    um_inh_persen: persentase_dp,
                    npv: prosesNpv
                };
                totalPersentase = totalPersentase + persentase_dp;
                dStore.add(val);
                totalNPV = parseFloat(totalNPV) + parseFloat(prosesNpv);
                k++;
            }
            for (i = k; i <= um_inh_termin; i++) {
                var prosesNpv = me.calculateNPV(discount_rate_month, i, um_inh_persen);
                var val = {
                    scheduletype_id: scheduletype_id,
                    type_name: type_name,
                    termin: i,
                    um_inh_persen: um_inh_persen,
                    // npv: me.calculateNPV(discount_rate_month,i,um_inh_persen)
                    npv: prosesNpv
                };
                totalPersentase = totalPersentase + um_inh_persen;
                dStore.add(val);
                totalNPV = parseFloat(totalNPV) + parseFloat(prosesNpv);
            }

            if (formVal.pricetype_id == 2) {
                final_type_name = "KPR";
                final_scheduletype_id = 2;
            }

            // var prosesSIPnpv = me.calculateNPV(discount_rate_month,i,totalPersentase);
            var prosesSIPnpv = 0;
            if (totalPersentase < 100 || final_type_name == "KPR") {
                prosesSIPnpv = me.calculateNPV(discount_rate_month, i, totalPersentase);
                var SIPpersen = 100 - totalPersentase;
                if (SIPpersen < 0) {
                    SIPpersen = 0;
                }
                // var SIPpersen = parseFloat($("input[name='persentase_dp']").val());
                SIPpersen = SIPpersen.toFixed(2);
                prosesSIPnpv = me.calculateNPV(discount_rate_month, i, SIPpersen);
                var val = {
                    scheduletype_id: final_scheduletype_id,
                    type_name: final_type_name,
                    termin: i,
                    um_inh_persen: SIPpersen,
                    // npv: me.calculateNPV(discount_rate_month,i,SIPpersen)
                    npv: prosesSIPnpv
                };
                dStore.add(val);
            }

            totalNPV = parseFloat(totalNPV) + parseFloat(prosesSIPnpv);

            totalNPV = 1 / parseFloat(totalNPV);
            // console.log(totalNPV)

            if (me.safetyfactor) {
                $("input[name='koefisien']").val(toFloat(totalNPV * 100).toFixed(2));
                me.getFormdata().down("[name=koefisien]").setReadOnly(true);
            }

            if (!me.isSafetyFactor) {
                $("input[name='koefisien']").val(toFloat(totalNPV * 100).toFixed(2));
            }

            me.getFormdata().setLoading(false);
            me.getFormdatadetail().getView().refresh();
        }
    },
    genScheduleOnTheFly: function () {
        var me = this;
        // console.log('genScheduleOnTheFly');
        // me.getFormdata().setLoading('Sedang memproses schedule');

        var dStore = null;
        var formVal = me.getFormdata().getForm().getValues();
        var type_name_arr = [], scheduletype_id_arr = [], um_inh_persen_arr = [], um_inh_termin_arr = [];
        var dataValidasi = [];
        dStore = me.getFormdatadetail().getStore();
        // console.log('dStore b4 delete');
        // console.log(dStore.getAt(3).get('um_inh_persen'));

        for (var h = 0; h < dStore.data.items.length; h++) {
            type_name_arr.push(dStore.getAt(h).get('type_name'));
            scheduletype_id_arr.push(dStore.getAt(h).get('scheduletype_id'));
            um_inh_persen_arr.push(parseFloat(dStore.getAt(h).get('um_inh_persen')));
            // um_inh_termin_arr.push(dStore.getAt(h).get('um_inh_termin'));
            um_inh_termin_arr.push(h);
        }

        // dStore.removeAll();
        // console.log('um_inh_persen_arr');
        // console.log(um_inh_persen_arr);
        var discount_rate_month = (me.discount_rate_year / 12) / 100;
        var um_inh_termin = toFloat($("input[name='um_inh_termin']").val());

        // if(um_inh_persen_arr.length == 0 || um_inh_termin == 0){
        if (um_inh_persen_arr.length == 0 || um_inh_termin_arr.length == 0) {
            return false;
        }
        else {
            var final_scheduletype_id = 1, final_type_name = "SIP";
            var i = 1, totalPersentase = 0;
            var totalNPV = 0;
            // for(i = 1; i <= um_inh_termin; i++){
            // for(i = 1; i < um_inh_termin_arr.length; i++){
            for (i = 1; i <= um_inh_termin_arr.length; i++) {
                var prosesNpv = me.calculateNPV(discount_rate_month, i, um_inh_persen_arr[i - 1]);
                var val = {
                    scheduletype_id: scheduletype_id_arr[i - 1],
                    type_name: type_name_arr[i - 1],
                    termin: i,
                    um_inh_persen: um_inh_persen_arr[i - 1],
                    npv: prosesNpv
                };

                totalPersentase = totalPersentase + parseFloat(um_inh_persen_arr[i - 1]);
                dataValidasi.push(val);

                totalNPV = parseFloat(totalNPV) + parseFloat(prosesNpv);
            }

            if (totalPersentase.toFixed(0) > 100) {
                return false;
            }
            totalNPV = 1 / parseFloat(totalNPV);

            if (!me.isSafetyFactor) {
                $("input[name='koefisien']").val(toFloat(totalNPV * 100).toFixed(2));
            }

            // me.getFormdata().setLoading(false);
            return dataValidasi;
        }
    },
    calculateNPV: function (discount_rate_month, um_inh_termin, um_inh_persen) {
        var konstanta = 1 / (1 + discount_rate_month);
        var result = um_inh_persen * (Math.pow(konstanta, um_inh_termin));
        return result.toFixed(2);
    },
    formDataBeforeRender: function (el) {
        var me = this;
        var dStore = me.getFormdatadetail().getStore();
        dStore.loadData([], false);
        
        // added by rico 08022023
        if(me.collectionFeeNPV == 1){
            me.getFormdata().down("[name=disc_pembayaran]").show();
            me.getFormdata().down("[name=collection_fee]").show();
        }else{
            me.getFormdata().down("[name=disc_pembayaran]").hide();
            me.getFormdata().down("[name=collection_fee]").hide();
        }
    },
    priceTypeOnSelect: function () {
        var me = this;
        var f = me.getFormdata();
        var pEl = f.down("[name=pricetype_id]");
        var p = pEl.getValue();

        if (p == 2) {
            f.down("[itemId=um_inh_scheduletype_1]").setReadOnly(true);
            // f.down("#um_inh_scheduletype_1").el.setStyle({opacity: 0.3}); 
            f.down("[itemId=um_inh_scheduletype_2]").setReadOnly(true);
            f.down("[itemId=um_inh_scheduletype_2]").el.setStyle({ opacity: 0.3 });
            f.down("[itemId=um_inh_scheduletype_1]").setValue(true);
        }
        else {
            f.down("[itemId=um_inh_scheduletype_1]").setReadOnly(false);
            // f.down("[itemId=um_inh_scheduletype_1]").el.setStyle({opacity: 1});
            f.down("[itemId=um_inh_scheduletype_2]").setReadOnly(false);
            f.down("[itemId=um_inh_scheduletype_2]").el.setStyle({ opacity: 1 });
        }
        if (p == 3) {
            f.down("[itemId=persentase_dp]").labelEl.update('Persentase');
        }
        else {
            f.down("[itemId=persentase_dp]").labelEl.update('Persentase DP');
        }
    },
    focusValue: function (el) {
        var me = this;
        val = $("input[name='" + el.itemId + "']").val();
        $("input[name='" + el.itemId + "']").val(toFloat(val));
    },
    changeValue: function (el) {
        var me = this;
        val = $("input[name='" + el.itemId + "']").val();
        $("input[name='" + el.itemId + "']").val(me.fmb(toFloat(val)));
    },
    fillUpPersentase: function () {
        var me = this;
        var formVal = me.getFormdata().getForm().getValues();
        var is_dp_awal = parseInt(formVal.is_dp_awal);

        var valPersentaseDP = parseFloat($("input[name='persentase_dp']").val());
        if (is_dp_awal) {
            valPersentaseDP = 100 - valPersentaseDP;
        }
        var valTermin = parseFloat($("input[name='um_inh_termin']").val());
        if (valPersentaseDP != 0 && valTermin != 0) {
            var valPersentase = valPersentaseDP / valTermin;
            $("input[name='um_inh_persen']").val(toFloat(valPersentase).toFixed(2));
            // $("input[name='um_inh_persen']").val(toFloat(valPersentase));
        }
    },
    fdar: function () {
        var me = this;
        var f = me.getFormdata();
        var kg = me.getFormdatadetail();
        var x = {
            init: function () {
                /// init here
                var textDRY = 'Discount Rate Year : ' + me.discount_rate_year;
                f.down("[itemId=discountRateYear]").setText(textDRY, true);
                if (me.isSafetyFactor) {
                    f.down("[itemId=koefisien]").labelEl.update('Safety Factor');
                    // f.down("[itemId=koefisien]").setDisabled(false);
                    // f.down("[name=koefisien]").setReadOnly(false);
                    f.down("[name=koefisien]").setReadOnly(true);
                }

                if(me.koefisienAllowEdit == 1){ // added by rico 10052023
                    f.down("[name=koefisien]").setReadOnly(false);
                }else{
                    f.down("[name=koefisien]").setReadOnly(true); 
                }
            },
            create: function () {
                /// create here
            },
            update: function () {
                var grid = me.getGrid();
                var store = grid.getStore();
                var formDetail = me.getFormdatadetail(); // added by rico 03102022

                var record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));
                record.data.biaya_ajb = me.fmb(toFloat(record.data.biaya_ajb));
                record.data.biaya_administrasi = me.fmb(toFloat(record.data.biaya_administrasi));
                record.data.biaya_asuransi = me.fmb(toFloat(record.data.biaya_asuransi));
                record.data.biaya_bbn = me.fmb(toFloat(record.data.biaya_bbn));
                record.data.biaya_bphtb = me.fmb(toFloat(record.data.biaya_bphtb));
                record.data.tandajadi = me.fmb(toFloat(record.data.tandajadi));

                record.data.biaya_admsubsidi = me.fmb(toFloat(record.data.biaya_admsubsidi));
                record.data.biaya_pmutu = me.fmb(toFloat(record.data.biaya_pmutu));
                record.data.biaya_paket_tambahan = me.fmb(toFloat(record.data.biaya_paket_tambahan));
                me.getFormdata().loadRecord(record);

                var pricetype_id = me.getGrid().getSelectedRecord().get("pricetype_id");

                var koefisienId = me.getGrid().getSelectedRecord().get("koefisien_id");
                me.tools.ajax({
                    params: {
                        koefisien_id: koefisienId,
                        // mode_read: 'schedule'
                    },
                    success: function (schdata, schmodel) {
                        me.tools.wesea({
                            data: schdata,
                            model: schmodel
                        }, kg).grid();
                        me.priceTypeOnSelect();

                        // var valPersentase = schdata[schdata.length-1]['persentase_amount'];
                        // var valPersentase = schdata[0]['persentase_amount'];
                        // $("input[name='persentase_dp']").val(toFloat(valPersentase).toFixed(2));
        
                        formDetail.getView().refresh(); // added by rico 03102022
                    }
                }).read('schedule');

            }
        };
        return x;
    },

    fmb: function (val) {
        return this.fm(val, 2, ',', '.');
    },
    fm: function (n, decPlaces, thouSeparator, decSeparator) {
        var decPlaces = isNaN(decPlaces = Math.abs(decPlaces)) ? 2 : decPlaces,
            decSeparator = decSeparator == undefined ? "." : decSeparator,
            thouSeparator = thouSeparator == undefined ? "." : thouSeparator,
            sign = n < 0 ? "-" : "",
            i = parseInt(n = Math.abs(+n || 0).toFixed(decPlaces)) + "",
            j = (j = i.length) > 3 ? j % 3 : 0;
        return sign + (j ? i.substr(0, j) + thouSeparator : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thouSeparator) + (decPlaces ? decSeparator + Math.abs(n - i).toFixed(decPlaces).slice(2) : "");
    },
});