Ext.define('Cashier.controller.Chequeclearing', {
    extend: 'Cashier.library.template.controller.Controllermodule',
    alias: 'controller.Chequeclearing',
    requires: [
        'Cashier.template.ComboBoxFields',
        'Cashier.library.template.combobox.Ptusercombobox',
        'Cashier.library.template.combobox.Voucherprefixbankcombobox',
        'Cashier.library.template.combobox.Reportfilecombobox',
        'Cashier.library.template.combobox.Coarptcombobox',
        //'Cashier.library.template.combobox.Rangeapprovalcombobox',
        'Cashier.library.template.combobox.Rangeapprovecombobox',
    ],
    views: [
        'chequeclearing.Panel',
        'chequeclearing.FormData'
    ],
    stores: [
        'Ptbyuser',
        'Voucherprefixsetup',
        'Reportfile',
        'Coa',
        //'Rangeapproval',
        'Rangeapprove',
    ],
    models: [
    ],
    refs: [
        {
            ref: 'formdata',
            selector: 'chequeclearingformdata'
        },
        {
            ref: 'formsetupcoa',
            selector: 'chequeclearingformsetupcoa'
        },
        {
            ref: 'paneldata',
            selector: 'chequeclearingpanel'
        }
    ],
    controllerName: 'chequeclearing',
    fieldName: '',
    bindPrefixName: 'Chequeclearing',
    urlprocess: 'cashier/chequeclearing/create',
    stimulsoft: "resources/stimulsoft/index.php?stimulsoft_client_key=ViewerFx&stimulsoft_report_key=",
    yeardata: null, paramsStr: null, win: null, params: null, dateNow: new Date(), html: null, winId: 'myReportWindow',
    project_name: null, pt_name: null, userprint: null, urlrequest: null, senddata: null, info: null, form: null, cluster: null,
    value: null,
    statusdetail: null, statusdetaildesc: null, periode: null, filtercoa: null,
    fromcoa: null, untilcoa: null, fromdate: null, untildate: null,
    arraysetupcoa: null, allcompany: null,
    init: function (application) {
        var me = this;
        this.control({
            'chequeclearingpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: function (panel) {
                    me.windowsHeight(me.bindPrefixName, 590);
                    me.windowsWidht(me.bindPrefixName, 680);
                    me.panelAfterRender();
                }
            },
            'chequeclearingformdata': {
                afterrender: function (panel) {
                    this.formDataAfterRender();
                },
                boxready: function () {
                    this.formDataReady();
                }
            },
            'chequeclearingformdata [name=allcompany]': {
                change: function (the, newValue, oldValue, eOpts) {
                    me.fromuntilcompany(newValue);
                    me.allcompany = newValue;
                    if (newValue == true) {
                        me.filterbyCompanyforBank();
                    }
                },
            },
            'chequeclearingformdata [name=allbank]': {
                change: function (the, newValue, oldValue, eOpts) {
                    me.fromuntilbank(newValue);
                },
            },
            'chequeclearingformdata [name=untilpt]': {
                change: function (field, eOpts) {
                    var me, form, allcompany;
                    me = this;
                    form = me.getFormdata();
                    allcompany = me.getVal(form, 'allcompany', 'value');
                    if (allcompany == false) {
                        me.filterbyCompanyforBank();
                    }
                },
            },           
            'chequeclearingformdata [name=allrangeapproval]': {
                change: function (the, newValue, oldValue, eOpts) {
                    var me;
                    me = this;
                    me.rangeapprove(newValue);
                },
            },
            'chequeclearingformdata [name=reportfile]': {
                change: function (the, newValue, oldValue, eOpts) {
                    /* RO3 adalah kode report filenya */
                    var me, form;
                    me = this;
                    form = me.getFormdata();
                    if (newValue == 'R03') {
                        me.hideBtn(form, 'settingdetailcoa', false);
                    }
                },
            },
            'chequeclearingformdata button[action=settingdetailcoa]': {
                click: function () {
                    me.paramsetupcoa.stateform = 'Detail Coa';
                    me.GenerateFormdata(me.paramsetupcoa);
                }
            },
            'chequeclearingformsetupcoa': {
                afterrender: function () {
                    me.filterbyCompanyforCoa();
                }
            },
            'chequeclearingformsetupcoa [name=coa_id1]': {
                change: function (the, newValue, oldValue, eOpts) {
                    this.getFormsetupcoa().down("[name=coaname1]").setValue(the.valueModels[0].data.coaname);
                }
            },
            'chequeclearingformsetupcoa [name=coa_id2]': {
                change: function (the, newValue, oldValue, eOpts) {
                    this.getFormsetupcoa().down("[name=coaname2]").setValue(the.valueModels[0].data.coaname);
                }
            },
            'chequeclearingformsetupcoa [name=coa_id3]': {
                change: function (the, newValue, oldValue, eOpts) {
                    this.getFormsetupcoa().down("[name=coaname3]").setValue(the.valueModels[0].data.coaname);
                }
            },
            'chequeclearingformsetupcoa [name=coa_id4]': {
                change: function (the, newValue, oldValue, eOpts) {
                    this.getFormsetupcoa().down("[name=coaname4]").setValue(the.valueModels[0].data.coaname);
                }
            },
            'chequeclearingformsetupcoa [name=coa_id5]': {
                change: function (the, newValue, oldValue, eOpts) {
                    this.getFormsetupcoa().down("[name=coaname5]").setValue(the.valueModels[0].data.coaname);
                }
            },
            'chequeclearingformsetupcoa button[action=close]': {
                click: function () {
                    var form, formdata, value,coa1,coa2,coa3,coa4,coa5;
                    form = this.getFormsetupcoa();
                    formdata = form.getForm();
                    value = formdata.getValues();
                    if (value.coa_id1 !== undefined || value.coa_id1 !== '') {
                        /*
                        coa1 = form.down('[name=coa_id1]').getRawValue();
                        coa2 = form.down('[name=coa_id2]').getRawValue();
                        coa3 = form.down('[name=coa_id3]').getRawValue();
                        coa4 = form.down('[name=coa_id4]').getRawValue();
                        coa5 = form.down('[name=coa_id5]').getRawValue();
                        */
                        
                        coa1 = form.down('[name=coa_id1]').getValue();
                        coa2 = form.down('[name=coa_id2]').getValue();
                        coa3 = form.down('[name=coa_id3]').getValue();
                        coa4 = form.down('[name=coa_id4]').getValue();
                        coa5 = form.down('[name=coa_id5]').getValue();
                        
                        me.arraysetupcoa = {
                            'coa1':coa1,
                            'coa2':coa2,
                            'coa3':coa3,
                            'coa4':coa4,
                            'coa5':coa5                            
                        };
                    }
                    this.getFormsetupcoa().up('window').close();
                }
            },
            'chequeclearingformdata button[action=submit]': {
                click: function () {
                    this.showReport();
                }
            }
        });
    },
    paramsetupcoa: {
        //start formgeneate
        fromlocation: 'Cashier.view.chequeclearing.FormsetupCoa',
        formtitle: 'Setup Options', formicon: 'icon-form-add',
        formid: 'win-chequeclearingformsetupcoa', formlayout: 'fit',
        formshadow: 'frame', formmask: 'Loading...',
        formwidth: 800, formtimeout: 0,
        stateform: null, formaction: null, formproperties: null, formwindows: null,
        //end formgeneate     
    },
    panelAfterRender: function () {
        var me = this;
        Ext.Ajax.request({
            url: 'cashier/chequeclearing/read',
            success: function (response) {
                var info = Ext.JSON.decode(response.responseText);
                me.project_name = info.project_name;
                me.pt_name = info.pt_name;
                me.userprint = info.userprint;
            },
        });
    },
    formDataAfterRender: function () {
        var me, storecoa, form = '';
        me = this;
        form = me.getFormdata();
        me.setStoreFormdata();
        me.setVal(form, 'fromperiode', me.dateNow);
        me.setVal(form, 'untilperiode', me.dateNow);
        me.fromuntilcompany(true);
        me.fromuntilbank(true);
        me.rangeapprove(true);
        me.allcompany = true;
    },
    formDataReady: function () {
        var me, form, storebank = '';
        me = this;
        form = me.getFormdata();
        storebank = form.down('[name=frombank]').getStore();
        me.filterStatusbank(storebank);
        me.setVal(form, 'reportfile', 'R01');
        me.hideBtn(form, 'settingdetailcoa', true);
    },
    filterStatusbank: function (store) {
        var me, form;
        me = this;
        store.clearFilter(true);
        store.filter('cash_bank', 'B');
        store.filter('in_out', 'O');
    },
    filterbyCompanyforBank: function () {
        var me, grid, store, form, combobox, counter;
        me = this;
        form = me.getFormdata();
        combobox = form.down('[name=frombank]');
        store = combobox.getStore();
        store.reload({
            params: {
                "hideparam": 'filterprefixbypt',
                "fromprojectpt": me.getVal(form, 'frompt', 'raw'),
                "untilprojectpt": me.getVal(form, 'untilpt', 'raw'),
                "start": 0,
                "limit": 1000,
            },
            callback: function (records, operation, success) {
                store.sort({property: 'coa', direction: 'ASC'});
                me.filterStatusbank(store);
            }
        });
    },
    filterbyCompanyforCoa: function () {
        var me, store, formdata, form, combobox, counter, frompt, untilpt;
        me = this;
        formdata = me.getFormdata();
        form = me.getFormsetupcoa();
        combobox = form.down('[name=coa_id1]');
        store = combobox.getStore();
        frompt = me.getVal(formdata, 'frompt', 'raw');
        untilpt = me.getVal(formdata, 'untilpt', 'raw');
        if (me.allcompany == false) {
            if (frompt == '') {
                store.add({coa_id: 9999999999, coa: '99.99.999', coaname: 'COA TEMPORARY'});
            } else {
                me.loadCoa(store, frompt, untilpt);
            }
        } else {
            me.loadCoa(store, frompt, untilpt);
        }
    },
    loadCoa: function (store, frompt, untilpt) {
        store.load({
            params: {
                "hideparam": 'filtercoabypt',
                "fromprojectpt": frompt,
                "untilprojectpt": untilpt,
                "start": 0,
                "limit": 1000,
            },
            callback: function (records, operation, success) {
                store.add({coa_id: 9999999999, coa: '99.99.999', coaname: 'COA TEMPORARY'});
                store.sort({property: 'coa', direction: 'ASC'});
            }
        });

    },
    showReport: function () {
        var me;
        me = this;
        me.form = me.getFormdata().getForm();
        me.setupData();
    },
    setupData: function () {
        var me, form, formvalue,formsetupcoa;
        me = this;
        form = me.getFormdata();
        formvalue = form.getForm().getValues();
        formsetupcoa = me.getFormsetupcoa();
        
        if (form.getForm().isValid()) {

            if (formvalue.allcompany == '1') {
                formvalue['fromproject'] = '';
                formvalue['untilproject'] = '';
                formvalue['frompt'] = '';
                formvalue['untilpt'] = '';
                formvalue['in_ptid'] = '';
            } else {
                formvalue['fromproject'] = form.down("[name=frompt]").valueModels[0].raw.projectcode;
                formvalue['untilproject'] = form.down("[name=untilpt]").valueModels[0].raw.projectcode;
                formvalue['frompt'] = form.down("[name=frompt]").valueModels[0].raw.ptcode;
                formvalue['untilpt'] = form.down("[name=untilpt]").valueModels[0].raw.ptcode;
                formvalue['in_ptid'] = me.Filterinpt();
            }

            if (formvalue.allbank == '1') {
                formvalue['fromcoabank'] = '';
                formvalue['untilcoabank'] = '';
                formvalue['incoa'] = '';
            } else {
                formvalue['fromcoabank'] = form.down("[name=frombank]").valueModels[0].raw.coa;
                formvalue['untilcoabank'] = form.down("[name=untilbank]").valueModels[0].raw.coa;
                formvalue['incoa'] = me.Filterincoa();
            }
            

            if (formvalue.allperiode == '1') {
                formvalue['fromperiode'] = '';
                formvalue['untilperiode'] = '';
            }
            
            if (formvalue.allrangeapproval == '1') {
                formvalue['rangeapproval'] = '';
                formvalue['fromrange'] = '';
                formvalue['untilrange'] = '';
                formvalue['format_fromrange'] = '';
                formvalue['format_untilrange'] = '';
            } else {
                formvalue['fromrange'] = form.down("[name=rangeapproval]").valueModels[0].raw.fromamount;
                formvalue['untilrange'] = form.down("[name=rangeapproval]").valueModels[0].raw.untilamount;
                formvalue['format_fromrange'] = form.down("[name=rangeapproval]").valueModels[0].raw.format_fromamount;
                formvalue['format_untilrange'] = form.down("[name=rangeapproval]").valueModels[0].raw.format_untilamount;
            }
            
            if(formvalue.reportfile=='R01'){
                formvalue['reportfile'] = 'ChequeclearingReceiptlist';
            }else if(formvalue.reportfile=='R02'){
                 formvalue['reportfile'] = 'BankpaymentVoucher';                 
                 if(formvalue['fromrange'].length ==0 || formvalue['untilrange'].length ==0){
                     me.buildWarningAlert('Please select range approve');                     
                     return false;
                 }                
            }else if(formvalue.reportfile=='R03'){
                 formvalue['reportfile'] = 'DetailsumCoa';    
                 formvalue['coa1'] = me.arraysetupcoa.coa1;
                 formvalue['coa2'] = me.arraysetupcoa.coa2;
                 formvalue['coa3'] = me.arraysetupcoa.coa3;
                 formvalue['coa4'] = me.arraysetupcoa.coa4;
                 formvalue['coa5'] = me.arraysetupcoa.coa5;
            }else if(formvalue.reportfile=='R04'){
                 formvalue['reportfile'] = 'Listchequegiro';
            }            
            //console.log(formvalue);
            me.setForAjax(formvalue);

        }
    },
    Filterinpt: function () {
        var me, form, formvalue, from, until, store, arraydata, indata;
        me = this;
        arraydata = [];
        form = me.getFormdata();
        formvalue = form.getForm().getValues();
        from = form.down("[name=frompt]").valueModels[0].raw;
        until = form.down("[name=untilpt]").valueModels[0].raw;
        store = form.down("[name=frompt]").getStore();
       
        if (from == until) {
            arraydata.push(form.down("[name=untilpt]").getValue());
        } else {
            store.each(function (rec)
            {
                if (rec.data.ptname >= from.ptname && rec.data.ptname <= until.ptname) {
                    arraydata.push(rec.data.pt_id);
                }
            }
            );
        }
        indata = arraydata.join(",");
        return indata;
    }, 
    cleanCoatonumber:function(coa){
        var data;
        data = coa.replace(/[\.]+/g,"");
        return data;
    },    
    Filterincoa: function () {
        var me, form, formvalue, from, until, store, arraydata, indata,
                fromcoa,untilcoa,checkcoa;
        me = this;
        arraydata = [];
        form = me.getFormdata();
        formvalue = form.getForm().getValues();
        from = form.down("[name=frombank]").valueModels[0].raw;
        until = form.down("[name=untilbank]").valueModels[0].raw;
        store = form.down("[name=frombank]").getStore();        
        fromcoa = me.cleanCoatonumber(from.coa);
        untilcoa = me.cleanCoatonumber(until.coa);
      
                
        if (fromcoa == untilcoa) {
            arraydata.push(until.coa);
        } else {
            store.each(function (rec)
            {                
               checkcoa =  me.cleanCoatonumber(rec.data.coa); 
                
               if (checkcoa >= fromcoa && checkcoa <= untilcoa) {
                  arraydata.push("'"+rec.data.coa+"'");
                }
            }
            );
        }
        indata = arraydata.join(",");
        return indata;
    },   
    createWindows: function () {
        var me = this;
        me.instantWindow('Panel', 800, 'Result ', 'state-report', me.winId, 'masterreport');
        me.generateReportParams(me.getFormdata().getForm().getFieldValues());
        me.win = desktop.getWindow(me.winId);
    },
    submitReport: function (value) {
        var me, report, html;
        me = this;
        report = 'report_checkandclearing/' + value.reportfile;
        html = me.Reportviewerjs(value, report);
        me.win.down("#MyReportPanel").body.setHTML(html);
        $("#Reportform").submit();
    },
    setForAjax: function (formvalue) {
        var me;
        me = this;
        resetTimer();
        me.senddata = formvalue;
        me.urlrequest = me.urlprocess;
        Ext.getBody().mask("Please wait...");
        me.AjaxRequest();
    },
    AjaxRequest: function () {
        var me;
        me = this;
        Ext.Ajax.request({
            url: me.urlrequest,
            method: 'POST',
             timeout:45000000,
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
        var me, value, counter;
        me = this;
        if (me.info.parameter == 'default') {
            Ext.getBody().unmask();
            value = me.info.data;
            console.log(value);
            counter = me.info.counter;
            if (counter < 1) {
                me.buildWarningAlert("No Result Data...");
            } else {
                if (value.paramjs.allperiode == '1') {
                    value['periode'] = me.dateNow.getDate() + "-" + (me.dateNow.getMonth() + 1) + "-" + me.dateNow.getFullYear() + " s/d " + me.dateNow.getDate() + "-" + (me.dateNow.getMonth() + 1) + "-" + me.dateNow.getFullYear();
                } else {
                    value['periode'] = value.paramjs.fromperiode + " s/d " + value.paramjs.untilperiode;
                }
                value['userprint'] = me.userprint;
                value['statusdata'] = value.paramjs.statusdata;
                value['chequegirostatus'] = value.paramjs.chequegirostatus;
                value['typetrans'] = value.paramjs.typetrans;
                value['from_range'] = value.paramjs.format_fromrange;
                value['until_range'] = value.paramjs.format_untilrange;
                value["printdate"] = me.dateNow.getDate() + "-" + (me.dateNow.getMonth() + 1) + "-" + me.dateNow.getFullYear();
                value["timeprint"] = me.dateNow.getHours() + ":" + me.dateNow.getMinutes() + ":" + me.dateNow.getSeconds();
                me.createWindows();
                me.submitReport(value);
            }
        }
    },
});