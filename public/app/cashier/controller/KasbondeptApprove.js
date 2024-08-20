//default dataflow = Out
//realisasi menjadi kas atau bank ada di kasir ketika posting
Ext.define('Cashier.controller.KasbondeptApprove', {
    extend: 'Cashier.library.template.controller.Controllermodule',
    requires: [
        'Cashier.template.ComboBoxFields',
        'Cashier.library.template.combobox.Coadeptvouchercombobox',
        'Cashier.library.template.combobox.Currencycombobox',
        'Cashier.library.template.combobox.Departmentcombobox',
         'Cashier.library.template.combobox.Employeehodcombobox',
        'Cashier.library.template.combobox.Cashflowcombobox',
        'Cashier.library.BrowseCashier',
        'Cashier.library.template.combobox.Projectptforcashboncombobox',
        'Cashier.library.template.combobox.Statusnewcombobox',
        'Cashier.library.template.combobox.Voucherprefixcombobox',
        'Cashier.library.template.combobox.Employeehrdcombobox',
        'Cashier.library.template.combobox.Ptusercombobox',
        'Cashier.library.template.combobox.Voucherprefixbankcombobox',
        'Cashier.library.template.combobox.Kasbondeptapprovecombobox'
    ],
    alias: 'controller.KasbondeptApprove',
    views: [
        'kasbondeptapprove.Panel',
        'kasbondeptapprove.Grid',
        'kasbondeptapprove.Griddetail',
        'kasbondeptapprove.Gridsubdetail',
        'kasbondeptapprove.FormSearch',
        'kasbondeptapprove.FormData',
        'kasbondeptapprove.FormDataDetail',
        'kasbondeptapprove.FormDataSubDetail',
        'kasbondeptapprove.Gridattachmentdetail',
    ],
    stores: [
        'Kasbondeptapprove',
        'Kasbondeptapprovenew',
        'Kasbondeptapprovedetail',
        'Kasbondeptapprovesubdetail',
        'Ptbyuser',
        'Employee',
        'Department',
        'Coadeptcombo',
        'Employeehod',
        'Currency',
        'Cashflow',
        'Typecashbon',
        'Inout'
    ],
    models: [
        'Kasbondeptapprove',
        'Kasbondeptapprovenew',
        'Kasbondeptapprovedetail',
        'Kasbondeptapprovesubdetail',
    ],
    refs: [
        {ref: 'grid', selector: 'kasbondeptapprovegrid'},
        {ref: 'gridnew', selector: 'kasbondeptapprovegridnew'},
        {ref: 'griddetail', selector: 'kasbondeptapprovegriddetail'},
        {ref: 'gridsubdetail', selector: 'kasbondeptapprovegridsubdetail'},
        {ref: 'formsearch', selector: 'kasbondeptapproveformsearch'},
        {ref: 'formdata', selector: 'kasbondeptapproveformdata'},
        {ref: 'formdatadetail', selector: 'kasbondeptapprovedetailformdata'},
        {ref: 'formdatasubdetail', selector: 'kasbondeptapprovesubdetailformdata'},
    ],
    controllerName: 'kasbondeptapprove',
    fieldName: 'voucher_no',
    fieldconfirmdetail: 'description',
    fieldconfirmsubdetail: 'subcode',
    bindPrefixName: 'KasbondeptApprove',
    formWidth: 800,
    state: null,
    statedetail: null,
    statesubdetail: null,
    urlcommon: 'cashier/common/create',
    urldata: 'cashier/kasbondeptapprove/',
    urlrequest: 'cashier/kasbondeptapprove/create',
    urldetail: 'cashier/kasbondeptapprove/detail',
    urlsubdetail: 'cashier/kasbondeptapprove/subdetail',
    senddata: null,
    info: null,
    coa: null,
    messagedata: null,
    valueform: null,
    pt_id: 0,
    manager_id: 0,
    employee_id: 0,
    department_id: 0,
    prefixdept: null,
    flaggeneratevoucherno: 0,
    approveby_id: 0,
    dateNow: new Date(),
    idheaderfield: 'kasbondept_id',
    iddetailfield: 'kasbondeptdetail_id',
    idheadervalue: 0,
    iddetailvalue: 0,
    coa_id: 0,
    kelsub_id: 0,
    balancecoa: 0,
    validdetail: 0,
    addby:null,
    gridId:0,
    subgl: null,
    loadingapprove: new Ext.LoadMask(Ext.getBody(), {msg: "Please wait..."}),
    init: function (application) {
        var me = this;
        this.control({
            'kasbondeptapprovepanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender

            },
            'kasbondeptapprovepanel gridcolumn ': {
                headerclick: function (en) {
                    //console.log(en);
                    var ab = en.ownerCt.itemId;
                    if (ab === 'kasbondeptapprovegridnewId') {
                        if (me.gridId === 1) {
                            var store = Ext.data.StoreManager.lookup('Kasbondeptapprovenew');
                        } else {
                            var store = Ext.data.StoreManager.lookup('Kasbondeptapprove');
                        }
                        if (me.is_desc === 1) {
                            store.removeAll();
                            store.reload({
                                params: {
                                    "hideparam": 'search',
                                    "desc": me.is_desc,
                                    "project_id": apps.project,
                                    "start": 0,
                                    "limit": 25,
                                },
                                callback: function (records, operation, success) {
                                    me.is_desc = 0;
                                }
                            });
                        } else {
                            store.removeAll();
                            store.reload({
                                params: {
                                    "hideparam": 'search',
                                    "desc": me.is_desc,
                                    "project_id": apps.project,
                                    "start": 0,
                                    "limit": 25,
                                },
                                callback: function (records, operation, success) {
                                    me.is_desc = 1;
                                }
                            });
                        }




                    }

                    // console.log(en.ownerCt.itemId);
                }
            },
            'kasbondeptapprovepanel [name=panel]': {
                tabchange: function (tabPanel, tab) {
                    if (tab.xtype === 'kasbondeptapprovegridnew') {
                        var store = Ext.data.StoreManager.lookup('Kasbondeptapprovenew');
                        store.removeAll();
                        store.reload();
                        me.gridId = 1;
                    }
                    else {
                        me.gridId = 0;
                    }

                }

            },
            'kasbondeptapprovegrid,kasbondeptapprovegridnew': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                // itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange,
                select: this.gridSelected

            },
//            'kasbondeptapprovegridnew': {
//                afterrender: this.gridAfterRender,
//                itemdblclick: this.gridItemDblClick,
//                itemcontextmenu: function () {
//                    return allowSelection;
//                },
//                selectionchange: this.gridSelectionChange,
////                select: function () {
////                    var me, grid;
////                    me = this;
////                    grid = me.getGridnew();
////                    me.gridSelected(grid);
////                }
//                select: this.gridSelected
//            },
            'kasbondeptapprovegrid toolbar button[action=create]': {
                click: function () {
                    me.state = 'create';
                    this.formDataShow('create');
                }
            },
            'kasbondeptapprovegridnew toolbar button[action=create]': {
                click: function () {
                    me.state = 'create';
                    this.formDataShow('create');
                }
            },
            'kasbondeptapprovegrid toolbar button[action=update]': {
                click: function () {
                    me.state = 'create';
                    this.formDataShow('update');
                }
            },
            'kasbondeptapprovegridnew toolbar button[action=update]': {
                click: function () {
                    me.state = 'create';
                    this.formDataShow('update');
                }
            },
            'kasbondeptapprovegrid toolbar button[action=destroy]': {
                click: this.dataDestroy
            },
            'kasbondeptapprovegridnew toolbar button[action=destroy]': {
                click: this.dataDestroy
            },
            'kasbondeptapprovegrid toolbar button[action=print]': {
                click: this.dataPrint
            },
            'kasbondeptapprovegridnew toolbar button[action=print]': {
                click: this.dataPrint
            },
            'kasbondeptapprovegrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                // click: this.gridActionColumnClick
                click: function (view, cell, row, col, e) {
                    var me, grid;
                    me = this;
                    grid = me.getGrid();
                    me.gridActionColumnClick(view, cell, row, col, e, grid);
                }
            },
            'kasbondeptapprovegridnew actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                //click: this.gridActionColumnClick
                click: function (view, cell, row, col, e) {
                    var me, grid;
                    me = this;
                    grid = me.getGridnew();
                    me.gridActionColumnClick(view, cell, row, col, e, grid);
                }
            },
            'kasbondeptapproveformsearch': {
                afterrender: function () {
                    me.setStoreFormsearch();
                },
            },
            'kasbondeptapproveformsearch button[action=search]': {
                click: this.dataSearch
            },
            'kasbondeptapproveformsearch button[action=reset]': {
                click: this.dataReset
            },
            'kasbondeptapproveformdata': {
                afterrender: function () {
                    var me, form;
                    me = this;
                    form = me.getFormdata();
                    me.formDataAfterRender(form, 'formdata');
                },
                boxready: function () {
                    var me, form;
                    me = this;
                    form = me.getFormdata();
                    me.setFormdataready(form, 'formdata');
                },
                destroy: function () {
                    var me;
                    me = this;
                    me.setDefaultBeforeLoadForm();
                }
            },
            'kasbondeptapproveformdata [name=kasbondeptapprovetab] ': {
                'tabchange': function (p, eOpts) {
                    var me, pd, form, tabPanel, name, rowdetail;
                    me = this;
                    me.checkTabsubcoa();
                },
            },
            'kasbondeptapproveformdata [name=pt_id] ': {
                'select': function (g, record, item, index, e, eOpts) {
                    var me, rowdata, form;
                    me = this;
                    rowdata = record[0]['data'];
                    me.pt_id = rowdata.pt_id;
                    me.setVal(form, 'projectname', rowdata.projectname);
                    me.setVal(form, 'ptname', rowdata.ptname);
                },
                'change': function (that, newValue, oldValue, eOpts) {
                    var me, form, rowdata;
                    me = this;
                    form = me.getFormdata();
                    rowdata = form.down('[name=pt_id]').valueModels[0]['raw'];
                    me.pt_id = rowdata.pt_id;
                    me.setVal(form, 'projectname', rowdata.projectname);
                    me.setVal(form, 'ptname', rowdata.ptname);
                }
            },
            'kasbondeptapproveformdata [name=department_id] ': {
                'select': function (g, record, item, index, e, eOpts) {
                    var me, rowdata, form;
                    me = this;
                    form = me.getFormdata();
                    rowdata = record[0]['data'];
                    me.prefixdept = rowdata.code;
                    me.department_id = rowdata.department_id;
                    me.setVal(form, 'approveby_id', null);
                    me.setStoreApproveby(form);
                },
                'change': function (that, newValue, oldValue, eOpts) {
                    var me, form, rowdata;
                    me = this;
                    form = me.getFormdata();
                    if (form.down('[name=department_id]').valueModels[0] !== undefined) {
                        rowdata = form.down('[name=department_id]').valueModels[0]['raw'];
                        me.prefixdept = rowdata.code;
                    }
                    me.generateVoucherno(form);
                },
            },
            'kasbondeptapproveformdata [name=approveby_id] ': {
                'select': function (g, record, item, index, e, eOpts) {
                    var me, rowdata, form;
                    me = this;
                    form = me.getFormdata();
                    rowdata = record[0]['data'];
                    me.approveby_id = rowdata.employee_id;
                    me.setVal(form, 'approvename', rowdata.employee_name);
                },
                'change': function (that, newValue, oldValue, eOpts) {
                    var me, form, rowdata;
                    me = this;
                    form = me.getFormdata();
                    if (form.down('[name=approveby_id]').valueModels[0] !== undefined) {
                        rowdata = form.down('[name=approveby_id]').valueModels[0]['raw'];
                        me.approveby_id = rowdata.employee_id;
                        me.setVal(form, 'approvename', rowdata.employee_name);
                    }

                },
            },
            'kasbondeptapproveformdata button[action=save]': {
                click: this.dataSavecustome
            },
            'kasbondeptapproveformdata button[action=cancel]': {
                click: this.formDataClose
            },
            //====================================START DETAIL=============================================    

            'kasbondeptapprovegriddetail': {
                selectionchange: this.cellgridDetail,
                itemdblclick: this.griddetailitemdoubleclick,
            },
            'kasbondeptapprovegriddetail actioncolumn': {
                click: function (view, cell, row, col, e) {
                    me.gridActionColumndetailclick(view, cell, row, col, e);
                }
            },
            /* START  GRID AREA */
            'kasbondeptapprovegriddetail toolbar button[action=create]': {
                click: function () {
                    me.paramdetail.stateform = 'create';
                    me.GenerateFormdata(me.paramdetail);
                }
            },
            'kasbondeptapprovegriddetail toolbar button[action=update]': {
                click: function () {
                    me.paramdetail.stateform = 'update';
                    me.GenerateFormdata(me.paramdetail);
                }
            },
            'kasbondeptapprovegriddetail toolbar button[action=destroy]': {
                click: function () {
                    me.fieldName = 'remarks';
                    this.dataDestroydetailwithflag();
                }
            },
            /* END GRID AREA */

            /* START FORM AREA */
            'kasbondeptapprovedetailformdata': {
                afterrender: function () {
                    var me, form;
                    me = this;
                    form = me.getFormdatadetail();
                    me.formDataAfterRender(form, 'formdetail');
                },
            },
            'kasbondeptapprovedetailformdata [name=coa_id]': {
                'select': function (g, record, item, index, e, eOpts) {
                    var me, rowdata, form;
                    me = this;
                    form = me.getFormdatadetail();
                    rowdata = record[0]['data'];
                    me.coa = rowdata.coa;
                    me.coa_id = rowdata.coa_id;
                    me.paramdetail.rowdetailtmp = rowdata;
                    me.kelsub_id = rowdata.kelsub_id;
                    if (me.kelsub_id !== 0) {
                        me.setReadonly(form, 'amount', true);
                    } else {
                        me.setReadonly(form, 'amount', false);
                    }
                    form.down("[name=coa_id]").setRawValue(rowdata.coa);
                    me.setVal(form, 'coaname', rowdata.coaname);
                    me.setVal(form, 'kelsub_id', rowdata.kelsub_id);
                    me.setVal(form, 'kelsub', rowdata.kelsub);
                    me.setVal(form, 'kelsubdesc', rowdata.kelsubdesc);
                },
            },
            'kasbondeptapprovedetailformdata button[action=save]': {
                'click': function (me, e, eOpts) {
                    var me, form, grid;
                    me = this;
                    form = me.getFormdatadetail();
                    grid = me.getGriddetail();
                    me.dataSaveDetailstore(form, grid);
                },
            },
            /* START  GRID AREA */

            //====================================END DETAIL===============================================      


            //====================================START SUB DETAIL===============================================      
            /* START  GRID AREA */
            'kasbondeptapprovegridsubdetail': {
                afterrender: this.Gridsubafterrender,
                selectionchange: this.cellgridSubDetail,
                itemdblclick: this.gridsubdetailitemdoubleclick,
                select: this.gridSubDetailSelected,
            },
            'kasbondeptapprovegridsubdetail toolbar button[action=create]': {
                click: function () {
                    var me, form, pd, state, store, rowdata, counter, amount;
                    me = this;
                    me.paramsubdetail.stateform = 'create';
                    me.GenerateFormdata(me.paramsubdetail);
                }
            },
            'kasbondeptapprovegridsubdetail toolbar button[action=update]': {
                click: function () {
                    me.paramsubdetail.stateform = 'update';
                    me.GenerateFormdata(me.paramsubdetail);
                }
            },
            'kasbondeptapprovegridsubdetail toolbar button[action=destroy]': {
                click: function () {
                    this.dataDestroysubdetailwithflag();
                }
            },
            'kasbondeptapprovegridsubdetail actioncolumn': {
                click: function (view, cell, row, col, e) {
                    me.gridActionColumnsubdetailclick(view, cell, row, col, e);
                }
            },
            'kasbondeptapprovesubdetailformdata': {
                afterrender: this.formDataSubDetailAfterRender
            },
            'kasbondeptapprovesubdetailformdata [name=subgl_id] ': {
                'select': function (g, record, item, index, e, eOpts) {
                    var me, rowdata, form;
                    me = this;
                    form = me.getFormdatasubdetail();
                    rowdata = record[0]['data'];
                    form.down("[name=subcode]").setValue(rowdata.subcode);
                    form.down("[name=code1]").setValue(rowdata.code1);
                    form.down("[name=code2]").setValue(rowdata.code2);
                    form.down("[name=code3]").setValue(rowdata.code3);
                    form.down("[name=code4]").setValue(rowdata.code4);
                },
            },
            'kasbondeptapprovesubdetailformdata button[action=save]': {
                'click': function (me, e, eOpts) {
                    var me, checkbalance;
                    me = this;
                    me.dataSaveSubDetailstore();
                },
            },
            //====================================END SUB DETAIL===============================================      

        });
    },
    setDefaultBeforeLoadForm: function () {
        var me;
        me = this;
        me.pt_id = 0;
        me.manager_id = 0;
        me.employee_id = 0;
        me.department_id = 0;
        me.approveby_id = 0;
        me.kelsub_id = 0;
        me.state = null;
        me.statedetail = null;
        me.statesubdetail = null;
        me.senddata = null;
        me.prefixdept = null;
        me.coa_id = 0;
        me.coa = null;
        me.idheadervalue = 0;
        me.iddetailvalue = 0;
        me.balancecoa = 0;
        me.validdetail = 0;
        me.subgl = null;
        me.messagedata = null;
        me.valueform = null;
        //clean data detail
        me.paramdetail.iddetail = 0;
        me.paramdetail.stateform = null;
        me.paramdetail.formaction = null;
        me.paramdetail.formproperties = null;
        me.paramdetail.iddetail = 0;
        me.paramdetail.store = null;
        me.paramdetail.data = null;
        me.paramdetail.grid = null;
        me.paramdetail.row = null;
        me.paramdetail.form = null;
        me.paramdetail.checkdata = false;
        me.paramdetail.object = null;
        me.paramdetail.rowdata = null;
        me.paramdetail.action = null;
        me.paramdetail.rowdetailtmp = null;
        me.paramdetail.counter = 0;
        me.paramdetail.flagkelsub = 0;
        me.paramsubdetail.iddetail = 0;
        me.paramsubdetail.store = null;
        me.paramsubdetail.data = null;
        me.paramsubdetail.record = null;
        me.paramsubdetail.grid = null;
        me.paramsubdetail.row = null;
        me.paramsubdetail.object = null;
        me.paramsubdetail.rowdata = null;
        me.paramsubdetail.action = null;
        me.paramsubdetail.counter = 0;
        me.paramsubdetail.flagkelsub = 0;
        me.paramsubdetail.totalsubdetail = 0;
    },
    paramdetail: {
        //start formgeneate
        fromlocation: 'Cashier.view.kasbondeptapprove.FormDataDetail',
        formtitle: 'Form Detail',
        formicon: 'icon-form-add',
        formid: 'win-kasbondeptapprovedetailformdata',
        formlayout: 'fit',
        formshadow: 'frame',
        formmask: 'Loading...',
        formwidth: 500,
        formtimeout: 0,
        stateform: null,
        formaction: null,
        formproperties: null,
        formwindows: null,
        //end formgeneate
        //start properties form
        iddetail: 0,
        store: null,
        data: null,
        record: null,
        grid: null,
        row: null,
        form: null,
        checkdata: false,
        object: null,
        rowdata: null,
        action: null,
        counter: 0,
        flagkelsub: 0,
        rowdetailtmp: null,
        //start properties form
    },
    paramsubdetail: {
        //start formgeneate
        fromlocation: 'Cashier.view.kasbondeptapprove.FormDataSubDetail',
        formtitle: 'Form Sub Detail',
        formicon: 'icon-form-add',
        formid: 'win-kasbondeptapprovesubdetailformdata',
        formlayout: 'fit',
        formshadow: 'frame',
        formmask: 'Loading...',
        formwidth: 700,
        formtimeout: 0,
        stateform: null,
        formaction: null,
        formproperties: null,
        formwindows: null,
        //end formgeneate
        //start properties form
        iddetail: 0,
        store: null,
        data: null,
        record: null,
        grid: null,
        row: null,
        form: null,
        checkdata: false,
        object: null,
        rowdata: null,
        action: null,
        counter: 0,
        flagkelsub: 0,
        totalsubdetail: 0,
        //start properties form
    },
    dataSavecustome: function () {
        var me, state, form, formdata, addingRecord, vp, vps, x, store, storedesc, storedetail, storesubdetail,
                valuedata, idProperty, rec, paramdata, rowdata, resjsonheader, rowjsonheader, validheader, paramheader,
                idProperty, counterdesc, counterdetail, countersubdetail, msgheader, restotal, duedate, validation
                ;
        me = this;
        storedetail = Ext.data.StoreManager.lookup('Kasbondeptapprovedetail');
        counterdetail = storedetail.getCount();
        form = me.getFormdata();
        formdata = me.getFormdata().getForm();
        if (formdata.isValid()) {
            resetTimer();
            if (me.state == 'create') {
                me.flaggeneratevoucherno = '1';
                me.generateVoucherno(form);
            }

            me.unformatCurrencyFormdata(me, form);
            store = me.getGrid().getStore();
            valuedata = formdata.getValues();
            if (typeof (form.down("[name=made_by]").getValue()) == 'number') {
                valuedata['other_made_by'] = '';
                valuedata['made_by'] = me.getVal(form, 'made_by', 'value');
            } else {
                valuedata['other_made_by'] = me.getVal(form, 'made_by', 'value');
                valuedata['made_by'] = parseInt(0);
            }

            form.up('window').body.mask('Saving data, please wait ...');
            state = form.up('window').state.toLowerCase();
            switch (state) {
                case 'create':
                    store.add(valuedata);
                    addingRecord = true;
                    valuedata['hideparam'] = state;
                    me.valueform = valuedata;
                    break;
                case 'update':
                    idProperty = store.getProxy().getReader().getIdProperty();
                    rec = store.getById(parseInt(formdata.findField(idProperty).getValue(), 10));
                    rec.beginEdit();
                    rec.set(valuedata);
                    rec.endEdit();
                    valuedata['hideparam'] = state;
                    me.valueform = valuedata;
                    break;
                default:
                    return;
            }

            counterdetail = storedetail.getCount();
            Ext.Ajax.request({
                url: me.urldata + state,
                method: 'POST',
                params: {
                    data: Ext.encode(valuedata)
                },
                success: function (response) {
                    resjsonheader = Ext.JSON.decode(response.responseText);
                    rowjsonheader = resjsonheader.data;
                    validheader = resjsonheader.success;
                    paramheader = resjsonheader.parameter;
                    msgheader = resjsonheader.msg;
                    restotal = resjsonheader.total;
                    me.idheadervalue = rowjsonheader.idheader;
                    if (validheader == 'true') {
                        if (counterdetail > 0) {
                            me.Savedetail(me, state);
                        }
                        store.commitChanges();
                        me.messagedata = msgheader;
                        me.alertFormdataSuccess();
                    } else {
                        me.messagedata = msgheader;
                        me.alertFormdataFailed();
                    }
                },
                failure: function (response) {
                    me.messagedata = 'data error';
                    me.alertFormdataFailed();
                    me.getFormdata().up('window').close();
                }
            });
        }
    },
    Savedetail: function (that, state) {
        var me, storedetail, counterdetail, iddetail, statedatadetail, datadetail, actiondetail,
                resjsondetail, rowjsondetail, validdetail, msgdetail, parameterdetail, kelsub_id,
                storesubdetail, countersubdetail;
        me = that;
        storedetail = Ext.data.StoreManager.lookup('Kasbondeptapprovedetail');
        storedetail.clearFilter(true);
        counterdetail = storedetail.getCount();
        storesubdetail = Ext.data.StoreManager.lookup('Kasbondeptapprovesubdetail');
        countersubdetail = storesubdetail.getCount();
        var i = 0;
        if (counterdetail > 0) {
            storedetail.each(function (record, index) {
                i = index + 1;
                iddetail = record.get("kasbondeptdetail_id");
                statedatadetail = record.get("statedata");
                if (state == 'create' && statedatadetail == 'create') {
                    actiondetail = 'create';
                } else if (state == 'create' && statedatadetail == 'update') {
                    actiondetail = 'create';
                } else if (state == 'update' && statedatadetail == 'create') {
                    actiondetail = 'create';
                } else if (state == 'update' && statedatadetail == 'update') {
                    actiondetail = 'update';
                }

                datadetail = record['data'];
                datadetail[me.idheaderfield] = me.idheadervalue;
                datadetail['parametersql'] = actiondetail;
                datadetail['hideparam'] = 'detail' + actiondetail;
                if (me.urldetail !== me.urldetail + statedatadetail) {
                    var executedata = 0;
                    if (statedatadetail == 'create' || statedatadetail == 'update') {
                        executedata = 1;
                    }
                    if (statedatadetail == 'delete' && iddetail !== 0) {
                        executedata = 1;
                        actiondetail = 'delete';
                    }

                    if (executedata == 1) {
                        Ext.Ajax.request({
                            url: me.urldetail + actiondetail,
                            method: 'POST',
                            params: {
                                data: Ext.encode(datadetail)
                            },
                            success: function (response) {
                                var coa_id, indexdata;
                                resjsondetail = Ext.JSON.decode(response.responseText);
                                rowjsondetail = resjsondetail.data;
                                validdetail = resjsondetail.success;
                                parameterdetail = resjsondetail.parameter;
                                msgdetail = resjsondetail.msg;
                                me.iddetailvalue = rowjsondetail.iddetail;
                                if (parameterdetail == 'detailcreate') {
                                    kelsub_id = rowjsondetail[6][0].kelsub_id;
                                    coa_id = rowjsondetail[6][0].coa_id;
                                    indexdata = rowjsondetail[6][0].indexdata;
                                } else if (parameterdetail == 'detailupdate') {
                                    kelsub_id = rowjsondetail[4][0].kelsub_id;
                                    coa_id = rowjsondetail[4][0].coa_id;
                                    indexdata = rowjsondetail[4][0].indexdata;
                                }



                                if (kelsub_id !== 0 && countersubdetail > 0) {


                                    var iddetailsub, statesubdetail, storedata,
                                            actionsubdetail, datasubdetail;
                                    storesubdetail.clearFilter(true);
                                    storesubdetail.filterBy(function (rec, id) {
                                        storedata = rec['data'];
                                        if (state == 'create' && storedata.statedata == 'create') {
                                            iddetail = indexdata;
                                        } else if (state == 'create' && storedata.statedata == 'update') {
                                            iddetail = indexdata;
                                        } else if (state == 'update' && storedata.statedata == 'update') {
                                            iddetail = me.iddetailvalue;
                                        } else if (state == 'update' && storedata.statedata == 'create') {
                                            iddetail = me.iddetailvalue;
                                        } else {
                                            iddetail = me.iddetailvalue;
                                        }
                                        if (storedata.coa_id == coa_id && storedata.kasbondeptdetail_id == iddetail) {
                                            return true;
                                        } else {
                                            return false;
                                        }
                                    });
                                    storesubdetail.each(function (record, index) {
                                        iddetailsub = record.get("kasbondeptsubdetail_id");
                                        statesubdetail = record.get("statedata");
                                        if (state == 'create' && statesubdetail == 'create') {
                                            actionsubdetail = 'create';
                                        } else if (state == 'create' && statesubdetail == 'update') {
                                            actionsubdetail = 'create';
                                        } else if (state == 'update' && statesubdetail == 'create') {
                                            actionsubdetail = 'create';
                                        } else if (state == 'update' && statesubdetail == 'update') {
                                            actionsubdetail = 'update';
                                        }

                                        datasubdetail = record['data'];
                                        datasubdetail[me.idheaderfield] = me.idheadervalue;
                                        datasubdetail[me.iddetailfield] = me.iddetailvalue;
                                        datasubdetail['parametersql'] = statesubdetail;
                                        datasubdetail['hideparam'] = 'subdetail' + statesubdetail;
                                        if (me.urlsubdetail !== me.urlsubdetail + statesubdetail) {
                                            executedata = 0;
                                            if (statesubdetail == 'create' || statesubdetail == 'update') {
                                                executedata = 1;
                                            }
                                            if (statesubdetail == 'delete' && iddetailsub !== 0) {
                                                executedata = 1;
                                                actionsubdetail = 'delete';
                                            }

                                            if (executedata == 1) {
                                                Ext.Ajax.request({
                                                    url: me.urlsubdetail + actionsubdetail,
                                                    method: 'POST',
                                                    params: {
                                                        data: Ext.encode(datasubdetail)
                                                    },
                                                    success: function (response) {
                                                        var resjsonsubdetail, rowjsonsubdetail, validsubdetail, parametersubdetail, msgsubdetail;
                                                        resjsonsubdetail = Ext.JSON.decode(response.responseText);
                                                        rowjsonsubdetail = resjsonsubdetail.data;
                                                        validsubdetail = resjsonsubdetail.success;
                                                        parametersubdetail = resjsonsubdetail.parameter;
                                                        msgsubdetail = resjsonsubdetail.msg;
                                                    },
                                                    failure: function (response) {
                                                        me.messagedata = 'data error';
                                                        me.alertFormdataFailed();
                                                        me.getFormdata().up('window').close();
                                                    }
                                                });
                                            }

                                        }
                                    });
                                }
                            },
                            failure: function (response) {
                                me.messagedata = 'data error';
                                me.alertFormdataFailed();
                                me.getFormdata().up('window').close();
                            }
                        });
                    }
                }
            });
        }
    },
    setDataAftersave: function () {
        var me, store, counter;
        me = this;
        store = me.getGrid().getStore();
        counter = store.getCount();
        if (counter) {
            var index = counter - 1;
            if (index == 0) {
                me.getGrid().getSelectionModel().select(index, true);
            } else {
                me.getGrid().getSelectionModel().deselectAll();
                me.getGrid().getSelectionModel().select(index, true);
            }
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
                // me.sendRequestmail();

            }
        });
    },
    alertFormdataFailed: function () {
        var me, form, store;
        me = this;
        me.getGrid().getStore().reload();
        form = me.getFormdata();
        form.up('window').body.unmask();
        me.clearallStore();
        Ext.Msg.show({
            title: 'Failure',
            msg: 'Error: ' + me.messagedata,
            icon: Ext.Msg.ERROR,
            buttons: Ext.Msg.OK
        });
    },
    gridSelectionChange: function () {
        var me, grid, record, row;
        me = this;
        grid = me.getGrid();
        record = grid.getSelectionModel().getSelection();
    },
