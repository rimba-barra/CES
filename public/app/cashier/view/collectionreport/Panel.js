Ext.define('Cashier.view.collectionreport.Panel', {
    extend: 'Ext.form.Panel', 
    requires: ['Cashier.view.collectionreport.FormData'],
    alias: 'widget.collectionreportpanel',
    itemId: 'collectionreportPanel',   
    layout: {
        type: 'border',       
    },
    formDataPanelName: 'collectionreportformdata',    
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
