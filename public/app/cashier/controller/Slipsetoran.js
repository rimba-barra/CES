Ext.define('Cashier.controller.Slipsetoran', {
    extend: 'Cashier.library.template.controller.Controller2',
    alias: 'controller.Slipsetoran',
    requires: [
        'Cashier.library.tools.Mytools',
        'Cashier.library.box.Config',
        'Cashier.library.XyReportB',
        'Cashier.library.box.tools.EventSelector',
        'Cashier.library.box.tools.Tools'
    ],
    views: [
        'slipsetoran.Panel',
        'slipsetoran.FormData',
    ],
    stores: [
        'Slipsetoran'
    ],
    models: [
        'Slipsetoran'
    ],
    refs: [
        {
            ref: 'panel',
            selector: 'slipsetoranpanel'
        },
        {ref: 'formdata', selector: 'slipsetoranformdata'},
        {ref: 'winaj', selector: 'win-uploadformdata'},
    ],
    //setting properties variabel
    controllerName: 'slipsetoran',
    fieldName: '',
    xyReport: null,
    reportFileName: null,
    bindPrefixName: 'Slipsetoran',
    urlsubmit: 'cashier/slipsetoran/create',
    yeardata: null, fromdate: null, untildate: null, getyear: null,
    form: null, value: null, info: null, senddata: null,
    constructor: function (configs) {
        this.callParent(arguments);
        var me = this;
        this.myConfig = new Cashier.library.box.Config({
            _controllerName: me.controllerName
        });
    },
    init: function (application) {
        var me = this;
        var events = new Cashier.library.box.tools.EventSelector();
        this.control(events.getEvents(me, me.controllerName));
        me.tools = new Cashier.library.box.tools.Tools({config: me.myConfig});

        this.control({
            'slipsetoranpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: function (panel) {
//                    panel.up('window').maximize();
                }
            },
            'slipsetoranformdata': {
                afterrender: function (panel) {
                }
            },
            'slipsetoranformdata button[action=submit]': {
                click: this.dataSubmit
            },
            'slipsetoranformdata button[action=reset]': {
                click: function (v) {
                    var me = this;
                }
            },
        });
    },
    dataSubmit: function () {
        var me = this;
        var f = me.getFormdata();
        var templatename = f.down("[name=nama_bank]").getValue();
        me.printSlip();
    },
    printSlip: function () {
        var me = this;
//        console.log(me.reportFileName);
        if (me.reportFileName) {
            if (!me.xyReport) {
                me.xyReport = new Cashier.library.XyReportB();
                me.xyReport.init(me);
            }
            me.xyReport.processReportJsbyUser();
        } else {
            me.tools.alert.warning("Template not found.");
        }
    },
    xyReportProcessParams: function (reportData, param) {//xbreportapram
        var me = this;
        var f = me.getFormdata();
        var fn = me.reportFileName;
        reportData['file'] = fn;
        reportData.params["kasbank_date"] = moment(rec.get("kasbank_date")).format("DD-MM-YYYY");
        return reportData;
    },
});