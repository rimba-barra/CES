Ext.define('Erems.controller.Tjjtreport', {
    extend: 'Erems.library.template.controller.ControllerReport',
    alias: 'controller.Tjjtreport',
    views: ['tjjtreport.Panel', 'tjjtreport.FormData', 'masterreport.Panel'],
    refs: [
        {
            ref: 'panel',
            selector: 'tjjtreportpanel'
        },
        {
            ref: 'formdata',
            selector: 'tjjtreportformdata'
        }

    ],
    controllerName: 'tjjtreport',
    bindPrefixName: 'Tjjtreport',
    init: function(application) {
        var me = this;
        this.control({
            'tjjtreportpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender

            },
            'tjjtreportformdata': {
                afterrender: this.formDataAfterRender
            },
            'tjjtreportformdata button[action=save]': {
                click: this.mainDataSave
            },
            'tjjtreportformdata button[action=cancel]': {
                click: this.formDataClose
            },
            'tjjtreportformdata button[action=process]': {
                click: function() {
                    me.processReport();
                }
            }




        });
    },
    /* must override */
    processParams: function(reportData) {
        var me = this;
        var groupBy = reportData.params["Groupby"];
        var fn = "TandaJadiJatuhTempo";
      
        reportData['file'] = fn;
        reportData.params["Building_class"] = me.fieldGetDisplayValue("buildingclass");
        return reportData;
    },

    loadedCbList:function(){
        var list = [];
        return list;
    },

});