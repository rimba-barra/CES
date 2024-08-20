Ext.define('Cashier.view.incomestatementconsolidation.Panel', {
    extend: 'Ext.form.Panel', 
    requires: ['Cashier.view.incomestatementconsolidation.FormData'],
    alias: 'widget.incomestatementconsolidationpanel',
    itemId: 'incomestatementconsolidationPanel',   
    layout: {
        type: 'border',       
    },
    formDataPanelName: 'incomestatementconsolidationformdata',    
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
