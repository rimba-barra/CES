Ext.define('Cashier.controller.Tloan', {
    extend: 'Cashier.library.template.controller.Controllermodule',
    alias: 'controller.tloan',
    requires: [
        'Cashier.template.ComboBoxFields',
        'Cashier.library.template.combobox.Ptusercombobox',
        'Cashier.library.template.combobox.Departmentcombobox',
        'Cashier.library.template.combobox.Deptprefixcombobox',
        'Cashier.library.template.combobox.Prefixcombobox',
        'Cashier.library.template.combobox.Typeloancombobox',
        'Cashier.library.template.combobox.Loanercombobox',
        'Cashier.library.template.combobox.Paymenttypecombobox',
        'Cashier.library.template.combobox.Statusloancombobox',
    ],
    views: [
        'tloan.Panel',
        'tloan.FormData',
        'tloan.Grid',
        'tloan.Griddetail',
        'tloan.FormSearch',
    ],
    stores: [
        'Tloan',
        'Tloanpayment',
        'Ptbyuser',
        'Department',
        'Deptprefixcombo',
        'Voucherprefixsetupcombo',
        'Typeloan',
        'Loaner',
        'Paymenttype',
        'Statusloan',
    ],
    models: [
        'Tloan',
        'Tloanpayment',
    ],
    refs: [
        {ref: 'grid', selector: 'tloangrid'},
        {ref: 'griddetail', selector: 'tloangriddetail'},
        {ref: 'formsearch', selector: 'tloanformsearch'},
        {ref: 'formdata', selector: 'tloanformdata'},
        {ref: 'formdatadetail', selector: 'tloandetailformdata'},
    ],
    controllerName: 'tloan',
    formWidth: 840,
    fieldName: 'loan_no', // dari grid header
    fieldconfirmdetail: 'code', //dari grid detail
    bindPrefixName: 'Tloan',
    urlheader: 'cashier/tloan/',
    flaggeneratevoucherno: 0,
    urlcommon: 'cashier/common/create',
    urldetail: 'cashier/tloan/detail',
    urlrequest: null, senddata: null, info: null, messagedata: null,
    idheaderfield: 'loan_id', idheadervalue: 0, idheaderview: 0, dateNow: new Date(),
    filtercheckdetail: 'code', panelwidth: 0, panelheight: 0, state: null, prefix: null,
    counterdetail: 1, oldpayamount: 0,
    init: function (application) {
        var me = this;
        this.control({
            //====================================START HEADER=============================================  
            'tloanpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: function (panel) {
                    this.panelAfterRender();
                    panel.up('window').maximize();
                    panel.up('window').setTitle("Loan Transaction");
                },
                resize: function (that, width, height, oldWidth, oldHeight, eOpts) {
                    me.getFormsearch().setWidth(width);
                    me.getGrid().setWidth(width);
                    me.getGrid().setHeight(height - 30);
                    me.panelheight = height - 30;
                },
            },
            'tloangrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange,
                select: this.gridSelect,
                boxready: function () {
                    var grid, store, counter;
                    grid = me.getGrid();
                    store = grid.getStore();
                    store.reload({
                        callback: function (records, operation, success) {
                            counter = store.getCount();
                            //me.getDatadetailview();
                            if (counter > 0) {
                                me.getGrid().getSelectionModel().select(0, true);
                            }
                        }
                    });

                },
            },
            'tloangrid toolbar button[action=create]': {
                click: function () {
                    me.paramheader.stateform = 'create';
                    me.state = 'create';
                    me.formDataShow('create');
                }
            },
            'tloangrid toolbar button[action=update]': {
                click: function () {
                    me.paramheader.stateform = 'update';
                    me.state = 'update';
                    this.formDataShow('update');
                }
            },
            'tloangrid toolbar button[action=destroy]': {
                click: this.dataDestroy
            },
            'tloangrid toolbar button[action=print]': {
                click: this.dataPrint
            },
            'tloangrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                click: this.gridActionColumnClick
            },
            'tloanformsearch': {
                afterrender: function () {
                    var me = this;
                    me.setStoreFormsearch();
                },
                collapse: function () {
                    me.getGrid().setHeight(me.panelheight);
                },
                expand: function () {
                    me.getGrid().setHeight(me.panelheight - 190);
                    me.setStoreFormsearch();
                }
            },
            'tloanformsearch [name=pt_id] ': {
                'select': function (g, record, item, index, e, eOpts) {
                    var rowdata = record[0]['data'];
                    me.pt_id = rowdata.pt_id;
                    me.setStorePrefix();
                    me.setStoretypeloan();
                    me.setStoreDepartment();
                    me.setStoreLoaner();
                },
            },
            'tloanformsearch button[action=search]': {
                click: this.dataSearch
            },
            'tloanformsearch button[action=reset]': {
                click: this.dataReset
            },
            'tloanformdata': {
                afterrender: function () {
                    me.formDataAfterRenderCustome();
                },
                boxready: function () {
                    me.setFormDataAfterrender();
                }
            },
            'tloanformdata [name=pt_id] ': {
                'select': function (g, record, item, index, e, eOpts) {
                    var rowdata = record[0]['data'];
                    me.pt_id = rowdata.pt_id;
                    me.setStorePrefix();
                    me.setStoretypeloan();
                    me.setStoreDepartment();
                    me.setStoreLoaner();
                },
            },
            'tloanformdata [name=voucherprefix_id] ': {
                'select': function (g, record, item, index, e, eOpts) {
                    var me, rowdata, form;
                    me = this;
                    rowdata = record[0]['data'];
                    form = me.getFormdata();
                    me.prefix = rowdata.prefix;
                    form.down("[name=prefix_id]").setValue(rowdata.prefix_id);
                    form.down("[name=coa_id]").setValue(rowdata.coa_id);
                    form.down("[name=coa]").setValue(rowdata.coa);
                    form.down("[name=coa_desc]").setValue(rowdata.coaname)
                    me.generateVoucherno();
                },
            },
            'tloanformdata [name=amount] ': {
                'blur': function () {
                    var me, value, form, state;
                    me = this;
                    form = me.getFormdata();
                    state = form.up('window').state.toLowerCase();
                    if (state == 'create') {
                        value = me.unMask(me.getVal(form, 'amount', 'value'));
                        me.setVal(form, 'remaining', me.Mask(value));
                    }

                },
            },
            'tloanformdata [name=objectname] ': {
                'keyup': function () {
                    var me, value;
                    me = this;
                },
            },
            'tloanformdata button[action=save]': {
                click: function () {
                    me.dataSavetloan();
                }

            },
            'tloanformdata button[action=cancel]': {
                click: function () {
                    var me, storedetail;
                    me = this;
                    storedetail = me.getGriddetail().getStore();
                    if (storedetail.getCount() > 0) {
                        storedetail.removeAll();
                    }
                    me.formDataClose();
                }

            },
            //====================================END HEADER===============================================       

            //====================================START DETAIL=============================================      
            'tloangriddetail': {
                selectionchange: this.cellgridDetail,
                itemdblclick: this.griddetailitemdoubleclick,
                // itemdblclick: this.actiondataDetail,
            },
            'tloangriddetail toolbar button[action=create]': {
                click: function () {
                    me.paramdetail.stateform = 'create';
                    me.GenerateFormdata(me.paramdetail);
                }
            },
            'tloangriddetail toolbar button[action=update]': {
                click: function () {
                    me.paramdetail.stateform = 'update';
                    me.GenerateFormdata(me.paramdetail);
                }
            },
            'tloangriddetail toolbar button[action=destroy]': {
                click: function () {
                    me.fieldName = 'description';
                    this.dataDestroydetailwithflag();
                   
                }
            },
            'tloangriddetail actioncolumn': {
                click: function (view, cell, row, col, e) {
                    me.gridActionColumndetailclick(view, cell, row, col, e);
                }
            },
            'tloandetailformdata': {
                afterrender: this.formDataDetailAfterRender
            },
            'tloandetailformdata button[action=save]': {
                click: function () {
                    var me, formheader, formdetail, state, store, counter, totalamount,
                            totalallpay, amountpay, balance, tmppay, flag;

                    me = this;
                    formheader = me.getFormdata();
                    formdetail = me.getFormdatadetail();
                    store = me.getGriddetail().getStore();
                    store.filter('deleted', false);
                    counter = store.getCount();
                    state = formheader.up('window').state.toLowerCase();

                    if (counter > 0) {
                        totalamount = me.unMask(me.getVal(formheader, 'amount', 'value'));
                        if (state == 'create') {
                            amountpay = me.unMask(me.getVal(formdetail, 'amount', 'value'));
                            flag = 1;
                        } else {
                            var tmpflag = 0; //parameter untuk check kondisi nilai yang baru harus lebih besar dari nilai yang lama
                            tmppay = me.unMask(me.getVal(formdetail, 'amount', 'value'));
                            amountpay = me.unMask(me.getVal(formdetail, 'amount', 'value')) - parseFloat(me.oldpayamount);

                            if (parseFloat(tmppay) < parseFloat(me.oldpayamount)) {
                                tmpflag = 0;
                            } else {
                                tmpflag = 1;
                            }

                            flag = tmpflag;
                        }
                        totalallpay = store.sum('amount');
                        balance = parseFloat(totalamount) - (parseFloat(totalallpay) + parseFloat(amountpay));
                        if (balance < 0) {
                            me.buildWarningAlert('Sorry data cannot save, total payment amount ' + parseFloat(totalallpay) + parseFloat(amountpay) + ' more than total amount :' + totalamount);
                        } else {
                            if (flag == 1) {
                                me.dataSaveDetailstore();
                            } else {
                                me.buildWarningAlert('Sorry data cannot save, new amount must more than old amount');
                            }
                        }
                    } else {
                        totalamount = me.unMask(me.getVal(formheader, 'amount', 'value'));
                        if (state == 'create') {
                            amountpay = me.unMask(me.getVal(formdetail, 'amount', 'value'));
                        } else {
                            amountpay = parseFloat(me.unMask(me.getVal(formdetail, 'amount', 'value'))) - parseFloat(me.oldpayamount);
                        }
                        totalallpay = 0;
                        balance = parseFloat(totalamount) - (parseFloat(totalallpay) + parseFloat(amountpay));
                        if (balance < 0) {
                            me.buildWarningAlert('Sorry data cannot save, total payment amount ' + parseFloat(parseFloat(totalallpay) + parseFloat(amountpay)) + ' more than total amount :' + totalamount);
                        } else {
                            me.dataSaveDetailstore();
                        }
                    }

                }


            },
            //====================================END DETAIL================================================           
        });
    },
    paramheader: {
        //start properties form
        store: null, data: null, record: null, row: null, form: null,
        stateform: null,
        //start properties form
    },
    paramdetail: {
        //start formgeneate
        fromlocation: 'Cashier.view.tloan.FormDataDetail',
        formtitle: 'Form Payment', formicon: 'icon-form-add',
        formid: 'win-tloandetailformdata', formlayout: 'fit',
        formshadow: 'frame', formmask: 'Loading...',
        formwidth: 400, formtimeout: 0,
        stateform: null, formaction: null, formproperties: null, formwindows: null,
        //end formgeneate
        //start properties form
        iddetail: 0, store: null, data: null, record: null, grid: null, row: null, form: null,
        checkdata: false, object: null, rowdata: null, action: null, counter: 0,
        //start properties form
    },
    gridActionColumnClick: function (view, cell, row, col, e) {
        var me = this;
        var record = me.getGrid().getStore().getAt(row);
        var m = e.getTarget().className.match(/\bact-(\w+)\b/);
        me.getGrid().getSelectionModel().select(row);
        //console.log(m[1]);

        if (m) {
            switch (m[1]) {
                case 'update':
                    me.formDataShow('update');
                    break;
                case 'destroy':
                    me.dataDestroy();
                    break;
            }
        }
    },
    setStorePrefix: function () {
        var me, store, form;
        me = this;
        store = me.getStore("Voucherprefixsetupcombo");
        store.reload({
            callback: function (records, operation, success) {
                store.clearFilter(true);
                store.filter('pt_id', me.pt_id);
                store.filter('cash_bank', 'K');
                store.filter('in_out', 'O');
            }
        });
    },
    setStoretypeloan: function () {
        var me, store, form, in_out;
        me = this;
        store = me.getStore("Typeloan");
        store.load({
            params: {
                "hideparam": 'default',
                "project_id": apps.project,
                "pt_id": me.pt_id,
                "start": 0,
                "limit": 1000,
            },
            callback: function (records, operation, success) {
            }
        });
    },
    setStoreLoaner: function () {
        var me, store, form, in_out;
        me = this;
        store = me.getStore("Loaner");
        store.load({
            params: {
                "hideparam": 'default',
                "project_id": apps.project,
                "pt_id": me.pt_id,
                "start": 0,
                "limit": 1000,
            },
            callback: function (records, operation, success) {
            }
        });
    },
    setStoreDepartment: function () {
        var me, store, form, in_out;
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
    formDataAfterRenderCustome: function () {
        var me, state, form, grid, store, record, row, counter, storedetail, countlength;
        me = this;
        me.storeProcess = me.createSpProcessObj(me.storeProcess);
        me.fdar().init();
        me.setStoreFormdata();
        form = me.getFormdata();
        state = form.up('window').state.toLowerCase();
        switch (state) {
            case 'create':
                me.state = 'create';
                me.fdar().create();
                me.idheadervalue = '0';
                break;
            case 'update':
                me.state = 'update';
                me.fdar().update();
                grid = me.getGrid();
                store = grid.getStore();
                record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));
                counter = store.getCount();
                if (counter > 0) {
                    row = record['data'];
                    me.idheadervalue = row.loan_id;
                    me.pt_id = row.pt_id;
                    //me.oldpayamount = row.paid;
                    me.setStorePrefix();
                    me.setStoretypeloan();
                    me.setStoreLoaner();
                    me.setStoreDepartment();
                    me.setReadonly(form, 'pt_id', true);
                    me.setReadonly(form, 'voucherprefix_id', true);
                    me.setReadonly(form, 'loan_no', true);
                    me.setReadonly(form, 'loantype_id', true);
                    me.setReadonly(form, 'amount', true);
                    me.setReadonly(form, 'paid', true);
                    me.setReadonly(form, 'remaining', true);

                    if (row.status == 'C') {
                        me.setLabel(me, 'lblstatus', 'CLOSE', true);
                        me.setValue(me, 'status', 'C');
                        me.getFormdata().getForm().getFields().each(function (field) {
                            field.setReadOnly(true);
                            me.getFormdata().down('#btnSave').setDisabled(true);
                        });
                    } else {
                        me.setLabel(me, 'lblstatus', 'OPEN', true);
                        me.setValue(me, 'status', 'O');
                    }
                }
                break;
            case 'read':
                me.state = 'read';
                me.fdar().read();
                grid = me.getGrid();
                store = grid.getStore();
                record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));
                counter = store.getCount();
                if (counter > 0) {
                    row = record['data'];
                    me.idheadervalue = row.loan_id;
                    me.pt_id = row.pt_id;
                    me.setStorePrefix();
                    me.setStoretypeloan();
                    me.setStoreLoaner();
                    me.setStoreDepartment();
                }
                break;
            default:
        }
    },
    setFormDataAfterrender: function () {
        var me = '';
        me = this;
        me.ActionHeader();
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
            me.idheaderview = row.loan_id;
            //me.getDatadetailview();
        }
    },
    ActionHeader: function () {
        var me, ph, pd, form, state, storedetail = '';
        me = this;
        form = me.getFormdata();
        state = form.up('window').state.toLowerCase();
        switch (state) {
            case 'create':
                storedetail = me.getGriddetail().getStore();
                if (storedetail.getCount() > 0) {
                    storedetail.removeAll();
                }
                me.idheadervalue = '0';
                me.setLabel(me, 'lblstatus', 'OPEN', true);
                me.setValue(me, 'status', 'O');
                me.setValue(me, 'loan_id', '0');
                me.setValue(me, 'loan_date', me.dateNow);
                break;
            case 'update':
                me.idheadervalue = me.getValue(me, 'loan_id', 'value');
                me.getDatadetail();
                break;
            default:
        }
    },
    cellgridDetail: function () {
        var me, pd = '';
        me = this;
        pd = me.paramdetail;
        me.gridSelectionChangedetail();
        pd.grid = me.getGriddetail();
        pd.object = pd.grid.getSelectionModel().getSelection();
        pd.data = '';
        for (var i = 0; i <= pd.object.length - 1; i++) {
            pd.data = pd.object[i];
        }
        if (pd.data !== '') {
            // pd.rowdata = pd.data['data'];
            pd.rowdata = pd.data;
        }
    },
    getDatadetailview: function () {
        var me, pd, counter = '';
        me = this;
        var grid = me.getGriddetailview();
        var store = me.getGriddetailview().getStore();
        store.clearFilter(true);
        store.load({
            params: {
                "hideparam": 'default',
                "loan_id": me.idheaderview,
                "start": 0,
                "limit": 1000,
            },
            callback: function (records, operation, success) {
                store.sort('code', 'ASC');
                counter = store.getCount();
                if (counter > 0) {
                    grid.getSelectionModel().select(0, true);
                }
            }
        });
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
                "loan_id": me.idheadervalue,
                "start": 0,
                "limit": 1000,
            },
            callback: function (records, operation, success) {
                counter = pd.store.getCount();
                pd.counter = counter;
                if (counter > 0) {
                    pd.grid.getSelectionModel().select(0, true);
                }
            }
        });
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
    countDetail: function () {
        var me, grid, store;
        me = this;
        grid = me.getGriddetail();
        store = me.getGriddetail().getStore();
//       // store.clearFilter(true);     
//        store.filterBy(function (rec, id) {           
//            if (rec.raw.loan_id === me.idheadervalue) {
//                return true;
//            }
//            else {
//                return false;
//            }
//        });

        return  store.getCount();
    },
    formDataDetailAfterRender: function () {
        var me, pd, action, counter, sort, form;
        me = this;
        pd = me.paramdetail;
        form = me.getFormdatadetail();
        switch (pd.stateform) {
            case 'create':
                counter = me.countDetail();
                if (counter < 1) {
                    sort = 1;
                } else {
                    sort = counter + 1;
                }
                form.down("[name=loan_id]").setValue(me.idheadervalue);
                form.down("[name=loanpayment_id]").setValue('0');
                form.down("[name=payment_no]").setValue(sort);
                break;
            case 'update':
                //console.log(pd.rowdata.data.amount);
                me.oldpayamount = pd.rowdata.data.amount;
                form.loadRecord(pd.rowdata);
                break;
            default:
        }
        me.formatCurrencyFormdata(me, form);
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
                me.dataDestroydetailwithflag();                
                break;
            default:
                returndata = "No action selected";
        }
    },
    dataSavetloan: function () {
        var me, form, formdata, addingRecord, vp, vps, x, store, stotedetail,
                valuedata, idProperty, rec, paramdata, rowdata, state_submit, idProperty;
        me = this;
        form = me.getFormdata();
        formdata = me.getFormdata().getForm();
        me.unformatCurrencyFormdata(me, form);

        if (formdata.isValid()) {
            resetTimer();
            if (me.state == 'create') {
                me.flaggeneratevoucherno = '1';
                me.generateVoucherno();
            }
            store = me.getGrid().getStore();
            valuedata = formdata.getValues();
            form.up('window').body.mask('Saving data, please wait ...');
            state_submit = form.up('window').state.toLowerCase();


            switch (state_submit) {
                case 'create':
                    store.add(valuedata);
                    addingRecord = true;
                    valuedata['hideparam'] = state_submit;
                    me.senddata = valuedata;
                    me.urlrequest = me.urlheader + state_submit;
                    me.AjaxRequest();
                    store.commitChanges();
                    break;
                case 'update':
                    idProperty = store.getProxy().getReader().getIdProperty();
                    rec = store.getById(parseInt(formdata.findField(idProperty).getValue(), 10));
                    rec.beginEdit();
                    rec.set(valuedata);
                    rec.endEdit();
                    valuedata['hideparam'] = state_submit;
                    me.senddata = valuedata;
                    me.urlrequest = me.urlheader + state_submit;
                    me.AjaxRequest();
                    store.commitChanges();
                    break;
                default:
                    return;
            }

        }
    },
    dataSaveDetaildb: function () {
        var me, store, counter, state, form, data, ph, pd, iddata;
        me = this;
        ph = me.paramheader;
        pd = me.paramdetail;
        form = me.getFormdata();

        store = me.getGriddetail().getStore();
        store.clearFilter(true);
        state = form.up('window').state.toLowerCase();

        if (state == 'create') {
            store.filter(me.idheaderfield, '0');
        } else {
            store.filter(me.idheaderfield, me.idheadervalue);
        }

        counter = store.getCount();
        if (counter > 0) {
            store.each(function (record, index) {
                iddata = record.get("loanpayment_id");
                state = record.get("statedata");
                data = record['data'];
                data[me.idheaderfield] = me.idheadervalue;
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
        }
    },
    dataSaveDetailstore: function () {
        var me, pd = '';
        me = this;
        pd = me.paramdetail;
        pd.form = me.getFormdatadetail().getForm();
        me.unformatCurrencyFormdata(me, me.getFormdatadetail());

        if (pd.form.isValid()) {
            pd.grid = me.getGriddetail();
            pd.store = me.getGriddetail().getStore();
            pd.row = pd.form.getValues();

            pd.row[me.idheaderfield] = me.idheadervalue;
            if (pd.row.loanpayment_id == '0') {
                pd.row['statedata'] = 'create';
            } else {
                pd.row['statedata'] = 'update';
            }
            
            
            me.Checkdatadetail();
            switch (pd.stateform) {
                case 'create':
                    if (pd.checkdata == false) {
                        pd.store.add(pd.row);
                        pd.store.commitChanges();
                    } else {
                        me.buildWarningAlert("Sorry data already exist in this grid");
                    }
                    break;
                case 'update':
                    pd.record = pd.store.getAt(pd.store.indexOf(pd.grid.getSelectionModel().getSelection()[0]));
                    pd.record.beginEdit();
                    pd.record.set(pd.row);
                    pd.record.endEdit();
                    pd.store.commitChanges();
                    break;
            }

            me.setCalculateLoan();
            me.getFormdatadetail().up('window').close();
            me.oldpayamount = 0;
            me.checkPayment();
        }
    },
    checkPayment: function () {
        var me, counter, store, form, totalamount, totalpayment, balance;
        me = this;
        form = me.getFormdata();
        store = me.getGriddetail().getStore();
        store.filter('deleted', false);
        counter = store.getCount();
        if (counter > 0) {
            totalpayment = store.sum("amount");
            totalamount = me.unMask(me.getVal(form, 'amount', 'value'));
            balance = parseFloat(totalamount) - parseFloat(totalpayment);
            if (balance == 0) {
                me.setLabel(me, 'lblstatus', 'CLOSE', true);
                me.setValue(me, 'status', 'C');
            } else if (balance > 0) {
                me.setLabel(me, 'lblstatus', 'OPEN', true);
                me.setValue(me, 'status', 'O');
            } else {
                me.setLabel(me, 'lblstatus', 'ERROR', true);
                me.setValue(me, 'status', '');
            }
        }
    },
    Checkdatadetail: function () {
        var me, status, returndata, pd, filter = '';
        me = this;
        pd = me.paramdetail;
        pd.checkdata = false;
        pd.store.each(function (record)
        {

            if (record.data[me.idheaderfield] == pd.row.loan_id &&
                    me.formatDate(record.data['payment_date']) == me.formatDate(pd.row.payment_date) &&
                    record.data['amount'] == pd.row.amount &&
                    record.data['description'] == pd.row.description

                    )
            {
                pd.checkdata = true;
            }
        });
    },
    AjaxRequest: function () {
        var me;
        me = this;
        Ext.Ajax.request({
            url: me.urlrequest,
            method: 'POST',
            timeout:45000000,
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
        var form = me.getFormdata();
        switch (me.info.parameter) {
            case 'default':
                break;
            case 'gettloanid':
                me.idheadervalue = data[0].loan_id;
                break;
            case 'generatevouchernoloan':
                form.down("[name=loan_no]").setValue(data);
                break;
            case 'create':
                if (me.info.success == 'true') {
                    me.idheadervalue = me.info.data.loan_id;
                    me.dataSaveDetaildb();
                    me.messagedata = me.info.msg;
                    me.alertFormdataSuccess();
                } else {
                    me.messagedata = me.info.msg;
                    me.alertFormdataFailed();
                }
                break;
            case 'update':
                if (me.info.success == 'true') {
                    me.messagedata = me.info.msg;
                    me.idheadervalue = me.info.data.loan_id;
                    me.dataSaveDetaildb();
                    me.alertFormdataSuccess();

                } else {
                    me.messagedata = me.info.msg;
                    me.alertFormdataFailed();
                }
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
    generateVoucherno: function () {
        var me,form,loan_date;
        me = this;
        form = me.getFormdata();
        loan_date = me.formatDate(me.getVal(form,'loan_date','value'));
        switch (me.state) {
            case 'create':
                me.senddata = {
                    "hideparam": 'generatevouchernoloan',
                    "project_id": apps.project,
                    "pt_id": me.pt_id,
                    "param_date": loan_date,
                    "module": 'LOAN',
                    "prefix": me.prefix,
                    "flag": me.flaggeneratevoucherno,
                }
                me.urlrequest = me.urlcommon;
                me.AjaxRequest();
                break;
        }
    },
    setCalculateLoan: function () {
        var me, store_h, store_d, form, totalloan, totalpay, totalremain;
        me = this;
        form = me.getFormdata();
        totalloan = me.unMask(me.getVal(form, 'amount', 'value'));
        store_d = me.getGriddetail().getStore();
        store_d.filter('deleted', false);
        if (store_d.getCount() > 0) {
            totalpay = store_d.sum('amount');
        } else {
            totalpay = 0;
        }
 	
        totalremain = parseFloat(totalloan) - parseFloat(totalpay);	
        me.setVal(form, 'paid', parseFloat(totalpay));
        me.setVal(form, 'remaining', parseFloat(totalremain));
    },
    dataDestroydetailwithflag: function () {
        var me,form ,rows, ph, pd, confirmmsg, successmsg, failmsg,
                record, raw,amountdetail,paid,remaining,totalremaining,totalloan,recordcounttext, store, selectedRecord, msg, successcount
                , parameter, pesan, dataconfirm, ph, pd;

        me = this;
        ph = me.paramheader;
        pd = me.paramdetail;
        dataconfirm = me.fieldconfirmdetail;
        form = me.getFormdata();

        rows = me.getGriddetail().getSelectionModel().getSelection();
        if (rows.length < 1) {
            Ext.Msg.alert('Info', 'No record selected !');
            return;
        } else {
            recordcounttext = rows.length + ' record' + (rows.length > 1 ? 's' : '');
            store = me.getGriddetail().getStore();

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
                        me.getGriddetail().up('window').mask('Deleting data, please wait ...');
                    };
                    for (var i = 0; i < rows.length; i++) {
                        record = rows[i];
			raw = record.raw;
                        amountdetail = raw.amount;
                        record.set("deleted", true);
                        record.set("statedata", 'delete');
                        totalloan = me.unMask(me.getVal(form, 'amount', 'value'));
                        remaining = me.unMask(me.getVal(form, 'remaining', 'value'));
                        totalremaining = parseFloat(remaining ) + parseFloat(amountdetail);
                        paid = parseFloat(totalloan) - parseFloat(totalremaining);
                        me.setVal(form, 'paid', parseFloat(paid));
                        me.setVal(form, 'remaining', parseFloat(totalremaining));
                        store.clearFilter(true);
                        store.filter(me.idheaderfield, me.idheadervalue);
                        store.filter('deleted', false);
                        
                    }	   
                    store.clearFilter(true);
                    store.filter('deleted', false);
                }

            });

        }
    },	


});