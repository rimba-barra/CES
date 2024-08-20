Ext.define('Erems.view.generalkprsudahakadblmcairreport.Panel', {
    extend: 'Erems.library.template.view.Panel',
    requires: ['Erems.view.generalkprsudahakadblmcairreport.FormData'],
    alias: 'widget.generalkprsudahakadblmcairreportpanel',
    itemId: 'GeneralkprsudahakadblmcairreportPanel',
    formSearchPanelName: 'generalkprsudahakadblmcairreportformsearch',
    layout: 'vbox',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'generalkprsudahakadblmcairreportformdata'
                }
            ]
        });

        me.callParent(arguments);
    }
   
});
