Ext.define('Cashier.view.reportpenerimaan.Panel', {
    extend: 'Cashier.library.template.view.Panel', 
    requires: ['Cashier.view.reportpenerimaan.FormData'],
    alias: 'widget.reportpenerimaanpanel',
    itemId: 'ProsespostingPanel',   
    formDataPanelName: 'reportpenerimaanformdata',    
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
