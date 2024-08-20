Ext.define('Cashier.view.consolesupport.Panel', {
    extend: 'Ext.form.Panel', 
    requires: ['Cashier.view.consolesupport.FormData'],
    alias: 'widget.consolesupportpanel',
    itemId: 'consolesupportPanel',   
    layout: {
        type: 'border',       
    },
    formDataPanelName: 'consolesupportformdata',    
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
