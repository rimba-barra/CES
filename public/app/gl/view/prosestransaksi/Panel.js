Ext.define('Gl.view.prosestransaksi.Panel', {
    extend: 'Ext.form.Panel', 
    requires: ['Gl.view.prosestransaksi.FormData'],
    alias: 'widget.prosestransaksipanel',
    itemId: 'ProseakhirbulanPanel',   
    layout: {
        type: 'vbox',       
    },
    formDataPanelName: 'prosestransaksiformdata',    
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
