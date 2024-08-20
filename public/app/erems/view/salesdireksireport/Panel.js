Ext.define('Erems.view.salesdireksireport.Panel', {
    extend: 'Erems.library.template.view.Panel',
    requires: ['Erems.view.salesdireksireport.FormData'],
    alias: 'widget.salesdireksireportpanel',
    itemId: 'SalesdireksireportPanel',
    formSearchPanelName: 'salesdireksireportformsearch',
    layout: 'vbox',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'salesdireksireportformdata'
                }
            ]
        });

        me.callParent(arguments);
    }
   
});
