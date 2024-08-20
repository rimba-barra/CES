Ext.define('Cashier.view.balancesheetconsolidation.Panel', {
    extend: 'Ext.form.Panel', 
    requires: ['Cashier.view.balancesheetconsolidation.FormData'],
    alias: 'widget.balancesheetconsolidationpanel',
    itemId: 'balancesheetconsolidationPanel',   
    layout: {
        type: 'border',       
    },
    formDataPanelName: 'balancesheetconsolidationformdata',    
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
