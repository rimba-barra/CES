Ext.define('Cashier.controller.Voucher', {
    extend: 'Cashier.library.template.controller.Controller2',
    alias : 'controller.Voucher',
    views : ['voucher.AngsuranGrid', 'voucher.EscrowGrid',
        'voucher.DetailvoucherGrid', 'voucher.Gridardetail',
        'voucher.Gridescrowdetail', 'voucher.Gridsubcoadetail',
        'voucher.ChequeGrid', 'voucher.CustomerGrid',
        'voucher.SupplierGrid', 'voucher.Gridotherpaymentdetail', 'voucher.Gridcashbonpayment',
        'voucher.VoucherKasbonGrid',
        'voucher.VoucherRealizedGrid',
        'voucher.SubcodeGrid',
        'voucher.ReffvcrGrid',
        'voucher.ReceiptidvcrGrid',
        'voucher.CetakslipGrid',
        'voucher.AttachmentdetailGrid',
        'voucher.ApprovaldetailGrid',
        'voucher.NonlinkGrid',
        'voucher.ChequeOutGrid', 'voucher.TenantGrid',
        'voucher.FormTracking',
        'voucher.Griddetaillog',
    ],
    requires: [
        'Cashier.view.voucher.DetailvoucherGrid',
        'Cashier.library.BrowseCashier',
        'Cashier.library.voucher.Voucherdetail',
        'Cashier.library.voucher.Voucherar',
        'Cashier.library.XyReportB',
        'Cashier.library.box.Config',
        'Cashier.library.box.tools.EventSelector',
        'Cashier.library.box.tools.Tools',
        'Cashier.library.template.combobox.Currencycombobox',
    ],
    refs: [{
            ref     : 'panel',
            selector: 'voucherpanel'
        },
        {
            ref     : 'grid',
            selector: 'vouchergrid'
        },
        {
            ref     : 'detailvouchergrid',
            selector: 'detailvouchergrid'
        },
        {
            ref     : 'formdata',
            selector: 'voucherformdata'
        },
        {
            ref     : 'formdataupload',
            selector: 'uploadformdataupload'
        },
        {
            ref     : 'formsearch',
            selector: 'voucherformsearch'
        },
        {
            ref     : 'angsurangrid',
            selector: 'voucherangsurangrid'
        },
        {
            ref     : 'angsuranformsearch',
            selector: 'voucherangsuranformsearch'
        },
        {
            ref     : 'detailargrid',
            selector: 'voucherardetailgrid'
        },
        {
            ref     : 'formcoadetail',
            selector: 'voucherformcoadetail'
        },
        {
            ref     : 'gridsubdetail',
            selector: 'vouchersubcoadetailgrid'
        },
        {
            ref     : 'formsubcoadetail',
            selector: 'vouchersubdetailformdata'
        },
        {
            ref     : 'chequegrid',
            selector: 'voucherchequegrid'
        },
        {
            ref     : 'chequeoutgrid',
            selector: 'voucherchequeoutgrid'
        },
        {
            ref     : 'escrowgrid',
            selector: 'voucherescrowgrid'
        },
        {
            ref     : 'detailescrowgrid',
            selector: 'voucherescrowdetailgrid'
        },
        {
            ref     : 'cashbonpaymentgrid',
            selector: 'vouchercashbonpaymentgrid'
        },
        {
            ref     : 'vendorgrid',
            selector: 'vouchersuppliergrid'
        },
        {
            ref     : 'tenantgrid',
            selector: 'vouchertenantgrid'
        },
        {
            ref     : 'customergrid',
            selector: 'vouchercustomergrid'
        },
        {
            ref     : 'formrealization',
            selector: 'voucherformrealization'
        },
        {
            ref     : 'formeditnokwitansi',
            selector: 'voucherformeditnokwitansi'
        },
        {
            ref     : 'formdatachequeout',
            selector: 'voucherformdataout'
        },
        {
            ref     : 'formdatachequein',
            selector: 'voucherformdatain'
        },
        {
            ref     : 'formdatapayment',
            selector: 'voucherformpayment'
        },
        {
            ref     : 'formdataestimasidenda',
            selector: 'voucherformestimasidenda'
        },
        {
            ref     : 'formdatawriteoffdenda',
            selector: 'voucherformwriteoffdenda'
        },
        {
            ref     : 'formcopyvoucher',
            selector: 'voucherformcopyvoucher'
        },
        {
            ref     : 'formpindahvoucher',
            selector: 'voucherformpindahvoucher'
        },
        {
            ref     : 'formdatavendor',
            selector: 'voucherformvendor'
        },
        {
            ref     : 'formdatavendorbank',
            selector: 'voucherformvendorbank'
        },
        {
            ref     : 'formdatachooseprjpt',
            selector: 'voucherformchooseprjpt'
        },
        {
            ref     : 'unitgrid',
            selector: 'voucherunitgrid'
        },
        {
            ref     : 'formdataotherpayment',
            selector: 'otherspaymentformdatadetail'
        },
        {
            ref     : 'otherpaymentgrid',
            selector: 'voucherotherpaymentgrid'
        },
        {
            ref     : 'voucherrealizationgrid',
            selector: 'voucherrealizationgrid'
        },
        {
            ref     : 'voucherkasbongrid',
            selector: 'voucherkasbongrid'
        },
        {
            ref     : 'subcodegrid',
            selector: 'subcodegrid'
        },
        {
            ref     : 'reffvcrgrid',
            selector: 'reffvcrgrid'
        },
        {
            ref     : 'receiptidvcrgrid',
            selector: 'receiptidvcrgrid'
        },
        {
            ref     : 'formnewsub',
            selector: 'voucherformnewsub'
        },
        {
            ref     : 'cetakslipgrid',
            selector: 'vouchercetakslipgrid'
        },
        {
            ref     : 'formdatacetakslip',
            selector: 'voucherformcetakslip'
        },
        {
            ref     : 'attachmentdetailgrid',
            selector: 'voucherattachmentdetailgrid'
        },
        {
            ref     : 'approvaldetailgrid',
            selector: 'voucherapprovaldetailgrid'
        },
        {
            ref     : 'formdatauploadattachment',
            selector: 'voucherformdatauploadattachment'
        },
        {
            ref     : 'nonlinkgrid',
            selector: 'vouchernonlinkgrid'
        },
        {
            ref     : 'formdatanonlink',
            selector: 'nonlinkformdata'
        },
        {
            ref     : 'formtracking',
            selector: 'voucherformtracking'
        },
        {
            ref     : 'griddetaillog',
            selector: 'vouchergriddetaillog'
        },
        {
            ref     : 'pemutihangrid',
            selector: 'voucherpemutihangrid'
        },
        {
            ref     : 'formpemutihan',
            selector: 'voucherformpemutihan'
        },
    ],
    urlrequest                    : 'cashier/tbank/create',
    formWidth                     : 950,
    is_closed                     : 0,
    messagedata                   : null,
    controllerName                : 'voucher',
    fieldName                     : 'voucherID',
    bindPrefixName                : 'Voucher',
    formxWinId                    : 'win-voucherwinId',
    templateCoa                   : '1',
    templateModuleName            : 'Installment Payment',
    shortcut                      : true,
    department_id                 : 0,
    printpdfOptions               : [],
    printdosOptions               : [],
    browseHandler                 : null,
    dateNow                       : new Date(),
    notes                         : null,
    indexdatax                    : 0,
    is_closing                    : 0,
    project_f                     : 0,
    paymenthelperf7               : 0,
    excludeamount                 : 0,
    terbilangexcludeamount        : null,
    iskwitansirs                  : false,
    xyReport                      : null,
    actsvcr                       : acts,
    reportFileNamevcr             : null,
    closing_msg                   : null,
    selectedPurchaseletter        : null,
    rowData                       : null,
    unit_id                       : null,
    final                         : null,
    iskprparsial                  : 0,
    fd                            : null,
    type_vendor                   : 'internal',
    isEdit                        : null,
    isnonlink                     : 0,
    totalTemp                     : 0,
    firstTotal                    : 0,
    schedule_id                   : null,
    dnschedule_id                 : null,                     //debit note
    amountSelected                : null,
    amountdnSelected              : null,                     //debit note
    totalWithoutLastrecord        : 0,
    modelCoa                      : null,
    unit_number                   : null,
    totalSumAr                    : 0,
    totalSumAfterDeleteAr         : 0,
    totalWithoutLastRecordNew     : 0,
    kelsub_id                     : 0,
    effectedSch                   : [],
    is_f7_convert                 : 0,
    schedule_id_arpayment         : [],
    reportFileNamevcrVoucher      : null,
    tagihanDefaultValue           : false,
    tempid                        : 0,
    voucherDetail                 : null,
    voucherAr                     : null,
    sumCount                      : 0,
    voucher_generate              : 0,
    kasbankdetail_id              : 0,
    paymentflag_id                : 0,
    kasbank_id                    : 0,
    purchaseletter_pencairankpr_id: null,
    is_erems                      : 0,
    clearDetailVoucher            : true,
    ptId                          : 0,
    is_paid                       : 0,
    is_realized                   : 0,
    is_posting                    : 0,
    voucher_id                    : 0,
    uploadcpms_id                 : 0,
    uploadpim_id                  : 0,
    uploadems_id                  : 0,
    ttdKwitansi                   : [],
    dataflow                      : 'O',
    formdata                      : null,
    paymenttype_id                : null,
    deletedId                     : [],
    is_closewarning               : 1,
    on_realization                : null,
    is_multirealisasi             : 0,
    subgl                         : [],
    pt_id                         : null,
    tipeprint                     : 'nonchequegiro',
    tipenotevoucher               : 1,
    localStore                    : {
        subdetailcoa     : null,
        selectedAngsuran : null,
        selectedCheque   : null,
        selectedCetakslip: null,
        customer         : null,
        price            : null,
        detail           : null,
        selectedEscrow   : null,
        selectedVoucher  : null,
        selectedSubcode  : null,
        selectedKasbon   : null,
        kasbank          : null,
        anotherar        : null,
        selectedreffvcr  : null,
        selectedreceiptid: null
    },
    cheque_formdata          : null,
    projectId                : null,
    is_closewarning2         : 0,
    is_reimburse             : 0,
    reimburse_kasbank_id     : [],
    reimburse_text           : 'REIMBURSE PETTY CASH',
    is_pettycashloan         : 0,
    pettycashloan_kasbon_id  : [],
    kasbon_id_selected_arr   : [],
    changecompanyallow       : true,
    changecompanynotes       : null,
    projectprint             : 0,
    ptprint                  : 0,
    projectprintname         : '',
    ptprintname              : '',
    bukaform                 : 0,
    norek_customer           : null,
    nama_customer            : null,
    alamat_customer          : null,
    nama_penyetor            : null,
    norek_penyetor           : null,
    alamat_penyetor          : null,
    telp_penyetor            : null,
    amount                   : null,
    terbilang                : null,
    mata_uang                : null,
    nama_bank                : null,
    nama_yang_dapat_dihubungi: null,
    templateref              : null,
    flaggeneratepajak        : 0,
    flagchangeamountpajak    : null,
    listpaymenttype          : null,
    optionQr                 : null,
    userDeletedVa            : [],
    is_request_unrealization : 0,
    is_pt_cr                 : 0,
    is_voucher_sharing       : 0,
    special_case_project_id  : [2004, 2005, 2006, 2020, 2021, 2022, 2023, 2061, 2074, 4046],   // INI UNTUK KASUS YANG AMBIL UNIT DARI PROJECT LAIN DIKARENAKAN PT_ID YANG SAMA( 1 PT_ID BANYAK PROJECT_ID)
    special_role             : [2182, 3445],
    is_coa_ar                : [],
    constructor              : function(configs) {
        this.callParent(arguments);
        var me = this;
        this.myConfig = new Cashier.library.box.Config({
            _controllerName: me.controllerName
        });

        if (typeof Stimulsoft === "undefined") {
            Ext.Loader.injectScriptElement(document.URL + 'resources/stimulsoftjsv3/scripts/stimulsoft.reports.js?v3', function() {
                console.log("[INFO] Sti loaded.");
            }, function() {
                console.log("[INFO] error load Sti.");
            });
        }
    },
    init: function() {
        var me = this;
        var events = new Cashier.library.box.tools.EventSelector();
        this.control(events.getEvents(me, me.controllerName));
        me.tools = new Cashier.library.box.tools.Tools({ config: me.myConfig });

        me.voucherDetail = new Cashier.library.voucher.Voucherdetail();
        me.voucherAr = new Cashier.library.voucher.Voucherar();
        this.control({
            'vouchergrid': {
                afterrender: function(v) {
                    me.sorterFunc();
                    me.getGrid().down('#btnPosting').setVisible(true);
                    me.getGrid().down('#btnUnposting').setVisible(false);
                }
            },
            'voucherpanel button[action=collection]': {
                click: me.selectUnitGridShow
            },
            'voucherpanel button[action=escrowpenempatan]': {
                click: me.selectUnitGridShowEscPen
            },
            'voucherpanel button[action=escrow]': {
                click: me.selectEscrowGridShow
            },
            'voucherpanel button[action=escrowparsial]': {
                click: me.selectEscrowGridShowParsial
            },
            'voucherpanel [name=dataflowpanel]': {
                change: function(val) {
                    var me = this;
                    if (val.value) {
                        me.changeDataflowGrid(val.value);
                    }
                }
            },
            'voucherpanel toolbar button[action=printVoucher]': {
                click: function(v) {
                    var me = this;
                    var is_valid = me.validasiPrintVoucher();
                    if (is_valid) {
                        me.printVoucher();
                    }
                }
            },
            'voucherpanel toolbar button[action=printVoucherEDC]': {
                click: function(v) {
                    var me = this;
                    me.printVoucherChooseprjpt();
                }
            },
            'voucherpanel toolbar button[action=printvoucher2]': {
                click: function(v) {
                    var me = this;
                    me.printVoucherErems();
                }
            },
            'voucherpanel toolbar button[action=printx]': {
                click: function(v) {
                    var me = this;
                    me.showPdf();
                }
            },
            'voucherpanel toolbar button[action=copyvouchern]': {
                click: function(v) {
                    var me = this;
                    me.instantWindow('FormCopyVoucher', 600, 'Copy Voucher', 'create', 'myvoucheformcopyvoucher');
                }
            },
            'voucherpanel toolbar button[action=pindahvouchern]': {
                click: function(v) {
                    var me = this;
                    me.instantWindow('FormPindahVoucher', 600, 'Pindah PT', 'create', 'myvoucheformpindahvoucher');
                }
            },
            'voucherpanel toolbar button[action=printKwitansi]': {
                click: function(menu, item) {
                    var me = this;
                    me.beforePrintKwitansi('Kwitansi');
                }
            },
            'voucherpanel toolbar button[action=printKwitansiRS]': {
                click: function(menu, item) {
                    var me = this;
                    me.beforePrintKwitansi('Kwitansi RS');
                }
            },
            'voucherpanel toolbar button[action=printKwitansiRSExc]': {
                click: function(menu, item) {
                    var me = this;
                    me.beforePrintKwitansi('Kwitansi RS Exc');
                }
            },
            //Rizal 21 Juni 2019
            'voucherpanel toolbar button[action=printKwitansiRangkap]': {
                click: function(menu, item) {
                    var me = this;
                    me.beforePrintKwitansi('Kwitansi3Rangkap');
                }
            },
            'voucherpanel toolbar button[action=printKwitansiRangkapWithQr]': {
                click: function(menu, item) {
                    var me = this;
                    me.beforePrintKwitansi('Kwitansi3RangkapWithQR');
                }
            },
            //
            'voucherpanel toolbar button[action=printKwitansiPreprinted]': {
                click: function(menu, item) {
                    var me = this;
                    me.beforePrintKwitansi('Kwitansi3RangkapPrePrinted');
                }
            },
            'voucherpanel toolbar button[action=printChequePaymentList]': {
                click: function(v) {
                    var me = this;
                    me.printChequePaymentList();
                }
            },
            'voucherpanel toolbar button[action=realization]': {
                click: function(v) {
                    var me, grid, rows;
                    me              = this;
                    grid            = me.getGrid();
                    rows            = grid.getSelectionModel().getSelection(),
                    temp            = [],
                    checkValidation = me.checkProcessVoucher('realize');
                    if (checkValidation['allowed'] == 0) {
                        me.tools.alert.warning(checkValidation['msg']);
                        return false;
                    }else{
                        for (let i = 0; i < rows.length; i++) {
                            temp.push(rows[i].data.kasbank_id);
                        }

                        grid.getStore().reload({
                            callback : function () {
                                var n_store = me.getGrid().getStore();
                                n_store.each(function (xc, idx) {
                                    if (temp.includes(xc.get('kasbank_id'))) {
                                        me.getGrid().getSelectionModel().select(idx, true);
                                    }
                                });
                                me.realizationForm(v);
                            }
                        });
                    }
                }
            },
            'voucherpanel toolbar button[action=editnokwitansi]': {
                click: function(v) {
                    var me   = this,
                        grid = me.getGrid(),
                        rows = grid.getSelectionModel().getSelection();

                    if (rows.length == 0) {
                        me.tools.alert.warning("Silahkan pilih voucher terlebih dahulu.");
                        return false;
                    }

                    me.instantWindow('FormDataK', 600, 'Edit No Kwitansi', 'update', 'myVoucherKss');
                }
            },
            'voucherpanel toolbar button[action=edittof7]': {
                click: function(v) {
                    var me = this;
                    me.browseUnitConvert(v, function() {

                    });
                }
            },
            'voucherpanel toolbar button[action=angsurandenda]': {
                click: function(v) {
                    var me = this;
                    me.browseDendaConvert(v, function() {});
                }
            },
            'voucherpanel toolbar button[action=needrevise]': {
                click: function(v) {
                    var me = this;
                    var grid = me.getGrid(),
                        rec = grid.getSelectedRecord();
                    Ext.MessageBox.confirm(
                        'Confirm', 'Anda akan melakukan proses mengembalikan voucher dept ini ke pembuat untuk di revisi, Apakah anda yakin? <br>Catatan<br>\n\
                        <textarea type="text" id="reasonrevise" name="reasonrevise"></textarea>', callbackFunctionWdenda);

                    function callbackFunctionWdenda(btn) {
                        if (btn == 'yes') {
                            Ext.Ajax.request({
                                url: 'cashier/voucher/read',
                                method: 'POST',
                                async: false,
                                params: {
                                    pt_id: rec.get("pt_pt_id"),
                                    voucher_id: rec.get("voucherdept_id"),
                                    approval_notes: Ext.get('reasonrevise').getValue(),
                                    hideparam: 'revise',
                                    mode_read: 'needrevise'
                                },
                                success: function(response) {
                                    me.tools.alert.info("Data successfully updated..");
                                    me.getGrid().getStore().reload();
                                },
                                failure: function(response) {

                                }
                            });
                        }
                    };
                }
            },
            'voucherpanel toolbar button[action=printinvoice]': {
                click: function(menu, item) {
                    var me = this;
                    me.printInvoice();
                }
            },
            'vouchergrid toolbar [name=limit]': {
                change: function(v) {
                    var me = this;
                    var store = me.getGrid().getStore();
                    if (v.value) {
                        store.getProxy().setExtraParam('limit', v.value);
                        me.loadPage(store); //Add the record to the store
                        store.totalCount = store.count(); //update the totalCount property of Store
                        store.pageSize = v.value;
                    }
                }
            },
            'vouchergrid toolbar [name=grouppanel]': {
                change: function(v) {
                    var me = this;
                    if (v.value) {
                        me.groupChange(v.value);
                    }
                }
            },
            'vouchergrid toolbar button[action=preview] menu': {
                click: function(menu, item) {
                    var me = this;
                    me.previewHandler(item.ref);
                }
            },
            'vouchergrid toolbar button[action=previewsetoran] menu': {
                click: function(menu, item) {
                    var me = this;
                    var grid = me.getGrid(),
                        rec = grid.getSelectedRecord();
                    if (grid.getSelectionModel().getCount() > 0) {
                        me.cetakslipShowWindow(menu, rec.get("kasbank_id"));
                        me.templateref = item.ref;
                    }
                }
            },
            'vouchergrid toolbar button[action=actiondraft]': {
                click: function(v) {
                    var me = this;
                    me.viewstatus('draft');
                }
            },
            'vouchergrid toolbar button[action=actionpaid]': {
                click: function(v) {
                    var me = this;
                    me.viewstatus('paid');
                }
            },
            'vouchergrid toolbar button[action=actiontemprealized]': {
                click: function(v) {
                    var me = this;
                    me.viewstatus('temprealized');
                }
            },
            'vouchergrid toolbar button[action=actionrealized]': {
                click: function(v) {
                    var me = this;
                    me.viewstatus('realized');
                }
            },
            'vouchergrid toolbar button[action=actionposted]': {
                click: function(v) {
                    var me = this;
                    me.viewstatus('posted');
                }
            },
            'vouchergrid toolbar button[action=actionall]': {
                click: function(v) {
                    var me = this;
                    me.viewstatus('all');
                }
            },
            'vouchergrid toolbar button[action=actionrequestunrealize]': {
                click: function(v) {
                    var me = this;
                    me.viewstatus('requestunrealize');
                }
            },
            'vouchergrid toolbar button[action=copytoexcel]': {
                click: function(v) {
                    var me = this;
                    me.copycell(me.getGrid(), true);
                }
            },
            'vouchergrid toolbar button[action=createothers]': {
                click: function(v) {
                    var me = this;
                    me.browseUnit(v, function() {

                    });
                }
            },
            'vouchergrid toolbar button[action=actionuploadedvoucher]': {
                click: function(v) {
                    var me = this;
                    me.viewstatus('uploadedvoucher');
                }
            },
            'vouchergrid toolbar button[action=posting]': {
                click: function(v) {
                    var me, grid, rows;
                    me              = this;
                    grid            = me.getGrid();
                    rows            = grid.getSelectionModel().getSelection(),
                    temp            = [],
                    checkValidation = me.checkProcessVoucher('posting');
                    if (checkValidation['allowed'] == 0) {
                        me.tools.alert.warning(checkValidation['msg']);
                        return false;
                    }else{
                        for (let i = 0; i < rows.length; i++) {
                            temp.push(rows[i].data.kasbank_id);
                        }

                        grid.getStore().reload({
                            callback : function () {
                                var n_store = me.getGrid().getStore();
                                n_store.each(function (xc, idx) {
                                    if (temp.includes(xc.get('kasbank_id'))) {
                                        me.getGrid().getSelectionModel().select(idx, true);
                                    }
                                });
                                me.postingData(v, v.text);
                            }
                        });
                    }
                }
            },
            'vouchergrid toolbar button[action=unposting]': {
                click: function(v) {
                    var me, grid, rows;
                    me              = this;
                    grid            = me.getGrid();
                    rows            = grid.getSelectionModel().getSelection(),
                    temp            = [],
                    checkValidation = me.checkProcessVoucher('unposting');
                    if (checkValidation['allowed'] == 0) {
                        me.tools.alert.warning(checkValidation['msg']);
                        return false;
                    }else{
                        for (let i = 0; i < rows.length; i++) {
                            temp.push(rows[i].data.kasbank_id);
                        }

                        grid.getStore().reload({
                            callback : function () {
                                var n_store = me.getGrid().getStore();
                                n_store.each(function (xc, idx) {
                                    if (temp.includes(xc.get('kasbank_id'))) {
                                        me.getGrid().getSelectionModel().select(idx, true);
                                    }
                                });
                                me.postingData(v, v.text);
                            }
                        });
                    }
                }
            },
            'vouchergrid toolbar button[action=payment]': {
                click: function(v) {
                    var me, grid, rows;
                    me              = this;
                    grid            = me.getGrid();
                    rows            = grid.getSelectionModel().getSelection(),
                    temp            = [],
                    checkValidation = me.checkProcessVoucher('payment');

                    if (checkValidation['allowed'] == 0) {
                        me.tools.alert.warning(checkValidation['msg']);
                        return false;
                    }else{
                        for (let i = 0; i < rows.length; i++) {
                            temp.push(rows[i].data.kasbank_id);
                        }

                        grid.getStore().reload({
                            callback : function () {
                                var n_store = me.getGrid().getStore();
                                n_store.each(function (xc, idx) {
                                    if (temp.includes(xc.get('kasbank_id'))) {
                                        me.getGrid().getSelectionModel().select(idx, true);
                                    }
                                });
                                me.instantWindow('FormDataPayment', 500, 'Voucher Payment', 'create', 'myvoucheformpayment');
                            }
                        });
                    }
                }
            },
            'vouchergrid toolbar button[action=resetprint]': {
                click: function(v) {
                    var me, grid, rec;
                    me = this;
                    grid = me.getGrid();
                    rec = grid.getSelectionModel().getSelection();
                    if (rec.length == 0) {
                        me.tools.alert.warning("Silahkan pilih voucher terlebih dahulu.");
                        return false;
                    }
                    if (rec.length > 1) {
                        me.tools.alert.warning("Pilih maksimal 1 voucher.");
                        return false;
                    }
                    me.resetPrint();
                }
            },
            'vouchergrid toolbar button[action=requestunrealization]': {
                click: function(v) {
                    var me, grid, rows;
                    me              = this;
                    grid            = me.getGrid();
                    rows            = grid.getSelectionModel().getSelection(),
                    temp            = [],
                    checkValidation = me.checkProcessVoucher('requestunrealize');
                    if (checkValidation['allowed'] == 0) {
                        me.tools.alert.warning(checkValidation['msg']);
                        return false;
                    }else{
                        for (let i = 0; i < rows.length; i++) {
                            temp.push(rows[i].data.kasbank_id);
                        }

                        grid.getStore().reload({
                            callback : function () {
                                var n_store = me.getGrid().getStore();
                                n_store.each(function (xc, idx) {
                                    if (temp.includes(xc.get('kasbank_id'))) {
                                        me.getGrid().getSelectionModel().select(idx, true);
                                    }
                                });
                                me.requestunrealization();
                            }
                        });
                    }
                }
            },
            'vouchergrid toolbar button[action=resetprintkwitansi]': {
                click: function(v) {
                    var me, grid, rec;
                    me = this;
                    grid = me.getGrid();
                    rec = grid.getSelectionModel().getSelection();
                    if (rec.length == 0) {
                        me.tools.alert.warning("Silahkan pilih voucher terlebih dahulu.");
                        return false;
                    }
                    if (rec.length > 1) {
                        me.tools.alert.warning("Pilih maksimal 1 voucher.");
                        return false;
                    }
                    me.resetPrintKwitansi();
                }
            },
            'voucherformchooseprjpt': {
                afterrender: function(e) {
                    var me = this;
                    var f = me.getFormdatachooseprjpt();
                    var grid = me.getGrid(),
                        rec = grid.getSelectedRecord();

                    var p = me.getPanel();
                    me.getCustomRequestCombobox('detailproject', '', '', '', 'project_project_id', 'multiproject', ['user', 'project'], f, '', function() {}, '', true);
                    me.getCustomRequestCombobox('detailpt', '', '', '', 'pt_pt_id', 'pt', '', f, '', function() {
                        f.loadRecord(rec);
                    }, '', true);
                    p.setLoading("Please wait");
                    setTimeout(
                        function() {
                            f.loadRecord(rec);
                            p.setLoading(false);
                        }, 2000);

                },
            },
            'voucherformchooseprjpt [name=project_project_id]': {
                change: function(v) {
                    var f = me.getFormdatachooseprjpt();
                    var grid = me.getGrid(),
                        rec = grid.getSelectedRecord();
                    if (v.value) {
                        f.down("[name=pt_pt_id]").setValue('');
                        var pt = f.down("[name=pt_pt_id]").getStore();
                        pt.clearFilter();
                        pt.filter('project_project_id', v.value, true, false);
                        if (rec.get("project_project_id") == v.value) {
                            f.down("[name=pt_pt_id]").setValue(rec.get("pt_pt_id"));
                        }
                    }
                }
            },
            'voucherformchooseprjpt [action=printchooseprjpt]': {
                click: function(v) {
                    var f = me.getFormdatachooseprjpt();
                    var grid = me.getGrid(),
                        rec = grid.getSelectedRecord();
                    me.projectprint = f.down("[name=project_project_id]").getValue();
                    me.ptprint = f.down("[name=pt_pt_id]").getValue();
                    f.down("[name=project_project_id]").getStore().each(function(rec2) {
                        if (rec2.get("project_project_id") == f.down("[name=project_project_id]").getValue()) {
                            me.projectprintname = rec2.get("project_name");
                        }
                    });
                    f.down("[name=pt_pt_id]").getStore().each(function(rec) {
                        if (rec.get("pt_id") == f.down("[name=pt_pt_id]").getValue()) {
                            me.ptprintname = rec.get("name");
                        }
                    });
                    me.tipenotevoucher = f.down("[name=notevoucher]").getValue();
                    Ext.Ajax.request({
                        url: 'cashier/voucher/read',
                        method: 'POST',
                        async: false,
                        params: {
                            project_id: me.project_id,
                            pt_id: me.pt_id,
                            dataflow: rec.get('dataflow'),
                            mode_read: 'checktemplatevoucher'
                        },
                        success: function(response) {
                            var data = Ext.JSON.decode(response.responseText);

                            if (data.data['template'] != '') {
                                me.reportFileNamevcr = data.data['template'];
                                me.mainPrint();
                            } else {
                                if (rec.get('dataflow') === 'O') {
                                    me.reportFileNamevcr = "Voucher";
                                } else {
                                    me.reportFileNamevcr = "VoucherIn";
                                }
                                me.mainPrint();
                            }

                        },
                        failure: function(response) {

                        }
                    });
                }
            },
            'voucherformnewsub': {
                afterrender: function(e) {
                    me.fdarnewsub();
                },
                boxready: function() {
                    var me = this;
                }
            },
            'voucherformwriteoffdenda ': {
                afterrender: function(e) {
                    me.fdarwriteoffdenda();
                },
                boxready: function() {
                    var me = this;
                }
            },
            'voucherformwriteoffdenda [name=wd_amount_writeoff] ': {
                change: function(e) {
                    var me = this;
                    var f = me.getFormdatawriteoffdenda();
                    var remaining = parseFloat(accounting.unformat(f.down("[name=wd_remaining_denda]").getValue()));
                    var amount_writeoff = parseFloat(accounting.unformat(f.down("[name=wd_amount_writeoff]").getValue()));
                    f.down("[name=wd_afterwriteoff_denda]").setValue(accounting.formatMoney(parseFloat(remaining) - parseFloat(amount_writeoff)));
                },
            },
            'voucherformwriteoffdenda button[action=save]': {
                click: function(e) {
                    var me = this;
                    var f = me.getFormdatawriteoffdenda();
                    var remaining = parseFloat(accounting.unformat(f.down("[name=wd_remaining_denda]").getValue()));
                    var amount_writeoff = parseFloat(accounting.unformat(f.down("[name=wd_amount_writeoff]").getValue()));
                    var notes = f.down("[name=wd_description]").getValue();

                    if (amount_writeoff > remaining) {
                        me.tools.alert.warning("Writeoff amount lebih besar dari Remaining Denda");
                        return false;
                    }
                    if (amount_writeoff == '' || amount_writeoff == 0) {
                        me.tools.alert.warning("Silahkan isi kolom writeoff amount.");
                        return false;
                    }
                    if (notes == '') {
                        me.tools.alert.warning("Silahkan isi notes.");
                        return false;
                    }
                    Ext.MessageBox.confirm(
                        'Confirm', 'Anda akan melakukan write off denda sebesar ' + accounting.formatMoney(amount_writeoff) + ', Apakah anda yakin?', callbackFunctionWdenda);

                    function callbackFunctionWdenda(btn) {
                        if (btn == 'yes') {
                            Ext.Ajax.request({
                                url: 'cashier/voucher/read',
                                method: 'POST',
                                async: false,
                                params: {
                                    notes: f.down("[name=wd_description]").getValue(),
                                    schedule_id: f.down("[name=wd_schedule_id]").getValue(),
                                    purchaseletter_id: f.down("[name=wd_purchaseletter_id]").getValue(),
                                    amount: amount_writeoff,
                                    mode_read: 'writeoffdenda'
                                },
                                success: function(response) {
                                    me.tools.alert.info("Data successfully updated..");
                                    var gridar = me.getAngsurangrid();
                                    gridar.getStore().load();
                                    f.up("window").close();
                                },
                                failure: function(response) {

                                }
                            });
                        }
                    };
                }
            },
            'voucherformestimasidenda ': {
                afterrender: function(e) {
                    me.fdarestimasidenda();
                },
                boxready: function() {
                    var me = this;
                    $("#ed_amount_payment input[name='ed_amount_payment']").keyup(function() {
                        var fd = me.getFormdataestimasidenda();
                        me._formatCurrency(fd.down('[name=ed_amount_payment]'));
                    });
                }
            },
            'voucherformestimasidenda button[action=save]': {
                click: function(e) {
                    var me = this;
                    var f = me.getFormdataestimasidenda();
                    var realization_date = moment(f.down("[name=ed_realization_date]").getValue()).format("YYYY-MM-DD");
                    var amount_payment = parseFloat(accounting.unformat(f.down("[name=ed_estimasi_payment]").getValue()));
                    var estimasi_payment = parseFloat(accounting.unformat(f.down("[name=ed_estimasi_payment]").getValue()));

                    var grid = me.getAngsurangrid(),
                        rec = grid.getSelectedRecord();
                    if (rec.get("project_subholding_id") == 1) {
                        amount_payment = parseFloat(accounting.unformat(f.down("[name=ed_amount_payment]").getValue()));
                    }
                    if (f.down("[name=ed_realization_date]").getValue() == null || f.down("[name=ed_realization_date]").getValue() == undefined) {
                        me.tools.alert.warning("Silahkan isi estimasi tanggal realisasi");
                        return false;
                    }

                    Ext.Ajax.request({
                        url: 'cashier/voucher/read',
                        method: 'POST',
                        async: false,
                        params: {
                            unit_id: f.down("[name=ed_unit_id]").getValue(),
                            schedule_id: f.down("[name=ed_schedule_id]").getValue(),
                            realization_date: realization_date,
                            amount_payment: amount_payment,
                            mode_read: 'getestimasidenda'
                        },
                        success: function(response) {
                            var data = Ext.JSON.decode(response.responseText);
                            f.down("[name=ed_toleransi_denda]").setValue(accounting.formatMoney(data.data['toleransi_denda']));
                            f.down("[name=ed_current_denda]").setValue(accounting.formatMoney(data.data['current_denda']));
                            f.down("[name=ed_denda]").setValue(accounting.formatMoney(data.data['denda']));
                            f.down("[name=ed_total_denda]").setValue(accounting.formatMoney(data.data['total_denda']));
                            f.down("[name=ed_angsuran_min_denda]").setValue(accounting.formatMoney(estimasi_payment - data.data['total_denda']));
                        },
                        failure: function(response) {

                        }
                    });
                }
            },
            'voucherangsurangrid button[action=estimasidenda]': {
                click: function(v) {
                    var me = this;
                    me.instantWindow('FormDataEstimasiDenda', 600, 'Estimasi Denda', 'create', 'myvoucheformestimasidenda');
                }
            },
            'voucherangsurangrid button[action=writeoffdenda]': {
                click: function(v) {
                    var me = this;
                    me.instantWindow('FormDataWriteoffDenda', 600, 'Writeoff Denda', 'create', 'myvoucheformwriteoffdenda');
                }
            },
            '#MySuperBrowseWindow #cqdataflow': {
                change: function(v) {
                    var dataflow = Ext.getCmp('cqdataflow').getValue();
                    if (dataflow == 'IN') {
                        Ext.getCmp('idcreatechequein').setVisible(true);
                        Ext.getCmp('idcreatechequeout').setVisible(false);
                        Ext.getCmp('formdatavoucherprefix_voucherprefix_id442').setVisible(false);
                        Ext.getCmp('formdatavoucherprefix_voucherprefix_id442').setValue('');
                        Ext.getCmp('banknamechequeid').setVisible(true);
                    } else {
                        Ext.getCmp('idcreatechequein').setVisible(false);
                        Ext.getCmp('banknamechequeid').setVisible(false);
                        Ext.getCmp('banknamechequeid').setValue('');
                        Ext.getCmp('formdatavoucherprefix_voucherprefix_id442').setVisible(true);
                        Ext.getCmp('idcreatechequeout').setVisible(true);
                    }
                }
            },
            '#MySuperBrowseWindow #ptArId': {
                change: function(v) {
                    if (me.getFormdata()) {

                        var f = me.getFormdata();
                        var type = f.down("[name=datatype]").getValue();
                        if (type == 2) {
                            var cluster = Ext.getCmp('clusterId').getStore();
                            cluster.clearFilter();
                            cluster.filter('pt_id', v.value, true, false);
                        }
                    } else {
                        var cluster = Ext.getCmp('clusterId').getStore();
                        cluster.clearFilter();
                        cluster.filter('pt_id', v.value, true, false);
                    }
                }
            },
            '#MySuperBrowseWindow #ptArIdangsuran': {
                change: function(v) {
                    var cluster = Ext.getCmp('clusterId').getStore();
                    if (me.bukaform > 0) {
                        var gridar = me.getAngsurangrid();
                        var storear = gridar.getStore();
                        var f = me.getFormdata();
                        var state = f.up("window").state;
                        var ps = f.rowData;
                        if (ps.get('cluster_id') != '') {
                            cluster.filter('cluster_id', ps.get('cluster_id'), true, false);
                            Ext.getCmp('clusterId').setValue(ps.get('cluster_id'));
                            var fields = Ext.getCmp('MySuperBrowseWindow').getForm().getFieldValues();
                            for (var x in fields) {
                                storear.getProxy().setExtraParam(x, fields[x]);
                            }
                            storear.loadPage(1);
                        }
                    } else {
                        cluster.clearFilter();
                        cluster.filter('pt_id', v.value, true, false);
                    }
                }
            },
            '#MySuperBrowseWindow #fs_subcode_browse': {
                boxready: function() {
                    var me = this;
                    $("#fs_subcode_browse input[name='code']").keyup(function(e) {
                        if (e.which == 13) {
                            var gc = me.getSubcodegrid();
                            var storear = gc.getStore();
                            var fields = Ext.getCmp('MySuperBrowseWindow').getForm().getFieldValues();
                            for (var x in fields) {
                                storear.getProxy().setExtraParam(x, fields[x]);
                            }
                            storear.load({
                                callback: function(records, options, success) {
                                    gc.down("pagingtoolbar").doRefresh();
                                }
                            });
                        }
                    });
                    return false;
                }
            },
            '#MySuperBrowseWindow #fs_subcode_desc': {
                boxready: function() {
                    var me = this;
                    $("#fs_subcode_desc input[name='description']").keyup(function(e) {
                        if (e.which == 13) {
                            var gc = me.getSubcodegrid();
                            var storear = gc.getStore();
                            var fields = Ext.getCmp('MySuperBrowseWindow').getForm().getFieldValues();
                            for (var x in fields) {
                                storear.getProxy().setExtraParam(x, fields[x]);
                            }
                            storear.load({
                                callback: function(records, options, success) {
                                    gc.down("pagingtoolbar").doRefresh();
                                }
                            });
                        }
                    });
                    return false;
                }
            },
            '#MySuperBrowseWindow #unitNumberId': {
                boxready: function() {
                    var me = this;
                    $("#unitNumberId input[name='unit_number']").keyup(function(e) {
                        if (e.which == 13) {
                            var grid;
                            if (me.getAngsurangrid()) {
                                grid = me.getAngsurangrid();
                            } else {
                                grid = me.getEscrowgrid();
                            }
                            var store = grid.getStore();
                            var fields = Ext.getCmp('MySuperBrowseWindow').getForm().getFieldValues();
                            for (var x in fields) {
                                store.getProxy().setExtraParam(x, fields[x]);
                            }
                            store.load({
                                callback: function(records, options, success) {
                                    grid.down("pagingtoolbar").doRefresh();
                                }
                            });

                        }
                    });
                    return false;
                }
            },
            'voucherangsurangrid button[action=select]': {
                click: function(v) {
                    var me = this;
                    var grid = me.getAngsurangrid();
                    var rec = grid.getSelectedRecord();
                    var currentDate = Ext.Date.format(new Date(), 'Y-m-d');
                    var notifduedatesh1 = '';

                    var row = grid.getSelectionModel().getSelection();
                    var totalpick = 0;
                    // CHECK APAKAH SUDAH DIBLOKIR ATAU BELUM
                    var checkblockunit = me.checkblockunit(rec.get('unit_unit_id'));
                    if (checkblockunit.result == 1) {
                        Ext.Msg.alert('warning', checkblockunit.msg);
                        return false;
                    }
                    Ext.each(row, function(rec2) {
                        totalpick = totalpick + 1;
                        notifduedatesh1 = '';
                        if (rec2.get("purchaseletter_isnonppn") > 0 && rec2.get("paymenttype_paymenttype_id") != 2) {
                            notifduedatesh1 = notifduedatesh1 + ' Unit ini mendapatkan program insentif PPN DTP. ';
                        }
                        if (rec.get("scheduletype_scheduletype") != "KPR" && rec.get("payment_paymentflag_id") == "1") {
                            if (rec2.get('project_subholding_id') == 1 && currentDate > Ext.Date.format(rec2.get('duedate'), 'Y-m-d')) {
                                notifduedatesh1 = notifduedatesh1 + "Tanggal hari ini melebihi due date pada salah satu schedule yang Anda pilih. Pastikan anda telah cek estimasi Denda. <br>";
                            }
                        }
                    });
                    if (rec.get("scheduletype_scheduletype") != "KPR" && rec.get("payment_paymentflag_id") == "1") {
                        if (totalpick < 60) {
                            me.tools.ajax({
                                params: {
                                    module: me.controllerName,
                                    unit_id: rec.get("unit_unit_id")
                                },
                                success: function(data, model) {
                                    try {
                                        if (parseFloat(data.result) > 0) {
                                            //Rizal 7 Oktober 2019 Request SH 1 untuk mendahulukan bayar denda
                                            Ext.Ajax.request({
                                                url: 'cashier/voucher/read',
                                                method: 'POST',
                                                async: false,
                                                params: {
                                                    column: 'denda',
                                                    project_id: rec.get("project_project_id"),
                                                    pt_id: rec.get("pt_pt_id"),
                                                    mode_read: 'getmandatoryfield'
                                                },
                                                success: function(response) {
                                                    var dataxx = Ext.JSON.decode(response.responseText);
                                                    var is_mandatory = dataxx.data['is_mandatory'];
                                                    if (is_mandatory > 0) {
                                                        Ext.MessageBox.confirm(
                                                            'Confirm', notifduedatesh1 + 'Anda akan membayar angsuran dan ada denda yang harus dibayar sebesar Rp ' + accounting.formatMoney(data.result) + ', apakah anda yakin?', callbackFunctiondenda);

                                                        function callbackFunctiondenda(btn) {
                                                            if (btn == 'yes') {
                                                                me.scheduleSelect(v, grid.store.proxy.extraParams['tipeangsuran']);
                                                            }
                                                        };
                                                    } else {
                                                        if (notifduedatesh1 != '') {
                                                            Ext.MessageBox.confirm(
                                                                'Confirm', notifduedatesh1 + ', Lanjutkan?', callbackFunctiondenda);

                                                            function callbackFunctiondenda(btn) {
                                                                if (btn == 'yes') {
                                                                    me.scheduleSelect(v, grid.store.proxy.extraParams['tipeangsuran']);
                                                                }
                                                            };

                                                        } else {
                                                            me.scheduleSelect(v, grid.store.proxy.extraParams['tipeangsuran']);
                                                        }
                                                    }
                                                },
                                                failure: function(response) {

                                                }
                                            });
                                        } else {
                                            if (notifduedatesh1 != '') {
                                                Ext.MessageBox.confirm(
                                                    'Confirm', notifduedatesh1 + ', Lanjutkan?', callbackFunctiondenda);

                                                function callbackFunctiondenda(btn) {
                                                    if (btn == 'yes') {
                                                        me.scheduleSelect(v, grid.store.proxy.extraParams['tipeangsuran']);
                                                    }
                                                };

                                            } else {
                                                me.scheduleSelect(v, grid.store.proxy.extraParams['tipeangsuran']);
                                            }
                                        }
                                    } catch (err) {
                                        console.log(err.message);
                                        me.tools.alert.warning("Failed to check unit.");
                                    }
                                }
                            }).read('checkdenda');
                        } else {
                            me.scheduleSelect(v, grid.store.proxy.extraParams['tipeangsuran']);
                        }
                    } else {

                        if (notifduedatesh1 != '') {
                            Ext.MessageBox.confirm(
                                'Confirm', notifduedatesh1 + ', Lanjutkan?', callbackFunctiondenda);

                            function callbackFunctiondenda(btn) {
                                if (btn == 'yes') {
                                    me.scheduleSelect(v, grid.store.proxy.extraParams['tipeangsuran']);
                                }
                            };

                        } else {
                            me.scheduleSelect(v, grid.store.proxy.extraParams['tipeangsuran']);
                        }
                    }
                }
            },
            'voucherangsurangrid ': {
                selectionchange: function() {
                    me.voucherAr.gridSelectionChangeAngsuranGrid(me);
                },
                itemdblclick: function(v, rec) {
                    var me = this;
                    var grid = me.getAngsurangrid();
                    if (parseFloat(rec.get("oppaid")) > 0) {
                        // CHECK APAKAH SUDAH DIBLOKIR ATAU BELUM
                        var checkblockunit = me.checkblockunit(rec.get('unit_unit_id'));
                        if (checkblockunit.result == 1) {
                            Ext.Msg.alert('warning', checkblockunit.msg);
                            return false;
                        }
                        me.scheduleSelect(v, grid.store.proxy.extraParams['tipeangsuran']);
                    } else {
                        return false;
                    }

                }
            },
            'vouchercustomergrid ': {
                selectionchange: function() {
                    me.gridSelectionChangeCustomerGrid(me);
                },
                itemdblclick: function(v) {
                    var me = this;
                    me.customerSelect(v);
                }
            },
            'vouchercustomergrid button[action=select]': {
                click: function(v) {
                    var me = this;
                    me.customerSelect(v);
                }
            },
            'vouchertenantgrid ': {
                selectionchange: function() {
                    me.gridSelectionChangeTenantGrid(me);
                },
                itemdblclick: function(v) {
                    var me = this;
                    me.tenantSelect(v);
                }
            },
            'vouchertenantgrid button[action=select]': {
                click: function(v) {
                    var me = this;
                    me.tenantSelect(v);
                }
            },
            'vouchersuppliergrid ': {
                selectionchange: function() {
                    me.gridSelectionChangeVendorGrid(me);
                },
                itemdblclick: function(v) {
                    var me = this;
                    me.vendorSelect(v);
                }
            },
            'vouchersuppliergrid button[action=select]': {
                click: function(v) {
                    var me = this;
                    me.vendorSelect(v);
                }
            },
            'vouchersuppliergrid button[action=create]': {
                click: function(v) {
                    var me = this;
                    me.instantWindow('FormDataVendor', 600, 'Add Supplier ', 'create', 'myVoucherVendorWindow');
                }
            },
            'vouchertenantgrid button[action=create]': {
                click: function(v) {
                    var me = this;
                    me.instantWindow('FormDataVendor', 600, 'Add Supplier ', 'create', 'myVoucherVendorWindow');
                }
            },
            'voucherformdata [name=panel]': {
                tabchange: function(tabPanel, tab) {
                    me.voucherDetail.resetDetailCoa(me, tab);
                    if (tab.name == "voucherardetail") {
                        if (me.is_erems == "1") {
                            me.voucherAr.loadModelAr(me);
                        }
                    } else if (tab.name == "voucherescrowdetail") {
                        if (me.is_erems == "1") {
                            me.voucherAr.loadModelEscrow(me);
                        }
                    } else if (tab.name == "voucherotherpayment") {
                        if (me.is_erems == "1") {
                            me.loadModelOtherPayment();
                        }
                    } else {}
                }
            },
            'voucherformdata [name=vendor_bankacc_id]': {
                change: function(v) {
                    var f = me.getFormdata();
                    if (v.value) {
                        var x = f.down("[name=vendor_bankacc_id]").getStore().findRecord("vendor_bankacc_id", v.value, 0, false, true, true);
                        f.down("[name=vendor_bank_name]").setValue(x.data['bank_name']);
                        f.down("[name=vendor_bank_account_name]").setValue(x.data['bank_account_name']);
                        f.down("[name=vendor_bank_currency]").setValue(x.data['currency_name']);
                        f.down("[name=remarks]").setValue(x.data['remarks']);
                    }
                }
            },
            'voucherformdata [action=cancel]': {
                click: function() {
                    var me = this;
                    me.cancelFormdata();
                }
            },
            'voucherformdata [name=cheque_cheque_id]': {
                change: function(val) { //se
                    var me = this;
                    if (val.value) {
                        var f = me.getFormdata();
                        var dataflow = f.down('[name=dataflow]').getValue();
                        me.getChequeInfo(val.value, f, true, function() {

                        }, dataflow);
                    }
                }
            },
            'voucherformdata [action=savenew]': {
                click: function() {
                    var me = this;
                    me.mainDataSave(function() {
                        me.openFormData();
                    });
                }
            },
            'voucherformdata [action=saveprint]': {
                click: function() {
                    var me = this;
                    me.mainDataSave(function() {
                        if (me.paymentflag_id === 1) {
                            var grid = me.getGrid();
                            var kid;
                            if (me.saved_id) {
                                kid = me.saved_id;
                            } else {
                                kid = me.kasbank_id;
                            }

                            setTimeout(function() {
                                var rec = grid.getStore().findRecord('kasbank_id', kid, 0, false, true, true);
                                grid.getSelectionModel().select(rec);
                                me.printKwitansi('Kwitansi');
                            }, 1100);
                        } else {
                            me.printVoucherAfterSave(me.dataflow);
                        }
                    });
                }
            },
            'voucherformdata [action=browsevoucher]': {
                click: me.selectVoucher
            },
            'voucherformdata [action=browseprojectloan]': {
                click: me.selectKasbon
            },
            'voucherformdata [name=payment_paymentmethod_id]': {
                change: function(val) {
                    var me = this;
                    if (val.value) {
                        me.voucherDetail.changePayment(me, val.value);
                    }
                }
            },
            'voucherformdata [name=payment_date]': {
                select: function(val) {
                    var me = this;
                    if (val.value) {
                        me.voucherAr.getTotalSumAr(me);
                    }
                }
            },
            'voucherformdata [name=kwitansi_date]': {
                select: function(val) {
                    var me = this;
                    if (val.value) {
                        me.voucherAr.getTotalSumAr(me);
                    }
                }
            },
            'voucherformdata [name=kasbank_date]': {
                change: function(val) {
                    var me = this;
                    var state = val.up('window').state;
                    if (state == "create") {
                        if (val.value) {

                        }
                    }
                }
            },
            'voucherformdata [name=pt_pt_id]': {
                change: function(val) {
                    var me = this;
                    var state = val.up('window').state;
                    var f = me.getFormdata();
                    var fs = me.getFormsearch();
                    if (f.down("[name=project_project_id]").getValue() != "" && f.down("[name=project_project_id]").getValue() != null) {
                        me.project_id = f.down("[name=project_project_id]").getValue();
                    } else {
                        me.project_id = fs.down("[name=project_id]").getValue();
                    }

                    f.down("[name=kasbank_reff_voucher_id]").setVisible(false);
                    f.down('[action=browsereffvcr]').setVisible(false);
                    f.down('[action=deletelink]').setVisible(false);

                    // check access link voucher
                    Ext.Ajax.request({
                        url: 'cashier/common/create',
                        type: 'POST',
                        params: {
                            data: Ext.encode({
                                "hideparam": 'global_paramV2', //sesuai global param
                                "globalname": 'LINK_VOUCHER_ALL',
                                "project_id": me.project_id,
                                "pt_id": val.value
                            }),
                            "hideparam": 'global_paramV2'
                        },
                        success: function(response) {
                            try {
                                var res = Ext.decode(response.responseText);
                                var data = res.data;

                                if (data.value !== undefined) {
                                    if (data.value == 1) {
                                        f.down("[name=kasbank_reff_voucher_id]").setVisible(true);
                                        f.down('[action=browsereffvcr]').setVisible(true);
                                        f.down('[action=deletelink]').setVisible(true);
                                    }
                                }
                            } catch (err) {
                                console.log(err);
                            }
                        }
                    })


                    if (state == "create" && val.value) {
                        me.tambahPTdesc();
                        if (val.value) {
                            me.ptId = val.value;
                            me.pt_id = val.value;
                            if (me.is_posting) {
                                me.voucherDetail.getVoucherId(me, f.down("[name=realization_date]").getValue(), state, val.value, function() {
                                    f.down('[name=department_department_id]').setValue('');
                                    me.getCustomRequestCombobox('getprojectfilterbypt', val.value, '', '', 'project_project_id', 'multiproject', ['user', 'project'], f, '', function() {
                                        f.down('[name=project_project_id]').setValue('');
                                        if (f.down('[name=pt_pt_id]').getValue() == me.pt_id) {
                                            f.down("[name=project_project_id]").setValue(me.project_id);
                                        }
                                        if (me.project_f) {
                                            f.down('[name=project_project_id]').setValue(me.project_f);
                                        }
                                        me.getCustomRequestCombobox('detaildeptbypt', val.value, me.project_id, '', 'department_department_id', 'department', '', f, '', function() {
                                            me.getKasbank(function() {
                                                me.getDeptbyPt(val.value, function() {
                                                    var g = me.getDetailvouchergrid();
                                                    if (me.clearDetailVoucher !== false) {
                                                        g.getStore().loadData([], false);
                                                    }
                                                    f.setLoading(false);
                                                    f.down("[name=department_department_id]").setValue(me.department_id);
                                                });
                                                me.voucherDetail.disableSave(me, false);
                                            }, true);
                                        }, true);
                                    }, true);
                                }, true);
                            } else {
                                f.down('[name=voucherID]').setValue('VC000000000');
                                f.down('[name=department_department_id]').setValue('');
                                me.getCustomRequestCombobox('getprojectfilterbypt', val.value, '', '', 'project_project_id', 'multiproject', ['user', 'project'], f, '', function() {
                                    console.log(me.project_id);
                                    console.log(me.project_f);
                                    f.down('[name=project_project_id]').setValue('');
                                    if (f.down('[name=pt_pt_id]').getValue() == me.pt_id) {
                                        f.down("[name=project_project_id]").setValue(me.project_id);
                                    }
                                    if (me.project_f) {
                                        f.down('[name=project_project_id]').setValue(me.project_f);
                                    }
                                    if (me.special_case_project_id.includes(me.project_f)) {
                                        f.down("[name=project_project_id]").setValue(me.project_id);
                                    }
                                    me.getCustomRequestCombobox('detaildeptbypt', val.value, me.project_id, '', 'department_department_id', 'department', '', f, '', function() {
                                        me.getKasbank(function() {
                                            me.getDeptbyPt(val.value, function() {
                                                var g = me.getDetailvouchergrid();
                                                if (me.clearDetailVoucher !== false) {
                                                    g.getStore().loadData([], false);
                                                }
                                                f.setLoading(false);
                                                f.down("[name=department_department_id]").setValue(me.department_id);
                                                var ispymnt = f.rowData;
                                                var deptstore = f.down("[name=department_department_id]").getStore();
                                                deptstore.each(function(recx, idx) {
                                                    var deptname = recx.get("name");
                                                    if (ispymnt != null && deptname != null) {
                                                        if (deptname.toLowerCase().includes("finance")) {
                                                            f.down("[name=department_department_id]").setValue(recx.get("department_id"));
                                                        }
                                                    }
                                                });
                                            });
                                            me.voucherDetail.disableSave(me, false);
                                        }, true);
                                    }, true);
                                }, true);
                            }
                            me.autoduedate();
                        }
                    }
                    if (val.value) {
                        me.getCoaAR(val);
                    }
                    me.usemasterreceipt();
                    me.checkMandatory();
                }
            },
            'voucherformdata [name=project_project_id]': {
                change: function(val) {
                    var me = this;
                    var state = val.up('window').state;
                    var f = me.getFormdata();
                    if (val.value) {
                        me.projectId = val.value;
                        me.checkMandatory();
                        me.usemasterreceipt();
                    }
                }
            },
            'voucherformdata [name=dataflow]': {
                change: function(val) {
                    var me = this;
                    var f = me.getFormdata();
                    if (val.value) {
                        me.changeFlow(val);
                        me.tambahPTdesc();
                        me.getKasbank(function() {
                            var f = me.getFormdata();
                            if (f) {
                                f.setLoading(false);
                            }
                        });
                    }
                }
            },
            'voucherformdata [name=datatype]': {
                change: function(val) {
                    var me = this;
                    if (val.value) {
                        me.changeDataType(val);
                    }
                }
            },
            'voucherformdata [action=browseCheque]': {
                click: function(val) {
                    var me = this;
                    me.cheque_formdata = me.getFormdata();
                    var f = me.getFormdata();
                    me.chequeShowWindow(val, f.down("[name=project_project_id]").getValue(), f.down("[name=pt_pt_id]").getValue(), function() {
                        if (me.dataflow === "IN") {
                        } else {
                        }
                    });
                }
            },
            'voucherformdata [action=browseData]': {
                click: function(val) {
                    var me = this;
                    me.browseData(val, function() {

                    });
                }
            },
            'voucherformdata checkboxfield[name=autogeneratefaktur]': {
                change: function(val) {
                    var me = this;
                    me.voucherDetail.autogeneratevoucher(me, val);
                }
            },
            'voucherformdata [xtype=combobox]': {
                blur: function(val) {
                    var me = this;
                    if (!val.value) {
                        me.checkCombobox(val);
                    }
                }
            },
            'detailvouchergrid toolbar [action=generatetax]': {
                click: function() {
                    //Rizal 31 Okt 2019
                    var f = me.getFormdata();
                    var state = f.up("window").state;
                    var storeaj = me.getDetailvouchergrid().getStore();
                    var pajak = [];
                    var j = storeaj.getCount() - 1;
                    var tempstoresub = me.localStore.subdetailcoa;
                    var idparam = (f.down("[name=vendor_vendor_id]").getValue() == "" || f.down("[name=vendor_vendor_id]").getValue() == 0 ? f.down("[name=purchaseletter_customer_id]").getValue() : f.down("[name=vendor_vendor_id]").getValue());
                    var is_vendor = (f.down("[name=vendor_vendor_id]").getValue() == "" || f.down("[name=vendor_vendor_id]").getValue() == 0 ? 0 : 1);
                    var is_customer = (f.down("[name=vendor_vendor_id]").getValue() == "" || f.down("[name=vendor_vendor_id]").getValue() == 0 ? 1 : 0);
                    var param = 'customer_vendor_name';
                    for (j; j >= 0; j--) {
                        var pph_id = storeaj.getAt(j).get('pph_tipepajakdetail_id').split('-');
                        if (storeaj.getAt(j).get('ppn_tipepajakdetail_id') != "") {

                            var data = {};
                            data.tipepajakdetailid = storeaj.getAt(j).get('ppn_tipepajakdetail_id');
                            data.amount = (storeaj.getAt(j).get('ppn_percentage') * storeaj.getAt(j).get('amount') / 100);
                            data.isppn = 1;
                            data.ispph = 0;
                            pajak.push(data);
                        }
                        if (pph_id[0] != "" && pph_id[0] > 0) {
                            var datapph = {};
                            datapph.tipepajakdetailid = pph_id[0];
                            datapph.amount = (storeaj.getAt(j).get('pph_percentage') * storeaj.getAt(j).get('amount') / 100);
                            datapph.isppn = 0;
                            datapph.ispph = 1;
                            pajak.push(datapph);
                        }
                        if (storeaj.getAt(j).get('is_ppn') > 0 || storeaj.getAt(j).get('is_pph') > 0) {

                            var id = storeaj.getAt(j).get('voucherdetail_id');
                            if (id) {
                                f.deletedRows.push(id);
                            } else {
                                f.deletedRowsWithoutID = f.deletedRowsWithoutID + 1;
                            }
                            tempstoresub.removeAt(tempstoresub.find('voucherdetail_indexdata', storeaj.getAt(j).get('indexdata')));
                            storeaj.removeAt(j);
                        }
                    }
                    var result = [];
                    pajak.reduce(function(res, value) {
                        if (!res[value.tipepajakdetailid]) {
                            res[value.tipepajakdetailid] = { tipepajakdetailid: value.tipepajakdetailid, amount: 0, isppn: value.isppn, ispph: value.ispph };
                            result.push(res[value.tipepajakdetailid])
                        }
                        res[value.tipepajakdetailid].amount += value.amount;
                        return res;
                    }, {});
                    jQuery.each(result, function(i, val) {
                        if (val['isppn'] > 0) {
                            me.tools.ajax({
                                params: {
                                    template_id: val['tipepajakdetailid'],
                                    indexdata: me.getindexdetailcoax() + i,
                                    amount: val['amount'],
                                    pt_id: f.down("[name=pt_pt_id]").getValue(),
                                    project_id: f.down("[name=project_project_id]").getValue(),
                                    remarks: f.down("[name=description]").getValue(),
                                    is_ppn: 1,
                                    is_pph: 0,
                                },
                                form: f,
                                success: function(data, model) {
                                    try {
                                        data.forEach(function(v) {
                                            var description_sub = '';
                                            if (v['kelsub']['kelsub_id'] > 0) {

                                                if (f.down("[name=unit_unit_id]").getValue() != '' && f.down("[name=unit_unit_id]").getValue() > 0 && (v['kelsub']['kelsub_id'] == 'B' || v['kelsub']['kelsub_id'] == 'ST' || v['kelsub']['kelsub_id'] == 'SC')) {
                                                    idparam = f.down("[name=unit_unit_id]").getValue();
                                                    param = 'unit_id';
                                                } else {
                                                    idparam = f.down("[name=customer_name]").getValue();
                                                    param = 'customer_vendor_name';
                                                }
                                                //                                                if(idparam!=''){
                                                me.voucherDetail.getSubglv2(me, idparam, param, function() {
                                                    tempstoresub.removeAt(tempstoresub.find('voucherdetail_indexdata', v['voucherdetail']['indexdata']));
                                                    tempstoresub.add({
                                                        indexsubdata: v['voucherdetail']['indexdata'],
                                                        remarks: v['voucherdetail']['remarks'],
                                                        amount: v['voucherdetail']['amount'],
                                                        subgl_subgl_id: me.subgl[0].subgl_subgl_id,
                                                        subgl_code: me.subgl[0].subgl_code,
                                                        subgl_code1: me.subgl[0].subgl_code1,
                                                        subgl_code2: me.subgl[0].subgl_code2,
                                                        subgl_code3: me.subgl[0].subgl_code3,
                                                        subgl_code4: me.subgl[0].subgl_code4,
                                                        voucherdetail_voucherdetail_id: '',
                                                        voucherdetail_indexdata: v['voucherdetail']['indexdata'],
                                                        kelsub_kelsub: v['kelsub']['kelsub'],
                                                        kelsub_kelsub_id: v['kelsub']['kelsub_id'],
                                                        kelsub_description: '',
                                                        subgl_description: me.subgl[0].subgl_description,
                                                        uniqueid: Math.floor(Math.random() * 1000000000),
                                                    });

                                                    tempstoresub.commitChanges();
                                                    description_sub = description_sub + '<table><tr><td><b>SUB</b></td><td><b>&nbsp;&nbsp;&nbsp;Amount</b></td></tr><tr><td>' + me.subgl[0].subgl_code + '</td><td>&nbsp;&nbsp;&nbsp;Rp.' + accounting.formatMoney(v['voucherdetail']['amount']) + '</td></tr></table>';

                                                }, v['kelsub']['kelsub'], is_vendor, is_customer);
                                                //                                                }

                                            }
                                            storeaj.add({
                                                remarks: v['voucherdetail']['remarks'],
                                                amount: v['voucherdetail']['amount'],
                                                indexdata: v['voucherdetail']['indexdata'],
                                                coa_coa_id: v['voucherdetail']['coa_coa_id'],
                                                coa_coa: v['coa']['coa'],
                                                coa_name: v['coa']['name'],
                                                kelsub_description: v['kelsub']['description'],
                                                kelsub_kelsub: v['kelsub']['kelsub'],
                                                kelsub_kelsub_id: v['kelsub']['kelsub_id'],
                                                is_ppn: v['voucherdetail']['is_ppn'],
                                                is_pph: v['voucherdetail']['is_pph'],
                                                description_sub: description_sub,
                                            });
                                            storeaj.commitChanges();
                                            me.voucherDetail.setSumDetail(me);
                                            me.voucherDetail.sumDetailOut(me);
                                            me.voucherDetail.sumDetail(me);
                                            me.flaggeneratepajak = 0;
                                            me.flagchangeamountpajak = 0;
                                        });
                                    } catch (err) {
                                        console.log(err.message);
                                        me.tools.alert.warning("Failed to generate pajak.");
                                    }
                                }
                            }).read('generatetemplatecoapajak');
                        }
                        if (val['ispph'] > 0) {
                            me.tools.ajax({
                                params: {
                                    template_id: val['tipepajakdetailid'],
                                    indexdata: me.getindexdetailcoax() + i,
                                    amount: val['amount'],
                                    pt_id: f.down("[name=pt_pt_id]").getValue(),
                                    project_id: f.down("[name=project_project_id]").getValue(),
                                    remarks: f.down("[name=description]").getValue(),
                                    is_ppn: 0,
                                    is_pph: 1,
                                },
                                form: f,
                                success: function(data, model) {
                                    try {

                                        data.forEach(function(v) {
                                            var description_sub = '';
                                            if (v['kelsub']['kelsub_id'] > 0) {
                                                if (f.down("[name=unit_unit_id]").getValue() != '' && f.down("[name=unit_unit_id]").getValue() > 0 && (v['kelsub']['kelsub_id'] == 'B' || v['kelsub']['kelsub_id'] == 'ST' || v['kelsub']['kelsub_id'] == 'SC' || v['kelsub']['kelsub_id'] == 'BK')) {
                                                    idparam = f.down("[name=unit_unit_id]").getValue();
                                                    param = 'unit_id';
                                                } else {
                                                    param = 'customer_vendor_name';
                                                }
                                                if (idparam != '') {
                                                    me.voucherDetail.getSubglv2(me, idparam, param, function() {
                                                        tempstoresub.removeAt(tempstoresub.find('voucherdetail_indexdata', v['voucherdetail']['indexdata']));
                                                        tempstoresub.add({
                                                            indexsubdata: v['voucherdetail']['indexdata'],
                                                            remarks: v['voucherdetail']['remarks'],
                                                            amount: v['voucherdetail']['amount'],
                                                            subgl_subgl_id: me.subgl[0].subgl_subgl_id,
                                                            subgl_code: me.subgl[0].subgl_code,
                                                            subgl_code1: me.subgl[0].subgl_code1,
                                                            subgl_code2: me.subgl[0].subgl_code2,
                                                            subgl_code3: me.subgl[0].subgl_code3,
                                                            subgl_code4: me.subgl[0].subgl_code4,
                                                            voucherdetail_voucherdetail_id: '',
                                                            voucherdetail_indexdata: v['voucherdetail']['indexdata'],
                                                            kelsub_kelsub: v['kelsub']['kelsub'],
                                                            kelsub_kelsub_id: v['kelsub']['kelsub_id'],
                                                            kelsub_description: '',
                                                            subgl_description: me.subgl[0].subgl_description,
                                                            uniqueid: Math.floor(Math.random() * 1000000000),
                                                        });

                                                        tempstoresub.commitChanges();
                                                        description_sub = description_sub + '<table><tr><td><b>SUB</b></td><td><b>&nbsp;&nbsp;&nbsp;Amount</b></td></tr><tr><td>' + me.subgl[0].subgl_code + '</td><td>&nbsp;&nbsp;&nbsp;Rp.' + accounting.formatMoney(v['voucherdetail']['amount']) + '</td></tr></table>';

                                                    }, v['kelsub']['kelsub'], is_vendor, is_customer);
                                                }
                                            }
                                            storeaj.add({
                                                remarks: v['voucherdetail']['remarks'],
                                                amount: v['voucherdetail']['amount'],
                                                indexdata: v['voucherdetail']['indexdata'],
                                                coa_coa_id: v['voucherdetail']['coa_coa_id'],
                                                coa_coa: v['coa']['coa'],
                                                coa_name: v['coa']['name'],
                                                kelsub_description: v['kelsub']['description'],
                                                kelsub_kelsub: v['kelsub']['kelsub'],
                                                kelsub_kelsub_id: v['kelsub']['kelsub_id'],
                                                is_ppn: v['voucherdetail']['is_ppn'],
                                                is_pph: v['voucherdetail']['is_pph'],
                                                description_sub: description_sub,
                                            });
                                            storeaj.commitChanges();
                                            me.voucherDetail.setSumDetail(me);
                                            me.voucherDetail.sumDetailOut(me);
                                            me.voucherDetail.sumDetail(me);
                                            me.flaggeneratepajak = 0;
                                            me.flagchangeamountpajak = 0;
                                        });
                                    } catch (err) {
                                        console.log(err.message);
                                        me.tools.alert.warning("Failed to generate pajak.");
                                    }
                                }
                            }).read('generatetemplatecoapajak');
                        }
                    });
                }
            },
            'detailvouchergrid toolbar [action=generate]': {
                click: function() {
                    //Rizal 31 Okt 2019
                    var f = me.getFormdata();
                    var state = f.up("window").state;
                    if (state == 'update') {
                        me.localStore.subdetailcoa.loadData([], false);
                        me.localStore.subdetailcoa.load({
                            params: {
                                voucherdetail_id: 0
                            },
                            callback: function(rec, op) {
                                me.attachModel(op, me.localStore.subdetailcoa, true);
                            }
                        });
                        me.localStore.subdetailcoa.loadData([], false);
                    }
                    //
                    me.voucherDetail.generateCoa(me, me.templateCoa, 'click');
                }
            },
            'detailvouchergrid toolbar [action=create]': {
                click: function(el, act) {
                    me.voucherDetail.formDataDetail(me, 'create');
                }
            },
            'detailvouchergrid toolbar [action=uploaddetail]': {
                click: function() {
                    me.instantWindow('FormDataUpload', 900, "Upload Detail", "create", 'uploaddetailformdata')
                }
            },
            'detailvouchergrid toolbar [action=trackingvoucher]': {
                click: function() {
                    me.instantWindow('FormTracking', 800, 'Log', 'read', '');
                }
            },
            'voucherformtracking': {
                afterrender: function() {
                    var me, form;
                    me = this;
                    me.formTrackingAfterRender();
                },
            },
            'detailvouchergrid toolbar [action=update]': {
                click: function() {
                    me.voucherDetail.formDataDetail(me, 'update')
                }
            },
            'detailvouchergrid toolbar [action=createcopy]': {
                click: function() {
                    me.voucherDetail.createcopy(me, 'update')
                }
            },
            'detailvouchergrid': {
                itemdblclick: function() {
                    me.voucherDetail.formDataDetail(me, 'update');
                },
                selectionchange: function() {
                    me.voucherDetail.gridSelectionChangedetailcoaGrid(me);
                }
            },
            'voucherardetailgrid ': {
                selectionchange: function(el) {
                    me.gridSelectionChangeAr(me.getDetailargrid());
                },
                boxready: function() {
                    var me = this;
                    $("#paymentallId input[name='paymentall']").keyup(function() {
                        var fd = me.getDetailargrid();
                        me._formatCurrency(fd.down('[name=paymentall]'));
                    });
                }
            },
            'voucherardetailgrid toolbar [action=browseSchedule]': {
                click: function(el) {
                    me.selectUnitGridShow(el, 'AngsuranGridNoSearch');
                }
            },
            'voucherardetailgrid toolbar [action=destroy]': {
                click: function(el) {
                    me.voucherAr.dataDestroyAr(me, el);
                }
            },
            'voucherescrowdetailgrid toolbar [action=destroy]': {
                click: function(el) {
                    me.voucherAr.dataDestroyArEsc(me, el);
                }
            },
            'voucherardetailgrid toolbar [name=paymentall]': {
                blur: function(el) {
                    me.voucherAr.paymentTextFieldOnBlur(me, el);
                }
            },
            'voucherformcoadetail [name=ppn_tipepajakdetail_id]': {
                select: function(val, records) {
                    var me = this;
                    var f = me.getFormcoadetail();
                    f.down("[name=ppn_percentage]").setValue(records[0].data.percentage);
                }
            },
            'voucherformcoadetail [name=pph_tipepajakdetail_id]': {
                select: function(val) {
                    var me = this;
                    var f = me.getFormcoadetail();
                    var sc = f.down("[name=pph_tipepajakdetail_id]").getStore();
                    sc.clearFilter();
                    sc.filter('tipepajakdetail_id', val.value, true, false);
                    sc.each(function(rec) {
                        f.down("[name=pph_percentage]").setValue(rec.get('percentage'));
                    });
                    sc.clearFilter();
                }
            },
            'voucherformcoadetail [name=cashflow_setupcashflow_id]': {
                select: function(val) {
                    var me = this;
                    var f = me.getFormcoadetail();
                    var sc = f.down("[name=cashflow_setupcashflow_id]").getStore();
                    sc.clearFilter();
                    sc.filter('setupcashflow_id', val.value, true, false);
                    sc.each(function(rec) {
                        f.down("[name=cashflowtype_cashflowtype]").setValue(rec.get('cashflowtype_cashflowtype'));
                        f.down("[name=cashflowtype_cashflowtype_id]").setValue(rec.get('cashflowtype_cashflowtype_id'));
                    });
                    sc.clearFilter();
                    me.isLinkCoaCf();
                },
                change: function(val) {
                    var me = this;
                    var f = me.getFormcoadetail();
                    me.isLinkCoaCf();
                }
            },
            'vouchersubdetailformdata [name=subgl_subgl_id]': {
                select: function(val) {
                    me.voucherDetail.subglChange(me);
                }
            },
            'voucherformdata [action=browseSub]': {
                click: function(val) {
                    me.browseSub(me);
                }
            },
            'voucherformdata [action=browsereffvcr]': {
                click: function(val) {
                    me.browsereffvcr(me);
                }
            },
            'voucherformdata [action=btnbrowsereffrek]': {
                click: function(val) {
                    var me = this;
                    var f = me.getFormdata();
                    if (f.down("[name=vendor_vendor_id]").getValue() == "") {
                        me.tools.alert.warning("Silahkan pilih vendor/supplier terlebih dahulu");
                    } else {
                        me.instantWindow('FormDataVendorBank', 500, 'Add Vendor Bank', 'create', 'myVoucherVendorBank');
                    }
                }
            },
            'voucherformvendorbank': {
                afterrender: function(e) {
                    me.fdarvendorbank();
                }
            },
            'voucherformvendorbank [action=save]': {
                click: function(e) {
                    var me = this;
                    var f = me.getFormdata();
                    var fm = me.getFormdatavendorbank();
                    if (fm.down("[name=vendor_bank_name]").getValue() == "" || fm.down("[name=vendor_bank_name]").getValue() == null) {
                        me.tools.alert.warning("Silahkan pilih bank terlebih dahulu");
                        return false;
                    }
                    if (fm.down("[name=vendor_bank_account_name]").getValue() == "") {
                        me.tools.alert.warning("Silahkan isi bank account name terlebih dahulu");
                        return false;
                    }
                    if (fm.down("[name=vendor_bank_account_no]").getValue() == "") {
                        me.tools.alert.warning("Silahkan isi bank account no terlebih dahulu");
                        return false;
                    }
                    Ext.Ajax.request({
                        url: 'cashier/voucher/read',
                        method: 'POST',
                        async: false,
                        params: {
                            vendor_id: f.down("[name=vendor_vendor_id]").getValue(),
                            bank_id: fm.down("[name=vendor_bank_name]").getValue(),
                            bank_account_name: fm.down("[name=vendor_bank_account_name]").getValue(),
                            bank_account_no: fm.down("[name=vendor_bank_account_no]").getValue(),
                            currency: fm.down("[name=vendor_bank_currency]").getValue(),
                            remarks: fm.down("[name=vendor_bank_remarks]").getValue(),
                            mode_read: 'savevendorbank'
                        },
                        success: function(response) {
                            var data = Ext.JSON.decode(response.responseText);
                            if (data != 'is_exist') {
                                fm.up("window").close();
                                me.getCustomRequestCombobox('vendorbank', f.down('[name=vendor_vendor_id]').getValue(), '', '', 'vendor_bankacc_id', 'vendorbank', '', f, '',
                                    function() {
                                        f.down('[name=vendor_bankacc_id]').setValue(data);
                                    });
                            } else {
                                me.tools.alert.warning("Nomor rekening sudah ada pada vendor tersebut");
                            }
                        },
                        failure: function(response) {

                        }
                    });
                }
            },
            'voucherformdata [action=deletelink]': {
                click: function(val) {
                    var f = me.getFormdata();
                    f.down("[name=kasbank_reff_voucher_id]").setValue("");
                    f.down("[name=kasbank_reff_id]").setValue("");
                    f.down("[name=kasbank_reff_ids]").setValue("");
                }
            },
            'voucherformdata [action=browsereceiptid]': {
                click: function(val) {
                    me.browsereceiptid(me);
                }
            },
            'voucherformdata [action=generatekwitansinumber]': {
                click: function(val) {
                    me.generateKwitansiNumber();
                }
            },
            'voucherformdata [action=browseremovereceiptid]': {
                click: function(val) {
                    var f = me.getFormdata();
                    f.down("[name=receipt_id]").setValue("");
                    f.down("[name=payment_receipt_no]").setValue("");
                }
            },
            'voucherformdata [name=voucherprefix_voucherprefix_id]': {
                change: function(val) {
                    var me = this;
                    var f = me.getFormdata();
                    me.showSubglCode(f, 0);
                    var x = f.down("[name=voucherprefix_voucherprefix_id]").getStore().findRecord("voucherprefix_id", val.value, 0, false, true, true);
                    if (x) {
                        if (x.data['bank_name'] != '' && x.data['bank_name'] != null) {
                            f.down("[name=bank_name]").setValue(x.data['bank_name']);
                        } else {
                            f.down("[name=bank_name]").setValue("");
                        }
                    }
                }
            },
            'vouchersubdetailformdata [action=browsesubcode]': {
                click: function(val) {
                    me.browseSubcode(me);
                }
            },
            'voucherformcoadetail [name=coa_coa_id]': {
                select: function() {
                    me.voucherDetail.coaChange(me);
                }
            },
            'voucherformcoadetail [name=kasbondept_id]': {
                select: function() {
                    var f = me.getFormcoadetail();
                    var kasbondept_no = me.tools.comboHelper(f.down("[name=kasbondept_id]")).getField('kasbondept_id', 'kasbondept_no')
                    f.down("[name=kasbondept_no]").setValue(kasbondept_no);
                }
            },
            'voucherformcoadetail button[action=save]': {
                click: function(el, act) {
                    me.voucherDetail.savedetailcoa(me);
                }
            },
            'voucherformcoadetail button[action=savenew]': {
                click: function(el, act) {
                    me.voucherDetail.savedetailcoa(me, true);
                }
            },
            'voucherformcoadetail toolbar button[action=cancel]': {
                click: function(el, act) {
                    me.voucherDetail.cancelFormdatadetail(me);
                }
            },
            'detailvouchergrid toolbar button[action=destroy]': {
                click: function(el, act) {
                    me.voucherDetail.destroydetail(me);
                }
            },
            'vouchersubcoadetailgrid toolbar [action=create]': {
                click: function(el, act) {
                    me.voucherDetail.formDataSubDetail(me, 'create');
                }
            },
            'vouchersubcoadetailgrid toolbar [action=update]': {
                click: function(el, act) {
                    me.voucherDetail.formDataSubDetail(me, 'update');
                }
            },
            'vouchersubcoadetailgrid toolbar [action=destroy]': {
                click: function(el, act) {
                    me.voucherDetail.destroysubdetail(me);
                }
            },
            'vouchersubcoadetailgrid ': {
                selectionchange: function() {
                    me.voucherDetail.gridSelectionChangedetailsubcoaGrid(me);
                },
                itemdblclick: function() {
                    me.voucherDetail.formDataSubDetail(me, 'update');
                }
            },
            'voucherformdata': {
                boxready: function() {
                    var me = this;
                    var f = me.getFormdata();
                    $("#win-voucherwinId .x-tool-close").click(function() {
                        $("#win-voucherwinId .icon-cancel").click();
                    });
                }
            },
            'vouchersubdetailformdata': {
                afterrender: function(v) {
                    var state = v.up('window').state;
                    me.voucherDetail.fdardatasub(me, state);
                },
                boxready: function() {
                    var me = this;
                    $("#coadatasubdetailsby input[name='amount']").keyup(function() {
                        var fd = me.getFormsubcoadetail();
                        me._formatCurrency(fd.down('[name=amount]'));
                    });
                }
            },
            'vouchersubdetailformdata button[action=save]': {
                click: function() {
                    me.voucherDetail.savesubdetailcoa(me);
                }
            },
            'voucherchequeoutgrid button[action=select]': {
                click: function(v) {
                    var me = this;
                    me.chequeSelectOut(v);
                }
            },
            'voucherchequegrid button[action=select]': {
                click: function(v) {
                    var me = this;
                    me.chequeSelect(v);
                }
            },
            'voucherchequegrid ': {
                selectionchange: function() {
                    me.voucherDetail.gridSelectionChangeChequeGrid(me);
                },
                afterrender: function() {
                    me.voucherDetail.gridChequeGdar(me);
                },
                itemdblclick: function(v) {
                    var me = this;
                    me.chequeSelect(v);
                }
            },
            'voucherchequeoutgrid ': {
                selectionchange: function() {
                    me.voucherDetail.gridSelectionChangeChequeOutGrid(me);
                },
                afterrender: function() {
                    me.voucherDetail.gridChequeGdar(me);
                },
                itemdblclick: function(v) {
                    var me = this;
                    me.chequeSelect(v);
                }
            },
            'voucherchequegrid [action=createchequein]': {
                click: function() {
                    me.instantWindow('FormDataIn', 500, 'Add Cheque In', 'create', 'myVoucherCHequeInWindow');
                }
            },
            'voucherchequegrid [action=createchequeout]': {
                click: function() {
                    me.instantWindow('FormDataOut', 500, 'Add Cheque Out', 'create', 'myVoucherCHequeOutWindow');
                }
            },
            'voucherchequeoutgrid [action=createchequein]': {
                click: function() {
                    me.instantWindow('FormDataIn', 500, 'Add Cheque In', 'create', 'myVoucherCHequeInWindow');
                }
            },
            'voucherchequeoutgrid [action=createchequeout]': {
                click: function() {
                    me.instantWindow('FormDataOut', 500, 'Add Cheque Out', 'create', 'myVoucherCHequeOutWindow');
                }
            },
            'voucherescrowgrid': {
                selectionchange: function() {
                    me.voucherDetail.gridSelectionChangeEscrowGrid(me);
                },
                itemdblclick: function(v, rec) {
                    var me = this;
                    return false;
                }
            },
            'voucherescrowgrid button[action=select]': {
                click: function(v) {
                    var me = this;
                    me.voucherAr.escrowSelect(me, v, false);
                }
            },
            'voucherescrowgrid button[action=selectesc]': {
                click: function(v) {
                    var me = this;
                    me.voucherAr.escrowSelect(me, v, true);
                }
            },
            'voucherformrealization': {
                afterrender: function(v) {
                    var state = v.up('window').state;
                    me.fdardatareal(state);
                }
            },

            'voucherformrealization [action=browseSub]': {
                click: function(val) {
                    me.browseSubReal(me);
                }
            },
            'voucherformrealization [name=payment_paymentmethod_id]': {
                change: function(val) {
                    var me = this;
                    if (val.value) {
                        me.changePaymentReal(val.value);
                    }

                }
            },
            'voucherformeditnokwitansi': {
                afterrender: function(v) {
                    var state = v.up('window').state;
                    me.fdareditnokwitansi(state);
                }
            },
            'voucherformeditnokwitansi button[action=save]': {
                click: function(v) {
                    var me = this;
                    var f = me.getFormeditnokwitansi();
                    Ext.Ajax.request({
                        url: 'cashier/voucher/read',
                        method: 'POST',
                        async: false,
                        params: {
                            kasbank_id: f.down("[name=kasbank_id]").getValue(),
                            receipt_no: f.down("[name=receipt_no]").getValue(),
                            mode_read: 'updatenokwitansi'
                        },
                        success: function(response) {
                            var data = Ext.JSON.decode(response.responseText);

                            f.up("window").close();
                            Ext.Msg.alert('Info', 'Nomor Kwitansi berhasil di update').setBodyStyle('z-index: 999999;');
                            me.getGrid().getStore().reload();
                        },
                        failure: function(response) {

                        }
                    });
                }
            },
            'voucherformrealization button[action=save]': {
                click: function(v) {
                    var f = me.getFormrealization();
                    var pl = f.down('[name=purchaseletter_purchaseletter_id]').getValue();
                    var unitid = f.down('[name=unit_unit_id]').getValue();
                    var kid = f.down('[name=kasbank_id]').getValue();
                    var kidArPayment = f.down("[name=kasbank_id_arpayment]").getValue();
                    var vid = '';
                    var g = me.getGrid();
                    var rows = g.getSelectionModel().getSelection();

                    rows.forEach(function(rec) {
                        if (moment(f.down("[name=realization_date]").getValue()).format("YYYY-MM") < moment(rec.get("kasbank_date")).format("YYYY-MM")) {
                            vid = vid + rec.get("voucherID") + ',';
                        }
                    });

                    if (f.getForm().isValid()) {
                        if (kidArPayment.search('~') > 0) {
                            me.checkMutpleUnitReal(f, unitid, pl, kid, function() {
                                if (me.is_closewarning === 1) {
                                    me.getScheduleFromKasbank(kidArPayment, f, function() {
                                        me.voucherAr.checkMutpleSchedule(me, f, me.schedule_id_arpayment, function() {
                                            if (me.is_closewarning2 === 0) {

                                                if (vid != '') {
                                                    Ext.Msg.confirm('Confirmation', 'Tanggal realisasi kurang dari tanggal pembuatan voucher ' + vid + ' lanjutkan?', function(btn) {
                                                        if (btn == 'yes') {
                                                            me.prosesRealization();
                                                        }
                                                    });
                                                } else {
                                                    me.prosesRealization();
                                                }
                                            }
                                        }, true);
                                    }, true);
                                }
                            }, true);
                        } else {
                            if (vid != '') {
                                Ext.Msg.confirm('Confirmation', 'Tanggal realisasi kurang dari tanggal pembuatan voucher ' + vid + ' lanjutkan?', function(btn) {
                                    if (btn == 'yes') {
                                        me.prosesRealization();
                                    }
                                });
                            } else {
                                me.prosesRealization();
                            }
                        }
                    }
                }
            },
            'voucherformrealization button[action=unreal]': {
                click: function(v) {
                    me.prosesUnRealization();
                }
            },
            'voucherformrealization [name=voucherint]': {
                blur: function(v) {
                    me.blurVoucher(v.value);
                }
            },
            'voucherformrealization [name=voucherprefix_voucherprefix_id]': {
                select: function(val) {
                    var f = me.getFormrealization();
                    me.checkMandatoryReal();
                    var x = f.down("[name=voucherprefix_voucherprefix_id]").getStore().findRecord("voucherprefix_id", val.value, 0, false, true, true);
                    if (x) {
                        if (x.data['bank_name'] != '' && x.data['bank_name'] != null) {
                            f.down("[name=bank_name]").setValue(x.data['bank_name']);
                        } else {
                            f.down("[name=bank_name]").setValue("");
                        }
                    }
                }
            },
            'voucherformrealization [name=temp_realized]': {
                select: function(val) {
                    var f = me.getFormrealization();
                    var vp = f.down("[name=voucherprefix_voucherprefix_id]").getStore();
                    vp.clearFilter();
                    if (val.value == 1) {
                        vp.filter('istempprefix', val.value, true, false);
                    }
                    f.down("[name=voucherprefix_voucherprefix_id]").setValue("");
                    me.checkMandatoryReal();
                }
            },
            'voucherformrealization [name=realization_date]': {
                select: function() {
                    me.checkMandatoryReal();
                },
            },
            'voucherformrealization [name=cheque_cheque_id]': {
                change: function(v) {
                    var f = me.getFormrealization();
                    var prefix = f.down('[name=voucherprefix_voucherprefix_id]').getValue();
                    var dataflow = f.down('[name=dataflow]').getValue();

                    if (v.value) {
                        me.getChequeInfo(v.value, f, true, '', dataflow);
                    }

                }
            },
            'voucherformrealization [action=browseCheque]': {
                click: function(val) {
                    var me = this;
                    var grid = me.getGrid();
                    var rec = grid.getSelectedRecord();
                    me.cheque_formdata = me.getFormrealization();
                    me.chequeShowWindow(val, rec.get("project_project_id"), rec.get("pt_pt_id"));
                }
            },
            'voucherformdatain': {
                afterrender: function(e) {
                    me.fdarin();
                }
            },
            'voucherformdatain button[action=saveuse]': {
                click: function() {
                    var me;
                    me = this;
                    me.dataSaveChequeIn();
                }
            },
            'voucherformdataout': {
                afterrender: function(e) {
                    me.fdarout();
                }
            },
            'voucherformdataout [name=project_project_id]': { //
                change: function(v) {
                    if (v.value) {
                        var f = me.getFormdatachequeout();
                        f.down("[name=pt_pt_id]").setValue("");
                        var pt = f.down("[name=pt_pt_id]").getStore();
                        pt.clearFilter();
                        pt.filter('project_project_id', v.value, true, false);
                    }
                }
            },
            'voucherformdataout [name=pt_pt_id]': { //
                change: function(v) {
                    if (v.value) {
                        var f = me.getFormdatachequeout();
                        var fa = me.getFormdata();
                        var project = f.down("[name=project_project_id]").getValue();
                        me.getCustomRequestComboboxModule('mastercheque', 'bank_cheque_out', v.value, project, '', 'voucherprefix_voucherprefix_id', 'voucherprefix', ['coa'], f, '', function() {
                            f.down('[name=voucherprefix_voucherprefix_id]').setValue('');
                            f.down('[name=project_id]').setValue(project);
                        });
                    }
                }
            },
            'voucherformdataout button[action=saveuse]': {
                click: function() {
                    var me;
                    me = this;
                    me.dataSaveChequeOut();
                }
            },
            'voucherformcopyvoucher ': {
                afterrender: function(e) {
                    var grid = me.getGrid(),
                        row = grid.getSelectionModel().getSelection();
                    var p = me.getPanel();
                    var f = me.getFormcopyvoucher();
                    var rec = grid.getSelectedRecord();
                    var kasbank_id = '';
                    var vid = '';

                    var c = grid.getSelectionModel().getCount();
                    if (c === 1) {
                        f.down("[name=fcv_vid]").setValue(rec.get('voucherID'));
                        f.down("[name=fcv_kasbank_id]").setValue(rec.get('kasbank_id'));
                    } else {

                        row.forEach(function(x) {
                            kasbank_id = kasbank_id + x.get('kasbank_id') + '~';
                            vid = vid + x.get('voucherID') + ', ';
                        });

                        f.down("[name=fcv_vid]").setValue(vid);
                        f.down("[name=fcv_kasbank_id]").setValue(kasbank_id);
                    }
                    p.setLoading("Please wait");
                    me.tools.ajax({
                        params: { module: me.controllerName },
                        form: p,
                        success: function(data, model) {
                            try {
                                me.tools.weseav2(data.project, f.down("[name=fcv_project_id]")).comboBox('', function() {
                                    p.setLoading("Load Project.. Please wait");
                                    f.down("[name=fcv_project_id]").setValue(rec.get('project_project_id'));
                                });
                                me.tools.weseav2(data.pt, f.down("[name=fcv_pt_id]")).comboBox('', function() {
                                    p.setLoading("Load Company.. Please wait");
                                });
                                var pt = f.down("[name=fcv_pt_id]").getStore();
                                pt.clearFilter();
                                pt.filter('project_project_id', rec.get('project_project_id'), true, false);
                                f.down("[name=fcv_pt_id]").setValue('');
                            } catch (err) {
                                console.log(err.message);
                                me.tools.alert.warning("Failed to generate init.");
                            }

                            p.setLoading(false);
                        }
                    }).read('init');
                },
            },
            'voucherformcopyvoucher [name=fcv_project_id]': {
                change: function(v) {
                    var f = me.getFormcopyvoucher();
                    if (v.value) {
                        var pt = f.down("[name=fcv_pt_id]").getStore();
                        pt.clearFilter();
                        pt.filter('project_project_id', v.value, true, false);
                        f.down("[name=fcv_pt_id]").setValue('');
                    }
                }
            },
            'voucherformcopyvoucher button[action=save]': {
                click: function(e) {
                    var me = this;
                    var grid = me.getGrid(),
                        row = grid.getSelectionModel().getSelection();
                    var f = me.getFormcopyvoucher();
                    var fs = me.getFormsearch();
                    var success = true;
                    var vid = '';
                    var returnmsg = '<ul>';
                    if (f.down("[name=fcv_project_id]").getValue() == '') {
                        me.tools.alert.warning('Please choose Project.');
                        return false;
                    }
                    if (f.down("[name=fcv_pt_id]").getValue() == '') {
                        me.tools.alert.warning('Please choose Company.');
                        return false;
                    }
                    Ext.Msg.confirm('Confirmation', 'Are you sure?', function(btn) {
                        if (btn == 'yes') {

                            row.forEach(function(rec) {
                                Ext.Ajax.request({
                                    url: 'cashier/voucher/read',
                                    method: 'POST',
                                    async: false,
                                    params: {
                                        kasbank_id: rec.get("kasbank_id"),
                                        project_id: f.down("[name=fcv_project_id]").getValue(),
                                        pt_id: f.down("[name=fcv_pt_id]").getValue(),
                                        mode_read: 'createcopyvoucher'
                                    },
                                    success: function(response) {
                                        var data = Ext.JSON.decode(response.responseText);

                                        if (data.data['vid'] == '') {
                                            success = false;
                                            returnmsg = returnmsg + '<li>Voucher ' + rec.get("voucherID") + ' gagal copy. ' + data.data['returnmsg'] + '</i>';
                                        } else {
                                            success = true;
                                            returnmsg = returnmsg + '<li>Voucher ' + rec.get("voucherID") + ' berhasil dicopy</li>';
                                        }

                                    },
                                    failure: function(response) {

                                    }
                                });
                                returnmsg = returnmsg + '</ul>';
                                var e = f.down("[name=fcv_project_id]");
                                var prj = e.getStore().findRecord("project_project_id", f.down("[name=fcv_project_id]").getValue(), 0, false, true, true);
                                var g = f.down("[name=fcv_pt_id]");
                                var pt = g.getStore().findRecord("pt_id", f.down("[name=fcv_pt_id]").getValue(), 0, false, true, true);

                                if (f.down("[name=fcv_project_id]").getValue() == rec.get('project_project_id') && f.down("[name=fcv_pt_id]").getValue() == rec.get('pt_pt_id')) {
                                    grid.getStore().loadPage();
                                }
                                var messagebox = Ext.Msg.show({
                                    title: 'Warning',
                                    msg: returnmsg,
                                    closable: true
                                });
                                Ext.Function.defer(function() {
                                    messagebox.zIndexManager.bringToFront(messagebox);
                                }, 100);
                                Ext.Msg.alert('Info', returnmsg).setBodyStyle('z-index: 999999;');
                            });
                        }
                    });
                }
            },
            'voucherformpindahvoucher ': {
                afterrender: function(e) {
                    var grid = me.getGrid();
                    var p = me.getPanel();
                    var f = me.getFormpindahvoucher();
                    var rec = grid.getSelectedRecord();
                    f.down("[name=fcv_vid]").setValue(rec.get('voucherID'));
                    f.down("[name=fcv_kasbank_id]").setValue(rec.get('kasbank_id'));
                    p.setLoading("Please wait");
                    me.tools.ajax({
                        params: { module: me.controllerName },
                        form: p,
                        success: function(data, model) {
                            try {
                                me.tools.weseav2(data.project, f.down("[name=fcv_project_id]")).comboBox('', function() {
                                    p.setLoading("Load Project.. Please wait");
                                    f.down("[name=fcv_project_id]").setValue(rec.get('project_project_id'));
                                });
                                me.tools.weseav2(data.pt, f.down("[name=fcv_pt_id]")).comboBox('', function() {
                                    p.setLoading("Load Company.. Please wait");
                                });
                                var pt = f.down("[name=fcv_pt_id]").getStore();
                                pt.clearFilter();
                                pt.filter('project_project_id', rec.get('project_project_id'), true, false);
                                f.down("[name=fcv_pt_id]").setValue('');
                            } catch (err) {
                                console.log(err.message);
                                me.tools.alert.warning("Failed to generate init.");
                            }

                            p.setLoading(false);
                        }
                    }).read('init');
                },
            },
            'voucherformpindahvoucher [name=fcv_project_id]': {
                change: function(v) {
                    var f = me.getFormpindahvoucher();
                    if (v.value) {
                        var pt = f.down("[name=fcv_pt_id]").getStore();
                        pt.clearFilter();
                        pt.filter('project_project_id', v.value, true, false);
                        f.down("[name=fcv_pt_id]").setValue('');
                    }
                }
            },
            'voucherformpindahvoucher button[action=save]': {
                click: function(e) {
                    var me = this;
                    var grid = me.getGrid();
                    var f = me.getFormpindahvoucher();
                    var fs = me.getFormsearch();
                    var rec = grid.getSelectedRecord();
                    if (f.down("[name=fcv_project_id]").getValue() == '') {
                        me.tools.alert.warning('Please choose Project.');
                        return false;
                    }
                    if (f.down("[name=fcv_pt_id]").getValue() == '') {
                        me.tools.alert.warning('Please choose Company.');
                        return false;
                    }
                    Ext.Msg.confirm('Confirmation', 'Anda akan melakukan pindah PT voucher ini, voucher di PT sebelumnya akan hilang. Apakah anda yakin?', function(btn) {
                        if (btn == 'yes') {
                            Ext.Ajax.request({
                                url: 'cashier/voucher/read',
                                method: 'POST',
                                async: false,
                                params: {
                                    kasbank_id: f.down("[name=fcv_kasbank_id]").getValue(),
                                    project_id: f.down("[name=fcv_project_id]").getValue(),
                                    pt_id: f.down("[name=fcv_pt_id]").getValue(),
                                    mode_read: 'createpindahvoucher'
                                },
                                success: function(response) {
                                    var data = Ext.JSON.decode(response.responseText);
                                    var e = f.down("[name=fcv_project_id]");
                                    var prj = e.getStore().findRecord("project_project_id", f.down("[name=fcv_project_id]").getValue(), 0, false, true, true);
                                    var g = f.down("[name=fcv_pt_id]");
                                    var pt = g.getStore().findRecord("pt_id", f.down("[name=fcv_pt_id]").getValue(), 0, false, true, true);

                                    if (f.down("[name=fcv_project_id]").getValue() == rec.get('project_project_id') && f.down("[name=fcv_pt_id]").getValue() == rec.get('pt_pt_id')) {
                                        grid.getStore().loadPage();
                                    }

                                    if (data.data['vid'] == '') {
                                        var messagebox = Ext.Msg.show({
                                            title: 'Warning',
                                            msg: data.data['returnmsg'],
                                            closable: true
                                        });
                                        Ext.Function.defer(function() {
                                            messagebox.zIndexManager.bringToFront(messagebox);
                                        }, 100);
                                        Ext.Msg.alert('Warning', data.data['returnmsg']).setBodyStyle('z-index: 999999;');
                                    } else {
                                        var messagebox = Ext.Msg.show({
                                            title: 'Warning',
                                            msg: 'Voucher sukses dipindahkan ke Project ' + prj.data['project_name'] + ' dan PT ' + pt.data['name'] + ' tujuan dengan voucher ID ' + data.data['vid'],
                                            closable: true
                                        });
                                        Ext.Function.defer(function() {
                                            messagebox.zIndexManager.bringToFront(messagebox);
                                        }, 100);
                                        Ext.Msg.alert('Info', 'Voucher sukses dipindahkan ke Project ' + prj.data['project_name'] + ' dan PT ' + pt.data['name'] + ' tujuan dengan voucher ID ' + data.data['vid']).setBodyStyle('z-index: 999999;');

                                        me.getGrid().getStore().reload();
                                    }

                                },
                                failure: function(response) {

                                }
                            });
                        }
                    });
                }
            },
            'voucherformsearch': {
                boxready: function(panel) {
                    var me = this;
                    $("#voucherformsearchID").keyup(function(e) {
                        if (e.which == 13) {
                            e.preventDefault();
                            me.dataSearch();
                            return false;
                        }
                    });
                },
            },
            'voucherformsearch [name=project_id]': {
                change: function(v) {
                    var f = me.getFormsearch();
                    var grid = me.getGrid();
                    if (v.value) {
                        me.project_id = v.value;
                        var pt = f.down("[name=pt_id]").getStore();
                        pt.clearFilter();
                        pt.filter('project_project_id', v.value, true, false);
                        var x = f.down("[name=project_id]").getStore().findRecord("project_project_id", v.value, 0, false, true, true);
                        if (x.data['project_subholding_id'] == '1') {
                            grid.down("[action=printKwitansiRS]").setVisible(true);
                            grid.down("[action=printKwitansiRSExc]").setVisible(true);
                        } else {
                            grid.down("[action=printKwitansiRS]").setVisible(false);
                            grid.down("[action=printKwitansiRSExc]").setVisible(false);
                        }
                        f.down("[name=pt_id]").setValue('');
                    }
                }
            },
            'voucherformsearch [name=pt_id]': {
                change: function(v) {
                    var f = me.getFormsearch();
                    if (v.value) {
                        me.setprojectpt(v.name, v.ownerCt, 'project_id');
                        me.getCustomRequestCombobox('detaildept', v.value, me.project_id, '', 'department_id', 'department', ['project', 'pt'], f, '', function() {

                        }, '', true);
                        me.getDropdownKasbankMaker();
                        me.getRequestUnrealization();
                        me.getUserDeletedVa();
                        me.getPtCr();
                    }
                }
            },
            'voucherformsearch [name=department_id]': {
                change: function(v) {
                    if (v.value) {


                    }
                }
            },
            'voucherrealizationgrid [name=pt_id]': {
                change: function(v) {
                    if (v.value) {
                        var g = me.getVoucherrealizationgrid();
                        me.setprojectpt(v.name, v.ownerCt, 'project_id');
                        g.down('[name=project_id]').setValue(me.project_id);
                    }
                }
            },
            'voucherrealizationgrid [action=select]': {
                click: function(v) {
                    me.loadDetailtovoucher(v);
                }
            },
            'voucherrealizationgrid toolbar [name=limit]': {
                change: function(v) {
                    var me = this;
                    var store = me.getVoucherrealizationgrid().getStore();
                    if (v.value) {
                        store.getProxy().setExtraParam('limit', v.value);
                        me.loadPage(store); //Add the record to the store
                        store.totalCount = store.count(); //update the totalCount property of Store
                        store.pageSize = v.value;
                    }
                }
            },
            'voucherkasbongrid [action=select]': {
                click: function(v) {
                    me.loadKasbonProject(v);
                }
            },
            'receiptidvcrgrid [action=selectreceipt]': {
                click: function(v) {
                    me.loadReceiptId(v, me.fd);
                }
            },
            'subcodegrid [action=select]': {
                click: function(v) {
                    me.loadSubcode(v);
                }
            },
            'subcodegrid [action=selectinheader]': {
                click: function(v) {
                    me.loadSubcodeheader(v, me.fd);
                }
            },
            'subcodegrid [action=createns]': {
                click: function(v) {
                    me.instantWindow('FormDataNewSub', 400, 'Create New Sub', 'create', 'myvoucheformnewsub');
                }
            },
            'subcodegrid ': {
                selectionchange: function(v) {
                    me.gridSelectionChangeSubcode();
                }
            },
            'voucherkasbongrid [action=savetoarrkasbon]': {
                click: function(v) {
                    me.savekasbontoarr(v);
                }
            },
            'voucherkasbongrid [action=cleararrkasbon]': {
                click: function(v) {
                    me.cleararrkasbon(v);
                }
            },
            'voucherformsearch [name=pt_id],voucherformsearch [name=datatypedate],[name=datestart],[name=dateend]': {
                select: function(v) {
                    if (v.value) {
                        me.checkformsearch(v.value);
                    }
                }
            },
            'voucherformsearch [name=datatype]': {
                change: function(v) {
                    if (v.value) {
                        me.changeDatatypeSearch(v.value);
                        me.checkformsearch(v.value);
                    }
                }
            },
            'voucherformsearch [name=voucherID]': {
                blur: function(v) {
                    if (v.value) {
                        me.blurVoucherId(v.value);
                    }
                }
            },
            'reffvcrgrid [action=selectinheader]': {
                click: function(v) {
                    me.loadReffvcr(v, me.fd);
                }
            },
            'reffvcrgrid formsearch [id=voucherIDreffvcr]': {
                blur: function(v) {
                    if (v.value) {
                        me.blurVoucherId(v.value);
                    }
                }
            },
            'voucherformpayment ': {
                afterrender: function(e) {
                    me.fdarpayment();
                }
            },
            'voucherformpayment [name=payment_paymentmethod_id]': {
                change: function(val) {
                    var me = this;
                    if (val.value) {
                        me.changePayment(val.value);
                    }

                }
            },
            'voucherformpayment [action=browseCheque]': {
                click: function(val) {
                    var me = this;
                    var grid = me.getGrid();
                    var rec = grid.getSelectedRecord();
                    me.cheque_formdata = me.getFormdatapayment();
                    me.chequeShowWindow(val, rec.get("project_project_id"), rec.get("pt_pt_id"));
                }
            },
            'voucherformpayment [name=cheque_cheque_id]': {
                change: function(val) {
                    var me = this;
                    if (val.value) {
                        var f = me.getFormdatapayment();
                        var dataflow = f.down('[name=dataflow]').getValue();
                        me.getChequeInfo(val.value, f, false, '', dataflow);
                    }
                }
            },
            'voucherformpayment [name=cheque_cheque_no]': {
                blur: function(val) {
                    var me = this;
                    if (val.value) {
                        me.searchChequeEvent(val.value);
                    }
                }
            },
            'voucherformrealization [name=cheque_cheque_no]': {
                blur: function(val) {
                    var me = this;
                    if (val.value) {
                        me.searchChequeEventReal(val.value);
                    }
                }
            },
            'voucherformpayment [action=save]': {
                click: function(val) {
                    var me = this;
                    me.savepayment();
                }
            },
            'voucherformpayment [action=unpaid]': {
                click: function(val) {
                    var me = this;
                    me.unpaid();
                }
            },
            'voucherformvendor ': {
                afterrender: function(val) {
                    var me = this;
                    me.fdarvendor();
                }
            },
            'voucherformvendor [action=save] ': {
                click: function(val) {
                    var me = this;
                    me.savevendor();
                }
            },
            'voucherunitgrid ': {
                selectionchange: function(el) {
                    me.unitselectonchanges();
                }
            },
            'voucherunitgrid [action=select]': {
                click: function(el) {
                    me.unitSelect(el);
                }
            },
            'voucherunitgrid [action=selectunitothers]': {
                click: function(el) {
                    me.unitothersSelect(el);
                }
            },
            'voucherunitgrid [action=selectconvertunit]':{
                click: function (el) {
                    me.convertUnit(el);
                }
            },
            'voucherotherpaymentgrid [action=create]': {
                click: function(el) {
                    me.instantWindow('FormDataOtherPayment', 400, 'New Other Payment', 'create', 'myvoucheformotherpayment');
                }
            },
            'voucherotherpaymentgrid [action=update]': {
                click: function(el) {
                    me.instantWindow('FormDataOtherPayment', 400, 'Update', 'update', 'myvoucheformotherpayment');
                }
            },
            'voucherotherpaymentgrid ': {
                selectionchange: function(el) {
                    me.gridSelectionChangeDefault(me.getOtherpaymentgrid());
                },
            },
            'voucherotherpaymentgrid [action=destroy]': {
                click: function(el) {
                    var me = this;
                    var gridcoadetail = me.getDetailvouchergrid();
                    var f = me.getFormdata();
                    me.destroySelection(me.getOtherpaymentgrid(), false, f, 'paymentdetail_id', 'deletedOtherPaymentRows', function() {
                        gridcoadetail.down('toolbar [action=generate]').setDisabled(false);
                        me.templateCoa = 2;
                        me.getSelectedPayment();
                        me.setSumDetailOtherPayment();
                        me.isEdit = 1;
                    });
                }
            },
            'voucherpemutihangrid ': {
                selectionchange: function(el) {
                    me.dendaselectionchanges();
                }
            },
            'voucherpemutihangrid [action=selectpemutihandenda]': {
                click: function(el) {
                    me.dendaSelect(el);
                }
            },
            'voucherformpemutihan': {
                afterrender: function (el) {
                    var me = this;
                    me.formPemutihanAfterRender(el);
                }
            },
            'voucherformpemutihan button[action=save]': {
                click: function (e) {
                    var me = this;
                    me.processPemutihanDenda();
                }
            },
            'otherspaymentformdatadetail ': {
                afterrender: function(el) {
                    me.otherPaymentFdar(el);
                }
            },
            'otherspaymentformdatadetail [action=savenew]': {
                click: function() {
                    me.saveOtherPayment(function() {
                        me.instantWindow('FormDataOtherPayment', 400, 'New Other Payment', 'create', 'myvoucheformotherpayment');
                    });
                }
            },
            'otherspaymentformdatadetail [action=save]': {
                click: function() {
                    me.saveOtherPayment();
                }
            },
            'otherspaymentformdatadetail [name=paymenttype_paymenttype_id]': {
                select: function(val) {
                    if (val.value) {
                        var f = me.getFormdataotherpayment();
                        me.setToField(f, 'paymenttype_paymenttype_id', 'paymenttype_id', 'paymenttype', 'paymenttype_paymenttype');
                    }
                }
            },
            'voucherformcoadetail': {
                boxready: function() {
                    var me = this;
                    var f = me.getFormdata();
                    var fd = me.getFormcoadetail();

                    var grid = me.getGrid();
                    var rec = grid.getSelectedRecord();

                    $("#voucherformcoadetailID").keyup(function(e) {
                        if (e.which == 13) {
                            e.preventDefault();
                            me.voucherDetail.savedetailcoa(me);
                            return false;
                        }
                    });
                    $("#voucherformcoadetailID input[name='coa_coa_id']").keyup(function() {
                        this.value = this.value.replace(/(\d{2})(\d{2})/, '$1' + '.' + '$2')
                    });
                    $("#voucherformcoadetailID input[name='amount']").keyup(function() {
                        me._formatCurrency(fd.down('[name=amount]'));
                    });
                    if (f.down("[name=dataflow]").getValue() == "O") {
                        fd.down("[name=exclude_kwitansi]").setVisible(false);
                    }
                }
            },
            'voucherformnewsub button[action=save]': {
                click: function(e) {
                    var me = this;
                    var f = me.getFormnewsub();
                    var fs = me.getFormsubcoadetail();
                    var code = f.down("[name=code]").getValue();
                    var description = f.down("[name=description]").getValue();

                    if (code == '') {
                        me.tools.alert.warning("Silahkan isi Sub Code.");
                        return false;
                    }
                    if (description == '') {
                        me.tools.alert.warning("Silahkan isi Description.");
                        return false;
                    }
                    Ext.MessageBox.confirm(
                        'Confirm', 'Apakah anda yakin?', callbackFunctionzNewSub);

                    function callbackFunctionzNewSub(btn) {
                        if (btn == 'yes') {
                            Ext.Ajax.request({
                                url: 'cashier/voucher/read',
                                method: 'POST',
                                async: false,
                                params: {
                                    project_id: f.down("[name=fns_project_id]").getValue(),
                                    pt_id: f.down("[name=fns_pt_id]").getValue(),
                                    kelsub_id: f.down("[name=fns_kelsub_id]").getValue(),
                                    code: code,
                                    description: description,
                                    mode_read: 'createsubaccount'
                                },
                                success: function(response) {
                                    var data = Ext.JSON.decode(response.responseText);
                                    if (data.data['result'] != '1') {
                                        f.up('window').close();
                                        Ext.Msg.alert('Warning', data.data['msg']).setBodyStyle('z-index: 999999;');
                                    } else {
                                        me.tools.alert.info("Data Successfully Inserted.");
                                        f.up('window').close();
                                        Ext.getCmp('browsesubcodeid').up("window").close();
                                        fs.down("[name=subgl_subgl_id]").setValue(data.data['subgl_id']);
                                        fs.down("[name=subgl_code]").setValue(data.data['code']);
                                        fs.down("[name=subgl_code1]").setValue(data.data['code']);
                                        fs.down("[name=subgl_description]").setValue(data.data['description']);

                                    }
                                },
                                failure: function(response) {

                                }
                            });
                        }
                    };
                }
            },
            'vouchercetakslipgrid button[action=createnew]': {
                click: function(v) {
                    var me = this;
                    me.instantWindow('FormDataCetakSlip', 600, 'Create New Data', 'create', 'myvoucheformcetakslip');
                }
            },
            'vouchercetakslipgrid button[action=update]': {
                click: function(v) {
                    var me = this;
                    me.instantWindow('FormDataCetakSlip', 600, 'Update', 'update', 'myvoucheformcetakslip');
                }
            },
            'vouchercetakslipgrid button[action=select]': {
                click: function(v) {
                    var me = this;
                    var grid = me.getCetakslipgrid();
                    var rec = grid.getSelectedRecord();
                    me.norek_customer = rec.get('norek_customer');
                    me.nama_customer = rec.get('nama_customer');
                    me.alamat_customer = rec.get('alamat_customer');
                    me.nama_penyetor = rec.get('nama_penyetor');
                    me.norek_penyetor = rec.get('norek_penyetor');
                    me.alamat_penyetor = rec.get('alamat_penyetor');
                    me.telp_penyetor = rec.get('telp_penyetor');
                    me.amount = rec.get('amount');
                    me.terbilang = rec.get('terbilang');
                    me.mata_uang = rec.get('mata_uang');
                    me.nama_bank = rec.get('nama_bank');
                    me.nama_yang_dapat_dihubungi = rec.get('nama_yang_dapat_dihubungi');

                    me.previewHandlerSetoran(me.templateref);
                }
            },
            'voucherformcetakslip ': {
                afterrender: function(e) {
                    me.fdarcetakslip();
                },
                boxready: function() {
                    var me = this;
                    $("#csg_amount input[name='amount']").keyup(function() {
                        var fd = me.getFormdatacetakslip();
                        me._formatCurrency(fd.down('[name=amount]'));
                    });
                }
            },
            'voucherformcetakslip button[action=save]': {
                click: function(v) {
                    var me = this;
                    var grid = me.getCetakslipgrid();
                    var f = me.getFormdatacetakslip();
                    Ext.Msg.confirm('Confirmation', 'Simpan data?', function(btn) {
                        if (btn == 'yes') {
                            Ext.Ajax.request({
                                url: 'cashier/voucher/read',
                                method: 'POST',
                                async: false,
                                params: {
                                    slip_id: f.down('[name=slip_id]').getValue(),
                                    kasbank_id: f.down('[name=kasbank_id]').getValue(),
                                    norek_customer: f.down('[name=norek_customer]').getValue(),
                                    nama_customer: f.down('[name=nama_customer]').getValue(),
                                    alamat_customer: f.down('[name=alamat_customer]').getValue(),
                                    nama_penyetor: f.down('[name=nama_penyetor]').getValue(),
                                    norek_penyetor: f.down('[name=norek_penyetor]').getValue(),
                                    alamat_penyetor: f.down('[name=alamat_penyetor]').getValue(),
                                    telp_penyetor: f.down('[name=telp_penyetor]').getValue(),
                                    amount: f.down('[name=amount]').getValue(),
                                    mata_uang: f.down('[name=mata_uang]').getValue(),
                                    nama_bank: f.down('[name=nama_bank]').getValue(),
                                    nama_yang_dapat_dihubungi: f.down('[name=nama_yang_dapat_dihubungi]').getValue(),
                                    delete: '0',
                                    mode_read: 'prosescetakslip'
                                },
                                success: function(response) {
                                    var data = Ext.JSON.decode(response.responseText);
                                    f.up("window").close();
                                    grid.getStore().loadPage();
                                },
                                failure: function(response) {

                                }
                            });
                        }
                    });
                }
            },
            'vouchercetakslipgrid button[action=delete]': {
                click: function(v) {
                    var me = this;
                    var grid = me.getCetakslipgrid();
                    var rec = grid.getSelectedRecord();
                    Ext.Msg.confirm('Confirmation', 'hapus data?', function(btn) {
                        if (btn == 'yes') {
                            Ext.Ajax.request({
                                url: 'cashier/voucher/read',
                                method: 'POST',
                                async: false,
                                params: {
                                    slip_id: rec.get("slip_id"),
                                    delete: '1',
                                    mode_read: 'deletecetakslip'
                                },
                                success: function(response) {
                                    var data = Ext.JSON.decode(response.responseText);
                                    grid.getStore().loadPage();
                                },
                                failure: function(response) {

                                }
                            });
                        }
                    });
                }
            },
            'vouchercetakslipgrid': {
                selectionchange: function() {
                    var me = this;
                    me.gridSelectionChangeCetakSlipGrid(me);
                },
            },
            'voucherattachmentdetailgrid': {
                selectionchange: function() {
                    var me = this;
                    me.gridSelectionChangeAttachmentGrid(me);
                },
            },
            'voucherattachmentdetailgrid button[action=create]': {
                click: function(v) {
                    var me = this;
                    me.instantWindow('FormDataUploadAttachment', 600, 'Upload Attachment', 'create', 'myvoucheformdatauploadattachment');
                }
            },
            'voucherattachmentdetailgrid button[action=read]': {
                click: function(v) {
                    var me = this;
                    me.FormUploadAttachmentRead();
                }
            },
            'voucherattachmentdetailgrid button[action=destroy]': {
                click: function(v) {
                    var me = this;
                    var fa = me.getFormdata();
                    var g = me.getAttachmentdetailgrid();
                    var records = g.getSelectionModel().getSelection();
                    for (var i = 0; i < records.length; i++) {
                        if (apps.uid != records[i].data.addby) {
                            Ext.Msg.alert('Warning', 'File hanya boleh dihapus oleh user ' + records[i].data.user_fullname);
                            return false;
                        }
                    }
                    for (var i = records.length - 1; i >= 0; i--) {
                        var row = g.getStore().indexOf(records[i]);
                        var id = records[i]['data']["attachment_id"];
                        var module = records[i]['data']["module"];
                        if (id) {
                            fa.deletedattachment.push(id);
                        }
                        g.getStore().removeAt(row);
                    }
                }
            },
            'uploadformdataupload button[action=upload]': {
                click: function() {
                    var me = this;
                    var f = me.getFormdata();
                    var gridcoa = me.getDetailvouchergrid();
                    var form = me.getFormdataupload();
                    var tempstoresub = me.localStore.subdetailcoa;
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
                    var is_grouping = form.down("[name=groupingdata]").getValue();
                    form.down("[name=kasbank_id]").setValue(f.down("[name=kasbank_id]").getValue());
                    form.down("[name=project_id]").setValue(f.down("[name=project_project_id]").getValue());
                    form.down("[name=pt_id]").setValue(f.down("[name=pt_pt_id]").getValue());
                    form.down("[name=department_id]").setValue(f.down("[name=department_department_id]").getValue());
                    form.down("[name=mode_read]").setValue('uploaddetail');

                    Ext.MessageBox.show({
                        title: 'Confirmation',
                        msg: 'Pastikan kolom pada file anda seperti dibawah ini. <br> KOLOM A : Coa<br>\n\
                        KOLOM B : Amount <br>\n\
                        KOLOM C : Description <br>\n\
                        KOLOM D : Sub <br>\n\
                        KOLOM E : Cluster <br>\n\
                        KOLOM F : Sub Description <br>\n\
                        KOLOM G : Cashflow . <br> Lanjutkan? ',
                        buttons: Ext.MessageBox.OKCANCEL,
                        fn: function(btn) {
                            if (btn == 'ok') {
                                if (true) {
                                    form.submit({
                                        url: 'cashier/voucher/read',
                                        waitMsg: 'Processing data...',
                                        success: function(fp, o) {
                                            var dt = o.result;
                                            var emsg = '<style> textarea.gfg { margin:5px;  padding:5px; background-color: white; width: 600px; height: 300px; overflow: auto; text-align:justify; cursor:default;} </style> <textarea class="gfg">';
                                            var msg = '';
                                            var errormsg = dt.errormsg;
                                            var data = dt.data;
                                            var dataLength = Object.keys(data).length;
                                            form.up('window').close();
                                            form.up('window').unmask();

                                            if (!dt.error) {
                                                var arrayLength = Object.keys(errormsg).length;

                                                for (var i = 0; i < arrayLength; i++) {
                                                    if (typeof errormsg[i] !== "undefined") {
                                                        emsg = emsg + (i + 1) + '. ' + errormsg[i] + '&#13;&#10;';
                                                    }
                                                }
                                                emsg = emsg + '</textarea>Transaksi Dibatalkan';
                                                Ext.Msg.show({
                                                    title: 'Warning',
                                                    icon: Ext.MessageBox.INFO,
                                                    buttons: Ext.Msg.OK,
                                                    msg: emsg
                                                });
                                                // Ext.Msg.alert('Warning', emsg);
                                                return false;
                                            } else {
                                                Ext.Msg.alert('Success', 'Uploaded Successfully.');

                                                data.forEach(function(a, b) {

                                                    var indexdata = me.getindexdetailcoax();
                                                    var newidx = indexdata + 1;
                                                    gridcoa.getStore().add({
                                                        remarks: a['description'],
                                                        amount: accounting.unformat(a['amount']),
                                                        indexdata: newidx,
                                                        coa_coa_id: a['coa_id'],
                                                        cashflowtype_cashflowtype: a['cashflowtype'],
                                                        cashflowtype_cashflowtype_id: a['cashflowtype_id'],
                                                        cashflow_setupcashflow_id: a['setupcashflow_id'],
                                                        coa_coa: a['coa'],
                                                        coa_name: a['coaname'],
                                                        kelsub_description: a['kelsubdesc'],
                                                        kelsub_kelsub: a['kelsub'],
                                                        kelsub_kelsub_id: a['kelsub_id'],
                                                        is_upload: 1
                                                    });
                                                    gridcoa.getStore().commitChanges();
                                                    var x = 1;
                                                    if (is_grouping > 0) {
                                                        tempstoresub.removeAt(tempstoresub.find('voucherdetail_indexdata', newidx));
                                                        a['subdetail'].forEach(function(c, d) {
                                                            tempstoresub.add({
                                                                indexsubdata: x,
                                                                remarks: c['subdescription'],
                                                                amount: c['amount'],
                                                                subgl_subgl_id: c['subgl_id'],
                                                                subgl_code: c['subcode'],
                                                                subgl_code1: c['subcode1'],
                                                                subgl_code2: c['subcode2'],
                                                                subgl_code3: c['subcode3'],
                                                                subgl_code4: c['subcode4'],
                                                                voucherdetail_voucherdetail_id: '',
                                                                voucherdetail_indexdata: newidx,
                                                                kelsub_kelsub: c['kelsub'],
                                                                kelsub_kelsub_id: c['kelsub_id'],
                                                                kelsub_description: 'kelsubdesc',
                                                                subgl_description: c['subdesc'],
                                                                uniqueid: Math.floor(Math.random() * 1000000000),
                                                            });

                                                            tempstoresub.commitChanges();
                                                            x++;
                                                        });
                                                    } else {
                                                        if (a['subgl_id']) {
                                                            tempstoresub.add({
                                                                indexsubdata: x,
                                                                remarks: a['subdescription'],
                                                                amount: a['amount'],
                                                                subgl_subgl_id: a['subgl_id'],
                                                                subgl_code: a['subcode'],
                                                                subgl_code1: a['subcode1'],
                                                                subgl_code2: a['subcode2'],
                                                                subgl_code3: a['subcode3'],
                                                                subgl_code4: a['subcode4'],
                                                                voucherdetail_voucherdetail_id: '',
                                                                voucherdetail_indexdata: newidx,
                                                                kelsub_kelsub: a['kelsub'],
                                                                kelsub_kelsub_id: a['kelsub_id'],
                                                                kelsub_description: 'kelsubdesc',
                                                                subgl_description: a['subdesc'],
                                                                uniqueid: Math.floor(Math.random() * 1000000000),
                                                            });

                                                            tempstoresub.commitChanges();
                                                        }
                                                    }
                                                });

                                                console.log(tempstoresub);
                                                me.voucherDetail.sumDetail(me);

                                                me.voucherDetail.setSumDetail(me);
                                            }
                                        },
                                        failure: function(fp, o) {
                                            Ext.Msg.alert('Warning', 'Processing failed !');
                                        }
                                    });
                                }
                            }
                        }
                    });
                }
            },
            'voucherformdatauploadattachment': {
                afterrender: this.formDataAttachmentAfterrender
            },
            'voucherformdatauploadattachment button[action=upload]': {
                click: function() {
                    this.UploadAttachment();
                }
            },
            'vouchernonlinkgrid [action=create]': {
                click: function(el) {
                    me.instantWindow('FormDataNonlink', 400, 'New Nonlink', 'create', 'myvoucherformnonlink');
                }
            },
            'vouchernonlinkgrid [action=update]': {
                click: function(el) {
                    me.instantWindow('FormDataNonlink', 400, 'Update', 'update', 'myvoucherformnonlink');
                }
            },
            'nonlinkformdata': {
                afterrender: function(el) {
                    me.fdarnonlink(el);
                }
            },

            'nonlinkformdata [action=savenew]': {
                click: function() {
                    me.saveNonlink(function() {
                        me.instantWindow('FormDataNonlink', 400, 'Update', 'update', 'myvoucherformnonlink');
                    });
                }
            },
            'nonlinkformdata [action=save]': {
                click: function() {
                    me.saveNonlink();
                }
            },
            'vouchernonlinkgrid ': {
                selectionchange: function(el) {
                    me.gridSelectionChangeDefault(me.getNonlinkgrid());
                },
            },
            'nonlinkformdata [name=paymenttype_id]': {
                select: function(val) {
                    if (val.value) {
                        var f = me.getFormdatanonlink();
                        //  setToField: function (form, field, value, field2) {
                        me.setToField(f, 'paymenttype_id', 'paymenttype_id', 'paymenttype', 'paymenttype');
                    }
                }
            },
            'vouchernonlinkgrid [action=destroy]': {
                click: function(el) {
                    var me = this;
                    var grid = me.getNonlinkgrid();
                    var form = me.getFormdata();
                    var store = grid.getStore();
                    var rec = grid.getSelectedRecord(),
                        row = grid.getSelectionModel().getSelection();
                    Ext.Msg.show({
                        title: 'Warning',
                        msg: 'Are you sure delete this data?',
                        buttons: Ext.Msg.YESNO,
                        icon: Ext.Msg.QUESTION,
                        fn: function(clicked) {
                            if (clicked === "yes") {
                                for (var i = 0; i < row.length; i++) {
                                    var id = row[i]['data']['payment_id'];
                                    if (id) {
                                        form.deletedNonlinkRows.push(id);
                                    }
                                    store.remove(row[i]);

                                    var count = store.getCount();
                                    if (count < 1) {
                                        me.isnonlink = '0';
                                    } else {
                                        me.isnonlink = '1';
                                    }
                                }
                            }
                        }
                    });
                }
            },
            'voucherangsurangrid toolbar [name=temppayval]': {
                blur: function(el) {
                    var grid = me.getAngsurangrid();
                    me.paymenthelperOnBlur(el.value, grid.down("toolbar [name=isdendacheckboxf7]").getValue());
                },

                change: function(el) {
                    var grid = me.getAngsurangrid();
                    me.paymenthelperOnBlur(el.value, grid.down("toolbar [name=isdendacheckboxf7]").getValue());
                }
            },
            'voucherangsurangrid toolbar [name=isdendacheckboxf7]': {
                change: function(el) {
                    var grid = me.getAngsurangrid();
                    me.paymenthelperOnBlur(grid.down("toolbar [name=temppayval]").getValue(), el.value);
                }
            },
        });
    },

    formDataAttachmentAfterrender: function() {
        var me, p, action, countdata, counter, state, form, rowdata;
        me = this;
        form = me.getFormdatauploadattachment();
        form.down("[name=file-path-attachment]").on('change', function(inputFile, value) {
            var fileSize = inputFile.fileInputEl.dom.files[0].size;
            fileSize = fileSize / 1000000;
            if (fileSize > 5) { //Limit 2 MB
                me.tools.alert.info("Ukuran File Yang Diizinkan : 5 MB !");
                form.getForm().reset();
                return 0;
            }
        });
    },
    FormUploadAttachmentRead: function(action) {
        var me, p, psa, pmsa = '';
        me = this;
        var grid = me.getAttachmentdetailgrid();

        var rows = grid.getSelectionModel().getSelection();
        if (rows.length < 1) {
            Ext.Msg.alert('Info', 'No record selected !');
            return;
        }
        if (rows.length > 1) {
            Ext.Msg.alert('Info', 'Please select 1 data !');
            return;
        }

		// START CEK APAKAH DARI API
        var g = me.getGrid(), row = g.getSelectionModel().getSelection()[0];
        var parts = row.data.uploadApiID.split('-');
        var datasource = "";

        if (parts.length > 1) {
            datasource = parts[0];
        }
        // END CEK APAKAH DARI API
        var record = grid.getSelectionModel().getSelection()[0];
        var form = me.getFormdata();
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
            success: function(response) {
                    resjson     = Ext.JSON.decode(response.responseText);
                var base64src   = resjson.data.base64src;
                var downloadsrc = decodeURIComponent(resjson.data.signedUrl);
                var attLinkAPI  = record.get("path");

                // START KONDISI JIKA ATTACHMENT DARI API
                if ( ( datasource != null || datasource != "") && ( record.get("filename").includes("API") || record.get("path").includes("https://storage.googleapis.com/") ) ) {
                    ext = resjson.data.filename.split('.').pop();
                    if(ext=='pdf'){
                        var html='<embed scrolling="no" src="'+attLinkAPI+'#zoom=100%" type="application/pdf" width="100%" height="100%">';
                        Ext.create("Ext.Window",{
                            title     : 'Attachment Viewer : ' + record.get("filename"),
                            width     : 1280,
                            height    : 700,
                            closable  : true,
                            html      : html,
                            autoScroll: true,
                            modal     : true,
                            constrain : true
                        }).show();
                    } else if(ext == 'doc' || ext ==  'docx' || ext == 'xls' || ext ==  'xlsx'){
                        Ext.Msg.show({
                            title  : 'Download Attachment?',
                            buttons: Ext.Msg.YESNO,
                            icon   : Ext.Msg.INFO,
                            msg    : 'File akan di download?',
                            modal  : true,
                            fn      : function(btn) {
                                if (btn == 'yes') {
                                    var win = window.open(attLinkAPI, '_blank');
                                    win.focus();
                                }
                                return false;
                            }
                        });

                    } else{
                        var html='<div style="style="display: block; min-height: 700; width: 1280px; min-width: 1280px">';
                            html = html+'<img src="'+attLinkAPI+'" alt="<br>Preview is not supported for this file format." style="overflow: auto; display: block; height: auto; width: 100%"></div>';
                            html = html+'<div><a style="padding: 10px; float: right;" target="_blank" href="'+attLinkAPI+'" download>Download</a></div>';

                            Ext.create("Ext.Window", {
                            title     : 'Attachment Viewer : ' + record.get("filename"),
                            width     : 1280,
                            height    : 700,
                            closable  : true,
                            html      : html,
                            autoScroll: true,
                            modal     : true,
                            constrain : true
                        }).show();
                    }
                // END KONDISI JIKA ATTACHMENT DARI API
                } else {
                    // KONDISI DEFAULT CES
                    if (ext == 'pdf') {

                        var contentType = 'application/pdf';
                        var blob = me.b64toBlob(base64src, contentType);
                        var blobUrl = URL.createObjectURL(blob);

                        var html = '<embed scrolling="no" src="' + blobUrl + '" type="application/pdf" width="100%" height="100%">';
                    } else {
                        var html = '<div style="style="display: block; min-height: 700px; width: 1280px; min-width: 1280px">';
                        html = html + '<img src="' + base64src + '" style="overflow: auto; display: block; height: auto; width: 100%"></div>';
                        html = html + '<div><a style="padding: 10px; float: right;" target="_blank" href="' + downloadsrc + '" download>Download</a></div>';
                    }

                    Ext.create("Ext.Window", {
                        title     : 'Attachment Viewer : ' + record.get("filename"),
                        width     : 1280,
                        height    : 700,
                        closable  : true,
                        html      : html,
                        autoScroll: true,
                        modal     : true,
                        constrain : true
                    }).show();
                }
                form.setLoading(false);
            },
            failure: function(response) {
                form.setLoading(false);
                me.messagedata = 'data error';

                Ext.Msg.show({
                    title: 'Failure',
                    msg: 'Error: Your file is error',
                    icon: Ext.Msg.ERROR,
                    buttons: Ext.Msg.OK
                });
            }
        });


    },
    b64toBlob: function(b64Data, contentType = '', sliceSize = 512) {
        var byteCharacters = atob(b64Data.replace(/^[^,]+,/, ''));
        var byteArrays = [];

        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            var slice = byteCharacters.slice(offset, offset + sliceSize);

            var byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            var byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }

        var blob = new Blob(byteArrays, { type: contentType });
        return blob;
    },
    formDataAfterRender: function(el) { //fdar
        var state = el.up('window').state;
        var wid = el.up('window').id;
        var me = this;
        var f = me.getFormdata();
        var fs = me.getFormsearch();
        me.fdar().init();
        me.voucherDetail.hiddenSumFieldDetail(me, true);
        me.getDropdownCurrency();
        me.getDropdownARtype();
        f.down("[name=artype_id]").setVisible(false);
        if (me.special_role.includes(parseInt(apps.gid))) {
            f.down("[name=artype_id]").setVisible(true);
        }
        if (state == 'create') {
            f.getForm().setValues('');
            var kasbank_date = f.down("[name=kasbank_date]").getValue();
            var dataflow = f.down('[name=dataflow]').getValue();
            me.is_erems = 0;
            me.project_f = 0;
            me.voucherDetail.disableSave(me, true);
            me.fdar().create();
            me.setActiveForm(f);
            f.down('[name=kasbank_date]').setValue(me.dateNow);
            f.down('[name=kwitansi_date]').setValue(me.dateNow);
            me.sumCount = 0;
            me.loadModelCoaDetail();
            if (me.paymentflag_id !== 1) {
                me.voucherDetail.loadTempModel(me, function() {

                });
            }
            me.is_paid = 0;
            me.is_realized = 0;
            me.is_posting = 0;
            me.cancelFormdata();
            f.rowData = null;
            f.down('[name=dataflow]').setValue('O');
            Ext.getCmp('formdatavoucherprefix_voucherprefix_id').allowBlank = true;
            Ext.getCmp('formdatavoucherprefix_voucherprefix_id').forceSelection = true;
            Ext.getCmp('formdatavoucherprefix_voucherprefix_id').clearInvalid();
            me.amountSelected = null;
            me.schedule_id = null;
            me.kasbank_id = null,
                me.paymentflag_id = 0,
                me.voucherDetail.detailFdar(me, wid, f.down('[name=dataflow]').getValue(), state);
            f.down('[name=voucherardetail]').setDisabled(true);
            Ext.getCmp('TabVoucherId').getComponent('tabAr').tab.hide();
            me.is_reimburse = 0;
            me.reimburse_kasbank_id = [];
            me.is_pettycashloan = 0;
            me.pettycashloan_kasbon_id = [];
            f.deletedArPaymentRowsEsc = [];
            f.deletedattachment = [];
            f.deletedNonlinkRows = [];
            f.deletednonlink = [];
            f.down('[name=voucher_no]').setVisible(false);
            f.down('[name=jenis_spkorsop_id]').setValue(1);
            f.down("[name=currency_word]").setValue('Rupiah');
        } else if (state == 'update') {
            var state = 'update';
            me.formdata = f;
            me.is_erems = 1;
            me.is_paid = 0;
            me.is_realized = 0;
            me.is_posting = 0;
            me.project_f = 0;
            me.voucherDetail.disableSave(me, true);
            me.voucherDetail.loadTempModel(me);
            me.fdar().update();
            me.setActiveForm(f);
            f.editedRow = -1;
            f.rowData = null;
            f.deletedRows = [];
            f.deletedattachment = [];
            f.deletedNonlinkRows = [];
            f.deletednonlink = [];
            f.deletedRowsWithoutID = 0;
            f.deletedsubRows = [];
            f.deletedArPaymentRows = [];
            f.deletedArPaymentRowsEsc = [];
            me.loadModelCoaDetail(function() {
                me.voucherDetail.detailFdar(me, wid, f.down('[name=dataflow]').getValue(), state);
            });
            f.down('[name=voucher_no]').setVisible(true);
            Ext.getCmp('btnListCopy').setVisible(false);
            f.down('[action=browsevoucher]').setVisible(false);
            f.down('[action=browseprojectloan]').setVisible(false);

            var row = me.getGrid().getSelectionModel().getSelection();

            if ((row[0].data.payment_paymentflag_id == "1" || row[0].data.payment_paymentflag_id == "2") && (row[0].data.status == "is_realized" || row[0].data.status == "is_posting")) {
                f.down("[name=payment_date]").setVisible(false);
                f.down("[name=tmp_payment_date]").setVisible(true);
                f.down("[name=tmp_payment_date]").setValue(row[0].data.payment_payment_date);
            }

            var restricted_group = [2165, 2167, 2168, 3195, 3216, 3231, 3335];
            if ($.inArray(parseInt(apps.gid), restricted_group) !== -1) {
                console.log(row[0]);
                if (row[0].data.is_paid == 1 || row[0].data.is_realized == 1 || row[0].data.is_posting == 1) {
                    f.down("button[action=savenew]").setVisible(false);
                    f.down("button[action=saveprint]").setVisible(false);
                    f.down("button[action=save]").setVisible(false);
                }
            }
            
            if (!row[0].data.jenis_spkorsop_id) {
                f.down('[name=jenis_spkorsop_id]').setValue(1);
            }
        }
        me.checkAccess();
    },
    formatDate: function(param) {
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
    panelAfterRender: function() {
        var me = this;
        var grid = me.getGrid();
        var p = me.getPanel();
        var f = me.getFormsearch();
        shortcut.add("F7", function() {
            var fd = Ext.getCmp('formdatavoucherID');
            var v = Ext.getCmp('VoucherPanel');
            if (me.id === 'Voucher') {
                if (fd == undefined) {
                    me.selectUnitGridShow('el');
                } else {
                    me.tools.alert.info("Gagal F7. Silahkan close form voucher terlebih dahulu.");
                }
            }
        }, {
            'type': 'keydown',
            'propagate': true,
            'target': document
        });

        shortcut.add("F9", function() {
            var fd = Ext.getCmp('formdatavoucherID');
            var v = Ext.getCmp('VoucherPanel');
            if (me.id === 'Voucher') {
                if (fd == undefined) {
                    me.selectUnitGridShowEscPen();
                } else {
                    me.tools.alert.info("Gagal F9. Silahkan close form voucher terlebih dahulu.");
                }
            }
        }, {
            'type': 'keydown',
            'propagate': true,
            'target': document
        });
        shortcut.add("F4", function() {
            me.selectEscrowGridShow('el');
        }, {
            'type': 'keydown',
            'propagate': true,
            'target': document
        });
        shortcut.add("ctrl+alt+c", function() {
            me.copycell(me.getGrid());
        }, {
            'type': 'keydown',
            'propagate': true,
            'target': document
        });
        shortcut.add("ctrl+alt+x", function() {
            me.copycell(me.getGrid(), true);
        }, {
            'type': 'keydown',
            'propagate': true,
            'target': document
        });
        shortcut.add("alt+p", function() {
            me.printVoucher();
        }, {
            'type': 'keydown',
            'propagate': true,
            'target': document
        });
        $("#WINDOW-mnu" + me.bindPrefixName + "-body .x-tool-collapse-left").click();
        $("#WINDOW-mnu" + me.bindPrefixName + "_header-targetEl .x-tool-maximize").click();
        p.setLoading("Please wait");
        me.tools.ajax({
            params: { module: me.controllerName },
            form: p,
            success: function(data, model) {
                try {
                    me.tools.weseav2(data.project, f.down("[name=project_id]")).comboBox('', function() {
                        var combostore = f.down('[name=project_id]').getStore();
                        f.down("[name=project_id]").setValue(parseInt(apps.project));
                    });

                    me.tools.weseav2(data.pt, f.down("[name=pt_id]")).comboBox('', function() {
                        var combostore = f.down('[name=pt_id]').getStore();
                        var record = combostore.findRecord('pt_id', parseInt(apps.pt), 0, false, true, true);
                        if (record) {
                            var storear = grid.getStore();
                            combostore.filter('project_project_id', apps.project, true, false);
                            f.down("[name=pt_id]").setValue(parseInt(apps.pt));
                            var fields = f.getForm().getFieldValues();
                            for (var x in fields) {
                                storear.getProxy().setExtraParam(x, fields[x]);
                            }
                            storear.loadPage(1);
                        }
                    });
                    me.getCustomRequestComboboxV2('paymentmethodreal', f.down('[name=pt_id]').getValue(), f.down('[name=project_id]').getValue(), '', 'payment_paymentmethod_id', 'paymentmethod', '', f, '', function() {});
                    me.reportFileNamevcr = data.FILE_REPORT;
                    var department = data.department;
                    if (department) {
                        me.department_id = department.department_id;
                    }

                } catch (err) {
                    console.log(err.message);
                    me.tools.alert.warning("Failed to generate init.");
                }

                p.setLoading(false);
            }
        }).read('init');
        me.getDropdownKasbankMaker();
    },
    fillFormComponents: function(data, form) {
        var me = this;
        me.tools.wesea(data.dept, form.down("[name=department_department_id]")).comboBox();
        me.tools.wesea(data.pt, form.down("[name=pt_pt_id]")).comboBox('', function() {
            me.voucherDetail.fillPt(me);
        });
        me.tools.wesea(data.project, form.down("[name=project_project_id]")).comboBox('', function() {
            form.down("[name=project_project_id]").setValue(me.project_id);
        });
        me.tools.wesea(data.kasbank, form.down("[name=voucherprefix_voucherprefix_id]")).comboBox();
        me.tools.wesea(data.paymentmethod, form.down("[name=payment_paymentmethod_id]")).comboBox();
    },
    selectUnitGridShow: function(el, ar) {
        var ps;
        var me            = this;
        var localstore    = 'selectedAngsuran';
            me.kasbank_id = 0;
            me.is_erems   = 0;
        var browse        = new Cashier.library.BrowseCashier();
        browse.init({
            controller    : me,
            view          : 'AngsuranGrid',
            el            : el,
            localStore    : localstore,
            mode_read     : "selectedangsuran",
            bukaFormSearch: true,
        });
        browse.showWindow(function() {
            if (me.pt_id) {
                Ext.getCmp('ptArIdangsuran').setValue(me.pt_id);
                Ext.getCmp('ptArIdangsuran').setValue(me.pt_id);
            }
            Ext.getCmp('ptArIdangsuran').setValue(me.pt_id);
            Ext.getCmp('tipeangsuran').setValue('nonkpr');
        });
        // console.log(ar);
        if (ar == 'AngsuranGridNoSearch') {
            var f    = me.getFormdata();
            var ps   = f.rowData;
            var gridar  = me.getAngsurangrid();
            var storear = gridar.getStore();
            me.getSelectedSchedule();
            if (ps) {
                console.log(ps.get('cluster_id'));
                var cluster = Ext.getCmp('clusterId').getStore();
                cluster.clearFilter();
                cluster.filter('cluster_id', ps.get('cluster_id'), true, false);
                Ext.getCmp('unitNumberId').setValue(ps.get('unit_unit_number'));
                Ext.getCmp('blockId').setValue(ps.get('block_block_id'));
                Ext.getCmp('purchaseletterNoId').setValue(ps.get('purchaseletter_purchaseletter_no'));
                Ext.getCmp('customerNameId').setValue(ps.get('customer_name'));
                Ext.getCmp('unitscheduleAngsuranId').setValue(ps.get('unit_unit_id'));
                Ext.getCmp('projectArId').setValue(ps.get('project_project_id'));
                Ext.getCmp('ptArIdangsuran').setValue(ps.get('pt_pt_id') ? ps.get('pt_pt_id') : me.pt_id);
                Ext.getCmp('clusterId').setValue(ps.get('cluster_id'));
                Ext.getCmp('scheduleAngsuranId').setValue(me.schedule_id);
                if (ps.get('payment_paymentflag_id') === 2) {
                    Ext.getCmp('schedulePaymentflag_id').setValue(2);
                } else {
                    Ext.getCmp('schedulePaymentflag_id').setValue(1);
                }
                //
                if (cluster.is_f7_convert) {
                    Ext.getCmp('temppayval').setReadOnly(false);
                    Ext.getCmp('isdendacheckboxf7').setReadOnly(false);
                } else {
                    Ext.getCmp('temppayval').setReadOnly(true);
                    Ext.getCmp('isdendacheckboxf7').setReadOnly(true);
                }
                //
                Ext.getCmp('unitNumberId').setReadOnly(true);
                Ext.getCmp('clusterId').setReadOnly(true);
                Ext.getCmp('blockId').setReadOnly(true);
                Ext.getCmp('purchaseletterNoId').setReadOnly(true);
                Ext.getCmp('customerNameId').setReadOnly(true);
                Ext.getCmp('ptArIdangsuran').setReadOnly(true);
                Ext.getCmp('projectArId').setReadOnly(true);
            }
            var fields = Ext.getCmp('MySuperBrowseWindow').getForm().getFieldValues();
            for (var x in fields) {
                storear.getProxy().setExtraParam(x, fields[x]);
            }
            storear.loadPage(1);
        } else {
            me.bukaform = 0;
        }
    },
    selectUnitGridShowEscPen: function(el, ar) {
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
        browse.showWindow(function() {
            Ext.getCmp('tipeangsuran').setValue('kpr');
            if (me.pt_id) {
                Ext.getCmp('ptArIdangsuran').setValue(me.pt_id);
                Ext.getCmp('ptArIdangsuran').setValue(me.pt_id);
            }
            Ext.getCmp('ptArIdangsuran').setValue(me.pt_id);
        });
        var gridar = me.getAngsurangrid();
        Ext.getCmp('btnEstimasiDenda').hide();
        if (ar == 'AngsuranGridNoSearch') {
            var f = me.getFormdata();
            var ps = f.rowData;
            var storear = gridar.getStore();
            me.getSelectedSchedule();
            if (ps) {

                Ext.getCmp('unitNumberId').setValue(ps.get('unit_unit_number'));
                Ext.getCmp('clusterId').setValue(ps.get('unit_cluster'));
                Ext.getCmp('blockId').setValue(ps.get('block_block_id'));
                Ext.getCmp('purchaseletterNoId').setValue(ps.get('purchaseletter_purchaseletter_no'));
                Ext.getCmp('customerNameId').setValue(ps.get('customer_name'));
                Ext.getCmp('unitscheduleAngsuranId').setValue(ps.get('unit_unit_id'));
                Ext.getCmp('projectArId').setValue(ps.get('project_project_id'));
                Ext.getCmp('ptArIdangsuran').setValue(ps.get('pt_pt_id') ? ps.get('pt_pt_id') : me.pt_id);
                Ext.getCmp('scheduleAngsuranId').setValue(me.schedule_id);
                if (ps.get('payment_paymentflag_id') === 2) {
                    Ext.getCmp('schedulePaymentflag_id').setValue(2);
                } else {
                    Ext.getCmp('schedulePaymentflag_id').setValue(1);
                }
                Ext.getCmp('unitNumberId').setReadOnly(true);
                Ext.getCmp('clusterId').setReadOnly(true);
                Ext.getCmp('blockId').setReadOnly(true);
                Ext.getCmp('purchaseletterNoId').setReadOnly(true);
                Ext.getCmp('customerNameId').setReadOnly(true);
                Ext.getCmp('ptArIdangsuran').setReadOnly(true);
                Ext.getCmp('projectArId').setReadOnly(true);
            }
            var fields = Ext.getCmp('MySuperBrowseWindow').getForm().getFieldValues();
            for (var x in fields) {
                storear.getProxy().setExtraParam(x, fields[x]);
            }
            storear.loadPage(1);
        }
    },
    selectVoucher: function(el, ar) {
        var ps;
        var me = this;
        var browse = new Cashier.library.BrowseCashier();
        var localstore = 'selectedVoucher';
        browse.init({
            controller: me,
            view: 'VoucherRealizedGrid',
            el: el,
            localStore: localstore,
            mode_read: "selectedvoucher",
            bukaFormSearch: true,
        });
        browse.showWindow(function() {
            if (me.pt_id) {
                Ext.getCmp('ptVoucherIdR').setValue(me.pt_id);
                Ext.getCmp('ptVoucherIdR').setValue(me.pt_id);
            }
        }, function() {
        });
        var gridar = me.getVoucherrealizationgrid();
        var storear = gridar.getStore();
        var fields = Ext.getCmp('MySuperBrowseWindow').getForm().getFieldValues();
        for (var x in fields) {
            storear.getProxy().setExtraParam(x, fields[x]);
        }
        storear.loadPage();
    },
    browseSubcode: function(el, ar) {
        var ps;
        var me = this;
        var browse = new Cashier.library.BrowseCashier();
        var localstore = 'selectedSubcode';
        var f = me.getFormcoadetail();
        var kelsub = f.down('[name=kelsub_kelsub_id]').getValue();
        browse.init({
            controller: me,
            view: 'SubcodeGrid',
            el: el,
            localStore: localstore,
            mode_read: "selectedsubcode",
            bukaFormSearch: true,
        });
        browse.showWindow(function() {
            Ext.getCmp('kelsubIdSubcode').setValue(kelsub);
            Ext.getCmp('ptVoucherIdSubcode').setValue(me.pt_id);
            Ext.getCmp('projectVoucherIdSubcode').setValue(me.project_id);
        }, function() {
            if (me.pt_id) {
                Ext.getCmp('ptVoucherIdSubcode').setValue(me.pt_id);
                Ext.getCmp('kelsubIdSubcode').setValue(kelsub);
                Ext.getCmp('projectVoucherIdSubcode').setValue(me.project_id);
            }
            Ext.getCmp('btnselectinheader').setVisible(false);
            Ext.getCmp('btnselectsub').setVisible(true);
            Ext.getCmp('btncreatens').setVisible(true);
            Ext.getCmp('ptVoucherIdSubcode').setValue(me.pt_id);
            Ext.getCmp('projectVoucherIdSubcode').setValue(me.project_id);
            Ext.getCmp('kelsubIdSubcode').setValue(kelsub);

            var gc = me.getSubcodegrid();
            var storear = gc.getStore();
            var fields = Ext.getCmp('MySuperBrowseWindow').getForm().getFieldValues();
            for (var x in fields) {
                storear.getProxy().setExtraParam(x, fields[x]);
            }
            storear.load({
                callback: function(records, options, success) {
                    gc.down("pagingtoolbar").doRefresh();
                    Ext.getCmp('ptVoucherIdSubcode').setValue(me.pt_id);
                    Ext.getCmp('kelsubIdSubcode').setValue(kelsub);
                }
            });
            me.checkAccessCreateSub();
        });
    },
    browseSub: function(el, ar) {
        var ps;
        var me = this;
        var browse = new Cashier.library.BrowseCashier();
        var localstore = 'selectedSubcode';
        var f = me.getFormdata();
        var kelsub = f.down('[name=kelsub_id]').getValue();
        browse.init({
            controller: me,
            view: 'SubcodeGrid',
            el: el,
            localStore: localstore,
            mode_read: "selectedsubcode",
            bukaFormSearch: true,
        });
        browse.showWindow(function() {
            Ext.getCmp('kelsubIdSubcode').setValue(kelsub);
            Ext.getCmp('ptVoucherIdSubcode').setValue(me.pt_id);
            Ext.getCmp('projectVoucherIdSubcode').setValue(me.project_id);
        }, function() {
            if (me.pt_id) {
                Ext.getCmp('ptVoucherIdSubcode').setValue(me.pt_id);
                Ext.getCmp('kelsubIdSubcode').setValue(kelsub);
                Ext.getCmp('projectVoucherIdSubcode').setValue(me.project_id);
            }
            Ext.getCmp('ptVoucherIdSubcode').setValue(me.pt_id);
            Ext.getCmp('projectVoucherIdSubcode').setValue(me.project_id);
            Ext.getCmp('kelsubIdSubcode').setValue(kelsub);
            Ext.getCmp('btnselectinheader').setVisible(true);
            Ext.getCmp('btnselectsub').setVisible(false);
            Ext.getCmp('btncreatens').setVisible(false);
            me.fd = f;
            var gc = me.getSubcodegrid();
            var storear = gc.getStore();
            var fields = Ext.getCmp('MySuperBrowseWindow').getForm().getFieldValues();
            for (var x in fields) {
                storear.getProxy().setExtraParam(x, fields[x]);
            }
            storear.load({
                callback: function(records, options, success) {
                    gc.down("pagingtoolbar").doRefresh();
                    Ext.getCmp('ptVoucherIdSubcode').setValue(me.pt_id);
                    Ext.getCmp('kelsubIdSubcode').setValue(kelsub);
                }
            });
        });
    },
    browsereffvcr: function(el, ar) {
        var ps;
        var me = this;
        var browse = new Cashier.library.BrowseCashier();
        var localstore = 'selectedreffvcr';
        var f = me.getFormdata();
        browse.init({
            controller: me,
            view: 'ReffvcrGrid',
            el: el,
            localStore: localstore,
            mode_read: "selectedreffvcr",
            bukaFormSearch: true,
        });
        browse.showWindow(function() {
            Ext.getCmp('ptVoucherIdReffvcr').setValue(me.pt_id);
            Ext.getCmp('projectVoucherIdReffvcr').setValue(me.project_id);
            Ext.getCmp('usedReffvcr').setValue('N');
        }, function() {
            if (me.pt_id) {
                Ext.getCmp('ptVoucherIdReffvcr').setValue(me.pt_id);
                Ext.getCmp('projectVoucherIdReffvcr').setValue(me.project_id);
            }
            Ext.getCmp('ptVoucherIdReffvcr').setValue(me.pt_id);
            Ext.getCmp('projectVoucherIdReffvcr').setValue(me.project_id);
            Ext.getCmp('btnselectinheader').setVisible(true);
            me.fd = f;
            var gc = me.getReffvcrgrid();
            var storear = gc.getStore();
            var fields = Ext.getCmp('MySuperBrowseWindow').getForm().getFieldValues();
            for (var x in fields) {
                storear.getProxy().setExtraParam(x, fields[x]);
            }
            Ext.getCmp('ptVoucherIdReffvcr').setValue(me.pt_id);
            /* storear.load({
                callback: function(records, options, success) {
                    gc.down("pagingtoolbar").doRefresh();
                    Ext.getCmp('ptVoucherIdReffvcr').setValue(me.pt_id);
                }
            }); */
        });
    },
    browsereceiptid: function(el, ar) {
        var ps;
        var me = this;
        var browse = new Cashier.library.BrowseCashier();
        var localstore = 'selectedreceiptid';
        var f = me.getFormdata();
        browse.init({
            controller: me,
            view: 'ReceiptidvcrGrid',
            el: el,
            localStore: localstore,
            mode_read: "selectedreceiptid",
            bukaFormSearch: true,
        });
        browse.showWindow(function() {
            Ext.getCmp('ptVoucherIdReffvcr').setValue(me.pt_id);
            Ext.getCmp('projectVoucherIdReffvcr').setValue(me.project_id);
            Ext.getCmp('statusVoucherIdReffvcr').setValue('new');
            Ext.getCmp('typeVoucherIdReffvcr').setValue('all');
        }, function() {
            if (me.pt_id) {
                Ext.getCmp('ptVoucherIdReffvcr').setValue(me.pt_id);
                Ext.getCmp('projectVoucherIdReffvcr').setValue(me.project_id);
            }
            Ext.getCmp('ptVoucherIdReffvcr').setValue(me.pt_id);
            Ext.getCmp('projectVoucherIdReffvcr').setValue(me.project_id);
            Ext.getCmp('statusVoucherIdReffvcr').setValue('new');
            Ext.getCmp('typeVoucherIdReffvcr').setValue('all');
            Ext.getCmp('btnselectreceipt').setVisible(true);
            me.fd = f;
            var gc = me.getReceiptidvcrgrid();
            var storear = gc.getStore();
            var fields = Ext.getCmp('MySuperBrowseWindow').getForm().getFieldValues();
            for (var x in fields) {
                storear.getProxy().setExtraParam(x, fields[x]);
            }
            storear.load({
                callback: function(records, options, success) {
                    gc.down("pagingtoolbar").doRefresh();
                    Ext.getCmp('ptVoucherIdReffvcr').setValue(me.pt_id);
                }
            });
        });
    },
    selectKasbon: function(el, ar) {
        var me = this;
        var localstore = 'selectedKasbon';
        me.kasbon_id_selected_arr = [];
        var browse = new Cashier.library.BrowseCashier();
        browse.init({
            controller: me,
            view: 'VoucherKasbonGrid',
            el: el,
            localStore: localstore,
            mode_read: "selectedkasbon",
            bukaFormSearch: true,
        });
        browse.showWindow(function() {
            if (me.pt_id) {
                Ext.getCmp('ptKasbonIdR').setValue(me.pt_id);
            }
            Ext.getCmp('ptKasbonIdR').setValue(me.pt_id);
        }, function() {
            Ext.getCmp('ptKasbonIdR').setValue(me.pt_id);
        });
        var gridar = me.getVoucherkasbongrid();
        var storear = gridar.getStore();
        var fields = Ext.getCmp('MySuperBrowseWindow').getForm().getFieldValues();
        for (var x in fields) {
            storear.getProxy().setExtraParam(x, fields[x]);
        }
        storear.loadPage();
    },
    scheduleSelect: function(v, tipeangsuran) {
        var me = this;
        var cmpformdata = Ext.getCmp('formdatavoucherID');
        console.log('is_f7_convert = ' + me.is_f7_convert);
        if (!cmpformdata) {
            var w = me.instantWindow('FormData', 990, 'Add Voucher', 'create', 'myVoucherWindow');
        } else {
            v.up("window").close();
        }
        var f = me.getFormdata();
        var kasbankID = f.down("[name=kasbank_id]").getValue();
        var key = (kasbankID ? "amount" : "remaining_balance");
        f.down('[name=dataflow]').setValue('I');
        
        if (tipeangsuran == 'kpr') {
            f.down('[name=artype_id]').setValue(3);
        }else{
            f.down('[name=artype_id]').setValue(1);
        }

        me.rowData = null;
        f.rowData = null;
        var me = this;
        var grid = me.getAngsurangrid();
        var row = grid.getSelectionModel().getSelection();
        var rec = grid.getSelectedRecord();
        var argrid = me.getDetailargrid();
        var totaldipick = 0;
        var newtotaldipick = 0;
        var harganetto = 0;
        var arrow = argrid.getStore();
        var notes = f.down('[name=description]').getValue();
        var rn = f.down("[name=receipt_notes]").getValue();
        var isnonppn = 0;
        var paymenttypeid = 0;
        arrow.each(function(recAngs) {
            totaldipick = totaldipick + accounting.unformat(recAngs.get("remaining_pay"));
        });
        var pmkno = '21/PMK/2021';

        var tmp_pmkno = null,
            tgl_berlaku_pmkno = null;
        Ext.Ajax.request({
            url: 'cashier/common/create',
            method: 'POST',
            async: false,
            params: {
                data: Ext.encode({
                    "project_id": 0,
                    "pt_id": 0,
                    "hideparam": "global_paramV2",
                    "globalname": "ppndtp_pmk_no"
                })
            },
            success: function(response) {
                var res = Ext.JSON.decode(response.responseText);
                var data = Ext.JSON.decode(res.data.value);

                tmp_pmkno = data.pmkno;
                tgl_berlaku_pmkno = data.tgl_berlaku;
            }
        })

        var current_project_id = 0;
        var current_pt_id = 0;
        var purchaseletter_id = 0;

        row.forEach(function(rx) {
            harganetto = accounting.unformat(rx.get("purchaseletter_harga_netto"));
            newtotaldipick = newtotaldipick + accounting.unformat(rx.get("oppaid"));
            isnonppn = rx.get("purchaseletter_isnonppn");
            paymenttypeid = rx.get("paymenttype_paymenttype_id");
            current_project_id = rx.get("project_project_id");
            current_pt_id = rx.get("pt_pt_id");
            purchaseletter_id = rx.get("purchaseletter_purchaseletter_id");

            if (tgl_berlaku_pmkno !== null && tmp_pmkno !== null) {
                if (Ext.Date.format(rx.get('duedate'), 'Y-m-d') >= tgl_berlaku_pmkno) {
                    pmkno = tmp_pmkno;
                } else if (Ext.Date.format(rx.get('duedate'), 'Y-m-d') >= '2021-07-30' && Ext.Date.format(rx.get('duedate'), 'Y-m-d') < tgl_berlaku_pmkno) {
                    pmkno = '103/PMK.010/2021';
                }
            } else {
                if (Ext.Date.format(rx.get('duedate'), 'Y-m-d') >= '2021-07-30') {
                    pmkno = '103/PMK.010/2021';
                }
            }
        });

        var persentase_insentive_ppn = 0;
        me.tools.ajax({
            params: {
                project_id: current_project_id,
                pt_id: current_pt_id,
                harga_netto: harganetto,
                purchaseletter_id: purchaseletter_id
            },
            form: f,
            success: function(data, model) {
                persentase_insentive_ppn = parseFloat(data.persen) / 100;
            }
        }, false).read('getpersentaseppndtp');

        newtotaldipick = Math.round((newtotaldipick + totaldipick) * persentase_insentive_ppn);
        totaldipick = Math.round(totaldipick * persentase_insentive_ppn);

        var newnotes = notes.replace('PPN DTP eks PMK No ' + pmkno + ' senilai Rp.' + accounting.formatMoney(totaldipick), '');
        var newrnotes = notes.replace('PPN DTP eks PMK No ' + pmkno + ' senilai Rp.' + accounting.formatMoney(totaldipick), '');
        f.down('[name=description]').setValue(newnotes);
        f.down('[name=receipt_notes]').setValue(newrnotes);
        var descriptiontemp = '';
        var descriptiontemp2 = '';
        f.rowData = rec;

        me.rowData = rec;
        me.projectId = rec.get("project_project_id");
        me.ptId = rec.get("pt_pt_id");
        me.paymentflag_id = rec.get("payment_paymentflag_id") === 1 ? 1 : 2; // 1 installment payment, 2 other payment
        var gridCoaDetail = me.getDetailvouchergrid();
        var rb = f.down("[name=amount]").getValue();
        if (me.browseHandler) {
            me.templateCoa = 1;
            me.isEdit = 1;
            f.setLoading("Please wait");
            me.is_erems = 0;
            me.voucherDetail.disableSave(me, true);

            f.down("[name=is_pickar]").setValue(1);

            row.forEach(function(rec) {

                f.rowData.data['cluster_id'] = rec.get('unit_cluster_id');
                if (me.paymentflag_id === 2) {
                    if (rec.get("paymenttype_paymenttype_id")) {
                        me.templateCoa = 2;
                    }
                    gridCoaDetail.down('toolbar [action=generate]').setDisabled(true);
                } else {
                    gridCoaDetail.down('toolbar [action=generate]').setDisabled(false);
                }
                if (tipeangsuran == 'kpr') {
                    me.templateCoa = 9;
                    f.down("[name=is_f9]").setValue("1");
                }

                if (rec.get("scheduletype_scheduletype") == 'TJ') {

                    if (rec.get("paymenttype_paymenttype_id") == '2') {

                        if (rec.get("project_project_id") == 5101) { //khusus vittorio tanpa project code

                            f.down('[name=description]').setValue(
                                f.down('[name=description]').getValue() + rec.get("unit_cluster") + ' ' +
                                f.down('[name=unit_unit_number]').getValue() + ' DENDA ' +
                                (rec.get("scheduletype_scheduletype") == 'INH' ? "ANGSURAN" : rec.get("scheduletype_description")) + ' \n'
                            );
                            f.down('[name=receipt_notes]').setValue(
                                f.down('[name=receipt_notes]').getValue() + rec.get("unit_cluster") + ' ' +
                                f.down('[name=unit_unit_number]').getValue() + ' DENDA ' +
                                (rec.get("scheduletype_scheduletype") == 'INH' ? "ANGSURAN" : rec.get("scheduletype_description")) + ' \n'
                            );

                        } else {
                            if (rec.get("project_subholding_id") != 1) {
                                if (rec.get("project_subholding_id") == 3 || rec.get("project_project_id") == 4065) {
                                    f.down('[name=description]').setValue(
                                        ' DENDA ' +
                                        rec.get("scheduletype_description") + ' ' + rec.get("termin") + ', ' + f.down('[name=description]').getValue()
                                    );
                                    f.down('[name=receipt_notes]').setValue(
                                        ' DENDA ' +
                                        rec.get("scheduletype_description") + ' ' + rec.get("termin") + ', ' + f.down('[name=receipt_notes]').getValue()
                                    );
                                } else {
                                    f.down('[name=description]').setValue(
                                        f.down('[name=description]').getValue() + rec.get("project_code") + '/' + rec.get("unit_cluster_code") + '/' +
                                        f.down('[name=unit_unit_number]').getValue() + ' DENDA ' +
                                        rec.get("scheduletype_description") + ' ' +
                                        ' A.N ' +
                                        f.down('[name=customer_name]').getValue() + ' \n'
                                    );
                                    f.down('[name=receipt_notes]').setValue(
                                        f.down('[name=receipt_notes]').getValue() + rec.get("project_code") + '/' + rec.get("unit_cluster_code") + '/' +
                                        f.down('[name=unit_unit_number]').getValue() + ' DENDA ' +
                                        rec.get("scheduletype_description") + ' ' +
                                        ' A.N ' +
                                        f.down('[name=customer_name]').getValue() + ' \n'
                                    );
                                }
                            } else {
                                descriptiontemp = descriptiontemp + ' DENDA ' + rec.get("scheduletype_description") + ', ' + f.down('[name=description]').getValue();
                                descriptiontemp2 = descriptiontemp2 + ' DENDA ' + rec.get("scheduletype_description") + ', ' + f.down('[name=receipt_notes]').getValue();
                                if (f.down('[name=receipt_notes]').getValue() == "" || f.down('[name=description]').getValue() == f.down('[name=receipt_notes]').getValue()) {
                                    f.down('[name=description]').setValue(descriptiontemp);
                                }
                                f.down('[name=receipt_notes]').setValue(descriptiontemp2);
                            }
                        }
                    } else {
                        if (rec.get("project_project_id") == 5101) { //khusus vittorio tanpa project code

                            f.down('[name=description]').setValue(
                                f.down('[name=description]').getValue() + rec.get("unit_cluster") + ' ' +
                                f.down('[name=unit_unit_number]').getValue() + ' ' +
                                (rec.get("scheduletype_scheduletype") == 'INH' ? "ANGSURAN" : rec.get("scheduletype_description")) + ' \n'
                            );
                            f.down('[name=receipt_notes]').setValue(
                                f.down('[name=receipt_notes]').getValue() + rec.get("unit_cluster") + ' ' +
                                f.down('[name=unit_unit_number]').getValue() + ' ' +
                                (rec.get("scheduletype_scheduletype") == 'INH' ? "ANGSURAN" : rec.get("scheduletype_description")) + ' \n'
                            );
                        } else {

                            if (rec.get("project_subholding_id") != 1) {
                                if (rec.get("project_subholding_id") == 3 || rec.get("project_project_id") == 4065) {
                                    f.down('[name=description]').setValue(
                                        ' BOOKING FEE ' + rec.get("termin") + ', ' + f.down('[name=description]').getValue()
                                    );
                                    f.down('[name=receipt_notes]').setValue(
                                        ' BOOKING FEE ' + rec.get("termin") + ', ' + f.down('[name=receipt_notes]').getValue()
                                    );
                                } else {
                                    f.down('[name=description]').setValue(
                                        f.down('[name=description]').getValue() + rec.get("project_code") + '/' + rec.get("unit_cluster_code") + '/' +
                                        f.down('[name=unit_unit_number]').getValue() + ' ' +
                                        rec.get("scheduletype_description") + ' ' +
                                        ' A.N ' +
                                        f.down('[name=customer_name]').getValue() + ' \n'
                                    );
                                    f.down('[name=receipt_notes]').setValue(
                                        f.down('[name=receipt_notes]').getValue() + rec.get("project_code") + '/' + rec.get("unit_cluster_code") + '/' +
                                        f.down('[name=unit_unit_number]').getValue() + ' ' +
                                        rec.get("scheduletype_description") + ' ' +
                                        ' A.N ' +
                                        f.down('[name=customer_name]').getValue() + ' \n'
                                    );
                                }
                            } else {

                                descriptiontemp = descriptiontemp + rec.get("scheduletype_description") + ', ' + f.down('[name=description]').getValue();
                                descriptiontemp2 = descriptiontemp2 + rec.get("scheduletype_description") + ', ' + f.down('[name=receipt_notes]').getValue();
                                if (f.down('[name=receipt_notes]').getValue() == "" || f.down('[name=description]').getValue() == f.down('[name=receipt_notes]').getValue()) {
                                    f.down('[name=description]').setValue(descriptiontemp);
                                }
                                f.down('[name=receipt_notes]').setValue(descriptiontemp2);
                            }
                        }
                    }
                } else {
                    if (rec.get("paymenttype_paymenttype_id") == '2') {

                        if (rec.get("project_project_id") == 5101) { //khusus vittorio tanpa project code

                            f.down('[name=description]').setValue(
                                f.down('[name=description]').getValue() + rec.get("unit_cluster") + ' ' +
                                f.down('[name=unit_unit_number]').getValue() + ' DENDA ' +
                                (rec.get("scheduletype_scheduletype") == 'INH' ? "ANGSURAN" : rec.get("scheduletype_description")) + ' \n'
                            );
                            f.down('[name=receipt_notes]').setValue(
                                f.down('[name=receipt_notes]').getValue() + rec.get("unit_cluster") + ' ' +
                                f.down('[name=unit_unit_number]').getValue() + ' DENDA ' +
                                (rec.get("scheduletype_scheduletype") == 'INH' ? "ANGSURAN" : rec.get("scheduletype_description")) + ' \n'
                            );
                        } else {
                            if (rec.get("project_subholding_id") != 1) {

                                if (rec.get("project_subholding_id") == 3 || rec.get("project_project_id") == 4065) {
                                    f.down('[name=description]').setValue(
                                        ' DENDA BOOKING FEE ' + rec.get("termin") + ', ' + f.down('[name=description]').getValue()
                                    );
                                    f.down('[name=receipt_notes]').setValue(
                                        ' DENDA BOOKING FEE ' + rec.get("termin") + ', ' + f.down('[name=receipt_notes]').getValue()
                                    );
                                } else {

                                    f.down('[name=description]').setValue(
                                        f.down('[name=description]').getValue() + rec.get("project_code") + '/' + rec.get("unit_cluster_code") + '/' +
                                        f.down('[name=unit_unit_number]').getValue() + ' DENDA ' +
                                        rec.get("scheduletype_description") + ' ' +
                                        rec.get("termin") + ' A.N ' +
                                        f.down('[name=customer_name]').getValue() + ' \n'
                                    );
                                    f.down('[name=receipt_notes]').setValue(
                                        f.down('[name=receipt_notes]').getValue() + rec.get("project_code") + '/' + rec.get("unit_cluster_code") + '/' +
                                        f.down('[name=unit_unit_number]').getValue() + ' DENDA ' +
                                        rec.get("scheduletype_description") + ' ' +
                                        rec.get("termin") + ' A.N ' +
                                        f.down('[name=customer_name]').getValue() + ' \n'
                                    );
                                }
                            } else {
                                descriptiontemp = descriptiontemp + ' DENDA ' + rec.get("scheduletype_description") + ' ' + rec.get("termin") + ', ' + f.down('[name=description]').getValue();
                                descriptiontemp2 = descriptiontemp2 + ' DENDA ' + rec.get("scheduletype_description") + ' ' + rec.get("termin") + ', ' + f.down('[name=receipt_notes]').getValue();
                                if (f.down('[name=receipt_notes]').getValue() == "" || f.down('[name=description]').getValue() == f.down('[name=receipt_notes]').getValue()) {
                                    f.down('[name=description]').setValue(descriptiontemp);
                                }
                                f.down('[name=receipt_notes]').setValue(descriptiontemp2);
                            }
                        }
                    } else {
                        if (rec.get("project_project_id") == 5101) { //khusus vittorio tanpa project code

                            f.down('[name=description]').setValue(
                                f.down('[name=description]').getValue() + rec.get("unit_cluster") + ' ' +
                                f.down('[name=unit_unit_number]').getValue() + ' ' +
                                (rec.get("scheduletype_scheduletype") == 'INH' ? "ANGSURAN" : rec.get("scheduletype_description")) + ' \n'
                            );
                            f.down('[name=receipt_notes]').setValue(
                                f.down('[name=receipt_notes]').getValue() + rec.get("unit_cluster") + ' ' +
                                f.down('[name=unit_unit_number]').getValue() + ' ' +
                                (rec.get("scheduletype_scheduletype") == 'INH' ? "ANGSURAN" : rec.get("scheduletype_description")) + ' \n'
                            );
                        } else {
                            if (rec.get("project_subholding_id") != 1) {
                                if (rec.get("project_subholding_id") == 3 || rec.get("project_project_id") == 4065) {
                                    f.down('[name=description]').setValue(
                                        rec.get("scheduletype_description") + ' ' + rec.get("termin") + ', ' + f.down('[name=description]').getValue()
                                    );
                                    f.down('[name=receipt_notes]').setValue(
                                        rec.get("scheduletype_description") + ' ' + rec.get("termin") + ', ' + f.down('[name=receipt_notes]').getValue()
                                    );
                                } else {
                                    f.down('[name=description]').setValue(
                                        f.down('[name=description]').getValue() + rec.get("project_code") + '/' + rec.get("unit_cluster_code") + '/' +
                                        f.down('[name=unit_unit_number]').getValue() + ' ' +
                                        rec.get("scheduletype_description") + ' ' +
                                        rec.get("termin") + ' A.N ' +
                                        f.down('[name=customer_name]').getValue() + ' \n'
                                    );
                                    f.down('[name=receipt_notes]').setValue(
                                        f.down('[name=receipt_notes]').getValue() + rec.get("project_code") + '/' + rec.get("unit_cluster_code") + '/' +
                                        f.down('[name=unit_unit_number]').getValue() + ' ' +
                                        rec.get("scheduletype_description") + ' ' +
                                        rec.get("termin") + ' A.N ' +
                                        f.down('[name=customer_name]').getValue() + ' \n'
                                    );
                                }
                            } else {

                                descriptiontemp = descriptiontemp + (rec.get("scheduletype_scheduletype") == 'INH' ? "ANGSURAN" : rec.get("scheduletype_description")) + ' ' + rec.get("termin") + ', ' + f.down('[name=description]').getValue();
                                descriptiontemp2 = descriptiontemp2 + (rec.get("scheduletype_scheduletype") == 'INH' ? "ANGSURAN" : rec.get("scheduletype_description")) + ' ' + rec.get("termin") + ', ' + f.down('[name=receipt_notes]').getValue();
                                if (f.down('[name=receipt_notes]').getValue() == "" || f.down('[name=description]').getValue() == f.down('[name=receipt_notes]').getValue()) {
                                    f.down('[name=description]').setValue(descriptiontemp);
                                }
                                f.down('[name=receipt_notes]').setValue(descriptiontemp2);
                            }
                        }

                    }
                }
                me.formToMoney(f);
                me.voucherAr.loadAR(me, rec);
                if (me.paymenthelperf7 > 0) {
                    argrid.down("toolbar [name=paymentall]").setValue(accounting.formatMoney(me.paymenthelperf7));
                    me.voucherAr.paymentTextFieldOnBlur(me);
                }
            });

            if (isnonppn == "1" && paymenttypeid != '2') {
                if (f.down('[name=receipt_notes]').getValue() == "" || f.down('[name=description]').getValue() == f.down('[name=receipt_notes]').getValue()) {
                    f.down('[name=description]').setValue(f.down('[name=description]').getValue() + '\n PPN DTP eks PMK No ' + pmkno + ' senilai Rp.' + accounting.formatMoney(newtotaldipick));
                }
                f.down('[name=receipt_notes]').setValue(f.down('[name=receipt_notes]').getValue() + '\n PPN DTP eks PMK No ' + pmkno + ' senilai Rp.' + accounting.formatMoney(newtotaldipick));
            }
            f.down("[name=kasbank_date]").setValue(me.dateNow);
            f.down("[name=payment_date]").setValue(me.dateNow);
            me.getSelectedSchedule();
            me.voucherAr.GridAr(me);
            me.voucherAr.setSumDetailAR(me);
            me.voucherAr.checkCountAr(me);

            if (me.is_f7_convert && me.is_f7_convert == 1) {
                me.localStore.subdetailcoa.loadData([],false);
                me.localStore.subdetailcoa.load({
                    params: {
                        voucherdetail_id: 0
                    },
                    callback: function (rec, op) {
                        me.attachModel(op, me.localStore.subdetailcoa, true);
                    }
                });
                me.localStore.subdetailcoa.loadData([],false);
                me.voucherAr.getTotalSumAr(me);
                f.down("[name=amount]").setValue(accounting.formatMoney(me.totalSumAr));
                //generateCoa: function (c, template, state, kasbank_id, paymentId, callback, loading) {
                me.voucherDetail.generateCoa(me, me.templateCoa, 'click', '', '', function () {

                });
            }

            f.setLoading(false);
        } else {
            me.tools.alert.warning("Failed to get AR, Please try select AR again.");
        }
    },
    changeFlow: function(val) {
        var me = this;
        var f = me.getFormdata();
        var grid = me.getDetailvouchergrid();
        if (val.value === "I") {
            f.down('label[id=dataflowId]').setText('IN');
            f.down('[name=kwitansi_date]').setVisible(true);
            f.down('[name=kwitansi_date]').setDisabled(false);
            f.down('[name=duedate]').setVisible(false);
            f.down('[name=duedate]').setDisabled(true);
            f.down('[name=jenis_spkorsop_id]').setVisible(false);
            f.down('[name=spk]').setVisible(false);
            f.down('[name=payment_receipt_no]').setVisible(true);
            me.usemasterreceipt();
            if (f.down("[name=unit_unit_id]").getValue() > 0) {

            } else {
                f.down('[name=datatype]').setValue('0');
            }
            f.down('[name=cheque_cheque_no]').setValue('');
            f.down('[name=cheque_cheque_id]').setValue('');
            me.dataflow = "IN";
            Ext.getCmp('formdatavoucherprefix_voucherprefix_id').allowBlank = false;
            f.down('[name=voucherprefix_voucherprefix_id]').setReadOnly(false);
            Ext.getCmp('btnListCopy').setVisible(false);
            f.down('[action=browsevoucher]').setVisible(false);
            f.down('[action=browseprojectloan]').setVisible(false);
            if (f.down("[name=payment_paymentflag_id]").getValue() > 0 || f.down("[name=unit_unit_id]").getValue() > 0) {
                Ext.getCmp('TabVoucherId').getComponent('tabNonlink').tab.hide();
            } else {
                if (f.down("[name=kasbank_id]").getValue() > 0) {

                } else {
                    me.loadModelNonlink(0);
                }
                Ext.getCmp('TabVoucherId').getComponent('tabNonlink').tab.show();
            }
        } else {
            f.down('label[id=dataflowId]').setText('OUT');
            f.down('[name=kwitansi_date]').setVisible(false);
            f.down('[name=kwitansi_date]').setDisabled(true);
            f.down('[name=duedate]').setVisible(true);
            f.down('[name=duedate]').setDisabled(false);
            f.down('[name=jenis_spkorsop_id]').setVisible(true);
            f.down('[name=spk]').setVisible(true);
            f.down('[name=payment_receipt_no]').setVisible(false);
            f.down('[action=browsereceiptid]').setVisible(false);
            f.down('[action=generatekwitansinumber]').setVisible(false);
            f.down('[action=browseremovereceiptid]').setVisible(false);
            f.down('[name=cheque_cheque_no]').setValue('');
            f.down('[name=cheque_cheque_id]').setValue('');
            f.down('[name=voucherprefix_voucherprefix_id]').setReadOnly(true);
            me.dataflow = "OUT";
            Ext.getCmp('btnListCopy').setVisible(true);
            f.down('[action=browsevoucher]').setVisible(true);
            f.down('[action=browseprojectloan]').setVisible(true);
            f.down('[name=voucherprefix_voucherprefix_id]').allowBlank = true;
            f.down('[name=voucherprefix_voucherprefix_id]').clearInvalid();
            f.down("[name=payment_receipt_no]").setValue('');
            Ext.getCmp('TabVoucherId').getComponent('tabNonlink').tab.hide();
            Ext.getCmp('TabVoucherId').setActiveTab('tabDetailVoucher');

            if (f.down('[name=unit_unit_id]').getValue() != '' && f.down('[name=purchaseletter_customer_id]').getValue() != '') {

            } else {
                f.down('[name=datatype]').setValue('1');
            }

            me.getNonlinkgrid().getStore().loadData([], false);
            me.isnonlink = '0';
            f.down('[name=payment_receipt_no]').setValue('');
        }
    },
    changeDataType: function(val) {
        var me = this;
        var f = me.getFormdata();
        f.down('[name=vendor_bankacc_id]').setVisible(false);
        f.down('[id=btnbrowsereffrek]').setVisible(false);
        f.down('[name=vendor_bank_name]').setVisible(false);
        f.down('[name=vendor_bank_account_name]').setVisible(false);
        f.down('[name=vendor_bank_currency]').setVisible(false);
        f.down('[name=remarks]').setVisible(false);
        if (val.value == '2') {
            f.down('[name=unit_unit_number]').setVisible(true);
            f.down("button[action=browseData]").setDisabled(false);
        } else if (val.value == '1') {
            if (f.down("[name=dataflow]").getValue() == "O") {
                f.down('[name=vendor_bankacc_id]').setVisible(true);
                f.down('[id=btnbrowsereffrek]').setVisible(true);
                f.down('[name=vendor_bank_name]').setVisible(true);
                f.down('[name=vendor_bank_account_name]').setVisible(true);
                f.down('[name=vendor_bank_currency]').setVisible(true);
                f.down('[name=remarks]').setVisible(true);
                me.loadVendorBank();
            }
        } else {
            f.down('[name=unit_unit_number]').setVisible(false);
            f.down('[name=unit_unit_number]').setValue('');
            f.down('[name=unit_unit_id]').setValue('');
            f.down('[name=purchaseletter_customer_id]').setValue('');
            me.checkMandatory();
        }
        me.disableDatatype();
    },
    disableDatatype: function() {
        var me = this;
        var f = me.getFormdata();
        f.down('[name=customer_name]').setValue('');
        f.down('[name=vendor_vendor_id]').setValue('');
        f.down('[name=unit_unit_id]').setValue('');
    },
    getSelectedScheduleEsc: function(callback) {
        var me = this;
        me.schedule_id = null;
        me.amountSelected = null;
        me.totalTemp = null;
        me.paymenttype_id = null;
        var sch = '';
        var amt = '';
        var total = 0;
        var paymenttype_id = '';
        var gridvoucherar = me.getDetailescrowgrid();
        var storevoucherar = gridvoucherar.getStore();
        storevoucherar.each(function(rec) {
            sch += rec.get("schedule_id") + "~";
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
    getSelectedSchedule: function(callback) {
        var me = this;
        me.schedule_id = null;
        me.amountSelected = null;
        me.totalTemp = null;
        me.paymenttype_id = null;
        var sch = '';
        var schdn = ''; //debit note
        var amt = '';
        var amtdn = ''; //debitnote
        var total = 0;
        var paymenttype_id = '';
        var gridvoucherar = me.getDetailargrid();
        var storevoucherar = gridvoucherar.getStore();
        storevoucherar.each(function(rec) {
            sch += rec.get("schedule_id") + "~";
            if (rec.get("is_debitnote") == 1 || rec.get("is_debitnote") == true) {
                amt += (parseFloat(accounting.unformat(rec.get("remaining_pay")) + accounting.unformat(rec.get("debitnote")))) + "~";

                if (accounting.unformat(rec.get("debitnote")) != 0 && rec.get("debitnote") != undefined && rec.get("debitnote") != null) {
                    amtdn += accounting.unformat(rec.get("debitnote") < 0 ? rec.get("debitnote") * -1 : rec.get("debitnote")) + "~";
                    schdn += rec.get("schedule_id") + "~";
                }
            } else {
                amt += parseFloat(rec.get("remaining_pay")) + "~";
            }
            paymenttype_id +=
                rec.get('paymenttype_paymenttype_id') ? rec.get('paymenttype_paymenttype_id') + "~" : 0 + "~";
            total += parseFloat(rec.get('remaining_balance'));
        });
        me.schedule_id = sch;
        me.amountSelected = amt;
        me.dnschedule_id = schdn;
        me.amountdnSelected = amtdn;
        me.paymenttype_id = paymenttype_id;
        me.totalTemp = accounting.formatMoney(total);
        if (typeof callback === "function") {
            callback();
        }
    },
    cancelFormdata: function() {
        var me = this;
        var grid = me.getGrid();
        var gridCoaDetail = me.getDetailvouchergrid();
        var griArDetail = me.getDetailargrid();
        gridCoaDetail.getStore().loadData([], false);
        griArDetail.getStore().loadData([], false);
        grid.getStore().rejectChanges();
    },
    formToMoney: function(f) {
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
    checkArIsEmptyEsc: function() {
        var me = this;
        var f = me.getFormdata();
        var griArDetail = me.getDetailescrowgrid();
        var store = griArDetail.getStore();
        var count = store.getCount();
        var gridCoaDetail = me.getDetailvouchergrid();
        if (count == '0') {
            me.isEdit = null;
            gridCoaDetail.getStore().loadData([], false);
            gridCoaDetail.down('toolbar [action=generate]').setDisabled(true);
            f.down("[name=amount]").setValue('0.00');
        } else {
            me.isEdit = 1;
        }
    },
    checkArIsEmpty: function() {
        var me = this;
        var f = me.getFormdata();
        var griArDetail = me.getDetailargrid();
        var store = griArDetail.getStore();
        var count = store.getCount();
        var gridCoaDetail = me.getDetailvouchergrid();
        if (count == '0') {
            me.isEdit = null;
            gridCoaDetail.getStore().loadData([], false);
            gridCoaDetail.down('toolbar [action=generate]').setDisabled(true);
            f.down("[name=amount]").setValue('0.00');
        } else {
            me.isEdit = 1;
        }
    },
    getCustomRequestCombobox: function(paramname, val, val2, val3, field, model, submodel, form, param, callback, loading, displayall) {
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
            form: form,
            success: function(data, model, v) {
                try {
                    var obj = [];
                    for (var key in data) {
                        obj = data[key];
                    }
                    if (field) {
                        me.tools.wesea(obj, form.down("[name=" + field + "]")).comboBox(displayall, function() {
                            if (typeof callback === "function") {
                                callback();
                            }
                        });
                    } else {
                        if (typeof callback === "function") {
                            callback();
                        }
                    }
                    if (param) {
                        me.afterDataDetailInit(param, f);
                    }


                } catch (err) {
                    console.log(err.message);
                    me.tools.alert.warning("Failed to load ini, please try re-open menu.");
                    f.setLoading(false);
                }
                if (!loading) {
                    f.setLoading(false);
                }

            }
        }).read('customrequest');
    },
    getCustomRequestComboboxV2: function(paramname, val, val2, val3, field, model, submodel, form, param, callback, loading, displayall, val4) {
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
                value4: val4,
                model: model,
                submodel: sm
            },
            form: form,
            success: function(data, model, v) {
                try {
                    var obj = [];
                    for (var key in data) {
                        obj = data[key];
                    }
                    if (field) {
                        me.tools.wesea(obj, form.down("[name=" + field + "]")).comboBox(displayall, function() {
                            if (typeof callback === "function") {
                                callback();
                            }
                        });
                    } else {
                        if (typeof callback === "function") {
                            callback();
                        }
                    }
                    if (param) {
                        me.afterDataDetailInit(param, f);
                    }


                } catch (err) {
                    console.log(err.message);
                    me.tools.alert.warning("Failed to load ini, please try re-open menu.");
                    f.setLoading(false);
                }
                if (!loading) {
                    f.setLoading(false);
                }

            }
        }).read('customrequest');
    },
    mainDataSave: function(call) {
        var me = this;

        var f = me.getFormdata();
        var grid = me.getDetailvouchergrid();
        var temprealized = f.down("[name=is_temp_realized]").getValue();
        var voucherdate = f.down("[name=realization_date]").getValue();
        var pt_pt_id = f.down("[name=pt_pt_id]").getValue();
        var project_project_id = f.down("[name=project_project_id]").getValue();
        var unit = f.down("[name=unit_unit_id]").getValue();
        var purchaseletter_purchaseletter_id = f.down("[name=purchaseletter_purchaseletter_id]").getValue();
        var argridbrowse = Ext.getCmp('browseangsurangrid');
        var escrowgridbrowse = Ext.getCmp('browseescrowgrid');
        var totalpayment = accounting.unformat(f.down("[name=amount]").getValue());
        var totalpaydetail = accounting.unformat(f.down("[name=sum_pay]").getValue());
        var is_pickar = f.down("[name=is_pickar]").getValue();
        var can_edit_amount = 0;

        if (me.is_pt_cr == 1) {
            can_edit_amount = 1;
        }

        can_edit_amount = 1;

        if (can_edit_amount == 0) {
            if (me.voucher_id > 0 && accounting.unformat(f.down("[name=first_amount]").getValue()) != accounting.unformat(f.down("[name=amount]").getValue()) && (f.down("[name=vendor_bank_currency]").getValue() != 'USD')) {
                me.tools.alert.warning('Voucher ini adalah voucher department. Nilai total voucher tidak boleh berubah dari voucher department.');
                return false;
            }
        }

        if ( me.is_realized > 0 && accounting.unformat(f.down("[name=first_amount]").getValue()) != accounting.unformat(f.down("[name=amount]").getValue())) {
            me.tools.alert.warning('Setelah direalisasi, Nilai total voucher tidak boleh berubah dari nilai awal.');
            return false;
        }
        if ((temprealized == true || temprealized == 1) && accounting.unformat(f.down("[name=first_amount]").getValue()) != accounting.unformat(f.down("[name=amount]").getValue())) {
            me.tools.alert.warning('Voucher dalam status temporary realisasi, Nilai total voucher tidak boleh berubah dari nilai awal.');
            return false;
        }
        if (me.paymentflag_id === 1) {
            if ((!unit || !purchaseletter_purchaseletter_id) && f.down("[name=is_f9]").getValue() != '1') {
                console.log('unit_id / purchaseletter_id gagal terbaca!');
                me.tools.alert.warning('Failed to response, Please reopen data again.');
                return false;
            }
        }

        var arGrid = me.getDetailargrid().getStore().getCount();
        var arEscrowGrid = me.getDetailescrowgrid().getStore().getCount();

        if (is_pickar == 1 && (arGrid == 0 && arEscrowGrid == 0)) {
            me.tools.alert.warning("AR tidak boleh kosong");
            return false;
        }

        if (f.getForm().isValid()) {
            if (totalpayment !== 0 || (totalpayment == 0 && grid.getStore().getCount() > 0)) {
                if (me.paymentflag_id !== 0 || me.paymentflag_id) {
                    if (totalpayment === totalpaydetail) { //jika total header sama dengan detail
                        if (me.is_posting || me.is_realized) {
                            me.voucherDetail.getVoucherIdv2(me, voucherdate, 'create', pt_pt_id, project_project_id, function() {
                                if (me.is_closing !== 0) {
                                    me.tools.alert.warning(me.closing_msg);
                                    f.setLoading(false);
                                    return false;
                                } else {
                                    if (me.paymentflag_id === 1) {
                                        me.checkUnit(f, unit, purchaseletter_purchaseletter_id, function() {
                                            if (me.is_closewarning === 1) {
                                                me.voucherAr.checkSchedule(me, function() {
                                                    if (me.is_closewarning2 === 0) {
                                                        f.setLoading(false);
                                                        me.mainSave(call);
                                                    }
                                                }, true, true);
                                            }
                                        });
                                    } else {
                                        me.mainSave(call);
                                    }
                                }
                            }, f, true);
                        } else {
                            if (me.paymentflag_id === 1) {
                                me.checkUnit(f, unit, purchaseletter_purchaseletter_id, function() {
                                    if (me.is_closewarning === 1) {
                                        me.voucherAr.checkSchedule(me, function() {
                                            if (me.is_closewarning2 === 0) {
                                                f.setLoading(false);
                                                me.mainSave(call);
                                            }
                                        }, true, true);
                                    }
                                });
                            } else {
                                me.mainSave(call);
                            }
                        }

                    } else {
                        if (me.paymentflag_id) {
                            Ext.Msg.show({
                                title: 'Warning Info',
                                msg: 'Total amount of header vouchers is different from the details, its okay to save this data?',
                                buttons: Ext.Msg.YESNOCANCEL,
                                icon: Ext.Msg.QUESTION,
                                buttonText: {
                                    yes: 'Yes, Save this voucher',
                                    no: 'No, Re-Generate detail voucher'
                                },
                                fn: function(clicked) {
                                    if (clicked === "yes") {
                                        me.saved_id = 0;
                                        if (me.is_posting || me.is_realized) {
                                            me.voucherDetail.getVoucherIdv2(me, voucherdate, 'create', pt_pt_id, project_project_id, function() {
                                                if (me.is_closing !== 0) {
                                                    me.tools.alert.warning(me.closing_msg);
                                                    f.setLoading(false);
                                                    return false;
                                                } else {
                                                    if (me.paymentflag_id === 1) {
                                                        me.checkUnit(f, unit, purchaseletter_purchaseletter_id, function() {
                                                            if (me.is_closewarning === 1) {
                                                                me.voucherAr.checkSchedule(me, function() {
                                                                    if (me.is_closewarning2 === 0) {
                                                                        f.setLoading(false);
                                                                        me.mainSave(call);
                                                                    }
                                                                }, true, true);
                                                            }
                                                        }, true);
                                                    } else {
                                                        me.mainSave(call);
                                                    }
                                                }
                                            }, f, true);
                                        } else {
                                            if (me.paymentflag_id === 1) {
                                                me.checkUnit(f, unit, purchaseletter_purchaseletter_id, function() {
                                                    if (me.is_closewarning === 1) {
                                                        me.voucherAr.checkSchedule(me, function() {
                                                            if (me.is_closewarning2 === 0) {
                                                                f.setLoading(false);
                                                                me.mainSave(call);
                                                            }
                                                        }, true, true);
                                                    }
                                                }, true);
                                            } else {
                                                me.mainSave(call);
                                            }
                                        }
                                    }
                                    if (clicked === "no") {
                                        me.isEdit = 0;
                                        //Rizal 31 Okt 2019
                                        var state = f.up("window").state;
                                        if (state == 'update') {
                                            me.localStore.subdetailcoa.loadData([], false);
                                            me.localStore.subdetailcoa.load({
                                                params: {
                                                    voucherdetail_id: 0
                                                },
                                                callback: function(rec, op) {
                                                    me.attachModel(op, me.localStore.subdetailcoa, true);
                                                }
                                            });
                                            me.localStore.subdetailcoa.loadData([], false);
                                        }
                                        //
                                        me.voucherAr.getTotalSumAr(me);
                                        me.voucherDetail.generateCoa(me, me.templateCoa, 'click`', '', '', function() {
                                            Ext.getCmp('TabVoucherId').setActiveTab('tabDetailVoucher');
                                            me.voucherDetail.sumDetail(me);
                                        });
                                    }
                                }
                            });
                        } else {
                            me.saved_id = 0;
                            if (me.is_posting || me.is_realized) {
                                me.voucherDetail.getVoucherIdv2(me, voucherdate, 'create', pt_pt_id, project_project_id, function() {
                                    if (me.is_closing !== 0) {
                                        me.tools.alert.warning(me.closing_msg);
                                        f.setLoading(false);
                                        return false;
                                    } else {
                                        me.mainSave(call);
                                    }
                                }, f, true);
                            } else {
                                me.mainSave(call);
                            }
                        }
                    }
                    //a
                } else {
                    me.saved_id = 0;
                    if (f.down("[name=dataflow]").getValue() == "I" && me.isnonlink == '1') {

                        var grnl = me.getNonlinkgrid();
                        var nlstore = grnl.getStore();
                        var amt = 0;
                        if (nlstore.getCount() > 0) {
                            nlstore.each(function(rc) {
                                amt = parseFloat(accounting.unformat(rc.get("amount"))) + accounting.unformat(amt);
                            });
                        }
                        if (totalpayment != amt && amt != 0) {
                            Ext.Msg.show({
                                title: 'Warning Info',
                                msg: 'Nilai nonlink dengan total nilai coa berbeda, lanjutkan simpan data?',
                                buttons: Ext.Msg.YESNOCANCEL,
                                icon: Ext.Msg.QUESTION,
                                buttonText: {
                                    yes: 'Yes, Save this voucher',
                                    no: 'No, Re-Generate detail voucher'
                                },
                                fn: function(clicked) {
                                    if (clicked === "yes") {
                                        me.mainSave(call);
                                    }
                                    if (clicked === "no") {
                                        me.isnonlink = '0';
                                        var state = f.up("window").state;
                                        if (state == 'update') {
                                            me.localStore.subdetailcoa.loadData([], false);
                                            me.localStore.subdetailcoa.load({
                                                params: {
                                                    voucherdetail_id: 0
                                                },
                                                callback: function(rec, op) {
                                                    me.attachModel(op, me.localStore.subdetailcoa, true);
                                                }
                                            });
                                            me.localStore.subdetailcoa.loadData([], false);
                                        }
                                        //
                                        var amt = '';
                                        var paymenttypeid = '';
                                        nlstore.each(function(rc) {
                                            amt += parseFloat(rc.get("amount")) + "~";
                                            paymenttypeid += rc.get('paymenttype_id') + "~";
                                        });
                                        me.paymenttype_id = paymenttypeid;
                                        me.amountSelected = amt;
                                        me.templateCoa = 15;
                                        me.voucherDetail.generateCoa(me, 15, 'click', '', '', function() {
                                            me.voucherDetail.generatesubdetail(me, 'customer_vendor_name', 0, 'click');
                                            Ext.getCmp('TabVoucherId').setActiveTab('tabDetailVoucher');
                                            me.voucherDetail.sumDetail(me);
                                        });
                                    }
                                }
                            });
                        } else {

                            if (me.is_posting || me.is_realized) {
                                me.voucherDetail.getVoucherIdv2(me, voucherdate, 'create', pt_pt_id, project_project_id, function() {
                                    if (me.is_closing !== 0) {
                                        me.tools.alert.warning(me.closing_msg);
                                        f.setLoading(false);
                                        return false;
                                    } else {
                                        me.mainSave(call);
                                    }
                                }, f, true);
                            } else {
                                me.mainSave(call);
                            }
                        }
                    } else {
                        if (me.is_posting || me.is_realized) {
                            me.voucherDetail.getVoucherIdv2(me, voucherdate, 'create', pt_pt_id, project_project_id, function() {
                                if (me.is_closing !== 0) {
                                    me.tools.alert.warning(me.closing_msg);
                                    f.setLoading(false);
                                    return false;
                                } else {
                                    me.mainSave(call);
                                }
                            }, f, true);
                        } else {
                            me.mainSave(call);
                        }
                    }

                }
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
        //    }

    },
    mainSave: function(call) {
        var me                 = this;
        var f                  = me.getFormdata();
        var grid               = me.getGrid();
        var gridcoadetail      = me.getDetailvouchergrid();
        var gridar             = me.getDetailargrid();
        var gridescrow         = me.getDetailescrowgrid();
        var gridother          = me.getOtherpaymentgrid();
        var jsonDataEncode     = [];
        var temp               = me.localStore.subdetailcoa;
        var recselected        = grid.getSelectedRecord();
        var detailgridstore    = gridcoadetail.getStore();
        var autogenerateschema = false;
        var pl_id              = f.down("[name=purchaseletter_purchaseletter_id]").getValue();
        var error_checkbudget  = 0;
        var msg_checkbudget    = '';
        var kasbank_date       = f.down("[name=kasbank_date]").getValue();
        var month_name         = kasbank_date.toLocaleString('default', {month : 'long'});
        temp.clearFilter(true);

        //Rizal 22 Mei 2019
        var receiptno = f.down("[name=payment_receipt_no]").getValue();
        var is_f9 = f.down("[name=is_f9]").getValue();
        var dataflow = f.down("[name=dataflow]").getValue();
        if (dataflow == 'I' && receiptno == '' && me.paymentflag_id == 1) {
            if (f.down("[name=subholding_id]").getValue() == '1') {
                if (is_f9 != '1') {
                    me.tools.alert.info("This receipt no is an empty. Please insert receipt no first");
                    return false;
                }
            } else {
                if (is_f9 != '1') {
                    me.tools.alert.info("This receipt no is an empty. Please insert receipt no first");
                    return false;
                }
            }
        }
        //

        //Rizal 22 Juni 2020
        if (f.down("[name=project_project_id]").getValue() == '4029') {
            var totaldetail = 0;

            detailgridstore.each(function(rec) {
                totaldetail = totaldetail + 1;
            });
            if (totaldetail > 6) {
                me.tools.alert.warning("Baris detail pada voucher ini melebih ketentuan 6 baris. Silahkan buat menjadi voucher terpisah.");
                return false;
            }
        }
        //

        // VALIDASI GENERATE PAJAK
        var errorpajak = 0;
        var state = f.up('window').state.toLowerCase();
        detailgridstore.each(function(record, index) {
            console.log(record);
            var result_budget;
            var checkppn               = 0;
            var checkpph               = 0;
            var ppn_tipepajakdetail_id = record.get('ppn_tipepajakdetail_id');
            var ppn_percentage         = record.get('ppn_percentage');
            var is_ppn                 = record.get('is_ppn');
            var pph_tipepajakdetail_id = record.get('pph_tipepajakdetail_id');
            var pph_percentage         = record.get('pph_percentage');
            var is_pph                 = record.get('is_pph');
            var setupcashflow_id       = record.get('cashflow_setupcashflow_id');
            var amount                 = record.get('amount');

            if (ppn_tipepajakdetail_id != "" && parseFloat(ppn_percentage) != 0) {
                checkppn = 1;
            }

            if (pph_tipepajakdetail_id != "" && parseFloat(pph_percentage) != 0) {
                checkpph = 1;
            }

            if (state == 'create') {
                // BARU BUAT DAN BELUM GENERATE SAMA SEKALI
                if (me.flaggeneratepajak == 1 && (checkppn == 1 || checkpph == 1)) {
                    errorpajak++;
                }

                if (checkppn == 1 || checkpph == 1) {
                    errorpajak++;
                }
                if (is_ppn > 0 || is_pph > 0) {
                    errorpajak = 0;
                }
            } else {
                // SUDAH BUAT TAPI BELUM DI GENERATE PADAHAL ADA PAJAKNYA
                if (checkppn == 1 || checkpph == 1) {
                    errorpajak++;
                }
                if (is_ppn > 0 || is_pph > 0) {
                    errorpajak = 0;
                }

                // UBAH NOMINAL
                if (me.flagchangeamountpajak > 0) {
                    errorpajak++;
                }
            }

            result_budget = me.checkbudgetcf(setupcashflow_id, amount);

            if (result_budget.result == 1) {
                error_checkbudget++;
                msg_checkbudget = msg_checkbudget + 'Casflow ' + record.get('cashflowtype_cashflowtype') + ' pada budget' + result_budget.msg + ' bulan ' + month_name + ' sudah melebihi batas. <br>';
            }

        });

        // COMMENT INI KALO MISALNYA MASIH ADA BUGS
        /*if ( errorpajak > 0 ) {
            me.tools.alert.warning("Silahkan generate pajak terlebih dahulu.");
            return false;
        }*/
        /*console.log('GO');
        return;*/

        var hasSpace = f.down("[name=payment_receipt_no]").getValue().indexOf(' ') >= 0;
        if (hasSpace && f.down("[name=subholding_id]").getValue() == '1' && dataflow == 'I') {
            me.tools.alert.info("No Kwitansi memiliki spasi. Silahkan hapus spasi pada kolom no kwitansi");
            return false;
        }

        if (temp.data.items === undefined || temp.data.items == 0) {
            // me.tools.alert.warning("Error in sub-store please refresh");
            // return 0;
        }

        temp.each(function(rec) {
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
                voucherdetail_amount: rec.get('voucherdetail_amount'),
                voucherdetail_dataflow: rec.get('voucherdetail_dataflow'),
                voucherdetail_indexdata: rec.get('voucherdetail_indexdata'),
                voucherdetail_remarks: rec.get('voucherdetail_remarks'),
                voucherdetail_voucherdetail_id: rec.get('voucherdetail_voucherdetail_id'),
                vouchersubdetail_id: rec.get('vouchersubdetail_id')
            });
        });
        var state = f.up("window").state;
        me.saved_id = 0;
        var ceksubdulu = me.validasiSubCoaSaatSave();
        var allowsave = true;
        var allowmsg = '';
        if (ceksubdulu[0]['is_allowed'] == false) {
            allowsave = false;
            allowmsg = ceksubdulu[0]['message'];
        }

        var xc = grid.getSelectionModel().getCount();
        if (xc === 1) {

            //cek nilai coa cashbon
            if (recselected.get("kasbondept_no") != '' && recselected.get("kasbondept_no") != null) {
                var gridCashbonDetail = me.getCashbonpaymentgrid().getStore();
                gridCashbonDetail.each(function(reccd) {
                    var totalamountcoa = 0;
                    detailgridstore.each(function(recdg) {
                        if (recdg.get("kasbondept_id") == reccd.get("kasbondept_id")) {
                            totalamountcoa = totalamountcoa + accounting.unformat(recdg.get("amount"));
                        }
                    });
                    var amount1 = accounting.unformat(totalamountcoa);
                    var amount2 = accounting.unformat(reccd.get("pay_amount"));
                    if (amount1.toFixed(2) !== amount2.toFixed(2)) {
                        allowsave = false;
                        allowmsg = allowmsg + '<br> Pastikan total nilai di detail voucher setiap nomor cashbon ' + reccd.get("kasbondept_no") + ' sama dengan kolom pay di tab cashbon payment.' + ' Detail voucher ( ' + amount1.toFixed(2) + ' ) , cashbon payment ( ' + amount2.toFixed(2) + ' )';
                    }
                });
            }
        }

        if (error_checkbudget > 0) {
            var budgetConfirmBox = Ext.Msg.confirm('Confirmation', msg_checkbudget + 'Lanjutkan ? ', function (btn) {
                if (btn == 'yes') {
                    if (allowsave == true) {
                        if (f.down("[name=subholding_id]").getValue() == '1' && is_f9 == '1' && state == 'create') {
                            Ext.Msg.confirm('Confirmation', 'Izinkan generate otomatis schema escrow by system jika belum ada?', function(btnc) {
                                if (btnc == 'yes') {
                                    autogenerateschema = true;
                                } else {
                                    autogenerateschema = false;
                                }
                                me.insSave({
                                    form: f,
                                    grid: grid,
                                    finalData: function(data) {
                                        data["paymentflag"] = me.paymentflag_id;
                                        data["paymenttype_id"] = me.paymenttype_id;
                                        data["detailcoa"] = gridcoadetail.getJson();
                                        data["attachmentdetail"] = me.getAttachmentdetailgrid().getJson();
                                        data["subdetailcoa"] = jsonDataEncode ? JSON.parse(Ext.encode(jsonDataEncode)) : [];
                                        data["detailar"] = me.paymentflag_id == "1" || me.paymentflag_id == "2" ? gridar.getJson() : [];
                                        data["detailescrow"] = me.paymentflag_id == "4" ? gridescrow.getJson() : [];
                                        data["detailotherpayment"] = me.paymentflag_id == "5" ? gridother.getJson() : [];
                                        data['deletedRows'] = f.deletedRows;
                                        data['deletedsubRows'] = f.deletedsubRows;
                                        data["detailnonlink"] = me.getNonlinkgrid().getJson();
                                        data['deletedOtherPaymentRows'] = f.deletedOtherPaymentRows;
                                        data['deletednonlink'] = f.deletedNonlinkRows;
                                        data['deletedarpayment'] = f.deletedArPaymentRows;
                                        data['deletedarpaymentesc'] = f.deletedArPaymentRowsEsc;
                                        data['deletedattachment'] = f.deletedattachment;
                                        data['is_reimburse'] = me.is_reimburse;
                                        data['reimburse_kasbank_id'] = me.reimburse_kasbank_id;
                                        data['is_pettycashloan'] = me.is_pettycashloan;
                                        data['pettycashloan_kasbon_id'] = me.pettycashloan_kasbon_id;
                                        data['is_f7_convert'] = me.is_f7_convert;
                                        return data;
                                    },
                                    sync: true,
                                    callback: function(a, b, c) {},
                                    cb: function() { //ini baru jaalan callbacknya, di atas gajalan
                                        if (autogenerateschema) {
                                            Ext.Ajax.request({
                                                url: 'cashier/voucher/read',
                                                method: 'POST',
                                                async: false,
                                                params: {
                                                    purchaseletter_id: pl_id,
                                                    mode_read: 'autogenerateschema'
                                                },
                                                success: function(response) {

                                                },
                                                failure: function(response) {

                                                }
                                            });
                                        }
                                        if (typeof call === "function") {
                                            call();
                                        }
                                    }
                                });
                            });

                        } else {
                            me.insSave({
                                form: f,
                                grid: grid,
                                finalData: function(data) {
                                    data["paymentflag"] = me.paymentflag_id;
                                    data["paymenttype_id"] = me.paymenttype_id;
                                    data["detailcoa"] = gridcoadetail.getJson();
                                    data["attachmentdetail"] = me.getAttachmentdetailgrid().getJson();
                                    data["subdetailcoa"] = jsonDataEncode ? JSON.parse(Ext.encode(jsonDataEncode)) : [];
                                    data["detailar"] = me.paymentflag_id == "1" || me.paymentflag_id == "2" ? gridar.getJson() : [];
                                    data["detailescrow"] = me.paymentflag_id == "4" ? gridescrow.getJson() : [];
                                    data["detailotherpayment"] = me.paymentflag_id == "5" ? gridother.getJson() : [];
                                    data['deletedRows'] = f.deletedRows;
                                    data['deletedsubRows'] = f.deletedsubRows;
                                    data["detailnonlink"] = me.getNonlinkgrid().getJson();
                                    data['deletedOtherPaymentRows'] = f.deletedOtherPaymentRows;
                                    data['deletednonlink'] = f.deletedNonlinkRows;
                                    data['deletedarpayment'] = f.deletedArPaymentRows;
                                    data['deletedarpaymentesc'] = f.deletedArPaymentRowsEsc;
                                    data['deletedattachment'] = f.deletedattachment;
                                    data['is_reimburse'] = me.is_reimburse;
                                    data['reimburse_kasbank_id'] = me.reimburse_kasbank_id;
                                    data['is_pettycashloan'] = me.is_pettycashloan;
                                    data['pettycashloan_kasbon_id'] = me.pettycashloan_kasbon_id;
                                    data['is_f7_convert'] = me.is_f7_convert;
                                    return data;
                                },
                                sync: true,
                                callback: function(a, b, c) {},
                                cb: function() { //ini baru jaalan callbacknya, di atas gajalan
                                    if (typeof call === "function") {
                                        call();
                                    }
                                }
                            });
                        }
                        me.flaggeneratepajak = 0;
                        me.flagchangeamountpajak = null;
                        me.is_f7_convert = 0;
                    } else {
                        f.setLoading(false);
                        me.tools.alert.warning(allowmsg);
                    }
                }
            });

            Ext.Function.defer(function () {
                budgetConfirmBox.zIndexManager.bringToFront(budgetConfirmBox);
            }, 100);
        }else{
            if (allowsave == true) {
                if (f.down("[name=subholding_id]").getValue() == '1' && is_f9 == '1' && state == 'create') {
                    Ext.Msg.confirm('Confirmation', 'Izinkan generate otomatis schema escrow by system jika belum ada?', function(btnc) {
                        if (btnc == 'yes') {
                            autogenerateschema = true;
                        } else {
                            autogenerateschema = false;
                        }
                        me.insSave({
                            form: f,
                            grid: grid,
                            finalData: function(data) {
                                data["paymentflag"] = me.paymentflag_id;
                                data["paymenttype_id"] = me.paymenttype_id;
                                data["detailcoa"] = gridcoadetail.getJson();
                                data["attachmentdetail"] = me.getAttachmentdetailgrid().getJson();
                                data["subdetailcoa"] = jsonDataEncode ? JSON.parse(Ext.encode(jsonDataEncode)) : [];
                                data["detailar"] = me.paymentflag_id == "1" || me.paymentflag_id == "2" ? gridar.getJson() : [];
                                data["detailescrow"] = me.paymentflag_id == "4" ? gridescrow.getJson() : [];
                                data["detailotherpayment"] = me.paymentflag_id == "5" ? gridother.getJson() : [];
                                data['deletedRows'] = f.deletedRows;
                                data['deletedsubRows'] = f.deletedsubRows;
                                data["detailnonlink"] = me.getNonlinkgrid().getJson();
                                data['deletedOtherPaymentRows'] = f.deletedOtherPaymentRows;
                                data['deletednonlink'] = f.deletedNonlinkRows;
                                data['deletedarpayment'] = f.deletedArPaymentRows;
                                data['deletedarpaymentesc'] = f.deletedArPaymentRowsEsc;
                                data['deletedattachment'] = f.deletedattachment;
                                data['is_reimburse'] = me.is_reimburse;
                                data['reimburse_kasbank_id'] = me.reimburse_kasbank_id;
                                data['is_pettycashloan'] = me.is_pettycashloan;
                                data['pettycashloan_kasbon_id'] = me.pettycashloan_kasbon_id;
                                data['is_f7_convert'] = me.is_f7_convert;
                                return data;
                            },
                            sync: true,
                            callback: function(a, b, c) {},
                            cb: function() { //ini baru jaalan callbacknya, di atas gajalan
                                if (autogenerateschema) {
                                    Ext.Ajax.request({
                                        url: 'cashier/voucher/read',
                                        method: 'POST',
                                        async: false,
                                        params: {
                                            purchaseletter_id: pl_id,
                                            mode_read: 'autogenerateschema'
                                        },
                                        success: function(response) {

                                        },
                                        failure: function(response) {

                                        }
                                    });
                                }
                                if (typeof call === "function") {
                                    call();
                                }
                            }
                        });
                    });

                } else {
                    me.insSave({
                        form: f,
                        grid: grid,
                        finalData: function(data) {
                            data["paymentflag"] = me.paymentflag_id;
                            data["paymenttype_id"] = me.paymenttype_id;
                            data["detailcoa"] = gridcoadetail.getJson();
                            data["attachmentdetail"] = me.getAttachmentdetailgrid().getJson();
                            data["subdetailcoa"] = jsonDataEncode ? JSON.parse(Ext.encode(jsonDataEncode)) : [];
                            data["detailar"] = me.paymentflag_id == "1" || me.paymentflag_id == "2" ? gridar.getJson() : [];
                            data["detailescrow"] = me.paymentflag_id == "4" ? gridescrow.getJson() : [];
                            data["detailotherpayment"] = me.paymentflag_id == "5" ? gridother.getJson() : [];
                            data['deletedRows'] = f.deletedRows;
                            data['deletedsubRows'] = f.deletedsubRows;
                            data["detailnonlink"] = me.getNonlinkgrid().getJson();
                            data['deletedOtherPaymentRows'] = f.deletedOtherPaymentRows;
                            data['deletednonlink'] = f.deletedNonlinkRows;
                            data['deletedarpayment'] = f.deletedArPaymentRows;
                            data['deletedarpaymentesc'] = f.deletedArPaymentRowsEsc;
                            data['deletedattachment'] = f.deletedattachment;
                            data['is_reimburse'] = me.is_reimburse;
                            data['reimburse_kasbank_id'] = me.reimburse_kasbank_id;
                            data['is_pettycashloan'] = me.is_pettycashloan;
                            data['pettycashloan_kasbon_id'] = me.pettycashloan_kasbon_id;
                            data['is_f7_convert'] = me.is_f7_convert;
                            return data;
                        },
                        sync: true,
                        callback: function(a, b, c) {},
                        cb: function() { //ini baru jaalan callbacknya, di atas gajalan
                            if (typeof call === "function") {
                                call();
                            }
                        }
                    });
                }
                me.flaggeneratepajak = 0;
                me.flagchangeamountpajak = null;
                me.is_f7_convert = 0;
            } else {
                f.setLoading(false);
                me.tools.alert.warning(allowmsg);
            }
        }
    },
    afterDataDetailInit: function(param, f) { //after
        var me = this;
        var fid = f.ownerCt.id;
        var fd = me.getFormcoadetail();

        var grid = me.getGrid();
        var rec = grid.getSelectedRecord();

        var c = grid.getSelectionModel().getCount();
        /* if (c === 1) {
            me.getCustomRequestCombobox('getcashbonbyvoucherid', rec.get("voucherdept_id"), '', '', 'kasbondept_id', 'vouchercashbondetail', '', fd, '', function() {
            });
        } */
        if (fid === 'coadatadetailsby') { //form coa detail
            if (param == 'update') {

                var g = me.getDetailvouchergrid();
                var rec = g.getSelectedRecord();
                me.kasbankdetail_id = rec.get("voucherdetail_id");
                var coaid = rec.get("coa_coa_id");
                var cashflow_setupcashflow_id = rec.get("cashflow_setupcashflow_id");
                var getindexdata = rec.get("indexdata");
                var kasbankdetail_id = rec.get("voucherdetail_id");
                var isppn = rec.get("is_ppn");
                var ispph = rec.get("is_pph");
                f.kosongGa = g.getSelectedRow(); //getSelectedRow untuk ambil row yang di klik user ,hanya 1
                f.loadRecord(rec);
                var kelsub_id = rec.get('kelsub_kelsub_id');
                me.formatCurrencyFormdata(me, f);
                if (cashflow_setupcashflow_id) {
                    me.voucherDetail.getCashflow(me, coaid, function() {
                        f.loadRecord(rec);
                        f.down("[name=kelsub_description]").setValue(me.tools.comboHelper(f.down("[name=coa_coa_id]")).getField('coa_id', 'kelsub_description'));
                    });
                }
                if (isppn != '' || ispph != '') {
                    fd.down("[name=ppn_tipepajakdetail_id]").setReadOnly(true);
                    fd.down("[name=ppn_percentage]").setReadOnly(true);
                    fd.down("[name=pph_tipepajakdetail_id]").setReadOnly(true);
                    fd.down("[name=pph_percentage]").setReadOnly(true);
                }
                if (me.voucher_id > 0) {
                    //                    fd.down('[name=amount]').setReadOnly(true);
                    fd.down('[name=pph_percentage]').setReadOnly(true);
                    fd.down('[name=ppn_percentage]').setReadOnly(true);
                    fd.down('[name=pph_tipepajakdetail_id]').setReadOnly(true);
                    fd.down('[name=ppn_tipepajakdetail_id]').setReadOnly(true);
                }
                var tempstoresub = me.localStore.subdetailcoa;
                if (kasbankdetail_id) {

                    var countrec = 0;
                    tempstoresub.each(function(rec) {
                        var datasub = rec['data'];
                        if (datasub.voucherdetail_indexdata == getindexdata) {
                            countrec += 1;
                        }
                    });
                    if (countrec === 0) {
                        me.voucherDetail.loadModelSubCoaDetail(me, function() {
                        });
                    } else {
                        var substore = me.getGridsubdetail().getStore();
                        substore.loadData([], false);
                        tempstoresub.clearFilter(true);
                        var sum = 0;
                        tempstoresub.each(function(rec) {
                            var datasub = rec['data'];
                            if (rec.get('voucherdetail_indexdata') == getindexdata) {
                                sum += parseFloat(accounting.unformat(rec.get('amount')));
                                return true;
                            } else {
                                return false;
                            }
                        });
                        me.voucherDetail.loadModelSubCoaDetail(me, function() {
                            substore.loadData([], false);
                            tempstoresub.each(function(rec) {
                                if (rec.get('voucherdetail_indexdata') == getindexdata) {
                                    substore.add(rec);
                                }
                            });
                        });
                    }

                } else {
                    var substore = me.getGridsubdetail().getStore();
                    substore.loadData([], false);
                    tempstoresub.clearFilter(true);
                    var sum = 0;
                    tempstoresub.filterBy(function(rec, id) {
                        var datasub = rec['data'];
                        if (datasub.voucherdetail_indexdata == getindexdata) {
                            sum += parseFloat(accounting.unformat(datasub.amount));
                            return true;
                        } else {
                            return false;
                        }
                    });
                    me.voucherDetail.loadModelSubCoaDetail(me, function() {
                        substore.loadData([], false);
                        tempstoresub.each(function(rec) {
                            substore.add(rec);
                        });
                    });
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
                    f.up("panel").setPosition(y, y / 2, true);
                    if (!me.is_realized) {
                        gridsub.down("button[action=create]").setDisabled(false);
                    }
                    me.voucherDetail.restoreTempToSubGrid(me, getindexdata);
                    f.down('[name=amount]').setReadOnly(true);
                    me.voucherDetail.getCashflow(me, rec.get('coa_coa_id'), function() {
                        f.down('[name=cashflow_setupcashflow_id]').setValue(rec.get('cashflow_setupcashflow_id'));
                        f.down('[name=amount]').setValue(accounting.formatMoney(rec.get('amount')));
                    });

                    if (true) {
                        gridsub.down("button[action=create]").setDisabled(false);
                    }
                    if (me.uploadems_id > 0) {
                        gridsub.down("button[action=update]").setDisabled(true);
                        gridsub.down("button[action=destroy]").setDisabled(true);
                    }
                    if (me.uploadcpms_id > 0) {
                        gridsub.down("button[action=destroy]").setDisabled(true);
                    }
                    if (me.uploadpim_id > 0) {
                        gridsub.down("button[action=destroy]").setDisabled(true);
                    }
                    me.formatCurrencyFormdata(me, f);
                } else {
                    if (gridsub) {
                        gridsub.setVisible(false);
                    }
                }
                if (me.is_posting) {
                    fd.down("button[action=savenew]").setDisabled(true);
                    fd.down("button[action=save]").setDisabled(true);
                }
                f.loadRecord(rec);
                me.formatCurrencyFormdata(me, f);

            } else if (param == 'create') {
                f.down("[name=indexdata]").setValue(me.voucherDetail.getindexdetailcoa(me));

                me.voucherDetail.loadModelSubCoaDetail(me);
            }
            f.down("[name=kelsub_description]").setValue(me.tools.comboHelper(f.down("[name=coa_coa_id]")).getField('coa_id', 'kelsub_description'));
        } else if (fid === 'myVoucherCHequeOutWindow') {
            var me = this;
            var f = me.getFormdatachequeout();
            f.down('[name=pt_pt_id]').setValue(me.pt_id);
        }
    },
    sumAmountStore: function(store) {
        var me = this;
        var amount = 0;
        if (store) {
            store.each(function(rec) {
                amount += parseFloat(accounting.unformat(rec.get("amount")));
            });
        }
        return amount;
    },
    chequeShowWindow: function(el, project_id, pt_id, cb) {
        var ps;
        var me = this;
        var localstore = 'selectedCheque';
        var browse = new Cashier.library.BrowseCashier();
        var view = me.dataflow === 'IN' ? 'ChequeGrid' : 'ChequeOutGrid';
        var grid = null;
        var dataflow = me.dataflow;
        if (me.dataflow === "IN") {
            var grid = me.getChequegrid();
        } else {
            var grid = me.getChequeoutgrid();
        }
        browse.init({
            controller: me,
            view: view,
            el: el,
            localStore: localstore,
            mode_read: "chequelist",
            bukaFormSearch: true,
            dataflow: me.dataflow,
            pt: pt_id,
            project: project_id,
        });
        browse.showWindow(function() {
            if (typeof cb === "function") {
                cb();
            }
            if (me.dataflow === 'OUT') {
                Ext.getCmp('cqdataflow').setValue(dataflow);
                Ext.getCmp('ptArOutId').setValue(pt_id);
            } else {
                Ext.getCmp('cqdataflow').setValue(dataflow);
                Ext.getCmp('ptArId').setValue(pt_id);
            }



        }, function() {

            var gc = null;
            if (me.dataflow === "IN") {
                var gc = me.getChequegrid();
            } else {
                var gc = me.getChequeoutgrid();
            }

            if (me.dataflow === 'OUT') {
                Ext.getCmp('ptArOutId').setValue(pt_id);
            } else {
                Ext.getCmp('ptArId').setValue(pt_id);
            }

        });
    },
    browseData: function(el, cb) {
        var ps;
        var me = this;
        var f = me.getFormdata();
        var type = f.down("[name=datatype]").getValue();
        var pt_pt_id = f.down("[name=pt_pt_id]").getValue();
        var localstore = 'selectedData';
        var view;
        if (type === "0") {
            var view = 'CustomerGrid';
            f.down("[name=vendor_vendor_id]").setValue();
            f.down("[name=unit_unit_id]").setValue();
        } else if (type === "1") {
            var view = 'SupplierGrid';
            f.down("[name=unit_unit_id]").setValue();
            f.down("[name=purchaseletter_customer_id]").setValue();
        } else if (type === "2") {
            var view = 'UnitGrid';
            f.down("[name=vendor_vendor_id]").setValue();
            f.down("[name=purchaseletter_customer_id]").setValue();
        } else if (type === "3") {
            var view = 'TenantGrid';
            f.down("[name=unit_unit_id]").setValue();
            f.down("[name=purchaseletter_customer_id]").setValue();
        }
        var browse = new Cashier.library.BrowseCashier();
        browse.init({
            controller: me,
            view: view,
            el: el,
            localStore: localstore,
            mode_read: "datalist",
            bukaFormSearch: true,
            pt: pt_pt_id
        });
        browse.showWindow(function() {
            Ext.getCmp('ptArId').setValue(me.pt_id);
        }, function() {
            if (me.pt_id) {
                Ext.getCmp('ptArId').setValue(me.pt_id);
            }
            Ext.getCmp('ptArId').setValue(me.pt_id);
            if (type === "1") {
                me.type_vendor = 'internal';
                Ext.getCmp('ptArId').setValue(parseInt(apps.projectpt));
                var gc = me.getVendorgrid();
                var storear = gc.getStore();
                var fields = Ext.getCmp('MySuperBrowseWindow').getForm().getFieldValues();
                for (var x in fields) {
                    storear.getProxy().setExtraParam(x, fields[x]);
                }
                storear.load({
                    callback: function(records, options, success) {
                        gc.down("pagingtoolbar").doRefresh();
                        Ext.getCmp('ptArId').setValue(parseInt(apps.projectpt));
                    }
                });
            }
            if (type === "3") {
                me.type_vendor = 'tenant';
                Ext.getCmp('ptArId').setValue(parseInt(apps.projectpt));
                var gc = me.getTenantgrid();
                var storear = gc.getStore();
                var fields = Ext.getCmp('MySuperBrowseWindow').getForm().getFieldValues();
                for (var x in fields) {
                    storear.getProxy().setExtraParam(x, fields[x]);
                }
                storear.load({
                    callback: function(records, options, success) {
                        gc.down("pagingtoolbar").doRefresh();
                        Ext.getCmp('ptArId').setValue(parseInt(apps.projectpt));
                    }
                });
            }
        });
    },
    chequeSelect: function(el) {
        var me = this;
        var f = me.cheque_formdata;
        var grid = me.getChequegrid();
        var row = grid.getSelectionModel().getSelection();
        var rec = grid.getSelectedRecord();
        console.log(f.ownerCt['id']);
        f.down('[name=dataflow]').setValue('I');
        if (f.ownerCt['id'] == 'myvoucheformpayment') {
            f.down('[name=issued_date]').setValue(rec.get("issued_date"));
        } else if (f.ownerCt['id'] == 'win-voucherwinId' || f.ownerCt['id'] == 'myVoucherWindow') {
            f.down('[name=payment_date]').setValue(rec.get("issued_date"));
        } else {
            f.down('[name=payment_payment_date]').setValue(rec.get("issued_date"));
        }
        f.down('[name=cheque_cheque_no]').setValue(rec.get("cheque_no"));
        f.down('[name=cheque_cheque_id]').setValue(rec.get("cheque_id"));
        el.up('window').destroy();
    },
    chequeSelectOut: function(el) {
        var me = this;
        var f = me.cheque_formdata;
        var grid = me.getChequeoutgrid();
        var row = grid.getSelectionModel().getSelection();
        var rec = grid.getSelectedRecord();
        f.down('[name=dataflow]').setValue('O');
        console.log(f.ownerCt['id']);
        if (f.ownerCt['id'] == 'myvoucheformpayment') {
            f.down('[name=issued_date]').setValue(rec.get("issued_date"));
        } else if (f.ownerCt['id'] == 'win-voucherwinId' || f.ownerCt['id'] == 'myVoucherWindow') {
            f.down('[name=payment_date]').setValue(rec.get("issued_date"));
        } else {
            f.down('[name=payment_payment_date]').setValue(rec.get("issued_date"));
        }
        f.down('[name=cheque_cheque_no]').setValue(rec.get("cheque_no"));
        f.down('[name=cheque_cheque_id]').setValue(rec.get("cheque_id"));
        el.up('window').destroy();
    },
    loadModelCoaDetail: function(callback) {
        var me = this;
        var gridCoaDetail = me.getDetailvouchergrid();
        gridCoaDetail.getStore().clearFilter(true);
        gridCoaDetail.doInit();
        gridCoaDetail.getStore().load({
            params: {
                template_id: 0
            },
            callback: function(rec, op) {
                if (op) {
                    gridCoaDetail.attachModel(op);
                } else {
                    console.log('error attach model coa');
                }

                if (typeof callback === "function") {
                    callback();
                }
            }
        });
    },
    selectEscrowGridShow: function(el, ar) {
        var ps;
        var me = this;
        var localstore = 'selectedEscrow';
        me.kasbank_id = 0;
        me.is_erems = 0;
        me.iskprparsial = 0;
        var browse = new Cashier.library.BrowseCashier();
        browse.init({
            controller: me,
            view: 'EscrowGrid',
            el: el,
            localStore: localstore,
            mode_read: "selectedescrow",
            bukaFormSearch: true,
        });
        browse.showWindow(function() {
            if (me.pt_id) {
                Ext.getCmp('ptArId').setValue(me.pt_id);
            }
            Ext.getCmp('btnselectesc').setVisible(true);
            Ext.getCmp('btnselectesc2').setVisible(false);
            Ext.getCmp('ptArId').setValue(me.pt_id);
        });
    },
    selectEscrowGridShowParsial: function(el, ar) {
        var ps;
        var me = this;
        var localstore = 'selectedEscrow';
        me.kasbank_id = 0;
        me.is_erems = 0;
        me.iskprparsial = 1;
        var browse = new Cashier.library.BrowseCashier();
        browse.init({
            controller: me,
            view: 'EscrowGrid',
            el: el,
            localStore: localstore,
            mode_read: "selectedescrow",
            bukaFormSearch: true,
        });
        browse.showWindow(function() {
            if (me.pt_id) {
                Ext.getCmp('ptArId').setValue(me.pt_id);
            }
            Ext.getCmp('btnselectesc').setVisible(false);
            Ext.getCmp('btnselectesc2').setVisible(true);
            Ext.getCmp('ptArId').setValue(me.pt_id);
            Ext.getCmp('iskprparsial').setValue(1);
        });
    },
    openFormData: function() {
        var me = this;
        var w = me.instantWindow('FormData', 990, 'Add Voucher', 'create', 'win-voucherwinId');
    },
    printKwitansi: function(menuid) {
        var me = this;
        var grid = me.getGrid();
        var rec = grid.getSelectedRecord();
        var is_f9 = 0;
        me.projectprint = rec.get("project_project_id");
        me.ptprint = rec.get("pt_pt_id");
        me.projectprintname = rec.get("project_name");
        me.ptprintname = rec.get("pt_name");
        me.iskwitansirs = false;
        Ext.Ajax.request({
            url: 'cashier/voucher/read',
            method: 'POST',
            async: false,
            params: {
                kasbank_id: rec.get('kasbank_id'),
                mode_read: 'getvoucherfdar'
            },
            success: function(response) {
                var datafdar = Ext.JSON.decode(response.responseText);
                is_f9 = datafdar.data['isf9'];

                if (menuid == 'Kwitansi RS Exc') {
                    menuid = 'Kwitansi RS';
                    me.excludeamount = datafdar.data['excludeamount'];
                    me.terbilangexcludeamount = datafdar.data['terbilangexcludeamount'];
                    me.iskwitansirs = true;
                }
            },
            failure: function(response) {

            }
        });

        //Rizal 22 Mei 2019
        if (rec.get('dataflow') == 'I' && rec.get('payment_receipt_no') == '' && rec.get('payment_paymentflag_id') == 1 && is_f9 != '1') {
            me.tools.alert.info("This receipt no is an empty. Please insert receipt no first");
            return false;
        }
        //
        var kid;
        if (me.saved_id) {
            kid = me.saved_id;
        } else {
            kid = me.kasbank_id;
        }
        var p = me.getPanel();
        me.tipeprint = 'printkwitansinonrangkap';
        me.checktemplateuser(menuid);
        me.kasbank_id = 0;
        me.saved_id = 0;
    },
    //Rizal 21 Juni 2019
    printKwitansiRangkap: function(menuid) {
        var me = this;
        var grid = me.getGrid();
        var rec = grid.getSelectedRecord();
        me.projectprint = rec.get("project_project_id");
        me.ptprint = rec.get("pt_pt_id");
        me.projectprintname = rec.get("project_name");
        me.ptprintname = rec.get("pt_name");
        me.iskwitansirs = false;
        //Rizal 22 Mei 2019
        if (rec.get('dataflow') == 'I' && rec.get('payment_receipt_no') == '' && rec.get('payment_paymentflag_id') == 1) {
            me.tools.alert.info("This receipt no is an empty. Please insert receipt no first");
            return false;
        }
        //
        var kid;
        if (me.saved_id) {
            kid = me.saved_id;
        } else {
            kid = me.kasbank_id;
        }
        var p = me.getPanel();
        me.tipeprint = 'printkwitansi';
        p.setLoading('Please wait ...');

        setTimeout(function() {
            Ext.Ajax.request({
                url: 'cashier/voucher/read',
                method: 'POST',
                async: false,
                params: {
                    project_id: me.project_id,
                    pt_id: me.pt_id,
                    with_qr: 0,
                    mode_read: 'checktemplate3rangkap'
                },
                success: function(response) {
                    var data = Ext.JSON.decode(response.responseText);
                    if (data.data['template'] != '') {
                        me.reportFileNamevcr = data.data['template'];
                        me.mainPrintCustom2();
                    } else {
                        me.reportFileNamevcr = '3rangkap';
                        me.mainPrintCustom2();
                    }

                },
                failure: function(response) {

                }
            });
        }, 1500);
        me.kasbank_id = 0;
        me.saved_id = 0;
    },
    printKwitansiRangkapWithQr: function(menuid) {
        var me                  = this;
        var grid                = me.getGrid();
        var rec                 = grid.getSelectedRecord();
        var optionMessage       = 'Pilihan cetakan kwitansi rangkap 3<br />dengan QR Code.<br /><br /><select id="optionVoucher" class="x-form-field x-form-required-field x-form-text"><option value="1">Print All</option><option value="2">Print (Customer)</option><option value="3">Print (Cashier & Collection)</option></select>';
            me.projectprint     = rec.get("project_project_id");
            me.ptprint          = rec.get("pt_pt_id");
            me.projectprintname = rec.get("project_name");
            me.ptprintname      = rec.get("pt_name");
            me.iskwitansirs     = false;


          // Rizal 22 Mei 2019
        if (rec.get('dataflow') == 'I' && rec.get('payment_receipt_no') == '' && rec.get('payment_paymentflag_id') == 1) {
            me.tools.alert.info("This receipt no is an empty. Please insert receipt no first");
            return false;
        }

        Ext.MessageBox.show({
            title  : 'Confirmation',
            msg    : optionMessage,
            buttons: Ext.MessageBox.OKCANCEL,
            fn     : function(btn) {
                if (btn == 'ok') {
                    me.optionQr = Ext.get('optionVoucher').getValue();

                    var checkmsg;
                    if (me.optionQr == 1) {
                        checkmsg = 'Format All';
                    } else if (me.optionQr == 2) {
                        checkmsg = 'Format Customer';
                    } else {
                        checkmsg = 'Format Cashier & Collection';
                    }

                    var kid;
                    if (me.saved_id) {
                        kid = me.saved_id;
                    } else {
                        kid = me.kasbank_id;
                    }


                    var p            = me.getPanel();
                        me.tipeprint = 'printkwitansi';
                    p.setLoading('Please wait ...');

                    setTimeout(function() {
                        Ext.Ajax.request({
                            url   : 'cashier/voucher/read',
                            method: 'POST',
                            async : false,
                            params: {
                                project_id: me.project_id,
                                pt_id     : me.pt_id,
                                with_qr   : 1,
                                optionQr  : me.optionQr,
                                mode_read : 'checktemplate3rangkap'
                            },
                            success: function(response) {
                                var data = Ext.JSON.decode(response.responseText);
                                if (data.data['template'] != '') {
                                    me.reportFileNamevcr = data.data['template'];
                                    me.mainPrintCustom3Rangkap();
                                } else {
                                    me.reportFileNamevcr = '3rangkap';
                                    me.mainPrintCustom3Rangkap();
                                }

                            },
                            failure: function(response) {

                            }
                        });
                    }, 1500);
                    me.kasbank_id = 0;
                    me.saved_id   = 0;
                }
            }
        });


    },
    printKwitansiRangkapPreprinted: function(menuid) {
        var me = this;
        var grid = me.getGrid();
        var rec = grid.getSelectedRecord();
        me.projectprint = rec.get("project_project_id");
        me.ptprint = rec.get("pt_pt_id");
        me.projectprintname = rec.get("project_name");
        me.ptprintname = rec.get("pt_name");
        me.iskwitansirs = false;
        //Rizal 22 Mei 2019
        if (rec.get('dataflow') == 'I' && rec.get('payment_receipt_no') == '' && rec.get('payment_paymentflag_id') == 1) {
            me.tools.alert.info("This receipt no is an empty. Please insert receipt no first");
            return false;
        }
        //
        var kid;
        if (me.saved_id) {
            kid = me.saved_id;
        } else {
            kid = me.kasbank_id;
        }
        var p = me.getPanel();
        me.tipeprint = 'printkwitansi';
        Ext.Ajax.request({
            url: 'cashier/voucher/read',
            method: 'POST',
            async: false,
            params: {
                project_id: me.project_id,
                pt_id: me.pt_id,
                mode_read: 'checktemplate3rangkappreprinted'
            },
            success: function(response) {
                var data = Ext.JSON.decode(response.responseText);
                if (data.data['template'] != '') {
                    me.reportFileNamevcr = data.data['template'];
                    me.mainPrintCustom2();
                } else {
                    me.reportFileNamevcr = '3rangkappreprinted';
                    me.mainPrintCustom2();
                }
                p.setLoading(false);

            },
            failure: function(response) {

            }
        });
        me.kasbank_id = 0;
        me.saved_id = 0;
    },
    //
    gridSelectionChange: function() { //gs
        var me = this;
        var grid = me.getGrid(),
            row = grid.getSelectionModel().getSelection();
        var rec = grid.getSelectedRecord();
        var edit = grid.down('#btnEdit');
        var deleted = grid.down('#btnDelete');
        var realisasi = grid.down('#btnRealization');
        var posting = grid.down('#btnPosting');
        var printkwitansi = grid.down('#btnPrintKwitansi');
        var printkwitansirangkap = grid.down('#btnPrintKwitansiRangkap');
        var printkwitansirangkapwithqr = grid.down('#btnPrintKwitansiRangkapWithQr');
        var printKwitansiPreprinted = grid.down('#btnPrintKwitansiPreprinted');
        var printvoucher = grid.down('#btnPrintVoucher');
        var printcheque = grid.down('#PrintChequePaymentList');
        var copyvoucher = grid.down('#btnCopyVcr');
        var pindahpt = grid.down('#btnPindahPT');
        var convertf7 = grid.down('#btnedittof7');
        var angsurandenda = grid.down('#btnangsurandenda');
        var needrevise = grid.down('#needrevise');
        var payment = grid.down('#btnPayment');
        var editnokwitansi = grid.down('#btnEditnokwitansi');
        var fs = me.getFormsearch();
        var projectid = fs.down("[name=project_id]").getValue();
        var sh = fs.down("[name=project_id]").getStore().findRecord("project_project_id", fs.down("[name=project_id]").getValue(), 0, false, true, true);

        var c = grid.getSelectionModel().getCount();
        if (c === 1) {
            projectid = rec.get("project_project_id");
            if (rec.get("paymentflag_id") != '') {
                pindahpt.setDisabled(true);
                convertf7.setDisabled(true);
                copyvoucher.setDisabled(false);
                angsurandenda.setDisabled(true);
            } else {
                if (rec.get("is_realized") == 1 || rec.get('is_posting') == 1) {
                    pindahpt.setDisabled(true);
                    if (rec.get("is_posting") == 1) {
                        convertf7.setDisabled(true);
                    } else {
                        if (rec.get("dataflow") == "I") {
                            convertf7.setDisabled(false);
                        }
                    }
                    angsurandenda.setDisabled(true);
                } else {
                    if (rec.get("dataflow") == "I") {
                        convertf7.setDisabled(false);
                        angsurandenda.setDisabled(true);
                    } else {
                        angsurandenda.setDisabled(false);
                    }

                    if (((rec.get("is_paid") != 1 && rec.get("dataflow") == "O") || (rec.get("dataflow") == "I")) && rec.get('approval_rules') == 'hod_approve' && rec.get("voucherdept_id") != "") {
                        needrevise.setDisabled(false);
                    }
                    pindahpt.setDisabled(false);
                }
                copyvoucher.setDisabled(false);
            }

            if (rec.get('status') == 'is_realized') {
                printkwitansirangkap.setDisabled(false);
                printkwitansirangkapwithqr.setDisabled(false);
            } else {
                printkwitansirangkap.setDisabled(false);
                printkwitansirangkapwithqr.setDisabled(false);
            }

            if((rec.get("status") == 'is_paid' && rec.get('is_erems') == 1) || rec.get("status") == 'is_realized' || rec.get("status") == 'is_posting'){
                deleted.setDisabled(true);
            }

        } else {
            if (c > 1) {
                projectid = rec.get("project_project_id");
            }
            convertf7.setDisabled(true);
            angsurandenda.setDisabled(true);
            pindahpt.setDisabled(true);
            needrevise.setDisabled(true);
            copyvoucher.setDisabled(false);
            row.forEach(function(rec) {
                if (rec.get("paymentflag_id") != '') {
                    copyvoucher.setDisabled(true);
                }
            });
        }

        if (edit !== null) {
            edit.setDisabled(row.length != 1);
        }
        if (editnokwitansi !== null) {
            var dataflow = [];
            row.forEach(function(rec) {
                dataflow.push(
                    rec.get("dataflow") === "O" ? "O" : "I"
                );
            });

            if (dataflow.length === 1) {
                if (dataflow[0] === "I") {
                    editnokwitansi.setDisabled(false);
                } else {
                    editnokwitansi.setDisabled(true);
                }
            } else {
                editnokwitansi.setDisabled(true);
            }

        }
        if (printkwitansi !== null) {
            var dataflow = [];
            row.forEach(function(rec) {
                dataflow.push(
                    rec.get("dataflow") === "O" ? "O" : "I"
                );
            });

            if (dataflow.length === 1) {
                if (dataflow[0] === "I") {
                    printkwitansi.setDisabled(false);
                }
            } else {
                printkwitansi.setDisabled(true);
            }

        }
        if (printkwitansirangkap !== null) {
            var dataflow = [];
            var status = [];
            row.forEach(function(rec) {
                dataflow.push(
                    rec.get("dataflow") === "O" ? "O" : "I"
                );
                status.push(rec.get('status'));
            });

            if (dataflow.length === 1) {
                if (dataflow[0] === "I") {
                    printkwitansirangkap.setDisabled(false);
                    printKwitansiPreprinted.setDisabled(false);
                }
            } else {
                if (dataflow[0] === "I") {
                    printkwitansirangkap.setDisabled(false);
                    printKwitansiPreprinted.setDisabled(false);
                }
            }

        }
        if (printkwitansirangkapwithqr !== null) {
            var dataflow = [];
            var status = [];
            row.forEach(function(rec) {
                dataflow.push(
                    rec.get("dataflow") === "O" ? "O" : "I"
                );
                status.push(rec.get('status'));
            });

            if (dataflow.length === 1) {
                if (dataflow[0] === "I") {
                    printkwitansirangkapwithqr.setDisabled(false);
                }else{
                    printkwitansirangkapwithqr.setDisabled(true);
                }
            } else {
                if (dataflow.every(val => val === 'I') == true) {
                    printkwitansirangkapwithqr.setDisabled(false);
                }else{
                    printkwitansirangkapwithqr.setDisabled(true);
                }
            }

            if (status.length === 1) {
                if (status[0] != "is_realized") {
                    printkwitansirangkapwithqr.setDisabled(true);
                }
            } else {
                if (status.every(val => val === 'is_realized') == true) {
                    printkwitansirangkapwithqr.setDisabled(false);
                }else{
                    printkwitansirangkapwithqr.setDisabled(true);
                }
            }


        }
        if (printvoucher !== null) {
            printvoucher.setDisabled(row.length < 1);
        }
        if (printcheque !== null) {
            row.forEach(function(rec) {
                if (rec.get("cheque_cheque_id")) {
                    printcheque.setDisabled(row.length != 1);
                }
            });
        }
        if (payment !== null) {

            var cekgiroarr = [];
            var cekgiroarrreal = [];
            var dataflow = [];
            var dataflowcount = [];
            var arrposting = [];
            var is_realized = [];
            var paymentmetdhodarr = [];
            var vendorarr = [];
            var statusarr = [];
            var ispaidarr = [];
            var paymentmetdhodarrreal = [];
            row.forEach(function(rec) {

                cekgiroarr.push(
                    rec.get("cheque_cheque_id") ? 1 : 1
                );
                cekgiroarrreal.push(
                    rec.get("cheque_cheque_id")
                );
                dataflow.push(
                    rec.get("dataflow") === "O" ? "O" : "I"
                );
                dataflowcount.push(
                    rec.get("dataflow") === "O" ? 1 : parseFloat(0)
                );
                arrposting.push(
                    rec.get("is_posting") ? rec.get("is_posting") : parseFloat(0)
                );
                is_realized.push(
                    rec.get("is_realized") ? rec.get("is_realized") : parseFloat(0)
                );
                ispaidarr.push(
                    rec.get("is_paid") ? rec.get("is_paid") : parseFloat(0)
                );
                vendorarr.push(
                    rec.get("vendor_vendor_id") ? rec.get("vendor_vendor_id") : parseFloat(0)
                );
                paymentmetdhodarr.push(
                    rec.get("payment_paymentmethod_id") === 2 ||
                    rec.get("payment_paymentmethod_id") == ""

                    ?
                    1 : 0
                );
                paymentmetdhodarrreal.push(
                    rec.get("payment_paymentmethod_id")
                );
                statusarr.push(
                    rec.get("status")
                );
            });
            var sumCekgiro = cekgiroarr.reduce(function(a, b) {
                return a + b;
            }, 0);
            var sumdataflowcount = dataflowcount.reduce(function(a, b) {
                return a + b;
            }, 0);
            var sumnotrealized = is_realized.reduce(function(a, b) {
                return a + b;
            }, 0);
            var sumpaymentmetdhodarr = paymentmetdhodarr.reduce(function(a, b) {
                return a + b;
            }, 0);
            var sumispaid = ispaidarr.reduce(function(a, b) {
                return a + b;
            }, 0);
            var samecekgiro = cekgiroarrreal.every(
                function(value, _, array) {
                    return array[0] === value;
                }
            );
            var sameDataflow = dataflow.every(
                function(value, _, array) {
                    return array[0] === value;
                }
            );
            var sameIsNotPosted = arrposting.every(
                function(value, _, array) {
                    return array[0] === value;
                }
            );
            var sameIsNotRealized = is_realized.every(
                function(value, _, array) {
                    return array[0] === value;
                }
            );
            var samepaymentmetdhodarr = paymentmetdhodarr.every(
                function(value, _, array) {
                    return array[0] === value;
                }
            );
            var samevendor = vendorarr.every(
                function(value, _, array) {
                    return array[0] === value;
                }
            );
            if (cekgiroarr.length) {

                if (sumCekgiro === cekgiroarr.length) {

                    if (cekgiroarr.length > 1) {

                        if (sameDataflow && sameIsNotPosted && sameIsNotRealized && sumnotrealized === 0) {
                            if (sumispaid === cekgiroarr.length) {
                                payment.setDisabled(false);
                            } else {
                                if (sumispaid == 0) {
                                    payment.setDisabled(false);
                                } else {
                                    payment.setDisabled(true);
                                }
                            }

                        } else {

                            if (sumdataflowcount === 0 && sumispaid !== 0) {
                                payment.setDisabled(false);
                            } else {
                                payment.setDisabled(true);
                            }
                        }
                    } else {

                        if (dataflow[0] === "O" && !arrposting[0] && !is_realized[0]) {
                            payment.setDisabled(false);

                        } else {
                            payment.setDisabled(true);
                        }

                    }
                } else if (sumpaymentmetdhodarr === dataflowcount.length) {

                    if (cekgiroarr.length > 1) {

                        if (sameDataflow && sameIsNotPosted && sameIsNotRealized && sumnotrealized === 0) {
                            if (sumispaid) {
                                payment.setDisabled(true);
                            } else {
                                payment.setDisabled(false);
                            }

                        } else {

                            if (sumdataflowcount === 0) {

                                payment.setDisabled(false);
                            } else {
                                payment.setDisabled(true);
                            }
                        }

                    } else {

                        if (dataflow[0] === "O") {
                            if (!arrposting[0] && !is_realized[0]) {
                                payment.setDisabled(false);
                            } else {
                                payment.setDisabled(true);
                            }
                        } else {
                            payment.setDisabled(true);
                        }

                    }



                }
                else {
                    payment.setDisabled(true);
                }
            } else {
                payment.setDisabled(true);
            }
        }
        if (realisasi !== null) {
            var arr = [];
            var unrealiz = [];
            var cekgiroarr = [];
            var kasbank = [];
            var dataflow = [];
            var is_paid_arr = [];
            var is_posting_arr = [];
            var paymentmetdhodarr = [];
            me.on_realization = null;
            row.forEach(function(rec) {
                arr.push(
                    rec.get("is_paid") ? rec.get("is_paid") : 1
                );
                is_paid_arr.push(
                    rec.get("is_paid") ? rec.get("is_paid") : parseFloat(0)
                );
                kasbank.push(
                    rec.get("prefix_prefix_id")
                );
                unrealiz.push(
                    rec.get("is_realized") ? rec.get("is_realized") : parseFloat(0)
                );
                cekgiroarr.push(
                    rec.get("cheque_cheque_id") ? 1 : parseFloat(0)
                );
                dataflow.push(
                    rec.get("dataflow")
                );
                paymentmetdhodarr.push(
                    rec.get("payment_paymentmethod_id") !== 2 ? 1 : 0
                );
                is_posting_arr.push(
                    rec.get("is_posting") ? 1 : parseFloat(0)
                );
            });
            var sum = arr.reduce(function(a, b) {
                return a + b;
            }, 0);
            var sumUnreal = unrealiz.reduce(function(a, b) {
                return a + b;
            }, 0);
            var sumCekgiro = cekgiroarr.reduce(function(a, b) {
                return a + b;
            }, 0);
            var sumPosting = is_posting_arr.reduce(function(a, b) {
                return a + b;
            }, 0);
            var same = kasbank.every(
                function(value, _, array) {
                    return array[0] === value;
                }
            );
            var sameDataflow = dataflow.every(
                function(value, _, array) {
                    return array[0] === value;
                }
            );
            var samePayWithcekgiroarr = cekgiroarr.every(
                function(value, _, array) {
                    return array[0] === value;
                }
            );
            var same_is_paid_arr = is_paid_arr.every(
                function(value, _, array) {
                    return array[0] === value;
                }
            );
            var same_unrealiz = unrealiz.every(
                function(value, _, array) {
                    return array[0] === value;
                }
            );
            var same_paymentmethod = paymentmetdhodarr.every(
                function(value, _, array) {
                    return array[0] === value;
                }
            );
            var same_is_posting_arr = is_posting_arr.every(
                function(value, _, array) {
                    return array[0] === value;
                }
            );


            if (arr.length) {
                me.is_multirealisasi = 0;
                if (sumUnreal === unrealiz.length) {

                    me.on_realization = 1;
                    if (same && sameDataflow) {

                        //jika kode bank sama, buka kan saja disablenya
                        realisasi.setDisabled(false);
                    } else {
                        realisasi.setDisabled(row.length != 1);
                    }

                } else if (sum === arr.length) {

                    me.is_multirealisasi = 0;
                    me.on_realization = null;
                    if (same && sameDataflow) { //jika kode bank sama, buka kan saja disablenya

                        //sumPosting
                        if (same_unrealiz && same_paymentmethod) {

                            if (cekgiroarr.length > 1) {

                                if (sumCekgiro === 0) {
                                    if (sh.data['project_subholding_id'] == 1) {
                                        if (sh.data['project_project_id'] == 2012 || sh.data['project_project_id'] == 4038) {
                                            realisasi.setDisabled(false);
                                        } else {
                                            realisasi.setDisabled(true);
                                        }
                                    } else {
                                        realisasi.setDisabled(false);
                                    }
                                } else {
                                    if (sh.data['project_subholding_id'] == 1) {
                                        if (sh.data['project_project_id'] == 2012 || sh.data['project_project_id'] == 4038) {
                                            realisasi.setDisabled(false);
                                        } else {
                                            realisasi.setDisabled(true);
                                        }
                                    } else {
                                        realisasi.setDisabled(false);
                                    }
                                }
                            } else {

                                if (is_posting_arr[0] === 0) {
                                    realisasi.setDisabled(false);
                                } else {
                                    realisasi.setDisabled(true);
                                }
                            }
                        } else {

                            realisasi.setDisabled(true);
                        }
                    } else {

                        me.is_multirealisasi = 0;
                        if (same_unrealiz && same_paymentmethod) {

                            // jika realisasi saja atau paid saja,
                            if (samePayWithcekgiroarr && sumPosting === 0) { //jika tdk payment pakai giro bisa mutple real I & O

                                if (sumCekgiro === 0) {
                                    me.is_multirealisasi = 1;
                                    if (sh.data['project_subholding_id'] == 1) {
                                        if (sh.data['project_project_id'] == 2012 || sh.data['project_project_id'] == 4038) {
                                            realisasi.setDisabled(false);
                                        } else {
                                            realisasi.setDisabled(true);
                                        }
                                    } else {
                                        realisasi.setDisabled(false);
                                    }

                                } else {
                                    me.is_multirealisasi = 0;
                                    realisasi.setDisabled(true);

                                }
                            } else {
                                me.is_multirealisasi = 0;
                                realisasi.setDisabled(row.length != 1);
                            }
                        } else {
                            me.is_multirealisasi = 0;
                            realisasi.setDisabled(true);
                        }

                    }
                } else if (sumCekgiro === cekgiroarr.length) {

                    me.on_realization = null;
                    if (cekgiroarr.length > 1) {

                        if (sameDataflow && same_is_posting_arr) {
                            realisasi.setDisabled(row.length != 1);
                        } else {
                            if (sumCekgiro === 0) {
                                realisasi.setDisabled(false);
                            } else {
                                realisasi.setDisabled(row.length != 1);
                            }
                        }
                    } else {
                        if (arr[0] == "1") {
                            realisasi.setDisabled(row.length != 1);
                        }

                    }

                } else {
                    realisasi.setDisabled(true);
                }

            } else {
                realisasi.setDisabled(true);
            }
        }


        if (deleted !== null) {
            var arr = [];
            var unrealiz = [];
            var voucherrealize = [];
            var voucherposting = [];
            var status = [];
            var is_erems = [];
            row.forEach(function(rec) {
                arr.push(
                    rec.get("kasbank_id") ? 1 : parseFloat(0)
                );
                unrealiz.push(
                    rec.get("is_realized") ? rec.get("is_realized") : parseFloat(0)
                );
                status.push(rec.get('status'));
                is_erems.push(rec.get('is_erems'));
            });
            var sum = arr.reduce(function(a, b) {
                return a + b;
            }, 0);
            var sumunrealiz = unrealiz.reduce(function(a, b) {
                return a + b;
            }, 0);
            var same_realized = unrealiz.every(
                function(value, _, array) {
                    return array[0] === value;
                }
            );
            if (arr.length) {
                if (sumUnreal === unrealiz.length) {
                    deleted.setDisabled(true);
                } else if (sum === arr.length) {

                    if (arr.length > 1) {


                        if (sumunrealiz === 0) {
                            deleted.setDisabled(false);
                        } else {
                            deleted.setDisabled(true);
                        }

                    } else {

                        if (unrealiz[0] === 0) {
                            deleted.setDisabled(false);
                        }
                    }
                } else {
                    deleted.setDisabled(false);
                }

            } else {
                deleted.setDisabled(true);
            }

            if (status.length === 1) {
                if ((status[0] == "is_paid" && is_erems[0] == 0) || status[0] == "is_realized" || status[0] == "is_posting") {
                    deleted.setDisabled(true);
                }
            } else {
                if (status.includes("is_paid") == true && is_erems.includes(0)) {
                    deleted.setDisabled(true);
                }else if(status.includes("is_realized") == true){
                    deleted.setDisabled(true);
                }else if(status.includes("is_posting") == true){
                    deleted.setDisabled(true);
                }
            }


        }
        if (posting !== null) {
            var realArr = [];
            var postingArr = [];
            var flag_is_reimburse_in = [];
            row.forEach(function(rec) {
                postingArr.push(
                    rec.get("is_posting") ? rec.get("is_posting") : parseFloat(0)
                );
                realArr.push(
                    rec.get("is_realized") ? rec.get("is_realized") : parseFloat(0)
                );
                flag_is_reimburse_in.push(
                    rec.get("flag_is_reimburse") ? parseFloat(1) : parseFloat(0)
                );


            });
            var sumPosting = postingArr.reduce(function(a, b) {
                return a + b;
            }, 0);
            var sumReal = realArr.reduce(function(a, b) {
                return a + b;
            }, 0);
            var sumReimburseIn = flag_is_reimburse_in.reduce(function(a, b) {
                return a + b;
            }, 0);
            var check_flag_reimburse = flag_is_reimburse_in.every(
                function(value, _, array) {
                    return array[0] === value;
                }
            );

            me.getGrid().down("#btnPosting").setVisible(true);
            me.getGrid().down("#btnUnposting").setVisible(false);

            if (postingArr.length) {
                if (sumPosting === postingArr.length) {
                    posting.setDisabled(false);
                    realisasi.setDisabled(true);
                    payment.setDisabled(true);

                    me.getGrid().down("#btnPosting").setVisible(false);
                    me.getGrid().down("#btnUnposting").setVisible(true);

                } else if (sumReal === realArr.length) {

                    if (realArr.length > 1) {
                        if (check_flag_reimburse) {
                            posting.setDisabled(false);
                            posting.setText('Posting');
                        } else {
                            posting.setDisabled(false);
                            posting.setText('Posting');
                        }
                    } else {

                        if (flag_is_reimburse_in[0] === 1) {
                            posting.setDisabled(false);
                            posting.setText('Posting');
                        } else {
                            posting.setDisabled(false);
                            posting.setText('Posting');
                            if (posting.getText === 'Posting') {
                                realisasi.setDisabled(true);
                                payment.setDisabled(true);
                            }
                        }
                    }



                } else {
                    posting.setDisabled(true);
                }
            } else {
                posting.setDisabled(true);
            }
        }

        var disabledpayment = [3, 4034, 4036];
        if (jQuery.inArray(projectid, disabledpayment) != -1) {
            payment.setDisabled(true);
        }
    },
    checkMandatory: function() {
        var me = this;
        var g = me.getDetailvouchergrid();
        var f = me.getFormdata();
        var pt = f.down("[name=pt_pt_id]").getValue();
        var project = f.down("[name=project_project_id]").getValue();
        if (project && pt) {
            g.down("button[action=create]").setDisabled(false);
            f.down("button[action=browseData]").setDisabled(false);
        } else {
            g.down("button[action=create]").setDisabled(true);
            f.down("button[action=browseData]").setDisabled(true);
        }
        if (me.uploadcpms_id > 0) {
        }
    },
    gridSelectionChangeCustomerGrid: function(c) {
        var me = this;
        var grid = me.getCustomergrid();
        var row = grid.getSelectionModel().getSelection();
        var rec = grid.getSelectedRecord();
        var c = grid.getSelectionModel().getCount();
        if (c === 1) {
            grid.down('[action=select]').setDisabled(false);
        } else {
            grid.down('[action=select]').setDisabled(true);
        }
    },
    gridSelectionChangeVendorGrid: function(c) {
        var me = this;
        var grid = me.getVendorgrid();
        var row = grid.getSelectionModel().getSelection();
        var rec = grid.getSelectedRecord();
        var c = grid.getSelectionModel().getCount();
        if (c === 1) {
            grid.down('[action=select]').setDisabled(false);
        } else {
            grid.down('[action=select]').setDisabled(true);
        }
    },
    gridSelectionChangeTenantGrid: function(c) {
        var me = this;
        var grid = me.getTenantgrid();
        var row = grid.getSelectionModel().getSelection();
        var rec = grid.getSelectedRecord();
        var c = grid.getSelectionModel().getCount();
        if (c === 1) {
            grid.down('[action=select]').setDisabled(false);
        } else {
            grid.down('[action=select]').setDisabled(true);
        }
    },
    customerSelect: function(el) {
        var me = this;
        var f = me.getFormdata();
        var grid = me.getCustomergrid();
        var row = grid.getSelectionModel().getSelection();
        var rec = grid.getSelectedRecord();
        f.down('[name=customer_name]').setValue(rec.get("name"));
        me.tambahvendorDesc();
        f.down('[name=purchaseletter_customer_id]').setValue(rec.get("customer_id"));
        f.down('[name=vendor_no_rekening]').setVisible(false);
        f.down('[name=vendor_no_rekening]').setValue('');
        el.up('window').destroy();
    },
    vendorSelect: function(el) {
        var me = this;
        var f = me.getFormdata();
        var grid = me.getVendorgrid();
        var row = grid.getSelectionModel().getSelection();
        var rec = grid.getSelectedRecord();
        var oldvendor_id = f.down('[name=vendor_vendor_id]').getValue();
        f.down('[name=customer_name]').setValue(rec.get("vendorname"));
        me.tambahvendorDesc();
        f.down('[name=vendor_vendor_id]').setValue(rec.get("vendor_id"));
        f.down('[name=vendor_no_rekening]').setVisible(false);
        f.down('[name=vendor_no_rekening]').setValue(rec.get("no_rekening"));
        me.loadVendorBank();
        if (oldvendor_id != rec.get("vendor_id") && f.down('[name=dataflow]').getValue() == "O") {
            f.down("[name=vendor_bank_name]").setValue('');
            f.down("[name=vendor_bank_account_name]").setValue('');
            f.down("[name=vendor_bank_currency]").setValue('');
        } else {
            me.loadVendorBank(f.down('[name=vendor_bankacc_id]').getValue());
        }
        el.up('window').destroy();
    },
    loadVendorBank: function(el) {
        var me = this;
        var f = me.getFormdata();
        if (f.down('[name=dataflow]').getValue() == "O") {
            me.getCustomRequestCombobox('vendorbank', f.down('[name=vendor_vendor_id]').getValue(), '', '', 'vendor_bankacc_id', 'vendorbank', '', f, '',
                function() {
                    if (el != '') {
                        f.down('[name=vendor_bankacc_id]').setValue(el);
                    }
                });
        }
    },
    tenantSelect: function(el) {
        var me = this;
        var f = me.getFormdata();
        var grid = me.getTenantgrid();
        var row = grid.getSelectionModel().getSelection();
        var rec = grid.getSelectedRecord();

        f.down('[name=customer_name]').setValue(rec.get("vendorname"));
        me.tambahvendorDesc();
        f.down('[name=vendor_vendor_id]').setValue(rec.get("vendor_id"));
        f.down('[name=vendor_no_rekening]').setVisible(true);
        f.down('[name=vendor_no_rekening]').setValue(rec.get("no_rekening"));
        el.up('window').destroy();
    },
    changeDataflowGrid: function(val) {
        var me = this;
        var g = me.getGrid();
        var store = g.getStore();
        if (val === "I") {
            g.getView().getHeaderAtIndex(7).setText('Kwitansi Date');
        } else if (val === "O") {
            g.getView().getHeaderAtIndex(7).setText('Due Date');
        }
        store.getProxy().setExtraParam('dataflow', val);
        store.loadPage(1);
    },
    printKwitansiSelect: function() {
        var me = this;

    },
    cetakVoucher: function(isnonpre) {
        var me = this;
        var grid = me.getGrid(),
            rec = grid.getSelectedRecord();
        var message = 'Pilihan menampilkan catatan pada voucher.<br /><br /><select id="notevoucher" class="x-form-field x-form-required-field x-form-text"><option value="1">Notes Voucher</option><option value="2">Notes Voucher and Note of Vendor</option><option value="3">Note of Vendor</option><option value="4">Blank</option></select>';
        me.projectprint = rec.get("project_project_id");
        me.ptprint = rec.get("pt_pt_id");
        me.projectprintname = rec.get("project_name");
        me.ptprintname = rec.get("pt_name");

        var subholding_id = rec.get("pt_subholding_id") == "" ? 0 : rec.get("pt_subholding_id");
        Ext.MessageBox.show({
            title: 'Confirmation',
            msg: message,
            buttons: Ext.MessageBox.OKCANCEL,
            fn: function(btn) {
                if (btn == 'ok') {
                    if (Ext.get('notevoucher').getValue() == "1") {
                        me.tipenotevoucher = 1;
                    } else if (Ext.get('notevoucher').getValue() == "2") {
                        me.tipenotevoucher = 2;
                    } else if (Ext.get('notevoucher').getValue() == "3") {
                        me.tipenotevoucher = 3;
                    } else if (Ext.get('notevoucher').getValue() == "4") {
                        me.tipenotevoucher = 4;
                    } else if (Ext.get('notevoucher').getValue() == "5") {
                        me.tipenotevoucher = 5;
                    } //Rizal 9 September 2019
                    if (rec) {
                        Ext.Ajax.request({
                            url: 'cashier/voucher/read',
                            method: 'POST',
                            async: false,
                            params: {
                                project_id: me.project_id,
                                pt_id: me.pt_id,
                                nonpre: isnonpre,
                                dataflow: rec.get('dataflow'),
                                mode_read: 'checktemplatevoucher'
                            },
                            success: function(response) {
                                var data = Ext.JSON.decode(response.responseText);

                                if (data.data['template'] != '') {
                                    me.reportFileNamevcr = data.data['template'];

                                    if (subholding_id == 1) {
                                        me.mainPrintCustom3();
                                    } else {
                                        me.mainPrint();
                                    }

                                } else {
                                    if (rec.get('dataflow') == 'O') {
                                        me.reportFileNamevcr = "Voucher";
                                    } else if (rec.get('dataflow') == 'I') {
                                        me.reportFileNamevcr = "VoucherIn";
                                    }

                                    if (subholding_id == 1) {
                                        me.mainPrintCustom3();
                                    } else {
                                        me.mainPrint();
                                    }

                                }

                            },
                            failure: function(response) {

                            }
                        });
                    }
                }
            }
        });

    },
    printVoucher: function() {
        var me = this;
        var grid = me.getGrid(),
            rec = grid.getSelectedRecord();

        if (rec.get("project_project_id") == 4065 || rec.get("project_project_id") == 1) {
            Ext.MessageBox.show({
                title: 'Confirmation',
                msg: 'Print Data Voucher dengan Pre Printed ?',
                buttons: Ext.MessageBox.OKCANCEL,
                fn: function(btn) {
                    if (btn == 'ok') {
                        me.cetakVoucher(0); //bergaris
                    } else {
                        me.cetakVoucher(1); //tidak bergaris
                    }
                }
            });
        } else {
            me.cetakVoucher(0);
        }

    },
    printVoucherChooseprjpt: function() {
        var me = this;
        var grid = me.getGrid(),
            rec = grid.getSelectedRecord();
        var message = 'Pilihan menampilkan catatan pada voucher.<br /><br /><select id="notevoucher" class="x-form-field x-form-required-field x-form-text"><option value="1">Notes Voucher</option><option value="2">Notes Voucher and Note of Vendor</option><option value="3">Note of Vendor</option><option value="4">Blank</option></select>';
        me.projectprint = rec.get("project_project_id");
        me.ptprint = rec.get("pt_pt_id");
        me.projectprintname = rec.get("project_name");
        me.ptprintname = rec.get("pt_name");


        me.instantWindow('FormDataChooseprjpt', 600, 'Choose Project/PT for Print', 'Choose', 'myVoucherChooseprjpt');
    },
    mainPrint: function() {
        var me = this;
        if (me.reportFileNamevcr) {
            me.xyReport = new Cashier.library.XyReportB();
            me.xyReport.init(me);
            me.xyReport.processReportJs();
        } else {
            me.tools.alert.warning("Template not found.");
        }

    },
    mainPrintCustom: function() {
        var me = this;
        if (me.reportFileNamevcr) {
            me.xyReport = new Cashier.library.XyReportB();
            me.xyReport.init(me);
            me.xyReport.processReportJsbyUserKwit();
        } else {
            me.tools.alert.warning("Template not found.");
        }

    },
    mainPrintCustom2: function() {
        var me = this;
        if (me.reportFileNamevcr) {
            me.xyReport = new Cashier.library.XyReportB();
            me.xyReport.init(me);
            me.xyReport.processReportJsbyUser3();
        } else {
            me.tools.alert.warning("Template not found.");
        }
        me.getPanel().setLoading(false);

    },
    mainPrintCustom3: function() {
        var me = this;
        if (me.reportFileNamevcr) {
            me.xyReport = new Cashier.library.XyReportB();
            me.xyReport.init(me);
            me.xyReport.processReportJsWithDirectPrint();
        } else {
            me.tools.alert.warning("Template not found.");
        }

    },
    realizationForm: function(el) {
        var me           = this;
        var action       = el.text;
        var g            = me.getGrid(),
            is_paid      = 0,
            vid, 
            is_paid_arr = [],
            next;
        var rows = g.getSelectionModel().getSelection();
        
        var count = g.getSelectionModel().getCount();
        var grid  = g,
            row   = grid.getSelectionModel().getSelection();
        rows.forEach(function(rec) {
            is_paid = rec.get("is_paid") || rec.get("dataflow") == "I" ? 1 : parseFloat(0);
            vid = rec.get("voucherID");
            is_paid_arr.push(
                rec.get("is_paid") || rec.get("dataflow") == "I" ? 1 : 0
            );
        });

        if (!me.on_realization) {
            if (count === 1) {
                if (is_paid === 0) {
                    Ext.Msg.show({
                        title: 'Warning',
                        msg: 'Voucher ID. <b>' + vid + '</b> belum terbayar, lanjutkan?',
                        buttons: Ext.Msg.YESNO,
                        icon: Ext.Msg.QUESTION,
                        fn: function(clicked) {
                            if (clicked === "yes") {
                                me.instantWindow('FormDataL', 600, 'Voucher Realization', 'create', 'myVoucherReal');
                            }
                            if (clicked === "no") {
                                return false;
                            }
                        }
                    });
                } else {
                me.instantWindow('FormDataL', 600, 'Voucher Realization', 'create', 'myVoucherReal');
                }
            } else {

                var same_is_paid_arr = is_paid_arr.every(
                    function(value, _, array) {
                        return array[0] === value;
                    }
                );
                var sum_is_paid = is_paid_arr.reduce(function(a, b) {
                    return a + b;
                }, 0);
                var blm = count - sum_is_paid;
                if (blm) {
                    Ext.Msg.show({
                        title: 'Warning',
                        msg: '<b>' + blm + ' </b>voucher dari <b> ' + count + ' </b> belum terbayar, lanjutkan?',
                        buttons: Ext.Msg.YESNO,
                        icon: Ext.Msg.QUESTION,
                        fn: function(clicked) {
                            if (clicked === "yes") {
                                me.instantWindow('FormDataL', 600, 'Voucher Realization', 'create', 'myVoucherReal');
                            }
                            if (clicked === "no") {
                                return false;
                            }
                        }
                    });
                } else {
                    me.instantWindow('FormDataL', 600, 'Voucher Realization', 'create', 'myVoucherReal');
                }
            }
        } else {
            me.instantWindow('FormDataL', 600, 'Voucher Realization', 'create', 'myVoucherReal');
        }
    },
    prosesRealization: function(unReal) {
        var me = this;
        var f = me.getFormrealization();
        var g = me.getGrid();
        var rows = g.getSelectionModel().getSelection();
        var voucherAr = [],
            next = 0;
        var allowedrealz = true;
        var allowedunrealz = true;
        var returnmsg = "<ul>";
        var returnmsgunrealz = "<ul>";
        var temprealized = f.down("[name=temp_realized]").getValue();
        var mandatory_project_close_date = f.down("[name=mandatory_project_close_date]").getValue();
        if (mandatory_project_close_date == 1 && (f.down("[name=project_close_date]").getValue() == "" || f.down("[name=project_close_date]").getValue() == null)) {

            allowedrealz = false;
            returnmsg = returnmsg + '<li>- Silahkan isi project close date (Cashbon). </li> ';
        }
        rows.forEach(function(rec) {
            console.log(rec);
            //Rizal - 17 Okt 2019
            var checkallowedsub = me.checkSubDetail(rec.get("kasbank_id"));
            if (checkallowedsub == false) {
                allowedrealz = false;
                returnmsg = returnmsg + '<li>- Amount detail dan sub detail tidak sama / Sub detail tidak lengkap pada voucher <b>' + rec.get("voucherID") + '</b>. </li> ';
            }
            //
            //Rizal - 29 Okt 2019
            var checkarexist = me.checkARexist(rec.get("kasbank_id"));
            if (checkarexist == false) {
                allowedrealz = false;
                returnmsg = returnmsg + '<li>- Silahkan isi account receivable pada voucher <b>' + rec.get("voucherID") + '</b>. </li> ';
            }
            //
            //Rizal 29 Juli 2019 --check jika kasbon, harus realisasi kasbon nya terlebih dahulu
            var checkallowed = me.checkKasbonRealisasi(rec.get("kasbank_id"));
            if (checkallowed == false) {
                allowedrealz = false;
                returnmsg = returnmsg + '<li>- Harap realisasi kasbon departement untuk voucher <b>' + rec.get("voucherID") + '</b> terlebih dahulu. </li> ';
            }
            //Rizal 1 Desember 2019
            var checkallowedrealcpms = me.checkrealisasicpms(rec.get('kasbank_id'), rec.get('project_project_id'), rec.get('pt_pt_id'), rec.get('voucherID'), moment(f.down("[name=realization_date]").getValue()).format("YYYY-MM-DD"), rec.get('master_undangan_id'));
            if (checkallowedrealcpms == false) {
                allowedrealz = false;
                returnmsg = returnmsg + '<li>- Voucher <b>' + rec.get("voucherID") + '</b> tidak dapat realisasi karna progress lapangan belum tercapai. </li> ';
            }
            if (temprealized == 1 && rec.get("is_temp_realized") == 1 && (unReal == false || unReal == undefined || unReal == '')) {
                allowedrealz = false;
                returnmsg = returnmsg + '<li>- Voucher <b>' + rec.get("voucherID") + '</b> tidak dapat di temporary realisasi karna sudah dalam status temporary realisasi. </li> ';
            }
            //
            //
            //Rizal 4 September 2019 --jika akan unrealisasi/realisasi escrow full payment, harus unrealisasi schema escrow dulu
            Ext.Ajax.request({
                url: 'cashier/voucher/read',
                method: 'POST',
                async: false,
                params: {
                    kasbank_id: rec.get("kasbank_id"),
                    mode_read: 'checkescrowpaymentrealisasi'
                },
                success: function(response) {
                    var data = Ext.JSON.decode(response.responseText);
                    if (data.data['videscrowpayment'] == '' || data.data['videscrowpayment'] == undefined || data.data['videscrowpayment'] == null) {
                        //dibiarkan kosong
                    } else {
                        if (unReal) {
                            allowedunrealz = false;
                            returnmsgunrealz = returnmsgunrealz + '<li> Gagal melakukan unrealization voucher escrow full payment. Sudah ada voucher schema escrow yang telah ter-realisasi. Harap unrealisasi voucher schema escrow terlebih dahulu. List voucher schema escrow : <b>' + data.data['videscrowpayment'] + '</b></li>';
                        } else {
                            allowedrealz = false;
                            returnmsg = returnmsg + '<li> Gagal melakukan realisasi voucher escrow full payment. Sudah ada voucher schema escrow yang telah ter-realisasi. Harap unrealisasi voucher schema escrow terlebih dahulu. List voucher schema escrow : <b>' + data.data['videscrowpayment'] + '</b></li>';
                        }
                    }
                },
                failure: function(response) {

                }
            });
            //
            voucherAr.push(rec.get("kasbank_id"));

            if (rec.get('status') == 'is_realized' && me.is_request_unrealization == 1 ) {
                allowedunrealz = false;
                returnmsgunrealz = returnmsgunrealz + '<li> Silahkan lakukan request unrealisasi terlebih dahulu pada voucher ini <b>' + rec.get('voucherID') + '</b>.</li>';

            }

            var checklinkvoucher = me.checkLinkVoucher(rec.get('kasbank_id'), rec.get('project_project_id'), rec.get('pt_pt_id') )
            if (checklinkvoucher.result == 1) {
                allowedunrealz = false;
                returnmsgunrealz = returnmsgunrealz + '<li> Voucher ini sudah terikat dengan voucher lainnya dengan nomor <b>'+checklinkvoucher.msg+'</b></li>';
            }

            var checknokwitansi = me.checkNoKwitansi( rec.get('project_project_id'), rec.get('pt_pt_id'), rec.get('kasbank_id') )
            if (checknokwitansi.result == 1) {
                allowedrealz = false;
                returnmsg = returnmsg + '<li>No kwitansi sudah ada di EREMS. No kwitansi telah digunakan oleh voucher lainnya dengan nomor: <b>'+checknokwitansi.msg+'</b></li>';
            }
        });

        // return;

        if (f.down("[name=payment_paymentmethod_id]").getValue() == "2" && f.down("[name=cheque_cheque_id]").getValue() == "") {
            allowedrealz = false;
            returnmsg = returnmsg + '<li>- Silahkan pilih cek/giro terlebih dahulu</li> ';
        }
        returnmsg = returnmsg + '</ul>';
        returnmsgunrealz = returnmsgunrealz + '</ul>';
        if (unReal) {
            if (allowedunrealz == false) {
                setTimeout(function () {
                    me.tools.alert.warning(returnmsgunrealz, function () {
                        f.setLoading(false);
                    });
                }, 100);
            } else {
                console.log("ini unreal: " + unReal);
                f.setLoading("Please wait");
                me.tools.ajax({
                    mode_create: 'realizationvoucher',
                    module: me.controllerName,
                    form: f,
                    f: f,
                    finalData: function(data) {
                        data['kasbank_id'] = voucherAr.join('~');
                        data['unrealisasi'] = unReal;
                        data['multirealisasi'] = me.is_multirealisasi;
                        data['project_id'] = me.project_id;
                        data['pt_id'] = me.pt_id;
                        return data;
                    },
                    success: function(data, model) {
                        try {
                            me.getGrid().getStore().load();
                            f.up("window").close();
                        } catch (err) {
                            console.log(err.message);
                            me.tools.alert.warning("Failed to realization voucher.");
                        }

                        var vcrno = f.down("[name=prefixcode]").getValue() + '' + f.down("[name=voucherint]").getValue();
                        rows.forEach(function(rec) {
                            //baru pim yg pake
                            me.updateUnrealisasiAPI(rec.get('kasbank_id'), rec.get('project_project_id'), rec.get('pt_pt_id'), rec.get('voucherID'), moment(f.down("[name=realization_date]").getValue()).format("YYYY-MM-DD"), vcrno, rec.get('uploadpim_id'));
                        });

                        f.setLoading(false);
                    }
                }).create();
            }
        } else {
            if (f.getForm().isValid()) {
                //Rizal 29 Juli 2019
                if (allowedrealz == false) {
                    me.tools.alert.warning(returnmsg);
                } else {
                    //
                    f.setLoading("Please wait");
                    var vcrno = f.down("[name=prefixcode]").getValue() + '' + f.down("[name=voucherint]").getValue();
                    var msgcashback = '';
                    me.tools.ajax({
                        mode_create: 'realizationvoucher',
                        module: me.controllerName,
                        form: f,
                        f: f,
                        async: false,
                        finalData: function(data) {
                            data['kasbank_id'] = voucherAr.join('~');
                            data['unrealisasi'] = unReal;
                            data['multirealisasi'] = me.is_multirealisasi;
                            data['project_id'] = me.project_id;
                            data['pt_id'] = me.pt_id;
                            return data;
                        },
                        success: function(data, model) {
                            try {
                                //update realisasi cpms
                                rows.forEach(function(rec) {
                                    Ext.Ajax.request({
                                        url: 'cashier/voucher/read',
                                        method: 'POST',
                                        async: false,
                                        params: {
                                            kasbank_id: rec.get('kasbank_id'),
                                            mode_read: 'getvoucherfdar'
                                        },
                                        success: function(response) {
                                            var datafdar = Ext.JSON.decode(response.responseText);
                                            if (datafdar.data['casboncashbackvid'] != '') {
                                                msgcashback = msgcashback + '<br> Voucher cashback cashbon tergenerate pada Voucher ID ' + datafdar.data['casboncashbackvid'];
                                            }
                                        },
                                        failure: function(response) {

                                        }
                                    });
                                    me.updateRealisasiCPMS(rec.get('kasbank_id'), rec.get('project_project_id'), rec.get('pt_pt_id'), rec.get('voucherID'), moment(f.down("[name=realization_date]").getValue()).format("YYYY-MM-DD"), rec.get('master_undangan_id'), vcrno, rec.get('payment_receipt_no'));

                                    me.updateRealisasiPIM(rec.get('kasbank_id'), rec.get('project_project_id'), rec.get('pt_pt_id'), rec.get('voucherID'), moment(f.down("[name=realization_date]").getValue()).format("YYYY-MM-DD"), vcrno, rec.get('uploadpim_id'));

                                    me.updateRealisasiAPI(rec.get('kasbank_id'), rec.get('project_project_id'), rec.get('pt_pt_id'), rec.get('voucherID'), moment(f.down("[name=realization_date]").getValue()).format("YYYY-MM-DD"), vcrno, rec.get('uploadpim_id'));
                                });
                                //
                                me.getGrid().getStore().load();
                                f.up("window").close();
                                if (msgcashback != '') {
                                    me.tools.alert.info(msgcashback);
                                }
                            } catch (err) {
                                console.log(err.message);
                                me.tools.alert.warning("Failed to realization voucher.");
                            }
                            f.setLoading(false);
                        }
                    }).create();
                    //Rizal 29 Juli 2019
                }
                //
            }
        }


    },
    fdareditnokwitansi: function() {
        var me = this;
        var f = me.getFormeditnokwitansi();
        var grid = me.getGrid(),
            rec = grid.getSelectedRecord();
        var count = grid.getSelectionModel().getCount();
        var rows = grid.getSelectionModel().getSelection();

        f.down("[name=kasbank_id]").setValue(rec.get("kasbank_id"));
        f.down("[name=receipt_no]").setValue(rec.get("payment_receipt_no"));
    },
    fdardatareal: function() {
        var me = this;
        var f = me.getFormrealization();
        var grid = me.getGrid(),
            rec = grid.getSelectedRecord();
        var count = grid.getSelectionModel().getCount();
        var rows = grid.getSelectionModel().getSelection();
        var voucherAr = [],
            cheque_id_form = null,
            is_posting, unitIdArr = [],
            plAr = [],
            kasbankIdAr = [];
        var dataflow, cheque_id, payment_method, sum_in = 0,
            sum_out = 0,
            dataflow_real, arr_pt = [],
            schedule_ar = [],
            kasbankIdarPayment = [];
        var cashbackamount = 0;
        var is_cashback = 0;
        var auto_cashback = 0;
        var voucherprefixcashbon_id = 0;
        var isdisablevoucherno = 0;
        var isprojectclosedate = 0;
        var kasbondept_no = '';
        var project_close_date = '';
        var request_unrealize_msg = '';

        Ext.Ajax.request({
            url: 'cashier/voucher/read',
            method: 'POST',
            async: false,
            params: {
                kasbank_id: rec.get("kasbank_id"),
                mode_read: 'getvoucherfdar'
            },
            success: function(response) {
                var datafdar = Ext.JSON.decode(response.responseText);
                if (datafdar.data['isdisablevoucherno'] > 0) {
                    isdisablevoucherno = datafdar.data['isdisablevoucherno'];
                }
                if (datafdar.data['isprojectclosedate'] > 0) {
                    isprojectclosedate = datafdar.data['isprojectclosedate'];
                }
                project_close_date = datafdar.data['project_close_date'];
            },
            failure: function(response) {

            }
        });
        f.down("[name=mandatory_project_close_date]").setValue(0);
        cheque_id = rec.get("cheque_cheque_id");
        cheque_id_form = f.down('[name=cheque_cheque_id]').getValue();
        is_posting = rec.get("is_posting");
        payment_method = rec.get("payment_paymentmethod_id");
        Ext.getCmp('formdatarealvoucherprefix_voucherprefix_id').allowBlank = false;
        rows.forEach(function(rec) {
            voucherAr.push(rec.get("voucherID"));
            if (rec.get("dataflow") === "I") {
                sum_in += parseFloat(rec.get("amount"));
            }
            if (rec.get("dataflow") === "O") {
                sum_out += parseFloat(rec.get("amount"));
            }
            if (rec.get("purchaseletter_purchaseletter_id")) {
                plAr += rec.get("purchaseletter_purchaseletter_id") + '~';
                kasbankIdAr += rec.get("kasbank_id") + '~';
            }
            if (rec.get("unit_unit_id")) {
                unitIdArr += rec.get("unit_unit_id") + '~';
            }
            if (rec.get("payment_paymentflag_id") === 1) {
                kasbankIdarPayment += rec.get("kasbank_id") + '~';
            }
            arr_pt.push(rec.get("pt_pt_id"));
            if (rec.get("kasbondept_no") != '') {
                kasbondept_no = kasbondept_no + ',' + rec.get("kasbondept_no");
            }
            Ext.Ajax.request({
                url: 'cashier/voucher/read',
                method: 'POST',
                async: false,
                params: {
                    kasbank_id: rec.get('kasbank_id'),
                    mode_read: 'getvoucherfdar'
                },
                success: function(response) {
                    var datafdar = Ext.JSON.decode(response.responseText);
                    cashbackamount = cashbackamount + datafdar.data['remainingkasbon'];
                    if (is_cashback == 0 && datafdar.data['is_cashback'] > 0) {
                        is_cashback = datafdar.data['is_cashback'];
                    }
                    if (auto_cashback == 0 && datafdar.data['auto_cashback'] > 0) {
                        auto_cashback = datafdar.data['auto_cashback'];
                    }
                    if (datafdar.data['voucherprefixcashbon_id'] > 0) {
                        voucherprefixcashbon_id = datafdar.data['voucherprefixcashbon_id'];
                    }
                    request_unrealize_msg = request_unrealize_msg + datafdar.data['request_unrealisasi_message'] + '\n';
                },
                failure: function(response) {

                }
            });
            if (rec.get("kasbank_reff_id") > 0) {
                f.down("[name=payment_payment_date]").setVisible(true);
                f.down("[name=payment_payment_date]").setValue(moment(rec.get("payment_payment_date")).format("YYYY-MM-DD"));
            }
        });
        var samept = arr_pt.every(
            function(value, _, array) {
                return array[0] === value;
            }
        );
        if (!samept) {
            me.tools.alert.warning("Tidak bisa mutiple realiasi, karena voucher company tidak sama.", function() {
                f.up("window").close();
            });
        }

        if (sum_in === sum_out) { //jika sama default IN
            dataflow_real = 'I';
        } else {
            if (sum_in > sum_out) {
                dataflow_real = 'I';
            } else {
                dataflow_real = 'O';
            }
        }
        if (cheque_id || payment_method === 2) { // 2 itu cekgiro payment id
            f.down('[name=cheque_cheque_no]').setVisible(true);
            f.down('[id=chequenoidlabel]').setVisible(true);
        }
        var is_realization = rec.get("is_realized");
        if (is_realization) {
            console.log(request_unrealize_msg.length);
            if (request_unrealize_msg.length > 2) {
                f.down('[name=requestunrealizecontainer]').setVisible(true);
                f.down('[name=reasonrequestunrealize]').setValue(request_unrealize_msg);
            }else{
                f.down('[name=requestunrealizecontainer]').setVisible(false);
            }
            f.down('[action=unreal]').setDisabled(false);
            if (rec.get("is_temp_realized") < 1) {
                f.down('[name=temp_realized]').setValue("0");
                f.down('[action=save]').setDisabled(true);
                f.down('[name=temp_realized]').setDisabled(true);
                f.down('[name=voucherprefix_voucherprefix_id]').setDisabled(true);
                f.down('[name=payment_paymentmethod_id]').setDisabled(true);
                f.down('[name=cheque_cheque_no]').setDisabled(true);
                f.down('[action=browseCheque]').setVisible(false);
                f.down('[name=realization_date]').setDisabled(true);
                f.down('[action=browseSub]').setVisible(false);
            } else {
                f.down('[name=temp_realized]').setValue("1");
                f.down('[action=save]').setDisabled(false);
                f.down('[name=temp_realized]').setDisabled(false);
                f.down('[name=voucherprefix_voucherprefix_id]').setDisabled(false);
                f.down('[name=payment_paymentmethod_id]').setDisabled(false);
                f.down('[name=cheque_cheque_no]').setDisabled(false);
                f.down('[action=browseCheque]').setVisible(false);
                f.down('[name=realization_date]').setDisabled(false);
                f.down('[action=browseSub]').setVisible(false);
            }
        } else {
            f.down('[name=temp_realized]').setValue("0");
        }

        if (is_posting) {
            f.down('[action=unreal]').setDisabled(true);
            f.down('[action=save]').setDisabled(true);
        }

        me.getCustomRequestCombobox('paymentmethodreal', rec.get("pt_pt_id"), rec.get("project_project_id"), '', 'payment_paymentmethod_id', 'paymentmethod', '', f, '',
            function() {});

        me.getCustomRequestComboboxV2('kasbank', dataflow_real, rec.get('pt_pt_id'), rec.get('project_project_id'), 'voucherprefix_voucherprefix_id', 'voucherprefix', ['coa'], f, '',
            function() {
                f.loadRecord(rec);
                dataflow = f.down("[name=dataflow]").getValue();
                if (dataflow === "I") {
                    me.dataflow = "IN";

                    if (cheque_id || payment_method === 2) {

                        f.down('[name=voucherprefix_voucherprefix_id]').setValue(rec.get("voucherprefix_voucherprefix_id"));
                    }
                    f.down("[name=realization_date]").setValue(moment(rec.get("realization_date")).format("YYYY-MM-DD"));
                } else {
                    me.dataflow = "OUT";
                    if (cheque_id || payment_method === 2) {
                        if (cheque_id_form) {
                            me.getChequeInfo(cheque_id, f, true, function() {
                                f.loadRecord(rec);

                                f.down("[name=realization_date]").setValue(moment(rec.get("realization_date")).format("YYYY-MM-DD"));
                            }, me.dataflow);
                        }


                        f.down('[name=voucherprefix_voucherprefix_id]').setReadOnly(true);
                        f.down('[name=voucherprefix_voucherprefix_id]').setFieldStyle('background:none #eee;');
                        f.down("[name=realization_date]").setValue(moment(rec.get("realization_date")).format("YYYY-MM-DD"));
                    }

                }


                f.down("[name=voucherID]").setValue(voucherAr.join());
                f.down("[name=unit_unit_id]").setValue(unitIdArr);
                f.down("[name=purchaseletter_purchaseletter_id]").setValue(plAr);
                f.down("[name=kasbank_id]").setValue(kasbankIdAr);
                f.down("[name=kasbank_id_arpayment]").setValue(kasbankIdarPayment);

                if (!is_realization) {
                    var v = me.tools.comboHelper(f.down("[name=voucherprefix_voucherprefix_id]")).getField('voucherprefix_id', 'description');
                    var v2 = me.tools.comboHelper(f.down("[name=voucherprefix_voucherprefix_id]")).getField('voucherprefix_id', 'coa_name');
                    if (v == "KAS" || v2 == "K") {
                        f.down("[name=realization_date]").setValue(moment(me.dateNow).format("YYYY-MM-DD"));
                    }
                    var via = f.down('[name=voucherprefix_voucherprefix_id]').getValue();
                    var vias = f.down('[name=realization_date]').getValue();

                    if (via && vias) {
                        f.down('[action=save]').setText('Please wait');
                        me.checkMandatoryReal(function() {

                            if (via === rec.get('voucherprefix_voucherprefix_id') && rec.get("voucherint") !== "") {
                                f.down("[name=voucherint]").setValue(me.pad(rec.get("voucherint"), 4));
                            }
                            f.down('[action=save]').setText('Save');
                        });
                    } else {
                        f.down('[name=prefixcode]').setValue('');
                        f.down('[name=voucherint]').setValue('');
                    }
                } else {
                    if (rec.get("voucherint")) {
                        f.down("[name=voucherint]").setValue(me.pad(rec.get("voucherint"), 4));
                    }
                    if (rec.get("realization_date")) {
                        f.down("[name=realization_date]").setValue(moment(rec.get("realization_date")).format("YYYY-MM-DD"));
                    }
                    me.showSubglCode(f, is_realization);

                }
            }, '', '', rec.get("voucherprefix_voucherprefix_id"));
        if (cashbackamount > 0 && is_cashback == 0) {
            f.down('[name=voucherprefix_voucherprefixcashbon_id]').setVisible(true);
            f.down('[name=cashback_amount]').setVisible(true);
            f.down('[name=cashback_amount]').setValue(accounting.formatMoney(cashbackamount));
            if (auto_cashback > 0) {
                Ext.getCmp('formdatarealvoucherprefix_voucherprefixcashbon_id').allowBlank = false;
            }
        }
        if (is_realization) {
            f.down('[name=voucherprefix_voucherprefixcashbon_id]').setVisible(false);
            f.down('[name=cashback_amount]').setVisible(false);
        }
        me.getCustomRequestComboboxV2('kasbank', (dataflow_real == "I", "O", "I"), rec.get('pt_pt_id'), rec.get('project_project_id'), 'voucherprefix_voucherprefixcashbon_id', 'voucherprefix', ['coa'], f, '',
            function() {}, '', '', rec.get("voucherprefix_voucherprefix_id"));

        Ext.Ajax.request({
            url: 'cashier/common/read',
            method: 'POST',
            timeout: 100000000,
            params: {
                hideparam: 'getaccessaction',
                term: 'VoucherUnrealization',
                start: 0,
                limit: 1000,
            },
            success: function(response) {
                response = Ext.JSON.decode(response.responseText);
                var isactive = response.data[0].active;
                if (isactive == 0) {
                    f.down("[action=unreal]").setVisible(false);
                }
            },
            failure: function(response) {

            }
        });
        if (isdisablevoucherno > 0) {
            f.down("[name=voucherint]").setReadOnly(true);
        }
        if (kasbondept_no != '' && isprojectclosedate > 0 && !is_realization) {
            f.down("[name=project_close_date]").setVisible(true);
            f.down("[name=mandatory_project_close_date]").setValue(1);
            f.down("[name=project_close_date]").setValue(project_close_date);
        } else {
            f.down("[name=project_close_date]").setVisible(false);
        }
    },
    getPrefixCode: function(f, prefix, tgl, df, callback, is_realized) {
        var me = this;
        var grid = me.getGrid(),
            rec = grid.getSelectedRecord();
        var teks = '';
        var x = f.down("[name=voucherprefix_voucherprefix_id]").getStore().findRecord("voucherprefix_id", f.down("[name=voucherprefix_voucherprefix_id]").getValue(), 0, false, true, true);
        f.setLoading('Get Prefix Voucher');
        f.down("button[action=save]").setDisabled(true);
        me.tools.ajax({
            params: {
                module: me.controllerName,
                voucherprefix_voucherprefix_id: prefix,
                dataflow: df,
                realization_date: tgl,
                is_temp_realized: f.down("[name=temp_realized]").getValue()
            },
            form: f,
            success: function(data) {
                try {
                    teks = data.result;
                    var counter = data.counter;
                    var dates = tgl;
                    var now = moment(dates).format("YYYY/MM");
                    f.down('[name=prefixcode]').setValue(teks + now + '/');
                    if (f.down("[name=temp_realized]").getValue() == 1) {
                        f.down('[name=prefixcode]').setValue(x.data['temp_prefix'] + now + '/');
                    }
                    if (counter && !is_realized) {
                        f.down("[name=voucherint]").setValue(me.pad(counter, 4));
                    }
                    if (is_realized) {
                        if (rec.get("is_temp_realized") < 1) {
                            f.down("button[action=save]").setDisabled(true);
                        } else {
                            f.down("button[action=save]").setDisabled(false);
                        }
                    } else {
                        f.down("button[action=save]").setDisabled(false);
                    }
                    if (typeof callback === 'function') {
                        callback();
                    }
                } catch (err) {
                    console.log(err.message);
                    me.tools.alert.warning("Failed to get prefix voucher.");
                }
                f.setLoading(false);
            }
        }).read('getprefix');
    },
    pad: function(num, size) {
        var s = "000" + num;
        return s.substr(s.length - size);
    },
    blurVoucher: function(value) {
        var me = this;
        var f = me.getFormrealization();
        f.down("[name=voucherint]").setValue(me.pad(value, 4));
    },
    prosesUnRealization: function() {
        var me = this;
        var f = me.getFormrealization();
        var voucherno = f.down('[name=voucher_no]').getValue();
        var prefix = f.down("[name=prefixcode]").getValue();
        var vidpartner = '';
        var g = me.getGrid();
        var rows = g.getSelectionModel().getSelection();

        rows.forEach(function(rec) {
            if (rec.get("vid_partner_kasbank") != '') {
                vidpartner = vidpartner + rec.get("vid_partner_kasbank");
            }
        });
        Ext.Msg.show({
            title: 'UnRealisasi Voucher No. ' + voucherno + '/' + prefix + '?',
            msg: 'Are you sure to UnRealisasi Voucher No. ' + voucherno + '/' + prefix + '?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            fn: function(clicked) {
                if (clicked === "yes") {
                    Ext.getCmp('formdatarealvoucherprefix_voucherprefix_id').allowBlank = true;
                    var pl = f.down('[name=purchaseletter_purchaseletter_id]').getValue();
                    var unitid = f.down('[name=unit_unit_id]').getValue();
                    var kid = f.down('[name=kasbank_id]').getValue();
                    if (pl.search('~') > 0) {
                        me.checkMutpleUnit(f, unitid, pl, kid, function() {

                            if (me.is_closewarning === 1) {
                                if (vidpartner != '') {
                                    Ext.Msg.confirm('Confirmation', 'Voucher ini terintegrasi dengan voucher lainnya [' + vidpartner + ']?', function(btnc) {
                                        if (btnc == 'yes') {
                                            me.prosesRealization(1);
                                        } else {
                                            f.setLoading(false);
                                        }
                                    });
                                } else {
                                    me.prosesRealization(1);
                                }
                            }
                        }, true);
                    } else {
                        if (vidpartner != '') {
                            Ext.Msg.confirm('Confirmation', 'Voucher ini terintegrasi dengan voucher lainnya [' + vidpartner + ']?', function(btnc) {
                                if (btnc == 'yes') {
                                    me.prosesRealization(1);
                                } else {
                                    f.setLoading(false);
                                }
                            });
                        } else {
                            me.prosesRealization(1);
                        }
                    }

                }
                if (clicked === "no") {

                }
            }
        });
    },
    checkMutpleUnitReal: function(f, unit, pl, kid, callback, loading) {
        var me = this;
        me.is_closewarning = 0;
        f.setLoading("Checking schedule unit revision");
        me.tools.ajax({
            form: f,
            params: {
                module: me.controllerName,
                unit_id: unit,
                purchaseletter_id: pl,
                kasbank_id: kid
            },
            success: function(data, model) {
                try {
                    if (data.result) {
                        if (data.result === 2) {
                            me.is_closewarning = 0;
                            me.tools.alert.warning("Unit <b>" + data.unit_number + "</b> sedang dalam perubahan harga dengan <br>VC ID.  <b>" + data.vid + "</b>",
                                function() {
                                    f.up("window").close();
                                }
                            );
                        } else if (data.result === 3) {
                            me.is_closewarning = 0;
                            me.tools.alert.warning("Unit <b>" + data.unit_number + "</b> sedang dalam perubahan kavling dengan <br>VC ID.  <b>" + data.vid + "</b>",
                                function() {
                                    f.up("window").close();
                                }
                            );
                        } else if (data.result === 4) {
                            me.is_closewarning = 0;
                            me.tools.alert.warning("Unit <b>" + data.unit_number + "</b> sedang dalam perubahan schedule dengan <br>VC ID. <b> " + data.vid + "</b>",
                                function() {
                                    f.up("window").close();
                                }
                            );
                        } else {
                            me.is_closewarning = 1;
                        }
                    } else {

                        f.setLoading(false);
                        me.tools.alert.warning("Failed to check unit.");
                    }
                    if (typeof callback === "function") {
                        callback();
                    }
                } catch (err) {
                    console.log(err.message);
                    me.tools.alert.warning("Failed to check unit.");
                }
                if (!loading) {
                    f.setLoading(false);
                }
            }
        }).read('checkmutipleunit');
    },
    checkMutpleUnit: function(f, unit, pl, kid, callback, loading) {
        var me = this;
        me.is_closewarning = 0;
        console.log('running validation');
        f.setLoading("Checking schedule unit revision");
        me.tools.ajax({
            form: f,
            params: {
                module: me.controllerName,
                unit_id: unit,
                purchaseletter_id: pl,
                kasbank_id: kid
            },
            success: function(data, model) {
                try {
                    if (data.result) {
                        if (data.result === 2) {
                            me.is_closewarning = 0;
                            me.tools.alert.warning("Unit <b>" + data.unit_number + "</b> sedang dalam perubahan harga dengan <br>VC ID.  <b>" + data.vid + "</b>",
                                function() {
                                    f.up("window").close();
                                }
                            );
                        } else if (data.result === 3) {
                            me.is_closewarning = 0;
                            me.tools.alert.warning("Unit <b>" + data.unit_number + "</b> sedang dalam perubahan kavling dengan <br>VC ID.  <b>" + data.vid + "</b>",
                                function() {
                                    f.up("window").close();
                                }
                            );
                        }
                        else if (data.result === 4) {
                            me.is_closewarning = 0;
                            me.tools.alert.warning("Unit <b>" + data.unit_number + "</b> sedang dalam perubahan schedule dengan <br>VC ID. <b> " + data.vid + "</b>",
                                    function () {
                                        f.up("window").close();

                                    }
                            );
                        }
                        else {
                            me.is_closewarning = 1;
                        }
                    }
                    if (typeof callback === "function") {
                        callback();
                    }
                } catch (err) {
                    console.log(err.message);
                    me.tools.alert.warning("Failed to check unit.");
                }
                if (!loading) {
                    f.setLoading(false);
                }
            }
        }).read('checkmutipleunit');
    },
    checkUnit: function(f, unit, pl, callback, loading) {
        var me = this;
        me.is_closewarning = 0;
        f.setLoading("Check unit revision");
        me.tools.ajax({
            form: f,
            params: {
                module: me.controllerName,
                unit_id: unit,
                purchaseletter_id: pl
            },
            success: function(data, model) {
                try {
                    if (data) {
                        if (data.result) {
                            if (data.result === 2) {
                                f.setLoading(false);
                                me.is_closewarning = 0;
                                me.tools.alert.warning("Unit sedang dalam perubahan harga.",
                                    function() {
                                        f.up("window").close();
                                    }
                                );
                            } else if (data.result === 3) {
                                f.setLoading(false);
                                me.is_closewarning = 0;
                                me.tools.alert.warning("Unit sedang dalam perubahan kavling.",
                                    function() {
                                        f.up("window").close();
                                    }
                                );
                            } else if (data.result === 4) {
                                f.setLoading(false);
                                me.is_closewarning = 0;
                                me.tools.alert.warning("Unit sedang dalam perubahan schedule.",
                                    function() {
                                        f.up("window").close();
                                    }
                                );
                            } else if (data.result === 0) {
                                me.is_closewarning = 1;
                            } else {
                                me.is_closewarning = 1;
                            }
                        } else {
                            me.is_closewarning = 1;
                        }
                    }
                    if (typeof callback === "function") {
                        callback();
                    }
                } catch (err) {
                    console.log(err.message);
                    me.tools.alert.warning("Failed to check unit.");
                }
                if (!loading) {
                    f.setLoading(false);
                }

            }
        }).read('checkunit');
    },
    checkDenda: function(f, unit, callback) {
        var me = this;
        f.setLoading("Check unit revision");
        me.tools.ajax({
            params: {
                module: me.controllerName,
                unit_id: unit
            },
            form: f,
            success: function(data, model) {
                try {
                    if (parseFloat(data.result) > 0) {
                        me.tools.alert.warning("Ada denda yang harus dibayar sebesar Rp " + accounting.formatMoney(data.result));
                    }
                    if (typeof callback === "function") {
                        callback();
                    }
                } catch (err) {
                    console.log(err.message);
                    me.tools.alert.warning("Failed to check unit.");
                }
                f.setLoading(false);
            }
        }).read('checkdenda');
    },
    dataSaveChequeIn: function(call) {
        var me = this;
        var fd = me.cheque_formdata;
        var f = me.getFormdatachequein();
        var chequebrowsegrid = Ext.getCmp('browseChequeGrid');
        var cheque = f.down("[name=cheque_no]").getValue();
        if (f.getForm().isValid()) {
            f.setLoading("Please wait");
            me.saved_id = 0;
            me.tools.ajax({
                alert: true,
                module: 'mastercheque',
                controller: 'mastercheque',
                form: f,
                finalData: function(data) {
                    return data;
                },
                callback: function(info) { //getinfo message
                    try {
                        if (info.msg === "SUCCESS") {
                            fd.down('[name=cheque_cheque_id]').setValue(info.id);
                            fd.down('[name=cheque_cheque_no]').setValue(cheque);
                            f.up("window").close();
                            chequebrowsegrid.up("window").close();
                        }
                    } catch (err) {
                        console.log(err.message);
                        me.tools.alert.warning("Failed to create cheque.");
                    }
                    f.setLoading(false);
                },
            }).create();
        }
    },
    dataSaveChequeOut: function(call) {
        var me = this;
        var fd = me.cheque_formdata;
        var f = me.getFormdatachequeout();
        var chequebrowsegrid = Ext.getCmp('browseChequeGrid');
        var cheque = f.down("[name=cheque_no]").getValue();
        if (f.getForm().isValid()) {
            f.setLoading("Please wait");
            me.saved_id = 0;
            me.tools.ajax({
                module: 'masterchequeout',
                alert: 'disable',
                controller: 'mastercheque',
                form: f,
                finalData: function(data) {
                    return data;
                },
                callback: function(info) { //getinfo message
                    try {
                        if (info.msg === "SUCCESS") {
                            fd.down('[name=cheque_cheque_id]').setValue(info.id);
                            fd.down('[name=cheque_cheque_no]').setValue(cheque);
                            f.up("window").close();
                            chequebrowsegrid.up("window").close();
                        }
                    } catch (err) {
                        console.log(err.message);
                        me.tools.alert.warning("Failed to create cheque.");
                    }
                    f.setLoading(false);
                },
            }).create();
        }
    },
    fdarin: function() {
        var me = this;
        var f = me.getFormdatachequein();
        if (f) {
            f.down('[name=pt_id]').setValue(me.ptId);
            f.down('[name=project_id]').setValue(me.projectId);
            f.down('[name=pt_pt_id]').setValue(me.pt_id);
            f.down('[name=project_project_id]').setValue(me.project_id);
            me.getCustomRequestComboboxModule('mastercheque', 'bank', '', '', '', 'bank_bank_id', 'bank', '', f, '', function() {
                f.down("[action=saveuse]").setDisabled(false);
                //                f.down('[name=pt_pt_id]').setValue(me.pt_id);
            });
        }
    },
    fdarvendorbank: function() {
        var me = this;
        var f = me.getFormdatavendorbank();
        if (f) {
            me.getCustomRequestCombobox('masterbank', '', '', '', 'vendor_bank_name', 'bank', '', f, '',
                function() {});
            me.getCustomRequestCombobox('mastercurrency', '', '', '', 'vendor_bank_currency', 'currency', '', f, '',
                function() {});
        }
    },
    fdarout: function() {
        var me = this;
        var f = me.getFormdatachequeout();
        if (f) {
            me.getCustomRequestComboboxModule('mastercheque', 'detailprojectv2', '', '', '', 'project_project_id', 'project', '', f, '', function() {
                f.down('[name=project_project_id]').setValue(me.project_id);
            });
            me.getCustomRequestComboboxModule('mastercheque', 'detailpt', '', '', '', 'pt_pt_id', 'pt', '', f, '', function() {
                f.down('[name=pt_pt_id]').setValue(me.pt_id);
                f.down("[action=saveuse]").setDisabled(false);
            });
        }
    },
    blurVoucherId: function(val) {
        var me = this;
        var fs = me.getFormsearch();
        fs.down('[name=voucherID]').setValue(me.leadingZero(val, 7));
    },
    changeDatatypeSearch: function(val) {
        var me = this;
        var fs = me.getFormsearch();
        me.disableFieldFromSearch(function() {
            if (val == "1") {
                fs.down('[name=voucherID]').setVisible(true);
                fs.down('[name=voucherID]').setValue('');
                fs.down('[name=voucherID]').focus(false, 200);
            } else if (val == "2") {
                fs.down('[name=voucher_no]').setVisible(true);
                fs.down('[name=voucher_no]').setValue('');
                fs.down('[name=voucher_no]').focus(false, 200);
            } else if (val == "3") {
                fs.down('[name=customer_name]').setVisible(true);
                fs.down('[name=customer_name]').setValue('');
                fs.down('[name=customer_name]').focus(false, 200);
            } else if (val == "4") {
                fs.down('[name=vendor]').setVisible(true);
                fs.down('[name=vendor]').setValue('');
                fs.down('[name=vendor]').focus(false, 200);
            } else if (val == "5") {
                fs.down('[name=description]').setVisible(true);
                fs.down('[name=description]').setValue('');
                fs.down('[name=description]').focus(false, 200);
            } else if (val == "6") {
                fs.down('[name=receipt_no]').setVisible(true);
                fs.down('[name=receipt_no]').setValue('');
                fs.down('[name=receipt_no]').focus(false, 200);
            } else if (val == "7") {
                fs.down('[name=amount]').setVisible(true);
                fs.down('[name=amount]').setValue('');
                fs.down('[name=amount]').focus(false, 200);
            } else if (val == "8") {
                fs.down('[name=chequegiro_no]').setVisible(true);
                fs.down('[name=chequegiro_no]').setValue('');
                fs.down('[name=chequegiro_no]').focus(false, 200);
            } else if (val == "9") {
                fs.down('[name=coasearch]').setVisible(true);
                fs.down('[name=coasearch]').setValue('');
                fs.down('[name=coasearch]').focus(false, 200);
            } else if (val == "10") {
                fs.down('[name=voucherdept_no]').setVisible(true);
                fs.down('[name=voucherdept_no]').setValue('');
                fs.down('[name=voucherdept_no]').focus(false, 200);
            } else if (val == "11") {
                fs.down('[name=reference_no]').setVisible(true);
                fs.down('[name=reference_no]').setValue('');
                fs.down('[name=reference_no]').focus(false, 200);
            } else if (val == "12") {
                fs.down('[name=virtualaccount_no]').setVisible(true);
                fs.down('[name=virtualaccount_no]').setValue('');
                fs.down('[name=virtualaccount_no]').focus(false, 200);
            } else if (val == "13") {
                fs.down('[name=subsearch]').setVisible(true);
                fs.down('[name=subsearch]').setValue('');
                fs.down('[name=subsearch]').focus(false, 200);
            } else if (val == "14") {
                fs.down('[name=spk]').setVisible(true);
                fs.down('[name=spk]').setValue('');
                fs.down('[name=spk]').focus(false, 200);
            } else if (val == "15") {
                fs.down('[name=coasearch]').setVisible(true);
                fs.down('[name=coasearch]').setValue('');
                fs.down('[name=coasearch]').focus(false, 200);
            } else if (val == "16") {
                fs.down('[name=bank_name_search]').setVisible(true);
                fs.down('[name=bank_name_search]').setValue('');
                fs.down('[name=bank_name_search]').focus(false, 200);
            } else {
                fs.down('[name=voucherID]').setVisible(false);
                fs.down('[name=voucherID]').setValue('');
                fs.down('[name=voucher_no]').setVisible(false);
                fs.down('[name=voucher_no]').setValue('');
                fs.down('[name=customer_name]').setVisible(false);
                fs.down('[name=customer_name]').setValue('');
                fs.down('[name=vendor]').setVisible(false);
                fs.down('[name=vendor]').setValue('');
                fs.down('[name=description]').setVisible(false);
                fs.down('[name=description]').setValue('');
                fs.down('[name=receipt_no]').setVisible(false);
                fs.down('[name=receipt_no]').setValue('');
                fs.down('[name=amount]').setVisible(false);
                fs.down('[name=amount]').setValue('');
                fs.down('[name=chequegiro_no]').setVisible(false);
                fs.down('[name=chequegiro_no]').setValue('');
                fs.down('[name=coasearch]').setVisible(false);
                fs.down('[name=coasearch]').setValue('');
                fs.down('[name=reference_no]').setVisible(false);
                fs.down('[name=reference_no]').setValue('');
                fs.down('[name=virtualaccount_no]').setVisible(false);
                fs.down('[name=virtualaccount_no]').setValue('');
                fs.down('[name=subsearch]').setVisible(false);
                fs.down('[name=subsearch]').setValue('');
                fs.down('[name=spk]').setVisible(false);
                fs.down('[name=spk]').setValue('');
                fs.down('[name=voucherdept_no]').setVisible(false);
                fs.down('[name=voucherdept_no]').setValue('');
                fs.down('[name=bank_name_search]').setVisible(false);
                fs.down('[name=bank_name_search]').setValue('');
            }
        });
    },
    disableFieldFromSearch: function(callback) {
        var me = this;
        var fs = me.getFormsearch();
        fs.down('[name=voucherID]').setValue('');
        fs.down('[name=voucher_no]').setValue('');
        fs.down('[name=customer_name]').setValue('');
        fs.down('[name=vendor]').setValue('');
        fs.down('[name=description]').setValue('');
        fs.down('[name=receipt_no]').setValue('');
        fs.down('[name=amount]').setValue('');
        fs.down('[name=voucherID]').setVisible(false);
        fs.down('[name=voucher_no]').setVisible(false);
        fs.down('[name=customer_name]').setVisible(false);
        fs.down('[name=vendor]').setVisible(false);
        fs.down('[name=description]').setVisible(false);
        fs.down('[name=receipt_no]').setVisible(false);
        fs.down('[name=amount]').setVisible(false);
        fs.down('[name=chequegiro_no]').setVisible(false);
        fs.down('[name=coasearch]').setVisible(false);
        fs.down('[name=subsearch]').setVisible(false);
        fs.down('[name=spk]').setValue('');
        fs.down('[name=spk]').setVisible(false);
        fs.down('[name=voucherdept_no]').setVisible(false);
        fs.down('[name=voucherdept_no]').setValue('');
        fs.down('[name=reference_no]').setVisible(false);
        fs.down('[name=reference_no]').setValue('');
        fs.down('[name=virtualaccount_no]').setVisible(false);
        fs.down('[name=virtualaccount_no]').setValue('');
        fs.down('[name=bank_name_search]').setVisible(false);
        fs.down('[name=bank_name_search]').setValue('');
        if (typeof callback === "function") {
            callback();
        }
    },
    dataDestroy: function() {
        var me = this;
        var p = me.getPanel();
        var rows = me.getGrid().getSelectionModel().getSelection();
        var iskwitansi = false;
        var is_uploadems = false;
        if (rows.length < 1) {
            Ext.Msg.alert('Info', 'No record selected !');
            return;
        } else {
            var confirmmsg, successmsg, failmsg;
            
            var isVoucherExternal = true; //variable untuk cek apakah dari api voucher
            rows.forEach(function(rec) {
                if (rec.get("dataflow") == "I" && rec.get("payment_receipt_no") != "") {
                    iskwitansi = true;
                }

                if (rec.get("uploadems_id") > 0) {
                    is_uploadems = true;
                }
                
                if (rec.get("uploadApiID") == "" || rec.get("uploadApiID") == null) {
                    isVoucherExternal = false;
                }
            });

            if (isVoucherExternal) {
                Ext.Msg.show({
                    title  : 'Info',
                    msg    : 'Voucher ini adalah voucher external FAMS, tidak dapat dihapus!',
                    buttons: Ext.Msg.OK,
                    icon   : Ext.Msg.INFO
                });
                return;
            }
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

            if (is_uploadems) {
                Ext.Msg.alert('Info', 'Ini adalah voucher ems, tidak dapat dihapus!');
                return;
            }

            Ext.Msg.confirm('Delete Data', confirmmsg + ' <p id="labelpilihandelete" ' + (iskwitansi == true ? "" : "hidden") + '><br>Kwitansi<br></p>' +
                '<select id="pilihandelete" ' + (iskwitansi == true ? "" : "hidden") + '><option value="batal">Batal Kwitansi (sudah cetak kwitansi)</option><option value="nonbatal">Non-Batal Kwitansi (belum cetak kwitansi)</option></select> <br><br>Reason <br>' +
                '<textarea type="text" id="reasondelete" name="reasondelete"></textarea>',
                function(btn) {
                    if (btn == 'yes') {
                        if($('#reasondelete').val().length < 5){
                            me.tools.alert.warning('Masukan alasan kenapa voucher dihapus minimal 5 karakter');
                            return false;
                        }
                        resetTimer();
                        var dataEncode = [];
                        var returnmsg = '<ul>';
                        var faileddeleted = false;
                        rows.forEach(function(rec) {
                            var uploadems_id = 0;
                            var uploadcpms_id = 0;
                            var uploadpim_id = 0;
                            var payment_id_erems = 0;
                            uploadpim_id = rec.get("uploadpim_id");
                            Ext.Ajax.request({
                                url: 'cashier/voucher/read',
                                method: 'POST',
                                async: false,
                                params: {
                                    kasbank_id: rec.get('kasbank_id'),
                                    mode_read: 'getvoucherfdar'
                                },
                                success: function(response) {
                                    var datafdar = Ext.JSON.decode(response.responseText);

                                    uploadems_id = datafdar.data['uploadems_id'];
                                    uploadcpms_id = datafdar.data['uploadcpms_id'];
                                    payment_id_erems = datafdar.data['payment_id_erems'];
                                },
                                failure: function(response) {

                                }
                            });

                            if (rec.get("is_va") == 1) {
                                if (me.userDeletedVa.includes(apps.uid)) {
                                    dataEncode.push({
                                        kasbank_id: rec.get("kasbank_id"),
                                        payment_id_erems: payment_id_erems,
                                        reason_delete: Ext.get('reasondelete').getValue()
                                    });
                                } else {
                                    faileddeleted = true;
                                    returnmsg = returnmsg + '<li>- Voucher <b>' + rec.get('voucherID') + '</b> from VA and cannot be deleted.</li>';
                                }
                            }else {
                                if ((uploadcpms_id != "" && uploadcpms_id != "0" && uploadcpms_id != null) || (uploadpim_id != "" && uploadpim_id != "0" && uploadpim_id != null)) {
                                    faileddeleted = true;
                                    if ((uploadcpms_id != "" && uploadcpms_id != "0" && uploadcpms_id != null)) {
                                        returnmsg = returnmsg + '<li>- Voucher <b>' + rec.get('voucherID') + '</b> gagal terhapus karena berasal dari aplikasi CPMS. Silahkan hapus voucher ini di CPMS.</li>';
                                    } else {
                                        returnmsg = returnmsg + '<li>- Voucher <b>' + rec.get('voucherID') + '</b> gagal terhapus karena berasal dari aplikasi PIM. Silahkan hapus voucher ini di aplikasi PIM.</li>';
                                    }

                                } else {
                                    if (rec.get("is_posting") != '1') { //Rizal 22 Juli voucher yg bisa di delete hanya yg belum terposting
                                        dataEncode.push({
                                            kasbank_id: rec.get("kasbank_id"),
                                            payment_id_erems: rec.get("payment_payment_id"),
                                            reason_delete: Ext.get('reasondelete').getValue()
                                        });
                                    } else {
                                        faileddeleted = true;
                                        returnmsg = returnmsg + '<li>- Voucher status <b>' + rec.get('voucherID') + '</b> is posted and cannot be deleted. You must unposting first.</li>';
                                    }
                                }
                            }

                        });
                        returnmsg = returnmsg + '</ul>';
                        //                    if(faileddeleted==false){
                        if (dataEncode.length > 0) { //Rizal 22 Juli validasi jika array ada isi nya
                            p.setLoading('Deleting data, please wait ...');
                            me.tools.ajax({
                                module: me.controllerName,
                                data: dataEncode,
                                params: { module: me.controllerName },
                                panel: p,
                                async: false,
                                success: function(info, total, msg) {
                                    try {

                                        if (!total) {
                                            me.tools.alert.warning(msg);
                                            p.setLoading(false);
                                        } else {

                                            Ext.Ajax.request({
                                                url: 'cashier/voucher/read',
                                                method: 'POST',
                                                async: false,
                                                params: {
                                                    data: Ext.encode(dataEncode),
                                                    message: Ext.get('reasondelete').getValue(),
                                                    pilihandelete: Ext.get('pilihandelete').getValue(),
                                                    mode_read: 'updatedeletereason'
                                                },
                                                success: function(response) {
                                                    var datamessagedelete = Ext.JSON.decode(response.responseText);
                                                },
                                                failure: function(response) {

                                                }
                                            });
                                            for (var i = 0; i < rows.length; i++) {
                                                store.remove(rows[i]);
                                            }
                                            if (faileddeleted === true) {
                                                me.tools.alert.warning(returnmsg);
                                            } else {
                                                var successmsg = total + ' Data deleted successfully.';
                                                me.tools.alert.info(successmsg);
                                            }
                                            me.getGrid().getStore().load();
                                            p.setLoading(false);
                                        }
                                    } catch (err) {
                                        console.log(err.message);
                                        me.tools.alert.warning("Failed to delete voucher.");
                                        me.getGrid().getStore().load();
                                        me.getGrid().up('window').unmask();
                                        p.setLoading(false);
                                    }
                                    p.setLoading(false);
                                }
                            }).destroy();
                        } else {
                            if (faileddeleted === true) {
                                me.tools.alert.warning(returnmsg);
                            }
                        }
                        //                    }
                    }
                });
        }
    },
    postingData: function(el, mode) {
        var me          = this;
        var btn         = mode;
        var p           = me.getPanel();
        var rows        = me.getGrid().getSelectionModel().getSelection();
        var dataEncode  = [];
        var store       = me.getGrid().getStore();
        var mode_create = btn === "unPosting" ? "unposting" : "posting";
        var returnmsg   = "<ul>";
        var allowed     = true;
        
        rows.forEach(function(rec) {
            dataEncode.push({
                kasbank_id: rec.get("kasbank_id"),
                payment_id_erems: rec.get("payment_payment_id")
            });
            var checkallowed = me.checkSubDetail(rec.get("kasbank_id"));
            if (checkallowed == false) {
                allowed = false;
                returnmsg = returnmsg + '<li>- Amount detail dan sub detail tidak sama / Sub detail tidak lengkap pada voucher <b>' + rec.get("voucherID") + '</b>. </li> ';
            }
            var checksubheader = me.checkSubHeader(rec.get("kasbank_id"));
            if (checksubheader == false) {
                allowed = false;
                returnmsg = returnmsg + '<li>- Kas/bank <b>' + rec.get("voucherID") + '</b> membutuhkan sub. Silahkan isi sub kas/bank pada edit voucher. </li> ';
            }

            //Rizal - 29 Okt 2019
            var checkarexist = me.checkARexist(rec.get("kasbank_id"));
            if (checkarexist == false) {
                allowed = false;
                returnmsg = returnmsg + '<li>- Silahkan isi account receivable pada voucher <b>' + rec.get("voucherID") + '</b>. </li> ';
            }
            //
            var checkallowedcoatampungan = me.checkCoaTampungan(rec.get("kasbank_id"));
            if (checkallowedcoatampungan == false) {
                allowed = false;
                returnmsg = returnmsg + '<li>- Pada voucher <b>' + rec.get("voucherID") + '</b> masih ada yang menggunakan Coa Tampungan. Silahkan ganti terlebih dahulu. </li> ';
            }
            var checknullcashflow = me.checkNullCashflow(rec.get("kasbank_id"), rec.get("project_project_id"), rec.get("pt_pt_id"));
            if (checknullcashflow == false) {
                allowed = false;
                returnmsg = returnmsg + '<li>- Pada voucher <b>' + rec.get("voucherID") + '</b> masih ada Cashflow yang kosong. </li> ';
            }
            if (rec.get("is_temp_realized") == 1) {
                allowed = false;
                returnmsg = returnmsg + '<li>- Voucher <b>' + rec.get("voucherID") + '</b> masih berstatus temporary realisasi. </li> ';
            }
        });
        //Rizal 4 Juli 2019
        returnmsg = returnmsg + "</ul>";
        if ((allowed == true && mode_create == 'posting') || (mode_create == 'unposting')) {

            p.setLoading(btn + ' data, please wait ...');
            me.tools.ajax({
                module: me.controllerName,
                data: dataEncode,
                mode_create: mode_create,
                panel: p,
                success: function(info, total, msg) {
                    try {
                        if (!total) {
                            me.tools.alert.warning(msg);
                            p.setLoading(false);
                        } else {
                            var successmsg = total + ' Data ' + btn + ' successfully.';
                            console.log(btn);
                            console.log(mode_create);
                            if (mode_create === "posting") {
                                me.postingSummary(dataEncode);
                            } else {
                                me.tools.alert.info(successmsg);
                                me.getGrid().getStore().load();
                                p.setLoading(false);
                            }

                        }
                    } catch (err) {
                        console.log(err.message);
                        me.tools.alert.warning("Failed to " + btn + " voucher.");
                        me.getGrid().getStore().load();
                        me.getGrid().up('window').unmask();
                        p.setLoading(false);
                    }

                }
            }).createCustom();
            //Rizal 4 Juli 2019
        } else {
            me.tools.alert.warning(returnmsg);
        }
        //
    },
    groupChange: function(val) {
        var me = this;
        var grid = me.getGrid();
        var dom = Ext.dom.Query.select('.x-grid-group-hd-collapsible');
        var el = Ext.get(dom[0]);
        var store = grid.getStore();
        if (val !== "reset") {
            store.group(val);
        } else {
            store.group('');
        }
    },
    viewstatus: function(val) {
        var me = this;
        var g = me.getGrid();
        var store = g.getStore();
        if (val === "paid") {
            store.getProxy().setExtraParam('status', 'is_paid');
        } else if (val === "posted") {
            store.getProxy().setExtraParam('status', 'is_posting');
        } else if (val === "realized") {
            store.getProxy().setExtraParam('status', 'is_realized');
        } else if (val === "all") {
            store.getProxy().setExtraParam('status', 'all');
        } else if (val === "draft") {
            store.getProxy().setExtraParam('status', 'draft');
        } else if (val === "uploadedvoucher") {
            store.getProxy().setExtraParam('status', 'uploadedvoucher');
        } else if (val === "temprealized") {
            store.getProxy().setExtraParam('status', 'is_temp_realized');
        } else if (val == "requestunrealize" ){
            store.getProxy().setExtraParam('status', 'is_request_unrealize');
        }

        store.loadPage(1);
    },
    printChequePaymentList: function() {
        var me = this;
        var grid = me.getGrid(),
            rec = grid.getSelectedRecord();
        me.projectprint = rec.get("project_project_id");
        me.ptprint = rec.get("pt_pt_id");
        me.projectprintname = rec.get("project_name");
        me.ptprintname = rec.get("pt_name");
        me.reportFileNamevcr = "ChequePaymentList";
        if (me.reportFileNamevcr) {
            //            if (!me.xyReport) {
            me.xyReport = new Cashier.library.XyReportB();
            me.xyReport.init(me);
            //            }
            me.xyReport.processReportJs();
        } else {
            me.tools.alert.warning("Template not found.");
        }
    },
    xyReportProcessParams: function(reportData, param) { //xbreportapram
        var me = this;
        var fn = me.reportFileNamevcr;
        var grid = me.getGrid();
        if (me.localStore.kasbank) {
            var rec = grid.getSelectedRecord();
        } else {
            var rec = grid.getSelectedRecord();
        }
        reportData['file'] = fn;
        var dataReport = [];
        var idprint = '';
        var multi_kwitansi_date = '';
        var multi_vendor = '';
        var multi_description_kwitansi_ar = '';
        var multi_amount = '';
        var multi_totalamount = '';
        var multi_terbilang = '';
        var multi_format_totalamount = '';
        var multi_dibayarkan_description = '';
        var multi_userprint = '';
        var multi_voucher_date = '';
        var multi_description = '';
        var multi_customer_name = '';
        var multi_kasbank_date = '';
        var multi_tanggal_sp = '';
        var row = grid.getSelectionModel().getSelection();

        for (var i = 0; i < row.length; i++) {
            var cheque_id = row[i]['data']["cheque_cheque_id"];
            var cheque_no = row[i]['data']["cheque_cheque_no"];
            var issued_date = row[i]['data']["issued_date"];
            var pt_name = me.ptprintname;
            var project_name = me.projectprintname;
            var vid = row[i]['data']["voucherID"];
            var duedate = row[i]['data']["duedate"];
            var kwitansi = row[i]['data']["kwitansi_date"];
            var realization_date = row[i]['data']["realization_date"];
            var voucher_no = row[i]['data']["voucher_no"];
            var customer_name = row[i]['data']["customer_name"];
            var realdate = realization_date !== "" ? moment(realization_date).format("DD-MM-YYYY") : '';
            var is_realized = row[i]['data']["is_realized"];
            var is_posting = row[i]['data']["is_posting"];
            var is_paid = row[i]['data']["is_paid"];
            var prefix = "";
            Ext.Ajax.request({
                url: 'cashier/voucher/read',
                method: 'POST',
                async: false,
                params: {
                    prefix_id: row[i]['data']["prefix_prefix_id"],
                    mode_read: 'getprefixdetail'
                },
                success: function(response) {
                    var data = Ext.JSON.decode(response.responseText);
                    prefix = data.data['prefix'];
                },
                failure: function(response) {

                }
            });


            reportData.params["dibayarkan_description"] = "";
            reportData.params["project_id"] = me.projectprint;
            reportData.params["pt_id"] = me.ptprint;

            reportData.params["kasbank_date"] = moment(row[i]['data']["kasbank_date"]).format("DD-MM-YYYY");
            var ksdt = reportData.params["kasbank_date"];
            reportData.params["kasbank_date"] = ksdt.substring(0, 2) + ' ' + me.bulanIndonesia(ksdt.substring(3, 5)) + ' ' + ksdt.substring(6, 10);
            reportData.params["payment_date"] = moment(row[i]['data']["payment_payment_date"]).format("DD-MM-YYYY");
            reportData.params["issued_date"] = moment(issued_date).format("DD-MM-YYYY");
            reportData.params["cheque_id"] = cheque_id;
            reportData.params["cheque_cheque_no"] = cheque_no;
            reportData.params["pt_name"] = pt_name;
            reportData.params["project_name"] = project_name;
            reportData.params["vid"] = vid;
            reportData.params["duedate"] = duedate !== "" ? moment(duedate).format("DD-MM-YYYY") : '';
            if (is_realized || is_posting) {
                reportData.params["realization_date"] = realdate;
            }
            reportData.params["voucher_date"] = realization_date !== "" ? moment(realization_date).format("DD-MM-YYYY") : '';
            var vdt = reportData.params["voucher_date"];
            reportData.params["voucher_date"] = vdt.substring(0, 2) + ' ' + me.bulanIndonesia(vdt.substring(3, 5)) + ' ' + vdt.substring(6, 10);
            reportData.params["voucher_no"] = voucher_no;
            reportData.params["customer_name"] = customer_name;
            reportData.params["description"] = row[i]['data']["description_mrt"];
            reportData.params["amount"] = row[i]['data']["amount"];
            reportData.params["totalamount"] = row[i]['data']["amount"];
            reportData.params["made_by"] = row[i]['data']["made_by"];
            reportData.params["userprint"] = row[i]['data']["userprint"];
            reportData.params["vendor_address"] = row[i]['data']["vendor_address"];

            reportData.params["terbilang"] = row[i]['data']["terbilang"];
            reportData.params["receipt_no"] = row[i]['data']["payment_receipt_no"];
            reportData.params["format_totalamount"] = row[i]['data']["terbilang"];
            reportData.params["total_amount_cheque"] = row[i]['data']["total_amount_cheque"];
            reportData.params["terbilang_amount_cheque"] = row[i]['data']["terbilang_amount_cheque"];
            if (me.tipeprint == 'chequegiro') {
                reportData.params["amount"] = row[i]['data']["total_amount_cheque"];
                reportData.params["totalamount"] = row[i]['data']["total_amount_cheque"];
                reportData.params["terbilang"] = row[i]['data']["terbilang_amount_cheque"];
                reportData.params["terbilang1"] = row[i]['data']["terbilang_amount_cheque1"];
                reportData.params["terbilang2"] = row[i]['data']["terbilang_amount_cheque2"];
                reportData.params["format_totalamount"] = row[i]['data']["terbilang_amount_cheque"];
            }
            if (row[i]['data']['cara_bayar'] == 'Cek/Giro') {
                reportData.params["dibayarkan_description"] = "BG/CEK " + row[i]['data']["cheque_cheque_no"] + " Rp. " + Ext.util.Format.number(reportData.params["totalamount"], '0,000.00') + ",- " + moment(row[i]['data']["issued_date"]).format("DD/MM/YYYY");
            } else {
                if (moment(row[i]['data']['payment_payment_date']).format("DD-MM-YYYY") == "01-01-1900" || row[i]['data']['payment_payment_date'] == '' || row[i]['data']['payment_payment_date'] == null) {
                    reportData.params["dibayarkan_description"] = "DISETOR DI " + prefix + " Rp. " + Ext.util.Format.number(reportData.params["totalamount"], '0,000.00') + ",- " + moment(row[i]['data']["realization_date"]).format("DD/MM/YYYY");
                } else {
                    reportData.params["dibayarkan_description"] = "DISETOR DI " + prefix + " Rp. " + Ext.util.Format.number(reportData.params["totalamount"], '0,000.00') + ",- " + moment(row[i]['data']["payment_payment_date"]).format("DD/MM/YYYY");
                }
            }
            reportData.params["cara_bayar"] = row[i]['data']["cara_bayar"];
            reportData.params["kwitansi_date"] = kwitansi !== "" ? moment(kwitansi).format("DD-MM-YYYY") : '';
            var kwd = reportData.params["kwitansi_date"];
            reportData.params["kwitansi_date"] = kwd.substring(0, 2) + ' ' + me.bulanIndonesia(kwd.substring(3, 5)) + ' ' + kwd.substring(6, 10);
            reportData.params["vendor"] = row[i]['data']["customer_name"];
            reportData.params["bank"] = row[i]['data']["kasbank"];
            reportData.params["voucherdept_no"] = row[i]['data']["voucherdept_no"];
            reportData.params["kasbondept_no"] = row[i]['data']["kasbondept_no"];
            reportData.params["no_rekening"] = row[i]['data']["vendor_bank_account_no"];
            reportData.params["name_rekening"] = row[i]['data']["vendor_bank_account_name"];
            reportData.params["bank_vendor"] = row[i]['data']["vendor_bank_name"];
            reportData.params["department_name"] = row[i]['data']["department_code"];
            reportData.params["description_kwitansi_ar"] = row[i]['data']["description_kwitansi_ar"];
            reportData.params["tanggal_sp"] = '';
            reportData.params["tipenotevoucher"] = me.tipenotevoucher;
            reportData.params['norek_customer'] = me.norek_customer;
            reportData.params['nama_customer'] = me.nama_customer;
            reportData.params['alamat_customer'] = me.alamat_customer;
            reportData.params['nama_penyetor'] = me.nama_penyetor;
            reportData.params['norek_penyetor'] = me.norek_penyetor;
            reportData.params['alamat_penyetor'] = me.alamat_penyetor;
            reportData.params['telp_penyetor'] = me.telp_penyetor;
            reportData.params['mata_uang'] = me.mata_uang;
            reportData.params['nama_bank'] = me.nama_bank;
            reportData.params['nama_yang_dapat_dihubungi'] = me.nama_yang_dapat_dihubungi;
            console.log(row[i]['data']);
            reportData.params["kasbank_description"] = row[i]['data']["receipt_notes"];


            if (me.tipeprint == 'printkwitansi' || me.tipeprint == 'printkwitansinonrangkap') {
                Ext.Ajax.request({
                    url: 'cashier/voucher/read',
                    method: 'POST',
                    async: false,
                    params: {
                        kasbank_id        : row[i]['data']['kasbank_id'],
                        is_voucher_sharing: me.is_voucher_sharing,
                        mode_read         : 'getdescriptionkwitansi'
                    },
                    success: function(response) {
                        var data = Ext.JSON.decode(response.responseText);
                        var terbilang = data.data['terbilang_kwitansi'];
                        var terbilang_new = data.data['terbilang_kwitansi'];
                        var terbilang_new_capitalize = data.data['terbilang_kwitansi_capitalize'];
                        if (me.tipeprint == 'printkwitansinonrangkap') {

                            terbilang_new = terbilang.replace(' RUPIAH', '');
                        }
                        reportData.params["description_kwitansi_ar"] = data.data['description_kwitansi_ar'];
                        if (row[i]['data']['payment_paymentflag_id'] > 0 && apps.subholdingId == 1) {
                            reportData.params["description_mrt"] = data.data['description_kwitansi_ar'];
                            reportData.params["description"] = data.data['description_kwitansi_ar'];
                        }
                        reportData.params["amount"] = data.data['amount_kwitansi']; //Rizal
                        reportData.params["totalamount"] = data.data['amount_kwitansi'];
                        reportData.params["terbilang"] = terbilang_new;
                        reportData.params["format_totalamount"] = terbilang_new;
                        reportData.params["format_totalamount_capitalize"] = terbilang_new_capitalize;
                        reportData.params["dibayarkan_description"] = data.data['dibayarkan_description'];
                        reportData.params["tanggal_sp"] = data.data['tanggal_sp'];
                    },
                    failure: function(response) {

                    }
                });
            }
            var formatter = new Intl.NumberFormat('en-US', {
                minimumFractionDigits: 2
            })
            if (me.iskwitansirs) {
                var newdesc = reportData.params["description"];
                reportData.params["amount"] = me.excludeamount;
                reportData.params["totalamount"] = me.excludeamount;
                reportData.params["terbilang"] = me.terbilangexcludeamount;
                reportData.params["format_totalamount"] = me.terbilangexcludeamount;
            }

            var tempDataReport = [];
            var id = row[i]['data']['kasbank_id'];
            if (id != 0) {

                tempDataReport['kasbank_id'] = id;
                tempDataReport['multi_kwitansi_date'] = reportData.params['kwitansi_date'];
                tempDataReport['multi_vendor'] = reportData.params['vendor'];
                tempDataReport['multi_description_kwitansi_ar'] = reportData.params['description_kwitansi_ar'];
                tempDataReport['multi_amount'] = reportData.params['amount'];
                tempDataReport['multi_totalamount'] = reportData.params['totalamount'];
                tempDataReport['multi_terbilang'] = reportData.params['terbilang'];
                tempDataReport['multi_format_totalamount'] = reportData.params['format_totalamount'];
                tempDataReport['multi_dibayarkan_description'] = reportData.params['dibayarkan_description'];
                tempDataReport['multi_userprint'] = reportData.params['userprint'];
                tempDataReport['multi_voucher_date'] = reportData.params['voucher_date'];
                tempDataReport['multi_description'] = reportData.params['description'];
                tempDataReport['multi_customer_name'] = reportData.params['customer_name'];
                tempDataReport['multi_kasbank_date'] = reportData.params['kasbank_date'];
                tempDataReport['multi_tanggal_sp'] = reportData.params['tanggal_sp'];
                dataReport[i] = tempDataReport;


                if ((i + 1) == row.length) {
                    idprint = idprint + id;
                    multi_kwitansi_date = multi_kwitansi_date + reportData.params["kwitansi_date"];
                    multi_vendor = multi_vendor + reportData.params["vendor"];
                    multi_description_kwitansi_ar = multi_description_kwitansi_ar + reportData.params["description_kwitansi_ar"];
                    multi_amount = multi_amount + reportData.params["amount"];
                    multi_totalamount = multi_totalamount + reportData.params["totalamount"];
                    multi_terbilang = multi_terbilang + reportData.params["terbilang"];
                    multi_format_totalamount = multi_format_totalamount + reportData.params["format_totalamount"];
                    multi_dibayarkan_description = multi_dibayarkan_description + reportData.params["dibayarkan_description"];
                    multi_userprint = multi_userprint + reportData.params["userprint"];
                    multi_voucher_date = multi_voucher_date + reportData.params["voucher_date"];
                    multi_description = multi_description + reportData.params["description"];
                    multi_customer_name = multi_customer_name + reportData.params["customer_name"];
                    multi_kasbank_date = multi_kasbank_date + reportData.params["kasbank_date"];
                    multi_tanggal_sp = multi_tanggal_sp + reportData.params["tanggal_sp"];
                } else {
                    idprint = idprint + id + '~';
                    multi_kwitansi_date = multi_kwitansi_date + reportData.params["kwitansi_date"] + '~';
                    multi_vendor = multi_vendor + reportData.params["vendor"] + '~';
                    multi_description_kwitansi_ar = multi_description_kwitansi_ar + reportData.params["description_kwitansi_ar"] + '~';
                    multi_amount = multi_amount + reportData.params["amount"] + '~';
                    multi_totalamount = multi_totalamount + reportData.params["totalamount"] + '~';
                    multi_terbilang = multi_terbilang + reportData.params["terbilang"] + '~';
                    multi_format_totalamount = multi_format_totalamount + reportData.params["format_totalamount"] + '~';
                    multi_dibayarkan_description = multi_dibayarkan_description + reportData.params["dibayarkan_description"] + '~';
                    multi_userprint = multi_userprint + reportData.params["userprint"] + '~';
                    multi_voucher_date = multi_voucher_date + reportData.params["voucher_date"] + '~';
                    multi_description = multi_description + reportData.params["description"] + '~';
                    multi_customer_name = multi_customer_name + reportData.params["customer_name"] + '~';
                    multi_kasbank_date = multi_kasbank_date + reportData.params["kasbank_date"] + '~';
                    multi_tanggal_sp = multi_tanggal_sp + reportData.params["tanggal_sp"] + '~';

                }
            }
        }
        //Rizal 27 Mei 2019
        reportData.params["kasbank_id"] = idprint;
        reportData.params["multi_kwitansi_date"] = multi_kwitansi_date;
        reportData.params["multi_vendor"] = multi_vendor;
        reportData.params["multi_description_kwitansi_ar"] = multi_description_kwitansi_ar;
        reportData.params["multi_amount"] = multi_amount;
        reportData.params["multi_totalamount"] = multi_totalamount;
        reportData.params["multi_terbilang"] = multi_terbilang;
        reportData.params["multi_format_totalamount"] = multi_format_totalamount;
        reportData.params["multi_dibayarkan_description"] = multi_dibayarkan_description;
        reportData.params["multi_userprint"] = multi_userprint;
        reportData.params["multi_voucher_date"] = multi_voucher_date;
        reportData.params["multi_description"] = multi_description;
        reportData.params["multi_customer_name"] = multi_customer_name;
        reportData.params["multi_kasbank_date"] = multi_kasbank_date;
        reportData.params["multi_tanggal_sp"] = multi_tanggal_sp;
        reportData.params['reportParams'] = dataReport;
        //
        me.iskwitansirs = false;
        me.tipeprint = 'nonchequegiro'; //jika print cheque / giro, maka kembalikan tipe print ke nonchequegiro
        me.is_voucher_sharing = 0;

        return reportData;
    },
    fdarnewsub: function() {
        var me = this;
        var f = me.getFormdata();
        var fns = me.getFormnewsub();
        var fcd = me.getFormcoadetail();
        fns.down("[name=fns_project_id]").setValue(f.down("[name=project_project_id]").getValue());
        fns.down("[name=fns_pt_id]").setValue(f.down("[name=pt_pt_id]").getValue());
        fns.down("[name=fns_kelsub_id]").setValue(fcd.down("[name=kelsub_kelsub_id]").getValue());

    },
    fdarwriteoffdenda: function() {
        var me = this;
        var f = me.getFormdatawriteoffdenda();
        var grid = me.getAngsurangrid(),
            rec = grid.getSelectedRecord();
        f.down("[name=wd_schedule_id]").setValue(rec.get("schedule_id"));
        f.down("[name=wd_purchaseletter_id]").setValue(rec.get("purchaseletter_purchaseletter_id"));
        f.down("[name=wd_schedule_description]").setValue(rec.get("description"));
        f.down("[name=wd_remaining_denda]").setValue(accounting.formatMoney(rec.get("remaining_balance")));
    },
    fdarestimasidenda: function() {
        var me = this;
        var f = me.getFormdataestimasidenda();
        var grid = me.getAngsurangrid(),
            rec = grid.getSelectedRecord();
        f.down("[name=ed_unit_id]").setValue(rec.get("unit_unit_id"));
        f.down("[name=ed_schedule_id]").setValue(rec.get("schedule_id"));
        f.down("[name=ed_due_date]").setValue(moment(rec.get("duedate")).format("DD-MM-YYYY"));
        f.down("[name=ed_schedule_description]").setValue(rec.get("description"));
        f.down("[name=ed_estimasi_payment]").setValue(accounting.formatMoney(rec.get("remaining_balance")));
        f.down("[name=ed_amount_payment]").setValue(accounting.formatMoney(rec.get("remaining_balance")));

        var labelschedule = rec.get("scheduletype_scheduletype") + " " + rec.get("termin");
        if (rec.get("termin") == 0) {
            labelschedule = rec.get("scheduletype_scheduletype");
        }
        console.log(rec.get("project_subholding_id"));
        f.down("[name=ed_amount_payment]").setReadOnly(true);
        f.down("[name=ed_amount_payment]").setFieldStyle('text-align:right;align:right;background-color:#eee;background-image: none;');
        $("#ed_total_denda label").html("Total Denda " + labelschedule);
        $("#ed_denda label").html("Estimasi Denda Baru " + labelschedule);
        $("#ed_current_denda label").html("Denda Belum Dibayarkan " + labelschedule);
    },
    fdarpayment: function() {
        var me = this;
        var f = me.getFormdatapayment();
        var grid = me.getGrid(),
            rec = grid.getSelectedRecord();
        var rows = me.getGrid().getSelectionModel().getSelection();
        var total = 0;
        var paymentmethod = 0;
        var cheque_id = 0;
        var allowsave = true;

        rows.forEach(function(rec) {
            if (paymentmethod == 0) {
                paymentmethod = rec.get("payment_paymentmethod_id");
            }
            if (rec.get("payment_paymentmethod_id") == 2 && cheque_id == 0) {
                cheque_id = rec.get("cheque_cheque_id");
            }
            if ((paymentmethod == rec.get("payment_paymentmethod_id") && rec.get("payment_paymentmethod_id") == 2 && cheque_id == rec.get("cheque_cheque_id"))) {
                if (allowsave == true) {
                    allowsave = true;
                }
            } else {
                allowsave = false;
            }
            total += parseFloat(accounting.unformat(rec.get("amount")));
        });
        var is_posting = rec.get("is_posting"),
            is_paid = rec.get("is_paid");
        if (is_posting) {
            f.down('[action=unpaid]').setDisabled(true);
            f.down('[action=save]').setDisabled(true);
        }
        if (is_paid) {
            if (allowsave == true) {
                f.down('[action=save]').setDisabled(false);
            } else {
                f.down('[action=save]').setDisabled(true);
                f.down('[name=voucherprefix_voucherprefix_id]').setDisabled(true);
                f.down('[name=cheque_cheque_no]').setDisabled(true);
                f.down('[action=browseCheque]').setVisible(false);
                f.down('[name=issued_date]').setDisabled(true);
            }
            f.down('[name=payment_paymentmethod_id]').setReadOnly(true);
            f.down('[action=unpaid]').setDisabled(false);
        }

        me.getCustomRequestCombobox('paymentmethod', rec.get("pt_pt_id"), rec.get("project_project_id"), '', 'payment_paymentmethod_id', 'paymentmethod', '', f, '',
            function() {
                if (rec.get("payment_paymentmethod_id") === 2) {
                    f.down('[action=browseCheque]').setDisabled(false);
                    me.getCustomRequestCombobox('kasbankPayment', rec.get("dataflow"), rec.get("pt_pt_id"), rec.get("project_project_id"), 'voucherprefix_voucherprefix_id', 'voucherprefix', ['coa'], f, '',
                        function() {
                            f.loadRecord(rec);
                            f.down('[name=voucherprefix_voucherprefix_id]').setReadOnly(true);
                            f.down('[name=voucherprefix_voucherprefix_id]').setValue('');
                            f.down('[name=issued_date]').setReadOnly(false);
                            if (rec.get('payment_paymentmethod_id') != 2 || rec.get('payment_paymentmethod_id') != 7) {
                                f.down('[name=voucherprefix_voucherprefix_id]').setValue('');
                                f.down('[name=voucherprefix_voucherprefix_id]').setReadOnly(true);
                            }
                        }
                    );
                    Ext.getCmp('formdatavoucherprefix_voucherprefix_id2').allowBlank = false;
                    Ext.getCmp('formdatavoucherprefix_voucherprefix_id2').clearInvalid();
                    Ext.getCmp('formdatapaymentissued_date').allowBlank = false;
                    Ext.getCmp('formdatapaymentissued_date').clearInvalid();
                } else if (rec.get("payment_paymentmethod_id") === 1) { //cash
                    f.down('[name=voucherprefix_voucherprefix_id]').setReadOnly(true);
                    Ext.getCmp('formdatavoucherprefix_voucherprefix_id2').allowBlank = true;
                    Ext.getCmp('formdatavoucherprefix_voucherprefix_id2').clearInvalid();
                    Ext.getCmp('formdatapaymentissued_date').allowBlank = true;
                    Ext.getCmp('formdatapaymentissued_date').clearInvalid();
                    f.down('[name=issued_date]').setReadOnly(true);
                    f.down('[name=payment_paymentmethod_id]').setValue(rec.get("payment_paymentmethod_id"));
                    f.down('[name=issued_date]').setValue(rec.get('payment_date'));
                } else if (rec.get("payment_paymentmethod_id") === 7) { //trf
                    f.down('[name=voucherprefix_voucherprefix_id]').setReadOnly(false);
                    f.down('[name=payment_paymentmethod_id]').setValue(rec.get("payment_paymentmethod_id"));
                    Ext.getCmp('formdatavoucherprefix_voucherprefix_id2').allowBlank = false;
                    Ext.getCmp('formdatavoucherprefix_voucherprefix_id2').clearInvalid();
                    Ext.getCmp('formdatapaymentissued_date').allowBlank = false;
                    Ext.getCmp('formdatapaymentissued_date').clearInvalid();
                    f.down('[name=issued_date]').setValue(rec.get('payment_date'));
                } else if (rec.get("payment_paymentmethod_id") == "" || !rec.get("payment_paymentmethod_id")) {
                    f.down('[name=voucherprefix_voucherprefix_id]').setReadOnly(true);
                    f.down('[name=issued_date]').setReadOnly(true);
                } else {
                }

                f.down("[name=total_amount]").setValue(total);
                me.formToMoney(f);
                me.dataflow = "OUT";
            });

        Ext.Ajax.request({
            url: 'cashier/common/read',
            method: 'POST',
            timeout: 100000000,
            params: {
                hideparam: 'getaccessaction',
                term: 'VoucherUnpayment',
                start: 0,
                limit: 1000,
            },
            success: function(response) {
                response = Ext.JSON.decode(response.responseText);
                var isactive = response.data[0].active;
                if (isactive == 0) {
                    f.down("[action=unpaid]").setVisible(false);
                }
            },
            failure: function(response) {

            }
        });


        me.showhideBankApproval();
    },

    showhideBankApproval: function() {
        var me = this;
        var f = me.getFormdatapayment();
        var grid = me.getGrid(),
            rec = grid.getSelectedRecord();
        var rows = me.getGrid().getSelectionModel().getSelection();
        var total = 0;
        var paymentmethod = 0;
        var cheque_id = 0;
        var show = true;
        var bank_approval = false;
        var bank_approval_approver = 0;
        var bank_approval_releaser = 0;

        paymentmethod = f.down("[name=payment_paymentmethod_id]").getValue();

        Ext.Ajax.request({
            url: 'cashier/voucher/read',
            method: 'POST',
            async: false,
            params: {
                project_id: rec.get('project_project_id'),
                pt_id: rec.get('pt_pt_id'),
                mode_read: 'checkIsBankApprovalPaymentType'
            },
            success: function(response) {
                var datapaymenttype = Ext.JSON.decode(response.responseText);

                me.listpaymenttype = datapaymenttype.data.BANKING_APPROVAL_PAYMENT_TYPE;
                if (me.listpaymenttype.includes(paymentmethod)) {
                    show = true;
                } else {
                    show = false;
                }

            }
        });

        Ext.Ajax.request({
            url: 'cashier/voucher/read',
            method: 'POST',
            async: false,
            params: {
                project_id: rec.get('project_project_id'),
                pt_id: rec.get('pt_pt_id'),
                mode_read: 'checkIsBankApproval'
            },
            success: function(response) {
                var datafdar = Ext.JSON.decode(response.responseText);
                bank_approval = datafdar.data['BANKING_APPROVAL'];
                bank_approval_approver = datafdar.data['BANKING_APPROVAL_APPROVER'];
                bank_approval_releaser = datafdar.data['BANKING_APPROVAL_RELEASER'];
                if (bank_approval == 1) {
                    f.down("[name=bank_trans_no]").setValue(rec.get("bank_trans_no"));
                    f.down("[name=bank_trans_no]").setVisible(show);
                    Ext.getCmp('bank_trans_no').allowBlank = true;
                    if (bank_approval_approver == 0) {
                        f.down("[name=fp_approver_0]").setVisible(show);
                        f.down("[name=fp_approver_1]").setVisible(show);
                        f.down("[name=fp_approver_2]").setVisible(show);
                        Ext.getCmp('fp_approver_2').allowBlank = true;

                        me.getCustomRequestCombobox('bankapprovalapprover', rec.get("pt_pt_id"), rec.get("project_project_id"), '', 'fp_approver_0', 'approverreleaser', '', f, '',
                            function() {
                                f.down("[name=fp_approver_0]").setValue(rec.get("fp_approver_0"));
                            });
                        me.getCustomRequestCombobox('bankapprovalapprover', rec.get("pt_pt_id"), rec.get("project_project_id"), '', 'fp_approver_1', 'approverreleaser', '', f, '',
                            function() {
                                f.down("[name=fp_approver_1]").setValue(rec.get("fp_approver_1"));
                            });
                        me.getCustomRequestCombobox('bankapprovalapprover', rec.get("pt_pt_id"), rec.get("project_project_id"), '', 'fp_approver_2', 'approverreleaser', '', f, '',
                            function() {
                                f.down("[name=fp_approver_2]").setValue(rec.get("fp_approver_2"));
                            });
                    } else {
                        var apv = 0;
                        for (apv = 0; apv <= bank_approval_approver; apv++) {
                            f.down("[name=fp_approver_" + apv + "]").setVisible(show);
                            Ext.getCmp('fp_approver_' + apv).allowBlank = true;
                            me.getCustomRequestCombobox('bankapprovalapprover', rec.get("pt_pt_id"), rec.get("project_project_id"), '', 'fp_approver_' + apv, 'approverreleaser', '', f, '',
                                function() {
                                    var apvtemp = 0;
                                    for (apvtemp = 0; apvtemp <= apv; apvtemp++) {
                                        f.down("[name=fp_approver_" + apvtemp + "]").setValue(rec.get("fp_approver_" + apvtemp + ""));
                                    }
                                });
                        }
                    }
                    if (bank_approval_releaser == 0) {
                        f.down("[name=fp_releaser_1]").setVisible(show);
                        Ext.getCmp('fp_releaser_1').allowBlank = true;
                        me.getCustomRequestCombobox('bankapprovalreleaser', rec.get("pt_pt_id"), rec.get("project_project_id"), '', 'fp_releaser_1', 'approverreleaser', '', f, '',
                            function() {

                                f.down("[name=fp_releaser_1]").setValue(rec.get("fp_releaser_1"));
                            });
                    } else {
                        var rel = 1;
                        for (rel = 1; rel <= bank_approval_releaser; rel++) {
                            f.down("[name=fp_releaser_" + rel + "]").setVisible(show);
                            Ext.getCmp('fp_releaser_' + rel).allowBlank = true;
                            me.getCustomRequestCombobox('bankapprovalreleaser', rec.get("pt_pt_id"), rec.get("project_project_id"), '', 'fp_releaser_' + rel, 'approverreleaser', '', f, '',
                                function() {

                                    var reltemp = 1;
                                    for (reltemp = 1; reltemp <= rel; reltemp++) {
                                        f.down("[name=fp_releaser_" + reltemp + "]").setValue(rec.get("fp_releaser_" + reltemp + ""));
                                    }
                                });
                        }
                    }

                }
            },
            failure: function(response) {

            }
        });
    },
    getChequeInfo: function(cheque, f, real, callback, dataflow) {
        var me = this;
        f.setLoading("Please wait");
        f.down('[name=voucherprefix_voucherprefix_id]').setReadOnly(false);

        me.tools.ajax({
            params: { module: me.controllerName, cheque_id: cheque, dataflow: dataflow },
            form: f,
            success: function(data, model) {
                try {
                    if (!real) {
                        if (data.prefix_id) {
                            f.down("[name=voucherprefix_voucherprefix_id]").setValue(data.prefix_id);
                        }

                        f.down("[name=voucherprefix_voucherprefix_id]").setValue(data.prefix_id);
                        f.down('[name=voucherprefix_voucherprefix_id]').setReadOnly(true);
                        f.down("[name=issued_date]").setValue(moment(data.issued_date).format("YYYY-MM-DD"));
                    } else {

                        if (data.prefix_id) {
                            f.down("[name=voucherprefix_voucherprefix_id]").setValue(data.prefix_id);

                            if (f.ownerCt['id'] == 'myVoucherReal') {
                                me.checkMandatoryReal();
                            }
                        }
                    }

                    if (typeof callback === "function") {
                        callback();
                    }

                } catch (err) {
                    console.log(err.message);
                    me.tools.alert.warning("Failed to process.");
                }
                f.setLoading(false);
            }
        }).read('chequeinfo');
    },
    savepayment: function(unpaid) {
        var me = this;
        var f = me.getFormdatapayment();
        var rows = me.getGrid().getSelectionModel().getSelection();
        var voucherAr = [];
        var paymentmethod = f.down('[name=payment_paymentmethod_id]').getValue();
        var allowedpayment = true;
        var returnmsg = "<ul>";
        rows.forEach(function(rec) {

            //Rizal - 17 Okt 2019
            var checkallowedsub = me.checkSubDetail(rec.get("kasbank_id"));
            if (checkallowedsub == false) {
                allowedpayment = false;
                returnmsg = returnmsg + '<li>- Amount detail dan sub detail tidak sama / Sub detail tidak lengkap pada voucher <b>' + rec.get("voucherID") + '</b>. </li> ';
            }
            //
            //
            //Rizal - 29 Okt 2019
            var checkarexist = me.checkARexist(rec.get("kasbank_id"));
            if (checkarexist == false) {
                allowedpayment = false;
                returnmsg = returnmsg + '<li>- Silahkan pick AR pada voucher <b>' + rec.get("voucherID") + '</b>. </li> ';
            }
            //
            //Rizal 29 Juli 2019 --check jika kasbon, harus realisasi kasbon nya terlebih dahulu
            var checkallowed = me.checkKasbonRealisasi(rec.get("kasbank_id"));
            if (checkallowed == false) {
                allowedpayment = false;
                returnmsg = returnmsg + '<li>- Harap realisasi kasbon departement untuk voucher <b>' + rec.get("voucherID") + '</b> terlebih dahulu. </li> ';
            }
            //
            voucherAr.push(rec.get("kasbank_id"));
        });
        returnmsg = returnmsg + '</ul>';
        if (unpaid) {

            f.setLoading("Please wait");
            me.tools.ajax({
                mode_create: 'paymentvoucher',
                module: me.controllerName,
                form: f,
                finalData: function(data) {
                    data['kasbank_id'] = voucherAr.join('~');
                    data['unpaid'] = unpaid ? 1 : 0;
                    return data;
                },
                success: function(data, model) {
                    try {
                        me.getGrid().getStore().load();
                        f.up("window").close();
                    } catch (err) {
                        console.log(err.message);
                        me.tools.alert.warning("Failed to payment voucher.");
                    }
                    f.setLoading(false);
                }
            }).create();
        } else {
            if (f.getForm().isValid()) {
                //Rizal 29 Juli 2019
                if (allowedpayment == false) {
                    me.tools.alert.warning(returnmsg);
                } else {
                    //
                    if (paymentmethod === 39) {
                        f.setLoading("Please wait");
                        me.tools.ajax({
                            mode_create: 'pettycashloan',
                            module: me.controllerName,
                            form: f,
                            finalData: function(data) {
                                data['kasbank_id'] = voucherAr.join('~');
                                return data;
                            },
                            success: function(data, model) {
                                try {
                                    me.getGrid().getStore().load();
                                    f.up("window").close();
                                } catch (err) {
                                    console.log(err.message);
                                    me.tools.alert.warning("Failed to process petty cash loan.");
                                }
                                f.setLoading(false);
                            }
                        }).create();
                    } else {
                        f.setLoading("Please wait");
                        var kasbank_id, payment_paymentmethod_id;
                        me.tools.ajax({
                            mode_create: 'paymentvoucher',
                            module: me.controllerName,
                            form: f,
                            finalData: function(data) {
                                data['kasbank_id'] = voucherAr.join('~');
                                data['unpaid'] = unpaid ? 1 : 0;
                                kasbank_id = data['kasbank_id'];
                                payment_paymentmethod_id = data['payment_paymentmethod_id'];

                                return data;
                            },
                            success: function(data, model) {
                                try {
                                    if (me.listpaymenttype.includes(payment_paymentmethod_id)) {
                                        me.sendEmailToFc(kasbank_id);
                                    }
                                    me.getGrid().getStore().load();
                                    f.up("window").close();
                                } catch (err) {
                                    console.log(err.message);
                                    me.tools.alert.warning("Failed to payment voucher.");
                                }
                                f.setLoading(false);
                            }
                        }).create();
                    }
                    //Rizal 29 Juli 2019
                }
                //
            }
        }

    },
    checkCombobox: function(val) {
        var me = this;
        var f = me.getFormdata();
        if (val) {
            f.down('[name=voucherprefix_voucherprefix_id]').setValue('');
        }
    },
    getVendorCode: function(prefix, callback) {
        var me = this;
        var p = me.getFormdatavendor();
        p.setLoading("Please wait generate vendor code");
        me.tools.ajax({
            controller: 'voucher',
            params: { module: 'voucher', project_id: me.projectId, pt_id: me.ptId },
            success: function(data, model) {
                try {
                    if (data) {
                        p.down("[name=vendorcode]").setValue(data.code);
                    }
                    if (typeof callback === "function") {
                        callback();
                    }
                } catch (err) {
                    console.log(err.message);
                    me.tools.alert.warning("Failed to generate code.");
                }
                p.setLoading(false);
            }
        }).readCustomController('vendorcode');
    },
    fdarvendor: function() {
        var me = this;
        var f = me.getFormdatavendor();
        f.down('[name=pt_id]').setValue(me.ptId);
        f.down('[name=project_id]').setValue(me.projectId);
        f.down('[name=type_vendor]').setValue(me.type_vendor);
        me.getVendorCode(0);
    },
    savevendor: function() {
        var me = this;
        var f = me.getFormdatavendor();
        var fd = me.getFormdata();
        var customer_name = f.down('[name=vendorname]').getValue();
        var norek = f.down('[name=no_rekening]').getValue();
        var chequebrowsegrid = Ext.getCmp('browseSupplierGrid');
        if (f.getForm().isValid()) {
            f.setLoading("Please wait");
            me.saved_id = 0;
            me.tools.ajax({
                module: 'voucher',
                alert: 'disable',
                controller: 'voucher',
                mode_create: 'vendor',
                form: f,
                finalData: function(data) {
                    return data;
                },
                callback: function(info) { //getinfo message
                    try {
                        if (info.msg === "SUCCESS") {
                            if (me.type_vendor == 'tenant') {

                                chequebrowsegrid = Ext.getCmp('browseTenantGrid');
                                me.getTenantgrid().getStore().load();
                                me.getTenantgrid().getView().refresh();
                            } else {
                                me.getVendorgrid().getStore().load();
                                me.getVendorgrid().getView().refresh();
                            }
                            fd.down('[name=vendor_vendor_id]').setValue(info.id);
                            fd.down('[name=customer_name]').setValue(customer_name);

                            fd.down('[name=vendor_no_rekening]').setVisible(true);
                            fd.down('[name=vendor_no_rekening]').setValue(norek);
                            f.up("window").close();
                            chequebrowsegrid.up("window").close();
                        }
                    } catch (err) {
                        console.log(err.message);
                        me.tools.alert.warning("Failed to create vendor.");
                    }
                    f.setLoading(false);
                },
            }).create();
        }
    },
    unitselectonchanges: function() {
        var me = this;
        var g = me.getUnitgrid();
        var rec = g.getSelectedRecord();
        var c = g.getSelectionModel().getCount();
        if (c === 1) {
            g.down('[action=select]').setDisabled(false);
            g.down('[action=selectunitothers]').setDisabled(false);
            g.down('[action=selectconvertunit]').setDisabled(false);
        } else {
            g.down('[action=select]').setDisabled(true);
            g.down('[action=selectunitothers]').setDisabled(true);
            g.down('[action=selectconvertunit]').setDisabled(true);
        }
    },
    unitSelect: function(el) {
        var me = this;
        var f = me.getFormdata();
        var grid = me.getUnitgrid();
        var row = grid.getSelectionModel().getSelection();
        var rec = grid.getSelectedRecord();
        f.down('[name=unit_unit_id]').setValue(rec.get("unit_unit_id"));
        f.down('[name=customer_name]').setValue(rec.get("customer_name"));
        f.down('[name=purchaseletter_customer_id]').setValue(rec.get("customer_id"));
        f.down('[name=purchaseletter_purchaseletter_id]').setValue(rec.get("purchaseletter_id"));
        f.down('[name=unit_unit_number]').setValue(rec.get("unit_unit_number"));
        f.down('[name=unit_cluster]').setValue(rec.get("unit_cluster"));
        f.down('[name=unit_mh_type]').setValue(rec.get("unit_mh_type"));
        f.down('[name=pt_pt_id]').setValue(rec.get("pt_pt_id"));
        f.down('[name=project_project_id]').setValue(rec.get("project_project_id"));
        f.down('[name=datatype]').setReadOnly(true);
        Ext.getCmp('TabVoucherId').getComponent('tabNonlink').tab.hide();
        el.up('window').destroy();
        Ext.getCmp('TabVoucherId').getComponent('tabOthers').tab.show();
        Ext.getCmp('TabVoucherId').setActiveTab('tabOthers');
        me.loadModelOtherPayment();
        me.templateCoa = 2;
        me.paymentflag_id = 5;
        f.down('[name=kasbank_reff_voucher_id]').setVisible(true);
        f.down('[action=browsereffvcr]').setVisible(true);
        f.down('[action=deletelink]').setVisible(true);
        me.visibleDescKwit();
    },
    otherPaymentFdar: function(el) {
        var me = this;
        var f = me.getFormdataotherpayment();
        var state = el.up('window').state;
        me.getCustomRequestCombobox('paymenttype', '', '', '', 'paymenttype_paymenttype_id', 'paymenttype', '', f, '', function() {
            if (state === "update") {
                var g = me.getOtherpaymentgrid();
                var rec = g.getSelectedRecord();
                f.editedRow = g.getSelectedRow();
                f.loadRecord(rec);
            }
        });
    },
    setToField: function(form, field, id, value, field2) {
        var me = this;
        var v = me.tools.comboHelper(form.down("[name=" + field + "]")).getField(id, value);

        form.down("[name=" + field2 + "]").setValue(v);
    },
    saveOtherPayment: function(callback) {
        var me = this;
        var f = me.getFormdataotherpayment();
        var value = f.getForm().getValues();
        var g = me.getOtherpaymentgrid();
        var store = g.getStore();
        var total = f.down("[name=amount]").getValue();
        total = accounting.unformat(total);
        me.paymentflag_id = 5;
        if (f.getForm().isValid()) {
            value['amount'] = parseFloat(accounting.unformat(value['amount']));
            if (total !== 0) {
                if (f.editedRow > -1) {
                    var rec = store.getAt(f.editedRow);
                    rec.beginEdit();
                    rec.set(value);
                    rec.endEdit();
                    store.commitChanges();
                } else {

                    store.add(value);
                    store.commitChanges();
                }
                if (callback) {
                    setTimeout(function() {
                        callback();
                    }, 600);
                }
                me.getSelectedPayment();
                me.templateCoa = 2;
                me.isEdit = 1;
                me.setSumDetailOtherPayment();
                f.up('window').close();
            } else {
                me.tools.alert.warning("Amount cannot be empty.");
            }
        }
    },
    loadModelOtherPayment: function(callback) {
        var me = this;
        var gridCoaDetail = me.getOtherpaymentgrid();
        gridCoaDetail.getStore().clearFilter(true);
        gridCoaDetail.doInit();
        gridCoaDetail.getStore().load({
            params: {
                kasbank_id: me.kasbank_id
            },
            callback: function(rec, op) {
                if (op) {
                    gridCoaDetail.attachModel(op);

                    me.setSumDetailOtherPayment();
                    me.is_erems = 0;
                } else {
                    console.log('error attach model ');
                }

                if (typeof callback === "function") {
                    callback();
                }
            }
        });
    },
    loadModelCashbonpayment: function(voucher_id, callback) {
        var me = this;
        var gridCashbonDetail = me.getCashbonpaymentgrid();
        gridCashbonDetail.getStore().clearFilter(true);
        gridCashbonDetail.doInit();
        gridCashbonDetail.getStore().load({
            params: {
                voucherdept_id: voucher_id
            },
            callback: function(rec, op) {
                if (op) {
                    gridCashbonDetail.attachModel(op);
                } else {
                    console.log('error attach model ');
                }

                if (typeof callback === "function") {
                    callback();
                }
            }
        });
    },
    sumOtherPaymentDetail: function(c) {
        var me = this;
        var f = me.getFormdata();
        var sum = 0;
        var store = me.getOtherpaymentgrid().getStore();
        store.each(function(rec) {
            sum += parseFloat(accounting.unformat(rec.get('amount')));
        });
        f.down("[name=amount]").setValue(accounting.formatMoney(sum));
        //me.setSumDetailOP();
    },
    setSumDetailOP: function(c) {
        var me = this;
        var f = me.getFormdata();
        var total = 0;
        var grid = me.getOtherpaymentgrid();
        var store = grid.getStore();
        store.each(function(rec) {
            total += parseFloat(accounting.unformat(rec.get("amount")));
        });
        f.down("[name=sum_total_detail]").setValue(accounting.formatMoney(total));
    },
    getSelectedPayment: function(callback) {
        var me = this;
        var f = me.getFormdata();
        var unit = f.down('[name=unit_unit_id]').getValue();
        me.schedule_id = null;
        me.amountSelected = null;
        me.totalTemp = null;
        me.paymenttype_id = '';
        me.unit_id = null;
        var sch = '';
        var amt = '';
        var total = 0;
        var paymenttype_id = '';
        var gridvoucherar = me.getOtherpaymentgrid();
        var storevoucherar = gridvoucherar.getStore();
        storevoucherar.each(function(rec) {
            amt += parseFloat(rec.get("amount")) + "~";
            paymenttype_id += rec.get('paymenttype_paymenttype_id') ? rec.get('paymenttype_paymenttype_id') + "~" : '0' + "~";;
        });
        me.unit_id = unit;
        me.amountSelected = amt;
        me.paymenttype_id = paymenttype_id;
        if (typeof callback === "function") {
            callback();
        }
    },
    gridSelectionChangeDefault: function(grid) {
        var me = this;
        if (grid) {
            var rec = grid.getSelectedRecord(),
                row = grid.getSelectionModel().getSelection();
            grid.down('[action=destroy]').setDisabled(row.length < 1);
            if (grid.down('[action=update]')) {
                grid.down('[action=update]').setDisabled(row.length != 1);
            }
        }
    },
    gridSelectionChangeSubcode: function() {
        var me = this;
        var grid = me.getSubcodegrid();
        if (grid) {
            var rec = grid.getSelectedRecord(),
                row = grid.getSelectionModel().getSelection();
            grid.down('[action=select]').setDisabled(row.length != 1);
        }
    },
    gridSelectionChangeAr: function(grid) {
        var me = this;
        if (grid) {
            var rec = grid.getSelectedRecord(),
                row = grid.getSelectionModel().getSelection();
            var c = grid.getSelectionModel().getCount();
            if (!c.is_closed) {
                if (c > 0) {
                    grid.down('[action=destroy]').setDisabled(row.length < 1);
                }
                if (grid.down('[action=update]')) {
                    grid.down('[action=update]').setDisabled(row.length != 1);
                }
            }
        }
    },
    destroySelection: function(grid, confirm, form, field, variable, callback) {
        var me = this;
        me.deletedId = [];
        if (grid) {
            var store = grid.getStore();
            var rec = grid.getSelectedRecord(),
                row = grid.getSelectionModel().getSelection();
            if (confirm) {
                Ext.Msg.show({
                    title: 'Warning',
                    msg: 'Are you sure delete this data?',
                    buttons: Ext.Msg.YESNO,
                    icon: Ext.Msg.QUESTION,
                    fn: function(clicked) {
                        if (clicked === "yes") {
                            for (var i = 0; i < row.length; i++) {
                                var id = row[i]['data'][field];
                                if (id) {
                                    if (variable === "deletedOtherPaymentRows") {
                                        form.deletedOtherPaymentRows.push(id);
                                    } else if (variable === "deletedArPaymentRows") {
                                        form.deletedArPaymentRows.push(id);
                                    }
                                }
                                store.remove(row[i]);
                            }
                            if (typeof callback === "function") {
                                callback();
                            }
                        }
                    }
                });
            } else {
                for (var i = 0; i < row.length; i++) {
                    var id = row[i]['data'][field];
                    if (id) {
                        if (variable === "deletedOtherPaymentRows") {
                            form.deletedOtherPaymentRows.push(id);
                        } else if (variable === "deletedArPaymentRows") {
                            form.deletedArPaymentRows.push(id);
                        }
                    }
                    store.remove(row[i]);
                }
                if (typeof callback === "function") {
                    callback();
                }
            }

        }
    },
    setSumDetailOtherPayment: function() {
        var me = this;
        var f = me.getFormdata();
        var amount = 0;
        var pay = 0;
        var final = 0;
        var grid = me.getOtherpaymentgrid();
        var store = grid.getStore();
        store.each(function(rec) {

            amount += parseFloat(accounting.unformat(rec.get("amount")));
            final += parseFloat(accounting.unformat(rec.get("final")));
        });
        f.down("[name=sum_tagihan]").setValue(accounting.formatMoney(amount));
        f.down("[name=sum_pay]").setValue(accounting.formatMoney(amount));
        f.down("[name=sum_final]").setValue(accounting.formatMoney(final));
    },
    copycell: function(grid, withheader) {
        var me = this;
        var text = '',
            model_temp = [],
            header_temp = [];
        if (grid) {
            var model = grid.down('headercontainer').getGridColumns();
            model.forEach(function(data) {
                if (data.xtype === "gridcolumn" || data.xtype === "datecolumn" || data.xtype === "numbercolumn") {
                    if (data.dataIndex) {
                        model_temp.push(data.dataIndex);
                        header_temp.push(data.text);
                    }
                }
            });
            if (withheader) {
                var arrh = header_temp;
                arrh.forEach(function(key) {
                    text += key + "\t";
                });
                text += "\n";
            }

            var row = grid.getSelectionModel().getSelection();
            row.forEach(function(rec) {
                var tgl = rec.get('dataflow') === "I" ? rec.get('kwitansi_date') : rec.get('duedate');
                var description = rec.get('description');

                if (apps.subholdingId == 1) {

                    text += rec.get('dataflow') + "\t" +
                        rec.get('payment_receipt_no') + "\t" +
                        rec.get('voucher_no') + "\t" +
                        rec.get('realization_date') + "\t" +
                        description.replace(/\n/g, ", ") + "\t" +
                        rec.get('amount') + "\t" +
                        rec.get('customer_name') + "\t" +
                        rec.get('department_code') + "\t" +
                        rec.get('spk') + "\t" +
                        rec.get('voucherID') + "\t" +
                        rec.get('duedate') + "\t" +
                        rec.get('kwitansi_date') + "\t" +
                        rec.get('cheque_cheque_no') + "\t" +
                        rec.get('payment_payment_date') + "\t" +
                        rec.get('issued_date') + "\t" +
                        rec.get('kasbank') + "\t" +
                        rec.get('voucherdept_no') + "\t" +
                        rec.get('kasbondept_no') + "\t" +
                        rec.get('made_by') + "\t" +
                        rec.get('addon') + "\t" +
                        "\n";
                } else {

                    text += rec.get('dataflow') + "\t" +
                        rec.get('department_code') + "\t" +
                        rec.get('receipt_no_spk') + "\t" +
                        rec.get('voucherID') + "\t" +
                        rec.get('duedate_kwitansidate') + "\t" +
                        rec.get('customer_name') + "\t" +
                        rec.get('amount') + "\t" +
                        rec.get('cheque_cheque_no') + "\t" +
                        rec.get('paymentdate_issueddate') + "\t" +
                        rec.get('kasbank') + "\t" +
                        rec.get('voucher_no') + "\t" +
                        rec.get('realization_date') + "\t" +
                        description.replace(/\n/g, ", ") + "\t" +
                        rec.get('kasbondept_no') + "\t" +
                        rec.get('made_by') + "\t" +
                        rec.get('addon') + "\t" +
                        rec.get('voucherdept_no') + "\t" +
                        "\n";
                }
            });
            me.copyTextToClipboard(text);
        }
    },
    copyTextToClipboard: function(text) {
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
    getKasbank: function(callback, loading) {
        var me = this;
        var f = me.getFormdata();
        var pt = f.down("[name=pt_pt_id]").getValue();
        var project = f.down("[name=project_project_id]").getValue();
        var dataflow = f.down("[name=dataflow]").getValue();
        if (pt && dataflow) {
            me.getCustomRequestComboboxV2('kasbank', dataflow, pt, project, 'voucherprefix_voucherprefix_id', 'voucherprefix', ['coa'], f, '', function() {
                if (typeof callback === 'function') {
                    callback(); //
                }
                if (!loading) {
                    f.setLoading(false);
                }
            }, true, '', f.down("[name=voucherprefix_voucherprefix_id]").getValue());
        }
    },
    checkMandatoryReal: function(callback) {
        var me = this;
        var f = me.getFormrealization();
        var grid = me.getGrid(),
            rec = grid.getSelectedRecord();
        var kasbank = f.down('[name=voucherprefix_voucherprefix_id]').getValue();
        var tglReal = f.down('[name=realization_date]').getValue();
        var df = f.down('[name=dataflow]').getValue();

        me.showSubglCode(f, 0);
        if (kasbank && tglReal) {
            me.getPrefixCode(f, kasbank, tglReal, df, callback, rec.get("is_realized"));
        }
    },
    unpaid: function() {
        var me = this;
        Ext.Msg.show({
            title: 'Warning',
            msg: 'Are you sure to UnPaid selected Voucher ?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            fn: function(clicked) {
                if (clicked === "yes") {
                    me.savepayment(1);
                }
                if (clicked === "no") {

                }
            }
        });
    },
    checkformsearch: function() {
        var me = this;
        var f = me.getFormsearch();
        var currentDate = new Date();
        var g = me.getGrid();
        var datestart = f.down('[name=datestart]').getValue(),
            pt;
        var dateend = f.down('[name=dateend]').getValue();
        var datatypedate = f.down('[name=datatypedate]').getValue();
        pt = f.down('[name=pt_id]').getValue();
        me.ptId = pt;
        if (datestart) {
            datestart = moment(datestart).format("MM/DD/YYYY");
        } else {
            datestart = '';
        }
        if (dateend) {
            dateend = moment(dateend).format("MM/DD/YYYY");
        } else {
            dateend = '';
        }

        if (datatypedate == '0') {
            f.down('[name=datestart]').setValue('');
            f.down('[name=dateend]').setValue('');
            f.down('[name=datestart]').setDisabled(true);
            f.down('[name=dateend]').setDisabled(true);
            f.down('[name=datestart]').focus(false, 200);
        } else {
            if (f.down('[name=datestart]').getValue() == null || f.down('[name=datestart]').getValue() == '') {
                f.down('[name=datestart]').setValue(currentDate);
            }
            if (f.down('[name=dateend]').getValue() == null || f.down('[name=dateend]').getValue() == '') {
                f.down('[name=dateend]').setValue(currentDate);
            }
            f.down('[name=datestart]').setDisabled(false);
            f.down('[name=dateend]').setDisabled(false);
        }

        var v = me.tools.comboHelper(f.down("[name=pt_id]")).getField('pt_id', 'name');
        var type = me.tools.comboHelper(f.down("[name=datatypedate]")).getField('status', 'description');
        var datatype = me.tools.comboHelper(f.down("[name=datatype]")).getField('status', 'description');
        g.down('label[id=info]').setText(
            v.substring(0, 25) +
            '.. | ' + type + ' : ' + datestart + '-' + dateend
            // + ' | ' + datatype
        );
    },
    dataSearch: function() {
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
            var sort = 'addon';
            var dir = 'DESC';
        }

        for (var x in fields) {
            store.getProxy().setExtraParam(x, fields[x]);
        }
        store.getProxy().setExtraParam('sortby', sort);
        store.getProxy().setExtraParam('sortdirection', dir);
        me.loadPage(store, function() {

        });
    },
    loadPage: function(store, callback) {
        store.loadPage(1, {
            callback: function(rec, operation, success) {

                try {
                    if (!me.getGrid().getStore().modelExist) {
                        me.getGrid().attachModel(operation);
                    }
                    if (typeof callback === "function") {
                        if (success) {
                            var data = Ext.JSON.decode(operation.response.responseText);
                            me.department_id = data.department.department_id;
                            callback();
                        }

                    }
                } catch (err) {
                    console.log(err.message);
                    me.tools.alert.warning("Failed to proccess.");
                }

            }
        });
        var me = this;
    },
    getDeptbyPt: function(pt, callback, loading) {
        var me = this;
        var f = me.getFormdata();
        f.setLoading("Getting default department");
        me.department_id = 0;
        me.tools.ajax({
            params: { module: me.controllerName, pt_id: pt },
            form: f,
            success: function(data, model) {
                try {

                    var department = data.department;
                    if (department) {
                        me.department_id = department.department_id;
                        var v = me.tools.comboHelper(f.down("[name=department_department_id]")).getField('department_id', 'name');

                        me.department_id = department.department_id;
                        setTimeout(function() {
                            f.down("[name=department_department_id]").setValue(department.department_id);
                        }, 200);
                    }
                    if (typeof callback === "function") {
                        callback();
                    }
                } catch (err) {
                    console.log(err.message);
                    me.tools.alert.warning("Failed to get department by company.");
                }
                if (!loading) {
                    f.setLoading(false);
                }
            }
        }).read('deptbypt');
    },
    getScheduleFromKasbank: function(kb, f, callback, loading) {
        var me = this;
        f.setLoading("Checking active schedule");
        me.schedule_id_arpayment = [];
        me.tools.ajax({
            params: { module: me.controllerName, kasbank_id: kb },
            form: f,
            success: function(data, model) {
                try {
                    if (data) {
                        me.schedule_id_arpayment = data.result;
                    }
                    if (typeof callback === "function") {
                        callback();
                    }
                } catch (err) {
                    console.log(err.message);
                    me.tools.alert.warning("Failed to get department by company.");
                }
                if (!loading) {
                    f.setLoading(false);
                }
            }
        }).read('getschedulefromkasbank');
    },
    AjaxRequest: function(param, param2) {
        var me;
        me = this;
        var f = me.getFormdata();
        f.setLoading('Please wait');
        Ext.Ajax.request({
            url: me.urlrequest,
            method: 'POST',
            timeout: 45000000,
            params: {
                data: Ext.encode(me.senddata),
            },
            success: function(response) {
                me.info = Ext.JSON.decode(response.responseText);
                me.setSuccessEvent();
                f.setLoading(false);
            },
            failure: function(response) {
                me.getFormdata().up('window').close();
            }
        });
    },
    setSuccessEvent: function(param) {
        var me, data, form, tmp_prefix, countlength, flag_tmp, idheader, value, rowdata;
        me = this;
        data = me.info.data;
        form = me.getFormdata();
        switch (me.info.parameter) {
            case 'gettransnobank':
                form.down("[name=transno]").setValue(me.info.total);
                break;
            case 'coadetail':
                var rows = me.info.data;
                var griddetail = me.getGriddetail();
                var storedetail = griddetail.getStore();
                if (rows.length > 0) {

                    rowdata = rows;
                    storedetail.add(rowdata);
                    storedetail.commitChanges();
                    me.setSumdetailfromcopy();
                }

                break;
            case 'generatevouchernobank':
                form.down("[name=voucher_no]").setValue(data);
                flag_tmp = form.down("[name=tmp_prefix]").getValue();
                if (flag_tmp > 0) {
                    form.down("[name=voucher_no_tmp]").setValue(data);
                }
                break;
            case 'getprefixsetup':
                tmp_prefix = data.temp_prefix;
                countlength = tmp_prefix.length;
                me.clearVoucherTmpNo();
                if (countlength > 0) {
                    me.prefix = tmp_prefix;
                    me.actiondialog = 'generatevoucherno';
                    me.titledialog = 'Confirm Generate Voucher No';
                    me.msgdialog = 'System will Generate From Original Voucher No, are you continue? <br/> if you choose No\n\then System will Generate From Prefix Temporary Voucher No.';
                    me.dialogConfirm();
                } else {
                    me.prefix = form.down("[name=voucherprefix_id]").getRawValue();
                    me.generateVouchernov2();
                    form.down("[name=tmp_prefix]").setValue('0');
                }
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
            case 'updateheaderform':
                if (me.info.total == '0') {
                    me.messagedata = me.info.msg;
                    me.getFormeditgiro().up('window').body.unmask();
                    me.getGrid().getStore().reload();
                    me.getFormeditgiro().up('window').close();
                } else {
                    me.messagedata = me.info.msg;
                    me.getFormeditgiro().up('window').body.unmask();
                    me.getGrid().getStore().reload();
                    me.getFormeditgiro().up('window').close();
                }
                break;
            case 'report':
                value = me.info.data;
                value["tgl_sekarang"] = me.dateNow.getDate() + "-" + (me.dateNow.getMonth() + 1) + "-" + me.dateNow.getFullYear();
                me.createWindows();
                me.submitReport(value);
                break;
            case 'reportjs':
                value = me.info.data;
                value["tgl_sekarang"] = me.dateNow.getDate() + "-" + (me.dateNow.getMonth() + 1) + "-" + me.dateNow.getFullYear();
                me.createWindows();
                me.submitReportjs(value);
                break;
            case 'reportdirectpdf':
                value = me.info.data;
                value["tgl_sekarang"] = me.dateNow.getDate() + "-" + (me.dateNow.getMonth() + 1) + "-" + me.dateNow.getFullYear();
                me.createWindowsdirectpdf();
                me.submitReportdirectpdf(value);
                break;
        }
    },
    changePaymentReal: function(v) {
        var me = this;
        var f = me.getFormrealization();
        var grid = me.getGrid(),
            rec = grid.getSelectedRecord();
        var dataflow = rec.get("dataflow");
        var ptid = rec.get("pt_pt_id");
        if (v === 2) { //giro {
            f.down('[action=browseCheque]').setDisabled(false);
            f.down('[action=browseCheque]').setVisible(true);
            f.down('[name=voucherprefix_voucherprefix_id]').setValue('');
            f.down('[name=voucherprefix_voucherprefix_id]').setReadOnly(true);
            f.down('[name=cheque_cheque_no]').setReadOnly(false);
            f.down('[name=cheque_cheque_no]').setVisible(true);
            f.down('#chequenoidlabel').setVisible(true);
            f.down('[name=prefixcode]').setValue('');
            f.down('[name=voucherint]').setValue('');
            f.down('[name=bank_name]').setValue('');
            f.down('[name=bank_name]').setVisible(false);
        } else if (v === 7) { //trf
            me.getVoucherPrefixCash(f, rec.get("project_project_id"), rec.get("pt_pt_id"), rec.get("dataflow"), function() {

            });
            f.down('[name=bank_name]').setVisible(true);
            f.down('[name=voucherprefix_voucherprefix_id]').setReadOnly(false);
            f.down('[name=voucherprefix_voucherprefix_id]').setValue('');
            f.down('[action=browseCheque]').setVisible(false);
            f.down('[action=browseCheque]').setDisabled(true);
            f.down('[name=cheque_cheque_id]').setValue('');
            f.down('[name=cheque_cheque_no]').setValue('');
            f.down('[name=cheque_cheque_no]').setVisible(false);
            f.down('#chequenoidlabel').setVisible(false);
            f.down('[name=prefixcode]').setValue('');
            f.down('[name=voucherint]').setValue('');
        } else if (v === 1) { //cash

            me.getVoucherPrefixCash(f, rec.get("project_project_id"), rec.get("pt_pt_id"), rec.get("dataflow"), function() {

            });
            f.down('[name=voucherprefix_voucherprefix_id]').setReadOnly(false);
            f.down('[name=voucherprefix_voucherprefix_id]').setValue('');
            f.down('[name=cheque_cheque_id]').setValue('');
            f.down('[name=cheque_cheque_no]').setValue('');
            f.down('[name=cheque_cheque_no]').setVisible(false);
            f.down('[action=browseCheque]').setDisabled(true);
            f.down('[action=browseCheque]').setVisible(false);
            f.down('#chequenoidlabel').setVisible(false);
            f.down('[name=payment_paymentmethod_id]').setValue(1);
            f.down('[name=bank_name]').setVisible(false);
            f.down('[name=bank_name]').setValue('');
        } else if (v === 39) { //PCL
            me.getVoucherPrefixCash(f, rec.get("project_project_id"), rec.get("pt_pt_id"), rec.get("dataflow"), function() {

            });
            f.down('[name=voucherprefix_voucherprefix_id]').setReadOnly(true);
            f.down('[name=voucherprefix_voucherprefix_id]').setValue('');
            f.down('[name=issued_date]').setReadOnly(true);
            f.down('[name=issued_date]').setValue('');
            f.down('#chequenoidlabel').setVisible(false);
            f.down('[name=cheque_cheque_no]').setValue('');
            f.down('[name=cheque_cheque_id]').setValue('');
            f.down('[name=cheque_cheque_no]').setVisible(false);
            f.down('[action=browseCheque]').setDisabled(true);
            f.down('[action=browseCheque]').setVisible(false);
            f.down('[name=payment_paymentmethod_id]').setValue(39);
            f.down('[name=prefixcode]').setValue('');
            f.down('[name=voucherint]').setValue('');
            f.down('[name=bank_name]').setVisible(false);
            f.down('[name=bank_name]').setValue('');
        } else {

            me.getVoucherPrefixCash(f, rec.get("project_project_id"), rec.get("pt_pt_id"), rec.get("dataflow"), function() {

            });
            f.down('[name=voucherprefix_voucherprefix_id]').setReadOnly(false);
            f.down('[name=voucherprefix_voucherprefix_id]').setValue('');
            f.down('[name=prefixcode]').setValue('');
            f.down('[name=voucherint]').setValue('');
            f.down('[name=cheque_cheque_no]').setValue('');
            f.down('[name=cheque_cheque_id]').setValue('');
            f.down('[name=cheque_cheque_no]').setVisible(false);
            f.down('[action=browseCheque]').setDisabled(true);
            f.down('[action=browseCheque]').setVisible(false);
            f.down('#chequenoidlabel').setVisible(false);
            f.down('[name=bank_name]').setVisible(false);
            f.down('[name=bank_name]').setValue('');
        }

    },
    changePayment: function(v) {
        var me = this;
        var f = me.getFormdatapayment();
        var grid = me.getGrid(),
            rec = grid.getSelectedRecord();
        var dataflow = rec.get("dataflow");
        var ptid = rec.get("pt_pt_id");
        if (v === 2) { //giro {
            f.down('[action=browseCheque]').setDisabled(false);
            $("#formdatapaymentissued_date label").html("Issued Date");
            f.down('[name=voucherprefix_voucherprefix_id]').setValue('');
            f.down('[name=issued_date]').setReadOnly(false);
            f.down('[name=cheque_cheque_no]').setReadOnly(false);
            me.getCustomRequestCombobox('kasbankPayment', dataflow, ptid, rec.get("project_project_id"), 'voucherprefix_voucherprefix_id', 'voucherprefix', ['coa'], f, '', function() {

                f.down('[name=voucherprefix_voucherprefix_id]').setReadOnly(true);
            });
        } else if (v === 7) { //trf
            $("#formdatapaymentissued_date label").html("Payment Date");
            f.down('[name=voucherprefix_voucherprefix_id]').setReadOnly(false);
            f.down('[name=voucherprefix_voucherprefix_id]').setValue('');
            f.down('[action=browseCheque]').setDisabled(true);
            f.down('[name=issued_date]').setReadOnly(false);
            f.down('[name=issued_date]').setValue('');
            f.down('[name=cheque_cheque_no]').setValue('');
            me.getCustomRequestCombobox('kasbankPayment', dataflow, ptid, rec.get("project_project_id"), 'voucherprefix_voucherprefix_id', 'voucherprefix', ['coa'], f, '', function() {
                if (rec) {
                    f.down('[name=payment_paymentmethod_id]').setValue(7);
                }
                var payment_date = moment(rec.get("payment_date")).format("YYYY-MM-DD");
                if (payment_date !== '1900-01-01') {
                    f.down('[name=issued_date]').setValue(moment(rec.get("payment_date")).format("YYYY-MM-DD"));
                }

            });

        } else if (v === 1) { //cash
            $("#formdatapaymentissued_date label").html("Payment Date");
            f.down('[name=voucherprefix_voucherprefix_id]').setReadOnly(true);
            f.down('[name=voucherprefix_voucherprefix_id]').setValue('');
            f.down('[name=issued_date]').setReadOnly(true);
            f.down('[name=issued_date]').setValue('');
            f.down('[name=cheque_cheque_no]').setValue('');
            f.down('[action=browseCheque]').setDisabled(true);
            Ext.getCmp('formdatavoucherprefix_voucherprefix_id2').allowBlank = true;
            Ext.getCmp('formdatavoucherprefix_voucherprefix_id2').clearInvalid();
            Ext.getCmp('formdatapaymentissued_date').allowBlank = true;
            Ext.getCmp('formdatapaymentissued_date').clearInvalid();
            f.down('[name=payment_paymentmethod_id]').setValue(1);
        } else if (v === 39) { //PCL
            $("#formdatapaymentissued_date label").html("Payment Date");
            f.down('[name=voucherprefix_voucherprefix_id]').setReadOnly(true);
            f.down('[name=voucherprefix_voucherprefix_id]').setValue('');
            f.down('[name=issued_date]').setReadOnly(true);
            f.down('[name=issued_date]').setValue('');
            f.down('[name=cheque_cheque_no]').setValue('');
            f.down('[action=browseCheque]').setDisabled(true);
            Ext.getCmp('formdatavoucherprefix_voucherprefix_id2').allowBlank = true;
            Ext.getCmp('formdatavoucherprefix_voucherprefix_id2').clearInvalid();
            Ext.getCmp('formdatapaymentissued_date').allowBlank = true;
            Ext.getCmp('formdatapaymentissued_date').clearInvalid();
            f.down('[name=payment_paymentmethod_id]').setValue(39);
        }

        me.showhideBankApproval();

    },
    postingSummary: function(dataEncode) {
        var me = this;
        var p = me.getPanel();
        var store = me.getGrid().getStore();
        var rows = me.getGrid().getSelectionModel().getSelection();
        p.setLoading('Summary data, please wait ...')
        me.tools.ajax({
            module: me.controllerName,
            data: dataEncode,
            mode_create: 'postingsummary',
            panel: p,
            success: function(info, total, msg) {
                try {
                    if (!total) {
                        me.tools.alert.warning(msg);
                        p.setLoading(false);
                    } else {
                        for (var i = 0; i < rows.length; i++) {
                            store.remove(rows[i]);
                        }
                        var successmsg = total + ' Data Posted successfully.';
                        me.tools.alert.info(successmsg);
                        me.getGrid().getStore().load();
                        p.setLoading(false);
                    }
                } catch (err) {
                    console.log(err.message);
                    me.tools.alert.warning("Failed to posting voucher.");
                    me.getGrid().getStore().load();
                    me.getGrid().up('window').unmask();
                    p.setLoading(false);
                }
                p.setLoading(false);
            }
        }).createCustom();
    },
    previewHandler: function(menuid) {
        var me, grid, store, counter, record, row;
        me = this;
        grid = me.getGrid();
        store = grid.getStore();
        counter = store.getCount();
        if (counter > 0) {
            record = grid.getSelectionModel().getSelection()[0];
            row = record['data'];
        }
        var recs = me.getGrid().getSelectionModel().getSelection();

        me.iskwitansirs = false;
        //Rizal 24 Juni 2019 -- di comment karna biar check template saat klik button print saja
        me.tipeprint = 'chequegiro'; //diubah ke chequegiro
        me.checktemplateuser(menuid);
        //

    },
    previewHandlerSetoran: function(menuid) {
        var me, grid, store, counter, record, row;
        me = this;
        grid = me.getGrid();
        store = grid.getStore();
        counter = store.getCount();
        if (counter > 0) {
            record = grid.getSelectionModel().getSelection()[0];
            row = record['data'];
        }
        var recs = me.getGrid().getSelectionModel().getSelection();

        me.iskwitansirs = false;
        me.checktemplatesetoran(menuid);

    },
    checktemplatesetoran: function(template, callback) {
        var me = this;
        var p = me.getPanel();
        p.setLoading('Please wait...');
        me.tools.ajax({
            params: {
                module: me.controllerName,
                template: template,
                project_id: me.project_id,
                pt_id: me.pt_id
            },
            form: p,
            success: function(data) {
                try {
                    if (data) {

                        if (data.result > 0) {
                            me.reportFileNamevcr = data.result;
                            me.mainPrintCustom();
                        } else {
                            me.tools.alert.warning("Template not found, please setup on Master Template.");
                        }
                    }

                    if (typeof callback === 'function') {
                        callback();
                    }

                } catch (err) {
                    console.log(err.message);
                    me.tools.alert.warning("Failed to print voucher.");
                }
                p.setLoading(false);
            }
        }).read('checktemplatesetoran');
    },
    checktemplateuser: function(template, callback) {
        var me = this;
        var p = me.getPanel();
        p.setLoading('Please wait...');
        me.tools.ajax({
            params: {
                module: me.controllerName,
                template: template,
                project_id: me.project_id,
                pt_id: me.pt_id
            },
            form: p,
            success: function(data) {
                try {
                    if (data) {

                        if (data.result > 0) {
                            me.reportFileNamevcr = data.result;
                            me.mainPrintCustom();
                        } else {
                            me.tools.alert.warning("Template not found, please setup on Master Template.");
                        }
                    }

                    if (typeof callback === 'function') {
                        callback();
                    }

                } catch (err) {
                    console.log(err.message);
                    me.tools.alert.warning("Failed to print voucher.");
                }
                p.setLoading(false);
            }
        }).read('checktemplateuser');
    },
    printVoucherAfterSave: function(dataflow) {
        var me = this;
        var grid = me.getGrid();
        var kid;
        if (me.saved_id) {
            kid = me.saved_id;
        } else {
            kid = me.kasbank_id;
        }
        setTimeout(function() {

            var rec = grid.getStore().findRecord('kasbank_id', kid, 0, false, true, true);
            grid.getSelectionModel().select(rec);
            me.printVoucher();
        }, 1100);
    },
    showPdf: function() {
        var me = this;
        var p = me.getPanel();
        var recs = me.getGrid().getSelectionModel().getSelection();
        if (recs.length == 0) {
            return;
        }
        if (me.printpdfOptions.length > 0) {
            var w = me.instantWindow('FormPrintout', 400, 'Select template', 'print', 'inspayPrintSeletWindow');
            var el = me.getFormprintout().down("[name=template_name]");
            for (var i in me.printpdfOptions) {
                el.add({
                    xtype: 'radiofield',
                    boxLabel: me.printpdfOptions[i].text,
                    name: 'template',
                    inputValue: me.printpdfOptions[i].value,
                    checked: me.printpdfOptions[i].selected
                });
            }
        } else {
            var ttd = me.ttdKwitansi;
            if (ttd.length > 0) {
                me.inpayShowTTDKwitansiWindow(ttd);
            } else {
                me.inpayFinalShowPdf();
            }
        }
    },
    inpayFinalShowPdf: function(printParams) {
        var me = this;
        var p = me.getPanel();
        var recs = me.getGrid().getSelectionModel().getSelection();
        if (recs.length == 0) {
            return;
        }
        var ids = "";
        for (var i in recs) {
            ids += recs[i].get("temp_payment_id") + "~";
        }
        var option = 0;
        var ttd = 0;
        if (typeof printParams !== 'undefined') {
            option = printParams["option"];
            ttd = printParams["ttd"];
        }
        p.setLoading("Please wait..");
        me.tools.ajax({
            params: {
                payment_id: ids,
                option: option,
                ttd: ttd,
                is_cashier: 1
            },
            success: function(data, model) {
                p.setLoading(false);
                var url = data['others'][0][0]['URL'];
                if (url) {
                    window.open(url);
                }
            }
        }).read('printpdf');
    },
    getdetailvoucher: function(id) {
        var me = this;
        var p = me.getFormdata();
        var rec = [];
        me.amountSelected = 1;
        me.templateCoa = 6;
        me.voucherDetail.generateCoa(me, me.templateCoa, 'voucher', id, '', function() {
            me.getSupplierBank('');

            var gridetail = me.getDetailvouchergrid();
            var storedetail = gridetail.getStore();
            var i = 1;
            storedetail.each(function(rec, idx) {
                rec.beginEdit();
                rec.set({
                    indexdata: idx + 1,
                });
                rec.endEdit();
                if (rec.get("kelsub_kelsub_id") > 0) {
                    me.voucherDetail.loadTempModel(me, function() {

                        me.localStore.subdetailcoa.loadData([], false);
                        var sb = me.localStore.subdetailcoa;

                        me.tools.ajax({
                            params: {
                                module: me.controllerName,
                                kasbankdetail_id: rec.get("voucherdetail_id")
                            },
                            success: function(data, model) {
                                try {
                                    data.forEach(function(r) {
                                        sb.add({
                                            indexsubdata: r["indexsubdata"],
                                            remarks: r["remarks"],
                                            amount: r["amount"],
                                            subgl_subgl_id: r["subgl_subgl_id"],
                                            subgl_code: r["subgl_code"],
                                            subgl_code1: r["subgl_code1"],
                                            subgl_code2: r["subgl_code2"],
                                            subgl_code3: r["subgl_code3"],
                                            subgl_code4: r["subgl_code4"],
                                            voucherdetail_voucherdetail_id: '',
                                            voucherdetail_indexdata: idx + 1,
                                            kelsub_kelsub: r["kelsub_kelsub"],
                                            kelsub_kelsub_id: r["kelsub_kelsub_id"],
                                            kelsub_description: '',
                                            subgl_description: r["subgl_description"],
                                            uniqueid: Math.floor(Math.random() * 1000000000),
                                        });

                                        sb.commitChanges();
                                    });
                                } catch (err) {
                                    console.log(err.message);
                                    me.tools.alert.warning("Failed to get Sub GL.");
                                }


                            }
                        }).read('getsubglkasbankid');
                    });
                }
                i++;
            });
        }, true);

        me.templateCoa = 1;
        me.is_reimburse = 1;
        me.reimburse_kasbank_id = id;
    },
    loadDetailtovoucher: function(el) {
        var me = this;
        var gridvoucherl = me.getVoucherrealizationgrid();
        var row = gridvoucherl.getSelectionModel().getSelection();
        el.up('window').destroy();
        var arr = [];
        row.forEach(function(data) {
            arr.push(data.get("kasbank_id"));
        });
        me.getdetailvoucher(arr.join('~'));
    },
    savekasbontoarr: function(el) {
        var me = this;
        var gridvoucherl = me.getVoucherkasbongrid();
        var row = gridvoucherl.getSelectionModel().getSelection();
        var ttl = 0;
        row.forEach(function(data) {
            me.kasbon_id_selected_arr.push(data.get("kasbon_id"));
        });
        gridvoucherl.down('label[id=kasbonselected]').setText(me.kasbon_id_selected_arr.length + ' Kasbon Selected');
        gridvoucherl.down('[action=cleararrkasbon]').setDisabled(false);
        gridvoucherl.down('[action=select]').setDisabled(false);
    },
    cleararrkasbon: function(el) {
        var me = this;
        var gridvoucherl = me.getVoucherkasbongrid();
        me.kasbon_id_selected_arr = [];
        gridvoucherl.down('label[id=kasbonselected]').setText('0 Kasbon Selected');
        gridvoucherl.down('[action=cleararrkasbon]').setDisabled(true);
        gridvoucherl.down('[action=select]').setDisabled(true);
    },
    loadKasbonProject: function(el) {
        var me = this;
        var gridvoucherl = me.getVoucherkasbongrid();
        var row = gridvoucherl.getSelectionModel().getSelection();
        el.up('window').destroy();
        var arr = [];
        row.forEach(function(data) {
            arr.push(data.get("kasbon_id"));
        });
        var kasbon_id = me.kasbon_id_selected_arr.join('~');
        me.amountSelected = 1;
        me.templateCoa = 7;

        me.voucherDetail.generateCoa(me, me.templateCoa, 'kasbon', kasbon_id, '', function() {
            me.templateCoa = 1;
            me.is_pettycashloan = 1;
            me.pettycashloan_kasbon_id = [];
        });
    },
    getSupplierBank: function(callback, loading) {
        var me = this;
        var p = me.getFormdata();
        p.setLoading('Get supplier');
        me.tools.ajax({
            params: {
                module: me.controllerName,
                project_id: me.project_id,
                pt_id: me.pt_id
            },
            form: p,
            success: function(data) {
                try {
                    if (data) {
                        p.down('[name=customer_name]').setValue(data.customer_name);
                        p.down('[name=vendor_vendor_id]').setValue(data.vendor_id);
                        p.down('[name=description]').setValue(me.reimburse_text);
                    }
                    if (typeof callback === 'function') {
                        callback();
                    }

                } catch (err) {
                    console.log(err.message);
                    p.setLoading(false);
                    me.tools.alert.warning("Failed to get supplier .");
                }
                if (!loading) {
                    p.setLoading(false);
                }
            }
        }).read('getsupplierbank');
    },
    //Rizal 14 Juni 2019
    CheckandChangeCoabyChangeCompany: function(coa_id) {
        var me = this;
        var p = me.getFormdata();
        var f = me.getFormcoadetail();
        var e = p.down("[name=pt_pt_id]");
        var x = e.getStore().findRecord("pt_id", p.down("[name=pt_pt_id]").getValue(), 0, false, true, true);
        var storeaj = me.getDetailvouchergrid().getStore();
        var coutaj = storeaj.getCount();
        var returnmsg = "<table border='1' style='background-color:#FFFFFF'><tr><td align='center'><b>Information</b></td></tr>";
        var result = true;
        console.log(f);
        if (coutaj > 0) {
            for (var i = 0; i < storeaj.getCount(); i++) {
                storeaj.each(function(recordaccount, accountindex) {
                    if (i == accountindex) {
                        Ext.Ajax.request({
                            url: 'cashier/voucher/read',
                            method: 'POST',
                            async: false,
                            params: {
                                project_id: x.raw['project_project_id'],
                                pt_id: p.down("[name=pt_pt_id]").getValue(),
                                coa: recordaccount.data['coa_coa'],
                                mode_read: 'checkcoabycompany'
                            },
                            success: function(response) {
                                var data = Ext.JSON.decode(response.responseText);
                                if (data.data['IS_EXIST'] == false) {
                                    result = false;
                                    returnmsg = returnmsg + '<tr><td>COA ' + recordaccount.data['coa_coa'] + ' is not exist in Master Coa for ' + x.raw['project_name'] + '-' + x.raw['name'] + '. Please insert a new COA ' + recordaccount.data['coa_coa'] + ' or delete this row in detail voucher. </td></tr> ';
                                }
                                storeaj.getAt(i).set('coa_coa_id', data.data['coa_id']);
                                storeaj.getAt(i).set('kelsub_kelsub', data.data['kelsub']);
                                storeaj.getAt(i).set('kelsub_description', data.data['description']);
                                storeaj.getAt(i).set('kelsub_kelsub_id', data.data['kelsub_id']);
                                storeaj.getAt(i).set('cashflow_setupcashflow_id', '');
                                storeaj.getAt(i).set('cashflowtype_cashflowtype', '');
                                storeaj.getAt(i).set('cashflowtype_cashflowtype_id', '');
                                console.log(storeaj.getAt(i));
                            },
                            failure: function(response) {

                            }
                        });
                    }
                });
            }
            returnmsg = returnmsg + '</table>';
            if (result == false) {
                //
                me.changecompanyallow = false;
                me.changecompanynotes = returnmsg;
                var messagebox = Ext.Msg.show({
                    title: 'Warning',
                    msg: returnmsg,
                    closable: true
                });

                Ext.Function.defer(function() {
                    messagebox.zIndexManager.bringToFront(messagebox);
                }, 100);
                Ext.Msg.alert('Warning', returnmsg).setBodyStyle('z-index: 999999;');
            } else {
                me.changecompanyallow = true;
            }
        }
    },
    loadSubcode: function(el) {
        var me = this;
        var g = me.getSubcodegrid();
        var f = me.getFormsubcoadetail();
        var rec = g.getSelectedRecord();
        f.down('[name=subgl_code]').setValue(rec.get('code'));
        f.down('[name=subgl_subgl_id]').setValue(rec.get("subgl_id"));
        f.down('[name=subgl_code1]').setValue(rec.get("code1"));
        f.down('[name=subgl_code2]').setValue(rec.get("code2"));
        f.down('[name=subgl_code3]').setValue(rec.get("code3"));
        f.down('[name=subgl_code4]').setValue(rec.get("code4"));
        f.down('[name=subgl_description]').setValue(rec.get("description"));
        el.up('window').destroy();
    },
    loadReceiptId: function(el, x) {
        var me = this;
        var g = me.getReceiptidvcrgrid();
        var f = me.getFormdata();
        var rec = g.getSelectedRecord();
        f.down('[name=receipt_id]').setValue(rec.get('receipt_id'));
        f.down('[name=payment_receipt_no]').setValue(rec.get('prefix_no') + '' + rec.get("receipt_no"));
        el.up('window').destroy();
    },
    loadSubcodeheader: function(el, f) {
        var me = this;
        var g = me.getSubcodegrid();
        var rec = g.getSelectedRecord();
        f.down('[name=subgl_code]').setValue(rec.get('code'));
        f.down('[name=subgl_id]').setValue(rec.get("subgl_id"));
        el.up('window').destroy();
    },
    loadReffvcr: function(el, f) {
        var me = this;
        var g = me.getReffvcrgrid();
        var rec = g.getSelectionModel().getSelection();
        var kasbank_reff_voucher_id = '';
        var kasbank_reff_id = '';
        for (var i = 0; i < rec.length; i++) {
            kasbank_reff_voucher_id += rec[i].data.voucher_no + ' (' + rec[i].data.voucherID + '), ';
            kasbank_reff_id += rec[i].data.kasbank_id + '~';
        }
        f.down('[name=kasbank_reff_voucher_id]').setValue(kasbank_reff_voucher_id);
        f.down('[name=kasbank_reff_id]').setValue(rec[0].data.kasbank_id);
        f.down('[name=kasbank_reff_ids]').setValue(kasbank_reff_id);
        el.up('window').destroy();
    },
    sorterFunc: function() {
            var me = this;
            var grid = me.getGrid();
            var fs = me.getFormsearch();
            fs.down('[name=status]').setValue('all');
            grid.on('sortchange', function() {
                me.dataSearch();
            });
    },
    checkSubDetail: function(kasbank_id) {
            var allowed_posting = true;
            Ext.Ajax.request({
                url: 'cashier/voucher/read',
                method: 'POST',
                async: false,
                params: {
                    kasbank_id: kasbank_id,
                    mode_read: 'subdetailcheck'
                },
                success: function(response) {
                    var data = Ext.JSON.decode(response.responseText);
                    if (data.data['ERROR'] == true) {
                        allowed_posting = false;
                    }

                },
                failure: function(response) {

                }
            });
            return allowed_posting;
    },
    checkVoucherprefixCoaPrefix: function(kasbank_id) {
            var error = false;
            Ext.Ajax.request({
                url: 'cashier/voucher/read',
                method: 'POST',
                async: false,
                params: {
                    kasbank_id: kasbank_id,
                    mode_read: 'voucherprefixcoaprefixcheck'
                },
                success: function(response) {
                    var data = Ext.JSON.decode(response.responseText);
                    if (data.data['ERROR'] == true) {
                        error = true;
                    }

                },
                failure: function(response) {

                }
            });
            return error;
    } ,
    checkCoaTampungan: function(kasbank_id) {
            var allowed_posting = true;
            Ext.Ajax.request({
                url: 'cashier/voucher/read',
                method: 'POST',
                async: false,
                params: {
                    kasbank_id: kasbank_id,
                    mode_read: 'checkcoatampungan'
                },
                success: function(response) {
                    var data = Ext.JSON.decode(response.responseText);
                    if (data.data['ERROR'] == true) {
                        allowed_posting = false;
                    }

                },
                failure: function(response) {

                }
            });
            return allowed_posting;
    },
    checkKasbonRealisasi: function(kasbank_id) {
        var allowed_posting = true;
        Ext.Ajax.request({
            url: 'cashier/voucher/read',
            method: 'POST',
            async: false,
            params: {
                kasbank_id: kasbank_id,
                mode_read: 'checkkasbonrealisasi'
            },
            success: function(response) {
                var data = Ext.JSON.decode(response.responseText);
                if (data.data['ERROR'] == true) {
                    allowed_posting = false;
                }

            },
            failure: function(response) {

            }
        });
        return allowed_posting;
    },
    bulanIndonesia: function(bulan) {
        if (bulan == '01') {
            return 'Januari';
        } else if (bulan == '02') {
            return 'Februari';
        } else if (bulan == '03') {
            return 'Maret';
        } else if (bulan == '04') {
            return 'April';
        } else if (bulan == '05') {
            return 'Mei';
        } else if (bulan == '06') {
            return 'Juni';
        } else if (bulan == '07') {
            return 'Juli';
        } else if (bulan == '08') {
            return 'Agustus';
        } else if (bulan == '09') {
            return 'September';
        } else if (bulan == '10') {
            return 'Oktober';
        } else if (bulan == '11') {
            return 'November';
        } else if (bulan == '12') {
            return 'Desember';
        }
    },
    checkAccess: function() {

            var me = this;

            Ext.Ajax.request({
                url: 'cashier/common/read',
                method: 'POST',
                timeout: 100000000,
                params: {
                    hideparam: 'getaccessaction',
                    term: 'VoucherCreate',
                    start: 0,
                    limit: 1000,
                },
                success: function(response) {
                    response = Ext.JSON.decode(response.responseText);
                    var isactive = response.data[0].active;
                    if (isactive == 0) {
                        var f = me.getFormdata();
                        f.down("button[action=savenew]").setVisible(false);
                    }
                },
                failure: function(response) {

                }
            });
    },
    checkARexist: function(kasbank_id) {
            var allowed_posting = true;
            Ext.Ajax.request({
                url: 'cashier/voucher/read',
                method: 'POST',
                async: false,
                params: {
                    kasbank_id: kasbank_id,
                    mode_read: 'checkisexistar'
                },
                success: function(response) {
                    var data = Ext.JSON.decode(response.responseText);
                    if (data.data['ERROR'] == true) {
                        allowed_posting = false;
                    }

                },
                failure: function(response) {

                }
            });
            return allowed_posting;
    },
    validasiSubCoaSaatSave: function() {
        var me = this;
        var f = me.getFormdata();
        var grid = me.getDetailvouchergrid().getStore();
        var state = f.up("window").state;
        var sb = me.localStore.subdetailcoa;
        var allowed = true;
        var returnmsg = [];
        var msg = '<ul>';
        grid.each(function(rec) {
            if (rec.get('kelsub_kelsub_id') > 0) {
                var ketemu = false;
                var amountdetail = parseFloat(rec.get('amount'));
                var amountsub = 0;
                if (state == 'create') {
                    if (sb.getCount() > 0) {
                        sb.each(function(sbv) {
                            if (rec.get('indexdata') == sbv.get('voucherdetail_indexdata')) {
                                ketemu = true;
                                amountsub = amountsub + parseFloat(sbv.get("amount"));
                            }
                        });
                    }
                    if (ketemu == false) {
                        allowed = false;
                        msg = msg + '<li>Sub untuk detail ' + rec.get('remarks') + ' coa ' + rec.get('coa_coa') + ' tidak tersedia. Silahkan cek kembali sub detail tsb. #01</li>';
                    } else {
                        var newamountsub = amountsub.toFixed(2);
                        var newamountdetail = amountdetail.toFixed(2);
                        if (newamountdetail != newamountsub) {
                            allowed = false;
                            msg = msg + '<li>Sub untuk detail ' + rec.get('remarks') + ' coa ' + rec.get('coa_coa') + ' jumlah amount berbeda. Silahkan cek kembali sub detail tsb. #01</li>';
                        }
                    }
                } else {
                    if (sb.getCount() > 0) {
                        sb.each(function(sbv) {
                            if (rec.get('indexdata') == sbv.get('voucherdetail_indexdata')) {
                                ketemu = true;
                                amountsub = amountsub + parseFloat(sbv.get("amount"));
                            }
                        });
                    }

                    if (ketemu == false) {
                        Ext.Ajax.request({
                            url: 'cashier/voucher/read',
                            method: 'POST',
                            async: false,
                            params: {
                                voucherdetail_id: rec.get('voucherdetail_id'),
                                mode_read: 'subdetailcoa',
                                module: 'voucher',
                                page: 1,
                                start: 0,
                                limit: 25
                            },
                            success: function(response) {
                                var data = Ext.JSON.decode(response.responseText);
                                var data2 = data.data;
                                data2.forEach(function(v) {
                                    if (rec.get('indexdata') == v['voucherdetail']['indexdata']) {
                                        ketemu = true;
                                        amountsub = amountsub + parseFloat(v['vouchersubdetail']['amount']);
                                    }

                                });
                            },
                            failure: function(response) {

                            }
                        });
                    }
                    if (ketemu == false) {
                        allowed = false;
                        msg = msg + '<li>Sub untuk detail ' + rec.get('remarks') + ' coa ' + rec.get('coa_coa') + ' tidak tersedia. Silahkan cek kembali sub detail tsb. #02</li>';
                    } else {
                        var newamountsub = amountsub.toFixed(2);
                        var newamountdetail = amountdetail.toFixed(2);
                        if (newamountdetail != newamountsub) {
                            allowed = false;
                            msg = msg + '<li>Sub untuk detail ' + rec.get('remarks') + ' coa ' + rec.get('coa_coa') + ' jumlah amount berbeda. Silahkan cek kembali sub detail tsb. #02</li>';
                        }
                    }
                }
            }
        });
        msg = msg + ' </ul>';
        returnmsg.push({
            is_allowed: allowed,
            message: msg
        });
        return returnmsg;
    },
    updateRealisasiCPMS: function(kasbank_id, project_id, pt_id, vid, realization_date, master_undangan_id, voucher_no, payment_receipt_no) {
        var allowed_posting = true;
        Ext.Ajax.request({
            url: 'cashier/voucher/read',
            method: 'POST',
            async: false,
            params: {
                kasbank_id: kasbank_id,
                project_id: project_id,
                pt_id: pt_id,
                vid: vid,
                realization_date: realization_date,
                payment_receipt_no: payment_receipt_no,
                master_undangan_id: master_undangan_id,
                voucher_no: voucher_no,
                mode_read: 'updaterealisasicpms'
            },
            success: function(response) {
                if (response.responseText == '') {
                    console.log('');
                } else {
                    var data = Ext.JSON.decode(response.responseText);
                    console.log(response.responseText);
                }

            },
            failure: function(response) {

            }
        });
        return allowed_posting;
    },
    updateRealisasiPIM: function(kasbank_id, project_id, pt_id, vid, realization_date, voucher_no, uploadpim_id) {
        var allowed_posting = true;
        Ext.Ajax.request({
            url: 'cashier/voucher/read',
            method: 'POST',
            async: false,
            params: {
                kasbank_id: kasbank_id,
                project_id: project_id,
                pt_id: pt_id,
                voucherID: vid,
                realization_date: realization_date,
                voucher_no: voucher_no,
                uploadpim_id: uploadpim_id,
                mode_read: 'updaterealisasipim'
            },
            success: function(response) {
                if (response.responseText == '') {
                    console.log('');
                } else {
                    var data = Ext.JSON.decode(response.responseText);
                    console.log(response.responseText);
                }

            },
            failure: function(response) {

            }
        });
        return allowed_posting;
    },
    checkrealisasicpms: function(kasbank_id, project_id, pt_id, vid, realization_date, master_undangan_id) {
        var allowed_posting = true;
        Ext.Ajax.request({
            url: 'cashier/voucher/read',
            method: 'POST',
            async: false,
            params: {
                kasbank_id: kasbank_id,
                project_id: project_id,
                pt_id: pt_id,
                vid: vid,
                realization_date: realization_date,
                master_undangan_id: master_undangan_id,
                mode_read: 'checkrealisasicpms'
            },
            success: function(response) {
                var data = Ext.JSON.decode(response.responseText);
                if (data.status == 0) {
                    allowed_posting = false;
                }
            },
            failure: function(response) {

            }
        });
        return allowed_posting;
    },
    searchChequeEvent: function(value) {
        var me = this;
        var grid = me.getGrid();
        var rec = grid.getSelectedRecord();
        var frm = me.getFormdatapayment();
        Ext.Ajax.request({
            url: 'cashier/voucher/read',
            method: 'POST',
            async: false,
            params: {
                value: value,
                dataflow: rec.get("dataflow"),
                project_id: rec.get("project_project_id"),
                pt_id: rec.get("pt_pt_id"),
                mode_read: 'searchcheque'
            },
            success: function(response) {
                var data = Ext.JSON.decode(response.responseText);
                console.log(data);
                if (data['cheque_id'] == '0') {
                    frm.down("[name=cheque_cheque_no]").setValue('');
                    frm.down("[name=cheque_cheque_id]").setValue('');
                    me.tools.alert.warning("Cek/Giro tidak ditemukan");
                } else {
                    frm.down("[name=cheque_cheque_no]").setValue(data['seriescheque_no']);
                    frm.down("[name=cheque_cheque_id]").setValue(data['cheque_id']);
                    frm.down("[name=voucherprefix_voucherprefix_id]").setValue(data['voucherprefix_id']);
                }
            },
            failure: function(response) {

            }
        });
    },
    searchChequeEventReal: function(value) {
        var me = this;
        var grid = me.getGrid();
        var rec = grid.getSelectedRecord();
        var frm = me.getFormrealization();
        Ext.Ajax.request({
            url: 'cashier/voucher/read',
            method: 'POST',
            async: false,
            params: {
                value: value,
                dataflow: rec.get("dataflow"),
                project_id: rec.get("project_project_id"),
                pt_id: rec.get("pt_pt_id"),
                mode_read: 'searchcheque'
            },
            success: function(response) {
                var data = Ext.JSON.decode(response.responseText);
                console.log(data);
                if (data['cheque_id'] == '0') {
                    frm.down("[name=cheque_cheque_no]").setValue('');
                    frm.down("[name=cheque_cheque_id]").setValue('');
                    me.tools.alert.warning("Cek/Giro tidak ditemukan");
                } else {
                    frm.down("[name=cheque_cheque_no]").setValue(data['seriescheque_no']);
                    frm.down("[name=cheque_cheque_id]").setValue(data['cheque_id']);
                    frm.down("[name=voucherprefix_voucherprefix_id]").setValue(data['voucherprefix_id']);
                }
            },
            failure: function(response) {

            }
        });
    },
    checkNullCashflow: function(kasbank_id, project_id, pt_id) {
        var allowed_posting = true;
        Ext.Ajax.request({
            url: 'cashier/voucher/read',
            method: 'POST',
            async: false,
            params: {
                kasbank_id: kasbank_id,
                mode_read: 'checknullcashflow'
            },
            success: function(response) {
                var data = Ext.JSON.decode(response.responseText);
                if (data.data['ERROR'] == true) {
                    allowed_posting = false;
                }

            },
            failure: function(response) {

            }
        });
        return allowed_posting;
    },
    getindexdetailcoax: function() {
        var me = this;
        var hasil = 0;
        var gridcoadetail = me.getDetailvouchergrid();
        var fa = me.getFormdata();
        gridcoadetail.getView().refresh();
        var count = gridcoadetail.getStore().getCount();
        var maxId = count;
        var myStore = gridcoadetail.getStore();
        myStore.each(function(rec) // go through all the records
            {
                maxId = Math.max(maxId, rec.get('indexdata'));
            });
        hasil = maxId + 1 + fa.deletedRowsWithoutID;
        return hasil;
    },
    getVoucherPrefixCash: function(f, project_id, pt_id, df, callback) {
        var me = this;
        var teks = '';
        f.setLoading('Get Voucher Prefix');
        f.down("button[action=save]").setDisabled(true);
        me.tools.ajax({
            params: {
                module: me.controllerName,
                project_id: project_id,
                pt_id: pt_id,
                dataflow: df
            },
            form: f,
            success: function(data) {
                try {
                    if (data == '0') {

                    } else {
                        me.checkMandatoryReal();
                    }
                } catch (err) {
                    console.log(err.message);
                    me.tools.alert.warning("Failed to get prefix voucher.");
                }
                f.setLoading(false);
            }
        }).read('getvcrprefixcash');
    },
    browseUnit: function(el, cb) {
        var ps;
        var me = this;
        var f = me.getFormsearch();
        var pt_pt_id = f.down("[name=pt_id]").getValue();
        var localstore = 'selectedData';
        var view = 'UnitGrid';
        var browse = new Cashier.library.BrowseCashier();
        browse.init({
            controller: me,
            view: view,
            el: el,
            localStore: localstore,
            mode_read: "datalist",
            bukaFormSearch: true,
            pt: pt_pt_id
        });
        browse.showWindow(function() {
            Ext.getCmp('ptArId').setValue(pt_pt_id);
        }, function() {
            if (me.pt_id) {
                Ext.getCmp('ptArId').setValue(pt_pt_id);
            }

            Ext.getCmp('btnselectunit').setVisible(false);
            Ext.getCmp('btnselectunit2').setVisible(true);
            Ext.getCmp('btnselectconvertunit').setVisible(false);
            Ext.getCmp('ptArId').setValue(pt_pt_id);
        });
    },

    unitothersSelect: function(v) {
        var me = this;
        var cmpformdata = Ext.getCmp('formdatavoucherID');
        if (!cmpformdata) {
            var w = me.instantWindow('FormData', 990, 'Add Voucher', 'create', 'myVoucherOthersWindow');
        } else {
            v.up("window").close();
        }
        var f = me.getFormdata();
        f.down('[name=dataflow]').setValue('I');
        var grid = me.getUnitgrid();
        var row = grid.getSelectionModel().getSelection();
        var rec = grid.getSelectedRecord();
        f.down('[name=unit_unit_id]').setValue(rec.get("unit_unit_id"));
        f.down('[name=customer_name]').setValue(rec.get("customer_name"));
        f.down('[name=purchaseletter_customer_id]').setValue(rec.get("customer_id"));
        f.down('[name=purchaseletter_purchaseletter_id]').setValue(rec.get("purchaseletter_id"));
        f.down('[name=unit_unit_number]').setValue(rec.get("unit_unit_number"));
        f.down('[name=pt_pt_id]').setValue(rec.get("pt_pt_id"));
        f.down('[name=project_project_id]').setValue(rec.get("project_project_id"));
        f.down('[name=unit_cluster]').setValue(rec.get("unit_cluster"));
        f.down('[name=unit_mh_type]').setValue(rec.get("unit_mh_type"));
        f.down('[name=datatype]').setReadOnly(true);
        v.up('window').destroy();
        Ext.getCmp('TabVoucherId').getComponent('tabOthers').tab.show();
        Ext.getCmp('TabVoucherId').getComponent('tabNonlink').tab.hide();
        Ext.getCmp('TabVoucherId').setActiveTab('tabOthers');
        f.down('[name=kasbank_reff_voucher_id]').setVisible(true);
        f.down('[action=browsereffvcr]').setVisible(true);
        f.down('[action=deletelink]').setVisible(true);
        me.kasbank_id = 0;
        me.loadModelOtherPayment();

        if (me.browseHandler) {
            me.templateCoa = 2;
            me.paymentflag_id = 5;
            me.isEdit = 1;
        }
        f.down('[name=unit_unit_number]').setVisible(true);

        me.visibleDescKwit(rec.get("project_subholding_id"));
    },
    tambahPTdesc: function() {

        var me = this;
        var f = me.getFormdata();
        var state = f.up('window').state;
        var fs = me.getFormsearch();
        var ptid = f.down("[name=pt_pt_id]").getValue();
        var ptstore = f.down("[name=pt_pt_id]").getStore();
        var tempptname = f.down("[name=nama_pt]").getValue();
        var description = f.down("[name=description]").getValue();
        var ptundercg = [4065, 4029, 108, 2017, 2014, 84, 4030, 2090, 4033, 2015, 5102, 2, 11124, 2054, 4060];
        var newdesc = '';
        if (state == "create" && ptid) {
            ptstore.each(function(rc) {
                if (rc.get("pt_id") == ptid) {
                    if (f.down("[name=dataflow]").getValue() == "I" && jQuery.inArray(rc.get("project_project_id"), ptundercg) != -1) {
                        if (tempptname == "") {
                            f.down("[name=nama_pt]").setValue(rc.get("name"));
                            newdesc = description + ' ' + rc.get("name");
                        } else {
                            newdesc = description.replace(tempptname, rc.get("name"));
                            console.log(newdesc);
                            f.down("[name=nama_pt]").setValue(rc.get("name"));
                        }
                        f.down("[name=description]").setValue(newdesc);
                    } else {
                        if (f.down("[name=dataflow]").getValue() == "I") {
                            newdesc = description.replace(tempptname, '');
                            f.down("[name=nama_pt]").setValue('');
                            f.down("[name=description]").setValue(newdesc);
                        }
                    }
                }
            });
        }
    },
    tambahvendorDesc: function() {
        var me = this;
        var p = me.getFormdata();

        me.tools.ajax({
            params: {
                module: me.controllerName,
                value: p.down("[name=pt_pt_id]").getValue(),
                value2: p.down("[name=project_project_id]").getValue(),
            },
            form: p,
            success: function(data) {
                try {
                    if (data) {
                        if (data.value) {
                            var desc = p.down("[name=description]").getValue();
                            var newdesc = desc.replace(p.down("[name=nama_vendor_first]").getValue() + ' -', '');
                            newdesc = p.down("[name=customer_name]").getValue() + ' - ' + newdesc;
                            p.down("[name=nama_vendor_first]").setValue(p.down("[name=customer_name]").getValue());
                            p.down("[name=description]").setValue(newdesc);

                        }
                    }

                } catch (err) {
                    p.setLoading(false);
                }
                p.setLoading(false);
            }
        }).read('vendorautofill');
    },
    cetakslipShowWindow: function(el, kasbank_id, cb) {
        var ps;
        var me = this;
        var localstore = 'selectedCetakslip';
        var browse = new Cashier.library.BrowseCashier();
        var view = 'CetakslipGrid';
        var grid = me.getCetakslipgrid();
        browse.init({
            controller: me,
            view: view,
            el: el,
            localStore: localstore,
            mode_read: "slipsetoran",
            bukaFormSearch: false,
            kasbank_id: kasbank_id
        });
        browse.showWindow(function() {
            if (typeof cb === "function") {
                cb();
            }
            Ext.getCmp('csgkasbank_id').setValue(kasbank_id);

        }, function() {

            Ext.getCmp('csgkasbank_id').setValue(kasbank_id);

        });
    },

    fdarcetakslip: function() {
        var me = this;
        var f = me.getFormdatacetakslip();
        var grid = me.getGrid(),
            rec = grid.getSelectedRecord();
        var gd = me.getCetakslipgrid(),
            rc = gd.getSelectedRecord();
        var state = f.up("window").state;
        if (state == 'update') {
            f.down("[name=slip_id]").setValue(rc.get("slip_id"));
            f.down("[name=kasbank_id]").setValue(rc.get("kasbank_id"));
            f.down("[name=norek_customer]").setValue(rc.get("norek_customer"));
            f.down("[name=nama_customer]").setValue(rc.get("nama_customer"));
            f.down("[name=alamat_customer]").setValue(rc.get("alamat_customer"));
            f.down("[name=norek_penyetor]").setValue(rc.get("norek_penyetor"));
            f.down("[name=nama_penyetor]").setValue(rc.get("nama_penyetor"));
            f.down("[name=alamat_penyetor]").setValue(rc.get("alamat_penyetor"));
            f.down("[name=telp_penyetor]").setValue(rc.get("telp_penyetor"));
            f.down("[name=nama_bank]").setValue(rc.get("nama_bank"));
            f.down("[name=amount]").setValue(rc.get("amount"));
            f.down("[name=mata_uang]").setValue(rc.get("mata_uang"));
            f.down("[name=nama_yang_dapat_dihubungi]").setValue(rc.get("nama_yang_dapat_dihubungi"));
        } else {
            f.down("[name=kasbank_id]").setValue(rec.get("kasbank_id"));
            f.down("[name=amount]").setValue(rec.get("amount"));
            f.down("[name=nama_customer]").setValue(rec.get("customer_name"));
            f.down("[name=mata_uang]").setValue("IDR");
            f.down("[name=nama_penyetor]").setValue(rec.get("namapenyetor"));
            f.down("[name=alamat_penyetor]").setValue(rec.get("alamatpenyetor"));
            f.down("[name=telp_penyetor]").setValue(rec.get("telppenyetor"));
        }
    },
    fdarnonlink: function(el) {
        var me = this;
        var f = me.getFormdatanonlink();
        var state = el.up('window').state;
        me.getCustomRequestCombobox('paymenttype', '', '', '', 'paymenttype_id', 'paymenttype', '', f, '', function() {
            if (state === "update") {
                var g = me.getNonlinkgrid();
                var rec = g.getSelectedRecord();
                f.editedRow = g.getSelectedRow();
                f.loadRecord(rec);
            }
        });
    },
    gridSelectionChangeCetakSlipGrid: function() { //gs
        var me = this;
        var grid = me.getCetakslipgrid(),
            row = grid.getSelectionModel().getSelection();
        var rec = grid.getSelectedRecord();
        var deleted = grid.down('#deletecsg');
        var selected = grid.down('#selectcsg');
        var c = grid.getSelectionModel().getCount();
        if (c === 1) {
            deleted.setDisabled(false);
            selected.setDisabled(false);
        } else {
            deleted.setDisabled(true);
            selected.setDisabled(true);
        }

    },
    gridSelectionChangeAttachmentGrid: function() { //gs
        var me = this;
        var grid = me.getAttachmentdetailgrid(),
            row = grid.getSelectionModel().getSelection();
        var rec = grid.getSelectedRecord();
        var deleted = grid.down('#btnDeleteAtc');
        var c = grid.getSelectionModel().getCount();
        var nonvoucher = false;

        row.forEach(function(x) {
            if (x.get("module") != "voucher") {
                nonvoucher = true;
            }
        });
        deleted.setDisabled(nonvoucher);

    },

    UploadAttachment: function() {
        var me = this;
        var formdata = this.getFormdata();
        var form = this.getFormdatauploadattachment();
        var groupingdata = 0;
        var filetitle = form.down("[name=file-title]").getValue();
        var filename = form.down("[name=file-path-attachment]").getValue();
        if (filename == "" || filename == null) {
            Ext.Msg.alert('Warning', 'Please select files to upload');
            return false;
        }
        if (filetitle == "" || filetitle == null) {
            Ext.Msg.alert('Warning', 'Please fill Description');
            return false;
        }
        if (true) {


            var senddata = form.getValues();
            try {


                form.submit({
                    url: 'cashier/voucher/read',
                    waitMsg: 'Processing data...',
                    params: {
                        data: Ext.encode(senddata),
                        mode_read: 'uploadattachment'
                    },
                    success: function(fp, o) {

                        var dt = o.result.data;
                        var emsg = '';
                        var msg = '';
                        var errormsg = dt.error;
                        var voucher_id = 0;

                        var arrayLength = Object.keys(errormsg).length;

                        if (arrayLength > 0) {
                            for (var i = 0; i < arrayLength; i++) {
                                if (typeof errormsg[i] !== "undefined") {
                                    emsg = emsg + errormsg[i] + '<br>';
                                }
                            }
                            emsg = emsg + 'Proses Upload Dibatalkan!';
                            Ext.Msg.alert('Warning', emsg);
                            form.up('window').close();
                            me.messagedata = emsg;
                            Ext.Msg.alert('Warning', me.messagedata);
                            return false;
                        } else {
                            //insert to grid
                            var store = me.getAttachmentdetailgrid().getStore();
                            var rowdata = {
                                hideparam: 'create',
                                statedata: 'create',
                                attachment_id: 0,
                                filename: dt.filename,
                                filesize: dt.filesize,
                                remarks: filetitle,
                                description: filetitle,
                                path: dt.path,
                                addon: dt.addon,
                                module: 'voucher',
                                deleted: false,
                                link: '<a onclick="me.DownloadAttachment()">' + dt.filename + '</a>'
                            };
                            store.add(rowdata);
                            store.commitChanges();

                            me.messagedata = 'Uploaded Successfully.';
                            form.up('window').close();
                            Ext.Msg.alert('Info', dt.message);
                        }

                        try {

                            //nanti isinya sama dengan atas

                        } catch (err) {
                            Ext.Msg.alert('Warning', '[1] Processing failed !');
                            form.up('window').close();
                            return false;
                        }
                    },
                    failure: function(fp, o) {
                        Ext.Msg.alert('Warning', '[2] Processing failed !');
                        form.up('window').close();
                        return false;
                    }
                });
            } catch (err) {
                Ext.Msg.alert('Warning', '[3] Processing failed !');
                return false;
            }

        }
    },
    loadModelAttachment: function(kasbank_id, callback) {
        var me = this;
        var grid = me.getAttachmentdetailgrid();
        grid.getStore().clearFilter(true);
        grid.doInit();
        grid.getStore().load({
            params: {
                kasbank_id: kasbank_id
            },
            callback: function(rec, op) {
                if (op) {
                    grid.attachModel(op);
                } else {
                    console.log('error attach model ');
                }

                if (typeof callback === "function") {
                    callback();
                }
            }
        });
    },

    loadModelApprovalDetail: function(kasbank_id, callback) {
        var me = this;
        var grid = me.getApprovaldetailgrid();
        grid.getStore().clearFilter(true);
        grid.doInit();
        grid.getStore().load({
            params: {
                kasbank_id: kasbank_id
            },
            callback: function(rec, op) {
                if (op) {
                    grid.attachModel(op);
                } else {
                    console.log('error attach model ');
                }

                if (typeof callback === "function") {
                    callback();
                }
            }
        });
    },
    loadModelNonlink: function(kasbank_id, callback) {
        var me = this;
        var grid = me.getNonlinkgrid();
        grid.getStore().clearFilter(true);
        grid.doInit();
        grid.getStore().load({
            params: {
                kasbank_id: kasbank_id
            },
            callback: function(rec, op) {
                if (op) {
                    grid.attachModel(op);
                } else {
                    console.log('error attach model ');
                }

                if (typeof callback === "function") {
                    callback();
                }
            }
        });
    },
    dataDestroyattachmentdetailwithflag: function() {

        var me, rows, ph, pd, confirmmsg, successmsg, failmsg,
            record, recordcounttext, store, selectedRecord, msg, successcount, parameter, pesan, dataconfirm, ph, pd;
        me = this;
        ph = me.paramheader;
        pd = me.paramdetail;
        dataconfirm = 'filename';

        rows = me.getGridattachmentdetail().getSelectionModel().getSelection();
        if (rows.length < 1) {
            Ext.Msg.alert('Info', 'No record selected !');
            return;
        } else {
            recordcounttext = rows.length + ' record' + (rows.length > 1 ? 's' : '');
            store = me.getGridattachmentdetail().getStore();

            if (rows.length == 1) {
                selectedRecord = '[' + store.getAt(store.indexOf(rows[0])).get(dataconfirm) + ']';
                confirmmsg = 'Delete ' + selectedRecord + ' ?';
                failmsg = 'Error: Unable to delete ' + selectedRecord + '.';
            } else {
                confirmmsg = 'This action will delete ' + recordcounttext + '.<br />Continue ?';
                failmsg = 'Error: Unable to delete data.';
            }

            var substore = [];
            var indexdatadeleted = [];
            var substorenew = [];
            var indexdata;

            Ext.Msg.confirm('Delete Data', confirmmsg, function(btn) {
                if (btn == 'yes') {
                    resetTimer();
                    msg = function() {
                        me.getAttachmentdetailgrid().up('window').mask('Deleting data, please wait ...');
                    };

                    for (var i = 0; i < rows.length; i++) {
                        record = rows[i];
                        record.set("deleted", true);
                        record.set("statedata", 'delete');
                        record.set("hideparam", 'detailattachmentdelete');

                        store.clearFilter(true);
                        store.filter('deleted', false);

                    }

                }

            });

        }
    },

    saveNonlink: function(callback) {
        var me = this;
        var f = me.getFormdatanonlink();
        var value = f.getForm().getValues();
        var g = me.getNonlinkgrid();
        var store = g.getStore();
        var total = f.down("[name=amount]").getValue();
        total = accounting.unformat(total);
        if (f.getForm().isValid()) {
            value['amount'] = parseFloat(accounting.unformat(value['amount']));
            if (total !== 0) {
                if (f.editedRow > -1) {
                    var rec = store.getAt(f.editedRow);
                    rec.beginEdit();
                    rec.set(value);
                    rec.endEdit();
                    store.commitChanges();
                } else {

                    store.add(value);
                    store.commitChanges();
                }
                if (callback) {
                    setTimeout(function() {
                        callback();
                    }, 600);
                }
                f.up('window').close();
            } else {
                me.tools.alert.warning("Amount cannot be empty.");
            }
        }
        me.isnonlink = '1';
    },
    paymenthelperOnBlur: function(amount, isdenda) {
        var me = this;
        var grid = me.getAngsurangrid();
        var s = grid.getStore();
        var paymentflag = 1;
        if (isdenda) {
            paymentflag = 2;
        }
        amount = accounting.unformat(amount);
        me.paymenthelperf7 = amount;
        grid.getSelectionModel().deselectAll();
        if (accounting.unformat(amount) > 0) {
            s.each(function(rec, idx) {
                if (isdenda) {
                    if (rec.get("oppaid") > 0 && rec.get("paymenttype_paymenttype_id") == paymentflag) {
                        if (amount > 0) {
                            grid.getSelectionModel().select(idx, true);
                            if (amount > rec.get("oppaid")) {
                                amount = accounting.unformat(amount) - accounting.unformat(rec.get("oppaid"));
                            } else {
                                amount = 0;
                            }
                        }
                    }
                } else {
                    if (rec.get("oppaid") > 0 && rec.get("paymenttype_paymenttype_id") != 2) {
                        if (amount > 0) {
                            grid.getSelectionModel().select(idx, true);
                            if (amount > rec.get("oppaid")) {
                                amount = accounting.unformat(amount) - accounting.unformat(rec.get("oppaid"));
                            } else {
                                amount = 0;
                            }
                        }
                    }
                }
            });
        } else {
            grid.getSelectionModel().deselectAll();
        }
    },
    visibleDescKwit: function(subholding) {
        var me = this;
        var f = me.getFormdata();

        var x = f.down("[name=project_project_id]").getStore().findRecord("project_project_id", f.down("[name=project_project_id]").getValue(), 0, false, true, true);
        if (x && me.paymentflag_id > 0) {
            if (x.data['project_subholding_id'] == '1') {
                f.down("[name=receipt_notes]").setVisible(true);
            } else {
                f.down("[name=receipt_notes]").setVisible(false);
            }
        }
        if (subholding > 0 && me.paymentflag_id > 0) {
            if (subholding == '1') {
                f.down("[name=receipt_notes]").setVisible(true);
            } else {
                f.down("[name=receipt_notes]").setVisible(false);
            }
        }
    },
    browseSubReal: function(el, ar) {
        var ps;
        var me = this;
        var browse = new Cashier.library.BrowseCashier();
        var localstore = 'selectedSubcode';
        var f = me.getFormrealization();
        var kelsub = f.down('[name=kelsub_id]').getValue();
        browse.init({
            controller: me,
            view: 'SubcodeGrid',
            el: el,
            localStore: localstore,
            mode_read: "selectedsubcode",
            bukaFormSearch: true,
        });
        browse.showWindow(function() {
            Ext.getCmp('kelsubIdSubcode').setValue(kelsub);
            Ext.getCmp('ptVoucherIdSubcode').setValue(me.pt_id);
            Ext.getCmp('projectVoucherIdSubcode').setValue(me.project_id);
        }, function() {
            if (me.pt_id) {
                Ext.getCmp('ptVoucherIdSubcode').setValue(me.pt_id);
                Ext.getCmp('kelsubIdSubcode').setValue(kelsub);
                Ext.getCmp('projectVoucherIdSubcode').setValue(me.project_id);
            }
            Ext.getCmp('ptVoucherIdSubcode').setValue(me.pt_id);
            Ext.getCmp('projectVoucherIdSubcode').setValue(me.project_id);
            Ext.getCmp('kelsubIdSubcode').setValue(kelsub);
            Ext.getCmp('btnselectinheader').setVisible(true);
            Ext.getCmp('btnselectsub').setVisible(false);
            Ext.getCmp('btncreatens').setVisible(false);
            me.fd = f;
            var gc = me.getSubcodegrid();
            var storear = gc.getStore();
            var fields = Ext.getCmp('MySuperBrowseWindow').getForm().getFieldValues();
            for (var x in fields) {
                storear.getProxy().setExtraParam(x, fields[x]);
            }
            storear.load({
                callback: function(records, options, success) {
                    gc.down("pagingtoolbar").doRefresh();
                    Ext.getCmp('ptVoucherIdSubcode').setValue(me.pt_id);
                    Ext.getCmp('kelsubIdSubcode').setValue(kelsub);
                }
            });
        });
    },
    showSubglCode: function(f, is_realization) {
        var me = this;
        var sc = f.down("[name=voucherprefix_voucherprefix_id]").getStore();
        sc.each(function(rec) {
            if (rec.get("voucherprefix_id") == f.down("[name=voucherprefix_voucherprefix_id]").getValue()) {
                f.down("[name=kelsub_id]").setValue(rec.get("kelsub_id"));
                if (rec.get("kelsub_id") > 0) {
                    f.down("[name=subgl_code]").setVisible(true);
                    f.down("[name=subgl_code]").allowBlank = false;
                    if (is_realization) {
                        f.down("[id=btnbrowseSub]").setVisible(false);
                    } else {
                        f.down("[id=btnbrowseSub]").setVisible(true);
                    }

                    console.log('AUTO COMPLETE SUB');
                    var voucherprefix_id = f.down("[name=voucherprefix_voucherprefix_id]").getValue();
                    me.fillSubReal(voucherprefix_id);
                } else {
                    f.down("[name=subgl_code]").setVisible(false);
                    f.down("[name=subgl_code]").allowBlank = true;
                    f.down("[id=btnbrowseSub]").setVisible(false);
                }
            }
        });
    },
    checkSubHeader: function(kasbank_id) {
        var allowed_posting = true;
        Ext.Ajax.request({
            url: 'cashier/voucher/read',
            method: 'POST',
            async: false,
            params: {
                kasbank_id: kasbank_id,
                mode_read: 'subheadercheck'
            },
            success: function(response) {
                var data = Ext.JSON.decode(response.responseText);
                if (data.allowed == 0) {
                    allowed_posting = false;
                }

            },
            failure: function(response) {

            }
        });
        return allowed_posting;
    },
    validasiPrintVoucher: function() {
        var me = this;
        var grid = me.getGrid();
        var hakakses = me.actsvcr.VoucherSuperPrint;
        var row = grid.getSelectionModel().getSelection();
        var allowed = true;
        var current_dataflow = "";
        var is_same_dataflow = true;
        if (row.length == 0) {
            me.tools.alert.warning("Silahkan pilih voucher terlebih dahulu.");
            return false;
        }
        Ext.each(row, function(rec) {

            if (current_dataflow != "" && current_dataflow != rec.get("dataflow")) {
                is_same_dataflow = false;
            } else {
                current_dataflow = rec.get("dataflow");
            }

            if (((rec.get("is_realized") == 1 && rec.get("dataflow") == "O") || rec.get("is_posting") == 1 || (rec.get("is_paid") == 1 && rec.get("dataflow") == "O")) && (typeof hakakses == "undefined")) {

                allowed = false;
            }
        });

        if (is_same_dataflow === false) {
            me.tools.alert.warning("Can't Print Voucher with Different Dataflow");
            return false;
        }

        if (!allowed) {
            me.tools.alert.warning("Anda tidak memiliki akses untuk cetak voucher yang sudah payment/realized/posting");
            return false;
        }

        return allowed;

    },
    autoduedate: function() {
        var me = this;
        var p = me.getFormdata();
        var currentDate = new Date();
        me.tools.ajax({
            params: {
                module: me.controllerName,
                value: p.down("[name=pt_pt_id]").getValue(),
                value2: p.down("[name=project_project_id]").getValue(),
            },
            form: p,
            success: function(data) {
                try {
                    if (data) {
                        if (data.value) {
                            var cloneDate = new Date(currentDate.valueOf());
                            cloneDate.setDate(cloneDate.getDate() + +data.value);
                            p.down("[name=duedate]").setValue(moment(cloneDate).format("DD-MM-YYYY"));
                        }
                    }

                } catch (err) {
                    p.setLoading(false);
                }
                p.setLoading(false);
            }
        }).read('autoduedate');
    },

    checkAccessCreateSub: function() {

        var me = this;

        Ext.Ajax.request({
            url: 'cashier/common/read',
            method: 'POST',
            timeout: 100000000,
            params: {
                hideparam: 'getaccessaction',
                term: 'VoucherCreateNewSub',
                start: 0,
                limit: 1000,
            },
            success: function(response) {
                response = Ext.JSON.decode(response.responseText);
                var isactive = response.data[0].active;
                if (isactive == 0) {
                    Ext.getCmp('btncreatens').setVisible(false);
                }
            },
            failure: function(response) {

            }
        });
        //
    },
    usemasterreceipt: function() {
        var me = this;
        var p = me.getFormdata();
        me.tools.ajax({
            params: {
                module: me.controllerName,
                value: p.down("[name=pt_pt_id]").getValue(),
                value2: p.down("[name=project_project_id]").getValue(),
            },
            form: p,
            success: function(data) {
                try {
                    if (data) {
                        if (data.value == 1 && p.down("[name=dataflow]").getValue() == "I") {
                            p.down("[action=browsereceiptid]").setVisible(true);
                            p.down("[action=generatekwitansinumber]").setVisible(true);
                            p.down("[action=browseremovereceiptid]").setVisible(true);
                            p.down("[name=payment_receipt_no]").setReadOnly(true);
                        } else {
                            p.down("[action=browsereceiptid]").setVisible(false);
                            p.down("[action=generatekwitansinumber]").setVisible(false);
                            p.down("[action=browseremovereceiptid]").setVisible(false);
                            p.down("[name=payment_receipt_no]").setReadOnly(false);
                        }
                    }

                } catch (err) {
                    p.setLoading(false);
                }
                p.setLoading(false);
            }
        }).read('usemasterreceipt');
    },
    browseUnitConvert: function(el, cb) {
        var ps;
        var me = this;
        var f = me.getFormsearch();
        var pt_pt_id = f.down("[name=pt_id]").getValue();
        var localstore = 'selectedData';
        var view = 'UnitGrid';
        var browse = new Cashier.library.BrowseCashier();
        browse.init({
            controller: me,
            view: view,
            el: el,
            localStore: localstore,
            mode_read: "datalist",
            bukaFormSearch: true,
            pt: pt_pt_id
        });
        browse.showWindow(function() {
            Ext.getCmp('ptArId').setValue(pt_pt_id);
        }, function() {
            if (me.pt_id) {
                Ext.getCmp('ptArId').setValue(pt_pt_id);
            }

            Ext.getCmp('btnselectunit').setVisible(false);
            Ext.getCmp('btnselectunit2').setVisible(false);
            Ext.getCmp('btnselectconvertunit').setVisible(true);
            Ext.getCmp('ptArId').setValue(pt_pt_id);
        });
    },
    formatNumber: function(num) {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    },
    // SEFTIAN ALFREDO 27/04/2022 RESET PRINT VOUCHER
    resetPrint: function() {
        var me, grid, rec;
        me = this;
        grid = me.getGrid();
        rec = grid.getSelectedRecord();
        Ext.MessageBox.show({
            title: 'Confirmation',
            msg: 'Reset counter print voucher ?',
            buttons: Ext.MessageBox.OKCANCEL,
            fn: function(btn) {
                if (btn == 'ok') {
                    console.log(rec);
                    Ext.Ajax.request({
                        url: 'cashier/voucher/read',
                        method: 'POST',
                        async: false,
                        params: {
                            project_id: me.project_id,
                            pt_id: me.pt_id,
                            kasbank_id: rec.get('kasbank_id'),
                            mode_read: 'resetprint',
                        },
                        success: function(response) {
                            var data = Ext.JSON.decode(response.responseText);
                            Ext.Msg.alert('Info', data.data.msg);
                        },
                        failure: function(response) {
                            console.log(response);
                            Ext.Msg.alert('Error', 'Terjadi kesalahan. Silahkan ulangi kembali.');
                        }
                    });
                }
            }
        });
    },
    isLinkCoaCf: function() {
        var me, f, val;
        me = this;
        f = me.getFormcoadetail();
        val = f.down("[name=cashflow_setupcashflow_id]").getValue();
        if (val > 0) {
            Ext.Ajax.request({
                url: 'cashier/common/read',
                method: 'POST',
                async: false,
                params: {
                    project_id: me.project_id,
                    pt_id: me.pt_id,
                    setupcashflow_id: val,
                    hideparam: 'isLinkCoaCf',
                },
                success: function(response) {
                    var data = Ext.JSON.decode(response.responseText);
                    var res = data.data[0].result;
                    if (res) {
                        f.down("[name=coa_coa_id_cf]").setVisible(true);
                        Ext.getCmp('formcoadetail_coa_id_cf').allowBlank = false;
                    } else {
                        f.down("[name=coa_coa_id_cf]").setVisible(false);
                        f.down("[name=coa_coa_id_cf]").setValue(0);
                        Ext.getCmp('formcoadetail_coa_id_cf').allowBlank = true;
                    }
                },
                failure: function(response) {
                    console.log(response);
                }
            });

        } else {
            console.log('GAK ADA');
        }
    },
    // PENCEGAHAN NOMOR VOUCHER SAMA 07/07/2022 - SEFTIAN ALFREDO
    checkvouchernorealisasi: function(kasbank_id, project_id, pt_id, vid, prefixcode, voucherint) {
        var res = false;
        Ext.Ajax.request({
            url: 'cashier/voucher/read',
            method: 'POST',
            async: false,
            params: {
                kasbank_id: kasbank_id,
                project_id: project_id,
                pt_id: pt_id,
                vid: vid,
                prefixcode: prefixcode,
                voucherint: voucherint,
                mode_read: 'checkvouchernorealisasi'
            },
            success: function(response) {
                var data = Ext.JSON.decode(response.responseText);
                if (data.data.result == 1) {
                    res = true;
                }
            },
            failure: function(response) {

            }
        });
        return res;
    },
    formTrackingAfterRender: function() {
        var me, grid, record, gridlog, storegridlog;
        me = this;
        grid = me.getGrid();
        record = grid.getSelectedRecord();
        gridlog = me.getGriddetaillog();
        storegridlog = gridlog.getStore();

        var kasbank_id = record.get('kasbank_id');

        Ext.Ajax.request({
            url: 'cashier/voucher/read',
            method: 'POST',
            async: false,
            params: {
                kasbank_id: kasbank_id,
                mode_read: 'kasbanklog'
            },
            success: function(response) {
                var data = Ext.JSON.decode(response.responseText);

                storegridlog.loadData([], false);

                for (var i = 0; i < data.data.data.length; i++) {

                    storegridlog.add({
                        transaction_no: data.data.data[i].transaction_no,
                        action: data.data.data[i].action,
                        user_fullname: data.data.data[i].user_fullname,
                        addon: data.data.data[i].addon,
                        module: data.data.data[i].module,
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

    updateRealisasiAPI: function(kasbank_id, project_id, pt_id, vid, realization_date, voucher_no, uploadpim_id) {
        var allowed_posting = true;
        Ext.Ajax.request({
            url: 'cashier/voucher/read',
            method: 'POST',
            async: false,
            params: {
                kasbank_id: kasbank_id,
                project_id: project_id,
                pt_id: pt_id,
                voucherID: vid,
                realization_date: realization_date,
                voucher_no: voucher_no,
                uploadpim_id: uploadpim_id,
                mode_read: 'updaterealisasiapi'
            },
            success: function(response) {

            },
            failure: function(response) {

            }
        });
        return allowed_posting;
    },

    updateUnrealisasiAPI: function(kasbank_id, project_id, pt_id, vid, realization_date, voucher_no, uploadpim_id) {
        var allowed_posting = true;
        Ext.Ajax.request({
            url: 'cashier/voucher/read',
            method: 'POST',
            async: false,
            params: {
                kasbank_id: kasbank_id,
                project_id: project_id,
                pt_id: pt_id,
                voucherID: vid,
                realization_date: realization_date,
                voucher_no: voucher_no,
                uploadpim_id: uploadpim_id,
                mode_read: 'updateunrealisasiapi'
            },
            success: function(response) {

            },
            failure: function(response) {

            }
        });

        return allowed_posting;
    },

    getDropdownKasbankMaker: function() {
        var me, fs;
        me = this;
        fs = me.getFormsearch();
        Ext.Ajax.request({
            url: 'cashier/voucher/read',
            method: 'POST',
            async: false,
            params: {
                project_id: fs.down("[name=project_id]").getValue() > 0 ? fs.down("[name=project_id]").getValue() : apps.project,
                pt_id: fs.down("[name=pt_id]").getValue() > 0 ? fs.down("[name=pt_id]").getValue() : apps.pt,
                mode_read: 'kasbankmaker'
            },
            success: function(response) {
                var data = Ext.JSON.decode(response.responseText);
                var record = {};
                var tempData = [];
                var element = fs.down("[name=addby]");

                for (var i = 0; i < data.data.result.length; i++) {
                    tempData.push(data.data.result[i]);
                }

                var newStore = Ext.create('Ext.data.Store', {
                    fields: ['addby', 'user_email'],
                    data: tempData
                });

                element.bindStore(newStore);

            },
            failure: function(error) {
                console.log(error);
            }
        });
    },

    checkblockunit: function(unit_id) {
        var me, result = [];

        me = this;
        Ext.Ajax.request({
            url: 'cashier/voucher/read',
            method: 'POST',
            async: false,
            params: {
                unit_id: unit_id,
                mode_read: 'checkblockunit'
            },
            success: function(response) {
                var data = Ext.JSON.decode(response.responseText);

                if (data.data.result == 1) {
                    // result = 1;
                    result = {
                        'result': 1,
                        'msg': data.data.msg
                    }
                } else {
                    // result = 0;
                    result = {
                        'result': 0,
                        'msg': data.data.msg
                    }
                }

            },
            failure: function(error) {
                console.log(error);
            }
        });


        return result;
    },

    mainPrintCustom3Rangkap: function() {
        var me, params, reportData;
        me = this;
        if (me.reportFileNamevcr) {
            me.xyReport = new Cashier.library.XyReportB();
            me.xyReport.init(me);

            params = me.xyReport.params;
            reportData = me.xyReportProcessParams({ params: params, file: 'blank' });
        }

        if (reportData.params.reportParams.length > 0) {
            for (var i = 0; i < reportData.params.reportParams.length; i++) {
                Ext.Ajax.request({
                    url: 'cashier/voucher/read',
                    method: 'POST',
                    async: false,
                    params: {
                        kasbank_id: reportData.params.reportParams[i].kasbank_id,
                        multi_kwitansi_date: reportData.params.reportParams[i].multi_kwitansi_date,
                        multi_vendor: reportData.params.reportParams[i].multi_vendor,
                        multi_description_kwitansi_ar: reportData.params.reportParams[i].multi_description_kwitansi_ar,
                        multi_amount: reportData.params.reportParams[i].multi_amount,
                        multi_totalamount: reportData.params.reportParams[i].multi_totalamount,
                        multi_terbilang: reportData.params.reportParams[i].multi_terbilang,
                        multi_format_totalamount: reportData.params.reportParams[i].multi_format_totalamount,
                        multi_dibayarkan_description: reportData.params.reportParams[i].multi_dibayarkan_description,
                        multi_userprint: reportData.params.reportParams[i].multi_userprint,
                        multi_voucher_date: reportData.params.reportParams[i].multi_voucher_date,
                        multi_description: reportData.params.reportParams[i].multi_description,
                        multi_customer_name: reportData.params.reportParams[i].multi_customer_name,
                        multi_kasbank_date: reportData.params.reportParams[i].multi_kasbank_date,
                        mode_read: 'reportkwitansi'
                    },
                    success: function(response) {
                        var data = Ext.JSON.decode(response.responseText);

                        me.generateStiAndSavePdf(data.data.result, reportData.file)
                    },
                    failure: function(error) {
                        console.log(error);
                    }
                });
            }
        }
    },

    generateStiAndSavePdf: function(paramList, reportFile) {
        var me = this,
            x, y, fs;
        fs = me.getFormsearch();


        Stimulsoft.Base.StiLicense.loadFromFile(document.URL + 'resources/stimulsoftjsv3/stimulsoft/license.key');
        var report = new Stimulsoft.Report.StiReport();
        report.loadFile(document.URL + "app/cashier/reportjs_user/" + reportFile + ".mrt");
        report.reportName = reportFile;


        var dataSet = new Stimulsoft.System.Data.DataSet('data'); // nama DataSet harus sama dengan report
        dataSet.readJson(JSON.stringify(paramList));

        report.dictionary.databases.clear();
        report.regData(dataSet.dataSetName, "", dataSet);

        var pdfSettings = new Stimulsoft.Report.Export.StiPdfExportSettings();
        var pdfService = new Stimulsoft.Report.Export.StiPdfExportService();
        var stream = new Stimulsoft.System.IO.MemoryStream();
        report.renderAsync(function() {
            pdfService.exportToAsync(function() {
                var data = stream.toArray();
                var blob = new Blob([new Uint8Array(data)], { type: "application/pdf" });

                var blobData = new FormData();
                blobData.append('file', blob);
                blobData.append('mode_read', 'savepdf');
                blobData.append('paramList', btoa(JSON.stringify(paramList)));
                blobData.append('project_id', fs.down("[name=project_id]").getValue());
                blobData.append('pt_id', fs.down("[name=pt_id]").getValue());
                blobData.append('optionQr', me.optionQr);

                $.ajax({
                    type: 'POST',
                    url: 'cashier/voucher/read',
                    data: blobData,
                    contentType: false,
                    cache: false,
                    processData: false,
                    success: function(response) {

                        me.showKwitansi3Rangkap(response.data.result[0].filename, response.data.result[0].path);
                    }
                });
            }, report, stream, pdfSettings);
        }, false);
    },

    showKwitansi3Rangkap: function(filename, path) {
        var me, p, psa, pmsa = '';
        me = this;
        var re = /(?:\.([^.]+))?$/;
        var ext = re.exec(filename)[1];
        Ext.Ajax.request({
            async: true,
            url: 'cashier/common/read',
            method: 'POST',
            timeout: 45000000,
            params: {
                hideparam: 'getattachmentfile',
                path: path
            },
            success: function(response) {
                resjson = Ext.JSON.decode(response.responseText);
                var base64src = resjson.data.base64src;
                var downloadsrc = decodeURIComponent(resjson.data.signedUrl);
                if (ext == 'pdf') {

                    var contentType = 'application/pdf';
                    var blob = me.b64toBlob(base64src, contentType);
                    var blobUrl = URL.createObjectURL(blob);

                    var html = '<embed scrolling="no" src="' + blobUrl + '" type="application/pdf" width="100%" height="100%">';
                } else {
                    var html = '<div style="style="display: block; min-height: 600px; width: 700px; min-width: 700px">';
                    html = html + '<img src="' + base64src + '" style="overflow: auto; display: block; height: auto; width: 100%"></div>';
                    html = html + '<div><a style="padding: 10px; float: right;" target="_blank" href="' + downloadsrc + '" download>Download</a></div>';
                }

                Ext.create("Ext.Window", {
                    title: 'Attachment Viewer : ' + filename,
                    width: 700,
                    height: 500,
                    closable: true,
                    html: html,
                    autoScroll: true,
                    modal: false,
                    maximizable: true,
                    minimizable: true,
                    resizable: true,
                    constrain: true,
                    constrainHeader: false,
                    taskbarButton: true,
                    animCollapse: false,
                    layout: 'fit',
                    shadow: 'frame',
                    shadowOffset: 10,
                    renderTo: Ext.getBody(),
                }).show();
            },
            failure: function(response) {
                me.messagedata = 'data error';

                Ext.Msg.show({
                    title: 'Failure',
                    msg: 'Error: Your file is error',
                    icon: Ext.Msg.ERROR,
                    buttons: Ext.Msg.OK
                });
            }
        });
        me.getPanel().setLoading(false);
    },

    sendEmailToFc: function(kasbank_id) {
        var me = this;

        Ext.Ajax.request({
            url: 'cashier/voucher/read',
            method: 'POST',
            async: false,
            params: {
                kasbank_id: kasbank_id,
                mode_read: 'sendEmailToFc'
            },
            success: function(response) {
                var data = Ext.JSON.decode(response.responseText);
                console.log(data);
            },
            failure: function(error) {
                console.log(error);
            }
        });
    },

    generateKwitansiNumber: function() {
        var me = this;
        var p = me.getFormdata();

        Ext.Ajax.request({
            url: 'cashier/voucher/read',
            method: 'POST',
            async: false,
            params: {
                project_id  : p.down("[name=project_project_id]").getValue(),
                pt_id       : p.down("[name=pt_pt_id]").getValue(),
                kasbank_date: p.down("[name=kasbank_date]").getValue(),
                mode_read   : 'generateKwitansiNumber'
            },
            success: function(response) {
                var data = Ext.JSON.decode(response.responseText);
                console.log(data);
                if (data.data.result == 1) {
                    p.down("[name=payment_receipt_no]").setValue(data.data.msg);
                } else {
                    p.down("[name=payment_receipt_no]").setValue('');
                }
            },
            failure: function(error) {
                console.log(error);
            }
        });
    },

    printInvoice: function() {
        var me, fs, grid, rows, params;
        var kasbank_ids = '';
        me = this;
        fs = me.getFormsearch();
        grid = me.getGrid();
        rows = grid.getSelectionModel().getSelection();

        if (rows.length == 0) {
            me.tools.alert.warning("Silahkan pilih voucher terlebih dahulu.");
            return false;
        }

        for (var i = 0; i < rows.length; i++) {
            kasbank_ids = kasbank_ids + rows[i].data.kasbank_id + '~';
        }

        // CHECK TEMPLATE INVOICE
        Ext.Ajax.request({
            url: 'cashier/voucher/read',
            method: 'POST',
            async: false,
            params: {
                project_id: fs.down("[name=pt_id]").valueModels[0].data.project_project_id,
                pt_id: fs.down("[name=pt_id]").getValue(),
                mode_read: 'checktemplateinvoice'
            },
            success: function(response) {
                var data = Ext.JSON.decode(response.responseText);

                if (data.data.result == 0) {
                    me.tools.alert.warning(data.data['msg']);
                    return false;
                } else {
                    me.reportFileNamevcr = data.data['msg'];
                    me.mainPrint();
                }
            },
            failure: function(error) {
                console.log(error);
            }
        });
    },

    getRequestUnrealization: function() {
        var me, fs, grid, project_id, pt_id;
        me = this;
        fs = me.getFormsearch();
        grid = me.getGrid();
        project_id = fs.down("[name=pt_id]").valueModels[0].data.project_project_id;
        pt_id = fs.down("[name=pt_id]").getValue();
        if (pt_id > 0) {

            Ext.Ajax.request({
                url: "cashier/voucher/read",
                method: "POST",
                async: false,
                params: {
                    project_id: project_id,
                    pt_id: pt_id,
                    mode_read: "checkRequestUnrealization"
                },
                success: function(response) {
                    var data = Ext.JSON.decode(response.responseText);


                    if (data.data.result == 1) {
                        grid.down("[action=requestunrealization]").setVisible(true);
                        me.is_request_unrealization = 1;
                    } else {
                        grid.down("[action=requestunrealization]").setVisible(false);
                        me.is_request_unrealization = 0;
                    }
                }
            });
        }
    },

    requestunrealization: function() {
        var me, grid, rec, record, confirmmsg;
        var mode_request = 1;   // 1 = request unrealize, 2 = cancel request
            me           = this;
            grid         = me.getGrid();
            rec          = grid.getSelectionModel().getSelection();
            record       = grid.getSelectedRecord();
        if (rec.length == 0) {
            me.tools.alert.warning("Silahkan pilih voucher terlebih dahulu.");
            return false;
        }
        if (rec.length > 1) {
            me.tools.alert.warning("Pilih maksimal 1 voucher.");
            return false;
        }

        if (record.get('status') != 'is_realized') {

            if (record.get('status') == 'is_request_unrealize') {
                mode_request = 2;
            } else {
                me.tools.alert.warning("Silahkan pilih voucher yang telah direalisasi.");
                return false;
            }
        }
        if (mode_request == 1) {
            confirmmsg = 'Request Unrealize Voucher : ' + record.get('voucher_no') + ' ?<br><br>Reason<br><textarea type="text" id="reasonrequest" name=reasonrequest></textarea>';
        } else {
            confirmmsg = 'Cancel Request Unrealize Voucher : ' + record.get('voucher_no') + ' ?<br><br>Reason<br><textarea type="text" id="reasonrequest" name=reasonrequest></textarea>';
        }
        Ext.MessageBox.confirm('Confirmation', confirmmsg, function(btn) {
            if (btn == 'yes') {
                var reasonrequest = $('#reasonrequest').val();

                if (mode_request == 1 && reasonrequest == '') {
                    me.tools.alert.warning("Silahkan masukan alasan terlebih dahulu.");
                    return false;
                } else {

                    Ext.Ajax.request({
                        url   : 'cashier/voucher/read',
                        method: 'POST',
                        async : false,
                        params: {
                            kasbank_id: record.get('kasbank_id'),
                            mode_read : 'checkprintqr'
                        },
                        success : function(responseCheck){
                            var dataCheck = Ext.JSON.decode(responseCheck.responseText);
                            console.log(dataCheck);
                            if (dataCheck.data.result == 0 && mode_request == 1) {
                                var checkMsg = '';
                                for (var i = 0; i < dataCheck.data.msg.length; i++) {
                                    checkMsg = checkMsg + dataCheck.data.msg[i].msg + '<br>';
                                }
                                Ext.MessageBox.confirm('Voucher telah dilakukan print Kwitansi', checkMsg + 'Jika dilakukan unrealisasi, maka no receipt akan void dan perlu generate ulang, Lanjutkan ?', function (btnCheck) {
                                    if (btnCheck == 'yes') {
                                        Ext.Ajax.request({
                                            url   : "cashier/voucher/read",
                                            method: "POST",
                                            async : false,
                                            params: {
                                                kasbank_id   : record.get('kasbank_id'),
                                                mode_request : mode_request,
                                                reasonrequest: reasonrequest,
                                                mode_read    : "requestUnrealization"
                                            },
                                            success: function(response) {
                                                var data = Ext.JSON.decode(response.responseText);
                                                if ( data.data.result == 1 ) {
                                                        me.tools.alert.info(data.data.msg);
                                                        me.getGrid().getStore().reload();
                                                }else{
                                                    me.tools.alert.warning(data.data.msg);
                                                    return false;
                                                }
                                            }
                                        });
                                    }
                                });

                            }else{
                                Ext.Ajax.request({
                                    url   : "cashier/voucher/read",
                                    method: "POST",
                                    async : false,
                                    params: {
                                        kasbank_id   : record.get('kasbank_id'),
                                        mode_request : mode_request,
                                        reasonrequest: reasonrequest,
                                        mode_read    : "requestUnrealization"
                                    },
                                    success: function(response) {
                                        var data = Ext.JSON.decode(response.responseText);
                                        if ( data.data.result == 1 ) {
                                                me.tools.alert.info(data.data.msg);
                                                me.getGrid().getStore().reload();
                                        }else{
                                            me.tools.alert.warning(data.data.msg);
                                            return false;
                                        }
                                    }
                                });
                            }
                        }
                    });
                }
            }
        });
    },

    getUserDeletedVa: function(){
        var me, fs, grid, project_id, pt_id;
        me = this;
        fs = me.getFormsearch();
        grid = me.getGrid();
        project_id = fs.down("[name=pt_id]").valueModels[0].data.project_project_id;
        pt_id = fs.down("[name=pt_id]").getValue();
        if (pt_id > 0) {

            Ext.Ajax.request({
                url: "cashier/voucher/read",
                method: "POST",
                async: false,
                params: {
                    project_id: project_id,
                    pt_id: pt_id,
                    mode_read: "getUserDeletedVa"
                },
                success: function(response) {
                    var data = Ext.JSON.decode(response.responseText);


                    if (data.data.result == 1) {
                        me.userDeletedVa = data.data.msg.split(',');
                    } else {
                        me.userDeletedVa = [];
                    }
                    console.log(me.userDeletedVa);
                }
            });
        }
    },

    getDropdownCurrency: function() {
        var me, fd;
        me = this;
        fd = me.getFormdata();
        Ext.Ajax.request({
            url: 'cashier/voucher/read',
            method: 'POST',
            async: false,
            params: {
                mode_read: 'getcurrency'
            },
            success: function(response) {
                var data = Ext.JSON.decode(response.responseText);
                var record = {};
                var tempData = [];
                var element = fd.down("[name=currency_word]");

                for (var i = 0; i < data.data.result.length; i++) {
                    tempData.push(data.data.result[i]);
                }

                var newStore = Ext.create('Ext.data.Store', {
                    fields: ['currency_word'],
                    data: tempData
                });

                element.bindStore(newStore);

            },
            failure: function(error) {
                console.log(error);
            }
        });
    },

    getPtCr: function() {
        var me, fs, grid, project_id, pt_id;
        me = this;
        fs = me.getFormsearch();
        grid = me.getGrid();
        project_id = fs.down("[name=pt_id]").valueModels[0].data.project_project_id;
        pt_id = fs.down("[name=pt_id]").getValue();
        if (pt_id > 0) {

            Ext.Ajax.request({
                url: "cashier/voucher/read",
                method: "POST",
                async: false,
                params: {
                    project_id: project_id,
                    pt_id: pt_id,
                    mode_read: "checkPtCr"
                },
                success: function(response) {
                    var data = Ext.JSON.decode(response.responseText);


                    if (data.data.result == 1) {
                        me.is_pt_cr = 1;
                    } else {
                        me.is_pt_cr = 0;
                    }
                }
            });
        }
    },
    resetPrintKwitansi: function() {
        var me, grid, rec;
        me = this;
        grid = me.getGrid();
        rec = grid.getSelectedRecord();
        Ext.MessageBox.show({
            title: 'Confirmation',
            msg: 'Reset counter print kwitansi (QR) voucher ?',
            buttons: Ext.MessageBox.OKCANCEL,
            fn: function(btn) {
                if (btn == 'ok') {
                    console.log(rec);
                    Ext.Ajax.request({
                        url: 'cashier/voucher/read',
                        method: 'POST',
                        async: false,
                        params: {
                            project_id: me.project_id,
                            pt_id: me.pt_id,
                            kasbank_id: rec.get('kasbank_id'),
                            mode_read: 'resetprintkwitansi',
                        },
                        success: function(response) {
                            var data = Ext.JSON.decode(response.responseText);
                            Ext.Msg.alert('Info', data.data.msg);
                        },
                        failure: function(response) {
                            console.log(response);
                            Ext.Msg.alert('Error', 'Terjadi kesalahan. Silahkan ulangi kembali.');
                        }
                    });
                }
            }
        });
    },
    checkLinkVoucher: function (kasbank_id, project_id, pt_id) {
        var allowed_unrealization = [];
        Ext.Ajax.request({
            url: 'cashier/voucher/read',
            method: 'POST',
            async: false,
            params: {
                kasbank_id: kasbank_id,
                project_id: project_id,
                pt_id: pt_id,
                mode_read: 'checklinkvoucher'
            },
            success: function(response) {
                var data = Ext.JSON.decode(response.responseText);
                allowed_unrealization = data.data
            },
            failure: function(response) {

            }
        });
        return allowed_unrealization;
    },

    checkbudgetcf: function (setupcashflow_id, amount) {
        var me           = this,
            fd           = me.getFormdata(),
            project_id   = fd.down("[name=project_project_id]").getValue(),
            pt_id        = fd.down("[name=pt_pt_id]").getValue(),
            kasbank_date = fd.down("[name=kasbank_date]").getValue(),
            result       = [];

        Ext.Ajax.request({
            url: 'cashier/voucher/read',
            method: 'POST',
            async: false,
            params: {
                project_id      : project_id,
                pt_id           : pt_id,
                setupcashflow_id: setupcashflow_id,
                amount          : amount,
                kasbank_date    : kasbank_date,
                mode_read       : 'checkbudgetcf'
            },
            success: function (response) {
                var data = Ext.JSON.decode(response.responseText);
                result = data.data;
            },
            failure: function(response) {

            }
        });

        return result;
    },

    checkNoKwitansi: function (project_id, pt_id, kasbank_id) {
        var allowed_realization = [];
        Ext.Ajax.request({
            url    : 'cashier/voucher/read',
            method : 'POST',
            async  : false,
            timeout: 45000000,
            params : {
                project_id      : project_id,
                pt_id           : pt_id,
                kasbank_id      : kasbank_id,
                mode_read       : 'checknokwitansi'
            },
            success: function(response) {
                var data                = Ext.JSON.decode(response.responseText);
                    allowed_realization = data.data
            },
            failure: function(response) {

            }
        });
        return allowed_realization;
    },

    beforePrintKwitansi: function (flag) {
        var me   = this,
            grid = me.getGrid(),
            rows = grid.getSelectionModel().getSelection();



        if (rows.length < 1) {
            Ext.Msg.alert('Info', 'No record selected!');
        }else{
            var is_erems = [];
            for (var a = 0; a < rows.length; a++) {
                var data = rows[a].data;

                console.log(data.amount);
                console.log(parseFloat(data.amount_payment));

                if(data.is_erems == 1 && (data.amount != parseFloat(data.amount_payment))){
                    is_erems.push(data.kasbank_id);
                }
            }

            if (is_erems.length > 0) {
                Ext.MessageBox.show({
                    title: 'Confirmation',
                    msg: 'Voucher sharing ?',
                    buttons: Ext.MessageBox.YESNO,
                    fn: function (btn) {
                        if (btn == 'yes') {
                            // JALANKAN PRINT DENGAN NILAI AR
                            me.is_voucher_sharing = 1;
                            switch (flag) {
                                case 'Kwitansi':
                                    me.printKwitansi(flag)
                                    break;
                                case 'Kwitansi RS':
                                    me.printKwitansi(flag)
                                    break;
                                case 'Kwitansi RS Exc':
                                    me.printKwitansi(flag)
                                    break;
                                case 'Kwitansi3Rangkap':
                                    me.printKwitansiRangkap(flag)
                                    break;
                                case 'Kwitansi3RangkapPrePrinted':
                                    me.printKwitansiRangkapPreprinted('Kwitansi3Rangkap')
                                    break;
                                case 'Kwitansi3RangkapWithQR':
                                    me.printKwitansiRangkapWithQr('Kwitansi3RangkapWithQrCode');
                                    break;
                                default:
                                    me.printKwitansi(flag)
                                    break;
                            }
                        }else{
                            switch (flag) {
                                case 'Kwitansi':
                                    me.printKwitansi(flag)
                                    break;
                                case 'Kwitansi RS':
                                    me.printKwitansi(flag)
                                    break;
                                case 'Kwitansi RS Exc':
                                    me.printKwitansi(flag)
                                    break;
                                case 'Kwitansi3Rangkap':
                                    me.printKwitansiRangkap(flag)
                                    break;
                                case 'Kwitansi3RangkapPrePrinted':
                                    me.printKwitansiRangkapPreprinted('Kwitansi3Rangkap')
                                    break;
                                case 'Kwitansi3RangkapWithQR':
                                    me.printKwitansiRangkapWithQr('Kwitansi3RangkapWithQrCode');
                                    break;
                                default:
                                    me.printKwitansi(flag)
                                    break;
                            }
                        }
                    }
                });
            }else{
                switch (flag) {
                    case 'Kwitansi':
                        me.printKwitansi(flag)
                        break;
                    case 'Kwitansi RS':
                        me.printKwitansi(flag)
                        break;
                    case 'Kwitansi RS Exc':
                        me.printKwitansi(flag)
                        break;
                    case 'Kwitansi3Rangkap':
                        me.printKwitansiRangkap(flag)
                        break;
                    case 'Kwitansi3RangkapPrePrinted':
                        me.printKwitansiRangkapPreprinted('Kwitansi3Rangkap')
                        break;
                    case 'Kwitansi3RangkapWithQR':
                        me.printKwitansiRangkapWithQr('Kwitansi3RangkapWithQrCode');
                        break;
                    default:
                        me.printKwitansi(flag)
                        break;
                }
            }
        }
    },

    browseDendaConvert: function(el, cb) {
        var ps;
        var me         = this;
        var f          = me.getFormsearch();
        var pt_pt_id   = f.down("[name=pt_id]").getValue();
        var localstore = 'selectedData';
        var view       = 'PemutihanGrid';
        var browse     = new Cashier.library.BrowseCashier();
        browse.init({
            controller    : me,
            view          : view,
            el            : el,
            localStore    : localstore,
            mode_read     : "datalist",
            bukaFormSearch: true,
            pt            : pt_pt_id
        });
        browse.showWindow(function() {
            Ext.getCmp('ptArId').setValue(pt_pt_id);
        }, function() {
            if (me.pt_id) {
                Ext.getCmp('ptArId').setValue(pt_pt_id);
            }
            Ext.getCmp('btnselectpemutihandenda').setVisible(true);
            Ext.getCmp('ptArId').setValue(pt_pt_id);
        });
    },
    dendaselectionchanges: function() {
        var me = this;
        var g = me.getPemutihangrid();
        var rec = g.getSelectedRecord();
        var c = g.getSelectionModel().getCount();
        if (c === 1) {
            g.down('[action=selectpemutihandenda]').setDisabled(false);
        } else {
            g.down('[action=selectpemutihandenda]').setDisabled(true);
        }
    },
    dendaSelect: function (el) {
        var me    = this,
            grid  = me.getPemutihangrid();
            rec   = grid.getSelectedRecord(),
            count = grid.getSelectionModel().getCount();

        if (count < 1) {
            Ext.Msg.alert('Info', 'No record selected !');
            return;
        }else{
            me.processPemutihanDenda();
            // me.instantWindow('FormPemutihan', 300, 'Pemutihan Denda', 'create', 'myvoucheformpemutihan');
        }
    },
    formPemutihanAfterRender: function (el) {
        var me     = this;
        var grid   = me.getGrid();
        var g      = me.getPemutihangrid();
        var rec    = g.getSelectedRecord();
        var record = grid.getSelectedRecord();
        var f      = me.getFormpemutihan();

        f.down("[name=payment_id]").setValue(rec.get("payment_id"));
        f.down("[name=kasbank_id]").setValue(record.get("kasbank_id"));
        f.down("[name=amount]").setValue(rec.get("total_payment"));
    },
    processPemutihanDenda: function () {
        var me       = this;
        var maingrid = me.getGrid();
        var mainrec  = maingrid.getSelectedRecord();
        var g        = me.getPemutihangrid();
        var rec      = g.getSelectedRecord();
        var f        = me.getFormpemutihan();

        /* console.log(mainrec);
        console.log(rec);
        return; */

        /* var payment_id    = f.down("[name=payment_id]").getValue(),
            kasbank_id    = f.down("[name=kasbank_id]").getValue(),
            total_payment = f.down("[name=amount]").getValue(); */

        var payment_id    = rec.get('payment_id'),
            kasbank_id    = mainrec.get('kasbank_id'),
            total_payment = mainrec.get('amount');


        Ext.MessageBox.show({
            title  : 'Confirmation',
            msg    : 'Anda akan melakukan pengurangan denda, Lanjutkan ?',
            buttons: Ext.MessageBox.YESNO,
            fn     : function (btn) {
                if (btn == 'yes') {
                    Ext.Ajax.request({
                        url   : 'cashier/voucher/read',
                        method: 'POST',
                        async : false,
                        params: {
                            payment_id   : payment_id,
                            kasbank_id   : kasbank_id,
                            total_payment: total_payment,
                            mode_read    : 'prosespemutihan'
                        },
                        success : function (response) {
                            var data = Ext.JSON.decode(response.responseText);
                            if ( data.data.result == 1 ) {
    
                                var messagebox = Ext.Msg.show({
                                    title: 'Info',
                                    msg: data.data.msg,
                                    closable: true
                                });
    
                                Ext.Function.defer(function() {
                                    messagebox.zIndexManager.bringToFront(messagebox);
                                }, 100);
                                Ext.Msg.alert('Warning', data.data.msg).setBodyStyle('z-index: 999999;');
                            }else{
    
                                var messagebox = Ext.Msg.show({
                                    title: 'Failed',
                                    msg: 'Error Occured',
                                    closable: true
                                });
    
                                Ext.Function.defer(function() {
                                    messagebox.zIndexManager.bringToFront(messagebox);
                                }, 100);
                                Ext.Msg.alert('Warning', 'Failed').setBodyStyle('z-index: 999999;');
                                return false;
                            }
                            // f.up("window").close();
                            Ext.getCmp('browsePemutihanGrid').up("window").close();
                            me.getGrid().getStore().reload();
                        }
                    });
                }
            }
        });
    },
    

    getDropdownARtype: function() {
        var me, fd;
        me = this;
        fd = me.getFormdata();
        Ext.Ajax.request({
            url: 'cashier/voucher/read',
            method: 'POST',
            async: false,
            params: {
                mode_read: 'getartype'
            },
            success: function(response) {
                var data = Ext.JSON.decode(response.responseText);
                var record = {};
                var tempData = [];
                var element = fd.down("[name=artype_id]");

                for (var i = 0; i < data.data.result.length; i++) {
                    tempData.push(data.data.result[i]);
                }

                var newStore = Ext.create('Ext.data.Store', {
                    fields: ['artype_id', 'artype'],
                    data: tempData
                });

                element.bindStore(newStore);

            },
            failure: function(error) {
                console.log(error);
            }
        });
    },

    convertUnit: function (el) {
        var me             = this;
        var grid           = me.getGrid();
        var store          = grid.getStore();
        var recgrid        = grid.getSelectedRecord();
        var g              = me.getUnitgrid();
        var kasbank_id     = recgrid.get("kasbank_id");
        var rec            = g.getSelectedRecord();
        var paymentflag_id = 0;

        Ext.Msg.confirm('Confirm', 'Pilihan convert ke.<br /><br /><select id="khspaymentflag_id" class="x-form-field x-form-required-field x-form-text"><option value="1">Voucher Angsuran</option><option value="2">Voucher Denda / Biaya Legal</option><br><br>\n\
                        Anda akan mengubah voucher ini menjadi voucher angsuran sesuai dengan unit yang di pilih, Apakah anda yakin?', function (btn) {
            if (btn == 'yes') {
                paymentflag_id = Ext.get('khspaymentflag_id').getValue();
                g.up("window").mask('Please wait...');
                Ext.Ajax.on('beforeload', function(conn, options) {
                    Ext.getBody().mask('Loading...');
                });
                Ext.Ajax.request({
                    url   : 'cashier/voucher/read',
                    method: 'POST',
                    async : false,
                    params: {
                        kasbank_id       : recgrid.get("kasbank_id"),
                        unit_id          : rec.get("unit_unit_id"),
                        paymentflag_id   : Ext.get('khspaymentflag_id').getValue(),
                        purchaseletter_id: rec.get("purchaseletter_id"),
                        mode_read        : 'converttoangsuran'
                    },
                    success : function (response) {
                        var data = Ext.JSON.decode(response.responseText);
                        store.reload({
                            callback: function () {
                                if (me.getUnitgrid()) {
                                    Ext.getCmp('browseUnitGrid').up("window").unmask();
                                    Ext.getCmp('browseUnitGrid').up("window").close();   
                                }
                                Ext.getBody().unmask();
                            }
                        });
                    },
                    callback: function () {
                        me.is_f7_convert = 1;
                        Ext.Msg.confirm('Info', 'Voucher berhasil di ubah ke '+ (paymentflag_id == 1 ? 'Voucher Angsuran' : 'Voucher Denda / Biaya Legal') +' <b>Silahkan pilih AR</b>', function (btn2) {
                                if (btn2 == 'yes') {
    
                                    var h_grid  = me.getGrid();
                                    var h_store = h_grid.getStore();

                                    h_store.each(function (xc, idx) {
                                        if (xc.get('kasbank_id') == recgrid.get('kasbank_id')) {
                                            h_grid.getSelectionModel().select(idx, true);
                                            $("#WINDOW-mnuVoucher-body #btnEdit").click();
                                    
                                            var localstore    = 'selectedAngsuran';
                                                me.kasbank_id = 0;
                                                me.is_erems   = 0;
                                            var browse        = new Cashier.library.BrowseCashier();
    
                                            browse.init({
                                                controller    : me,
                                                view          : 'AngsuranGrid',
                                                el            : el,
                                                localStore    : localstore,
                                                mode_read     : "selectedangsuran",
                                                bukaFormSearch: true,
                                            });
                                            
                                            browse.showWindow(function() {
                                                if (me.pt_id) {
                                                    Ext.getCmp('ptArIdangsuran').setValue(me.pt_id);
                                                }else{
                                                    Ext.getCmp('ptArIdangsuran').setValue(rec.get('pt_pt_id'));
                                                }
                                                Ext.getCmp('tipeangsuran').setValue('nonkpr');
                                            },
                                            function () {
                                                var cluster = Ext.getCmp('clusterId').getStore();       
                                                cluster.clearFilter();
                                                cluster.filter('cluster_id', rec.get('unit_cluster_id'), true, false);                         
                                                Ext.getCmp('clusterId').setValue(rec.get('unit_cluster_id'));
                                                console.log(cluster);
                                            });
    
                                            var gridar        = me.getAngsurangrid();
                                            var storear       = gridar.getStore();
    
                                            console.log(rec);
                                            console.log(recgrid);
    
                                            Ext.getCmp('unitNumberId').setValue(rec.get('unit_unit_number'));
                                            Ext.getCmp('customerNameId').setValue(rec.get('customer_name'));
                                            Ext.getCmp('unitscheduleAngsuranId').setValue(rec.get('unit_unit_id'));
                                            Ext.getCmp('projectArId').setValue(rec.get('project_project_id'));
                                            Ext.getCmp('ptArIdangsuran').setValue(rec.get('pt_pt_id') ? rec.get('pt_pt_id') : me.pt_id);
                                            Ext.getCmp('clusterId').setValue(rec.get('unit_cluster_id'));
                                            Ext.getCmp('temppayval').setValue(recgrid.get('amount'));
    
                                            if (paymentflag_id == 1) {
                                                Ext.getCmp('isdendacheckboxf7').setValue(0);
                                            }else{
                                                Ext.getCmp('isdendacheckboxf7').setValue(1);
                                            }
    
                                            Ext.getCmp('unitNumberId').setReadOnly(true);
                                            Ext.getCmp('clusterId').setReadOnly(true);
                                            Ext.getCmp('blockId').setReadOnly(true);
                                            Ext.getCmp('purchaseletterNoId').setReadOnly(true);
                                            Ext.getCmp('customerNameId').setReadOnly(true);
                                            Ext.getCmp('ptArIdangsuran').setReadOnly(true);
                                            Ext.getCmp('projectArId').setReadOnly(true);
                                            // Ext.getCmp('temppayval').setReadOnly(true);
                                            // Ext.getCmp('isdendacheckboxf7').setReadOnly(true);
    
                                            var fields = Ext.getCmp('MySuperBrowseWindow').getForm().getFieldValues();
                                            for (var x in fields) {
                                                storear.getProxy().setExtraParam(x, fields[x]);
                                            }
                                            storear.loadPage(1, {
                                                callback: function () {
                                                    me.paymenthelperOnBlur(recgrid.get('amount'), gridar.down("toolbar [name=isdendacheckboxf7]").getValue());
                                                    if (paymentflag_id == 1) {
                                                        me.paymenthelperOnBlur(gridar.down("toolbar [name=temppayval]").getValue(), 0);
                                                    }else{
                                                        me.paymenthelperOnBlur(gridar.down("toolbar [name=temppayval]").getValue(), 1);
                                                    }
                                                }
                                            });
                                        }
                                    });
                            }
                        });
                    }
                });                
            }
        });
    },

    checkProcessVoucher: function (action) {
        var me          = this,
            grid        = me.getGrid(),
            rows        = grid.getSelectionModel().getSelection(),
            result      = [],
            kasbank_ids = '',
            temp        = [];
        
        if (rows.length == 0) {
            result['allowed'] = 0;
            result['msg'] = 'Silahkan pilih voucher terlebih dahulu';
        }else{

            if (rows.length == 1) {
                kasbank_ids = rows[0].data.kasbank_id;
            }else{
                for (let i = 0; i < rows.length; i++) {
                    temp.push(rows[i].data.kasbank_id);
                }
                kasbank_ids = temp.join('~');
            }
    
            Ext.Ajax.request({
                url   : 'cashier/voucher/read',
                method: 'POST',
                async : false,
                params: {
                    kasbank_ids: kasbank_ids,
                    mode_read  : 'checkvalidation'
                },
                success : function (response) {
                    var data    = Ext.JSON.decode(response.responseText);
                    var kasbank = data.data.result;
                    var error   = 0;
                    var msg     = '';
                    var status  = '';
                    for (let i = 0; i < kasbank.length; i++) {
                        switch (action) {
                            case 'payment':
                                if (kasbank[i].status == 'is_posting' || kasbank[i].status == 'is_realized') {
                                    error = error + 1;
                                    msg   = msg + 'Voucher dengan nomor <b>' + kasbank[i].vid + '</b> berstatus ' + (kasbank[i].status == 'is_posting' ? 'posting' : 'realized') + '.<br />';
                                }
                            break;
                            case 'realize':
                                if (kasbank[i].status == 'is_posting') {
                                    error = error + 1;
                                    msg   = msg + 'Voucher dengan nomor <b>' + kasbank[i].vid + '</b> berstatus posting.<br />';
                                }
                            break;
                            case 'posting':
                                if (kasbank[i].status == 'is_posting' || kasbank[i].status == 'is_paid' || kasbank[i].status == '') {
                                    error = error + 1;
                                    msg   = msg + 'Voucher dengan nomor <b>' + kasbank[i].vid + '</b> berstatus ' + (kasbank[i].status == 'is_posting' ? 'posting' : (kasbank[i].status == 'is_paid' ? 'paid' : 'draft')) + '.<br />';
                                }
                            break;
                            case 'unposting':
                                if (kasbank[i].status == 'is_realized' || kasbank[i].status == 'is_paid' || kasbank[i].status == '') {
                                    error = error + 1;
                                    msg   = msg + 'Voucher dengan nomor <b>' + kasbank[i].vid + '</b> berstatus ' + (kasbank[i].status == 'is_realized' ? 'realized' : (kasbank[i].status == 'is_paid' ? 'paid' : 'draft')) + '.<br />';
                                }
                            break;
                            case 'requestunrealize':
                                if (kasbank[i].status == 'is_posting' || kasbank[i].status == 'is_paid' || kasbank[i].status == '') {
                                    error = error + 1;
                                    msg   = msg + 'Voucher dengan nomor <b>' + kasbank[i].vid + '</b> berstatus ' + (kasbank[i].status == 'is_posting' ? 'realized' : (kasbank[i].status == 'is_paid' ? 'paid' : 'draft')) + '.<br />';
                                }
                            break;
                        
                            default:
                            break;
                        }
                    }
                    result['allowed'] = (error > 0 ? 0 : 1);
                    result['msg']     = (error > 0 ? msg + ' Silahkan refresh grid terlebih dahulu.' : '');
                    
                },
                callback: function () {
                }
            });
        }
        console.log(result);
        return result;
    },

    getCoaAR : function (val) {
        var me         = this,
            project_id = val.valueModels[0].data.project_project_id,
            pt_id      = val.valueModels[0].data.pt_id;
            
        
        Ext.Ajax.request({
            url: 'cashier/voucher/read',
            method: 'POST',
            async: false,
            params: {
                project_id: project_id,
                pt_id     : pt_id,
                name      : 'coa_for_AR',
                value     : '1',
                mode_read : 'usedcoaar'
            },
            success: function(response) {
                var data = Ext.JSON.decode(response.responseText);
                if (data.data.result != '') {
                    me.is_coa_ar = data.data.result.replace(' ', '').split(',');   
                }

                console.log(me.is_coa_ar);
                console.log( typeof me.is_coa_ar);

            },
            failure: function(error) {
                console.log(error);
            }
        });
    },

    fillSubReal: function (voucherprefix_id) {
        var me = this,
            f  = me.getFormrealization();

        Ext.Ajax.request({
            url: 'cashier/voucher/read',
            method: 'POST',
            async: false,
            params: {
                voucherprefix_voucherprefix_id: voucherprefix_id,
                mode_read                     : 'getsubglbyvcrprefix'
            },
            success: function(response) {
                var data = Ext.JSON.decode(response.responseText);
                if (data.data.result[0]) {
                    f.down('[name=subgl_code]').setValue(data.data.result[0].code);
                    f.down('[name=subgl_id]').setValue(data.data.result[0].subgl_id);
                }
            },
            failure: function(error) {
                console.log(error);
            }
        });
    }
});