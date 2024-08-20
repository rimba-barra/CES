Ext.define('Gl.view.dailytransaction.Panel', {
    extend: 'Ext.form.Panel', 
    requires: ['Gl.view.dailytransaction.FormData'],
    alias: 'widget.dailytransactionpanel',
    itemId: 'DailytransactionPanel',   
    layout: {
        type: 'border',       
    },
    formDataPanelName: 'dailytransactionformdata',    
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
