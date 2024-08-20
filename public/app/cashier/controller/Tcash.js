Ext.define('Cashier.controller.Tcash', {
    extend: 'Cashier.library.template.controller.Controllermodule',
    requires: [
        'Ext.EventObject',
        'Cashier.template.ComboBoxFields',
        'Cashier.library.template.combobox.Ptusercombobox',
        'Cashier.library.template.combobox.Projectptallcombobox',
        'Cashier.library.template.combobox.Prefixcombobox',
        'Cashier.library.template.combobox.Coacombobox',
        'Cashier.library.template.combobox.Statuscombobox',
        // 'Cashier.library.template.combobox.Departmentcombobox',
        'Cashier.library.template.combobox.Deptprefixcombobox',
        'Cashier.library.template.checkbox.CheckColumn',
        'Cashier.library.template.combobox.Vendorcombobox',
        'Cashier.library.template.combobox.Groupcombobox',
        'Cashier.library.template.combobox.Cashbonstatuscombobox',
        'Cashier.library.template.combobox.Employeecombobox',
        'Cashier.library.template.combobox.Coadeptcombobox',
        'Cashier.library.template.combobox.Inoutcombobox',
    ],
    alias: 'controller.Tcash',
    views: [
        'tcash.Panel',
        'tcash.Grid',
        'tcash.Gridcoadetail',
        'tcash.Gridvendor',
        'tcash.Gridcia',
        'tcash.FormSearch',
        'tcash.FormData',
        'tcash.FormCoadetail',
        'tcash.FormVendor',
        'tcash.FormInputVendor',
        'tcash.FormOuttrans',
    ],
    stores: [
        'Tcash',
        'Tcashbon',
        'Tcashcoadetail',
        'Tcashvendor',
        'Tcashcia',
        'Prefixcombo',
        'Coa',
        'Statuscombo',
        'Deptprefixcombo',
        //  'Department',
        'Grouptransaction',
        'Coadeptcombo',
        'Vendorcombo',
        'Casbonstatus',
        'Employee',
        'Projectptall',
        'Ptbyuser',
        'Coadeptcombo',
        'Inout',
    ],
    models: [
        'Tcash',
        'Tcashbon',
        'Tcashcoadetail',
        'Tcashvendor',
    ],
    refs: [
        {ref: 'grid', selector: 'tcashgrid'},
        {ref: 'griddetail', selector: 'tcashcoadetailgrid'},
        {ref: 'gridvendor', selector: 'tcashvendorgrid'},
        {ref: 'gridcia', selector: 'tcashciagrid'},
        {ref: 'formsearch', selector: 'tcashformsearch'},
        {ref: 'formdata', selector: 'tcashformdata'},
        {ref: 'formdatadetail', selector: 'tcashformcoadetail'},
        {ref: 'formvendor', selector: 'tcashformvendor'},
        {ref: 'formouttrans', selector: 'tcashformouttrans'},
        {ref: 'forminputvendor', selector: 'tcashforminputvendor'},
        {ref: 'checkapply', selector: 'checkcolumn'},
    ],
    controllerName: 'tcash',
    fieldName: 'transno',
    bindPrefixName: 'Tcash',
    formWidth: 850,
    urlcommon: 'cashier/common/create',
    urlrequest: 'cashier/tcash/create',
    urlheader: 'cashier/tcash/',
    urldetail: 'cashier/tcash/coadetail',
    urlvendor: 'cashier/tcash/vendor',
    urlcia: 'cashier/tcash/outtransbon',
    flaggeneratevoucherno: 0,
    senddata: null,
    info: null,
    rowproject: null,
    storept: null,
    state: null,
    dateNow: new Date(),
    arraycia: null,
    arrayvendor: null,
    arraycoadetail: null,
    rowcompanyform: null,
    rowcompanysearch: null,
    accept_date: null,
    prefix: null,
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
    flagdetail: 0,
    idheaderfield: 'kasbank_id',
    idheadervalue: 0,
    recordcia: null,
    delete_tmp: 0,
    coa_tmp: null,
    fieldconfirmvendor: 'vendorname',
    kasbonpaid: 0,
    flagcia: 0,
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
            'tcashpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender

            },
            'tcashgrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange,
            },
            'tcashgrid toolbar button[action=create]': {
                click: function () {
                    me.state = 'create';
                    this.formDataShow('create');
                }
            },
            'tcashgrid toolbar button[action=update]': {
                click: function () {
                    me.state = 'create';
                    this.formDataShow('update');
                }
            },
            'tcashgrid toolbar button[action=destroy]': {
                click: this.dataDestroy
            },
            'tcashgrid toolbar button[action=preview] menu': {
                click: function (menu, item, e, eOpts) {
                    me.previewHandler(item.id);
                }
            },
            'tcashgrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                click: this.gridActionColumnClick
            },
            'tcashformsearch': {
                boxready: this.formSearchReady
            },
            'tcashformsearch button[action=search]': {
                click: this.dataSearch
            },
            'tcashformsearch button[action=reset]': {
                click: this.dataReset
            },
            'tcashformdata': {
                afterrender: this.formDataAfterRender,
                beforedestroy: this.formDataBeforeDestroy,
                boxready: function () {
                    if (me.state == 'update' && me.kasbonpaid > 0) {
                        me.setWindowouttrans(true);
                        me.renderdata = 'clear';
                    }
                }
            },
            'tcashformdata [name=pt_id] ': {
                'select': function (g, record, item, index, e, eOpts) {
                    var me, rowdata, form;
                    me = this;
                    form = me.getFormdata();
                    rowdata = record[0]['data'];
                    me.pt_id = rowdata.pt_id;
                    me.accept_date = me.formatDate(form.down("[name=accept_date]").getValue());
                    me.setStoreGroup();
                    me.getEmployee();
                    me.generateTransno();
                    me.setStoreDepartment();
                },
            },
            'tcashformdata [name=accept_date] ': {
                'change': function (that, newValue, oldValue, eOpts) {
                    var form = me.getFormdata();
                    me.accept_date = me.formatDate(form.down('[name=accept_date]').getValue());
                    me.setValue(me, 'kasbank_date', me.accept_date);
                    me.generateTransno();
                },
            },
            'tcashformdata #radio1_qq ': {
                'change': function (that, newValue, oldValue, eOpts) {
                    var me;
                    me = this;
                    me.fieldReadonly(me, 'voucherprefix_id', false);
                    if (newValue == true) {
                        me.clearchangeFlow();
                        me.in_out = 'I';
                        me.fieldDisable(me, 'kasbon_paid', true);
                    } else {
                        me.clearchangeFlow();
                        me.in_out = 'O';
                        me.fieldDisable(me, 'kasbon_paid', false);
                    }

                    me.setStorePrefix();
                },
            },
            'tcashformdata #radio2_qq ': {
                'change': function (that, newValue, oldValue, eOpts) {
                    var me;
                    me = this;
                    me.fieldReadonly(me, 'voucherprefix_id', false);
                    if (newValue == true) {
                        me.clearchangeFlow();
                        me.in_out = 'O';
                        me.fieldDisable(me, 'kasbon_paid', false);
                    } else {
                        me.clearchangeFlow();
                        me.in_out = 'I';
                        me.fieldDisable(me, 'kasbon_paid', true);
                    }
                    me.setStorePrefix();
                },
            },
            'tcashformdata [name=voucherprefix_id] ': {
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

                    form.down("[name=prefix_id]").setValue(rowdata.prefix_id);
                    form.down("[name=coa_id]").setValue(rowdata.coa_id);
                    form.down("[name=coa]").setValue(rowdata.coa);
                    form.down("[name=coaname]").setValue(rowdata.coaname);
                    form.down("[name=grouptrans_id]").setReadOnly(false);
                    me.generateVoucherno();

                },
            },
            'tcashformdata [name=kasbon_paid] ': {
                'change': function (me, newValue, oldValue, eOpts) {
                    var that = this;
                    if (that.renderdata == 'clear') {
                        that.setWindowouttrans(newValue);
                    }
                },
            },
            'tcashformdata button[action=createvendor]': {
                click: function () {
                    if (me.fixed_coa_id > 0) {
                        me.paramgridvendor.stateform = 'create';
                        me.GenerateFormdata(me.paramgridvendor);
                    } else {
                        me.buildWarningAlert("Please Select Department and Prefix first...!");
                    }

                }
            },
            'tcashformdata [name=amount]': {
                'blur': function (me, The, eOpts) {
                    if (me.lastValue > 0) {
                        this.autoValuedetail();
                    } else {
                        this.buildWarningAlert("Please input Amount first...!");
                    }
                },
            },
            'tcashformdata button[action=save]': {
                click: function () {
                    var balance, counter;
                    balance = me.getFormdata().down("[name=balance]").getValue();
                    counter = balance.length;
                    if (balance > 0 || counter < 1) {
                        this.buildWarningAlert("Amount balance is empty or not balance...!");
                    } else {
                        me.dataSave();
                    }
                }
            },
            'tcashformdata button[action=cancel]': {
                click: function () {
                    me.getGriddetail().getStore().removeAll();
                    this.formDataClose();
                }
            },
            //============================START OUT TRANS====================================================
            'tcashciagrid': {
                boxready: this.gridciaBoxready,
                select: this.gridciaSelected,
            },
            'checkcolumn': {
                'checkchange': function (column, recordIndex, checked) {
                    var me, kasbon_kas_id, form, record, row, totalamount, applyamount, sumtotal, appliedamount, amount, formdata;
                    me = this;
                    form = me.getFormouttrans();
                    formdata = form.getForm();
                    totalamount = accounting.unformat(form.down('[name=totalamountcia]').getValue());
                    kasbon_kas_id = form.down('[name=kasbank_kasbon_id]').getValue();
                    record = me.getGridcia().getStore().getAt(recordIndex);
                    me.recordcia = record;
                    formdata.loadRecord(record);
                    row = record['data'];

                    if (row.amount == row.appliedamount) {
                        record['data'].apply = (checked === true) ? 0 : 1;
                        me.buildWarningAlert("Cannot apply this data");
                    } else {
                        if (checked === true) {
                            me.recordcia['data'].statedata = 'create';
                            applyamount = accounting.unformat(form.down('[name=applyamount]').getValue());
                            sumtotal = parseFloat(totalamount) + parseFloat(applyamount);
                            form.down('[name=totalamountcia]').setValue(accounting.formatMoney(sumtotal));
                        } else {
//                            if(row.kasbank_kasbon_id !==0 && row.kasbank_kasbon_id == kasbon_kas_id && me.flagcia==0){                                
//                                //sumtotal = parseFloat(totalamount) - parseFloat(applyamount)+parseFloat(row.applyamount);
//                                me.flagcia = 1;
//                            }else{
                            me.recordcia['data'].statedata = '';
                            applyamount = accounting.unformat(form.down('[name=applyamount]').getValue());
                            sumtotal = parseFloat(totalamount) - parseFloat(applyamount);
//                            }                            
                            form.down('[name=totalamountcia]').setValue(accounting.formatMoney(sumtotal));
                        }
                    }
                }
            },
            'tcashformouttrans': {
                afterrender: this.formOuttransAfterrender,
                boxready: function () {
                    var me, form;
                    me = this;
                    form = me.getFormouttrans();
                    me.formatCurrencyFormdata(me, form);
                }
            },
            'tcashformouttrans button[action=apmount]': {
                click: function () {
                    me.applyOuttrans();
                }
            },
            'tcashformouttrans button[action=ok]': {
                click: function () {
                    var form, amount;
                    form = me.getFormouttrans();
                    amount = me.unMask(form.down("[name=totalamountcia]").getValue());
                    if (amount > 0) {
                        me.Saveouttrans();
                        me.autoValuedetail();
                    } else {
                        me.buildWarningAlert("Total Amount must be greater than 0 ...!");
                    }
                }
            },
            'tcashformouttrans button[action=cancel]': {
                click: function () {
                    me.renderdata = 'clear';
                }
            },
            //============================START OUT TRANS====================================================


            //=============================START COA DETAIL==================================================
            'tcashcoadetailgrid': {
                select: this.gridcoadetailSelect,
                itemdblclick: this.gridcoadetailItemDblClick,
            },
            'tcashcoadetailgrid actioncolumn': {
                click: function (view, cell, row, col, e) {
                    me.gridActionColumncoadetailclick(view, cell, row, col, e);
                }
            },
            'tcashcoadetailgrid toolbar button[action=create]': {
                click: function () {
                    me.paramcoadetail.stateform = 'create';
                    me.GenerateFormdata(me.paramcoadetail);
                }
            },
            'tcashcoadetailgrid toolbar button[action=update]': {
                click: function () {
                    me.paramcoadetail.stateform = 'update';
                    me.GenerateFormdata(me.paramcoadetail);
                }
            },
            'tcashcoadetailgrid toolbar button[action=destroy]': {
                click: function (view, cell, row, col, e) {
                    me.paramcoadetail.stateform = 'delete';
                    me.dataDestroycoadetailwithflag();
                }
            },
            'tcashformcoadetail': {
                afterrender: this.formCoadetailAfterrender
            },
            'tcashformcoadetail [name=coa_id]': {
                'select': function (g, record, item, index, e, eOpts) {
                    var me, rowdata, form;
                    me = this;
                    form = me.getFormdatadetail();
                    rowdata = record[0]['data'];
                    me.coa = rowdata.coa;
                    form.down("[name=coaname]").setValue(rowdata.coaname);
                },
            },
            'tcashformcoadetail button[action=save]': {
                'click': function (me, e, eOpts) {
                    var me;
                    me = this;
                    me.dataSaveDetailstore();
                },
            },
            //=============================END COA DETAIL==================================================



            //=============================START VENDOR==================================================
            'tcashvendorgrid': {
                select: this.gridvendorSelect,
                itemdblclick: this.gridvendorItemDblClick,
            },
            'tcashvendorgrid actioncolumn': {
                click: function (view, cell, row, col, e) {
                    me.gridActionColumnvendorclick(view, cell, row, col, e);
                }
            },
            'tcashvendorgrid toolbar button[action=create]': {
                click: function () {
                    me.paramformvendor.stateform = 'create';
                    me.GenerateFormdata(me.paramformvendor);
                }
            },
            'tcashvendorgrid toolbar button[action=update]': {
                click: function () {
                    me.paramformvendor.stateform = 'update';
                    me.GenerateFormdata(me.paramformvendor);
                }
            },
            'tcashvendorgrid toolbar button[action=destroy]': {
                click: function (view, cell, row, col, e) {
                    me.paramformvendor.stateform = 'delete';
                    me.dataDestroyvendorwithflag();

                }
            },
            'tcashformvendor': {
                afterrender: this.formVendorAfterrender
            },
            'tcashforminputvendor': {
                afterrender: this.formInputVendorAfterrender
            },
            'tcashformvendor button[action=apply]': {
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
            'tcashformvendor button[action=cancel]': {
                click: function () {
                    var store = me.getGridvendor().getStore();
                    store.removeAll();
                }
            },
            'tcashforminputvendor [name=amount]': {
                blur: function (that, The, eOpts) {
                    if (that.lastValue == '') {
                        accounting.formatMoney(me.getForminputvendor().down("[name=amount]").setValue(0));
                    }
                    me.calculateTotalVendor('amount');
                }
            },
            'tcashforminputvendor [name=ppn]': {
                blur: function (that, The, eOpts) {
                    if (that.lastValue == '') {
                        accounting.formatMoney(me.getForminputvendor().down("[name=ppn]").setValue(0));
                    }
                    me.calculateTotalVendor('ppn');
                }
            },
            'tcashforminputvendor [name=pph]': {
                blur: function (that, The, eOpts) {
                    if (that.lastValue == '') {
                        accounting.formatMoney(me.getForminputvendor().down("[name=pph]").setValue(0));
                    }
                    me.calculateTotalVendor('pph');
                }
            },
            'tcashforminputvendor button[action=save]': {
                click: function () {
                    me.saveVendorStore();
                }
            },
            //=============================END VENDOR==================================================

        });
    },
    paramheader: {
        //start properties form
        store: null, data: null, record: null, row: null, form: null,
        stateform: null,
        //start properties form
    },
    //===================================START  COA DETAIL AREA================================================
    paramcoadetail: {
        //start formgeneate
        fromlocation: 'Cashier.view.tcash.FormCoadetail',
        formtitle: 'Form Coa Detail', formicon: 'icon-form-add',
        formid: 'win-formcoadetail', formlayout: 'fit',
        formshadow: 'frame', formmask: 'Loading...',
        formwidth: 500, formtimeout: 0,
        stateform: null, formaction: null, formproperties: null, formwindows: null,
        //end formgeneate
        //start properties form
        iddetail: 0, store: null, data: null, record: null, grid: null, row: null, form: null,
        checkdata: false, object: null, rowdata: null, action: null, totaldetail: 0,
        //start properties form
    },
    clearchangeFlow: function () {
        var me, form, storevendor, storecia, storedetail,
                countervendor, countercia, counterdetail;
        me = this;
        form = me.getFormdata();
        storevendor = me.getStore('Vendorcombo');
        ;
        storedetail = me.getStore('Tcashcoadetail');
        storecia = me.getStore('Tcashcia');

        countervendor = storevendor.getCount();
        counterdetail = storedetail.getCount();
        countercia = storecia.getCount();

        if (countervendor > 0) {
            storevendor.removeAll();
        }
        if (counterdetail > 0) {
            storedetail.removeAll();
        }
        if (countercia > 0) {
            storecia.removeAll();
        }

        me.fixed_coa_id = 0;
        me.arraycia = null;
        me.arrayvendor = null;
        me.arraycoadetail = null;

        me.setValueCombobox(me, 'department_id', 0, '');
        me.setValueCombobox(me, 'voucherprefix_id', 0, '');
        me.setValueCombobox(me, 'grouptrans_id', 0, '');
        me.setValueCombobox(me, 'cashbon_paid', 0, '');
        me.setValueCombobox(me, 'cashbon_create_by', 0, '');
        me.setValueCombobox(me, 'cashbon_project_id', 0, '');
        me.setValue(me, 'voucher_no', '');
        me.setValue(me, 'kasbon_paid', false);
        me.setValue(me, 'amount', '');
        me.setValue(me, 'coa', '');
        me.setValue(me, 'coaname', '');
        me.setValue(me, 'description', '');
        me.setValue(me, 'cashbon_date', '');
        me.setValue(me, 'totalheader', '');
        me.setValue(me, 'totaldetail', '');
        me.setValue(me, 'balance', '');
        form.setTitle('');

    },
    gridActionColumncoadetailclick: function (view, cell, row, col, e) {
        var me, pd, action = '';
        me = this;
        pd = me.paramcoadetail;
        pd.grid = me.getGriddetail();

        pd.grid.getSelectionModel().select(row);
        pd.action = e.getTarget().className.match(/\bact-(\w+)\b/)[1];
        pd.row = pd.grid.getStore().getAt(row)['data'];
        me.actionCoadetail();
    },
    gridcoadetailItemDblClick: function () {
        var me, pd, action = '';
        me = this;
        pd = me.paramcoadetail;
        pd.action = 'update';
        me.actionCoadetail();
    },
    gridcoadetailSelect: function () {
        var me, pd, counter, data, row;
        me = this;
        pd = me.paramcoadetail;
        pd.grid = me.getGriddetail();
        pd.store = pd.grid.getStore();
        pd.grid.down('#btnEdit').setDisabled(false);
        pd.grid.down('#btnDelete').setDisabled(false);
        counter = pd.store.getCount();
        if (counter > 0) {
            pd.record = pd.grid.getSelectionModel().getSelection();
            data = '';
            for (var i = 0; i <= pd.record.length - 1; i++) {
                data = pd.record[i];
            }
            if (data !== '') {
                // pd.rowdata = pd.data['data'];
                pd.row = data['data'];
                if (pd.row.coa_tmp == me.fixed_coa) {
                    if (me.state == 'update') {
//                        var datatmp = pd.store.getAt(pd.store.indexOf(pd.grid.getSelectionModel().getSelection()[0]));
//                            datatmp.beginEdit();
//                            data['coa'] = me.fixed_coa;
//                            data['coaname'] = me.fixed_account_desc;
//                            datatmp.set(data);
//                            datatmp.endEdit();
//                            pd.store.commitChanges(); 
                    }
                }
                pd.iddetail = pd.row.kasbankdetail_id;
            }
            //console.log(data);
        }
    },
    actionCoadetail: function () {
        var me, pd, returndata;
        me = this;
        pd = me.paramcoadetail;
        switch (pd.action) {
            case 'update':
                pd.stateform = 'update';
                me.GenerateFormdata(pd);
                break;
            case 'print':
                pd.stateform = 'print';
                me.GenerateFormdata(pd);
                break;
            case 'destroy':
                me.dataDestroycoadetailwithflag();
                break;
            default:
                returndata = "No action selected";
        }
    },
    indexCoaDetail: function () {
        var me, form, store, counter;
        me = this;
        store = me.getGriddetail().getStore();
        counter = store.getCount();
        return counter + 1;
    },
    formCoadetailAfterrender: function () {
        var me, state, pd, formheader, formdetail, tmp_inout, grid, store, record, row, rowdata, counter, seq;
        me = this;
        pd = me.paramcoadetail;
        formheader = me.getFormdata();
        formdetail = me.getFormdatadetail();
        me.setStoreCoadept();
        if (me.in_out == 'I') {
            formdetail.down("[name=dataflow]").setValue('O');
        } else {
            formdetail.down("[name=dataflow]").setValue('I');
        }
        switch (pd.stateform) {
            case 'create':
                seq = me.indexCoaDetail();
                formdetail.down("[name=seq]").setValue(seq);
                formdetail.down("[name=kasbank_id]").setValue(me.idheadervalue);
                formdetail.down("[name=kasbankdetail_id]").setValue('0');
                pd.iddetail = 0;
                formdetail.down('#btnSave').setVisible(true);
                me.formatCurrencyFormdata(me, formheader);
                me.formatCurrencyFormdata(me, formdetail);
                break;
            case 'update':
                rowdata = pd.row;
                formdetail.getForm().loadRecord(rowdata);
                pd.iddetail = rowdata.kasbankdetail_id;
                formdetail.down("[name=coa_id]").setValue(rowdata.coa_id);
                if (me.fixed_account_desc == rowdata.coaname) {
                    formdetail.down("[name=coa_id]").setValue(me.fixed_coa);
                }
                formdetail.down("[name=coaname]").setValue(rowdata.coaname);
                formdetail.down("[name=description]").setValue(rowdata.description);
                formdetail.down("[name=amount]").setValue(rowdata.amount);
                formdetail.down('#btnSave').setVisible(true);
                me.formatCurrencyFormdata(me, formheader);
                me.formatCurrencyFormdata(me, formdetail);
                break;
            case 'print':
                rowdata = pd.row;
                formdetail.getForm().loadRecord(rowdata);
                pd.iddetail = rowdata.kasbankdetail_id;
                formdetail.down("[name=coa_id]").setValue(rowdata.coa_id);
                formdetail.down("[name=coaname]").setValue(rowdata.coaname);
                formdetail.down("[name=description]").setValue(rowdata.description);
                formdetail.down("[name=amount]").setValue(rowdata.amount);
                formdetail.getForm().getFields().each(function (field) {
                    field.setReadOnly(true);
                });
                formdetail.down('#btnSave').setVisible(false);
                me.formatCurrencyFormdata(me, formheader);
                me.formatCurrencyFormdata(me, formdetail);
                break;
        }
    },
    Checkdatadetail: function () {
        var me, status, returndata, pd, grid, store, filter = '';
        me = this;
        pd = me.paramcoadetail;
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
    autoValuedetail: function () {
        var me, pd, form, valueform, grid, store, record, row, tmp_inout, in_out;
        me = this;
        pd = me.paramcoadetail;
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
                    row['coaname'] = me.fixed_account_desc;
                    row['dataflow'] = in_out;
                    row['coa_tmp'] = me.fixed_coa; //untuk filter coa yang di hardcode
                    row['statedata'] = 'create';

                    pd.row = row;
                    me.Checkdatadetail();
                    if (pd.checkdata == false) {
                        store.add(row);
                        store.commitChanges();
                        form.down("[name=totalheader]").setValue(valueform.amount);
                        form.down("[name=totaldetail]").setValue(valueform.amount);
                        form.down("[name=balance]").setValue(valueform.amount - valueform.amount);
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
                    row['coa_tmp'] = me.fixed_coa; //untuk filter coa yang di hardcode
                    row['coaname'] = me.fixed_account_desc;
                    row['dataflow'] = in_out;
                    row['statedata'] = 'create';


                    pd.row = row;
                    me.deleteCoatmp();
                    if (me.delete_tmp > 0) {
                        store.add(row);
                        store.commitChanges();
                        form.down("[name=totalheader]").setValue(valueform.amount);
                        form.down("[name=totaldetail]").setValue(valueform.amount);
                        form.down("[name=balance]").setValue(valueform.amount - valueform.amount);
                    }
                    break;
            }
            me.formatCurrencyFormdata(me, form);
            me.setSumdetail();
        } else {
            me.buildWarningAlert("Fixed coa is false,please setup your vocher prefix first...!");
        }
    },
    dataSaveDetailstore: function () {
        var me, pd, form, grid, store, record, row, indexdata, getindex = '';
        me = this;
        pd = me.paramcoadetail;
        form = me.getFormdatadetail();
        if (form.getForm().isValid()) {
            grid = me.getGriddetail();
            store = grid.getStore();
            row = form.getForm().getValues();
            row[me.idheaderfield] = me.idheadervalue;
            if (pd.iddetail == '0') {
                row['statedata'] = 'create';
            } else {
                row['statedata'] = 'update';
            }
            pd.row = row;
            me.Checkdatadetail();
            switch (pd.stateform) {
                case 'create':
                    if (pd.checkdata == false) {
                        row['project_id'] = apps.project
                        row['pt_id'] = me.pt_id;
                        row['coa'] = me.coa;
                        store.add(row);
                        store.commitChanges();
                    } else {
                        me.buildWarningAlert("Sorry code = " + me.coa + " ,already exist in this transaction");
                    }
                    break;
                case 'update':
                    indexdata = grid.getSelectionModel().getSelection()[0];
                    getindex = store.indexOf(indexdata);
                    record = store.getAt(getindex);
                    record.beginEdit();
                    row['kasbankdetail_id'] = pd.iddetail;
                    record.set(row);
                    record.endEdit();
                    store.commitChanges();
                    break;
            }
            store.filter('deleted', false);
            pd.totaldetail = store.sum('amount');
            me.setSumdetail();
            form.up('window').close();
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
                        me.setSumdetail();
                    }
                }
            });
        }
    },
    //===================================END  COA DETAIL AREA================================================


    //==================================START CASH IN ADVANCE AREA==============================================
    paramdataoutrans: {
        //start formgeneate
        fromlocation: 'Cashier.view.tcash.FormOuttrans',
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
            me.getFormouttrans().getForm().loadRecord(me.recordcia);
            me.formatCurrencyFormdata(me, form);
        }
    },
    setWindowouttrans: function (value) {
        var me, form;
        me = this;
        form = me.getFormdata();
        if (value == true) {
            form.down("[name=amount]").setReadOnly(true);
            form.down("[name=cashbon_date]").setReadOnly(false);
            form.down("[name=cashbon_paid]").setReadOnly(false);
            form.down("[name=cashbon_create_by]").setReadOnly(false);
            form.down("[name=cashbon_project_id]").setReadOnly(false);
            me.paramdataoutrans.stateform = me.state;
            me.GenerateFormdata(me.paramdataoutrans);
        } else {
            form.down("[name=amount]").setValue(0);
            form.down("[name=amount]").setReadOnly(false);

            form.down("[name=cashbon_date]").setValue(null);
            form.down("[name=cashbon_paid]").setValue(null);
            form.down("[name=cashbon_create_by]").setRawValue(null);
            form.down("[name=cashbon_create_by]").setValue(null);
            form.down("[name=cashbon_project_id]").setRawValue(null);
            form.down("[name=cashbon_project_id]").setValue(null);

            form.down("[name=cashbon_date]").setReadOnly(true);
            form.down("[name=cashbon_paid]").setReadOnly(true);
            form.down("[name=cashbon_create_by]").setReadOnly(true);
            form.down("[name=cashbon_project_id]").setReadOnly(true);
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
        store = me.getStore('Tcashcia');
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
                accounting.formatMoney(form.down("[name=totalamountcia]").setValue(totalamount));
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
            accounting.formatMoney(form.down('[name=totalamountcia]').setValue(sumtotal));
            me.getGridcia().getStore().commitChanges();
        }
    },
    Saveouttrans: function () {
        var me, form, formdata, totalamount,
                row, store, counter, apply;

        me = this;
        form = me.getFormouttrans();
        formdata = me.getFormdata();
        totalamount = parseFloat(form.down("[name=totalamountcia]").getValue());
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
                    me.setValue(me, 'amount', form.down('[name=totalamountcia]').getValue());
                    me.setValue(me, 'description', form.down('[name=description]').getValue());
                    me.setValue(me, 'cashbon_create_by', form.down('[name=made_by]').getValue());
                    formdata.down("[name=cashbon_date]").setValue(me.formatDate(form.down('[name=accept_date]').getValue()));
                    form.up('window').close();
                } else {
                    if (me.state == 'create') {
                        Ext.Msg.alert('Info', 'No record selected for apply !');
                    }
                    if (me.state == 'update') {
                        me.setValue(me, 'amount', form.down('[name=totalamountcia]').getValue());
                        me.setValue(me, 'description', form.down('[name=description]').getValue());
                        me.setValue(me, 'cashbon_create_by', form.down('[name=made_by]').getValue());
                        formdata.down("[name=cashbon_date]").setValue(me.formatDate(form.down('[name=accept_date]').getValue()));
                        form.up('window').close();
                    }

                }
            }
        }
    },
    //==================================END CASH IN ADVANCE AREA==============================================




    //====================================START AREA VENDOR=====================================================
    paramgridvendor: {
        //start formgeneate
        fromlocation: 'Cashier.view.tcash.FormVendor',
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
        fromlocation: 'Cashier.view.tcash.FormInputVendor',
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
                accounting.formatMoney(form.down("[name=totalvendor]").setValue(totalamount));
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
    },
    calculateTotalVendor: function (flag) {
        var me, form, amount, ppn, pph, total;
        me = this;
        form = me.getForminputvendor();
        amount = accounting.unformat(form.down("[name=amount]").getValue());
        ppn = accounting.unformat(form.down("[name=ppn]").getValue());
        pph = accounting.unformat(form.down("[name=pph]").getValue());
        total = parseFloat(amount) + parseFloat(ppn) + parseFloat(pph);
        accounting.formatMoney(form.down("[name=total_amount]").setValue(total));
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
        me.unformatCurrencyFormdata(me, form);
        pv.store = me.getGridvendor().getStore();
        counter = pv.store.getCount();
        pv.store.clearFilter(true);
        pv.store.filter('project_id', apps.project);
        pv.store.filter('pt_id', me.pt_id);
        pv.store.filter('kasbank_id', me.idheadervalue);
        pv.store.filter('deleted', false);
        totalamount = pv.store.sum('total_amount');
        form.down("[name=totalvendor]").setValue(totalamount);
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
        totalamount = me.unMask(form.down("[name=totalvendor]").getValue());
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

        formdata.down("[name=amount]").setValue(totalamount);
        form.up('window').close();
    },
    //====================================END AREA VENDOR=====================================================

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
        var me, state, form, grid, store, record, row, counter, countlength;
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
                var storedetail = me.getGriddetail().getStore();
                storedetail.removeAll();
                me.idheadervalue = '0';
                me.setValue(me, 'project_id', apps.project);
                me.setValue(me, 'kasbank_id', '0');
                me.formatCurrencyFormdata(me, form);
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

                    me.pt_id = row.pt_id;
                    me.in_out = row.dataflow;
                    me.idheadervalue = row.kasbank_id;
                    form.getForm().loadRecord(record);
                    me.fieldReadonly(me, 'pt_id', true);
                    me.fieldReadonly(me, 'accept_date', true);
                    form.down("#radio1_qq").setDisabled(true);
                    form.down("#radio2_qq").setDisabled(true);
                    me.fieldReadonly(me, 'department_id', true);
                    me.fieldReadonly(me, 'voucherprefix_id', true);
                    me.fieldReadonly(me, 'coa', true);
                    me.fieldReadonly(me, 'coaname', true);
                    me.fixed_coa_id = row.coa_id;
                    me.fixed_coa = row.fixed_coa;
                    me.fixed_account_desc = row.fixed_account_desc;

                    if (me.formatDate(row.cashbon_date) == '1970-01-1' || me.formatDate(row.cashbon_date) == '1900-01-1') {
                        me.setValue(me, 'cashbon_date', '');
                    }
                    if (me.formatDate(row.kasbank_date) == '1970-01-1' || me.formatDate(row.kasbank_date) == '1900-01-1') {
                        me.setValue(me, 'kasbank_date', '');
                    }
                    if (me.formatDate(row.accept_date) == '1970-01-1' || me.formatDate(row.accept_date) == '1900-01-1') {
                        me.setValue(me, 'accept_date', '');
                    }

                    if (row.kasbon_paid) {
                        me.renderdata = 'noclear';
                        me.kasbonpaid = 1;
                    } else {
                        me.renderdata = 'clear';
                    }
                    me.setStatus(row);
                    me.setValue(me, 'totaldetail', row.amount);
                    me.formatCurrencyFormdata(me, form);
                    me.setStoreDepartment();

                }
                me.getDatacoadetail();
                break;
            case 'read':
                me.fdar().read();
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

                    me.pt_id = row.pt_id;
                    me.in_out = row.dataflow;
                    me.idheadervalue = row.kasbank_id;
                    form.getForm().loadRecord(record);
                    me.fieldReadonly(me, 'pt_id', true);
                    me.fieldReadonly(me, 'accept_date', true);
                    form.down("#radio1_qq").setDisabled(true);
                    form.down("#radio2_qq").setDisabled(true);
                    me.fieldReadonly(me, 'department_id', true);
                    me.fieldReadonly(me, 'voucherprefix_id', true);
                    me.fieldReadonly(me, 'coa', true);
                    me.fieldReadonly(me, 'coaname', true);
                    me.fixed_coa_id = row.coa_id;
                    me.fixed_coa = row.fixed_coa;
                    me.fixed_account_desc = row.fixed_account_desc;

                    if (me.formatDate(row.cashbon_date) == '1970-01-1' || me.formatDate(row.cashbon_date) == '1900-01-1') {
                        me.setValue(me, 'cashbon_date', '');
                    }
                    if (me.formatDate(row.kasbank_date) == '1970-01-1' || me.formatDate(row.kasbank_date) == '1900-01-1') {
                        me.setValue(me, 'kasbank_date', '');
                    }
                    if (me.formatDate(row.accept_date) == '1970-01-1' || me.formatDate(row.accept_date) == '1900-01-1') {
                        me.setValue(me, 'accept_date', '');
                    }
                    if (row.kasbon_paid) {
                        me.renderdata = 'noclear';
                        me.kasbonpaid = 1;
                    } else {
                        me.renderdata = 'clear';
                    }
                    me.setStatus(row);
                    me.setValue(me, 'totaldetail', row.amount);
                    me.formatCurrencyFormdata(me, form);
                    me.setStoreDepartment();

                }
                me.getDatacoadetail();
                break;
        }
        form.up('window').body.unmask();
    },
    setStatus: function (row) {
        var me, form, status, labelstatus, module_id, frommodule;
        me = this;
        form = me.getFormdata();
        status = row.is_posting;

        if (status == 0) {
            labelstatus = "OPEN";
            me.btnHidden(me, 'save', true);
        } else if (status == 1) {
            labelstatus = "APPROVE";
            me.btnHidden(me, 'save', false);
            form.getForm().getFields().each(function (field) {
                field.setReadOnly(true);
            });
        } else if (status == 2) {
            labelstatus = "CLOSE";
            me.btnHidden(me, 'save', false);
            form.getForm().getFields().each(function (field) {
                field.setReadOnly(true);
            });
        }

        if (row.frommodule == "CASH") {
            frommodule = "";
        } else {
            frommodule = row.frommodule;
        }
        form.down("[name=lblstatus]").setText(labelstatus + " " + frommodule, true);
    },
    getDatacoadetail: function () {
        var me, pd, counter = '';
        me = this;
        pd = me.paramcoadetail;
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
    setData: function () {
        var me, form, formvalue, storeprojectpt, storeprefixvoucher, grid, store, record, rowdata;
        me = this;
        form = me.getFormdata();
        formvalue = form.getForm().getValues();
        switch (me.state) {
            case 'create':
                form.down("[name=voucherprefix_id]").setReadOnly(true);
                form.down("[name=grouptrans_id]").setReadOnly(true);
                form.down("[name=kasbon_paid]").setDisabled(true);
                form.down("[name=accept_date]").setValue(me.dateNow);
                break;
            case 'update':


                break;
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
        var me, store, form, totalheader, totaldetail, balance, msgdata, status, voucher_no, stateform, total_in, total_out = '';
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
            totaldetail = me.paramcoadetail.totaldetail;
        }

        voucher_no = (form.down('[name=voucher_no]').getValue() == 'undefined') ? 'test' : form.down('[name=voucher_no]').getValue();
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
            form.setTitle("<span style='background-color: yellow; border: 5px solid yellow;'>VOUCHER NO : " + voucher_no + " , Total Header : " + accounting.formatMoney(totalheader) + " , Total Detail :" + accounting.formatMoney(totaldetail) + " , Balance :" + accounting.formatMoney(balance) + " , Status : Not Balance" + "</span>");
        } else {
            form.down('#btnSave').setDisabled(false);
            form.setTitle("VOUCHER NO : " + voucher_no + " , Total Header : " + accounting.formatMoney(totalheader) + " , Total Detail " + accounting.formatMoney(totaldetail) + " , Balance :" + accounting.formatMoney(balance) + " , Status : Balance");
        }

        store.clearFilter();
        store.filter('kasbank_id', me.idheadervalue);
        store.filter('deleted', false);
        me.formatCurrencyFormdata(me, form);
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

        console.log(me.pt_id);
        console.log(me.state);
        console.log(store);

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
    setStorePrefix: function () {
        var me, store, form, in_out;
        me = this;
        form = me.getFormdata();
        store = me.getStore("Voucherprefixsetupcombo");
        in_out = me.in_out;
        var pt = form.down("[name=pt_id]").getValue();
        form.down("[name=voucherprefix_id]").setValue('');
        store = me.getStore("Voucherprefixsetupcombo");
        store.getProxy().setExtraParam('dataflow', in_out);
        store.getProxy().setExtraParam('pt_pt_id', pt);
        store.getProxy().setExtraParam('kasbank', 'K');
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
    getEmployee: function () {
        var me, store, form;
        me = this;
        store = me.getStore('Employee');
        store.reload({
            params: {
                "hideparam": 'getemployee',
                "project_id": apps.project,
                "pt_id": me.pt_id,
                "start": 0,
                "limit": 1000,
            },
            callback: function (records, operation, success) {
                if (store.getCount() > 0) {
                    // form.down("[name=pt_id]").setDisabled(false);
                } else {
                    // form.down("[name=pt_id]").setDisabled(true);
                }
            }
        });
    },
    generateTransno: function () {
        var me;
        me = this;
        switch (me.state) {
            case 'create':
                me.senddata = {
                    "hideparam": 'gettransnocash',
                    "project_id": apps.project,
                    "pt_id": me.pt_id,
                    "accept_date": me.accept_date,
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
                    "hideparam": 'generatevouchernocash',
                    "param_date": accept_date,
                    "project_id": apps.project,
                    "pt_id": me.pt_id,
                    "module": 'KAS',
                    "prefix": me.prefix,
                    "flag": me.flaggeneratevoucherno,
                }
                me.urlrequest = me.urlcommon;
                me.AjaxRequest();
                break;
        }
    },
    AjaxRequest: function () {
        var me;
        me = this;
        Ext.Ajax.request({
            url: me.urlrequest,
            method: 'POST',
            timeout: 45000000,
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
        var me, data, form, tmp_prefix, countlength, flag_tmp, idheader, value;

        me = this;
        data = me.info.data;
        form = me.getFormdata();
        switch (me.info.parameter) {
            case 'gettransnocash':
                form.down("[name=transno]").setValue(me.info.total);
                break;
            case 'generatevouchernocash':
                form.down("[name=voucher_no]").setValue(data);
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
            case 'report':
                value = me.info.data;
                value["tgl_sekarang"] = me.dateNow.getDate() + "-" + (me.dateNow.getMonth() + 1) + "-" + me.dateNow.getFullYear();
                me.createWindows();
                me.submitReport(value);
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
            fn: function (buttonValue, inputText, showConfig) {
                if (buttonValue == 'yes') {

                }

            },
            icon: Ext.Msg.QUESTION
        });
    },
    dataSave: function () {
        var me, form, formdata, addingRecord, vp, vps, x, store, stotedetail, data, record,
                valuedata, idProperty, rec, paramdata, rowdata, state_submit, idProperty,
                storedetail, counterdetail;
        me = this;
        form = me.getFormdata();
        formdata = form.getForm();


        if (formdata.isValid()) {
            resetTimer();
            me.unformatCurrencyFormdata(me, form);
            store = me.getGrid().getStore();
            valuedata = formdata.getValues();
            form.up('window').body.mask('Saving data, please wait ...');
            state_submit = form.up('window').state.toLowerCase();

            storedetail = me.getGriddetail().getStore();
            counterdetail = storedetail.getCount();

            if (counterdetail < 1) {
                form.down("[name=totaldetail]").setValue(0);
                form.down("[name=balance]").setValue(form.down('[name=totalheader]').getValue());
                me.buildWarningAlert(" Data on grid detail is empty");
            } else {
                if (state_submit == 'create') {
                    me.flaggeneratevoucherno = '1';
                    me.generateVoucherno();
                }
                switch (state_submit) {
                    case 'create':
                        valuedata['kasbank'] = 'KAS';
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
                        valuedata['hideparam'] = state_submit;
                        valuedata['kasbank'] = 'KAS';
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
    dataSaveDetaildb: function (idheader) {
        var me, store, data, state, data, pd, stateform, iddata, counter;
        me = this;
        stateform = me.getFormdata().up('window').state.toLowerCase();
        pd = me.paramcoadetail;
        store = me.getGriddetail().getStore();

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
                iddata = record.get("kasbankdetail_id");
                state = record.get("statedata");
                data = record['data'];
                if (state == 'create' && stateform == 'create') {
                    data['seq'] = index + 1;
                } else {
                    data['seq'] = counter + index;
                }
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
    dataSaveVendordb: function (idheader) {
        var me, store, data, state, data, pd, stateform, iddata, counter;
        me = this;
        stateform = me.getFormdata().up('window').state.toLowerCase();
        pd = me.paramgridvendor;
        store = me.getStore('Tcashvendor');

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
        store = me.getStore('Tcashcia');

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
    deleteCoatmp: function () {
        var me, store, data, state, data, pd, stateform, iddata, counter;
        me = this;
        stateform = me.getFormdata().up('window').state.toLowerCase();
        pd = me.paramcoadetail;
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
        switch (menuid) {
            case 'formatpaper':
                me.report = 'FormatPaper';
                break;
            default:
                me.report = null;
        }
        row['hideparam'] = 'report';
        me.senddata = row;
        me.AjaxRequest();
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
    formDataBeforeDestroy: function () {
        var me;
        me = this;
        me.flaggeneratevoucherno = 0;
        me.senddata = null;
        me.info = null;
        me.rowproject = null;
        me.storept = null;
        me.state = null;
        me.dateNow = new Date();
        me.arraycia = null;
        me.arrayvendor = null;
        me.arraycoadetail = null;
        me.rowcompanyform = null;
        me.rowcompanysearch = null;
        me.accept_date = null;
        me.prefix = null;
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
        me.flagdetail = 0;
        me.idheadervalue = 0;
        me.recordcia = null;
        me.delete_tmp = 0;
        me.coa_tmp = null;
        me.kasbonpaid = 0;
        me.flagcia = 0;
        me.renderdata = null;
        me.paramsStr = null;
        me.win = null;
        me.params = null;
        me.html = null;
        me.report = null;
    },
});