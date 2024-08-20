Ext.define('Cashier.view.reporttrackingvoucher.Panel', {
    extend: 'Ext.form.Panel', 
    requires: ['Cashier.view.reporttrackingvoucher.FormData'],
    alias: 'widget.reporttrackingvoucherpanel',
    itemId: 'ReporttrackingvoucherPanel',   
    layout: {
        type: 'border',       
    },
    formDataPanelName: 'reporttrackingvoucherformdata',    
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
