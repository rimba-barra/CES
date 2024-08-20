Ext.define('Cashier.view.balancesheet.Panel', {
    extend: 'Ext.form.Panel', 
    requires: ['Cashier.view.balancesheet.FormData'],
    alias: 'widget.balancesheetpanel',
    itemId: 'BalancesheetPanel',   
    layout: {
        type: 'border',       
    },
    formDataPanelName: 'balancesheetformdata',    
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
