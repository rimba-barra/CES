Ext.define('Cashier.view.dailytransactionkp.Panel', {
    extend: 'Ext.form.Panel', 
    requires: ['Cashier.view.dailytransactionkp.FormData'],
    alias: 'widget.dailytransactionkppanel',
    itemId: 'DailytransactionkpPanel',   
    layout: {
        type: 'border',       
    },
    formDataPanelName: 'dailytransactionkpformdata',    
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
