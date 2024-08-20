Ext.define('Cashier.controller.Vouchertransactionreport', {
    extend: 'Cashier.library.template.controller.Controllergl',
    alias: 'controller.Vouchertransactionreport',
    requires: [
        'Cashier.template.ComboBoxFields',
        'Cashier.library.template.combobox.Coacomboboxgrid',
        'Cashier.library.template.combobox.Coagrid',
        'Cashier.library.template.combobox.Subaccountgroupcomboboxgrid',
        'Cashier.library.template.combobox.SubaccountcodeComboboxgrid',
        'Cashier.library.template.combobox.Ptprojectcombobox',
        'Cashier.library.template.combobox.Projectcombobox',
        'Cashier.library.template.combobox.VendorcomboboxV2'
    ],
    views: [
        'vouchertransactionreport.Panel',
        'vouchertransactionreport.FormData'
    ],
    stores: [
        'Financepositionreport',
        'Vendorcombo',
        'Department',
        'Coacombo',
        'Project',
        'Ptbyuser',
        'Subaccountgroup',
        'Subaccountcode',
        'Ptforcashbon',
        'Pt',
        'Vendorcombo',
        'VendorcomboV2',
    ],
    models: [
        'Financepositionreport',
        'Coa',
        'Project',
        'Pt',
        'Subaccountgroup',
        'Subaccountcode',
        'Ptforcashbon'
    ],
    refs: [
        {
            ref: 'formdata',
            selector: 'vouchertransactionreportformdata'
        },
        {
            ref: 'paneldata',
            selector: 'vouchertransactionreportpanel'
        },
    ],
    controllerName: 'vouchertransactionreport',
    fieldName: '',
    bindPrefixName: 'Vouchertransactionreport',
    urlprocess: 'cashier/vouchertransactionreport/read',
    kelsub_id: null,
    paramcoa: null, fromcoa_id: 0, fromcoa: null, untilcoa_id: 0, untilcoa: null,
    reportby: null, voucherby: null, subby: null, detailby: null, fromkelsub: null, untilkelsub: null,
    fromdate: null, untildate: null, fromsubcode: null, untilsubcode: null,
    stimulsoft: "resources/stimulsoft/index.php?stimulsoft_client_key=ViewerFx&stimulsoft_report_key=",
    paramsStr: null, win: null, params: null, dateNow: new Date(), html: null, winId: 'myReportWindow', checksub: null, report: null,
    statusprocess: null, project_name: null, pt_name: null, userid: null, userprint: null, urlrequest: null, senddata: null, info: null, form: null,
    storekelsub: null, kelsubid_from: null, kelsubid_to: null,
    cluster: null,
    getMe: function(){
       var me = this;
       return _Apps.getController(me.bindPrefixName);
    },
    init: function (application) {
        var me = this;
        this.control({
            'vouchertransactionreportpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: function (panel) {
                    Ext.get('WINDOW-mnu' + me.bindPrefixName).setHeight(380);
                    Ext.get('WINDOW-mnu' + me.bindPrefixName).setWidth(720);
                    me.panelAfterRender();
                }
            },
            'vouchertransactionreportformdata': {
                afterrender: function (panel) {
                    this.formDataAfterRenderCustome();
                },
                 boxready: function() {
                    var me = this.getMe();

                    $("#vouchertransactionreportID input[name='from_coa_id']").keyup(function()
                    {
                        this.value = this.value.replace(/(\d{2})(\d{2})/,'$1'+'.'+'$2')
                    });

                    $("#vouchertransactionreportID input[name='until_coa_id']").keyup(function()
                    {
                        this.value = this.value.replace(/(\d{2})(\d{2})/,'$1'+'.'+'$2')
                    });
                }
            },
            'vouchertransactionreportformdata button[action=submit]': {
                click: function () {
                    me.Processdata();

                }
            },
            'vouchertransactionreportformdata [name=project_id]': {
                select: function (el) {
                    this.loadPtbyProject();
                }
                
            },
             'vouchertransactionreportformdata [name=pt_id]': {
                 change: function (el) {
                    this.loadCoabypt(el.valueModels[0].data.pt_id);
                }
                
            },
            'vouchertransactionreportformdata [name=fromvendor_id]': {
                select: function (cb, newValue, oldValue, options) {
                    me.fromvendor = newValue[0].raw.vendor_id;
                },
                keyup: function(dis) {
                    
                    var me = this;
                    var storevendor;

                    storevendor = me.getStore('Vendorcombo');
                    storevendor.load({
                        params: {
                            "hideparam": 'getvendor',
                            "start": 0,
                            "limit": 1000000,
                            "project_id": apps.project,
                            "pt_id": apps.pt,
                            "query": dis.rawValue
                        },
                        callback: function (records, operation, success) {
                            storevendor.sort('vendorname', 'ASC');
                            if (success) {

                            }                            
                        }
                    });
                }
            },
            'vouchertransactionreportformdata [name=untilvendor_id]': {
                select: function (cb, newValue, oldValue, options) {
                    me.untilvendor = newValue[0].raw.vendor_id;
                   
                },
                keyup: function(dis) {
                    
                    var me = this;
                    var storevendorV2;

                    storevendorV2 = me.getStore('VendorcomboV2');
                    storevendorV2.load({
                        params: {
                            "hideparam": 'getvendor',
                            "start": 0,
                            "limit": 1000000,
                            "project_id": apps.project,
                            "pt_id": apps.pt,
                            "query": dis.rawValue
                        },
                        callback: function (records, operation, success) {
                            storevendorV2.sort('vendorname', 'ASC');
                            if (success) {
                            }                            
                        }
                    })
                }
            },
             'vouchertransactionformdata [name=from_coa_id] ': {
                'keyup': function () {
                    var me, value;
                    me = this.getMe();
                    value = me.getFormdata().down("[name=from_coa_id]").getRawValue();
                    this.autocompletecombo(value);
                },
                
            },
            'vouchertransactionformdata [name=until_coa_id] ': {
                'keyup': function () {
                    var me, value;
                    me = this.getMe();
                    value = me.getFormdata().down("[name=until_coa_id]").getRawValue();
                    this.autocompletecombo(value);
                },
            },
            'vouchertransactionreportformdata [name=reporttype] ': {
                change: function (e) {
                    if (e.value == 'REPORT KWITANSI') {
                       me.getFormdata().down("[id=vtrVoucherType]").setVisible(false); 
                       me.getFormdata().down("[id=vtrVoucherStatus]").setVisible(false); 
                       me.getFormdata().down("[id=vtrVendorForm]").setVisible(false); 
                       me.getFormdata().down("[id=vtrCOA]").setVisible(false); 
                       me.getFormdata().down("[id=vtrNoSPK]").setVisible(false);
                       me.getFormdata().down("[name=datetype]").setValue('1'); 
                       me.getFormdata().down("[name=datetype]").setReadOnly(true); 
                    }else{
                       me.getFormdata().down("[id=vtrVoucherType]").setVisible(true); 
                       me.getFormdata().down("[id=vtrVoucherStatus]").setVisible(true); 
                       me.getFormdata().down("[id=vtrVendorForm]").setVisible(true); 
                       me.getFormdata().down("[id=vtrCOA]").setVisible(true); 
                       me.getFormdata().down("[id=vtrNoSPK]").setVisible(true); 
                       me.getFormdata().down("[name=datetype]").setReadOnly(false); 
                    }
                    // var me = this;
                    // me.getFormdata().down("[id=beginningbalanceoptions]").setVisible(true);
                },
            },
            
        });
    },
     autocompletecombo: function (value) {
        var me, storecoa, value;
        me = this.getMe();
        storecoa = me.getStore('Coacombo');
        storecoa.clearFilter();
        storecoa.filter('coa', value);
    },
    Processdata: function () {
        var me, form, groupby, transactiontype, liquid, is_liquid,ptid,projectid,
            fromvendorid,untilvendorid,fromdate,untildate,fromdeptid,untildeptid,reporttype,coastart_id,coaend_id = '';
        me = this;


        form = me.getFormdata();
        formvalue = form.getForm().getValues();

        if (formvalue['datetype'] == null || formvalue['from_date'] == "" || formvalue['until_date'] == "") {
            Ext.Msg.alert("Warning", "Date must be filled.");
            return false;
        }

       
        me.senddata = {
            pt_id: formvalue['pt_id'],
            project_id: formvalue['project_id'],
            datetype: formvalue['datetype'],
            datefrom: formvalue['from_date'],
            untildate: formvalue['until_date'],
            vouchertype: formvalue['vouchertype'],
            voucherstatus: formvalue['voucherstatus'],
            coastart_id : formvalue['from_coa_id'],
            coaend_id : formvalue['until_coa_id'],
            hideparam: 'processreport'
        }

        Ext.getBody().mask("Please wait...");
        me.urlrequest = 'cashier/vouchertransactionreport/create';
        me.AjaxRequest();
    },
    showReport: function () {
        var me;
        me = this;
        var title = 'Result ' + me.getFormdata().up('window').title;
        me.winId = me.controllerName + '_' + Ext.Date.format(new Date(), 'YmdHis');
        me.form = me.getFormdata().getForm();
        var e = me.getFormdata().down("[name=pt_id]");
        var x = e.getStore().findRecord("pt_id", me.getFormdata().down("[name=pt_id]").getValue(),0,false,true,true);

        me.instantWindowWithMinimize('Panel', 800, title, 'state-report', me.winId, me.controllerName);

        me.paramsStr = me.generateReportParams(me.getFormdata().getForm().getFieldValues());
        me.win = desktop.getWindow(me.winId);
       
        if (true) {
            resetTimer();
            me.value = me.form.getValues();
            me.value["project_name"] = x.data['projectname'];
            me.value["pt_name"] = x.data['ptname'];
            me.value["userprint"] = me.userprint;
            me.value["userid"] = me.userid;
            me.value["tgl_sekarang"] = me.dateNow.getDate() + "-" + (me.dateNow.getMonth() + 1) + "-" + me.dateNow.getFullYear();
            me.value["time_sekarang"] = me.dateNow.getHours() + ":" + me.dateNow.getMinutes() + ":" + me.dateNow.getSeconds();
            me.value["project_id"] = x.data['project_id'];
            me.value["pt_id"] = me.getFormdata().down("[name=pt_id]").getValue();
            me.value['datetype'] = me.info.data.paramjs.datetype;
            me.value['date_from'] = me.info.data.paramjs.datefrom;
            me.value['until_date'] = me.info.data.paramjs.untildate;
            me.value['vouchertype'] = me.info.data.paramjs.vouchertype;
            me.value["coastart_id"] = me.getFormdata().down("[name=from_coa_id]").getValue();
            me.value["coaend_id"] = me.getFormdata().down("[name=until_coa_id]").getValue();
            me.value['reporttype'] = me.getFormdata().down("[name=reporttype]").getValue();
            
            if (me.info.data.paramjs.vouchertype == "") {
                me.value['vouchertype_name'] = "ALL";
            } else if (me.info.data.paramjs.vouchertype == "O") {
                me.value['vouchertype_name'] = "OUT";
            } else if (me.info.data.paramjs.vouchertype == "I") {
                me.value['vouchertype_name'] = "IN";
            }

            me.value['voucherstatus'] = me.info.data.paramjs.voucherstatus;
            me.value['voucherstatus_name'] = me.info.data.paramjs.voucherstatus;
            me.value["tanggal"] = me.value["date_from"] + ' s/d ' + me.value["until_date"];

            var dy = new Date(me.value["fromdate"]);
            me.value["tahun"] = dy.getFullYear();

            var params = me.value;
            var reportFile;

            if(me.value['reporttype'] == "FORMAT 1"){
                reportFile = 'Voucher_transaction_report';
            }else if(me.value['reporttype'] == "FORMAT 2"){
                reportFile = 'Voucher_transaction_reportver2';
            }else if(me.value['reporttype'] == "REPORT KWITANSI"){
                reportFile = 'Voucher_transaction_report_kwitansi';
            }else if(me.value['reporttype'] == "VOUCHER TITIPAN"){
                reportFile = 'Voucher_transaction_report_titipan';
            }else {
                reportFile = 'Voucher_transaction_report_titipan_unprocessed';
            }
            
            me.html = me.ReportviewerV4(params, reportFile, me.win.id, 1);
            me.win.down("#MyReportPanel_" + me.win.id).body.setHTML(me.html);
            $("#Reportform_" + me.win.id).submit();       
        }


    },
    AjaxRequest: function () {
        var me;
        me = this;
        Ext.Ajax.request({
            url: me.urlrequest,
            method: 'POST',
            timeout:100000000,  
            params: {
                data: Ext.encode(me.senddata)
            },
            success: function (response) {
                me.info = Ext.JSON.decode(response.responseText);
                me.setSuccessEvent();
            },
            failure: function (response) {
                me.getFormdata().up('window').close();
            }
        });
    },
    setSuccessEvent: function () {
        var me = this;
        if (me.info.parameter == 'processreport') {
            Ext.getBody().unmask();
            me.statusprocess = me.info.success;
            if (me.statusprocess == true) {
                me.cluster = me.info.data.cluster;
                me.showReport();
            }
        }
    },
    panelAfterRender: function () {
        var me = this;
        Ext.Ajax.request({
            url: me.urlprocess,
            success: function (response) {
                var info = Ext.JSON.decode(response.responseText);
                me.project_name = info.project_name;
                me.pt_name = info.pt_name;
                me.userprint = info.userprint;
                me.userid = info.userid;
            },
        });
    },
    formDataAfterRenderCustome: function () {

        var me, storecoa, storekelsub, storesubcode, storeproject, storept, storevendor, storedept, storevendorV2 = '';
        me = this;

        var f = me.getFormdata();
        this.loadPtbyProject();
        storeproject = me.getStore('Project');
        storeproject.load({
            params: {
                "hideparam": 'projectpt',
                "project_id": apps.project,
                "start": 0,
                "limit": 1000000,
            }, callback: function (recordscode, operationcode, successcode) {
                if (successcode) {
                    if (recordscode[0]) {
                        var firstdatacode = recordscode[0]['data'];
                         f.down("[name=project_id]").setValue(parseInt(apps.project));
                       
                    }
                }
            }

        });   

         storevendor = me.getStore('Vendorcombo');
        storevendor.load({
            params: {
                "hideparam": 'getvendor',
                "start": 0,
                "limit": 1000000,
                "project_id": apps.project,
                "pt_id": apps.pt
            },
            callback: function (records, operation, success) {
               storevendor.sort('vendorname', 'ASC');
               if (success) {


                    var last = records.length - 1;
                    if (records[0]) {
                        var firstdatacode = records[0]['data'];
                        me.setValue(me, 'fromvendor_id', firstdatacode.vendor_id);
                        
                    }else{
                        me.setValue(me, 'fromvendor_id', '');
                    }
                   /* if(records[last]){
                        var lastdatacode = records[last]['data'];
                        me.setValue(me, 'until_vendor_id', lastdatacode.vendor_id);

                    }else{
                        me.setValue(me, 'until_vendor_id', '');
                    }*/
                }
                
            }
        });

         storevendorV2 = me.getStore('VendorcomboV2');
        storevendorV2.load({
            params: {
                "hideparam": 'getvendor',
                "start": 0,
                "limit": 1000000,
                "project_id": apps.project,
                "pt_id": apps.pt
            },
            callback: function (records, operation, success) {
               storevendorV2.sort('vendorname', 'ASC');
               if (success) {


                    var last = records.length - 1;
                   /* if (records[0]) {
                        var firstdatacode = records[0]['data'];
                        me.setValue(me, 'from_vendor_id', firstdatacode.vendor_id);
                        
                    }else{
                        me.setValue(me, 'from_vendor_id', '');
                    } */
                    if(records[last]){
                        var lastdatacode = records[last]['data'];
                        me.setValue(me, 'untilvendor_id', lastdatacode.vendor_id);

                    }else{
                        me.setValue(me, 'untilvendor_id', '');
                    }
                }
                
            }
        });

         storecoa = me.getStore('Coacombo');
        storecoa.load({
            params: {
                "hideparam": 'coagrid',
                "start": 0,
                "limit": 1000000,
            },
            callback: function (records, operation, success) {
                if (records[0]) {
                    var row = records[0]['data'];
                    me.setValueCombobox(me, 'from_coa_id', row.coa_id,row.coa);
                    me.setValueCombobox(me, 'until_coa_id', row.coa_id,row.coa);
                }

            }
        });
    },
    loadPtbyProject: function(){

        var me = this;
        projectid = me.getFormdata().down("[name=project_id]").getValue();
         
        if(projectid != null){
            projectid = me.getFormdata().down("[name=project_id]").getValue();
        }else{
            projectid = apps.project;
        }
 
        var f = me.getFormdata();
        storecoa = me.getStore('Pt');
        storecoa.load({
            params: {
                "hideparam": 'getptbyuserproject',
                "start": 0,
                "limit": 1000000,
                "project_id": projectid,
                "user_id": apps.uid
            },
            callback: function (records, operation, success) {
                if (records[0]) {
                    var row = records[0]['data'];
                    me.setValueCombobox(me, 'pt_id', row.pt_id,row.ptname);
                }        
            }
        });
    },
     loadCoabypt: function(newValue){
        var me = this.getMe();
        var f = me.getFormdata();
        var project_id = f.down("[name=project_id]").getValue();

       // var valueModels = f.down("[name=pt_id]").valueModels[0];

        var me = this.getMe();
        storecoa = me.getStore('Coacombo');
        storecoa.load({
            params: {
                "hideparam": 'coagridbyprojectpt_isjournal',
                "start": 0,
                "limit": 1000000,
                 "pt_id_owner": newValue ,
                "project_id": project_id
            },
            callback: function (records, operation, success) {
                if (records[0]) {
                    var row = records[0]['data'];
                    me.setValueCombobox(me, 'from_coa_id', row.coa_id,row.coa);
                    me.setValueCombobox(me, 'until_coa_id', row.coa_id,row.coa);
                }
                
                records.forEach(function(entry) {
                    var row = entry.data;
                    if(row.coa=='10.00.000'){
                        me.setValueCombobox(me, 'from_coa_id', row.coa_id,row.coa);
                    }
                    if(row.coa=='90.00.000'){
                        me.setValueCombobox(me, 'until_coa_id', row.coa_id,row.coa);
                    }
                });
            }
        });

    },
});