Ext.define('Cashier.controller.Printvoucher', {
    extend: 'Cashier.library.template.controller.Controllermodule',
    alias: 'controller.Printvoucher',
    requires: [
        'Cashier.template.ComboBoxFields',
        'Cashier.library.template.combobox.Ptusercombobox',
        'Cashier.library.template.combobox.Prefixcombobox',
        'Cashier.library.template.combobox.Voucherkasbankcombobox',
    ],
    views: [
        'printvoucher.Panel',
        'printvoucher.FormData'
    ],
    stores: [
        'Ptbyuser',
        'Voucherprefixsetupcombo',
        'Voucherkasbank',
    ],
    models: [
    ],
    refs: [
        {
            ref: 'formdata',
            selector: 'printvoucherformdata'
        },
        {
            ref: 'paneldata',
            selector: 'printvoucherpanel'
        }
    ],
    controllerName: 'printvoucher',
    fieldName: '',
    bindPrefixName: 'Printvoucher',
    urlprocess: 'cashier/printvoucher/create',
    reportpath: "app/cashier/report/",
    stimulsoft: "resources/stimulsoft/index.php?stimulsoft_client_key=ViewerFx&stimulsoft_report_key=",
    yeardata: null, paramsStr: null, win: null, params: null, dateNow: new Date(), html: null, winId: 'myReportWindow',
    project_name: null, pt_name: null, userprint: null, urlrequest: null, senddata: null, info: null, form: null, cluster: null,
    value: null,
    statusdetail: null, statusdetaildesc: null, periode: null, filtercoa: null,
    fromcoa: null, untilcoa: null, fromdate: null, untildate: null,
    init: function (application) {
        var me = this;
        this.control({
            'printvoucherpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: function (panel) {
                    Ext.get('WINDOW-mnu' + me.bindPrefixName).setHeight(290);
                    Ext.get('WINDOW-mnu' + me.bindPrefixName).setWidth(550);
                    me.panelAfterRender();
                },
            },
            'printvoucherformdata': {
                afterrender: function (panel) {
                    this.formDataAfterRenderCustome();
                },
                boxready: function () {
                    var me, rowdata, form, state, fromperiode, untilperiode;
                    me = this;
                    form = me.getFormdata();
                    fromperiode = me.formatDate(me.getVal(form, "fromperiode", 'value'));
                    untilperiode = me.formatDate(me.getVal(form, "untilperiode", 'value'));
                    me.setStoreVoucherkasbank(apps.pt, apps.pt, fromperiode, untilperiode);
                }
            },
            'printvoucherformdata [name=frompt]': {
                'select': function (g, record, item, index, e, eOpts) {
                    var me, rowdata, form, state, fromperiode, untilperiode;
                    me = this;
                    form = me.getFormdata();
                    rowdata = record[0]['data'];
                    me.setValCombo(form, "fromvoucherno", '', '');
                    me.setValCombo(form, "untilvoucherno", '', '');
                    fromperiode = me.formatDate(me.getVal(form, "fromperiode", 'value'));
                    untilperiode = me.formatDate(me.getVal(form, "untilperiode", 'value'));
                    me.setStoreVoucherkasbank(rowdata.pt_id, rowdata.pt_id, fromperiode, untilperiode);
                },
            },
            'printvoucherformdata [name=untilpt]': {
                'select': function (g, record, item, index, e, eOpts) {
                    var me, rowdata, form, state, frompt, fromperiode, untilperiode;
                    me = this;
                    form = me.getFormdata();
                    frompt = me.getValCombo(form, "frompt");
                    rowdata = record[0]['data'];
                    me.setValCombo(form, "fromvoucherno", '', '');
                    me.setValCombo(form, "untilvoucherno", '', '');
                    fromperiode = me.formatDate(me.getVal(form, "fromperiode", 'value'));
                    untilperiode = me.formatDate(me.getVal(form, "untilperiode", 'value'));
                    me.setStoreVoucherkasbank(frompt.id, rowdata.pt_id, fromperiode, untilperiode);
                },
            },
            'printvoucherformdata [name=fromperiode]': {
                blur: function (that, The, eOpts) {
                    var me, form, date1, date2, status;
                    me = this;
                    form = me.getFormdata();
                    date1 = that.value;
                    date2 = me.getVal(form, "untilperiode", 'value');
                    me.Rangedate(date1, date2);
                }
            },
            'printvoucherformdata [name=untilperiode]': {
                blur: function (that, The, eOpts) {
                    var me, form, date1, date2, status;
                    me = this;
                    form = me.getFormdata();
                    date1 = me.getVal(form, "fromperiode", 'value');
                    date2 = that.value;
                    me.Rangedate(date1, date2);
                }
            },
            'printvoucherformdata [name=selectionby]': {
                change: function (field, newValue, oldValue) {
                    var me, form, formvalue, selectby, status, value, frompt, untilpt, fromperiode, untilperiode;
                    me = this;
                    form = me.getFormdata();
                    selectby = me.getValRadio(form, "selectionby");
                    frompt = me.getValCombo(form, "frompt");
                    untilpt = me.getValCombo(form, "untilpt");
                    fromperiode = me.formatDate(me.getVal(form, "fromperiode", 'value'));
                    untilperiode = me.formatDate(me.getVal(form, "untilperiode", 'value'));

                    if (selectby !== undefined) {
                        if (selectby !== 'voucherno') {
                            me.setValCombo(form, "fromvoucherno", '', '');
                            me.setValCombo(form, "untilvoucherno", '', '');
                        } else {
                            if (frompt.id == null || untilpt.id == null) {
                                me.buildWarningAlert("Please select from company and until company");
                            } else {
                                me.setStoreVoucherkasbank(frompt.id, untilpt.id, fromperiode, untilperiode);
                            }
                        }
                    }
                }
            },
            'printvoucherformdata button[action=submit]': {
                click: function () {
                    this.showReport();
                }
            }
        });
    },
    Rangedate: function (from, until) {
        var me, form, frompt, untilpt, fromperiode, untilperiode, status;
        me = this;
        form = me.getFormdata();
        frompt = me.getValCombo(form, "frompt");
        untilpt = me.getValCombo(form, "untilpt");
        fromperiode = me.formatDate(me.getVal(form, "fromperiode", 'value'));
        untilperiode = me.formatDate(me.getVal(form, "untilperiode", 'value'));
        status = me.checkRangedate(from, until);
        if (status == "notvalid") {
            me.setError(form, "fromperiode", true, "Range of date not valid");
            me.hideBtn(form, "submit", true);
        } else {
            me.setError(form, "fromperiode", false, "");
            me.hideBtn(form, "submit", false);
            me.setStoreVoucherkasbank(frompt.id, untilpt.id, fromperiode, untilperiode);
        }
    },
    arrayData: function () {
        var me;
        me = this;
        me.value = me.form.getValues();
        me.value["project_name"] = me.project_name;
        me.value["pt_name"] = me.pt_name;
        me.value["userprint"] = me.userprint;
        me.value["tgl_sekarang"] = me.dateNow.getDate() + "-" + (me.dateNow.getMonth() + 1) + "-" + me.dateNow.getFullYear();
        me.value["time_sekarang"] = me.dateNow.getHours() + ":" + me.dateNow.getMinutes() + ":" + me.dateNow.getSeconds();
        me.value["project_id"] = apps.project;
        me.value["pt_id"] = apps.pt;

        me.value["statusdetaildesc"] = me.statusdetaildesc;
        me.value["statusdetail"] = me.statusdetail;
        me.value["periode"] = me.periode;
        me.value["filtercoa"] = me.filtercoa;
        me.value["cluster"] = me.cluster;
    },
    createWindows: function () {
        var me = this;
        me.instantWindow('Panel', 800, 'Result ', 'state-report', me.winId, 'masterreport');
        me.paramsStr = me.generateReportParams(me.getFormdata().getForm().getFieldValues());
        me.win = desktop.getWindow(me.winId);
    },
    submitReport: function (value) {
        var me,reportfile,html;
        me = this;
        //reportfile = 'PrintVoucher';
        reportfile = 'PrintVoucherA4S';
        html = me.generateFakeForm(value, reportfile);
        me.win.down("#MyReportPanel").body.setHTML(html);
        $("#fakeReportFormID").submit();       
    },
    showReport: function () {
        var me, form, formvalue, selectby, statusvoucher;
        me = this;
        form = me.getFormdata();
        formvalue = form.getForm().getValues();

        if (!("selectionby" in formvalue) == false) { //jika true maka key tidak ada di form
            selectby = formvalue['selectionby'];
            if (selectby == 'voucherno') {
                me.setAllow(form, "fromvoucherno", false);
                me.setAllow(form, "untilvoucherno", false);
                statusvoucher = 1;
            } else {
                me.setAllow(form, "fromvoucherno", true);
                me.setAllow(form, "untilvoucherno", true);
                statusvoucher = 0;
            }
            if (form.getForm().isValid()) {
                formvalue['project_id'] = apps.project;
                Ext.getBody().mask("Please wait...");
                me.senddata = formvalue;
                me.urlrequest = me.urlprocess;
                me.AjaxRequest();
            }
        } else {
            me.buildWarningAlert("Please checked the selection by");
        }
    },
    formDataAfterRenderCustome: function () {
        var me, storecoa, form = '';
        me = this;
        form = me.getFormdata();
        me.setVal(form, 'fromperiode', me.dateNow);
        me.setVal(form, 'untilperiode', me.dateNow);
        me.setStoreFormdata();
    },
    setStoreVoucherkasbank: function (frompt, untilpt, fromdate, untildate) {
        var me, store, form, in_out;
        me = this;
        store = me.getStore("Voucherkasbank");
        store.load({
            params: {
                "hideparam": 'getdatakasbank',
                "project_id": apps.project,
                "frompt": frompt,
                "untilpt": untilpt,
                "fromdate": fromdate,
                "untildate": untildate,
                "start": 0,
                "limit": 1000,
            },
            callback: function (records, operation, success) {
            }
        });
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
        var me,value,html,win;        
            me = this;            
        if (me.info.parameter == 'default') {
            if (me.info.counter < 1) {
                Ext.getBody().unmask();
                me.buildWarningAlert(me.info.message);
            } else {
                Ext.getBody().unmask();
                value = me.info.data; 
                value["tgl_sekarang"] = me.dateNow.getDate() + "-" + (me.dateNow.getMonth() + 1) + "-" + me.dateNow.getFullYear(); 
                me.createWindows();
                me.submitReport(value);               
            }
        } else if (me.info.parameter == 'default') {
            Ext.getBody().unmask();
        }
    },
    panelAfterRender: function () {
        var me = this;
        Ext.Ajax.request({
            url: 'cashier/printvoucher/read',
            success: function (response) {
                var info = Ext.JSON.decode(response.responseText);
                me.project_name = info.project_name;
                me.pt_name = info.pt_name;
                me.userprint = info.userprint;
            },
        });
    },
});