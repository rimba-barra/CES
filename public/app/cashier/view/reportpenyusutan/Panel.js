Ext.define('Cashier.view.reportpenyusutan.Panel', {
    extend: 'Ext.form.Panel', 
    requires: ['Cashier.view.reportpenyusutan.FormData'],
    alias: 'widget.reportpenyusutanpanel',
    itemId: 'ReportpenyusutanPanel',   
    layout: {
        type: 'border',       
    },
    formDataPanelName: 'reportpenyusutanformdata',    
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
