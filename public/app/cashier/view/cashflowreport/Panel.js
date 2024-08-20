Ext.define('Cashier.view.cashflowreport.Panel', {
    extend: 'Ext.form.Panel', 
    requires: ['Cashier.view.cashflowreport.FormData'],
    alias: 'widget.cashflowreportpanel',
    itemId: 'cashflowreportPanel',   
    layout: {
        type: 'border',       
    },
    formDataPanelName: 'cashflowreportformdata',    
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
