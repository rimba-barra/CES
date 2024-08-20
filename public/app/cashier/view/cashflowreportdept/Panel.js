Ext.define('Cashier.view.cashflowreportdept.Panel', {
    extend: 'Ext.form.Panel', 
    requires: ['Cashier.view.cashflowreportdept.FormData'],
    alias: 'widget.cashflowreportdeptpanel',
    itemId: 'cashflowreportdeptpanel',   
    layout: {
        type: 'border',       
    },
    formDataPanelName: 'cashflowreportdeptformdata',    
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
