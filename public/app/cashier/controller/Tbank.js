Ext.define('Cashier.controller.Tbank', {
    extend: 'Cashier.library.template.controller.Controllermodule',
    alias: 'controller.Tbank',
    requires: [
        'Ext.EventObject',
        'Cashier.template.ComboBoxFields',
        'Cashier.library.template.combobox.Ptusercombobox',
        'Cashier.library.template.combobox.Inoutcombobox',
        'Cashier.library.template.combobox.Accuredcombobox',
        'Cashier.library.template.combobox.Groupcombobox',
        'Cashier.library.template.combobox.Coacombobox',
        'Cashier.library.template.combobox.Coadeptcombobox',
        'Cashier.library.template.checkbox.CheckColumnApplyBank',
        'Cashier.library.template.combobox.Deptprefixcombobox',
        'Cashier.library.template.combobox.Signaturecombobox',
        'Cashier.library.template.combobox.Ptbydefaultprojectcombobox',
        'Cashier.library.template.combobox.Statusciareportcombobox',
        'Cashier.library.template.combobox.Statusflowforreportcombobox',
        'Cashier.library.template.combobox.Statuskasbankforreportcombobox',
        'Cashier.library.template.combobox.Inoutcombobox',
    ],
    views: [
        'tbank.Panel',
        'tbank.Grid',
        'tbank.Gridcoadetail',
        'tbank.Gridvendor',
        'tbank.Gridcia',
        'tbank.FormSearch',
        'tbank.FormData',
        'tbank.FormCoadetail',
        'tbank.FormEditHeaderGiro',
        'tbank.FormVendor',
        'tbank.FormInputVendor',
        'tbank.FormOuttrans',
        'tbank.FormSignature',
        'tbank.FormCopyCia',
        'tbank.FormCopyKasbank',
        'tbank.Gridcopycia',
        'tbank.Gridcopykasbank',
    ],
    stores: [
        'Tbank',
        'Tbankcoadetail',
        'Tbankcia',
        'Tbankvendor',
        'Inout',
        'Ptbyuser',
        'Accured',
        'Deptprefixcombo',
        'Grouptransaction',
        'Coa',
        'Coadeptcombo',
        'Signature',
        'Ptbydefaultproject',
        'Statusciaforreport',
        'Statusflowreport',
        'Statuskasbankforreport',
        'Tcashadvance',
        'Cashbank',
        'Inout',
    ],
    models: [
        'Tbank',
    ],
    refs: [
        {ref: 'grid', selector: 'tbankgrid'},
        {ref: 'griddetail', selector: 'tbankcoadetailgrid'},
        {ref: 'gridvendor', selector: 'tbankvendorgrid'},
        {ref: 'gridcia', selector: 'tbankciagrid'},
        {ref: 'gridcopycia', selector: 'tbankcopyciagrid'},
        {ref: 'gridcopykasbank', selector: 'tbankcopykasbankgrid'},
        {ref: 'formsearch', selector: 'tbankformsearch'},
        {ref: 'formdata', selector: 'tbankformdata'},
        {ref: 'formdatadetail', selector: 'tbankformcoadetail'},
        {ref: 'formvendor', selector: 'tbankformvendor'},
        {ref: 'formsignature', selector: 'tbankformsignature'},
        {ref: 'formouttrans', selector: 'tbankformouttrans'},
        {ref: 'forminputvendor', selector: 'tbankforminputvendor'},
        {ref: 'formeditgiro', selector: 'tbankformeditheadergiro'},
        {ref: 'formcopykasbank', selector: 'tbankformcopykasbank'},
        {ref: 'formcopycia', selector: 'tbankformcopycia'},
        {ref: 'checkapply', selector: 'checkcolumn'},
    ],
    controllerName: 'tbank',
    fieldName: 'transno',
    bindPrefixName: 'Tbank',
    formWidth: 800,
    urlcommon: 'cashier/common/create',
    urlrequest: 'cashier/tbank/create',
    urlheader: 'cashier/tbank/',
    urldetail: 'cashier/tbank/coadetail',
    urlvendor: 'cashier/tbank/vendor',
    urlcia: 'cashier/tbank/outtransbon',
    flaggeneratevoucherno: 0,
    senddata: null,
    voucherprefix_id: 0,
    unpaid: 0,
    info: null,
    status_paid: 'NULL',
    rowproject: null,
    storept: null,
    state: null,
    dateNow: new Date(),
    arraycoadetail: null,
    rowcompanyform: null,
    rowcompanysearch: null,
    accept_date: null,
    prefix: null,
    prefix2: null,
    is_fixed: false,
    fixed_coa: null,
    fixed_account_desc: null,
    countercoadetail: 0,
    project_id: apps.project,
    pt_id: 0,
    fixed_coa_id: 0,
    ptname: null,
    messagedata: null,
    msgdialog: null,
    titledialog: null,
    actiondialog: null,
    coa: null,
    in_out: null,
    idheaderfield: 'kasbank_id',
    idheadervalue: 0,
    delete_tmp: 0,
    flagdetail: 0,
    fieldconfirmvendor: 'vendorname',
    kasbonpaid: 0,
    chequegiro_status: null,
    coa_tmp: null,
    fieldconfirmcoa: 'coa',
    renderdata: null,
    stimulsoft: "resources/stimulsoft/index.php?stimulsoft_client_key=ViewerFx&stimulsoft_report_key=",
    reportpath: "app/cashier/report/",
    paramsStr: null,
    win: null,
    params: null,
    html: null,
    winId: 'myReportWindow',
    report: null,
    init: function (application) {
        var me = this;


        this.control({
            'tbankpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender

            },
            'tbankgrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange,
                select: this.gridSelect,
            },
            'tbankgrid toolbar button[action=create]': {
                click: function () {
                    me.state = 'create';
                    this.formDataShow('create');
                }
            },

            'tbankgrid toolbar button[action=update]': {
                click: function () {
                    me.state = 'create';
                    this.formDataShow('update');
                }
            },
            'tbankgrid toolbar button[action=destroy]': {
                click: function () {
                    me.fieldName = 'coaname';
                    this.dataDestroy();
                }
            },
            'tbankgrid toolbar button[action=print]': {
                click: this.dataPrint
            },
            'tbankgrid toolbar button[action=preview] menu': {
                click: function (menu, item, e, eOpts) {
                    me.previewHandler(item.id);
                }
            },
            'tbankgrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                click: this.gridActionColumnClick
            },
            'tbankgrid  [id=delCustomTbank]': {
                click: function () {
                    alert('a');
                }
            },
            'tbankgrid  [itemId=delCustomTbank]': {
                click: function () {
                    alert('a');
                }
            },
            'tbankgrid actioncolumn [itemId=delCustomTbank]': {
                click: function () {
                    alert('a');
                }
            },
            'tbankformsearch': {
                boxready: this.formSearchReady
            },
            'tbankformsearch button[action=search]': {
                click: this.dataSearch
            },
            'tbankformsearch button[action=reset]': {
                click: this.dataReset
            },
            'tbankformdata': {
                afterrender: this.formDataAfterRender,
                beforedestroy: this.formDataBeforeDestroy,
                boxready: function () {
                    if (me.state == 'update' && me.kasbonpaid > 0) {
                        //me.setWindowouttrans(true);
                        me.renderdata = 'clear';
                    }
                }
            },
            'tbankformdata [name=pt_id] ': {
                'select': function (g, record, item, index, e, eOpts) {
                    var me, form, rowdata;
                    me = this,
                            rowdata = record[0]['data'];
                    me.pt_id = rowdata.pt_id;
                    form = me.getFormdata();
                    form.down("[name=department_id]").setReadOnly(false);
                    form.down("[name=grouptrans_id]").setReadOnly(false);
                    me.generateTransno();
                    me.setStoreGroup();
                    me.setStoreDepartment();
                },
            },
            'tbankformdata [name=dataflow] ': {
                'change': function (g, record, item, index, e, eOpts) {
                    var me, form;
                    me = this,
                            form = me.getFormdata();
                    form.down("[name=voucherprefix_id]").setReadOnly(false);
                    me.in_out = me.getValue(me, 'dataflow', 'value');
                    me.setStorePrefix();
                },
            },
            'tbankformdata [name=voucherprefix_id] ': {
                'select': function (g, record, item, index, e, eOpts) {
                    var me, rowdata, form, countlength;
                    me = this;
                    form = me.getFormdata();
                    rowdata = record[0]['data'];

                    me.is_fixed = rowdata.is_fixed;
                    me.fixed_coa_id = rowdata.fixed_coa_id;
                    me.fixed_coa = rowdata.fixed_coa;
                    me.fixed_account_desc = rowdata.fixed_account_desc;
                    me.prefix = rowdata.prefix;
                    countlength = me.fixed_coa.length;

                    if (me.is_fixed == true || countlength > 0) {
                        me.flagdetail = 1;
                        me.btnDisable(me, 'save', false);
                    } else {
                        me.flagdetail = 0;
                        me.btnDisable(me, 'save', true);
                    }

                    form.down("[name=coa]").setValue(rowdata.coa);
                    form.down("[name=prefix_id]").setValue(rowdata.prefix_id);
                    form.down("[name=coa_id]").setValue(rowdata.coa_id);
                    form.down("[name=coaname]").setValue(rowdata.coaname);
                    me.confirmCIA();
                    me.getPrefixsetup();
                },
            },
            'tbankformdata [name=accept_date] ': {
                'change': function (that, newvalue, oldvalue, eOpts) {
                    var me, rowdata, form;
                    me = this;
                    me.accept_date = me.getFormdata().down('[name=accept_date]').getValue();

                },
            },
            'tbankformdata [name=amount] ': {
                'blur': function (me, The, eOpts) {
                    if (me.lastValue > 0) {
                        this.autoValuedetail();
                    } else {
                        this.buildWarningAlert("Please input Amount first...!");
                    }
                },
            },
            'tbankformdata [name=chequegiro_no] ': {
                'blur': function (me, The, eOpts) {
                    this.setStatus();

                },
            },
            'tbankformdata [name=department_id] ': {
                'select': function (g, record, item, index, e, eOpts) {
                    var me, rowdata, form, amount, countlength;
                    me = this;
                    form = me.getFormdata();
                    rowdata = record[0]['data'];
                    amount = accounting.unformat(form.down("[name=amount]").getValue());
                    if (amount > 0) {
                        //me.autoValuedetail();
                    } else {
                        //me.buildWarningAlert("Please input Amount");
                    }
                },
            },
            'tbankformdata button[action=createvendor]': {
                click: function () {
                    if (me.fixed_coa_id > 0) {
                        me.paramgridvendor.stateform = 'create';
                        me.GenerateFormdata(me.paramgridvendor);
                    } else {
                        me.buildWarningAlert("Please Select Department and Prefix first...!");
                    }

                }
            },
            'tbankformdata button[action=rejectgiro]': {
                click: function () {
                    me.dataRejected();
                }
            },
            'tbankformdata button[action=unrejectgiro]': {
                click: function () {
                    me.dataUnRejected();
                }
            },
            'tbankformdata button[action=unpaid]': {
                click: function () {
                    me.dataUnpaid();
                }
            },
            'tbankformdata button[action=save]': {
                click: function () {
                    var balance, counter;
                    balance = accounting.unformat(me.getFormdata().down("[name=balance]").getValue());
                    counter = balance.length;
                    if (balance > 0 || counter < 1) {
                        this.buildWarningAlert("Amount balance is empty or not balance...!");
                    } else {
                        me.dataSaveBank();
                    }
                }
            },
            'tbankformdata button[action=cancel]': {
                click: function () {
                    me.getGriddetail().getStore().removeAll();
                    this.formDataClose();
                }

            },
            //============================START OUT TRANS====================================================
            'tbankciagrid': {
                boxready: this.gridciaBoxready,
                select: this.gridciaSelected,
            },
            'checkcolumnapplybank': {
                'checkchange': function (column, recordIndex, checked) {
                    var me, form, record, row, totalamount, applyamount, sumtotal, appliedamount, amount;
                    me = this;
                    form = me.getFormouttrans();
                    totalamount = accounting.unformat(form.down('[name=totalamountcia]').getValue());
                    record = me.getGridcia().getStore().getAt(recordIndex);
                    me.recordcia = record;
                    form.getForm().loadRecord(record);
                    row = record['data'];

                    if (row.amount == row.appliedamount) {
                        record['data'].apply = (checked === true) ? 0 : 1;
                        me.buildWarningAlert("Cannot apply this data");
                    } else {
                        if (checked === true) {
                            me.recordcia['data'].statedata = 'create';
                            applyamount = form.down('[name=applyamount]').getValue();
                            sumtotal = parseFloat(totalamount) + parseFloat(applyamount);
                            accounting.formatMoney(form.down('[name=totalamountcia]').setValue(sumtotal));
                        } else {
                            me.recordcia['data'].statedata = '';
                            applyamount = form.down('[name=applyamount]').getValue();
                            sumtotal = parseFloat(totalamount) - parseFloat(applyamount);
                            if (row.kasbank_kasbon_id !== 0) {
                                sumtotal = parseFloat(totalamount) - parseFloat(applyamount) + parseFloat(row.applyamount);
                            }
                            accounting.formatMoney(form.down('[name=totalamountcia]').setValue(sumtotal));
                        }
                    }
                }
            },
            'tbankformouttrans': {
                afterrender: this.formOuttransAfterrender
            },
            'tbankformouttrans button[action=apmount]': {
                click: function () {
                    me.applyOuttrans();
                }
            },
            'tbankformouttrans button[action=ok]': {
                click: function () {
                    var form, amount;
                    form = me.getFormouttrans();
                    amount = accounting.unformat(form.down("[name=totalamountcia]").getValue());
                    if (amount > 0) {
                        me.Saveouttrans();
                        me.autoValuedetail();
                    } else {
                        me.buildWarningAlert("Total Amount must be greater than 0 ...!");
                    }
                }
            },
            'tbankformouttrans button[action=cancel]': {
                click: function () {
                    me.renderdata = 'clear';
                }

            },
            //============================START OUT TRANS====================================================


            //=============================START VENDOR==================================================
            'tbankvendorgrid': {
                select: this.gridvendorSelect,
                itemdblclick: this.gridvendorItemDblClick,
            },
            'tbankvendorgrid actioncolumn': {
                click: function (view, cell, row, col, e) {
                    me.gridActionColumnvendorclick(view, cell, row, col, e);
                }
            },
            'tbankvendorgrid toolbar button[action=create]': {
                click: function () {
                    me.paramformvendor.stateform = 'create';
                    me.GenerateFormdata(me.paramformvendor);
                }
            },
            'tbankvendorgrid toolbar button[action=update]': {
                click: function () {
                    me.paramformvendor.stateform = 'update';
                    me.GenerateFormdata(me.paramformvendor);
                }
            },
            'tbankvendorgrid toolbar button[action=destroy]': {
                click: function (view, cell, row, col, e) {
                    me.paramformvendor.stateform = 'delete';
                    me.dataDestroyvendorwithflag();

                }
            },
            'tbankformvendor': {
                afterrender: this.formVendorAfterrender
            },
            'tbankforminputvendor': {
                afterrender: this.formInputVendorAfterrender
            },
            'tbankformvendor button[action=apply]': {
                click: function () {
                    var form, amount;
                    form = me.getFormvendor();
                    amount = accounting.unformat(form.down("[name=totalvendor]").getValue());
                    if (amount > 0) {
                        me.applyAmountvendor();
                        me.autoValuedetail();
                    } else {
                        me.buildWarningAlert("Total Amount must be greater than 0 ...!");
                    }
                }
            },
            'tbankformvendor button[action=cancel]': {
                click: function () {
                    var store = me.getGridvendor().getStore();
                    store.removeAll();
                }
            },
            'tbankforminputvendor [name=amount]': {
                blur: function (that, The, eOpts) {
                    if (that.lastValue == '') {
                        accounting.formatMoney(me.getForminputvendor().down("[name=amount]").setValue(0));
                    }
                    me.calculateTotalVendor('amount');
                }
            },
            'tbankforminputvendor [name=ppn]': {
                blur: function (that, The, eOpts) {
                    if (that.lastValue == '') {
                        accounting.formatMoney(me.getForminputvendor().down("[name=ppn]").setValue(0));
                    }
                    me.calculateTotalVendor('ppn');
                }
            },
            'tbankforminputvendor [name=pph]': {
                blur: function (that, The, eOpts) {
                    if (that.lastValue == '') {
                        accounting.formatMoney(me.getForminputvendor().down("[name=pph]").setValue(0));
                    }
                    me.calculateTotalVendor('pph');
                }
            },
            'tbankforminputvendor button[action=save]': {
                click: function () {
                    me.saveVendorStore();
                }
            },
            //=============================END VENDOR==================================================




            //========================DETAIL==============================
            'tbankcoadetailgrid': {
                //  itemdblclick: this.gridItemDblClickdetail,
                select: this.gridSelectdetail,
                selectionchange: this.cellgridDetail,
                itemdblclick: this.griddetailitemdoubleclick,
            },
            'tbankcoadetailgrid actioncolumn': {
                click: function (view, cell, row, col, e) {
                    me.gridActionColumndetailclick(view, cell, row, col, e);
                }
            },
            'tbankcoadetailgrid toolbar button[action=copyfromcia]': {
                click: function () {
                    if (me.fixed_coa_id > 0) {
                        me.paramcopycia.stateform = 'read';
                        me.GenerateFormdata(me.paramcopycia);
                    } else {
                        me.buildWarningAlert("Header Bank is empty, Please complete the header data.");
                    }
                }
            },
            'tbankcoadetailgrid toolbar button[action=copyfromkasbank]': {
                click: function () {
                    if (me.fixed_coa_id > 0) {
                        me.paramcopykasbank.stateform = 'read';
                        me.GenerateFormdata(me.paramcopykasbank);
                    } else {
                        me.buildWarningAlert("Header Bank is empty, Please complete the header data.");
                    }
                }
            },
            'tbankcoadetailgrid toolbar button[action=create]': {
                click: function () {
                    me.paramdetail.stateform = 'create';
                    me.GenerateFormdata(me.paramdetail);
                }
            },
            'tbankcoadetailgrid toolbar button[action=update]': {
                click: function () {
                    me.paramdetail.stateform = 'update';
                    me.GenerateFormdata(me.paramdetail);
                }
            },
            'tbankcoadetailgrid toolbar button[action=destroy]': {
                click: function () {
                    me.fieldName = 'coaname';
                    this.dataDestroycoadetailwithflag();
                    me.setSumdetail();
                }
            },
            'tbankformcoadetail ': {
                'afterrender': function () {
                    var tmp_inout, in_out, formheader, formdetail, pd, counter, seq;
                    pd = me.paramdetail;
                    formheader = me.getFormdata();
                    formdetail = me.getFormdatadetail();
                    me.setStoreCoadept();
                    tmp_inout = formheader.down("[name=dataflow]").getValue();



                    switch (pd.stateform) {
                        case 'create':
                            if (tmp_inout == 'I') {
                                formdetail.down("[name=dataflow]").setValue('O');
                            } else {
                                formdetail.down("[name=dataflow]").setValue('I');
                            }

                            //me.getGriddetail().getStore().removeAll();
                            seq = me.indexCoadetail();
                            formdetail.down("[name=seq]").setValue(seq);
                            formdetail.down("[name=kasbank_id]").setValue(me.idheadervalue);
                            formdetail.down("[name=kasbankdetail_id]").setValue('0');
                            pd.iddetail = 0;
                            break;
                        case 'update':
                            formdetail.loadRecord(pd.row);
                            pd.iddetail = pd.row.kasbankdetail_id;
                            formdetail.down("[name=coa_id]").setValue(pd.row.coa_id);
                            if (me.fixed_account_desc == pd.row.coaname) {
                                formdetail.down("[name=coa_id]").setValue(me.fixed_coa);
                            }
                            formdetail.down("[name=coaname]").setValue(pd.row.coaname);
                            //formdetail.down("[name=coa_id]").setRawValue(pd.row.coa);
                            formdetail.down("[name=description]").setValue(pd.row.description);
                            formdetail.down("[name=amount]").setValue(pd.row.amount);
                            break;
                        default:
                    }
                    me.formatCurrencyFormdata(me, formheader);
                    me.formatCurrencyFormdata(me, formdetail);

                },
            },
            'tbankformcoadetail [name=coa_id]': {
                'select': function (g, record, item, index, e, eOpts) {
                    var me, rowdata, form;
                    me = this;
                    form = me.getFormdatadetail();
                    rowdata = record[0]['data'];
                    me.coa = rowdata.coa;
                    form.down("[name=coaname]").setValue(rowdata.coaname);
                },
            },
            'tbankformcoadetail button[action=save]': {
                'click': function (me, e, eOpts) {
                    var me;
                    me = this;
                    me.dataSaveDetailstore();
                },
            },
            'tbankformeditheadergiro': {
                'afterrender': function (that, eOpts) {
                    me.formeditheaderafterrender();
                },
            },
            'tbankformeditheadergiro button[action=submit]': {
                'click': function (me, e, eOpts) {
                    var me;
                    me = this;
                    me.dataSaveEditHeader();
                },
            },

            'tbankformsignature ': {
                'afterrender': function () {
                    var me;
                    me = this;
                    me.setStoreSignature();
                },
            },
            'tbankformsignature [name=signature_id]': {
                'collapse': function () {
                    //ketika tertutup comboboxnya
                    var me, form, sign1, sign2, value;
                    me = this;
                    form = me.getFormsignature();
                    sign1 = form.down('[name=signature_id]').getRawValue();
                    sign2 = form.down('[name=signature_id_2]').getRawValue();
                    if (sign1.length > 0 && sign2.length > 0) {
                        //me.Fdisable(form, 'signature_id', true);
                        if (sign1 == sign2) {
                            me.buildWarningAlert("Signature 1 cannot same with Signature 2");
                            me.setValCombo(form, 'signature_id', 0, '');
                        }
                    }
                },
            },
            'tbankformsignature [name=signature_id_2]': {
                'collapse': function () {
                    //ketika tertutup comboboxnya
                    var me, form, sign1, sign2;
                    me = this;
                    form = me.getFormsignature();
                    sign1 = form.down('[name=signature_id]').getRawValue();
                    sign2 = form.down('[name=signature_id_2]').getRawValue();
                    if (sign1.length > 0 && sign2.length > 0) {
                        if (sign1 == sign2) {
                            me.buildWarningAlert("Signature 2 cannot same with Signature 1");
                            me.setValCombo(form, 'signature_id_2', 0, '');
                        } else {
                            //me.Fdisable(form, 'signature_id_2', true);
                        }
                    }
                },
            },

            'tbankformsignature button[action=save]': {
                'click': function () {
                    var me;
                    me = this;
                    me.dataPrintformgiro();
                },
            },
            'tbankformcopycia': {
                'afterrender': function () {
                    var me, form;
                    me = this;
                    form = me.getFormcopycia();
                    me.Fdisable(form, "pt_id", true);
                    me.Fdisable(form, "fromdate", true);
                    me.Fdisable(form, "untildate", true);
                    me.setStorePtbydefaultproject();
                    me.setValCombo(form, "statusdata", 'ALL', 'ALL DATA');
                },
            },
            'tbankformcopykasbank': {
                'afterrender': function () {
                    var me, form;
                    me = this;
                    form = me.getFormcopykasbank();
                    me.Fdisable(form, "pt_id", true);
                    me.Fdisable(form, "fromdate", true);
                    me.Fdisable(form, "untildate", true);
                    me.setStorePtbydefaultproject();
                    me.setValCombo(form, "kasbank", 'ALL', 'ALL DATA');
                    me.setValCombo(form, "dataflow", 'ALL', 'ALL DATA');
                },
            },
            'tbankformcopycia [name=allcompany]': {
                change: function (the, newValue, oldValue, eOpts) {
                    var me, form;
                    me = this;
                    form = me.getFormcopycia();
                    if (newValue == true) {
                        me.Fdisable(form, "pt_id", true);
                    } else {
                        me.Fdisable(form, "pt_id", false);
                    }
                    me.setValCombo(form, "pt_id", '', '');
                },
            },
            'tbankformcopykasbank [name=allcompany]': {
                change: function (the, newValue, oldValue, eOpts) {
                    var me, form;
                    me = this;
                    form = me.getFormcopykasbank();
                    if (newValue == true) {
                        me.Fdisable(form, "pt_id", true);
                    } else {
                        me.Fdisable(form, "pt_id", false);
                    }
                    me.setValCombo(form, "pt_id", '', '');
                },
            },
            'tbankformcopycia [name=allaccept_date]': {
                change: function (the, newValue, oldValue, eOpts) {
                    var me, form;
                    me = this;
                    form = me.getFormcopycia();
                    if (newValue == true) {
                        me.Fdisable(form, "fromdate", true);
                        me.Fdisable(form, "untildate", true);
                    } else {
                        me.Fdisable(form, "fromdate", false);
                        me.Fdisable(form, "untildate", false);
                    }
                    me.setVal(form, "fromdate", '');
                    me.setVal(form, "untildate", '');
                },
            },
            'tbankformcopykasbank [name=allaccept_date]': {
                change: function (the, newValue, oldValue, eOpts) {
                    var me, form;
                    me = this;
                    form = me.getFormcopykasbank();
                    if (newValue == true) {
                        me.Fdisable(form, "fromdate", true);
                        me.Fdisable(form, "untildate", true);
                    } else {
                        me.Fdisable(form, "fromdate", false);
                        me.Fdisable(form, "untildate", false);
                    }
                    me.setVal(form, "fromdate", '');
                    me.setVal(form, "untildate", '');
                },
            },
            'tbankformcopycia button[action=getdata]': {
                click: this.getDatacopycia
            },
            'tbankformcopykasbank button[action=getdata]': {
                click: this.getDatacopykasbank
            },
            'tbankcopyciagrid': {
                selectionchange: this.gridcopyciaSelectionChange,
            },
            'tbankcopykasbankgrid': {
                selectionchange: this.gridcopykasbankSelectionChange,
            },
            'tbankformcopycia button[action=save]': {
                click: this.Datagridcopyciacopytogriddetail
            },
            'tbankformcopykasbank button[action=save]': {
                click: this.Datagridcopykasbankcopytogriddetail
            },
        });
    },
    indexCoadetail: function () {
        var me, form, store, counter;
        me = this;
        store = me.getGriddetail().getStore();
        counter = store.getCount();
        return counter + 1;
    },
    setStatus: function () {
        var me, form, chequegiro_no, chequegiro_status, status,
                labelstatus, status_posting;
        me = this;
        form = me.getFormdata();
        chequegiro_no = form.down("[name=chequegiro_no]").getValue();
        chequegiro_status = form.down("[name=chequegiro_status]").getValue();
        status_posting = form.down("[name=is_posting]").getValue();

        if (chequegiro_no.length > 0 && me.state == 'update' && chequegiro_status !== 'UNPROCESSED' && chequegiro_status !== 'PROCESSED') {
            labelstatus = chequegiro_status;
        } else if (chequegiro_no.length > 0 && me.state == 'update' && chequegiro_status == 'UNPROCESSED') {
            labelstatus = "PROCESSED";
        } else if (chequegiro_no.length > 0 && me.state == 'update' && chequegiro_status == 'PROCESSED') {
            labelstatus = "PROCESSED";
        } else if (chequegiro_status == 'APPROVE') {
            labelstatus = "APPROVE";
        } else if (chequegiro_no.length > 0 && me.state == 'update') {
            labelstatus = "PROCESSED";
        } else if (chequegiro_no.length > 0 && me.state == 'create') {
            labelstatus = "PROCESSED";
        } else if (chequegiro_no.length < 1 && me.state == 'update') {
            labelstatus = "UNPROCESSED";
            form.down("[name=chequegiro_date]").setValue('');
        } else if (chequegiro_no.length < 1 && me.state == 'create') {
            labelstatus = "UNPROCESSED";
            form.down("[name=chequegiro_date]").setValue('');
        }

        form.down("[name=lblstatus]").setText(labelstatus, true);
        me.setValue(me, 'chequegiro_status', labelstatus);
        form.down("[name=chequegiro_no]").setValue(chequegiro_no);



        me.btnHidden(me, 'unpaid', false);

        if (labelstatus == 'PAID') {
            me.btnHidden(me, 'createvendor', false);
            me.btnHidden(me, 'rejectgiro', false);
            me.btnHidden(me, 'unrejectgiro', false);

            if (apps.project == 1) { // KANTOR PUSAT SEMENTARA OPEN EDIT voucher_no
                me.btnHidden(me, 'save', true);
                me.setReadonly(form, 'voucher_no', false);
                me.setReadonly(form, 'amount', true);
                me.setReadonly(form, 'chequegiro_date', true);
                me.setReadonly(form, 'chequegiro_receive_date', true);
                me.setReadonly(form, 'description', true);
                me.setReadonly(form, 'dataflow', true);
                me.setReadonly(form, 'description', true);
                me.setReadonly(form, 'department_id', true);
                me.setReadonly(form, 'chequegiro_accured', true);
                me.setReadonly(form, 'chequegiro_no', true);
                me.setReadonly(form, 'chequegiro_release_date', true);
                me.setReadonly(form, 'department_id', true);
                me.setReadonly(form, 'grouptrans_id', true);
            } else {
                me.btnHidden(me, 'save', false);
            }

            if (status_posting == 0) {
                me.btnHidden(me, 'unpaid', true);
            }


        } else if (labelstatus == 'APPROVE') {
            form.getForm().getFields().each(function (field) {
                field.setReadOnly(true);
            });
            me.hideBtn(form, 'createvendor', true);
            me.hideBtn(form, 'rejectgiro', true);
            me.hideBtn(form, 'unrejectgiro', true);
            me.hideBtn(form, 'save', true);
        } else {
            me.btnHidden(me, 'createvendor', true);
            me.btnHidden(me, 'rejectgiro', true);
            me.btnHidden(me, 'unrejectgiro', true);
            me.btnHidden(me, 'save', true);
        }


    },
    paramdetail: {
        //start formgeneate
        fromlocation: 'Cashier.view.tbank.FormCoadetail',
        formtitle: 'Form Detail Data', formicon: 'icon-form-add',
        formid: 'win-tbankformcoadetail', formlayout: 'fit',
        formshadow: 'frame', formmask: 'Loading...',
        formwidth: 500, formtimeout: 0,
        stateform: null, formaction: null, formproperties: null, formwindows: null,
        //end formgeneate
        //start properties form
        iddetail: 0, store: null, data: null, record: null, grid: null, row: null, form: null,
        checkdata: false, object: null, rowdata: null, action: null, totaldetail: 0,
        //start properties form
    },
    paramcopycia: {
        //start formgeneate
        fromlocation: 'Cashier.view.tbank.FormCopyCia',
        formtitle: 'Form Copy From Transaction Cash in Advance', formicon: 'icon-form-add',
        formid: 'win-tbankformcopycoa', formlayout: 'fit',
        formshadow: 'frame', formmask: 'Loading...',
        formwidth: 900, formtimeout: 0,
        stateform: null, formaction: null, formproperties: null, formwindows: null,
        //end formgeneate
        //start properties form
        iddetail: 0, store: null, data: null, record: null, grid: null, row: null, form: null,
        checkdata: false, object: null, rowdata: null, action: null, totaldetail: 0,
        //start properties form
    },
    paramcopykasbank: {
        //start formgeneate
        fromlocation: 'Cashier.view.tbank.FormCopyKasbank',
        formtitle: 'Form Copy From Transaction Cash or Bank', formicon: 'icon-form-add',
        formid: 'win-tbankformcopykasbank', formlayout: 'fit',
        formshadow: 'frame', formmask: 'Loading...',
        formwidth: 900, formtimeout: 0,
        stateform: null, formaction: null, formproperties: null, formwindows: null,
        //end formgeneate
        //start properties form
        iddetail: 0, store: null, data: null, record: null, grid: null, row: null, form: null,
        checkdata: false, object: null, rowdata: null, action: null, totaldetail: 0,
        //start properties form
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
            me.idheadervalue = row.kasbank_id;
        }
    },
    gridSelectdetail: function () {
        var me, grid, counter, store, record, row, pd;
        me = this;
        pd = me.paramdetail;

        grid = me.getGriddetail();
        store = grid.getStore();
        grid.down('#btnEdit').setDisabled(false);
        grid.down('#btnDelete').setDisabled(false);
        counter = store.getCount();
        if (counter > 0) {
            record = grid.getSelectionModel().getSelection()[0];
            pd.row = record['data'];
            pd.iddetail = pd.row.kasbankdetail_id;
        }
    },
    gridActionColumndetailclick: function (view, cell, row, col, e) {
        var me, pd, action = '';
        me = this;
        pd = me.paramdetail;

        me.getGriddetail().getSelectionModel().select(row);
        pd.action = e.getTarget().className.match(/\bact-(\w+)\b/)[1];
        pd.rowdata = me.getGriddetail().getStore().getAt(row);
        me.actiondataDetail();
    },
    cellgridDetail: function () {
        var me, pd = '';
        me = this;
        pd = me.paramdetail;
        pd.grid = me.getGriddetail();
        pd.object = pd.grid.getSelectionModel().getSelection();
        pd.data = '';
        for (var i = 0; i <= pd.object.length - 1; i++) {
            pd.data = pd.object[i];
        }
        if (pd.data !== '') {
            // pd.rowdata = pd.data['data'];
            pd.rowdata = pd.data;
            pd.iddetail = pd.rowdata.kasbankdetail_id;
        }
    },
    griddetailitemdoubleclick: function () {
        var me, pd;
        me = this;
        pd = me.paramdetail;
        pd.action = 'update';
        me.actiondataDetail();
    },
    actiondataDetail: function () {
        var me, pd, returndata;
        me = this;
        pd = me.paramdetail;
        me.cellgridDetail();

        switch (pd.action) {
            case 'update':
                me.paramdetail.stateform = 'update';
                me.GenerateFormdata(me.paramdetail);
                break;
            case 'destroy':
                me.fieldName = 'coaname';
                me.dataDestroycoadetailwithflag();
                me.setSumdetail();
                break;
            default:
                returndata = "No action selected";
        }
    },
    getCoadept: function () {
        var me, store, state;
        me = this;
        store = me.getStore('Coadeptcombo');
        store.load({});
    },
    autoValuedetail: function () {
        var me, pd, form, valueform, grid, store, record, row, tmp_inout, in_out;
        me = this;
        pd = me.paramdetail;
        form = me.getFormdata();
        valueform = form.getValues();
        if (me.in_out == 'I') {
            in_out = 'O';
        } else {
            in_out = 'I';
        }

        if (me.flagdetail > 0) {
            switch (me.state) {
                case 'create':
                    grid = me.getGriddetail();
                    store = grid.getStore();
                    row = valueform;
                    row[me.idheaderfield] = me.idheadervalue;
                    row['kasbankdetail_id'] = 0;
                    row['project_id'] = apps.project
                    row['pt_id'] = me.pt_id;
                    row['coa_id'] = me.fixed_coa_id;
                    row['coa'] = me.fixed_coa;
                    row['coa_tmp'] = me.fixed_coa;
                    row['coaname'] = me.fixed_account_desc;
                    row['dataflow'] = in_out;
                    row['statedata'] = 'create';

                    pd.row = row;
                    me.Checkdatadetail();
                    if (pd.checkdata == false) {
                        console.log(row);
                        store.add(row);
                        store.commitChanges();
                        form.down("[name=totalheader]").setValue(valueform.amount);
                        form.down("[name=totaldetail]").setValue(valueform.amount);
                        form.down("[name=balance]").setValue(valueform.amount - valueform.amount);
                        me.setSumdetail();
                    } else {
                        //me.buildWarningAlert("Sorry code = " + me.fixed_coa + " ,already exist in this transaction");
                        me.deleteCoatmp();
                        if (me.delete_tmp > 0) {
                            store.add(row);
                            store.commitChanges();
                            form.down("[name=totalheader]").setValue(valueform.amount);
                            form.down("[name=totaldetail]").setValue(valueform.amount);
                            form.down("[name=balance]").setValue(valueform.amount - valueform.amount);
                        }
                        me.setSumdetail();
                    }
                    break;
                case 'update':
                    grid = me.getGriddetail();
                    store = grid.getStore();
                    row = valueform;
                    row[me.idheaderfield] = me.idheadervalue;
                    row['kasbankdetail_id'] = 0;
                    row['project_id'] = apps.project
                    row['pt_id'] = me.pt_id;
                    row['coa_id'] = me.fixed_coa_id;
                    row['coa'] = me.fixed_coa;
                    row['coa_tmp'] = me.fixed_coa;
                    row['coaname'] = me.fixed_account_desc;
                    row['dataflow'] = in_out;
                    row['statedata'] = 'create';

                    pd.row = row;
                    me.deleteCoatmp();
                    //console.log(me.delete_tmp);
                    if (me.delete_tmp > 0) {
                        store.add(row);
                        store.commitChanges();
                        form.down("[name=totalheader]").setValue(valueform.amount);
                        form.down("[name=totaldetail]").setValue(valueform.amount);
                        form.down("[name=balance]").setValue(valueform.amount - valueform.amount);
                    }
                    me.setSumdetail();
                    break;
            }
            me.formatCurrencyFormdata(me, form);
        } else {
            me.buildWarningAlert("Fixed coa is false,please setup your vocher prefix first...!");
        }


    },
    dataSaveDetailstore: function () {
        var me, pd = '';
        me = this;
        pd = me.paramdetail;
        pd.form = me.getFormdatadetail().getForm();
        if (pd.form.isValid()) {
            me.unformatCurrencyFormdata(me, me.getFormdatadetail());
            pd.grid = me.getGriddetail();
            pd.store = me.getGriddetail().getStore();
            pd.row = pd.form.getValues();
            pd.row[me.idheaderfield] = me.idheadervalue;
            if (pd.iddetail == '0') {
                pd.row['statedata'] = 'create';
            } else {
                pd.row['statedata'] = 'update';
            }
            me.Checkdatadetail();
            switch (pd.stateform) {
                case 'create':


                    if (pd.checkdata == false) {
                        pd.row['project_id'] = apps.project;
                        pd.row['pt_id'] = me.pt_id;
                        pd.row['coa'] = me.coa;
                        pd.store.add(pd.row);
                        pd.store.commitChanges();
                    } else {
                        me.buildWarningAlert("Sorry code = " + me.coa + " ,already exist in this transaction");
                    }
                    break;
                case 'update':
                    pd.record = pd.store.getAt(pd.store.indexOf(pd.grid.getSelectionModel().getSelection()[0]));
                    pd.record.beginEdit();
                    pd.row['kasbankdetail_id'] = pd.iddetail;
                    pd.record.set(pd.row);
                    pd.record.endEdit();
                    pd.store.commitChanges();
                    break;
            }
            pd.store.filter('deleted', false);
            pd.totaldetail = pd.store.sum('amount');
            me.setSumdetail();
            me.getFormdatadetail().up('window').close();
        }
    },
    dataDestroycoadetailwithflag: function () {
        var me, rows, ph, pd, confirmmsg, successmsg, failmsg,
                record, recordcounttext, grid, store, selectedRecord, msg, successcount
                , parameter, pesan, dataconfirm, ph, pd;

        me = this;
        ph = me.paramheader;
        pd = me.paramcoadetail;
        dataconfirm = me.fieldconfirmcoa;
        grid = me.getGriddetail();

        rows = grid.getSelectionModel().getSelection();
        if (rows.length < 1) {
            Ext.Msg.alert('Info', 'No record selected !');
            return;
        } else {
            recordcounttext = rows.length + ' record' + (rows.length > 1 ? 's' : '');
            store = grid.getStore();

            if (rows.length == 1) {
                selectedRecord = '[' + store.getAt(store.indexOf(rows[0])).get(dataconfirm) + ']';
                confirmmsg = 'Delete ' + selectedRecord + ' ?';
                failmsg = 'Error: Unable to delete ' + selectedRecord + '.';
            } else {
                confirmmsg = 'This action will delete ' + recordcounttext + '.<br />Continue ?';
                failmsg = 'Error: Unable to delete data.';
            }

            Ext.Msg.confirm('Delete Data', confirmmsg, function (btn) {
                if (btn == 'yes') {
                    resetTimer();
                    msg = function () {
                        grid.up('window').mask('Deleting data, please wait ...');
                    };
                    for (var i = 0; i < rows.length; i++) {
                        record = rows[i];
                        record.set("deleted", true);
                        record.set("statedata", 'delete');
                        store.clearFilter(true);
                        store.filter(me.idheaderfield, me.idheadervalue);
                        store.filter('deleted', false);
                    }

                }
            });
        }
    },
    dataSaveDetaildb: function (idheader) {
        var me, store, counter, state, data, pd, stateform, iddata;
        me = this;
        stateform = me.getFormdata().up('window').state.toLowerCase();
        pd = me.paramdetail;
        store = me.getGriddetail().getStore();

        if (stateform == 'create') {
            store.filter(me.idheaderfield, '0');
        } else {
            store.filter(me.idheaderfield, idheader);
        }
        counter = store.getCount();
        if (counter > 0) {
            store.each(function (record, index) {
                iddata = record.get("kasbankdetail_id");
                state = record.get("statedata");
                data = record['data'];
//                if (state == 'create' && stateform == 'create') {
//                    data['seq'] = index + 1;
//                } else {
//                    data['seq'] = counter + index;
//                }
                data[me.idheaderfield] = idheader;
                data['parametersql'] = state;
                data['hideparam'] = 'default';
                if (me.urldetail !== me.urldetail + state) {
                    if (state == 'create' || state == 'update') {
                        me.senddata = data;
                        me.urlrequest = me.urldetail + state;
                        me.AjaxRequest();
                    }
                    if (state == 'delete' && iddata !== 0) {
                        me.senddata = data;
                        me.urlrequest = me.urldetail + state;
                        me.AjaxRequest();
                    }
                }
            });

            store.clearFilter(true);
        }
    },
    setSumIntransaction: function (store) {
        var me, form, amountheader, sum, total;
        me = this;
        form = me.getFormdata();
        if (me.in_out == 'I') {
            amountheader = accounting.unformat(form.down('[name=amount]').getValue());
        } else {
            amountheader = 0;
        }
        sum = 0;
        store.each(function (record, index) {
            if (record.get('dataflow') == 'I') {
                sum += record.get('amount');
            }
        });
        total = parseFloat(amountheader) + parseFloat(sum);
        return total;
    },
    setSumOuttransaction: function (store) {
        var me, form, amountheader, sum, total;
        me = this;
        form = me.getFormdata();
        if (me.in_out == 'O') {
            amountheader = accounting.unformat(form.down('[name=amount]').getValue());
        } else {
            amountheader = 0;
        }
        sum = 0;
        store.each(function (record, index) {
            if (record.get('dataflow') == 'O') {
                sum += record.get('amount');
            }
        });
        total = parseFloat(amountheader) + parseFloat(sum);
        return total;
    },
    setTotaldetail: function (store) {
        var me, form, amountheader, sum_in, sum_out, total;
        me = this;
        sum_in = sum_out = 0;
        store.each(function (record, index) {
            if (record.get('dataflow') == 'I') {
                sum_in += record.get('amount');
            }
            if (record.get('dataflow') == 'O') {
                sum_out += record.get('amount');
            }
        });

        if (me.in_out == 'I') {
            total = parseFloat(sum_out) - parseFloat(sum_in);
        } else {
            total = parseFloat(sum_in) - parseFloat(sum_out);
        }
        return total;
    },

    setSumdetail: function () {
        var me, store, form, totalheader, totaldetail, balance, msgdata, status, voucher_no,
                total_in, total_out, stateform = '';

        me = this;
        form = me.getFormdata();
        store = me.getGriddetail().getStore();
        store.clearFilter(true);
        stateform = form.up('window').state.toLowerCase();
        totalheader = accounting.unformat(form.down('[name=amount]').getValue());

        store.filter('kasbank_id', me.idheadervalue);
        store.filter('deleted', false);
        //totaldetail = store.sum('amount');

        total_in = me.setSumIntransaction(store);
        total_out = me.setSumOuttransaction(store);
        totaldetail = me.setTotaldetail(store);


        if (totaldetail < 1 && stateform == 'update') {
            totaldetail = me.paramdetail.totaldetail;
        }

        voucher_no = form.down('[name=voucher_no]').getValue();
        //balance = totalheader - totaldetail;
        balance = (parseFloat(total_in) - parseFloat(total_out));

        me.setValue(me, 'totaldetail', accounting.formatMoney(totaldetail));
        me.setValue(me, 'totalheader', accounting.formatMoney(totalheader));
        me.setValue(me, 'balance', accounting.formatMoney(balance));

        if (totalheader == totaldetail) {
            msgdata = 'Balance';
            status = 'benar';
        } else if (totalheader <= totaldetail) {
            msgdata = 'Detail total must be same with Header Total';
            status = 'salah';
        } else if (totalheader >= totaldetail) {
            msgdata = 'Header total must be same with Detail Total';
            status = 'salah';
        } else {
            msgdata = 'Data Error';
            status = 'salah';
        }

        if (status == 'salah') {
            form.down('#btnSave').setDisabled(true);
            form.setTitle("<span style='background-color: yellow; border: 5px solid yellow;'>VOUCHER NO : " + voucher_no + " , Total Header : " + totalheader + " , Total Detail :" + totaldetail + " , Balance :" + balance + " , Status : Not Balance" + "</span>");
        } else {
            form.down('#btnSave').setDisabled(false);
            form.setTitle("VOUCHER NO : " + voucher_no + " , Total Header : " + totalheader + " , Total Detail" + totaldetail + " , Balance :" + balance + " , Status : Balance");
        }
        store.clearFilter();
        store.filter('kasbank_id', me.idheadervalue);
        store.filter('deleted', false);
        me.formatCurrencyFormdata(me, form);
    },
    dataRejected: function () {
        var me, form, status;
        me = this;
        form = me.getFormdata();
        status = form.down("[name=chequegiro_status]").getValue();
        if (status !== 'PAID') {
            me.setValue(me, 'chequegiro_reject_date', me.dateNow);
            me.setValue(me, 'chequegiro_reject_by', apps.uid);
            form.down("[name=lblstatus]").setText('REJECTED', true);
            me.setValue(me, 'chequegiro_status', 'REJECTED');
            me.dataSaveBank();
        } else {
            me.buildWarningAlert("Sorry Data not allowed REJECT, Because has been PAID");
        }
    },
    dataUnRejected: function () {
        var me, form, status;
        me = this;
        form = me.getFormdata();
        status = form.down("[name=chequegiro_status]").getValue();
        if (status == 'REJECTED') {
            me.setValue(me, 'chequegiro_reject_date', '');
            me.setValue(me, 'chequegiro_reject_by', 0);
            form.down("[name=lblstatus]").setText('PROCESSED', true);
            me.setValue(me, 'chequegiro_status', 'PROCESSED');
            me.dataSaveBank();
        } else {
            me.buildWarningAlert("Can't UnRejected, only the data REJECTED  function will be work.");
        }
    },
    dataUnpaid: function () {
        var me, form, voucher_no_tmp;
        me = this;
        form = me.getFormdata();
        voucher_no_tmp = me.getVal(form, 'voucher_no_tmp', 'value');
        //me.setVal(form, 'voucher_no', voucher_no_tmp);
        me.setVal(form, 'chequegiro_payment_date', '');
        form.down("[name=lblstatus]").setText('PROCESSED', true);
        me.setValue(me, 'chequegiro_status', 'PROCESSED');
        form.down('[action=save]').setVisible(true);
        form.down('[name=voucherprefix_id]').setDisabled(false);
        form.down('[name=voucherprefix_id]').setValue(me.voucherprefix_id);
        me.prefix = me.prefix2;
        //me.generateVoucherno();
        me.unpaid = 1;


//        me.dataSaveBank();
    },
    dataSaveBank: function () {
        var me, form, formdata, addingRecord, vp, vps, x, store, stotedetail, data, record,
                valuedata, idProperty, rec, paramdata, rowdata, state_submit, chequegiro_no,
                chequegiro_status, idProperty, storedetail, counterdetail;
        me = this;
        form = me.getFormdata();
        formdata = form.getForm();

        if (formdata.isValid()) {
            resetTimer();
            me.unformatCurrencyFormdata(me, form);

            store = me.getGrid().getStore();
            storedetail = me.getGriddetail().getStore();
            counterdetail = storedetail.getCount();
            if (counterdetail < 1) {
                form.down("[name=totaldetail]").setValue(0);
                form.down("[name=balance]").setValue(form.down('[name=totalheader]').getValue());
                me.buildWarningAlert(" Data on grid detail is empty");
            } else {
                valuedata = formdata.getValues();
                form.up('window').body.mask('Saving data, please wait ...');
                state_submit = form.up('window').state.toLowerCase();
                if (state_submit == 'create') {
                    me.flaggeneratevoucherno = '1';
                    me.generateVouchernov2();
                }
                switch (state_submit) {
                    case 'create':
                        valuedata['kasbank'] = 'BANK';
                        valuedata['hideparam'] = state_submit;
                        store.add(valuedata);
                        record = store.findRecord('kasbank_id', me.idheadervalue);
                        data = record['data'];
                        me.senddata = data;
                        me.urlrequest = me.urlheader + state_submit;
                        me.AjaxRequest();
                        store.commitChanges();
                        break;
                    case 'update':
//                        if (me.unpaid) {
//                            me.flaggeneratevoucherno = '1';
//                            me.generateVouchernov2();
//                        }
                        // console.log(me.unpaid);
                        valuedata['hideparam'] = state_submit;
                        valuedata['kasbank'] = 'BANK';
                        idProperty = store.getProxy().getReader().getIdProperty();
                        rec = store.getById(parseInt(formdata.findField(idProperty).getValue(), 10));
                        rec.beginEdit();
                        rec.set(valuedata);
                        rec.endEdit();
                        record = store.findRecord('kasbank_id', me.idheadervalue);
                        data = record['data'];
                        me.senddata = data;
                        me.urlrequest = me.urlheader + state_submit;
                        me.AjaxRequest();
                        store.commitChanges();
                        break;
                    default:
                        return;
                }
            }

        }
    },
    dataSaveVendordb: function (idheader) {
        var me, store, data, state, data, pd, stateform, iddata, counter;
        me = this;
        stateform = me.getFormdata().up('window').state.toLowerCase();
        pd = me.paramgridvendor;
        store = me.getStore('Tbankvendor');

        if (stateform == 'create') {
            store.filter(me.idheaderfield, '0');
            store.filter('deleted', false);
        } else {
            store.clearFilter(true);
            store.filter(me.idheaderfield, idheader);
        }

        counter = store.getCount();
        if (counter > 0) {
            store.each(function (record, index) {
                iddata = record.get("kasbank_vendor_id");
                state = record.get("statedata");
                data = record['data'];
                data[me.idheaderfield] = idheader;
                data['parametersql'] = state;
                data['hideparam'] = 'default';

                if (me.urlvendor !== me.urlvendor + state) {
                    if (state == 'create' || state == 'update') {
                        me.senddata = data;
                        me.urlrequest = me.urlvendor + state;
                        me.AjaxRequest();
                    }
                    if (state == 'delete' && iddata !== 0) {
                        me.senddata = data;
                        me.urlrequest = me.urlvendor + state;
                        me.AjaxRequest();
                    }
                }
            });
        }
    },
    dataSaveCIAdb: function (idheader) {
        var me, store, data, state, data, pd, stateform, iddata, counter;
        me = this;
        stateform = me.getFormdata().up('window').state.toLowerCase();
        pd = me.paramdataoutrans;
        store = me.getStore('Tbankcia');

        if (stateform == 'create') {
            store.filter(me.idheaderfield, '0');
            store.filter('deleted', false);
        } else {
            store.clearFilter(true);
            store.filter(me.idheaderfield, idheader);
        }

        counter = store.getCount();
        if (counter > 0) {
            store.each(function (record, index) {
                data = record['data'];
                iddata = record.get("kasbank_kasbon_id");
                state = record.get("statedata");
                data[me.idheaderfield] = idheader;
                data['parametersql'] = state;

                if (record.get("apply") == true && iddata !== 0) {
                    data['parametersql'] = 'create';
                }

                data['hideparam'] = 'default';
                if (me.urlcia !== me.urlcia + state) {
                    if (state == 'create' || state == 'update') {
                        me.senddata = data;
                        me.urlrequest = me.urlcia + state;
                        me.AjaxRequest();
                    }
                    if (state == 'delete' && iddata !== 0) {
                        me.senddata = data;
                        me.urlrequest = me.urlcia + state;
                        me.AjaxRequest();
                    }
                }
            });
        }
    },
    Checkdatadetail: function () {
        var me, status, returndata, pd, grid, store, filter = '';
        me = this;
        pd = me.paramdetail;
        pd.checkdata = false;
        grid = me.getGriddetail();
        store = grid.getStore();
        store.each(function (record)
        {
            if (record.data['kasbank_id'] == pd.row.kasbank_id &&
                    record.data['coa_id'] == pd.row.coa_id
                    )
            {
                pd.checkdata = true;
            }
        });
    },
    setStoreDepartment: function () {
        var me, store, form;
        me = this;
        form = me.getFormdata();
        store = me.getStore("Deptprefixcombo");
        store.load({
            params: {
                "hideparam": 'getdepartmentprefix',
                "project_id": apps.project,
                "pt_id": me.pt_id,
                "start": 0,
                "limit": 1000,
            },
            callback: function (records, operation, success) {

            }
        });
    },
    formDataAfterRender: function (el) {
        var me, state, form, grid, store, record, row, counter, storedetail, countlength;
        me = this;
        me.storeProcess = me.createSpProcessObj(me.storeProcess);
        me.fdar().init();
        me.loadComboBoxStore(el);
        me.state = el.up('window').state;
        me.setData();
        form = me.getFormdata();

        switch (me.state) {
            case 'create':
                me.renderdata = 'clear';
                me.fdar().create();
                storedetail = me.getGriddetail().getStore();
                storedetail.removeAll();
                me.idheadervalue = '0';
                me.setValue(me, 'chequegiro_status', 'UNPROCESSED');
                me.setValue(me, 'kasbank_id', '0');
                form.down("[name=lblstatus]").setText("UNPROCESSED", true);
                me.btnDisable(me, 'rejectgiro', true);
                me.btnDisable(me, 'unrejectgiro', true);
                break;
            case 'update':
                me.renderdata = 'noclear';
                me.fdar().update();
                grid = me.getGrid();
                store = grid.getStore();
                record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));

                counter = store.getCount();
                if (counter > 0) {
                    me.renderdata = 'noclear';
                    row = record['data'];
                    countlength = row.fixed_coa.length;
                    if (row.is_fixed > 0 || countlength > 0) {
                        me.flagdetail = 1;
                    } else {
                        me.flagdetail = 0;
                    }
                    me.status_paid = row.chequegiro_status;
                    me.voucherprefix_id = row.voucherprefix_id;
                    if (me.status_paid === "PAID") {
                        form.down('[action=unpaid]').setVisible(true);
                    }
                    console.log(row);
                    me.prefix2 = row.prefix;
                    me.pt_id = row.pt_id;
                    me.in_out = row.dataflow;
                    me.idheadervalue = row.kasbank_id;
                    me.fieldReadonly(me, 'pt_id', true);
                    me.fieldReadonly(me, 'accept_date', true);
                    me.fieldReadonly(me, 'department_id', true);
                    me.fieldReadonly(me, 'voucherprefix_id', true);
                    me.fieldReadonly(me, 'coa', true);
                    me.fieldReadonly(me, 'coaname', true);
                    me.btnDisable(me, 'rejectgiro', false);
                    me.btnDisable(me, 'unrejectgiro', false);
                    me.fixed_coa_id = row.coa_id;
                    me.fixed_coa = row.fixed_coa;
                    me.fixed_account_desc = row.fixed_account_desc;
                    me.setDate(row);
                    if (row.dataflow == 'O') {
                        me.renderdata = 'noclear';
                        me.kasbonpaid = 1;
                    } else {
                        me.renderdata = 'clear';
                    }

                    me.setValue(me, 'chequegiro_status', row.chequegiro_status);
                    me.setStatus();
                    me.setValue(me, 'totaldetail', accounting.formatMoney(row.amount));
                    me.setSumdetail();
                }
                form.down("[name=department_id]").setReadOnly(false);
                me.setStoreDepartment();
                me.getDatadetail();
                break;
            case 'read':
                me.fdar().read();
                me.setStoreDepartment();
                break;
        }



    },
    setDate: function (row) {
        var me;
        me = this;
        if (me.formatDate(row.chequegiro_release_date) == '1970-01-1' || me.formatDate(row.chequegiro_release_date) == '1900-01-1') {
            me.setValue(me, 'chequegiro_release_date', '');
        }
        if (me.formatDate(row.chequegiro_payment_date) == '1970-01-1' || me.formatDate(row.chequegiro_payment_date) == '1900-01-1') {
            me.setValue(me, 'chequegiro_payment_date', '');
        }
        if (me.formatDate(row.chequegiro_receive_date) == '1970-01-1' || me.formatDate(row.chequegiro_receive_date) == '1900-01-1') {
            me.setValue(me, 'chequegiro_receive_date', '');
        }
        if (me.formatDate(row.chequegiro_date) == '1970-01-1' || me.formatDate(row.chequegiro_date) == '1900-01-1') {
            me.setValue(me, 'chequegiro_date', '');
        }
        if (me.formatDate(row.accept_date) == '1970-01-1' || me.formatDate(row.accept_date) == '1900-01-1') {
            me.setValue(me, 'accept_date', '');
        }
    },
    getDatadetail: function () {
        var me, pd, counter = '';
        me = this;
        pd = me.paramdetail;
        pd.grid = me.getGriddetail();
        pd.store = me.getGriddetail().getStore();
        pd.store.clearFilter(true);
        pd.store.load({
            params: {
                "hideparam": 'default',
                "kasbank_id": me.idheadervalue,
                "start": 0,
                "limit": 1000,
            },
            callback: function (records, operation, success) {
                pd.store.sort('description', 'ASC');
                counter = pd.store.getCount();
                if (counter > 0) {
                    pd.grid.getSelectionModel().select(0, true);
                    pd.totaldetail = pd.store.sum('amount');
                    me.setSumdetail();
                }
            }
        });
    },
    setStorePrefix: function () {
        var me, store, form, in_out;
        me = this;
        form = me.getFormdata();
        in_out = form.down("[name=dataflow]").getValue();
        var pt = form.down("[name=pt_id]").getValue();
        form.down("[name=voucherprefix_id]").setValue('');
        store = me.getStore("Voucherprefixsetupcombo");
        store.getProxy().setExtraParam('dataflow', in_out);
        store.getProxy().setExtraParam('pt_pt_id', pt);
        store.getProxy().setExtraParam('kasbank', 'B');
        store.getProxy().setExtraParam('hideparam', 'getvoucherprefixsetupv2bank');
        form.setLoading('Loading prefix');
        store.reload({
            callback: function (records, operation, success) {
                form.setLoading(false);
                if (me.voucherprefix_id) {
                    form.down('[name=voucherprefix_id]').setValue(me.voucherprefix_id);
                }
            }
        });
    },
    setStoreGroup: function () {
        var me, store, form;
        me = this;
        store = me.getStore("Grouptransaction");
        store.reload({
            callback: function (records, operation, success) {
                store.clearFilter(true);
                store.filter('project_id', apps.project);
                store.filter('pt_id', me.pt_id);
                store.filter('status', 'K');
            }
        });
    },
    setStoreSignature: function () {
        var me, store;
        me = this;
        store = me.getStore("Signature");
        store.load({
            params: {
                "hideparam": 'default',
                "start": 0,
                "limit": 1000,
            },
        });
    },
    setStorePtbydefaultproject: function () {
        var me, store;
        me = this;
        store = me.getStore("Ptbydefaultproject");
        store.load();
    },
    setStoreCoadept: function () {
        var me, store, form;
        me = this;
        form = me.getFormdata();
        store = me.getStore("Coadeptcombo");
        store.load({
            params: {
                "hideparam": 'getcoabyprojectptdept',
                "project_id": apps.project,
                "pt_id": me.pt_id,
                "department_id": form.down("[name=department_id]").getValue(),
                "start": 0,
                "limit": 1000,
            },
        });
    },
    setData: function () {
        var me, form, formvalue, storeprojectpt, storeprefixvoucher, grid, store, record, rowdata;
        me = this;
        form = me.getFormdata();
        formvalue = form.getForm().getValues();
        switch (me.state) {
            case 'create':
                me.setStoreGroup();
                form.down("[name=voucherprefix_id]").setReadOnly(true);
                form.down("[name=grouptrans_id]").setReadOnly(true);
                form.down("[name=accept_date]").setValue(me.dateNow);
                form.down("[name=chequegiro_accured]").setValue('0');
                break;
            case 'update':


                break;
        }
    },
    generateTransno: function () {
        var me;
        me = this;
        switch (me.state) {
            case 'create':
                me.senddata = {
                    "hideparam": 'gettransnobank',
                    "project_id": apps.project,
                    "pt_id": me.pt_id,
                    "accept_date": me.accept_date,
                }
                me.urlrequest = me.urlcommon;
                me.AjaxRequest();
                break;
        }
    },
    getPrefixsetup: function () {
        var me, form;
        me = this;
        form = me.getFormdata();

        switch (me.state) {
            case 'create':
                me.senddata = {
                    "hideparam": 'getprefixsetup',
                    "project_id": apps.project,
                    "pt_id": me.pt_id,
                    "voucherprefix_id": form.down("[name=voucherprefix_id]").getValue(),
                }
                me.urlrequest = me.urlcommon;
                me.AjaxRequest();
                break;

        }
    },
    generateVoucherno: function () {
        var me, form, accept_date;
        me = this;
        form = me.getFormdata();
        accept_date = me.formatDate(me.getVal(form, 'accept_date', 'value'));
        switch (me.state) {
            case 'create':
                me.senddata = {
                    "hideparam": 'generatevouchernobank',
                    "project_id": apps.project,
                    "param_date": accept_date,
                    "pt_id": me.pt_id,
                    "module": 'BANK',
                    "prefix": me.prefix,
                    "flag": me.flaggeneratevoucherno,
                }
                // console.log(me.senddata);
                me.urlrequest = me.urlcommon;
                me.AjaxRequest();
                break;
            case 'update':
                me.senddata = {
                    "hideparam": 'generatevouchernobank',
                    "project_id": apps.project,
                    "param_date": accept_date,
                    "pt_id": me.pt_id,
                    "module": 'BANK',
                    "prefix": me.prefix,
                    "flag": me.flaggeneratevoucherno,
                }
                // console.log(me.senddata);
                me.urlrequest = me.urlcommon;
                me.AjaxRequest();
                break;
        }
    },
    generateVouchernov2: function () {
        var me, form, accept_date;
        me = this;
        form = me.getFormdata();
        accept_date = me.formatDate(me.getVal(form, 'accept_date', 'value'));
        switch (me.state) {
            case 'create':
                me.senddata = {
                    "hideparam": 'generatevouchernobank',
                    "project_id": apps.project,
                    "param_date": accept_date,
                    "pt_id": me.pt_id,
                    "module": 'BANK',
                    "prefix": me.prefix,
                    "flag": me.flaggeneratevoucherno,
                }
                // console.log(me.senddata);
                me.urlrequest = me.urlcommon;
                me.AjaxRequestv2();
                break;
            case 'update':
                me.senddata = {
                    "hideparam": 'generatevouchernobank',
                    "project_id": apps.project,
                    "param_date": accept_date,
                    "pt_id": me.pt_id,
                    "module": 'BANK',
                    "prefix": me.prefix,
                    "flag": me.flaggeneratevoucherno,
                }
                // console.log(me.senddata);
                me.urlrequest = me.urlcommon;
                me.AjaxRequestv2();
                break;
        }
    },
    setforAjax: function (data, parameter) {
        var me;
        me = this;
        data['hideparam'] = parameter;
        me.senddata = data;
        me.AjaxRequest();
    },
    AjaxRequest2: function (param, param2) {
        var me;
        me = this;
        Ext.Ajax.request({
            url: me.urlrequest,
            method: 'POST',
            timeout: 45000000,
            params: {
                data: Ext.encode(me.senddata),
                detailrequest: Ext.encode(param),
                kasbank_id: me.idheadervalue,
                hideparam: param2
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

    AjaxRequestv2: function (param, param2) {
        var me, flag_tmp;
        me = this;
        var f = me.getFormdata();
        f.setLoading("Checking voucher number counter");
        Ext.Ajax.request({
            url: me.urlrequest,
            method: 'POST',
            timeout: 45000000,
            params: {
                data: Ext.encode(me.senddata),

            },
            success: function (response) {
                if (response.responseText == "Belum ada Setting Document Number Default !!") {
                    Ext.Msg.show({
                        title: 'Info',
                        msg: 'Voucher number belum di setting',
                        icon: Ext.Msg.INFO,
                        buttons: Ext.Msg.OK,
                        fn: function () {

                        }
                    });
                } else {
                    me.info = Ext.JSON.decode(response.responseText);
                    var data = me.info.data;
                    f.down("[name=voucher_no]").setValue(data);
                    flag_tmp = f.down("[name=tmp_prefix]").getValue();
                    if (flag_tmp > 0) {
                        form.down("[name=voucher_no_tmp]").setValue(data);
                    }
                }
                f.setLoading(false);


            },
            failure: function (response) {
                Ext.Msg.alert('Failed', 'Fail check number voucher !');
                console.log(response);
                // me.getFormdata().up('window').close();
            }
        });
    },

    AjaxRequest: function (param, param2) {
        var me;
        me = this;
        Ext.Ajax.request({
            url: me.urlrequest,
            method: 'POST',
            timeout: 45000000,
            params: {
                data: Ext.encode(me.senddata),

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
    setSuccessEvent: function (param) {
        var me, data, form, tmp_prefix, countlength, flag_tmp, idheader, value, rowdata;

        me = this;
        data = me.info.data;
        form = me.getFormdata();



        switch (me.info.parameter) {
            case 'gettransnobank':
                form.down("[name=transno]").setValue(me.info.total);
                break;
            case 'coadetail':
                var rows = me.info.data;
                var griddetail = me.getGriddetail();
                var storedetail = griddetail.getStore();
                if (rows.length > 0) {

                    rowdata = rows;



                    storedetail.add(rowdata);
                    storedetail.commitChanges();
                    me.setSumdetailfromcopy();
                }

                break;
            case 'generatevouchernobank':
                form.down("[name=voucher_no]").setValue(data);
                flag_tmp = form.down("[name=tmp_prefix]").getValue();
                if (flag_tmp > 0) {
                    form.down("[name=voucher_no_tmp]").setValue(data);
                }
                break;
            case 'getprefixsetup':
                tmp_prefix = data.temp_prefix;
                countlength = tmp_prefix.length;
                me.clearVoucherTmpNo();
                if (countlength > 0) {
                    me.prefix = tmp_prefix;
                    me.actiondialog = 'generatevoucherno';
                    me.titledialog = 'Confirm Generate Voucher No';
                    me.msgdialog = 'System will Generate From Original Voucher No, are you continue? <br/> if you choose No\n\
                                       then System will Generate From Prefix Temporary Voucher No.';
                    me.dialogConfirm();
                } else {
                    me.prefix = form.down("[name=voucherprefix_id]").getRawValue();
                    me.generateVouchernov2();
                    form.down("[name=tmp_prefix]").setValue('0');
                }
                break;
            case 'create':
                if (me.info.total == '0') {
                    idheader = data.idheader;
                    me.idheadervalue = idheader;
                    me.dataSaveDetaildb(idheader);
                    me.dataSaveVendordb(idheader);
                    me.dataSaveCIAdb(idheader);
                    me.messagedata = me.info.msg;
                    me.alertFormdataSuccess();
                } else {
                    me.messagedata = me.info.msg;
                    me.alertFormdataFailed();
                }
                break;
            case 'update':
                if (me.info.total == '0') {
                    idheader = data.idheader;
                    me.idheadervalue = idheader;
                    me.dataSaveDetaildb(idheader);
                    me.dataSaveVendordb(idheader);
                    me.dataSaveCIAdb(idheader);
                    me.messagedata = me.info.msg;
                    me.alertFormdataSuccess();
                } else {
                    me.messagedata = me.info.msg;
                    me.alertFormdataFailed();
                }
                break;
            case 'updateheaderform':
                if (me.info.total == '0') {
                    me.messagedata = me.info.msg;
                    me.getFormeditgiro().up('window').body.unmask();
                    me.getGrid().getStore().reload();
                    me.getFormeditgiro().up('window').close();
                } else {
                    me.messagedata = me.info.msg;
                    me.getFormeditgiro().up('window').body.unmask();
                    me.getGrid().getStore().reload();
                    me.getFormeditgiro().up('window').close();
                }
                break;
            case 'report':
                value = me.info.data;
                value["tgl_sekarang"] = me.dateNow.getDate() + "-" + (me.dateNow.getMonth() + 1) + "-" + me.dateNow.getFullYear();
                me.createWindows();
                me.submitReport(value);
                break;
            case 'reportjs':
                value = me.info.data;
                value["tgl_sekarang"] = me.dateNow.getDate() + "-" + (me.dateNow.getMonth() + 1) + "-" + me.dateNow.getFullYear();
                me.createWindows();
                me.submitReportjs(value);
                //me.win.down("#MyReportPanel").up('window').close();
                break;
            case 'reportdirectpdf':
                value = me.info.data;
                value["tgl_sekarang"] = me.dateNow.getDate() + "-" + (me.dateNow.getMonth() + 1) + "-" + me.dateNow.getFullYear();
                me.createWindowsdirectpdf();
                me.submitReportdirectpdf(value);
                //me.win.down("#MyReportPanel").up('window').close();
                break;
        }
    },
    alertFormdataSuccess: function () {
        var me, form, store;
        me = this;
        me.getGrid().getStore().reload();
        form = me.getFormdata();
        form.up('window').body.unmask();
        Ext.Msg.show({
            title: 'Success',
            msg: me.messagedata,
            icon: Ext.Msg.INFO,
            buttons: Ext.Msg.OK,
            fn: function () {
                me.formDataClose();
            }
        });

    },
    alertFormdataFailed: function () {
        var me, form, store;
        me = this;
        me.getGrid().getStore().reload();
        form = me.getFormdata();
        form.up('window').body.unmask();
        Ext.Msg.show({
            title: 'Failure',
            msg: 'Error: ' + me.messagedata,
            icon: Ext.Msg.ERROR,
            buttons: Ext.Msg.OK
        });
    },
    dialogConfirm: function () {
        var me, form, param;
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
            fn: function (buttonValue, inputText, showConfig) {
                if (buttonValue == 'yes') {
                    switch (me.actiondialog) {
                        case 'generatevoucherno':
                            me.prefix = form.down("[name=voucherprefix_id]").getRawValue();
                            me.generateVoucherno();
                            form.down("[name=tmp_prefix]").setValue('0');
                            break;
                        case 'getdatacia':
                            //get Cash advance 
                            param = (me.in_out == 'I') ? false : true;
                            me.setWindowouttrans(param);
                            break;
                    }
                } else {
                    switch (me.actiondialog) {
                        case 'generatevoucherno':
                            me.generateVoucherno();
                            form.down("[name=tmp_prefix]").setValue('1');
                            break;
                    }
                }

            },
            icon: Ext.Msg.QUESTION
        });
    },
    clearVoucherTmpNo: function () {
        var me, form;
        me = this;
        form = me.getFormdata();
        form.down("[name=tmp_prefix]").setValue('');
        form.down("[name=voucher_no_tmp]").setValue('');
        form.down("[name=voucher_no]").setValue('');
    },
    confirmCIA: function () {
        var me, dataflow;
        me = this;
        dataflow = me.getValue(me, 'dataflow', 'value');
        if (dataflow == 'O') {
            me.actiondialog = 'getdatacia';
            me.titledialog = 'Confirm Cash / Bon Data';
            me.msgdialog = 'Get Data Voucher Bank from <br/>\n\
                            Cash / Bon Transaction ..?.';
            me.dialogConfirm();
        }
    },
    //==================================START CASH IN ADVANCE AREA==============================================
    paramdataoutrans: {
        //start formgeneate
        fromlocation: 'Cashier.view.tbank.FormOuttrans',
        formtitle: 'CASH ADVANCE TRANSACTION', formicon: 'icon-form-add',
        formid: 'win-formouttrans', formlayout: 'fit',
        formshadow: 'frame', formmask: 'Loading...',
        formwidth: 900, formtimeout: 0,
        stateform: null, formaction: null, formproperties: null, formwindows: null,
        //end formgeneate
        //start properties form
        iddetail: 0, store: null, data: null, record: null, grid: null, row: null, form: null,
        checkdata: false, object: null, rowdata: null, action: null,
        //start properties form
    },
    gridciaBoxready: function () {
        var me, grid, counter, store, record, row;
        me = this;
        grid = me.getGridcia();
        store = grid.getStore();
        store.reload({
            params: {
                "hideparam": 'default',
                "project_id": apps.project,
                "pt_id": me.pt_id,
                "department_id": me.getFormdata().down("[name=department_id]").getValue(),
                "status": 'T',
                "start": 0,
                "limit": 1000,
            },
            callback: function (records, operation, success) {
                counter = store.getCount();
                if (counter > 0) {
                    grid.getSelectionModel().select(0, true);
                }
            }
        });
    },
    gridciaSelected: function () {
        var me, grid, counter, store, record, row, form;
        me = this;
        grid = me.getGridcia();
        store = grid.getStore();
        counter = store.getCount();
        form = me.getFormouttrans();
        if (counter > 0) {
            me.recordcia = grid.getSelectionModel().getSelection()[0];
            row = me.recordcia['data'];
            form.getForm().loadRecord(me.recordcia);
        }
    },
    setWindowouttrans: function (value) {
        var me, form;
        me = this;
        form = me.getFormdata();
        if (value == true) {
            form.down("[name=amount]").setReadOnly(true);
            me.paramdataoutrans.stateform = me.state;
            me.GenerateFormdata(me.paramdataoutrans);
        } else {
            form.down("[name=amount]").setValue(0);
            form.down("[name=amount]").setReadOnly(false);

        }
    },
    formOuttransAfterrender: function () {
        var me, state, form, grid, store, record, row, counter;
        me = this;
        form = me.getFormouttrans();
        switch (me.state) {
            case 'create':
                me.setStoreCIA();
                form.down("[name=kasbank_id]").setValue(me.idheadervalue);
                break;
            case 'update':
                me.setStoreCIA();
                me.getdataCashbon();
                form.getForm().getFields().each(function (field) {
                    field.allowBlank = true;
                });
                form.down("[name=kasbank_id]").setValue(me.idheadervalue);
                break;
        }
        me.formatCurrencyFormdata(me, form);
    },
    getdataCashbon: function () {
        var me, store, form, rowjson, totalamount;
        me = this;
        store = me.getStore('Tbankcia');
        form = me.getFormouttrans();
        store.load({
            params: {
                "hideparam": 'default',
                "project_id": apps.project,
                "pt_id": me.pt_id,
                "kasbank_id": me.idheadervalue,
                "status": 'T',
                "start": 0,
                "limit": 1000,
            },
            callback: function (records, operation, success) {
                rowjson = store.proxy.reader.rawData;
                totalamount = rowjson.total_amount;
                form.down("[name=totalamountcia]").setValue(accounting.formatMoney(totalamount));
            }
        });

    },
    applyOuttrans: function () {
        var me, form, record, row, totalamount_old, totalamount, applyamounttmp, applyamount_old, applyamount, sumtotal;
        me = this;
        form = me.getFormouttrans();
        applyamount_old = me.recordcia['data'].applyamount;
        applyamount = accounting.unformat(form.down('[name=applyamount]').getValue());
        me.recordcia['data'].applyamount = applyamount;
        me.recordcia['data'].statedata = 'create';
        form.getForm().loadRecord(me.recordcia);
        totalamount_old = accounting.unformat(form.down('[name=totalamountcia]').getValue());
        if (totalamount_old > 0) {
            me.recordcia['data'].statedata = '';
            totalamount = parseFloat(totalamount_old) - parseFloat(applyamount_old);
            sumtotal = parseFloat(totalamount) + parseFloat(applyamount);
            form.down('[name=totalamountcia]').setValue(accounting.formatMoney(sumtotal));
            me.getGridcia().getStore().commitChanges();
        }
    },
    Saveouttrans: function () {
        var me, form, formdata, totalamount,
                row, store, counter, apply;

        me = this;
        form = me.getFormouttrans();
        formdata = me.getFormdata();
        totalamount = parseFloat(accounting.unformat(form.down("[name=totalamountcia]").getValue()));
        if (totalamount < 1) {
            me.buildWarningAlert('Header Cash Advance Amount must be greater than 0 ...!');
        } else {
            if (form.getForm().isValid()) {
                me.unformatCurrencyFormdata(me, form);
                me.unformatCurrencyFormdata(me, formdata);
                store = me.getGridcia().getStore();
                store.filter('apply', true);
                counter = store.getCount();
                if (counter > 0) {
                    store.each(function (record) {
                        row = record['data'];
                        row['kasbank_id'] = me.idheadervalue;
                        row['statedata'] = 'create';
                    });
                    store.clearFilter(true);
                    me.setValue(me, 'amount', accounting.formatMoney(form.down('[name=totalamountcia]').getValue()));
                    me.setValue(me, 'description', form.down('[name=description]').getValue());
                    form.up('window').close();
                } else {
                    if (me.state == 'create') {
                        Ext.Msg.alert('Info', 'No record selected for apply !');
                    }
                    if (me.state == 'update') {
                        me.setValue(me, 'amount', accounting.formatMoney(form.down('[name=totalamountcia]').getValue()));
                        me.setValue(me, 'description', form.down('[name=description]').getValue());
                        form.up('window').close();
                    }

                }
            }
        }
    },
    setStoreCIA: function () {
        var me, store, form, counter;
        me = this;
        store = me.getGridcia().getStore();
        store.load({
            params: {
                "hideparam": 'default',
                "project_id": apps.project,
                "pt_id": me.pt_id,
                "statedata": me.state,
                "status": 'T',
                "start": 0,
                "limit": 1000,
            },
            callback: function (records, operation, success) {
                counter = store.getCount();
                if (counter > 0) {
                    store.filter('status', 'T');
                }
            }
        });
    },
    //==================================END CASH IN ADVANCE AREA==============================================



    //====================================START AREA VENDOR=====================================================
    paramgridvendor: {
        //start formgeneate
        fromlocation: 'Cashier.view.tbank.FormVendor',
        formtitle: 'Vendor data', formicon: 'icon-form-add',
        formid: 'win-formvendordata', formlayout: 'fit',
        formshadow: 'frame', formmask: 'Loading...',
        formwidth: 900, formtimeout: 0,
        stateform: null, formaction: null, formproperties: null, formwindows: null,
        //end formgeneate
        //start properties form
        iddetail: 0, store: null, data: null, record: null, grid: null, row: null, form: null,
        checkdata: false, object: null, rowdata: null, action: null,
        //start properties form
    },
    paramformvendor: {
        //start formgeneate
        fromlocation: 'Cashier.view.tbank.FormInputVendor',
        formtitle: 'FORM VENDOR', formicon: 'icon-form-add',
        formid: 'win-forminputvendor', formlayout: 'fit',
        formshadow: 'frame', formmask: 'Loading...',
        formwidth: 600, formtimeout: 0,
        stateform: null, formaction: null, formproperties: null, formwindows: null,
        //end formgeneate
        //start properties form
        iddetail: 0, store: null, data: null, record: null, grid: null, row: null, form: null,
        checkdata: false, object: null, rowdata: null, action: null,
        //start properties form
    },
    paramformsignature: {
        //start formgeneate
        fromlocation: 'Cashier.view.tbank.FormSignature',
        formtitle: 'FORM PRINT SIGNATURE GIRO', formicon: 'icon-form-add',
        formid: 'win-forminputsignature', formlayout: 'fit',
        formshadow: 'frame', formmask: 'Loading...',
        formwidth: 400, formtimeout: 0,
        stateform: null, formaction: null, formproperties: null, formwindows: null,
        //end formgeneate
        //start properties form
        iddetail: 0, store: null, data: null, record: null, grid: null, row: null, form: null,
        checkdata: false, object: null, rowdata: null, action: null,
        //start properties form
    },
    gridActionColumnvendorclick: function (view, cell, row, col, e) {
        var me, pv, action = '';
        me = this;
        pv = me.paramgridvendor;

        me.getGridvendor().getSelectionModel().select(row);
        pv.action = e.getTarget().className.match(/\bact-(\w+)\b/)[1];
        pv.rowdata = me.getGridvendor().getStore().getAt(row);
        me.actionVendor();
    },
    gridvendorItemDblClick: function () {
        var me, pv, action = '';
        me = this;
        pv = me.paramgridvendor;
        pv.action = 'update';
        me.actionVendor();
    },
    gridvendorSelect: function () {
        var me, pv, grid, counter, store, data, record, row;
        me = this;
        pv = me.paramgridvendor;
        pv.grid = me.getGridvendor();
        pv.store = pv.grid.getStore();
        pv.grid.down('#btnEdit').setDisabled(false);
        pv.grid.down('#btnDelete').setDisabled(false);
        counter = pv.store.getCount();
        if (counter > 0) {
            pv.record = pv.grid.getSelectionModel().getSelection();
            data = '';
            for (var i = 0; i <= pv.record.length - 1; i++) {
                data = pv.record[i];
            }
            if (data !== '') {
                // pd.rowdata = pd.data['data'];
                pv.row = data;
            }
            //console.log(data);
        }
    },
    actionVendor: function () {
        var me, pv, returndata;
        me = this;
        pv = me.paramgridvendor;
        me.gridvendorSelect();
        switch (pv.action) {
            case 'update':
                me.paramformvendor.stateform = 'update';
                me.GenerateFormdata(me.paramformvendor);
                break;
            case 'destroy':
                me.dataDestroyvendorwithflag();
                break;
            default:
                returndata = "No action selected";
        }
    },
    getdataVendor: function () {
        var me, state, pv, form, grid, store, rowjson, totalamount, record, row, counter;
        me = this;
        pv = me.paramgridvendor;
        form = me.getFormvendor();
        grid = me.getGridvendor();
        store = grid.getStore();
        store.load({
            params: {
                "hideparam": 'default',
                "project_id": apps.project,
                "pt_id": me.pt_id,
                "kasbank_id": me.idheadervalue,
            },
            callback: function (records, operation, success) {
                rowjson = store.proxy.reader.rawData;
                totalamount = rowjson.total_amount;
                form.down("[name=totalvendor]").setValue(accounting.formatMoney(totalamount));
            }
        });
    },
    formVendorAfterrender: function () {
        var me, state, pv, form, grid, store, record, row, counter;
        me = this;
        pv = me.paramgridvendor;
        me.setStoreVendor();
        me.sumVendor();
        form = me.getFormvendor();
        switch (me.state) {
            case 'create':
                form.down("[name=kasbank_id]").setValue(me.idheadervalue);
                break;
            case 'update':
                me.getdataVendor();
                me.sumVendor();
                break;
        }
    },
    formInputVendorAfterrender: function () {
        var me, state, fp, pv, form, grid, store, record, row, counter;
        me = this;
        pv = me.paramgridvendor;
        fp = me.paramformvendor;
        form = me.getForminputvendor();
        switch (fp.stateform) {
            case 'create':
                form.down("[name=kasbank_id]").setValue(me.idheadervalue);
                form.down("[name=kasbank_vendor_id]").setValue(0);
                fp.iddetail = 0;
                break;
            case 'update':
                form.getForm().loadRecord(pv.row);
                fp.iddetail = pv.row.kasbank_vendor_id;
                break;
        }
        me.formatCurrencyFormdata(me, form);
    },
    calculateTotalVendor: function (flag) {
        var me, form, amount, ppn, pph, total;
        me = this;
        form = me.getForminputvendor();
        me.unformatCurrencyFormdata(me, form);
        amount = form.down("[name=amount]").getValue();
        ppn = form.down("[name=ppn]").getValue();
        pph = form.down("[name=pph]").getValue();
        total = parseFloat(amount) + parseFloat(ppn) + parseFloat(pph);
        form.down("[name=total_amount]").setValue(accounting.formatMoney(total));
    },
    Checkdatavendor: function () {
        var me, status, returndata, form, vendor_id, pv, counter, filter = '';
        me = this;
        pv = me.paramgridvendor;
        counter = pv.store.getCount();
        form = me.getForminputvendor();
        vendor_id = form.down('[name=vendor_id]').getValue();
        pv.checkdata = false;
        if (counter > 0) {
            pv.store.each(function (record)
            {
                if (record.data['project_id'] == apps.project &&
                        record.data['pt_id'] == me.pt_id &&
                        record.data['vendor_id'] == vendor_id &&
                        record.data['kasbank_id'] == me.idheadervalue
                        )
                {
                    pv.checkdata = true;
                }
            });
        }
    },
    saveVendorStore: function () {
        var me, form, fv, validation, values, pv, store, grid;
        me = this;
        pv = me.paramgridvendor;
        fv = me.paramformvendor;
        form = me.getForminputvendor();
        validation = form.getForm().isValid();

        if (validation) {
            me.unformatCurrencyFormdata(me, form);
            pv.store = me.getGridvendor().getStore();
            pv.row = form.getForm().getValues();
            pv.row['project_id'] = apps.project
            pv.row['pt_id'] = me.pt_id;
            pv.row['kasbank_id'] = me.idheadervalue;
            pv.row['statedata'] = fv.stateform;
            pv.row['vendor_id'] = form.down('[name=vendor_id]').getValue();
            pv.row['vendorname'] = form.down('[name=vendor_id]').getRawValue();
            pv.row['total_amount'] = form.down('[name=total_amount]').getValue();


            me.Checkdatavendor();
            switch (fv.stateform) {
                case 'create':
                    if (pv.checkdata == false) {
                        pv.store.add(pv.row);
                        pv.store.commitChanges();
                        me.sumVendor();
                    } else {
                        me.buildWarningAlert("Sorry code = " + pv.row.vendorname + " ,already exist in this vendor");
                    }
                    break;
                case 'update'://                                     
                    pv.record = pv.store.getAt(pv.store.indexOf(pv.grid.getSelectionModel().getSelection()[0]));
                    pv.record.beginEdit();
                    pv.record.set(pv.row);
                    pv.record.endEdit();
                    pv.store.commitChanges();
                    me.sumVendor();
                    break;
            }
            form.up('window').close();
        }

    },
    sumVendor: function () {
        var me, status, returndata, form, vendor_id, pv, counter, filter, totalamount = '';
        me = this;
        pv = me.paramgridvendor;
        form = me.getFormvendor();
        pv.store = me.getGridvendor().getStore();
        counter = pv.store.getCount();
        pv.store.clearFilter(true);
        pv.store.filter('project_id', apps.project);
        pv.store.filter('pt_id', me.pt_id);
        pv.store.filter('kasbank_id', me.idheadervalue);
        pv.store.filter('deleted', false);
        totalamount = pv.store.sum('total_amount');
        form.down("[name=totalvendor]").setValue(accounting.formatMoney(totalamount));
    },
    dataDestroyvendorwithflag: function () {
        var me, rows, ph, pd, confirmmsg, successmsg, failmsg,
                record, recordcounttext, grid, store, selectedRecord, msg, successcount
                , parameter, pesan, dataconfirm, ph, pd;

        me = this;
        ph = me.paramheader;
        pd = me.paramgridvendor;
        dataconfirm = me.fieldconfirmvendor;
        grid = me.getGridvendor();

        rows = grid.getSelectionModel().getSelection();
        if (rows.length < 1) {
            Ext.Msg.alert('Info', 'No record selected !');
            return;
        } else {
            recordcounttext = rows.length + ' record' + (rows.length > 1 ? 's' : '');
            store = grid.getStore();

            if (rows.length == 1) {
                selectedRecord = '[' + store.getAt(store.indexOf(rows[0])).get(dataconfirm) + ']';
                confirmmsg = 'Delete ' + selectedRecord + ' ?';
                failmsg = 'Error: Unable to delete ' + selectedRecord + '.';
            } else {
                confirmmsg = 'This action will delete ' + recordcounttext + '.<br />Continue ?';
                failmsg = 'Error: Unable to delete data.';
            }

            Ext.Msg.confirm('Delete Data', confirmmsg, function (btn) {
                if (btn == 'yes') {
                    resetTimer();
                    msg = function () {
                        grid.up('window').mask('Deleting data, please wait ...');
                    };
                    for (var i = 0; i < rows.length; i++) {
                        record = rows[i];
                        record.set("deleted", true);
                        record.set("statedata", 'delete');
                        store.clearFilter(true);
                        store.filter(me.idheaderfield, me.idheadervalue);
                        store.filter('deleted', false);
                        me.sumVendor();
                    }
                }
            });
        }
    },
    applyAmountvendor: function () {
        var me, form, formdata, store, totalamount, counter;
        me = this;
        form = me.getFormvendor();
        formdata = me.getFormdata();
        totalamount = accounting.unformat(form.down("[name=totalvendor]").getValue());
        if (totalamount > 0) {
            store = me.getGridvendor().getStore();
            store.clearFilter(true);
            store.filter('project_id', apps.project);
            store.filter('pt_id', me.pt_id);
            store.filter('kasbank_id', me.idheadervalue);
            store.filter('deleted', false);
            counter = store.getCount();
            if (counter > 0) {
                me.arrayvendor = [];
                store.each(function (record) {
                    me.arrayvendor.push(record['data']);
                });
            }
        } else {
            me.buildWarningAlert("Total Amount must be greater than 0 ...!");
        }
        formdata.down("[name=amount]").setValue(accounting.formatMoney(totalamount));
        form.up('window').close();
    },
    setStoreVendor: function () {
        var me, store, form;
        me = this;
        store = me.getStore('Vendorcombo');
        store.load({
            params: {
                "hideparam": 'getvendor',
                "project_id": apps.project,
                "pt_id": me.pt_id,
            },
            callback: function (records, operation, success) {
            }
        });
    },
    //====================================END AREA VENDOR=====================================================

    deleteCoatmp: function () {
        var me, store, data, state, data, pd, form, stateform, iddata, counter;
        me = this;
        form = me.getFormdata();
        stateform = form.up('window').state.toLowerCase();
        pd = me.paramdetail;
        store = me.getGriddetail().getStore();
        counter = store.getCount();
        me.delete_tmp = 0;
        store.filter(me.idheaderfield, me.idheadervalue);
        if (counter > 0) {
            store.each(function (record, index) {
                record.set("deleted", true);
                record.set("statedata", 'delete');
                store.clearFilter(true);
                store.filter('deleted', false);
            });
            me.delete_tmp = 1;
        }

    },
    gridSelectionChange: function () {
        var me = this;
        var grid = me.getGrid(),
                row = grid.getSelectionModel().getSelection();
        grid.down('#btnEdit').setDisabled(row.length != 1);
        grid.down('#btnDelete').setDisabled(row.length < 1);
        grid.down('#btnPreview').setDisabled(row.length < 1);
    },
    previewHandler: function (menuid) {
        var me, grid, store, counter, record, row;
        me = this;
        grid = me.getGrid();
        store = grid.getStore();
        counter = store.getCount();
        if (counter > 0) {
            record = grid.getSelectionModel().getSelection()[0];
            row = record['data'];
        }
        var recs = me.getGrid().getSelectionModel().getSelection();

        switch (menuid) {
            case 'formatpaper':
                me.report = 'FormatPaper';
                me.setforAjax(row, 'report');
                break;
            case 'formgiro':
                me.paramformsignature.stateform = 'read';
                me.GenerateFormdata(me.paramformsignature);
                break;
            case 'girocetak':
                me.report = 'tbank/girocetak';
                me.setforAjax(row, 'report');
                break;
                //case 'giromega':
                //case 'giromandiri':
                //case 'giropermata':
                //case 'giroocbcnisp':
            case 'girocommon1':
            case 'girodbs1':
            case 'girodbs2':
            case 'girodbs3':
            // case 'girochartered1':
            // case 'girochartered2':
            case 'girochartered3':
                //case 'girocommon2':
                //case 'chequebca':
                //case 'chequemega':
                //case 'chequemandiri':
                //case 'chequepermata':
                //case 'chequecommon':
                //case 'chequeocbcnisp':
                //case 'chequechartered':
                //case 'chequedbs':
                //case 'girobca':
                me.showPdf(recs, menuid);
                break;
            case 'chequebca':
            case 'chequemega':
            case 'chequemandiri':
            case 'chequepermata':
            case 'chequecommon':
                me.report = 'cheque/cheque_bca';
                me.setforAjax(row, 'reportdirectpdf');
                break;
            case 'chequeocbcnisp':
            case 'chequechartered':
                me.report = 'cheque/cheque_ocbc_nisp';
                me.setforAjax(row, 'reportdirectpdf');
                break;
            case 'chequedbs':
                me.report = 'cheque/cheque_dbs';
                me.setforAjax(row, 'reportdirectpdf');
                break;
            case 'girobca':
            case 'girobca1':
                me.report = 'giro/giro_bca';
                me.setforAjax(row, 'reportdirectpdf');
                break;
            case 'girobca2':
                me.report = 'giro/giro_bca2';
                me.setforAjax(row, 'reportdirectpdf');
                break;
            case 'giromega':
            case 'giropermata':
            case 'giroocbcnisp':
            case 'girocommon1':
            case 'girochartered1':
                me.report = 'giro/giro_mega';
                me.setforAjax(row, 'reportdirectpdf');
                break;
            case 'giromandiri':
                me.report = 'giro/giro_mandiri';
                me.setforAjax(row, 'reportdirectpdf');
                break;
            case 'girocommon2': //dirubah
                me.report = 'giro/giro_commonmodel2';
                me.setforAjax(row, 'reportdirectpdf');
                break;
            case 'girochartered2': //dirubah
                me.report = 'giro/giro_standard2';
                me.setforAjax(row, 'reportdirectpdf');
                break;
            case 'transferbca1':
                me.report = 'tbank/transfer_bca1';
                me.setforAjax(row, 'report');
                break;
            case 'transferbca2':
                me.report = 'tbank/transfer_bca2';
                me.setforAjax(row, 'report');
                break;
            case 'transferbca3':
                me.report = 'tbank/transfer_bca3';
                me.setforAjax(row, 'report');
                break;
            case 'transfermandiri1':
                me.report = 'tbank/transfer_mandiri1';
                me.setforAjax(row, 'report');
                break;
            case 'transfermandiri2':
                me.report = 'tbank/transfer_mandiri2';
                me.setforAjax(row, 'report');
                break;
            case 'transfercimbniaga':
                me.report = 'tbank/transfer_cimb';
                me.setforAjax(row, 'report');
                break;
            case 'transferpermata1':
                me.report = 'tbank/transfer_permata1';
                me.setforAjax(row, 'report');
                break;
            case 'transferpermata2':
                me.report = 'tbank/transfer_permata2';
                me.setforAjax(row, 'report');
                break;
            case 'transferchartered1':
                me.report = 'tbank/transfer_standardchartered1';
                me.setforAjax(row, 'report');
                break;
            case 'transferchartered2':
                me.report = 'tbank/transfer_standardchartered2';
                me.setforAjax(row, 'report');
                break;
            case 'transfermega1':
                me.report = 'tbank/transfer_mega1';
                me.setforAjax(row, 'report');
                break;
            case 'transfermega2':
                me.report = 'tbank/transfer_mega2';
                me.setforAjax(row, 'report');
                break;
            case 'transfercommonwealth':
                me.report = 'tbank/transfer_commonwealth';
                me.setforAjax(row, 'report');
                break;
            case 'transferocbcnisp':
                me.report = 'tbank/transfer_ocbcnsip';
                me.setforAjax(row, 'report');
                break;
            case 'transferbri':
                me.report = 'tbank/transfer_bri';
                me.setforAjax(row, 'report');
                break;
            case 'transferpanin':
                me.report = 'tbank/transfer_panin';
                me.setforAjax(row, 'report');
                break;
            case 'transferuob':
                me.report = 'tbank/transfer_uob';
                me.setforAjax(row, 'report');
                break;
            case 'transferbnp1':
                me.report = 'tbank/transfer_bnp1';
                me.setforAjax(row, 'report');
                break;
            case 'transferbnp2':
                me.report = 'tbank/transfer_bnp2';
                me.setforAjax(row, 'report');
                break;
            case 'transferhsbc':
                me.report = 'tbank/transfer_hsbc';
                me.setforAjax(row, 'report');
                break;
            case 'transferbukopin':
                me.report = 'tbank/transfer_bukopin';
                me.setforAjax(row, 'report');
                break;
            case 'transfercitibank1':
                me.report = 'tbank/transfer_citibank1';
                me.setforAjax(row, 'report');
                break;
            case 'transfercitibank2':
                me.report = 'tbank/transfer_citibank2';
                me.setforAjax(row, 'report');
                break;
            case 'transfercitibank2':
                me.report = 'tbank/transfer_citibank2';
                me.setforAjax(row, 'report');
                break;
            case 'transferbii1':
                me.report = 'tbank/transfer_bii1';
                me.setforAjax(row, 'report');
                break;
            case 'transferbii2':
                me.report = 'tbank/transfer_bii2';
                me.setforAjax(row, 'report');
                break;
            case 'transferbtn':
                me.report = 'tbank/transfer_btn';
                me.setforAjax(row, 'report');
                break;
            case 'transferbni':
                me.report = 'tbank/transfer_bni';
                me.setforAjax(row, 'report');
                break;
            case 'transferanz':
                me.report = 'tbank/transfer_anz';
                me.setforAjax(row, 'report');
                break;
                /*     
                 case 'transferdbs':
                 me.report = 'tbank/transfer_dbs';
                 me.setforAjax(row, 'report');
                 break;
                 */

            case 'transferdbs':
                me.report = 'transfer/transfer_dbs';
                me.setforAjax(row, 'reportdirectpdf');
                break;

                /*
                 case 'transferdbs':
                 me.report = 'transfer/transfer_dbs';
                 me.setforAjax(row, 'reportjs');
                 break;
                 */
            case 'editformheader':
                me.parameditheaderchequegiro.stateform = 'update';
                me.GenerateFormdata(me.parameditheaderchequegiro);
                break;
            default:
                me.report = null;
        }

    },
    showPdf: function (recs, menuid) {
        var me, grid;
        var me = this;
        var grid = me.getGrid();
        if (recs.length == 0) {
            return;
        }
        var ids = {};
        for (var i in recs) {
            ids[i] =
                    {
                        kasbank_id: recs[i].get("kasbank_id"),
                        amount: recs[i].get("amount"),
                        description: recs[i].get("description"),
                        made_by: recs[i].get("made_by"),
                        ptname: recs[i].get("ptname"),
                        kasbank_date: recs[i].get("kasbank_date"),
                        terbilang: ''
                    };
        }
        var ids2 = "";
        for (var ii in recs) {
            ids2 += recs[ii].get("kasbank_id") + "~";
        }
        grid.setLoading("Please wait..");
        Ext.Ajax.request({
            url: me.urlheader + 'read',
            method: 'POST',
            timeout: 45000000,
            params: {
                hideparam: 'printpdf',
                data: Ext.JSON.encode(ids),
                sortkasbank_id: ids2,
                format: menuid
            },
            success: function (response) {
                grid.setLoading(false);
                var info = Ext.JSON.decode(response.responseText);

                var url = info.msg['URL'];

                if (url) {
                    window.open(url);
                } else {
                    Ext.Msg.alert('Info', 'Failed generate file !');
                }
            },
            failure: function (response) {

            }
        });
    },
    createWindows: function () {
        var me = this;
        me.instantWindow('Panel', 800, 'Result ', 'state-report', me.winId, 'masterreport');
        me.win = desktop.getWindow(me.winId);
    },

    submitReport: function (value) {
        var me, reportfile, html;
        me = this;
        reportfile = me.report;
        html = me.generateFakeForm(value, reportfile);
        me.win.down("#MyReportPanel").body.setHTML(html);
        $("#fakeReportFormID").submit();
    },
    submitReportjs: function (value) {
        var me, report, html;
        me = this;
        report = 'report_tbank/' + me.report;
        html = me.Reportviewerjs(value, report);
        me.win.down("#MyReportPanel").body.setHTML(html);
        $("#Reportform").submit();
    },
    submitReportdirectpdf: function (value) {
        var me, report, html;
        me = this;
        report = 'report_tbank/' + me.report;
        html = me.Reportviewerjsdirecttopdf(value, report);
        me.win.down("#MyReportPanel").body.setHTML(html);
        $("#Reportform").submit();
    },
    parameditheaderchequegiro: {
        //start formgeneate
        fromlocation: 'Cashier.view.tbank.FormEditHeaderGiro',
        formtitle: 'Edit Form Cheque / Giro', formicon: 'icon-form-add',
        formid: 'win-formeditchequegiro', formlayout: 'fit',
        formshadow: 'frame', formmask: 'Loading...',
        formwidth: 1080, formtimeout: 0,
        stateform: null, formaction: null, formproperties: null, formwindows: null,
        //end formgeneate
        //start properties form
        iddetail: 0, store: null, data: null, record: null, grid: null, row: null, form: null,
        checkdata: false, object: null, rowdata: null, action: null,
        //start properties form
    },
    formeditheaderafterrender: function () {
        var me, grid, store, record, record, counter, form;
        me = this;
        grid = me.getGrid();
        store = grid.getStore();
        counter = store.getCount();
        form = me.getFormeditgiro();
        if (counter > 0) {
            record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));
            form.loadRecord(record);
        }
    },
    dataSaveEditHeader: function () {
        var me, form, value;
        me = this;
        form = me.getFormeditgiro();
        value = form.getValues();
        value['hideparam'] = 'updateheaderform';
        me.senddata = value;
        me.urlrequest = 'cashier/tbank/update';
        me.getFormeditgiro().up('window').body.mask("Please wait...");
        me.AjaxRequest();
    },
    dataPrintformgiro: function () {
        var me, form, signature_name, signature_name2, value;
        me = this;
        form = me.getFormsignature();
        signature_name = form.down('[name=signature_id]').getRawValue();
        signature_name2 = form.down('[name=signature_id_2]').getRawValue();
        if (signature_name2.length > 0) {
            value = {
                'signature_name': signature_name,
                'signature_name2': signature_name2,
            };
            me.report = 'tbank/blankformgiroduo';
        } else {
            value = {'signature_name': signature_name};
            me.report = 'tbank/blankformgiro';
        }

        value["tgl_sekarang"] = me.dateNow.getDate() + "-" + (me.dateNow.getMonth() + 1) + "-" + me.dateNow.getFullYear();
        me.createWindows();
        me.submitReport(value);
    },
    getDatacopycia: function () {
        var me, form, formvalue, grid, store;
        me = this;
        grid = me.getGridcopycia();
        store = grid.getStore();
        form = me.getFormcopycia();
        formvalue = form.getForm().getValues();
        if (form.getForm().isValid()) {
            formvalue['start'] = 0;
            formvalue['limit'] = 200;

            if (formvalue.allcompany == '1') {
                formvalue['ptname'] = '';
                formvalue['pt_id'] = '';
            } else {
                formvalue['ptname'] = form.down("[name=pt_id]").valueModels[0].raw.ptname;
                formvalue['pt_id'] = form.down("[name=pt_id]").valueModels[0].raw.pt_id;
            }
            if (formvalue.allaccept_date == '1') {
                formvalue['fromdate'] = '';
                formvalue['untildate'] = '';
            }
            store.load({
                params: formvalue
            });
        }
    },
    getDatacopykasbank: function () {
        var me, form, formvalue, grid, store;
        me = this;
        grid = me.getGridcopykasbank();
        store = grid.getStore();
        form = me.getFormcopykasbank();
        formvalue = form.getForm().getValues();
        if (form.getForm().isValid()) {
            formvalue['start'] = 0;
            formvalue['limit'] = 200;

            if (formvalue.allcompany == '1') {
                formvalue['ptname'] = '';
                formvalue['pt_id'] = '';
            } else {
                formvalue['ptname'] = form.down("[name=pt_id]").valueModels[0].raw.ptname;
                formvalue['pt_id'] = form.down("[name=pt_id]").valueModels[0].raw.pt_id;
            }
            if (formvalue.allaccept_date == '1') {
                formvalue['fromdate'] = '';
                formvalue['untildate'] = '';
            }
            store.load({
                params: formvalue
            });
        }
    },
    gridcopyciaSelectionChange: function () {
        var me, grid, rows, recordcounttext, store, record, rowdata, sum, form;
        me = this;
        form = me.getFormcopycia();
        grid = me.getGridcopycia();
        rows = grid.getSelectionModel().getSelection();
        recordcounttext = rows.length + ' record' + (rows.length > 1 ? 's' : '');
        store = grid.getStore();

        sum = 0;
        for (var i = 0; i < rows.length; i++) {
            record = rows[i];
            rowdata = record.raw;
            sum += parseFloat(rowdata.amount);
        }
        me.setVal(form, 'totalamount', me.Mask(sum));
    },
    gridcopykasbankSelectionChange: function () {
        var me, grid, rows, recordcounttext, store, record, rowdata, sum, form;
        me = this;
        form = me.getFormcopykasbank();
        grid = me.getGridcopykasbank();
        rows = grid.getSelectionModel().getSelection();
        recordcounttext = rows.length + ' record' + (rows.length > 1 ? 's' : '');
        store = grid.getStore();

        sum = 0;
        for (var i = 0; i < rows.length; i++) {
            record = rows[i];
            rowdata = record.raw;
            sum += parseFloat(rowdata.amount);
        }
        me.setVal(form, 'totalamount', me.Mask(sum));
    },
    Datagridcopyciacopytogriddetail: function () {
        var me, formdata, grid, in_out, griddetail, rows, recordcounttext, store, storedetail, record, rowdata, sum, form;
        me = this;
        formdata = me.getFormdata();
        form = me.getFormcopycia();
        grid = me.getGridcopycia();
        griddetail = me.getGriddetail();
        storedetail = griddetail.getStore();
        rows = grid.getSelectionModel().getSelection();
        recordcounttext = rows.length + ' record' + (rows.length > 1 ? 's' : '');
        store = grid.getStore();
        sum = 0;
        form.up('window').body.mask("Please wait...");
        //me.deleteCoatmp();

        if (me.in_out == 'I') {
            in_out = 'O';
        } else {
            in_out = 'I';
        }
        for (var i = 0; i < rows.length; i++) {
            record = rows[i];
            rowdata = record.raw;
            rowdata[me.idheaderfield] = me.idheadervalue;
            rowdata['kasbankdetail_id'] = 0;
            rowdata['project_id'] = apps.project
            rowdata['pt_id'] = me.pt_id;
            rowdata['coa_id'] = 0;
            rowdata['coa'] = me.getVal(form, 'coalawan', 'value');
            rowdata['coa_tmp'] = me.getVal(form, 'coalawan', 'value');
            rowdata['coaname'] = 'Coa tampungan sementara';
            rowdata['dataflow'] = in_out;
            rowdata['statedata'] = 'create';
            storedetail.add(rowdata);
            storedetail.commitChanges();
            sum += parseFloat(rowdata.amount);
        }
        me.setSumdetailfromcopy();
        form.up('window').body.unmask();
        form.up('window').close();
    },
    Datagridcopykasbankcopytogriddetail: function () {
        //semy1
        var me, formdata, grid, in_out, griddetail, rows, recordcounttext, store, storedetail, record, rowdata, sum, form;
        me = this;
        formdata = me.getFormdata();
        form = me.getFormcopykasbank();
        grid = me.getGridcopykasbank();
        griddetail = me.getGriddetail();
        storedetail = griddetail.getStore();
        rows = grid.getSelectionModel().getSelection();
        recordcounttext = rows.length + ' record' + (rows.length > 1 ? 's' : '');
        store = grid.getStore();
        sum = 0;
        form.up('window').body.mask("Please wait...");
        //me.deleteCoatmp();

        if (me.in_out == 'I') {
            in_out = 'O';
        } else {
            in_out = 'I';
        }
        var kasbank_id = [];
        for (var i = 0; i < rows.length; i++) {
            record = rows[i];
            //console.log(record);
            rowdata = record.raw;
            //console.log(rowdata);
//            rowdata[me.idheaderfield] = me.idheadervalue;
//            rowdata['kasbankdetail_id'] = 0;
//            rowdata['project_id'] = apps.project
//            rowdata['pt_id'] = me.pt_id;
//            rowdata['coa_id'] = 0;
//            rowdata['coa'] = me.getVal(form, 'coalawan', 'value');
//            rowdata['coa_tmp'] = me.getVal(form, 'coalawan', 'value');
//            rowdata['coaname'] = 'Coa tampungan sementara';
//            rowdata['dataflow'] = in_out;
//            rowdata['statedata'] = 'create';
            kasbank_id.push(rowdata['kasbank_id']);
//            storedetail.add(rowdata);
//            storedetail.commitChanges();
            sum += parseFloat(rowdata.amount);
        }


        me.setSumdetailfromcopy();
        form.up('window').body.unmask();
        form.up('window').close();
        me.loadDetailBank(kasbank_id);
    },
    loadDetailBank: function (kasbank_id) {
        var me = this;
        me.senddata = kasbank_id;
        me.urlrequest = me.urldetail + 'read';
        me.AjaxRequest2(kasbank_id, 'coadetail');
    },
    setSumdetailfromcopy: function () {
        var me, grid, store, counter, data, sum,
                totalheader, form, totaldetail, balance,
                msgdata, status, voucher_no;
        me = this;
        form = me.getFormdata();
        grid = me.getGriddetail();
        store = grid.getStore();
        counter = store.getCount();
        if (counter > 0) {
            sum = 0;
            store.each(function (record, index) {
                data = record['data'];
                if (!data.deleted) {
                    sum += parseFloat(data.amount);
                }
            });

            if (sum > 0) {
                voucher_no = form.down('[name=voucher_no]').getValue();
                form.down('[name=amount]').setValue(sum);
                totalheader = accounting.unformat(form.down('[name=amount]').getValue());
                totaldetail = sum;
                balance = totalheader - totaldetail;


                me.setValue(me, 'totaldetail', accounting.formatMoney(totaldetail));
                me.setValue(me, 'totalheader', accounting.formatMoney(totalheader));
                me.setValue(me, 'balance', accounting.formatMoney(balance));

                if (totalheader == totaldetail) {
                    msgdata = 'Balance';
                    status = 'benar';
                } else if (totalheader <= totaldetail) {
                    msgdata = 'Detail total must be same with Header Total';
                    status = 'salah';
                } else if (totalheader >= totaldetail) {
                    msgdata = 'Header total must be same with Detail Total';
                    status = 'salah';
                } else {
                    msgdata = 'Data Error';
                    status = 'salah';
                }

                if (status == 'salah') {
                    form.down('#btnSave').setDisabled(true);
                    form.setTitle("<span style='background-color: yellow; border: 5px solid yellow;'>VOUCHER NO : " + voucher_no + " , Total Header : " + totalheader + " , Total Detail :" + totaldetail + " , Balance :" + balance + " , Status : Not Balance" + "</span>");
                } else {
                    form.down('#btnSave').setDisabled(false);
                    form.setTitle("VOUCHER NO : " + voucher_no + " , Total Header : " + totalheader + " , Total Detail" + totaldetail + " , Balance :" + balance + " , Status : Balance");
                }
                me.formatCurrencyFormdata(me, form);
            }
        }


    },
    formDataBeforeDestroy: function () {
        var me;
//        console.log('destroy');

        me = this;
        me.flaggeneratevoucherno = 0;
        me.senddata = null;
        me.info = null;
        me.rowproject = null;
        me.storept = null;
        me.state = null;
        me.dateNow = new Date();
        me.arraycoadetail = null;
        me.rowcompanyform = null;
        me.rowcompanysearch = null;
        me.accept_date = null;
        me.prefix = null;
        me.is_fixed = false;
        me.fixed_coa = null;
        me.fixed_account_desc = null;
        me.countercoadetail = 0;
        me.project_id = apps.project;
        me.pt_id = 0;
        me.fixed_coa_id = 0;
        me.ptname = null;
        me.messagedata = null;
        me.msgdialog = null;
        me.titledialog = null;
        me.actiondialog = null;
        me.coa = null;
        me.in_out = null;
        me.idheadervalue = 0;
        me.delete_tmp = 0;
        me.flagdetail = 0;
        me.kasbonpaid = 0;
        me.chequegiro_status = null;
        me.coa_tmp = null;
        me.renderdata = null;
        me.paramsStr = null;
        me.win = null;
        me.params = null;
        me.html = null;
        me.report = null;
    },
 
});