Ext.define('Erems.view.futurecollectionreport.Panel', {
    extend: 'Erems.library.template.view.Panel',
    requires: ['Erems.view.futurecollectionreport.FormData'],
    alias: 'widget.futurecollectionreportpanel',
    itemId: 'DetailcontrolreportPanel',
    formSearchPanelName: 'futurecollectionreportformsearch',
    layout: 'vbox',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'futurecollectionreportformdata'
                }
            ]
        });

        me.callParent(arguments);
    }
   
});
