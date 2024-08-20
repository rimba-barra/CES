Ext.define('Cashier.view.cashflowconsolidation.Panel', {
    extend: 'Ext.form.Panel', 
    requires: ['Cashier.view.cashflowconsolidation.FormData'],
    alias: 'widget.cashflowconsolidationpanel',
    itemId: 'cashflowconsolidationPanel',   
    layout: {
        type: 'border',       
    },
    formDataPanelName: 'cashflowconsolidationformdata',    
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
