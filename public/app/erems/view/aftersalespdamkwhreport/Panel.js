Ext.define('Erems.view.aftersalespdamkwhreport.Panel', {
    extend: 'Erems.library.template.view.Panel',
    requires: ['Erems.view.aftersalespdamkwhreport.FormData'],
    alias: 'widget.aftersalespdamkwhreportpanel',
    itemId: 'AftersalespdamkwhreportPanel',
    formSearchPanelName: 'aftersalespdamkwhreportformsearch',
    layout: 'vbox',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'aftersalespdamkwhreportformdata'
                }
            ]
        });

        me.callParent(arguments);
    }
   
});
