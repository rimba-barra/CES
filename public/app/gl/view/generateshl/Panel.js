Ext.define('Gl.view.generateshl.Panel', {
    extend: 'Ext.form.Panel', 
    requires: ['Gl.view.generateshl.FormData'],
    alias: 'widget.generateshlpanel',
    itemId: 'GenerateshlPanel',   
    layout: {
        type: 'vbox',       
    },
    formDataPanelName: 'generateshlformdata',    
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
