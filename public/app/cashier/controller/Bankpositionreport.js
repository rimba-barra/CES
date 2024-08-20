Ext.define('Cashier.controller.Bankpositionreport', {
    extend: 'Cashier.library.template.controller.Controllermodule',
    alias: 'controller.Bankpositionreport',
    requires: [
        'Cashier.template.ComboBoxFields',
        'Cashier.library.template.combobox.Ptusercombobox',
        'Cashier.library.template.combobox.Groupcombobox',
        'Cashier.library.template.combobox.Departmentcombobox',
        'Cashier.library.template.combobox.Voucherprefixbankcombobox'
    ],
    views: [
        'bankpositionreport.Panel',
        'bankpositionreport.FormData',
        'bankpositionreport.FormContent',
        'bankpositionreport.Gridprefix',
    ],
    stores: [
        'Ptbyuser',
        'Grouptransaction',
        'Voucherprefixsetup',
        'Statuscombo',
        'Voucherprefixsetupcombo',
        'Paymentvia',
        'Projectptall',
        'Bank'
    ],
    models: [
        'Voucherprefixsetup'
    ],
    refs: [
        {
            ref: 'formdata',
            selector: 'bankpositionreportformdata'
        },
        {
            ref: 'formcontent',
            selector: 'bankpositionreportformcontent'
        },
        {
            ref: 'gridprefix',
            selector: 'bankpositionreportgridprefix'
        },
        {
            ref: 'paneldata',
            selector: 'bankpositionreportpanel'
        }
    ],
    controllerName: 'bankpositionreport',
    fieldName: '',
    bindPrefixName: 'Bankpositionreport',
    urlprocess: 'cashier/bankpositionreport/create',
    stimulsoft: "resources/stimulsoft/index.php?stimulsoft_client_key=ViewerFx&stimulsoft_report_key=",
    yeardata: null, paramsStr: null, win: null, params: null, dateNow: new Date(), html: null, winId: 'myReportWindow',
    project_id: 0, project_name: null, pt_id: 0, pt_name: null, userprint: null, urlrequest: null, senddata: null, info: null,
    form: null, cluster: null,
    value: null,
    preparedvalues: [],
    statusdetail: null, statusdetaildesc: null, periode: null, filtercoa: null,
    fromcoa: null, untilcoa: null, fromdate: null, untildate: null,
    dataprefix: null,
    checkedfilterbank: false,
    init: function (application) {
        var me = this;
        this.control({
            'bankpositionreportpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: function (panel) {
                    me.windowsHeight(me.bindPrefixName, 450);
                    me.windowsWidht(me.bindPrefixName, 670);
                    me.panelAfterRender();
                }
            },
            'bankpositionreportformdata': {
                afterrender: function (panel) {
                    this.formDataAfterRenderCustome();
                },
                boxready: function () {
                    this.formDataReady();
                }
            },
            'bankpositionreportformdata [name=allcompany]': {
                change: function (the, newValue, oldValue, eOpts) {
                    me.fromuntilcompany(newValue);
                    if (newValue == true) {
                        me.filterbyCompanyforBank();
                    }
                }
            },
            'bankpositionreportformdata [name=frompt]': {
                select: function (the, newValue, oldValue, eOpts) {
                    var  me = this;
                    var form = me.getFormdata();
                    form.down("[name=untilpt]").setValue(newValue[0].data.pt_id);
                }
            },
            'bankpositionreportformdata [name=allbank]': {
                change: function (the, newValue, oldValue, eOpts) {
                    me.fromuntilbank(newValue);
                },
            },
            'bankpositionreportformdata [name=frombank]': {
                change: function(me, newValue, oldValue, eOpts) {
                    me.store.getProxy().setExtraParam('term', newValue);
                    me.store.load();
                }
            },
            'bankpositionreportformdata [name=untilbank]': {
                change: function(me, newValue, oldValue, eOpts) {
                    me.store.getProxy().setExtraParam('term', newValue);
                    me.store.load();
                }
            },
            'bankpositionreportformdata [name=allgroup]': {
                change: function (the, newValue, oldValue, eOpts) {
                    me.rangefromuntilgroup(newValue);
                },
            },
            'bankpositionreportformdata [name=filterprefix]': {
                change: function () {
                    var me, form, filterprefix;
                    me = this;
                    form = me.getFormdata();
                    filterprefix = me.getVal(form, 'filterprefix', 'value');
                    if (filterprefix == true) {
                        me.hideBtn(form, 'prefix', false);
                    } else {
                        me.hideBtn(form, 'prefix', true);
                    }

                }
            },
            'bankpositionreportformdata button[action=prefix]': {
                click: function () {
                    var me, form, filterprefix;
                    me = this;
                    form = me.getFormdata();
                    filterprefix = me.getVal(form, 'filterprefix', 'value');
                    if (filterprefix == true) {
                        me.paramcontent.stateform = 'filter';
                        me.GenerateFormdata(me.paramcontent);
                    }
                }
            },
            'bankpositionreportformdata button[action=submit]': {
                click: function () {
                    this.showReport();
                }
            },
            'bankpositionreportformcontent button[action=close]': {
                click: function () {
                    this.getdataGridprefix();
                }
            },
            'bankpositionreportformdata [name=untilpt]': {
                change: function (field, eOpts) {
                    var me, form, allcompany;
                    me = this;
                    form = me.getFormdata();
                    allcompany = me.getVal(form, 'allcompany', 'value');
                    if (allcompany == false) {
                        me.filterbyCompanyforBank();
                        me.setStorePrefix();
                    }
                },
            },
            'bankpositionreportgridprefix': {
                afterrender: function () {
                    this.Gridfilterprefix();
                    this.filterbyCompany();
                    this.filterbyAccountBank();
                },
                boxready: function () {
                    this.filterbyCompany();
                    this.filterbyAccountBank();
                }
            },
            'bankpositionreportformdata [name=filterbank]': {
                change: function (el) {
                    me.checkedfilterbank = el.value;
                    console.log(el.value);
                }
            },
            
        });
    },
    paramcontent: {
        //start formgeneate
        fromlocation: 'Cashier.view.bankpositionreport.FormContent',
        formtitle: 'Grid Filter Prefix', formicon: 'icon-form-add',
        formid: 'win-bankpositionreportformcontent', formlayout: 'fit',
        formshadow: 'frame', formmask: 'Loading...',
        formwidth: 600, formtimeout: 0,
        stateform: null, formaction: null, formproperties: null, formwindows: null,
        //end formgeneate     
    },
    filterPrefixCombobox: function(me) {
        
    },
    panelAfterRender: function () {
        var me = this;
        var form = me.getFormdata();
        form.down("[name=allcompany]").setValue(0);
        form.down("[name=frompt]").setValue(parseInt(apps.pt));
        form.down("[name=untilpt]").setValue(parseInt(apps.pt));
        Ext.Ajax.request({
            url: 'cashier/bankpositionreport/read',
            success: function (response) {
                var info = Ext.JSON.decode(response.responseText);
                me.project_id = info.project_id;
                me.project_name = info.project_name;
                me.pt_id = info.pt_id;
                me.pt_name = info.pt_name;
                me.userprint = info.userprint;
                form.down("[name=frompt]").setValue(parseInt(apps.pt));
                form.down("[name=untilpt]").setValue(parseInt(apps.pt));
            },
        });
    },
    formDataAfterRenderCustome: function () {
        var me, storecoa, form = '';
        me = this;
        form = me.getFormdata();
        me.setStoreFormdata();
        me.setVal(form, 'fromperiode', me.dateNow);
        me.setVal(form, 'untilperiode', me.dateNow);
        me.fromuntilcompany(false);
        me.fromuntilbank(true);
        me.rangefromuntilgroup(true);
        me.hideBtn(form, 'prefix', true);
    },
    formDataReady: function () {
        var me, form, storebank = '';
        me = this;
        form = me.getFormdata();
        storebank = form.down('[name=frombank]').getStore();
        me.filterStatusbank(storebank);
        //me.setStorePrefix();
    },
    Gridfilterprefix: function () {
        var me, grid, store;
        me = this;
        grid = me.getGridprefix();
        store = grid.getStore();
        store.load();
    },
    filterStatusbank: function (store) {
        var me, form;
        me = this;
        store.clearFilter(true);
        store.filter('project_id', me.project_id);
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
                me.filterStatusbank(store);

            }
        });
    },
    filterbyCompany: function () {
        var me, grid, store, form, counter;
        me = this;
        grid = me.getGridprefix();
        store = grid.getStore();
        form = me.getFormdata();
        store.reload({
            params: {
                "hideparam": 'filterprefixbypt',
                "fromprojectpt": me.getVal(form, 'frompt', 'raw'),
                "untilprojectpt": me.getVal(form, 'untilpt', 'raw'),
                "start": 0,
                "limit": 1000,
            },
            callback: function (records, operation, success) {

            }
        });
    },
    filterbyAccountBank: function () {
        var me, grid, store, form, counter;
        me = this;
        grid = me.getGridprefix();
        store = grid.getStore();
        form = me.getFormdata();
        store.reload({
            params: {
                "hideparam": 'filterprefixbybank',
                "fromprojectpt": me.getVal(form, 'frompt', 'raw'),
                "untilprojectpt": me.getVal(form, 'untilpt', 'raw'),
                "frombank": me.getVal(form, 'frombank', 'raw'),
                "untilbank": me.getVal(form, 'untilbank', 'raw'),
                "start": 0,
                "limit": 1000,
            },
            callback: function (records, operation, success) {
                me.filterStatusbank(store);
            }
        });
    },
    getdataGridprefix: function () {
        var me, grid, store, form, counter, arrayprefix, rows, rowdata;
        me = this;
        grid = me.getGridprefix();
        store = grid.getStore();
        rows = grid.getSelectionModel().getSelection();
        arrayprefix = [];
        for (var i = 0; i < rows.length; i++) {
            rowdata = rows[i]['data'];
            arrayprefix.push(rowdata.voucherprefix_id);
        }
        me.dataprefix = arrayprefix.join(",");
    },
    showReport: function () {
        var me;
        me = this;
        me.form = me.getFormdata().getForm();
        me.setupData();
    },
    setupData: function () {
        var me, form, formvalue, detailcoa,
                fromcoa, untilcoa, frompt, untilpt, fromdepartment
                , untildepartment, groupby, returndata, detailaccount;
        me = this;
        form = me.getFormdata();
        formvalue = form.getForm().getValues();
        if (form.getForm().isValid()) {
            if (formvalue.allcompany == '1') {
                formvalue['fromproject'] = '';
                formvalue['untilproject'] = '';
                formvalue['frompt'] = '';
                formvalue['untilpt'] = '';
                formvalue['filterptid'] = 0;
            
            } else {
                formvalue['fromproject'] = form.down("[name=frompt]").valueModels[0].raw.project_id;
                formvalue['untilproject'] = form.down("[name=untilpt]").valueModels[0].raw.project_id;
                formvalue['frompt'] = form.down("[name=frompt]").valueModels[0].raw.pt_id;
                formvalue['untilpt'] = form.down("[name=untilpt]").valueModels[0].raw.pt_id;
                formvalue['pt_name'] = form.down("[name=untilpt]").valueModels[0].raw.ptname;
                formvalue['filterptid'] = me.Filterinpt();
               
            }

            if (formvalue.allbank == '1') {
                formvalue['frombank'] = '';
                formvalue['untilbank'] = '';
                formvalue['filterbank'] = 0;
                formvalue['fromcoa'] = '';
                formvalue['untilcoa'] = '';
            } else {
                formvalue['frombank'] = form.down("[name=frombank]").valueModels[0].raw.prefix;
                formvalue['untilbank'] = form.down("[name=untilbank]").valueModels[0].raw.prefix;
                formvalue['fromprefix_id'] = form.down("[name=frombank]").valueModels[0].raw.prefix_id;
                formvalue['untilprefix_id'] = form.down("[name=untilbank]").valueModels[0].raw.prefix_id;
                formvalue['filterbank'] = me.Filterinbank();
                formvalue['fromcoa'] = form.down("[name=frombank]").valueModels[0].raw.coa;
                formvalue['untilcoa'] = form.down("[name=untilbank]").valueModels[0].raw.coa;
            }

            if (formvalue.allgroup == '1') {
                formvalue['fromgrouptrans'] = '';
                formvalue['untilgrouptrans'] = '';
                formvalue['filtergrouptrans'] = 0;
            } else {
                formvalue['fromgrouptrans'] = form.down("[name=fromgrouptrans]").valueModels[0].raw.code;
                formvalue['untilgrouptrans'] = form.down("[name=untilgrouptrans]").valueModels[0].raw.code;
                formvalue['filtergrouptrans'] = me.Filteringroup();
            }

            if (formvalue.filterprefix == '0') {
                formvalue['dataprefix'] = '';
            } else {
                formvalue['dataprefix'] = me.dataprefix;
            }
            formvalue['reportfile'] = me.reportType();
            formvalue['project_name'] = form.down("[name=frompt]").valueModels[0].raw.projectname;

            formvalue["report_alias"] = 'BANKPOSRPT_'+form.down("[name=untilpt]").valueModels[0].raw.ptname;
            
            if(form.down("[name=detailaccount]").getValue() == true){
                 formvalue["detailaccount"] = 1;
            }else{
                formvalue["detailaccount"] = 0;
            }
            if (me.checkedfilterbank) {
                formvalue['checkedfilterbank'] = 1;
            }else{
                formvalue['checkedfilterbank'] = 0;
            }

            me.preparedvalues = formvalue;
            me.setForAjax(formvalue);
        }
    },
    reportType: function () {
        var me, form, formvalue, detailaccount, reportfile;
        me = this;
        form = me.getFormdata();
        formvalue = form.getForm().getValues();
        detailaccount = formvalue.detailaccount;
        if (detailaccount == 'yes') {
            //reportfile = 'Bankpositionreportwithdetailaccount';
            reportfile = 'Bankpositionreportb';
        } else {
            //reportfile = 'Bankpositionreport';
            reportfile = 'Bankpositionreportb';
        }
        return reportfile;
    },
    Filterinpt: function () {
        var me, form, formvalue, frompt, untilpt, store, arraydata, inpt;
        me = this;
        arraydata = [];
        form = me.getFormdata();
        formvalue = form.getForm().getValues();
        frompt = form.down("[name=frompt]").valueModels[0].raw;
        untilpt = form.down("[name=untilpt]").valueModels[0].raw;
        if (frompt == untilpt) {
            arraydata.push(form.down("[name=untilpt]").getValue());
        } else {
            store = form.down("[name=frompt]").getStore();
            store.each(function (rec)
            {
                if (untilpt.code === rec.data.code) {
                    arraydata.push(rec.data.pt_id);
                    return false;
                } else {
                    arraydata.push(rec.data.pt_id);
                }
            }
            );
        }
        inpt = arraydata.join(",");
        return inpt;
    },
    Filterinbank: function () {
        var me, form, formvalue, frombank, untilbank, store, arraydata, inbank;
        me = this;
        arraydata = [];
        form = me.getFormdata();
        formvalue = form.getForm().getValues();
        frombank = form.down("[name=frombank]").valueModels[0].raw;
        untilbank = form.down("[name=untilbank]").valueModels[0].raw;
        store = form.down("[name=frombank]").getStore();
        if (frombank == untilbank) {
            arraydata.push(form.down("[name=untilbank]").getValue());
        } else {
            store.each(function (rec)
            {
                if (untilbank.prefix === rec.data.prefix) {
                    arraydata.push(rec.data.prefix_id);
                    return false;
                } else {
                    arraydata.push(rec.data.prefix_id);
                }
            }
            );
        }
        inbank = arraydata.join(",");
        return inbank;
    },
    Filteringroup: function () {
        var me, form, formvalue, from, until, store, arraydata, indata;
        me = this;
        arraydata = [];
        form = me.getFormdata();
        formvalue = form.getForm().getValues();
        from = form.down("[name=fromgrouptrans]").valueModels[0].raw;
        until = form.down("[name=untilgrouptrans]").valueModels[0].raw;
        store = form.down("[name=fromgrouptrans]").getStore();
        if (from == until) {
            arraydata.push(form.down("[name=untilgrouptrans]").getValue());
        } else {
            store.each(function (rec)
            {
                if (until.grouptrans_id === rec.data.grouptrans_id) {
                    arraydata.push(rec.data.grouptrans_id);
                    return false;
                } else {
                    arraydata.push(rec.data.grouptrans_id);
                }
            }
            );
        }

        indata = arraydata.join(",");
        return indata;
    },
    setForAjax: function (formvalue) {
        var me;
        me = this;
        resetTimer();
        Ext.getBody().mask("Please wait...");
        me.senddata = formvalue;
        me.urlrequest = me.urlprocess;
        Ext.getBody().mask("Please wait...");
        me.AjaxRequest();
    },
    createWindows: function () {
        var me = this;
        var title = me.getFormdata().up('window').title;
        me.winId = me.controllerName + '_' + Ext.Date.format(new Date(), 'His');
        me.instantWindowWithMinimize('Panel', 800, title, 'state-report', me.winId, me.controllerName);
        me.generateReportParams(me.getFormdata().getForm().getFieldValues());
        me.win = desktop.getWindow(me.winId);
    },
    submitReport: function (value) {
        var me, report, html;
        me = this;
        console.log("ini ji");
        console.log(value);
        if (me.checkedfilterbank) {
            report = 'report_position/' + 'Kasbankpositionreportbankname';
        }else{
            report = 'report_position/' + 'Kasbankpositionreport';
        }
        html = me.ReportviewerV4(value, report, me.win.id, 1); //whole report
        me.win.down("#MyReportPanel_" + me.win.id).body.setHTML(html);
        $("#Reportform_" + me.win.id).submit();
    },
    AjaxRequest: function () {
        var me;
        me = this;
        Ext.Ajax.request({
            url: me.urlrequest,
            method: 'POST',
            timeout: 45000000,
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
    setStorePrefix: function () {
        var me, store, form, in_out;
        me = this;
        form = me.getFormdata();
        store = me.getStore("Voucherprefixsetupcombo");
        
        cekpt = form.down("[name=frompt]").getValue();
        
        if( cekpt !== '' ){
            frompt = form.down("[name=frompt]").valueModels[0].raw.pt_id;
            fromproject = form.down("[name=frompt]").valueModels[0].raw.project_id;
        }else{
            frompt = apps.pt;
            fromproject = apps.project;
        }

        store.getProxy().setExtraParam('pt_pt_id', frompt);
        store.getProxy().setExtraParam('project_project_id', fromproject);
        store.getProxy().setExtraParam('kasbank', 'B');
        store.getProxy().setExtraParam('user_id', apps.uid);
        store.getProxy().setExtraParam('hideparam', 'getvoucherprefixsetupv2bankgroupbyprefix');
        form.setLoading('Loading prefix');
        store.loadData([], false);
        store.reload({
            callback: function (records, operation, success) {
                form.setLoading(false); 
           }
        });
    },
    setSuccessEvent: function () {
        var counter, me, value;
        me = this;

        if (me.info.parameter == 'default') {
            Ext.getBody().unmask();
            value = me.info.data;

            counter = me.info.counter;
            if (counter < 1) {
                me.buildWarningAlert("No Result Data...");
            } else {
                value = me.preparedvalues;
                value['periode'] = value.fromperiode + " s/d " + value.untilperiode;
                value['tanggal'] = value.fromperiode + " s/d " + value.untilperiode;
                value['type'] = 'BANK';
                value['tahun'] = Ext.Date.format(new Date(), 'Y');
                //value['qhead'] = value.qdata.qhead;
                //value['qcontent'] = value.qdata.qcontent;
                //value['detailaccount'] = value.detailaccount;
                value['reportfile'] = me.reportType();
                value['userprint'] = apps.username;
                value["tgl_sekarang"] = Ext.Date.format(new Date(), 'd/m/Y');
                value["time_sekarang"] = Ext.Date.format(new Date(), 'H:i:s');
                me.createWindows();
                me.submitReport(value);
            }
        }
    },
});