Ext.define('Erems.view.monitoringkomisireport.Panel', {
    extend: 'Erems.library.template.view.Panel',
    requires: ['Erems.view.monitoringkomisireport.FormData'],
    alias: 'widget.monitoringkomisireportpanel',
    itemId: 'DetailcontrolreportPanel',
    formSearchPanelName: 'monitoringkomisireportformsearch',
    layout: 'vbox',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'monitoringkomisireportformdata'
                }
            ]
        });

        me.callParent(arguments);
    }
   
});
