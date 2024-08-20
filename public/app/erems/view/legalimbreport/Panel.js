Ext.define('Erems.view.legalimbreport.Panel', {
    extend: 'Erems.library.template.view.Panel',
    requires: ['Erems.view.legalimbreport.FormData'],
    alias: 'widget.legalimbreportpanel',
    itemId: 'LegalimbreportPanel',
    formSearchPanelName: 'legalimbreportformsearch',
    layout: 'vbox',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'legalimbreportformdata'
                }
            ]
        });

        me.callParent(arguments);
    }
   
});
