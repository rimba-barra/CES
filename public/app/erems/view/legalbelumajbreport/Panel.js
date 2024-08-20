Ext.define('Erems.view.legalbelumajbreport.Panel', {
    extend: 'Erems.library.template.view.Panel',
    requires: ['Erems.view.legalbelumajbreport.FormData'],
    alias: 'widget.legalbelumajbreportpanel',
    itemId: 'LegalbelumajbreportPanel',
    formSearchPanelName: 'legalbelumajbreportformsearch',
    layout: 'vbox',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'legalbelumajbreportformdata'
                }
            ]
        });

        me.callParent(arguments);
    }
   
});
