Ext.define('Cashier.view.inputpph.Panel', {
    extend: 'Ext.form.Panel', 
    requires: ['Cashier.view.inputpph.FormData'],
    alias: 'widget.inputpphpanel',
    itemId: 'InputpphPanel',   
    layout: {
        type: 'border',       
    },
    formDataPanelName: 'inputpphformdata',    
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
