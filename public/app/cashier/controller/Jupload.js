Ext.define('Cashier.controller.Jupload', {
    extend: 'Cashier.library.template.controller.Controller2',
    alias: 'controller.Jupload',
    requires: [
        'Cashier.library.tools.Mytools',
        'Cashier.library.box.Config',
        'Cashier.library.box.tools.EventSelector',
        'Cashier.library.box.tools.Tools'
    ],
    views: [
        'jupload.Panel',
        'jupload.FormData',
        'jupload.DataUploadGrid',
        'jupload.FormDataUpload',
    ],
    stores: [
        'Jupload',
        'Ptbyusermulti'
    ],
    models: [
        'Jupload',
        'Projectpt'
    ],
    refs: [
        {
            ref: 'panel',
            selector: 'juploadpanel'
        },
        {ref: 'formdata', selector: 'juploadformdata'},
        {ref: 'formdataupload', selector: 'juploadformdataupload'},
        {ref: 'datauploadgrid', selector: 'juploaddatauploadgrid'},
        {ref: 'winaj', selector: 'win-uploadformdata'},
    ],
    //setting properties variabel
    controllerName: 'jupload',
    fieldName: '',
    bindPrefixName: 'Jupload',
    urlsubmit: 'cashier/jupload/create',
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
            'juploadpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: function (panel) {
                    me.getDatauploadgrid().getStore().removeAll();
                    me.getDatauploadgrid().getStore().sync();
                    panel.up('window').maximize();
//                    me.getFormdata().down("[name=projectpt_id]").getStore().load();
                }
            },
            'juploadformdata': {
                afterrender: function (panel) {
                    me.getFormdata().down("[name=is_merge_coa]").setValue('no');
                }
            },
            'juploadformdata button[action=submit]': {
                click: this.dataSubmit
            },
            'juploadformdata button[action=reset]': {
                click: function (v) {
                    var me = this;
                    me.getDatauploadgrid().getStore().removeAll();
                    me.getDatauploadgrid().getStore().sync();
                    
                }
            },
            'juploaddatauploadgrid toolbar button[action=upload]': {
                click: function (v) {
                    var me = this;
                    me.FormDataUploadShow();
                    
                }
            },
            'juploadformdataupload button[action=upload]': {
                click: function () {
                    this.UploadJournal();
                }
            },
//            'juploadformdata [name=projectpt_id]': {
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
        var store = me.getDatauploadgrid().getStore();
