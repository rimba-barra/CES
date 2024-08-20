Ext.define('Cashier.view.balancesheetkp.Panel', {
    extend: 'Ext.form.Panel', 
    requires: ['Cashier.view.balancesheetkp.FormData'],
    alias: 'widget.balancesheetkppanel',
    itemId: 'balancesheetkpPanel',   
    layout: {
        type: 'border',       
    },
    formDataPanelName: 'balancesheetkpformdata',    
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
