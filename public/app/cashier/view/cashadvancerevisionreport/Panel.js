Ext.define('Cashier.view.cashadvancerevisionreport.Panel', {
    extend: 'Ext.form.Panel',
    requires: ['Cashier.view.cashadvancerevisionreport.FormData'],
    alias: 'widget.cashadvancerevisionreportpanel',
    itemId: 'CashadvancerevisionreportPanel',
    layout: {
        type: 'border',
    },
    formDataPanelName: 'cashadvancerevisionreportformdata',
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
