Ext.define('Cashier.controller.Kartupiutangsurabaya', {
    extend: 'Cashier.library.template.controller.Controller2',
    alias: 'controller.Kartupiutangsurabaya',
    views: ['kartupiutangsurabaya.Panel', 'kartupiutangsurabaya.Grid', 'kartupiutangsurabaya.FormSearch', 'kartupiutangsurabaya.FormData', 'masterreport.Panel'],
    requires: ['Cashier.library.XyReportB',
        'Cashier.library.box.Config', 'Cashier.library.box.tools.Tools', 'Cashier.template.ComboBoxFields', 'Cashier.library.box.tools.EventSelector'],
    refs: [
        {
            ref: 'grid',
            selector: 'kartupiutangsurabayagrid'
        },
        {
            ref: 'formsearch',
            selector: 'kartupiutangsurabayaformsearch'
        },
        {
            ref: 'formdata',
            selector: 'kartupiutangsurabayaformdata'
        },
        {
            ref: 'gridbilling',
            selector: 'kartupiutangsurabayabillingschedulegrid'
        },
        {
            ref: 'gridpayment',
            selector: 'kartupiutangsurabayalistpaymentgrid'
        },
        {
            ref: 'panel',
            selector: 'kartupiutangsurabayapanel'
        }
    ],
    controllerName: 'kartupiutangsurabaya',
    fieldName: 'expense_no',
    bindPrefixName: 'Kartupiutangsurabaya',
    formWidth: 800,
    nomMaster: 'list_kartupiutangsurabaya',
    localStore: {
        selectedUnit: null,
        customer: null,
        price: null,
        detail: null
    },
    xyReport: null,
    tools: null,
    myConfig: null,
    cbf: null,
    mt: null,
    iwField: {
        title: 'Kartu Piutang'
    },
    formxWinId: 'win-kartupiutangsurabayawinId',
    reportFileName: null,
    reportFileNameCustomer: null,
    DENDAALERT: false,
    constructor: function (configs) {
        this.callParent(arguments);
        var me = this;
        this.myConfig = new Cashier.library.box.Config({
            _controllerName: me.controllerName
        });

        me.cbf = new Cashier.template.ComboBoxFields();
    },
    init: function (application) {
        var me = this;
        me.tools = new Cashier.library.box.tools.Tools({config: me.myConfig});
        this.control({
            'kartupiutangsurabayapanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender

            },
            'kartupiutangsurabayagrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange
            },
            'kartupiutangsurabayagrid toolbar button[action=create]': {
                click: function () {
                    this.formDataShow('create');
                }
            },
            'kartupiutangsurabayagrid toolbar button[action=update]': {
                click: function () {
                    this.formDataShow('update');
                }
            },
            'kartupiutangsurabayagrid toolbar button[action=destroy]': {
                click: this.dataDestroy
            },
            'kartupiutangsurabayagrid toolbar button[action=print]': {
                click: this.mainPrint
            },
            // edited by Rizal 13-02-2019
            'kartupiutangsurabayagrid toolbar button[action=printcustomer]': {
                click: this.mainPrintCustomer
            },
            //
            'kartupiutangsurabayagrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                click: this.gridActionColumnClick
            },
            'kartupiutangsurabayaformsearch': {
                afterrender: this.formSearchAfterRender
            },
            'kartupiutangsurabayaformsearch button[action=search]': {
                click: this.dataSearch
            },
            'kartupiutangsurabayaformsearch button[action=reset]': {
                click: this.dataReset
            },
            'kartupiutangsurabayaformdata': {
                afterrender: this.formDataAfterRender
            },
            'kartupiutangsurabayaformdata button[action=save]': {
                click: this.dataSave
            },
            'kartupiutangsurabayaformdata button[action=cancel]': {
                click: this.formDataClose
            },
            'kartupiutangsurabayalistpaymentgrid': {
                itemdblclick: function () {
                    me.gridPaymentItemDblClick();
                }
            },
            'kartupiutangsurabayalistpaymentgrid actioncolumn': {
                click: this.insActionColumnClick
            },
        });
    },
    insACC: function (view, action, row) {
        var me = this;
        var grid = view.up("grid");

        switch (grid.itemId) {
            case "KartupiutangsurabayalistpaymentgridID":
                if (action === "show") {
                    me.gridPaymentItemDblClick(row);
                }
                break;
        }
    },
    gridPaymentItemDblClick: function (row) {
        var me = this;
        var rec = null;
        var r = typeof row === 'undefined' ? -1 : row;
        if (r > -1) {
            rec = me.getGridpayment().getStore().getAt(r);
        } else {
            rec = me.getGridpayment().getSelectedRecord();
        }

        if (rec) {
            var c = _Apps.getController('Installmentpayment');
            c.paymentId = rec.get("payment_id");
            c.formDataShow(c.getFormdata(), 'Payment Information', c.bindPrefixName + 'Update');



        }

    },
    gridItemDblClick: function (configs) {
        var me = this;
        me.formDataShow(me.getFormdata(), 'update');
    },
    panelAfterRender: function (configs) {
        this.callParent(arguments);
        var me = this;
        var p = me.getPanel();
        p.setLoading("Please wait");
        me.tools.ajax({
            params: {is_cashier: 1},
            panel: p,
            success: function (data, model) {

                me.fillFormSearchComponents(data, me.getFormsearch());
                me.tools.weseav2(data.pt, me.getFormsearch().down("[name=pt_pt_id]")).comboBox();
                p.setLoading(false);

                me.getFormsearch().down("[name=pt_pt_id]").setValue(parseInt(apps.pt));

                me.reportFileName = data['others'][0][0]['FILE_REPORT'];
                me.DENDAALERT = data['others'][0][0]['DENDAALERT'];

            }
        }).read('searchassets');
    },
    fillFormSearchComponents: function (data, f) {
        var me = this;
        me.tools.wesea(data.cluster, f.down("[name=cluster_id]")).comboBox(true);
        me.tools.wesea(data.block, f.down("[name=block_id]")).comboBox(true);
        me.tools.wesea(data.position, f.down("[name=position_id]")).comboBox(true);
        me.tools.wesea(data.productcategory, f.down("[name=productcategory_id]")).comboBox(true);
        me.tools.wesea(data.type, f.down("[name=type_id]")).comboBox(true);
        me.tools.wesea(data.purpose, f.down("[name=purpose_id]")).comboBox(true);
        me.tools.wesea(data.side, f.down("[name=side_id]")).comboBox(true);
        me.tools.wesea(data.unitstatus, f.down("[name=unitstatus_id]")).comboBox(true);
    },
    /*@implement this method for xyReport Class*/
    xyReportProcessParams: function (reportData) {
        var me = this;
        var groupBy = reportData.params["Groupby"];
        var fn = me.reportFileName;
        var plId = 0;
        /// added
        var g = me.getGrid();
        var rec = g.getSelectedRecord();

        if (rec) {
            plId = rec.get("purchaseletter_id");
        } else {

        }
     //   console.log(plId);
        // end added
        // reportData.params['con_string'] = "server=NB-MIS06\SQLEXPRESS;database=erems;user=sa;password=password12345";
        reportData['file'] = fn;
        reportData.params["purchaseletter_id"] = plId;
        return reportData;
    },
    mainPrintCustomer: function () {
        var me = this;
        var rec = me.getGrid().getSelectedRecord();
        me.reportFileView = me.reportFileNameCustomer;
        if (me.DENDAALERT) {

            if (rec) {
                var denda = me.tools.floatval(rec.get("schedule_remaining_denda"));
                if (denda > 0.0) {
                    Ext.Msg.show({
                        title: 'Info',
                        msg: "Masih Ada Denda Tidak bisa serah terima, masih ada denda berjalan konfirm collection",
                        icon: Ext.Msg.INFO,
                        buttons: Ext.Msg.OK,
                        fn: function () {
                            me.mainPrintInternCust(rec);


                        }
                    });
                } else {
                    me.mainPrintInternCust(rec);
                }

            }

        } else {
            me.mainPrintInternCust(rec);
        }



    },
    mainPrint: function () {
        var me = this;
        var rec = me.getGrid().getSelectedRecord();
        if (me.DENDAALERT) {

            if (rec) {
                var denda = me.tools.floatval(rec.get("schedule_remaining_denda"));
                if (denda > 0.0) {
                    Ext.Msg.show({
                        title: 'Info',
                        msg: "Masih Ada Denda Tidak bisa serah terima, masih ada denda berjalan konfirm collection",
                        icon: Ext.Msg.INFO,
                        buttons: Ext.Msg.OK,
                        fn: function () {
                            me.mainPrintIntern(rec);


                        }
                    });
                } else {
                    me.mainPrintIntern(rec);
                }

            }

        } else {
            me.mainPrintIntern(rec);
        }



    },
   mainPrintInternCust: function (rec) {
        var me = this;
        me.reportFileName = null;
        var p = me.getPanel();
        p.setLoading("Please wait");
        me.tools.ajax({
            params: {pt_id:rec.get("pt_pt_id"),project_id:rec.get("project_project_id")},
            panel: p,
            success: function (data, model) {
                p.setLoading(false);
                me.reportFileName = data['others'][0][0]['FILE_REPORT_CUSTOMER'];
                if (me.reportFileName) {
                    if (!me.xyReport) {
                        me.xyReport = new Cashier.library.XyReportB();
                        me.xyReport.init(me);
                    }
                    var winId = me.controllerName + '_' + Ext.Date.format(new Date(), 'YmdHis');
                    var title = 'Result ' + me.getGrid().up('window').title;
                    me.xyReport.processReportJsv3(winId, 800, title, me.controllerName, 2, null);
                }
            }
        }).read('searchfile');


    },
   mainPrintIntern: function (rec) {
        var me = this;
        me.reportFileName = null;
        var p = me.getPanel();
        p.setLoading("Please wait");
        me.tools.ajax({
            params: {pt_id:rec.get("pt_pt_id"),project_id:rec.get("project_project_id")},
            panel: p,
            success: function (data, model) {
                p.setLoading(false);
                me.reportFileName = data['others'][0][0]['FILE_REPORT'];
                if (me.reportFileName) {
                    if (!me.xyReport) {
                        me.xyReport = new Cashier.library.XyReportB();
                        me.xyReport.init(me);
                    }
                    var winId = me.controllerName + '_' + Ext.Date.format(new Date(), 'YmdHis');
                    var title = 'Result ' + me.getGrid().up('window').title;
                    me.xyReport.processReportJsv3(winId, 800, title, me.controllerName, 2, null);
                }
            }
        }).read('searchfile');


    },
    execAction: function (el, action, me) {
        if (!action) {
            action = '';
        }
        if (!me) {
            me = this;
        }

        switch (action) {

            case me.bindPrefixName + 'View':

                me.formDataShow(el, acts[action], action);
                break;
            case me.bindPrefixName + 'Print':
                //loadReport(el, 'tms/building/print');
                break;
        }
    },
    fdar: function () {
        var me = this;
        var f = me.getFormdata();
        var x = {
            init: function () {
                me.setActiveForm(f);
                f.up("window").maximizable = true;
                me.localStore.detail = me.instantStore({
                    id: me.controllerName + 'KPDetailStore',
                    extraParams: {
                        mode_read: 'maindetail'
                    },
                    idProperty: 'purchaseletter_id'
                });


                f.setLoading("Please wait");
                var selectedRec = me.getGrid().getSelectedRecord();
                var plId = selectedRec.raw.purchaseletter.purchaseletter_id;
                var gp = me.getGridpayment();
                gp.doInit();
                var gb = me.getGridbilling();
                gb.doInit();
                f.down("[name=salesman_employee_name]").setValue(selectedRec.get("salesman_employee_name"));
                f.setLoading("Loading kartu piutang information...");
                me.localStore.detail.load({
                    params: {
                        purchaseletter_id: plId
                    },
                    callback: function (rec, op) {
                        me.attachModel(op, me.localStore.detail, false);
                        var rec = me.localStore.detail.getAt(0);

                        f.loadRecord(rec);
                        console.log(rec);
                        f.down("[name=total_payment]").setValue(me.tools.floatval(rec.raw.purchaseletter.total_payment));

                        var ar = ['price_harga_neto', 'price_harga_bajb', 'price_harga_bbnsertifikat',
                            'price_harga_bphtb', 'price_harga_jual', 'harga_admsubsidi',
                            'harga_paket_tambahan', 'harga_administrasi',
                            'harga_total_jual', 'remaining_balance', 'total_payment', 'harga_salesdisc'];
                        for (var x in ar) {
                            me.sete(ar[x]).toMoney();
                        }

                        me.tools.ajax({
                            params: {
                                purchaseletter_id: plId
                            },
                            success: function (datap, modelp) {
                                me.tools.wesea({
                                    data: datap,
                                    model: modelp
                                }, gp).grid();
                                f.setLoading("Loading billing schedule...");
                                me.tools.ajax({
                                    params: {
                                        purchaseletter_id: plId
                                    },
                                    success: function (databs, modelbs) {
                                        me.tools.wesea({
                                            data: databs,
                                            model: modelbs
                                        }, gb).grid();
                                        f.setLoading(false);



                                        var totalPiutang = 0;
                                        for (var i = 0; i < databs.length; i++) {
                                            totalPiutang += me.tools.floatval(databs[i].schedule.amount);
                                        }
                                        f.down("[name=total_piutang]").setValue(totalPiutang);
                                        me.sete('total_piutang').toMoney();
                                    }
                                }).read('schedule');

                                console.log(datap);


                                var totalPay = 0;
                                for (var i = 0; i < datap.length; i++) {
                                    totalPay += me.tools.floatval(datap[i].payment.total_payment);
                                }
                                f.down("[name=total_pembayaran]").setValue(totalPay);
                                me.sete('total_pembayaran').toMoney();


                            }
                        }).read('paymentlist');



                    }}
                );

            },
            create: function () {
                f.up("window").maximize(true);
            },
            update: function () {
                me.getActiveForm().loadRecord(me.getGrid().getSelectedRecord());
                f.up("window").maximize(true);

            }
        };
        return x;
    }




});
