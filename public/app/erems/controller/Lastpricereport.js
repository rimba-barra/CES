Ext.define('Erems.controller.Lastpricereport', {
    extend: 'Erems.library.template.controller.Controller2',
    alias: 'controller.Lastpricereport',
    views: ['lastpricereport.Panel', 'lastpricereport.FormData', 'masterreport.Panel'],
    refs: [
        {
            ref: 'panel',
            selector: 'lastpricereportpanel'
        },
        {
            ref: 'formdata',
            selector: 'lastpricereportformdata'
        }

    ],
    controllerName: 'lastpricereport',
    bindPrefixName: 'Lastpricereport',
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
            'lastpricereportpanel': {
                beforerender: me.mainPanelBeforeRender
            

            },
            'lastpricereportformdata': {
                afterrender: this.formDataAfterRender
            },
            'lastpricereportformdata button[action=reset]': {
		click: this.dataReset
            },
            'lastpricereportformdata button[action=save]': {
                click: this.mainDataSave
            },
            'lastpricereportformdata button[action=cancel]': {
                click: this.formDataClose
            },
            'lastpricereportformdata button[action=processexcel]': {
                click: function() {
                    me.printExcel();
                }
            }
           
          

            //
            //




        });
    },
    printExcel: function() {

        var me = this;
        var p = me.getPanel();
        p.setLoading("Please wait");
        var f = me.getFormdata();
        var vs = f.getValues();


        Ext.Ajax.timeout = 60000 * 5;

     
        var tipeReport = "excel";


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
    
    dataReset: function () {
		var me = this;
		me.getFormdata().getForm().reset();
    },
   
});