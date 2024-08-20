Ext.define('Cashier.controller.Cashpositionreportb', {
    extend: 'Cashier.library.template.controller.Controllermodule',
    alias: 'controller.Cashpositionreportb',
    requires: [
        'Cashier.template.ComboBoxFields',
        'Cashier.library.template.combobox.Ptusercombobox',
        'Cashier.library.template.combobox.Groupcombobox',
        'Cashier.library.template.combobox.Departmentcombobox',
        'Cashier.library.template.combobox.Voucherprefixcashcombobox'
    ],
    views: [
        'cashpositionreportb.Panel',
        'cashpositionreportb.FormData'
    ],
    stores: [
        'Ptbyuser',
        'Grouptransaction',
        'Voucherprefixsetup',
        'Grouptransaction',
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
            selector: 'cashpositionreportbformdata'
        },
        {
            ref: 'paneldata',
            selector: 'cashpositionreportbpanel'
        }
    ],
    controllerName: 'cashpositionreportb',
    fieldName: '',
    bindPrefixName: 'Cashpositionreportb',
    urlprocess: 'cashier/cashpositionreportb/create',
    stimulsoft: "resources/stimulsoft/index.php?stimulsoft_client_key=ViewerFx&stimulsoft_report_key=",
    yeardata: null, paramsStr: null, win: null, params: null, dateNow: new Date(), html: null, winId: 'myReportWindow',
    project_name: null, pt_name: null, userprint: null, urlrequest: null, senddata: null, info: null, form: null, cluster: null,
    value: null,
    statusdetail: null, statusdetaildesc: null, periode: null, filtercoa: null,
    fromcoa: null, untilcoa: null, fromdate: null, untildate: null, prefixid :0,
    init: function (application) {
        var me = this;
        this.control({
            'cashpositionreportbpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: function (panel) {
                    me.windowsHeight(me.bindPrefixName, 600);
                    me.windowsWidht(me.bindPrefixName, 745);
                    me.panelAfterRender();
                }
            },
            'cashpositionreportbformdata': {
                afterrender: function (panel) {
                    this.formDataAfterRender();
                },
                boxready: function () {
                    this.formdataReady();
                }
            },
            'cashpositionreportbformdata [name=allcompany]': {
                change: function (the, newValue, oldValue, eOpts) {
                    me.fromuntilcompany(newValue);
                    if (newValue == true) {
                        me.filterbyCompany();
                    }
                },
            },
            'cashpositionreportbformdata [name=untilpt]': {
                change: function (field, eOpts) {
                    var me, form, allcompany;
                    me = this;
                    form = me.getFormdata();
                    allcompany = me.getVal(form, 'allcompany', 'value');
                    if (allcompany == false) {
                        me.filterbyCompany();
                    }
                },
            },
            'cashpositionreportbformdata [name=allgroup]': {
                change: function (the, newValue, oldValue, eOpts) {
                    me.fromuntilgroup(newValue);

                },
            },
            'cashpositionreportbformdata [name=optionformat]': {
                change: function (the, newValue, oldValue, eOpts) {
                    var me, form, value;
                    me = this;
                    form = me.getFormdata();
                    value = me.getValRadio(form, 'optionformat');
                    if (value !== undefined) {
                        if (value != 'detailcash') {
                            me.Fdisable(form, 'showdetalloan', true);
                            me.setVal(form, 'showdetalloan', false);
                        } else {
                            me.Fdisable(form, 'showdetalloan', false);
                            me.setVal(form, 'showdetalloan', true);
                        }

                        if (value == 'summary') {
                            form.down("[id=beginningbalanceoptions]").setVisible(true);
                        } else {
                            form.down("[id=beginningbalanceoptions]").setVisible(false);
                        }
                    }
                },
            },
            'cashpositionreportbformdata button[action=submit]': {
                click: function () {
                    this.showReport();
                }
            },
            'cashpositionreportbformdata [name=frompt]': {
                change: function () {
                    var me =this;
                    var form = me.getFormdata();
                    var frompt = form.down("[name=frompt]").valueModels[0].raw.pt_id;
                    var untilpt = form.down("[name=untilpt]").setValue(frompt);
                },
            }
             
        });
    },
    panelAfterRender: function () {
        var me = this;
        var form = me.getFormdata();
        form.down("[name=allcompany]").setValue(0);
        form.down("[name=frompt]").setValue(parseInt(apps.pt));
        form.down("[name=untilpt]").setValue(parseInt(apps.pt));
        Ext.Ajax.request({
            url: 'cashier/cashpositionreportb/read',
            success: function (response) {
                var info = Ext.JSON.decode(response.responseText);
                me.project_name = info.project_name;
                me.pt_name = info.pt_name;
                me.userprint = info.userprint;
                form.down("[name=frompt]").setValue(parseInt(apps.pt));
                form.down("[name=untilpt]").setValue(parseInt(apps.pt));
                // me.filterbyCompany()
            },
        });
    },
    formDataAfterRender: function () {
        var me, storecoa, form = '';
        me = this;
        form = me.getFormdata();
        me.setStoreFormdata();
        me.fromuntilcompany(false);
        me.fromuntilgroup(true);
        me.setVal(form, 'fromperiode', me.dateNow);
        me.setVal(form, 'untilperiode', me.dateNow);

        var formvalue = [];
        formvalue['from_project_id'] = parseInt(apps.project);
        formvalue['until_project_id'] = parseInt(apps.project);
        formvalue['from_pt_id'] = parseInt(apps.pt);
        formvalue['until_pt_id'] = parseInt(apps.pt);

        storeprefix = form.down('[name=prefixcash]').getStore();
        storeprefix.reload({
            params: {
                "hideparam": 'filterprefixbyptkas',
                "user_id": apps.uid,
                "from_project_id": formvalue['from_project_id'],
                "until_project_id": formvalue['until_project_id'],
                "from_pt_id": formvalue['from_pt_id'],
                "until_pt_id": formvalue['until_pt_id'],
                "start": 0,
                "limit": 1000,
            },
        });

        form.down("[id=beginningbalanceoptions]").setVisible(false);
    },
    formdataReady: function () {
        var me, form, storeprefix;
        me = this;
        form = me.getFormdata();
    },
    filterStatusCash: function (store) {
        var me, form, firstrecord;
        me = this;
        store.clearFilter(true);
        store.filter('cash_bank', 'K');
        store.filter('in_out', 'I');
        me.getFirstdataprefix();
    },
    getFirstdataprefix: function () {
        var me, form, store, index, row;
        me = this;
        form = me.getFormdata();
        store = form.down('[name=prefixcash]').getStore();
        index = 0;
        store.each(function (record) {
            if (index == 0) {
                row = record.data;
                me.setValCombo(form, 'prefixcash', row.voucherprefix_id, row.coaname);
                return false;
            }
            index++;
        });
    },
    filterbyCompany: function () {
        var me, form, combobox, store;
        me = this;
        form = me.getFormdata();
        combobox = form.down('[name=prefixcash]');

        //
        var formvalue = [];
        formvalue['from_project_id'] = form.down("[name=frompt]").valueModels[0].raw.project_id;
        formvalue['until_project_id'] = form.down("[name=untilpt]").valueModels[0].raw.project_id;
        formvalue['from_pt_id'] = form.down("[name=frompt]").valueModels[0].raw.pt_id;
        formvalue['until_pt_id'] = form.down("[name=untilpt]").valueModels[0].raw.pt_id;

        store = combobox.getStore();
        store.reload({
            params: {
                "hideparam": 'filterprefixbyptkas',
                "fromprojectpt": me.getVal(form, 'frompt', 'raw'),
                "untilprojectpt": me.getVal(form, 'untilpt', 'raw'),
                "from_project_id": formvalue['from_project_id'],
                "until_project_id": formvalue['until_project_id'],
                "from_pt_id": formvalue['from_pt_id'],
                "until_pt_id": formvalue['until_pt_id'],
                "user_id": apps.uid,
                "start": 0,
                "limit": 1000,
            },
            callback: function (records, operation, success) {
                //me.filterStatusCash(store);
            }
        });
        me.setValCombo(form, 'prefixcash', '', '');
    },
    showReport: function () {
        var me;
        me = this;
        me.form = me.getFormdata().getForm();
        me.setupData();
    },
    setStorePrefix: function () {
        var me, store, form, in_out;
        me = this;
        form = me.getFormdata();
        store = me.getStore("Voucherprefixsetupcombo");
        store.getProxy().setExtraParam('pt_pt_id', apps.pt);
        store.getProxy().setExtraParam('kasbank', 'K');
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
    setupData: function () {
        var me, form, formvalue, detailcoa,
                fromcoa, untilcoa, frompt, untilpt, fromdepartment
                , untildepartment, groupby, returndata, detailaccount;
        me = this;
        form = me.getFormdata();
        formvalue = form.getForm().getValues();
        if (form.getForm().isValid()) {

            formvalue['type'] = 'CASH';

            if (formvalue.allcompany == '1') {
                formvalue['fromproject'] = '';
                formvalue['untilproject'] = '';
                formvalue['frompt'] = '';
                formvalue['untilpt'] = '';
                formvalue['in_pt'] = '';
            } else {
                formvalue['fromproject'] = form.down("[name=frompt]").valueModels[0].raw.project_id;
                formvalue['untilproject'] = form.down("[name=untilpt]").valueModels[0].raw.project_id;
                formvalue['frompt'] = form.down("[name=frompt]").valueModels[0].raw.pt_id;
                formvalue['untilpt'] = form.down("[name=untilpt]").valueModels[0].raw.pt_id;
                formvalue['pt_name'] = form.down("[name=untilpt]").valueModels[0].raw.ptname;
                formvalue['project_name'] = form.down("[name=untilpt]").valueModels[0].raw.projectname;
                formvalue['projectpt_name'] = formvalue['project_name'] +' - '+ formvalue['pt_name'];
                formvalue['frombank'] = form.down("[name=prefixcash]").valueModels[0].raw.prefix; // prefixcash
                formvalue['untilbank'] = form.down("[name=prefixcash]").valueModels[0].raw.prefix;
                formvalue['fromprefix_id'] = form.down("[name=prefixcash]").valueModels[0].raw.prefix_id;
                formvalue['untilprefix_id'] = form.down("[name=prefixcash]").valueModels[0].raw.prefix_id;
                formvalue['in_pt'] = me.Filterinpt();
            }

            if (formvalue.allgroup == '1') {
                formvalue['grouptrans_id'] = 0;
            } else {
                formvalue['grouptrans_id'] = 0;
                me.getVal(form, 'grouptrans_id', 'value');
            }

            if (formvalue.prefixcash == undefined || formvalue.prefixcash == '') {
                formvalue['voucherprefix_id'] = 0;
                formvalue['in_coa'] = me.Filterinprefixcoa();
            } else {
                formvalue['voucherprefix_id'] = me.getVal(form, 'prefixcash', 'value');
                formvalue['in_coa'] = me.Filterinprefixcoa();
            }
            me.setForAjax(formvalue);
        }
    },
    Filterinprefixcoa: function () {
        var me, form, formvalue, data, store, arraydata, indata, coa, prefixcash;
        me = this;
        arraydata = [];
        form = me.getFormdata();
        formvalue = form.getForm().getValues();
        store = form.down("[name=prefixcash]").getStore();
        prefixcash = form.down("[name=prefixcash]").valueModels[0].raw;
        if (store.getCount() > 0) {
            store.each(function (rec)
            {
                if (prefixcash.coa == rec.data.coa) {
                    arraydata.push("'" + rec.data.coa + "'");
                    return false;
                }

            }
            );
        }
        indata = arraydata.join(",");
        return indata;
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
        me.winId = me.controllerName + '_' + Ext.Date.format(new Date(), 'His');
        var title = 'Result ' + me.getFormdata().up('window').title;
        me.instantWindowWithMinimize('Panel', 800, title, 'state-report', me.winId, me.controllerName);
        me.generateReportParams(me.getFormdata().getForm().getFieldValues());
        me.win = desktop.getWindow(me.winId);
    },
    submitReport: function (value) {
        var me, report, html;
        me = this;
        if (value.optionformat == 'summary'){
        	report = 'report_position/' + 'Cashpositionsummary';
        }else{
        	 report = 'report_position/' + 'Kasbankpositionreport_ab';
        }
        //report = 'report_position/' + 'Kasbankpositionreport_ab';
        var html = me.ReportviewerV4(value, report, me.win.id, 1); //whole report
        me.win.down("#MyReportPanel_" + me.win.id).body.setHTML(html);
        $("#Reportform_" + me.win.id).submit();
    },
    submitReportOld: function (value) {
        var me, report, html, type;
        me = this;
        if (value.optionformat == 'detailcash') {
            type = 'Cashpositiondetailcash';
        } else if (value.optionformat == 'summary') {
            type = 'Cashpositionsummary';
        } else {
            type = 'Cashpositionsummaryall';
        }
        value['reportfile'] = type;
        report = 'report_cashpostion2/' + type;
        html = me.ReportviewerV3(value, report);
        me.win.down("#MyReportPanel").body.setHTML(html);
        $("#Reportform").submit();
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
    setSuccessEvent: function () {
        var me, form, result, qdata,dy;
        me = this;
        form = me.getFormdata();
        Ext.getBody().unmask();
        result = me.info.data;
        qdata = me.info.data.q;
        result['qhead'] = qdata.qhead;
        result['q1'] = qdata.qhead;
        result['q1sum'] = qdata.qhead;
        result['qheadsum'] = qdata.qhead_sum;
        result['qkasbankdetail'] = qdata.qkasbankdetail;
        result['qkasbon'] = qdata.qkasbon;
        result['q2'] = qdata.qkasbankdetail;
        result['q3'] = qdata.qkasbon;
        result['q4'] = qdata.qkasbonproject;
        result['q5'] = qdata.qkasbonproject;
        result['q6'] = qdata.qkasbonprojectgrouping;
        result['date'] = result.fromperiode + " s/d " + result.untilperiode;
        result['userprint'] = apps.username;
        result["tgl_sekarang"] = Ext.Date.format(new Date(), 'd/m/Y');
        result["time_sekarang"] = Ext.Date.format(new Date(), 'H:i:s');
        dy = new Date(result.fromperiode);
        result['tahun'] = dy.getFullYear();
        if (me.info.counter < 1) {
            me.buildWarningAlert("No Result Data...");
        } else {
            me.createWindows();
            me.submitReport(result);
        }

    },
});