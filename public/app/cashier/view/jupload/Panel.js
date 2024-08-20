Ext.define('Cashier.view.jupload.Panel', {
    extend: 'Cashier.library.template.view.Panel', 
    requires: ['Cashier.view.jupload.FormData'],
    alias: 'widget.juploadpanel',
    itemId: 'JuploadPanel',   
    formDataPanelName: 'juploadformdata',    
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
