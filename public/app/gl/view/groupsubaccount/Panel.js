Ext.define('Gl.view.groupsubaccount.Panel', {
    extend: 'Ext.form.Panel', 
    requires: ['Gl.view.groupsubaccount.FormData'],
    alias: 'widget.groupsubaccountpanel',
    itemId: 'GroupsubaccountPanel',   
    layout: {
        type: 'border',       
    },
    formDataPanelName: 'groupsubaccountformdata',    
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
