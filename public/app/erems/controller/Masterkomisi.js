Ext.define('Erems.controller.Masterkomisi', {
    extend: 'Erems.library.template.controller.Controller2',
    alias: 'controller.Masterkomisi',
    requires: [
        'Erems.library.ModuleTools',
        'Erems.library.Browse',
        'Erems.library.box.Config',
        'Erems.library.box.tools.Tools',
        'Erems.template.ComboBoxFields',
        'Erems.library.box.tools.EventSelector',
        'Erems.library.XyReport'
    ],
    views: ['masterkomisi.Panel', 'masterkomisi.Grid', 'masterkomisi.FormSearch'],
    refs: [
        {
            ref: 'grid',
            selector: 'masterkomisigrid'
        },

        {
            ref: 'panel',
            selector: 'masterkomisipanel'
        },
        {
            ref: 'formsearch',
            selector: 'masterkomisiformsearch'
        }

    ],
    controllerName: 'masterkomisi',
    fieldName: 'komisi_id',
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
    bindPrefixName: 'Masterkomisi',
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
            'masterkomisipanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender

            },
            'masterkomisigrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange
            },
            'masterkomisigrid toolbar button[action=create]': {
                click: function () {
                    // me.showFormdata("create");
                    //   ApliJs.modal("formdata_modal").show("create");
                    var params = {};
                    ApliJs.showHtml(me, "formdata_modal", params, 'create');
                }
            },
            'masterkomisigrid toolbar button[action=update]': {
                click: function () {
                    //me.showFormdata("update");
                    var params = {};
                    ApliJs.showHtml(me, "formdata_modal", params, 'update');
                }
            },
            'masterkomisiformsearch button[action=search]': {
                click: this.dataSearch
            },
            'masterkomisiformsearch button[action=reset]': {
                click: this.dataReset
            },
            'masterkomisigrid toolbar button[action=destroy]': {
                click: function () {
                    me.deleteData();
                }
            },

        });
    },
    deleteData: function () {
        var me = this;
        var rec = me.getGrid().getSelectedRecord();
        if (rec) {
            ApliJs.loadingbar().show("Menghapus master komisi...");


            $.ajax({
                method: "POST",
                url: "erems/masterkomisi/read/",
                data: {mode_read: "hapus", komisi_id: rec.get("komisi_id")}
            }).done(function (msg) {
                ApliJs.loadingbar().hide();
                if (msg.status > 0) {
                    ApliJs.alert().success("Master Komisi :" + rec.get("code") + " telah di hapus.");
                    me.getGrid().getStore().loadPage(1);
                } else {

                    ApliJs.alert().warning("Terjadi kesalahan pada saat menghapus master komisi.");
                }
            });
        } else {
            ApliJs.alert().warning("Silahkan memilih master komisi yang ingin dihapus.");

        }


    },
    gridItemDblClick:function(foo,data){
        var me = this;
        var params = {};
       // console.log(a);
        // console.log(b);
         // console.log(c);
          // console.log(d);
         ApliJs.showHtml(me, "formdata_modal", params, 'update'); 
          
    },
    execAction: function (el, action, me) {
        /* KOSONG */
    },
    gridAfterRender: function (configs) {
        this.callParent(arguments);
        var me = this;

        // aplijs config
        /*
        ApliJs.gridSelect = {
            'browseSPPJBParamId': {
                'loadData': function (page, limit, start) {
                    me.apliJsFuncparamsppjb_modal('masterkomisi_paramsppjb_modal_ID').loadData(page, limit, start);
                }
            }
        };
        */


        me.getGrid().doInit();
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

        me.tools.ajax({
            params: {},
            success: function (data, model) {

                me.tools.wesea(data.paymentmethods, me.getFormsearch().down("[name=paymentmethod_id]")).comboBox(true);
                me.tools.wesea(data.blocks, me.getFormsearch().down("[name=block_id]")).comboBox(true);
                me.tools.wesea(data.clusters, me.getFormsearch().down("[name=cluster_id]")).comboBox(true);



            }
        }).read('init');

        // TEST MODAL BOOTSTRAP
        var viewParams = {
            test: 0,

        };

        // add loading Bar
        ApliJs.loadingbar().init();

    },

    apliJsFuncformdata_modal: function (modalId) {
        var me = this;
        var x = {
            init: function () {

            },
            formInit: function (callback) {
                // read form init
                $.ajax({
                    method: "POST",
                    url: "erems/masterkomisi/read/",
                    data: {mode_read: "forminit"}
                }).done(function (msg) {

                    //  console.log(msg);
                    var komisiHitung = msg.data.komisihitung.data;
                    var cb = "";
                    for(var i in komisiHitung){
                       cb +='<option value="'+komisiHitung[i]["komisihitung_id"]+'">'+komisiHitung[i]["code"]+'</option>';
                    }
                    
                     $('#'+modalId+' #definisi_kc_ID').html(cb);
                    

                    callback();
                    
                    



                }).fail(function (msg) {
                    ApliJs.loadingbar().hide();
                    ApliJs.alert().error("Something problem when processing your request.");
                });
            },
            afterRender: function () {

                $('#' + modalId).on('shown.bs.modal', function () {

                    var action = $('#' + modalId).attr("abc-action");

                    if (action === "create") {
                        $('#' + modalId + ' h4.modal-title').text("New Master Komisi");

                        me.apliJsFuncformdata_modal(modalId).formInit(function () {

                        });

                    } else {

                        var rec = me.getGrid().getSelectedRecord();
                        //console.log(rec);
                        if (rec) {
                            $('#' + modalId + ' h4.modal-title').text("Edit Master Komisi");

                            me.apliJsFuncformdata_modal(modalId).formInit(function () {

                                ApliJs.loadingbar().show("Mengambil master komisi...");


                                $.ajax({
                                    method: "POST",
                                    url: "erems/masterkomisi/read/",
                                    data: {mode_read: "detail", komisi_id: rec.get("komisi_id")}
                                }).done(function (msg) {
                                    // console.log(msg);
                                    var fa = msg.masterkomisi[0][0];
                                    ApliJs.form("#" + modalId + " form").loadData(fa);
                                    ApliJs.loadingbar().hide();



                                }).fail(function (msg) {
                                    ApliJs.loadingbar().hide();
                                    ApliJs.alert().error("Something problem when processing your request.");
                                });
                            });

                            // $('#myModal form').find("input[type=text], textarea").val("");

                            // $('#formPaySaveId').prop('disabled', false);

                            // $('#browseUnitBtnID').prop('disabled', false);




                        } else {
                            ApliJs.alert().warning("Silahkan memilih master komisi terlebih dahulu.");
                        }


                    }



                });

                $('#' + modalId + ' button[abc-action=save]').click(function () {



                    if (ApliJs.form("#" + modalId + " form").isValid()) {

                        $('#' + modalId + ' button[abc-action=save]').prop('disabled', true);
                        var dataForm = ApliJs.form("#" + modalId + " form").serialize();

                        ApliJs.loadingbar().show("Sedang menyimpan...");

                        var action = $('#' + modalId).attr("abc-action");


                        // console.log($("#myModal form").serialize());
                        $.ajax({
                            method: "POST",
                            url: "erems/masterkomisi/read/",
                            data: {mode_read: action === "create" ? "save" : "update", data: JSON.stringify(dataForm)}
                        }).done(function (msg) {

                            ApliJs.loadingbar().hide();

                            $('#' + modalId + ' button[abc-action=save]').prop('disabled', false);
                            if (!msg.STATUS) {
                                ApliJs.alert().warning(msg.MSG);
                                // alert(msg.MSG);
                            } else {
                                ApliJs.alert().success("Master komisi berhasil disimpan !");
                                // alert("Sukses simpan payment !");
                                $("#" + modalId).modal('hide');
                                me.getGrid().getStore().loadPage(1);

                            }

                        });
                    }
                });

              

                //  

            },
            

        };

        return x;

    }



});
