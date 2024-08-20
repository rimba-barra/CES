Ext.define('Cashier.controller.Juploadsh1', {
    extend: 'Cashier.library.template.controller.Controller2',
    alias: 'controller.Juploadsh1',
    requires: [
        'Cashier.library.tools.Mytools',
        'Cashier.library.box.Config',
        'Cashier.library.box.tools.EventSelector',
        'Cashier.library.box.tools.Tools'
    ],
    views: [
        'juploadsh1.Panel',
        'juploadsh1.FormData',
        'juploadsh1.DataUploadGrid',
        'juploadsh1.FormDataUpload',
    ],
    stores: [
        'Juploadsh1',
        'Ptbyusermulti'
    ],
    models: [
        'Juploadsh1',
        'Projectpt'
    ],
    refs: [
        {
            ref: 'panel',
            selector: 'juploadsh1panel'
        },
        {ref: 'formdata', selector: 'juploadsh1formdata'},
        {ref: 'formdataupload', selector: 'juploadsh1formdataupload'},
        {ref: 'datauploadgrid', selector: 'juploadsh1datauploadgrid'},
        {ref: 'winaj', selector: 'win-uploadformdata'},
    ],
    //setting properties variabel
    controllerName: 'juploadsh1',
    fieldName: '',
    bindPrefixName: 'Juploadsh1',
    urlsubmit: 'cashier/juploadsh1/create',
    yeardata: null, fromdate: null, untildate: null, getyear: null,
    form: null, value: null, info: null, senddata: null,
    constructor: function (configs) {
        this.callParent(arguments);
        var me = this;
        this.myConfig = new Cashier.library.box.Config({
            _controllerName: me.controllerName
        });
    },
    init: function (application) {
        var me = this;
        var events = new Cashier.library.box.tools.EventSelector();
        this.control(events.getEvents(me, me.controllerName));
        me.tools = new Cashier.library.box.tools.Tools({config: me.myConfig});

        this.control({
            'juploadsh1panel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: function (panel) {
                    me.getDatauploadgrid().getStore().removeAll();
                    me.getDatauploadgrid().getStore().sync();
                    panel.up('window').maximize();
//                    me.getFormdata().down("[name=projectpt_id]").getStore().load();
                }
            },
            'juploadsh1formdata': {
                afterrender: function (panel) {
                    me.getFormdata().down("[name=is_merge_coa]").setValue('no');
                }
            },
            'juploadsh1formdata button[action=submit]': {
                // click: this.dataSubmit
                click: this.dataSubmitV2
            },
            'juploadsh1formdata button[action=reset]': {
                click: function (v) {
                    var me = this;
                    me.getDatauploadgrid().getStore().removeAll();
                    me.getDatauploadgrid().getStore().sync();
                    me.getDatauploadgrid().down('[name=debetField]').setValue('');
                    me.getDatauploadgrid().down('[name=creditField]').setValue('');
                    
                }
            },
            'juploadsh1datauploadgrid toolbar button[action=upload]': {
                click: function (v) {
                    var me = this;
                    me.FormDataUploadShow();
                    
                }
            },
            'juploadsh1datauploadgrid [name=debetField]': {
                change: function () {
                    var me = this;
                    var field = me.getDatauploadgrid();
                    me._formatCurrency(field.down('[name=debetField]'), 'change');
                    
                }
            },
            'juploadsh1datauploadgrid [name=creditField]': {
                change: function () {
                    var me = this;
                    var field = me.getDatauploadgrid();
                    me._formatCurrency(field.down('[name=creditField]'), 'change');
                    
                }
            },
            'juploadsh1formdataupload': {
                boxready: function () {
                    var me = this;
                    $('#sample').on('click', function(event) {
                        event.preventDefault();

                        me.downloadSample();
                    });
                }
            },
            'juploadsh1formdataupload button[action=upload]': {
                click: function () {
                    this.UploadJournal();
                }
            },
            'juploadsh1formdataupload [name=file-path]': {
                change: function(me) {
                    this.validatefiletype(me);
                }
            },
            'juploadsh1formdata [name=btnCheckJournal]': {
                click: function() {
                    this.checkJournalNotBalance(0);
                }
            }
//            'juploadsh1formdata [name=projectpt_id]': {
//                change: function (field, newValue, oldValue, desc) {
//                    me.ProjectPtChange(newValue);
//                }
//            },
        });
    },
    FormDataUploadShow: function(){
        var me = this;
        var f = me.getFormdata();
//        console.log(f.down("[name=projectpt_id]").getValue());
//        if(f.down("[name=projectpt_id]").getValue()==null){
//            me.tools.alert.warning("Please choose your company first");
//        }else{
            me.instantWindow('FormDataUpload', 500, 'Upload Excel', 'create', 'myvoucheformpayment');
//        }
    },
