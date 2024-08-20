Ext.define('Gl.view.prosesakhirtahun.Panel', {
    extend: 'Ext.form.Panel', 
    requires: ['Gl.view.prosesakhirtahun.FormData'],
    alias: 'widget.prosesakhirtahunpanel',
    itemId: 'ProseakhirtahunPanel',   
    layout: {
        type: 'vbox',       
    },
    formDataPanelName: 'prosesakhirtahunformdata',    
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
