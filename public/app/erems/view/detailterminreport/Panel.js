Ext.define('Erems.view.detailterminreport.Panel', {
    extend: 'Erems.library.template.view.Panel',
    requires: ['Erems.view.detailterminreport.FormData'],
    alias: 'widget.detailterminreportpanel',
    itemId: 'DetailterminreportPanel',
    formSearchPanelName: 'detailterminreportformsearch',
    layout: 'vbox',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'detailterminreportformdata'
                }
            ]
        });

        me.callParent(arguments);
    }
   
});
