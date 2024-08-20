Ext.define('Cashier.controller.Reportpenerimaan', {
    extend: 'Cashier.library.template.controller.Controller2',
    alias: 'controller.Reportpenerimaan',
    requires: [
        'Cashier.library.tools.Mytools',
        'Cashier.library.box.Config',
        'Cashier.library.XyReportB',
        'Cashier.library.box.tools.EventSelector',
        'Cashier.library.box.tools.Tools'
    ],
    views: [
        'reportpenerimaan.Panel',
        'reportpenerimaan.FormData'
    ],
    stores: [
        //'Reportpenerimaan',
        'Ptbyusermulti'
    ],
    models: [
        'Reportpenerimaan',
        'Projectpt'
    ],
    refs: [
        {
            ref: 'panel',
            selector: 'reportpenerimaanpanel'
        },
        {ref: 'formdata', selector: 'reportpenerimaanformdata'},
    ],
    xyReport: null,
    reportFileName: null,
    //setting properties variabel
    controllerName: 'reportpenerimaan',
    fieldName: '',
    bindPrefixName: 'Reportpenerimaan',
    urlsubmit: 'cashier/reportpenerimaan/create',
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
            'reportpenerimaanpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: function (panel) {
                    me.getFormdata().down("[name=projectpt_id]").getStore().load();
                    Ext.get('WINDOW-mnu' + me.bindPrefixName).setHeight(400);
                    Ext.get('WINDOW-mnu' + me.bindPrefixName).setWidth(600);
                    me.getFormdata().down("[name=tipetanggal]").setValue('kwitansidate');
                    me.getFormdata().down("[name=tipedata]").setValue('realpost');
                    me.getFormdata().down("[name=projectpt_id]").setValue(parseInt(apps.projectpt));
                    me.getFormdata().down("[name=templatemrt]").setValue('temp1');
                }
            },
            'reportpenerimaanformdata': {
                afterrender: function (panel) {
                    this.formDataAfterRenderCustome();
                }
            },
            'reportpenerimaanformdata [name=fromdate]': {
                select: function () {
                    me.getFormdata().down("[name=untildate]").setMinValue(me.getValue(me, 'fromdate', 'raw'));
                    me.setValue(me, 'untildate', me.getValue(me, 'fromdate', 'raw'));
                    me.checkYear();
                }
            },
            'reportpenerimaanformdata [name=untildate]': {
                select: function () {
                    me.checkYear();
                }
            },
            'reportpenerimaanformdata button[action=submit]': {
                click: this.dataSubmit
            }
        });
    },
    checkYear: function () {
        var me;
        me = this;
        var until = me.getValue(me, 'untildate', 'raw');
        var from = me.getValue(me, 'fromdate', 'raw');
        var resfrom = from.substring(6);
        var resuntil = until.substring(6);

    },
    dataSubmit: function () {
        var me;
        me = this;
        me.printReport();
        console.log(me.getFormdata().down("[name=templatemrt]").getValue());
    },
    formDataAfterRenderCustome: function () {
        var me;
        me = this;
    },
    
    printReport: function () {
        var me = this;
        if(me.getFormdata().down("[name=templatemrt]").getValue()=="" || me.getFormdata().down("[name=templatemrt]").getValue()=="temp1"){
            me.reportFileName = "laporanpenerimaan";
        }
        if(me.getFormdata().down("[name=templatemrt]").getValue()=="temp2"){
            me.reportFileName = "laporanpenerimaanV2";
        }
        if (me.reportFileName) {
            if (!me.xyReport) {
                me.xyReport = new Cashier.library.XyReportB();
                me.xyReport.init(me);
            }
            var winId = me.controllerName + '_' + Ext.Date.format(new Date(), 'YmdHis');
            var title = 'Result ' + me.getFormdata().up('window').title;
            me.xyReport.processReportJsv3(winId, 800, title, me.controllerName, 1, null);
        } else {
            me.tools.alert.warning("Template not found.");
        }
    },
    xyReportProcessParams: function (reportData, param) {//xbreportapram
        var me = this;
        var rec = me.getFormdata().down("[name=projectpt_id]").getStore().findRecord("projectpt_id",  me.getFormdata().down("[name=projectpt_id]").getValue(),0,false,true,true);
        var fn = me.reportFileName;
        reportData['file'] = fn;
        reportData.params["begda"] = moment(me.getFormdata().down("[name=fromdate]").getValue()).format("YYYY-MM-DD");
        reportData.params["endda"] = moment(me.getFormdata().down("[name=untildate]").getValue()).format("YYYY-MM-DD");
        reportData.params["tipedata"] = me.getFormdata().down("[name=tipedata]").getValue();
        reportData.params["checkkwitansi"] = me.getFormdata().down("[name=checkkwitansi]").getValue();
        reportData.params["tipetanggal"] = me.getFormdata().down("[name=tipetanggal]").getValue();
        reportData.params["fromreceipt"] = me.getFormdata().down("[name=fromreceipt]").getValue();
        reportData.params["untilreceipt"] = me.getFormdata().down("[name=untilreceipt]").getValue();
        reportData.params["sortby"] = me.getFormdata().down("[name=sortby]").getValue();
        reportData.params["pt_id"] = rec.data['pt_id'];
        reportData.params["project_id"] = rec.data['project_id'];
        reportData.params["tgl_sekarang"] = Ext.Date.format(new Date(), 'd/m/Y');
        reportData.params["time_sekarang"] = Ext.Date.format(new Date(), 'H:i:s');
        reportData.params["userprint"] = apps.username;
        
        return reportData;
    },
});