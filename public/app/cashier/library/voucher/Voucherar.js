/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/*
 * @AUTHOR : SEMY
 * 
 */
Ext.define('Cashier.library.voucher.Voucherar', {
    config: null,
    constructor: function (options) {
        Ext.apply(this, options || {});
    },
    dataDestroyAr: function (c, v) {
        var me = this;
        var griArDetail = c.getDetailargrid();
        var store = griArDetail.getStore();
        var fa = c.getFormdata();
        var rows = griArDetail.getSelectionModel().getSelection();
        if((c.is_realized==1 && !c.is_f7_convert) || c.is_posting==1){
            Ext.Msg.alert('Info', 'You must unposting and unrealize first!');
            return;
        }else{
            if (rows.length < 1) {
                Ext.Msg.alert('Info', 'No record selected !');
                return;
            } else {
                var sum = 0;
                for (var i = 0; i < rows.length; i++) {
                    sum += parseFloat(rows[i].get("oppaid"));
                    //console.log(rows);
                    var id = rows[i]['data']["paymentdetail_id"];
                    if (id) {
                        fa.deletedArPaymentRows.push(id);
                    }
                    store.remove(rows[i]);
                }

                c.getSelectedSchedule();
                c.checkArIsEmpty();
                me.setSumDetailAR(c);
                // me.getTotalWithoutLastRecordNew(c);
            }
        }
    },
    dataDestroyArEsc: function (c, v) {
        var me = this;
        var griArDetail = c.getDetailescrowgrid();
        var store = griArDetail.getStore();
        var fa = c.getFormdata();
        var rows = griArDetail.getSelectionModel().getSelection();
        console.log(c);
        if(c.is_realized==1 || c.is_posting==1){
            Ext.Msg.alert('Info', 'You must unposting and unrealize first!');
            return;
        }else{
            if (rows.length < 1) {
                Ext.Msg.alert('Info', 'No record selected !');
                return;
            } else {
                var sum = 0;
                for (var i = 0; i < rows.length; i++) {
                    sum += parseFloat(rows[i].get("oppaid"));
                    //console.log(rows);
                    var id = rows[i]['data']["paymentdetail_id"];
                    if (id) {
                        fa.deletedArPaymentRowsEsc.push(id);
                    }
                    store.remove(rows[i]);
                }

                c.getSelectedScheduleEsc();
                c.checkArIsEmptyEsc();
                me.setSumDetailAREsc(c);
                // me.getTotalWithoutLastRecordNew(c);
            }
        }
    },
    getTotalWithoutLastRecordNew: function (c) {
        var me = this;
        c.totalWithoutLastRecordNew = 0;
        var total = 0;
        var gridvoucherar = c.getDetailargrid();
        var storevoucherar = gridvoucherar.getStore();
        var count = storevoucherar.getCount();
        var cd = storevoucherar.getCount() - 1;
        var firstRecord = storevoucherar.getAt(0);
        var lastRecord = storevoucherar.getAt(cd);
        if (count > 1) {
            storevoucherar.each(function (rec) {
                total += parseFloat(rec.get('oppaid'));
            });
            c.totalWithoutLastrecord = parseFloat(firstRecord.get("oppaid"));
            c.firstTotal = parseFloat(total);
        } else {
            c.totalWithoutLastrecord = 0;
            c.firstTotal = parseFloat(firstRecord.get("oppaid"));
        }
    },
    getTotalWithoutLastRecordNewv2: function (c, param) {
        var me = this;
        c.totalWithoutLastRecordNew = 0;
        var total = 0;
        var key;
        var key = (param ? "amount" : "oppaid");
        var gridvoucherar = c.getDetailargrid();
        var storevoucherar = gridvoucherar.getStore();
        var count = storevoucherar.getCount();
        var cd = storevoucherar.getCount() - 1;
        var firstRecord = storevoucherar.getAt(0);
        var lastRecord = storevoucherar.getAt(cd);
        if (count > 1) {
            storevoucherar.each(function (rec) {
                total += parseFloat(rec.get(key));
            });
            c.totalWithoutLastrecord = total - lastRecord.get(key);
            c.firstTotal = parseFloat(total);
        } else {
            c.totalWithoutLastrecord = 0;
            c.firstTotal = parseFloat(firstRecord.get(key));
        }
    },
    setArStore: function (c, a, b) {
        var me = this;
        var gridvoucherar = c.getDetailargrid();
        var store = gridvoucherar.getStore();
        store.each(function (record) {
            record.set(a, b);
        });
    },
    getIndexDetailAr: function (c) {
        var me = this;
        var total = 0;
        var gridvoucherar = c.getDetailargrid();
        var total = gridvoucherar.getStore().getCount();
        return total;
    },
    getTotalSumAr: function (c) {
        var me = this;
        c.totalSumAr = 0;
        var total = 0;
        var gridvoucherar = c.getDetailargrid();
        var storevoucherar = gridvoucherar.getStore();
        var gridvoucherot = c.getOtherpaymentgrid();
        var storevoucherot = gridvoucherot.getStore();
        var f = c.getFormdata();
        var enddescriptionsh3 = '';
        var descriptiontemp = '';
        var paymenttype_id = '';
        var plkprid = '';
        var paymentmethod = f.down("[name=payment_paymentmethod_id]").getStore().findRecord("paymentmethod_id", f.down("[name=payment_paymentmethod_id]").getValue(),0,false,true,true);
        var is_cg = false;
        var projectname = f.down("[name=project_project_id]").getStore().findRecord("project_project_id", f.down("[name=project_project_id]").getValue(),0,false,true,true);
        var ptname = f.down("[name=pt_pt_id]").getStore().findRecord("pt_id", f.down("[name=pt_pt_id]").getValue(),0,false,true,true);
        
        var totaldipick = 0;
        var harganetto = 0;
        var isnonppn = 0;
        var paymenttypeid = 0;
        var totalbphtb = 0;
        
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
                     
        var current_project_id = 0;
        var current_pt_id = 0;
        var purchaseletter_id = 0;
        var pmkno = tmp_pmkno; //'21/PMK/2021';
        
        storevoucherar.each(function (recAngs) {
            if(accounting.unformat(recAngs.get("remaining_pay"))<=accounting.unformat((!recAngs.get("remaining_bphtb")?recAngs.get("schedule_remaining_bphtb"):0))){
                totalbphtb = totalbphtb + accounting.unformat(recAngs.get("remaining_pay"));
            }else{
                totalbphtb = totalbphtb + accounting.unformat((!recAngs.get("remaining_bphtb")?recAngs.get("schedule_remaining_bphtb"):0));
            }
            totaldipick = totaldipick+accounting.unformat(recAngs.get("remaining_pay"));
            harganetto = accounting.unformat(recAngs.get("purchaseletter_harga_netto"));
            isnonppn = recAngs.get("purchaseletter_isnonppn");
            paymenttypeid = recAngs.get("paymenttype_paymenttype_id");
            purchaseletter_id = recAngs.get("purchaseletter_purchaseletter_id");

            current_project_id = recAngs.get("project_project_id");
            current_pt_id = recAngs.get("pt_pt_id");

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

        /* if(harganetto<="2000000000"){
            totaldipick = Math.round((totaldipick-totalbphtb)*0.1);
        }
        if(harganetto>"2000000000" && harganetto<="5000000000"){
            totaldipick = Math.round((totaldipick-totalbphtb)*4.7619047618/100);
        } */
        
        var ptundercg = [4065,4029,108,2017,2014,84,4030,2090,4033,2015,5102,2,11124,2054,4060];
        storevoucherar.each(function (rec) {
            plkprid = rec.get("purchaseletter_pencairankpr_id");
            total += parseFloat(rec.get('remaining_pay'));
                paymenttype_id +=
                        rec.get("paymenttype_id") ? rec.get("paymenttype_id") + "~" : (rec.get("paymenttype_paymenttype_id") ? rec.get("paymenttype_paymenttype_id") + "~" : 0 + "~");
            //console.log(rec);
            
            if(storevoucherar.getCount()>0){
                if(jQuery.inArray(rec.get("project_project_id"), ptundercg)!=-1){ //Jika under CG
                    is_cg=true;
                    if(rec.get("paymenttype_paymenttype_id")=='2'){
                        if(rec.get("project_project_id")!=84){
                            descriptiontemp = descriptiontemp+'DENDA ';
                            descriptiontemp = descriptiontemp +(rec.get("scheduletype_scheduletype")=='INH'?"ANGSURAN":rec.get("scheduletype_description"))+' ' + (rec.get("termin")?rec.get("termin"):rec.get("schedule_termin")) + ', ';
                        }else{
                            descriptiontemp = 'DENDA ';
                        }
                        
                    }else{
                        if(f.down("[name=is_f9]").getValue()=="1"){
                            descriptiontemp = descriptiontemp +rec.get("customer_name")+', '+  'Pencairan KPR Full Payment, ';
                        }
                        if(storevoucherar.getCount()==1 || accounting.unformat(rec.get("remaining_pay"))>=100000){
                            if(rec.get("paymentdetail_id")){
                                
                                if(accounting.unformat(rec.get("schedule_amount"))>accounting.unformat(rec.get("oppaid"))){
                                    if(((accounting.unformat(rec.get("oppaid"))-accounting.unformat(rec.get("remaining_pay")))>=100000)||(accounting.unformat(rec.get("oppaid"))-accounting.unformat(rec.get("remaining_pay")))==0){
                                        descriptiontemp = descriptiontemp + (accounting.unformat(rec.get("oppaid"))>accounting.unformat(rec.get("remaining_pay"))?"SEBAGIAN ":"TAMBAHAN ");
                                    }
                                }else{
                                    if(((accounting.unformat(rec.get("oppaid"))-accounting.unformat(rec.get("remaining_pay")))>=100000)){
                                        if(accounting.unformat(rec.get("remaining_pay"))<accounting.unformat(rec.get("oppaid"))){
                                            descriptiontemp = descriptiontemp + 'SEBAGIAN ';
                                        }
                                    }
                                }
                            }else{
                                if(accounting.unformat(rec.get("amount"))>accounting.unformat(rec.get("oppaid"))){
                                    if(((accounting.unformat(rec.get("oppaid"))-accounting.unformat(rec.get("remaining_pay")))>=100000)||(accounting.unformat(rec.get("oppaid"))-accounting.unformat(rec.get("remaining_pay")))==0){
                                        descriptiontemp = descriptiontemp + (accounting.unformat(rec.get("oppaid"))>accounting.unformat(rec.get("remaining_pay"))?"SEBAGIAN ":"TAMBAHAN ");
                                    }
                                }else{
                                    if(((accounting.unformat(rec.get("oppaid"))-accounting.unformat(rec.get("remaining_pay")))>=100000)){
                                        if(accounting.unformat(rec.get("remaining_pay"))<accounting.unformat(rec.get("oppaid"))){
                                            descriptiontemp = descriptiontemp + 'SEBAGIAN ';
                                        }
                                    }
                                }
                            }
                            descriptiontemp = descriptiontemp + ' ';
//                            descriptiontemp = descriptiontemp + (rec.get("scheduletype_scheduletype")=='INH'?"ANGSURAN":rec.get("scheduletype_description")) + ' '+(rec.get("termin")?rec.get("termin"):rec.get("schedule_termin"))+', ';
                            
                            if(rec.get("scheduletype_scheduletype")=="BLG"){
                                descriptiontemp = descriptiontemp + rec.get("scheduletype_description") + ' KE '+(rec.get("termin")?rec.get("termin"):rec.get("schedule_termin"))+', ';
                            }else{
                                descriptiontemp = descriptiontemp + (rec.get("scheduletype_scheduletype")=='INH'?"ANGSURAN":rec.get("scheduletype_description")) + ' '+(rec.get("termin")?rec.get("termin"):rec.get("schedule_termin"))+', ';
                            }
                        
                        }
                        
                    }
                        if(enddescriptionsh3==''){
                            if(rec.get("scheduletype_scheduletype")=="BLG"){
                                enddescriptionsh3 = rec.get("unit_mh_type")+' '+(f.down("[name=payment_paymentmethod_id]").getValue()!=""?(paymentmethod?paymentmethod.data['paymentmethod']:''):'')+' '+(f.down("[name=kwitansi_date]").getValue()!="" && f.down("[name=kwitansi_date]").getValue()!=null?moment(f.down("[name=kwitansi_date]").getValue()).format("DD-MM-YYYY"):'')+' Rp. '+accounting.formatMoney(f.down("[name=sum_pay]").getValue())+',- '+rec.get("unit_cluster")+' '+rec.get("unit_unit_number")+' '+rec.get("pt_name");
                            }else{
                                enddescriptionsh3 = rec.get("unit_mh_type")+', '+(f.down("[name=payment_paymentmethod_id]").getValue()!=""?(paymentmethod?paymentmethod.data['paymentmethod']:''):'')+' '+(f.down("[name=payment_date]").getValue()!="" && f.down("[name=payment_date]").getValue()!=null?moment(f.down("[name=payment_date]").getValue()).format("DD-MM-YYYY"):'')+' Rp. '+accounting.formatMoney(f.down("[name=sum_pay]").getValue())+',- '+rec.get("project_name")+' - '+rec.get("unit_cluster")+' '+rec.get("unit_unit_number")+' '+rec.get("pt_name");
                            }
                        }
                }else{ //bukan CG
                    if(rec.get("scheduletype_scheduletype")=='TJ'){

                        if(rec.get("paymenttype_paymenttype_id")=='2'){

                            is_cg=true;
                            if(rec.get("project_project_id")==5101){//khusus vittorio tanpa project code

                                    descriptiontemp=descriptiontemp+rec.get("unit_cluster")+' '+
                                        f.down('[name=unit_unit_number]').getValue() + ' DENDA ' +
                                        (rec.get("scheduletype_scheduletype")=='INH'?"ANGSURAN":rec.get("scheduletype_description"))+' \n'
                                        ;

                            }else{
                                if(rec.get("project_subholding_id")!=1){
                                    if(rec.get("project_subholding_id")==3 || rec.get("project_project_id")==4065){
                                        descriptiontemp=
                                            ' DENDA ' +
                                            rec.get("scheduletype_description") + ' ' +(rec.get("termin")?rec.get("termin"):rec.get("schedule_termin"))+', '+f.down('[name=description]').getValue()
                                            ;
                                    }else{
                                        descriptiontemp=descriptiontemp+rec.get("project_code")+'/'+rec.get("unit_cluster_code")+'/'+
                                            f.down('[name=unit_unit_number]').getValue() + ' DENDA ' +
                                            rec.get("scheduletype_description") + ' ' +
                                            ' A.N ' +
                                            f.down('[name=customer_name]').getValue()+' \n'
                                            ;
                                    }
                                }else{
                                    descriptiontemp = descriptiontemp+' DENDA ' + rec.get("scheduletype_description") + ', '+f.down('[name=description]').getValue();
                                    if(f.down('[name=receipt_notes]').getValue()=="" || f.down('[name=description]').getValue()==f.down('[name=receipt_notes]').getValue()){
                                        f.down('[name=description]').setValue(descriptiontemp);
                                    }
                                    f.down('[name=receipt_notes]').setValue(descriptiontemp);
                                }
                            }
                        }
                    }else{
                        if(rec.get("paymenttype_paymenttype_id")=='2'){

                            is_cg=true;
                            if(rec.get("project_project_id")==5101){//khusus vittorio tanpa project code

                                descriptiontemp=descriptiontemp+rec.get("unit_cluster")+' '+
                                        f.down('[name=unit_unit_number]').getValue() + ' DENDA ' +
                                        (rec.get("scheduletype_scheduletype")=='INH'?"ANGSURAN":rec.get("scheduletype_description"))+' \n'
                                        ;
                            }else{
                                if(rec.get("project_subholding_id")!=1){

                                    if(rec.get("project_subholding_id")==3 || rec.get("project_project_id")==4065){
                                        descriptiontemp=
                                            ' DENDA BOOKING FEE ' +(rec.get("termin")?rec.get("termin"):rec.get("schedule_termin"))+', '+f.down('[name=description]').getValue()
                                            ;
                                    }else{

                                        descriptiontemp=descriptiontemp+rec.get("project_code")+'/'+rec.get("unit_cluster_code")+'/'+
                                                f.down('[name=unit_unit_number]').getValue() + ' DENDA ' +
                                                rec.get("scheduletype_description") + ' ' +
                                                (rec.get("termin")?rec.get("termin"):rec.get("schedule_termin")) + ' A.N ' +
                                                f.down('[name=customer_name]').getValue()+' \n'
                                                ;
                                    }
                                }else{
                                    descriptiontemp = descriptiontemp+' DENDA '  + rec.get("scheduletype_description") + ' '+(rec.get("termin")?rec.get("termin"):rec.get("schedule_termin"))+', ' +f.down('[name=description]').getValue();
                                    if(f.down('[name=receipt_notes]').getValue()=="" || f.down('[name=description]').getValue()==f.down('[name=receipt_notes]').getValue()){
                                        f.down('[name=description]').setValue(descriptiontemp);
                                    }
                                    f.down('[name=receipt_notes]').setValue(descriptiontemp);
                                }
                            }
                        }else{
                            if(f.down("[name=is_f9]").getValue()=="1"){
                                descriptiontemp = descriptiontemp +(rec.get("project_subholding_id")=="1"?rec.get("customer_name")+", ":"")+ 'Pencairan KPR Full Payment, ';
                            }
                            if(rec.get("scheduletype_scheduletype")=="BLG"){
                                is_cg=true; 
                                descriptiontemp = descriptiontemp + rec.get("scheduletype_description") + ' KE '+(rec.get("termin")?rec.get("termin"):rec.get("schedule_termin"))+', ';
                            }
                            if(enddescriptionsh3==''){
                                if(rec.get("scheduletype_scheduletype")=="BLG"){
                                    enddescriptionsh3 = rec.get("unit_mh_type")+' '+(f.down("[name=payment_paymentmethod_id]").getValue()!=""?(paymentmethod?paymentmethod.data['paymentmethod']:''):'')+' '+(f.down("[name=kwitansi_date]").getValue()!="" && f.down("[name=kwitansi_date]").getValue()!=null?moment(f.down("[name=kwitansi_date]").getValue()).format("DD-MM-YYYY"):'')+' Rp. '+accounting.formatMoney(f.down("[name=sum_pay]").getValue())+',- '+rec.get("unit_cluster")+' '+rec.get("unit_unit_number")+' '+rec.get("pt_name");
                                }
                            }
                        }
                    }
                }
            }
        });
        var arrot = [];
        storevoucherot.each(function (rec) {
            plkprid = rec.get("purchaseletter_pencairankpr_id");
            var nemu = false;
            arrot.forEach(function(v) {
                if(rec.get("paymenttype_paymenttype")==v){
                    nemu = true;
                }
            });
            if (nemu == false){
                arrot.push(rec.get("paymenttype_paymenttype"));
            }
            if(storevoucherot.getCount()>0 && rec.get("paymenttype_paymenttype")!=""){
                if(projectname.data['project_subholding_id']=="1"){
                    is_cg=true;

                    if (nemu == false){
                        descriptiontemp = descriptiontemp+rec.get("paymenttype_paymenttype")+', ';
                    }
                    if(enddescriptionsh3==''){
                        enddescriptionsh3 = f.down("[name=unit_mh_type]").getValue()+' '+(f.down("[name=payment_paymentmethod_id]").getValue()!=""?(paymentmethod?paymentmethod.data['paymentmethod']:''):'')+'. '+(f.down("[name=payment_date]").getValue()!="" && f.down("[name=payment_date]").getValue()!=null?moment(f.down("[name=payment_date]").getValue()).format("DD-MM-YYYY"):'')+' Rp. '+accounting.formatMoney(f.down("[name=sum_pay]").getValue())+',- '+projectname.data['project_name']+' - '+f.down("[name=unit_cluster]").getValue()+' '+f.down("[name=unit_unit_number]").getValue()+' '+ptname.data['name'];
                    }
                }
            }
        });
        if(plkprid=='' || plkprid ==undefined || plkprid == null){

            if(is_cg==true){
                if(f.down('[name=receipt_notes]').getValue()=="" || f.down('[name=description]').getValue()==f.down('[name=receipt_notes]').getValue()){
                    f.down('[name=description]').setValue(descriptiontemp+' '+enddescriptionsh3);
                }
                f.down("[name=receipt_notes]").setValue(descriptiontemp+' '+enddescriptionsh3);
                
                if(isnonppn=="1" && paymenttypeid!='2'){
                    if(f.down('[name=receipt_notes]').getValue()=="" || f.down('[name=description]').getValue()==f.down('[name=receipt_notes]').getValue()){
                        f.down('[name=description]').setValue(f.down('[name=description]').getValue()+'\n PPN DTP eks PMK No '+pmkno+' senilai Rp.'+accounting.formatMoney(totaldipick));
                    }
                    f.down('[name=receipt_notes]').setValue(f.down('[name=receipt_notes]').getValue()+'\n PPN DTP eks PMK No '+pmkno+' senilai Rp.'+accounting.formatMoney(totaldipick));
                }
            }
        }
        c.paymenttype_id=paymenttype_id;
        c.voucherDetail.sumDetail(c);
        c.totalSumAr = total; 
    },
    getTotalWithoutLastRecord: function (c) {
        var me = this;
        c.totalWithoutLastrecord = 0;
        var total = 0;
        var gridvoucherar = c.getDetailargrid();
        var storevoucherar = gridvoucherar.getStore();
        storevoucherar.each(function (rec) {
            total += parseFloat(rec.get('oppaid'));
        });
        c.totalWithoutLastrecord = total;
    },
    getFirstTotal: function (c, param) { //param for AR ID, jika state update baca amount dari 
//                                       td_paymentdetail_temp, bukan remaining balance dari schedule
        var me = this;
        var key = (param ? "amount" : "oppaid");
        c.firstTotal = 0;
        var total = 0;
        var gridvoucherar = c.getDetailargrid();
        var storevoucherar = gridvoucherar.getStore();
        storevoucherar.each(function (rec) {
            total += parseFloat(rec.get(key));
        });
        c.firstTotal = total;
    },
    getTotalAfterDeleteAr: function (c) {
        var me = this;
        c.totalSumAfterDeleteAr = 0;
        var total = 0;
        var gridvoucherar = c.getDetailargrid();
        var storevoucherar = gridvoucherar.getStore();
        storevoucherar.each(function (rec) {
            total += parseFloat(rec.get('oppaid'));
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
        var f = c.getFormdata();
        var store = g.getStore();
        var count = store.getCount();
        var state = f.up('window').state;
        //console.log(count);
        if (!c.kasbank_id) {
//            if (count == "1") {
                //  g.down("toolbar[action=destroy]").setDisabled(false);
                store.each(function (record) {
                    if(record.get("remaining_pay")==0){
                        record.set('remaining_pay', record.get("oppaid"));
                    }
                });
                c.getSelectedSchedule(function () {
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
                    c.voucherDetail.generateCoa(c, c.templateCoa, 'kasbank', '', '');
                });
//            }
        }else{
            var paymenttype_id = '';
            store.each(function (record) {
                paymenttype_id +=
                        record.get("paymenttype_id") ? record.get("paymenttype_id") + "~" : (record.get("paymenttype_paymenttype_id") ? record.get("paymenttype_paymenttype_id") + "~" : 0 + "~");
            });
            c.paymenttype_id=paymenttype_id;
        }
        store.sort('duedate', 'ASC');
        g.on({
            scope: this,
            edit: function (roweditor, event) {
                c.getSelectedSchedule();
                var count = store.getCount();
                //  console.log(event.record);
                var paymentflag_id = event.record.get("payment_paymentflag_id");
                var paymentdetail_id = event.record.get("paymentdetail_id");
                var val;
                if (paymentdetail_id) {
                    var final = accounting.unformat(event.record.get('amount')) - accounting.unformat(event.value);
                    val = accounting.unformat(event.record.get("amount"));
                } else {
                    var final = accounting.unformat(event.record.get('oppaid')) - accounting.unformat(event.value);
                    val = accounting.unformat(event.record.get("oppaid"));
                }

                if (accounting.unformat(event.value) > val) {
                    if(f.down("[name=is_f9]").getValue()=="1"){
                        c.tools.alert.warning("KPR Full Payment tidak boleh lebih besar dari nilai KPR");
                    }else{
                        if(event.record.get('is_debitnote')==1){
                            event.record.set('debitnote', final);
                            event.record.set('final', 0);
                            c.isEdit = 1;
                            store.commitChanges();
                        }else{
                            if(paymentflag_id!="2"){
                                c.tools.alert.warning("Payment harus lebih kecil dari : " + accounting.formatMoney(val));
                            }else{
                                
                                Ext.Msg.confirm('Confirmation', 'Nilai yang di inputkan lebih besar dari denda, apakah ingin split kelebihan bayar ke denda selanjutnya?', function (btnc) {
                                    if (btnc == 'yes') {
                                        var schedule_id = '';
                                        var sisafinal = (final<0?-1*final:final);
                                        var schtype = '';
                                        var schtypedesc = '';
                                        var sisaschedule = '';
                                        store.each(function(r){
                                            sisaschedule = r.get("purchaseletter_sisaschedulenonkpr");
                                            if(event.record.get("schedule_id")!=r.get("schedule_id")){
                                                if(accounting.unformat(r.get("remaining_pay"))<accounting.unformat(r.get("oppaid"))){
                                                    if((accounting.unformat(r.get("oppaid"))-accounting.unformat(r.get("remaining_pay")))<=sisafinal){
                                                        r.beginEdit();
                                                        r.set({
                                                            remaining_pay: accounting.unformat(r.get("remaining_pay"))+(accounting.unformat(r.get("oppaid"))-accounting.unformat(r.get("remaining_pay"))),
                                                        });
                                                        r.endEdit();
                                                        sisafinal = sisafinal - (accounting.unformat(r.get("oppaid"))-accounting.unformat(r.get("remaining_pay")));
                                                    }else{
                                                        r.beginEdit();
                                                        r.set({
                                                            remaining_pay: accounting.unformat(r.get("remaining_pay"))+sisafinal,
                                                        });
                                                        r.endEdit();
                                                        sisafinal = 0;
                                                    }
                                                }
                                            }
                                            schedule_id = schedule_id+r.get("schedule_id")+'~';
                                        });
                                        store.commitChanges();
                                        me.getAnotherDenda(c,schedule_id,sisafinal,sisaschedule);
                                    }else{
                                        event.record.set('final', 0);
                                        event.record.set('remaining_pay',accounting.unformat(event.value));
                                        event.record.set('debitnote', 0);
                                        store.commitChanges();
                                        me.setSumDetailAR(c);
                                    }
                                });
                            }
                        }
                    }
                    if(paymentflag_id!="2" && event.record.get('is_debitnote')==0 || event.record.get('is_debitnote')==undefined || event.record.get('is_debitnote')==null){
                        event.record.set('remaining_pay', val);
                        event.record.set('final', 0);
                        store.commitChanges();
                    }
                    c.getSelectedSchedule();
                    me.setSumDetailAR(c);
                    c.isEdit = 1;
                    return false;
                } else {
                    if(f.down("[name=is_f9]").getValue()=="1" && accounting.unformat(event.value) < val){
                        c.tools.alert.warning("KPR Full Payment tidak boleh lebih kecil dari nilai KPR");
                        event.record.set('remaining_pay', val);
                        event.record.set('final', 0);
                        me.setSumDetailAR(c);
                        c.isEdit = 1;
                        return false;
                    }else{
                        if(event.field=='remaining_pay'){
                            event.record.set('final', final);
                            event.record.set('debitnote', 0);
                            store.commitChanges();
                            c.isEdit = 1;
                            me.setSumDetailAR(c);
                        }
                        if(event.field=='is_debitnote'){
                            if(event.record.get("islastschedule")==1){
                            
                                if(event.record.get("is_debitnote")==0 ||event.record.get("is_debitnote") == false){
                                    event.record.set('final', 0);
                                    event.record.set('remaining_pay',accounting.unformat(event.record.get("remaining_pay"))+accounting.unformat(event.record.get("debitnote")));
                                    event.record.set('debitnote', 0);
                                    me.setSumDetailAR(c);
                                }
                                c.isEdit = 1;
                                store.commitChanges();
                            }else{
                                c.tools.alert.warning("Gagal ceklist. Debit Note hanya untuk angsuran terakhir");
                                event.record.set("is_debitnote",0);
                                store.commitChanges();
                            }
                        }
                        
                                    c.getSelectedSchedule();
                    }
                }
                if (paymentflag_id === 1) {
                    c.templateCoa = 1;
                } else if (paymentflag_id === 2) {
                    c.templateCoa = 2;
                }

                var gridcoadetail = c.getDetailvouchergrid();
               // me.generateNote(c);
                gridcoadetail.down('toolbar [action=generate]').setDisabled(false);
            },
            beforeedit: function (a, event) {
                //if (c.is_paid || c.is_realized || c.is_posting) {
                if ((c.is_realized && !c.is_f7_convert) || c.is_posting) {
                    return false;
                }
            }
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
            } else {
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
                                } else {
                                    event.record.set('final', finalAmount);
                                }
                            } else {
                                event.record.set('remaining_pay', event.record.get('amount'));
                                event.record.set('final', 0);
                                c.tools.alert.warning("Payment harus lebih besar dari : " + accounting.formatMoney(c.totalWithoutLastrecord));
                                return false;
                            }

                        } else {
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
        var store = grid.getStore();
        var row = grid.getSelectionModel().getSelection();
        var rec = grid.getSelectedRecord();
        var count = grid.getSelectionModel().getCount();
        var arr = [];
        var idxarr = [];
        var minval = 0;
        var minindex = 0;
        var tempval = false;
        var tempvalsh2 = false;
        var totalpay = 0;
        grid.down('[action=writeoffdenda]').setDisabled(true);
        //grid.down("toolbar [name=temppayval]").setValue();
        var paymentflag_id = 99;
        
        row.forEach(function (rec) {
            if(idxarr[rec.get('scheduletype_scheduletype')] == 0 || idxarr[rec.get('scheduletype_scheduletype')]==undefined || idxarr[rec.get('scheduletype_scheduletype')]==null){
                idxarr[rec.get('scheduletype_scheduletype')] = rec.index;
            }
            if(rec.index<idxarr[rec.get('scheduletype_scheduletype')]){
                idxarr[rec.get('scheduletype_scheduletype')] = rec.index;
            }
            arr.push(rec.get("termin"));
            totalpay = accounting.unformat(totalpay)+accounting.unformat(rec.get("remaining_balance"));
        });
//        grid.down("toolbar [name=temppayval]").setValue(accounting.formatMoney(totalpay));
        arr.sort();
        arr.forEach(function(v) {
            if(minval==0){
                minval = v;
            }
            if((v-minval)>1){
                tempval = true;
            }
            minval = v;
        });
        
        store.each(function (record, index) {
            if(index<idxarr[record.data['scheduletype_scheduletype']] && record.data['oppaid']>0 && record.data['payment_paymentflag_id']!=2){
                tempval = true;
            }
        });
        row.forEach(function (rec) {
            if(rec.get("payment_paymentflag_id")=="2" && rec.get("paymentype_paymenttype_id")!="441"){
                tempval = false;
            }
            if(rec.get("oppaid")<=0 && rec.get("amount")>0){
                tempval = true;
                tempvalsh2 = true;
            }
        });
        
        if (!c.is_realized || (c.is_realized && c.is_f7_convert)) {
            if (count === 1) {
                paymentflag_id = rec.get("payment_paymentflag_id");
                if (rec.get("oppaid") > 0) {
                    if(apps.subholdingId==2){
                        grid.down('[action=select]').setDisabled(false);
                    }else{
                        grid.down('[action=select]').setDisabled(tempval);
                    }
                    if(paymentflag_id==1){
                        grid.down('[action=estimasidenda]').setDisabled(false);
                    }
                    if(paymentflag_id==2){
                        grid.down('[action=writeoffdenda]').setDisabled(false);
                    }else{
                        grid.down('[action=writeoffdenda]').setDisabled(true);
                    }
                }
            } else {
                grid.down('[action=select]').setDisabled(true);
                grid.down('[action=writeoffdenda]').setDisabled(true);
                grid.down('[action=estimasidenda]').setDisabled(true);
                row.forEach(function (rec) {
                    if(paymentflag_id==99){
                        paymentflag_id = rec.get("payment_paymentflag_id");
                    }
                    if(paymentflag_id!=rec.get("payment_paymentflag_id")){
                        grid.down('[action=select]').setDisabled(true);
                    }else{
                        if (rec.get("oppaid") > 0) {
                            if(apps.subholdingId==2){
                                grid.down('[action=select]').setDisabled(tempvalsh2);
                            }else{
                                grid.down('[action=select]').setDisabled(tempval);
                            }
                            if(paymentflag_id==2){
                                grid.down('[action=writeoffdenda]').setDisabled(true);
                            }else{
                                grid.down('[action=writeoffdenda]').setDisabled(true);
                            }
                        }
                        
                    }
                });
            }
            // grid.down('[action=destroy]').setDisabled(row.length < 1);
        }
    },
    loadModelAr: function (c) {
        var me = this;
        var gridar = c.getDetailargrid();
        gridar.doInit();
        //c.voucherDetail.disableSave(c, true);
        gridar.getStore().load({
            params: {
                kasbank_id: c.kasbank_id
            },
            callback: function (rec, op) {
                if (op) {
                    gridar.attachModel(op);
                    c.is_erems = 0;
                    //me.getFirstTotal(c, c.kasbank_id);
                    // me.getTotalWithoutLastRecordNewv2(c, c.kasbank_id);
                    c.getSelectedSchedule();
                    me.GridAr(c, c.kasbank_id);
                    me.setSumDetailAR(c);
                    me.checkCountAr(c);
                    me.checkPaid(c);
                    // me.checkSchedule(c);
                    //  c.voucherDetail.disableSave(c, false);
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
        
        var gridvoucheres = c.getDetailescrowgrid();
        var storevoucheres = gridvoucheres.getStore();
        var purchaseletter_pencairankpr_id = '';
        
        var gridvoucherop = c.getOtherpaymentgrid();
        var storevoucherop = gridvoucherop.getStore();
        var total = 0;
        var amt = 0;
        var paymenttype_id='';
        if(c.templateCoa==10 || c.templateCoa==4){
            var sch = '';
            storevoucheres.each(function (rec) {
                sch += rec.get("schedule_schedule_id") + "~";
                total += parseFloat(rec.get('remaining_pay'));
                    purchaseletter_pencairankpr_id +=
                            rec.get("scheduleescrow_purchaseletter_pencairankpr_id") ? rec.get("scheduleescrow_purchaseletter_pencairankpr_id") + "~" :  0 + "~";
                
                amt += parseFloat(rec.get("remaining_pay")) + "~";
                pay += parseFloat(accounting.unformat(rec.get("remaining_pay")));
            });
            if(f.down("[name=kpr_parsial]").getValue()!='1'){
                c.schedule_id=sch;
            }else{
                c.schedule_id=purchaseletter_pencairankpr_id;
            }
            c.amountSelected = amt;
            c.paymenttype_id=paymenttype_id;
            c.purchaseletter_pencairankpr_id = purchaseletter_pencairankpr_id;
        }
        store.each(function (rec) {
            if (rec.get("paymentdetail_id")) {
                amount += parseFloat(accounting.unformat(rec.get("amount")));
            } else {
                amount += parseFloat(accounting.unformat(rec.get("oppaid")));

            }
            //amt+= parseFloat(rec.get("remaining_pay")) + "~";
            amt += (parseFloat(accounting.unformat(rec.get("remaining_pay"))+accounting.unformat(rec.get("debitnote")))) + "~";
            pay += parseFloat(accounting.unformat(rec.get("remaining_pay")));
            final += parseFloat(accounting.unformat(rec.get("final")));
        });
        if(c.templateCoa==2 || c.templateCoa==1){
            c.amountSelected = amt;
        }
        f.down("[name=sum_tagihan]").setValue(accounting.formatMoney(amount));
        f.down("[name=sum_pay]").setValue(accounting.formatMoney(pay));
        f.down("[name=sum_final]").setValue(accounting.formatMoney(final));
    },
    
    setSumDetailOt: function (c) {
        var me = this;
        var f = c.getFormdata();
        var amount = 0;
        var pay = 0;
        var final = 0;
        
        var gridvoucherop = c.getOtherpaymentgrid();
        var storevoucherop = gridvoucherop.getStore();
        storevoucherop.each(function (rec) {
            amount += parseFloat(accounting.unformat(rec.get("amount")));
            pay += parseFloat(accounting.unformat(rec.get("amount")));
            final += parseFloat(accounting.unformat(rec.get("final")));
        });
        f.down("[name=sum_tagihan]").setValue(accounting.formatMoney(amount));
        f.down("[name=sum_pay]").setValue(accounting.formatMoney(pay));
        f.down("[name=sum_final]").setValue(accounting.formatMoney(final));
    },
    setSumDetailAREsc: function (c) {
        var me = this;
        var f = c.getFormdata();
        var amount = 0;
        var pay = 0;
        var final = 0;
        var grid = c.getDetailescrowgrid();
        var store = grid.getStore();
        store.each(function (rec) {
            if (rec.get("paymentdetail_id")) {
                amount += parseFloat(accounting.unformat(rec.get("amount")));
            } else {
                amount += parseFloat(accounting.unformat(rec.get("oppaid")));

            }
            pay += parseFloat(accounting.unformat(rec.get("remaining_pay")));
            final += parseFloat(accounting.unformat(rec.get("final")));
        });
        f.down("[name=sum_tagihan]").setValue(accounting.formatMoney(amount));
        f.down("[name=sum_pay]").setValue(accounting.formatMoney(pay));
        f.down("[name=sum_final]").setValue(accounting.formatMoney(final));
    },
    escrowSelect: function (c, v, is_parsial) {
        var me = this;
        var cmpformdata = Ext.getCmp('formdatavoucherID');
        var gridesc = c.getEscrowgrid();
        var storegridesc = gridesc.getStore();
        var rec = gridesc.getSelectedRecord();
        var row = gridesc.getSelectionModel().getSelection();
        var notifduedatesh1 = '';
        var checkblockunit = c.checkblockunit(rec.get('unit_unit_id'));
        // console.log(checkblockunit);
        if ( checkblockunit.result == 1 ) {
            Ext.Msg.alert('warning', checkblockunit.msg);
            return false;
        }
        row.forEach(function (recxx) {
            if(recxx.get("purchaseletter_isnonppn")>0){
                notifduedatesh1 = notifduedatesh1+' Unit ini mendapatkan program insentif PPN DTP. ';
            }
        });
        if(is_parsial==true){
            if(notifduedatesh1!=''){
                Ext.MessageBox.confirm(
                'Confirm', notifduedatesh1+', Lanjutkan?', callbackFunctiondenda);
             function callbackFunctiondenda(btn) {
                if(btn == 'yes') {
                    me.chooseescrowSelect(c,v,is_parsial);
                }
             };

            }else{
                me.chooseescrowSelect(c,v,is_parsial);
            }
        }else{   
            me.chooseescrowSelect(c,v,is_parsial);
        }
    },
    chooseescrowSelect: function (c, v, is_parsial) {
        console.log(is_parsial);
        var me = this;
        var cmpformdata = Ext.getCmp('formdatavoucherID');
        if (!cmpformdata) {
            var w = c.instantWindow('FormData', 900, 'Add Voucher', 'create', 'myEscrowWindow');
        } else {
            v.up("window").close();
        }
        var f = c.getFormdata();
        c.paymentflag_id = 4; // 1 escrow payment
        if(is_parsial==true){
            c.templateCoa=10;
            f.down("[name=kpr_parsial]").setValue("1");
            f.down('[name=artype_id]').setValue(4);
        }else{
            c.templateCoa = 4;
            f.down('[name=artype_id]').setValue(2);
        }
        f.down("[name=is_pickar]").setValue(1);
        
        f.rowData = null;
        var gridesc = c.getEscrowgrid();
        var storegridesc = gridesc.getStore();
        var rec = gridesc.getSelectedRecord();
        var row = gridesc.getSelectionModel().getSelection();
        f.rowData = rec;
        var sch = '';
        var plkprid = '';
        row.forEach(function (recxx) {
            sch += recxx.get("schedule_schedule_id") + "~";
            plkprid += recxx.get("purchaseletter_pencairankpr_id") ? recxx.get("purchaseletter_pencairankpr_id") + "~" : recxx.get("scheduleescrow_purchaseletter_pencairankpr_id") + "~";
        });
        if(is_parsial==true){
            c.schedule_id = plkprid;
        }else{   
            c.schedule_id = sch;
        }
        if (c.browseHandler) {
            c.rowData = rec;
            c.projectId = rec.get("project_project_id");
            c.ptId = rec.get("pt_pt_id");
            f.setLoading("Please wait");
            c.is_erems = 0;
            c.voucherDetail.disableSave(c, true);
            c.formToMoney(f);
            me.loadEscrow(c, row, function () {
                me.changeCairDateEscrow(c);
                me.setSumDetailArDetail(c);
//                me.getSelectedEscrow(c, function () {
////                    Ext.getCmp('TabVoucherId').setActiveTab('tabDetailVoucher');
//                    c.voucherDetail.generateCoa(c, c.templateCoa, 'click');
//                });
            });
            f.down('[name=dataflow]').setValue('I');
            f.down("[name=kasbank_date]").setValue(c.dateNow);
            f.down("[name=payment_date]").setValue(c.dateNow);


            //escrow payment template manual dulu detail voucher coa nya manual
//            if (me.getIndexDetailAr(c) == '1') {
//                c.voucherDetail.generateCoa(c, c.templateCoa, 'schedule');
//            }
            //console.log('sd');
            f.setLoading(false);
        } else {
            me.tools.alert.warning("Failed to get Escrow Schema, Please try select Escrow Schema again.");
        }
    },
    loadEscrow: function (c, row, callback) {
        var me = this;
        var gridescrow = c.getDetailescrowgrid();
        var store = gridescrow.getStore();
        if (row) {
            store.add(row);
            store.commitChanges();
        }
        if (typeof callback === "function") {
            callback();
        }
    },
    changeCairDateEscrow: function (c) {
        var me = this;
        var gridesc = c.getDetailescrowgrid();
        var store = gridesc.getStore();
        var now = new Date();
        store.each(function (record) {
            record.set('pencairan_date', now);
            record.set('pengajuan_berkas_date', now);
        });
        store.commitChanges();
        gridesc.getView().refresh();
        //console.log(store);
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
        var gridchoose = c.getEscrowgrid();
        var rowesc = gridchoose.getSelectionModel().getSelection();
        var storeescrow = gridescrow.getStore();
        var f = c.getFormdata();
        var cluster = '';
        var customer = '';
        var type = '';
        var bankname = '';
        var unitnumber = '';
        var penke = '';
        var block = '';
        var isnonppn = 0;
        var harganetto = 0;
        var amount = 0;
        var totaldipick = 0;
        var pmkno = '21/PMK/2021';

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
                     
        var current_project_id = 0;
        var current_pt_id = 0;
        var purchaseletter_id = 0;

        Ext.each(rowesc, function (item) {
            isnonppn = item.get("purchaseletter_isnonppn");
            harganetto = accounting.unformat(item.get("purchaseletter_harga_netto"));
            purchaseletter_id = item.get("purchaseletter_purchaseletter_id");
            amount = item.get("amount");
            if(penke==''){
                penke = penke +item.get("RowNum")+  '';
            }else{
                penke = penke +' & '+item.get("scheduleescrow_RowNum")+  '';
            }

            current_project_id = item.get("project_project_id");
            current_pt_id = item.get("pt_pt_id");
            pmkno = tmp_pmkno;

            if (tgl_berlaku_pmkno !== null && tmp_pmkno !== null) {
                if(Ext.Date.format(item.get('duedate'), 'Y-m-d')>=tgl_berlaku_pmkno){
                    pmkno = tmp_pmkno;
                } else if(Ext.Date.format(item.get('duedate'), 'Y-m-d')>='2021-07-30' && Ext.Date.format(recAngs.get('duedate'), 'Y-m-d') < tgl_berlaku_pmkno){
                    pmkno = '103/PMK.010/2021';
                } 
            } else {
                if(Ext.Date.format(item.get('duedate'), 'Y-m-d')>='2021-07-30'){
                    pmkno = '103/PMK.010/2021';
                }
            }
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
        
        totaldipick = Math.round(amount*persentase_insentive_ppn);
        
        /* if(harganetto<="2000000000"){
            totaldipick = Math.round(amount*0.1);
        }
        if(harganetto>"2000000000" && harganetto<="5000000000"){
            totaldipick = Math.round(amount*4.7619047618/100);
        } */
        storeescrow.each(function (rec) {
            cluster = rec.get("cluster_cluster");
            customer = rec.get("customer_name");
            type = rec.get("unit_unit_type");
            unitnumber = rec.get("unit_unit_number");
            bankname = rec.get("bank_name");
            block = rec.get("unit_unit_block");
            notes += rec.get("description") + ",";
            sch += rec.get("schedule_schedule_id") + "~";
            kprid += rec.get("purchaseletter_pencairankpr_id") ? rec.get("purchaseletter_pencairankpr_id") + "~" : rec.get("scheduleescrow_purchaseletter_pencairankpr_id") + "~";
            amt += parseFloat(rec.get("remaining_pay")) + "~";
            total += parseFloat(rec.get('remaining_pay'));
        });
        // console.log(amt);
        f.down("[name=sum_total_detail]").setValue(accounting.formatMoney(total));
        if(f.down("[name=kpr_parsial]").getValue()=='1'){
            c.schedule_id = kprid;
        }else{   
            c.schedule_id = sch;
        }
        c.amountSelected = amt;
        c.totalTemp = accounting.formatMoney(total);
        c.purchaseletter_pencairankpr_id = kprid;
        c.notes = 'KPR ESCROW ' + c.unit_number+' '+cluster +' a.n '+customer+ ' - ' + notes;
        if(f.down("[name=kpr_parsial]").getValue()=='1'){
            c.notes = 'Pencairan KPR ke '+penke+' Type: '+type+' - Bank: '+bankname+' - Cluster: '+cluster+' - Block: '+block+' - No.Unit: '+unitnumber;
            if(isnonppn==1){
                f.down('label[id=labelPpndtpId]').setText('UNIT PPN DTP');
                c.notes = c.notes + '\nPPN DTP eks PMK No '+pmkno+' senilai Rp.'+accounting.formatMoney(totaldipick);
            }
        }
        if (typeof callback === "function") {
            callback();
        }
    },
    loadModelEscrow: function (c) {
        var me = this;
        var gridesc = c.getDetailescrowgrid();
        gridesc.doInit();
        c.voucherDetail.disableSave(c, true);
        gridesc.getStore().load({
            params: {
                kasbank_id: c.kasbank_id
            },
            callback: function (rec, op) {
                if (op) {
                    gridesc.attachModel(op);
                    c.is_erems = 0;
                    me.setSumDetailAR(c);
                    c.voucherDetail.disableSave(c, false);
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
        s.sort('duedate', 'ASC');
        var jt = s.getCount(); // jumlah tagihan
        var sisa = 0;
        var payValue = 0; /// nilai payment di grid
        var flagTry = false;
        var lastRow = -1;
        c.effectedSch = []; // reset list schedule id yang dibayar
        var totalDenda = 0;
        var paymentflag_id = 0;
        if (jt > 0) { /// jika ada nilai payment dan ada tagihan
            
            var schedule_id = '';
            var sisaschedule = '';
            s.each(function (rec) {
                schedule_id = schedule_id+rec.get("schedule_id")+'~';
                paymentflag_id = rec.get("payment_paymentflag_id");
                sisaschedule = rec.get("purchaseletter_sisaschedulenonkpr");
                rec.beginEdit();
                if(accounting.unformat(rec.get("oppaid"))<=accounting.unformat(pay)){
                    rec.set({
                        remaining_pay: rec.get("oppaid"),
                        final: 0,
                    });
                    pay = accounting.unformat(pay) - accounting.unformat(rec.get("oppaid"));
                }else{
                    rec.set({
                        remaining_pay: pay,
                        final: accounting.unformat(rec.get("oppaid"))-accounting.unformat(pay),
                    });
                    
                    pay = 0;
                }
                rec.endEdit();
                c.getSelectedSchedule();
                s.commitChanges();
            });
            if(paymentflag_id==2){
                me.getAnotherDenda(c,schedule_id,(pay<0?-1*pay:pay),sisaschedule);
            }
//            if (!c.tagihanDefaultValue) {
//                s.rejectChanges();
//                c.tagihanDefaultValue = [];
//                for (var i = 0; i < jt; i++) {
//                    var rp = c.xFormatFloat(s.getAt(i).get("remaining_pay")) > 0 ? c.xFormatFloat(s.getAt(i).get("remaining_pay")) : 0;
//                    c.tagihanDefaultValue.push({
//                        rb: c.xFormatFloat(s.getAt(i).get("oppaid")),
//                        pay: 0,
//                        denda: c.xFormatFloat(s.getAt(i).get("denda")),
//                        remaining_denda: c.xFormatFloat(s.getAt(i).get("remaining_denda")),
//                        id: c.tools.intval(s.getAt(i).get("schedule_id")),
//                    });
//                }
//            } else {
//                flagTry = true;
//            }
//            for (var i = 0; i < jt; i++) {
//                var rec = s.getAt(i);
//                var rb = flagTry ? c.tagihanDefaultValue[i]["rb"] : c.xFormatFloat(rec.get("oppaid"));
//                payValue = 0;
//                var payTagihan = 0;
//                if (pay > 0) {
//                    if (rb > pay) {
//                        rb = rb - pay;
//                        payValue = pay;
//                        pay = 0;
//                    } else {
//                        payValue = rb;
//                        pay = pay - rb;
//                        rb = 0;
//                    }
//                    if (c.tools.floatval(c.tagihanDefaultValue[i]["rb"]) > 0) {
//                        c.effectedSch.push(i);
//                        lastRow = i;
//                    }
//                }
//                var finalPay = c.tagihanDefaultValue[i]["pay"];
//                var finalRb = c.tagihanDefaultValue[i]["rb"];
//                var denda = 0;
//                payValue = c.xFormatFloat(payValue);
//                // update grid
//                //if (payValue > 0 || (payValue == 0 && rb == 0)) {
//                if (payValue > 0 || (payValue == 0 && rb == 0)) {
//                    finalPay = payValue + c.tagihanDefaultValue[i]["pay"];
//                    finalRb = rb;
//                    //.denda = me.hitungDenda(payValue, rec, f.down("[name=cair_date]").getValue(), me.tagihanDefaultValue[i]["remaining_denda"])
//                } else {
//                    denda = c.tagihanDefaultValue[i]["remaining_denda"];
//                }
//                totalDenda += denda;
//
//                rec.beginEdit();
//                rec.set({
//                    remaining_pay: finalPay,
//                    final: finalRb,
//                    denda: denda
//                });
//                rec.endEdit();
//                c.getSelectedSchedule();
//                rec = null;
//            }
        }
        s = null;
        me.setSumDetailAR(c);
        c.isEdit = 1;
//        if (rec) {
//            s.commitChanges();
//            c.getSelectedSchedule();
//        }
    },
    addTagihanDefault: function (c, row) {
        if (c.tagihanDefaultValue) {
            c.tagihanDefaultValue.push({
                rb: c.xFormatFloat(row.get("oppaid")),
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
            if (c.is_paid || c.is_realized || c.is_posting) {
                grid.down("toolbar [name=paymentall]").setDisabled(true);
            } else {
                grid.down("toolbar [name=paymentall]").setDisabled(false);
            }
        }
    },
    checkPaid: function (c) {
        var me = this;
        var grid = c.getDetailargrid();
        if ((c.is_realized && !c.is_f7_convert) || c.is_posting) {
            grid.down("toolbar [action=browseSchedule]").setDisabled(true);
        }
    },
    checkClosing: function (c) {
        var me = this;
        var argrid = c.getDetailargrid();
        var detailgrid = c.getDetailvouchergrid();
        if (c.is_closed) {
            argrid.down("toolbar [action=browseSchedule]").setDisabled(true);
            detailgrid.down("toolbar [action=create]").setDisabled(true);
        }
    },
    destroySelection: function (c, grid, confirm, form, variable, callback) {
        var me = this;
        if (grid) {
            var store = grid.getStore();
            var rec = grid.getSelectedRecord(), row = grid.getSelectionModel().getSelection();
            if (confirm) {
                Ext.Msg.show({
                    title: 'Warning',
                    msg: 'Are you sure delete this data?',
                    buttons: Ext.Msg.YESNO,
                    icon: Ext.Msg.QUESTION,
                    fn: function (clicked) {
                        if (clicked === "yes") {
                            for (var i = 0; i < row.length; i++) {
                                var id = row[i]['data'][variable];
                                if (id) {
                                    form.deletedArPaymentRows.push(id);
                                }
                                store.remove(row[i]);
                            }
                            if (typeof callback === "function") {
                                callback();
                            }
                        }
                    }
                });
            } else {
                for (var i = 0; i < row.length; i++) {
                    var id = row[i]['data'][variable];
                    if (id) {
                        form.deletedOtherPaymentRows.push(id);
                    }
                    store.remove(row[i]);
                }
                if (typeof callback === "function") {
                    callback();
                }
            }

        }
    },
    setSumDetailArDetail: function (c) {
        var me = this;
        var f = c.getFormdata();
        var total = 0;
        var grid = c.getDetailescrowgrid();
        var store = grid.getStore();
        store.each(function (rec) {
            total += parseFloat(accounting.unformat(rec.get("amount")));
        });
//        console.log('asd');
//        console.log(total);
        // f.down("[name=sum_total_detail]").setValue(accounting.formatMoney(total));
        f.down("[name=sum_tagihan]").setValue(accounting.formatMoney(total));
        f.down("[name=sum_pay]").setValue(accounting.formatMoney(total));
    },
    checkSchedule: function (c, callback, loading, closewin) {
        var me = this;
        var gridar = c.getDetailargrid();
        var store = gridar.getStore();
        var schedule_id = [];
        var f = c.getFormdata();
        c.is_closewarning2 = 0;
        store.each(function (rec) {
            if (rec.get("schedule_id")) {
                schedule_id += rec.get("schedule_id") + '~';
            }
        });
        c.schedule_id_arpayment = schedule_id;
        //console.log(schedule_id);
        f.setLoading("Checking active schedule");
        c.tools.ajax({
            params: {module: c.controllerName, schedule_id: schedule_id},
            form: f,
            success: function (data, model) {

                try {
                    if (data.result) {
                        if (data.result.amount) {
                            f.setLoading(false);
                            c.is_closewarning2 = 1;
                            c.tools.alert.warning("Tagihan <b> " + data.result.scheduletype + "</b>\n\
dengan nilai <b> " + accounting.formatMoney(data.result.amount) + " </b> tidak valid atau reschedule. <br>\n\
 Silahkan menghapus voucher <b> " + data.result.vid + "</b>",
                                    function () {

                                        if (!closewin) {
                                            f.up("window").close();
                                        }

                                    }
                            );
                            return false;
                        } else {
                            c.is_closewarning2 = 0;
                        }
                    }

                    if (typeof callback === "function") {
                        callback();
                    }

                } catch (err) {
                    console.log(err.message);
                    me.tools.alert.warning("Failed to request.");
                }
                if (!loading) {
                    f.setLoading(false);
                }

            }
        }).read('checkschedule');
    },
    checkMutpleSchedule: function (c, f, sch, callback, loading, closewin) {
        var me = this;
        c.is_closewarning2 = 0;
        f.setLoading("Checking active schedule");
        c.tools.ajax({
            params: {module: c.controllerName, schedule_id: sch},
            form: f,
            success: function (data, model) {

                try {
                    if (data.result) {

                        if (data.result.result === 0) {
                            f.setLoading(false);
                            c.is_closewarning2 = 0;
                            // console.log(c.is_closewarning2);
                        } else {
                            f.setLoading(false);
                            c.is_closewarning2 = 1;
                            //console.log(data.result.result);
                            c.tools.alert.warning("Tagihan <b> " + data.result.scheduletype + "</b>\n\
dengan nilai <b> " + accounting.formatMoney(data.result.amount) + " </b> tidak valid atau reschedule. <br>\n\
 Silahkan menghapus voucher <b> " + data.result.vid + "</b>",
                                    function () {
                                        if (!closewin) {
                                            f.up("window").close();
                                        }

                                    }
                            );
                            return false;
                        }
                    }




                    if (typeof callback === "function") {
                        callback();
                    }

                } catch (err) {
                    console.log(err.message);
                    me.tools.alert.warning("Failed to request.");
                }
                if (!loading) {
                    f.setLoading(false);
                }

            }
        }).read('checkmutipleschedule');
    },
    generateNote: function (c) {
        var me = this;
        var stText = '';
        var f = c.getFormdata();
        /// get list schedule type yang dibayar
        var grid = c.getDetailargrid();
        var store = grid.getStore();
        store.each(function (record) {
            console.log(record);
            
            if(record.get("final") === 0) {
                
            }
        });

        f.down("[name=description]").setValue('123');

    },
    
    getAnotherDenda: function (c,schedule_id,amountsisa,sisaschedule) {
        var me = this;
        var p = c.getFormdata();
        var g = c.getDetailargrid();
        var s = g.getStore();
        p.setLoading('Get Another Denda');
        
        c.localStore.anotherar.loadData([],false);
        var sa = c.localStore.anotherar;
        c.tools.ajax({
            params: {
                module: c.controllerName,
                value:schedule_id,
                value2:amountsisa,
                value3:2
            },
            form: p,
            success: function (data) {
                try {
                    if (data) {
                        var count = 0;
                        data.forEach(function (r) {
                            count = count+1;
                        });
                        data.forEach(function (rec) {
                            var amount = 0;
                            sisaschedule = rec['purchaseletter']['sisaschedulenonkpr'];
                            amount = (accounting.unformat(rec['schedule']["oppaid"])>=accounting.unformat(amountsisa)?accounting.unformat(amountsisa):accounting.unformat(rec['schedule']["oppaid"]))
//                            if(count=1){
//                                amount = amountsisa;
//                            }
                            if(amount>0){
                                sa.add({
                                    schedule_id: rec['schedule']["schedule_id"],
                                    amount: rec['schedule']["amount"],
                                    description: rec['schedule']["description"],
                                    duedate: rec['schedule']["duedate"],
                                    oppaid: rec['schedule']["oppaid"],
                                    termin: rec['schedule']["termin"],
                                    payment_paymentflag_id: 2,
                                    paymenttype_paymenttype_id:2,
                                    remaining_pay:amount,
                                    unit_cluster:rec['unit']["cluster"],
                                    unit_cluster_code: rec['unit']["cluster_code"],
                                    unit_cluster_id: rec['unit']["cluster_id"],
                                    unit_mh_type:rec['unit']["mh_type"],
                                    unit_unit_id: rec['unit']["unit_id"],
                                    unit_unit_number: rec['unit']["unit_number"],
                                    scheduletype_description: rec['scheduletype']["description"],
                                    scheduletype_scheduletype: rec['scheduletype']["scheduletype"],
//                                    scheduletype_description: schtypedesc,
//                                    scheduletype_scheduletype: schtype,
                                    purchaseletter_purchaseletter_id:rec['schedule']["purchaseletter_id"],
                                    purchaseletter_purchaseletter_no:rec['purchaseletter']["purchaseletter_no"],
                                    purchaseletter_sisaschedulenonkpr:rec['purchaseletter']["sisaschedulenonkpr"],
                                    purchaseletter_purchasele_date:rec['purchaseletter']["purchasele_date"],
                                    purchaseletter_customer_id:rec['purchaseletter']["customer_id"],
                                    pt_pt_id:rec['pt']["pt_id"],
                                    project_project_id:rec['project']["project_id"],
                                    project_code:rec['project']["code"],
                                    project_subholding_id:rec['project']["project_subholding_id"],
                                    noAR:rec['schedule']["noAR"],
                                    customer_name:rec['customer']["name"]
                                });
                            }
                            amountsisa = amountsisa - rec['schedule']["oppaid"];
                        });
                        sa.each(function(rec){
                            var ktm = false;
                            s.each(function (srec) {
                                if(rec.get("schedule_id")==srec.get("schedule_id")){
                                    ktm = true;
                                }
                            });
                            if(ktm==false){
                                me.loadAR(c, rec);
                            }
                        });
                        if(amountsisa>0 && (sisaschedule=='tidakada' || sisaschedule=='' || sisaschedule==undefined)){
                            s.sort('duedate', 'ASC');
                            for (var i = 0; i < s.getCount(); i++)
                            {
                                s.each(function (recordaccount, accountindex) {
                                    if(i==s.getCount()-1 && i==accountindex){
                                        recordaccount.beginEdit();
                                        recordaccount.set({
                                            remaining_pay: accounting.unformat(recordaccount.get("remaining_pay"))+amountsisa,
                                        });
                                        recordaccount.endEdit();
                                    }
                                });
                            }
                        }
                        c.getSelectedSchedule();
                        me.setSumDetailAR(c);
                        me.checkCountAr(c);
                    }

                } catch (err) {
                    console.log(err.message);
                    p.setLoading(false);
                    c.tools.alert.warning("Failed to get another denda .");
                }
                p.setLoading(false);
            }
        }).read('getanotherdenda');
    },
});
