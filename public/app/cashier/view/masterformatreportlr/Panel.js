Ext.define('Cashier.view.masterformatreportlr.Panel', {
    extend: 'Ext.form.Panel', 
    requires: ['Cashier.view.masterformatreportlr.FormData'],
    alias: 'widget.masterformatreportlrpanel',
    itemId: 'MasterformatreportlrPanel',   
    layout: {
        type: 'border',       
    },
    formDataPanelName: 'masterformatreportlrformdata',    
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
