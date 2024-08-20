Ext.define('Cashier.view.departmentexpense.Panel', {
    extend: 'Ext.form.Panel', 
    requires: ['Cashier.view.departmentexpense.FormData'],
    alias: 'widget.departmentexpensepanel',
    itemId: 'departmentexpensePanel',   
    layout: {
        type: 'border',       
    },
    formDataPanelName: 'departmentexpenseformdata',    
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
