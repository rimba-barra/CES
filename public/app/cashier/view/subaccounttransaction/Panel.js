Ext.define('Cashier.view.subaccounttransaction.Panel', {
    extend: 'Ext.form.Panel', 
    requires: ['Cashier.view.subaccounttransaction.FormData'],
    alias: 'widget.subaccounttransactionpanel',
    itemId: 'SubaccounttransactionPanel',   
    layout: {
        type: 'border',       
    },
    formDataPanelName: 'subaccounttransactionformdata',    
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
