Ext.define('Master.controller.Project', {
    extend: 'Master.library.template.controller.Controller2',
    alias: 'controller.Project',
    requires: [

        'Master.library.box.Config',
        'Master.library.box.tools.Tools'
    ],
    views: ['project.Panel', 'project.Grid', 'project.FormSearch'],
    refs: [
        {
            ref: 'grid',
            selector: 'projectgrid'
        },

        {
            ref: 'panel',
            selector: 'projectpanel'
        },
        {
            ref: 'formsearch',
            selector: 'projectformsearch'
        }

    ],
    controllerName: 'project',
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
    bindPrefixName: 'Project',
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
        this.myConfig = new Master.library.box.Config({
            _controllerName: me.controllerName
        });

       
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

        me.tools = new Master.library.box.tools.Tools({config: me.myConfig});
  

        if (typeof Mustache === "undefined") {
            Ext.Loader.injectScriptElement(document.URL + 'app/master/library/mustache.min.js', function () {

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


            Ext.Loader.injectScriptElement(document.URL + 'app/master/library/moment.min.js', function () {
            }, function () {
            });
        }

        this.control({
            'projectpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender

            },
            'projectgrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange
            },
            'projectgrid toolbar button[action=create]': {
                click: function () {
                    me.showFormdata("create");
                }
            },
            'projectgrid toolbar button[action=update]': {
                click: function () {
                    me.showFormdata("update");
                }
            },
            'projectformsearch button[action=search]': {
                click: this.dataSearch
            },
            'projectformsearch button[action=reset]': {
                click: this.dataReset
            },
            'projectgrid toolbar button[action=destroy]': {
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
            ApliJs.loadingbar().show("Menghapus project...");


            $.ajax({
                method: "POST",
                url: "master/project/read/",
                data: {mode_read: "hapus", project_id: rec.get("project_id")}
            }).done(function (msg) {
                ApliJs.loadingbar().hide();
                if (msg.status > 0) {
                    ApliJs.alert().success("Project :"+rec.get("name")+" telah di hapus.");
                    me.getGrid().getStore().loadPage(1);
                } else {
       
                    ApliJs.alert().warning(msg.pesan);
                }
            });
        } else {
             ApliJs.alert().warning("Silahkan memilih project yang ingin dihapus.");
            
        }


    },
   
    execAction: function (el, action, me) {
        /* KOSONG */
    },
    gridAfterRender: function (configs) {
        this.callParent(arguments);
        var me = this;

        // aplijs config
        ApliJs.applicationName = "master";
        ApliJs.fieldId = "project_id";


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

              //  me.tools.wesea(data.paymentmethods, me.getFormsearch().down("[name=paymentmethod_id]")).comboBox(true);
              //  me.tools.wesea(data.blocks, me.getFormsearch().down("[name=block_id]")).comboBox(true);
              //  me.tools.wesea(data.clusters, me.getFormsearch().down("[name=cluster_id]")).comboBox(true);



            }
        }).read('init');



        // TEST MODAL BOOTSTRAP
        var viewParams = {
            test: 0,

        };
        
        
        ApliJs.loadHtmlB(me, me.getGrid().down("#testModalID"), 'formdata_modal', viewParams);


      //  ApliJs.loadHtmlB(me, me.getGrid().down("#browseUnitID"), 'browse_unit_modal', viewParams);

        // END TEST MODAL BOOTSTRAP

        // add loading Bar
        ApliJs.loadingbar().init();

        





    },
    showFormdata: function (action) {
        var me = this;


        ApliJs.reset();
        
        

        if (action === "update") {
            
            ApliJs.form('#myModal form').resetValue();
          //  document.getElementById("formProjectId").reset();
            
            var rec = me.getGrid().getSelectedRecord();
            //console.log(rec);
            if (rec) {
                $('#myModal h4.modal-title').text("Edit Project");
                $('#myModal form').find("input[type=text], textarea").val("");

                $('#formPaySaveId').prop('disabled', false);
                
                $('#browseUnitBtnID').prop('disabled', false);


                ApliJs.loadingbar().show("Mengambil informasi project...");

                $('#myModal').modal({
                    show: true
                });
                $('#myModal').attr("my-action", action);

                $.ajax({
                    method: "POST",
                    url: "master/project/read/",
                    data: {mode_read: "detail", project_id: rec.get("project_id")}
                }).done(function (msg) {
                    console.log(msg);


                    var fa = msg.project[1][0];

                    var modalId = "myModal";
                    
                    ApliJs.form("#myModal form").loadData(fa);
                    
                    
                    $("#" + modalId + " input[name='project_date']").val(moment(fa.project_date).format("YYYY-MM-DD"));
                    
                   
                    ApliJs.loadingbar().hide();
                    
              

                });
            } else {
                me.tools.alert.warning("Silahkan memilih payment terlebih dahulu.");
            }

        } else {
            
            
            $('#myModal').modal({
                show: true
            });
            
            ApliJs.form('#myModal form').resetValue();
           // document.getElementById("formProjectId").reset();
            
            $('#myModal').attr("my-action", action);

            $('#myModal form').find("input[type=text], textarea").val("");

            $("#ipScheduleList tbody").html("");


            $('#formPaySaveId').prop('disabled', false);
            $('#browseUnitBtnID').prop('disabled', false);
        }


    },

    apliJsFuncformdata_modal: function () {
        var me = this;
        var x = {
            afterRender: function () {

                ApliJs.reset();

                $(function () {
                    $('#browseUnitBtnID').click(function () {
                        $('#myModalBrowseUnitID').modal({
                            show: true
                        });
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

                       
                       var dataForm = ApliJs.form("#myModal form").serialize();
                       
                        
                        ApliJs.loadingbar().show("Sedang menyimpan...");


                        // console.log($("#myModal form").serialize());
                        $.ajax({
                            method: "POST",
                            url: "master/project/read/",
                            data: {mode_read: "save", data: JSON.stringify(dataForm)}
                        }).done(function (msg) {

                            ApliJs.loadingbar().hide();

                            $('#formPaySaveId').prop('disabled', false);
                            if (!msg.STATUS) {
                                ApliJs.alert().warning(msg.MSG);
                                // alert(msg.MSG);
                            } else {
                                ApliJs.alert().success("Project berhasil disimpan !");
                                // alert("Sukses simpan payment !");
                                $("#myModal").modal('hide');
                                me.getGrid().getStore().loadPage(1);

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



            }

        };

        return x;

    },
    apliJsFuncbrowse_unit_modal: function () {
        var me = this;
        var x = {
            afterRender: function () {
                var me2 = this;

                var modalId = "myModalBrowseUnitID";





                $('#' + modalId).on('shown.bs.modal', function () {

                    me.apliJsFuncbrowse_unit_modal().loadData(1, 25, 0);

                    ApliJs.grid('#myModalBrowseUnitID').initEvent('browseUnitSoldId');



                });

            },
            loadData: function (page, limit, start) {
                var modalId = "myModalBrowseUnitID";
                var saya = this;
                ApliJs.loadingbar().show("Sedang mengambil daftar unit terjual...");
                $.ajax({
                    method: "POST",
                    url: "master/project/read/",
                    data: {start: start, page: page, limit: limit, mode_read: "soldunitlist", unit_number: $("#" + modalId + " input[name=unit_number]").val()}
                }).done(function (msg) {
                    $("#" + modalId + " button[name=submit_search]").prop('disabled', false);

                     ApliJs.loadingbar().hide();

                    //  console.log(msg);
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
                                "<td>" + units[i]["unit_number"] + "</td>" +
                                "<td>" + units[i]["cluster_code"] + "</td>" +
                                "<td>" + units[i]["type_name"] + "</td>" +
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


                        ApliJs.loadingbar().show("Sedang mengambil informasi purchaseletter...");

                        $.ajax({
                            method: "POST",
                            url: "master/project/read/",
                            data: {mode_read: "selectedsoldunit", purchaseletter_id: plId}
                        }).done(function (msg) {
                            ApliJs.loadingbar().hide();
                         //   

                            var pl = msg.DATA[1][0];
                             console.log(pl);
                                
                            ApliJs.form("#myModal form").loadData(pl);
                            
                              $("#myModal form input[name='purchaseletter_purchaseletter_id']").val(pl['purchaseletter_id']);
                            

                        });
                    });
                });
            }
        };

        return x;

    }

});