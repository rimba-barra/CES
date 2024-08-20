Ext.define('Gl.view.prosesposting.Panel', {
    extend: 'Ext.form.Panel', 
    requires: ['Gl.view.prosesposting.FormData'],
    alias: 'widget.prosespostingpanel',
    itemId: 'ProsepostingPanel',   
    layout: {
        type: 'vbox',       
    },
    formDataPanelName: 'prosespostingformdata',    
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
