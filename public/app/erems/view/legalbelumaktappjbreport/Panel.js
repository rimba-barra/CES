Ext.define('Erems.view.legalbelumaktappjbreport.Panel', {
    extend: 'Erems.library.template.view.Panel',
    requires: ['Erems.view.legalbelumaktappjbreport.FormData'],
    alias: 'widget.legalbelumaktappjbreportpanel',
    itemId: 'LegalbelumaktappjbreportPanel',
    formSearchPanelName: 'legalbelumaktappjbreportformsearch',
    layout: 'vbox',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'legalbelumaktappjbreportformdata'
                }
            ]
        });

        me.callParent(arguments);
    }
   
});
