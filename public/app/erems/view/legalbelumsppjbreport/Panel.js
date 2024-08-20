Ext.define('Erems.view.legalbelumsppjbreport.Panel', {
    extend: 'Erems.library.template.view.Panel',
    requires: ['Erems.view.legalbelumsppjbreport.FormData'],
    alias: 'widget.legalbelumsppjbreportpanel',
    itemId: 'LegalbelumsppjbreportPanel',
    formSearchPanelName: 'legalbelumsppjbreportformsearch',
    layout: 'vbox',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'legalbelumsppjbreportformdata'
                }
            ]
        });

        me.callParent(arguments);
    }
   
});
