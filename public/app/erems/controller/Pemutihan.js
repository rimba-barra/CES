Ext.define('Erems.controller.Pemutihan', {
    extend: 'Erems.library.template.controller.Controller2',
    alias: 'controller.Pemutihan',
    requires: [
        'Erems.library.ModuleTools',
        'Erems.library.Browse',
        'Erems.library.box.Config',
        'Erems.library.box.tools.Tools',
        'Erems.template.ComboBoxFields',
        'Erems.library.box.tools.EventSelector',
        'Erems.library.XyReport'
    ],
    views: ['pemutihan.Panel', 'pemutihan.Grid', 'pemutihan.FormSearch'],
    refs: [
        {
            ref: 'grid',
            selector: 'pemutihangrid'
        },

        {
            ref: 'panel',
            selector: 'pemutihanpanel'
        },
        {
            ref: 'formsearch',
            selector: 'pemutihanformsearch'
        }

    ],
    controllerName: 'pemutihan',
    fieldName: 'payment_id',
    formWidth: 800,
    fillForm: null,
    unitFormula: null,
    paymentFunc: null,
    browseHandler: null,
    dateNow: new Date(),
    flaggeneratevoucherno: 0,
    state: null,
    accept_date: null,
    pt_id: 0,
    stData: {},
    bindPrefixName: 'Pemutihan',
    localStore: {
        selectedUnit: null,
        customer: null,
        price: null,
        detail: null
    },
    tagihanDefaultValue: false,
    tools: null,
    myConfig: null,
    cbf: null,
    mt: null,
    stList: null, // list of schedule type
    effectedSch: [], // list schedule id yang dibayar
    formxWinId: 'win-instalpaymentwinId',
    paymentId: 0,

    constructor: function (configs) {
        this.callParent(arguments);
        var me = this;
        this.myConfig = new Erems.library.box.Config({
            _controllerName: me.controllerName
        });

        me.cbf = new Erems.template.ComboBoxFields();
    },
    xyReport: null,
    printOutData: null,
    globalParams: null,
    globalParamsForm: null,
    selectedPurchaseletter: null,
    myParams: {
        paymentteks: null,
        global: null
    },
    init: function (application) {
        var me = this;

        me.tools = new Erems.library.box.tools.Tools({config: me.myConfig});
        var events = new Erems.library.box.tools.EventSelector();

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

        if (typeof moment !== 'function') {


            Ext.Loader.injectScriptElement(document.URL + 'app/erems/library/moment.min.js', function () {
            }, function () {
            });
        }

        this.control({
            'pemutihanpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender

            },
            'pemutihangrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange
            },

            'pemutihanformsearch button[action=search]': {
                click: this.dataSearch
            },
            'pemutihanformsearch button[action=reset]': {
                click: this.dataReset
            },
            'pemutihangrid toolbar button[action=bayar]': {
                click: function () {
                    me.bayar();
                }
            },

        });
    },
    bayar: function () {
        var me = this;
        var grid = me.getGrid();
        var rec = grid.getSelectedRecord();
        if (rec) {
            var params = {};
            ApliJs.showHtml(me, "formdata_modal", params, 'create');

        } else {
            me.tools.alert.warning("Silahkan pilih salah satu data terlebih dahulu.");
        }
    },
    apliJsFuncformdata_modal: function (modalId) {
        var me = this;
        var x = {
            init: function () {

            },
            formInit: function (callback) {
                ApliJs.form("#" + modalId + " form").resetValue();

                callback();
            },
            afterRender: function () {

                $('#' + modalId).on('shown.bs.modal', function () {



                    var action = $('#' + modalId).attr("abc-action");


                    if (action === "create") {
                        $('#' + modalId + ' h4.modal-title .teks').text("Bayar Pemutihan");

                        me.apliJsFuncformdata_modal(modalId).formInit(function () {

                        });

                        var grid = me.getGrid();
                        var rec = grid.getSelectedRecord();

                        ApliJs.loadingbar().show("Sedang mengambil informasi purchaseletter...");
                        /// load purchaseletter info
                        $.ajax({
                            method: "POST",
                            url: "erems/pemutihan/read/",
                            data: {mode_read: "purchaseinfo", purchaseletter_id: rec.get("purchaseletter_purchaseletter_id"),
                                schedule_id: rec.get("schedule_id")}
                        }).done(function (msg) {

                            ApliJs.loadingbar().hide();
                            console.log(msg);
                            var purchase = msg.purchaseletter;
                            for (var i in purchase) {
                                $('#' + modalId + ' input[name=' + i + ']').val(purchase[i]);
                            }
                            $('#' + modalId + ' textarea[name=customer_address]').val(purchase["customer_address"]);
                            $('#' + modalId + ' input[name=harga_total_jual]').val(accounting.formatMoney(purchase["harga_total_jual"]));
                            $('#' + modalId + ' input[name=payment]').val(accounting.formatMoney(msg.schedule.remaining_balance));

                            $('#' + modalId + ' input[name=payment_date]').val(moment(new Date()).format('DD-MM-YYYY'));
                            $('#' + modalId + ' input[name=purchaseletter_id]').val(rec.get("purchaseletter_purchaseletter_id"));
                            $('#' + modalId + ' input[name=schedule_id]').val(rec.get("schedule_id"));

                        });












                    }



                });

                ApliJs.form('#' + modalId + ' form').initEvent();

                $('#' + modalId + ' button[abc-action=save]').click(function () {
                    ApliJs.form('#' + modalId + ' form').removeValidationAttribute();
                    $('#' + modalId + ' button[abc-action=save]').prop('disabled', true);
                    var dataForm = ApliJs.form("#" + modalId + " form").serialize();

                    ApliJs.loadingbar().show("Sedang menyimpan...");

                    var action = $('#' + modalId).attr("abc-action");


                    // console.log($("#myModal form").serialize());
                    $.ajax({
                        method: "POST",
                        url: "erems/pemutihan/read/",
                        data: {mode_read: action === "create" ? "save" : "update", data: JSON.stringify(dataForm)}
                    }).done(function (msg) {

                        ApliJs.loadingbar().hide();
                        //console.log(msg);

                        $('#' + modalId + ' button[abc-action=save]').prop('disabled', false);
                        if (!msg.STATUS) {
                            ApliJs.unvalidField(modalId, msg.UNVALID_FIELD);
                            ApliJs.alert().warning(msg.MSG);

                            // alert(msg.MSG);
                        } else {
                            ApliJs.alert().success("Pemutihan berhasil disimpan !");
                            // alert("Sukses simpan payment !");
                            $("#" + modalId).modal('hide');
                            me.getGrid().getStore().loadPage(1);

                        }

                    });

                });
            }
        };
        return x;
    },
    /*
     bayar:function(){
     var me = this;
     var grid = me.getGrid();
     var rec = grid.getSelectedRecord();
     if(rec){
     //  console.log(rec);
     grid.setLoading("Please wait...");
     me.tools.ajax({
     params: {
     purchaseletter_id: rec.get("purchaseletter_purchaseletter_id"),
     schedule_id:rec.get("schedule_id")
     },
     success: function (data, model,c) {
     
     grid.setLoading(false);
     
     
     var hasil = data['HASIL'];
     if (hasil) {
     me.tools.alert.info("Pembayaran berhasil.");
     me.getGrid().getStore().loadPage(1);
     } else {
     me.tools.alert.warning(data['MSG']);
     }
     
     }
     }).read('bayar');
     
     }else{
     me.tools.alert.warning("Silahkan pilih salah satu data terlebih dahulu.");
     }
     },
     */
    execAction: function (el, action, me) {
        /* KOSONG */
    },
    gridAfterRender: function (configs) {
        // this.callParent(arguments);
        var me = this;

        var fields = me.getFormsearch().getValues();


        me.getGrid().doInit();
        for (var x in fields)
        {
            me.getGrid().getStore().getProxy().setExtraParam(x, fields[x]);
        }
        me.getGrid().getStore().load({
            params: {},
            callback: function (rec, op) {
                me.getGrid().attachModel(op);

                var pg = me.getGrid().down("pagingtoolbar");
                if (pg) {
                    pg.getStore().load();
                }

            }
        });



        // add loading Bar
        ApliJs.loadingbar().init();


    },
    showFormdata: function (action) {
        var me = this;


    },

});
