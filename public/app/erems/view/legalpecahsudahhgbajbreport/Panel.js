Ext.define('Erems.view.legalpecahsudahhgbajbreport.Panel', {
    extend: 'Erems.library.template.view.Panel',
    requires: ['Erems.view.legalpecahsudahhgbajbreport.FormData'],
    alias: 'widget.legalpecahsudahhgbajbreportpanel',
    itemId: 'LegalpecahsudahhgbajbreportPanel',
    formSearchPanelName: 'legalpecahsudahhgbajbreportformsearch',
    layout: 'vbox',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'legalpecahsudahhgbajbreportformdata'
                }
            ]
        });

        me.callParent(arguments);
    }
   
});
