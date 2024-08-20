Ext.define('Erems.view.reportescrowdetail.Panel', {
    extend: 'Erems.library.template.view.Panel',
    requires: ['Erems.view.reportescrowdetail.FormData'],
    alias: 'widget.reportescrowdetailpanel',
    itemId: 'ReportescrowdetailPanel',
    formSearchPanelName: 'reportescrowdetailformsearch',
    layout: 'vbox',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'reportescrowdetailformdata'
                }
            ]
        });

        me.callParent(arguments);
    }
   
});
