Ext.define('Cashier.controller.Installmentpaymentsby', {
    extend: 'Cashier.library.template.controller.Controller2',
    alias: 'controller.Installmentpaymentsby',
    requires: [
        'Cashier.library.ModuleTools',
        'Cashier.library.Browse',
        'Cashier.library.box.Config',
        'Cashier.library.box.tools.Tools',
        'Cashier.template.ComboBoxFields',
        'Cashier.library.box.tools.EventSelector',
        'Cashier.library.XyReport',
        'Cashier.library.template.combobox.Deptprefixcombobox',
        'Cashier.library.template.combobox.Ptusercombobox',
        'Cashier.library.template.combobox.Statuscombobox'
    ],
    views: ['installmentpaymentsby.Panel', 'installmentpaymentsby.Grid', 'installmentpaymentsby.FormSearch'],
    stores: [
        'Deptprefixcombo',
        'Ptbyuser',
        'Grouptransaction'

    ],
    refs: [
        {
            ref: 'grid',
            selector: 'installmentpaymentsbygrid'
        },
        {
            ref: 'panel',
            selector: 'installmentpaymentsbypanel'
        },
        {
            ref: 'formsearch',
            selector: 'installmentpaymentsbyformsearch'
        }

    ],
    controllerName: 'installmentpaymentsby',
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
    stData: {},
    jurnalData: {},
    templateCoa: '1', //1 installment payment sesuai ID table mh_coa_config cashier
    coa_id: null,
    templateModuleName: 'Installment Payment',
    is_out: 0, //jika TRANSAKSI OUT 1. JIKA IN 0
    bindPrefixName: 'Installmentpaymentsby',
    sumTagihan: 0,
    urlcommon: 'cashier/common/create',
    urlrequest: 'cashier/tcash/create',
    urlheader: 'cashier/tcash/',
    urldetail: 'cashier/tcash/coadetail',
    urlvendor: 'cashier/tcash/vendor',
    urlcia: 'cashier/tcash/outtransbon',
    prefix_voucher: null,
    prefix: null,
    pt_id: 0,
    kasbank_id: 0,
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
        this.myConfig = new Cashier.library.box.Config({
            _controllerName: me.controllerName
        });

        me.cbf = new Cashier.template.ComboBoxFields();
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

        me.tools = new Cashier.library.box.tools.Tools({config: me.myConfig});
        var events = new Cashier.library.box.tools.EventSelector();

        if (typeof Mustache === "undefined") {
            Ext.Loader.injectScriptElement(document.URL + 'app/erems/library/mustache.min.js', function () {

                if (typeof ApliJs === "undefined") {
                    Ext.Loader.injectScriptElement(document.URL + 'app/cashier/js/ApliJs.js', function () {

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
            'installmentpaymentsbypanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender

            },
            'installmentpaymentsbygrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange
            },
            'installmentpaymentsbygrid toolbar button[action=create]': {
                click: function () {
                    me.showFormdata("create");
                }
            },
            'installmentpaymentsbygrid toolbar button[action=update]': {
                click: function () {
                    me.showFormdata("update");
                }
            },
            'installmentpaymentsbyformsearch button[action=search]': {
                click: this.dataSearch
            },
            'installmentpaymentsbyformsearch button[action=reset]': {
                click: this.dataReset
            },
            'installmentpaymentsbygrid toolbar button[action=destroy]': {
                click: function () {
                    me.deleteData();
                }
            },
            'installmentpaymentsbygrid toolbar button[action=printx]': {
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
            ApliJs.loadingbar().show("Deleting payment...");


            $.ajax({
                method: "POST",
                url: "cashier/installmentpaymentsby/read/",
                data: {mode_read: "hapus", payment_id: rec.get("payment_id")}
            }).done(function (msg) {
                ApliJs.loadingbar().hide();
                if (msg.status > 0) {
                    me.tools.alert.info("Payment telah terhapus.");
                    me.getGrid().getStore().loadPage(1);
                } else {
                    me.tools.alert.warning("Terjadi kesalahan pada saat menghapus payment.");
                }
            });
        } else {
            me.tools.alert.warning("Silahkan memilih payment yang ingin dihapus.");
        }


    },
    showPdf: function () {
        var me = this;
        var recs = me.getGrid().getSelectionModel().getSelection();
        if (recs.length == 0) {
            return;
        }

        //  p.setLoading("Please wait..");
        ApliJs.loadingbar().show("Generating pdf print...");

        var ids = "";

        for (var i in recs) {
            ids += recs[i].get("payment_id") + "~";
        }


        $.ajax({
            method: "POST",
            url: "cashier/installmentpaymentsby/read/",
            data: {mode_read: "printpdf", payment_id: ids}
        }).done(function (msg) {
            ApliJs.loadingbar().hide();
            var url = msg.URL;
            if (url) {
                window.open(url);

            }
        });


    },
    execAction: function (el, action, me) {
        /* KOSONG */
    },
    gridAfterRender: function (configs) {
        this.callParent(arguments);
        var me = this;



        me.getGrid().doInit();
        me.getGrid().getStore().load({
            params: {},
            callback: function (rec, op) {
                me.getGrid().attachModel(op);

                var pg = me.getGrid().down("pagingtoolbar");
                if (pg) {
                    pg.getStore().load();
                }
                //me.getGrid().down("paging");
                //  me.getGrid().down("pagingtoolbar").getStore().reload();
                // me.down();
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


        // assign button 
        // $("#paymentEremsSBYID-btnEl").attr("data-toggle", "modal");
        // $("#paymentEremsSBYID-btnEl").attr("data-target", "#myModal");
        //  $("#paymentEremsSBYUpdateID-btnEl").attr("data-toggle", "modal");
        // $("#paymentEremsSBYUpdateID-btnEl").attr("data-target", "#myModal");

        // TEST MODAL BOOTSTRAP
        var viewParams = {
            test: 0,
        };
        // ApliJs.loadHtmlB(me, me.getGrid().down("#testModalID"), 'formdata_modal', viewParams);


        // ApliJs.loadHtmlB(me, me.getGrid().down("#browseUnitID"), 'browse_unit_modal', viewParams);

        // ApliJs.loadHtmlB(me, me.getGrid().down("#formDetailPayID"), 'formdatadetail_modal', viewParams);

        ApliJs.loadHtmlC(me, '#myModal', 'formdata_modal', viewParams);


        ApliJs.loadHtmlC(me, '#myModalBrowseUnitID', 'browse_unit_modal', viewParams);

        ApliJs.loadHtmlC(me, '#myModalFormDetail', 'formdatadetail_modal', viewParams);

        // END TEST MODAL BOOTSTRAP

        // add loading Bar
        ApliJs.loadingbar().init();



    },
    showFormdata: function (action) {
        var me = this;
        me.accept_date = me.dateNow;
        $("#acceptDateId").val(moment(me.dateNow).format("DD-MM-YYYY"));


        if (action === "update") {
            var rec = me.getGrid().getSelectedRecord();
            me.state = 'update';
            //document.getElementById("formdataId").reset();
            $("#acceptDateId").val(moment(me.dateNow).format("DD-MM-YYYY"));
            //console.log(rec);
            if (rec) {
                $("generateBtnId").attr('disabled', 'disabled');

                $('#myModal h4.modal-title').text("Edit Payment");
                $('#myModal form').find("input[type=text], textarea").val("");

                $('#formPaySaveId').prop('disabled', true);
                $('#browseUnitBtnID').prop('disabled', true);
                $('#generateBtnId').hide();

                ApliJs.loadingbar().show("Loading payment...");

                $('#myModal').modal({
                    show: true
                });
                $('#myModal').attr("my-action", action);

                $.ajax({
                    method: "POST",
                    url: "cashier/installmentpaymentsby/read/",
                    data: {
                        mode_read: "detail",
                        payment_id: rec.get("payment_id"),
                        kasbank_id: rec.get("paymentcashier_th_kasbank_id")
                    }
                }).done(function (msg) {
                    //console.log(msg);


                    var pay = msg.payment[1][0];



                    var modalId = "myModal";


                    var paymentMethods = msg.paymentmethod[1];

                    // fill combobox
                    $("#paymethodID").append('<option>-</option>');
                    for (var p in paymentMethods) {

                        $('#' + modalId + ' select[name=paymentmethod_paymentmethod_id]').append($("<option></option>").attr("value", paymentMethods[p]['paymentmethod_id']).text(paymentMethods[p]['paymentmethod']));
                    }



                    for (var i in pay) {
                        // console.log(pl[i]);
                        $("#" + modalId + " input[name='" + i + "']").val(pay[i]);

                    }
                    $("#" + modalId + " textarea[name='note']").val(pay.note);
                    // $("#"+modalId+" input[name]");
                    //cair_date
                    var date = new Date();

                    $("#" + modalId + " textarea[name='customer_address']").val(pay.customer_address);


                    $("#" + modalId + " input[name='paymentcashier_accept_date']").val(moment(pay.payment_date).format("DD-MM-YYYY"));
                    $("#" + modalId + " input[name='payment_date']").val(moment(pay.payment_date).format("DD-MM-YYYY"));
                    $("#" + modalId + " input[name='duedate']").val(moment(pay.duedate).format("DD-MM-YYYY"));
                    $("#" + modalId + " input[name='cair_date']").val(moment(pay.cair_date).format("DD-MM-YYYY"));


                    $("#" + modalId + " input[name='purchaseletter_purchase_date']").val(moment(pay.purchaseletter_purchase_date).format("DD-MM-YYYY"));
                    $("#" + modalId + " input[name='purchaseletter_rencana_serahterima_date']").val(moment(pay.purchaseletter_rencana_serahterima_date).format("DD-MM-YYYY"));


                    me.apliJsFuncformdata_modal().fillGrid(1, 999999, msg.schedule[1], "update");
                    me.apliJsFuncformdata_modal().fillGridCoa(1, 999999, msg.detailcoa[1], "update");

                    ApliJs.loadingbar().hide();

                    // $('#myModal form').find("input[abctype=money]").val($(this).val()+"---0--");
                    $('#myModal form input.abcmoney').each(function () {
                        $(this).val(accounting.formatMoney($(this).val()));
                    });

                });
            } else {
                me.tools.alert.warning("Silahkan memilih payment terlebih dahulu.");
            }

        } else {

            $('#myModal').modal({
                show: true
            });
            me.jurnalData = {};
            $("#purchaseletterId").val('');

            $('#myModal').attr("my-action", action);

            $('#myModal form').find("input[type=text], textarea").val("");

            $("#ipScheduleList tbody").html("");
            $("#ipJurnalList tbody").html("");


            $('#formPaySaveId').prop('disabled', false);
            $('#browseUnitBtnID').prop('disabled', false);
            $('#generateBtnId').prop('disabled', false);
            $('#generateBtnId').show();
            $('#prefix_banks').hide();
            document.getElementById("formdataId").reset();
            $("#acceptDateId").val(moment(me.dateNow).format("DD-MM-YYYY"));

                        $(".toggle-sidebar").click(function () {
                                $("#sidebarCari").show();
				$("#sidebarCari").toggleClass("collapsedCari");
				
				$("#contentRight").toggleClass("col-md-8");
				
				return false;
			});
            
        }


    },
    apliJsFuncformdata_modal: function () {
        var me = this;

        var x = {
            afterRender: function () {




                $(function () {

                    $('[data-toggle="datepicker"]').datepicker({
                        autoHide: true,
                        format: 'DD-MM-YYYY',
                        zIndex: 999999999,
                    });


                    $("#acceptDateId").val(moment(me.dateNow).format("DD-MM-YYYY"));

                    $('#browseUnitBtnID').click(function () {
                        $("#plUnitListId tbody").html("");
                        $('#myModalBrowseUnitID').modal({
                            show: true
                        });
                    });

                    $('#generateBtnId').click(function () {
                        if ($("#totalPaymentID").val() !== '')
                        {
                            ApliJs.loadingbar().show("Loading jurnal detail...");
                            $.ajax({
                                method: "POST",
                                url: "cashier/installmentpayment/read/",
                                data: {
                                    mode_read: "generatetemplatecoa",
                                    payment_id: 0,
                                    kasbank_id: 0,
                                    template_id: me.templateCoa,
                                    amount: $("#totalPaymentID").val()
                                }
                            }).done(function (msg) {

                                ApliJs.loadingbar().hide();
                                if (msg) {
                                    me.jurnalData = msg.data;
                                    me.apliJsFuncformdata_modal().fillGridCoa(1, 999999, msg.data, "update", 1);
                                    me.setSumdetail();
                                } else {
                                    ApliJs.alert().error();
                                }
                            });
                        } else {

                            ApliJs.alert().warning("Silahkan isi payment terlebih dahulu");
                        }



                    });


                    $('#kasbankId').on('change', function () {
                        if (this.value == 'K') {
                            me.state = 'create';
                            $("#prefix_cash").show();
                            $("#prefix_banks").show();
                            $('#prefix_cash').prop('disabled', false);
                            $("#prefix_bank").hide();
                            $("#prefix_cashs").show();
                            $("#prefix_bank").attr("disabled", 'disabled');
                            $("#prefix_banks").hide();
                            $('#prefix_cash').prop('selectedIndex', 0);
                            me.setStorePrefix();
                        }
                        else {
                            me.state = 'create';
                            $("#prefix_bank").show();
                            $("#prefix_banks").show();
                            $('#prefix_bank').prop('disabled', false);
                            $("#prefix_cash").hide();
                            $("#prefix_cashs").hide();
                            $("#prefix_cash").attr("disabled", 'disabled');
                            $('#prefix_bank').prop('selectedIndex', 0);
                            me.setStorePrefixBank();
                        }
                    });

                    $('#prefix_cash').change(function () {
                        me.coa_id = null;
                        me.coa_id = $('option:selected', this).attr('coa_id');
                        $("#coa_id").val($('option:selected', this).attr('coa_id'));
                        $("#voucherprefix_id").val($('option:selected', this).attr('voucherprefix_id'));
                        $("#prefix_voucher").val($('option:selected', this).attr('prefix_voucher'));
                        me.generateVoucherno();
                    });

                    $('#prefix_bank').change(function () {
                        me.coa_id = null;
                        me.coa_id = $('option:selected', this).attr('coa_id');
                        $("#coa_id").val($('option:selected', this).attr('coa_id'));
                        $("#voucherprefix_id").val($('option:selected', this).attr('voucherprefix_id'));
                        $("#prefix_voucher").val($('option:selected', this).attr('prefix_voucher'));
                        me.generateVouchernoBank();
                    });

                    $("#paymethodID").change(function () {
                        if (this.value == '1') {
                            $("#payDateID").val(moment(me.accept_date).format("DD-MM-YYYY"));
                            $("#duedateID").val(moment(me.accept_date).format("DD-MM-YYYY"));
                            $("#cairdateID").val(moment(me.accept_date).format("DD-MM-YYYY"));
                        }
                    });

                    $("#receNoID").keyup(function () {
                        $("#refernoID").val(this.value);
                        $("#payNoID").val(this.value);
                    });
                    
                 
                    
                     


                    $('#myModal').on('shown.bs.modal', function () {

                        $('.x-region-collapsed-placeholder').css("z-index", 1);

                        ApliJs.form('#myModal form').initEvent();



                        /*
                         $('#datetimepicker1').datepicker({
                         language: 'pt-BR'
                         });
                         */

                    });



                    $('#formPaySaveId').click(function () {
                        $('#formPaySaveId').prop('disabled', true);

                        // console.log(me.paymentSes.scheduleAwal);
                        var detailSch = me.paymentSes.scheduleAwal;

                        var details = {
                            paymentdetail_id: [],
                            schedule_id: [],
                            paymenttype_id: [],
                            payment: [],
                            amount: [],
                            remaining_balance: [],
                            denda: [],
                            description: []
                        };

                        for (var i in detailSch) {
                            if (detailSch[i]['pay_new'] > 0) {
                                details.paymentdetail_id.push(0);
                                details.schedule_id.push(i);
                                details.paymenttype_id.push(0);
                                details.payment.push(detailSch[i]['pay_new']);
                                details.amount.push(detailSch[i]['amount']);
                                details.remaining_balance.push(detailSch[i]['rb_new']);
                                details.denda.push(detailSch[i]['denda_new']);
                                details.description.push(detailSch[i]['description']);
                            }

                        }

                        var detailCoa = me.jurnalData;

                        var detail_coa = {
                            amount: [],
                            coa_config_id: [],
                            coa_id: [],
                            coa_name: [],
                            code: [],
                            persen: [],
                            type: [],
                            description: [],
                            coa_config_detail_id: []
                        };

                        for (var a in detailCoa) {
                            detail_coa.amount.push(detailCoa[a].coaconfigdetail['amount']);
                            detail_coa.coa_config_id.push(detailCoa[a].coaconfigdetail['coa_config_id']);
                            detail_coa.coa_id.push(detailCoa[a].coaconfigdetail['coa_id']);
                            detail_coa.coa_name.push(detailCoa[a].coaconfigdetail['coa_name']);
                            detail_coa.code.push(detailCoa[a].coaconfigdetail['code']);
                            detail_coa.persen.push(detailCoa[a].coaconfigdetail['persen']);
                            detail_coa.type.push(detailCoa[a].coaconfigdetail['type']);
                            detail_coa.description.push(detailCoa[a].coaconfigdetail['description']);
                            detail_coa.coa_config_detail_id.push(detailCoa[a].coaconfigdetail['coa_config_detail_id']);
                        }




                        var dataPayment = $("#myModal form").serialize();



// if (me.jurnalData) {
//                                   
//                                    $("#myModal").modal('hide');
//                                    
//                                    
//                                } else 
                        // console.log($("#myModal form").serialize());
                               
                              var valid = false;  
                             
                                if ($("#purchaseletterId").val() == '') {
                                    ApliJs.alert().warning("Mohon pilih unit terlebih dahulu.");
                                  //  $('#formPaySaveId').prop('disabled', false);
                                }
                                else if ($("#novouceFinID").val() == '') {
                                    ApliJs.alert().warning("Error generate voucher number.");
                                  //  $('#formPaySaveId').prop('disabled', false);
                                } else if(Object.keys(me.jurnalData).length === 0) {
                                    ApliJs.alert().warning("Detail jurnal masih kosong.");
                               //     $('#formPaySaveId').prop('disabled', false);
                                } else {
                                    valid = true;
                                }
                                    
                        if(!valid){
                            
                            $('#formPaySaveId').prop('disabled', false);
                            return;
                        }
            
                        ApliJs.loadingbar().show("Sedang menyimpan...");
                        
                        $.ajax({
                            method: "POST",
                            url: "cashier/installmentpaymentsby/read/",
                            data: {mode_read: "save", data: dataPayment, details: JSON.stringify(details), detail_coa: JSON.stringify(detail_coa)}
                        }).done(function (msg) {
                            $('#formPaySaveId').prop('disabled', false);

                            ApliJs.loadingbar().hide();

                            if (!msg.STATUS) {
                                // alert(msg.MSG);
                                ApliJs.alert().warning(msg.MSG);
                            } else {
                                
                                    ApliJs.alert().success("Sukses simpan payment !");
                                    me.getGrid().getStore().loadPage(1);
                                     $("#myModal").modal('hide');
                                    
                            }

                        });
                        
                   
                        
                    });

                    $("#myModal form input[name=admin_fee]").blur(function () {
                        // $(this).val(accounting.formatMoney($(this).val()));
                        me.apliJsFuncformdatadetail_modal().hitung();
                    });

                    $("#myModal form select[name=paymentmethod_paymentmethod_id]").change(function () {
                        // $(this).val(accounting.formatMoney($(this).val()));
                        me.apliJsFuncformdatadetail_modal().hitung();
                    });

                     
                   

                });



            },
            loadSchedule: function (purchaeletterId) {
                var page = 1;
                var limit = 99999;
                var start = 0;

                var modalId = "rowScheduleList";
                var saya = this;



                ApliJs.loadingbar().show("Sedang memuat tagihan...");

                $.ajax({
                    method: "POST",
                    url: "cashier/installmentpaymentsby/read/",
                    data: {start: start, page: page, limit: limit, mode_read: "schedulelist", purchaseletter_id: purchaeletterId}
                }).done(function (msg) {
                    ApliJs.loadingbar().hide();
                    var units = msg["DATA"][1];
                    var totalData = msg["DATA"][0][0]["totalRow"];
                    var totalPage = 0;
                    if (totalData > 0) {
                        totalPage = Math.ceil(totalData / limit);
                    }

                    // console.log(msg);
                    /*
                     var rows = "";
                     var count = (page * limit) - limit + 1;
                     
                     me.paymentSes.scheduleAwal = {};
                     
                     for (var i in units) {
                     var disabledButton = "";
                     disabledButton = units[i]["remaining_balance"] < units[i]["amount"] ? "disabled='disabled'" : "";
                     rows += "<tr schedule_id='" + units[i]["schedule_id"] + "' scheduletype_description='" + units[i]["scheduletype_description"] + "' >" +
                     "<td style='width:30px;'>" + count + "</td>" +
                     "<td style='width:100px;'>" + moment(units[i]["duedate"]).format("DD-MM-YYYY") + "</td>" +
                     "<td style='width:100px;'>" + units[i]["scheduletype_scheduletype"] + "</td>" +
                     "<td style='width:100px;' dataIndex='termin'>" + units[i]["termin"] + "</td>" +
                     "<td style='width:100px;' dataIndex='amount'>" + accounting.formatMoney(units[i]["amount"]) + "</td>" +
                     "<td style='width:115px;' dataIndex='remaining_balance'>" + accounting.formatMoney(units[i]["remaining_balance"]) + "</td>" +
                     "<td style='width:100px;' dataIndex='payment_payment'>" + accounting.formatMoney(units[i]["payment_payment"]) + "</td>" +
                     "<td style='width:100px;'>" + accounting.formatMoney(units[i]["denda"]) + "</td>" +
                     "<td><button class='btn btn-primary btn-sm select_unit' action='pay' schedule_id='" + units[i]["schedule_id"] + "' " + disabledButton + ">bayar</button>" +
                     "</td>" +
                     "</tr>";
                     
                     me.paymentSes.scheduleAwal[units[i]["schedule_id"]] = {rb: units[i]["remaining_balance"], pay: units[i]["payment_payment"], pay_new: 0.0, rb_new: 0.0, denda_new: 0.0, amount: units[i]["amount"], description: ''};
                     
                     count++;
                     }
                     
                     $("#ipScheduleList tbody").html(rows);
                     */
                    me.apliJsFuncformdata_modal().fillGrid(page, limit, units, "create");


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


                    $("#ipScheduleList button[action=pay]").click(function (event) {
                        event.preventDefault();
                        var scheduleId = $(this).attr("schedule_id");
                        ///   console.log(scheduleId);
                        /*
                         var amount = $(this).parent().parent().find("td[dataIndex='amount']");
                         var payment = $(this).parent().parent().find("td[dataIndex='payment_payment']");
                         
                         payment.text(amount.text());
                         */
                        $('#myModalFormDetail').modal({
                            show: true
                        });

                        var mFormDetail = "myModalFormDetail";

                        $("#" + mFormDetail + " input[name=schedule_id]").val(scheduleId);
                        $("#" + mFormDetail + " input[name=amount]").val($(this).parent().parent().find("td[dataIndex='amount']").text());
                        $("#" + mFormDetail + " input[name=remaining_balance]").val($(this).parent().parent().find("td[dataIndex='remaining_balance']").text());
                        //$("#" + mFormDetail + " input[name=payment_payment]").val($(this).parent().parent().find("td[dataIndex='payment_payment']").text());
                        $("#" + mFormDetail + " input[name=payment_payment]").val($(this).parent().parent().find("td[dataIndex='new_payment']").text());


                    });

                    $("#ipScheduleList button[action='edit]").click(function (event) {
                        event.preventDefault();
                        var scheduleId = $(this).attr("schedule_id");
                        // console.log(scheduleId);
                        var schedule = $(this).parent().parent().find("td[dataIndex='amount']");

                        // console.log(schedule.text());



                    });



                });
            },
            fillGrid: function (page, limit, data, mode) {
                var units = data;
                var rows = "";
                var count = (page * limit) - limit + 1;

                me.paymentSes.scheduleAwal = {};

                for (var i in units) {
                    var disabledButton = "";
                    disabledButton = units[i]["remaining_balance"] <= 0 ? "disabled='disabled'" : "";
                    var disabledButtonEl = "&nbsp;";
                    if (mode === "create") {
                        disabledButtonEl = "<button class='btn btn-primary btn-sm select_unit' action='pay' schedule_id='" + units[i]["schedule_id"] + "' " + disabledButton + ">bayar</button>";

                    }
                    rows += "<tr schedule_id='" + units[i]["schedule_id"] + "' scheduletype_description='" + units[i]["scheduletype_description"] + "' >" +
                            "<td style='width:30px;'>" + count + "</td>" +
                            "<td style='width:100px;'>" + moment(units[i]["duedate"]).format("DD-MM-YYYY") + "</td>" +
                            "<td style='width:100px;'>" + units[i]["scheduletype_scheduletype"] + "</td>" +
                            "<td style='width:100px;' dataIndex='termin'>" + units[i]["termin"] + "</td>" +
                            "<td style='width:100px;' dataIndex='amount'>" + accounting.formatMoney(units[i]["amount"]) + "</td>" +
                            "<td style='width:115px;' dataIndex='remaining_balance'>" + accounting.formatMoney(units[i]["remaining_balance"]) + "</td>" +
                            "<td style='width:100px;' dataIndex='payment_payment'>" + accounting.formatMoney(units[i]["payment_payment"]) + "</td>" +
                            "<td style='width:100px;' dataIndex='new_payment'>" + accounting.formatMoney(0) + "</td>" +
                            "<td style='width:100px;'>" + accounting.formatMoney(units[i]["denda"]) + "</td>" +
                            "<td>" + disabledButtonEl +
                            "</td>" +
                            "</tr>";

                    me.paymentSes.scheduleAwal[units[i]["schedule_id"]] = {rb: units[i]["remaining_balance"], pay: units[i]["payment_payment"], pay_new: 0.0, rb_new: 0.0, denda_new: 0.0, amount: units[i]["amount"], description: ''};

                    count++;
                }

                $("#ipScheduleList tbody").html(rows);
            },
            fillGridCoa: function (page, limit, data, mode, is_generate) {
                var units = data;
                var rows = "";
                var count = (page * limit) - limit + 1;
                var count2 = 1;
                //console.log(units);
                me.paymentSes.coaAwal = {};

                if (is_generate) {
                    //coaconfigdetail
                    for (var i in units) {
                        var disabledButton = "";
                        disabledButton = units[i].coaconfigdetail["remaining_balance"] <= 0 ? "disabled='disabled'" : "";
                        var disabledButtonEl = "&nbsp;";
                        if (mode === "create") {
                            disabledButtonEl = "<button class='btn btn-primary btn-sm select_unit' action='pay' coa_config_detail_id='" + units[i].coaconfigdetail["coa_config_detail_id"] + "' " + disabledButton + ">bayar</button>";

                        }
                        rows += "<tr coa_config_detail_id='" + units[i].coaconfigdetail["coa_config_detail_id"] + "'  >" +
                                "<td style='width:30px;'>" + count2 + " </td>" +
                                "<td style='width:100px; dataIndex='code'>" + units[i].coaconfigdetail["code"] + "</td>" +
                                "<td style='width:200px; dataIndex='coa_name'>" + units[i].coaconfigdetail["coa_name"] + "</td>" +
                                "<td style='width:100px; dataIndex='type'>" + units[i].coaconfigdetail["type"] + "</td>" +
                                "<td style='width:100px; dataIndex='description'>" + me.replaceNull(units[i].coaconfigdetail["description"], '') + "</td>" +
                                "<td style='width:120px; dataIndex='persen'>" + units[i].coaconfigdetail["persen"] + "</td>" +
                                "<td style='width:100px; dataIndex='amount' class='abcmoney'>" + accounting.formatMoney(units[i].coaconfigdetail["amount"]) + "</td>" +
                                "<td>" + disabledButtonEl +
                                "</td>" +
                                "</tr>";

                        //me.paymentSes.coaAwal[units[i]["schedule_id"]] = {rb: units[i]["remaining_balance"], pay: units[i]["payment_payment"], pay_new: 0.0, rb_new: 0.0, denda_new: 0.0, amount: units[i]["amount"], description: ''};

                        count2++;
                    }
                } else {
                    for (var i in units) {
                        var disabledButton = "";
                        disabledButton = units[i]["remaining_balance"] <= 0 ? "disabled='disabled'" : "";
                        var disabledButtonEl = "&nbsp;";
                        if (mode === "create") {
                            disabledButtonEl = "<button class='btn btn-primary btn-sm select_unit' action='pay' coa_config_detail_id='" + units[i]["coa_config_detail_id"] + "' " + disabledButton + ">bayar</button>";

                        }
                        rows += "<tr coa_config_detail_id='" + units[i]["coa_config_detail_id"] + "'  >" +
                                "<td  style='width:30px;'>" + count + "</td>" +
                                "<td style='width:150px;' dataIndex='code'>" + units[i]["code"] + "</td>" +
                                "<td style='width:200px;' dataIndex='coa_name'>" + units[i]["coa_name"] + "</td>" +
                                "<td style='width:100px;' dataIndex='description'>" + units[i]["description"] + "</td>" +
                                "<td style='width:100px;' dataIndex='persen'>" + units[i]["persen"] + "</td>" +
                                "<td style='width:100px;' dataIndex='amount'>" + units[i]["amount"] + "</td>" +
                                "<td>" + disabledButtonEl +
                                "</td>" +
                                "</tr>";

                        //me.paymentSes.coaAwal[units[i]["schedule_id"]] = {rb: units[i]["remaining_balance"], pay: units[i]["payment_payment"], pay_new: 0.0, rb_new: 0.0, denda_new: 0.0, amount: units[i]["amount"], description: ''};

                        count++;
                    }
                }

                $("#ipJurnalList tbody").html(rows);
            }
        };

        return x;

    },
    replaceNull: function (string, replace) {
        if (string) {
            return string;
        } else {
            return replace;
        }
    },
    apliJsFuncbrowse_unit_modal: function () {
        var me = this;
        var x = {
            afterRender: function () {
                var me2 = this;

                var modalId = "myModalBrowseUnitID";

                $('#' + modalId).on('shown.bs.modal', function () {

                    me.apliJsFuncbrowse_unit_modal().loadData(1, 25, 0);

                    $("#" + modalId + " button[name=submit_search]").click(function (event) {
                        event.preventDefault();
                        $("#" + modalId + " button[name=submit_search]").prop('disabled', true);
                        me.apliJsFuncbrowse_unit_modal().loadData(1, 25, 0);


                    });

                    $("#" + modalId + " button[name=submit_reset]").click(function (event) {
                        event.preventDefault();
                        $("#" + modalId + " input[name=unit_number]").val("");
                        $("#" + modalId + " button[name=submit_search]").prop('disabled', true);
                        me.apliJsFuncbrowse_unit_modal().loadData(1, 25, 0);


                    });

                    /// update paging info
                    $("#" + modalId + " .mysuper_paging a.next").click(function (event) {
                        event.preventDefault();

                        var currentPage = parseInt($("#" + modalId + " .mysuper_paging span.current_page").text());
                        var totalPage = parseInt($("#" + modalId + " .mysuper_paging span.total_page").text());
                        if (currentPage < totalPage) {
                            $("#" + modalId + " button[name=submit_search]").prop('disabled', true);
                            var nextPage = currentPage + 1;
                            me.apliJsFuncbrowse_unit_modal().loadData(nextPage, 25, (nextPage - 1) * 25);
                        }

                    });

                    $("#" + modalId + " .mysuper_paging a.prev").click(function (event) {
                        event.preventDefault();

                        var currentPage = parseInt($("#" + modalId + " .mysuper_paging span.current_page").text());
                        if (currentPage > 1) {
                            $("#" + modalId + " button[name=submit_search]").prop('disabled', true);
                            // console.log(currentPage);
                            // console.log((currentPage - 2) * 25);
                            var nextPage = currentPage - 1;
                            me.apliJsFuncbrowse_unit_modal().loadData(nextPage, 25, (nextPage - 1) * 25);
                        }

                    });

                    $("#" + modalId + " .mysuper_paging a.last").click(function (event) {
                        event.preventDefault();

                        var lastPage = parseInt($("#" + modalId + " .mysuper_paging span.total_page").text());
                        if (lastPage > 0) {
                            $("#" + modalId + " button[name=submit_search]").prop('disabled', true);
                            var nextPage = lastPage;
                            me.apliJsFuncbrowse_unit_modal().loadData(nextPage, 25, (nextPage - 1) * 25);
                        }

                    });

                    $("#" + modalId + " .mysuper_paging a.first").click(function (event) {
                        event.preventDefault();

                        var lastPage = parseInt($("#" + modalId + " .mysuper_paging span.total_page").text());
                        if (lastPage > 0) {
                            $("#" + modalId + " button[name=submit_search]").prop('disabled', true);
                            var nextPage = 1;
                            me.apliJsFuncbrowse_unit_modal().loadData(nextPage, 25, (nextPage - 1) * 25);
                        }

                    });

                    /// update paging info


                });

            },
            loadData: function (page, limit, start) {
                var modalId = "myModalBrowseUnitID";
                var saya = this;
                ApliJs.loadingbar().show("Sedang memuat daftar unit...");
                $.ajax({
                    method: "POST",
                    url: "cashier/installmentpaymentsby/read/",
                    data: {start: start, page: page, limit: limit, mode_read: "soldunitlist", unit_number: $("#" + modalId + " input[name=unit_number]").val()}
                }).done(function (msg) {
                    $("#" + modalId + " button[name=submit_search]").prop('disabled', false);
                    //console.log(msg);

                    ApliJs.loadingbar().hide();

                    var units = msg["DATA"][1];
                    var totalData = msg["DATA"][0][0]["totalRow"];
                    var totalPage = 0;
                    if (totalData > 0) {
                        totalPage = Math.ceil(totalData / limit);
                    }

                    // console.log(msg);
                    var rows = "";
                    var count = (page * limit) - limit + 1;

                    for (var i in units) {
                        rows += "<tr purchaseletter_id='" + units[i]["purchaseletter_id"] + "'>" +
                                "<td style='width:30px;'>" + count + "</td>" +
                                "<td style='width:80px;'>" + units[i]["unit_number"] + "</td>" +
                                "<td style='width:100px;'>" + units[i]["cluster_code"] + "</td>" +
                                "<td style='width:100px;'>" + units[i]["type_name"] + "</td>" +
                                "<td><button class='btn btn-primary btn-sm select_unit' purchaseletter_id='" + units[i]["purchaseletter_id"] + "'>select</button></td>" +
                                "</tr>";
                        count++;
                    }

                    $("#plUnitListId tbody").html(rows);


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


                    $("#plUnitListId button.select_unit").click(function (event) {
                        event.preventDefault();
                        var plId = $(this).attr("purchaseletter_id");
                        // me.unitSelectviaApli(unitId);
                        //$("#" + modalId).hide();
                        $('#' + modalId).modal('hide');

                        me.apliJsFuncformdata_modal().loadSchedule(plId);

                        ApliJs.loadingbar().show("Sedang mengambil informasi detail unit..");

                        $.ajax({
                            method: "POST",
                            url: "cashier/installmentpaymentsby/read/",
                            data: {mode_read: "selectedsoldunit", purchaseletter_id: plId}
                        }).done(function (msg) {

                            ApliJs.loadingbar().hide();

                            //  console.log(msg);
                            me.myParams.paymentteks = msg.PAYMENT_TEKS;
                            me.myParams.global = msg.GLOBALPARAMS;


                            var paymentMethods = msg.PAYMENTMETHOD[1];
                            var pl = msg.DATA[1][0];
                            me.pt_id = pl['pt_pt_id'];
                            // console.log(me.pt_id);
                            var modalId = "myModal";

                            // fill combobox
                            $("#paymethodID").append('<option>-</option>');
                            for (var p in paymentMethods) {

                                $('#' + modalId + ' select[name=paymentmethod_paymentmethod_id]').append($("<option></option>").attr("value", paymentMethods[p]['paymentmethod_id']).text(paymentMethods[p]['paymentmethod']));
                            }



                            for (var i in pl) {
                                // console.log(pl[i]);
                                $("#" + modalId + " input[name='" + i + "']").val(pl[i]);

                            }

                            $("#" + modalId + " textarea[name='customer_address']").text(pl["customer_address"]);
                            $("#" + modalId + " input[name='purchaseletter_rencana_serahterima_date']").val(moment(pl["rencana_serahterima_date"]).format("DD-MM-YYYY"));
                            $("#" + modalId + " input[name='purchaseletter_harga_total_jual']").val(accounting.formatMoney(pl["harga_total_jual"]));
                            $("#" + modalId + " input[name='purchaseletter_purchaseletter_no']").val(pl["purchaseletter_no"]);
                            $("#" + modalId + " input[name='purchaseletter_purchase_date']").val(moment(pl["purchase_date"]).format("DD-MM-YYYY"));


                            //cashier load

                            me.setStoreGroup();
                            me.state = 'create';
                            me.generateTransno();
                            me.setStoreDepartment();


                        });
                        //  console.log(plId);

                    });



                });
            }
        };

        return x;

    },
    paymentSes: {
        scheduleAwal: {},
        coaAwal: {},
    },
    apliJsFuncformdatadetail_modal: function () {
        var me = this;
        var x = {
            afterRender: function () {
                var me2 = this;

                var modalId = "myModalFormDetail";

                $('#' + modalId).on('shown.bs.modal', function () {


                });




                $("#submitPayId").click(function (event) {
                    event.preventDefault();

                    me.apliJsFuncformdatadetail_modal().hitung();

                });

                $("#" + modalId + " input[name='payment_payment']").blur(function () {
                    $(this).val(accounting.formatMoney($(this).val()));
                });

                $("#" + modalId + " input[name='payment_payment']").focus(function () {
                    $(this).val(accounting.unformat($(this).val()));
                });
                
                
                $("#fullPaymentId").click (function() {  
                     $("#" + modalId + " input[name='payment_payment']").val($("#remainingbalanceID").val());                
                });
                
                $("#halfPaymentId").click (function() {  
                     var remain = accounting.unformat($("#remainingbalanceID").val());
                     $("#" + modalId + " input[name='payment_payment']").val(accounting.format(remain/2));
                });

            },
            hitung: function () {
                var modalId = "myModalFormDetail";
                var modalMasterID = "myModal";

                var scheduleId = $('#' + modalId + ' input[name="schedule_id"]').val();

                var tr = $("#ipScheduleList").find("tr[schedule_id='" + scheduleId + "']");

                var pay = accounting.unformat($('#' + modalId + ' input[name="payment_payment"]').val());
                var rb = me.paymentSes.scheduleAwal[scheduleId]['rb'];

                rb = rb - pay;

                // tr.find("td[dataIndex='payment_payment']").text(accounting.formatMoney(pay));
                tr.find("td[dataIndex='new_payment']").text(accounting.formatMoney(pay));
                tr.find("td[dataIndex='remaining_balance']").text(accounting.formatMoney(rb));


                me.paymentSes.scheduleAwal[scheduleId]['pay_new'] = pay;
                me.paymentSes.scheduleAwal[scheduleId]['rb_new'] = rb;

                var totalPay = 0;
                for (var i in me.paymentSes.scheduleAwal) {
                    totalPay += me.paymentSes.scheduleAwal[i]['pay_new'];
                }

                var admFee = accounting.unformat($('#' + modalMasterID + ' input[name="admin_fee"]').val());




                $('#' + modalId).modal('hide');

                $('#' + modalMasterID + ' input[name="payment"]').val(accounting.formatMoney(totalPay));
                $('#' + modalMasterID + ' input[name="total_payment"]').val(accounting.formatMoney(admFee + totalPay));

                me.generateNote(scheduleId);
            }

        };

        return x;

    },
    generateNote: function (scheduleId) {
        var me = this;

        var stText = '';
        /// get list schedule type yang dibayar
        // var s = me.getTagihangrid().getStore();
        var pay = 0;
        var rb = 0;
        var rbNew = 0;
        var payBaru = 0;
        var a = 0; // amount
        var modalId = "myModal";
        // console.log(me.paymentSes.scheduleAwal);
        for (var i in me.paymentSes.scheduleAwal) {
            var tr = $("#ipScheduleList").find("tr[schedule_id='" + scheduleId + "']");
            //  var rec = s.getAt(me.effectedSch[i]);
            var addText = "";
            pay = 0;
            rb = 0;

            var payVal = me.paymentSes.scheduleAwal[i]['pay_new'];

            if (payVal > 0) {
                //  payBaru = me.tools.floatval(rec.get("payment_payment"));
                rbNew = me.paymentSes.scheduleAwal[i]['rb_new'];
                // a = me.tools.floatval(rec.get("amount"));

                /// jika dia membayar tapi tidak melunasi maka TAMBAHAN SEBAGIAN
                /// jika dia membayar full dari 0 maka tidak ada text [x]
                // jika dia membayar full yang sudah terbayar maka TAMBAHAN
                // jika dia membayar tapi tidak melunasi dari yang sudah terbayar makan SEBAGIAN


                // cek nilai tagihan sebelum edit
                // console.log( me.tagihanDefaultValue);
                /*
                 for (var j in me.tagihanDefaultValue) {
                 if (me.tagihanDefaultValue[j]['id'] === rec.get("schedule_id")) {
                 pay = me.tagihanDefaultValue[j]['pay'];
                 }
                 }
                 */

                pay = payVal;




                if (rbNew === 0) {
                    if (pay === 0) {
                        addText = "";

                    } else {
                        addText = me.myParams.paymentteks.TAMBAHAN;
                    }

                } else {
                    if (pay === 0) {
                        addText = me.myParams.paymentteks.SEBAGIAN;
                    } else {
                        addText = me.myParams.paymentteks.TAMBAHAN_SEBAGIAN;
                    }

                }


                stText += addText + " " + tr.attr("scheduletype_description") + " " + tr.find("td[dataIndex='termin']").text() + ", ";

            }

        }

        var isAddReferenceToNote = me.tools.intval(me.myParams.global.PAYMENT_REFERENCENO_ADDTONOTES);

        //paymentmethod_paymentmethod_id
        var str = ' ' + stText + ' ';
        str += ' ' + $("#" + modalId + " input[name=type_name]").val();
        str += ' ' + $("#" + modalId + " select[name=paymentmethod_paymentmethod_id]").find('option:selected').text() + ' . ';
        if (isAddReferenceToNote > 0) {
            str += ' ' + $("#" + modalId + " input[name=reference_no]").val() + ' ';
        }
        str += ' ' + $("#" + modalId + " input[name=payment_date]").val() + ' ';
        str += ' Rp. ' + $("#" + modalId + " input[name=payment]").val() + ',- ';
        str += ' ' + $("#" + modalId + " input[name=cluster_cluster]").val();
        str += ' ' + $("#" + modalId + " input[name=unit_unit_number]").val();
        str += ' ' + $("#" + modalId + " input[name=pt_name]").val();



        $("#" + modalId + " textarea[name=note]").val(str);


    },
    waitingDialog: (function ($) {
        'use strict';

        // Creating modal dialog's DOM
        var $dialog = $(
                '<div class="modal fade" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-hidden="true" style="padding-top:15%; overflow-y:visible;">' +
                '<div class="modal-dialog modal-m">' +
                '<div class="modal-content">' +
                '<div class="modal-header"><h3 style="margin:0;"></h3></div>' +
                '<div class="modal-body">' +
                '<div class="progress progress-striped active" style="margin-bottom:0;"><div class="progress-bar" style="width: 100%"></div></div>' +
                '</div>' +
                '</div></div></div>');

        return {
            /**
             * Opens our dialog
             * @param message Custom message
             * @param options Custom options:
             * 				  options.dialogSize - bootstrap postfix for dialog size, e.g. "sm", "m";
             * 				  options.progressType - bootstrap postfix for progress bar type, e.g. "success", "warning".
             */
            show: function (message, options) {
                // Assigning defaults
                if (typeof options === 'undefined') {
                    options = {};
                }
                if (typeof message === 'undefined') {
                    message = 'Loading';
                }
                var settings = $.extend({
                    dialogSize: 'm',
                    progressType: '',
                    onHide: null // This callback runs after the dialog was hidden
                }, options);

                // Configuring dialog
                $dialog.find('.modal-dialog').attr('class', 'modal-dialog').addClass('modal-' + settings.dialogSize);
                $dialog.find('.progress-bar').attr('class', 'progress-bar');
                if (settings.progressType) {
                    $dialog.find('.progress-bar').addClass('progress-bar-' + settings.progressType);
                }
                $dialog.find('h3').text(message);
                // Adding callbacks
                if (typeof settings.onHide === 'function') {
                    $dialog.off('hidden.bs.modal').on('hidden.bs.modal', function (e) {
                        settings.onHide.call($dialog);
                    });
                }
                // Opening dialog
                $dialog.modal();
            },
            /**
             * Closes dialog
             */
            hide: function () {
                $dialog.modal('hide');
            }
        }

    }),
    setStoreGroup: function () {
        var me, store, form;
        me = this;
        store = me.getStore("Grouptransaction");
        store.load({
            params: {
                "hideparam": 'default',
                "project_id": apps.project,
                "pt_id": me.pt_id,
                "start": 0,
                "limit": 1000,
            },
            callback: function (records, operation, success) {
                if (records) {
                    //console.log(records);
                    $("#groupTransId").removeAttr('disabled');
                    var rows = "";
                    for (var i in records) {
                        rows += "<option value=" + records[i].data['grouptrans_id'] + ">" + records[i].data['code'] + "</option>";
                    }
                    $("#groupTransId").html(rows);
                }
            }
        });
    },
    generateTransno: function () {
        var me, form, accept_date;
        me = this;
        accept_date = moment($("#acceptDateId").val(), "DD-MM-YYYY").format("YYYY-MM-DD");

        switch (me.state) {
            case 'create':
                me.senddata = {
                    "hideparam": 'gettransnocash',
                    "project_id": apps.project,
                    "pt_id": me.pt_id,
                    "accept_date": accept_date,
                }
                me.urlrequest = me.urlcommon;
                me.AjaxRequest();
                break;
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
    AjaxRequest: function (param) {
        var me;
        me = this;
        ApliJs.loadingbar().show("Mohon tunggu...");

        Ext.Ajax.request({
            url: me.urlrequest,
            method: 'POST',
            timeout: 45000000,
            params: {
                data: Ext.encode(me.senddata)
            },
            success: function (response) {
                ApliJs.loadingbar().hide();
                try
                {
                    me.info = Ext.JSON.decode(response.responseText);
                    me.setSuccessEvent();
                }
                catch (err)
                {
                    if(param == 'cash' || param == 'bank') {
                        ApliJs.alert().error('Error voucher number not generated');
                    }
                    else {
                        ApliJs.alert().error();
                    }
                }


                


            },
            failure: function (response) {
                ApliJs.alert().error();
            }
        });
    },
    setSuccessEvent: function () {
        var me, data, form, tmp_prefix, countlength, flag_tmp, idheader, value;
        me = this;
        data = me.info.data;
        //console.log(me.info.parameter);
        switch (me.info.parameter) {
            case 'gettransnocash':
                $("#trans_no").val(me.info.total);
                break;
            case 'generatevouchernocash':
                $("#novouceFinID").val(data);
                break;
            case 'generatevouchernobank':
                $("#novouceFinID").val(data);
                break;
            case 'getptbyuser':
                //form.down("[name=pt_pt_id]").setValue(data[0]['pt_id']);
                break;
        }
    },
    setStoreDepartment: function () {
        var me, store, form;
        me = this;
        store = me.getStore("Deptprefixcombo");
        store.load({
            params: {
                "hideparam": 'getdepartmentprefix',
                "project_id": apps.project,
                "pt_id": me.pt_id,
                "start": 0,
                "limit": 1000,
            },
            callback: function (records, operation, success) {
                if (records) {
                    //console.log(records);
                    $("#departementId").removeAttr('disabled');
                    var rows = "";
                    for (var i in records) {
                        //console.log(records);
                        rows += "<option value=" + records[i].data['department_id'] + ">" + records[i].data['department'] + "</option>";
                    }
                    $("#departementId").html(rows);
                }
            }
        });
    },
    setSumIntransaction: function (store) {
        var me, form, amountheader, sum, total;
        me = this;
        //form = me.getFormdata();
        if (me.is_out == '0') {
            amountheader = accounting.unformat($("#totalPaymentID").val());
        } else {
            amountheader = 0;
        }
        sum = 0;
        //console.log(me.jurnalData);

        $.each(me.jurnalData, function (index) {
            $.each(me.jurnalData[index], function (key, value) {
                if (value['type'] == 'I') {
                    sum += value['amount'];
                }
            });
        });

        //console.log(sum);
        total = parseFloat(amountheader) + parseFloat(sum);
        return total;
    },
    setSumOuttransaction: function (store) {
        var me, form, amountheader, sum, total, store;
        me = this;
        //form = me.getFormdata();

        if (me.is_out == '0') {
            amountheader = accounting.unformat($("#totalPaymentID").val());
        } else {
            amountheader = 0;
        }

        sum = 0;
        $.each(me.jurnalData, function (index) {
            $.each(me.jurnalData[index], function (key, value) {
                if (value['type'] == 'O') {
                    sum += value['amount'];
                }
            });
        });
        total = parseFloat(amountheader) + parseFloat(sum);
        return total;
    },
    setTotaldetail: function (store) {
        var me, form, amountheader, sum_in, sum_out, total;
        me = this;
        sum_in = sum_out = 0;


        $.each(me.jurnalData, function (index) {
            $.each(me.jurnalData[index], function (key, value) {
                if (value['type'] == 'I') {
                    sum_in += value['amount'];
                }
                if (value['type'] == 'O') {
                    sum_out += value['amount'];
                }
            });
        });

        if (me.is_out == '0') {
            total = parseFloat(sum_out) - parseFloat(sum_in);
        } else {
            total = parseFloat(sum_in) - parseFloat(sum_out);
        }

        return total;

    },
    setSumdetail: function () {
        var me, store, form, totalheader, totaldetail, balance, msgdata, status, voucher_no, stateform = '';
        me = this;
        //store = me.getDetailcoagrid().getStore();
        totalheader = accounting.unformat($("#totalPaymentID").val());


        total_in = me.setSumIntransaction(me.jurnalData);
        total_out = me.setSumOuttransaction(me.jurnalData);



        totaldetail = me.setTotaldetail(me.jurnalData);


//        if (totaldetail < 1 && stateform == 'update') {
//            totaldetail = me.paramcoadetail.totaldetail;
//        }

        //voucher_no = (form.down('[name=voucher_no]').getValue() == 'undefined') ? 'test' : form.down('[name=voucher_no]').getValue();
        balance = totalheader - totaldetail;
//        if(me.is_out == '0') {
//             balance = (parseFloat(total_in)-parseFloat(total_out)); 
//        }
//        else {
//           balance = (parseFloat(total_out)-parseFloat(total_in));
//        }


        $("#headerId").val(accounting.formatMoney(totalheader));
        $("#detailId").val(accounting.formatMoney(totaldetail));
        $("#balanceId").val(accounting.formatMoney(balance));



    },
    generateVoucherno: function () {
        var me, form, accept_date;
        me = this;
        //form = me.getFormdata();
        accept_date = moment($("#acceptDateId").val(), "DD-MM-YYYY").format("YYYY-MM-DD");
        switch (me.state) {
            case 'create':
                me.senddata = {
                    "hideparam": 'generatevouchernocash',
                    "param_date": accept_date,
                    "project_id": apps.project,
                    "pt_id": me.pt_id,
                    "module": 'KAS',
                    "prefix": $("#prefix_voucher").val(),
                    "flag": me.flaggeneratevoucherno,
                }
                me.urlrequest = me.urlcommon;
                me.AjaxRequest('cash');
                break;
        }
    },
    generateVouchernoBank: function () {
        var me, form, accept_date;
        me = this;
        //form = me.getFormdata();
        accept_date = moment($("#acceptDateId").val(), "DD-MM-YYYY").format("YYYY-MM-DD");
        switch (me.state) {
            case 'create':
                me.senddata = {
                    "hideparam": 'generatevouchernobank',
                    "param_date": accept_date,
                    "project_id": apps.project,
                    "pt_id": me.pt_id,
                    "module": 'BANK',
                    "prefix": $("#prefix_voucher").val(),
                    "flag": me.flaggeneratevoucherno,
                }
                me.urlrequest = me.urlcommon;
                me.AjaxRequest('bank');
                break;
        }
    },
    setStorePrefix: function (kasbank) {
        var me, store, form, in_out;
        me = this;
        //form = me.getFormdata();
        in_out = me.in_out;
        store = me.getStore("Voucherprefixsetupcombo");
        ApliJs.loadingbar().show("Please wait...");
        store.load({
            params: {
                "hideparam": 'getvoucherprefixsetupv2',
                "project_id": apps.project,
                "pt_id": me.pt_id,
                "start": 0,
                "limit": 1000,
            },
            callback: function (records, operation, success) {
                store.clearFilter(true);
                if (records) {
                    var rows = "";
                    rows = "<option value=''>-</option>";
                    for (var i in records) {
                        rows += "<option voucherprefix_id =" + records[i].data['voucherprefix_id'] + " prefix_voucher =" + records[i].data['prefix'] + " coa_id=" + records[i].data['coa_id'] + " value=" + records[i].data['prefix_id'] + ">" + records[i].data['prefix'] + " (" + records[i].data['coa'] + ")</option>";
                    }
                    $("#prefix_cash").html(rows);
                }
                ApliJs.loadingbar().hide();
            }
        });
    },
    setStorePrefixBank: function (bank) {
        var me, store, form, in_out;
        me = this;
        //form = me.getFormdata();
        in_out = me.in_out;
        store = me.getStore("Voucherprefixsetupcombo");
        ApliJs.loadingbar().show("Please wait...");
        store.load({
            params: {
                "hideparam": 'getvoucherprefixsetupv2bank',
                "project_id": apps.project,
                "pt_id": me.pt_id,
                "start": 0,
                "limit": 1000,
            },
            callback: function (records, operation, success) {
                store.clearFilter(true);
                
                if (records) {
                    var rows = "";
                    rows = "<option value=''>-</option>";
                    for (var i in records) {
                        rows += "<option voucherprefix_id =" + records[i].data['voucherprefix_id'] + " prefix_voucher =" + records[i].data['temp_prefix'] + "  coa_id=" + records[i].data['coa_id'] + " value=" + records[i].data['prefix_id'] + ">" + records[i].data['prefix'] + " (" + records[i].data['coa'] + ")</option>";
                    }
                    $("#prefix_bank").html(rows);
                }
                
                ApliJs.loadingbar().hide();
            }
        });



    },
});