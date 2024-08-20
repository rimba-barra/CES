Ext.define('Erems.view.cashinpaymentreport.Panel', {
    extend: 'Erems.library.template.view.Panel',
    requires: ['Erems.view.cashinpaymentreport.FormData'],
    alias: 'widget.cashinpaymentreportpanel',
    itemId: 'CashinpaymentreportPanel',
    formSearchPanelName: 'cashinpaymentreportformsearch',
    layout: 'vbox',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'cashinpaymentreportformdata'
                }
            ]
        });

        me.callParent(arguments);
    }
   
});
