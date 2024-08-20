Ext.define('Cashier.view.escrowreport.Panel', {
    extend: 'Cashier.library.template.view.Panel',
    requires: ['Cashier.view.escrowreport.FormData'],
    alias: 'widget.escrowreportpanel',
    itemId: 'EscrowreportPanel',
    layout: 'vbox',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'escrowreportformdata'
                }
            ]
        });

        me.callParent(arguments);
    }
   
});
