Ext.define('Cashier.view.trialbalance.Panel', {
    extend: 'Ext.form.Panel', 
    requires: ['Cashier.view.trialbalance.FormData'],
    alias: 'widget.trialbalancepanel',
    itemId: 'TrialbalancePanel',   
    layout: {
        type: 'border',       
    },
    formDataPanelName: 'trialbalanceformdata',    
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
