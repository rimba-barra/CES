Ext.define('Cashier.controller.Voucher', {
    extend: 'Cashier.library.template.controller.Controller2',
    alias: 'controller.Voucher',
    views: ['voucher.AngsuranGrid', 'voucher.Gridcoadetail', 'voucher.Gridardetail', 'voucher.Gridsubcoadetail'],
    requires: [
        'Cashier.library.BrowseCashier',
    ],
    refs: [
        {
            ref: 'panel',
            selector: 'voucherpanel'
        },
        {
            ref: 'grid',
            selector: 'vouchergrid'
        },
        {
            ref: 'detailcoagrid',
            selector: 'vouchercoadetailgrid'
        },
        {
            ref: 'formdata',
            selector: 'voucherformdata'
        },
        {
            ref: 'formsearch',
            selector: 'voucherformsearch'
        },
        {
            ref: 'angsurangrid',
            selector: 'voucherangsurangrid'
        },
        {
            ref: 'angsuranformsearch',
            selector: 'voucherangsuranformsearch'
        },
        {
            ref: 'detailargrid',
            selector: 'voucherardetailgrid'
        },
        {
            ref: 'formcoadetail',
            selector: 'voucherformcoadetail'
        },
        {
            ref: 'gridsubdetail',
            selector: 'vouchersubcoadetailgrid'
        },
        {
            ref: 'formsubcoadetail',
            selector: 'vouchersubdetailformdata'
        },
    ],
    formWidth: 900,
    controllerName: 'voucher',
    fieldName: 'coa',
    bindPrefixName: 'Voucher',
    formxWinId: 'win-voucherwinId',
    templateCoa: '1',
    templateModuleName: 'Installment Payment',
    browseHandler: null,
    dateNow: new Date(),
    selectedPurchaseletter: null,
    rowData: null,
    final: null,
    isEdit: null,
    totalTemp: 0,
    firstTotal: 0,
    schedule_id: null,
    amountSelected: null,
    totalWithoutLastrecord: 0,
    modelCoa: null,
    totalSumAr: 0,
    totalSumAfterDeleteAr: 0,
    totalWithoutLastRecordNew: 0,
    kelsub_id: 0,
    tempid: 0,
    localStore: {
        subdetailcoa: null,
        selectedAngsuran: null,
        customer: null,
        price: null,
        detail: null
    },
    constructor: function (configs) {
        this.callParent(arguments);
        var me = this;
        this.myConfig = new Cashier.library.box.Config({
            _controllerName: me.controllerName
        });

    },
    init: function () {
        var me = this;
        var events = new Cashier.library.box.tools.EventSelector();
        this.control(events.getEvents(me, me.controllerName));
        me.tools = new Cashier.library.box.tools.Tools({config: me.myConfig});

        if (typeof shortcut === "undefined") {
            Ext.Loader.injectScriptElement(document.URL + 'app/cashier/library/shortcut.js', function () {

                //console.log("[INFO] shortcut loaded.");

            }, function () {
                // error load file
            });
        }

        this.control({
            'voucherpanel button[action=collection]': {
                click: me.selectUnitGridShow
            },
            'voucherangsurangrid button[action=select]': {
                click: function (v) {
                    var me = this;
                    me.scheduleSelect(v);
                }
            },
            'voucherangsurangrid': {
                itemdblclick: function (v) {
                    var me = this;
                    me.scheduleSelect(v);
                }
            },
            'voucherangsurangrid ': {
                selectionchange: this.gridSelectionChangeAngsuranGrid
            },
            'voucherformdata [name=panel]': {
                tabchange: function (tabPanel, tab) {
                    me.resetDetailCoa(tab);
                }
            },
            'voucherformdata [name=dataflow]': {
                change: function (val) {
                    var me = this;
                    me.changeFlow(val);
                }
            },
            'voucherformdata [action=cancel]': {
                click: function () {
                    var me = this;
                    me.cancelFormdata();
                }
            },
            'voucherformdata [name=payment_paymentmethod_id]': {
                change: function (val) {
                    var me = this;
                    if (val.value) {
                        me.changePayment(val.value);
                    }
                }
            },
            'voucherformdata [name=cashier_voucher_date]': {
                change: function (val) {
                    var me = this;
                    if (val.value) {
                        me.getVoucherId(val.value);
                    }
                }
            },
            'voucherformdata [name=dataflow]': {
                change: function (val) {
                    var me = this;
                    if (val.value) {
                        me.getCustomRequestCombobox('kasbank', val.value, 'kasbank', 'voucher', ['prefix', 'coa'], me.getFormdata());
                    }
                }
            },
            'voucherformdata button[action=save]': {
                click: this.mainDataSave
            },
            'vouchercoadetailgrid toolbar [action=generate]': {
                click: function () {
                    me.generateCoa(me.templateCoa, 'click');
                }

            },
            'vouchercoadetailgrid toolbar [action=create]': {
                click: function (el, act) {
                    me.formDataDetail('create');
                }
            },
            'vouchercoadetailgrid toolbar [action=update]': {
                click: function () {
                    me.formDataDetail('update')
                }

            },
            'vouchercoadetailgrid': {
                itemdblclick: function () {
                    me.formDataDetail('update')
                },
                selectionchange: me.gridSelectionChangedetailcoaGrid
            },
            'voucherardetailgrid toolbar [action=browseSchedule]': {
                click: function (el) {
                    me.selectUnitGridShow(el, 'AngsuranGridNoSearch');
                }
            },
            'voucherardetailgrid toolbar [action=destroy]': {
                click: function (el) {
                    me.dataDestroyAr(el)
                }
            },
            'voucherformcoadetail [name=coa_id]': {
                select: function () {
                    me.coaChange();
                }
            },
            'voucherformcoadetail button[action=save]': {
                click: function (el, act) {
                    me.savedetailcoa();
                }
            },
            'voucherformcoadetail toolbar button[action=cancel]': {
                click: function (el, act) {
                    me.cancelFormdatadetail();
                }
            },
            'vouchercoadetailgrid toolbar button[action=destroy]': {
                click: function (el, act) {
                    me.destroydetail();
                }
            },
            'vouchersubcoadetailgrid toolbar [action=create]': {
                click: function (el, act) {
                    me.formDataSubDetail('create');
                }
            },
            'vouchersubcoadetailgrid toolbar [action=destroy]': {
                click: function (el, act) {
                    me.destroysubdetail();
                }
            },
            'vouchersubcoadetailgrid ': {
                selectionchange: me.gridSelectionChangedetailsubcoaGrid
            },
            'vouchersubdetailformdata [name=subgl_subgl_id]': {
                select: function () {
                    me.subglChange();
                }
            },
            'vouchersubdetailformdata button[action=save]': {
                click: function () {
                    me.savesubdetailcoa();
                }
            },
        });
    },
    gridSelectionChangeAngsuranGrid: function () {
        var me = this;
        var grid = me.getAngsurangrid();
        var row = grid.getSelectionModel().getSelection();
        var rec = grid.getSelectedRecord();
        var c = grid.getSelectionModel().getCount();
        if (c === 1) {
            if (rec.get("remaining_balance") > 0) {
                grid.down('[action=select]').setDisabled(false);
            }
        }
        else {
            grid.down('[action=select]').setDisabled(true);
        }
    },
    gridSelectionChangedetailcoaGrid: function () {
        var me = this;
        var grid = me.getDetailcoagrid();
        var row = grid.getSelectionModel().getSelection();
        var rec = grid.getSelectedRecord();
        grid.down('[action=update]').setDisabled(row.length != 1);
        grid.down('[action=destroy]').setDisabled(row.length < 1);
    },
    gridSelectionChangedetailsubcoaGrid: function () {
        var me = this;
        var grid = me.getGridsubdetail();
        var row = grid.getSelectionModel().getSelection();
        var rec = grid.getSelectedRecord();
        grid.down('[action=update]').setDisabled(row.length != 1);
        grid.down('[action=destroy]').setDisabled(row.length < 1);
    },
    formDataAfterRender: function (el) { //fdar
        var state = el.up('window').state;
        var wid = el.up('window').id;
        var me = this;
        var f = me.getFormdata();
        me.fdar().init();

        if (state == 'create') {
            me.fdar().create();
            me.cancelFormdata();
            f.rowData = null;
            f.down('[name=dataflow]').setValue('I');
            //f.down("[name=cashier_voucher_date]").setValue(me.dateNow);
            me.amountSelected = null;
            me.schedule_id = null;
            me.loadModelCoaDetail();
            me.loadTempModel();
            me.detailFdar(wid, f.down('[name=dataflow]').getValue());
            f.down('[name=voucherardetail]').setDisabled(true);
            //me.getVoucherId(me.dateNow);

        } else if (state == 'update') {
            me.fdar().update();
        }
    },
    GridAr: function () {
        var indexdata, getindex, record, row;
        var me = this;
        me.final = 0;
        var g = me.getDetailargrid();
        var store = g.getStore();
        var f = me.getFormdata();
        var count = store.getCount();
        store.sort('duedate', 'ASC');


        if (count == '1') {
            me.totalTemp = accounting.formatMoney(me.final);
            store.each(function (record) {
                record.set('final', 0);
                record.set('remaining_pay', record.get("remaining_balance"));
            });
        }
        else {
            store.each(function (record) {
                record.set('final', 0);
                record.set('remaining_pay', 0);
            });
            g.getView().refresh();
        }
        g.on({
            scope: this,
            edit: function (roweditor, event) {
                me.getSelectedSchedule();
                store.each(function (record) {
                    if (event.field == "remaining_pay") {
                        var firstPay = event.record.modified['remaining_pay'];
                        if (parseFloat(event.value) <= parseFloat(me.firstTotal)) {
                            if (parseFloat(event.value) >= me.totalWithoutLastrecord) {
                                var finalAmount = parseFloat(event.record.get('remaining_balance')) - parseFloat(event.record.get('remaining_pay'));
                                if (finalAmount <= 0) {
                                    var c = store.getCount() - 1;
                                    var rowIndex = store.getAt(c);

                                    if (me.getIndexDetailAr() !== '1') {
                                        var lebihAngsuran = parseFloat(event.value) - parseFloat(event.record.get("remaining_balance"));
                                        event.record.set('remaining_pay', parseFloat(event.record.get('remaining_balance')));

                                        if (lebihAngsuran >= 0) {
                                            var lebih2 = parseFloat(event.value) - me.totalWithoutLastrecord;
                                            record.set('remaining_pay', parseFloat(record.get('remaining_balance')));
                                            rowIndex['data'].remaining_pay = lebih2;
                                            rowIndex['data'].final = parseFloat(rowIndex['data'].remaining_balance) - lebih2;
                                        }
                                    }
                                    event.record.set('final', 0);
                                    g.getView().refresh();
                                }
                                else {
                                    event.record.set('final', finalAmount);
                                }
                            }
                            else {
                                event.record.set('remaining_pay', event.record.get('remaining_balance'));
                                event.record.set('final', 0);
                                me.tools.alert.warning("Payment harus lebih besar dari : " + accounting.formatMoney(me.totalWithoutLastrecord));
                                return false;
                            }

                        }
                        else {
                            event.record.set('remaining_pay', event.record.get('remaining_balance'));
                            event.record.set('final', 0);
                            me.tools.alert.warning("Payment harus lebih kecil dari : " + accounting.formatMoney(me.firstTotal));
                            return false;
                        }
                    }
                });
                me.isEdit = 1;
            },
            beforeedit: function (a, b) {
                if (b.rowIdx !== 0) {
                    return false;
                }
            }
        });

    },
    resetDetailCoa: function (tab) {
        var me = this;
        var f = me.getFormdata();
        if (me.isEdit == '1') {
            if (tab.name === 'vouchercoadetail') {
                me.checkArIsEmpty();
                Ext.Msg.show({
                    title: 'Regenerate detail?',
                    msg: 'Are you sure to regenerate detail COA Account?',
                    buttons: Ext.Msg.YESNO,
                    icon: Ext.Msg.QUESTION,
                    fn: function (clicked) {
                        if (clicked === "yes") {
                            me.getTotalSumAr();
                            f.down("[name=remaining_balance]").setValue(accounting.formatMoney(me.totalSumAr));
                            me.generateCoa(me.templateCoa, 'click');
                        }
                        if (clicked === "no") {
                            me.isEdit = null;
                        }

                    }
                });
            }
        }
        me.isEdit = null;
    },
    panelAfterRender: function () {
        var me = this;
        var grid = me.getGrid();
        shortcut.add("F7", function () {
            me.selectUnitGridShow('el');
        }, {
            'type': 'keydown',
            'propagate': true,
            'target': document
        });
    },
    fillFormComponents: function (data, form) {
        var me = this;
        me.tools.wesea(data.dept, form.down("[name=dept]")).comboBox();
        me.tools.wesea(data.pt, form.down("[name=pt_name]")).comboBox();
        me.tools.wesea(data.project, form.down("[name=project_name]")).comboBox();
        me.tools.wesea(data.kasbank, form.down("[name=kasbank]")).comboBox();
        me.tools.wesea(data.paymentmethod, form.down("[name=payment_paymentmethod_id]")).comboBox();
    },
    detailFdar: function (params, kasbank) {
        var me = this;
        var f = me.getFormdata();
        var gridcoadetail = me.getDetailcoagrid();
        me.tools.ajax({
            params: {
                module: me.controllerName,
                param: params,
                dataflow: kasbank
            },
            success: function (data, model) {
                try {

                    me.fillFormComponents(data, f);


                    if (params !== 'win-voucherwinId') {

                        f.down('[name=voucherardetail]').setDisabled(false);
                        gridcoadetail.down('toolbar [action=generate]').setDisabled(false);
                        f.down('[name=customer_name]').setReadOnly(true);
                        f.down('[name=pt_name]').setReadOnly(true);
                        f.down('[name=pt_name]').setReadOnly(true);
                        f.down('[name=cashier_voucher_date]').setReadOnly(true);

                    }
                    else {

                        var index = f.down("[name=pt_name]").getStore().findExact('pt_id', 38);
                        var c = f.down("[name=pt_name]").getStore().getAt(index).get('name');
                        var selected = me.tools.comboHelper(f.down("[name=project_name]")).getFieldFree('project_id', 'name', apps.project);
                    }


                }
                catch (err) {
                    console.log(err.message);
                    var mm = Ext.Msg.show({
                        title: 'Warning',
                        msg: 'Failed to generate init, Please try close this window then open again.',
                        icon: Ext.Msg.ERROR,
                        buttons: Ext.Msg.OK,
                        fn: function () {
                            f.up('window').close();
                        }
                    });
                    Ext.defer(function () {
                        mm.toFront();
                    }, 50);
                }
                f.setLoading(false);
            }
        }).read('detail');
    },
    selectUnitGridShow: function (el, ar) {
        var ps;
        var me = this;
        var localstore = 'selectedAngsuran';
        var browse = new Cashier.library.BrowseCashier();
        browse.init({
            controller: me,
            view: 'AngsuranGrid',
            el: el,
            localStore: localstore,
            mode_read: "selectedangsuran",
            bukaFormSearch: true,
        });
        browse.showWindow();
        if (ar == 'AngsuranGridNoSearch') {
            var f = me.getFormdata();
            var ps = f.rowData;
            var gridar = me.getAngsurangrid();
            var storear = gridar.getStore();
            me.getSelectedSchedule();
            if (ps) {
                Ext.getCmp('unitNumberId').setValue(ps.get('unit_unit_number'));
                Ext.getCmp('blockId').setValue(ps.get('block_block_id'));
                Ext.getCmp('purchaseletterNoId').setValue(ps.get('purchaseletter_purchaseletter_no'));
                Ext.getCmp('customerNameId').setValue(ps.get('customer_name'));
                Ext.getCmp('scheduleAngsuranId').setValue(me.schedule_id);

                Ext.getCmp('unitNumberId').setReadOnly(true);
                Ext.getCmp('blockId').setReadOnly(true);
                Ext.getCmp('purchaseletterNoId').setReadOnly(true);
                Ext.getCmp('customerNameId').setReadOnly(true);
            }
            var fields = Ext.getCmp('MySuperBrowseWindow').getForm().getFieldValues();
            for (var x in fields) {
                storear.getProxy().setExtraParam(x, fields[x]);
            }
            storear.loadPage();
        }
    },
    scheduleSelect: function (v) {
        var me = this;
        var w = me.instantWindow('FormData', 900, 'Add Voucher', 'create', 'myVoucherWindow');
        var f = me.getFormdata();
        me.rowData = null;
        f.rowData = null;
        var me = this;
        var grid = me.getAngsurangrid();
        var row = grid.getSelectionModel().getSelection();
        var rec = grid.getSelectedRecord();
        f.rowData = rec;
        me.rowData = rec;
        var gridCoaDetail = me.getDetailcoagrid();
        var rb = f.down("[name=remaining_balance]").getValue();
        if (me.browseHandler) {


            try {
                f.setLoading("Please wait");
                //console.log(me.getIndexDetailAr());
                if (me.getIndexDetailAr() == '0') {
                    f.loadRecord(rec);
                }
                gridCoaDetail.down('toolbar [action=generate]').setDisabled(false);
                me.formToMoney(f);
                me.getTotalWithoutLastRecord();
                me.loadAR(rec);
                f.down("[name=cashier_voucher_date]").setValue(me.dateNow);
                f.down("[name=payment_date]").setValue(me.dateNow);
                me.getFirstTotal();
                me.getSelectedSchedule();
                me.GridAr();

                if (me.getIndexDetailAr() == '1') {
                    me.generateCoa(me.templateCoa, 'schedule');
                }

            }
            catch (err) {
                console.log(err.message);
                f.up('window').close();
                me.tools.alert.warning("Failed to load record to form.");
            }
            f.setLoading(false);
        }
        else {
            me.tools.alert.warning("Failed to get AR, Please try select AR again.");
        }
    },
    loadAR: function (row) {
        var me = this;
        var gridar = me.getDetailargrid();
        var store = gridar.getStore();
        if (row) {
            store.add(row);
            store.commitChanges();
        }

    },
    changeFlow: function (val) {
        var me = this;
        var f = me.getFormdata();
        if (val.value === "I") {
            f.down('label[id=dataflowId]').setText('IN');
        }
        else {
            f.down('label[id=dataflowId]').setText('OUT');
        }
    },
    changePayment: function (val) {
        var me = this;
        var f = me.getFormdata();
        if (val === 7) {//transfer
            f.down('[name=bank_name]').setVisible(true);
            f.down('[name=payment_date]').setVisible(true);
        }
        else {
            f.down('[name=bank_name]').setVisible(false);
            f.down('[name=payment_date]').setVisible(false);
        }
    },
    generateCoa: function (template, state, kasbank_id, paymentId) {
        var me = this;
        var f = me.getFormdata();
        var g = me.getDetailcoagrid();
        var totalpayment = accounting.unformat(f.down("[name=remaining_balance]").getValue());
        var ps = f.rowData;
        var unitid = 0;
        var schedule_id = 0;
        if (ps) {
            var unitid = ps.get('unit_unit_id');
            var schedule_id = me.schedule_id;
        }

        if (me.amountSelected) {
            f.setLoading("Loading detail coa");
            g.getStore().load({
                params: {
                    template_id: me.templateCoa,
                    amount: me.amountSelected,
                    kasbank_id: kasbank_id,
                    unit_id: unitid,
                    schedule_id: me.schedule_id
                },
                callback: function (rec, op) {
                    f.setLoading(false);
                    g.attachModel(op);
                    //me.setSumdetail();
                }
            });
        } else {
            me.tools.alert.warning("Cannot Generate Detail .");
            g.getStore().loadData([], false);
        }

    },
    getSelectedSchedule: function () {
        var me = this;
        me.schedule_id = null;
        me.amountSelected = null;
        me.totalTemp = null;
        var sch = '';
        var amt = '';
        var total = 0;
        var gridvoucherar = me.getDetailargrid();
        var storevoucherar = gridvoucherar.getStore();
        storevoucherar.each(function (rec) {
            sch += rec.get("schedule_id") + "~";
            amt += parseFloat(rec.get("remaining_pay")) + "~";
            total += parseFloat(rec.get('remaining_pay'));
        });

        me.schedule_id = sch;
        me.amountSelected = amt;
        me.totalTemp = accounting.formatMoney(total);
    },
    getFirstTotal: function () {
        var me = this;
        me.firstTotal = 0;
        var total = 0;
        var gridvoucherar = me.getDetailargrid();
        var storevoucherar = gridvoucherar.getStore();
        storevoucherar.each(function (rec) {
            total += parseFloat(rec.get('remaining_balance'));
        });

        me.firstTotal = total;
    },
    getTotalWithoutLastRecord: function () {
        var me = this;
        me.totalWithoutLastrecord = 0;
        var total = 0;
        var gridvoucherar = me.getDetailargrid();
        var storevoucherar = gridvoucherar.getStore();
        storevoucherar.each(function (rec) {
            total += parseFloat(rec.get('remaining_balance'));
        });

        me.totalWithoutLastrecord = total;
    },
    getTotalSumAr: function () {
        var me = this;
        me.totalSumAr = 0;
        var total = 0;
        var gridvoucherar = me.getDetailargrid();
        var storevoucherar = gridvoucherar.getStore();
        storevoucherar.each(function (rec) {
            total += parseFloat(rec.get('remaining_pay'));
        });

        me.totalSumAr = total;
    },
    getIndexDetailAr: function () {
        var me = this;
        var total = 0;
        var gridvoucherar = me.getDetailargrid();
        var total = gridvoucherar.getStore().getCount();
        return total;
    },
    setArStore: function (a, b) {
        var me = this;
        var gridvoucherar = me.getDetailargrid();
        var store = gridvoucherar.getStore();
        store.each(function (record) {
            record.set(a, b);
        });
    },
    loadModelCoaDetail: function () {
        var me = this;
        var gridCoaDetail = me.getDetailcoagrid();
        gridCoaDetail.getStore().clearFilter(true);
        gridCoaDetail.doInit();
        gridCoaDetail.getStore().load({
            params: {
                template_id: 0
            },
            callback: function (rec, op) {
                if (op) {
                    gridCoaDetail.attachModel(op);
                    // console.log(op);
                } else {
                    console.log('error attach model coa');
                }
            }
        });
    },
    loadModelSubCoaDetail: function (callbackFunc) {
        var me = this;
        var gridCoaDetail = me.getGridsubdetail();
        gridCoaDetail.getStore().clearFilter(true);
        gridCoaDetail.doInit();
        gridCoaDetail.getStore().load({
            params: {
                voucherdetail_id: 0
            },
            callback: function (rec, op) {
                if (op) {
                    gridCoaDetail.attachModel(op);
                } else {
                    console.log('error attach model sub coa');
                }

                if (typeof callbackFunc === "function") {
                    callbackFunc();
                }

            }

        });
        me.tempid = 1;
    },
    loadTempModel: function (callback) {
        var me = this;
        var f = me.getFormdata();
        me.localStore.subdetailcoa = me.instantStore({
            id: me.controllerName + 'SubDetailCoaStoreTemp',
            extraParams: {
                mode_read: 'subdetailcoa'
            },
            idProperty: 'voucherdetailsub_id'
        });
        me.localStore.subdetailcoa.load({
            params: {
                voucherdetail_id: 0
            },
            callback: function (rec, op) {
                var f = me.getFormdata();
                me.attachModel(op, me.localStore.subdetailcoa, true);
                if (typeof callback === "function") {
                    callback();
                }
                console.log('a0');
            }
        });

    },
    cancelFormdata: function () {
        var me = this;
        var gridCoaDetail = me.getDetailcoagrid();
        var griArDetail = me.getDetailargrid();


        gridCoaDetail.getStore().loadData([], false);
        griArDetail.getStore().loadData([], false);


    },
    cancelFormdatadetail: function () {
        var me = this;
        var gridCoaDetail = me.getDetailcoagrid();
        var griArDetail = me.getDetailargrid();
        var gridsubcoadetail = me.getGridsubdetail();


        griArDetail.getStore().loadData([], false);
        gridsubcoadetail.getStore().loadData([], false);

    },
    formToMoney: function (f) {
        var me = this;
        var vs = f.getForm().getValues();
        for (var i in vs) {
            var elx = f.down("[name=" + i + "]");

            if (elx) {
                if (elx.getXType() === 'xmoneyfield') {
                    elx.setRawValue(accounting.formatMoney(elx.getValue()));
                }

            }
        }
    },
    getTotalAfterDeleteAr: function () {
        var me = this;
        me.totalSumAfterDeleteAr = 0;
        var total = 0;
        var gridvoucherar = me.getDetailargrid();
        var storevoucherar = gridvoucherar.getStore();
        storevoucherar.each(function (rec) {
            total += parseFloat(rec.get('remaining_balance'));
        });

        me.totalSumAfterDeleteAr = total;
    },
    dataDestroyAr: function (v) {
        var me = this;
        var griArDetail = me.getDetailargrid();
        var store = griArDetail.getStore();
        var rows = griArDetail.getSelectionModel().getSelection();
        if (rows.length < 1) {
            Ext.Msg.alert('Info', 'No record selected !');
            return;
        } else {
            var sum = 0;
            for (var i = 0; i < rows.length; i++) {
                sum += parseFloat(rows[i].get("remaining_balance"));
                store.remove(rows[i]);
            }

            me.getSelectedSchedule();
            me.checkArIsEmpty();
            me.getTotalWithoutLastRecordNew();
        }
    },
    checkArIsEmpty: function () {
        var me = this;
        var f = me.getFormdata();
        var griArDetail = me.getDetailargrid();
        var store = griArDetail.getStore();
        var count = store.getCount();
        var gridCoaDetail = me.getDetailcoagrid();
        if (count == '0') {
            me.isEdit = null;
            gridCoaDetail.getStore().loadData([], false);
            gridCoaDetail.down('toolbar [action=generate]').setDisabled(true);
            f.down("[name=remaining_balance]").setValue('0.00');
        } else {
            me.isEdit = 1;

        }
    },
    getTotalWithoutLastRecordNew: function () {
        var me = this;
        me.totalWithoutLastRecordNew = 0;
        var total = 0;
        var gridvoucherar = me.getDetailargrid();
        var storevoucherar = gridvoucherar.getStore();
        var count = storevoucherar.getCount();
        var c = storevoucherar.getCount() - 1;
        var firstRecord = storevoucherar.getAt(0);
        var lastRecord = storevoucherar.getAt(c);
        if (count > 1) {
            storevoucherar.each(function (rec) {
                total += parseFloat(rec.get('remaining_balance'));
            });
            me.totalWithoutLastrecord = parseFloat(firstRecord.get("remaining_balance"));
            me.firstTotal = parseFloat(total);
        }
        else {
            me.totalWithoutLastrecord = 0;
            me.firstTotal = parseFloat(firstRecord.get("remaining_balance"));
        }

    },
    getVoucherId: function (paramdate) {
        var me = this;
        var f = me.getFormdata();
        var p = me.getPanel();
        f.setLoading('Please wait, Generate temp voucher ID');
        var d = null;
        me.tools.ajax({
            params: {
                module: me.controllerName,
                date: paramdate
            },
            success: function (data, model) {
                try {
                    if (data.hasil[0][0].vid === 0) {
                        me.tools.alert.warning("Selected date is closing for transaction.");
                        me.disableSave(true);
                        f.down('[name=voucher_voucherID]').setValue('');
                    }
                    else if (data.hasil[0][0].vid === 2) {
                        me.tools.alert.warning("Selected date is not installed, please setup on master closing.");
                        me.disableSave(true);
                        f.down('[name=voucher_voucherID]').setValue('');
                    }
                    else {
                        f.down('[name=voucher_voucherID]').setValue(data.hasil[0][0].vid);
                        me.disableSave(false);
                    }

                }
                catch (err) {
                    console.log(err.message);
                    me.tools.alert.warning("Failed to load voucher ID, please reselect date to generate.");
                }
                f.setLoading(false);
            }
        }).read('voucherid');
    },
    getCustomRequestCombobox: function (paramname, val, field, model, submodel, form, param) {
        var me = this;
        var f = form;
        f.setLoading('Please wait, load option box.');
        var d = null;
        var sm = [];
        if (submodel) {
            sm = Ext.encode(submodel);
        }
        me.tools.ajax({
            params: {
                module: me.controllerName,
                paramname: paramname,
                value: val,
                model: model,
                submodel: sm
            },
            success: function (data, model, v) {
                try {
                    var obj = [];
                    for (var key in data) {
                        obj = data[key];
                    }
                    if (field) {
                        me.tools.wesea(obj, form.down("[name=" + field + "]")).comboBox();
                    }
                    if (param) {
                        me.afterDataDetailInit(param, f);
                    }
                }
                catch (err) {
                    console.log(err.message);
                    me.tools.alert.warning("Failed to load ini, please try re-open menu.");
                }
                f.setLoading(false);
            }
        }).read('customrequest');
    },
    formDataDetail: function (param) {
        var me = this;

        var w = me.instantWindow('Formcoadetail', 900, 'Add detail voucher ', param, 'coadatadetailsby');
        var f = me.getFormcoadetail();
        me.getCustomRequestCombobox('coa', '', 'coa_id', 'coa', ['kelsub'], f, param);

        me.loadModelSubCoaDetail(function () {
            var substore = me.getGridsubdetail().getStore();
            //console.log('a');
            me.localStore.subdetailcoa.each(function (rec) {
                // console.log(rec);
                substore.add(rec);
            });
            console.log(substore);
        });

    },
    formDataSubDetail: function (param) {
        var me = this;
        var w = me.instantWindow('FormDataSubDetail', 700, 'Add sub detail voucher ', param, 'coadatasubdetailsby');
        var f = me.getFormsubcoadetail();
        me.getCustomRequestCombobox('subgl', me.kelsub_id, 'subgl_subgl_id', 'subgl', '', f, param);
    },
    checkAfterRequestCombobox: function (form, field) {
        var me = this;
        var count = form.down("[name=" + field + "]").getStore().getCount();
        if (count > 0) {
            form.down("[name=" + field + "]").setDisabled(false);
        }
        else {
            form.down("[name=" + field + "]").setDisabled(true);
        }
    },
    mainDataSave: function () {
        var me = this;
        var f = me.getFormdata();
        if (f.getForm().isValid()) {
            f.submit();
        }

    },
    disableSave: function (param) {
        var me = this;
        var f = me.getFormdata();
        f.down('[action=savenew],[action=saveprint],[action=save]').setDisabled(param);
        f.down('[action=saveprint]').setDisabled(param);
        f.down('[action=save]').setDisabled(param);

    },
    coaChange: function () {
        var me = this;
        me.kelsub_id = 0;
        var f = me.getFormcoadetail();
        var row = f.getForm().getValues();
        var gridcoadetail = me.getDetailcoagrid();
        var gridcoadetailstore = gridcoadetail.getStore();
        var gridsub = me.getGridsubdetail();
        var storesub = gridsub.getStore();


        var io = f.down("[name=indexdata]").getValue();
        gridcoadetailstore.removeAt(gridcoadetailstore.find('indexdata', io));
//       console.log(row);
        gridcoadetailstore.add(row);
        gridcoadetailstore.commitChanges();

        var selected = me.tools.comboHelper(f.down("[name=coa_id]")).getField('coa_id', 'coa');
        var selectedName = me.tools.comboHelper(f.down("[name=coa_id]")).getField('coa_id', 'name');
        var selectedType = me.tools.comboHelper(f.down("[name=coa_id]")).getField('coa_id', 'type');
        var selectedKelsubId = me.tools.comboHelper(f.down("[name=coa_id]")).getField('coa_id', 'kelsub_kelsub_id');
        var selectedKelsub = me.tools.comboHelper(f.down("[name=coa_id]")).getField('coa_id', 'kelsub_kelsub');
        var selectedKelsubDesc = me.tools.comboHelper(f.down("[name=coa_id]")).getField('coa_id', 'kelsub_description');
        f.down("[name=coa_name]").setValue(selectedName);
        f.down("[name=coa_coa]").setValue(selected);
        f.down("[name=kelsub_kelsub]").setValue(selectedKelsub);
        f.down("[name=kelsub_description]").setValue(selectedKelsubDesc);
        f.down("[name=kelsub_kelsub_id]").setValue(selectedKelsubId);
        if (selectedKelsubId) {
            f.down("[name=amount]").setReadOnly(true);
            f.down("[name=amount]").setValue('');
            //f.down("[name=vouchersubcoadetailgrid]").setVisible(true);
            gridsub.down("[action=create]").setDisabled(false);
            me.kelsub_id = selectedKelsubId;

        } else {
            f.down("[name=amount]").setReadOnly(false);
            //f.down("[name=vouchersubcoadetailgrid]").setVisible(false);
            gridsub.down("[action=create]").setDisabled(true);
            storesub.loadData([], false);
            me.kelsub_id = 0;
        }
        //f.down("[name=type]").setValue(selectedType);
    },
    savedetailcoa: function () {
        var me = this;
        var f = me.getFormcoadetail();
        var value = f.getForm().getValues();
        var g = me.getDetailcoagrid();
        var store = g.getStore();
        var substore = me.getGridsubdetail().getStore();
        if (f.getForm().isValid()) {
            if (f.kosongGa > -1) {
                var rec = store.getAt(f.kosongGa);
                rec.beginEdit();
                rec.set(value);
                rec.endEdit();
            }
            else {

                var temp = store.findExact('indexdata', value.indexdata);
                var rec = store.getAt(temp);
                if (rec) {
                    rec.beginEdit();
                    rec.set(value);
                    rec.endEdit();
                } else {
                    //  store.add(value);
                    //   store.commitChanges();


                }



            }

            ///add to instantstore detailsubcoa

            var sb = me.localStore.subdetailcoa;

            substore.each(function (rec) {

                sb.add(rec);

            });
            console.log(sb);


            f.up('window').close();
        }
    },
    savesubdetailcoa: function () {
        var me = this;
        var f = me.getFormsubcoadetail();
        var fa = me.getFormcoadetail();
        var value = f.getForm().getValues();
        var g = me.getGridsubdetail();
        var store = g.getStore();
        if (f.getForm().isValid()) {
            if (f.kosongGa > -1) {
                var rec = store.getAt(f.kosongGa);
                rec.beginEdit();
                rec.set(value);
                rec.endEdit();
            }
            else {
                store.add(value);
                store.commitChanges();
            }
            fa.down("[name=amount]").setValue(accounting.formatMoney(me.sumAmountStore(store)));
            f.up('window').close();
        }
    },
    afterDataDetailInit: function (param, f) { //after
        var me = this;
        var fid = f.ownerCt.id;

        if (fid === 'coadatadetailsby') {
            if (param == 'update') {
                var g = me.getDetailcoagrid();
                var substore = me.getGridsubdetail().getStore();
                var rec = g.getSelectedRecord();
                f.kosongGa = g.getSelectedRow(); //getSelectedRow untuk ambil row yang di klik user ,hanya 1
                f.loadRecord(g.getSelectedRecord()); //getSelectedRecord fungsi extjs




            }
            else if (param == 'create') {
                f.down("[name=indexdata]").setValue(me.getindexdetailcoa());
            }
        }
        else if (fid === 'coadatasubdetailsby') {
            var form = me.getFormcoadetail();
            var val = form.getForm().getValues();
            f.down('[name=kelsub_kelsub]').setValue(val.kelsub_kelsub);
            f.down('[name=kelsub_kelsub_id]').setValue(val.kelsub_kelsub_id);
            f.down('[name=voucherdetail_id]').setValue(val.voucherdetail_id);
            f.down('[name=indexdata]').setValue(val.indexdata);

        }
    },
    destroydetail: function () {
        var me = this;
        var f = me.getFormcoadetail();
        var fa = me.getFormdata();
        var g = me.getDetailcoagrid();
        var records = g.getSelectionModel().getSelection();
        for (var i = records.length - 1; i >= 0; i--) {

            var row = g.getStore().indexOf(records[i]);

            var id = records[i]['data']["voucherdetail_id"];

            if (id) {
                fa.deletedRows.push(id);
            }

            g.getStore().removeAt(row);
        }
        //return store.indexOf(this.getSelectionModel().getSelection()[0]);
    },
    subglChange: function () {
        var me = this;
        var f = me.getFormsubcoadetail();
        var code = me.tools.comboHelper(f.down("[name=subgl_subgl_id]")).getField('subgl_id', 'code');
        var code1 = me.tools.comboHelper(f.down("[name=subgl_subgl_id]")).getField('subgl_id', 'code1');
        var code2 = me.tools.comboHelper(f.down("[name=subgl_subgl_id]")).getField('subgl_id', 'code2');
        var code3 = me.tools.comboHelper(f.down("[name=subgl_subgl_id]")).getField('subgl_id', 'code3');
        var code4 = me.tools.comboHelper(f.down("[name=subgl_subgl_id]")).getField('subgl_id', 'code4');
        f.down("[name=subgl_code]").setValue(code);
        f.down("[name=subgl_code1]").setValue(code1);
        f.down("[name=subgl_code2]").setValue(code2);
        f.down("[name=subgl_code3]").setValue(code3);
        f.down("[name=subgl_code4]").setValue(code4);
    },
    getindexdetailcoa: function () {
        var me = this;
        var hasil = 0;
        var gridcoadetail = me.getDetailcoagrid();
        var count = gridcoadetail.getStore().getCount();
        hasil = count + 1;
        return hasil;
    },
    sumAmountStore: function (store) {
        var me = this;
        var amount = 0;
        if (store) {
            store.each(function (rec) {
                amount += parseFloat(accounting.unformat(rec.get("amount")));
            });
        }
        return amount;
    },
    destroysubdetail: function () {
        var me = this;
        var f = me.getFormcoadetail();
        var fa = me.getFormdata();
        var g = me.getGridsubdetail();
        var records = g.getSelectionModel().getSelection();
        for (var i = records.length - 1; i >= 0; i--) {
            var row = g.getStore().indexOf(records[i]);
            var id = records[i]['data']["voucherdetailsub_id"];
            if (id) {
                fa.deletedsubRows.push(id);
            }
            g.getStore().removeAt(row);
            f.down("[name=amount]").setValue(accounting.formatMoney(me.sumAmountStore(g.getStore())));
        }
    },
});
