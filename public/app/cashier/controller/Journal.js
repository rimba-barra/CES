/* JOURNAL - DAVID */
// TEST GIT
Ext.define('Cashier.controller.Journal', {
    extend: 'Cashier.library.template.controller.Controller2',
    alias: 'controller.Journal',
    views: ['journal.DetailjournalGrid', 'journal.Gridardetail', 'journal.AngsuranGrid', 'journal.Gridsubcoadetail', 'journal.Griddetaillog'],
    requires: [
    'Cashier.view.journal.DetailjournalGrid',
    'Cashier.library.BrowseCashier',
    'Cashier.library.journal.Journaldetail',
    'Cashier.library.journal.Journalar',
    'Cashier.library.template.combobox.Prefixcombobox',
    'Cashier.library.template.combobox.Subglcombobox',
    'Cashier.library.XyReportB',
    'Cashier.library.template.combobox.Ptprojectcombobox',
    'Cashier.library.template.combobox.Projectcombobox',
    'Cashier.view.journal.FormDataUploadJournal',
    'Cashier.view.journal.FormDataUploadSubJournal'
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
        selector: 'journalpanel'
    },
    {
        ref: 'grid',
        selector: 'journalgrid'
    },
    {
        ref: 'detailjournalgrid',
        selector: 'detailjournalgrid'
    },
    {
        ref: 'formdata',
        selector: 'journalformdata'
    },
    {
        ref: 'formsearch',
        selector: 'journalformsearch'
    },
    {
        ref: 'angsurangrid',
        selector: 'journalangsurangrid'
    },
    {
        ref: 'unitsubgrid',
        selector: 'journalunitsubgrid'
    },
    {
        ref: 'angsuranformsearch',
        selector: 'journalangsuranformsearch'
    },
    {
        ref: 'detailargrid',
        selector: 'journalardetailgrid'
    },
    {
        ref: 'formcoadetail',
        selector: 'journalformcoadetail'
    },
    {
        ref: 'gridsubdetail',
        selector: 'journalsubcoadetailgrid'
    },
    {
        ref: 'formsubcoadetail',
        selector: 'journalsubdetailformdata'
    },
    {
        ref: 'formdatagenerate',
        selector: 'journalformdatagenerate'
    },
    {
        ref: 'formdatauploadjournal',
        selector: 'formdatauploadjournal'
    },
    {
        ref: 'formdatacopy',
        selector: 'journalcopyformdata'
    },
    {
        ref: 'formdatauploadsubjournal',
        selector: 'formdatauploadsubjournal'
    },
    {
        ref: 'formtracking',
        selector: 'journalformtracking'
    },
    {
        ref: 'griddetaillog',
        selector: 'journalgriddetaillog'
    },
    ],
    formWidth: 900,
    controllerName: 'journal',
    fieldName: 'journalID',
    bindPrefixName: 'Journal',
    formxWinId: 'win-journalwinId',
    templateCoa: '1',
    templateModuleName: 'Installment Payment',
    shortcut: true,
    browseHandler: null,
    dateNow: new Date(),
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
    projectpt_id: apps.projectpt,
    project_id: apps.project,
    pt_id: apps.pt,
    xyReport: null,
    reportFileName: null,
    print_option: 0,
    formdata: null,
    is_closed: 0,
    paging_mode: 0,
    datapphjo: null,
    flagpphjo: 0,
    state: 'create',
    journalID: '',
    journal_no: '',
    journal_type: '',
    show_no_sub: 0,
    isJournalNoValid: true,
    tooltipwindow: null,
    lockstatusbudget: 0,
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
        "subwinid": '',
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
        me.tools = new Cashier.library.box.tools.Tools({ config: me.myConfig });
        me.journalDetail = new Cashier.library.journal.Journaldetail();
        me.journalAr = new Cashier.library.journal.Journalar();

        me.paging_mode = 1;

        if (typeof shortcut === "undefined") {
            Ext.Loader.injectScriptElement(document.URL + 'app/cashier/library/shortcut.js', function () {
            }, function () {
                // error load file
            });
        }
        this.control({
            'journalgrid': {
                afterrender: function (v) {
                    me.hideEdit();
                    me.sorterFunc();
                    me.checkAccessCreateinGrid();
                },
                select: function (selmodel, record, index) {
                    var el = me.getGrid().getEl();
                    var row = me.getGrid().getSelectionModel().getSelection();

                    const mouseCoord = el.getXY();
                    if (row.length == 1) {
                        setTimeout(me.getQuickDetail(record.get("journal_id"), record, mouseCoord), 0);
                    }

                },
                boxready: function (panel) {
                    var me = this;
                    //add new sc
                    me.assignShortcut("alt+a", "btnAddNewJournal");
                }
            },
            'journalgrid toolbar [name=limit]': {
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
            'journalpanel button[action=collection]': {
                click: me.selectUnitGridShow
            },
            'journalpanel button[action=escrow]': {
                click: me.selectEscrowGridShow
            },
            'journalangsurangrid button[action=select]': {
                click: function (v) {
                    var me = this;
                    me.scheduleSelect(v);
                }
            },
            'journalunitsubgrid button[action=select]': {
                click: function (el) {
                    var me = this;
                    me.unitsubSelect(el);
                }
            },
            'journalangsurangrid ': {
                selectionchange: function () {
                    me.journalAr.gridSelectionChangeAngsuranGrid(me);
                },
                itemdblclick: function (v) {
                    var me = this;
                    me.scheduleSelect(v);
                }
            },
            'journalformdata [name=panel]': {
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
            'journalformdata [action=cancel]': {
                click: function () {
                    var me = this;
                    me.cancelFormdata();
                }
            },
            'journalformdata [action=savenew]': {
                click: function () {
                    var me = this;
                    me.mainDataSave(function () {
                        me.openFormData();
                    });
                }
            },
            'journalformdata [action=directsave]': {
                click: function () {
                    var me = this;
                    me.mainDataDirectSave();
                }
            },
            'journalformdata [action=saveasdraft]': {
                click: function () {
                    var me = this;
                    me.mainDataSaveAsDraft();
                }
            },
            'journalformdata [action=loaddraft]': {
                click: function () {
                    var me = this;
                    me.loadCurrentDraft();
                }
            },
            'journalformdata [action=saveprint]': {
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
            'journalformdata [name=payment_paymentmethod_id]': {
                change: function (val) {
                    var me = this;
                    if (val.value) {
                        me.journalDetail.changePayment(me, val.value);
                    }
                }
            },
            'journalformdata [name=kasbank_date]': {
                change: function (val) {
                    var me = this;
                    var state = val.up('window').state;
                    if (state == "create") {
                        if (val.value) {

                        }
                    }
                }
            },
            'journalformdata [name=pt_projectpt_id]': {
                change: function (val) {
                    var me = this;
                    me.setprojectpt(val.name, val.ownerCt);
                    var state = val.up('window').state;
                    var f = me.getFormdata();
                    var e = val;
                    
                    try {
                        me.projectpt_id = e.value;
                        me.project_id = e.valueModels[0].data.project_project_id;
                        me.pt_id = e.valueModels[0].data.pt_id;
                        me.ptId = me.pt_id
                        f.down("[name=project_project_id]").setValue(parseInt(me.project_id));
                        f.down("[name=pt_pt_id]").setValue(parseInt(me.pt_id));
                    }
                    catch(err) {
                        f.down("[name=pt_projectpt_id]").setValue(parseInt(me.projectpt_id));
                    }

                    if (state == "create") {
                        if (f.down("[name=journal_date]").getValue()) {
                            if (val.value) {
                                me.journalDetail.getJournalId(me, f.down("[name=journal_date]").getValue(), state, val.value);
                            }
                        }
                    }
                    me.checkMandatory();
                }
            },
            'journalformdata [name=journal_date]': {
                select: function (val) {
                    var me = this;
                    var state = val.up('window').state;
                    var f = me.getFormdata();

                    if (state == "create" || state == "update") {
                        if (1) {
                            me.journalDetail.getJournalId(me, f.down("[name=journal_date]").getValue(), state, f.down("[name=pt_pt_id]").getValue());
                        }
                    }
                    me.pjvalue = this.getValue(me, 'prefix_prefix_id', 'value');
                    
                    if (me.pjvalue != null ) {
                        me.GenerateVoucher(me.pjvalue, '0');
                    }

                    me.checkMandatory();
                },
                blur: function (val) {
                    var me = this;
                    var state = val.up('window').state;
                    var f = me.getFormdata();
                    if (state == "create") {
                        var journal_date = f.down("[name=journal_date]").getValue();
                        var timestamp = Date.parse(journal_date);

                        if (isNaN(timestamp) == true) {
                            me.tools.alert.warning("Invalid Date");
                            f.down("button[action=save]").setDisabled(true);
                            f.down("button[action=savenew]").setDisabled(true);
                            f.down("button[action=saveprint]").setDisabled(true);
                            return 0;
                        }
                        if (1) {
                            me.journalDetail.getJournalId(me, f.down("[name=journal_date]").getValue(), state, f.down("[name=pt_pt_id]").getValue());
                        }
                    }
                    me.checkMandatory();
                }
            },
            'journalformdata [name=department_department_id]': {
                change: function (val) {
                    var me = this;
                    var state = val.up('window').state;
                    var f = me.getFormdata();
                    if (val.value) {
                        me.checkMandatory();
                    }
                }
            },
            'journalformdata [name=dataflow]': {
                change: function (val) {
                    var me = this;
                    if (val.value) {
                        me.changeFlow(val);
                        //me.getCustomRequestCombobox('kasbank', val.value, 'journalprefix_journalprefix_id', 'journal', ['prefix', 'coa'], me.getFormdata());
                        //me.getFormdata().down("[name=journalprefix_journalprefix_id]").setValue('');
                    }
                }
            },
            'journalformdata [action=browseCheque]': {
                click: function (val) {
                    var me = this;
                    me.chequeShowWindow(val);
                }
            },
            'journalformdata checkboxfield[name=autogeneratefaktur]': {
                change: function (val) {
                    var me = this;
                    me.journalDetail.autogeneratejournal(me, val);
                }
            },
            'journalformdata [name=prefix_prefix_id]': {
                select: function (e) {
                    me.pjrawval = this.getValue(me, 'prefix_prefix_id', 'raw');
                    me.pjvalue = this.getValue(me, 'prefix_prefix_id', 'value');
                    var is_cashier = e.valueModels[0].data.is_cashier;
                    var is_cashflow = e.valueModels[0].data.is_cashflow;
                    var f = me.getFormdata();

                    if (is_cashflow == false) {
                        f.down("[name=is_memorialcashflow]").setDisabled(true);
                    } else {
                        f.down("[name=is_memorialcashflow]").setDisabled(false);
                    }



                    me.pstatefromjournal = me.getFormdata().up('window').state.toLowerCase();
                    if (me.pstatefromjournal == 'create') {
                        this.GenerateVoucher(me.pjvalue, '0');
                    } else {
                        if (is_cashier == true) {
                            me.tools.alert.warning("Tidak bisa pindah ke prefix KAS/BANK!");
                            f.up('window').close();
                        } else {
                            this.GenerateVoucher(me.pjvalue, '0');
                        }
                    }
                },

            },
            'detailjournalgrid toolbar [action=generate]': {
                click: function () {
                    me.journalDetail.generateCoa(me, me.templateCoa, 'click');
                }
            },
            'detailjournalgrid toolbar [action=create]': {
                click: function (el, act) {
                    me.journalDetail.formDataDetail(me, 'create');
                }
            },
            'detailjournalgrid toolbar [action=createcopy]': {
                click: function () {
                    var g = me.getDetailjournalgrid();
                    var rec = g.getSelectionModel().getSelection()[0];
                    console.log(rec);

                    var f  = me.getFormdata().getValues();
                    console.log(f);
                    var setupcashflowID = rec.data.cashflowtype_cashflowtype_id;
                    var coaID           = rec.data.coa_coa_id;
                    var pt              = parseInt(f.pt_pt_id);
                    var project         = parseInt(f.project_project_id);
                    var journalDate     = f.journal_date;
                    var amount          = 0;

                    if (rec.data.amount == 0) {
                        amount = rec.data.amountc * -1;
                    }else{
                        amount = rec.data.amount;
                    }

                    console.log(amount);

                    me.checkBlanceBudgetCashflow(pt,project,coaID,setupcashflowID,amount,journalDate,'createcopy');

                    
                }
            },
            'detailjournalgrid toolbar [action=update]': {
                click: function () {
                    me.journalDetail.formDataDetail(me, 'update')
                }
            },
            'detailjournalgrid': {
                itemdblclick: function () {
                    me.journalDetail.formDataDetail(me, 'update');
                },
                selectionchange: function () {
                    me.journalDetail.gridSelectionChangedetailcoaGrid(me);
                }
            },
            'journalardetailgrid toolbar [action=browseSchedule]': {
                click: function (el) {
                    me.selectUnitGridShow(el, 'AngsuranGridNoSearch');
                }
            },
            'journalardetailgrid toolbar [action=destroy]': {
                click: function (el) {
                    me.journalAr.dataDestroyAr(me, el);
                }
            },
            'journalardetailgrid toolbar [name=paymentall]': {
                blur: function (el) {
                    me.journalAr.paymentTextFieldOnBlur(me, el);
                }
            },
            'journalformcoadetail [name=cashflowtype_cashflowtype_id]': {
                select: function (val) {
                    me.journalDetail.cashflowChange(me);
                }
            },
            'journalformcoadetail [name=subgl_subgl_id]': {
                select: function (val) {
                    me.journalDetail.subglChange(me);
                }
            },
            'journalformcoadetail [name=coa_coa_id]': {
                select: function () {
                    me.journalDetail.destroysubdetail2(me);
                    me.journalDetail.coaChange(me);
                },
                change: function () {
                    me.journalDetail.destroysubdetail2(me);
                    me.journalDetail.coaChange(me);
                }
            },
            'journalformcoadetail [name=type_acc]': {
                change: function () {
                    me.journalDetail.acctypeChange(me);
                }
            },
            'journalformcoadetail [name=amount]': {
                'blur': function () {
                    me = this;
                    var fd = me.getFormcoadetail();
                    me._formatCurrency(fd.down('[name=amount]'), "blur");
                }
            },
            'journalformcoadetail [name=amountc]': {
                'blur': function () {
                    me = this;
                    var fd = me.getFormcoadetail();
                    me._formatCurrency(fd.down('[name=amountc]'), "blur");
                }
            },
            'journalformcoadetail button[action=save]': {
                click: function (el, act) {
                    //me.journalDetail.savedetailcoa(me);
                    var f  = me.getFormdata().getValues();
                    var fd = me.getFormcoadetail().getValues();  // untuk ambil amount
                    console.log("INI");
                    console.log(f);
                    console.log(fd);
                    var setupcashflowID = fd.cashflowtype_cashflowtype_id;
                    var coaID           = fd.coa_coa_id;
                    var pt              = parseInt(f.pt_pt_id);
                    var project         = parseInt(f.project_project_id);
                    var journalDate     = f.journal_date;
                    var amount          = 0;

                    if (fd.type_acc == 'D') {
                        amount = fd.amount;
                    }else{
                        amount = '-' + fd.amountc;
                    }
                    
                    me.checkBlanceBudgetCashflow(pt,project,coaID,setupcashflowID,amount,journalDate,'save',me);
                    
                    // if (me.lockstatusbudget == 0) {
                    //     var sb = me.journalDetail.savedetailcoa(me);                        
                    //     if (sb !== 0) { //jika valid
                    //         if (typeof sb !== "undefined") {
                    //             me.localStore.subdetailcoa = sb;
                    //         }
                    //         if (typeof sb === "undefined") {
                    //             alert("subdetailcoa is undefined please report this bug");
                    //         }
                    //     }   
                    // }
                }
            },
            'journalformcoadetail button[action=directsave]': {
                click: function (el, act) {
                    console.log('directsave');
                    //me.journalDetail.savedetailcoa(me);
                    me.journalDetail.directsavedetailcoa(me);
                }
            },
            'journalformcoadetail button[action=savenew]': {
                click: function (el, act) {
                    console.log('savenew');

                    var f  = me.getFormdata().getValues();
                    var fd = me.getFormcoadetail().getValues();  // untuk ambil amount
                    console.log(fd);
                    var setupcashflowID = fd.cashflowtype_cashflowtype_id;
                    var coaID           = fd.coa_coa_id;
                    var pt              = parseInt(f.pt_pt_id);
                    var project         = parseInt(f.project_project_id);
                    var journalDate     = f.journal_date;
                    var amount          = 0;

                    if (fd.type_acc == 'D') {
                        amount = fd.amount;
                    }else{
                        amount = '-' + fd.amountc;
                    }
                    
                    me.checkBlanceBudgetCashflow(pt,project,coaID,setupcashflowID,amount,journalDate,'savenew');

                    // var sb = me.journalDetail.savedetailcoa(me);
                    // if (sb !== 0) { //jika valid
                    //     if (typeof sb !== "undefined") {
                    //         me.localStore.subdetailcoa = sb;
                    //     }
                    //     if (typeof sb === "undefined") {
                    //         alert("subdetailcoa is undefined please report this bug");
                    //     }
                    //     me.journalDetail.savenewdetailcoa(me);
                    // }
                }
            },
            'journalformcoadetail toolbar button[action=cancel]': {
                click: function (el, act) {
                    me.journalDetail.cancelFormdatadetail(me);
                }
            },
            'detailjournalgrid toolbar button[action=destroy]': {
                click: function (el, act) {
                    me.journalDetail.destroydetail(me);
                }
            },
            'detailjournalgrid toolbar button[action=upload]': {
                click: function () {
                    this.FormUploadJournalShow('upload');
                }
            },
            'journalsubcoadetailgrid toolbar button[action=uploadSub]': {
                click: function () {
                    this.FormUploadSubJournalShow('upload');
                }
            },
            'journalsubcoadetailgrid toolbar [action=create]': {
                click: function (el, act) {
                    me.journalDetail.formDataSubDetail(me, 'create');
                }
            },
            'journalsubcoadetailgrid toolbar [action=update]': {
                click: function (el, act) {
                    me.journalDetail.formDataSubDetail(me, 'update');
                }
            },
            'journalsubcoadetailgrid toolbar [action=destroy]': {
                click: function (el, act) {
                    me.journalDetail.destroysubdetail(me);
                }
            },
            'journalsubcoadetailgrid ': {
                selectionchange: function () {
                    me.journalDetail.gridSelectionChangedetailsubcoaGrid(me);
                },
                itemdblclick: function () {
                    me.journalDetail.formDataSubDetail(me, 'update');
                }
            },
            'journalsubdetailformdata': {
                afterrender: function (v) {
                    var state = v.up('window').state;
                    me.journalDetail.fdardatasub(me, state);
                },
                boxready: function () {
                    var me = this;

                    $("#journalsubdetailformdataID input[name='amount']").keyup(function () {
                        var fd = me.getFormsubcoadetail();
                        me._formatCurrency(fd.down('[name=amount]'));
                    });
                }
            },
            'journalformdatagenerate': {
                afterrender: this.formDataGenerateAfterRender
            },
            'journalformdatagenerate [name=project_id]': {
                change: function (el) {
                    this.loadPtbyProject();
                }

            },
            'journalformdatagenerate [action=save]': {
                click: function () {
                    var me = this;
                    me.flagpphjo = 1;
                    me.GenerateJournalPPH();
                }
            },
            'journalsubdetailformdata [name=subgl_subgl_id]': {
                select: function (val) {
                    me.journalDetail.subglChange(me,val.value);
                },
                afterrender: function (subgl) {
                    me.localStore.substore = subgl.getStore();
                }
            },
            'journalsubdetailformdata button[action=save]': {
                click: function () {
                    me.journalDetail.savesubdetailcoa(me);
                }
            },
            'journalsubdetailformdata button[action=directsave]': {
                click: function () {
                    me.journalDetail.directsavesubdetailcoa(me);
                }
            },
            'journalsubdetailformdata [name=amount]': {
                keyup: function (event) {
                    me = this;
                    var fd = me.getFormsubcoadetail();
                    me._formatCurrency(fd.down('[name=amount]'));
                },
                blur: function () {
                    me = this;
                    var fd = me.getFormsubcoadetail();
                    me._formatCurrency(fd.down('[name=amount]'), "blur");
                }
            },
            'journalformcoadetail [name=browseUnitsub]': {
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
            'journalescrowgrid': {
                selectionchange: function () {
                    me.journalDetail.gridSelectionChangeEscrowGrid(me);
                },
                itemdblclick: function (v) {
                    var me = this;
                    me.journalAr.escrowSelect(me, v);
                }
            },
            'journalescrowgrid button[action=select]': {
                click: function (v) {
                    var me = this;
                    me.journalAr.escrowSelect(me, v);
                }
            },
            'journalformdata [name=is_memorialcashflow]': {
                change: function (field, newValue, oldValue, eOpts) {
                    var me = this;
                    var f = me.getFormdata();
                    
                    me.pref = this.getValue(me, 'prefix_prefix_id', 'raw');
                    var jour_no = f.down('[name=journal_no]').getValue();
                    
                    var result = jour_no.substring(0, 3);

                    if (result !== 'MCF' && result !== 'MJK') {
                        me.checkboxmcfChange(me, newValue);
                    }
                }
            },
            'journalgrid toolbar [action=create]': {
                click: function () {
                    me.flagpphjo = 0;
                    me.currentType = 0;
                    me.currentVal = 0;
                }

            },
            'journalgrid toolbar [action=update]': {
                click: function () {
                    me.flagpphjo = 0;
                    me.currentType = 0;
                    me.currentVal = 0;
                }
            },

            'journalgrid toolbar [action=action0]': {
                click: function () {
                    me.dataSearchFilterby('');
                    $(".jtrbtn").css('font-weight', 'initial');
                    $(".jtrbtn").css('text-decoration', 'none');
                    $("#jrbtnALL").css('font-weight', 'bold');
                    $("#jrbtnALL").css('text-decoration', 'underline');

                    // clear filter no sub journal
                    $('#jrbtnNoSub').removeClass('filterJournalActive');
                    $("#jrbtnNoSub").css('font-weight', 'initial');
                    $("#jrbtnNoSub").css('text-decoration', 'none');
                }
            },
            'journalgrid toolbar [action=destroy]': {
                click: function () {
                    this.dataDestroy();
                }
            },

            'journalgrid toolbar [action=printjournal]': {
                click: function () {
                    this.printJournal();
                }
            },
            'journalgrid toolbar [action=action1]': {
                click: function () {
                    me.dataSearchFilterby('VC');
                    $(".jtrbtn").css('font-weight', 'initial');
                    $(".jtrbtn").css('text-decoration', 'none');
                    $("#jrbtnVC").css('font-weight', 'bold');
                    $("#jrbtnVC").css('text-decoration', 'underline');
                }
            },
            'journalgrid toolbar [action=action2]': {
                click: function () {
                    me.dataSearchFilterby('MCF');
                    $(".jtrbtn").css('font-weight', 'initial');
                    $(".jtrbtn").css('text-decoration', 'none');
                    $("#jrbtnMCF").css('font-weight', 'bold');
                    $("#jrbtnMCF").css('text-decoration', 'underline');
                }
            },
            'journalgrid toolbar [action=action3]': {
                click: function () {
                    me.dataSearchFilterby('MJ');
                    $(".jtrbtn").css('font-weight', 'initial')
                    $(".jtrbtn").css('text-decoration', 'none');
                    $("#jrbtnMJ").css('font-weight', 'bold')
                    $("#jrbtnMJ").css('text-decoration', 'underline');
                }
            },
            'journalgrid toolbar [action=action4]': {
                click: function () {

                    if ($('#jrbtnNoSub').hasClass('filterJournalActive')) {
                        $('#jrbtnNoSub').removeClass('filterJournalActive');
                        $("#jrbtnNoSub").css('font-weight', 'initial');
                        $("#jrbtnNoSub").css('text-decoration', 'none');
                        me.dataSearchFilterby('WithoutNoSub');
                    } else {
                        $('#jrbtnNoSub').addClass('filterJournalActive');
                        $("#jrbtnNoSub").css('font-weight', 'bold');
                        $("#jrbtnNoSub").css('text-decoration', 'underline');
                        me.dataSearchFilterby('WithNoSub');

                        // remove style in filter button "ALL"
                        $("#jrbtnALL").css('font-weight', 'initial');
                        $("#jrbtnALL").css('text-decoration', 'none');
                    }
                }
            },
            'journalgrid toolbar [action=copyjournal]': {
                click: function () {
                    var me = this;
                    var numberofselection = me.getGrid().getSelectionModel().getSelection().length;
                    console.log(numberofselection);
                    if (numberofselection == 0) {
                        me.tools.alert.warning("No data selected");
                        return false;
                    } else if (numberofselection > 1) {
                        me.tools.alert.warning("Can only select 1 data to copy");
                        return false;
                    }

                    me.copyJournal();
                }
            },
            'journalgrid toolbar [action=genjournalpph]': {
                click: function () {
                    me.openFormGenerate();
                    me.flagpphjo = 1;
                }
            },
            'journalformdata': {
                boxready: function (panel) {
                    var me = this;
                    //add new sc new detail
                    me.assignShortcut("alt+a", "btnAddNewDetailJournal");

                }
            },
            'journalformsearch': {
                boxready: function (panel) {
                    var me = this;
                    $("#journalformsearchID input[name='voucher_no']").focus();
                    $("#journalformsearchID").keyup(function (e) {
                        if (e.which == 13) {
                            e.preventDefault();
                            me.dataSearch();
                            return false;
                        }
                    });
                },
                afterrender: function () {
                    var me = this;
                    var f = me.getFormsearch();

                    f.down("[name='amount']").setVisible(false);
                }
            },
            'journalformsearch [name=project_id]': {
                change: function(v) {
                    var f = me.getFormsearch();
                    if (v.value) {
                        me.project_id = v.value;
                        var pt = f.down("[name=pt_id]").getStore();
                        pt.clearFilter();
                        pt.filter('project_project_id', v.value, true, false);

                        pt.filterBy(function (rec, id) {
                            return rec.data.project_project_id == v.value;
                        });

                        if(v.value==apps.project){
                            f.down("[name=pt_id]").setValue(parseInt(apps.projectpt));
                        }else{
                            f.down("[name=pt_id]").setValue('');
                        }
                    }
                }
            },
            'journalformsearch [name=pt_id]': {
                change: function (e) {
                    var f = me.getFormsearch();
                    if (e.value) {
                        // me.setprojectpt(e.name, e.ownerCt, 'project_project_id');
                        var project_id = e.valueModels[0].data.project_project_id
                        var pt_id = e.valueModels[0].data.pt_id;
                        f.down('[name=voucherprefix_voucherprefix_id]').setValue('');
                        f.down('[name=voucherprefix_voucherprefix_id]').setReadOnly(false);
                        me.pt_name = me.tools.comboHelper(f.down("[name=pt_id]")).getField('pt_id', 'name');
                        me.getCustomRequestComboboxModule('global', 'getallprefix', pt_id, project_id, '', 'voucherprefix_voucherprefix_id', 'voucherprefix', ['prefix',
                            'coa'], f, '');

                        //
                        f.down("[name=pt_pt_id]").setValue(parseInt(pt_id));
                    } else {
                        f.down('[name=voucherprefix_voucherprefix_id]').setValue('');
                        f.down('[name=voucherprefix_voucherprefix_id]').setReadOnly(false);
                    }
                }
            },
            'journalformsearch [name=voucherprefix_voucherprefix_id]': {
                change: function (e) {
                    var f = me.getFormsearch();
                    if (e.value) {
                        me.bank_name = me.tools.comboHelper(f.down("[name=voucherprefix_voucherprefix_id]")).getField('prefix_prefix_id', 'description');
                        me.coa_name = me.tools.comboHelper(f.down("[name=voucherprefix_voucherprefix_id]")).getField('prefix_prefix_id', 'coa_coa');
                    }
                }
            },
            'journalformsearch [name=amount_search_type]': {
                change: function () {
                    var me = this;
                    var f = me.getFormsearch();
                    var sel = f.down("[name=amount_search_type]").getValue();

                    if (sel == "between") {
                        f.down("[name='amount']").setVisible(false);
                        f.down("[name='amount']").setValue("");
                        f.down("[name='amount_from']").setVisible(true);
                        f.down("[name='amount_to']").setVisible(true);
                    } else {
                        f.down("[name='amount']").setVisible(true);
                        f.down("[name='amount_from']").setVisible(false);
                        f.down("[name='amount_from']").setValue("");
                        f.down("[name='amount_to']").setVisible(false);
                        f.down("[name='amount_to']").setValue("");
                    }
                }
            },
            'journalformcoadetail': {
                boxready: function (panel) {
                    var me = this;
                    $("#journalformcoadetailID").keyup(function (e) {
                        if (e.which == 13) {
                            e.preventDefault();
                            me.journalDetail.savedetailcoa(me);
                            return false;
                        }
                    });
                    $("#journalformcoadetailID input[name='coa_coa_id']").keyup(function () {
                        this.value = this.value.replace(/(\d{2})(\d{2})/, '$1' + '.' + '$2')
                    });

                    $("#journalformcoadetailID input[name='amount']").keyup(function () {
                        var fd = me.getFormcoadetail();
                        me._formatCurrency(fd.down('[name=amount]'));
                    });

                    $("#journalformcoadetailID input[name='amountc']").keyup(function () {
                        var fd = me.getFormcoadetail();
                        me._formatCurrency(fd.down('[name=amountc]'));
                    });

                    me.assignShortcut("alt+a", "btnAddNewSubDetailJournal");

                }
            },
            'formdatauploadjournal button[action=upload]': {
                click: function () {
                    this.UploadJournal();
                }
            },
            'formdatauploadjournal [name=file-path]': {
                change: function (me) {
                    this.validatefiletype(me);
                }
            },
            'journalcopyformdata': {
                afterrender: function () {
                    var me = this;
                    var grid = me.getGrid();
                    var rec = grid.getSelectedRecord();
                    var journal_id = rec.get("journal_id");
                    var f = me.getFormdatacopy();

                    f.down('[name=journal_id]').setValue(journal_id);
                }
            },
            'journalcopyformdata [action=save]': {
                click: function () {
                    var me = this;
                    this.processCopy();
                }
            },
            'detailjournalgrid toolbar button[action=exportacc]': {
                click: function () {
                    this.ExportDetail();
                }
            },
            'formdatauploadsubjournal button[action=uploadSub]': {
                click: function () {
                    var t = this;
                    var form = this.getFormdatauploadsubjournal();
                    var filename = form.down("[name=file-path]").getValue();
                    if (filename == "" || filename == null) {
                        Ext.MessageBox.show({
                            title: 'Invalid file',
                            msg: 'Please select files to upload',
                            buttons: Ext.Msg.OK,
                            icon: Ext.Msg.ERROR
                        });
                        return false;
                    }
                    Ext.MessageBox.show({
                        title: 'Warning !',
                        msg: 'Data yang sudah ada akan terhapus. Apakah anda yakin?',
                        buttons: Ext.MessageBox.OKCANCEL,
                        fn: function (btn) {
                            if (btn == 'ok') {
                                    var grid = me.getGrid(), row = grid.getSelectionModel().getSelection();
                                    console.log(grid);
                                    var getCoaJournalIndex = t.journalDetail.fdatasub(me);
                                    me.journalDetail.destroysubdetail2(me);
                                    t.UploadSubJournal(getCoaJournalIndex['coa_id'],getCoaJournalIndex['kelsub_kelsub_id'],getCoaJournalIndex['remarks']);
                            }
                        }
                    });
                }
            },
            'journalgrid [name=btnCheckJournal]': {
                click: function() {
                    this.checkJournalNotBalance();
                }
            },
            'detailjournalgrid toolbar [action=trackingjournal]': {
                click: function() {
                    me.instantWindow('FormTracking', 800, 'Log', '', '');
                }
            },
            'journalformtracking': {
                afterrender: function() {
                    var me, form;
                    me = this;
                    me.formTrackingAfterRender();
                },
            },
        });
},
setDisabledSave: function () {

    var me = this;

    var f = me.getFormdata();
        //-----
        var paging_mode = me.paging_mode;

        if (paging_mode == 1) {
            f.down('button[action=directsave]').setVisible(true);
            f.down('button[action=cancel]').setVisible(false);
            f.down('button[action=save]').setVisible(false);
            f.down('button[action=savenew]').setVisible(false);
            f.down('button[action=saveprint]').setVisible(false);
        } else {
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
        var storeprefix = f.down("[name=prefix_prefix_id]").getStore();

        var g = me.getDetailjournalgrid();

        //-----

        //directsave
        var maingrid = me.getGrid(), rec = maingrid.getSelectedRecord();

        if (rec === undefined || rec === null) {
            me.paging_mode = 0;
        } else {
            if (rec.get('is_directsave') == 1) {
                me.paging_mode = 1;
            } else {
                me.paging_mode = 0;
            }
        }

        if (state == 'create') {
            me.paging_mode = 0;
        }


        //-----

        me.setDisabledSave();

        if (Ext.get('WINDOW-mnu' + me.bindPrefixName) !== null) {
            var mdl = 'Journal';
        } else {
            var mdl = 'Openingbalance';
        }

        if (mdl == 'Openingbalance') {
            f.down('[name=is_memorialcashflow]').setVisible(false);
            f.down('[name=refferal_id]').setVisible(false);
            f.down('[name=description]').setValue('OPENING BALANCE');
            f.down('button[action=savenew]').setVisible(false);
            f.down('button[action=saveprint]').setVisible(false);
            f.down("[name=journalardetail]").setDisabled(true);
            f.down('[name=journalardetail]').setVisible(false);
            g.down('toolbar [action=generate]').setVisible(false);
        } else {
            f.down("[name=refferal_id]").setVisible(true);
            f.down("[name=journalardetail]").setDisabled(false);
        }

        //-----

        if (state == 'create') {
            var state = 'create';
            var ptid = fs.down("[name=pt_id]").getValue();
            // console.log(fs.down("[name=pt_id]"));
            me.projectpt_id = parseInt( fs.down("[name=pt_id]").valueModels[0].data.pt_projectpt_id );
            me.project_id = parseInt( fs.down("[name=pt_id]").valueModels[0].data.project_project_id );
            me.pt_id = parseInt( fs.down("[name=pt_id]").valueModels[0].data.pt_id );
            me.ptId = me.pt_id;
            // f.down('[name=pt_projectpt_id]').setValue(me.projectpt_id);
            var kasbank_date = f.down("[name=kasbank_date]").getValue();
            //var dataflow = f.down('[name=dataflow]').getValue();
            var dataflow = 1;
            me.is_erems = 0;
            me.journalDetail.disableSave(me, true);
            me.fdar().create();
            me.setActiveForm(f);
            f.down('[name=kasbank_date]').setValue(me.dateNow);
            //f.down('[name=journal_date]').setValue(me.dateNow);
            me.generateJournalNo('M', f);
            if (mdl == 'Openingbalance') {
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
            storeprefix.getProxy().setExtraParam('is_cashier', 0);
            storeprefix.getProxy().setExtraParam('is_active', 1);
            storeprefix.getProxy().setExtraParam('project_id', me.project_id);
            storeprefix.getProxy().setExtraParam('pt_id', me.pt_id);
            storeprefix.load();
            // console.log(me.projectpt_id);
            /*setTimeout(function(){ 
                f.down('[name=pt_projectpt_id]').setValue(apps.projectpt);
                f.down('[name=project_project_id]').setValue(apps.pt);
            }, 1000);*/

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
            f.down("[name=pt_projectpt_id]").setReadOnly(true);
            if (rec.get('prefix_is_cashier') != '') {
                f.down("[name=prefix_prefix_id]").setReadOnly(true);
                f.down("[name=prefix_prefix_id]").getStore().clearFilter();
            } else {
                f.down("[name=prefix_prefix_id]").setReadOnly(false);
            }

            me.journalID = f.down("[name=journalID]").getValue();
            me.journal_no = f.down("[name=journal_no]").getValue();
            storeprefix.getProxy().setExtraParam('is_cashier', '');
            storeprefix.getProxy().setExtraParam('is_active', '');
            storeprefix.getProxy().setExtraParam('project_id', me.project_id);
            storeprefix.getProxy().setExtraParam('pt_id', me.pt_id);
            storeprefix.load();
            //g.down("button[action=createcopy]").setDisabled(true);
        }

        me.checkAccess();
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

        $("#WINDOW-mnu" + me.bindPrefixName + "-body .x-tool-collapse-left").click();
        $("#WINDOW-mnu" + me.bindPrefixName + "_header-targetEl .x-tool-maximize").click();
        $('head').append('<link rel="stylesheet" type="text/css" href="app/main/js-css/style-additional.css">');

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
        shortcut.add("ctrl+alt+c", function () {
            me.copycell(me.getGrid());
        }, {
            'type': 'keydown',
            'propagate': true,
            'target': document
        });
        p.setLoading("Please wait");
        me.tools.ajax({
            params: { module: me.controllerName },
            form: p,
            success: function (data, model) {

                try {

                    me.tools.weseav2(data.pt, f.down("[name=pt_id]")).comboBox('', function () {
                        var combostore = f.down('[name=pt_id]').getStore();
                        var record = combostore.findRecord('pt_projectpt_id', parseInt(apps.projectpt),0,false,true,true);
                        
                        if (record) {
                            f.down("[name=pt_id]").setValue(parseInt(apps.projectpt));
                            var grid = me.getGrid();
                            grid.setLoading('Please wait');
                            var storear = grid.getStore();
                            var fields = f.getForm().getFieldValues();
                            for (var x in fields) {
                                storear.getProxy().setExtraParam(x, fields[x]);
                            }
                            storear.load({
                                callback: function () {
                                    grid.setLoading(false);
                                }
                            });
                        }
                    });

                    me.tools.weseav2(data.pt, f.down("[name=project_id]")).comboBox('', function () {
                        var combostore = f.down('[name=project_id]').getStore();
                        var record = combostore.findRecord('project_project_id', parseInt(apps.project),0,false,true,true);
                        if (record) {
                            f.down("[name=project_id]").setValue(parseInt(apps.project));
                            var grid = me.getGrid();
                            grid.setLoading('Please wait');
                            var storear = grid.getStore();
                            var fields = f.getForm().getFieldValues();
                            for (var x in fields) {
                                storear.getProxy().setExtraParam(x, fields[x]);
                            }
                            storear.load({
                                callback: function () {
                                    grid.setLoading(false);
                                }
                            });
                        }
                    });

                    // me.tools.weseav3(data.pt, f.down("[name=pt_id]"), parseInt(apps.pt)).comboBox();
                    // me.tools.weseav3(data.project, f.down("[name=project_id]"), parseInt(apps.project)).comboBox();
                    //me.tools.weseav2(data.project, f.down("[name=project_id]")).comboBox(true);
                    f.down("[name=pt_pt_id]").setValue(parseInt(apps.pt));

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
        me.tools.weseav2(data.pt, form.down("[name=pt_projectpt_id]")).comboBox('', function () {
            var combostore = form.down('[name=pt_projectpt_id]').getStore();
            var record = combostore.findRecord('pt_projectpt_id', parseInt(me.projectpt_id),0,false,true,true);
            if (record) {
                form.down('[name=pt_projectpt_id]').setValue(parseInt(me.projectpt_id));
            }
        });
        me.tools.weseav2(data.project, form.down("[name=project_project_id]")).comboBox('', function () {
            var combostore = form.down('[name=project_project_id]').getStore();
            var record = combostore.findRecord('project_project_id', parseInt(me.project_id),0,false,true,true);
            if (record) {
                form.down('[name=project_project_id]').setValue(parseInt(me.project_id));
            }
        });
        // me.tools.wesea(data.project, form.down("[name=project_project_id]")).comboBox();
        /*me.tools.wesea(data.pt, form.down("[name=pt_pt_id]")).comboBox('', function () {
        });*/
        me.journalDetail.fillPt(me);
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

            if (false) {
                g.down("button[action=create]").setDisabled(true);
                g.down("button[action=update]").setVisible(false);
                g.down("button[action=destroy]").setVisible(false);
                g.down("button[action=createcopy]").setDisabled(true);

                f.down("button[action=save]").setVisible(false);
                f.down("button[action=savenew]").setVisible(false);
                f.down("button[action=saveprint]").setVisible(false);
            } else if (department && pt) {
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
                pt_id: me.pt_id,
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


        setTimeout(function () {
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
            f.down("[name=kasbank_date]").setValue(me.dateNow);
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
        f.down('[name=subgl_description]').setValue(rec.get("code") + " " + rec.get("description"));
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
            //f.down("[name=amountc]").setValue('0.00');
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
    mainDataDirectSave: function () {
        var me = this;
        var data;
        var f = me.getFormdata();
        var g = me.getGrid();

        var sum_total_detail = accounting.unformat(f.down("[name=sum_total_detail]").getValue());
        var sum_totalc_detail = accounting.unformat(f.down("[name=sum_totalc_detail]").getValue());

        if (sum_total_detail !== sum_totalc_detail) {
            me.tools.alert.warning("Debit & Credit is not balance.");
            return 0;
        }

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

                if (res.success == true) {
                    Ext.Msg.show({
                        title: 'Success',
                        msg: 'Data Tersimpan',
                        icon: Ext.Msg.INFO,
                        buttons: Ext.Msg.OK
                    });

                    f.up('window').close();
                    g.getStore().reload();
                } else {
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
    loadCurrentDraft() {
        var me = this;
        if (me.state == 'create') {
            var store = me.getDetailjournalgrid().getStore();
            if (store.count() > 0) {
                Ext.Msg.show({
                    title: 'Sorry',
                    msg: 'Harap Hapus Detail Terlebih Dahulu.',
                    icon: Ext.Msg.WARNING,
                    buttons: Ext.Msg.OK
                });
                return false;
            }

            var journal_draft = localStorage.getItem('journal_griddetailstore');
            if (journal_draft !== null) {
                me.loadModelCoaDetailFromDraft();
            } else {
                Ext.Msg.show({
                    title: 'Sorry',
                    msg: 'Tidak ada draft yang tersimpan.',
                    icon: Ext.Msg.WARNING,
                    buttons: Ext.Msg.OK
                });
            }
        } else {
            Ext.Msg.show({
                title: 'Failed',
                msg: 'Draft hanya berlaku untuk input baru.',
                icon: Ext.Msg.WARNING,
                buttons: Ext.Msg.OK
            });
        }

    },
    mainDataSaveAsDraft() {

        var me = this;

        if (me.state !== 'create') {
            Ext.Msg.show({
                title: 'Failed',
                msg: 'Save as Draft hanya berlaku untuk input baru.',
                icon: Ext.Msg.WARNING,
                buttons: Ext.Msg.OK
            });
            return false;
        }

        var store = me.getDetailjournalgrid().getStore();
        if (store.count() < 1) {
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
        griddetailstore.each(function (rec) {
            griddetaillocalstore.push(rec.data);
        });

        var gridsubdetaillocalstore = [];
        temp.clearFilter(true);
        temp.each(function (rec) {
            gridsubdetaillocalstore.push(rec.data);
        });

        var journal_draft = [];

        journal_draft['journal_formdatavalues'] = JSON.stringify(f.getForm().getValues());
        journal_draft['journal_griddetailstore'] = JSON.stringify(griddetaillocalstore);
        journal_draft['journal_localStoresubdetailcoa'] = JSON.stringify(gridsubdetaillocalstore);
        journal_draft['journal_deletedRows'] = JSON.stringify(f.deletedRows);
        journal_draft['journal_deletedsubRows'] = JSON.stringify(f.deletedsubRows);

        for (var key in journal_draft) {
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
        var journaldate = f.down("[name=journal_date]").getValue();
        var getcode = journalno.substr(0, 3);
        var mcf = f.down("[name=is_memorialcashflow]").getValue();

        if (getcode == 'MCF' && mcf == false) {
            me.tools.alert.warning("Please checklist Memorial Cashflow");
            return 0;
        }

        if (mcf == true) {
            var checkCashflow = Ext.JSON.decode(me.journalDetail.getAllCashflowType(me.project_id, me.pt_id));
            if (checkCashflow.data != null) {
                var isValid = true;
                var data_detailcoa = gridcoadetail.getJson();
                data_detailcoa.forEach(function (item, index) {
                    if (item.cashflowtype_cashflowtype_id == "" || item.cashflowtype_cashflowtype_id == null) {
                        isValid = false;
                    }
                })
                if (isValid == false) {
                    me.tools.alert.warning("Cashflow type in detail journal must be filled.");
                    return 0;
                }
            }
        }

        var state = f.up('window').state.toLowerCase();

        if (state == "create") {
            var validasiNoJournal = Ext.JSON.decode(me.validasiNomorJournal(journalno, Ext.Date.format(journaldate, 'Y-m-d')));
            if (validasiNoJournal.data.hasil.length > 0) {
                me.tools.alert.warning("Journal Number Already Exists");
                return false;
            }
        }

        var temp = me.localStore.subdetailcoa;
        if (typeof temp !== "undefined") {

            if (me.flagpphjo == 1) {

                var datasub = me.datapphjo;

                griddetailstore.each(function (rec) {
                    if (rec.get('datafrom') == 'genpphjo' && rec.get('kelsub_kelsub_id') != '' && rec.get('indexdata') == '1') {

                        for (var i = 0; i <= datasub.length - 1; i++) {
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

                if (typeof temp !== "undefined") {

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
                            journalsubdetail_id: rec.get('journalsubdetail_id')
                        });
                    });

                }

            } else {

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
                        journalsubdetail_id: rec.get('journalsubdetail_id')
                    });
                });

            }

        }
        var msg = "";
        //Detail & Sub Checker
        console.log(jsonDataEncode);
        if (state == 'create') {

            var data_detailcoa = gridcoadetail.getJson();
            var data_subdetailcoa = jsonDataEncode ? JSON.parse(Ext.encode(jsonDataEncode)) : [];

            var totalamountdc = 0;
            var sumsub = 0;
            var tempamount = 0;

            data_detailcoa.forEach(function (item, index) {
                if (item.amount == "") { item.amount = 0; }
                if (item.amountc == "") { item.amountc = 0; }
                totalamountdc = parseFloat(item.amount) + parseFloat(item.amountc);
                totalamountdc = totalamountdc.toFixed(2);
                sumsub = 0;
                data_subdetailcoa.forEach(function (itemd, indexd) {

                    if (item.indexdata == itemd.journaldetail_indexdata) {
                        //sumsub += parseFloat(accounting.unformat(itemd.amount)).toFixed(4);
                        tempamount = parseFloat(accounting.unformat(itemd.amount));
                        sumsub = parseFloat(sumsub.toFixed(2)) + parseFloat(tempamount.toFixed(2));
                    }
                });
                sumsub = sumsub.toFixed(2);
                if (item.kelsub_kelsub_id !== "") {
                    if (totalamountdc !== sumsub) {
                        msg = msg + "<br>Invalid total sub coa : " + item.coa_coa + " " + item.remarks + "";
                    }
                }
            });
        }


        if (msg !== "") {
            me.tools.alert.warning(msg);
            return 0;
        }


        var state = f.up("window").state;
        me.saved_id = 0;

        var gridar = me.getDetailargrid();
        //var gridescrow = me.getDetailescrowgrid();
        //temp.clearFilter(true);


        //console.log(temp);
        //if (f.getForm().isValid()) {
            if (sum_total_detail !== sum_totalc_detail) {
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
                            data["detailar"] = me.paymentflag_id === 1 ? gridar.getJson() : [];
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
                        me.checkSub(me.returninfo.id, 0);
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
        validasiNomorJournal: function (voucher_no, voucher_date) {

            return Ext.Ajax.request({
                url: 'cashier/journal/read',
                method: 'POST',
                timeout: 10000000,
                params: {
                    mode_read: 'checknomorjournal',
                    module: 'journal',
                    voucher_no: voucher_no,
                    voucher_date: voucher_date
                },
                async: false
            }).responseText;
        },
        getQuickDetail: function (journal_id, record, mouseCoord) {
            var me = this;
            var jsonstr = Ext.Ajax.request({
                url: 'cashier/journal/read',
                method: 'POST',
                params: {
                    mode_read: 'getquickdetail',
                    module: 'journal',
                    journal_id: journal_id
                },
                async: false
            }).responseText;
            var obj = JSON.parse(jsonstr);
            var hasil = obj.data.hasil;
            var str = '';
            str = '<div style="padding:5px; font-size:9px; height: inherit; overflow: auto; overflow-x: hidden;">' +
            '<table style="width:100%;" border="1"><tr style="font-weight:bolder; text-decoration:underline; background-color:#D3D3D3"><th>Coa</th><th>Name</th><th>Kelsub</th><th>Description</th><th style="text-align:right">DB</th><th style="text-align:right">CR</th></tr>';
            for (var key in hasil) {
                if (hasil.hasOwnProperty(key)) {
                    jj = hasil[key];
                    var kelsub = jj.kelsub;
                    if (kelsub == null) {
                        kelsub = '';
                    }

                    if (jj.kelsub_id > 0) {
                        var hoverclass = 'class="my-tooltip-hover"';
                    } else {
                        var hoverclass = '';
                    }
                    str = str + '<tr style="border:1px solid #ccc; #a8a8a8; padding: 5px;" ><td style="min-width: 50px" ' + hoverclass + '><span class="my-tooltip-tooltip">' + jj.htmlsub + '</span><a href="#">' + jj.coa + '</a></td><td>' + jj.coa_name + '</td><td>' + kelsub + '</td><td>' + jj.keterangan + '</td><td style="text-align:right">' +
                    accounting.formatMoney(jj.amount) + '</td><td style="text-align:right">' +
                    accounting.formatMoney(jj.amount_c) + '</td></tr>';
                }
            }
            str = str + '</table></div>';

            var contents = str;

            if (me.tooltipwindow !== null) {
                me.tooltipwindow.destroy();
                me.tooltipwindow = null;
            }
            me.tooltipwindow = Ext.create('Ext.window.Window', {
                width: 400,
                height: 200,
                title: record.get("voucher_no"),
                html: contents,
                draggable: true,
                closable: true,
                bodyStyle: "background-color: rgba(223,232,246,0.7);",
                style: "background-color: rgba(223,232,246,0.7);"
            });

            me.tooltipwindow.showAt([mouseCoord[0] + 600, mouseCoord[1] + 100]);
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
                //console.log(tempstoresub);

                if (rec.get("journaldetail_id")) {
                    var countrec = 0;
                    tempstoresub.each(function (rec) {
                        var datasub = rec['data'];
                        if (parseInt(datasub.journaldetail_indexdata) == parseInt(getindexdata)) {
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
                            if (parseInt(datasub.journaldetail_indexdata) == parseInt(getindexdata)) {
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

                    if (me.flagpphjo == 1 && rec.get('datafrom') == 'genpphjo') { // if from genereate PPH JO 
                        var gridsubdetail, storesubdetail, datasubdetail;
                        gridsubdetail = me.getGridsubdetail();
                        storesubdetail = gridsubdetail.getStore();
                        datasubdetail = me.datapphjo;
                        storesubdetail.load(function (records, action, success) {
                            for (var n = 0; n <= datasubdetail.length - 1; n++) {
                                storesubdetail.add({
                                    'journaldetail_indexdata': datasubdetail[n].sort_subdetail,
                                    'indexsubdata': datasubdetail[n].sort_subdetail,
                                    'kelsub_kelsub_id': datasubdetail[n].kelsub_id,
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



                    } else {

                        var substore = me.getGridsubdetail().getStore();
                        substore.loadData([], false);
                        tempstoresub.clearFilter(true);
                        var sum = 0;

                        tempstoresub.filterBy(function (rec, id) {
                            var datasub = rec['data'];
                            if (parseInt(datasub.journaldetail_indexdata) == parseInt(getindexdata)) {
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
            /*   me.journalDetail.getCashflow(me, rec.get('coa_coa_id'), function () {
                 //  f.down('[name=cashflowtype_cashflowtype_id]').setValue(rec.get('cashflowtype_cashflowtype_id'));
                  
               });
               */
               f.down('[name=amount]').setValue(accounting.formatMoney(rec.get('amount')));
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
        for (var key in fdv) {
            f.down('[name=' + key + ']').setValue(fdv[key]);
        }
        //lock PT
        f.down('[name=pt_projectpt_id]').setReadOnly(true);
        //Load Detail From Draft
        var dts = JSON.parse(localStorage.getItem('journal_griddetailstore'));
        for (var i = 0; i <= dts.length - 1; i++) {
            store.add(dts[i]);
            store.commitChanges();
        }
        //Load SubDetail From Draft
        var sdtc = JSON.parse(localStorage.getItem('journal_localStoresubdetailcoa'));
        var sb = me.localStore.subdetailcoa;
        if (sdtc.length > 0) {
            for (var i = 0; i <= sdtc.length - 1; i++) {
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
        var w = me.instantWindow('FormData', 900, 'Add Journal', 'create', 'win-journalwinId');
        me.flagpphjo = 0;
    },
    openFormGenerate: function () {
        var me = this;
        var w = me.instantWindow('FormDataGenerate', 600, 'Generate Journal PPH', 'create', 'win-journalwinId');
    },
    printJournal: function () {
        var me = this;
        var grid    = me.getGrid(), rec = grid.getSelectedRecord();
        var message = '<select id="notevoucher" class="x-form-field x-form-required-field x-form-text"><option value="1">Print with Sub Journal</option><option value="2">Print without Sub Journal</option></select>';
        
        var project_id = parseInt(rec.get('project_project_id'));
        var pt_id      = parseInt(rec.get('pt_pt_id'));

        if (project_id == 3016 && pt_id == 3116 ) {
            me.reportFileName = "Journal_CMN";
        }else{
            me.reportFileName = "Journal";
        }
        //me.mainPrint();
        Ext.MessageBox.show({
            title: 'Print Option',
            msg: message,
            buttons: Ext.MessageBox.OKCANCEL,
            fn: function (btn) {
                if (btn == 'ok') {
                    if (Ext.get('notevoucher').getValue() == "1") {
                        me.print_option = 1;
                    } else {
                        me.print_option = 2;
                    }
                    me.mainPrint();
                }
            }
        });
    },
    mainPrint: function () {
        var me = this;
        var grid = me.getGrid(), rec = grid.getSelectedRecord();

        if (rec.get("prefix_is_printjournal") == 1) {
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
        var description = rec.get('description');
        description = description.replace(/(?:\r\n|\r|\n)/g, ' ');

        reportData['file'] = fn;
        var idprint = '';
        var multi_userprint = '';
        var row = grid.getSelectionModel().getSelection();
        var dt = new Date();

        for (var i = 0; i < row.length; i++) {
            var jid = row[i]['data']["jid"];


            reportData.params["userprint"] = apps.username + ' ' + (Ext.Date.format(dt, 'd/m/Y, g:i A'));


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
        reportData.params["print_option"] = me.print_option;
        reportData.params["description"] = description.trim();

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
        if (print !== null) {
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
    generateJournalNo: function (type, f) {
        var JDate = new Date();
        var JDateString;
        JDate.setDate(JDate.getDate() + 20);
        JDateString = JDate.getFullYear() + '/' + ('0' + (JDate.getMonth() + 1)).slice(-2);
        f.down('[name=journal_no]').setValue(type + JDateString + '/000');
    },
    checkboxmcfChange: function (me, val) {
        var f = me.getFormdata();
        try {
            var is_cashflow = f.down("[name=prefix_prefix_id]").valueModels[0].data.is_cashflow;
        } catch (err) {
            console.log('Oops, unable to get data');
        }
        var prefix = f.down("[name=prefix_prefix_id]").getValue();
        var state = me.state;


        if (val) {
            if (state == 'update') {
                if (prefix != "" && is_cashflow == false) {
                    me.tools.alert.warning("Please Select Memorial Cashflow Prefix First");
                    f.up('window').close();

                    return false
                } else {
                    me.generateJournalNo('MCF', f);
                }
            } else {
                me.generateJournalNo('MCF', f);
            }


        } else {

            me.generateJournalNo('M', f);


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

        for (var x in fields) {
            store.getProxy().setExtraParam(x, fields[x]);
        }

        if (val == 'WithNoSub') {
            me.show_no_sub = 1;
        } else if (val == 'WithoutNoSub') {
            // me.journal_type = val;
            // if (val == '') {
                me.show_no_sub = 0;
            // }
            store.getProxy().setExtraParam('showNoSub', me.show_no_sub);
        } else {
            me.journal_type = val;
        }

        store.getProxy().setExtraParam('showNoSub', me.show_no_sub);
        store.getProxy().setExtraParam('journal_type', me.journal_type);
        store.getProxy().setExtraParam('sortby', sort);
        store.getProxy().setExtraParam('sortdirection', dir);

        me.loadPage(store);

    },
    hideEdit: function () {
        var me = this;
        var g = me.getGrid();

        if (Ext.get('WINDOW-mnu' + me.bindPrefixName) !== null) {
            var mdl = 'Journal';
        } else {
            var mdl = 'Openingbalance';
        }

        if (mdl == 'Openingbalance') {
            g.down("button[action=update]").setVisible(false);
        } else {
            g.down("button[action=update]").setVisible(true);
        }

    },
    sorterFunc: function () {
        var me = this;
        var grid = me.getGrid();
        grid.on('sortchange', function () {
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
            arrh.forEach(function (key) {
                text += key + "\t";
            });
            text += "\n";
            row.forEach(function (rec) {
                arrm.forEach(function (key) {
                    text += rec.get(key) + "\t";
                });
                text += "\n";
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
    GenerateVoucher: function (prefix_id, flagdocument) {
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

                if (response.responseText.includes("Belum ada")) {
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
    uploadAJ: function (pvaldata, lvaldata) {
        //referensi masuk ke erems ke controller admincollection        
        var me, p, psa, pmsa = '';
        me = this;
        p = me.paj; //param account journal
        l = me.psaj; //param account journal
        pmsa = me.pmsaj; //param account journal

        p.statefrom = 'create';

        if (true) {

            l.statefromaj = 'save';
            pmsa.statefromaj = 'save';

            p.store = me.getAccountJournalGrid().getStore();
            l.store = me.getSubAccountGrid().getStore();

            p.store.add(pvaldata);
            l.store.add(lvaldata);

            me.setSum();

            l.store.filter('journaldetail_id_sub', 0);
            //me.getFormdataaccountjournal().up('window').close();

        }

        return p.journaldetail_id - 1;
    },
    UploadJournal: function () {
        var formdata = this.getFormdata();
        var form = this.getFormdatauploadjournal();
        var groupingdata = 0;
        var groupingdata = form.down("[name=groupingdata]").getValue();
        var journal_id = formdata.down("[name=journal_id]").getValue();

        if (journal_id == 0 || journal_id == null || journal_id == '') {
            Ext.Msg.alert('Warning', 'Fitur ini hanya untuk Mode Update. <br>Untuk Create Journal silakan gunakan menu Transaction -> Upload');
            return 0;
        }

        var me = this;
        if (true) {
            try {
                form.submit({
                    url: 'cashier/journal/read',
                    waitMsg: 'Processing data...',
                    params: {
                        project_id: me.project_id,
                        pt_id: me.pt_id,
                        journal_id: journal_id,
                        module: 'journal',
                        groupingdata: groupingdata,
                        mode_read: 'upload'
                    },
                    success: function (fp, o) {
                        try {
                            var dt = o.result;
                            var emsg = '';
                            var msg = '';
                            var errormsg = dt.error;
                            form.up('window').close();
                            form.up('window').unmask();
                            formdata.up('window').unmask();
                            formdata.up('window').close();
                            var arrayLength = Object.keys(errormsg).length;
                            if (arrayLength > 0) {
                                for (var i = 0; i < arrayLength; i++) {
                                    if (typeof errormsg[i] !== "undefined") {
                                        emsg = emsg + errormsg[i] + '<br>';
                                    }
                                }
                                emsg = emsg + 'Transaksi Dibatalkan';
                                Ext.Msg.alert('Warning', emsg);
                                return false;
                            } else {
                                Ext.Msg.alert('Success', 'Uploaded Successfully.');
                                me.checkSub(journal_id, 1);
                            }


                        } catch (err) {
                            Ext.Msg.alert('Warning', '[1] Processing failed !');
                            return false;
                        }
                    },
                    failure: function (fp, o) {
                        Ext.Msg.alert('Warning', '[2] Processing failed !');
                        return false;
                    }
                });
            }
            catch (err) {
                Ext.Msg.alert('Warning', '[3] Processing failed !');
                return false;
            }

        }
    },
    FormUploadJournalShow: function (action) {
        var me, p, psa, pmsa = '';
        me = this;
        var w = me.instantWindow('FormDataUploadJournal', 600, 'Upload Journal', 'create', 'win-accountjournalformdata');
    },

    FormUploadSubJournalShow: function (action) {
        var me, p, psa, pmsa = '';
        me = this;
        var w = me.instantWindow('FormDataUploadSubJournal', 600, 'Upload Sub GL', 'create', 'win-accountjournalformdata');
    },

    copyJournal: function () {
        var me = this;
        me.instantWindow('FormDataCopy', 400, 'Copy Journal', 'create', 'win-copyjournalformdata');
    },
    checkSub: function (journalID, reload) {
        var me = this;
        var grid = me.getGrid();
        var fss = me.getFormsearch();
        fss.down("[name=voucher_no]").setValue(me.journal_no);
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
                    if (data.hasil.length > 0) {
                        var voucher_no;
                        data.hasil.forEach(function (entry) {
                            amount = parseFloat(entry.amount_detail).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
                            msg = msg + entry.coa + ' - ' + amount + '<br>';
                            voucher_no = entry.voucher_no;
                        });
                        if (voucher_no == 'Total Tidak Balance') {
                            me.tools.alert.error(voucher_no + " Mohon Diedit dan Di-Cek Kembali");
                        } else {
                            me.tools.alert.error(voucher_no + " <br> Sub Acc. gagal tersimpan :<br>" + msg);
                        }

                    }
                }
                catch (err) {
                    console.log(err.message);
                    me.tools.alert.warning("Failed to load ini, please try re-open menu.");
                }
                grid.setLoading(false);

                if (reload == 1) {
                    me.dataSearch();
                }
            }
        }).read('checksub');
    },
    dataDestroy: function () {
        var me = this;
        var p = me.getPanel();
        var rows = me.getGrid().getSelectionModel().getSelection();

        if (rows.length < 1) {
            Ext.Msg.alert('Info', 'No record selected !');
            return;
        } else {

            var journalMadebySys = '';
            var journalMadebyAPI = false;
            rows.forEach(function (rec) {
                var journalID     = rec.get("journalID");
                var prefixJournal = journalID.substring(0, 2);
                var isFromKasir   = rec.get("is_fromkasir");
                var kasbank_id    = rec.get("kasbank_id");
                var refferal_id   = rec.get("refferal_id");

                if (prefixJournal == "VC" || isFromKasir == "1" || (kasbank_id != null && kasbank_id != 0)) {
                    journalMadebySys += '- ' + journalID + '<br>';
                }

                if (refferal_id === 'PIM') {
                    journalMadebyAPI = true;
                }
            })

            if (journalMadebySys != '') {
                Ext.Msg.alert('Info', 'Unable to delete journal data that made by system : <br>' + journalMadebySys);
                return;
            }

            if (journalMadebyAPI) {
                Ext.Msg.show({
                    title  : 'Info',
                    msg    : 'Unable to delete journal data that made by API.',
                    icon   : Ext.Msg.INFO,
                    buttons: Ext.Msg.OK
                });
                return;
            }

            var confirmmsg, successmsg, failmsg;
            var recordcounttext = rows.length + ' record' + (rows.length > 1 ? 's' : '');
            var store = me.getGrid().getStore();
            if (rows.length == 1) {
                var selectedRecord = '[' + store.getAt(store.indexOf(rows[0])).get(me.fieldName) + ']';
                confirmmsg = 'Delete ' + selectedRecord + ' ?';
                failmsg = 'Error: Unable to delete ' + selectedRecord + '.';
            } else {
                confirmmsg = 'This action will delete ' + recordcounttext + '.<br />Continue ?';
                failmsg = 'Error: Unable to delete data.';
            }
            Ext.Msg.confirm('Delete Journal', confirmmsg + '<br><br>Reason <br><br>' + '<textarea type="text" id="reasondeletejournal" name="reasondeletejournal" maxlength="100"></textarea>', function (btn) {
                if (btn == 'yes') {
                    if($('#reasondeletejournal').val().length < 5){
                        Ext.Msg.show({
                            title: 'Warning',
                            msg: 'Reason deleting journal at least 5 characters.',
                            icon: Ext.Msg.WARNING,
                            buttons: Ext.Msg.OK
                        });
                        return false;
                    }

                    resetTimer();
                    p.setLoading('Deleting data, please wait ...');
                    var msg = function () {
                        me.getGrid().up('window').mask('Deleting data, please wait ...');
                    };
                    for (var i = 0; i < rows.length; i++) {
                        rows[i].data.reasondelete = $('#reasondeletejournal').val();
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
                            p.setLoading(false);
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
                            p.setLoading(false);
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
                            p.setLoading(false);
                        }
                    });

                    
                }
                
            });
        }
    },
    formDataGenerateAfterRender: function (el) {

        var me, storeproject = '';
        me = this;

        var f = me.getFormdatagenerate();

        storeproject = me.getStore('Project');
        storeproject.load({
            params: {
                "hideparam": 'projectpt',
                "project_id": apps.project,
                "start": 0,
                "limit": 1000000,
            }, callback: function (recordscode, operationcode, successcode) {
                if (successcode) {
                    if (recordscode[0]) {
                        var firstdatacode = recordscode[0]['data'];
                        f.down("[name=project_id]").setValue(parseInt(apps.project));

                    }
                }
            }

        });



    },
    loadPtbyProject: function () {

        var me = this;
        projectid = me.getFormdatagenerate().down("[name=project_id]").getValue();


        if (projectid != null) {
            projectid = me.getFormdatagenerate().down("[name=project_id]").getValue();
        } else {
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
    GenerateJournalPPH: function () {

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

                if (response.responseText.includes("NOTEXIST")) {
                    f.up('window').body.unmask();
                    Ext.MessageBox.alert('Info', 'Selected Company Should be JO Company');
                } else {
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
    gotoformdata: function (info) {



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
        var grid, store, datadetail;

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
                pt_id: apps.pt,
                start: 0,
                limit: 1000,
            },
            callback: function (records, operation, success) {
                storeprefix.each(function (record) {
                    if (record.data['prefix_id'] == info[0][0].prefix_id) {
                        f.down('[name=prefix_prefix_id]').setValue(record.data['prefix_id']);
                    }
                });
            }
        });
        for (var n = 0; n <= datasubdetail.length - 1; n++) {
            sumsubdebit += parseFloat(datasubdetail[n].amount);

        }

        f.down('[name=sum_total_detail]').setValue(accounting.formatMoney(sumsubdebit));
        f.down('[name=sum_totalc_detail]').setValue(accounting.formatMoney(info[0][0].credit));
        grid = me.getDetailjournalgrid();
        store = grid.getStore();
        datadetail = info[1];

        store.load(function (records, action, success) {
            for (var i = 0; i <= datadetail.length - 1; i++) {
                if (datadetail[i].type == 'D') {
                    var amountd = parseFloat(datadetail[i].amount);
                    var amountc = 0;
                    me.currentType = 'C';
                } else {
                    me.currentType = 'D';
                    var amountd = 0;
                    var amountc = parseFloat(datadetail[i].amount);
                }
                me.currentVal = parseFloat(datadetail[i].amount);
                store.add({
                    'indexdata': (datadetail[i].sort).toString(),
                    'remarks': datadetail[i].keterangan,
                    'subgl_description': datadetail[i].kelsub,
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
    validatefiletype: function (me) {

        var indexofPeriod = me.getValue().lastIndexOf("."),
        uploadedExtension = me.getValue().substr(indexofPeriod + 1, me.getValue().length - indexofPeriod);

        var fullPath = me.getValue();
        var lastIndex = fullPath.lastIndexOf('\\');
        var fileName = fullPath.substring(lastIndex + 1);

        var allowedExtns = ['csv', 'txt'];
        if (!Ext.Array.contains(allowedExtns, uploadedExtension.toLowerCase())) {
            me.setActiveError('Please Use csv or txt File Format!');
            Ext.MessageBox.show({
                title: 'File Type Error',
                msg: 'Please Use csv or txt File Format!',
                buttons: Ext.Msg.OK,
                icon: Ext.Msg.ERROR
            });
            me.setRawValue(null);
            return;
        }
        me.setRawValue(fileName);
    },
    checkmonthclosing: function (month, year) {
        return Ext.Ajax.request({
            url: 'cashier/journal/read',
            method: 'POST',
            timeout: 10000000,
            params: {
                mode_read: 'checkmonthclosing',
                module: 'journal',
                month: month,
                year: year
            },
            async: false
        }).responseText;
    },
    processCopy: function () {

        var me = this;
        var f = me.getFormdatacopy();
        var fss = me.getFormsearch();
        var info = null;
        var monthlabel = {
            '01': 'jan',
            '02': 'feb',
            '03': 'mar',
            '04': 'apr',
            '05': 'may',
            '06': 'jun',
            '07': 'jul',
            '08': 'aug',
            '09': 'sep',
            '10': 'oct',
            '11': 'nov',
            '12': 'dec'
        };

        var journal_id = f.down("[name=journal_id]").getValue();
        var voucher_no = f.down("[name=voucher_no]").getValue();
        var voucher_date = f.down("[name=voucher_date]").getSubmitData().voucher_date;
        var hideparam = f.down("[name=hideparam]").getValue();
        var month = Ext.Date.format(f.down("[name=voucher_date]").value, 'm');
        var year = Ext.Date.format(f.down("[name=voucher_date]").value, 'Y');

        if (voucher_no == "" || voucher_no == null) {
            me.tools.alert.warning("New Voucher Number must be filled.");
            return false;
        }

        if (voucher_date == "" || voucher_date == null) {
            me.tools.alert.warning("New Journal Date must be filled.");
            return false;
        }

        f.setLoading("Processing copy journal...");

        var task = new Ext.util.DelayedTask(function () {
            var validasiNoJournal = Ext.JSON.decode(me.validasiNomorJournal(voucher_no, voucher_date));
            if (validasiNoJournal.data.hasil.length > 0) {
                me.tools.alert.warning("Journal Number Already Exists");
                f.setLoading(false);
                return false;
            }

            var validasimonthclosing = Ext.JSON.decode(me.checkmonthclosing(monthlabel[month], year));
            if (validasimonthclosing.data.result[0].result == 1) {
                me.tools.alert.warning("Journal date yang diinput berada pada bulan yang sudah closing.");
                f.setLoading(false);
                return false;
            }

            Ext.Ajax.request({
                url: 'cashier/journal/create',
                method: 'POST',
                params: {
                    data: Ext.encode({
                        "journal_id": journal_id,
                        "voucher_no": voucher_no,
                        "voucher_date": voucher_date,
                        "hideparam": hideparam,
                    })
                },
                async: false,
                success: function (response) {

                    var i = Ext.JSON.decode(response.responseText);
                    console.log(i);

                },
                failure: function (response) {
                }
            });

            f.setLoading(false);

            var proj = fss.down("[name=project_id]").getValue();
            
            Ext.MessageBox.alert('Status', 'Journal has been copied to ' + voucher_no);
            f.up('window').close();

            if (proj != 4055 ) {
                fss.down("[name=voucher_no]").setValue(voucher_no);
            }
            me.dataSearch();
        })
        task.delay(200);
    },
    assignShortcut: function (keys, target_id) {
        var me = this;
        //add new sc
        //shortcut.remove(keys);
        shortcut.add(keys, function (e) {
            e.preventDefault();
            if (me.checkActiveWindow(target_id)) {
                $("#" + target_id).click();
            }
            return false;
        }, {
            'type': 'keydown',
            'propagate': true,
            'target': document
        });
    },
    checkActiveWindow: function (target_id) {
        var me = this;
        var allWindows = Ext.ComponentQuery.query('window'),
        hasAny = false;

        var ret = false;
        Ext.each(allWindows, function (win) {
            windowId = win.getId();
            active = win.active;

            //Shortcut Management Handling
            console.log(windowId);

            if (target_id == "btnAddNewJournal" && windowId == "WINDOW-mnuJournal" && active == true) {
                ret = true;
            }
            if (target_id == "btnAddNewDetailJournal" && windowId == "win-journalwinId" && active == true) {
                ret = true;
            }
            if (target_id == "btnAddNewSubDetailJournal" && windowId == "coadatadetailsby" && active == true) {
                ret = true;
            }


        });

        return ret;
    },
    ExportDetail: function () {
        var me = this;
        var f = me.getFormdata();
        f.setLoading('Please wait ...');
        var journal_id = f.down("[name=journal_id]").getValue();
        var voucher_no = f.down("[name=journal_no]").getValue();


        Ext.Ajax.request({
            url: 'cashier/journal/create',
            method: 'POST',
            params: {
                data: Ext.encode({
                    "journal_id": journal_id,
                    "voucher_no": voucher_no,
                    "hideparam": 'exportdetailjournal',
                })
            },
            success: function (response) {

                var i = Ext.JSON.decode(response.responseText);


                // Ext.getBody().unmask();
                var file_path = i.url;
                var a = document.createElement('A');
                a.href = file_path;
                a.download = file_path.substr(file_path.lastIndexOf('/') + 1);
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                f.setLoading(false);

            },
            failure: function (response) {
                me.getFormdata().up('window').close();
            }
        });



    },


    checkAccess: function () {

        var me = this;

        Ext.Ajax.request({
            url: 'cashier/common/read',
            method: 'POST',
            timeout: 100000000,
            params: {
                hideparam: 'getaccessaction',
                term: 'JournalCreate',
                start: 0,
                limit: 1000,
            },
            success: function (response) {
                response = Ext.JSON.decode(response.responseText);
                var isactive = response.data[0].active;
                if (isactive == 0) {
                    var f = me.getFormdata();
                    f.down("button[action=saveprint]").setDisabled(true);
                    f.down("button[action=savenew]").setDisabled(true);
                    f.down("button[action=save]").setDisabled(true);
                }
            },
            failure: function (response) {

            }
        });
        //
    }
    , checkAccessCreateinGrid: function () {

        var me = this;
        var grid = me.getGrid();
        var btncopyjournal = grid.down('#btncopyjournal');
        var btngenjournalpph = grid.down('#btngenjournalpph');
        Ext.Ajax.request({
            url: 'cashier/common/read',
            method: 'POST',
            timeout: 100000000,
            async: true,
            params: {
                hideparam: 'getaccessaction',
                term: 'JournalCreate',
                start: 0,
                limit: 1000,
            },
            success: function (response) {
                response = Ext.JSON.decode(response.responseText);
                var isactive = response.data[0].active;
                if (isactive == 0) {
                    btngenjournalpph.setDisabled(true);
                    btncopyjournal.setDisabled(true);
                }
                return isactive;
            },
            failure: function (response) {

            }
        });
        //
    },

    UploadSubJournal: function (coa,kelsub_id,remarks) {
        var me = this;
        var form = this.getFormdatauploadsubjournal();
        var filename = form.down("[name=file-path]").getValue();
        if (filename == "" || filename == null) {
            Ext.MessageBox.show({
                title: 'Invalid file',
                msg: 'Please select files to upload',
                buttons: Ext.Msg.OK,
                icon: Ext.Msg.ERROR
            });
            return false;
        }

        if (true) {

            var formdata = this.getFormdata();
            var journal_id = formdata.down("[name=journal_id]").getValue();
            var griddetail = this.getDetailjournalgrid();

            rec = griddetail.getSelectionModel().getSelection()[0];
            
            console.log("Jumlah store");
            console.log(this.getDetailjournalgrid().getStore().getCount());
            
            var totalInGrid = 0;
            if (rec === undefined) {
                totalInGrid = this.getDetailjournalgrid().getStore().getCount();
                var indexdata = parseInt(totalInGrid) + 1;
                //var indexdata = 1;
            }else{
                var indexdata = parseInt(rec.get('indexdata'));
            }

            console.log(indexdata);

            var subs = me.getGridsubdetail().getStore();

            form.submit({
                url: 'cashier/journal/read',
                waitMsg: 'Processing data...',
                params: {
                    project_id: me.project_id,
                    pt_id: me.pt_id,
                    journal_id: journal_id,
                    module: 'journal',
                    coa: coa,
                    kelsub_kelsub_id: kelsub_id,
                    mode_read: 'importsub'
                },
                success: function (fp, o) {
                    var a = o.result.data;
                    var b = 0;

                    for (var v = 0; v <= o.result.data.length - 1; v++) {
                        if (a[v][9] === undefined) {
                            b = b + 1;
                        }else{
                            b = b + 0;
                        }
                    }

                    if (b == 0 ) {
                        subs.removeAll();
                        subs.loadData([],false);
                        for (var n = 0; n <= o.result.data.length - 1; n++) {

                            if (a[n] == '' || a[n] == ',' || a[n] == ';') {

                            } else {
                                var myData = {
                                    amount: a[n][2],
                                    coa_id: "",
                                    hideparam: "default",
                                    indexsubdata: n + 1,
                                    journal_id: "",
                                    journaldetail_id: "",
                                    journaldetail_indexdata: indexdata.toString(),
                                    journaldetail_journaldetail_id: "",
                                    journalsubdetail_id: "",
                                    kelsub_kelsub: a[n][9],
                                    kelsub_kelsub_id: a[n][10],
                                    remarks: remarks,
                                    statedata: "",
                                    subgl_code: a[n][0],
                                    subgl_code1: a[n][3],
                                    subgl_code2: a[n][4],
                                    subgl_code3: a[n][5],
                                    subgl_code4: a[n][6],
                                    subgl_description: a[n][8],
                                    subgl_subgl_id: a[n][11]
                                };
                                me.journalDetail.savesubdetailcoa2(me, myData);
                            }
                        }

                        Ext.Msg.alert('Success', 'Upload Sukses.');
                    }else{
                        Ext.Msg.alert('Warning', 'Upload Gagal! Kelsub atau kawasan Tidak sesuai');
                    }


                    var g = me.getGridsubdetail();
                    var grid = me.getFormdatauploadsubjournal();
                    grid.up('window').close();
                    return false;
                },
                failure: function (fp, o) {
                    var cdtn = o.result.res;
                    if (cdtn == 1) {
                        Ext.Msg.alert('Warning', 'Upload Gagal! Pastikan format file CSV.');
                    }else{
                        Ext.Msg.alert('Warning', 'Upload Gagal! Kelsub atau kawasan Tidak sesuai.');    
                    }
                    
                    return false;
                }

            });
        }
    },
    checkJournalNotBalance: function() {
        var me = this;
        var text = '';
        var p = me.getPanel();
        //ambil data pt id dan project id base on grid
        var gridd = me.getGrid();
        var gridstore = gridd.getStore();

        var project_id = apps.project;
        var pt_id = apps.pt;

        if (gridstore.data.items[0]) {
            pt_id = gridstore.data.items[0].data.pt_pt_id;
            project_id = gridstore.data.items[0].data.project_project_id;
        }
        
        var res =  Ext.Ajax.request({
            url: 'cashier/juploadsh1/read',
            method: 'POST',
            timeout: 1000000,
            async: false,
            params: {
                mode_read: 'checkjournalnotbalance',
                pt_id: pt_id,
                project_id: project_id,
                source : 'journal'
            }
        }).responseText;

        var data = Ext.JSON.decode(res);
        if (data[0].TOTAL == 0 ) {
            Ext.Msg.show(
            {
                title: 'Success',
                icon: Ext.MessageBox.INFO,
                buttons: Ext.Msg.OK,
                msg: 'All journal are balanced'
            });
        }else{
            Ext.Msg.show(
            {
                title: 'Journal Not Balance',
                icon: Ext.MessageBox.INFO,
                buttons: Ext.Msg.OK,
                msg: text + '\n' +data[0].RESULT
            });
        }
        
    },

    formTrackingAfterRender: function() {
        var me, grid, record, gridlog, storegridlog;
        me = this;
        grid = me.getGrid();
        record = grid.getSelectedRecord();
        gridlog = me.getGriddetaillog();
        storegridlog = gridlog.getStore();

        var journal_id = record.get('journal_id');

        Ext.Ajax.request({
            url: 'cashier/journal/read',
            method: 'POST',
            async: false,
            params: {
                journal_id: journal_id,
                mode_read: 'journallog'
            },
            success: function(response) {
                var data = Ext.JSON.decode(response.responseText);
                console.log(data);
                storegridlog.loadData([], false);

                for (var i = 0; i < data.data.length; i++) {

                    storegridlog.add({
                        transaction_no: data.data[i].transaction_no,
                        action: data.data[i].action,
                        user_fullname: data.data[i].user_fullname,
                        addon: data.data[i].addon,
                        module: data.data[i].module,
                    });
                    storegridlog.commitChanges();
                }

                storegridlog.each(function(rec, idx) {
                    rec.set(rec.raw)
                    storegridlog.commitChanges();
                });
            },
            failure: function(response) {

            }
        });
    },
    checkBlanceBudgetCashflow: function(pt,project,coaID,setupcashflowID,amount,journalDate,actions,otherParams) {
        var me = this;
        me.lockstatusbudget= 1;
        
        Ext.Ajax.request({
            url: 'cashier/masterbudgetcashflow/read',
            method: 'POST',
            timeout: 10000000,
            params: {
                mode_read: 'checkbudgetcashflow',
                pt_id           : pt,
                project_id      : project,
                coa_id          : coaID,
                setupcashflow_id: setupcashflowID,
                amount          : amount,
                date            : journalDate
            },
            async: false,
            success: function(response) {
                        var data = Ext.JSON.decode(response.responseText);
                        var msg = data.data[0][0].msg;
                        
                        if (msg == null) {
                            if (actions == 'createcopy') {
                                me.journalDetail.createcopy(me, 'copy');
                            }else{
                                var sb = me.journalDetail.savedetailcoa(me);                        
                                if (sb !== 0) { //jika valid
                                    if (typeof sb !== "undefined") {
                                        me.localStore.subdetailcoa = sb;
                                    }
                                    if (typeof sb === "undefined") {
                                        alert("subdetailcoa is undefined please report this bug");
                                    }
                                }
                            
                                me.lockstatusbudget = 0;
                                if (actions == 'savenew') {
                                    me.journalDetail.savenewdetailcoa(me);
                                } 
                            }
                        }else{
                            Ext.MessageBox.show({
                                title: 'Warning !',
                                icon: Ext.Msg.WARNING,
                                msg: 'Sudah melebihi Budget' + msg + ' , Apakah anda yakin ingin melanjutkan?',
                                buttons: Ext.MessageBox.OKCANCEL,
                                fn: function (btn) {
                                    if (btn == 'ok') {
                                        me.lockstatusbudget = 1;
                                        if (actions == 'createcopy') {
                                            me.journalDetail.createcopy(me, 'copy');
                                        }else{
                                            var sb = me.journalDetail.savedetailcoa(me);                        
                                            if (sb !== 0) { //jika valid
                                                if (typeof sb !== "undefined") {
                                                    me.localStore.subdetailcoa = sb;
                                                }
                                                if (typeof sb === "undefined") {
                                                    alert("subdetailcoa is undefined please report this bug");
                                                }
                                            }

                                            if (actions == 'savenew') {
                                                me.journalDetail.savenewdetailcoa(me);
                                            } 
                                        }
                                    }
                                }
                            });
                        }
                    },
                    failure: function(response) { }
        });
    }
    // Hapus dulu krn blm dipakai
    // checkFormatMRT: function() {
    //     var me, grid, record, project_id, pt_id;
    //     me = this;
    //     grid       = me.getGrid();
    //     record     = grid.getSelectedRecord();
    //     project_id = record.get('project_project_id');
    //     pt_id      = record.get('pt_pt_id');

    //     Ext.Ajax.request({
    //         url: 'cashier/journal/read',
    //         method: 'POST',
    //         async: false,
    //         params: {
    //             mode_read  : 'cekGlobalParams',
    //             project_id : project_id,
    //             pt_id      : pt_id,
    //             name       : 'PRINT_JOURNAL'
    //         },
    //         success: function(response) {
    //             var data = Ext.JSON.decode(response.responseText);
    //             var item = data.data;
    //             if (item === undefined || item.length == 0) {
    //                 me.reportFileName = "Journal";
    //             }else{
    //                 me.reportFileName = "Journal_CMN";
    //             }
    //         },
    //         failure: function(response) { }
    //     });
    // },

});