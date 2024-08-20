Ext.define('Cashier.controller.Tcashadvance', {
    extend: 'Cashier.library.template.controller.Controllermodule',
    alias: 'controller.Tcashadvance',
    requires: [
        'Cashier.template.ComboBoxFields',
        'Cashier.library.template.combobox.Ptusercombobox',
        'Cashier.library.template.combobox.Projectptallcombobox',
        'Cashier.library.template.combobox.Projectptforcashboncombobox',
        'Cashier.library.template.combobox.Voucherprefixcombobox',
        'Cashier.library.template.combobox.Employeecombobox',
        'Cashier.library.template.combobox.EmployeeCashboncombobox',
        'Cashier.library.template.combobox.Deptprefixcombobox',
        'Cashier.library.template.combobox.Typecashboncombobox',
        'Cashier.library.template.combobox.Inoutcombobox',
        'Cashier.library.template.combobox.Kasbondeptapprovecombobox',
    ],
    views: [
        'tcashadvance.Panel',
        'tcashadvance.Grid',
        'tcashadvance.FormSearch',
        'tcashadvance.FormData',
    ],
    stores: [
        'Tcashadvance',
        'Ptbyuser',
        'Projectptall',
        'Voucherprefixsetupcombo',
        'Employee',
        'Employeecashbon',
        'Deptprefixcombo',
        'Typecashbon',
        'Inout',
        'Projectptcashbon',
        'Kasbondeptcombo',
    ],
    models: [
        'Tcashadvance',
    ],
    refs: [
        {ref: 'grid', selector: 'tcashadvancegrid'},
        {ref: 'formsearch', selector: 'tcashadvanceformsearch'},
        {ref: 'formdata', selector: 'tcashadvanceformdata'},
    ],
    controllerName: 'tcashadvance',
    fieldName: 'description',
    bindPrefixName: 'Tcashadvance',
    formWidth: 900,
    urlcommon: 'cashier/common/create',
    urlrequest: 'cashier/tcashadvance/create',
    flaggeneratevoucherno: 0,
    senddata: null,
    info: null,
    rowproject: null,
    storept: null,
    state: null,
    dateNow: new Date(),
    arraycoadetail: null,
    rowcompanyform: null,
    rowcompanysearch: null,
    accept_date: null,
    countercoadetail: 0,
    pt_id: 0,
    ptname: null,
    idheaderfield: 'kasbon_id',
    idheadervalue: 0,
    projectptcashbon: 0,
    kasbongiro: null,
    dataflow: null,
    project_id: 0,
    init: function (application) {
        var me = this;
        this.control({
            'tcashadvancepanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: function (panel) {
                    me.panelAfterRender();
                    me.getFormsearch().down("[name=pt_id]").getStore().load();
                    me.getFormsearch().down("[name=department_id]").getStore().load();
                    me.getFormsearch().down("[name=voucherprefix_id]").getStore().load();
                    me.getFormsearch().down("[name=coa_id]").getStore().load();
                }

            },
            'tcashadvancegrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange
            },
            'tcashadvancegrid toolbar button[action=create]': {
                click: function () {
                    me.state = 'create';
                    this.formDataShow('create');
                }
            },
            'tcashadvancegrid toolbar button[action=update]': {
                click: function () {
                    me.state = 'create';
                    this.formDataShow('update');
                }
            },
            'tcashadvancegrid toolbar button[action=destroy]': {
                click: this.dataDestroy
            },
            'tcashadvancegrid toolbar button[action=print]': {
                click: this.dataPrint
            },
            'tcashadvancegrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                click: this.gridActionColumnClick
            },
            'tcashadvanceformsearch button[action=search]': {
                click: this.dataSearch
            },
            'tcashadvanceformsearch button[action=reset]': {
                click: this.dataReset
            },
            'tcashadvanceformdata': {
                afterrender: this.formDataAfterRender,
                boxready: this.FromdataReady,
                beforedestroy: this.formDataBeforeDestroy,
            },
            'tcashadvanceformdata #radio2_caa ': {
                'change': function () {
                    var me, form;
                    me = this;
                    form = me.getFormdata();
                    var value = form.down("#radio2_caa").getValue();
                    if (value == false) {
                        me.setReadonly(form, 'cashbon_projectpt_id', false);
                        me.setReadonly(form, 'cashbon_create_by', false);
                        me.setAllow(form, 'cashbon_projectpt_id', false);
                        me.setAllow(form, 'cashbon_create_by', false);
                    } else {
                        me.setReadonly(form, 'cashbon_projectpt_id', false);
                        me.setReadonly(form, 'cashbon_create_by', false);
                        me.setAllow(form, 'cashbon_projectpt_id', false);
                        me.setAllow(form, 'cashbon_create_by', false);
                        me.setReadonly(form, 'cashbon_projectpt_id', true);
                        me.setReadonly(form, 'cashbon_create_by', true);
                        me.setAllow(form, 'cashbon_projectpt_id', true);
                        me.setAllow(form, 'cashbon_create_by', true);
                    }
                    me.setValCombo(form, 'cashbon_projectpt_id', '', '');
                },
            },
            'tcashadvanceformdata [name=pt_id] ': {
                'select': function (g, record, item, index, e, eOpts) {
                    var me, rowdata, form;
                    me = this;
                    form = me.getFormdata();
                    rowdata = record[0]['data'];
                    me.project_id = rowdata.project_id;
                    me.pt_id = rowdata.pt_id;
                    me.accept_date = me.formatDate(me.getFormdata().down("[name=accept_date]").getValue());
                    me.getEmployee();
                    me.generateTransno();
                    me.setStoreDepartment();
                },
                'change': function (g, record, item, index, e, eOpts) {
                    var me, rowdata, form, projectpt;
                    me = this;
                    form = me.getFormdata();
                    projectpt = form.down("[name=pt_id]").valueModels[0].raw;
                    me.project_id = projectpt.project_id;

                    if (apps.project == 1) {
                        //jika project kantor pusat, setting pemberi cashbon dari cd
                        me.project_id = projectpt.project_id;
                        me.pt_id = 1;
                    } else {
                        me.project_id = apps.project;
                        me.pt_id = apps.pt;
                    }
                    me.accept_date = me.formatDate(me.getFormdata().down("[name=accept_date]").getValue());
                    me.getEmployee();
                    me.generateTransno();
                    me.setStoreDepartment();
                },
            },
            'tcashadvanceformdata [name=kasbongiro] ': {
                'select': function (g, record, item, index, e, eOpts) {
                    var me, rowdata, form, state;
                    me = this;
                    form = me.getFormdata();
                    state = form.up('window').state.toLowerCase();
                    rowdata = record[0]['data'];
                    me.kasbongiro = rowdata.kasbongiro;
                    me.setKasbongiro();
                },
            },
            'tcashadvanceformdata [name=kasbondept_id] ': {
                'select': function (g, record, item, index, e, eOpts) {
                    var me, rowdata, form;
                    me = this;
                    form = me.getFormdata();
                    rowdata = record[0]['data'];
                    me.setVal(form, 'amount', accounting.formatMoney(rowdata.amount));
                    me.setVal(form, 'department_id', rowdata.department_id);
                    me.getEmployee();
                    me.setVal(form, 'made_by', rowdata.employee_name);
                    me.setVal(form, 'description', rowdata.description);
                },
                'change': function (g, record, item, index, e, eOpts) {
                    var me, rowdata, form, kasbondept;
                    me = this;
                    form = me.getFormdata();
                    kasbondept = form.down("[name=kasbondept_id]").valueModels[0];
                    if (kasbondept != undefined) {
                        rowdata = kasbondept.raw;
                        me.setVal(form, 'amount', accounting.formatMoney(rowdata.amount));
                        me.setVal(form, 'department_id', rowdata.department_id);
                        me.getEmployee();
                        me.setVal(form, 'made_by', rowdata.employee_name);
                        me.setVal(form, 'description', rowdata.description);
                    }

                },
            },
            'tcashadvanceformdata [name=dataflow] ': {
                'select': function (g, record, item, index, e, eOpts) {
                    var me, rowdata, form;
                    me = this;
                    form = me.getFormdata();
                    rowdata = record[0]['data'];
                    me.dataflow = rowdata.in_out;
                    me.setStorePrefix();
                    me.setValCombo(form, 'voucherprefix_id', '', '');
                    me.setVal(form, 'voucher_no', '');
                    me.setVal(form, 'dataflow', me.dataflow);
                },
            },
            'tcashadvanceformdata [name=accept_date] ': {
                'blur': function (me, The, eOpts) {
                    var me;
                    me = this;
                    me.accept_date = me.formatDate(me.getFormdata().down("[name=accept_date]").getValue());
                    me.generateTransno();
                },
            },
            'tcashadvanceformdata [name=claim_date] ': {
                'blur': function (me, The, eOpts) {
                    var me;
                    me = this;
                    me.validateClaimdate();
                    me.getBatasduedate();
                },
                'change': function (me, The, eOpts) {
                    var me;
                    me = this;
                    me.getBatasduedate();
                },
            },
            'tcashadvanceformdata [name=chequegiro_no] ': {
                'blur': function (me, The, eOpts) {
                    this.setStatus();
                },
            },
            'tcashadvanceformdata [name=voucherprefix_id] ': {
                'select': function (g, record, item, index, e, eOpts) {
                    var me, rowdata, form;
                    me = this;
                    form = me.getFormdata();
                    rowdata = record[0]['data'];
                    me.setVal(form, 'coa', rowdata.coa);
                    me.setVal(form, 'prefix_id', rowdata.prefix_id);
                    me.setVal(form, 'prefix', rowdata.prefix);
                    me.setVal(form, 'coa_id', rowdata.coa_id);
                    me.setVal(form, 'coaname', rowdata.coaname);
                    me.setVal(form, 'fixed_coa', rowdata.fixed_coa);
                    me.generateVoucherno();
                    me.setStoreKashbondept();
                },
            },
            'tcashadvanceformdata [name=amount] ': {
                'blur': function (that, The, eOpts) {
                    var me, rowdata, form, kasbongiro, value, amount;
                    me = this;
                    form = me.getFormdata();
                    kasbongiro = form.down("[name=kasbongiro]").getValue();
                    value = accounting.unformat(me.getVal(form, 'amount', 'value'));
                    if (me.state == 'create' && kasbongiro == 'CASHBON') {
                        me.setVal(form, 'balance', accounting.formatMoney(value));
                    }
                },
                'change': function (that, The, eOpts) {
                    var me, rowdata, form, kasbongiro, value, amount;
                    me = this;
                    form = me.getFormdata();
                    kasbongiro = form.down("[name=kasbongiro]").getValue();
                    value = accounting.unformat(me.getVal(form, 'amount', 'value'));
                    if (me.state == 'create' && kasbongiro == 'CASHBON') {
                        me.setVal(form, 'balance', accounting.formatMoney(value));
                    }
                },
            },
            'tcashadvanceformdata [name=objectname] ': {
                'keyup': function () {
                    var me, value;
                    me = this;
                },
            },
            'tcashadvanceformdata [name=department_id] ': {
                'select': function (g, record, item, index, e, eOpts) {
                    var me, rowdata, form;
                    me = this;
                    form = me.getFormdata();
                    rowdata = record[0]['data'];
                    me.getEmployee();
                },
                blur: function () {
                    var me, form;
                    me = this;
                    me.getEmployee();
                },
                change: function () {
                    var me, form;
                    me = this;
                    me.getEmployee();
                },

            },
            'tcashadvanceformdata [name=cashbon_projectpt_id] ': {
                'select': function (g, record, item, index, e, eOpts) {
                    var me, rowdata, form;
                    me = this;
                    form = me.getFormdata();
                    rowdata = record[0]['data'];
                    me.projectptcashbon = me.getVal(form, 'cashbon_projectpt_id', 'value');
                    me.setValCombo(form, 'cashbon_create_by', '', '');
                    me.getEmployeeCashbon();
                },
            },
            'tcashadvanceformdata button[action=cashback]': {
                click: function () {
                    var me, value, form, amount, balance;
                    me = this;
                    form = me.getFormdata();
                    amount = form.down("[name=amount]").getValue();
                    balance = form.down("[name=balance]").getValue();
                    form.down("[name=cashback]").setValue(balance);
                    form.down("[name=balance]").setValue(0);
                    form.down("[name=status]").setValue("Y");
                    form.down("[name=statusdata]").setValue("PROCESSED");
                    me.dataSave();
                }
            },
            'tcashadvanceformdata button[action=uncashback]': {
                click: function () {
                    var me, value, amount, form, cashback;
                    me = this;
                    form = me.getFormdata();
                    cashback = form.down("[name=cashback]").getValue();
                    form.down("[name=balance]").setValue(cashback);
                    form.down("[name=cashback]").setValue(0);
                    form.down("[name=status]").setValue("T");
                    form.down("[name=statusdata]").setValue("UNPROCESSED");
                    me.dataSave();
                }
            },
            'tcashadvanceformdata button[action=save]': {
                click: function () {
                    var me = this;
                    var form = me.getFormdata();
                    var kasbongiro = form.down("[name=kasbongiro]").getValue();
                    if (kasbongiro == 'GIRO') {
                        form.down("[name=cashbon_projectpt_id]").allowBlank = true;
                    }
                    this.dataSave();
                }
            },
            'tcashadvanceformdata button[action=cancel]': {
                click: this.formDataClose
            },
        });
    },
    FromdataReady: function () {
        var me, form;
        me = this;
        form = me.getFormdata();
    },
    dataSearch: function () {
        resetTimer();
        var me = this;
        var form = me.getFormsearch();
        var formdata = form.getForm();
        var store = me.getGrid().getStore();

        form.down("[name=hideparam]").setValue('default');  // added on april 2016, ahmad riadi    
        var fields = formdata.getValues();
        fields['project_id'] = apps.project;
        for (var x in fields)
        {
            store.getProxy().setExtraParam(x, fields[x]);
        }
        me.loadPage(store);
    },
    getEmployee: function () {
        var me, store, form, department, made_by;
        me = this;
        store = me.getStore('Employee');
        form = me.getFormdata();
        store.reload({
            params: {
                "hideparam": 'getemployee',
                "project_id": me.project_id,
                "pt_id": me.pt_id,
                "start": 0,
                "limit": 1000,
            },
            callback: function (records, operation, success) {
                department = me.getValCombo(form, 'department_id');
                if (store.getCount() > 0) {
                    if (department.id > 0) {
                        store.clearFilter(true);
                        store.filterBy(function (rec, id) {
                            if (rec.get('department_id') === department.id) {
                                return true;
                            } else {
                                return false;
                            }
                        });



                    } else {
                        store.clearFilter(true);
                    }
                } else {
                    // form.down("[name=pt_id]").setDisabled(true);
                }
                made_by = form.down("[name=made_by]").getValue();
                if (made_by !== null) {
                    form.down("[name=made_by]").setValue(made_by)
                }

            }
        });
    },
    getforProjectptcashbon: function () {
        var me, store, form;
        me = this;
        store = me.getStore('Projectptcashbon');
        form = me.getFormdata();
        store.reload({
            params: {
                "hideparam": 'projectptcashbon',
                "pt_id_owner": me.pt_id,

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
    getEmployeeCashbon: function () {
        var me, store, form;
        me = this;
        store = me.getStore('Employeecashbon');
        form = me.getFormdata();
        store.reload({
            params: {
                //"hideparam": 'getemployeecashbon',
                "hideparam": 'getemployeecashbonnew',
                "projectpt_id": me.projectptcashbon,
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
    validateClaimdate: function () {
        var me, form, accept_date, claim_date;
        me = this;
        form = me.getFormdata();
        var d1 = form.down("[name=accept_date]").getRawValue();
        var d2 = form.down("[name=claim_date]").getRawValue();
        var date1 = d1.split("-");
        var date2 = d2.split("-");
        var accept_date = parseInt(date1['0'] + date1['1'] + date1['2']);
        var claim_date = parseInt(date2['0'] + date2['1'] + date2['2']);

        if (claim_date > accept_date) {
            //console.log('lebih');
            me.hideBtn(form, 'save', true);
            me.hideBtn(form, 'cashback', true);
            me.hideBtn(form, 'uncashback', true);
            form.down("[name=claim_date]").setFieldStyle('background:none #FFFF00;');
            form.down("[name=claim_date]").markInvalid('Claim date is greater than Accept date');
        } else {
            //console.log('normal');
            me.hideBtn(form, 'save', false);
            me.hideBtn(form, 'cashback', false);
            me.hideBtn(form, 'uncashback', false);
            form.down("[name=claim_date]").setFieldStyle('background:none #FFFFFF;');
            form.down("[name=claim_date]").clearInvalid();
        }

    },
    setStorePrefix: function () {
        var me, store, form, in_out, cash_bank, kasbongiro;
        me = this;
        form = me.getFormdata();
        kasbongiro = form.down("[name=kasbongiro]").getValue();
        in_out = form.down("[name=dataflow]").getValue();
        if (kasbongiro == 'GIRO') {
            cash_bank = 'B';
        } else {
            cash_bank = 'K';
        }
        store = me.getStore("Voucherprefixsetupcombo");
        store.reload({
            callback: function (records, operation, success) {
                store.clearFilter(true);
                store.filter('pt_id', me.pt_id);
                store.filter('cash_bank', cash_bank);
                store.filter('in_out', in_out);
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
    setStoreKashbondept: function () {
        var me, store, form, in_out, cash_bank, kasbondept, kasbongiro, voucherprefix_id;
        me = this;
        form = me.getFormdata();

        kasbongiro = form.down("[name=kasbongiro]").getValue();
        in_out = form.down("[name=dataflow]").getValue();
        voucherprefix_id = form.down("[name=voucherprefix_id]").getValue();
        if (kasbongiro == 'GIRO') {
            cash_bank = 'B';
        } else {
            cash_bank = 'K';
        }
        store = form.down("[name=kasbondept_id]").getStore();
        store.load({
            params: {
                "project_id": me.project_id,
                "pt_id": me.pt_id,
                "kasbank": cash_bank,
                "dataflow": 'O',
                "voucherprefix_id": voucherprefix_id,
                "status": 2,
            },
            callback: function (records, operation, success) {

            }
        });
    },
    formDataAfterRender: function (el) {
        var me, state, grid, store, form, record, row, counter;
        me = this;
        form = me.getFormdata();
        me.storeProcess = me.createSpProcessObj(me.storeProcess);
        me.fdar().init();
        me.loadComboBoxStore(el);
        me.state = el.up('window').state;
        me.setData();
        switch (me.state) {
            case 'create':
                me.fdar().create();
                me.getforProjectptcashbon();
                break;
            case 'update':
                me.fdar().update();
                me.formatCurrencyFormdata(me, me.getFormdata());
                grid = me.getGrid();
                store = grid.getStore();
                record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));
                counter = store.getCount();
                if (counter > 0) {
                    row = record['data'];
                    me.pt_id = row.pt_id;
                }
                me.setDate(row);
                me.getforProjectptcashbon();
                me.setStorePrefix();
                me.setStoreDepartment();
                me.setStatus();
                break;
            case 'read':
                me.fdar().read();
                me.setStorePrefix();
                me.setStoreDepartment();
                me.setStatus();
                break;
        }
        me.setKasbongiro();
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
        if (me.formatDate(row.claim_date) == '1970-01-1' || me.formatDate(row.claim_date) == '1900-01-1') {
            me.setValue(me, 'accept_date', '');
        }
    },
    setKasbongiro: function () {
        var me, form, state, kasbongiro;
        me = this;
        form = me.getFormdata();
        kasbongiro = form.down("[name=kasbongiro]").getValue();
        state = form.up('window').state.toLowerCase();

        switch (kasbongiro) {
            case 'CASHBON':
                form.down("[name=textstatus]").setText("Cash Advance Status", true);
                me.fieldHide(form, 'chequegiro_no');
                me.fieldHide(form, 'chequegiro_date');
                me.fieldHide(form, 'chequegiro_payment_date');
                me.fieldHide(form, 'chequegiro_receive_date');
                me.fieldHide(form, 'chequegiro_release_date');

                me.fieldShow(form, 'cashback');
                me.fieldShow(form, 'balance');
                me.fieldShow(form, 'paid');

                me.containShow(form, '#realisation_expence');
                me.containShow(form, '#monitoring');
                me.containShow(form, '#otherproject');

                me.fieldDisable(me, 'dataflow', true);
                me.hideBtn(form, 'cashback', false);
                me.hideBtn(form, 'uncashback', false);

                if (state == 'create') {
                    me.setVal(form, 'chequegiro_no', '');
                    me.setVal(form, 'chequegiro_date', '');
                    me.setVal(form, 'chequegiro_payment_date', '');
                    me.setVal(form, 'chequegiro_receive_date', '');
                    me.setVal(form, 'chequegiro_release_date', '');

                    me.setVal(form, 'cashback', '');
                    me.setVal(form, 'balance', '');
                    me.setVal(form, 'paid', '');
                    me.setVal(form, 'dataflow', 'O');

                    //me.setValCombo(form, 'dataflow', 'O', 'OUT');

                    form.down("#radio1_cc").setValue(false);
                    form.down("#radio2_cc").setValue(true);

                    form.down("#radio1_ca").setValue(false);
                    form.down("#radio2_ca").setValue(true);


                    form.down("#radio1_caa").setValue(false);
                    form.down("#radio2_caa").setValue(true);

                    me.setValCombo(form, 'cashbon_create_by', '', '');

                    form.down("[name=paid]").setValue(0);
                    form.down("[name=cashback]").setValue(0);
                    form.down("[name=balance]").setValue(0);
                }
                me.setStorePrefix();
                break;
            case 'GIRO':
                form.down("[name=textstatus]").setText("Cheque / Giro status", true);
                me.fieldShow(form, 'chequegiro_no');
                me.fieldShow(form, 'chequegiro_date');
                me.fieldShow(form, 'chequegiro_payment_date');
                me.fieldShow(form, 'chequegiro_receive_date');
                me.fieldShow(form, 'chequegiro_release_date');

                me.fieldHide(form, 'cashback');
                me.fieldHide(form, 'balance');
                me.fieldHide(form, 'paid');

                me.containHide(form, '#realisation_expence');
                me.containHide(form, '#monitoring');
                me.containHide(form, '#otherproject');

                me.hideBtn(form, 'cashback', true);
                me.hideBtn(form, 'uncashback', true);
                me.fieldDisable(me, 'dataflow', true);

                if (state == 'create') {
                    me.setValue(me, 'chequegiro_status', 'UNPROCESSED');
                    form.down("[name=lblstatus]").setText("UNPROCESSED", true);
                    me.setVal(form, 'chequegiro_no', '');
                    me.setVal(form, 'chequegiro_date', '');
                    me.setVal(form, 'chequegiro_payment_date', '');
                    me.setVal(form, 'chequegiro_receive_date', '');
                    me.setVal(form, 'chequegiro_release_date', '');

                    me.setVal(form, 'cashback', '');
                    me.setVal(form, 'balance', '');
                    me.setVal(form, 'paid', '');
                    me.setVal(form, 'dataflow', 'O');

                    form.down("#radio1_cc").setValue(false);
                    form.down("#radio2_cc").setValue(true);

                    form.down("#radio1_ca").setValue(false);
                    form.down("#radio2_ca").setValue(true);

                    form.down("#radio1_caa").setValue(false);
                    form.down("#radio2_caa").setValue(true);

                    //me.setValCombo(form, 'dataflow', '', '');
                    me.setValCombo(form, 'cashbon_create_by', '', '');

                    form.down("[name=paid]").setValue(0);
                    form.down("[name=cashback]").setValue(0);
                    form.down("[name=balance]").setValue(0);
                }
                me.setStorePrefix();

                break;
        }


    },
    setStatus: function () {
        var me, form, chequegiro_no, chequegiro_status, status, labelstatus, kasbongiro,
                flagstatus, amount, balance, statuscashback, statusuncashback;
        me = this;
        form = me.getFormdata();
        kasbongiro = me.getVal(form, "kasbongiro", "value");
        flagstatus = me.getVal(form, "status", "value");
        amount = me.unMask(me.getVal(form, "amount", "value"));
        balance = me.unMask(me.getVal(form, "balance", "value"));

        if (kasbongiro == 'GIRO') {
            chequegiro_no = form.down("[name=chequegiro_no]").getValue();
            chequegiro_status = form.down("[name=chequegiro_status]").getValue();
            if (chequegiro_no.length > 0 && me.state == 'update' && chequegiro_status !== 'UNPROCESSED' && chequegiro_status !== 'PROCESSED') {
                status = chequegiro_status;
                labelstatus = chequegiro_status;
            } else if (chequegiro_no.length > 0 && me.state == 'update' && chequegiro_status == 'UNPROCESSED') {
                status = "PROCESSED";
                labelstatus = "PROCESSED";
            } else if (chequegiro_no.length > 0 && me.state == 'update' && chequegiro_status == 'PROCESSED') {
                status = "PROCESSED";
                labelstatus = "PROCESSED";
            } else if (chequegiro_no.length > 0 && me.state == 'update') {
                labelstatus = "PROCESSED";
            } else if (chequegiro_no.length > 0 && me.state == 'create') {
                status = "PROCESSED";
                labelstatus = "PROCESSED";
            } else if (chequegiro_no.length < 1 && me.state == 'update') {
                status = "UNPROCESSED";
                labelstatus = "UNPROCESSED";
            } else if (chequegiro_no.length < 1 && me.state == 'create') {
                status = "UNPROCESSED";
                labelstatus = "UNPROCESSED";
            }

            form.down("[name=lblstatus]").setText(labelstatus, true);
            me.setValue(me, 'chequegiro_status', status);
            form.down("[name=chequegiro_no]").setValue(chequegiro_no);
        } else if (kasbongiro == 'CASHBON') {

            if (flagstatus == "Y") {
                status = "PROCESSED";
                labelstatus = "PROCESSED";
                statuscashback = true;
                statusuncashback = true;
            }

            if (flagstatus == "T" && balance == amount) {
                status = "UNPROCESSED";
                labelstatus = "UNPROCESSED";
                statuscashback = false;
                statusuncashback = true;
            } else if (flagstatus == "T" && balance !== amount) {
                status = "BEINGPROCESSED";
                labelstatus = "BEING PROCESSED";
                statuscashback = false;
                statusuncashback = true;
            } else if (flagstatus == "T" && balance == 0) {
                status = "PROCESSED";
                labelstatus = "PROCESSED";
                statuscashback = true;
                statusuncashback = true;
            }

            form.down("[action=cashback]").setDisabled(statuscashback);
            form.down("[action=uncashback]").setDisabled(statusuncashback);
            form.down("[name=lblstatus]").setText(labelstatus, true);
            me.setValue(me, 'statusdata', status);

        }

    },
    setData: function () {
        var me, form, formvalue, storeprojectpt, storeprefixvoucher, grid, store, record, rowdata;
        me = this;
        form = me.getFormdata();
        formvalue = form.getForm().getValues();

        switch (me.state) {
            case 'create':
                form.down("#radio2_cc").setValue(true);
                form.down("#radio2_ca").setValue(true);
                form.down("#radio2_caa").setValue(true);
                //form.down("[name=due_date]").setValue(me.dateNow); //jangan di default by pak iwan
                form.down("[name=accept_date]").setValue(me.dateNow);
                form.down("[name=claim_date]").setValue(me.dateNow);
                form.down("[name=paid]").setValue(0);
                form.down("[name=cashback]").setValue(0);
                form.down("[name=claim_date]").setValue(me.dateNow);
                form.down("[action=cashback]").setDisabled(true);
                form.down("[action=uncashback]").setDisabled(true);
                if (apps.project == 1) {
                    //jika project kantor pusat, set cd pemberi cashbonnya
                    me.pt_id = 1;
                    form.down("[name=pt_id]").setValue(1);
                }

                break;
            case 'update':
                grid = me.getGrid();
                store = grid.getStore();
                record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));
                rowdata = record['data'];

                form.down("[name=pt_id]").setDisabled(true);
                form.down("[name=voucherprefix_id]").setDisabled(true);

                if (form.down("#radio2_caa").getValue() == false) {
                    form.down("[name=cashbon_projectpt_id]").setReadOnly(false);
                    form.down("[name=cashbon_projectpt_id]").allowBlank = false;
                } else {
                    form.down("[name=cashbon_projectpt_id]").allowBlank = false;
                    form.down("[name=cashbon_projectpt_id]").setReadOnly(true);
                    form.down("[name=cashbon_projectpt_id]").allowBlank = true;
                }
                break;
        }
    },
    generateTransno: function () {
        var me;
        me = this;
        switch (me.state) {
            case 'create':
                me.senddata = {
                    "hideparam": 'gettransnocashbon',
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
                    "hideparam": 'generatevouchernocashadvance',
                    "project_id": apps.project,
                    "param_date": accept_date,
                    "pt_id": me.pt_id,
                    "module": 'CASH ADVANCE',
                    "prefix": me.getFormdata().down("[name=voucherprefix_id]").getRawValue(),
                    "flag": me.flaggeneratevoucherno,
                }
                me.urlrequest = me.urlcommon;
                me.AjaxRequest();
                break;
        }
    },
    getBatasduedate: function () {
        var me, form, claim_date, state;
        me = this;
        form = me.getFormdata();
        state = form.up('window').state.toLowerCase();
        claim_date = me.formatDate(me.getVal(form, 'claim_date', 'value'));
        switch (state) {
            case 'create':
                me.senddata = {
                    "hideparam": 'global_param', //sesuai global param
                    "globalname": 'batasan_lama_cashadvance',
                    "project_id": apps.project,
                    "param_date": claim_date,
                    "pt_id": me.pt_id,
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
        var me, data, form, claim_date, duedate;
        me = this;
        data = me.info.data;
        form = me.getFormdata();
        switch (me.info.parameter) {
            case 'default':
                break;
            case 'gettransnocashbon':
                form.down("[name=transno]").setValue(me.info.total);
                break;
            case 'generatevouchernocashadvance':
                form.down("[name=voucher_no]").setValue(data);
                break;
            case 'global_param':
                if (data.name == 'batasan_lama_cashadvance') {
                    claim_date = me.formatDate(me.getVal(form, 'claim_date', 'value'));
                    duedate = me.customeAdddate(claim_date, parseInt(data.value));
                    me.setVal(form, 'due_date', duedate);
                }
                break;
        }
    },
    dataSave: function () {
        var me = this;
        me.getFormdata().down("[name=hideparam]").setValue('default'); // added on april 2016, ahmad riadi     
        var form = me.getFormdata().getForm();
        var state_submit = me.getFormdata().up('window').state.toLowerCase();

        //console.log(form.getValues());
        var addingRecord = false;
        if (!me.finalValidation()) {
            return false;
        }

        var vp = me.validationProcess();
        var vps = false; // validation prosess status
        if (typeof vp === 'object') {
            vps = vp.status;
            if (!vps) {

                Ext.MessageBox.alert('Alert', vp.msg, function () {
                    var x = me.getFormdata().down('[name=' + vp.field + ']');
                    if (x !== null) {
                        x.markInvalid(vp.msg);
                        x.focus();
                    }

                });
            }
        } else if (typeof vp === 'boolean') {
            vps = vp;
        }


        if (form.isValid() && vps) {
            resetTimer();
            var store = null;
            if (state_submit == 'create') {
                me.flaggeneratevoucherno = '1';
                me.generateVoucherno();
            }
            me.unformatCurrencyFormdata(me, me.getFormdata());
            var fida = me.getFinalData(form.getValues());
            if (me.instantCreateMode) {
                store = _Apps.getController(me.callerId).getInstanCreateStorex(me.controllerName);
            } else {
                /* Mendefinisikan store sendiri pada saat proses simpan/edit 
                 * yang ada di me.storeProcess
                 * */
                if (!me.storeProcess) {
                    store = me.getGrid().getStore();
                    //console.log(store);
                } else {
                    store = me.storeProcess;
                }
            }
            var msg = function () {
                me.getFormdata().up('window').body.mask('Saving data, please wait ...');
            };
            fida['project_id'] = apps.project;
            fida['dataflow'] = me.getFormdata().down("[name=dataflow]").getValue();
            switch (state_submit) {
                case 'create':
                    var duedate = me.getFormdata().down("[name=due_date]").getValue();
                    var validation = me.checkRangedate(me.dateNow, duedate);
                    if (validation == 'notvalid') {
                        me.buildWarningAlert('Due Date Cannot Backdate..');
                        return false;
                    }


                    store.add(fida);
                    addingRecord = true;
                    break;
                case 'update':
                    var idProperty = store.getProxy().getReader().getIdProperty();
                    var rec = store.getById(parseInt(form.findField(idProperty).getValue(), 10));
                    rec.beginEdit();
                    rec.set(fida);
                    rec.endEdit();
                    break;
                default:
                    return;
            }

            store.on('beforesync', msg);
            store.sync({
                success: function (batch, options) {
                    me.getFormdata().up('window').body.unmask();
                    store.un('beforesync', msg);
                    store.reload();
                    if (typeof Ext.StoreManager.lookup(me.stores[0]) != 'undefined') {
                        Ext.StoreManager.lookup(me.stores[0]).load({params: {limit: 0}});
                    }
                    Ext.Msg.show({
                        title: 'Success',
                        msg: batch.proxy.getReader().jsonData.msg,
                        icon: Ext.Msg.INFO,
                        buttons: Ext.Msg.OK,
                        fn: function () {
                            me.formDataClose();

                        }
                    });

                },
                failure: function (batch, options) {
                    var errMsg = (batch.proxy.getReader().jsonData.msg ? batch.proxy.getReader().jsonData.msg : 'Unable to save data.');

                    me.getFormdata().up('window').body.unmask();
                    store.un('beforesync', msg);
                    if (store.getCount() > 0 && addingRecord) {
                        store.removeAt(store.getCount() - 1);
                    }
                    store.reload();
                    Ext.Msg.show({
                        title: 'Failure',
                        msg: 'Error: ' + errMsg,
                        icon: Ext.Msg.ERROR,
                        buttons: Ext.Msg.OK
                    });


                }
            });
        }

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
        me.arraycoadetail = null;
        me.rowcompanyform = null;
        me.rowcompanysearch = null;
        me.accept_date = null;
        me.countercoadetail = 0;
        me.pt_id = 0;
        me.ptname = null;
        me.idheadervalue = 0;
        me.projectptcashbon = 0;
        me.kasbongiro = null;
        me.dataflow = null;
        me.project_id = 0;
    },
});