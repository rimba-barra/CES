Ext.define('Cashier.library.journaleliminasi.Journalar', {
    config: null,
    constructor: function (options) {
        Ext.apply(this, options || {});
    },
    dataDestroyAr: function (c, v) {
        var me = this;
        var griArDetail = c.getDetailargrid();
        var store = griArDetail.getStore();
        var rows = griArDetail.getSelectionModel().getSelection();
        if (rows.length < 1) {
            Ext.Msg.alert('Info', 'No record selected !');
            return;
        } else {
            var sum = 0;
            for (var i = 0; i < rows.length; i++) {
                sum += parseFloat(rows[i].get("remaining_balance"));
                store.remove(rows[i]);
            }

            c.getSelectedSchedule();
            c.checkArIsEmpty();
           // me.getTotalWithoutLastRecordNew(c);
        }
    },
    getTotalWithoutLastRecordNew: function (c) {
        var me = this;
        c.totalWithoutLastRecordNew = 0;
        var total = 0;
        var gridjournalar = c.getDetailargrid();
        var storejournalar = gridjournalar.getStore();
        var count = storejournalar.getCount();
        var cd = storejournalar.getCount() - 1;
        var firstRecord = storejournalar.getAt(0);
        var lastRecord = storejournalar.getAt(cd);
        if (count > 1) {
            storejournalar.each(function (rec) {
                total += parseFloat(rec.get('remaining_balance'));
            });
            c.totalWithoutLastrecord = parseFloat(firstRecord.get("remaining_balance"));
            c.firstTotal = parseFloat(total);
        }
        else {
            c.totalWithoutLastrecord = 0;
            c.firstTotal = parseFloat(firstRecord.get("remaining_balance"));
        }
    },
    getTotalWithoutLastRecordNewv2: function (c, param) {
        var me = this;
        c.totalWithoutLastRecordNew = 0;
        var total = 0;
        var key;
        var key = (param ? "amount" : "remaining_balance");
        var gridjournalar = c.getDetailargrid();
        var storejournalar = gridjournalar.getStore();
        var count = storejournalar.getCount();
        var cd = storejournalar.getCount() - 1;
        var firstRecord = storejournalar.getAt(0);
        var lastRecord = storejournalar.getAt(cd);
        if (count > 1) {
            storejournalar.each(function (rec) {
                total += parseFloat(rec.get(key));
            });
            c.totalWithoutLastrecord = total - lastRecord.get(key);
            c.firstTotal = parseFloat(total);
        }
        else {
            c.totalWithoutLastrecord = 0;
            c.firstTotal = parseFloat(firstRecord.get(key));
        }
    },
    setArStore: function (c, a, b) {
        var me = this;
        var gridjournalar = c.getDetailargrid();
        var store = gridjournalar.getStore();
        store.each(function (record) {
            record.set(a, b);
        });
    },
    getIndexDetailAr: function (c) {
        var me = this;
        var total = 0;
        var gridjournalar = c.getDetailargrid();
        var total = gridjournalar.getStore().getCount();
        return total;
    },
    getTotalSumAr: function (c) {
        var me = this;
        c.totalSumAr = 0;
        var total = 0;
        var gridjournalar = c.getDetailargrid();
        var storejournalar = gridjournalar.getStore();
        storejournalar.each(function (rec) {
            total += parseFloat(rec.get('remaining_pay'));
        });
        c.totalSumAr = total;
    },
    getTotalWithoutLastRecord: function (c) {
        var me = this;
        c.totalWithoutLastrecord = 0;
        var total = 0;
        var gridjournalar = c.getDetailargrid();
        var storejournalar = gridjournalar.getStore();
        storejournalar.each(function (rec) {
            total += parseFloat(rec.get('remaining_balance'));
        });
        c.totalWithoutLastrecord = total;
    },
    getFirstTotal: function (c, param) { //param for AR ID, jika state update baca amount dari 
//                                       td_paymentdetail_temp, bukan remaining balance dari schedule
        var me = this;
        var key = (param ? "amount" : "remaining_balance");
        c.firstTotal = 0;
        var total = 0;
        var gridjournalar = c.getDetailargrid();
        var storejournalar = gridjournalar.getStore();
        storejournalar.each(function (rec) {
            total += parseFloat(rec.get(key));
        });
        c.firstTotal = total;
    },
    getTotalAfterDeleteAr: function (c) {
        var me = this;
        c.totalSumAfterDeleteAr = 0;
        var total = 0;
        var gridjournalar = c.getDetailargrid();
        var storejournalar = gridjournalar.getStore();
        storejournalar.each(function (rec) {
            total += parseFloat(rec.get('remaining_balance'));
        });
        c.totalSumAfterDeleteAr = total;
    },
    loadAR: function (c, row) {
        var me = this;
        var gridar = c.getDetailargrid();
        var store = gridar.getStore();
        if (row) {
            store.add(row);
            store.commitChanges();

            me.addTagihanDefault(c, row);
        }
    },
    GridAr: function (c, param) {
        var indexdata, getindex, record, row;
        var me = this;
        c.final = 0;
        var g = c.getDetailargrid();
        var store = g.getStore();
        var f = c.getFormdata();
        store.sort('duedate', 'ASC');
        g.on({
            scope: this,
            edit: function (roweditor, event) {
                c.getSelectedSchedule();
                var count = store.getCount();

                var initamount = parseFloat(accounting.unformat(event.record.get('amount')));
                var initremaining = parseFloat(accounting.unformat(event.record.get('remaining_balance')));
                var amountunpaid = 0;
                if(initremaining<initamount && initremaining>0){
                    amountunpaid = initremaining;
                }else{
                    amountunpaid = initamount;
                }

                var final = amountunpaid - accounting.unformat(event.value);
                if (accounting.unformat(event.value) > amountunpaid) {
                    c.tools.alert.warning("Payment harus lebih kecil dari : " + accounting.formatMoney(amountunpaid));
                    event.record.set('remaining_pay', 0);
                    event.record.set('final', 0);
                    me.setSumDetailAR(c);
                    return false;
                }
                else {
                    event.record.set('final', final);
                    store.commitChanges();
                    c.isEdit = 1;
                    me.setSumDetailAR(c);
                }
            },
        });
    },
    GridArNew: function (c, param) {
        var indexdata, getindex, record, row;
        var me = this;
        c.final = 0;
        var g = c.getDetailargrid();
        var store = g.getStore();
        var f = c.getFormdata();
        var count = store.getCount();
        store.sort('duedate', 'ASC');
        if (!param) {
            if (count == '1') {
                c.totalTemp = accounting.formatMoney(c.final);
                store.each(function (record) {
                    record.set('final', 0);
                    record.set('remaining_pay', record.get("remaining_balance"));
                });
            }
            else {
                store.each(function (record) {
                    record.set('final', 0);
                    record.set('remaining_pay', 0);
                });
                g.getView().refresh();
            }
        }
        g.on({
            scope: this,
            edit: function (roweditor, event) {
                c.getSelectedSchedule();
                store.each(function (record) {
                    if (event.field == "remaining_pay") {
                        var firstPay = event.record.modified['remaining_pay'];
                        if (parseFloat(event.value) <= parseFloat(c.firstTotal)) {
                            if (parseFloat(event.value) >= c.totalWithoutLastrecord) {
                                var finalAmount = parseFloat(event.record.get('amount')) - parseFloat(event.record.get('remaining_pay'));
                                if (finalAmount <= 0) {
                                    var cd = store.getCount() - 1;
                                    var rowIndex = store.getAt(cd);
                                    if (me.getIndexDetailAr(c) !== '1') {
                                        var lebihAngsuran = parseFloat(event.value) - parseFloat(event.record.get("amount"));
                                        event.record.set('remaining_pay', parseFloat(event.record.get('amount')));
                                        if (lebihAngsuran >= 0) {
                                            var lebih2 = parseFloat(event.value) - c.totalWithoutLastrecord;
                                            record.set('remaining_pay', parseFloat(record.get('amount')));
                                            rowIndex['data'].remaining_pay = lebih2;
                                            rowIndex['data'].final = parseFloat(rowIndex['data'].remaining_balance) - lebih2;
                                        }
                                    }
                                    event.record.set('remaining_pay', event.record.get('amount'));
                                    event.record.set('final', 0);
                                    g.getView().refresh();
                                }
                                else {
                                    event.record.set('final', finalAmount);
                                }
                            }
                            else {
                                event.record.set('remaining_pay', event.record.get('amount'));
                                event.record.set('final', 0);
                                c.tools.alert.warning("Payment harus lebih besar dari : " + accounting.formatMoney(c.totalWithoutLastrecord));
                                return false;
                            }

                        }
                        else {
                            event.record.set('remaining_pay', event.record.get('remaining_balance'));
                            event.record.set('final', 0);
                            c.tools.alert.warning("Payment harus lebih kecil dari : " + accounting.formatMoney(c.firstTotal));
                            return false;
                        }
                    }
                    store.commitChanges();
                });
                c.isEdit = 1;
                me.setSumDetailAR(c);
            },
            beforeedit: function (a, b) {
                if (b.rowIdx !== 0) {
                    return false;
                }
            }
        });
    },
    gridSelectionChangeAngsuranGrid: function (c) {
        var me = this;
        var grid = c.getAngsurangrid();
        var row = grid.getSelectionModel().getSelection();
        var rec = grid.getSelectedRecord();
        var c = grid.getSelectionModel().getCount();
        if (c === 1) {
            if (rec.get("remaining_balance") > 0) {
                grid.down('[action=select]').setDisabled(false);
            }
        }
        else {
            grid.down('[action=select]').setDisabled(true);
        }
    },
    loadModelAr: function (c) {
        var me = this;
        var gridar = c.getDetailargrid();
        gridar.doInit();
        //c.journalDetail.disableSave(c, true);

        var f = c.getFormdata();
        var unit_id_str = '';
        //f.down('[name=unit_unit_id]').setVisible(param);


        gridar.getStore().load({
            params: {
                kasbank_id: c.kasbank_id
            },
            callback: function (rec, op) {
                if (op) {

                    var rec = op.resultSet.records;
                    var raw;
                    for (i = 0; i < rec.length; i++) {
                      raw = rec[i].raw;
                      unit_id_str = unit_id_str + raw.unit.unit_id + '~';
                    }
                    f.down('[name=unit_unit_id]').setValue(unit_id_str);

                    gridar.attachModel(op);
                    c.is_erems = 0;
                    //me.getFirstTotal(c, c.kasbank_id);
                   // me.getTotalWithoutLastRecordNewv2(c, c.kasbank_id);
                    c.getSelectedSchedule();
                    me.GridAr(c, c.kasbank_id);
                    me.setSumDetailAR(c);
                    me.checkCountAr(c);
                    //  c.journalDetail.disableSave(c, false);
                } else {
                    console.log('error attach model AR-AP');
                }
            }
        });
    },
    hiddenSumFieldAr: function (c, param) {
        var me = this;
        var f = c.getFormdata();
        f.down('[name=sum_final]').setVisible(param);
        f.down('[name=sum_pay]').setVisible(param);
        f.down('[name=sum_total]').setVisible(param);
        //f.down('[name=sum_tagihan]').setVisible(param);
    },
    setSumDetailAR: function (c) {
        var me = this;
        var f = c.getFormdata();
        var amount = 0;
        var pay = 0;
        var final = 0;
        var grid = c.getDetailargrid();
        var store = grid.getStore();
        store.each(function (rec) {
            amount += parseFloat(accounting.unformat(rec.get("amount")));
            pay += parseFloat(accounting.unformat(rec.get("remaining_pay")));
            final += parseFloat(accounting.unformat(rec.get("final")));
        });
        //f.down("[name=sum_tagihan]").setValue(accounting.formatMoney(amount));
        //f.down("[name=sum_pay]").setValue(accounting.formatMoney(pay));
        //f.down("[name=sum_final]").setValue(accounting.formatMoney(final));
    },
    escrowSelect: function (c, v) {
        var me = this;
        var cmpformdata = Ext.getCmp('formdatajournalID');
        if (!cmpformdata) {
            var w = c.instantWindow('FormData', 900, 'Add Journal', 'create', 'myEscrowWindow');
        } else {
            v.up("window").close();
        }
        var f = c.getFormdata();
        c.paymentflag_id = 4; // 1 escrow payment
        f.rowData = null;
        var gridesc = c.getEscrowgrid();
        var rec = gridesc.getSelectedRecord();
        var row = gridesc.getSelectionModel().getSelection();
        f.rowData = rec;
        if (c.browseHandler) {
            f.setLoading("Please wait");
            c.is_erems = 0;
            c.journalDetail.disableSave(c, true);
            c.formToMoney(f);
            me.loadEscrow(c, row);
            f.down("[name=kasbank_date]").setValue(c.dateNow);
            f.down("[name=payment_date]").setValue(c.dateNow);
            c.templateCoa = 4;

            //escrow payment template manual dulu detail journal coa nya manual
//            if (me.getIndexDetailAr(me) == '1') {
//                c.journalDetail.generateCoa(c, c.templateCoa, 'schedule');
//            }
            f.setLoading(false);
        }
        else {
            me.tools.alert.warning("Failed to get Escrow Schema, Please try select Escrow Schema again.");
        }
    },
    loadEscrow: function (c, row) {
        var me = this;
        var gridescrow = c.getDetailescrowgrid();
        var store = gridescrow.getStore();
        if (row) {
            store.add(row);
            store.commitChanges();
        }
    },
    getSelectedEscrow: function (c, callback) {
        var me = this;
        c.schedule_id = null;
        c.amountSelected = null;
        c.totalTemp = null;
        var sch = '';
        var amt = '';
        var total = 0;
        var kprid = '';
        var notes = '';
        var gridescrow = c.getDetailescrowgrid();
        var storeescrow = gridescrow.getStore();
        var f = c.getFormdata();
        storeescrow.each(function (rec) {
            notes += rec.get("description") + ",";
            sch += rec.get("schedule_id") + "~";
            kprid += rec.get("purchaseletter_pencairankpr_id") + "~";
            amt += parseFloat(rec.get("remaining_pay")) + "~";
            total += parseFloat(rec.get('remaining_pay'));
        });
        c.schedule_id = sch;
        c.amountSelected = amt;
        c.totalTemp = accounting.formatMoney(total);
        c.purchaseletter_pencairankpr_id = kprid;
        c.notes = 'KPR ESCROW ' + c.unit_number + ' - ' + notes;
        if (typeof callback === "function") {
            callback();
        }
    },
    loadModelEscrow: function (c) {
        var me = this;
        var gridesc = c.getDetailescrowgrid();
        gridesc.doInit();
        c.journalDetail.disableSave(c, true);
        gridesc.getStore().load({
            params: {
                kasbank_id: c.kasbank_id
            },
            callback: function (rec, op) {
                if (op) {
                    gridesc.attachModel(op);
                    c.is_erems = 0;
                    me.setSumDetailAR(c);
                    c.journalDetail.disableSave(c, false);
                } else {
                    console.log('error attach model AR-AP');
                }
            }
        });
    },
    paymentTextFieldOnBlur: function (c, el) {
        var me = this;
        var f = c.getFormdata();
        var grid = c.getDetailargrid();
//        if (f.editedRow > -1) { // just for add new record
//            return false;
//        }
        var pay = toFloat(grid.down("toolbar [name=paymentall]").getValue());

        var s = grid.getStore();
        var jt = s.getCount(); // jumlah tagihan
        var sisa = 0;
        var payValue = 0; /// nilai payment di grid
        var flagTry = false;
        var lastRow = -1;
        c.effectedSch = []; // reset list schedule id yang dibayar
        var totalDenda = 0;
        if (jt > 0) { /// jika ada nilai payment dan ada tagihan
            if (!c.tagihanDefaultValue) {
                s.rejectChanges();
                c.tagihanDefaultValue = [];
                for (var i = 0; i < jt; i++) {
                    var rp = c.xFormatFloat(s.getAt(i).get("remaining_pay")) > 0 ? c.xFormatFloat(s.getAt(i).get("remaining_pay")) : 0;
                    c.tagihanDefaultValue.push({
                        rb: c.xFormatFloat(s.getAt(i).get("remaining_balance")),
                        pay: 0,
                        denda: c.xFormatFloat(s.getAt(i).get("denda")),
                        remaining_denda: c.xFormatFloat(s.getAt(i).get("remaining_denda")),
                        id: c.tools.intval(s.getAt(i).get("schedule_id")),
                    });
                }
            } else {
                flagTry = true;
            }
            for (var i = 0; i < jt; i++) {
                var rec = s.getAt(i);
                var rb = flagTry ? c.tagihanDefaultValue[i]["rb"] : c.xFormatFloat(rec.get("remaining_balance"));
                payValue = 0;
                var payTagihan = 0;
                if (pay > 0) {
                    if (rb > pay) {
                        rb = rb - pay;
                        payValue = pay;
                        pay = 0;
                    } else {
                        payValue = rb;
                        pay = pay - rb;
                        rb = 0;
                    }
                    if (c.tools.floatval(c.tagihanDefaultValue[i]["rb"]) > 0) {
                        c.effectedSch.push(i);
                        lastRow = i;
                    }
                }
                var finalPay = c.tagihanDefaultValue[i]["pay"];
                var finalRb = c.tagihanDefaultValue[i]["rb"];
                var denda = 0;
                payValue = c.xFormatFloat(payValue);
                // update grid
                //if (payValue > 0 || (payValue == 0 && rb == 0)) {
                if (payValue > 0 || (payValue == 0 && rb == 0)) {
                    finalPay = payValue + c.tagihanDefaultValue[i]["pay"];
                    finalRb = rb;
                    //.denda = me.hitungDenda(payValue, rec, f.down("[name=cair_date]").getValue(), me.tagihanDefaultValue[i]["remaining_denda"])
                } else {
                    denda = c.tagihanDefaultValue[i]["remaining_denda"];
                }
                totalDenda += denda;

                rec.beginEdit();
                rec.set({
                    remaining_pay: finalPay,
                    final: finalRb,
                    denda: denda
                });
                rec.endEdit();
                rec = null;
            }
        }
        s = null;
        me.setSumDetailAR(c);
        c.isEdit = 1;
        if(rec) {
             s.commitChanges();
        }
    },
    addTagihanDefault: function (c, row) {
        if (c.tagihanDefaultValue) {
            c.tagihanDefaultValue.push({
                rb: c.xFormatFloat(row.get("remaining_balance")),
                pay: 0,
                denda: c.xFormatFloat(row.get("denda")),
                remaining_denda: c.xFormatFloat(row.get("remaining_denda")),
                id: c.tools.intval(row.get("schedule_id")),
            });
        }
    },
    checkCountAr: function (c) {
        var me = this;
        var grid = c.getDetailargrid();
        var count = grid.getStore().getCount();
        if (count > 1) {
            grid.down("toolbar [name=paymentall]").setDisabled(false);
        }
    }

});
