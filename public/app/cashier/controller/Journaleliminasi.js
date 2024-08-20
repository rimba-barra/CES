/* JOURNAL ELIMINASI - DAVID */

Ext.define('Cashier.controller.Journaleliminasi', {
    extend: 'Cashier.library.template.controller.Controller2',
    alias: 'controller.Journaleliminasi',
    views: ['journaleliminasi.DetailjournalGrid', 'journaleliminasi.Gridardetail','journaleliminasi.AngsuranGrid','journaleliminasi.Gridsubcoadetail'],
    requires: [
       'Cashier.view.journaleliminasi.DetailjournalGrid',
       'Cashier.library.BrowseCashier',
       'Cashier.library.journaleliminasi.Journaldetail',
       'Cashier.library.journaleliminasi.Journalar',
       'Cashier.library.template.combobox.Prefixcombobox',
       'Cashier.library.template.combobox.Subglcombobox',
        'Cashier.library.XyReportB',
        'Cashier.library.template.combobox.Ptprojectcombobox',
        'Cashier.library.template.combobox.Projectcombobox'
    ],
    stores:
            [
                'Prefixcombo',
                'Subgl',
                'Project',
                'Ptbyuser',
            ],
    models:
            [
                'Kodeprefix',
                 'Project',
                'Pt',
            ],
    refs: [
        {
            ref: 'panel',
            selector: 'journaleliminasipanel'
        },
        {
            ref: 'grid',
            selector: 'journaleliminasigrid'
        },
        {
            ref: 'detailjournalgrid',
            selector: 'detailjournaleliminasigrid'
        },
        {
            ref: 'formdata',
            selector: 'journaleliminasiformdata'
        },
        {
            ref: 'formsearch',
            selector: 'journaleliminasiformsearch'
        },
        {
            ref: 'angsurangrid',
            selector: 'journaleliminasiangsurangrid'
        },
        {
            ref: 'unitsubgrid',
            selector: 'journaleliminasiunitsubgrid'
        },
        {
            ref: 'angsuranformsearch',
            selector: 'journaleliminasiangsuranformsearch'
        },
        {
            ref: 'detailargrid',
            selector: 'journaleliminasiardetailgrid'
        },
        {
            ref: 'formcoadetail',
            selector: 'journaleliminasiformcoadetail'
        },
        {
            ref: 'gridsubdetail',
            selector: 'journaleliminasisubcoadetailgrid'
        },
        {
            ref: 'formsubcoadetail',
            selector: 'journaleliminasisubdetailformdata'
        },
        {
            ref: 'formdatagenerate',
            selector: 'journaleliminasiformdatagenerate'
        }
    ],
    formWidth: 900,
    controllerName: 'journaleliminasi',
    fieldName: 'journaleliminasiID',
    bindPrefixName: 'Journaleliminasi',
    formxWinId: 'win-journaleliminasiwinId',
    templateCoa: '1',
    templateModuleName: 'Installment Payment',
    shortcut: true,
    browseHandler: null,
    dateNow: new Date(new Date().getFullYear()-1, 11, 31),
    notes: null,
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
    unit_number: null,
    totalSumAr: 0,
    totalSumAfterDeleteAr: 0,
    totalWithoutLastRecordNew: 0,
    kelsub_id: 0,
    effectedSch: [],
    tagihanDefaultValue: false,
    tempid: 0,
    journalDetail: null,
    journalAr: null,
    journal_id: 0,
    sumCount: 0,
    currentVal: 0,
    currentType: 0,
    journal_generate: 0,
    kasbankdetail_id: 0,
    paymentflag_id: 0,
    kasbank_id: 0,
    purchaseletter_pencairankpr_id: null,
    is_erems: 0,
    ptId: 0,
    xyReport: null,
    reportFileName: null,
    formdata: null, 
    is_closed: 0, 
    paging_mode: 0,
    datapphjo: null,
    flagpphjo:0,
    state: 'create',
    localStore: {
        subdetailcoa: null,
        substore: null,
        selectedAngsuran: null,
        selectedCheque: null,
        customer: null,
        price: null,
        detail: null,
        selectedEscrow: null,
    },
    pglobal: {//parameter global
        "info": '',
        "cluster": '',
        "voucherno": '',
        "voucherdate": '',
        "clusterdata": '',
        "state": '',
        "store": '',
        "grid": '',
        "storecoa": '',
        "row": '',
        "record": '',
        "form": '',
        "formtitle": '',
        "formicon": '',
        "formproperties": '',
        "winid": '',
        "win": '',
        "type": '',
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
        me.journalDetail = new Cashier.library.journaleliminasi.Journaldetail();
        me.journalAr = new Cashier.library.journaleliminasi.Journalar();

        me.paging_mode = 1;

        if (typeof shortcut === "undefined") {
            Ext.Loader.injectScriptElement(document.URL + 'app/cashier/library/shortcut.js', function () {
            }, function () {
                // error load file
            });
        }
        this.control({
            'journaleliminasigrid': {
                afterrender: function (v) {
                    me.hideEdit();
                    me.sorterFunc();
                }
            },
            'journaleliminasigrid toolbar [name=limit]': {
                change: function (v) {
                    var me = this;
                    var store = me.getGrid().getStore();
                    if (v.value) {
                        store.getProxy().setExtraParam('limit', v.value);
                        me.loadPage(store);               //Add the record to the store    
                        store.totalCount = store.count(); //update the totalCount property of Store
                        store.pageSize = v.value;
                    }
                }
            },
            'journaleliminasipanel button[action=collection]': {
                click: me.selectUnitGridShow
            },
            'journaleliminasipanel button[action=escrow]': {
                click: me.selectEscrowGridShow
            },
            'journaleliminasiangsurangrid button[action=select]': {
                click: function (v) {
                    var me = this;
                    me.scheduleSelect(v);
                }
            },
            'journaleliminasiunitsubgrid button[action=select]': {
                click: function (el) {
                    var me = this;
                    me.unitsubSelect(el);
                }
            },
            'journaleliminasiangsurangrid ': {
                selectionchange: function () {
                    me.journalAr.gridSelectionChangeAngsuranGrid(me);
                },
                itemdblclick: function (v) {
                    var me = this;
                    me.scheduleSelect(v);
                }
            },
            'journaleliminasiformdata [name=panel]': {
                tabchange: function (tabPanel, tab) {
                    me.journalDetail.resetDetailCoa(me, tab);
                    if (tab.name == "journalardetail") {
                        if (me.is_erems == "1") {
                            me.journalAr.loadModelAr(me);
                        }
                        // me.journalAr.hiddenSumFieldAr(me, true);
                        // me.journalDetail.hiddenSumFieldDetail(me, false);
                    }
                    else if (tab.name == "journalescrowdetail") {
                        if (me.is_erems == "1") {
                            me.journalAr.loadModelEscrow(me);
                        }
                    }
                    else {
                        //  me.journalDetail.hiddenSumFieldDetail(me, true);
                        //me.journalAr.hiddenSumFieldAr(me, false);
                    }
                }
            },
            'journaleliminasiformdata [action=cancel]': {
                click: function () {
                    var me = this;
                    me.cancelFormdata();
                }
            },
            'journaleliminasiformdata [action=savenew]': {
                click: function () {
                    var me = this;
                    me.mainDataSave(function () {
                        me.openFormData();
                    });
                }
            },
            'journaleliminasiformdata [action=directsave]': {
                click: function () {
                    var me = this;
                    me.mainDataDirectSave();

                }
            },
            'journaleliminasiformdata [action=saveasdraft]': {
                click: function () {
                    var me = this;
                    me.mainDataSaveAsDraft();
                }
            },
            'journaleliminasiformdata [action=loaddraft]': {
                click: function () {
                    var me = this;
                    me.loadCurrentDraft();
                }
            },
            'journaleliminasiformdata [action=saveprint]': {
                click: function () {
                    var me = this;
                    me.mainDataSave(function () {
                            var grid = me.getGrid();
                            var jid;
                            if (me.journalsaved_id) {
                                jid = me.journalsaved_id;
                            } else {
                                jid = me.journal_id;
                            }
                            var rec = grid.getStore().findRecord('journal_id', jid);
                            grid.getSelectionModel().select(rec);
                            me.printJournal();
                    });
                }
            },
            'journaleliminasiformdata [name=payment_paymentmethod_id]': {
                change: function (val) {
                    var me = this;
                    if (val.value) {
                        me.journalDetail.changePayment(me, val.value);
                    }
                }
            },
            'journaleliminasiformdata [name=kasbank_date]': {
                change: function (val) {
                    var me = this;
                    var state = val.up('window').state;
                    if (state == "create") {
                        if (val.value) {

                        }
                    }
                }
            },
            'journaleliminasiformdata [name=pt_pt_id]': {
                change: function (val) {
                    var me = this;
                    me.setprojectpt(val.name, val.ownerCt);
                    var state = val.up('window').state;
                    var f = me.getFormdata();
                    f.down("[name=project_project_id]").setValue(me.project_id);
                    if (state == "create") {
                        if(f.down("[name=journal_date]").getValue()){
                            if (val.value) {
                                me.journalDetail.getJournalId(me, f.down("[name=journal_date]").getValue(), state, val.value);
                            }   
                        }
                    }
                    me.checkMandatory();
                }
            },
            'journaleliminasiformdata [name=multiproject_consolidation_id]': {
                change: function (val) {
                    form = me.getFormdata();
                    if(typeof form.down('[name=multiproject_consolidation_id]').valueModels[0] !== "undefined")
                    {
                        rowdata = form.down('[name=multiproject_consolidation_id]').valueModels[0]['raw'];
                        form.down('[name=pt_pt_id]').setValue(rowdata.pt_idref);
                    } 
                }
            },

            
            'journaleliminasiformdata [name=journal_date]': {
                select: function (val) {
                    var me = this;
                    var state = val.up('window').state;
                    var f = me.getFormdata();
                    if (state == "create") {
                        if (1) {
                            me.journalDetail.getJournalId(me, f.down("[name=journal_date]").getValue(), state, f.down("[name=pt_pt_id]").getValue());
                        }
                    }
                    me.checkMandatory();
                }
            },
            'journaleliminasiformdata [name=department_department_id]': {
                change: function (val) {
                    var me = this;
                    var state = val.up('window').state;
                    var f = me.getFormdata();
                    if (val.value) {
                        me.checkMandatory();
                    }
                }
            },
            'journaleliminasiformdata [name=dataflow]': {
                change: function (val) {
                    var me = this;
                    if (val.value) {
                        me.changeFlow(val);
                        //me.getCustomRequestCombobox('kasbank', val.value, 'journalprefix_journalprefix_id', 'journal', ['prefix', 'coa'], me.getFormdata());
                        //me.getFormdata().down("[name=journalprefix_journalprefix_id]").setValue('');
                    }
                }
            },
            'journaleliminasiformdata [name=journal_type]': {
                change: function (val) {
                    var me = this;
                    if (val.value) {
                        me.changeType(val.value);
                    }
                }
            },
            'journaleliminasiformdata [action=browseCheque]': {
                click: function (val) {
                    var me = this;
                    me.chequeShowWindow(val);
                }
            },
            'journaleliminasiformdata checkboxfield[name=autogeneratefaktur]': {
                change: function (val) {
                    var me = this;
                    me.journalDetail.autogeneratejournal(me, val);
                }
            },
            'journaleliminasiformdata [name=prefix_prefix_id]': {
                select: function () {
                    me.pjrawval = this.getValue(me, 'prefix_prefix_id', 'raw');
                    me.pjvalue = this.getValue(me, 'prefix_prefix_id', 'value');

                    me.pstatefromjournal = me.getFormdata().up('window').state.toLowerCase();
                    if (me.pstatefromjournal == 'create') {
                        this.GenerateVoucher(me.pjvalue,'0');
                    }
                },
            },
            'detailjournaleliminasigrid toolbar [action=generate]': {
                click: function () {
                    me.journalDetail.generateCoa(me, me.templateCoa, 'click');
                }
            },
            'detailjournaleliminasigrid toolbar [action=create]': {
                click: function (el, act) {
                    var me = this;
                    var form = me.getFormdata();
                    var csid = form.down('[name=multiproject_consolidation_id]').getValue();

                    var journal_type = form.down('[name=journal_type]').getValue();

                    if(journal_type == "ELIMINASI" || journal_type == "ELIMINASI-CF"){
                        if(csid==null || csid==""){
                            me.tools.alert.warning("Pilih Group Terlebih Dahulu");
                            return 0;
                        }
                    }


                    me.journalDetail.formDataDetail(me, 'create');
                }
            },
            'detailjournaleliminasigrid toolbar [action=createcopy]': {
                click: function () {
                    me.journalDetail.createcopy(me, 'copy');
                }
            },
            'detailjournaleliminasigrid toolbar [action=update]': {
                click: function () {
                    me.journalDetail.formDataDetail(me, 'update')
                }
            },
            'detailjournaleliminasigrid': {
                itemdblclick: function () {
                    me.journalDetail.formDataDetail(me, 'update');
                },
                selectionchange: function () {
                    me.journalDetail.gridSelectionChangedetailcoaGrid(me);
                }
            },
            'journaleliminasiardetailgrid toolbar [action=browseSchedule]': {
                click: function (el) {
                    me.selectUnitGridShow(el, 'AngsuranGridNoSearch');
                }
            },
            'journaleliminasiardetailgrid toolbar [action=destroy]': {
                click: function (el) {
                    me.journalAr.dataDestroyAr(me, el);
                }
            },
            'journaleliminasiardetailgrid toolbar [name=paymentall]': {
                blur: function (el) {
                    me.journalAr.paymentTextFieldOnBlur(me, el);
                }
            },
            'journaleliminasiformcoadetail [name=cashflowtype_cashflowtype_id]': {
                select: function (val) {
                        me.journalDetail.cashflowChange(me);
                }
            },
            'journaleliminasiformcoadetail [name=subgl_subgl_id]': {
                select: function (val) {
                        me.journalDetail.subglChange(me);
                }
            },
            'journaleliminasiformcoadetail [name=coa_coa_id]': {
                change: function () {
                    me.journalDetail.coaChange(me);
                },
            },
            'journaleliminasiformcoadetail [name=type_acc]': {
                change: function () {
                    me.journalDetail.acctypeChange(me);
                }
            },
            'journaleliminasiformcoadetail [name=amount]': {
                'blur': function() { 
                    me = this;
                    var fd = me.getFormcoadetail();
                    me._formatCurrency(fd.down('[name=amount]'), "blur");
                }
            },
            'journaleliminasiformcoadetail [name=amountc]': {
                'blur': function() { 
                    me = this;
                    var fd = me.getFormcoadetail();
                    me._formatCurrency(fd.down('[name=amountc]'), "blur");
                }
            },
            'journaleliminasiformcoadetail button[action=save]': {
                click: function (el, act) {
                    //me.journalDetail.savedetailcoa(me);
                    var sb = me.journalDetail.savedetailcoa(me);
                    if(sb!==0){ //jika valid
                        me.localStore.subdetailcoa = sb;
                    }
                }
            },
            'journaleliminasiformcoadetail button[action=directsave]': {
                click: function (el, act) {
                    //me.journalDetail.savedetailcoa(me);
                    me.journalDetail.directsavedetailcoa(me);
                }
            },
            'journaleliminasiformcoadetail button[action=savenew]': {
                click: function (el, act) {
                    var sb = me.journalDetail.savedetailcoa(me);
                    if(sb!==0){ //jika valid
                        me.localStore.subdetailcoa = sb;
                        me.journalDetail.savenewdetailcoa(me);
                    }
                }
            },
            'journaleliminasiformcoadetail toolbar button[action=cancel]': {
                click: function (el, act) {
                    me.journalDetail.cancelFormdatadetail(me);
                }
            },
            'detailjournaleliminasigrid toolbar button[action=destroy]': {
                click: function (el, act) {
                    me.journalDetail.destroydetail(me);
                }
            },
            'journaleliminasisubcoadetailgrid toolbar [action=create]': {
                click: function (el, act) {
                    var gridsubdetail = me.getGridsubdetail();
                    var countstore = gridsubdetail.getStore().getCount();
                    if(countstore>=1){
                        me.tools.alert.warning("Hanya Diijinkan 1 Detail Sub");
                        return 0;
                    }
                    me.journalDetail.formDataSubDetail(me, 'create');
                }
            },
            'journaleliminasisubcoadetailgrid toolbar [action=update]': {
                click: function (el, act) {
                    me.journalDetail.formDataSubDetail(me, 'update');
                }
            },
            'journaleliminasisubcoadetailgrid toolbar [action=destroy]': {
                click: function (el, act) {
                    me.journalDetail.destroysubdetail(me);
                }
            },
            'journaleliminasisubcoadetailgrid ': {
                selectionchange: function () {
                    me.journalDetail.gridSelectionChangedetailsubcoaGrid(me);
                },
                itemdblclick: function() {
                    me.journalDetail.formDataSubDetail(me, 'update');
                }
            },
            'journaleliminasisubdetailformdata': {
                afterrender: function (v) {
                    var state = v.up('window').state;
                    me.journalDetail.fdardatasub(me, state);
                },
                boxready: function () {
                    var me = this;
                    
                    $("#journalsubdetailformdataID input[name='amount']").keyup(function()
                    {
                        var fd = me.getFormsubcoadetail();
                        me._formatCurrency(fd.down('[name=amount]'));
                    });
                }
            },
            'journaleliminasiformdatagenerate': {
                afterrender: this.formDataGenerateAfterRender
            },
             'journaleliminasiformdatagenerate [name=project_id]': {
                change: function (el) {
                    // this.loadPtbyProject();
                }
                
            },
             'journaleliminasiformdatagenerate [action=save]': {
                click: function () {
                    var me = this;
                    me.flagpphjo = 1;
                   me.GenerateJournalPPH();
                }
            },
            'journaleliminasisubdetailformdata [name=subgl_subgl_id]': {
                select: function () {
                    me.journalDetail.subglChange(me);
                },
                afterrender: function (subgl) {
                    me.localStore.substore = subgl.getStore();
                }
            },
            'journaleliminasisubdetailformdata button[action=save]': {
                click: function () {
                    me.journalDetail.savesubdetailcoa(me);
                }
            },
            'journaleliminasisubdetailformdata button[action=directsave]': {
                click: function () {
                    me.journalDetail.directsavesubdetailcoa(me);
                }
            },
            'journaleliminasisubdetailformdata [name=amount]': {
                keyup: function (event) {
                    me = this;
                    var fd = me.getFormsubcoadetail();
                    me._formatCurrency(fd.down('[name=amount]'));
                },
                blur: function() { 
                    me = this;
                    var fd = me.getFormsubcoadetail();
                    me._formatCurrency(fd.down('[name=amount]'), "blur");
                }
            },
            'journaleliminasiformcoadetail [name=browseUnitsub]': {
                click: function (el, act) {
                    me.selectUnitsubGridShow(el, 'UnitsubGridNoSearch');
                }
            },
            'journalchequegrid button[action=select]': {
                click: function (v) {
                    var me = this;
                    me.chequeSelect(v);
                }
            },
            'journalchequegrid ': {
                selectionchange: function () {
                    me.journalDetail.gridSelectionChangeChequeGrid(me);
                }
            },
            'journalchequegrid': {
                itemdblclick: function (v) {
                    var me = this;
                    me.chequeSelect(v);
                }
            },
            'journaleliminasiescrowgrid': {
                selectionchange: function () {
                    me.journalDetail.gridSelectionChangeEscrowGrid(me);
                },
                itemdblclick: function (v) {
                    var me = this;
                    me.journalAr.escrowSelect(me, v);
                }
            },
            'journaleliminasiescrowgrid button[action=select]': {
                click: function (v) {
                    var me = this;
                    me.journalAr.escrowSelect(me, v);
                }
            },
            'journaleliminasiformdata [name=is_memorialcashflow]': {
                  change: function(field, newValue, oldValue, eOpts){
                        var me = this;
                        me.checkboxmcfChange(me, newValue);
                    }
            },
            'journaleliminasigrid toolbar [action=create]' :{
                click: function (){
                    me.flagpphjo = 0;
                    me.currentType = 0;
                    me.currentVal = 0;
                }

            },
            'journaleliminasigrid toolbar [action=update]':{
                click: function (){
                    me.flagpphjo = 0;
                    me.currentType = 0;
                    me.currentVal = 0;
                }
            },

            'journaleliminasigrid toolbar [action=action0]': {
                click: function () {
                    me.dataSearchFilterby('');
                }
            },
              'journaleliminasigrid toolbar [action=destroy]': {
                click: function () {
                    this.dataDestroy();
                }
            },

             'journaleliminasigrid toolbar [action=printjournal]': {
                click: function () {
                    this.printJournal();
                }
            },
            'journaleliminasigrid toolbar [action=action1]': {
                click: function () {
                    me.dataSearchFilterby('VC');
                }
            },
            'journaleliminasigrid toolbar [action=action2]': {
                click: function () {
                    me.dataSearchFilterby('MCF');
                }
            },
            'journaleliminasigrid toolbar [action=action3]': {
                click: function () {
                    me.dataSearchFilterby('MJ');
                }
            },
            'journaleliminasigrid toolbar [action=copyjournal]': {
                click: function () {
                    me.copyJournal();
                }
            },
            'journaleliminasigrid toolbar [action=genjournalpph]':{
                click: function(){
                    me.openFormGenerate();
                    me.flagpphjo = 1;
                }
            },
            'journaleliminasiformsearch': {
                boxready: function (panel) {
                    var me = this;
                    $('[name=consolidation_id]').setVisible(false);
                    $('[name=pt_id_src]').setVisible(true);
                    $("#journalformsearchID input[name='voucher_no']").focus();
                    $("#journalformsearchID").keyup(function( e ) {
                        if (e.which == 13) {
                            e.preventDefault();
                            me.dataSearch();
                            return false;
                        }
                        if (e.altKey && e.which == 65) {
                            e.preventDefault();
                            $("#journalgridID #btnNew").click();
                            return false;
                        }
                    });
                }
            },
            'journaleliminasiformsearch [name=pt_id_src]': {
                change: function () {
                    var me = this;
                    var f = me.getFormsearch();

                    if (f.down('[name=pt_id_src]').valueModels != null ) {
                        var getProject_id = f.down('[name=pt_id_src]').valueModels[0]['raw'];
                        f.down('[name=project_id]').setValue(getProject_id.project_project_id);
                        f.down('[name=pt_id]').setValue(getProject_id.pt_id);
                        
                    }
                }
            },
            'journaleliminasiformcoadetail': {
                boxready: function () {
                    var me = this;
                    $("#journalformcoadetailID").keyup(function( e ) {
                        if (e.which == 13) {
                            e.preventDefault();
                            me.journalDetail.savedetailcoa(me); 
                            return false;
                        }
                    });
                    $("#journalformcoadetailID input[name='coa_coa_id']").keyup(function()
                    {
                        this.value = this.value.replace(/(\d{2})(\d{2})/,'$1'+'.'+'$2')
                    });

                    $("#journalformcoadetailID input[name='amount']").keyup(function()
                    {
                        var fd = me.getFormcoadetail();
                        me._formatCurrency(fd.down('[name=amount]'));
                    });

                    $("#journalformcoadetailID input[name='amountc']").keyup(function()
                    {
                        var fd = me.getFormcoadetail();
                        me._formatCurrency(fd.down('[name=amountc]'));
                    });
                }
            },
            'journaleliminasiformsearch [name=filterby]':{
                change: function(el){
                    console.log(el.value);
                    var fs = me.getFormsearch();
                    if (el.value == 'COA REFF PT') {
                        fs.down('[name=consolidation_id]').setVisible(false);
                        fs.down('[name=pt_id_src]').setVisible(true);
                        fs.down('[name=consolidation_id]').setValue(0);
                    }else{
                        fs.down('[name=consolidation_id]').setVisible(true);
                        fs.down('[name=pt_id_src]').setVisible(false);
                    }
                }
            },
            
        });
    },
    setDisabledSave: function(){
        
        var me = this;

        var f = me.getFormdata();
        //-----
        var paging_mode = me.paging_mode;

        if(paging_mode==1){
            f.down('button[action=directsave]').setVisible(true);
            f.down('button[action=cancel]').setVisible(false);
            f.down('button[action=save]').setVisible(false);
            f.down('button[action=savenew]').setVisible(false);
            f.down('button[action=saveprint]').setVisible(false);
        }else{
            f.down('button[action=directsave]').setVisible(false);
        }

    },
    formDataAfterRender: function (el) { //fdar

        var state = el.up('window').state;
        var wid = el.up('window').id;
        var me = this;
        me.state = state;
        var f = me.getFormdata();
        var fs = me.getFormsearch();
        me.fdar().init();
        me.journalDetail.hiddenSumFieldDetail(me, true);

        var g = me.getDetailjournalgrid();

        //-----

        //directsave
        var maingrid = me.getGrid(), rec = maingrid.getSelectedRecord();

        if (rec === undefined || rec === null) {
             me.paging_mode = 0;
        }else{
            if(rec.get('is_directsave') == 1){
                me.paging_mode = 1;
            }else{
                me.paging_mode = 0;
            }
        }

        if(state == 'create'){
            me.paging_mode = 0;
        }

        
        //-----
        
        me.setDisabledSave();

        if(Ext.get('WINDOW-mnu' + me.bindPrefixName)!==null){
            var mdl = 'Journaleliminasi';
        }else{
            var mdl = 'Journaleliminasi';
        }

        if(mdl == 'Journaleliminasi'){
            f.down('[name=is_memorialcashflow]').setVisible(false);
            f.down('[name=refferal_id]').setVisible(false);
            f.down('[name=description]').setValue('JOURNAL ELIMINASI');
            f.down('button[action=savenew]').setVisible(false);
            f.down('button[action=saveprint]').setVisible(false);
            f.down("[name=journalardetail]").setDisabled(true);
            f.down('[name=journalardetail]').setVisible(false);
            g.down('toolbar [action=generate]').setVisible(false);
            me.changeType("ELIMINASI");
        }else{
            f.down("[name=refferal_id]").setVisible(true);
            f.down("[name=journalardetail]").setDisabled(false);
        }
        
        //-----
        
        if (state == 'create') {
            var state = 'create';
            var ptid = fs.down("[name=pt_id]").getValue();
            me.ptId = ptid;
            var kasbank_date = f.down("[name=journal_date]").getValue();
            //var dataflow = f.down('[name=dataflow]').getValue();
            var dataflow = 1;
            me.is_erems = 0;
            me.journalDetail.disableSave(me, true);
            me.fdar().create();
            me.setActiveForm(f);
            f.down('[name=journal_date]').setValue(me.dateNow);
            //f.down('[name=journal_date]').setValue(me.dateNow);
            me.generateJournalNo('M', f);
            if(mdl == 'Openingbalance'){
                f.down('[name=journal_no]').setValue('MJ001/001');
                f.down('[name=journal_no]').setReadOnly(true);
            }
            //me.journalDetail.getJournalGenerator(me);
            me.sumCount = 0;
            me.loadModelCoaDetail();
            me.cancelFormdata();
            f.rowData = null;
            //f.down('[name=dataflow]').setValue('I');
            me.amountSelected = null;
            me.schedule_id = null;
            me.journalDetail.loadTempModel(me);
            //me.journalDetail.detailFdar(me, wid, f.down('[name=dataflow]').getValue(), state);
            me.journalDetail.detailFdar(me, wid, 1, state);
            f.down('[name=journalardetail]').setDisabled(true);

        } else if (state == 'update') {
            var state = 'update';
            me.formdata = f;
            me.is_erems = 1;
            me.journalDetail.disableSave(me, true);
            me.fdar().update();
            me.setActiveForm(f);
            f.editedRow = -1;
            f.rowData = null;
            f.deletedRows = [];
            f.deletedsubRows = [];
            f.deletedRowsWithoutID = 0;
            me.loadModelCoaDetail();
            me.journalDetail.loadTempModel(me);
            me.journalDetail.detailFdar(me, wid, 1, state);
            f.down('[name=journalardetail]').setDisabled(true);
            f.down("[name=pt_pt_id]").setReadOnly(true);
            f.down("[name=prefix_prefix_id]").setReadOnly(true);
            f.down("[name=journal_type]").setReadOnly(true);
        }
    },
    formatDate: function (param) {
        param = new Date(param);
        var monthval = [
            "01", "02", "03",
            "04", "05", "06", "07",
            "08", "09", "10",
            "11", "12"
        ];

        var date = param.getFullYear() + "-" + monthval[param.getMonth()] + "-" + param.getDate();
        return date;
    },
    panelAfterRender: function () {
        var me = this;
        var grid = me.getGrid();
        var p = me.getPanel();
        var f = me.getFormsearch();
        
        $("#WINDOW-mnu"+me.bindPrefixName+"-body .x-tool-collapse-left").click();
        $("#WINDOW-mnu"+me.bindPrefixName+"_header-targetEl .x-tool-maximize").click();
        
        f.down('[name=consolidation_id]').setVisible(false);
        f.down('[name=pt_id_src]').setVisible(true);

        /*
        shortcut.add("F7", function () {
            me.selectUnitGridShow('el');
        }, {
            'type': 'keydown',
            'propagate': true,
            'target': document
        });
        shortcut.add("F4", function () {
            me.selectEscrowGridShow('el');
        }, {
            'type': 'keydown',
            'propagate': true,
            'target': document
        });
        */

        shortcut.add("ctrl+alt+c", function () {
            me.copycell(me.getGrid());
        }, {
            'type': 'keydown',
            'propagate': true,
            'target': document
        });
        p.setLoading("Please wait");
        me.tools.ajax({
            params: {module: me.controllerName},
            form: p,
            success: function (data, model) {

                try {
                    me.tools.weseav3(data.pt, f.down("[name=pt_id_src]"), parseInt(apps.projectpt)).comboBox();
                    me.tools.weseav3(data.project, f.down("[name=project_id]"), parseInt(apps.project)).comboBox();
                    me.tools.weseav3(data.consolidation, f.down("[name=consolidation_id]"),0).comboBox();
                    //me.tools.weseav2(data.project, f.down("[name=project_id]")).comboBox(true);
                    me.dataSearch();
                }
                catch (err) {
                    console.log(err.message);
                    me.tools.alert.warning("Failed to generate init.");

                }

                p.setLoading(false);
            }
        }).read('init');

    },
    fillFormComponents: function (data, form) {
        var me = this;
        me.tools.wesea(data.dept, form.down("[name=department_department_id]")).comboBox();
        me.tools.wesea(data.pt, form.down("[name=pt_pt_id]")).comboBox('', function () {
            me.journalDetail.fillPt(me);
        });
        me.tools.wesea(data.project, form.down("[name=project_project_id]")).comboBox();
        me.tools.wesea(data.consolidation, form.down("[name=multiproject_consolidation_id]")).comboBox();
        //me.tools.wesea(data.kasbank, form.down("[name=journalprefix_journalprefix_id]")).comboBox();
        //me.tools.wesea(data.paymentmethod, form.down("[name=payment_paymentmethod_id]")).comboBox();
    },
    checkMandatory: function () {
        var me = this;
        var g = me.getDetailjournalgrid();
        var f = me.getFormdata();
        var pt = f.down("[name=pt_pt_id]").getValue();
        var jid = f.down("[name=journalID]").getValue(); 
        var department = f.down("[name=department_department_id]").getValue();
        
        //OPEN SEMENTARA
        //if(jid.includes("VC")){

        if(false){
            g.down("button[action=create]").setDisabled(true);
            g.down("button[action=update]").setVisible(false);
            g.down("button[action=destroy]").setVisible(false);
            g.down("button[action=createcopy]").setDisabled(true);

            f.down("button[action=save]").setVisible(false);
            f.down("button[action=savenew]").setVisible(false);
            f.down("button[action=saveprint]").setVisible(false);
        }else if (department && pt) {
            //g.down("button[action=create]").setDisabled(false);
        }
        else {
            //g.down("button[action=create]").setDisabled(true);
        }

        var p = me.pglobal;
        p.store = me.getStore('Prefixcombo');//mendapatkan store
        p.store.load({
            params: {
                hideparam: 'getprefixjournalbypt',
                project_id: me.project_id,
                pt_id:  pt,
                start: 0,
                limit: 1000,
            },
            callback: function (records, operation, success) {
                //p.store.filter('cashier', 'N');
                p.store.sort('prefix', 'ASC');
            }
        });
    },
    selectUnitGridShow: function (el, ar) {
        var ps;
        var me = this;
        var localstore = 'selectedAngsuran';
        me.kasbank_id = 0;
        me.is_erems = 0;
        var browse = new Cashier.library.BrowseCashier();
        browse.init({
            controller: me,
            view: 'AngsuranGrid',
            el: el,
            localStore: localstore,
            mode_read: "selectedangsuran",
            bukaFormSearch: true,
        });
        browse.showWindow(function () {
            if (me.pt_id) {
                Ext.getCmp('ptArId').setValue(me.pt_id);
                Ext.getCmp('ptArId').setValue(me.pt_id);
            }
            Ext.getCmp('ptArId').setValue(me.pt_id);
            Ext.getCmp('tipeangsuran').setValue('nonkpr');
        });
        if (ar == 'AngsuranGridNoSearch') {
            var f = me.getFormdata();
            var ps = f.rowData;
            var gridar = me.getAngsurangrid();
            var storear = gridar.getStore();
            me.getSelectedSchedule();

            if (ps) {
                //console.log(ps);
                Ext.getCmp('unitNumberId').setValue(ps.get('unit_unit_number'));
                Ext.getCmp('blockId').setValue(ps.get('block_block_id'));
                Ext.getCmp('purchaseletterNoId').setValue(ps.get('purchaseletter_purchaseletter_no'));
                Ext.getCmp('customerNameId').setValue(ps.get('customer_name'));
                //Ext.getCmp('unitscheduleAngsuranId').setValue(ps.get('unit_unit_id'));
                Ext.getCmp('projectArId').setValue(ps.get('project_project_id'));
                Ext.getCmp('ptArId').setValue(ps.get('pt_pt_id'));
                Ext.getCmp('scheduleAngsuranId').setValue(me.schedule_id);
                //Ext.getCmp('unitNumberId').setReadOnly(true);
                Ext.getCmp('blockId').setReadOnly(true);
                //Ext.getCmp('purchaseletterNoId').setReadOnly(true);
                //Ext.getCmp('customerNameId').setReadOnly(true);
                Ext.getCmp('ptArId').setReadOnly(true);
                Ext.getCmp('projectArId').setReadOnly(true);
            }
            var fields = Ext.getCmp('MySuperBrowseWindow').getForm().getFieldValues();

            for (var x in fields) {
                storear.getProxy().setExtraParam(x, fields[x]);
            }
            storear.loadPage();
        }
    },

    selectUnitsubGridShow: function (el, ar) {
        var ps;
        var me = this;
        var localstore = 'selectedUnitsub';
        var browse = new Cashier.library.BrowseCashier();

        var f = me.getFormcoadetail();

        browse.init({
            controller: me,
            view: 'UnitsubGrid',
            el: el,
            localStore: localstore,
            mode_read: "",
            bukaFormSearch: true,
        });
        
        browse.showWindow();


        setTimeout(function() {
            var grid = me.getUnitsubgrid();
            var store = grid.getStore();

            var coa_coa_id = f.down('[name=coa_coa_id]').getValue();

            store.getProxy().setExtraParam('coa_coa_id', coa_coa_id);
            store.loadPage();

            grid.down('[action=select]').setDisabled(false);
        }, 500);



    },
    scheduleSelect: function (v) {
        var me = this;
        var cmpformdata = Ext.getCmp('formdatajournalID');
        if (!cmpformdata) {
            var w = me.instantWindow('FormData', 900, 'Add Journal', 'create', 'myJournalWindow');

        } else {
            v.up("window").close();
        }
        var f = me.getFormdata();
        var kasbankID = f.down("[name=kasbank_id]").getValue();
        var key = (kasbankID ? "amount" : "remaining_balance");
        me.paymentflag_id = 1; // 1 installment payment
        me.rowData = null;
        f.rowData = null;
        var me = this;
        var grid = me.getAngsurangrid();
        var row = grid.getSelectionModel().getSelection();
        var rec = grid.getSelectedRecord();
        f.rowData = rec;
        me.rowData = rec;
        var gridCoaDetail = me.getDetailjournalgrid();
        var rb = f.down("[name=amount]").getValue();
        if (me.browseHandler) {
            me.templateCoa = 1;
            f.setLoading("Please wait");
            me.is_erems = 0;
            me.journalDetail.disableSave(me, true);
            gridCoaDetail.down('toolbar [action=generate]').setDisabled(false);
            me.formToMoney(f);
            //me.journalAr.getTotalWithoutLastRecord(me);
            me.journalAr.loadAR(me, rec);
            f.down("[name=journal_date]").setValue(me.dateNow);
            f.down("[name=payment_date]").setValue(me.dateNow);

            me.getSelectedSchedule();
            me.journalAr.GridAr(me);
            f.setLoading(false);
        }
        else {
            me.tools.alert.warning("Failed to get AR, Please try select AR again.");
        }
    },

    unitsubSelect: function (el) {
        var me = this;
        var f = me.getFormcoadetail();
        var grid = me.getUnitsubgrid();
        var storeus = grid.getStore();
        var row = grid.getSelectionModel().getSelection();
        var rec = grid.getSelectedRecord();
        f.down('[name=subgl_subgl_id]').setValue(rec.get("subgl_id"));
        f.down('[name=subgl_description]').setValue(rec.get("code")+" "+rec.get("description"));
        el.up('window').destroy();
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
    changeType: function (val) {
        var me = this;
        var f = me.getFormdata();
        var storeprefix = me.getStore('Prefixcombo');
        storeprefix.clearFilter(true);

        if (val === "MINORITY") {
           f.down('[name=multiproject_consolidation_id]').setValue(0);
           f.down('[name=multiproject_consolidation_id]').setVisible(false);
           f.down('[name=is_memorialcashflow]').setVisible(false);
           f.down('[id=splitter1]').setVisible(false);
           
           f.down('[name=pt_pt_id]').setFieldLabel('PT Name');
           f.down("[name=is_memorialcashflow]").setValue(0);

            storeprefix.filterBy(function (rec, id) {
                console.log(rec);
                if(rec.get('is_minority') == 1) {
                    return true;
                }
                else {
                    return false;
                }
            });

        }else if (val === "ELIMINASI") {
           f.down('[name=multiproject_consolidation_id]').setVisible(true);
           f.down('[name=is_memorialcashflow]').setVisible(false);
           f.down('[id=splitter1]').setVisible(true);
           f.down('[name=pt_pt_id]').setFieldLabel('Coa Reff.');
           f.down("[name=is_memorialcashflow]").setValue(0);

            storeprefix.filterBy(function (rec, id) {
                if(rec.get('is_minority') == 0) {
                    return true;
                }
                else {
                    return false;
                }
            });
        }else if (val === "ELIMINASI-CF") {
           f.down('[name=multiproject_consolidation_id]').setVisible(true);
           f.down('[name=is_memorialcashflow]').setVisible(false);
           f.down('[id=splitter1]').setVisible(true);
           f.down('[name=pt_pt_id]').setFieldLabel('Coa Reff.');
           f.down("[name=is_memorialcashflow]").setValue(1);
           val = 'ELIMINASI CASHFLOW';
            storeprefix.filterBy(function (rec, id) {
                if(rec.get('is_minority') == 0) {
                    return true;
                }
                else {
                    return false;
                }
            });

        }
        else {
            f.down('[name=multiproject_consolidation_id]').setVisible(true);
            f.down('[name=pt_pt_id]').setFieldLabel('Coa Reff.');

            storeprefix.filterBy(function (rec, id) {
                if(rec.get('is_minority') == 0) {
                    return true;
                }
                else {
                    return false;
                }
            });
        }
        f.down('[name=description]').setValue("JOURNAL "+val);
        
    },
    getSelectedSchedule: function (callback) {
        var me = this;
        me.schedule_id = null;
        me.amountSelected = null;
        me.totalTemp = null;
        me.paymenttype_id = null;
        var sch = '';
        var amt = '';
        var total = 0;
        var paymenttype_id = '';
        var gridvoucherar = me.getDetailargrid();
        var storevoucherar = gridvoucherar.getStore();
        storevoucherar.each(function (rec) {
            sch += rec.get("schedule_id") + "~";
            // amt += parseFloat(rec.get("amount")) + "~"; disabled on 29-04=2018 semy 
            amt += parseFloat(rec.get("remaining_pay")) + "~";
            paymenttype_id +=
                    rec.get('paymenttype_paymenttype_id') ? rec.get('paymenttype_paymenttype_id') + "~" : 0 + "~";
            total += parseFloat(rec.get('remaining_balance'));
        });
        me.schedule_id = sch;
        me.amountSelected = amt;
        me.paymenttype_id = paymenttype_id;
        me.totalTemp = accounting.formatMoney(total);
        if (typeof callback === "function") {
            callback();
        }
    },
    cancelFormdata: function () {
        var me = this;
        var grid = me.getGrid();
        var gridCoaDetail = me.getDetailjournalgrid();
        var griArDetail = me.getDetailargrid();
        gridCoaDetail.getStore().loadData([], false);
        griArDetail.getStore().loadData([], false);
        grid.getStore().rejectChanges();
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
    checkArIsEmpty: function () {
        var me = this;
        var f = me.getFormdata();
        var griArDetail = me.getDetailargrid();
        var store = griArDetail.getStore();
        var count = store.getCount();
        var gridCoaDetail = me.getDetailjournalgrid();
        if (count == '0') {
            me.isEdit = null;
            gridCoaDetail.getStore().loadData([], false);
            gridCoaDetail.down('toolbar [action=generate]').setDisabled(true);
            f.down("[name=amount]").setValue('0.00');
            f.down("[name=amountc]").setValue('0.00');
        } else {
            me.isEdit = 1;
        }
    },
    getCustomRequestCombobox: function (paramname, val, val2, val3, field, model, submodel, form, param, callback) {
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
                value2: val2,
                value3: val3,
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
                    if (typeof callback === "function") {
                        callback();
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
    mainDataDirectSave: function(){
        var me = this;
        var data;
        var f = me.getFormdata();
        var g = me.getGrid();

        var sum_total_detail = accounting.unformat(f.down("[name=sum_total_detail]").getValue());
        var sum_totalc_detail = accounting.unformat(f.down("[name=sum_totalc_detail]").getValue());

        if( sum_total_detail !== sum_totalc_detail){
            me.tools.alert.warning("Debit & Credit is not balance.");
            return 0;
        }

        console.log(g.getStore());

        var vs = f.getForm().getValues();
        vs.kasbank_id = me.kasbank_id;
        vs.journal_id = vs.kasbank_id;

        value = vs;
        Ext.Ajax.request({
            url: 'cashier/journal/create',
            method: 'POST',
            params: {
                data: Ext.encode({
                    "data": value,
                    "project_id": me.project_id,
                    "hideparam": 'directsaveheader',
                })
            },
            success: function (response) {

                var res = JSON.parse(response.responseText);

                if(res.success == true){
                    Ext.Msg.show({
                        title: 'Success',
                        msg: 'Data Tersimpan',
                        icon: Ext.Msg.INFO,
                        buttons: Ext.Msg.OK
                    });

                    f.up('window').close();
                    g.getStore().reload();
                }else{
                    Ext.Msg.show({
                        title: 'Error',
                        msg: 'Gagal Tersimpan',
                        icon: Ext.Msg.ERROR,
                        buttons: Ext.Msg.OK
                    });
                }

            },
            failure: function (response) {
                Ext.Msg.show({
                    title: 'Error',
                    msg: 'Gagal Tersimpan',
                    icon: Ext.Msg.ERROR,
                    buttons: Ext.Msg.OK
                });
            }
        });
    },
    loadCurrentDraft(){
        var me = this;
        if(me.state=='create'){
            var store = me.getDetailjournalgrid().getStore();
            if(store.count() > 0){
                Ext.Msg.show({
                    title: 'Sorry',
                    msg: 'Harap Hapus Detail Terlebih Dahulu.',
                    icon: Ext.Msg.WARNING,
                    buttons: Ext.Msg.OK
                });
                return false;
            }

            var journal_draft = localStorage.getItem('journal_griddetailstore');
            if(journal_draft!==null){
                me.loadModelCoaDetailFromDraft();
            }else{
                Ext.Msg.show({
                    title: 'Sorry',
                    msg: 'Tidak ada draft yang tersimpan.',
                    icon: Ext.Msg.WARNING,
                    buttons: Ext.Msg.OK
                });
            }
        }else{
            Ext.Msg.show({
                title: 'Failed',
                msg: 'Draft hanya berlaku untuk input baru.',
                icon: Ext.Msg.WARNING,
                buttons: Ext.Msg.OK
            });
        }

    },
    mainDataSaveAsDraft(){

      var me = this;

      if(me.state!=='create'){
         Ext.Msg.show({
            title: 'Failed',
            msg: 'Save as Draft hanya berlaku untuk input baru.',
            icon: Ext.Msg.WARNING,
            buttons: Ext.Msg.OK
        });
      }

      var store = me.getDetailjournalgrid().getStore();
        if(store.count() < 1){
            Ext.Msg.show({
                title: 'Sorry',
                msg: 'Harap Isi Detail Terlebih Dahulu.',
                icon: Ext.Msg.WARNING,
                buttons: Ext.Msg.OK
            });
            return false;
        }

      var argridbrowse = Ext.getCmp('browseangsurangrid');
      var escrowgridbrowse = Ext.getCmp('browseescrowgrid');
      var gridcoadetail = me.getDetailjournalgrid();
      var griddetailstore = gridcoadetail.getStore();
      var f = me.getFormdata();
      var temp = me.localStore.subdetailcoa;

      var griddetaillocalstore = [];
      griddetailstore.each(function (rec){
        griddetaillocalstore.push(rec.data);
      });

      var gridsubdetaillocalstore = [];
      temp.each(function (rec){
        gridsubdetaillocalstore.push(rec.data);
      });

      var journal_draft = [];

      journal_draft['journal_formdatavalues'] = JSON.stringify(f.getForm().getValues());
      journal_draft['journal_griddetailstore'] = JSON.stringify(griddetaillocalstore);
      journal_draft['journal_localStoresubdetailcoa'] = JSON.stringify(gridsubdetaillocalstore);
      journal_draft['journal_deletedRows'] = JSON.stringify(f.deletedRows);
      journal_draft['journal_deletedsubRows'] = JSON.stringify(f.deletedsubRows);

      for( var key in journal_draft ) {
           localStorage.setItem(key, journal_draft[key]);
      }

        Ext.Msg.show({
            title: 'Success',
            msg: 'Data Tersimpan Sebagai Draft, <br> Anda Bisa Mengedit Lagi Nanti',
            icon: Ext.Msg.INFO,
            buttons: Ext.Msg.OK
        });

    },
    mainDataSave: function (call) {
        var me = this;
        var data;
        var f = me.getFormdata();
        var grid = me.getGrid();
        var fd = me.getFormcoadetail();
        var argridbrowse = Ext.getCmp('browseangsurangrid');
        var escrowgridbrowse = Ext.getCmp('browseescrowgrid');
        var totalpayment = accounting.unformat(f.down("[name=amount]").getValue());
        var sum_total_detail = accounting.unformat(f.down("[name=sum_total_detail]").getValue());
        var sum_totalc_detail = accounting.unformat(f.down("[name=sum_totalc_detail]").getValue());
        var gridcoadetail = me.getDetailjournalgrid();
        var griddetailstore = gridcoadetail.getStore();
        var jsonDataEncode = [];
        var journalno = f.down("[name=journal_no]").getValue();
        var getcode = journalno.substr(0,3);
        var mcf = f.down("[name=is_memorialcashflow]").getValue();
        var journal_date = f.down("[name=journal_date]").getValue();
        var jdmonth = journal_date.getMonth()+1;
        var jdday = journal_date.getDate();
        if (getcode == 'MCF' && mcf == false){
             me.tools.alert.warning("Please checklist Memorial Cashflow");
            return 0;
        }

        var myData = griddetailstore.data.items;
        console.log(myData.length);
        var countCashflowtypeID = 0;
        for (var i = 0 ; i < myData.length; i++) {
            console.log(myData[i].data['cashflowtype_cashflowtype_id']);
            if (myData[i].data['cashflowtype_cashflowtype_id'] == "") {
                countCashflowtypeID++;
            }
        }

        if (mcf == true && countCashflowtypeID > 0 ) {
            me.tools.alert.warning("Cashflow Detail Journal belum terisi.");
            return 0;
        }

        if(jdmonth<12 || jdday<31 ){
            //me.tools.alert.warning("Journal Date Harus 31 Desember");
            //return 0;
        }
        
        var temp = me.localStore.subdetailcoa;

        if(typeof temp !== "undefined")
        {

            if (me.flagpphjo == 1){

                var datasub = me.datapphjo;
              
                    griddetailstore.each(function (rec){
                        if (rec.get('datafrom') == 'genpphjo' && rec.get('kelsub_kelsub_id') != '' && rec.get('indexdata') == '1'){

                                for (var i=0;i<=datasub.length - 1;i++){
                                jsonDataEncode.push({
                                amount: datasub[i].amount,
                                coa_coa: datasub[i].coa,
                                coa_coa_id: datasub[i].coa_id,
                                coa_name: datasub[i].coa,
                                dataflow: '',
                                indexsubdata: (datasub[i].sort_subdetail).toString(),
                                kelsub_description: datasub[i].description,
                                kelsub_kelsub: datasub[i].kelsub,
                                kelsub_kelsub_id: (datasub[i].kelsub_id).toString(),
                                remarks: datasub[i].keterangan,
                                subgl_code: datasub[i].code,
                                subgl_code1: datasub[i].code1,
                                subgl_code2: datasub[i].code2,
                                subgl_code3: datasub[i].code3,
                                subgl_code4: datasub[i].code4,
                                subgl_description: '',
                                subgl_subgl_id: datasub[i].subgl_id,
                                journaldetail_amount: '', 
                                journaldetail_dataflow: '',
                                journaldetail_indexdata: (datasub[i].sort).toString(),
                                journaldetail_remarks: '',
                                journaldetail_journaldetail_id: '',
                                journalsubdetail_id: ''
                            });
                              
                            }

                        }

                    });

                    if (typeof temp !== "undefined"){

                    temp.clearFilter(true);

                    temp.each(function (rec) {
                        jsonDataEncode.push({
                            amount: rec.get('amount'),
                            coa_coa: rec.get('coa_coa'),
                            coa_coa_id: rec.get('coa_coa_id'),
                            coa_name: rec.get('coa_name'),
                            dataflow: rec.get('dataflow'),
                            indexsubdata: rec.get('indexsubdata'),
                            kelsub_description: rec.get('kelsub_description'),
                            kelsub_kelsub: rec.get('kelsub_kelsub'),
                            kelsub_kelsub_id: rec.get('kelsub_kelsub_id'),
                            remarks: rec.get('remarks'),
                            subgl_code: rec.get('subgl_code'),
                            subgl_code1: rec.get('subgl_code1'),
                            subgl_code2: rec.get('subgl_code2'),
                            subgl_code3: rec.get('subgl_code3'),
                            subgl_code4: rec.get('subgl_code4'),
                            subgl_description: rec.get('subgl_description'),
                            subgl_subgl_id: rec.get('subgl_subgl_id'),
                            journaldetail_amount: rec.get('journaldetail_amount'), 
                            journaldetail_dataflow: rec.get('journaldetail_dataflow'),
                            journaldetail_indexdata: rec.get('journaldetail_indexdata'),
                            journaldetail_remarks: rec.get('journaldetail_remarks'),
                            journaldetail_journaldetail_id: rec.get('journaldetail_journaldetail_id'),
                            journalsubdetail_id: rec.get('journaleliminasisubdetail_id')
                        });
                    });

                }

            }else{

                temp.clearFilter(true);

                temp.each(function (rec) {
                    jsonDataEncode.push({
                        amount: rec.get('amount'),
                        coa_coa: rec.get('coa_coa'),
                        coa_coa_id: rec.get('coa_coa_id'),
                        coa_name: rec.get('coa_name'),
                        dataflow: rec.get('dataflow'),
                        indexsubdata: rec.get('indexsubdata'),
                        kelsub_description: rec.get('kelsub_description'),
                        kelsub_kelsub: rec.get('kelsub_kelsub'),
                        kelsub_kelsub_id: rec.get('kelsub_kelsub_id'),
                        remarks: rec.get('remarks'),
                        subgl_code: rec.get('subgl_code'),
                        subgl_code1: rec.get('subgl_code1'),
                        subgl_code2: rec.get('subgl_code2'),
                        subgl_code3: rec.get('subgl_code3'),
                        subgl_code4: rec.get('subgl_code4'),
                        subgl_description: rec.get('subgl_description'),
                        subgl_subgl_id: rec.get('subgl_subgl_id'),
                        journaldetail_amount: rec.get('journaldetail_amount'), 
                        journaldetail_dataflow: rec.get('journaldetail_dataflow'),
                        journaldetail_indexdata: rec.get('journaldetail_indexdata'),
                        journaldetail_remarks: rec.get('journaldetail_remarks'),
                        journaldetail_journaldetail_id: rec.get('journaldetail_journaldetail_id'),
                        journalsubdetail_id: rec.get('journaleliminasisubdetail_id')
                    });
                });

            }

        }
        var msg = "";

        var state = f.up('window').state.toLowerCase();
        //Detail & Sub Checker

        if(state=='create'){
          
            var data_detailcoa = gridcoadetail.getJson();
            var data_subdetailcoa = jsonDataEncode ? JSON.parse(Ext.encode(jsonDataEncode)) : [];

            var totalamountdc = 0;
            var sumsub = 0;
            var tempamount = 0;
            
            data_detailcoa.forEach(function (item, index) {
                if(item.amount==""){item.amount = 0;}
                if(item.amountc==""){item.amountc = 0;}
                totalamountdc = parseFloat(item.amount)+parseFloat(item.amountc);
                totalamountdc = totalamountdc.toFixed(2);
                sumsub = 0;
                data_subdetailcoa.forEach(function (itemd, indexd) {
                    if(item.indexdata==itemd.journaldetail_indexdata){
                         //sumsub += parseFloat(accounting.unformat(itemd.amount)).toFixed(4);
                         tempamount = parseFloat(accounting.unformat(itemd.amount));
                         sumsub = parseFloat(sumsub.toFixed(2)) + parseFloat(tempamount.toFixed(2));
                    }
                });
                sumsub = sumsub.toFixed(2);
                if(item.kelsub_kelsub_id!==""){
                    if(totalamountdc!==sumsub){
                        msg = msg + "<br>Invalid total sub coa : "+item.coa_coa+" "+item.remarks+"";
                    }
                }
            });   
        }


        if(msg!==""){
            me.tools.alert.warning(msg);
            return 0;
        }
        

        var state = f.up("window").state;
        me.saved_id = 0;

        var gridar = me.getDetailargrid();
        //var gridescrow = me.getDetailescrowgrid();
        //temp.clearFilter(true);
       

        // console.log(griddetailstore);
        //if (f.getForm().isValid()) {
        if( sum_total_detail !== sum_totalc_detail){
        //if(false){
            me.tools.alert.warning("Debit & Credit is not balance.");
            return 0;
        }
        if (1) {
            //if (totalpayment > 0) {
            if (1) {
                me.insSave({
                    form: f,
                    grid: me.getGrid(),
                    finalData: function (data) {
                        data["paymentflag"] = me.paymentflag_id;
                        data["detailcoa"] = gridcoadetail.getJson();
                        data["subdetailcoa"] = jsonDataEncode ? JSON.parse(Ext.encode(jsonDataEncode)) : [];
                        data["detailar"] = me.paymentflag_id == "1" ? gridar.getJson() : [];
                        data["detailescrow"] = [];
                        data['deletedRows'] = f.deletedRows;
                        data['deletedsubRows'] = f.deletedsubRows;
                        return data;
                    },
                    sync: true,
                    callback: function (success) {

                    },
                    cb: function () { //ini baru jaalan
                        if (typeof call === "function") {
                            call();
                        }
                        me.checkSub(me.returninfo.id);
                    }
                });
            } else {
                me.tools.alert.warning("Amount payment must be filled.");
            }
            if (argridbrowse) {
                argridbrowse.up("window").close();
            }
            if (escrowgridbrowse) {
                escrowgridbrowse.up("window").close();
            }
        }

    },
    afterDataDetailInit: function (param, f) { //after
        var me = this;
        var fid = f.ownerCt.id;
        var fd = me.getFormcoadetail();
//        console.log(fid);
//        console.log(param);
        if (fid === 'coadatadetailsby') {
            if (param == 'update') {

                var g = me.getDetailjournalgrid();
                //var substore = me.getGridsubdetail().getStore();
                var rec = g.getSelectedRecord();
                var kelsub_id = rec.get('kelsub_kelsub_id');

                me.kasbankdetail_id = rec.get("journaldetail_id");
                var getindexdata = rec.get("indexdata");
                f.kosongGa = g.getSelectedRow(); //getSelectedRow untuk ambil row yang di klik user ,hanya 1
                f.loadRecord(g.getSelectedRecord()); //getSelectedRecord fungsi extjs
                me.formatCurrencyFormdata(me, f);

                var tempstoresub = me.localStore.subdetailcoa;
        
                if (rec.get("journaldetail_id")) {
                    var countrec = 0;
                    tempstoresub.each(function (rec) {
                        var datasub = rec['data'];
                        if (datasub.journaldetail_indexdata == getindexdata) {
                            countrec += 1;
                            //return true;
                        }
                    });
                    if (countrec === 0) {
                        me.journalDetail.loadModelSubCoaDetail(me, function () {
//                            var fda = me.getFormdata();
//                            var deletedIdsub = fda.deletedsubRows;
//                            if (deletedIdsub !== undefined || deletedIdsub.length > 0) {
//                                var gridCoaDetail = me.getGridsubdetail();
//                                var gridsubstore = gridCoaDetail.getStore();
//                            }
                        });
                    } else {
                        var substore = me.getGridsubdetail().getStore();
                        substore.loadData([], false);
                        tempstoresub.clearFilter(true);
                        var sum = 0;
                        tempstoresub.filterBy(function (rec, id) {
                            var datasub = rec['data'];
                            if (datasub.journaldetail_indexdata == getindexdata) {
                                sum += parseFloat(accounting.unformat(datasub.amount));
                                return true;
                            } else {
                                return false;
                            }
                        });
                        me.journalDetail.loadModelSubCoaDetail(me, function () {
                            substore.loadData([], false);
                            tempstoresub.each(function (rec) {
                                substore.add(rec);
                            });
                        });
                    }

                } else {

                    if (me.flagpphjo == 1 && rec.get('datafrom') == 'genpphjo'){ // if from genereate PPH JO 
                            var gridsubdetail,storesubdetail,datasubdetail;
                            gridsubdetail = me.getGridsubdetail();
                            storesubdetail = gridsubdetail.getStore();
                            datasubdetail = me.datapphjo;
                            storesubdetail.load(function(records,action,success){
                            for (var n=0;n<=datasubdetail.length - 1;n++){
                                storesubdetail.add({'journaldetail_indexdata': datasubdetail[n].sort_subdetail,
                                                    'indexsubdata': datasubdetail[n].sort_subdetail,
                                                    'kelsub_kelsub_id' : datasubdetail[n].kelsub_id,
                                                    'kelsub_kelsub': datasubdetail[n].kelsub,
                                                    'subgl_subgl_id': datasubdetail[n].subgl_id,
                                                    'subgl_code': datasubdetail[n].code.trim(),
                                                    'subgl_code1': datasubdetail[n].code1,
                                                    'subgl_code2': datasubdetail[n].code2,
                                                    'subgl_code3': datasubdetail[n].code3,
                                                    'subgl_code4': datasubdetail[n].code4,
                                                    'amount': accounting.formatMoney(datasubdetail[n].amount),
                                                    'remarks': datasubdetail[n].keterangan
                                                });
                                storesubdetail.commitChanges();



                            }

                            });

                            

                    }else{
                   
                    var substore = me.getGridsubdetail().getStore();
                    substore.loadData([], false);
                    tempstoresub.clearFilter(true);
                    var sum = 0;
                    tempstoresub.filterBy(function (rec, id) {
                        var datasub = rec['data'];
                        if (datasub.journaldetail_indexdata == getindexdata) {
                            sum += parseFloat(accounting.unformat(datasub.amount));
                            return true;
                        } else {
                            return false;
                        }
                    });
                    me.journalDetail.loadModelSubCoaDetail(me, function () {
                        substore.loadData([], false);
                        tempstoresub.each(function (rec) {
                            substore.add(rec);
                        });
                    });
                    }
                } //


            }
            else if (param == 'create') {
                f.down("[name=indexdata]").setValue(me.journalDetail.getindexdetailcoa(me));
                me.journalDetail.loadModelSubCoaDetail(me);
            }
        }
        else if (fid === 'coadatasubdetailsby') {

        }

        if (kelsub_id) {

                var gridsub = me.getGridsubdetail();
                if (gridsub) {
                    gridsub.setVisible(true);
                }
                var b = f.up("panel").getWidth();
                var c = f.up("panel").getHeight();
                var x = b / 2;
                var y = c / 2;
                
                //f.up("panel").setPosition(y, y / 2, true);
                
                if (!me.is_realized) {
                    gridsub.down("button[action=create]").setDisabled(false);
                }
                me.journalDetail.restoreTempToSubGrid(me, getindexdata);
                //f.down('[name=amount]').setReadOnly(true);
                me.journalDetail.getCashflow(me, rec.get('coa_coa_id'), function () {
                    f.down('[name=cashflow_setupcashflow_id]').setValue(rec.get('cashflow_setupcashflow_id'));
                    f.down('[name=amount]').setValue(accounting.formatMoney(rec.get('amount')));
                });
                if (me.paymentflag_id === 1) {
                    gridsub.down("button[action=create]").setDisabled(true);
                    gridsub.down("button[action=update]").setDisabled(true);
                    gridsub.down("button[action=destroy]").setDisabled(true);
                }
                me.formatCurrencyFormdata(me, f);
            } else {
            if (gridsub) {
                gridsub.setVisible(false);
            }
        }
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
    sumAmountcStore: function (store) {
        var me = this;
        var amountc = 0;
        if (store) {
            store.each(function (rec) {
                amountc += parseFloat(accounting.unformat(rec.get("amountc")));
            });
        }
        return amountc;
    },
    chequeShowWindow: function (el) {
        var ps;
        var me = this;
        var localstore = 'selectedCheque';
        var browse = new Cashier.library.BrowseCashier();
        browse.init({
            controller: me,
            view: 'ChequeGrid',
            el: el,
            localStore: localstore,
            mode_read: "chequelist",
            bukaFormSearch: true,
        });
        browse.showWindow();
    },
    chequeSelect: function (el) {
        var me = this;
        var f = me.getFormdata();
        var grid = me.getChequegrid();
        var row = grid.getSelectionModel().getSelection();
        var rec = grid.getSelectedRecord();
        f.down('[name=cheque_cheque_no]').setValue(rec.get("cheque_no"));
        f.down('[name=cheque_cheque_id]').setValue(rec.get("cheque_id"));
        el.up('window').destroy();
    },
    loadModelCoaDetail: function () {
        var me = this;
        var gridCoaDetail = me.getDetailjournalgrid();
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
    loadModelCoaDetailFromDraft: function () {
        var me = this;
        var store;
        var gridCoaDetail = me.getDetailjournalgrid();
        store = gridCoaDetail.getStore();
        var f = me.getFormdata();

        //Load Header From Draft
        var fdv = JSON.parse(localStorage.getItem('journal_formdatavalues'));
        for( var key in fdv ) {
            f.down('[name='+key+']').setValue(fdv[key]);
        }
        //lock PT
        f.down('[name=pt_pt_id]').setReadOnly(true);
        //Load Detail From Draft
        var dts = JSON.parse(localStorage.getItem('journal_griddetailstore'));
        for (var i = 0; i <= dts.length-1; i++) {
               store.add(dts[i]);
               store.commitChanges();
        }
        //Load SubDetail From Draft
        var sdtc = JSON.parse(localStorage.getItem('journal_localStoresubdetailcoa'));
        var sb = me.localStore.subdetailcoa;
        if(sdtc.length > 0){
             for (var i = 0; i <= sdtc.length-1; i++) {
                   sb.add(sdtc[i]);
                   sb.commitChanges();
            }
        }

        //enable save button
        f.down("button[action=save]").setDisabled(false);
        f.down("button[action=savenew]").setDisabled(false);
        f.down("button[action=saveprint]").setDisabled(false);
        
    },
    selectEscrowGridShow: function (el, ar) {
        var ps;
        var me = this;
        var localstore = 'selectedEscrow';
        me.kasbank_id = 0;
        me.is_erems = 0;
        var browse = new Cashier.library.BrowseCashier();
        browse.init({
            controller: me,
            view: 'EscrowGrid',
            el: el,
            localStore: localstore,
            mode_read: "selectedescrow",
            bukaFormSearch: true,
        });
        browse.showWindow();
    },
    openFormData: function () {
        var me = this;
        var w = me.instantWindow('FormData', 900, 'Add Journal Eliminasi', 'create', 'win-journalwinId');
        me.flagpphjo = 0;
    },
     openFormGenerate: function () {
        var me = this;
        var w = me.instantWindow('FormDataGenerate', 600, 'Generate Journal PPH', 'create', 'win-journalwinId');
    },
     printJournal: function () {
        var me = this;
        var grid = me.getGrid(), rec = grid.getSelectedRecord();
        me.reportFileName = "Journal";                        
        me.mainPrint();                      
    },
      mainPrint: function () {
        var me = this;
        var grid = me.getGrid(), rec = grid.getSelectedRecord();

        if ( rec.get("prefix_is_printjournal") == 1) {
            if (!me.xyReport) {
                me.xyReport = new Cashier.library.XyReportB();
                me.xyReport.init(me);
            }
            me.xyReport.processReportJs();
        } else {
            me.tools.alert.warning("This Prefix can't be printed, Please check the Master Prefix");
        }

    },
    xyReportProcessParams: function (reportData, param) {//xbreportapram
        var me = this;
        var fn = me.reportFileName;
        var grid = me.getGrid();
        var rec = grid.getSelectedRecord();

        reportData['file'] = fn;
        var idprint = '';
        var multi_userprint = '';
        var row = grid.getSelectionModel().getSelection();
        var dt = new Date();
     
        
        for (var i = 0; i < row.length; i++) {
            var jid = row[i]['data']["jid"];
           

            reportData.params["userprint"] = apps.username +' '+ (Ext.Date.format(dt, 'd/m/Y, g:i A'));
          
           
            var id = row[i]['data']['journal_id'];
            if (id != 0) {
                if ((i + 1) == row.length) {
                    idprint = idprint + id;
                    multi_userprint = reportData.params["userprint"];
                 
                } else {
                    idprint = idprint + id + '~';
                    multi_userprint = reportData.params["userprint"];
                   

                }
            }
        }
     
        reportData.params["journal_id"] = idprint;
        reportData.params["userprint"] = multi_userprint;

        return reportData;
    },
    gridSelectionChange: function () {
        var me = this;
        var grid = me.getGrid(), row = grid.getSelectionModel().getSelection();
        var rec = grid.getSelectedRecord();
        var edit = grid.down('#btnEdit');
        var deleted = grid.down('#btnDelete');
        var realisasi = grid.down('#btnRealization');
        var posting = grid.down('#btnPosting');
        var print = grid.down('#btnPrintjournal');
        if (edit !== null) {
            edit.setDisabled(row.length != 1);
        }
        if (realisasi !== null) {
            realisasi.setDisabled(row.length != 1);
        }
        if (deleted !== null) {
            deleted.setDisabled(row.length < 1);
        }
        if (posting !== null) {
            posting.setDisabled(row.length < 1);
        }
        if (print !== null){
            var printjournal = [];
            row.forEach(function (rec) {
                printjournal.push(
                        rec.get("prefix_is_printjournal") === 1 ? 1 : 0
                        );
            });


            if (printjournal.includes(0) == false) {
                    print.setDisabled(false);
              
            } else {
                print.setDisabled(true);
            }


        }
    },
    generateJournalNo: function(type, f){
        var JDate = new Date();
        var JDateString;
        JDate.setDate(JDate.getDate() + 20);
        JDateString =  JDate.getFullYear() + '/' +('0'+(JDate.getMonth()+1)).slice(-2) ;
        f.down('[name=journal_no]').setValue(type+JDateString+'/000');
    },
    checkboxmcfChange: function(me, val){
        var f = me.getFormdata();
        if(val){
            me.generateJournalNo('MCF',f);
        }else{
            me.generateJournalNo('M',f);
        }
    },
    dataSearchFilterby: function (val) {
        var me = this;

        var form = me.getFormsearch().getForm();
        var fields = me.getFormsearch().getValues();
        me.getGrid().doInit();
        var store = me.getGrid().getStore();

        var sorter = store.sorters.getAt(0); 
        if (typeof sorter != 'undefined') { 
           var sort = sorter.property; 
           var dir = sorter.direction; 
        } else { 
           var sort = 'voucher_date'; 
           var dir = 'DESC'; 
        }

        for (var x in fields)
        {
            store.getProxy().setExtraParam(x, fields[x]);
        }
        store.getProxy().setExtraParam('journal_type', val);
        store.getProxy().setExtraParam('sortby', sort);
        store.getProxy().setExtraParam('sortdirection', dir);
        me.loadPage(store);

    },
    hideEdit: function(){
        var me = this;
        var g = me.getGrid();

        if(Ext.get('WINDOW-mnu' + me.bindPrefixName)!==null){
            var mdl = 'Journaleliminasi';
        }else{
            var mdl = 'Openingbalance';
        }

        if(mdl == 'Openingbalance'){
            g.down("button[action=update]").setVisible(false);
        }else{
            g.down("button[action=update]").setVisible(true);
        }
        
    },
    sorterFunc: function(){
        var me = this;
        var grid = me.getGrid();
        grid.on('sortchange', function() {
            me.dataSearchFilterby('');
        });
    },
    copycell: function (grid) {
        var me = this;
        var text = '', model_temp = []; header_temp = [];
        if (grid) {
            var model = grid.down('headercontainer').getGridColumns();
            model.forEach(function (data) {
                if (data.xtype === "gridcolumn" || data.xtype === "datecolumn" || data.xtype === "numbercolumn") {
                    if (data.dataIndex) {
                        model_temp.push(data.dataIndex);
                        header_temp.push(data.text);
                    }
                }
            });
            var row = grid.getSelectionModel().getSelection();
            var arrm = model_temp;
            var arrh = header_temp;
            arrh.forEach(function(key) {
                text +=  key + "\t";
            });
            text +=  "\n";
            row.forEach(function (rec) {
                arrm.forEach(function(key) {
                    text +=  rec.get(key) + "\t";
                });
                text +=  "\n";
            });
            me.copyTextToClipboard(text);
        }
    },
    copyTextToClipboard: function (text) {
        var textArea = document.createElement("textarea");
        textArea.style.position = 'fixed';
        textArea.style.top = 0;
        textArea.style.left = 0;
        textArea.style.width = '2em';
        textArea.style.height = '2em';
        textArea.style.padding = 0;
        textArea.style.border = 'none';
        textArea.style.outline = 'none';
        textArea.style.boxShadow = 'none';
        textArea.style.background = 'transparent';
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        try {
            document.execCommand('copy');
        } catch (err) {
            console.log('Oops, unable to copy');
        }
        document.body.removeChild(textArea);
    },
    GenerateVoucher: function (prefix_id,flagdocument) {
        var me, p = '';
        me = this;
        p = me.pglobal;

        //get date from the formdata
        var docdate = me.formatDate(me.getFormdata().down("[name=journal_date]").getValue());

        Ext.Ajax.request({
            url: 'cashier/journal/create',
            method: 'POST',
            params: {
                data: Ext.encode({
                    "prefix_id": prefix_id,
                    "docdate": docdate,
                    "flagdocument": flagdocument,
                    "pt_id": me.pt_id,
                    "project_id": me.project_id,
                    "hideparam": 'generatevoucher',
                })
            },
            success: function (response) {

                if(response.responseText.includes("Belum ada")){
                    alert(response.responseText);
                    return false;
                }

                p.info = Ext.JSON.decode(response.responseText);
                p.cluster = p.info.data;
                p.clusterdata = p.cluster.split("#");
                me.setValue(me, 'journal_no', p.clusterdata[0]);
            },
            failure: function (response) {
            }
        });

    },
    copyJournal: function() {
        var me = this;
        var f = me.getFormdata();
        var grid = me.getGrid();
        var row = grid.getSelectionModel().getSelection();
        var rec = grid.getSelectedRecord();
        var journal_id = rec.get("journal_id");
        var journal_no = rec.get("journal_no");

        Ext.MessageBox.prompt('Copy '+journal_no, 'Please enter new voucher no:', function(btn, text){
            if(btn == 'ok'){
                Ext.Ajax.request({
                    url: 'cashier/journal/create',
                    method: 'POST',
                    params: {
                        data: Ext.encode({
                            "journal_id": journal_id ,
                            "voucher_no": text ,
                            "hideparam": 'copyjournal',
                        })
                    },
                    success: function (response) {

                        p.info = Ext.JSON.decode(response.responseText);

                    },
                    failure: function (response) {
                    }
                });

                Ext.MessageBox.alert('Status', 'Copied to '+text);
            }
        });
    },
    checkSub: function (journalID) {
        var me = this;
        var grid = me.getGrid();
        grid.setLoading('Please wait, validating...');
        var d = null;
        var sm = [];
        //VALIDASI SUB DAN AMOUNT BALANCE

        me.tools.ajax({
            params: {
                module: me.controllerName,
                journalID: journalID,
            },
            success: function (data, model, v) {
                try {
                    var msg = '';
                    var amount;
                    if(data.hasil.length > 0){
                        var voucher_no;
                        data.hasil.forEach(function(entry) {
                            amount = parseFloat(entry.amount_detail).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
                            msg = msg + entry.coa+' - '+amount+'<br>';
                            voucher_no = entry.voucher_no;
                        });
                        if(voucher_no=='Total Tidak Balance'){
                            me.tools.alert.error(voucher_no+" Mohon Diedit dan Di-Cek Kembali");
                        }else{
                            me.tools.alert.error(voucher_no + " <br> Sub Acc. gagal tersimpan :<br>" + msg);
                        }
                        
                    }
                }
                catch (err) {
                    console.log(err.message);
                    me.tools.alert.warning("Failed to load ini, please try re-open menu.");
                }
                grid.setLoading(false);
            }
        }).read('checksub');
    },
     dataDestroy: function () {
        var me = this;
        var rows = me.getGrid().getSelectionModel().getSelection();
        if (rows.length < 1) {
            Ext.Msg.alert('Info', 'No record selected !');
            return;
        } else {
            var confirmmsg, successmsg, failmsg;
            var recordcounttext = rows.length + ' record' + (rows.length > 1 ? 's' : '');
            var store = me.getGrid().getStore();
            console.log(store.getAt(store.indexOf(rows[0])));
            if (rows.length == 1) {
                var selectedRecord = '[' + store.getAt(store.indexOf(rows[0])).get('jid') + ']';
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
                            var successmsg = (rows.length == 1 ? selectedRecord : (successcount != rows.length ? successcount + ' of ' : '') + recordcounttext) + ' deleted successfully.';
                            store.un('beforesync', msg);
                            store.reload();

                            Ext.Msg.show({
                                title: 'Success',
                                msg: successmsg,
                                icon: Ext.Msg.INFO,
                                buttons: Ext.Msg.OK
                            });
                        },
                        failure: function () {
                            me.getGrid().up('window').unmask();
                            store.un('beforesync', msg);
                            store.reload();
                            Ext.Msg.show({
                                title: 'Failure',
                                msg: failmsg + ' Selected Date is Closed for Transaction',
                                icon: Ext.Msg.ERROR,
                                buttons: Ext.Msg.OK
                            });
                        },
                        error: function () {
                            me.getGrid().up('window').unmask();
                            store.un('beforesync', msg);
                            store.reload();
                            Ext.Msg.show({
                                title: 'Error',
                                msg: failmsg + ' Delete request error.',
                                icon: Ext.Msg.ERROR,
                                buttons: Ext.Msg.OK
                            });
                        }
                    });
                }
            });
        }
    },
     formDataGenerateAfterRender: function (el){

        var me, storeproject = '';
        me = this;

        var f = me.getFormdatagenerate();
    },
     loadPtbyProject: function(){

       var me = this;
        projectid = me.getFormdatagenerate().down("[name=project_id]").getValue();
  
        
        if(projectid != null){
            projectid = me.getFormdatagenerate().down("[name=project_id]").getValue();
        }else{
            projectid = apps.project;
        }

        var f = me.getFormdatagenerate();
        f.down("[name=pt_id]").setValue('');
        storecoa = me.getStore('Pt');
        storecoa.load({
            params: {
                "hideparam": 'getptbyuserproject',
                "start": 0,
                "limit": 1000000,
                "project_id": projectid,
                "user_id": apps.uid
            },
            callback: function (records, operation, success) {
                if (records[0]) {
                    var row = records[0]['data'];
                   f.down('[name=pt_id]').setValue(row.pt_id);
                   f.down('[name=pt_id]').setRawValue(row.ptname);
                }
                
            }
        });


    },
     GenerateJournalPPH: function(){

        var me = this;
        var f = me.getFormdatagenerate();
        var ptid = f.down('[name=pt_id]').getValue();
        var projectid = f.down('[name=project_id]').getValue();
        var vdatefrom = f.down('[name=vdate_from]').getRawValue();
        var vdateuntil = f.down('[name=vdate_until]').getRawValue();
        f.up('window').body.mask('Please wait ...');

                Ext.Ajax.request({
                    url: 'cashier/journal/create',
                    method: 'POST',
                    params: {
                        data: Ext.encode({
                            "project_id": projectid, 
                            "pt_id": ptid,
                            "vdate_from": vdatefrom,
                            "vdate_until": vdateuntil,
                            "hideparam": 'genjournalpph',
                        })
                    },
                    success: function (response) {

                        if(response.responseText.includes("NOTEXIST")){
                             f.up('window').body.unmask();
                             Ext.MessageBox.alert('Info', 'Selected Company Should be JO Company');
                        }else{
                            var info = Ext.JSON.decode(response.responseText);
                            f.up('window').body.unmask();
                            f.up('window').close();
                            me.gotoformdata(info);
                        }

                       

                       // p.info = Ext.JSON.decode(response.responseText);


                    },
                    failure: function (response) {
                    }
                });
        
       
               
          

    },
    gotoformdata: function (info){



        var me = this;
        var id = 'myInstantWindow';
        var formicon = 'icon-form-add';
        var winId = id;
        var win = desktop.getWindow(winId);
                win = desktop.createWindow({
                id: winId,
                title: 'create',
                iconCls: formicon,
                resizable: false,
                minimizable: false,
                maximizable: true,
                width: 900,
                renderTo: Ext.getBody(),
                constrain: true,
                constrainHeader: false,
                modal: true,
                layout: 'fit',
                shadow: 'frame',
                shadowOffset: 10,
                border: false,
                items: Ext.create('Cashier.view.journal.FormData'),
                state: 'create'
            });
        win.show();
        var grid,store,datadetail;

        var f = me.getFormdata();
        f.down('[name=description]').setValue(info[0][0].notes);
        f.down('[name=journal_no]').setValue(info[0][0].voucher_no);
        var datasubdetail = info[2];
        var sumsubdebit = 0;

        var storeprefix = me.getStore('Prefixcombo');//mendapatkan store
        storeprefix.load({
            params: {
                hideparam: 'getprefixjournalbypt',
                project_id: apps.project,
                pt_id:  apps.pt,
                start: 0,
                limit: 1000,
            },
            callback: function (records, operation, success) {
                  storeprefix.each(function (record)
                    {
                        if (record.data['prefix_id'] == info[0][0].prefix_id) {
                            f.down('[name=prefix_prefix_id]').setValue(record.data['prefix_id']);
                        }
                    });
            }
        });
        for (var n=0;n<=datasubdetail.length -1;n++){
            sumsubdebit += parseFloat(datasubdetail[n].amount);

        }

        f.down('[name=sum_total_detail]').setValue(accounting.formatMoney(sumsubdebit));
        f.down('[name=sum_totalc_detail]').setValue(accounting.formatMoney(info[0][0].credit));
        grid = me.getDetailjournalgrid();
        store = grid.getStore();
        datadetail = info[1];
       
        store.load(function(records, action, success) {
            for (var i=0;i<=datadetail.length - 1;i++){
                if (datadetail[i].type == 'D'){
                    var amountd =  parseFloat(datadetail[i].amount);
                    var amountc = 0; 
                    me.currentType = 'C';
                }else{
                    me.currentType = 'D';
                    var amountd = 0;
                    var amountc = parseFloat(datadetail[i].amount);
                }
                me.currentVal = parseFloat(datadetail[i].amount);
                store.add({
                            'indexdata': (datadetail[i].sort).toString(),
                            'remarks':datadetail[i].keterangan,
                            'subgl_description':datadetail[i].kelsub,
                            'kelsub_kelsub_id': datadetail[i].kelsub_id,
                            'kelsub_description': datadetail[i].kelsub_desc,
                            'cashflowtype_cashflowtype_id': "",
                            'kelsub_kelsub': datadetail[i].kelsub,
                            'coa_coa_id': datadetail[i].coa_id,
                            'coa_coa': datadetail[i].coa,
                            'coa_name': datadetail[i].coa_description,
                            'cashflow': datadetail[i].cashflowtype,
                            'amount': amountd,
                            'amountc': amountc,
                            'datafrom': 'genpphjo'
                        });
                store.commitChanges();
            }
        });

       me.datapphjo = null;
       me.datapphjo = info[2];


    },


});