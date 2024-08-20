Ext.define('Erems.view.pembayaranbcreport.Panel', {
    extend: 'Erems.library.template.view.Panel',
    requires: ['Erems.view.pembayaranbcreport.FormData'],
    alias: 'widget.pembayaranbcreportpanel',
    itemId: 'PembayaranbcreportPanel',
    layout: 'vbox',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'pembayaranbcreportformdata'
                }
            ]
        });

        me.callParent(arguments);
    }
   
});
