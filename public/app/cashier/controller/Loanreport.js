Ext.define('Cashier.controller.Loanreport', {
    extend: 'Cashier.library.template.controller.Controllermodule',
    alias: 'controller.Loanreport',
    requires: [
        'Cashier.template.ComboBoxFields',
        'Cashier.library.template.combobox.Ptusercombobox',
        'Cashier.library.template.combobox.Groupcombobox',
        'Cashier.library.template.combobox.Departmentcombobox',
        'Cashier.library.template.combobox.Loanercombobox',
        'Cashier.library.template.combobox.Prefixreportcombobox',
    ],
    views: [
        'loanreport.Panel',
        'loanreport.FormData'
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
            selector: 'loanreportformdata'
        },
        {
            ref: 'paneldata',
            selector: 'loanreportpanel'
        }
    ],
    controllerName: 'loanreport',
    fieldName: '',
    bindPrefixName: 'Loanreport',
    urlprocess: 'cashier/loanreport/create',
    stimulsoft: "resources/stimulsoft/index.php?stimulsoft_client_key=ViewerFx&stimulsoft_report_key=",
    yeardata: null, paramsStr: null, win: null, params: null, dateNow: new Date(), html: null, winId: 'myReportWindow',
    project_name: null, pt_name: null, userprint: null, urlrequest: null, senddata: null, info: null, form: null, cluster: null,
    value: null,
    statusdetail: null, statusdetaildesc: null, periode: null, filtercoa: null,
    fromcoa: null, untilcoa: null, fromdate: null, untildate: null,
    init: function (application) {
        var me = this;
        this.control({
            'loanreportpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: function (panel) {
                    Ext.get('WINDOW-mnu' + me.bindPrefixName).setHeight(570);
                    Ext.get('WINDOW-mnu' + me.bindPrefixName).setWidth(680);
                    me.panelAfterRender();
                }
            },
            'loanreportformdata': {
                afterrender: function (panel) {
                    this.formDataAfterRender();
                }
            },
            'loanreportformdata [name=allcompany]': {
                change: function (the, newValue, oldValue, eOpts) {
                    me.fromuntilcompany(newValue);
                },
            },
            'loanreportformdata [name=alldepartment]': {
                change: function (the, newValue, oldValue, eOpts) {
                    me.fromuntildepartment(newValue);
                },
            },
            'loanreportformdata [name=allperiode]': {
                change: function (the, newValue, oldValue, eOpts) {
                    me.fromuntildate(newValue);

                },
            },
            'loanreportformdata [name=allprefix]': {
                change: function (the, newValue, oldValue, eOpts) {
                    me.fromuntilprefix(newValue);
                    if (newValue == false) {
                        me.filterprefixbyCompany();
                    }
                },
            },
            'loanreportformdata [name=alllaoner]': {
                change: function (the, newValue, oldValue, eOpts) {
                    me.fromuntilloaner(newValue);
                },
            },
            'loanreportformdata button[action=submit]': {
                click: function () {
                    this.showReport();
                }
            }
        });
    },

    formDataAfterRender: function () {
        var me, storecoa, form = '';
        me = this;
        form = me.getFormdata();
        me.setStoreFormdata();
        me.fromuntilcompany(true);
        me.fromuntildepartment(true);
        me.fromuntilprefix(true);
        me.fromuntildate(true);
        me.fromuntilloaner(true);
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

            if (formvalue.alldepartment == '1') {
                formvalue['fromdepartment'] = '';
                formvalue['untildepartment'] = '';
            } else {
                formvalue['fromdepartment'] = form.down("[name=fromdepartment]").valueModels[0].raw.code;
                formvalue['untildepartment'] = form.down("[name=untildepartment]").valueModels[0].raw.code;
            }

            if (formvalue.allperiode == '1') {
                formvalue['fromperiode'] = '';
                formvalue['untilperiode'] = '';
            }

            if (formvalue.alllaoner == '1') {
                formvalue['fromloaner'] = '';
                formvalue['untilloaner'] = '';
            } else {
                formvalue['fromloaner'] = form.down("[name=fromloaner]").valueModels[0].raw.loaner;
                formvalue['untilloaner'] = form.down("[name=untilloaner]").valueModels[0].raw.loaner;
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
        report = 'report_loan/'+value.reportfile;
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
            if(counter < 1){
                me.buildWarningAlert("No Result Data...");
            }else{
                if (value.paramjs.allperiode == '1') {
                value['periode'] = me.dateNow.getDate() + "-" + (me.dateNow.getMonth() + 1) + "-" + me.dateNow.getFullYear() + " s/d " + me.dateNow.getDate() + "-" + (me.dateNow.getMonth() + 1) + "-" + me.dateNow.getFullYear();
            } else {
                value['periode'] = value.paramjs.fromperiode + " s/d " + value.paramjs.untilperiode;
            }
            value['userprint'] = me.userprint;
            value["printdate"] = me.dateNow.getDate() + "-" + (me.dateNow.getMonth() + 1) + "-" + me.dateNow.getFullYear();
            value["timeprint"] = me.dateNow.getHours() + ":" + me.dateNow.getMinutes() + ":" + me.dateNow.getSeconds();
            me.createWindows();
            me.submitReport(value);
            }
            
        }
    },
    panelAfterRender: function () {
        var me = this;
        Ext.Ajax.request({
            url: 'cashier/loanreport/read',
            success: function (response) {
                var info = Ext.JSON.decode(response.responseText);
                me.project_name = info.project_name;
                me.pt_name = info.pt_name;
                me.userprint = info.userprint;
            },
        });
    },
});