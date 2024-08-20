Ext.define('Erems.view.legalmonitorsppjbreport.Panel', {
    extend: 'Erems.library.template.view.Panel',
    requires: ['Erems.view.legalmonitorsppjbreport.FormData'],
    alias: 'widget.legalmonitorsppjbreportpanel',
    itemId: 'LegalmonitorsppjbreportPanel',
    formSearchPanelName: 'legalmonitorsppjbreportformsearch',
    layout: 'vbox',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'legalmonitorsppjbreportformdata'
                }
            ]
        });

        me.callParent(arguments);
    }
   
});
