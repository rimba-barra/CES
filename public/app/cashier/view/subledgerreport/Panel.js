Ext.define('Cashier.view.subledgerreport.Panel', {
    extend: 'Ext.form.Panel', 
    requires: ['Cashier.view.subledgerreport.FormData'],
    alias: 'widget.subledgerreportpanel',
    itemId: 'subledgerreportPanel',   
    layout: {
        type: 'border',       
    },
    formDataPanelName: 'subledgerreportformdata',    
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