//        form.down("[name=project_id]").setValue(x.data['project_id']);
//        form.down("[name=pt_id]").setValue(x.data['pt_id']);
        form.down("[name=mode_read]").setValue('upload');
        if(true){
            form.submit({
                url: 'cashier/jupload/read',
                waitMsg: 'Processing data...',
                success: function(fp, o) {
                    var dt = o.result.data;

                    store.add(dt[0]);
                    form.up('window').close();
                },
                failure: function(fp, o) {
                    Ext.Msg.alert('Warning', 'Processing failed !');
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
        var nextProcess = false; 
        Ext.MessageBox.confirm(
            'Confirm', 'Are you sure you want to do this ?', callbackFunction);
         function callbackFunction(btn) {
            if(btn == 'yes') {
                p.setLoading("Prepare to validate journal... ");
                if (coutaj > 0) {
                    var i = 0;
                    var task = new Ext.util.DelayedTask(function() {
                        
                        if (i <= coutaj) {
                            var err = 0;
                            storeaj.each(function (recordaccount, accountindex) {

                                if (i == accountindex) {
    
                                    Ext.Ajax.request({
                                        url: 'cashier/jupload/read',
                                        method: 'POST',
                                        timeout: 100000000,
                                        async: false,
                                        params: {
                                            data: Ext.encode(recordaccount.data),
                                            mode_read: 'validation'
                                        },
                                        success: function (response) {
    
                                            var data = Ext.JSON.decode(response.responseText);
                                            var coa_detail = recordaccount.data['coa_detail'].replace(".","");
                                            if(data.data['IS_EXIST']==false){
                                                result = false;
                                                if(errormsg[coa_detail.replace(".","")+""+recordaccount.data['project_id']+""+recordaccount.data['pt_id']]===undefined){
                                                    errormsg.push(recordaccount.data['coa_detail']+""+recordaccount.data['project_id']+""+recordaccount.data['pt_id']);
                                                    returnmsg = returnmsg + '<li> COA '+recordaccount.data['coa_detail']+' is not exist in Master Coa for PROJECT_ID '+recordaccount.data['project_id']+' and PT_ID '+recordaccount.data['pt_id']+'. </li>';
                                                }
                                            }
                                            if(data.data['kelsub_id']!=0 && recordaccount.data['sub_unit']==''){
                                                result = false;
                                                if(errormsg[coa_detail.replace(".","")+"00"+recordaccount.data['project_id']+""+recordaccount.data['pt_id']]===undefined){
                                                    errormsg.push(coa_detail.replace(".","")+"kelsub"+recordaccount.data['project_id']+""+recordaccount.data['pt_id']);
                                                    returnmsg = returnmsg + '<li> COA '+recordaccount.data['coa_detail']+' need a Sub Account. Please insert a sub in column SUB on your file upload. </li>';
                                                }
                                            }
                                            if(data.data['IS_EXIST_PROJECTPT']==false){
                                                result = false;
                                                if(errormsg[recordaccount.data['project_id']+""+recordaccount.data['pt_id']]===undefined){
                                                    errormsg.push(recordaccount.data['project_id']+""+recordaccount.data['pt_id']);
                                                    returnmsg = returnmsg + '<li> PROJECT_ID '+recordaccount.data['project_id']+' and PT_ID '+recordaccount.data['pt_id']+' is not exist in Master Project PT. Please contact administrator.</li> ';
                                                }
                                            }
                                            if(data.data['IS_EXIST_UPLOADID']!=""){
                                                confirm = true;
                                                if(errorcnfrmmsg[recordaccount.data['project_id']+""+recordaccount.data['pt_id']+""+recordaccount.data['uploaduniquenumber']]===undefined){
                                                    errorcnfrmmsg.push(recordaccount.data['project_id']+""+recordaccount.data['pt_id']+""+recordaccount.data['uploaduniquenumber']);
                                                    returncnfrmmsg = returncnfrmmsg + '<li> JOURNAL ID '+recordaccount.data['uploaduniquenumber']+' pada PROJECT_ID '+recordaccount.data['project_id']+' dan PT_ID '+recordaccount.data['pt_id']+' di file anda sudah pernah digunakan.</li> ';
                                                }
                                            }
    
                                            // insert into uploadunique
                                            if(jQuery.inArray(recordaccount.data['project_id']+""+recordaccount.data['pt_id']+""+recordaccount.data['uploaduniquenumber'], uploadunique)==-1){
                                                uploadunique.push(recordaccount.data['project_id']+""+recordaccount.data['pt_id']+""+recordaccount.data['uploaduniquenumber']);
                                            }
                                        },
                                        failure: function (response) {
                                            err++;
                                        }
                                    })
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
                            p.setLoading("Prepare to Processing Journal ...");
                            var tasknext = new Ext.util.DelayedTask(function() {
                                me.createJournalProcess(returnmsg, returncnfrmmsg, result, uploadunique);
                            })
                            tasknext.delay(200);
                        }
                    });
                    task.delay(200);
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

        if(result==true){
            if(confirm==true){                    
                Ext.Msg.confirm('Confirmation', returncnfrmmsg+' <br> Lanjutkan upload? (Lanjutkan jika ingin update data dengan Journal ID yang sama)', function (btn) {
                    if (btn == 'yes') {
                        
                        var i = 0;                        
                        var task = new Ext.util.DelayedTask(function() {
                            if (i <= coutaj) {
                                storeaj.each(function (recordaccount, accountindex) {

                                    if (i == accountindex) {
    //                                    console.log(recordaccount.data);
                                        Ext.Ajax.request({
                                            url: 'cashier/jupload/create',
                                            method: 'POST',	
                                            timeout: 100000000,
                                            async: false ,
                                            params: {
                                                data: Ext.encode(recordaccount.data),
                                                is_merge_coa: me.getFormdata().down("[name=is_merge_coa]").getValue()
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
                                var nextTask = new Ext.util.DelayedTask(function() {
                                    me.checkingBalanceProcess(uploadunique);
                                })
                                nextTask.delay(200);
                            }
                        });
                        task.delay(200);
                    }
                });
            }else{
        
                var i = 0;
                var task = new Ext.util.DelayedTask(function() {
                    if (i <= coutaj) {
                        storeaj.each(function (recordaccount, accountindex) {

                            if (i == accountindex) {
    //                                    console.log(recordaccount.data);
                                Ext.Ajax.request({
                                    url: 'cashier/jupload/create',
                                    method: 'POST',	
                                    timeout: 100000000,
                                    async: false ,
                                    params: {
                                        data: Ext.encode(recordaccount.data),
                                                is_merge_coa: me.getFormdata().down("[name=is_merge_coa]").getValue()
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
                        var nextTask = new Ext.util.DelayedTask(function() {
                            me.checkingBalanceProcess(uploadunique);
                        })
                        nextTask.delay(200);
                    }
                })
                task.delay(200);
            }
        }else{
            me.tools.alert.warning(returnmsg);  
            p.setLoading(false);
        }
    },
    checkingBalanceProcess: function(uploadunique) {

        var me = this;
        var p = me.getFormdata();
        var balancemsg = "<ul>";
        var notbalance = false;
        var nextProcess = false;
        var isProcessDone = 0;
        p.setLoading("Checking Balance... (0%)");
        var i = 0;
        var task = new Ext.util.DelayedTask(function() {
            if (i <= uploadunique.length) {
                Ext.Ajax.request({
                    url: 'cashier/jupload/read',
                    method: 'POST',	
                    timeout: 100000000,
                    async: false ,
                    params: {
                        uploadunique: i,
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
                }
            }
        });
        task.delay(200);
    }
    
});