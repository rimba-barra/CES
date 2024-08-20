Ext.define('Cashier.controller.Voucherbyvendor', {
    extend: 'Cashier.library.template.controller.Controllermodule',
    alias: 'controller.Voucherbyvendor',
    requires: [
        'Cashier.template.ComboBoxFields',
        'Cashier.library.template.combobox.Ptusercombobox',
        'Cashier.library.template.combobox.Groupcombobox',
        'Cashier.library.template.combobox.Vendorcombobox',
        'Cashier.library.template.combobox.Loanercombobox',
        'Cashier.library.template.combobox.Prefixreportcombobox',
    ],
    views: [
        'voucherbyvendor.Panel',
        'voucherbyvendor.FormData'
    ],
    stores: [
        'Ptbyuser',
        'Grouptransaction',
        'Loaner',
        'Voucherprefixsetupcombo',
    ],
    models: [
        'Voucherprefixsetup'
    ],
    refs: [
        {
            ref: 'formdata',
            selector: 'voucherbyvendorformdata'
        },
        {
            ref: 'paneldata',
            selector: 'voucherbyvendorpanel'
        }
    ],
    controllerName: 'voucherbyvendor',
    fieldName: '',
    bindPrefixName: 'Voucherbyvendor',
    urlprocess: 'cashier/voucherbyvendor/create',
    stimulsoft: "resources/stimulsoft/index.php?stimulsoft_client_key=ViewerFx&stimulsoft_report_key=",
    yeardata: null, paramsStr: null, win: null, params: null, dateNow: new Date(), html: null, winId: 'myReportWindow',
    project_name: null, pt_name: null, userprint: null, urlrequest: null, senddata: null, info: null, form: null, cluster: null,
    value: null,
    statusdetail: null, statusdetaildesc: null, periode: null, filtercoa: null,
    fromcoa: null, untilcoa: null, fromdate: null, untildate: null,
    project_id: 0, pt_id: 0, project_code: null, pt_code: null,

    init: function (application) {
        var me = this;
        this.control({
            'voucherbyvendorpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: function (panel) {
                    me.windowsHeight(me.bindPrefixName, 470);
                    me.windowsWidht(me.bindPrefixName, 680);
                    me.panelAfterRender();
                }
            },
            'voucherbyvendorformdata': {
                afterrender: function (panel) {
                    this.formDataAfterRender();
                },

            },
            'voucherbyvendorformdata [name=allcompany]': {
                change: function (the, newValue, oldValue, eOpts) {
                    me.fromuntilcompany(newValue);
                },
            },
            'voucherbyvendorformdata [name=allvendor]': {
                change: function (the, newValue, oldValue, eOpts) {
                    me.fromuntilvendor(newValue);
                },
            },
            'voucherbyvendorformdata [name=allprefix]': {
                change: function (the, newValue, oldValue, eOpts) {
                    me.fromuntilprefix(newValue);
                    if (newValue == false) {
                        me.filterprefixbyCompany();
                    }
                },
            },
            'voucherbyvendorformdata button[action=submit]': {
                click: function () {
                    this.showReport();
                }
            }
        });
    },
    panelAfterRender: function () {
        var me = this;
        Ext.Ajax.request({
            url: 'cashier/voucherbyvendor/read',
            success: function (response) {
                var info = Ext.JSON.decode(response.responseText);
                me.project_id = info.project_id;
                me.project_code = info.project_code;
                me.project_name = info.project_name;
                me.pt_id = info.pt_id;
                me.pt_code = info.pt_code;
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
        me.fromuntilcompany(true);
        me.fromuntilvendor(true);
        me.fromuntilprefix(true);
        me.setVal(form, 'fromperiode', me.dateNow);
        me.setVal(form, 'untilperiode', me.dateNow);
    },
    filterStatusbank: function (store) {
        var me, form;
        me = this;
        store.clearFilter(true);
        store.filter('in_out', 'O');
    },
    filterprefixbyCompany: function () {
        var me, grid, store, form, counter;
        me = this;
        form = me.getFormdata();
        store = form.down('[name=fromprefix]').getStore();
        store.load({
            params: {
                "hideparam": 'filterprefixbypt',
                "fromprojectpt": me.pt_name,
                "untilprojectpt": me.pt_name,
                "start": 0,
                "limit": 1000,
            },
            callback: function (records, operation, success) {
                me.filterStatusbank(store);
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
        var me, form, formvalue;
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
                formvalue['fromproject'] = form.down("[name=frompt]").valueModels[0].raw.projectcode;
                formvalue['untilproject'] = form.down("[name=untilpt]").valueModels[0].raw.projectcode;
                formvalue['frompt'] = form.down("[name=frompt]").valueModels[0].raw.ptcode;
                formvalue['untilpt'] = form.down("[name=untilpt]").valueModels[0].raw.ptcode;
            }

            if (formvalue.allvendor == '1') {
                formvalue['fromvendor'] = '';
                formvalue['untilvendor'] = '';
            } else {
                formvalue['fromvendor'] = form.down("[name=fromvendor]").valueModels[0].raw.vendorcode;
                formvalue['untilvendor'] = form.down("[name=untilvendor]").valueModels[0].raw.vendorcode;
            }

            if (formvalue.allprefix == '1') {
                formvalue['fromprefix'] = '';
                formvalue['untilprefix'] = '';
            } else {
                formvalue['fromprefix'] = form.down("[name=fromprefix]").valueModels[0].raw.prefix;
                formvalue['untilprefix'] = form.down("[name=untilprefix]").valueModels[0].raw.prefix;
            }
            me.setForAjax(formvalue);

        }
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
    createWindows: function () {
        var me = this;
        me.instantWindow('Panel', 800, 'Result ', 'state-report', me.winId, 'masterreport');
        me.generateReportParams(me.getFormdata().getForm().getFieldValues());
        me.win = desktop.getWindow(me.winId);
    },
    submitReport: function (value) {
        var me, report, html;
        me = this;
        report = 'report_voucherbyvendor/' + value.reportfile;
        html = me.Reportviewerjs(value, report);
        me.win.down("#MyReportPanel").body.setHTML(html);
        $("#Reportform").submit();
    },
    AjaxRequest: function () {
        var me;
        me = this;
        Ext.Ajax.request({
            url: me.urlrequest,
            timeout:45000000,
            method: 'POST',
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
        var me, value,counter;
        me = this;
        if (me.info.parameter == 'default') {
            Ext.getBody().unmask();
            value = me.info.data;
            counter = me.info.counter;
            if(counter==0){
                me.buildWarningAlert("No Result Data...");
            } else {
                if (value.paramjs.allperiode == '1') {
                    value['periode'] = me.dateNow.getDate() + "-" + (me.dateNow.getMonth() + 1) + "-" + me.dateNow.getFullYear() + " s/d " + me.dateNow.getDate() + "-" + (me.dateNow.getMonth() + 1) + "-" + me.dateNow.getFullYear();
                } else {
                    value['periode'] = value.paramjs.fromperiode + " s/d " + value.paramjs.untilperiode;
                }
                value['dataflowby'] = value.paramjs.dataflowby;
                value['groupreportby'] = value.paramjs.groupreportby;
                value['typetrans'] = value.paramjs.typetrans;
                value['userprint'] = me.userprint;
                value["printdate"] = me.dateNow.getDate() + "-" + (me.dateNow.getMonth() + 1) + "-" + me.dateNow.getFullYear();
                value["timeprint"] = me.dateNow.getHours() + ":" + me.dateNow.getMinutes() + ":" + me.dateNow.getSeconds();
                me.createWindows();
                me.submitReport(value);
            }
            
        }
    },

});