Ext.define('Erems.controller.TownPlanningReport', {
    extend: 'Erems.library.template.controller.Controller2',
    requires: [
                'Erems.library.Browse', 
                'Erems.library.box.Config', 
                'Erems.library.box.tools.Tools', 
                'Erems.template.ComboBoxFields', 
                'Erems.library.box.tools.EventSelector', 
                'Erems.library.XyReport'
            ],
    alias: 'controller.Townplanningreport',
    views: ['townplanningreport.Panel', 'townplanningreport.FormData', 'masterreport.Panel'],
    refs: [
        {
            ref: 'panel',
            selector: 'townplanningreportpanel'
        },
        {
            ref: 'formdata',
            selector: 'townplanningreportformdata'
        }

    ],
    stores: [
        
    ],
    controllerName: 'townplanningreport',
    bindPrefixName: 'Townplanningreport',
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
            'townplanningreportpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender
            },
            'townplanningreportformdata': {
                afterrender: this.formDataAfterRender,              
            },
            'townplanningreportformdata button[action=save]': {
                click: this.mainDataSave
            },
            'townplanningreportformdata button[action=cancel]': {
                click: this.formDataClose
            },
            'townplanningreportformdata button[action=process]': {
                click: function() {
                    me.mainPrint();
                }
            },
            'townplanningreportformdata button[action=reset]': {
                click: function (){
                    var me = this;
                    me.getFormdata().getForm().reset();
                }
            },
            'townplanningreportformdata [name=cbf_buildingclass]': {
                change: me.checkboxChangeReport
            },
            'townplanningreportformdata [name=buildingclass]': {
                select: me.comboboxChangeReport
            },
            'townplanningreportformdata [name=cbf_cluster]': {
                change: me.checkboxChangeReport
            },
            'townplanningreportformdata [name=cluster_id]': {
                select: me.comboboxChangeReport
            },
            'townplanningreportformdata [name=cbf_type]': {
                change: me.checkboxChangeReport
            },
            'townplanningreportformdata [name=type_id]': {
                select: me.comboboxChangeReport
            },
            'townplanningreportformdata [name=cbf_productcategory]': {
                change: me.checkboxChangeReport
            },
            'townplanningreportformdata [name=productcategory_id]': {
                select: me.comboboxChangeReport
            },
            'townplanningreportformdata [name=cbf_unitstatus]': {
                change: me.checkboxChangeReport
            },
            'townplanningreportformdata [name=unitstatus_id]': {
                select: me.comboboxChangeReport
            },
        });
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
              
                /* start added by ahmad riadi 28-12-2016 */
                me.tools.wesea(data.unitstatus, form.down("[name=unitstatus_id]")).comboBox(true);
                /* end added by ahmad riadi 28-12-2016 */
                
                // me.fillFormSearchComponents(data, me.getFormsearch());
                p.setLoading(false);
            }
        }).read('init');

    },
    /*@implement this method for xyReport Class*/
    xyReportProcessParams: function(reportData) {
        var me = this;
    
        var params = me.getFormdata().getForm().getFieldValues();        
        var fn = params["Groupby"]==="cluster"?"TownPlanningCluster":"TownPlanningType";
        //console.log(me.printOutData);
        reportData['file'] = fn;
        reportData.params = me.printOutData;
        
        return reportData;
    },
    mainPrint: function() {
        var me = this;
        if (!me.xyReport) {
            me.xyReport = new Erems.library.XyReport();
            me.xyReport.init(me);
        }
        var p = me.getPanel();
        p.setLoading("Please wait...");
        me.tools.ajax({
            params: me.getFormdata().getValues(),
            success: function(data, model) {
                p.setLoading(false);
                me.printOutData = data['others'][0][0]['DATA'];
                var f = me.getFormdata();

                var bcv = f.down("[name=buildingclass]").getValue();
                var cv = f.down("[name=cluster_id]").getValue();
                var tv = f.down("[name=type_id]").getValue();
                var pcv = f.down("[name=productcategory_id]").getValue();
                var sav = f.down("[name=unitstatus_id]").getValue();
                var gt = me.tools.comboHelper(f.down("[name=buildingclass]")).getText(me.cbf.buildingclass);
               
			    console.log(sav);
                                              
                me.printOutData['buildingclass'] = bcv;
                me.printOutData['cluster_id'] = me.tools.intval(cv) === 999 ? 0 : cv;
                me.printOutData['type_id'] = me.tools.intval(tv) === 999 ? 0 : tv;
                me.printOutData['productcategory_id'] = me.tools.intval(pcv) === 999 ? 0 : pcv;
                me.printOutData['unitstatus_id'] = me.tools.intval(sav) === 999 ? 0 : sav;

                me.printOutData['Building_class'] = gt ? gt : 'ALL';
                me.printOutData['Cluster'] = me.tools.comboHelper(f.down("[name=cluster_id]")).getText(me.cbf.cluster);
                me.printOutData['Type'] = me.tools.comboHelper(f.down("[name=type_id]")).getText(me.cbf.type);
                me.printOutData['Status'] = me.tools.comboHelper(f.down("[name=unitstatus_id]")).getText(me.cbf.unitstatus);
                me.printOutData['Product_category'] = me.tools.comboHelper(f.down("[name=productcategory_id]")).getText(me.cbf.productcategory);
                me.xyReport.processReportjs();

            }
        }).read('printout');
    },
});