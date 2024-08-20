Ext.define('Cashier.controller.Cashaging', {
    extend: 'Cashier.library.template.controller.Controllermodule',
    alias: 'controller.Cashaging',
    requires: [
        'Cashier.template.ComboBoxFields',
        'Cashier.library.template.combobox.Projectcombobox',
        'Cashier.library.template.combobox.Ptusercombobox',
        'Cashier.library.template.combobox.Departmentcombobox',
    ],
    views: [
        'cashaging.Panel',
        'cashaging.FormData'
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
            selector: 'cashagingformdata'
        },
        {
            ref: 'paneldata',
            selector: 'cashagingpanel'
        }
    ],
    controllerName: 'cashaging',
    fieldName: '',
    bindPrefixName: 'Cashaging',
    urlprocess: 'cashier/cashaging/create',
    stimulsoft: "resources/stimulsoft/index.php?stimulsoft_client_key=ViewerFx&stimulsoft_report_key=",
    yeardata: null, paramsStr: null, win: null, params: null, dateNow: new Date(), html: null, winId: 'myReportWindow',
    project_name: null, pt_name: null, userprint: null, urlrequest: null, senddata: null, info: null, form: null, cluster: null,
    value: null,
    statusdetail: null, statusdetaildesc: null, periode: null, filtercoa: null,
    fromcoa: null, untilcoa: null, fromdate: null, untildate: null,
    init: function (application) {
        var me = this;
        this.control({
            'cashagingpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: function (panel) {
                    me.windowsHeight(me.bindPrefixName, 500);
                    me.windowsWidht(me.bindPrefixName, 700);
                    me.panelAfterRender();
                }
            },
            'cashagingformdata': {
                afterrender: function (panel) {
                    this.formDataAfterRender();
                }
            },
            'cashagingformdata [name=allproject]': {
                change: function (the, newValue, oldValue, eOpts) {
                    var me, form;
                    me = this;
                    form = me.getFormdata();
                    me.fromuntilproject(newValue);
                    me.fromuntilcompany(newValue);
                    me.setVal(form, 'allcompany', newValue);
                },
            },
            'cashagingformdata [name=allcompany]': {
                change: function (the, newValue, oldValue, eOpts) {
                    me.fromuntilcompany(newValue);
                },
            },
            'cashagingformdata [name=alldepartment]': {
                change: function (the, newValue, oldValue, eOpts) {
                    me.fromuntildepartment(newValue);
                },
            },
            'cashagingformdata [name=departmentproject]': {
                change: function (the, newValue, oldValue, eOpts) {
                    me.groupDeptProject();
                },
            },
            'cashagingformdata button[action=submit]': {
                click: function () {
                    this.showReport();
                }
            }
        });
    },
    panelAfterRender: function () {
        var me = this;
        Ext.Ajax.request({
            url: 'cashier/cashaging/read',
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
        me.setVal(form, 'periodedate', me.dateNow);
        me.setStoreFormdata();
        me.fromuntilproject(true);
        me.fromuntilcompany(true);
        me.fromuntildepartment(true);
        me.groupDeptProject();
    },
    groupDeptProject: function () {
        var me, form, value;
        me = this;
        form = me.getFormdata();
        value = me.gValRadio(form, "departmentproject");
        if (value !== undefined) {
            if (value == 'department') {
                me.Fdisable(form, "allproject", true);
                me.Fdisable(form, "alldepartment", false);
                me.setVal(form, "alldepartment", true);
            } else if (value == 'project') {
                me.Fdisable(form, "allproject", false);
                me.Fdisable(form, "alldepartment", true);
                me.Fdisable(form, "fromdepartment", true);
                me.Fdisable(form, "untildepartment", true);
                me.setAllow(form, "fromdepartment", true);
                me.setAllow(form, "untildepartment", true);
            }
            me.setValCombo(form, "fromproject", '', '');
            me.setValCombo(form, "untilproject", '', '');
            me.setValCombo(form, "fromdepartment", '', '');
            me.setValCombo(form, "untildepartment", '', '');
        }
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
                , untildepartment, groupby, returndata, detailaccount,
                reportfile;
        me = this;
        form = me.getFormdata();
        formvalue = form.getForm().getValues();
        if (form.getForm().isValid()) {
            if (formvalue.departmentproject == 'project') {
                if (formvalue.allproject == '1') {
                    formvalue['fromproject'] = '';
                    formvalue['untilproject'] = '';
                    formvalue['frompt'] = '';
                    formvalue['untilpt'] = '';
                } else {
                    formvalue['fromproject'] = form.down("[name=fromproject]").valueModels[0].raw.code;
                    formvalue['untilproject'] = form.down("[name=untilproject]").valueModels[0].raw.code;
                    formvalue['frompt'] = form.down("[name=frompt]").valueModels[0].raw.ptcode;
                    formvalue['untilpt'] = form.down("[name=untilpt]").valueModels[0].raw.ptcode;
                }

            } else {
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
                if (formvalue.alldepartment == '1') {
                    formvalue['fromdepartment'] = '';
                    formvalue['untildepartment'] = '';
                } else {
                    formvalue['fromdepartment'] = form.down("[name=fromdepartment]").valueModels[0].raw.code;
                    formvalue['untildepartment'] = form.down("[name=untildepartment]").valueModels[0].raw.code;
                }
            }
            formvalue['reportfile'] = me.selectReport(formvalue);
            me.setForAjax(formvalue);
        }
    },
    selectReport: function (formvalue) {
        var report, tmpreport;
        if (formvalue.format == 'detail') {
            if (formvalue.departmentproject == 'department') {
                if (formvalue.grouptype == 'companyproject') {
                    return 'Agingcashadvancedetaildeptcompany';
                } else if (formvalue.grouptype == 'department') {
                    return 'Agingcashadvancedetaildeptdepartment';
                } else if (formvalue.grouptype == 'staff') {
                    return 'Agingcashadvancedetaildeptstaff';
                }
            } else if (formvalue.departmentproject == 'project') {
                if (formvalue.grouptype == 'companyproject') {
                    return 'Agingcashadvancedetailprojectcompany';
                } else if (formvalue.grouptype == 'department') {
                    return 'Agingcashadvancedetailprojectdepartment';
                } else if (formvalue.grouptype == 'staff') {
                    return 'Agingcashadvancedetailprojectstaff';
                }
            }
        } else if (formvalue.format == 'rekap') {
            if (formvalue.departmentproject == 'department') {
                if (formvalue.grouptype == 'companyproject') {
                    return 'Agingcashadvancerekapdeptcompany';
                } else if (formvalue.grouptype == 'department') {
                    return 'Agingcashadvancerekapdeptdepartment';
                } else if (formvalue.grouptype == 'staff') {
                    return 'Agingcashadvancerekapdeptstaff';
                }
            } else if (formvalue.departmentproject == 'project') {
                if (formvalue.grouptype == 'companyproject') {
                    return 'Agingcashadvancerekapprojectcompany';
                } else if (formvalue.grouptype == 'department') {
                    return 'Agingcashadvancerekapprojectdepartment';
                } else if (formvalue.grouptype == 'staff') {
                    return 'Agingcashadvancerekapprojecttstaff';
                }
            }
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
        report = 'report_cashadvanceaging/' + value.reportfile;
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
        var me, form, value;
        me = this;
        form = me.getFormdata();
        if (me.info.parameter == 'default') {
            Ext.getBody().unmask();
            value = me.info.data;
            value['format'] = value.paramjs.format;
            value['periode'] = value.paramjs.periodedate;
            value['cashbontype'] = value.paramjs.cashbontype;
            value['grouptype'] = value.paramjs.grouptype;
            value['userprint'] = me.userprint;
            value["printdate"] = me.dateNow.getDate() + "-" + (me.dateNow.getMonth() + 1) + "-" + me.dateNow.getFullYear();
            value["timeprint"] = me.dateNow.getHours() + ":" + me.dateNow.getMinutes() + ":" + me.dateNow.getSeconds();
            me.createWindows();
            me.submitReport(value);
        }

    },

});