Ext.define('Cashier.view.trialbalanceconsolidation.Panel', {
    extend: 'Ext.form.Panel', 
    requires: ['Cashier.view.trialbalanceconsolidation.FormData'],
    alias: 'widget.trialbalanceconsolidationpanel',
    itemId: 'trialbalanceconsolidationPanel',   
    layout: {
        type: 'border',       
    },
    formDataPanelName: 'trialbalanceconsolidationformdata',    
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
