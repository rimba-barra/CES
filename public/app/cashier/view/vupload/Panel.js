Ext.define('Cashier.view.vupload.Panel', {
    extend: 'Cashier.library.template.view.Panel', 
    requires: ['Cashier.view.vupload.FormData'],
    alias: 'widget.vuploadpanel',
    itemId: 'VuploadPanel',   
    formDataPanelName: 'vuploadformdata',    
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
