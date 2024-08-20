Ext.define('Gl.view.prosesakhirbulan.Panel', {
    extend: 'Ext.form.Panel', 
    requires: ['Gl.view.prosesakhirbulan.FormData'],
    alias: 'widget.prosesakhirbulanpanel',
    itemId: 'ProseakhirbulanPanel',   
    layout: {
        type: 'vbox',       
    },
    formDataPanelName: 'prosesakhirbulanformdata',    
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
