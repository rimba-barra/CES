Ext.define('Cashier.view.agingcashadvancereport.Panel', {
    extend: 'Ext.form.Panel', 
    requires: ['Cashier.view.agingcashadvancereport.FormData'],
    alias: 'widget.agingcashadvancereportpanel',
    itemId: 'AgingcashadvancereportPanel',   
    layout: {
        type: 'border',       
    },
    formDataPanelName: 'agingcashadvancereportformdata',    
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
