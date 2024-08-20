Ext.define('Cashier.controller.Cashpositionreporta', {
    extend: 'Cashier.library.template.controller.Controllermodule',
    alias: 'controller.Cashpositionreporta',
    requires: [
        'Cashier.template.ComboBoxFields',
        'Cashier.library.template.combobox.Ptusercombobox',
        'Cashier.library.template.combobox.Voucherprefixcashcombobox',
    ],
    views: [
        'cashpositionreporta.Panel',
        'cashpositionreporta.FormData'
    ],
    stores: [
        'Ptbyuser',
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
            selector: 'cashpositionreportaformdata'
        },
        {
            ref: 'paneldata',
            selector: 'cashpositionreportapanel'
        }
    ],
    controllerName: 'cashpositionreporta',
    fieldName: '',
    bindPrefixName: 'Cashpositionreporta',
    urlprocess: 'cashier/cashpositionreporta/create',
    stimulsoft: "resources/stimulsoft/index.php?stimulsoft_client_key=ViewerFx&stimulsoft_report_key=",
    yeardata: null, paramsStr: null, win: null, params: null, dateNow: new Date(), html: null, winId: 'myReportWindow',
    project_name: null, pt_name: null, userprint: null, urlrequest: null, senddata: null, info: null, form: null, cluster: null,
    value: null, project_id: 0,
    statusdetail: null, statusdetaildesc: null, periode: null, filtercoa: null,
    fromcoa: null, untilcoa: null, fromdate: null, untildate: null,
    reparedvalues: [],
    init: function (application) {
        var me = this;
        this.control({
            'cashpositionreportapanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: function () {
                    me.windowsHeight(me.bindPrefixName, 400);
                    me.windowsWidht(me.bindPrefixName, 660);
                    me.panelAfterRender();
                }
            },
            'cashpositionreportaformdata': {
                afterrender: this.formDataAfterRender,
                boxready: this.formdataReady,
            },
            'cashpositionreportaformdata [name=allcompany]': {
                change: function (the, newValue, oldValue, eOpts) {
                    me.fromuntilcompany(newValue);
                    if (newValue == true) {
                        me.filterbyCompany();
                    }
                },
            },
            'cashpositionreportaformdata [name=untilpt]': {
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
            'cashpositionreportaformdata button[action=submit]': {
                click: function () {
                    this.showReport();
                }
            },
            'cashpositionreportaformdata [name=frompt]': {
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
            url: 'cashier/cashpositionreporta/read',
            success: function (response) {
                var info = Ext.JSON.decode(response.responseText);
                me.project_name = info.project_name;
                me.project_id = info.project_id;
                me.pt_name = info.pt_name;
                me.userprint = info.userprint;
                form.down("[name=frompt]").setValue(parseInt(apps.pt));
                form.down("[name=untilpt]").setValue(parseInt(apps.pt));
            },
        });
    },
    setStorePrefix: function () {
        var me, store, form, in_out;
        me = this;
        form = me.getFormdata();
        store = me.getStore("Voucherprefixsetupcombo");
        store.getProxy().setExtraParam('pt_pt_id', apps.pt);
        store.getProxy().setExtraParam('kasbank', 'K');
        store.getProxy().setExtraParam('hideparam', 'getvoucherprefixsetupv2bankgroupbyprefix');
        form.setLoading('Loading prefix');
        store.loadData([], false);
        store.reload({
            callback: function (records, operation, success) {
                form.setLoading(false);
            }
        });
    },
    formDataAfterRender: function () {
        var me, form;
        me = this;
        form = me.getFormdata();
        me.setStoreFormdata();
        me.fromuntilcompany(false);
        me.setVal(form, 'fromperiode', me.dateNow);
        me.setVal(form, 'untilperiode', me.dateNow);
        storeprefix = form.down('[name=prefixcash]').getStore();

        var formvalue = [];
        formvalue['from_project_id'] = parseInt(apps.project);
        formvalue['until_project_id'] = parseInt(apps.project);
        formvalue['from_pt_id'] = parseInt(apps.pt);
        formvalue['until_pt_id'] = parseInt(apps.pt);

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
            }
        });

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
        store.filter('project_id', me.project_id);
        store.filter('cash_bank', 'K');
        store.filter('in_out', 'I');
        //me.getFirstdataprefix();
    },
    getFirstdataprefix: function () {
        var me, form, store, firstdata, row;
        me = this;
        form = me.getFormdata();
        store = form.down('[name=prefixcash]').getStore();

        if (store.first() !== undefined) {
            firstdata = store.first().data;
            me.setVal(form, 'prefixcash', firstdata.coa);
        } else {
            store.reload({
                params: {
                    "hideparam": 'filterprefixbyptkas'
                },
                callback: function (records, operation, success) {
                    //me.filterStatusCash(store);
                }
            });

        }
    },
    filterbyCompany: function () {
        var me, form, combobox, store;
        me = this;
        form = me.getFormdata();
        combobox = form.down('[name=prefixcash]');
        store = combobox.getStore();
        store.reload({
            params: {
                "hideparam": 'filterprefixbyptkas',
                "fromprojectpt": me.getVal(form, 'frompt', 'raw'),
                "untilprojectpt": me.getVal(form, 'untilpt', 'raw'),
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
    setupData: function () {
        var me, form, formvalue, detailcoa,
                fromcoa, untilcoa, frompt, untilpt, fromdepartment
                , untildepartment, groupby, returndata, detailaccount, arraydata, storeprefix;
        me = this;
        form = me.getFormdata();
        formvalue = form.getForm().getValues();
        if (form.getForm().isValid()) {

            if (formvalue.allcompany == '1') {
                formvalue['fromproject'] = '';
                formvalue['untilproject'] = '';
                formvalue['frompt'] = '';
                formvalue['untilpt'] = '';
            } else {
                formvalue['fromproject'] = form.down("[name=frompt]").valueModels[0].raw.project_id;
                formvalue['untilproject'] = form.down("[name=untilpt]").valueModels[0].raw.project_id;
                formvalue['frompt'] = form.down("[name=frompt]").valueModels[0].raw.pt_id;
                formvalue['untilpt'] = form.down("[name=untilpt]").valueModels[0].raw.pt_id;
                formvalue['pt_name'] = form.down("[name=untilpt]").valueModels[0].raw.ptname;
                formvalue['frombank'] = form.down("[name=prefixcash]").valueModels[0].raw.prefix; // prefixcash
                formvalue['untilbank'] = form.down("[name=prefixcash]").valueModels[0].raw.prefix;
                formvalue['fromprefix_id'] = form.down("[name=prefixcash]").valueModels[0].raw.prefix_id;
                formvalue['untilprefix_id'] = form.down("[name=prefixcash]").valueModels[0].raw.prefix_id;
            }

            if (formvalue.prefixcash == undefined || formvalue.prefixcash == '') {
                formvalue['coa'] = '';
            } else {
                if (formvalue.frompt == formvalue.untilpt && formvalue.frompt !== '') {
                    formvalue['coa'] = form.down("[name=prefixcash]").valueModels[0].raw.coa;
                } else {
//                    storeprefix = form.down("[name=prefixcash]").getStore();
//                    arraydata = [];
//                    storeprefix.each(function (record) {
//                        arraydata.push(record.get('coa'));
//                    });
//                    formvalue['coa'] = arraydata;
                    formvalue['coa'] = form.down("[name=prefixcash]").valueModels[0].raw.coa;
                }
            }

            formvalue["report_alias"] = 'CASHPOSRPT_A_'+form.down("[name=untilpt]").valueModels[0].raw.ptname;
            me.preparedvalues = formvalue;
            me.setForAjax(formvalue);
        }
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
        var title = 'Result ' + me.getFormdata().up('window').title;
        me.instantWindowWithMinimize('Panel', 800, title, 'state-report', me.winId, me.controllerName);
        me.generateReportParams(me.getFormdata().getForm().getFieldValues());
        me.win = desktop.getWindow(me.winId);
    },
    submitReport: function (value) {
        var me, report, html;
        me = this;
        report = 'report_position/' + 'Kasbankpositionreport_ab';
        var html = me.ReportviewerV4(value, report, me.win.id, 0); //whole report
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
    setSuccessEvent: function () {
        var me, value, counter;
        me = this;        
        me.winId = me.controllerName + '_' + Ext.Date.format(new Date(), 'His');
        if (me.info.parameter == 'default') {
            Ext.getBody().unmask();
            value = me.info.data;
            counter = me.info.counter;
            if (counter < 1) {
                me.buildWarningAlert("No Result Data...");
            } else {

                /*
                 if (value.paramjs.allperiode == '1') {
                 value['periode'] = me.dateNow.getDate() + "-" + (me.dateNow.getMonth() + 1) + "-" + me.dateNow.getFullYear() + " s/d " + me.dateNow.getDate() + "-" + (me.dateNow.getMonth() + 1) + "-" + me.dateNow.getFullYear();
                 } else {
                 value['periode'] = value.paramjs.fromperiode + " s/d " + value.paramjs.untilperiode;
                 }
                 */

                value = me.preparedvalues;
                //value['periode'] = value.paramjs.fromperiode + " s/d " + value.paramjs.untilperiode;
                //value['dataflow'] = value.paramjs.typetrans;
                //value['coa'] = value.paramjs.coa;
                
                var dy = new Date(value.fromperiode);
                value['tahun'] = dy.getFullYear();
                value['type'] = 'CASH';
                value['date'] = value.fromperiode + ' s/d ' + value.untilperiode;
                value['userprint'] = me.userprint;
                value["printdate"] = me.dateNow.getDate() + "-" + (me.dateNow.getMonth() + 1) + "-" + me.dateNow.getFullYear();
                value["timeprint"] = me.dateNow.getHours() + ":" + me.dateNow.getMinutes() + ":" + me.dateNow.getSeconds();
                me.createWindows();
                me.submitReport(value);
            }
        }
    },
});