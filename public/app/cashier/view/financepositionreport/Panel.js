Ext.define('Cashier.view.financepositionreport.Panel', {
    extend: 'Ext.form.Panel', 
    requires: ['Cashier.view.financepositionreport.FormData'],
    alias: 'widget.financepositionreportpanel',
    itemId: 'FinancepositionreportPanel',   
    layout: {
        type: 'border',       
    },
    formDataPanelName: 'financepositionreportformdata',    
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