//    gridSelected: function (grid) {
//        var me, grid, store, counter, record, row;
//        me = this;
//        //grid = me.getGrid();
//        store = grid.getStore();
//        counter = store.getCount();
//        if (counter > 0) {
//            record = grid.getSelectionModel().getSelection()[0];
//            row = record['data'];
//            if (row.status != '1') {
//                grid.down('#btnEdit').setDisabled(true);
//                grid.down('#btnDelete').setDisabled(true);
//            } else {
//                grid.down('#btnEdit').setDisabled(false);
//                grid.down('#btnDelete').setDisabled(false);
//            }
//            //grid.down('#btnPrintvoucher').setDisabled(false);
//        }
//    },
    gridSelected: function (grid) {
        var me, grid, store, counter, record, row;
        me = this;
        if (me.gridId === 1) {
            grid = me.getGridnew();
        } else {
            grid = me.getGrid();
        }
        store = grid.getStore();
        counter = store.getCount();
        if (counter > 0) {
            record = grid.getSelectionModel().getSelection()[0];
            row = record['data'];
            me.addby = row.addby;
            if (row.status !== '1') {
                grid.down('#btnEdit').setDisabled(true);
                grid.down('#btnDelete').setDisabled(true);
            } else {
                grid.down('#btnEdit').setDisabled(false);
                grid.down('#btnDelete').setDisabled(false);
            }
            // grid.down('#btnPrintvoucher').setDisabled(false);
//            if(row.approve_user_id > 0) {
//            grid.down('#btnPrintvoucher').setDisabled(false);
//            }
//            else {
//               grid.down('#btnPrintvoucher').setDisabled(true); 
//            }
        }
    },
    Gridsubafterrender: function () {
        var me;
        me = this;
    },
    cellgridSubDetail: function () {
        var me, p, form = '';
        me = this;
        form = me.getFormdata();
        p = me.paramsubdetail;
        me.gridSelectionChangesubdetail();
        p.grid = me.getGridsubdetail();
        p.object = p.grid.getSelectionModel().getSelection();
        p.data = '';
        for (var i = 0; i <= p.object.length - 1; i++) {
            p.data = p.object[i];
        }
        if (p.data !== '') {
            // pd.rowdata = pd.data['data'];
            p.rowdata = p.data;
        }
    },
    gridsubdetailitemdoubleclick: function () {
        var me, p;
        me = this;
        p = me.paramsubdetail;
        p.action = 'update';
        me.actiondataSubDetail();
    },
    gridActionColumnsubdetailclick: function (view, cell, row, col, e) {
        var me, p, grid, action = '';
        me = this;
        p = me.paramsubdetail;
        grid = me.getGridsubdetail();
        grid.getSelectionModel().select(row);
        p.action = e.getTarget().className.match(/\bact-(\w+)\b/)[1];
        p.rowdata = grid.getStore().getAt(row);
        me.actiondataSubDetail();
    },
    actiondataSubDetail: function () {
        var me, p, returndata;
        me = this;
        p = me.paramsubdetail;
        me.cellgridSubDetail();
        switch (p.action) {
            case 'update':
                me.paramsubdetail.stateform = 'update';
                me.GenerateFormdata(me.paramsubdetail);
                break;
            case 'destroy':
                me.dataDestroysubdetailwithflag();
                break;
            default:
                returndata = "No action selected";
        }
    },
    gridSubDetailSelected: function () {
        var me, grid, counter, psd, store, record, row, formheader, formdetail, formsubdetail;
        me = this;
        psd = me.paramsubdetail;
        grid = me.getGridsubdetail();
        store = grid.getStore();
        counter = store.getCount();
        formheader = me.getFormdata();
        formdetail = me.getFormdatadetail();
        formsubdetail = me.getFormdatasubdetail();
        if (counter > 0) {
            psd.rowdata = grid.getSelectionModel().getSelection()[0];
            psd.row = psd.rowdata['data'];
        }
    },
    dataDestroysubdetailwithflag: function () {
        var me, rows, confirmmsg, successmsg, failmsg,
                record, recordcounttext, store, selectedRecord, msg, successcount
                , parameter, pesan, dataconfirm;
        me = this;
        dataconfirm = me.fieldconfirmsubdetail;
        rows = me.getGridsubdetail().getSelectionModel().getSelection();
        if (rows.length < 1) {
            Ext.Msg.alert('Info', 'No record selected !');
            return;
        } else {
            recordcounttext = rows.length + ' record' + (rows.length > 1 ? 's' : '');
            store = Ext.data.StoreManager.lookup('Kasbondeptapprovesubdetail');
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
                        me.getGridsubdetail().up('window').mask('Deleting data, please wait ...');
                    };
                    for (var i = 0; i < rows.length; i++) {
                        record = rows[i];
                        record.set("deleted", true);
                        record.set("statedata", 'delete');
                        store.clearFilter(true);
                        store.filter(me.iddetailfield, me.iddetailvalue);
                        store.filter('deleted', false);
                    }
                    me.setSumsubdetail();
                }

            });
        }
    },
    indexSubDetail: function () {
        var me, form, store, counter;
        me = this;
        store = me.getGridsubdetail().getStore();
        store.clearFilter(true);
        store.filter('deleted', false);
        counter = store.getCount();
        store.clearFilter();
        return counter + 1;
    },
    formDataSubDetailAfterRender: function () {
        var me, pd, p, rowdata, action, state, counter, sort, form, desc;
        me = this;
        pd = me.paramdetail;
        p = me.paramsubdetail;
        rowdata = pd.rowdata['data'];
        me.kelsub_id = rowdata.kelsub_id;
        me.balancecoa = rowdata.amount;
        form = me.getFormdatasubdetail();
        state = me.getFormdata().up('window').state.toLowerCase();
        switch (p.stateform) {
            case 'create':
                counter = me.indexSubDetail();
                me.setVal(form, 'kasbondept_id', me.idheadervalue);
                me.setVal(form, 'kasbondeptdetail_id', me.iddetailvalue);
                me.setVal(form, 'coa_id', rowdata.coa_id);
                me.setVal(form, 'kelsub_id', rowdata.kelsub_id);
                me.setVal(form, 'kelsub', rowdata.kelsub);
                me.setVal(form, 'indexdata', counter);
                break;
            case 'update':
                me.iddetailvalue = rowdata.kasbondeptdetail_id;
                form.loadRecord(p.rowdata);
                break;
            default:
        }
        me.setStoreSubcode();
        me.formatCurrencyFormdata(me, form);
    },
    Checksubdatadetail: function () {
        var me, status, returndata, p, grid, store, filter = '';
        me = this;
        p = me.paramsubdetail;
        p.checkdata = false;
        grid = me.getGridsubdetail();
        store = grid.getStore();
        store.each(function (record)
        {
            if (record.data['kasbondept_id'] == p.row.kasbondept_id &&
                    record.data['kasbondeptdetail_id'] == p.row.kasbondeptdetail_id &&
                    record.data['coa_id'] == p.row.coa_id &&
                    record.data['kelsub_id'] == p.row.kelsub_id &&
                    record.data['subgl_id'] == p.row.subgl_id
                    )
            {
                p.checkdata = true;
            }
        });
    },
    dataSaveSubDetailstore: function () {
        var me, p, pd, form, grid, store, record, row, indexdata, getindex = '';
        me = this;
        p = me.paramsubdetail;
        pd = me.paramdetail;
        form = me.getFormdatasubdetail();
        if (form.getForm().isValid()) {
            grid = me.getGridsubdetail();
            store = grid.getStore();
            row = form.getForm().getValues();
            p.row = row;
            me.Checksubdatadetail();
            switch (p.stateform) {
                case 'create':
                    if (p.checkdata == false) {
                        row['statedata'] = 'create';
                        row['project_id'] = apps.project;
                        row['pt_id'] = me.pt_id;
                        row['deleted'] = false;
                        row[me.iddetailfield] = me.iddetailvalue;
                        store.add(row);
                        store.commitChanges();
                    } else {
                        me.buildWarningAlert("Sorry data already exist in this transaction");
                    }
                    break;
                case 'update':
                    getindex = store.indexOf(p.rowdata);
                    record = store.getAt(getindex);
                    record.beginEdit();
                    row['statedata'] = 'update';
                    row['deleted'] = false;
                    row[me.iddetailfield] = me.iddetailvalue;
                    record.set(row);
                    record.endEdit();
                    store.commitChanges();
                    break;
            }
            me.getSubdata(store, pd.rowdata['data']);
            store.filter('deleted', false);
            p.totalsubdetail = store.sum('amount');
            me.setSumsubdetail();
            me.setDataSubDetailAftersave();
            form.up('window').close();
        }
    },
    setDataSubDetailAftersave: function () {
        var me, store, counter;
        me = this;
        store = me.getGridsubdetail().getStore();
        counter = store.getCount();
        if (counter) {
            var index = counter - 1;
            if (index == 0) {
                me.getGridsubdetail().getSelectionModel().select(index, true);
            } else {
                me.getGridsubdetail().getSelectionModel().deselectAll();
                me.getGridsubdetail().getSelectionModel().select(index, true);
            }
        }
    },
    setStoreSubcode: function () {
        var me, store, form;
        me = this;
        form = me.getFormdata();
        store = me.getStore("Subgl");
        store.load({
            params: {
                "hideparam": 'getsubglbykelsub',
                "project_id": apps.project,
                "pt_id": me.getVal(form, 'pt_id', 'value'),
                "kelsub_id": me.kelsub_id
            },
            callback: function (records, operation, success) {

            }
        });
    },
    getSubdata: function (storesub, datadetail) {
        var me, datasub, count;
        me = this;
        storesub.clearFilter(true);
        count = storesub.getCount();
        if (count !== 0) {
            storesub.filterBy(function (rec, id) {
                datasub = rec['data'];
                if (datasub.coa_id == datadetail.coa_id && datasub.kasbondeptdetail_id == me.iddetailvalue) {
                    return true;
                } else {
                    return false;
                }
            });
        }
    },
    setSumsubdetail: function () {
        var me, pd, p, store, store_h, storedetail, form, amount, totaldetail,
                balance, totalsubdetail, msgdata, status, gridsubdetail,
                getindexdetail, recorddetail, rowdetail, state, flagdetail;
        me = this;
        pd = me.paramdetail;
        gridsubdetail = me.getGridsubdetail();
        p = me.paramsubdetail;
        form = me.getFormdatasubdetail();
        amount = amount = me.balancecoa;
        store = gridsubdetail.getStore();
        storedetail = me.getGriddetail().getStore();
        me.getSubdata(store, pd.rowdata['data']);
        if (store.getCount() > 0) {
            store.filter('deleted', false);
            totalsubdetail = store.sum('amount');
        } else {
            totalsubdetail = p.totalsubdetail;
        }

        me.Mask(gridsubdetail.down('[name=balancecoa]').setValue(totalsubdetail));
        amount = me.unMask(gridsubdetail.down('[name=balancecoa]').getValue());
        balance = parseFloat(amount) - parseFloat(totalsubdetail);
        me.Mask(gridsubdetail.down('[name=balancecoa]').setValue(balance));
        rowdetail = {};
        getindexdetail = storedetail.indexOf(pd.rowdata);
        recorddetail = storedetail.getAt(getindexdetail);
        recorddetail.beginEdit();
        state = me.getFormdata().up('window').state.toLowerCase();
        if (state == 'update' && pd.rowdata['data'].statedata == 'update') {
            flagdetail = 'update';
        } else if (state == 'update' && pd.rowdata['data'].statedata == 'view') {
            flagdetail = 'update';
        } else if (state == 'update' && pd.rowdata['data'].statedata == 'create') {
            flagdetail = 'create';
        } else if (state == 'create' && pd.rowdata['data'].statedata == 'create') {
            flagdetail = 'create';
        }

        rowdetail['statedata'] = flagdetail;
        rowdetail['amount'] = totalsubdetail;
        recorddetail.set(rowdetail);
        recorddetail.endEdit();
        storedetail.commitChanges();
        store.clearFilter();
        me.setSumdetail();
        //console.log(me.iddetailfield);
        //console.log(me.iddetailvalue);

        me.getSubdata(store, pd.rowdata['data']);
        store.clearFilter(true);
        store.filter('deleted', false);
        store.filter(me.iddetailfield, me.iddetailvalue);
    },
    AjaxRequest: function (form) {
        var me;
        me = this;
        if (form != '') {
            Ext.Ajax.request({
                url: me.urlrequest,
                timeout: 45000000,
                method: 'POST',
                params: {
                    data: Ext.encode(me.senddata)
                },
                success: function (response) {
                    me.info = Ext.JSON.decode(response.responseText);
                    me.setSuccessEvent(form);
                },
                failure: function (response) {
                    form.up('window').close();
                }
            });
        }
    },
    setSuccessEvent: function (form) {
        var me, value, data, form, voucher_date, duedate, state;
        me = this;
        if (form != '') {
            data = me.info.data;
            switch (me.info.parameter) {
                case 'getemployee':
                    me.pt_id = data.pt_id;
                    me.employee_id = data.employee_id;
                    me.manager_id = data.manager_id;
                    me.department_id = data.department_id;
                    break;
                case 'generatecasbonrequest':
                    form.down("[name=voucher_no]").setValue(data);
                    break;
                case 'approve':
                    me.loadingapprove.hide();
                    // grid.getStore().reload();
                    break;
                case 'unapprove':
                    me.loadingapprove.hide();
                    me.getGridnew().getStore().reload();
                    //grid.getStore().reload();
                    break;
            }
        }

    },
    indexCreateData: function (grid) {
        var me, form, store, counter;
        me = this;
        if (grid != '') {
            store = grid.getStore();
            counter = store.getCount();
            return counter + 1;
        } else {
            return 1;
        }
    },
    setStatus: function () {
        var me, form, status;
        me = this;
        form = me.getFormdata();
        status = form.down("[name=status]").getValue();
        if (status == '1') {
            form.down("[name=lblstatus]").setText("OPEN", true);
        } else {
            if (status == '2') {
                form.down("[name=lblstatus]").setText("APPROVE", true);
            } else if (status == '3') {
                form.down("[name=lblstatus]").setText("POSTING", true);
            }
            me.getFormdata().getForm().getFields().each(function (field) {
                field.setReadOnly(true);
            });
            me.getFormdata().down('#btnSave').setDisabled(true);
            me.getFormdata().down('#kasbondeptapprovetab').setDisabled(true);
        }
    },
    formDataAfterRender: function (form, flagform) {
        var me, record, row, state, description, formheader, grid, store, counter, griddetail;
        if (form != '') {
            var me = this;
            state = form.up('window').state.toLowerCase();
            if (flagform == 'formdata') {
                me.fdar().init();
                me.loadComboBoxStore(form);
                switch (state) {
                    case 'create':
                        me.getDefaultEmployee(form);
                        Ext.StoreManager.lookup('Kasbondeptapprovedetail').removeAll();
                        Ext.StoreManager.lookup('Kasbondeptapprovesubdetail').removeAll();
                        me.fdar().create();
                        form.down("[name=status]").setValue('1');
                        break;
                    case 'update':
                        me.fdar().update();
                        me.setReadonly(form, 'pt_id', true);
                        me.setReadonly(form, 'department_id', true);
                        //me.setReadonly(form, 'approveby_id', true);
                        me.setReadonly(form, 'voucher_date', true);
                        grid = me.getGrid();
                        store = grid.getStore();
                        record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));
                        counter = store.getCount();
                        if (counter > 0) {
                            row = record['data'];
                            if (parseInt(row.made_by) < 1) {
                                me.setVal(form, 'made_by', row.other_made_by);
                            }
                            me.in_out = row.dataflow;
                            //me.setValCombo(form,'vendor_note',0,row.vendor_note);
                        }
                        break;
                    case 'read':
                        if (me.gridId == 1) {
                            me.fdarReadOnly().read();
                            grid = me.getGridnew(); //grid yang sudah approve
                        } else {
                            me.fdar().read();
                            grid = me.getGrid();
                            me.getFormdata().down('#kasbondeptapprovetab').setDisabled(true);

    
                        }
                        store = grid.getStore();
                        record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));
                        counter = store.getCount();
                        if (counter > 0) {
                            row = record['data'];
                            if (parseInt(row.made_by) < 1) {
                                me.setVal(form, 'made_by', row.other_made_by);
                            }
                            //row = record['data'];
                            me.in_out = row.dataflow;
                        }
                        break;
                }
                me.setStatus();
            } else if (flagform == 'formdetail') {
                griddetail = me.getGriddetail();
                formheader = me.getFormdata();
                me.setStoreCoaDept(formheader);
                description = me.getVal(formheader, 'description', 'value');
                switch (state) {
                    case 'create':
                        counter = me.indexCreateData(griddetail);
                        me.paramdetail.iddetail = 0;
                        me.iddetailvalue = counter;
                        me.setVal(form, "indexdata", counter);
                        me.setVal(form, 'dataflow', 'I');
                        me.setVal(form, 'description', description);
                        break;
                    case 'update':
                        form.loadRecord(me.paramdetail.rowdata);
                        me.paramdetail.iddetail = me.paramdetail.rowdata['data'].kasbondeptdetail_id;
                        me.iddetailvalue = me.paramdetail.rowdata['data'].kasbondeptdetail_id;
                        me.coa_id = me.paramdetail.rowdata['data'].coa_id;
                        me.coa = me.paramdetail.rowdata['data'].coa;
                        me.kelsub_id = me.paramdetail.rowdata['data'].kelsub_id;
                        if (me.kelsub_id !== 0) {
                            me.setReadonly(form, 'amount', true);
                        } else {
                            me.setReadonly(form, 'amount', false);
                        }
                        me.setVal(form, 'dataflow', 'I');
//                        if (me.in_out == 'I') {
//                            form.down("[name=dataflow]").setValue('O');
//                        } else {
//                            form.down("[name=dataflow]").setValue('I');
//                        }
                        break;
                }

            }


        }
    },
    setFormdataready: function (form, flagform) {
        var me, store, state, form, griddetail, gridsubdetail, storedetail,
                record, grid;
        me = this;
        if (form != '') {
            state = form.up('window').state.toLowerCase();
            if (flagform == 'formdata') {
                switch (state) {
                    case 'create':
                        me.idheadervalue = 0;
                        griddetail = me.getGriddetail();
                        storedetail = griddetail.getStore();
                        if (storedetail.getCount() > 0) {
                            storedetail.removeAll();
                        }
                        me.setLabel(me, 'lblstatus', 'OPEN', true);
                        me.setValue(me, 'status', '1');
                        me.setVal(form, 'voucher_date', me.dateNow);
                        me.setStorePtuser(form);
                        me.setStoreDeptuser(form);
                        me.setStoreApproveby(form);
                        me.generateVoucherno(form);
                        break;
                    case 'update':
                        var gridheader = me.getGrid();
                        var storeheader = gridheader.getStore();
                        var recordheader = storeheader.getAt(storeheader.indexOf(gridheader.getSelectionModel().getSelection()[0]));
                        var counterheader = storeheader.getCount();
                        if (counterheader > 0) {
                            var rowheader = recordheader['data'];
                        }

                        me.idheadervalue = me.getValue(me, 'kasbondept_id', 'value');
                        storedetail = me.getGriddetail().getStore();
                        if (storedetail.getCount() > 0) {
                            storedetail.removeAll();
                        }
                        me.getDatadetail();
                        me.setSumdetail();
                        break;
                    case 'read':
                        me.idheadervalue = me.getValue(me, 'kasbondept_id', 'value');
                        storedetail = me.getGriddetail().getStore();
                        if (storedetail.getCount() > 0) {
                            storedetail.removeAll();
                        }
                        me.getDatadetail();
                        me.setSumdetail();
                        break;
                }
            }
        }

    },
    getDatadetail: function () {
        var me, pd, counter, form, rowdata, lengthkelsub, store, grid, rawjson = '';
        me = this;
        pd = me.paramdetail;
        form = me.getFormdata();
        pd.grid = me.getGriddetail();
        pd.store = pd.grid.getStore();
        pd.store.load({
            params: {
                "hideparam": 'default',
                "kasbondept_id": me.getValue(me, 'kasbondept_id', 'value'),
                "start": 0,
                "limit": 1000,
            },
            callback: function (records, operation, success) {
                counter = pd.store.getCount();
                rawjson = pd.store.proxy.getReader().jsonData;
                if (counter > 0) {
                    rowdata = records[0]['data'];
                    pd.grid.getSelectionModel().select(0, true);
                    lengthkelsub = parseFloat(rowdata.kelsub.length);
                    if (lengthkelsub > 0) {
                        form.down('[name=gridtabkasbondeptapprovesubdetail]').setDisabled(false);
                    } else {
                        form.down('[name=gridtabkasbondeptapprovesubdetail]').setDisabled(true);
                    }
                    pd.totaldetail = rawjson.totalamount;
                    me.setVal(form, 'amount', me.Mask(rawjson.totalamount));
                    me.setVal(form, 'totaldetail', me.Mask(rawjson.totalamount));
                }
            }
        });
    },
    gridActionColumndetailclick: function (view, cell, row, col, e) {
        var me, pd, grid, action = '';
        me = this;
        pd = me.paramdetail;
        grid = me.getGriddetail();
        grid.getSelectionModel().select(row);
        pd.action = e.getTarget().className.match(/\bact-(\w+)\b/)[1];
        pd.rowdata = grid.getStore().getAt(row);
        me.actiondataDetail();
    },
    checkTabsubcoa: function () {
        var me, pd, form, tabPanel, name, rowdetail;
        me = this;
        pd = me.paramdetail;
        form = me.getFormdata();
        rowdetail = pd.rowdata;
        tabPanel = form.down("[name=kasbondeptapprovetab]").getActiveTab();
        name = tabPanel.name;
        if (name == 'gridtabkasbondeptapprovesubdetail') {
            if (rowdetail !== null) {
                me.Tabsubcoa(rowdetail);
            } else {
                form.down('[name=gridtabkasbondeptapprovesubdetail]').setDisabled(true);
                me.buildWarningAlert("Please select item on grid detail coa...!");
            }
        }
    },
    Tabsubcoa: function (rowdetail) {
        var me, storedetail, countdetail, pd, state, form,
                gridsubdetail, storesub, countersub, datasub, datadetail;
        me = this;
        datadetail = rowdetail['data'];
        pd = me.paramdetail;
        form = me.getFormdata();
        state = form.up('window').state.toLowerCase();
        gridsubdetail = me.getGridsubdetail();
        storesub = gridsubdetail.getStore();
        countersub = storesub.getCount();
        gridsubdetail.down('[name=coa]').setValue(datadetail.coa);
        gridsubdetail.down('[name=coaname]').setValue(datadetail.coaname);
        gridsubdetail.down('[name=balancecoa]').setValue(datadetail.amount);
        if (countersub > 0) {
            if (state !== 'create' && datadetail.statedata !== 'create') {
                me.iddetailvalue = datadetail.kasbondeptdetail_id;
                me.getDatasubdetail();
            } else {
                me.iddetailvalue = datadetail.indexdata;
                me.getSubdata(storesub, datadetail);
            }
        }
    },
    cellgridDetail: function () {
        var me, pd, form, statehead, lengthkelsub = '';
        me = this;
        form = me.getFormdata();
        statehead = form.up('window').state.toLowerCase();
        pd = me.paramdetail;
        me.gridSelectionChangedetail();
        pd.grid = me.getGriddetail();
        pd.object = pd.grid.getSelectionModel().getSelection();
        pd.data = '';
        for (var i = 0; i <= pd.object.length - 1; i++) {
            pd.data = pd.object[i];
        }

        if (pd.data !== '') {
            pd.rowdata = pd.data;
            pd.row = pd.rowdata['data'];
            if (pd.row.kelsub_id == 0) {
                form.down('[name=gridtabkasbondeptapprovesubdetail]').setDisabled(true);
            } else {
                form.down('[name=gridtabkasbondeptapprovesubdetail]').setDisabled(false);
                if (pd.row.statedata !== 'create' && statehead !== 'create') {
                    me.iddetailvalue = pd.row.kasbondeptdetail_id;
                    me.getDatasubdetail();
                } else {
                    if (statehead == 'create') {
                        me.iddetailvalue = pd.row.indexdata;
                    } else {
                        me.iddetailvalue = pd.row.kasbondeptdetail_id;
                    }
                }
            }
        }
    },
    getDatasubdetail: function () {
        var me, pd, p, counter, form, rowdata = '';
        me = this;
        pd = me.paramdetail;
        p = me.paramsubdetail;
        rowdata = pd.rowdata['data'];
        form = me.getFormdata();
        p.grid = me.getGridsubdetail();
        p.store = p.grid.getStore();
        p.store.load({
            params: {
                "hideparam": 'default',
                "kasbankdept_id": rowdata.kasbankdept_id,
                "kasbondeptdetail_id": rowdata.kasbondeptdetail_id,
                "start": 0,
                "limit": 100,
            },
            callback: function (records, operation, success) {
                counter = p.store.getCount();
                p.counter = counter;
            }
        });
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
    Checkdatadetail: function (grid) {
        var me, status, returndata, pd, grid, store, filter = '';
        me = this;
        pd = me.paramdetail;
        pd.checkdata = false;
        store = grid.getStore();
        store.each(function (record)
        {
            if (record.data['kasbondept_id'] == pd.row.kasbondept_id &&
                    record.data['coa_id'] == pd.row.coa_id &&
                    record.data['indexdata'] == pd.row.indexdata
                    )
            {
                pd.checkdata = true;
            }
        });
    },
    dataSaveDetailstore: function (form, grid) {
        var me, pd, form, grid, store, record, row, indexdata, state, getindex = '';
        me = this;
        pd = me.paramdetail;
        if (form != '' && grid != '') {
            if (form.getForm().isValid()) {
                store = grid.getStore();
                row = form.getForm().getValues();
                row[me.idheaderfield] = me.idheadervalue;
                pd.row = row;
                me.Checkdatadetail(grid);
                state = form.up('window').state.toLowerCase();
                switch (state) {
                    case 'create':
                        if (pd.checkdata == false) {
                            row['statedata'] = 'create';
                            row['project_id'] = apps.project;
                            row['pt_id'] = me.pt_id;
                            row['coa_id'] = me.coa_id;
                            row['coa'] = me.coa;
                            row['kelsub_id'] = me.kelsub_id;
                            row[me.idheaderfield] = me.idheadervalue;
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
                        row['statedata'] = 'update';
                        row['pt_id'] = me.pt_id;
                        row['coa_id'] = me.coa_id;
                        row['coa'] = me.coa;
                        row['kelsub_id'] = me.kelsub_id;
                        row[me.idheaderfield] = me.idheadervalue;
                        record.set(row);
                        record.endEdit();
                        store.commitChanges();
                        break;
                }
                store.filter('deleted', false);
                pd.totaldetail = store.sum('amount');
                me.setSumdetail();
                me.setDatadetailAftersave(grid);
                form.up('window').close();
            }

        }

    },
    setSumdetail: function () {
        var me, pd, store, formheader, amount, totaldetail,
                balance, msgdata, status, voucher_no, form, grid;
        me = this;
        pd = me.paramdetail;
        form = me.getFormdatadetail();
        grid = me.getGriddetail();
        formheader = me.getFormdata();
        store = grid.getStore();
        if (store.getCount() > 0) {
            store.filter('deleted', false);
            totaldetail = store.sum('amount');
        } else {
            totaldetail = 0;
        }

        me.Mask(me.setVal(formheader, 'amount', totaldetail));
        amount = me.unMask(me.getVal(formheader, 'amount', 'value'));
        balance = parseFloat(amount) - parseFloat(totaldetail);
        me.setVal(formheader, 'totaldetail', parseFloat(totaldetail));
        me.setVal(formheader, 'balance', parseFloat(balance));
        store.clearFilter(true);
        store.filter('kasbondept_id', me.idheadervalue);
        store.filter('deleted', false);
        me.formatCurrencyFormdata(me, formheader);
    },
    setDatadetailAftersave: function () {
        var me, grid, store, counter;
        me = this;
        grid = me.getGriddetail();
        store = grid.getStore();
        counter = store.getCount();
        if (counter) {
            var index = counter - 1;
            if (index == 0) {
                grid.getSelectionModel().select(index, true);
            } else {
                grid.getSelectionModel().deselectAll();
                grid.getSelectionModel().select(index, true);
            }

        }
    },
    getDefaultEmployee: function (form) {
        var me;
        me = this;
        me.senddata = {
            "hideparam": 'getemployee',
        }
        me.urlrequest = 'cashier/kasbondeptapprove/read';
        me.AjaxRequest(form);
    },
    setStoreApproveby: function (form) {
        var me, store, form;
        if (form != '') {
            me = this;
            store = me.getStore("Employee");
            store.reload({
                params: {
                    "hideparam": 'getemployee',
                },
                callback: function (records, operation, success) {
                    store.clearFilter(true);
                    store.filter("department_id", me.department_id);
                    store.each(function (record)
                    {
                        if (record.data['employee_id'] == me.manager_id) {
                            me.setVal(form, 'approveby_id', record.data['employee_id']);
                        }
                    });
                }
            });
        }

    },
    setStorePtuser: function (form) {
        var me, store, form;
        me = this;
        if (form != '') {
            store = me.getStore("Ptbyuser");
            store.reload({
                params: {
                    "hideparam": 'getptbyuser',
                    "project_id": apps.project,
                    "start": 0,
                    "limit": 1000,
                },
                callback: function (records, operation, success) {
                    store.each(function (record)
                    {
                        if (record.data['project_id'] == apps.project && record.data['pt_id'] == apps.pt) {

                            me.setVal(form, 'pt_id', record.data['pt_id']);
                        }
                    });
                }
            });
        }
    },
    setStoreDeptuser: function (form) {
        var me, store, form;
        me = this;
        if (form != '') {
            store = me.getStore("Department");
            store.reload({
                params: {
                    "hideparam": 'getdepartment',
                },
                callback: function (records, operation, success) {
                    store.each(function (record)
                    {
                        if (record.data['department_id'] == me.department_id) {
                            me.setVal(form, 'department_id', record.data['department_id']);
                            me.setVal(form, 'prefixdept', record.data['prefixdept']);
                            me.prefixdept = record.data['code'];
                        }
                    });
                }
            });
        }

    },
    setStoreCoaDept: function (form) {
        var me, store, form;
        me = this;
        if (form != '') {
            store = me.getStore("Coadeptcombo");
            store.load({
                params: {
                    "hideparam": 'getcoabyprojectptdept',
                    "project_id": apps.project,
                    "pt_id": me.getVal(form, 'pt_id', 'value'),
                    "department_id": me.getVal(form, 'department_id', 'value')
                },
                callback: function (records, operation, success) {

                }
            });
        }

    },
    generateVoucherno: function (form) {
        var me, form, state, voucher_date;
        me = this;
        if (form != '') {
            state = form.up('window').state.toLowerCase();
            voucher_date = me.formatDate(me.getVal(form, 'voucher_date', 'value'));
            switch (state) {
                case 'create':
                    me.senddata = {
                        "hideparam": 'generatecasbonrequest',
                        "project_id": apps.project,
                        "param_date": voucher_date,
                        "pt_id": (me.pt_id == 0) ? apps.pt : me.pt_id,
                        "module": 'CASHBONREQUEST',
                        "prefix": me.prefixdept,
                        "flag": me.flaggeneratevoucherno,
                    }
                    me.urlrequest = me.urlcommon;
                    me.AjaxRequest(form);
                    break;
            }
        }

    },
    dataDestroydetailwithflag: function () {
        var me, rows, ph, pd, confirmmsg, successmsg, failmsg,
                record, recordcounttext, store, selectedRecord, msg, successcount
                , parameter, pesan, dataconfirm, ph, pd;
        me = this;
        ph = me.paramheader;
        pd = me.paramdetail;
        dataconfirm = me.fieldconfirmdetail;
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
                        record.set("deleted", true);
                        record.set("statedata", 'delete');
                        store.clearFilter(true);
                        store.filter(me.idheaderfield, me.idheadervalue);
                        store.filter('deleted', false);
                    }
                    me.setSumdetail();
                }

            });
        }
    },
    gridActionColumnClick: function (view, cell, row, col, e, grid) {
        var me, record, m, grid, store;
        me = this;
        //grid = me.getGrid();
        store = grid.getStore();
        record = store.getAt(row);
        m = e.getTarget().className.match(/\bact-(\w+)\b/);
        grid.getSelectionModel().select(row);
        row = record['data'];
        if (m) {
            switch (m[1]) {
                case me.bindPrefixName + 'Update':
                    me.formDataShow('update');
                    break;
                case me.bindPrefixName + 'Delete':
                    me.dataDestroy();
                    break;
                case me.bindPrefixName + 'Approve':
                    me.Approvedata(row);
                    break;
                case me.bindPrefixName + 'Unapprove':
                    me.Unapprovedata(row);
                    break;
                 case me.bindPrefixName + 'Decline':
                    me.Declinedata(row);
                    break;
            }
        }
    },
    sendRequestmail: function () {
        var me, data;
        me = this;
        data = me.valueform;
        //console.log(data);
        data['hideparam'] = 'approve';
        me.senddata = data;
        me.urlrequest = me.urldata + 'update';
        me.AjaxRequest('email');
    },
    sendRequestmail2: function () {
        var me, data;
        me = this;
        data = me.valueform;
        //console.log(data);
        data['hideparam'] = 'unapprove';
        me.senddata = data;
        me.urlrequest = me.urldata + 'update';
        me.AjaxRequest('email');
    },
    Approvedata: function (row) {
        var me, grid, store, info;
        me = this;
        row['hideparam'] = 'approve';
        grid = me.getGrid();
        store = grid.getStore();
        Ext.Msg.show({
            title: 'Confirm Your Approve',
            msg: 'Are sure want to approve ?',
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
                    grid.up('window').getEl().mask('Process approve,please wait..');
                    Ext.Ajax.request({
                        url: me.urldata + 'approve',
                        timeout: 45000000,
                        method: 'POST',
                        params: {
                            data: Ext.encode(row)
                        },
                        success: function (response) {
                            info = Ext.JSON.decode(response.responseText);
                            me.valueform = row;
                          //  me.sendRequestmail();
                            Ext.Msg.alert('Info','Process Approve Success!');
                           // grid.up('window').getEl().mask('Process approve,success..');
                            grid.up('window').getEl().unmask();
                            store.reload();
                        },
                        failure: function (response) {
                            grid.up('window').getEl().mask('Process approve,failed..');
                            grid.up('window').getEl().unmask();
                            store.reload();
                        }
                    });
                }
            },
            icon: Ext.Msg.QUESTION
        });
    },
    Unapprovedata: function (row) {
        var me, grid, store, info;
        me = this;
        row['hideparam'] = 'unapprove';
        grid = me.getGridnew();
        store = grid.getStore();
       
       Ext.Msg.show({
            title: 'Confirm Your Unapprove',
            msg: 'Are sure want to unapprove..?',
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

                    grid.up('window').getEl().mask('Process Unapprove,please wait..');
                    Ext.Ajax.request({
                        url: me.urldata + 'update',
                        timeout: 45000000,
                        method: 'POST',
                        params: {
                            data: Ext.encode(row)
                        },
                        success: function (response) {
                            info = Ext.JSON.decode(response.responseText);
                            me.valueform = row;
                            //me.sendRequestmail2();
                            Ext.Msg.alert('Info','Process Unapprove Success!');
                            grid.up('window').getEl().unmask();
                            store.reload();
                        },
                        failure: function (response) {
                              Ext.Msg.alert('Info','Process Unapprove Failed!');
                            grid.up('window').getEl().unmask();
                            store.reload();
                        }
                    });
                }
            },
            icon: Ext.Msg.QUESTION
        }); 
    },
     Declinedata: function (row) {
        var me, grid, store, info;
        me = this;
        row['hideparam'] = 'decline';
        grid = me.getGrid();
        store = grid.getStore();
         Ext.Msg.prompt('Reason for Decline', 'Please insert your reason:', function(boolean, text) {
                 if(boolean == 'cancel'){
                    return false;
                 }else{
                    if(text == ''){

                           Ext.Msg.alert('Error', 'Reason must be filled!');
                            return 0;

                    }else{
                       grid.up('window').getEl().mask('Process Unapprove,please wait..');
                       row['approval_notes'] = text;
                            Ext.Ajax.request({
                                url: me.urldata + 'update',
                                timeout: 45000000,
                                method: 'POST',
                                params: {
                                    data: Ext.encode(row)
                                },
                                success: function (response) {
                                    info = Ext.JSON.decode(response.responseText);
                                    me.valueform = row;
                                  //  me.sendRequestmail2();
                                    Ext.Msg.alert('Info','Process Decline Success!');
                                    //grid.up('window').getEl().mask('Process Decline Success!');
                                    grid.up('window').getEl().unmask();
                                    store.reload();
                                },
                                failure: function (response) {
                                    Ext.Msg.alert('Info','Process Decline Failed!');
                                   //grid.up('window').getEl().mask('Process Decline Success');
                                    grid.up('window').getEl().unmask();
                                    store.reload();
                                }
                            });
                            



                    }
                  
                 }

                });
       /* Ext.Msg.show({
            title: 'Confirm Your Unapprove',
            msg: 'Are sure want to unapprove..?',
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

                    grid.up('window').getEl().mask('Process Unapprove,please wait..');
                    Ext.Ajax.request({
                        url: me.urldata + 'unapprove',
                        timeout: 45000000,
                        method: 'POST',
                        params: {
                            data: Ext.encode(row)
                        },
                        success: function (response) {
                            info = Ext.JSON.decode(response.responseText);
                            me.valueform = row;
                            me.sendRequestmail2();
                            grid.up('window').getEl().mask('Process Unapprove,success..');
                            grid.up('window').getEl().unmask();
                            store.reload();
                        },
                        failure: function (response) {
                            grid.up('window').getEl().mask('Process Unapprove,failed..');
                            grid.up('window').getEl().unmask();
                            store.reload();
                        }
                    });
                }
            },
            icon: Ext.Msg.QUESTION
        }); */
    },
    fdarReadOnly: function () {
        var me = this;
        var x = {
            read: function () {
                var grid = me.getGridnew();
                var store = grid.getStore();
                var record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));
                me.getFormdata().loadRecord(record);
                me.getFormdata().getForm().getFields().each(function (field) {
                    field.setReadOnly(true);
                });
                me.getFormdata().down('#btnSave').setDisabled(true);
            }
        };
        return x;
    },
    dataSearch: function () {
        resetTimer();
        var me = this;
        var grid;
        var form = me.getFormsearch().getForm();
        if (me.gridId === 1) {
            grid = me.getGridnew();
        } else {
            grid = me.getGrid();
        }
        var store = grid.getStore();
        me.getFormsearch().down("[name=hideparam]").setValue('search');
        var fields = me.getFormsearch().getValues();
        if (me.gridId === 1) {
            fields['hideparam'] = 'default';
        }
        for (var x in fields)
        {
            store.getProxy().setExtraParam(x, fields[x]);
        }
        me.loadPage(store);
    },
});