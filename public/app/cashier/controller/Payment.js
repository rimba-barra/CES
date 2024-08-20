Ext.define('Cashier.controller.Payment', {
    extend: 'Cashier.library.template.controller.Controllermodule',
    alias: 'controller.Payment',
    requires: [
        'Ext.EventObject',
        'Cashier.template.ComboBoxFields',
        'Cashier.library.template.combobox.Ptusercombobox',
        'Cashier.library.template.combobox.Prefixcombobox',
        'Cashier.library.template.combobox.Inoutcombobox',
        'Cashier.library.template.combobox.Departmentcombobox',
    ],
    views: [
        'payment.Panel',
        'payment.Grid',
        'payment.Gridview',
        'payment.Gridcoadetail',
        'payment.FormSearch',
        'payment.Formviewdata',
        'payment.FormPayment',
    ],
    stores: [
        'TPaymentcash',
        'TPaymentcia',
        'TPaymentcoadetail',
        'TPaymentvendor',
        'Ptbyuser',
        'Voucherprefixsetupcombo',
        'Inout',
        'Department',
    ],
    models: [
        'TPaymentcash',
        'TPaymentcia',
        'TPaymentcoadetail',
        'TPaymentvendor',
    ],
    refs: [
        {ref: 'grid', selector: 'paymentgrid'},
        {ref: 'griddetail', selector: 'paymentcoadetailgrid'},
        {ref: 'gridview', selector: 'paymentgridview'},
        {ref: 'formsearch', selector: 'paymentformsearch'},
        {ref: 'formview', selector: 'paymentformview'},
        {ref: 'formdata', selector: 'paymentformdata'},
        {ref: 'formpayment', selector: 'paymentformpayment'},
    ],
    controllerName: 'payment',
    fieldName: 'payment',
    bindPrefixName: 'Payment',
    formWidth: 800,
    urlrequest: 'cashier/payment/create', arraydata: null, counterdata: 0,
    senddata: null, info: null, rowproject: null, storept: null, state: null, dateNow: new Date(),
    idheaderfield: 'kasbank_id', idheadervalue: 0, pt_id: 0, rowheader: null, recordheader: null,
    actiondialog: null, titledialog: null, msgdialog: null, eventconfirm: null, coa_tmp: null,
    messagedata: null,
    init: function (application) {
        var me = this;
        this.control({
            'paymentpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: function (panel) {
                    this.panelAfterRender();
                    panel.up('window').maximize();
                },
            },
            'paymentgrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                select: this.gridSelect,
                boxready: function () {
                    var grid, store, counter;
                    grid = me.getGrid();
                    store = grid.getStore();
                    store.reload({
                        callback: function (records, operation, success) {
                            counter = store.getCount();
                            if (counter > 0) {
                                //me.getGrid().getSelectionModel().select(0, true);
                            }
                        }
                    });

                },
            },
            'paymentgrid toolbar button[action=create]': {
                click: function () {
                    me.state = 'create';
                    this.formDataShow('create');
                }
            },
            'paymentgrid toolbar button[action=update]': {
                click: function () {
                    me.state = 'create';
                    this.formDataShow('update');
                }
            },
            'paymentgrid toolbar button[action=payselected]': {
                click: function () {
                    me.state = 'payselected';
                    var payment_date = this.getGrid().down("toolbar [name=chequegiro_payment_date]").getValue();
                    if (payment_date == null) {
                        Ext.Msg.alert('Info', 'Payment Date is empty ..!');
                        this.getGrid().down("toolbar [name=chequegiro_payment_date]").setFieldStyle('background:none #FFFF00;');
                        this.getGrid().down("toolbar [name=chequegiro_payment_date]").markInvalid('Payment Date Is Required before Payment Selected Data');
                        return;
                    } else {
                        this.getGrid().down("toolbar [name=chequegiro_payment_date]").setFieldStyle('background:none #FFFFFF;');
                        this.getGrid().down("toolbar [name=chequegiro_payment_date]").clearInvalid();
                        me.payfromSelected();
                    }
                }
            },
            'paymentgrid toolbar button[action=destroy]': {
                click: this.dataDestroy
            },
            'paymentgrid toolbar button[action=print]': {
                click: this.dataPrint
            },
            'paymentgrid actioncolumn': {
                click: this.gridActionColumnClickcustome
            },
            'paymentformsearch [name=pt_id]': {
                select: function () {
                    var me = this;
                    me.dataSearch();
                    me.setStorePrefix();
                }
            },
            'paymentformsearch [name=fromdate]': {
                select: this.dataSearch
            },
            'paymentformsearch [name=untildate]': {
                select: this.dataSearch
            },
            'paymentformsearch [name=voucherprefix_id]': {
                select: this.dataSearch
            },
            'paymentformsearch button[action=search]': {
                click: this.dataSearch
            },
            'paymentformsearch button[action=reset]': {
                click: this.dataReset
            },
            'paymentformview': {
                afterrender: function () {
                    me.setStoreFormview();
                },
            },
            'paymentformview button[action=pay]': {
                click: function () {
                    if (this.getFormview().getForm().isValid()) {
                        me.payfromView();
                    }
                },
            },
            'paymentformpayment button[action=save]': {
                click: function () {
                    if (this.getFormpayment().getForm().isValid()) {
                        me.payfromForm();
                    }
                },
            },
            'paymentformsearch': {
                afterrender: function () {
                    me.setStoreFormsearch();
                },
                boxready: function () {
                    me.getFormsearch().down("[name=fromdate]").setValue(me.dateNow);
                    me.getFormsearch().down("[name=untildate]").setValue(me.dateNow);
                }
            },
//            'paymentformsearch [name=pt_id] ': {
//                'select': function (g, record, item, index, e, eOpts) {
//                    var rowdata = record[0]['data'];
//                    me.pt_id = rowdata.pt_id;
//                    me.setStorePrefix();
//                },
//            },
            'paymentformdata': {
                afterrender: this.formDataAfterRender,
                boxready: function () {
                    var me, form;
                    me = this;
                    form = me.getFormdata();
                    me.formatCurrencyFormdata(me, form);
                    me.getDatadetail();
                }
            },
            'paymentformdata button[action=save]': {
                click: function () {

                }
            },
            'paymentformdata button[action=cancel]': {
                click: function () {
                    me.getGriddetail().getStore().removeAll();
                    this.formDataClose();
                }
            },
        });
    },
    setStorePrefix: function () {
        var me, store, form, in_out;
        me = this;

        store = me.getStore("Voucherprefixsetupcombo");
        var fs = me.getFormsearch();
        var pt = fs.down("[name=pt_id]").getValue();
        if (pt) {
            store.getProxy().setExtraParam("hideparam", 'getvoucherprefixsetupv2');
            store.getProxy().setExtraParam("pt_pt_id", pt);
            store.load({
                callback: function (records, operation, success) {

                }
            });
        }

    },
    gridSelect: function () {
        var me, grid, counter, store, record, row;
        me = this;
        grid = me.getGrid();
        store = grid.getStore();
        counter = store.getCount();
        if (counter > 0) {
            record = grid.getSelectionModel().getSelection()[0];
            row = record['data'];
            me.recordheader = record;
            me.rowheader = row;
            me.idheadervalue = row.kasbank_id;
            me.setFormview();
        }
    },
    setFormview: function () {
        var me, grid, form, counter, store, record, row;
        me = this;
        form = me.getFormview();
        form.loadRecord(me.recordheader);
        me.formatCurrencyFormdata(me, form);
        me.getdataVendor();
    },
    getdataVendor: function () {
        var me, pd, counter, grid, store;
        me = this;
        grid = me.getGridview();
        store = grid.getStore();
        store.clearFilter(true);
        store.load({
            params: {
                "hideparam": 'default',
                "kasbank_id": me.idheadervalue,
                "start": 0,
                "limit": 1000,
            },
            callback: function (records, operation, success) {
                store.sort('vendorname', 'ASC');
                counter = store.getCount();
                if (counter > 0) {
                    grid.getSelectionModel().select(0, true);
                }
            }
        });
    },
    execAction: function () {

    },
    parampay: {
        //start formgeneate
        fromlocation: 'Cashier.view.payment.FormPayment',
        formtitle: 'PAYMENT', formicon: 'icon-form-add',
        formid: 'win-formpayment', formlayout: 'fit',
        formshadow: 'frame', formmask: 'Loading...',
        formwidth: 400, formtimeout: 0,
        stateform: null, formaction: null, formproperties: null, formwindows: null,
        //end formgeneate       
    },
    gridActionColumnClickcustome: function (view, cell, row, col, e) {
        var me, record, m;
        me = this;
        record = me.getGrid().getStore().getAt(row);
        m = e.getTarget().className.match(/\bact-(\w+)\b/);
        switch (m[1]) {
            case me.bindPrefixName + 'Update':
                me.parampay.stateform = 'pay';
                me.GenerateFormdata(me.parampay);
                break;
            case me.bindPrefixName + 'Read':
                me.formDataShow(me, 'Read');
                break;
        }
    },
    getDatadetail: function () {
        var me, pd, grid, store, counter = '';
        me = this;
        grid = me.getGriddetail();
        store = grid.getStore();
        store.clearFilter(true);
        store.load({
            params: {
                "hideparam": 'default',
                "kasbank_id": me.idheadervalue,
                "start": 0,
                "limit": 1000,
            },
            callback: function (records, operation, success) {
                store.sort('description', 'ASC');
                counter = store.getCount();
                if (counter > 0) {
                    grid.getSelectionModel().select(0, true);
                }
            }
        });
    },
    payfromSelected: function () {
        var me;
        me = this;
        me.actiondialog = 'payfromSelected';
        me.titledialog = 'Confirm Payment from Selected Data';
        me.msgdialog = 'System will Generate Payment In selected data, are you continue..?';
        me.dialogConfirm();
    },
    payfromView: function () {
        var me;
        me = this;
        var f = me.getFormview();
        me.senddata = {
            "hideparam": 'payfromview',
            "kasbank_id": me.idheadervalue,
            "chequegiro_payment_date": me.getFormview().down("[name=chequegiro_payment_date]").getValue(),
        };
        resetTimer();
        f.setLoading("Please wait");
        me.AjaxRequest();
    },
    payfromForm: function () {
        var me;
        me = this;
        me.senddata = {
            "hideparam": 'payfromform',
            "kasbank_id": me.idheadervalue,
            "chequegiro_payment_date": me.getFormpayment().down("[name=chequegiro_payment_date]").getValue(),
        };
        resetTimer();
        me.getFormpayment().up('window').body.mask('Saving data, please wait ...');
        me.AjaxRequest();
    },
    dialogConfirm: function () {
        var me, form;
        me = this;
        form = me.getFormdata();
        Ext.Msg.show({
            title: me.titledialog,
            msg: me.msgdialog,
            width: 300,
            closable: false,
            buttons: Ext.Msg.YESNO,
            buttonText:
                    {
                        yes: 'YES',
                        no: 'NO'
                    },
            multiline: false,
            fn: function (buttonId) {
                if (buttonId == 'yes') {
                    me.processPaymentSelected();
                }
            },
            icon: Ext.Msg.QUESTION
        });
    },
    processPaymentSelected: function () {
        var me, form, grid, store, rows, recordcounttext, tmpdate;
        me = this;
        grid = me.getGrid();
        rows = grid.getSelectionModel().getSelection();
        tmpdate = grid.down("toolbar [name=chequegiro_payment_date]").getValue();
        if (rows.length < 1) {
            Ext.Msg.alert('Info', 'No record selected..!');
            return;
        } else {
            if (tmpdate == null) {
                Ext.Msg.alert('Info', 'Payment Date is empty ..!');
                grid.down("toolbar [name=chequegiro_payment_date]").setFieldStyle('background:none #FFFF00;');
                grid.down("toolbar [name=chequegiro_payment_date]").markInvalid('Payment Date Is Required before Payment Selected Data');
                return;
            } else {
                resetTimer();
                grid.down("toolbar [name=chequegiro_payment_date]").setFieldStyle('background:none #FFFFFF;');
                grid.down("toolbar [name=chequegiro_payment_date]").clearInvalid();
                recordcounttext = rows.length + ' record' + (rows.length > 1 ? 's' : '');
                store = grid.getStore();
                me.arraydata = [];
                for (var i = 0; i < rows.length; i++) {
                    me.arraydata.push(rows[i]['data'].kasbank_id);
                }
                me.senddata = {
                    "hideparam": 'payfromselected',
                    "kasbank_id": me.arraydata,
                    "chequegiro_payment_date": me.formatDate(tmpdate),
                };
                Ext.getBody().mask("Please wait...");
                me.AjaxRequest();
            }
        }
    },
    alertFormdataSuccess: function () {
        var me, store;
        me = this;
        me.getGrid().getStore().reload();
        Ext.Msg.show({
            title: 'Success',
            msg: me.messagedata,
            icon: Ext.Msg.INFO,
            buttons: Ext.Msg.OK,
            fn: function () {
                //me.formDataClose();       
            }
        });

    },
    alertFormdataFailed: function () {
        var me, store;
        me = this;
        me.getGrid().getStore().reload();
        Ext.Msg.show({
            title: 'Failure',
            msg: 'Error: ' + me.messagedata,
            icon: Ext.Msg.ERROR,
            buttons: Ext.Msg.OK
        });
    },
    AjaxRequest: function (callback) {
        var me;
        me = this;
        Ext.Ajax.request({
            url: me.urlrequest,
            timeout: 45000000,
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
        var data = me.info.data;
        switch (me.info.parameter) {
            case 'default':
                break;
            case 'payfromview':
                if (me.info.success == 'true') {
                    var f = me.getFormview();
                    f.setLoading(false);
                    me.messagedata = me.info.msg;
                    me.alertFormdataSuccess();

                } else {
                    me.messagedata = me.info.msg;
                    me.alertFormdataFailed();
                }
                break;
            case 'payfromselected':
                if (me.info.success == 'true') {
                    me.messagedata = me.info.msg;
                    me.alertFormdataSuccess();
                    Ext.getBody().unmask();
                } else {
                    me.messagedata = me.info.msg;
                    me.alertFormdataFailed();
                }
                break;
            case 'payfromform':
                if (me.info.success == 'true') {
                    me.messagedata = me.info.msg;
                    me.alertFormdataSuccess();
                    me.getFormpayment().up('window').body.unmask();
                    me.getFormpayment().up('window').close();
                } else {
                    me.messagedata = me.info.msg;
                    me.alertFormdataFailed();
                }
                break;
        }
    },
});