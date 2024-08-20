Ext.define('Erems.controller.Generalsalesreport', {
    extend: 'Erems.library.template.controller.Controller2',
    requires: ['Erems.library.Browse', 'Erems.library.box.Config', 'Erems.library.box.tools.Tools', 'Erems.template.ComboBoxFields', 'Erems.library.box.tools.EventSelector', 'Erems.library.XyReportJs'],
    alias: 'controller.Generalsalesreport',
    views: ['generalsalesreport.Panel', 'generalsalesreport.FormData', 'masterreport.Panel'],
    refs: [
        {
            ref: 'panel',
            selector: 'generalsalesreportpanel'
        },
        {
            ref: 'formdata',
            selector: 'generalsalesreportformdata'
        }

    ],
    controllerName: 'generalsalesreport',
    bindPrefixName: 'Generalsalesreport',
    xyReport: null,
    printOutData: null,
    myConfig: null,
    constructor: function(configs) {
        this.callParent(arguments);
        var me = this;
        this.myConfig = new Erems.library.box.Config({
            _controllerName: me.controllerName
        });

        me.cbf = new Erems.template.ComboBoxFields();
    },
    init: function(application) {
        var me = this;
        me.tools = new Erems.library.box.tools.Tools({config: me.myConfig});
        this.control({
            'generalsalesreportpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender

            },
            'generalsalesreportformdata': {
                afterrender: this.formDataAfterRender
            },
            'generalsalesreportformdata button[action=reset]': {
		click: this.dataReset
            },
            'generalsalesreportformdata button[action=save]': {
                click: this.mainDataSave
            },
            'generalsalesreportformdata button[action=cancel]': {
                click: this.formDataClose
            },
            'generalsalesreportformdata button[action=process]': {
                click: function() {
                    me.mainPrint();
                }
            },
            'generalsalesreportformdata button[action=processexcel]': {
                click: function() {
                    me.printExcel();
                }
            },
            'generalsalesreportformdata button[action=processstockme]': {
                click: function() {
                    me.printExcelStockMe();
                }
            },
            'generalsalesreportformdata button[action=reportjs]': {
                click: function() {
                    me.printReportJs();
                }
            }

            //
            //




        });
    },
    printReportJs: function() {

        var me = this;
        var p = me.getPanel();
        p.setLoading("Please wait");
        var f = me.getFormdata();
        var vs = f.getValues();


        Ext.Ajax.timeout = 60000 * 5;

        var bcv = f.down("[name=buildingclass]").getValue();
        var cv = f.down("[name=cluster_id]").getValue();
        var tv = f.down("[name=type_id]").getValue();
        var pcv = f.down("[name=productcategory_id]").getValue();
        var salesv = f.down("[name=salesman_id]").getValue();
        var gt = me.tools.comboHelper(f.down("[name=buildingclass]")).getText(me.cbf.buildingclass);

        vs['buildingclass'] = bcv;
        vs['cluster_id'] = me.tools.intval(cv) === 999 ? 0 : cv;
        vs['type_id'] = me.tools.intval(tv) === 999 ? 0 : tv;
        vs['productcategory_id'] = me.tools.intval(pcv) === 999 ? 0 : pcv;
        vs['salesman_id'] = me.tools.intval(salesv) === 999 ? 0 : salesv;

        vs['Building_class'] = gt ? gt : 'ALL';
        vs['Cluster'] = me.tools.comboHelper(f.down("[name=cluster_id]")).getText(me.cbf.cluster);
        vs['Type'] = me.tools.comboHelper(f.down("[name=type_id]")).getText(me.cbf.type);

        vs['Product_category'] = me.tools.comboHelper(f.down("[name=productcategory_id]")).getText(me.cbf.productcategory);
        vs['Salesman'] = me.tools.intval(salesv) === 999 ? "ALL" : me.tools.comboHelper(f.down("[name=salesman_id]")).getText(me.cbf.salesman);

        var tipeReport = "excel";

        if (vs["Groupby"] === "cara bayar") {
            tipeReport = "excelcarabayar";
        } else if (vs["Groupby"] === "club citra") {
            tipeReport = "excelclubcitra";
        }

        me.tools.ajax({
            params: vs,
            success: function(data, model) {

                p.setLoading(false);
                Ext.Loader.injectScriptElement(document.URL + 'resources/stimulsoftjs/scripts/stimulsoft.reports.js', function() {

                    Ext.Loader.injectScriptElement(document.URL + 'resources/stimulsoftjs/scripts/stimulsoft.viewer.js', function() {


                        var report = new Stimulsoft.Report.StiReport();
                       // report.loadFile(document.URL + "app/erems/reportjs/GeneralSales.mrt");
                        report.loadFile(document.URL + "resources/stimulsoftjs/reports/Test.mrt");
                        var dataSet = new Stimulsoft.System.Data.DataSet("Demo");
// Load JSON data file from specified URL to the DataSet object
                        dataSet.readJsonFile(document.URL + "app/erems/json/"+ data['others'][0][0]['JSON']+".json");
// Remove all connections from the report template
                        report.dictionary.databases.clear();
// Register DataSet object
                        report.regData("Demo", "Demo", dataSet);

                        var viewer = new Stimulsoft.Viewer.StiViewer();
                        viewer.report = report;

                    }, function() {
                        //  me.tools.alert.warning("Error load Prolibs.js file.");
                    });


                }, function() {
                    //  me.tools.alert.warning("Error load Prolibs.js file.");
                });
            }
        }).read(tipeReport);



    },
    printExcelStockMe: function() {
        var me = this;
        var p = me.getPanel();
        p.setLoading("Please wait");
        var f = me.getFormdata();
        var vs = f.getValues();


        Ext.Ajax.timeout = 60000 * 10;

        var bcv = f.down("[name=buildingclass]").getValue();
        var cv = f.down("[name=cluster_id]").getValue();
        var tv = f.down("[name=type_id]").getValue();
        var pcv = f.down("[name=productcategory_id]").getValue();
        var salesv = f.down("[name=salesman_id]").getValue();
        var gt = me.tools.comboHelper(f.down("[name=buildingclass]")).getText(me.cbf.buildingclass);

        vs['buildingclass'] = bcv;
        vs['cluster_id'] = me.tools.intval(cv) === 999 ? 0 : cv;
        vs['type_id'] = me.tools.intval(tv) === 999 ? 0 : tv;
        vs['productcategory_id'] = me.tools.intval(pcv) === 999 ? 0 : pcv;
        vs['salesman_id'] = me.tools.intval(salesv) === 999 ? 0 : salesv;

        vs['Building_class'] = gt ? gt : 'ALL';
        vs['Cluster'] = me.tools.comboHelper(f.down("[name=cluster_id]")).getText(me.cbf.cluster);
        vs['Type'] = me.tools.comboHelper(f.down("[name=type_id]")).getText(me.cbf.type);

        vs['Product_category'] = me.tools.comboHelper(f.down("[name=productcategory_id]")).getText(me.cbf.productcategory);
        vs['Salesman'] = me.tools.intval(salesv) === 999 ? "ALL" : me.tools.comboHelper(f.down("[name=salesman_id]")).getText(me.cbf.salesman);


        me.tools.ajax({
            params: vs,
            success: function(data, model) {

                p.setLoading(false);
                var url = data['others'][0][0]['URL'];
                if (url) {
                    Ext.Msg.show({
                        title: 'Info',
                        msg: '<a href="' + url + '" target="blank">Download file</a>',
                        icon: Ext.Msg.INFO,
                        buttons: Ext.Msg.OK,
                        fn: function() {

                        }
                    });
                }
            }
        }).read('stockmeexcel');

    },
    printExcel: function() {

        var me = this;
        var p = me.getPanel();
        p.setLoading("Please wait");
        var f = me.getFormdata();
        var vs = f.getValues();


        Ext.Ajax.timeout = 60000 * 5;

        var bcv = f.down("[name=buildingclass]").getValue();
        var cv = f.down("[name=cluster_id]").getValue();
        var tv = f.down("[name=type_id]").getValue();
        var pcv = f.down("[name=productcategory_id]").getValue();
        var salesv = f.down("[name=salesman_id]").getValue();
        var gt = me.tools.comboHelper(f.down("[name=buildingclass]")).getText(me.cbf.buildingclass);

        vs['buildingclass'] = bcv;
        vs['cluster_id'] = me.tools.intval(cv) === 999 ? 0 : cv;
        vs['type_id'] = me.tools.intval(tv) === 999 ? 0 : tv;
        vs['productcategory_id'] = me.tools.intval(pcv) === 999 ? 0 : pcv;
        vs['salesman_id'] = me.tools.intval(salesv) === 999 ? 0 : salesv;

        vs['Building_class'] = gt ? gt : 'ALL';
        vs['Cluster'] = me.tools.comboHelper(f.down("[name=cluster_id]")).getText(me.cbf.cluster);
        vs['Type'] = me.tools.comboHelper(f.down("[name=type_id]")).getText(me.cbf.type);

        vs['Product_category'] = me.tools.comboHelper(f.down("[name=productcategory_id]")).getText(me.cbf.productcategory);
        vs['Salesman'] = me.tools.intval(salesv) === 999 ? "ALL" : me.tools.comboHelper(f.down("[name=salesman_id]")).getText(me.cbf.salesman);

        var tipeReport = "excel";

        if (vs["Groupby"] === "cara bayar") {
            tipeReport = "excelcarabayar";
        } else if (vs["Groupby"] === "club citra") {
            tipeReport = "excelclubcitra";
        }

        me.tools.ajax({
            params: vs,
            success: function(data, model) {


                p.setLoading(false);
                var url = data['others'][0][0]['URL'];
                if (url) {
                    Ext.Msg.show({
                        title: 'Info',
                        msg: '<a href="' + url + '" target="blank">Download file</a>',
                        icon: Ext.Msg.INFO,
                        buttons: Ext.Msg.OK,
                        fn: function() {

                        }
                    });
                }
            }
        }).read(tipeReport);

    },
    panelAfterRender: function(configs) {
        this.callParent(arguments);
        var me = this;
        var p = me.getPanel();
        p.setLoading("Please wait");
        me.tools.ajax({
            params: {},
            success: function(data, model) {
                // global params
                //  me.globalParams = data['others'][0][0]['GLOBALPARAMSPARAMS'];

                var form = me.getFormdata();

                me.tools.wesea(data.cluster, form.down("[name=cluster_id]")).comboBox(true);
                me.tools.wesea(data.productcategory, form.down("[name=productcategory_id]")).comboBox(true);
                me.tools.wesea(data.type, form.down("[name=type_id]")).comboBox(true);
                me.tools.wesea(data.salesman, form.down("[name=salesman_id]")).comboBox(true);
                // me.fillFormSearchComponents(data, me.getFormsearch());
                p.setLoading(false);
            }
        }).read('init');

    },
    /*@implement this method for xyReport Class*/
    xyReportProcessParams: function(reportData) {
        var me = this;
        var groupBy = reportData.params["Groupby"];
        var fn = "GeneralSales";
        var plId = 0;
        var f = me.getFormdata();
        var gb = f.down("#groupBy").getValue().Groupby;
        if (gb === 'club citra') {
            fn = "GeneralSalesClubCitra"
        }
        else if (gb === "cara bayar") {
            fn = "GeneralSalesCaraBayar"
        }
        else {
            fn = "GeneralSales"
        }

        reportData['file'] = fn;
        reportData.params = me.printOutData;
        return reportData;
    },
    mainPrint: function() {
        var me = this;
        if (!me.xyReport) {
            me.xyReport = new Erems.library.XyReportJs();
            me.xyReport.init(me);
        }


        var p = me.getPanel();
        p.setLoading("Please wait...");
        me.tools.ajax({
            params: me.getFormdata().getValues(),
            success: function(data, model) {
                p.setLoading(false);
                console.log(data);
                me.printOutData = data['others'][0][0]['DATA'];
                var f = me.getFormdata();

                var bcv = f.down("[name=buildingclass]").getValue();
                var cv = f.down("[name=cluster_id]").getValue();
                var tv = f.down("[name=type_id]").getValue();
                var pcv = f.down("[name=productcategory_id]").getValue();
                var salesv = f.down("[name=salesman_id]").getValue();
                var gt = me.tools.comboHelper(f.down("[name=buildingclass]")).getText(me.cbf.buildingclass);

                me.printOutData['buildingclass'] = bcv;
                me.printOutData['cluster_id'] = me.tools.intval(cv) === 999 ? 0 : cv;
                me.printOutData['type_id'] = me.tools.intval(tv) === 999 ? 0 : tv;
                me.printOutData['productcategory_id'] = me.tools.intval(pcv) === 999 ? 0 : pcv;
                me.printOutData['salesman_id'] = me.tools.intval(salesv) === 999 ? 0 : salesv;

                me.printOutData['Building_class'] = gt ? gt : 'ALL';
                me.printOutData['Cluster'] = me.tools.comboHelper(f.down("[name=cluster_id]")).getText(me.cbf.cluster);
                me.printOutData['Type'] = me.tools.comboHelper(f.down("[name=type_id]")).getText(me.cbf.type);

                me.printOutData['Product_category'] = me.tools.comboHelper(f.down("[name=productcategory_id]")).getText(me.cbf.productcategory);
                me.printOutData['Salesman'] = me.tools.intval(salesv) === 999 ? "ALL" : me.tools.comboHelper(f.down("[name=salesman_id]")).getText(me.cbf.salesman);
                me.xyReport.processReport();

            }
        }).read('printout');



    },
    
    dataReset: function () {
		var me = this;
		me.getFormdata().getForm().reset();
    },
});