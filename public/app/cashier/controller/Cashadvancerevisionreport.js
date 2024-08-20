Ext.define('Cashier.controller.Cashadvancerevisionreport', {
    extend: 'Cashier.library.template.controller.Controllermodule',
    alias: 'controller.Cashadvancerevisionreport',
    requires: [
        'Cashier.template.ComboBoxFields',
        'Cashier.library.template.combobox.Ptusercombobox',
        'Cashier.library.template.combobox.Groupcombobox',
        'Cashier.library.template.combobox.Departmentcombobox',
        'Cashier.library.template.combobox.Loanercombobox',
        'Cashier.library.template.combobox.Prefixcombobox',
    ],
    views: [
        'cashadvancerevisionreport.Panel',
        'cashadvancerevisionreport.FormData'
    ],
    stores: [
        'Ptbyuser',
        'Grouptransaction',
        'Loaner',
        'Prefixcombo',
    ],
    models: [
    ],
    refs: [
        {
            ref: 'formdata',
            selector: 'cashadvancerevisionreportformdata'
        },
        {
            ref: 'paneldata',
            selector: 'cashadvancerevisionreportpanel'
        }
    ],
    controllerName: 'cashadvancerevisionreport',
    fieldName: '',
    bindPrefixName: 'Cashadvancerevisionreport',
    urlprocess: 'cashier/cashadvancerevisionreport/create',
    stimulsoft: "resources/stimulsoft/index.php?stimulsoft_client_key=ViewerFx&stimulsoft_report_key=",
    yeardata: null, paramsStr: null, win: null, params: null, dateNow: new Date(), html: null, winId: 'myReportWindow',
    project_name: null, pt_name: null, userprint: null, urlrequest: null, senddata: null, info: null, form: null, cluster: null,
    value: null,
    statusdetail: null, statusdetaildesc: null, periode: null, filtercoa: null,
    fromcoa: null, untilcoa: null, fromdate: null, untildate: null,
    init: function (application) {
        var me = this;
        this.control({
            'cashadvancerevisionreportpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: function (panel) {
                    me.windowsHeight(me.bindPrefixName, 450);
                    me.windowsWidht(me.bindPrefixName, 680);
                    me.panelAfterRender();
                }
            },
            'cashadvancerevisionreportformdata': {
                afterrender: function (panel) {
                    this.formDataAfterRender();
                }
            },
            'cashadvancerevisionreportformdata [name=allcompany]': {
                change: function (the, newValue, oldValue, eOpts) {
                    me.fromuntilcompany(newValue);
                },
            },
            'cashadvancerevisionreportformdata [name=alldepartment]': {
                change: function (the, newValue, oldValue, eOpts) {
                    me.fromuntildepartment(newValue);
                },
            },
            'cashadvancerevisionreportformdata button[action=submit]': {
                click: function () {
                    this.showReport();
                }
            }
        });
    },
    panelAfterRender: function () {
        var me = this;
        Ext.Ajax.request({
            url: 'cashier/cashadvancerevisionreport/read',
            timeout: 45000000,
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
        me.fromuntildepartment(true);
        me.setVal(form, 'fromperiode', me.dateNow);
        me.setVal(form, 'untilperiode', me.dateNow);

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
            } else {
                formvalue['in_ptid'] = me.Filterinpt();
                formvalue['fromproject'] = form.down("[name=frompt]").valueModels[0].raw.projectcode;
                formvalue['untilproject'] = form.down("[name=untilpt]").valueModels[0].raw.projectcode;
                formvalue['frompt'] = form.down("[name=frompt]").valueModels[0].raw.ptcode;
                formvalue['untilpt'] = form.down("[name=untilpt]").valueModels[0].raw.ptcode;
            }

            if (formvalue.alldepartment == '1') {
                formvalue['fromdepartment'] = '';
                formvalue['untildepartment'] = '';
            } else {
                formvalue['in_deptid'] = me.Filterindept();
                formvalue['fromdepartment'] = form.down("[name=fromdepartment]").valueModels[0].raw.code;
                formvalue['untildepartment'] = form.down("[name=untildepartment]").valueModels[0].raw.code;
            }
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
    Filterindept: function () {
        var me, form, formvalue, from, until, store, arraydata, indata;
        me = this;
        arraydata = [];
        form = me.getFormdata();
        formvalue = form.getForm().getValues();
        from = form.down("[name=fromdepartment]").valueModels[0].raw;
        until = form.down("[name=untildepartment]").valueModels[0].raw;
        store = form.down("[name=fromdepartment]").getStore();
        if (from == until) {
            arraydata.push(form.down("[name=untildepartment]").getValue());
        } else {
            store.each(function (rec)
            {
                if (rec.data.department >= from.department && rec.data.department <= until.department) {
                    arraydata.push(rec.data.department_id);
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
        report = 'report_cashadvancerevision/' + value.reportfile;
        html = me.Reportviewerjs(value, report);
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
        var me, counter;
        me = this;
        if (me.info.parameter == 'default') {
            Ext.getBody().unmask();
            value = me.info.data;
            counter = me.info.counter;
            if (counter < 1) {
                me.buildWarningAlert("No Result Data...");
            } else {                
                value['userprint'] = me.userprint;
                value["printdate"] = me.dateNow.getDate() + "-" + (me.dateNow.getMonth() + 1) + "-" + me.dateNow.getFullYear();
                value["timeprint"] = me.dateNow.getHours() + ":" + me.dateNow.getMinutes() + ":" + me.dateNow.getSeconds();
                me.createWindows();
                me.submitReport(value);
            }
        }
    },

});