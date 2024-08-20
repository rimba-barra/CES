Ext.define('Cashier.view.mutasikasbank.Panel', {
    extend: 'Ext.form.Panel', 
    requires: ['Cashier.view.mutasikasbank.FormData'],
    alias: 'widget.mutasikasbankpanel',
    itemId: 'MutasikasbankPanel',   
    layout: {
        type: 'border',       
    },
    formDataPanelName: 'mutasikasbankformdata',    
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
