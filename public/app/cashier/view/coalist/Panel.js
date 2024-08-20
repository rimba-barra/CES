Ext.define('Cashier.view.coalist.Panel', {
    extend: 'Ext.form.Panel', 
    requires: ['Cashier.view.coalist.FormData'],
    alias: 'widget.coalistpanel',
    itemId: 'CoalistPanel',   
    id: 'CoalistPanel',   
    layout: {
        type: 'border',       
    },
    formDataPanelName: 'coalistformdata',    
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
