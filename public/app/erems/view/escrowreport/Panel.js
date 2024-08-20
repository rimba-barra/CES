Ext.define('Erems.view.escrowreport.Panel', {
    extend: 'Erems.library.template.view.Panel',
    requires: ['Erems.view.escrowreport.FormData'],
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
