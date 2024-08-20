Ext.define('Cashier.view.cashflowreportyearly.Panel', {
    extend: 'Ext.form.Panel', 
    requires: ['Cashier.view.cashflowreportyearly.FormData'],
    alias: 'widget.cashflowreportyearlypanel',
    itemId: 'cashflowreportyearlyPanel',   
    layout: {
        type: 'border',       
    },
    formDataPanelName: 'cashflowreportyearlyformdata',    
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            items: [
                {
                    xtype: me.formDataPanelName,
                    region: 'center',                  
                }
            ]
        });

        me.callParent(arguments);
    }
    
});
