Ext.define('Gl.view.bungashl.Panel', {
    extend: 'Ext.form.Panel', 
    requires: ['Gl.view.bungashl.FormData'],
    alias: 'widget.bungashlpanel',
    itemId: 'BungashlPanel',   
    layout: {
        type: 'vbox',       
    },
    formDataPanelName: 'bungashlformdata',    
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
