Ext.define('Cashier.controller.Vendor', {
    extend: 'Cashier.library.template.controller.Controllermodule',
    alias: 'controller.vendor',
    requires: [
        'Cashier.template.ComboBoxFields',
        'Cashier.library.template.combobox.Jenisusahacombobox',
        'Cashier.library.template.combobox.Tipevendorcombobox',
        'Cashier.library.template.combobox.Tipepajakpphcombobox',
        'Cashier.library.template.combobox.Bankcombobox',
        'Cashier.library.template.combobox.Currencycombobox'
        //'Cashier.library.template.combobox.Tipepphcombobox'
    ],
    views: [
        'vendor.Panel',
        'vendor.Grid',
        'vendor.GridNote',
        'vendor.GridBank',
        'vendor.GridBankview',
        'vendor.GridEmail',
        'vendor.GridEmailview',
        'vendor.GridNoteview',
        'vendor.FormSearch',
        'vendor.FormData',
        'vendor.FormDataNote',
    ],
    stores: [
        'Vendor',
        'Jenisusahacombo',
        'Vendornote',
        'Vendorbank',
        'Vendorbankview',
        'Vendoremail',
        'Vendoremailview',
        'Vendornoteview',
        'Tipepajakcombopph',
        //'Tipepph',
        //'Tipepphcombo',
        'Tipevendor',
        'Ptbyusermulti',
        'Bank',
        'Currency'
    ],
    models: [
        'Vendor',
        'Vendornote',
        'Vendorbank',
        'Vendoremail',
        'Projectpt',
        'Bank',
        'Currency'
        //'Tipepph'
    ],
    refs: [
        {ref: 'grid', selector: 'vendorgrid'},
        {ref: 'griddetail', selector: 'vendornotegrid'},
        {ref: 'griddetailview', selector: 'vendornoteviewgrid'},
        {ref: 'gridbank', selector: 'vendorbankgrid'},
        {ref: 'gridbankview', selector: 'vendorbankviewgrid'},
        {ref: 'gridemail', selector: 'vendoremailgrid'},
        {ref: 'gridemailview', selector: 'vendoremailviewgrid'},
        {ref: 'gridnote', selector: 'vendornotegrid'},
        {ref: 'formsearch', selector: 'vendorformsearch'},
        {ref: 'formdata', selector: 'vendorformdata'},
        {ref: 'formdatajenisusaha', selector: 'vendorformdatajenisusaha'},
        {ref: 'formdatadetail', selector: 'vendornoteformdata'},
        {ref: 'formdatanote', selector: 'vendornoteformdata'},
        {ref: 'formdatabank', selector: 'vendorbankformdata'},
        {ref: 'formdataemail', selector: 'vendoremailformdata'},
    ],
    controllerName: 'vendor',
    formWidth: 670,
    fieldName: 'vendorname', // dari grid header
    fieldconfirmdetail: 'code', //dari grid detail
    bindPrefixName: 'Vendor',
    urlheader: 'cashier/vendor/',
    urlcommon: 'cashier/common/create', urldetail: 'cashier/vendor/vendornote', urlrequest: null, senddata: null, info: null, messagedata: null,
    idheaderfield: 'vendor_id', idheadervalue: 0, idheaderview: 0,
    filtercheckdetail: 'code',
    projectpt_id: 0, 
    projectptStore: null, 
    bankaccountnobefore: null, emailbefore: null, codebefore: null,
    constructor: function (configs) {
       this.callParent(arguments);
       var me = this;
       /*
       this.myConfig = new Cashier.library.box.Config({
           _controllerName: me.controllerName
        });
        */
     },
    init: function (application) {
        var me = this;
        //var events = new Cashier.library.box.tools.EventSelector();
        //this.control(events.getEvents(me, me.controllerName));
        //me.tools = new Cashier.library.box.tools.Tools({config: me.myConfig});

        this.control({
            //====================================START HEADER=============================================  
            'vendorpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: function (panel) {
                    this.panelAfterRender();
                    panel.up('window').maximize();
                    me.getFormsearch().down("[name=projectpt_id]").getStore().load();
                    Ext.Ajax.request({
                        url: 'cashier/common/read',
                        method: 'POST',
                        timeout:100000000,	
                        params: {
                            hideparam :'getptbyuserid',
                            project_project_id: apps.project,
                            pt_pt_id: apps.pt,
                            user_id: apps.uid,
                            start: 0,
                            limit: 1000,
                        },
                        success: function (response) {
                            response = Ext.JSON.decode(response.responseText);
                            //console.log(response.data[0]['projectpt_id']);
                            var projectpt_id = response.data[0]['projectpt_id'];
                            me.projectpt_id = projectpt_id;
                            me.projectptStore = response;

                            me.getFormdata();

                            me.getFormsearch().down("[name=projectpt_id]").setValue(parseInt(projectpt_id));
                            me.dataSearch();
                            var grid = me.getGrid();
                            grid.setLoading('Please wait');
                            var storear = grid.getStore();
                            storear.load({
                                callback: function () {
                                    grid.setLoading(false);
                                }
                            });
                        },
                        failure: function (response) {

                        }
                    });
                },
            },
            'vendorgrid': {
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
                            me.getDatadetailview();
                            if (counter > 0) {
                                me.getGrid().getSelectionModel().select(0, true);
                            }
                        }
                    });

                },
            },
            'vendorgrid toolbar button[action=create]': {
                click: function () {
                    me.paramheader.stateform = 'create';
                    this.formDataShow('create');
                }
            },
            'vendorgrid toolbar button[action=update]': {
                click: function () {
                    me.paramheader.stateform = 'update';
                    this.formDataShow('update');
                }
            },
            'vendorgrid toolbar button[action=destroy]': {
                click: this.dataDestroy
            },
            'vendorgrid toolbar button[action=print]': {
                click: this.dataPrint
            },
            'vendorgrid toolbar button[action=export]': {
                click: this.dataExport
            },
            'vendorgrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                click: this.gridActionColumnClick
            },
            'vendorformsearch button[action=search]': {
                click: this.dataSearch
            },
            'vendorformsearch button[action=reset]': {
                click: this.dataReset
            },
            'vendorformdata': {
                afterrender: this.formDataAfterRender,
                boxready: function () {
                    me.setFormDataAfterrender();
                }
            },
            'vendorformdata [name=vendor] ': {
                'keyup': function () {
                    var me, value;
                    me = this;
                },
            },
            'vendorformdata [name=objectname] ': {
                'keyup': function () {
                    var me, value;
                    me = this;
                },
            },
            'vendorformdata [name=projectpt_id] ': {
                'change': function () {
                    var me, value;
                    me = this;
                    me.setStoreTipePajak();
                },
            },
            'vendorformdatajenisusaha button[action=save]': {
                click: function () {
                    var me;
                    me = this;
                    me.dataSaveJenisUsaha();
                }
            },
            'vendorformdata button[action=save]': {
                click: me.dataSavevendor
            },
            'vendorformdata button[action=cancel]': {
                click: function () {
                    me.formDataClose();
                }

            },
            'vendorformdata button[action=create_jenisusaha]': {
                click: function () {
                    var me;
                    me = this;
                    me.FormDataCustomeShow('create', 500, 'Create Jenis Usaha ', 'Cashier.view.vendor.FormDataJenisUsaha', 'jenisusaha');
                }
            },
            //====================================END HEADER===============================================       

            //====================================START DETAIL=============================================      
            'vendornotegrid': {
                selectionchange: function() {
                    var me = this;
                    var grid = me.getGridnote(), row = grid.getSelectionModel().getSelection();
                    grid.down('#btnEditNote').setDisabled(row.length != 1);
                    grid.down('#btnDeleteNote').setDisabled(row.length < 1);
                },
                itemdblclick: this.griddetailitemdoubleclick,
                // itemdblclick: this.actiondataDetail,
            },
            'vendornotegrid toolbar button[action=create]': {
                click: function () {
                    me.paramdetail.stateform = 'create';
                    me.GenerateFormdata(me.paramdetail);
                }
            },
            'vendornotegrid toolbar [action=update]': {
                click: function() {
                    me.paramdetail.stateform = 'update';
                    me.GenerateFormdata(me.paramdetail);
                }
            },
            'vendornotegrid toolbar [action=destroy]': {
                click: function() {
                    var me = this;
                    var fd = me.getFormdata();
                    var state = fd.up('window').state;

                    if (state == 'create') {
                        var grid = me.getGridnote();
                        var store = grid.getStore();
                        var row = grid.getSelectionModel().getSelection();
                        var rec = grid.getSelectedRecord();
                        store.remove(rec);
                    } else {
                        this.customDataDestroy(me.getGridnote(), 'code');
                    }
                }
            },
            'vendornotegrid actioncolumn': {
                click: function (view, cell, row, col, e) {
                    me.gridActionColumndetailclick(view, cell, row, col, e);
                }
            },
            'vendornoteformdata': {
                afterrender: this.formDataDetailAfterRender
            },
            'vendornoteformdata button[action=save]': {
                click: function() {

                    var me = this;
                    var fd = me.getFormdata();
                    var state = fd.up('window').state;
                    var f = me.getFormdatanote();
                    var current_idx = f.selectedIndex;
                    var noduplicate = true;
                    var i = 0;

                    // validasi data double dulu
                    var store = me.getGridnote().getStore();

                    store.each(function(rec, idx) {
                        if (rec.get('code') == f.down('[name=code]').getValue() && idx != current_idx) {
                            noduplicate = false;
                        }
                        i++;
                    }) 

                    if (i == store.getCount()) {
                        if (noduplicate == false) {
                            Ext.Msg.show({
                                title: 'Alert',
                                msg: 'Vendor note code already exists',
                                icon: Ext.Msg.INFO,
                                buttons: Ext.Msg.OK,
                                fn: function () {
                                }
                            });
                        } else {
                            if (state == 'create') {
                                this.dataSaveDetailstore();
                            } else {
                                this.customDataSave(me.getFormdatanote(), me.getGridnote());
                            } 
                        }
                    }   
                }                     
            },
            //====================================END DETAIL================================================      
            
            // ================================= START DETAIL BANK =========================================

            'vendorbankgrid': {
                selectionchange: function() {
                    var me = this;
                    var grid = me.getGridbank(), row = grid.getSelectionModel().getSelection();
                    grid.down('#btnEditBank').setDisabled(row.length != 1);
                    grid.down('#btnDeleteBank').setDisabled(row.length < 1);
                }
            },
            'vendorbankgrid [action=create]': {
                click: function() {
                    var me;
                    me = this;
                    me.FormDataCustomeShow('create', 550, 'Create New Bank Account', 'Cashier.view.vendor.FormDataBank', 'bank');
                }
            },
            'vendorbankgrid toolbar [action=update]': {
                click: function() {
                    var me;
                    me = this;
                    me.FormDataCustomeShow('update', 550, 'Update Bank Account', 'Cashier.view.vendor.FormDataBank', 'bank');
                }
            },
            'vendorbankgrid toolbar [action=destroy]': {
                click: function() {
                    var me = this;
                    var fd = me.getFormdata();
                    var state = fd.up('window').state;

                    if (state == 'create') {
                        var grid = me.getGridbank();
                        var store = grid.getStore();
                        var row = grid.getSelectionModel().getSelection();
                        var rec = grid.getSelectedRecord();
                        store.remove(rec);
                    } else {
                        this.customDataDestroy(me.getGridbank(), 'bank_account_name');
                    }
                }
            },
            'vendorbankformdata': {
                afterrender: function() {
                    var me = this;
                    var f = me.getFormdatabank();
                    var state = f.up('window').state;

                    f.down("[name=bank_id]").getStore().load();
                    f.down("[name=currency]").getStore().load();

                    switch (state) {
                        case 'create':
                            f.down("[name=vendor_id]").setValue(me.idheadervalue);
                            f.down("[name=vendor_bankacc_id]").setValue('0');
                            break;
                        case 'update':
                            var grid = me.getGridbank();
                            var row = grid.getSelectionModel().getSelection();
                            var rec = grid.getSelectedRecord();
                            f.kosongGa = grid.getSelectedRow();
                            f.selectedIndex = grid.getStore().indexOf(rec);
                            f.loadRecord(rec);

                            me.formatCurrencyFormdata(me.controllerName, f);

                            me.bankaccountnobefore = f.down("[name=bank_account_no]").getValue();

                            break;
                        default:
                    }
                }
            },
            'vendorbankformdata [action=save]': {
                click: function() {

                    var me = this;
                    var fd = me.getFormdata();
                    var state = fd.up('window').state;
                    var f = me.getFormdatabank();
                    var current_idx = f.selectedIndex;
                    var noduplicate = true;
                    var i = 0;

                    // validasi data double dulu
                    var store = me.getGridbank().getStore();

                    store.each(function(rec, idx) {
                        if (rec.get('bank_account_no') == f.down('[name=bank_account_no]').getValue() && idx != current_idx) {
                            noduplicate = false;
                        }
                        i++;
                    }) 

                    if (i == store.getCount()) {
                        if (noduplicate == false) {
                            Ext.Msg.show({
                                title: 'Alert',
                                msg: 'Account number already exists',
                                icon: Ext.Msg.INFO,
                                buttons: Ext.Msg.OK,
                                fn: function () {
                                }
                            });
                        } else {
                            if (state == 'create') {
                                this.dataSaveBankstore();
                            } else {
                                this.customDataSave(me.getFormdatabank(), me.getGridbank());
                            }  
                        }
                    }                
                }
            },

            // ================================= END DETAIL BANK ===========================================

            // ================================= START DETAIL EMAIL ========================================

            'vendoremailgrid': {
                selectionchange: function() {
                    var me = this;
                    var grid = me.getGridemail(), row = grid.getSelectionModel().getSelection();
                    grid.down('#btnEditEmail').setDisabled(row.length != 1);
                    grid.down('#btnDeleteEmail').setDisabled(row.length < 1);
                }
            },
            'vendoremailgrid [action=create]': {
                click: function() {
                    var me;
                    me = this;
                    me.FormDataCustomeShow('create', 550, 'Create New Email', 'Cashier.view.vendor.FormDataEmail', 'email');
                }
            },
            'vendoremailgrid toolbar [action=update]': {
                click: function() {
                    var me;
                    me = this;
                    me.FormDataCustomeShow('update', 550, 'Update Email', 'Cashier.view.vendor.FormDataEmail', 'email');
                }
            },
            'vendoremailgrid toolbar [action=destroy]': {
                click: function() {

                    var me = this;
                    var fd = me.getFormdata();
                    var state = fd.up('window').state;

                    if (state == 'create') {
                        var grid = me.getGridemail();
                        var store = grid.getStore();
                        var row = grid.getSelectionModel().getSelection();
                        var rec = grid.getSelectedRecord();
                        store.remove(rec);
                    } else {
                        this.customDataDestroy(me.getGridemail(), 'email');
                    }
                }
            },
            'vendoremailformdata': {
                afterrender: function() {
                    var me = this;
                    var f = me.getFormdataemail();
                    var state = f.up('window').state;

                    switch (state) {
                        case 'create':
                            f.down("[name=vendor_id]").setValue(me.idheadervalue);
                            f.down("[name=vendor_email_id]").setValue('0');
                            break;
                        case 'update':
                            var grid = me.getGridemail();
                            var row = grid.getSelectionModel().getSelection();
                            var rec = grid.getSelectedRecord();
                            f.kosongGa = grid.getSelectedRow();
                            f.selectedIndex = grid.getStore().indexOf(rec);
                            f.loadRecord(rec);
                            break;
                        default:
                    }
                }
            },
            'vendoremailformdata [action=save]': {
                click: function() {
                    var me = this;
                    var fd = me.getFormdata();
                    var state = fd.up('window').state;
                    var f = me.getFormdataemail();
                    var current_idx = f.selectedIndex;
                    var noduplicate = true;
                    var i = 0;

                    // validasi data double dulu
                    var store = me.getGridemail().getStore();

                    store.each(function(rec, idx) {
                        if (rec.get('email') == f.down('[name=email]').getValue() && idx != current_idx) {
                            noduplicate = false;
                        }
                        i++;
                    }) 

                    if (i == store.getCount()) {
                        if (noduplicate == false) {
                            Ext.Msg.show({
                                title: 'Alert',
                                msg: 'Email already exists',
                                icon: Ext.Msg.INFO,
                                buttons: Ext.Msg.OK,
                                fn: function () {
                                }
                            });
                        } else {
                            if (state == 'create') {
                                this.dataSaveEmailstore();
                            } else {
                                this.customDataSave(me.getFormdataemail(), me.getGridemail());
                            }  
                        }
                    }
                }
            }

            // ================================= END DETAIL EMAIL ==========================================
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
        fromlocation: 'Cashier.view.vendor.FormDataNote',
        formtitle: 'Form Note', formicon: 'icon-form-add',
        formid: 'win-formvendornote', formlayout: 'fit',
        formshadow: 'frame', formmask: 'Loading...',
        formwidth: 500, formtimeout: 0,
        stateform: null, formaction: null, formproperties: null, formwindows: null,
        //end formgeneate
        //start properties form
        iddetail: 0, store: null, data: null, record: null, grid: null, row: null, form: null,
        checkdata: false, object: null, rowdata: null, action: null,
        //start properties form
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
            me.idheaderview = row.vendor_id;
            me.getDatadetailview();
        }
    },
    ActionHeader: function () {
        var me, ph, pd = '';
        me = this;
        ph = me.paramheader;

        pd = me.paramdetail;
        ph.form = me.getFormdata();
        ph.stateform = me.getFormdata().up('window').state.toLowerCase();
        switch (ph.stateform) {
            case 'create':

                // REMOVE STORE
                pd.store = me.getGridnote().getStore();
                pd.store.removeAll();

                me.getGridbank().getStore().removeAll();
                me.getGridemail().getStore().removeAll();

                me.idheadervalue = '0';
                me.setValue(me, 'vendor_id', '0');
                ph.form.down('[name=type_vendor]').setValue('internal');
                ph.form.down('[name=projectpt_id]').setValue(me.projectpt_id);
                ph.form.down('[name=jenisusaha_id]').setValue(1);
               
                me.getVendorCode('create');

                me.projectptStore = ph.form.down('[name=projectpt_id]').getStore();
                
                setTimeout(function(){ 
                    me.projectptStore = ph.form.down('[name=projectpt_id]').getStore();
                    me.setDefaultProjectPt();
                }, 2000);

                break;
            case 'update':
                var grid = me.getGrid();
                var rec = grid.getSelectedRecord();
                ph.form.down('[name=type_pph]').setValue(rec.get("type_pph"));
                ph.form.down('[name=kelas_kontraktor]').setValue(rec.get("kelas_kontraktor"));
                me.idheadervalue = me.getValue(me, 'vendor_id', 'value');
                me.getDatadetail();
                 me.getVendorCode('update');
                break;
            default:
        }
    },
    cellgridDetail: function () {
        var me, pd = '';
        me = this;
        pd = me.paramdetail;
        pd.grid = me.getGridnote();
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

        // load data notes
        var storenote = me.getGriddetailview().getStore();
        storenote.getProxy().setExtraParam('vendor_id', me.idheaderview);
        storenote.load();

        // load data bank
        var storebank = me.getGridbankview().getStore();
        storebank.getProxy().setExtraParam('vendor_id', me.idheaderview);
        storebank.load();

        // Load data email
        var storeemail = me.getGridemailview().getStore();
        storeemail.getProxy().setExtraParam('vendor_id', me.idheaderview);
        storeemail.load();
    },
    getDatadetail: function () {
        var me, pd, counter = '';
        me = this;
        pd = me.paramdetail;

        // load data notes
        var storenote = me.getGridnote().getStore();
        storenote.clearFilter();
        storenote.getProxy().setExtraParam('vendor_id', me.idheadervalue);
        storenote.load();

        // load data bank
        var storebank = me.getGridbank().getStore();
        storebank.clearFilter();
        storebank.getProxy().setExtraParam('vendor_id', me.idheadervalue);
        storebank.load();

        // Load data email
        var storeemail = me.getGridemail().getStore();
        storeemail.clearFilter();
        storeemail.getProxy().setExtraParam('vendor_id', me.idheadervalue);
        storeemail.load();
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
    formDataDetailAfterRender: function () {
        var me, pd, action = '';
        me = this;
        pd = me.paramdetail;
        pd.form = me.getFormdatadetail();
        switch (pd.stateform) {
            case 'create':
                pd.form.down("[name=vendor_id]").setValue(me.idheadervalue);
                pd.form.down("[name=vendornote_id]").setValue('0');
                break;
            case 'update':

                var grid = me.getGridnote();
                var row = grid.getSelectionModel().getSelection();
                var rec = grid.getSelectedRecord();
                pd.form.kosongGa = grid.getSelectedRow();
                pd.form.selectedIndex = grid.getStore().indexOf(rec);
                pd.form.loadRecord(rec);

                // pd.form.loadRecord(pd.rowdata);
                // pd.form.selectedIndex = me.getGridnote().getStore().indexOf(pd.rowdata);
                break;
            default:
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
                me.dataDestroydetailwithflag();
                break;
            default:
                returndata = "No action selected";
        }
    },
    dataSavevendor: function () {
        var me, form, formdata, addingRecord, vp, vps, x, store, stotedetail,
                valuedata, idProperty, rec, paramdata, rowdata, state_submit, idProperty;
        me = this;
        form = me.getFormdata();
        formdata = me.getFormdata().getForm();

        if (formdata.isValid()) {
            resetTimer();
            store = Ext.data.StoreManager.lookup('Vendor');
            valuedata = formdata.getValues();
            form.up('window').body.mask('Saving data, please wait ...');
            state_submit = me.getFormdata().up('window').state.toLowerCase();
//            if (valuedata.klu == undefined) {
//                valuedata['klu'] = 0;
//            }
//            if (valuedata.bc == undefined) {
//                valuedata['bc'] = 0;
//            }

            switch (state_submit) {
                case 'create':

                    // store.add(valuedata);
                    addingRecord = true;
                    valuedata['hideparam'] = state_submit;
                   // me.getVendorCode(1, function () {
                    me.senddata = valuedata;
                    me.urlrequest = me.urlheader + state_submit;
                    me.AjaxRequest();
                    // me.dataSaveBank();
                    // });

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
    dataSaveJenisUsaha: function () {
        var me, formdata, form, values, store;
        me = this;
        formdata = me.getFormdatajenisusaha();
        form = formdata.getForm();
        if (form.isValid()) {
            values = form.getValues();
            formdata.up('window').body.mask('Saving data Jenis Usaha, please wait ...');
            Ext.Ajax.request({
                url: 'cashier/jenisusaha/create',
                method: 'POST',
                timeout: 45000000,
                params: {
                    data: Ext.encode(values)
                },
                success: function (response) {
                    var data = Ext.JSON.decode(response.responseText);
                    formdata.up('window').body.unmask();
                    if (data.success == 'true') {
                        Ext.data.StoreManager.lookup('Jenisusahacombo').reload();
                        Ext.Msg.show({
                            title: 'Success',
                            msg: data.msg,
                            icon: Ext.Msg.INFO,
                            buttons: Ext.Msg.OK,
                            fn: function () {
                                formdata.up('window').close();
                            }
                        });
                    } else {
                        Ext.Msg.show({
                            title: 'Failure',
                            msg: 'Error: ' + data.msg,
                            icon: Ext.Msg.ERROR,
                            buttons: Ext.Msg.OK
                        });
                    }
                },
                failure: function (response) {
                    formdata.up('window').close();
                }
            });
        }
    },
    dataSaveDetaildb: function () {

        var me, store, counter, state, data, ph, pd, iddata;
        me = this;
        ph = me.paramheader;
        pd = me.paramdetail;
        var urldetail = 'cashier/vendor/';
        var f = me.getFormdata();
        var data_array = [];

        store = me.getGridnote().getStore();
        store.clearFilter(true);
        if (ph.stateform == 'create') {
            store.filter(me.idheaderfield, '0');
        } else {
            store.filter(me.idheaderfield, me.idheadervalue);
        }

        counter = store.getCount();
        if (counter > 0) {

            store.each(function (record, index) {
                iddata = record.get("vendornote_id");
                state = record.get("statedata");
                data = record['data'];
                data['vendor_id'] = me.idheadervalue;
                data['parametersql'] = state;
                data['hideparam'] = 'default';

                data_array.push(data);
            });
        }

        if (data_array.length > 0) {
            Ext.Ajax.request({
                url: 'cashier/vendor/vendornotecreate',
                method: 'POST',
                timeout: 45000000,
                params: {
                    data: Ext.encode(data_array),
                    hideparam: 'default',
                    parametersql: state
                },
                success: function (response) {
                    f.up('window').body.unmask();
                    f.up('window').close();
                },
                failure: function (response) {
                }
            });
        }
    },
    dataSaveBank: function () {
        var me, store, counter, state, data, ph, pd, iddata;
        me = this;
        ph = me.paramheader;
        pd = me.paramdetail;
        var urldetail = 'cashier/vendor/';
        var f = me.getFormdata();
        var data_array = [];

        store = me.getGridbank().getStore();
        store.clearFilter(true);
        if (ph.stateform == 'create') {
            store.filter(me.idheaderfield, '0');
        } else {
            store.filter(me.idheaderfield, me.idheadervalue);
        }

        counter = store.getCount();
        if (counter > 0) {

            store.each(function (record, index) {
                iddata = record.get("vendor_bankacc_id");
                state = record.get("statedata");
                data = record['data'];
                data['vendor_id'] = me.idheadervalue;
                data['parametersql'] = state;
                data['hideparam'] = 'default';
                data['modesave'] = 'collective';

                data_array.push(data);
            });
        }

        if (data_array.length > 0) {
            Ext.Ajax.request({
                url: 'cashier/vendor/vendorbankcreate',
                method: 'POST',
                timeout: 45000000,
                params: {
                    data: Ext.encode(data_array),
                    hideparam: 'default',
                    parametersql: state
                },
                success: function (response) {
                },
                failure: function (response) {
                }
            });
        }
        
        
    },
    dataSaveEmail: function () {
        var me, store, counter, state, data, ph, pd, iddata;
        me = this;
        ph = me.paramheader;
        pd = me.paramdetail;
        var urldetail = 'cashier/vendor/';
        var f = me.getFormdata();
        var data_array = [];

        store = me.getGridemail().getStore();
        store.clearFilter(true);
        if (ph.stateform == 'create') {
            store.filter(me.idheaderfield, '0');
        } else {
            store.filter(me.idheaderfield, me.idheadervalue);
        }

        counter = store.getCount();
        if (counter > 0) {

            store.each(function (record, index) {
                iddata = record.get("vendor_email_id");
                state = record.get("statedata");
                data = record['data'];
                data['vendor_id'] = me.idheadervalue;
                data['parametersql'] = state;
                data['hideparam'] = 'default';

                data_array.push(data);
            });
        }

        if (data_array.length > 0) {
            Ext.Ajax.request({
                url: 'cashier/vendor/vendoremailcreate',
                method: 'POST',
                timeout: 45000000,
                params: {
                    data: Ext.encode(data_array),
                    hideparam: 'default',
                    parametersql: state
                },
                success: function (response) {
                },
                failure: function (response) {
                }
            });
        }
        
        
    },
    dataSaveDetailstore: function () {
        var me, pd = '';
        me = this;
        pd = me.paramdetail;

        pd.form = me.getFormdatadetail().getForm();
        if (pd.form.isValid()) {
            pd.grid = me.getGriddetail();
            pd.store = me.getGriddetail().getStore();
            pd.row = pd.form.getValues();
            pd.row[me.idheaderfield] = me.idheadervalue;
            if (pd.row.vendornote_id == '0') {
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
                        me.buildWarningAlert("Sorry code = " + pd.row.code + " ,already exist in this vendor");
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
            me.getFormdatadetail().up('window').close();
        }
    },
    dataSaveBankstore: function () {
        var me, pd = '';
        me = this;
        pd = me.paramdetail;
        state = me.getFormdatabank().up('window').state;

        pd.form = me.getFormdatabank().getForm();
        if (pd.form.isValid()) {
            pd.grid = me.getGridbank();
            pd.store = me.getGridbank().getStore();
            pd.row = pd.form.getValues();
            pd.row[me.idheaderfield] = me.idheadervalue;
            if (pd.row.vendor_bankacc_id == '0') {
                pd.row['statedata'] = 'create';
            } else {
                pd.row['statedata'] = 'update';
            }

            // me.Checkdatadetail();
            switch (state) {
                case 'create':

                    pd.row['bank_name'] = me.getFormdatabank().down("[name=bank_id]").getRawValue();
                    pd.row['currency_word'] = me.getFormdatabank().down("[name=currency]").getRawValue();
                    pd.row['active'] = 1;

                    // if (pd.checkdata == false) {
                        pd.store.add(pd.row);
                        pd.store.commitChanges();
                    // } else {
                    //     me.buildWarningAlert("Sorry code = " + pd.row.code + " ,already exist in this vendor");
                    // }
                    break;
                case 'update':
                    pd.record = pd.store.getAt(pd.store.indexOf(pd.grid.getSelectionModel().getSelection()[0]));
                    pd.record.beginEdit();
                    pd.record.set(pd.row);
                    pd.record.endEdit();
                    pd.store.commitChanges();
                    break;
            }
            me.getFormdatabank().up('window').close();
        }
    },
    dataSaveEmailstore: function () {
        var me, pd = '';
        me = this;
        pd = me.paramdetail;
        state = me.getFormdataemail().up('window').state;

        pd.form = me.getFormdataemail().getForm();
        if (pd.form.isValid()) {
            pd.grid = me.getGridemail();
            pd.store = me.getGridemail().getStore();
            pd.row = pd.form.getValues();
            pd.row[me.idheaderfield] = me.idheadervalue;
            if (pd.row.vendor_email_id == '0') {
                pd.row['statedata'] = 'create';
            } else {
                pd.row['statedata'] = 'update';
            }

            // me.Checkdatadetail();
            switch (state) {
                case 'create':

                    pd.row['active'] = 1;

                    // if (pd.checkdata == false) {
                        pd.store.add(pd.row);
                        pd.store.commitChanges();
                    // } else {
                    //     me.buildWarningAlert("Sorry code = " + pd.row.code + " ,already exist in this vendor");
                    // }
                    break;
                case 'update':
                    pd.record = pd.store.getAt(pd.store.indexOf(pd.grid.getSelectionModel().getSelection()[0]));
                    pd.record.beginEdit();
                    pd.record.set(pd.row);
                    pd.record.endEdit();
                    pd.store.commitChanges();
                    break;
            }
            me.getFormdataemail().up('window').close();
        }
    },
    Checkdatadetail: function () {
        var me, status, returndata, pd, filter = '';
        me = this;
        pd = me.paramdetail;
        pd.checkdata = false;
        pd.store.each(function (record)
        {

            if (record.data[me.idheaderfield] == pd.row.vendor_id &&
                    record.data[me.filtercheckdetail] == pd.row.code
                    )
            {
                pd.checkdata = true;
            }
        });
    },
    AjaxRequest: function (isAsync = true) {
        var me;
        me = this;
        Ext.Ajax.request({
            url: me.urlrequest,
            method: 'POST',
            timeout: 45000000,
            async: isAsync,
            params: {
                data: Ext.encode(me.senddata)
            },
            success: function (response) {
                
                me.info = Ext.JSON.decode(response.responseText);
                if (me.senddata['hideparam'] == 'exportdata') {
                    me.setSuccessEventExport();
                } else {
                    me.setSuccessEvent();
                }
            },
            failure: function (response) {
                me.getFormdata().up('window').close();
            }
        });
    },
    setSuccessEventExport: function () {

        var me = this;
        Ext.getBody().unmask();
        var file_path = me.info.data.url;  
        var a = document.createElement('A');
        a.href = file_path;
        a.download = file_path.substr(file_path.lastIndexOf('/') + 1);
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        Ext.getBody().unmask();
    },
    setSuccessEvent: function () {
        var me = this;
        var data = me.info.data;
        var f = me.getFormdata();

        switch (me.info.parameter) {
            case 'default':
                break;
            case 'getvendorid':
                me.idheadervalue = data[0].vendor_id;
                break;
            case 'create':
                if (me.info.success == 'true') {
                    me.idheadervalue = me.info.data.vendor_id;
                    
                    me.dataSaveBank(); 
                    me.dataSaveEmail();
                    me.dataSaveDetaildb();
                    // me.dataSaveDetaildb();
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
                    me.idheadervalue = me.info.data.vendor_id;
                    // me.dataSaveDetaildb();
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
        Ext.data.StoreManager.lookup('Vendor').reload();
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
        Ext.data.StoreManager.lookup('Vendor').reload();
        form = me.getFormdata();
        form.up('window').body.unmask();
        Ext.Msg.show({
            title: 'Failure',
            msg: 'Error: ' + me.messagedata,
            icon: Ext.Msg.ERROR,
            buttons: Ext.Msg.OK
        });
    },
    getVendorCode: function (state) {
        var me = this;
        var p = me.getFormdata();
        if(state == 'create'){
        	 p.setLoading("Please wait generate vendor code");
        }else{
        	 p.setLoading("Please wait...");
        }
       

        Ext.Ajax.request({
                url: 'cashier/voucher/read',
                method: 'POST',
                timeout:100000000,  
                params: {module: 'voucher', 
                mode_read: 'vendorcode', 
                project_project_id: apps.project,
                pt_id: apps.pt
            },
            success: function (data, model) {
                try {
                    if (data) {
                        var obj = JSON.parse(data.responseText);
                        if(state == 'create'){
                        	 	if(obj.data.code == 'Auto Generate'){
		                       		p.down("[name=vendorcode]").setReadOnly(true);
		                       		p.down("[name=projectcode]").setValue(obj.data.project_code);
		                       	}else{
		                       		p.down("[name=vendorcode]").setReadOnly(false);
		                       		p.down("[name=projectcode]").setValue('');
		                       	}
		                        p.down("[name=vendorcode]").setValue(obj.data.code);

                        }else if(state == 'update'){

                        	if(obj.data.code == 'Auto Generate'){
		                       		p.down("[name=vendorcode]").setReadOnly(true);
		                       		
		                       	}else{
		                       		p.down("[name=vendorcode]").setReadOnly(false);
		                       	
		                       	}

                        }
                      
                    }
                    if (typeof callback === "function") {
                        callback();
                    }
                }
                catch (err) {
                    console.log(err.message);
                    me.alertFormdataFailed();

                }
                p.setLoading(false);
            },
            failure: function (response) {
                me.alertFormdataFailed();
            }
        });

    },
    setDefaultProjectPt: function () {
        var me = this;
        p = me.getFormdata();
        var projectptStore = me.projectptStore.data.items;

        /*SET DEFAULT PT*/

        var current_pt_id = localStorage.getItem('current_pt_id');
        var current_type_vendor = localStorage.getItem('current_type_vendor');

        if(current_pt_id == null){
           current_pt_id = me.projectpt_id;
        }

        if(current_type_vendor == null){
           current_type_vendor = 'internal';
        }
        
        if(current_type_vendor == 'all'){
           current_type_vendor = 'internal';
        }

        p.down("[name=type_vendor]").setValue(current_type_vendor);

        projectptStore.forEach(function(entry) {
            if(entry.data.pt_id == current_pt_id){
                p.down("[name=projectpt_id]").setValue(entry.data.projectpt_id);
                setTimeout(function(){ 
                    me.setStoreTipePajak();
                }, 2000);
                
            }
        });


    },
    setStoreTipePajak: function () {
        var me, store, form;
        me = this;
        form =  me.getFormdata();

        rowdata = form.down('[name=projectpt_id]').valueModels[0].raw;

        storepph = me.getStore("Tipepajakcombopph");
        storepph.load({
            params: {
                "hideparam": 'gettipepajak',
                "project_id": rowdata.project_id,
                "pt_id": rowdata.pt_id,
                "department_id": 0
            },
            callback: function (records, operation, success) {
                storepph.filterBy(function (rec, id) {
                    if(rec.get('tipepajak') === "PPH") {
                        return true;
                    }
                    else {
                        return false;
                    }
                });
            }
        });


    },
    customDataSave: function (getform, getgrid) {
        var me = this;
        getform.down("[name=hideparam]").setValue('default'); // added on april 2016, ahmad riadi     

        var fd = me.getFormdata();
        var form = getform.getForm();

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
                    var x = getform.down('[name=' + vp.field + ']');
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
            me.unformatCurrencyFormdata(me, getform);
            var store = null;
            var fida = me.getFinalData(form.getValues());

            if (me.instantCreateMode) {
                store = _Apps.getController(me.callerId).getInstanCreateStorex(me.controllerName);
            } else {
                /* Mendefinisikan store sendiri pada saat proses simpan/edit 
                 * yang ada di me.storeProcess
                 * */
                if (!me.storeProcess) {
                    store = getgrid.getStore();
                    //console.log(store);
                } else {
                    store = me.storeProcess;
                }
            }

            var msg = function () {
                getform.setLoading('Saving data, please wait ...');
            };
            var state_submit = getform.up('window').state.toLowerCase();

            switch (state_submit) {
                case 'create': 
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
                    getform.setLoading(false);
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
                            getform.up('window').close();
                        }
                    });

                },
                failure: function (batch, options) {
                    var errMsg = (batch.proxy.getReader().jsonData.msg ? batch.proxy.getReader().jsonData.msg : 'Unable to save data.');

                    getform.setLoading(false);
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
    customDataDestroy: function (getgrid, fieldname) {
        var me = this;
        var rows = getgrid.getSelectionModel().getSelection();
        if (rows.length < 1) {
            Ext.Msg.alert('Info', 'No record selected !');
            return;
        } else {
            var confirmmsg, successmsg, failmsg;
            var recordcounttext = rows.length + ' record' + (rows.length > 1 ? 's' : '');
            var store = getgrid.getStore();
            if (rows.length == 1) {
                var selectedRecord = '[' + store.getAt(store.indexOf(rows[0])).get(fieldname) + ']';
                confirmmsg = 'Delete ' + selectedRecord + ' ?';
                failmsg = 'Error: Unable to delete ' + selectedRecord + '.';
            } else {
                confirmmsg = 'This action will delete ' + recordcounttext + '.<br />Continue ?';
                failmsg = 'Error: Unable to delete data.';
            }
            Ext.Msg.confirm('Delete Data', confirmmsg, function (btn) {
                if (btn == 'yes') {
                    resetTimer();
                    var msg = function () {
                        getgrid.up('window').mask('Deleting data, please wait ...');
                    };
                    for (var i = 0; i < rows.length; i++) {
                        store.remove(rows[i]);
                    }

                    store.on('beforesync', msg);
                    store.sync({
                        success: function (s) {
                            getgrid.up('window').unmask();
                            var successcount = parseInt(Ext.decode(s.operations[0].response.responseText).total, 10);
                            var successmsg = (rows.length == 1 ? selectedRecord : (successcount != rows.length ? successcount + ' of ' : '') + recordcounttext) + ' deleted successfully.';
                            store.un('beforesync', msg);
                            store.reload();
                            if (typeof Ext.StoreManager.lookup(me.stores[0]) != 'undefined') {
                                Ext.StoreManager.lookup(me.stores[0]).load({params: {limit: 0}});
                            }
                            Ext.Msg.show({
                                title: 'Success',
                                msg: successmsg,
                                icon: Ext.Msg.INFO,
                                buttons: Ext.Msg.OK
                            });
                        },
                        failure: function (batch, options) {
                            // added on april 2016, ahmad riadi
                            var parameter = (batch.proxy.getReader().jsonData.param ? batch.proxy.getReader().jsonData.param : 'no');
                            var pesan = (batch.proxy.getReader().jsonData.msg ? batch.proxy.getReader().jsonData.msg : 'Unable to save data.');
                            if (parameter == 'used') {
                                failmsg = pesan;
                            } else {
                                failmsg = failmsg + ' The data may have been used.';
                            }

                            getgrid.up('window').unmask();
                            store.un('beforesync', msg);
                            store.reload();
                            Ext.Msg.show({
                                title: 'Failure',
                                msg: failmsg,
                                icon: Ext.Msg.ERROR,
                                buttons: Ext.Msg.OK
                            });
                        }
                    });
                }
            });
        }
    },
    checkDataDouble: function(type, param, param2) {

        var me = this;
        var store = '';

        if (type == 'bank') {
            store = me.getGridbank().getStore();

            if (store.findExact('bank_account_no', param) == 1) {
                Ext.Msg.show({
                    title: 'Alert',
                    msg: 'Account number already exists',
                    icon: Ext.Msg.INFO,
                    buttons: Ext.Msg.OK
                });
            } 
        }   
    },
    dataExport: function() {

        var me = this;
        var fs = me.getFormsearch();
        var project_id = fs.down("[name=projectpt_id]").valueModels[0].data.project_id;
        var pt_id = fs.down("[name=projectpt_id]").valueModels[0].data.pt_id;
        var projectname = fs.down("[name=projectpt_id]").valueModels[0].data.projectname;

        me.senddata = {
            hideparam: 'exportdata',
            pt_id: pt_id,
            project_id: project_id,
            project_name: projectname
        }; 
        me.urlrequest = 'cashier/vendor/create';
        Ext.getBody().mask("Please wait...");
        me.AjaxRequest();
    }
});