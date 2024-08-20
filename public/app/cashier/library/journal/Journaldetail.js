Ext.define('Cashier.library.journal.Journaldetail', {
    config: null,
    constructor: function (options) {
        Ext.apply(this, options || {});
    },
    savenewdetailcoa: function (c) {
        var me = this;
        //me.savedetailcoa(c, function(){
        //    setTimeout(function(){  me.formDataDetail(c, 'create'); }, 1000);
        //});
        setTimeout(function () { me.formDataDetail(c, 'create'); }, 1000);
    },
    savedetailcoa: function (c, cb) {
        
        /*
            CATATAN, return 0 akan menghapus store, sudah di handle di controller
        */
        var me = this;
        var f = c.getFormcoadetail();
        var fd = c.getFormdata();
        var is_mcf = fd.down("[name=is_memorialcashflow]").getValue();
        var amountd = parseInt(f.down("[name=amount]").getValue());
        var amountc = parseInt(f.down("[name=amountc]").getValue());

        if (amountd > amountc) {
            f.down("#radio1_acc").setValue(true);
            f.down("#radio2_acc").setValue(false);
        }

        if (amountd < amountc) {
            f.down("#radio1_acc").setValue(false);
            f.down("#radio2_acc").setValue(true);
        }
// TEST GIT


        var value = f.getForm().getValues();
        var g = c.getDetailjournalgrid();
        var store = g.getStore();
        var is_error = 0;
        var substore = c.getGridsubdetail().getStore();
        var total = f.down("[name=amount]").getValue();
        var kelsub = f.down("[name=kelsub_kelsub]").getValue();
        var kelsub_id_h = parseInt(f.down("[name=kelsub_kelsub_id]").getValue());
        var cashflow = f.down("[name=cashflowtype_cashflowtype_id]").getValue();
        var coa_id = f.down("[name=coa_coa_id]").getValue();
        var ptid = fd.down('[name=pt_pt_id]').getValue();
        var projectid = fd.down('[name=project_project_id]').getValue();
        var cashFlowData = f.down('[name=cashflowtype_cashflowtype_id]').getStore().data.length;

        total = accounting.unformat(total);

        if (f.getForm().isValid()) {

            value['amount'] = parseFloat(accounting.unformat(value['amount']));
            value['amountc'] = parseFloat(accounting.unformat(value['amountc']));

            var db = value['amount'];
            var cr = value['amountc'];

            if (is_mcf == true && cashFlowData > 0 && cashflow == null) {
                c.tools.alert.warning("Cashflow Should Be Filled.");
                return 0;
            }

            if (db > 0 && cr > 0) {
                c.tools.alert.warning("One of Debet/Credit must be 0.");
                return 0;
            } else {

            }

            if (kelsub !== "") {
                if (substore.getCount() <= 0) {
                    c.tools.alert.warning("Please input Subdetail.");
                    return 0;
                } else {
                    //cek jika kelsub berbeda dengan coa
                    substore.each(function (rec) {
                        var kelsub_id = parseInt(rec.get('kelsub_kelsub_id'));

                        if (kelsub_id !== kelsub_id_h) {
                            c.tools.alert.warning("Detail Sub is Different. Please use Kelsub " + kelsub);
                            is_error = 1;
                            return 0;
                        }

                    });
                    //masukkan ke detail - request user REMIS
                    console.log(cashFlowData);
                    console.log(coa_id);
                    var loop = 1;
                    substore.each(function (rec) {
                        var kelsub_id = parseInt(rec.get('kelsub_kelsub_id'));
                        if (kelsub_id == kelsub_id_h && loop == 1) {
                            value.subgl_code = rec.get('subgl_code');
                            value.subgl_subgl_id = parseInt(rec.get('subgl_id'));
                            value.journaldetail_coa_coa_id = coa_id;
                            value.journaldetail_cashflowtype_id = cashFlowData;
                            loop = 0;
                        }
                    });
                    console.log("--------------------");
                    console.log(value.subgl_subgl_id);
                }

            }

            if (is_error == 1) {
                return 0;
            }

            if (db > 0 || cr > 0) {
                if (f.kosongGa > -1) {
                    var rec = store.getAt(f.kosongGa);
                    value.voucherdetail_id = rec.internalId;
                    //console.log(value);
                    rec.beginEdit();
                    rec.set(value);
                    rec.endEdit();
                    //store.commitChanges();
                }
                else {
                    var temp = store.findExact('indexdata', value.indexdata);
                    var rec = store.getAt(temp);
                    value.subgl_description = value.kelsub_kelsub;
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
                
                var sb = c.localStore.subdetailcoa;
                
                console.log(sb);

                if (typeof sb == "undefined") {
                    var gsstore = c.getGridsubdetail().getStore();
                    if (typeof gsstore == "undefined") {
                        alert("Undefined sub. please report this bug");
                        return 0;
                    }
                    c.localStore.subdetailcoa = gsstore;
                    sb = c.localStore.subdetailcoa;
                    if (typeof sb == "undefined") {
                        alert("Undefined sub. please report this bug");
                        return 0;
                    }
                }

                substore.clearFilter(true);

                substore.each(function (rec) {
                    //if (!rec.get("journalsubdetail_id")) {
                    //console.log(rec);
                    sb.add(rec);
                    //}
                });

                //idk what is this for
                //c.localStore.subdetailcoa = c.getGridsubdetail().getStore();

                var count = substore.getCount();
                //if (count === 0) {
                //    me.clearTempStorebyIndexdata(c, rec.get("indexdata"));
                //}
                c.sumCount = count + c.sumCount;
                me.checkDeletedSubTempCoa(c);

                me.sumDetail(c);
                f.up('window').close();

                /*
                if(c.ok==1){
                    me.formDataDetail(c, 'create');
                }
                */
                if (typeof cb === 'function') {
                    cb();
                    //setTimeout(function(){ cb(); }, 0);
                }
                console.log('-----CEK SB-----');
                console.log(sb);

                return sb;
            }
            else {
                c.tools.alert.warning("Amount cannot be empty.");
                return 0;
            }
        }
    },

    directsavedetailcoa: function (c, cb) {

        /*
            CATATAN, return 0 akan menghapus store, sudah di handle di controller
        */

        var me = this;
        var f = c.getFormcoadetail();
        var fm = c.getFormdata();
        var value = f.getForm().getValues();
        var g = c.getDetailjournalgrid();
        var store = g.getStore();
        var substore = c.getGridsubdetail().getStore();
        var total = f.down("[name=amount]").getValue();
        var kelsub = f.down("[name=kelsub_kelsub]").getValue();
        value['project_id'] = c.project_id;
        value['pt_id'] = c.pt_id;
        value['journal_id'] = c.kasbank_id;

        total = accounting.unformat(total);

        if (f.getForm().isValid()) {

            value['amount'] = parseFloat(accounting.unformat(value['amount']));
            value['amountc'] = parseFloat(accounting.unformat(value['amountc']));

            var db = value['amount'];
            var cr = value['amountc'];

            if (db > 0 && cr > 0) {
                c.tools.alert.warning("One of Debet/Credit must be 0.");
                return 0;
            } else {

            }

            if (cr > 0) {
                value.type_acc = 'C';
                value.amount = cr;
            } else {
                value.type_acc = 'D';
                value.amount = db;
            }

            if (kelsub !== "") {
                if (substore.getCount() <= 0) {
                    c.tools.alert.warning("Please input Subdetail.");
                    return 0;
                }
            }

            if (db > 0 || cr > 0) {
                if (f.kosongGa > -1) {
                    var rec = store.getAt(f.kosongGa);
                    value.voucherdetail_id = rec.internalId;
                    //console.log(value);
                    me.ajaxDirectsavedetailcoa(c, value);
                    rec.beginEdit();
                    rec.set(value);
                    rec.endEdit();
                    //store.commitChanges();
                }
                else {
                    var temp = store.findExact('indexdata', value.indexdata);
                    var rec = store.getAt(temp);
                    value.subgl_description = value.kelsub_kelsub;
                    if (rec) {
                        me.ajaxDirectsavedetailcoa(c, value);
                        rec.beginEdit();
                        rec.set(value);
                        rec.endEdit();
                        store.commitChanges();
                    } else {
                        me.ajaxDirectsavedetailcoa(c, value);
                        store.add(value);
                        store.commitChanges();
                    }
                }
            }
            else {
                c.tools.alert.warning("Amount cannot be empty.");
                return 0;
            }
        }
    },
    ajaxDirectsavedetailcoa: function (c, value) {
        var me, p = '';
        me = this;
        p = me.pglobal;
        var f = c.getFormcoadetail();
        var fm = c.getFormdata();
        var g = c.getDetailjournalgrid();

        //directsave

        if (c.kasbankdetail_id > 0) {
            value.voucherdetail_id = c.kasbankdetail_id;
        }

        Ext.Ajax.request({
            url: 'cashier/journal/create',
            method: 'POST',
            params: {
                data: Ext.encode({
                    "data": value,
                    "project_id": me.project_id,
                    "hideparam": 'directsavedetail',
                })
            },
            success: function (response) {

                var res = response;

                if (res.responseText == '[1]') {
                    Ext.Msg.show({
                        title: 'Success',
                        msg: 'Data Tersimpan',
                        icon: Ext.Msg.INFO,
                        buttons: Ext.Msg.OK
                    });
                } else {
                    Ext.Msg.show({
                        title: 'Error',
                        msg: 'Gagal Tersimpan',
                        icon: Ext.Msg.ERROR,
                        buttons: Ext.Msg.OK
                    });
                }


                f.up('window').close();
                g.getStore().reload();
                me.ajaxSumdebetcredit(c);

            },
            failure: function (response) {
            }
        });
    },
    ajaxDirectreservedetailcoa: function (c, value) {
        var me, p = '';
        me = this;
        p = me.pglobal;
        var f = c.getFormcoadetail();
        var fm = c.getFormdata();
        var g = c.getDetailjournalgrid();

        //directsave

        Ext.Ajax.request({
            url: 'cashier/journal/create',
            method: 'POST',
            params: {
                data: Ext.encode({
                    "data": value,
                    "project_id": me.project_id,
                    "hideparam": 'directreservedetail',
                })
            },
            success: function (response) {

                var res = response;
                var obj = JSON.parse(res.responseText);
                obj = obj[0][0];

                //KETIKA SUDAH RESERVE MAKA SUDAH DAPAT journaldetail_id
                if (obj.journaldetail_id > 0) {
                    c.kasbankdetail_id = obj.journaldetail_id;
                }

            },
            failure: function (response) {
            }
        });
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
        var fd = c.getFormdata();
        var f = c.getFormcoadetail();
        var state = f.up("window").state;
        c.kasbankdetail_id = 0;
        var pt = fd.down("[name=pt_pt_id]").getValue();
        var project = c.project_id;

        var paging_mode = c.paging_mode;

        if (state == 'create') {
            f.down('[name=coa_coa_id]').focus();
        }

        if (paging_mode == 1) {
            f.down('button[action=directsave]').setVisible(true);
            f.down('button[action=cancel]').setVisible(false);
            f.down('button[action=save]').setVisible(false);
            f.down('button[action=savenew]').setVisible(false);
        } else {
            f.down('button[action=directsave]').setVisible(false);
        }

        me.loadModelSubCoaDetail(c, function () {
            //   console.log('2');
        });
        c.getCustomRequestCombobox('coa', project, pt, '', 'coa_coa_id', 'coa', ['kelsub'], f, param);

        var gridCoaDetail = c.getDetailjournalgrid();
        var records = gridCoaDetail.getSelectionModel().getSelection();

        if (records.length > 0) {
            var coaId = records[0]["data"]["coa_coa_id"];
            var cashflowtype_id = records[0]["data"]["cashflowtype_id"];
            var subgl_id = records[0]["data"]["subgl_subgl_id"];
            var kelsub_id = records[0]["data"]["kelsub_kelsub_id"];
            var subgl_subgl_id = records[0]["data"]["subgl_subgl_id"];
            var kelsub_description = records[0]["data"]["kelsub_description"];
            var amount = records[0]["data"]["amount"];
            var amountc = records[0]["data"]["amountc"];
        } else {
            var amount = 0;
            var amountc = 0;
        }

        c.cashflowtype_id = cashflowtype_id;
        //me.getCashflow(c, coaId);

        if (parseFloat(amountc) > 0) {
            f.down("#radio1_acc").setValue(false);
            f.down("#radio2_acc").setValue(true);
        } else if (parseInt(amount) > 0) {
            f.down("#radio1_acc").setValue(true);
            f.down("#radio2_acc").setValue(false);
        }

        if (kelsub_id > 0) {
            f.down("[name=subgl_description]").setVisible(false);
            f.down('label[id=affiliasiNameId]').setVisible(false);
            f.down("[name=browseUnitsub]").setVisible(false);
            f.down('label[id=affiliasiNameId]').setText(kelsub_description);
            //f.down('label[id=affiliasiNameId]').setText(selectedKelsubDesc + ':');
            c.kelsub_id = kelsub_id;
            c.subgl_id = subgl_id;
            
            me.getSubgl(c);
        } else {
            f.down("[name=amount]").setVisible(true);
            f.down("[name=amountc]").setVisible(true);
            f.down("[name=amount]").setReadOnly(false);
            f.down("[name=amountc]").setReadOnly(false);
        }

        if (c.is_closed == 1) {
            f.down('[action=save]').setDisabled(true);
            f.down('[action=savenew]').setDisabled(true);
            f.down('[action=directsave]').setDisabled(true);
        }


        var fr = c.getFormdata();

        var is_memorialcashflow = fr.down("[name=is_memorialcashflow]").getValue();
        if (is_memorialcashflow == false) {
            f.down("[name=cashflow]").hide();
            f.down("[name=cashflowtype_cashflowtype_id]").hide();
        }

        //set default value
        if (c.currentType == 'C') {
            f.down("[name=amountc]").setValue(c.currentVal);
            f.down("[name=amount]").setValue(0);
        } else if (c.currentType == 'D') {
            f.down("[name=amount]").setValue(c.currentVal);
            f.down("[name=amountc]").setValue(0);
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
    /*
    getindexdetailcoa: function (c) {
        var me = this;
        var hasil = 0;
        var gridcoadetail = c.getDetailjournalgrid();
        var fa = c.getFormdata();
        gridcoadetail.getView().refresh();
        var count = gridcoadetail.getStore().getCount();
        hasil = count + 1 + fa.deletedRowsWithoutID;
        return hasil;
    },
    */
    getindexdetailcoa: function (c) {
        var me = this;
        var hasil = 0;
        var indexs = [0];
        var gridcoadetail = c.getDetailjournalgrid();
        var store = gridcoadetail.getStore();
        store.each(function (rec) {
            indexs.push(rec.get('indexdata'));
        });
        var max_of_index = Math.max.apply(Math, indexs);
        //var count = gridcoadetail.getStore().getCount();
        hasil = max_of_index + 1;
        return hasil;
    },
    loadModelSubCoaDetail: function (c, callbackFunc) {
        var me = this;
        var gridCoaDetail = c.getGridsubdetail();
        var paging_mode = c.paging_mode;
        gridCoaDetail.getStore().clearFilter(true);
        gridCoaDetail.doInit();

        //jangan edit jika closing
        if (c.is_closed == 1) {
            gridCoaDetail.down("[action=create]").setVisible(false);
            gridCoaDetail.down("[action=update]").setVisible(false);
            gridCoaDetail.down("[action=destroy]").setVisible(false);
        }

        if (paging_mode == 1) {
            gridCoaDetail.getStore().proxy.extraParams = {
                "paging_mode": paging_mode,
                "journaldetail_id": c.kasbankdetail_id,
                "mode_read": "subdetailcoa",
                "module": "journal"
            }
        }

        gridCoaDetail.getStore().load({
            params: {
                paging_mode: paging_mode,
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
    ajaxDirectdeletesubdetailcoa: function (c, value) {
        var me, p = '';
        me = this;
        p = me.pglobal;
        var f = c.getFormsubcoadetail();
        var fm = c.getFormcoadetail();
        var g = c.getGridsubdetail();

        //directsave

        Ext.Ajax.request({
            url: 'cashier/journal/create',
            method: 'POST',
            params: {
                data: Ext.encode({
                    "data": value,
                    "project_id": me.project_id,
                    "hideparam": 'directdeletesubdetail',
                })
            },
            success: function (response) {

                var res = response;

                if (res.responseText == '[1]') {
                    Ext.Msg.show({
                        title: 'Success',
                        msg: 'Data Dihapus',
                        icon: Ext.Msg.INFO,
                        buttons: Ext.Msg.OK
                    });
                } else {
                    Ext.Msg.show({
                        title: 'Error',
                        msg: 'Gagal Dihapus',
                        icon: Ext.Msg.ERROR,
                        buttons: Ext.Msg.OK
                    });
                }

                g.getStore().reload();
                me.ajaxSumdetailfromsub(c);


            },
            failure: function (response) {
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
        var paging_mode = c.paging_mode;


        if (paging_mode == 1) {

            Ext.MessageBox.confirm('Delete Data', 'Hapus Data Sub?', function (btn) {
                if (btn == 'yes') {
                    for (var i = records.length - 1; i >= 0; i--) {
                        var row = g.getStore().indexOf(records[i]);
                        var id = records[i]['data']["journalsubdetail_id"];
                        me.ajaxDirectdeletesubdetailcoa(c, records[i]['data']);
                        if (id) {
                            fa.deletedsubRows.push(id);
                        }
                        fa.deletedLocalstoreSubRows.push(records[i].get("indexsubdata"));
                        g.getStore().removeAt(row);
                        c.journalAr.setSumDetailAR(c);
                    }
                };
            });


        } else {

            for (var i = records.length - 1; i >= 0; i--) {
                var row = g.getStore().indexOf(records[i]);
                var id = records[i]['data']["journalsubdetail_id"];
                if (id) {
                    fa.deletedsubRows.push(id);
                }
                fa.deletedLocalstoreSubRows.push(records[i].get("indexsubdata"));
                g.getStore().removeAt(row);
                c.journalAr.setSumDetailAR(c);

                //delete temp
                me.checkDeletedSubTempCoa(c);

                var type = f.down("[name=type_acc]").getValue();
                if (type === true) {
                    f.down("[name=amount]").setValue(accounting.formatMoney(c.sumAmountStore(g.getStore())));
                    f.down("[name=amountc]").setValue(0);
                } else {
                    f.down("[name=amountc]").setValue(accounting.formatMoney(c.sumAmountStore(g.getStore())));
                    f.down("[name=amount]").setValue(0);
                }
            }
        }

    },
    destroysubdetail2: function (c) {
        var me = this;
        var f = c.getFormcoadetail();
        var fa = c.getFormdata();
        var g = c.getGridsubdetail();
        var tempstoresub = c.localStore.subdetailcoa;
        var records2 = g.getSelectionModel().selectAll(true);
        var records = g.getSelectionModel().getSelection();
        
        var paging_mode = c.paging_mode;


        if (paging_mode == 1) {

            Ext.MessageBox.confirm('Delete Data', 'Hapus Data Sub?', function (btn) {
                if (btn == 'yes') {
                    for (var i = records.length - 1; i >= 0; i--) {
                        var row = g.getStore().indexOf(records[i]);
                        var id = records[i]['data']["journalsubdetail_id"];
                        me.ajaxDirectdeletesubdetailcoa(c, records[i]['data']);
                        if (id) {
                            fa.deletedsubRows.push(id);
                        }
                        fa.deletedLocalstoreSubRows.push(records[i].get("indexsubdata"));
                        g.getStore().removeAt(row);
                        c.journalAr.setSumDetailAR(c);
                    }
                };
            });


        } else {

            for (var i = records.length - 1; i >= 0; i--) {
                var row = g.getStore().indexOf(records[i]);
                var id = records[i]['data']["journalsubdetail_id"];
                if (id) {
                    fa.deletedsubRows.push(id);
                }
                fa.deletedLocalstoreSubRows.push(records[i].get("indexsubdata"));
                g.getStore().removeAt(row);
                c.journalAr.setSumDetailAR(c);

                //delete temp
                me.checkDeletedSubTempCoa(c);

                var type = f.down("[name=type_acc]").getValue();
                if (type === true) {
                    f.down("[name=amount]").setValue(accounting.formatMoney(c.sumAmountStore(g.getStore())));
                    f.down("[name=amountc]").setValue(0);
                } else {
                    f.down("[name=amountc]").setValue(accounting.formatMoney(c.sumAmountStore(g.getStore())));
                    f.down("[name=amount]").setValue(0);
                }
            }
        }

    },
    // subglChange: function (c) {
    //     var me = this;
    //     var f = c.getFormsubcoadetail();
        
    //     var subgl_id = c.tools.comboHelper(f.down("[name=subgl_subgl_id]")).getField('subgl_id', 'subgl_id');
    //     var code = c.tools.comboHelper(f.down("[name=subgl_subgl_id]")).getField('subgl_id', 'code');
    //     var code1 = c.tools.comboHelper(f.down("[name=subgl_subgl_id]")).getField('subgl_id', 'code1');
    //     var code2 = c.tools.comboHelper(f.down("[name=subgl_subgl_id]")).getField('subgl_id', 'code2');
    //     var code3 = c.tools.comboHelper(f.down("[name=subgl_subgl_id]")).getField('subgl_id', 'code3');
    //     var code4 = c.tools.comboHelper(f.down("[name=subgl_subgl_id]")).getField('subgl_id', 'code4');
    //     var description = c.tools.comboHelper(f.down("[name=subgl_subgl_id]")).getField('subgl_id', 'description');

        

    //     f.down("[name=subgl_id]").setValue(subgl_id);
    //     f.down("[name=subgl_code]").setValue(code);
    //     f.down("[name=subgl_code1]").setValue(code1);
    //     f.down("[name=subgl_code2]").setValue(code2);
    //     f.down("[name=subgl_code3]").setValue(code3);
    //     f.down("[name=subgl_description]").setValue(description);
    // },

    ajaxDirectdeletedetailcoa: function (c, value) {
        var me, p = '';
        me = this;
        p = me.pglobal;
        var f = c.getFormsubcoadetail();
        var fm = c.getFormcoadetail();
        var g = c.getDetailjournalgrid();

        //directsave

        Ext.Ajax.request({
            url: 'cashier/journal/create',
            method: 'POST',
            params: {
                data: Ext.encode({
                    "data": value,
                    "project_id": me.project_id,
                    "hideparam": 'directdeletedetail',
                })
            },
            success: function (response) {

                var res = response;

                if (res.responseText == '[1]') {
                    Ext.Msg.show({
                        title: 'Success',
                        msg: 'Data Dihapus',
                        icon: Ext.Msg.INFO,
                        buttons: Ext.Msg.OK
                    });
                } else {
                    Ext.Msg.show({
                        title: 'Error',
                        msg: 'Gagal Dihapus',
                        icon: Ext.Msg.ERROR,
                        buttons: Ext.Msg.OK
                    });
                }

                g.getStore().reload();
                me.ajaxSumdebetcredit(c);


            },
            failure: function (response) {
            }
        });
    },

    destroydetail: function (c) {
        var me = this;
        var f = c.getFormcoadetail();
        var fa = c.getFormdata();
        var g = c.getDetailjournalgrid();
        var tempstoresub = c.localStore.subdetailcoa;
        var records = g.getSelectionModel().getSelection();

        var paging_mode = c.paging_mode; //DIRECT
        if (paging_mode == 1) {
            Ext.MessageBox.confirm('Delete Data', 'Hapus Data ?', function (btn) {
                if (btn == 'yes') {
                    for (var i = records.length - 1; i >= 0; i--) {
                        var row = g.getStore().indexOf(records[i]);
                        var id = records[i]['data']["journaldetail_id"];
                        if (id) {
                            fa.deletedRows.push(id);
                        } else {
                            fa.deletedRowsWithoutID = fa.deletedRowsWithoutID + 1;
                        }
                        tempstoresub.removeAt(tempstoresub.find('journaldetail_indexdata', records[i]['data']["indexdata"]));
                        g.getStore().removeAt(row);
                        me.ajaxDirectdeletedetailcoa(c, records[i]['data']);
                    }
                    g.getView().refresh();
                    me.sumDetail(c);
                };
            });
        } else {
            for (var i = records.length - 1; i >= 0; i--) {
                var row = g.getStore().indexOf(records[i]);
                var id = records[i]['data']["journaldetail_id"];
                if (id) {
                    fa.deletedRows.push(id);
                } else {
                    fa.deletedRowsWithoutID = fa.deletedRowsWithoutID + 1;
                }
                tempstoresub.removeAt(tempstoresub.find('journaldetail_indexdata', records[i]['data']["indexdata"]));
                g.getStore().removeAt(row);
            }
            g.getView().refresh();
            me.sumDetail(c);
        }

    },
    savesubdetailcoa: function (c) {
        var me = this;
        var f = c.getFormsubcoadetail();
        console.log(f);
        var fa = c.getFormcoadetail();
        var value = f.getForm().getValues();
        var g = c.getGridsubdetail();
        var store = g.getStore();
        value.subgl_subgl_id = value.subgl_id;

        var db = fa.down("#radio1_acc").getValue();
        var cr = fa.down("#radio2_acc").getValue();

        //manual validation
        if (f.down("[name=journaldetail_indexdata]").getValue() == "") {
            c.tools.alert.warning("Invalid Index");
            return 0;
        }
        if (f.down("[name=subgl_subgl_id]").getValue() == "") {
            c.tools.alert.warning("Invalid Sub");
            return 0;
        }
        if (f.down("[name=subgl_subgl_id]").getValue() == null) {
            c.tools.alert.warning("Invalid Sub");
            return 0;
        }
        if (f.down("[name=amount]").getValue() <= 0) {
            c.tools.alert.warning("Invalid Amount");
            return 0;
        }
        if (true) {
            if (f.kosongGa > -1) {
                var rec = store.getAt(f.kosongGa);
                rec.beginEdit();
                rec.set(value);
                rec.endEdit();
            } else {
                store.add(value);

            }
            c.journalAr.setSumDetailAR(c);

            if (db == true && cr == false) {
                fa.down("[name=amount]").setValue(accounting.formatMoney(c.sumAmountStore(store)));
                fa.down("[name=amountc]").setValue(0);
                fa.down("[name=amount]").setReadOnly(true);
                fa.down("[name=amountc]").setReadOnly(true);
            }
            if (cr == true && db == false) {
                fa.down("[name=amountc]").setValue(accounting.formatMoney(c.sumAmountStore(store)));
                fa.down("[name=amount]").setValue(0);
                fa.down("[name=amount]").setReadOnly(true);
                fa.down("[name=amountc]").setReadOnly(true);
            }

            f.up('window').close();
        }
    },
    directsavesubdetailcoa: function (c) {
        var me = this;
        var f = c.getFormsubcoadetail();
        var fa = c.getFormcoadetail();
        var value = f.getForm().getValues();
        var valuedetail = fa.getForm().getValues();
        var g = c.getGridsubdetail();
        var store = g.getStore();

        var db = fa.down("#radio1_acc").getValue();
        var cr = fa.down("#radio2_acc").getValue();

        //manual validation
        if (f.down("[name=journaldetail_indexdata]").getValue() == "") {
            c.tools.alert.warning("Invalid Index");
            return 0;
        }
        if (f.down("[name=subgl_subgl_id]").getValue() == "") {
            c.tools.alert.warning("Invalid Sub");
            return 0;
        }
        if (f.down("[name=subgl_subgl_id]").getValue() == null) {
            c.tools.alert.warning("Invalid Sub");
            return 0;
        }
        if (f.down("[name=amount]").getValue() <= 0) {
            c.tools.alert.warning("Invalid Amount");
            return 0;
        }

        if (value.journaldetail_id == '') {
            value.journaldetail_id = c.kasbankdetail_id;
            value.journaldetail_journaldetail_id = c.kasbankdetail_id;
        }


        if (true) {
            if (f.kosongGa > -1) {
                me.ajaxDirectsavesubdetailcoa(c, value);
                var rec = store.getAt(f.kosongGa);
                rec.beginEdit();
                rec.set(value);
                rec.endEdit();
            } else {
                me.ajaxDirectsavesubdetailcoa(c, value);
                store.add(value);
                store.commitChanges();
            }
            c.journalAr.setSumDetailAR(c);

            if (db == true && cr == false) {
                fa.down("[name=amount]").setValue(accounting.formatMoney(c.sumAmountStore(store)));
                fa.down("[name=amountc]").setValue(0);
                fa.down("[name=amount]").setReadOnly(true);
                fa.down("[name=amountc]").setReadOnly(true);
            }
            if (cr == true && db == false) {
                fa.down("[name=amountc]").setValue(accounting.formatMoney(c.sumAmountStore(store)));
                fa.down("[name=amount]").setValue(0);
                fa.down("[name=amount]").setReadOnly(true);
                fa.down("[name=amountc]").setReadOnly(true);
            }

            f.up('window').close();
        }
    },
    ajaxDirectsavesubdetailcoa: function (c, value) {
        var me, p = '';
        me = this;
        p = me.pglobal;
        var f = c.getFormsubcoadetail();
        var fm = c.getFormcoadetail();
        var g = c.getGridsubdetail();

        //directsave

        value['project_id'] = c.project_id;
        value['pt_id'] = c.pt_id;

        Ext.Ajax.request({
            url: 'cashier/journal/create',
            method: 'POST',
            params: {
                data: Ext.encode({
                    "data": value,
                    "project_id": me.project_id,
                    "hideparam": 'directsavesubdetail',
                })
            },
            success: function (response) {

                var res = response;

                if (res.responseText == '[1]') {
                    Ext.Msg.show({
                        title: 'Success',
                        msg: 'Data Tersimpan',
                        icon: Ext.Msg.INFO,
                        buttons: Ext.Msg.OK
                    });
                } else {
                    Ext.Msg.show({
                        title: 'Error',
                        msg: 'Gagal Tersimpan',
                        icon: Ext.Msg.ERROR,
                        buttons: Ext.Msg.OK
                    });
                }

                g.getStore().load({
                    params: {
                        "paging_mode": c.paging_mode,
                        "journaldetail_id": c.kasbankdetail_id,
                        "mode_read": "subdetailcoa",
                        "module": "journal"
                    },
                    callback: function (rec, op) {
                    }
                });

                me.ajaxSumdetailfromsub(c);


            },
            failure: function (response) {
            }
        });
    },
    coaChange: function (c) {
        var me = this;
        c.kelsub_id = 0;
        var f = c.getFormcoadetail();
        var fd = c.getFormdata();
        var state = f.up("window").state;
        //console.log(state);
        var row = f.getForm().getValues();
        var gridcoadetail = c.getDetailjournalgrid();
        // var rec = c.getDetailjournalgrid().getSelectedRecord();
        //var kelsub_id_old = rec.data.kelsub_kelsub_id;
        var gridcoadetailstore = gridcoadetail.getStore();
        var gridsub = c.getGridsubdetail();

        var storesub = gridsub.getStore();
        var io = f.down("[name=indexdata]").getValue();
        var is_mcf = fd.down("[name=is_memorialcashflow]").getValue();

        //gridcoadetailstore.removeAt(gridcoadetailstore.find('indexdata', io));
        //gridcoadetailstore.add(row);

        var selected = c.tools.comboHelper(f.down("[name=coa_coa_id]")).getField('coa_id', 'coa');
        var selectedName = c.tools.comboHelper(f.down("[name=coa_coa_id]")).getField('coa_id', 'name');
        var selectedType = c.tools.comboHelper(f.down("[name=coa_coa_id]")).getField('coa_id', 'type');
        var selectedKelsubId = c.tools.comboHelper(f.down("[name=coa_coa_id]")).getField('coa_id', 'kelsub_kelsub_id');
        var selectedKelsub = c.tools.comboHelper(f.down("[name=coa_coa_id]")).getField('coa_id', 'kelsub_kelsub');
        var selectedKelsubDesc = c.tools.comboHelper(f.down("[name=coa_coa_id]")).getField('coa_id', 'kelsub_description');
        var coaId = f.down("[name=coa_coa_id]").getValue();
        var coaRaw = f.down("[name=coa_coa_id]").getRawValue();
        var ptid = fd.down('[name=pt_pt_id]').getValue();
        var projectid = fd.down('[name=project_project_id]').getValue();
        var c_id = 0;

        f.down("[name=coa_name]").setValue(selectedName);
        f.down("[name=coa_coa]").setValue(selected);
        f.down("[name=kelsub_kelsub]").setValue(selectedKelsub);
        f.down("[name=kelsub_description]").setValue(selectedKelsubDesc);
        f.down("[name=kelsub_kelsub_id]").setValue(selectedKelsubId);
        f.down("[name=subgl_subgl_id]").setValue(null);
        f.down("[name=subgl_description]").setValue(selectedKelsub);
        // me.getCashflow(c, coaId);

        Ext.Ajax.request({
            url: 'cashier/common/read',
            method: 'POST',
            // async: false,
            timeout: 100000000,
            params: {
                hideparam: 'getcoainsetupcashflow',
                project_id: projectid,
                pt_id: ptid,
                coa_id: coaId,
                start: 0,
                limit: 1000,
            },
            success: function (response) {

                response = Ext.JSON.decode(response.responseText);
                if (is_mcf == true) {
                    if (response.data != null) {
                        f.setLoading('Please wait');
                        c_id = response.data[0].cashflowtype_id;
                        me.gotocashflow(c, coaId, is_mcf, c_id);

                    } else {

                        var cashFlow = Ext.JSON.decode(me.getAllCashflowType(projectid, ptid));
                        if (cashFlow.data != null) {
                            f.setLoading('Please wait');
                            c_id = 'XXX';
                            me.gotocashflow(c, coaId, is_mcf, c_id);
                        } else {
                            f.setLoading('Please wait');
                            c_id = 0;
                            me.gotocashflow(c, coaId, is_mcf, c_id);
                        }
                    }



                }



            }
        });
        if (coaRaw != '') {

            if (selectedKelsubId) {
                if (state == 'create') {

                    //f.down("[name=subgl_subgl_id]").setVisible(true);
                    gridsub.down("[action=create]").setDisabled(false);
                    f.down('label[id=affiliasiNameId]').setVisible(false);
                    //f.down('[name=subgl_description]').setVisible(true);
                    //f.down('[name=browseUnitsub]').setVisible(true);
                    //f.down('label[id=affiliasiNameId]').setText(selectedKelsubDesc + ':');
                    c.kelsub_id = selectedKelsubId;
                    var indexdata = f.down("[name=indexdata]").getValue();
                    me.getSubgl(c);

                    gridsub.setVisible(true);

                    var b = f.up("panel").getWidth();
                    var cm = f.up("panel").getHeight();
                    var x = b / 2;
                    var y = cm / 2;

                    //f.up("panel").setHeight(500);

                    f.down("[name=amount]").setReadOnly(true);
                    f.down("[name=amountc]").setReadOnly(true);

                    //RESERVE JOURNAL DETAIL ID
                    //jika directsave dan mode create langsung reserve journal detail ID

                    var paging_mode = c.paging_mode;

                    if (paging_mode == 1 && c.kasbankdetail_id == 0) {

                        var value = f.getForm().getValues();
                        value['project_id'] = c.project_id;
                        value['pt_id'] = c.pt_id;
                        value['journal_id'] = c.kasbank_id;
                        value['type_acc'] = c.kasbank_id;

                        var db = value['amount'];
                        var cr = value['amountc'];

                        if (cr > 0) {
                            value.type_acc = 'C';
                        } else {
                            value.type_acc = 'D';
                        }

                        me.ajaxDirectreservedetailcoa(c, value);

                    }




                } else { // if update 
                    var substore = c.getGridsubdetail().getStore();
                    var countsubstore = substore.getCount();
                    if (countsubstore == 0) { // if from empty sub to sub exist

                        gridsub.down("[action=create]").setDisabled(false);
                        f.down('label[id=affiliasiNameId]').setVisible(false);
                        c.kelsub_id = selectedKelsubId;
                        var indexdata = f.down("[name=indexdata]").getValue();
                        me.getSubgl(c);

                        gridsub.setVisible(true);

                        var b = f.up("panel").getWidth();
                        var cm = f.up("panel").getHeight();
                        var x = b / 2;
                        var y = cm / 2;

                        //f.up("panel").setHeight(500);

                        f.down("[name=amount]").setReadOnly(true);
                        f.down("[name=amountc]").setReadOnly(true);

                        //RESERVE JOURNAL DETAIL ID
                        //jika directsave dan mode create langsung reserve journal detail ID

                        var paging_mode = c.paging_mode;

                        if (paging_mode == 1 && c.kasbankdetail_id == 0) {

                            var value = f.getForm().getValues();
                            value['project_id'] = c.project_id;
                            value['pt_id'] = c.pt_id;
                            value['journal_id'] = c.kasbank_id;
                            value['type_acc'] = c.kasbank_id;

                            var db = value['amount'];
                            var cr = value['amountc'];

                            if (cr > 0) {
                                value.type_acc = 'C';
                            } else {
                                value.type_acc = 'D';
                            }

                            me.ajaxDirectreservedetailcoa(c, value);

                        }
                    } else { //if from exist sub to exist sub

                        substore.each(function (rec) {
                            var kelsub_id = parseInt(rec.get('kelsub_kelsub_id'));
                            if (kelsub_id !== selectedKelsubId) {
                                c.getGridsubdetail().getSelectionModel().selectAll();
                                Ext.MessageBox.show({
                                    title: 'Warning',
                                    msg: "New COA Has Different Sub Account Group With Previous COA.<br/> Delete Sub Account?",
                                    buttons: Ext.MessageBox.YESNO,
                                    fn: function (btn) {
                                        if (btn == 'yes') {

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

                                                //delete temp
                                                me.checkDeletedSubTempCoa(c);

                                                var type = f.down("[name=type_acc]").getValue();
                                                if (type === true) {
                                                    f.down("[name=amount]").setValue(accounting.formatMoney(c.sumAmountStore(g.getStore())));
                                                    f.down("[name=amountc]").setValue(0);
                                                } else {
                                                    f.down("[name=amountc]").setValue(accounting.formatMoney(c.sumAmountStore(g.getStore())));
                                                    f.down("[name=amount]").setValue(0);
                                                }
                                            }

                                        } else {
                                            //f.down("[name=subgl_subgl_id]").setVisible(true);
                                            gridsub.down("[action=create]").setDisabled(false);
                                            f.down('label[id=affiliasiNameId]').setVisible(false);
                                            //f.down('[name=subgl_description]').setVisible(true);
                                            //f.down('[name=browseUnitsub]').setVisible(true);
                                            //f.down('label[id=affiliasiNameId]').setText(selectedKelsubDesc + ':');
                                            c.kelsub_id = selectedKelsubId;
                                            var indexdata = f.down("[name=indexdata]").getValue();
                                            me.getSubgl(c);

                                            gridsub.setVisible(true);

                                            var b = f.up("panel").getWidth();
                                            var cm = f.up("panel").getHeight();
                                            var x = b / 2;
                                            var y = cm / 2;

                                            //f.up("panel").setHeight(500);

                                            f.down("[name=amount]").setReadOnly(true);
                                            f.down("[name=amountc]").setReadOnly(true);

                                            //RESERVE JOURNAL DETAIL ID
                                            //jika directsave dan mode create langsung reserve journal detail ID

                                            var paging_mode = c.paging_mode;

                                            if (paging_mode == 1 && c.kasbankdetail_id == 0) {

                                                var value = f.getForm().getValues();
                                                value['project_id'] = c.project_id;
                                                value['pt_id'] = c.pt_id;
                                                value['journal_id'] = c.kasbank_id;
                                                value['type_acc'] = c.kasbank_id;

                                                var db = value['amount'];
                                                var cr = value['amountc'];

                                                if (cr > 0) {
                                                    value.type_acc = 'C';
                                                } else {
                                                    value.type_acc = 'D';
                                                }

                                                me.ajaxDirectreservedetailcoa(c, value);

                                            }
                                        }
                                    }
                                });

                            }
                        });
                    }


                }



                //me.restoreTempToSubGrid(c, indexdata);

            } else {

                f.down("[name=subgl_subgl_id]").setVisible(false);
                f.down("[name=subgl_subgl_id]").setValue(false);
                f.down('label[id=affiliasiNameId]').setVisible(false);
                f.down('[name=subgl_description]').setVisible(false);
                f.down('[name=browseUnitsub]').setVisible(false);
                f.down("[name=subgl_subgl_id]").setValue(null);
                f.down("[name=subgl_description]").setValue(null);

                f.down("[name=amount]").setVisible(true);
                f.down("[name=amountc]").setVisible(true);
                f.down("[name=amount]").setReadOnly(false);
                f.down("[name=amountc]").setReadOnly(false);
                f.down("#radio1_acc").setValue(false);
                f.down("#radio2_acc").setValue(false);


                gridsub.down("[action=create]").setDisabled(true);
                storesub.loadData([], false);
                c.kelsub_id = 0;
                gridsub.setVisible(false);
            }
        }


        if (selectedType == 'D') {
            f.down("#radio1_acc").setValue(true);
            f.down("#radio2_acc").setValue(false);
        }
        if (selectedType == 'C') {
            f.down("#radio1_acc").setValue(false);
            f.down("#radio2_acc").setValue(true);
        }

        /*jika sudah ada value*/
        var amount = row.amount;
        var amountc = row.amountc;

        if (parseFloat(amountc) > 0) {
            f.down("#radio1_acc").setValue(false);
            f.down("#radio2_acc").setValue(true);
            f.down("[name=amountc]").setValue(amountc);
        } else if (parseFloat(amount) > 0) {
            f.down("#radio1_acc").setValue(true);
            f.down("#radio2_acc").setValue(false);
            f.down("[name=amount]").setValue(amount);
        }


    },
    getAllCashflowType: function (project_id, pt_id) {
        return Ext.Ajax.request({
            url: 'cashier/common/read',
            method: 'POST',
            timeout: 10000000,
            params: {
                hideparam: 'getsetupcashflowbypt',
                project_id: project_id,
                pt_id: pt_id,
                start: 0,
                limit: 1000,
            },
            async: false
        }).responseText;
    },
    gotocashflow: function (c, coaId, is_mcf, c_id) {
        var me = this;
        var f = c.getFormcoadetail();

        if (is_mcf == true) {
            if (c_id == 0) {
                f.setLoading(false);
                f.down('[name=cashflowtype_cashflowtype_id]').setValue('');
                f.down("[name=cashflowtype]").setValue('');
                var storenull = f.down('[name=cashflowtype_cashflowtype_id]').getStore();
                // storenull.clearData();
                storenull.removeAll();
                //storenull.loadData([],false);
                f.down('[name=cashflowtype_cashflowtype_id]').setDisabled(true);



            } else {
                f.setLoading(false);
                me.getCashflow(c, coaId, function () {
                    var store = f.down('[name=cashflowtype_cashflowtype_id]').getStore();
                    f.down('[name=cashflowtype_cashflowtype_id]').setValue('');
                    store.each(function (rec) {
                        var id = rec.get("cashflowtype_id");


                        if (c_id == id) {
                            f.down('[name=cashflowtype_cashflowtype_id]').setDisabled(false);

                            f.down('[name=cashflowtype_cashflowtype_id]').setValue(id);
                            f.down('[name=cashflowtype_cashflowtype_id]').setRawValue(rec.get("cashflowtype"));
                            f.down("[name=cashflowtype]").setValue(rec.get("cashflowtype"));


                        }
                    });
                });


            }

        }

    },
    acctypeChange: function (c) {
        var me = this;
        c.kelsub_id = 0;
        var fa = c.getFormcoadetail();
        var state = fa.up("window").state;

        var db = fa.down("#radio1_acc").getValue();
        var cr = fa.down("#radio2_acc").getValue();

        var kelsub = fa.down("[name=kelsub_kelsub]").getValue();

        if (kelsub) {
            if (db == true && cr == false) {
                var amounttmp = fa.down("[name=amountc]").getValue();
                fa.down("[name=amount]").setValue(amounttmp);
                fa.down("[name=amountc]").setValue(0);
                fa.down("[name=amount]").setVisible(true);
                //fa.down("[name=amountc]").setVisible(false);
            }
            if (cr == true && db == false) {
                var amounttmp = fa.down("[name=amount]").getValue();
                fa.down("[name=amountc]").setValue(amounttmp);
                fa.down("[name=amount]").setValue(0);
                fa.down("[name=amountc]").setVisible(true);
                //fa.down("[name=amount]").setVisible(false);
            }
        } else {

            if (db == true && cr == false) {
                var amounttmp = fa.down("[name=amountc]").getValue();
                if (parseInt(amounttmp) == 0) {
                    amounttmp = fa.down("[name=amount]").getValue();
                }
                fa.down("[name=amount]").setValue(amounttmp);
                fa.down("[name=amountc]").setValue(0);
            }
            if (cr == true && db == false) {
                var amounttmp = fa.down("[name=amount]").getValue();
                if (parseInt(amounttmp) == 0) {
                    amounttmp = fa.down("[name=amountc]").getValue();
                }
                fa.down("[name=amountc]").setValue(amounttmp);
                fa.down("[name=amount]").setValue(0);
            }

        }

    },
    formDataSubDetail: function (c, param) {
        var me = this;
        var w = c.instantWindow('FormDataSubDetail', 910, 'Add sub detail journal ', param, 'coadatasubdetailsby');

        var f = c.getFormsubcoadetail();
        var state = f.up("window").state;
        if (state == 'create') {
            f.down('[name=subgl_subgl_id]').focus();
            setTimeout(function () {
                f.down("[name=subgl_subgl_id]").focus();
            }, 100);
        }


    },
    fdardatasub: function (c, param) {
        var me = this;
        var f = c.getFormsubcoadetail();
        var form = c.getFormcoadetail();
        var fd = c.getFormdata();
        var project, pt;
        project = fd.down('[name=project_project_id]').getValue();
        pt = fd.down('[name=pt_pt_id]').getValue();
        var val = form.getForm().getValues();

        var paging_mode = c.paging_mode;

        if (paging_mode == 1) {
            f.down('button[action=directsave]').setVisible(true);
            f.down('button[action=cancel]').setVisible(false);
            f.down('button[action=save]').setVisible(false);
        } else {
            f.down('button[action=directsave]').setVisible(false);
        }

        var gridsub = c.getGridsubdetail();

        if (paging_mode == 1) {
            gridsub.down('[name=subdetailjournalpagingtoolbar]').setVisible(true);
        } else {
            gridsub.down('[name=subdetailjournalpagingtoolbar]').setVisible(false);
        }


        store = c.localStore.substore;
        var storecombo = c.getStore("Subgl");

        //onafterrender
        storecombo.proxy.extraParams = {
            "hideparam": 'getsubglbykelsub',
            "project_id": project,
            "pt_id": pt,
            "kelsub_id": val.kelsub_kelsub_id
        }

        //onkeyup
        f.down("[name=subgl_subgl_id]").on('keyup', function (e, t, eOpts) {
            storecombo.proxy.extraParams = {
                "hideparam": 'getsubglbykelsub',
                "project_id": project,
                "pt_id": pt,
                "kelsub_id": val.kelsub_kelsub_id
            }
        });

        var remarks = form.down("[name=remarks]").getValue();

        if (param === 'create') {
            //c.getCustomRequestCombobox('subgl', val.kelsub_kelsub_id, 'subgl_subgl_id', 'subgl', '', f);
            //c.getCustomRequestCombobox('subgl', val.kelsub_kelsub_id, pt, project, 'subgl_subgl_id', 'subgl', '', f, '');
            var tempstoresub = c.localStore.subdetailcoa;
            var gridsub = c.getGridsubdetail();
            var count2 = gridsub.getStore().getCount();
            f.down('[name=kelsub_kelsub]').setValue(val.kelsub_kelsub);
            f.down('[name=kelsub_kelsub_id]').setValue(val.kelsub_kelsub_id);
            f.down('[name=journaldetail_id]').setValue(val.voucherdetail_id);
            f.down('[name=journaldetail_journaldetail_id]').setValue(val.voucherdetail_id);
            if (val.indexdata == null || val.indexdata <= 0) {
                //val.indexdata = count2+1;
            }
            f.down('[name=journaldetail_indexdata]').setValue(val.indexdata);
            f.down('[name=indexsubdata]').setValue(count2 + c.sumCount + 1);
            f.down('[name=remarks]').setValue(remarks);
        }
        else if (param === 'update') {
            var grid = c.getGridsubdetail();
            var row = grid.getSelectionModel().getSelection();
            var rec = grid.getSelectedRecord();
            f.kosongGa = grid.getSelectedRow();
            //getCustomRequestCombobox: function (paramname, val, val2, val3, field, model, submodel, form, param, callback, loading) {
            //c.getCustomRequestCombobox('subgl', val.kelsub_kelsub_id, pt, project, 'subgl_subgl_id', 'subgl', '', f, '', function () {
            f.setLoading('Loading data...');
            //onloaddropdown
            storecombo.load({
                params: {
                    "hideparam": 'getsubglbykelsub',
                    "project_id": project,
                    "pt_id": pt,
                    "kelsub_id": val.kelsub_kelsub_id,
                    "query": rec.get('subgl_code1')
                },
                callback: function (records, operation, success) {
                    console.log(f.down('[name=subgl_id]').getValue());
                    var subs = records[0].data.subgl_id;
                    f.down('[name=subgl_id]').setValue(subs)
                    console.log(f.down('[name=subgl_id]').getValue());
                    f.setLoading(false);
                }
            });
            f.loadRecord(rec);
            // });
        }


    },
    getJournalId: function (c, paramdate, state, pt) {
        var me = this;
        var f = c.getFormdata();
        var project_id = f.down('[name=project_project_id]').getValue();
        var p = c.getPanel();
        f.setLoading('Please wait, Checking access transaction');
        var d = null;
        c.tools.ajax({
            params: {
                module: c.controllerName,
                date: paramdate,
                pt_id: pt,
                project_id: project_id
            },
            success: function (data, model) {
                try {
                    if (data.hasil[0][0].jid === 0) {
                        c.tools.alert.warning("Selected date is closing for transaction.");
                        me.disableSave(c, true);
                        if (state == 'create') {
                            f.down('[name=journalID]').setValue('');
                        }
                        if (state == 'update') {
                            // f.down('[name=prefix_prefix_id]').setReadOnly(true);
                        }
                        c.is_closed = 1;
                    }
                    else if (data.hasil[0][0].jid === 2) {
                        c.tools.alert.warning("Selected date is not installed, please setup on master closing.");
                        me.disableSave(c, true);
                        if (state == 'create') {
                            f.down('[name=journalID]').setValue('');
                        }
                        c.is_closed = 1;
                    }
                    else {
                        if (state == 'create') {
                            f.down('[name=journalID]').setValue(data.hasil[0][0].jid);
                        }
                        me.disableSave(c, false);
                        c.is_closed = 0;
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
                            //f.down("[name=amount]").setValue(accounting.formatMoney(c.totalSumAr));
                            //f.down("[name=amountc]").setValue(accounting.formatMoney(c.totalSumAr));
                            me.generateCoaFromAR(c, c.templateCoa, 'click');
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

        if (Ext.get('WINDOW-mnu' + c.bindPrefixName) !== null) {
            var mdl = 'Journal';
        } else {
            var mdl = 'Openingbalance';
        }

        c.tools.ajax({
            params: {
                module: c.controllerName,
                param: params,
                dataflow: kasbank
            },
            success: function (data, model) {
                c.fillFormComponents(data, f);
                var gridcoadetail = c.getDetailjournalgrid();

                if (c.paging_mode == 1) {
                    gridcoadetail.down('[name=detailjournalpagingtoolbar]').setVisible(true);
                } else {
                    gridcoadetail.down('[name=detailjournalpagingtoolbar]').setVisible(false);
                }

                if (mdl == 'Journal') {
                    f.down("[name=journalardetail]").setDisabled(false);

                    //Disable jika data dari vchr
                    var jid = f.down("[name=journalID]").getValue();
                    if (jid.includes("VC")) {
                        f.down("[name=journalardetail]").setDisabled(true);
                        f.down("[name=journalardetail]").setVisible(false);
                    }
                }
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
                    var datenew;
                    me.generateCoa(c, c.templateCoa, 'kasbank', rec.get("journal_id"), '', function () {

                        if (f.down("[name=journal_date]").getValue() == "") {
                            //disibi
                            datenew = f.down("[name=kasbank_date]").getValue();
                        } else {
                            datenew = f.down("[name=journal_date]").getValue();
                        }

                        me.getJournalId(c, datenew, state, f.down("[name=pt_pt_id]").getValue());
                    });

                }
            }
        }).read('detail');
    },
    checkDetailGridBeforeGenerate: function (c) {
        var me = this;
        var grid = c.getDetailjournalgrid();
        var store = grid.getStore();
        var fa = c.getFormdata();
        store.each(function (rec) {
            var id = rec.get("journaldetail_id");
            var subgl_id = rec.get("subgl_subgl_id");

            if (id) {
                //hanya yang AR saja yang dihapus (999)
                if (subgl_id == 999) {
                    fa.deletedRows.push(id);
                }
            }
        });
    },
    generateCoa: function (c, template, state, kasbank_id, paymentId, callback) {
        var me = this;
        var f = c.getFormdata();
        var g = c.getDetailjournalgrid();
        var totalpayment = accounting.unformat(f.down("[name=amount]").getValue());
        var ps = f.rowData;
        var unitid = 0;
        var schedule_id = 0;
        var paging_mode = c.paging_mode;

        if (ps) {
            var unitid = ps.get('unit_unit_id');
            var schedule_id = c.schedule_id;
        }
        if (true) {
            me.disableSave(c, true);
            f.setLoading("Loading detail coa");

            if (paging_mode == 1) {
                g.getStore().proxy.extraParams = {
                    paging_mode: paging_mode,
                    template_id: c.templateCoa,
                    amount: c.amountSelected,
                    kasbank_id: kasbank_id,
                    unit_id: unitid,
                    schedule_id: c.schedule_id,
                    purchaseletter_pencairankpr_id: c.purchaseletter_pencairankpr_id,
                    mode_read: 'generatetemplatecoa'
                };
            }

            g.getStore().load({
                params: {
                    paging_mode: paging_mode,
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
    generateCoaFromAR: function (c, template, state, kasbank_id, paymentId, callback, loading) {
        var me = this;
        var f = c.getFormdata();
        var g = c.getDetailjournalgrid();
        var garStore = c.getDetailargrid().getStore();
        var jgStore = g.getStore();
        var lastjgStore = [];

        //ambil sebelumnya
        jgStore.each(function (rec) {
            lastjgStore.push(rec);
        });

        var sb = c.localStore.subdetailcoa;


        var totalpayment = accounting.unformat(f.down("[name=amount]").getValue());
        var unitid_str = f.down('[name=unit_unit_id]').getValue();
        var pt_id = f.down('[name=pt_pt_id]').getValue();
        var project_id = f.down('[name=project_project_id]').getValue();

        var ps = f.rowData;
        var receipt = '';
        var unitid = 0;
        var schedule_id = 0;
        me.checkDetailGridBeforeGenerate(c);
        if (ps) {
            var unitid = ps.get('unit_unit_id');
            var schedule_id = c.schedule_id;
            if (unitid_str !== "") {
                unitid = unitid_str;
            }
        } else {
            unitid = c.unit_id;
        }
        //buat jadi delimiter karena bisa multi
        if (Number.isInteger(unitid)) {
            garStore.each(function (rec) {
                unitid_str += rec.get('unit_unit_id') + '~';
            });
            unitid = unitid_str;
        } else {
            unitid_str = '';
            garStore.each(function (rec) {
                unitid_str += rec.get('unit_unit_id') + '~';
            });
            unitid = unitid_str;
        }

        //console.log(lastStore);
        if (c.ptId == 0) {
            c.ptId = pt_id;
            c.projectId = project_id;
        }

        if (c.amountSelected) {
            me.disableSave(c, true);
            f.setLoading("Loading detail journal from AR");
            g.getStore().load({
                params: {
                    template_id: c.templateCoa,
                    amount: c.amountSelected,
                    kasbank_id: kasbank_id,
                    unit_id: unitid,
                    schedule_id: c.schedule_id,
                    purchaseletter_pencairankpr_id: c.purchaseletter_pencairankpr_id,
                    paymenttype_id: c.paymenttype_id,
                    pt_id: c.ptId,
                    project_id: c.projectId,
                    receipt: receipt
                },
                callback: function (rec, op) {

                    //installment
                    c.paymentflag_id = 1;

                    var arrindexdata = [0];
                    var arrrmks = [];
                    var needle = 'Rp.';

                    for (i = 0; i < rec.length; i++) {
                        var rmks = '999' + rec[i].get('remarks');
                        if (rmks.includes(needle)) {
                            rmks = rmks.substring(0, rmks.indexOf(needle));
                        }
                        arrrmks.push(rmks);
                    }

                    for (i = 0; i < lastjgStore.length; i++) {
                        lastjgStore[i].set('indexdata', parseInt(lastjgStore[i].get('indexdata')));
                        lastjgStore[i].raw.indexdata = parseInt(lastjgStore[i].get('indexdata'));
                        lastjgStore[i].raw.subgl_subgl_id = parseInt(lastjgStore[i].get('subgl_subgl_id'));

                        var lastremarks = lastjgStore[i].get('subgl_subgl_id') + lastjgStore[i].get('remarks');
                        if (lastremarks.includes(needle)) {
                            lastremarks = lastremarks.substring(0, lastremarks.indexOf(needle));
                        }

                        //jika remarks sama makaganti dengan yang update
                        if (!arrrmks.includes(lastremarks)) {
                            jgStore.add(lastjgStore[i]);
                            arrindexdata.push(parseInt(lastjgStore[i].get('indexdata')));
                        }


                    }

                    var maxindexdata = Math.max.apply(Math, arrindexdata);

                    for (i = 0; i < rec.length; i++) {
                        maxindexdata = maxindexdata + 1;
                        rec[i].beginEdit();
                        rec[i].set('indexdata', parseInt(maxindexdata));
                        rec[i].set('datafrom', 'AR');
                        rec[i].set('subgl_subgl_id', 999); //artinya dari AR
                        rec[i].raw.journaldetail.indexdata = parseInt(maxindexdata);
                        rec[i].endEdit();
                        rec[i].commit();
                    }

                    if (!loading) {
                        f.setLoading(false);
                    }
                    me.disableSave(c, false);
                    g.attachModel(op);
                    me.sumDetail(c);

                    if (typeof callback === "function") {
                        callback();
                    }
                    me.setSumDetail(c);

                    //var unit_id = f.down('[name=unit_unit_id]').getValue();

                    var unit_id = unitid;
                    if (unit_id) {
                        me.generatesubdetail(c, 'unit_id', unit_id, sb);
                    }


                }
            });
        } else {
            c.tools.alert.warning("Cannot Generate Detail .");
            g.getStore().loadData([], false);
            me.setSumDetail(c);
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
        // gridCoaDetail.getStore().removeAt(gridCoaDetail.getStore().find('amount', ''));
        // gridCoaDetail.getStore().rejectChanges();
    },
    disableSave: function (c, param) {
        var me = this;
        var f = c.getFormdata();
        var g = c.getDetailjournalgrid();
        f.down('[action=savenew],[action=saveprint],[action=save]').setDisabled(param);
        f.down('[action=saveprint]').setDisabled(param);
        f.down('[action=save]').setDisabled(param);
        g.down('[action=upload]').setDisabled(param);
        g.down('[action=loaddraft]').setDisabled(param);
        g.down('[action=saveasdraft]').setDisabled(param);
        g.down('[action=create]').setDisabled(param);
        g.down('[action=createcopy]').setDisabled(param);
        g.down('[action=destroy]').setDisabled(param);
        g.down('[action=update]').setDisabled(param);
        g.down('[action=exportacc]').setDisabled(false);
    },
    loadTempModel: function (c, callback) {
        var me = this;
        var f = c.getFormdata();
        var sb = c.instantStore({
            id: c.controllerName + 'SubDetailCoaStoreTemp',
            extraParams: {
                mode_read: 'subdetailcoa',
                module: 'journal'
            },
            idProperty: 'journalsubdetail_id'
        });
        if (typeof sb !== "undefined") {
            c.localStore.subdetailcoa = sb;
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
        } else {
            alert('loadTempModel failed. Please report this bug');
        }
    },
    restoreTempToSubGrid: function (c, indexdata) {
        var me = this;
        var subgrid = c.getGridsubdetail();
        var substore = c.getGridsubdetail().getStore();
        var tempstoresub = c.localStore.subdetailcoa;
        var f = c.getFormcoadetail();
        var sum = 0;
        subgrid.setLoading('Please wait');
        //me.loadModelSubCoaDetail(c, function () {

        /*
        var counttempstore = tempstoresub.getCount();
        me.loadModelSubCoaDetail(c, function () {
         tempstoresub.each(function (rec) {
             substore.add(rec);
         });
        });
        */

        //f.down("[name=amount]").setValue(accounting.formatMoney(sum));
        f.down("[name=amount]").setReadOnly(true);
        f.down("[name=amountc]").setReadOnly(true);
        subgrid.setLoading(false);
    },
    sumDetailOld: function (c) {
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
    sumDetail: function (c) {
        var me = this;
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
        // var selected = c.tools.comboHelper(form.down("[name=pt_pt_id]")).getFieldFree('pt_id', 'name', c.ptId);
        // console.log(c);
        form.down("[name=pt_pt_id]").setValue(parseInt(c.ptId));
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

        var paging_mode = c.paging_mode;

        if (paging_mode !== 1) {
            f.down("[name=sum_total_detail]").setValue(accounting.formatMoney(total));
            f.down("[name=sum_totalc_detail]").setValue(accounting.formatMoney(totalc));
        } else {
            me.ajaxSumdebetcredit(c);
        }

        //SET AUTOFILL JOURNAL

        var selisihdc = total - totalc;
        selisihdc = selisihdc.toFixed(2);

        if (selisihdc > 0) {
            c.currentType = 'C';
            c.currentVal = selisihdc;
        } else {
            c.currentType = 'D';
            c.currentVal = Math.abs(selisihdc);
        }


    },

    getCashflow: function (c, coaId, cb) {
        var me = this;
        var fd = c.getFormcoadetail();
        var f = c.getFormdata();
        var pt = f.down("[name=pt_pt_id]").getValue();
        var project = f.down("[name=project_project_id]").getValue();
        var department = f.down("[name=department_department_id]").getValue();
        c.getCustomRequestCombobox('getcashflow', coaId, pt, project, 'cashflowtype_cashflowtype_id', 'cashflowtype', ['grouptype'], fd, '', function () {
            if (typeof cb === "function") {
                cb();
            }

        });
    },

    cashflowChange: function (c, val) {
        var me = this;
        var f = c.getFormcoadetail();
        var selectedCF = c.tools.comboHelper(f.down("[name=cashflowtype_cashflowtype_id]")).getField('cashflowtype_id', 'cashflowtype');
        f.down("[name=cashflowtype]").setValue(selectedCF);

    },
    subglChange: function (c,subglid = 0) {
        console.log(subglid);
        var me = this;
        var f = c.getFormsubcoadetail();
        console.log(f);
        var selectedsubgl = c.tools.comboHelper(f.down("[name=subgl_subgl_id]")).getField('subgl_id', 'code');
        var code1 = c.tools.comboHelper(f.down("[name=subgl_subgl_id]")).getField('subgl_id', 'code1');
        var code2 = c.tools.comboHelper(f.down("[name=subgl_subgl_id]")).getField('subgl_id', 'code2');
        var code3 = c.tools.comboHelper(f.down("[name=subgl_subgl_id]")).getField('subgl_id', 'code3');
        var code4 = c.tools.comboHelper(f.down("[name=subgl_subgl_id]")).getField('subgl_id', 'code4');
        var description = c.tools.comboHelper(f.down("[name=subgl_subgl_id]")).getField('subgl_id', 'subdesc');
        
        console.log('----------------------------------');
        console.log(selectedsubgl);

        f.down("[name=subgl_subgl_id]").setValue(subglid);
        f.down("[name=subgl_id]").setValue(subglid);
        f.down("[name=subgl_code]").setValue(selectedsubgl);
        f.down("[name=subgl_code1]").setValue(code1);
        f.down("[name=subgl_code2]").setValue(code2);
        f.down("[name=subgl_code3]").setValue(code3);
        f.down("[name=subgl_code4]").setValue(code4);
        f.down("[name=subgl_description]").setValue(description);
    },
    getSubgl: function (c) {
        var me = this;
        var me = this;
        var fd = c.getFormcoadetail();
        var f = c.getFormdata();
        var pt = f.down("[name=pt_pt_id]").getValue();
        //c.getCustomRequestCombobox('getsubgl', c.kelsub_id, pt, '', 'subgl_subgl_id', 'subgl', '', fd);

        var subgl_id = c.subgl_id;
        if (subgl_id) {
            fd.down("[name=subgl_subgl_id]").setValue(subgl_id);
        }

    },
    createcopy: function (c, param) {
        // copy the selected record

        var me = this;
        var rec = '';
        var grid = c.getDetailjournalgrid();
        var store = grid.getStore();
        rec = grid.getSelectionModel().getSelection()[0];
        if (typeof rec === "undefined") {
            c.tools.alert.warning("No Data Selected.");
            return 0;
        }
        var copy = rec.copy(null);
        var row = grid.store.indexOf(rec); // this used to be -1
        var indexdata = parseInt(rec.get('indexdata'));
        var kelsub_id = parseInt(rec.get('kelsub_kelsub_id'));
        var journaldetail_id = rec.get('journaldetail_id');

        grid.setLoading('Copy...');

        if (journaldetail_id == '') {
            var mode = 'create';
        } else {
            var mode = 'update';
        }

        var indexes = [];
        store.each(function (record) {
            indexes.push(record.get('indexdata'));
        });
        var newidx = Math.max.apply(null, indexes) + 1;
        var newidx_str = newidx.toString();
        copy.data.indexdata = newidx_str;
        copy.data.journaldetail_id = '';
        copy.data.coa_coa = copy.data.coa_coa.replace(" (copy)", "") + ' (copy)';

        var sb = c.localStore.subdetailcoa;
        sb.clearFilter(true);

        sb.each(function (record) {
            sb.removeAt(sb.find('journaldetail_indexdata', newidx_str));
        });

        if (mode == 'update') {
            if (kelsub_id > 0) {
                c.tools.ajax({
                    params: {
                        "paging_mode": 0,
                        "journaldetail_id": journaldetail_id,
                        "mode_read": "subdetailcoa",
                        "module": "journal",
                        "page": 1,
                        "limit": 2500,
                        "start": 0
                    },
                    success: function (data, model) {
                        try {
                            for (i = 0; i < data.length; i++) {
                                var record = data[i];
                                sb.add({
                                    indexsubdata: record.journalsubdetail.indexsubdata,
                                    remarks: record.journalsubdetail.remarks,
                                    amount: record.journalsubdetail.amount,
                                    coa_id: "",
                                    hideparam: "default",
                                    subgl_subgl_id: record.subgl.subgl_id,
                                    subgl_code: record.subgl.code,
                                    subgl_code1: record.subgl.code1,
                                    subgl_code2: "",
                                    subgl_code3: "",
                                    subgl_code4: "",
                                    voucherdetail_voucherdetail_id: '',
                                    journaldetail_indexdata: newidx_str,
                                    kelsub_kelsub: record.kelsub.kelsub,
                                    kelsub_kelsub_id: record.kelsub.kelsub_id,
                                    kelsub_description: '',
                                    subgl_description: record.subgl.code
                                });
                                sb.commitChanges();
                            }
                            store.insert(row, copy);
                            store.commitChanges();
                            me.setSumDetail(c);
                            rec.commit(); // save changes
                            grid.setLoading(false);
                            grid.getSelectionModel().deselectAll();

                        } catch (err) {
                            console.log(err.message);
                            c.tools.alert.warning("Failed to get Sub GL.");
                            grid.setLoading(false);
                        }
                    }
                }).read('subdetailcoa');
            } else {
                store.insert(row, copy);
                store.commitChanges();
                me.setSumDetail(c);
                rec.commit(); // save changes
                grid.setLoading(false);
                grid.getSelectionModel().deselectAll();
            }
        }

        if (mode == 'create') {
            //JIKA ADA SUB
            if (kelsub_id > 0) {
                sb.each(function (record) {
                    if (parseInt(record.get('journaldetail_indexdata')) == indexdata) {
                        sb.add({
                            indexsubdata: record.get("indexdata"),
                            remarks: record.get("remarks"),
                            amount: record.get("amount"),
                            coa_id: "",
                            hideparam: "default",
                            subgl_subgl_id: record.get("subgl_subgl_id"),
                            subgl_code: record.get("subgl_code"),
                            subgl_code1: record.get("subgl_code1"),
                            subgl_code2: record.get("subgl_code2"),
                            subgl_code3: record.get("subgl_code3"),
                            subgl_code4: record.get("subgl_code4"),
                            voucherdetail_voucherdetail_id: '',
                            journaldetail_indexdata: newidx,
                            kelsub_kelsub: record.get("kelsub_kelsub"),
                            kelsub_kelsub_id: record.get("kelsub_kelsub_id"),
                            kelsub_description: '',
                            subgl_description: record.get("subgl_description")
                        });
                        sb.commitChanges();
                    }
                });
            }
            store.insert(row, copy);
            store.commitChanges();
            me.setSumDetail(c);
            rec.commit(); // save changes
            grid.setLoading(false);
            grid.getSelectionModel().deselectAll();
        }

    },
    generatesubdetail: function (c, param, id, sbn) {
        var me = this;
        if (param === "unit_id") {
            var sb = c.localStore.subdetailcoa;
            sb.clearFilter(true);

            var sbs = [];
            sb.each(function (record) {
                sbs.push(record);
            });

            var gridCoaDetail = c.getDetailjournalgrid();
            var detailstore = gridCoaDetail.getStore();

            //sb.loadData([], false);
            sb.removeAll();

            detailstore.each(function (rec) {


                //if (rec.get("kelsub_kelsub_id")!='' && rec.get("kelsub_kelsub_id")!='0') {
                // generate AR (999) only

                if (rec.get("subgl_subgl_id") == 999 && rec.get("kelsub_kelsub_id") != '' && rec.get("kelsub_kelsub_id") != '0') {
                    id = rec.get("unit_unit_id");

                    me.getSubglv2(c, id, param, function () {

                        //sb.removeAt(sb.find('journaldetail_indexdata', rec.get("indexdata")));

                        var amount = rec.get("amount");
                        if (rec.get("amount") == 0) {
                            amount = rec.get("amountc");
                        }

                        sb.add({
                            indexsubdata: rec.get("indexdata"),
                            remarks: rec.get("remarks"),
                            //credit
                            //amount: rec.get("amount"),
                            amount: amount,
                            coa_id: "",
                            hideparam: "default",
                            subgl_subgl_id: c.subgl[0].subgl_subgl_id,
                            subgl_code: c.subgl[0].subgl_code,
                            subgl_code1: c.subgl[0].subgl_code1,
                            subgl_code2: c.subgl[0].subgl_code2,
                            subgl_code3: c.subgl[0].subgl_code3,
                            subgl_code4: c.subgl[0].subgl_code4,
                            voucherdetail_voucherdetail_id: '',
                            journaldetail_datafrom: 'AR',
                            journaldetail_indexdata: rec.get("indexdata"),
                            kelsub_kelsub: rec.get("kelsub_kelsub"),
                            kelsub_kelsub_id: rec.get("kelsub_kelsub_id"),
                            kelsub_description: '',
                            subgl_description: c.subgl[0].subgl_description,
                        });

                        sb.commitChanges();

                    }, rec.get("kelsub_kelsub"));
                }


            });

            //add data sisa
            for (i = 0; i < sbs.length; i++) {
                if (sbs[i].data.journaldetail_datafrom !== 'AR') {
                    sb.add(sbs[i]);
                }


            }

        }


    },
    getSubglv2: function (c, id, param, callback, kelsub) {
        var me = this;
        var me = this;
        c.tools.ajax({
            params: {
                module: c.controllerName,
                id: id,
                param: param,
                kelsub: kelsub
            },
            success: function (data, model) {
                try {
                    c.subgl = [];
                    c.subgl.push({
                        subgl_subgl_id: data.result.subgl_id,
                        subgl_code: data.result.code,
                        subgl_code1: data.result.code1,
                        subgl_code2: data.result.code2,
                        subgl_code3: data.result.code3,
                        subgl_code4: data.result.code4,
                        subgl_description: data.result.description,
                    });
                    if (c.subgl === undefined || c.subgl.length == 0) {

                    } else {
                        if (typeof callback === "function") {
                            callback();
                        }
                    }

                } catch (err) {
                    console.log(err.message);
                    c.tools.alert.warning("Failed to get Sub GL.");
                }


            }
        }).read('getsubglv2');
    },
    ajaxSumdebetcredit: function (c) {
        var me, p = '';
        me = this;
        p = me.pglobal;
        var f = c.getFormdata();

        //directsave
        var value = {};
        value.journal_id = c.kasbank_id;

        Ext.Ajax.request({
            url: 'cashier/journal/create',
            method: 'POST',
            params: {
                data: Ext.encode({
                    "data": value,
                    "project_id": me.project_id,
                    "hideparam": 'directsumdebetcredit',
                })
            },
            success: function (response) {

                var res = JSON.parse(response.responseText);
                res = res[0][0];
                var total_debet = parseFloat(res.total_debet);
                var total_credit = parseFloat(res.total_credit);

                f.down("[name=sum_total_detail]").setValue(accounting.formatMoney(total_debet));
                f.down("[name=sum_totalc_detail]").setValue(accounting.formatMoney(total_credit));

                //SET AUTOFILL JOURNAL
                var selisihdc = 0;
                selisihdc = parseFloat(total_debet - total_credit);
                selisihdc = selisihdc.toFixed(2)

                if (selisihdc > 0) {
                    c.currentType = 'C';
                    c.currentVal = selisihdc;
                } else {
                    c.currentType = 'D';
                    c.currentVal = Math.abs(selisihdc);
                }


            },
            failure: function (response) {
            }
        });
    },
    ajaxSumdetailfromsub: function (c) {
        var me, p = '';
        me = this;
        p = me.pglobal;
        var fa = c.getFormcoadetail();

        //directsave
        var value = {};
        value.journal_id = c.kasbank_id;
        value.journaldetail_id = c.kasbankdetail_id;

        Ext.Ajax.request({
            url: 'cashier/journal/create',
            method: 'POST',
            params: {
                data: Ext.encode({
                    "data": value,
                    "project_id": me.project_id,
                    "hideparam": 'directsumdetailfromsub',
                })
            },
            success: function (response) {

                var res = JSON.parse(response.responseText);
                res = res[0][0];

                var db = fa.down("#radio1_acc").getValue();
                var cr = fa.down("#radio2_acc").getValue();

                var kelsub = fa.down("[name=kelsub_kelsub]").getValue();

                if (kelsub) {
                    if (db == true && cr == false) {
                        fa.down("[name=amount]").setValue(accounting.formatMoney(res.amount));
                    }
                    if (cr == true && db == false) {
                        fa.down("[name=amountc]").setValue(accounting.formatMoney(res.amount));
                    }
                }




            },
            failure: function (response) {
            }
        });
    },
    fdatasub: function (c) {
        var f = c.getFormcoadetail();
        var fa = c.getFormsubcoadetail();
        var coa_id = f.down("[name=coa_coa_id]").getValue();
        var kelsub_kelsub_id = f.down("[name=kelsub_kelsub_id]").getValue();
        var remarks = f.down("[name=remarks]").getValue();

        var myData = {
            coa_id                  : coa_id,
            kelsub_kelsub_id        : kelsub_kelsub_id,
            remarks                 : remarks
        }
        return myData;
    },


    savesubdetailcoa2: function (c, value) {
        var me = this;
        var fa = c.getFormcoadetail();
        var g = c.getGridsubdetail();
        var store = g.getStore();

        var db = fa.down("#radio1_acc").getValue();
        var cr = fa.down("#radio2_acc").getValue();
        
        store.add(value);
        c.journalAr.setSumDetailAR(c);

        if (db == true && cr == false) {
            fa.down("[name=amount]").setValue(accounting.formatMoney(c.sumAmountStore(store)));
            fa.down("[name=amountc]").setValue(0);
            fa.down("[name=amount]").setReadOnly(true);
            fa.down("[name=amountc]").setReadOnly(true);
        }
        if (cr == true && db == false) {
            fa.down("[name=amountc]").setValue(accounting.formatMoney(c.sumAmountStore(store)));
            fa.down("[name=amount]").setValue(0);
            fa.down("[name=amount]").setReadOnly(true);
            fa.down("[name=amountc]").setReadOnly(true);
        }
    },

});

