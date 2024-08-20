Ext.define('Cashier.controller.Banktransactionreport', {
    extend: 'Cashier.library.template.controller.Controllergl',
    alias: 'controller.Banktransactionreport',
    requires: [
        'Cashier.library.template.combobox.Coacomboboxgrid',
        'Cashier.library.template.combobox.Coagrid',
        'Cashier.library.template.combobox.Subaccountgroupcomboboxgrid',
        'Cashier.library.template.combobox.SubaccountcodeComboboxgrid',
        'Cashier.library.template.combobox.Ptprojectcombobox',
        'Cashier.library.template.combobox.Projectcombobox',
        'Cashier.library.template.combobox.Paymentmethodcombobox',
        'Cashier.library.template.combobox.Bankcombobox2',
        'Cashier.library.template.combobox.Banktypecombobox',
        'Cashier.library.template.combobox.Accountnumbercombobox'
    ],
    views: [
        'banktransactionreport.Panel',
        'banktransactionreport.FormData'
    ],
    stores: [
        'Banktransactionreport',
        'Coacombo',
        'Project',
        'Ptbyuser',
        'Prefixcombo',
        'Subaccountcode',
        'Department',
        'Paymentmethod',
        'Bankvoucherprefixcombobox',
        'Masterbanktype',
        'Accountnumber'
    ],
    models: [
        'Banktransactionreport',
        'Coa',
        'Project',
        'Pt',
        'Subaccountgroup',
        'Subaccountcode',
        'Paymentmethod',
        'Masterbanktype',
        'Accountnumber'
    ],
    refs: [
        {
            ref: 'formdata',
            selector: 'banktransactionreportformdata'
        },
        {
            ref: 'paneldata',
            selector: 'banktransactionreportpanel'
        },
        {
            ref: 'gridkel',
            selector: 'subaccountgroupcomboboxgrid'
        }
    ],
    controllerName: 'banktransactionreport',
    fieldName: '',
    bindPrefixName: 'Banktransactionreport',
    urlprocess: 'cashier/banktransactionreport/read',
    kelsub_id: null,
    paramcoa: null, fromcoa_id: 0, fromcoa: null, untilcoa_id: 0, untilcoa: null,
    reportby: null, voucherby: null, subby: null, detailby: null, fromkelsub: null, untilkelsub: null,
    fromdate: null, untildate: null, fromsubcode: null, untilsubcode: null,
    stimulsoft: "resources/stimulsoft/index.php?stimulsoft_client_key=ViewerFx&stimulsoft_report_key=",
    paramsStr: null, win: null, params: null, dateNow: new Date(), html: null, winId: 'myReportWindow', checksub: null, report: null,
    statusprocess: null, project_name: null, pt_name: null, userid: null, userprint: null, urlrequest: null, senddata: null, info: null, form: null,
    storekelsub: null, kelsubid_from: null, kelsubid_to: null, detail_coa: null,
    cluster: null,showpaymentmethod: true,projectshowpaymentmethod: null,paymentmethod: null,
    payment_from_date: null,payment_until_date: null,bank_id: null,banktype_id: null,
    init: function (application) {
        var me = this;
        this.control({
            'banktransactionreportpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: function (panel) {
                    Ext.get('WINDOW-mnu' + me.bindPrefixName).setHeight(630);
                    Ext.get('WINDOW-mnu' + me.bindPrefixName).setWidth(600);
                    me.panelAfterRender();
                }
            },
            'banktransactionreportformdata': {
                afterrender: function (panel) {
                    this.formDataAfterRenderCustome();
                },
                boxready: function() {
                    
                    var me = this;

                    $("#banktransactionreportID input[name='sub_coa_from_id']").keyup(function()
                    {
                        this.value = this.value.replace(/(\d{2})(\d{2})/,'$1'+'.'+'$2')
                    });

                    $("#banktransactionreportID input[name='sub_coa_until_id']").keyup(function()
                    {
                        this.value = this.value.replace(/(\d{2})(\d{2})/,'$1'+'.'+'$2')
                    });
                }
            },
            'banktransactionreportformdata [name=kasbank_type]': {
                change: function(dis, newValue, oldValue, eOpts) {

                    var me = this;
                    var f  = me.getFormdata();
                    var value = dis.rawValue;

                    if (value == 'BANK') {
                        f.down("[name=bank_id]").setDisabled(false).setValue('');
                        f.down("[name=bank_all]").setDisabled(false).setValue(true);
                        f.down("[name=account_number]").setDisabled(false).setValue('');
                        f.down("[name=accountnumber_all]").setDisabled(false).setValue(true);
                    } else {
                        f.down("[name=bank_id]").setDisabled(true).setValue('');
                        f.down("[name=bank_all]").setDisabled(true).setValue(true);
                        f.down("[name=bank_account]").setDisabled(false).setValue('');
                        f.down("[name=banktype_id]").setDisabled(false).setValue('');
                        f.down("[name=prefix_all]").setDisabled(false).setValue('');
                        f.down("[name=account_number]").setDisabled(true).setValue('');
                         f.down("[name=accountnumber_all]").setDisabled(false).setValue('');
                    }
                }
            },
            'banktransactionreportformdata [name=sub_coa_from_id]': {
                change: function (me, newValue, oldValue, eOpts) {
                    if (oldValue !== 'undefined') {
                        me.fromcoa_id = oldValue;

                    }

                },
                select: function () {
                    me.checkPositionCOA('from');

                },
            
                
                
            },
            'banktransactionreportformdata [name=sub_coa_until_id]': {
                change: function (cb, newValue, oldValue, options) {
                    if (oldValue !== 'undefined') {
                        me.untilcoa_id = oldValue;

                    }

                },
                select: function (cb, newValue, oldValue, options) {
                    this.checkPositionCOA('until');
                },
               
                
                
            },
            'banktransactionreportformdata button[action=submit]': {
                click: function () {
                    me.Processdata();

                }
            },
            'banktransactionreportformdata [name=dept_all]': {
                change: function () {
                    me.getclean('dept_id');
                }
            },
            'banktransactionreportformdata [name=dept_id]': {
                change: function (el, newValue, oldValue, eOpts) {
                    form = me.getFormdata();

                    if (newValue != '') {
                        form.down("[name=dept_all]").setValue(false);
                        form.down("[name=dept_id]").setValue(newValue);
                    }
                }
            },
            'banktransactionreportformdata [name=prefix_all]': {
                change: function () {
                    me.getclean('bank_account');
                }
            },
             'banktransactionreportformdata [name=accountnumber_all]': {
                change: function () {
                    me.getclean('account_number');
                }
            },
            'banktransactionreportformdata [name=bank_id]': {
                select: function(el, newValue, oldValue, eOpts) {
                    f = me.getFormdata();
                    if (el.rawValue != '') {
                        f.down("[name=prefix_all]").setDisabled(true).setValue(true);
                        f.down("[name=bank_account]").setDisabled(true).setValue('');
                        f.down("[name=bank_all]").setValue(false);
                    }
                }
            },
            'banktransactionreportformdata [name=bank_all]': {
                change: function(el, newValue, oldValue, eOpts) {
                    f = me.getFormdata();
                    if (newValue == true) {
                        f.down("[name=prefix_all]").setDisabled(false).setValue(true);
                        f.down("[name=bank_account]").setDisabled(false).setValue('');
                        f.down("[name=bank_id]").setValue('');
                    } else {
                        f.down("[name=prefix_all]").setDisabled(true).setValue(true);
                        f.down("[name=bank_account]").setDisabled(true).setValue('');
                    }
                }
            },
            'banktransactionreportformdata [name=banktype_id]': {
                select: function(el, newValue, oldValue, eOpts) {
                    f = me.getFormdata();
                    if (el.rawValue != '') {
                        f.down("[name=banktype_all]").setValue(false);
                    }

                    me.loadPrefixbybanktype(el.value);
                }
            },
            'banktransactionreportformdata [name=banktype_all]': {
                change: function(el, newValue, oldValue, eOpts) {
                    f = me.getFormdata();
                    if (newValue == true) {
                        f.down("[name=banktype_id]").setValue('');
                    } 

                    me.loadPrefixbybanktype(0);
                }
            },
            'banktransactionreportformdata [name=bank_account]': {
                change: function (el, newValue, oldValue, eOpts) {
                    form = me.getFormdata();

                    if (newValue != '') {
                        form.down("[name=prefix_all]").setValue(false);
                        form.down("[name=bank_account]").setValue(newValue);
                    }
                }
            },
            'banktransactionreportformdata [name=paymentmethod_all]': {
                change: function () {
                    me.getclean('paymentmethod_id');
                }
            },
            'banktransactionreportformdata [name=pt_id]': {
                change: function (el) {

                    form = me.getFormdata();

                    me.setprojectpt(el.name, el.ownerCt);
                    this.loadCoabypt(el.value);
                    this.loadDeptbypt(el.value);
                    this.loadPrefixbypt(el.value);
                    this.loadAccountNumber();

                    form.down("[name=prefix_all]").setValue(false);
                    form.down("[name=dept_all]").setValue(false);
                }
                
            },
            'banktransactionreportformdata [name=project_id]': {
                change: function (el) {
                    this.loadPtbyProject();
                    this.loadAccountNumber();

                    var form = me.getFormdata();
                    form.down("[name=prefix_all]").setValue(false);
                    form.down("[name=dept_all]").setValue(false);
                }
            },
            'banktransactionreportformdata [name=paymentmethod_id]': {
                change: function(el, newValue, oldValue, eOpts) {

                    form = me.getFormdata();

                    if (newValue != '') {
                        form.down("[name=paymentmethod_all]").setValue(false);
                        form.down("[name=paymentmethod_id]").setValue(newValue);
                    }
                }
            },
             'banktransactionreportformdata [name=account_number]': {
                select: function(el, newValue, oldValue, eOpts) {
                    f = me.getFormdata();
                    if (el.rawValue != '') {
                        f.down("[name=accountnumber_all]").setValue(false);
                        f.down("[name=account_number]").setValue(newValue);
                    }
                }
            },
        });
    },
  
    
    Processdata: function () {
        var me, form, debetkredit,sortby,reporttype,kasbanktype,fromdate,untildate,fromcoa,untilcoa,deptid,bankaccount, parameter, liquid, is_liquid, detail_coa = '', bank_id;
        me = this;

        form = me.getFormdata();
        me.debetkredit = Ext.ComponentQuery.query('[name=dk]')[0].getGroupValue();
        me.sortby = Ext.ComponentQuery.query('[name=sort_by]')[0].getGroupValue();


        me.reporttype = form.down("[name=reporttype]").getValue();
        me.kasbanktype = form.down("[name=kasbank_type]").getValue();

        me.fromdate = me.getValue(me, "subfromdate", "raw");
        me.untildate = me.getValue(me, "subuntildate", "raw");
        me.fromcoa = me.getValue(me, "sub_coa_from_id", "raw");
        me.untilcoa = me.getValue(me, "sub_coa_until_id", "raw");
        me.deptid =form.down("[name=dept_id]").getValue();
        me.bankaccount = form.down("[name=bank_account]").getValue(); 
        liquid =form.down("[name=is_liquid]").getValue();
        me.is_liquid = Ext.ComponentQuery.query('[name=is_liquid]')[0].getGroupValue();
        me.detail_coa = Ext.ComponentQuery.query('[name=detail_coa]')[0].getGroupValue();
        me.paymentmethod = form.down("[name=paymentmethod_id]").getValue();
        // me.payment_from_date = me.getValue(me, "paymentfromdate", "raw");
        // me.payment_until_date = me.getValue(me, "paymentuntildate", "raw");
        me.bank_id = form.down("[name=bank_id]").getValue() == '' ? 0 : form.down("[name=bank_id]").getValue();
        me.banktype_id = form.down("[name=banktype_id]").getValue();

       if(me.reporttype == 'DEFAULT'){
                me.senddata = {
                hideparam: 'justreturn',
                debetkredit: me.debetkredit,
                sortby: me.sortby,
                kasbanktype: me.kasbanktype,
                fromdate: me.fromdate,
                untildate: me.untildate,
                fromcoa: me.fromcoa,
                untilcoa: me.untilcoa,
                deptid: me.deptid,
                bankaccount: me.bankaccount,
                is_liquid: me.is_liquid,
                reporttype: me.reporttype,
                detail_coa: me.detail_coa,
                showpaymentmethod: me.showpaymentmethod,
                paymentmethod: me.paymentmethod,
                // payment_from_date: me.payment_from_date,
                // payment_until_date: me.payment_until_date,
                bank_id: me.bank_id,
                banktype_id: me.banktype_id
            }

            Ext.getBody().mask("Please wait...");
            me.urlrequest = 'cashier/banktransactionreport/create';
            me.AjaxRequest();
       }else{
             me.showReport();
       }
        



    },
    showReport: function () {
        var me;
        me = this;
        me.winId = me.controllerName + '_' + Ext.Date.format(new Date(), 'His');
        var title = 'Result ' + me.getFormdata().up('window').title;
        me.form = me.getFormdata().getForm();
        var e = me.getFormdata().down("[name=pt_id]");
        var x = e.getStore().findRecord("pt_id", me.getFormdata().down("[name=pt_id]").getValue(),0,false,true,true);
        var reporttype = me.getFormdata().down("[name=reporttype]").getValue();


        if(reporttype=='DEFAULT'){
            me.instantWindowWithMinimize('Panel', 800, title, 'state-report', me.winId, me.controllerName);
        }else if(reporttype=='EXCEL'){
          
        }else{
            me.instantWindowWithMinimize('Panel', 800, title, 'state-report', me.winId, me.controllerName);
        }

        me.paramsStr = me.generateReportParams(me.getFormdata().getForm().getFieldValues());
        // var win = desktop.getWindow(winId);
        var sortircaption,dkcaption,deptcaption,bankcaption,paymentmethod;
        me.win = desktop.getWindow(me.winId);
       
        if (true) {
            resetTimer();
            me.value = me.form.getValues();

            me.value["project_name"] = x.data['project_name'];
            me.value["pt_name"] = x.data['ptname'];
            me.value["userprint"] = apps.username;
            me.value["userid"] = me.userid;
            me.value["tgl_sekarang"] = Ext.Date.format(new Date(), 'd/m/Y');
            me.value["time_sekarang"] = Ext.Date.format(new Date(), 'H:i:s');
            me.value["project_id"] = x.data['project_id'];
            me.value["pt_id"] = me.getFormdata().down("[name=pt_id]").getValue();
            
            if(me.sortby == '1'){
                sortircaption = 'Voucher No';
            }else if(me.dataflow == '2'){
                sortircaption = 'Transaction Date'
            }else{
                sortircaption = 'Amount'
            }

            if(me.debetkredit == 'ALL'){
                dkcaption = 'Debet & Kredit';
            }else if(me.debetkredit == 'D'){
                dkcaption = 'Debet';
            }else{
                dkcaption = 'Kredit';
            }

            deptcaption = me.getValue(me, "dept_id", "raw");
            if (me.getFormdata().down("[name=bank_account]").getValue() == ''){
                bankcaption = 'ALL';
                me.bankaccount = '';
            }else{
            var valueModels = me.getFormdata().down("[name=bank_account]").valueModels[0];
            bankcaption = valueModels.data.description;
            }

            if (me.getFormdata().down("[name=dept_id]").getValue() == ''){
                deptcaption = 'ALL';
            }

            if (me.getFormdata().down("[name=paymentmethod_id]").getValue() == ''){
                paymentmethod = '';
            } else {
                paymentmethod = me.getFormdata().down("[name=paymentmethod_id]").getValue();
            }

             if (me.getFormdata().down("[name=account_number]").getValue() == ''){
                accountnumber = '';
            } else {
                accountnumber= me.getFormdata().down("[name=account_number]").getValue();
            }

            me.value["sort_by"] = me.sortby;
            me.value["sortir"] = sortircaption;
            me.value["dkcaption"] = dkcaption;
            me.value["deptcaption"] = deptcaption;
            me.value["bankcaption"] = bankcaption;
            me.value["debet_kredit"] = me.debetkredit;
            me.value["fromdate"] = me.reformatDateString(me.fromdate);
            me.value["untildate"] = me.reformatDateString(me.untildate);
            me.value["tanggal"] = me.value["fromdate"] + ' s/d ' + me.value["untildate"];
            me.value["coastart_id"] = me.fromcoa;
            me.value["coaend_id"] = me.untilcoa;
            me.value["dept_id"] = me.deptid;
            me.value["prefix_id"] = me.bankaccount;
            me.value["printdate"] = me.Curdate();
            var dy = new Date(me.value["fromdate"]);
            me.value["tahun"] = dy.getFullYear();
            me.value["paymentmethod"] = paymentmethod;
            // me.value["payment_from_date"] = me.reformatDateString(me.payment_from_date);
            // me.value["payment_until_date"] = me.reformatDateString(me.payment_until_date);
            me.value["bank_id"] = me.bank_id;
            me.value["banktype_id"] = me.banktype_id;
            me.value["account_number"] = accountnumber;
            

            var params = me.value;

            var showspksop = me.getFormdata().down("[name=showspksop]").getValue();
            console.log(showspksop);

            if(me.kasbanktype == 'KAS'){
                if ( showspksop == 0 ) {
                    if (reporttype == 'DEFAULT (WITH KASBON NO)') {
                        var reportFile = 'KasTransactionWithKasbonNo';
                    } else {
                        var reportFile = 'KasTransaction';
                    }
                }else{
                    var reportFile = 'KasTransactionV2';
                }
            }else{
                if ( showspksop == 0 ) {
                    if (reporttype == 'DEFAULT (WITH KASBON NO)') {
                        var reportFile = 'KasTransactionWithKasbonNo';
                    } else {
                        var reportFile = 'BankTransaction';
                    }
                }else{
                    var reportFile = 'BankTransactionV2';
                }
            }
            console.log(reportFile);

            if(reporttype == 'DEFAULT' || reporttype == 'DEFAULT (WITH KASBON NO)'){
                me.html = me.ReportviewerV4(params, reportFile, me.win.id, 1); //whole report
                me.win.down("#MyReportPanel_" + me.win.id).body.setHTML(me.html);
                $("#Reportform_" + me.win.id).submit();
            }else{
                
                // me.generatereportexcel(params);
                me.generatefileexcel(params);
                return false;  
            }
         
        }


    },
    checkPositionCOA: function (flag) {
        var me = '';
        me = this;
        me.senddata = {
            hideparam: 'checklevelcoa',
            flagchange: flag,
            fromcoa: me.getValue(me, "sub_coa_from_id", "raw"),
            untilcoa: me.getValue(me, "sub_coa_until_id", "raw")
        }
        me.urlrequest = 'cashier/banktransactionreport/create';
        me.AjaxRequest();
    },
     getclean: function(val){
        var me = this;
            me.setValue(me, val,'');

    },
   
   
    
    defaultRange: function () {
        var me = '';
        me = this;
        me.senddata = {
            hideparam: 'defaultrange'
        }
        me.urlrequest = 'cashier/banktransactionreport/create';
        me.AjaxRequest();
    },
    generatereportexcel: function(params){   
         var me,report;
         me = this;  
         params['hideparam'] = 'generatereportexcel',
         me.senddata = params,
         me.urlrequest = 'cashier/banktransactionreport/create';
         Ext.getBody().mask("Please wait...");
         me.AjaxRequest();       
    }, 
    generatefileexcel: function(params){   
        var me,report;
        me = this;  
        params['hideparam'] = 'generatefileexcel',
        me.senddata = params,
        me.urlrequest = 'cashier/banktransactionreport/create';
        Ext.getBody().mask("Please wait...");
        me.AjaxRequest();       
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
                console.log(me.info);
                me.setSuccessEvent();
            },
            failure: function (response) {
                me.getFormdata().up('window').close();
            }
        });
    },
    setSuccessEvent: function () {
        var me = this;
        if (me.info.parameter == 'default') {
            if (me.info.counter < 1) {
                Ext.getBody().unmask();
                me.buildWarningAlert(me.info.message);
            } else {
                Ext.getBody().unmask();
                Ext.Msg.show({
                    title: 'Success',
                    msg: 'Process  data successfully.',
                    icon: Ext.Msg.INFO,
                    buttons: Ext.Msg.OK,
                    fn: function () {
                        me.formDataClose();
                    }
                });
            }
        } else if (me.info.parameter == 'defaultrange') {
            var form = me.getFormdata();
            Ext.getBody().unmask();

            var date = new Date();
            var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
            var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

            me.setValue(me, 'subfromdate', firstDay);
            me.setValue(me, 'subuntildate', lastDay);
            // me.setValue(me, 'paymentfromdate', firstDay);
            // me.setValue(me, 'paymentuntildate', lastDay);
            me.yeardata = me.info.data.yeardb;
            //form.down("[name=subfromdate]").setMinValue(me.yeardata + '-01-01');
            //form.down("[name=subfromdate]").setMaxValue(me.info.data.enddecember);
            //form.down("[name=subuntildate]").setMinValue(me.yeardata + '-01-01');
            //form.down("[name=subuntildate]").setMaxValue(me.info.data.enddecember);
        } else if (me.info.parameter == 'default') {
            Ext.getBody().unmask();
        } else if (me.info.parameter == 'getcoabyid') {
            me.setValue(me, "paramcoa", me.info.data[1][0].coa);

        } else if (me.info.parameter == 'checklevelcoa') {
            var counter = me.info.data.counter;
            var flagchange = me.info.data.flagchange;

            if (counter < 0 && flagchange == 'from') {
                // console.log('normal'+' '+flagchange);
            } else if (counter == 0 && flagchange == 'from') {
                // console.log('same'+' '+flagchange);
            } else if (counter > 0 && flagchange == 'from') {
                me.setValue(me, 'sub_coa_until_id', me.getValue(me, "sub_coa_from_id", "value"));
                // console.log('not valid'+' '+flagchange);
            }


            if (counter < 0 && flagchange == 'until') {
                // console.log('normal'+' '+flagchange);
            } else if (counter == 0 && flagchange == 'until') {
                // console.log('same'+' '+flagchange);
            } else if (counter > 0 && flagchange == 'until') {
                if (me.untilcoa_id != '0') {
                    me.setValue(me, 'sub_coa_until_id', me.untilcoa_id);
                }
//                /console.log('not valid'+' '+flagchange);
            }

        } else if (me.info.parameter == 'processreport') {
            Ext.getBody().unmask();
            me.statusprocess = me.info.success;
            if (me.statusprocess == true) {
                me.cluster = me.info.data.cluster;
                me.showReport();
            }
        } else if (me.info.parameter == 'justreturn') {
            Ext.getBody().unmask();
            me.showReport();
        }else if (me.info.parameter == 'generatereportexcel' || me.info.parameter =='generatefileexcel') {
            Ext.getBody().unmask();
            var file_path = me.info.data.url;  
            var a = document.createElement('A');
            a.href = file_path;
            a.download = file_path.substr(file_path.lastIndexOf('/') + 1);
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            Ext.getBody().unmask();
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

        var me, storecoa, storekelsub, storesubcode, storeproject, stordept, storeprefix, storeaccnumber = '';
        me = this;

        var f = me.getFormdata();

        me.getStore('Bankvoucherprefixcombobox').load();

        me.getStore('Masterbanktype').load();
        f.down("[name=banktype_all]").setValue(true);

        me.defaultRange();
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

        storeprefix = me.getStore('Prefixcombo');
        storeprefix.load({
            params: {
                "hideparam": 'getprefixbyprojectpt',
                "project_id": apps.project,
                "pt_id": apps.pt,
                "start": 0,
                "limit": 1000000,
            }, callback: function (recordscode, operationcode, successcode) {
                if (successcode) {
                    if (recordscode[0]) {
                        var firstdatacode = recordscode[0]['data'];
                         f.down("[name=bank_account]").setValue(firstdatacode.prefix_id);
                       
                    }
                }
            }

        });

        storedept = me.getStore('Department');
        storedept.load({
            params: {
                "hideparam": 'getdepartmentbyprojectpt',
                "project_id": apps.project,
                "pt_id": apps.pt,
                "start": 0,
                "limit": 1000000,
            }, callback: function (recordscode, operationcode, successcode) {
                if (successcode) {
                    if (recordscode[0]) {
                        var firstdatacode = recordscode[0]['data'];
                         f.down("[name=dept_id]").setValue(firstdatacode.department_id);
                       
                    }
                }
            }

        });

        storedept = me.getStore('Paymentmethod');
        storedept.load({
            params: {
                "hideparam": 'getpaymentmethod',
                "project_id": apps.project,
                "pt_id": apps.pt,
                "start": 0,
                "limit": 1000000,
            }
        });


         storeaccnumber = me.getStore('Accountnumber');
         storeaccnumber.load();
        storeaccnumber.load({
            params: {
                "hideparam": 'getaccountnumberbyprojectpt',
                "project_id": apps.project,
                "pt_id": apps.pt,
                "start": 0,
                "limit": 1000000,

            },
            callback: function (recordscode, operationcode, successcode) {
                
            }
        });



     // me.loadPtbyProject();

      //load coa
     // me.loadCoabypt(f.down("[name=pt_id]").getValue());
   
    },
    loadCoabypt: function(newValue){

        var me = this;
        me.pt_id = newValue;

        var f = me.getFormdata();
        var project_id = f.down("[name=project_id]").getValue();


        storecoa = me.getStore('Coacombo');
        storecoa.load({
            params: {
                "hideparam": 'coagridbyuserpt',
                "start": 0,
                "limit": 1000000,
                "pt_id_owner": newValue ,
                "project_id": project_id
            },
            callback: function (records, operation, success) {


                if (records[0]) {
                    var row = records[0]['data'];
                    me.setValueCombobox(me, 'sub_coa_from_id', row.coa_id,row.coa_id);
                    me.setValueCombobox(me, 'sub_coa_until_id', row.coa_id,row.coa_id);
                }
              
                records.forEach(function(entry) {
                    var row = entry.data;
                    if(row.coa=='10.00.000'){
                        me.setValueCombobox(me, 'sub_coa_from_id', row.coa_id,row.coa);
                    }
                    if(row.coa=='90.00.000'){
                        me.setValueCombobox(me, 'sub_coa_until_id', row.coa_id,row.coa);
                    }
                });
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
     loadDeptbypt: function(newValue){

        var me = this;
        me.pt_id = newValue;

        var f = me.getFormdata();
        var project_id = f.down("[name=project_id]").getValue();


        storedept = me.getStore('Department');
        storedept.load({
            params: {
               "hideparam": 'getdepartmentbyprojectpt',
                "project_id": project_id,
                "pt_id": me.pt_id,
                "start": 0,
                "limit": 1000000,
            },
            callback: function (records, operation, success) {

                if (success) {
                    if (records[0]) {
                        var firstdatacode = records[0]['data'];
                         f.down("[name=dept_id]").setValue(firstdatacode.department_id);
                       
                    }else{
                        f.down("[name=dept_id]").setValue('');
                        f.down("[name=dept_all]").setValue(true);
                    }
                }
            }
        });

    },
    loadPrefixbypt: function(newValue){

        var me = this;
        me.pt_id = newValue;

        var f = me.getFormdata();
        var project_id = f.down("[name=project_id]").getValue();


        storeprefix = me.getStore('Prefixcombo');
        storeprefix.load({
            params: {
                "hideparam": 'getprefixbyprojectpt',
                "project_id": project_id,
                "pt_id": me.pt_id,
                "start": 0,
                "limit": 1000000,
            },
            callback: function (records, operation, success) {

                f.down("[name=bank_account]").setValue('');
                f.down("[name=prefix_all]").setValue(true);

                // if (success) {
                //     if (records[0]) {
                //         var firstdatacode = records[0]['data'];
                //          f.down("[name=bank_account]").setValue(firstdatacode.prefix_id);
                //     }else{
                //         f.down("[name=bank_account]").setValue('');
                //         f.down("[name=prefix_all]").setValue(true);
                //     }
                // }
            }
        });

    },
    loadPrefixbybanktype: function(newValue){

        var me = this;

        var f = me.getFormdata();
        var project_id = f.down("[name=project_id]").getValue();
        var pt_id = f.down("[name=pt_id]").getValue();


        storeprefix = me.getStore('Prefixcombo');
        storeprefix.load({
            params: {
                "hideparam": 'getprefixbyprojectpt',
                "project_id": project_id,
                "pt_id": pt_id,
                "start": 0,
                "limit": 1000000,
                "banktype_id": newValue
            },
            callback: function (records, operation, success) {

                f.down("[name=bank_account]").setValue('');
                f.down("[name=prefix_all]").setValue(true);

                // if (success) {
                    // if (records[0]) {
                    //     var firstdatacode = records[0]['data'];
                    //      f.down("[name=bank_account]").setValue(firstdatacode.prefix_id);
                    // }else{
                    //     f.down("[name=bank_account]").setValue('');
                    //     f.down("[name=prefix_all]").setValue(true);
                    // }
                    
                // }
            }
        });

    },
    loadAccountNumber: function(){

        var me = this;

        var f = me.getFormdata();
        var project_id = f.down("[name=project_id]").getValue();
        var pt_id = f.down("[name=pt_id]").getValue();


        var storeaccnumber = me.getStore('Accountnumber');
        storeaccnumber.load({
            params: {
                "hideparam": 'getaccountnumberbyprojectpt',
                "project_id": project_id,
                "pt_id": pt_id,
                "start": 0,
                "limit": 1000000
            },
            callback: function (records, operation, success) {

             
            }
        });

    },
});