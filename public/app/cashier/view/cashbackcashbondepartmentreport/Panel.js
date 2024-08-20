Ext.define('Cashier.view.cashbackcashbondepartmentreport.Panel', {
    extend: 'Ext.form.Panel', 
    requires: ['Cashier.view.cashbackcashbondepartmentreport.FormData'],
    alias: 'widget.cashbackcashbondepartmentreportpanel',
    itemId: 'cashbackcashbondepartmentreportPanel',   
    layout: {
        type: 'border',       
    },
    formDataPanelName: 'cashbackcashbondepartmentreportformdata',    
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
