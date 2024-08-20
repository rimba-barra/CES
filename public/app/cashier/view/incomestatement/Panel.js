Ext.define('Cashier.view.incomestatement.Panel', {
    extend: 'Ext.form.Panel', 
    requires: ['Cashier.view.incomestatement.FormData'],
    alias: 'widget.incomestatementpanel',
    itemId: 'IncomestatementPanel',   
    layout: {
        type: 'border',       
    },
    formDataPanelName: 'incomestatementformdata',    
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
