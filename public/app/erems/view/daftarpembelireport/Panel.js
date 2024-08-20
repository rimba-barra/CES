Ext.define('Erems.view.daftarpembelireport.Panel', {
    extend: 'Erems.library.template.view.Panel',
    requires: ['Erems.view.daftarpembelireport.FormData'],
    alias: 'widget.daftarpembelireportpanel',
    itemId: 'DaftarpembelireportPanel',
    formSearchPanelName: 'daftarpembelireportformsearch',
    layout: 'vbox',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'daftarpembelireportformdata'
                }
            ]
        });

        me.callParent(arguments);
    }
   
});
