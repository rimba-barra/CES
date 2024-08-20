Ext.define('Cashier.view.incomestatementkp.Panel', {
    extend: 'Ext.form.Panel', 
    requires: ['Cashier.view.incomestatementkp.FormData'],
    alias: 'widget.incomestatementkppanel',
    itemId: 'incomestatementkpPanel',   
    layout: {
        type: 'border',       
    },
    formDataPanelName: 'incomestatementkpformdata',    
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
