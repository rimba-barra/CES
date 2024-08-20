Ext.define('Master.library.journal.Journaldetail', {
    config: null,
    constructor: function (options) {
        Ext.apply(this, options || {});
    },
	savenewdetailcoa: function (c) {
        var me = this;
		me.savedetailcoa(c, function(){
            me.formDataDetail(c, 'create');
        });
	},
    savedetailcoa: function (c, cb) {
        var me = this;
        var f = c.getFormcoadetail();
        var value = f.getForm().getValues();
        var g = c.getDetailjournalgrid();
        var store = g.getStore();
        //var substore = c.getGridsubdetail().getStore();
        var total = f.down("[name=amount]").getValue();
        total = accounting.unformat(total);
        if (f.getForm().isValid()) {
            
            value['amount'] = parseFloat(accounting.unformat(value['amount']));
            value['amountc'] = parseFloat(accounting.unformat(value['amountc']));

            var db = value['amount'];
            var cr = value['amountc'];

            if (db>0 && cr>0) {
                c.tools.alert.warning("One of Debet/Credit must be 0.");
                return 0;
            }else{

            }

            if (db>0 || cr>0) {
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

                // var sb = c.localStore.subdetailcoa;
                // substore.clearFilter(true);
                // substore.each(function (rec) {
                //     if (!rec.get("journalsubdetail_id")) {
                //         sb.add(rec);
                //     }
                // });

                // var count = substore.getCount();
                // if (count === 0) {
                //     me.clearTempStorebyIndexdata(c, rec.get("indexdata"));
                // }
                // c.sumCount = count + c.sumCount;
                // me.checkDeletedSubTempCoa(c);
                me.sumDetail(c);
                f.up('window').close();
                
                /*
                if(c.ok==1){
                    me.formDataDetail(c, 'create');
                }
                */
                if(typeof cb==='function'){
                    
                    setTimeout(function(){ cb(); }, 1000);
                }
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
        var w = c.instantWindow('Formcoadetail', 900, 'Add detail journal ', param, 'coadatadetailsby');
        var f = c.getFormcoadetail();
        c.kasbankdetail_id = 0;
        //me.loadModelSubCoaDetail(c);
        c.getCustomRequestCombobox('coa', '', '', '', 'coa_coa_id', 'coa', ['kelsub'], f, param);

        var gridCoaDetail = c.getDetailjournalgrid();
        var records = gridCoaDetail.getSelectionModel().getSelection();
        
        if(records.length>0){
            var coaId = records[0]["data"]["coa_coa_id"];
            var cashflowtype_id = records[0]["data"]["cashflowtype_id"];
            var subgl_id = records[0]["data"]["subgl_subgl_id"];
            var kelsub_id = records[0]["data"]["kelsub_kelsub_id"];
        }

        c.cashflowtype_id = cashflowtype_id;
        me.getCashflow(c, coaId);
        
        if (kelsub_id) {
            f.down("[name=subgl_subgl_id]").setVisible(true);
            f.down('label[id=affiliasiNameId]').setVisible(true);
            //f.down('label[id=affiliasiNameId]').setText(selectedKelsubDesc + ':');
            c.kelsub_id = kelsub_id;
            c.subgl_id = subgl_id;
            me.getSubgl(c);
        }

        var fr = c.getFormdata();

        var is_memorialcashflow = fr.down("[name=is_memorialcashflow]").getValue();
        if(is_memorialcashflow==false){
            f.down("[name=cashflow]").hide();
            f.down("[name=cashflowtype_cashflowtype_id]").hide();
        }

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
        var gridcoadetail = c.getDetailjournalgrid();
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
                journaldetail_id: c.kasbankdetail_id
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
            var id = records[i]['data']["journalsubdetail_id"];
            if (id) {
                fa.deletedsubRows.push(id);
            }
            fa.deletedLocalstoreSubRows.push(records[i].get("indexsubdata"));
            g.getStore().removeAt(row);
            c.journalAr.setSumDetailAR(c);
            f.down("[name=amount]").setValue(accounting.formatMoney(c.sumAmountStore(g.getStore())));
            f.down("[name=amountc]").setValue(accounting.formatMoney(c.sumAmountStorec(g.getStore())));
        }
    },
    subglChange: function (c) {
        var me = this;
        var f = c.getFormsubcoadetail();
        var code = c.tools.comboHelper(f.down("[name=subgl_subgl_id]")).getField('subgl_id', 'code');
        var code1 = c.tools.comboHelper(f.down("[name=subgl_subgl_id]")).getField('subgl_id', 'code1');
        var code2 = c.tools.comboHelper(f.down("[name=subgl_subgl_id]")).getField('subgl_id', 'code2');
        var code3 = c.tools.comboHelper(f.down("[name=subgl_subgl_id]")).getField('subgl_id', 'code3');
        var code4 = c.tools.comboHelper(f.down("[name=subgl_subgl_id]")).getField('subgl_id', 'code4');
        f.down("[name=subgl_code]").setValue(code);
        f.down("[name=subgl_code1]").setValue(code1);
        f.down("[name=subgl_code2]").setValue(code2);
        f.down("[name=subgl_code3]").setValue(code3);
        f.down("[name=subgl_code4]").setValue(code4);
    },
    destroydetail: function (c) {
        var me = this;
        var f = c.getFormcoadetail();
        var fa = c.getFormdata();
        var g = c.getDetailjournalgrid();
        //var tempstoresub = c.localStore.subdetailcoa;
        var records = g.getSelectionModel().getSelection();
        for (var i = records.length - 1; i >= 0; i--) {
            var row = g.getStore().indexOf(records[i]);
            var id = records[i]['data']["journaldetail_id"];
            if (id) {
                fa.deletedRows.push(id);
            }
            //tempstoresub.removeAt(tempstoresub.find('journaldetail_indexdata', records[i]['data']["indexdata"]));
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
            c.journalAr.setSumDetailAR(c);
            fa.down("[name=amount]").setValue(accounting.formatMoney(c.sumAmountStore(store)));
            fa.down("[name=amountc]").setValue(accounting.formatMoney(c.sumAmountcStore(store)));

            f.up('window').close();
        }
    },
    coaChange: function (c) {
        var me = this;
        c.kelsub_id = 0;
        var f = c.getFormcoadetail();
        var row = f.getForm().getValues();
        var gridcoadetail = c.getDetailjournalgrid();
        var gridcoadetailstore = gridcoadetail.getStore();
        //var gridsub = c.getGridsubdetail();
        //var storesub = gridsub.getStore();
        var io = f.down("[name=indexdata]").getValue();
        
        //gridcoadetailstore.removeAt(gridcoadetailstore.find('indexdata', io));
        //gridcoadetailstore.add(row);
        
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
        me.getCashflow(c, coaId);
        if (selectedKelsubId) {
            f.down("[name=subgl_subgl_id]").setVisible(true);
            f.down('label[id=affiliasiNameId]').setVisible(true);
            f.down('label[id=affiliasiNameId]').setText(selectedKelsubDesc + ':');
            c.kelsub_id = selectedKelsubId;
            var indexdata = f.down("[name=indexdata]").getValue();
            me.getSubgl(c);
            //me.restoreTempToSubGrid(c, indexdata);
        } else {
            //f.down("[name=amount]").setReadOnly(false);
            //f.down("[name=amount]").setValue('0.00');
            //f.down("[name=amountc]").setReadOnly(false);
            //f.down("[name=amountc]").setValue('0.00');
            f.down("[name=subgl_subgl_id]").setVisible(false);
            f.down("[name=subgl_subgl_id]").setValue(false);
            f.down('label[id=affiliasiNameId]').setVisible(false);
            f.down("[name=subgl_subgl_id]").setValue(null);
            f.down("[name=subgl_description]").setValue(null);
            
            
            //gridsub.down("[action=create]").setDisabled(true);
            //storesub.loadData([], false);
            c.kelsub_id = 0;
        }

    },
    formDataSubDetail: function (c, param) {
        var me = this;
        var w = c.instantWindow('FormDataSubDetail', 700, 'Add sub detail journal ', param, 'coadatasubdetailsby');

    },
    fdardatasub: function (c, param) {
        var me = this;
        var f = c.getFormsubcoadetail();
        var form = c.getFormcoadetail();
        var val = form.getForm().getValues();

        if (param == 'create') {
            c.getCustomRequestCombobox('subgl', val.kelsub_kelsub_id, 'subgl_subgl_id', 'subgl', '', f);
            var tempstoresub = c.localStore.subdetailcoa;
            var gridsub = c.getGridsubdetail();
            var count2 = gridsub.getStore().getCount();
            f.down('[name=kelsub_kelsub]').setValue(val.kelsub_kelsub);
            f.down('[name=kelsub_kelsub_id]').setValue(val.kelsub_kelsub_id);
            f.down('[name=journaldetail_id]').setValue(val.journaldetail_id);
            f.down('[name=journaldetail_journaldetail_id]').setValue(val.journaldetail_id);
            f.down('[name=journaldetail_indexdata]').setValue(val.indexdata);
            f.down('[name=indexsubdata]').setValue(count2 + c.sumCount + 1);
        }
        else if (param == 'update') {
            var grid = c.getGridsubdetail();
            var row = grid.getSelectionModel().getSelection();
            var rec = grid.getSelectedRecord();
            form.loadRecord(rec);
        }
    },
    getJournalId: function (c, paramdate, state, pt) {
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
                try {
                    if (data.hasil[0][0].jid === 0) {
                        c.tools.alert.warning("Selected date is closing for transaction.");
                        me.disableSave(c, true);
                        if (state == 'create') {
                            f.down('[name=journalID]').setValue('');
                        }
                    }
                    else if (data.hasil[0][0].jid === 2) {
                        c.tools.alert.warning("Selected date is not installed, please setup on master closing.");
                        me.disableSave(c, true);
                        if (state == 'create') {
                            f.down('[name=journalID]').setValue('');
                        }
                    }
                    else {
                        if (state == 'create') {
                            f.down('[name=journalID]').setValue(data.hasil[0][0].jid);
                        }
                        me.disableSave(c, false);
                    }

                }
                catch (err) {
                    console.log(err.message);
                    c.tools.alert.warning("Failed to load journal ID, please reselect date to generate.");
                }
                f.setLoading(false);
            }
        }).read('journalid');
    },
    resetDetailCoa: function (c, tab) {
        var me = this;
        var f = c.getFormdata();
        if (c.isEdit == '1') {
            if (tab.name === 'detailjournalgrid') {
                c.checkArIsEmpty();
                Ext.Msg.show({
                    title: 'Regenerate detail?',
                    msg: 'Are you sure to regenerate detail COA Account?',
                    buttons: Ext.Msg.YESNO,
                    icon: Ext.Msg.QUESTION,
                    fn: function (clicked) {
                        if (clicked === "yes") {
                            c.journalAr.getTotalSumAr(c);
                            f.down("[name=amount]").setValue(accounting.formatMoney(c.totalSumAr));
                            //f.down("[name=amountc]").setValue(accounting.formatMoney(c.totalSumAr));
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
        c.tools.ajax({
            params: {
                module: c.controllerName,
                param: params,
                dataflow: kasbank
            },
            success: function (data, model) {
                c.fillFormComponents(data, f);
                var gridcoadetail = c.getDetailjournalgrid();
                f.down("[name=journalardetail]").setDisabled(false);
                if (state == "update") {
                    var grid = c.getGrid();
                    var row = grid.getSelectionModel().getSelection();
                    var rec = grid.getSelectedRecord();
                    // console.log(rec);
                    gridcoadetail.down('toolbar [action=generate]').setDisabled(false);
                    f.rowData = rec;
                    f.editedRow = grid.getSelectedRow();
                    c.amountSelected = null;
                    //console.log(rec);
                    var vid = f.down("[name=journalID]").getValue();
                    f.loadRecord(rec);
                    c.formatCurrencyFormdata(me, f);
                    c.amountSelected = rec.get("amount");
                    c.kasbank_id = rec.get("journal_id");
                    //console.log(rec);
                    me.generateCoa(c, c.templateCoa, 'kasbank', rec.get("journal_id"), '', function () {
                        me.getJournalId(c, f.down("[name=kasbank_date]").getValue(), state, f.down("[name=pt_pt_id]").getValue());
                    });

                }
            }
        }).read('detail');
    },
    generateCoa: function (c, template, state, kasbank_id, paymentId, callback) {
        var me = this;
        var f = c.getFormdata();
        var g = c.getDetailjournalgrid();
        var totalpayment = accounting.unformat(f.down("[name=amount]").getValue());
        var ps = f.rowData;
        var unitid = 0;
        var schedule_id = 0;
        if (ps) {
            var unitid = ps.get('unit_unit_id');
            var schedule_id = c.schedule_id;
        }
        if (true) {
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
        var grid = c.getDetailjournalgrid();
        var row = grid.getSelectionModel().getSelection();
        var rec = grid.getSelectedRecord();
        grid.down('[action=update]').setDisabled(row.length != 1);
        grid.down('[action=destroy]').setDisabled(row.length < 1);
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
        var gridCoaDetail = c.getDetailjournalgrid();
        var griArDetail = c.getDetailargrid();
        var gridsubcoadetail = c.getGridsubdetail();
        // griArDetail.getStore().loadData([], false); //comment on 18-04-2018 kena efek ke escrowgrid
        gridCoaDetail.getStore().removeAt(gridCoaDetail.getStore().find('amount', ''));
        gridCoaDetail.getStore().rejectChanges();
    },
    disableSave: function (c, param) {
        var me = this;
        var f = c.getFormdata();
        f.down('[action=savenew],[action=saveprint],[action=save]').setDisabled(param);
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
                module: 'journal'
            },
            idProperty: 'journalsubdetail_id'
        });
        c.localStore.subdetailcoa.load({
            params: {
                journaldetail_id: 0
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
            if (datasub.journaldetail_indexdata == indexdata) {
                sum += parseFloat(accounting.unformat(datasub.amount));
                return true;
            } else {
                return false;
            }
        });

        var counttempstore = tempstoresub.getCount();
        // me.loadModelSubCoaDetail(c, function () {
        //     tempstoresub.each(function (rec) {
        //         substore.add(rec);
        //     });
        // });
        f.down("[name=amount]").setValue(accounting.formatMoney(sum));
    },
    sumDetail: function (c) {
        var me = this;
        var f = c.getFormdata();
        var sum = 0;
        var sumc = 0;

        var store = c.getDetailjournalgrid().getStore();
        store.each(function (rec) {
            sum += parseFloat(accounting.unformat(rec.get('amount')));
            sumc += parseFloat(accounting.unformat(rec.get('amountc')));
        });
        //f.down("[name=amount]").setValue(accounting.formatMoney(sum));
        //f.down("[name=amountc]").setValue(accounting.formatMoney(sumc));
        me.setSumDetail(c);
    },
    changePayment: function (c, val) {
        var me = this;
        var f = c.getFormdata();
        if (val === 7) {//transfer
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
            f.down('[name=bank_name]').setVisible(true);
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
    getJournalGenerator: function (c) {
        var me = this;
        var f = c.getFormdata();
        c.tools.ajax({
            params: {
                module: c.controllerName
            },
            success: function (data, model) {
                try {
                    c.journal_generate = data.value;
                }
                catch (err) {
                    console.log(err.message);
                    c.tools.alert.warning("Failed to load global param journal_generate, please re-open menu.");
                }
                f.setLoading(false);
            }
        }).read('getjournalgenerate');
    },
    autogeneratejournal: function (c, val) {
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
        var totalc = 0;
        var grid = c.getDetailjournalgrid();
        var store = grid.getStore();
        store.each(function (rec) {
            total += parseFloat(accounting.unformat(rec.get("amount")));
            totalc += parseFloat(accounting.unformat(rec.get("amountc")));
        });
        f.down("[name=sum_total_detail]").setValue(accounting.formatMoney(total));
        f.down("[name=sum_totalc_detail]").setValue(accounting.formatMoney(totalc));

    },
    getCashflow: function (c, coaId) {
        var me = this;
        var fd = c.getFormcoadetail();
        var f = c.getFormdata();
        var pt = f.down("[name=pt_pt_id]").getValue();
        var department = f.down("[name=department_department_id]").getValue();
        //ID YANG DIGUNAKAN ADALAH SETUPCASHFLOW_ID
        c.getCustomRequestCombobox('getcashflow', coaId, pt, department, 'cashflowtype_cashflowtype_id', 'cashflowtype', ['grouptype'], fd, '',
                function(){
                    fd.down("[name=cashflowtype_cashflowtype_id]").setValue(c.cashflowtype_id);
                }
            );
    },
    cashflowChange: function (c, val) {
        var me = this;
        var f = c.getFormcoadetail();
        var selectedCF = c.tools.comboHelper(f.down("[name=cashflowtype_cashflowtype_id]")).getField('cashflowtype_id', 'cashflowtype');
        f.down("[name=cashflowtype]").setValue(selectedCF);
    },
    subglChange: function (c) {
        var me = this;
        var f = c.getFormcoadetail();
        var selectedsubgl = c.tools.comboHelper(f.down("[name=subgl_subgl_id]")).getField('subgl_id', 'code');
        f.down("[name=subgl_description]").setValue(selectedsubgl);
    },
    getSubgl: function (c) {
        var me = this;
        var me = this;
        var fd = c.getFormcoadetail();
        var f = c.getFormdata();
        var pt = f.down("[name=pt_pt_id]").getValue();
        c.getCustomRequestCombobox('getsubgl', c.kelsub_id, pt, '', 'subgl_subgl_id', 'subgl', '', fd);

        var subgl_id = c.subgl_id;
        if(subgl_id){
            fd.down("[name=subgl_subgl_id]").setValue(subgl_id);
        }
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
    createcopy: function(c, param) {
        // copy the selected record
        var me =  this;
        var grid = c.getDetailjournalgrid();
        var store = grid.getStore();
        var rec = grid.getSelectionModel().getSelection()[0];
        var copy = rec.copy(null);
        var row = grid.store.indexOf(rec); // this used to be -1
        store.insert(row, copy);

        rec.beginEdit();
        rec.set('journaldetail_id', '');
        rec.endEdit();

        store.commitChanges();
        me.setSumDetail(c);
        rec.commit(); // save changes
    }
});

