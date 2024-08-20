//default dataflow = Out
//realisasi menjadi kas atau bank ada di kasir ketika posting
Ext.define('Cashier.controller.KasbondeptPosting', {
    extend: 'Cashier.library.template.controller.Controllermodule',
    requires: [
        'Cashier.template.ComboBoxFields',
        'Cashier.library.template.combobox.Coadeptvouchercombobox',
        'Cashier.library.template.combobox.VoucherprefixcomboboxNew',
         'Cashier.library.template.combobox.Voucherprefixcashbackcombobox',
        'Cashier.library.template.combobox.Employeehrdcombobox',
        'Cashier.library.template.combobox.Departmentcombobox',
        'Cashier.library.template.combobox.Ptusercombobox',
        'Cashier.library.template.combobox.Cashflowcombobox',
        'Cashier.library.template.combobox.Voucherprefixbankcombobox',
        'Cashier.library.BrowseCashier',
        'Cashier.library.template.combobox.Statusnewcombobox',
    ],
    alias: 'controller.KasbondeptPosting',
    views: [
        'kasbondeptposting.Panel',
        'kasbondeptposting.Grid',
        'kasbondeptposting.Griddetail',
        'kasbondeptposting.Gridsubdetail',
        'kasbondeptposting.FormSearch',
        'kasbondeptposting.FormData',
        'kasbondeptposting.FormDataDetail',
        'kasbondeptposting.FormDataSubDetail',
        'kasbondeptposting.FormCashback',
        'kasbondeptposting.Gridattachmentdetail',
        // SEFTIAN ALFREDO 03/02/22
        'kasbondeptposting.FormEditRemaining',
    ],
    stores: [
        'Kasbondeptposting',
        'KasbondeptpostingNew',
        'Kasbondeptpostingdetail',
        'Kasbondeptpostingsubdetail',
        'Ptbyuser',
        'Department',
        'Coadeptcombo',
        'VoucherprefixsetupcomboNew',
        'Employee',
        'Deptprefixcombo',
        'Ptbyuser',
        'Cashflow',
        'Voucherprefixcashbackcombo',
        'Statuscombonew',
         'Kasbondeptattachmentdetail',
    ],
    models: [
        'Kasbondeptposting',
        'Kasbondeptpostingnew',
        'Kasbondeptpostingdetail',
        'Kasbondeptpostingsubdetail',
        'Kasbondeptattachmentdetail',
    ],
    refs: [
        {ref: 'grid', selector: 'kasbondeptpostinggrid'},
        {ref: 'gridnew', selector: 'kasbondeptpostinggridnew'},
        {ref: 'griddetail', selector: 'kasbondeptpostinggriddetail'},
        {ref: 'gridsubdetail', selector: 'kasbondeptpostinggridsubdetail'},
        {ref: 'formsearch', selector: 'kasbondeptpostingformsearch'},
        {ref: 'formdata', selector: 'kasbondeptpostingformdata'},
        {ref: 'formdatadetail', selector: 'kasbondeptpostingdetailformdata'},
        {ref: 'formdatasubdetail', selector: 'kasbondeptpostingsubdetailformdata'},
        {ref: 'formcashback', selector: 'kasbondeptpostingformcashback'},
        {ref: 'gridattachmentdetail', selector: 'kasbondeptpostinggridattachmentdetail'},
        // SEFTIAN ALFREDO 03/02/22
        {ref: 'formeditremaining', selector: 'kasbondeptpostingformeditremaining'},
        {
            ref: 'chequegridcashbon',
            selector: 'cashbonchequegrid'
        },
    ],
    controllerName                : 'kasbondeptposting',
    fieldName                     : 'voucher_no',
    fieldconfirmdetail            : 'description',
    fieldconfirmsubdetail         : 'subcode',
    bindPrefixName                : 'KasbondeptPosting',
    formWidth                     : 830,
    state                         : null,
    statedetail                   : null,
    statesubdetail                : null,
    urlcommon                     : 'cashier/common/create',
    urldata                       : 'cashier/kasbondeptposting/',
    urlrequest                    : 'cashier/kasbondeptposting/create',
    urldetail                     : 'cashier/kasbondeptposting/detail',
    urlsubdetail                  : 'cashier/kasbondeptposting/subdetail',
    senddata                      : null,
    addby                         : null,
    info                          : null,
    coa                           : null,
    messagedata                   : null,
    valueform                     : null,
    project_id                    : 0,
    pt_id                         : 0,
    manager_id                    : 0,
    employee_id                   : 0,
    department_id                 : 0,
    prefix                        : null,
    prefixdept                    : null,
    flaggeneratevoucherno         : 0,
    flaggeneratevouchercashadvance: 0,                       //transaksi cashadvancenya kasir
    approveby_id                  : 0,
    dateNow                       : new Date(),
    idheaderfield                 : 'kasbondept_id',
    iddetailfield                 : 'kasbondeptdetail_id',
    idheadervalue                 : 0,
    iddetailvalue                 : 0,
    coa_id                        : 0,
    kelsub_id                     : 0,
    balancecoa                    : 0,
    validdetail                   : 0,
    gridId                        : 0,
    subgl                         : null,
    auto_cashback                 : 0,
    remainingkasbon               : 0,
    localStore                    : {
        selectedCheque: null,
    },
    cheque_formdata          : null,
    disableRealizationProject: [3, 81, 2056, 2057, 2086, 4031, 4034, 4036, 4061, 5104, 11137],
    global_param             : {
        'backdate_cashbon' : {
            'default': 0,
            'name'   : 'backdate_cashbon',
            'value'  : 0
        }
    },
    getMe                    : function(){
       var me = this;
       return _Apps.getController(me.bindPrefixName);
    },
    constructor: function (configs) {
        this.callParent(arguments);
        var me = this;
        this.myConfig = new Cashier.library.box.Config({
            _controllerName: me.controllerName
        });
    },
    init: function (application) {
        var me = this;
        var events = new Cashier.library.box.tools.EventSelector();
        //this.control(events.getEvents(me, me.controllerName));
        me.tools = new Cashier.library.box.tools.Tools({config: me.myConfig});

        this.control({
            'kasbondeptpostingpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender

            },
            'kasbondeptpostingpanel gridcolumn ': {
                headerclick: function (en) {
                    //console.log(en);
                    var ab = en.ownerCt.itemId;

                    if (ab === 'kasbondeptpostinggridnewId') {
                        if (me.gridId === 1) {
                            var store = Ext.data.StoreManager.lookup('KasbondeptpostingNew');
                        } else {
                            var store = Ext.data.StoreManager.lookup('Kasbondeptposting');
                        }
                        if (me.is_desc === 1) {
                            store.removeAll();
                            store.reload({
                                params: {
                                    "hideparam": 'posting_only',
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
                                    "hideparam": 'posting_only',
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
            'kasbondeptpostingpanel [name=panel]': {
                tabchange: function (tabPanel, tab) {
                    if (tab.xtype === 'kasbondeptpostinggridnew') {
                        var store = Ext.data.StoreManager.lookup('KasbondeptpostingNew');
                        store.removeAll();
                        store.reload();
                        me.gridId = 1;
                    }
                    else {
                        me.gridId = 0;
                    }
                }

            },
            'kasbondeptpostinggrid,kasbondeptpostinggridnew': {
                afterrender    : this.gridAfterRender,
                itemdblclick   : this.gridItemDblClickRev,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange,
                select         : this.gridSelected,
            },
            'kasbondeptpostinggrid toolbar button[action=create]': {
                click: function () {
                    me.state = 'create';
                    this.formDataShow('create');
                }
            },
             'kasbondeptpostinggrid toolbar button[action=generatevouchermulti]': {
                click: function () {
                   me.generateVoucherMulti();
                }
            },
            'kasbondeptpostinggridnew toolbar button[action=create]': {
                click: function () {
                    me.state = 'create';
                    this.formDataShow('create');
                }
            },
            'kasbondeptpostinggridnew toolbar button[action=editremaining]': {
                click: function () {
                    me.state = 'update';
                    me.formEditRemainingShow('update');
                }
            },
            'kasbondeptpostinggridnew toolbar button[action=resetkasbon]': {
                click: this.dataResetKasbon
            },
           /* 'kasbondeptpostinggrid toolbar button[action=update]': {
                click: function () {
                    me.state = 'create';
                    this.formDataShow('update');
                }
            },
            'kasbondeptpostinggridnew toolbar button[action=update]': {
                click: function () {
                    me.state = 'create';
                    this.formDataShow('update');
                }
            },*/
            'kasbondeptpostinggrid toolbar button[action=destroy]': {
                click: this.dataDestroy
            },
            'kasbondeptpostinggridnew toolbar button[action=destroy]': {
                click: this.dataDestroy
            },
            'kasbondeptpostinggrid toolbar button[action=print]': {
                click: this.dataPrint
            },
            'kasbondeptpostinggridnew toolbar button[action=print]': {
                click: this.dataPrint
            },
            'kasbondeptpostinggrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                //click: this.gridActionColumnClick
                click: function (view, cell, row, col, e) {
                    var me, grid;
                    me = this;
                    grid = me.getGrid();
                    me.gridActionColumnClick(view, cell, row, col, e, grid);
                }
            },
            'kasbondeptpostinggridnew actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                //click: this.gridActionColumnClick
                boxready: function () {
                    me.gridActionColumnBoxReady();  
                },
                click: function (view, cell, row, col, e) {
                    var me, grid;
                    me = this;
                    grid = me.getGridnew();
                    me.gridActionColumnClick(view, cell, row, col, e, grid);
                }
            },
            'kasbondeptpostingformsearch': {
                afterrender: function () {
                    me.setStoreFormsearch(function () {
                        var fs;
                        fs = me.getFormsearch();

                        setTimeout(function(){ 
                            fs.down("[name=project_id]").setValue(parseInt(apps.project));
                            fs.down("[name=pt_id]").setValue(parseInt(apps.pt));
                        }, 3000);
                    });
                },
            },
              'kasbondeptpostingformsearch [name=pt_id]': {
                 'select': function (that, newValue, oldValue, eOpts) {
                    var me, form, rowdata;
                    me = this;
                    form = me.getFormsearch();
                    rowdata = form.down('[name=pt_id]').valueModels[0]['raw'];
                    if (form) {
                        form.down('[name=project_id]').setValue(rowdata.project_id);
                       
                    }
                  me.setDeptFormSearch();
                }
            },
              'kasbondeptpostingformsearch [name=amount] ': {
                'keyup': function (event) {
                    me = this;
                    var fd = me.getFormsearch();
                    me._formatCurrency(fd.down('[name=amount]'));
                },
                'blur': function() { 
                    me = this;
                    var fd = me.getFormsearch();
                    me._formatCurrency(fd.down('[name=amount]'), "blur");
                }
            },
            'kasbondeptpostingformsearch button[action=search]': {
                click: this.dataSearch
            },
            'kasbondeptpostingformsearch button[action=reset]': {
                click: this.dataReset
            },
            'kasbondeptpostingformdata': {
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
              'kasbondeptpostingformcashback': {
                afterrender: function () {
                    var me, form;
                    me = this;
                    form = me.getFormcashback();
                    me.formDataAfterRender(form, 'formcashback');
                },
               /* boxready: function () {
                    var me, form;
                    me = this;
                    form = me.getFormdata();
                    me.setFormdataready(form, 'formdata');
                },
                destroy: function () {
                    var me;
                    me = this;
                    me.setDefaultBeforeLoadForm();
                }*/
            },
            'kasbondeptpostingformdata [name=kasbondeptpostingtab] ': {
                'tabchange': function (p, eOpts) {
                    var me, pd, form, tabPanel, name, rowdetail;
                    me = this;
                    me.checkTabsubcoa();
                },
            },
            'kasbondeptpostingformdata [name=pt_id] ': {
                'select': function (g, record, item, index, e, eOpts) {
                    var me, rowdata, form;
                    me = this;
                    rowdata = record[0]['data'];
                    me.project_id = rowdata.project_id;
                    me.pt_id = rowdata.pt_id;
                    me.setVal(form, 'projectname', rowdata.projectname);
                    me.setVal(form, 'ptname', rowdata.ptname);
                },
                'change': function (that, newValue, oldValue, eOpts) {
                    var me, form, rowdata;
                    me = this;
                    form = me.getFormdata();
                    rowdata = form.down('[name=pt_id]').valueModels[0]['raw'];
                    me.project_id = rowdata.project_id;
                    me.pt_id = rowdata.pt_id;
                    me.setVal(form, 'projectname', rowdata.projectname);
                    me.setVal(form, 'ptname', rowdata.ptname);
                }
            },
            'kasbondeptpostingformdata [name=department_id] ': {
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
                },
            },
            'kasbondeptpostingformdata [name=approveby_id] ': {
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
            'kasbondeptpostingformdata [name=kasbank] ': {
                'select': function (g, record, item, index, e, eOpts) {
                    var me, rowdata, form, countlength;
                    me = this;
                    form = me.getFormdata();
                    rowdata = record[0]['data'];
                  
                    me.setVal(form, 'coa', '');
                    me.setVal(form, 'cashier_voucher_no', '');
                    var state = form.up('window').state.toLowerCase();
                    if(state == 'create' || state == 'update'){
                        me.setValCombo(form, 'voucherprefix_id', 0, null);
                        me.setStorePrefix();
                    }
                     
                },
                'change': function (that, newValue, oldValue, eOpts) {
                    var me, form, rowdata;
                    me = this;
                    form = me.getFormdata();
                    if (form.down('[name=kasbank]').valueModels[0] !== undefined) {
                        rowdata = form.down('[name=kasbank]').valueModels[0]['raw'];
                        me.setFormforkasbank(form);
                        var state = form.up('window').state.toLowerCase();
                        if(state == 'create' || state == 'update'){
                                me.setStorePrefix();
                        }
                    }
                },
            },
            'kasbondeptpostingformdata [name=voucherprefix_id] ': {
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
                    }

                },
            },
            'kasbondeptpostingformdata [name=project_claim_date] ': {
                'select': function (g, record, item, index, e, eOpts) {
                    var me,form,claim_date,project_claim_date;
                    me = this;
                    form = me.getFormdata();
                    project_claim_date = record;
                    claim_date = form.down("[name=claim_date]").getValue();
                    if(project_claim_date < claim_date){
                         Ext.Msg.show({
                            title: 'Failure',
                            msg: 'Tanggal harus lebih besar atau sama dengan Claim Date',
                            icon: Ext.Msg.ERROR,
                            buttons: Ext.Msg.OK,
                             fn: function () {
                           form.down("[name=project_claim_date]").setValue('');
                           
                        }
                        });
                    }
                },
               /* 'change': function (that, newValue, oldValue, eOpts) {
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
                    }

                }, */
            },
             'kasbondeptpostingformdata [name=project_close_date] ': {
                'select': function (g, record, item, index, e, eOpts) {
                    var me,form,claim_date,project_close_date;
                    me = this;
                    form = me.getFormdata();
                    project_close_date = record;
                    claim_date = form.down("[name=claim_date]").getValue();
                    if(project_close_date < claim_date){
                         Ext.Msg.show({
                            title: 'Failure',
                            msg: 'Tanggal harus lebih besar atau sama dengan Claim Date',
                            icon: Ext.Msg.ERROR,
                            buttons: Ext.Msg.OK,
                             fn: function () {
                           form.down("[name=project_close_date]").setValue('');
                           
                        }
                        });
                    }
                },
               /* 'change': function (that, newValue, oldValue, eOpts) {
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
                    }

                }, */
            },
            'kasbondeptpostingformdata [action=save]': {
                //click: this.dataSavecustome
                click: function(){
                    var me = this;
                    if(me.gridId == 0){
                        me.dataSavecustome();
                    }else{
                        me.dataUpdatecustome();
                    }
                    
                }
            },
            'kasbondeptpostingformcashback button[action=save]': {
                click: function(){
                    var me = this;
                    me.dataSaveCashback();
                    
                }
            },
            'kasbondeptpostingformeditremaining': {
                afterrender: function () {
                    var me, form;
                    me = this;
                    form = me.getFormeditremaining();
                    me.formDataAfterRender(form, 'formeditremaining');
                },
            },
            'kasbondeptpostingformeditremaining button[action=save]': {
                click: function(){
                    var me = this;
                    me.dataSaveEditRemaining();
                    
                }
            },
            'kasbondeptpostingformdata button[action=savedraft]': {
                click: this.dataSaveasdraft
            },
            'kasbondeptpostingformdata button[action=cancel]': {
                click: this.formDataClose
            },
            'kasbondeptpostingformdata button[action=apply]': {
                click: this.dataApply
            },
            'kasbondeptpostingformdata [action=browseCheque]': {
                click: function (val) {
                    var me = this;
                    me.cheque_formdata = me.getFormdata();
                    me.chequeShowWindow(val, function () {

                    });
                }
            },
            'cashbonchequegrid button[action=select]': {
                click: function (v) {
                    var me = this;
                    me.chequeSelect(v);
                }
            },
            //====================================START DETAIL=============================================    

            'kasbondeptpostinggriddetail': {
                selectionchange: this.cellgridDetail,
                itemdblclick: this.griddetailitemdoubleclick,
            },
            'kasbondeptpostinggriddetail actioncolumn': {
                click: function (view, cell, row, col, e) {
                    me.gridActionColumndetailclick(view, cell, row, col, e);
                }
            },
            /* START  GRID AREA */
            'kasbondeptpostinggriddetail toolbar button[action=create]': {
                click: function () {
                    me.paramdetail.stateform = 'create';
                    me.GenerateFormdata(me.paramdetail);
                }
            },
            'kasbondeptpostinggriddetail toolbar button[action=update]': {
                click: function () {
                    me.paramdetail.stateform = 'update';
                    me.GenerateFormdata(me.paramdetail);
                }
            },
            'kasbondeptpostinggriddetail toolbar button[action=destroy]': {
                click: function () {
                    me.fieldName = 'remarks';
                    this.dataDestroydetailwithflag();
                }
            },
            /* END GRID AREA */

            /* START FORM AREA */
            'kasbondeptpostingdetailformdata': {
                afterrender: function () {
                    var me, form;
                    me = this;
                    form = me.getFormdatadetail();
                    me.formDataAfterRender(form, 'formdetail');
                },
            },
            'kasbondeptpostingdetailformdata [name=coa_id]': {
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
                     //load cashflow
                    me.setStoreCashflow(rowdata.coa_id,0);
                },
            },
            'kasbondeptpostingdetailformdata button[action=save]': {
                'click': function (me, e, eOpts) {
                    var me, form, grid;
                    me = this;
                    form = me.getFormdatadetail();
                    grid = me.getGriddetail();
                    me.dataSaveDetailstore(form, grid);
                },
            },
            'kasbondeptpostingdetailformdata [name=amount] ': {
                'keyup': function (event) {
                    me = this;
                    var fd = me.getFormdatadetail();
                    me._formatCurrency(fd.down('[name=amount]'));
                },
                'blur': function() { 
                    me = this;
                    var fd = me.getFormdatadetail();
                    me._formatCurrency(fd.down('[name=amount]'), "blur");
                }
            },
            /* START  GRID AREA */

            //====================================END DETAIL===============================================      


            //====================================START SUB DETAIL===============================================      
            /* START  GRID AREA */
            'kasbondeptpostinggridsubdetail': {
                afterrender: this.Gridsubafterrender,
                selectionchange: this.cellgridSubDetail,
                itemdblclick: this.gridsubdetailitemdoubleclick,
                select: this.gridSubDetailSelected,
            },
            'kasbondeptpostinggridsubdetail toolbar button[action=create]': {
                click: function () {
                    var me, form, pd, state, store, rowdata, counter, amount;
                    me = this;
                    me.paramsubdetail.stateform = 'create';
                    me.GenerateFormdata(me.paramsubdetail);

                }
            },
            'kasbondeptpostinggridsubdetail toolbar button[action=update]': {
                click: function () {
                    me.paramsubdetail.stateform = 'update';
                    me.GenerateFormdata(me.paramsubdetail);
                }
            },
            'kasbondeptpostinggridsubdetail toolbar button[action=destroy]': {
                click: function () {
                    this.dataDestroysubdetailwithflag();
                }
            },
            'kasbondeptpostinggridsubdetail actioncolumn': {
                click: function (view, cell, row, col, e) {
                    me.gridActionColumnsubdetailclick(view, cell, row, col, e);
                }
            },
            'kasbondeptpostingsubdetailformdata': {
                afterrender: this.formDataSubDetailAfterRender
            },
            'kasbondeptpostingsubdetailformdata [name=subgl_id] ': {
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
            'kasbondeptpostingsubdetailformdata button[action=save]': {
                'click': function (me, e, eOpts) {
                    var me, checkbalance;
                    me = this;
                    me.dataSaveSubDetailstore();
                },
            },
            //====================================END SUB DETAIL===============================================      
              'kasbondeptpostinggridattachmentdetail button[action=read]': {
                click: function () {
                    var shortcut = 0;
                    this.FormUploadAttachmentRead(shortcut);
                }
            },
        });
    },
    setDefaultBeforeLoadForm: function () {
        var me;
        me = this;
        me.project_id = 0;
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
        me.prefix = null;
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
        fromlocation: 'Cashier.view.kasbondeptposting.FormDataDetail',
        formtitle: 'Form Detail',
        formicon: 'icon-form-add',
        formid: 'win-kasbondeptpostingdetailformdata',
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
        fromlocation: 'Cashier.view.kasbondeptposting.FormDataSubDetail',
        formtitle: 'Form Sub Detail',
        formicon: 'icon-form-add',
        formid: 'win-kasbondeptpostingsubdetailformdata',
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
    dataSaveasdraft: function () {
        var me, state, form, formdata, addingRecord, vp, vps, x, store, storedesc, storedetail, storesubdetail,
                valuedata, idProperty, rec, paramdata, rowdata, resjsonheader, rowjsonheader, validheader, paramheader,
                idProperty, counterdesc, counterdetail, countersubdetail, msgheader, restotal, duedate, validation
                ;


        me = this;
        storedetail = Ext.data.StoreManager.lookup('Kasbondeptpostingdetail');
        counterdetail = storedetail.getCount();

        form = me.getFormdata();
        formdata = me.getFormdata().getForm();

        // if (formdata.isValid()) {
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

        valuedata['coa'] = form.down('[name=coa]').getValue();

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
                valuedata['hideparam'] = 'savedraft';//parameter untuk simpan sebagai draft
                rec.set(valuedata);
                rec.endEdit();
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
        //}
    },
    dataSavecustome: function () {
        var me, state, form, formdata, addingRecord, vp, vps, x, store, storedesc, storedetail, storesubdetail,
                valuedata, idProperty, rec, paramdata, rowdata, resjsonheader, rowjsonheader, validheader, paramheader,
                idProperty, counterdesc, counterdetail, countersubdetail, msgheader, restotal, duedate, validation
                ;


        me = this;
        storedetail = Ext.data.StoreManager.lookup('Kasbondeptpostingdetail');
        counterdetail = storedetail.getCount();

        form = me.getFormdata();
        formdata = me.getFormdata().getForm();

        if (formdata.isValid()) {
            resetTimer();


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

            valuedata['coa'] = form.down('[name=coa]').getValue();
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
                        store.reload();
                    } else {
                        me.messagedata = msgheader;
                        me.alertFormdataFailed();
                        me.getFormdata().up('window').close();
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
        storedetail = Ext.data.StoreManager.lookup('Kasbondeptpostingdetail');
        storedetail.clearFilter(true);
        counterdetail = storedetail.getCount();

        storesubdetail = Ext.data.StoreManager.lookup('Kasbondeptpostingsubdetail');
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
        if(me.gridId == 0){
             me.getGrid().getStore().reload();
        }else{
                me.getGridnew().getStore().reload();
            }
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
        if(me.gridId == 0){
             me.getGrid().getStore().reload();
        }else{
                me.getGridnew().getStore().reload();
            }
        form = me.getFormdata();
        form.up('window').body.unmask();
        //me.clearallStore();
        Ext.Msg.show({
            title: 'Failure',
            msg: 'Error: ' + me.messagedata,
            icon: Ext.Msg.ERROR,
            buttons: Ext.Msg.OK
        });
    },

    gridSelectionChange: function () {
        var me, grid, record, row, generatevoucher, store, counter;
        me = this;
        var less = 0;
        var more = 0;

        if(me.gridId == 0){
                 grid = me.getGrid();
                record = grid.getSelectionModel().getSelection();
                 //var rec = grid.getSelectedRecord();
                generatevoucher = grid.down('#btnGenerateMulti');

                  if (record.length < 1) {
                            generatevoucher.setDisabled(true);
                    }else{
                        record.forEach(function (rec) {
                                if(rec.get('amount') >= rec.get('batas_toleransi') && rec.get('cashbon_fund_transfer_id') == 0){
                                    more++;
                                }else{
                                    less++;
                                }
                        });

                    }

                if (less == 0 && more > 0){
                    generatevoucher.setDisabled(false);
                }else if(less > 0 && more > 0){
                    generatevoucher.setDisabled(true);
                }

                         

        }else{
            try{
                grid = me.getGridnew();
                row = grid.getSelectionModel().getSelection();
                if ( row.length == 1 ) {
                    record = grid.getSelectionModel().getSelection()[0]['data'];
                    if ( record.is_cashback == 0 && record.remainingkasbon ) {
                        grid.down('#btnEditRemaining').setDisabled(false);
                    }

                    var sendparams = {
                        'hideparam' : 'getkasbonpayment',
                        'project_id' : record.project_id,
                        'pt_id' : record.pt_id,
                        'kasbondept_id' : record.kasbondept_id
                    };
                    
                    Ext.Ajax.request({
                        url: me.urldata + 'read',
                        timeout: 45000000,
                        method: 'POST',
                        params: sendparams,
                        success: function (response) {
                            var info = Ext.JSON.decode(response.responseText);
                            console.log(info);
                            var flag_resetkasbon = info.data;
                            if ( flag_resetkasbon == 'ALLOWED' ) {
                                grid.down('#btnResetKasbon').setDisabled(false);
                            }else{
                                grid.down('#btnResetKasbon').setDisabled(true);
                            }
                        },
                        failure: function (response) {
                            console.log(response);
                        }
                    });

                }else{
                    grid.down('#btnEditRemaining').setDisabled(true);
                    grid.down('#btnResetKasbon').setDisabled(true);
                }
            }
            catch(err){
                console.log(err.message);
            }
        }
       

    },
    gridSelected: function () {
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
    setStoreCashflow: function (coa_id, setupcashflow_id) {
        var me, store, form;
        me = this;
        form = me.getFormdata();
        formd = me.getFormdatadetail();
        store = me.getStore("Cashflow");
        store.load({
            params: {
                "hideparam": 'getsetupcashflow',
                "project_id": apps.project,
                "pt_id": me.getVal(form, 'pt_id', 'value'),
                "department_id": me.getVal(form, 'department_id', 'value'),
                "coa_id": coa_id
            },
            callback: function (records, operation, success) {
                if (typeof records !== 'undefined' && records.length > 0) {
                    reco = records[0];
                    if(setupcashflow_id>0){
                        me.setVal(formd, 'setupcashflow_id', setupcashflow_id);
                    }else{
                        me.setVal(formd, 'setupcashflow_id', reco.data.setupcashflow_id);
                    }
                    
                }
            }
        });
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
            store = Ext.data.StoreManager.lookup('Kasbondeptpostingsubdetail');

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
     panelAfterRender: function () {
        var me    = this;
        var store = me.getStore('VoucherprefixsetupcomboNew');
        store.load();
        var storeprefix_cashback = me.getStore('Voucherprefixcashbackcombo');
        storeprefix_cashback.load();
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
                case 'global_param':
                    console.log(data);
                    break;
                case 'global_paramV2':
                    if(data != null){
                       me.setReadonly(form, 'amount_kembali', true);
                       me.auto_cashback = 1;
                    }else{
                         me.setReadonly(form, 'amount_kembali', false);
                         me.auto_cashback = 0;
                    }
                    break;
                 case 'getprefixposting':
                    form.down("[name=voucherprefix_id]").setValue(data);
                    break;
                case 'getprojectforpayment':
                   if(data == 1){
                        form.down('[name=kasbank]').setValue('K');
                    }
                    break;
                 case 'getprojectforprefix':
                    if(data != 'default'){
                        form.down("[name=voucherprefix_id]").setValue(parseInt(data.voucherprefix_id));
                         form.down("[name=prefix_id]").setValue(parseInt(data.prefix_id));
                          form.down("[name=coa_id]").setValue(parseInt(data.coa_id));
                    }
                    break;
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
        var me, form, status, state;
        me = this;
        form = me.getFormdata();
        status = form.down("[name=status]").getValue();
        state = form.up('window').state.toLowerCase();
        if (status == '1') {
            form.down("[name=lblstatus]").setText("OPEN", true);
        } else {
            if (status == '2') {
                form.down("[name=lblstatus]").setText("APPROVE", true);
                //permintaan putri 15032018 bisa di edit coanya
                //me.getFormdata().down('#kasbondeptpostingtab').setDisabled(true);
            } else if (status == '3') {
                if(state == 'read'){

                       form.down("[name=lblstatus]").setText("POSTING", true);
                        me.getFormdata().getForm().getFields().each(function (field) {
                            field.setReadOnly(true);
                        });

                }else{
                     form.down("[name=lblstatus]").setText("POSTING", true);
                }
              
                //permintaan putri 15032018 bisa di edit coanya
                //me.getFormdata().down('#btnSave').setDisabled(true);
                //me.getFormdata().down('#kasbondeptpostingtab').setDisabled(true);
            }

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
                        Ext.StoreManager.lookup('Kasbondeptpostingdetail').removeAll();
                        Ext.StoreManager.lookup('Kasbondeptpostingsubdetail').removeAll();
                        me.fdar().create();
                        form.down("[name=status]").setValue('1');
                         me.setReadonly(form, 'balance', true);
                          me.setReadonly(form, 'totaldetail', true);
                        break;
                    case 'update':
                       // me.fdar().update();
                         if (me.gridId == 1) {
                           me.fdar2().update();
                            grid = me.getGridnew(); //grid yang sudah posting
                        } else {
                            me.fdar().update();
                            grid = me.getGrid();
                            me.setVal(form, 'claim_date', me.dateNow);
                            me.setPaymentType(form);
                            me.setPrefix(form);
                        }
                        me.setReadonly(form, 'pt_id', true);
                        me.setReadonly(form, 'department_id', true);
                        me.setReadonly(form, 'approveby_id', true);
                        me.setReadonly(form, 'voucher_date', true);
                        me.setReadonly(form, 'balance', true);
                        me.setReadonly(form, 'totaldetail', true);
                         me.setReadonly(form, 'description', true);
                         Ext.getCmp('gridtabkasbondeptpostingdetail').setDisabled(true);
                        
                      //  grid = me.getGrid();
                        store = grid.getStore();
                        record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));
                        counter = store.getCount();
                        var rec = grid.getSelectedRecord();

                       
                        if (me.gridId == 0) {
                            form.down('[name=cashier_voucher_date]').setValue(rec.get('voucher_date'));
                            if (counter > 0) {
                                row = record['data'];
                                me.in_out = row.dataflow;
                                if (parseInt(row.made_by) < 1) {
                                    me.setVal(form, 'made_by', row.other_made_by);
                                }
                                me.getminimalCashbon(row.project_id, row.pt_id);
                              // me.setVal(form, 'voucherprefix_id', row.voucherprefix_id);
                              
                            }
                        }else{
                             form.down('[name=project_claim_date]').show();
                              form.down('[name=project_close_date]').show();
                              
                       
                        }
                          me.getvoucherprefix(record.get('voucherprefix_id'));
                        break;
                    case 'read':

                        if (me.gridId == 1) {
                            me.fdarReadOnly().read();
                            grid = me.getGridnew(); //grid yang sudah posting
                        } else {
                            me.fdar().read();
                            grid = me.getGrid();
                        }

                        store = grid.getStore();
                        record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));
                        counter = store.getCount();
                        var iscashback = record.get('is_cashback');
                        var cashbackby = record.get('cashbackby');
                        var remainingkasbon = record.get('remainingkasbon');
                        var is_realized = record.get('is_realized');
                        var is_posting = record.get('is_posting');

                           me.getvoucherprefix(record.get('voucherprefix_id'));



                      



                       if (iscashback == 1){
                            form.down("[name=cashbackon]").setVisible(true);
                        }
                        if(iscashback == 0 && cashbackby != ''){
                           form.down("[name=uncashbackon]").setVisible(true); 
                        }
                         
                         me.setVal(form,'made_by',record.get('made_by_name'));
                          me.setVal(form,'approveby_id',record.get('approve_by_name'));

                        /*if (counter > 0) {
                            row = record['data'];
                            me.in_out = row.dataflow;
                            if (parseInt(row.made_by) < 1) {
                                me.setVal(form, 'made_by', row.other_made_by);
                            }
                        }
                        */
                        break;

                }
                me.setStatus();

            } else if (flagform == 'formdetail') {
                griddetail = me.getGriddetail();
                formheader = me.getFormdata();
                me.setStoreCoaDept(formheader);
                 me.setStoreCashflow(0,0);
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
                        me.setStoreCashflow(me.coa_id, me.paramdetail.rowdata['data'].setupcashflow_id);

                        if (me.kelsub_id !== 0) {
                            me.setReadonly(form, 'amount', true);
                        } else {
                            me.setReadonly(form, 'amount', false);
                        }

                        if(me.paramdetail.rowdata['data'].dataflow == 'I'){
                            me.setVal(form, 'dataflow', 'IN');
                        }else{
                            me.setVal(form, 'dataflow', 'OUT');
                        }

//                        if (me.in_out == 'I') {
//                            form.down("[name=dataflow]").setValue('O');
//                        } else {
//                            form.down("[name=dataflow]").setValue('I');
//                        }
                        break;

                }

            }else if(flagform == 'formcashback'){
                switch(state){
                    case 'create':



                        break;
                    case 'update':
                        
                        if (me.gridId == 1) {
                            grid = me.getGridnew();  //grid yang sudah posting
                        } else {
                            grid = me.getGrid();
                        }
                        
                        store   = grid.getStore();
                        record  = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));
                        counter = store.getCount();
                        
                        var rec = grid.getSelectedRecord();
                            row = record['data'];
                        me.IsAutoCashback(row.project_id,row.pt_id);
                        var amount_cashback;
                        if(row.is_cashback == 0 && row.remainingkasbon == 0){
                            amount_cashback = row.amount;
                        }else{
                            amount_cashback = row.remainingkasbon;
                        }
                        
                        me.setVal(form, 'amount_kembali', amount_cashback);
                        me.setVal(form, 'eff_date', me.dateNow);
                        me.remainingkasbon = amount_cashback;
                        if (me.global_param['backdate_cashbon']['value'] == 1) {
                            form.down("[name=eff_date]").setMinValue(me.dateNow);
                        }else{
                            form.down("[name=eff_date]").setMinValue(false);
                        }
                    break;
                }
            }else if(flagform == 'formeditremaining'){
                switch(state){
                    case 'create' :
                        break;
                    case 'update' :
                        grid = me.getGridnew();
                        store = grid.getStore();
                        record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));
                        counter = store.getCount();
                        row = record['data'];
                        // console.log(row);
                        var kasbondept_id = row.kasbondept_id;
                        var remainingkasbon = row.remainingkasbon;
                        me.setVal(form, 'kasbondept_id', kasbondept_id)
                        me.setVal(form, 'remainingkasbon', remainingkasbon)
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
                        if (me.gridId == 1) {
                            me.idheadervalue = me.getValue(me, 'kasbondept_id', 'value');
                            storedetail = me.getGriddetail().getStore();
                            if (storedetail.getCount() > 0) {
                                storedetail.removeAll();
                            }

                            /*if ( me.disableRealizationProject.includes(me.getValue(me, 'project_id', 'value')) ) {
                                form.down("[action=save]").setDisabled(false);
                            }else{
                                form.down("[action=save]").setDisabled(true);
                            }*/

                        } else {
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

                        }
                       
                        me.getDatadetail();
                        me.setSumdetail();
                        me.getDatadetailAttachment();
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
                        form.down('[name=gridtabkasbondeptpostingsubdetail]').setDisabled(false);
                    } else {
                        form.down('[name=gridtabkasbondeptpostingsubdetail]').setDisabled(true);
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
        tabPanel = form.down("[name=kasbondeptpostingtab]").getActiveTab();
        name = tabPanel.name;
        if (name == 'gridtabkasbondeptpostingsubdetail') {
            if (rowdetail !== null) {
                me.Tabsubcoa(rowdetail);
            } else {
                form.down('[name=gridtabkasbondeptpostingsubdetail]').setDisabled(true);
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
                form.down('[name=gridtabkasbondeptpostingsubdetail]').setDisabled(true);
            } else {
                form.down('[name=gridtabkasbondeptpostingsubdetail]').setDisabled(false);
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
        me.urlrequest = 'cashier/kasbondeptposting/read';
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
     setDeptFormSearch: function () {
        var me, store, form, ptid, projectid;
        me = this;
        form = me.getFormsearch();
        ptid = form.down("[name=pt_id]").getValue();
        projectid = form.down("[name=project_id]").getValue();
        store = me.getStore("Department");
        store.reload({
            params: {
                "hideparam": 'getdepartmentbyprojectpt',
                "pt_id" : ptid,
                "project_id" : projectid
            },
            callback: function (records, operation, success) {
                store.each(function (record)
                {
                    if (record.data['department_id'] == me.department_id) {
                        me.setVal(form, 'department_id', record.data['department_id']);
                    }else{
                        me.setVal(form, 'department_id' , '');
                    }
                });
            }
        });
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
    generateCashAdvanceVoucherno: function () {
        var me, form, accept_date;
        me = this;
        form = me.getFormdata();
        accept_date = me.formatDate(me.getVal(form, 'accept_date', 'value'));
        switch (me.state) {
            case 'create':
                me.senddata = {
                    "hideparam": 'generatevouchernocashadvance',
                    "project_id": me.project_id,
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
                case me.bindPrefixName + 'Posting':
                    me.Approvedata(row);
                    break;
                case me.bindPrefixName + 'Unposting':
                    me.Unapprovedata(row);
                    break;
                 case me.bindPrefixName + 'Preview':
                    me.formDataShow('read');
                    break;
                 case me.bindPrefixName + 'Cashback':
                    me.formCashbackShow('update');
                    break;
                case me.bindPrefixName + 'Uncashback':
                    me.Uncashbackdata(row);
                    break;
                 case me.bindPrefixName + 'Generatevoucher':
                    me.GenerateVoucher(row);
                    break;

            }
        }
    },
    dataApply: function (row) {
        var me, grid, store, info, values, form;
        me = this;

        form = me.getFormdata();
        grid = me.getGrid();
        store = grid.getStore();
        values = form.getForm().getValues();
        values['project_id'] = me.project_id;
        values['prefix'] = me.prefix;
        values['hideparam'] = 'apply';

        if (form.getForm().isValid()) {
            form.up('window').mask('Process Realization,please wait..');
            Ext.Ajax.request({
                url: me.urldata + 'update',
                timeout: 45000000,
                method: 'POST',
                params: {
                    data: Ext.encode(values)
                },
                success: function (response) {
                    info = Ext.JSON.decode(response.responseText);
                    form.up('window').mask('Process Realization,success..');
                    form.up('window').unmask();
                    store.reload();
                },
                failure: function (response) {
                    form.up('window').mask('Process Realization,failed..');
                    form.up('window').unmask();
                    store.reload();
                }
            });
        }

    },
    setFormforkasbank: function (form) {
        var me, kasbank;
        me = this;
        if (form != '') {
            kasbank = me.getVal(form, 'kasbank', 'value');
            if (kasbank == 'K' || kasbank == 'P') {
                me.fieldHide(form, 'chequegiro_date');
                me.fieldHide(form, 'chequegiro_no');
                me.fieldHide(form, 'chequegiro_browse');
                me.fieldHide(form, 'chequegiro_handover_date');
            } else {
                me.fieldShow(form, 'chequegiro_date');
                me.fieldShow(form, 'chequegiro_no');
                me.fieldShow(form, 'chequegiro_browse');
                me.fieldShow(form, 'chequegiro_handover_date');
            }
        }
    },
    getvoucherprefix: function (id) { 
        var me, store, form, in_out;
        me = this;
        form = me.getFormdata();
        var pt = form.down("[name=pt_id]").getValue();
        var project_id = form.down('[name=project_id]').getValue();
        store = me.getStore("VoucherprefixsetupcomboNew");
        store.getProxy().setExtraParam('dataflow', 'O');
        store.getProxy().setExtraParam('pt_pt_id', pt);
         store.getProxy().setExtraParam('project_id', project_id);
         store.getProxy().setExtraParam('user_id', apps.uid);
        store.getProxy().setExtraParam('kasbank', me.getVal(form, 'kasbank', 'value'));
        store.getProxy().setExtraParam('hideparam', 'getvoucherprefixsetupnew');
        form.setLoading('Loading prefix');
        store.reload({
            callback: function (records, operation, success) {
                form.setLoading(false);
                records.forEach(function(entry) {
                    var row = entry.data;
                    if(row.voucherprefix_id==id){
                         form.down("[name=voucherprefix_id]").setValue(row.voucherprefix_id);
                    }
                });
            }
        });
    },
    setStorePrefix: function () { 
        var me, store, form, in_out;
        me = this;
        form = me.getFormdata();
        //in_out = form.down("[name=dataflow]").getValue();
        var pt = form.down("[name=pt_id]").getValue();
        var project_id = form.down('[name=project_id]').getValue();
        form.down("[name=voucherprefix_id]").setValue('');
        store = me.getStore("VoucherprefixsetupcomboNew");
        store.getProxy().setExtraParam('dataflow', 'O');
        store.getProxy().setExtraParam('pt_pt_id', pt);
        store.getProxy().setExtraParam('project_id', project_id);
         store.getProxy().setExtraParam('user_id', apps.uid);
        store.getProxy().setExtraParam('kasbank', me.getVal(form, 'kasbank', 'value'));
        store.getProxy().setExtraParam('hideparam', 'getvoucherprefixsetupnew');
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
    Approvedata: function (row) {
        //untuk approve cashbon bank
        var me, grid, store, info;
        me = this;
        row['hideparam'] = 'applybank';
        grid = me.getGrid();
        store = grid.getStore();
          Ext.getBody().mask("Please wait...");
        Ext.Ajax.request({
            url: me.urldata + 'update',
            timeout: 45000000,
            method: 'POST',
            params: {
                data: Ext.encode(row)
            },
            success: function (response) {
                info = Ext.JSON.decode(response.responseText);
                grid.up('window').getEl().mask('Process approve,success..');
                grid.up('window').getEl().unmask();
                  Ext.getBody().unmask();
                store.reload();
            },
            failure: function (response) {
                grid.up('window').getEl().mask('Process approve,failed..');
                grid.up('window').getEl().unmask();
                store.reload();
            }
        });


    },
    formCashbackShow: function (el, act, action) {
        var me = this;
        var formtitle, formicon;

        var gfp = me.getFormProperties(action);
        var state = gfp.state;
        formtitle = gfp.formtitle;
        formicon = gfp.formicon;

        var winId = 'win-holidayformdata';
        var win = desktop.getWindow(winId);
        if (!win) {
            win = desktop.createWindow({
                id: winId,
                title: 'Cashback',
                iconCls: formicon,
                resizable: false,
                minimizable: false,
                maximizable: false,
                width: 320,
                renderTo: Ext.getBody(),
                constrain: true,
                constrainHeader: false,
                modal: true,
                layout: 'fit',
                shadow: 'frame',
                shadowOffset: 10,
                border: false,
                state: 'update',
                listeners: {
                    boxready: function () {
                        win.body.mask('Loading...');
                        var tm = setTimeout(function () {
                            win.add(Ext.create('Cashier.view.' + me.controllerName + '.FormCashback'));
                            win.center();
                            win.body.unmask();
                            clearTimeout(tm);
                        }, 1000);

                    }
                }

            });
        }
        win.show();
    },
    formEditRemainingShow: function (el, act, action) {
        var me = this;
        var formtitle, formicon;

        var gfp = me.getFormProperties(action);
        var state = gfp.state;
        formtitle = gfp.formtitle;
        formicon = gfp.formicon;

        var winId = 'win-holidayformdata';
        var win = desktop.getWindow(winId);
        if (!win) {
            win = desktop.createWindow({
                id: winId,
                title: 'Edit Remaining Cashbon',
                iconCls: formicon,
                resizable: false,
                minimizable: false,
                maximizable: false,
                width: 400,
                renderTo: Ext.getBody(),
                constrain: true,
                constrainHeader: false,
                modal: true,
                layout: 'fit',
                shadow: 'frame',
                shadowOffset: 10,
                border: false,
                state: 'update',
                listeners: {
                    boxready: function () {
                        win.body.mask('Loading...');
                        var tm = setTimeout(function () {
                            win.add(Ext.create('Cashier.view.' + me.controllerName + '.FormEditRemaining'));
                            win.center();
                            win.body.unmask();
                            clearTimeout(tm);
                        }, 1000);

                    }
                }

            });
        }
        win.show();
    },
    Cashbackdata: function (row) {
        var me, grid, store, info, gridmain, storemain, rec, amountcashback, openvoucher, confirmmsg, remainingkasbon, amountkembali;
        me = this;
        row['hideparam'] = 'cashback';
        grid = me.getGridnew();
        gridmain = me.getGrid();
        store = grid.getStore();
        storemain = gridmain.getStore();
        rec = grid.getSelectedRecord();
        openvoucher = rec.get("open_voucher");
        amountkembali = rec.get("amount_kembali");
        if (amountkembali == 0 ){
            amountcashback = rec.get("amount");
        }else{
             amountcashback = rec.get("amount_kembali"); 
        }

             
        confirmmsg = 'Total Cashback Amount is ' + Ext.util.Format.numberRenderer('0,000.00')(amountcashback) + '. Are you sure want to proceed the Cashback ?'; 
        var rows = me.getGridnew().getSelectionModel().getSelection();
        var selectedRecord = '[' + store.getAt(store.indexOf(rows[0])).get(me.fieldName) + ']';
          Ext.Msg.confirm('Cashback data', confirmmsg, function (btn) {
                if (btn == 'yes') {
                    resetTimer();
                   
                       Ext.getBody().mask("Please wait...");


                   Ext.Ajax.request({
                        url: me.urldata + 'update',
                        timeout: 45000000,
                        method: 'POST',
                        params: {
                            data: Ext.encode(row)
                        },
                        success: function (response) {
                            info = Ext.JSON.decode(response.responseText);
                            var successmsg = info.msg;
                            store.reload();
                              Ext.Msg.show({
                                title: 'Warning',
                                msg: successmsg,
                                icon: Ext.Msg.INFO,
                                buttons: Ext.Msg.OK
                            });
                              Ext.getBody().unmask();
                              store.reload();
                              storemain.reload();

                        },
                        failure: function (response) {
                             me.getGridnew().up('window').mask('Process Unapprove,failed..');
                            grid.up('window').getEl().unmask();
                            store.reload();
                        }
                     
                    });
                }
            });
    },
     Uncashbackdata: function (row) {
        var me, grid, store, info, gridmain, storemain, rec;
        me = this;
        row['hideparam'] = 'uncashback';
        grid = me.getGridnew();
        gridmain = me.getGrid();
        store = grid.getStore();
        storemain = gridmain.getStore();
        rec = grid.getSelectedRecord();
       // var amountcashback = rec.get("remainingkasbon");
        var rows = me.getGridnew().getSelectionModel().getSelection();
        var selectedRecord = '[' + store.getAt(store.indexOf(rows[0])).get(me.fieldName) + ']';
        var confirmmsg = 'Are you sure want to proceed the Uncashback ?';
          Ext.Msg.confirm('Uncashback data', confirmmsg, function (btn) {
                if (btn == 'yes') {
                    resetTimer();
                   
                       Ext.getBody().mask("Please wait...");


                   Ext.Ajax.request({
                        url: me.urldata + 'update',
                        timeout: 45000000,
                        method: 'POST',
                        params: {
                            data: Ext.encode(row)
                        },
                        success: function (response) {
                            info = Ext.JSON.decode(response.responseText);
                            var successmsg = info.msg;
                            store.reload();
                              Ext.Msg.show({
                                title: 'Warning',
                                msg: successmsg,
                                icon: Ext.Msg.INFO,
                                buttons: Ext.Msg.OK
                            });
                             Ext.getBody().unmask();
                              store.reload();
                              storemain.reload();

                        },
                        failure: function (response) {
                             me.getGridnew().up('window').mask('Process Unapprove,failed..');
                            grid.up('window').getEl().unmask();
                            store.reload();
                        }
                     
                    });
                }
            });
    },
     Unapprovedata: function (row) {
        var me, grid, store, info, gridmain, storemain;
        me = this;
        row['hideparam'] = 'unapplybank';
        grid = me.getGridnew();
        gridmain = me.getGrid();
        store = grid.getStore();
        storemain = gridmain.getStore();
        var rows = me.getGridnew().getSelectionModel().getSelection();
        var selectedRecord = '[' + store.getAt(store.indexOf(rows[0])).get(me.fieldName) + ']';
        var confirmmsg = 'Unrealization ' + selectedRecord + ' ?';
          Ext.Msg.confirm('Unrealization data', confirmmsg, function (btn) {
                if (btn == 'yes') {
                    resetTimer();
                   
                     Ext.getBody().mask("Please wait...");

                   Ext.Ajax.request({
                        url: me.urldata + 'update',
                        timeout: 45000000,
                        method: 'POST',
                        params: {
                            data: Ext.encode(row)
                        },
                        success: function (response) {
                            info = Ext.JSON.decode(response.responseText);
                            var successmsg = info.msg;
                            store.reload();
                              Ext.Msg.show({
                                title: 'Warning',
                                msg: successmsg,
                                icon: Ext.Msg.INFO,
                                buttons: Ext.Msg.OK
                            });
                              Ext.getBody().unmask();
                              store.reload();
                              storemain.reload();

                        },
                        failure: function (response) {
                             me.getGridnew().up('window').mask('Process Unapprove,failed..');
                            grid.up('window').getEl().unmask();
                            store.reload();
                        }
                     
                    });
                }
            });
    },
    getminimalCashbon: function (project_id, pt_id) {
        var me, form, state;
        me = this;
        form = me.getFormdata();
        me.senddata = {
            "hideparam": 'global_param', //sesuai global param
            "globalname": 'minimal_cashbon_amount',
            "project_id": project_id,
            "pt_id": pt_id,
        }
        me.urlrequest = me.urlcommon;
        me.AjaxRequest(form);
    },
    //override
    gridItemDblClickRev: function (el) {
        var me = this,
                btnEdit = el.up('panel').down('#btnEdit'),
                state = 'KasbondeptPostingUpdate';
        me.execAction(el, state);
    },
    gridItemDblClickReadonly: function (el) {
        var me = this,
                btnEdit = el.up('panel').down('#btnEdit'),
                state = 'show';
        me.execAction(el, state);
    },
    fdarReadOnly: function () {
        var me = this;
        var x = {
            read: function () {
                var grid = me.getGridnew();
                var store = grid.getStore();
               Ext.getCmp('gridtabkasbondeptpostingdetail').setDisabled(true);
               

                var record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));
                me.getFormdata().loadRecord(record);
                me.getFormdata().getForm().getFields().each(function (field) {
                    field.setReadOnly(true);
                });
                me.getFormdata().down('#btnSave').setDisabled(true);
                me.getFormdata().down('#btnSaveDraft').setDisabled(true);
            }
        };
        return x;
    },
     fdar2: function () {
        var me = this;
        var x = {
            update: function () {
                var grid = me.getGridnew();
                var store = grid.getStore();
                var record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));
                var form = me.getFormdata();
                Ext.getCmp('gridtabkasbondeptpostingdetail').setDisabled(true);
                me.getFormdata().loadRecord(record);

                  me.setReadonly(form, 'amount_kembali', true);
                    me.setReadonly(form, 'description', true);
                      me.setReadonly(form, 'kasbank', true);
                        me.setReadonly(form, 'voucherprefix_id', true);
                          me.setReadonly(form, 'cashier_voucher_date', true);
                            me.setReadonly(form, 'claim_date', true);

              
                me.getFormdata().down('#btnSaveDraft').setDisabled(true);
                 me.getFormdata().down('#btnSave').setText('Update');
            }
        };
        return x;
    },
    chequeShowWindow: function (el, cb) {
        var ps;
        var me = this;
        var localstore = 'selectedCheque';
        var browse = new Cashier.library.BrowseCashier();
        var grid = me.getGrid('kasbondeptpostinggrid');
        var rec = grid.getSelectedRecord();
        browse.init({
            controller: me,
            view: 'ChequeGridCashbon',
            el: el,
            localStore: localstore,
            mode_read: "chequelist",
            bukaFormSearch: true,
            dataflow: me.dataflow,
        });
        browse.showWindow(function () {
            if (typeof cb === "function") {
                cb();
            }
            if (me.pt_id) {
                Ext.getCmp('ptid').setValue(me.pt_id);
                Ext.getCmp('ptArId').setValue(rec.get("ptname"));
                Ext.getCmp('projectid').setValue(rec.get("project_id"));
                var gc = me.getChequegridcashbon();
                var storear = gc.getStore();
                var fields = Ext.getCmp('MySuperBrowseWindow').getForm().getFieldValues();
                for (var x in fields) {
                    storear.getProxy().setExtraParam(x, fields[x]);
                }
                storear.getProxy().setExtraParam('cheque_no', '');
//                storear.getProxy().setExtraParam('start', 0);
                storear.getProxy().setExtraParam('dataflow', 'OUT');
                storear.getProxy().setExtraParam('project_project_id', apps.project_id);
                storear.loadPage();
            }

        });
    },


    chequeSelect: function (el) {
        var me = this;
        var f = me.cheque_formdata;
        var grid = me.getChequegridcashbon();
        var row = grid.getSelectionModel().getSelection();
        var rec = grid.getSelectedRecord();
        f.down('[name=chequegiro_no]').setValue(rec.get("cheque_no"));
        f.down('[name=cheque_id]').setValue(rec.get("cheque_id"));
        el.up('window').destroy();
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
        me.unformatCurrencyFormdata(me, me.getFormsearch());
        var fields = me.getFormsearch().getValues();
        if (me.gridId === 1) {
            fields['hideparam'] = 'posting_only';
        }
        for (var x in fields)
        {
            store.getProxy().setExtraParam(x, fields[x]);
        }
        me.getSettingGlobalParam();
        me.loadPage(store);
    },
     dataUpdatecustome: function () {
        var me, state, form, formdata, addingRecord, vp, vps, x, store, storedesc, storedetail, storesubdetail,
                valuedata, idProperty, rec, paramdata, rowdata, resjsonheader, rowjsonheader, validheader, paramheader,
                idProperty, counterdesc, counterdetail, countersubdetail, msgheader, restotal, duedate, validation
                ;


        me = this;
    storedetail = Ext.data.StoreManager.lookup('Kasbondeptpostingdetail');
      counterdetail = storedetail.getCount();

        form = me.getFormdata();
        formdata = me.getFormdata().getForm();

        if (formdata.isValid()) {
            resetTimer();


         me.unformatCurrencyFormdata(me, form);
            store = me.getGridnew().getStore();
            valuedata = formdata.getValues();

          /*  if (typeof (form.down("[name=made_by]").getValue()) == 'number') {
                valuedata['other_made_by'] = '';
                valuedata['made_by'] = me.getVal(form, 'made_by', 'value');
            } else {
                valuedata['other_made_by'] = me.getVal(form, 'made_by', 'value');
                valuedata['made_by'] = parseInt(0);
            }*/

            valuedata['coa'] = form.down('[name=coa]').getValue(); 
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
                    valuedata['hideparam'] = 'saveprojectclaimdate';//parameter untuk simpan sebagai draft
                    rec.set(valuedata);
                    rec.endEdit();
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
                        me.getFormdata().up('window').close();
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
      IsAutoCashback: function (project_id, pt_id) {
        var me, form, state;
        me = this;
        form = me.getFormcashback();
        me.senddata = {
            "hideparam": 'global_paramV2', //sesuai global param
            "globalname": 'AUTO_CASHBACK_CASHBON',
            "project_id": project_id,
            "pt_id": pt_id,
        }
        me.urlrequest = me.urlcommon;
        me.AjaxRequest(form);
    },
    getPrefixPosting: function (kasbondept_id) {
        var me, form, state;
        me = this;
        form = me.getFormcashback();
        me.senddata = {
            "hideparam": 'getprefixposting', //sesuai global param
            "kasbondept_id": kasbondept_id,
        }
        me.urlrequest = 'cashier/kasbondeptposting/read';
        me.AjaxRequest(form);
    },
     dataSaveCashback: function () {
        var me, form, state, amount, grid, voucherprefix_id, gridmain, storemain, is_cashback, eff_date;
        me = this;
        grid = me.getGridnew();
        gridmain = me.getGrid();
        store = grid.getStore();
        storemain = gridmain.getStore();
        form = me.getFormcashback();
        amount = accounting.unformat(form.down("[name=amount_kembali]").getValue());
        voucherprefix_id = form.down("[name=voucherprefix_id]").getValue();
        eff_date = form.down("[name=eff_date]").getValue();
        rec = grid.getSelectedRecord();
        row = rec.data;
        is_cashback = rec.data.is_cashback;
        if(me.auto_cashback == 0){
            if(amount > me.remainingkasbon){
                 Ext.Msg.show({
                            title: 'Failure',
                            msg: 'Cashback Amount Should be Less or Equal to Remaining Cashbon Amount',
                            icon: Ext.Msg.ERROR,
                            buttons: Ext.Msg.OK,
                             fn: function () {
                            me.getFormcashback().up('window').close();
                           
                        }
                        });
                 return false;

            }
        }else if(is_cashback == 1 && rec.data.remainingkasbon <= 0){

               Ext.Msg.show({
                            title: 'Failure',
                            msg: 'Remainingkasbon already 0',
                            icon: Ext.Msg.ERROR,
                            buttons: Ext.Msg.OK,
                             fn: function () {
                            me.getFormcashback().up('window').close();
                           
                        }
                        });
               return false;


        }
       
        row['hideparam'] = 'cashback';
        row['amount_new'] = amount;
        row['voucherprefix_id_new'] = voucherprefix_id;
        row['eff_date'] = eff_date;
        form.up('window').body.mask('Saving data, please wait ...');


                   Ext.Ajax.request({
                        url: me.urldata + 'update',
                        timeout: 45000000,
                        method: 'POST',
                        params: {
                            data: Ext.encode(row)
                        },
                        success: function (response) {
                            info = Ext.JSON.decode(response.responseText);
                            var rowjsonheader = info.data;
                            var successmsg = info.msg;
                            var kasbankid_out = rowjsonheader.kasbankid_out;
                            var kasbankid_in = rowjsonheader.kasbankid_in;

                            store.reload();

                           
                            if(kasbankid_out != 'EMPTY' || kasbankid_in != 'EMPTY'){
                                 successmsg = 'Success .<br/> Cashback Voucher '+ kasbankid_out + ' and '+ kasbankid_in +' Have Been Generated.<br/>Please check on menu Voucher';
                            }else{
                                 successmsg = successmsg;
                            }
                       
                              Ext.Msg.show({
                                title: 'Warning',
                                msg: successmsg,
                                icon: Ext.Msg.INFO,
                                buttons: Ext.Msg.OK
                            });
                              form.up('window').body.unmask();
                              form.up('window').close();
                              store.reload();
                              storemain.reload();

                        },
                        failure: function (response) {
                             me.getGridnew().up('window').mask('Process Unapprove,failed..');
                            form.up('window').getEl().unmask();
                             form.up('window').close();
                            store.reload();
                        }
                     
                    });
    },
    dataSaveEditRemaining: function () {
        var me, grid, form, store;
        me = this;
        grid = me.getGridnew();
        store = grid.getStore();
        form = me.getFormeditremaining();
        rec = grid.getSelectedRecord();
        row = rec.data;
        is_cashback = rec.data.is_cashback;
        if( is_cashback != 0){
            Ext.Msg.show({
                title: 'Failure',
                msg: 'Anda tidak dapat melakukan edit remaining kasbon',
                icon: Ext.Msg.ERROR,
                buttons: Ext.Msg.OK,
                fn: function () {
                    me.getFormeditremaining().up('window').close();
                }
            });
            return false;
        }

        var remainingkasbon = accounting.unformat(form.down("[name=remainingkasbon]").getValue());
        var reason = form.down("[name=action]").getValue();
        row['hideparam'] = 'editremaining';
        row['remainingkasbon'] = remainingkasbon;
        row['reason'] = reason;
        form.up('window').body.mask('Saving data, please wait ...');
        Ext.Ajax.request({
            url: me.urldata + 'update',
            timeout: 45000000,
            method: 'POST',
            params: {
                data: Ext.encode(row)
            },
            success: function (response) {
                info = Ext.JSON.decode(response.responseText);
                var rowjsonheader = info.data;
                var successmsg = info.msg;

                Ext.Msg.show({
                    title: 'Success',
                    msg: successmsg,
                    icon: Ext.Msg.INFO,
                    buttons: Ext.Msg.OK,
                    fn: function () {
                        form.up('window').body.unmask();
                        form.up('window').close();
                        store.reload();
                    }
                });
            },
            failure: function (response) {
                me.getGridnew().up('window').mask('Process Unapprove,failed..');
                form.up('window').getEl().unmask();
                form.up('window').close();
                store.reload();
            }
        });
    },
    dataResetKasbon: function () {
        var me = this;
        var rows = me.getGridnew().getSelectionModel().getSelection();
        if (rows.length < 1) {
            Ext.Msg.alert('Info', 'No record selected !');
            return;
        } else {
            console.log(rows);
            var confirmmsg, successmsg, failmsg;
            var recordcounttext = rows.length + ' record' + (rows.length > 1 ? 's' : '');
            var store = me.getGridnew().getStore();
            var selectedRecord = '[' + rows[0].data.voucher_no + ']';
            confirmmsg = 'Are you sure want to reset cashbon No ' + selectedRecord + ' ?';
            failmsg = 'Error: Unable to reset cashbon ' + selectedRecord + '.';

            Ext.Msg.confirm('Confirmation', confirmmsg, function (btn) {
                if (btn == 'yes') {
                    resetTimer();
                    var msg = function() {
                        me.getGridnew().up('window').mask('Processing data, please wait ...');
                    };

                    Ext.Ajax.request({
                        url: me.urldata + 'update',
                        method: 'POST',
                        params: {
                            data: Ext.encode({
                                hideparam: 'resetkasbon',
                                project_id: rows[0].data.project_id,
                                pt_id: rows[0].data.pt_id,
                                kasbondept_id: rows[0].data.kasbondept_id,
                                voucher_no: rows[0].data.voucher_no,
                            })
                        },
                        success: function(response) {
                            me.getGridnew().up('window').unmask();
                            me.getGridnew().getStore().reload();
                            Ext.Msg.show({
                                title: 'Success',
                                msg: 'Data Reset',
                                icon: Ext.Msg.INFO,
                                buttons: Ext.Msg.OK
                            });
                        },
                        failure: function(response) {
                            me.getGridnew().up('window').unmask();
                            me.getGridnew().getStore().reload();
                            Ext.Msg.show({
                                title: 'Failure',
                                msg: 'Data Error',
                                icon: Ext.Msg.ERROR,
                                buttons: Ext.Msg.OK
                            });
                        }
                    })

                }
            });
        }
    },
     setPaymentType: function (form) {
        var me,formdata, project_id, grid;
        me = this;
        formdata = me.getFormdata();
        grid = me.getGrid();
        var rec = grid.getSelectedRecord();
        project_id = rec.get('project_id');
        me.senddata = {
            "hideparam": 'getprojectforpayment',
            "project_id": project_id
        }
        me.urlrequest = 'cashier/kasbondeptposting/read';
        me.AjaxRequest(form);
    },
     setPrefix: function (form) {
        var me,formdata, project_id, grid, pt_id;
        me = this;
        formdata = me.getFormdata();
        grid = me.getGrid();
        var rec = grid.getSelectedRecord();
        project_id = rec.get('project_id');
        pt_id = rec.get('pt_id');
        me.senddata = {
            "hideparam": 'getprojectforprefix',
            "project_id": project_id,
            "pt_id": pt_id
        }
        me.urlrequest = 'cashier/kasbondeptposting/read';
        me.AjaxRequest(form);
    },
    formDataShow: function (el, act, action) {

        var me,grid,rec, cashbon_fund_transfer_id, batas_toleransi, amount, cashbon_fund_transfer_id, is_realized, gridnew;
        me = this;
        grid = me.getGrid();
        gridnew = me.getGridnew();

        me.formDataShowReal(el,act,action);

       /* if(grid.tab.active == true){
             rec = grid.getSelectedRecord();
            cashbon_fund_transfer_id  = rec.get('cashbon_fund_transfer_id');
            batas_toleransi = rec.get('batas_toleransi');
            amount = rec.get('amount');
            is_realized = rec.get('is_realized_cashbon_fund');
        }
       if (grid.tab.active == true && act == 'update'){ 
            if(batas_toleransi != 0 && cashbon_fund_transfer_id == 0 && (amount >= batas_toleransi)){
                 me.buildWarningAlert("Please Generate Voucher for Cashbon Fund Transfer First");
                 return false;

            }else if (cashbon_fund_transfer_id != 0 && is_realized != 2){
                 me.buildWarningAlert("Please Realize the Fund Transfer Voucher Before Realize the Cashbon. <br> Please check in menu Transaction > Voucher");
                 return false;
            }else{
                 me.formDataShowReal(el,act,action);
            }
        }else if(grid.tab.active == true && act == 'read'){
            me.formDataShowReal(el,act,action);
        }else if(gridnew.tab.active == true){
             me.formDataShowReal(el,act,action);
        } */
 
    },

     formDataShowReal: function (el, act, action) {


        var me = this;
        var formtitle, formicon;

        var gfp = me.getFormProperties(action);
        var state = gfp.state;

        formtitle = gfp.formtitle;
        formicon = gfp.formicon;

        var winId = 'win-holidayformdata';
        var win = desktop.getWindow(winId);
        if (!win) {
            win = desktop.createWindow({
                id: winId,
                title: formtitle,
                iconCls: formicon,
                resizable: true,
                minimizable: false,
                maximizable: true,
                width: me.formWidth,
                renderTo: Ext.getBody(),
                constrain: true,
                constrainHeader: false,
                modal: true,
                layout: 'fit',
                shadow: 'frame',
                shadowOffset: 10,
                border: false,
                state: state,
                listeners: {
                    boxready: function () {
                        win.body.mask('Loading...');
                        var tm = setTimeout(function () {
                            win.add(Ext.create('Cashier.view.' + me.controllerName + '.FormData'));
                            win.center();
                            win.body.unmask();
                            clearTimeout(tm);
                        }, 1000);

                    }
                }

            });
        }
        win.show();


    },

      GenerateVoucher: function (row) {
        var me, grid, store, info, gridmain, storemain, rec, project_id, pt_id;
        me = this;
        row['hideparam'] = 'generatevoucher';
        grid = me.getGridnew();
        gridmain = me.getGrid();
        store = grid.getStore();
        storemain = gridmain.getStore();
        rec = gridmain.getSelectedRecord();
        var rows = me.getGridnew().getSelectionModel().getSelection();
        project_id = rec.get('project_id');
        pt_id = rec.get('pt_id');
        // check coa config first
          data = { 'hideparam' : 'checkcoaconfig',
                 'project_id' : project_id,
                 'pt_id' : pt_id,
                }

         Ext.Ajax.request({
                    url: 'cashier/kasbondeptposting/read',
                    timeout: 45000000,
                    method: 'POST',
                    params: {
                        data: Ext.encode(data)
                    },
                    success: function (response) {
                        info = Ext.JSON.decode(response.responseText);
                        if (info.msg == 'GO ON'){ // IF MATCH WITH REQUIREMENT
                               
                             var confirmmsg = 'Are you sure want to proceed the Generate Voucher ?';
                                  Ext.Msg.confirm('Generate Voucher', confirmmsg, function (btn) {
                                        if (btn == 'yes') {
                                            resetTimer();
                                           
                                               Ext.getBody().mask("Please wait...");


                                           Ext.Ajax.request({
                                                url: me.urldata + 'update',
                                                timeout: 45000000,
                                                method: 'POST',
                                                params: {
                                                    data: Ext.encode(row)
                                                },
                                                success: function (response) {
                                                        info = Ext.JSON.decode(response.responseText);
                                                        var rowjsonheader = info.data;
                                                        var successmsg = info.msg;
                                                        var kasbankid_out = rowjsonheader.kasbankid_out;
                                                        var kasbankid_in = rowjsonheader.kasbankid_in;

                                                       
                                                    
                                                        successmsg = 'Success .<br/>Voucher '+ kasbankid_out + ' and '+ kasbankid_in +' Have Been Generated.<br/>Please check on menu Voucher';
                                                     
                                                   
                                                          Ext.Msg.show({
                                                            title: 'Warning',
                                                            msg: successmsg,
                                                            icon: Ext.Msg.INFO,
                                                            buttons: Ext.Msg.OK
                                                        });
                                                          gridmain.up('window').getEl().unmask();
                                                           Ext.getBody().unmask();

                                                          store.reload();
                                                          storemain.reload();

                                                },
                                                failure: function (response) {
                                                     me.getGridnew().up('window').mask('Process Generate Voucher,failed..');
                                                    grid.up('window').getEl().unmask();
                                                    store.reload();
                                                }
                                             
                                            });
                                        }
                                    });

                        
                        }else{// HIT THE CONDITION
                         
                            me.buildWarningAlert(info.msg);
                            return false;

                        }
                    }

            });
         // end check



       
       /* */
    },

    generateVoucherMulti: function(){
        var me = this;
        var rows = me.getGrid().getSelectionModel().getSelection();
        var rec = me.getGrid().getSelectedRecord();
        var c = rec.data;
        var confirmmsg, successmsg, failmsg;
        var kasbondept_id = '';
        var row = {hideparam:'generatevouchermulti'};
        var recordcounttext = rows.length + ' record' + (rows.length > 1 ? 's' : '');
        var store = me.getGrid().getStore();
         if (rows.length == 1) {
                var selectedRecord = '[' + store.getAt(store.indexOf(rows[0])).get('voucher_no') + ']';
                confirmmsg = 'Generate Voucher for cashbon ' + selectedRecord + ' ?';
                failmsg = 'Error: Unable to Generate ' + selectedRecord + '.';
            } else {
                confirmmsg = 'This action will Generate Voucher ' + recordcounttext + '.<br />Continue ?';
                failmsg = 'Error: Unable to Generate Data.';
            } 
        Ext.Msg.confirm('Generate Voucher', confirmmsg, function(btn) {
                if (btn == 'yes') {
                    resetTimer();
                        Ext.getBody().mask("Generating..Please wait...");

                     for (var i = 0; i < rows.length; i++) {
                       
                        var id = rows[i]['data']['kasbondept_id'];
                        if (id != 0) {
                            if ((i + 1) == rows.length) {
                                kasbondept_id = kasbondept_id + id;
                             
                            } else {
                                kasbondept_id = kasbondept_id + id + '~';
                               

                            }
                        }
                    }
                    row['kasbondept_id_multi'] = kasbondept_id;
                    row['pt_id'] = rows[0]['data']['pt_id'];
                    row['project_id'] = rows[0]['data']['project_id'];
                    row['kasbondept_id'] = 0;


                     Ext.Ajax.request({
                                                url: me.urldata + 'update',
                                                timeout: 45000000,
                                                method: 'POST',
                                                params: {
                                                    data: Ext.encode(row)
                                                },
                                                success: function (response) {
                                                        info = Ext.JSON.decode(response.responseText);
                                                        var rowjsonheader = info.data;
                                                        var successmsg = info.msg;
                                                        var kasbankid_out = rowjsonheader.kasbankid_out;
                                                        var kasbankid_in = rowjsonheader.kasbankid_in;

                                                       
                                                    
                                                        successmsg = 'Success .<br/>Voucher '+ kasbankid_out + ' and '+ kasbankid_in +' Have Been Generated.<br/>Please check on menu Voucher';
                                                     
                                                   
                                                          Ext.Msg.show({
                                                            title: 'Warning',
                                                            msg: successmsg,
                                                            icon: Ext.Msg.INFO,
                                                            buttons: Ext.Msg.OK
                                                        });
                                                           Ext.getBody().unmask();

                                                          store.reload();
                                                          storemain.reload();

                                                },
                                                failure: function (response) {
                                                     me.getGridnew().up('window').mask('Process Generate Voucher,failed..');
                                                    grid.up('window').getEl().unmask();
                                                    store.reload();
                                                }
                                             
                                            });

                }
            });



    },
    getDatadetailAttachment: function () {
        var me, pd, counter, form, rowdata, lengthkelsub, storeattachment, gridattachment, rawjson = '';
        me = this;
        pd = me.paramdetail;
        form = me.getFormdata();
        pd.gridattachment = me.getGridattachmentdetail();
        pd.storeattachment = pd.grid.getStore();
        pd.storeattachment.load({
            params: {
                "hideparam": 'attachment',
                "kasbondept_id": me.getValue(me, 'kasbondept_id', 'value'),
                "start": 0,
                "limit": 1000,
            },
            callback: function (records, operation, success) {
                counter = pd.storeattachment.getCount();
                rawjson = pd.storeattachment.proxy.getReader().jsonData;
                if (counter > 0) {
                    rowdata = records[0]['data'];
                    pd.grid.getSelectionModel().select(0, true);
                  

                }
            }
        });

    },
    FormUploadAttachmentRead: function (shortcut) {
        var me, p, psa, pmsa, grid, form = '';
        var me = this.getMe();
        if(shortcut == 0){
             grid = me.getGridattachmentdetail();
             form = me.getFormdata();
         }else{
             grid = me.getGridshortcutattachment();
             form = me.getFormshortcutattachment();
         }
       
        
        var rows = grid.getSelectionModel().getSelection();
        if (rows.length < 1) {
            Ext.Msg.alert('Info', 'No record selected !');
            return;
        } 
        if (rows.length > 1) {
            Ext.Msg.alert('Info', 'Please select 1 data !');
            return;
        } 

        var record = grid.getSelectionModel().getSelection()[0];
       
        var re = /(?:\.([^.]+))?$/;
        var ext = re.exec(record.get("filename"))[1]; 
        form.setLoading('Loading content...');
        Ext.Ajax.request({
            async: true,
            url: 'cashier/common/read',
            method: 'POST',
            timeout: 45000000,
            params: {
                hideparam: 'getattachmentfile',
                path: record.get("path")
            },
            success: function (response) {
                resjson = Ext.JSON.decode(response.responseText);
                var base64src = resjson.data.base64src;
                var downloadsrc = decodeURIComponent(resjson.data.signedUrl);
                if(ext=='pdf'){
                    var html='<embed scrolling="no" src="'+base64src+'" type="application/pdf" width="100%" height="100%">';
                }else{
                    var html='<div style="style="display: block; min-height: 600px; width: 700px; min-width: 700px">';
                        html = html+'<img src="'+base64src+'" style="overflow: auto; display: block; height: auto; width: 100%"></div>';
                        html = html+'<div><a style="padding: 10px; float: right;" target="_blank" href="'+downloadsrc+'" download>Download</a></div>';
                }

                Ext.create("Ext.Window",{
                    title : 'Attachment Viewer : ' + record.get("filename"),
                    width : 700,                            
                    height: 500,
                    closable : true,                           
                    html : html,  
                    autoScroll: true,                       
                    modal : true
                }).show();

                //Ext.Msg.alert('Attachment', '<div style="style="display: block; min-height: 500px; width: 700px; min-width: 700px"><img src="'+response+'" style="display: block; height: auto; width: 100%"></div><a target="_blank" href="'+response+'">Download</a>');
                form.setLoading(false);
            },
            failure: function (response) {
                me.alertFormdataFailed();
                form.setLoading(false);
                me.messagedata = 'data error';
                throw me.messagedata;
            }
        });

       
    },

    gridActionColumnBoxReady: function() {
        var me, grid;
        me = this;
        grid = me.getGridnew();

        Ext.Ajax.request({
            async: true,
            url: 'cashier/kasbondeptposting/read',
            method: 'POST',
            timeout: 45000000,
            params: {
                hideparam: 'is_cgg',
                project_id: me.project_id,
                pt_id: me.pt_id
            },
            success: function function_name(response) {
                resjson = Ext.JSON.decode(response.responseText);
                if ( resjson.data == 1 ) {
                    var actionColumn = grid.down('actioncolumn').items;
                    for( var i in actionColumn ){
                        if ( actionColumn[i].action == 'unposting' ) {
                            actionColumn[i].className = 'ux-actioncolumn x-hide-display';
                        }
                    }
                }else{
                    var actionColumn = grid.down('actioncolumn').items;
                    for( var i in actionColumn ){
                        if ( actionColumn[i].action == 'unposting' ) {
                            actionColumn[i].className = 'ux-actioncolumn act-KasbondeptPostingUnposting';
                        }
                    }
                }
            }
        });
    },

    getSettingGlobalParam : function (){
        var me               = this,
            fs               = me.getFormsearch();
            project_id       = ( fs.down("[name=pt_id]").valueModels.length != 0 ? fs.down("[name=pt_id]").valueModels[0].data.project_id : parseInt(apps.project) ),
            pt_id            = ( fs.down("[name=pt_id]").getValue() ? fs.down("[name=pt_id]").getValue() : parseInt(apps.pt) ),
            list_params_key  = '',
            list_params_name = '';

        for (key in me.global_param) {
            list_params_key = list_params_key + key + '~';
            list_params_name = list_params_name + me.global_param[key].name + '~';
        }
        
        Ext.Ajax.request({
            url   : me.urldata + 'read',
            params: {
                'hideparam'       : 'getsettingglobalparam',
                'project_id'      : project_id,
                'pt_id'           : pt_id,
                'list_params'     : list_params_key,
                'list_params_name': list_params_name,
            },
            success: function(response){
                var data = Ext.JSON.decode(response.responseText);
                if (data.msg == 'Success') {
                    for (var i = 0; i < data.data.length; i++) {
                        var parameter = data.data[i].parameter;
                        var value = data.data[i].value;
                        switch (parameter) {
                            case 'backdate_cashbon':
                                me.global_param[parameter]['value'] = (value ? parseInt(value) : me.global_param[parameter]['default']);
                                break;
                        
                            default:
                                break;
                        }
                    }
                }
                console.log(me.global_param);
            }
        });
    }

});