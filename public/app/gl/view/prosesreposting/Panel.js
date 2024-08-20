Ext.define('Gl.view.prosesreposting.Panel', {
    extend: 'Ext.form.Panel', 
    requires: ['Gl.view.prosesreposting.FormData'],
    alias: 'widget.prosesrepostingpanel',
    itemId: 'Prosesreposting',   
    layout: {
        type: 'vbox',       
    },
    formDataPanelName: 'prosesrepostingformdata',    
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
