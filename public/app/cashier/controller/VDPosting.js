Ext.define('Cashier.controller.VDPosting', {
    extend: 'Cashier.library.template.controller.Controllermodule',
    alias: 'controller.VDPosting',
    requires: [
        'Cashier.template.ComboBoxFields',
        'Cashier.library.template.combobox.Ptusercombobox',
        'Cashier.library.template.combobox.Deptprefixcombobox',
        'Cashier.library.template.combobox.Departmentcombobox',
        'Cashier.library.template.combobox.Coadeptvouchercombobox',
        'Cashier.library.template.combobox.Employeehrdcombobox',
        'Cashier.library.template.combobox.Vendorcombobox',
        'Cashier.library.template.combobox.Subglcombobox',
        'Cashier.library.template.combobox.Statusvouchercombobox',
        'Cashier.library.template.combobox.Statuscombobox',
        'Cashier.library.template.combobox.Prefixcombobox',
        'Cashier.library.template.combobox.Tipevendorvouchercombobox',
        'Cashier.library.template.combobox.Currencycombobox',
    ],
    views: [
        'vdposting.Panel',
        'vdposting.Grid',
        'vdposting.Griddetail',
        'vdposting.GridApprove',
        'vdposting.Griddesc',
        'vdposting.Gridsubdetail',
        'vdposting.FormSearch',
        'vdposting.FormData',
        'vdposting.FormContentDesc',
        'vdposting.FormDataDesc',
        'vdposting.FormDataDetail',
        'vdposting.FormDataSubDetail',
        'vdposting.FormLookupvouhcer',
    ],
    stores: [
        'VDPosting',
        'VDPostingnew',
        'VDPostingdetail',
        'VDPostingdesc',
        'VDPostingsubdetail',
        'Ptbyuser',
        'Deptprefixcombo',
        'Coadeptcombo',
        'Department',
        'Employee',
        'Vendorcombo',
        'Subgl',
        'Statusvoucher',
        'Statuscombo',
        'Prefixcombo',
        'Tipevendorvoucher',
        'Currency',
    ],
    models: [
        'VDPosting',
        'VDPostingnew',
        'VDPostingdetail',
        'VDPostingdesc',
        'VDPostingsubdetail',
        'Currency',
    ],
    refs: [
        {ref: 'grid', selector: 'vdpostinggrid'},
        {ref: 'gridapprove', selector: 'vdpostingapprovegridnew'},
        {ref: 'griddetail', selector: 'vdpostinggriddetail'},
        {ref: 'griddesc', selector: 'vdpostinggriddesc'},
        {ref: 'gridsubdetail', selector: 'vdpostinggridsubdetail'},
        {ref: 'formsearch', selector: 'vdpostingformsearch'},
        {ref: 'formdata', selector: 'vdpostingformdata'},
        {ref: 'formcontentdesc', selector: 'vdpostingdescformcontent'},
        {ref: 'formdatadesc', selector: 'vdpostingdescformdata'},
        {ref: 'formdatadetail', selector: 'vdpostingdetailformdata'},
        {ref: 'formdatasubdetail', selector: 'vdpostingsubdetailformdata'},
        {ref: 'formlookupvoucher', selector: 'vdpostingformlookupvoucher'},
        {ref: 'gridlookupvoucher', selector: 'vdpostinggridlookupselected'},
    ],
    controllerName: 'vdposting',
    formWidth: 840,
    state: null,
    fieldName: 'voucher_no',
    fieldconfirmdetail: 'coaname',
    fieldconfirmdesc: 'description',
    fieldconfirmsubdetail: 'subcode',
    bindPrefixName: 'VDPosting',
    urldata: 'cashier/vdposting/',
    urldesc: 'cashier/vdposting/desc',
    urldetail: 'cashier/vdposting/detail',
    urlsubdetail: 'cashier/vdposting/subdetail',
    urlcommon: 'cashier/common/create',
    gridId: 0,
    is_desc: 1,
    is_desc2: 1,
    urlrequest: null, senddata: null, info: null, messagedata: null, dateNow: new Date(),
    flaggeneratevoucherno: 0, valueform: null,
    flaggeneratevouchernoinlookup: 0,
    idheaderfield: 'voucher_id', iddetailfield: 'voucherdetail_id', idheadervalue: 0, iddetailvalue: 0,
    manager_id: 0, employee_id: 0, pt_id: 0, department_id: 0, prefixdept: null, subgl: null, in_out: 'O',
    kelsub_id: 0, balancecoa: 0, validdetail: 0, addby: 0, cashier_voucher_no: null, flagsaveposting: null,
    flagposting: 2, kasbank_id: 0, report: null, win: null, winId: null,
    loadingposting: new Ext.LoadMask(Ext.getBody(), {msg: "Please wait..."}),
    temp_prefix: null,
    init: function (application) {
        var me = this;

        this.control({
            'vdpostingpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: function (panel) {
                    this.panelAfterRender();
                    panel.up('window').maximize();
                    panel.up('window').setTitle("Posting - Voucher Department");
                },
            },
            'vdpostingapprovegridnew gridcolumn ': {

                headerclick: function (en) {
                    //console.log(en);
                    var ab = en.ownerCt.itemId;
                    console.log(ab);
                    if (ab === 'vdpostingapprovegridnewId') {
                        if (me.gridId === 1) {
                            var store = Ext.data.StoreManager.lookup('VDPostingnew');
                        } else {
                            var store = Ext.data.StoreManager.lookup('VDPosting');
                        }
                        if (me.is_desc === 1) {
                            store.removeAll();
                            store.reload({
                                params: {
                                    "hideparam": 'default',
                                    "statusrequest": 3,
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
                                    "hideparam": 'default',
                                    "statusrequest": 3,
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
            'vdpostingpanel [name=panel]': {
                tabchange: function (tabPanel, tab) {
                    if (tab.xtype === 'vdpostingapprovegridnew') {
                        var store = Ext.data.StoreManager.lookup('VDPostingnew');
                        store.removeAll();
                        store.reload();
                        me.gridId = 1;
                    } else {
                        me.gridId = 0;
                    }

                }

            },
            'vdpostinggrid,vdpostingapprovegridnew': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange,
                select: this.gridSelected,
            },
            'vdpostinggrid,vdpostingapprovegridnew toolbar button[action=create]': {
                click: function () {
                    me.state = 'create';
                    this.formDataShow('create');
                }
            },
            'vdpostinggrid,vdpostingapprovegridnew toolbar button[action=update]': {
                click: function () {
                    me.state = 'create';
                    this.formDataShow('update');
                }
            },
            'vdpostinggrid,vdpostingapprovegridnew toolbar button[action=destroy]': {
                click: this.dataDestroy
            },
            'vdpostinggrid,vdpostingapprovegridnew toolbar button[action=print]': {
                click: this.dataPrint
            },
            'vdpostinggrid,vdpostingapprovegridnew toolbar button[action=print]': {
                click: this.dataPrint
            },
            'vdpostinggrid,vdpostingapprovegridnew actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                click: this.gridActionColumnClick
            },
            'vdpostingformsearch': {
                afterrender: function () {
                    var me = this;
                    me.setStoreFormsearch();
                },
            },
            'vdpostingformsearch button[action=search]': {
                click: this.dataSearch
            },
            'vdpostingformsearch button[action=reset]': {
                click: this.dataReset
            },
            'vdpostingformdata': {
                afterrender: this.formDataAfterRender,
                beforedestroy: this.formDataBeforeDestroy,
                boxready: function () {
                    me.setFormdataready();
                }
            },
            'vdpostingformdata [name=pt_id] ': {
                'select': function (g, record, item, index, e, eOpts) {
                    var me, rowdata, form;
                    me = this;
                    form = me.getFormdata();
                    rowdata = record[0]['data'];
                    me.pt_id = rowdata.pt_id;
                    me.setVal(form, 'project_id', rowdata.project_id);
                },
                'change': function (that, newValue, oldValue, eOpts) {
                    var me, form, rowdata;
                    me = this;
                    form = me.getFormdata();
                    rowdata = form.down('[name=pt_id]').valueModels[0]['raw'];
                    me.pt_id = rowdata.pt_id;
                    me.setVal(form, 'project_id', rowdata.project_id);
                }
            },
            'vdpostingformdata [name=department_id] ': {
                'select': function (g, record, item, index, e, eOpts) {
                    var me, rowdata, form;
                    me = this;
                    rowdata = record[0]['data'];
                    me.prefixdept = rowdata.code;
                    me.department_id = rowdata.department_id;
                    me.setValue(me, 'approveby_id', null);
                    me.setStoreApproveby();
                },
                'change': function (that, newValue, oldValue, eOpts) {
                    var me, form, rowdata;
                    me = this;
                    form = me.getFormdata();
                    if (form.down('[name=department_id]').valueModels[0] !== undefined) {
                        rowdata = form.down('[name=department_id]').valueModels[0]['raw'];
                        me.prefixdept = rowdata.code;
                    }
                    //me.generateVoucherno();
                },
            },
            'vdpostingformdata [name=approveby_id] ': {
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
                        //me.setVal(form, 'approvename', rowdata.employee_name);
                    }

                },
            },
            'vdpostingformdata [name=type_vendor] ': {
                'select': function (g, record, item, index, e, eOpts) {
                    var me, rowdata, form;
                    me = this;
                    form = me.getFormdata();
                    me.setStoreVendorbytypedata(form);
                },
                'change': function (that, newValue, oldValue, eOpts) {
                    var me, form;
                    me = this;
                    form = me.getFormdata();
                    me.setStoreVendorbytypedata(form);
                },
            },
            'vdpostingformdata #radio1_b123 ': {
                'change': function (that, newValue, oldValue, eOpts) {
                    var me, form;
                    me = this;
                    form = me.getFormdata();
                    if (newValue == true) {
                        me.in_out = 'I';
                    } else {
                        me.in_out = 'O';
                    }
                    me.setStorePrefix(form);
                },
            },
            'vdpostingformdata #radio2_b123 ': {
                'change': function (that, newValue, oldValue, eOpts) {
                    var me, form;
                    me = this;
                    form = me.getFormdata();
                    if (newValue == true) {
                        me.in_out = 'O';
                    } else {
                        me.in_out = 'I';
                    }
                    me.setStorePrefix(form);
                },
            },
            'vdpostingformdata [name=kasbank] ': {
                'select': function (g, record, item, index, e, eOpts) {
                    var me, rowdata, form, countlength;
                    me = this;
                    form = me.getFormdata();
                    rowdata = record[0]['data'];
                    me.setValCombo(form, 'voucherprefix_id', 0, null);
                    me.setVal(form, 'coa', '');
                    me.setVal(form, 'cashier_voucher_no', '');
                    me.setStorePrefix(form);
                },
                'change': function (that, newValue, oldValue, eOpts) {
                    var me, form, rowdata;
                    me = this;
                    form = me.getFormdata();
                    if (form.down('[name=kasbank]').valueModels[0] !== undefined) {
                        rowdata = form.down('[name=kasbank]').valueModels[0]['raw'];
                        me.setStorePrefix(form);
                        //me.setVal(form, 'approvename', rowdata.employee_name);
                    }
                },
            },
            'vdpostingformdata [name=voucherprefix_id] ': {
                'select': function (g, record, item, index, e, eOpts) {
                    var me, rowdata, form, countlength;
                    me = this;
                    form = me.getFormdata();
                    rowdata = record[0]['data'];
                    me.prefix = rowdata.prefix;
                    me.temp_prefix = rowdata.temp_prefix;
                    form.down("[name=coa]").setValue(rowdata.coa);
                    form.down("[name=coa_id]").setValue(rowdata.coa_id);
                    me.setVal(form, 'fixed_coa', rowdata.fixed_coa);
                    me.setVal(form, 'prefix_id', rowdata.prefix_id);
                    me.generateCashierVoucherno();
                },
                'change': function (that, newValue, oldValue, eOpts) {
                    var me, form, rowdata;
                    me = this;
                    form = me.getFormdata();
                    if (form.down('[name=voucherprefix_id]').valueModels[0] !== undefined) {
                        rowdata = form.down('[name=voucherprefix_id]').valueModels[0]['raw'];
                        me.prefix = rowdata.prefix;
                        form.down("[name=coa]").setValue(rowdata.coa);
                        form.down("[name=coa_id]").setValue(rowdata.coa_id);
                        me.setVal(form, 'fixed_coa', rowdata.fixed_coa);
                        me.setVal(form, 'prefix_id', rowdata.prefix_id);
                        //me.setVal(form, 'approvename', rowdata.employee_name);
                    }

                },
            },
            'vdpostingformdata [name=voucherrequesttab] ': {
                'tabchange': function (p, eOpts) {
                    var me, pd, form, tabPanel, name, rowdetail;
                    me = this;
                    me.checkTabsubcoa();
                },
            },
            'vdpostingformdata button[action=detaildesc]': {
                click: function () {
                    var me, form, state;
                    me = this;
                    form = me.getFormdata();
                    state = form.up('window').state.toLowerCase();
                    me.paramcontentdesc.stateform = state;
                    me.GenerateFormdata(me.paramcontentdesc);
                },
            },
            'vdpostingformdata button[action=save]': {
                click: function () {
                    var me, form, amount, totaldetail;
                    me = this;
                    form = me.getFormdata();
                    amount = me.unMask(me.getVal(form, 'amount', "value"));
                    totaldetail = me.unMask(me.getVal(form, 'totaldetail', "value"));
                    if (amount > 0 || totaldetail > 0) {
                        me.dataSavecustome();
                    } else {
                        me.buildWarningAlert("Amount or Total Detail must be greater than 0 ...!");
                    }
                }

            },
            'vdpostingformdata button[action=posting]': {
                click: function () {
                    var me, form, amount, totaldetail;
                    me = this;
                    form = me.getFormdata();
                    amount = me.unMask(me.getVal(form, 'amount', "value"));
                    totaldetail = me.unMask(me.getVal(form, 'totaldetail', "value"));
                    if (amount > 0 || totaldetail > 0) {
                        me.dataPosting();
                    } else {
                        me.buildWarningAlert("Amount or Total Detail must be greater than 0 ...!");
                    }
                }
            },
            'vdpostingformdata button[action=test]': {
                click: this.BtnTest
            },
            'vdpostingformdata button[action=cancel]': {
                click: function () {
                    var me = this;
                    this.formDataClose();
                }
            },
            //====================================START DETAIL=============================================    

            /* START  GRID AREA */
            'vdpostinggriddetail': {
                selectionchange: this.cellgridDetail,
                afterrender: this.griddetailAfterRender,
                itemdblclick: this.griddetailitemdoubleclick,
                //select: this.gridDetailSelected,
            },
            'vdpostinggriddetail toolbar button[action=create]': {
                click: function () {
                    var me, form, store, amount;
                    me = this;
                    me.paramdetail.stateform = 'create';
                    me.GenerateFormdata(me.paramdetail);
                }
            },
            'vdpostinggriddetail toolbar button[action=update]': {
                click: function () {
                    me.paramdetail.stateform = 'update';
                    me.GenerateFormdata(me.paramdetail);
                }
            },
            'vdpostinggriddetail toolbar button[action=destroy]': {
                click: function () {
                    me.fieldName = 'description';
                    this.dataDestroydetailwithflag();
                }
            },
            'vdpostinggriddetail actioncolumn': {
                click: function (view, cell, row, col, e) {
                    me.gridActionColumndetailclick(view, cell, row, col, e);
                }
            },
            /* START  GRID AREA */


            /* START FORM AREA */
            'vdpostingdetailformdata': {
                afterrender: this.formDataDetailAfterRender
            },
            'vdpostingdetailformdata [name=coa_id]': {
                'select': function (g, record, item, index, e, eOpts) {
                    var me, rowdata, pd, form;
                    me = this;
                    pd = me.paramdetail;
                    form = me.getFormdatadetail();
                    rowdata = record[0]['data'];
                    me.coa = rowdata.coa;
                    pd.rowdetailtmp = rowdata;

                    me.kelsub_id = rowdata.kelsub_id;
                    if (me.kelsub_id !== 0) {
                        me.setReadonly(form, 'amount', true);
                    } else {
                        me.setReadonly(form, 'amount', false);
                    }
                    form.down("[name=coaname]").setValue(rowdata.coaname);
                    form.down("[name=kelsub_id]").setValue(rowdata.kelsub_id);
                    form.down("[name=kelsub]").setValue(rowdata.kelsub);
                    form.down("[name=kelsubdesc]").setValue(rowdata.kelsubdesc);
                },
            },
            'vdpostingdetailformdata button[action=save]': {
                'click': function (me, e, eOpts) {
                    var me, checkbalance;
                    me = this;
                    me.dataSaveDetailstore();
                },
            },
            /* END FORM AREA */

            //====================================END DETAIL===============================================      


            //====================================START DESC===============================================      
            'vdpostingdescformcontent': {
                afterrender: function () {
                    var me;
                    me = this;
                    me.FormcontentdescAfterrender();
                },
            },
            'vdpostinggriddesc': {
                afterrender: this.griddescAfterRender,
                selectionchange: this.cellgridDesc,
                itemdblclick: this.griddescitemdoubleclick,
            },
            'vdpostinggriddesc toolbar button[action=create]': {
                click: function () {
                    var me;
                    me = this;
                    me.paramdesc.stateform = 'create';
                    me.GenerateFormdata(me.paramdesc);
                }
            },
            'vdpostinggriddesc toolbar button[action=update]': {
                click: function () {
                    me.paramdesc.stateform = 'update';
                    me.GenerateFormdata(me.paramdesc);
                }
            },
            'vdpostinggriddesc toolbar button[action=destroy]': {
                click: function () {
                    me.fieldconfirmdesc = 'description';
                    this.dataDestroydescwithflag();
                }
            },
            'vdpostinggriddesc actioncolumn': {
                click: function (view, cell, row, col, e) {
                    me.gridActionColumndescclick(view, cell, row, col, e);
                }
            },
            'vdpostingdescformdata': {
                afterrender: function () {
                    this.FormDataDescAfterrender();
                },
            },
            'vdpostingdescformdata button[action=save]': {
                'click': function (me, e, eOpts) {
                    var me;
                    me = this;
                    me.dataSaveDescstore();
                },
            },
            'vdpostingdescformcontent button[action=save]': {
                click: function () {
                    var me, store, counter;
                    me = this;
                    me.getFormcontentdesc().up('window').close();
                }
            },
            'vdpostingdescformcontent button[action=cancel]': {
                click: function () {
                    var me, store, counter;
                    me = this;
                    store = me.getGriddesc().getStore();
                    counter = store.getCount();
                    if (counter > 0) {
                        store.removeAll();
                    }
                    me.getFormcontentdesc().up('window').close();
                }
            },
            //====================================END DESC===============================================      



            //====================================START SUB DETAIL===============================================      
            /* START  GRID AREA */
            'vdpostinggridsubdetail': {
                afterrender: this.gridsubdetailAfterRender,
                selectionchange: this.cellgridSubDetail,
                itemdblclick: this.gridsubdetailitemdoubleclick,
                select: this.gridSubDetailSelected,
            },
            'vdpostinggridsubdetail toolbar button[action=create]': {
                click: function () {
                    var me, form, pd, state, store, rowdata, counter, amount;
                    me = this;
                    pd = me.paramdetail;
                    rowdata = pd.rowdata['data'];
                    me.paramsubdetail.stateform = 'create';
                    me.GenerateFormdata(me.paramsubdetail);

                }
            },
            'vdpostinggridsubdetail toolbar button[action=update]': {
                click: function () {
                    me.paramsubdetail.stateform = 'update';
                    me.GenerateFormdata(me.paramsubdetail);
                }
            },
            'vdpostinggridsubdetail toolbar button[action=destroy]': {
                click: function () {
                    this.dataDestroysubdetailwithflag();
                }
            },
            'vdpostinggridsubdetail actioncolumn': {
                click: function (view, cell, row, col, e) {
                    me.gridActionColumnsubdetailclick(view, cell, row, col, e);
                }
            },
            'vdpostingsubdetailformdata': {
                afterrender: this.formDataSubDetailAfterRender
            },
            'vdpostingsubdetailformdata [name=subgl_id] ': {
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
            'vdpostingsubdetailformdata button[action=save]': {
                'click': function (me, e, eOpts) {
                    var me, checkbalance;
                    me = this;
                    me.dataSaveSubDetailstore();
                },
            },
            //added 14-11-2017
            'vdpostinggrid button[action=postingselected]': {
                click: function () {
                    var me;
                    me = this;
                    me.FormDataCustomeShow('create', 1000, 'Browse Voucher ', 'Cashier.view.vdposting.FormLookupvouhcer', 'formlookupvoucher');
                }
            },
            'vdpostingformlookupvoucher': {
                afterrender: function () {
                    var me;
                    me = this;
                    me.formlookupVoucherAfterrender();
                }
            },
            'vdpostingformlookupvoucher [name=kasbank] ': {
                'expand': function () {
                    var me, form, grid, rows, record, store;
                    me = this;
                    form = me.getFormlookupvoucher();
                    grid = me.getGridlookupvoucher();
                    store = grid.getStore();
                    rows = grid.getSelectionModel().getSelection();
                    if (rows.length < 1) {
                        Ext.Msg.alert('Info', 'Please select record in grid first..!');
                        return;
                    } else {
                        record = rows[0]['data'];
                        me.in_out = record.dataflow;
                        store.filterBy(function (rec, id) {
                            var data = rec['data'];
                            if (data.dataflow == me.in_out) {
                                return true;
                            } else {
                                return false;
                            }
                        });
                        me.setVal(form, 'project_id', record.project_id);
                        me.setVal(form, 'pt_id', record.pt_id);
                        me.setVal(form, 'department_id', record.department_id);
                        me.setVal(form, 'dataflow', me.in_out);
                        me.setVal(form, 'made_by', record.addby);
                        me.setVal(form, 'description', record.description);
                    }
                },
                'select': function (g, record, item, index, e, eOpts) {
                    var me, rowdata, form, countlength;
                    me = this;
                    form = me.getFormlookupvoucher();
                    rowdata = record[0]['data'];
                    me.setValCombo(form, 'voucherprefix_id', 0, null);
                    me.setStorePrefixLookup(form);
                },
                'change': function (that, newValue, oldValue, eOpts) {
                    var me, form, rowdata;
                    me = this;
                    form = me.getFormlookupvoucher();
                    if (form.down('[name=kasbank]').valueModels[0] !== undefined) {
                        rowdata = form.down('[name=kasbank]').valueModels[0]['raw'];
                        me.setStorePrefixLookup(form);
                    }
                },
            },
            'vdpostingformlookupvoucher [name=voucherprefix_id] ': {
                'select': function (g, record, item, index, e, eOpts) {
                    var me, rowdata, form, countlength;
                    me = this;
                    form = me.getFormlookupvoucher();
                    rowdata = record[0]['data'];
                    me.prefix = rowdata.prefix;
                    me.temp_prefix = rowdata.temp_prefix;
                    form.down("[name=coa]").setValue(rowdata.coa);
                    form.down("[name=coa_id]").setValue(rowdata.coa_id);
                    me.setVal(form, 'fixed_coa', rowdata.fixed_coa);
                    me.setVal(form, 'prefix_id', rowdata.prefix_id);
                    me.generateCashierVouchernoinlookup(form);
                },
                'change': function (that, newValue, oldValue, eOpts) {
                    var me, form, rowdata;
                    me = this;
                    form = me.getFormlookupvoucher();
                    if (form.down('[name=voucherprefix_id]').valueModels[0] !== undefined) {
                        rowdata = form.down('[name=voucherprefix_id]').valueModels[0]['raw'];
                        me.prefix = rowdata.prefix;
                        form.down("[name=coa]").setValue(rowdata.coa);
                        form.down("[name=coa_id]").setValue(rowdata.coa_id);
                        me.setVal(form, 'fixed_coa', rowdata.fixed_coa);
                        me.setVal(form, 'prefix_id', rowdata.prefix_id);
                    }
                },
            },
            'vdpostinggridlookupselected': {
                selectionchange: this.gridlookupVoucherSelectionChange,
            },
            'vdpostingformlookupvoucher button[action=ok] ': {
                click: function () {
                    var me;
                    me = this;
                    me.processPosting();
                }
            },
            'vdpostingformlookupvoucher button[action=cancel] ': {
                click: function () {
                    var me, form;
                    me = this;
                    form = me.getFormlookupvoucher();
                    form.up('window').close();
                }
            },
            //====================================END SUB DETAIL===============================================      
        });
    },
    processPosting: function () {
        var me, form, formdata, grid, store, record, rows, rowdata, recordcounttext, arraydata, valuedata, formvalue;
        me = this;
        form = me.getFormlookupvoucher();
        grid = me.getGridlookupvoucher();
        store = grid.getStore();
        rows = grid.getSelectionModel().getSelection();
        if (rows.length < 1) {
            Ext.Msg.alert('Info', 'Please select data for process');
            return;
        } else {
            formdata = form.getForm();
            if (formdata.isValid()) {
                var department, voucherprefix, kasbank, flagkasbank, prefixdata;
                formvalue = form.getForm().getValues();
                department = form.down("[name=department_id]").valueModels[0].raw;
                voucherprefix = form.down("[name=voucherprefix_id]").valueModels[0].raw;

                if (formvalue.kasbank == "K") {
                    flagkasbank = 'cash';
                } else {
                    flagkasbank = 'bank';
                    prefixdata = me.temp_prefix;
                    if (prefixdata.length < 1) {
                        Ext.Msg.alert('Info', 'Prefix Temporary Bank for generate voucher number is null');
                        return false;
                    }
                }

                formvalue['voucher_id'] = 0;
                formvalue['dataflow'] = me.getVal(form, 'dataflow', 'value');
                formvalue['hideparam'] = 'checkposting' + flagkasbank;
                formvalue['coa'] = me.getVal(form, 'coa', 'value');

                recordcounttext = rows.length + ' record' + (rows.length > 1 ? 's' : '');
                arraydata = [];
                for (var i = 0; i < rows.length; i++) {
                    record = rows[i];
                    rowdata = record.raw;
                    arraydata.push(rowdata);
                }


                valuedata = {
                    hideparam: 'postingfromgrid',
                    project_id: me.getVal(form, 'project_id', 'value'),
                    pt_id: me.getVal(form, 'pt_id', 'value'),
                    vendor_id: me.getVal(form, 'vendor_id', 'value'),
                    voucher_id: 0,
                    amount: me.getVal(form, 'amount', 'value'),
                    description: me.getVal(form, 'description', 'value'),
                    datainform: formvalue,
                    datafromgrid: arraydata
                }

                Ext.Ajax.request({
                    url: me.urldata + 'update',
                    method: 'POST',
                    params: {
                        data: Ext.encode(formvalue)
                    },
                    success: function (response) {
                        var resjson, rowjson, valid, parameter, msg, restotal;
                        resjson = Ext.JSON.decode(response.responseText);
                        rowjson = resjson.data;
                        valid = resjson.success;
                        parameter = resjson.parameter;
                        msg = resjson.msg;
                        restotal = resjson.total;

                        if (valid == true) {

                            Ext.Ajax.request({
                                url: me.urldata + 'update',
                                method: 'POST',
                                params: {
                                    data: Ext.encode(valuedata)
                                },
                                success: function (response) {
                                    Ext.Msg.alert('Info', 'Process Posting Finish');
                                }, failure: function (response) {
                                    form.up('window').close();
                                }
                            });


                        } else {
                            Ext.Msg.alert('Info', 'Data for this transaction already exist..!');
                            return false;
                        }

                    },
                    failure: function (response) {
                        form.up('window').close();
                    }
                });



//                me.senddata = valuedata;
//                me.urlrequest = 'cashier/vdposting/update';
//                me.AjaxRequest();

            }
        }
    },
    formlookupVoucherAfterrender: function () {
        var me, form, grid, store;
        me = this;
        form = me.getFormlookupvoucher();
        grid = me.getGridlookupvoucher();
        store = grid.getStore();
        store.load({
            params: {
                "hideparam": 'getdataonlyapprove',
            },
            callback: function (records, operation, success) {


            }
        });
    },
    gridlookupVoucherSelectionChange: function () {
        var me, grid, rows, recordcounttext, store, record, rowdata, sum, form;
        me = this;
        form = me.getFormlookupvoucher();
        grid = me.getGridlookupvoucher();
        rows = grid.getSelectionModel().getSelection();
        recordcounttext = rows.length + ' record' + (rows.length > 1 ? 's' : '');
        store = grid.getStore();

        sum = 0;
        for (var i = 0; i < rows.length; i++) {
            record = rows[i];
            rowdata = record.raw;
            sum += parseFloat(rowdata.amount);
        }
        me.setLbl(form, 'lbltotal', "Total : " + me.Mask(sum));
        me.setVal(form, 'amount', sum);

    },

    //end 14-11-2017

    //=====================================================START METHOD DETAIL====================================
    paramdetail: {
        //start formgeneate
        fromlocation: 'Cashier.view.vdposting.FormDataDetail',
        formtitle: 'Form Detail', formicon: 'icon-form-add',
        formid: 'win-vdpostingdetailformdata', formlayout: 'fit',
        formshadow: 'frame', formmask: 'Loading...',
        formwidth: 500, formtimeout: 0,
        stateform: null, formaction: null, formproperties: null, formwindows: null,
        //end formgeneate
        //start properties form
        iddetail: 0, store: null, data: null, record: null, grid: null, row: null, form: null,
        checkdata: false, object: null, rowdata: null, action: null, counter: 0, flagkelsub: 0,
        rowdetailtmp: null,
        //start properties form
    },
    paramcontentdesc: {
        //start formgeneate
        fromlocation: 'Cashier.view.vdposting.FormContentDesc',
        formtitle: 'Form Content Description Detail', formicon: 'icon-form-add',
        formid: 'win-vdpostingdescformcontent', formlayout: 'fit',
        formshadow: 'frame', formmask: 'Loading...',
        formwidth: 800, formtimeout: 0,
        stateform: null, formaction: null, formproperties: null, formwindows: null,
        //end formgeneate

    },
    paramdesc: {
        //start formgeneate
        fromlocation: 'Cashier.view.vdposting.FormDataDesc',
        formtitle: 'Form Description Detail', formicon: 'icon-form-add',
        formid: 'win-vdpostingdescformdata', formlayout: 'fit',
        formshadow: 'frame', formmask: 'Loading...',
        formwidth: 600, formtimeout: 0,
        stateform: null, formaction: null, formproperties: null, formwindows: null,
        //end formgeneate
        //start properties form
        iddetail: 0, store: null, data: null, record: null, grid: null, row: null, form: null,
        checkdata: false, object: null, rowdata: null, action: null, counter: 0, flagkelsub: 0,
        totalsubdetail: 0,
        //start properties form
    },
    paramsubdetail: {
        //start formgeneate
        fromlocation: 'Cashier.view.vdposting.FormDataSubDetail',
        formtitle: 'Form Sub Detail', formicon: 'icon-form-add',
        formid: 'win-vdpostingsubdetailformdata', formlayout: 'fit',
        formshadow: 'frame', formmask: 'Loading...',
        formwidth: 700, formtimeout: 0,
        stateform: null, formaction: null, formproperties: null, formwindows: null,
        //end formgeneate
        //start properties form
        iddetail: 0, store: null, data: null, record: null, grid: null, row: null, form: null,
        checkdata: false, object: null, rowdata: null, action: null, counter: 0, flagkelsub: 0,
        totalsubdetail: 0,
        //start properties form
    },
    /* METHOD START FOR GRID HERE */
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
                form.down('[name=gridtabsubdetail]').setDisabled(true);
            } else {
                form.down('[name=gridtabsubdetail]').setDisabled(false);
                if (pd.row.statedata !== 'create' && statehead !== 'create') {
                    me.iddetailvalue = pd.row.voucherdetail_id;
                    //console.log(me.iddetailvalue);
                    me.getDatasubdetail();
                } else {
                    if (statehead == 'create') {
                        me.iddetailvalue = pd.row.indexdata;
                    } else {
                        me.iddetailvalue = pd.row.voucherdetail_id;
                    }

                    //me.getSubdata();
                }
            }
        }
    },
    getSubdata: function (storesub, datadetail) {
        var me, datasub, count;
        me = this;
        storesub.clearFilter(true);
        count = storesub.getCount();
        if (count !== 0) {
            storesub.filterBy(function (rec, id) {
                datasub = rec['data'];
                if (datasub.coa_id == datadetail.coa_id && datasub.voucherdetail_id == me.iddetailvalue) {
                    return true;
                } else {
                    return false;
                }
            });
        }
    },
    cellgridDesc: function () {
        var me, p, form;
        me = this;
        form = me.getFormdata();
        p = me.paramdesc;
        me.gridSelectionChangedesc();
        p.grid = me.getGriddesc();
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
    gridActionColumndescclick: function (view, cell, row, col, e) {
        var me, p, grid, action = '';
        me = this;
        p = me.paramdesc;
        grid = me.getGriddesc();
        grid.getSelectionModel().select(row);
        p.action = e.getTarget().className.match(/\bact-(\w+)\b/)[1];
        p.rowdata = grid.getStore().getAt(row);
        me.actiondataDesc();
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
    gridDescSelected: function () {
        var me, grid, counter, p, store, record, row;
        me = this;
        p = me.paramdesc;
        grid = me.getGridsubdetail();
        store = grid.getStore();
        counter = store.getCount();
        if (counter > 0) {
            p.rowdata = grid.getSelectionModel().getSelection()[0];

        }
    },
    gridSubDetailSelected: function () {
        var me, grid, counter, pd, store, record, row, formheader, formdetail, formsubdetail;
        me = this;
        pd = me.paramsubdetail;
        grid = me.getGridsubdetail();
        store = grid.getStore();
        counter = store.getCount();
        formheader = me.getFormdata();
        formdetail = me.getFormdatadetail();
        formsubdetail = me.getFormdatasubdetail();
        if (counter > 0) {
            pd.rowdata = grid.getSelectionModel().getSelection()[0];
            pd.row = pd.rowdata['data'];
        }
    },
    griddetailitemdoubleclick: function () {
        var me, pd;
        me = this;
        pd = me.paramdetail;
        pd.action = 'update';
        me.actiondataDetail();
    },
    griddescitemdoubleclick: function () {
        var me, p;
        me = this;
        p = me.paramdesc;
        p.action = 'update';
        me.actiondataDesc();
    },
    gridsubdetailitemdoubleclick: function () {
        var me, p;
        me = this;
        p = me.paramsubdetail;
        p.action = 'update';
        me.actiondataSubDetail();
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
    actiondataDesc: function () {
        var me, p, returndata;
        me = this;
        p = me.paramdesc;
        me.cellgridDesc();
        switch (p.action) {
            case 'update':
                me.paramdesc.stateform = 'update';
                me.GenerateFormdata(me.paramdesc);
                break;
            case 'destroy':
                me.dataDestroydescwithflag();
                break;
            default:
                returndata = "No action selected";
        }
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
    getDatadetail: function () {
        var me, pd, counter, form, rowdata, lengthkelsub, store, grid, rawjson = '';
        me = this;
        pd = me.paramdetail;
        form = me.getFormdata();
        pd.grid = me.getGriddetail();
        pd.store = me.getStore("VDPostingdetail");
        pd.store.load({
            params: {
                "hideparam": 'default',
                "voucher_id": me.getValue(me, 'voucher_id', 'value'),
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
                        form.down('[name=gridtabsubdetail]').setDisabled(false);
                    } else {
                        form.down('[name=gridtabsubdetail]').setDisabled(true);
                    }
                    pd.totaldetail = rawjson.totalamount;
                    me.setVal(form, 'amount', me.Mask(rawjson.totalamount));
                    me.setVal(form, 'totaldetail', me.Mask(rawjson.totalamount));
                    me.setSumdetail();

                }
            }
        });

    },
    getDatadesc: function () {
        var me, pd, p, counter, form, rowdata = '';
        me = this;
        p = me.paramdesc;
        form = me.getFormdata();
        p.grid = me.getGriddesc();
        p.store = p.grid.getStore();
        p.store.load({
            params: {
                "hideparam": 'default',
                "voucher_id": me.idheadervalue,
                "start": 0,
                "limit": 100,
            },
            callback: function (records, operation, success) {
                counter = p.store.getCount();
                p.counter = counter;
            }
        });
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
                "voucher_id": rowdata.voucher_id,
                "voucherdetail_id": rowdata.voucherdetail_id,
                "start": 0,
                "limit": 100,
            },
            callback: function (records, operation, success) {
                counter = p.store.getCount();
                p.counter = counter;
            }
        });
    },
    /* METHOD END FOR GRID HERE */

    /* METHOD START FORM */
    indexDetail: function () {
        var me, form, store, counter;
        me = this;
        store = me.getGriddetail().getStore();
        counter = store.getCount();
        return counter + 1;
    },
    indexDesc: function () {
        var me, form, store, counter;
        me = this;
        store = me.getGriddesc().getStore();
        counter = store.getCount();
        store.clearFilter();
        return counter + 1;
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
    formDataDetailAfterRender: function () {
        var me, pd, action, counter, sort, form, desc;
        me = this;
        pd = me.paramdetail;
        form = me.getFormdatadetail();
        desc = me.getFormdata().down('[name=description]').getValue();
        me.setStoreCoaDept();
        switch (pd.stateform) {
            case 'create':
                counter = me.indexDetail();
                pd.iddetail = 0;
                me.iddetailvalue = counter;
                if (me.in_out == 'I') {
                    form.down("[name=dataflow]").setValue('O');
                } else {
                    form.down("[name=dataflow]").setValue('I');
                }
                form.down("[name=remarks]").setValue(desc);
                form.down("[name=indexdata]").setValue(counter);
                break;
            case 'update':
                //onsole.log(pd.rowdata);
                form.loadRecord(pd.rowdata);
                pd.iddetail = pd.rowdata['data'].voucherdetail_id;
                me.iddetailvalue = pd.rowdata['data'].voucherdetail_id;
                me.coa = pd.rowdata['data'].coa;
                me.kelsub_id = pd.rowdata['data'].kelsub_id;
                if (me.kelsub_id !== 0) {
                    me.setReadonly(form, 'amount', true);
                } else {
                    me.setReadonly(form, 'amount', false);
                }
                /*
                 if (me.in_out == 'I') {
                 form.down("[name=dataflow]").setValue('O');
                 } else {
                 form.down("[name=dataflow]").setValue('I');
                 }
                 */
                break;
            default:
        }
        me.formatCurrencyFormdata(me, form);
    },
    FormcontentdescAfterrender: function () {
        var me, p, action, store, counter, sort, state, form, desc;
        me = this;
        p = me.paramcontentdesc;
        form = me.getFormdata();
        store = me.getGriddesc().getStore();
        state = form.up('window').state.toLowerCase();
        counter = store.getCount();

        switch (state) {
            case 'create':
                if (counter > 0) {
                    store.removeAll();
                }
                break;
            case 'update':
                me.getDatadesc();
                break;
        }
    },
    FormDataDescAfterrender: function () {
        var me, p, action, countdata, counter, state, form, rowdata;
        me = this;
        p = me.paramdesc;
        form = me.getFormdatadesc();
        switch (p.stateform) {
            case 'create':
                counter = me.indexDesc();
                me.setVal(form, 'voucher_id', me.idheadervalue);
                me.setVal(form, 'indexdata', counter);
                break;
            case 'update':
                form.loadRecord(p.rowdata);
                break;
        }
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
                me.setVal(form, 'voucher_id', me.idheadervalue);
                me.setVal(form, 'voucherdetail_id', me.iddetailvalue);
                me.setVal(form, 'coa_id', rowdata.coa_id);
                me.setVal(form, 'kelsub_id', rowdata.kelsub_id);
                me.setVal(form, 'kelsub', rowdata.kelsub);
                me.setVal(form, 'indexdata', counter);
                break;
            case 'update':
                me.iddetailvalue = rowdata.voucherdetail_id;
                form.loadRecord(p.rowdata);
                break;
            default:
        }
        me.setStoreSubcode();
        me.formatCurrencyFormdata(me, form);
    },
    /* METHOD END FORM */

    /* START CALCULATE DATA */

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
        var me, pd, store_h, store_d, form, amount, totaldetail,
                balance, msgdata, status, voucher_no;

        me = this;
        pd = me.paramdetail;
        form = me.getFormdata();
        store_d = me.getGriddetail().getStore();


        store_d.clearFilter(true);
        if (store_d.getCount() > 0) {
            store_d.filter('deleted', false);
            //totaldetail = store_d.sum('amount');
            totaldetail = me.setTotaldetail(store_d);
        } else {
            totaldetail = pd.totaldetail;
        }

        me.Mask(me.setVal(form, 'amount', totaldetail));
        amount = me.unMask(me.getVal(form, 'amount', 'value'));
        balance = parseFloat(amount) - parseFloat(totaldetail);
        me.setVal(form, 'totaldetail', parseFloat(totaldetail));
        me.setVal(form, 'balance', parseFloat(balance));

        store_d.clearFilter(true);
        store_d.filter('voucher_id', me.idheadervalue);
        store_d.filter('deleted', false);
        me.formatCurrencyFormdata(me, form);
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
    /* END CALCULATE DATA */

    //=====================================================END METHOD DETAIL====================================
    panelAfterRender: function () {
        var me = this;
        me.senddata = {
            "hideparam": 'getemployee',
        }
        me.urlrequest = 'cashier/vdposting/read';
        me.AjaxRequest();
    },
    checkTabsubcoa: function () {
        var me, pd, form, tabPanel, name, rowdetail;
        me = this;
        pd = me.paramdetail;
        form = me.getFormdata();
        rowdetail = pd.rowdata;
        tabPanel = form.down("[name=voucherrequesttab]").getActiveTab();
        name = tabPanel.name;
        if (name == 'gridtabsubdetail') {
            if (rowdetail !== null) {
                me.Tabsubcoa(rowdetail);
            } else {
                form.down('[name=gridtabsubdetail]').setDisabled(true);
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
                me.iddetailvalue = datadetail.voucherdetail_id;
                me.getDatasubdetail();
            } else {
                me.iddetailvalue = datadetail.indexdata;
                me.getSubdata(storesub, datadetail);
            }
        }
    },
    setFormdataready: function () {
        var me, store, state, form, griddetail, gridsubdetail, storedetail;
        me = this;
        form = me.getFormdata();
        state = form.up('window').state.toLowerCase();
        switch (state) {
            case 'create':
                me.idheadervalue = 0;
                storedetail = me.getGriddetail().getStore();
                if (storedetail.getCount() > 0) {
                    storedetail.removeAll();
                }
                me.setLabel(me, 'lblstatus', 'OPEN', true);
                me.setValue(me, 'status', '1');
                me.setVal(form, 'voucher_date', me.dateNow);
                me.setStorePtuser();
                me.setStoreDeptuser();
                me.setStoreApproveby();
                // me.generateVoucherno();
                break;
            case 'update':
                me.idheadervalue = me.getValue(me, 'voucher_id', 'value');
                storedetail = me.getGriddetail().getStore();
                if (storedetail.getCount() > 0) {
                    storedetail.removeAll();
                }
                me.getDatadetail();
                me.setSumdetail();
                break;
            case 'read':
                me.idheadervalue = me.getValue(me, 'voucher_id', 'value');
                storedetail = me.getGriddetail().getStore();
                if (storedetail.getCount() > 0) {
                    storedetail.removeAll();
                }
                me.getDatadetail();
                me.setSumdetail();
                break;
        }
    },
    setStorePtuser: function () {
        var me, store, form;
        me = this;
        form = me.getFormdata();
        store = me.getStore("Ptbyuser");
        store.reload({
            params: {
                "hideparam": 'getptbyuser',
                "project_id": parseInt(apps.project),
                "start": 0,
                "limit": 1000,
            },
            callback: function (records, operation, success) {
                store.each(function (record)
                {
                    if (record.data['project_id'] == parseInt(apps.project) && record.data['pt_id'] == parseInt(apps.pt)) {
                        me.setVal(form, 'pt_id', record.data['pt_id']);
                    }
                });
            }
        });
    },
    setStoreDeptuser: function () {
        var me, store, form;
        me = this;
        form = me.getFormdata();
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
    },
    setStoreApproveby: function () {
        var me, store, form;
        me = this;
        form = me.getFormdata();
        store = me.getStore("Employee");
        store.reload({
            params: {
                "hideparam": 'getemployee',
            },
            callback: function (records, operation, success) {
                //store.clearFilter(true);
                //store.filter("department_id", me.department_id);
                store.each(function (record)
                {
                    if (record.data['employee_id'] == me.manager_id) {
                        me.setVal(form, 'approveby_id', record.data['employee_id']);
                    }
                });
            }
        });
    },
    setStoreCoaDept: function () {
        var me, store, form;
        me = this;
        form = me.getFormdata();
        store = me.getStore("Coadeptcombo");
        store.load({
            params: {
                "hideparam": 'getcoabyprojectptdept',
                "project_id": parseInt(apps.project),
                "pt_id": me.getVal(form, 'pt_id', 'value'),
                "department_id": me.getVal(form, 'department_id', 'value')
            },
            callback: function (records, operation, success) {

            }
        });
    },
    setStoreSubcode: function () {
        var me, store, form;
        me = this;
        form = me.getFormdata();
        store = me.getStore("Subgl");
        store.load({
            params: {
                "hideparam": 'getsubglbykelsub',
                "project_id": parseInt(apps.project),
                "pt_id": me.getVal(form, 'pt_id', 'value'),
                "kelsub_id": me.kelsub_id
            },
            callback: function (records, operation, success) {

            }
        });
    },
    setStorePrefix: function (form = '') {
        var me, store, form, in_out;
        me = this;
        //form = me.getFormdata();
        in_out = me.in_out;
        store = me.getStore("Voucherprefixsetupcombo");
        store.reload({
            callback: function (records, operation, success) {
                store.clearFilter(true);
                store.filter('pt_id', me.pt_id);
                store.filter('cash_bank', me.getVal(form, 'kasbank', 'value'));
                store.filter('in_out', in_out);
            }
        });
    },
    setStorePrefixLookup: function (form = '') {
        var me, store, form, in_out;
        me = this;
        in_out = me.in_out;
        store = me.getStore("Voucherprefixsetupcombo");
        store.reload({
            callback: function (records, operation, success) {
                store.clearFilter(true);
                store.filter('pt_id', parseInt(apps.pt));
                store.filter('cash_bank', me.getVal(form, 'kasbank', 'value'));
                store.filter('in_out', in_out);
            }
        });
    },
    generateVoucherno: function () {
        var me, form, state;
        me = this;
        form = me.getFormdata();
        state = form.up('window').state.toLowerCase();
        switch (state) {
            case 'create':
                me.senddata = {
                    "hideparam": 'generatevoucherrequest',
                    "project_id": parseInt(apps.project),
                    "pt_id": (me.pt_id == 0) ? parseInt(apps.pt) : me.pt_id,
                    "module": 'VOUCHERREQUEST',
                    "prefix": me.prefixdept,
                    "flag": me.flaggeneratevoucherno,
                }
                me.urlrequest = me.urlcommon;
                me.AjaxRequest();
                break;
        }
    },
    generateCashierVoucherno: function () {
        var me, form, kasbank, param, module, state, status, prefixdata;
        me = this;
        form = me.getFormdata();
        kasbank = me.getVal(form, 'kasbank', 'value');
        if (kasbank == 'K') {
            module = 'KAS';
            prefixdata = me.prefix;
        } else if (kasbank == 'B') {
            module = 'BANK';
            prefixdata = me.temp_prefix;

            if (prefixdata.length < 1) {
                Ext.Msg.alert('Info', 'Prefix Temporary Bank for generate voucher number is null');
                return false;
            }
        }


        state = form.up('window').state.toLowerCase();
        status = form.down("[name=status]").getValue();
        me.senddata = {
            "hideparam": 'generatevoucherposting',
            "project_id": parseInt(apps.project),
            "pt_id": me.pt_id,
            "module": module,
            "acceptdate": me.getVal(form, 'cashier_voucher_date', 'value'),
            //"prefix": me.prefix,
            "prefix": prefixdata,
            "flag": me.flaggeneratevoucherno,
        }
        me.urlrequest = me.urlcommon;
        me.AjaxRequest();

    },
    generateCashierVouchernoinlookup: function (form) {
        var me, form, kasbank, param, module, state, status, prefixdata;
        me = this;
        kasbank = me.getVal(form, 'kasbank', 'value');
        if (kasbank == 'K') {
            module = 'KAS';
            prefixdata = me.prefix;
        } else if (kasbank == 'B') {
            module = 'BANK';
            prefixdata = me.temp_prefix;
            if (prefixdata.length < 1) {
                Ext.Msg.alert('Info', 'Prefix Temporary Bank for generate voucher number is null');
                return false;
            }
        }

        me.senddata = {
            "hideparam": 'generatevoucherpostinglookup',
            "project_id": parseInt(apps.project),
            "pt_id": me.getVal(form, 'pt_id', 'value'),
            "module": module,
            "acceptdate": me.getVal(form, 'cashier_voucher_date', 'value'),
            //"prefix": me.prefix,
            "prefix": prefixdata,
            "flag": me.flaggeneratevouchernoinlookup,
        }
        me.urlrequest = me.urlcommon;
        me.AjaxRequest();

    },
    dataSaveDetailstore: function () {
        var me, pd, form, grid, store, record, row, indexdata, getindex = '';
        me = this;
        pd = me.paramdetail;
        form = me.getFormdatadetail();
        if (form.getForm().isValid()) {
            grid = me.getGriddetail();
            store = grid.getStore();
            row = form.getForm().getValues();
            row[me.idheaderfield] = me.idheadervalue;

            pd.row = row;
            me.Checkdatadetail();

            switch (pd.stateform) {
                case 'create':
                    if (pd.checkdata == false) {
                        row['statedata'] = 'create';
                        row['project_id'] = parseInt(apps.project);
                        row['pt_id'] = me.pt_id;
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
                    row[me.idheaderfield] = me.idheadervalue;
                    record.set(row);
                    record.endEdit();
                    store.commitChanges();
                    break;
            }
            store.filter('deleted', false);
            pd.totaldetail = store.sum('amount');
            me.setSumdetail();
            me.setDatadetailAftersave();
            form.up('window').close();
        }
    },
    setDatadetailAftersave: function () {
        var me, store, counter;
        me = this;
        store = me.getGriddetail().getStore();
        counter = store.getCount();
        if (counter) {
            var index = counter - 1;
            if (index == 0) {
                me.getGriddetail().getSelectionModel().select(index, true);
            } else {
                me.getGriddetail().getSelectionModel().deselectAll();
                me.getGriddetail().getSelectionModel().select(index, true);
            }
        }
    },
    dataSaveDescstore: function () {
        var me, p, form, grid, store, record, row, indexdata, getindex = '';
        me = this;
        p = me.paramdesc;
        form = me.getFormdatadesc();
        if (form.getForm().isValid()) {
            grid = me.getGriddesc();
            store = me.getStore('VDPostingdesc');
            row = form.getForm().getValues();
            row[me.idheaderfield] = me.idheadervalue;

            p.row = row;
            me.Checkdatadesc();
            switch (p.stateform) {
                case 'create':
                    if (p.checkdata == false) {
                        row['statedata'] = 'create';
                        row['project_id'] = parseInt(apps.project);
                        row['pt_id'] = me.pt_id;
                        row[me.idheadefield] = me.idheadervalue;
                        store.add(row);
                        store.commitChanges();
                    } else {
                        me.buildWarningAlert("Sorry code = " + me.coa + " ,already exist in this transaction");
                    }
                    break;
                case 'update':
                    getindex = store.indexOf(p.rowdata);
                    record = store.getAt(getindex);
                    record.beginEdit();
                    row['statedata'] = 'update';
                    row[me.idheadefield] = me.idheadervalue;
                    record.set(row);
                    record.endEdit();
                    store.commitChanges();
                    break;
            }
            form.up('window').close();
            me.setDataDescAftersave();
        }
    },
    setDataDescAftersave: function () {
        var me, store, counter;
        me = this;
        store = me.getGriddesc().getStore();
        counter = store.getCount();
        if (counter) {
            var index = counter - 1;
            if (index == 0) {
                me.getGriddesc().getSelectionModel().select(index, true);
            } else {
                me.getGriddesc().getSelectionModel().deselectAll();
                me.getGriddesc().getSelectionModel().select(index, true);
            }
        }
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
                        row['project_id'] = parseInt(apps.project);
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
            //console.log(Ext.data.StoreManager.lookup('VDPostingsubdetail'));
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
    Checkdatadetail: function () {
        var me, status, returndata, pd, grid, store, filter = '';
        me = this;
        pd = me.paramdetail;
        pd.checkdata = false;
        grid = me.getGriddetail();
        store = grid.getStore();
        store.each(function (record)
        {
            if (record.data['voucher_id'] == pd.row.voucher_id &&
                    record.data['coa_id'] == pd.row.coa_id &&
                    record.data['indexdata'] == pd.row.indexdata
                    )
            {
                pd.checkdata = true;
            }
        });
    },
    Checkdatadesc: function () {
        var me, status, returndata, p, grid, store, filter = '';
        me = this;
        p = me.paramdesc;
        p.checkdata = false;
        grid = me.getGriddetail();
        store = grid.getStore();
        store.each(function (record)
        {
            if (record.data['voucher_id'] == p.row.voucher_id &&
                    record.data['indexdata'] == p.row.indexdata &&
                    record.data['posting_no'] == p.row.posting_no &&
                    record.data['receipt_no'] == p.row.receipt_no &&
                    record.data['code'] == p.row.code
                    )
            {
                p.checkdata = true;
            }
        });
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
            if (record.data['voucher_id'] == p.row.voucher_id &&
                    record.data['voucherdetail_id'] == p.row.voucherdetail_id &&
                    record.data['coa_id'] == p.row.coa_id &&
                    record.data['kelsub_id'] == p.row.kelsub_id &&
                    record.data['subgl_id'] == p.row.subgl_id &&
                    record.data['indexdata'] == p.row.indexdata
                    )
            {
                p.checkdata = true;
            }
        });
    },
    Checkbalanceheaderdetail: function () {
        var me, pd, formheader, formdetail, storedetail, countdetail,
                amount, totaldetail, amountdetail, balance, flagbalance, message;
        me = this;
        pd = me.paramdetail;
        formheader = me.getFormdata();
        formdetail = me.getFormdatadetail();
        storedetail = me.getGriddetail().getStore();
        amount = me.unMask(me.getVal(formheader, 'amount', 'value'));
        amountdetail = me.unMask(me.getVal(formdetail, 'amount', 'value'));
        countdetail = storedetail.getCount();

        if (countdetail > 0) {
            totaldetail = storedetail.sum("amount");
        } else {
            totaldetail = 0;
        }

        if (pd.stateform == 'create') {
            balance = parseFloat(amount) - (totaldetail + parseFloat(amountdetail));
        } else {
            balance = parseFloat(amount) - parseFloat(amountdetail);
        }
        if (balance < 0) {
            flagbalance = 0;
            message = 'Total detail coa more greater than Amount header';
        } else {
            flagbalance = 1;
            message = 'data normal';
        }
        return {"flagbalance": flagbalance, "message": message}
    },
    Checkbalanceheaderdetailsub: function () {
        var me, p, formheader, formdetail, formsubdetail, storesubdetail, countsubdetail,
                amount, pd, totalsubdetail, amountsubdetail, balance, flagbalance, message,
                gridsubdetail;
        me = this;
        pd = me.paramdetail;
        p = me.paramsubdetail;
        formheader = me.getFormdata();
        formdetail = me.getFormdatadetail();
        formsubdetail = me.getFormdatasubdetail();
        gridsubdetail = me.getGridsubdetail();
        storesubdetail = gridsubdetail.getStore();
        countsubdetail = storesubdetail.getCount();
        amountsubdetail = me.unMask(me.getVal(formsubdetail, 'amount', 'value'));
        amount = me.balancecoa;

        if (countsubdetail > 0) {
            storesubdetail.clearFilter(true);
            storesubdetail.filter(me.idheaderfield, me.idheadervalue);
            storesubdetail.filter(me.iddetailfield, me.iddetailvalue);
            storesubdetail.filter('deleted', false);
            totalsubdetail = storesubdetail.sum("amount");
            storesubdetail.clearFilter(true);
        } else {
            totalsubdetail = 0;
        }

        if (p.stateform == 'create') {
            balance = parseFloat(amount) - (totalsubdetail + parseFloat(amountsubdetail));
        } else {
            balance = parseFloat(amount) - parseFloat(amountsubdetail);
        }

        if (balance < 0) {
            flagbalance = 0;
            message = 'Total sub detail coa more greater than Amount in Coa';
        } else {
            flagbalance = 1;
            message = 'data normal';
        }
        return {"flagbalance": flagbalance, "message": message}
    },
    dataSavecustome: function () {
        var me, state, form, formdata, addingRecord, vp, vps, x, store, storedesc, storedetail, storesubdetail,
                valuedata, idProperty, rec, paramdata, rowdata, resjsonheader, rowjsonheader, validheader, paramheader,
                idProperty, counterdesc, counterdetail, countersubdetail, msgheader, restotal, amount;
        me = this;
        storedesc = Ext.data.StoreManager.lookup('VDPostingdesc');
        storedetail = Ext.data.StoreManager.lookup('VDPostingdetail');

        counterdesc = storedesc.getCount();
        counterdetail = storedetail.getCount();

        form = me.getFormdata();
        formdata = me.getFormdata().getForm();
        state = form.up('window').state.toLowerCase();

        if (formdata.isValid()) {
            resetTimer();

            if (state == 'update' && me.cashier_voucher_no == '') {
                me.flaggeneratevoucherno = '1';
                if (me.flagsaveposting == null || me.flagsaveposting == '') {
                    me.generateCashierVoucherno();
                }
            }

            me.unformatCurrencyFormdata(me, form);
            store = me.getGrid().getStore();
            valuedata = formdata.getValues();
            valuedata['coa'] = me.getVal(form, 'coa', 'value');
            valuedata['made_by'] = me.addby;
            valuedata['status'] = me.flagposting;
            valuedata['kasbank_id'] = me.kasbank_id;
            form.up('window').body.mask('Saving data, please wait ...');

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

            counterdesc = storedesc.getCount();
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

                    //untuk posting hanya data cashier aja yang di edit
                    //base on fsd
                    if (validheader == 'true') {
                        if (counterdesc > 0) {
                            me.Savedesc(me, state);
                        }
                        if (counterdetail > 0) {
                            me.Savedetail(me, state);
                        }

                        store.commitChanges();
                        me.messagedata = msgheader;
                        me.cashier_voucher_no = valuedata.cashier_voucher_no;
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
    dataPosting: function () {
        var me, store, form, grid, formdata, state, valuedata,
                idProperty, rec, resjson, rowjson, valid, kasbank, flagkasbank,
                parameter, msg, restotal;
        me = this;
        form = me.getFormdata();
        formdata = me.getFormdata().getForm();
        state = form.up('window').state.toLowerCase();
        kasbank = me.getVal(form, 'kasbank', 'value');
        if (kasbank == "K") {
            flagkasbank = 'cash';
        } else {
            flagkasbank = 'bank';
        }
        if (formdata.isValid()) {
            resetTimer();
            if (state == 'update' && me.cashier_voucher_no == '') {
                //me.flaggeneratevoucherno = '1';
                //me.generateCashierVoucherno();
            }

            me.unformatCurrencyFormdata(me, form);
            store = me.getGrid().getStore();
            valuedata = formdata.getValues();
            valuedata['coa'] = me.getVal(form, 'coa', 'value');
            valuedata['made_by'] = me.addby;
            form.up('window').body.mask('Saving data, please wait ...');
            switch (state) {
                case 'update':
                    idProperty = store.getProxy().getReader().getIdProperty();
                    rec = store.getById(parseInt(formdata.findField(idProperty).getValue(), 10));
                    rec.beginEdit();
                    rec.set(valuedata);
                    rec.endEdit();
                    valuedata['hideparam'] = 'checkposting' + flagkasbank;
                    me.valueform = valuedata;
                    break;
                default:
                    return;
            }
            Ext.Ajax.request({
                url: me.urldata + 'update',
                method: 'POST',
                params: {
                    data: Ext.encode(valuedata)
                },
                success: function (response) {
                    resjson = Ext.JSON.decode(response.responseText);
                    rowjson = resjson.data;
                    valid = resjson.success;
                    parameter = resjson.parameter;
                    msg = resjson.msg;
                    restotal = resjson.total;
                    if (valid == true) {
                        valuedata['hideparam'] = 'posting' + flagkasbank;
                        me.senddata = valuedata;
                        me.urlrequest = 'cashier/vdposting/update';
                        me.AjaxRequest();
                    } else {
                        if (rowjson == null) {
                            me.messagedata = msg;
                        } else {
                            me.messagedata = "Data for Cashier, already exist on transaction cash bank";
                        }

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
    Savedesc: function (that, state) {
        var me, store, counter, id, statedata, data, action,
                resjson, rowjson, valid, msg, parameter;

        me = that;
        store = me.getStore('VDPostingdesc');
        store.clearFilter(true);
        if (state == 'create') {
            store.filter(me.idheaderfield, '0');
        } else {
            store.filter(me.idheaderfield, me.idheadervalue);
        }

        counter = store.getCount();
        if (counter > 0) {
            store.each(function (record, index) {
                var i = index + 1;

                id = record.get("voucherdesc_id");
                statedata = record.get("statedata");

                if (state == 'create' && statedata == 'create') {
                    action = 'create';
                } else if (state == 'create' && statedata == 'update') {
                    action = 'create';
                } else if (state == 'update' && statedata == 'create') {
                    action = 'create';
                } else if (state == 'update' && statedata == 'update') {
                    action = 'update';
                }

                data = record['data'];
                data[me.idheaderfield] = me.idheadervalue;
                data['parametersql'] = action;
                data['hideparam'] = 'desc' + action;

                if (me.urldesc !== me.urldesc + statedata) {
                    var executedata = 0;
                    if (statedata == 'create' || statedata == 'update') {
                        executedata = 1;
                    }
                    if (statedata == 'delete' && id !== 0) {
                        executedata = 1;
                        action = 'delete';
                    }

                    if (executedata == 1) {
                        Ext.Ajax.request({
                            url: me.urldesc + action,
                            method: 'POST',
                            params: {
                                data: Ext.encode(data)
                            },
                            success: function (response) {
                                resjson = Ext.JSON.decode(response.responseText);
                                rowjson = resjson.data;
                                valid = resjson.success;
                                parameter = resjson.parameter;
                                msg = resjson.msg;
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
    Savedetail: function (that, state) {
        var me, storedetail, counterdetail, iddetail, statedatadetail, datadetail, actiondetail,
                resjsondetail, rowjsondetail, validdetail, msgdetail, parameterdetail, kelsub_id,
                storesubdetail, countersubdetail;

        me = that;
        storedetail = Ext.data.StoreManager.lookup('VDPostingdetail');
        storedetail.clearFilter(true);
        counterdetail = storedetail.getCount();

        storesubdetail = Ext.data.StoreManager.lookup('VDPostingsubdetail');
        countersubdetail = storesubdetail.getCount();



        var i = 0;
        if (counterdetail > 0) {
            storedetail.each(function (record, index) {
                i = index + 1;
                iddetail = record.get("voucherdetail_id");
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
                                        if (storedata.coa_id == coa_id && storedata.voucherdetail_id == iddetail) {
                                            return true;
                                        } else {
                                            return false;
                                        }
                                    });



                                    storesubdetail.each(function (record, index) {
                                        iddetailsub = record.get("vouchersubdetail_id");
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
    formDataClose: function () {
        var me = this;
        me.getFormdata().up('window').close();
        me.clearallStore();
    },
    clearallStore: function () {
        var me;
        me = this;
        //me.getGriddetail().getStore().removeAll();
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
            store = Ext.data.StoreManager.lookup('VDPostingsubdetail');

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
    formDataAfterRender: function (el) {
        var me, form, state, grid, record, counter, store, row;
        me = this;
        me.storeProcess = me.createSpProcessObj(me.storeProcess);
        me.fdar().init();
        me.loadComboBoxStore(el);
        form = me.getFormdata();
        state = el.up('window').state;
        if (state == 'create') {
            me.fdar().create();
            me.getFormdata().down("[name=status]").setValue('1');
        } else if (state == 'update') {
            me.fdar().update();
            if (me.gridId === 1) {
                grid = me.getGridapprove();
            } else {
                grid = me.getGrid();
            }
            store = grid.getStore();
            record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));
            counter = store.getCount();
            if (counter > 0) {
                row = record['data'];
                me.in_out = row.dataflow;
                me.setReadonly(form, 'pt_id', true);
                me.setReadonly(form, 'department_id', true);
                me.setReadonly(form, 'approveby_id', true);
                me.setReadonly(form, 'voucher_date', true);
                //me.setReadonly(form, 'description', true);
                me.setReadonly(form, 'amount', true);
                me.setReadonly(form, 'vendor_id', true);
                me.setReadonly(form, 'dataflow', true);
                me.pt_id = row.pt_id;
                me.in_out = row.dataflow;
                me.addby = row.addby;
                me.cashier_voucher_no = row.cashier_voucher_no;
                me.setDate(row);
                if (row.kasbondept_id > 0) {
                    me.fieldShow(form, "fieldsetkasbondept");
                } else {
                    me.fieldHide(form, "fieldsetkasbondept");
                }
            }

            //me.getFormdata().down('#voucherrequesttab').setDisabled(true);
        } else if (state == 'read') { //========= added on march 15th 2016 by Tirtha
            if (me.gridId === 1) {
                grid = me.getGridapprove();
            } else {
                grid = me.getGrid();
            }
            me.fdar().readCustomStore(grid);


            store = grid.getStore();
            record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));
            counter = store.getCount();
            if (counter > 0) {
                row = record['data'];
                me.in_out = row.dataflow;

                if (row.kasbondept_id > 0) {
                    me.fieldShow(form, "fieldsetkasbondept");
                } else {
                    me.fieldHide(form, "fieldsetkasbondept");
                }
            }

        }
        me.setStatus();
    },
    setDate: function (row) {
        var me;
        me = this;
        if (me.formatDate(row.chequegiro_date) == '1970-01-1' || me.formatDate(row.chequegiro_date) == '1900-01-1') {
            me.setValue(me, 'chequegiro_date', '');
        }
        if (me.formatDate(row.chequegiro_handover_date) == '1970-01-1' || me.formatDate(row.chequegiro_handover_date) == '1900-01-1') {
            me.setValue(me, 'chequegiro_handover_date', '');
        }
        if (me.formatDate(row.cashier_voucher_date) == '1970-01-1' || me.formatDate(row.cashier_voucher_date) == '1900-01-1') {
            me.setValue(me, 'cashier_voucher_date', '');
        }
        if (me.formatDate(row.voucher_date) == '1970-01-1' || me.formatDate(row.voucher_date) == '1900-01-1') {
            me.setValue(me, 'voucher_date', '');
        }
    },
    setStatus: function () {
        var me, form, status;
        me = this;
        form = me.getFormdata();
        status = form.down("[name=status]").getValue();
        if (status == '2') {
            form.down("[name=lblstatus]").setText("APPROVE", true);
        } else if (status == '3') {
            form.down("[name=lblstatus]").setText("POSTING", true);
            me.getFormdata().down('#btnSave').setDisabled(true);
            //me.getFormdata().down('#btnDetailDesc').setDisabled(true);
            //me.getFormdata().down('#btnDetailDesc').setDisabled(true);
            me.getFormdata().down('#voucherrequesttab').setDisabled(true);
        }
    },
    gridSelectionChange: function () {
        var me = this;
        if (me.gridId === 1) {
            grid = me.getGridapprove();
        } else {
            grid = me.getGrid();
        }
        row = grid.getSelectionModel().getSelection();

    },
    gridSelected: function () {
        var me, grid, store, counter, record, row;
        me = this;
        if (me.gridId === 1) {
            grid = me.getGridapprove();
        } else {
            grid = me.getGrid();
        }
        store = grid.getStore();
        counter = store.getCount();
        if (counter > 0) {
            record = grid.getSelectionModel().getSelection()[0];
            row = record['data'];
            me.addby = row.addby;
            if (row.status != '1') {
                grid.down('#btnEdit').setDisabled(true);
                grid.down('#btnDelete').setDisabled(true);
            } else {
                grid.down('#btnEdit').setDisabled(false);
                grid.down('#btnDelete').setDisabled(false);
            }
            grid.down('#btnPrintvoucher').setDisabled(false);
        }
    },
    sendRequestmail: function () {
        var me, data;
        me = this;
//        data = me.valueform;
//        data['voucher_id'] = me.idheadervalue;
//        data['addby'] = me.addby;
//        data['hideparam'] = 'posting';
//        me.senddata = data;
//        me.urlrequest = me.urldata + 'update';
//        me.AjaxRequest();
    },
    execAction: function (el, action, me) {
        if (!action) {
            action = '';
        }
        if (!me) {
            me = this;
        }
        switch (action) {
            case me.bindPrefixName + 'Create':
            case me.bindPrefixName + 'Update':
            case me.bindPrefixName + 'Read':
                me.formDataShow(el, acts[action], action);
                break;
            case 'show':
                me.formDataShow(el, action);
                break;
            case me.bindPrefixName + 'Delete':
                me.dataDestroy(el);
                break;
            case me.bindPrefixName + 'Printvoucher':
                me.printVoucherdata();
                break;
            case me.bindPrefixName + 'Posting':
                me.Posting();
                break;
            case me.bindPrefixName + 'Unposting':
                me.Unposting();
                break;
        }
    },
    Posting: function () {
        var me;
        me = this;
        me.MessageConfirm('posting', 'Are sure want to Posting..? If you choose yes, system will be generate from this data for cash or bank transaction ', ' Confirm Your Posting');
    },
    Unposting: function () {
        var me;
        me = this;
        me.MessageConfirm('unposting', 'Are sure want to UnPosting..? If you choose yes, the data in transaction cash or bank will be deleted', ' Confirm Your Unposting');
    },
    MessageConfirm: function (flag, msg, title) {
        var me, record, row, data, grid;
        me = this;
        if (me.gridId === 1) {
            grid = me.getGridapprove();
        } else {
            grid = me.getGrid();
        }
        record = grid.getSelectionModel().getSelection()[0];
        row = record['data'];
        data = row;
        data['made_by'] = row.addby;
        if (data.kasbank.length > 0) {
            Ext.Msg.show({
                title: title,
                msg: msg,
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
                        data['hideparam'] = flag;
                        me.senddata = data;
                        me.loadingposting.show();
                        me.urlrequest = me.urldata + 'update';
                        me.AjaxRequest();
                    }
                },
                icon: Ext.Msg.QUESTION
            });
        } else {
            me.buildWarningAlert("Data for cashier is not complete..!");
        }
    },
    AjaxRequest: function () {
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
        var me, kasbank, flagkasbank, data, form, valid, msg, grid;
        me = this;
        data = me.info.data;
        valid = me.info.success;
        msg = me.info.msg;
        form = me.getFormdata();
        if (me.gridId === 1) {
            grid = me.getGridapprove();
        } else {
            grid = me.getGrid();
        }
        switch (me.info.parameter) {
            case null:
                me.manager_id = data['manager_id'];
                me.employee_id = data['employee_id'];
                me.department_id = data['department_id'];
                break;
            case 'default':
                break;
            case 'generatevoucherrequest':
                form.down("[name=voucher_no]").setValue(data);
                break;
            case 'generatevouchernobank':
                form.down("[name=cashier_voucher_no]").setValue(data);
                break;
            case 'generatevouchernocash':
                form.down("[name=cashier_voucher_no]").setValue(data);
                break;
            case 'generatevoucherposting':
                form.down("[name=cashier_voucher_no]").setValue(data);
                break;
            case 'generatevoucherpostinglookup':
                me.getFormlookupvoucher().down("[name=cashier_voucher_no]").setValue(data);
                break;
            case 'postingcash':
                if (valid == 'true') {
                    me.messagedata = msg;
                    //me.cashier_voucher_no = form.down("[name=cashier_voucher_no]").getValue();
                    //me.flagsaveposting = 'fromposting';
                    me.flagposting = 3;
                    me.kasbank_id = data.kasbank_id;
                    me.dataSavecustome();
                    me.resetParam();
                } else {
                    me.messagedata = msg;
                    me.alertFormdataFailed();
                    me.resetParam();
                }
                break;
            case 'postingbank':
                if (valid == 'true') {
                    me.messagedata = msg;
                    me.alertFormdataSuccess();
                    //me.flagsaveposting == 'fromposting';
                    me.flagposting = 3;
                    me.kasbank_id = data.kasbank_id;
                    me.dataSavecustome();
                    me.resetParam();
                } else {
                    me.messagedata = msg;
                    me.alertFormdataFailed();
                    me.resetParam();
                }
                break;
            case 'posting':
                if (valid == 'true') {
                    me.loadingposting.hide();
                    Ext.Msg.show({
                        title: 'Success',
                        msg: msg,
                        icon: Ext.Msg.INFO,
                        buttons: Ext.Msg.OK,
                        fn: function () {
                            grid.getStore().reload();
                            me.resetParam();
                        }
                    });
                } else {
                    me.loadingposting.hide();
                    grid.getStore().reload();
                    Ext.Msg.show({
                        title: 'WARNING',
                        msg: msg,
                        buttons: Ext.Msg.OK,
                        icon: Ext.Msg.WARNING
                    });
                    me.resetParam();
                }
                break;
            case 'unposting':
                if (valid == true) {
                    me.loadingposting.hide();
                    Ext.Msg.show({
                        title: 'Success',
                        msg: msg,
                        icon: Ext.Msg.INFO,
                        buttons: Ext.Msg.OK,
                        fn: function () {
                            grid.getStore().reload();
                            me.resetParam();
                        }
                    });
                } else {
                    me.loadingposting.hide();
                    grid.getStore().reload();
                    Ext.Msg.show({
                        title: 'WARNING',
                        msg: msg,
                        buttons: Ext.Msg.OK,
                        icon: Ext.Msg.WARNING
                    });
                    me.resetParam();
                }
                break;
            case 'report':
                value = me.info.data;
                me.createWindows();
                me.submitReport(value);
                break;
        }
    },
    alertFormdataSuccess: function () {
        var me, form, store, grid;
        me = this;
        if (me.gridId === 1) {
            grid = me.getGridapprove();
        } else {
            grid = me.getGrid();
        }
        grid.getStore().reload();
        form = me.getFormdata();
        form.up('window').body.unmask();
        Ext.Msg.show({
            title: 'Success',
            msg: me.messagedata,
            icon: Ext.Msg.INFO,
            buttons: Ext.Msg.OK,
            fn: function () {
                me.formDataClose();
                me.sendRequestmail();

            }
        });
    },
    alertFormdataFailed: function () {
        var me, form, store, grid;
        me = this;
        if (me.gridId === 1) {
            grid = me.getGridapprove();
        } else {
            grid = me.getGrid();
        }
        grid.getStore().reload();
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
    resetParam: function () {
        var me;
        me = this;
        me.flagposting = 2;
        me.kasbank_id = 0;
        me.addby = 0;
        me.cashier_voucher_no = null;
        me.flagsaveposting = null;
        me.valueform = null;
        me.idheadervalue = 0;
        me.iddetailvalue = 0;
    },

    dataSearch: function () {
        resetTimer();
        var me = this;
        var grid;
        if (me.gridId === 1) {
            grid = me.getGridapprove();
        } else {
            grid = me.getGrid();
        }
        var form = me.getFormsearch().getForm();
        var store = grid.getStore();
        me.getFormsearch().down("[name=hideparam]").setValue('search');  // added on april 2016, ahmad riadi    
        var fields = me.getFormsearch().getValues();
        for (var x in fields)
        {
            store.getProxy().setExtraParam(x, fields[x]);
        }
        me.loadPage(store);
    },

    // START FOR DISABLE BUTTON ON GRID FORM
    gridSelectionChangedetail: function () {
        var me = this;
        var grid = me.getGriddetail(),
                row = grid.getSelectionModel().getSelection();
        grid.down('#btnEdit').setDisabled(row.length != 1);
        grid.down('#btnDelete').setDisabled(row.length < 1);
    },
    gridSelectionChangesubdetail: function () {
        var me = this;
        var grid = me.getGridsubdetail(),
                row = grid.getSelectionModel().getSelection();
        grid.down('#btnEdit').setDisabled(row.length != 1);
        grid.down('#btnDelete').setDisabled(row.length < 1);
    },
    griddetailAfterRender: function () {
        var me, grid, store;
        me = this;
        grid = me.getGriddetail();
        grid.down("toolbar button[action=create]").setDisabled(false);
        grid.down("toolbar button[action=update]").setDisabled(false);
        grid.down("actioncolumn").hidden = false;

    },
    gridsubdetailAfterRender: function () {
        var me, grid, store;
        me = this;
        grid = me.getGridsubdetail();
        grid.down("toolbar button[action=create]").setDisabled(false);
        grid.down("toolbar button[action=update]").setDisabled(false);
        grid.down("actioncolumn").hidden = false;
    },
    gridSelectionChangedesc: function () {
        var me = this;
        var grid = me.getGriddesc(),
                row = grid.getSelectionModel().getSelection();
        grid.down('#btnEdit').setDisabled(row.length != 1);
        grid.down('#btnDelete').setDisabled(row.length < 1);
    },
    griddescAfterRender: function () {
        var me, grid, store;
        me = this;
        grid = me.getGriddesc();
        grid.down("toolbar button[action=create]").setDisabled(false);
        grid.down("toolbar button[action=update]").setDisabled(false);
        grid.down("actioncolumn").hidden = false;
    },
    printVoucherdata: function () {
        var me, checked, grid, record, row, data, reportfile;
        me = this;
        if (me.gridId === 1) {
            grid = me.getGridapprove();
        } else {
            grid = me.getGrid();
        }
        checked = grid.down("toolbar [name=checkusecopyvp]").getValue();

        console.log('preprinted');
        console.log('print data');
        console.log(apps.project);
        console.log(apps.pt);


        Ext.Msg.confirm('Print Voucher', "Print Data Voucher dengan Pre Printed ?", function (btn) {
            if (btn == 'yes') {



                if (checked == true) {
                    if (apps.project == 1 && apps.pt == 1) {
                        reportfile = 'Vouchertransaction_kp_with_copy_preprinted';
                    } else {
                        reportfile = 'Vouchertransactionwithcopy'
                    }
                } else {
                    if (apps.project == 1 && apps.pt == 1) {
                        reportfile = 'Vouchertransaction_kp_preprinted';
                    } else {
                        reportfile = 'Vouchertransaction'
                    }
                }
                me.report = reportfile;
                record = grid.getSelectionModel().getSelection()[0];
                row = record['data'];
                data = row;
                me.setforAjax(data, 'report');
            } else {
                if (checked == true) {
                    if (apps.project == 1 && apps.pt == 1) {
                        reportfile = 'Vouchertransaction_kp_with_copy';
                    } else {
                        reportfile = 'Vouchertransactionwithcopy'
                    }
                } else {
                    if (apps.project == 1 && apps.pt == 1) {
                        reportfile = 'Vouchertransaction_kp';
                    } else {
                        reportfile = 'Vouchertransaction'
                    }
                }
                me.report = reportfile;
                record = grid.getSelectionModel().getSelection()[0];
                row = record['data'];
                data = row;
                me.setforAjax(data, 'report');
            }

        });
    },
    printVoucherdata_old: function () {
        var me, checked, grid, record, row, data, reportfile;
        me = this;
        if (me.gridId === 1) {
            grid = me.getGridapprove();
        } else {
            grid = me.getGrid();
        }
        checked = grid.down("toolbar [name=checkusecopyvp]").getValue();
        if (checked == true) {
            if (apps.project == '1' && apps.pt == '1') {
                reportfile = 'Vouchertransaction_kp_with_copy';
            } else {
                reportfile = 'Vouchertransactionwithcopy'
            }
        } else {
            reportfile = 'Vouchertransaction';
        }
        me.report = reportfile;
        record = grid.getSelectionModel().getSelection()[0];
        row = record['data'];
        data = row;
        me.setforAjax(data, 'report');
    },
    setforAjax: function (data, parameter) {
        var me;
        me = this;
        data['hideparam'] = parameter;
        me.urlrequest = 'cashier/vdrequest/print';
        me.senddata = data;
        me.AjaxRequest();
    },
    createWindows: function () {
        var me = this;
        me.winId = 'reportvoucherdepartmentpostingwindows';
        me.instantWindow('Panel', 800, 'Result ', 'state-report', me.winId, 'masterreport');
        me.win = desktop.getWindow(me.winId);
    },
    submitReport: function (value) {
        var me, report, html;
        me = this;
        report = 'transaction_voucher/' + me.report;
        html = me.Reportviewerjs(value, report);
        me.win.down("#MyReportPanel").body.setHTML(html);
        $("#Reportform").submit();

    },
    // END FOR DISABLE BUTTON ON GRID FORM
    formDataBeforeDestroy: function () {
        var me;
        me = this;
        //clean data main component
        me.flaggeneratevoucherno = 0;
        me.idheadervalue = 0;
        me.iddetailvalue = 0;
        me.project_id = 0;
        me.pt_id = 0;
        me.subgl = null;
        me.kelsub_id = 0;
        me.balancecoa = null;
        me.validdetail = 0;
        me.report = null;

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
        me.paramdetail.counter = 0;
        me.paramdetail.flagkelsub = 0;
        me.paramdetail.rowdetailtmp = 0;

        //clean data sub detail
        me.paramsubdetail.totalsubdetail = 0;
        me.paramsubdetail.iddetail = 0;
        me.paramsubdetail.store = null;
        me.paramsubdetail.data = null;
        me.paramsubdetail.grid = null;
        me.paramsubdetail.row = null;
        me.paramsubdetail.form = null;
        me.paramsubdetail.checkdata = false;
        me.paramsubdetail.object = null;
        me.paramsubdetail.rowdata = null;

        //clean data description
        me.paramdesc.totalsubdetail = 0;
        me.paramdesc.iddetail = 0;
        me.paramdesc.store = null;
        me.paramdesc.data = null;
        me.paramdesc.grid = null;
        me.paramdesc.row = null;
        me.paramdesc.form = null;
        me.paramdesc.checkdata = false;
        me.paramdesc.object = null;
        me.paramdesc.rowdata = null;

    },
    setStoreVendorbytypedata: function (form = '') {
        var me, store, form, state, type_vendor;
        me = this;
        form = me.getFormdata();
        state = form.up('window').state.toLowerCase();
        type_vendor = form.down('[name=type_vendor]').getValue();
        if (form != '') {
            store = me.getStore("Vendorcombo");
            store.clearFilter(true);

            if (type_vendor == 'internal' || type_vendor == 'external') {
                store.filterBy(function (record) {
                    if (record.data.type_vendor === type_vendor) {
                        return true;
                    } else {
                        return false;
                    }
                });
            } else {
                store.reload();
            }
    }
    },
});