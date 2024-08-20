Ext.define('Cashier.view.vdtransaction.Panel', {
    extend: 'Ext.form.Panel', 
    requires: ['Cashier.view.vdtransaction.FormData'],
    alias: 'widget.vdtransactionpanel',
    itemId: 'VdtransactionPanel',   
    layout: {
        type: 'border',       
    },
    formDataPanelName: 'vdtransactionformdata',    
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
