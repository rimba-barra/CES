Ext.define('Gl.controller.Dailytransaction', {
    extend: 'Gl.library.template.controller.Controllergl',
    alias: 'controller.Dailytransaction',
    requires: [
        'Gl.library.template.combobox.Coacombobox',
        'Gl.library.template.combobox.Prefixcombobox',
        'Gl.library.template.combobox.Vouchernocombobox',
    ],
    views: [
        'dailytransaction.Panel',
        'dailytransaction.FormData'
    ],
    stores: [
        'Dailytransaction',
        'Prefixcombo',
        'Coacombo',
        'Journal'
    ],
    models: [
        'Dailytransaction',
        'Kodeprefix',
        'Coa',
        'Journal'
    ],
    refs: [
        {
            ref: 'formdata',
            selector: 'dailytransactionformdata'
        },
        {
            ref: 'paneldata',
            selector: 'dailytransactionpanel'
        }
    ],
    controllerName: 'dailytransaction',
    fieldName: '',
    bindPrefixName: 'Dailytransaction',
    urlprocess: 'gl/dailytransaction/read',
    stimulsoft: "resources/stimulsoft/index.php?stimulsoft_client_key=ViewerFx&stimulsoft_report_key=",
    reportnosub: 'Dailytransactionreportnosub', reportwithsub: 'Dailytransactionreportwithsub',
    paramsStr: null, win: null, params: null, dateNow: new Date(), html: null, winId: 'myReportWindow',
    project_name: null, pt_name: null, userprint: null, urlrequest: null, senddata: null, info: null, form: null,
    datajournal: null, value: null, datasub: null, databaseon: null, coa_id: 0, from_prefix_id: 0, until_prefix_id: 0,
    checksub: null, report: null,
    init: function (application) {
        var me = this;
        this.control({
            'dailytransactionpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: function (panel) {
                    Ext.get('WINDOW-mnu' + me.bindPrefixName).setHeight(350);
                    Ext.get('WINDOW-mnu' + me.bindPrefixName).setWidth(900);
                    me.panelAfterRender();
                }
            },
            'dailytransactionformdata': {
                afterrender: function (panel) {
                    this.formDataAfterRenderCustome();

                }
            },
            'dailytransactionformdata #datajournal': {
                change: function () {
                    me.datajournal = me.getFormdata().down("#datajournal").getChecked()[0].getGroupValue();
                    var form, storevoucher = '';
                    form = me.getFormdata();
                    if (me.datajournal == '2') {
                        form.down("[name=dailyinputfromdate]").setDisabled(false);
                        form.down("[name=dailyinputuntildate]").setDisabled(false);
                        me.setValue(me, 'dailyinputfromdate', me.info.data.onedate);
                        me.setValue(me, 'dailyinputuntildate', me.info.data.onedate);
                        storevoucher = me.getStore('Journal');
                        storevoucher.clearFilter(true);
                        storevoucher.filter('is_post', false);
                    } else {
                        form.down("[name=dailyinputfromdate]").setDisabled(true);
                        form.down("[name=dailyinputuntildate]").setDisabled(true);
                        me.setValue(me, 'dailyinputfromdate', '');
                        me.setValue(me, 'dailyinputuntildate', '');
                        storevoucher = me.getStore('Journal');
                        storevoucher.clearFilter();
                    }
                }
            },
            'dailytransactionformdata #datasubdetail': {
                change: function () {
                    me.datasub = me.getFormdata().down("#datasubdetail").getChecked()[0].getGroupValue();
                }
            },
            'dailytransactionformdata #radiobaseon1': {
                focus: function () {
                    me.databaseon = 1;
                    var form = '';
                    form = me.getFormdata();

                    if (me.datajournal == '2') {
                        form.down("[name=dailycoa_id]").setDisabled(true);
                        form.down("[name=namecoa]").setReadOnly(true);
                        form.down("[name=dailyprefix_id_from]").setDisabled(true);
                        form.down("[name=dailyprefix_id_until]").setDisabled(true);
                        form.down("[name=journal_id_from]").setDisabled(true);
                        form.down("[name=journal_id_until]").setDisabled(true);
                        form.down("[name=dailyinputfromdate]").setDisabled(false);
                        form.down("[name=dailyinputuntildate]").setDisabled(false);
                        me.setValue(me, 'dailyinputfromdate', me.info.data.onedate);
                        me.setValue(me, 'dailyinputuntildate', me.info.data.onedate);
                    } else {
                        form.down("[name=dailycoa_id]").setDisabled(true);
                        form.down("[name=namecoa]").setReadOnly(true);
                        form.down("[name=dailyprefix_id_from]").setDisabled(true);
                        form.down("[name=dailyprefix_id_until]").setDisabled(true);
                        form.down("[name=journal_id_from]").setDisabled(true);
                        form.down("[name=journal_id_until]").setDisabled(true);
                        form.down("[name=dailyinputfromdate]").setDisabled(true);
                        form.down("[name=dailyinputuntildate]").setDisabled(true);
                        me.setValue(me, 'dailyinputfromdate', '');
                        me.setValue(me, 'dailyinputuntildate', '');
                    }

                    form.down("[name=dailycoa_id]").allowBlank = true;
                    form.down("[name=namecoa]").allowBlank = true;
                    form.down("[name=dailyprefix_id_from]").allowBlank = true;
                    form.down("[name=dailyprefix_id_until]").allowBlank = true;
                    form.down("[name=journal_id_from]").allowBlank = true;
                    form.down("[name=journal_id_until]").allowBlank = true;

                    me.setValue(me, 'dailyprefix_id_from', '');
                    me.setValue(me, 'dailyprefix_id_until', '');
                    me.setValue(me, 'journal_id_from', '');
                    me.setValue(me, 'journal_id_until', '');
                    me.setValue(me, 'dailycoa_id', '');
                    me.setValue(me, 'namecoa', '');

                }
            },
            'dailytransactionformdata #radiobaseon2': {
                focus: function () {
                    var form = '';
                    me.databaseon = 2;
                    form = me.getFormdata();

                    if (me.datajournal == '2') {
                        form.down("[name=dailycoa_id]").setDisabled(false);
                        form.down("[name=namecoa]").setReadOnly(false);
                        form.down("[name=dailyprefix_id_from]").setDisabled(true);
                        form.down("[name=dailyprefix_id_until]").setDisabled(true);
                        form.down("[name=journal_id_from]").setDisabled(true);
                        form.down("[name=journal_id_until]").setDisabled(true);
                        form.down("[name=dailyinputfromdate]").setDisabled(false);
                        form.down("[name=dailyinputuntildate]").setDisabled(false);
                        me.setValue(me, 'dailyinputfromdate', me.info.data.onedate);
                        me.setValue(me, 'dailyinputuntildate', me.info.data.onedate);
                    } else {
                        form.down("[name=dailycoa_id]").setDisabled(false);
                        form.down("[name=namecoa]").setReadOnly(false);
                        form.down("[name=dailyprefix_id_from]").setDisabled(true);
                        form.down("[name=dailyprefix_id_until]").setDisabled(true);
                        form.down("[name=journal_id_from]").setDisabled(true);
                        form.down("[name=journal_id_until]").setDisabled(true);
                        form.down("[name=dailyinputfromdate]").setDisabled(true);
                        form.down("[name=dailyinputuntildate]").setDisabled(true);
                    }

                    form.down("[name=dailycoa_id]").allowBlank = false;
                    form.down("[name=namecoa]").allowBlank = false;
                    form.down("[name=dailyprefix_id_from]").allowBlank = true;
                    form.down("[name=dailyprefix_id_until]").allowBlank = true;
                    form.down("[name=journal_id_from]").allowBlank = true;
                    form.down("[name=journal_id_until]").allowBlank = true;

                    me.setValue(me, 'dailyprefix_id_from', '');
                    me.setValue(me, 'dailyprefix_id_until', '');
                    me.setValue(me, 'journal_id_from', '');
                    me.setValue(me, 'journal_id_until', '');
                }
            },
            'dailytransactionformdata #radiobaseon3': {
                focus: function () {
                    var form = '';
                    me.databaseon = 3;
                    form = me.getFormdata();
                    form.down("[name=dailycoa_id]").setDisabled(true);
                    form.down("[name=namecoa]").setReadOnly(true);
                    form.down("[name=dailyprefix_id_from]").setDisabled(false);
                    form.down("[name=dailyprefix_id_until]").setDisabled(false);
                    form.down("[name=journal_id_from]").setDisabled(false);
                    form.down("[name=journal_id_until]").setDisabled(false);
                    form.down("[name=dailyinputfromdate]").setDisabled(true);
                    form.down("[name=dailyinputuntildate]").setDisabled(true);

                    form.down("[name=dailycoa_id]").allowBlank = true;
                    form.down("[name=namecoa]").allowBlank = true;
                    form.down("[name=dailyprefix_id_from]").allowBlank = false;
                    form.down("[name=dailyprefix_id_until]").allowBlank = false;
                    form.down("[name=journal_id_from]").allowBlank = false;
                    form.down("[name=journal_id_until]").allowBlank = false;

                    me.setValue(me, 'dailyinputfromdate', '');
                    me.setValue(me, 'dailyinputuntildate', '');
                    me.setValue(me, 'dailyprefix_id_from', '');
                    me.setValue(me, 'dailyprefix_id_until', '');
                    me.setValue(me, 'journal_id_from', '');
                    me.setValue(me, 'journal_id_until', '');
                    me.setValue(me, 'dailycoa_id', '');
                    me.setValue(me, 'namecoa', '');

                }
            },
            'dailytransactionformdata [name=dailycoa_id]': {
                select: function () {
                    me.coa_id = this.getValue(me, "dailycoa_id", 'value');
                    this.getCOAbyID();
                }
            },
            'dailytransactionformdata [name=dailyprefix_id_from]': {
                select: function () {
                    var me, form, storevoucher = '';
                    me = this;
                    form = me.getFormdata();
                    me.from_prefix_id = me.getValue(me, "dailyprefix_id_from", 'value');
                    form.down("[name=dailyprefix_id_until]").setValue(me.from_prefix_id);
                    form.down("[name=journal_id_from]").setValue('');
                    form.down("[name=journal_id_until]").setValue('');

                    storevoucher = me.getStore('Journal');
                    storevoucher.clearFilter(true);
                    var fromdate = me.formatDate(me.getValue(me, "dailytrxfromdate", 'value'));
                    var untildate = me.formatDate(me.getValue(me, "dailytrxuntildate", 'value'));
                    storevoucher.filterBy(function (rec, id) {
                        return rec.data.voucher_date >= fromdate && rec.data.voucher_date <= untildate && rec.data.prefix_id == me.from_prefix_id;
                    });
                }
            },
            'dailytransactionformdata [name=dailyprefix_id_until]': {
                select: function () {
                    var me, form, storevoucher = '';
                    me = this;
                    form = me.getFormdata();
                    me.until_prefix_id = this.getValue(me, "dailyprefix_id_until", 'value');
                    form.down("[name=journal_id_until]").setValue('');
                    storevoucher = me.getStore('Journal');
                    storevoucher.clearFilter(true);
                    var fromdate = me.formatDate(me.getValue(me, "dailytrxfromdate", 'value'));
                    var untildate = me.formatDate(me.getValue(me, "dailytrxuntildate", 'value'));
                    storevoucher.filterBy(function (rec, id) {
                        return rec.data.voucher_date >= fromdate && rec.data.voucher_date <= untildate && rec.data.prefix_id == me.until_prefix_id;
                    });

                }
            },
            'dailytransactionformdata button[action=submit]': {
                click: this.dataSubmit
            }
        });
    },
    dataSubmit: function () {
        var me;
        me = this;
        me.form = me.getFormdata().getForm();

        me.instantWindow('Panel', 800, 'Result ', 'state-report', me.winId, 'masterreport');
        me.paramsStr = me.generateReportParams(me.getFormdata().getForm().getFieldValues());
        me.win = desktop.getWindow(me.winId);

        if (me.form.isValid()) {
            if (me.win) {
                resetTimer();
                me.value = me.form.getValues();

                me.value['periode'] = me.value.dailytrxfromdate + ' s/d ' + me.value.dailytrxuntildate;
                me.value['paccountcode'] = me.getValue(me, "dailycoa_id", 'raw');

                me.value['baseon'] = me.databaseon;
                me.value['trxfromdate'] = me.value.dailytrxfromdate;
                me.value['trxuntildate'] = me.value.dailytrxuntildate;
                me.value['inputfromdate'] = me.getValue(me, "dailyinputfromdate", 'raw');
                me.value['inputuntildate'] = me.getValue(me, "dailyinputuntildate", 'raw');
                me.value['coa_id'] = me.getValue(me, "dailycoa_id", 'value');
                me.value['fromvoucher_id'] = me.getValue(me, "journal_id_from", 'value');
                me.value['untilvoucher_id'] = me.getValue(me, "journal_id_until", 'value');

                me.value["project_name"] = me.project_name;
                me.value["pt_name"] = me.pt_name;
                me.value["userprint"] = me.userprint;
                me.value["tgl_sekarang"] = me.dateNow.getDate() + "-" + (me.dateNow.getMonth() + 1) + "-" + me.dateNow.getFullYear();
                me.value["time_sekarang"] = me.dateNow.getHours() + ":" + me.dateNow.getMinutes() + ":" + me.dateNow.getSeconds();
                me.value["project_id"] = apps.project;
                me.value["pt_id"] = apps.pt;
                me.value['datajurnal'] = (me.getValue(me, "journal", 'value') == '1') ? "All Data" : "Before Posting";
                me.value['datasub'] = (me.getValue(me, "subdetail", 'value') == '1') ? "No Sub" : "With Sub";
                var basedata = '';
                switch (me.value.baseondata) {
                    case "1":
                        basedata = "Voucher Date";
                        break;
                    case "2":
                        basedata = "Account Code";
                        break;
                    case "3":
                        basedata = "Voucher Type";
                        break;
                }



                me.value['databaseon'] = basedata;

                //me.urlrequest = 'gl/dailytransaction/create';
                //me.senddata = me.value;
                //me.AjaxRequest();

                me.checksub = me.getValue(me, "subdetail", 'value');
                if (me.checksub == '1') {
                    me.report = me.reportnosub;
                } else {
                    me.report = me.reportwithsub;
                }

                me.html = me.generateFakeForm(me.value, me.report);
                me.win.down("#MyReportPanel").body.setHTML(me.html);
                $("#fakeReportFormID").submit();

            }


        }

    },
    defaultDisable: function () {
        var me, form = null;
        me = this;
        form = me.getFormdata();
        form.down("[name=dailyinputfromdate]").setDisabled(true);
        form.down("[name=dailyinputuntildate]").setDisabled(true);
        form.down("[name=dailycoa_id]").setDisabled(true);
        form.down("[name=dailyprefix_id_from]").setDisabled(true);
        form.down("[name=dailyprefix_id_until]").setDisabled(true);
        form.down("[name=journal_id_from]").setDisabled(true);
        form.down("[name=journal_id_until]").setDisabled(true);
        form.down("[name=namecoa]").setReadOnly(true);
    },
    defaultRange: function () {
        var me = '';
        me = this;
        me.senddata = {
            hideparam: 'defaultrange'
        }
        me.urlrequest = 'gl/dailytransaction/create';
        me.AjaxRequest();
    },
    getCOAbyID: function () {
        var me = '';
        me = this;
        me.senddata = {
            hideparam: 'getcoabyid',
            coa_id: me.coa_id,
        }
        me.urlrequest = 'gl/dailytransaction/create';
        me.AjaxRequest();

    },
    panelAfterRender: function () {
        var me = this;
        Ext.Ajax.request({
            url: me.urlprocess,
            success: function (response) {
                var info = Ext.JSON.decode(response.responseText);
                me.project_name = info.project_name;
                me.pt_name = info.pt_name;
                me.userprint = info.userprint;
            },
        });
    },
    formDataAfterRenderCustome: function () {
        var me, storecoa, storeprefix, storevoucher = '';
        me = this;
        
        me.defaultRange();
        me.defaultDisable();
        
        storecoa = me.getStore('Coacombo');
        storeprefix = me.getStore('Prefixcombo');
        storevoucher = me.getStore('Journal');

        storecoa.load({
            params: {
                "hideparam": 'default',
                "start": 0,
                "limit": 1000000,
            },
        });
        storevoucher.load({
            params: {
                "hideparam": 'forreport',
                "start": 0,
                "limit": 1000000,
            },
        });

        storeprefix.load({
            params: {
                "hideparam": 'default',
                "start": 0,
                "limit": 1000000,
            },
            callback: function (records, operation, success) {
                storeprefix.filter('cashier', 'N');
                storeprefix.sort('prefix', 'ASC');
            }
        });
       

    },
    AjaxRequest: function () {
        var me;
        me = this;
        Ext.Ajax.request({
            url: me.urlrequest,
            method: 'POST',
	    timeout:100000000,	
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
        var me = this;
        if (me.info.parameter == 'default') {
            if (me.info.counter < 1) {
                Ext.getBody().unmask();
                me.buildWarningAlert(me.info.message);
            } else {
                Ext.getBody().unmask();
                Ext.Msg.show({
                    title: 'Success',
                    msg: 'Process  data successfully.',
                    icon: Ext.Msg.INFO,
                    buttons: Ext.Msg.OK,
                    fn: function () {
                        me.formDataClose();
                    }
                });
            }
        } else if (me.info.parameter == 'defaultrange') {
            var form = me.getFormdata();
            Ext.getBody().unmask();
            me.setValue(me, 'dailytrxfromdate', me.info.data.onedate);
            me.setValue(me, 'dailytrxuntildate', me.info.data.onedate);
            me.yeardata = me.info.data.yeardb;
            form.down("[name=dailytrxfromdate]").setMinValue(me.yeardata + '-01-01');
            form.down("[name=dailytrxfromdate]").setMaxValue(me.info.data.enddecember);
            form.down("[name=dailytrxuntildate]").setMinValue(me.yeardata + '-01-01');
            form.down("[name=dailytrxuntildate]").setMaxValue(me.info.data.enddecember);

        } else if (me.info.parameter == 'getcoabyid') {
            me.setValue(me, 'namecoa', me.info.data[1][0].name);
        } else if (me.info.parameter == 'default') {
            Ext.getBody().unmask();
        }
    }

});