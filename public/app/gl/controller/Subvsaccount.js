Ext.define('Gl.controller.Subvsaccount', {
    extend: 'Gl.library.template.controller.Controllergl',
    alias: 'controller.Subvsaccount',
    requires: [
        'Gl.template.ComboBoxFields',
        'Gl.library.template.combobox.Coacomboboxgrid',
        'Gl.library.template.combobox.Coagrid',
        'Gl.library.template.combobox.Prefixcombobox',
    ],
    views: [
        'subvsaccount.Panel',
        'subvsaccount.Grid',
        'subvsaccount.SubvsAccountAccountJournalGrid',
        'subvsaccount.SubvsAccountSubAccountGrid',
        'subvsaccount.FormSearch',
        'subvsaccount.FormData',
    ],
    stores: [
        'Subvsaccount',
        'SubvsAccountJournal',
        'SubvsAccountAccountJournal',
        'SubvsAccountSubAccountJournal',
        'Coacombo',
        'Prefixcombo',
    ],
    models: [
        'Subvsaccount',
        'SubvsAccountJournal',
        'SubvsAccountAccountJournal',
        'SubvsAccountSubAccountJournal',
        'Coa',
        'Kodeprefix',
    ],
    refs: [
        {
            ref: 'paneldata',
            selector: 'subvsaccountpanel'
        },
        {
            ref: 'grid',
            selector: 'subvsaccountgrid'
        },
        {
            ref: 'gridaccount',
            selector: 'subvsaccountaccountjournalgrid'
        },
        {
            ref: 'gridsub',
            selector: 'subvsaccountsubaccountgrid'
        },
        {
            ref: 'formsearch',
            selector: 'subvsaccountformsearch'
        },
        {
            ref: 'formdata',
            selector: 'subvsaccountformdata'
        },
    ],
    controllerName: 'subvsaccount',
    fieldName: 'voucher_no',
    bindPrefixName: 'Subvsaccount',
    urlrequest: null, senddata: null, info: null, form: null,
    stimulsoft: "resources/stimulsoft/index.php?stimulsoft_client_key=ViewerFx&stimulsoft_report_key=",
    project_name: null, pt_name: null, userprint: null, paramsStr: null, win: null, params: null, dateNow: new Date(),
    html: null, winId: 'myReportWindow', report: null, journal_id: null, voucher_no: null,
    init: function (application) {
        var me = this;
        this.control({
            'subvsaccountpanel': {
                //beforerender: me.mainPanelBeforeRender,
                afterrender: function (panel) {
                    panel.up('window').maximize();
                },
            },
            'subvsaccountgrid': {
                afterrender: this.gridAfterRenderCustome,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange
            },
            'subvsaccountaccountjournalgrid': {
                select: this.gridAccountJournalSelect,
            },
            'subvsaccountaccountjournalgrid actioncolumn': {
                click: this.gridActionColumnClickCustome
            },
            'subvsaccountgrid toolbar button[action=process]': {
                click: function () {
                    me.getDatasubnothave();
                }
            },
            'subvsaccountgrid toolbar button[action=destroyall]': {
                click: function () {
                    me.Deleteall();
                }
            },
            'subvsaccountgrid toolbar button[action=view]': {
                click: function () {
                    me.Reportdata();
                }
            },
            'subvsaccountformsearch [name=fromcoa] ': {
                'keyup': function () {
                    var me, value;
                    me = this;
                    value = me.getFormsearch().down("[name=fromcoa]").getRawValue();
                    this.autocompletecombo(value);
                },
            },
            'subvsaccountformsearch [name=untilcoa] ': {
                'keyup': function () {
                    var me, value;
                    me = this;
                    value = me.getFormsearch().down("[name=untilcoa]").getRawValue();
                    this.autocompletecombo(value);
                },
            },
            'subvsaccountgrid toolbar button[action=print]': {
                click: this.dataPrint
            },
            'subvsaccountgrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                click: this.gridActionColumnClick
            },
            'subvsaccountformsearch button[action=search]': {
                click: this.dataSearch
            },
            'subvsaccountformsearch button[action=reset]': {
                click: this.dataReset
            },
            'subvsaccountformdata': {
                afterrender: this.formDataAfterRenderCustome
            },
            'subvsaccountformdata button[action=save]': {
                click: this.dataSave
            },
            'subvsaccountformdata button[action=cancel]': {
                click: this.formDataClose
            },
        });
    },
    formDataAfterRenderCustome: function () {
        var me, year, form, date, prefix, voucherno,
                voucherdate, storejournal, storeprefix, storeaccount,
                storesub, storeprefix, fieldjournal;

        me = this;


        prefix = me.params.prefix_id;
        voucherno = me.params.voucher_no;
        voucherdate = me.params.voucher_date;
        date = voucherdate.split("-");
        year = date[0];


        storeaccount = me.getStore('SubvsAccountAccountJournal');
        storesub = me.getStore('SubvsAccountSubAccountJournal');
        storeaccount.clearFilter(true);
        storesub.clearFilter(true);

        fieldjournal = me.params;
        form = me.getFormdata();

        form.down("[name=prefix_id]").setValue(prefix);
        form.down("[name=no_generate]").setValue(me.voucher_no);
        form.down("[name=voucher_date]").setValue(voucherdate);
        form.down("[name=generate_month]").setValue(date[1]);
        form.down("[name=voucher_no]").setValue(fieldjournal.voucher_no);
        form.down("[name=debit_total]").setValue(Ext.util.Format.number(fieldjournal.debit_total, '0,000.00'));
        form.down("[name=credit_total]").setValue(Ext.util.Format.number(fieldjournal.credit_total, '0,000.00'));
        form.down("[name=selisih]").setValue(Ext.util.Format.number(fieldjournal.selisih, '0,000.00'));


        var girdaccount = me.getGridaccount();
        storeaccount.load({
            params: {
                "hideparam": 'changeyear',
                "dbyear": year,
                "journal_id": me.journal_id,
                "voucherno": me.voucher_no,
                "start": 0,
                "limit": 1000,
            },
            callback: function (records, operation, success) {
                storeaccount.sort('journaldetail_id_acc', 'ASC');
                girdaccount.getSelectionModel().select(0, true);
            }
        });

        storesub.load({
            params: {
                "hideparam": 'changeyear',
                "dbyear": year,
                "journal_id": me.journal_id,
                "voucherno": me.voucher_no,
                "start": 0,
                "limit": 1000,
            },
            callback: function (records, operation, success) {
                storesub.sort('journalsubdetail_id_sub', 'ASC');
            }
        });

    },
    gridActionColumnClickCustome: function (view, cell, row, col, e) {


    },
    gridAccountJournalSelect: function () {
        var me, grid, storeaccount, storesub, record, row = '';
        me = this;
        grid = me.getGridaccount();
        storeaccount = grid.getStore();
        row = grid.getSelectionModel().getSelection()[0];
        if (row.get('journaldetail_id_acc') > 0) {
            storesub = me.getGridsub().getStore();
            storesub.clearFilter(true);
            storesub.filter('journaldetail_id_sub', row.get('journaldetail_id_acc'));
            if (row.get('kelsub_acc') == '') {
                me.getFormdata().down("[name=subaccountjournalgrid]").setVisible(false);
            } else {
                me.getFormdata().down("[name=subaccountjournalgrid]").setVisible(true);
            }
        }
    },
    execAction: function (el, action, me) {
        var me, store, grid, object, row, journal_id;
        store = me.getGrid().getStore();
        grid = me.getGrid();
        object = grid.getSelectionModel().getSelection();
        row = object[0].data;
        me.params = row;
        me.journal_id = row.journal_id;
        me.voucher_no = row.voucher_no;

        if (!action) {
            action = '';
        }
        if (!me) {
            me = this;
        }

        if (action == me.bindPrefixName + 'Read') {
            me.params = row;
            me.journal_id = row.journal_id;
            me.senddata = {
                "hideparam": 'searcjournal',
                "voucher_no": row.voucher_no,
                "is_post": 2,
                "start": 0,
                "limit": 100,
            }
            me.urlrequest = 'gl/accountvssub/create';
            me.AjaxRequest();


        } else if (action == me.bindPrefixName + 'Delete') {
            me.dataDestroy(el);
        }

    },
    getFormJournal: function () {
        var me, state, width, title, locationform;
        me = this;
        state = 'view';
        width = '1000';
        title = 'Formdata Journal View';
        locationform = 'Gl.view.subvsaccount.FormData';
        me.FormDataCustomeShow(state, width, title, locationform);
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
    Deleteall: function () {
        var me = '';
        me = this;

        Ext.Msg.show({
            title: 'Sub account vs Account',
            msg: 'Are you sure Delete All this data..?',
            width: 300,
            closable: false,
            buttons: Ext.Msg.YESNO,
            buttonText:
                    {
                        yes: 'YES',
                        no: 'CANCEL'
                    },
            multiline: false,
            fn: function (buttonValue, inputText, showConfig) {
                if (buttonValue == 'yes') {
                    Ext.getBody().mask("Please wait...");
                    var form = me.getFormsearch();
                    me.senddata = {
                        hideparam: 'deleteall',
                        "fromcoa": form.down("[name=fromcoa]").getRawValue(),
                        "untilcoa": form.down("[name=untilcoa]").getRawValue(),
                        "fromdate": form.down("[name=fromdate]").getRawValue(),
                        "untildate": form.down("[name=untildate]").getRawValue()
                    }
                    me.urlrequest = 'gl/subvsaccount/create';
                    me.AjaxRequest();
                }
            },
            icon: Ext.Msg.QUESTION
        });




    },
    getDatasubnothave: function () {
        var me, store, form;
        me = this;
        store = me.getStore('Subvsaccount');
        form = me.getFormsearch().getValues();
        store.reload({
            params: form
        });
    },
    gridAfterRenderCustome: function () {
        var me, storecoa, storeprefix, form;
        me = this;
        me.panelAfterRender();
        me.defaultRange();
        form = me.getFormsearch();
        storecoa = me.getStore('Coacombo');
        storeprefix = me.getStore('Prefixcombo');
        storeprefix.load({
            params: {
                "hideparam": 'default',
                "start": 0,
                "limit": 1000000,
            },
            callback: function (records, operation, success) {
                storeprefix.sort('prefix', 'ASC');
            }
        });
        storecoa.load({
            params: {
                "hideparam": 'foraccountvssub',
                "start": 0,
                "limit": 1000000,
            },
            callback: function (records, operation, success) {
                if (records[0]) {
                    var firstdata = records[0]['data'];
                    form.down("[name=fromcoa]").setValue(firstdata.coa_id);
                    form.down("[name=fromcoa]").setRawValue(firstdata.coa);
                }

                if (records[storecoa.getCount() - 1]) {
                    var lastdata = records[storecoa.getCount() - 1]['data'];
                    form.down("[name=untilcoa]").setValue(lastdata.coa_id);
                    form.down("[name=untilcoa]").setRawValue(lastdata.coa);
                }


                var store = me.getStore('Subvsaccount');
                store.load({
                    params: {
                        "hideparam": 'search',
                        "fromcoa": form.down("[name=fromcoa]").getRawValue(),
                        "untilcoa": form.down("[name=untilcoa]").getRawValue(),
                        "fromdate": form.down("[name=fromdate]").getRawValue(),
                        "untildate": form.down("[name=untildate]").getRawValue()
                    }
                });
            }
        });

    },
    autocompletecombo: function (value) {
        var me, storecoa, value;
        me = this;
        storecoa = me.getStore('Coacombo');
        storecoa.clearFilter();
        storecoa.filter('coa', value);
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
            var form = me.getFormsearch();
            me.yeardata = me.info.data.yeardb;

            form.down("[name=fromdate]").setValue(me.yeardata + '-01-01');
            form.down("[name=untildate]").setValue(me.info.data.onedate);
            form.down("[name=fromdate]").setMinValue(me.yeardata + '-01-01');
            form.down("[name=fromdate]").setMaxValue(me.info.data.enddecember);
            form.down("[name=untildate]").setMinValue(me.yeardata + '-01-01');
            form.down("[name=untildate]").setMaxValue(me.info.data.enddecember);

            me.getDatasubnothave();

        } else if (me.info.parameter == 'default') {
            Ext.getBody().unmask();
        } else if (me.info.parameter == 'deleteall') {
            Ext.getBody().unmask();
            me.getDatasubnothave();
        } else if (me.info.parameter == 'searcjournal') {
            me.params = me.info.data[0];
            me.getFormJournal();
        }
    },
    Reportdata: function () {
        var me;
        me = this;
        Ext.getBody().mask("Please wait...");
        me.createWindows();
        me.arrayData();
        me.submitReport();
    },
    arrayData: function () {
        var me;
        me = this;
        me.value = me.getFormsearch().getValues();
        me.value["fromcoa"] = null;
        me.value["untilcoa"] = null;
        me.value["project_name"] = me.project_name;
        me.value["pt_name"] = me.pt_name;
        me.value["userprint"] = me.userprint;
        me.value["tgl_sekarang"] = me.dateNow.getDate() + "-" + (me.dateNow.getMonth() + 1) + "-" + me.dateNow.getFullYear();
        me.value["time_sekarang"] = me.dateNow.getHours() + ":" + me.dateNow.getMinutes() + ":" + me.dateNow.getSeconds();
        me.value["project_id"] = apps.project;
        me.value["pt_id"] = apps.pt;

    },
    createWindows: function () {
        var me = this;
        me.instantWindow('Panel', 800, 'Result ', 'state-report', me.winId, 'masterreport');
        me.win = desktop.getWindow(me.winId);
    },
    submitReport: function () {
        var me = this;
        me.report = 'Subvsaccount';
        me.html = me.generateFakeForm(me.value, me.report);
        me.win.down("#MyReportPanel").body.setHTML(me.html);
        $("#fakeReportFormID").submit();
        Ext.getBody().unmask();
    },
    gridSelectionChange: function () {

    },
    panelAfterRender: function () {
        var me = this;
        Ext.Ajax.request({
            url: 'gl/balancesheet/read',
            success: function (response) {
                var info = Ext.JSON.decode(response.responseText);
                me.project_name = info.project_name;
                me.pt_name = info.pt_name;
                me.userprint = info.userprint;
            },
        });
    },
});