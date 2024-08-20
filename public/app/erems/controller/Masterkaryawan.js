Ext.define('Erems.controller.Masterkaryawan', {
    extend: 'Erems.library.template.controller.Controller2',
    requires: ['Erems.library.Browse', 'Erems.library.box.Config',
        'Erems.library.box.tools.Tools', 'Erems.template.ComboBoxFields',
        'Erems.library.box.tools.EventSelector',
        'Erems.library.ModuleTools'],
    alias: 'controller.Masterkaryawan',
    views: ['masterkaryawan.Panel', 'masterkaryawan.Grid', 'masterkaryawan.FormSearch', 'masterkaryawan.FormData', 'masterkaryawan.FormUpload'],
    refs: [
        {
            ref: 'grid',
            selector: 'masterkaryawangrid'
        },
        {
            ref: 'formsearch',
            selector: 'masterkaryawanformsearch'
        },
        {
            ref: 'formdata',
            selector: 'masterkaryawanformdata'
        },
        {
            ref: 'formupload',
            selector: 'masterkaryawanformupload'
        }
    ],
    controllerName: 'masterkaryawan',
    fieldName: 'side',
    bindPrefixName: 'Masterkaryawan',
    localStore: {
        detail: null,
        selectedUnit: null,
        customer: null
    },
    browseHandler: null,
    cbf: null,
    mt: null,
    formxWinId: 'win-sidewinId',
    constructor: function (configs) {
        this.callParent(arguments);
        var me = this;
        this.myConfig = new Erems.library.box.Config({
            _controllerName: me.controllerName
        });

        me.cbf = new Erems.template.ComboBoxFields();
    },
    init: function (application) {
        var me = this;

        me.tools = new Erems.library.box.tools.Tools({config: me.myConfig});
        var events = new Erems.library.box.tools.EventSelector();

        if (typeof ApliJs === "undefined") {
            Ext.Loader.injectScriptElement(document.URL + 'app/erems/js/ApliJs.js?_dc=' + Ext.Date.now(), function () {

                console.log("[INFO] ApliJs loaded.");

            }, function () {
                // error load file
            });
        }


        this.control({
            'masterkaryawanpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: me.panelAfterRender

            },
            'masterkaryawangrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange
            },
            'masterkaryawangrid toolbar button[action=create]': {
                click: function () {
                    this.formDataShow('create');
                }
            },
            'masterkaryawangrid toolbar button[action=update]': {
                click: function () {
                    this.formDataShow('update');
                }
            },
            'masterkaryawangrid toolbar button[action=upload]': {
                click: function () {
                    this.formDataShowUpload('upload');
                }
            },
            'masterkaryawangrid toolbar button[action=destroy]': {
                click: this.dataDestroy
            },
            'masterkaryawangrid toolbar button[action=print]': {
                click: this.dataPrint
            },
            'masterkaryawangrid actioncolumn': {
                //   afterrender: this.gridActionColumnAfterRender,
                click: this.gridActionColumnClick
            },
            'masterkaryawanformsearch button[action=search]': {
                click: this.dataSearch
            },
            'masterkaryawanformsearch button[action=reset]': {
                click: this.dataReset
            },
            'masterkaryawanformdata': {
                afterrender: this.formDataAfterRender
            },
            'masterkaryawanformupload': {
                afterrender: this.formDataAfterRender
            },
            'masterkaryawanformdata button[action=save]': {
                click: this.mainDataSave
            },
            'masterkaryawanformdata button[action=cancel]': {
                click: this.formDataClose
            }
        });
    },
    apliJsFuncformdata: function () {
        var me = this;
        var x = {
            afterRender: function () {
                if ($("#masterkaryawanFormPrintoutformID input[name='action']").val() === "update") {
                    var rec = me.getGrid().getSelectedRecord();
                    $("#masterkaryawanFormPrintoutformID select[name='position_position_id']").val(rec.get("position_position_id"));
                }

                $("#masterkaryawanFormDatacancel").click(function (event) {
                    me.getFormdata().up("window").close();
                });               

                $("#masterkaryawanFormDatasaveID").click(function (event) {
                    event.preventDefault();
                   // $("#masterkaryawanAlertID").html(ApliJs.alertInfo("Saving...", false));
                    //$("#masterkaryawanAlertID").show();

                    $("#masterkaryawanFormDatasaveID").prop('disabled', true);

                    var action = $("#masterkaryawanFormPrintoutformID input[name='action']").val();

                    var ajaxParams = {
                        employee_id: $("#masterkaryawanFormPrintoutformID input[name='employee_id']").val(),
                        employee_name: $("#masterkaryawanFormPrintoutformID input[name='employee_name']").val(),
                        position_position_id: $("#masterkaryawanFormPrintoutformID select[name='position_position_id']").val(),
                        phone_number: $("#masterkaryawanFormPrintoutformID input[name='phone_number']").val(),
                        nomor_rekening: $("#masterkaryawanFormPrintoutformID input[name='nomor_rekening']").val(),
                        address: $("#masterkaryawanFormPrintoutformID textarea[name='address']").val()
                    };
                    
                    ApliJs.loadingbar().show("Sedang menyimpan informasi karyawan...");

                    me.tools.ajax().callAjax({
                        zendAction: 'update',
                        params: {
                            data: Ext.encode(ajaxParams)
                        },
                        successCallback: function (data) {
                            
                            ApliJs.loadingbar().hide();

                            if (data.success) {
                                
                                 me.getFormdata().up("window").close();
                                
                                if (action === "update") {
                                    ApliJs.alert().success("Informasi karyawan berhasil di update.");
                                   // $("#masterkaryawanAlertID").html(ApliJs.alertSuccess("Informasi karyawan berhasil di update."));
                                   // $("#masterkaryawanAlertID").show();
                                }else{
                                    ApliJs.alert().success("Informasi karyawan berhasil di simpan.");
                                   // me.getFormdata().up("window").close();
                                   // me.tools.alert.info("Informasi karyawan berhasil di simpan.");
                                }


                                me.getGrid().getStore().reload();
                            } else {
                                ApliJs.alert().warning(data.msg);
                               // $("#masterkaryawanAlertID").html(ApliJs.alertWarning(data.msg));
                                //$("#masterkaryawanAlertID").show();
                            }
                            $("#masterkaryawanFormDatasaveID").prop('disabled', false);
                        }
                    });

                });
            }
        };
        return x;
    },
    apliJsFuncformupload: function () {
        var me = this;
        var x = {
            afterRender: function () {
                $("#masterkaryawanFormUploadDownload").click(function (event) {
                    var url = me.urlExists("app/erems/downloadfile/template/Masterkaryawantemplate.xlsx");
                    if(url){
                        window.open("app/erems/downloadfile/template/Masterkaryawantemplate.xlsx");
                        ApliJs.alert().success("Berhasil mendownload file template...");
                        me.getFormupload().up("window").close();
                    } else {
                        ApliJs.alert().warning("File template belum ada...");
                        console.log("URL: app/erems/downloadfile/template/Masterkaryawantemplate.xlsx");
                    }
                }); 

                $("#masterkaryawanFormUploadsaveID").click(function (event) {
                    event.preventDefault();

                    $("#masterkaryawanAlertID").show();
                    $("#masterkaryawanFormUploadsaveID").prop('disabled', true);
                    ApliJs.loadingbar().show("Sedang menyimpan informasi karyawan...");
                    var data = new FormData();
                    var stat = false;
                    jQuery.each($('#mkFileUpload')[0].files, function(i, file) {
                        var fileExt = file.name.split('.').pop();
                        if (fileExt == 'xlsx' || fileExt == 'xls'){
                            stat = true;
                            data.append('mkFileUpload_'+i, file);
                        }else{
                            stat = false;
                            ApliJs.alert().error("File yang diupload harus xlsx atau xls..");
                        }
                    });

                    if(stat){
                        var form = me.getFormupload();
                        $("#masterkaryawanAlertID").html(ApliJs.alertInfo("Saving...", false));
                        jQuery.ajax({
                            url: 'erems/' + me.controllerName + '/upload',
                            data: data,
                            cache: false,
                            contentType: false,
                            processData: false,
                            method: 'POST',
                            type: 'POST', // For jQuery < 1.9
                            success: function(data){
                                ApliJs.loadingbar().hide();
                                me.getFormupload().up("window").close();
                                if (!data.success) {
                                    ApliJs.alert().success("Informasi karyawan berhasil di upload.");
                                    me.getGrid().getStore().reload();
                                } 
                                else{
                                    ApliJs.alert().warning(data.msg);
                                }
                                $("#masterkaryawanFormUploadsaveID").prop('disabled', false);
                            },
                            fail:function(xhr, textStatus, errorThrown){
                                ApliJs.loadingbar().hide();
                                me.getFormupload().up("window").close();
                                ApliJs.alert().warning(errorThrown);
                            }
                        });
                    }
                });
            }
        };
        return x;
    },
    urlExists:function(url){
        var http = new XMLHttpRequest();
        http.open('HEAD', url, false);
        http.send();
        return http.status!=404;
    },
    fdar: function () {
        var me = this;
        var x = {
            init: function () {
                //console.log("Init : "+me.getFormupload().up('window').state);
            },
            create: function () {
                var viewParams = {
                    employee_id: 0,
                    employee_name: '',
                    phone_number:'',
                    address:'',
                    nomor_rekening:'',
                    action: 'create'
                };
                ApliJs.loadHtml(me, me.getFormdata(), 'formdata', viewParams);
            },
            update: function () {
                var rec = me.getGrid().getSelectedRecord();
                var viewParams = {
                    employee_id: rec.get("employee_id"),
                    employee_name: rec.get("employee_name"),
                    phone_number:rec.get("phone_number"),
                    address:rec.get("address"),
                    nomor_rekening:rec.get("nomor_rekening"),
                    action: 'update'
                };
                ApliJs.loadHtml(me, me.getFormdata(), 'formdata', viewParams);
            },
            upload: function () {
                var viewParams = {
                    action: 'upload'
                };
                ApliJs.loadHtml(me, me.getFormupload(), 'formupload', viewParams);
            }
        };
        return x;
    },
    mainDataSave: function () {
        var me = this;
        // me.tools.iNeedYou(me).save();
    },
    formDataAfterRender: function(el) {
        var state = el.up('window').state;
        var me = this;
        me.fdar().init();
        if (state == 'create') {
            me.fdar().create();
        } else if (state == 'update') {
            me.fdar().update();
        } else if (state == 'upload') {
            me.fdar().upload();
        }
    },
    /*@override formDataShow 5 Dec 2013*/
    formDataShowUpload: function(el, act, action) {
        var me = this;
        var formtitle, formicon;
        var gfp = me.getFormProperties(action);
        var state = gfp.state;
        formtitle = gfp.formtitle;
        formicon = gfp.formicon;
        var winId = me.formxWinId;
        var win = desktop.getWindow(winId);
        if (!win) {
            win = desktop.createWindow({
                id: winId,
                title: formtitle,
                iconCls: formicon,
                resizable: false,
                minimizable: false,
                maximizable: false,
                width: me.formWidth,
                renderTo: Ext.getBody(),
                constrain: true,
                constrainHeader: false,
                modal: true,
                layout: 'fit',
                shadow: 'frame',
                shadowOffset: 10,
                border: false,
                state: 'upload',
                listeners: {
                    boxready: function() {
                        win.body.mask('Loading...');
                        var tm = setTimeout(function() {
                            win.add(Ext.create('Erems.view.' + me.controllerName + '.FormUpload'));
                            win.center();
                            win.body.unmask();
                            clearTimeout(tm);
                        }, 1000);

                    }
                }

            });
        }
        win.show();

    }
});