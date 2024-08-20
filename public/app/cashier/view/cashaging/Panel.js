Ext.define('Cashier.view.cashaging.Panel', {
    extend: 'Ext.form.Panel',
    requires: ['Cashier.view.cashaging.FormData'],
    alias: 'widget.cashagingpanel',
    itemId: 'CashagingPanel',
    layout: {
        type: 'border',
    },
    formDataPanelName: 'cashagingformdata',
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
