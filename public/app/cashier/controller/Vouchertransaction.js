Ext.define('Cashier.controller.Vouchertransaction', {
    extend: 'Cashier.library.template.controller.Controllermodule',
    alias: 'controller.Vouchertransaction',
    requires: [
        'Cashier.template.ComboBoxFields',
        'Cashier.library.template.combobox.Ptreportcombobox',
        'Cashier.library.template.combobox.Vendorcombobox',
        'Cashier.library.template.combobox.Departmentcombobox',
    ],
    views: [
        'vouchertransaction.Panel',
        'vouchertransaction.FormData'
    ],
    stores: [
        'Ptreport',
        'Grouptransaction',
        'Loaner',
        'Prefixcombo',
    ],
    models: [
    ],
    refs: [
        {
            ref: 'formdata',
            selector: 'vouchertransactionformdata'
        },
        {
            ref: 'paneldata',
            selector: 'vouchertransactionpanel'
        }
    ],
    controllerName: 'vouchertransaction',
    fieldName: '',
    bindPrefixName: 'Vouchertransaction',
    urlprocess: 'cashier/vouchertransaction/create',
    stimulsoft: "resources/stimulsoft/index.php?stimulsoft_client_key=ViewerFx&stimulsoft_report_key=",
    yeardata: null, paramsStr: null, win: null, params: null, dateNow: new Date(), html: null, winId: 'myReportWindow',
    project_name: null, pt_name: null, userprint: null, urlrequest: null, senddata: null, info: null, form: null, cluster: null,
    value: null,
    statusdetail: null, statusdetaildesc: null, periode: null, filtercoa: null,
    fromcoa: null, untilcoa: null, fromdate: null, untildate: null,
    init: function (application) {
        var me = this;
        this.control({
            'vouchertransactionpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: function (panel) {
                    me.windowsHeight(me.bindPrefixName, 560);
                    me.windowsWidht(me.bindPrefixName, 680);
                    me.panelAfterRender();
                }
            },
            'vouchertransactionformdata': {
                afterrender: function (panel) {
                    this.formDataAfterRender();
                }
            },
            'vouchertransactionformdata [name=allcompany]': {
                change: function (the, newValue, oldValue, eOpts) {
                    me.fromuntilcompany(newValue);
                },
            },
            'vouchertransactionformdata [name=allvendor]': {
                change: function (the, newValue, oldValue, eOpts) {
                    me.fromuntilvendor(newValue);
                },
            },
            'vouchertransactionformdata [name=alldepartment]': {
                change: function (the, newValue, oldValue, eOpts) {
                    me.fromuntildepartment(newValue);

                },
            },
            'vouchertransactionformdata button[action=submit]': {
                click: function () {
                    this.showReport();
                }
            }
        });
    },
    panelAfterRender: function () {
        var me = this;
        Ext.Ajax.request({
            url: 'cashier/vouchertransaction/read',
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
        me.fromuntilcompany(true);
        me.fromuntilvendor(true);
        me.fromuntildepartment(true);
        me.setVal(form, 'fromperiode', me.dateNow);
        me.setVal(form, 'untilperiode', me.dateNow);
    },
    showReport: function () {
        var me;
        me = this;
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
                formvalue['filterptid'] = 0;
            } else {
                formvalue['fromproject'] = form.down("[name=frompt]").valueModels[0].raw.projectcode;
                formvalue['untilproject'] = form.down("[name=untilpt]").valueModels[0].raw.projectcode;
                formvalue['frompt'] = form.down("[name=frompt]").valueModels[0].raw.code;
                formvalue['untilpt'] = form.down("[name=untilpt]").valueModels[0].raw.code;
                formvalue['filterptid'] = me.Filterinpt();
                ;
            }

            if (formvalue.allvendor == '1') {
                formvalue['fromvendor'] = '';
                formvalue['untilvendor'] = '';
                formvalue['filtervendorid'] = 0;
            } else {
                formvalue['fromvendor'] = form.down("[name=fromvendor]").valueModels[0].raw.vendorcode;
                formvalue['untilvendor'] = form.down("[name=untilvendor]").valueModels[0].raw.vendorcode;
                formvalue['filtervendorid'] = me.Filterinvendor();
            }

            if (formvalue.alldepartment == '1') {
                formvalue['fromdepartment'] = '';
                formvalue['untildepartment'] = '';
                formvalue['filterdeptid'] = 0;
            } else {
                formvalue['fromdepartment'] = form.down("[name=fromdepartment]").valueModels[0].raw.code;
                formvalue['untildepartment'] = form.down("[name=untildepartment]").valueModels[0].raw.code;
                formvalue['filterdeptid'] = me.Filterindept();
            }
            formvalue['reportfile'] = me.reportType();
            me.setForAjax(formvalue);
        }
    },
    reportType: function () {
        var me, form, formvalue, groupby, detailcoa, reportfile;
        me = this;
        form = me.getFormdata();
        formvalue = form.getForm().getValues();
        groupby = formvalue.groupby;
        detailcoa = formvalue.detailcoa;

        if (detailcoa == '0') {
            reportfile = 'Vouchertransaction' + groupby;
        } else {
            reportfile = 'Vouchertransaction' + groupby + "withdetailcoa";
        }
        return reportfile;
    },
    Filterinpt: function () {
        var me, form, formvalue, untilpt, store, arraydata, inpt;
        me = this;
        arraydata = [];
        form = me.getFormdata();
        formvalue = form.getForm().getValues();
        untilpt = form.down("[name=untilpt]").valueModels[0].raw;
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
        inpt = arraydata.join(",");
        return inpt;
    },
    Filterinvendor: function () {
        var me, form, formvalue, untilvendor, store, arraydata, invendor;
        me = this;
        arraydata = [];
        form = me.getFormdata();
        formvalue = form.getForm().getValues();
        untilvendor = form.down("[name=untilvendor]").valueModels[0].raw;
        store = form.down("[name=fromvendor]").getStore();
        store.each(function (rec)
        {
            if (untilvendor.code === rec.data.code) {
                arraydata.push(rec.data.vendor_id);
                return false;
            } else {
                arraydata.push(rec.data.vendor_id);
            }
        }
        );
        invendor = arraydata.join(",");
        return invendor;
    },
    Filterindept: function () {
        var me, form, formvalue, untildept, store, arraydata, indept;
        me = this;
        arraydata = [];
        form = me.getFormdata();
        formvalue = form.getForm().getValues();
        untildept = form.down("[name=untildepartment]").valueModels[0].raw;
        store = form.down("[name=fromdepartment]").getStore();
        store.each(function (rec)
        {
            if (untildept.code === rec.data.code) {
                arraydata.push(rec.data.department_id);
                return false;
            } else {
                arraydata.push(rec.data.department_id);
            }
        }
        );
        indept = arraydata.join(",");
        return indept;
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
        me.instantWindow('Panel', 800, 'Result ', 'state-report', me.winId, 'masterreport');
        me.generateReportParams(me.getFormdata().getForm().getFieldValues());
        me.win = desktop.getWindow(me.winId);
    },
    submitReport: function (value) {
        var me, report, html;
        me = this;
        report = 'report_vouchertransaction/' + value.reportfile;
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
        var counter, me, value;
        me = this;
        if (me.info.parameter == 'default') {
            Ext.getBody().unmask();
            value = me.info.data;
            counter = me.info.counter;
            if (counter < 1) {
                me.buildWarningAlert("No Result Data...");
            } else {
                if (value.paramjs.allperiode == '1') {
                    value['periode'] = me.dateNow.getDate() + "-" + (me.dateNow.getMonth() + 1) + "-" + me.dateNow.getFullYear() + " s/d " + me.dateNow.getDate() + "-" + (me.dateNow.getMonth() + 1) + "-" + me.dateNow.getFullYear();
                } else {
                    value['periode'] = value.paramjs.fromperiode + " s/d " + value.paramjs.untilperiode;
                }
                value['dataflowby'] = value.paramjs.dataflowby;
                value['groupby'] = value.paramjs.groupby;
                value['detailcoa'] = value.paramjs.detailcoa;
                value['reportfile'] = value.paramjs.reportfile;
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