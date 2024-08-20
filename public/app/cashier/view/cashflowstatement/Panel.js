Ext.define('Cashier.view.cashflowstatement.Panel', {
    extend: 'Ext.form.Panel', 
    requires: ['Cashier.view.cashflowstatement.FormData'],
    alias: 'widget.cashflowstatementpanel',
    itemId: 'CashflowstatementPanel',   
    layout: {
        type: 'border',       
    },
    formDataPanelName: 'cashflowstatementformdata',    
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
