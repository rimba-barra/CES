Ext.define('Erems.controller.Sppjbsby', {
    extend: 'Erems.library.template.controller.Controller2',
    alias: 'controller.Sppjbsby',
    requires: [
        'Erems.library.ModuleTools',
        'Erems.library.Browse',
        'Erems.library.box.Config',
        'Erems.library.box.tools.Tools',
        'Erems.template.ComboBoxFields',
        'Erems.library.box.tools.EventSelector',
        'Erems.library.XyReport'
    ],
    views: ['sppjbsby.Panel', 'sppjbsby.Grid', 'sppjbsby.FormSearch'],
    refs: [
        {
            ref: 'grid',
            selector: 'sppjbsbygrid'
        },

        {
            ref: 'panel',
            selector: 'sppjbsbypanel'
        },
        {
            ref: 'formsearch',
            selector: 'sppjbsbyformsearch'
        }

    ],
    controllerName: 'sppjbsby',
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
    bindPrefixName: 'Sppjbsby',
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
            'sppjbsbypanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender

            },
            'sppjbsbygrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange
            },
            'sppjbsbygrid toolbar button[action=create]': {
                click: function () {
                    // me.showFormdata("create");
                    //   ApliJs.modal("formdata_modal").show("create");
                    var params = {};
                    ApliJs.showHtml(me, "formdata_modal", params, 'create');
                }
            },
            'sppjbsbygrid toolbar button[action=update]': {
                click: function () {
                    //me.showFormdata("update");
                    var params = {};
                    ApliJs.showHtml(me, "formdata_modal", params, 'update');
                }
            },
            'sppjbsbyformsearch button[action=search]': {
                click: this.dataSearch
            },
            'sppjbsbyformsearch button[action=reset]': {
                click: this.dataReset
            },
            'sppjbsbygrid toolbar button[action=destroy]': {
                click: function () {
                    me.deleteData();
                }
            },
            'sppjbsbygrid toolbar button[action=printx]': {
                click: function () {
                    me.showPdf();
                }
            },

        });
    },
    deleteData: function () {
        var me = this;
        var rec = me.getGrid().getSelectedRecord();
        if (rec) {
            ApliJs.loadingbar().show("Menghapus sppjb...");


            $.ajax({
                method: "POST",
                url: "erems/sppjbsby/read/",
                data: {mode_read: "hapus", sppjb_id: rec.get("sppjb_id")}
            }).done(function (msg) {
                ApliJs.loadingbar().hide();
                if (msg.status > 0) {
                    ApliJs.alert().success("SPPJB :" + rec.get("sppjb_no") + " telah di hapus.");
                    me.getGrid().getStore().loadPage(1);
                } else {

                    ApliJs.alert().warning("Terjadi kesalahan pada saat menghapus sppjb.");
                }
            });
        } else {
            ApliJs.alert().warning("Silahkan memilih sppjb yang ingin dihapus.");

        }


    },
    showPdf: function () {
        var me = this;

       

        var rec = me.getGrid().getSelectedRecord();

        ApliJs.loadingbar().show("Generating pdf...");
        
       

        if (rec) {

            $.ajax({
                method: "POST",
                url: "erems/sppjbsby/read/",
                data: {mode_read: "pdfprint", sppjbsby_id: rec.get("sppjb_id")}
            }).done(function (msg) {
                ApliJs.loadingbar().hide();
             
                if (msg.STATUS) {
                    window.open(msg.URL);
                }
            });

        }else{
            me.tools.alert.warning("Silahkan pilih salah satu record terlebih dahulu.");
        }


    },
    execAction: function (el, action, me) {
        /* KOSONG */
    },
    gridAfterRender: function (configs) {
        this.callParent(arguments);
        var me = this;

        // aplijs config
        ApliJs.gridSelect = {
            'browseSPPJBParamId': { 
                'loadData': function (page, limit, start) {
                    me.apliJsFuncparamsppjb_modal('sppjbsby_paramsppjb_modal_ID').loadData(page, limit, start);
                }
            }
        };


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
            init:function(){
            },
            afterRender: function () {
                $('#' + modalId).on('shown.bs.modal', function () {
                    var action = $('#' + modalId).attr("abc-action");
                    if (action === "create") {
                        $('#' + modalId + ' h4.modal-title').text("New SPPJB");
                    } else {
                        var rec = me.getGrid().getSelectedRecord();
                        //console.log(rec);
                        if (rec) {
                            $('#' + modalId + ' h4.modal-title').text("Edit SPPJB");
                            // $('#myModal form').find("input[type=text], textarea").val("");
                            // $('#formPaySaveId').prop('disabled', false);
                            // $('#browseUnitBtnID').prop('disabled', false);
                            ApliJs.loadingbar().show("Mengambil sppjb...");
                            $.ajax({
                                method: "POST",
                                url: "erems/sppjbsby/read/",
                                data: {mode_read: "detail", sppjb_id: rec.get("sppjb_id")}
                            }).done(function (msg) {
                                // console.log(msg);
                                var fa = msg.sppjbsby[0][0];
                                ApliJs.form("#" + modalId + " form").loadData(fa);
                                //    $("#" + modalId + " input[name='sppjbsby_date']").val(moment(fa.sppjbsby_date).format("YYYY-MM-DD"));
                                ApliJs.loadingbar().hide();
                            });
                        } else {
                            ApliJs.alert().warning("Silahkan memilih payment terlebih dahulu.");
                            //   me.tools.alert.warning("Silahkan memilih payment terlebih dahulu.");
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
                            url: "erems/sppjbsby/read/",
                            data: {mode_read: action === "create" ? "save" : "update", data: JSON.stringify(dataForm)}
                        }).done(function (msg) {
                            ApliJs.loadingbar().hide();
                            $('#' + modalId + ' button[abc-action=save]').prop('disabled', false);
                            if (!msg.STATUS) {
                                ApliJs.alert().warning(msg.MSG);
                                // alert(msg.MSG);
                            } else {
                                ApliJs.alert().success("SPPJB berhasil disimpan !");
                                // alert("Sukses simpan payment !");
                                $("#" + modalId).modal('hide');
                                me.getGrid().getStore().loadPage(1);
                            }
                        });
                    }
                });
                
                $('#' + modalId + ' #browseParamBtnId').click(function () {
                       var params = {};
                        ApliJs.showHtml(me, "paramsppjb_modal", params, 'create');
                });

                //added by Rico 22042021
                $('#datasppjb_warna_ID, #datasppjb_palinglambat_ID, #datasppjb_biayalambat_ID, #datasppjb_alasanbatal_ID, #datasppjb_biayabatal_ID, #datasppjb_st_setelah_ID, #datasppjb_serahfisik_ID, datasppjb_dendalambatkosong_ID, #datasppjb_deadlinebangunan_ID, #datasppjb_nomor_rekening_ID, #datasppjb_atas_nama_ID, #company_sertifikat_induk_ID, #company_kecamatan_ID, #pihak2_alamat_ID, #pihak2_jabatan_ID, #pihak2_namapt_ID, #pihak2_suratkuasaalamat_ID, #pihak2_suratkuasanik_ID, #cetak_ID, #datasppjb_dendalambatkosong_ID').on('keyup change',function(e){
                    var v = $(this).val();
                    var res = me.checkRegex(v, 1);

                    if(!res){
                        if(e.type == 'change'){
                            $(this).val('');
                        }else{
                            $(this).val(v.slice(0,-1));
                        }
                    }
                });

                //added by Rico 22042021
                $('#pihak2_customer_ID, #pihak2_suratkuasanama_ID').on('keyup change',function(e){
                    var v = $(this).val();
                    var res = me.checkRegex(v, 2);

                    if(!res){
                        if(e.type == 'change'){
                            $(this).val('');
                        }else{
                            $(this).val(v.slice(0,-1));
                        }
                    }
                });

                //added by Rico 22042021
                $('#pihak2_telp_ID, #pihak2_fax_ID, #pihak2_ktp_no_ID, #pihak2_npwp_ID, #pihak2_suratkuasano_ID').on('keyup change',function(e){
                    var v = $(this).val();
                    var res = me.checkRegex(v, 4);

                    if(!res){
                        if(e.type == 'change'){
                            $(this).val('');
                        }else{
                            $(this).val(v.slice(0,-1));
                        }
                    }
                });
            }
        };
        return x;
    },
    //added by Rico 22042021
    checkRegex: function(val, type){
        var regex = '';
        switch(type){
            case 1:
                regex = /^[a-zA-Z0-9\s.]+$/;
                break;
            case 2:
                regex = /^[a-zA-Z\s.]+$/;
                break;
            case 3:
                regex = /^[0-9]+$/;
                break;
            case 4:
                regex = /^[0-9+.-]+$/;
                break;
            default:
                regex = /^[a-zA-Z0-9]+$/;
                break;
                
        };
        var result = regex.test(val);

        return result;
    },
    apliJsFuncparamsppjb_modal: function (modalId) {
        var me = this;
        var x = {
            init:function(){
               ApliJs.grid('#'+modalId).initEvent('browseSPPJBParamId');  
            },
            afterRender: function () {
                $('#' + modalId).on('shown.bs.modal', function () {
                    me.apliJsFuncparamsppjb_modal(modalId).loadData(1, 25, 0);
                });
            },
            loadData: function (page, limit, start) {
              //  var modalId = "myModalSPPJBParamID";
                var saya = this;
                ApliJs.loadingbar().show("Sedang mengambil daftar parameter SPPJB...");

                $.ajax({
                    method: "POST",
                    url: "erems/sppjbsby/read/",
                    data: {start: start, page: page, limit: limit, mode_read: "paramsppjblist", name_01: $("#" + modalId + " input[name=name_01]").val()}
                }).done(function (msg) {
                    $("#" + modalId + " button[name=submit_search]").prop('disabled', false);

                    ApliJs.loadingbar().hide();

                    //  console.log(msg);
                    var sppjbparams = msg["DATA"][1];
                   // var totalData = msg["DATA"][0][0]["totalRow"];
                    /*
                    var totalPage = 0;
                    if (totalData > 0) {
                        totalPage = Math.ceil(totalData / limit);
                    }
                    */

                    // console.log(msg);
                    var rows = "";
                    var count = (page * limit) - limit + 1;

                    for (var i in sppjbparams) {
                        rows += "<tr parametersppjb_id='" + sppjbparams[i]["parametersppjb_id"] + "'>" +
                                "<td style='width:30px;'>" + count + "</td>" +
                                "<td>" + sppjbparams[i]["code"] + "</td>" +
                                "<td>" + sppjbparams[i]["name_01"] + "</td>" +
                                "<td>" + sppjbparams[i]["position_01"] + "</td>" +
                                "<td>" + sppjbparams[i]["name_02"] + "</td>" +
                                "<td>" + sppjbparams[i]["position_02"] + "</td>" +
                                "<td>" + sppjbparams[i]["akta_no"] + "</td>" +
                                "<td>" + moment(new Date(sppjbparams[i]["akta_date"])).format("DD-MM-YYYY") + "</td>" +
                                
                                "<td><button class='btn btn-primary btn-sm select_param' parametersppjb_id='" + sppjbparams[i]["parametersppjb_id"] + "'>select</button></td>" +
                                "</tr>";
                        count++;
                    }

                    $("#plSPPJBParamListId tbody").html(rows);


                    /// update paging info
                    ApliJs.grid('#'+modalId).updatePagingInfo({
                        data:sppjbparams,
                        page:page,
                        totalData:msg["DATA"][0][0]["totalRow"],
                        limit:limit
                    });
                    /*
                    if (sppjbparams.length > 0) {
                        $("#" + modalId + " .mysuper_paging span.current_page").text(page);
                        $("#" + modalId + " .mysuper_paging span.total_page").text(totalPage);
                        $("#" + modalId + " .mysuper_paging span.total_records").text("Total Record: " + totalData);

                    } else {
                        $("#" + modalId + " .mysuper_paging span.current_page").text(0);
                        $("#" + modalId + " .mysuper_paging span.total_page").text(0);
                        $("#" + modalId + " .mysuper_paging span.total_records").text("Total Record: 0");
                    }
                    */





                    // end update paging info


                    $("#plSPPJBParamListId button.select_param").click(function (event) {
                        event.preventDefault();
                        var plId = $(this).attr("parametersppjb_id");
                        // me.unitSelectviaApli(unitId);
                        //$("#" + modalId).hide();
                        $('#' + modalId).modal('hide');


                        ApliJs.loadingbar().show("Sedang mengambil informasi parameter sppjb...");

                        $.ajax({
                            method: "POST",
                            url: "erems/sppjbsby/read/",
                            data: {mode_read: "paramsppjbone", parametersppjb_id: plId,page:1,limit:1}
                        }).done(function (msg) {
                            ApliJs.loadingbar().hide();
                            //   

                            var pl = msg.DATA[1][0];
                            
                           // console.log(pl);
                          
                            for(var x in pl){
                                $("#sppjbsby_formdata_modal_ID form input[name='parametersppjb_"+x+"']").val(pl[x]);
                            }
                            
                            $("#sppjbsby_formdata_modal_ID form input[name='pihak1_parametersppjb_id']").val(pl['parametersppjb_id']);
                 

                           // ApliJs.form("#myModal form").loadData(pl);

                           // $("#"+modalId+" form input[name='purchaseletter_purchaseletter_id']").val(pl['parametersppjb_id']);


                        });
                    });
                });
            }
        };

        return x;

    }

});