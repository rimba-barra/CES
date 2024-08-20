Ext.define('Cashier.view.balancesheetb.Panel', {
    extend: 'Ext.form.Panel', 
    requires: ['Cashier.view.balancesheetb.FormData'],
    alias: 'widget.balancesheetbpanel',
    itemId: 'BalancesheetbPanel',   
    layout: {
        type: 'border',       
    },
    formDataPanelName: 'balancesheetbformdata',    
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
