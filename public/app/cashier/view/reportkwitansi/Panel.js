Ext.define('Cashier.view.reportkwitansi.Panel', {
    extend: 'Ext.panel.Panel',
    requires: ['Cashier.view.reportkwitansi.FormData'],
    alias: 'widget.reportkwitansipanel',
    itemId: 'ReportkwitansiPanel',
    
    layout: {
        type: 'border',       
    },
    formDataPanelName: 'reportkwitansiformdata',    
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            items: [
                {
                    xtype: me.formDataPanelName,
                    region: 'center',
                    state: 'create',
                }
            ]
        });

        me.callParent(arguments);
    }
    
});
