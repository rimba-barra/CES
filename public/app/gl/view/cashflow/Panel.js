Ext.define('Gl.view.cashflow.Panel', {
    extend: 'Ext.form.Panel', 
    requires: ['Gl.view.cashflow.FormData'],
    alias: 'widget.cashflowpanel',
    itemId: 'CashflowPanel',   
    layout: {
        type: 'border',       
    },
    formDataPanelName: 'cashflowformdata',    
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
