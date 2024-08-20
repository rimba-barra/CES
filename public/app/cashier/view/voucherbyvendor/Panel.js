Ext.define('Cashier.view.voucherbyvendor.Panel', {
    extend: 'Ext.form.Panel',
    requires: ['Cashier.view.voucherbyvendor.FormData'],
    alias: 'widget.voucherbyvendorpanel',
    itemId: 'VoucherbyvendorPanel',
    layout: {
        type: 'border',
    },
    formDataPanelName: 'voucherbyvendorformdata',
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
