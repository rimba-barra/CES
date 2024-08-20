Ext.define('Erems.view.generalumvskpraccbelumakadreport.Panel', {
    extend: 'Erems.library.template.view.Panel',
    requires: ['Erems.view.generalumvskpraccbelumakadreport.FormData'],
    alias: 'widget.generalumvskpraccbelumakadreportpanel',
    itemId: 'GeneralumvskpraccbelumakadreportPanel',
    formSearchPanelName: 'generalumvskpraccbelumakadreportformsearch',
    layout: 'vbox',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'generalumvskpraccbelumakadreportformdata'
                }
            ]
        });

        me.callParent(arguments);
    }
   
});
