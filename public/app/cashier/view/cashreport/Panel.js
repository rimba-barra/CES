Ext.define('Cashier.view.cashreport.Panel', {
    extend: 'Ext.form.Panel',
    requires: ['Cashier.view.cashreport.FormData'],
    alias: 'widget.cashreportpanel',
    itemId: 'CashreportPanel',
    layout: {
        type: 'border',
    },
    formDataPanelName: 'cashreportformdata',
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
