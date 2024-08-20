Ext.define('Cashier.view.offsetreport.Panel', {
    extend: 'Ext.form.Panel', 
    requires: ['Cashier.view.offsetreport.FormData'],
    alias: 'widget.offsetreportpanel',
    itemId: 'OffsetreportPanel',   
    layout: {
        type: 'border',       
    },
    formDataPanelName: 'offsetreportformdata',    
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
