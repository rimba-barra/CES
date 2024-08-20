Ext.define('Cashier.view.reportchangepricelog.Panel', {
    extend: 'Ext.form.Panel', 
    requires: ['Cashier.view.reportchangepricelog.FormData'],
    alias: 'widget.reportchangepricelogpanel',
    itemId: 'ReportchangepricelogPanel',   
    layout: {
        type: 'border',       
    },
    formDataPanelName: 'reportchangepricelogformdata',    
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
