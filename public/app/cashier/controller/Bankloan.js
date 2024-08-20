Ext.define('Cashier.controller.Bankloan', {
    extend: 'Cashier.library.template.controller.Controllermodule',
    alias: 'controller.Bankloan',
    requires: [
        'Cashier.library.box.Config',
        'Cashier.library.box.tools.EventSelector',
        'Cashier.library.box.tools.Tools',
        'Cashier.template.ComboBoxFields',
        'Cashier.library.template.combobox.Ptusercombobox',
        'Cashier.library.template.combobox.Subholdingcombobox',
        'Cashier.library.template.combobox.CurrencycomboboxV2',
        'Cashier.library.template.combobox.Jenisloanscombobox',
        'Cashier.library.template.combobox.Kategoriloanscombobox',
        'Cashier.library.template.combobox.Jenispinjamancombobox',
        'Cashier.library.template.combobox.Krediturcombobox',
        'Cashier.library.template.combobox.Kategoribungacombobox',
        'Cashier.library.template.combobox.Benchmarkingcombobox',
        'Cashier.library.template.combobox.Coacomboboxgrid',
        'Cashier.library.template.combobox.Coagrid',
        'Cashier.library.template.combobox.Ptcustomcombobox',
    ],
    views: [
        'bankloan.Panel',
        'bankloan.Grid',
        'bankloan.FormSearch',
        'bankloan.FormData',
        'bankloan.Griddetail',
        'bankloan.FormDataDetail',
        'bankloan.FormDataGenerateDetail'
    ],
    stores: [
        'Bankloan',
        'Bankloandetail',
        'Ptbyuser',
        'Subholding',
        'CurrencyV2',
        'Jenisloans',
        'Kategoriloans',
        'Jenispinjaman',
        'Kreditur',
        'Kategoribunga',
        'Benchmarking',
        'Coacombo',
        'Ptcustom',
    ],
    models: [
        'Bankloan',
        'Bankloandetail',
        'Project',
        'Pt',
        'Subholding',
        'CurrencyV2',
        'Jenisloans',
        'Kategoriloans',
        'Jenispinjaman',
        'Kreditur',
        'Kategoribunga',
        'Benchmarking',
        'Coa',
        'Ptcustom',
    ],
    refs: [
        {ref: 'panel', selector: 'bankloanpanel'},
        {ref: 'grid', selector: 'bankloangrid'},
        {ref: 'formsearch', selector: 'bankloanformsearch'},
        {ref: 'formdata', selector: 'bankloanformdata'},
        {ref: 'griddetail', selector: 'bankloangriddetail'},
        {ref: 'formdatadetail', selector: 'bankloandetailformdata'},
        {ref: 'formdatageneratedetail', selector: 'bankloandetailgenerateformdata'},
    ],
    controllerName: 'bankloan',
    formWidth: 840,
    fieldName: 'periode',
    bindPrefixName: 'Bankloan',
    urldata: 'cashier/bankloan/',
    urldetail: 'cashier/bankloan/detail',
    messagedata: null,
    senddata: null,
    info: null,
    state: null,
    loadingrequest: new Ext.LoadMask(Ext.getBody(), {msg: "Please wait..."}),
    projectpt_id: parseInt(apps.projectpt),
    project_id: parseInt(apps.project),
    pt_id: parseInt(apps.pt),
    subholding_id: parseInt(apps.subholdingId),
    gid:parseInt(apps.gid),
    valueform: null,
    date: new Date,
    allowed_generated: false,
    multiproject: [],
    paramdetail: {
        fromlocation: 'Cashier.view.bankloan.FormDataDetail',
        formtitle: 'Detail Bank Loan',
        formicon: 'icon-form-add',
        formid: 'win-bankloandetailformdata',
        formlayout: 'fit',
        formshadow: 'frame',
        formmask: 'Loading...',
        formwidth: 900,
        formtimeout: 0,
        stateform: null,
        formaction: null,
        formproperties: null,
        formwindows: null,
        iddetail: 0,
        store: null,
        data: null,
        record: null,
        grid: null,
        row: null,
        checkdata: false,
        object: null,
        rowdata: null,
        action: null,
        counter: 0,
    },
    paramgeneratedetail: {
        fromlocation: 'Cashier.view.bankloan.FormDataGenerateDetail',
        formtitle: 'Generate Detail',
        formicon: 'icon-form-add',
        formid: 'win-bankloandetailformdata',
        formlayout: 'fit',
        formshadow: 'frame',
        formmask: 'Loading...',
        formwidth: 500,
        formtimeout: 0,
        stateform: null,
        formaction: null,
        formproperties: null,
        formwindows: null,
        iddetail: 0,
        store: null,
        data: null,
        record: null,
        grid: null,
        row: null,
        checkdata: false,
        object: null,
        rowdata: null,
        action: null,
        counter: 0,
    },
    role: {
        preparer_bankloan : [],
        approver_bankloan : [],
        viewer_bankloan : [],
    },
    restricted_action: 0,
    getMe: function(){
        var me = this;
        return _Apps.getController(me.bindPrefixName);
    },
    init: function(application) {
        var me = this

        this.control({
            'bankloanpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender:this.panelAfterRender
            },
            'bankloangrid': {
                afterrender: this.gridAfterRenderCustome,
                // itemdblclick: this.gridItemDblClick,
                // itemcontextmenu: this.gridItemContextMenu,
                // selectionchange: this.gridSelectionChange
            },
            'bankloangrid toolbar button[action=destroy]' : {
                click: function () {
                    me.dataDestroyCustome();
                }
            },
            'bankloanformsearch' : {
                afterrender: this.formsearchAfterRender
            },
            'bankloanformsearch [name=projectpt_id]' : {
                change : function (that, newValue, oldValue, eOpts) {
                    me.setProjectPtFormSearch();
                }
            },
            'bankloanformsearch button[action=search]': {
                click: function () {
                    me.getFormsearch().down('[name=hideparam]').setValue('search');
                    me.dataSearchCustome();
                }
                // click: this.dataSearchCustome
            },
            'bankloanformsearch button[action=reset]': {
                click: this.dataResetCustome
            },
            // =============== FORM HEADER AREA ====================================
            'bankloanformdata': {
                afterrender: this.formDataAfterRenderCustome,
                boxready: function () {
                    me.formDataBoxReadyCustome();
                }
            },
            'bankloanformdata [name=projectpt_id]' : {
                change : function (that, newValue, oldValue, eOpts) {
                    me.getAllowedGenerated();
                    me.getRole(me.getFormdata());
                }
            },
            /*'bankloanformdata [name=pt_id]' : {
                change : function (that, newValue, oldValue, eOpts) {
                    me.getAllowedGenerated();
                }
            },*/
            'bankloanformdata button[action=save]' :{
                click: this.dataSaveCustome
            },
            // =============== GRID DETAIL AREA ====================================
            'bankloangriddetail':{
                selectionchange: this.gridDetailSelectionChangeCustome
            },
            'bankloangriddetail toolbar button[action=create]': {
                click: function () {
                    me.formDataDetailShow('create');
                } 
            },
            'bankloangriddetail toolbar button[action=update]': {
                click: function () {
                    me.formDataDetailShow('update');
                } 
            },
            'bankloangriddetail toolbar button[action=generate]': {
                click: function () {
                    me.formGenerateShow();
                    // me.formDataGenerateDetailShow();
                }
            },
            'bankloangriddetail toolbar button[action=destroy]': {
                click: function () {
                    me.dataDestroydetailwithflag();
                } 
            },
            'bankloangriddetail toolbar button[action=read]': {
                click: function () {
                    me.formDataDetailShow('read');
                } 
            },
            // =============== FORM DETAIL AREA ====================================
            'bankloandetailformdata' : {
                afterrender: this.formDataDetailAfterRenderCustome
            },
            'bankloandetailformdata button[action=save]': {
                click: this.dataSaveDetailstore
            },
            'bankloandetailformdata button[action=copy]': {
                click: this.copyDetailData
            },
            'bankloandetailformdata [name=kategori_bunga_id]' : {
                change : function (that, newValue, oldValue, eOpts) {
                    var me, fdd, val;
                    me = this;
                    fdd = me.getFormdatadetail();
                    val = fdd.down("[name=kategori_bunga_id]").getValue();

                    if ( val == 3 ) {
                        fdd.down("[name=benchmarking_id]").setVisible(true);
                        fdd.down("[name=persentase]").setVisible(true);
                        Ext.getCmp('label_plus').setVisible(true);
                        fdd.down("[name=persentase_label]").setVisible(true);
                    }else{
                        fdd.down("[name=benchmarking_id]").setVisible(false);
                        fdd.down("[name=persentase]").setVisible(false);
                        Ext.getCmp('label_plus').setVisible(false);
                        fdd.down("[name=persentase_label]").setVisible(false);
                    }
                }
            },
            'bankloandetailformdata [name=saldo_hutang]': {
                'keyup': function (event) {
                    me = this.getMe();
                    var fd = me.getFormdatadetail();
                    me._formatCurrency(fd.down('[name=saldo_hutang]'));
                },
                'blur': function() { 
                    me = this.getMe();
                    var fd = me.getFormdatadetail();
                    me._formatCurrency(fd.down('[name=saldo_hutang]'), "blur");
                },
                focus: function() {
                    me = this.getMe();
                    var fd = me.getFormdatadetail();
                    var saldo_hutang = parseInt(fd.down('[name=saldo_hutang]').getValue());
                    if(saldo_hutang == 0 || isNaN(saldo_hutang)){
                        fd.down('[name=saldo_hutang]').setValue('');
                    }
                }
            },
            'bankloandetailformdata [name=saldo_beban_bunga_pl]': {
                'keyup': function (event) {
                    me = this.getMe();
                    var fd = me.getFormdatadetail();
                    me._formatCurrency(fd.down('[name=saldo_beban_bunga_pl]'));
                    me.sumtotalbebanbunga();
                },
                'blur': function() { 
                    me = this.getMe();
                    var fd = me.getFormdatadetail();
                    me._formatCurrency(fd.down('[name=saldo_beban_bunga_pl]'), "blur");
                    me.sumtotalbebanbunga();
                },
                focus: function() {
                    me = this.getMe();
                    var fd = me.getFormdatadetail();
                    var saldo_beban_bunga_pl = parseInt(fd.down('[name=saldo_beban_bunga_pl]').getValue());
                    if(saldo_beban_bunga_pl == 0 || isNaN(saldo_beban_bunga_pl)){
                        fd.down('[name=saldo_beban_bunga_pl]').setValue('');
                    }
                }
            },
            'bankloandetailformdata [name=saldo_beban_bunga_kapitalisasi]': {
                'keyup': function (event) {
                    me = this.getMe();
                    var fd = me.getFormdatadetail();
                    me._formatCurrency(fd.down('[name=saldo_beban_bunga_kapitalisasi]'));
                    me.sumtotalbebanbunga();
                },
                'blur': function() { 
                    me = this.getMe();
                    var fd = me.getFormdatadetail();
                    me._formatCurrency(fd.down('[name=saldo_beban_bunga_kapitalisasi]'), "blur");
                    me.sumtotalbebanbunga();
                },
                focus: function() {
                    me = this.getMe();
                    var fd = me.getFormdatadetail();
                    var saldo_beban_bunga_kapitalisasi = parseInt(fd.down('[name=saldo_beban_bunga_kapitalisasi]').getValue());
                    if(saldo_beban_bunga_kapitalisasi == 0 || isNaN(saldo_beban_bunga_kapitalisasi)){
                        fd.down('[name=saldo_beban_bunga_kapitalisasi]').setValue('');
                    }
                }
            },
            'bankloandetailformdata [name=saldo_beban_bunga_bank_total]': {
                'keyup': function (event) {
                    me = this.getMe();
                    var fd = me.getFormdatadetail();
                    me._formatCurrency(fd.down('[name=saldo_beban_bunga_bank_total]'));
                },
                'blur': function() { 
                    me = this.getMe();
                    var fd = me.getFormdatadetail();
                    me._formatCurrency(fd.down('[name=saldo_beban_bunga_bank_total]'), "blur");
                },
                focus: function() {
                    me = this.getMe();
                    var fd = me.getFormdatadetail();
                    var saldo_beban_bunga_bank_total = parseInt(fd.down('[name=saldo_beban_bunga_bank_total]').getValue());
                    if(saldo_beban_bunga_bank_total == 0 || isNaN(saldo_beban_bunga_bank_total)){
                        fd.down('[name=saldo_beban_bunga_bank_total]').setValue('');
                    }
                }
            },
            'bankloandetailformdata [name=saldo_beban_bunga]': {
                'keyup': function (event) {
                    me = this.getMe();
                    var fd = me.getFormdatadetail();
                    me._formatCurrency(fd.down('[name=saldo_beban_bunga]'));
                },
                'blur': function() { 
                    me = this.getMe();
                    var fd = me.getFormdatadetail();
                    me._formatCurrency(fd.down('[name=saldo_beban_bunga]'), "blur");
                },
                focus: function() {
                    me = this.getMe();
                    var fd = me.getFormdatadetail();
                    var saldo_beban_bunga = parseInt(fd.down('[name=saldo_beban_bunga]').getValue());
                    if(saldo_beban_bunga == 0 || isNaN(saldo_beban_bunga)){
                        fd.down('[name=saldo_beban_bunga]').setValue('');
                    }
                }
            },
            'bankloandetailformdata [name=jt_1_tahun]': {
                'keyup': function (event) {
                    me = this.getMe();
                    var fd = me.getFormdatadetail();
                    me._formatCurrency(fd.down('[name=jt_1_tahun]'));
                    me.sumtotaljt();
                },
                'blur': function() { 
                    me = this.getMe();
                    var fd = me.getFormdatadetail();
                    me._formatCurrency(fd.down('[name=jt_1_tahun]'), "blur");
                    me.sumtotaljt();
                },
                focus: function() {
                    me = this.getMe();
                    var fd = me.getFormdatadetail();
                    var jt_1_tahun = parseInt(fd.down('[name=jt_1_tahun]').getValue());
                    if(jt_1_tahun == 0 || isNaN(jt_1_tahun)){
                        fd.down('[name=jt_1_tahun]').setValue('');
                    }
                }
            },
            'bankloandetailformdata [name=jt_2_tahun]': {
                'keyup': function (event) {
                    me = this.getMe();
                    var fd = me.getFormdatadetail();
                    me._formatCurrency(fd.down('[name=jt_2_tahun]'));
                    me.sumtotaljt();
                },
                'blur': function() { 
                    me = this.getMe();
                    var fd = me.getFormdatadetail();
                    me._formatCurrency(fd.down('[name=jt_2_tahun]'), "blur");
                    me.sumtotaljt();
                },
                focus: function() {
                    me = this.getMe();
                    var fd = me.getFormdatadetail();
                    var jt_2_tahun = parseInt(fd.down('[name=jt_2_tahun]').getValue());
                    if(jt_2_tahun == 0 || isNaN(jt_2_tahun)){
                        fd.down('[name=jt_2_tahun]').setValue('');
                    }
                }
            },
            'bankloandetailformdata [name=jt_3_tahun]': {
                'keyup': function (event) {
                    me = this.getMe();
                    var fd = me.getFormdatadetail();
                    me._formatCurrency(fd.down('[name=jt_3_tahun]'));
                    me.sumtotaljt();
                },
                'blur': function() { 
                    me = this.getMe();
                    var fd = me.getFormdatadetail();
                    me._formatCurrency(fd.down('[name=jt_3_tahun]'), "blur");
                    me.sumtotaljt();
                },
                focus: function() {
                    me = this.getMe();
                    var fd = me.getFormdatadetail();
                    var jt_3_tahun = parseInt(fd.down('[name=jt_3_tahun]').getValue());
                    if(jt_3_tahun == 0 || isNaN(jt_3_tahun)){
                        fd.down('[name=jt_3_tahun]').setValue('');
                    }
                }
            },
            'bankloandetailformdata [name=jt_4_tahun]': {
                'keyup': function (event) {
                    me = this.getMe();
                    var fd = me.getFormdatadetail();
                    me._formatCurrency(fd.down('[name=jt_4_tahun]'));
                    me.sumtotaljt();
                },
                'blur': function() { 
                    me = this.getMe();
                    var fd = me.getFormdatadetail();
                    me._formatCurrency(fd.down('[name=jt_4_tahun]'), "blur");
                    me.sumtotaljt();
                },
                focus: function() {
                    me = this.getMe();
                    var fd = me.getFormdatadetail();
                    var jt_4_tahun = parseInt(fd.down('[name=jt_4_tahun]').getValue());
                    if(jt_4_tahun == 0 || isNaN(jt_4_tahun)){
                        fd.down('[name=jt_4_tahun]').setValue('');
                    }
                }
            },
            'bankloandetailformdata [name=jt_5_tahun]': {
                'keyup': function (event) {
                    me = this.getMe();
                    var fd = me.getFormdatadetail();
                    me._formatCurrency(fd.down('[name=jt_5_tahun]'));
                    me.sumtotaljt();
                },
                'blur': function() { 
                    me = this.getMe();
                    var fd = me.getFormdatadetail();
                    me._formatCurrency(fd.down('[name=jt_5_tahun]'), "blur");
                    me.sumtotaljt();
                },
                focus: function() {
                    me = this.getMe();
                    var fd = me.getFormdatadetail();
                    var jt_5_tahun = parseInt(fd.down('[name=jt_5_tahun]').getValue());
                    if(jt_5_tahun == 0 || isNaN(jt_5_tahun)){
                        fd.down('[name=jt_5_tahun]').setValue('');
                    }
                }
            },
            'bankloandetailformdata [name=jt_6_tahun]': {
                'keyup': function (event) {
                    me = this.getMe();
                    var fd = me.getFormdatadetail();
                    me._formatCurrency(fd.down('[name=jt_6_tahun]'));
                    me.sumtotaljt();
                },
                'blur': function() { 
                    me = this.getMe();
                    var fd = me.getFormdatadetail();
                    me._formatCurrency(fd.down('[name=jt_6_tahun]'), "blur");
                    me.sumtotaljt();
                },
                focus: function() {
                    me = this.getMe();
                    var fd = me.getFormdatadetail();
                    var jt_6_tahun = parseInt(fd.down('[name=jt_6_tahun]').getValue());
                    if(jt_6_tahun == 0 || isNaN(jt_6_tahun)){
                        fd.down('[name=jt_6_tahun]').setValue('');
                    }
                }
            },
            'bankloandetailformdata [name=jt_7_tahun]': {
                'keyup': function (event) {
                    me = this.getMe();
                    var fd = me.getFormdatadetail();
                    me._formatCurrency(fd.down('[name=jt_7_tahun]'));
                    me.sumtotaljt();
                },
                'blur': function() { 
                    me = this.getMe();
                    var fd = me.getFormdatadetail();
                    me._formatCurrency(fd.down('[name=jt_7_tahun]'), "blur");
                    me.sumtotaljt();
                },
                focus: function() {
                    me = this.getMe();
                    var fd = me.getFormdatadetail();
                    var jt_7_tahun = parseInt(fd.down('[name=jt_7_tahun]').getValue());
                    if(jt_7_tahun == 0 || isNaN(jt_7_tahun)){
                        fd.down('[name=jt_7_tahun]').setValue('');
                    }
                }
            },
            'bankloandetailformdata [name=jt_8_tahun]': {
                'keyup': function (event) {
                    me = this.getMe();
                    var fd = me.getFormdatadetail();
                    me._formatCurrency(fd.down('[name=jt_8_tahun]'));
                    me.sumtotaljt();
                },
                'blur': function() { 
                    me = this.getMe();
                    var fd = me.getFormdatadetail();
                    me._formatCurrency(fd.down('[name=jt_8_tahun]'), "blur");
                    me.sumtotaljt();
                },
                focus: function() {
                    me = this.getMe();
                    var fd = me.getFormdatadetail();
                    var jt_8_tahun = parseInt(fd.down('[name=jt_8_tahun]').getValue());
                    if(jt_8_tahun == 0 || isNaN(jt_8_tahun)){
                        fd.down('[name=jt_8_tahun]').setValue('');
                    }
                }
            },
            'bankloandetailformdata [name=jt_9_tahun]': {
                'keyup': function (event) {
                    me = this.getMe();
                    var fd = me.getFormdatadetail();
                    me._formatCurrency(fd.down('[name=jt_9_tahun]'));
                    me.sumtotaljt();
                },
                'blur': function() { 
                    me = this.getMe();
                    var fd = me.getFormdatadetail();
                    me._formatCurrency(fd.down('[name=jt_9_tahun]'), "blur");
                    me.sumtotaljt();
                },
                focus: function() {
                    me = this.getMe();
                    var fd = me.getFormdatadetail();
                    var jt_9_tahun = parseInt(fd.down('[name=jt_9_tahun]').getValue());
                    if(jt_9_tahun == 0 || isNaN(jt_9_tahun)){
                        fd.down('[name=jt_9_tahun]').setValue('');
                    }
                }
            },
            'bankloandetailformdata [name=jt_10_tahun]': {
                'keyup': function (event) {
                    me = this.getMe();
                    var fd = me.getFormdatadetail();
                    me._formatCurrency(fd.down('[name=jt_10_tahun]'));
                    me.sumtotaljt();
                },
                'blur': function() { 
                    me = this.getMe();
                    var fd = me.getFormdatadetail();
                    me._formatCurrency(fd.down('[name=jt_10_tahun]'), "blur");
                    me.sumtotaljt();
                },
                focus: function() {
                    me = this.getMe();
                    var fd = me.getFormdatadetail();
                    var jt_10_tahun = parseInt(fd.down('[name=jt_10_tahun]').getValue());
                    if(jt_10_tahun == 0 || isNaN(jt_10_tahun)){
                        fd.down('[name=jt_10_tahun]').setValue('');
                    }
                }
            },
            'bankloandetailformdata [name=saldo_kas_setara_kas]': {
                'keyup': function (event) {
                    me = this.getMe();
                    var fd = me.getFormdatadetail();
                    me._formatCurrency(fd.down('[name=saldo_kas_setara_kas]'));
                },
                'blur': function() { 
                    me = this.getMe();
                    var fd = me.getFormdatadetail();
                    me._formatCurrency(fd.down('[name=saldo_kas_setara_kas]'), "blur");
                },
                focus: function() {
                    me = this.getMe();
                    var fd = me.getFormdatadetail();
                    var saldo_kas_setara_kas = parseInt(fd.down('[name=saldo_kas_setara_kas]').getValue());
                    if(saldo_kas_setara_kas == 0 || isNaN(saldo_kas_setara_kas)){
                        fd.down('[name=saldo_kas_setara_kas]').setValue('');
                    }
                }
            },
            'bankloandetailformdata [name=saldo_restricted_fund]': {
                'keyup': function (event) {
                    me = this.getMe();
                    var fd = me.getFormdatadetail();
                    me._formatCurrency(fd.down('[name=saldo_restricted_fund]'));
                },
                'blur': function() { 
                    me = this.getMe();
                    var fd = me.getFormdatadetail();
                    me._formatCurrency(fd.down('[name=saldo_restricted_fund]'), "blur");
                },
                focus: function() {
                    me = this.getMe();
                    var fd = me.getFormdatadetail();
                    var saldo_restricted_fund = parseInt(fd.down('[name=saldo_restricted_fund]').getValue());
                    if(saldo_restricted_fund == 0 || isNaN(saldo_restricted_fund)){
                        fd.down('[name=saldo_restricted_fund]').setValue('');
                    }
                }
            },
            // =============== FORM GENERATE DETAIL AREA ====================================
            'bankloandetailgenerateformdata' : {
                afterrender: this.formDataGenerateDetailAfterRenderCustome
            },
            'bankloandetailgenerateformdata [action=generate]' : {
                click: function () {
                    me.formGenerateShow();
                }
            },
        });
    },
    panelAfterRender: function () {
        var me, panel;
        me = this;
        panel = me.getPanel();
        panel.up('window').maximize();
        // console.log(me.getFormsearch().getForm().getValues());
        me.getRole(me.getFormsearch());
    },
    formsearchAfterRender: function () {
        var me, fs, storecustomcombobox, storemultiproject;
        me = this;
        fs = me.getFormsearch();
        storecustomcombobox = me.getStore('Ptcustom');
        storemultiproject = me.getStore('Ptbyuser');

        // LOAD STORE INPUT FORM SEARCH
        // fs.down("[name=projectpt_id]").getStore().load();

        // FILTER PT YANG BISA DIAKSES DIBAGIAN SINI
        storemultiproject.load({
            params: {
                "hideparam"     : 'getptbyuser',
                "project_id"    : me.project_id,
                "start"         : 0,
                "limit"         : 1000,
            },
            callback: function (records2, operation2, success2) {
                storemultiproject.each(function (rec, idx) {
                    me.multiproject.push(rec.get('projectpt_id'));
                });
            }
        });

        // console.log(me.multiproject);
        var i = 1;
        storecustomcombobox.load({
            params: {
                "hideparam"     : 'getcustomptcombobox',
                "start"         : 0,
                "limit"         : 1000,
            },
            callback: function (records, operation, success) {
                if ( me.role.viewer_bankloan.includes(apps.uid) == false ) {
                    storecustomcombobox.filterBy( function (rec, idx) {
                        if ( me.multiproject.includes( rec.get('projectpt_id') ) ) {
                            // console.log(i + '. ' + rec.get('project_name') + ' - ' + rec.get('pt_name'));
                            i++;
                            return true;
                        }else{
                            return false;
                        }
                    });
                }
            }
        });

        fs.down("[name=subholding_id]").getStore().load();

        fs.down("[name=projectpt_id]").setValue( me.projectpt_id );
        fs.down("[name=project_id]").setValue( me.project_id );
        fs.down("[name=pt_id]").setValue( me.pt_id );
        fs.down("[name=subholding_id]").setValue(me.subholding_id);
        fs.down("[name=hideparam]").setValue('default');
    },
    setProjectPtFormSearch: function () {
        var me, fs;
        me = this;
        fs = me.getFormsearch();
        // console.log(fs.down("[name=pt_id]").valueModels[0]);
        fs.down("[name=project_id]").setValue( fs.down("[name=projectpt_id]").valueModels[0].data.project_id );
        fs.down("[name=pt_id]").setValue( fs.down("[name=projectpt_id]").valueModels[0].data.pt_id );
        fs.down("[name=subholding_id]").setValue( fs.down("[name=projectpt_id]").valueModels[0].data.subholding_id );

        me.subholding_id = parseInt(fs.down("[name=projectpt_id]").valueModels[0].data.subholding_id);
        me.projectpt_id = parseInt(fs.down("[name=projectpt_id]").getValue());
        me.project_id = parseInt(fs.down("[name=projectpt_id]").valueModels[0].data.project_id);
        me.pt_id = parseInt(fs.down("[name=projectpt_id]").valueModels[0].data.pt_id);

        /*console.log(me.subholding_id);
        console.log(me.projectpt_id);
        console.log(me.project_id);
        console.log(me.pt_id);*/
    },
    gridAfterRenderCustome: function () {
        var me;
        me = this;
        me.dataSearchCustome();
    },
    gridDetailSelectionChangeCustome: function () {
        var me, grid, row;
        me = this;
        grid = me.getGriddetail();
        row = grid.getSelectionModel().getSelection();
        if ( row.length == 0 ) {
            grid.down('#btnEdit').setDisabled(true);
            grid.down('#btnDelete').setDisabled(true);
        }else{

            if (me.restricted_action == 1) {
                grid.down('#btnEdit').setDisabled(true);
                grid.down('#btnDelete').setDisabled(true);
            }else{
                if ( row.length > 1 ) {
                    grid.down('#btnEdit').setDisabled(true);
                    grid.down('#btnDelete').setDisabled(false);
                }else{
                    grid.down('#btnEdit').setDisabled(false);
                    grid.down('#btnDelete').setDisabled(false);
                }
            }
        }
    },
    dataSearchCustome: function () {
        var me, grid, fs, store;
        me = this;
        grid = me.getGrid();
        fs = me.getFormsearch();
        store = grid.getStore();
        resetTimer();
        var fields = fs.getValues();
        for (var x in fields)
        {
            store.getProxy().setExtraParam(x, fields[x]);
        }
        me.loadPage(store);
        console.log(apps);
        console.log(fields);
        // KASIH FLAG BUAT RESTRICTED TOMBOL VIEWER BANKLOAN JADI CUMAN BISA VIEW AJA
        if ( apps.project == 1 && me.role.viewer_bankloan.includes(apps.uid) == true ) {
            if ( fields.project_id != apps.project ) {
                me.restricted_action = 1;
            }else{
                me.restricted_action = 0;
            }
        }

        console.log(me.restricted_action);
        if (me.restricted_action == 1) {
            grid.down('toolbar').setDisabled(true);
            console.log(grid.down('actioncolumn').items[0]);
            console.log(grid.down('actioncolumn').items[1]);
            grid.down('actioncolumn').items[0].disabled = true;
            grid.down('actioncolumn').items[1].disabled = true
        }else{
            grid.down('toolbar').setDisabled(false);
            grid.down('actioncolumn').items[0].disabled = false;
            grid.down('actioncolumn').items[1].disabled = false
        }
    },
    dataResetCustome: function () {
        var me, fs;
        me = this;
        fs = me.getFormsearch();
        fs.down("[name=hideparam]").setValue('default');
        fs.down("[name=pt_id]").setValue(me.pt_id);
        fs.down("[name=subholding_id]").setValue(me.subholding_id);
        /* fs.down("[name=bulan_start]").setValue(parseInt(me.date.getMonth()+1));
        fs.down("[name=tahun_start]").setValue(parseInt(me.date.getFullYear()));
        fs.down("[name=bulan_end]").setValue(parseInt(me.date.getMonth()+1));
        fs.down("[name=tahun_end]").setValue(parseInt(me.date.getFullYear())); */
    },
    formDataAfterRenderCustome: function () {  
        var me, state, fd, grid, store, record;
        me = this;
        fd = me.getFormdata();
        state = fd.up('window').state.toLowerCase();
        me.storeProcess = me.createSpProcessObj(me.storeProcess);
        me.fdar().init();
        me.loadComboBoxStore(fd);

        if (state == 'create') {
            me.fdar().create();
        } else if (state == 'update') {
            me.fdar().update();

            grid = me.getGrid();
            store = grid.getStore();
            record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));
            counter = store.getCount();
            console.log(record);
            fd.loadRecord(record['data'])
        } else if (state == 'read') {
            me.fdar().read();
        }
    },
    formDataBoxReadyCustome: function () {
        var me, state, fd, gd, storecustomcombobox;
        me = this;
        fd = me.getFormdata();
        gd = me.getGriddetail();
        state = fd.up('window').state.toLowerCase();
        storecustomcombobox = me.getStore('Ptcustom');

        var i = 1;
        storecustomcombobox.load({
            params: {
                "hideparam"     : 'getcustomptcombobox',
                "start"         : 0,
                "limit"         : 1000,
            },
            callback: function (records, operation, success) {

                if ( me.role.viewer_bankloan.includes(apps.uid) == false ) {
                    storecustomcombobox.filterBy( function (rec, idx) {
                        if ( me.multiproject.includes( rec.get('projectpt_id') ) ) {
                            // console.log(i + '. ' + rec.get('project_name') + ' - ' + rec.get('pt_name'));
                            i++;
                            return true;
                        }else{
                            return false;
                        }
                    });
                }
            }
        });

        if ( state == 'create') {
            fd.down("[name=projectpt_id]").setValue(me.projectpt_id);
            gd.getStore().loadData([], false);
        }else if( state == 'update' ){
            fd.down("[name=projectpt_id]").setValue(me.projectpt_id);
            me.getDataDetail();
        }else{
            fd.down("[name=projectpt_id]").setValue(me.projectpt_id);
            me.getDataDetail();
            // gd.down('toolbar').setDisabled(true);
            fd.down('[action=save]').setDisabled(true);
        }
    },
    formGenerateShow: function () {
        var me, fd, fgd, griddetail, storedetail, params;
        me = this;
        fd = me.getFormdata();
        fgd = me.getFormdatageneratedetail();
        griddetail = me.getGriddetail();
        storedetail = griddetail.getStore();


        Ext.Msg.confirm('Confirmation', 'Generate ulang saldo pada periode yang dipilih?<br>(seluruh data pada periode ini akan dihapus)', function (btn) {
            if (btn == 'yes') {
                
                params = {
                    // project_id : fd.down("[name=pt_id]").valueModels[0].data.project_id,
                    project_id : fd.down("[name=projectpt_id]").valueModels[0].data.project_id,
                    // pt_id : fd.down("[name=pt_id]").getValue(),
                    pt_id : fd.down("[name=projectpt_id]").valueModels[0].data.pt_id,
                    bulan : fd.down("[name=bulan]").getValue(),
                    tahun : fd.down("[name=tahun]").getValue(),
                    // saldo_kas_setara_kas : fgd.down("[name=coa_saldo_kas]").getValue(),
                    // saldo_restricted_fund : fgd.down("[name=coa_saldo_restricted]").getValue(),
                    hideparam : 'generate'
                }
                // console.log(params); return;
                // fgd.setLoading('Please Wait...');
                fd.setLoading('Please Wait...');
                Ext.Ajax.request({
                    url: me.urldata + 'read',
                    method: 'POST',
                    params: params,
                    success: function (response) {
                        var resjson = Ext.JSON.decode(response.responseText);
                        if (resjson.total > 0) {

                            if ( storedetail.getCount() > 0 ) {
                                storedetail.each(function(record, index) {
                                    record.set("deleted", true);
                                    record.set("statedata", "delete");
                                });
                            }else{
                                storedetail.loadData([], false);
                            }

                            storedetail.add(resjson.data)
                            storedetail.commitChanges();
                            
                            storedetail.clearFilter(true);
                            storedetail.filter('deleted', false);
                            console.log(storedetail);
                        }else{
                            Ext.Msg.alert('Info', resjson.msg);
                        }
                        /*fgd.setLoading(false);
                        fgd.up('window').close();*/
                        fd.setLoading(false);
                    }
                });
            }
        });

    },
    dataSaveCustome: function () {
        var me, formheader, formdetail, gridheader, griddetail, storeheader, storedetail, counterdetail, valueheader, valuedetail, idProperty, recordheader;
        me = this;
        formheader = me.getFormdata();
        formdetail = me.getFormdatadetail();
        gridheader = me.getGrid();
        griddetail = me.getGriddetail();
        storeheader = gridheader.getStore();
        storedetail = griddetail.getStore();
        counterdetail = storedetail.getCount();

        if ( formheader.getForm().isValid() ) {
            valueheader = formheader.getForm().getValues();
            // console.log(valueheader);return;

            formheader.up('window').body.mask('Saving data, please wait ...');
            state = formheader.up('window').state.toLowerCase();

            valueheader['hideparam'] = state;
            switch (state){
                case 'create':
                    storeheader.add(valueheader);
                break;
                case 'update':
                    idProperty = storeheader.getProxy().getReader().getIdProperty();
                    recordheader = storeheader.getById(parseInt(formheader.getForm().findField(idProperty).getValue(), 10));
                    recordheader.beginEdit();
                    recordheader.set(valueheader);
                    recordheader.endEdit();
                break;
            }

            Ext.Ajax.request({
                url: me.urldata + state,
                method: 'POST',
                params: {
                    data: Ext.encode(valueheader)
                },
                success: function (response) {
                    resjsonheader = Ext.JSON.decode(response.responseText);
                    validheader = resjsonheader.success;
                    paramheader = resjsonheader.parameter;
                    msgheader = resjsonheader.msg;
                    restotal = resjsonheader.total;
                    bank_loan_id = resjsonheader.bank_loan_id;
                    storeheader.commitChanges();

                    if ( validheader == 'true' ) {
                        if ( counterdetail > 0 ) {
                            me.Savedetail(bank_loan_id, paramheader);
                        }else{
                            me.alertFormdataSuccess(msgheader);
                        }
                    }

                    formheader.up('window').body.unmask();
                    storeheader.reload();
                }
            });
        }
    },
    Savedetail: function (bank_loan_id, stateheader) {
        var me, formheader, formdetail, griddetail, storedetail, valuedetail, actiondetail;
        me = this;
        formheader = me.getFormdata();
        formdetail = me.getFormdatadetail();
        griddetail = me.getGriddetail();
        storedetail = griddetail.getStore();
        storedetail.clearFilter(true);

        if ( storedetail.getCount() > 0 ) {

            storedetail.each(function(record, index) {
                valuedetail = record['data'];
                valuedetail['bank_loan_id'] = bank_loan_id;

                if ( me.role.approver_bankloan.includes(apps.uid) ) {
                    valuedetail['is_approver'] = 1;
                }

                // KANTOR PUSAT TIDAK ADA APPROVER JADI LANGSUNG DI SET is_approver = 1
                if ( me.getFormdata().down("[name=project_id]").getValue() == 1 ) {
                    valuedetail['is_approver'] = 1;
                }

                if ( stateheader == 'create' && valuedetail['bank_loan_detail_id'] == 0) {
                    valuedetail['hideparam'] = 'detailcreate';
                    actiondetail = 'create';
                }else{

                    if ( stateheader == 'update' && valuedetail['bank_loan_detail_id'] == 0 ) {
                        valuedetail['hideparam'] = 'detailcreate';
                        actiondetail = 'create'; 
                    }else if( stateheader == 'update' && valuedetail['statedata'] == 'delete'){
                        valuedetail['hideparam'] = 'detaildelete';
                        actiondetail = 'delete';
                    }else{
                        valuedetail['hideparam'] = 'detailupdate';
                        actiondetail = 'update';
                    }
                }

                console.log(valuedetail);
                Ext.Ajax.request({
                    url: me.urldetail + actiondetail,
                    method: 'POST',
                    async: false,
                    params: {
                        data: Ext.encode(valuedetail)
                    },
                    success: function (response) {
                        resjsondetail = Ext.JSON.decode(response.responseText);
                        validdetail = resjsondetail.success;
                        paramdetail = resjsondetail.parameter;
                        msgdetail = resjsondetail.msg;
                        restotal = resjsondetail.total;
                        bank_loan_detail_id = resjsondetail.bank_loan_detail_id;
                        me.alertFormdataSuccess(msgdetail);
                    }
                });
            });


        }

    },
    getDataDetail: function () {
        var me, formheader, gridheader, griddetail, storeheader, storedetail, recordheader, counterheader;
        me = this;
        formheader = me.getFormdata();
        gridheader = me.getGrid();
        storeheader = gridheader.getStore();
        recordheader = storeheader.getAt(storeheader.indexOf(gridheader.getSelectionModel().getSelection()[0]));
        counterheader = storeheader.getCount();

        griddetail = me.getGriddetail();
        storedetail = griddetail.getStore();
        if (storedetail.getCount() > 0) {
            storedetail.removeAll();
        }

        storedetail.load({
            params: {
                "hideparam"     : 'default',
                "project_id"    : recordheader.get('project_id'),
                "pt_id"         : recordheader.get('pt_id'),
                "bank_loan_id"  : recordheader.get('bank_loan_id'),
                "start"         : 0,
                "limit"         : 1000,
            },
            callback: function (records, operation, success) {
                
            }
        });
    },
    formDataGenerateDetailShow: function () {
        var me, f, state;
        me = this;
        f = me.getFormdata();
        state = f.up('window').state.toLowerCase();
        me.paramgeneratedetail.stateform = state;
        me.GenerateFormdata(me.paramgeneratedetail);
    },
    formDataGenerateDetailAfterRenderCustome: function () {
        var me, pd, formheader, griddetail, formgeneratedetail
        me = this;
        pd = me.paramgeneratedetail;
        formgeneratedetail = me.getFormdatageneratedetail();
        me.loadComboBoxStore(formgeneratedetail);
        
        storecoa = me.getStore('Coacombo');
        storecoa.load({
            params: {
                "hideparam": 'coagridbyuserpt',
                "start": 0,
                "limit": 1000000,
                "pt_id_owner": me.pt_id,
                "project_id": me.project_id
            },
            callback: function (records, operation, success) {
            }
        });
    },
    formDataDetailShow: function (state) {
        var me;
        me = this;
        me.paramdetail.stateform = state;
        me.GenerateFormdata(me.paramdetail);
    },
    formDataDetailAfterRenderCustome: function () {
        var me, pd, formheader, griddetail, storedetail, counterdetail, formdetail, record, row;
        me = this;
        pd = me.paramdetail;
        formdetail = me.getFormdatadetail();

        if ( me.allowed_generated ) {
            formdetail.down("[name=kode_kreditur]").setReadOnly(true);
            Ext.getCmp('kode_kreditur_bankloandetail').allowBlank = false;
            Ext.getCmp('kode_kreditur_bankloandetail').clearInvalid();
            formdetail.down("[name=nama_kreditur]").setReadOnly(true);
            Ext.getCmp('nama_kreditur_bankloandetail').allowBlank = false;
            Ext.getCmp('nama_kreditur_bankloandetail').clearInvalid();
            formdetail.down("[name=saldo_beban_bunga]").setReadOnly(true);
            formdetail.down("[name=saldo_kas_setara_kas]").setReadOnly(true);
            formdetail.down("[name=saldo_restricted_fund]").setReadOnly(true);
        }else{
            formdetail.down("[name=kode_kreditur]").setReadOnly(false);
            Ext.getCmp('kode_kreditur_bankloandetail').allowBlank = true;
            Ext.getCmp('kode_kreditur_bankloandetail').clearInvalid();
            formdetail.down("[name=nama_kreditur]").setReadOnly(false);
            Ext.getCmp('nama_kreditur_bankloandetail').allowBlank = true;
            Ext.getCmp('nama_kreditur_bankloandetail').clearInvalid();
            formdetail.down("[name=saldo_beban_bunga]").setReadOnly(false);
            formdetail.down("[name=saldo_kas_setara_kas]").setReadOnly(false);
            formdetail.down("[name=saldo_restricted_fund]").setReadOnly(false);
        }

        switch(pd.stateform) {
            case 'create':
                formheader = me.getFormdata();
                griddetail = me.getGriddetail();
                storedetail = griddetail.getStore();
                counterdetail = storedetail.getCount();
                pd.iddetail = 0;

                // formdetail = me.getFormdatadetail();

                var projectpt_id = formheader.down("[name=projectpt_id]").getValue();
                var bulan = formheader.down("[name=bulan]").getValue();
                var tahun = formheader.down("[name=tahun]").getValue();

                formdetail.down("[name=projectpt_id_detail]").setValue( parseInt(projectpt_id) );
                formdetail.down("[name=bulan_detail]").setValue( parseInt(bulan) );
                formdetail.down("[name=tahun_detail]").setValue( parseInt(tahun) );

                me.loadComboBoxStore(formdetail);
                formdetail.down('#btnSave').setDisabled(false);
            break;
            case 'update':
                formheader = me.getFormdata();
                // formdetail = me.getFormdatadetail();
                griddetail = me.getGriddetail();
                storedetail = griddetail.getStore();
                record = storedetail.getAt(storedetail.indexOf(griddetail.getSelectionModel().getSelection()[0]));
                row = record['data'];

                var projectpt_id = formheader.down("[name=projectpt_id]").getValue();
                var bulan = formheader.down("[name=bulan]").getValue();
                var tahun = formheader.down("[name=tahun]").getValue();

                formdetail.down("[name=projectpt_id_detail]").setValue( parseInt(projectpt_id) );
                formdetail.down("[name=bulan_detail]").setValue( parseInt(bulan) );
                formdetail.down("[name=tahun_detail]").setValue( parseInt(tahun) );
                
                me.loadComboBoxStore(formdetail);
                formdetail.loadRecord(record);
                me.formatCurrencyFormdata(me, formdetail);
                formdetail.down('#btnSave').setDisabled(false);

            break;
            case 'read':
                formheader = me.getFormdata();
                // formdetail = me.getFormdatadetail();
                griddetail = me.getGriddetail();
                storedetail = griddetail.getStore();
                record = storedetail.getAt(storedetail.indexOf(griddetail.getSelectionModel().getSelection()[0]));
                row = record['data'];

                var projectpt_id = formheader.down("[name=projectpt_id]").getValue();
                var bulan = formheader.down("[name=bulan]").getValue();
                var tahun = formheader.down("[name=tahun]").getValue();

                formdetail.down("[name=projectpt_id_detail]").setValue( parseInt(projectpt_id) );
                formdetail.down("[name=bulan_detail]").setValue( parseInt(bulan) );
                formdetail.down("[name=tahun_detail]").setValue( parseInt(tahun) );
                
                me.loadComboBoxStore(formdetail);
                formdetail.loadRecord(record);

                formdetail.getForm().getFields().each(function (field) {
                    field.setReadOnly(true);
                });
                me.formatCurrencyFormdata(me, formdetail);
                formdetail.down('#btnSave').setDisabled(true);

            break;
        }
    },
    dataSaveDetailstore: function () {
        var me, pd, formdetail, griddetail, storedetail, record, row, indexdata, getindex;
        me = this;
        pd = me.paramdetail;
        formdetail = me.getFormdatadetail();
        griddetail = me.getGriddetail();
        storedetail = griddetail.getStore();

        if ( formdetail.getForm().isValid() ) {
            row = formdetail.getForm().getValues();

            if ( accounting.unformat(row['saldo_hutang']) != accounting.unformat(row['jt_total']) ) {
                Ext.Msg.alert('Info', 'Saldo Hutang tidak sesuai dengan Total per tahun. Silahkan periksa kembali');
                return false;
            }

            /*if ( accounting.unformat(row['saldo_beban_bunga_pl']) == 0 || accounting.unformat(row['saldo_beban_bunga_kapitalisasi']) == 0 || accounting.unformat(row['saldo_beban_bunga_bank_total']) == 0 ) {
                Ext.Msg.alert('Info', 'Saldo beban bunga tidak boleh kosong, Silahkan periksa kembali');
                return false;
            }*/

            var loans_name = formdetail.down("[name=jenis_loans_id]").valueModels[0].data.loans_name;
            var kategori_loans_name = formdetail.down("[name=kategori_loans_id]").valueModels[0].data.kategori_loans_name;
            var currency_name = formdetail.down("[name=currency_id]").valueModels[0].data.currency_name;
            var jenis_pinjaman_name = formdetail.down("[name=jenis_pinjaman_id]").valueModels[0].data.jenis_pinjaman_name;
            var kategori_bunga_name = formdetail.down("[name=kategori_bunga_id]").valueModels[0].data.kategori_bunga_name;
            var benchmarking_name = formdetail.down("[name=benchmarking_id]").getValue() > 0 ? formdetail.down("[name=benchmarking_id]").valueModels[0].data.benchmarking_name : '';

            switch (pd.stateform){
                case 'create':
                    row['statedata'] = 'create';
                    row['bank_loan_id'] = 0;
                    row['tenor_string'] = row['tenor'].toString() + ' ' + row['tenor_type'];
                    row['saldo_hutang'] = accounting.unformat(row['saldo_hutang']);
                    row['saldo_beban_bunga_pl'] = accounting.unformat(row['saldo_beban_bunga_pl']);
                    row['saldo_beban_bunga_kapitalisasi'] = accounting.unformat(row['saldo_beban_bunga_kapitalisasi']);
                    row['saldo_beban_bunga_bank_total'] = accounting.unformat(row['saldo_beban_bunga_bank_total']);
                    row['saldo_beban_bunga'] = accounting.unformat(row['saldo_beban_bunga']);
                    row['jt_1_tahun'] = accounting.unformat(row['jt_1_tahun']);
                    row['jt_2_tahun'] = accounting.unformat(row['jt_2_tahun']);
                    row['jt_3_tahun'] = accounting.unformat(row['jt_3_tahun']);
                    row['jt_4_tahun'] = accounting.unformat(row['jt_4_tahun']);
                    row['jt_5_tahun'] = accounting.unformat(row['jt_5_tahun']);
                    row['jt_6_tahun'] = accounting.unformat(row['jt_6_tahun']);
                    row['jt_7_tahun'] = accounting.unformat(row['jt_7_tahun']);
                    row['jt_8_tahun'] = accounting.unformat(row['jt_8_tahun']);
                    row['jt_9_tahun'] = accounting.unformat(row['jt_9_tahun']);
                    row['jt_10_tahun'] = accounting.unformat(row['jt_10_tahun']);
                    row['jt_total'] = accounting.unformat(row['jt_total']);
                    row['saldo_kas_setara_kas'] = accounting.unformat(row['saldo_kas_setara_kas']);
                    row['saldo_restricted_fund'] = accounting.unformat(row['saldo_restricted_fund']);
                    row['startdate'] = me.formatDate(row['startdate']);
                    row['duedate'] = me.formatDate(row['duedate']);
                    row['tingkat_biaya_bunga'] = row['tingkat_biaya_bunga'] == '' ? 0 : parseFloat(row['tingkat_biaya_bunga']);
                    row['tingkat_biaya_bunga_name'] = row['tingkat_biaya_bunga'] + ' %';
                    row['persentase'] = row['persentase'] == '' ? 0 : parseFloat(row['persentase']);
                    row['loans_name'] = loans_name;
                    row['kategori_loans_name'] = kategori_loans_name;
                    row['currency_name'] = currency_name;
                    row['jenis_pinjaman_name'] = jenis_pinjaman_name;
                    row['kategori_bunga_name'] = row['kategori_bunga_id'] == 3 ? kategori_bunga_name + ' ' + benchmarking_name + ' ' + row['persentase'] + ' %' : kategori_bunga_name;
                    storedetail.add(row);
                    storedetail.commitChanges();
                break;
                case 'update':
                    indexdata = griddetail.getSelectionModel().getSelection()[0];
                    getindex = storedetail.indexOf(indexdata);
                    record = storedetail.getAt(getindex);
                    // console.log(row);
                    record.beginEdit();
                    row['statedata'] = 'update';
                    row['tenor_string'] = row['tenor'].toString() + ' ' + row['tenor_type'];
                    row['saldo_hutang'] = accounting.unformat(row['saldo_hutang']);
                    row['saldo_beban_bunga_pl'] = accounting.unformat(row['saldo_beban_bunga_pl']);
                    row['saldo_beban_bunga_kapitalisasi'] = accounting.unformat(row['saldo_beban_bunga_kapitalisasi']);
                    row['saldo_beban_bunga_bank_total'] = accounting.unformat(row['saldo_beban_bunga_bank_total']);
                    row['saldo_beban_bunga'] = accounting.unformat(row['saldo_beban_bunga']);
                    row['jt_1_tahun'] = accounting.unformat(row['jt_1_tahun']);
                    row['jt_2_tahun'] = accounting.unformat(row['jt_2_tahun']);
                    row['jt_3_tahun'] = accounting.unformat(row['jt_3_tahun']);
                    row['jt_4_tahun'] = accounting.unformat(row['jt_4_tahun']);
                    row['jt_5_tahun'] = accounting.unformat(row['jt_5_tahun']);
                    row['jt_6_tahun'] = accounting.unformat(row['jt_6_tahun']);
                    row['jt_7_tahun'] = accounting.unformat(row['jt_7_tahun']);
                    row['jt_8_tahun'] = accounting.unformat(row['jt_8_tahun']);
                    row['jt_9_tahun'] = accounting.unformat(row['jt_9_tahun']);
                    row['jt_10_tahun'] = accounting.unformat(row['jt_10_tahun']);
                    row['jt_total'] = accounting.unformat(row['jt_total']);
                    row['saldo_kas_setara_kas'] = accounting.unformat(row['saldo_kas_setara_kas']);
                    row['saldo_restricted_fund'] = accounting.unformat(row['saldo_restricted_fund']);
                    row['startdate'] = me.formatDate(row['startdate']);
                    row['duedate'] = me.formatDate(row['duedate']);
                    row['tingkat_biaya_bunga'] = row['tingkat_biaya_bunga'] == '' ? 0 : parseFloat(row['tingkat_biaya_bunga']);
                    row['tingkat_biaya_bunga_name'] = row['tingkat_biaya_bunga'] + ' %';
                    row['persentase'] = row['persentase'] == '' ? 0 : parseFloat(row['persentase']);
                    row['loans_name'] = loans_name;
                    row['kategori_loans_name'] = kategori_loans_name;
                    row['currency_name'] = currency_name;
                    row['jenis_pinjaman_name'] = jenis_pinjaman_name;
                    row['kategori_bunga_name'] = row['kategori_bunga_id'] == 3 ? kategori_bunga_name + ' ' + benchmarking_name + ' ' + row['persentase'] + ' %' : kategori_bunga_name;
                    record.set(row);
                    record.endEdit();
                    storedetail.commitChanges();
                break;
            }

            pd.row = row;
            console.log(row);
            formdetail.up('window').close();
        }  
    },
    dataDestroyCustome: function () {
        var me, store, ids, row, confirmmsg, successmsg, failmsg, recordcounttext;
        me = this;
        ids = [];
        rows = me.getGrid().getSelectionModel().getSelection();
        if (rows.length < 1) {
            Ext.Msg.alert('Info', 'No record selected !');
            return;
        }else{
            recordcounttext = rows.length + ' record' + (rows.length > 1 ? 's' : '');
            store = me.getGrid().getStore();
            if (rows.length == 1) {
                var selectedRecord = '[' + store.getAt(store.indexOf(rows[0])).get('periode') + ']';
                confirmmsg = 'Delete ' + selectedRecord + ' ?';
                failmsg = 'Error: Unable to delete ' + selectedRecord + '.';
            } else {
                confirmmsg = 'This action will delete ' + recordcounttext + '.<br />Continue ?';
                failmsg = 'Error: Unable to delete data.';
            }

            for (var i = 0; i < rows.length; i++) {
                ids.push(rows[i].data.bank_loan_id);
            }

            Ext.Msg.confirm('Delete Data', confirmmsg, function (btn) {
                if ( btn == 'yes' ) {
                    resetTimer();
                    var msg = function () {
                        me.getGrid().up('window').mask('Deleting data, please wait ...');
                    };

                    for (var i = 0; i < rows.length; i++) {
                        store.remove(rows[i]);
                    }

                    store.on('beforesync', msg);
                    store.sync({
                        success: function (s) {
                            me.getGrid().up('window').unmask();
                            var successcount = parseInt(Ext.decode(s.operations[0].response.responseText).total, 10);
                            var successmsg = (rows.length == 1 ? selectedRecord : (rows.length + ' of ' + recordcounttext)) + ' deleted successfully.';
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
                            me.loadingrequest.hide();
                        },
                        failure: function (batch, options) {
                            // added on april 2016, ahmad riadi
                            var parameter = (batch.proxy.getReader().jsonData.param ? batch.proxy.getReader().jsonData.param : 'no');
                            var pesan = (batch.proxy.getReader().jsonData.msg ? batch.proxy.getReader().jsonData.msg : 'Unable to save data.');
                            if (parameter == 'used') {
                                failmsg = pesan;
                            } else {
                                failmsg = pesan;
                                //failmsg = failmsg + ' The data may have been used.';
                            }

                            me.loadingrequest.hide();
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
    dataDestroydetailwithflag: function () {
        var me, griddetail, storedetail, formdetail, getindex, record, recordcounttext, selectedRecord, confirmmsg, successmsg, failmsg, row;
        me = this;
        griddetail = me.getGriddetail();
        storedetail = griddetail.getStore();
        formdetail = me.getFormdatadetail();

        record = griddetail.getSelectionModel().getSelection();
        console.log(record);
        if ( record.length < 1 ) {
            Ext.Msg.alert('Info', 'No record selected !');
            return;
        }else{
            recordcounttext = record.length + ' record' + (record.length > 1 ? 's' : '');

            if ( record.length == 1 ) {
                selectedRecord = '[' + storedetail.getAt(storedetail.indexOf(record[0])).get('nama_kreditur') + ']';
                confirmmsg = 'Delete ' + selectedRecord + ' ?';
                failmsg = 'Error: Unable to delete ' + selectedRecord + '.';
            } else {
                confirmmsg = 'This action will delete ' + recordcounttext + '.<br />Continue ?';
                failmsg = 'Error: Unable to delete data.';
            }
        }

        Ext.Msg.confirm('Delete Data', confirmmsg, function (btn) {
            if (btn == 'yes') {
                resetTimer();
                msg = function () {
                    griddetail.up('window').mask('Deleting data, please wait ...');
                };

                for (var i = 0; i < record.length; i++) {
                    row = record[i];
                    // console.log(row);
                    if ( row.data.bank_loan_detail_id == 0 ) {
                        storedetail.remove(row);
                    }else{
                        row.set("deleted", true);
                        row.set("statedata", 'delete');
                        storedetail.clearFilter(true);
                        storedetail.filter('deleted', false);
                    }
                }
            }
        });
    },
    alertFormdataSuccess: function (msg) {
        var me;
        me = this;

        Ext.Msg.show({
            title: 'Success',
            msg: msg,
            icon: Ext.Msg.INFO,
            buttons: Ext.Msg.OK,
            fn: function () {
                me.getFormdata().up('window').close();
                me.getGrid().getStore().reload();
            }
        });
    },
    sumtotaljt: function () {
        var me, fdd, jt_1_tahun, jt_2_tahun, jt_3_tahun, jt_4_tahun, jt_5_tahun, jt_6_tahun, jt_7_tahun, jt_8_tahun, jt_9_tahun, jt_10_tahun, jt_total;
        me = this;
        fdd = me.getFormdatadetail();
        jt_1_tahun = me.unMask(fdd.down('[name=jt_1_tahun]').getValue());
        jt_2_tahun = me.unMask(fdd.down('[name=jt_2_tahun]').getValue());
        jt_3_tahun = me.unMask(fdd.down('[name=jt_3_tahun]').getValue());
        jt_4_tahun = me.unMask(fdd.down('[name=jt_4_tahun]').getValue());
        jt_5_tahun = me.unMask(fdd.down('[name=jt_5_tahun]').getValue());
        jt_6_tahun = me.unMask(fdd.down('[name=jt_6_tahun]').getValue());
        jt_7_tahun = me.unMask(fdd.down('[name=jt_7_tahun]').getValue());
        jt_8_tahun = me.unMask(fdd.down('[name=jt_8_tahun]').getValue());
        jt_9_tahun = me.unMask(fdd.down('[name=jt_9_tahun]').getValue());
        jt_10_tahun = me.unMask(fdd.down('[name=jt_10_tahun]').getValue());

        jt_total = parseFloat(jt_1_tahun + jt_2_tahun + jt_3_tahun + jt_4_tahun + jt_5_tahun + jt_6_tahun + jt_7_tahun + jt_8_tahun + jt_9_tahun + jt_10_tahun);

        fdd.down('[name=jt_total]').setValue(jt_total);
        me._formatCurrency(fdd.down('[name=jt_total]'));
    },
    getAllowedGenerated: function () {
        var me, fd, params;
        me = this;
        fd = me.getFormdata();

        fd.down("[name=project_id]").setValue(fd.down("[name=projectpt_id]").valueModels[0].data.project_id);
        fd.down("[name=pt_id]").setValue(fd.down("[name=projectpt_id]").valueModels[0].data.pt_id);

        params = {
            project_id : fd.down("[name=project_id]").getValue(),
            pt_id : fd.down("[name=pt_id]").getValue(),
            hideparam : 'allowed_generated'
        }

        fd.setLoading('Please Wait...');
        Ext.Ajax.request({
            url: me.urldata + 'read',
            method: 'POST',
            params: params,
            success: function (response) {
                try{
                    var resjson = Ext.JSON.decode(response.responseText);

                    if ( resjson.data == 1 ) {
                        me.allowed_generated = true;

                        if ( me.restricted_action == 1 ) {
                            me.getGriddetail().down('#btnAdd').setDisabled(true);
                            me.getGriddetail().down('#btnGenerate').setDisabled(true);
                            me.getGriddetail().down('#btnEdit').setDisabled(true);
                            me.getGriddetail().down('#btnDelete').setDisabled(true);
                            fd.down('[action=save]').setDisabled(true);
                        }else{
                            me.getGriddetail().down('#btnAdd').setDisabled(true);
                            me.getGriddetail().down('#btnGenerate').setDisabled(false);
                            fd.down('[action=save]').setDisabled(false);
                        }

                    }else{
                        me.allowed_generated = false;

                        if ( me.restricted_action == 1 ) {
                            me.getGriddetail().down('#btnAdd').setDisabled(true);
                            me.getGriddetail().down('#btnGenerate').setDisabled(true);
                            me.getGriddetail().down('#btnEdit').setDisabled(true);
                            me.getGriddetail().down('#btnDelete').setDisabled(true);
                            fd.down('[action=save]').setDisabled(true);
                        }else{
                            me.getGriddetail().down('#btnAdd').setDisabled(false);
                            me.getGriddetail().down('#btnGenerate').setDisabled(true);
                            fd.down('[action=save]').setDisabled(false);
                        }
                    }

                    fd.setLoading(false);
                    console.log(me.allowed_generated);
                }catch(err){
                    console.log(err);
                }
            }
        });
    },
    sumtotalbebanbunga: function () {
        var me, fdd, saldo_beban_bunga_pl, saldo_beban_bunga_kapitalisasi, saldo_beban_bunga_bank_total;
        me = this;
        fdd = me.getFormdatadetail();
        saldo_beban_bunga_pl = me.unMask(fdd.down('[name=saldo_beban_bunga_pl]').getValue());
        saldo_beban_bunga_kapitalisasi = me.unMask(fdd.down('[name=saldo_beban_bunga_kapitalisasi]').getValue());

        saldo_beban_bunga_bank_total = parseFloat(saldo_beban_bunga_pl + saldo_beban_bunga_kapitalisasi);

        fdd.down('[name=saldo_beban_bunga_bank_total]').setValue(saldo_beban_bunga_bank_total);
        me._formatCurrency(fdd.down('[name=saldo_beban_bunga_bank_total]'));
    },
    copyDetailData: function () {
        var me, fd, fdd, kode_kreditur, project_id, pt_id, bulan;
        me = this;
        fd = me.getFormdata();
        fdd = me.getFormdatadetail();
        bulan = fd.down("[name=bulan]").getValue();
        kode_kreditur = fdd.down("[name=kode_kreditur]").getValue();
        project_id = fdd.down("[name=projectpt_id_detail]").valueModels[0].data.project_id;
        pt_id = fdd.down("[name=projectpt_id_detail]").valueModels[0].data.pt_id;

        if ( kode_kreditur == '' ) {
            me.buildWarningAlert('Silahkan isi terlebih dahulu Kode Sub Acc');
            return 0;
        }

        var data = {
            hideparam       : 'copydetail',
            project_id      : project_id,
            pt_id           : pt_id,
            bulan           : bulan,
            kode_kreditur   : kode_kreditur
        }
        // console.log(data);

        Ext.Msg.confirm('Request Confirmation', 'Copy data from previous month?', function (btn) {
            if (btn == 'yes') {
                fdd.setLoading('Please wait...');
                Ext.Ajax.request({
                    url: me.urldetail + 'update',
                    method: 'POST',
                    async: false,
                    params: {
                        data: Ext.encode(data)
                    },
                    success: function (response) {
                        resjsondetail = Ext.JSON.decode(response.responseText);
                        // console.log(resjsondetail);
                        var total = resjsondetail.total;
                        if ( total > 0 ) {
                            var datadetail = resjsondetail.data[3][0];
                            fdd.down("[name=jenis_loans_id]").setValue(datadetail.jenis_loans_id);
                            fdd.down("[name=kategori_loans_id]").setValue(datadetail.kategori_loans_id);
                            fdd.down("[name=currency_id]").setValue(datadetail.currency_id);
                            fdd.down("[name=kreditur_id]").setValue(datadetail.kreditur_id);
                            fdd.down("[name=nama_kreditur]").setValue(datadetail.nama_kreditur);
                            fdd.down("[name=jenis_pinjaman_id]").setValue(datadetail.jenis_pinjaman_id);
                            fdd.down("[name=saldo_hutang]").setValue(datadetail.saldo_hutang);
                            fdd.down("[name=saldo_beban_bunga_pl]").setValue(datadetail.saldo_beban_bunga_pl);
                            fdd.down("[name=saldo_beban_bunga_kapitalisasi]").setValue(datadetail.saldo_beban_bunga_kapitalisasi);
                            fdd.down("[name=saldo_beban_bunga_bank_total]").setValue(datadetail.saldo_beban_bunga_bank_total);
                            fdd.down("[name=saldo_beban_bunga]").setValue(datadetail.saldo_beban_bunga);
                            fdd.down("[name=kategori_bunga_id]").setValue(datadetail.kategori_bunga_id);
                            fdd.down("[name=benchmarking_id]").setValue(datadetail.benchmarking_id);
                            fdd.down("[name=persentase]").setValue(datadetail.persentase);
                            fdd.down("[name=tingkat_biaya_bunga]").setValue(datadetail.tingkat_biaya_bunga);
                            fdd.down("[name=is_lunas]").setValue(datadetail.is_lunas);
                            fdd.down("[name=tenor]").setValue(datadetail.tenor);
                            fdd.down("[name=tenor_type]").setValue(datadetail.tenor_type);
                            fdd.down("[name=startdate]").setValue( moment(datadetail.startdate).format('YYYY-MM-DD') );
                            fdd.down("[name=duedate]").setValue( moment(datadetail.duedate).format('YYYY-MM-DD') );
                            fdd.down("[name=jt_1_tahun]").setValue(datadetail.jt_1_tahun);
                            fdd.down("[name=jt_2_tahun]").setValue(datadetail.jt_2_tahun);
                            fdd.down("[name=jt_3_tahun]").setValue(datadetail.jt_3_tahun);
                            fdd.down("[name=jt_4_tahun]").setValue(datadetail.jt_4_tahun);
                            fdd.down("[name=jt_5_tahun]").setValue(datadetail.jt_5_tahun);
                            fdd.down("[name=jt_6_tahun]").setValue(datadetail.jt_6_tahun);
                            fdd.down("[name=jt_7_tahun]").setValue(datadetail.jt_7_tahun);
                            fdd.down("[name=jt_8_tahun]").setValue(datadetail.jt_8_tahun);
                            fdd.down("[name=jt_9_tahun]").setValue(datadetail.jt_9_tahun);
                            fdd.down("[name=jt_10_tahun]").setValue(datadetail.jt_10_tahun);
                            fdd.down("[name=jt_total]").setValue(datadetail.jt_total);
                            fdd.down("[name=saldo_kas_setara_kas]").setValue(datadetail.saldo_kas_setara_kas);
                            fdd.down("[name=saldo_restricted_fund]").setValue(datadetail.saldo_restricted_fund);
                        }else{
                            Ext.Msg.alert('info', resjsondetail.msg);
                        }
                        fdd.setLoading(false);
                    }
                });
            }
        });
    },
    getRole: function (form) {
        var me = this;
        
        var project_id = form.down("[name=project_id]").getValue();
        var pt_id = form.down("[name=pt_id]").getValue();

        var params = {
            project_id : project_id,
            pt_id : pt_id,
            name: 'bankloan',
            hideparam: 'get_role'
        }

        // console.log(params);

        Ext.Ajax.request({
            url: me.urldata + 'read',
            method: 'POST',
            async: false,
            params: {
                data: Ext.encode(params)
            },
            success: function (response) {
                var resjson = Ext.JSON.decode(response.responseText);
                var data = resjson.data;
                if ( data.length > 0 ) {
                    for (var i = 0; i < data.length; i++) {
                        me.role[data[i].name] = data[i].value
                    }
                }
            }
        });
    }
});