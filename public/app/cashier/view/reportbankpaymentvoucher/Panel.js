Ext.define('Cashier.view.reportbankpaymentvoucher.Panel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.reportbankpaymentvoucherpanel',
    requires: ['Cashier.view.reportbankpaymentvoucher.FormData'],
    itemId: 'Reportbankpaymentvoucherida',
    autoHeight: true,
    layout: 'border',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'reportbankpaymentvoucherformdata',
                    region: 'center',
                    state: 'create',
                   autoHeight: true
                }
            ]
        });

        me.callParent(arguments);
    }

});
