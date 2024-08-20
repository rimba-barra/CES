Ext.define('Erems.view.stockmereport.Panel', {
    extend: 'Erems.library.template.view.Panel',
    requires: ['Erems.view.stockmereport.FormData'],
    alias: 'widget.stockmereportpanel',
    itemId: 'StockmereportPanel',
    formSearchPanelName: 'stockmereportformsearch',
    layout: 'vbox',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'stockmereportformdata'
                }
            ]
        });

        me.callParent(arguments);
    }
   
});
