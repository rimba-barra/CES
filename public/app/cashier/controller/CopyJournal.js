Ext.define('Cashier.controller.Copyjournal', {
    extend: 'Cashier.library.template.controller.Controllergl',
    alias: 'controller.Copyjournal',
    requires: [
        'Cashier.library.template.combobox.Yeardbcombobox',
        'Cashier.library.template.combobox.Prefixcombobox',
        'Cashier.library.template.combobox.Vouchernocomboboxcopy',
    ],
    views: [
        'copyjournal.Panel',
        'copyjournal.FormData',
        'copyjournal.FormDataCopyJournal',
        'copyjournal.CopyAccountJournalGrid',
        'copyjournal.CopySubAccountGrid',
    ],
    stores: [
        'Copyjournal',
        'CopydataJournal',
        'CopyAccountJournal',
        'CopySubAccountJournal',
        'CopySummaryJournal',
        'Yearcombo',
        'Prefixcombo',
    ],
    models: [
        'Coa',
        'Copyjournal',
        'CopydataJournal',
        'CopyAccountJournal',
        'CopySubAccountJournal',
        'CopySummaryJournal',
        'Yearcombo',
        'Kodeprefix',
    ],
    refs: [
        {ref: 'paneldata', selector: 'copyjournalpanel'},
        {ref: 'gridaccount', selector: 'copyaccountjournalgrid'},
        {ref: 'gridsub', selector: 'copysubaccountgrid'},
        {ref: 'formdata', selector: 'copyjournalformdata'},
        {ref: 'formdatajournal', selector: 'copydatajournalformdata'},
    ],
    controllerName: 'copyjournal',
    fieldName: '',
    bindPrefixName: 'Copyjournal',
    urlprocess: 'cashier/copyjournal/create',
    urlrequest: null, senddata: null, info: null, form: null, msg: null,
    init: function (application) {
        var me = this;
        this.control({
            'copyjournalpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: function (panel) {
                    Ext.get('WINDOW-mnu' + me.bindPrefixName).setHeight(260);
                    panel.up('window').setWidth(650);
                }
            },
            'copyjournalformdata': {
                afterrender: function (panel) {
                    //panel.up('window').maximize();
                    this.formDataAfterRenderCustome();

                }
            },
            'copyjournalformdata [name=voucheryear]': {
                select: function (panel) {
                    me.changeYear();

                }
            },
            'copyjournalformdata [name=statusposting]': {
                change: function () {
                    me.clearData();
                }
            },
            'copyjournalformdata [name=fromprefix_id]': {
                select: function (panel) {
                    var prefix_id, form, statusposting, posting, storevoucher;
                    form = me.getFormdata();
                    me.setValueCombobox(me, "fromvoucherno", null, null);
                    me.setValue(me, "fromvoucherdate", null);

                    prefix_id = this.getValue(me, "fromprefix_id", 'value');
                    statusposting = this.getValue(me, "statusposting", 'value');

                    if (statusposting == false) {
                        posting = true;
                    } else {
                        posting = false;
                    }
                    storevoucher = me.getStore('CopydataJournal');
                    storevoucher.clearFilter(true);
                    storevoucher.filterBy(function (rec, id) {
                        return rec.data.prefix_id == prefix_id && rec.data.is_post == posting;
                    });

                }
            },
            'copyjournalformdata [name=fromvoucherno]': {
                select: function (panel) {
                    var row, form, Y, m, d, voucherno, voucherdate, statusposting, storevoucher;
                    form = me.getFormdata();
                    voucherno = form.down("[name=fromvoucherno]").getValue();
                    storevoucher = me.getStore('CopydataJournal');
                    storevoucher.filterBy(function (rec, id) {
                        return rec.data.journal_id == voucherno;
                    });
                    row = storevoucher.getAt(0)['data'];
                    me.setValue(me, 'fromvoucherdate', row.voucher_date);
                }
            },
            'copyjournalformdata button[action=view]': {
                click: function () {
                    var state, width, title, locationform;

                    state = 'view';
                    width = '1000';
                    title = 'Formdata Journal View';
                    locationform = 'Cashier.view.copyjournal.FormDataCopyJournal';

                    me.FormDataCustomeShow(state, width, title, locationform);
                }
            },
            'copyjournalformdata button[action=process]': {
                click: function () {
                    me.processData();
                }
            },
            'copydatajournalformdata': {
                boxready: function () {
                    me.loaddataJournal();
                }
            },
            'copyaccountjournalgrid': {
                select: this.gridAccountJournalSelect,
            },
        });
    },    
    processData: function () {
        var me, form, year, voucherno_old, prefix,prefix_id, voucherdate;
        me = this;

        form = me.getFormdata().getForm();
        if (form.isValid()) {
            resetTimer();
            year = me.getValue(me, "voucheryear", 'raw');
            voucherno_old = me.getValue(me, "fromvoucherno", "raw");
            prefix = me.getValue(me, "untilprefix_id", "raw");
            prefix_id = me.getValue(me, "untilprefix_id", "value");
            voucherdate = me.getValue(me, "untilvoucherdate", "raw");

            me.senddata = {
                hideparam: 'create',
                year: year,
                voucher_no_old: voucherno_old,
                prefix: prefix,
                prefix_id: prefix_id,
                voucherdate: voucherdate
            }

            me.urlrequest = me.urlprocess;
            Ext.getBody().mask("Please wait...");
            me.AjaxRequest();


        }


    },
    loaddataJournal: function () {
        var me, year, form, date, prefix, voucherno,
                voucherdate, storejournal, storeaccount,
                storesub, fieldjournal;

        me = this;
        form = me.getFormdatajournal();

        year = me.getValue(me, "voucheryear", 'raw');
        prefix = me.getValue(me, "fromprefix_id", "raw");
        voucherno = me.getValue(me, "fromvoucherno", "raw");
        voucherdate = me.getValue(me, "fromvoucherdate", "raw");
        date = voucherdate.split("-");

        storejournal = me.getStore('CopydataJournal');
        storeaccount = me.getStore('CopyAccountJournal');
        storesub = me.getStore('CopySubAccountJournal');

        storejournal.clearFilter(true);
        storeaccount.clearFilter(true);
        storesub.clearFilter(true);

        storejournal.filter('no_generate', voucherno);
        fieldjournal = storejournal.getAt(0)['data'];

        form.down("[name=prefix_id]").setRawValue(prefix);
        form.down("[name=no_generate]").setValue(voucherno);
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
                "journal_id": fieldjournal.journal_id,
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
                "journal_id": fieldjournal.journal_id,
                "start": 0,
                "limit": 1000,
            },
            callback: function (records, operation, success) {
                storesub.sort('journalsubdetail_id_sub', 'ASC');
            }
        });

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
                me.getFormdatajournal().down("[name=subaccountjournalgrid]").setVisible(false);
            } else {
                me.getFormdatajournal().down("[name=subaccountjournalgrid]").setVisible(true);
            }
        }
    },
    defaultRange: function () {
        var me = '';
        me = this;
        me.senddata = {
            hideparam: 'defaultrange'
        }
        me.urlrequest = 'cashier/dailytransaction/create';
        me.AjaxRequest();
    },
    changeYear: function () {
        var me, year, storeprefix, storevoucher = '';
        me = this;
        storeprefix = me.getStore('Prefixcombo');
        storevoucher = me.getStore('CopydataJournal');
        year = me.getValue(me, "voucheryear", 'raw');


        storeprefix.reload({
            params: {
                "hideparam": 'changeyear',
                "dbyear": year,
                "start": 0,
                "limit": 1000000,
            },
            callback: function (records, operation, success) {
                storeprefix.filter('cashier', 'N');
                storeprefix.sort('prefix', 'ASC');
            }
        });

        storevoucher.reload({
            params: {
                "hideparam": 'changeyear',
                "dbyear": year,
                "start": 0,
                "limit": 100000,
            },
        });
        me.clearData();
    },
    clearData: function () {
        var me;
        me = this;
        me.setValueCombobox(me, "fromprefix_id", null, null);
        me.setValueCombobox(me, "fromvoucherno", null, null);
        me.setValue(me, "fromvoucherdate", null);
    },
    formDataAfterRenderCustome: function () {
        var me, storelistyear, storeprefix, storevoucher = '';
        me = this;

        me.defaultRange();


        storelistyear = me.getStore('Yearcombo');
        storeprefix = me.getStore('Prefixcombo');
        storevoucher = me.getStore('CopydataJournal');

        storelistyear.load({
            params: {
                "hideparam": 'listyear',
                "start": 0,
                "limit": 200,
            },
            callback: function (records, operation, success) {
                storelistyear.sort('dbapps_year', 'DESC');
            }
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
        storevoucher.load({
            params: {
                "hideparam": 'forreport',
                "start": 0,
                "limit": 100000,
            },
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
            me.yeardata = me.info.data.yeardb;
            me.setValue(me, "voucheryear", me.yeardata);
            form.down("[name=untilvoucherdate]").setMinValue(me.yeardata + '-01-01');
            form.down("[name=untilvoucherdate]").setMaxValue(me.yeardata + '-12-31');

        } else if (me.info.parameter == 'getcoabyid') {
            me.setValue(me, 'namecoa', me.info.data[1][0].name);
        } else if (me.info.parameter == 'default') {
            Ext.getBody().unmask();
        } else if (me.info.parameter == 'create') {
            Ext.getBody().unmask();
        }
    },
});