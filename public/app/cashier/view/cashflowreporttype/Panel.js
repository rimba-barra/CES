Ext.define('Cashier.view.cashflowreporttype.Panel', {
    extend: 'Ext.form.Panel', 
    requires: ['Cashier.view.cashflowreporttype.FormData'],
    alias: 'widget.cashflowreporttypepanel',
    itemId: 'cashflowreporttypePanel',   
    layout: {
        type: 'border',       
    },
    formDataPanelName: 'cashflowreporttypeformdata',    
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
