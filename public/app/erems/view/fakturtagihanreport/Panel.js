Ext.define('Erems.view.fakturtagihanreport.Panel', {
    extend: 'Erems.library.template.view.Panel',
    requires: ['Erems.view.fakturtagihanreport.FormData'],
    alias: 'widget.fakturtagihanreportpanel',
    itemId: 'FakturtagihanreportPanel',
    formSearchPanelName: 'fakturtagihanreportformsearch',
    layout: 'vbox',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'fakturtagihanreportformdata'
                }
            ]
        });

        me.callParent(arguments);
    }
   
});
