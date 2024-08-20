Ext.define('Erems.controller.Tablestock', {
    extend: 'Erems.controller.Purchaseletter', //Controller2
    // extend: 'Erems.library.template.controller.Controller2',
    alias: 'controller.Tablestock',
    requires: [
        // 'Erems.controller.Purchaseletter',
        // 'Erems.library.Browse',
        // 'Erems.library.box.Config',
        // 'Erems.library.box.tools.Tools',
        // 'Erems.template.ComboBoxFields',
        // 'Erems.library.box.tools.EventSelector',
        // 'Erems.library.XyReport',
        // 'Erems.view.purchaseletter.Grid' 
        'Erems.library.template.component.Clustercombobox'
    ],

    views: ['tablestock.Panel', 'tablestock.Konten', 'tablestock.FormSearch'],
    stores: ['Sourcemoney','Mastercluster'],
    models: ['Sourcemoney','Mastercluster'],
    refs: [
        {
            ref: 'konten',
            selector: 'tablestockkonten'
        },

        {
            ref: 'panel',
            selector: 'tablestockpanel'
        },
        {
            ref: 'formsearchtb',
            selector: 'tablestockformsearch'
        },
        // {
        //     ref: 'grid',
        //     selector: 'purchaselettergrid'
        // }

    ],

    controllerName: 'tablestock',
    fieldName: 'payment_id',
    formWidth: 800,
    dateNow: new Date(),

    myConfig: null,
    cbf: null,
    fileName: false,

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
        me.tools = new Erems.library.box.tools.Tools({ config: me.myConfig });
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

        Ext.Loader.injectScriptElement(document.URL + 'app/erems/js/fontawesome.js', function () {
        }, function () {
        });



        this.control({
            'tablestockpanel': {
                // beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRendertb

            },
            'tablestockkonten': {
                afterrender: this.kontenAfterRender,
                //                itemdblclick: this.gridItemDblClick,
                //                itemcontextmenu: this.gridItemContextMenu,
                //                selectionchange: this.gridSelectionChange
            },
            'tablestockformsearch ': {
                afterrender: this.formSearchAfterRender
            },
            'tablestockformsearch button[action=search]': {
                click: this.dataSearch
            },
            'tablestockformsearch button[action=reset]': {
                click: this.dataResettb
            },
            'purchaselettergrid': {
                // afterrender: this.gridAfterRender,
                // itemdblclick: this.gridItemDblClick,
                // itemcontextmenu: this.gridItemContextMenu,
                // selectionchange: this.gridSelectionChange
                //edited by Rizal 1 Maret 2019
                // , listeners: {
                //     load: function () {
                //         me.jqueryBinding();
                //     }
                // }
                //endedited
            },

        });
    },
    dataReset: function () {
        // var me = this;  

        // me.getFormsearch().getForm().reset();
        // me.dataSearch();
    },
    panelAfterRendertb: function () {
        // alert('woyyy');
        var me = this;

        var p = me.getPanel();
        p.up("window").maximize();
        // var me = this;
        me.prolibs = null;

        ApliJs.gridSelect = {
            'browseUnit': {
                'loadData': function (page, limit, start) {
                    me.apliJsFuncbrowse_unit_modal('purchaseletter_browse_unit_modal_ID').loadData(page, limit, start);
                }
            }
        };
        Ext.Ajax.request({
            url: 'erems/purchaseletter/read',
            params: { 'mode_read': 'othersconfig' },
            success: function (data, model) {
                // console.log(data);
                // var data = data.responseText;
                var d = Ext.JSON.decode(data.responseText);
				var prolibsFile = d['data']['others'][0][0]['PROLIBFILE'];
                // console.log(d['data']['others'][0][0]['checkCanSPTDraft']);
                // me.checkCanSPTDraft = d['data']['others'][0][0]['checkCanSPTDraft'];
                // me.userkpraccdate = d['data']['others'][0][0]['userkpraccdate'];
                // me.verification_approval = d['data']['others'][0][0]['verification_approval']
                _myAppGlobal.getController('Purchaseletter').checkCanSPTDraft = d['data']['others'][0][0]['checkCanSPTDraft'];
                _myAppGlobal.getController('Purchaseletter').userkpraccdate = d['data']['others'][0][0]['userkpraccdate'];
                _myAppGlobal.getController('Purchaseletter').verification_approval = d['data']['others'][0][0]['verification_approval'];
				
				_myAppGlobal.getController('Purchaseletter').calculatorJs = d['data']['others'][0][0]['CALCULATORJS'];
                _myAppGlobal.getController('Purchaseletter').purchaseletterJs = d['data']['others'][0][0]['PURCHASELETTERJS'];
                _myAppGlobal.getController('Purchaseletter').isRSCHApproveUser = d['data']['others'][0][0]['RESCHEDULEAPPROVEUSER'];
                _myAppGlobal.getController('Purchaseletter').groupuser = d['data']['others'][0][0]['GROUPUSER'];
				
				var errorFile = "";

                if (prolibsFile) {

                    Ext.Loader.injectScriptElement(document.URL + 'app/erems/projectlibs/Prolibs.js?_dc=' + Ext.Date.now(), function () {

                        Ext.Loader.injectScriptElement(document.URL + 'app/erems/projectlibs/' + prolibsFile + '.js?_dc=' + Ext.Date.now(), function () {

                            _myAppGlobal.getController('Purchaseletter').prolibs = window[prolibsFile];
                            _myAppGlobal.getController('Purchaseletter').prolibsFile = prolibsFile;
                        }, function () {
                            me.tools.alert.warning("Error load prolibs file.");
                        });


                    }, function () {
                        me.tools.alert.warning("Error load Prolibs.js file.");
                    });


                } else {
                    errorFile += "[JSERR01] File perhitungan purchaseletter tidak ditemukan.";
                    //me.tools.alert.error("File perhitungan purchaseletter tidak ditemukan.");
                }
                if (!_myAppGlobal.getController('Purchaseletter').calculatorJs) {
                    errorFile += "[JSERR02] File kalkulasi harga untuk purchaseletter tidak ditemukan.";
                }
                if (!_myAppGlobal.getController('Purchaseletter').purchaseletterJs) {
                    errorFile += "[JSERR03] File purchaseletter tidak ditemukan.";
                }
                if (errorFile.length > 0) {
                    me.tools.alert.error(errorFile);
                }

            },
            failure: function (e) {
                //console.error(e);

            }
        });

//        Ext.Ajax.request({
//            url: 'erems/purchaseletter/read',
//            params: { 'mode_read': 'init' },
//            success: function (data, model) {
//                // var data = data.responseText;
//                var d = Ext.JSON.decode(data.responseText);
//                console.log(d);
//				return false;
//                var prolibsFile = d['data'].others[0][0]['PROLIBFILE'];
//
//                _myAppGlobal.getController('Purchaseletter').calculatorJs = d['data'].others[0][0]['CALCULATORJS'];
//                _myAppGlobal.getController('Purchaseletter').purchaseletterJs = d['data'].others[0][0]['PURCHASELETTERJS'];
//                _myAppGlobal.getController('Purchaseletter').isRSCHApproveUser = d['data'].others[0][0]['RESCHEDULEAPPROVEUSER'];
//                _myAppGlobal.getController('Purchaseletter').groupuser = d['data'].others[0][0]['GROUPUSER'];
//
//                // if (me.groupuser == 'NUP GROUP') {
//                //     grid = me.getGrid();
//                //     grid.setLoading('refresh grid');
//                //     search = me.getFormsearchtb();
//                //     search.down('#btnCheckDraft').setValue(true);
//                //     search.down('#btnCheckDraft').setReadOnly(true);
//                //     me.dataSearch();
//                //     grid.setLoading(false);
//                // }
//
//                var errorFile = "";
//
//                if (prolibsFile) {
//
//                    Ext.Loader.injectScriptElement(document.URL + 'app/erems/projectlibs/Prolibs.js', function () {
//
//                        Ext.Loader.injectScriptElement(document.URL + 'app/erems/projectlibs/' + prolibsFile + '.js', function () {
//
//                            _myAppGlobal.getController('Purchaseletter').prolibs = window[prolibsFile];
//                            _myAppGlobal.getController('Purchaseletter').prolibsFile = prolibsFile;
//                        }, function () {
//                            me.tools.alert.warning("Error load prolibs file.");
//                        });
//
//
//                    }, function () {
//                        me.tools.alert.warning("Error load Prolibs.js file.");
//                    });
//
//
//                } else {
//                    errorFile += "[JSERR01] File perhitungan purchaseletter tidak ditemukan.";
//                    //me.tools.alert.error("File perhitungan purchaseletter tidak ditemukan.");
//                }
//                if (!_myAppGlobal.getController('Purchaseletter').calculatorJs) {
//                    errorFile += "[JSERR02] File kalkulasi harga untuk purchaseletter tidak ditemukan.";
//                }
//                if (!_myAppGlobal.getController('Purchaseletter').purchaseletterJs) {
//                    errorFile += "[JSERR03] File purchaseletter tidak ditemukan.";
//                }
//                if (errorFile.length > 0) {
//                    me.tools.alert.error(errorFile);
//                }
//            },
//            failure: function (e) {
//                //console.error(e);
//
//            }
//        });



    },

    dataResettb: function () {
        var me = this;

        me.getFormsearchtb().getForm().reset();
        me.dataSearch();
    },

    formSearchAfterRender: function (el) {
        var me = this;
        me.loadComboBoxStore(el);
    },

    kontenAfterRender: function (el) {
        //        this.callParent(arguments);
        var me = this;
        var params = {};
        var f = me.getFormsearchtb();
        var t = f.down("[name=cluster_id]");
        //        console.log(t.getValue());
        $('.x-tool-close').click(function (event) {
            //                        event.preventDefault();
            //                alert('woy');
        });

        $.ajax({
            method: "POST",
            url: "erems/tablestock/read",
            data: { moderead_type: 'filetablestock' }
        }).done(function (data) {
            me.fileName = data;
            // alert(me.fileName);
        });
        //        ApliJs.loadingbar().init();
    },
    dataSearch: function () {
        var me = this;
        var params = {};
        var f = me.getFormsearchtb();
        var t = f.down("[name=cluster_id]").getValue();
        params = { cluster_id: t };

        me.loadIndex('index', params)
    },

    loadIndex: function (url, param) {
        var me = this;
        ApliJs.loadingbar().show("Mengambil informasi table stock...");
        //        console.log(param);
        // $.ajax({
        //     method: "POST",
        //     url: "erems/tablestock/read",
        //     data: { moderead_type: 'filetablestock' }
        // }).done(function (data) {
        //     console.log(data)
        var file = me.fileName;
        if (file == false) {
            $.ajax({
                method: "POST",
                url: "erems/tablestock/" + url,
                data: param
            }).done(function (msg) {

                //            console.log(msg);
                ApliJs.loadingbar().hide();

                ApliJs.showPhp(me, 'table_stock', msg, 'false', '.content_data', '', 'replace');
            });
        } else {
            var f = me.getFormsearchtb();
            var t = f.down("[name=cluster_id]").getValue();
            params = { cluster_id: t, file_name: file };
            $.ajax({
                method: "POST",
                url: "erems/tablestock/fixtable",
                data: params
            }).done(function (msg) {
                ApliJs.loadingbar().hide();

                ApliJs.showPhp(me, 'table_stock', msg, 'false', '.content_data', '', 'replace');
            });

        }


        // });

        // $.ajax({
        //     method: "POST",
        //     url: "erems/tablestock/" + url,
        //     data: param
        // }).done(function (msg) {

        //     //            console.log(msg);
        //     ApliJs.loadingbar().hide();

        //     ApliJs.showPhp(me, "table_stock", msg, 'false', '.content_data', '', 'replace');
        // });
    },

    loadDetail: function (url, param) {
        var me = this;
        ApliJs.loadingbar().show("Mengambil informasi detail...");
        //        console.log(param);
        $.ajax({
            method: "POST",
            url: "erems/tablestock/" + url,
            data: param
        }).done(function (msg) {

            //            console.log(msg);
            //            $('#modal-detail').html(msg)
            //            $('#modal-detail').modal({
            //                    show: true
            //                });

            ApliJs.showPhp(me, "table_stock_detail", msg, 'true', '#modal-detail', '#modal-detail', 'replace');

            ApliJs.loadingbar().hide();

        });
    },


    apliJsFunctable_stock: function (modalId) {
        var me = this;
        var x = {
            init: function () {

            },
            afterRender: function () {

                // ApliJs.reset();

                $(function () {

                    $('.x-region-collapsed-placeholder').css("z-index", 1);

                    ApliJs.form('#' + modalId + ' form').initEvent();


                    var action = $('#' + modalId).attr("abc-action");

                    if (action === "index") {


                    } else {



                    }



                    //                    });

                    $('#btn-export').click(function (event) {

                        // dataExport: function(el, popup_type, extra_param={}) {
                        // var me = this;
                        // console(me.getPanel())
                        // el.up('window').body.mask('Creating Excel File, Please Wait...');
                        me.getKonten().up('window').body.mask('Creating Excel File, Please Wait...');
                        Ext.Ajax.timeout = 60000 * 30;

                        var obj_export = {};
                        var f = me.getFormsearchtb();
                        var t = f.down("[name=cluster_id]").getValue();


                        if (me.fileName == false) {
                            obj_export = { cluster_id: t, moderead_type: 'exportexcel' };
                        } else {
                            obj_export = { cluster_id: t, moderead_type: 'exportexcel2' };
                        }

                        Ext.Ajax.request({
                            url: 'erems/tablestock/read/?action=schema',
                            params: obj_export,
                            success: function (response) {
                                try {
                                    var resp = response.responseText;

                                    if (resp) {
                                        var info = Ext.JSON.decode(resp);

                                        if (info.success == true) {
                                            me.getKonten().up('window').body.unmask();
                                            Ext.Msg.show({
                                                title: 'Info',
                                                msg: '<a href="' + info.url + '" target="blank">Click Here For Download Excel File</a>',
                                                icon: Ext.Msg.INFO,
                                                //buttons: [], //jika ingin tidak ada buttons
                                                buttons: Ext.Msg.CANCEL,
                                                buttonText:
                                                {
                                                    cancel: 'Close',
                                                }
                                            });
                                        } else {
                                            me.getKonten().up('window').body.unmask();
                                            Ext.Msg.show({
                                                title: 'Failure',
                                                msg: 'Error: Export to Excel Failed.',
                                                icon: Ext.Msg.ERROR,
                                                buttons: Ext.Msg.OK
                                            });
                                        }
                                    }
                                } catch (e) {
                                    //console.error(e);
                                    me.getKonten().up('window').body.unmask();
                                    Ext.Msg.show({
                                        title: 'Failure',
                                        msg: 'Error: Export to Excel Failed.',
                                        icon: Ext.Msg.ERROR,
                                        buttons: Ext.Msg.OK
                                    });
                                }
                            },
                            failure: function (e) {
                                //console.error(e);
                                me.getKonten().up('window').body.unmask();
                                Ext.Msg.show({
                                    title: 'Failure',
                                    msg: 'Error: Export to Excel Failed.',
                                    icon: Ext.Msg.ERROR,
                                    buttons: Ext.Msg.OK
                                });
                            }
                        });
                        // },
                    });


                    $('.btn-detail').click(function (event) {
                        event.preventDefault();
                        var params = {};
                        var id = $(this).attr("unit-id");
                        params = { unit_id: id };

                        me.loadDetail('detail', params);
                    });


                });



            }

        };

        return x;

    },

    apliJsFunctable_stock_detail: function (modalId) {
        var me = this;
        var x = {
            init: function () {

            },
            afterRender: function () {

                $(function () {

                    $('.x-region-collapsed-placeholder').css("z-index", 1);

                    $('#btn-purchaseletter').click(function () {

                        var me = this;
                        var idUnit = $(this).attr("unit-id");
                        var formtitle, formicon;
                        var mypanel = 'FormData';
                        var winId = 'win-holidayformdata';
                        var newState = '';
                        formtitle = 'Purchaseletter Create';
                        formicon = 'icon-form-add';
                        //                        mypanel = 'FormAddDetail';
                        winId = 'win-valueformdata';
                        //                        newState = 'table_stock';
                        newState = 'create';


                        var win = desktop.getWindow(winId);
                        if (!win) {
                            win = desktop.createWindow({
                                id: winId,
                                title: formtitle,
                                iconCls: formicon,
                                resizable: false,
                                minimizable: false,
                                maximizable: false,
                                width: 800,
                                renderTo: Ext.getBody(),
                                constrain: true,
                                constrainHeader: false,
                                modal: true,
                                layout: 'fit',
                                shadow: 'frame',
                                shadowOffset: 10,
                                border: false,
                                //                                items: Ext.create('Erems.view.purchaseletter'+ '.' + mypanel),
                                state: newState,
                                state2: 'table_stock',
                                unit_id: idUnit,
                                listeners: {
                                    boxready: function () {
                                        // win.setHeight(200);

                                        win.body.mask('Loading...');
                                        var tm = setTimeout(function () {
                                            win.add(Ext.create('Erems.view.purchaseletter' + '.' + mypanel));
                                            win.center();
                                            win.body.unmask();
                                            clearTimeout(tm);
                                        }, 5000);

                                    }
                                }
                            });
                        }
                        var win2 = desktop.getWindow('win-holidaypanel');
                        if (!win2) {
                            win2 = desktop.createWindow({
                                id: 'win-valuepanel',
                                title: 'Panel',
                                iconCls: formicon,
                                resizable: false,
                                minimizable: false,
                                maximizable: false,
                                width: 800,
                                //                                renderTo: Ext.getBody(),
                                constrain: true,
                                constrainHeader: false,
                                modal: true,
                                //                                layout: 'fit',
                                //                                shadow: 'frame',
                                //                                shadowOffset: 10,
                                border: false,
                                masked: false,
                                //                                hidden:true,
                                //                                items: Ext.create('Erems.view.purchaseletter'+ '.' + mypanel),
                                state: newState,
                                unit_id: idUnit,
                                //                                zindex: -10000000,
                                listeners: {
                                    boxready: function (me) {
                                        // win.setHeight(200);
                                        console.log(me)
                                        win2.body.mask('Loading...');
                                        //                                        var tm = setTimeout(function() {
                                        win2.add(Ext.create('Erems.view.purchaseletter.Panel'));
                                        win2.center();
                                        //                                            win2.body.unmask();
                                        //                                            clearTimeout(tm);
                                        //                                        }, 1000);

                                    }
                                }
                            });
                        }
                        //                        win2.setMasked(false);
                        //                        console.log(win2.getEl())
                        // win2.show();
                        win.show();


                    });

                    $('#btn-cancel-pl').click(function () {
                        me.dataSearch();
                    });


                });
            }

        };

        return x;

    },

    // apliJsFunctable_stock_: function (modalId) {
    //     var me = this;
    //     var x = {
    //         init: function () {

    //         },
    //         afterRender: function () {

    //             // ApliJs.reset();

    //             $(function () {

    //                 $('.x-region-collapsed-placeholder').css("z-index", 1);

    //                 ApliJs.form('#' + modalId + ' form').initEvent();


    //                 var action = $('#' + modalId).attr("abc-action");

    //                 if (action === "index") {


    //                 } else {



    //                 }



    //                 //                    });




    //             });



    //         }

    //     };

    //     return x;

    // },




});