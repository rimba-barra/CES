/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/*
 * @AUTHOR : SEMY
 * 
 */
Ext.define('Master.library.voucher.Voucherdetail', {
    config: null,
    constructor: function (options) {
        Ext.apply(this, options || {});
    },
    savedetailcoa: function (c, callback) {
        var me = this;
        var f = c.getFormcoadetail();
        var value = f.getForm().getValues();
        var g = c.getDetailvouchergrid();
        var store = g.getStore();
        //var substore = c.getGridsubdetail().getStore();
        var total = f.down("[name=amount]").getValue();
        total = accounting.unformat(total);
        if (f.getForm().isValid()) {
            value['amount'] = parseFloat(accounting.unformat(value['amount']));
            if (total !== 0) {
                if (f.kosongGa > -1) {
                    var rec = store.getAt(f.kosongGa);
                    rec.beginEdit();
                    rec.set(value);
                    rec.endEdit();
                    store.commitChanges();
                }
                else {
                    var temp = store.findExact('indexdata', value.indexdata);
                    var rec = store.getAt(temp);
                    if (rec) {
                        rec.beginEdit();
                        rec.set(value);
                        rec.endEdit();
                        store.commitChanges();
                    } else {
                        store.add(value);
                        store.commitChanges();
                    }
                }
                // console.log(rec);
//                var sb = c.localStore.subdetailcoa;
//                substore.clearFilter(true);
//                substore.each(function (rec) {
//                    if (!rec.get("vouchersubdetail_id")) {
//                        sb.add(rec);
//                    }
//                });
//
//                var count = substore.getCount();
//                if (count === 0) {
//                    me.clearTempStorebyIndexdata(c, rec.get("indexdata"));
//                }
//                c.sumCount = count + c.sumCount;
//                me.checkDeletedSubTempCoa(c);

                if (callback) {
                    setTimeout(function () {
                        me.formDataDetail(c, 'create')
                    }, 600);
                }

                me.sumDetail(c);
                f.up('window').close();
            }
            else {
                c.tools.alert.warning("Amount cannot be empty.");
            }
        }
    },
    clearTempStorebyIndexdata: function (c, indexdata) {
        var me = this;
        var tempstoresub = c.localStore.subdetailcoa;
        if (indexdata) {
            tempstoresub.removeAt(tempstoresub.find('indexsubdata', indexdata));
        } else {
            console.log('failed remove sub temp store');
        }
    },
    formDataDetail: function (c, param) {
        var me = this;
        var title;
        if (param == "create") {
            title = 'Add detail voucher';
        } else {
            title = 'Update';
        }
        var w = c.instantWindow('Formcoadetail', 900, title, param, 'coadatadetailsby');
        var f = c.getFormcoadetail();
        c.kasbankdetail_id = 0;
        //me.loadModelSubCoaDetail(c);
        c.getCustomRequestCombobox('coa', '', '', '', 'coa_coa_id', 'coa', ['kelsub'], f, param, function () {

        });
    },
    checkDeletedSubTempCoa: function (c, count) {
        var me = this;
        var f = c.getFormdata();
        var tempstoresub = c.localStore.subdetailcoa;
        var records = f.deletedLocalstoreSubRows;
        if (records.length > 0) {
            for (var i = 0; i <= records.length; i++) {
                tempstoresub.removeAt(tempstoresub.find('indexsubdata', records[i]));
            }
        }
        f.deletedLocalstoreSubRows = [];
    },
    getindexdetailsubcoa: function (c) {
        var me = this;
        var hasil = 0;
        var tempstoresub = c.localStore.subdetailcoa;
        var count = tempstoresub.getCount();
        hasil = count + 1;
        return hasil;
    },
    getindexdetailcoa: function (c) {
        var me = this;
        var hasil = 0;
        var gridcoadetail = c.getDetailvouchergrid();
        var count = gridcoadetail.getStore().getCount();
        hasil = count + 1;
        return hasil;
    },
    loadModelSubCoaDetail: function (c, callbackFunc) {
        var me = this;
        var gridCoaDetail = c.getGridsubdetail();
        gridCoaDetail.getStore().clearFilter(true);
        gridCoaDetail.doInit();
        gridCoaDetail.getStore().load({
            params: {
                voucherdetail_id: c.kasbankdetail_id
            },
            callback: function (rec, op) {
                if (op) {
                    gridCoaDetail.attachModel(op);
                } else {
                    console.log('error attach model sub coa');
                }

                if (typeof callbackFunc === "function") {
                    callbackFunc();
                }

            }

        });
    },
    destroysubdetail: function (c) {
        var me = this;
        var f = c.getFormcoadetail();
        var fa = c.getFormdata();
        var g = c.getGridsubdetail();
        var tempstoresub = c.localStore.subdetailcoa;
        var records = g.getSelectionModel().getSelection();
        for (var i = records.length - 1; i >= 0; i--) {
            var row = g.getStore().indexOf(records[i]);
            var id = records[i]['data']["vouchersubdetail_id"];
            if (id) {
                fa.deletedsubRows.push(id);
            }
            fa.deletedLocalstoreSubRows.push(records[i].get("indexsubdata"));
            g.getStore().removeAt(row);
            c.voucherAr.setSumDetailAR(c);
            f.down("[name=amount]").setValue(accounting.formatMoney(c.sumAmountStore(g.getStore())));
        }
    },
//    subglChange: function (c) {
//        var me = this;
//        var f = c.getFormsubcoadetail();
//        var code = c.tools.comboHelper(f.down("[name=subgl_subgl_id]")).getField('subgl_id', 'code');
//        var code1 = c.tools.comboHelper(f.down("[name=subgl_subgl_id]")).getField('subgl_id', 'code1');
//        var code2 = c.tools.comboHelper(f.down("[name=subgl_subgl_id]")).getField('subgl_id', 'code2');
//        var code3 = c.tools.comboHelper(f.down("[name=subgl_subgl_id]")).getField('subgl_id', 'code3');
//        var code4 = c.tools.comboHelper(f.down("[name=subgl_subgl_id]")).getField('subgl_id', 'code4');
//        f.down("[name=subgl_code]").setValue(code);
//        f.down("[name=subgl_code1]").setValue(code1);
//        f.down("[name=subgl_code2]").setValue(code2);
//        f.down("[name=subgl_code3]").setValue(code3);
//        f.down("[name=subgl_code4]").setValue(code4);
//    },
    destroydetail: function (c) {
        var me = this;
        var f = c.getFormcoadetail();
        var fa = c.getFormdata();
        var g = c.getDetailvouchergrid();
        //var tempstoresub = c.localStore.subdetailcoa;
        var records = g.getSelectionModel().getSelection();
        for (var i = records.length - 1; i >= 0; i--) {
            var row = g.getStore().indexOf(records[i]);
            var id = records[i]['data']["voucherdetail_id"];
            if (id) {
                fa.deletedRows.push(id);
            }
            // tempstoresub.removeAt(tempstoresub.find('voucherdetail_indexdata', records[i]['data']["indexdata"]));
            g.getStore().removeAt(row);
        }
        me.sumDetail(c);
    },
    savesubdetailcoa: function (c) {
        var me = this;
        var f = c.getFormsubcoadetail();
        var fa = c.getFormcoadetail();
        var value = f.getForm().getValues();
        var g = c.getGridsubdetail();
        var store = g.getStore();
        if (f.getForm().isValid()) {
            if (f.kosongGa > -1) {
                var rec = store.getAt(f.kosongGa);
                rec.beginEdit();
                rec.set(value);
                rec.endEdit();
            }
            else {
                store.add(value);
                store.commitChanges();
            }
            c.voucherAr.setSumDetailAR(c);
            fa.down("[name=amount]").setValue(accounting.formatMoney(c.sumAmountStore(store)));
            f.up('window').close();
        }
    },
    coaChange: function (c) {
        var me = this;
        c.kelsub_id = 0;
        var f = c.getFormcoadetail();
        var state = f.up("window").state;
        console.log(state);
        var row = f.getForm().getValues();
        var gridcoadetail = c.getDetailvouchergrid();
        var gridcoadetailstore = gridcoadetail.getStore();
        // var gridsub = c.getGridsubdetail();
        //var storesub = gridsub.getStore();
        var io = f.down("[name=indexdata]").getValue();
        gridcoadetailstore.removeAt(gridcoadetailstore.find('indexdata', io));
        gridcoadetailstore.add(row);
        var selected = c.tools.comboHelper(f.down("[name=coa_coa_id]")).getField('coa_id', 'coa');
        var selectedName = c.tools.comboHelper(f.down("[name=coa_coa_id]")).getField('coa_id', 'name');
        var selectedType = c.tools.comboHelper(f.down("[name=coa_coa_id]")).getField('coa_id', 'type');
        var selectedKelsubId = c.tools.comboHelper(f.down("[name=coa_coa_id]")).getField('coa_id', 'kelsub_kelsub_id');
        var selectedKelsub = c.tools.comboHelper(f.down("[name=coa_coa_id]")).getField('coa_id', 'kelsub_kelsub');
        var selectedKelsubDesc = c.tools.comboHelper(f.down("[name=coa_coa_id]")).getField('coa_id', 'kelsub_description');
        var coaId = f.down("[name=coa_coa_id]").getValue();
        f.down("[name=coa_name]").setValue(selectedName);
        f.down("[name=coa_coa]").setValue(selected);
        f.down("[name=kelsub_kelsub]").setValue(selectedKelsub);
        f.down("[name=kelsub_description]").setValue(selectedKelsubDesc);
        f.down("[name=kelsub_kelsub_id]").setValue(selectedKelsubId);
        // console.log(coaId);
        me.getCashflow(c, coaId);
        if (selectedKelsubId) {
            //f.down("[name=amount]").setReadOnly(true);
            //f.down("[name=amount]").setValue('');
            //gridsub.down("[action=create]").setDisabled(false);
            c.kelsub_id = selectedKelsubId;
            var indexdata = f.down("[name=indexdata]").getValue();
            f.down("[name=subgl_subgl_id]").setVisible(true);
            f.down('label[id=affiliasiNameId]').setVisible(true);
            f.down('label[id=affiliasiNameId]').setText(selectedKelsubDesc + ':');
            me.getSubgl(c);
            // me.changeLabelSubgl(c);
            //me.restoreTempToSubGrid(c, indexdata);
        } else {
            //f.down("[name=amount]").setReadOnly(false);
            //f.down("[name=amount]").setValue('0.00');
            //gridsub.down("[action=create]").setDisabled(true);
            //storesub.loadData([], false);
            f.down("[name=subgl_subgl_id]").setVisible(false);
            f.down("[name=subgl_subgl_id]").setValue(false);
            f.down('label[id=affiliasiNameId]').setVisible(false);
            c.kelsub_id = 0;
        }
    },
    formDataSubDetail: function (c, param) {
        var me = this;
        var w = c.instantWindow('FormDataSubDetail', 700, 'Add sub detail voucher ', param, 'coadatasubdetailsby');
    },
    fdardatasub: function (c, param) {
        var me = this;
        var f = c.getFormsubcoadetail();
        var form = c.getFormcoadetail();
        var val = form.getForm().getValues();
        if (param == 'create') {
            //c.getCustomRequestCombobox('subgl', val.kelsub_kelsub_id, 'subgl_subgl_id', 'subgl', '', f);
            var tempstoresub = c.localStore.subdetailcoa;
            var gridsub = c.getGridsubdetail();
            var count2 = gridsub.getStore().getCount();
            f.down('[name=kelsub_kelsub]').setValue(val.kelsub_kelsub);
            f.down('[name=kelsub_kelsub_id]').setValue(val.kelsub_kelsub_id);
            f.down('[name=voucherdetail_id]').setValue(val.voucherdetail_id);
            f.down('[name=voucherdetail_voucherdetail_id]').setValue(val.voucherdetail_id);
            f.down('[name=voucherdetail_indexdata]').setValue(val.indexdata);
            f.down('[name=indexsubdata]').setValue(count2 + c.sumCount + 1);
        }
        else if (param == 'update') {
            var grid = c.getGridsubdetail();
            var row = grid.getSelectionModel().getSelection();
            var rec = grid.getSelectedRecord();
            form.loadRecord(rec);
        }
    },
    getVoucherId: function (c, paramdate, state, pt, callback) {
        var me = this;
        var f = c.getFormdata();
        var p = c.getPanel();
        f.setLoading('Please wait, Checking access transaction');
        var d = null;
        c.tools.ajax({
            params: {
                module: c.controllerName,
                date: paramdate,
                pt_id: pt
            },
            success: function (data, model) {

                f.setLoading(false);

                try {
                    if (data.hasil[0][0].vid === 0) {
                        c.tools.alert.warning("Selected date is closing for transaction.");
                        me.disableSave(c, true);
                        if (state == 'create') {
                            f.down('[name=voucherID]').setValue('');
                        }
                    }
                    else if (data.hasil[0][0].vid === 2) {
                        c.tools.alert.warning("Selected date is not installed, please setup on master closing.");
                        me.disableSave(c, true);
                        if (state == 'create') {
                            f.down('[name=voucherID]').setValue('');
                        }
                    }
                    else {
                        if (state == 'create') {
                            f.down('[name=voucherID]').setValue(data.hasil[0][0].vid);
                        }
                        me.disableSave(c, false);
                    }
                    if (typeof callback === "function") {
                        callback();
                    }

                }
                catch (err) {
                    console.log(err.message);
                    c.tools.alert.warning("Failed to load voucher ID, please reselect date to generate.");
                }
                f.setLoading(false);
            }
        }).read('voucherid');
    },
    getVoucherIdv2: function (c, paramdate, state, pt, callback, f) {
        var me = this;
        var p = c.getPanel();
        f.setLoading('Please wait, Checking access transaction');
        var d = null;
        c.tools.ajax({
            params: {
                module: c.controllerName,
                date: paramdate,
                pt_id: pt
            },
            success: function (data, model) {

                f.setLoading(false);

                try {
                    if (data.hasil[0][0].vid === 0) {
                        c.tools.alert.warning("Selected date is closing for transaction.");
                        c.closing_msg = 'Selected date is closing for transaction';
                        c.is_closing = 1;
                    }
                    else if (data.hasil[0][0].vid === 2) {
                        c.tools.alert.warning("Selected date is not installed, please setup on master closing.");
                        c.is_closing = 2;
                        c.closing_msg = 'Selected date is not installed, please setup on master closing';

                    }
                    else {
                        c.is_closing = 0;
                    }
                    if (typeof callback === "function") {
                        callback();
                    }

                }
                catch (err) {
                    console.log(err.message);
                    c.tools.alert.warning("Failed to load voucher ID, please reselect date to generate.");
                }
                f.setLoading(false);
            }
        }).read('voucherid');
    },
    resetDetailCoa: function (c, tab) {
        var me = this;
        var f = c.getFormdata();
        if (c.isEdit == '1') {
            if (tab.name === 'detailvouchergrid') {
                c.checkArIsEmpty();
                Ext.Msg.show({
                    title: 'Regenerate detail?',
                    msg: 'Are you sure to regenerate detail COA Account?',
                    buttons: Ext.Msg.YESNO,
                    icon: Ext.Msg.QUESTION,
                    fn: function (clicked) {
                        if (clicked === "yes") {
                            c.voucherAr.getTotalSumAr(c);
                            f.down("[name=amount]").setValue(accounting.formatMoney(c.totalSumAr));
                            me.generateCoa(c, c.templateCoa, 'click');
                        }
                        if (clicked === "no") {
                            c.isEdit = null;
                        }
                    }
                });
            }
        }
        c.isEdit = null;
    },
    detailFdar: function (c, params, kasbank, state) {
        var me = this;
        var f = c.getFormdata();
        me.disableSave(c, true);
        f.setLoading("Loading detail voucher");
        c.tools.ajax({
            params: {
                module: c.controllerName,
                param: params,
                dataflow: kasbank
            },
            success: function (data, model) {
                try {
                    var gridcoadetail = c.getDetailvouchergrid();
                    c.fillFormComponents(data, f);
                    //win-voucherwinId
                    if (params == 'myVoucherWindow') { //buka dari collection f7
                        c.is_paid = 0;
                        c.is_paid = 0;
                        c.is_realized = 0;
                        c.is_posting = 0;
                        var argrid = c.getDetailargrid();
                        var gridAngsuran = c.getAngsurangrid();
                        var rowAngs = gridAngsuran.getSelectionModel().getSelection();
                        var recAngs = gridAngsuran.getSelectedRecord();
                        c.checkUnit(f, recAngs.get("unit_unit_id"));
                        f.loadRecord(recAngs);
                        f.down('[name=voucherardetail]').setDisabled(false);
                        Ext.getCmp('TabVoucherId').getComponent('tabAr').tab.show();
                        Ext.getCmp('TabVoucherId').getComponent('tabEscrow').tab.hide();
                        if (c.paymentflag_id === 2) {
                            gridcoadetail.down('toolbar [action=generate]').setDisabled(true);
                            argrid.down('toolbar [action=browseSchedule]').setDisabled(true);
                        } else {
                            gridcoadetail.down('toolbar [action=generate]').setDisabled(false);
                        }

                        f.down('[name=customer_name]').setReadOnly(true);
                        f.down('[name=pt_pt_id]').setReadOnly(true);
                        f.down('[name=kasbank_date]').setReadOnly(true);
                        f.down('[name=amount]').setValue('0.00');
                        f.down('[name=department_department_id]').setValue(c.department_id);
                        f.down('[name=description]').setValue('');
                        f.down('[action=browseData]').setDisabled(true);
                        f.down('[name=datatype]').setReadOnly(true);
                        f.down('[name=dataflow]').setReadOnly(true);
                        f.down("[name=payment_receipt_no]").setValue('');
                    }
                    else if (params == 'myEscrowWindow') {// buka dari escrow f4
                        c.is_paid = 0;
                        c.is_realized = 0;
                        c.is_posting = 0;
                        var gridEscrow = c.getEscrowgrid();
                        var rowEsc = gridEscrow.getSelectionModel().getSelection();
                        var recEsc = gridEscrow.getSelectedRecord();
                        f.loadRecord(recEsc);
                        c.unit_number = recEsc.get("unit_unit_number");
                        f.down('[name=voucherescrowdetail]').show();
                        Ext.getCmp('TabVoucherId').getComponent('tabEscrow').tab.show();
                        Ext.getCmp('TabVoucherId').getComponent('tabAr').tab.hide();
                        gridcoadetail.down('toolbar [action=generate]').setDisabled(false);
                        f.down('[name=customer_name]').setReadOnly(true);
                        f.down('[name=pt_pt_id]').setReadOnly(true);
                        f.down('[name=kasbank_date]').setReadOnly(true);
                        f.down('[name=department_department_id]').setValue(c.department_id);
                        f.down('[name=description]').setValue('');
                        f.down('[action=browseData]').setDisabled(true);
                        f.down('[name=datatype]').setReadOnly(true);
                        f.down('[name=dataflow]').setReadOnly(true);
                        f.down("[name=payment_receipt_no]").setValue('');
                        c.voucherAr.getSelectedEscrow(c, function () {
                            f.down("[name=amount]").setValue(c.totalTemp);
                            f.down("[name=description]").setValue(c.notes);
                        });
                    }


                    if (state == "update") {

                        var grid = c.getGrid();
                        var row = grid.getSelectionModel().getSelection();
                        var rec = grid.getSelectedRecord();
                        var paymentflag = rec.get("paymentflag_id");
                        //

                        // console.log(rec);
                        f.rowData = rec;
                        f.editedRow = grid.getSelectedRow();
                        c.amountSelected = null;
                        var vendorId = rec.get("vendor_vendor_id");
                        var is_paid = rec.get("is_paid");
                        var is_realized = rec.get("is_realized");
                        var realization_date = rec.get("realization_date");
                        var realization_by = rec.get("realization_by");
                        var posting_by = rec.get("posting_by");
                        var is_posting = rec.get("is_posting");

                        if (vendorId) {
                            f.down("[name=datatype]").setValue("1");
                        }
                        else {
                            f.down("[name=datatype]").setValue("0");
                        }

                        var vid = f.down("[name=voucherID]").getValue();
                        f.loadRecord(rec);
                        c.formatCurrencyFormdata(me, f);
                        c.amountSelected = rec.get("amount");
                        c.kasbank_id = rec.get("kasbank_id");
                        if (rec.get("paymentflag_id") === 1) {
                            f.down('[name=voucherardetail]').setDisabled(false);
                            Ext.getCmp('TabVoucherId').getComponent('tabAr').tab.show();
                        }
                        else if (rec.get("paymentflag_id") === 4) {
                            Ext.getCmp('TabVoucherId').getComponent('tabEscrow').tab.show();
                            Ext.getCmp('TabVoucherId').getComponent('tabAr').tab.hide();
                        }
                        else {
                            f.down('[name=voucherardetail]').setDisabled(true);
                            Ext.getCmp('TabVoucherId').getComponent('tabAr').tab.hide();
                        }
                        f.down("[name=kasbank_date]").setValue(rec.get("kasbank_date"));
                        f.down("[name=payment_date]").setValue(rec.get("payment_date") == "1900-01-01" ? "" : rec.get("payment_date"));
                        f.down("[name=pt_pt_id]").setReadOnly(true);


                        c.is_paid = is_paid;
                        c.is_realized = is_realized;
                        c.is_posting = is_posting;



                        if (is_paid || is_realized || is_posting) {
                            var griddetail = me.getDetailvouchergrid;
                            f.down("[name=payment_paymentmethod_id]").setReadOnly(true);
                            f.down("[name=datatype]").setReadOnly(true);
                            f.down("button[action=browseData]").setDisabled(true);
                            f.down("button[action=browseCheque]").setDisabled(true);
                            f.down("[name=bank_name]").setReadOnly(true);
                            f.down("[name=cheque_cheque_no]").setReadOnly(true);
                            f.down("[name=project_project_id]").setReadOnly(true);
                            f.down("[name=duedate]").setReadOnly(true);
                            f.down("[name=dataflow]").setReadOnly(true);
                            f.down("[name=department_department_id]").setReadOnly(true);
                            f.down("[name=voucherprefix_voucherprefix_id]").setReadOnly(true);
                            gridcoadetail.down('toolbar [action=generate]').setDisabled(true);
                            gridcoadetail.down('toolbar [action=create]').setDisabled(true);
                            //griddetail.down('toolbar [action=generate]').setDisabled(false);
                        } else {
                            // console.log(paymentflag);
                            if (!paymentflag) {
                                gridcoadetail.down('toolbar [action=generate]').setDisabled(true);
                            }
                            else {
                                gridcoadetail.down('toolbar [action=generate]').setDisabled(false);
                            }
                        }

                        if (realization_by) {
                            f.down("[name=realization_date]").setVisible(true);
                            f.down("[name=realization_by]").setVisible(true);

                        }
                        if (posting_by) {
                            f.down("[name=posting_by]").setVisible(true);
                            f.down("[name=posting_date]").setVisible(true);
                        }
                        // (c, template, state, kasbank_id, paymentId, callback) {
                        me.generateCoa(c, c.templateCoa, 'kasbank', rec.get("kasbank_id"), '', function () {
                            // me.disableSave(c, true);
                            // disable 12 - 04 - 2018 reason : gausah generate voucher ID lagi kan udah ke create ;v
                            // if (!rec.get("voucherID")) {
                            me.getVoucherId(c, f.down("[name=kasbank_date]").getValue(), state,
                                    f.down("[name=pt_pt_id]").getValue(), function () {
                                me.checkIsRealization(c);
                            });

                            // }
                        });
                    }
                    else { //state create
                        f.down('[name=department_department_id]').setValue(c.department_id);
                    }

                    f.setLoading(false);
                }
                catch (err) {
                    console.log(err.message);
                    var mm = Ext.Msg.show({
                        title: 'Warning',
                        msg: 'Failed to generate detail, Please try close this window then open again.',
                        icon: Ext.Msg.ERROR,
                        buttons: Ext.Msg.OK,
                        fn: function () {
                            f.up('window').close();
                        }
                    });
                    Ext.defer(function () {
                        mm.toFront();
                    }, 50);
                }
                f.setLoading(false);
            }
        }).read('detail');
    },
    generateCoa: function (c, template, state, kasbank_id, paymentId, callback) {
        var me = this;
        var f = c.getFormdata();
        var g = c.getDetailvouchergrid();
        var totalpayment = accounting.unformat(f.down("[name=amount]").getValue());
        var ps = f.rowData;
        var unitid = 0;
        var schedule_id = 0;
        if (ps) {
            var unitid = ps.get('unit_unit_id');
            var schedule_id = c.schedule_id;
        }
        if (c.amountSelected) {
            me.disableSave(c, true);
            f.setLoading("Loading detail coa");
            g.getStore().load({
                params: {
                    template_id: c.templateCoa,
                    amount: c.amountSelected,
                    kasbank_id: kasbank_id,
                    unit_id: unitid,
                    schedule_id: c.schedule_id,
                    purchaseletter_pencairankpr_id: c.purchaseletter_pencairankpr_id
                },
                callback: function (rec, op) {
                    f.setLoading(false);
                    me.disableSave(c, false);
                    g.attachModel(op);
                    me.sumDetail(c);

                    if (typeof callback === "function") {
                        callback();
                    }
                    me.setSumDetail(c);
                }
            });
        } else {
            c.tools.alert.warning("Cannot Generate Detail .");
            g.getStore().loadData([], false);
        }

    },
    gridSelectionChangedetailcoaGrid: function (c) {
        var me = this;
        var grid = c.getDetailvouchergrid();
        var row = grid.getSelectionModel().getSelection();
        var rec = grid.getSelectedRecord();
        if (!c.is_paid) {
            grid.down('[action=update]').setDisabled(row.length != 1);
            grid.down('[action=destroy]').setDisabled(row.length < 1);
        }
    },
    gridSelectionChangedetailsubcoaGrid: function (c) {
        var me = this;
        var grid = c.getGridsubdetail();
        var row = grid.getSelectionModel().getSelection();
        var rec = grid.getSelectedRecord();
        grid.down('[action=update]').setDisabled(row.length != 1);
        grid.down('[action=destroy]').setDisabled(row.length < 1);
    },
    cancelFormdatadetail: function (c) {
        var me = this;
        var gridCoaDetail = c.getDetailvouchergrid();
        var griArDetail = c.getDetailargrid();
        var gridsubcoadetail = c.getGridsubdetail();
        // griArDetail.getStore().loadData([], false); //comment on 18-04-2018 kena efek ke escrowgrid
        gridCoaDetail.getStore().removeAt(gridCoaDetail.getStore().find('amount', ''));
        gridCoaDetail.getStore().rejectChanges();
    },
    disableSave: function (c, param) {
        var me = this;
        var f = c.getFormdata();
        try {
            f.down('[action=savenew],[action=saveprint],[action=save]').setDisabled(param);
        } catch (err) {
            console.log("disable save error");
        }
        f.down('[action=saveprint]').setDisabled(param);
        f.down('[action=save]').setDisabled(param);
    },
    loadTempModel: function (c, callback) {
        var me = this;
        var f = c.getFormdata();
        c.localStore.subdetailcoa = c.instantStore({
            id: me.controllerName + 'SubDetailCoaStoreTemp',
            extraParams: {
                mode_read: 'subdetailcoa',
                module: 'voucher'
            },
            idProperty: 'vouchersubdetail_id'
        });
        c.localStore.subdetailcoa.load({
            params: {
                voucherdetail_id: 0
            },
            callback: function (rec, op) {

                c.attachModel(op, c.localStore.subdetailcoa, true);
                if (typeof callback === "function") {
                    callback();
                }
            }
        });
    },
    restoreTempToSubGrid: function (c, indexdata) {
        var me = this;
        var substore = c.getGridsubdetail().getStore();
        var tempstoresub = c.localStore.subdetailcoa;
        var f = c.getFormcoadetail();
        var sum = 0;
        tempstoresub.clearFilter(true);
        tempstoresub.filterBy(function (rec, id) {
            var datasub = rec['data'];
            if (datasub.voucherdetail_indexdata == indexdata) {
                sum += parseFloat(accounting.unformat(datasub.amount));
                return true;
            } else {
                return false;
            }
        });

//        var counttempstore = tempstoresub.getCount();
//        me.loadModelSubCoaDetail(c, function () {
//            tempstoresub.each(function (rec) {
//                substore.add(rec);
//            });
//        });
        f.down("[name=amount]").setValue(accounting.formatMoney(sum));
    },
    sumDetail: function (c) {
        var me = this;
        var f = c.getFormdata();
        var sum = 0;
        var store = c.getDetailvouchergrid().getStore();
        store.each(function (rec) {
            sum += parseFloat(accounting.unformat(rec.get('amount')));
        });
        f.down("[name=amount]").setValue(accounting.formatMoney(sum));
        me.setSumDetail(c);
    },
    changePayment: function (c, val) {
        var me = this;
        var f = c.getFormdata();
        if (val === 7 || val === 4) {//transfer
            f.down('[name=bank_name]').setVisible(true);
            f.down('[name=payment_date]').setVisible(true);
            f.down('[name=cheque_cheque_no]').setVisible(false);
            f.down('[action=browseCheque]').setVisible(false);
            f.down('[name=bank_name]').setValue('');
            f.down('[name=payment_date]').setValue('');
            f.down('[name=cheque_cheque_no]').setValue('');
            f.down('[name=cheque_cheque_id]').setValue('');
        }
        else if (val === 2) {//giro
            f.down('[name=bank_name]').setVisible(false);
            f.down('[name=payment_date]').setVisible(true);
            f.down('[name=cheque_cheque_no]').setVisible(true);
            f.down('[action=browseCheque]').setVisible(true);
        }
        else {
            f.down('[name=bank_name]').setVisible(false);
            f.down('[name=payment_date]').setVisible(false);
            f.down('[name=cheque_cheque_no]').setVisible(false);
            f.down('[action=browseCheque]').setVisible(false);
            f.down('[name=bank_name]').setValue('');
            f.down('[name=payment_date]').setValue('');
            f.down('[name=cheque_cheque_no]').setValue('');
            f.down('[name=cheque_cheque_id]').setValue('');
        }
    },
    gridSelectionChangeChequeGrid: function (c) {
        var me = this;
        var grid = c.getChequegrid();
        var row = grid.getSelectionModel().getSelection();
        var rec = grid.getSelectedRecord();
        var c = grid.getSelectionModel().getCount();
        grid.down('[action=select]').setDisabled(true);
        if (c === 1) {
            grid.down('[action=select]').setVisible(true);
            grid.down('[action=select]').setDisabled(false);
        }
        else {
            grid.down('[action=select]').setDisabled(true);
        }
    },
    gridSelectionChangeEscrowGrid: function (c) {
        var me = this;
        var grid = c.getEscrowgrid();
        var row = grid.getSelectionModel().getSelection();
        var rec = grid.getSelectedRecord();
        var c = grid.getSelectionModel().getCount();
        grid.down('[action=select]').setDisabled(true);
        var valid = 0;
        Ext.each(row, function (item) {
            var cair_date = moment(item.get('pencairan_date')).format("DD-MM-YYYY");
            if (cair_date == "01-01-1900") {
                valid = 1;
            }
            else {
                valid = 0;
            }
        });
        if (valid === 1) {
            grid.down('[action=select]').setDisabled(false);
        }
        else {
            grid.down('[action=select]').setDisabled(true);
        }
//        if (c > 0) {
//            var cair_date = moment(rec.get('pencairan_date')).format("DD-MM-YYYY");
//            if (cair_date == "01-01-1900") {
//                grid.down('[action=select]').setVisible(true);
//                grid.down('[action=select]').setDisabled(false);
//            }
//            else {
//                grid.down('[action=select]').setDisabled(true);
//            }
//        }
//        else {
//            grid.down('[action=select]').setDisabled(true);
//        }
    },
    getVoucherGenerator: function (c) {
        var me = this;
        var f = c.getFormdata();
        c.tools.ajax({
            params: {
                module: c.controllerName
            },
            success: function (data, model) {
                try {
                    c.voucher_generate = data.value;
                }
                catch (err) {
                    console.log(err.message);
                    c.tools.alert.warning("Failed to load global param voucher_generate, please re-open menu.");
                }
                f.setLoading(false);
            }
        }).read('getvouchergenerate');
    },
    autogeneratevoucher: function (c, val) {
        var me = this;
        var f = c.getFormdata();
        var vs = f.getValues();
        if (val.value) {
            f.down('[name=payment_receipt_no]').setReadOnly(true);
            f.down('[name=payment_receipt_no]').setValue('');
        }
        else {
            f.down('[name=payment_receipt_no]').setReadOnly(false);
        }
    },
    fillPt: function (c) {
        var me = this;
        var form = c.getFormdata();
        var selected = c.tools.comboHelper(form.down("[name=pt_pt_id]")).getFieldFree('pt_id', 'name', c.ptId);
        form.down("[name=pt_pt_id]").setValue(c.ptId);
    },
    hiddenSumFieldDetail: function (c, param) {
        var me = this;
        var f = c.getFormdata();
        f.down('[name=sum_total_detail]').setVisible(param);
    },
    setSumDetail: function (c) {
        var me = this;
        var f = c.getFormdata();
        var total = 0;
        var grid = c.getDetailvouchergrid();
        var store = grid.getStore();
        store.each(function (rec) {
            total += parseFloat(accounting.unformat(rec.get("amount")));
        });
        f.down("[name=sum_total_detail]").setValue(accounting.formatMoney(total));
    },
    getCashflow: function (c, coaId, cb) {
        var me = this;
        var fd = c.getFormcoadetail();
        var f = c.getFormdata();
        var pt = f.down("[name=pt_pt_id]").getValue();
        var department = f.down("[name=department_department_id]").getValue();
        c.getCustomRequestCombobox('getcashflow', coaId, pt, department, 'cashflow_setupcashflow_id', 'cashflow', ['cashflowtype', 'grouptype'], fd, '', function () {
            if (typeof cb === "function") {
                cb();
            }
        });
    },
    cashflowChange: function (c, val) {
        var me = this;
        var f = c.getFormcoadetail();
        var selectedCF = c.tools.comboHelper(f.down("[name=cashflow_setupcashflow_id]")).getField('setupcashflow_id', 'cashflowtype_cashflowtype');
        var selectedCFtype = c.tools.comboHelper(f.down("[name=cashflow_setupcashflow_id]")).getField('setupcashflow_id', 'cashflowtype_cashflowtype_id');
        //console.log(selectedCF);
        f.down("[name=cashflowtype_cashflowtype]").setValue(selectedCF);
        f.down("[name=cashflowtype_cashflowtype_id]").setValue(selectedCFtype);
    },
    subglChange: function (c) {
        var me = this;
        var f = c.getFormcoadetail();
        var selectedsubgl = c.tools.comboHelper(f.down("[name=subgl_subgl_id]")).getField('subgl_id', 'code');
        f.down("[name=subgl_code]").setValue(selectedsubgl);
    },
    getSubgl: function (c) {
        var me = this;
        var me = this;
        var fd = c.getFormcoadetail();
        var f = c.getFormdata();
        var pt = f.down("[name=pt_pt_id]").getValue();
        c.getCustomRequestCombobox('getsubgl', c.kelsub_id, pt, '', 'subgl_subgl_id', 'subgl', '', fd);
//        c.tools.ajax({
//            params: {
//                module: c.controllerName,
//                kelsub_id:c.kelsub_id,
//                pt_id: pt
//            },
//            success: function (data, model) {
//                try {
//                    c.tools.wesea(data, f.down("[name=subgl_subgl_id]")).comboBox();
//                }
//                catch (err) {
//                    console.log(err.message);
//                    c.tools.alert.warning("Failed to get Sub GL.");
//                }
//                f.setLoading(false);
//            }
//        }).read('getsubgltemp');
    },
    checkIsRealization: function (c) {
        var me = this;
        var f = c.getFormdata();
        //console.log(c.is_realized);
        if (c.is_realized) {
            me.disableSave(c, true);
        }
    },
    gridChequeGdar: function (c) {
        var me = this;
        var grid = c.getChequegrid();
        if (c.dataflow === 'IN') {
            grid.down("[action=createchequein]").setDisabled(false);
            grid.down("[action=createchequein]").setVisible(true);
            grid.down("[action=createchequeout]").setDisabled(true);
            grid.down("[action=createchequeout]").setVisible(false);
        } else {
            grid.down("[action=createchequeout]").setDisabled(false);
            grid.down("[action=createchequeout]").setVisible(true);
            grid.down("[action=createchequein]").setDisabled(true);
            grid.down("[action=createchequein]").setVisible(false);
        }
    }

});

