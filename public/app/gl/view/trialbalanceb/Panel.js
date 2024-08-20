Ext.define('Gl.view.trialbalanceb.Panel', {
    extend: 'Ext.form.Panel', 
    requires: ['Gl.view.trialbalanceb.FormData'],
    alias: 'widget.trialbalancebpanel',
    itemId: 'trialbalancebPanel',   
    layout: {
        type: 'border',       
    },
    formDataPanelName: 'trialbalancebformdata',    
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
