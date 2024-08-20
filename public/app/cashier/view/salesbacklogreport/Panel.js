Ext.define('Cashier.view.salesbacklogreport.Panel', {
    extend: 'Ext.form.Panel', 
    requires: ['Cashier.view.salesbacklogreport.FormData'],
    alias: 'widget.salesbacklogreportpanel',
    itemId: 'salesbacklogreportPanel',   
    layout: {
        type: 'border',       
    },
    formDataPanelName: 'salesbacklogreportformdata',    
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
