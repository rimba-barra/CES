Ext.define('Erems.view.legalakadsudahajbreport.Panel', {
    extend: 'Erems.library.template.view.Panel',
    requires: ['Erems.view.legalakadsudahajbreport.FormData'],
    alias: 'widget.legalakadsudahajbreportpanel',
    itemId: 'LegalakadsudahajbreportPanel',
    formSearchPanelName: 'legalakadsudahajbreportformsearch',
    layout: 'vbox',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'legalakadsudahajbreportformdata'
                }
            ]
        });

        me.callParent(arguments);
    }
   
});
