Ext.define('Erems.view.salesperubahanreport.Panel', {
    extend: 'Erems.library.template.view.Panel',
    requires: ['Erems.view.salesperubahanreport.FormData'],
    alias: 'widget.salesperubahanreportpanel',
    itemId: 'SalesperubahanreportPanel',
    formSearchPanelName: 'salesperubahanreportformsearch',
    layout: 'vbox',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'salesperubahanreportformdata'
                }
            ]
        });

        me.callParent(arguments);
    }
   
});
