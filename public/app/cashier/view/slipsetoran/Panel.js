Ext.define('Cashier.view.slipsetoran.Panel', {
    extend: 'Cashier.library.template.view.Panel', 
    requires: ['Cashier.view.slipsetoran.FormData'],
    alias: 'widget.slipsetoranpanel',
    itemId: 'SlipsetoranPanel',   
    formDataPanelName: 'slipsetoranformdata',    
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
