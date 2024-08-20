Ext.define('Gl.view.subaccounttransaction.Panel', {
    extend: 'Ext.form.Panel', 
    requires: ['Gl.view.subaccounttransaction.FormData'],
    alias: 'widget.subaccounttransactionpanel',
    itemId: 'SubaccounttransactionPanel',   
    layout: {
        type: 'border',       
    },
    formDataPanelName: 'subaccounttransactionformdata',    
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
