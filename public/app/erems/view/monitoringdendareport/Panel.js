Ext.define('Erems.view.monitoringdendareport.Panel', {
    extend: 'Erems.library.template.view.Panel',
    requires: ['Erems.view.monitoringdendareport.FormData'],
    alias: 'widget.monitoringdendareportpanel',
    itemId: 'MonitoringdendareportPanel',
    formSearchPanelName: 'monitoringdendareportformsearch',
    layout: 'vbox',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'monitoringdendareportformdata'
                }
            ]
        });

        me.callParent(arguments);
    }
   
});
