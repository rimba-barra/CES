Ext.define('Erems.controller.PurchaseletterNew', {
    extend: 'Erems.library.template.controller.Controlleralt',
    alias: 'controller.PurchaseletterNew',
    views: ['purchaseletterNew.Panel', 'purchaseletterNew.Grid', 'purchaseletterNew.FormSearch', 'purchaseletterNew.FormData', 'purchaseletterNew.Schedulegrid', 'purchaseletterNew.RescheduleListForm', 'purchaseletterNew.RescheduleFormData', 'purchaseletterNew.FormDataAddSchedule'],
    stores: ['PurchaseletterNew','Masterparameterglobal', 'Unit', 'Purchaseletternewschedulegrid', 'Purchaseletternewreschedulegrid','Masterpencairankomisidetail'],
    models: ['PurchaseletterNew','Masterparameterglobal', 'Unit', 'Purchaseletternewschedulegrid', 'Purchaseletternewreschedulegrid','Masterpencairankomisidetail'],
    requires:['Erems.library.DetailtoolAll', 'Erems.library.box.tools.Tools','Erems.library.box.Config', 'Erems.library.Browse', 'Erems.library.box.tools.Date', 'Erems.library.ScheduleAddAdvance', 'Erems.library.box.tools.DateX'],
    refs: [
        {
            ref: 'grid',
            selector: 'purchaseletterNewgrid'
        },
        {
            ref: 'formsearch',
            selector: 'purchaseletterNewformsearch'
        },
        {
            ref: 'formdata',
            selector: 'purchaseletterNewformdata'
        },
        {
            ref: 'formauth',
            selector: 'purchaseletterNewauthrozieform'
        },
        {
            ref: 'komisigrid',
            selector: 'masterpencairankomisigriddetail'
        },
        {
            ref: 'schedulegrid',
            selector: 'purchaseletterNewschedulegrid'
        },
        {
            ref: 'formrschlist',
            selector: 'purchaseletterNewrschlistform'
        },
        {
            ref: 'formrschform',
            selector: 'purchaseletterNewrschformdata'
        },
        {
            ref: 'rschlistgrid',
            selector: 'purchaseletterNewreschedulegrid'
        },
        {
            ref: 'rschmaingrid',
            selector: 'purchaseletterNewreschmaingrid'
        },
        {
            ref: 'formdataadv',
            selector: 'purchaseletterNewformdataaddschedule'
        },
        {
            ref: 'formprintout',
            selector: 'purchaseletterNewformprintout'
        },
        {
            ref: 'formprintoutpayscheme',
            selector: 'purchaseletterNewformprintoutpayscheme'
        },
    ],
    controllerName: 'purchaseletterNew',
    fieldName: 'purchaseletter_no',
    bindPrefixName:'PurchaseletterNew',
    formWidth: 800,
    tools: null,
    myConfig: null,
    cbf: null,
    mt: null,
    localStore: {
        customer: null
    },
    NOPTKP:0,
    pembulatan1000:false,
    dataOthers:[],
    checkCanSPTDraft : false,
    isPurchaseprintktsim : false,

    countLoadProcess: 0,
    browseHandler: null,
    browseHandlerMulti: {},
    unitFormula: {}, /// unitFormula object,
    processor: null,
    calculator: null,
    sourceMoneyList: null,
    currentPriceType: 0,
    globalParams: null,
    sourceMoneyDefault: {
        id: 0,
        text: ''
    },
    prolibs: null,
    prolibsFile: null,
    calculatorJs: null,
    purchaseletterJs: null,
    isRSCHApproveUser: false,
    templatePrint: null,
    templatePrintPayScheme: null,
    verifikasiDiskonInfo: null,
    puleLunasTandaJadi: false, // flag kalau purchaseletter ini lunas tanda jadi
    useLunasTandaJadi: false, // menggunakan paramter lunas tanda jadi
    validChangeName: false,
    validChangeNameMsg: false,
    isTestNewButtonBrowse: true,
    purchaseAddon: null,
    approveNowRsch: null,
    totalDocumentKtpSim: 0,
    isFlashPrint: false,
    mkProlibFile: null,
    isAuthorizedUser : false,

    arF : {
        'price_harga_jualdasar' : [
            'price_tanahpermeter', 'price_harga_tanah', 'price_bangunanpermeter','price_harga_bangunan'
        ]
        ,'price_harga_neto' : [
            'price_persen_dischargadasar', 'price_harga_dischargadasar', 'price_persen_dischargatanah', 'price_harga_dischargatanah', 'price_persen_dischargabangunan', 'price_harga_dischargabangunan'
        ]
        ,'price_harga_jual' : [
            'price_persen_ppntanah', 'price_harga_ppntanah', 'price_persen_ppnbangunan', 'price_harga_ppnbangunan', 'price_persen_ppnbm', 'price_harga_ppnbm', 'price_persen_pph22', 'price_harga_pph22', 'price_harga_bbnsertifikat', 'price_harga_bphtb', 'price_harga_bajb', 'biaya_pmutu'
        ]
        ,'harga_total_jual' :[
            'biaya_administrasi', 'biaya_paket_tambahan', 'biaya_admsubsidi', 'biaya_asuransi', 'persen_salesdisc', 'harga_salesdisc', 'harga_pembulatan'
        ]
    },
    constructor: function (configs) {
        this.callParent(arguments);
        var me = this;
        this.myConfig = new Erems.library.box.Config({
            _controllerName: me.controllerName
        });
        me.cbf = new Erems.template.ComboBoxFields();
    },
	init: function(application) {
        var me = this;
        var arRead = me.arF;
        me.tools = new Erems.library.box.tools.Tools({config: me.myConfig});
        Ext.Loader.injectScriptElement(document.URL + 'app/erems/library/moment.min.js', function () {
        }, function () {
        });

        if (typeof Mustache === "undefined") {
            Ext.Loader.injectScriptElement(document.URL + 'app/erems/library/mustache.min.js', function () {
                if (typeof ApliJs === "undefined") {
                    Ext.Loader.injectScriptElement(document.URL + 'app/erems/js/ApliJs.js?_=' + new Date().getTime(), function () {
                        console.log("[INFO] ApliJs loaded.");
                    }, function () {
                        // error load file
                    });
                }
            }, function () {
                //  me.tools.alert.warning("Error load Prolibs.js file.");
            });
        }

        this.control({
            'purchaseletterNewpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender
            },
            'purchaseletterNewgrid': {
                // for view spt on grid
                // beforerender: function() {
                //     me.initiateDataDefault(true);
                // },
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange
            },
            'purchaseletterNewgrid toolbar button[action=create]': {
                click: function() {
                    this.formDataShow('create');
                }
            },
            'purchaseletterNewgrid toolbar button[action=update]': {
                click: function() {
                    this.formDataShow('update');
                }
            },
            'purchaseletterNewgrid toolbar button[action=destroy]': {
                click: this.dataDestroyMyPurchase
            },
            'purchaseletterNewformdata': {
                beforerender: this.formDataBeforeRender,
                afterrender: this.formDataAfterRender
            },
            'purchaseletterNewformsearch': {
                afterrender: this.formSearchAfterRender
            },
            'purchaseletterNewgrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                click: this.gridActionColumnClick,
                viewspt : function(view, rowIndex, colIndex, item, e, record, row){                    
                    me.viewsptLive(view);
                }
            },
            'purchaseletterNewformsearch button[action=search]': {
                click: this.dataSearch
            },
            'purchaseletterNewformsearch button[action=reset]': {
                click: this.dataReset
            },
            'purchaseletterNewformdata button[action=save]': {
                click: this.dataSave
            },
            'purchaseletterNewformdata button[action=saveDraft]': {
                click: this.dataSave
            },
            'purchaseletterNewformdata button[action=cancel]': {
                click: this.formDataClose
            },
            'purchaseletterNewformdata button[action=browse_unit]': {
                click: function () {
                    ApliJs.showHtml(me, "browse_unit_modal", {}, 'browse_action');
                }
            },
            'purchaseletterNewformdata button[action=browse_customer]': {
                click: this.browseCustomer
            },
            'purchaseletterNewformdata button[action=create_new_customer]': {
                click: this.addCustomer
            },
            'purchaseletterNewcustomergrid button[action=select]': {
                click: this.customerSelect
            },
            'purchaseletterNewformdata combobox[name=distribution_channel_id]': {
                select: function () {
                    me.reloadKomisiPencairan();
                }
            },
            'purchaseletterNewformdata combobox[name=komisi_pencairan_id]': {
                select: function () {
                    me.reloadGridKomisiPencairan();
                }
            },
            'purchaseletterNewformdata combobox[name=pricelist_id]': {
                select: function () {
                    me.setPricetype();
                }
            },
            'purchaseletterNewformdata combobox[name=pricetype_id]': {
                select: function () {
                    me.setKoefisien();
                }
            },
            'purchaseletterNewformdata combobox[name=koefisien_id]': {
                select: function () {
                    me.fillPriceInformation();
                }
            },
            'purchaseletterNewformdata textfield[name=rencana_serahterima]': {
                keyup: function () {
                    me.rencanaSerahTerimaOnKeyUp();
                }
            },
            'purchaseletterNewformdata numberfield[name=periode_angsuran]': {
                change: function () {
                    me.scheduleGen();
                }
            },
            'purchaseletterNewformdata combobox[name=jenis_periode]': {
                select: function () {
                    me.scheduleGen();
                }
            },
            'purchaseletterNewformdata button[action=authorize]': {
                click: function () {
                    me.showAuthorizeForm();
                }
            },
            'purchaseletterNewauthrozieform button[action=login]': {
                click: function () {
                    me.authLogin();
                }
            },
            'purchaseletterNewrschlistform': {
                afterrender: this.fdarReschList
            },
            'purchaseletterNewrschformdata': {
                afterrender: this.fdarReschForm
            },
            'purchaseletterNewreschedulegrid': {
                itemdblclick: this.rschgridItemDblClick,
            },
            'purchaseletterNewreschedulegrid toolbar button[action=edit]': {
                click: function () {
                    me.rschgridItemDblClick();
                }
            },
            'purchaseletterNewschedulegrid toolbar button[action=reschedule]': {
                click: function () {
                    me.showRescheduleList();
                }
            },
            'purchaseletterNewschedulegrid': {
                afterrender: function () {
                    me.getSchedulegrid().on('edit', function (editor, e) {
                        // commit the changes right after editing finished
                        me.schedulegridDuedateChange(editor, e, me.getFormdata(), me.getSchedulegrid());
                        e.record.commit();
                    });

                }
            },
            'purchaseletterNewreschedulegrid toolbar button[action=create]': {
                click: function () {
                    me.showRescheduleFormData();
                }
            },
            'purchaseletterNewreschedulegrid toolbar button[action=edit]': {
                click: function () {
                    me.rschgridItemDblClick();
                }
            },
            'purchaseletterNewreschedulegrid toolbar button[action=destroy]': {
                click: this.dataDestroyRsch
            },
            'purchaseletterNewreschedulegrid toolbar button[action=approve]': {
                click: this.dataApproveRsch
            },
            'purchaseletterNewrschformdata button[action=save]': {
                click: this.mainDataSaveRsch
            },
            'purchaseletterNewrschformdata textfield[name=rencanaserahterima_month]': {
                keyup: function () {
                    me.rencanaSerahTerimaOnKeyUpRsch();
                }
            },
            'purchaseletterNewreschmaingrid toolbar button[action=create]': {
                click: function () {
                    me.addNewSchedule(me.getFormrschform(), me.getRschmaingrid());
                }
            },
            'purchaseletterNewreschmaingrid toolbar button[action=destroy]': {
                click: function () {
                    me.removeScheduleRsch(me.getFormrschform(), me.getRschmaingrid(), me.getRschlistgrid());
                }
            },
            'purchaseletterNewreschmaingrid toolbar button[action=split]': {
                click: function () {
                    me.splitSchedulePromptRsch();
                }
            },
            'purchaseletterNewreschmaingrid toolbar button[action=add_advance]': {
                click: function () {
                    me.addAdvancRschForm();
                }
            },
            'purchaseletterNewreschmaingrid toolbar button[action=reset]': {
                click: function () {
                    me.getRschmaingrid().getStore().load();
                }
            },
            'purchaseletterNewreschmaingrid': {
                afterrender: function () {
                    me.getRschmaingrid().on('edit', function (editor, e) {
                        var rec = e.record;
                        me.schedulGridOnEdit(editor, e, me.getFormrschform(), me.getRschmaingrid());
                        e.record.commit();
                    });
                },
                selectionchange: function (sm, selected) {
                    if (selected.length > 0) {
                        Ext.Array.each(selected, function (record) {
                            if ((record.get('amount') > record.get('remaining_balance')) && (record.get('remaining_balance') <= 0.0)) {
                                sm.deselect(record, true);
                            }
                        });
                        var record = selected[0];
                        if ((me.tools.floatval(record.get('amount')) > me.tools.floatval(record.get('remaining_balance'))) && (me.tools.floatval(record.get('remaining_balance')) > 0.0)) {
                            me.getRschmaingrid().down("[action=split]").setDisabled(false);
                        } else {
                            me.getRschmaingrid().down("[action=split]").setDisabled(true);
                        }
                    }
                }
            },
            'purchaseletterNewformdataaddschedule button[action=save]': {
                click: function () {
                    me.plsaveFormAdvanceOnClick();
                }
            },
            'purchaseletterNewreschedulegrid button[action=approvenow]': {
                click: function () {
                    me.purcApproveNowReschedule();
                }
            },
            'purchaseletterNewformdata button[action=printout]': {
                click: this.printoutdoc
            },
            'purchaseletterNewformprintout button[action=print]': {
                click: function () {
                    me.formTemplatePrint();
                }
            },
            'purchaseletterNewformdata button[action=printsch]': {
                click: this.printPaymentScheme
            },
            'purchaseletterNewformprintoutpayscheme button[action=print]': {
                click: function () {
                    me.formTemplatePrintPayScheme();
                }
            },
            'purchaseletterNewformdata button[action=setaci]': {
                click: function () {
                    var me;
                    me = this;
                    me.apiAci();
                }
            },
        });
        //for reader price information
        for (var i in arRead) {
            for (var j in arRead[i]){
                this.control('purchaseletterNewformdata textfield[name=' + arRead[i][j] + ']', {
                    blur: function (el) {
                        me.reCalculate();
                    }
                });
            }
        }
    },
    reCalculate:function(){
        var me = this;
        var f = me.getFormdata();
        var arRead = me.arF;
        var keyTotal = [];
        var countMainTotal = 0;

        for (var i in arRead) {
            keyTotal[countMainTotal] = 0;
            for(var j in arRead[i]){
                switch(arRead[i][j]){
                    case 'price_tanahpermeter':
                        var unit_land_size = parseFloat(f.down("[name=unit_land_size]").getValue());
                        var price_tanahpermeter = me.removeKomaTitik(f.down("[name="+arRead[i][j]+"]").getValue());
                        f.down("[name=price_harga_tanah]").setValue(me.fmb(parseFloat(unit_land_size*price_tanahpermeter)));
                        break;
                    case 'price_bangunanpermeter':
                        var unit_building_size = parseFloat(f.down("[name=unit_building_size]").getValue());
                        var price_bangunanpermeter = me.removeKomaTitik(f.down("[name="+arRead[i][j]+"]").getValue());
                        f.down("[name=price_harga_bangunan]").setValue(me.fmb(parseFloat(unit_building_size*price_bangunanpermeter)));
                        break;
                    case 'price_persen_dischargadasar':
                        price_persen_dischargadasar = parseFloat(me.removeKomaTitik(f.down("[name=price_persen_dischargadasar]").getValue()));
                        if(price_persen_dischargadasar > 0){
                            HargaJualDasar = parseFloat(me.removeKomaTitik(f.down("[name=price_harga_jualdasar]").getValue()));
                            price_harga_dischargadasar = HargaJualDasar * (price_persen_dischargadasar/100);
                            f.down("[name=price_harga_dischargadasar]").setValue(me.fmb(price_harga_dischargadasar));
                        }
                        break;
                    case 'price_persen_dischargatanah':
                        price_persen_dischargatanah = parseFloat(me.removeKomaTitik(f.down("[name=price_persen_dischargatanah]").getValue()));
                        if(price_persen_dischargatanah > 0){
                            HargaJualDasar = parseFloat(me.removeKomaTitik(f.down("[name=price_harga_jualdasar]").getValue()));
                            price_harga_dischargatanah = HargaJualDasar * (price_persen_dischargatanah/100);
                            f.down("[name=price_harga_dischargatanah]").setValue(me.fmb(price_harga_dischargatanah));
                        }
                        break;
                    case 'price_persen_dischargabangunan':
                        price_persen_dischargabangunan = parseFloat(me.removeKomaTitik(f.down("[name=price_persen_dischargabangunan]").getValue()));
                        if(price_persen_dischargabangunan > 0){
                            HargaJualDasar = parseFloat(me.removeKomaTitik(f.down("[name=price_harga_jualdasar]").getValue()));
                            price_harga_dischargabangunan = HargaJualDasar * (price_persen_dischargabangunan/100);
                            f.down("[name=price_harga_dischargabangunan]").setValue(me.fmb(price_harga_dischargabangunan));
                        }
                        break;
                    case 'price_persen_ppntanah':
                        var price_harga_tanah = me.removeKomaTitik(f.down("[name=price_harga_tanah]").getValue());
                        var price_persen_ppntanah = me.removeKomaTitik(f.down("[name="+arRead[i][j]+"]").getValue());
                        f.down("[name=price_harga_ppntanah]").setValue(me.fmb(parseFloat(price_harga_tanah*price_persen_ppntanah)/100));
                        break;
                    case 'price_persen_ppnbangunan':
                        var price_harga_bangunan = me.removeKomaTitik(f.down("[name=price_harga_bangunan]").getValue());
                        var price_persen_ppnbangunan = me.removeKomaTitik(f.down("[name="+arRead[i][j]+"]").getValue());
                        f.down("[name=price_harga_ppnbangunan]").setValue(me.fmb(parseFloat(price_harga_bangunan*price_persen_ppnbangunan)/100));
                        break;
                    case 'price_persen_ppnbm':
                        var price_harga_neto = me.removeKomaTitik(f.down("[name=price_harga_neto]").getValue());
                        var price_persen_ppnbm = me.removeKomaTitik(f.down("[name="+arRead[i][j]+"]").getValue());
                        f.down("[name=price_harga_ppnbm]").setValue(me.fmb(parseFloat(price_harga_neto*price_persen_ppnbm)/100));
                        break;
                    case 'price_persen_pph22':
                        var price_harga_neto = me.removeKomaTitik(f.down("[name=price_harga_neto]").getValue());
                        var price_persen_pph22 = me.removeKomaTitik(f.down("[name="+arRead[i][j]+"]").getValue());
                        f.down("[name=price_harga_pph22]").setValue(me.fmb(parseFloat(price_harga_neto*price_persen_pph22)/100));
                        break;
                    case 'persen_salesdisc':
                        break;
                    default:
                        keyTotal[countMainTotal] += parseFloat(me.removeKomaTitik(f.down("[name="+arRead[i][j]+"]").getValue()));
                        break;
                }
            }

            if(i == 'price_harga_neto'){ // part pengurangan discount
                keyTotal[countMainTotal] = keyTotal[countMainTotal]*-1;
            }

            var getSum = keyTotal.reduce(function(a, b){
                return a + b;
            }, 0);
            f.down("[name="+i+"]").setValue(me.fmb(getSum));
            countMainTotal++;
        }

        var unitId = f.down("[name=unit_unit_id]").getValue();
        var pricelistId = f.down("[name=pricelist_id]").getValue();
        var pricetypeId = f.down("[name=pricetype_id]").getValue();
        var koefisienId = f.down("[name=koefisien_id]").getValue();

        var periode_angsuran = f.down("[name=periode_angsuran]").getValue();
        var jenis_periode    = f.down("[name=jenis_periode]").getValue();
        if(periode_angsuran != 0 && jenis_periode != ''){
            me.tools.ajax({
                params: {unit_id:unitId,pricelist_id:pricelistId,pricetype_id:pricetypeId,koefisien_id:koefisienId},
                success: function (data, model) {
                    me.loadScheduleGrid(data);
                }
            }).read('pricelistkoefisieneFill');
        }
    },
    scheduleGen: function () {
        var me = this;
        var f = me.getFormdata();
        var periode_angsuran = f.down("[name=periode_angsuran]").getValue();
        var jenis_periode    = f.down("[name=jenis_periode]").getValue();
        if(periode_angsuran != 0 && jenis_periode != ''){
            var unitId      = f.down("[name=unit_unit_id]").getValue();
            var pricelistId = f.down("[name=pricelist_id]").getValue();
            var pricetypeId = f.down("[name=pricetype_id]").getValue();
            var koefisienId = f.down("[name=koefisien_id]").getValue();
            me.tools.ajax({
                params: {unit_id:unitId,pricelist_id:pricelistId,pricetype_id:pricetypeId,koefisien_id:koefisienId},
                success: function (data, model) {
                    if(data.length > 0){
                        me.loadScheduleGrid(data);
                    }
                }
            }).read('pricelistkoefisieneFill');
        }
    },
    panelAfterRender: function () {
        var me = this;
        ApliJs.gridSelect = {
            'browseUnit': {
                'loadData': function (page, limit, start) {
                    me.apliJsFuncbrowse_unit_modal('purchaseletterNew_browse_unit_modal_ID').loadData(page, limit, start);
                }
            }
        };
    },
    //==== Browse Unit ==========
    apliJsFuncbrowse_unit_modal: function (modalId) {
        var me = this;
        var x = {
            init: function () {
                ApliJs.grid('#' + modalId).initEvent('browseUnit');
            },
            afterRender: function (tpl, params) {
                $('#' + modalId).on('shown.bs.modal', function () {
                    me.apliJsFuncbrowse_unit_modal(modalId).loadData(1, 25, 0);
                });
            },
            loadData: function (page, limit, start) {
                var saya = this;
                $.ajax({
                    method: "POST",
                    url: "erems/purchaseletterNew/read/",
                    data: {start: start, page: page, limit: limit, mode_read: "unitlist", unit_number: $("#" + modalId + " input[name=unit_number]").val()}
                }).done(function (msg) {
                    $("#" + modalId + " button[name=submit_search]").prop('disabled', false);
                    var units = msg["data"];
                    var totalData = msg["total"];
                    var totalPage = 0;
                    if (totalData > 0) {
                        totalPage = Math.ceil(totalData / limit);
                    }
                    var rows = "";
                    var count = (page * limit) - limit + 1;
                    for (var i in units) {
                        rows += "<tr unit_id='" + units[i]["unit_id"] + "'>" +
                                "<td class='general' style='width:30px;'>" + count + "</td>" +
                                "<td style='width:70px;'>" + units[i]["unit_number"] + "</td>" +
                                "<td style='width:70px;'>" + units[i]["cluster_cluster"] + "</td>" +
                                "<td style='width:70px;'>" + units[i]["type_name"] + "</td>" +
                                "<td style='width:70px;'><button class='btn btn-primary btn-sm select_unit' unit_id='" + units[i]["unit_id"] + "'>choose</button></td>" +
                                "</tr>";
                        count++;
                    }
                    $("#plUnitListIdPurchaseletterNew tbody").html(rows);
                    /// update paging info
                    if (units.length > 0) {
                        $("#" + modalId + " .mysuper_paging span.current_page").text(page);
                        $("#" + modalId + " .mysuper_paging span.total_page").text(totalPage);
                        $("#" + modalId + " .mysuper_paging span.total_records").text("Total Record: " + totalData);
                    } else {
                        $("#" + modalId + " .mysuper_paging span.current_page").text(0);
                        $("#" + modalId + " .mysuper_paging span.total_page").text(0);
                        $("#" + modalId + " .mysuper_paging span.total_records").text("Total Record: 0");
                    }
                    // end update paging info
                    $("#plUnitListIdPurchaseletterNew button.select_unit").click(function (event) {
                        event.preventDefault();
                        var unitId = $(this).attr("unit_id");
                        me.unitSelectviaApliPurchaseletterNew(unitId);
                        me.setPricelistCb(unitId);
                        $('#' + modalId).modal('hide');
                    });
                });
            },
        };
        return x;
    },
    unitSelectviaApliPurchaseletterNew: function (unitId) {
        var me = this;
        var f = me.getFormdata();
        f.setLoading("Please wait... Loading Unit Draft");
        $.ajax({
            method: "POST",
            url: "erems/purchaseletterNew/read/",
            data: {mode_read: "unitdetail", unit_id: unitId}
        }).done(function (msg) {
            var units = msg["data"];
            var totalData = msg["totalRow"];
            f.down("[name=unit_unit_id]").setValue(units[0].unit_id);
            f.down("[name=cluster_code]").setValue(units[0].cluster_code);
            f.down("[name=cluster_cluster]").setValue(units[0].cluster_cluster);
            f.down("[name=block_code]").setValue(units[0].block_code);
            f.down("[name=block_block]").setValue(units[0].block_block);
            f.down("[name=productcategory_productcategory]").setValue(units[0].productcategory_productcategory);
            f.down("[name=type_name]").setValue(units[0].type_name);
            f.down("[name=unit_land_size]").setValue(units[0].land_size);
            f.down("[name=unit_long]").setValue(units[0].long);
            f.down("[name=unit_building_size]").setValue(units[0].building_size);
            f.down("[name=unit_width]").setValue(units[0].width);
            f.down("[name=unit_kelebihan]").setValue(units[0].kelebihan);
            f.down("[name=unit_floor]").setValue(units[0].floor);
            f.down("[name=unit_unit_number]").setValue(units[0].unit_number);
            f.down("[name=unitstatus_status]").setValue(units[0].unitstatus_status);
            f.down("[name=unit_progress]").setValue(units[0].progress);
            me.getFormdata().setLoading(false);
        });
    },
    setPricelistCb: function (unitId) {
        var me = this;
        var f = me.getFormdata();
        var pricelistIdCb = f.down("[name=pricelist_id]");
        pricelistIdCb.setValue('');
        var pricetypeIdCb = f.down("[name=pricetype_id]");
        var koefisienIdCb = f.down("[name=koefisien_id]");
        f.setLoading("Please wait... Loading Pricelist");

        me.tools.ajax({
            params: {unit_id:unitId},
            success: function (data, model) {
                me.tools.wesea(data.pricelist, f.down("[name=pricelist_id]")).comboBox();
                f.down("#pricelist_id").setDisabled(false);
                pricetypeIdCb.setValue('');
                koefisienIdCb.setValue('');
                me.clearAllPrice();

                me.getFormdata().setLoading(false);
            }
        }).read('pricelistCb');
    },
    //==== Browse Unit ==========

    //==== Browse Customer ==== 
    browseCustomer: function (el) {
        var me = this;
        var browse = new Erems.library.Browse();
        browse.init({
            controller: me,
            view: 'CustomerGrid',
            el: el,
            localStore: "customer",
            mode_read: "selectedcustomer",
            loadRecordPrefix: "customer",
            browseId: 'unitpl'
        });
        browse.showWindow();
    },
    instantBrowseWindow: function (panel, width, title, state, id) {
        var me = this;
        var formtitle, formicon;
        title = typeof title == 'undefined' ? 'My Window' : title;
        id = typeof id == 'undefined' ? 'myInstantWindow' : id;
        state = typeof state == 'undefined' ? 'create' : state;
        panel = typeof panel == 'undefined' ? 'Panel' : panel;
        width = typeof width == 'undefined' ? 600 : width;
        formtitle = title;
        formicon = 'icon-form-add';
        var winId = id;
        var win = desktop.getWindow(winId);
        if (!win) {
            win = desktop.createWindow({
                id: winId,
                title: formtitle,
                iconCls: formicon,
                resizable: false,
                minimizable: false,
                maximizable: false,
                width: width,
                renderTo: Ext.getBody(),
                constrain: true,
                constrainHeader: false,
                modal: true,
                layout: 'fit',
                shadow: 'frame',
                shadowOffset: 10,
                border: false,
                items: [
                    {
                        xtype: 'panel',
                        height: 300,
                        layout: {
                            type: 'border'
                        },
                        items: [
                            Ext.create('Erems.library.template.view.FormSearchBrowse'),
                            Ext.create('Erems.view.' + me.controllerName + '.' + panel)
                        ]
                    }
                ],
                state: state
            });
        }
        win.show();
    },
    instantStore: function(data) {
        var me = this;
        var model = data.id + 'model';

        var usedUrl = typeof data.url === 'undefined' ? me.controllerName : data.url;
        var idProperty = typeof data.idProperty === 'undefined' ? 'unit_id' : data.idProperty;

        var dE = {
            mode_read: 'all',
            page: 1,
            limit: 25
        };

        if (typeof data.extraParams !== 'undefined') {
            for (var x in data.extraParams) {
                dE[x] = data.extraParams[x];
            }
        }

        Ext.define(model, {
            extend: 'Ext.data.Model',
            fields: [{name: 'example'}]
        });

        var myStore = Ext.create('Ext.data.Store', {
            model: model,
            storeId: data.id,
            url: usedUrl,
            proxy: {
                type: 'ajax',
                actionMethods: {
                    read: 'POST',
                    create: 'POST',
                    update: 'POST',
                    destroy: 'POST'
                },
                api: {
                    read: 'erems/' + usedUrl + '/read',
                    create: 'erems/' + usedUrl + '/create',
                    update: 'erems/' + usedUrl + '/update',
                    destroy: 'erems/' + usedUrl + '/delete'
                },
                reader: {
                    type: 'json',
                    idProperty: idProperty,
                    root: 'data',
                    totalProperty: 'totalRow'
                },
                writer: {
                    type: 'json',
                    encode: true,
                    root: 'data'
                },
                extraParams: dE
            }
        });
        return myStore;
    },
    attachModel: function (operation, store, eraseOld) {
        var me = this;
        var data = Ext.JSON.decode(operation.response.responseText);
        store.model.setFields(data.model);
        store.loadData([], false);
        var eo = typeof eraseOld !== "boolean" ? false : eraseOld;
        store.loadRawData(data.data, eo);
        store.modelExist = true;
    },
    //==== Browse Customer ====

    //==== Add Customer ====
    addCustomer: function () {
        var me = this;
        this.tools.iNeedYou(this).showWindow('Mastercustomer', {title: 'Add New Customer'});
    },
    afterAddNewFromOutside: function (controllerId, info) {
        var me = this;
        var f = me.getFormdata();
        /* get inserted id*/
        if (info) {
            if (info.others) { // check jika inserted id ada
                /// load customer information
                var insertedId = info.others;
                var f = me.getFormdata();
                f.setLoading("Loading customer information...");
                me.tools.ajax({
                    params: {
                        customer_id: insertedId
                    },
                    success: function (data, model) {
                        var data = data[0];
                        if (data) {
                            for (var group in data) {
                                for (var field in data[group]) {
                                    var el = f.down("[name=" + group + "_" + field + "]");
                                    if (el) {
                                        el.setValue(""); 
                                        el.setValue(data[group][field]);
                                    }
                                }
                            }
                        }
                        f.setLoading(false);
                    }
                }).read('selectedcustomer');
            }
        }
        var win = Ext.getCmp(_myAppGlobal.getController(controllerId).formxWinId);
        if (win) {
            win.close();
        }
    },
    customerSelect: function () {
        var me = this;
        if (me.browseHandler) {
            me.browseHandler.selectItem(function (rec) {
                me.attachCustomerInfo(rec);
            });
        }
    },
    attachCustomerInfo: function (rec) {
        var me = this;
        me.getFormdata().down("[name=city_city_name]").setValue(rec.get("city_city_name"));
        me.mt.customerPhoto(me.getFormdata().down("#photo_image"), rec.get("photo"), me.myConfig.IMG_FOLDER);
    },
    //==== Add Customer ====

    //==== combobox komisi ====
    reloadKomisiPencairan: function () {
        var me = this;
        var komisidistributionchannel_id = me.getFormdata().down("[name=distribution_channel_id]").value;
        var form = me.getFormdata();
        var komisiPencairanIdCb = form.down("[name=komisi_pencairan_id]");
        var komg = me.getKomisigrid();
        // var komg = me.getmasterpencairankomisigriddetail
        form.setLoading("Sedang memproses detail komisi...");
        me.tools.ajax({
            params: {komisidistributionchannel_id:komisidistributionchannel_id},
            success: function (data, model) {
                me.tools.wesea(data.komisipencairan, form.down("[name=komisi_pencairan_id]")).comboBox();
                komisiPencairanIdCb.setValue('');
                komg.getStore().removeAll();
                komg.getStore().sync();

                me.getFormdata().setLoading(false);
            }
        }).read('komisiPencairanCb');
    }
    ,reloadGridKomisiPencairan: function () {
        var me = this;
        var komisi_pencairan_id = me.getFormdata().down("[name=komisi_pencairan_id]").value;
        var komg = me.getKomisigrid();
        komg.setLoading("Sedang memproses detail komisi...");
        me.tools.ajax({
            params: {
                komisi_pencairan_detail_id: komisi_pencairan_id
            },
            success: function (schdata, schmodel) {
                me.tools.wesea({
                    data: schdata,
                    model: schmodel
                }, komg).grid();
                komg.setLoading(false);
            }
        }).read('komisiPencairanGrid');
    },
    fillFormComponents: function (data, form) {
        var me = this;
        me.tools.wesea(data.komisidistributionchannel, form.down("[name=distribution_channel_id]")).comboBox();
        me.tools.wesea(data.bank, form.down("[name=bank_bank_id]")).comboBox();
        me.tools.wesea(data.collector, form.down("[name=collector_employee_id]")).comboBox();
        me.tools.wesea(data.rewardtambahan, form.down("[name=rewardtambahan_reward_id]")).comboBox();
        me.tools.wesea(data.rewardcustomer, form.down("[name=rewardcustomer_reward_id]")).comboBox();
        me.tools.wesea(data.rewardsales, form.down("[name=rewardsales_reward_id]")).comboBox();
        me.tools.wesea(data.perhitungankomisi, form.down("[name=perhitungan_komisi_id]")).comboBox();

        me.tools.wesea(data.mediapromotion, form.down("[name=mediapromotion_mediapromotion_id]")).comboBox();
        me.tools.wesea(data.saleslocation, form.down("[name=saleslocation_saleslocation_id]")).comboBox();
        me.tools.wesea(data.purposebuy, form.down("[name=purposebuy_purposebuy_id]")).comboBox();
        me.tools.wesea(data.city, form.down("[name=city_city_name]")).comboBox();
        
        me.dataOthers = data.others;
    },
    //==== combobox komisi ====

    //==== Grid Komisi ====
    formDataPencairanKomisiDetailShow: function (state) {
        var me = this;
        switch (state) {
            case 'create':
                formtitle = 'Create Detail Komisi Pencairan';
                formicon = 'icon-form-add';
                break;
            case 'update':
                formtitle = 'Edit Detail Komisi Pencairan';
                formicon = 'icon-form-edit';
                break;
        }
        var winId = 'win-komisipencairandetailformdata';
        var win = desktop.getWindow(winId);
        if (!win) {
            win = desktop.createWindow({
                id: winId,
                title: formtitle,
                iconCls: formicon,
                resizable: false,
                minimizable: false,
                maximizable: false,
                width: 600,
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
                            win.add(Ext.create('Erems.view.masterpencairankomisi.FormDataDetail'));
                            win.center();
                            win.body.unmask();
                            clearTimeout(tm);
                        }, 1000);
                    },
                }
            });
        }
        win.show();
    },
    //==== Grid Komisi ====
    //==== combobox Pricelist Change ====
    setPricetype: function () {
        var me = this;
        var f = me.getFormdata();
        var unitId = f.down("[name=unit_unit_id]").getValue();
        var pricelistId = f.down("[name=pricelist_id]").getValue();
        var pricetypeIdCb = f.down("[name=pricetype_id]");
        var koefisienIdCb = f.down("[name=koefisien_id]");
        f.setLoading("Please wait... Loading Pricetype");

        me.tools.ajax({
            params: {unit_id:unitId,pricelist_id:pricelistId},
            success: function (data, model) {
                me.tools.wesea(data.pricetype, f.down("[name=pricetype_id]")).comboBox();
                f.down("#pricetype_id").setDisabled(false);
                pricetypeIdCb.setValue('');
                koefisienIdCb.setValue('');
                me.clearAllPrice();
                me.getFormdata().setLoading(false);
            }
        }).read('pricetypeCb');
    },
    //==== combobox Pricelist Change ====
    //==== combobox Pricetype Change ====
    setKoefisien: function () {
        var me = this;
        var f = me.getFormdata();
        var unitId = f.down("[name=unit_unit_id]").getValue();
        var pricelistId = f.down("[name=pricelist_id]").getValue();
        var pricetypeId = f.down("[name=pricetype_id]").getValue();
        var koefisienIdCb = f.down("[name=koefisien_id]");
        f.setLoading("Please wait... Loading Pricetype");

        me.tools.ajax({
            params: {unit_id:unitId,pricelist_id:pricelistId,pricetype_id:pricetypeId},
            success: function (data, model) {
                me.tools.wesea(data.koefisien, f.down("[name=koefisien_id]")).comboBox();
                koefisienIdCb.setValue('');
                me.clearAllPrice();
                f.down("#koefisien_id").setDisabled(false);
                me.getFormdata().setLoading(false);
            }
        }).read('pricelistkoefisieneCb');
    },
    //==== combobox Pricetype Change ====
    //==== combobox Koefisien Change ====
    clearAllPrice:function(){
        var me = this;
        var f = me.getFormdata();
        f.setLoading("Please wait... Clear Price Information");
        var arRead = me.arF;
        for (var i in arRead) {
            for(var j in arRead[i]){
                f.down("[name="+arRead[i][j]+"]").setValue(0);
            }
            f.down("[name="+i+"]").setValue(0);
        }

        var sg = me.getSchedulegrid();
        var storeScheduleGrid  = null;
        storeScheduleGrid = sg.getStore();
        storeScheduleGrid.loadData([], false);

        me.getFormdata().setLoading(false);
    },
    fillPriceInformation: function () {
        var me = this;
        var f = me.getFormdata();
        var unitId = f.down("[name=unit_unit_id]").getValue();
        var pricelistId = f.down("[name=pricelist_id]").getValue();
        var pricetypeId = f.down("[name=pricetype_id]").getValue();
        var koefisienId = f.down("[name=koefisien_id]").getValue();
        f.setLoading("Please wait... Loading Price Information");

        me.tools.ajax({
            params: {unit_id:unitId,pricelist_id:pricelistId,pricetype_id:pricetypeId,koefisien_id:koefisienId},
            success: function (data, model) {
                f.down("[name=price_tanahpermeter]").setValue(me.fmb(data[0]['harga_tanahpermeter']*parseFloat(data[0]['koefisien'])));
                f.down("[name=price_harga_tanah]").setValue(me.fmb(data[0]['total_hargatanah']*parseFloat(data[0]['koefisien'])));
                f.down("[name=price_bangunanpermeter]").setValue(me.fmb(data[0]['harga_bangunanpermeter']*parseFloat(data[0]['koefisien'])));
                f.down("[name=price_harga_bangunan]").setValue(me.fmb(data[0]['total_hargabangunan']*parseFloat(data[0]['koefisien'])));
                f.down("[name=price_harga_jualdasar]").setValue(me.fmb(data[0]['harga_final_netto']));

                if(data[0]['diskonhargadasar_jenis'] == 1){
                    var HargaJualDasar = parseFloat(data[0]['harga_netto']);
                    price_harga_dischargadasar = HargaJualDasar * (parseFloat(data[0]['diskonhargadasar_nilai'])/100);
                    f.down("[name=price_persen_dischargadasar]").setValue(me.fmb(data[0]['diskonhargadasar_nilai']));
                    f.down("[name=price_harga_dischargadasar]").setValue(me.fmb(price_harga_dischargadasar));
                }
                else{
                    f.down("[name=price_harga_dischargadasar]").setValue(me.fmb(data[0]['diskonhargadasar_nilai']));
                }
                if(data[0]['diskonhargatanah_jenis'] == 1){
                    var HargaJualDasar = parseFloat(data[0]['harga_netto']);
                    price_harga_dischargatanah = HargaJualDasar * (parseFloat(data[0]['diskonhargatanah_nilai'])/100);
                    f.down("[name=price_persen_dischargatanah]").setValue(me.fmb(data[0]['diskonhargatanah_nilai']));
                    f.down("[name=price_harga_dischargatanah]").setValue(me.fmb(price_harga_dischargatanah));
                }
                else{
                    f.down("[name=price_harga_dischargatanah]").setValue(me.fmb(data[0]['diskonhargatanah_nilai']));
                }
                if(data[0]['diskonhargabangunan_jenis'] == 1){
                    var HargaJualDasar = parseFloat(data[0]['harga_netto']);
                    price_harga_dischargabangunan = HargaJualDasar * (parseFloat(data[0]['diskonhargabangunan_nilai'])/100);
                    f.down("[name=price_persen_dischargabangunan]").setValue(me.fmb(data[0]['diskonhargabangunan_nilai']));
                    f.down("[name=price_harga_dischargabangunan]").setValue(me.fmb(price_harga_dischargabangunan));
                }
                else{
                    f.down("[name=price_harga_dischargabangunan]").setValue(me.fmb(data[0]['diskonhargabangunan_nilai']));
                }

                f.down("[name=price_persen_ppntanah]").setValue(10);
                f.down("[name=price_persen_ppnbangunan]").setValue(10);

                if(data[0]['bbn_nominal_persen'] == 2){
                    f.down("[name=price_harga_bbnsertifikat]").setValue(me.fmb((parseFloat(data[0]['biaya_bbn'])/100)*parseFloat(data[0]['harga_final_netto'])));    
                }
                else{
                    f.down("[name=price_harga_bbnsertifikat]").setValue(me.fmb(data[0]['biaya_bbn']));
                }
                if(data[0]['bphtb_nominal_persen'] == 2){
                    var CustomBPTHB = parseFloat(data[0]['harga_final_netto'])-parseFloat(me.NOPTKP);
                    biaya_bphtb = CustomBPTHB * (parseFloat(data[0]['biaya_bphtb'])/100);
                    f.down("[name=price_harga_bphtb]").setValue(me.fmb(parseFloat(biaya_bphtb)));    
                }
                else{
                    f.down("[name=price_harga_bphtb]").setValue(me.fmb(data[0]['biaya_bphtb']));
                }
                if(data[0]['ajb_nominal_persen'] == 2){
                    f.down("[name=price_harga_bajb]").setValue(me.fmb((parseFloat(data[0]['biaya_ajb']/100))*parseFloat(data[0]['harga_final_netto'])));    
                }
                else{
                    f.down("[name=price_harga_bajb]").setValue(me.fmb(data[0]['biaya_ajb']));
                }
                if(data[0]['asuransi_nominal_persen'] == 2){
                    f.down("[name=biaya_asuransi]").setValue(me.fmb((parseFloat(data[0]['biaya_asuransi']/100))*parseFloat(data[0]['harga_final_netto'])));    
                }
                else{
                    f.down("[name=biaya_asuransi]").setValue(me.fmb(data[0]['biaya_asuransi']));
                }
                if(data[0]['administrasi_nominal_persen'] == 2){
                    f.down("[name=biaya_administrasi]").setValue(me.fmb((parseFloat(data[0]['biaya_administrasi']/100))*parseFloat(data[0]['harga_final_netto'])));    
                }
                else{
                    f.down("[name=biaya_administrasi]").setValue(me.fmb(data[0]['biaya_administrasi']));
                }

                if(data[0]['admsubsidi_nominal_persen'] == 2){
                    f.down("[name=biaya_admsubsidi]").setValue(me.fmb((parseFloat(data[0]['biaya_admsubsidi']/100))*parseFloat(data[0]['harga_final_netto'])));    
                }
                else{
                    f.down("[name=biaya_admsubsidi]").setValue(me.fmb(data[0]['biaya_admsubsidi']));
                }
                if(data[0]['pmutu_nominal_persen'] == 2){
                    f.down("[name=biaya_pmutu]").setValue(me.fmb((parseFloat(data[0]['biaya_pmutu']/100))*parseFloat(data[0]['harga_final_netto'])));    
                }
                else{
                    f.down("[name=biaya_pmutu]").setValue(me.fmb(data[0]['biaya_pmutu']));
                }
                if(data[0]['paket_tambahan_nominal_persen'] == 2){
                    f.down("[name=biaya_paket_tambahan]").setValue(me.fmb((parseFloat(data[0]['biaya_paket_tambahan']/100))*parseFloat(data[0]['harga_final_netto'])));    
                }
                else{
                    f.down("[name=biaya_paket_tambahan]").setValue(me.fmb(data[0]['biaya_paket_tambahan']));
                }
                
                me.getFormdata().setLoading(false);
                me.reCalculate();
                // me.loadScheduleGrid(data);
            }
        }).read('pricelistkoefisieneFill');
    },
    loadScheduleGrid: function (data) {
        var me = this;
        var f = me.getFormdata();
        var periode_angsuran = f.down("[name=periode_angsuran]").getValue();
        var jenis_periode    = f.down("[name=jenis_periode]").getValue();
        f.setLoading("Please wait... Loading Schedule Information");
        var sg = me.getSchedulegrid();
        var storeScheduleGrid  = null;
        var totalAmountGrid = 0;
        storeScheduleGrid = sg.getStore();
        storeScheduleGrid.loadData([], false);

        var newDate =  me.getFormdata().down("[name=purchase_date]").getValue();
        newDate = me.genRangeSchedue(newDate,periode_angsuran,jenis_periode);

        var arrSourcemoney = ['CUSTOMER'];
        var arrSourcemoneyId = [3];
        if(data[0].sourcemoney !== null){
            arrSourcemoney = data[0].sourcemoney.split("|");
            arrSourcemoneyId = data[0].sourcemoney_id.split("|");
        }
        var harga_total_jual = parseFloat(me.removeKomaTitik(me.getFormdata().down("[name=harga_total_jual]").getValue()));
        var amountTandaJadi = parseFloat(data[0].tandajadi);

        if(data[0].tandajadi_nominal_persen === "2"){
            amountTandaJadi = parseFloat(data[0].tandajadi/100)*harga_total_jual;
        }

        var val = {
            duedate: newDate,
            scheduletype_scheduletype: "TJ",
            scheduletype_scheduletype_id: 4,
            termin: 1,
            remaining_balance: amountTandaJadi,
            sourcemoney_sourcemoney: arrSourcemoney[0],
            sourcemoney_sourcemoneyid: arrSourcemoneyId[0],
            amount: amountTandaJadi,
            persentase_npv:0
        }
        storeScheduleGrid.add(val);

        //TJ in balancing
        totalAmountGrid += parseFloat(amountTandaJadi);
        var harga_total_jual_schedule = harga_total_jual-amountTandaJadi;

        if(data[0].list_koefisiendetail_id !== null){
            var arrKoefisienId = data[0].list_koefisiendetail_id.split(",");
            var arrPersentaseAmount = data[0].persentase_amount.split("|");
            var arrPersentaseNPV = data[0].persentase_npv.split("|");
            var arrScheduletypeId = data[0].scheduletype_id.split("|");
            var arrScheduletype = data[0].scheduletype.split("|");
            var arrTermin = data[0].termin.split("|");
            var AmountSchedule = 0;
            var AmountScheduleBeforeRounding = 0;
            var amountRounding = 0;
            var terminScheduleArray = arrScheduletypeId.reduce((a,b)=> (a[b]=0,a),{});
            terminScheduleArray[4] = 1;

            for (var i = 0; i < arrKoefisienId.length; i++) {
                newDate = me.genRangeSchedue(newDate,periode_angsuran,jenis_periode);
                terminScheduleArray[parseInt(arrScheduletypeId[i])]++;

                //TJ in balancing
                // AmountSchedule = parseFloat(arrPersentaseAmount[i]/100)*harga_total_jual;
                AmountSchedule = parseFloat(arrPersentaseAmount[i]/100)*harga_total_jual_schedule;

                //rounding angka, buang di schedule terakhir
                AmountScheduleBeforeRounding = AmountSchedule;
                if(me.pembulatan1000){
                    AmountSchedule = Math.round(AmountSchedule/1000)*1000;
                }
                else{
                    AmountSchedule = me.tools.floatval(AmountSchedule).toFixed(0);              
                }
                amountRounding += parseFloat(AmountSchedule)-parseFloat(AmountScheduleBeforeRounding);  
                amountRounding.toFixed(0);
                if(i == arrKoefisienId.length-1){
                    if(parseFloat(amountRounding) < 0){
                        amountRounding = Math.floor(Math.abs(amountRounding) * 100) * -1 / 100;
                        AmountSchedule = parseFloat(AmountSchedule)-parseFloat(amountRounding);
                    }
                    else{
                        AmountSchedule = parseFloat(AmountSchedule)-parseFloat(amountRounding);
                    }
                }

                storeScheduleGrid.add({
                    duedate: newDate,
                    scheduletype_scheduletype: arrScheduletype[i],
                    scheduletype_scheduletype_id: arrScheduletypeId[i],
                    termin: terminScheduleArray[parseInt(arrScheduletypeId[i])],//arrTermin[i],
                    remaining_balance: AmountSchedule,
                    sourcemoney_sourcemoney: arrSourcemoney[i],
                    sourcemoney_sourcemoneyid: arrSourcemoneyId[i],
                    amount: AmountSchedule,
                    persentase_npv:arrPersentaseNPV[i]
                });
                totalAmountGrid += parseFloat(AmountSchedule);
            }
        }

        balanceValue = totalAmountGrid - harga_total_jual;
        if (Math.abs(balanceValue) !== 0) {
            me.tools.alert.warning("Sale price total must be equal to schedule amount total");
        }

        f.down("[name=balance_value]").setValue(balanceValue);
        me.getFormdata().setLoading(false);
    },
    //==== combobox Koefisien Change ====
    ///==== duedate change
    schedulegridDuedateChange: function(editor, e, f, g){
        var me = this;
        var nextRec;
        f = e.grid.up("form");
        g = e.grid;
        var currentRec = e.record;
        var editedRow = e.rowIdx;
        var newDate =  e.value;
        var periode_angsuran = f.down("[name=periode_angsuran]").getValue();
        var jenis_periode    = f.down("[name=jenis_periode]").getValue();
        if (e.field === 'duedate') { 
            for(var i = editedRow+1; i < g.getStore().getCount(); i++) {
                nextRec = g.getStore().getAt(i);
                if (nextRec) {
                    newDate = me.genRangeSchedue(newDate,periode_angsuran,jenis_periode);
                    nextRec.beginEdit();
                    nextRec.set({
                        duedate: newDate
                    });
                    nextRec.endEdit();
                }
            }
        }
    },
    ///==== duedate change
    //==== setting date rencana serah terima ====
    rencanaSerahTerimaOnKeyUp: function () {
        var me = this;
        var f = me.getFormdata();
        var bulan = me.tools.intval(f.down("[name=rencana_serahterima]").getValue());
        if (bulan <= 0) {
            f.down("[name=rencana_serahterima_date]").setValue(null);
            return;
        }
        var date = f.down("[name=purchase_date]").getValue();
        var m = me.tools.intval(date.getMonth());
        var y = date.getFullYear();
        m = (m + bulan) + 1;
        var newYear = Math.floor(m / 12);
        var newMonth = m % 12;

        date.setFullYear(y + newYear);
        date.setMonth(newMonth - 1);

        f.down("[name=rencana_serahterima_date]").setValue(date);
    },
    rencanaSerahTerimaOnKeyUpRsch: function () {
        var me = this;
        var f = me.getFormrschform();
        var fm = me.getFormdata();
        var bulan = me.tools.intval(f.down("[name=rencanaserahterima_month]").getValue());
        if (bulan <= 0) {
            f.down("[name=rencanaserahterima_date]").setValue(null);
            return;
        }
        var date = fm.down("[name=purchase_date]").getValue();
        var m = me.tools.intval(date.getMonth());
        var y = date.getFullYear();
        m = (m + bulan) + 1;
        var newYear = Math.floor(m / 12);
        var newMonth = m % 12;

        date.setFullYear(y + newYear);
        date.setMonth(newMonth - 1);

        f.down("[name=rencanaserahterima_date]").setValue(date);
    },
    //==== setting date rencana serah terima ====
    dataDetailDestroy: function () {
        var me = this;
        var rows = me.getGriddetail().getSelectionModel().getSelection();
        if (rows.length < 1) {
            Ext.Msg.alert('Info', 'No record selected !');
            return;
        } else {
            var confirmmsg, successmsg, failmsg;
            var recordcounttext = rows.length + ' record' + (rows.length > 1 ? 's' : '');
            var store = me.getGriddetail().getStore();
            if (rows.length == 1) {
                var selectedRecord = '[' + store.getAt(store.indexOf(rows[0])).get('reff_name') + ']';
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
                        me.getGriddetail().up('window').mask('Deleting data, please wait ...');
                    };
                    for (var i = 0; i < rows.length; i++) {
                        if (rows[i].get('komisi_pencairan_detail_id') == 0) {
                            store.remove(rows[i]);
                        } else {
                            rows[i].set("deleted", 1);
                        }
                    }
                    me.getGriddetail().getStore().filterBy(function (recod) {
                        return recod.data.deleted == 0;
                    });
                }
            });
        }
    },
    //==== Grid Komisi ====
    isSh1Featured: function (params) {
        if (params.data['others'][0][0]['IS_SH1'] === 1) {
            params.form.down("[name=promo]").show();
        }
    },
    isRewardFeatured: function (params) {
        var me = this;
        if (params.data['others'][0][0]['SHOW_REWARD']) {

            params.form.down("#rewardcustomerPanelID").show();
            params.form.down("#rewardsalesPanelID").show();
            params.form.down("#rewardtambahanPanelID").show();
            params.form.down("[name=rewardtambahan_code]").setValue("");
            params.form.down("[name=rewardsales_code]").setValue("");
            params.form.down("[name=rewardcustomer_code]").setValue("");

            me.tools.wesea(params.data.rewardtambahan, params.form.down("[name=rewardtambahan_reward_id]")).comboBox();
            me.tools.wesea(params.data.rewardcustomer, params.form.down("[name=rewardcustomer_reward_id]")).comboBox();
            me.tools.wesea(params.data.rewardsales, params.form.down("[name=rewardsales_reward_id]")).comboBox();

        }
    },
    initiateDataDefault: function(viewsptlive = false){
        var me = this;
        var f = me.getFormdata();

        me.tools.ajax({
            params: {
            },
            success: function (data, model) {
                //fill param
                me.isPurchaseprintktsim   = data['others'][0][0]['IS_PURCHASEPRINTKTPSIM'];
                me.isFlashPrint           = data['others'][0][0]['IS_FLASHPRINT'];
                me.templatePrint          = data['others'][0][0]['TEMPLATEPRINTOUT'];
                me.templatePrintPayScheme = data['others'][0][0]['TEMPLATEPRINTOUTPAYSCHEME'];
                me.approveNowRsch         = data['others'][0][0]['APPROVENOW_RSCH'];
                me.globalParams           = data['others'][0][0]['GLOBALPARAMSPARAMS'];
                me.isAuthorizedUser       = data['others'][0][0]['ISAUTHORIZEDUSER'];
                me.validChangeName        = data['others'][0][0]['DATACHANGENAME'];
                me.validChangeNameMsg     = data['others'][0][0]['DATACHANGENAME_ERR_MSG'];
                me.isRSCHApproveUser      = data['others'][0][0]['RESCHEDULEAPPROVEUSER'];
                me.pembulatan1000         = data['others'][0][0]['pembulatan1000'];
                me.NOPTKP                 = data['others'][0][0]['NOPTKP'];

                if(!viewsptlive){
                    me.fillFormComponents(data, f);
                    f.down("[name=pt_name]").setValue(data['others'][0][0]['PT_NAME']);

                    //SURABAYA ADDON
                    var downlineList = "<option value='0'> - </option>";
                    // var downlines = data["DOWNLINE"][1];
                    var downlines = data["others"][0][0]["DOWNLINE"][1];
                    for (var i in downlines) {
                        downlineList += "<option value='" + downlines[i]["downline_id"] + "'>" + downlines[i]["name"] + "</option>";
                    }

                    var viewParams = {
                        downline_id: 0,
                        keterangan_bayar: '',
                        keterangan_1: '',
                        keterangan_2: '',
                        keterangan_3: '',
                        house_advisor: '',
                        manager: '',
                        hs_keuangan: '',
                        action: 'create',
                        downline_list: downlineList
                    };
                    ApliJs.loadHtmlB(me, me.getFormdata().down("#PLCONotherInformationID"), 'sby_form_add', viewParams);
                    me.getFormdata().down("#PLCONotherInformationID").toggleCollapse(true);

                    var viewParams2 = {
                        test: 0,

                    };
                    ApliJs.loadHtmlB(me, me.getFormdata().down("#PLCONstatusInformationID"), 'sby_form_add_status', viewParams2);
                    me.getFormdata().down("#PLCONstatusInformationID").toggleCollapse(true);

                    //END SURABAYA ADDON

                    me.isSh1Featured({data: data, form: f});
                    me.isRewardFeatured({data: data, form: f});

                    me.discountInput().enable({
                        globalParams: me.globalParams,
                        isReadOnly: true
                    });
                }
            }
        }).read('initiateDataDefault');
    },
    fdar: function() {
        var me = this;
        var f = me.getFormdata();
        var kg = me.getKomisigrid();
        var sg = me.getSchedulegrid();
        me.mt = new Erems.library.ModuleTools();
        
        var x = {
            init: function() {
                /// init here
                f.down("[name=firstpurchase_date]").setReadOnly(true);
                me.initiateDataDefault(false);

                if(apps.subholdingId == 1){
                    f.down("#is_auto_sms").setVisible(true);
                    f.down("#is_not_allowed_sp").setVisible(true);
                }
                if(apps.subholdingId == 2){
                    f.down("#labelbbn").setText("Biaya Balik Nama (TITIPAN)");
                    f.down("#labelbphtb").setText("Biaya perolehan hak (TITIPAN)");
                    f.down("#labelajb").setText("Biaya Akta Jual Beli (TITIPAN)");
                }
                if(apps.subholdingId == 2){
                    f.down("#promo").setVisible(true);
                }

                me.localStore.schType = me.instantStore({
                    id: me.controllerName + 'SchTypeStore',
                    extraParams: {
                        mode_read: 'schtype'
                    },
                    idProperty: 'scheduletype_id'
                });

                return true;
            },
            create: function() {
                // f.down("[action=printsch]").setDisabled(true);
                f.down("[action=printout]").setDisabled(true);
                // f.down("[action=setaci]").setDisabled(true);

                f.down("[name=purchaseletter_no]").setReadOnly(true);
                f.down("[action=save]").setDisabled(false);

                if(me.checkCanSPTDraft){
                    f.down("[action=saveDraft]").setDisabled(false);
                    f.down("#btnSaveDraft").setVisible(true);
                }
            },
            update: function() {
                f.down("button[action=saveDraft]").hide();

                // f.down("[action=setaci]").setDisabled(false);
                var plId = me.getGrid().getSelectedRecord().get("purchaseletter_id");
                var plIsDraft = me.getGrid().getSelectedRecord().get("is_draft");
                var deleted = 0;
                if(plIsDraft){
                    deleted = 1;
                    f.down("[name=purchaseletter_no]").setReadOnly(true);
                }
                f.editedRow = me.getGrid().getSelectedRow();
                // var paymentAmount = 0;
                
                var remainingBalanceTJ = 0;
                // var billingrulesuangmuka = 0;

                f.setLoading("Request purchase letter information...");
                Ext.Ajax.request({
                    url: 'erems/purchaseletterNew/read',
                    params: {
                        mode_read: 'detailOneRead',
                        purchaseletter_id: plId,
                        is_draft: plIsDraft,
                        deleted:deleted
                    },
                    success: function (response) {
                        data = JSON.parse(response.responseText);
                        delete data[1][0]["RowNum"];

                        // if(me.isFlashPrint) {
                        //     f.down("[action=flashprint]").show();
                        // }
                        var schG = me.getSchedulegrid();

                        me.sourceMoneyList = data.sourcemoney;
                        
                        if(!plIsDraft){
                            f.down("button[action=browse_unit]").setDisabled(true);
                            f.down("button[action=browse_customer]").setDisabled(true);
                            sg.down("[action=reschedule]").show();
                        }

                        var ada = me.getGrid();
                        var store = ada.getStore();
                        var record = store.getAt(store.indexOf(ada.getSelectionModel().getSelection()[0]));
                        var row = record.data;
                        // if (record.get('api_aci') === 1) {
                        //     f.down("[name=apiaci]").setText("Non ACI");
                        // } else {
                        //     f.down("[name=apiaci]").setText("Set ACI");
                        // }

                        //fill form
                        me.totalDocumentKtpSim = data[1][0]['customer_totaldocument_ktpsim'];
                        var vs = me.getFormdata().getForm().getValues();
                        delete vs.pt_name;
                        for (var i in vs) {
                            var elx = me.getFormdata().down("[name=" + i + "]");
                            if (elx) {
                                switch(elx.getXType()){
                                    case 'xmoneyfield':
                                        elx.setRawValue(me.fmb(data[1][0][i]));
                                        break;
                                    case 'datefield':
                                        elx.setValue(new Date(data[1][0][i]));
                                        break;
                                    default:
                                        elx.setRawValue(data[1][0][i]);
                                        break;
                                }
                            }
                        }

                        var el = null;
                        for (var i in data[1][0]) {
                            el = f.down("[name=" + i + "]");
                            if (el) {
                                if(el.getValue() == null){
                                    el.setValue(data[1][0][i]);
                                }
                                if(!plIsDraft){
                                    el.setReadOnly(true);
                                }
                            }
                            el = null;
                        }

                        //for combobox that reload dynamicly
                        var arCombo = ['komisi_pencairan_id','pricelist_id','pricetype_id','koefisien_id'];
                        arCombo.forEach(function (i, index) {
                            switch(i){
                                case 'komisi_pencairan_id':
                                    f.setLoading("Request Komisi Pencairan information...");
                                    komisidistributionchannel_id = f.down("[name=distribution_channel_id]").value;
                                    komisi_pencairan_id = parseInt(data[1][0][i]);
                                    me.tools.ajax({
                                        params: {komisidistributionchannel_id:komisidistributionchannel_id},
                                        success: function (data, model) {
                                            me.tools.wesea(data.komisipencairan, f.down("[name=komisi_pencairan_id]")).comboBox();
                                            f.down("[name=komisi_pencairan_id]").setValue(komisi_pencairan_id);
                                            f.setLoading(false);
                                        }
                                    }).read('komisiPencairanCb');
                                    break;
                                case 'pricelist_id':
                                    f.setLoading("Please wait... Loading Pricelist");
                                    unitId = f.down("[name=unit_unit_id]").value;
                                    pricelist_id = parseInt(data[1][0][i]);
                                    me.tools.ajax({
                                        params: {unit_id:unitId},
                                        success: function (data, model) {
                                            me.tools.wesea(data.pricelist, f.down("[name=pricelist_id]")).comboBox();
                                            f.down("#pricelist_id").setDisabled(false);
                                            f.down("[name=pricelist_id]").setValue(pricelist_id);
                                            f.setLoading(false);
                                        }
                                    }).read('pricelistCb');
                                    break;
                                case 'pricetype_id':
                                    f.setLoading("Please wait... Loading Pricetype");
                                    var unitId = f.down("[name=unit_unit_id]").getValue();
                                    var pricelistId = f.down("[name=pricelist_id]").getValue();
                                    var pricetypeIdCb = parseInt(data[1][0][i]);
                                    me.tools.ajax({
                                        params: {unit_id:unitId,pricelist_id:pricelistId},
                                        success: function (data, model) {
                                            me.tools.wesea(data.pricetype, f.down("[name=pricetype_id]")).comboBox();
                                            f.down("#pricetype_id").setDisabled(false);
                                            f.down("[name=pricetype_id]").setValue(pricetypeIdCb);
                                            f.setLoading(false);
                                        }
                                    }).read('pricetypeCb');
                                    break;
                                case 'koefisien_id':
                                    f.setLoading("Please wait... Loading Pricetype");
                                    var unitId = f.down("[name=unit_unit_id]").getValue();
                                    var pricelistId = f.down("[name=pricelist_id]").getValue();
                                    var pricetypeId = f.down("[name=pricetype_id]").getValue();
                                    var koefisienIdCb = parseInt(data[1][0][i]);
                                    me.tools.ajax({
                                        params: {unit_id:unitId,pricelist_id:pricelistId,pricetype_id:pricetypeId},
                                        success: function (data, model) {
                                            me.tools.wesea(data.koefisien, f.down("[name=koefisien_id]")).comboBox();
                                            f.down("#koefisien_id").setDisabled(false);
                                            f.down("[name=koefisien_id]").setValue(koefisienIdCb);
                                            me.getFormdata().setLoading(false);
                                        }
                                    }).read('pricelistkoefisieneCb');
                                    break;
                                default:
                                    // el.setValue(data[1][0][i]);
                                    break;
                            }
                        });
                        //for combobox that reload dynamicly
                        
                        me.mt.customerPhoto(f.down("#photo_image"), data[1][0]["customer_photo"], me.myConfig.IMG_FOLDER);

                        me.tools.fillComboCode(f, me.cbf.bank, "bank");

                        // paymentAmount = me.tools.floatval(data[1][0]["payment_payment"]);
                        // billingrulesuangmuka = me.tools.floatval(data[1][0]["billingrules_uangmuka"]);
                        // jika payment == 0 , maka bisa edit sebagian informasi
                        // if (paymentAmount === 0) {
                        //     f.down("#btnSave").setDisabled(false);
                        //     if(me.checkCanSPTDraft && data[1][0]["is_draft"]){
                        //         f.down("#btnSaveDraft").setDisabled(false);
                        //     }
                        //     var ar = [
                        //         'salesman_employee_id',
                        //         'clubcitra_member',
                        //         'citraclub_citraclub_id',
                        //         'saleslocation_saleslocation_id',
                        //         'mediapromotion_mediapromotion_id',
                        //         'upline_upline_id',
                        //         'cac_cac_id',
                        //         'is_upline_referall',
                        //         'is_cac_referall'];
                        //     var si = f.down("#salesInformationID");
                        //     for (var i in ar) {
                        //         f.down("[name=" + ar[i] + "]").setReadOnly(false);
                        //     }
                        // }
                        // jika payment == 0 , maka bisa edit sebagian informasi

                        f.down("[name=customer_customer_id]").setValue(data[1][0]["customer_id"]);
                        f.down("[name=customer_code]").setValue(data[1][0]["customer_id"]);
                        if(!plIsDraft){
                            f.down("[name=pricetype_id]").setDisabled(false);
                            f.down("[name=pricetype_id]").setReadOnly(true);
                            f.down("[name=is_auto_sms]").setReadOnly(false);
                            f.down("[name=is_not_allowed_sp]").setReadOnly(false);

                            /// masking jika statusnya cancel
                            var isCancel = me.tools.intval(data[1][0]["is_cancel"]);
                            if (isCancel > 0) {
                                f.down("[action=save]").setDisabled(true);
                                f.down("[action=saveDraft]").setDisabled(true);
                                f.down("[action=printout]").setDisabled(true);
                                // f.down("[action=printsch]").setDisabled(true);
                                f.down("[name=unitstatus_status]").setValue("CANCEL");
                            }
                            // masking jika statusnya cancel
                            
                            var pl_revision = me.dataOthers[0][0]['PLREVISION_SUPERVISOR'];
                            if (pl_revision) {
                                f.down("[action=save]").setDisabled(false);
                               // f.down("[action=save]").show();
                                f.down("[name=customer_KTP_address]").setReadOnly(false);
                                // f.down("[name=salesman_employee_id]").setReadOnly(false);
                                f.down("[name=rewardsales_reward_id]").setReadOnly(false);
                                f.down("[name=rewardtambahan_reward_id]").setReadOnly(false);
                                f.down("[name=bank_bank_id]").setReadOnly(false);
                                f.down("[name=rencana_serahterima_date]").setReadOnly(false);
                                f.down("[name=unit_virtualaccount_bca]").setReadOnly(false);
                                f.down("[name=unit_virtualaccount_mandiri]").setReadOnly(false);
                                f.down("[name=rewardcustomer_reward_id]").setReadOnly(false);
                                // f.down("[name=clubcitra_member]").setReadOnly(false);
                                // f.down("[name=citraclub_citraclub_id]").setReadOnly(false);
                                // f.down("[name=upline_upline_id]").setReadOnly(false);
                                // f.down("[name=is_cac_referall]").setReadOnly(false);
                                // f.down("[name=cac_cac_id]").setReadOnly(false);
                                // f.down("[name=is_upline_referall]").setReadOnly(false);
                                // f.down("[name=saleslocation_saleslocation_id]").setReadOnly(false);
                                // f.down("[name=mediapromotion_mediapromotion_id]").setReadOnly(false);
                                f.down("[name=notes]").setReadOnly(false);
                                f.down("[name=rencana_serahterima]").setReadOnly(false);
                                f.down("[name=promo]").setReadOnly(false);
                            }

                            /// kalau supervisor, maka bisa edit sales information dan note -- addon 2017-03-09
                            var isSupervisor = me.dataOthers[0][0]['ISSUPERVISOR'];
                            if (isSupervisor) {
                                // f.down("[name=salesman_employee_id]").setReadOnly(false);
                                // f.down("[name=clubcitra_member]").setReadOnly(false);
                                // f.down("[name=citraclub_citraclub_id]").setReadOnly(false);
                                // f.down("[name=upline_upline_id]").setReadOnly(false);
                                // f.down("[name=is_cac_referall]").setReadOnly(false);
                                // f.down("[name=cac_cac_id]").setReadOnly(false);
                                // f.down("[name=is_upline_referall]").setReadOnly(false);
                                // f.down("[name=saleslocation_saleslocation_id]").setReadOnly(false);
                                // f.down("[name=mediapromotion_mediapromotion_id]").setReadOnly(false);
                                f.down("[name=notes]").setReadOnly(false);
                                f.down("[name=rencana_serahterima]").setReadOnly(false);
                                f.down("[name=promo]").setReadOnly(false);
                            }
                            // addon 20170608
                            f.down("[name=customer_address]").setReadOnly(false);
                            f.down("[name=city_city_name]").setReadOnly(false);
                            f.down("[name=customer_zipcode]").setReadOnly(false);
                            f.down("[name=customer_home_phone]").setReadOnly(false);
                            f.down("[name=customer_mobile_phone]").setReadOnly(false);
                            f.down("[name=customer_office_phone]").setReadOnly(false);
                            f.down("[name=customer_fax]").setReadOnly(false);
                            f.down("[name=customer_KTP_number]").setReadOnly(false);
                            f.down("[name=customer_NPWP]").setReadOnly(false);
                            f.down("[name=customer_NPWP_address]").setReadOnly(false);
                            f.down("[name=customer_email]").setReadOnly(false);
                            f.down("[name=is_repeat_order]").setReadOnly(false);
                            if (me.isAuthorizedUser) {
                                f.down("[name=customer_KTP_address]").setReadOnly(false);
                            }
                            if(apps.gid == 7){
                                f.down("#rewardcustomerPanelID").setVisible(true);
                                f.down("[name=rewardcustomer_reward_id]").setReadOnly(false);
                            }
                        }

                        f.setLoading("Request schedule information...");
                        me.tools.ajax({
                            params: {
                                purchaseletter_id: plId
                            },
                            success: function (schdata, schmodel) {
                                me.tools.wesea({
                                    data: schdata,
                                    model: schmodel
                                }, sg).grid();

                                /* authroize button*/
                                if (me.getTotalPayment() > 0) {
                                    if (!me.isAuthorizedUser) {
                                        // f.down("button[action=authorize]").show();
                                        f.down("#btnSave").setDisabled(true);
                                        f.down("#btnSaveDraft").setDisabled(true);
                                    } else {
                                        f.down("#btnSave").setDisabled(false);
                                        if(me.checkCanSPTDraft && data[1][0]["is_draft"]){
                                            f.down("#btnSaveDraft").setDisabled(false);
                                            f.down("#btnSaveDraft").setVisible(true);
                                        }
                                        // f.down("button[action=authorize]").hide();
                                    }
                                } else {
                                    f.down("#btnSave").setDisabled(false);
                                    if(me.checkCanSPTDraft && data[1][0]["is_draft"]){
                                        f.down("#btnSaveDraft").setDisabled(false);
                                    }
                                    // f.down("button[action=authorize]").hide();
                                }
                                /* authroize button*/
                                
                                if(me.checkCanSPTDraft && data[1][0]["is_draft"]){
                                    f.down("#btnSaveDraft").setVisible(true);
                                    f.down("#btnSaveDraft").setDisabled(false);
                                }

                                var gs = me.getSchedulegrid();
                                me.balanceCalculate(me.getFormdata(), gs);
                                // kondisi-konidisi di schedule grid
                                if(!plIsDraft){
                                    f.down("[name=purchaseletter_no]").setReadOnly(me.tools.intval(me.globalParams.PURCHASELETTER_ENABLE_EDITNUMBER) === 1 ? false : true);
                                }
                                var useLunasTandaJadi = me.tools.intval(me.globalParams.PURCHASELETTER_PRINT_LUNASTANDAJADI);
                                me.useLunasTandaJadi = useLunasTandaJadi;
                                var tempVs = me.getFormdata().getValues();
                                var lunasUM1 = false;
                                /// tanda jadi lunas atau belum
                                if (useLunasTandaJadi === 1) {
                                    me.puleLunasTandaJadi = false;
                                    var totalTandaJadi = 0;
                                    for (var i = 0; i < gs.getStore().getCount(); i++) {
                                        if (gs.getStore().getAt(i).get("scheduletype_scheduletype") === "TJ") {
                                            remainingBalanceTJ = remainingBalanceTJ+me.tools.floatval(gs.getStore().getAt(i).get("remaining_balance"));
                                            totalTandaJadi++;
                                            if (me.tools.floatval(gs.getStore().getAt(i).get("remaining_balance")) === 0) {
                                                me.puleLunasTandaJadi = true;
                                                break;
                                            }
                                        } else if (gs.getStore().getAt(i).get("scheduletype_scheduletype") === "INH") {
                                            if (me.tools.floatval(gs.getStore().getAt(i).get("remaining_balance")) === 0 && i === 0) {
                                                me.puleLunasTandaJadi = true;
                                                break;
                                            }
                                        }
                                        if (gs.getStore().getAt(i).get("scheduletype_scheduletype") === "UM") {
                                            if (me.tools.floatval(gs.getStore().getAt(i).get("remaining_balance")) === 0 && i === 0) {
                                                lunasUM1 = true;
                                            }
                                        }
                                    }
                                    /// Kalau cara bayarnya CASH dan tidak ada tandajadi, maka dianggap lunas tanda jadi
                                    if (tempVs.pricetype_pricetype_id === 1 && totalTandaJadi === 0) {
                                        me.puleLunasTandaJadi = true;
                                    }
                                    if (tempVs.pricetype_pricetype_id === 3 && totalTandaJadi === 0 && lunasUM1) {
                                        me.puleLunasTandaJadi = true;
                                    }
                                    // if(remainingBalanceTJ >0){
                                    //     f.down("button[action=flashprint]").setDisabled(false);
                                    // }
                                    f.down("[action=printout]").setDisabled(false);
                                } else {
                                    f.down("[action=printout]").setDisabled(false);
                                }
                                me.getSchedulegrid().addListener('beforeedit', function () {
                                    return false;
                                });

                                f.setLoading(false);
                            }
                        }).read('detailScheduleOneRead');

                        kg.setLoading("Sedang memproses detail komisi...");
                        me.tools.ajax({
                            params: {
                                purchaseletter_id: plId
                            },
                            success: function (schdata, schmodel) {
                                me.tools.wesea({
                                    data: schdata,
                                    model: schmodel
                                }, kg).grid();
                                kg.setLoading(false);
                            }
                        }).read('detailKomisiOneRead');
                    }
                });
            }
        };
        return x;
    },
    balanceCalculate: function (f, g) {
        var me = this;
        var totalJual = me.removeKomaTitik(f.down("[name=harga_total_jual]").getValue());
        var s = g.getStore();
        var totalSch = 0;
        s.each(function (rec) {
            // if(parseInt(rec.get("scheduletype_scheduletype_id")) == 4) return;
            var x = me.tools.floatval(rec.get("amount")).toFixed(2);
            totalSch += me.tools.floatval(x);
        });
        var balance = (me.tools.floatval(totalJual).toFixed(2) - me.tools.floatval(totalSch).toFixed(2));
        f.down("[name=balance_value]").setValue(balance);
    },
    getTotalPayment: function () {
        var pay = 0;
        var me = this;
        var plRec = me.getGrid().getSelectedRecord();
        var t = me.tools;
        if (plRec) {
            pay = t.floatval(plRec.get("total_payment"));
        }
        return pay;
    },
    discountInput: function () {
        var me = this;
        var f = me.getFormdata();
        var x = {
            getFields: function () {
                var fields = ["price_persen_dischargadasar", "price_harga_dischargadasar",
                    "price_persen_dischargatanah", "price_harga_dischargatanah",
                    "price_persen_dischargabangunan", "price_harga_dischargabangunan"];
                return fields;
            },
            enable: function (params) {

                var isEnable = me.tools.intval(params.globalParams.PURCHASELETTER_ENABLE_DISCOUNT_APPROVAL);
                var fields = this.getFields();
                if (isEnable) {
                    /// disable first
                    for (var i in fields) {
                        f.down("[name=" + fields[i] + "]").setReadOnly(params.isReadOnly);
                    }
                }
            }
        };
        return x;
    },
    gridSelectionChange: function() {
        var me = this;
        var grid = me.getGrid(), row = grid.getSelectionModel().getSelection();
        var edit = grid.down('#btnEdit');
        var deleteb = grid.down('#btnDelete');

        if(typeof row[0] !== 'undefined'){
            is_draft = row[0].data.is_draft;
        }
        if (edit !== null) {
            edit.setVisible(true);
            edit.setDisabled(row.length != 1);
        }
        if (deleteb !== null) {
            deleteb.setDisabled(row.length < 1);
        }
    },
    gridAfterRender: function (configs) {
        this.callParent(arguments);
        var me = this;

        var total_payment, nodes, node, record, i, view;
        var cells, actioncolumngrid, eventdata, action, acpdf;

        grid = me.getGrid();
        grid.store.on('load', function (store, records, options) {
            me.jqueryBinding();

            view = configs.view;
            nodes = view.getNodes();
            for (i = 0; i < nodes.length; i++) {
                node = nodes[i];
                record = view.getRecord(node);
                total_payment = record.get('total_payment');
                cells = Ext.get(node).query('td');
                actioncolumngrid = cells[2];
                eventdata = Ext.get(actioncolumngrid).select("div")['elements'][0];
                action = eventdata.childNodes;
                acpdf = action[0];
                // if(total_payment < 1 || typeof total_payment == 'undefined'){
                //     acpdf.remove();
                        // continue;
                // }

                // if (me.useLunasTandaJadi) {
                //     if (!me.puleLunasTandaJadi) {
                //         acpdf.remove();
                //         continue;
                //     }
                // }
                // if (!me.validChangeName) {
                //         acpdf.remove();
                //         continue;
                // }
                // if (me.isPurchaseprintktsim) {
                //     if (me.tools.intval(me.totalDocumentKtpSim) <= 0) {
                //         acpdf.remove();
                //         continue;
                //     }
                // }
            }
        });
        me.getGrid().down("pagingtoolbar").getStore().reload();

        grid.down('#btnEdit').setVisible(true);
        grid.down('#btnDelete').setVisible(true);

        me.tools.ajax({
            params: {},
            success: function (data) {
                me.checkCanSPTDraft = data.checkCanSPTDraft;
                if(!data.checkCanSPTDraft){    
                    search = me.getFormsearch();
                    search.down('#btnCheckDraft').setVisible(false);
                }
                grid.down('#btnNew').setDisabled(false);
                me.checkCanSPTDraft = data['checkCanSPTDraft'];
            }
        }).read('detailGenco');
    },
    jqueryBinding: function () {
        var me = this;
        //inlineEdit
        me.checkboxInlineEdit('is_auto_sms');
        me.checkboxInlineEdit('is_not_allowed_sp');
    },
    checkboxInlineEdit: function (name) {
        var me = this;
        $("input[name='" + name + "']").change(function (event) {
            val = $(this).is(":checked") ? 1 : 0;
            purchaseletter_id = $(this).attr('data');
            var p = me.getPanel();
            p.setLoading("Please wait");
            me.tools.ajax({
                params: {id: purchaseletter_id, collumn: name, value: val},
                success: function (data) {
                    p.setLoading(false);
                }
            }).read('inlineEdit');
        });
    },

    getActiveForm: function() {
        return this.activeForm;
    },
    formDataBeforeRender: function (el) {
        var me = this;
        me.fdar().init();
    },
    formDataAfterRender: function(el) {

        var me = this;
        me.storeProcess = me.createSpProcessObj(me.storeProcess);

        // me.loadComboBoxStore(el);
        var state = el.up('window').state;
        if (state == 'create') {
            me.fdar().create();
        } else if (state == 'update') {
            me.fdar().update();
        }
    },
    // ============== simpan data dengan ekstrator sendiri,
    getInvalidFields: function() {
        var me = this;
        var form = me.getFormdata().getForm();
        var invalidFields = [];
        Ext.suspendLayouts();
        form.getFields().filterBy(function(field) {
            if (field.validate()) return;
            invalidFields.push(field);
        });
        Ext.resumeLayouts(true);
        return invalidFields;
    },
    dataSave: function (btn) {
        var me = this;

        var f = me.getFormdata();
        var form = f.getForm();

        f.setLoading("Please wait... Saving on process");
        if (form.isValid()) {
            var KomisiStore = me.getKomisigrid().getStore();
            var dataKomisi = [];
            KomisiStore.each(function (record, idx) {
                dataKomisi.push(record.data);
            });

            var ScheduleStore = me.getSchedulegrid().getStore();
            var dataSchedule = [];
            ScheduleStore.each(function (record, idx) {
                dataSchedule.push(record.data);
            });

            var empty = ['', null, 0];
            if(empty.includes(f.down('[name=unit_unit_id]').getValue())){
                f.setLoading(false);
                me.tools.alert.warning("Unit tidak boleh kosong. Silahkan pilih unit dahulu.");
                return;
            }
            else if(dataKomisi.length == 0){
                f.setLoading(false);
                me.tools.alert.warning("Detail Penerima Komisi tidak boleh kosong. Silahkan isi terlebih dahulu.");
                return;
            }
            else if(dataSchedule.length == 0){
                f.setLoading(false);
                me.tools.alert.warning("Schedule pembayaran tidak boleh kosong. Silahkan isi terlebih dahulu.");
                return;
            }
            else{
                myObj = Ext.encode(form.getValues());
                myObjParse = JSON.parse(myObj);
                
                myObjParse["dataKomisi"]   = dataKomisi;
                myObjParse["dataSchedule"] = dataSchedule;
                myObjParse['is_draft']     = 0;
                myObjParse['deleted']      = 0;
                myObjParse["deletedRows"]  = "";

                if(btn.action == 'saveDraft'){
                    myObjParse['is_draft'] = 1;
                    myObjParse['deleted'] = 1;
                }

                Ext.Ajax.timeout = 60000*30;
                myObj = JSON.stringify(myObjParse);
                Ext.Ajax.request({
                    url: 'erems/purchaseletterNew/create',
                    params: {
                        data: Ext.encode(myObj)
                    },
                    success: function (response) {
                        me.getFormdata().up('window').body.unmask();
                        f.setLoading(false);
                        if (Ext.decode(response.responseText).success == true)
                        {
                            Ext.Msg.show({
                                title: 'Success',
                                msg: 'Data saved successfully.',
                                icon: Ext.Msg.INFO,
                                buttons: Ext.Msg.OK,
                                fn: function () {
                                    me.getFormdata().up('window').close();
                                    var gridDepan = me.getGrid();
                                    var storeDepan = gridDepan.getStore();
                                    storeDepan.reload();
                                }
                            });
                        }
                        else {
                            Ext.Msg.show({
                                title: 'Failure',
                                msg: 'Error: Unable to save data.',
                                icon: Ext.Msg.ERROR,
                                buttons: Ext.Msg.OK
                            });
                        }
                    },
                });  
            }
        }
        else{
            fieldNames = [];                
            fields = me.getInvalidFields();
            for(var i=0; i <  fields.length; i++){
                field = fields[i];
                fieldNames.push(field.getFieldLabel());
            }
            f.setLoading(false);
            me.tools.alert.warning("Field "+fieldNames.join(', ')+" masih kosong. Silahkan isi terlebih dahulu.");
            return;
        }
    },
    dataDestroyMyPurchase: function () {
        var me = this;
        var g = me.getGrid();
        g.setLoading("Please wait...");
        var rec = me.getGrid().getSelectedRecord();

        Ext.Ajax.request({
            url: 'erems/purchaseletterNew/read',
            params: {
                mode_read: 'checkauthorize',
                purchase_date: rec.get("purchase_date")
            },
            success: function (response) {
                data = JSON.parse(response.responseText);
                g.setLoading(false);
                var authorized = data[0]['ISAUTHORIZEDUSER'];
                var validClosing = data[0]['VALIDASITGLCLOSING'];

                if (validClosing['HASIL']) {
                    if (authorized) {
                        me.dataDestroyIntern();
                    } else {
                        var pay = me.getTotalPayment();
                        if (pay === 0) {
                            me.dataDestroyIntern();
                        } else {
                            me.showAuthorizeForm('delete');
                        }
                    }
                } else {
                    me.tools.alert.warning(validClosing.MSG);
                }
            }
        });
    },
    dataDestroyIntern: function () {
        var me = this;
        var rows = me.getGrid().getSelectionModel().getSelection();
        if (rows.length < 1) {
            Ext.Msg.alert('Info', 'No record selected !');
            return;
        } else {
            var confirmmsg, successmsg, failmsg;
            var recordcounttext = rows.length + ' record' + (rows.length > 1 ? 's' : '');
            var store = me.getGrid().getStore();

            if (rows.length == 1) {
                var selectedRecord = '[' + store.getAt(store.indexOf(rows[0])).get(me.fieldName) + ']';
                if(store.getAt(store.indexOf(rows[0])).get('is_draft')){
                    selectedRecord = '[' + store.getAt(store.indexOf(rows[0])).get('unit_unit_number') + ']';
                }
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
                    var selectedRecord = '';
                    if (rows.length == 1) {
                        selectedRecord = '[' + store.getAt(store.indexOf(rows[0])).get(me.fieldName) + ']';
                        if(store.getAt(store.indexOf(rows[0])).get('is_draft')){
                            selectedRecord = '[' + store.getAt(store.indexOf(rows[0])).get('unit_unit_number') + ']';
                        }
                    }
                    var recordcounttext = rows.length + ' record' + (rows.length > 1 ? 's' : '');
                    for (var i = 0; i < rows.length; i++) {
                        store.remove(rows[i]);
                    }
                    store.on('beforesync', msg);
                    store.sync({
                        success: function (s) {
                            me.getGrid().up('window').unmask();
                            var successcount = parseInt(Ext.decode(s.operations[0].response.responseText).total[0].result, 10);
                            var successmsg = (rows.length == 1 ? selectedRecord : (successcount != rows.length ? successcount + ' of ' : '') + recordcounttext) + ' deleted successfully.';
                            store.un('beforesync', msg);
                            store.reload();
                            /*  if (typeof Ext.StoreManager.lookup(me.stores[0]) != 'undefined') {
                             Ext.StoreManager.lookup(me.stores[0]).load({params: {limit: 0}});
                             }*/
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
                                msg: failmsg + ' The data may have been used.',
                                icon: Ext.Msg.ERROR,
                                buttons: Ext.Msg.OK
                            });
                        }
                    });
                }
            });
        }
    },
    showAuthorizeForm: function (state) {
        var me = this;
        var s = state ? state : 'edit';
        me.instantWindow('AuthorizeForm', 500, 'Authorize User Login', s, 'myAuthWindow');
    },
    authLogin: function () {
        var me = this;
        var f = me.getFormauth();
        f.setLoading("Log in...");
        me.tools.ajax({
            params: {
                a: f.down("[name=username]").getValue(),
                b: f.down("[name=password]").getValue()
            },
            success: function (data, model) {
                var loginObj = data['others'][0][0];
                var loginStatus = loginObj['LOGINSUCCESS'];
                me.afterDoAuth(loginStatus, f.up("window").state, loginObj['LOGINMSG']);
            }
        }).read('authlogin');
    },
    afterDoAuth: function (loginStatus, state, msg) {
        var me = this;
        var f = me.getFormauth();
        switch (state) {
            case 'edit':
                if (!loginStatus) {
                    f.setLoading(false);
                    me.tools.alert.error(msg);

                } else {
                    f.up("window").close();
                    // me.getFormdata().down("button[action=authorize]").hide();
                    me.getFormdata().down("#btnSave").setDisabled(false);

                    me.tools.ajax({
                        params: {},
                        success: function (data, model) {
                            if(data['others'][0][0]['checkCanSPTDraft']){    
                                me.getFormdata().down("#btnSaveDraft").setDisabled(false);
                                me.getFormdata().down("#btnSaveDraft").setVisible(true);
                            }
                        }
                    }).read('detail');
                    f.setLoading(false);
                }

                break;
            case 'delete':
                if (!loginStatus) {
                    f.setLoading(false);
                    me.tools.alert.error(msg);

                } else {
                    f.setLoading(false);
                    f.up("window").close();
                    me.dataDestroyIntern();
                }
                break;
        }
    },
    fdarReschList: function () {
        var me = this;
        var f = me.getFormrschlist();
        var g = me.getRschlistgrid();

        var plId = me.getFormdata().down("[name=purchaseletter_id]").getValue();
        f.down("[name=purchaseletter_purchaseletter_id]").setValue(plId);
        g.doInit();
        f.setLoading("Please wait...");
        g.getStore().load({
            params: {
                purchaseletter_id: plId
            },
            callback: function (rec, op) {
                g.attachModel(op);
                f.setLoading(false);
                g.getStore().getProxy().setExtraParam('purchaseletter_id', plId);
            }
        });
    },
    fdarReschForm: function () {
        var me = this;
        var f = me.getFormrschform();
        var g = me.getRschmaingrid();
        var s = f.up('window').state;
        g.doInit();
        f.down("[name=harga_total_jual]").setValue(me.removeKomaTitik(me.getFormdata().down("[name=harga_total_jual]").getValue()));
        // f.setLoading("Please wait...");
        /// khusus untuk yang sudah terbayar tidak bisa edit row
        g.addListener('beforeedit', function (a, b) {
            if (me.tools.floatval(b.record.data.amount) > me.tools.floatval(b.record.data.remaining_balance)) {
                return false;
            }
        });
        if (s === 'update') {
            var pg = me.getRschlistgrid();
            var rec = pg.getSelectedRecord();
            var id = rec.get('reschedule_id');

            f.loadRecord(rec);
            f.editedRow = pg.getSelectedRow();
            f.down("[name=reschedule_id]").setValue(id);
            if (rec.get("is_approve")) {
                f.down("[action=save]").hide();
            }
            g.getStore().load({
                params: {
                    data_type: 'reschedule',
                    reschedule_id: id
                },
                callback: function (rec, op) {
                    g.attachModel(op);
                    g.getStore().getProxy().setExtraParam('reschedule_id', id);
                    g.getStore().getProxy().setExtraParam('data_type', 'reschedule');
                    // f.setLoading(false);
                    /// add is_pay flag
                    g.getStore().each(function (rec) {
                        if (rec != null) {
                            if (rec.data.amount > rec.data.remaining_balance) {
                                rec.beginEdit();
                                rec.set({
                                    is_pay: 1
                                });
                            }
                        }
                    });
                }
            });
        } else {
            g.getStore().load({
                params: {
                    data_type: 'purchaseletter',
                    purchaseletter_id: me.getFormdata().down("[name=purchaseletter_id]").getValue()
                },
                callback: function (rec, op) {
                    g.attachModel(op);
                    g.getStore().getProxy().setExtraParam('purchaseletter_id', me.getFormdata().down("[name=purchaseletter_id]").getValue());
                    g.getStore().getProxy().setExtraParam('data_type', 'purchaseletter');
                    //  f.setLoading(false);
                    /// add is_pay flag
                    g.getStore().each(function (rec) {
                        if (rec != null) {
                            if (me.removeKomaTitik(rec.data.amount) > me.removeKomaTitik(rec.data.remaining_balance)) {
                                rec.beginEdit();
                                rec.set({
                                    is_pay: 1
                                });
                            }
                        }
                    });
                }
            });
        }
    },
    showRescheduleList: function () {
        var me = this;
        var s = 'create';
        me.instantWindow('RescheduleListForm', 700, 'Reschedule List', s, 'myReschWindow');
        var g = me.getRschlistgrid();

        if (me.isRSCHApproveUser) {
            g.down("[action=approve]").show();
        } else {
            if (me.approveNowRsch) {
                g.down("[action=approvenow]").show();
            }
        }
    },
    showRescheduleFormData: function (state) {
        var me = this;
        var s = state ? state : 'create';
        me.instantWindow('RescheduleFormData', 700, 'Reschedule', s, 'myReschFdWindow');
        var f = me.getFormrschform();
        var fm = me.getFormdata();
        f.down("[name=rencanaserahterima_date]").setValue(fm.down("[name=rencana_serahterima_date]").getValue());
        f.down("[name=rencanaserahterima_month]").setValue(fm.down("[name=rencana_serahterima]").getValue());
    },
    mainDataSaveRsch: function () {
        var me = this;
        /// added 4 maret 2015
        // check nilai total editan di grid sama dengan total harga jual
        var f = me.getFormrschform();
        var g = me.getRschmaingrid();
        var balanceValue = me.removeKomaTitik(f.down("[name=balance_value]").getValue());
        if (balanceValue < 0 || balanceValue > 0) {
            me.tools.alert.warning("Sale price total must be equal to schedule amount total");
            return;
        }
        if (g.getStore().getCount() < 1) {
            me.tools.alert.warning("Please create schedule first");
            return;
        }
        /// cek total schedule dengan total jual
        var totalSchedule = 0;
        for (var i = 0; i < g.getStore().getCount(); i++) {
            // if(parseInt(g.getStore().getAt(i).get("scheduletype_scheduletype_id")) == 4) continue;
            totalSchedule += parseFloat(g.getStore().getAt(i).get("amount"));
        }

        balanceValue = totalSchedule - me.removeKomaTitik(me.getFormdata().down("[name=harga_total_jual]").getValue());
        if (Math.abs(balanceValue) > 0) {
            me.tools.alert.warning("Sale price total must be equal to schedule amount total");
            f.down("[name=balance_value]").setValue(balanceValue);
            return;
        }

        var ScheduleStore = me.getRschmaingrid().getStore();
        var dataSchedule = [];
        ScheduleStore.each(function (record, idx) {
            dataSchedule.push(record.data);
        });

        myObj = Ext.encode(f.getValues());
        myObjParse = JSON.parse(myObj);

        myObjParse["purchaseletter_purchaseletter_id"] = me.getFormdata().down("[name=purchaseletter_id]").getValue();
        myObjParse["dataSchedule"] = dataSchedule;
        if (f.editedRow > -1) {
            myObjParse["deletedRows"] = me.getRschlistgrid().getStore().getAt(f.editedRow).get("deletedRows");
        }

        Ext.Ajax.timeout = 60000*30;
        myObj = JSON.stringify(myObjParse);
        Ext.Ajax.request({
            url: 'erems/purchaseletterNew/read',
            params: {
                mode_read: 'reschedule_create',
                data: Ext.encode(myObj)
            },
            success: function (response) {
                me.getFormdata().up('window').body.unmask();
                if (Ext.decode(response.responseText).success == true)
                {
                    Ext.Msg.show({
                        title: 'Success',
                        msg: 'Data saved successfully.',
                        icon: Ext.Msg.INFO,
                        buttons: Ext.Msg.OK,
                        fn: function () {
                            // me.getFormdata().up('window').close();
                            // var gridDepan = me.getGrid();
                            // var storeDepan = gridDepan.getStore();
                            // storeDepan.reload();
                            me.getRschlistgrid().getStore().loadPage(1);
                            f.up("window").close();
                        }
                    });
                }
                else {
                    Ext.Msg.show({
                        title: 'Failure',
                        msg: 'Error: Unable to save data.',
                        icon: Ext.Msg.ERROR,
                        buttons: Ext.Msg.OK
                    });
                }
            },
        });
    },
    addNewSchedule: function (f, g) {
        var me = this;
        var s = g.getStore();
        var totalRecord = s.getCount();
        var lastRec = s.getAt(totalRecord - 1);
        ///////// count date
        var myDate = new Erems.library.box.tools.Date({
            date: lastRec ? lastRec.get('duedate') : me.getFormdata().down("[name=purchase_date]").getValue()
        });
        var newDate = myDate.addMonth(1);
        ////////// end count date
        s.add({
            duedate                     : newDate,
            scheduletype_scheduletype   : lastRec ? lastRec.get('scheduletype_scheduletype') : null,
            scheduletype_scheduletype_id: lastRec ? lastRec.get('scheduletype_scheduletype_id') : null,
            termin                      : lastRec ? (me.tools.intval(lastRec.get('termin')) + 1) : 1,
            remaining_balance           : 0,
            sourcemoney_sourcemoney     : lastRec ? lastRec.get('sourcemoney_sourcemoney') : null,
            sourcemoney_sourcemoneyid   : lastRec ? lastRec.get('sourcemoney_sourcemoneyid') : null,
            amount                      : 0
        });

        // bisa add schedule di antara tagihan2 lama
        var sm = g.getSelectionModel();
        if (sm.hasSelection()) {
            var selc = sm.getSelection();
            var lastSelectedIndex = s.findExact('schedule_id', selc[selc.length - 1].get("schedule_id"));
            var count = 0;
            var totalRecord = s.getCount();
            for (var i = totalRecord - 1; i > 0; i--) {
                if (i > lastSelectedIndex && i !== totalRecord - 1) {
                    var recNext = s.getAt(i + 1);  // copy schedule ke row berikutnya
                    var rec = s.getAt(i);
                    var tmyDate = new Erems.library.box.tools.Date({
                        date: rec.get("duedate")
                    });
                    var tnewDate = tmyDate.addMonth(1);
                    var termin = rec.get('scheduletype_scheduletype') == selc[selc.length - 1].get("scheduletype_scheduletype") ? me.tools.intval(rec.get('termin')) + 1 : rec.get('termin');
                    recNext.beginEdit();
                    recNext.set({
                        duedate                     : tnewDate,
                        scheduletype_scheduletype   : rec.get('scheduletype_scheduletype'),
                        scheduletype_scheduletype_id: rec.get('scheduletype_scheduletype_id'),
                        termin                      : termin,
                        remaining_balance           : rec.get('remaining_balance'),
                        sourcemoney_sourcemoney     : rec.get('sourcemoney_sourcemoney'),
                        sourcemoney_sourcemoneyid   : rec.get('sourcemoney_sourcemoneyid'),
                        amount                      : rec.get('amount')
                    });
                    recNext.endEdit();
                }
            }
            /// row baru
            var rec = s.getAt(lastSelectedIndex + 1);
            rec.beginEdit();
            rec.set({
                remaining_balance: 0,
                amount: 0
            });
            rec.endEdit();
            g.getSelectionModel().select(lastSelectedIndex + 1);
        } else {
            g.getSelectionModel().select((s.getCount()) - 1);
        }
        me.balanceCalculate(f, g);
    },
    removeScheduleRsch: function (f, g, mainGrid) {
        var me = this;
        var sm = g.getSelectionModel();
        if (sm.hasSelection()) {
            var selc = sm.getSelection();
            for (var i in selc) {
                var id = me.tools.intval(selc[i].get("schedule_id"));
                if (me.tools.intval(selc[i].get("is_pay")) === 0) {
                    if (id > 0 && f.editedRow > -1) {
                        me.tools.gridHelper(mainGrid).maindetailUpdateDeletedRows(f, selc[i].get("schedule_id"));
                    }
                    g.getStore().remove(selc[i]);
                    me.balanceCalculate(f, g);
                }
            }
        }
    },
    schedulGridOnEdit: function (editor, e, f, g) {
        var me = this;
        f = e.grid.up("form");
        g = e.grid;

        var currentRec = e.record;
        // for field amount
        if (e.field === 'amount') {
            if (me.tools.intval(currentRec.get('is_pay')) == 1) {
                return;
            }
            var totalJual = me.tools.money(f).removeKomaTitik(f.down("[name=harga_total_jual]").getValue());
            var s = g.getStore();
            var totalSch = 0;
            s.each(function (rec) {
                // if(parseInt(rec.get("scheduletype_scheduletype_id")) == 4) return;
                totalSch += me.tools.floatval(rec.get("amount"));
            });
            var balance = (totalJual - totalSch);
            if (f.down("[name=balance_value]")) {
                f.down("[name=balance_value]").setValue(balance);
            }
            currentRec.beginEdit();
            currentRec.set({
                remaining_balance: e.value
            });
            currentRec.endEdit();
            /// added 4 Maret 2015
            /// update billing rules
            var currentScheduleType = currentRec.get("scheduletype_scheduletype");
            var totalAmountByST = 0;
            var totalAmountByTandaJadi = 0;
            s.each(function (rec) {
                if (rec.get("scheduletype_scheduletype") === currentScheduleType) {
                    totalAmountByST += me.tools.floatval(rec.get("amount"));
                }
                if (rec.get("scheduletype_scheduletype") === "TJ") {
                    totalAmountByTandaJadi += me.tools.floatval(rec.get("amount"));
                }
            });

            if (g.xtype === 'purchaseletterNewschedulegrid') {
                switch (currentScheduleType) {
                    case 'UM':
                        var temp = window[me.prolibsFile].getUangMukaSchGridToBilRules(totalAmountByST, totalAmountByTandaJadi);
                        // f.down("[name=billingrules_uangmuka]").setValue(accounting.formatMoney(totalAmountByST));
                        f.down("[name=billingrules_uangmuka]").setValue(accounting.formatMoney(temp));
                        break;
                    case 'TJ':
                        f.down("[name=billingrules_tandajadi]").setValue(accounting.formatMoney(totalAmountByST));
                        break;
                    default:
                        f.down("[name=billingrules_angsuran]").setValue(accounting.formatMoney(totalAmountByST));
                        break;
                }
            }
            // add balance to last record in schedule
            var lastRec = s.getAt(s.getCount() - 1);
            var lastRecValue = lastRec.get('amount');
            lastRecValue = me.tools.floatval(lastRecValue) + me.tools.floatval(balance);
            if (lastRec) {
                lastRec.beginEdit();
                lastRec.set({
                    amount: lastRecValue,
                    remaining_balance: lastRecValue
                });
                lastRec.endEdit();
            }
            me.balanceCalculate(f, g);
        } else if (e.field === 'sourcemoney_sourcemoney') {
            var c = editor.editors.items[0].items.items[0];
            if (!c) {
                return;
            }
            var idx = c.getStore().findExact('sourcemoney', c.getValue());
            if (idx < 0) {
                return;
            }
            var rec = c.getStore().getAt(idx);
            if (rec) {
                currentRec.beginEdit();
                currentRec.set({
                    sourcemoney_sourcemoney_id: rec.get('sourcemoney_id')
                });
                currentRec.endEdit();
            }
        }
    },
    rschgridItemDblClick: function () {
        var me = this;
        var g = me.getRschlistgrid();
        var rec = g.getSelectedRecord();
        if (rec) {
            me.showRescheduleFormData('update');
        }
    },
    addAdvancRschForm: function () {
        var me = this;
        me.instantWindow('FormDataAddSchedule', 400, 'Schedule Advance', "create", 'myAddSchAdvWindow');
        me.tools.ajax({
            params: {},
            success: function (data, model) {
                me.tools.wesea(data.scheduletype, me.getFormdataadv().down("[name=help_tipe]")).comboBox();
            }
        }).read('scheduleadvanceinit');

    },
    plsaveFormAdvanceOnClick: function () {
        var me = this;
        var f = me.getFormdataadv();
        var vs = f.getValues();
        var g = me.getRschmaingrid();

        var schAdvance = new Erems.library.ScheduleAddAdvance();
        schAdvance.proses(this, f, g);

        g.getSelectionModel().select((g.getStore().getCount()) - 1);
        f.up("window").close();
        // me.balanceCalculate(me, params, f, g);
    },
    purcApproveNowReschedule: function () {
        var me = this;

        var rec = me.getRschlistgrid().getSelectedRecord();
        if (me.purchaseAddon && rec) {
            if (!rec.get("is_approve")) {
                var pd = moment(me.purchaseAddon);
                var rd = moment(rec.get("Addon"));
                var selisih = Math.abs(pd.diff(rd, "days"));
                if (selisih === 0) {
                    me.dataApproveRsch();
                } else {
                    me.tools.alert.warning("Tidak bisa approve sekarang. Tanggal pembuatan purchaseletter tidak sama dengan tanggal pembuatan reschedule. Silahkan menunggu approval dari Manager Markting Anda.");
                }
            }
        }
    },
    dataApproveRsch: function () {
        var me = this;
        var g = me.getRschlistgrid();

        if (g.getSelectionModel().hasSelection()) {
            var f = me.getFormrschlist();
            var recs = g.getSelectionModel().getSelection();
            recs = recs[0];
            Ext.Msg.show({
                title: 'Approve?',
                msg: 'Are you sure to approve this reschedule?',
                buttons: Ext.Msg.YESNOCANCEL,
                icon: Ext.Msg.QUESTION,
                fn: function (clicked) {
                    if (clicked === "yes") {
                        f.setLoading("Please wait.. replace old schedule with the new one");
                        Ext.Ajax.request({
                            url: 'erems/purchaseletterNew/read',
                            params: {
                                mode_read: 'approvereschedule',
                                reschedule_id: recs.get('reschedule_id')
                            },
                            success: function (response) {
                                data = JSON.parse(response.responseText);
                                var hasil = data['success'];
                                if (hasil) {
                                    me.tools.alert.info("Success");
                                    me.getFormdata().down("[name=rencana_serahterima]").setValue(recs.get('rencanaserahterima_month'));
                                    me.getFormdata().down("[name=rencana_serahterima_date]").setValue(recs.get('rencanaserahterima_date'));
                                    g.getStore().loadPage(1);
                                } else {
                                    me.tools.alert.warning("Error when processing your request");
                                }
                                f.setLoading(false);
                            }
                        });
                    }
                }
            });
        }
    },
    dataDestroyRsch: function () {
        var me = this;
        var g = me.getRschlistgrid();

        if (g.getSelectionModel().hasSelection()) {
            var f = me.getFormrschlist();
            var recs = g.getSelectionModel().getSelection();
            var ids = '';
            for (var i in recs) {
                ids += recs[i].get('reschedule_id') + '~';
            }
            f.setLoading("Please wait...");

            Ext.Ajax.request({
                url: 'erems/purchaseletterNew/read',
                params: {
                    mode_read: 'deletereschedule',
                    data: ids
                },
                success: function (response) {
                    data = JSON.parse(response.responseText);
                    var hasil = data['success'];
                    if (hasil) {
                        me.tools.alert.info("Deleted");

                        g.getStore().loadPage(1);
                    } else {
                        me.tools.alert.warning("Something error when deleting your data");
                    }
                    f.setLoading(false);
                }
            });
        }
    },
    printoutdoc: function () {
        var me = this;
        var warningLunasTJ = "Tanda Jadi Belum Lunas ! ";
        if (me.isFlashPrint) {
            warningLunasTJ = "Tanda Jadi Belum Lunas ! ";
        } else {
            warningLunasTJ = "Tanda Jadi Belum Lunas ! ";
        }
        if (me.useLunasTandaJadi) {
            if (!me.puleLunasTandaJadi) {
                me.tools.alert.warning(warningLunasTJ);
                return;
            }
        }
        if (!me.validChangeName) {
            me.tools.alert.warning(me.validChangeNameMsg);
            return;
        }
        if (me.isPurchaseprintktsim) {
            if (me.tools.intval(me.totalDocumentKtpSim) <= 0) {
                me.tools.alert.warning("Dokumen KTP / SIM belum di upload.");
                return;
            }
        }
        me.showPrintSPTWindow();
    },
    showPrintSPTWindow: function () {
        var me = this;
        me.instantWindow('FormPrintout', 500, 'Select Template', "mysuperstate", 'myPrintoutWindow');
        var f = me.getFormprintout();
        var el = f.down("[name=template_name]");

        for (var i in me.templatePrint) {
            el.add({
                xtype: 'radiofield',
                boxLabel: me.templatePrint[i].text,
                name: 'template',
                inputValue: me.templatePrint[i].value,
                checked: i == 0 ? true : false
            });
        }
    },
    formTemplatePrint: function () {
        var me = this;
        var f = me.getFormprintout();
        var vs = f.getValues();
        var tpl = vs.template;
        if (!tpl) {
            me.tools.alert.warning("Invalid template printout.");
            return;
        }
        f.up("window").close();
        var me = this;
        var p = me.getFormdata();
        p.setLoading("Please wait...");
        Ext.Ajax.request({
            url: 'erems/purchaseletterNew/read',
            params: {
                mode_read: 'printout',
                purchaseletter_id: p.down("[name=purchaseletter_id]").getValue(),
                template: tpl
            },
            success: function (response) {
                data = JSON.parse(response.responseText);
                
                p.setLoading(false);
                var url = data[0]['URL'];
                if (url) {
                    Ext.Msg.show({
                        title: 'Info',
                        msg: '<a href="' + url + '" target="blank">Download file</a>',
                        icon: Ext.Msg.INFO,
                        buttons: Ext.Msg.OK,
                        fn: function () {

                        }
                    });
                } else {
                    me.tools.alert.warning(data[0]['MSG']);
                }
            }
        });
    },
    printPaymentScheme: function () {
        var me = this;
        me.instantWindow('FormPrintoutPayScheme', 500, 'Select Template', "mysuperstate", 'myPrintoutPaySchemeWindow');
        var f = me.getFormprintoutpayscheme();
        var el = f.down("[name=template_name]");
        for (var i in me.templatePrintPayScheme) {
            el.add({
                xtype: 'radiofield',
                boxLabel: me.templatePrintPayScheme[i].text,
                name: 'template',
                inputValue: me.templatePrintPayScheme[i].value,
                checked: i == 0 ? true : false
            });
        }
    },
    formTemplatePrintPayScheme: function () {
        var me = this;
        var f = me.getFormprintoutpayscheme();
        var vs = f.getValues();
        var tpl = vs.template;
        if (!tpl) {
            me.tools.alert.warning("Invalid template printout.");
            return;
        }
        f.up("window").close();
        var p = me.getFormdata();
        p.setLoading("Please wait...");
        Ext.Ajax.request({
            url: 'erems/purchaseletterNew/read',
            params: {
                mode_read: 'paymentscheme',
                purchaseletter_id: p.down("[name=purchaseletter_id]").getValue(),
                template: tpl
            },
            success: function (response) {
                data = JSON.parse(response.responseText);
                
                p.setLoading(false);
                var url = data[0]['URL'];
                if (url) {
                    Ext.Msg.show({
                        title: 'Info',
                        msg: '<a href="' + url + '" target="blank">Download file</a>',
                        icon: Ext.Msg.INFO,
                        buttons: Ext.Msg.OK,
                        fn: function () {

                        }
                    });
                } else {
                    me.tools.alert.warning(data[0]['MSG']);
                }
            }
        });
    },
    apiAci: function () {
        var me, panel, store, grid, record, row;
        me = this;
        var me = this;
        panel = me.getFormdata();
        grid = me.getGrid();
        store = grid.getStore();
        record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));
        row = record.data;

        if (record.get('api_aci') === 1) {
            panel.setLoading("Menonaktifkan ACI");
            me.tools.ajax({
                params: {
                    purchaseletter_id: row.purchaseletter_id
                },
                success: function (data, model) {
                    panel.setLoading(false);
                    store.reload();
                    panel.up('window').close();
                }
            }).read('apiaci');
        } else {
            panel.setLoading("Mengaktifkan ACI");
            me.tools.ajax({
                params: {
                    purchaseletter_id: row.purchaseletter_id
                },
                success: function (data, model) {
                    panel.setLoading(false);
                    store.reload();
                    panel.up('window').close();
                }
            }).read('apiacis');
        }
    },
    // =========================== show Live SPT by purchaseletter ID ==================================
    viewsptLive: function(view) {
        var me = this;

        var warningLunasTJ = "Tanda Jadi Belum Lunas ! ";
        if (me.isFlashPrint) {
            warningLunasTJ = "Tanda Jadi Belum Lunas ! ";
        } else {
            warningLunasTJ = "Tanda Jadi Belum Lunas ! ";
        }
        if (me.useLunasTandaJadi) {
            if (!me.puleLunasTandaJadi) {
                me.tools.alert.warning(warningLunasTJ);
                return;
            }
        }
        if (!me.validChangeName) {
            me.tools.alert.warning(me.validChangeNameMsg);
            return;
        }
        if (me.isPurchaseprintktsim) {
            if (me.tools.intval(me.totalDocumentKtpSim) <= 0) {
                me.tools.alert.warning("Dokumen KTP / SIM belum di upload.");
                return;
            }
        }

        var row = view[1];
        var record = view[5];
        me.getGrid().setLoading('Sedang memproses file');
        $.ajax({
            method: "POST",
            url: "erems/purchaseletterNew/read/",
            data: {
                    mode_read: "printout", 
                    purchaseletter_id: record.data.purchaseletter_id,
                    template: "all\/PurchaseLetter-Revisi.INHOUSE_CASH.BANGUNAN-ASURANSI-.docx"
                }
        }).done(function (msg) { 
            me.getGrid().setLoading(false);
            // var data = Ext.JSON.decode(msg); 
            var url = msg[0]['URL'];   
            var imgWin = new Ext.Window({
                width         : '100%',
                height        : '100%',
                id            : 'theImgWin',
                autoScroll    : true,
                title         : 'SPPJB Unit Number '+record.data.unit_unit_number,
                resizable     : false,
                modal         : true,
                items         : [
                    {
                        xtype: 'label', 
                        // html: '<a href="" target="blank">Click Here For Download Document</a>', 
                        html: '<iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" allowfullscreen frameborder="0" src="'+url+'"></iframe>', 
                        // html: '<a href="" target="blank">Click Here For Download Document</a>', 
                        flex: 1, 
                        margin: '0 0 0 10px'
                    },
                ]
            });
            imgWin.show();
        });
    },




















    fmb: function(val) {
        return this.fm(val, 2, ',', '.');
    },
    fm: function(n, decPlaces, thouSeparator, decSeparator) {
        var decPlaces = isNaN(decPlaces = Math.abs(decPlaces)) ? 2 : decPlaces,
                decSeparator = decSeparator == undefined ? "." : decSeparator,
                thouSeparator = thouSeparator == undefined ? "." : thouSeparator,
                sign = n < 0 ? "-" : "",
                i = parseInt(n = Math.abs(+n || 0).toFixed(decPlaces)) + "",
                j = (j = i.length) > 3 ? j % 3 : 0;
        return sign + (j ? i.substr(0, j) + thouSeparator : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thouSeparator) + (decPlaces ? decSeparator + Math.abs(n - i).toFixed(decPlaces).slice(2) : "");
    },
    removeKomaTitik: function(str) {
        var s = str.split(".");
        s = str.replace(/,/g, "");
        return s;
    },

    apliJsFuncsby_form_add: function () {
        var me = this;
        var x = {
            afterRender: function (tpl, params) {
                if ($("#plFormID input[name='action']").val() === "update") {

                    $("#plFormID select[name='downline_id']").val(params.downline_id);
                }
            }
        };
        return x;
    },
    apliJsFuncsby_form_add_status: function () {
        var me = this;
        var x = {
            afterRender: function (tpl, params) {
            }
        };
        return x;
    },
    genRangeSchedue: function(newDate,periode_angsuran,jenis_periode){
        switch(jenis_periode){
            case 'hari':
                newDate = Ext.Date.add(newDate, Ext.Date.DAY, periode_angsuran);
                break;
            case 'minggu':
                newDate = Ext.Date.add(newDate, Ext.Date.DAY, 7*periode_angsuran);
                break;
            case 'bulan':
                newDate = Ext.Date.add(newDate, Ext.Date.MONTH, periode_angsuran);
                break;
            default:
                newDate = Ext.Date.add(newDate, Ext.Date.MONTH, 1);
                break;
        }
        return newDate;
    }
});