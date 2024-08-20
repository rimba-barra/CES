Ext.define('Erems.view.stockmereportb.Panel', {
    extend: 'Erems.library.template.view.Panel',
    requires: ['Erems.view.stockmereportb.FormData'],
    alias: 'widget.stockmereportbpanel',
    itemId: 'StockmereportbPanel',
    formSearchPanelName: 'stockmereportbformsearch',
    layout: 'hbox',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'stockmereportbformdata'
                }
            ]
        });

        me.callParent(arguments);
    }
   
});
