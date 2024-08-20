Ext.define('Cashier.view.vouchertransactionreport.Panel', {
    extend: 'Ext.form.Panel', 
    requires: ['Cashier.view.vouchertransactionreport.FormData'],
    alias: 'widget.vouchertransactionreportpanel',
    itemId: 'VouchertransactionreportPanel',   
    layout: {
        type: 'border',       
    },
    formDataPanelName: 'vouchertransactionreportformdata',    
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
