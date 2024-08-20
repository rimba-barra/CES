Ext.define('Erems.view.cashierreport.Panel', {
    extend: 'Erems.library.template.view.Panel',
    requires: ['Erems.view.cashierreport.FormData'],
    alias: 'widget.cashierreportpanel',
    itemId: 'CashierreportPanel',
    formSearchPanelName: 'cashierreportformsearch',
    layout: 'fit',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'cashierreportformdata'
                }
            ]
        });

        me.callParent(arguments);
    }
   
});
