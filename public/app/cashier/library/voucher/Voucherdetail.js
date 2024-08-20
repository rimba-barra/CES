/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/*
 * @AUTHOR : SEMY
 * 
 */
Ext.define('Cashier.library.voucher.Voucherdetail', {
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
        var substore = c.getGridsubdetail().getStore();
        var total = f.down("[name=amount]").getValue();
        total = accounting.unformat(total);
                
        //Rizal 22 Juli 2019 --jika ada cashflow, wajib di isi cashflow nya..
//        var storecashflow = f.down("[name=cashflow_setupcashflow_id]").getStore();
//        if (storecashflow.getCount()>0 && f.down("[name=cashflow_setupcashflow_id]").getValue()==null){
//            c.tools.alert.warning("Cashflow cannot be empty.");
//            return false;
//        }
        //
        
        //Rizal 16 September 2019 check mandatory untuk cashflow
//        Ext.Ajax.request({
//            url: 'cashier/voucher/read',
//            method: 'POST',	
//            async: false ,
//            params: {
//                column: 'cashflow',
//                project_id: value['project_id'],
//                pt_id: value['pt_id'],
//                mode_read: 'getmandatoryfield'
//            },
//            success: function (response) {
//                var data = Ext.JSON.decode(response.responseText);
//                var is_mandatory = data.data['is_mandatory'];
//                if(is_mandatory>0 && f.down("[name=cashflow_setupcashflow_id]").getValue()==null){
//                    c.tools.alert.warning("Cashflow cannot be empty.");
//                    return false;
//                }
//            },
//            failure: function (response) {
//
//            }
//        }); 
        //
        
        if (f.getForm().isValid()) {
            if (!value['coa_coa_id_cf']) {
                value['coa_coa_id_cf'] = 0;
            }
            value['amount'] = parseFloat(accounting.unformat(value['amount']));
            value['remarks'] = value['remarks'].toUpperCase();
//            if(value['ppn_tipepajakdetail_id']!='' && value['ppn_tipepajakdetail_id']!=null && value['ppn_percentage']!='10'){
//                c.tools.alert.warning("Persentase PPN Salah.");
//                return false;
//            }
            if (total !== 0) {


                var checkppn = 0;
                var checkpph = 0;
                var ppn_tipepajakdetail_id = f.down('[name=ppn_tipepajakdetail_id]').getValue();
                var ppn_percentage = f.down('[name=ppn_percentage]').getValue();
                var pph_tipepajakdetail_id = f.down('[name=pph_tipepajakdetail_id]').getValue();
                var pph_percentage = f.down('[name=pph_percentage]').getValue();


                if (ppn_tipepajakdetail_id != "" && parseFloat(ppn_percentage) != 0 ) {
                    checkppn = 1;
                }

                if (pph_tipepajakdetail_id != "" && parseFloat(pph_percentage) != 0 ) {
                    checkpph = 1;
                }

                console.log(checkppn);
                console.log(checkpph);

                if (checkppn>0 || checkpph>0) {
                    c.flaggeneratepajak = 1;
                }

                console.log(g.getSelectionModel().getSelection()[0]);
                if ( typeof g.getSelectionModel().getSelection()[0] != "undefined" ) {
                    
                    var total_before = g.getSelectionModel().getSelection()[0].data.amount;
                    total_before = accounting.unformat(total_before);
                    if ( (total != total_before) && (checkppn!=0||checkpph!=0) ) {
                        c.flagchangeamountpajak = 1;
                    }

                    console.log(total_before);
                    console.log(total);
                }

                
                var sb = c.localStore.subdetailcoa;
                var description_sub = '<table><tr><td><b>SUB</b></td><td>&nbsp;&nbsp;&nbsp;<b>Amount</b></td></tr>';
                substore.clearFilter(true);
                var subdescnya = '';
                substore.each(function (rx) {
                    // if (!rec.get("vouchersubdetail_id")) {
                    description_sub = description_sub + '<tr><td>'+rx.get('subgl_code')+'</td><td>&nbsp;&nbsp;&nbsp;Rp.'+accounting.formatMoney(rx.get('amount'))+'</td></tr>';
//                    me.clearTempStorebyIndexdata(c, rx.get("indexdata"));
                    sb.add(rx);
                    subdescnya = rx.get('subgl_code');
                    // }
                });
                description_sub = description_sub + '</table>';
                value['description_sub'] = description_sub;
                if(substore.getCount()>1){
                    value['kelsub_description'] = c.tools.comboHelper(f.down("[name=coa_coa_id]")).getField('coa_id', 'kelsub_description');
                }
                if(substore.getCount()==1){
                    value['kelsub_description'] = subdescnya;
                }
                
                if (f.kosongGa > -1) {
                    var rec = store.getAt(f.kosongGa);
                    rec.beginEdit();
                    rec.set(value);
                    rec.endEdit();
                    store.commitChanges();
                } else {
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

                var count = substore.getCount();
//                if (count === 0) {
//                    me.clearTempStorebyIndexdata(c, rec.get("indexdata"));
//                }
                c.sumCount = count + c.sumCount;
                me.checkDeletedSubTempCoa(c);
                if (callback) {
                    setTimeout(function () {
                        me.formDataDetail(c, 'create')
                    }, 600);
                }
                //me.templateCoa = 1;
                //c.getSelectedSchedule();
                me.sumDetail(c);
                me.sumDetailOut(c);
                c.voucherAr.setSumDetailAR(c);
                f.up('window').close();
                console.log(sb);
            } else {
                c.tools.alert.warning("Amount cannot be empty.");
            }
        }
    },
    sumDetailOut: function (c) {
        var me = this;
        var f = c.getFormdata();
        var g = c.getDetailvouchergrid();
        var store = g.getStore();
        var total = 0;
        store.each(function (rec) {
            total += accounting.unformat(parseFloat(rec.get("amount")));
        });
        total = accounting.formatMoney(total);
        f.down('[name=sum_tagihan]').setValue(total);
        f.down('[name=sum_pay]').setValue(total);
        f.down('[name=sum_final]').setValue(total);
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
        var me    = this;
        var fd    = c.getFormdata();
        var title = '';
        var desc  = '';
        if (param == "create") {
            title = 'Add detail voucher';
            desc = fd.down('[name=description]').getValue();
        } else {
            title = 'Update';
        }
        var w = c.instantWindow('Formcoadetail', 900, title, param, 'coadatadetailsby');
        var f = c.getFormcoadetail();
        f.setLoading('Please wait...');
        f.down('[name=remarks]').setValue(desc);
        c.kasbankdetail_id = 0;
        
        me.loadModelSubCoaDetail(c, function () {
            
        });
        
        var parampajak = fd.down('[name=dataflow]').getValue() + '-' +fd.down('[name=vendor_vendor_id]').getValue();

        if(fd.down('[name=dataflow]').getValue()=="I"){
            parampajak = fd.down('[name=dataflow]').getValue() + '-' + fd.down('[name=purchaseletter_customer_id]').getValue();
        }

        c.getCustomRequestCombobox('coa', fd.down('[name=pt_pt_id]').getValue(), fd.down('[name=project_project_id]').getValue(), '', 'coa_coa_id', 'coa', ['kelsub'], f, param, function () {
            if (param == 'update') {
                var g      = c.getDetailvouchergrid();
                var gs     = c.getGridsubdetail();
                var rec    = g.getSelectedRecord(); //record nya detail
                var gh     = c.getGrid();
                var rec_h  = gh.getSelectedRecord(); // recordnya header

                var is_ems = (rec ? rec.get('is_ems') : 0);
                f.loadRecord(rec);

                me.getCashflow(c, rec.get('coa_coa_id'));
            
                if(c.uploadcpms_id > 0){
                    if(rec.get("kelsub_kelsub_id")!=""){
                        /* f.down('[action=savenew]').setDisabled(true);
                        f.down('[action=save]').setDisabled(true); */
                    }
                }
                if(c.uploadems_id > 0 ){
                    if(is_ems > 0 ){
                        // PERUBAHAN KALAU VOUCHER EMS BOLEH EDIT TAPI HANYA DESCRIPTION
                        f.down('[name=coa_coa_id]').setReadOnly(true);    
                        f.down('[name=amount]').setReadOnly(true);    
                        // f.down('[action=savenew]').setDisabled(true);
                        // f.down('[action=save]').setDisabled(true);    
                    }else{
                        f.down('[action=savenew]').setDisabled(false);
                        f.down('[action=save]').setDisabled(false);
                    }
                }
                c.formatCurrencyFormdata(me, f);

                if (rec_h != undefined) {
                    c.getCustomRequestCombobox('getcashbonbyvoucherid', rec_h.get("voucherdept_id"), '', '', 'kasbondept_id', 'vouchercashbondetail', '', f, '');
                }
            }
        });
        c.getCustomRequestCombobox('ppn', fd.down('[name=pt_pt_id]').getValue(), fd.down('[name=project_project_id]').getValue(), parampajak, 'ppn_tipepajakdetail_id', 'ppn', '', f, param, function () {
            var ppnStore = f.down("[name=ppn_tipepajakdetail_id]").getStore();
            var dataFlow = fd.down('[name=dataflow]').getValue();

            if (dataFlow == 'I') {
                var havePPNMasukan = 0;
                ppnStore.each(function (rec, idx) {
                    if (rec.get('tipepajakdetail') == 'PPN MASUKAN') {
                        havePPNMasukan = 1
                    }
                })

                if (havePPNMasukan == 1) {
                    ppnStore.filter('tipepajakdetail', 'PPN MASUKAN');
                }
            } else {
                ppnStore.clearFilter();
                ppnStore.filter([
                    {filterFn: function(item) { return item.get('tipepajakdetail') != 'PPN MASUKAN'; }}
                ])
            }
        });
        c.getCustomRequestCombobox('pph', fd.down('[name=pt_pt_id]').getValue(), fd.down('[name=project_project_id]').getValue(), parampajak, 'pph_tipepajakdetail_id', 'pph', '', f, param);
        
        c.getCustomRequestCombobox('coa', fd.down('[name=pt_pt_id]').getValue(), fd.down('[name=project_project_id]').getValue(), '', 'coa_coa_id_cf', 'coa', ['kelsub'], f, param);
        
        /* ADA PERUBAHAN INI DISIMPAN DAHULU SAMPAI AMAN */
        /* 
        var me = this;
        var fd = c.getFormdata(), desc;
        var title;
        if (param == "create") {
            title = 'Add detail voucher';
            desc = fd.down('[name=description]').getValue();
        } else {
            title = 'Update';
        }
        var w = c.instantWindow('Formcoadetail', 900, title, param, 'coadatadetailsby');
        var f = c.getFormcoadetail();
        f.down('[name=remarks]').setValue(desc);
        c.kasbankdetail_id = 0;
        me.loadModelSubCoaDetail(c, function () {
            
        });
        var parampajak = fd.down('[name=dataflow]').getValue()+'-'+fd.down('[name=vendor_vendor_id]').getValue();
        if(fd.down('[name=dataflow]').getValue()=="I"){
            parampajak = fd.down('[name=dataflow]').getValue()+'-'+fd.down('[name=purchaseletter_customer_id]').getValue();
        }
        c.getCustomRequestCombobox('ppn', fd.down('[name=pt_pt_id]').getValue(), fd.down('[name=project_project_id]').getValue(), parampajak, 'ppn_tipepajakdetail_id', 'ppn', '', f, param, function () {
            var ppnStore = f.down("[name=ppn_tipepajakdetail_id]").getStore();
            var dataFlow =  fd.down('[name=dataflow]').getValue();

            if (dataFlow == 'I') {
                var havePPNMasukan = 0;
                ppnStore.each(function (rec, idx) {
                    if (rec.get('tipepajakdetail') == 'PPN MASUKAN') {
                        havePPNMasukan = 1
                    }
                })

                if (havePPNMasukan == 1) {
                    ppnStore.filter('tipepajakdetail', 'PPN MASUKAN');
                }
            } else {
                ppnStore.clearFilter();
                ppnStore.filter([
                    {filterFn: function(item) { return item.get('tipepajakdetail') != 'PPN MASUKAN'; }}
                ])
            }
        });
        c.getCustomRequestCombobox('pph', fd.down('[name=pt_pt_id]').getValue(), fd.down('[name=project_project_id]').getValue(), parampajak, 'pph_tipepajakdetail_id', 'pph', '', f, param, function () {
            
        });
        c.getCustomRequestCombobox('coa', fd.down('[name=pt_pt_id]').getValue(), fd.down('[name=project_project_id]').getValue(), '', 'coa_coa_id', 'coa', ['kelsub'], f, param, function () {
            if (param == "update") {
                var g = c.getDetailvouchergrid();
                var gs = c.getGridsubdetail();
                var rec = g.getSelectedRecord();
                var is_ems = 0;
                if(rec){
                    is_ems = rec.get('is_ems');
                }
                f.loadRecord(rec);
//                console.log(rec.get('exclude_kwitansi'));
                //Rizal 23 Juli 2019
                me.getCashflow(c, rec.get('coa_coa_id'), function () {
                });
                //
                c.formatCurrencyFormdata(me, f);
                
                if(c.uploadcpms_id>0){
                    if(rec.get("kelsub_kelsub_id")!=""){
//                        f.down('[action=savenew]').setDisabled(true);
//                        f.down('[action=save]').setDisabled(true);
                    }
                }
                if(c.uploadems_id>0 ){
                    if(is_ems>0 ){
                        // PERUBAHAN KALAU VOUCHER EMS BOLEH EDIT TAPI HANYA DESCRIPTION
                        f.down('[name=coa_coa_id]').setReadOnly(true);    
                        f.down('[name=amount]').setReadOnly(true);    
                        // f.down('[action=savenew]').setDisabled(true);
                        // f.down('[action=save]').setDisabled(true);    
                    }else{
                        f.down('[action=savenew]').setDisabled(false);
                        f.down('[action=save]').setDisabled(false);
                    }
                }
            }
        });        
        
        c.getCustomRequestCombobox('coa', fd.down('[name=pt_pt_id]').getValue(), fd.down('[name=project_project_id]').getValue(), '', 'coa_coa_id_cf', 'coa', ['kelsub'], f, param, function () {
            if (param == "update") {
                var g = c.getDetailvouchergrid();
                var gs = c.getGridsubdetail();
                var rec = g.getSelectedRecord();
                console.log(rec);
            }
        });
         */
    },
    checkDeletedSubTempCoa: function (c, count) {
        var me = this;
        var f = c.getFormdata();
        var tempstoresub = c.localStore.subdetailcoa;
        var records = f.deletedLocalstoreSubRows;
        if (records.length > 0) {
            for (var i = 0; i <= records.length; i++) {
                console.log(records[i]);
                
                tempstoresub.removeAt(tempstoresub.find('uniqueid', records[i]));
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
        var fa = c.getFormdata();
        gridcoadetail.getView().refresh(); 
        var count = gridcoadetail.getStore().getCount();
        var maxId = count;
        var myStore = gridcoadetail.getStore();
        myStore.each(function(rec) // go through all the records
        {
          maxId = Math.max(maxId, rec.get('indexdata'));
        });
        hasil = maxId + 1 + fa.deletedRowsWithoutID;
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
            console.log(records[i].get("uniqueid"));
            fa.deletedLocalstoreSubRows.push(records[i].get("uniqueid"));
            g.getStore().removeAt(row);
            c.voucherAr.setSumDetailAR(c);
            f.down("[name=amount]").setValue(accounting.formatMoney(c.sumAmountStore(g.getStore())));
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
        var g = c.getDetailvouchergrid();
        var tempstoresub = c.localStore.subdetailcoa;
        var records = g.getSelectionModel().getSelection();
        for (var i = records.length - 1; i >= 0; i--) {
            var row = g.getStore().indexOf(records[i]);
            var id = records[i]['data']["voucherdetail_id"];
            if (id) {
                fa.deletedRows.push(id);
            }
            else {
                fa.deletedRowsWithoutID = fa.deletedRowsWithoutID + 1;
            }
            tempstoresub.removeAt(tempstoresub.find('voucherdetail_indexdata', records[i]['data']["indexdata"]));
            g.getStore().removeAt(row);
        }
        g.getView().refresh();
        me.sumDetail(c);
        me.sumDetailOut(c);
    },
    savesubdetailcoa: function (c) {
        var me = this;
        var f = c.getFormsubcoadetail();
        var fa = c.getFormcoadetail();
        var value = f.getForm().getValues();
        var g = c.getGridsubdetail();
        var store = g.getStore();
        if (f.getForm().isValid()) {
            value['remarks'] = value['remarks'].toUpperCase();
            if (f.kosongGa > -1) {
                var rec = store.getAt(f.kosongGa);
                value['amount'] = accounting.unformat(value['amount']);
                rec.beginEdit();
                rec.set(value);
                rec.endEdit();
            } else {
                value['amount'] = accounting.unformat(value['amount']);
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
        var kelsublama = f.down("[name=kelsub_kelsub_id]").getValue();
        var isi_notif = '';
        //buat cek kalo kelsub lama dan baru beda muncul notif
        var selectedKelsubId = c.tools.comboHelper(f.down("[name=coa_coa_id]")).getField('coa_id', 'kelsub_kelsub_id');
        if(c.uploadcpms_id!='' || c.uploadpim_id!=''){
            
            if (selectedKelsubId!=kelsublama){
                if(selectedKelsubId>0 && kelsublama>0){
                    isi_notif = 'Kelompok sub pada coa sebelumnya berbeda dengan yang anda pilih ';
                }
                if(selectedKelsubId>0 && (kelsublama=='' || kelsublama==null)){
                    isi_notif = 'Coa baru yang anda pilih memiliki sub sedangkan sebelumnya tidak ada ';
                }
                if((selectedKelsubId=='' || selectedKelsubId==null) && kelsublama>0){
                    isi_notif = 'Coa baru yang anda pilih tidak memiliki sub sedangkan sebelumnya ada sub ';
                }
                Ext.MessageBox.confirm(
                    'Confirm', isi_notif+', Apakah anda yakin?', callbackFunction);
                 function callbackFunction(btn) {
                    if(btn == 'yes') {
                        me.coaChangeNew2(c);
                    }else{
                        f.up('window').close();
                    }
                 };
            }else{
                me.coaChangeNew2(c);
            }
        }else{
            me.coaChangeNew2(c);
        }

    },
    coaChangeNew2: function (c) {
        var me                 = this;
            c.kelsub_id        = 0;
        var fd                 = c.getFormdata();
        var f                  = c.getFormcoadetail();
        var state              = f.up("window").state;
        var row                = f.getForm().getValues();
        var gridcoadetail      = c.getDetailvouchergrid();
        var gridcoadetailstore = gridcoadetail.getStore();
        var gridsub            = c.getGridsubdetail();
        var kelsublama         = f.down("[name=kelsub_kelsub_id]").getValue();
        var coaId              = f.down("[name=coa_coa_id]").getValue();

        var storesub = gridsub.getStore();
        var io = f.down("[name=indexdata]").getValue();
        if (state === 'create') {
            gridcoadetailstore.removeAt(gridcoadetailstore.find('indexdata', io));
            gridcoadetailstore.add(row);
        }

        var selected = c.tools.comboHelper(f.down("[name=coa_coa_id]")).getField('coa_id', 'coa');
        var selectedName = c.tools.comboHelper(f.down("[name=coa_coa_id]")).getField('coa_id', 'name');
        var selectedType = c.tools.comboHelper(f.down("[name=coa_coa_id]")).getField('coa_id', 'type');
        var selectedKelsubId = c.tools.comboHelper(f.down("[name=coa_coa_id]")).getField('coa_id', 'kelsub_kelsub_id');
        var selectedKelsub = c.tools.comboHelper(f.down("[name=coa_coa_id]")).getField('coa_id', 'kelsub_kelsub');
        var selectedKelsubDesc = c.tools.comboHelper(f.down("[name=coa_coa_id]")).getField('coa_id', 'kelsub_description');
//        console.log(selected);
        f.down("[name=coa_name]").setValue(selectedName);
        f.down("[name=coa_coa]").setValue(selected);
        f.down("[name=kelsub_kelsub]").setValue(selectedKelsub);
        f.down("[name=kelsub_description]").setValue(selectedKelsubDesc);
        f.down("[name=kelsub_kelsub_id]").setValue(selectedKelsubId);
        // console.log(coaId);

        

        // me.getCashflow(c, coaId, function () {
        //     var store = f.down('[name=cashflow_setupcashflow_id_hidden]').getStore();
        //     f.down('[name=cashflow_setupcashflow_id]').setValue('');
        //     if (store.getCount() > 0) {
                                
        
        //         var val = store.getAt(0).data.setupcashflow_id;
        //         var cf_type = store.getAt(0).data.cashflowtype_cashflowtype;
        //         var cf_type_id = store.getAt(0).data.cashflowtype_cashflowtype_id;
        //         var cf_dataflow = "";
        
        //         f.down('[name=cashflow_setupcashflow_id]').setValue(val);
        //         f.down("[name=cashflowtypfe_cashflowtype]").setValue(cf_type);
        //         f.down("[name=cashflowtype_cashflowtype_id]").setValue(cf_type_id);
        
        //         for (var ix = 0; ix < store.getCount(); ix++) {
        //             cf_dataflow = store.getAt(ix).data.cashflowtype_dataflow;
        
        //             if (dataflow == cf_dataflow) {
        //                 val = store.getAt(ix).data.setupcashflow_id;
        //                 cf_type = store.getAt(ix).data.cashflowtype_cashflowtype;
        //                 cf_type_id = store.getAt(ix).data.cashflowtype_cashflowtype_id;
        
        //                 f.down('[name=cashflow_setupcashflow_id]').setValue(val);
        //                 f.down("[name=cashflowtypfe_cashflowtype]").setValue(cf_type);
        //                 f.down("[name=cashflowtype_cashflowtype_id]").setValue(cf_type_id);
        //             }
        //         }
                
        //     //    me.cashflowChange(c,val);
        //     } else {
        //         f.down('[name=cashflow_setupcashflow_id]').setValue('');
        //         f.down('[name=cashflowtype_cashflowtype]').setValue('');
        //         f.down('[name=cashflowtype_cashflowtype_id]').setValue('');
        //     }
        // });

        me.getCashflow(c, coaId, function () {
            var store = f.down('[name=cashflow_setupcashflow_id_hidden]').getStore();
            var dataflow = fd.down("[name=dataflow]").getValue();

            store.filterBy(function(rec) {
                if (rec.get("cashflowtype_dataflow") == dataflow) {
                    return true;
                } else {
                    return false;
                }
            })

            if (store.getCount() == 0) {
                store.clearFilter();
            }

            f.down('[name=cashflow_setupcashflow_id]').setValue('');
            if (store.getCount() > 0) {
                var val = store.getAt(0).data.setupcashflow_id;
                f.down('[name=cashflow_setupcashflow_id]').setValue(val);
                f.down("[name=cashflowtype_cashflowtype]").setValue(store.getAt(0).data.cashflowtype_cashflowtype);
                f.down("[name=cashflowtype_cashflowtype_id]").setValue(store.getAt(0).data.cashflowtype_cashflowtype_id);
//                me.cashflowChange(c,val);
            } else {
                f.down('[name=cashflow_setupcashflow_id]').setValue('');
                f.down('[name=cashflowtype_cashflowtype]').setValue('');
                f.down('[name=cashflowtype_cashflowtype_id]').setValue('');
            }
        });

        if (selectedKelsubId) {
            f.down("[name=amount]").setReadOnly(true);
            gridsub.down("[action=create]").setDisabled(false);
            c.kelsub_id = selectedKelsubId;
            var indexdata = f.down("[name=indexdata]").getValue();
            //f.down("[name=subgl_subgl_id]").setVisible(true);
            //f.down('label[id=affiliasiNameId]').setVisible(true);
            f.down('label[id=affiliasiNameId]').setText(selectedKelsubDesc + ':');
            me.getSubgl(c);
           
//            if (!state == "update") { //dicomment Rizal 11 Juli 2019
            if (selectedKelsubId!=kelsublama){
                f.down("[name=amount]").setValue('');
                 storesub.loadData([], false);
                f.down("[name=subgl_subgl_id]").setValue(false);
            }
           
//             me.changeLabelSubgl(c);

            gridsub.setVisible(true);


            var width  = f.up("panel").getWidth();
            var height = f.up("panel").getHeight();
            var x      = width / 2;
            var y      = height / 2;

            console.log(width, height, x, y);

            f.up("panel").setPosition(20, 50, true);

            //  me.restoreTempToSubGrid(c, indexdata);
        } else {
            f.down("[name=amount]").setReadOnly(false);
            if (!state == "update") {
                f.down("[name=amount]").setValue('');
            }
            /* david 3/7/2019
            if (c.is_posting) {
                gridsub.down("[action=create]").setDisabled(true);
            } else {
                gridsub.down("[action=create]").setDisabled(false);
            }
            */
            gridsub.down("[action=create]").setDisabled(false);

            storesub.loadData([], false);
            f.down("[name=subgl_subgl_id]").setVisible(false);
            f.down("[name=subgl_subgl_id]").setValue(false);
            f.down('label[id=affiliasiNameId]').setVisible(false);
            c.kelsub_id = 0;
            gridsub.setVisible(false);


        }
        f.down("[name=coa_coa_id_cf]").setVisible(false);
        f.down("[name=coa_coa_id_cf]").setValue(0);
        Ext.getCmp('formcoadetail_coa_id_cf').allowBlank = true;

        var dataflow = fd.down('[name=dataflow]').getValue();
        console.log(dataflow);
        console.log(state);
        if (dataflow == 'I') {
            var coa_uang_muka = f.down("[name=coa_coa_id]").valueModels[0].data.coa;
            
            if (c.is_coa_ar.includes(coa_uang_muka)) {
                if (state == 'create') {
                    c.tools.alert.warning("Pencatatan penerimaan angsuran tidak boleh dilakukan melalui voucher manual. Silahkan generate/input melalui tombol [F7] collection.", function () {
                        f.up("window").close();
                        fd.up("window").close();
                        $("#WINDOW-mnuVoucher-body #btnCollection").click();
                    });
                }else if(state == 'update'){
                    var grid_header   = c.getGrid();
                    var record_header = grid_header.getSelectedRecord();
                    var is_erems      = 0;
                    
                    console.log(record_header);

                    c.tools.alert.warning("Pencatatan penerimaan angsuran tidak boleh dilakukan melalui voucher manual. Silahkan generate/input melalui tombol [F7] collection", function () {
                        f.up("window").close();
                        fd.up("window").close();
                        $("#WINDOW-mnuVoucher-body #btnCollection").click();
                    });
                }
            }
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
        var fd = c.getFormdata();
        var project, pt;
        project = fd.down('[name=project_project_id]').getValue();
        pt = fd.down('[name=pt_pt_id]').getValue();
        var val = form.getForm().getValues();

        if (param === 'create') {
            //c.getCustomRequestCombobox('subgl', val.kelsub_kelsub_id, 'subgl_subgl_id', 'subgl', '', f);
            //c.getCustomRequestCombobox('subgl', val.kelsub_kelsub_id, pt, project, 'subgl_subgl_id', 'subgl', '', f, '');
            var tempstoresub = c.localStore.subdetailcoa;
            var gridsub = c.getGridsubdetail();
            
            //var count2 = gridsub.getStore().getCount();
            var counters = [];
           

            var gridsubstore = gridsub.getStore();
            var count2 = gridsubstore.getCount() + 1;

            gridsubstore.each(function (record, index) {
                counters.push(record.data.indexsubdata);
            }); 

            if(counters.length>0){
                count2 = Math.max.apply(Math, counters)+1;
            }

            f.down('[name=kelsub_kelsub]').setValue(val.kelsub_kelsub);
            f.down('[name=kelsub_kelsub_id]').setValue(val.kelsub_kelsub_id);
            f.down('[name=voucherdetail_id]').setValue(val.voucherdetail_id);
            f.down('[name=voucherdetail_voucherdetail_id]').setValue(val.voucherdetail_id);
            f.down('[name=voucherdetail_indexdata]').setValue(val.indexdata);
            //f.down('[name=indexsubdata]').setValue(count2 + c.sumCount + 1);
            f.down('[name=indexsubdata]').setValue(count2);

            var desc = form.down("[name=remarks]").getValue();
            f.down("[name=remarks]").setValue(desc);
            f.down("[name=uniqueid]").setValue(Math.floor(Math.random() * 1000000000));
        } else if (param === 'update') {
            var grid = c.getGridsubdetail();
            var row = grid.getSelectionModel().getSelection();
            var rec = grid.getSelectedRecord();
            f.kosongGa = grid.getSelectedRow();
            
            rec.set('amount', accounting.unformat(rec.get('amount')));
            //getCustomRequestCombobox: function (paramname, val, val2, val3, field, model, submodel, form, param, callback, loading) {
           // c.getCustomRequestCombobox('subgl', val.kelsub_kelsub_id, pt, project, 'subgl_subgl_id', 'subgl', '', f, '', function () {
                f.loadRecord(rec);
            //});
            
            if(c.uploadcpms_id>0){
//                f.down('[action=save]').setDisabled(true);
            }
            if(c.uploadems_id>0){
                if(form.down("[name=is_ems]").getValue()>0){
                    f.down('[action=save]').setDisabled(true);
                }else{
                    f.down('[action=save]').setDisabled(false);
                }
            }
//            if(c.voucher_id>0){
//                f.down('[name=amount]').setReadOnly(true);
//            }
        }
    },
    getVoucherId: function (c, paramdate, state, pt, callback, loading) {
        var me = this;
        var f = c.getFormdata();
        var p = c.getPanel();
        f.setLoading('Please wait, Checking access transaction');
        var d = null;
        c.tools.ajax({
            params: {
                module: c.controllerName,
                date: paramdate,
                pt_id: pt,
                project_id: c.project_id,
            },
            success: function (data, model) {
                try {
                    if (data.hasil[0][0].vid === 0) {
                        c.tools.alert.warning("Selected date is closing for transaction.");
                        me.disableSave(c, true);
                        if (state == 'create') {
                            f.down('[name=voucherID]').setValue('');
                        }
                        c.is_closed = 1;
                        c.voucherAr.checkPaid(c);
                        f.setLoading(false);
                        return false;
                    } else if (data.hasil[0][0].vid === 2) {
                        c.tools.alert.warning("Selected date is not installed, please setup on master closing.");
                        me.disableSave(c, true);
                        if (state == 'create') {
                            f.down('[name=voucherID]').setValue('');
                        }
                        c.is_closed = 1;
                        c.voucherAr.checkClosing(c);
                        f.setLoading(false);
                        return false;
                    } else {
                        if (state == 'create') {
                            f.down('[name=voucherID]').setValue(data.hasil[0][0].vid);
                        }
                        me.disableSave(c, false);
                    }
                    if (typeof callback === "function") {
                        callback();
                    }
                    if (!loading) {
                        f.setLoading(false);
                    }
                } catch (err) {
                    console.log(err.message);
                    c.tools.alert.warning("Failed to load voucher ID, please reselect date to generate.");
                }
                if (!loading) {
                    f.setLoading(false);
                }
            }
        }).read('voucherid');
    },
    getVoucherIdv2: function (c, paramdate, state, pt, project, callback, f, loading) {
        var me = this;
        var p = c.getPanel();
        f.setLoading('Please wait, Checking access transaction');
        var d = null;
        c.tools.ajax({
            params: {
                module: c.controllerName,
                date: paramdate,
                pt_id: pt,
                project_id: project,
            },
            success: function (data, model) {
                try {
                    if (data.hasil[0][0].vid === 0) {
                        c.tools.alert.warning("Selected date is closing for transaction.");
                        c.closing_msg = 'Selected date is closing for transaction';
                        c.is_closing = 1;
                    } else if (data.hasil[0][0].vid === 2) {
                        c.tools.alert.warning("Selected date is not installed, please setup on master closing.");
                        c.is_closing = 2;
                        c.closing_msg = 'Selected date is not installed, please setup on master closing';

                    } else {
                        c.is_closing = 0;
                    }
                    if (typeof callback === "function") {
                        callback();
                    }

                } catch (err) {
                    console.log(err.message);
                    c.tools.alert.warning("Failed to load voucher ID, please reselect date to generate.");
                }
                if (!loading) {
                    f.setLoading(false);
                }
            }
        }).read('voucherid');
    },
    resetDetailCoa: function (c, tab) {
        var me = this;
        var f = c.getFormdata();
        if (c.isEdit == '1') {
            if (tab.name === 'detailvouchergrid') {
                if (c.templateCoa == '1') {
                    c.checkArIsEmpty();
                } else if (c.templateCoa == '2') {
                    var gridCoaDetail = c.getDetailvouchergrid();
                    gridCoaDetail.down('toolbar [action=generate]').setDisabled(false);
                }
                Ext.Msg.show({
                    title: 'Regenerate detail?',
                    msg: 'Are you sure to regenerate detail COA Account?',
                    buttons: Ext.Msg.YESNO,
                    icon: Ext.Msg.QUESTION,
                    fn: function (clicked) {
                        if (clicked === "yes") {
                            //Rizal 31 Okt 2019
                            var state = f.up("window").state;
                            if (state=='update'){
                                c.localStore.subdetailcoa.loadData([],false);
                                c.localStore.subdetailcoa.load({
                                    params: {
                                        voucherdetail_id: 0
                                    },
                                    callback: function (rec, op) {
                                        c.attachModel(op, c.localStore.subdetailcoa, true);
                                    }
                                });
                                c.localStore.subdetailcoa.loadData([],false);
                            }
                            //
                            c.voucherAr.getTotalSumAr(c);
                            f.down("[name=amount]").setValue(accounting.formatMoney(c.totalSumAr));
                            //generateCoa: function (c, template, state, kasbank_id, paymentId, callback, loading) {
                            me.generateCoa(c, c.templateCoa, 'click', '', '', function () {

                            });
                        }
                        if (clicked === "no") {
                            c.isEdit = null;
                        }
                    }
                });
            }
        }
        if (c.isnonlink == '1') {
            if (tab.name === 'detailvouchergrid') {
                
                c.amountSelected = null;   
                
                var grnl = c.getNonlinkgrid();
                var store = grnl.getStore();
                var amt ='';
                var paymenttypeid = '';
                store.each(function (rc) {
                    amt += parseFloat(rc.get("amount")) + "~";
                    paymenttypeid +=  rc.get('paymenttype_id') + "~";
                });
                c.paymenttype_id = paymenttypeid;
                c.amountSelected = amt;
                c.templateCoa = 15;
                Ext.Msg.show({
                    title: 'Regenerate detail?',
                    msg: 'Are you sure to regenerate detail COA Account?',
                    buttons: Ext.Msg.YESNO,
                    icon: Ext.Msg.QUESTION,
                    fn: function (clicked) {
                        if (clicked === "yes") {
                            //Rizal 31 Okt 2019
                            var state = f.up("window").state;
                            if (state=='update'){
                                c.localStore.subdetailcoa.loadData([],false);
                                c.localStore.subdetailcoa.load({
                                    params: {
                                        voucherdetail_id: 0
                                    },
                                    callback: function (rec, op) {
                                        c.attachModel(op, c.localStore.subdetailcoa, true);
                                    }
                                });
                                c.localStore.subdetailcoa.loadData([],false);
                            }
                            //
//                            f.down("[name=amount]").setValue(accounting.formatMoney(c.totalSumAr));
                            //generateCoa: function (c, template, state, kasbank_id, paymentId, callback, loading) {
                            me.generateCoa(c,15, 'click', '', '', function () {
                                me.generatesubdetail(c, 'customer_vendor_name', 0, 'click');
                            });
                        }
                    }
                });
            }
        }
        c.isEdit = null;
    },
    detailFdar: function (c, params, kasbank, states) {
        var me = this;
        var f = c.getFormdata();
        me.disableSave(c, true);
        c.uploadcpms_id = 0;
        c.uploadems_id = 0;
        c.voucher_id = 0;
        f.setLoading("Loading detail voucher");
        var currency_word;
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
                    c.bukaform = 1;
                    //win-voucherwinId
                    
                    c.localStore.anotherar = c.instantStore({
                        id: c.controllerName + 'AnotherARStoreTemp',
                        extraParams: {
                            mode_read: 'getanotherdenda',
                            module: 'voucher'
                        },
                        idProperty: 'schedule_id'
                    });

                    c.localStore.anotherar.loadData([],false);

                    c.localStore.anotherar.load({
                        params: {
                            value:0,
                            value2:0,
                            value3:0
                        },
                        callback: function (rec, op) {
                            c.attachModel(op, c.localStore.anotherar, true);
                            if (typeof callback === "function") {
                                callback();
                            }
                        }
                    });
                    if (states == "update") {
                        gridcoadetail.down('[action=trackingvoucher]').setDisabled(false);

                        var grid = c.getGrid();
                        var row = grid.getSelectionModel().getSelection();
                        var rec = grid.getSelectedRecord();
                        var paymentflag = rec.get("paymentflag_id");
                        if(paymentflag==2){
                            c.templateCoa=2;
                        }else{
                            c.templateCoa=1;
                        }
                        if(paymentflag==4){
                            if(f.down("[name=kpr_parsial]").getValue()!='1'){
                                c.templateCoa=4;
                            }else{
                                c.templateCoa=10;
                            }
                        }
                        if(paymentflag==5){
                            c.templateCoa=2;
                        }
                        c.paymentflag_id = paymentflag;
                        c.uploadpim_id = rec.get("uploadpim_id");
                        //
                        var df = f.down('[name=dataflow]').getValue();

                        var norek = rec.get("vendor_no_rekening");
                        f.rowData = rec;
                        f.editedRow = grid.getSelectedRow();


                        //Rizal 1 Okt 2019
                        Ext.Ajax.request({
                            url: 'cashier/voucher/read',
                            method: 'POST',	
                            async: false ,
                            params: {
                                kasbank_id: rec.get('kasbank_id'),
                                mode_read: 'getvoucherfdar'
                            },
                            success: function (response) {
                                var datafdar = Ext.JSON.decode(response.responseText);
                                currency_word = datafdar.data['currency_word'];
                                f.rowData.data['unit_cluster'] = datafdar.data['unit_cluster'];
                                f.down("[name=subholding_id]").setValue(datafdar.data['subholding_id']);
                                f.down("[name=is_f9]").setValue(datafdar.data['isf9']);
                                f.rowData.data['cluster_id'] = datafdar.data['cluster_id'];
                                c.uploadems_id = datafdar.data['uploadems_id'];
                                c.uploadcpms_id = datafdar.data['uploadcpms_id'];
                                c.voucher_id = datafdar.data['voucher_id'];
                                if(datafdar.data['isf9']==1){
                                    c.templateCoa = 9;
                                }
                                if(datafdar.data['isnonppn']==1 && datafdar.data['isdenda']==0){
                                    f.down('label[id=labelPpndtpId]').setText('UNIT PPN DTP');
                                }
                                if((paymentflag==1 && datafdar.data['isf9']!=1) || (datafdar.data['isdenda']>0 && paymentflag==2)|| (datafdar.data['bylegal']>0) || (paymentflag==5)){
                                    f.down('[name=kasbank_reff_voucher_id]').setVisible(true);
                                    if(rec.get("is_realized")==1 || rec.get("is_posting")==1){
                                        f.down('[action=browsereffvcr]').setVisible(false);
                                        f.down('[action=deletelink]').setVisible(false);
                                    }else{
                                        f.down('[action=browsereffvcr]').setVisible(true);
                                        f.down('[action=deletelink]').setVisible(true);
                                    }
                                }

                                if(datafdar.data['kelsub_id']>0){
                                    f.down("[name=subgl_code]").setVisible(true);
                                    f.down("[id=btnbrowseSub]").setVisible(true);
                                }else{
                                    f.down("[name=subgl_code]").setVisible(false);
                                    f.down("[id=btnbrowseSub]").setVisible(false);
                                }
                                if(datafdar.data['cashbackcashbonno']!=null && datafdar.data['cashbackcashbonno']!=''){
                                    f.down("[name=cashbackcashbonno]").setVisible(true);
                                    f.down("[name=cashbackcashbonno]").setValue(datafdar.data['cashbackcashbonno']);
                                }else{
                                    f.down("[name=cashbackcashbonno]").setVisible(false);
                                }
                            },
                            failure: function (response) {

                            }
                        }); 
                        //
                        
                        c.localStore.subdetailcoa = c.instantStore({
                            id: c.controllerName + 'SubDetailCoaStoreTemp',
                            extraParams: {
                                mode_read: 'subdetailcoa',
                                module: 'voucher'
                            },
                            idProperty: 'vouchersubdetail_id'
                        });
                        var state = f.up("window").state;
                        //Rizal 17 Juli 2019 //dicomment karna bugs sub
                            c.localStore.subdetailcoa.loadData([],false);
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

                            c.localStore.subdetailcoa.loadData([],false);
                        if(rec.get("kasbondept_id")!=""){
                            f.down("[name=kasbondept_no]").setVisible(true);
                        }else{
                            
                            f.down("[name=kasbondept_no]").setVisible(false);
                        }
                        
                        //Rizal 24 Juni 2019
//                        f.down('[name=saved_pt_pt_id]').setValue(rec.get("pt_pt_id"));
//                        f.down('[name=saved_project_project_id]').setValue(rec.get("project_project_id"));
//                        f.down('[name=saved_department_id]').setValue(rec.get("department_department_id"));
                        //

                        var vendorId = rec.get("vendor_vendor_id");
                        var is_paid = rec.get("is_paid");
                        var is_realized = rec.get("is_realized");
                        var realization_date = rec.get("realization_date");
                        var realization_by = rec.get("realization_by");
                        var posting_by = rec.get("posting_by");
                        var is_posting = rec.get("is_posting");

                        // if (rec.get('voucherprefix_voucherprefix_id')) {

                        // }

                        if (vendorId) {
                            if(rec.get("vendor_type_vendor")=="tenant"){
                                f.down("[name=datatype]").setValue("3");
                            }else{
                                f.down("[name=datatype]").setValue("1");
                            }
                        } else {
                            f.down("[name=datatype]").setValue("0");
                        }
                        var pt = rec.get("pt_pt_id");
                        var project_id = rec.get("project_project_id");
                        var department_id = rec.get("department_department_id");
                        var vid = f.down("[name=voucherID]").getValue();
                        f.loadRecord(rec);
                        f.down("[name=first_amount]").setValue(rec.get("amount"));
                        c.formatCurrencyFormdata(me, f);
                        c.amountSelected = rec.get("amount");
                        c.kasbank_id = rec.get("kasbank_id");
                        if (df === "O") {
                            Ext.getCmp('formdatavoucherprefix_voucherprefix_id').allowBlank = true;
                            Ext.getCmp('formdatavoucherprefix_voucherprefix_id').clearInvalid();
                            f.down("[name=payment_receipt_no]").setValue('');
                            c.loadVendorBank(rec.get("vendor_bankacc_id"));
                        }
                        if (norek) {
                            f.down('[name=vendor_no_rekening]').setVisible(true);
                            f.down('[name=vendor_no_rekening]').setValue(norek);

                        } else {
                            f.down('[name=vendor_no_rekening]').setVisible(false);
                            f.down('[name=vendor_no_rekening]').setValue('');
                        }
//                        if (paymentflag === 1) {
//                            c.checkUnit(f, rec.get("unit_unit_id"), rec.get("purchaseletter_purchaseletter_id"), function () {
//                                // f.setLoading(false);
//                                //console.log(c.is_closewarning);
//                                if (c.is_closewarning === 0) {
//                                    return false;
//                                }
//                                c.getKasbank(function () {
//                                    f.down('[name=voucherprefix_voucherprefix_id]').setValue(rec.get("voucherprefix_voucherprefix_id"));
//                                }, true);
//                                c.getCustomRequestCombobox('detaildeptbypt', pt, '', '', 'department_department_id', 'department', '', f, '', function () {
//                                    f.down("[name=department_department_id]").setValue(department_id);
//                                }, true);
//                                // } else {
//                                //  return false;
//                                // }
//                            }, true);
//                        } else {
//                            c.getKasbank(function () {
//                                f.down('[name=voucherprefix_voucherprefix_id]').setValue(rec.get("voucherprefix_voucherprefix_id"));
//                            }, true);
//                            c.getCustomRequestCombobox('detaildeptbypt', pt, '', '', 'department_department_id', 'department', '', f, '', function () {
//                                f.down("[name=department_department_id]").setValue(department_id);
//                            }, true);
//                        }


                        c.getKasbank(function () {
                            f.down('[name=voucherprefix_voucherprefix_id]').setValue(rec.get("voucherprefix_voucherprefix_id"));
                        }, true);
//                        c.getCustomRequestCombobox('undangancpms', pt, project_id, '', 'master_undangan_id', 'undangancpms', '', f, '', function () {
//                            
//                        }, true);
                        c.getCustomRequestCombobox('detaildeptbypt', pt, project_id, '', 'department_department_id', 'department', '', f, '', function () {
                            f.down("[name=department_department_id]").setValue(department_id);
                        }, true);

                        if (!is_paid) {
                            f.down("[name=dataflow]").setReadOnly(false);
                        }
                        if (is_realized) {
                            f.down("[name=dataflow]").setReadOnly(true);
                        }
                        if (is_posting) {
                            f.down("[name=dataflow]").setReadOnly(true);
                        }

                        //Rizal 24 Juni 2019 -- di comment karna bisa change company
//                        if(apps.project==39 || apps.project==54){
//                            f.down("[name=project_project_id]").setReadOnly(false);
//                        }else{
//                        //
                            f.down("[name=project_project_id]").setReadOnly(true);
//                        //Rizal 24 Juni 2019
//                        }
                        //
                        var ptid = f.down('[name=pt_pt_id]').getValue();
                        var project = f.down('[name=project_project_id]').getValue();
                        c.projectId = project_id;
                        c.ptId = ptid;

                        if(rec.get("kasbondept_no")!=""){
                            Ext.getCmp('TabVoucherId').getComponent('tabCashbon').tab.show();
                            c.loadModelCashbonpayment(rec.get("voucherdept_id"));
                        }
                        c.loadModelAttachment(rec.get("kasbank_id"));
                        if(rec.get("voucherdept_id")!=""){
                            Ext.getCmp('TabVoucherId').getComponent('tabApprovalDetail').tab.show();
                            c.loadModelApprovalDetail(rec.get("kasbank_id"));
                        }else{
                            Ext.getCmp('TabVoucherId').getComponent('tabApprovalDetail').tab.hide();
                        }
                        if(rec.get("dataflow")=="I"){
                            Ext.getCmp('TabVoucherId').getComponent('tabNonlink').tab.show();
                            c.loadModelNonlink(rec.get("kasbank_id"),function(){

                                var grnl = c.getNonlinkgrid();
                                if(grnl.getStore().getCount()>0 && (c.paymentflag_id==0 || c.paymentflag_id==null)){
                                    c.isnonlink='1';
                                    c.paymentflag_id=0;
                                }
                            });
                            
                        }
                        
                        var bank_approval = false;
                        var bank_approval_approver = 0;
                        var bank_approval_releaser = 0;
                        var statusbankapproval = '';
                        
                        Ext.Ajax.request({
                            url: 'cashier/voucher/read',
                            method: 'POST',	
                            async: false ,
                            params: {
                                kasbank_id: rec.get('kasbank_id'),
                                mode_read: 'checkIsBankApproved'
                            },
                            success: function (response) {
                                statusbankapproval = Ext.JSON.decode(response.responseText);

                            },
                            failure: function (response) {

                            }
                        }); 
                        Ext.Ajax.request({
                            url: 'cashier/voucher/read',
                            method: 'POST',	
                            async: false ,
                            params: {
                                project_id: rec.get('project_project_id'),
                                pt_id: rec.get('pt_pt_id'),
                                mode_read: 'checkIsBankApproval'
                            },
                            success: function (response) {
                                var datafdar = Ext.JSON.decode(response.responseText);
                                bank_approval = datafdar.data['BANKING_APPROVAL'];
                                bank_approval_approver = datafdar.data['BANKING_APPROVAL_APPROVER'];
                                bank_approval_releaser = datafdar.data['BANKING_APPROVAL_RELEASER'];
                                if(bank_approval==1){
                                    Ext.getCmp('TabVoucherId').getComponent('tabBankApproval').tab.show();
                                    f.down("[name=bank_trans_no]").setValue(rec.get("bank_trans_no"));
                                    f.down("[name=bank_trans_no]").setVisible(true);
                                    f.down("[name=bank_reff_no]").setValue(rec.get("bank_reff_no"));
                                    f.down("[name=bank_reff_no]").setVisible(true);
                                    if(bank_approval_approver==0){
                                        f.down("[name=fp_approver_0]").setVisible(true);
                                        f.down("[name=fp_approver_1]").setVisible(true);
                                        f.down("[name=fp_approver_2]").setVisible(true);
                                        if(statusbankapproval.data['approver_0']!=''){
                                            f.down("label[id=fp_approver_0_status]").setVisible(true);
                                            f.down('label[id=fp_approver_0_status]').setText(statusbankapproval.data['approver_0']);
                                        }
                                        if(statusbankapproval.data['approver_1']!=''){
                                            f.down("label[id=fp_approver_1_status]").setVisible(true);
                                            f.down('label[id=fp_approver_1_status]').setText(statusbankapproval.data['approver_1']);
                                        }
                                        if(statusbankapproval.data['approver_2']!=''){
                                            f.down("label[id=fp_approver_2_status]").setVisible(true);
                                            f.down('label[id=fp_approver_2_status]').setText(statusbankapproval.data['approver_2']);
                                        }

                                        c.getCustomRequestCombobox('bankapprovalapprover', rec.get("pt_pt_id"), rec.get("project_project_id"), '', 'fp_approver_0', 'approverreleaser', '', f, '',
                                                function () {
                                                    f.down("[name=fp_approver_0]").setValue(rec.get("fp_approver_0"));
                                                });
                                        c.getCustomRequestCombobox('bankapprovalapprover', rec.get("pt_pt_id"), rec.get("project_project_id"), '', 'fp_approver_1', 'approverreleaser', '', f, '',
                                                function () {
                                                    f.down("[name=fp_approver_1]").setValue(rec.get("fp_approver_1"));
                                                });
                                        c.getCustomRequestCombobox('bankapprovalapprover', rec.get("pt_pt_id"), rec.get("project_project_id"), '', 'fp_approver_2', 'approverreleaser', '', f, '',
                                                function () {
                                                    f.down("[name=fp_approver_2]").setValue(rec.get("fp_approver_2"));
                                                });
                                    }else{
                                        var apv = 0;
                                        for(apv=0;apv<=bank_approval_approver;apv++){
                                            f.down("[name=fp_approver_"+apv+"]").setVisible(true);
                                            if(statusbankapproval.data["approver_"+apv+""]!=''){
                                                f.down("label[id=fp_approver_"+apv+"_status]").setVisible(true);
                                                f.down("label[id=fp_approver_"+apv+"_status]").setText(statusbankapproval.data["approver_"+apv+""]);
                                            }
                                            c.getCustomRequestCombobox('bankapprovalapprover', rec.get("pt_pt_id"), rec.get("project_project_id"), '', 'fp_approver_'+apv, 'approverreleaser', '', f, '',
                                                    function () {
                                                        var apvtemp = 0;
                                                        for(apvtemp=0;apvtemp<=apv;apvtemp++){
                                                            f.down("[name=fp_approver_"+apvtemp+"]").setValue(rec.get("fp_approver_"+apvtemp+""));
                                                        }
                                                    });
                                        }
                                    }
                                    if(bank_approval_releaser==0){
                                        f.down("[name=fp_releaser_1]").setVisible(true);
                                        if(statusbankapproval.data['releaser_1']!=''){
                                            f.down("label[id=fp_releaser_1_status]").setVisible(true);
                                            f.down('label[id=fp_releaser_1_status]').setText(statusbankapproval.data['releaser_1']);
                                        }
                                        c.getCustomRequestCombobox('bankapprovalreleaser', rec.get("pt_pt_id"), rec.get("project_project_id"), '', 'fp_releaser_1', 'approverreleaser', '', f, '',
                                                function () {

                                                    f.down("[name=fp_releaser_1]").setValue(rec.get("fp_releaser_1"));
                                                });
                                    }else{
                                        var rel = 1;
                                        for(rel=1;rel<=bank_approval_releaser;rel++){
                                            f.down("[name=fp_releaser_"+rel+"]").setVisible(true);
                                            if(statusbankapproval.data["releaser_"+rel+""]!=''){
                                                f.down("label[id=fp_releaser_"+rel+"_status]").setVisible(true);
                                                f.down("label[id=fp_releaser_"+rel+"_status]").setText(statusbankapproval.data["releaser_"+rel+""]);
                                            }
                                            c.getCustomRequestCombobox('bankapprovalreleaser', rec.get("pt_pt_id"), rec.get("project_project_id"), '', 'fp_releaser_'+rel, 'approverreleaser', '',f, '',
                                                function () {

                                                    var reltemp = 1;
                                                    for(reltemp=1;reltemp<=rel;reltemp++){
                                                        f.down("[name=fp_releaser_"+reltemp+"]").setValue(rec.get("fp_releaser_"+reltemp+""));
                                                    }
                                                });
                                        }
                                    }

                                }
                            },
                            failure: function (response) {

                            }
                        }); 
                        if (paymentflag === 1 || paymentflag === 2) {
                            f.down('[name=voucherardetail]').setDisabled(false);
                            if(f.down("[name=is_f9]").getValue()=='1'){
                                f.down("[name=datatype]").setReadOnly(false);
                            }else{
                                // f.down("[name=datatype]").setReadOnly(true);
                                f.down("[name=datatype]").setReadOnly(false);
                            }
                            Ext.getCmp('TabVoucherId').getComponent('tabAr').tab.show();
                            Ext.getCmp('TabVoucherId').getComponent('tabOthers').tab.hide();
                            Ext.getCmp('TabVoucherId').getComponent('tabNonlink').tab.hide();
                            c.voucherAr.loadModelAr(c);
                            c.is_erems == "1";


                        } else if (paymentflag === 4) {
                            Ext.getCmp('TabVoucherId').getComponent('tabEscrow').tab.show();
                            Ext.getCmp('TabVoucherId').getComponent('tabAr').tab.hide();
                            Ext.getCmp('TabVoucherId').getComponent('tabOthers').tab.hide();
                            Ext.getCmp('TabVoucherId').getComponent('tabNonlink').tab.hide();
                            c.voucherAr.loadModelEscrow(c);
                        } else if (paymentflag === 5) {
                            Ext.getCmp('TabVoucherId').getComponent('tabEscrow').tab.hide();
                            Ext.getCmp('TabVoucherId').getComponent('tabAr').tab.hide();
                            Ext.getCmp('TabVoucherId').getComponent('tabOthers').tab.show();
                            Ext.getCmp('TabVoucherId').getComponent('tabNonlink').tab.hide();
                            c.loadModelOtherPayment();
                            c.setSumDetailOtherPayment();
                            c.is_erems == "1";
                        } else {
                            Ext.getCmp('TabVoucherId').getComponent('tabOthers').tab.hide();
                            Ext.getCmp('TabVoucherId').getComponent('tabEscrow').tab.hide();
                            f.down('[name=voucherardetail]').setDisabled(true);
                            Ext.getCmp('TabVoucherId').getComponent('tabAr').tab.hide();
                        }
                        f.down("[name=kasbank_date]").setValue(rec.get("kasbank_date"));
                        f.down("[name=payment_date]").setValue(rec.get("payment_payment_date") == "1900-01-01" ? (rec.get("payment_date")==""?"":rec.get("payment_date")) : (rec.get("payment_payment_date")==""?(rec.get("payment_date")==""?"":rec.get("payment_date")):rec.get("payment_payment_date")));
                        
                        //Rizal 24 Juni 2019 -- di comment karna bisa change company
                        //Rizal 24 Juni 2019 -- di comment karna bisa change company
//                        if(apps.project==39 || apps.project==54){
//                            f.down("[name=pt_pt_id]").setReadOnly(false);
//                        }else{
//                        //
                            f.down("[name=pt_pt_id]").setReadOnly(true);
//                        //Rizal 24 Juni 2019
//                        }
                        //


                        c.is_paid = is_paid;
                        c.is_realized = is_realized;
                        c.is_f7_convert = rec.get("is_f7_convert");
                        c.is_posting = is_posting;

                        //if (is_paid || is_realized || is_posting) {
                        if (is_realized || is_posting) {
                            var griddetail = me.getDetailvouchergrid;
                            //Rizal 24 JUni 2019
//                            f.down("[name=pt_pt_id]").setReadOnly(true);
                            //
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
                            gridcoadetail.down('toolbar [action=generate]').setDisabled(false);
                            
                            Ext.Ajax.request({
                                url: 'cashier/common/read',
                                method: 'POST',
                                timeout:100000000,  
                                params: {
                                    hideparam :'getaccessaction',
                                    term: 'VoucherEditSuppReal',
                                    start: 0,
                                    limit: 1000,
                                },
                                success: function (response) {
                                    response = Ext.JSON.decode(response.responseText);
                                    var isactive = response.data[0].active;
                                    if(is_posting==false && isactive==1 && (paymentflag=='' || paymentflag==null || paymentflag==0)){
                                        f.down("button[action=browseData]").setDisabled(false);
                                    }
                                },
                                failure: function (response) {

                                }
                            });
                            //david 3-7, open create
                            gridcoadetail.down('toolbar [action=create]').setDisabled(false);
                            //griddetail.down('toolbar [action=generate]').setDisabled(false);
                            var griard = c.getDetailargrid();
                            griard.down("toolbar [name=paymentall]").setDisabled(true);
                            me.disableSave(c, true);
                        } else {
//                            console.log("paymentflagnya "+paymentflag);
//                            if (!paymentflag) {
//                                gridcoadetail.down('toolbar [action=generate]').setDisabled(false);
//                            } else {
//                                gridcoadetail.down('toolbar [action=generate]').setDisabled(true);
//                            }
                            if (!paymentflag) {
                                gridcoadetail.down('toolbar [action=generate]').setDisabled(true);
                            } else {
                                gridcoadetail.down('toolbar [action=generate]').setDisabled(false);
                            }
                        }

                        if (realization_by) {

                            if (realization_by && is_realized) {//jike real
//                                 console.log(f.down("[name=realization_date]"));
                                f.down("[name=realization_date]").setFieldLabel('Realization Date');
                                f.down("[name=realization_by]").setFieldLabel('Realization by');
                            } else {//jika unreal
                                //
                                if (!is_posting) {
                                    f.down("[name=realization_date]").setFieldLabel('unRealization Date');
                                    f.down("[name=realization_by]").setFieldLabel('unRealization by');
                                } else {
                                    f.down("[name=realization_date]").setFieldLabel('Realization Date');
                                    f.down("[name=realization_by]").setFieldLabel('Realization by');
                                }
                            }
                            f.down("[name=realization_date]").setVisible(true);
                            f.down("[name=realization_by]").setVisible(true);

                        }
                        if (posting_by) {
                            if (posting_by && is_posting) {
                                f.down("[name=posting_by]").setFieldLabel('Posting by');
                                f.down("[name=posting_date]").setFieldLabel('Posting Date');
                            } else {
                                f.down("[name=posting_by]").setFieldLabel('unPosting by');
                                f.down("[name=posting_date]").setFieldLabel('unPosting Date');
                            }
                            f.down("[name=posting_by]").setVisible(true);
                            f.down("[name=posting_date]").setVisible(true);

                        }

                        f.down("[name=posting_date]").setValue(moment(rec.get('posting_date')).format("DD-MM-YYYY"));

                        // (c, template, state, kasbank_id, paymentId, callback) {
//                        console.log(rec);
//                        console.log(rec.get("duedate"));
//                        console.log(rec.get("kwitansi_date"));
                        me.generateCoa(c, c.templateCoa, 'kasbank', rec.get("kasbank_id"), '', function () {
                            // me.disableSave(c, true);
                            // disable 12 - 04 - 2018 reason : gausah generate voucher ID lagi kan udah ke create ;v
                            // if (!rec.get("voucherID")) {
                            /// if (is_realized || is_posting || is_paid) {
                            if (is_posting) {
                                me.getVoucherId(c, rec.get("realization_date"), state,
                                        f.down("[name=pt_pt_id]").getValue(), function () {
                                    me.checkIsRealization(c);
                                    f.down("[name=duedate]").setValue(moment(rec.get('duedate')).format("DD-MM-YYYY"));
                                    f.down("[name=kwitansi_date]").setValue(moment(rec.get('kwitansi_date')).format("DD-MM-YYYY"));
                                    f.down("[name=realization_date]").setValue(moment(rec.get('realization_date')).format("DD-MM-YYYY"));
                                    f.setLoading(false);
                                    f.down("[name=unit_unit_id]").setValue(rec.get('unit_unit_id'));
                                    f.down("[name=purchaseletter_purchaseletter_id]").setValue(rec.get('purchaseletter_purchaseletter_id'));
                                });
                            } else {
                                me.checkIsRealization(c);
                                f.down("[name=duedate]").setValue(moment(rec.get('duedate')).format("DD-MM-YYYY"));
                                f.down("[name=kwitansi_date]").setValue(moment(rec.get('kwitansi_date')).format("DD-MM-YYYY"));
                                f.down("[name=realization_date]").setValue(moment(rec.get('realization_date')).format("DD-MM-YYYY"));
                                f.down("[name=payment_date]").setValue(rec.get("payment_payment_date") == "1900-01-01" ? (rec.get("payment_date")==""?"":rec.get("payment_date")) : (rec.get("payment_payment_date")==""?(rec.get("payment_date")==""?"":rec.get("payment_date")):rec.get("payment_payment_date")));
                                f.setLoading(false);
                                f.down("[name=unit_unit_id]").setValue(rec.get('unit_unit_id'));
                                f.down("[name=purchaseletter_purchaseletter_id]").setValue(rec.get('purchaseletter_purchaseletter_id'));
                            }

                        }, true);
                        
                        if(c.uploadcpms_id>0){
                            gridcoadetail.down('toolbar [action=generate]').setDisabled(true);
//                            gridcoadetail.down('toolbar [action=create]').setDisabled(true);
                            gridcoadetail.down('toolbar [action=createcopy]').setDisabled(true);
                            gridcoadetail.down('toolbar [action=update]').setDisabled(false);
                            gridcoadetail.down('toolbar [action=destroy]').setDisabled(true);
                            f.down('[name=dataflow]').setReadOnly(true);
                        }
                        if(c.uploadpim_id>0){
                            gridcoadetail.down('toolbar [action=generate]').setDisabled(true);
//                            gridcoadetail.down('toolbar [action=create]').setDisabled(true);
                            gridcoadetail.down('toolbar [action=createcopy]').setDisabled(true);
                            gridcoadetail.down('toolbar [action=update]').setDisabled(false);
                            gridcoadetail.down('toolbar [action=destroy]').setDisabled(true);
                            f.down('[name=dataflow]').setReadOnly(true);
                        }
                        if(c.voucher_id>0){
//                            gridcoadetail.down('toolbar [action=generate]').setDisabled(true);
//                            gridcoadetail.down('toolbar [action=create]').setDisabled(true);
//                            gridcoadetail.down('toolbar [action=createcopy]').setDisabled(true);
                            gridcoadetail.down('toolbar [action=generatetax]').setDisabled(true);
//                            gridcoadetail.down('toolbar [action=destroy]').setDisabled(true);
//                            f.down('[name=dataflow]').setReadOnly(true);
                        }
                        if(c.uploadems_id>0){
                            gridcoadetail.down('toolbar [action=generate]').setDisabled(true);
                            gridcoadetail.down('toolbar [action=createcopy]').setDisabled(true);
                            gridcoadetail.down('toolbar [action=update]').setDisabled(true);
                            gridcoadetail.down('toolbar [action=destroy]').setDisabled(true);
                            f.down('[name=dataflow]').setReadOnly(true);
                        }
                        
                        c.visibleDescKwit();

                        if ( !rec.get('jenis_spkorsop_id') || rec.get('jenis_spkorsop_id') == '' ) {
                            f.down('[name=jenis_spkorsop_id]').setValue(1);
                        }


                        Ext.Ajax.request({
                            url: 'cashier/voucher/read',
                            method: 'POST', 
                            async: false ,
                            params: {
                                kasbank_id: rec.get('kasbank_id'),
                                mode_read: 'checkkasbankreffids'
                            },
                            success: function (response) {
                                var data = Ext.JSON.decode(response.responseText);
                                if (data.data.result == 1) {
                                    f.down("[name=kasbank_reff_voucher_id]").setValue(data.data.msg);
                                }
                            },
                            failure: function (response) {

                            }
                        }); 
                        f.down('[name=currency_word]').setValue(currency_word);
                    } else { //state create
                        
                        var tmp_pmkno = null, tgl_berlaku_pmkno = null;
                        Ext.Ajax.request({
                            url: 'cashier/common/create',
                            method: 'POST',
                            async: false,
                            params: {
                                data: Ext.encode({
                                    "project_id": 0,
                                    "pt_id": 0,
                                    "hideparam": "global_paramV2",
                                    "globalname": "ppndtp_pmk_no"
                                })
                            },
                            success: function(response) {
                                var res = Ext.JSON.decode(response.responseText);
                                var data = Ext.JSON.decode(res.data.value);
                                    
                                tmp_pmkno = data.pmkno;
                                tgl_berlaku_pmkno = data.tgl_berlaku;
                            }
                        })

                        c.loadModelAttachment(0);
                        console.log(params);
                        if (params == 'myVoucherWindow') { //buka dari collection f7 & KPR FULL PAYMENT
                            c.is_paid = 0;
                            c.is_paid = 0;
                            c.is_realized = 0;
                            c.is_posting = 0;
                            c.project_f = 0;
                            var argrid = c.getDetailargrid();
                            var gridAngsuran = c.getAngsurangrid();
                            Ext.getCmp('TabVoucherId').getComponent('tabNonlink').tab.hide();
                            var rowAngs = gridAngsuran.getSelectionModel().getSelection();
                            var recAngs = gridAngsuran.getSelectedRecord();
//                            f.rowData = recAngs;
                            if(recAngs.get("purchaseletter_isnonppn")>0 && recAngs.get("payment_paymentflag_id") != 2){
                                f.down('label[id=labelPpndtpId]').setText('UNIT PPN DTP');
                            }
                            f.down('[name=description]').setValue('');
                            var startdescriptiontemp = '';
                            var descriptiontemp      = '';
                            var enddescriptionsh3    = '';
                            var enddescriptionsh1    = '';
                            var sudahtarotanggalsp   = false;
                            var totaldipick          = 0;
                            var harganetto           = 0;
                            var totalbphtb           = 0;
                            var current_project_id   = 0;
                            var current_pt_id        = 0;
                            var purchaseletter_id    = 0;
                            rowAngs.forEach(function (recAngs) {
                                if(accounting.unformat(recAngs.get("oppaid"))<=accounting.unformat(recAngs.get("remaining_bphtb"))){
                                    totalbphtb = totalbphtb + accounting.unformat(recAngs.get("oppaid"));
                                }else{
                                    totalbphtb = totalbphtb + accounting.unformat(recAngs.get("remaining_bphtb"));
                                }
                                totaldipick = totaldipick+accounting.unformat(recAngs.get("oppaid"));
                                harganetto = accounting.unformat(recAngs.get("purchaseletter_harga_netto"));

                                current_project_id = recAngs.get("project_project_id");
                                current_pt_id = recAngs.get("pt_pt_id");
                                purchaseletter_id = recAngs.get("purchaseletter_purchaseletter_id");
                            });

                            var persentase_insentive_ppn = 0;
                            c.tools.ajax({
                                params: {
                                    project_id: current_project_id,
                                    pt_id: current_pt_id,
                                    harga_netto: harganetto,
                                    purchaseletter_id: purchaseletter_id
                                },
                                form: f,
                                success: function (data, model) {
                                    persentase_insentive_ppn = parseFloat(data.persen) / 100;
                                }
                            }, false).read('getpersentaseppndtp');
                            
                            totaldipick = Math.round((totaldipick-totalbphtb)*persentase_insentive_ppn);

                            /* 
                            if(harganetto<="2000000000"){
                                totaldipick = Math.round((totaldipick-totalbphtb)*0.1);
                            }
                            if(harganetto>"2000000000" && harganetto<="5000000000"){
                                totaldipick = Math.round((totaldipick-totalbphtb)*4.7619047618/100);
                            } 
                            */
                            rowAngs.forEach(function (recAngs) {
                            console.log(recAngs);
                                if(recAngs.get("project_subholding_id")==1 && sudahtarotanggalsp==false){
                                    $.each([ 3, 4034, 4036, 11137 ], function( index, value ) {
                                        if(recAngs.get("project_project_id")==value){

                                            descriptiontemp = descriptiontemp + ' Tanggal SPT : '+recAngs.get("purchaseletter_purchase_date")+'\n';

                                            sudahtarotanggalsp = true;
                                        }
                                    });
                                }
                                var pmkno = tmp_pmkno; //'21/PMK/2021';

                                if (tgl_berlaku_pmkno !== null && tmp_pmkno !== null) {
                                    if(Ext.Date.format(recAngs.get('duedate'), 'Y-m-d')>=tgl_berlaku_pmkno){
                                        pmkno = tmp_pmkno;
                                    } else if(Ext.Date.format(recAngs.get('duedate'), 'Y-m-d')>='2021-07-30' && Ext.Date.format(recAngs.get('duedate'), 'Y-m-d') < tgl_berlaku_pmkno){
                                        pmkno = '103/PMK.010/2021';
                                    } 
                                } else {
                                    if(Ext.Date.format(recAngs.get('duedate'), 'Y-m-d')>='2021-07-30'){
                                        pmkno = '103/PMK.010/2021';
                                    }
                                }

                                f.rowData = recAngs;
                                f.rowData.data['cluster_id'] = recAngs.get('unit_cluster_id');
                                me.loadTempModel(c, function () {
                                    me.generatesubdetail(c, 'unit_id', recAngs.get("unit_unit_id"), 'click');
                                });
                                // console.log(recAngs.get("unit_unit_id"));
                                f.loadRecord(recAngs);
                                
                                f.down('[name=subholding_id]').setValue(recAngs.get('project_subholding_id'));
                                c.project_f = recAngs.get("project_project_id");
                                f.down('[name=voucherardetail]').setDisabled(false);
                                Ext.getCmp('TabVoucherId').getComponent('tabAr').tab.show();
                                Ext.getCmp('TabVoucherId').getComponent('tabEscrow').tab.hide();

                                c.clearDetailVoucher = false;
                                //console.log(recAngs.get("payment_paymentflag_id"));
                                if (recAngs.get("payment_paymentflag_id") === 2) {
                                    c.templateCoa = 2;
                                    gridcoadetail.down('toolbar [action=generate]').setDisabled(false);
                                    argrid.down('toolbar [action=browseSchedule]').setDisabled(false);
                                    c.checkUnit(f, recAngs.get("unit_unit_id"), recAngs.get("purchaseletter_purchaseletter_id"), function () {
                                        // f.setLoading(false);
                                    }, true);
                                } else {
                                    c.checkDenda(f, recAngs.get("unit_unit_id"), function () {
                                        c.checkUnit(f, recAngs.get("unit_unit_id"), recAngs.get("purchaseletter_purchaseletter_id"), '', true);
                                        //console.log('2');
                                        //f.setLoading(false);
                                    }, true);
                                    gridcoadetail.down('toolbar [action=generate]').setDisabled(false);
                                }

                                f.down('[name=customer_name]').setReadOnly(true);
                                f.down('[name=pt_pt_id]').setReadOnly(true);
                                f.down('[name=project_project_id]').setReadOnly(true);
                                f.down('[name=kasbank_date]').setReadOnly(true);
                                if(recAngs.get("scheduletype_scheduletype")!="KPR" && (recAngs.get("payment_paymentflag_id")=='1' || recAngs.get("paymenttype_paymenttype_id")=="2") || recAngs.get("paymenttype_paymenttype_id")=="441"){
                                    f.down('[name=kasbank_reff_voucher_id]').setVisible(true);
                                    f.down('[action=browsereffvcr]').setVisible(true);
                                        f.down('[action=deletelink]').setVisible(true);
                                }else{
                                    f.down('[name=kasbank_reff_voucher_id]').setVisible(false);
                                    f.down('[action=browsereffvcr]').setVisible(false);
                                        f.down('[action=deletelink]').setVisible(false);
                                }
                                f.down('[name=amount]').setValue('0.00');
                                f.down('[name=department_department_id]').setValue(c.department_id);
                                
                                var iscgg = me.getPtCgg(recAngs.get("project_project_id"),recAngs.get("pt_pt_id"));

                                if(recAngs.get("scheduletype_scheduletype")=='TJ'){
                                        if(recAngs.get("project_project_id")==5101){//khusus vittorio tanpa project code
                                            
                                            descriptiontemp = 
                                                descriptiontemp+''+recAngs.get("unit_cluster")+' '+
                                                (f.down('[name=unit_unit_number]').getValue().length==3?"0"+f.down('[name=unit_unit_number]').getValue():f.down('[name=unit_unit_number]').getValue());
                                            if(recAngs.get("paymenttype_paymenttype_id")=='2'){
                                                descriptiontemp = descriptiontemp+ ' DENDA ';
                                            }else{
                                                descriptiontemp = descriptiontemp + ' ';
                                                descriptiontemp = descriptiontemp +
                                                (recAngs.get("scheduletype_scheduletype")=='INH'?"ANGSURAN":recAngs.get("scheduletype_description"))+' \n'
                                            }
                                            
                                            if(recAngs.get("purchaseletter_isnonppn")=="1" && recAngs.get("paymenttype_paymenttype_id")!='2'){
                                                
                                                enddescriptionsh3 = ' PPN DTP eks PMK No '+pmkno+' senilai Rp.'+accounting.formatMoney(totaldipick);
                                            };
                                        }else{
                                            if(recAngs.get("project_subholding_id")!=1){
                                                if(recAngs.get("project_subholding_id")==3 || recAngs.get("project_project_id")==4065){
                                                    descriptiontemp = descriptiontemp + ' BOOKING FEE ' + recAngs.get("termin") + ', ';
                                                    if(enddescriptionsh3==''){
                                                        enddescriptionsh3 = 'Unit '+recAngs.get("unit_unit_number")+' \n '+recAngs.get("unit_cluster")+' @ '+recAngs.get("project_name");
                                                        if(recAngs.get("purchaseletter_isnonppn")=="1" && recAngs.get("paymenttype_paymenttype_id")!='2'){
                                                            
                                                            enddescriptionsh3 = enddescriptionsh3+' PPN DTP eks PMK No '+pmkno+' senilai Rp.'+accounting.formatMoney(totaldipick);
                                                        }
                                                    }
                                                }else{
                                                    descriptiontemp = 
                                                        descriptiontemp+''+recAngs.get("project_code")+'/'+recAngs.get("unit_cluster_code")+'/'+
                                                        f.down('[name=unit_unit_number]').getValue();
                                                        if(recAngs.get("paymenttype_paymenttype_id")=='2'){
                                                            descriptiontemp = descriptiontemp+ ' DENDA ';
                                                        }else{
                                                            descriptiontemp = descriptiontemp + ' ';
                                                        }
                                                        descriptiontemp = descriptiontemp +
                                                        recAngs.get("scheduletype_description") + ' ' +
                                                        ' A.N ' +
                                                        f.down('[name=customer_name]').getValue()+' \n'
                                                    ;
                                                    if(enddescriptionsh3==''){
                                                        if(recAngs.get("purchaseletter_isnonppn")=="1" && recAngs.get("paymenttype_paymenttype_id")!='2'){

                                                            enddescriptionsh3 = enddescriptionsh3+' PPN DTP eks PMK No '+pmkno+' senilai Rp.'+accounting.formatMoney(totaldipick);
                                                        }
                                                    }
                                                }
                                            }else{
                                                if (iscgg) {
                                                    descriptiontemp += recAngs.get("customer_name") + " - ";
                                                }
                                                
                                                if(recAngs.get("paymenttype_paymenttype_id")=='2'){
                                                    descriptiontemp = descriptiontemp+ ' DENDA ';
                                                }else{
                                                    descriptiontemp = descriptiontemp + ' ';
                                                }
                                                
                                                descriptiontemp = descriptiontemp + recAngs.get("scheduletype_description") + ', ';
                                            //    if(enddescriptionsh3==''){
                                                if (iscgg) {
                                                    enddescriptionsh3 = recAngs.get("unit_cluster")+', '+ recAngs.get("unit_mh_type")+', ' +recAngs.get("unit_unit_number")+' - '+recAngs.get("pt_name");
                                                }else{
                                                    enddescriptionsh3 = recAngs.get("unit_mh_type")+', '+recAngs.get("unit_cluster")+' '+recAngs.get("unit_unit_number")+' '+recAngs.get("pt_name");
                                                }
                                                    
                                            //    }
                                            //    descriptiontemp = descriptiontemp + recAngs.get("scheduletype_description") + ', ' +
                                            //            recAngs.get("unit_mh_type")+', '+recAngs.get("unit_cluster")+' '+recAngs.get("unit_unit_number")+' '+recAngs.get("pt_name");
                                            
                                            //    if(enddescriptionsh3==''){
                                                    if(recAngs.get("purchaseletter_isnonppn")=="1" && recAngs.get("paymenttype_paymenttype_id")!='2'){

                                                        enddescriptionsh3 = enddescriptionsh3+' PPN DTP eks PMK No '+pmkno+' senilai Rp.'+accounting.formatMoney(totaldipick);
                                                    }
                                            //    }
                                            }
                                        }
                                    f.down('[name=datatype]').setReadOnly(true);
                                }else{ // KPR FULL PAYMENT
                                    // SET PAYMENT TYPE = PENCAIRAN KHUSUS KPR
                                    if (recAngs.get("scheduletype_scheduletype")=='KPR') {
                                        f.down('[name=payment_paymentmethod_id]').setValue(5);
                                        // f.down('[name=payment_paymentmethod_id]').setReadOnly();
                                    }
                                    if(recAngs.get("project_project_id")==5101){
                                        descriptiontemp = 
                                        descriptiontemp+''+recAngs.get("unit_cluster")+' '+
                                        (f.down('[name=unit_unit_number]').getValue().length==3?"0"+f.down('[name=unit_unit_number]').getValue():f.down('[name=unit_unit_number]').getValue());
                                        if(recAngs.get("paymenttype_paymenttype_id")=='2'){
                                            descriptiontemp = descriptiontemp+ ' DENDA ';
                                        }else{
                                            descriptiontemp = descriptiontemp + ' ';
                                            descriptiontemp = descriptiontemp +
                                            (recAngs.get("scheduletype_scheduletype")=='INH'?"ANGSURAN":recAngs.get("scheduletype_description")) + ' ' +
                                            recAngs.get("termin")+' \n'
                                            ;
                                        }
                                        if(enddescriptionsh3==''){
                                            if(recAngs.get("purchaseletter_isnonppn")=="1" && recAngs.get("paymenttype_paymenttype_id")!='2'){
                                                
                                                enddescriptionsh3 = enddescriptionsh3+' PPN DTP eks PMK No '+pmkno+' senilai Rp.'+accounting.formatMoney(totaldipick);
                                            }
                                        }
                                    }else{
                                        if(recAngs.get("project_subholding_id")!=1){
                                            if(recAngs.get("project_subholding_id")==3 || recAngs.get("project_project_id")==4065){
                                                if(recAngs.get("paymenttype_paymenttype_id")=='2'){
                                                    descriptiontemp = descriptiontemp+ ' DENDA ';
                                                }else{
                                                    descriptiontemp = descriptiontemp + ' ';
                                                }
                                                descriptiontemp = descriptiontemp +recAngs.get("scheduletype_description")+' ' + recAngs.get("termin") + ', ';
                                                
                                                if(enddescriptionsh3==''){
                                                    enddescriptionsh3 = 'Unit '+recAngs.get("unit_unit_number")+' \n '+recAngs.get("unit_cluster")+' @ '+recAngs.get("project_name");
                                                    if(recAngs.get("purchaseletter_isnonppn")=="1" && recAngs.get("paymenttype_paymenttype_id")!='2'){
                                                        
                                                        enddescriptionsh3 = enddescriptionsh3+' PPN DTP eks PMK No '+pmkno+' senilai Rp.'+accounting.formatMoney(totaldipick);
                                                    }
                                                }
                                            }else{
                                                descriptiontemp = 
                                                descriptiontemp+''+recAngs.get("project_code")+'/'+recAngs.get("unit_cluster_code")+'/'+
                                                f.down('[name=unit_unit_number]').getValue();
                                                if(recAngs.get("paymenttype_paymenttype_id")=='2'){
                                                    descriptiontemp = descriptiontemp+ ' DENDA ';
                                                }else{
                                                    descriptiontemp = descriptiontemp + ' ';
                                                }
                                                descriptiontemp = descriptiontemp +
                                                (recAngs.get("scheduletype_scheduletype")=='INH'?"ANGSURAN":recAngs.get("scheduletype_description")) + ' ' +
                                                recAngs.get("termin") + ' A.N ' +
                                                f.down('[name=customer_name]').getValue()+' \n'
                                                ;
                                                if(enddescriptionsh3==''){
                                                    if(recAngs.get("purchaseletter_isnonppn")=="1" && recAngs.get("paymenttype_paymenttype_id")!='2'){
                                                        
                                                        enddescriptionsh3 = enddescriptionsh3+' PPN DTP eks PMK No '+pmkno+' senilai Rp.'+accounting.formatMoney(totaldipick);
                                                    }
                                                }
                                            }
                                        }else{
                                            //sini ji
                                            var ptundercg = [4065,4029,108,2017,2014,84,4030,2090,4033,2015,5102,2,11124,2054,4060];
                                            if(jQuery.inArray(recAngs.get("project_project_id"), ptundercg)!=-1){ //Jika under CG
                                                if(recAngs.get("paymenttype_paymenttype_id")=='2'){
                                                    if(recAngs.get("project_project_id")!=84){
                                                        descriptiontemp = descriptiontemp+'DENDA ';
                                                        descriptiontemp = descriptiontemp +(recAngs.get("scheduletype_scheduletype")=='INH'?"ANGSURAN":recAngs.get("scheduletype_description"))+' ' + recAngs.get("termin") + ', ';
                                                    }else{
                                                        //FORMAT BARU CGG
                                                        if (iscgg) {
                                                            descriptiontemp += recAngs.get("customer_name") + " - ";
                                                        }

                                                        descriptiontemp = 'DENDA ';
                                                    }
                                                }else{
                                                    
                                                    if(f.down("[name=is_f9]").getValue()=="1"){
                                                        descriptiontemp = descriptiontemp +recAngs.get("customer_name")+', '+ 'Pencairan KPR Full Payment, ';
                                                    }else{
                                                        if (iscgg) {
                                                            descriptiontemp = recAngs.get("customer_name") + " - ";
                                                        }
                                                    }

                                                    if(recAngs.get("oppaid")!=recAngs.get("amount") && accounting.unformat(recAngs.get("oppaid"))>=100000 && ((accounting.unformat(recAngs.get("oppaid"))-accounting.unformat(recAngs.get("remaining_pay")))>=100000||(accounting.unformat(recAngs.get("oppaid"))-accounting.unformat(recAngs.get("remaining_pay")))==0)){
                                                        descriptiontemp = descriptiontemp + ' TAMBAHAN ';
                                                    }
                                                    descriptiontemp = descriptiontemp + ' ';
                                                    if(accounting.unformat(recAngs.get("oppaid"))>=100000 || gridAngsuran.getSelectionModel().getCount()==1){
                                                        if(recAngs.get("scheduletype_scheduletype")=="BLG"){
                                                            descriptiontemp = descriptiontemp + recAngs.get("scheduletype_description") + ' KE '+recAngs.get("termin")+', ';
                                                        }else{
                                                            descriptiontemp = descriptiontemp + (recAngs.get("scheduletype_scheduletype")=='INH'?"ANGSURAN":recAngs.get("scheduletype_description")) + ' '+recAngs.get("termin")+', ';
                                                        }
                                                    }
                                                }
                                                    if(recAngs.get("scheduletype_scheduletype")=="BLG"){
                                                        //FORMAT BARU CGG
                                                        if (iscgg) {
                                                            enddescriptionsh3 ='- Rp. '+accounting.formatMoney(f.down("[name=sum_pay]").getValue())+' '+recAngs.get("unit_cluster")+', '+  recAngs.get("unit_mh_type") +' , '+ recAngs.get("unit_unit_number")+' - '+recAngs.get("pt_name");
                                                        }else{
                                                            enddescriptionsh3 = recAngs.get("unit_mh_type")+' Rp. '+accounting.formatMoney(f.down("[name=sum_pay]").getValue())+' '+recAngs.get("unit_cluster")+' '+recAngs.get("unit_unit_number")+' '+recAngs.get("pt_name");
                                                        }
                                                    }else{
                                                        //FORMAT BARU CGG
                                                        if (iscgg) {
                                                            enddescriptionsh3 = ' - Rp. '+accounting.formatMoney(f.down("[name=sum_pay]").getValue())+' '+recAngs.get("project_name")+' - ' +', '+recAngs.get("unit_cluster")+', '+ recAngs.get("unit_mh_type") + ', ' +recAngs.get("unit_unit_number")+' - '+recAngs.get("pt_name");
                                                        }else{
                                                            enddescriptionsh3 = recAngs.get("unit_mh_type")+', Rp. '+accounting.formatMoney(f.down("[name=sum_pay]").getValue())+' '+recAngs.get("project_name")+' - '+recAngs.get("unit_cluster")+' '+recAngs.get("unit_unit_number")+' '+recAngs.get("pt_name");
                                                        }
                                                    }
                                                    if(recAngs.get("purchaseletter_isnonppn")=="1" && recAngs.get("paymenttype_paymenttype_id")!='2'){
                                                        
                                                        enddescriptionsh3 = enddescriptionsh3+'\n PPN DTP eks PMK No '+pmkno+' senilai Rp.'+accounting.formatMoney(totaldipick);
                                                    }
                                            }else{
                                                if(recAngs.get("paymenttype_paymenttype_id")=='2'){
                                                    //FORMAT BARU CGG
                                                    if (iscgg) {
                                                        // descriptiontemp = descriptiontemp + recAngs.get("customer_name") + " - " + 'DENDA ';
                                                        startdescriptiontemp = recAngs.get("customer_name") + " - ";
                                                    }else{
                                                        // descriptiontemp = descriptiontemp + ' DENDA ';
                                                        startdescriptiontemp = startdescriptiontemp + descriptiontemp + ' DENDA ';
                                                    }
                                                }else{
                                                    //FORMAT BARU CGG
                                                    if (iscgg) {
                                                        // descriptiontemp = descriptiontemp + recAngs.get("customer_name") + " - ";
                                                        startdescriptiontemp = recAngs.get("customer_name") + " - ";
                                                    }else{
                                                        // descriptiontemp = descriptiontemp + ' ';
                                                        startdescriptiontemp = startdescriptiontemp + descriptiontemp + ' ';
                                                    }
                                                }

                                                if(recAngs.get("scheduletype_scheduletype")=="BLG"){
                                                    descriptiontemp = descriptiontemp + recAngs.get("scheduletype_description") + ' KE '+(recAngs.get("termin")?recAngs.get("termin"):recAngs.get("schedule_termin"))+', ';
                                                }else{
                                                    if(f.down("[name=is_f9]").getValue()=="1"){
                                                        descriptiontemp = descriptiontemp +recAngs.get("customer_name")+', '+  'Pencairan KPR Full Payment, ';
                                                    }
                                                    if(recAngs.get("scheduletype_scheduletype")=="INH"){
                                                        descriptiontemp = descriptiontemp + (recAngs.get("scheduletype_scheduletype")=='INH'?"ANGSURAN":recAngs.get("scheduletype_description")) + ' '+recAngs.get("termin")+', ';
                                                    }else{
                                                        descriptiontemp = descriptiontemp + "DENDA " + (recAngs.get("scheduletype_scheduletype")=='INH'?"ANGSURAN":recAngs.get("scheduletype_description")) + ' '+recAngs.get("termin")+', ';
                                                    }
                                                }
                                                
                                                if(recAngs.get("scheduletype_scheduletype")=="BLG"){
                                                    //FORMAT BARU CGG
                                                    if (iscgg) {
                                                        enddescriptionsh3 = ' '+(f.down("[name=kwitansi_date]").getValue()!="" && f.down("[name=kwitansi_date]").getValue()!=null?moment(f.down("[name=kwitansi_date]").getValue()).format("DD-MM-YYYY"):'')+' Rp. '+accounting.formatMoney(f.down("[name=sum_pay]").getValue())+',- '+recAngs.get("unit_cluster")+' , '+recAngs.get("unit_mh_type") + ", "+ recAngs.get("unit_unit_number")+' - '+recAngs.get("pt_name");
                                                    }else{
                                                        enddescriptionsh3 = recAngs.get("unit_mh_type")+' '+(f.down("[name=kwitansi_date]").getValue()!="" && f.down("[name=kwitansi_date]").getValue()!=null?moment(f.down("[name=kwitansi_date]").getValue()).format("DD-MM-YYYY"):'')+' Rp. '+accounting.formatMoney(f.down("[name=sum_pay]").getValue())+',- '+recAngs.get("unit_cluster")+' '+recAngs.get("unit_unit_number")+' '+recAngs.get("pt_name");
                                                    }
                                                    
                                                }else{
                                                    //FORMAT BARU CGG
                                                    if (iscgg) {
                                                        enddescriptionsh3 = recAngs.get("unit_cluster")+', '+recAngs.get("unit_mh_type")+', '+recAngs.get("unit_unit_number")+' - '+recAngs.get("pt_name");
                                                    }else{
                                                        enddescriptionsh3 = recAngs.get("unit_mh_type")+', '+recAngs.get("unit_cluster")+' '+recAngs.get("unit_unit_number")+' '+recAngs.get("pt_name");
                                                    }
                                                }
                                                if(recAngs.get("purchaseletter_isnonppn")=="1" && recAngs.get("paymenttype_paymenttype_id")!='2'){
                                                    
                                                    enddescriptionsh3 = enddescriptionsh3+' PPN DTP eks PMK No '+pmkno+' senilai Rp.'+accounting.formatMoney(totaldipick);
                                                }
                                            }
                                        }
                                    }
                                    f.down('[name=datatype]').setReadOnly(false);
                                }
                                if(recAngs.get("project_project_id")=="4065"){ //Jika under CG
                                    f.down("[name=description]").setValue(startdescriptiontemp+' '+descriptiontemp+' '+enddescriptionsh3);
                                    f.down("[name=receipt_notes]").setValue(startdescriptiontemp+' '+descriptiontemp+' '+enddescriptionsh3);
                                }else{
                                    f.down("[name=description]").setValue(startdescriptiontemp+' '+descriptiontemp+' \n '+enddescriptionsh3);
                                    f.down("[name=receipt_notes]").setValue(startdescriptiontemp+' '+descriptiontemp+' \n '+enddescriptionsh3);
                                }
                                f.down('[action=browseData]').setDisabled(true);
                                f.down('[name=dataflow]').setReadOnly(true);
                                f.down("[name=payment_receipt_no]").setValue('');

                            });

                            if(c.paymenthelperf7>0){
                                argrid.down("toolbar [name=paymentall]").setValue(accounting.formatMoney(c.paymenthelperf7));
                                c.voucherAr.paymentTextFieldOnBlur(c);
                                c.voucherAr.getTotalSumAr(c);
                                f.down("[name=amount]").setValue(accounting.formatMoney(c.totalSumAr));
                                //generateCoa: function (c, template, state, kasbank_id, paymentId, callback, loading) {
                                
                                c.voucherDetail.generateCoa(c, c.templateCoa, 'click');
                            }
                            c.visibleDescKwit();
//                            var ptid = f.down('[name=pt_pt_id]').getValue();
//                            var project = f.down('[name=project_project_id]').getValue();
//                            c.projectId = project;
//                            c.ptId = ptid;
                            c.generateKwitansiNumber();
                        } else if (params == 'myEscrowWindow') {// buka dari escrow f4
                            Ext.getCmp('TabVoucherId').getComponent('tabNonlink').tab.hide();
                            c.is_paid = 0;
                            c.is_realized = 0;
                            c.is_posting = 0;
                            var gridEscrow = c.getEscrowgrid();
                            var rowEsc = gridEscrow.getSelectionModel().getSelection();
                            var recEsc = gridEscrow.getSelectedRecord();
                            f.loadRecord(recEsc);
                            f.down('[name=subholding_id]').setValue(recEsc.get('project_subholding_id'));
                            c.clearDetailVoucher = false;
                            c.project_f = 0;
                            c.project_f = recEsc.get("project_project_id");
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
                            // f.down('[name=datatype]').setReadOnly(true);
                            f.down('[name=dataflow]').setReadOnly(true);
                            f.down("[name=payment_receipt_no]").setValue('');
                            c.voucherAr.getSelectedEscrow(c, function () {

                                // Ext.getCmp('TabVoucherId').setActiveTab('tabDetailVoucher');
                                c.voucherDetail.generateCoa(c, c.templateCoa, 'click');
                                //console.log('sd');
                                //console.log(gridcoadetail.getStore());
                                f.down("[name=amount]").setValue(c.totalTemp);
                                f.down("[name=description]").setValue(c.notes);
                                f.down("[name=receipt_notes]").setValue(c.notes);
                                f.down("[name=payment_paymentmethod_id]").setValue(5);
                                c.voucherAr.setSumDetailArDetail(c);
                                me.loadTempModel(c, function () {
                                    me.generatesubdetail(c, 'unit_id', recEsc.get("unit_unit_id"),'');
                                });
                            });
                            c.visibleDescKwit();
                            c.generateKwitansiNumber();
                        } else {
                            c.paymentflag_id = 0;
                            //f.down('[name=department_department_id]').setValue(c.department_id);

                            var project = f.down('[name=project_project_id]').getValue();
                            if (!f.down("[name=pt_pt_id]").getValue()) {
                                f.setLoading(false);
                            }
                            c.projectId = project;
                            c.ptId = ptid;
                            var fs = c.getFormsearch();
                            var pt_formsearh = fs.down('[name=pt_id]').getValue();
                            var state = 'create';
                            if (!pt_formsearh) {
                                var ptid = fs.down("[name=pt_id]").getValue();
                                c.ptId = ptid;
                            } else {
                                c.ptId = pt_formsearh;

                            }
                            f.down("[name=pt_pt_id]").setValue(c.pt_id);

                        }

                    }


                } catch (err) {
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

            }
        }).read('detail');
    },
    generateCoa: function (c, template, state, kasbank_id, paymentId, callback, loading) {
        var me = this;
        var f = c.getFormdata();
        var g = c.getDetailvouchergrid();
        var totalpayment = accounting.unformat(f.down("[name=amount]").getValue());
        var ps = f.rowData;
        var receipt = f.down('[name=payment_receipt_no]').getValue();
        var unitid = 0;
        var schedule_id = 0;
        me.checkDetailGridBeforeGenerate(c);
        if (ps) {
            var unitid = ps.get('unit_unit_id');
            var schedule_id = c.schedule_id;
        } else {
            unitid = c.unit_id;
        }
        if (c.amountSelected!=null) {
            me.disableSave(c, true);
            f.setLoading("Loading detail voucher");
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
                    if (!loading) {
                        f.setLoading(false);
                    }
                    me.disableSave(c, false);
                    g.attachModel(op);
//                    console.log(rec);
                    me.sumDetail(c);

                    if (typeof callback === "function") {
                        callback();
                    }
                    me.setSumDetail(c);
                    
                    
                    if (c.amountdnSelected) {
                        
                            c.tools.ajax({
                            params: {
                                    template_id: 11,
                                    amount: c.amountdnSelected,
                                    kasbank_id: kasbank_id,
                                    unit_id: unitid,
                                    schedule_id: c.dnschedule_id,
                                    purchaseletter_pencairankpr_id: c.purchaseletter_pencairankpr_id,
                                    paymenttype_id: c.paymenttype_id,
                                    pt_id: c.ptId,
                                    project_id: c.projectId,
                                    module: 'voucher',
                                    page: '1',
                                    limit: '25',
                                    start: '0',
                                    receipt: receipt
                                },
                                form: f,
                                success: function (data, model) {
                                    try {
                                        var indexdata = c.getindexdetailcoax();
                                        data.forEach(function (r) {
                                            g.getStore().add({
                                                remarks: r.voucherdetail.remarks,
                                                amount: r.voucherdetail.amount,
                                                indexdata: indexdata+1,
                                                coa_coa_id: r.coa.coa_id,
                                                coa_coa: r.coa.coa,
                                                coa_name: r.coa.name,
                                                kelsub_description: r.kelsub.description,
                                                kelsub_kelsub: r.kelsub.kelsub,
                                                kelsub_kelsub_id: r.kelsub.kelsub_id,
                                            });
                                            g.getStore().commitChanges();
                                        });
                                        me.sumDetail(c);

                                        me.setSumDetail(c);


                                        var unit_id = f.down('[name=unit_unit_id]').getValue();
                                        if (unit_id) {
                                            me.generatesubdetail(c, 'unit_id', unit_id, state);
                                        }
                                    } catch (err) {
                                        console.log(err.message);
                                        me.tools.alert.warning("Failed to generate debit note coa.");
                                    }


                                }
                            }).read('generatetemplatecoa');
                    }

                    var unit_id = f.down('[name=unit_unit_id]').getValue();
                    if (unit_id) {
                        me.generatesubdetail(c, 'unit_id', unit_id, state);
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
        var grid = c.getDetailvouchergrid();
        var row = grid.getSelectionModel().getSelection();
        var rec = grid.getSelectedRecord();
        var is_ems = 0;
        var is_cpms = 0;
        var is_pim = 0;
        Ext.each(row, function (rec) {
            console.log(c);
            console.log(rec);
            if(rec.get('is_ems')>0){
                is_ems = rec.get('is_ems');
            } 
            if(rec.get('is_pim')>0){
                is_pim = rec.get('is_pim');
            } 
            if(rec.get('is_cpms')>0){
                is_cpms = rec.get('is_cpms');
            } 
        });
//        console.log(c.is_posting);
//        console.log(c.is_realized);
        // if (!c.is_closed) {
        if (c.is_posting) {
            grid.down('[action=update]').setDisabled(true);
            grid.down('[action=destroy]').setDisabled(true);
            grid.down('[action=createcopy]').setDisabled(true);
        } else if (c.is_realized) {
            grid.down('[action=destroy]').setDisabled(false);
            grid.down('[action=createcopy]').setDisabled(false);
            grid.down('[action=update]').setDisabled(row.length != 1);
            //Rizal 7 Nov 2019
            if(c.uploadcpms_id>0){
                if(is_cpms>0){
                    grid.down('[action=destroy]').setDisabled(true);
                }else{
                    grid.down('[action=destroy]').setDisabled(false);
                }
//                grid.down('[action=update]').setDisabled(true);
            }
            if(c.uploadpim_id>0){
                if(is_pim>0){
                    grid.down('[action=destroy]').setDisabled(true);
                }else{
                    grid.down('[action=destroy]').setDisabled(false);
                }
//                grid.down('[action=update]').setDisabled(true);
            }
            if(c.uploadems_id>0){
                if(is_ems>0){
                    grid.down('[action=update]').setDisabled(true);
                    grid.down('[action=destroy]').setDisabled(true);
                }else{
                    grid.down('[action=destroy]').setDisabled(false);
                    grid.down('[action=update]').setDisabled(false);
                }
            }
            //
        } else {
            grid.down('[action=createcopy]').setDisabled(row.length != 1);
            grid.down('[action=destroy]').setDisabled(row.length != 1);
            grid.down('[action=update]').setDisabled(row.length != 1);

            if ( row.length == 0 ) {
                grid.down('[action=createcopy]').setDisabled(true);
                grid.down('[action=destroy]').setDisabled(true);
                grid.down('[action=update]').setDisabled(true);
            }else{
                if (row.length > 1) {
                    grid.down('[action=createcopy]').setDisabled(true);
                    grid.down('[action=destroy]').setDisabled(true);
                    grid.down('[action=update]').setDisabled(true);
                }else{
                    //Rizal 7 Nov 2019
                    if(c.uploadcpms_id>0){
                        if(is_cpms>0){
                            grid.down('[action=destroy]').setDisabled(true);
                        }else{
                            grid.down('[action=destroy]').setDisabled(false);
                        }
                        grid.down('[action=createcopy]').setDisabled(true);
                    }
                    if(c.uploadpim_id>0){
                        if(is_pim>0){
                            grid.down('[action=destroy]').setDisabled(true);
                        }else{
                            grid.down('[action=destroy]').setDisabled(false);
                        }
                        grid.down('[action=createcopy]').setDisabled(true);
                    }
        //            if(c.voucher_id>0){
        //                grid.down('[action=createcopy]').setDisabled(true);
        //                grid.down('[action=destroy]').setDisabled(true);
        //                grid.down('[action=create]').setDisabled(true);
        //            }
                    if(c.uploadems_id>0){
                        if(is_ems>0){
                            // grid.down('[action=update]').setDisabled(true);
                            // PERUBAHAN KALAU VOUCHER EMS SEKARANG BISA EDIT DESCRIPTION
                            grid.down('[action=update]').setDisabled(false);
                            grid.down('[action=destroy]').setDisabled(true);
                        }else{
                            grid.down('[action=destroy]').setDisabled(false);
                            grid.down('[action=update]').setDisabled(false);
                        }
                    }
                    //                    
                }
            }
        }

        // }
    },
    gridSelectionChangedetailsubcoaGrid: function (c) {
        var me = this;
        var fd = c.getFormcoadetail();
        var grid = c.getGridsubdetail();
        var row = grid.getSelectionModel().getSelection();
        var rec = grid.getSelectedRecord();
        
        if (c.paymentflag_id === 0 || c.paymentflag_id == '0' || c.paymentflag_id == '') {
            
//            if(c.voucher_id>0){
//                grid.down('[action=create]').setDisabled(true);
//                grid.down('[action=destroy]').setDisabled(true);
//            }else{
                grid.down('[action=update]').setDisabled(row.length != 1);
                grid.down('[action=destroy]').setDisabled(row.length < 1);
//            }
        }
        if(fd.down("[name=is_ems]").getValue()>0){
            grid.down('[action=create]').setDisabled(true);
            grid.down('[action=update]').setDisabled(true);
            grid.down('[action=destroy]').setDisabled(true);
        }else{

//            if(c.voucher_id>0){
//                grid.down('[action=create]').setDisabled(true);
//                grid.down('[action=destroy]').setDisabled(true);
//            }else{
                grid.down('[action=create]').setDisabled(false);
                grid.down('[action=update]').setDisabled(row.length != 1);
                grid.down('[action=destroy]').setDisabled(row.length < 1);
//            }
        }
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
        f.down('[action=savenew],[action=saveprint],[action=save]').setDisabled(param);
        f.down('[action=saveprint]').setDisabled(param);
        f.down('[action=save]').setDisabled(param);
    },
    loadTempModel: function (c, callback) {
        var me = this;
        var f = c.getFormdata();
        c.localStore.subdetailcoa = c.instantStore({
            id: c.controllerName + 'SubDetailCoaStoreTemp',
            extraParams: {
                mode_read: 'subdetailcoa',
                module: 'voucher'
            },
            idProperty: 'vouchersubdetail_id'
        });
        var state = f.up("window").state;
        //Rizal 17 Juli 2019 //dicomment karna bugs sub
        if (state=='create'){
            c.localStore.subdetailcoa.loadData([],false);
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
            
            c.localStore.subdetailcoa.loadData([],false);
        }
//        else{
//            c.localStore.subdetailcoa.loadData([],false);
//            c.localStore.subdetailcoa.load({
//                params: {
//                    voucherdetail_id: 0
//                },
//                callback: function (rec, op) {
//                    c.attachModel(op, c.localStore.subdetailcoa, true);
//                }
//            });
//            c.localStore.subdetailcoa.loadData([],false);
//        }
    },
    restoreTempToSubGrid: function (c, indexdata) {
        var me = this;
        var subgrid = c.getGridsubdetail();
        var substore = c.getGridsubdetail().getStore();
        var tempstoresub = c.localStore.subdetailcoa;
        //console.log(tempstoresub);
        var f = c.getFormcoadetail();
        var sum = 0;
        subgrid.setLoading('Please wait');
        //me.loadModelSubCoaDetail(c, function () {

//
//        var countrec = 0;
//        tempstoresub.each(function (rec) {
//            var datasub = rec['data'];
//            if (datasub.voucherdetail_indexdata == indexdata) {
//                countrec += 1;
//                return true;
//            }
//        });


//        tempstoresub.clearFilter(true);
//
//        tempstoresub.filterBy(function (rec, id) {
//            var datasub = rec['data'];
//            if (datasub.voucherdetail_indexdata == indexdata) {
//                sum += parseFloat(accounting.unformat(datasub.amount));
//                return true;
//            } else {
//                return false;
//            }
//        });
////            if(tempstoresub.getCount()>0) {
////                  substore.loadData([], false);
////            }
//        //console.log(tempstoresub.getCount());
//        tempstoresub.each(function (rec) {
//            substore.add(rec);
//
//        });








        f.down("[name=amount]").setValue(accounting.formatMoney(sum));
        subgrid.setLoading(false);
    },
    sumDetail: function (c) {
        var me = this;
        var f = c.getFormdata();
        var sum = 0;
        var total = 0;
        var store = c.getDetailvouchergrid().getStore();
        
        var paymenttype_id = '';
        var gridvoucheres = c.getDetailescrowgrid();
        var storevoucheres = gridvoucheres.getStore();
        var purchaseletter_pencairankpr_id = '';
        
        var gridvoucherop = c.getOtherpaymentgrid();
        var storevoucherop = gridvoucherop.getStore();
            if(c.templateCoa==4){
                var sch = '';
                storevoucheres.each(function (rec) {
                    sch += rec.get("schedule_schedule_id") + "~";
                    total += parseFloat(rec.get('remaining_pay'));
                        purchaseletter_pencairankpr_id +=
                                rec.get("scheduleescrow_purchaseletter_pencairankpr_id") ? rec.get("scheduleescrow_purchaseletter_pencairankpr_id") + "~" :  0 + "~";
//                        console.log(rec);
                });
                c.schedule_id=sch;
                c.paymenttype_id=paymenttype_id;
                c.purchaseletter_pencairankpr_id = purchaseletter_pencairankpr_id;
            }
            if(c.paymentflag_id==5){

                storevoucherop.each(function (rec) {
                    total += parseFloat(rec.get('remaining_pay'));
                        paymenttype_id +=
                                rec.get("paymenttype_id") ? rec.get("paymenttype_id") + "~" : (rec.get("paymenttype_paymenttype_id") ? rec.get("paymenttype_paymenttype_id") + "~" : 0 + "~");
//                        console.log(rec);

                });
                
                c.paymenttype_id=paymenttype_id;
            }
//            console.log(c.paymentflag_id);
            
        store.each(function (rec) {
            sum += parseFloat(accounting.unformat(rec.get('amount')));
        });
        f.down("[name=amount]").setValue(accounting.formatMoney(sum));
        me.setSumDetail(c);
    },
    changePayment: function (c, val) {
        var me = this;
        var f = c.getFormdata();
        var x = f.down("[name=voucherprefix_voucherprefix_id]").getStore().findRecord("voucherprefix_id", f.down("[name=voucherprefix_voucherprefix_id]").getValue(),0,false,true,true);
        
        if (val === 7 || val === 4) {//transfer
            f.down('[name=bank_name]').setVisible(true);
            f.down('[name=payment_date]').setVisible(true);
            f.down('[name=cheque_cheque_no]').setVisible(false);
            f.down('[action=browseCheque]').setVisible(false);
            f.down('[name=bank_name]').setValue('');
            if(x){
                if(x.data['bank_name']!='' && x.data['bank_name']!=null){
                    f.down("[name=bank_name]").setValue(x.data['bank_name']);
                }else{
                    f.down("[name=bank_name]").setValue("");
                }
            }
            f.down('[name=payment_date]').setValue('');
            f.down('[name=cheque_cheque_no]').setValue('');
            $("#fd_payment_date label").html("Payment Date");
            f.down('[name=cheque_cheque_id]').setValue('');
        } else if (val === 2) {//giro
            f.down('[name=bank_name]').setVisible(false);
            f.down('[name=payment_date]').setVisible(true);
            f.down('[name=cheque_cheque_no]').setVisible(true);
            $("#fd_payment_date label").html("Issued Date");
            f.down('[action=browseCheque]').setVisible(true);
        } else {
            f.down('[name=bank_name]').setVisible(false);
            f.down('[name=payment_date]').setVisible(false);
            f.down('[name=cheque_cheque_no]').setVisible(false);
            f.down('[action=browseCheque]').setVisible(false);
            f.down('[name=bank_name]').setValue('');
            f.down('[name=payment_date]').setValue('');
            f.down('[name=cheque_cheque_no]').setValue('');
            f.down('[name=cheque_cheque_id]').setValue('');
            f.down('[name=payment_date]').setVisible(true);
            $("#fd_payment_date label").html("Payment Date");
        }
        c.voucherAr.getTotalSumAr(c);
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
        } else {
            grid.down('[action=select]').setDisabled(true);
        }
    },
    gridSelectionChangeChequeOutGrid: function (c) {
        var me = this;
        var grid = c.getChequeoutgrid();
        var row = grid.getSelectionModel().getSelection();
        var rec = grid.getSelectedRecord();
        var c = grid.getSelectionModel().getCount();
        grid.down('[action=select]').setDisabled(true);
        if (c === 1) {
            grid.down('[action=select]').setVisible(true);
            grid.down('[action=select]').setDisabled(false);
        } else {
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
        var valid = 1;
        var is_kprparsial = Ext.getCmp('iskprparsial').getValue();
        Ext.each(row, function (item) {
            var cair_date = moment(item.get('pencairan_date')).format("DD-MM-YYYY");
            if (is_kprparsial!=1)
            {
                if (item.get('pencairan_date')) {
                    if(item.get('vid')!='' && item.get('vid')!=undefined){
                        valid = 0;
                    }else{
                        if (cair_date == "01-01-1900") {
                            if(valid!=0){
                                valid = 1;
                            }
                        } else {
                            valid = 0;
                        }
                    }
                } else {
                    //console.log(item.get('vid'));
                    if(item.get('vid')!='' && item.get('vid')!=undefined){
                        valid = 0;
                    }else{
                            if(valid!=0){
                                valid = 1;
                            }
                    }
                }
            }else{
                if(item.get('vidkprparsial')!='' && item.get('vidkprparsial')!=undefined){
                    valid = 0;
                }else{
                    if(c===1){
                            if(valid!=0){
                                valid = 1;
                            }
                    }else{
                        valid=0;
                    }
                }
            }
        });
        if (valid === 1) {
            if(Ext.getCmp('iskprparsial').getValue()==1){
                grid.down('[action=selectesc]').setDisabled(false);
            }else{
                grid.down('[action=select]').setDisabled(false);
            }
        } else {
            if(Ext.getCmp('iskprparsial').getValue()==1){
                grid.down('[action=selectesc]').setDisabled(true);
            }else{
                grid.down('[action=select]').setDisabled(true);
            }
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
                } catch (err) {
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
        } else {
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
        var project = f.down("[name=project_project_id]").getValue();
        var department = f.down("[name=department_department_id]").getValue();
        c.getCustomRequestComboboxV2('getcashflowbycoa', coaId, pt, project, 'cashflow_setupcashflow_id_hidden', 'cashflow', ['cashflowtype', 'grouptype'], fd, '', function () {
            if (typeof cb === "function") {
                cb();
            }

        },'','',department);
        c.getCustomRequestComboboxV2('getcashflow', coaId, pt, project, 'cashflow_setupcashflow_id', 'cashflow', ['cashflowtype', 'grouptype'], fd, '', function () {
            if (typeof cb === "function") {
                cb();
            }

        },'','',department);
    },
    cashflowChange: function (c, val) {
        var me = this;
        var f = c.getFormcoadetail();
        
        var sc = f.down("[name=cashflow_setupcashflow_id]").getStore();
        sc.clearFilter();
        sc.filter('setupcashflow_id', val, true, false);
//        var selectedCF = c.tools.comboHelper(f.down("[name=cashflow_setupcashflow_id]")).getField('setupcashflow_id', 'cashflowtype_cashflowtype');
//        var selectedCFtype = c.tools.comboHelper(f.down("[name=cashflow_setupcashflow_id]")).getField('setupcashflow_id', 'cashflowtype_cashflowtype_id');
        //console.log(selectedCF);
        f.down("[name=cashflowtype_cashflowtype]").setValue(sc.data['cashflowtype_cashflowtype']);
        f.down("[name=cashflowtype_cashflowtype_id]").setValue(sc.data['cashflowtype_cashflowtype_id']);
    },
    //Rizal 17 Juli 2019 //dicomment karna double fungsi nya
//    subglChange: function (c) {
//        var me = this;
//        var f = c.getFormsubcoadetail();
//        var selectedsubgl = c.tools.comboHelper(f.down("[name=subgl_subgl_id]")).getField('subgl_id', 'code');
//        var code1 = c.tools.comboHelper(f.down("[name=subgl_subgl_id]")).getField('subgl_id', 'code1');
//        var code2 = c.tools.comboHelper(f.down("[name=subgl_subgl_id]")).getField('subgl_id', 'code2');
//        var code3 = c.tools.comboHelper(f.down("[name=subgl_subgl_id]")).getField('subgl_id', 'code3');
//        var code4 = c.tools.comboHelper(f.down("[name=subgl_subgl_id]")).getField('subgl_id', 'code4');
////        console.log('asda');
////        console.log(selectedsubgl);
//        f.down("[name=subgl_code]").setValue(selectedsubgl);
//        f.down("[name=subgl_code1]").setValue(code1);
//        f.down("[name=subgl_code2]").setValue(code2);
//        f.down("[name=subgl_code3]").setValue(code3);
//        f.down("[name=subgl_code4]").setValue(code4);
//    },
            getSubgl: function (c) {
                var me = this;
                var me = this;
                var fd = c.getFormcoadetail();
                var f = c.getFormdata();
                var pt = f.down("[name=pt_pt_id]").getValue();
//        c.getCustomRequestCombobox('getsubgl', c.kelsub_id, pt, '', 'subgl_subgl_id', 'subgl', '', fd);
//        c.tools.ajax({
//            params: {
//                module: c.controllerName,
//                kelsub_id: c.kelsub_id,
//                pt_id: pt
//            },
//            success: function (data, model) {
//                try {
//                    c.tools.wesea(data, f.down("[name=subgl_subgl_id]")).comboBox();
//                } catch (err) {
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
        if (c.is_posting) {
            me.disableSave(c, true);
        }
    },
    gridChequeGdar: function (c) {
        var me = this;

        if (c.dataflow === 'IN') {
            var grid = c.getChequegrid();
            grid.down("[action=createchequein]").setDisabled(false);
            grid.down("[action=createchequein]").setVisible(true);
//            grid.down("[action=createchequeout]").setDisabled(true);
//            grid.down("[action=createchequeout]").setVisible(false);
        } else {
            var grid = c.getChequeoutgrid();
            grid.down("[action=createchequeout]").setDisabled(false);
            grid.down("[action=createchequeout]").setVisible(true);
//            grid.down("[action=createchequein]").setDisabled(true);
//            grid.down("[action=createchequein]").setVisible(false);
        }
    },
    checkDetailGridBeforeGenerate: function (c) {
        var me = this;
        var grid = c.getDetailvouchergrid();
        var store = grid.getStore();
        var fa = c.getFormdata();
        store.each(function (rec) {
            var id = rec.get("voucherdetail_id");
            if (id) {
                fa.deletedRows.push(id);
            }
        });
    },
    createcopy: function (c, param) {
        // copy the selected record
        var me = this;
        var f = c.getFormdata();
        var state = f.up("window").state;
        var grid = c.getDetailvouchergrid();
        var store = grid.getStore();
        var rec = grid.getSelectionModel().getSelection()[0];
        var copy = rec.copy(null);
        var row = grid.store.indexOf(rec); // this used to be -1
        var sb = c.localStore.subdetailcoa;
        var op = [];
        var ketemu = false;
                
        var indexes = [];
        store.each(function(record){
            indexes.push(record.get('indexdata'));
        });
//        var newidx = Math.max.apply(null, indexes) + 1;
        //Rizal
        var newidx = me.getindexdetailcoa(c);
        copy.data.indexdata = newidx;
        copy.data.voucherdetail_id = '';
        copy.data.description_sub = '';
        copy.data.ordercopy = newidx;

//        me.generatesubdetail(c, 'unit_id', 0, 'click');
        if(rec.get("kelsub_kelsub_id")){
            if(state=='create'){
                if(sb.getCount()>0){
                    sb.each(function (sbv) {
                        if(rec.get('indexdata')==sbv.get('voucherdetail_indexdata')){
                            ketemu = true;
                            sb.add({
                                indexsubdata: sbv.get('indexsubdata'),
                                remarks: sbv.get("remarks"),
                                amount: sbv.get("amount"),
                                subgl_subgl_id: sbv.get("subgl_subgl_id"),
                                subgl_code: sbv.get("subgl_code"),
                                subgl_code1: sbv.get("subgl_code1"),
                                subgl_code2: sbv.get("subgl_code2"),
                                subgl_code3: sbv.get("subgl_code3"),
                                subgl_code4: sbv.get("subgl_code4"),
                                voucherdetail_voucherdetail_id: '',
                                voucherdetail_indexdata: newidx,
                                kelsub_kelsub: sbv.get("kelsub_kelsub"),
                                kelsub_kelsub_id: sbv.get("kelsub_kelsub_id"),
                                kelsub_description: '',
                                subgl_description: sbv.get("subgl_description"),
                                uniqueid: Math.floor(Math.random() * 1000000000),
                            });

                            sb.commitChanges();
                        }
                    });
                }
            }else{
                if(sb.getCount()>0){
                    sb.each(function (sbv) {
                        if(rec.get('indexdata')==sbv.get('voucherdetail_indexdata')){
                            ketemu = true;
                            sb.add({
                                indexsubdata: sbv.get('indexsubdata'),
                                remarks: sbv.get("remarks"),
                                amount: sbv.get("amount"),
                                subgl_subgl_id: sbv.get("subgl_subgl_id"),
                                subgl_code: sbv.get("subgl_code"),
                                subgl_code1: sbv.get("subgl_code1"),
                                subgl_code2: sbv.get("subgl_code2"),
                                subgl_code3: sbv.get("subgl_code3"),
                                subgl_code4: sbv.get("subgl_code4"),
                                voucherdetail_voucherdetail_id: '',
                                voucherdetail_indexdata: newidx,
                                kelsub_kelsub: sbv.get("kelsub_kelsub"),
                                kelsub_kelsub_id: sbv.get("kelsub_kelsub_id"),
                                kelsub_description: '',
                                subgl_description: sbv.get("subgl_description"),
                                uniqueid: Math.floor(Math.random() * 1000000000),
                            });

                            sb.commitChanges();
                        }
                    });
                }

                if(ketemu==false){
                    Ext.Ajax.request({
                        url: 'cashier/voucher/read',
                        method: 'POST',	
                        async: false ,
                        params: {
                            voucherdetail_id: rec.get('voucherdetail_id'),
                            mode_read: 'subdetailcoa',
                            module: 'voucher',
                            page: 1,
                            start: 0,
                            limit: 25
                        },
                        success: function (response) {
                            var data = Ext.JSON.decode(response.responseText);
                            var data2 = data.data;
                            data2.forEach(function (v) {
                                var vcpy = rec.copy(null);
                                vcpy.data=[];
                                if(rec.get('indexdata')==v['voucherdetail']['indexdata']){

                                    vcpy.data.indexsubdata = v['vouchersubdetail']['indexdata'];
                                    vcpy.data.remarks = v['vouchersubdetail']['remarks'];
                                    vcpy.data.amount = v['vouchersubdetail']['amount'];
                                    vcpy.data.subgl_subgl_id = v['subgl']['subgl_id'];
                                    vcpy.data.subgl_code = v['subgl']['code'];
                                    vcpy.data.subgl_code1 = v['subgl']['code1'];
                                    vcpy.data.subgl_code2 = v['subgl']['code2'];
                                    vcpy.data.subgl_code3 = v['subgl']['code3'];
                                    vcpy.data.subgl_code4 = v['subgl']['code4'];
                                    vcpy.data.voucherdetail_voucherdetail_id = '';
                                    vcpy.data.voucherdetail_indexdata = newidx;
                                    vcpy.data.kelsub_kelsub = v['kelsub']['kelsub'];
                                    vcpy.data.kelsub_kelsub_id = v['kelsub']['kelsub_id'];
                                    vcpy.data.kelsub_description = '';
                                    vcpy.data.subgl_description = v['subgl']['description'];
                                    vcpy.data.uniqueid = Math.floor(Math.random() * 1000000000);
                                    ketemu = true;
                                    sb.insert(-1,vcpy);
                                    sb.commitChanges();
                                }

                            });
                        },
                        failure: function (response) {

                        }
                    }); 
                }
            }
        }

        store.insert(row, copy);
        
        store.commitChanges();
        
        rec.commit(); // save changes
        me.setSumDetail(c);
        me.sumDetailOut(c);
        me.sumDetail(c);
        var state = f.up("window").state;
        if(state=='create'){
            store.sort('indexdata', 'ASC');
        }else{
            store.sort('ordercopy', 'ASC');
        }
//        console.log(sb);
    },
    fdardetailvoucher: function (c, param) {
        var me = this;
        var f = c.getFormcoadetail();
        var fd = c.getFormdata();
        var project, pt, form;
        project = fd.down('[name=project_project_id]').getValue();
        pt = fd.down('[name=pt_pt_id]').getValue();
        var val = form.getForm().getValues();

        var grid = c.getGrid();
        var rec = grid.getSelectedRecord();
        var xc = grid.getSelectionModel().getCount();
        if(xc===1){

            c.getCustomRequestCombobox('getcashbonbyvoucherid', rec.get("voucherdept_id"), pt, project, 'kasbondept_id', 'vouchercashbondetail', '', fd, '', function () {


            });
        }
        if (param == 'create') {
            //c.getCustomRequestCombobox('subgl', val.kelsub_kelsub_id, 'subgl_subgl_id', 'subgl', '', f);
            c.getCustomRequestCombobox('subgl', val.kelsub_kelsub_id, pt, project, 'subgl_subgl_id', 'subgl', '', f, '');
            var tempstoresub = c.localStore.subdetailcoa;
            var gridsub = c.getGridsubdetail();
            var count2 = gridsub.getStore().getCount();
            f.down('[name=kelsub_kelsub]').setValue(val.kelsub_kelsub);
            f.down('[name=kelsub_kelsub_id]').setValue(val.kelsub_kelsub_id);
            f.down('[name=voucherdetail_id]').setValue(val.voucherdetail_id);
            f.down('[name=voucherdetail_voucherdetail_id]').setValue(val.voucherdetail_id);
            f.down('[name=voucherdetail_indexdata]').setValue(val.indexdata);
            f.down('[name=indexsubdata]').setValue(count2 + c.sumCount + 1);
        } else if (param == 'update') {
            var grid = c.getGridsubdetail();
            var row = grid.getSelectionModel().getSelection();
            var rec = grid.getSelectedRecord();
            console.log(rec);
            form.loadRecord(rec);
            f.down("[name=kelsub_description]").setValue(c.tools.comboHelper(f.down("[name=coa_coa_id]")).getField('coa_id', 'kelsub_description'));
            if(c.voucher_id>0){
//                f.down('[name=amount]').setReadOnly(true);
                f.down('[name=pph_percentage]').setReadOnly(true);
                f.down('[name=ppn_percentage]').setReadOnly(true);
                f.down('[name=pph_tipepajakdetail_id]').setReadOnly(true);
                f.down('[name=ppn_tipepajakdetail_id]').setReadOnly(true);
            }
        }
    },
    generatesubdetail: function (c, param, id, state) {
        var me = this;
        if (param === "unit_id") {
            var sb = c.localStore.subdetailcoa;
            var gridCoaDetail = c.getDetailvouchergrid();
            var detailstore = gridCoaDetail.getStore();
            var arstore = c.getDetailargrid().getStore();
            var totalar = 0;
            var f = c.getFormdata();
            var paymentmethod = f.down("[name=payment_paymentmethod_id]").getStore().findRecord("paymentmethod_id", f.down("[name=payment_paymentmethod_id]").getValue(),0,false,true,true);
            arstore.each(function (ar) {
                if(ar.get("is_debitnote")==1){
                    totalar = totalar+accounting.unformat(ar.get("remaining_pay"))+accounting.unformat(ar.get("is_debitnote"));
                }else{
                    totalar = totalar+accounting.unformat(ar.get("remaining_pay"));
                }
            });
            
            sb.loadData([], false);
            detailstore.each(function (rec) {
                if (rec.get("kelsub_kelsub_id")!='' && rec.get("kelsub_kelsub_id")!='0' && rec.get("voucherdetail_id")=="") {
                    if(rec.get("penggabungancoa")==0){
                        me.getSubglv2(c, id, param, function () {
                                    sb.removeAt(sb.find('voucherdetail_indexdata', rec.get("indexdata")));
                                    sb.add({
                                        indexsubdata: rec.get("indexdata"),
                                        remarks: rec.get("remarks"),
                                        amount: rec.get("amount"),
                                        subgl_subgl_id: c.subgl[0].subgl_subgl_id,
                                        subgl_code: c.subgl[0].subgl_code,
                                        subgl_code1: c.subgl[0].subgl_code1,
                                        subgl_code2: c.subgl[0].subgl_code2,
                                        subgl_code3: c.subgl[0].subgl_code3,
                                        subgl_code4: c.subgl[0].subgl_code4,
                                        voucherdetail_voucherdetail_id: '',
                                        voucherdetail_indexdata: rec.get("indexdata"),
                                        kelsub_kelsub: rec.get("kelsub_kelsub"),
                                        kelsub_kelsub_id: rec.get("kelsub_kelsub_id"),
                                        kelsub_description: '',
                                        subgl_description: c.subgl[0].subgl_description,
                                        uniqueid: Math.floor(Math.random() * 1000000000),
                                    });

                            sb.commitChanges();

                            var value = [];
                            var description_sub = '';
                            description_sub = description_sub + '<table><tr><td><b>SUB</b></td><td><b>&nbsp;&nbsp;&nbsp;Amount</b></td></tr><tr><td>'+c.subgl[0].subgl_code+'</td><td>&nbsp;&nbsp;&nbsp;Rp.'+accounting.formatMoney(rec.get('amount'))+'</td></tr></table>';
                            value['description_sub'] = description_sub;

                            rec.beginEdit();
                            rec.set(value);
                            rec.endEdit();
                        },rec.get("kelsub_kelsub"),0,0);
                    }else{
                        var xx = 1;
                        var value = [];
                        var description_sub = '<table><tr><td><b>SUB</b></td><td><b>&nbsp;&nbsp;&nbsp;Amount</b></td></tr>';
                            me.getSubglv2(c, id, param, function () {
                                if(sb.find('voucherdetail_indexdata', rec.get("indexdata"))==-1){
                                    var totaltemp = 0;
                                    arstore.each(function (ar) {
                                        var subamount = (ar.get("remaining_pay")/totalar)*rec.get("amount");
                                        if(rec.get("status")=='roundup'){
                                            subamount = Math.round(subamount);
                                            if(rec.get("amount")-totaltemp>=subamount){
                                                if(rec.get("amount")-(subamount+totaltemp)<=10){
                                                    subamount = subamount+(rec.get("amount")-(subamount+totaltemp));
                                                }
                                            }else{
                                                if(subamount>0){
                                                    subamount = subamount+(rec.get("amount")-(subamount+totaltemp));
                                                }
                                                if(rec.get("amount")-(subamount+totaltemp)>=-10 && rec.get("amount")<0){
                                                    subamount = subamount+(rec.get("amount")-(subamount+totaltemp));
                                                }
                                            }
                                        }else if (rec.get("status")=='round'){
                                            subamount = subamount - Math.round(subamount%1,4);
                                        }
                                        var ptundercg = [4065,4029,108,2017,2014,84,4030,2090,4033,2015,5102,2,11124,2054,4060];
                                        var subdesc = rec.get("remarks");
                                        var descriptiontemp = '';
                                        if(jQuery.inArray(ar.get("project_project_id"), ptundercg)!=-1){ //Jika under CG
                                                if(ar.get("paymenttype_paymenttype_id")=='2'){
                                                    if(ar.get("project_project_id")!=84){
                                                        descriptiontemp = descriptiontemp+'DENDA ';
                                                        descriptiontemp = descriptiontemp +(ar.get("scheduletype_scheduletype")=='INH'?"ANGSURAN":ar.get("scheduletype_description"))+' ' + (ar.get("termin")?ar.get("termin"):ar.get("schedule_termin")) + ', ';
                                                    }else{
                                                        descriptiontemp = 'DENDA ';
                                                    }

                                                }else{
                                                    if(accounting.unformat(ar.get("remaining_pay"))>=100000 || arstore.getCount()==1){
                                                        
                                                        if(ar.get("amount")>ar.get("oppaid")){
                                                            if(((accounting.unformat(ar.get("oppaid"))-accounting.unformat(ar.get("remaining_pay")))>=100000)||(accounting.unformat(ar.get("oppaid"))-accounting.unformat(ar.get("remaining_pay")))==0){
                                                                descriptiontemp = descriptiontemp + (accounting.unformat(ar.get("oppaid"))>accounting.unformat(ar.get("remaining_pay"))?"SEBAGIAN ":"TAMBAHAN ");
                                                            }
                                                        }else{
                                                            if(accounting.unformat(ar.get("remaining_pay"))<accounting.unformat(ar.get("oppaid")) && ((accounting.unformat(ar.get("oppaid"))-accounting.unformat(ar.get("remaining_pay")))>=100000)){
                                                                descriptiontemp = descriptiontemp + 'SEBAGIAN ';
                                                            }
                                                        }
                                                        descriptiontemp = descriptiontemp + ' ';
                                                        
                                                        descriptiontemp = descriptiontemp + (ar.get("scheduletype_scheduletype")=='INH'?"ANGSURAN":ar.get("scheduletype_description")) + ' '+(ar.get("termin")?ar.get("termin"):ar.get("schedule_termin"))+', ';
                                                        
                                                    }

                                                }
                                                    descriptiontemp = descriptiontemp + ar.get("unit_mh_type")+', '+(f.down("[name=payment_paymentmethod_id]").getValue()!=""?(paymentmethod?paymentmethod.data['paymentmethod']:''):'')+' '+(f.down("[name=payment_date]").getValue()!="" && f.down("[name=payment_date]").getValue()!=null?moment(f.down("[name=payment_date]").getValue()).format("DD-MM-YYYY"):'')+' Rp. '+accounting.formatMoney(f.down("[name=sum_pay]").getValue())+',- '+ar.get("project_name")+' - '+ar.get("unit_cluster")+' '+ar.get("unit_unit_number")+' '+ar.get("pt_name");
                                            subdesc = descriptiontemp;     
                                            }else{ //bukan CG
                                                if(ar.get("scheduletype_scheduletype")=='TJ'){

                                                    if(ar.get("paymenttype_paymenttype_id")=='2'){

                                                        if(ar.get("project_project_id")==5101){//khusus vittorio tanpa project code

                                                                descriptiontemp=descriptiontemp+ar.get("unit_cluster")+' '+
                                                                    f.down('[name=unit_unit_number]').getValue() + ' DENDA ' +
                                                                    (ar.get("scheduletype_scheduletype")=='INH'?"ANGSURAN":ar.get("scheduletype_description"))+' \n'
                                                                    ;

                                                        }else{
                                                            if(ar.get("project_subholding_id")!=1){
                                                                if(ar.get("project_subholding_id")==3 || ar.get("project_project_id")==4065){
                                                                    descriptiontemp=
                                                                        ' DENDA ' +
                                                                        ar.get("scheduletype_description") + ' ' +(ar.get("termin")?ar.get("termin"):ar.get("schedule_termin"))+', '+f.down('[name=description]').getValue()
                                                                        ;
                                                                }else{
                                                                    descriptiontemp=descriptiontemp+ar.get("project_code")+'/'+ar.get("unit_cluster_code")+'/'+
                                                                        f.down('[name=unit_unit_number]').getValue() + ' DENDA ' +
                                                                        ar.get("scheduletype_description") + ' ' +
                                                                        ' A.N ' +
                                                                        f.down('[name=customer_name]').getValue()+' \n'
                                                                        ;
                                                                }
                                                            }else{
                                                                descriptiontemp = descriptiontemp+' DENDA ' + ar.get("scheduletype_description") + ', '+f.down('[name=description]').getValue();

                                                            }
                                                        }
                                                    }
                                                }else{
                                                    if(ar.get("paymenttype_paymenttype_id")=='2'){

                                                        if(ar.get("project_project_id")==5101){//khusus vittorio tanpa project code

                                                            descriptiontemp=descriptiontemp+ar.get("unit_cluster")+' '+
                                                                    f.down('[name=unit_unit_number]').getValue() + ' DENDA ' +
                                                                    (ar.get("scheduletype_scheduletype")=='INH'?"ANGSURAN":ar.get("scheduletype_description"))+' \n'
                                                                    ;
                                                        }else{
                                                            if(ar.get("project_subholding_id")!=1){

                                                                if(ar.get("project_subholding_id")==3 || ar.get("project_project_id")==4065){
                                                                    descriptiontemp=
                                                                        ' DENDA BOOKING FEE ' +(ar.get("termin")?ar.get("termin"):ar.get("schedule_termin"))+', '+f.down('[name=description]').getValue()
                                                                        ;
                                                                }else{

                                                                    descriptiontemp=descriptiontemp+ar.get("project_code")+'/'+ar.get("unit_cluster_code")+'/'+
                                                                            f.down('[name=unit_unit_number]').getValue() + ' DENDA ' +
                                                                            ar.get("scheduletype_description") + ' ' +
                                                                            (ar.get("termin")?ar.get("termin"):ar.get("schedule_termin")) + ' A.N ' +
                                                                            f.down('[name=customer_name]').getValue()+' \n'
                                                                            ;
                                                                }
                                                            }else{
                                                                descriptiontemp = descriptiontemp+' DENDA '  + ar.get("scheduletype_description") + ' '+ar.get("termin")+', ' +f.down('[name=description]').getValue();

                                                            }
                                                        }
                                                    }
                                                }
                                                subdesc = descriptiontemp;
                                        }
                                        sb.add({
                                            indexsubdata: xx,
                                            remarks: subdesc,
                                            amount: subamount,
                                            subgl_subgl_id: c.subgl[0].subgl_subgl_id,
                                            subgl_code: c.subgl[0].subgl_code,
                                            subgl_code1: c.subgl[0].subgl_code1,
                                            subgl_code2: c.subgl[0].subgl_code2,
                                            subgl_code3: c.subgl[0].subgl_code3,
                                            subgl_code4: c.subgl[0].subgl_code4,
                                            voucherdetail_voucherdetail_id: '',
                                            voucherdetail_indexdata: rec.get("indexdata"),
                                            kelsub_kelsub: rec.get("kelsub_kelsub"),
                                            kelsub_kelsub_id: rec.get("kelsub_kelsub_id"),
                                            kelsub_description: '',
                                            subgl_description: c.subgl[0].subgl_description,
                                            uniqueid: Math.floor(Math.random() * 1000000000),
                                        });
                                        xx++;
                                        totaltemp = totaltemp+subamount;
                                        description_sub = description_sub + '<tr><td>'+c.subgl[0].subgl_code+'</td><td>&nbsp;&nbsp;&nbsp;Rp.'+accounting.formatMoney(ar.get("remaining_pay"))+'</td></tr>';
                                    });

                                    sb.commitChanges();
                                }

                                
                            },rec.get("kelsub_kelsub"),0,0);
                        value['description_sub'] = description_sub + '</table>';

                        rec.beginEdit();
                        rec.set(value);
                        rec.endEdit();
                    }
                }
            });
        }
        
        if (param === "customer_vendor_name") {
            var sb = c.localStore.subdetailcoa;
            var gridCoaDetail = c.getDetailvouchergrid();
            var detailstore = gridCoaDetail.getStore();
            
            sb.loadData([], false);
            detailstore.each(function (rec) {
                if (rec.get("kelsub_kelsub_id")!='' && rec.get("kelsub_kelsub_id")!='0') {
                    me.getSubglv2(c, id, param, function () {
                                sb.removeAt(sb.find('voucherdetail_indexdata', rec.get("indexdata")));
                                sb.add({
                                    indexsubdata: rec.get("indexdata"),
                                    remarks: rec.get("remarks"),
                                    amount: rec.get("amount"),
                                    subgl_subgl_id: c.subgl[0].subgl_subgl_id,
                                    subgl_code: c.subgl[0].subgl_code,
                                    subgl_code1: c.subgl[0].subgl_code1,
                                    subgl_code2: c.subgl[0].subgl_code2,
                                    subgl_code3: c.subgl[0].subgl_code3,
                                    subgl_code4: c.subgl[0].subgl_code4,
                                    voucherdetail_voucherdetail_id: '',
                                    voucherdetail_indexdata: rec.get("indexdata"),
                                    kelsub_kelsub: rec.get("kelsub_kelsub"),
                                    kelsub_kelsub_id: rec.get("kelsub_kelsub_id"),
                                    kelsub_description: '',
                                    subgl_description: c.subgl[0].subgl_description,
                                    uniqueid: Math.floor(Math.random() * 1000000000),
                                });

                        sb.commitChanges();
                        
//                        if(state=='click'){
                            var value = [];
                            var description_sub = '';
                            description_sub = description_sub + '<table><tr><td><b>SUB</b></td><td><b>&nbsp;&nbsp;&nbsp;Amount</b></td></tr><tr><td>'+c.subgl[0].subgl_code+'</td><td>&nbsp;&nbsp;&nbsp;Rp.'+accounting.formatMoney(rec.get('amount'))+'</td></tr></table>';
                            value['description_sub'] = description_sub;

                            rec.beginEdit();
                            rec.set(value);
                            rec.endEdit();
//                        }
                    },rec.get("kelsub_kelsub"),0,0);
                }
            });
        }
    },
    getSubglv2: function (c, id, param, callback,kelsub,is_vendor,is_customer) {
        var me = this;
        c.tools.ajax({
            params: {
                module: c.controllerName,
                id: id,
                param: param,
                kelsub: kelsub,
                is_vendor: is_vendor,
                is_customer: is_customer,
                project_id:c.getFormdata().down("[name=project_project_id]").getValue(),
                pt_id:c.getFormdata().down("[name=pt_pt_id]").getValue()
            },
            success: function (data, model) {
                try {
                    c.subgl=[];
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
    //Rizal 25 Juni 2019
    deletesubdetail: function (c) {
        var me = this;
        var g = c.getGridsubdetail();
//        console.log(g);
        g.getStore().loadData([], false);
    },
    //
    getPtCgg: function(project_id,pt_id ) {
        var me, is_pt_cgg, project_id, pt_id;
        me = this;
        var is_pt_cgg = 0;
        if (pt_id > 0) {
            Ext.Ajax.request({
                url: "cashier/voucher/read",
                method: "POST",
                async: false,
                params: {
                    project_id: project_id,
                    pt_id: pt_id,
                    mode_read: "checkPtCGG"
                },
                success: function(response) {
                    var data = Ext.JSON.decode(response.responseText);
                    if (data.data.result == 1) {
                        is_pt_cgg = 1;
                    } else {
                        is_pt_cgg = 0;
                    }
                }
            });

            return is_pt_cgg;
        }
    },
});

