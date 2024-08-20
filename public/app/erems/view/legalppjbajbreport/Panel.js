Ext.define('Erems.view.legalppjbajbreport.Panel', {
    extend: 'Erems.library.template.view.Panel',
    requires: ['Erems.view.legalppjbajbreport.FormData'],
    alias: 'widget.legalppjbajbreportpanel',
    itemId: 'LegalppjbajbreportPanel',
    formSearchPanelName: 'legalppjbajbreportformsearch',
    layout: 'vbox',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'legalppjbajbreportformdata'
                }
            ]
        });

        me.callParent(arguments);
    }
   
});
