Ext.define('Cashier.view.banktransactionreport.Panel', {
    extend: 'Ext.form.Panel', 
    requires: ['Cashier.view.banktransactionreport.FormData'],
    alias: 'widget.banktransactionreportpanel',
    itemId: 'BanktransactionreportPanel',   
    layout: {
        type: 'border',       
    },
    formDataPanelName: 'banktransactionreportformdata',    
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
