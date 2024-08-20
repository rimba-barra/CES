Ext.define('Erems.view.collkprbelumaccreport.Panel', {
    extend: 'Erems.library.template.view.Panel',
    requires: ['Erems.view.collkprbelumaccreport.FormData'],
    alias: 'widget.collkprbelumaccreportpanel',
    itemId: 'CollkprbelumaccreportPanel',
    formSearchPanelName: 'collkprbelumaccreportformsearch',
    layout: 'vbox',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'collkprbelumaccreportformdata'
                }
            ]
        });

        me.callParent(arguments);
    }
   
});
