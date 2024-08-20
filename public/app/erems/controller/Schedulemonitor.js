Ext.define('Erems.controller.Schedulemonitor', {
    extend: 'Erems.library.template.controller.Controller2',
    alias: 'controller.Schedulemonitor',
    requires: [
        'Erems.library.ModuleTools',
        'Erems.library.Browse',
        'Erems.library.box.Config',
        'Erems.library.box.tools.Tools',
        'Erems.template.ComboBoxFields',
        'Erems.library.box.tools.EventSelector',
        'Erems.library.XyReport'
    ],
    views: ['schedulemonitor.Panel', 'schedulemonitor.Grid', 'schedulemonitor.FormSearch'],
    refs: [
        {
            ref: 'grid',
            selector: 'schedulemonitorgrid'
        },

        {
            ref: 'panel',
            selector: 'schedulemonitorpanel'
        },
        {
            ref: 'formsearch',
            selector: 'schedulemonitorformsearch'
        },
        {
            ref: 'gridsschedule',
            selector: 'schedulemonitorschedulegrid'
        },
        {
            ref: 'gridpayment',
            selector: 'schedulemonitorpaymentgrid'
        },
        {
            ref: 'formdata',
            selector: 'schedulemonitorformdata'
        },
        {
            ref: 'formexcel',
            selector: 'schedulemonitorformexcel'
        },
    ],
    controllerName: 'schedulemonitor',
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
    bindPrefixName: 'Schedulemonitor',
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
    bisaHapusPayment: false,
    bisaEditSchedule: false,
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
            'schedulemonitorpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender

            },
            'schedulemonitorgrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange
            },
            'schedulemonitorschedulegrid': {
                selectionchange: this.formScheduleSelectionChange,
                afterrender : function () { //// Add by Erwin.St 030822
                    me.getGridsschedule().on('edit', function (editor, e) {
                        var store = me.getGridsschedule().getStore();
                        var record  = store.getAt(e.rowIdx);
                        if(e.field == 'duedate'){
                            var duedate = new Date(record.get(e.field));
                            var nowdate = new Date(new Date());

                            if(duedate.getHours() == 0 && duedate.getMinutes() == 0 && duedate.getSeconds() == 0 && duedate.getMilliseconds() == 0){
                                duedate.setHours(nowdate.getHours());
                                duedate.setMinutes(nowdate.getMinutes());
                                duedate.setSeconds(nowdate.getSeconds());
                                duedate.setMilliseconds(nowdate.getMilliseconds());

                                record.beginEdit();
                                record.set({ 'duedate' : new Date(duedate) });
                                record.endEdit();                       
                            }
                        }
                    });
                },
            },
            'schedulemonitorpaymentgrid': {
                selectionchange: this.formPaymentSelectionChange
            },

            'schedulemonitorformsearch button[action=search]': {
                click: this.dataSearch
            },
            'schedulemonitorformsearch button[action=reset]': {
                click: this.dataReset
            },
            'schedulemonitorgrid toolbar button[action=edit]': {
                click: this.schMonEdit
            },
            'schedulemonitorpaymentgrid toolbar button[action=delete]': {
                click: this.schMonPayDelete
            },
            'schedulemonitorschedulegrid toolbar button[action=update]': {
                click: this.schMonScheduleUpdate
            },
            'schedulemonitorgrid toolbar button[action=excel]': {
                click: this.schMonScheduleFormExcel
            },
            'schedulemonitorformexcel button[action=download]': {
                click: this.schMonScheduleDownloadExcel
            },

        });
    },
    schMonScheduleDownloadExcel: function () {
        var me = this;
        var f = me.getFormexcel();
        var fs = me.getFormsearch();
        var vs = f.getValues();
        var params = {
            tipe: vs.page, // tipe download excel
            page: me.getGrid().getStore().currentPage,
            purchaseletter_no: fs.down("[name=purchaseletter_no]").getValue(),
            customer_name: fs.down("[name=customer_name]").getValue(),
            unit_unit_number: fs.down("[name=unit_unit_number]").getValue(),
            pricetype: fs.down("[name=pricetype]").getValue(),
            selisih_dibawah: fs.down("[name=selisih_dibawah]").getValue()
        };
        f.setLoading("Please wait...");
        me.tools.ajax({
            params: params,
            success: function (data, model) {
                f.setLoading(false);

                var url = data.URL;
                if (url) {
                    f.up("window").close();
                    Ext.Msg.show({
                        title: 'Info',
                        msg: '<a href="' + url + '" target="blank">Download file</a>',
                        icon: Ext.Msg.INFO,
                        buttons: Ext.Msg.OK,
                        fn: function () {

                        }
                    });
                } else {
                    me.tools.alert.warning("Terjadi kesalahan ketikan membuat file excel.");
                }
            }
        }).read('excel');
    },
    schMonScheduleFormExcel: function () {
        var me = this;
        var w = me.instantWindow('FormExcel', 300, 'Download Excel', 'excel', 'mySchMonScheduleExcelWindow');
    },
    schMonScheduleUpdate: function () {
        var me = this;

        var gs = me.getGridsschedule();

        var ids = [], rbs = [], rmd = [], ddt = [];
        gs.getStore().each(function (rec) {
            if (rec.dirty) {
                ids.push(rec.get("schedule_id"));
                rbs.push(rec.get("remaining_balance"));
                rmd.push(rec.get("remaining_denda"));
                ddt.push(Ext.Date.format(rec.get("duedate"), 'Y-m-d H:i:s.u'));
            }
        });

        if (ids.length > 0) {
            var f = me.getFormdata();
            f.setLoading("Sedang mengupdate tagihan...");
            me.tools.ajax({
                params : {
                    ids : ids.join("~"),
                    rbs : rbs.join("~"),
                    rmd : rmd.join("~"),
                    ddt : ddt.join("~")
                },
                success : function (data, model) {
                    f.setLoading(false);
                    if (data.HASIL) {
                        me.tools.alert.info("Tagihan telah terupdate");
                        gs.getStore().loadPage(1);
                    } 
                    else {
                        me.tools.alert.warning("Terjadi kesalahan ketika mengupdate tagihan.");
                    }

                }
            }).read('updateschedule');
        } else {
            me.tools.alert.warning("Tidak ada tagihan yang di edit.");
        }
    },
    schMonPayDelete: function () {
        var me = this;
        var g = me.getGridpayment();
        var rec = g.getSelectedRecord();
        if (rec) {
            Ext.Msg.confirm('Delete Payment', 'Anda yakin menghapus payment ini?', function (btn) {
                if (btn == 'yes') {
                    me.tools.ajax({
                        params: {
                            payment_id: rec.get("payment_id")

                        },
                        success: function (data, model) {

                            if (data.hasil === 0) {
                                me.tools.alert.warning("Terjadi kesalahan ketika menghapus payment.");
                            } else {
                                me.tools.alert.error("Payment berhasil dihapus.");
                                g.getStore().loadPage(1);
                            }
                        }
                    }).read('hapuspayment');
                }
            });
        }
    },
    schMonEdit: function () {
        var me = this;
        var g = me.getGrid();
        var rec = g.getSelectedRecord();

        if (rec) {
            var w = me.instantWindow('FormData', 1000, 'Edit Schedule', 'editschedule', 'schMonFormWindow');
        }

        var gs = me.getGridsschedule();

        if (me.bisaEditSchedule) {
            gs.down("toolbar button[action=update]").show();
        }

        gs.doInit();
        gs.getStore().getProxy().setExtraParam("purchaseletter_id", rec.get("purchaseletter_id"));
        var pg = gs.down("pagingtoolbar");
        if (pg) {
            pg.getStore().load({
                params: {},
                callback: function (rec, op) {
                    gs.attachModel(op);

                    // var total = 0;
                    // var totalNilai = 0;
                    // gs.getStore().each(function (rec) {
                        // total += accounting.unformat(rec.get("remaining_balance"));
                        // totalNilai += accounting.unformat(rec.get("amount"));
                    // });

                    // me.getFormdata().down("[name=total_sisatagihan]").setValue(accounting.formatMoney(total));
                    // me.getFormdata().down("[name=total_nilaitagihan]").setValue(accounting.formatMoney(totalNilai));
                }
            });
        }

        // grid payment
        var gp = me.getGridpayment();
        gp.getSelectionModel().setSelectionMode('SINGLE');

        if (me.bisaHapusPayment) {
            gp.down("toolbar button[action=delete]").show();
        }


        gp.doInit();
        gp.getStore().getProxy().setExtraParam("purchaseletter_id", rec.get("purchaseletter_id"));
        var pg = gp.down("pagingtoolbar");
        if (pg) {
            pg.getStore().load({
                params: {},
                callback: function (rec, op) {
                    gp.attachModel(op);

                    // var total = 0;
                    // gp.getStore().each(function (rec) {
                    //     if (rec.get("cair_date")) {
                    //         total += accounting.unformat(rec.get("total_payment"));
                    //     }
                    // });

                    // me.getFormdata().down("[name=total_payment]").setValue(accounting.formatMoney(total));
                }
            });
        }

        me.tools.ajax({
            params: {
                purchaseletter_id: rec.get("purchaseletter_id")

            },
            success: function (data, model) {

                // console.log(data);
                var pl = data.purchaseletter[1][0];
                me.getFormdata().down("[name=purchaseletter_no]").setValue(pl.purchaseletter_no);
                me.getFormdata().down("[name=harga_total_jual]").setValue(accounting.formatMoney(pl.harga_total_jual));
            }
        }).read('purchaseletter');


    },
    panelAfterRender: function (configs) {
        this.callParent(arguments);
        var me = this;
        me.getGrid().getSelectionModel().setSelectionMode('SINGLE');

    },
    execAction: function (el, action, me) {
        /* KOSONG */
    },
    gridAfterRender: function (configs) {
        // this.callParent(arguments);
        var me = this;

        if(me.references.includes('formsearch')){
            var form = me.getFormsearch();
            me.textfield = Ext.ComponentQuery.query('[xtype=textfield]', form);
            
            for (var i=0;i<me.textfield.length;i++) {
                Ext.applyIf(me.textfield[i], {enableKeyEvents: true});
                
                me.textfield[i].on('keypress', function(e, el){
                    if (el.getCharCode() === 13) {
                        me.dataSearch();
                    }
                });
            }
        }

        var fields = me.getFormsearch().getValues();

        // me.getGrid().down("button[action=edit]").setDisabled(true);

        me.getGrid().doInit();
        for (var x in fields)
        {
            me.getGrid().getStore().getProxy().setExtraParam(x, fields[x]);
        }

        me.getGrid().down("button[action=edit]").setDisabled(true);
        me.getGrid().getStore().load({
            params: {},
            callback: function (rec, op) {
                me.getGrid().attachModel(op);

                var pg = me.getGrid().down("pagingtoolbar");
                if (pg) {
                    pg.getStore().load();
                }

                me.tools.ajax({
                    params: {},
                    success: function (data, model) {
                        // me.getGrid().down("button[action=edit]").setDisabled(false);
                        me.bisaHapusPayment = data.DELETEPAYMENT;
                        me.bisaEditSchedule = data.UPDATESCHEDULE;
                    }
                }).read('init');
            }
        });
    },
    showFormdata: function (action) {
        var me = this;
    },
    formScheduleSelectionChange: function() {
        var me   = this;
        var grid = me.getGridsschedule();
        var row  = grid.getSelectionModel().getSelection();

        grid.down('#btnEditSchedule').setDisabled(row.length != 1);
    },
    formPaymentSelectionChange: function() {
        var me   = this;
        var grid = me.getGridpayment();
        var row  = grid.getSelectionModel().getSelection();

        grid.down('#btnDeletePayment').setDisabled(row.length < 1);
    }
});