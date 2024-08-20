Ext.define('Cashier.view.pengeluaranharianreport.Panel', {
    extend: 'Ext.form.Panel', 
    requires: ['Cashier.view.pengeluaranharianreport.FormData'],
    alias: 'widget.pengeluaranharianreportpanel',
    itemId: 'PengeluaranharianreportPanel',   
    layout: {
        type: 'border',       
    },
    formDataPanelName: 'pengeluaranharianreportformdata',    
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
