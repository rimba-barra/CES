Ext.define('Gl.controller.Changenumberordatevoucher', {
    extend: 'Gl.library.template.controller.Controllergl',
    alias: 'controller.Changenumberordatevoucher',
    requires: [
        'Gl.library.template.combobox.Coacombobox',
        'Gl.library.template.combobox.Prefixcombobox',
        'Gl.library.template.combobox.Vouchernocomboboxchange',
    ],
    views: [
        'changenumberordatevoucher.Panel',
        'changenumberordatevoucher.FormData',
        'changenumberordatevoucher.FormDataChangeJournal',
        'changenumberordatevoucher.ChangeAccountJournalGrid',
        'changenumberordatevoucher.ChangeSubAccountGrid',
    ],
    stores: [
        'Changenumberordatevoucher',
        'ChangeJournal',
        'ChangeAccountJournal',
        'ChangeSubAccountJournal',
        'ChangeSummaryJournal',
        'Prefixcombo',
    ],
    models: [
        'Coa',
        'Changenumberordatevoucher',
        'ChangeJournal',
        'ChangeAccountJournal',
        'ChangeSubAccountJournal',
        'ChangeSummaryJournal',
        'Kodeprefix',
    ],
    refs: [
        {ref: 'formdata', selector: 'changenumberordatevoucherformdata'},
        {ref: 'formdatajournal', selector: 'changejournalformdata'},
        {ref: 'paneldata', selector: 'changenumberordatevoucherpanel'},
        {ref: 'gridaccount', selector: 'changeaccountjournalgrid'},
        {ref: 'gridsub', selector: 'changesubaccountgrid'},
    ],
    controllerName: 'changenumberordatevoucher',
    fieldName: '',
    bindPrefixName: 'Changenumberordatevoucher',
    urlprocess: 'gl/changenumberordatevoucher/create',
    urlrequest: null, senddata: null, info: null, form: null, msg: null, yeardata: null,
    voucher: null,
    init: function (application) {
        var me = this;
        this.control({
            'changenumberordatevoucherpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: function (panel) {
                    Ext.get('WINDOW-mnu' + me.bindPrefixName).setHeight(230);
                    // panel.up('window').setHeight(300);
                    panel.up('window').setWidth(650);
                }
            },
            'changenumberordatevoucherformdata': {
                afterrender: function (panel) {
                    //panel.up('window').maximize();
                    this.formDataAfterRenderCustome();

                }
            },
            'changenumberordatevoucherformdata [name=statusposting]': {
                change: function () {
                    me.clearData();
                }
            },
            'changenumberordatevoucherformdata [name=fromprefix_id]': {
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
                    storevoucher = me.getStore('ChangeJournal');
                    storevoucher.clearFilter(true);
                    storevoucher.filterBy(function (rec, id) {
                        return rec.data.prefix_id == prefix_id && rec.data.is_post == posting;
                    });
                }
            },
            'changenumberordatevoucherformdata [name=fromvoucherno]': {
                select: function (panel) {
                    var row, form, Y, m, d, voucherno, voucherdate, statusposting, storevoucher;
                    form = me.getFormdata();
                    voucherno = form.down("[name=fromvoucherno]").getValue();
                    storevoucher = me.getStore('ChangeJournal');
                    storevoucher.filterBy(function (rec, id) {
                        return rec.data.journal_id == voucherno;
                    });
                    row = storevoucher.getAt(0)['data'];
                    me.setValue(me, 'fromvoucherdate', row.voucher_date);
                }
            },
            'changenumberordatevoucherformdata [name=untilprefix_id]': {
                select: function (panel) {
                    var row, form, prefix;
                    form = me.getFormdata();
                    form.down("[name=voucherno_new]").setValue(null);
                    prefix = me.getValue(me, 'untilprefix_id', 'raw');
                    me.setValue(me, 'voucherno_new', prefix + "0000");
                    me.voucher = prefix + "0000";

                }
            },
            'changenumberordatevoucherformdata [name=voucherno_new]': {
                blur: function (panel) {
                    var row, form, voucherno;
                    form = me.getFormdata();
                    voucherno = me.getValue(me, 'voucherno_new', 'value');
                    me.voucher = voucherno;
                }
            },
            'changenumberordatevoucherformdata [name=untilvoucherdate]': {
                blur: function (panel) {
                    var row, form, voucherno, voucherdate, date;
                    form = me.getFormdata();
                    form.down("[name=voucherno_new]").setValue(null);
                    voucherdate = me.getValue(me, 'untilvoucherdate', 'raw');
                    date = voucherdate.split("-");
                    me.setValue(me, 'voucherno_new', me.voucher + "/" + date[1]);
                    me.checkData();
                }
            },
            'changenumberordatevoucherformdata button[action=process]': {
                click: function () {
                    me.Processdata();
                }
            },
            'changenumberordatevoucherformdata button[action=view]': {
                click: function () {
                    var state, width, title, locationform;
                    state = 'view';
                    width = '1000';
                    title = 'Formdata Journal View';
                    locationform = 'Gl.view.changenumberordatevoucher.FormDataChangeJournal';

                    me.FormDataCustomeShow(state, width, title, locationform);
                }
            },
            'changejournalformdata': {
                boxready: function () {
                    me.loaddataJournal();
                }
            },
            'changeaccountjournalgrid': {
                select: this.gridAccountJournalSelect,
            },
        });
    },
    formDataAfterRenderCustome: function () {
        var me, storeprefix, storevoucher = '';
        me = this;
        me.defaultRange();

        storeprefix = me.getStore('Prefixcombo');
        storevoucher = me.getStore('ChangeJournal');

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
    checkData: function () {
        var me;
        me = this;
        me.senddata = {
            hideparam: 'checkdata',
            tovoucherno: me.getValue(me, "voucherno_new", 'value')
        }
        me.urlrequest = me.urlprocess;
        me.AjaxRequest();
    },
    confirmData: function () {
        var me;
        me = this;
        Ext.Msg.show({
            title: 'Process change Voucher Number,Date and Prefix',
            msg: 'Are you sure to Processing Change Voucher Number,Date and Prefix...?',
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
                    me.changeData();
                }
            },
            icon: Ext.Msg.QUESTION
        });

    },
    changeData: function () {
        var me;
        me = this;
        Ext.getBody().mask("Please wait....");
        Ext.Ajax.request({
            url: me.urlprocess,
            method: 'POST',
            params: {
                data: Ext.encode(
                        {
                            hideparam: 'default',
                            fromprefix_id: me.getValue(me, "fromprefix_id", 'value'),
                            fromprefix: me.getValue(me, "fromprefix_id", 'raw'),
                            toprefix_id: me.getValue(me, "untilprefix_id", 'value'),
                            toprefix: me.getValue(me, "untilprefix_id", 'raw'),
                            fromvoucherno: me.getValue(me, "fromvoucherno", 'raw'),
                            tovoucherno: me.getValue(me, "voucherno_new", 'value'),
                            fromvoucherdate: me.getValue(me, "fromvoucherdate", 'raw'),
                            tovoucherdate: me.getValue(me, "untilvoucherdate", 'raw'),
                        }
                )
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
    Processdata: function () {
        var me = '';
        me = this;
        me.form = me.getFormdata().getForm();
        if (me.form.isValid()) {
            resetTimer();
            me.checkData();
            me.confirmData();
        }
    },
    loaddataJournal: function () {
        var me, year, form, date, prefix, voucherno,
                voucherdate, storejournal, storeaccount,
                storesub, fieldjournal;

        me = this;
        form = me.getFormdatajournal();

        year = me.yeardata;
        prefix = me.getValue(me, "fromprefix_id", "raw");
        voucherno = me.getValue(me, "fromvoucherno", "raw");
        voucherdate = me.getValue(me, "fromvoucherdate", "raw");
        date = voucherdate.split("-");

        storejournal = me.getStore('ChangeJournal');
        storeaccount = me.getStore('ChangeAccountJournal');
        storesub = me.getStore('ChangeSubAccountJournal');

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
        me.urlrequest = 'gl/dailytransaction/create';
        me.AjaxRequest();
    },
    clearData: function () {
        var me;
        me = this;
        me.setValueCombobox(me, "fromprefix_id", null, null);
        me.setValueCombobox(me, "fromvoucherno", null, null);
        me.setValue(me, "fromvoucherdate", null);
    },
    AjaxRequest: function () {
        var me;
        me = this;
        Ext.Ajax.request({
            url: me.urlrequest,
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
        var me = this;
        var form = me.getFormdata();

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
            form.down("[name=untilvoucherdate]").setMinValue(me.yeardata + '-01-01');
            form.down("[name=untilvoucherdate]").setMaxValue(me.yeardata + '-12-31');
        } else if (me.info.parameter == 'default') {
            Ext.getBody().unmask();
        } else if (me.info.parameter == 'checkdata') {
            if (me.info.counter > 0) {
                form.down("button[action=process]").setDisabled(true);
                me.buildWarningAlert(me.info.message);
            } else {
                //jika berhasil
                form.down("button[action=process]").setDisabled(false);
            }

        }
    },
});