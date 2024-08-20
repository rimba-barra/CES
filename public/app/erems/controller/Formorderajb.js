Ext.define('Erems.controller.Formorderajb', {
    extend: 'Erems.library.template.controller.Controllerstimulsoft', //Controller2
    alias: 'controller.Formorderajb',
    requires: [
        'Erems.library.ModuleTools',
        'Erems.library.Browse',
        'Erems.library.box.Config',
        'Erems.library.box.tools.Tools',
        'Erems.template.ComboBoxFields',
        'Erems.library.box.tools.EventSelector',
        'Erems.library.XyReport'
    ],
    views: ['formorderajb.Panel', 'formorderajb.Grid', 'formorderajb.FormSearch'],
    refs: [
        {
            ref: 'grid',
            selector: 'formorderajbgrid'
        },

        {
            ref: 'panel',
            selector: 'formorderajbpanel'
        },
        {
            ref: 'formsearch',
            selector: 'formorderajbformsearch'
        }

    ],
    controllerName: 'formorderajb',
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
    bindPrefixName: 'Formorderajb',
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
    reportFileView : null,
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
            'formorderajbpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender

            },
            'formorderajbgrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange
            },
            'formorderajbgrid toolbar button[action=create]': {
                click: function () {
                    // me.showFormdata("create");
                    var params = {};
                    ApliJs.showHtml(me, "formdata_modal", params, 'create');
                }
            },
            'formorderajbgrid toolbar button[action=update]': {
                click: function () {
                    var params = {};
                    ApliJs.showHtml(me, "formdata_modal", params, 'update');
                    //  me.showFormdata("update");
                }
            },
            'formorderajbformsearch button[action=search]': {
                click: this.dataSearch
            },
            'formorderajbformsearch button[action=reset]': {
                click: this.dataReset
            },
            'formorderajbgrid toolbar button[action=destroy]': {
                click: function () {
                    me.deleteData();
                }
            },
            'formorderajbgrid toolbar button[action=printx]': {
                click: function () {
                    //me.showPdf();
					me.processReport();
                }
            },

        });
    },
    deleteData: function () {
        var me = this;
        var rec = me.getGrid().getSelectionModel().getSelection();

        if (rec.length > 0) {
            
            if (rec.length == 1) {
                var msg = 'Delete ' + rec[0].get("formorderajb_no") + '?';
            } else {
                var msg = 'This action will delete ' + rec.length + ' records.<br />Continue ?';
            }

            Ext.Msg.confirm('Delete Data', msg, function (btn) {
                if (btn == 'yes') {
                    ApliJs.loadingbar().show("Menghapus form order ajb...");
                    
                    for (var i = 0; i < rec.length; i++) {
                        var formorderajb_id = rec[i].get("formorderajb_id");
                        $.ajax({
                            method: "POST",
                            url: "erems/formorderajb/read/",
                            data: {mode_read: "hapus", formorderajb_id: formorderajb_id}
                        }).done(function (msg) {
                            ApliJs.loadingbar().hide();
                            if (msg.status > 0) {
                                ApliJs.alert().success("Form order AJB :" + formorderajb_id + " telah di hapus.");
                                me.getGrid().getStore().loadPage(1);
                            } else {
                                ApliJs.alert().warning("Terjadi kesalahan pada saat menghapus form order ajb.");
                            }
                        });
                    }
                }
            });
        } else {
            ApliJs.alert().warning("Silahkan memilih form order ajb yang ingin dihapus.");
        }
    },
    showPdf: function () {
        var me = this;

        var rec = me.getGrid().getSelectedRecord();

        ApliJs.loadingbar().show("Generating pdf...");

        if (rec) {

            $.ajax({
                method: "POST",
                url: "erems/formorderajb/read/",
                data: {mode_read: "pdfprint", formorderajb_id: rec.get("formorderajb_id")}
            }).done(function (msg) {
                ApliJs.loadingbar().hide();
                console.log(msg);
                if (msg.STATUS) {
                    window.open(msg.URL);
                }
            });

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
            'browseUnitSoldId': {
                'loadData': function (page, limit, start) {
                    me.apliJsFuncbrowse_unit_modal('formorderajb_browse_unit_modal_ID').loadData(page, limit, start, '');
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
                //me.getGrid().down("paging");
                //  me.getGrid().down("pagingtoolbar").getStore().reload();
                // me.down();
            }
        });

        me.tools.ajax({
            params: {},
            success: function (data, model) {
                me.reportFileView = data.file_report;
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


        // ApliJs.loadHtmlC(me,'#myModal', 'formdata_modal', viewParams);



        // ApliJs.loadHtmlC(me,'#myModalBrowseUnitID', 'browse_unit_modal', viewParams);

        // END TEST MODAL BOOTSTRAP

        // add loading Bar
        ApliJs.loadingbar().init();







    },
    showFormdata: function (action) {
        var me = this;


        ApliJs.reset();
        ApliJs.form('#myModal form').resetValue();



        if (action === "update") {

            document.getElementById("formFormOrderAjbId").reset();

            var rec = me.getGrid().getSelectedRecord();
            //console.log(rec);
            if (rec) {
                $('#myModal h4.modal-title').text("Edit Form Order AJB");
                $('#myModal form').find("input[type=text], textarea").val("");

                $('#formPaySaveId').prop('disabled', false);

                $('#browseUnitBtnID').prop('disabled', false);


                ApliJs.loadingbar().show("Mengambil informasi form order ajb...");

                $('#myModal').modal({
                    show: true
                });
                $('#myModal').attr("my-action", action);

                $.ajax({
                    method: "POST",
                    url: "erems/formorderajb/read/",
                    data: {mode_read: "detail", formorderajb_id: rec.get("formorderajb_id")}
                }).done(function (msg) {
                    console.log(msg);


                    var fa = msg.formorderajb[1][0];

                    var modalId = "myModal";

                    ApliJs.form("#myModal form").loadData(fa);


                    $("#" + modalId + " input[name='formorderajb_date']").val(moment(fa.formorderajb_date).format("YYYY-MM-DD"));


                    ApliJs.loadingbar().hide();



                });
            } else {
                me.tools.alert.warning("Silahkan memilih payment terlebih dahulu.");
            }

        } else {


            $('#myModal').modal({
                show: true
            });

            document.getElementById("formFormOrderAjbId").reset();

            $('#myModal').attr("my-action", action);

            $('#myModal form').find("input[type=text], textarea").val("");

            $("#ipScheduleList tbody").html("");

            $('#formPaySaveId').prop('disabled', false);
            $('#browseUnitBtnID').prop('disabled', false);
        }
    },
    apliJsFuncformdata_modal: function (modalId) {
        var me = this;
        var x = {
            init: function () {
            },
            afterRender: function () {
                // ApliJs.reset();
                $(function () {
                    $('#' + modalId + ' #browseUnitBtnID').click(function () {
//                        $('#myModalBrowseUnitID').modal({
//                            show: true
//                        });
                        var params = {};
                        ApliJs.showHtml(me, "browse_unit_modal", params, 'create');
                    });

                    $('#' + modalId).on('shown.bs.modal', function () {
                        $('.x-region-collapsed-placeholder').css("z-index", 1);
                        ApliJs.form('#' + modalId + ' form').initEvent();
                        var action = $('#' + modalId).attr("abc-action");
                        if (action === "create") {
                            $('#formPaySaveId').prop('disabled', false);
                            $('#browseUnitBtnID').prop('disabled', false);
							//add by TB on 2019-07-18
							$("#formorderajb_formdata_modal_ID form input[name='purchaseletter_purchaseletter_id']").val(0);
							$("#formorderajb_formdata_modal_ID form input[name='formorderajb_id']").val(0);
                        } else {
                            var rec = me.getGrid().getSelectedRecord();
                            //console.log(rec);
                            if (rec) {
                                $('#'+modalId+' h4.modal-title').text("Edit Form Order AJB");
                                $('#'+modalId+' form').find("input[type=text], textarea").val("");
                                $('#formPaySaveId').prop('disabled', false);
                                $('#browseUnitBtnID').prop('disabled', true);
                                ApliJs.loadingbar().show("Mengambil informasi form order ajb...");
                                $.ajax({
                                    method: "POST",
                                    url: "erems/formorderajb/read/",
                                    data: {mode_read: "detail", formorderajb_id: rec.get("formorderajb_id")}
                                }).done(function (msg) {
                                    // console.log(msg);
                                    var fa = msg.formorderajb[1][0];
                                  //  var modalId = "myModal";
                                    ApliJs.form("#"+modalId+" form").loadData(fa);
                                    $("#" + modalId + " input[name='formorderajb_date']").val(moment(fa.formorderajb_date).format("YYYY-MM-DD"));
                                    ApliJs.loadingbar().hide();
                                });
                            } else {
                                ApliJs.alert().warning("Silahkan memilih payment terlebih dahulu.");
                            }
                        }
                    });

                    //added by Rico 22042021
                    $('#nomorOrderId, #nomorId, #terbitgsnoId, #retirbusi_periode, #kprspk_note').on('keyup change',function(e){
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
                    $('#kelurahanId, #pemberinameId, #pemberiSelakuId, #penerimanameId, #kirimnotariscp3Id, #kirimnotarispenerimaId').on('keyup change',function(e){
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
                    $('#biayaajbbbnID, #biayabphtbId, #tahunId, #luasTanahId, #pbbluasbangunanId, #luasm2Id, #pemberitelpId, #shgbluasId').on('keyup change',function(e){
                        var v    = $(this).val();
                        var res  = me.checkRegex(v, 3);
                        var year = new Date().getFullYear();
                        var id   = $(this).attr('id');
                        var prev = v.slice(0,-1);

                        if(id == 'luasTanahId' || id == 'pbbluasbangunanId' || id == 'shgbluasId' || id == 'luasm2Id'){
                            var commaPos = v.indexOf('.')+1,
                            strLen = v.length;

                            if((commaPos <= 0 && v.length > 10) || (commaPos > 0 && commaPos < strLen-2)){
                                $(this).val(prev);
                            }
                        }

                        if(!res){
                            if(e.type == 'change'){
                                if(id == 'tahunId'){
                                    $(this).val(year);
                                }else{
                                    $(this).val('');
                                }
                            }else{
                                $(this).val(v.slice(0,-1));
                            }
                        }
                    });

                    $('#formPaySaveId').click(function () {
                        if (ApliJs.form("#"+modalId+" form").isValid()) {
                            $('#formPaySaveId').prop('disabled', true);
                            var dataForm = ApliJs.form("#"+modalId+" form").serialize();
                            ApliJs.loadingbar().show("Sedang menyimpan...");
                            // console.log($("#myModal form").serialize());
                            $.ajax({
                                method: "POST",
                                url: "erems/formorderajb/read/",
                                data: {mode_read: "save", data: JSON.stringify(dataForm)}
                            }).done(function (msg) {
                                ApliJs.loadingbar().hide();
                                $('#formPaySaveId').prop('disabled', false);
                                if (!msg.STATUS) {
                                    ApliJs.alert().warning(msg.MSG);
                                    // alert(msg.MSG);
                                } else {
                                    ApliJs.alert().success("Form Order AJB berhasil disimpan !");
                                    // alert("Sukses simpan payment !");
                                    $("#"+modalId).modal('hide');
                                    me.getGrid().getStore().loadPage(1);
									
									//add by TB on 2019-07-18
									$("#formorderajb_formdata_modal_ID form input[name='purchaseletter_purchaseletter_id']").val(0);
									$("#formorderajb_formdata_modal_ID form input[name='formorderajb_id']").val(0);
                                }
                            });
                        }
                    });

                    $("#"+modalId+" form input[name=admin_fee]").blur(function () {
                        // $(this).val(accounting.formatMoney($(this).val()));
                        me.apliJsFuncformdatadetail_modal().hitung();
                    });

                    $("#"+modalId+" form select[name=paymentmethod_paymentmethod_id]").change(function () {
                        // $(this).val(accounting.formatMoney($(this).val()));
                        me.apliJsFuncformdatadetail_modal().hitung();
                    });
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
                regex = /^[0-9.,]+$/;
                break;
            case 4:
                regex = /^[0-9+.-]+$/;
                break;
            default:
                regex = /^[a-zA-Z0-9\s.]+$/;
                break;
                
        };
        var result = regex.test(val);

        return result;
    },
    apliJsFuncbrowse_unit_modal: function (modalId) {
        var me = this;
        $('#' + modalId + ' button[name=submit_search]').click(function () {
            me.apliJsFuncbrowse_unit_modal(modalId).loadData(1, 25, 0, $("#" + modalId + " input[name=unit_number]").val());
        });

        $('#' + modalId + ' button[name=submit_reset]').click(function () {
            $('input[name=unit_number]').val();
            me.apliJsFuncbrowse_unit_modal(modalId).loadData(1, 25, 0, '');
        });
        var x = {
            init: function () {
                ApliJs.grid('#'+modalId).initEvent('browseUnitSoldId');
            },
            afterRender: function () {
                $('#' + modalId).on('shown.bs.modal', function () {
                    me.apliJsFuncbrowse_unit_modal(modalId).loadData(1, 25, 0, '');
                });
            },
            loadData: function (page, limit, start, unit) {
                var modalId = "myModalBrowseUnitID";
                var saya = this;
                ApliJs.loadingbar().show("Sedang mengambil daftar unit terjual...");

                $.ajax({
                    method: "POST",
                    url: "erems/formorderajb/read/",
                    data: {start: start, page: page, limit: limit, mode_read: "soldunitlist", unit_number: unit}
                }).done(function (msg) {
                    ApliJs.loadingbar().hide();
                    var units = msg["DATA"][1];
                    var totalData = msg["DATA"][0][0]["totalRow"];
                    var totalPage = 0;
                    if (totalData > 0) {
                        totalPage = Math.ceil(totalData / limit);
                    }
                    
                    var rows = "";
                    var count = (page * limit) - limit + 1;

                    for (var i in units) {
                        rows += "<tr purchaseletter_id='" + units[i]["purchaseletter_id"] + "'>" +
                                "<td style='width:30px;padding-bottom: 0px;padding-top: 0px;'>" + count + "</td>" +
                                "<td style='padding-bottom: 0px;padding-top: 0px;'>" + units[i]["unit_number"] + "</td>" +
                                "<td style='padding-bottom: 0px;padding-top: 0px;'>" + units[i]["cluster_code"] + "</td>" +
                                "<td style='padding-bottom: 0px;padding-top: 0px;'>" + units[i]["type_name"] + "</td>" +
                                "<td style='padding-bottom: 0px;padding-top: 0px;'><button style='padding-bottom: 0px;padding-top: 0px;' class='btn btn-primary btn-sm select_unit' purchaseletter_id='" + units[i]["purchaseletter_id"] + "'>select</button></td>" +
                                "</tr>";
                        count++;
                    }

                    $("#plUnitListId tbody").html(rows);
                    
                    ApliJs.grid('#'+modalId).updatePagingInfo({
                        data:units,
                        page:page,
                        totalData:msg["DATA"][0][0]["totalRow"],
                        limit:limit
                    });

                    $("#current_page").text(page);
                    $("#total_page").text(totalPage);
                    $("#total_records").text("Total Record: " + totalData);
                    // end update paging info


                    $("#plUnitListId button.select_unit").click(function (event) {
                        event.preventDefault();
                        var plId = $(this).attr("purchaseletter_id");
                        // me.unitSelectviaApli(unitId);
                        //$("#" + modalId).hide();

                        ApliJs.loadingbar().show("Sedang mengambil informasi purchaseletter...");

                        $.ajax({
                            method: "POST",
                            url: "erems/formorderajb/read/",
                            data: {mode_read: "selectedsoldunit", purchaseletter_id: plId}
                        }).done(function (msg) {
                            ApliJs.loadingbar().hide();
                            var pl = msg.DATA[1][0];
                            // console.log(pl);
                            ApliJs.form("#formorderajb_formdata_modal_ID form").loadData(pl);
                            $("#formorderajb_formdata_modal_ID form input[name='purchaseletter_purchaseletter_id']").val(pl['purchaseletter_id']);
                            $('#modal-close').click();
                        });
                    });
                });
            }
        };
        return x;
    },
	
	processReport: function() {
        var me = this;
		
		var rec = me.getGrid().getSelectedRecord();
		if (rec) {
			var winId = 'myReportWindow';
			me.instantWindow('Panel', 800, 'Result ', 'state-report', winId, 'masterreport');
			
			var win = desktop.getWindow(winId);

			if (win) {
				var params = [];
				
				var dateNow = new Date();
				
				//header
				params["formorderajb_id"] = rec.get("formorderajb_id");
				var html = me.generateFakeForm2(params,me.reportFileView);
				
				win.down("#MyReportPanel").body.setHTML(html);
				$("#fakeReportFormID").submit();
			}
		}
    }

});