Ext.define('Cashier.view.prosesposting.Panel', {
    extend: 'Cashier.library.template.view.Panel', 
    requires: ['Cashier.view.prosesposting.FormData'],
    alias: 'widget.prosespostingpanel',
    itemId: 'ProsespostingPanel',   
    formDataPanelName: 'prosespostingformdata',    
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
