Ext.define('Cashier.view.cashadvancereport.Panel', {
    extend: 'Ext.form.Panel',
    requires: ['Cashier.view.cashadvancereport.FormData'],
    alias: 'widget.cashadvancereportpanel',
    itemId: 'CashadvancereportPanel',
    layout: {
        type: 'border',
    },
    formDataPanelName: 'cashadvancereportformdata',
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
