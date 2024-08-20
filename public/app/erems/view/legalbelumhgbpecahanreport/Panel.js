Ext.define('Erems.view.legalbelumhgbpecahanreport.Panel', {
    extend: 'Erems.library.template.view.Panel',
    requires: ['Erems.view.legalbelumhgbpecahanreport.FormData'],
    alias: 'widget.legalbelumhgbpecahanreportpanel',
    itemId: 'LegalbelumhgbpecahanreportPanel',
    formSearchPanelName: 'legalbelumhgbpecahanreportformsearch',
    layout: 'vbox',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'legalbelumhgbpecahanreportformdata'
                }
            ]
        });

        me.callParent(arguments);
    }
   
});