//    ProjectPtChange: function(projectpt_id){
//        var me = this;
//        var f = me.getFormdata();
//        var e = f.down("[name=projectpt_id]");
//        var x = e.getStore().findRecord("projectpt_id", projectpt_id);
//        var store = me.getDatauploadgrid().getStore();
//        if(projectpt_id!=''){
//            store.each(
//                function(storeRecord, index, count) {
//                    store.getAt(index).set('project_id', x.data['project_id']);  
//                    store.getAt(index).set('pt_id', x.data['pt_id']);
//                }
//            );
//        }
//        
//    },
    UploadJournal: function(){
        var me = this;
        var f = me.getFormdata();
//        var e = f.down("[name=projectpt_id]");
//        var x = e.getStore().findRecord("projectpt_id", f.down("[name=projectpt_id]").getValue());
        var form = me.getFormdataupload();
        var grid = me.getDatauploadgrid();
        var store = me.getDatauploadgrid().getStore();
//        form.down("[name=project_id]").setValue(x.data['project_id']);
//        form.down("[name=pt_id]").setValue(x.data['pt_id']);

        var filename = form.down("[name=file-path]").getValue();
        if (filename == "" || filename == null) {
            Ext.MessageBox.show({
                title: 'Invalid file',
                msg: 'Please select files to upload',
                buttons: Ext.Msg.OK,
                icon: Ext.Msg.ERROR
            });
            return false;
        }

        form.down("[name=mode_read]").setValue('upload');
        if(true){
            form.submit({
                url: 'cashier/juploadsh1/read',
                waitMsg: 'Processing data...',
                success: function(fp, o) {
                    var dt = o.result.data;
                    store.add(dt[0]);
                    /*grid.down('[name=debetField]').setValue(parseInt(o.result.amountDebet));
                    grid.down('[name=creditField]').setValue(parseInt(o.result.amountCredit));*/
                    grid.down('[name=debetField]').setValue(o.result.amountDebet);
                    grid.down('[name=creditField]').setValue(o.result.amountCredit);
                    form.up('window').close();
                },
                failure: function(fp, o) {
                    if ( o.result.data.msg ) {
                        Ext.Msg.alert('Warning', o.result.data.msg);
                    }else{
                        Ext.Msg.alert('Warning', 'Processing failed !');
                    }
                }
            });
        }
    },
    dataSubmit: function () {
        var me = this;
        var storeaj = me.getDatauploadgrid().getStore();
        var p = me.getFormdata();
//        console.log(storeaj);
        var coutaj = storeaj.getCount();
        var returnmsg = '<ul>';
        var returncnfrmmsg = '<ul>';
        var confirm = false;
        var errorcnfrmmsg = [];
        var result = true;
        var errormsg = [];
        var uploadunique = [];
        Ext.MessageBox.confirm(
            'Confirm', 'Are you sure you want to do this ?', callbackFunction);
         function callbackFunction(btn) {
            if(btn == 'yes') {
                p.setLoading("Prepare for validating data...");
                if (coutaj > 0) {
                    var i = 0;
                    var task = new Ext.util.DelayedTask(function() {
                        if (i <= coutaj) {
                            var err = 0;
                            storeaj.each(function (recordaccount, accountindex) {
                                if (i == accountindex) {
                                    Ext.Ajax.request({
                                        url: 'cashier/juploadsh1/read',
                                        method: 'POST',	
                                        async: false,
                                        timeout: 100000000,
                                        params: {
                                            data: Ext.encode(recordaccount.data),
                                            mode_read: 'validation'
                                        },
                                        success: function (response) {
    
                                            var data = Ext.JSON.decode(response.responseText);
                                            var coa_detail = recordaccount.data['coa_detail'].replace(".","");
                                            if(recordaccount.data['voucher_date']=='' ||recordaccount.data['voucher_date']==null ||recordaccount.data['voucher_date']==undefined){
                                                result = false;
                                                if(errormsg[coa_detail.replace(".","")+""+recordaccount.data['project_id']+""+recordaccount.data['pt_id']]===undefined){
                                                    errormsg.push(recordaccount.data['coa_detail']+""+recordaccount.data['project_id']+""+recordaccount.data['pt_id']);
                                                    returnmsg = returnmsg + '<li> Pastikan tanggal tidak kosong dan format tanggal YYYY-MM-DD. </li>';
                                                }
                                            }
                                            if(data.data['IS_CLOSING']==true){
                                                result = false;
                                                if(errormsg[coa_detail.replace(".","")+""+recordaccount.data['project_id']+""+recordaccount.data['pt_id']]===undefined){
                                                    errormsg.push(recordaccount.data['coa_detail']+""+recordaccount.data['project_id']+""+recordaccount.data['pt_id']);
                                                    returnmsg = returnmsg + '<li> Journal Date is not allowed to upload because closing date. </li>';
                                                }
                                            }
                                            if(data.data['IS_EXIST']==false){
                                                result = false;
                                                if(errormsg[coa_detail.replace(".","")+""+recordaccount.data['project_id']+""+recordaccount.data['pt_id']]===undefined){
                                                    errormsg.push(recordaccount.data['coa_detail']+""+recordaccount.data['project_id']+""+recordaccount.data['pt_id']);
                                                    returnmsg = returnmsg + '<li> COA '+recordaccount.data['coa_detail']+' is doesn`t exist in Master Coa for PROJECT_ID '+recordaccount.data['project_id']+' and PT_ID '+recordaccount.data['pt_id']+'. </li>';
                                                }
                                            }
                                            if(data.data['kelsub_id']!=0 && recordaccount.data['sub_unit']==''){
                                                result = false;
                                                if(errormsg[coa_detail.replace(".","")+"00"+recordaccount.data['project_id']+""+recordaccount.data['pt_id']]===undefined){
                                                    errormsg.push(coa_detail.replace(".","")+"kelsub"+recordaccount.data['project_id']+""+recordaccount.data['pt_id']);
                                                    returnmsg = returnmsg + '<li> COA '+recordaccount.data['coa_detail']+' need a Sub Account. Please insert a sub in column SUB on your file upload. </li>';
                                                }
                                            }
                                            if(data.data['kelsub_id']!=0 && recordaccount.data['sub_unit']!='' && data.data['IS_EXIST_SUB']==false){
                                                result = false;
                                                if(errormsg[coa_detail.replace(".","")+"00"+recordaccount.data['project_id']+""+recordaccount.data['pt_id']]===undefined){
                                                    errormsg.push(coa_detail.replace(".","")+"sub"+recordaccount.data['project_id']+""+recordaccount.data['pt_id']);
                                                    returnmsg = returnmsg + '<li> SUB '+recordaccount.data['sub_unit']+' is doesn`t exist. Please insert a new sub in Master Sub Account. </li>';
                                                }
                                            }
                                            if(data.data['IS_EXIST_PROJECTPT']==false){
                                                result = false;
                                                if(errormsg[recordaccount.data['project_id']+""+recordaccount.data['pt_id']]===undefined){
                                                    errormsg.push(recordaccount.data['project_id']+""+recordaccount.data['pt_id']);
                                                    returnmsg = returnmsg + '<li> PROJECT_ID '+recordaccount.data['project_id']+' and PT_ID '+recordaccount.data['pt_id']+' is doesn`t exist in Master Project PT. Please contact administrator.</li> ';
                                                }
                                            }
                                            if(data.data['IS_EXIST_UPLOADID']!=""){
                                                confirm = true;
                                                if(errorcnfrmmsg[recordaccount.data['project_id']+""+recordaccount.data['pt_id']+""+recordaccount.data['uploaduniquenumber']]===undefined){
                                                    errorcnfrmmsg.push(recordaccount.data['project_id']+""+recordaccount.data['pt_id']+""+recordaccount.data['uploaduniquenumber']);
                                                    returncnfrmmsg = returncnfrmmsg + '<li> JOURNAL ID '+recordaccount.data['uploaduniquenumber']+' pada PROJECT_ID '+recordaccount.data['project_id']+' dan PT_ID '+recordaccount.data['pt_id']+' di file anda sudah pernah digunakan.</li> ';
                                                }
                                            }
                                            if(data.data['IS_EXIST_PREFIX']==false){
                                                result = false;
                                                if(errormsg[recordaccount.data['project_id']+""+recordaccount.data['pt_id']]===undefined){
                                                    errormsg.push(recordaccount.data['project_id']+""+recordaccount.data['pt_id']);
                                                    returnmsg = returnmsg + '<li>PREFIX '+recordaccount.data['prefix']+' is doesn`t exist in PROJECT_ID '+recordaccount.data['project_id']+' and PT_ID '+recordaccount.data['pt_id']+'. Please insert prefix '+recordaccount.data['prefix']+' in Master Prefix.</li> ';
                                                } 
                                            }else{
                                                if(data.data['IS_CASHIER_PREFIX']==1 || data.data['IS_CASHIER_PREFIX']==true){
                                                    result = false;
                                                    if(errormsg[recordaccount.data['project_id']+""+recordaccount.data['pt_id']]===undefined){
                                                        errormsg.push(recordaccount.data['project_id']+""+recordaccount.data['pt_id']);
                                                        returnmsg = returnmsg + '<li>PREFIX '+recordaccount.data['prefix']+' is not allowed to upload journal.</li> ';
                                                    } 
                                                }
                                            }
                                            if (data.data['IS_EXIST_JOURNAL_NO'] == 1 || data.data['IS_EXIST_JOURNAL_NO'] == true) {
                                                result = false;
                                                if(errormsg[recordaccount.data['project_id']+""+recordaccount.data['pt_id']]===undefined){
                                                    errormsg.push(recordaccount.data['project_id']+""+recordaccount.data['pt_id']);
                                                    returnmsg = returnmsg + '<li> JOURNAL NO. '+recordaccount.data['voucher_no']+' is already exists.</li> ';
                                                }
                                            }
                                            if(recordaccount.data['cashflow']!=''){
                                                if(data.data['IS_EXIST_CASHFLOW']==false){
                                                    result = false;
                                                    if(errormsg[recordaccount.data['project_id']+""+recordaccount.data['pt_id']]===undefined){
                                                        errormsg.push(recordaccount.data['project_id']+""+recordaccount.data['pt_id']);
                                                        returnmsg = returnmsg + '<li>Cashflow '+recordaccount.data['cashflow']+' is doesn`t exist in PROJECT_ID '+recordaccount.data['project_id']+' and PT_ID '+recordaccount.data['pt_id']+'. Please insert cashflow '+recordaccount.data['cashflow']+' in Master Cashflow and Setupcashflow.</li> ';
                                                    } 
                                                }else{
                                                    if(data.data['IS_EXIST_CASHFLOW_COA']==false){
                                                        result = false;
                                                        if(errormsg[recordaccount.data['project_id']+""+recordaccount.data['pt_id']]===undefined){
                                                            errormsg.push(recordaccount.data['project_id']+""+recordaccount.data['pt_id']);
                                                            returnmsg = returnmsg + '<li>COA '+recordaccount.data['coa_detail']+' is doesn`t exist in Cashflow '+recordaccount.data['cashflow']+' PROJECT_ID '+recordaccount.data['project_id']+' and PT_ID '+recordaccount.data['pt_id']+'. Please insert coa '+recordaccount.data['coa_detail']+' in Master Setupcashflow.</li> ';
                                                        } 
                                                    }
                                                }
                                            }
                                            if (recordaccount.data['prefix']!='' && data.data['IS_ACTIVE_PREFIX'] == 0){
                                                result = false;
                                                if(errormsg[recordaccount.data['project_id']+""+recordaccount.data['pt_id']]===undefined){
                                                    errormsg.push(recordaccount.data['project_id']+""+recordaccount.data['pt_id']);
                                                    returnmsg = returnmsg + '<li> Journal Prefix '+recordaccount.data['prefix']+' is inactive.</li> ';
                                                }
                                            }
    
                                            if(jQuery.inArray(recordaccount.data['project_id']+""+recordaccount.data['pt_id']+""+recordaccount.data['uploaduniquenumber'], uploadunique)==-1){
                                                uploadunique.push(recordaccount.data['project_id']+""+recordaccount.data['pt_id']+""+recordaccount.data['uploaduniquenumber']);
                                            }


                                        },
                                        failure: function (response) {
                                            err = err + 1;
                                        }
                                    });
                                }
                            });
                            var perc = (i / coutaj) * 100;
                            if (err > 0) {
                                Ext.Msg.alert("Error", "An error occurred, the data type you entered was wrong");
                                task.cancel();
                                p.setLoading(false);
                                return false;
                            } else {
                                p.setLoading("Validating data... ("+perc.toFixed(2)+"%)");
                                task.delay(200);
                            }
                            i++;
                        } else {
                            p.setLoading("Prepare for processing journal ...");
                            var taskNext = new Ext.util.DelayedTask(function(){
                                me.createJournalProcess(returnmsg, returncnfrmmsg, result, uploadunique);
                            })
                            taskNext.delay(200);
                        }
                    })
                    task.delay(200);
                }else{
                    me.tools.alert.warning("Data grid kosong silahkan Upload file terlebih dahulu.");
                    p.setLoading(false);
                    return false;
                }
            } else {
                
            }

         };

        
    },
    createJournalProcess: function(returnmsg, returncnfrmmsg, result, uploadunique) {
        var me = this;
        var storeaj = me.getDatauploadgrid().getStore();
        var p = me.getFormdata();
        var coutaj = storeaj.getCount();
        var returnmsg = returnmsg + '</ul>';
        var returncnfrmmsg = returncnfrmmsg + '</ul>';
        var nextProcess = false;
        var confirm = false;
        var errormsg = [];

        returnmsg = returnmsg + '</ul>';
        returncnfrmmsg = returncnfrmmsg + '</ul>';
        if(result==true){      
            
            var i = 0;
            var task = new Ext.util.DelayedTask(function() {
                if (i <= coutaj) {
                    storeaj.each(function (recordaccount, accountindex) {

                        if (i == accountindex) {
    //                                    console.log(recordaccount.data);
                            Ext.Ajax.request({
                                url: 'cashier/juploadsh1/create',
                                method: 'POST',	
                                async: false,
                                timeout: 1000000,
                                params: {
                                    data: Ext.encode(recordaccount.data),
                                    is_merge_coa: me.getFormdata().down("[name=is_merge_coa]").getValue(),
                                    mode_create: 'create'
                                },
                                success: function (response) {
                                    console.log(response);
                                },
                                failure: function (response) {
    
                                }
                            });
                        }
                    });
                    var perc = (i / coutaj) * 100;
                    p.setLoading("Processing journal... ("+perc.toFixed(2)+"%)");
                    task.delay(200);
                    i++;
                } else {
                    p.setLoading("Prepare for Checking Balance...");
                    var taskNext = new Ext.util.DelayedTask(function(){
                        me.checkingBalanceProcess(uploadunique);
                    })
                    taskNext.delay(500);
                    
                }
            })
            task.delay(200);
        }else{
            me.tools.alert.warning(returnmsg);  
            p.setLoading(false);
        }
    },
    checkingBalanceProcess: function(uploadunique) 
    {
        var me = this;
        var p = me.getFormdata();
        var nextProcess = false;
        var isProcessDone = 0;
        var balancemsg = "<ul>";
        var notbalance = false;
        
        var i = 0;
        var task = new Ext.util.DelayedTask(function() {
            if (i <= uploadunique.length) {
                Ext.Ajax.request({
                    url: 'cashier/juploadsh1/read',
                    method: 'POST',	
                    async: false ,
                    timeout: 1000000,
                    params: {
                        uploadunique: uploadunique[0],
                        mode_read: 'checkbalance'
                    },
                    success: function (response) {
                        var data = Ext.JSON.decode(response.responseText);
                        if(data.data['not_balance']==1){
                            notbalance = true;
                            balancemsg = balancemsg+"Journal No "+data.data['voucher_no']+' tidak balance. Silahkan cek file dan upload kembali';
                        }
                    },
                    failure: function (response) {
    
                    }
                });

                var perc = (i / uploadunique.length) * 100;
                p.setLoading("Checking Balance... ("+perc.toFixed(2)+"%)");
                task.delay(200);
                i++;
            } else {
                p.setLoading(false);
                balancemsg = balancemsg+"</ul>";
                if(notbalance==true){
                    me.tools.alert.info(balancemsg);
                }else{
                    me.tools.alert.info("Successfully uploaded data.");

                    var task2 = new Ext.util.DelayedTask(function(){
                        me.checkJournalNotBalance(1);
                    });
                    task2.delay(300);

                    me.getDatauploadgrid().getStore().removeAll();
                    me.getDatauploadgrid().getStore().sync();
                }
            }
            me.getDatauploadgrid().down('[name=debetField]').setValue('');
            me.getDatauploadgrid().down('[name=creditField]').setValue('');
        });
        task.delay(200);
    },
    validatefiletype: function(me) {
        
        var indexofPeriod = me.getValue().lastIndexOf("."),
        uploadedExtension = me.getValue().substr(indexofPeriod + 1, me.getValue().length - indexofPeriod);

        var fullPath = me.getValue();
        var lastIndex = fullPath.lastIndexOf('\\');
        var fileName = fullPath.substring(lastIndex + 1);

        var allowedExtns = ['csv', 'txt'];
        if (!Ext.Array.contains(allowedExtns, uploadedExtension.toLowerCase())) {
            me.setActiveError('Please Use csv or txt File Format!');
            Ext.MessageBox.show({
                title: 'File Type Error',
                msg: 'Please Use csv or txt File Format!',
                buttons: Ext.Msg.OK,
                icon: Ext.Msg.ERROR
            });
            me.setRawValue(null);
            return;
        }
        me.setRawValue(fileName);
    },
    checkJournalNotBalance: function(v) {
        var me = this;
        var text = '';
        if ( v == 1 ) {
            text = 'Sukses Upload data, beberapa data ada yang tidak balance : ';
        }

        var res =  Ext.Ajax.request({
            url: 'cashier/juploadsh1/read',
            method: 'POST',
            timeout: 1000000,
            async: false,
            params: {
                mode_read: 'checkjournalnotbalance'
            }
        }).responseText;

        var data = Ext.JSON.decode(res);
        if (data[0].TOTAL == 0 ) {
            Ext.Msg.show(
            {
                title: 'Success',
                icon: Ext.MessageBox.INFO,
                buttons: Ext.Msg.OK,
                msg: 'All journal are balanced'
            });
        }else{
            Ext.Msg.show(
            {
                title: 'Journal Not Balance',
                icon: Ext.MessageBox.INFO,
                buttons: Ext.Msg.OK,
                msg: text + '\n' +data[0].RESULT
            });
        }
    },

    // SEFTIAN ALFREDO 17/03/2022
    dataSubmitV2: function () {
        var me = this;
        var storeaj = me.getDatauploadgrid().getStore();
        var p = me.getFormdata();
        var coutaj = storeaj.getCount();
        var returnmsg = '<ul>';
        var returncnfrmmsg = '<ul>';
        var confirm = false;
        var errorcnfrmmsg = [];
        var result = true;
        var errormsg = [];
        var uploadunique = [];
        Ext.MessageBox.confirm('Confirm', 'Are you sure you want to do this ?', callbackFunction);
        function callbackFunction(btn) {
            if (btn == 'yes') {
                p.setLoading("Validating data...");
                if ( coutaj > 0 ) {

                    // var i = 0;
                    var err = 0;
                    var senddata = [];
                    var returndata;
                    storeaj.each(function(recordaccount, accountindex) {
                        senddata.push(recordaccount.data);
                    });

                    Ext.Ajax.request({
                        url: 'cashier/juploadsh1/read',
                        method: 'POST',
                        async: false,
                        timeout: 100000000,
                        params: {
                            data: Ext.encode(senddata),
                            mode_read: 'checkjournalbeforeupload',
                            mode_query: 0,
                            journal_ids: 0
                        },
                        success: function (response_b) {
                            var data_b = Ext.JSON.decode(response_b.responseText);

                            if ( data_b.data[0].RESULT > 0 ) {

                                var journal_id_delete = '';
                                for (var i = 0; i < data_b.journal_id.length; i++) {
                                    journal_id_delete += data_b.journal_id[i].journal_id;
                                    if ( i != (data_b.journal_id.length-1) ) {
                                        journal_id_delete += '~';
                                    }
                                }

                                console.log(journal_id_delete);

                                Ext.MessageBox.confirm('Confirm', 'Apakah anda ingin mereplace data jurnal dengan JournalID '+data_b.data[0].MESSAGE+ ' ?', cb2);
                                function cb2(btn2) {
                                    if (btn2 == 'yes') {

                                        Ext.Ajax.request({
                                            url: 'cashier/juploadsh1/read',
                                            method: 'POST',
                                            async: false,
                                            timeout: 100000000,
                                            params: {
                                                data: Ext.encode(senddata),
                                                mode_read: 'checkjournalbeforeupload',
                                                mode_query: 1,
                                                journal_ids: journal_id_delete
                                            },
                                            success: function (response_b2) {
                                                var data_b2 = Ext.JSON.decode(response_b2.responseText);
                                                console.log(data_b2);

                                                var taskRequest = new Ext.util.DelayedTask( function () {
                                                Ext.Ajax.request({
                                                    url : 'cashier/juploadsh1/read',
                                                    method : 'POST',
                                                    async : false,
                                                    timeout : 100000000,
                                                    params: {
                                                        data: Ext.encode(senddata),
                                                        mode_read: 'validationV2'
                                                    },
                                                    success: function (response) {
                                                        var data = Ext.JSON.decode(response.responseText);
                                                        returndata = data;
                                                        p.setLoading(false);                              
                                                    },
                                                    failure: function () {
                                                        err = err + 1;
                                                        Ext.Msg.alert("Error", "An error occurred, the data type you entered was wrong");
                                                        p.setLoading(false);
                                                        return false;
                                                    }
                                                });
                                                
                                                var res = returndata.data;
                                                console.log(res);

                                                for (var i = 0; i < res.length; i++ ) {

                                                    var datarow = res[i].data;
                                                    var coa_detail = datarow.post_data.coa_detail.replace(".","");
                                                    if(datarow.post_data.voucher_date=='' ||datarow.post_data.voucher_date==null ||datarow.post_data.voucher_date==undefined){
                                                        result = false;
                                                        if(errormsg[coa_detail.replace(".","")+""+datarow.post_data.project_id+""+datarow.post_data.pt_id]===undefined){
                                                            errormsg.push(datarow.post_data.coa_detail+""+datarow.post_data.project_id+""+datarow.post_data.pt_id);
                                                            returnmsg = returnmsg + '<li> Pastikan tanggal tidak kosong dan format tanggal YYYY-MM-DD. </li>';
                                                        }
                                                    }
                                                    if(datarow.IS_CLOSING==true){
                                                        result = false;
                                                        if(errormsg[coa_detail.replace(".","")+""+datarow.post_data.project_id+""+datarow.post_data.pt_id]===undefined){
                                                            errormsg.push(datarow.post_data.coa_detail+""+datarow.post_data.project_id+""+datarow.post_data.pt_id);
                                                            returnmsg = returnmsg + '<li> Journal Date is not allowed to upload because closing date. </li>';
                                                        }
                                                    }
                                                    if(datarow.IS_EXIST==false){
                                                        result = false;
                                                        if(errormsg[coa_detail.replace(".","")+""+datarow.post_data.project_id+""+datarow.post_data.pt_id]===undefined){
                                                            errormsg.push(datarow.post_data.coa_detail+""+datarow.post_data.project_id+""+datarow.post_data.pt_id);
                                                            returnmsg = returnmsg + '<li> COA '+datarow.post_data.coa_detail+' is doesn`t exist in Master Coa for PROJECT_ID '+datarow.post_data.project_id+' and PT_ID '+datarow.post_data.pt_id+'. </li>';
                                                        }
                                                    }
                                                    if(datarow.kelsub_id!=0 && datarow.post_data.sub_unit==''){
                                                        result = false;
                                                        if(errormsg[coa_detail.replace(".","")+"00"+datarow.post_data.project_id+""+datarow.post_data.pt_id]===undefined){
                                                            errormsg.push(coa_detail.replace(".","")+"kelsub"+datarow.post_data.project_id+""+datarow.post_data.pt_id);
                                                            returnmsg = returnmsg + '<li> COA '+datarow.post_data.coa_detail+' need a Sub Account. Please insert a sub in column SUB on your file upload. </li>';
                                                        }
                                                    }
                                                    if(datarow.kelsub_id!=0 && datarow.post_data.sub_unit!='' && datarow.IS_EXIST_SUB==false){
                                                        result = false;
                                                        if(errormsg[coa_detail.replace(".","")+"00"+datarow.post_data.project_id+""+datarow.post_data.pt_id]===undefined){
                                                            errormsg.push(coa_detail.replace(".","")+"sub"+datarow.post_data.project_id+""+datarow.post_data.pt_id);
                                                            returnmsg = returnmsg + '<li> SUB '+datarow.post_data.sub_unit+' is doesn`t exist. Please insert a new sub in Master Sub Account. </li>';
                                                        }
                                                    }
                                                    if(datarow.IS_EXIST_PROJECTPT==false){
                                                        result = false;
                                                        if(errormsg[datarow.post_data.project_id+""+datarow.post_data.pt_id]===undefined){
                                                            errormsg.push(datarow.post_data.project_id+""+datarow.post_data.pt_id);
                                                            returnmsg = returnmsg + '<li> PROJECT_ID '+datarow.post_data.project_id+' and PT_ID '+datarow.post_data.pt_id+' is doesn`t exist in Master Project PT. Please contact administrator.</li> ';
                                                        }
                                                    }
                                                    if(datarow.IS_EXIST_UPLOADID!=""){
                                                        confirm = true;
                                                        if(errorcnfrmmsg[datarow.post_data.project_id+""+datarow.post_data.pt_id+""+datarow.post_data.uploaduniquenumber]===undefined){
                                                            errorcnfrmmsg.push(datarow.post_data.project_id+""+datarow.post_data.pt_id+""+datarow.post_data.uploaduniquenumber);
                                                            returncnfrmmsg = returncnfrmmsg + '<li> JOURNAL ID '+datarow.post_data.uploaduniquenumber+' pada PROJECT_ID '+datarow.post_data.project_id+' dan PT_ID '+datarow.post_data.pt_id+' di file anda sudah pernah digunakan.</li> ';
                                                        }
                                                    }
                                                    if(datarow.IS_EXIST_PREFIX==false){
                                                        result = false;
                                                        if(errormsg[datarow.post_data.project_id+""+datarow.post_data.pt_id]===undefined){
                                                            errormsg.push(datarow.post_data.project_id+""+datarow.post_data.pt_id);
                                                            returnmsg = returnmsg + '<li>PREFIX '+datarow.post_data.prefix+' is doesn`t exist in PROJECT_ID '+datarow.post_data.project_id+' and PT_ID '+datarow.post_data.pt_id+'. Please insert prefix '+datarow.post_data.prefix+' in Master Prefix.</li> ';
                                                        } 
                                                    }else{
                                                        if(datarow.IS_CASHIER_PREFIX==1 || datarow.IS_CASHIER_PREFIX==true){
                                                            result = false;
                                                            if(errormsg[datarow.post_data.project_id+""+datarow.post_data.pt_id]===undefined){
                                                                errormsg.push(datarow.post_data.project_id+""+datarow.post_data.pt_id);
                                                                returnmsg = returnmsg + '<li>PREFIX '+datarow.post_data.prefix+' is not allowed to upload journal.</li> ';
                                                            } 
                                                        }
                                                    }
                                                    if (datarow.IS_EXIST_JOURNAL_NO == 1 || datarow.IS_EXIST_JOURNAL_NO == true) {
                                                        result = false;
                                                        if(errormsg[datarow.post_data.project_id+""+datarow.post_data.pt_id]===undefined){
                                                            errormsg.push(datarow.post_data.project_id+""+datarow.post_data.pt_id);
                                                            returnmsg = returnmsg + '<li> JOURNAL NO. '+datarow.post_data.voucher_no+' is already exists.</li> ';
                                                        }
                                                    }
                                                    if(datarow.post_data.cashflow!=''){
                                                        if(datarow.IS_EXIST_CASHFLOW==false){
                                                            result = false;
                                                            if(errormsg[datarow.post_data.project_id+""+datarow.post_data.pt_id]===undefined){
                                                                errormsg.push(datarow.post_data.project_id+""+datarow.post_data.pt_id);
                                                                returnmsg = returnmsg + '<li>Cashflow '+datarow.post_data.cashflow+' is doesn`t exist in PROJECT_ID '+datarow.post_data.project_id+' and PT_ID '+datarow.post_data.pt_id+'. Please insert cashflow '+datarow.post_data.cashflow+' in Master Cashflow and Setupcashflow.</li> ';
                                                            } 
                                                        }else{
                                                            if(datarow.IS_EXIST_CASHFLOW_COA==false){
                                                                result = false;
                                                                if(errormsg[datarow.post_data.project_id+""+datarow.post_data.pt_id]===undefined){
                                                                    errormsg.push(datarow.post_data.project_id+""+datarow.post_data.pt_id);
                                                                    returnmsg = returnmsg + '<li>COA '+datarow.post_data.coa_detail+' is doesn`t exist in Cashflow '+datarow.post_data.cashflow+' PROJECT_ID '+datarow.post_data.project_id+' and PT_ID '+datarow.post_data.pt_id+'. Please insert coa '+datarow.post_data.coa_detail+' in Master Setupcashflow.</li> ';
                                                                } 
                                                            }
                                                        }
                                                    }
                                                    if (datarow.post_data.prefix!='' && datarow.IS_ACTIVE_PREFIX == 0){
                                                        result = false;
                                                        if(errormsg[datarow.post_data.project_id+""+datarow.post_data.pt_id]===undefined){
                                                            errormsg.push(datarow.post_data.project_id+""+datarow.post_data.pt_id);
                                                            returnmsg = returnmsg + '<li> Journal Prefix '+datarow.post_data.prefix+' is inactive.</li> ';
                                                        }
                                                    }

                                                    if(jQuery.inArray(datarow.post_data.project_id+""+datarow.post_data.pt_id+""+datarow.post_data.uploaduniquenumber, uploadunique)==-1){
                                                        uploadunique.push(datarow.post_data.project_id+""+datarow.post_data.pt_id+""+datarow.post_data.uploaduniquenumber);
                                                    }

                                                    var perc = ((i+1) / res.length) * 100;
                                                    if ( result ) {
                                                        // console.log(perc);
                                                        // p.setLoading("Validating data... ("+perc.toFixed(2)+"%)");
                                                        // $('.x-mask-loading').text("Validating data... ("+perc.toFixed(2)+"%)");
                                                        console.log(new Date());
                                                    }else{
                                                        me.tools.alert.warning(returnmsg);  
                                                        p.setLoading(false);
                                                        return false;
                                                    }
                                                }

                                                // CREATE JOURNAL
                                                p.setLoading("Prepare for processing journal ...");
                                                var taskNext = new Ext.util.DelayedTask(function(){
                                                    me.createJournalProcessV2(returnmsg, returncnfrmmsg, result, uploadunique);
                                                })
                                                taskNext.delay(200);
                                            })
                                            taskRequest.delay(200);
                                            },
                                            failure: function () {
                                                Ext.Msg.alert("Error", "An error occurred, Please contact administrator");
                                                p.setLoading(false);
                                                return false;
                                            }
                                        });

                                    }
                                }

                            }else{
                                var taskRequest = new Ext.util.DelayedTask( function () {
                                    Ext.Ajax.request({
                                        url : 'cashier/juploadsh1/read',
                                        method : 'POST',
                                        async : false,
                                        timeout : 100000000,
                                        params: {
                                            data: Ext.encode(senddata),
                                            mode_read: 'validationV2'
                                        },
                                        success: function (response) {
                                            var data = Ext.JSON.decode(response.responseText);
                                            returndata = data;
                                            p.setLoading(false);                              
                                        },
                                        failure: function () {
                                            err = err + 1;
                                            Ext.Msg.alert("Error", "An error occurred, the data type you entered was wrong");
                                            p.setLoading(false);
                                            return false;
                                        }
                                    });
                                    
                                    var res = returndata.data;
                                    console.log(res);

                                    for (var i = 0; i < res.length; i++ ) {

                                        var datarow = res[i].data;
                                        var coa_detail = datarow.post_data.coa_detail.replace(".","");
                                        if(datarow.post_data.voucher_date=='' ||datarow.post_data.voucher_date==null ||datarow.post_data.voucher_date==undefined){
                                            result = false;
                                            if(errormsg[coa_detail.replace(".","")+""+datarow.post_data.project_id+""+datarow.post_data.pt_id]===undefined){
                                                errormsg.push(datarow.post_data.coa_detail+""+datarow.post_data.project_id+""+datarow.post_data.pt_id);
                                                returnmsg = returnmsg + '<li> Pastikan tanggal tidak kosong dan format tanggal YYYY-MM-DD. </li>';
                                            }
                                        }
                                        if(datarow.IS_CLOSING==true){
                                            result = false;
                                            if(errormsg[coa_detail.replace(".","")+""+datarow.post_data.project_id+""+datarow.post_data.pt_id]===undefined){
                                                errormsg.push(datarow.post_data.coa_detail+""+datarow.post_data.project_id+""+datarow.post_data.pt_id);
                                                returnmsg = returnmsg + '<li> Journal Date is not allowed to upload because closing date. </li>';
                                            }
                                        }
                                        if(datarow.IS_EXIST==false){
                                            result = false;
                                            if(errormsg[coa_detail.replace(".","")+""+datarow.post_data.project_id+""+datarow.post_data.pt_id]===undefined){
                                                errormsg.push(datarow.post_data.coa_detail+""+datarow.post_data.project_id+""+datarow.post_data.pt_id);
                                                returnmsg = returnmsg + '<li> COA '+datarow.post_data.coa_detail+' is doesn`t exist in Master Coa for PROJECT_ID '+datarow.post_data.project_id+' and PT_ID '+datarow.post_data.pt_id+'. </li>';
                                            }
                                        }
                                        if(datarow.kelsub_id!=0 && datarow.post_data.sub_unit==''){
                                            result = false;
                                            if(errormsg[coa_detail.replace(".","")+"00"+datarow.post_data.project_id+""+datarow.post_data.pt_id]===undefined){
                                                errormsg.push(coa_detail.replace(".","")+"kelsub"+datarow.post_data.project_id+""+datarow.post_data.pt_id);
                                                returnmsg = returnmsg + '<li> COA '+datarow.post_data.coa_detail+' need a Sub Account. Please insert a sub in column SUB on your file upload. </li>';
                                            }
                                        }
                                        if(datarow.kelsub_id!=0 && datarow.post_data.sub_unit!='' && datarow.IS_EXIST_SUB==false){
                                            result = false;
                                            if(errormsg[coa_detail.replace(".","")+"00"+datarow.post_data.project_id+""+datarow.post_data.pt_id]===undefined){
                                                errormsg.push(coa_detail.replace(".","")+"sub"+datarow.post_data.project_id+""+datarow.post_data.pt_id);
                                                returnmsg = returnmsg + '<li> SUB '+datarow.post_data.sub_unit+' is doesn`t exist. Please insert a new sub in Master Sub Account. </li>';
                                            }
                                        }
                                        if(datarow.IS_EXIST_PROJECTPT==false){
                                            result = false;
                                            if(errormsg[datarow.post_data.project_id+""+datarow.post_data.pt_id]===undefined){
                                                errormsg.push(datarow.post_data.project_id+""+datarow.post_data.pt_id);
                                                returnmsg = returnmsg + '<li> PROJECT_ID '+datarow.post_data.project_id+' and PT_ID '+datarow.post_data.pt_id+' is doesn`t exist in Master Project PT. Please contact administrator.</li> ';
                                            }
                                        }
                                        if(datarow.IS_EXIST_UPLOADID!=""){
                                            confirm = true;
                                            if(errorcnfrmmsg[datarow.post_data.project_id+""+datarow.post_data.pt_id+""+datarow.post_data.uploaduniquenumber]===undefined){
                                                errorcnfrmmsg.push(datarow.post_data.project_id+""+datarow.post_data.pt_id+""+datarow.post_data.uploaduniquenumber);
                                                returncnfrmmsg = returncnfrmmsg + '<li> JOURNAL ID '+datarow.post_data.uploaduniquenumber+' pada PROJECT_ID '+datarow.post_data.project_id+' dan PT_ID '+datarow.post_data.pt_id+' di file anda sudah pernah digunakan.</li> ';
                                            }
                                        }
                                        if(datarow.IS_EXIST_PREFIX==false){
                                            result = false;
                                            if(errormsg[datarow.post_data.project_id+""+datarow.post_data.pt_id]===undefined){
                                                errormsg.push(datarow.post_data.project_id+""+datarow.post_data.pt_id);
                                                returnmsg = returnmsg + '<li>PREFIX '+datarow.post_data.prefix+' is doesn`t exist in PROJECT_ID '+datarow.post_data.project_id+' and PT_ID '+datarow.post_data.pt_id+'. Please insert prefix '+datarow.post_data.prefix+' in Master Prefix.</li> ';
                                            } 
                                        }else{
                                            if(datarow.IS_CASHIER_PREFIX==1 || datarow.IS_CASHIER_PREFIX==true){
                                                result = false;
                                                if(errormsg[datarow.post_data.project_id+""+datarow.post_data.pt_id]===undefined){
                                                    errormsg.push(datarow.post_data.project_id+""+datarow.post_data.pt_id);
                                                    returnmsg = returnmsg + '<li>PREFIX '+datarow.post_data.prefix+' is not allowed to upload journal.</li> ';
                                                } 
                                            }
                                        }
                                        if (datarow.IS_EXIST_JOURNAL_NO == 1 || datarow.IS_EXIST_JOURNAL_NO == true) {
                                            result = false;
                                            if(errormsg[datarow.post_data.project_id+""+datarow.post_data.pt_id]===undefined){
                                                errormsg.push(datarow.post_data.project_id+""+datarow.post_data.pt_id);
                                                returnmsg = returnmsg + '<li> JOURNAL NO. '+datarow.post_data.voucher_no+' is already exists.</li> ';
                                            }
                                        }
                                        if(datarow.post_data.cashflow!=''){
                                            if(datarow.IS_EXIST_CASHFLOW==false){
                                                result = false;
                                                if(errormsg[datarow.post_data.project_id+""+datarow.post_data.pt_id]===undefined){
                                                    errormsg.push(datarow.post_data.project_id+""+datarow.post_data.pt_id);
                                                    returnmsg = returnmsg + '<li>Cashflow '+datarow.post_data.cashflow+' is doesn`t exist in PROJECT_ID '+datarow.post_data.project_id+' and PT_ID '+datarow.post_data.pt_id+'. Please insert cashflow '+datarow.post_data.cashflow+' in Master Cashflow and Setupcashflow.</li> ';
                                                } 
                                            }else{
                                                if(datarow.IS_EXIST_CASHFLOW_COA==false){
                                                    result = false;
                                                    if(errormsg[datarow.post_data.project_id+""+datarow.post_data.pt_id]===undefined){
                                                        errormsg.push(datarow.post_data.project_id+""+datarow.post_data.pt_id);
                                                        returnmsg = returnmsg + '<li>COA '+datarow.post_data.coa_detail+' is doesn`t exist in Cashflow '+datarow.post_data.cashflow+' PROJECT_ID '+datarow.post_data.project_id+' and PT_ID '+datarow.post_data.pt_id+'. Please insert coa '+datarow.post_data.coa_detail+' in Master Setupcashflow.</li> ';
                                                    } 
                                                }
                                            }
                                        }
                                        if (datarow.post_data.prefix!='' && datarow.IS_ACTIVE_PREFIX == 0){
                                            result = false;
                                            if(errormsg[datarow.post_data.project_id+""+datarow.post_data.pt_id]===undefined){
                                                errormsg.push(datarow.post_data.project_id+""+datarow.post_data.pt_id);
                                                returnmsg = returnmsg + '<li> Journal Prefix '+datarow.post_data.prefix+' is inactive.</li> ';
                                            }
                                        }

                                        if(jQuery.inArray(datarow.post_data.project_id+""+datarow.post_data.pt_id+""+datarow.post_data.uploaduniquenumber, uploadunique)==-1){
                                            uploadunique.push(datarow.post_data.project_id+""+datarow.post_data.pt_id+""+datarow.post_data.uploaduniquenumber);
                                        }

                                        var perc = ((i+1) / res.length) * 100;
                                        if ( result ) {
                                            // console.log(perc);
                                            // p.setLoading("Validating data... ("+perc.toFixed(2)+"%)");
                                            // $('.x-mask-loading').text("Validating data... ("+perc.toFixed(2)+"%)");
                                            console.log(new Date());
                                        }else{
                                            me.tools.alert.warning(returnmsg);  
                                            p.setLoading(false);
                                            return false;
                                        }
                                    }

                                    // CREATE JOURNAL
                                    p.setLoading("Prepare for processing journal ...");
                                    var taskNext = new Ext.util.DelayedTask(function(){
                                        me.createJournalProcessV2(returnmsg, returncnfrmmsg, result, uploadunique);
                                    })
                                    taskNext.delay(200);
                                })
                                taskRequest.delay(200);
                            }
                            p.setLoading(false);                              
                        },
                        failure: function () {
                            Ext.Msg.alert("Error", "An error occurred, Please contact administrator");
                            p.setLoading(false);
                            return false;
                        }
                    });                    
                }else{
                    me.tools.alert.warning("Data grid kosong silahkan Upload file terlebih dahulu.");
                    p.setLoading(false);
                    return false;
                }
            }
        }
    },
    createJournalProcessV2: function (returnmsg, returncnfrmmsg, result, uploadunique) {
        
        var me = this;
        var storeaj = me.getDatauploadgrid().getStore();
        var p = me.getFormdata();
        var coutaj = storeaj.getCount();
        var returnmsg = returnmsg + '</ul>';
        var returncnfrmmsg = returncnfrmmsg + '</ul>';
        var nextProcess = false;
        var confirm = false;
        var errormsg = [];

        returnmsg = returnmsg + '</ul>';
        returncnfrmmsg = returncnfrmmsg + '</ul>';

        if(result==true){      
            
            var i = 0;
            var senddata = [];
            var part_senddata = [];
            var returndata;
            storeaj.each(function(recordaccount, accountindex) {
                senddata.push(recordaccount.data);
            });

            if ( senddata.length > 100 ) {
                for (var j = 0; j < senddata.length; j+=100) {
                    part_senddata.push(senddata.slice(j, j+100));
                }
            }else{
                part_senddata.push(senddata);
            }

            console.log(part_senddata);

            p.setLoading('Processing journal...');
            var taskRequest = new Ext.util.DelayedTask( function () {

                if ( i < part_senddata.length ) {
                    
                    Ext.Ajax.request({
                        url: 'cashier/juploadsh1/create',
                        method: 'POST', 
                        async: false,
                        timeout: 1000000,
                        params: {
                            data: Ext.encode(part_senddata[i]),
                            is_merge_coa: me.getFormdata().down("[name=is_merge_coa]").getValue(),
                            mode_create: 'createV2'
                        },
                        success: function (response) {
                            console.log(response);
                        },
                        failure: function (response) {
                            Ext.Msg.alert("Error", "An error occurred, the data type you entered was wrong");
                            p.setLoading(false);
                            return false;
                        }
                    });

                    var perc = ((i+1) / part_senddata.length) * 100;
                    p.setLoading("Processing journal... ("+perc.toFixed(2)+"%)");
                    taskRequest.delay(200);
                    i++;

                }else{
                    p.setLoading("Prepare for Checking Balance...");
                    var taskNext = new Ext.util.DelayedTask(function(){
                        me.checkingBalanceProcess(uploadunique);
                    })
                    taskNext.delay(500);
                }

            })
            taskRequest.delay(200);
        }else{
            me.tools.alert.warning(returnmsg);  
            p.setLoading(false);
        }

    },
    downloadSample: function () {
        var me = this;
        console.log(apps);
        Ext.Ajax.request({
            url: 'cashier/juploadsh1/read',
            method: 'POST',
            async: false,
            timeout: 1000000,
            params:{
                project_id: apps.project,
                pt_id: apps.pt,
                mode_read: 'downloadsample'
            },
            success: function (response) {
                var data = Ext.JSON.decode(response.responseText);
                var file_path = data.data
                var a = document.createElement('A');
                a.href = file_path;
                a.download = file_path.substr(file_path.lastIndexOf('/') + 1);
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            }
        });
    }

});